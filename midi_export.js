// 导出：标准 MIDI 文件（SMF，格式 1）与五线谱 PNG / SVG
// MIDI 文件结构按 MIDI Manufacturers Association《Standard MIDI Files 1.0》：
//   头块 "MThd"（长度 6：格式、音轨数、每四分音符 tick 数），每条音轨为 "MTrk" 块；
//   事件前为可变长度的 delta-time（每字节 7 位，除最后一字节外最高位为 1）；
//   速度用元事件 FF 51 03（每四分音符微秒数），音轨结束为 FF 2F 00。

const encoder = new TextEncoder();

/** 可变长度数量（VLQ） */
export function variableLength(value) {
  let v = Math.max(0, Math.round(value));
  const bytes = [v & 0x7f];
  v >>= 7;
  while (v > 0) {
    bytes.unshift((v & 0x7f) | 0x80);
    v >>= 7;
  }
  return bytes;
}

const u32 = (n) => [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff];
const u16 = (n) => [(n >>> 8) & 0xff, n & 0xff];

/**
 * @param {Array<{ name?: string, channel?: number, program?: number, notes: Array<{ beat: number, duration: number, midi: number, velocity?: number }> }>} tracks
 *        beat / duration 以四分音符为单位；velocity 为 0–1 或 1–127
 * @param {{ bpm?: number, ppq?: number, meter?: [number, number] }} options
 * @returns {Uint8Array}
 */
export function buildMidiFile(tracks, { bpm = 96, ppq = 480, meter = [4, 4] } = {}) {
  const chunk = (type, data) => [...encoder.encode(type), ...u32(data.length), ...data];
  const conductor = [
    0, 0xff, 0x51, 0x03, ...u32(Math.round(60000000 / bpm)).slice(1),
    0, 0xff, 0x58, 0x04, meter[0], Math.round(Math.log2(meter[1])), 24, 8,
    0, 0xff, 0x2f, 0x00,
  ];
  const trackChunks = tracks.map((track, index) => {
    // 第 10 通道（编号 9）在 General MIDI 中是打击乐，跳过
    const channel = (track.channel ?? (index >= 9 ? index + 1 : index)) & 0x0f;
    const events = [];
    track.notes.forEach((note) => {
      if (!Number.isFinite(note.midi) || note.midi < 0 || note.midi > 127) return;
      const raw = note.velocity ?? 0.8;
      const velocity = Math.max(1, Math.min(127, Math.round(raw <= 1 ? raw * 127 : raw)));
      const start = Math.round(note.beat * ppq);
      const end = Math.max(start + 1, Math.round((note.beat + note.duration) * ppq));
      events.push({ tick: start, order: 1, bytes: [0x90 | channel, note.midi, velocity] });
      events.push({ tick: end, order: 0, bytes: [0x80 | channel, note.midi, 0] });
    });
    // 同一时刻先关音再开音，避免同音反复时被提前截断
    events.sort((a, b) => a.tick - b.tick || a.order - b.order);
    const data = [];
    if (track.name) {
      const name = [...encoder.encode(track.name)];
      data.push(0, 0xff, 0x03, ...variableLength(name.length), ...name);
    }
    if (Number.isInteger(track.program)) data.push(0, 0xc0 | channel, track.program & 0x7f);
    let last = 0;
    events.forEach((event) => {
      data.push(...variableLength(event.tick - last), ...event.bytes);
      last = event.tick;
    });
    data.push(0, 0xff, 0x2f, 0x00);
    return chunk('MTrk', data);
  });
  const header = chunk('MThd', [...u16(1), ...u16(tracks.length + 1), ...u16(ppq)]);
  return Uint8Array.from([...header, ...chunk('MTrk', conductor), ...trackChunks.flat()]);
}

/** 浏览器下载文件 */
export function downloadBlob(name, data, type) {
  const url = URL.createObjectURL(data instanceof Blob ? data : new Blob([data], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function downloadMidi(name, tracks, options) {
  downloadBlob(name.endsWith('.mid') ? name : `${name}.mid`, buildMidiFile(tracks, options), 'audio/midi');
}

// ---------- 五线谱导出 ----------
// 独立的 SVG 文件读不到页面 CSS，这里内嵌一份打印用的样式（白底黑字）
const PRINT_STYLE = `
  .score-staff { stroke: #555; stroke-width: .65; }
  .score-barline, .score-ledger, .score-stem { stroke: #111; stroke-width: 1; fill: none; }
  .score-note { fill: #111; stroke: #111; stroke-width: 1; }
  .score-note.hollow { fill: #fff; stroke-width: 1.4; }
  .score-clef { fill: #111; font: 34px serif; }
  .score-meter { fill: #111; font: 700 15px serif; }
  .score-accidental { fill: #111; font: 15px serif; }
  .score-rest { fill: #111; font: 22px serif; }
  .score-chord { fill: #111; font: 600 14px sans-serif; }
  .score-part, .score-bar-number { fill: #666; font: 11px sans-serif; }
  .staff-mark { fill: #444; font: 11px sans-serif; }
  .staff-mark.is-error { fill: #b3363a; } .staff-mark.is-dissonant { fill: #9c650d; } .staff-mark.is-perfect { fill: #2b45c4; }
`;

export function standaloneSvg(svg) {
  const clone = svg.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.removeAttribute('style');
  clone.querySelectorAll('.is-playing').forEach((node) => node.classList.remove('is-playing'));
  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.textContent = PRINT_STYLE;
  const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  ['x', 'y'].forEach((k) => background.setAttribute(k, '0'));
  background.setAttribute('width', '100%');
  background.setAttribute('height', '100%');
  background.setAttribute('fill', '#fff');
  clone.insertBefore(background, clone.firstChild);
  clone.insertBefore(style, clone.firstChild);
  return new XMLSerializer().serializeToString(clone);
}

export function downloadSvg(name, svg) {
  downloadBlob(`${name}.svg`, standaloneSvg(svg), 'image/svg+xml');
}

/** SVG → PNG（2 倍分辨率）；在 file:// 等受限环境失败时返回 false */
export function downloadPng(name, svg, scale = 2) {
  return new Promise((resolve) => {
    const width = Number(svg.getAttribute('width')) || svg.viewBox?.baseVal?.width || 600;
    const height = Number(svg.getAttribute('height')) || svg.viewBox?.baseVal?.height || 200;
    const image = new Image();
    const url = URL.createObjectURL(new Blob([standaloneSvg(svg)], { type: 'image/svg+xml' }));
    image.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          if (!blob) { resolve(false); return; }
          downloadBlob(`${name}.png`, blob, 'image/png');
          resolve(true);
        }, 'image/png');
      } catch (_) {
        URL.revokeObjectURL(url);
        resolve(false);
      }
    };
    image.onerror = () => { URL.revokeObjectURL(url); resolve(false); };
    image.src = url;
  });
}

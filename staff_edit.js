// 五线谱编辑器的整谱操作：MusicXML 导入、按小节复制 / 粘贴 / 删除、整谱移调
// 乐谱格式同 staff_reading.js：voices[v] = [{ rest, duration, dots, tie, notes: [{ letter, octave, alter|null, cents }] }]
// MusicXML 的结构（divisions、chord、backup / forward、tie、staff、voice、小数 alter、.mxl 压缩包的 META-INF/container.xml）按 W3C MusicXML 4.0：ref:w3c-musicxml
// 移调：音程同时有"字母上走几级"和"半音数"两个量，所以字母和升降都跟着走（C→D 大二度，E→F♯ 也是大二度）：ref:omt-intervals ref:omt2e-major-scales
import { layoutMeasures, resolveMeasure, decompose, measureBeats, durationBeats, diatonicIndex, fromDiatonic, pitchMidi, spellInKey } from './staff_reading.js';

const EPS = 1e-6;
const clone = (value) => JSON.parse(JSON.stringify(value));
const GRID = 0.25; // 编辑器最短到十六分音符

// ---------------- 小节 ----------------

/**
 * 一个声部按小节切开：跨小节线的音拆成连音线连起来的几段，每个音的升降都写成明确的值
 * （这样整小节搬到别处，音高也不会因为调号或同小节的临时记号而变）
 * @returns {Array<Array<event>>}
 */
export function voiceMeasures(events, meter, key) {
  if (!events?.length) return [];
  let last = {};
  return layoutMeasures(events, meter).map((measure) => {
    measure.events.forEach((e) => { if (e.tiedIn) e.tiedAlters = last[e.source] || {}; });
    const resolved = resolveMeasure(measure.events, key);
    return measure.events.map((e, i) => {
      if (e.rest) return { rest: true, duration: e.duration, dots: e.dots || 0, tie: false, notes: [] };
      last[e.source] = Object.fromEntries(e.notes.map((n, k) => [`${n.letter}${n.octave}`, resolved[i][k].alter]));
      return { rest: false, duration: e.duration, dots: e.dots || 0, tie: Boolean(e.tieOut), notes: e.notes.map((n, k) => ({ ...clone(n), alter: resolved[i][k].alter })) };
    });
  });
}

const restsFor = (beats) => decompose(beats).map((part) => ({ rest: true, duration: part.duration, dots: part.dots, tie: false, notes: [] }));
const measureLength = (measure) => measure.reduce((sum, e) => sum + durationBeats(e.duration, e.dots), 0);

/** 补到 count 个完整小节：最后一个没写满的小节用休止符补齐，再加整小节休止 */
function padMeasures(measures, count, meter) {
  const capacity = measureBeats(meter);
  const out = measures.map((m) => m.slice());
  if (out.length) {
    const last = out[out.length - 1];
    const missing = capacity - measureLength(last);
    if (missing > EPS) last.push(...restsFor(missing));
  }
  while (out.length < count) out.push(restsFor(capacity));
  return out;
}

/** 正在用的谱表数：大谱表 2 行，其他 1 行 */
const staffCount = (score) => (score.clef === 'grand' ? 2 : 1);
const allMeasures = (score) => Array.from({ length: staffCount(score) }, (_, v) => voiceMeasures(score.voices[v] || [], score.meter, score.key));
export const measureCount = (score) => Math.max(0, ...allMeasures(score).map((m) => m.length));

/** 复制第 from–to 小节（从 1 数，含两端）；返回剪贴板 { meter, voices: [[小节…]…] } */
export function copyMeasures(score, from, to) {
  const all = allMeasures(score);
  const count = Math.max(0, ...all.map((m) => m.length));
  const a = Math.max(1, Math.min(from, to)); const b = Math.min(count, Math.max(from, to));
  if (!count || a > b) return null;
  return { meter: [...score.meter], voices: all.map((measures) => clone(padMeasures(measures, count, score.meter).slice(a - 1, b))) };
}

/**
 * 把剪贴板里的小节插在第 at 小节之前（at = 小节数 + 1 表示接在最后）；拍号不同时不粘贴
 * @returns {Array<Array<event>>|null} 新的 voices
 */
export function pasteMeasures(score, clip, at) {
  if (!clip?.voices?.length || clip.meter.join('/') !== score.meter.join('/')) return null;
  const all = allMeasures(score);
  const count = Math.max(0, ...all.map((m) => m.length));
  const index = Math.max(0, Math.min(count, (at ?? count + 1) - 1));
  const size = Math.max(...clip.voices.map((m) => m.length));
  const voices = all.map((measures, v) => {
    const padded = padMeasures(measures, count, score.meter);
    const extra = clip.voices[v] ? padMeasures(clone(clip.voices[v]), size, score.meter) : padMeasures([], size, score.meter);
    padded.splice(index, 0, ...extra);
    return padded.flat();
  });
  while (voices.length < 2) voices.push([]);
  return voices;
}

/** 删除第 from–to 小节 */
export function deleteMeasures(score, from, to) {
  const all = allMeasures(score);
  const a = Math.max(1, Math.min(from, to)); const b = Math.max(from, to);
  const voices = all.map((measures) => measures.filter((_, i) => i + 1 < a || i + 1 > b).flat());
  while (voices.length < 2) voices.push([]);
  return voices;
}

// ---------------- 移调 ----------------

/** 常用音程：字母级数 steps、半音数 semis */
export const INTERVALS = [
  { id: 'm2', steps: 1, semis: 1 }, { id: 'M2', steps: 1, semis: 2 }, { id: 'm3', steps: 2, semis: 3 }, { id: 'M3', steps: 2, semis: 4 },
  { id: 'P4', steps: 3, semis: 5 }, { id: 'P5', steps: 4, semis: 7 }, { id: 'm6', steps: 5, semis: 8 }, { id: 'M6', steps: 5, semis: 9 },
  { id: 'm7', steps: 6, semis: 10 }, { id: 'M7', steps: 6, semis: 11 }, { id: 'P8', steps: 7, semis: 12 },
];

/** 音程在五度圈上走几步（纯五度 = 4 级 7 半音） */
function intervalFifths(steps, semis) {
  let best = null;
  for (let f = -41; f <= 42; f += 1) {
    if ((((f * 4 - steps) % 7) + 7) % 7 === 0 && (((f * 7 - semis) % 12) + 12) % 12 === 0 && (best === null || Math.abs(f) < Math.abs(best))) best = f;
  }
  return best ?? 0;
}

/**
 * 整谱移调：调号跟着走；新调号超过 6 个升降号时换成等音调（B 大调上移大二度 → D♭ 大调，而不是 C♯ 大调的 7 个升号）
 * @param {{ voices, key, meter, clef }} score
 * @param {{ steps, semis }} interval 向下移调用负数
 * @returns {{ voices, key }}
 */
export function transposeScore(score, { steps, semis }) {
  let key = score.key + intervalFifths(steps, semis);
  let letterSteps = steps;
  if (key > 6) { key -= 12; letterSteps += 1; }
  if (key < -6) { key += 12; letterSteps -= 1; }
  const move = (note) => {
    const midi = pitchMidi(note.letter, note.octave, note.alter ?? 0) + semis;
    const target = fromDiatonic(diatonicIndex(note.letter, note.octave) + letterSteps);
    const alter = midi - pitchMidi(target.letter, target.octave, 0);
    if (Math.abs(alter) <= 2) return { ...note, letter: target.letter, octave: target.octave, alter };
    const spelled = spellInKey(midi, key);
    return { ...note, letter: spelled.letter, octave: spelled.octave, alter: spelled.alter ?? 0 };
  };
  const voices = [0, 1].map((v) => voiceMeasures(score.voices[v] || [], score.meter, score.key).flat()
    .map((e) => (e.rest ? e : { ...e, notes: e.notes.map(move) })));
  return { voices, key };
}

// ---------------- MusicXML 导入 ----------------

/** 很小的 XML 解析器（只够读 MusicXML：元素、属性、文本；跳过声明、注释、DOCTYPE） */
export function parseXml(text) {
  const root = { name: '#root', attrs: {}, children: [], text: '' };
  const stack = [root];
  const decode = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&amp;/g, '&');
  const re = /<!--[\s\S]*?-->|<!\[CDATA\[([\s\S]*?)\]\]>|<![^>]*>|<\?[\s\S]*?\?>|<\/\s*([\w:.-]+)\s*>|<([\w:.-]+)((?:\s+[\w:.-]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>|([^<]+)/g;
  let m;
  while ((m = re.exec(text))) {
    const top = stack[stack.length - 1];
    if (m[1] !== undefined) top.text += m[1];
    else if (m[2]) { if (stack.length > 1) stack.pop(); }
    else if (m[3]) {
      const attrs = {};
      (m[4] || '').replace(/([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g, (_, k, a, b) => { attrs[k] = decode(a ?? b); return ''; });
      const node = { name: m[3], attrs, children: [], text: '' };
      top.children.push(node);
      if (!m[5]) stack.push(node);
    } else if (m[6]) top.text += decode(m[6]);
  }
  return root;
}
const child = (node, name) => node?.children.find((c) => c.name === name);
const children = (node, name) => node?.children.filter((c) => c.name === name) || [];
const textOf = (node, name) => child(node, name)?.text.trim();
const numOf = (node, name, fallback = 0) => { const v = Number(textOf(node, name)); return Number.isFinite(v) && textOf(node, name) !== undefined ? v : fallback; };

const METERS = [[2, 4], [3, 4], [4, 4], [5, 4], [3, 8], [6, 8], [8, 8], [9, 8], [12, 8], [16, 16]];
/** 编辑器没有的拍号换成小节长度相同的（2/2 → 4/4、6/4 → 12/8） */
function nearestMeter(beats, type) {
  const exact = METERS.find(([a, b]) => a === beats && b === type);
  if (exact) return { meter: exact, changed: false };
  const length = (beats * 4) / type;
  const same = METERS.find((m) => Math.abs(measureBeats(m) - length) < EPS);
  return { meter: same || [4, 4], changed: true };
}
const CLEF_OF = (sign, line) => (sign === 'F' ? 'bass' : sign === 'C' ? (Number(line) === 4 ? 'tenor' : 'alto') : 'treble');

/**
 * MusicXML（score-partwise）→ 编辑器的乐谱
 * 读第一个声部的头两行谱表（钢琴谱），或者头两个声部；每行谱表只取第一个 voice；连音符、倚音等编辑器写不出的东西会量化到十六分音符或跳过，并在 warnings 里记数
 * @returns {{ clef, key, meter, bpm, title, voices, warnings: { voices, grace, quantized, meter, truncated } }}
 */
export function musicXMLToScore(text, { maxMeasures = 200 } = {}) {
  const doc = parseXml(String(text));
  const score = child(doc, 'score-partwise');
  if (!score) throw new Error(child(doc, 'score-timewise') ? 'timewise' : 'not-musicxml');
  const parts = children(score, 'part');
  if (!parts.length) throw new Error('empty');
  const warnings = { voices: 0, grace: 0, quantized: 0, meter: false, truncated: false };
  const firstAttr = (part, name) => { for (const m of children(part, 'measure')) { const a = children(m, 'attributes').find((x) => child(x, name)); if (a) return a; } return null; };
  const stavesOf = (part) => numOf(firstAttr(part, 'staves'), 'staves', 1);
  // 读哪几行：[{ part, staff }]
  const sources = stavesOf(parts[0]) >= 2 ? [{ part: parts[0], staff: 1 }, { part: parts[0], staff: 2 }]
    : parts.length >= 2 ? [{ part: parts[0], staff: 1 }, { part: parts[1], staff: 1 }] : [{ part: parts[0], staff: 1 }];
  if (stavesOf(parts[0]) > 2 || parts.length > (stavesOf(parts[0]) >= 2 ? 1 : 2)) warnings.voices += 1;

  const attrs0 = firstAttr(parts[0], 'key');
  const key = Math.max(-7, Math.min(7, Math.round(numOf(child(attrs0, 'key'), 'fifths', 0))));
  const timeNode = child(firstAttr(parts[0], 'time'), 'time');
  const { meter, changed } = nearestMeter(numOf(timeNode, 'beats', 4), numOf(timeNode, 'beat-type', 4));
  warnings.meter = changed;
  const capacity = measureBeats(meter);
  let bpm = 90;
  for (const m of children(parts[0], 'measure')) {
    const sound = [...children(m, 'sound'), ...children(m, 'direction').flatMap((d) => children(d, 'sound'))].find((s) => s.attrs.tempo);
    const metronome = children(m, 'direction').map((d) => child(child(child(d, 'direction-type'), 'metronome'), 'per-minute')).find(Boolean);
    if (sound) { bpm = Number(sound.attrs.tempo); break; }
    if (metronome) { bpm = Number(metronome.text); break; }
  }
  bpm = Math.max(30, Math.min(240, Math.round(bpm) || 90));

  const clefFor = ({ part, staff }) => {
    const attrs = children(part, 'measure').flatMap((m) => children(m, 'attributes'));
    for (const a of attrs) {
      const c = children(a, 'clef').find((x) => Number(x.attrs.number || 1) === staff);
      if (c) return CLEF_OF(textOf(c, 'sign'), textOf(c, 'line'));
    }
    return staff === 2 ? 'bass' : 'treble';
  };
  const clefs = sources.map(clefFor);

  /** 一行谱表 → [{ start, end, rest, notes, tie }]（以四分音符为单位的绝对时间），以及每小节的起点 */
  const readSource = ({ part, staff }) => {
    let divisions = 1; let measureStart = 0; let voice = null;
    const items = []; const starts = [];
    let pickup = 0; let taken = false;
    children(part, 'measure').forEach((measure, mi) => {
      if (mi >= maxMeasures) { warnings.truncated = true; return; }
      let time = 0; let longest = 0; let lastStart = 0;
      starts.push(measureStart);
      measure.children.forEach((node) => {
        if (node.name === 'attributes' && child(node, 'divisions')) divisions = numOf(node, 'divisions', divisions) || 1;
        if (node.name === 'backup') time -= numOf(node, 'duration') / divisions;
        if (node.name === 'forward') time += numOf(node, 'duration') / divisions;
        if (node.name !== 'note') { longest = Math.max(longest, time); return; }
        if (child(node, 'grace') || child(node, 'cue')) { warnings.grace += child(node, 'grace') ? 1 : 0; return; }
        const isChord = Boolean(child(node, 'chord'));
        const beats = numOf(node, 'duration') / divisions;
        const onset = isChord ? lastStart : time;
        if (!isChord) { lastStart = time; time += beats; }
        longest = Math.max(longest, time);
        // 和弦里后面的音跟着第一个音走：第一个音没收，后面的也不收
        if (isChord && !taken) return;
        if (!isChord) {
          taken = false;
          if (Number(textOf(node, 'staff') || 1) !== staff) return;
          const v = textOf(node, 'voice') || '1';
          voice = voice ?? v;
          if (v !== voice) { if (!child(node, 'rest')) warnings.voices += 1; return; }
          taken = true;
        }
        const restNode = child(node, 'rest');
        const tie = children(node, 'tie').some((x) => x.attrs.type === 'start');
        if (restNode) { if (!isChord) items.push({ start: measureStart + onset, end: measureStart + onset + beats, rest: true, notes: [] }); return; }
        const pitch = child(node, 'pitch'); const unpitched = child(node, 'unpitched');
        const step = textOf(pitch, 'step') || textOf(unpitched, 'display-step') || 'B';
        const octave = Number(textOf(pitch, 'octave') ?? textOf(unpitched, 'display-octave') ?? 4);
        const rawAlter = Number(textOf(pitch, 'alter') || 0);
        const alter = Math.max(-2, Math.min(2, Math.round(rawAlter)));
        const note = { letter: step, octave, alter, cents: Math.round((rawAlter - alter) * 100) };
        const previous = items[items.length - 1];
        if (isChord && previous && !previous.rest) { if (!previous.notes.some((n) => n.letter === step && n.octave === octave)) previous.notes.push(note); previous.tie = previous.tie || tie; }
        else items.push({ start: measureStart + onset, end: measureStart + onset + beats, rest: false, notes: [note], tie });
      });
      // 弱起小节（比拍号短的第一小节）：在前面补休止，让后面的小节对齐小节线
      if (mi === 0 && longest > EPS && longest < capacity - EPS) pickup = capacity - longest;
      measureStart += longest > EPS ? longest : capacity;
    });
    return { items, pickup };
  };

  const voices = sources.map((source) => {
    const { items, pickup } = readSource(source);
    const q = (x) => { const r = Math.round(x / GRID) * GRID; if (Math.abs(r - x) > EPS) warnings.quantized += 1; return r; };
    const out = [];
    let cursor = 0;
    const push = (beats, item) => {
      // 量化后的长度按小节线拆成可写的时值，音用连音线连起来
      let left = beats;
      const pieces = [];
      while (left > EPS) {
        const room = capacity - (cursor % capacity);
        const take = Math.min(left, room < EPS ? capacity : room);
        decompose(take).forEach((part) => pieces.push(part));
        cursor += take; left -= take;
      }
      pieces.forEach((part, i) => out.push(item.rest ? { rest: true, ...part, tie: false, notes: [] }
        : { rest: false, ...part, tie: i < pieces.length - 1 || Boolean(item.tie), notes: clone(item.notes) }));
    };
    items.forEach((item) => {
      const start = q(item.start + pickup); const end = q(item.end + pickup);
      if (end - start < EPS) return;
      if (start > cursor + EPS) push(start - cursor, { rest: true });
      if (start < cursor - EPS) { warnings.voices += 1; return; } // 和前一个音重叠（同一行里有交叉的声部）
      push(end - start, item);
    });
    return out;
  });
  // 两行都是空的就不算导入成功
  if (!voices.some((v) => v.some((e) => !e.rest))) throw new Error('empty');
  const twoStaves = voices.length === 2;
  return {
    clef: twoStaves ? 'grand' : clefs[0],
    key, meter, bpm,
    title: textOf(child(score, 'work'), 'work-title') || textOf(score, 'movement-title') || '',
    voices: twoStaves ? voices : [voices[0], []],
    warnings,
  };
}

/** .mxl（MusicXML 压缩包）→ 里面的乐谱文本：按 META-INF/container.xml 找 rootfile；用浏览器自带的 DecompressionStream 解压 */
export async function unzipMusicXML(buffer, { inflateRaw = null } = {}) {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  // 中央目录：从尾部找 End of central directory（PK\x05\x06）
  let end = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i -= 1) if (view.getUint32(i, true) === 0x06054b50) { end = i; break; }
  if (end < 0) throw new Error('not-zip');
  const entries = new Map();
  let p = view.getUint32(end + 16, true);
  const total = view.getUint16(end + 10, true);
  const decoder = new TextDecoder();
  for (let n = 0; n < total && view.getUint32(p, true) === 0x02014b50; n += 1) {
    const method = view.getUint16(p + 10, true); const size = view.getUint32(p + 20, true);
    const nameLength = view.getUint16(p + 28, true); const extra = view.getUint16(p + 30, true); const comment = view.getUint16(p + 32, true);
    const local = view.getUint32(p + 42, true);
    const name = decoder.decode(bytes.subarray(p + 46, p + 46 + nameLength));
    entries.set(name, { method, size, local });
    p += 46 + nameLength + extra + comment;
  }
  const read = async (name) => {
    const entry = entries.get(name);
    if (!entry) return null;
    const start = entry.local + 30 + view.getUint16(entry.local + 26, true) + view.getUint16(entry.local + 28, true);
    const data = bytes.subarray(start, start + entry.size);
    if (entry.method === 0) return decoder.decode(data);
    if (entry.method !== 8) throw new Error('unsupported-zip');
    if (inflateRaw) return decoder.decode(await inflateRaw(data)); // 测试用（旧版 Node 的 DecompressionStream 没有 deflate-raw）
    if (typeof DecompressionStream === 'undefined') throw new Error('unsupported-zip');
    const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Response(stream).text();
  };
  const container = await read('META-INF/container.xml');
  const rootPath = container && /full-path\s*=\s*"([^"]+)"/.exec(container)?.[1];
  const fallback = [...entries.keys()].find((name) => !name.startsWith('META-INF/') && /\.(xml|musicxml)$/i.test(name));
  const text = await read(rootPath || fallback);
  if (!text) throw new Error('not-musicxml');
  return text;
}

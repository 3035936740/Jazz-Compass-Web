// 复节奏与节拍调制（纯逻辑，可在 Node 里测试）
// 依据：
//   复节奏：两种以上不能看作同一拍子简单派生的节奏同时进行（如 3 对 2）：ref:wiki-polyrhythm
//   节拍调制：用旧速度里的某个时值去等于新速度里的某个时值（"音符 = 音符"），让速度变化平滑；
//   保持细分不变或保持拍子不变是两种常见做法：ref:omt2e-20c-rhythm
//   新速度 / 旧速度 = 新小节里的枢纽时值个数 / 旧小节里的枢纽时值个数：ref:wiki-metric-modulation
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
export const lcm = (a, b) => (a * b) / gcd(a, b);

/**
 * 复节奏：一个循环（cycle 拍）里两条轨分别平均分成 a 份与 b 份
 * accents：每条轨上重音的位置（默认第一下）；muted：静音
 * 返回 { grid: lcm 格数, tracks: [{ pulses, positions（格上的位置）}], events }
 */
export function polyrhythm(a, b, { cycle = 4, accents = [[0], [0]], muted = [false, false], pitches = [76, 64], repeats = 1 } = {}) {
  const grid = lcm(a, b);
  const tracks = [a, b].map((n, t) => ({
    pulses: n,
    positions: Array.from({ length: n }, (_, k) => (k * grid) / n),
    accents: new Set(accents[t] || []),
    muted: Boolean(muted[t]),
    pitch: pitches[t],
  }));
  const events = [];
  for (let r = 0; r < repeats; r += 1) {
    tracks.forEach((track, t) => {
      if (track.muted) return;
      for (let k = 0; k < track.pulses; k += 1) {
        const beat = r * cycle + (k * cycle) / track.pulses;
        const accent = track.accents.has(k);
        events.push({ beat, midi: track.pitch + (accent ? 0 : -5), duration: Math.min(0.25, cycle / track.pulses / 2), velocity: accent ? 1 : 0.5, step: Math.round((k * grid) / track.pulses) + r * grid, track: t });
      }
    });
  }
  return { grid, tracks, events: events.sort((x, y) => x.beat - y.beat), duration: cycle * repeats };
}

/** 两条轨在同一个格子上的对齐：哪些格两条都响、哪些只有一条（用来画网格与数"一 起 二"） */
export function alignment(a, b) {
  const grid = lcm(a, b);
  return Array.from({ length: grid }, (_, i) => ({ i, a: i % (grid / a) === 0, b: i % (grid / b) === 0 }));
}

// ---------------- 节拍调制 ----------------
/** 时值（以全音符为 1）：w h q e s；带点是附点；'3e' 表示三连音八分音符（三个占两个的时值） */
export function noteValue(id) {
  const m = /^(\d?)([whqes])(\.?)$/.exec(String(id));
  if (!m) return null;
  const base = { w: 1, h: 1 / 2, q: 1 / 4, e: 1 / 8, s: 1 / 16 }[m[2]];
  const dotted = m[3] ? 1.5 : 1;
  const tuplet = m[1] === '3' ? 2 / 3 : m[1] === '5' ? 4 / 5 : 1;
  return base * dotted * tuplet;
}

/**
 * 旧拍子：oldBeat（拍的时值）与 oldTempo（每分钟几拍）；枢纽：旧的 pivotOld = 新的 pivotNew；新拍子的拍时值 newBeat
 * 新速度 = 旧速度 ×（pivotNew / newBeat）÷（pivotOld / oldBeat）
 */
export function metricModulation({ oldTempo, oldBeat = 'q', pivotOld, pivotNew, newBeat = 'q' }) {
  const ob = noteValue(oldBeat); const nb = noteValue(newBeat); const po = noteValue(pivotOld); const pn = noteValue(pivotNew);
  if (!ob || !nb || !po || !pn) return null;
  const newTempo = (oldTempo * (pn / nb)) / (po / ob);
  const pivotSeconds = (60 / oldTempo) * (po / ob);
  return { newTempo, ratio: newTempo / oldTempo, pivotSeconds, oldBeatSeconds: 60 / oldTempo, newBeatSeconds: 60 / newTempo };
}

/**
 * 试听前后对比：前 bars 小节在旧速度 / 旧拍子（拍上重音 + 细分），然后切到新速度；枢纽时值用同一音高贯穿，耳朵可以跟着它过桥
 * 返回以"秒"为单位的事件（compositionAudio 用拍子计时，这里另外给出 bpm=60 时的拍值，即秒数）
 */
export function modulationEvents({ oldTempo, oldBeat = 'q', oldMeter = 4, oldSub = 'e', pivotOld, pivotNew, newBeat = 'q', newMeter = 4, newSub = 'e', bars = 2 }) {
  const mm = metricModulation({ oldTempo, oldBeat, pivotOld, pivotNew, newBeat });
  if (!mm) return null;
  const events = [];
  const section = (tempo, beat, meter, sub, start, bar0) => {
    const beatSec = 60 / tempo;
    const subPerBeat = Math.round(noteValue(beat) / noteValue(sub));
    for (let b = 0; b < bars * meter; b += 1) {
      const t0 = start + b * beatSec;
      events.push({ beat: t0, midi: b % meter === 0 ? 84 : 79, duration: 0.08, velocity: b % meter === 0 ? 1 : 0.7, bar: bar0 + Math.floor(b / meter), kind: 'beat' });
      for (let k = 1; k < subPerBeat; k += 1) events.push({ beat: t0 + (k * beatSec) / subPerBeat, midi: 72, duration: 0.05, velocity: 0.35, bar: bar0 + Math.floor(b / meter), kind: 'sub' });
    }
    return start + bars * meter * beatSec;
  };
  const mid = section(oldTempo, oldBeat, oldMeter, oldSub, 0, 0);
  const end = section(mm.newTempo, newBeat, newMeter, newSub, mid, bars);
  // 枢纽时值：整段用一个低音标出来（前后长度相同）
  for (let t = 0; t < end - 1e-6; t += mm.pivotSeconds) events.push({ beat: t, midi: 48, duration: Math.min(0.3, mm.pivotSeconds * 0.8), velocity: 0.6, bar: t < mid ? Math.floor(t / ((60 / oldTempo) * oldMeter)) : bars + Math.floor((t - mid) / ((60 / mm.newTempo) * newMeter)), kind: 'pivot' });
  return { ...mm, events: events.sort((x, y) => x.beat - y.beat), seconds: end, switchAt: mid };
}

/** OMT 的两种做法：细分不变（4/4 的八分 = 6/8 的八分）与拍不变（四分 = 附点四分） */
export const PRESETS = [
  { id: 'keepSub', oldBeat: 'q', oldMeter: 4, oldSub: 'e', pivotOld: 'e', pivotNew: 'e', newBeat: 'q.', newMeter: 2, newSub: 'e' },
  { id: 'keepBeat', oldBeat: 'q', oldMeter: 4, oldSub: 'e', pivotOld: 'q', pivotNew: 'q.', newBeat: 'q.', newMeter: 2, newSub: 'e' },
  { id: 'triplet', oldBeat: 'q', oldMeter: 4, oldSub: '3e', pivotOld: '3e', pivotNew: 'e', newBeat: 'q', newMeter: 4, newSub: 'e' },
  { id: 'wiki', oldBeat: 'q', oldMeter: 4, oldSub: '3h', pivotOld: '3h', pivotNew: 'h', newBeat: 'q', newMeter: 4, newSub: 'e' },
];

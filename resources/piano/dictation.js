// 旋律与节奏听写（纯逻辑，可在 Node 里测试）：出题、局部重听的片段、逐个比对答案
// 依据：
//   听写是把没见过的节奏、旋律、和弦进行写成谱；节奏听写可以先画"点格"（每拍一个点）再用斜线标起音、横线标延长、圆圈标休止；
//   旋律听写可以先画轮廓线、写唱名：ref:omt-pb-dictation
//   旋律听写：先写节奏，再在节奏上加音高（轮廓线、跳进处做记号、写唱名），最后转成五线谱；给出谱号、主音和拍号就能写成谱：ref:omt-pb-dictation
//   时值与附点、拍子：ref:omt2e-rhythm ref:omt2e-simple-meter；功能和弦进行（T–PD–D–T）：ref:omt2e-phrase-model
//   旋律题以 re–do 或 ti–do 收在主音上（完满正格终止的高声部落在 ^1）：ref:omt2e-cadences
import { keyInfo, fromStep, stepOf } from './motif_phrase.js';

const pick = (list, rng) => list[Math.floor(rng() * list.length)];
export const VALUE_BEATS = { w: 4, 'h.': 3, h: 2, 'q.': 1.5, q: 1, 'e.': 0.75, e: 0.5, s: 0.25 };

// 节奏格子（每格正好一拍或两拍），按难度分组
const CELLS = {
  1: [['q'], ['q'], ['h'], ['e', 'e'], ['rq']],
  2: [['q'], ['e', 'e'], ['h'], ['q.', 'e'], ['rq'], ['e', 'e'], ['re', 'e']],
  3: [['q'], ['e', 'e'], ['q.', 'e'], ['s', 's', 's', 's'], ['e', 's', 's'], ['s', 's', 'e'], ['re', 'e'], ['e.', 's']],
};
const cellBeats = (cell) => cell.reduce((s, v) => s + VALUE_BEATS[v.replace(/^r/, '')], 0);

/** 节奏题：bars 小节（meter 拍）；返回 [{ value, rest, beats }] */
export function rhythmQuestion({ level = 1, bars = 2, meter = 4, rng = Math.random } = {}) {
  const out = [];
  for (let b = 0; b < bars; b += 1) {
    let left = meter;
    while (left > 0) {
      const options = CELLS[level].filter((c) => cellBeats(c) <= left);
      const cell = pick(options, rng);
      cell.forEach((v) => out.push({ value: v.replace(/^r/, ''), rest: v.startsWith('r'), beats: VALUE_BEATS[v.replace(/^r/, '')] }));
      left -= cellBeats(cell);
    }
  }
  // 第一个音不用休止
  if (out[0].rest) out[0] = { ...out[0], rest: false };
  return out;
}

/** 低音线题：从主音开始、以主音结束；大多级进 偶尔跳四度或五度；degree 是音阶步数（0 = 主音，负数在主音下方） */
export function bassQuestion({ length = 6, key = keyInfo('C'), rng = Math.random, low = -3, high = 4 } = {}) {
  const steps = [0];
  for (let i = 1; i < length - 1; i += 1) {
    const prev = steps.at(-1);
    const moves = [-1, 1, -1, 1, -2, 2, 3, -3, 4, -4].filter((m) => prev + m >= low && prev + m <= high && prev + m !== prev);
    steps.push(prev + pick(moves, rng));
  }
  steps.push(0);
  // 主音放在 C3 一带（低音谱表）
  return steps.map((s) => ({ step: s, midi: fromStep(s, 0, key) + 48 }));
}

/** 和弦进行题：从 I 开始，按 T → PD → D 的方向走（ii 只放在 IV 之后，不放在前面）；结尾 V–I（正格）或停在 V（半终止） */
const NEXT = { I: ['vi', 'IV', 'ii'], vi: ['IV', 'ii'], IV: ['ii', 'V'], ii: ['V'], V: ['I'] };
export function progressionQuestion({ length = 4, rng = Math.random, ending = null } = {}) {
  const end = ending || pick(['authentic', 'half'], rng);
  const vAt = end === 'authentic' ? length - 2 : length - 1;
  for (let tries = 0; tries < 200; tries += 1) {
    const chords = ['I'];
    while (chords.length < vAt) {
      const options = NEXT[chords.at(-1)].filter((c) => c !== 'V');
      if (!options.length) break;
      chords.push(pick(options, rng));
    }
    if (chords.length !== vAt || !NEXT[chords.at(-1)].includes('V')) continue;
    chords.push('V');
    if (end === 'authentic') chords.push('I');
    return { chords, ending: end };
  }
  return { chords: end === 'authentic' ? ['I', 'IV', 'V', 'I'] : ['I', 'vi', 'IV', 'V'], ending: end };
}

/** 逐个比对：answer 与 key 等长部分逐个比较；多写 / 少写的也算错 */
export function compare(answer, correct, same = (a, b) => a === b) {
  const n = Math.max(answer.length, correct.length);
  const marks = Array.from({ length: n }, (_, i) => ({ i, answer: answer[i] ?? null, correct: correct[i] ?? null, ok: answer[i] != null && correct[i] != null && same(answer[i], correct[i]) }));
  return { marks, right: marks.filter((m) => m.ok).length, total: correct.length, perfect: marks.every((m) => m.ok) };
}

/** 节奏比对：按起音位置比，而不是按第几个音（少写一个音不会让后面的全部算错） */
export function compareRhythm(answer, correct) {
  const onsets = (list) => { const out = []; let t = 0; list.forEach((n) => { if (!n.rest) out.push(+t.toFixed(4)); t += n.beats; }); return { out, total: t }; };
  const a = onsets(answer); const c = onsets(correct);
  const setC = new Set(c.out); const setA = new Set(a.out);
  return {
    hits: a.out.filter((x) => setC.has(x)), extra: a.out.filter((x) => !setC.has(x)), missing: c.out.filter((x) => !setA.has(x)),
    lengthOk: Math.abs(a.total - c.total) < 1e-6, perfect: a.out.length === c.out.length && a.out.every((x) => setC.has(x)) && Math.abs(a.total - c.total) < 1e-6,
  };
}

/** 局部重听：取第 from 到 to 个（含）元素的时间范围 */
export function segment(items, from, to) {
  let t = 0; let start = 0; let end = 0;
  items.forEach((n, i) => { if (i === from) start = t; t += n.beats ?? 1; if (i === to) end = t; });
  return { start, end };
}

/** 节奏的点格：每拍一个点，起音画斜线、延长画横线、休止画圆圈（OMT 的听写策略） */
export function dotGrid(notes, { meter = 4, unit = 0.25 } = {}) {
  const cells = [];
  let t = 0;
  notes.forEach((n) => {
    const count = Math.round(n.beats / unit);
    for (let k = 0; k < count; k += 1) cells.push({ at: t + k * unit, mark: n.rest ? (k === 0 ? 'o' : ' ') : k === 0 ? '/' : '-', beat: Math.abs(((t + k * unit) % 1)) < 1e-9, barStart: Math.abs((t + k * unit) % meter) < 1e-9 });
    t += n.beats;
  });
  return cells;
}
export { stepOf };

/**
 * 旋律听写题：节奏 + 音高；从 do / mi / sol 开始，以 re–do 或 ti–do 结束，最后一个音是二分音符
 * level 1：两小节、四分 / 二分、大多级进；level 2：两小节、加八分音符和三度跳进；level 3：四小节、加附点和四五度跳进
 * @returns {Array<{ value, beats, rest, step?, midi? }>} midi 以主音在 C4 一带（高音谱表）
 */
export function melodyQuestion({ level = 1, key = keyInfo('C'), rng = Math.random, meter = 4 } = {}) {
  const bars = level === 3 ? 4 : 2;
  const rhythmLevel = level === 1 ? 1 : level === 2 ? 1 : 2;
  let rhythm = [...rhythmQuestion({ level: rhythmLevel, bars: bars - 1, meter, rng }), ...rhythmQuestion({ level: rhythmLevel, bars: 1, meter: meter - 2, rng }), { value: 'h', beats: 2, rest: false }];
  // 第一级不用休止和八分音符：休止改成音，两个八分并成一个四分（八分在节奏格子里总是成对出现，拍数不变）
  if (level === 1) rhythm = simplifyEighths(rhythm.map((n) => (n.rest ? { ...n, rest: false } : n)));
  const pitched = rhythm.filter((n) => !n.rest).length;
  const moves = level === 1 ? [-1, 1, -1, 1, -1, 1, 0, -2, 2] : level === 2 ? [-1, 1, -1, 1, -2, 2, 0, 2, -2, 3, -3] : [-1, 1, -1, 1, -2, 2, 3, -3, 4, -4, 0];
  const [low, high] = level === 1 ? [-2, 5] : [-3, 8];
  const steps = [pick([0, 2, 4], rng)];
  for (let i = 1; i < pitched - 2; i += 1) {
    const prev = steps.at(-1);
    const left = pitched - 2 - i; // 还剩几个音就要走到 re / ti
    let options = moves.filter((m) => prev + m >= low && prev + m <= high);
    if (left <= 2 && Math.abs(prev) > 2) options = options.filter((m) => Math.abs(prev + m) < Math.abs(prev)); // 往主音附近收
    steps.push(prev + pick(options.length ? options : [prev > 0 ? -1 : 1], rng));
  }
  const prev = steps.at(-1);
  if (pitched >= 2) {
    const before = pitched > 2 ? (Math.abs(prev - 1) <= Math.abs(prev + 1) ? 1 : -1) : pick([1, -1], rng);
    steps.push(before, 0);
  }
  let k = 0;
  return rhythm.map((n) => {
    if (n.rest) return { value: n.value, beats: n.beats, rest: true };
    const step = steps[k++] ?? 0;
    return { value: n.value, beats: n.beats, rest: false, step, midi: fromStep(step, 0, key) + 60 };
  });
}
/** 两个相邻八分音符并成一个四分音符（第一级用） */
function simplifyEighths(list) {
  const out = [];
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].value === 'e' && list[i + 1]?.value === 'e') { out.push({ value: 'q', beats: 1, rest: false }); i += 1; }
    else out.push(list[i]);
  }
  return out;
}

/**
 * 旋律比对：按起音位置对齐；每个正确的音看同一位置有没有写音、时值对不对、音高对不对
 * @returns {{ marks: Array<{ i, onset, rhythmOk, pitchOk, answerMidi }>, extra: number[], right, total, perfect }}
 */
export function compareMelody(answer, correct) {
  const timed = (list) => { let t = 0; return list.map((n, i) => { const item = { ...n, i, onset: +t.toFixed(4) }; t += n.beats; return item; }); };
  const a = timed(answer).filter((n) => !n.rest); const c = timed(correct);
  const byOnset = new Map(a.map((n) => [n.onset, n]));
  const marks = c.filter((n) => !n.rest).map((n) => {
    const hit = byOnset.get(n.onset);
    return { i: n.i, onset: n.onset, rhythmOk: Boolean(hit) && Math.abs(hit.beats - n.beats) < 1e-6, pitchOk: Boolean(hit) && hit.midi === n.midi, answerMidi: hit?.midi ?? null };
  });
  const onsets = new Set(c.filter((n) => !n.rest).map((n) => n.onset));
  const extra = a.filter((n) => !onsets.has(n.onset)).map((n) => n.onset);
  const right = marks.filter((m) => m.rhythmOk && m.pitchOk).length;
  return { marks, extra, right, total: marks.length, perfect: right === marks.length && !extra.length };
}

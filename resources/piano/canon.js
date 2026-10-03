// 模仿与卡农（纯逻辑，可在 Node 里测试）
// 依据：
//   卡农：先出现的旋律叫导句（dux），晚一段时间进入的模仿声部叫答句（comes）；答句可以严格复制音程（严格卡农）
//   或只保留度数、音程性质随音阶调整（自由卡农）；在同度或八度上完全一样的叫轮唱（round）；
//   倒影卡农：答句方向相反（导句下行几度 答句就上行几度）：ref:wiki-canon
//   两声部之间的音程分类（完全协和 P1 P5 P8、不完全协和 3 6、其余不协和）与平行五八度：ref:omt-intervals ref:omt-species1
import { harmonicClass } from './counterpoint.js';
import { intervalBetween } from './pitch_spelling.js';
import { keyInfo, stepOf, fromStep, spellNote, totalBeats } from './motif_phrase.js';

export const INTERVALS = [
  { id: 'unison', steps: 0, zh: '同度', en: 'unison', ja: '同度' },
  { id: 'octaveBelow', steps: -7, zh: '低八度', en: 'octave below', ja: '8 度下' },
  { id: 'octaveAbove', steps: 7, zh: '高八度', en: 'octave above', ja: '8 度上' },
  { id: 'fifthBelow', steps: -4, zh: '低五度', en: 'fifth below', ja: '5 度下' },
  { id: 'fourthBelow', steps: -3, zh: '低四度', en: 'fourth below', ja: '4 度下' },
  { id: 'fifthAbove', steps: 4, zh: '高五度', en: 'fifth above', ja: '5 度上' },
];

/**
 * 生成卡农的答句：
 *   type 'diatonic'（自由卡农：在音阶上移 steps 级）、'strict'（严格卡农：按半音精确移动，可能出调外音）、'inversion'（倒影卡农：以导句第一个音为轴反向，再移 steps 级）
 *   delay：答句晚几拍进入；voices：2 或 3（第三声部再晚一个 delay，再移同样的音程）
 */
export function buildCanon(leader, { key = keyInfo('C'), delay = 2, steps = -7, type = 'diatonic', voices = 2 } = {}) {
  const first = leader.find((n) => !n.rest);
  const axis = first ? stepOf(first.midi, key).step : 0;
  // 严格卡农的音程按大调 / 自然小调音阶从主音量（五度 = 纯五度 7 个半音），答句每个音都移同样的半音数
  const semis = (k) => fromStep(k, 0, key) - fromStep(0, 0, key);
  const follow = (notes, k) => notes.map((n) => {
    if (n.rest) return { ...n };
    const s = stepOf(n.midi, key);
    if (type === 'strict') return { ...n, midi: n.midi + semis(k) };
    if (type === 'inversion') return { ...n, midi: fromStep(2 * axis - s.step + k, -s.offset, key) };
    return { ...n, midi: fromStep(s.step + k, s.offset, key) };
  });
  const parts = [{ start: 0, notes: leader.map((n) => ({ ...n })), role: 'dux' }];
  for (let v = 1; v < voices; v += 1) parts.push({ start: delay * v, notes: follow(leader, steps * v), role: 'comes' });
  return { key, delay, steps, type, parts, length: Math.max(...parts.map((p) => p.start + totalBeats(p.notes))) };
}

/** 某一时刻每个声部正在响的音（没有就是 null） */
function soundingAt(part, beat) {
  let t = part.start;
  for (const n of part.notes) {
    if (beat >= t - 1e-9 && beat < t + n.beats - 1e-9) return n.rest ? null : { ...n, onset: Math.abs(beat - t) < 1e-9 };
    t += n.beats;
  }
  return null;
}

/**
 * 检查两个声部（默认导句与第一个答句）在每个起音点上的音程：
 *   落在拍上的不协和音程标为 'dissonance'（拍外的当作经过 / 辅助，只提示）；两个声部都动、接连构成同样的完全协和音程标为平行五 / 八度
 */
export function checkCanon(canon, { a = 0, b = 1, meter = 4 } = {}) {
  const pa = canon.parts[a]; const pb = canon.parts[b];
  if (!pa || !pb) return { points: [], issues: [] };
  const onsets = new Set();
  [pa, pb].forEach((p) => { let t = p.start; p.notes.forEach((n) => { onsets.add(+t.toFixed(4)); t += n.beats; }); });
  const points = [];
  [...onsets].sort((x, y) => x - y).forEach((beat) => {
    const x = soundingAt(pa, beat); const y = soundingAt(pb, beat);
    if (!x || !y) return;
    const iv = intervalBetween(spellNote(x.midi, canon.key), spellNote(y.midi, canon.key));
    const cls = harmonicClass(iv);
    points.push({ beat, upper: Math.max(x.midi, y.midi), lower: Math.min(x.midi, y.midi), interval: iv?.name || '?', simple: iv?.simpleName, cls, strong: Math.abs(beat - Math.round(beat)) < 1e-9, bothMove: x.onset && y.onset, crossed: y.midi > x.midi !== (pb.notes[0]?.midi > pa.notes[0]?.midi) });
  });
  const issues = [];
  points.forEach((p, i) => {
    if (p.cls === 'dissonant' && p.strong) issues.push({ beat: p.beat, rule: 'dissonance', severity: 'error', ref: 'omt-intervals' });
    else if (p.cls === 'dissonant') issues.push({ beat: p.beat, rule: 'passing', severity: 'info', ref: 'omt-intervals' });
    const prev = points[i - 1];
    if (prev && p.bothMove && prev.cls === 'perfect' && p.cls === 'perfect' && prev.simple === p.simple && prev.upper !== p.upper) issues.push({ beat: p.beat, rule: p.simple?.endsWith('5') ? 'parallel-5' : 'parallel-8', severity: 'error', ref: 'omt-species1' });
  });
  return { points, issues };
}

/** 播放事件：每个声部一条，muted 里的声部不发声；bar 用来高亮正在响的那一拍 */
export function canonEvents(canon, { muted = [] } = {}) {
  const events = [];
  canon.parts.forEach((p, v) => {
    if (muted[v]) return;
    let t = p.start;
    p.notes.forEach((n) => { if (!n.rest) events.push({ beat: t, midi: n.midi, duration: n.beats * 0.95, velocity: v === 0 ? 0.85 : 0.7, step: Math.floor(t), voice: v }); t += n.beats; });
  });
  return { events: events.sort((x, y) => x.beat - y.beat), duration: canon.length };
}

// Original editable examples and calculations. References supply concepts, not scores or recordings.
// ref:rubin-nonfunctional ref:koozin-planing ref:arndt-tonality
// ref:omt2e-normal-order ref:omt2e-prime-form ref:omt2e-ic-vector
// ref:ircam-spectrum ref:ircam-spectral ref:gann-ji ref:gann-ji-reasons
// ref:omt2e-chord-symbols
// ref:wiki-parallel-harmony ref:wiki-chromatic-mediant ref:wiki-polytonality ref:wiki-petrushka-chord ref:wiki-octatonic ref:wiki-atonality ref:wiki-spectral-music ref:wiki-limit
import { QUALITIES, parseChordSymbol } from './chord_symbols.js';
import { parsePitch, simplestName, formatNote } from './pitch_spelling.js';
import { parseRatio, ratioValue, ratioLabel, centsFromRatio, ratioBetween } from './microtonal.js';
import { setClassInfo, transpose as tnPcs, invert as inPcs, normalOrder } from './post_tonal.js';

export const MODERN_TOOL_IDS = ['nonfunctional', 'polytonality', 'atonality', 'spectralharmony', 'microtonalharmony'];
export const SCALES = { major: [0, 2, 4, 5, 7, 9, 11], minor: [0, 2, 3, 5, 7, 8, 10], dorian: [0, 2, 3, 5, 7, 9, 10], whole: [0, 2, 4, 6, 8, 10] };
export const DEFAULTS = {
  nonfunctional: { mode: 'exact', voicing: 'C4 E4 G4', shifts: '0 2 4 1', root: 'C4', scale: 'major', chords: 'C4 E4 G4 | C4 Eb4 Ab4 | B3 E4 G4', pedal: '', bpm: 90 },
  polytonality: { rootA: 'C3', scaleA: 'major', patternA: '1:2 5:1 3:1 1:2', rootB: 'D5', scaleB: 'major', patternB: '1:1 3:1 5:1 4:1 2:1 1:1', repeats: 2, bpm: 100 },
  atonality: { motif: 'C4 Db4 G4 E4', transform: 'T', transpose: 3, pivot: 'C4', compare: 'E4 F4 B4 Ab4', bpm: 100 },
  spectralharmony: { fundamental: 110, partials: '4:1:0 5:0.8:0 6:0.7:0 7:0.5:0 11:0.3:0', morph: 100, grid: 'quarter', bpm: 60 },
  microtonalharmony: { fundamental: 220, ratiosA: '1/1 5/4 3/2', ratiosB: '1/1 5/4 3/2', rootRatio: '4/3', edo: 19, bpm: 60 },
};
export const PRESETS = {
  nonfunctional: [
    { ...DEFAULTS.nonfunctional },
    { ...DEFAULTS.nonfunctional, mode: 'diatonic', shifts: '0 1 2 3' },
    { ...DEFAULTS.nonfunctional, mode: 'manual', pedal: 'C3' },
    { ...DEFAULTS.nonfunctional, mode: 'manual', chords: 'C4 E4 G4 | E4 G#4 B4 | C4 E4 G4 | Eb4 Gb4 Bb4', pedal: '' },
  ],
  polytonality: [
    { ...DEFAULTS.polytonality },
    { ...DEFAULTS.polytonality, rootB: 'F#5' },
    { ...DEFAULTS.polytonality, rootB: 'C5', scaleB: 'minor' },
    { ...DEFAULTS.polytonality, rootA: 'C4', patternA: '1:1 3:1 5:1 3:1', rootB: 'F#5', patternB: '1:1 3:1 5:1 3:1' },
  ],
  atonality: [
    { ...DEFAULTS.atonality },
    { ...DEFAULTS.atonality, transform: 'I', pivot: 'E4' },
    { ...DEFAULTS.atonality, transform: 'RI', transpose: 0 },
  ],
  spectralharmony: [
    { ...DEFAULTS.spectralharmony },
    { ...DEFAULTS.spectralharmony, partials: '1:1:0 2:0.7:12 3:0.6:25 4:0.5:40 5:0.4:60' },
    { ...DEFAULTS.spectralharmony, partials: '7:1:0 9:0.8:0 11:0.6:0 13:0.5:0' },
  ],
  microtonalharmony: [
    { ...DEFAULTS.microtonalharmony },
    { ...DEFAULTS.microtonalharmony, ratiosA: '1/1 5/4 3/2 7/4', ratiosB: '1/1 5/4 3/2 7/4', edo: 31 },
    { ...DEFAULTS.microtonalharmony, rootRatio: '1/1', ratiosB: '1/1 81/64 3/2', edo: 12 },
    { ...DEFAULTS.microtonalharmony, ratiosA: '1/1 11/9 3/2', ratiosB: '1/1 11/9 3/2', rootRatio: '3/2', edo: 24 },
  ],
};
export class ToolInputError extends Error {
  constructor(code, token = '') { super(code); this.code = code; this.token = String(token).slice(0, 36); }
}
export function numberIn(value, min, max, integer = false) {
  const n = typeof value === 'string' && !value.trim() ? NaN : Number(value);
  if (!Number.isFinite(n) || n < min || n > max || (integer && !Number.isInteger(n))) throw new ToolInputError('range', `${min}…${max}`);
  return n;
}
const tokens = (text, max = 32) => {
  const parts = String(text).trim().split(/[\s,，;；]+/).filter(Boolean);
  if (!parts.length || parts.length > max) throw new ToolInputError('count', `1…${max}`);
  return parts;
};
export const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);
export const pc = (midi) => ((midi % 12) + 12) % 12;
export const noteLabel = (midi) => simplestName(pc(midi), false) + (Math.floor(midi / 12) - 1);
const checkMidi = (midi) => numberIn(midi, 12, 119, true);
export function pitchInput(text) {
  const p = parsePitch(text);
  if (!p || p.midi < 12 || p.midi > 119) throw new ToolInputError('pitch', text);
  return p.midi;
}
export const parseNotes = (text, max = 16) => tokens(text, max).map(pitchInput);
export function chordSymbolNotes(text) {
  const chord = parseChordSymbol(String(text));
  if (!chord || chord.realization) throw new ToolInputError('chordSymbol', text);
  return parseNotes(chord.pitches.join(' '));
}
const pcsOf = (notes) => [...new Set(notes.map(pc))].sort((a, b) => a - b);
const event = (notes, at, duration, index) => ({ frequencies: notes.map(hz), at, duration, index });
function scaleOf(root, name) {
  const scale = SCALES[name];
  if (!scale) throw new ToolInputError('scale', name);
  return { root: pitchInput(root), steps: scale };
}
function diatonicPosition(midi, root, steps) {
  const distance = midi - root, octave = Math.floor(distance / 12);
  const degree = steps.indexOf(pc(distance));
  if (degree < 0) throw new ToolInputError('outsideScale', noteLabel(midi));
  return octave * steps.length + degree;
}
function scalePitch(position, root, steps) {
  return checkMidi(root + 12 * Math.floor(position / steps.length) + steps[((position % steps.length) + steps.length) % steps.length]);
}
/** Exact pitch-class matches only: never invent missing thirds, fifths or roots. */
export function voicingChordNames(notes, { spelled = '', bass = Math.min(...notes) } = {}) {
  const pitches = pcsOf(notes), bassPc = pc(bass);
  const spellings = new Map();
  for (const text of String(spelled).trim().split(/[\s,，;；|]+/)) {
    const pitch = parsePitch(text);
    if (pitch && !spellings.has(pitch.pc)) spellings.set(pitch.pc, formatNote(pitch.step, pitch.accidental));
  }
  const preferFlats = /[b♭]/.test(spelled);
  const name = pitchClass => spellings.get(pitchClass) || simplestName(pitchClass, preferFlats);
  const roots = [...pitches].sort((a,b) => Number(b === bassPc) - Number(a === bassPc) || a-b);
  const names = [];
  for (const root of roots) {
    const offsets = pitches.map(n => pc(n-root)).sort((a,b)=>a-b);
    for (const quality of QUALITIES) {
      if (quality.random || quality.id === 'blk') continue;
      const expected = [...new Set(quality.tones.map(([,n])=>pc(n)))].sort((a,b)=>a-b);
      if (offsets.length === expected.length && offsets.every((n,i)=>n === expected[i])) {
        names.push(name(root) + quality.suffix + (bassPc === root ? '' : '/' + name(bassPc)));
      }
    }
  }
  return [...new Set(names)];
}
// ---------- 新增分析：连接类型、复合和弦、动机关系与无调性做法、频谱近似与差音、比例和弦的音程 ----------
const DIATONIC = [0, 2, 4, 5, 7, 9, 11];
/** 这些音级是否都在某一个自然音集（大调音阶的十二个移位之一）里 */
export const inDiatonic = (pcs) => Array.from({ length: 12 }, (_, t) => DIATONIC.map((x) => (x + t) % 12)).some((set) => pcs.every((p) => set.includes(pc(p))));
/** 大 / 小三和弦的根音与性质（只认三个音级正好构成的三和弦） */
export function triadOf(notes) {
  const set = pcsOf(notes);
  if (set.length !== 3) return null;
  for (const root of set) {
    const shape = set.map((n) => pc(n - root)).sort((a, b) => a - b).join(',');
    if (shape === '0,4,7') return { root, quality: 'major' };
    if (shape === '0,3,7') return { root, quality: 'minor' };
  }
  return null;
}
/**
 * 两个和弦之间的连接（ref:wiki-parallel-harmony ref:koozin-planing ref:wiki-chromatic-mediant ref:rubin-nonfunctional）：
 *   planing：real 等距平行（每个声部移动同样的半音数，音程结构完全相同）/ diatonic 音阶内平行（各声部同方向移动、两个和弦都在同一个自然音集里，音程可能改变）
 *   mediant：chromatic 半音中音（根音相距大 / 小三度、同为大三或小三、一个共同音）/ doubly 双重半音中音（性质相反、没有共同音）
 *   common：共同音级个数（共同音连接）
 */
export function connectionOf(previous, notes) {
  const common = pcsOf(notes).filter((n) => pcsOf(previous).includes(n)).length;
  let planing = null;
  if (previous.length === notes.length && notes.length > 1) {
    const moves = notes.map((n, i) => n - previous[i]);
    if (moves.every((m) => m === moves[0]) && moves[0] !== 0) planing = 'real';
    else if (moves.every((m) => m > 0) || moves.every((m) => m < 0)) planing = inDiatonic([...previous, ...notes]) ? 'diatonic' : null;
  }
  let mediant = null;
  const a = triadOf(previous), b = triadOf(notes);
  if (a && b && [3, 4, 8, 9].includes(pc(b.root - a.root))) {
    if (a.quality === b.quality && common === 1) mediant = 'chromatic';
    else if (a.quality !== b.quality && common === 0) mediant = 'doubly';
  }
  return { planing, mediant, common };
}
const OCTATONIC = [0, 1, 2].map((t) => [0, 1, 3, 4, 6, 7, 9, 10].map((x) => (x + t) % 12));
/**
 * 两层叠置的纵向分析（ref:arndt-tonality ref:wiki-polytonality ref:wiki-petrushka-chord ref:wiki-octatonic）：
 * 各层是否构成大 / 小三和弦，合起来的音级集合与集合类，是否是"相距三全音的两个大三和弦"（彼得鲁什卡和弦），是否全部落在一个八声音集里
 */
export function polychordOf(model) {
  const triadA = triadOf(model.a.pcs), triadB = triadOf(model.b.pcs);
  const union = model.union;
  const petrushka = Boolean(triadA && triadB && triadA.quality === 'major' && triadB.quality === 'major' && pc(triadB.root - triadA.root) === 6);
  const octatonic = OCTATONIC.findIndex((set) => union.every((p) => set.includes(p)));
  return { triadA, triadB, info: setClassInfo(union), petrushka, octatonic };
}
/** 两个音级集合之间的 Tn / TnI 关系（ref:omt2e-normal-order ref:omt2e-prime-form）：返回所有成立的 n */
export function setRelations(a, b) {
  const key = (pcs) => [...new Set(pcs.map(pc))].sort((x, y) => x - y).join(',');
  const target = key(b), base = [...new Set(a.map(pc))];
  if (base.length !== new Set(b.map(pc)).size) return { T: [], I: [] };
  const T = [], I = [];
  for (let n = 0; n < 12; n++) {
    if (key(tnPcs(base, n)) === target) T.push(n);
    if (key(inPcs(base, n)) === target) I.push(n);
  }
  return { T, I };
}
/**
 * Kostka 与 Payne 归纳的勋伯格自由无调性的四个做法（ref:wiki-atonality），逐条检查一条旋律：
 *   octaves 避免旋律上的八度 / 同音重复（同一音级再次出现）；triads 避免相邻三个音构成大 / 小三和弦；
 *   diatonic 避免连续超过三个音来自同一个自然音阶；disjunct 多用跳进（这里统计级进与跳进的比例）
 * 只描述这条旋律，不判断整首作品是不是无调性。
 */
export function atonalChecks(notes) {
  const octaves = [];
  notes.forEach((n, i) => notes.slice(0, i).forEach((m, j) => { if (pc(m) === pc(n)) octaves.push([j, i]); }));
  const triads = [];
  for (let i = 0; i + 2 < notes.length; i++) if (triadOf(notes.slice(i, i + 3))) triads.push(i);
  const diatonic = [];
  for (let i = 0; i + 3 < notes.length; i++) if (inDiatonic(notes.slice(i, i + 4))) diatonic.push(i);
  const gaps = notes.slice(1).map((n, i) => Math.abs(n - notes[i]));
  const steps = gaps.filter((g) => g > 0 && g <= 2).length, leaps = gaps.filter((g) => g > 2).length;
  return { octaves, triads, diatonic, steps, leaps, disjunct: leaps >= steps };
}
/** 把频率近似到每半音 n 等分的网格（ref:ircam-spectral：格里塞把非平均律音高近似到最近的四分之一音或六分之一音） */
export function nearestGrid(hertz, perSemitone = 1) {
  const position = (69 + 12 * Math.log2(hertz / 440)) * perSemitone, step = Math.round(position);
  const semis = step / perSemitone, midi = Math.round(semis - 1e-9), rest = Math.round((semis - midi) * 100); // 正好半音中间时记成低音 +50¢
  return { note: noteLabel(midi), offset: rest, deviation: (position - step) * 100 / perSemitone };
}
/** 相邻（按频率排序）两个有声成分之间的一阶差音 f2 − f1（ref:wiki-spectral-music：差音是频谱音乐使用的心理声学现象之一） */
export function differenceTones(rows) {
  const audible = rows.filter((r) => r.amplitude > 0).sort((x, y) => x.frequency - y.frequency);
  return audible.slice(1).map((r, i) => ({ low: audible[i], high: r, frequency: r.frequency - audible[i].frequency }));
}
const largestPrime = (n) => { let p = 1, x = n; for (let f = 2; f * f <= x; f++) while (x % f === 0) { p = f; x /= f; } return x > 1 ? Math.max(p, x) : p; };
/** 比例的质数极限：分子分母里最大的质因数（ref:gann-ji ref:wiki-limit） */
export const primeLimitOf = ({ numerator, denominator }) => Math.max(largestPrime(numerator), largestPrime(denominator));
/** 一个比例和弦里相邻两音之间的音程：比例、音分、质数极限 */
export function chordIntervals(text) {
  const list = tokens(text, 16).map((t) => { try { return parseRatio(t); } catch { throw new ToolInputError('ratio', t); } });
  return list.slice(1).map((r, i) => {
    const between = ratioBetween(list[i], r);
    return { from: ratioLabel(list[i]), to: ratioLabel(r), ratio: ratioLabel(between), cents: centsFromRatio(between), limit: primeLimitOf(between) };
  });
}
export function nonfunctionalModel(input) {
  let chords, spellingGroups;
  if (input.mode === 'manual') {
    const groups = String(input.chords).split('|');
    if (groups.length < 2 || groups.length > 16) throw new ToolInputError('count', '2…16');
    chords = groups.map((group) => parseNotes(group));
    spellingGroups = groups;
  } else {
    const base = parseNotes(input.voicing);
    spellingGroups = null;
    const shifts = tokens(input.shifts, 16).map((s) => numberIn(s, -24, 24, true));
    if (input.mode === 'exact') chords = shifts.map((shift) => base.map((n) => checkMidi(n + shift)));
    else if (input.mode === 'diatonic') {
      const { root, steps } = scaleOf(input.root, input.scale);
      const positions = base.map((n) => diatonicPosition(n, root, steps));
      chords = shifts.map((shift) => positions.map((p) => scalePitch(p + shift, root, steps)));
    } else throw new ToolInputError('mode');
  }
  const pedal = String(input.pedal).trim() ? pitchInput(input.pedal) : null;
  if (chords.some((notes) => new Set(pedal === null ? notes : [pedal, ...notes]).size > 16)) throw new ToolInputError('count', '1…16');
  const rows = chords.map((notes, index) => {
    const previous = chords[index - 1];
    const intervals = notes.map((n) => n - notes[0]);
    const common = previous ? pcsOf(notes).filter((n) => pcsOf(previous).includes(n)) : [];
    const movement = previous?.length === notes.length ? notes.map((n, i) => n - previous[i]) : null;
    const bass = Math.min(...notes, ...(pedal === null ? [] : [pedal]));
    const chordNames = voicingChordNames(notes, { bass, spelled: `${spellingGroups ? spellingGroups[index] : input.voicing} ${input.pedal || ''}` });
    return { notes, intervals, common, movement, index, chordNames, connection: previous ? connectionOf(previous, notes) : null };
  });
  return { rows, events: rows.map((row) => event(pedal === null ? row.notes : [pedal, ...row.notes], row.index * 2, 1.8, row.index)), pedal };
}
function pattern(text, root, steps, repeats) {
  let at = 0;
  const source = tokens(text, 32).map((s) => {
    const m = s.match(/^(r|\d{1,2}|[A-G][#b♯♭x]{0,2}[0-8])(?::(\d+(?:\.\d+)?))?$/i);
    if (!m) throw new ToolInputError('pattern', s);
    const duration = m[2] === undefined ? 1 : numberIn(m[2], .25, 4);
    const midi = m[1].toLowerCase() === 'r' ? null : /^[A-G]/i.test(m[1]) ? pitchInput(m[1]) : scalePitch(numberIn(m[1], 1, 15, true) - 1, root, steps);
    return { midi, duration };
  });
  const rows = [];
  for (let pass = 0; pass < repeats; pass++) for (const row of source) { rows.push({ ...row, at, index: rows.length }); at += row.duration; }
  return { rows, length: at, pcs: pcsOf(source.filter((row) => row.midi !== null).map((row) => row.midi)) };
}
export function polytonalityModel(input) {
  const repeats = numberIn(input.repeats, 1, 4, true);
  const aScale = scaleOf(input.rootA, input.scaleA), bScale = scaleOf(input.rootB, input.scaleB);
  const a = pattern(input.patternA, aScale.root, aScale.steps, repeats);
  const b = pattern(input.patternB, bScale.root, bScale.steps, repeats);
  const eventsFor = (layer, name) => layer.rows.filter((row) => row.midi !== null).map((row) => ({ ...event([row.midi], row.at, row.duration * .9, row.index), layer: name }));
  const eventsA = eventsFor(a, 'A'), eventsB = eventsFor(b, 'B');
  return { a, b, eventsA, eventsB, events: [...eventsA, ...eventsB].sort((x, y) => x.at - y.at), union: [...new Set([...a.pcs, ...b.pcs])].sort((x, y) => x - y), sameCenter: pc(aScale.root) === pc(bScale.root) };
}
export function polytonalityAnalysis(input) {
  const model = polytonalityModel(input);
  return { ...model, poly: polychordOf(model) };
}
export function atonalityModel(input) {
  const source = parseNotes(input.motif, 32);
  const shift = numberIn(input.transpose, -24, 24, true), pivot = pitchInput(input.pivot);
  let notes;
  switch (input.transform) {
    case 'T': notes = source.map((n) => n + shift); break;
    case 'I': notes = source.map((n) => 2 * pivot - n + shift); break;
    case 'R': notes = [...source].reverse().map((n) => n + shift); break;
    case 'RI': notes = [...source].reverse().map((n) => 2 * pivot - n + shift); break;
    default: throw new ToolInputError('mode');
  }
  notes.forEach(checkMidi);
  const gaps = (list) => list.slice(1).map((n, i) => n - list[i]);
  const compare = String(input.compare ?? '').trim() ? parseNotes(input.compare, 32) : null;
  return { source, notes, gaps: gaps(notes), sourceGaps: gaps(source), info: setClassInfo(notes), sourceInfo: setClassInfo(source),
    checks: atonalChecks(source), compare, compareInfo: compare ? setClassInfo(compare) : null, relation: compare ? setRelations(source, compare) : null, events: notes.map((n, i) => event([n], i, .85, i)), original: source.map((n, i) => event([n], i, .85, i)) };
}
export function nearestTwelve(hertz) {
  const position = 69 + 12 * Math.log2(hertz / 440), midi = Math.round(position);
  return { midi, note: noteLabel(midi), deviation: (position - midi) * 100 };
}
function checkHz(value) { return numberIn(value, 20, 12000); }
export function spectralModel(input) {
  const fundamental = numberIn(input.fundamental, 20, 1000), morph = numberIn(input.morph, 0, 100) / 100;
  const rows = (String(input.partials).trim() ? tokens(input.partials, 16) : []).map((text, index) => {
    // The first field is a frequency multiplier, not necessarily an integer harmonic.
    const m = text.match(/^(\d+(?:\.\d+)?(?:\/\d+)?)(?::(\d+(?:\.\d+)?))?(?::([+-]?\d+(?:\.\d+)?))?$/);
    if (!m) throw new ToolInputError('partial', text);
    const [numerator, denominator = '1'] = m[1].split('/');
    const n = numberIn(Number(numerator) / numberIn(denominator, 1, 999), 1 / 32, 32);
    if (m[1].includes('/')) numberIn(numerator, 1, 999, true);
    const amplitude = m[2] === undefined ? Math.min(1, 1 / Math.sqrt(n)) : numberIn(m[2], 0, 1);
    const offset = m[3] === undefined ? 0 : numberIn(m[3], -600, 600);
    const ratio = n * 2 ** (offset * morph / 1200), frequency = checkHz(fundamental * ratio);
    return { n, label: m[1], amplitude, targetOffset: offset, offset: offset * morph, ratio, frequency, cents: 1200 * Math.log2(ratio), nearest: nearestTwelve(frequency), index };
  });
  const audible = rows.filter(row => row.amplitude > 0);
  const partialEvent = (row) => ({ frequencies: [row.frequency], amplitudes: [row.amplitude], at: row.index, duration: .9, index: row.index, timbre: 'sine' });
  const perSemitone = { semi: 1, quarter: 2, sixth: 3 }[String(input.grid ?? 'semi')];
  if (!perSemitone) throw new ToolInputError('mode');
  rows.forEach((row) => { row.grid = nearestGrid(row.frequency, perSemitone); });
  const differences = differenceTones(rows);
  return { rows, differences, perSemitone, events: [...audible].sort((a,b) => a.frequency - b.frequency).map((row,order) => ({ ...partialEvent(row), at:order })), chord: audible.length ? [{ frequencies: rows.map((r) => r.frequency), amplitudes: rows.map((r) => r.amplitude), at: 0, duration: 3, index: 0, all: true, timbre: 'sine' }] : [], approximation: audible.length ? [{ frequencies: rows.map((r) => hz(r.nearest.midi)), amplitudes: rows.map((r) => r.amplitude), at: 0, duration: 3, index: 0, all: true, timbre: 'sine' }] : [] };
}
// Validate the whole candidate before replacing the current spectrum or its saved draft.
export function addSpectralComponent(input, { ratio, amplitude = .5, offset = 0 }) {
  const label = String(ratio).trim();
  if (!/^(\d+(?:\.\d+)?(?:\/\d+)?)$/.test(label)) throw new ToolInputError('partial', label);
  const token = label + ':' + numberIn(amplitude, 0, 1) + ':' + numberIn(offset, -600, 600);
  const next = { ...input, partials: [String(input.partials).trim(), token].filter(Boolean).join(' ') };
  spectralModel(next);
  return next;
}
export function removeSpectralComponent(input, index) {
  const current = spectralModel(input);
  const position = numberIn(index, 0, current.rows.length - 1, true);
  const next = { ...input, partials: tokens(input.partials, 16).filter((_,i) => i !== position).join(' ') };
  spectralModel(next);
  return next;
}
export function microtonalModel(input) {
  const fundamental = numberIn(input.fundamental, 20, 1000), edo = numberIn(input.edo, 5, 120, true);
  function getRatio(text) { try { return parseRatio(text); } catch { throw new ToolInputError('ratio', text); } }
  const rootRatio = ratioValue(getRatio(input.rootRatio));
  const build = (text, root, layer) => tokens(text, 16).map((token, index) => {
    const ratio = getRatio(token), frequency = checkHz(fundamental * root * ratioValue(ratio));
    const cents = 1200 * Math.log2(root) + centsFromRatio(ratio);
    const step = Math.round(cents * edo / 1200), temperedHz = checkHz(fundamental * 2 ** (step / edo));
    return { ratio: ratioLabel(ratio), cents, frequency, step, temperedHz, error: step * 1200 / edo - cents, layer, index };
  });
  const a = build(input.ratiosA, 1, 'A'), b = build(input.ratiosB, rootRatio, 'B');
  const commonHz = [...new Set(a.filter((x) => b.some((y) => Math.abs(Math.log2(x.frequency / y.frequency)) < 1e-10)).map((x) => x.frequency))];
  const commonSteps = [...new Set(a.filter((x) => b.some((y) => x.step === y.step)).map((x) => x.step))];
  const chord = (rows, tempered, at, index) => ({ frequencies: rows.map((row) => tempered ? row.temperedHz : row.frequency), timbre: 'sine', at, duration: 2, index });
  return { a, b, edo, commonHz, commonSteps, intervalsA: chordIntervals(input.ratiosA), intervalsB: chordIntervals(input.ratiosB), just: [chord(a, false, 0, 0), chord(b, false, 3, 1)], tempered: [chord(a, true, 0, 0), chord(b, true, 3, 1)] };
}
export const MODEL_OF = { nonfunctional: nonfunctionalModel, polytonality: polytonalityAnalysis, atonality: atonalityModel, spectralharmony: spectralModel, microtonalharmony: microtonalModel };

/** One owner for queue, sounding voices and highlights. Editing, navigation and Esc call stop(). */
export function createToolPlayer({ sound, silence, onEvent = () => {}, onRelease = () => {}, onEnd = () => {}, setTimer = setTimeout, clearTimer = clearTimeout }) {
  let timers = [], generation = 0, voices = [], active = false;
  function stop() {
    generation++;
    timers.forEach(clearTimer); timers = [];
    voices.forEach((voice) => voice?.stop?.()); voices = [];
    if (active) silence?.();
    active = false;
    onEnd();
  }
  function play(events, bpm = 90) {
    const seconds = 60 / numberIn(bpm, 30, 240);
    stop();
    if (!events.length) return;
    active = true;
    const current = generation;
    const sorted = [...events].sort((a, b) => a.at - b.at);
    sorted.forEach((item, index) => {
      const trigger = () => {
        if (current !== generation) return;
        const voice = sound(item, item.duration * seconds, index === 0);
        if (voice) voices.push(voice);
        onEvent(item);
        timers.push(setTimer(() => { if (current === generation) onRelease(item); }, item.duration * seconds * 1000));
      };
      if (item.at === 0) trigger(); // AudioContext is unlocked by the user gesture.
      else timers.push(setTimer(trigger, item.at * seconds * 1000));
    });
    const end = Math.max(...sorted.map((item) => item.at + item.duration));
    timers.push(setTimer(() => { if (current === generation) stop(); }, end * seconds * 1000 + 100));
  }
  return { play, stop, get active() { return active; } };
}

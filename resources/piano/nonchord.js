// 和弦外音（embellishing tones）识别
// 定义依据：
//   ref:omt2e-embellishing  Open Music Theory 2e「Embellishing Tones」：
//     经过音 级进进入、同方向级进离开；辅助音 级进进入、反方向级进离开；
//     倚音 跳进进入、反方向级进离开（多在较强拍）；逃音 级进进入、反方向跳进离开（多在较弱拍）；
//     挂留 以静止音进入、级进下行离开（较强拍）；延留 以静止音进入、级进上行离开（较强拍）；
//     持续音 和弦变化下方的一串静止音；先现音 和弦音提前作为和弦外音出现。
//   ref:omt-embellishing    Open Music Theory「Embellishing tones」：
//     完全辅助音回到同一个稳定音；双辅助音以同一稳定音开始和结束，中间是其上方与下方的级进音；
//     不完全辅助音为非重音、跳进进入并级进到重音上的稳定音。
import { parsePitch } from './pitch_spelling.js';

export const NCT_TYPES = ['PT', 'NT', 'DN', 'APP', 'INT', 'ET', 'SUS', 'RET', 'ANT', 'PED'];

/** 4/4 中的拍位强弱：小节第 1 拍 3，第 3 拍 2，其余正拍 1，拍内 0 */
export function metricWeight(onset, beats = 4) {
  const pos = ((onset % beats) + beats) % beats;
  if (pos === 0) return 3;
  if (beats === 4 && pos === 2) return 2;
  if (Number.isInteger(pos)) return 1;
  return 0;
}

const stepBetween = (a, b) => a && b && Math.abs(b.diatonic - a.diatonic) === 1;
const leapBetween = (a, b) => a && b && Math.abs(b.diatonic - a.diatonic) >= 2;
const dir = (a, b) => Math.sign(b.midi - a.midi);

/**
 * @param {Array<{ p: string, d: number }>} melody 旋律（时值以四分音符计），休止写 p: null
 * @param {Array<{ start: number, pcs: number[], label?: string }>} chords 和弦及其开始时刻（四分音符计），按时间排序
 * @param {{ beats?: number }} options
 * @returns {Array<{ index, onset, pitch, chord, chordTone, type, accented }>}
 */
export function analyzeEmbellishingTones(melody, chords, { beats = 4 } = {}) {
  const notes = [];
  let onset = 0;
  melody.forEach((item, index) => {
    const pitch = item.p ? parsePitch(item.p) : null;
    if (item.p && !pitch) throw new Error(`无法识别的音: ${item.p}`);
    if (pitch) notes.push({ index, onset, duration: item.d, pitch });
    onset += item.d;
  });
  const chordAt = (time) => {
    let current = null;
    for (const chord of chords) if (chord.start <= time + 1e-9) current = chord;
    return current;
  };
  notes.forEach((note) => {
    note.chord = chordAt(note.onset);
    note.chordTone = Boolean(note.chord && note.chord.pcs.includes(note.pitch.pc));
    note.accented = metricWeight(note.onset, beats) >= 2;
  });
  notes.forEach((note, i) => {
    if (note.chordTone) { note.type = 'CT'; return; }
    const prev = notes[i - 1];
    const next = notes[i + 1];
    note.type = classify(note, prev, next, notes, i);
  });
  return notes.map(({ index, onset: start, pitch, chord, chordTone, type, accented, complete }) => ({
    index, onset: start, pitch: pitch.name, chord: chord?.label ?? null, chordTone, type, accented, complete: Boolean(complete),
  }));
}

function classify(note, prev, next, notes, i) {
  // 双辅助音：稳定音 – 上/下方级进 – 下/上方级进 – 同一稳定音（ref:omt-embellishing）
  const dn = isDoubleNeighbor(notes, i);
  if (dn) return 'DN';
  if (prev && next) {
    const inStep = stepBetween(prev.pitch, note.pitch);
    const outStep = stepBetween(note.pitch, next.pitch);
    const sameIn = prev.pitch.midi === note.pitch.midi;
    // 静止音进入：挂留（下行解决）或延留（上行解决）（ref:omt2e-embellishing）
    if (sameIn && outStep && note.chord !== prev.chord) return dir(note.pitch, next.pitch) < 0 ? 'SUS' : 'RET';
    if (inStep && outStep) {
      if (dir(prev.pitch, note.pitch) === dir(note.pitch, next.pitch)) return 'PT';
      note.complete = prev.pitch.midi === next.pitch.midi;
      return 'NT';
    }
    if (leapBetween(prev.pitch, note.pitch) && outStep) {
      // 倚音：跳进进入、反方向级进离开，多在较强拍（ref:omt2e-embellishing）
      if (note.accented && dir(prev.pitch, note.pitch) === -dir(note.pitch, next.pitch)) return 'APP';
      // 不完全辅助音：非重音，跳进进入并级进到重音上的稳定音（ref:omt-embellishing）
      if (!note.accented && next.chordTone && metricWeight(next.onset) > metricWeight(note.onset)) return 'INT';
    }
    if (inStep && leapBetween(note.pitch, next.pitch) && dir(prev.pitch, note.pitch) === -dir(note.pitch, next.pitch)) return 'ET';
  }
  // 先现音：与下一音同音，且下一音落在新和弦上成为和弦音
  if (next && next.pitch.midi === note.pitch.midi && next.chord !== note.chord && next.chordTone) return 'ANT';
  if (!prev && next && stepBetween(note.pitch, next.pitch) && note.accented) return 'APP';
  return 'unclassified';
}

function isDoubleNeighbor(notes, i) {
  for (const start of [i - 1, i - 2]) {
    const group = notes.slice(start, start + 4);
    if (start < 0 || group.length < 4) continue;
    const [a, b, c, d] = group;
    if (!a.chordTone || !d.chordTone || a.pitch.midi !== d.pitch.midi || b.chordTone || c.chordTone) continue;
    if (stepBetween(a.pitch, b.pitch) && stepBetween(a.pitch, c.pitch) && dir(a.pitch, b.pitch) === -dir(a.pitch, c.pitch)) return true;
  }
  return false;
}

/** 持续音：低音保持同一音高而上方和弦变化，且至少有一个和弦不含该音（ref:omt2e-embellishing） */
export function findPedalPoints(bass, chords) {
  const result = [];
  let run = [];
  const flush = () => {
    if (run.length >= 2 && run.some((item) => !item.chord.pcs.includes(item.pitch.pc))) result.push({ from: run[0].index, to: run[run.length - 1].index, pitch: run[0].pitch.name });
    run = [];
  };
  bass.forEach((item, index) => {
    const pitch = parsePitch(item.p);
    const chord = chords[index];
    if (!pitch || !chord) { flush(); return; }
    if (run.length && run[0].pitch.midi !== pitch.midi) flush();
    run.push({ index, pitch, chord });
  });
  flush();
  return result;
}

/** 示例（全部以 C 大调为例），供图鉴展示与试听；每个示例的分析结果都应得出对应类型 */
export const EXAMPLES = {
  PT: { chords: [{ start: 0, label: 'C', pcs: [0, 4, 7] }], melody: [{ p: 'E4', d: 1 }, { p: 'F4', d: 1 }, { p: 'G4', d: 2 }], target: 1 },
  NT: { chords: [{ start: 0, label: 'C', pcs: [0, 4, 7] }], melody: [{ p: 'E4', d: 1 }, { p: 'F4', d: 1 }, { p: 'E4', d: 2 }], target: 1 },
  DN: { chords: [{ start: 0, label: 'C', pcs: [0, 4, 7] }], melody: [{ p: 'E4', d: 1 }, { p: 'F4', d: 1 }, { p: 'D4', d: 1 }, { p: 'E4', d: 1 }], target: 1 },
  APP: { chords: [{ start: 0, label: 'C', pcs: [0, 4, 7] }, { start: 2, label: 'G', pcs: [7, 11, 2] }], melody: [{ p: 'C4', d: 2 }, { p: 'A4', d: 1 }, { p: 'G4', d: 1 }], target: 1 },
  INT: { chords: [{ start: 0, label: 'C', pcs: [0, 4, 7] }, { start: 2, label: 'G', pcs: [7, 11, 2] }], melody: [{ p: 'C4', d: 1 }, { p: 'F4', d: 1 }, { p: 'G4', d: 2 }], target: 1 },
  ET: { chords: [{ start: 0, label: 'C', pcs: [0, 4, 7] }, { start: 2, label: 'G', pcs: [7, 11, 2] }], melody: [{ p: 'E4', d: 1 }, { p: 'F4', d: 1 }, { p: 'D4', d: 2 }], target: 1 },
  SUS: { chords: [{ start: 0, label: 'C', pcs: [0, 4, 7] }, { start: 2, label: 'G', pcs: [7, 11, 2] }], melody: [{ p: 'C5', d: 2 }, { p: 'C5', d: 1 }, { p: 'B4', d: 1 }], target: 1, tie: true },
  RET: { chords: [{ start: 0, label: 'G', pcs: [7, 11, 2] }, { start: 2, label: 'C', pcs: [0, 4, 7] }], melody: [{ p: 'B4', d: 2 }, { p: 'B4', d: 1 }, { p: 'C5', d: 1 }], target: 1, tie: true },
  ANT: { chords: [{ start: 0, label: 'G', pcs: [7, 11, 2] }, { start: 2, label: 'C', pcs: [0, 4, 7] }], melody: [{ p: 'D4', d: 1 }, { p: 'C4', d: 1 }, { p: 'C4', d: 2 }], target: 1 },
  PED: { chords: [{ start: 0, label: 'C', pcs: [0, 4, 7] }, { start: 2, label: 'F/C', pcs: [5, 9, 0] }, { start: 4, label: 'G7/C', pcs: [7, 11, 2, 5] }, { start: 6, label: 'C', pcs: [0, 4, 7] }],
    melody: [{ p: 'G4', d: 2 }, { p: 'A4', d: 2 }, { p: 'B4', d: 2 }, { p: 'C5', d: 2 }], bass: ['C3', 'C3', 'C3', 'C3'] },
};

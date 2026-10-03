// 练耳：音程、三和弦性质、七和弦性质的听辨题
// 依据：
//   ref:omt-intervals OMT「Intervals and dyads」：度数 + 半音数决定具体音程（表中 i6 为 A4 或 d5）
//   ref:omt-triads    OMT「Triads and seventh chords」：四种三和弦（大 M3+P5、小 m3+P5、减 m3+d5、增 M3+A5）；
//                     五种七和弦（大七 M3 P5 M7、属七 M3 P5 m7、小七 m3 P5 m7、减七 m3 d5 d7、半减七 m3 d5 m7）；
//                     并建议通过弹奏来练习听辨和弦性质
import { spellAbove, parsePitch } from './pitch_spelling.js';

/** [度数差（0 = 同度）, 半音数]；三全音按耳朵无法区分 A4 / d5，合为一个答案 */
export const INTERVALS = {
  m2: [1, 1], M2: [1, 2], m3: [2, 3], M3: [2, 4], P4: [3, 5], TT: [3, 6], P5: [4, 7],
  m6: [5, 8], M6: [5, 9], m7: [6, 10], M7: [6, 11], P8: [7, 12],
};

export const CHORDS = {
  major: [[2, 4], [4, 7]],
  minor: [[2, 3], [4, 7]],
  diminished: [[2, 3], [4, 6]],
  augmented: [[2, 4], [4, 8]],
  maj7: [[2, 4], [4, 7], [6, 11]],
  dom7: [[2, 4], [4, 7], [6, 10]],
  min7: [[2, 3], [4, 7], [6, 10]],
  dim7: [[2, 3], [4, 6], [6, 9]],
  hdim7: [[2, 3], [4, 6], [6, 10]],
};
export const TRIADS = ['major', 'minor', 'diminished', 'augmented'];
export const SEVENTHS = ['maj7', 'dom7', 'min7', 'dim7', 'hdim7'];

const ROOTS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

/**
 * 出一道题。
 * @param {'interval'|'triad'|'seventh'} kind
 * @param {string[]} pool 可选答案
 * @param {() => number} random 0–1 随机数（测试时可注入）
 * @returns {{ kind, answer, notes: string[], midis: number[] }}
 */
export function makeQuestion(kind, pool, random = Math.random) {
  const answer = pool[Math.floor(random() * pool.length)];
  const root = ROOTS[Math.floor(random() * ROOTS.length)];
  // 根音放在 C3–B3（48–59）或 C4–B4 之间，题目不至于太低或太高
  const octave = random() < 0.5 ? 3 : 4;
  const rootPitch = parsePitch(`${root}${octave}`);
  const shape = kind === 'interval' ? [INTERVALS[answer]] : CHORDS[answer];
  const notes = [rootPitch.name];
  const midis = [rootPitch.midi];
  shape.forEach(([steps, semitones]) => {
    const name = spellAbove(root, steps, semitones);
    const midi = rootPitch.midi + semitones;
    // 八度按音级计算（C♭4 的 MIDI 与 B3 相同）
    notes.push(`${name}${Math.floor((rootPitch.diatonic + steps) / 7)}`);
    midis.push(midi);
  });
  return { kind, answer, notes, midis };
}

/** 判分并更新统计 */
export function grade(stats, question, response) {
  const correct = response === question.answer;
  const next = { total: stats.total + 1, correct: stats.correct + (correct ? 1 : 0), streak: correct ? stats.streak + 1 : 0 };
  next.best = Math.max(stats.best ?? 0, next.streak);
  return { correct, stats: next };
}

export const emptyStats = () => ({ total: 0, correct: 0, streak: 0, best: 0 });

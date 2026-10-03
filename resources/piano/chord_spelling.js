// 按音级拼写和弦音（而不是按半音查表）：E 大三和弦是 E G# B，不是 E Ab B
// 依据：
//   ref:omt-triads           三和弦与七和弦的音程构成（减三和弦为 m3 + d5，增三和弦为 M3 + A5，减七和弦含 d7）
//   ref:omt2e-chord-symbols  OMT 2e 6.2：9、11、13 是 2、4、6 度的复音程；七度默认为小七度，其余延伸音默认为大/纯；
//                            ♯11 = 增十一度、♭9 = 小九度——升降号表示音程变大/变小，不一定是谱面上的升降号
import { spellAbove, parsePitch } from './pitch_spelling.js';

/**
 * 半音数 → [度数, 相对该度数"默认音程"的变化]。同一个半音数可能对应不同度数，按和弦中其他音判断：
 * 3：有大三度（4）时为 ♯9，否则为小三度；6：有纯五度（7）时为 ♯11，否则为减五度；
 * 8：有纯五度时为 ♭13，否则为增五度；9：减三和弦且没有其他七度时为减七度，否则为 13（6）。
 */
export function chordDegree(offset, offsets) {
  const has = (n) => offsets.includes(n);
  switch (((offset % 12) + 12) % 12) {
    case 0: return [1, 0];
    case 1: return [9, -1];
    case 2: return [9, 0];
    case 3: return has(4) ? [9, 1] : [3, -1];
    case 4: return [3, 0];
    case 5: return [11, 0];
    case 6: return has(7) ? [11, 1] : [5, -1];
    case 7: return [5, 0];
    case 8: return has(7) ? [13, -1] : [5, 1];
    case 9: return has(3) && has(6) && !has(10) && !has(11) ? [7, -2] : [13, 0];
    case 10: return [7, -1];
    default: return [7, 0];
  }
}

/** 度数的默认半音数：大二/三/六/七度、纯四/五度（复音程同理） */
const DEFAULT_SEMITONES = { 1: 0, 3: 4, 5: 7, 7: 11, 9: 14, 11: 17, 13: 21 };

/** 度数标签：相对大/纯音程的变化，如 ♭3、♭5、♭7（小七度）、𝄫7（减七度）、♯9、♯11、♭13 */
export function degreeLabel(degree, alteration) {
  const sign = alteration > 0 ? '♯'.repeat(alteration) : alteration === -2 ? '𝄫' : '♭'.repeat(-alteration);
  return `${sign}${degree}`;
}

/**
 * @param {string} root 根音名，如 "E"、"Bb"
 * @param {number[]} pitchClasses 和弦音的音级（0–11，含根音）
 * @returns {Array<{ name, degree, alteration, label, semitones }>} 按度数排序
 */
export function spellChord(root, pitchClasses) {
  const rootPc = parsePitch(`${root}4`)?.pc;
  if (rootPc == null) return null;
  const offsets = [...new Set(pitchClasses.map((pc) => (((pc - rootPc) % 12) + 12) % 12))];
  return offsets.map((offset) => {
    const [degree, alteration] = chordDegree(offset, offsets);
    const semitones = DEFAULT_SEMITONES[degree] + alteration;
    return { name: spellAbove(root, (degree - 1) % 7, semitones % 12), degree, alteration, label: degreeLabel(degree, alteration), semitones };
  }).sort((a, b) => a.degree - b.degree);
}

/**
 * 把拼好的和弦排成密集排列的音高（根音在 rootOctave，延伸音放在八度以上），可选低音
 * @returns {string[]} 带八度的音名，由低到高
 */
export function voiceSpelledChord(root, spelled, { rootOctave = 4, bass = null } = {}) {
  const rootPitch = parsePitch(`${root}${rootOctave}`);
  const pitches = spelled.map((tone) => {
    const diatonic = rootPitch.diatonic + tone.degree - 1;
    return `${tone.name}${Math.floor(diatonic / 7)}`;
  });
  if (bass) {
    // 低音放在根音下方的八度里
    let octave = rootOctave;
    while (octave > 0 && parsePitch(`${bass}${octave}`).midi >= rootPitch.midi) octave -= 1;
    pitches.unshift(`${bass}${octave}`);
  }
  return pitches;
}

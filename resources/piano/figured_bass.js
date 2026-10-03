// 数字低音：解析数字、求出和弦音、交给四部和声求解器写作
// 依据：ref:omt2e-figured-bass Open Music Theory 2e「Inversion and Figured Bass」
//   数字表示低音之上（不是根音之上）的音程；原位三和弦不标数字，第一转位标 6，第二转位标 6/4；
//   七和弦：原位 7、第一转位 6/5、第二转位 4/3、第三转位 4/2；
//   变音记号写在被改变的数字前；数字上的斜线或数字前的加号表示升高半音；单独的变音记号作用于低音上方三度。
// 本工具的约定：数字之外的音按调号取自然音；♯ ♭ 在调号音的基础上升降半音，♮ 取消调号。
import { parsePitch, parseNote, formatNote, transposePitch } from './pitch_spelling.js';

const ABBREVIATIONS = {
  '': ['5', '3'], '3': ['5', '3'], '5': ['5', '3'], '53': ['5', '3'], '6': ['6', '3'], '63': ['6', '3'], '64': ['6', '4'],
  '7': ['7', '5', '3'], '73': ['7', '5', '3'], '753': ['7', '5', '3'], '65': ['6', '5', '3'], '653': ['6', '5', '3'],
  '43': ['6', '4', '3'], '643': ['6', '4', '3'], '42': ['6', '4', '2'], '2': ['6', '4', '2'], '642': ['6', '4', '2'],
};

/** 根音相对低音的音程度数与七音所在度数（ref:omt2e-figured-bass 各位置的音程构成） */
const SHAPE = {
  '53': { root: 1 }, '63': { root: 6 }, '64': { root: 4 },
  '753': { root: 1, seventh: 7 }, '653': { root: 6, seventh: 5 }, '643': { root: 4, seventh: 3 }, '642': { root: 2, seventh: 1 },
};

const KEY_SIGNATURES = {
  major: { C: 0, G: 1, D: 2, A: 3, E: 4, B: 5, 'F#': 6, 'C#': 7, F: -1, Bb: -2, Eb: -3, Ab: -4, Db: -5, Gb: -6, Cb: -7 },
  minor: { A: 0, E: 1, B: 2, 'F#': 3, 'C#': 4, 'G#': 5, 'D#': 6, 'A#': 7, D: -1, G: -2, C: -3, F: -4, Bb: -5, Eb: -6, Ab: -7 },
};
const SHARP_ORDER = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];

/** 调号中某个字母的变音（+1 升、-1 降、0 无） */
export function keySignatureAccidental(key, mode, letter) {
  const count = KEY_SIGNATURES[mode === 'minor' ? 'minor' : 'major'][key];
  if (count == null) throw new Error(`不支持的调: ${key}`);
  if (count > 0) return SHARP_ORDER.slice(0, count).includes(letter) ? 1 : 0;
  if (count < 0) return [...SHARP_ORDER].reverse().slice(0, -count).includes(letter) ? -1 : 0;
  return 0;
}

/**
 * 解析数字：如 "6"、"6/4"、"#"、"6/5"、"b7"、"6+"、"#6/4/2"
 * @returns {{ figures: Array<{ number: number, alter: 'sharp'|'flat'|'natural'|null }>, shape: string }}
 */
export function parseFigure(text) {
  const tokens = String(text || '').replace(/\s+/g, '').split('/').filter((t) => t !== '');
  const parsed = tokens.map((token) => {
    const match = token.match(/^([#♯b♭♮n+]?)(\d*)([#♯+\\]?)$/);
    if (!match) throw new Error(`无法识别的数字: ${token}`);
    const [, pre, digits, post] = match;
    const mark = pre || post;
    const alter = mark === '#' || mark === '♯' || mark === '+' || mark === '\\' ? 'sharp' : mark === 'b' || mark === '♭' ? 'flat' : mark === '♮' || mark === 'n' ? 'natural' : null;
    return { number: digits ? Number(digits) : null, alter };
  });
  // 单独的变音记号作用于三度（ref:omt2e-figured-bass）
  parsed.forEach((item) => { if (item.number === null) item.number = 3; });
  const digits = parsed.map((item) => item.number).join('');
  const expanded = ABBREVIATIONS[digits] ?? ABBREVIATIONS[[...new Set(parsed.map((i) => i.number))].sort((a, b) => b - a).join('')];
  if (!expanded) throw new Error(`不支持的数字组合: ${text}`);
  const figures = expanded.map((n) => ({ number: Number(n), alter: parsed.find((item) => item.number === Number(n))?.alter ?? null }));
  return { figures, shape: expanded.join('') };
}

/** 低音之上某个度数的音名（按调号，并应用变音） */
function noteAbove(bass, number, alter, key, mode) {
  const step = bass.step + (number - 1);
  const letter = formatNote(step, 0);
  let accidental = keySignatureAccidental(key, mode, letter);
  if (alter === 'sharp') accidental += 1;
  if (alter === 'flat') accidental -= 1;
  if (alter === 'natural') accidental = 0;
  return formatNote(step, accidental);
}

/**
 * 解析一行数字低音：小节用 | 或空格分隔，每个音写作 "C3"、"B2:6"、"G2:7"、"E3:#"
 * @returns {Array<{ bass: string, figure: string, notes: string[], root: string, seventh: string|null, shape: string }>}
 */
export function realizeFiguredBassLine(text, key, mode = 'major') {
  return String(text).split(/[\s|]+/).filter(Boolean).map((token) => {
    const [bassText, figureText = ''] = token.split(':');
    const bass = parsePitch(bassText);
    if (!bass) throw new Error(`无法识别的低音: ${bassText}`);
    const { figures, shape } = parseFigure(figureText);
    const upper = figures.map((f) => noteAbove(bass, f.number, f.alter, key, mode));
    const bassName = formatNote(bass.step, bass.accidental);
    const info = SHAPE[shape];
    const pick = (number) => (number === 1 ? bassName : upper[figures.findIndex((f) => f.number === number)]);
    return {
      bass: bass.name,
      figure: figureText,
      shape,
      notes: [bassName, ...upper],
      root: pick(info.root),
      seventh: info.seventh ? pick(info.seventh) : null,
    };
  });
}

/** 求解器条目：低音固定在所写音高；导音与和弦七音不重复（ref:omt2e-roman-numerals）；其余四部规则由求解器检查（ref:sposobin） */
export function figuredVoicingEntries(chords, key, mode = 'major') {
  const tonicPc = parseNote(key).pc;
  const leadingPc = (tonicPc + 11) % 12;
  return chords.map((chord, index) => {
    const pcs = [...new Set(chord.notes.map((n) => parseNote(n).pc))];
    const seventhPc = chord.seventh ? parseNote(chord.seventh).pc : null;
    const maxCounts = Object.fromEntries(pcs.map((pc) => [pc, pc === leadingPc || pc === seventhPc ? 1 : 2]));
    return {
      symbol: `${chord.shape}-${index}`,
      pitchClasses: pcs,
      bassPc: parsePitch(chord.bass).pc,
      bassMidi: parsePitch(chord.bass).midi,
      maxCounts,
      leadingPc: pcs.includes(leadingPc) ? leadingPc : null,
      seventhPc,
      tonicPc,
    };
  });
}

/** 按和弦音拼写声部（带八度），与数字给出的拼法一致 */
export function spellFiguredVoice(chord, midi) {
  const name = chord.notes.find((n) => parseNote(n).pc === ((midi % 12) + 12) % 12);
  if (!name) return null;
  const parsed = parseNote(name);
  const natural = [0, 2, 4, 5, 7, 9, 11][parsed.step];
  return `${name}${Math.round((midi - natural - parsed.accidental) / 12) - 1}`;
}

/**
 * 示例低音线（i–V6–i–ii°6–V–i 与 I–ii6–iii6–IV–V7–I）。
 * 低音只用级进或四、五度跳进：四部求解器不允许低音七度跳进（ref:sposobin），
 * 小调示例曾写成 D3 → E2（下行七度）导致无解，现为 D3 → E3。
 */
export const FIGURED_PRESETS = {
  major: { key: 'C', line: 'C3 D3:6 E3:6 F3 G3:7 C3' },
  minor: { key: 'A', line: 'A2 G#2:6 A2 D3:6 E3:# A2' },
};
export const FIGURED_KEYS = {
  major: ['C', 'G', 'D', 'A', 'E', 'F', 'Bb', 'Eb', 'Ab'],
  minor: ['A', 'E', 'B', 'D', 'G', 'C', 'F'],
};

/**
 * 把一行数字低音从 fromKey 移到 toKey：低音按音级移调（拼写正确），音区保持在 E2–D4 附近；
 * 单独的升号（升高三度）若在新调中得到的是还原音，改写为 ♮（如 C 小调属和弦的 B♮）。
 */
export function transposeFiguredLine(text, fromKey, toKey, mode = 'major') {
  const from = parseNote(fromKey);
  const to = parseNote(toKey);
  let steps = (to.step - from.step + 7) % 7;
  let semitones = (to.pc - from.pc + 12) % 12;
  const tokens = String(text).split(/[\s|]+/).filter(Boolean).map((token) => token.split(':'));
  const midis = tokens.map(([bass]) => parsePitch(bass).midi);
  // 向上移会太高时改为向下移
  if (Math.max(...midis) + semitones > 62) { steps -= 7; semitones -= 12; }
  return tokens.map(([bassText, figure]) => {
    const bass = transposePitch(bassText, steps, semitones);
    let shown = figure;
    if (figure && /^[#♯♮n]$/.test(figure)) {
      const third = noteAbove(bass, 3, 'sharp', toKey, mode);
      shown = parseNote(third).accidental === 0 ? '♮' : '#';
    }
    return shown === undefined ? bass.name : `${bass.name}:${shown}`;
  }).join(' ');
}

/**
 * 低音线中求解器不允许的跳进（与 classical_voicing.js transitionIssues 的"低音跳进过大"一致，ref:sposobin）：
 * 超过八度、七度（10、11 个半音）、上行三全音。返回 [{ index, from, to, semitones }]，index 为后一个音。
 */
export function bassLeapProblems(chords) {
  const problems = [];
  for (let i = 1; i < chords.length; i += 1) {
    const from = parsePitch(chords[i - 1].bass);
    const to = parsePitch(chords[i].bass);
    const d = to.midi - from.midi;
    if (Math.abs(d) > 12 || [10, 11].includes(Math.abs(d)) || d === 6) problems.push({ index: i, from: from.name, to: to.name, semitones: d });
  }
  return problems;
}

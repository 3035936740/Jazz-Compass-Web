// 音名拼写：按"字母（音级）+ 变音记号"计算，而不是按半音查表。
// 例如 C 上方增四度是 F#，减五度是 Gb；同一个半音数因音级不同拼法不同。

export const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const LETTER_PC = [0, 2, 4, 5, 7, 9, 11];

/** 解析 "C" "F#" "Bb" "Ebb" "C##" "F♯" "B♭"，返回 { letter, step, accidental, pc } */
export function parseNote(name) {
  const match = String(name).trim().match(/^([A-Ga-g])((?:#|♯|x|𝄪|b|♭|𝄫)*)$/);
  if (!match) return null;
  const letter = match[1].toUpperCase();
  const step = LETTERS.indexOf(letter);
  let accidental = 0;
  for (const ch of match[2]) {
    if (ch === '#' || ch === '♯') accidental += 1;
    else if (ch === 'x' || ch === '𝄪') accidental += 2;
    else if (ch === 'b' || ch === '♭') accidental -= 1;
    else if (ch === '𝄫') accidental -= 2;
  }
  return { letter, step, accidental, pc: ((LETTER_PC[step] + accidental) % 12 + 12) % 12 };
}

export function formatNote(step, accidental) {
  const letter = LETTERS[((step % 7) + 7) % 7];
  if (accidental > 0) return letter + '#'.repeat(accidental);
  if (accidental < 0) return letter + 'b'.repeat(-accidental);
  return letter;
}

/** 从 root 向上 steps 个音级、semitones 个半音的音名（例如 C, 3, 6 → F#） */
export function spellAbove(root, steps, semitones) {
  const base = typeof root === 'string' ? parseNote(root) : root;
  if (!base) throw new Error(`无法识别的音名: ${root}`);
  const step = base.step + steps;
  const naturalPc = LETTER_PC[((step % 7) + 7) % 7];
  const targetPc = (((base.pc + semitones) % 12) + 12) % 12;
  let accidental = targetPc - naturalPc;
  if (accidental > 6) accidental -= 12;
  if (accidental < -6) accidental += 12;
  return formatNote(step, accidental);
}

export function pitchClass(name) {
  return parseNote(name)?.pc ?? null;
}

/** 在同音异名中挑记号最少的写法，供只有音高、没有音级信息时使用 */
export function simplestName(pc, preferFlats = true) {
  const sharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const flat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  return (preferFlats ? flat : sharp)[((pc % 12) + 12) % 12];
}

/** 带八度的音高："C#4" → { step, accidental, pc, octave, midi, diatonic, name } */
export function parsePitch(text) {
  const match = String(text).trim().match(/^([A-Ga-g](?:#|♯|x|b|♭)*)(-?\d)$/);
  if (!match) return null;
  const base = parseNote(match[1]);
  if (!base) return null;
  const octave = Number(match[2]);
  const midi = 12 * (octave + 1) + LETTER_PC[base.step] + base.accidental;
  return { ...base, octave, midi, diatonic: octave * 7 + base.step, name: formatNote(base.step, base.accidental) + octave };
}

const PERFECT_REF = { 1: 0, 4: 5, 5: 7 };
const MAJOR_REF = { 2: 2, 3: 4, 6: 9, 7: 11 };

/**
 * 两个音高之间的音程（与先后顺序无关）。
 * generic 为度数（1 = 同度，8 = 八度），simple 为化简到八度内的度数，quality 为 P M m A d（可叠用 AA dd）。
 */
export function intervalBetween(first, second) {
  const a = typeof first === 'string' ? parsePitch(first) : first;
  const b = typeof second === 'string' ? parsePitch(second) : second;
  if (!a || !b) return null;
  const [low, high] = a.diatonic < b.diatonic || (a.diatonic === b.diatonic && a.midi <= b.midi) ? [a, b] : [b, a];
  const generic = high.diatonic - low.diatonic + 1;
  const semitones = high.midi - low.midi;
  const octaves = Math.floor((generic - 1) / 7);
  const simple = ((generic - 1) % 7) + 1;
  const diff = semitones - 12 * octaves - (PERFECT_REF[simple] ?? MAJOR_REF[simple]);
  let quality;
  if (simple in PERFECT_REF) quality = diff === 0 ? 'P' : diff > 0 ? 'A'.repeat(diff) : 'd'.repeat(-diff);
  else quality = diff === 0 ? 'M' : diff === -1 ? 'm' : diff > 0 ? 'A'.repeat(diff) : 'd'.repeat(-diff - 1);
  return { generic, simple, semitones, quality, name: `${quality}${generic}`, simpleName: `${quality}${simple}`, lowIsFirst: low === a };
}

/** 按音级 + 半音移调并保持拼写：D4 下移大二度（-1 级、-2 半音）为 C4，F#4 为 E4；变音超过两个时返回 null */
export function transposePitch(pitch, steps, semitones) {
  const source = typeof pitch === 'string' ? parsePitch(pitch) : pitch;
  if (!source) return null;
  const diatonic = source.diatonic + steps;
  const step = ((diatonic % 7) + 7) % 7;
  const octave = Math.floor(diatonic / 7);
  const naturalMidi = 12 * (octave + 1) + LETTER_PC[step];
  const accidental = source.midi + semitones - naturalMidi;
  if (Math.abs(accidental) > 2) return null;
  return parsePitch(formatNote(step, accidental) + octave);
}

/**
 * 七声音阶按音级拼写：第 n 级与主音相距 n 度（度数按字母计数，ref:omt-intervals；音级编号见 ref:omt2e-major-scales），
 * 因此七个音各用一个字母。intervals 为相对主音的半音数（升序、7 个）；需要三重以上变音或不是七声时返回 null。
 */
export function spellHeptatonic(root, intervals) {
  if (!Array.isArray(intervals) || intervals.length !== 7 || !parseNote(root)) return null;
  const names = intervals.map((semitones, degree) => spellAbove(root, degree, semitones));
  return names.every((name) => Math.abs(parseNote(name).accidental) <= 2) ? names : null;
}

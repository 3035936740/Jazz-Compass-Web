// 移调乐器与音域
// 依据：
//   ref:wiki-transposing-list 维基百科「List of transposing instruments」：每件乐器"书写 C4 实际发出的音"（下表 sounds 字段逐项取自该表）
//   ref:wiki-transposing      维基百科「Transposing instrument」：八度移调乐器（低音提琴、贝斯、吉他、低音大管低八度；短笛、木琴、钢片琴高八度；
//                             钟琴、古钹高两个八度）；长号、大号虽以 B♭ 等为基音但按实音记谱；圆号按 F 调记谱
//   ref:ibmt-transposition    Inquiry-Based Music Theory 12a（CC BY-SA）：不移调乐器清单（人声、钢琴、提琴、长笛、双簧管、大管、长号、
//                             上低音号、大号、竖琴）；各移调乐器的音程（单簧管 M2↓、次中音萨克斯 M9↓、上低音萨克斯 M13↓、
//                             中音萨克斯 M6↓、降 E 单簧管 m3↑、英国管与圆号 P5↓）；"从实音换到书写音时按相同音程反方向移调"
//   ref:wiki-pitch-ranges     维基百科音域图（见 instrument_ranges_data.js）：实际发音的大致音域
import { parsePitch, formatNote, LETTERS, transposePitch } from './pitch_spelling.js';
import { PITCH_RANGES } from './instrument_ranges_data.js';

/**
 * family：分组；sounds：书写 C4 时的实际发音；range：音域图中的条目名（没有可对应条目则为 null）；
 * note：附加说明的键（见界面文字）
 */
export const INSTRUMENTS = [
  { id: 'piccolo', family: 'woodwind', sounds: 'C5', range: 'piccolo' },
  { id: 'flute', family: 'woodwind', sounds: 'C4', range: 'flute' },
  { id: 'alto-flute', family: 'woodwind', sounds: 'G3', range: 'alto flute' },
  { id: 'bass-flute', family: 'woodwind', sounds: 'C3', range: 'bass flute' },
  { id: 'oboe', family: 'woodwind', sounds: 'C4', range: 'oboe' },
  { id: 'oboe-damore', family: 'woodwind', sounds: 'A3', range: "oboe d'amore" },
  { id: 'cor-anglais', family: 'woodwind', sounds: 'F3', range: 'cor anglais' },
  { id: 'clarinet-eb', family: 'woodwind', sounds: 'Eb4', range: null },
  { id: 'clarinet-bb', family: 'woodwind', sounds: 'Bb3', range: 'soprano clarinet' },
  { id: 'clarinet-a', family: 'woodwind', sounds: 'A3', range: null },
  { id: 'bass-clarinet', family: 'woodwind', sounds: 'Bb2', range: 'bass clarinet' },
  { id: 'bassoon', family: 'woodwind', sounds: 'C4', range: 'bassoon' },
  { id: 'contrabassoon', family: 'woodwind', sounds: 'C3', range: 'contrabassoon' },
  { id: 'sax-soprano', family: 'saxophone', sounds: 'Bb3', range: 'soprano saxophone' },
  { id: 'sax-alto', family: 'saxophone', sounds: 'Eb3', range: 'alto saxophone' },
  { id: 'sax-tenor', family: 'saxophone', sounds: 'Bb2', range: 'tenor saxophone' },
  { id: 'sax-baritone', family: 'saxophone', sounds: 'Eb2', range: 'baritone saxophone' },
  { id: 'horn', family: 'brass', sounds: 'F3', range: 'french horn' },
  { id: 'trumpet-bb', family: 'brass', sounds: 'Bb3', range: 'trumpet' },
  { id: 'trumpet-d', family: 'brass', sounds: 'D4', range: null },
  { id: 'trumpet-eb', family: 'brass', sounds: 'Eb4', range: null },
  { id: 'piccolo-trumpet', family: 'brass', sounds: 'Bb4', range: 'piccolo trumpet' },
  { id: 'cornet', family: 'brass', sounds: 'Bb3', range: 'cornet' },
  { id: 'flugelhorn', family: 'brass', sounds: 'Bb3', range: 'flugelhorn' },
  { id: 'trombone', family: 'brass', sounds: 'C4', range: 'tenor trombone', note: 'trombone' },
  { id: 'bass-trombone', family: 'brass', sounds: 'C4', range: 'bass trombone' },
  { id: 'euphonium', family: 'brass', sounds: 'C4', range: 'euphonium', note: 'euphonium' },
  { id: 'tuba', family: 'brass', sounds: 'C4', range: null },
  { id: 'violin', family: 'strings', sounds: 'C4', range: 'violin' },
  { id: 'viola', family: 'strings', sounds: 'C4', range: 'viola' },
  { id: 'cello', family: 'strings', sounds: 'C4', range: 'cello' },
  { id: 'double-bass', family: 'strings', sounds: 'C3', range: 'double bass' },
  { id: 'harp', family: 'strings', sounds: 'C4', range: 'harp' },
  { id: 'guitar', family: 'strings', sounds: 'C3', range: 'guitar' },
  { id: 'bass-guitar', family: 'strings', sounds: 'C3', range: 'bass guitar' },
  { id: 'piano', family: 'keyboard', sounds: 'C4', range: 'piano' },
  { id: 'celesta', family: 'keyboard', sounds: 'C5', range: 'celesta' },
  { id: 'xylophone', family: 'keyboard', sounds: 'C5', range: 'xylophone' },
  { id: 'glockenspiel', family: 'keyboard', sounds: 'C6', range: 'glockenspiel' },
  { id: 'voice-soprano', family: 'voice', sounds: 'C4', range: 'soprano' },
  { id: 'voice-mezzo', family: 'voice', sounds: 'C4', range: 'mezzo-soprano' },
  { id: 'voice-alto', family: 'voice', sounds: 'C4', range: 'alto' },
  { id: 'voice-tenor', family: 'voice', sounds: 'C4', range: 'tenor' },
  { id: 'voice-baritone', family: 'voice', sounds: 'C4', range: 'baritone' },
  { id: 'voice-bass', family: 'voice', sounds: 'C4', range: 'bass' },
];

export const instrumentById = (id) => INSTRUMENTS.find((item) => item.id === id);

const MIDDLE_C = parsePitch('C4');

/** 书写音 → 实音的移位：音级差与半音差（负数表示实音低于书写音） */
export function transposition(id) {
  const sounding = parsePitch(instrumentById(id).sounds);
  return { steps: sounding.diatonic - MIDDLE_C.diatonic, semitones: sounding.midi - MIDDLE_C.midi };
}

/** 按音级 + 半音移调，保持正确拼写（见 pitch_spelling.js 的 transposePitch） */
export const shiftPitch = transposePitch;

export const writtenToConcert = (id, pitch) => { const t = transposition(id); return shiftPitch(pitch, t.steps, t.semitones); };
/** 实音 → 书写音：同一音程反方向 ref:ibmt-transposition */
export const concertToWritten = (id, pitch) => { const t = transposition(id); return shiftPitch(pitch, -t.steps, -t.semitones); };

/** 移调音程的名称与方向，如 { name: 'M2', direction: 'down' } */
export function transpositionInterval(id) {
  const { steps, semitones } = transposition(id);
  if (steps === 0 && semitones === 0) return { name: 'P1', direction: 'none', steps, semitones };
  const generic = Math.abs(steps) + 1;
  const size = Math.abs(semitones);
  const octaves = Math.floor((generic - 1) / 7);
  const simple = ((generic - 1) % 7) + 1;
  const perfect = { 1: 0, 4: 5, 5: 7 }[simple];
  const major = { 2: 2, 3: 4, 6: 9, 7: 11 }[simple];
  const diff = size - 12 * octaves - (perfect ?? major);
  const quality = perfect !== undefined ? (diff === 0 ? 'P' : diff > 0 ? 'A' : 'd') : (diff === 0 ? 'M' : diff === -1 ? 'm' : diff > 0 ? 'A' : 'd');
  return { name: `${quality}${generic}`, direction: semitones < 0 ? 'down' : 'up', steps, semitones };
}

/** 调的五度位置：C = 0，G = 1，F = −1……；用于计算调号 */
const LETTER_FIFTHS = { F: -1, C: 0, G: 1, D: 2, A: 3, E: 4, B: 5 };
export function keyFifths(tonicName) {
  const pitch = parsePitch(`${tonicName}4`);
  return LETTER_FIFTHS[LETTERS[pitch.step]] + 7 * pitch.accidental;
}

/** 实音调 → 书写调（大调主音），以及调号的升降号数（正数为升号） */
export function writtenKey(id, concertTonic) {
  const written = concertToWritten(id, `${concertTonic}4`);
  const name = written.name.replace(/-?\d+$/, '');
  return { tonic: name, fifths: keyFifths(name) };
}

/** 同音异名：把超过 7 个升降号的调换成等音调（主音沿五度圈移 12 位） */
export function enharmonicKey(tonicName) {
  const fifths = keyFifths(tonicName);
  if (Math.abs(fifths) <= 7) return null;
  const pitch = parsePitch(`${tonicName}4`);
  const target = fifths > 0 ? fifths - 12 : fifths + 12;
  for (let step = 0; step < 7; step += 1) {
    for (let accidental = -2; accidental <= 2; accidental += 1) {
      const name = formatNote(step, accidental);
      const candidate = parsePitch(`${name}4`);
      if (candidate.pc === pitch.pc && keyFifths(name) === target) return name;
    }
  }
  return null;
}

/** 实际发音的大致音域（MIDI）；ref:wiki-pitch-ranges */
export function soundingRange(id) {
  const key = instrumentById(id).range;
  return key ? PITCH_RANGES[key] ?? null : null;
}

/** 书写音域：实音音域按移调反方向换算 */
export function writtenRange(id) {
  const range = soundingRange(id);
  if (!range) return null;
  const { semitones } = transposition(id);
  return [range[0] - semitones, range[1] - semitones];
}

/** 一组实音（MIDI）落在哪些乐器的音域内 */
export function instrumentsFor(midis) {
  const low = Math.min(...midis);
  const high = Math.max(...midis);
  return INSTRUMENTS.filter((item) => {
    const range = soundingRange(item.id);
    return range && range[0] <= low && high <= range[1];
  }).map((item) => item.id);
}

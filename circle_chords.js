// 调内和弦按隔一个音叠置，转位把最低音移高八度（反向把最高音移低八度）。
// 三和弦、七和弦性质：ref:omt2e-triads ref:omt2e-sevenths；转位数字：ref:omt2e-figured-bass。
import { parseNote, parsePitch } from './pitch_spelling.js';

const TRIADS = { '4,7': '', '3,7': 'm', '3,6': '°', '4,8': '+' };
const SEVENTHS = {
  '4,7,11': 'maj7', '4,7,10': '7', '3,7,10': 'm7', '3,7,11': 'm(maj7)',
  '3,6,10': 'm7b5', '3,6,9': 'dim7', '4,8,11': '+maj7', '4,8,10': '+7',
};
const mod = (n, size) => ((n % size) + size) % size;

/** degree 0–6 为七个音级，7 为高八度的主和弦；steps 可以是负数。 */
export function circleDegreeChord(notes, degree, numeral, { seventh = false, steps = 0 } = {}) {
  const count = seventh ? 4 : 3;
  const root = notes[degree % 7];
  const rootPc = parseNote(root).pc;
  const rootMidi = parsePitch(`${notes[0]}4`).midi + mod(rootPc - parseNote(notes[0]).pc, 12) + Math.floor(degree / 7) * 12;
  const tones = Array.from({ length: count }, (_, i) => {
    const name = notes[(degree + i * 2) % 7];
    return { name, midi: rootMidi + mod(parseNote(name).pc - rootPc, 12) };
  });
  const offsets = tones.slice(1).map(tone => tone.midi - rootMidi);
  const suffix = (seventh ? SEVENTHS : TRIADS)[offsets.join(',')];
  if (suffix === undefined) throw new Error(`Unsupported diatonic chord: ${root} ${offsets}`);
  const inversion = mod(steps, count);
  const octaves = Math.floor(steps / count);
  const voiced = [...tones.slice(inversion), ...tones.slice(0, inversion).map(tone => ({ ...tone, midi: tone.midi + 12 }))]
    .map(tone => {
      const midi = tone.midi + octaves * 12;
      const octave = 4 + (midi - parsePitch(`${tone.name}4`).midi) / 12;
      return { ...tone, midi, pitch: `${tone.name}${octave}` };
    });
  const figure = (seventh ? ['7', '6/5', '4/3', '4/2'] : ['', '6', '6/4'])[inversion];
  const degreeLabel = seventh && suffix === 'm7b5' ? numeral.replace('°', 'ø') : numeral;
  return {
    numeral: degreeLabel, figure, roman: degreeLabel + figure, inversion, octaves,
    name: root + suffix + (inversion ? '/' + voiced[0].name : ''),
    tones: voiced, frequencies: voiced.map(tone => 440 * 2 ** ((tone.midi - 69) / 12)),
  };
}

/** 加/去七音时保持当前转位与八度；去掉七音低音时由根音接替。 */
export function resizeCircleVoicing(steps, fromSeventh, toSeventh) {
  const before = fromSeventh ? 4 : 3;
  const after = toSeventh ? 4 : 3;
  return Math.floor(steps / before) * after + mod(steps, before);
}

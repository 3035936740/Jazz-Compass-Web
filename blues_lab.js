import { lccPitchClass } from './lcc_concept.js';

export const BLUES_NOTES = Object.freeze(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']);
const mod12 = value => ((value % 12) + 12) % 12;
const noteAt = (pitch, names = BLUES_NOTES) => names[mod12(pitch)];
const chord = (key, degree, quality, role, names) => ({
  symbol: `${role === '♯iv°7' ? spellBlues(key, 6, 3, names) : noteAt(lccPitchClass(key) + degree, names)}${quality}`, role,
});
const bar = (...segments) => segments;

/** Twelve-bar practice templates. Jazz/minor are explicit teaching variants, not universal changes. */
export function bluesForm(key, variant = 'long', turnaround = 'default', names = BLUES_NOTES) {
  const I = () => chord(key, 0, '7', 'I7', names);
  const IV = () => chord(key, 5, '7', 'IV7', names);
  const V = () => chord(key, 7, '7', 'V7', names);
  const short = variant === 'quick' || variant === 'jazz';
  let bars;
  if (variant === 'long' || variant === 'quick') {
    bars = [bar(I()), bar(short ? IV() : I()), bar(I()), bar(I()), bar(IV()), bar(IV()),
      bar(I()), bar(I()), bar(V()), bar(IV()), bar(I()), bar(V())];
  } else if (variant === 'jazz') {
    bars = [
      bar(I()), bar(IV()), bar(I()), bar(chord(key, 7, 'm7', 'ii / IV', names), I()),
      bar(IV()), bar(chord(key, 6, 'dim7', '♯iv°7', names)),
      bar(I(), chord(key, 9, '7', 'VI7', names)),
      bar(chord(key, 4, 'm7', 'iii', names), chord(key, 9, '7', 'VI7', names)),
      bar(chord(key, 2, 'm7', 'ii', names)), bar(V()),
      bar(I(), chord(key, 9, '7', 'VI7', names)),
      bar(chord(key, 2, 'm7', 'ii', names), V()),
    ];
  } else if (variant === 'minor') {
    const i = () => chord(key, 0, 'm7', 'i', names);
    const iv = () => chord(key, 5, 'm7', 'iv', names);
    const minorV = () => chord(key, 7, '7b9', 'V7♭9', names);
    bars = [bar(i()), bar(i()), bar(i()), bar(i()), bar(iv()), bar(iv()),
      bar(i()), bar(i()), bar(minorV()), bar(iv()), bar(i()), bar(minorV())];
  } else throw new Error(`Unknown blues form: ${variant}`);
  if (turnaround === 'tonic') bars[11] = bar(variant === 'minor' ? chord(key, 0, 'm7', 'i', names) : I());
  if (turnaround === 'dominant') bars[11] = bar(variant === 'minor' ? chord(key, 7, '7b9', 'V7♭9', names) : V());
  if (turnaround === 'iiV') bars[11] = bar(
    chord(key, 2, variant === 'minor' ? 'm7b5' : 'm7', 'ii', names),
    chord(key, 7, variant === 'minor' ? '7b9' : '7', 'V', names));
  return bars.map((segments, index) => ({ number: index + 1, phrase: Math.floor(index / 4) + 1,
    segments: segments.map(segment => ({ ...segment, beats: 4 / segments.length })) }));
}

const NATURAL_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const NATURAL_PITCHES = [0, 2, 4, 5, 7, 9, 11];
const scale = (id, name, items, hint) => Object.freeze({ id, name, items: Object.freeze(items.map(([interval, degree, letter, blue = false]) =>
  Object.freeze({ interval, degree, letter, blue }))), hint });

export const BLUES_SCALES = Object.freeze([
  scale('minorPentatonic', 'Minor Pentatonic', [[0, '1', 0], [3, '♭3', 2, true], [5, '4', 3], [7, '5', 4], [10, '♭7', 6, true]], '小调五声音阶可与大调属和弦叠置，形成蓝调张力。'),
  scale('minorBlues', 'Minor Blues', [[0, '1', 0], [3, '♭3', 2, true], [5, '4', 3], [6, '♯4 / ♭5', 3, true], [7, '5', 4], [10, '♭7', 6, true]], '在小调五声音阶加入蓝调的♯4／♭5经过音。'),
  scale('majorPentatonic', 'Major Pentatonic', [[0, '1', 0], [2, '2', 1], [4, '3', 2], [7, '5', 4], [9, '6', 5]], '大调五声音阶适合比较明亮的旋律骨架。'),
  scale('majorBlues', 'Major Blues', [[0, '1', 0], [2, '2', 1], [3, '♭3 → 3', 2, true], [4, '3', 2], [7, '5', 4], [9, '6', 5]], '在大调五声音阶中让♭3向3滑动或作装饰。'),
  scale('mixedBlues', 'More Complete Blues', [[0, '1', 0], [2, '2', 1], [3, '♭3', 2, true], [4, '3', 2], [5, '4', 3], [6, '♯4 / ♭5', 3, true], [7, '5', 4], [9, '6', 5], [10, '♭7', 6, true], [11, '7', 6]], '大调音与♭3、♯4／♭5、♭7并列，用比例与落点控制蓝调感。'),
  scale('mixolydianBlues', 'Mixolydian Blues', [[0, '1', 0], [2, '2', 1], [3, '♭3', 2, true], [4, '3', 2], [5, '4', 3], [7, '5', 4], [9, '6', 5], [10, '♭7', 6, true]], '属七／Mixolydian音集合中插入♭3，注意与和弦3度的表情关系。'),
]);

function spellBlues(root, interval, letter, names) {
  const start = NATURAL_LETTERS.indexOf(String(root).trim()[0]?.toUpperCase());
  if (start < 0) return noteAt(lccPitchClass(root) + interval, names);
  const targetLetter = (start + letter) % 7;
  const pitch = mod12(lccPitchClass(root) + interval);
  const difference = mod12(pitch - NATURAL_PITCHES[targetLetter]);
  const signed = difference > 6 ? difference - 12 : difference;
  if (Math.abs(signed) > 2) return noteAt(pitch, names);
  return NATURAL_LETTERS[targetLetter] + (signed < 0 ? 'b'.repeat(-signed) : '#'.repeat(signed));
}

export function bluesScaleNotes(root, scaleId, names = BLUES_NOTES) {
  const definition = BLUES_SCALES.find(item => item.id === scaleId);
  if (!definition) throw new Error(`Unknown blues scale: ${scaleId}`);
  return definition.items.map(item => ({ ...item, note: spellBlues(root, item.interval, item.letter, names) }));
}

export function bluesScaleMidi(root, scaleId, octave = 4) {
  const definition = BLUES_SCALES.find(item => item.id === scaleId);
  if (!definition) throw new Error(`Unknown blues scale: ${scaleId}`);
  const start = (octave + 1) * 12 + lccPitchClass(root);
  return [...definition.items.map(item => start + item.interval), start + 12];
}

/** Sub-semitone pitch approximation: 0 to -100 cents below a tempered major tone. */
export function bluesBentFrequency(root, majorDegree, downwardCents, octave = 4) {
  if (![4, 7, 11].includes(majorDegree)) throw new Error('Blue bend needs major 3, 5 or 7');
  const cents = Math.max(-100, Math.min(0, Number(downwardCents) || 0));
  const midi = (octave + 1) * 12 + lccPitchClass(root) + majorDegree;
  return 440 * 2 ** ((midi - 69) / 12 + cents / 1200);
}

export function bluesPhrase(root, type = 'callResponse', octave = 4) {
  const start = (octave + 1) * 12 + lccPitchClass(root);
  const intervals = {
    callResponse: [0, 3, 5, 6, 7, null, null, null, 10, 7, 6, 5, 3, 0],
    blueThird: [3, 4, 7, 4, 3, 0],
    blueFifth: [5, 6, 7, 10, 7, 0],
    blueSeventh: [10, 11, 12, 10, 7, 0],
  }[type];
  if (!intervals) throw new Error(`Unknown blues phrase: ${type}`);
  return intervals.map(interval => interval === null ? null : start + interval);
}

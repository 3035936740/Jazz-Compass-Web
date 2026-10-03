import { lccPitchClass } from './lcc_concept.js';
import { JAZZ_PARENT_FAMILIES, JAZZ_SPECIAL_SCALES } from './jazz_toolbox_data.js';

export const JAZZ_NOTES = Object.freeze(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']);
const mod12 = value => ((value % 12) + 12) % 12;
const noteAt = (pitch, names = JAZZ_NOTES) => names[mod12(pitch)];

function modeIntervals(parent, degree) {
  const offset = parent[degree];
  return [...parent.slice(degree), ...parent.slice(0, degree)].map(pitch => mod12(pitch - offset)).sort((a, b) => a - b);
}

export const JAZZ_MODE_CATALOG = Object.freeze([
  ...JAZZ_PARENT_FAMILIES.flatMap(family => family.modes.map((name, index) => Object.freeze({
    id: `${family.id}-${index + 1}`, name, family: family.label, familyId: family.id,
    degree: index + 1, intervals: Object.freeze(modeIntervals(family.intervals, index)),
    role: `${family.label}父本 · 第${index + 1}调式`,
  }))),
  ...JAZZ_SPECIAL_SCALES.map(scale => Object.freeze({ ...scale, intervals: Object.freeze([...scale.intervals]) })),
]);

export function jazzScaleNotes(root, mode, names = JAZZ_NOTES) {
  return jazzInspectMode(root, mode, [], names).cells.map(cell => cell.note);
}

export function jazzScaleMidi(root, mode, octave = 4) {
  const tonicMidi = (octave + 1) * 12 + lccPitchClass(root);
  return mode.intervals.map(interval => tonicMidi + interval);
}

function seventhQuality(intervals) {
  const [, third, fifth, seventh] = intervals;
  if (third === 4 && fifth === 7 && seventh === 11) return 'maj7';
  if (third === 4 && fifth === 7 && seventh === 10) return '7';
  if (third === 3 && fifth === 7 && seventh === 10) return 'm7';
  if (third === 3 && fifth === 6 && seventh === 10) return 'm7b5';
  if (third === 3 && fifth === 6 && seventh === 9) return 'dim7';
  if (third === 4 && fifth === 8 && seventh === 11) return 'augMaj7';
  return `(${intervals.join('·')})`;
}

/** Same-tonic/key-center exchange: donor harmony and altered scale degrees. */
export function jazzModalInterchange(key, donorModeId, names = JAZZ_NOTES) {
  const donor = JAZZ_MODE_CATALOG.find(mode => mode.id === donorModeId);
  if (!donor || donor.intervals.length !== 7) throw new Error('Modal interchange needs a seven-tone donor mode');
  const tonic = lccPitchClass(key);
  const major = JAZZ_MODE_CATALOG.find(mode => mode.id === 'major-1');
  const donorNotes = jazzScaleNotes(key, donor, names);
  const changedDegrees = donor.intervals.map((interval, index) => ({
    degree: index + 1, pitch: donorNotes[index], changed: interval !== major.intervals[index],
  }));
  const chords = donor.intervals.map((interval, degree) => {
    const toneIntervals = [0, 2, 4, 6].map(skip => {
      const target = donor.intervals[(degree + skip) % 7];
      return mod12(target - interval);
    }).sort((a, b) => a - b);
    const pitches = [0, 2, 4, 6].map(skip => donorNotes[(degree + skip) % 7]);
    return { degree: degree + 1, pitches, symbol: `${pitches[0]}${seventhQuality(toneIntervals)}`,
      borrowed: [0, 2, 4, 6].some(skip => changedDegrees[(degree + skip) % 7].changed) };
  });
  return { donor, key: noteAt(tonic, names), changedDegrees, chords };
}

export function jazzCompatibleModes(chordNotes, { familyId = 'all' } = {}) {
  if (!Array.isArray(chordNotes) || !chordNotes.length) return [];
  const root = lccPitchClass(chordNotes[0]);
  const relative = chordNotes.map(note => mod12(lccPitchClass(note) - root));
  return JAZZ_MODE_CATALOG.filter(mode =>
    (familyId === 'all' || mode.familyId === familyId || (familyId === 'special' && !mode.familyId)) &&
    relative.every(pitch => mode.intervals.includes(pitch)));
}

const NATURAL_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const NATURAL_PITCHES = [0, 2, 4, 5, 7, 9, 11];
const MAJOR_DEGREES = [0, 2, 4, 5, 7, 9, 11];
const DEGREE_NAMES = ['1', '9', '3', '11', '5', '13', '7'];
const SPECIAL_DEGREES = Object.freeze({
  dominantDiminished: { labels: ['1', '♭9', '♯9', '3', '♯11', '5', '13', '♭7'], letters: [0, 1, 1, 2, 3, 4, 5, 6] },
  diminished: { labels: ['1', '9', '♭3', '11', '♭5', '♭13', '13', '7'], letters: [0, 1, 2, 3, 4, 5, 5, 6] },
  wholeTone: { labels: ['1', '9', '3', '♯11', '♯5', '♭7'], letters: [0, 1, 2, 3, 4, 6] },
  altered: { labels: ['1', '♭9', '♯9', '3', '♭5', '♭13', '♭7'], letters: [0, 1, 1, 2, 4, 5, 6] },
});
function degreeInfo(mode, index) {
  const special = SPECIAL_DEGREES[mode.id];
  if (special) return { label: special.labels[index], letter: special.letters[index] };
  const alteration = mode.intervals[index] - MAJOR_DEGREES[index];
  const prefix = alteration < 0 ? '♭'.repeat(-alteration) : '♯'.repeat(alteration);
  return { label: `${prefix}${DEGREE_NAMES[index]}`, letter: index };
}
function spellDegree(root, pitch, letterIndex, names) {
  const start = NATURAL_LETTERS.indexOf(String(root).trim()[0]?.toUpperCase());
  if (start < 0) return noteAt(pitch, names);
  const target = (start + letterIndex) % 7;
  const alteration = mod12(pitch - NATURAL_PITCHES[target]);
  const signed = alteration > 6 ? alteration - 12 : alteration;
  if (Math.abs(signed) > 2) return noteAt(pitch, names);
  return NATURAL_LETTERS[target] + (signed < 0 ? 'b'.repeat(-signed) : '#'.repeat(signed));
}
const HARD_AVOID = Object.freeze({
  'major-1': [5], 'major-3': [1, 8], 'major-5': [5], 'major-6': [8], 'major-7': [1],
  'melodicMinor-2': [1], 'melodicMinor-7': [4], 'harmonicMinor-1': [8],
});

export function jazzInspectMode(root, mode, chordNotes = [], names = JAZZ_NOTES) {
  const tonic = lccPitchClass(root);
  const chord = new Set(chordNotes.map(lccPitchClass));
  const dominant = chord.has(mod12(tonic + 4)) && chord.has(mod12(tonic + 10));
  const cells = mode.intervals.map((interval, index) => {
    const pitch = mod12(tonic + interval);
    const degree = degreeInfo(mode, index);
    const isChord = chord.has(pitch);
    const isAvoid = !isChord && (HARD_AVOID[mode.id] || []).includes(interval);
    const isCollision = !isChord && !isAvoid && !dominant && [...chord].some(tone => mod12(pitch - tone) === 1);
    return {
      interval, note: spellDegree(root, pitch, degree.letter, names), label: degree.label,
      role: isChord ? 'chord' : isAvoid ? 'avoid' : isCollision ? 'caution' : 'tension',
    };
  });
  return {
    mode, root, cells,
    chordTones: cells.filter(cell => cell.role === 'chord'),
    tensions: cells.filter(cell => cell.role === 'tension'),
    cautions: cells.filter(cell => cell.role === 'caution' || cell.role === 'avoid'),
    compatible: chordNotes.every(note => mode.intervals.includes(mod12(lccPitchClass(note) - tonic))),
    // This labels practical collision hints, not a universal Berklee avoid-note chart.
  };
}

const chord = (pitch, suffix, role, names) => ({ symbol: `${noteAt(pitch, names)}${suffix}`, role, root: mod12(pitch) });

export function jazzProgression(key, kind, options = {}, names = JAZZ_NOTES) {
  const tonic = lccPitchClass(key);
  const iiVI = center => [chord(center + 2, 'm7', 'ii', names), chord(center + 7, '7', 'V', names)];
  if (kind === 'iiVI') return [...iiVI(tonic), chord(tonic, 'maj7', 'I', names)];
  if (kind === 'minorIiVI') return [chord(tonic + 2, 'm7b5', 'iiø', names), chord(tonic + 7, '7b9', 'V', names), chord(tonic, 'm7', 'i', names)];
  if (kind === 'tritone') return [
    chord(tonic + 2 + (options.flipIi ? 6 : 0), 'm7', options.flipIi ? 'sub ii' : 'ii', names),
    chord(tonic + 7 + (options.flipV ? 6 : 0), '7', options.flipV ? 'sub V' : 'V', names),
    chord(tonic + (options.flipI ? 6 : 0), 'maj7', options.flipI ? 'sub I / modulation' : 'I', names),
  ];
  if (kind === 'secondarySub') {
    const target = [2, 5, 7, 9].includes(Number(options.target)) ? Number(options.target) : 2;
    const targetSuffix = target === 2 || target === 9 ? 'm7' : target === 7 ? '7' : 'maj7';
    const dominantRoot = tonic + target + 7;
    return [
      chord(dominantRoot + (options.sub ? 6 : 0), '7', options.sub ? 'SubV / local target' : 'V / local target', names),
      chord(tonic + target, targetSuffix, 'local target', names),
      chord(tonic + 7, '7', 'V', names), chord(tonic, 'maj7', 'I', names),
    ];
  }
  if (kind === 'extendedDominant') {
    const count = Math.max(2, Math.min(8, Number(options.count) || 4));
    const dominants = Array.from({ length: count }, (_, index) => chord(tonic + 7 * (index + 1), '7', 'extended V', names));
    return [...dominants.reverse(), chord(tonic, 'maj7', 'I', names)];
  }
  if (kind === 'iiVChain') {
    const count = Math.max(2, Math.min(6, Number(options.count) || 3));
    const step = Number.isFinite(Number(options.step)) ? Number(options.step) : 2;
    return Array.from({ length: count }, (_, index) => iiVI(tonic + index * step)).flat();
  }
  if (kind === 'sideStep') {
    const direction = Number(options.direction) < 0 ? -1 : 1;
    return [...iiVI(tonic + direction).map(item => ({ ...item, role: `outside ${item.role}` })), ...iiVI(tonic), chord(tonic, 'maj7', 'inside I', names)];
  }
  if (kind === 'multiTonic') {
    const axes = [3, 4, 6].includes(Number(options.axes)) ? Number(options.axes) : 3;
    const step = 12 / axes;
    return Array.from({ length: axes }, (_, index) => [
      chord(tonic + index * step + 7, '7', `V / axis ${index + 1}`, names),
      chord(tonic + index * step, 'maj7', `I / axis ${index + 1}`, names),
    ]).flat();
  }
  throw new Error(`Unknown jazz progression: ${kind}`);
}

export function jazzVoicing(chordNotes, type = 'shell') {
  if (!chordNotes?.length) return [];
  const tonic = lccPitchClass(chordNotes[0]);
  const rootMidi = 48 + tonic;
  const relative = [...new Set(chordNotes.map(note => mod12(lccPitchClass(note) - tonic)))].sort((a, b) => a - b);
  const third = relative.find(interval => interval === 3 || interval === 4);
  const fifth = relative.find(interval => interval === 6 || interval === 7 || interval === 8);
  const seventh = relative.find(interval => interval === 9 || interval === 10 || interval === 11);
  if (type === 'shell') return [0, third, seventh].filter(Number.isFinite).map(interval => rootMidi + interval);
  if (type === 'guide') return [third, seventh].filter(Number.isFinite).map(interval => rootMidi + interval);
  const core = [0, third, fifth, seventh].filter(Number.isFinite);
  const closed = (core.length === 4 ? core : relative.slice(0, 4)).map(interval => rootMidi + interval);
  if (type === 'close' || closed.length < 4) return closed;
  if (type === 'drop2') return [closed[0], closed[1], closed[2] - 12, closed[3]].sort((a, b) => a - b);
  if (type === 'drop3') return [closed[0], closed[1] - 12, closed[2], closed[3]].sort((a, b) => a - b);
  if (type === 'drop2and4') return [closed[0] - 12, closed[1], closed[2] - 12, closed[3]].sort((a, b) => a - b);
  if (type === 'soWhat') return [rootMidi, ...[2, 7, 12, 17, 21].map(interval => rootMidi + interval)];
  throw new Error(`Unknown jazz voicing: ${type}`);
}

export function jazzMidiName(midi, names = JAZZ_NOTES) {
  return `${noteAt(midi % 12, names)}${Math.floor(midi / 12) - 1}`;
}

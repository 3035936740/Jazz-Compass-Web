/** A practical LCC explorer: parent-scale colors and tonal order, not Russell's full chordmode chart. */
export const LCC_NOTES = Object.freeze(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']);
export const LCC_TONAL_ORDER = Object.freeze([0, 7, 2, 9, 4, 11, 6, 8, 3, 10, 5, 1]);

const ENHARMONIC = Object.freeze({ Cb: 'B', 'C#': 'Db', 'D#': 'Eb', 'E#': 'F', Fb: 'E', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb', 'B#': 'C' });
const mod12 = value => ((value % 12) + 12) % 12;

export const LCC_PRINCIPAL_SCALES = Object.freeze([
  { id: 'lydian', name: 'Lydian (Fundamental)', intervals: [0, 2, 4, 6, 7, 9, 11], common: 'Lydian' },
  { id: 'lydianAugmented', name: 'Lydian Augmented', intervals: [0, 2, 4, 6, 8, 9, 11], common: 'Lydian augmented' },
  { id: 'lydianDiminished', name: 'Lydian Diminished', intervals: [0, 2, 3, 6, 7, 9, 11], common: 'Lydian diminished' },
  { id: 'lydianFlat7', name: 'Lydian b7 (Dominant)', intervals: [0, 2, 4, 6, 7, 9, 10], common: 'Lydian dominant' },
  { id: 'auxAugmented', name: 'Aux. Augmented (Whole Tone)', intervals: [0, 2, 4, 6, 8, 10], common: 'Whole tone' },
  { id: 'auxDiminished', name: 'Aux. Diminished', intervals: [0, 2, 3, 5, 6, 8, 9, 11], common: 'Whole–half diminished' },
  { id: 'auxDiminishedBlues', name: 'Aux. Dim. Blues', intervals: [0, 1, 3, 4, 6, 7, 9, 10], common: 'Half–whole diminished' },
]);

export const LCC_HORIZONTAL_SCALES = Object.freeze([
  { id: 'major', name: 'Major', intervals: [0, 2, 4, 5, 7, 9, 11], common: 'Major / Ionian' },
  { id: 'minorFlat7', name: 'Minor Flat 7th', intervals: [0, 2, 4, 5, 7, 9, 10], common: 'Mixolydian' },
  { id: 'majorAugmented5', name: 'Major Augmented 5th', intervals: [0, 2, 4, 5, 8, 9, 11], common: 'Major augmented fifth' },
  { id: 'africanAmericanBlues', name: 'African-American Blues', intervals: [0, 2, 3, 4, 5, 6, 7, 9, 10, 11], common: 'Blues collection (II and major VII optional)' },
]);

export function lccPitchClass(note) {
  const spelling = String(note).trim().replaceAll('♯', '#').replaceAll('♭', 'b');
  const normalized = ENHARMONIC[spelling] || spelling;
  const value = LCC_NOTES.indexOf(normalized);
  if (value >= 0) return value;
  const parsed = /^([A-G])([#b]*)$/.exec(spelling);
  if (!parsed) throw new Error(`Unknown LCC note: ${note}`);
  const naturals = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  return mod12(naturals[parsed[1]] + [...parsed[2]].reduce((sum, accidental) => sum + (accidental === '#' ? 1 : -1), 0));
}

export function lccScaleNotes(parent, scale) {
  const tonic = lccPitchClass(parent);
  const definition = typeof scale === 'string'
    ? [...LCC_PRINCIPAL_SCALES, ...LCC_HORIZONTAL_SCALES].find(item => item.name === scale || item.id === scale)
    : scale;
  if (!definition) throw new Error(`Unknown LCC scale: ${scale}`);
  const specialDegreeLetters = {
    auxAugmented: [0, 1, 2, 3, 4, 6],
    auxDiminished: [0, 1, 2, 3, 3, 4, 5, 6],
    auxDiminishedBlues: [0, 1, 2, 2, 3, 4, 5, 6],
    africanAmericanBlues: [0, 1, 2, 2, 3, 3, 4, 5, 6, 6],
  };
  const degreeLetters = specialDegreeLetters[definition.id]
    || (definition.intervals.length === 7 && [...LCC_PRINCIPAL_SCALES.slice(0, 4), ...LCC_HORIZONTAL_SCALES.slice(0, 3)].some(item => item.id === definition.id)
      ? definition.intervals.map((_, index) => index) : null);
  if (degreeLetters) {
    const letters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const naturalPitches = [0, 2, 4, 5, 7, 9, 11];
    const letterStart = letters.indexOf(String(parent).trim()[0].toUpperCase());
    return definition.intervals.map((interval, degree) => {
      const letterIndex = (letterStart + degreeLetters[degree]) % 7;
      const distance = mod12(tonic + interval - naturalPitches[letterIndex]);
      const accidental = distance <= 2 ? distance : distance >= 10 ? distance - 12 : null;
      if (accidental === null) return LCC_NOTES[mod12(tonic + interval)];
      return letters[letterIndex] + (accidental < 0 ? 'b'.repeat(-accidental) : '#'.repeat(accidental));
    });
  }
  return definition.intervals.map(interval => LCC_NOTES[mod12(tonic + interval)]);
}

export function lccChromaticOrder(parent) {
  const tonic = lccPitchClass(parent);
  const prime = lccScaleNotes(parent, LCC_PRINCIPAL_SCALES[0]);
  const primeByPitch = new Map(prime.map(note => [lccPitchClass(note), note]));
  return LCC_TONAL_ORDER.map((interval, index) => ({
    rank: index + 1,
    interval,
    note: primeByPitch.get(mod12(tonic + interval)) || LCC_NOTES[mod12(tonic + interval)],
    level: index < 7 ? 'ingoing' : index < 9 ? 'semi-ingoing' : index < 11 ? 'semi-outgoing' : 'outgoing',
  }));
}

function modeFromRoot(parent, definition, chordRoot) {
  const tonic = lccPitchClass(parent);
  const root = lccPitchClass(chordRoot);
  const relative = mod12(root - tonic);
  const modeIndex = definition.intervals.indexOf(relative);
  if (modeIndex < 0) return null;
  const notes = lccScaleNotes(parent, definition);
  return {
    number: modeIndex + 1,
    notes: [...notes.slice(modeIndex), ...notes.slice(0, modeIndex)],
    rootRelative: relative,
  };
}

function extensions(mode, chordNotes) {
  if (!mode) return [];
  const chord = new Set(chordNotes.map(lccPitchClass));
  return mode.notes.filter(note => !chord.has(lccPitchClass(note)));
}

export function analyzeLccParents(chordNotes, { includeHorizontal = false } = {}) {
  if (!Array.isArray(chordNotes) || !chordNotes.length) return [];
  const chordPitches = chordNotes.map(lccPitchClass);
  const root = LCC_NOTES[chordPitches[0]];
  const scales = includeHorizontal ? [...LCC_PRINCIPAL_SCALES, ...LCC_HORIZONTAL_SCALES] : LCC_PRINCIPAL_SCALES;
  const results = [];
  for (const parent of LCC_NOTES) {
    const tonic = lccPitchClass(parent);
    for (const definition of scales) {
      const pitchSet = new Set(definition.intervals.map(interval => mod12(tonic + interval)));
      if (!chordPitches.every(pitch => pitchSet.has(pitch))) continue;
      const mode = modeFromRoot(parent, definition, root);
      const rootInterval = mod12(chordPitches[0] - tonic);
      const rootToneOrder = LCC_TONAL_ORDER.indexOf(rootInterval) + 1;
      const colorOrder = scales.indexOf(definition) + 1;
      results.push({
        parent,
        scale: definition.name,
        scaleId: definition.id,
        family: colorOrder <= 7 ? 'principal' : 'horizontal',
        colorOrder,
        scaleNotes: lccScaleNotes(parent, definition),
        mode,
        chordRoot: root,
        degree_from_parent: rootInterval,
        tonicInterval: rootInterval,
        rootToneOrder,
        extensions: extensions(mode, chordNotes),
        // Teaching shortlist only: not Russell's formal tonal-gravity measurement.
        teachingScore: colorOrder * 12 + rootToneOrder,
      });
    }
  }
  return results.sort((a, b) => a.teachingScore - b.teachingScore || LCC_NOTES.indexOf(a.parent) - LCC_NOTES.indexOf(b.parent));
}

export function lccColorFamily(parent, chordNotes = []) {
  const prime = new Set(lccScaleNotes(parent, LCC_PRINCIPAL_SCALES[0]).map(lccPitchClass));
  const chord = chordNotes.map(lccPitchClass);
  const chordRoot = chord.length ? LCC_NOTES[chord[0]] : null;
  return LCC_PRINCIPAL_SCALES.map((definition, index) => {
    const notes = lccScaleNotes(parent, definition);
    const pitches = new Set(notes.map(lccPitchClass));
    const mode = chordRoot ? modeFromRoot(parent, definition, chordRoot) : null;
    return {
      id: definition.id,
      name: definition.name,
      common: definition.common,
      colorOrder: index + 1,
      notes,
      compatible: chord.every(pitch => pitches.has(pitch)),
      missingChordNotes: chord.filter(pitch => !pitches.has(pitch)).map(pitch => LCC_NOTES[pitch]),
      added: notes.filter(note => !prime.has(lccPitchClass(note))),
      removed: [...prime].filter(pitch => !pitches.has(pitch)).map(pitch => LCC_NOTES[pitch]),
      mode,
      extensions: extensions(mode, chordNotes),
    };
  });
}

/** Ear-training aid only: minimal pitch-class changes, not Russell's chordmode prescription. */
export function lccAdaptChordToColor(parent, chordNotes, scale) {
  const colorNotes = lccScaleNotes(parent, scale);
  const prime = new Set(lccScaleNotes(parent, LCC_PRINCIPAL_SCALES[0]).map(lccPitchClass));
  const colorByPitch = new Map(colorNotes.map(note => [lccPitchClass(note), note]));
  const substitutions = [];
  const notes = chordNotes.map(note => {
    const source = lccPitchClass(note);
    if (colorByPitch.has(source)) return colorByPitch.get(source);
    const next = [...colorByPitch.entries()].map(([pitch, spelling]) => ({
      pitch, spelling,
      distance: Math.min(mod12(pitch - source), mod12(source - pitch)),
      newColor: !prime.has(pitch),
    })).sort((a, b) => a.distance - b.distance || Number(b.newColor) - Number(a.newColor) || a.pitch - b.pitch)[0];
    substitutions.push({ from: note, to: next.spelling, semitones: next.distance });
    return next.spelling;
  });
  return { notes, substitutions };
}

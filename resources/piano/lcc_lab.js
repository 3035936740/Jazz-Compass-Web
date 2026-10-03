import { LCC_NOTES, LCC_TONAL_ORDER, LCC_PRINCIPAL_SCALES, LCC_HORIZONTAL_SCALES, lccPitchClass, lccScaleNotes } from './lcc_concept.js';

const mod12 = value => ((value % 12) + 12) % 12;
const catalog = [...LCC_PRINCIPAL_SCALES, ...LCC_HORIZONTAL_SCALES];

export function lccLabScale(id) {
  const scale = catalog.find(item => item.id === id);
  if (!scale) throw new Error(`Unknown LCC scale: ${id}`);
  return scale;
}

/** Rotations are pitch collections, not Russell's full formal chordmode names. */
export function lccChildCollections(parent, scaleId) {
  const scale = lccLabScale(scaleId);
  const notes = lccScaleNotes(parent, scale);
  const tonic = lccPitchClass(parent);
  return notes.map((root, index) => ({
    degree: index + 1,
    root,
    notes: [...notes.slice(index), ...notes.slice(0, index)],
    intervals: [...scale.intervals.slice(index), ...scale.intervals.slice(0, index)]
      .map(interval => mod12(interval - scale.intervals[index])).sort((a, b) => a - b),
    tonicInterval: mod12(lccPitchClass(root) - tonic),
    tonalRank: LCC_TONAL_ORDER.indexOf(mod12(lccPitchClass(root) - tonic)) + 1,
  }));
}

/** A transparent tertian extraction for seven-tone parents; not a canonical LCC chart. */
export function lccTertianExamples(parent, scaleId) {
  const scale = lccLabScale(scaleId);
  if (scale.intervals.length !== 7) return [];
  const modes = lccChildCollections(parent, scaleId);
  return modes.map((mode, index) => {
    const notes = [0, 2, 4, 6].map(skip => mode.notes[skip]);
    const intervals = notes.map(note => mod12(lccPitchClass(note) - lccPitchClass(mode.root))).sort((a, b) => a - b);
    return { degree: index + 1, root: mode.root, notes, intervals, tonicStation: index === 0 || index === 5 };
  });
}

export function lccAscendingMidi(parent, scaleId, octave = 4) {
  const scale = lccLabScale(scaleId);
  const start = (octave + 1) * 12 + lccPitchClass(parent);
  return [...scale.intervals.map(interval => start + interval), start + 12];
}

export const LCC_LAB_NOTES = LCC_NOTES;

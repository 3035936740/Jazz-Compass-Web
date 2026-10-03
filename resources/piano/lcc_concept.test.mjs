import test from 'node:test';
import assert from 'node:assert/strict';
import { LCC_PRINCIPAL_SCALES, LCC_HORIZONTAL_SCALES, lccPitchClass, lccScaleNotes, lccChromaticOrder, analyzeLccParents, lccColorFamily, lccAdaptChordToColor } from './lcc_concept.js';
import { LCCAnalyzer } from './jazz_compass.js';

test('seven principal colors and four separate horizontal collections', () => {
  assert.equal(LCC_PRINCIPAL_SCALES.length, 7);
  assert.equal(LCC_HORIZONTAL_SCALES.length, 4);
  assert.deepEqual(LCC_PRINCIPAL_SCALES[5].intervals, [0, 2, 3, 5, 6, 8, 9, 11]);
  assert.deepEqual(LCC_PRINCIPAL_SCALES[6].intervals, [0, 1, 3, 4, 6, 7, 9, 10]);
  assert.notDeepEqual(LCC_PRINCIPAL_SCALES[5].intervals, LCC_PRINCIPAL_SCALES[6].intervals);
});

test('Lydian scale spelling and chromatic tonal order are distinct from semitone order', () => {
  assert.deepEqual(lccScaleNotes('C', 'lydian'), ['C', 'D', 'E', 'F#', 'G', 'A', 'B']);
  assert.deepEqual(lccChromaticOrder('C').map(item => item.note), ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Ab', 'Eb', 'Bb', 'F', 'Db']);
  assert.equal(lccPitchClass('F♯'), 6);
  assert.equal(lccPitchClass('F##'), 7);
  assert.deepEqual(lccScaleNotes('C#', 'lydian'), ['C#', 'D#', 'E#', 'F##', 'G#', 'A#', 'B#']);
  assert.deepEqual(lccScaleNotes('F', 'lydian'), ['F', 'G', 'A', 'B', 'C', 'D', 'E']);
  assert.deepEqual(lccScaleNotes('C', 'auxAugmented'), ['C', 'D', 'E', 'F#', 'G#', 'Bb']);
  assert.deepEqual(lccScaleNotes('C', 'auxDiminished'), ['C', 'D', 'Eb', 'F', 'F#', 'G#', 'A', 'B']);
  assert.deepEqual(lccScaleNotes('C', 'auxDiminishedBlues'), ['C', 'Db', 'Eb', 'E', 'F#', 'G', 'A', 'Bb']);
  assert.deepEqual(lccScaleNotes('C', 'africanAmericanBlues'), ['C', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'A', 'Bb', 'B']);
});

test('parent tonic can differ from chord root and provides its relative mode', () => {
  const cases = [
    { notes: ['G', 'B', 'D', 'F'], parent: 'F', mode: 2 },
    { notes: ['A', 'C', 'E', 'G'], parent: 'C', mode: 6 },
    { notes: ['C', 'E', 'G', 'B'], parent: 'C', mode: 1 },
  ];
  for (const item of cases) {
    const result = analyzeLccParents(item.notes)[0];
    assert.equal(result.parent, item.parent);
    assert.equal(result.scaleId, 'lydian');
    assert.equal(result.mode.number, item.mode);
    assert.ok(result.extensions.length > 0);
  }
});

test('color family shows changed pitch classes and chord compatibility', () => {
  const colors = lccColorFamily('C', ['C', 'E', 'G', 'B']);
  assert.equal(colors.length, 7);
  assert.equal(colors[0].compatible, true);
  assert.deepEqual(colors[1].added, ['G#']);
  assert.deepEqual(colors[1].removed, ['G']);
  assert.equal(colors[1].compatible, false);
  assert.deepEqual(colors[3].removed, ['B']);
  assert.deepEqual(colors[3].missingChordNotes, ['B']);
});

test('legacy LCCAnalyzer API delegates to extended model', () => {
  const analyzer = new LCCAnalyzer();
  assert.deepEqual(analyzer.scaleNotes('C Lydian (Fundamental)'), lccScaleNotes('C', 'lydian'));
  assert.equal(analyzer.analyzeLCC(['G', 'B', 'D', 'F'])[0].parent, 'F');
  assert.equal(analyzer.chromaticOrder('C').length, 12);
  assert.equal(analyzer.colorFamily('C').length, 7);
  assert.ok(analyzer.analyzeLCC(['G', 'B', 'D', 'F'], { includeHorizontal: true }).some(item => item.family === 'horizontal'));
});

test('color-change preview replaces absent chord tones and keeps present ones', () => {
  const augmented = lccAdaptChordToColor('C', ['C', 'E', 'G', 'B'], 'lydianAugmented');
  assert.deepEqual(augmented.notes, ['C', 'E', 'G#', 'B']);
  assert.deepEqual(augmented.substitutions.map(item => `${item.from}->${item.to}`), ['G->G#']);
  const diminished = lccAdaptChordToColor('C', ['C', 'E', 'G', 'B'], 'lydianDiminished');
  assert.deepEqual(diminished.notes, ['C', 'Eb', 'G', 'B']);
});

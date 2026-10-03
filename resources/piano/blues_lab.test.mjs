import test from 'node:test';
import assert from 'node:assert/strict';
import { bluesForm, BLUES_SCALES, bluesScaleNotes, bluesScaleMidi, bluesBentFrequency, bluesPhrase } from './blues_lab.js';

test('12-bar long, quick, jazz and minor blues keep their distinct changes', () => {
  const long = bluesForm('C', 'long');
  assert.equal(long.length, 12);
  assert.deepEqual(long.map(bar => bar.segments[0].symbol), ['C7', 'C7', 'C7', 'C7', 'F7', 'F7', 'C7', 'C7', 'G7', 'F7', 'C7', 'G7']);
  assert.equal(bluesForm('C', 'quick')[1].segments[0].symbol, 'F7');
  const jazz = bluesForm('C', 'jazz');
  assert.deepEqual(jazz[3].segments.map(segment => segment.symbol), ['Gm7', 'C7']);
  assert.deepEqual(jazz[5].segments.map(segment => segment.symbol), ['F#dim7']);
  assert.deepEqual(jazz[11].segments.map(segment => segment.symbol), ['Dm7', 'G7']);
  const minor = bluesForm('C', 'minor');
  assert.equal(minor[0].segments[0].symbol, 'Cm7');
  assert.equal(minor[8].segments[0].symbol, 'G7b9');
  assert.deepEqual(bluesForm('C', 'minor', 'iiV')[11].segments.map(segment => segment.symbol), ['Dm7b5', 'G7b9']);
  assert.deepEqual(bluesForm('C', 'long', 'tonic').at(-1).segments.map(segment => segment.symbol), ['C7']);
  assert.ok(jazz.every(bar => bar.segments.reduce((total, segment) => total + segment.beats, 0) === 4));
});

test('six blues and pentatonic collections spell blue colors and ascend over the octave', () => {
  assert.equal(BLUES_SCALES.length, 6);
  assert.deepEqual(bluesScaleNotes('C', 'minorBlues').map(item => item.note), ['C', 'Eb', 'F', 'F#', 'G', 'Bb']);
  assert.deepEqual(bluesScaleNotes('C', 'majorBlues').map(item => item.note), ['C', 'D', 'Eb', 'E', 'G', 'A']);
  assert.deepEqual(bluesScaleNotes('C', 'mixedBlues').map(item => item.note), ['C', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'A', 'Bb', 'B']);
  assert.deepEqual(bluesScaleMidi('B', 'minorBlues'), [71, 74, 76, 77, 78, 81, 83]);
});

test('blue-note bend is between semitone pitches and phrases include intentional space', () => {
  const natural = bluesBentFrequency('C', 4, 0);
  const middle = bluesBentFrequency('C', 4, -50);
  const lowered = bluesBentFrequency('C', 4, -100);
  assert.ok(natural > middle && middle > lowered);
  assert.ok(Math.abs(natural / lowered - 2 ** (1 / 12)) < 1e-12);
  assert.equal(bluesPhrase('C', 'callResponse').filter(note => note === null).length, 3);
  assert.deepEqual(bluesPhrase('C', 'blueFifth').slice(0, 3), [65, 66, 67]);
});

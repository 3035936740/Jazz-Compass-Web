import test from 'node:test';
import assert from 'node:assert/strict';
import { lccChildCollections, lccTertianExamples, lccAscendingMidi } from './lcc_lab.js';

test('manual Lydian tonic explores principal and auxiliary parents without chord input', () => {
  const modes = lccChildCollections('F', 'lydian');
  assert.equal(modes.length, 7);
  assert.deepEqual(modes.map(mode => mode.root), ['F', 'G', 'A', 'B', 'C', 'D', 'E']);
  assert.equal(modes[1].tonicInterval, 2);
  assert.equal(modes[1].tonalRank, 3);
  assert.deepEqual(modes[1].intervals, [0, 2, 4, 5, 7, 9, 10]);
  assert.equal(lccChildCollections('C', 'auxDiminished').length, 8);
  assert.equal(lccChildCollections('C', 'auxAugmented').length, 6);
  assert.equal(lccTertianExamples('C', 'auxAugmented').length, 0);
});

test('seven-tone tertian examples mark I and VI as tonic stations', () => {
  const examples = lccTertianExamples('C', 'lydian');
  assert.equal(examples.length, 7);
  assert.deepEqual(examples.filter(item => item.tonicStation).map(item => item.root), ['C', 'A']);
  assert.deepEqual(examples[0].notes, ['C', 'E', 'G', 'B']);
  assert.deepEqual(examples[5].notes, ['A', 'C', 'E', 'G']);
  assert.deepEqual(lccTertianExamples('C', 'lydianDiminished')[0].notes, ['C', 'Eb', 'G', 'B']);
});

test('manual scale audition stays ascending across the octave boundary', () => {
  assert.deepEqual(lccAscendingMidi('B', 'lydian'), [71, 73, 75, 77, 78, 80, 82, 83]);
});

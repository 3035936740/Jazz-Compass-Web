import test from 'node:test';
import assert from 'node:assert/strict';
import { spelledNote, satbToVoices, chordSymbolsToVoices } from './staff_handoff.js';

test('hand-off to the staff editor', () => {
  assert.deepEqual(spelledNote('Bb4'), { letter: 'B', octave: 4, alter: -1, cents: 0 });
  const [upper, lower] = satbToVoices([['C3', 'G3', 'E4', 'C5'], ['G2', 'G3', 'D4', 'B4']]);
  assert.equal(upper.length, 2);
  assert.deepEqual(upper[0].notes.map((n) => n.letter + n.octave), ['E4', 'C5']);
  assert.deepEqual(lower[1].notes.map((n) => n.letter + n.octave), ['G2', 'G3']);
  assert.equal(upper[0].duration, 'w');
  const [u2, l2] = chordSymbolsToVoices([{ symbol: 'C', beats: 4 }, { symbol: 'G7', beats: 3 }]);
  assert.deepEqual(l2[0].notes.map((n) => n.letter + n.octave), ['C3'], 'root added in the bass');
  assert.equal(u2[1].duration, 'h');
  assert.equal(u2[1].dots, 1, '3 beats = dotted half');
});

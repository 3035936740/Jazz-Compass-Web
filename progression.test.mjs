import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProgression, progressionEvents, transposeSymbol, transposeProgression } from './progression.js';

test('bars split evenly, % repeats the previous bar', () => {
  const bars = parseProgression('| Dm7 G7 | Cmaj7 | % |', { beatsPerBar: 4 });
  assert.deepEqual(bars.map((bar) => bar.chords), [['Dm7', 'G7'], ['Cmaj7'], ['Cmaj7']]);
  const { events, totalBeats } = progressionEvents(bars);
  assert.equal(totalBeats, 12);
  assert.deepEqual(events.map((e) => [e.symbol, e.beat, e.beats]), [['Dm7', 0, 2], ['G7', 2, 2], ['Cmaj7', 4, 4], ['Cmaj7', 8, 4]]);
});

test('without bar lines each chord takes chordBeats', () => {
  const { events, totalBeats } = progressionEvents(parseProgression('C Am F G', { chordBeats: 2 }));
  assert.equal(totalBeats, 8);
  assert.deepEqual(events.map((e) => e.beat), [0, 2, 4, 6]);
});

test('transposition keeps quality, slash bass and accidental preference', () => {
  assert.equal(transposeSymbol('Dm7', 2), 'Em7');
  assert.equal(transposeSymbol('Bb7', 1), 'B7');
  assert.equal(transposeSymbol('F#m7b5', 1), 'Gm7b5');
  assert.equal(transposeSymbol('C/E', 3), 'Eb/G');
  assert.equal(transposeProgression('| Dm7 G7 | Cmaj7 | % |', -2), '| Cm7 F7 | Bbmaj7 | % |');
});

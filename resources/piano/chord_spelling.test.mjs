import test from 'node:test';
import assert from 'node:assert/strict';
import { spellChord, voiceSpelledChord } from './chord_spelling.js';
import { parsePitch, intervalBetween } from './pitch_spelling.js';

const pcs = (root, offsets) => offsets.map((o) => (parsePitch(`${root}4`).pc + o) % 12);
const names = (root, offsets) => spellChord(root, pcs(root, offsets)).map((t) => t.name).join(' ');
const labels = (root, offsets) => spellChord(root, pcs(root, offsets)).map((t) => t.label).join(' ');

// ref:omt-triads
test('triads and seventh chords are spelled by letter', () => {
  assert.equal(names('E', [0, 4, 7]), 'E G# B');
  assert.equal(names('Db', [0, 4, 7]), 'Db F Ab');
  assert.equal(names('B', [0, 3, 6]), 'B D F');
  assert.equal(names('C', [0, 4, 8]), 'C E G#');
  assert.equal(names('F#', [0, 3, 7, 10]), 'F# A C# E');
  assert.equal(names('C', [0, 3, 6, 9]), 'C Eb Gb Bbb');
  assert.equal(labels('C', [0, 3, 6, 9]), '1 ♭3 ♭5 𝄫7');
  assert.equal(names('B', [0, 3, 6, 10]), 'B D F A');
  assert.equal(names('G', [0, 4, 7, 11]), 'G B D F#');
});

// ref:omt2e-chord-symbols
test('extensions and alterations', () => {
  assert.equal(names('C', [0, 4, 7, 10, 3]), 'C E G Bb D#'); // C7♯9：♯9 是 D#，不是 E♭
  assert.equal(labels('C', [0, 4, 7, 10, 3]), '1 3 5 ♭7 ♯9');
  assert.equal(names('C', [0, 4, 7, 10, 6]), 'C E G Bb F#'); // C7♯11
  assert.equal(names('C', [0, 4, 7, 10, 1]), 'C E G Bb Db'); // C7♭9
  assert.equal(names('C', [0, 4, 7, 10, 8]), 'C E G Bb Ab'); // C7♭13
  assert.equal(names('C', [0, 4, 7, 10, 2, 5, 9]), 'C E G Bb D F A'); // C13
  assert.equal(names('Eb', [0, 4, 7, 10, 3]), 'Eb G Bb Db F#');
});

test('voicing stacks extensions above the octave and puts the bass below', () => {
  const spelled = spellChord('C', pcs('C', [0, 4, 7, 10, 2]));
  const voiced = voiceSpelledChord('C', spelled, { rootOctave: 4, bass: 'E' });
  assert.deepEqual(voiced, ['E3', 'C4', 'E4', 'G4', 'Bb4', 'D5']);
  // 每个音都按度数位于根音之上
  const b = voiceSpelledChord('B', spellChord('B', pcs('B', [0, 4, 7])), { rootOctave: 3 });
  assert.deepEqual(b, ['B3', 'D#4', 'F#4']);
  assert.equal(intervalBetween('B3', 'D#4').name, 'M3');
});

// ref:omt-intervals 七声音阶每级一个字母
test('heptatonic scales are spelled with one letter per degree', async () => {
  const { spellHeptatonic } = await import('./pitch_spelling.js');
  assert.deepEqual(spellHeptatonic('E', [0, 2, 4, 5, 7, 9, 11]), ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#']);
  assert.deepEqual(spellHeptatonic('Gb', [0, 2, 4, 5, 7, 9, 11]), ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F']);
  assert.deepEqual(spellHeptatonic('A', [0, 2, 3, 5, 7, 8, 11]), ['A', 'B', 'C', 'D', 'E', 'F', 'G#']);
  assert.deepEqual(spellHeptatonic('C', [0, 1, 4, 5, 7, 8, 11]), ['C', 'Db', 'E', 'F', 'G', 'Ab', 'B']);
  assert.equal(spellHeptatonic('C', [0, 2, 4, 7, 9]), null);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseChordSymbol, chordTones, tritoneSub, sharedTritone, reharmonize, closePositions, dropVoicing, shellVoicings,
  soWhatVoicing, UPPER_STRUCTURES, upperStructure, bebopScale, bebopDescent, chromaticEnclosures, sixthDiminishedHarmonization,
  FORMS, realizeForm,
} from './jazz_theory.js';

test('chord symbols and spelled tones', () => {
  assert.deepEqual(parseChordSymbol('Bbm7b5'), { root: 'Bb', rootPc: 10, quality: 'm7b5' });
  assert.deepEqual(chordTones('G', '7'), ['G', 'B', 'D', 'F']);
  assert.deepEqual(chordTones('F#', 'm7b5'), ['F#', 'A', 'C', 'E']);
});

test('tritone substitution shares the tritone (OMT 2e 6.6)', () => {
  assert.equal(tritoneSub('G'), 'Db');
  const shared = sharedTritone('G');
  assert.deepEqual(shared.original, ['B', 'F']);
  assert.deepEqual(shared.substitute, ['F', 'Cb']); // Cb = B 的同音异名
});

test('Coltrane changes for ii–V–I in C (Wikipedia)', () => {
  const r = reharmonize(['Dm7', 'G7', 'Cmaj7'], 'C', 'coltrane');
  assert.deepEqual(r.chords, ['Dm7', 'Eb7', 'Abmaj7', 'B7', 'Emaj7', 'G7', 'Cmaj7']);
});

test('backdoor, applied chords and mixture', () => {
  assert.deepEqual(reharmonize(['Dm7', 'G7', 'Cmaj7'], 'C', 'backdoor').chords, ['Dm7', 'Fm7', 'Bb7', 'Cmaj7']);
  assert.deepEqual(reharmonize(['Am7', 'Dm7', 'G7', 'Cmaj7'], 'C', 'applied').chords, ['A7', 'D7', 'G7', 'Cmaj7']);
  assert.deepEqual(reharmonize(['Dm7', 'G7', 'Cmaj7'], 'C', 'mixture').chords, ['Dm7♭5', 'G7♭9', 'Cmaj7']);
});

test('drop 2 and drop 3 lower the 2nd / 3rd voice from the top', () => {
  const root = closePositions('C', 'maj7', 4)[0];
  assert.deepEqual(root.map((v) => v.name), ['C', 'E', 'G', 'B']);
  assert.deepEqual(dropVoicing(root, 2).map((v) => v.name), ['G', 'C', 'E', 'B']);
  assert.deepEqual(dropVoicing(root, 3).map((v) => v.name), ['E', 'C', 'G', 'B']);
  assert.equal(dropVoicing(root, 2)[0].midi, 55);
});

test('shell voicing omits the fifth; So What = 4ths + M3', () => {
  shellVoicings('G', '7').forEach((v) => assert.deepEqual(v.map((n) => n.name).sort(), ['B', 'F', 'G']));
  const sw = soWhatVoicing('E', 3);
  assert.deepEqual(sw.map((v) => v.name), ['E', 'A', 'D', 'G', 'B']);
  assert.deepEqual(sw.slice(1).map((v, i) => v.midi - sw[i].midi), [5, 5, 5, 4]);
});

test('upper structures over C7 match the Wikipedia table', () => {
  const names = UPPER_STRUCTURES.map((item) => upperStructure('C', item).triadName);
  assert.deepEqual(names, ['D', 'Eb', 'Gb', 'Ab', 'A', 'Cm', 'Dbm', 'Ebm']);
});

test('bebop scales put chord tones on the beat (Wikipedia)', () => {
  assert.deepEqual(bebopScale('C', 'dominant').map((n) => n.name), ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'B']);
  assert.deepEqual(bebopScale('C', 'major').map((n) => n.name), ['C', 'D', 'E', 'F', 'G', 'G#', 'A', 'B']);
  for (const [kind, quality] of [['dominant', '7'], ['major', '6'], ['melodicMinor', 'm6'], ['harmonicMinor', 'm7']]) {
    const line = bebopDescent('C', kind, quality);
    assert.ok(line.filter((n) => n.onBeat).every((n) => n.chordTone), kind);
  }
});

test('sixth-diminished scale alternates 6 and °7 chords', () => {
  assert.deepEqual(sixthDiminishedHarmonization('C').map((n) => n.chord), ['6', '°7', '6', '°7', '6', '°7', '6', '°7']);
});

test('enclosures surround the target by half steps', () => {
  assert.deepEqual(chromaticEnclosures(67)[0].midis, [68, 66, 67]);
});

test('forms reproduce the verified charts', () => {
  const alice = realizeForm(FORMS.find((f) => f.id === 'blues-bird'));
  assert.deepEqual(alice.map((bar) => bar.join(' ')), ['Fmaj7', 'Em7♭5 A7', 'Dm7 G7', 'Cm7 F7', 'Bb7', 'Bbm7 Eb7', 'Am7 D7', 'Abm7 Db7', 'Gm7', 'C7', 'F7 D7', 'Gm7 C7']);
  const rhythm = realizeForm(FORMS.find((f) => f.id === 'rhythm-changes'));
  assert.equal(rhythm.length, 32);
  assert.deepEqual(rhythm.slice(16, 24).map((b) => b.join(' ')), ['D7', 'D7', 'G7', 'G7', 'C7', 'C7', 'F7', 'F7']);
  assert.deepEqual(rhythm.slice(0, 8).map((b) => b.join(' ')), ['Bbmaj7 G7', 'Cm7 F7', 'Bbmaj7 G7', 'Cm7 F7', 'Fm7 Bb7', 'Ebmaj7 Ab7', 'Dm7 G7', 'Cm7 F7']);
  const bebop = realizeForm(FORMS.find((f) => f.id === 'blues-bebop'));
  assert.equal(bebop[5][0], 'B°7');
});

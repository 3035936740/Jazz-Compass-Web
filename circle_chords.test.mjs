import test from 'node:test';
import assert from 'node:assert/strict';
import { circleDegreeChord, resizeCircleVoicing } from './circle_chords.js';
import { melodicCircleScale } from './circle_scales.js';
import { spellHeptatonic, parseNote, parsePitch } from './pitch_spelling.js';

const major = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const chord = (steps, seventh = false) => circleDegreeChord(major, 0, 'I', { steps, seventh });

test('inversion buttons move the actual bass by rotating notes through octaves', () => {
  assert.equal(chord(0).name, 'C');
  assert.deepEqual(chord(0).tones.map(t => t.midi), [60, 64, 67]);
  assert.equal(chord(1).name, 'C/E');
  assert.equal(chord(1).roman, 'I6');
  assert.deepEqual(chord(1).tones.map(t => t.midi), [64, 67, 72]);
  assert.equal(chord(2).name, 'C/G');
  assert.equal(chord(2).roman, 'I6/4');
  assert.deepEqual(chord(2).tones.map(t => t.midi), [67, 72, 76]);
  assert.equal(chord(3).roman, 'I');
  assert.deepEqual(chord(3).tones.map(t => t.midi), [72, 76, 79]);
  assert.equal(chord(3).octaves, 1);
  assert.deepEqual(chord(3).tones.map(t => t.pitch), ['C5', 'E5', 'G5']);
  assert.equal(chord(9).octaves, 3);
  assert.deepEqual(chord(9).tones.map(t => t.pitch), ['C7', 'E7', 'G7']);
  assert.equal(chord(-6).octaves, -2);
  assert.deepEqual(chord(-6).tones.map(t => t.pitch), ['C2', 'E2', 'G2']);
  assert.deepEqual(chord(-1).tones.map(t => t.midi), [55, 60, 64]);
  assert.equal(chord(-1).name, 'C/G');
  assert.deepEqual(chord(-2).tones.map(t => t.midi), [52, 55, 60]);
  const upper = circleDegreeChord(major, 7, 'I');
  assert.equal(upper.name, 'C');
  // 高八度 = 频率乘 2（浮点运算可能差最后一位，按相对误差比较）
  upper.frequencies.forEach((f, i) => assert.ok(Math.abs(f / (chord(0).frequencies[i] * 2) - 1) < 1e-12, `${f} vs ${chord(0).frequencies[i] * 2}`));
});

test('sevenths use scale spelling and correct qualities, figures and slash basses', () => {
  assert.equal(chord(0, true).name, 'Cmaj7');
  assert.equal(chord(1, true).roman, 'I6/5');
  assert.equal(chord(2, true).roman, 'I4/3');
  assert.equal(chord(3, true).roman, 'I4/2');
  assert.equal(chord(3, true).name, 'Cmaj7/B');
  assert.deepEqual(chord(3, true).tones.map(t => t.midi), [71, 72, 76, 79]);
  assert.equal(circleDegreeChord(major, 4, 'V', { seventh: true, steps: 1 }).name, 'G7/B');
  assert.equal(circleDegreeChord(major, 1, 'ii', { seventh: true }).name, 'Dm7');
  const halfDim = circleDegreeChord(major, 6, 'vii°', { seventh: true });
  assert.equal(halfDim.name, 'Bm7b5');
  assert.equal(halfDim.roman, 'viiø7');
  const harmonicMinor = ['A', 'B', 'C', 'D', 'E', 'F', 'G#'];
  assert.equal(circleDegreeChord(harmonicMinor, 6, 'vii°', { seventh: true }).name, 'G#dim7');
  assert.equal(circleDegreeChord(harmonicMinor, 0, 'i', { seventh: true }).name, 'Am(maj7)');
  assert.equal(circleDegreeChord(harmonicMinor, 2, 'III+', { seventh: true }).name, 'C+maj7');
});

test('adding and removing the seventh preserves inversion and octave while replacing a removed bass', () => {
  for (const steps of [-6, -2, -1, 0, 1, 2, 3, 7]) {
    const next = resizeCircleVoicing(steps, false, true);
    assert.equal(chord(next, true).tones[0].midi, chord(steps).tones[0].midi);
    assert.equal(resizeCircleVoicing(next, true, false), steps);
  }
  assert.equal(resizeCircleVoicing(3, true, false), 3);
  assert.deepEqual(chord(resizeCircleVoicing(3, true, false)).tones.map(t => t.midi), [72, 76, 79]);
});

test('all scale forms and altered keys produce strictly ascending voiced triads and sevenths', () => {
  const scales = [
    [0, 2, 4, 5, 7, 9, 11], [0, 2, 4, 5, 7, 8, 11],
    [0, 2, 3, 5, 7, 8, 10], [0, 2, 3, 5, 7, 8, 11],
    ...['major', 'minor'].flatMap(q => ['ascending', 'descending'].map(d => melodicCircleScale(q, d).intervals)),
  ];
  for (const root of ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'Cb', 'C#']) {
    for (const intervals of scales) {
      const notes = spellHeptatonic(root, intervals);
      for (let degree = 0; degree < 8; degree += 1) {
        for (const seventh of [false, true]) for (let steps = -4; steps <= 4; steps += 1) {
          const result = circleDegreeChord(notes, degree, 'I', { seventh, steps });
          assert.equal(result.tones.length, seventh ? 4 : 3);
          result.tones.forEach((tone, i) => {
            assert.equal(((tone.midi % 12) + 12) % 12, parseNote(tone.name).pc);
            assert.equal(parsePitch(tone.pitch).midi, tone.midi);
            if (i) assert.ok(tone.midi > result.tones[i - 1].midi);
          });
        }
      }
    }
  }
});

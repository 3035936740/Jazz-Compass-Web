import test from 'node:test';
import assert from 'node:assert/strict';
import { noteToFrequency, noteToSemitoneValue, semitoneToFreq, semitoneToMidi, chordNotesToFrequencies } from './note_frequency.js';

const close = (a, b) => Math.abs(a - b) < 0.01;

test('note names and semitones', () => {
  assert.ok(close(noteToFrequency('A4'), 440));
  assert.ok(close(noteToFrequency('C4'), 261.63));
  assert.equal(noteToSemitoneValue('Db'), 1);
  // 按音级拼写的名字也能换算
  assert.equal(noteToSemitoneValue('Cb'), 11);
  assert.equal(noteToSemitoneValue('E#'), 5);
  assert.equal(noteToSemitoneValue('Bbb'), 9);
  assert.equal(semitoneToMidi(0, 4), 60);
  assert.ok(close(semitoneToFreq(9, 4), 440));
});

test('chord notes are stacked upward from the root', () => {
  const { freqs, rootMidi } = chordNotesToFrequencies(['E', 'G#', 'B'], 4);
  assert.equal(rootMidi, 64);
  assert.ok(freqs[0] < freqs[1] && freqs[1] < freqs[2]);
  // C♭ 与 B 同音高：和弦 Ab Cb Eb 的第二个音仍在根音之上
  const flats = chordNotesToFrequencies(['Ab', 'Cb', 'Eb'], 4).freqs;
  assert.ok(flats[0] < flats[1] && flats[1] < flats[2]);
});

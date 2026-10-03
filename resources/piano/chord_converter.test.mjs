import test from 'node:test';
import assert from 'node:assert/strict';
import { EnhancedChordConverter } from './jazz_compass.js';

const conv = new EnhancedChordConverter();
const notes = (s) => conv._ensureNotesAndRoot(s, true)?.notes?.join(' ') ?? null;

// ref:wiki-chord-notation "no3" 与 "omit3" 同义；括号只是分组；6/9 的 /9 不是低音
test('the converter treats no like omit and ignores grouping parentheses', () => {
  for (const s of ['C7omit3', 'C7 omit 3', 'C7no3', 'C7 no3', 'C7(no3)', 'C7no3rd']) assert.equal(notes(s), 'C G Bb', s);
  assert.equal(notes('C9no5'), 'C E Bb D');
  assert.equal(notes('Cm7(no5)'), 'C Eb Bb');
  assert.equal(notes('Cm7(b5)'), 'C Eb Gb Bb');
  assert.equal(notes('C6/9'), 'C E G A D');
  assert.equal(notes('Cm6/9'), 'C Eb G A D');
  assert.equal(notes('C/E'), 'C E G');
});

test('unknown chord types are rejected instead of silently becoming a major triad', () => {
  assert.equal(notes('Cxyz'), null);
  assert.equal(notes('Cm'), 'C Eb G');
});

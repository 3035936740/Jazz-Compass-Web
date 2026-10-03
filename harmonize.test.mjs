import test from 'node:test';
import assert from 'node:assert/strict';
import { harmonizeMelody, voicingEntries, chordName, vocabulary } from './harmonize.js';
import { solveVoicings } from './classical_voicing.js';

const MELODY = ['E4', 'D4', 'C4', 'D4', 'E4', 'F4', 'D4', 'C4'];

test('authentic harmonization ends V–I and puts the PAC first', () => {
  const { results } = harmonizeMelody({ melody: MELODY, key: 'C' });
  assert.ok(results.length > 0);
  for (const r of results) {
    assert.equal(r.chords.at(-1), 'I');
    assert.ok(r.chords.includes('V'));
  }
  assert.equal(results[0].cadence, 'PAC');
});

test('every chord contains its melody note', () => {
  const vocab = vocabulary('major');
  const degree = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  for (const r of harmonizeMelody({ melody: MELODY, key: 'C' }).results) {
    r.chords.forEach((roman, i) => assert.ok(vocab[roman].degrees.includes(degree[MELODY[i][0]]), `${roman} vs ${MELODY[i]}`));
  }
});

test('ii never moves to IV (OMT 2e: ii comes after IV, never before)', () => {
  const melody = ['C4', 'D4', 'F4', 'A4', 'B4', 'C5'];
  for (const r of harmonizeMelody({ melody, key: 'C', limit: 50 }).results) {
    for (let i = 1; i < r.chords.length; i++) assert.ok(!(/^ii/.test(r.chords[i - 1]) && r.chords[i] === 'IV'), r.chords.join(' '));
  }
});

test('half cadence ends on V', () => {
  const { results } = harmonizeMelody({ melody: ['C4', 'E4', 'F4', 'D4'], key: 'C', cadence: 'half' });
  assert.ok(results.length > 0);
  results.forEach((r) => { assert.equal(r.chords.at(-1), 'V'); assert.equal(r.cadence, 'HC'); });
});

test('minor keys use the raised leading tone in V and vii°', () => {
  assert.equal(chordName('A', 'V', 'minor'), 'E');
  assert.equal(chordName('A', 'vii°6', 'minor'), 'G#°/B');
  assert.equal(chordName('C', 'ii6'), 'Dm/F');
  const { results } = harmonizeMelody({ melody: ['C5', 'B4', 'A4', 'G#4', 'A4'], key: 'A', mode: 'minor' });
  assert.ok(results.length > 0);
  assert.equal(results[0].chords.at(-2), 'V');
});

test('four-part realisation keeps the melody in the soprano', () => {
  const { results } = harmonizeMelody({ melody: ['E5', 'D5', 'C5', 'B4', 'C5'], key: 'C' });
  const best = results[0];
  const solved = solveVoicings(voicingEntries({ key: 'C', mode: 'major', chords: best.chords, melody: ['E5', 'D5', 'C5', 'B4', 'C5'] }));
  assert.ok(solved.ok, solved.reason);
  assert.deepEqual(solved.voices.map((v) => v[3]), [76, 74, 72, 71, 72]);
});

test('vii° appears only in first inversion, and V6 only inside a tonic prolongation', () => {
  for (const r of harmonizeMelody({ melody: ['C5', 'B4', 'C5', 'D5', 'C5', 'B4', 'C5'], key: 'C', limit: 30 }).results) {
    assert.ok(!r.chords.includes('vii°'));
    r.chords.forEach((c, i) => { if (c === 'V6' || c === 'vii°6') assert.ok(/^I/.test(r.chords[i + 1] || ''), r.chords.join(' ')); });
  }
});

test('no harmonization puts outer voices in consecutive octaves or fifths', () => {
  const vocab = vocabulary('major');
  const melody = ['E5', 'D5', 'C5', 'D5', 'E5', 'F5', 'D5', 'C5'];
  const pc = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  for (const r of harmonizeMelody({ melody, key: 'C', limit: 40 }).results) {
    for (let i = 1; i < r.chords.length; i++) {
      const b0 = vocab[r.chords[i - 1]].degrees[vocab[r.chords[i - 1]].bass];
      const b1 = vocab[r.chords[i]].degrees[vocab[r.chords[i]].bass];
      const s0 = pc[melody[i - 1][0]], s1 = pc[melody[i][0]];
      const i0 = (s0 - b0 + 12) % 12, i1 = (s1 - b1 + 12) % 12;
      assert.ok(!(s0 !== s1 && b0 !== b1 && i0 === i1 && (i0 === 0 || i0 === 7)), r.chords.join(' '));
    }
  }
});

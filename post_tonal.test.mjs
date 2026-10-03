import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePcList, normalOrder, primeForm, intervalVector, setClassInfo, twelveToneMatrix, rowForm, COLLECTIONS, distinctTranspositions, distinctModes, transpose, invert } from './post_tonal.js';
import { SET_CLASSES } from './set_classes_data.js';

test('parsing pcs', () => {
  assert.deepEqual(parsePcList('0 4 7 t e'), [0, 4, 7, 10, 11]);
  assert.deepEqual(parsePcList('C E G Bb F#'), [0, 4, 7, 10, 6]);
});

test('Tn and In as in OMT 2e (T4[11,2,4] = [3,6,8], I8[2,4,7] = [6,4,1])', () => {
  assert.deepEqual(transpose([11, 2, 4], 4), [3, 6, 8]);
  assert.deepEqual(invert([2, 4, 7], 8).sort((a, b) => a - b), [1, 4, 6]);
});

test('normal order', () => {
  assert.deepEqual(normalOrder([7, 0, 4]), [0, 4, 7]);
  assert.deepEqual(normalOrder([11, 2, 4]), [11, 2, 4]);
  assert.deepEqual(normalOrder([0, 3, 6, 9]), [0, 3, 6, 9]);
});

test('Rahn prime forms reproduce every row of the Wikipedia table', () => {
  for (const entry of SET_CLASSES) {
    if (entry.prime.length < 2) continue;
    const a = SET_CLASSES.find((e) => e.name === entry.name.replace(/B$/, 'A')) || entry;
    assert.deepEqual(primeForm(entry.prime, 'rahn'), a.prime, entry.name);
  }
});

test('Forte prime forms reproduce the 17 footnoted alternatives', () => {
  let checked = 0;
  for (const entry of SET_CLASSES.filter((e) => /A$/.test(e.name) || !/[AB]$/.test(e.name))) {
    if (entry.prime.length < 2) continue;
    const expected = entry.fortePrime ?? entry.prime;
    assert.deepEqual(primeForm(entry.prime, 'forte'), expected, entry.name);
    if (entry.fortePrime) checked++;
  }
  assert.equal(checked, SET_CLASSES.filter((e) => e.fortePrime && !/B$/.test(e.name)).length);
});

test('interval vectors match the table', () => {
  for (const entry of SET_CLASSES) if (entry.vector) assert.deepEqual(intervalVector(entry.prime), entry.vector, entry.name);
});

test('set-class info: Forte number, A/B, Z partner, complement', () => {
  const minor = setClassInfo([9, 0, 4]);
  assert.equal(minor.forte, '3-11');
  assert.equal(minor.tnType, 'A');
  assert.equal(setClassInfo([0, 4, 7]).tnType, 'B');
  const allInterval = setClassInfo([0, 1, 4, 6]);
  assert.equal(allInterval.forte, '4-Z15');
  assert.equal(allInterval.zPartner, '4-Z29');
  assert.equal(setClassInfo([0, 2, 4, 5, 7, 9, 11]).forte, '7-35');
  assert.equal(setClassInfo([0, 2, 4, 5, 7, 9, 11]).complement, '5-35');
});

test('Messiaen modes have the stated transpositions and modes (Wikipedia)', () => {
  for (const c of COLLECTIONS.filter((c) => c.transpositions)) {
    assert.equal(distinctTranspositions(c.steps), c.transpositions, c.id);
    assert.equal(distinctModes(c.steps), c.modes, c.id);
  }
  assert.equal(distinctTranspositions([1, 2, 1, 2, 1, 2, 1, 2]), 3);
  assert.equal(distinctTranspositions([1, 3, 1, 3, 1, 3]), 4);
});

test('twelve-tone matrix is a Latin square with P on the rows and I on the columns', () => {
  const row = [0, 11, 7, 8, 3, 1, 2, 10, 6, 5, 4, 9];
  const { matrix, rowLabels, columnLabels } = twelveToneMatrix(row, 'fixed');
  matrix.forEach((r) => assert.equal(new Set(r).size, 12));
  for (let c = 0; c < 12; c++) assert.equal(new Set(matrix.map((r) => r[c])).size, 12);
  assert.equal(rowLabels[0].p, 'P0');
  assert.deepEqual(rowForm(row, 'P0'), row);
  assert.deepEqual(rowForm(row, 'I0'), row.map((pc) => (12 - pc) % 12));
  assert.deepEqual(rowForm(row, 'R0'), [...row].reverse());
  assert.equal(columnLabels[1].i, 'I11');
  const moveable = twelveToneMatrix([5, ...row.slice(1).map((pc) => (pc + 5) % 12)], 'moveable');
  assert.equal(moveable.rowLabels[0].p, 'P0');
});

// ref:wiki-tone-rows
test('Webern Op. 24 row: trichords are all 3-3 and hexachords 6-20 (as listed on Wikipedia)', () => {
  const row = [0, 11, 3, 4, 8, 7, 9, 5, 6, 1, 2, 10];
  for (let i = 0; i < 12; i += 3) assert.equal(setClassInfo(row.slice(i, i + 3)).forte, '3-3');
  assert.equal(setClassInfo(row.slice(0, 6)).forte, '6-20');
  assert.equal(setClassInfo(row.slice(6)).forte, '6-20');
  assert.equal(setClassInfo([0, 3, 2, 1, 5, 4]).forte, '6-1'); // Op. 21 hexachord
});

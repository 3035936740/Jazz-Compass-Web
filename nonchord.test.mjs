import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeEmbellishingTones, findPedalPoints, metricWeight, EXAMPLES } from './nonchord.js';

test('metric weights in 4/4', () => {
  assert.deepEqual([0, 1, 2, 3, 0.5, 4].map((t) => metricWeight(t)), [3, 1, 2, 1, 0, 3]);
});

for (const [type, example] of Object.entries(EXAMPLES)) {
  if (type === 'PED') continue;
  test(`gallery example classifies as ${type}`, () => {
    const result = analyzeEmbellishingTones(example.melody, example.chords);
    assert.equal(result[example.target].type, type, JSON.stringify(result));
  });
}

test('double neighbour marks both embellishing tones', () => {
  const r = analyzeEmbellishingTones(EXAMPLES.DN.melody, EXAMPLES.DN.chords);
  assert.deepEqual(r.map((n) => n.type), ['CT', 'DN', 'DN', 'CT']);
});

test('pedal point under changing harmonies', () => {
  const { bass, chords } = EXAMPLES.PED;
  assert.deepEqual(findPedalPoints(bass.map((p) => ({ p })), chords), [{ from: 0, to: 3, pitch: 'C3' }]);
});

test('leap in and leap out stays unclassified', () => {
  const r = analyzeEmbellishingTones([{ p: 'C4', d: 1 }, { p: 'F4', d: 1 }, { p: 'C4', d: 2 }], [{ start: 0, pcs: [0, 4, 7] }]);
  assert.equal(r[1].type, 'unclassified');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTemperament, majorThirds, PURE_MAJOR_THIRD, frequencyOf } from './temperaments.js';

const near = (a, b, tol = 0.01) => Math.abs(a - b) <= tol;
const byName = (cents) => Object.fromEntries(['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'].map((n, i) => [n, cents[i]]));

// ref:wiki-werckmeister —— 条目表格中 Werckmeister III 各音相对 C 的音分
test('Werckmeister III matches the Wikipedia table', () => {
  const c = byName(buildTemperament('werckmeister3').cents);
  const table = { 'C#': 90.225, D: 192.180, Eb: 294.135, E: 390.225, F: 498.045, 'F#': 588.270, G: 696.090, 'G#': 792.180, A: 888.270, Bb: 996.090, B: 1092.180 };
  for (const [note, value] of Object.entries(table)) assert.ok(near(c[note], value), `${note}: ${c[note]} vs ${value}`);
});

// ref:wiki-pythagorean —— 条目表格以 D 为基准列出各音程大小；这里按音程类型对照 C 上的 E♭–G# 五度链：
// M2 203.91、m3 294.13、M3 407.82、P4 498.04、A4 611.73、P5 701.96、M6 905.87、m7 996.09、M7 1109.78；
// A1 = 2187/2048（条目正文，113.685），A5 = 3^8/2^12 ≈ 815.64
test('Pythagorean tuning matches the Wikipedia interval sizes', () => {
  const c = byName(buildTemperament('pythagorean').cents);
  const table = { D: 203.91, Eb: 294.13, E: 407.82, F: 498.04, 'F#': 611.73, G: 701.96, A: 905.87, Bb: 996.09, B: 1109.78, 'C#': 113.685, 'G#': 1200 * Math.log2(6561 / 4096) };
  for (const [note, value] of Object.entries(table)) assert.ok(near(c[note], value, 0.01), `${note}: ${c[note]} vs ${value}`);
});

// ref:wiki-meantone —— 四个五度 C G D A E 得到纯大三度；狼五度在 G#–E♭
test('quarter-comma meantone gives a pure C–E and puts the wolf at G#–Eb', () => {
  const t = buildTemperament('meantone');
  assert.ok(near(t.cents[4], PURE_MAJOR_THIRD, 1e-6));
  const wolf = t.fifths.at(-1);
  assert.deepEqual([wolf.from, wolf.to], ['G#', 'Eb']);
  assert.ok(wolf.size > 735 && wolf.size < 740, String(wolf.size));
});

test('Vallotti: six narrowed fifths, six pure, closing the circle exactly', () => {
  const t = buildTemperament('vallotti');
  const pure = t.fifths.filter((f) => near(f.size, 701.955, 0.001)).length;
  assert.equal(pure, 6);
  assert.ok(near(t.fifths.at(-1).size, 701.955, 0.001));
});

test('equal temperament thirds are 400 cents; A4 calibrates to 440 Hz', () => {
  majorThirds(buildTemperament('equal').cents).forEach((m) => assert.ok(near(m.size, 400)));
  assert.ok(near(frequencyOf(buildTemperament('meantone').cents, 9, 4), 440, 1e-9));
});

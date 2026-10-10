// 答对的声音：每次在 C4–C6 之间随机找一个高度，整体移调，音程（包括纯律比例）不变
import test from 'node:test';
import assert from 'node:assert/strict';
import { randomRegister, rightSoundNotes, hzToMidi, RIGHT_LOW, RIGHT_HIGH } from './learn_sfx.js';
import { CAST } from './learn_bosses.js';

const within = (midis) => midis.every((m) => m >= RIGHT_LOW - 1e-9 && m <= RIGHT_HIGH + 1e-9);

test('the right-answer sound is a root-position major triad placed at a random height inside C4–C6', () => {
  const seen = new Set();
  for (let i = 0; i < 200; i += 1) {
    const [a, b, c] = rightSoundNotes();
    assert.deepEqual([b - a, c - a], [4, 7]);
    assert.ok(within([a, b, c]), `${a} ${b} ${c}`);
    seen.add(a);
  }
  assert.ok(seen.size > 8, 'the height really varies');
  assert.deepEqual(rightSoundNotes(() => 0), [60, 64, 67]);
  assert.deepEqual(rightSoundNotes(() => 0.9999), [77, 81, 84]);
});

test('every boss’s right-answer sounds (hit, streak) stay inside C4–C6 with their intervals intact', () => {
  Object.entries(CAST).forEach(([id, cast]) => ['hit', 'streak'].forEach((name) => {
    const steps = cast.sfx[name].map((s) => (Array.isArray(s) ? s : s.hz.map(hzToMidi)));
    for (const r of [0, 0.25, 0.5, 0.75, 0.9999]) {
      const out = randomRegister(steps, { rng: () => r });
      out.forEach((step, i) => {
        assert.ok(within(step), `${id} ${name}: ${step}`);
        const shift = step[0] - steps[i][0];
        step.forEach((m, j) => assert.ok(Math.abs(m - steps[i][j] - shift) < 1e-9, `${id} ${name}: interval kept`));
        assert.ok(Math.abs(shift - Math.round(shift)) < 1e-9, 'whole-semitone shift');
      });
    }
  }));
});

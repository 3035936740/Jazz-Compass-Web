import test from 'node:test';
import assert from 'node:assert/strict';
import { UNITS, SIDES, SECTIONS } from './learn_content.js';
import { B_CHAPTERS } from './sideb_content.js';
import { STEP_DEMOS, SHARED_DEMO_CARDS, guideDemoForStep, withStepDemos } from './learn_guide_demos.js';
import { guideDemoEvents, guideDemoPreviewNotes, createGuidePlayback } from './learn_guide_audio.js';

const guide = (id, branch = 0) => {
  const unit = [...UNITS, ...SIDES].find((u) => u.id === id);
  return (branch ? unit.branch[branch - 1] : unit).cards.find((c) => c.type === 'guide');
};

test('every existing listenable guide has an audited audio entry for every teaching step', () => {
  const seen = new Set();
  for (const u of [...UNITS, ...SIDES]) for (const [b, level] of [u, ...u.branch].entries()) {
    level.cards.forEach((card, i) => {
      if (card.type !== 'guide' || !card.demo?.play) return;
      const key = `${u.id}${b ? `:${b}` : ''}#${i}`;
      seen.add(key);
      assert.equal(card.stepDemos.length, card.steps.length, key);
      card.stepDemos.forEach((demo, step) => {
        if (!demo) return;
        const events = guideDemoEvents(demo);
        assert.ok(events.length, `${key} step ${step}`);
        events.forEach((event) => {
          assert.ok(Number.isFinite(event.at) && event.at >= 0 && Number.isFinite(event.duration) && event.duration > 0, key);
          assert.ok(event.notes.length && event.notes.every((n) => Number.isFinite(n) && n >= 21 && n <= 108), key);
        });
        if (demo.beats) assert.equal(demo.beats.length, demo.play.length, key);
        if (demo.caption) for (const lang of ['zh', 'ja', 'en']) assert.ok(demo.caption[lang], key);
      });
    });
  }
  assert.equal(seen.size, 160);
  assert.deepEqual(new Set([...Object.keys(STEP_DEMOS), ...SHARED_DEMO_CARDS]), seen);
});

test('texture switches from melody variants to coordinated chords and independently timed voices', () => {
  const card = guide('texture');
  const upper = guideDemoEvents(guideDemoForStep(card, 1));
  const lower = guideDemoEvents(guideDemoForStep(card, 2));
  assert.notDeepEqual(lower, upper);
  assert.ok(upper.every((e) => e.notes.length === 1));
  assert.ok(upper.some((e, i) => i && e.at === upper[i - 1].at), 'heterophonic variants overlap');
  assert.equal(lower[0].notes.length, 4, 'homophony starts with a coordinated four-note chord');
  const independent = lower.filter((e) => e.notes.length === 1);
  assert.ok(independent.length > 8 && new Set(independent.map((e) => e.duration)).size > 1, 'polyphony uses independent rhythms');
});

test('scale, cadence and configuration examples follow the currently explained concept', () => {
  assert.ok(guideDemoForStep(guide('minor'), 2).events.some((e) => e.notes.includes(68)), 'raised leading tone');
  assert.ok(guideDemoForStep(guide('bluesscale'), 1).play.some((n) => n[0] === 64), 'major blues has E');
  assert.deepEqual(guideDemoForStep(guide('cadences'), 2).play.at(-1), [43, 59, 62], 'half cadence stops on V');
  assert.deepEqual(guideDemoForStep(guide('chordplus'), 1).play[0], [60, 64, 67, 74], 'add9 actually sounds D');
  assert.deepEqual(guideDemoForStep(guide('chordplus'), 2).play[0], [60, 64, 67, 69], 'sixth actually sounds A');
  assert.equal(guideDemoForStep(guide('sixfour', 1), 1).play[0][0], 53, 'ii6 starts on F');
  assert.equal(guideDemoForStep(guide('schemas2', 3), 1).play[1][0], 51, 'tritone substitution uses E-flat');
  assert.deepEqual(guideDemoForStep(guide('motif', 2), 1).events.slice(-3).map((e) => e.notes[0]), [64, 62, 60], 'retrograde is reversed');
});

test('rhythm, swing, ties and canon have real durations and delayed voice entry', () => {
  const values = guideDemoEvents(guideDemoForStep(guide('rhythm'), 1));
  assert.deepEqual(values.slice(1).map((e, i) => Number((e.duration / values[i].duration).toFixed(4))), [0.5, 0.5, 0.5, 0.5]);
  const tied = guideDemoEvents(guideDemoForStep(guide('rhythm'), 3));
  assert.equal(tied.length, 2, 'tied halves have one attack, not two');
  assert.equal(Math.round(tied[1].duration / (60000 / 100) / 0.94 * 1000), 4);
  const swing = guideDemoEvents(guideDemoForStep(guide('swing', 2), 0));
  assert.equal(Math.round(swing[0].duration / swing[1].duration), 2);
  const canon = guideDemoEvents(guideDemoForStep(guide('canon'), 0));
  assert.equal(canon.find((e) => e.notes[0] === 60).at, 1000, 'follower enters two beats later at 120 BPM');
});

function fakeClock() {
  let now = 0, id = 0;
  const pending = new Map();
  return {
    setTimer(fn, delay) { const token = ++id; pending.set(token, { fn, at: now + delay }); return token; },
    clearTimer(token) { pending.delete(token); },
    tick(ms) {
      const end = now + ms;
      while (true) {
        const next = [...pending].filter(([, p]) => p.at <= end).sort((a, b) => a[1].at - b[1].at || a[0] - b[0])[0];
        if (!next) break;
        now = next[1].at; pending.delete(next[0]); next[1].fn();
      }
      now = end;
    },
  };
}

test('switching an active guide cancels old queued notes, silences tails and starts the current example', () => {
  const clock = fakeClock(), calls = [];
  let silences = 0;
  const player = createGuidePlayback({ ...clock, playChord: (notes, duration, options) => calls.push({ notes, options }), stopAudio: () => { silences++; } });
  player.setDemo({ play: [[60], [61], [62]] });
  clock.tick(1000);
  assert.equal(calls.length, 0, 'revealing without playback stays quiet');
  player.play(); clock.tick(0);
  const before = silences;
  player.setDemo({ play: [[72], [74]] }); clock.tick(2000);
  assert.ok(silences > before);
  assert.deepEqual(calls.map((c) => Math.round(69 + 12 * Math.log2(c.notes[0] / 440))), [60, 72, 74]);
  assert.deepEqual(calls.map((c) => c.options.interrupt), [true, true, false]);
  player.setDemo(null); player.play(); clock.tick(3000);
  assert.equal(calls.length, 3, 'a step without an example cannot replay stale audio');
  player.setDemo({ play: [[50], [52]] }); player.play(); clock.tick(0); player.stop(); clock.tick(5000);
  assert.equal(calls.length, 4, 'leaving the lesson cancels subsequent notes');
});

test('old card snapshots use updated audio without losing the shown step', () => {
  const card = guide('texture');
  const saved = JSON.parse(JSON.stringify({ ...card, stepDemos: undefined }));
  const restored = withStepDemos(saved, 'texture#0');
  assert.deepEqual(guideDemoForStep(restored, 2), guideDemoForStep(card, 2));
});

test('triad keyboard follows C major, the silent gap and C minor, then keeps the last chord for comparison', () => {
  const clock = fakeClock(), frames = [], sounding = [];
  const player = createGuidePlayback({ ...clock, stopAudio() {},
    onNotesChange: (notes, state) => frames.push({ notes, ...state }),
    playChord: (frequencies) => sounding.push(frequencies.map((f) => Math.round(69 + 12 * Math.log2(f / 440)))),
  });
  player.setDemo(guideDemoForStep(guide('triads'), 1));
  player.play(); clock.tick(0);
  assert.deepEqual(frames.at(-1), { notes: [60, 64, 67], playing: true });
  clock.tick(760);
  assert.deepEqual(frames.at(-1), { notes: [], playing: true }, 'no stale E during silence');
  clock.tick(60);
  assert.deepEqual(frames.at(-1), { notes: [60, 63, 67], playing: true }, 'E is replaced by E-flat');
  assert.deepEqual(sounding, [[60, 64, 67], [60, 63, 67]], 'the display matches the actual sound');
  clock.tick(760);
  assert.deepEqual(frames.at(-1), { notes: [60, 63, 67], playing: false });
  player.stop(); clock.tick(5000);
  assert.deepEqual(frames.at(-1), { notes: [], playing: false });
});

test('idle keyboard preview reflects the current step instead of the original fixed keys', () => {
  const card = guide('triads');
  assert.deepEqual(guideDemoPreviewNotes(guideDemoForStep(card, 0)), [60, 64, 67]);
  assert.deepEqual(guideDemoPreviewNotes(guideDemoForStep(card, 1)), [60, 63, 67], 'the comparison step previews the minor chord before playing');
  assert.deepEqual(guideDemoPreviewNotes({ play: [[60], [], [63], [67], [60]], keys: [60, 64, 67] }), [60, 63, 67], 'rests are excluded and a melodic example shows its actual notes');
  assert.deepEqual(guideDemoPreviewNotes(null), []);
});

test('overlapping voices keep shared notes lit until both end and step changes cancel all old highlights', () => {
  const clock = fakeClock(), frames = [];
  const player = createGuidePlayback({ ...clock, playChord() {}, stopAudio() {}, onNotesChange: (notes) => frames.push(notes) });
  player.setDemo({ bpm: 60, events: [
    { at: 0, notes: [60], beats: 2 },
    { at: 0.5, notes: [60, 63], beats: 0.5 },
    { at: 3, notes: [67], beats: 1 },
  ] });
  player.play(); clock.tick(500);
  assert.deepEqual(frames.at(-1), [60, 63]);
  clock.tick(470);
  assert.deepEqual(frames.at(-1), [60], 'short voice ends while the shared C continues');
  player.setDemo({ play: [[72]] }); clock.tick(0);
  assert.deepEqual(frames.at(-1), [72]);
  clock.tick(5000);
  assert.deepEqual(frames.at(-1), [72], 'old voice releases and queued G cannot change the new preview');
});

test('chapter three is named Melody & voices on both sides', () => {
  assert.equal(SECTIONS[2].title.zh, '旋律与声部');
  assert.equal(B_CHAPTERS[2].short.zh, '旋律与声部');
});

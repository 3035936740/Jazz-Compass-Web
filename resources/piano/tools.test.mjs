import test from 'node:test';
import assert from 'node:assert/strict';
import { keyInfo, parseMotif, TRANSFORMS, buildPhrase, expandPhrase, phraseBars, spellNote, contour } from './motif_phrase.js';
import { polyrhythm, alignment, metricModulation, PRESETS } from './poly_meter.js';
import { buildCanon, checkCanon } from './canon.js';
import { rhythmQuestion, progressionQuestion, compare, compareRhythm, dotGrid, melodyQuestion, compareMelody } from './dictation.js';
import { reharmonize, fromClassical, MELODIES } from './reharm.js';

const C = keyInfo('C');
const names = (notes, key = C) => notes.map((n) => (n.rest ? 'r' : spellNote(n.midi, key))).join(' ');

test('motif transformations follow OMT’s list', () => {
  const m = parseMotif('C4:q D4:q E4:q C4:q');
  assert.equal(names(TRANSFORMS.sequence(m, C, 1)), 'D4 E4 F4 D4');
  assert.equal(names(TRANSFORMS.inversion(m, C)), 'C4 B3 A3 C4');
  assert.equal(names(TRANSFORMS.retrograde(m)), 'C4 E4 D4 C4');
  assert.deepEqual(TRANSFORMS.augmentation(m).map((n) => n.beats), [2, 2, 2, 2]);
  assert.deepEqual(TRANSFORMS.diminution(m).map((n) => n.beats), [0.5, 0.5, 0.5, 0.5]);
  assert.ok(TRANSFORMS.displacement(m, C)[0].rest);
  assert.deepEqual(contour(TRANSFORMS.sequence(m, C, 3), C), contour(m, C), 'a sequence keeps the contour');
  assert.equal(names(TRANSFORMS.embellish(m, C)), 'C4 D4 E4 D4 C4', 'a passing tone fills the third E–C');
  assert.equal(names(TRANSFORMS.inversion(parseMotif('A4 B4 C5 E5'), keyInfo('A', 'minor')), keyInfo('A', 'minor')), 'A4 G4 F4 D4');
  assert.equal(parseMotif('X9'), null);
});

test('sentence and period are built from the motif and end with the right cadences', () => {
  const m = parseMotif('E4:q G4:q E4:q C4:q');
  const s = buildPhrase(m, { type: 'sentence', key: C });
  assert.deepEqual(s.units.map((u) => u.id), ['bi', 'rep', 'frag', 'cad']);
  assert.equal(s.units.at(-1).cadence, 'PAC');
  assert.equal(spellNote(s.units.at(-1).notes.at(-1).midi, C).slice(0, 1), 'C', 'the cadence lands on do');
  const p = buildPhrase(m, { type: 'period', key: C });
  assert.deepEqual(p.units.map((u) => u.cadence || ''), ['', 'HC', '', 'PAC']);
  assert.equal(names(p.units[0].notes), names(p.units[2].notes), 'both phrases begin with the same basic idea');
  ['repetition', 'stretch', 'omt', 'suffix'].forEach((x) => assert.ok(phraseBars(expandPhrase(s, x)) > phraseBars(s), `${x} makes the phrase longer`));
  assert.ok(expandPhrase(s, 'omt').units.some((u) => u.cadence === 'evaded'));
});

test('polyrhythm grids and metric modulation formula', () => {
  const r = polyrhythm(3, 2);
  assert.equal(r.grid, 6);
  assert.deepEqual(r.tracks.map((x) => x.positions), [[0, 2, 4], [0, 3]]);
  assert.equal(alignment(3, 4).filter((c) => c.a && c.b).length, 1, '3:4 meet only on the downbeat');
  assert.equal(polyrhythm(3, 2, { muted: [true, false] }).events.length, 2, 'a muted track is silent');
  const tempo = (id, old) => metricModulation({ oldTempo: old, ...PRESETS.find((p) => p.id === id) }).newTempo;
  assert.equal(tempo('keepSub', 120), 80, '4/4 eighth = 6/8 eighth: dotted quarter = 80');
  assert.equal(tempo('keepBeat', 120), 120, 'quarter = dotted quarter keeps the beat');
  assert.equal(tempo('wiki', 84), 126, 'the worked example from Wikipedia');
});

test('canon: a round at the unison passes, a tight entry is flagged; inversion mirrors', () => {
  const fj = parseMotif('C4 D4 E4 C4 C4 D4 E4 C4 E4 F4 G4:h E4 F4 G4:h');
  assert.equal(checkCanon(buildCanon(fj, { key: C, delay: 8, steps: 0 })).issues.filter((i) => i.severity === 'error').length, 0);
  assert.ok(checkCanon(buildCanon(fj, { key: C, delay: 1, steps: -7 })).issues.some((i) => i.rule === 'dissonance'));
  assert.equal(names(buildCanon(parseMotif('C4 D4 E4 F4'), { key: C, delay: 1, steps: 0, type: 'inversion' }).parts[1].notes), 'C4 B3 A3 G3');
  assert.equal(names(buildCanon(parseMotif('B4 C5'), { key: C, delay: 1, steps: 4, type: 'strict' }).parts[1].notes), 'F#5 G5', 'strict keeps exact semitones');
  assert.equal(names(buildCanon(parseMotif('B4 C5'), { key: C, delay: 1, steps: 4 }).parts[1].notes), 'F5 G5', 'free canon stays in the scale');
});

test('dictation questions fill their bars and grading compares by position', () => {
  for (let i = 0; i < 20; i += 1) {
    const r = rhythmQuestion({ level: 1 + (i % 3), bars: 2 });
    assert.equal(r.reduce((s, n) => s + n.beats, 0), 8);
    const p = progressionQuestion({ length: 4 + (i % 3) });
    assert.equal(p.chords[0], 'I');
    assert.ok(!p.chords.join(' ').includes('ii IV'), 'ii never comes before IV');
  }
  assert.equal(compare(['I', 'IV'], ['I', 'ii']).right, 1);
  const cr = compareRhythm([{ beats: 1 }, { beats: 1 }, { beats: 2 }], [{ beats: 1 }, { beats: 0.5 }, { beats: 0.5 }, { beats: 2 }]);
  assert.deepEqual(cr.missing, [1.5]);
  assert.equal(dotGrid([{ beats: 1 }, { beats: 0.5, rest: true }], { unit: 0.5 }).map((c) => c.mark).join(''), '/-o');
});

test('reharmonization: classical uses chord tones; jazz substitutions never create clashes; blues uses dominant sevenths', () => {
  assert.deepEqual(fromClassical('ii6'), { degree: 2, alter: 0, quality: 'min', bass: 1 });
  MELODIES.forEach((m) => {
    const r = reharmonize({ melody: m.notes });
    assert.ok(r.classical.ok, m.id);
    assert.ok(r.classical.roles.every((x) => x.role === 'chord'), `${m.id}: classical melody notes are chord tones`);
    assert.ok(r.jazz.roles.every((x) => x.role !== 'clash'), `${m.id}: jazz keeps the melody consonant or as tensions`);
    assert.ok(r.blues.symbols.every((s) => /7$/.test(s) && !/maj7/.test(s)), `${m.id}: blues chords are dominant sevenths`);
    assert.equal(r.blues.symbols[0], 'C7');
  });
});

test('melodic dictation: rhythm + pitch, ends re/ti → do on a half note, graded by onset', () => {
  let seed = 7; const rng = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (const level of [1, 2, 3]) {
    for (let i = 0; i < 20; i += 1) {
      const q = melodyQuestion({ level, key: keyInfo('F'), rng });
      const total = q.reduce((s, n) => s + n.beats, 0);
      assert.equal(total, level === 3 ? 16 : 8, 'whole bars of 4/4');
      const pitched = q.filter((n) => !n.rest);
      assert.equal(pitched.at(-1).step, 0); assert.equal(q.at(-1).value, 'h');
      assert.ok([1, -1].includes(pitched.at(-2).step), 're or ti before the final do');
      assert.ok([0, 2, 4].includes(pitched[0].step), 'starts on do, mi or sol');
      if (level === 1) assert.ok(q.every((n) => !n.rest && n.value !== 'e'), 'level 1 has no rests or eighths');
      assert.ok(pitched.every((n) => n.midi === keyInfo('F').pc + 60 + [0, 2, 4, 5, 7, 9, 11][((n.step % 7) + 7) % 7] + Math.floor(n.step / 7) * 12));
    }
  }
  const q = [{ value: 'q', beats: 1, midi: 60 }, { value: 'q', beats: 1, rest: true }, { value: 'h', beats: 2, midi: 62 }];
  assert.equal(compareMelody(q, q).perfect, true);
  const wrongPitch = compareMelody([q[0], q[1], { ...q[2], midi: 64 }], q);
  assert.deepEqual(wrongPitch.marks.map((m) => [m.rhythmOk, m.pitchOk]), [[true, true], [true, false]]);
  const shifted = compareMelody([{ value: 'h', beats: 2, midi: 60 }, { value: 'h', beats: 2, midi: 62 }], q);
  assert.equal(shifted.marks[0].rhythmOk, false, 'held too long');
  assert.equal(shifted.marks[1].pitchOk, true, 'later notes still line up by onset');
});

test('progression ID quiz draws distinct options from the library', async () => {
  const { quizPool, quizQuestion, bassLine } = await import('./prog_quiz.js');
  const { parseRoman } = await import('./prog_library.js');
  const sizes = [1, 2, 3].map((l) => quizPool(l).length);
  assert.ok(sizes[0] >= 12 && sizes[0] < sizes[1] && sizes[1] <= sizes[2], `pool sizes ${sizes}`);
  assert.ok(quizPool(1).every((e) => e.kind === 'loop' && e.chords.length === 4 && !e.hasSeventh));
  let seed = 3; const rng = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 60; i += 1) {
    const kind = i % 2 ? 'bass' : 'schema';
    const q = quizQuestion({ level: 1 + (i % 3), kind, rng });
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4, 'options are distinct');
    assert.equal(q.options[0], kind === 'bass' ? bassLine(q.entry.chords) : q.entry.romanText);
  }
  // 卡农的低音线：转位让低音级进下行
  assert.equal(bassLine('I V/3 vi iii/3 IV I/3 ii V'.split(' ').map(parseRoman)), '1 7 6 5 4 3 2 5');
});

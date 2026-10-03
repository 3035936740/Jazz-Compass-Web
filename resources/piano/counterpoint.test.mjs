import test from 'node:test';
import assert from 'node:assert/strict';
import { checkCounterpoint, checkCantus, harmonicClass, isMelodicConsonance, parseCounterpointText } from './counterpoint.js';
import { intervalBetween } from './pitch_spelling.js';
import { FUX_TWO_VOICE } from './fux_species_data.js';

const DORIAN_CF = ['D4', 'F4', 'E4', 'D4', 'G4', 'F4', 'A4', 'G4', 'F4', 'E4', 'D4'];
const rules = (result, severity = 'error') => result.issues.filter((i) => i.severity === severity).map((i) => i.rule);
const run = (species, text, position = 'above', cantus = DORIAN_CF) => checkCounterpoint({ species, cantus, bars: parseCounterpointText(text, species), position });

test('interval classes follow OMT: P4 is a harmonic dissonance, sevenths are melodic dissonances', () => {
  assert.equal(harmonicClass(intervalBetween('C4', 'F4')), 'dissonant');
  assert.equal(harmonicClass(intervalBetween('C4', 'G4')), 'perfect');
  assert.equal(harmonicClass(intervalBetween('C4', 'A4')), 'imperfect');
  assert.equal(isMelodicConsonance(intervalBetween('C4', 'B4')), false);
  assert.equal(isMelodicConsonance(intervalBetween('C4', 'F#4')), false);
  assert.equal(isMelodicConsonance(intervalBetween('C4', 'A4')), true);
});

test("Fux's first-species model (fig. 5) passes", () => {
  const r = run(1, 'A4 | A4 | G4 | A4 | B4 | C5 | C5 | B4 | D5 | C#5 | D5');
  assert.deepEqual(rules(r), []);
});

test('parallel fifths and direct octaves are caught', () => {
  const parallel = run(1, 'A4 | C5 | B4 | A4 | D5 | C5 | C5 | B4 | D5 | C#5 | D5');
  assert.ok(rules(parallel).includes('parallel-perfect'));
  const direct = checkCounterpoint({ species: 1, cantus: ['C4', 'D4', 'C4'], bars: [[{ p: 'G4', d: 4 }], [{ p: 'D5', d: 4 }], [{ p: 'C5', d: 4 }]], position: 'above' });
  assert.ok(rules(direct).includes('direct-perfect'));
});

test('second species: passing dissonance allowed, other weak dissonances not', () => {
  // 第 2 小节 B4（对 F4 增四度）、第 7 小节 D5（对 A4 纯四度）都是级进经过音
  const ok = run(2, 'r A4 | A4 B4 | C5 B4 | A4 B4 | B4 D5 | C5 A4 | C5 D5 | E5 D5 | D5 A4 | C#5 | D5');
  assert.deepEqual(rules(ok), [], JSON.stringify(ok.issues));
  // 把经过音换成跳进进入的不协和音
  const bad = run(2, 'r A4 | A4 G4 | C5 B4 | A4 B4 | B4 D5 | C5 A4 | C5 D5 | E5 D5 | D5 A4 | C#5 | D5');
  assert.ok(rules(bad).includes('weak-not-passing'));
});

test('third species accepts a nota cambiata', () => {
  // 第 2 小节 D5 C5 A4 B4 → 第 3 小节 C5：下行换音（级进下行到不协和的 C5，三度跳进到协和的 A4，再两次级进上行）
  const r = checkCounterpoint({ species: 3, cantus: ['A3', 'D4', 'E4', 'A3'], position: 'above', bars: [
    [{ p: 'E4', d: 1 }, { p: 'F4', d: 1 }, { p: 'G4', d: 1 }, { p: 'A4', d: 1 }],
    [{ p: 'D5', d: 1 }, { p: 'C5', d: 1 }, { p: 'A4', d: 1 }, { p: 'B4', d: 1 }],
    [{ p: 'C5', d: 1 }, { p: 'B4', d: 1 }, { p: 'A4', d: 1 }, { p: 'G#4', d: 1 }],
    [{ p: 'A4', d: 4 }],
  ] });
  assert.ok(!rules(r).includes('weak-unexplained'), JSON.stringify(r.issues));
  // 同一位置若第 3 音不协和，就不再是换音
  const broken = checkCounterpoint({ species: 3, cantus: ['A3', 'D4', 'E4', 'A3'], position: 'above', bars: [
    [{ p: 'E4', d: 1 }, { p: 'F4', d: 1 }, { p: 'G4', d: 1 }, { p: 'A4', d: 1 }],
    [{ p: 'D5', d: 1 }, { p: 'C5', d: 1 }, { p: 'G4', d: 1 }, { p: 'B4', d: 1 }],
    [{ p: 'C5', d: 1 }, { p: 'B4', d: 1 }, { p: 'A4', d: 1 }, { p: 'G#4', d: 1 }],
    [{ p: 'A4', d: 4 }],
  ] });
  assert.ok(rules(broken).includes('weak-unexplained'));
});

test('fourth species: unprepared or upward-resolving suspensions are errors', () => {
  const r = checkCounterpoint({ species: 4, cantus: ['D4', 'F4', 'E4', 'D4'], position: 'above', bars: [
    [{ p: null, d: 2 }, { p: 'A4', d: 2 }],
    [{ p: 'E5', d: 2 }, { p: 'D5', d: 2 }],
    [{ p: 'D5', d: 2, tieIn: true }, { p: 'C#5', d: 2 }],
    [{ p: 'D5', d: 4 }],
  ] });
  assert.ok(rules(r).includes('suspension-preparation'));
});

test('fifth species: eighth notes must come in pairs on weak quarters', () => {
  const r = checkCounterpoint({ species: 5, cantus: ['D4', 'E4', 'D4'], position: 'above', bars: [
    [{ p: 'A4', d: 4 }],
    [{ p: 'G4', d: 0.5 }, { p: 'A4', d: 0.5 }, { p: 'B4', d: 1 }, { p: 'C#5', d: 2 }],
    [{ p: 'D5', d: 4 }],
  ] });
  assert.ok(rules(r).includes('eighth-placement'));
});

test('cantus firmus rules (OMT)', () => {
  assert.deepEqual(checkCantus(DORIAN_CF), []);
  const bad = checkCantus(['D4', 'A4', 'B4', 'D4']);
  assert.ok(bad.some((i) => i.rule === 'cf-length'));
});

test('regression: flags on Fux\'s own two-voice solutions stay limited to the documented cases', () => {
  const flagged = [];
  for (const ex of FUX_TWO_VOICE) {
    const r = checkCounterpoint({ species: ex.species, cantus: ex.bars.map((b) => b.cf), bars: ex.bars.map((b) => b.cp), position: ex.cantus === 'lower' ? 'above' : 'below' });
    if (rules(r).length) flagged.push(`${ex.figure}/${ex.species}${ex.cantus[0]}`);
  }
  // 22：数据集中的疑似八度问题；36 38 40 41 42 43：OMT 第二类规则比 Fux 更严；86a：强拍七度前同音未连线
  assert.deepEqual(flagged, ['22/1l', '36/2l', '38/2l', '40/2l', '41/2u', '42/2l', '43/2u', '86a/5l']);
});

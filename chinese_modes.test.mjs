import test from 'node:test';
import assert from 'node:assert/strict';
import { spellAbove, parseNote } from './pitch_spelling.js';
import { buildChineseMode, gongForTonic, sameGongSystem, jieMingNote, modeName, identifyChineseMode, rotateGong, luName, scaleJieMing } from './chinese_modes.js';

const names = (mode) => mode.notes.map((n) => n.note).join(' ');

test('spelling follows letter steps', () => {
  assert.equal(spellAbove('C', 3, 6), 'F#');
  assert.equal(spellAbove('C', 4, 6), 'Gb');
  assert.equal(spellAbove('Eb', 6, 10), 'Db');
  assert.equal(spellAbove('F#', 2, 4), 'A#');
  assert.equal(parseNote('B♭').pc, 10);
});

test('pian yin positions in C gong (SCCM / tcpc: 清角 fa, 变徵 #fa, 闰 bsi, 变宫 si)', () => {
  assert.equal(jieMingNote('C', 'qingjue'), 'F');
  assert.equal(jieMingNote('C', 'bianzhi'), 'F#');
  assert.equal(jieMingNote('C', 'run'), 'Bb');
  assert.equal(jieMingNote('C', 'biangong'), 'B');
});

test('three seven-tone scales (zh.wikipedia 七声调式)', () => {
  assert.equal(names(buildChineseMode({ gong: 'C', mode: 'gong', type: 'qingyue' })), 'C D E F G A B');
  assert.equal(names(buildChineseMode({ gong: 'C', mode: 'gong', type: 'yayue' })), 'C D E F# G A B');
  assert.equal(names(buildChineseMode({ gong: 'C', mode: 'gong', type: 'yanyue' })), 'C D E F G A Bb');
});

test('same-gong system: C gong gives C宫 D商 E角 G徵 A羽', () => {
  assert.deepEqual(sameGongSystem('C').map((m) => m.name), ['C 宫调式', 'D 商调式', 'E 角调式', 'G 徵调式', 'A 羽调式']);
  assert.equal(names(sameGongSystem('C')[1]), 'D E G A C');
});

test('gong from tonic and mode, with correct spelling', () => {
  assert.equal(gongForTonic('D', 'shang'), 'C');
  assert.equal(gongForTonic('E', 'yu'), 'G');
  assert.equal(gongForTonic('F#', 'jue'), 'D');
  assert.equal(gongForTonic('Bb', 'zhi'), 'Eb');
  assert.equal(names(buildChineseMode({ tonic: 'F#', mode: 'yu' })), 'F# A B C# E');
});

test('hexatonic counts and names (dreampu: ten six-tone modes)', () => {
  assert.equal(scaleJieMing('hexa-qingjue').length, 6);
  assert.equal(modeName('D', 'shang', 'hexa-qingjue'), 'D 商六声调式（加清角）');
  assert.equal(modeName('D', 'shang', 'qingyue'), 'D 商清乐调式');
  assert.equal(names(buildChineseMode({ gong: 'C', mode: 'shang', type: 'hexa-qingjue' })), 'D E F G A C');
});

test('xuangong rotation and lu names', () => {
  assert.equal(rotateGong('C', 1), 'G');
  assert.equal(rotateGong('C', -2), 'Bb');
  assert.equal(luName('C'), '黄钟');
  assert.equal(luName('G'), '林钟');
});

test('identify pentatonic mode by its final note', () => {
  const r = identifyChineseMode(['D', 'E', 'G', 'A', 'C', 'D'], 'D');
  assert.equal(r.result.name, 'D 商调式');
  assert.equal(r.result.gong, 'C');
});

test('a pian yin is never offered as the tonic', () => {
  // C 宫读法里 F 是清角（偏音），只能保留 F 宫（加变宫）这一读法
  const r = identifyChineseMode(['C', 'D', 'E', 'F', 'G', 'A'], 'F');
  assert.equal(r.result.name, 'F 宫六声调式（加变宫）');
  assert.ok(r.candidates.every((c) => c.valid));
  assert.equal(identifyChineseMode(['C', 'D', 'E', 'G', 'A'], 'B').error, 'final-not-in-melody');
});

test('a diatonic set is ambiguous between gong systems', () => {
  const r = identifyChineseMode(['C', 'D', 'E', 'F', 'G', 'A', 'B'], 'D');
  assert.equal(r.ambiguous, true);
  assert.deepEqual(r.candidates.map((c) => `${c.gong}:${c.type}`).sort(), ['C:qingyue', 'F:yayue', 'G:yanyue']);
});

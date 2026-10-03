import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFigure, realizeFiguredBassLine, figuredVoicingEntries, spellFiguredVoice, keySignatureAccidental, FIGURED_PRESETS, FIGURED_KEYS, transposeFiguredLine } from './figured_bass.js';
import { solveVoicings } from './classical_voicing.js';

test('abbreviated figures expand as in OMT 2e', () => {
  assert.equal(parseFigure('').shape, '53');
  assert.equal(parseFigure('6').shape, '63');
  assert.equal(parseFigure('6/4').shape, '64');
  assert.equal(parseFigure('7').shape, '753');
  assert.equal(parseFigure('6/5').shape, '653');
  assert.equal(parseFigure('4/3').shape, '643');
  assert.equal(parseFigure('4/2').shape, '642');
  assert.equal(parseFigure('2').shape, '642');
});

test('a lone accidental applies to the third; slash/plus raise a figure', () => {
  const lone = parseFigure('#');
  assert.equal(lone.shape, '53');
  assert.equal(lone.figures.find((f) => f.number === 3).alter, 'sharp');
  assert.equal(parseFigure('6+').figures.find((f) => f.number === 6).alter, 'sharp');
  assert.equal(parseFigure('7/#').shape, '753');
});

test('key signatures', () => {
  assert.equal(keySignatureAccidental('D', 'major', 'C'), 1);
  assert.equal(keySignatureAccidental('Bb', 'major', 'E'), -1);
  assert.equal(keySignatureAccidental('A', 'minor', 'G'), 0);
});

test('C major line I – vii°6 – I6 – IV – V7 – I', () => {
  const chords = realizeFiguredBassLine('C3 D3:6 E3:6 F3 G3:7 C3', 'C');
  assert.deepEqual(chords.map((c) => c.notes.join('')), ['CGE', 'DBF', 'ECG', 'FCA', 'GFDB', 'CGE']);
  assert.deepEqual(chords.map((c) => c.root), ['C', 'B', 'C', 'F', 'G', 'C']);
  assert.equal(chords[4].seventh, 'F');
});

test('A minor: explicit bass G#, and a lone sharp raising the third', () => {
  const chords = realizeFiguredBassLine('A2 G#2:6 A2 D3:6 E2:# A2', 'A', 'minor');
  assert.deepEqual(chords[1].notes, ['G#', 'E', 'B']);
  assert.deepEqual(chords[4].notes, ['E', 'B', 'G#']);
});

test('four-part realisation keeps the written bass', () => {
  const chords = realizeFiguredBassLine('C3 D3:6 E3:6 F3 G3:7 C3', 'C');
  const solved = solveVoicings(figuredVoicingEntries(chords, 'C'));
  assert.ok(solved.ok, solved.reason);
  assert.deepEqual(solved.voices.map((v) => v[0]), [48, 50, 52, 53, 55, 48]);
  assert.equal(spellFiguredVoice(chords[4], 65), 'F4');
});

// 回归：示例在每个可选调上都必须能写成四部（小调示例曾因低音下行七度 D3 → E2 无解）
test('presets realise in four parts in every selectable key', () => {
  Object.entries(FIGURED_KEYS).forEach(([mode, keys]) => {
    const preset = FIGURED_PRESETS[mode];
    keys.forEach((key) => {
      const line = transposeFiguredLine(preset.line, preset.key, key, mode);
      const chords = realizeFiguredBassLine(line, key, mode);
      const solved = solveVoicings(figuredVoicingEntries(chords, key, mode));
      assert.ok(solved.ok, `${mode} ${key}: ${line} → ${solved.reason}`);
    });
  });
});

test('transposed presets keep spelling and use ♮ for a raised third that is natural', () => {
  assert.equal(transposeFiguredLine(FIGURED_PRESETS.minor.line, 'A', 'C', 'minor'), 'C3 B2:6 C3 F3:6 G3:♮ C3');
  assert.equal(transposeFiguredLine(FIGURED_PRESETS.minor.line, 'A', 'E', 'minor'), 'E3 D#3:6 E3 A3:6 B3:# E3');
  const chords = realizeFiguredBassLine('C3 B2:6 C3 F3:6 G3:♮ C3', 'C', 'minor');
  assert.deepEqual(chords[4].notes, ['G', 'D', 'B']);
  assert.equal(transposeFiguredLine(FIGURED_PRESETS.major.line, 'C', 'Bb', 'major'), 'Bb2 C3:6 D3:6 Eb3 F3:7 Bb2');
});

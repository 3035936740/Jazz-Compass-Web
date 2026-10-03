import test from 'node:test';
import assert from 'node:assert/strict';
import { parseChordSymbol, describeTones, QUALITIES, normalizeSuffix } from './chord_symbols.js';
import { intervalBetween } from './pitch_spelling.js';

const canon = (s) => parseChordSymbol(s)?.canonical ?? null;
const names = (s) => parseChordSymbol(s).tones.map((t) => t.name).join(' ');

// ref:wiki-chord-notation 表中的各种写法归一到同一个标准写法
test('different notations map to one canonical symbol', () => {
  const groups = {
    Cm: ['Cm', 'C-', 'C−', 'Cmin'],
    Cdim: ['Cdim', 'C°', 'Co'],
    Caug: ['Caug', 'C+', 'CM#5', 'CM+5'],
    Cmaj7: ['Cmaj7', 'CM7', 'CMa7', 'CΔ7'],
    Cm7: ['Cm7', 'C-7', 'C–7', 'Cmin7'],
    CmMaj7: ['CmM7', 'Cm#7', 'C-M7', 'C−Δ7', 'CminMaj7'],
    Cm7b5: ['Cm7b5', 'Cø', 'Cø7', 'Cmin7dim5', 'Cm7°5', 'C-7b5', 'C−7♭5'],
    Cdim7: ['Cdim7', 'C°7', 'Co7'],
    Caug7: ['Caug7', 'C+7', 'C7#5', 'C7+5'],
    CaugMaj7: ['CaugMaj7', 'C+M7', 'CM7#5', 'CM7+5', 'CΔ#5'],
    C7b5: ['C7b5', 'C7dim5'],
    Cadd9: ['Cadd9', 'C2', 'Cadd2'],
    Csus4: ['Csus4', 'Csus'],
    C7b9: ['C7b9', 'C7(b9)', 'C7♭9'],
  };
  Object.entries(groups).forEach(([expected, variants]) => variants.forEach((v) => assert.equal(canon(v), expected, v)));
});

test('canonical symbols use no special punctuation', () => {
  QUALITIES.forEach((q) => assert.match(q.suffix, /^[A-Za-z0-9#b/]*$/, q.id));
  assert.equal(canon('Em7b5'), 'Em7b5');
  assert.equal(canon('Eø7'), 'Em7b5');
});

test('a bare Δ is flagged as ambiguous', () => {
  const chord = parseChordSymbol('DΔ');
  assert.equal(chord.canonical, 'Dmaj7');
  assert.equal(chord.ambiguous, 'delta');
  assert.equal(parseChordSymbol('Ddelta').canonical, 'Dmaj7');
});

// ref:omt-triads 和弦音的音程与拼写
test('chord tones are spelled by letter with the right intervals', () => {
  assert.equal(names('Em7b5'), 'E G Bb D');
  assert.equal(names('Bdim7'), 'B D F Ab');
  assert.equal(names('Eaug'), 'E G# B#');
  assert.equal(names('F#m7'), 'F# A C# E');
  assert.deepEqual(describeTones(parseChordSymbol('Bdim7')).map((t) => t.label), ['1', '♭3', '♭5', '𝄫7']);
  assert.deepEqual(describeTones(parseChordSymbol('C7#9')).map((t) => t.label), ['1', '3', '5', '♭7', '♯9']);
  const voiced = parseChordSymbol('C13').pitches;
  voiced.slice(1).forEach((p, i) => assert.ok(intervalBetween(voiced[i], p).semitones > 0, 'ascending'));
});

test('slash chords keep the bass below; 6/9 is not a slash chord', () => {
  const chord = parseChordSymbol('C/E');
  assert.equal(chord.canonical, 'C/E');
  assert.equal(chord.pitches[0], 'E3');
  assert.equal(canon('C6/9'), 'C6/9');
});

// ref:soundquest-blk Blackadder：aug + 根音全音之上的低音，以低音命名，自低音起 [0,2,6,10]
test('Blackadder chords', () => {
  for (const input of ['A#aug/C', 'Bbaug/C', 'Bb+/C', 'Cblk']) {
    const chord = parseChordSymbol(input);
    assert.equal(chord.canonical, 'Cblk', input);
    assert.deepEqual(chord.tones.map((t) => t.name), ['C', 'Bb', 'D', 'F#']);
  }
  assert.equal(parseChordSymbol('A#aug/C').blk.enharmonicInput, 'A#');
  assert.equal(canon('Gblk'), 'Gblk');
  assert.equal(canon('Bbblk'), 'Bbblk');
  assert.equal(canon('Caug/D'), 'Dblk');
  assert.equal(canon('Caug/E'), 'Caug/E'); // 低音不是全音之上就不是 Blk
  const pcs = parseChordSymbol('Ebblk').tones.map((t) => t.semitones % 12).sort((a, b) => a - b);
  assert.deepEqual(pcs, [0, 2, 6, 10]);
  const { readings } = parseChordSymbol('Cblk').blk;
  assert.deepEqual(readings.find((r) => r.kind === 'b5').notes, ['C', 'D', 'Gb', 'Bb']);
  assert.deepEqual(readings.find((r) => r.kind === 'aug6').notes, ['C', 'D', 'F#', 'A#']);
});

test('unknown symbols return null', () => {
  assert.equal(parseChordSymbol('H7'), null);
  assert.equal(parseChordSymbol('Cxyz'), null);
  assert.equal(normalizeSuffix('-7b5'), 'm7b5');
});

// ref:wiki-altered-scale alt：根音、大三度、小七度必有，其余为变化音，每次可以不同
test('alt chords keep 1-3-b7 and pick altered tensions', async () => {
  const { buildChord, qualityById, realizeAlt } = await import('./chord_symbols.js');
  const seen = new Set();
  for (let seed = 0; seed < 40; seed += 1) {
    let x = seed + 1;
    const rng = () => { x = (x * 9301 + 49297) % 233280; return x / 233280; };
    const chord = buildChord('C', qualityById('alt'), null, '', null, [], rng);
    const pcs = chord.tones.map((t) => t.semitones % 12);
    assert.ok([0, 4, 10].every((pc) => pcs.includes(pc)), 'essential tones');
    assert.ok(pcs.every((pc) => [0, 4, 10, 1, 3, 6, 8].includes(pc)), `only altered tensions: ${pcs}`);
    assert.ok(!pcs.includes(2) && !pcs.includes(5) && !pcs.includes(7) && !pcs.includes(9), 'no natural 9, 11, 5, 13');
    assert.ok(pcs.length >= 5 && pcs.length <= 6);
    seen.add(chord.realization);
  }
  assert.ok(seen.size > 3, 'different realizations');
  assert.equal(parseChordSymbol('Galt').canonical, 'G7alt');
  const eb = realizeAlt('Eb', () => 0.1);
  eb.tones.forEach((t) => assert.ok(!/bbb|###/.test(t.name), t.name));
});

// ref:wiki-chord-notation add／omit／no、强力和弦、斜杠和弦
test('add, omit, power chords and slash chords', () => {
  assert.equal(canon('C7omit3'), 'C7omit3');
  assert.equal(canon('C7no3'), 'C7omit3');
  assert.equal(names('C7no3'), 'C G Bb');
  assert.equal(canon('C9(no5)'), 'C9omit5');
  assert.equal(names('C9(no5)'), 'C E Bb D');
  assert.equal(canon('Cadd11'), 'Cadd11');
  assert.equal(names('Cadd11'), 'C E G F');
  assert.equal(names('C7add13'), 'C E G Bb A');
  assert.equal(names('Cadd#11'), 'C E G F#');
  assert.equal(canon('Cmadd9'), 'Cmadd9');
  assert.equal(canon('C5'), 'C5');
  assert.deepEqual(parseChordSymbol('G5').pitches, ['G3', 'D4', 'G4']);
  assert.deepEqual(parseChordSymbol('C/E').slash, { kind: 'inversion', inversion: 1, degree: 3 });
  assert.deepEqual(parseChordSymbol('C/G').slash, { kind: 'inversion', inversion: 2, degree: 5 });
  assert.deepEqual(parseChordSymbol('C7/Bb').slash, { kind: 'inversion', inversion: 3, degree: 7 });
  assert.deepEqual(parseChordSymbol('C/F#').slash, { kind: 'non-chord' });
});

// ref:soundquest-blk 张力和弦读法也识别为 Blk
test('Blackadder tension-chord readings resolve to Xblk', () => {
  ['C9(b5)omit3', 'C9(-5)omit3', 'C+6(#11)omit3', 'C+6(+11)omit3'].forEach((s) => assert.equal(canon(s), 'Cblk', s));
});

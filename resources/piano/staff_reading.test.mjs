import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CLEFS, CLEF_ORDER, MNEMONICS, positionToPitch, pitchToPosition, describePosition, ledgerPositions, lineLetters, spaceLetters, spellMidi, pitchMidi, pitchLabel,
} from './staff_reading.js';

test('each clef marks the line it is named after', () => {
  assert.equal(positionToPitch('treble', 2).name, 'G4'); // 第二线 G4
  assert.equal(positionToPitch('bass', 6).name, 'F3'); // 第四线 F3
  assert.equal(positionToPitch('alto', 4).name, 'C4'); // 第三线中央 C
  assert.equal(positionToPitch('tenor', 6).name, 'C4'); // 第四线中央 C
});

test('line and space letters match the OMT mnemonics', () => {
  for (const clef of CLEF_ORDER) {
    const initials = (text) => text.replace(/[^A-Za-z ]/g, '').split(/\s+/).map((w) => w[0].toUpperCase()).join('');
    assert.equal(lineLetters(clef).join(''), initials(MNEMONICS[clef].lines), `${clef} lines`);
    const spaces = MNEMONICS[clef].spaces;
    assert.equal(spaceLetters(clef).join(''), spaces === 'FACE' ? 'FACE' : initials(spaces), `${clef} spaces`);
  }
});

test('middle C sits on the ledger line between the grand-staff staves', () => {
  assert.equal(pitchToPosition('treble', 'C', 4), -2);
  assert.equal(pitchToPosition('bass', 'C', 4), 10);
  assert.deepEqual(ledgerPositions(-2), [-2]);
  assert.deepEqual(ledgerPositions(10), [10]);
  assert.deepEqual(ledgerPositions(-5), [-2, -4]);
  assert.deepEqual(ledgerPositions(4), []);
});

test('positions describe lines, spaces and ledger lines', () => {
  assert.deepEqual(describePosition(0), { onLine: true, number: 1, ledgers: 0 });
  assert.deepEqual(describePosition(7), { onLine: false, number: 4, ledgers: 0 });
  assert.equal(describePosition(-2).ledgers, 1);
  assert.equal(describePosition(-3).ledgers, 1);
  assert.equal(describePosition(12).ledgers, 2);
});

test('spelling MIDI notes', () => {
  assert.equal(pitchLabel(spellMidi(60)), 'C4');
  assert.equal(pitchLabel(spellMidi(61)), 'C♯4');
  assert.equal(pitchLabel(spellMidi(61, 'flat')), 'D♭4');
  assert.equal(pitchLabel(spellMidi(59)), 'B3');
  assert.equal(pitchMidi('C', 4), 60);
  assert.equal(pitchMidi('B', 3, 1), 60);
  assert.equal(Object.keys(CLEFS).length, 4);
});

const notation = await import('./staff_reading.js');

test('key signatures follow the order of sharps and flats and OMT’s zig-zag rules', () => {
  const { keySignatureLayout, keyAlterations, SHARP_ORDER, FLAT_ORDER } = notation;
  for (const clef of ['treble', 'bass', 'alto', 'tenor']) {
    const sharps = keySignatureLayout(clef, 7); const flats = keySignatureLayout(clef, -7);
    assert.deepEqual(sharps.map((s) => s.letter), SHARP_ORDER);
    assert.deepEqual(flats.map((s) => s.letter), FLAT_ORDER);
    // 每个符号都画在它那个字母的线 / 间上
    [...sharps, ...flats].forEach((s) => assert.equal(positionToPitch(clef, s.position).letter, s.letter, `${clef} ${s.letter}`));
    // 降号：标准之字形（上、下交替）
    const flatSteps = flats.slice(1).map((s, i) => Math.sign(s.position - flats[i].position));
    assert.deepEqual(flatSteps, [1, -1, 1, -1, 1, -1], `${clef} flats zig-zag`);
    const sharpSteps = sharps.slice(1).map((s, i) => Math.sign(s.position - sharps[i].position));
    if (clef === 'tenor') assert.deepEqual(sharpSteps, [1, -1, 1, -1, 1, -1], 'tenor sharps: no break');
    else assert.deepEqual(sharpSteps, [-1, 1, -1, -1, 1, -1], `${clef} sharps: zig-zag with one break`);
  }
  // 次中音谱号的 F♯、G♯ 在低八度
  assert.equal(positionToPitch('tenor', keySignatureLayout('tenor', 3)[0].position).name, 'F3');
  assert.equal(positionToPitch('tenor', keySignatureLayout('tenor', 3)[2].position).name, 'G3');
  // 低音谱号：A♯ 在最下面的间，第七个降号 F♭ 在谱表下方的间
  assert.equal(keySignatureLayout('bass', 5)[4].position, 1);
  assert.equal(keySignatureLayout('bass', -7)[6].position, -1);
  assert.deepEqual(Object.entries(keyAlterations(2)).filter(([, v]) => v).map(([l]) => l), ['C', 'F']);
  assert.equal(keyAlterations(-3).A, -1);
});

test('durations, dots and measures', () => {
  const { durationBeats, measureBeats, decompose, layoutMeasures, isCompound } = notation;
  assert.equal(durationBeats('h', 1), 3);
  assert.equal(durationBeats('q', 2), 1.75);
  assert.equal(durationBeats('s'), 0.25);
  assert.equal(measureBeats([6, 8]), 3);
  assert.ok(isCompound([6, 8]) && !isCompound([3, 8]) && !isCompound([3, 4]));
  assert.deepEqual(decompose(3), [{ duration: 'h', dots: 1 }]);
  assert.deepEqual(decompose(2.5), [{ duration: 'h', dots: 0 }, { duration: 'e', dots: 0 }]);
  const n = { notes: [{ letter: 'C', octave: 4, alter: null }] };
  const tag = (m) => m.map((x) => x.events.map((e) => `${e.duration}${'.'.repeat(e.dots || 0)}${e.tiedIn ? '<' : ''}${e.tieOut ? '~' : ''}`).join(' '));
  assert.deepEqual(tag(layoutMeasures([{ ...n, duration: 'h', dots: 1 }, { ...n, duration: 'h' }], [4, 4])), ['h. q~', 'q<'], 'over the barline: split and tied');
  assert.deepEqual(tag(layoutMeasures([{ ...n, duration: 'w' }], [3, 4])), ['h.~', 'q<']);
  assert.deepEqual(tag(layoutMeasures([{ rest: true, notes: [], duration: 'w' }], [3, 4])), ['h.', 'q'], 'rests are split but never tied');
  assert.deepEqual(tag(layoutMeasures([{ ...n, duration: 'q', tie: true }, { ...n, duration: 'q' }], [4, 4])), ['q~ q']);
});

test('accidentals last until the barline; key signatures apply in every octave', () => {
  const { resolveMeasure, spellInKey, centsFrequency } = notation;
  const ev = (letter, octave, alter = null, extra = {}) => ({ notes: [{ letter, octave, alter }], ...extra });
  // G 大调（1 个升号）：F 默认升；写了还原就显示，之后同一小节的 F 跟着还原
  const r = resolveMeasure([ev('F', 4), ev('F', 4, 0), ev('F', 4), ev('F', 5)], 1);
  assert.deepEqual(r.map(([x]) => [x.alter, x.show]), [[1, false], [0, true], [0, false], [1, false]]);
  // 下一个小节重新从调号开始
  assert.deepEqual(resolveMeasure([ev('F', 4)], 1)[0][0], { alter: 1, show: false });
  // 写了和调号一样的升降不用再画
  assert.equal(resolveMeasure([ev('B', 4, -1)], -1)[0][0].show, false);
  // 连音线连过来的音沿用前一个音
  assert.deepEqual(resolveMeasure([ev('C', 4, null, { tiedIn: true, tiedAlters: { C4: 1 } })], 0)[0][0], { alter: 1, show: false });
  assert.deepEqual(spellInKey(66, 1), { letter: 'F', octave: 4, alter: null });
  assert.deepEqual(spellInKey(66, -1), { letter: 'G', octave: 4, alter: -1 });
  assert.deepEqual(spellInKey(70, -2), { letter: 'B', octave: 4, alter: null });
  assert.deepEqual(spellInKey(59, -7), { letter: 'C', octave: 4, alter: null }, 'C♭ major: B is written C♭4');
  assert.ok(Math.abs(centsFrequency(69, 1200) - 880) < 1e-9);
  assert.ok(Math.abs(centsFrequency(64, -50) - 440 * 2 ** (-5.5 / 12)) < 1e-9);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRatio, ratioLabel, ratioBetween, centsFromRatio, quantizeRatio, frequencyForRatio, harmonicSeries, syntonicComma, centsToKeyboardPercent, keyboardPercentToCents, foldRatioToOctave, extendedJustRatios, midiNoteLabel, midiNoteFrequency, midiPositionFrequency, piano88Notes, decodeMidiMessage, syncPianoVoices } from './microtonal.js';

test('ratios are reduced and invalid input is rejected', () => {
  assert.equal(ratioLabel(parseRatio('22:12')), '11/6');
  for (const invalid of ['3/0', '0/1', '-3/2', '1.25/1', '1000/1', 'oops']) {
    assert.throws(() => parseRatio(invalid));
  }
});

test('just intervals and syntonic comma have the expected cents', () => {
  assert(Math.abs(centsFromRatio(parseRatio('3/2')) - 701.955) < 0.001);
  assert(Math.abs(centsFromRatio(syntonicComma()) - 21.506) < 0.001);
  assert.equal(frequencyForRatio(440, parseRatio('3/2')), 660);
});

test('41 EDO keeps the syntonic comma while 12 EDO erases it', () => {
  assert.equal(quantizeRatio(syntonicComma(), 12).steps, 0);
  assert.equal(quantizeRatio(syntonicComma(), 41).steps, 1);
  assert.equal(quantizeRatio(parseRatio('3/2'), 41).steps, 24);
  assert.equal(quantizeRatio(parseRatio('5/4'), 41).steps, 13);
});

test('generator and direct mapping can differ for compound intervals', () => {
  const fifths = parseRatio('9/4');
  assert.equal(quantizeRatio(fifths, 18, 'generator').steps, 22);
  assert.equal(quantizeRatio(fifths, 18, 'direct').steps, 21);
});

test('every EDO from 1 through 93 is finite and octave-consistent', () => {
  for (let edo = 1; edo <= 93; edo++) {
    const octave = quantizeRatio(parseRatio('2/1'), edo);
    assert.equal(octave.steps, edo);
    for (const ratio of ['1/1', '5/4', '7/4', '11/6', '13/8', '81/80']) {
      const result = quantizeRatio(parseRatio(ratio), edo);
      assert(Number.isFinite(result.errorCents));
    }
  }
  for (const edo of [0, 94, 12.5, NaN]) assert.throws(() => quantizeRatio(parseRatio('3/2'), edo));
});

test('harmonic series folds into a single octave', () => {
  const series = harmonicSeries(16);
  assert.equal(ratioLabel(series[2].ratio), '3/2');
  assert.equal(ratioLabel(series[10].ratio), '11/8');
  assert.equal(ratioLabel(series[15].ratio), '1/1');
});

test('pairwise harmony retains exact rational intervals', () => {
  assert.equal(ratioLabel(ratioBetween(parseRatio('5/4'), parseRatio('3/2'))), '6/5');
  assert.equal(ratioLabel(ratioBetween(parseRatio('3/2'), parseRatio('11/6'))), '11/9');
});

test('piano positions preserve semitone centres and microtonal gaps', () => {
  assert.equal(centsToKeyboardPercent(0), 6.25);
  assert.equal(centsToKeyboardPercent(1200), 93.75);
  assert.equal(centsToKeyboardPercent(100), 12.5);
  for (let cents = 0; cents <= 1200; cents += 5) {
    assert(Math.abs(keyboardPercentToCents(centsToKeyboardPercent(cents)) - cents) < 1e-8);
  }
  assert.equal(keyboardPercentToCents(0), 0);
  assert.equal(keyboardPercentToCents(100), 1200);
});

test('extended ratio library includes inverse and compound ratios from the reference', () => {
  const standard = extendedJustRatios(63).map(ratioLabel);
  const full = extendedJustRatios(255).map(ratioLabel);
  assert(standard.length >= 50);
  for (const label of ['1/63', '3/11', '5/9', '9/7', '25/1']) assert(standard.includes(label));
  for (const label of ['11/9', '21/11', '27/7']) assert(full.includes(label));
  assert.equal(ratioLabel(foldRatioToOctave(parseRatio('1/63')).ratio), '64/63');
  assert.equal(ratioLabel(foldRatioToOctave(parseRatio('21/11')).ratio), '21/11');
  assert.equal(ratioLabel(foldRatioToOctave(parseRatio('63/1')).ratio), '63/32');
});

test('88-key piano spans A0 through C8 and applies cent offsets', () => {
  const notes = piano88Notes();
  assert.equal(notes.length, 88);
  assert.deepEqual(notes[0], { midi: 21, label: 'A0', black: false });
  assert.deepEqual(notes.at(-1), { midi: 108, label: 'C8', black: false });
  assert.equal(midiNoteLabel(69), 'A4');
  assert(Math.abs(midiNoteFrequency(69, 261.625565) - 440) < 0.001);
  assert(Math.abs(midiNoteFrequency(69, 261.625565, 100) - midiNoteFrequency(70, 261.625565)) < 0.001);
  assert(Math.abs(midiPositionFrequency(69.5, 261.625565) - Math.sqrt(midiNoteFrequency(69, 261.625565) * midiNoteFrequency(70, 261.625565))) < 0.001);
  assert.throws(() => midiNoteFrequency(69, 261.625565, 1201));
});

test('MIDI messages decode note-on, note-off and the full pitch-bend range', () => {
  assert.deepEqual(decodeMidiMessage([0x90, 60, 96]), { type: 'noteOn', note: 60, velocity: 96, channel: 1 });
  assert.deepEqual(decodeMidiMessage([0x99, 64, 0]), { type: 'noteOff', note: 64, velocity: 0, channel: 10 });
  assert.equal(decodeMidiMessage([0xe0, 0, 0]).cents, -200);
  assert.equal(decodeMidiMessage([0xe0, 0, 64]).cents, 0);
  assert.equal(decodeMidiMessage([0xe0, 127, 127]).cents, 200);
});

test('polyphonic piano voices overlap, retune, and release only removed notes', () => {
  const voices = new Map();
  const events = [];
  const makeVoice = (frequency, velocity) => {
    const voice = {
      stop: () => events.push(['stop', frequency]),
      setFrequency: next => events.push(['tune', frequency, next]),
    };
    events.push(['start', frequency, velocity]);
    return voice;
  };
  syncPianoVoices(voices, [60], position => position, makeVoice, 100);
  syncPianoVoices(voices, [60, 64, 67], position => position, makeVoice, 90);
  assert.deepEqual([...voices.keys()], [60, 64, 67]);
  assert.equal(events.filter(event => event[0] === 'stop').length, 0);
  syncPianoVoices(voices, [60, 64, 67], position => position + 0.37, makeVoice);
  assert(events.some(event => event[0] === 'tune' && event[1] === 64 && event[2] === 64.37));
  syncPianoVoices(voices, [60, 67], position => position, makeVoice);
  assert.deepEqual([...voices.keys()], [60, 67]);
  assert.deepEqual(events.filter(event => event[0] === 'stop'), [['stop', 64]]);
  syncPianoVoices(voices, [], position => position, makeVoice);
  assert.equal(voices.size, 0);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreToMusicXML, keyFifths } from './staff_musicxml.js';

const note = (letter, octave, extra = {}) => ({ letter, octave, alter: null, cents: 0, ...extra });

test('grand staff with chords, ties across the barline, rests and cents', () => {
  const xml = scoreToMusicXML({
    clefs: ['treble', 'bass'], key: 1, meter: [4, 4], bpm: 100,
    voices: [
      [{ rest: false, duration: 'h', dots: 1, tie: false, notes: [note('E', 5), note('G', 5)] }, { rest: false, duration: 'h', dots: 0, tie: false, notes: [note('F', 5, { alter: 0 })] }],
      [{ rest: true, duration: 'q', dots: 0, notes: [] }, { rest: false, duration: 'q', dots: 0, tie: false, notes: [note('E', 3, { cents: -50 })] }],
    ],
  });
  assert.match(xml, /<score-partwise version="4.0">/);
  assert.match(xml, /<divisions>16<\/divisions>/);
  assert.match(xml, /<key><fifths>1<\/fifths><\/key>/);
  assert.match(xml, /<staves>2<\/staves>/);
  assert.match(xml, /<clef number="2"><sign>F<\/sign><line>4<\/line><\/clef>/);
  assert.match(xml, /<chord\/><pitch><step>G<\/step><octave>5<\/octave><\/pitch><duration>48<\/duration>/, 'dotted half = 48, second chord tone has <chord/>');
  // F natural in G major: alter 0 written as an accidental, split across the barline and tied
  assert.match(xml, /<step>F<\/step><octave>5<\/octave><\/pitch><duration>16<\/duration><tie type="start"\/><voice>1<\/voice><type>quarter<\/type><accidental>natural<\/accidental>/);
  assert.match(xml, /<tie type="stop"\/>/);
  assert.match(xml, /<backup><duration>64<\/duration><\/backup>/);
  assert.match(xml, /<alter>-0.5<\/alter>/, '-50 cents → alter -0.5');
  assert.equal((xml.match(/<measure /g) || []).length, 2);
});

test('key signatures from tonic names', () => {
  assert.equal(keyFifths('C'), 0);
  assert.equal(keyFifths('Eb'), -3);
  assert.equal(keyFifths('A', true), 0);
  assert.equal(keyFifths('c', true), -3);
  assert.equal(keyFifths('F#'), 6);
});

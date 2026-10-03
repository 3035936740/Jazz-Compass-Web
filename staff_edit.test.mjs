import test from 'node:test';
import assert from 'node:assert/strict';
import { deflateRawSync, inflateRawSync } from 'node:zlib';
import { scoreToMusicXML } from './staff_musicxml.js';
import { musicXMLToScore, unzipMusicXML, transposeScore, copyMeasures, pasteMeasures, deleteMeasures, measureCount, voiceMeasures, INTERVALS } from './staff_edit.js';
import { pitchMidi } from './staff_reading.js';

const note = (letter, octave, alter = null, cents = 0) => ({ letter, octave, alter, cents });
const ev = (duration, notes, extra = {}) => ({ rest: !notes, duration, dots: 0, tie: false, notes: notes || [], ...extra });
const midis = (voice, key = 0, meter = [4, 4]) => voiceMeasures(voice, meter, key).flat().filter((e) => !e.rest).map((e) => e.notes.map((n) => pitchMidi(n.letter, n.octave, n.alter)));

test('export → import keeps pitches, chords, ties, rests, key, meter and tempo', () => {
  const score = {
    clef: 'grand', key: -2, meter: [3, 4], bpm: 112,
    voices: [
      [ev('h', [note('B', 4), note('D', 5)], { dots: 1, tie: true }), ev('q', [note('B', 4), note('D', 5)]), ev('e', [note('E', 5, 0)]), ev('e', [note('F', 5, 1)]), ev('q'), ev('q', [note('C', 5, 0, -50)])],
      [ev('h', [note('B', 2)], { dots: 1 }), ev('h', [note('F', 3)], { dots: 1 })],
    ],
  };
  const xml = scoreToMusicXML({ clefs: ['treble', 'bass'], voices: score.voices, key: score.key, meter: score.meter, bpm: score.bpm });
  const back = musicXMLToScore(xml);
  assert.equal(back.clef, 'grand');
  assert.equal(back.key, -2);
  assert.deepEqual(back.meter, [3, 4]);
  assert.equal(back.bpm, 112);
  assert.deepEqual(midis(back.voices[0], -2, [3, 4]), midis(score.voices[0], -2, [3, 4]));
  assert.deepEqual(midis(back.voices[1], -2, [3, 4]), midis(score.voices[1], -2, [3, 4]));
  assert.equal(back.voices[0][0].tie, true, 'tie kept');
  assert.ok(back.voices[0].some((e) => e.rest), 'rest kept');
  assert.equal(back.voices[0].at(-1).notes[0].cents, -50, 'decimal alter → cents');
  assert.equal(back.warnings.quantized, 0);
});

test('pickup bars, other voices, tuplets and grace notes', () => {
  const xml = `<?xml version="1.0"?><!DOCTYPE score-partwise><score-partwise version="4.0"><part-list><score-part id="P1"/></part-list><part id="P1">
  <measure number="0" implicit="yes"><attributes><divisions>3</divisions><key><fifths>1</fifths></key><time><beats>4</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes>
    <note><pitch><step>D</step><octave>5</octave></pitch><duration>3</duration><voice>1</voice><type>quarter</type></note></measure>
  <measure number="1">
    <note><grace/><pitch><step>A</step><octave>5</octave></pitch><voice>1</voice><type>eighth</type></note>
    <note><pitch><step>G</step><octave>5</octave></pitch><duration>1</duration><voice>1</voice><type>eighth</type><time-modification><actual-notes>3</actual-notes><normal-notes>2</normal-notes></time-modification></note>
    <note><pitch><step>F</step><alter>1</alter><octave>5</octave></pitch><duration>1</duration><voice>1</voice><type>eighth</type></note>
    <note><pitch><step>E</step><octave>5</octave></pitch><duration>1</duration><voice>1</voice><type>eighth</type></note>
    <note><pitch><step>D</step><octave>5</octave></pitch><duration>9</duration><voice>1</voice><type>half</type><dot/></note>
    <backup><duration>12</duration></backup>
    <note><pitch><step>B</step><octave>4</octave></pitch><duration>12</duration><voice>2</voice><type>whole</type></note>
  </measure></part></score-partwise>`;
  const s = musicXMLToScore(xml);
  assert.equal(s.clef, 'treble');
  assert.equal(s.key, 1);
  const bars = voiceMeasures(s.voices[0], s.meter, s.key);
  assert.equal(bars.length, 2);
  assert.ok(bars[0][0].rest, 'pickup is padded with rests in front');
  assert.equal(bars[0].at(-1).notes[0].letter, 'D');
  assert.equal(bars[1].at(-1).notes[0].letter, 'D', 'the long D lands at the end of bar 2');
  assert.equal(s.warnings.grace, 1);
  assert.ok(s.warnings.voices >= 1, 'voice 2 skipped');
  assert.ok(s.warnings.quantized > 0, 'triplets quantized');
  assert.ok(bars.every((bar) => Math.abs(bar.reduce((sum, e) => sum + ({ w: 4, h: 2, q: 1, e: 0.5, s: 0.25 }[e.duration] * (e.dots ? 1.5 : 1)), 0) - 4) < 1e-6), 'every bar is full');
  assert.throws(() => musicXMLToScore('<html></html>'), /not-musicxml/);
});

test('.mxl container is unzipped through META-INF/container.xml', async () => {
  const files = [
    ['META-INF/container.xml', '<container><rootfiles><rootfile full-path="score.musicxml"/></rootfiles></container>'],
    ['score.musicxml', scoreToMusicXML({ clefs: ['treble'], voices: [[ev('w', [note('A', 4)])]], key: 0, meter: [4, 4] })],
  ];
  const chunks = []; const central = []; let offset = 0;
  for (const [name, text] of files) {
    const data = deflateRawSync(Buffer.from(text)); const nameBytes = Buffer.from(name);
    const local = Buffer.alloc(30); local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(8, 8); local.writeUInt32LE(data.length, 18); local.writeUInt32LE(text.length, 22); local.writeUInt16LE(nameBytes.length, 26);
    const dir = Buffer.alloc(46); dir.writeUInt32LE(0x02014b50, 0); dir.writeUInt16LE(8, 10); dir.writeUInt32LE(data.length, 20); dir.writeUInt32LE(text.length, 24); dir.writeUInt16LE(nameBytes.length, 28); dir.writeUInt32LE(offset, 42);
    chunks.push(local, nameBytes, data); central.push(dir, nameBytes);
    offset += 30 + nameBytes.length + data.length;
  }
  const centralBytes = Buffer.concat(central);
  const end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10); end.writeUInt32LE(centralBytes.length, 12); end.writeUInt32LE(offset, 16);
  const zip = Buffer.concat([...chunks, centralBytes, end]);
  const text = await unzipMusicXML(zip, { inflateRaw: (data) => inflateRawSync(data) });
  assert.equal(musicXMLToScore(text).voices[0][0].notes[0].letter, 'A');
});

test('transposition moves letters and accidentals together and keeps the key signature sane', () => {
  const score = { clef: 'treble', key: 0, meter: [4, 4], voices: [[ev('q', [note('C', 4)]), ev('q', [note('E', 4)]), ev('q', [note('F', 4, 1)]), ev('q', [note('B', 4, -1)])], []] };
  const M2 = INTERVALS.find((i) => i.id === 'M2');
  const up = transposeScore(score, M2);
  assert.equal(up.key, 2, 'C major → D major');
  assert.deepEqual(up.voices[0].map((e) => `${e.notes[0].letter}${e.notes[0].alter}${e.notes[0].octave}`), ['D04', 'F14', 'G14', 'C05']);
  const down = transposeScore(score, { steps: -M2.steps, semis: -M2.semis });
  assert.equal(down.key, -2, 'C major → B-flat major');
  assert.equal(`${down.voices[0][0].notes[0].letter}${down.voices[0][0].notes[0].alter}${down.voices[0][0].notes[0].octave}`, 'B-13');
  const fromB = transposeScore({ ...score, key: 5, voices: [[ev('w', [note('B', 4)])], []] }, M2);
  assert.equal(fromB.key, -5, 'B major + M2 → D-flat major, not C-sharp major');
  assert.equal(`${fromB.voices[0][0].notes[0].letter}${fromB.voices[0][0].notes[0].alter}`, 'D-1');
  assert.equal(pitchMidi(fromB.voices[0][0].notes[0].letter, fromB.voices[0][0].notes[0].octave, -1), pitchMidi('B', 4, 0) + 2);
});

test('copy, paste and delete whole measures on the grand staff', () => {
  const score = { clef: 'grand', key: 1, meter: [4, 4], voices: [
    [ev('w', [note('G', 4)]), ev('h', [note('F', 5)]), ev('h', [note('A', 4)])],
    [ev('w', [note('G', 2)])],
  ] };
  assert.equal(measureCount(score), 2);
  const clip = copyMeasures(score, 2, 2);
  assert.equal(clip.voices[0][0][0].notes[0].alter, 1, 'F in G major is copied as an explicit F-sharp');
  assert.ok(clip.voices[1][0].every((e) => e.rest), 'the lower staff is padded with a rest bar');
  const pasted = pasteMeasures(score, clip, 1);
  assert.equal(measureCount({ ...score, voices: pasted }), 3);
  assert.equal(pasted[0][0].notes[0].letter, 'F', 'inserted before bar 1');
  assert.equal(pasted[1][0].rest, true);
  assert.equal(pasted[1][1].notes[0].letter, 'G', 'lower staff shifted with it');
  const appended = pasteMeasures(score, clip);
  assert.equal(appended[0].at(-1).notes[0].letter, 'A');
  assert.equal(pasteMeasures({ ...score, meter: [3, 4] }, clip, 1), null, 'different meter → refused');
  const removed = deleteMeasures({ ...score, voices: pasted }, 1, 1);
  assert.deepEqual(midis(removed[0], 1), midis(score.voices[0], 1));
});

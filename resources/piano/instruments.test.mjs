import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INSTRUMENTS, transposition, transpositionInterval, concertToWritten, writtenToConcert, writtenKey, enharmonicKey,
  soundingRange, writtenRange, instrumentsFor, shiftPitch,
} from './instruments.js';
import { PITCH_RANGES } from './instrument_ranges_data.js';

// ref:ibmt-transposition 教材中给出的音程
test('transposition intervals match Inquiry-Based Music Theory 12a', () => {
  const expect = {
    'clarinet-bb': ['M2', 'down'], 'trumpet-bb': ['M2', 'down'], 'sax-soprano': ['M2', 'down'],
    'sax-tenor': ['M9', 'down'], 'bass-clarinet': ['M9', 'down'], 'sax-baritone': ['M13', 'down'],
    'sax-alto': ['M6', 'down'], 'clarinet-eb': ['m3', 'up'], 'cor-anglais': ['P5', 'down'], horn: ['P5', 'down'],
    piccolo: ['P8', 'up'], 'double-bass': ['P8', 'down'], guitar: ['P8', 'down'], contrabassoon: ['P8', 'down'],
    flute: ['P1', 'none'], trombone: ['P1', 'none'],
  };
  Object.entries(expect).forEach(([id, [name, direction]]) => {
    const interval = transpositionInterval(id);
    assert.deepEqual([interval.name, interval.direction], [name, direction], id);
  });
  // ref:wiki-transposing 钟琴高两个八度
  assert.equal(transpositionInterval('glockenspiel').name, 'P15');
});

test('IBMT worked examples', () => {
  // 单簧管要奏出 C，谱面须写 D；次中音萨克斯要奏 C4，须写 D5；上低音萨克斯须写 A5；英国管须写 G4
  assert.equal(concertToWritten('clarinet-bb', 'C4').name, 'D4');
  assert.equal(concertToWritten('sax-tenor', 'C4').name, 'D5');
  assert.equal(concertToWritten('sax-baritone', 'C4').name, 'A5');
  assert.equal(concertToWritten('cor-anglais', 'C4').name, 'G4');
  assert.equal(writtenToConcert('sax-tenor', 'C4').name, 'Bb2');
  assert.equal(writtenToConcert('sax-baritone', 'C4').name, 'Eb2');
});

test('spelling is kept by letter', () => {
  assert.equal(concertToWritten('clarinet-bb', 'F#4').name, 'G#4');
  assert.equal(concertToWritten('sax-alto', 'Bb3').name, 'G4');
  assert.equal(concertToWritten('horn', 'Bb3').name, 'F4');
  assert.equal(shiftPitch('B4', 1, 1).name, 'C5');
  assert.equal(concertToWritten('clarinet-a', 'C4').name, 'Eb4');
});

test('key conversion and enharmonic keys', () => {
  // 实音降 E 大调：降 B 乐器读 F 大调（1 个降号），降 E 乐器读 C 大调
  assert.deepEqual(writtenKey('clarinet-bb', 'Eb'), { tonic: 'F', fifths: -1 });
  assert.deepEqual(writtenKey('sax-alto', 'Eb'), { tonic: 'C', fifths: 0 });
  // 实音 B 大调给中音萨克斯：G# 大调（8 个升号）→ 等音 Ab 大调
  const key = writtenKey('sax-alto', 'B');
  assert.deepEqual(key, { tonic: 'G#', fifths: 8 });
  assert.equal(enharmonicKey('G#'), 'Ab');
  assert.equal(enharmonicKey('D'), null);
});

test('every referenced range exists in the generated chart data', () => {
  INSTRUMENTS.forEach((item) => {
    if (item.range) assert.ok(PITCH_RANGES[item.range], item.id);
  });
  // ref:wiki-pitch-ranges 钢琴 A0–C8
  assert.deepEqual(soundingRange('piano'), [21, 108]);
  // 实音 C5–C8 的短笛，书写音域低八度
  assert.deepEqual(writtenRange('piccolo'), [soundingRange('piccolo')[0] - 12, soundingRange('piccolo')[1] - 12]);
  assert.equal(transposition('piano').semitones, 0);
});

test('instruments that can play a melody', () => {
  const ids = instrumentsFor([40, 41]); // E2–F2
  assert.ok(ids.includes('cello') && ids.includes('bassoon') && !ids.includes('violin'));
});

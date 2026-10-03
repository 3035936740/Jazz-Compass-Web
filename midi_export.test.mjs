import test from 'node:test';
import assert from 'node:assert/strict';
import { variableLength, buildMidiFile } from './midi_export.js';

test('variable-length quantities', () => {
  assert.deepEqual(variableLength(0), [0x00]);
  assert.deepEqual(variableLength(0x7f), [0x7f]);
  assert.deepEqual(variableLength(0x80), [0x81, 0x00]);
  assert.deepEqual(variableLength(0x3fff), [0xff, 0x7f]);
  assert.deepEqual(variableLength(0x200000), [0x81, 0x80, 0x80, 0x00]);
});

/** 极简解析：读出所有块与音符事件，用来检查写出的文件 */
function parse(bytes) {
  const text = (i) => String.fromCharCode(...bytes.slice(i, i + 4));
  const u32 = (i) => (bytes[i] << 24) | (bytes[i + 1] << 16) | (bytes[i + 2] << 8) | bytes[i + 3];
  const chunks = [];
  for (let i = 0; i < bytes.length;) {
    const length = u32(i + 4);
    chunks.push({ type: text(i), data: bytes.slice(i + 8, i + 8 + length) });
    i += 8 + length;
  }
  const readTrack = (data) => {
    const notes = [];
    let tick = 0;
    for (let i = 0; i < data.length;) {
      let delta = 0;
      let b;
      do { b = data[i++]; delta = (delta << 7) | (b & 0x7f); } while (b & 0x80);
      tick += delta;
      const status = data[i++];
      if (status === 0xff) { const type = data[i++]; const len = data[i++]; if (type === 0x2f) break; i += len; }
      else if ((status & 0xf0) === 0xc0) i += 1;
      else { notes.push({ tick, on: (status & 0xf0) === 0x90, note: data[i], velocity: data[i + 1] }); i += 2; }
    }
    return notes;
  };
  return { chunks, readTrack };
}

test('a two-track file has the expected header, tempo and notes', () => {
  const bytes = buildMidiFile([
    { name: 'Soprano', notes: [{ beat: 0, duration: 1, midi: 72 }, { beat: 1, duration: 1, midi: 72 }] },
    { name: 'Bass', notes: [{ beat: 0, duration: 2, midi: 48, velocity: 100 }] },
  ], { bpm: 120, ppq: 480 });
  const { chunks, readTrack } = parse(bytes);
  assert.deepEqual(chunks.map((c) => c.type), ['MThd', 'MTrk', 'MTrk', 'MTrk']);
  assert.deepEqual([...chunks[0].data], [0, 1, 0, 3, 0x01, 0xe0]); // 格式 1、3 条音轨、480 tick
  // 速度：120 BPM = 500000 µs = 0x07A120
  assert.deepEqual([...chunks[1].data.slice(0, 7)], [0, 0xff, 0x51, 3, 0x07, 0xa1, 0x20]);
  const soprano = readTrack(chunks[2].data);
  // 同音反复：第一个音的关音排在第二个音的开音之前
  assert.deepEqual(soprano.map((e) => [e.tick, e.on, e.note]), [[0, true, 72], [480, false, 72], [480, true, 72], [960, false, 72]]);
  assert.equal(readTrack(chunks[3].data)[0].velocity, 100);
});

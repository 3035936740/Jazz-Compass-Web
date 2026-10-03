import test from 'node:test';
import assert from 'node:assert/strict';
import { TUNINGS, midiAt, positionsOf, CAGED_SHAPES, CAGED_ORDER, cagedVoicing, cagedPositions, majorTriad, LABEL_TO_INDEX } from './fretboard.js';
import { parseNote } from './pitch_spelling.js';

// ref:wiki-standard-tuning 相邻弦为纯四度，G–B 为大三度
test('standard guitar tuning intervals', () => {
  const steps = TUNINGS.guitar.slice(1).map((_, i) => midiAt('guitar', i + 1, 0) - midiAt('guitar', i, 0));
  assert.deepEqual(steps, [5, 5, 5, 4, 5]);
  assert.equal(midiAt('guitar', 0, 0), 40);
});

// ref:agt-caged 每个开放和弦形的音与标注一致
test('each open CAGED shape spells a major triad with the labels given', () => {
  Object.entries(CAGED_SHAPES).forEach(([id, shape]) => {
    const triad = majorTriad(shape.root).map((name) => parseNote(name).pc);
    cagedVoicing(shape.root, id).notes.forEach((note) => {
      assert.equal(note.midi % 12, triad[LABEL_TO_INDEX[note.label]], `${id} string ${note.string}`);
    });
  });
});

test('worked examples from Applied Guitar Theory', () => {
  assert.equal(cagedVoicing('D', 'C').shift, 2); // C 形上移 2 品为 D
  assert.equal(cagedVoicing('B', 'A').shift, 2); // A 形到第 2 品为 B
  assert.equal(cagedVoicing('Bb', 'G').notes[0].fret, 6); // G 形 B♭，根音在第 6 品
  assert.equal(cagedVoicing('F#', 'E').shift, 2); // E 形在第 2 品为 F#
  assert.equal(cagedVoicing('F', 'D').shift, 3); // D 形上移 3 品为 F
});

test('shapes follow C-A-G-E-D along the neck', () => {
  ['C', 'D', 'E', 'F', 'G', 'A', 'Bb'].forEach((root) => {
    const order = cagedPositions(root).map((p) => p.shape);
    const start = CAGED_ORDER.indexOf(order[0]);
    const rotated = [...CAGED_ORDER.slice(start), ...CAGED_ORDER.slice(0, start)];
    assert.deepEqual(order, rotated, root);
  });
  // C 和弦：C 形开放，A 形第 3 品，G 形第 5 品，E 形第 8 品，D 形第 10 品
  assert.deepEqual(cagedPositions('C').map((p) => [p.shape, p.shift]), [['C', 0], ['A', 3], ['G', 5], ['E', 8], ['D', 10]]);
});

test('positions of a pitch class', () => {
  const es = positionsOf('guitar', [4], 12);
  assert.ok(es.some((p) => p.string === 0 && p.fret === 0));
  assert.ok(es.some((p) => p.string === 0 && p.fret === 12));
  assert.ok(es.every((p) => p.midi % 12 === 4));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { buildHarmonyWheel, chordIdentity, harmonyNeighborhood, mergeConnectionGraphs } from './harmony_connections.js';

test('supplied wheel is reconstructed as 12 major, 12 minor, 24 dominant and 12 diminished positions', () => {
  const graph = buildHarmonyWheel();
  assert.equal(graph.nodes.length, 60);
  assert.equal(graph.edges.length, 180);
  assert.deepEqual(['major', 'minor', 'dominant', 'diminished'].map(category =>
    graph.nodes.filter(node => node.category === category).length), [12, 12, 24, 12]);
  const labels = graph.nodes.map(node => node.label);
  for (const label of ['C', 'Am', 'G7', 'E7', 'B°', 'F#', 'E#°', 'Db', 'Bbm']) assert(labels.includes(label));
  assert(graph.edges.some(edge => edge.source === 'V:0' && edge.target === 'M:0' && edge.relation === 'V7→I'));
  assert(graph.edges.some(edge => edge.source === 'v:0' && edge.target === 'm:0' && edge.relation === 'V7→i'));
  assert(graph.edges.some(edge => edge.source === 'd:0' && edge.target === 'M:0' && edge.relation === 'vii°→I'));
  assert.deepEqual(['I–ii', 'I→V7/vi', 'ii→V7', 'third°', '7th-upper°', '7th-fifth°', 'dim-third-cycle']
    .map(relation => graph.edges.filter(edge => edge.relation === relation).length), [12, 12, 12, 12, 24, 24, 12]);
});

test('the previously missing F–Gm–C7, Dm–G7, dominant–diminished and inner star links repeat by key', () => {
  const graph = buildHarmonyWheel();
  const label = id => graph.nodes.find(node => node.id === id)?.label;
  const has = (from, to, relation) => graph.edges.some(edge => label(edge.source) === from
    && label(edge.target) === to && edge.relation === relation);
  for (const [from, to, relation] of [
    ['F', 'Gm', 'I–ii'], ['Dm', 'G7', 'ii→V7'], ['F', 'A7', 'I→V7/vi'],
    ['G', 'Am', 'I–ii'], ['Em', 'A7', 'ii→V7'], ['G', 'B7', 'I→V7/vi'],
    ['G7', 'B°', '7th-upper°'], ['E7', 'B°', '7th-fifth°'],
    ['F7', 'A°', '7th-upper°'], ['D7', 'A°', '7th-fifth°'],
    ['E°', 'G#°', 'dim-third-cycle'], ['G#°', 'C°', 'dim-third-cycle'],
    ['C°', 'E°', 'dim-third-cycle'],
  ]) assert(has(from, to, relation), `${from} ${relation} ${to}`);
});

test('enharmonic spellings resolve to a common identity but unrelated chord qualities stay separate', () => {
  assert.equal(chordIdentity('C'), chordIdentity('Cmaj'));
  assert.equal(chordIdentity('B°'), chordIdentity('Bdim'));
  assert.equal(chordIdentity('F#7'), chordIdentity('Gb7'));
  assert.notEqual(chordIdentity('C'), chordIdentity('Cm'));
  assert.notEqual(chordIdentity('C7'), chordIdentity('Cmaj'));
  assert.equal(chordIdentity('Cmaj7'), null);
});

test('wheel neighborhood follows explicit relative, dominant, diminished and fifth links', () => {
  const graph = harmonyNeighborhood('Cmaj', 1);
  assert(graph.matched);
  const names = new Set(graph.nodes.map(node => node.chord));
  for (const chord of ['Am', 'Dm', 'E7', 'G7', 'Bdim', 'Edim', 'Gmaj', 'Fmaj']) assert(names.has(chord), chord);
  assert(graph.edges.every(edge => edge.family === 'harmony'));
  assert.equal(harmonyNeighborhood('Cmaj7').matched, false);
});

test('all-connections graph unifies equal chords while retaining source-specific edges', () => {
  const root = { nodes: [{ id: 0, chord: 'Cmaj', depth: 0 }, { id: 1, chord: 'Am', depth: 1 }],
    edges: [{ source: 0, target: 1, label: 'R', isPrimary: true }] };
  const other = { nodes: [{ id: 0, chord: 'C', depth: 0 }, { id: 1, chord: 'Am', depth: 1 }],
    edges: [{ source: 0, target: 1, label: 'relative' }] };
  const merged = mergeConnectionGraphs('Cmaj', [{ family: 'tonnetz', graph: root }, { family: 'harmony', graph: other }]);
  assert.equal(merged.nodes.length, 2);
  assert.deepEqual(merged.edges.map(edge => edge.family).sort(), ['harmony', 'tonnetz']);
});

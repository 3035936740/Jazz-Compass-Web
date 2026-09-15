// Transposition-symmetric edge families traced from the supplied chord wheel.
// Every photographed arrow is treated as a bidirectional relationship.
const MAJOR = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
const MINOR = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm'];
const MAJOR_DOMINANT = ['G7', 'D7', 'A7', 'E7', 'B7', 'F#7', 'C#7', 'Ab7', 'Eb7', 'Bb7', 'F7', 'C7'];
const MINOR_DOMINANT = ['E7', 'B7', 'F#7', 'C#7', 'G#7', 'D#7', 'A#7', 'F7', 'C7', 'G7', 'D7', 'A7'];
const LEADING_DIM = ['B°', 'F#°', 'C#°', 'G#°', 'D#°', 'A#°', 'E#°', 'C°', 'G°', 'D°', 'A°', 'E°'];
const PITCH = { C: 0, Db: 1, 'C#': 1, D: 2, Eb: 3, 'D#': 3, E: 4, F: 5, 'E#': 5,
  Gb: 6, 'F#': 6, G: 7, Ab: 8, 'G#': 8, A: 9, Bb: 10, 'A#': 10, B: 11 };
const mod12 = value => ((value % 12) + 12) % 12;
const nodeId = (kind, index) => `${kind}:${index}`;

export function chordIdentity(symbol) {
  const match = String(symbol || '').trim().match(/^([A-G](?:#|b)?)(.*)$/i);
  if (!match) return null;
  const root = match[1][0].toUpperCase() + match[1].slice(1);
  const pitch = PITCH[root];
  if (pitch === undefined) return null;
  const tail = match[2].toLowerCase();
  const kind = /^(?:dim|°|o)(?:7)?$/.test(tail) ? 'dim'
    : /^m(?!aj)(?:in)?$/.test(tail) ? 'minor'
      : /^(?:7|dom7)$/.test(tail) ? 'dominant'
        : /^(?:maj|major)?$/.test(tail) ? 'major' : null;
  return kind ? `${kind}:${mod12(pitch)}` : null;
}

export function buildHarmonyWheel() {
  const nodes = [], edges = [];
  const add = (kind, index, label, radius, angle, category) => nodes.push({
    id: nodeId(kind, index), label, chord: category === 'major' ? `${label}maj` : label.replace('°', 'dim'),
    identity: chordIdentity(label), radius, angle, category, sector: index,
  });
  const connect = (source, target, relation) => edges.push({
    source, target, relation, family: 'harmony', directed: false,
  });
  for (let i = 0; i < 12; i += 1) {
    const angle = -90 + i * 30;
    add('M', i, MAJOR[i], 330, angle, 'major');
    add('m', i, MINOR[i], 300, angle + 15, 'minor');
    add('V', i, MAJOR_DOMINANT[i], 225, angle, 'dominant');
    add('v', i, MINOR_DOMINANT[i], 215, angle + 15, 'dominant');
    add('d', i, LEADING_DIM[i], 135, angle, 'diminished');
    connect(nodeId('M', i), nodeId('M', (i + 1) % 12), 'fifth');
    connect(nodeId('m', i), nodeId('m', (i + 1) % 12), 'fifth');
    connect(nodeId('M', i), nodeId('m', i), 'relative');
    connect(nodeId('M', i), nodeId('m', (i + 11) % 12), 'I–ii');
    connect(nodeId('V', i), nodeId('M', i), 'V7→I');
    connect(nodeId('v', i), nodeId('m', i), 'V7→i');
    connect(nodeId('d', i), nodeId('M', i), 'vii°→I');
    connect(nodeId('M', i), nodeId('v', i), 'I→V7/vi');
    connect(nodeId('m', (i + 11) % 12), nodeId('V', i), 'ii→V7');
  }
  const dimByPitch = new Map(nodes.filter(node => node.category === 'diminished')
    .map(node => [Number(node.identity.split(':')[1]), node.id]));
  const diminishedAt = pitch => dimByPitch.get(mod12(pitch));
  for (const node of nodes) {
    const pitch = Number(node.identity.split(':')[1]);
    if (node.category === 'major') {
      connect(node.id, diminishedAt(pitch + 4), 'third°');
    } else if (node.category === 'dominant') {
      connect(node.id, diminishedAt(pitch + 4), '7th-upper°');
      connect(node.id, diminishedAt(pitch + 7), '7th-fifth°');
    } else if (node.category === 'diminished') {
      connect(node.id, diminishedAt(pitch + 4), 'dim-third-cycle');
    }
  }
  return { nodes, edges };
}

export function harmonyNeighborhood(symbol, depth = 1, wheel = buildHarmonyWheel()) {
  const identity = chordIdentity(symbol);
  const rootMatches = wheel.nodes.filter(node => node.identity === identity);
  const root = { id: 0, chord: symbol, label: symbol, group: 'center', depth: 0, identity };
  if (!rootMatches.length) return { nodes: [root], edges: [], center: symbol, matched: false };
  const byId = new Map(wheel.nodes.map(node => [node.id, node]));
  const neighbors = new Map();
  wheel.edges.forEach(edge => {
    for (const [from, to] of [[edge.source, edge.target], [edge.target, edge.source]]) {
      if (!neighbors.has(from)) neighbors.set(from, []);
      neighbors.get(from).push({ to, edge });
    }
  });
  const nodes = [root], edges = [], idFor = new Map([[identity, 0]]);
  const queue = rootMatches.map(node => ({ wheelId: node.id, depth: 0 }));
  const seenWheel = new Set(queue.map(item => item.wheelId));
  while (queue.length) {
    const current = queue.shift();
    if (current.depth >= depth) continue;
    for (const link of neighbors.get(current.wheelId) || []) {
      const to = byId.get(link.to);
      if (!to?.identity) continue;
      if (!idFor.has(to.identity)) {
        const id = nodes.length;
        idFor.set(to.identity, id);
        nodes.push({ id, chord: to.chord, label: to.label, group: 'harmony', depth: current.depth + 1,
          identity: to.identity, category: to.category });
      }
      const source = idFor.get(byId.get(link.edge.source).identity);
      const target = idFor.get(byId.get(link.edge.target).identity);
      if (source !== target && !edges.some(edge => edge.source === source && edge.target === target && edge.label === link.edge.relation)) {
        edges.push({ source, target, label: link.edge.relation, family: 'harmony', directed: link.edge.directed });
      }
      if (!seenWheel.has(to.id)) {
        seenWheel.add(to.id);
        queue.push({ wheelId: to.id, depth: current.depth + 1 });
      }
    }
  }
  return { nodes, edges, center: symbol, matched: true };
}

export function mergeConnectionGraphs(center, graphs) {
  const nodes = [{ id: 0, chord: center, label: center, group: 'center', depth: 0 }];
  const edges = [], ids = new Map([[chordIdentity(center) || center, 0]]);
  function keyFor(chord) { return chordIdentity(chord) || chord; }
  graphs.forEach(({ family, graph }) => {
    if (!graph?.nodes?.length) return;
    const remap = new Map();
    graph.nodes.forEach(node => {
      const key = keyFor(node.chord);
      if (!ids.has(key)) {
        ids.set(key, nodes.length);
        nodes.push({ ...node, id: nodes.length, group: family, depth: node.depth || 1, family });
      } else if (node.depth < nodes[ids.get(key)].depth) nodes[ids.get(key)].depth = node.depth;
      remap.set(node.id, ids.get(key));
    });
    graph.edges?.forEach(edge => {
      const source = remap.get(edge.source), target = remap.get(edge.target);
      if (source === undefined || target === undefined || source === target) return;
      if (!edges.some(existing => existing.source === source && existing.target === target && existing.family === family && existing.label === edge.label)) {
        edges.push({ ...edge, source, target, family });
      }
    });
  });
  return { nodes, edges, center };
}

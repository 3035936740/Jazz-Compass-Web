import { buildHarmonyWheel, chordIdentity, harmonyNeighborhood } from './harmony_connections.js';

const SVG = 'http://www.w3.org/2000/svg';
const make = (tag, className = '', caption = '') => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (caption) node.textContent = caption;
  return node;
};
const svg = (tag, attributes = {}) => {
  const node = document.createElementNS(SVG, tag);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
  return node;
};
const at = node => {
  const angle = node.angle * Math.PI / 180;
  return { x: 400 + Math.cos(angle) * node.radius, y: 400 + Math.sin(angle) * node.radius };
};

export function mountHarmonyWheel(container, currentChord, onSelect, translate = key => key, createCard = null, viewState = null) {
  const wheel = buildHarmonyWheel();
  const neighborhood = harmonyNeighborhood(currentChord);
  const nodes = new Map(wheel.nodes.map(node => [node.id, node]));
  let selected = chordIdentity(currentChord);
  container.replaceChildren();
  const layout = make('div', 'harmony-wheel-layout');
  const interactive = make('div', 'harmony-wheel-interactive');
  const graph = svg('svg', { viewBox: '0 0 800 800', role: 'group', 'aria-label': translate('neo_harmony_graph_alt') });
  const paths = svg('g', { class: 'harmony-wheel-edges' });
  const glyphs = svg('g', { class: 'harmony-wheel-nodes' });
  const viewport = svg('g', { class: 'harmony-wheel-viewport' });
  viewport.append(paths, glyphs);
  graph.appendChild(viewport);
  let zoomLevel = viewState?.zoom ?? 1, panX = viewState?.panX ?? 0, panY = viewState?.panY ?? 0;
  let drag = null, suppressClick = false;
  const zoomViewport = () => viewport.setAttribute('transform',
    `translate(${panX} ${panY}) translate(400 400) scale(${zoomLevel}) translate(-400 -400)`);
  const saveViewState = () => {
    if (viewState) Object.assign(viewState, { zoom: zoomLevel, panX, panY });
    zoomViewport();
  };
  const controls = make('div', 'harmony-wheel-controls');
  const addZoomButton = (label, title, change) => {
    const button = make('button', 'panel-action', label);
    button.type = 'button'; button.title = title; button.setAttribute('aria-label', title);
    button.addEventListener('click', () => {
      if (change === 0) { zoomLevel = 1; panX = 0; panY = 0; }
      else zoomLevel = Math.max(.7, Math.min(2.5, zoomLevel + change));
      saveViewState();
    });
    controls.appendChild(button);
  };
  addZoomButton('−', '缩小和弦连接网', -.2);
  addZoomButton('+', '放大和弦连接网', .2);
  addZoomButton('适应', '恢复和弦连接网大小', 0);
  graph.addEventListener('wheel', event => {
    event.preventDefault();
    zoomLevel = Math.max(.7, Math.min(2.5, zoomLevel + (event.deltaY > 0 ? -.1 : .1)));
    saveViewState();
  }, { passive: false });
  graph.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    drag = { x: event.clientX, y: event.clientY, moved: false };
    graph.classList.add('is-dragging');
  });
  graph.addEventListener('pointermove', event => {
    if (!drag) return;
    const rect = graph.getBoundingClientRect();
    const dx = (event.clientX - drag.x) * 800 / rect.width;
    const dy = (event.clientY - drag.y) * 800 / rect.height;
    if (Math.hypot(dx, dy) > 3) drag.moved = true;
    panX += dx; panY += dy;
    drag.x = event.clientX; drag.y = event.clientY;
    saveViewState();
  });
  graph.addEventListener('pointerup', event => {
    if (!drag) return;
    suppressClick = drag.moved;
    drag = null;
    graph.classList.remove('is-dragging');
    setTimeout(() => { suppressClick = false; }, 0);
  });
  graph.addEventListener('pointercancel', () => {
    drag = null; graph.classList.remove('is-dragging');
  });
  zoomViewport();
  const edgeElements = wheel.edges.map(edge => {
    const a = at(nodes.get(edge.source)), b = at(nodes.get(edge.target));
    const dx = b.x - a.x, dy = b.y - a.y, length = Math.hypot(dx, dy) || 1;
    const margin = 19;
    const line = svg('line', { x1: a.x + dx / length * margin, y1: a.y + dy / length * margin,
      x2: b.x - dx / length * margin, y2: b.y - dy / length * margin,
      class: `harmony-wheel-edge relation-${edge.relation.replace(/[^a-z]/gi, '')}` });
    line.appendChild(svg('title'));
    line.lastChild.textContent = `${nodes.get(edge.source).label} ↔ ${nodes.get(edge.target).label} · ${edge.relation.replace(/→/g, '–')}`;
    paths.appendChild(line);
    return { edge, line };
  });
  const nodeElements = wheel.nodes.map(node => {
    const point = at(node), group = svg('g', { class: `harmony-wheel-node category-${node.category}`,
      transform: `translate(${point.x} ${point.y})`, tabindex: 0, role: 'button',
      'aria-label': `${node.label}: ${translate('neo_harmony_select')}` });
    group.dataset.chord = node.chord;
    group.append(svg('circle', { r: 19 }), svg('text', { 'text-anchor': 'middle', dy: '.34em' }));
    group.lastChild.textContent = node.label;
    group.addEventListener('click', () => {
      if (suppressClick) { suppressClick = false; return; }
      choose(node);
    });
    group.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(node); }
    });
    glyphs.appendChild(group);
    return { node, group };
  });
  const status = make('div', 'harmony-wheel-status');
  const legend = make('div', 'harmony-wheel-legend');
  for (const [category, key] of [['major', 'neo_harmony_major'], ['minor', 'neo_harmony_minor'],
    ['dominant', 'neo_harmony_dominant'], ['diminished', 'neo_harmony_diminished']]) {
    const item = make('span', `category-${category}`);
    item.append(make('i'), make('span', '', translate(key)));
    legend.appendChild(item);
  }
  interactive.append(controls, graph, legend, status);
  layout.appendChild(interactive);
  const details = make('div', 'harmony-wheel-details');
  const cardGrid = make('div', 'harmony-wheel-card-grid');
  const relationLabels = { fifth: translate('neo_harmony_rel_fifth'), relative: translate('neo_harmony_rel_relative'),
    'I–ii': translate('neo_harmony_rel_ii'), 'I→V7/vi': translate('neo_harmony_rel_relative_dominant'),
    'ii→V7': translate('neo_harmony_rel_ii_v'), 'third°': translate('neo_harmony_rel_third_diminished'),
    '7th-upper°': translate('neo_harmony_rel_upper_diminished'), '7th-fifth°': translate('neo_harmony_rel_fifth_diminished'),
    'dim-third-cycle': translate('neo_harmony_rel_dim_cycle'), 'V7→I': translate('neo_harmony_rel_dominant'),
    'V7→i': translate('neo_harmony_rel_minor_dominant'), 'vii°→I': translate('neo_harmony_rel_diminished') };
  neighborhood.nodes.filter(node => node.depth === 1).forEach(node => {
    const card = createCard?.(node.chord) || make('div', 'result-card', node.chord);
    card.classList.add('harmony-wheel-card');
    if (!createCard) card.addEventListener('click', () => onSelect?.(node.chord));
    const relations = neighborhood.edges.filter(edge => edge.source === node.id || edge.target === node.id)
      .map(edge => relationLabels[edge.label] || edge.label);
    if (relations.length) {
      const relation = make('div', 'small-muted harmony-wheel-card-relation', [...new Set(relations)].join(' / '));
      card.insertBefore(relation, card.firstChild);
    }
    cardGrid.appendChild(card);
  });
  details.appendChild(cardGrid);
  layout.appendChild(details);
  container.appendChild(layout);

  function paint() {
    const relationLabels = { fifth: translate('neo_harmony_rel_fifth'), relative: translate('neo_harmony_rel_relative'),
      'I–ii': translate('neo_harmony_rel_ii'), 'I→V7/vi': translate('neo_harmony_rel_relative_dominant'),
      'ii→V7': translate('neo_harmony_rel_ii_v'), 'third°': translate('neo_harmony_rel_third_diminished'),
      '7th-upper°': translate('neo_harmony_rel_upper_diminished'),
      '7th-fifth°': translate('neo_harmony_rel_fifth_diminished'),
      'dim-third-cycle': translate('neo_harmony_rel_dim_cycle'),
      'V7→I': translate('neo_harmony_rel_dominant'), 'V7→i': translate('neo_harmony_rel_minor_dominant'),
      'vii°→I': translate('neo_harmony_rel_diminished') };
    const activeIds = new Set(wheel.nodes.filter(node => node.identity === selected).map(node => node.id));
    const nearby = new Set(activeIds);
    edgeElements.forEach(({ edge, line }) => {
      const active = activeIds.has(edge.source) || activeIds.has(edge.target);
      line.classList.toggle('is-active', active);
      if (active) { nearby.add(edge.source); nearby.add(edge.target); }
    });
    nodeElements.forEach(({ node, group }) => {
      group.classList.toggle('is-selected', activeIds.has(node.id));
      group.classList.toggle('is-nearby', nearby.has(node.id));
    });
    const examples = [...new Set(edgeElements.filter(({ edge }) => activeIds.has(edge.source) || activeIds.has(edge.target))
      .map(({ edge }) => {
        const other = activeIds.has(edge.source) ? nodes.get(edge.target) : nodes.get(edge.source);
        return `${relationLabels[edge.relation] || edge.relation}: ${other.label}`;
      }))];
    status.textContent = `${currentChord} · ${examples.join('  /  ') || translate('neo_harmony_no_match')}`;
  }
  function choose(node) {
    selected = node.identity; currentChord = node.chord;
    paint(); onSelect?.(node.chord);
  }
  paint();
  return () => {};
}

// All layout and interaction coordinates use CSS pixels. DPR is applied once.
export function layoutNeoGraph(nodes, width, size = 22, spacing = 100, forceRows = false) {
  const cardWidth = Math.max(76, size * 3.7);
  const cardHeight = Math.max(46, size * 2.2);
  const gap = Math.max(22, spacing * .28);
  const levels = [...new Set(nodes.map(node => node.depth || 0))].sort((a, b) => a - b);
  const positions = new Map();
  const oneLayer = !forceRows && levels.length === 2 && width >= 540 && nodes.length <= 13 && size <= 28;
  let height;
  if (oneLayer) {
    height = Math.max(390, spacing * 2 + 190);
    const center = { x: width / 2, y: height / 2 };
    nodes.filter(node => !node.depth).forEach(node => positions.set(node.id, center));
    const neighbors = nodes.filter(node => node.depth);
    neighbors.forEach((node, index) => {
      const angle = -Math.PI / 2 + index * Math.PI * 2 / neighbors.length;
      positions.set(node.id, {
        x: center.x + (width / 2 - cardWidth / 2 - 28) * Math.cos(angle),
        y: center.y + (height / 2 - cardHeight / 2 - 24) * Math.sin(angle),
      });
    });
    const points = [...positions.values()];
    if (points.some((point, index) => points.slice(index + 1).some(other =>
      Math.abs(point.x - other.x) < cardWidth + 12 && Math.abs(point.y - other.y) < cardHeight + 12
    ))) return layoutNeoGraph(nodes, width, size, spacing, true);
  } else {
    const columns = Math.max(1, Math.floor((width - 32 + gap) / (cardWidth + gap)));
    let y = 36 + cardHeight / 2;
    levels.forEach(depth => {
      const level = nodes.filter(node => (node.depth || 0) === depth);
      for (let start = 0; start < level.length; start += columns) {
        const row = level.slice(start, start + columns);
        row.forEach((node, index) => positions.set(node.id, {
          x: width / 2 + (index - (row.length - 1) / 2) * (cardWidth + gap), y,
        }));
        y += cardHeight + Math.max(34, spacing * .5);
      }
      y += Math.max(20, spacing * .25);
    });
    height = Math.max(320, y - spacing * .5);
  }
  return { positions, height, cardWidth, cardHeight };
}

export function mountNeoCanvas(container, graph, options) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', `${graph.center} 和弦变换图 下方提供可选择的和弦列表`);
  const toolbar = document.createElement('div');
  toolbar.className = 'neo-graph-toolbar';
  const caption = document.createElement('span');
  caption.textContent = `${graph.nodes.length} 个和弦 / ${Math.max(...graph.nodes.map(n => n.depth || 0))} 层`;
  const actions = document.createElement('div');
  toolbar.append(caption, actions);
  container.append(toolbar, canvas);
  const legend = document.createElement('div');
  legend.className = 'neo-graph-legend';
  legend.innerHTML = '<span><i></i>基本变换</span><span><i class="is-extended"></i>扩展变换</span><span class="neo-graph-help">点击和弦继续探索</span>';
  container.append(legend);
  const ctx = canvas.getContext('2d');
  const state = options.state;
  let layout, width = 0, height = 0, dpr = 1, hovered = null, drag = null;
  let destroyed = false;
  const offsets = options.offsets;
  const nodesById = new Map(graph.nodes.map(node => [node.id, node]));
  const abort = new AbortController();
  const listen = (target, type, listener, extra = {}) => target.addEventListener(type, listener, { signal: abort.signal, ...extra });
  const position = node => {
    const base = layout.positions.get(node.id);
    const offset = offsets[node.id] || { x: 0, y: 0 };
    return { x: (base.x + offset.x) * state.scale + state.offsetX, y: (base.y + offset.y) * state.scale + state.offsetY };
  };
  const point = event => {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * width / rect.width, y: (event.clientY - rect.top) * height / rect.height };
  };
  function hitAt(point) {
    return [...graph.nodes].reverse().find(node => {
      const p = position(node);
      return Math.abs(point.x - p.x) <= layout.cardWidth * state.scale / 2 + 3 && Math.abs(point.y - p.y) <= layout.cardHeight * state.scale / 2 + 3;
    });
  }
  function fit() {
    state.scale = Math.min(1, (height - 20) / layout.height);
    state.offsetX = width * (1 - state.scale) / 2;
    state.offsetY = (height - layout.height * state.scale) / 2;
    state._initialized = true;
    render();
  }
  function zoom(factor, anchor = { x: width / 2, y: height / 2 }) {
    const previous = state.scale;
    state.scale = Math.max(.2, Math.min(3, previous * factor));
    state.offsetX = anchor.x - (anchor.x - state.offsetX) * state.scale / previous;
    state.offsetY = anchor.y - (anchor.y - state.offsetY) * state.scale / previous;
    render();
  }
  for (const [label, title, action] of [['−', '缩小', () => zoom(1 / 1.2)], ['+', '放大', () => zoom(1.2)], ['适应画布', '适应画布', fit]]) {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = label; button.setAttribute('aria-label', title);
    listen(button, 'click', action); actions.append(button);
  }
  function render() {
    if (destroyed || !layout) return;
    const styles = getComputedStyle(container);
    const color = name => styles.getPropertyValue(name).trim();
    const text = color('--theme-text'), muted = color('--theme-muted');
    const accent = color('--theme-accent'), ink = color('--theme-accent-ink');
    const paper = color('--theme-panel'), line = color('--theme-line-strong');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const related = new Set(hovered ? [hovered.id] : []);
    graph.edges.forEach(edge => {
      if (hovered && (edge.source === hovered.id || edge.target === hovered.id)) { related.add(edge.source); related.add(edge.target); }
    });
    graph.edges.forEach(edge => {
      const source = nodesById.get(edge.source), target = nodesById.get(edge.target);
      if (!source || !target) return;
      const from = position(source), to = position(target);
      const selected = hovered && (source.id === hovered.id || target.id === hovered.id);
      ctx.globalAlpha = hovered ? (selected ? .9 : .12) : .48;
      ctx.strokeStyle = selected ? accent : line;
      ctx.lineWidth = selected ? 1.5 : 1;
      ctx.setLineDash(edge.isPrimary ? [] : [4, 4]);
      ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(to.x, to.y); ctx.stroke();
    });
    ctx.setLineDash([]);
    graph.nodes.forEach(node => {
      const p = position(node), root = node.group === 'center';
      const w = layout.cardWidth * state.scale, h = layout.cardHeight * state.scale;
      ctx.globalAlpha = hovered && !related.has(node.id) ? .4 : 1;
      ctx.beginPath(); ctx.roundRect(p.x - w / 2, p.y - h / 2, w, h, 5 * state.scale);
      ctx.fillStyle = root ? accent : paper; ctx.fill();
      ctx.strokeStyle = root || node.id === hovered?.id ? accent : line;
      ctx.lineWidth = node.id === hovered?.id ? 1.6 : 1;
      ctx.stroke();
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = root ? ink : text;
      ctx.font = `600 ${13 * state.scale}px "Segoe UI", sans-serif`;
      ctx.fillText(node.chord, p.x, p.y - 7 * state.scale, w - 10 * state.scale);
      ctx.fillStyle = root ? ink : muted;
      ctx.font = `${10 * state.scale}px "Consolas", monospace`;
      ctx.fillText(root ? '起始和弦' : node.operation || node.label || '', p.x, p.y + 11 * state.scale, w - 8 * state.scale);
    });
    ctx.globalAlpha = 1;
  }
  function resize() {
    const nextWidth = Math.round(container.clientWidth);
    if (!nextWidth) return;
    const nextDpr = Math.min(window.devicePixelRatio || 1, 3);
    if (nextWidth === width && nextDpr === dpr) return;
    width = nextWidth; dpr = nextDpr;
    layout = layoutNeoGraph(graph.nodes, width, options.size, options.spacing);
    height = Math.min(620, layout.height);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    canvas.style.width = '100%'; canvas.style.height = `${height}px`;
    fit();
  }
  listen(canvas, 'contextmenu', event => event.preventDefault());
  listen(canvas, 'pointerdown', event => {
    if (event.button !== 0 && event.button !== 2) return;
    const p = point(event), hit = hitAt(p);
    drag = { start: p, last: p, node: event.button === 2 ? hit : null, moved: false, button: event.button };
    canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = 'grabbing';
  });
  listen(canvas, 'pointermove', event => {
    const p = point(event);
    if (drag) {
      const dx = p.x - drag.last.x, dy = p.y - drag.last.y;
      if (Math.hypot(p.x - drag.start.x, p.y - drag.start.y) > 4) drag.moved = true;
      if (drag.node) {
        const offset = offsets[drag.node.id] ||= { x: 0, y: 0 };
        offset.x += dx / state.scale; offset.y += dy / state.scale;
      } else { state.offsetX += dx; state.offsetY += dy; }
      drag.last = p; render();
    } else {
      hovered = hitAt(p); canvas.style.cursor = hovered ? 'pointer' : 'grab'; render();
    }
  });
  listen(canvas, 'pointerup', event => {
    if (!drag) return;
    const hit = !drag.moved && drag.button === 0 ? hitAt(point(event)) : null;
    drag = null; canvas.releasePointerCapture(event.pointerId); canvas.style.cursor = 'grab';
    if (hit && hit.group !== 'center') options.onSelect(hit.chord);
  });
  listen(canvas, 'pointercancel', () => { drag = null; });
  listen(canvas, 'pointerleave', () => { if (!drag) { hovered = null; render(); } });
  listen(canvas, 'wheel', event => { event.preventDefault(); zoom(event.deltaY > 0 ? .9 : 1.1, point(event)); }, { passive: false });
  listen(canvas, 'dblclick', fit);
  const observer = new ResizeObserver(resize); observer.observe(container);
  resize();
  return () => { destroyed = true; observer.disconnect(); abort.abort(); };
}

// 乐理闯关的图示：钢琴键盘、五线谱（四种谱号、大谱表）、时值树、五度圈（含轴心）、音级钟面（含负和声镜像轴）、
// 和弦循环环、拍子分组、方块序列（和弦进行 / 曲式 / 序列）、音分标尺、吉他弦
// 每个图都是内联 SVG，颜色跟随主题变量；可点击的部分会发声（由调用方传入 play）。
// 每个部件都登记了名字和包围盒：引导卡一步一步讲时，用 setMarks 把正在讲的部件圈出来并贴上名字。
import { renderStaff, chooseClef } from './staff_svg.js?v=20261002-fix';
import { GAP, svgNode, positionY, drawLines, drawClef, drawBrace, drawNote, drawRest, placePitch } from './staff_diagram.js?v=20261002-r19';

const SVG = 'http://www.w3.org/2000/svg';
const CIRCLE = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭', 'F'];
const CIRCLE_ASCII = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
const MINORS = ['a', 'e', 'b', 'f♯', 'c♯', 'g♯', 'e♭', 'b♭', 'f', 'c', 'g', 'd'];
const MINOR_ASCII = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
const PC_OF = { C: 0, G: 7, D: 2, A: 9, E: 4, B: 11, 'F#': 6, Db: 1, Ab: 8, Eb: 3, Bb: 10, F: 5 };
const norm = (name) => String(name).replace('♯', '#').replace('♭', 'b');
const ENHARMONIC = { 'C#': 'Db', Gb: 'F#', 'G#': 'Ab', 'D#': 'Eb', 'A#': 'Bb', Cb: 'B', 'E#': 'F', Fb: 'E', 'B#': 'C' };
const circleIndex = (name) => {
  const n = norm(name);
  return CIRCLE_ASCII.indexOf(ENHARMONIC[n] && !CIRCLE_ASCII.includes(n) ? ENHARMONIC[n] : n);
};
const minorIndex = (name) => {
  const n = norm(name);
  const up = n[0].toUpperCase() + n.slice(1);
  return MINOR_ASCII.indexOf(ENHARMONIC[up] && !MINOR_ASCII.includes(up) ? ENHARMONIC[up] : up);
};
const PC_NAMES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
const WHITE_PCS = [0, 2, 4, 5, 7, 9, 11];

/** 文字宽度估算（中日文按 1 个字号，其他按 0.6 个字号） */
export function textWidth(text, size = 12) {
  return [...String(text)].reduce((sum, ch) => sum + (/[⺀-鿿豈-﫿＀-￯　-〿]/.test(ch) ? size : size * 0.62), 0);
}

function add(parent, tag, attrs = {}, text) {
  const el = document.createElementNS(SVG, tag);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, String(value)));
  if (text !== undefined) el.textContent = text;
  parent.appendChild(el);
  return el;
}
const polar = (cx, cy, r, index, count = 12) => {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
  return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
};

/** 一张图：根 SVG + 部件登记表（名字 → 包围盒与元素） */
function canvas(width, height, label) {
  const root = document.createElementNS(SVG, 'svg');
  root.setAttribute('class', 'learn-visual-svg');
  root.setAttribute('role', 'img');
  root.setAttribute('aria-label', label || '');
  const parts = new Map();
  const reg = (id, box, el) => {
    const old = parts.get(id);
    if (old) {
      const x = Math.min(old.box.x, box.x); const y = Math.min(old.box.y, box.y);
      old.box = { x, y, w: Math.max(old.box.x + old.box.w, box.x + box.w) - x, h: Math.max(old.box.y + old.box.h, box.y + box.h) - y };
      if (el) old.els.push(el);
    } else parts.set(id, { box: { ...box }, els: el ? [el] : [] });
  };
  return { root, parts, reg, width, height };
}
const circleBox = (x, y, r) => ({ x: x - r, y: y - r, w: 2 * r, h: 2 * r });
const clickable = (el, play, notes) => {
  if (!play) return;
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => play(notes));
};

/** 五度圈：外圈大调、内圈关系小调；highlight / inner 高亮，target 画箭头，axis 连成多边形。部件：M:C、m:A、center */
function circleOfFifths({ highlight = [], inner = [], target, axis = false } = {}, { play } = {}) {
  const c = canvas(260, 260, 'circle of fifths');
  const { root } = c;
  const cx = 130; const cy = 130;
  add(root, 'circle', { cx, cy, r: 118, class: 'lv-ring' });
  add(root, 'circle', { cx, cy, r: 76, class: 'lv-ring lv-ring-inner' });
  const lit = new Set(highlight.map(circleIndex));
  const litInner = new Set(inner.map(minorIndex));
  if (axis && lit.size > 1) {
    const pts = [...lit].sort((a, b) => a - b).map((i) => polar(cx, cy, 98, i).join(','));
    add(root, 'polygon', { points: pts.join(' '), class: 'lv-axis' });
  }
  if (target !== undefined && highlight.length) {
    const [x1, y1] = polar(cx, cy, 98, circleIndex(highlight[0]));
    const [x2, y2] = polar(cx, cy, 98, circleIndex(target));
    add(root, 'line', { x1, y1, x2, y2, class: 'lv-arrow' });
  }
  CIRCLE.forEach((name, i) => {
    const [x, y] = polar(cx, cy, 98, i);
    const g = add(root, 'g', { class: `lv-node${lit.has(i) ? ' is-lit' : ''}${target !== undefined && circleIndex(target) === i ? ' is-target' : ''}` });
    add(g, 'circle', { cx: x, cy: y, r: 17 });
    add(g, 'text', { x, y: y + 5, 'text-anchor': 'middle' }, name);
    const pc = PC_OF[CIRCLE_ASCII[i]];
    clickable(g, play, [60 + pc, 64 + pc, 67 + pc]);
    c.reg(`M:${CIRCLE_ASCII[i]}`, circleBox(x, y, 17), g);
    const [mx, my] = polar(cx, cy, 58, i);
    const m = add(root, 'g', { class: `lv-node lv-minor${litInner.has(i) ? ' is-lit' : ''}` });
    add(m, 'circle', { cx: mx, cy: my, r: 13 });
    add(m, 'text', { x: mx, y: my + 4, 'text-anchor': 'middle' }, MINORS[i]);
    const mpc = (pc + 9) % 12;
    clickable(m, play, [57 + mpc, 60 + mpc, 64 + mpc]);
    c.reg(`m:${MINOR_ASCII[i]}`, circleBox(mx, my, 13), m);
  });
  const center = add(root, 'text', { x: cx, y: cy + 4, 'text-anchor': 'middle', class: 'lv-caption' }, '↻ 5  ↺ 4');
  c.reg('center', { x: cx - 30, y: cy - 10, w: 60, h: 20 }, center);
  return c;
}

/** 音级钟面：0–11；pcs 高亮；mirror 为镜像轴（两倍音级值）。部件：pc0…pc11、mirror */
function pcClock({ pcs = [], mirror, names = false } = {}, { play } = {}) {
  const c = canvas(220, 220, 'pitch-class clock');
  const { root } = c;
  const cx = 110; const cy = 110;
  add(root, 'circle', { cx, cy, r: 92, class: 'lv-ring' });
  if (mirror !== undefined) {
    const half = mirror / 2;
    const [x1, y1] = polar(cx, cy, 104, half);
    const [x2, y2] = polar(cx, cy, 104, half + 6);
    const line = add(root, 'line', { x1, y1, x2, y2, class: 'lv-mirror' });
    c.reg('mirror', { x: Math.min(x1, x2) - 3, y: Math.min(y1, y2) - 3, w: Math.abs(x2 - x1) + 6, h: Math.abs(y2 - y1) + 6 }, line);
  }
  const lit = new Set(pcs.map((p) => ((p % 12) + 12) % 12));
  if (lit.size > 1) add(root, 'polygon', { points: [...lit].sort((a, b) => a - b).map((p) => polar(cx, cy, 92, p).join(',')).join(' '), class: 'lv-axis' });
  for (let pc = 0; pc < 12; pc += 1) {
    const [x, y] = polar(cx, cy, 92, pc);
    const g = add(root, 'g', { class: `lv-node${lit.has(pc) ? ' is-lit' : ''}` });
    add(g, 'circle', { cx: x, cy: y, r: 15 });
    add(g, 'text', { x, y: y + 5, 'text-anchor': 'middle' }, pc === 10 ? 't' : pc === 11 ? 'e' : String(pc));
    if (names) {
      const [nx, ny] = polar(cx, cy, 64, pc);
      add(root, 'text', { x: nx, y: ny + 4, 'text-anchor': 'middle', class: 'lv-caption' }, PC_NAMES[pc]);
    }
    clickable(g, play, [60 + pc]);
    c.reg(`pc${pc}`, circleBox(x, y, 15), g);
  }
  return c;
}

/** 循环环：labels 排成一圈，mark 为问号位置。部件：n0… */
function ring({ labels = [], mark, edges = [] } = {}) {
  const n = labels.length;
  const c = canvas(240, 240, 'cycle');
  const { root } = c;
  const cx = 120; const cy = 120;
  add(root, 'circle', { cx, cy, r: 88, class: 'lv-ring' });
  // 相邻两个和弦之间的变换名（P、L、R……）写在弧线外侧
  edges.forEach((label, i) => {
    if (!label) return;
    const [ex, ey] = polar(cx, cy, 110, i + 0.5, n);
    const e = add(root, 'text', { x: ex, y: ey + 4, 'text-anchor': 'middle', class: 'lv-edge' }, label);
    c.reg(`e${i}`, { x: ex - 8, y: ey - 9, w: 16, h: 16 }, e);
  });
  labels.forEach((label, i) => {
    const [x, y] = polar(cx, cy, 88, i, n);
    const g = add(root, 'g', { class: `lv-node${i === mark ? ' is-target' : i === 0 ? ' is-lit' : ''}` });
    add(g, 'circle', { cx: x, cy: y, r: 22 });
    add(g, 'text', { x, y: y + 5, 'text-anchor': 'middle' }, i === mark ? '?' : label);
    c.reg(`n${i}`, circleBox(x, y, 22), g);
  });
  add(root, 'text', { x: cx, y: cy + 5, 'text-anchor': 'middle', class: 'lv-caption' }, `${n}`);
  return c;
}

/**
 * 拍子分组：rows = [{ label, groups: [3, 2], sub: 2|3 }]（也可直接给 groups）；每组第一拍是重音，sub 在每拍下面画细分的小点。
 * 部件：r0、g0-1（第 0 行第 1 组；第 0 行也可以写 g1）、b0-1-2（第 0 行第 1 组第 2 拍）
 */
function beats({ groups, rows, sub } = {}) {
  const list = rows || [{ groups: groups || [2, 2], sub }];
  const labelWidth = Math.max(0, ...list.map((r) => (r.label ? textWidth(r.label, 12) + 10 : 0)));
  const cell = 26; const inner = 3; const between = 12;
  const rowWidth = (r) => r.groups.reduce((sum, size) => sum + size * cell + (size - 1) * inner + 8, 0) + (r.groups.length - 1) * between;
  const width = Math.max(120, labelWidth + Math.max(...list.map(rowWidth)) + 8);
  const rowHeight = list.some((r) => r.sub) ? 52 : 40;
  const c = canvas(width, list.length * rowHeight + 4, 'beats');
  list.forEach((row, r) => {
    const y = 4 + r * rowHeight;
    if (row.label) add(c.root, 'text', { x: 0, y: y + 21, class: 'lv-row-label' }, row.label);
    let x = labelWidth + (width - labelWidth - rowWidth(row)) / 2;
    row.groups.forEach((size, i) => {
      const gw = size * cell + (size - 1) * inner + 8;
      const g = add(c.root, 'g', { class: 'lv-beat-group' });
      add(g, 'rect', { x, y, width: gw, height: cell + 8, rx: 9, class: 'lv-beat-bg' });
      for (let j = 0; j < size; j += 1) {
        const bx = x + 4 + j * (cell + inner);
        const b = add(g, 'g', { class: `lv-beat${j === 0 ? ' is-strong' : ''}` });
        add(b, 'rect', { x: bx, y: y + 4, width: cell, height: cell, rx: 6 });
        add(b, 'text', { x: bx + cell / 2, y: y + 22, 'text-anchor': 'middle' }, j === 0 ? '>' : '·');
        if (row.sub) {
          for (let k = 0; k < row.sub; k += 1) add(c.root, 'circle', { cx: bx + (cell / (row.sub + 1)) * (k + 1), cy: y + cell + 16, r: 2.4, class: 'lv-sub' });
        }
        c.reg(`b${r}-${i}-${j}`, { x: bx, y: y + 4, w: cell, h: cell }, b);
      }
      const box = { x, y, w: gw, h: cell + 8 + (row.sub ? 12 : 0) };
      c.reg(`g${r}-${i}`, box, g);
      if (r === 0) c.reg(`g${i}`, box, g);
      c.reg(`r${r}`, box);
      x += gw + between;
    });
  });
  return c;
}

/** 琴键下方的小标注：太长就缩小字号，免得和隔壁的挤在一起 */
function keyLabel(parent, x, y, text, room) {
  const label = add(parent, 'text', { x, y, 'text-anchor': 'middle', class: 'lv-key-label' }, text);
  const width = textWidth(text, 11);
  if (width > room) label.setAttribute('style', `font-size:${Math.max(7, (11 * room) / width).toFixed(1)}px`);
  return label;
}

/** 钢琴键盘：from–to（MIDI），lit 点亮，names = 'white' | 'lit' | 'c' | false，labels = { midi: 文字 }。部件：k60… */
function piano({ from = 60, to = 72, lit = [], names = 'c', labels = {} } = {}, { play } = {}) {
  let low = from; while (!WHITE_PCS.includes(((low % 12) + 12) % 12)) low -= 1;
  let high = to; while (!WHITE_PCS.includes(((high % 12) + 12) % 12)) high += 1;
  const whites = [];
  for (let m = low; m <= high; m += 1) if (WHITE_PCS.includes(m % 12)) whites.push(m);
  const ww = 24; const wh = 96; const bw = 14; const bh = 60;
  const hasLabels = Object.keys(labels).length > 0;
  const blackLabels = Object.keys(labels).some((m) => !WHITE_PCS.includes(((Number(m) % 12) + 12) % 12));
  const c = canvas(whites.length * ww + 2, wh + (hasLabels ? 22 : 2) + (blackLabels ? 14 : 0), 'keyboard');
  const litSet = new Set(lit);
  const whiteLayer = add(c.root, 'g', {});
  const blackLayer = add(c.root, 'g', {});
  const nameOf = (m) => `${PC_NAMES[m % 12].replace('E♭', 'D♯').replace('A♭', 'G♯').replace('B♭', 'A♯')}`;
  whites.forEach((m, i) => {
    const x = 1 + i * ww;
    const g = add(whiteLayer, 'g', { class: `lv-key white${litSet.has(m) ? ' is-lit' : ''}` });
    add(g, 'rect', { x, y: 1, width: ww - 1, height: wh, rx: 4 });
    const show = names === 'white' || (names === 'lit' && litSet.has(m)) || (names === 'c' && (m % 12 === 0 || litSet.has(m)));
    if (show) add(g, 'text', { x: x + ww / 2 - 0.5, y: wh - 8, 'text-anchor': 'middle' }, m % 12 === 0 ? `C${m / 12 - 1}` : nameOf(m));
    clickable(g, play, [m]);
    c.reg(`k${m}`, { x, y: 1, w: ww - 1, h: wh }, g);
    if (labels[m]) keyLabel(c.root, x + ww / 2, wh + 16, labels[m], ww - 2);
    const black = m + 1;
    if ([0, 2, 5, 7, 9].includes(m % 12) && black <= high) {
      const bx = x + ww - bw / 2 - 0.5;
      const b = add(blackLayer, 'g', { class: `lv-key black${litSet.has(black) ? ' is-lit' : ''}` });
      add(b, 'rect', { x: bx, y: 1, width: bw, height: bh, rx: 3 });
      if (names === 'lit' && litSet.has(black)) add(b, 'text', { x: bx + bw / 2, y: bh - 6, 'text-anchor': 'middle' }, nameOf(black).replace('♯', '#'));
      clickable(b, play, [black]);
      c.reg(`k${black}`, { x: bx, y: 1, w: bw, h: bh }, b);
      // 黑键的标注放在第二排，免得和旁边白键的标注挤在一起
      if (labels[black]) keyLabel(c.root, bx + bw / 2, wh + 30, labels[black], ww + 8);
    }
  });
  return c;
}

/**
 * 五线谱示意：staves = [{ clef }]（两行并加 brace 就是大谱表），notes = [{ p: 'C4', s: 0, d: 'q', col, dot, acc: true, label }]
 * 部件：clef0、staff0、line0-1…line0-5、space0-1…space0-4、n0（音符）、head0、ledger0、label0、brace、system
 */
function notation({ staves = [{ clef: 'treble' }], brace = false, notes = [], cols, stackGap = 50, colWidth = 46, keySignature } = {}, { play } = {}) {
  const columnCount = cols ?? Math.max(1, ...notes.map((n, i) => (n.col ?? i) + 1));
  const left = brace ? 22 : 4;
  const noteStart = left + 52;
  const step = colWidth;
  const width = noteStart + columnCount * step + 4;
  const tops = staves.map((_, s) => 26 + s * (4 * GAP + stackGap));
  const placed = notes.map((n, i) => ({ ...n, s: n.s ?? 0, col: n.col ?? i }));
  // 同一列、同一行谱表里相隔二度的两个音：上面那个往右错开（手动给了 dx 的不动）
  const groups = new Map();
  placed.forEach((n) => {
    const p = placePitch(staves[n.s]?.clef || 'treble', n.p);
    if (!p) return;
    const key = `${n.s}:${n.col}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ n, position: p.position });
  });
  groups.forEach((list) => {
    list.sort((a, b) => a.position - b.position);
    list.forEach((item, k) => {
      const prev = list[k - 1];
      if (prev && item.position - prev.position === 1 && item.n.dx === undefined && !prev.shifted) { item.n.dx = 13; item.shifted = true; }
    });
  });
  const lowest = Math.max(tops[tops.length - 1] + 4 * GAP, ...placed.map((n) => {
    const p = placePitch(staves[n.s]?.clef || 'treble', n.p);
    return p ? positionY(tops[n.s], p.position) + 8 : 0;
  }));
  const hasLabels = placed.some((n) => n.label);
  const labelLines = Math.max(1, ...placed.map((n) => (Array.isArray(n.label) ? n.label.length : 1)));
  const highest = Math.min(0, ...placed.map((n) => {
    const p = placePitch(staves[n.s]?.clef || 'treble', n.p);
    return p ? positionY(tops[n.s], p.position) - (n.label ? 56 : 40) : 0;
  }));
  // 写在最下面一行谱表下方的标注共用一条基线：低于这行谱表和其中最低的音
  const lastTop = tops[tops.length - 1];
  const bottomLabelY = Math.max(lastTop + 4 * GAP + 20, ...placed.filter((n) => n.s === staves.length - 1).map((n) => {
    const p = placePitch(staves[n.s]?.clef || 'treble', n.p);
    return p ? positionY(lastTop, p.position) + 20 : 0;
  }));
  const c = canvas(width, Math.max(lowest + (hasLabels ? 12 + labelLines * 15 : 8), hasLabels ? bottomLabelY + labelLines * 15 : 0), 'staff');
  c.offsetY = highest;
  staves.forEach((staff, s) => {
    const top = tops[s];
    const g = add(c.root, 'g', { class: 'lv-staff' });
    const lines = drawLines(g, { x: left, width: width - left, top });
    c.reg(`staff${s}`, lines.box, g);
    lines.lines.forEach((line, k) => c.reg(`line${s}-${k + 1}`, line.box, line.el));
    lines.spaces.forEach((space, k) => c.reg(`space${s}-${k + 1}`, space.box));
    const clef = drawClef(g, staff.clef, { x: left + 6, top });
    c.reg(`clef${s}`, clef.box, clef.el);
  });
  if (brace && staves.length > 1) {
    const b = drawBrace(c.root, { x: 2, top: tops[0], bottom: tops[tops.length - 1] + 4 * GAP });
    c.reg('brace', b.box, b.el);
    // 大谱表右端的竖线也连起来
    add(c.root, 'line', { x1: width - 0.5, x2: width - 0.5, y1: tops[0], y2: tops[tops.length - 1] + 4 * GAP, class: 'sd-line sd-system' });
  }
  c.reg('system', { x: left, y: tops[0], w: width - left, h: tops[tops.length - 1] + 4 * GAP - tops[0] });
  placed.forEach((n, i) => {
    const clefId = staves[n.s]?.clef || 'treble';
    const p = placePitch(clefId, n.p);
    if (!p) return;
    const x = noteStart + (n.col ?? i) * step + step / 2 - 8 + (n.dx ?? 0);
    const note = drawNote(c.root, { x, top: tops[n.s], position: p.position, duration: n.d || 'q', dot: n.dot, accidental: n.acc || p.accidental ? p.accidental : undefined, className: n.lit ? 'is-lit' : '' });
    clickable(note.el, play, [midiOf(p)]);
    note.el.setAttribute('data-col', String(n.group ?? n.col ?? i));
    if (n.part !== undefined) note.el.setAttribute('data-part', String(n.part));
    c.reg(`n${i}`, note.box, note.el);
    c.reg(`head${i}`, note.head);
    note.ledgers.forEach((l) => c.reg(`ledger${i}`, { x: x - 12, y: Number(l.getAttribute('y1')) - 2, w: 24, h: 4 }, l));
    if (n.label) {
      // 大谱表上面那行的标注写在谱表上方，其余写在谱表下方；labelAt: 'bottom' 一律写在最下面一行谱表的下方，并且排在同一条基线上
      const above = n.labelAt === 'bottom' ? false : n.labelAt ? n.labelAt === 'above' : staves.length > 1 && n.s < staves.length - 1;
      const ly = n.labelAt === 'bottom' ? bottomLabelY : above ? Math.min(tops[n.s] - 12, note.y - 40) : Math.max(tops[n.s] + 4 * GAP + 20, note.y + 20);
      // 标注可以是几行（如 级数 / 功能 / 和弦音），一行一行往下排
      const lines = Array.isArray(n.label) ? n.label : [n.label];
      lines.forEach((line, k) => {
        const t = add(c.root, 'text', { x, y: ly + k * 15, 'text-anchor': 'middle', class: `lv-note-label${k ? ' is-sub' : ''}`, 'data-col': n.group ?? n.col ?? i }, line);
        c.reg(`label${i}`, { x: x - textWidth(line, 12) / 2, y: Number(t.getAttribute('y')) - 12, w: textWidth(line, 12), h: 15 }, t);
      });
    }
  });
  return c;
}
const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const midiOf = (p) => 12 * (p.octave + 1) + LETTER_PC[p.letter] + p.accidental;

/**
 * 时值：rows 每行是一个时值字母（'w' 'h' 'q' 'e' 's'：按 1、2、4、8、16 个排满一行），
 * 或 { seq: [{ d, dot, tie }, '=', '+', …] } 的自由序列；labels 为每行左边的文字。部件：row0、n0-1
 */
function values({ rows = ['w', 'h', 'q', 'e'], labels = [] } = {}) {
  const COUNT = { w: 1, h: 2, q: 4, e: 8, s: 16 };
  const labelWidth = Math.max(0, ...labels.map((l) => textWidth(l || '', 12) + 12));
  const width = labelWidth + 330;
  // 有连音记号（3、2）的图每行多留一点高度，数字才不会跑到上一行
  const rowHeight = rows.some((row) => row.tuplet) ? 70 : 54;
  const c = canvas(width, rows.length * rowHeight + 6, 'note values');
  rows.forEach((row, r) => {
    const top = 6 + r * rowHeight + (rowHeight > 54 ? 14 : 0); // 位置 2（第二线）大约在一行的下半
    const headY = positionY(top, 2);
    if (labels[r]) add(c.root, 'text', { x: 0, y: headY + 4, class: 'lv-row-label' }, labels[r]);
    const items = typeof row === 'string' ? Array.from({ length: COUNT[row] }, () => ({ d: row })) : row.seq;
    const slot = 330 / items.length;
    let previous = null;
    items.forEach((item, i) => {
      const x = labelWidth + slot * i + slot / 2;
      if (typeof item === 'string') {
        add(c.root, 'text', { x, y: headY + 5, 'text-anchor': 'middle', class: 'lv-op' }, item);
        previous = null;
        return;
      }
      const note = item.rest ? drawRest(c.root, { x, top: top - 10, duration: item.d, dots: item.dot ? 1 : 0 }) : drawNote(c.root, { x, top, position: 2, duration: item.d, dot: item.dot });
      if (item.tie && previous) {
        add(c.root, 'path', { d: `M ${previous.x + 4} ${headY + 7} Q ${(previous.x + x) / 2} ${headY + 18} ${x - 4} ${headY + 7}`, class: 'lv-tie' });
      }
      c.reg(`n${r}-${i}`, note.box, note.el);
      c.reg(`row${r}`, note.box);
      previous = { x };
    });
    if (row.tuplet) {
      const xs = items.map((_, i) => labelWidth + slot * i + slot / 2);
      const t = add(c.root, 'text', { x: (Math.min(...xs) + Math.max(...xs)) / 2 + 6, y: headY - 38, 'text-anchor': 'middle', class: 'lv-tuplet' }, row.tuplet);
      c.reg(`row${r}`, { x: Math.min(...xs), y: headY - 48, w: 10, h: 12 }, t);
    }
  });
  return c;
}

/**
 * 方块序列：rows = [{ label, cells: [{ text, sub, lit, play }] | 'text', arrows }]
 * 用来画和弦进行、曲式段落、终止式、序列等。部件：c0-1（第 0 行第 1 格）、row0
 */
function blocks({ rows = [], cellMin = 40 } = {}, { play } = {}) {
  const gap = 6; const arrowGap = 16;
  const normalized = rows.map((row) => ({ ...row, cells: row.cells.map((cell) => (typeof cell === 'string' ? { text: cell } : cell)) }));
  const labelWidth = Math.max(0, ...normalized.map((r) => (r.label ? textWidth(r.label, 12) + 12 : 0)));
  const cellWidth = (cell) => Math.max(cellMin, textWidth(cell.text, 15) + 18, cell.sub ? textWidth(cell.sub, 11) + 14 : 0) + (cell.wide ? 30 : 0);
  const rowWidth = (row) => row.cells.reduce((sum, cell) => sum + cellWidth(cell), 0) + (row.cells.length - 1) * (row.arrows ? arrowGap : gap);
  const width = labelWidth + Math.max(80, ...normalized.map(rowWidth)) + 4;
  const rowHeights = normalized.map((row) => (row.cells.some((cell) => cell.sub) ? 52 : 40));
  const height = rowHeights.reduce((a, b) => a + b + 10, 0);
  const c = canvas(width, height, 'blocks');
  let y = 2;
  normalized.forEach((row, r) => {
    const h = rowHeights[r];
    if (row.label) add(c.root, 'text', { x: 0, y: y + h / 2 + 4, class: 'lv-row-label' }, row.label);
    let x = labelWidth + (width - labelWidth - rowWidth(row)) / 2;
    row.cells.forEach((cell, i) => {
      const w = cellWidth(cell);
      const g = add(c.root, 'g', { class: `lv-block${cell.lit ? ' is-lit' : ''}${cell.dim ? ' is-dim' : ''}` });
      add(g, 'rect', { x, y, width: w, height: h, rx: 10 });
      add(g, 'text', { x: x + w / 2, y: y + (cell.sub ? 22 : h / 2 + 5), 'text-anchor': 'middle', class: 'lv-block-text' }, cell.text);
      if (cell.sub) add(g, 'text', { x: x + w / 2, y: y + 41, 'text-anchor': 'middle', class: 'lv-block-sub' }, cell.sub);
      if (cell.play) clickable(g, play, cell.play);
      c.reg(`c${r}-${i}`, { x, y, w, h }, g);
      c.reg(`row${r}`, { x, y, w, h });
      x += w;
      if (i < row.cells.length - 1) {
        if (row.arrows) add(c.root, 'text', { x: x + arrowGap / 2, y: y + h / 2 + 5, 'text-anchor': 'middle', class: 'lv-op' }, '→');
        x += row.arrows ? arrowGap : gap;
      }
    });
    y += h + 10;
  });
  return c;
}

/** 音分标尺：from–to，ticks = [{ at, label, lit, up }]，spans = [{ from, to, label }]。部件：t0…、s0… */
function ruler({ from = 0, to = 1200, ticks = [], spans = [], width = 340, unit = '¢' } = {}) {
  const c = canvas(width, 96, 'cents ruler');
  const x0 = 14; const x1 = width - 14; const y = 52;
  const at = (v) => x0 + ((v - from) / (to - from)) * (x1 - x0);
  add(c.root, 'line', { x1: x0, x2: x1, y1: y, y2: y, class: 'lv-ruler' });
  [from, to].forEach((v) => add(c.root, 'text', { x: at(v), y: y + 34, 'text-anchor': 'middle', class: 'lv-caption' }, `${v}${unit}`));
  spans.forEach((span, i) => {
    const a = at(span.from); const b = at(span.to);
    const g = add(c.root, 'g', { class: 'lv-span' });
    add(g, 'rect', { x: a, y: y - 5, width: Math.max(2, b - a), height: 10, rx: 4 });
    if (span.label) add(g, 'text', { x: (a + b) / 2, y: y + 22, 'text-anchor': 'middle' }, span.label);
    c.reg(`s${i}`, { x: a, y: y - 6, w: Math.max(4, b - a), h: 30 }, g);
  });
  ticks.forEach((tick, i) => {
    const x = at(tick.at);
    const up = tick.up !== false;
    const g = add(c.root, 'g', { class: `lv-tick${tick.lit ? ' is-lit' : ''}` });
    add(g, 'line', { x1: x, x2: x, y1: y - 10, y2: y + 10 });
    add(g, 'circle', { cx: x, cy: y, r: 4 });
    add(g, 'text', { x, y: up ? y - 16 : y + 26, 'text-anchor': 'middle' }, tick.label ?? `${tick.at}`);
    const tw = textWidth(tick.label ?? `${tick.at}`, 11);
    c.reg(`t${i}`, { x: x - Math.max(6, tw / 2), y: up ? y - 28 : y - 10, w: Math.max(12, tw), h: 40 }, g);
  });
  return c;
}

/** 吉他弦：strings 从最低音到最高音（图上最高音弦在上），frets 品数，dots = [{ s, f }]。部件：s0…、nut */
function strings({ strings: names = ['E', 'A', 'D', 'G', 'B', 'E'], midis = [], frets = 5, dots = [] } = {}, { play } = {}) {
  const gap = 18; const fretW = 46;
  const width = 30 + frets * fretW + 8;
  const c = canvas(width, names.length * gap + 14, 'guitar strings');
  const yOf = (s) => 10 + (names.length - 1 - s) * gap;
  for (let f = 0; f <= frets; f += 1) add(c.root, 'line', { x1: 30 + f * fretW, x2: 30 + f * fretW, y1: yOf(names.length - 1), y2: yOf(0), class: f === 0 ? 'lv-nut' : 'lv-fret' });
  c.reg('nut', { x: 27, y: yOf(names.length - 1) - 4, w: 6, h: yOf(0) - yOf(names.length - 1) + 8 });
  names.forEach((name, s) => {
    const y = yOf(s);
    const g = add(c.root, 'g', { class: 'lv-string' });
    add(g, 'line', { x1: 30, x2: width - 8, y1: y, y2: y, 'stroke-width': 1 + (names.length - 1 - s) * 0.25 });
    add(g, 'text', { x: 14, y: y + 4, 'text-anchor': 'middle' }, name);
    if (midis[s] !== undefined) clickable(g, play, [midis[s]]);
    c.reg(`s${s}`, { x: 4, y: y - 8, w: width - 12, h: 16 }, g);
  });
  dots.forEach(({ s, f }, i) => {
    const x = 30 + (f - 0.5) * fretW;
    const dot = add(c.root, 'circle', { cx: x, cy: yOf(s), r: 6, class: 'lv-fret-dot' });
    c.reg(`d${i}`, circleBox(x, yOf(s), 7), dot);
  });
  return c;
}

/**
 * 塔形图：中间一个和弦，上面一排、下面一排，用线连到中间（如减七和弦与周围的属七、半减七）
 * 部件：center、top、bottom、t0…、b0…
 */
function tower({ center = '', above = [], below = [], aboveLabel = '', belowLabel = '' } = {}) {
  const boxW = 66; const gap = 10;
  const rowW = (count) => count * boxW + (count - 1) * gap;
  const width = Math.max(rowW(above.length), rowW(below.length), 120) + 20;
  const c = canvas(width, 250, 'tower');
  const centerBox = { x: width / 2 - 50, y: 104, w: 100, h: 42 };
  const row = (items, y, prefix) => {
    const start = (width - rowW(items.length)) / 2;
    items.forEach((text, i) => {
      const x = start + i * (boxW + gap);
      add(c.root, 'line', { x1: x + boxW / 2, y1: y + (y < centerBox.y ? 36 : 0), x2: width / 2, y2: y < centerBox.y ? centerBox.y : centerBox.y + centerBox.h, class: 'lv-tower-link' });
      const g = add(c.root, 'g', { class: `lv-block lv-tower-${prefix}` });
      add(g, 'rect', { x, y, width: boxW, height: 36, rx: 10 });
      add(g, 'text', { x: x + boxW / 2, y: y + 23, 'text-anchor': 'middle', class: 'lv-block-text lv-tower-text' }, text);
      c.reg(`${prefix}${i}`, { x, y, w: boxW, h: 36 }, g);
      c.reg(prefix === 't' ? 'top' : 'bottom', { x, y, w: boxW, h: 36 });
    });
  };
  row(above, 34, 't');
  row(below, 180, 'b');
  const g = add(c.root, 'g', { class: 'lv-block is-lit' });
  add(g, 'rect', { x: centerBox.x, y: centerBox.y, width: centerBox.w, height: centerBox.h, rx: 12 });
  add(g, 'text', { x: width / 2, y: centerBox.y + 27, 'text-anchor': 'middle', class: 'lv-block-text' }, center);
  c.reg('center', centerBox, g);
  if (aboveLabel) add(c.root, 'text', { x: width / 2, y: 22, 'text-anchor': 'middle', class: 'lv-row-label lv-tower-caption' }, aboveLabel);
  if (belowLabel) add(c.root, 'text', { x: width / 2, y: 238, 'text-anchor': 'middle', class: 'lv-row-label lv-tower-caption' }, belowLabel);
  return c;
}

/** 五线谱（自动排版的小谱例，不能标注）：notes 依次排成一小节；chord: true 时叠成一个和弦 */
function staff({ notes = [], clef, chord = false } = {}) {
  const pitches = notes.filter(Boolean);
  const bars = chord ? [[{ p: pitches, d: 4 }]] : [pitches.map((p) => ({ p, d: 1 }))];
  const el = renderStaff({ staves: [{ clef: clef || chooseClef(pitches), bars }], beats: chord ? 4 : Math.max(1, pitches.length), top: 30, rowGap: 34, ariaLabel: pitches.join(' ') });
  el.classList.add('learn-staff');
  return el;
}

const BUILDERS = { circle: circleOfFifths, clock: pcClock, ring, beats, piano, notation, values, blocks, ruler, strings, tower };
export const VISUAL_KINDS = [...Object.keys(BUILDERS), 'staff', 'keys'];

/** 每种图上可以圈出的部件名（用于内容校验）；返回登记表 */
export function visualParts(visual) {
  const make = BUILDERS[visual?.kind];
  if (!make) return new Map();
  return make(visual, {}).parts;
}

const MARGIN = { x: 14, top: 34, bottom: 34 };

/** 把 marks（{ at: [部件…], label, place: 'above'|'below' } 或其数组）画到标注层上 */
function drawMarks(layer, parts, marks, view) {
  layer.replaceChildren();
  parts.forEach((part) => part.els.forEach((el) => el.classList?.remove('lv-marked')));
  const list = [].concat(marks ?? []).filter(Boolean);
  const placed = [];
  list.forEach((mark, index) => {
    const found = [].concat(mark.at ?? []).map((id) => parts.get(id)).filter(Boolean);
    if (!found.length) return;
    const x = Math.min(...found.map((p) => p.box.x)) - 4;
    const y = Math.min(...found.map((p) => p.box.y)) - 4;
    const w = Math.max(...found.map((p) => p.box.x + p.box.w)) + 4 - x;
    const h = Math.max(...found.map((p) => p.box.y + p.box.h)) + 4 - y;
    found.forEach((p) => p.els.forEach((el) => el.classList?.add('lv-marked')));
    const g = svgNode(layer, 'g', { class: `lv-mark lv-mark-${index % 3}` });
    svgNode(g, 'rect', { x, y, width: w, height: h, rx: Math.min(10, h / 2), class: 'lv-mark-box' });
    if (!mark.label) return;
    // 图比较窄时把字缩小，保证标签整个落在画面里
    const size = Math.max(8, Math.min(12, (12 * (view.w - 24)) / textWidth(mark.label, 12)));
    const pillW = textWidth(mark.label, size) + 16; const pillH = 20;
    let px = x + w / 2 - pillW / 2;
    px = Math.max(view.x + 2, Math.min(view.x + view.w - pillW - 2, px));
    // 候选位置：先放偏好的一边，放不下（出画面或压住别的标签）就换另一边，再一层层往外挪
    const first = mark.place || 'above';
    const sides = [first, first === 'above' ? 'below' : 'above'];
    const collides = (py) => placed.some((q) => px < q.x + q.w && px + pillW > q.x && py < q.y + q.h && py + pillH > q.y);
    const inside = (py) => py >= view.y + 1 && py + pillH <= view.y + view.h - 1;
    const candidates = [0, 1, 2].flatMap((layer) => sides.map((side) => ({ side, py: side === 'above' ? y - pillH - 5 - layer * (pillH + 3) : y + h + 5 + layer * (pillH + 3) })));
    const choice = candidates.find((c) => inside(c.py) && !collides(c.py)) || candidates.find((c) => inside(c.py)) || candidates[0];
    const place = choice.side;
    const py = Math.max(view.y + 1, Math.min(view.y + view.h - pillH - 1, choice.py));
    placed.push({ x: px, y: py, w: pillW, h: pillH });
    const anchorY = place === 'above' ? y : y + h;
    const pillEdge = place === 'above' ? py + pillH : py;
    svgNode(g, 'line', { x1: Math.max(px + 8, Math.min(px + pillW - 8, x + w / 2)), x2: x + w / 2, y1: pillEdge, y2: anchorY, class: 'lv-mark-stem' });
    svgNode(g, 'rect', { x: px, y: py, width: pillW, height: pillH, rx: 10, class: 'lv-mark-pill' });
    const label = svgNode(g, 'text', { x: px + pillW / 2, y: py + 14, 'text-anchor': 'middle', class: 'lv-mark-text' }, mark.label);
    if (size < 12) label.setAttribute('style', `font-size:${size.toFixed(1)}px`);
  });
}

/** 入口：按 kind 画图（keys 由界面自己的小键盘负责）。返回的元素带 setMarks(marks) 方法 */
export function renderVisual(visual, options = {}) {
  if (!visual) return null;
  const wrap = document.createElement('div');
  wrap.className = `learn-visual lv-${visual.kind}`;
  try {
    if (visual.kind === 'staff') {
      wrap.appendChild(staff(visual));
      wrap.setMarks = () => {};
    } else {
      const make = BUILDERS[visual.kind];
      if (!make) return null;
      const c = make(visual, options);
      const annotate = Boolean(options.annotate);
      const offsetY = c.offsetY ?? 0;
      const view = annotate
        ? { x: -MARGIN.x, y: offsetY - MARGIN.top, w: c.width + 2 * MARGIN.x, h: c.height - offsetY + MARGIN.top + MARGIN.bottom }
        : { x: -2, y: offsetY - 2, w: c.width + 4, h: c.height - offsetY + 4 };
      c.root.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`);
      c.root.style.maxWidth = `${Math.round(Math.min(560, view.w * (visual.kind === 'circle' || visual.kind === 'clock' || visual.kind === 'ring' ? 1.05 : 1.25)))}px`;
      const layer = svgNode(c.root, 'g', { class: 'lv-marks' });
      wrap.appendChild(c.root);
      wrap.parts = c.parts;
      wrap.setMarks = (marks) => drawMarks(layer, c.parts, marks, view);
    }
  } catch (error) {
    return null;
  }
  if (visual.caption) {
    const cap = document.createElement('p');
    cap.className = 'learn-visual-caption';
    cap.textContent = visual.caption;
    wrap.appendChild(cap);
  }
  return wrap;
}

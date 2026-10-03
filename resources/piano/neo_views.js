// 和声连接论的两种新视图 + 五线谱
//  · 音网图（Tonnetz）：纯五度从左到右，大三度从左上到右下，小三度从左下到右上；三个音的三角形就是大 / 小三和弦。
//    P、R、L 分别沿纯五度、大三度、小三度那条边把三角形翻过去；S、N、H 的定义：ref:omt2e-neo-riemannian
//  · 八音塔：每一层中间是一个减七和弦，降低它任意一个音得到属七、升高得到半减七（4 + 4 个，即 Boretz 区域）；
//    上一层的 X 属七与下一层同根音的 X 半减七相连（八声区域），三层首尾相接：ref:arxiv-mohanty ref:mto-mcclimon
//    Douthett 与 Steinbach 的 Power Towers 在"桥"里还放了小七和弦；这里按 Cohn 的画法，不画小七和弦。
//  · 五线谱：把当前和弦和它的邻居（或一条路径）写在谱表上
import { renderVisual } from './learn_visuals.js?v=20261003-r31';
import { parseChordSymbol } from './chord_symbols.js?v=20261002-alt3';

const SVG_NS = 'http://www.w3.org/2000/svg';
const NAMES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
const ASCII = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const mod = (n) => ((n % 12) + 12) % 12;

function node(parent, tag, attrs = {}, text) {
  const el = globalThis.document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
  if (text !== undefined) el.textContent = text;
  parent?.appendChild(el);
  return el;
}

const TEXT = {
  zh: { tree: '树状图', plr: 'PLR', snh: 'S · N · H', tonnetzHint: '三角形 = 三和弦：朝下的是大三和弦，朝上的是小三和弦。点一个三角形就换到那个和弦。', tower: '八音塔', towerHint: '每层中间是减七和弦；降低一个音 → 属七（下排），升高一个音 → 半减七（上排）。相邻两层之间，同根音的属七和半减七连在一起（八声区域）。点一个和弦就换过去。', towerNoMinor: 'Douthett 与 Steinbach 的 Power Towers 在层与层之间还放了小七和弦，这里按 Cohn 的画法没有画出。', wrap: '↺ 接回最上层', notInTower: '八音塔里只有属七、半减七和减七和弦；先显示 C 减七所在的塔。', staff: '五线谱', staffPath: '路径写在五线谱上', floor: (n) => `第 ${n} 层` },
  ja: { tree: 'ツリー', plr: 'PLR', snh: 'S · N · H', tonnetzHint: '三角形 = 三和音：下向きが長三和音、上向きが短三和音。三角形をクリックするとその和音へ。', tower: '八音塔', towerHint: '各層の中央は減七の和音。1 音下げる → 属七（下段）、1 音上げる → 半減七（上段）。隣の層どうしは同じ根音の属七と半減七がつながります（八音領域）。クリックで切り替え。', towerNoMinor: 'Douthett と Steinbach の Power Towers では層の間に短七の和音もありますが、ここでは Cohn の描き方にならい省略しています。', wrap: '↺ いちばん上へ戻る', notInTower: '八音塔にあるのは属七・半減七・減七だけです。C 減七の塔を表示します。', staff: '五線譜', staffPath: '経路を五線譜に', floor: (n) => `第 ${n} 層` },
  en: { tree: 'Tree', plr: 'PLR', snh: 'S · N · H', tonnetzHint: 'Each triangle is a triad: pointing down = major, pointing up = minor. Click a triangle to move there.', tower: 'Octatonic tower', towerHint: 'Each floor has a diminished seventh in the middle; lower one note → a dominant seventh (bottom row), raise one → a half-diminished seventh (top row). Between floors, the dominant and half-diminished sevenths on the same root are joined (octatonic regions). Click to move.', towerNoMinor: 'Douthett and Steinbach’s Power Towers also place minor sevenths between floors; this drawing follows Cohn and leaves them out.', wrap: '↺ back to the top', notInTower: 'The tower holds only dominant, half-diminished and diminished sevenths; showing the tower of C°7.', staff: 'Staff', staffPath: 'The path on the staff', floor: (n) => `Floor ${n}` },
};
const lang = () => (globalThis.window?.__lang || globalThis.document?.documentElement?.lang || 'zh').slice(0, 2);
const tt = () => TEXT[lang()] || TEXT.zh;

/** 读三和弦名：C、Cmaj、Cm、C#min、Db- …（不认识返回 null） */
export function parseTriad(name) {
  const m = /^\s*([A-Ga-g])([#b♯♭]?)\s*(maj|major|M|min|minor|m|-)?\s*$/.exec(String(name));
  if (!m) return null;
  const pc = mod(LETTER_PC[m[1].toUpperCase()] + (m[2] === '#' || m[2] === '♯' ? 1 : m[2] ? -1 : 0));
  const minor = /^(min|minor|m|-)$/.test(m[3] || '');
  return { pc, minor };
}
const triadName = ({ pc, minor }, ascii = false) => `${(ascii ? ASCII : NAMES)[pc]}${minor ? 'm' : ''}`;

/** 变换：OMT 5.14 的定义（P 同根音、R 关系、L 导音交换；S 滑动、N、H 六声极） */
export function transform(triad, op) {
  const { pc, minor } = triad;
  const to = (root, isMinor) => ({ pc: mod(root), minor: isMinor });
  switch (op) {
    case 'P': return to(pc, !minor);
    case 'R': return minor ? to(pc + 3, false) : to(pc + 9, true);
    case 'L': return minor ? to(pc + 8, false) : to(pc + 4, true);
    case 'S': return minor ? to(pc - 1, false) : to(pc + 1, true);
    case 'N': return minor ? to(pc - 5, false) : to(pc + 5, true);
    case 'H': return minor ? to(pc + 4, false) : to(pc + 8, true);
    default: return triad;
  }
}

/**
 * 音网图：格点 (i, j) 的音级 = 7i + 4j（i 往右一格 = 纯五度，往右下 = 大三度，往右上 = 小三度）
 * mode：'plr' | 'snh'；onPick(名字) 点三角形时调用
 */
export function renderTonnetz(container, chordName, { mode = 'plr', onPick } = {}) {
  container.replaceChildren();
  const triad = parseTriad(chordName);
  const W = 64; const H = 56; const cols = 9; const rows = 5;
  // 每往下一行右移半格，整体是平行四边形：宽度要算上这部分
  const width = cols * W + (rows - 1) * (W / 2) - (rows / 2) * (W / 2) + W + 20; const height = rows * H + 30;
  const svg = node(null, 'svg', { viewBox: `-20 -20 ${width + 20} ${height}`, class: 'neo-tonnetz', role: 'img', 'aria-label': 'Tonnetz' });
  const center = triad ? triad : { pc: 0, minor: false };
  // 让当前和弦落在中间：左上角的音级
  const ci = 3; const cj = 2;
  const origin = mod(center.pc - 7 * ci - 4 * cj - (center.minor ? 4 : 0));
  const pcAt = (i, j) => mod(origin + 7 * i + 4 * j);
  const xy = (i, j) => [i * W + j * (W / 2) - (rows / 2) * (W / 2) + W, j * H];
  const triangles = [];
  for (let j = 0; j < rows - 1; j += 1) {
    for (let i = 0; i < cols - 1; i += 1) {
      // 朝下：(i,j)(i+1,j)(i,j+1) = 大三和弦（根音 = (i,j)）
      triangles.push({ pts: [xy(i, j), xy(i + 1, j), xy(i, j + 1)], triad: { pc: pcAt(i, j), minor: false } });
      // 朝上：(i+1,j)(i,j+1)(i+1,j+1) = 小三和弦（根音 = (i,j+1)）
      triangles.push({ pts: [xy(i + 1, j), xy(i, j + 1), xy(i + 1, j + 1)], triad: { pc: pcAt(i, j + 1), minor: true } });
    }
  }
  const centroid = (t) => [t.pts.reduce((s, p) => s + p[0], 0) / 3, t.pts.reduce((s, p) => s + p[1], 0) / 3];
  const same = (a, b) => a.pc === b.pc && a.minor === b.minor;
  const current = triangles.filter((t) => same(t.triad, center)).sort((a, b) => Math.hypot(centroid(a)[0] - width / 2, centroid(a)[1] - height / 2) - Math.hypot(centroid(b)[0] - width / 2, centroid(b)[1] - height / 2))[0];
  const ops = mode === 'snh' ? ['S', 'N', 'H'] : ['P', 'L', 'R'];
  const targets = new Map();
  if (current) {
    ops.forEach((op) => {
      const want = transform(center, op);
      const [cx, cy] = centroid(current);
      const best = triangles.filter((t) => same(t.triad, want)).sort((a, b) => Math.hypot(centroid(a)[0] - cx, centroid(a)[1] - cy) - Math.hypot(centroid(b)[0] - cx, centroid(b)[1] - cy))[0];
      if (best) targets.set(best, op);
    });
  }
  const layer = node(svg, 'g');
  triangles.forEach((t) => {
    const op = targets.get(t);
    const cls = `neo-tri${t.triad.minor ? ' is-minor' : ''}${t === current ? ' is-current' : ''}${op ? ` is-target op-${op}` : ''}`;
    const g = node(layer, 'g', { class: cls, tabindex: 0, role: 'button', 'aria-label': triadName(t.triad) });
    node(g, 'polygon', { points: t.pts.map((p) => p.join(',')).join(' ') });
    const [x, y] = centroid(t);
    node(g, 'text', { x, y: y + 4, 'text-anchor': 'middle', class: 'neo-tri-name' }, triadName(t.triad));
    if (op) node(g, 'text', { x, y: y + (t.triad.minor ? 18 : -9), 'text-anchor': 'middle', class: 'neo-tri-op' }, op);
    const pick = () => onPick?.(triadName(t.triad, true));
    g.addEventListener('click', pick);
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
  });
  // 格点上的音名
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      const [x, y] = xy(i, j);
      const pc = pcAt(i, j);
      const inCurrent = current && [current.triad.pc, current.triad.pc + (current.triad.minor ? 3 : 4), current.triad.pc + 7].map(mod).includes(pc) && current.pts.some((p) => p[0] === x && p[1] === y);
      const g = node(svg, 'g', { class: `neo-tone${inCurrent ? ' is-current' : ''}` });
      node(g, 'circle', { cx: x, cy: y, r: 13 });
      node(g, 'text', { x, y: y + 4, 'text-anchor': 'middle' }, NAMES[pc]);
    }
  }
  container.appendChild(svg);
  const legend = globalThis.document.createElement('p');
  legend.className = 'small-muted neo-view-hint';
  legend.textContent = tt().tonnetzHint;
  container.appendChild(legend);
  return { current: current?.triad, neighbours: [...targets.entries()].map(([tri, op]) => ({ op, triad: tri.triad, name: triadName(tri.triad, true) })) };
}

/** 读七和弦：C7 / Cm7b5 / Cø7 / Cdim7 / C°7 → { pc, type: 'dom' | 'half' | 'dim' }（其他返回 null） */
export function parseSeventh(name) {
  const parsed = parseChordSymbol(name);
  if (!parsed) return null;
  const type = { dom7: 'dom', halfDim7: 'half', dim7: 'dim' }[parsed.quality];
  if (!type) return null;
  const pc = mod(LETTER_PC[parsed.root[0]] + (parsed.root.includes('#') ? 1 : parsed.root.includes('b') ? -1 : 0));
  return { pc, type };
}

/** 减七和弦（用最低音级 0、1、2 代表三种）里含的音级 */
const dimNotes = (k) => [0, 3, 6, 9].map((d) => mod(k + d));
/** 一层：中心减七 k；属七的根音 = 每个音降半音；半减七的根音 = 每个音本身（升高一个音后的和弦根音） */
export function towerFloor(k) {
  return { dim: mod(k) % 3, domRoots: dimNotes(k).map((n) => mod(n - 1)), halfRoots: dimNotes(k) };
}

export function renderTower(container, chordName, { onPick } = {}) {
  container.replaceChildren();
  const t = tt();
  let chord = parseSeventh(chordName);
  if (!chord) {
    const note = globalThis.document.createElement('p');
    note.className = 'small-muted';
    note.textContent = t.notInTower;
    container.appendChild(note);
    chord = { pc: 0, type: 'dim' };
  }
  // 当前和弦所在的那一层：减七 → 自己；半减七 → 根音所在的减七；属七 → 根音 + 1 所在的减七
  const startDim = chord.type === 'dim' ? chord.pc % 3 : chord.type === 'half' ? chord.pc % 3 : mod(chord.pc + 1) % 3;
  // 下一层 = 中心减七低半音的那一层（上一层属七的根音 = 下一层减七的音）
  const floors = [0, 1, 2].map((n) => towerFloor(mod(startDim - n)));
  const boxW = 74; const gapX = 12; const rowH = 34; const floorGap = 26;
  const width = 4 * boxW + 3 * gapX + 40;
  const floorH = rowH * 3 + 60;
  const height = floors.length * floorH + (floors.length - 1) * floorGap + 40;
  const svg = node(null, 'svg', { viewBox: `0 0 ${width} ${height}`, class: 'neo-tower', role: 'img', 'aria-label': t.tower });
  const name = (pc, type, ascii) => `${(ascii ? ASCII : NAMES)[pc]}${type === 'dom' ? '7' : type === 'half' ? (ascii ? 'm7b5' : 'ø7') : (ascii ? 'dim7' : '°7')}`;
  const isCurrent = (pc, type) => chord.pc === pc && chord.type === type || (type === 'dim' && chord.type === 'dim' && chord.pc % 3 === pc % 3);
  const box = (x, y, w, pc, type) => {
    const g = node(svg, 'g', { class: `neo-tower-box is-${type}${isCurrent(pc, type) ? ' is-current' : ''}`, tabindex: 0, role: 'button' });
    node(g, 'rect', { x, y, width: w, height: rowH, rx: 9 });
    node(g, 'text', { x: x + w / 2, y: y + rowH / 2 + 5, 'text-anchor': 'middle' }, name(pc, type));
    const pick = () => onPick?.(name(pc, type, true));
    g.addEventListener('click', pick);
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    return { cx: x + w / 2, top: y, bottom: y + rowH };
  };
  // 每一层的上排顺序沿用上一层下排（属七）的根音顺序，桥才会上下对齐
  let order = floors[0].halfRoots;
  const bottoms = [];
  floors.forEach((floor, f) => {
    const y0 = 20 + f * (floorH + floorGap);
    node(svg, 'rect', { x: 6, y: y0 - 8, width: width - 12, height: floorH - 4, rx: 16, class: 'neo-tower-floor' });
    node(svg, 'text', { x: 14, y: y0 + 6, class: 'neo-tower-floor-label' }, t.floor(f + 1));
    const halfOrder = order.filter((r) => floor.halfRoots.includes(r));
    const domOrder = [...floor.domRoots].sort((a, b) => a - b);
    const xs = (i) => 20 + i * (boxW + gapX);
    const centerY = y0 + rowH + 22;
    const centerBox = { cx: width / 2, top: centerY, bottom: centerY + rowH };
    const tops = halfOrder.map((pc, i) => box(xs(i), y0 + 8, boxW, pc, 'half'));
    const dims = box(width / 2 - 60, centerY, 120, floor.halfRoots[0], 'dim');
    const downs = domOrder.map((pc, i) => box(xs(i), centerY + rowH + 22, boxW, pc, 'dom'));
    tops.forEach((b) => node(svg, 'line', { x1: b.cx, y1: b.bottom, x2: centerBox.cx, y2: dims.top, class: 'neo-tower-link' }));
    downs.forEach((b) => node(svg, 'line', { x1: b.cx, y1: b.top, x2: centerBox.cx, y2: dims.bottom, class: 'neo-tower-link' }));
    if (f > 0) bottoms[f - 1].forEach((b, i) => node(svg, 'line', { x1: b.cx, y1: b.bottom, x2: tops[i].cx, y2: tops[i].top, class: 'neo-tower-bridge' }));
    bottoms.push(downs);
    order = domOrder;
  });
  svg.querySelectorAll('.neo-tower-box').forEach((b) => svg.appendChild(b)); // 方块画在连线上面
  node(svg, 'text', { x: width / 2, y: height - 10, 'text-anchor': 'middle', class: 'neo-tower-wrap' }, t.wrap);
  container.appendChild(svg);
  [t.towerHint, t.towerNoMinor].forEach((text) => {
    const p = globalThis.document.createElement('p');
    p.className = 'small-muted neo-view-hint';
    p.textContent = text;
    container.appendChild(p);
  });
}

/** 把几个和弦（名字）写在五线谱上：每个和弦一列，下面标名字 */
export function renderChordStaff(container, chordNames, title) {
  const notes = [];
  chordNames.forEach((label, col) => {
    const parsed = parseChordSymbol(label);
    const pitches = parsed?.pitches || [];
    const shown = label.replace(/^([A-G])#/, '$1♯').replace(/^([A-G])b/, '$1♭').replace('m7b5', 'ø7').replace('dim7', '°7');
    pitches.forEach((p, i) => notes.push({ p, col, d: 'w', ...(i === 0 ? { label: shown } : {}) }));
  });
  if (!notes.length) return null;
  const wrap = globalThis.document.createElement('div');
  wrap.className = 'neo-staff';
  if (title) { const h = globalThis.document.createElement('h4'); h.className = 'section-title'; h.textContent = title; wrap.appendChild(h); }
  const pic = renderVisual({ kind: 'notation', staves: [{ clef: 'treble' }], notes, cols: chordNames.length }, {});
  if (pic) wrap.appendChild(pic);
  container.appendChild(wrap);
  return wrap;
}

export const neoViewText = tt;

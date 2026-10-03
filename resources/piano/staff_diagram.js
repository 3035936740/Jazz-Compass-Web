// 五线谱示意图的绘制工具（SVG）：谱表、四种谱号、符头（含加线、符干、符尾、附点、临时记号）、大谱表花括号
// 供"五线谱"工具和乐理闯关的图示共用；每个部件都返回包围盒，方便在图上圈出来标注
// 谱号与位置的规则见 staff_reading.js：ref:omt2e-notation ref:omt2e-clefs ref:wiki-clef ref:omt2e-keyboard
import { CLEFS, positionToPitch, pitchToPosition, ledgerPositions, LETTERS } from './staff_reading.js';

export const SVG_NS = 'http://www.w3.org/2000/svg';
export const GAP = 10; // 相邻两条线的距离

export function svgNode(parent, tag, attrs = {}, text) {
  const element = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, String(value)));
  if (text !== undefined) element.textContent = text;
  parent?.appendChild(element);
  return element;
}

/** 谱表几何：top = 第五线的 y；位置 p 的 y */
export const positionY = (top, position) => top + 4 * GAP - position * (GAP / 2);

/** 画一行谱表的五条线；返回每条线、每个间的包围盒（从下往上 1 起） */
export function drawLines(parent, { x, width, top }) {
  const lines = []; const spaces = [];
  for (let k = 1; k <= 5; k += 1) {
    const y = positionY(top, (k - 1) * 2);
    const el = svgNode(parent, 'line', { x1: x, x2: x + width, y1: y, y2: y, class: 'sd-line' });
    lines.push({ el, box: { x, y: y - 2, w: width, h: 4 } });
  }
  for (let k = 1; k <= 4; k += 1) {
    const y = positionY(top, k * 2 - 1);
    spaces.push({ box: { x, y: y - GAP / 2 + 1.5, w: width, h: GAP - 3 } });
  }
  return { lines, spaces, box: { x, y: top, w: width, h: 4 * GAP } };
}

/** C 谱号：两根竖线 + 上下两个弯，中心对准它标出的那条线 */
function drawCClef(parent, x, centerY) {
  const g = svgNode(parent, 'g', { class: 'sd-clef sd-cclef' });
  const top = centerY - 2 * GAP; const bottom = centerY + 2 * GAP;
  svgNode(g, 'rect', { x, y: top, width: 3.6, height: 4 * GAP });
  svgNode(g, 'rect', { x: x + 5.6, y: top, width: 1.4, height: 4 * GAP });
  const lobe = (dir) => `M ${x + 7} ${centerY} L ${x + 10} ${centerY - dir * 4} C ${x + 13} ${centerY - dir * 9} ${x + 17} ${centerY - dir * 7} ${x + 17} ${centerY - dir * 10.5}`
    + ` C ${x + 17} ${centerY - dir * 18} ${x + 21} ${centerY - dir * 20.5} ${x + 14} ${centerY - dir * 19.5} C ${x + 11} ${centerY - dir * 19} ${x + 10.5} ${centerY - dir * 17} ${x + 12} ${centerY - dir * 16}`;
  svgNode(g, 'path', { d: lobe(1), class: 'sd-cclef-curve' });
  svgNode(g, 'path', { d: lobe(-1), class: 'sd-cclef-curve' });
  return { el: g, box: { x: x - 2, y: top - 2, w: 24, h: 4 * GAP + 4 } };
}

/** 高音谱号（G 谱号）：画成路径，不依赖字体；中心的螺旋绕着第二线（y = 30） */
function drawGClef(parent, x, top) {
  const g = svgNode(parent, 'g', { class: 'sd-clef sd-gclef', transform: `translate(${x} ${top})` });
  svgNode(g, 'path', { class: 'sd-clef-stroke', d: 'M 13 30 C 8.5 30.5 8.5 24.5 13 23.5 C 18.5 22.5 21 29.5 17.5 33.5 C 13.5 38 4.5 37 3.5 29.5 C 2.5 21 11 15.5 15.5 7.5 C 18.5 1.5 18.5 -9 14.5 -11.5 C 10.5 -13.5 8.5 -4 10 4.5 L 14.5 48 C 15 54 9.5 56 7.5 52.5' });
  svgNode(g, 'circle', { cx: 8.6, cy: 50.6, r: 3.1 });
  return { el: g, box: { x: x + 1, y: top - 15, w: 22, h: 4 * GAP + 33 } };
}

/** 低音谱号（F 谱号）：大圆点落在第四线（y = 10），右边两个小点夹住这条线 */
function drawFClef(parent, x, top) {
  const g = svgNode(parent, 'g', { class: 'sd-clef sd-fclef', transform: `translate(${x} ${top})` });
  svgNode(g, 'path', { class: 'sd-clef-stroke', d: 'M 4.5 10 C 4 3.5 9.5 0.5 13.5 1 C 21.5 2 23 12.5 17 20 C 13 25 7.5 29 2 32.5' });
  svgNode(g, 'circle', { cx: 5.5, cy: 10, r: 3.4 });
  svgNode(g, 'circle', { cx: 25, cy: 5, r: 1.8 });
  svgNode(g, 'circle', { cx: 25, cy: 15, r: 1.8 });
  return { el: g, box: { x: x, y: top - 2, w: 29, h: 37 } };
}

/** 谱号：四种都画成路径（中音 / 次中音是同一个 C 谱号，只是中心对准的线不同） */
export function drawClef(parent, clefId, { x, top }) {
  const clef = CLEFS[clefId];
  const markY = positionY(top, (clef.line - 1) * 2);
  if (clefId === 'alto' || clefId === 'tenor') return { ...drawCClef(parent, x + 2, markY), markY };
  return { ...(clefId === 'treble' ? drawGClef(parent, x, top) : drawFClef(parent, x, top)), markY };
}

/** 大谱表左侧的竖线与花括号 */
export function drawBrace(parent, { x, top, bottom }) {
  const g = svgNode(parent, 'g', { class: 'sd-brace' });
  svgNode(g, 'line', { x1: x + 9, x2: x + 9, y1: top, y2: bottom, class: 'sd-line sd-system' });
  const mid = (top + bottom) / 2;
  svgNode(g, 'path', { d: `M ${x + 6} ${top} C ${x - 4} ${top + 10} ${x + 8} ${mid - 12} ${x - 1} ${mid} C ${x + 8} ${mid + 12} ${x - 4} ${bottom - 10} ${x + 6} ${bottom} C ${x + 1} ${bottom - 12} ${x + 12} ${mid + 10} ${x + 1} ${mid} C ${x + 12} ${mid - 10} ${x + 1} ${top + 12} ${x + 6} ${top} Z` });
  return { el: g, box: { x: x - 4, y: top, w: 16, h: bottom - top } };
}


/**
 * 一个音符：position（相对 clef 的位置）、duration：w 全 / h 二分 / q 四分 / e 八分 / s 十六分；dot 附点；accidental 显示的临时记号（undefined 不显示）
 * 返回符头、加线和整个音符的包围盒
 */
export function drawNote(parent, { x, top, position, duration = 'q', dot = false, accidental, className = '' }) {
  const g = svgNode(parent, 'g', { class: `sd-note ${className}` });
  const y = positionY(top, position);
  const ledgers = ledgerPositions(position).map((p) => {
    const ly = positionY(top, p);
    return svgNode(g, 'line', { x1: x - 11, x2: x + 11, y1: ly, y2: ly, class: 'sd-ledger' });
  });
  const hollow = duration === 'w' || duration === 'h';
  svgNode(g, 'ellipse', { cx: x, cy: y, rx: duration === 'w' ? 7.4 : 6.4, ry: 4.6, transform: `rotate(-18 ${x} ${y})`, class: hollow ? 'sd-head hollow' : 'sd-head' });
  let stemTop = y; let stemBottom = y;
  if (duration !== 'w') {
    const up = position < 4;
    const sx = up ? x + 5.8 : x - 5.8;
    const end = up ? y - 32 : y + 32;
    svgNode(g, 'line', { x1: sx, x2: sx, y1: y, y2: end, class: 'sd-stem' });
    stemTop = Math.min(y, end); stemBottom = Math.max(y, end);
    const flags = duration === 'e' ? 1 : duration === 's' ? 2 : 0;
    for (let i = 0; i < flags; i += 1) {
      const fy = end + (up ? i * 7 : -i * 7);
      svgNode(g, 'path', { d: up ? `M ${sx} ${fy} C ${sx + 2} ${fy + 7} ${sx + 10} ${fy + 9} ${sx + 7} ${fy + 18}` : `M ${sx} ${fy} C ${sx + 2} ${fy - 7} ${sx + 10} ${fy - 9} ${sx + 7} ${fy - 18}`, class: 'sd-flag' });
    }
  }
  if (dot) svgNode(g, 'circle', { cx: x + 11, cy: position % 2 === 0 ? y - GAP / 2 : y, r: 1.9, class: 'sd-dot' });
  if (accidental !== undefined) drawAccidental(g, accidental, x - 18, y);
  const left = accidental !== undefined ? x - 23 : ledgers.length ? x - 12 : x - 8;
  const right = dot ? x + 14 : flagsRight(duration, x);
  const boxTop = Math.min(stemTop, y - 6); const boxBottom = Math.max(stemBottom, y + 6);
  return { el: g, head: { x: x - 8, y: y - 6, w: 16, h: 12 }, box: { x: left, y: boxTop, w: right - left, h: boxBottom - boxTop }, ledgers, y };
}
const flagsRight = (duration, x) => (duration === 'e' || duration === 's' ? x + 17 : x + 9);

/** 音名（如 "C4"、"F#3"、"Bb4"）在某个谱号里的位置与升降 */
export function placePitch(clefId, name) {
  const match = /^([A-G])(#{1,2}|♯|b{1,2}|♭)?(-?\d)$/.exec(String(name).trim());
  if (!match) return null;
  const accidental = { '': 0, '#': 1, '##': 2, '♯': 1, b: -1, bb: -2, '♭': -1 }[match[2] || ''];
  const octave = Number(match[3]);
  return { letter: match[1], octave, accidental, position: pitchToPosition(clefId, match[1], octave) };
}

export { positionToPitch, LETTERS };

// ======================= 记谱编辑器用的绘制：和弦、休止符、符杠、连音线、调号、拍号 =======================
// 临时记号写在音符左边、正对它所在的线或间；附点紧跟在音符后面：ref:omt2e-rhythm
// 全休止符挂在线下、二分休止符坐在线上：ref:omt2e-rhythm

/** 临时记号：♯ ♭ ♮ 用文字；重升画成"×"，重降写两个 ♭ */
export function drawAccidental(parent, alter, x, y) {
  if (alter === 2) {
    const g = svgNode(parent, 'g', { class: 'sd-accidental-x' });
    svgNode(g, 'path', { d: `M ${x - 3.4} ${y - 3.4} L ${x + 3.4} ${y + 3.4} M ${x + 3.4} ${y - 3.4} L ${x - 3.4} ${y + 3.4}` });
    return g;
  }
  const glyph = { '-2': '♭♭', '-1': '♭', 0: '♮', 1: '♯' }[alter];
  return svgNode(parent, 'text', { x, y: y + 5, 'text-anchor': 'middle', class: 'sd-accidental' }, glyph);
}

const centsText = (cents) => `${cents > 0 ? '+' : '−'}${Math.abs(cents)}¢`;

/**
 * 一个时值上的若干个音（单音或和弦）：共用一根符干；相邻二度的符头错开；临时记号向左错开几列
 * notes: [{ position, alter（要画的临时记号，undefined 表示不画）, cents }]
 * options: { x, top, duration, dots, stem: 'up'|'down'（不给就按平均位置）, stemEnd（符杠高度，给了就不画符尾）, className }
 */
export function drawChordEvent(parent, { x, top, notes, duration = 'q', dots = 0, stem, stemEnd, className = '' }) {
  const g = svgNode(parent, 'g', { class: `sd-note sd-event ${className}` });
  const sorted = [...notes].sort((a, b) => a.position - b.position);
  const average = sorted.reduce((sum, n) => sum + n.position, 0) / sorted.length;
  const up = stem ? stem === 'up' : average < 4;
  // 符头左右：符干朝上时二度里上面那个往右，朝下时下面那个往左
  const offsets = new Array(sorted.length).fill(0);
  const order = up ? sorted.map((_, i) => i) : sorted.map((_, i) => sorted.length - 1 - i);
  order.forEach((index, k) => {
    if (k === 0) return;
    const previous = order[k - 1];
    if (Math.abs(sorted[index].position - sorted[previous].position) === 1 && offsets[previous] === 0) offsets[index] = up ? 12.4 : -12.4;
  });
  const heads = sorted.map((note, i) => ({ ...note, hx: x + offsets[i], y: positionY(top, note.position) }));
  // 加线（覆盖所有符头的横向范围）
  const minX = Math.min(...heads.map((h) => h.hx)); const maxX = Math.max(...heads.map((h) => h.hx));
  const lowest = sorted[0].position; const highest = sorted[sorted.length - 1].position;
  const ledgerSet = new Set([...ledgerPositions(lowest), ...ledgerPositions(highest)]);
  ledgerSet.forEach((p) => {
    if ((p < 0 && p >= lowest) || (p > 8 && p <= highest)) svgNode(g, 'line', { x1: minX - 11, x2: maxX + 11, y1: positionY(top, p), y2: positionY(top, p), class: 'sd-ledger' });
  });
  const hollow = duration === 'w' || duration === 'h';
  heads.forEach((h) => {
    svgNode(g, 'ellipse', { cx: h.hx, cy: h.y, rx: duration === 'w' ? 7.4 : 6.4, ry: 4.6, transform: `rotate(-18 ${h.hx} ${h.y})`, class: hollow ? 'sd-head hollow' : 'sd-head' });
  });
  // 临时记号：从上往下排，靠得近（六个位置以内）的往左错一列
  let column = 0; let lastPosition = null;
  [...heads].reverse().forEach((h) => {
    if (h.alter === undefined) return;
    column = lastPosition !== null && lastPosition - h.position < 6 ? column + 1 : 0;
    lastPosition = h.position;
    drawAccidental(g, h.alter, minX - 17 - column * 9, h.y);
  });
  // 音分偏移写在符头右上方
  heads.forEach((h) => { if (h.cents) svgNode(g, 'text', { x: maxX + 9, y: h.y - 6, class: 'sd-cents' }, centsText(h.cents)); });
  // 符干、符尾
  let stemX = null; let stemTip = null;
  if (duration !== 'w') {
    stemX = up ? x + 5.8 : x - 5.8;
    const anchor = up ? heads[0].y : heads[heads.length - 1].y;
    const far = up ? heads[heads.length - 1].y : heads[0].y;
    stemTip = stemEnd ?? (up ? far - 32 : far + 32);
    svgNode(g, 'line', { x1: stemX, x2: stemX, y1: anchor, y2: stemTip, class: 'sd-stem' });
    const flags = stemEnd === undefined ? (duration === 'e' ? 1 : duration === 's' ? 2 : 0) : 0;
    for (let i = 0; i < flags; i += 1) {
      const fy = stemTip + (up ? i * 7 : -i * 7);
      svgNode(g, 'path', { d: up ? `M ${stemX} ${fy} C ${stemX + 2} ${fy + 7} ${stemX + 10} ${fy + 9} ${stemX + 7} ${fy + 18}` : `M ${stemX} ${fy} C ${stemX + 2} ${fy - 7} ${stemX + 10} ${fy - 9} ${stemX + 7} ${fy - 18}`, class: 'sd-flag' });
    }
  }
  // 附点：线上的音点在上面的间里
  for (let d = 0; d < dots; d += 1) {
    heads.forEach((h) => svgNode(g, 'circle', { cx: maxX + 11 + d * 5, cy: h.position % 2 === 0 ? h.y - GAP / 2 : h.y, r: 1.9, class: 'sd-dot' }));
  }
  const ys = heads.map((h) => h.y).concat(stemTip ?? []);
  return { el: g, up, stemX, stemTip, heads, box: { x: minX - 20, y: Math.min(...ys) - 6, w: maxX - minX + 34, h: Math.max(...ys) - Math.min(...ys) + 12 } };
}

/** 休止符（画成路径，不依赖字体）；whole 挂在第四线下，half 坐在第三线上 */
export function drawRest(parent, { x, top, duration = 'q', dots = 0, className = '' }) {
  const g = svgNode(parent, 'g', { class: `sd-rest ${className}` });
  const line = (k) => positionY(top, (k - 1) * 2);
  if (duration === 'w') svgNode(g, 'rect', { x: x - 6, y: line(4), width: 12, height: 5 });
  else if (duration === 'h') svgNode(g, 'rect', { x: x - 6, y: line(3) - 5, width: 12, height: 5 });
  else if (duration === 'q') svgNode(g, 'path', { class: 'sd-rest-stroke', d: `M ${x - 2} ${line(5) + 2} L ${x + 4} ${line(4) + 1} L ${x - 3} ${line(3) + 2} L ${x + 4} ${line(2) + 3} C ${x - 4} ${line(2) - 1} ${x - 5} ${line(1) - 1} ${x + 1} ${line(1) + 3}` });
  else {
    const hooks = duration === 's' ? 2 : 1;
    const topY = line(4) - 1;
    svgNode(g, 'line', { x1: x + 4, y1: topY, x2: x - 2, y2: line(1) + (hooks === 2 ? 4 : 0), class: 'sd-rest-stroke' });
    for (let i = 0; i < hooks; i += 1) {
      const hy = topY + i * GAP;
      svgNode(g, 'circle', { cx: x - 3.5, cy: hy + 1, r: 2.6 });
      svgNode(g, 'path', { class: 'sd-rest-stroke', d: `M ${x - 4} ${hy + 3} C ${x - 1} ${hy + 5} ${x + 2} ${hy + 4} ${x + 4 - i * 1.2} ${hy}` });
    }
  }
  for (let d = 0; d < dots; d += 1) svgNode(g, 'circle', { cx: x + 10 + d * 5, cy: line(3) - GAP / 2, r: 1.9, class: 'sd-dot' });
  return { el: g, box: { x: x - 8, y: line(5) - 2, w: 18 + dots * 5, h: 4 * GAP + 4 } };
}

/** 符杠：一组符干末端连成水平的粗线；sixteenths 为需要第二道杠的相邻音下标对 */
export function drawBeams(parent, { stems, up, y, secondary = [] }) {
  const g = svgNode(parent, 'g', { class: 'sd-beams' });
  const thick = 4.4; const dy = up ? 0 : -thick;
  svgNode(g, 'rect', { x: stems[0], y: y + dy, width: stems[stems.length - 1] - stems[0], height: thick });
  secondary.forEach(([a, b]) => {
    const y2 = up ? y + 7 : y - 7 - thick;
    const x1 = stems[a]; const x2 = b === null ? stems[a] + (a === stems.length - 1 ? -8 : 8) : stems[b];
    svgNode(g, 'rect', { x: Math.min(x1, x2), y: y2, width: Math.abs(x2 - x1), height: thick });
  });
  return g;
}

/** 连音线：两个符头之间的弧线，符干朝上画在下面，朝下画在上面 */
export function drawTie(parent, { x1, x2, y, below }) {
  const dir = below ? 1 : -1;
  return svgNode(parent, 'path', { class: 'sd-tie', d: `M ${x1 + 6} ${y + dir * 4} Q ${(x1 + x2) / 2} ${y + dir * 13} ${x2 - 6} ${y + dir * 4} Q ${(x1 + x2) / 2} ${y + dir * 10.5} ${x1 + 6} ${y + dir * 4} Z` });
}

/** 调号：layout 来自 staff_reading.js 的 keySignatureLayout；返回占用的宽度 */
export function drawKeySignature(parent, { x, top, layout }) {
  layout.forEach((item, i) => drawAccidental(parent, item.alter, x + 5 + i * 9, positionY(top, item.position)));
  return layout.length ? layout.length * 9 + 4 : 0;
}

/** 拍号：上下两个数字，分别占谱表上半和下半 */
export function drawTimeSignature(parent, { x, top, meter }) {
  const g = svgNode(parent, 'g', { class: 'sd-meter' });
  svgNode(g, 'text', { x, y: top + 2 * GAP - 1, 'text-anchor': 'middle' }, String(meter[0]));
  svgNode(g, 'text', { x, y: top + 4 * GAP - 1, 'text-anchor': 'middle' }, String(meter[1]));
  return 22;
}

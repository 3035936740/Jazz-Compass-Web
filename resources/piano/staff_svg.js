// 通用五线谱渲染（SVG）：多行谱表、全/二分/四分/八分音符、休止、连线、临时记号、加线、音符下方标注。
// 样式沿用 composition.css 中的 .score-* 类。
import { parsePitch } from './pitch_spelling.js';

const NS = 'http://www.w3.org/2000/svg';
const LINE_GAP = 8;
const CLEF = {
  treble: { glyph: '𝄞', bottom: 4 * 7 + 2, glyphY: 27 }, // 底线 E4
  bass: { glyph: '𝄢', bottom: 2 * 7 + 4, glyphY: 27 },  // 底线 G2
};

function node(tag, attrs = {}, text = '') {
  const element = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, String(value)));
  if (text) element.textContent = text;
  return element;
}

/** 按音域选择谱号：平均音高在 C4 以下用低音谱号 */
export function chooseClef(pitchNames) {
  const midis = pitchNames.flat().map((name) => parsePitch(name)?.midi).filter((m) => m != null);
  if (!midis.length) return 'treble';
  return midis.reduce((a, b) => a + b, 0) / midis.length < 60 ? 'bass' : 'treble';
}

const REST_GLYPH = (d) => (d >= 4 ? '𝄻' : d >= 2 ? '𝄼' : d >= 1 ? '𝄽' : '𝄾');

/**
 * @param {{
 *   staves: Array<{ label?: string, clef?: 'treble'|'bass', bars: Array<Array<{ p: string|null, d: number, tieIn?: boolean, mark?: string, markClass?: string }>> }>,
 *   beats?: number,
 *   meter?: [number, number],
 *   labels?: Array<{ bar: number, beat: number, text: string }>,  // 第一行谱表上方的标注（如和弦名）
 *   onNote?: (staffIndex, barIndex, noteIndex) => void,
 *   ariaLabel?: string,
 * }} model
 * @returns {SVGSVGElement}
 */
export function renderStaff(model) {
  const beats = model.beats ?? 4;
  const barCount = Math.max(...model.staves.map((staff) => staff.bars.length));
  const barWidths = Array.from({ length: barCount }, (_, bar) => {
    const most = Math.max(...model.staves.map((staff) => (staff.bars[bar] || []).length));
    return Math.max(96, 30 + most * 34);
  });
  const prefix = 64;
  const staffHeight = 4 * LINE_GAP;
  // rowGap / top 可由调用方收紧（例如和弦面板里的小谱例）
  const rowGap = model.rowGap ?? 92;
  const top = model.top ?? (model.labels?.length ? 58 : 40);
  const width = prefix + barWidths.reduce((a, b) => a + b, 0) + 12;
  const height = top + model.staves.length * (staffHeight + rowGap);
  const svg = node('svg', { viewBox: `0 0 ${width} ${height}`, width, height, class: 'compose-score staff-svg', role: 'img', 'aria-label': model.ariaLabel || '' });
  // 短谱例缩小到容器宽度内完整显示；长谱例最多缩到约 55%，再宽才出现横向滚动
  svg.style.minWidth = `${Math.round(Math.min(width, Math.max(320, width * 0.55)))}px`;

  if (model.labels?.length) {
    const barLeft = (bar) => prefix + barWidths.slice(0, bar).reduce((a, b) => a + b, 0);
    model.labels.forEach((label) => {
      const x = barLeft(label.bar) + 18 + (label.beat / beats) * (barWidths[label.bar] - 34);
      svg.append(node('text', { x: x - 4, y: top - 26, class: 'score-chord' }, label.text));
    });
  }

  model.staves.forEach((staff, staffIndex) => {
    const clefName = staff.clef || chooseClef(staff.bars.flat().map((n) => n.p).filter(Boolean));
    const clef = CLEF[clefName];
    const y = top + staffIndex * (staffHeight + rowGap);
    if (staff.label) svg.append(node('text', { x: 4, y: y - 14, class: 'score-part' }, staff.label));
    for (let line = 0; line < 5; line++) svg.append(node('line', { x1: 4, y1: y + line * LINE_GAP, x2: width - 4, y2: y + line * LINE_GAP, class: 'score-staff' }));
    svg.append(node('text', { x: 6, y: y + clef.glyphY, class: 'score-clef' }, clef.glyph));
    if (model.meter) {
      svg.append(node('text', { x: 44, y: y + 13, class: 'score-meter' }, model.meter[0]), node('text', { x: 44, y: y + 29, class: 'score-meter' }, model.meter[1]));
    }
    const pitchY = (pitch) => y + staffHeight - (pitch.diatonic - clef.bottom) * (LINE_GAP / 2);
    let left = prefix;
    let previousHead = null;
    staff.bars.forEach((bar, barIndex) => {
      const barWidth = barWidths[barIndex];
      const accidentals = new Map();
      let onset = 0;
      bar.forEach((item, noteIndex) => {
        const x = left + 18 + (onset / beats) * (barWidth - 34);
        onset += item.d;
        if (!item.p) {
          svg.append(node('text', { x: x - 4, y: y + 22, class: 'score-rest' }, REST_GLYPH(item.d)));
          previousHead = null;
          return;
        }
        if (Array.isArray(item.p)) {
          // 和弦：多个符头共用一根符干；相邻二度的符头错开
          const pitches = item.p.map(parsePitch).filter(Boolean).sort((a, b) => a.diatonic - b.diatonic);
          if (!pitches.length) return;
          const group = node('g', { class: 'staff-note staff-chord', 'data-staff': staffIndex, 'data-bar': barIndex, 'data-index': noteIndex });
          const ys = pitches.map(pitchY);
          let previous = null;
          pitches.forEach((pitch, j) => {
            const ny = ys[j];
            const shifted = previous && pitch.diatonic - previous.diatonic === 1 && !previous.shifted;
            const nx = shifted ? x + 11 : x;
            const key = `${pitch.step}${pitch.octave}`;
            const shown = accidentals.has(key) ? accidentals.get(key) : 0;
            if (pitch.accidental !== shown) {
              const glyph = pitch.accidental === 0 ? '♮' : pitch.accidental > 0 ? '♯'.repeat(pitch.accidental) : '♭'.repeat(-pitch.accidental);
              group.append(node('text', { x: x - 18 - (j % 2) * 9, y: ny + 4, class: 'score-accidental' }, glyph));
            }
            accidentals.set(key, pitch.accidental);
            for (let ly = y + staffHeight + LINE_GAP; ly <= ny; ly += LINE_GAP) group.append(node('line', { x1: nx - 10, x2: nx + 10, y1: ly, y2: ly, class: 'score-ledger' }));
            for (let ly = y - LINE_GAP; ly >= ny; ly -= LINE_GAP) group.append(node('line', { x1: nx - 10, x2: nx + 10, y1: ly, y2: ly, class: 'score-ledger' }));
            const head = node('ellipse', { cx: nx, cy: ny, rx: 5.6, ry: 3.9, transform: `rotate(-18 ${nx} ${ny})`, class: item.d >= 2 ? 'score-note hollow' : 'score-note' });
            head.append(node('title', {}, pitch.name));
            group.append(head);
            previous = { ...pitch, shifted };
          });
          if (item.d < 4) group.append(node('line', { x1: x + 5.2, x2: x + 5.2, y1: Math.max(...ys), y2: Math.min(...ys) - 26, class: 'score-stem' }));
          if (item.mark) group.append(node('text', { x, y: y + staffHeight + 30, class: `staff-mark ${item.markClass || ''}`, 'text-anchor': 'middle' }, item.mark));
          if (model.onNote) {
            group.setAttribute('tabindex', '0');
            group.setAttribute('role', 'button');
            group.addEventListener('click', () => model.onNote(staffIndex, barIndex, noteIndex));
          }
          svg.append(group);
          previousHead = null;
          return;
        }
        const pitch = parsePitch(item.p);
        if (!pitch) return;
        const ny = pitchY(pitch);
        const group = node('g', { class: 'staff-note', 'data-staff': staffIndex, 'data-bar': barIndex, 'data-index': noteIndex });
        // 临时记号：同一小节同一音位只在改变时标出
        const key = `${pitch.step}${pitch.octave}`;
        const shown = accidentals.has(key) ? accidentals.get(key) : 0;
        if (pitch.accidental !== shown && !(item.tieIn && noteIndex === 0)) {
          const glyph = pitch.accidental === 0 ? '♮' : pitch.accidental > 0 ? '♯'.repeat(pitch.accidental) : '♭'.repeat(-pitch.accidental);
          group.append(node('text', { x: x - 18, y: ny + 4, class: 'score-accidental' }, glyph));
        }
        accidentals.set(key, pitch.accidental);
        // 加线
        for (let ly = y + staffHeight + LINE_GAP; ly <= ny; ly += LINE_GAP) group.append(node('line', { x1: x - 10, x2: x + 10, y1: ly, y2: ly, class: 'score-ledger' }));
        for (let ly = y - LINE_GAP; ly >= ny; ly -= LINE_GAP) group.append(node('line', { x1: x - 10, x2: x + 10, y1: ly, y2: ly, class: 'score-ledger' }));
        const hollow = item.d >= 2;
        const head = node('ellipse', { cx: x, cy: ny, rx: 5.6, ry: 3.9, transform: `rotate(-18 ${x} ${ny})`, class: hollow ? 'score-note hollow' : 'score-note' });
        head.append(node('title', {}, pitch.name));
        group.append(head);
        if (item.d === 3 || item.d === 1.5) group.append(node('circle', { cx: x + 11, cy: ny - 1, r: 1.7, class: 'score-note' }));
        if (item.d < 4) {
          const down = ny < y + staffHeight / 2;
          const stemX = x + (down ? -5.2 : 5.2);
          const stemEnd = down ? ny + 26 : ny - 26;
          group.append(node('line', { x1: stemX, x2: stemX, y1: ny, y2: stemEnd, class: 'score-stem' }));
          if (item.d <= 0.5) group.append(node('path', { d: down ? `M${stemX},${stemEnd} q12,-6 5,-16` : `M${stemX},${stemEnd} q12,6 5,16`, class: 'score-stem', fill: 'none' }));
        }
        // 连线（与前一音相连）
        if (item.tieIn && previousHead) {
          const midY = Math.max(previousHead.y, ny) + 9;
          group.append(node('path', { d: `M${previousHead.x + 6},${previousHead.y + 6} Q${(previousHead.x + x) / 2},${midY + 6} ${x - 6},${ny + 6}`, class: 'score-stem', fill: 'none' }));
        }
        if (item.mark) group.append(node('text', { x, y: y + staffHeight + 30, class: `staff-mark ${item.markClass || ''}`, 'text-anchor': 'middle' }, item.mark));
        if (model.onNote) {
          group.setAttribute('tabindex', '0');
          group.setAttribute('role', 'button');
          group.addEventListener('click', () => model.onNote(staffIndex, barIndex, noteIndex));
        }
        svg.append(group);
        previousHead = { x, y: ny };
      });
      left += barWidth;
      svg.append(node('line', { x1: left, x2: left, y1: y, y2: y + staffHeight, class: 'score-barline' }));
      svg.append(node('text', { x: left - barWidth + 4, y: y - 6, class: 'score-bar-number' }, barIndex + 1));
    });
  });
  return svg;
}

/**
 * 音阶谱例：noteNames 为按音级拼好的音名（不带八度），midis 为对应的实际音高。
 * 每个音的八度按"拼写 + 实际音高"反推（C♭5 与 B4 同音高也能写对），一小节内以四分音符排列，末尾可加主音的高八度。
 */
export function scalePitchNames(noteNames, midis) {
  return noteNames.map((name, i) => {
    for (let octave = midis[i] / 12 - 3; octave <= midis[i] / 12 + 1; octave += 1) {
      const candidate = `${name}${Math.floor(octave)}`;
      if (parsePitch(candidate)?.midi === midis[i]) return candidate;
    }
    return null;
  });
}

export function renderScaleStaff(noteNames, midis, { onNote, ariaLabel = '', clef } = {}) {
  const pitches = scalePitchNames(noteNames, midis).filter(Boolean);
  return renderStaff({
    staves: [{ clef: clef || chooseClef(pitches), bars: [pitches.map((p) => ({ p, d: 1 }))] }],
    beats: pitches.length,
    top: 36,
    rowGap: 40,
    ariaLabel,
    onNote: onNote ? (_, __, index) => onNote(index) : undefined,
  });
}

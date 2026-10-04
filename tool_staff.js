// 新工具共用：把一条旋律（{ midi, beats, rest }）画成单行五线谱（沿用 learn_visuals.js 的谱例），以及简单的拍数 → 时值换算
import { renderVisual } from './learn_visuals.js?v=20261004-m5';
import { spellNote } from './motif_phrase.js';

const DURATIONS = [[4, 'w', false], [3, 'h', true], [2, 'h', false], [1.5, 'q', true], [1, 'q', false], [0.75, 'e', true], [0.5, 'e', false], [0.25, 's', false]];
/** 拍数 → { d, dot }（取最接近的写法） */
export function durationOf(beats) {
  const best = DURATIONS.reduce((a, b) => (Math.abs(b[0] - beats) < Math.abs(a[0] - beats) ? b : a));
  return { d: best[1], dot: best[2] };
}

/**
 * notes：[{ midi, beats, rest }]；labels：每个音下方的文字；lit：要高亮的音（按 notes 的序号）
 * 谱例部件不画休止符，休止直接跳过（界面上另外用文字或点格表示）
 */
export function melodyStaff(notes, { key, clef = 'treble', labels = [], lit = [], play, colWidth = 40 } = {}) {
  const items = [];
  notes.forEach((n, i) => {
    if (n.rest) return;
    const { d, dot } = durationOf(n.beats);
    items.push({ p: spellNote(n.midi, key), d, dot, col: items.length, lit: lit.includes(i), ...(labels[i] ? { label: labels[i] } : {}) });
  });
  return renderVisual({ kind: 'notation', staves: [{ clef }], notes: items, cols: Math.max(4, items.length), colWidth }, { play });
}

/** 多声部（卡农）：每个声部一行谱表，按拍对齐成列（每 0.5 拍一列） */
export function voicesStaff(parts, { key, clefs = [], length, play, colWidth = 26 } = {}) {
  const notes = [];
  parts.forEach((p, s) => {
    let t = p.start;
    p.notes.forEach((n) => {
      if (!n.rest) { const { d, dot } = durationOf(n.beats); notes.push({ p: spellNote(n.midi, key), d, dot, s, col: Math.round(t * 2) }); }
      t += n.beats;
    });
  });
  return renderVisual({ kind: 'notation', staves: parts.map((_, s) => ({ clef: clefs[s] || 'treble' })), notes, cols: Math.max(8, Math.ceil(length * 2)), colWidth }, { play });
}

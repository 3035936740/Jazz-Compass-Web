// 五线谱编辑器的乐谱 → MusicXML 4.0（score-partwise）
// 结构按 W3C MusicXML 4.0 教程：<divisions> 是每个四分音符的单位数；和弦的后续音带 <chord/>；第二行谱表用 <backup> 退回再写；
// 连音线同时写 <tie>（发声）和 <tied>（显示）；<alter> 可以是小数（0.5 = 升四分之一音），所以音分偏移按 音分 / 100 写进 alter
// ref:w3c-musicxml
import { layoutMeasures, resolveMeasure, measureBeats } from './staff_reading.js';

const DIVISIONS = 16; // 双附点十六分音符也是整数
const TYPE = { w: 'whole', h: 'half', q: 'quarter', e: 'eighth', s: '16th' };
const CLEF = { treble: ['G', 2], bass: ['F', 4], alto: ['C', 3], tenor: ['C', 4] };
const ACCIDENTAL = { '-2': 'flat-flat', '-1': 'flat', 0: 'natural', 1: 'sharp', 2: 'double-sharp' };
const esc = (text) => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * @param {{ clefs: string[], voices: Array<Array<event>>, key: number, meter: [number, number], bpm?: number, title?: string }} score
 *   每个声部对应一行谱表（clefs[i]）；事件格式同 staff_reading.js 的 layoutMeasures
 * @returns {string} MusicXML 文本
 */
export function scoreToMusicXML({ clefs, voices, key = 0, meter = [4, 4], bpm = 90, title = 'Staff' }) {
  const capacity = measureBeats(meter);
  const laid = clefs.map((_, v) => {
    const measures = layoutMeasures(voices[v] || [], meter);
    // 连音线连过小节线的音沿用前一个音的升降，和编辑器显示一致
    const last = {};
    measures.forEach((measure) => {
      measure.events.forEach((e) => { if (e.tiedIn) e.tiedAlters = last[e.source] || {}; });
      const resolved = resolveMeasure(measure.events, key);
      measure.events.forEach((e, i) => {
        e.resolved = resolved[i];
        if (!e.rest) last[e.source] = Object.fromEntries(e.notes.map((n, k) => [`${n.letter}${n.octave}`, resolved[i][k].alter]));
      });
    });
    return measures;
  });
  const used = laid.map((measures, v) => ((voices[v] || []).length ? measures.length : 0));
  const count = Math.max(1, ...used);
  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8" standalone="no"?>');
  lines.push('<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">');
  lines.push('<score-partwise version="4.0">');
  lines.push(`  <work><work-title>${esc(title)}</work-title></work>`);
  lines.push('  <part-list><score-part id="P1"><part-name>Music</part-name></score-part></part-list>');
  lines.push('  <part id="P1">');
  for (let m = 0; m < count; m += 1) {
    lines.push(`    <measure number="${m + 1}">`);
    if (m === 0) {
      lines.push('      <attributes>');
      lines.push(`        <divisions>${DIVISIONS}</divisions>`);
      lines.push(`        <key><fifths>${key}</fifths></key>`);
      lines.push(`        <time><beats>${meter[0]}</beats><beat-type>${meter[1]}</beat-type></time>`);
      if (clefs.length > 1) lines.push(`        <staves>${clefs.length}</staves>`);
      clefs.forEach((clef, i) => {
        const [sign, line] = CLEF[clef] || CLEF.treble;
        lines.push(`        <clef${clefs.length > 1 ? ` number="${i + 1}"` : ''}><sign>${sign}</sign><line>${line}</line></clef>`);
      });
      lines.push('      </attributes>');
      lines.push(`      <sound tempo="${bpm}"/>`);
    }
    clefs.forEach((_, v) => {
      if (v > 0) lines.push(`      <backup><duration>${Math.round(capacity * DIVISIONS)}</duration></backup>`);
      const staffTag = clefs.length > 1 ? `<staff>${v + 1}</staff>` : '';
      const events = laid[v][m]?.events || [];
      if (!events.length) {
        // 这一行谱表这一小节没有音：整小节休止
        lines.push(`      <note><rest measure="yes"/><duration>${Math.round(capacity * DIVISIONS)}</duration><voice>${v + 1}</voice>${staffTag}</note>`);
        return;
      }
      let filled = 0;
      events.forEach((e) => {
        const duration = Math.round(e.beats * DIVISIONS);
        filled += e.beats;
        const typeTags = `<type>${TYPE[e.duration]}</type>${'<dot/>'.repeat(e.dots || 0)}`;
        if (e.rest) {
          lines.push(`      <note><rest/><duration>${duration}</duration><voice>${v + 1}</voice>${typeTags}${staffTag}</note>`);
          return;
        }
        e.notes.forEach((n, k) => {
          const { alter, show } = e.resolved[k];
          const total = (alter || 0) + (e.tiedIn ? 0 : (n.cents || 0) / 100);
          const pitch = `<pitch><step>${n.letter}</step>${total ? `<alter>${Number(total.toFixed(2))}</alter>` : ''}<octave>${n.octave}</octave></pitch>`;
          const ties = `${e.tiedIn ? '<tie type="stop"/>' : ''}${e.tieOut ? '<tie type="start"/>' : ''}`;
          const accidental = show ? `<accidental>${ACCIDENTAL[alter]}</accidental>` : '';
          const tied = e.tiedIn || e.tieOut ? `<notations>${e.tiedIn ? '<tied type="stop"/>' : ''}${e.tieOut ? '<tied type="start"/>' : ''}</notations>` : '';
          lines.push(`      <note>${k ? '<chord/>' : ''}${pitch}<duration>${duration}</duration>${ties}<voice>${v + 1}</voice>${typeTags}${accidental}${staffTag}${tied}</note>`);
        });
      });
      // 最后一小节没写满：用 <forward> 补齐，保证两行谱表对齐
      const missing = Math.round((capacity - filled) * DIVISIONS);
      if (missing > 0 && clefs.length > 1) lines.push(`      <forward><duration>${missing}</duration><voice>${v + 1}</voice>${staffTag}</forward>`);
    });
    lines.push('    </measure>');
  }
  lines.push('  </part>');
  lines.push('</score-partwise>');
  return lines.join('\n');
}

/** 调名（如 'Eb'、'f#'）+ 大小调 → 调号里的升降号数（升为正、降为负） */
const MAJOR_FIFTHS = { C: 0, G: 1, D: 2, A: 3, E: 4, B: 5, 'F#': 6, 'C#': 7, F: -1, Bb: -2, Eb: -3, Ab: -4, Db: -5, Gb: -6, Cb: -7 };
export function keyFifths(tonic, minor = false) {
  const name = String(tonic).trim().replace('♯', '#').replace('♭', 'b');
  const normal = name.charAt(0).toUpperCase() + name.slice(1);
  const major = MAJOR_FIFTHS[normal];
  if (major === undefined) return 0;
  return minor ? major - 3 : major;
}

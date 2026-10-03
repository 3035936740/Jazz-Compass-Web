// 和弦进行：解析小节记法、移调、排出播放事件（纯逻辑，可在 Node 中测试）
// 记法：用 | 分小节，小节内的和弦平分该小节；没有 | 时每个和弦占 chordBeats 拍。
// "%" 表示重复上一小节。
import { parseNote, simplestName } from './pitch_spelling.js';

/** @returns {Array<{ chords: string[] }>} 小节列表 */
export function parseProgression(text, { chordBeats = 4, beatsPerBar = 4 } = {}) {
  const source = String(text).trim();
  if (!source) return [];
  if (!source.includes('|')) {
    const chords = source.split(/\s+/).filter(Boolean);
    // 每个和弦单独占 chordBeats 拍：按小节长度拆成"小节"便于显示
    return chords.map((chord) => ({ chords: [chord], beats: chordBeats }));
  }
  const bars = [];
  source.split('|').map((part) => part.trim()).filter(Boolean).forEach((part) => {
    if (part === '%') {
      if (bars.length) bars.push({ ...bars[bars.length - 1] });
      return;
    }
    bars.push({ chords: part.split(/\s+/).filter(Boolean), beats: beatsPerBar });
  });
  return bars;
}

/** 把小节展开为 { symbol, beat, beats, bar } 事件，beat 从 0 开始 */
export function progressionEvents(bars) {
  const events = [];
  let beat = 0;
  bars.forEach((bar, barIndex) => {
    const each = bar.beats / bar.chords.length;
    bar.chords.forEach((symbol, index) => events.push({ symbol, beat: beat + index * each, beats: each, bar: barIndex, index }));
    beat += bar.beats;
  });
  return { events, totalBeats: beat };
}

const ROOT_PATTERN = /^([A-G](?:#|b)?)(.*)$/;

/** 移调一个和弦符号（含斜杠低音）；preferFlats 为 null 时沿用原记号的升降倾向 */
export function transposeSymbol(symbol, semitones, preferFlats = null) {
  const [main, bass] = symbol.split('/');
  const shift = (name) => {
    const match = ROOT_PATTERN.exec(name);
    if (!match) return name;
    const note = parseNote(match[1]);
    if (!note) return name;
    const flats = preferFlats ?? !match[1].includes('#');
    return simplestName(note.pc + semitones, flats) + match[2];
  };
  return bass === undefined ? shift(main) : `${shift(main)}/${shift(bass)}`;
}

/** 移调整段文本，保留小节线与 % */
export function transposeProgression(text, semitones) {
  return String(text).split(/(\s+|\|)/).map((token) => (token && ROOT_PATTERN.test(token) ? transposeSymbol(token, semitones) : token)).join('');
}

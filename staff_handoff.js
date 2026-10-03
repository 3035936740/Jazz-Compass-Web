// 把别的工具里的和弦 / 四部和声送到"五线谱"工具继续编辑（经 localStorage 交接，打开 #staff?q=@import）
import { decompose } from './staff_reading.js';
import { parseChordSymbol } from './chord_symbols.js?v=20261002-alt3';

const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

/** 'Bb4'、'F#3'、'C##5' → 编辑器的音 { letter, octave, alter, cents } */
export function spelledNote(name) {
  const m = /^([A-G])(#{1,2}|b{1,2}|♯|♭)?(-?\d)$/.exec(String(name).trim());
  if (!m) return null;
  const alter = { '': 0, '#': 1, '##': 2, '♯': 1, b: -1, bb: -2, '♭': -1 }[m[2] || ''];
  return { letter: m[1], octave: Number(m[3]), alter, cents: 0 };
}
const midiOf = (n) => 12 * (n.octave + 1) + LETTER_PC[n.letter] + n.alter;

/** 一段长度（拍）写成一个或几个用连音线连起来的事件 */
function eventsFor(notes, beats) {
  const parts = decompose(beats);
  return parts.map((part, i) => ({ rest: !notes.length, duration: part.duration, dots: part.dots, tie: notes.length > 0 && i < parts.length - 1, notes: notes.map((n) => ({ ...n })) }));
}

/** 四部和声（每个和弦 [男低, 男高, 女中, 女高] 的拼写音名）→ 大谱表两行：上 = 女高女中，下 = 男高男低 */
export function satbToVoices(chords, beats = 4) {
  const upper = []; const lower = [];
  chords.forEach((names) => {
    const notes = names.map(spelledNote).filter(Boolean);
    upper.push(...eventsFor(notes.slice(2), beats));
    lower.push(...eventsFor(notes.slice(0, 2), beats));
  });
  return [upper, lower];
}

/** 和弦标记序列 [{ symbol, beats }] → 大谱表两行：中央 C 以下放低音谱表；没有低音时补一个低八度的根音（或斜杠低音） */
export function chordSymbolsToVoices(events) {
  const upper = []; const lower = [];
  events.forEach(({ symbol, beats }) => {
    const parsed = parseChordSymbol(symbol);
    const notes = (parsed?.pitches || []).map(spelledNote).filter(Boolean);
    let low = notes.filter((n) => midiOf(n) < 60);
    const high = notes.filter((n) => midiOf(n) >= 60);
    if (!low.length && parsed) low = [spelledNote(`${parsed.bass || parsed.root}3`)].filter(Boolean);
    upper.push(...eventsFor(high, beats));
    lower.push(...eventsFor(low, beats));
  });
  return [upper, lower];
}

/** 交接并打开五线谱工具 */
export function sendToStaff({ clef = 'grand', key = 0, meter = [4, 4], bpm = 90, voices }) {
  try { globalThis.localStorage?.setItem('jc-staff-import', JSON.stringify({ clef, key, meter, bpm, voices })); } catch (_) { return false; }
  globalThis.location.hash = '#staff?q=@import';
  return true;
}

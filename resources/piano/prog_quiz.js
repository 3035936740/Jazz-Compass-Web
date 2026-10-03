// 套路听辨（纯逻辑）：从套路和弦进行速查的条目里出题——听一段循环，选它是哪一条进行，或选它的低音线
// 条目和它们的出处见 prog_library_data.js；四和弦流行套路（Axis / doo-wop / 卡农 / hopscotch 等）：ref:omt-pb-4chord ref:omt-pb-classical-schemas
// 低音线写成相对主音的级数（小调条目用同主音大调做参照，和速查里的数字写法一致）：ref:omt2e-major-scales
import { ENTRIES } from './prog_library_data.js';
import { prepareEntries, realize, keyOf } from './prog_library.js';

const DEGREE = ['1', '♭2', '2', '♭3', '3', '4', '♯4', '5', '♭6', '6', '♭7', '7'];
const pick = (list, rng) => list[Math.floor(rng() * list.length)];
const shuffle = (list, rng) => { const a = list.slice(); for (let i = a.length - 1; i > 0; i -= 1) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

let prepared = null;
const allEntries = () => (prepared ||= prepareEntries(ENTRIES));

/**
 * 题库：
 *  1：四个和弦的三和弦循环；2：再加上三到八个和弦的终止 / 循环；3：七和弦、半音和弦和片段也算
 */
export function quizPool(level = 1, entries = allEntries()) {
  const fits = (e) => e.chords.length >= 3 && e.chords.length <= 8;
  const seen = new Set();
  return entries.filter((e) => {
    if (!fits(e)) return false;
    if (level === 1 && !(e.kind === 'loop' && e.chords.length === 4 && !e.hasSeventh)) return false;
    if (level === 2 && !(['loop', 'cadence'].includes(e.kind) && !e.hasSeventh)) return false;
    const k = `${e.mode}:${e.chords.map(keyOf).join(' ')}`;
    if (seen.has(k)) return false; // 同一串和弦只留一条（速查里可能有不同出处的同名条目）
    seen.add(k);
    return true;
  });
}

/** 低音线：每个和弦实际低音的级数（转位的低音不是根音，比如卡农的 1 7 6 5 …） */
export const bassLine = (chords) => chords.map((c) => DEGREE[realize(c, 'C').bassPc]).join(' ');
export const romanLine = (entry) => entry.romanText;

/**
 * 出一道题
 * @param {{ level?: 1|2|3, kind?: 'schema'|'bass', rng?: () => number }} options
 * @returns {{ entry, kind, options: string[], answer: 0 }} 正确项在第一个（界面打乱）
 */
export function quizQuestion({ level = 1, kind = 'schema', rng = Math.random } = {}) {
  const pool = quizPool(level);
  const entry = pick(pool, rng);
  const label = (e) => (kind === 'bass' ? bassLine(e.chords) : romanLine(e));
  const right = label(entry);
  // 干扰项：先找同调式、同样长度的，不够再放宽
  const tiers = [
    pool.filter((e) => e !== entry && e.mode === entry.mode && e.chords.length === entry.chords.length),
    pool.filter((e) => e !== entry && e.mode === entry.mode),
    allEntries().filter((e) => e !== entry && e.chords.length >= 3 && e.chords.length <= 8),
  ];
  const options = [right];
  for (const tier of tiers) {
    for (const e of shuffle(tier, rng)) {
      if (options.length >= 4) break;
      const text = label(e);
      if (!options.includes(text)) options.push(text);
    }
  }
  return { entry, kind, options, answer: 0 };
}

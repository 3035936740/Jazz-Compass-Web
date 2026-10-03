// 固定旋律再和声：同一条旋律的古典 / 爵士 / 布鲁斯三种配法，标出旋律音在每个和弦里的角色并解释替换（纯逻辑）
// 依据：
//   再和声是保留旋律、换掉下面的和弦；同一个旋律音可以是不同和弦的根音、三音、九音……；
//   旋律音与和弦音成半音或小九度时会很刺耳，需要小心处理：ref:wiki-harmonization
//   古典配法沿用 harmonize.js（T–PD–D–T 乐句模型与终止）：ref:omt2e-phrase-model ref:omt2e-cadences
//   爵士：加七音、同功能代理、副属、三全音替代：ref:omt-pb-substitutions ref:omt2e-iivi
//   布鲁斯：I7 IV7 V7 全部是属七，属七可以有任何功能：ref:omt-pb-blues
import { harmonizeMelody } from './harmonize.js';
import { parseRoman, realize, romanOf, seventhFor, melodyRole, QUALITIES, MAJOR } from './prog_library.js';
import { parsePitch } from './pitch_spelling.js';

const NOTE = (zh, en, ja = en) => ({ zh, ja, en });
const mod = (n) => ((n % 12) + 12) % 12;

/** harmonize.js 的 'ii6'（数字低音 6 = 第一转位）→ 本库的 { degree, quality, bass } */
export function fromClassical(name) {
  const m = /^(vii°|VII|vii|VI|vi|V|IV|iv|iii|III|ii°|ii|I|i)(6)?$/.exec(name);
  if (!m) return null;
  const chord = parseRoman(m[1]);
  return chord ? { ...chord, bass: m[2] ? 1 : 0 } : null;
}

const rolesFor = (melody, chords, key) => chords.map((c, i) => {
  const r = realize(c, key);
  const p = parsePitch(melody[i]);
  return { ...melodyRole(p.pc, r), note: melody[i], chord: r.symbol, roman: romanOf(c) };
});

/**
 * @param {{ melody: string[], key?: string }} options 每个和弦一个旋律音（带八度）
 * @returns {{ classical, jazz, blues }} 每种：{ chords, symbols, romans, roles, changes, ok }
 */
export function reharmonize({ melody, key = 'C' }) {
  const pcs = melody.map((n) => parsePitch(n)?.pc);
  if (pcs.some((p) => p == null)) throw new Error('melody');
  // 古典：取 harmonize.js 的第一个结果（以 PAC 结束）
  let classical = null;
  try {
    const res = harmonizeMelody({ melody, key, mode: 'major', cadence: 'authentic' });
    if (res.results.length) classical = res.results[0].chords.map(fromClassical);
  } catch (e) { classical = null; }
  if (!classical || classical.some((c) => !c)) classical = null;

  // 爵士：从古典配法出发 加七音 再在旋律允许的地方做替换（替换后旋律音不能变成"需要解决"的音）
  let jazz = null;
  const jazzChanges = [];
  if (classical) {
    jazz = classical.map((c, i) => ({ ...c, quality: seventhFor(classical, i).quality, bass: 0 }));
    jazzChanges.push({ at: -1, why: NOTE('先按上下文给每个和弦加七音（Imaj7 ii7 V7 …）去掉转位 让低音走根音', 'first add context-based sevenths (Imaj7 ii7 V7 …) and use root position', 'まず文脈に合わせて各和音を七の和音に（Imaj7 ii7 V7 …）、転回形をやめてバスは根音に') });
    const fits = (c, i) => melodyRole(pcs[i], realize(c, key)).role !== 'clash';
    for (let i = 0; i < jazz.length; i += 1) {
      const c = jazz[i]; const next = jazz[i + 1];
      // IV → ii7（同属下属功能）
      if (c.degree === 4 && c.alter === 0 && next && next.degree === 5) {
        const sub = { degree: 2, alter: 0, quality: 'min7', bass: 0 };
        if (fits(sub, i)) { jazz[i] = sub; jazzChanges.push({ at: i, why: NOTE('IVmaj7 → ii7：同属下属功能 组成 ii–V', 'IVmaj7 → ii7: same predominant function, forming ii–V', 'IVmaj7 → ii7：同じ下属の働きで ii–V を作る') }); continue; }
      }
      // vi → VI7（副属 指向 ii）
      if (c.degree === 6 && c.alter === 0 && next && next.degree === 2) {
        const sub = { degree: 6, alter: 0, quality: 'dom7', bass: 0 };
        if (fits(sub, i)) { jazz[i] = sub; jazzChanges.push({ at: i, why: NOTE('vi7 → VI7：三音升高半音 变成指向 ii 的副属 V7/ii', 'vi7 → VI7: the raised third makes it V7/ii', 'vi7 → VI7：3 音を半音上げ、ii を指す副属 V7/ii に') }); continue; }
      }
      // 终止处的 V7 → ♭II7（三全音替代；最适合解决到 I 的 V7；乐句中间延长主和弦的 V 不换）
      if (c.quality === 'dom7' && c.degree === 5 && next && next.degree === 1 && i === jazz.length - 2) {
        const sub = { degree: 2, alter: -1, quality: 'dom7', bass: 0 };
        if (fits(sub, i)) { jazz[i] = sub; jazzChanges.push({ at: i, why: NOTE('V7 → ♭II7：三全音替代 两个和弦共享同一个三全音 低音半音下行到 I', 'V7 → ♭II7: tritone substitute sharing the same tritone; the bass slides down to I', 'V7 → ♭II7：トライトーン代理。2 つの和音は同じ 3 全音を共有し、バスは半音下の I へ') }); }
        else jazzChanges.push({ at: i, why: NOTE(`没有用三全音替代：旋律音 ${melody[i]} 在 ♭II7 上会成为需要解决的音`, `no tritone substitute: ${melody[i]} would clash over ♭II7`, `トライトーン代理は使わない：旋律音 ${melody[i]} が ♭II7 の上では解決の必要な音になる`) });
      }
    }
  }

  // 布鲁斯：每个旋律音从 I7 IV7 V7 里挑（和弦音优先 其次延伸音）；第一个和最后一个用 I7；倒数第二个优先 V7 或 IV7
  const BL = { I: { degree: 1, alter: 0, quality: 'dom7', bass: 0 }, IV: { degree: 4, alter: 0, quality: 'dom7', bass: 0 }, V: { degree: 5, alter: 0, quality: 'dom7', bass: 0 } };
  const score = (c, i) => ({ chord: 0, tension: 1, clash: 5 })[melodyRole(pcs[i], realize(c, key)).role];
  const blues = melody.map((_, i) => {
    if (i === 0 || i === melody.length - 1) return BL.I;
    const order = i === melody.length - 2 ? [BL.V, BL.IV, BL.I] : [BL.IV, BL.I, BL.V];
    return order.reduce((best, c) => (score(c, i) < score(best, i) ? c : best), order[0]);
  });
  const bluesChanges = [{ at: -1, why: NOTE('布鲁斯里 I7 IV7 V7 都是属七 不必解决到别的和弦；以变格 IV7–I7 收束也很常见', 'In the blues I7 IV7 V7 are all dominant sevenths that need not resolve; closing with IV7–I7 is common', 'ブルースの I7 IV7 V7 はすべて属七で、ほかの和音へ解決しなくてよい。変格 IV7–I7 で終わるのもよくある') }];

  const pack = (chords, changes) => (chords ? { ok: true, chords, symbols: chords.map((c) => realize(c, key).symbol), romans: chords.map((c) => romanOf(c)), roles: rolesFor(melody, chords, key), changes } : { ok: false, chords: [], symbols: [], romans: [], roles: [], changes: [] });
  return { classical: pack(classical, [{ at: -1, why: NOTE('古典配法：开头主和弦 下属走向属 以 V–I（PAC）结束 每个旋律音都是和弦音', 'classical: start on tonic, PD to D, end with V–I (PAC); every melody note is a chord tone', '古典の付け方：主和音で始まり、下属から属へ、V–I（PAC）で終わる。旋律音はすべて和音の音') }]), jazz: pack(jazz, jazzChanges), blues: pack(blues, bluesChanges) };
}

/** 内置旋律（每个和弦一个音） */
export const MELODIES = [
  { id: 'scale', notes: ['E4', 'D4', 'C4', 'D4', 'E4', 'F4', 'D4', 'C4'] },
  { id: 'arch', notes: ['C4', 'E4', 'G4', 'A4', 'G4', 'F4', 'D4', 'C4'] },
  { id: 'climb', notes: ['E4', 'F4', 'G4', 'A4', 'G4', 'F4', 'D4', 'C4'] },
];
export { QUALITIES };

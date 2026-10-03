// 四部和声检查：输入每个和弦的 [男低, 男高, 女中, 女高]（MIDI），找出写法问题，并给每个和弦标出转位
// 规则与出处：
//   音域（女高 C4–G5、女中 G3–D5、男高 C3–G4、男低 F2–D4）、相邻上方声部不超过八度、男高与男低不超过十二度、
//   声部不交叉、导音不重复、和弦七音不重复：ref:omt2e-roman-numerals
//   平行五度 / 八度（同样大小的完全协和音程接连出现）、同向进入完全协和音程（直接五八度）、声部交叉与超越：ref:omt-species1
//   V7–I：ti 往上解决到 do；内声部的导音可以往下跳到 sol：ref:omt2e-v7
//   和弦七音往下级进解决：ref:omt2e-pd7
// "直接五八度"原本是两声部对位的规则，这里只在外声部（女高与男低）上提醒，不算错误。

export const PARTS = ['bass', 'tenor', 'alto', 'soprano'];
export const RANGES = { soprano: [60, 79], alto: [55, 74], tenor: [48, 67], bass: [41, 62] };
const mod = (n) => ((n % 12) + 12) % 12;

const QUALITIES = [
  { id: 'maj', set: [0, 4, 7] }, { id: 'min', set: [0, 3, 7] }, { id: 'dim', set: [0, 3, 6] }, { id: 'aug', set: [0, 4, 8] },
  { id: 'dom7', set: [0, 4, 7, 10], seventh: 10 }, { id: 'maj7', set: [0, 4, 7, 11], seventh: 11 }, { id: 'min7', set: [0, 3, 7, 10], seventh: 10 },
  { id: 'hdim7', set: [0, 3, 6, 10], seventh: 10 }, { id: 'dim7', set: [0, 3, 6, 9], seventh: 9 }, { id: 'minmaj7', set: [0, 3, 7, 11], seventh: 11 },
  // 省略五音的三和弦（只有根音和三音）
  { id: 'maj', set: [0, 4], incomplete: true }, { id: 'min', set: [0, 3], incomplete: true },
  // 省略五音的七和弦（V7 常见写法）
  { id: 'dom7', set: [0, 4, 10], seventh: 10, incomplete: true }, { id: 'maj7', set: [0, 4, 11], seventh: 11, incomplete: true }, { id: 'min7', set: [0, 3, 10], seventh: 10, incomplete: true },
];

/** 由四个音推断和弦：根音、性质、七音、转位（低音是根 / 三 / 五 / 七） */
export function identifyChord(voices) {
  const pcs = [...new Set(voices.filter((v) => v != null).map(mod))];
  for (const q of QUALITIES) {
    for (const root of pcs) {
      const rel = pcs.map((pc) => mod(pc - root)).sort((a, b) => a - b);
      if (rel.length === q.set.length && rel.every((x, i) => x === q.set[i])) {
        const bassRel = mod(voices[0] - root);
        const position = bassRel === 0 ? 0 : bassRel === 3 || bassRel === 4 ? 1 : bassRel === 6 || bassRel === 7 || bassRel === 8 ? 2 : 3;
        const seventh = q.seventh !== undefined ? mod(root + q.seventh) : null;
        const figure = seventh === null ? ['5/3', '6', '6/4'][position] : ['7', '6/5', '4/3', '4/2'][position];
        return { root, quality: q.id, seventh, position, figure, incomplete: Boolean(q.incomplete) };
      }
    }
  }
  return null;
}

/**
 * @param {number[][]} chords 每个和弦 [男低, 男高, 女中, 女高]
 * @param {{ tonic: number, minor?: boolean }} key  主音音级；导音 = 主音下方半音（小调用升高的导音）
 * @returns {{ issues: Array<{ rule, severity: 'error'|'warning', at: number, to?: number, parts: string[], ref }>, chords: Array }}
 */
export function checkSATB(chords, key = { tonic: 0 }) {
  const issues = [];
  const leading = mod(key.tonic - 1);
  const info = chords.map(identifyChord);
  const add = (rule, severity, at, parts, ref, to) => issues.push({ rule, severity, at, ...(to !== undefined ? { to } : {}), parts, ref });

  chords.forEach((v, i) => {
    PARTS.forEach((part, p) => {
      const [low, high] = RANGES[part];
      if (v[p] != null && (v[p] < low || v[p] > high)) add('range', 'warning', i, [part], 'omt2e-roman-numerals');
    });
    // 声部交叉：上面的声部必须比下面的高
    for (let p = 0; p < 3; p += 1) if (v[p] != null && v[p + 1] != null && v[p + 1] < v[p]) add('crossing', 'error', i, [PARTS[p], PARTS[p + 1]], 'omt2e-roman-numerals');
    // 间距：女高–女中、女中–男高不超过八度，男高–男低不超过十二度
    if (v[3] - v[2] > 12) add('spacing', 'error', i, ['soprano', 'alto'], 'omt2e-roman-numerals');
    if (v[2] - v[1] > 12) add('spacing', 'error', i, ['alto', 'tenor'], 'omt2e-roman-numerals');
    if (v[1] - v[0] > 19) add('spacing', 'error', i, ['tenor', 'bass'], 'omt2e-roman-numerals');
    // 重复：导音、和弦七音都不重复
    const count = (pc) => v.filter((m) => m != null && mod(m) === pc).length;
    const chord = info[i];
    if (count(leading) > 1 && chord && (mod(chord.root) === mod(key.tonic + 7) || mod(chord.root) === leading)) add('doubled-leading', 'error', i, PARTS.filter((_, p) => mod(v[p]) === leading), 'omt2e-roman-numerals');
    if (chord?.seventh !== null && chord?.seventh !== undefined && count(chord.seventh) > 1) add('doubled-seventh', 'error', i, PARTS.filter((_, p) => mod(v[p]) === chord.seventh), 'omt2e-roman-numerals');
  });

  for (let i = 0; i + 1 < chords.length; i += 1) {
    const a = chords[i]; const b = chords[i + 1];
    if (a.every((m, k) => m === b[k])) continue; // 同一个和弦重复，不算进行
    for (let p = 0; p < 4; p += 1) {
      for (let q = p + 1; q < 4; q += 1) {
        const before = a[q] - a[p]; const after = b[q] - b[p];
        const moved = a[p] !== b[p] || a[q] !== b[q];
        const perfect = (x) => mod(x) === 7 ? 5 : mod(x) === 0 ? 8 : null;
        // 平行五八度：同样大小的完全协和音程接连出现（两个声部都没动的不算）
        if (moved && perfect(before) && perfect(before) === perfect(after) && !(a[p] === b[p] && a[q] === b[q])) {
          add(perfect(after) === 5 ? 'parallel-5' : 'parallel-8', 'error', i, [PARTS[p], PARTS[q]], 'omt-species1', i + 1);
        }
      }
    }
    // 直接五八度：外声部同向进入完全协和音程（只提醒）
    const sDir = Math.sign(b[3] - a[3]); const bDir = Math.sign(b[0] - a[0]);
    const outer = b[3] - b[0];
    if (sDir && sDir === bDir && (mod(outer) === 7 || mod(outer) === 0) && !(mod(a[3] - a[0]) === mod(outer))) add('direct', 'warning', i, ['soprano', 'bass'], 'omt-species1', i + 1);
    // 声部超越：一个声部越过相邻声部上一个和弦的音
    for (let p = 0; p < 3; p += 1) {
      if (b[p] > a[p + 1] || b[p + 1] < a[p]) add('overlap', 'warning', i, [PARTS[p], PARTS[p + 1]], 'omt-species1', i + 1);
    }
    // 导音：属和弦（V / V7 / vii°）到主和弦时，外声部的 ti 要上行到 do；内声部可以往下跳到 sol
    const from = info[i]; const to = info[i + 1];
    const dominant = from && (from.root === mod(key.tonic + 7) || from.root === leading);
    if (dominant && to && to.root === mod(key.tonic)) {
      a.forEach((m, p) => {
        if (mod(m) !== leading) return;
        const step = b[p] - m;
        const inner = p === 1 || p === 2;
        const ok = step === 1 || (inner && step === -4);
        if (!ok) add('leading-tone', inner ? 'warning' : 'error', i, [PARTS[p]], 'omt2e-v7', i + 1);
      });
    }
    // 和弦七音：往下级进解决（保持不动的等下一个和弦再看）
    if (from?.seventh !== null && from?.seventh !== undefined) {
      a.forEach((m, p) => {
        if (mod(m) !== from.seventh || b[p] === m) return;
        const step = b[p] - m;
        if (!(step === -1 || step === -2)) add('seventh', 'error', i, [PARTS[p]], 'omt2e-pd7', i + 1);
      });
    }
  }
  return { issues, chords: info };
}

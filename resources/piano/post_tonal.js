// 二十世纪技法：音级集合、十二音序列、对称音集
// 依据：
//   ref:omt2e-normal-order  OMT 2e 8.4：标准序的求法（升序排列、找最大相邻音程、从其右侧起写；并列时取更紧凑的一边，再并列取更靠下）；
//                           Tn：每个音级加 n（模 12）；In：用 n 减去每个音级
//   ref:omt2e-prime-form    OMT 2e 8.5：集合类为移位或倒影相关的集合；原型：标准序移到 0，与其倒影的同样结果比较，取更靠左紧凑者
//   ref:omt2e-ic-vector     OMT 2e 8.6：每两个音级之间的音程级计入 ic1–ic6，得到音程级向量
//   ref:wiki-set-classes    维基百科「List of set classes」：Forte 编号表、Rahn 与 Forte 两种原型写法（17 处不同）、Z 关系
//   ref:omt2e-collections   OMT 2e 8.9：全音、八音（三种）、六音（四种）、五声与原音音集
//   ref:wiki-messiaen-modes 维基百科「Mode of limited transposition」（引 Messiaen 1956 英译本 p.58）：七种调式的音程与移位数
//   ref:omt2e-row-naming    OMT 2e 9.2：P、I、R、RI；固定零（P0 从 C 开始）与移动零（P0 由分析者选定）；矩阵第一类排法
import { SET_CLASSES } from './set_classes_data.js';

export const mod12 = (n) => ((n % 12) + 12) % 12;
const uniqueSorted = (pcs) => [...new Set(pcs.map(mod12))].sort((a, b) => a - b);

/** 解析音级：数字 0–11，小写 t = 10、e = 11（大写 T 亦为 10），其余按音名（C、F#、Bb，不分大小写） */
export function parsePcList(text) {
  const LETTERS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  return String(text).split(/[\s,，、]+/).filter(Boolean).map((token) => {
    if (/^\d+$/.test(token)) return mod12(Number(token));
    if (token === 't' || token === 'T') return 10;
    if (token === 'e') return 11;
    const match = token.match(/^([A-Ga-g])([#♯b♭]*)$/);
    if (!match) throw new Error(`无法识别的音级: ${token}`);
    let pc = LETTERS[match[1].toUpperCase()];
    for (const ch of match[2]) pc += ch === '#' || ch === '♯' ? 1 : -1;
    return mod12(pc);
  });
}

export const formatPc = (pc) => (pc === 10 ? 't' : pc === 11 ? 'e' : String(pc));
export const formatSet = (pcs, brackets = '[]') => `${brackets[0]}${pcs.map(formatPc).join(',')}${brackets[1]}`;

/** 标准序（ref:omt2e-normal-order） */
export function normalOrder(input) {
  const pcs = uniqueSorted(input);
  if (pcs.length <= 1) return pcs;
  const rotations = pcs.map((_, i) => [...pcs.slice(i), ...pcs.slice(0, i)]);
  const span = (r) => mod12(r[r.length - 1] - r[0]);
  const best = Math.min(...rotations.map(span));
  let candidates = rotations.filter((r) => span(r) === best);
  // 并列：比较从首音到倒数第二音、倒数第三音……的距离，越小越紧凑；再并列取首音更低者
  for (let k = pcs.length - 2; k >= 1 && candidates.length > 1; k--) {
    const d = Math.min(...candidates.map((r) => mod12(r[k] - r[0])));
    candidates = candidates.filter((r) => mod12(r[k] - r[0]) === d);
  }
  candidates.sort((a, b) => a[0] - b[0]);
  return candidates[0];
}

export const transpose = (pcs, n) => pcs.map((pc) => mod12(pc + n));
export const invert = (pcs, n = 0) => pcs.map((pc) => mod12(n - pc));
const zeroBased = (pcs) => pcs.map((pc) => mod12(pc - pcs[0]));

/**
 * 原型。method 'rahn'（从右侧最分散，维基百科表格采用）或 'forte'（最小跨度内从左侧最紧凑）。
 * 两者在 352 个集合类中有 17 个不同（ref:wiki-set-classes）。
 */
export function primeForm(input, method = 'rahn') {
  const pcs = uniqueSorted(input);
  if (!pcs.length) return [];
  const forms = [];
  for (const base of [pcs, invert(pcs)]) {
    const set = uniqueSorted(base);
    for (let i = 0; i < set.length; i++) {
      const rotation = [...set.slice(i), ...set.slice(0, i)];
      forms.push(zeroBased(rotation));
    }
  }
  const compareRahn = (a, b) => {
    for (let k = a.length - 1; k >= 1; k--) if (a[k] !== b[k]) return a[k] - b[k];
    return 0;
  };
  const compareForte = (a, b) => {
    if (a[a.length - 1] !== b[b.length - 1]) return a[a.length - 1] - b[b.length - 1];
    for (let k = 1; k < a.length; k++) if (a[k] !== b[k]) return a[k] - b[k];
    return 0;
  };
  forms.sort(method === 'forte' ? compareForte : compareRahn);
  return forms[0];
}

/** 音程级向量（ref:omt2e-ic-vector） */
export function intervalVector(input) {
  const pcs = uniqueSorted(input);
  const vector = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < pcs.length; i++) for (let j = i + 1; j < pcs.length; j++) {
    const ic = Math.min(mod12(pcs[j] - pcs[i]), mod12(pcs[i] - pcs[j]));
    if (ic > 0) vector[ic - 1] += 1;
  }
  return vector;
}

/** Forte 编号与 Z 关系（ref:wiki-set-classes） */
export function setClassInfo(input) {
  const pcs = uniqueSorted(input);
  const prime = primeForm(pcs, 'rahn');
  const same = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
  const entry = SET_CLASSES.find((e) => !/B$/.test(e.name) && same(e.prime, prime));
  const vector = intervalVector(pcs);
  const name = entry ? entry.name.replace(/A$/, '') : null;
  const zPartner = name && /Z/.test(name)
    ? SET_CLASSES.find((e) => /Z/.test(e.name) && !/B$/.test(e.name) && e.name.replace(/A$/, '') !== name && e.prime.length === prime.length && same(e.vector, vector))
    : null;
  // A/B：标准序移到 0 后与原型相同为 A，与原型的倒影相同为 B（仅非对称集合）
  const normalZero = zeroBased(normalOrder(pcs));
  const symmetric = SET_CLASSES.some((e) => same(e.prime, prime) && !/[AB]$/.test(e.name));
  const tnType = symmetric ? '' : same(normalZero, prime) ? 'A' : 'B';
  return {
    pcs,
    normal: normalOrder(pcs),
    prime,
    fortePrime: entry?.fortePrime ?? prime,
    forte: name,
    tnType,
    vector,
    zPartner: zPartner ? zPartner.name.replace(/A$/, '') : null,
    complement: name ? complementName(pcs) : null,
  };
}

function complementName(pcs) {
  const rest = [...Array(12).keys()].filter((pc) => !pcs.includes(pc));
  if (!rest.length) return null;
  const prime = primeForm(rest, 'rahn');
  const entry = SET_CLASSES.find((e) => !/B$/.test(e.name) && e.prime.length === prime.length && e.prime.every((v, i) => v === prime[i]));
  return entry ? entry.name.replace(/A$/, '') : null;
}

// ---------------------------------------------------------------------------
// 十二音序列（ref:omt2e-row-naming）
// ---------------------------------------------------------------------------

/**
 * 12×12 矩阵（第一类排法：P 读行、I 读列、R 从右往左读行、RI 从下往上读列）。
 * convention 'fixed'：下标以 C = 0；'moveable'：下标以原行首音 = 0。
 */
export function twelveToneMatrix(row, convention = 'fixed') {
  if (row.length !== 12 || new Set(row.map(mod12)).size !== 12) throw new Error('音列必须恰好包含 12 个不同的音级');
  const p = row.map(mod12);
  const inversion = p.map((pc) => mod12(2 * p[0] - pc));
  const matrix = inversion.map((start) => p.map((pc) => mod12(pc - p[0] + start)));
  const zero = convention === 'fixed' ? 0 : p[0];
  const label = (pc) => mod12(pc - zero);
  return {
    matrix,
    rowLabels: matrix.map((r) => ({ p: `P${label(r[0])}`, r: `R${label(r[0])}` })),
    columnLabels: matrix[0].map((_, c) => ({ i: `I${label(matrix[0][c])}`, ri: `RI${label(matrix[0][c])}` })),
  };
}

/** 取某个行形式（如 "P3" "RI7"），按矩阵与所选约定 */
export function rowForm(row, name, convention = 'fixed') {
  const { matrix } = twelveToneMatrix(row, convention);
  const zero = convention === 'fixed' ? 0 : mod12(row[0]);
  const match = String(name).toUpperCase().match(/^(P|I|R|RI)(\d{1,2})$/);
  if (!match) throw new Error(`无法识别的行形式: ${name}`);
  const [, type, n] = match;
  const target = mod12(Number(n) + zero);
  if (type === 'P' || type === 'R') {
    const r = matrix.find((line) => line[0] === target);
    return type === 'P' ? r : [...r].reverse();
  }
  const c = matrix[0].findIndex((pc) => pc === target);
  const column = matrix.map((line) => line[c]);
  return type === 'I' ? column : [...column].reverse();
}

// ---------------------------------------------------------------------------
// 对称音集
// ---------------------------------------------------------------------------

/** 音集（ref:omt2e-collections）与梅西安有限移位调式（ref:wiki-messiaen-modes），以相邻音程表示 */
export const COLLECTIONS = [
  { id: 'whole-tone', steps: [2, 2, 2, 2, 2, 2], ref: 'omt2e-collections' },
  { id: 'octatonic-01', steps: [1, 2, 1, 2, 1, 2, 1, 2], ref: 'omt2e-collections' },
  { id: 'octatonic-02', steps: [2, 1, 2, 1, 2, 1, 2, 1], ref: 'omt2e-collections' },
  { id: 'hexatonic', steps: [1, 3, 1, 3, 1, 3], ref: 'omt2e-collections' },
  { id: 'pentatonic', steps: [2, 2, 3, 2, 3], ref: 'omt2e-collections' },
  { id: 'acoustic', steps: [2, 2, 2, 1, 2, 1, 2], ref: 'omt2e-collections' },
  { id: 'messiaen-1', steps: [2, 2, 2, 2, 2, 2], ref: 'wiki-messiaen-modes', transpositions: 2, modes: 1 },
  { id: 'messiaen-2', steps: [1, 2, 1, 2, 1, 2, 1, 2], ref: 'wiki-messiaen-modes', transpositions: 3, modes: 2 },
  { id: 'messiaen-3', steps: [2, 1, 1, 2, 1, 1, 2, 1, 1], ref: 'wiki-messiaen-modes', transpositions: 4, modes: 3 },
  { id: 'messiaen-4', steps: [1, 1, 3, 1, 1, 1, 3, 1], ref: 'wiki-messiaen-modes', transpositions: 6, modes: 4 },
  { id: 'messiaen-5', steps: [1, 4, 1, 1, 4, 1], ref: 'wiki-messiaen-modes', transpositions: 6, modes: 3 },
  { id: 'messiaen-6', steps: [2, 2, 1, 1, 2, 2, 1, 1], ref: 'wiki-messiaen-modes', transpositions: 6, modes: 4 },
  { id: 'messiaen-7', steps: [1, 1, 1, 2, 1, 1, 1, 1, 2, 1], ref: 'wiki-messiaen-modes', transpositions: 6, modes: 5 },
];

export function collectionPcs(steps, start = 0) {
  const pcs = [start];
  for (const step of steps.slice(0, -1)) pcs.push(mod12(pcs[pcs.length - 1] + step));
  return pcs;
}

/** 不同移位的数目：把音集逐个半音移位，数出不同的音级集合 */
export function distinctTranspositions(steps) {
  const seen = new Set();
  for (let n = 0; n < 12; n++) seen.add(uniqueSorted(collectionPcs(steps, n)).join(','));
  return seen.size;
}

/** 不同"调式"的数目：从音集各音起始得到的不同相邻音程序列 */
export function distinctModes(steps) {
  const seen = new Set();
  for (let i = 0; i < steps.length; i++) seen.add([...steps.slice(i), ...steps.slice(0, i)].join(','));
  return seen.size;
}

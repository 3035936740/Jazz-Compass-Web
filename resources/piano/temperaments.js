// 历史律制：由"五度链上每个五度的大小"构造 12 个音
// 依据：
//   ref:wiki-pythagorean     维基百科「Pythagorean tuning」：全部用纯五度（3/2），例如只取 E♭ 至 G# 的 12 个音，余下一个为狼五度
//   ref:wiki-meantone        维基百科「Meantone temperament」：四分之一音差中庸全音律每个五度缩窄 1/4 个音差（syntonic comma），
//                            四个五度 C G D A E 得到纯大三度；狼五度一般放在 G#–E♭
//   ref:wiki-werckmeister    维基百科「Werckmeister temperament」：Werckmeister III 中 C–G、G–D、D–A、B–F# 各缩窄 1/4 毕达哥拉斯音差，其余为纯五度
//   ref:wiki-vallotti        维基百科「Vallotti temperament」（引 Donahue 2005）：今日通行的版本中 F–C、C–G、G–D、D–A、A–E、E–B
//                            各缩窄 1/6 毕达哥拉斯音差，B–F#、F#–C#、C#–G#、G#–E♭、E♭–B♭、B♭–F 为纯五度
// 音差数值按定义计算：syntonic comma = 81/80，Pythagorean comma = 3^12/2^19。

export const cents = (ratio) => 1200 * Math.log2(ratio);
export const PURE_FIFTH = cents(3 / 2);
export const PURE_MAJOR_THIRD = cents(5 / 4);
export const SYNTONIC_COMMA = cents(81 / 80);
export const PYTHAGOREAN_COMMA = cents(3 ** 12 / 2 ** 19);

/** 五度链（从 E♭ 到 G#），共 11 个五度；名字下标与半音一致 */
export const CHAIN = ['Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#'];
const PC = { C: 0, 'C#': 1, D: 2, Eb: 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, Bb: 10, B: 11 };
export const NOTE_NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

/** 每种律制：给出链上 11 个五度（Eb–Bb … C#–G#）的大小（音分） */
export const TEMPERAMENTS = {
  equal: { ref: null, fifths: () => Array(11).fill(700) },
  pythagorean: { ref: 'wiki-pythagorean', fifths: () => Array(11).fill(PURE_FIFTH) },
  meantone: { ref: 'wiki-meantone', fifths: () => Array(11).fill(PURE_FIFTH - SYNTONIC_COMMA / 4) },
  werckmeister3: {
    ref: 'wiki-werckmeister',
    fifths: () => fifthsWithTempering({ 'C-G': 1 / 4, 'G-D': 1 / 4, 'D-A': 1 / 4, 'B-F#': 1 / 4 }, PYTHAGOREAN_COMMA),
  },
  vallotti: {
    ref: 'wiki-vallotti',
    fifths: () => fifthsWithTempering({ 'F-C': 1 / 6, 'C-G': 1 / 6, 'G-D': 1 / 6, 'D-A': 1 / 6, 'A-E': 1 / 6, 'E-B': 1 / 6 }, PYTHAGOREAN_COMMA),
  },
};

function fifthsWithTempering(map, comma) {
  return CHAIN.slice(0, -1).map((from, i) => {
    const key = `${from}-${CHAIN[i + 1]}`;
    return PURE_FIFTH - (map[key] ?? 0) * comma;
  });
}

/**
 * 各音相对 C 的音分（0–1200）。
 * @returns {{ cents: number[], fifths: Array<{ from, to, size }> }} cents 按半音 C..B 排列；fifths 含闭合的第 12 个五度（狼五度所在）
 */
export function buildTemperament(id) {
  const fifthSizes = TEMPERAMENTS[id].fifths();
  const raw = [0];
  fifthSizes.forEach((size, i) => raw.push(raw[i] + size));
  const cIndex = CHAIN.indexOf('C');
  const result = Array(12).fill(0);
  CHAIN.forEach((name, i) => {
    let value = raw[i] - raw[cIndex];
    value = ((value % 1200) + 1200) % 1200;
    result[PC[name]] = value;
  });
  const closing = 7 * 1200 - fifthSizes.reduce((a, b) => a + b, 0);
  const fifths = [...fifthSizes.map((size, i) => ({ from: CHAIN[i], to: CHAIN[i + 1], size })), { from: 'G#', to: 'Eb', size: closing }];
  return { cents: result, fifths };
}

/** 以 C 为根的大三度大小（音分），如 C–E、Db–F……与纯大三度 5/4 比较 */
export function majorThirds(temperamentCents) {
  return NOTE_NAMES.map((name, pc) => {
    const size = (((temperamentCents[(pc + 4) % 12] - temperamentCents[pc]) % 1200) + 1200) % 1200;
    return { root: name, size, fromPure: size - PURE_MAJOR_THIRD };
  });
}

/** 某音的频率：以 A4 = reference Hz 校准（各律制中 A 的位置不同，因此先求出 C4） */
export function frequencyOf(temperamentCents, pc, octave, reference = 440) {
  const c4 = reference / 2 ** (temperamentCents[9] / 1200);
  return c4 * 2 ** ((temperamentCents[pc] + 1200 * (octave - 4)) / 1200);
}

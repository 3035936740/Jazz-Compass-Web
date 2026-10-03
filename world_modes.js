// 世界调式体系：阿拉伯木卡姆（maqam）、印度斯坦 thaat、土耳其 makam 的 53 koma 体系
//
// 阿拉伯木卡姆
//   ref:maqamworld-maqam  MaqamWorld（Johnny Farraj）各木卡姆页面：音阶由哪些 jins（音组）构成、各在第几级，
//                         以及上方可替换的 jins（例如 Rast 第 5 级为 Upper Rast 或 Nahawand）。
//                         下列音名按其记谱图逐个转录；hz 为该页面音符播放器（data-frequency 属性）所用的频率。
//   ref:maqamworld-jins   MaqamWorld 各 jins 页面：音程（以全音为单位：1、¾、½、1½）与大小（Rast 5 音、Sikah 3 音、
//                         Saba 大小不定、主导音可在第 3 或第 6 级）。
//   ref:wiki-arabic-maqam 维基百科「Arabic maqam」：四分之一音（24 平均）只是记谱惯例，实际音高因地区、年代而异。
//
// 印度斯坦 thaat
//   ref:wiki-thaat        维基百科「Thaat」（引 Bhatkhande《Hindustani Sangeet Paddhati》与 Grove Music Online）：
//                         十个 thaat 的音、同名拉格、对应的卡纳提克 melakarta、区别特征；R G D N 可为本位或降（komal），
//                         M 可为本位或升（tivra），S、P 不变，故共 2^5 = 32 种组合，Bhatkhande 只选出十种。
//
// 土耳其 makam
//   ref:wiki-turkish-makam 维基百科「Turkish makam」：八度分为 53 个 Holdrian koma，全音 = 9 koma，实际只用其中 24 个音；
//                         音名与 koma 位置表；音程名称（bakiye 4、küçük mücenneb 5、büyük mücenneb 8、tanîni 9 等）；
//                         Çârgâh 音阶（表中粗体音）、Rast 与 Bûselik makam 的音（文中按音名给出）。

// ---------- 阿拉伯木卡姆 ----------

/** 升降号 → 四分之一音数；hb = 半降号（降四分之一音） */
const ACCIDENTAL_QT = { '': 0, b: -2, hb: -1, '#': 2 };
const LETTER_QT = { C: 0, D: 4, E: 8, F: 10, G: 14, A: 18, B: 22 };

export function parseQuarterToneNote(token) {
  const match = /^([A-G])(hb|b|#)?(\d)$/.exec(token);
  if (!match) throw new Error(`bad note ${token}`);
  const [, letter, accidental = '', octave] = match;
  return { letter, accidental, octave: Number(octave), qt: Number(octave) * 24 + LETTER_QT[letter] + ACCIDENTAL_QT[accidental] };
}

const A4_QT = parseQuarterToneNote('A4').qt;
/** 24 平均记谱位置的频率（A4 = 440 Hz） */
export const quarterToneFrequency = (token, reference = 440) => reference * 2 ** ((parseQuarterToneNote(token).qt - A4_QT) / 24);

export const ACCIDENTAL_LABEL = { '': '', b: '♭', hb: '½♭', '#': '♯' };
export const noteLabel = (token) => {
  const { letter, accidental } = parseQuarterToneNote(token);
  return `${letter}${ACCIDENTAL_LABEL[accidental]}`;
};

/** jins 的音程（四分之一音为单位），按 MaqamWorld jins 页面的记谱图转录 ref:maqamworld-jins */
export const AJNAS = {
  rast: { steps: [4, 3, 3, 4], tonic: 'C4' },
  bayati: { steps: [3, 3, 4], tonic: 'D4' },
  hijaz: { steps: [2, 6, 2], tonic: 'D4' },
  saba: { steps: [3, 3, 2], tonic: 'D4', ambiguous: true },
  sikah: { steps: [3, 4], tonic: 'Ehb4' },
  nahawand: { steps: [4, 2, 4, 4], tonic: 'C4' },
  ajam: { steps: [4, 4, 2, 4], tonic: 'C4' },
  kurd: { steps: [2, 4, 4], tonic: 'D4' },
  nikriz: { steps: [4, 2, 6, 2], tonic: 'C4' },
};

/**
 * 木卡姆：segments 为按级数排列的 jins；options 的第一项是记谱图中上行所用的音组，其余为页面写明的替换音组。
 * 每个音组给出音名（24 平均记谱）与 MaqamWorld 播放器的频率。ref:maqamworld-maqam
 */
const seg = (degree, ...options) => ({ degree, options });
const opt = (jins, notes, hz) => ({ jins, notes, hz });
export const MAQAMAT = {
  rast: {
    family: 'rast',
    segments: [
      seg(1, opt('rast', ['C4', 'D4', 'Ehb4', 'F4', 'G4'], [260.74, 293.33, 320, 347.65, 391.11])),
      seg(5, opt('upper-rast', ['G4', 'A4', 'Bhb4', 'C5'], [391.11, 440, 482, 521.48]), opt('nahawand', ['G4', 'A4', 'Bb4', 'C5'], [391.11, 440, 463.54, 521.48])),
    ],
  },
  bayati: {
    family: 'bayati',
    segments: [
      seg(1, opt('bayati', ['D4', 'Ehb4', 'F4', 'G4'], [293.33, 320, 345, 391.11])),
      seg(4, opt('nahawand', ['G4', 'A4', 'Bb4', 'C5', 'D5'], [391.11, 440, 463.54, 521.48, 586.66]), opt('rast', ['G4', 'A4', 'Bhb4', 'C5', 'D5'], [391.11, 440, 482, 521.48, 586.66])),
    ],
  },
  hijaz: {
    family: 'hijaz',
    segments: [
      seg(1, opt('hijaz', ['D4', 'Eb4', 'F#4', 'G4'], [293.33, 315, 375, 391.11])),
      seg(4, opt('nahawand', ['G4', 'A4', 'Bb4', 'C5', 'D5'], [391.11, 440, 463.54, 521.48, 586.66]), opt('rast', ['G4', 'A4', 'Bhb4', 'C5', 'D5'], [391.11, 440, 482, 521.48, 586.66])),
    ],
  },
  saba: {
    family: null,
    segments: [
      seg(1, opt('saba', ['D4', 'Ehb4', 'F4', 'Gb4'], [293.33, 320, 347.65, 368])),
      seg(3, opt('hijaz', ['F4', 'Gb4', 'A4', 'Bb4'], [347.65, 368, 437, 463.54])),
      seg(6, opt('ajam', ['Bb4', 'C5', 'D5'], [463.54, 521.48, 586.66]), opt('nikriz', ['Bb4', 'C5', 'Db5', 'E5', 'F5'], [463.54, 521.48, 548, 660, 695.31])),
    ],
  },
  sikah: {
    family: 'sikah',
    segments: [
      seg(1, opt('sikah', ['Ehb4', 'F4', 'G4'], [322, 347.65, 391.11])),
      seg(3, opt('upper-rast', ['G4', 'A4', 'Bhb4', 'C5'], [391.11, 440, 482, 521.48])),
      seg(6, opt('rast', ['C5', 'D5', 'Ehb5'], [521.48, 586.66, 644])),
    ],
  },
  nahawand: {
    family: 'nahawand',
    segments: [
      seg(1, opt('nahawand', ['C4', 'D4', 'Eb4', 'F4', 'G4'], [260.74, 293.33, 308.25, 347.65, 391.11])),
      seg(5, opt('hijaz', ['G4', 'Ab4', 'B4', 'C5'], [391.11, 423, 492, 521.48]), opt('kurd', ['G4', 'Ab4', 'Bb4', 'C5'], [391.11, 420, 463.54, 521.48])),
    ],
  },
  ajam: {
    family: 'ajam',
    segments: [
      seg(1, opt('ajam', ['C4', 'D4', 'E4', 'F4', 'G4'], [260.74, 293.33, 328, 347.65, 391.11])),
      seg(5, opt('upper-ajam', ['G4', 'A4', 'B4', 'C5'], [391.11, 440, 495, 521.48]), opt('nahawand', ['G4', 'A4', 'Bb4', 'C5'], [391.11, 440, 463.54, 521.48])),
    ],
  },
  kurd: {
    family: 'kurd',
    segments: [
      seg(1, opt('kurd', ['D4', 'Eb4', 'F4', 'G4'], [293.33, 308.25, 347.65, 391.11])),
      seg(4, opt('nahawand', ['G4', 'A4', 'Bb4', 'C5', 'D5'], [391.11, 440, 463.54, 521.48, 586.66])),
    ],
  },
};

/**
 * 依所选替换音组拼出音阶：后一个音组从它所在的级数起覆盖前面的音（音组之间共享首尾音）。
 * @param {number[]} choice 每个 segment 选第几个 option（缺省 0）
 * @returns {Array<{ degree, token, hz, jins }>}
 */
export function buildMaqam(id, choice = []) {
  const maqam = MAQAMAT[id];
  const byDegree = new Map();
  maqam.segments.forEach((segment, index) => {
    const option = segment.options[choice[index] ?? 0] ?? segment.options[0];
    option.notes.forEach((token, offset) => {
      const degree = segment.degree + offset;
      byDegree.set(degree, { degree, token, hz: option.hz[offset], jins: option.jins });
    });
  });
  return [...byDegree.values()].sort((a, b) => a.degree - b.degree);
}

/** 相邻音之间的音程：24 平均记谱的四分之一音数，以及按给定频率算出的音分 */
export function maqamSteps(notes) {
  return notes.slice(1).map((note, index) => ({
    quarterTones: parseQuarterToneNote(note.token).qt - parseQuarterToneNote(notes[index].token).qt,
    cents: 1200 * Math.log2(note.hz / notes[index].hz),
  }));
}

export const stepLabel = (quarterTones) => ({ 1: '¼', 2: '½', 3: '¾', 4: '1', 5: '1¼', 6: '1½' })[quarterTones] ?? `${quarterTones / 4}`;

// ---------- 印度斯坦 thaat ----------

/** 斯瓦拉（svara）与相对 Sa 的半音数；小写 = komal（降），M' = tivra Ma（升） ref:wiki-thaat */
export const SVARAS = { S: 0, r: 1, R: 2, g: 3, G: 4, M: 5, "M'": 6, P: 7, d: 8, D: 9, n: 10, N: 11 };

export const THAATS = {
  bilaval: { svaras: ['S', 'R', 'G', 'M', 'P', 'D', 'N'], raga: 'Bilaval', mela: [29, 'Sankarabharanam'], western: 'Ionian' },
  kalyan: { svaras: ['S', 'R', 'G', "M'", 'P', 'D', 'N'], raga: 'Yaman', mela: [65, 'Kalyani'], western: 'Lydian' },
  khamaj: { svaras: ['S', 'R', 'G', 'M', 'P', 'D', 'n'], raga: 'Khamaj', mela: [28, 'Harikambhoji'], western: 'Mixolydian' },
  bhairav: { svaras: ['S', 'r', 'G', 'M', 'P', 'd', 'N'], raga: 'Bhairav', mela: [15, 'Mayamalavagowla'], western: 'Double harmonic' },
  kafi: { svaras: ['S', 'R', 'g', 'M', 'P', 'D', 'n'], raga: 'Kafi', mela: [22, 'Kharaharapriya'], western: 'Dorian' },
  asavari: { svaras: ['S', 'R', 'g', 'M', 'P', 'd', 'n'], raga: 'Asavari', mela: [20, 'Natabhairavi'], western: 'Aeolian' },
  bhairavi: { svaras: ['S', 'r', 'g', 'M', 'P', 'd', 'n'], raga: 'Bhairavi', mela: [8, 'Hanumatodi'], western: 'Phrygian' },
  poorvi: { svaras: ['S', 'r', 'G', "M'", 'P', 'd', 'N'], raga: 'Poorvi', mela: [51, 'Kamavardhani'], western: 'Double harmonic ♯4' },
  marva: { svaras: ['S', 'r', 'G', "M'", 'P', 'D', 'N'], raga: 'Marva', mela: [53, 'Gamanashrama'], western: 'Lydian ♭2' },
  todi: { svaras: ['S', 'r', 'g', "M'", 'P', 'd', 'N'], raga: 'Miyan ki Todi', mela: [45, 'Shubhapantuvarali'], western: 'Phrygian ♯4 ♯7' },
};

export const thaatSemitones = (id) => THAATS[id].svaras.map((svara) => SVARAS[svara]);

/** 与 Bilaval 相比被改变（vikrt）的音 */
export const thaatAltered = (id) => THAATS[id].svaras.filter((svara) => !['S', 'R', 'G', 'M', 'P', 'D', 'N'].includes(svara));

/** 五个可变音位各取一种形式，共 32 种组合；返回与之相同的 thaat（不在十个之内则为 null） */
export const VARIABLE_POSITIONS = [['r', 'R'], ['g', 'G'], ['M', "M'"], ['d', 'D'], ['n', 'N']];
export function findThaat(choices) {
  const key = ['S', ...choices.slice(0, 2), choices[2], 'P', ...choices.slice(3)].join(' ');
  return Object.keys(THAATS).find((id) => THAATS[id].svaras.join(' ') === key) ?? null;
}

// ---------- 土耳其 makam（53 koma） ----------

export const KOMAS_PER_OCTAVE = 53;
export const komaCents = (komas) => komas * 1200 / KOMAS_PER_OCTAVE;

/** 维基百科表中 Rast 至 Gerdâniye 一个八度内实际使用的 24 个音（koma 位置相对中央 C = Kaba Çârgâh） ref:wiki-turkish-makam */
export const TURKISH_TONES = [
  ['Rast', 31], ['Nim Zirgüle', 35], ['Zirgüle', 36], ['Dik Zirgüle', 39], ['Dügâh', 40], ['Kürdi', 44], ['Dik Kürdi', 45],
  ['Segâh', 48], ['Bûselik', 49], ['Dik Bûselik', 52], ['Çârgâh', 53], ['Nim Hicâz', 57], ['Hicâz', 58], ['Dik Hicâz', 61],
  ['Nevâ', 62], ['Nim Hisâr', 66], ['Hisâr', 67], ['Dik Hisâr', 70], ['Hüseynî', 71], ['Acem', 75], ['Dik Acem', 76],
  ['Eviç', 79], ['Mâhûr', 80], ['Dik Mâhûr', 83], ['Gerdâniye', 84],
];
const TONE_KOMA = Object.fromEntries(TURKISH_TONES);
Object.assign(TONE_KOMA, { 'Kaba Çârgâh': 0, Yegâh: 9, 'Hüseynî Aşîrân': 18, 'Acem Aşîrân': 22, 'Nim Şehnâz': 88, Muhayyer: 93 });

/** 音程名称与 koma 数（artık ikili 为 12–13） ref:wiki-turkish-makam */
export const TURKISH_INTERVALS = [
  ['koma (fazla)', 1, 'F'], ['eksik bakiye', 3, 'E'], ['bakiye', 4, 'B'], ['küçük mücenneb', 5, 'S'],
  ['büyük mücenneb', 8, 'K'], ['tanîni', 9, 'T'], ['artık ikili', '12–13', 'A'],
];

/** 文中按音名给出的 makam；Çârgâh 为表中粗体音 ref:wiki-turkish-makam */
export const TURKISH_MAKAMS = {
  cargah: { tones: ['Kaba Çârgâh', 'Yegâh', 'Hüseynî Aşîrân', 'Acem Aşîrân', 'Rast', 'Dügâh', 'Bûselik', 'Çârgâh'] },
  rast: {
    tones: ['Rast', 'Dügâh', 'Segâh', 'Çârgâh', 'Nevâ', 'Hüseynî', 'Eviç', 'Gerdâniye'],
    descending: ['Gerdâniye', 'Acem', 'Hüseynî', 'Nevâ', 'Çârgâh', 'Segâh', 'Dügâh', 'Rast'],
    tonic: 'Rast', dominant: 'Nevâ',
  },
  buselik: {
    tones: ['Dügâh', 'Bûselik', 'Çârgâh', 'Nevâ', 'Hüseynî', 'Acem', 'Gerdâniye', 'Muhayyer'],
    variant: ['Dügâh', 'Bûselik', 'Çârgâh', 'Nevâ', 'Hüseynî', 'Acem', 'Nim Şehnâz', 'Muhayyer'],
    tonic: 'Dügâh', dominant: 'Hüseynî',
  },
};

export const turkishKoma = (name) => {
  if (!(name in TONE_KOMA)) throw new Error(`unknown tone ${name}`);
  return TONE_KOMA[name];
};

/** 以中央 C = 261.63 Hz（A4 = 440 的十二平均律）为 Kaba Çârgâh 的频率 */
export const turkishFrequency = (name, middleC = 440 * 2 ** (-9 / 12)) => middleC * 2 ** (turkishKoma(name) / KOMAS_PER_OCTAVE);

export const komaSteps = (tones) => tones.slice(1).map((name, index) => turkishKoma(name) - turkishKoma(tones[index]));

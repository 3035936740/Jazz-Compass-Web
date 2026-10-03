// 和弦标记查询：把各种写法（Cm、C-、C°、CΔ、E+、Cø7、C−7♭5、A#aug/C……）归一化为不带特殊符号的标准写法，
// 按音级拼写和弦音，并给出别名与作用。
// 依据：
//   ref:wiki-chord-notation  维基百科「Chord notation」：三和弦、七和弦、九/十一/十三和弦、加音和弦、挂留和弦表中的各种写法与组成音程；
//                            Δ 单独使用有歧义（有人当作 M，有人当作 M7）；用 2 代替 9 表示加音和弦；单独的 sus 表示 sus4
//   ref:omt2e-chord-symbols  OMT 2e 6.2：三和弦默认大三、七度默认小七度；♯/♭ 表示音程变大/变小；9/11/13 为复音程
//   ref:omt-triads           四种三和弦与五种七和弦的音程构成
//   ref:soundquest-blk       SoundQuest「Blackadder Chord」：aug 和弦加上其根音全音之上的低音构成的分数和弦，自低音起为 [0,2,6,10]；
//                            是"总称"，可写作 9(-5)omit3、+6(+11)omit3 或 X+/Y 等，拼写依上下文
//   ref:wiki-altered-scale   维基百科「Altered scale」：C7alt 是 C7♯5♭9♯9♯11 等写法的简写；保留根音、大三度、小七度，
//                            其余音都变化（♭5／♯11、♯5／♭13、♭9、♯9，自然的 9、11、5、13 不出现）；变化音有多种拼法
//   ref:omt2e-jazz-voicings  OMT 2e 6.3：上方声部用三音与七音（省略五音）的排列
// add／omit：维基百科「Chord notation」——用 add 表示加音（C add9、C7add13）、no3 表示省略（C7no3），
//   强力和弦记作 C5，严格说不是和弦，常用倍根的三音排列；斜杠后的音是低音：是和弦音时为转位，不是时为上方结构。
//   加音默认音程按 OMT 2e 6.2：七度为小七度，其余为大/纯。
// "作用"一栏的出处逐条写在 FUNCTIONS 中。
import { parseNote, spellAbove, parsePitch, intervalBetween } from './pitch_spelling.js';

/**
 * 和弦性质：suffix 为标准写法（只用字母、数字、# 与 b）；tones 为 [度数, 相对根音的半音数]；
 * aliases 为维基百科表中出现的其他写法（会经过与输入相同的归一化后比对）。
 */
export const QUALITIES = [
  { id: 'major', suffix: '', tones: [[1, 0], [3, 4], [5, 7]], aliases: ['M', 'maj', 'major'] },
  { id: 'minor', suffix: 'm', tones: [[1, 0], [3, 3], [5, 7]], aliases: ['-', 'min', 'minor', 'mi'] },
  { id: 'dim', suffix: 'dim', tones: [[1, 0], [3, 3], [5, 6]], aliases: ['°', 'o', 'mb5', 'm°5'] },
  { id: 'aug', suffix: 'aug', tones: [[1, 0], [3, 4], [5, 8]], aliases: ['+', 'M#5', 'M+5', '#5', '+5'] },
  { id: 'sus4', suffix: 'sus4', tones: [[1, 0], [4, 5], [5, 7]], aliases: ['sus'] },
  { id: 'sus2', suffix: 'sus2', tones: [[1, 0], [2, 2], [5, 7]], aliases: [] },
  { id: 'power', suffix: '5', tones: [[1, 0], [5, 7]], aliases: ['no3'] },
  { id: 'six', suffix: '6', tones: [[1, 0], [3, 4], [5, 7], [6, 9]], aliases: ['add6', 'M6', 'maj6'] },
  { id: 'minorSix', suffix: 'm6', tones: [[1, 0], [3, 3], [5, 7], [6, 9]], aliases: ['-6', 'min6'] },
  { id: 'sixNine', suffix: '6/9', tones: [[1, 0], [3, 4], [5, 7], [6, 9], [9, 14]], aliases: ['69', '6add9'] },
  { id: 'minorSixNine', suffix: 'm6/9', tones: [[1, 0], [3, 3], [5, 7], [6, 9], [9, 14]], aliases: ['m69', 'm6add9', '-6/9'] },
  { id: 'add9', suffix: 'add9', tones: [[1, 0], [3, 4], [5, 7], [9, 14]], aliases: ['2', 'add2'] },
  { id: 'minorAdd9', suffix: 'madd9', tones: [[1, 0], [3, 3], [5, 7], [9, 14]], aliases: ['m2', 'madd2', '-add9'] },
  { id: 'dom7', suffix: '7', tones: [[1, 0], [3, 4], [5, 7], [7, 10]], aliases: ['Mm7', 'majb7', 'majm7', 'dom7'] },
  { id: 'maj7', suffix: 'maj7', tones: [[1, 0], [3, 4], [5, 7], [7, 11]], aliases: ['M7', 'Ma7', 'Δ7', 'Δ'] },
  { id: 'min7', suffix: 'm7', tones: [[1, 0], [3, 3], [5, 7], [7, 10]], aliases: ['-7', 'min7', 'mi7'] },
  { id: 'minMaj7', suffix: 'mMaj7', tones: [[1, 0], [3, 3], [5, 7], [7, 11]], aliases: ['mM7', 'm#7', '-M7', '-Δ7', '-Δ', 'minmaj7', 'm(maj7)'] },
  { id: 'halfDim7', suffix: 'm7b5', tones: [[1, 0], [3, 3], [5, 6], [7, 10]], aliases: ['ø', 'ø7', 'min7dim5', 'm7°5', '-7b5', '-7°5', 'm7-5'] },
  { id: 'dim7', suffix: 'dim7', tones: [[1, 0], [3, 3], [5, 6], [7, 9]], aliases: ['°7', 'o7'] },
  { id: 'aug7', suffix: 'aug7', tones: [[1, 0], [3, 4], [5, 8], [7, 10]], aliases: ['+7', '7#5', '7+5'] },
  { id: 'augMaj7', suffix: 'augMaj7', tones: [[1, 0], [3, 4], [5, 8], [7, 11]], aliases: ['+M7', '+Δ', 'maj7#5', 'M7#5', 'M7+5', 'Δ#5', 'Δ+5'] },
  { id: 'dom7b5', suffix: '7b5', tones: [[1, 0], [3, 4], [5, 6], [7, 10]], aliases: ['7dim5', '7-5'] },
  { id: 'sus7', suffix: '7sus4', tones: [[1, 0], [4, 5], [5, 7], [7, 10]], aliases: ['7sus'] },
  { id: 'dom9', suffix: '9', tones: [[1, 0], [3, 4], [5, 7], [7, 10], [9, 14]], aliases: [] },
  { id: 'maj9', suffix: 'maj9', tones: [[1, 0], [3, 4], [5, 7], [7, 11], [9, 14]], aliases: ['M9', 'Δ9'] },
  { id: 'min9', suffix: 'm9', tones: [[1, 0], [3, 3], [5, 7], [7, 10], [9, 14]], aliases: ['-9', 'min9'] },
  { id: 'dom7b9', suffix: '7b9', tones: [[1, 0], [3, 4], [5, 7], [7, 10], [9, 13]], aliases: ['7-9'] },
  { id: 'dom7s9', suffix: '7#9', tones: [[1, 0], [3, 4], [5, 7], [7, 10], [9, 15]], aliases: ['7+9'] },
  { id: 'dom7s11', suffix: '7#11', tones: [[1, 0], [3, 4], [5, 7], [7, 10], [11, 18]], aliases: ['7+11'] },
  { id: 'dom9s11', suffix: '9#11', tones: [[1, 0], [3, 4], [5, 7], [7, 10], [9, 14], [11, 18]], aliases: ['9+11'] },
  { id: 'dom11', suffix: '11', tones: [[1, 0], [3, 4], [5, 7], [7, 10], [9, 14], [11, 17]], aliases: [] },
  { id: 'min11', suffix: 'm11', tones: [[1, 0], [3, 3], [5, 7], [7, 10], [9, 14], [11, 17]], aliases: ['-11', 'min11'] },
  { id: 'dom13', suffix: '13', tones: [[1, 0], [3, 4], [5, 7], [7, 10], [9, 14], [11, 17], [13, 21]], aliases: [] },
  { id: 'maj13', suffix: 'maj13', tones: [[1, 0], [3, 4], [5, 7], [7, 11], [9, 14], [11, 17], [13, 21]], aliases: ['M13', 'Δ13'] },
  { id: 'min13', suffix: 'm13', tones: [[1, 0], [3, 3], [5, 7], [7, 10], [9, 14], [11, 17], [13, 21]], aliases: ['-13', 'min13'] },
  // alt：和弦音不固定——必有根音、大三度、小七度，其余从变化音中选取  ref:wiki-altered-scale
  { id: 'alt', suffix: '7alt', tones: [[1, 0], [3, 4], [7, 10]], aliases: ['alt', 'alt7', '7alt'], random: true },
  // Blackadder：标准写法按 SoundQuest 用低音作名称，组成音自低音起 [0,2,6,10]  ref:soundquest-blk
  // SoundQuest 列出的张力和弦读法 9(-5)omit3、+6(+11)omit3 也是同一组音  ref:soundquest-blk
  { id: 'blk', suffix: 'blk', tones: [[1, 0], [9, 14], [11, 18], [7, 10]], aliases: ['Blk', 'BLK', 'blackadder', '9(b5)omit3', '9(-5)omit3', '+6(#11)omit3', '+6(+11)omit3'] },
];

/** 写法的归一化：统一升降号、去掉空格与括号，把位置决定含义的符号（开头的 - + o，数字前的 + -）换成字母写法 */
export function normalizeSuffix(raw) {
  let s = String(raw)
    .replace(/♯/g, '#').replace(/♭/g, 'b').replace(/[−–]/g, '-')
    .replace(/[\s(),]/g, '')
    .replace(/delta|deta|\^/gi, 'Δ')
    .replace(/Ø/g, 'ø').replace(/[º˚]/g, '°');
  if (s.startsWith('-')) s = `m${s.slice(1)}`;
  else if (s.startsWith('+')) s = `aug${s.slice(1)}`;
  else if (/^o(\d|$)/.test(s)) s = `°${s.slice(1)}`;
  s = s
    .replace(/\+(?=\d)/g, '#').replace(/-(?=\d)/g, 'b')
    .replace(/(.)°(?=5)/g, '$1b').replace(/(.)dim5/g, '$1b5').replace(/(.)aug5/g, '$1#5')
    .replace(/min|mi(?!n)/g, 'm')
    .replace(/Maj|MAJ|Ma/g, 'maj').replace(/M/g, 'maj')
    // Δ 后接数字（Δ7、Δ9、Δ13）时等于 maj；单独或后接变化音（Δ、−Δ、Δ#5）时按 maj7  ref:wiki-chord-notation
    .replace(/Δ(?=\d)/g, 'maj').replace(/Δ/g, 'maj7')
    .replace(/°/g, 'dim').replace(/ø/g, 'm7b5').replace(/m7b57/, 'm7b5')
    .replace(/^aug(?=maj7|maj9|7|9|11|13)/, 'aug');
  return s;
}

const ALIAS_INDEX = new Map();
QUALITIES.forEach((quality) => {
  [quality.suffix, ...quality.aliases].forEach((alias) => {
    const key = normalizeSuffix(alias);
    if (!ALIAS_INDEX.has(key)) ALIAS_INDEX.set(key, quality.id);
  });
});
export const qualityById = (id) => QUALITIES.find((quality) => quality.id === id);

const ROOT = /^([A-Ga-g])(##|bb|#|b|♯|♭|x|𝄪|𝄫)?/;
const cleanRoot = (text) => {
  const m = ROOT.exec(text);
  if (!m) return null;
  const accidental = (m[2] || '').replace('♯', '#').replace('♭', 'b').replace(/x|𝄪/, '##').replace('𝄫', 'bb');
  return { name: m[1].toUpperCase() + accidental, rest: text.slice(m[0].length) };
};

function rootReadings(text) {
  const m = ROOT.exec(text);
  if (!m) return [];
  // 例如 "Bbblk"：依次尝试 Bbb + "lk"、Bb + "blk"、B + "bblk"
  const readings = [];
  for (let length = m[0].length; length >= 1; length -= 1) {
    const reading = cleanRoot(text.slice(0, length));
    if (reading && !reading.rest) readings.push({ name: reading.name, rest: text.slice(length) });
  }
  return readings;
}

/**
 * 解析一个和弦标记。
 * @returns {{ canonical, root, quality, bass, input, notes: string[], tones, aliases: string[], ambiguous?: string, blk?: object } | null}
 */
export function parseChordSymbol(input) {
  const text = String(input).trim();
  if (!text) return null;
  const slash = text.lastIndexOf('/');
  // 6/9 中的 /9 不是低音
  const hasBass = slash > 0 && /^[A-Ga-g]/.test(text.slice(slash + 1).trim());
  const main = hasBass ? text.slice(0, slash) : text;
  // 根音的升降号与后缀可能共用字母（Cblk 的 b 不是降号），依次尝试较长、较短的根音读法
  // 先按完整写法比对；不行再拆出 add／omit／no 修饰（如 C7omit3、Cadd11、C9(no5)）
  let modifiers = [];
  let root = rootReadings(main.trim()).find((reading) => ALIAS_INDEX.has(normalizeSuffix(reading.rest)));
  if (!root) {
    for (const reading of rootReadings(main.trim())) {
      const split = splitModifiers(reading.rest);
      if (split && ALIAS_INDEX.has(normalizeSuffix(split.base))) { root = { ...reading, rest: split.base }; modifiers = split.modifiers; break; }
    }
  }
  if (!root || !parseNote(root.name)) return null;
  const bass = hasBass ? cleanRoot(text.slice(slash + 1).trim()) : null;
  if (hasBass && (!bass || bass.rest.trim() || !parseNote(bass.name))) return null;
  const qualityId = ALIAS_INDEX.get(normalizeSuffix(root.rest));
  const ambiguous = /^\s*(Δ|delta|deta|\^)\s*$/i.test(root.rest) ? 'delta' : /^\s*(°|o|dim)\s*$/.test(root.rest) ? 'dim' : null;

  // aug 和弦 + 根音全音之上的低音 = Blackadder（以低音命名）  ref:soundquest-blk
  if (qualityId === 'aug' && bass && (parseNote(bass.name).pc - parseNote(root.name).pc + 12) % 12 === 2) {
    return buildBlk(bass.name, root.name, text);
  }
  if (qualityId === 'blk') return buildBlk(root.name, null, text, bass?.name);
  return buildChord(root.name, qualityById(qualityId), bass?.name ?? null, text, ambiguous, modifiers);
}

/** 拆出 add／omit／no 修饰；没有修饰时返回 null */
const MODIFIER = /\(?\s*(add|omit|no)\s*([#b♯♭+-]?)\s*(\d{1,2})(?:st|nd|rd|th)?\s*\)?/gi;
export function splitModifiers(rest) {
  const modifiers = [];
  const base = String(rest).replace(MODIFIER, (_, kind, accidental, number) => {
    const alter = /[#♯+]/.test(accidental) ? 1 : /[b♭-]/.test(accidental) ? -1 : 0;
    modifiers.push({ kind: kind.toLowerCase() === 'add' ? 'add' : 'omit', degree: Number(number), alter });
    return '';
  });
  return modifiers.length ? { base, modifiers } : null;
}

/** 加音默认音程：七度为小七度，其余为大/纯（OMT 2e 6.2）  ref:omt2e-chord-symbols */
const ADD_SEMITONES = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 10, 8: 12, 9: 14, 10: 16, 11: 17, 12: 19, 13: 21 };
const modifierText = (m) => `${m.kind}${m.alter > 0 ? '#' : m.alter < 0 ? 'b' : ''}${m.degree}`;

/**
 * alt 的一种具体实现：根音、三音、七音 + 2～3 个变化音（各取一种拼法），排列也随机（三音或七音在下）。
 * rng 可注入以便测试。  ref:wiki-altered-scale ref:omt2e-jazz-voicings
 */
export function realizeAlt(root, rng = Math.random) {
  const groups = [
    [[9, 13]], [[9, 15]],          // ♭9、♯9
    [[5, 6], [11, 18]],            // ♭5 或 ♯11（同音）
    [[5, 8], [13, 20]],            // ♯5 或 ♭13（同音）
  ];
  const order = [0, 1, 2, 3].sort(() => rng() - 0.5);
  const count = rng() < 0.5 ? 2 : 3;
  const chosen = order.slice(0, count).sort((a, b) => a - b).map((g) => groups[g][Math.floor(rng() * groups[g].length)]);
  const tones = [[1, 0], [3, 4], [7, 10], ...chosen].map(([degree, semitones]) => ({ degree, semitones, name: spellAbove(root, (degree - 1) % 7, semitones % 12) }));
  const labels = chosen.map(([degree, semitones]) => {
    const natural = ADD_SEMITONES[degree];
    return `${semitones % 12 > natural % 12 || (degree === 5 && semitones === 8) ? '#' : 'b'}${degree}`;
  });
  return { tones, realization: `${root}7(${labels.join('')})`, guideTonesUp: rng() < 0.5 };
}

function spellTones(root, quality) {
  return quality.tones.map(([degree, semitones]) => ({
    degree, semitones, name: spellAbove(root, (degree - 1) % 7, semitones % 12),
  }));
}

/** 密集排列：根音在 rootOctave，各音按度数向上叠（9、11、13 在高八度），低音放在根音下方 */
function voice(root, tones, rootOctave, bass) {
  const rootPitch = parsePitch(`${root}${rootOctave}`);
  const pitches = tones.map((tone) => `${tone.name}${Math.floor((rootPitch.diatonic + tone.degree - 1) / 7)}`)
    .sort((a, b) => parsePitch(a).midi - parsePitch(b).midi);
  if (bass && parseNote(bass).pc !== parseNote(root).pc) {
    let octave = rootOctave;
    while (octave > 0 && parsePitch(`${bass}${octave}`).midi >= rootPitch.midi) octave -= 1;
    pitches.unshift(`${bass}${octave}`);
  }
  return pitches;
}

export function buildChord(root, quality, bass, input = '', ambiguous = null, modifiers = [], rng = Math.random) {
  let tones = spellTones(root, quality);
  let realization = null;
  let shell = false;
  if (quality.random) {
    const alt = realizeAlt(root, rng);
    tones = alt.tones;
    realization = alt.realization;
    shell = alt.guideTonesUp;
  }
  // add：按度数加音；omit／no：去掉该度数的音（如 omit5 也去掉 ♭5、♯5）
  modifiers.filter((m) => m.kind === 'add').forEach((m) => {
    const semitones = (ADD_SEMITONES[m.degree] ?? 0) + m.alter;
    if (!tones.some((t) => t.degree === m.degree && t.semitones === semitones)) tones.push({ degree: m.degree, semitones, name: spellAbove(root, (m.degree - 1) % 7, ((semitones % 12) + 12) % 12) });
  });
  modifiers.filter((m) => m.kind === 'omit').forEach((m) => { tones = tones.filter((t) => t.degree !== m.degree); });
  tones.sort((a, b) => (a.degree === 1 ? -1 : b.degree === 1 ? 1 : (a.semitones % 12 === b.semitones % 12 ? 0 : a.degree - b.degree)));
  const mods = [...modifiers.filter((m) => m.kind === 'add').sort((a, b) => a.degree - b.degree), ...modifiers.filter((m) => m.kind === 'omit').sort((a, b) => a.degree - b.degree)].map(modifierText).join('');
  const slashPart = bass && parseNote(bass).pc !== parseNote(root).pc ? `/${bass}` : '';
  const canonical = `${root}${quality.suffix}${mods}${slashPart}`;
  const omitAliases = mods ? [mods.replace(/omit/g, 'no'), mods.replace(/omit(\d+)/g, '(no$1)')] : [''];
  const aliases = [...new Set([quality.suffix, ...quality.aliases].flatMap((suffix) => omitAliases.map((m) => `${root}${prettySuffix(suffix)}${m}${slashPart}`)))]
    .filter((name) => name !== canonical);
  const rootOctave = tones.length > 4 || parsePitch(`${root}4`).midi > 64 ? 3 : 4;
  let pitches = voice(root, tones, rootOctave, bass);
  // 强力和弦常用倍根的三音排列（根音、五度、高八度根音）
  if (quality.id === 'power' && !modifiers.length) pitches = [...pitches, `${root}${rootOctave + 1}`];
  // alt：一半的情况把三音移高八度，形成"根音–七音–三音"的排列
  if (shell) {
    const third = tones.find((t) => t.degree === 3);
    pitches = pitches.map((p) => (third && p.startsWith(third.name) && parsePitch(p).pc === parsePitch(`${third.name}4`).pc ? `${third.name}${Number(p.match(/-?\d+$/)[0]) + 1}` : p))
      .sort((a, b) => parsePitch(a).midi - parsePitch(b).midi);
  }
  return {
    canonical, root, quality: quality.id, bass, input, tones, aliases, ambiguous, modifiers, realization,
    pitches, slash: slashPart ? slashInfo(tones, bass) : null,
  };
}

/** 斜杠和弦：低音是和弦音时为转位（三音 = 第一转位，五音 = 第二转位，七音 = 第三转位），否则为上方结构  ref:wiki-chord-notation */
export function slashInfo(tones, bass) {
  const pc = parseNote(bass).pc;
  const tone = tones.find((t) => parseNote(t.name).pc === pc);
  if (!tone) return { kind: 'non-chord' };
  const inversion = { 3: 1, 5: 2, 7: 3 }[tone.degree];
  return inversion ? { kind: 'inversion', inversion, degree: tone.degree } : { kind: 'tension-bass', degree: tone.degree };
}

/** 别名展示用：把字母写法里的减、增号还原为常见的显示符号（仅用于"其他写法"列表） */
export function prettySuffix(suffix) {
  return suffix;
}

/**
 * Blackadder：bass 为名称音。按定义（aug 和弦 + 其根音全音之上的低音）拼写：aug 的根音取低音下方的大二度（低一个字母），
 * 例如 Cblk = C | B♭ D F♯。输入写成 A#aug/C 时也按此拼写，并记下输入的 aug 根音（A♯ = B♭ 等音）。
 * 另列 SoundQuest 给出的张力和弦读法：9(-5)omit3 与 +6(+11)omit3。  ref:soundquest-blk
 */
export function buildBlk(bass, inputAugRoot = null, input = '', extraBass = null) {
  const aug = spellAbove(bass, -1, -2);
  const augTones = [[1, 0], [3, 4], [5, 8]].map(([degree, semitones]) => spellAbove(aug, degree - 1, semitones));
  const bassPitch = parsePitch(`${bass}3`);
  let augOctave = 3;
  while (parsePitch(`${aug}${augOctave}`).midi <= bassPitch.midi) augOctave += 1;
  const augRootPitch = parsePitch(`${aug}${augOctave}`);
  const augPitches = augTones.map((name, i) => `${name}${Math.floor((augRootPitch.diatonic + [0, 2, 4][i]) / 7)}`);
  // 相对低音：aug 根音 = ♭7，aug 三音 = 9，aug 五音 = ♯11
  const tones = [{ name: bass, degree: 1, semitones: 0 }, { name: augTones[0], degree: 7, semitones: 10 }, { name: augTones[1], degree: 9, semitones: 14 }, { name: augTones[2], degree: 11, semitones: 18 }];
  const readings = [
    { kind: 'slash', name: `${aug}aug/${bass}`, notes: [bass, ...augTones] },
    { kind: 'b5', name: `${bass}9(b5)omit3`, notes: [bass, spellAbove(bass, 1, 2), spellAbove(bass, 4, 6), spellAbove(bass, 6, 10)] },
    { kind: 'aug6', name: `${bass}+6(#11)omit3`, notes: [bass, spellAbove(bass, 1, 2), spellAbove(bass, 3, 6), spellAbove(bass, 5, 10)] },
  ];
  const enharmonicInput = inputAugRoot && inputAugRoot !== aug ? inputAugRoot : null;
  return {
    canonical: `${bass}blk`, root: bass, quality: 'blk', bass: extraBass, input, tones,
    pitches: [`${bass}3`, ...augPitches],
    aliases: [`${aug}aug/${bass}`, `${aug}+/${bass}`, ...(enharmonicInput ? [`${enharmonicInput}aug/${bass}`] : []), `${bass}9(#11)omit3`, `${bass}9(b5)omit3`, `${bass}+6(#11)omit3`],
    blk: { aug, readings, enharmonicInput },
  };
}

const ROLE_BY_DEGREE = { 1: 'root', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth', 6: 'sixth', 7: 'seventh', 9: 'ninth', 11: 'eleventh', 13: 'thirteenth' };
const PERFECT = new Set([1, 4, 5, 8, 11, 12]);

/** 和弦图常用的度数标签：相对大/纯音程的变化，m3 → ♭3、d7 → 𝄫7、A11 → ♯11 */
export function chordLabel(interval, degree) {
  const simple = ((degree - 1) % 7) + 1;
  const perfect = PERFECT.has(simple) || PERFECT.has(degree);
  const q = interval.quality;
  let alteration = 0;
  if (q === 'M' || q === 'P') alteration = 0;
  else if (q === 'm') alteration = -1;
  else if (/^A+$/.test(q)) alteration = q.length;
  else if (/^d+$/.test(q)) alteration = perfect ? -q.length : -q.length - 1;
  const sign = alteration > 0 ? '♯'.repeat(alteration) : alteration === -2 ? '𝄫' : '♭'.repeat(-alteration);
  return `${sign}${degree}`;
}

/** 每个和弦音：名称、角色（根音、三音……）、与根音的音程、和弦图标签 */
export function describeTones(chord) {
  const rootPitch = parsePitch(`${chord.root}4`);
  return chord.tones.map((tone) => {
    if (tone.degree === 1) return { name: tone.name, degree: 1, role: 'root', interval: null, label: '1' };
    const target = `${tone.name}${Math.floor((rootPitch.diatonic + tone.degree - 1) / 7)}`;
    const interval = intervalBetween(rootPitch.name, target);
    return { name: tone.name, degree: tone.degree, role: ROLE_BY_DEGREE[tone.degree], interval, label: chordLabel(interval, tone.degree) };
  });
}

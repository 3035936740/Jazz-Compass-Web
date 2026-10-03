// 乐理闯关：题目生成器。进阶关与综合测验里的 { type: 'gen', gen: '<名称>', count, params } 会在开局时展开成具体题卡，
// 每次游玩都不同。所有题目都由已登记资料里的定义计算出来（音阶、音程、和弦、调号、PLR、轴心体系、负和声……），
// 每个生成器标出它依据的资料：
//   ref:omt2e-keyboard ref:omt2e-half-whole ref:omt2e-clefs ref:omt2e-aspn ref:omt2e-rhythm ref:omt2e-simple-meter
//   ref:omt2e-compound-meter ref:omt2e-major-scales ref:omt2e-minor ref:omt2e-modes ref:omt2e-intervals ref:omt-intervals
//   ref:omt2e-triads ref:omt2e-sevenths ref:omt-triads ref:wiki-chord-notation ref:omt2e-figured-bass ref:omt2e-roman-numerals
//   ref:omt2e-tonicization ref:omt2e-neapolitan ref:omt2e-neo-riemannian ref:wiki-negative-harmony ref:wiki-circle-of-fifths
//   ref:wiki-axis-system ref:wiki-closely-related ref:wiki-twelve-bar ref:omt2e-iivi ref:omt2e-substitutions
//   ref:omt2e-jazz-voicings ref:omt2e-chord-scale ref:wiki-voicing ref:omt2e-intro ref:wiki-transposing-list
//   ref:wiki-standard-tuning ref:zhwiki-pentatonic ref:zhwiki-heptatonic ref:wiki-thaat ref:wiki-pythagorean
//   ref:wiki-harmonic-series ref:omt2e-pitch-class ref:omt2e-integer-intervals ref:omt2e-normal-order ref:omt2e-prime-form
//   ref:omt2e-ic-vector ref:omt2e-twelve-tone ref:musictheory-net-cadences ref:omt2e-embellishing ref:omt2e-blues-scale
//   ref:wiki-bebop-scale ref:wiki-jazz-minor ref:wiki-harmonic-minor ref:wiki-harmonic-major ref:wiki-whole-tone
//   ref:wiki-octatonic ref:wiki-neapolitan-scale ref:wiki-double-harmonic ref:wiki-altered-scale ref:wiki-limit ref:hf-intervals
//   ref:wiki-turkish-makam ref:wiki-metre ref:omt2e-rhythm-more ref:wiki-neutral-third ref:omt-species2 ref:omt-species4 ref:mto-mcclimon ref:guitar-chord-drop ref:omt2e-20c-rhythm
import { spellAbove, spellHeptatonic, parsePitch, parseNote, intervalBetween, simplestName } from './pitch_spelling.js';
import { primeForm, intervalVector, transpose, invert, mod12, formatSet } from './post_tonal.js';
import { THAATS, thaatSemitones } from './world_modes.js';
import { writtenToConcert } from './instruments.js';
import { midiAt } from './fretboard.js';
import { shuffle } from './learn_engine.js?v=20261003-s3';

const t = (zh, ja, en) => ({ zh, ja, en });
const fmt = (template, values) => Object.fromEntries(Object.entries(template).map(([lang, text]) => [lang, text.replace(/\{(\w+)\}/g, (_, key) => {
  const value = values[key];
  return value && typeof value === 'object' ? value[lang] : String(value);
})]));
/** 音名显示：C# → C♯，Bb → B♭（和弦记号里的 b5 → ♭5） */
export const pn = (name) => String(name).replace(/#/g, '♯').replace(/(?<=[A-G])b+/g, (m) => '♭'.repeat(m.length)).replace(/b(?=\d)/g, '♭');
const pick = (rng, items) => items[Math.floor(rng() * items.length)];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/** 选择题：正确项排第一，再补不重复的干扰项（界面会打乱顺序） */
function choice(rng, { ref, prompt, correct, wrong, hint, explain, n = 4, ...extra }) {
  const options = [correct];
  const odd = (o) => typeof o === 'string' && /♭♭|♯♯/.test(o) && !(typeof correct === 'string' && /♭♭|♯♯/.test(correct));
  for (const item of shuffle(wrong, rng)) {
    if (options.length >= n) break;
    if (!options.some((o) => same(o, item)) && !odd(item)) options.push(item);
  }
  return { type: 'choice', ref, prompt, options, answer: 0, hint, explain, ...extra };
}
function fill(rng, { ref, prompt, answer, extra = [], hint, explain, ...rest }) {
  const bank = [];
  [...answer, ...extra].forEach((label) => { if (!bank.some((b) => b.label === label)) bank.push({ id: `b${bank.length}`, label }); });
  return { type: 'fill', ref, prompt, bank, answer: answer.map((label) => bank.find((b) => b.label === label).id), hint, explain, ...rest };
}
function match(rng, { ref, prompt, pairs, hint, explain, ...rest }) {
  return { type: 'match', ref, prompt, pairs, hint, explain, ...rest };
}

// ---------- 共用数据 ----------
const ROOTS = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Bb', 'Eb', 'Ab', 'F#', 'Db'];
const EASY_ROOTS = ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'Eb'];
const MAJOR_KEYS = { C: 0, G: 1, D: 2, A: 3, E: 4, B: 5, 'F#': 6, 'C#': 7, F: -1, Bb: -2, Eb: -3, Ab: -4, Db: -5, Gb: -6, Cb: -7 };
const SHARPS = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
const CIRCLE = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
const MAJOR = [0, 2, 4, 5, 7, 9, 11];
const NAT_MINOR = [0, 2, 3, 5, 7, 8, 10];
const HARM_MINOR = [0, 2, 3, 5, 7, 8, 11];
const MEL_MINOR = [0, 2, 3, 5, 7, 9, 11];
const sigLabel = (n) => (n === 0 ? t('没有升降号', '調号なし', 'no sharps or flats') : n > 0 ? fmt(t('{n} 个升号', 'シャープ {n} つ', '{n} sharps'), { n }) : fmt(t('{n} 个降号', 'フラット {n} つ', '{n} flats'), { n: -n }));
const relMinor = (major) => spellAbove(major, 5, 9);
const midiOf = (name, octave = 4) => parsePitch(`${name}${octave}`)?.midi ?? 60;
/** 从低到高的 MIDI：每个音都高于前一个 */
function ascendingMidis(names, start = 4) {
  const out = [];
  names.forEach((name) => {
    let midi = midiOf(name, start);
    while (out.length && midi <= out[out.length - 1]) midi += 12;
    out.push(midi);
  });
  return out;
}
const pitchNames = (names, start = 4) => ascendingMidis(names, start).map((midi, i) => `${names[i]}${Math.floor(midi / 12) - 1}`);

const MODES = [
  { id: 'ionian', name: 'Ionian', iv: [0, 2, 4, 5, 7, 9, 11] },
  { id: 'dorian', name: 'Dorian', iv: [0, 2, 3, 5, 7, 9, 10] },
  { id: 'phrygian', name: 'Phrygian', iv: [0, 1, 3, 5, 7, 8, 10] },
  { id: 'lydian', name: 'Lydian', iv: [0, 2, 4, 6, 7, 9, 11] },
  { id: 'mixolydian', name: 'Mixolydian', iv: [0, 2, 4, 5, 7, 9, 10] },
  { id: 'aeolian', name: 'Aeolian', iv: [0, 2, 3, 5, 7, 8, 10] },
  { id: 'locrian', name: 'Locrian', iv: [0, 1, 3, 5, 6, 8, 10] },
];
const BRIGHTNESS = ['Lydian', 'Ionian', 'Mixolydian', 'Dorian', 'Aeolian', 'Phrygian', 'Locrian'];

/**
 * 和弦音阶速查里的音阶（与 jazz_compass.js 的 scaleMode 一致），每个都标出依据与母音阶。
 * family 对应速查里的"和弦家族"，chord 是家族对应的和弦记号后缀。
 */
export const SCALE_LIBRARY = [
  { id: 'ionian', name: 'Ionian', iv: [0, 2, 4, 5, 7, 9, 11], ref: 'omt2e-modes', chord: 'maj7', parent: ['major', 1] },
  { id: 'dorian', name: 'Dorian', iv: [0, 2, 3, 5, 7, 9, 10], ref: 'omt2e-modes', chord: 'm7', parent: ['major', 2] },
  { id: 'phrygian', name: 'Phrygian', iv: [0, 1, 3, 5, 7, 8, 10], ref: 'omt2e-modes', chord: 'm7', parent: ['major', 3] },
  { id: 'lydian', name: 'Lydian', iv: [0, 2, 4, 6, 7, 9, 11], ref: 'omt2e-modes', chord: 'maj7', parent: ['major', 4] },
  { id: 'mixolydian', name: 'Mixolydian', iv: [0, 2, 4, 5, 7, 9, 10], ref: 'omt2e-modes', chord: '7', parent: ['major', 5] },
  { id: 'aeolian', name: 'Aeolian', iv: [0, 2, 3, 5, 7, 8, 10], ref: 'omt2e-modes', chord: 'm7', parent: ['major', 6] },
  { id: 'locrian', name: 'Locrian', iv: [0, 1, 3, 5, 6, 8, 10], ref: 'omt2e-modes', chord: 'm7b5', parent: ['major', 7] },
  { id: 'melodic_minor', name: 'Melodic Minor (Jazz Minor)', iv: [0, 2, 3, 5, 7, 9, 11], ref: 'wiki-jazz-minor', chord: 'mMaj7', parent: ['melodic', 1] },
  { id: 'dorian_flat_2', name: 'Dorian ♭2', iv: [0, 1, 3, 5, 7, 9, 10], ref: 'wiki-jazz-minor', chord: 'm7', parent: ['melodic', 2] },
  { id: 'lydian_sharp_5', name: 'Lydian ♯5', iv: [0, 2, 4, 6, 8, 9, 11], ref: 'wiki-jazz-minor', chord: 'maj7#5', parent: ['melodic', 3] },
  { id: 'lydian_dominant', name: 'Lydian Dominant', iv: [0, 2, 4, 6, 7, 9, 10], ref: 'wiki-jazz-minor', chord: '7', parent: ['melodic', 4] },
  { id: 'aeolian_dominant', name: 'Mixolydian ♭6', iv: [0, 2, 4, 5, 7, 8, 10], ref: 'wiki-jazz-minor', chord: '7', parent: ['melodic', 5] },
  { id: 'aeolian_flat_5', name: 'Locrian ♮2', iv: [0, 2, 3, 5, 6, 8, 10], ref: 'wiki-jazz-minor', chord: 'm7b5', parent: ['melodic', 6] },
  { id: 'altered_dominant', name: 'Altered (Super Locrian)', iv: [0, 1, 3, 4, 6, 8, 10], ref: 'wiki-altered-scale', chord: '7', parent: ['melodic', 7] },
  { id: 'harmonic_minor', name: 'Harmonic Minor', iv: [0, 2, 3, 5, 7, 8, 11], ref: 'wiki-harmonic-minor', chord: 'mMaj7', parent: ['harmonic', 1] },
  { id: 'locrian_natural_6', name: 'Locrian ♮6', iv: [0, 1, 3, 5, 6, 9, 10], ref: 'wiki-harmonic-minor', chord: 'm7b5', parent: ['harmonic', 2] },
  { id: 'ionian_sharp_5', name: 'Ionian ♯5', iv: [0, 2, 4, 5, 8, 9, 11], ref: 'wiki-harmonic-minor', chord: 'maj7#5', parent: ['harmonic', 3] },
  { id: 'dorian_sharp_4', name: 'Dorian ♯4', iv: [0, 2, 3, 6, 7, 9, 10], ref: 'wiki-harmonic-minor', chord: 'm7', parent: ['harmonic', 4] },
  { id: 'phrygian_dominant', name: 'Phrygian Dominant', iv: [0, 1, 4, 5, 7, 8, 10], ref: 'wiki-harmonic-minor', chord: '7', parent: ['harmonic', 5] },
  { id: 'lydian_sharp_2', name: 'Lydian ♯2', iv: [0, 3, 4, 6, 7, 9, 11], ref: 'wiki-harmonic-minor', chord: 'maj7', parent: ['harmonic', 6] },
  { id: 'altered_super_locrian', name: 'Super Locrian 𝄫7', iv: [0, 1, 3, 4, 6, 8, 9], ref: 'wiki-harmonic-minor', chord: 'dim7', parent: ['harmonic', 7] },
  { id: 'harmonic_major', name: 'Harmonic Major', iv: [0, 2, 4, 5, 7, 8, 11], ref: 'wiki-harmonic-major', chord: 'maj7', parent: null },
  { id: 'neapolitan_minor', name: 'Neapolitan Minor', iv: [0, 1, 3, 5, 7, 8, 11], ref: 'wiki-neapolitan-scale', chord: 'mMaj7', parent: null },
  { id: 'neapolitan_major', name: 'Neapolitan Major', iv: [0, 1, 3, 5, 7, 9, 11], ref: 'wiki-neapolitan-scale', chord: 'mMaj7', parent: null },
  { id: 'arabic', name: 'Double Harmonic (Arabic)', iv: [0, 1, 4, 5, 7, 8, 11], ref: 'wiki-double-harmonic', chord: 'maj7', parent: null },
];
const PARENT_NAME = { major: t('大调', '長音階', 'major'), melodic: t('旋律小调（爵士小调）', '旋律短音階（ジャズ・マイナー）', 'melodic (jazz) minor'), harmonic: t('和声小调', '和声短音階', 'harmonic minor') };
const PARENT_IV = { major: MAJOR, melodic: MEL_MINOR, harmonic: HARM_MINOR };
const CHORD_TONES = { maj7: [[2, 4], [4, 7], [6, 11]], 7: [[2, 4], [4, 7], [6, 10]], m7: [[2, 3], [4, 7], [6, 10]], mMaj7: [[2, 3], [4, 7], [6, 11]], m7b5: [[2, 3], [4, 6], [6, 10]], dim7: [[2, 3], [4, 6], [6, 9]], 'maj7#5': [[2, 4], [4, 8], [6, 11]], '7#5': [[2, 4], [4, 8], [6, 10]] };
const chordNotes = (root, suffix) => [root, ...CHORD_TONES[suffix].map(([s, n]) => spellAbove(root, s, n))];

const INTERVALS = [
  ['m2', 1, 1, t('小二度', '短 2 度', 'minor 2nd')], ['M2', 1, 2, t('大二度', '長 2 度', 'major 2nd')],
  ['m3', 2, 3, t('小三度', '短 3 度', 'minor 3rd')], ['M3', 2, 4, t('大三度', '長 3 度', 'major 3rd')],
  ['P4', 3, 5, t('纯四度', '完全 4 度', 'perfect 4th')], ['A4', 3, 6, t('增四度', '増 4 度', 'augmented 4th')],
  ['d5', 4, 6, t('减五度', '減 5 度', 'diminished 5th')], ['P5', 4, 7, t('纯五度', '完全 5 度', 'perfect 5th')],
  ['m6', 5, 8, t('小六度', '短 6 度', 'minor 6th')], ['M6', 5, 9, t('大六度', '長 6 度', 'major 6th')],
  ['m7', 6, 10, t('小七度', '短 7 度', 'minor 7th')], ['M7', 6, 11, t('大七度', '長 7 度', 'major 7th')],
  ['P8', 7, 12, t('纯八度', '完全 8 度', 'perfect octave')],
];
const intervalByCode = (code) => INTERVALS.find((i) => i[0] === code);
const INVERT = { m2: 'M7', M2: 'm7', m3: 'M6', M3: 'm6', P4: 'P5', A4: 'd5', d5: 'A4', P5: 'P4', m6: 'M3', M6: 'm3', m7: 'M2', M7: 'm2' };
const TRIADS = { major: [[2, 4], [4, 7]], minor: [[2, 3], [4, 7]], diminished: [[2, 3], [4, 6]], augmented: [[2, 4], [4, 8]] };
const TRIAD_NAME = { major: t('大三和弦', '長三和音', 'major triad'), minor: t('小三和弦', '短三和音', 'minor triad'), diminished: t('减三和弦', '減三和音', 'diminished triad'), augmented: t('增三和弦', '増三和音', 'augmented triad') };
const SEVENTH_NAME = { maj7: t('大七和弦', '長七の和音', 'major seventh'), 7: t('属七和弦', '属七の和音', 'dominant seventh'), m7: t('小七和弦', '短七の和音', 'minor seventh'), m7b5: t('半减七和弦', '半減七の和音', 'half-diminished seventh'), dim7: t('减七和弦', '減七の和音', 'diminished seventh') };
const triadNotes = (root, quality) => [root, ...TRIADS[quality].map(([s, n]) => spellAbove(root, s, n))];

// 三和弦（PLR 等变换用）：用音级与大小表示
const MAJ_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const MIN_NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
const triadLabel = ({ root, major }) => pn(major ? MAJ_NAMES[root] : `${MIN_NAMES[root]}m`);
/** 新黎曼变换（OMT 2e 5.14）：每个都在大小三和弦之间切换 */
export const PLR = {
  P: ({ root, major }) => ({ root, major: !major }),
  R: ({ root, major }) => ({ root: mod12(root + (major ? 9 : 3)), major: !major }),
  L: ({ root, major }) => ({ root: mod12(root + (major ? 4 : 8)), major: !major }),
  S: ({ root, major }) => ({ root: mod12(root + (major ? 1 : 11)), major: !major }),
  N: ({ root, major }) => ({ root: mod12(root + (major ? 5 : 7)), major: !major }),
  H: ({ root, major }) => ({ root: mod12(root + (major ? 8 : 4)), major: !major }),
};
const triadPcs = ({ root, major }) => [root, mod12(root + (major ? 4 : 3)), mod12(root + 7)];

/** 认和弦：三和弦与常见七和弦（负和声等题目用） */
const SHAPES = [['', [0, 4, 7]], ['m', [0, 3, 7]], ['dim', [0, 3, 6]], ['aug', [0, 4, 8]], ['7', [0, 4, 7, 10]], ['maj7', [0, 4, 7, 11]], ['m7', [0, 3, 7, 10]], ['m7b5', [0, 3, 6, 10]], ['dim7', [0, 3, 6, 9]], ['mMaj7', [0, 3, 7, 11]], ['6', [0, 4, 7, 9]], ['m6', [0, 3, 7, 9]]];
export function nameChord(pcs, preferFlats = true) {
  const set = [...new Set(pcs.map(mod12))];
  for (const [suffix, shape] of SHAPES) {
    for (const root of set) {
      const rel = set.map((pc) => mod12(pc - root)).sort((a, b) => a - b);
      if (rel.length === shape.length && rel.every((v, i) => v === shape[i])) return pn(`${simplestName(root, preferFlats)}${suffix}`);
    }
  }
  return null;
}

/** 纯律音程：[比, 最大质数, Huygens-Fokker 标准英文名, 中文直译, 日文直译]  ref:hf-intervals ref:wiki-limit */
const JI_INTERVALS = [
  ['3/2', 3, 'perfect fifth', '纯五度', '完全 5 度'], ['4/3', 3, 'perfect fourth', '纯四度', '完全 4 度'], ['9/8', 3, 'major whole tone', '大全音', '大全音'],
  ['5/4', 5, 'major third', '大三度', '長 3 度'], ['6/5', 5, 'minor third', '小三度', '短 3 度'], ['5/3', 5, 'major sixth', '大六度', '長 6 度'], ['8/5', 5, 'minor sixth', '小六度', '短 6 度'],
  ['7/4', 7, 'harmonic seventh', '泛音七度', 'ハーモニック・セブンス'], ['7/6', 7, 'septimal minor third', '七限小三度', '7 リミットの短 3 度'], ['8/7', 7, 'septimal whole tone', '七限全音', '7 リミットの全音'],
  ['11/8', 11, 'undecimal semi-augmented fourth', '十一限半增四度', '11 リミットの半増 4 度'], ['11/9', 11, 'undecimal neutral third', '十一限中立三度', '11 リミットの中立 3 度'], ['11/6', 11, 'undecimal neutral seventh', '十一限中立七度', '11 リミットの中立 7 度'],
];

// ---------- 生成器 ----------
export const GENERATORS = {
  // 入门：键盘、谱号、节奏 -------------------------------------------------
  keyName: { ref: 'omt2e-keyboard', make(rng) {
    const pc = pick(rng, [0, 2, 4, 5, 7, 9, 11]);
    const name = simplestName(pc);
    return choice(rng, { ref: 'omt2e-keyboard', prompt: t('键盘上亮着的白键是哪个音？', '光っている白鍵は何の音？', 'Which note is the lit white key?'), correct: name, wrong: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      visual: { kind: 'keys', keys: [60 + pc] },
      hint: t('C 在两个黑键的左边，F 在三个黑键的左边。', 'C は 2 つの黒鍵の左、F は 3 つの黒鍵の左。', 'C sits left of the two black keys, F left of the three.'),
      explain: fmt(t('从两个黑键左边的 C 往右数白键，就到 {n}。', '2 つの黒鍵の左の C から白鍵を数えると {n}。', 'Count white keys from the C left of the two black keys and you reach {n}.'), { n: name }) });
  } },
  halfWhole: { ref: 'omt2e-half-whole', make(rng) {
    const root = pick(rng, ['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    const whole = rng() < 0.5;
    const answer = spellAbove(root, 1, whole ? 2 : 1);
    const other = spellAbove(root, 1, whole ? 1 : 2);
    return choice(rng, { ref: 'omt2e-half-whole', prompt: fmt(whole ? t('{r} 往上一个全音（下一个字母）是？', '{r} から全音上（次の文字）は？', 'A whole step above {r} (next letter) is…') : t('{r} 往上一个半音（下一个字母）是？', '{r} から半音上（次の文字）は？', 'A half step above {r} (next letter) is…'), { r: root }),
      correct: pn(answer), wrong: [pn(other), pn(spellAbove(root, 1, whole ? 3 : 0)), pn(spellAbove(root, 2, whole ? 2 : 1)), pn(spellAbove(root, -1, whole ? -2 : -1)), pn(spellAbove(root, 2, whole ? 3 : 4))].filter((x) => x !== pn(answer)),
      visual: { kind: 'keys', keys: [midiOf(root), midiOf(root) + (whole ? 2 : 1)] },
      hint: t('E–F、B–C 本身就是半音。', 'E–F と B–C はもともと半音。', 'E–F and B–C are already half steps.'),
      explain: fmt(t('{r} 上方{k}：{a}。', '{r} の{k}上：{a}。', '{k} above {r}: {a}.'), { r: pn(root), a: pn(answer), k: whole ? t('全音', '全音', 'A whole step') : t('半音', '半音', 'A half step') }) });
  } },
  staffRead: { ref: 'omt2e-clefs', make(rng, { clefs = ['treble', 'bass'] } = {}) {
    const clef = pick(rng, clefs);
    const pool = clef === 'treble' ? ['E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'C4', 'D4'] : clef === 'bass' ? ['G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'C4'] : ['F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'];
    const p = pick(rng, pool);
    const letter = p[0];
    const clefName = { treble: t('高音谱号', 'ト音記号', 'treble clef'), bass: t('低音谱号', 'ヘ音記号', 'bass clef'), alto: t('中音谱号', 'ハ音記号（アルト）', 'alto clef') }[clef];
    return choice(rng, { ref: 'omt2e-clefs', prompt: fmt(t('{c}：这个音叫什么？', '{c}：この音は？', '{c}: what is this note?'), { c: clefName }), correct: letter, wrong: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      visual: { kind: 'staff', notes: [p], clef }, audio: { notes: [parsePitch(p).midi], mode: 'melody' },
      hint: clef === 'treble' ? t('高音谱号的线：E G B D F（下→上）。', 'ト音記号の線：E G B D F（下から）。', 'Treble lines: E G B D F, bottom to top.') : clef === 'bass' ? t('低音谱号的线：G B D F A（下→上）。', 'ヘ音記号の線：G B D F A（下から）。', 'Bass lines: G B D F A, bottom to top.') : t('中音谱号的中线是中央 C。', 'ハ音記号の真ん中の線が中央の C。', 'The alto clef’s middle line is middle C.'),
      explain: fmt(t('这个音是 {p}。', 'この音は {p}。', 'This note is {p}.'), { p }) });
  } },
  noteValue: { ref: 'omt2e-rhythm', make(rng) {
    const items = [[t('全音符', '全音符', 'whole note'), 8], [t('二分音符', '2 分音符', 'half note'), 4], [t('四分音符', '4 分音符', 'quarter note'), 2], [t('八分音符', '8 分音符', 'eighth note'), 1], [t('附点二分音符', '付点 2 分音符', 'dotted half'), 6], [t('附点四分音符', '付点 4 分音符', 'dotted quarter'), 3]];
    const a = pick(rng, items); const b = pick(rng, items);
    const sum = a[1] + b[1];
    return choice(rng, { ref: 'omt2e-rhythm', prompt: fmt(t('{a} + {b} 一共等于几个八分音符？', '{a} + {b} は 8 分音符いくつ分？', '{a} + {b} equals how many eighth notes?'), { a: a[0], b: b[0] }),
      correct: String(sum), wrong: [sum - 1, sum + 1, sum + 2, sum - 2, sum * 2].filter((x) => x > 0 && x !== sum).map(String),
      hint: t('全 8、二分 4、四分 2、八分 1；附点再加一半。', '全 8・2 分 4・4 分 2・8 分 1、付点は半分を足す。', 'Whole 8, half 4, quarter 2, eighth 1; a dot adds half.'),
      explain: fmt(t('{x} + {y} = {s}。', '{x} + {y} = {s}。', '{x} + {y} = {s}.'), { x: a[1], y: b[1], s: sum }) });
  } },
  meterClass: { ref: ['omt2e-simple-meter', 'omt2e-compound-meter'], make(rng) {
    const sigs = [['2/4', 'simple', 2], ['3/4', 'simple', 3], ['4/4', 'simple', 4], ['2/2', 'simple', 2], ['3/8', 'simple', 3], ['6/8', 'compound', 2], ['9/8', 'compound', 3], ['12/8', 'compound', 4], ['6/4', 'compound', 2]];
    const [sig, kind, beats] = pick(rng, sigs);
    const kindName = (k, n) => fmt(t('{k}{n}拍子', '{k}{n}拍子', '{k} {n}'), { k: k === 'simple' ? t('单', '単純', 'simple') : t('复', '複合', 'compound'), n: { 2: t('二', '2', 'duple'), 3: t('三', '3', 'triple'), 4: t('四', '4', 'quadruple') }[n] });
    const all = ['simple', 'compound'].flatMap((k) => [2, 3, 4].map((n) => kindName(k, n)));
    return choice(rng, { ref: kind === 'simple' ? 'omt2e-simple-meter' : 'omt2e-compound-meter', prompt: fmt(t('{s} 是什么拍子？', '{s} は何拍子？', 'What kind of meter is {s}?'), { s: sig }),
      correct: kindName(kind, beats), wrong: all, visual: { kind: 'beats', groups: kind === 'simple' ? Array(beats).fill(2) : Array(beats).fill(3) },
      hint: t('上面是 6、9、12 的通常是复拍子：每拍分成三份。', '上が 6・9・12 ならふつう複合拍子：1 拍が 3 つに分かれる。', 'A top number of 6, 9 or 12 usually means compound: each beat splits in three.'),
      explain: fmt(t('{s}：每小节 {b} 拍，每拍分成 {d} 份。', '{s}：1 小節 {b} 拍、1 拍を {d} つに分ける。', '{s}: {b} beats per bar, each divided into {d}.'), { s: sig, b: beats, d: kind === 'simple' ? 2 : 3 }) });
  } },
  additiveMeter: { ref: 'wiki-metre', make(rng) {
    const items = [['5/8', ['3+2', '2+3']], ['7/8', ['2+2+3', '3+2+2', '2+3+2']], ['8/8', ['3+3+2']], ['9/8', ['2+2+2+3']]];
    const [sig, groupings] = pick(rng, items);
    const g = pick(rng, groupings);
    const total = g.split('+').reduce((a, b) => a + Number(b), 0);
    return choice(rng, { ref: 'wiki-metre', prompt: fmt(t('不对称拍子：重音分组 {g} 一共是几个八分音符，对应哪个拍号？', '不均等な拍子：アクセントのまとまり {g} は 8 分音符いくつ、どの拍子？', 'Asymmetric meter: accent groups {g} add up to which time signature?'), { g }),
      correct: sig, wrong: ['5/8', '7/8', '8/8', '9/8', '6/8', '11/8'].filter((s) => Number(s.split('/')[0]) !== total),
      visual: { kind: 'beats', groups: g.split('+').map(Number) },
      hint: t('把分组里的数字加起来。', 'まとまりの数を足す。', 'Add up the group sizes.'),
      explain: fmt(t('{g} = {n} 个八分音符：{s}。每组的第一个音有重音（"加法拍子"）。', '{g} = 8 分音符 {n} 個で {s}。各まとまりの頭にアクセント（加算拍子）。', '{g} = {n} eighths: {s}. Each group starts with an accent (additive meter).'), { g, n: total, s: sig }) });
  } },

  // 音阶与调 --------------------------------------------------------------
  majorDegree: { ref: 'omt2e-major-scales', make(rng) {
    const key = pick(rng, ['C', 'G', 'D', 'A', 'E', 'F', 'Bb', 'Eb', 'Ab', 'B']);
    const scale = spellHeptatonic(key, MAJOR);
    const d = 1 + Math.floor(rng() * 6);
    return choice(rng, { ref: 'omt2e-major-scales', prompt: fmt(t('{k} 大调音阶的第 {d} 个音是？', '{k} 長音階の第 {d} 音は？', 'Degree {d} of the {k} major scale is…'), { k: pn(key), d: d + 1 }),
      correct: pn(scale[d]), wrong: [pn(spellAbove(scale[d], 0, 1)), pn(spellAbove(scale[d], 0, -1)), ...scale.filter((_, i) => i !== d).map(pn)],
      audio: { notes: ascendingMidis(scale), mode: 'melody' }, visual: { kind: 'staff', notes: pitchNames(scale) },
      hint: t('按 W W H W W W H 往上走，每个字母只用一次。', 'W W H W W W H で上がり、各文字は 1 回だけ。', 'Follow W W H W W W H, using each letter once.'),
      explain: fmt(t('{k} 大调：{s}。', '{k} 長調：{s}。', '{k} major: {s}.'), { k: pn(key), s: scale.map(pn).join(' ') }) });
  } },
  keySignature: { ref: ['omt2e-major-scales', 'wiki-circle-of-fifths'], make(rng) {
    const keys = Object.keys(MAJOR_KEYS).filter((k) => Math.abs(MAJOR_KEYS[k]) <= 6);
    const key = pick(rng, keys);
    const n = MAJOR_KEYS[key];
    if (rng() < 0.5) {
      return choice(rng, { ref: 'omt2e-major-scales', prompt: fmt(t('{k} 大调的调号有几个升降号？', '{k} 長調の調号は？', 'What is the key signature of {k} major?'), { k: pn(key) }),
        correct: sigLabel(n), wrong: [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].filter((x) => x !== n && Math.abs(x - n) <= 3).map(sigLabel),
        visual: { kind: 'circle', highlight: [key] },
        hint: t('五度圈上从 C 顺时针每走一格多一个升号，逆时针每走一格多一个降号。', '五度圏で C から時計回りに 1 つ進むごとにシャープが 1 つ、反時計回りでフラットが 1 つ増える。', 'Each clockwise step from C on the circle adds a sharp; each counterclockwise step adds a flat.'),
        explain: fmt(t('{k} 大调：{s}。', '{k} 長調：{s}。', '{k} major: {s}.'), { k: pn(key), s: sigLabel(n) }) });
    }
    return choice(rng, { ref: 'wiki-circle-of-fifths', prompt: fmt(t('{s} 的大调是？', '{s} の長調は？', 'Which major key has {s}?'), { s: sigLabel(n) }),
      correct: pn(key), wrong: keys.filter((k) => k !== key && MAJOR_KEYS[k] !== n).map(pn),
      hint: n > 0 ? t('升号调：最后一个升号再往上半音就是主音。', 'シャープ調：最後のシャープの半音上が主音。', 'Sharp keys: a half step above the last sharp is the tonic.') : t('降号调：倒数第二个降号就是主音（F 大调一个降号要记住）。', 'フラット調：最後から 2 番目のフラットが主音（F 長調は覚える）。', 'Flat keys: the second-to-last flat is the tonic (memorise F major).'),
      explain: fmt(t('{s} → {k} 大调。', '{s} → {k} 長調。', '{s} → {k} major.'), { s: sigLabel(n), k: pn(key) }) });
  } },
  relativeParallel: { ref: 'omt2e-minor', make(rng) {
    const key = pick(rng, ['C', 'G', 'D', 'A', 'E', 'F', 'Bb', 'Eb', 'Ab']);
    const rel = relMinor(key);
    if (rng() < 0.5) {
      return choice(rng, { ref: 'omt2e-minor', prompt: fmt(t('{k} 大调的关系小调是？', '{k} 長調の平行調（短調）は？', 'The relative minor of {k} major is…'), { k: pn(key) }),
        correct: fmt(t('{m} 小调', '{m} 短調', '{m} minor'), { m: pn(rel) }),
        wrong: [key, spellAbove(key, 2, 4), spellAbove(key, 4, 7), spellAbove(key, 5, 8), spellAbove(key, 3, 5)].map((m) => fmt(t('{m} 小调', '{m} 短調', '{m} minor'), { m: pn(m) })),
        visual: { kind: 'circle', highlight: [key], inner: [rel] },
        hint: t('关系小调的主音比大调主音低三个半音（也就是大调的第 6 个音）。', '平行調の主音は長調の主音の半音 3 つ下（長調の第 6 音）。', 'Its tonic is three half steps below — the 6th note of the major scale.'),
        explain: fmt(t('{k} 大调和 {m} 小调用同一个调号。', '{k} 長調と {m} 短調は同じ調号。', '{k} major and {m} minor share a key signature.'), { k: pn(key), m: pn(rel) }) });
    }
    const sig = MAJOR_KEYS[key] - 3;
    return choice(rng, { ref: 'omt2e-minor', prompt: fmt(t('{k} 小调（{k} 大调的同主音小调）有什么调号？', '{k} 短調（{k} 長調の同主調）の調号は？', 'What key signature does {k} minor (parallel of {k} major) have?'), { k: pn(key) }),
      correct: sigLabel(sig), wrong: [sig + 3, sig + 1, sig - 1, sig + 2, sig - 2].filter((x) => Math.abs(x) <= 7).map(sigLabel),
      hint: t('同主音小调比大调多三个降号（或少三个升号）：在五度圈上逆时针转三格。', '同主短調は長調よりフラットが 3 つ多い（シャープが 3 つ少ない）：五度圏で反時計回りに 3 つ。', 'The parallel minor has three more flats (or three fewer sharps): three steps counterclockwise on the circle.'),
      explain: fmt(t('{k} 大调 {a} → {k} 小调 {b}。', '{k} 長調 {a} → {k} 短調 {b}。', '{k} major {a} → {k} minor {b}.'), { k: pn(key), a: sigLabel(MAJOR_KEYS[key]), b: sigLabel(sig) }) });
  } },
  minorScale: { ref: 'omt2e-minor', make(rng) {
    const tonic = pick(rng, ['A', 'E', 'D', 'G', 'C', 'B', 'F']);
    const kinds = [['natural', NAT_MINOR, t('自然小调', '自然短音階', 'natural minor')], ['harmonic', HARM_MINOR, t('和声小调', '和声短音階', 'harmonic minor')], ['melodic', MEL_MINOR, t('旋律小调（上行）', '旋律短音階（上行）', 'melodic minor (ascending)')]];
    const [, iv, name] = pick(rng, kinds);
    const scale = spellHeptatonic(tonic, iv);
    const d = pick(rng, [5, 6]);
    return choice(rng, { ref: 'omt2e-minor', prompt: fmt(t('{t} {n}的第 {d} 个音是？', '{t} {n}の第 {d} 音は？', 'Note {d} of {t} {n} is…'), { t: pn(tonic), n: name, d: d + 1 }),
      correct: pn(scale[d]), wrong: [pn(spellAbove(scale[d], 0, 1)), pn(spellAbove(scale[d], 0, -1)), pn(scale[d === 5 ? 6 : 5]), pn(scale[4])],
      audio: { notes: ascendingMidis(scale, 3), mode: 'melody' },
      hint: t('自然小调 W H W W H W W；和声小调升高第 7 音；旋律小调上行升高第 6、7 音。', '自然 W H W W H W W、和声は第 7 音を上げる、旋律は上行で第 6・7 音を上げる。', 'Natural W H W W H W W; harmonic raises 7; melodic raises 6 and 7 going up.'),
      explain: fmt(t('{t} {n}：{s}。', '{t} {n}：{s}。', '{t} {n}: {s}.'), { t: pn(tonic), n: name, s: scale.map(pn).join(' ') }) });
  } },
  modeSpell: { ref: 'omt2e-modes', make(rng) {
    const mode = pick(rng, MODES);
    const root = pick(rng, EASY_ROOTS);
    const scale = spellHeptatonic(root, mode.iv);
    const colour = { lydian: 3, mixolydian: 6, dorian: 5, phrygian: 1, locrian: 4, ionian: 2, aeolian: 5 }[mode.id];
    return choice(rng, { ref: 'omt2e-modes', prompt: fmt(t('{r} {m} 的第 {d} 个音是？', '{r} {m} の第 {d} 音は？', 'Note {d} of {r} {m} is…'), { r: pn(root), m: mode.name, d: colour + 1 }),
      correct: pn(scale[colour]), wrong: [pn(spellAbove(scale[colour], 0, 1)), pn(spellAbove(scale[colour], 0, -1)), pn(spellHeptatonic(root, MAJOR)[colour]), pn(scale[(colour + 1) % 7]), pn(scale[(colour + 6) % 7])].filter((x) => x !== pn(scale[colour])),
      audio: { notes: ascendingMidis(scale), mode: 'melody' }, visual: { kind: 'staff', notes: pitchNames(scale) },
      hint: t('特征音：Lydian 升 4、Mixolydian 降 7、Dorian 是小调升 6、Phrygian 降 2、Locrian 降 2 和 5。', '特徴音：リディアン ♯4、ミクソリディアン ♭7、ドリアンは短調の ♯6、フリジアン ♭2、ロクリアン ♭2・♭5。', 'Colour notes: Lydian ♯4, Mixolydian ♭7, Dorian = minor with ♮6, Phrygian ♭2, Locrian ♭2 and ♭5.'),
      explain: fmt(t('{r} {m}：{s}。', '{r} {m}：{s}。', '{r} {m}: {s}.'), { r: pn(root), m: mode.name, s: scale.map(pn).join(' ') }) });
  } },
  modeEar: { ref: 'omt2e-modes', make(rng) {
    const mode = pick(rng, MODES);
    const root = 60;
    const notes = [...mode.iv.map((i) => root + i), root + 12];
    return choice(rng, { ref: 'omt2e-modes', prompt: t('听：从 C 开始的这个调式是？', '聴いて：C から始まるこの旋法は？', 'Listen: which mode starting on C is this?'),
      correct: mode.name, wrong: MODES.map((m) => m.name),
      audio: { notes, mode: 'melody', chord: [root, root + mode.iv[2], root + mode.iv[4], root + mode.iv[6]] },
      hint: t('先听三音大还是小，再找特征音。', 'まず 3 度が長か短かを聴き、次に特徴音を探す。', 'First hear whether the third is major or minor, then find the colour note.'),
      explain: fmt(t('{m}：{s}。最后的和弦是这个调式的主七和弦。', '{m}：{s}。最後の和音はこの旋法の主和音（七の和音）。', '{m}: {s}. The final chord is the mode’s tonic seventh chord.'), { m: mode.name, s: spellHeptatonic('C', mode.iv).map(pn).join(' ') }) });
  } },
  modeBrightness: { ref: 'omt2e-modes', make(rng) {
    const [a, b] = shuffle(BRIGHTNESS, rng).slice(0, 2);
    const brighter = BRIGHTNESS.indexOf(a) < BRIGHTNESS.indexOf(b) ? a : b;
    return choice(rng, { ref: 'omt2e-modes', prompt: fmt(t('{a} 和 {b}，哪个更"亮"？', '{a} と {b}、どちらが明るい？', 'Which is brighter, {a} or {b}?'), { a, b }), correct: brighter, wrong: [a, b], n: 2,
      hint: t('从亮到暗：Lydian、Ionian、Mixolydian、Dorian、Aeolian、Phrygian、Locrian。', '明→暗：リディアン・イオニアン・ミクソリディアン・ドリアン・エオリアン・フリジアン・ロクリアン。', 'Bright to dark: Lydian, Ionian, Mixolydian, Dorian, Aeolian, Phrygian, Locrian.'),
      explain: t('顺序是 Lydian > Ionian > Mixolydian > Dorian > Aeolian > Phrygian > Locrian。', '順番はリディアン > イオニアン > ミクソリディアン > ドリアン > エオリアン > フリジアン > ロクリアン。', 'The order is Lydian > Ionian > Mixolydian > Dorian > Aeolian > Phrygian > Locrian.') });
  } },
  scaleLibrary: { ref: SCALE_LIBRARY.map((s) => s.ref), make(rng, { ids } = {}) {
    const pool = ids ? SCALE_LIBRARY.filter((s) => ids.includes(s.id)) : SCALE_LIBRARY;
    const scale = pick(rng, pool);
    const root = pick(rng, ['C', 'D', 'F', 'G', 'A', 'Bb', 'E', 'Eb']);
    const notes = spellHeptatonic(root, scale.iv);
    const kind = Math.floor(rng() * 3);
    const audio = { notes: ascendingMidis(notes), mode: 'melody', chord: ascendingMidis(chordNotes(root, scale.chord), 3) };
    if (kind === 0) {
      const d = 1 + Math.floor(rng() * 6);
      return choice(rng, { ref: scale.ref, prompt: fmt(t('{r} {s} 的第 {d} 个音是？', '{r} {s} の第 {d} 音は？', 'Note {d} of {r} {s} is…'), { r: pn(root), s: scale.name, d: d + 1 }),
        correct: pn(notes[d]), wrong: [pn(spellAbove(notes[d], 0, 1)), pn(spellAbove(notes[d], 0, -1)), pn(spellHeptatonic(root, MAJOR)[d]), pn(notes[(d + 1) % 7]), pn(notes[(d + 6) % 7]), pn(notes[(d + 2) % 7]), pn(notes[(d + 5) % 7]), pn(spellAbove(notes[d], 1, 2)), pn(spellAbove(notes[d], 1, 3))].filter((x) => x !== pn(notes[d])), audio,
        visual: { kind: 'staff', notes: pitchNames(notes) },
        hint: fmt(t('把 {s} 和大调比一比，看哪几个音被升高或降低。', '{s} を長音階と比べ、どの音が上下しているか見る。', 'Compare {s} with major: which notes are raised or lowered?'), { s: scale.name }),
        explain: fmt(t('{r} {s}：{n}。', '{r} {s}：{n}。', '{r} {s}: {n}.'), { r: pn(root), s: scale.name, n: notes.map(pn).join(' ') }) });
    }
    if (kind === 1 || !scale.parent || scale.parent[1] === 1) {
      return choice(rng, { ref: scale.ref, prompt: fmt(t('{r} {s} 在和弦音阶速查里配哪种和弦？', '{r} {s} はどのコードに合う？', 'Which chord does {r} {s} fit in the chord–scale reference?'), { r: pn(root), s: scale.name }),
        correct: pn(`${root}${scale.chord}`), wrong: ['maj7', '7', 'm7', 'mMaj7', 'm7b5', 'dim7', 'maj7#5'].filter((c) => c !== scale.chord).map((c) => pn(`${root}${c}`)), audio,
        hint: t('取第 1、3、5、7 个音叠起来。', '第 1・3・5・7 音を重ねる。', 'Stack notes 1, 3, 5 and 7.'),
        explain: fmt(t('{r} {s} 的 1、3、5、7 音是 {c}，所以配 {n}。', '{r} {s} の 1・3・5・7 音は {c} なので {n}。', 'Notes 1, 3, 5, 7 of {r} {s} are {c}, so it fits {n}.'), { r: pn(root), s: scale.name, c: [0, 2, 4, 6].map((i) => pn(notes[i])).join(' '), n: pn(`${root}${scale.chord}`) }) });
    }
    const [parent, number] = scale.parent;
    const parentRoot = spellAbove(root, (7 - (number - 1)) % 7, (12 - PARENT_IV[parent][number - 1]) % 12);
    return choice(rng, { ref: scale.ref, prompt: fmt(t('{r} {s} 是哪个音阶的第 {n} 个调式？', '{r} {s} はどの音階の第 {n} 旋法？', '{r} {s} is mode {n} of which scale?'), { r: pn(root), s: scale.name, n: number }),
      correct: fmt(t('{p} {k}', '{p} {k}', '{p} {k}'), { p: pn(parentRoot), k: PARENT_NAME[parent] }),
      wrong: Object.keys(PARENT_NAME).flatMap((p) => [parentRoot, root, spellAbove(root, 1, 1)].map((r) => fmt(t('{p} {k}', '{p} {k}', '{p} {k}'), { p: pn(r), k: PARENT_NAME[p] }))), audio,
      hint: t('从这个音往回数到母音阶的第一个音。', 'この音から親音階の第 1 音まで戻って数える。', 'Count back to the first note of the parent scale.'),
      explain: fmt(t('{p} {k}从第 {n} 个音 {r} 开始弹，就是 {r} {s}。', '{p} {k}を第 {n} 音 {r} から弾くと {r} {s}。', 'Play {p} {k} from its note {n} ({r}) and you get {r} {s}.'), { p: pn(parentRoot), k: PARENT_NAME[parent], n: number, r: pn(root), s: scale.name }) });
  } },
  symmetricScale: { ref: ['wiki-whole-tone', 'wiki-octatonic'], make(rng) {
    const items = [
      ['wiki-whole-tone', t('全音音阶', '全音音階', 'whole-tone scale'), '6', t('只有 2 个不同版本', '異なるものは 2 つだけ', 'only 2 distinct versions'), [0, 2, 4, 6, 8, 10]],
      ['wiki-octatonic', t('减音阶（八声音阶）', 'ディミニッシュ（八音）', 'diminished (octatonic) scale'), '8', t('只有 3 个不同版本', '異なるものは 3 つだけ', 'only 3 distinct versions'), [0, 2, 3, 5, 6, 8, 9, 11]],
    ];
    const [ref, name, count, versions, pcs] = pick(rng, items);
    if (rng() < 0.5) {
      return choice(rng, { ref, prompt: fmt(t('{n}有几个音？', '{n}は何音？', 'How many notes are in the {n}?'), { n: name }), correct: count, wrong: ['5', '6', '7', '8', '12'],
        audio: { notes: [...pcs.map((p) => 60 + p), 72], mode: 'melody' },
        hint: t('数一数一个八度里有几步。', '1 オクターヴに何歩あるか数える。', 'Count the steps in one octave.'),
        explain: fmt(t('{n}：{c} 个音，{v}。', '{n}：{c} 音、{v}。', 'The {n}: {c} notes, {v}.'), { n: name, c: count, v: versions }) });
    }
    return choice(rng, { ref, prompt: fmt(t('{n}在十二平均律里有几个不同的版本？', '{n}は 12 平均律で何種類ある？', 'How many distinct {n}s exist in 12-tone equal temperament?'), { n: name }),
      correct: count === '6' ? '2' : '3', wrong: ['1', '2', '3', '4', '12'],
      hint: t('对称的音阶移几步就回到同一组音。', '対称な音階は少しずらすと同じ音に戻る。', 'A symmetric scale returns to the same notes after a few shifts.'),
      explain: fmt(t('{n}：{v}——这就是"有限移位"。', '{n}：{v}。これが「移調の限られた」の意味。', 'The {n}: {v} — that is “limited transposition”.'), { n: name, v: versions }) });
  } },
  bluesScale: { ref: 'omt2e-blues-scale', make(rng) {
    const root = pick(rng, ['C', 'G', 'D', 'A', 'E', 'F', 'Bb']);
    const notes = [[0, 0], [2, 3], [3, 5], [3, 6], [4, 7], [6, 10]].map(([s, n]) => spellAbove(root, s, n));
    return fill(rng, { ref: 'omt2e-blues-scale', prompt: fmt(t('{r} 布鲁斯音阶：{a} {b} {c} ___ {d} {e}', '{r} ブルース・スケール：{a} {b} {c} ___ {d} {e}', '{r} blues scale: {a} {b} {c} ___ {d} {e}'), { r: pn(root), a: pn(notes[0]), b: pn(notes[1]), c: pn(notes[2]), d: pn(notes[4]), e: pn(notes[5]) }),
      answer: [pn(notes[3])], extra: [pn(spellAbove(root, 2, 4)), pn(spellAbove(root, 5, 9)), pn(spellAbove(root, 4, 6))],
      audio: { notes: ascendingMidis([...notes, root]), mode: 'melody' },
      hint: t('do–me–fa–fi–sol–te：缺的是 fi（升高的第 4 音）。', 'do–me–fa–fi–sol–te：抜けているのは fi（上げた第 4 音）。', 'do–me–fa–fi–sol–te: the missing note is fi (raised 4th).'),
      explain: fmt(t('小调五声音阶加上经过音 {x}。', 'マイナー・ペンタトニックに経過音 {x} を加える。', 'Minor pentatonic plus the passing tone {x}.'), { x: pn(notes[3]) }) });
  } },
  bebopDominant: { ref: 'wiki-bebop-scale', make(rng) {
    const root = pick(rng, ['C', 'G', 'F', 'D', 'Bb', 'A']);
    const added = spellAbove(root, 6, 11);
    return choice(rng, { ref: 'wiki-bebop-scale', prompt: fmt(t('{r} 属七 bebop 音阶在 {r} Mixolydian 里多加了哪个音？', '{r} ドミナント・ビバップは {r} ミクソリディアンにどの音を足す？', 'Which note does the {r} dominant bebop scale add to {r} Mixolydian?'), { r: pn(root) }),
      correct: pn(added), wrong: [pn(spellAbove(root, 2, 3)), pn(spellAbove(root, 4, 8)), pn(spellAbove(root, 1, 1)), pn(spellAbove(root, 3, 6))],
      hint: t('加在 ♭7 和根音之间。', '♭7 と根音の間に足す。', 'Between ♭7 and the root.'),
      explain: fmt(t('加进大七度 {a}，凑成 8 个音，下行时和弦音都落在正拍。', '長 7 度 {a} を足して 8 音にし、下行で和音の音が正拍に来る。', 'Adding the major seventh {a} makes eight notes, keeping chord tones on the beats.'), { a: pn(added) }) });
  } },

  // 五度圈与调关系 ---------------------------------------------------------
  circleStep: { ref: 'wiki-circle-of-fifths', make(rng) {
    const start = pick(rng, CIRCLE);
    const steps = pick(rng, [1, 2, 3, -1, -2, -3]);
    const end = CIRCLE[mod12(CIRCLE.indexOf(start) + steps)];
    const dir = steps > 0 ? t('顺时针', '時計回り', 'clockwise') : t('逆时针', '反時計回り', 'counterclockwise');
    return choice(rng, { ref: 'wiki-circle-of-fifths', prompt: fmt(t('五度圈上从 {s} {d}走 {n} 格，到哪个音？', '五度圏で {s} から{d}に {n} つ進むと？', 'On the circle of fifths, {n} steps {d} from {s} lands on…'), { s: pn(start), d: dir, n: Math.abs(steps) }),
      correct: pn(end), wrong: [-3, -2, -1, 1, 2, 3].filter((x) => x !== steps).map((x) => pn(CIRCLE[mod12(CIRCLE.indexOf(start) + x)])),
      visual: { kind: 'circle', highlight: [start], target: end },
      hint: t('顺时针每格往上一个纯五度，逆时针每格往上一个纯四度（也就是往下五度）。', '時計回り 1 つで完全 5 度上、反時計回りで完全 4 度上（5 度下）。', 'Each clockwise step goes up a perfect fifth; each counterclockwise step up a perfect fourth (down a fifth).'),
      explain: fmt(t('{s} {d}走 {n} 格是 {e}。', '{s} から{d}に {n} つで {e}。', '{n} steps {d} from {s} is {e}.'), { s: pn(start), d: dir, n: Math.abs(steps), e: pn(end) }) });
  } },
  axis: { ref: 'wiki-axis-system', make(rng) {
    const tonic = pick(rng, ['C', 'G', 'F', 'D']);
    const i = CIRCLE.indexOf(tonic);
    const axes = [[t('主轴', 'トニック軸', 'tonic axis'), i], [t('下属轴', 'サブドミナント軸', 'subdominant axis'), i - 1], [t('属轴', 'ドミナント軸', 'dominant axis'), i + 1]];
    const [name, base] = pick(rng, axes);
    const members = [0, 3, 6, 9].map((k) => CIRCLE[mod12(base + k)]);
    const correct = pick(rng, members.slice(1));
    const outside = CIRCLE.filter((n) => !members.includes(n));
    return choice(rng, { ref: 'wiki-axis-system', prompt: fmt(t('以 {t} 为主音，哪个音和 {m} 同在{a}上（可以互相代替）？', '{t} を主音とすると、{m} と同じ{a}にある（代理できる）のは？', 'With {t} as tonic, which note shares the {a} with {m} (can substitute for it)?'), { t: pn(tonic), m: pn(members[0]), a: name }),
      correct: pn(correct), wrong: outside.map(pn), visual: { kind: 'circle', highlight: members, axis: true },
      hint: t('轴上的四个音在五度圈上相隔 90°：转 90°、180°、270° 都还在同一条轴上。', '軸の 4 音は五度圏で 90° ずつ離れている：90°・180°・270° 回しても同じ軸。', 'The four axis notes sit 90° apart on the circle: rotating 90°, 180° or 270° stays on the same axis.'),
      explain: fmt(t('{a}：{list}（彼此相隔小三度或三全音）。', '{a}：{list}（短 3 度か三全音ずつ）。', '{a}: {list} (a minor third or tritone apart).'), { a: name, list: members.map(pn).join(' ') }) });
  } },
  closelyRelated: { ref: 'wiki-closely-related', make(rng) {
    const key = pick(rng, ['C', 'G', 'D', 'F', 'Bb', 'A']);
    const s = spellHeptatonic(key, MAJOR);
    const related = [`${s[1]}m`, `${s[2]}m`, s[3], s[4], `${s[5]}m`, `${key}m`];
    const correct = pick(rng, related);
    const far = [spellAbove(key, 1, 1), spellAbove(key, 5, 8), spellAbove(key, 2, 4), spellAbove(key, 3, 6), `${spellAbove(key, 4, 7)}m`].filter((k) => !related.includes(k));
    return choice(rng, { ref: 'wiki-closely-related', prompt: fmt(t('下面哪个是 {k} 大调的近关系调？', '{k} 長調の近親調はどれ？', 'Which of these is closely related to {k} major?'), { k: pn(key) }),
      correct: pn(correct), wrong: far.map(pn),
      hint: t('近关系调：ii、iii、IV、V、vi 级上的调，加上同主音小调。', '近親調：ii・iii・IV・V・vi の調と同主短調。', 'Closely related: the keys on ii, iii, IV, V, vi plus the parallel minor.'),
      explain: fmt(t('{k} 的近关系调：{list}。', '{k} の近親調：{list}。', 'Closely related to {k}: {list}.'), { k: pn(key), list: related.map(pn).join(' ') }) });
  } },
  negative: { ref: 'wiki-negative-harmony', make(rng) {
    const key = pick(rng, ['C', 'G', 'F']);
    const k = parseNote(key).pc;
    const reflect = (pc) => mod12(2 * k + 7 - pc);
    if (rng() < 0.5) {
      const note = pick(rng, [0, 2, 4, 5, 7, 9, 11].map((x) => mod12(k + x)));
      const neg = reflect(note);
      return choice(rng, { ref: 'wiki-negative-harmony', prompt: fmt(t('{k} 调的负和声：{n} 对应哪个音？', '{k} のネガティブ・ハーモニー：{n} に対応する音は？', 'Negative harmony in {k}: {n} maps to…'), { k: pn(key), n: pn(simplestName(note, false)) }),
        correct: pn(simplestName(neg)), wrong: [mod12(neg + 1), mod12(neg - 1), note, mod12(neg + 2)].filter((x) => x !== neg).map((x) => pn(simplestName(x))),
        visual: { kind: 'clock', pcs: [note], mirror: mod12(2 * k + 7) },
        hint: fmt(t('对称轴在主音和属音中间（{k} 调里在 {a} 和 {b} 之间）。', '軸は主音と属音の真ん中（{k} では {a} と {b} の間）。', 'The axis sits midway between tonic and dominant ({a}/{b} in {k}).'), { k: pn(key), a: pn(simplestName(mod12(k + 3))), b: pn(simplestName(mod12(k + 4), false)) }),
        explain: fmt(t('以主音–属音的中点为镜子翻过去：{n} → {m}。', '主音–属音の中点で折り返す：{n} → {m}。', 'Reflect across the tonic–dominant midpoint: {n} → {m}.'), { n: pn(simplestName(note, false)), m: pn(simplestName(neg)) }) });
    }
    const chords = [[[0, 4, 7], 'I'], [[7, 11, 2, 5], 'V7'], [[5, 9, 0], 'IV'], [[2, 5, 9], 'ii'], [[9, 0, 4], 'vi']];
    const [shape] = pick(rng, chords);
    const pcs = shape.map((x) => mod12(k + x));
    const original = nameChord(pcs);
    const neg = nameChord(pcs.map(reflect));
    const wrongs = [nameChord(pcs.map((x) => mod12(x + 5))), nameChord(pcs.map((x) => mod12(x + 3))), nameChord(pcs.map((x) => mod12(x + 7))), original].filter((x) => x && x !== neg);
    return choice(rng, { ref: 'wiki-negative-harmony', prompt: fmt(t('{k} 调里，{c} 的负和声是？', '{k} で {c} のネガティブ・ハーモニーは？', 'In {k}, the negative of {c} is…'), { k: pn(key), c: original }),
      correct: neg, wrong: wrongs,
      hint: t('每个音都按"主音–属音"轴翻过去；大三和弦会变成小三和弦。', '各音を主音–属音の軸で折り返す。長三和音は短三和音になる。', 'Reflect every note across the tonic–dominant axis; major chords turn minor.'),
      explain: fmt(t('{c} 的音逐个翻转后组成 {n}；它保留了往主和弦去的"引力"。', '{c} の音を 1 つずつ折り返すと {n}。主和音へ向かう引力は保たれる。', 'Reflecting each note of {c} gives {n}, keeping its pull toward the tonic.'), { c: original, n: neg }) });
  } },

  // 音程与和弦 -------------------------------------------------------------
  intervalName: { ref: 'omt2e-intervals', make(rng, { codes } = {}) {
    const pool = codes ? INTERVALS.filter((i) => codes.includes(i[0])) : INTERVALS.slice(0, 12);
    const [code, steps, semis, name] = pick(rng, pool);
    const root = pick(rng, EASY_ROOTS);
    const top = spellAbove(root, steps, semis);
    const [low, high] = pitchNames([root, top]);
    return choice(rng, { ref: 'omt2e-intervals', prompt: fmt(t('{a} 到 {b} 是什么音程？', '{a} から {b} は何の音程？', 'What interval is {a} up to {b}?'), { a: pn(root), b: pn(top) }),
      // 干扰项先取半音数接近的音程；不够三个时再按远近补上
      correct: name, wrong: (() => { const others = INTERVALS.filter((i) => i[0] !== code).sort((a, b) => Math.abs(a[2] - semis) - Math.abs(b[2] - semis)); const near = others.filter((i) => Math.abs(i[2] - semis) <= 2); return (near.length >= 3 ? near : others.slice(0, 3)).map((i) => i[3]); })(),
      visual: { kind: 'staff', notes: [low, high] }, audio: { notes: [parsePitch(low).midi, parsePitch(high).midi], mode: 'melody' },
      hint: t('先数字母得出度数，再数半音决定大、小、纯、增、减。', 'まず文字を数えて度数、次に半音を数えて種類。', 'Count letters for the size, then half steps for the quality.'),
      explain: fmt(t('{a}–{b}：{s} 个字母、{n} 个半音 = {q}。', '{a}–{b}：{s} 文字・半音 {n} = {q}。', '{a}–{b}: {s} letters, {n} half steps = {q}.'), { a: pn(root), b: pn(top), s: steps + 1, n: semis, q: name }) });
  } },
  intervalEar: { ref: 'omt-intervals', make(rng, { codes = ['m2', 'M2', 'm3', 'M3', 'P4', 'A4', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'], harmonic = false } = {}) {
    const [code, , semis, name] = intervalByCode(pick(rng, codes));
    const low = 55 + Math.floor(rng() * 10);
    return choice(rng, { ref: 'omt-intervals', prompt: t('听：这是什么音程？', '聴いて：何の音程？', 'Listen: which interval?'),
      correct: name, wrong: codes.filter((c) => c !== code).map((c) => intervalByCode(c)[3]),
      audio: { notes: [low, low + semis], mode: harmonic ? 'harmonic' : 'melody' },
      hint: t('可以重听几次，先判断宽窄（几个半音）。', '何度か聴き直して、まず広さ（半音いくつ）を判断。', 'Replay it; first judge how wide it is in half steps.'),
      explain: fmt(t('{n}：{s} 个半音。', '{n}：半音 {s}。', '{n}: {s} half steps.'), { n: name, s: semis }) });
  } },
  intervalInvert: { ref: 'omt2e-intervals', make(rng) {
    const code = pick(rng, Object.keys(INVERT));
    const inv = intervalByCode(INVERT[code]);
    return choice(rng, { ref: 'omt2e-intervals', prompt: fmt(t('{n} 转位以后是？', '{n} を転回すると？', '{n} inverts to…'), { n: intervalByCode(code)[3] }),
      correct: inv[3], wrong: INTERVALS.filter((i) => i[0] !== inv[0] && i[0] !== 'P8').map((i) => i[3]),
      hint: t('度数相加等于 9；大↔小，纯不变，增↔减。', '度数を足すと 9、長↔短、完全はそのまま、増↔減。', 'Sizes add to 9; major ↔ minor, perfect stays, augmented ↔ diminished.'),
      explain: fmt(t('{a} → {b}。', '{a} → {b}。', '{a} → {b}.'), { a: intervalByCode(code)[3], b: inv[3] }) });
  } },
  consonance: { ref: 'omt2e-intro', make(rng) {
    const [code, , , name] = pick(rng, INTERVALS);
    const cls = ['P5', 'P8'].includes(code) ? 'perfect' : ['m3', 'M3', 'm6', 'M6'].includes(code) ? 'imperfect' : 'dissonant';
    const label = { perfect: t('完全协和', '完全協和', 'perfect consonance'), imperfect: t('不完全协和', '不完全協和', 'imperfect consonance'), dissonant: t('不协和', '不協和', 'dissonance') };
    return choice(rng, { ref: 'omt2e-intro', prompt: fmt(t('在对位里，{n} 属于？', '対位法で {n} は？', 'In counterpoint, a {n} is a…'), { n: name }),
      // 只有三类，第四个选项是一眼就能看出来的玩笑答案
      correct: label[cls], wrong: [...Object.values(label), t('看演奏者的心情', '奏者の気分しだい', 'whatever the player feels like')], n: 4,
      hint: t('纯同度、五度、八度是完全协和；三、六度是不完全协和；二、七度和增减音程不协和。', '完全 1・5・8 度は完全協和、3・6 度は不完全協和、2・7 度と増減音程は不協和。', 'Perfect unisons, fifths, octaves: perfect consonances; thirds and sixths: imperfect; seconds, sevenths, augmented and diminished: dissonant.'),
      explain: fmt(t('{n} 是{c}。（纯四度在两声部对位里按不协和处理。）', '{n} は{c}。（完全 4 度は 2 声の対位法では不協和として扱う。）', 'A {n} is a {c}. (The perfect fourth counts as dissonant in two-part counterpoint.)'), { n: name, c: label[cls] }) });
  } },
  motion: { ref: 'omt2e-intro', make(rng) {
    const kinds = [
      ['contrary', [60, 62], [67, 65], t('反向', '反行', 'contrary')],
      ['similar', [60, 62], [64, 69], t('同向', '並行', 'similar')],
      ['parallel', [60, 62], [64, 65], t('平行', '平行', 'parallel')],
      ['oblique', [60, 60], [64, 65], t('斜向', '斜行', 'oblique')],
    ];
    const [, low, high, name] = pick(rng, kinds);
    const nm = (m) => pn(simplestName(m % 12, false));
    return choice(rng, { ref: 'omt2e-intro', prompt: fmt(t('低声部 {a}→{b}，高声部 {c}→{d}：这是哪种进行？', '低声 {a}→{b}、高声 {c}→{d}：どの進行？', 'Lower voice {a}→{b}, upper voice {c}→{d}: which motion?'), { a: nm(low[0]), b: nm(low[1]), c: nm(high[0]), d: nm(high[1]) }),
      correct: name, wrong: kinds.map((k) => k[3]),
      audio: { notes: [[low[0], high[0]], [low[1], high[1]]], mode: 'chords' },
      hint: t('平行比同向更严格：前后音程要一样。', '平行は並行より厳しい：前後の音程が同じ。', 'Parallel is stricter than similar: the interval stays the same.'),
      explain: t('一上一下 = 反向；同方向但距离不同 = 同向；同方向且音程不变 = 平行；一个不动 = 斜向。', '上と下 = 反行、同じ向きで距離が違う = 並行、同じ向きで音程が同じ = 平行、片方が動かない = 斜行。', 'Opposite = contrary; same direction, different distance = similar; same interval = parallel; one stays = oblique.') });
  } },
  triadSpell: { ref: 'omt2e-triads', make(rng) {
    const quality = pick(rng, Object.keys(TRIADS));
    const root = pick(rng, EASY_ROOTS);
    const notes = triadNotes(root, quality);
    const missing = 1 + Math.floor(rng() * 2);
    const shown = notes.map((n, i) => (i === missing ? '___' : pn(n))).join(' ');
    return fill(rng, { ref: 'omt2e-triads', prompt: fmt(t('{r} {q}：{s}', '{r} {q}：{s}', '{r} {q}: {s}'), { r: pn(root), q: TRIAD_NAME[quality], s: shown }),
      answer: [pn(notes[missing])], extra: [pn(spellAbove(notes[missing], 0, 1)), pn(spellAbove(notes[missing], 0, -1))],
      audio: { notes: ascendingMidis(notes), mode: 'harmonic' },
      hint: t('大：大三度 + 纯五度；小：小三度 + 纯五度；减：小三度 + 减五度；增：大三度 + 增五度。', '長：長 3 + 完全 5、短：短 3 + 完全 5、減：短 3 + 減 5、増：長 3 + 増 5。', 'Major: M3 + P5; minor: m3 + P5; diminished: m3 + d5; augmented: M3 + A5.'),
      explain: fmt(t('{r} {q} = {n}。', '{r} {q} = {n}。', '{r} {q} = {n}.'), { r: pn(root), q: TRIAD_NAME[quality], n: notes.map(pn).join(' ') }) });
  } },
  triadEar: { ref: 'omt-triads', make(rng) {
    const quality = pick(rng, Object.keys(TRIADS));
    const shape = { major: [0, 4, 7], minor: [0, 3, 7], diminished: [0, 3, 6], augmented: [0, 4, 8] }[quality];
    const root = 55 + Math.floor(rng() * 8);
    return choice(rng, { ref: 'omt-triads', prompt: t('听：这是哪种三和弦？', '聴いて：どの三和音？', 'Listen: which triad?'), correct: TRIAD_NAME[quality], wrong: Object.values(TRIAD_NAME),
      audio: { notes: shape.map((s) => root + s), mode: 'harmonic' },
      hint: t('大三和弦明亮、小三和弦暗；减三和弦紧张、增三和弦像悬在空中。', '長は明るく短は暗い、減は緊張、増は宙に浮く感じ。', 'Major is bright, minor dark; diminished tense; augmented floating.'),
      explain: fmt(t('这是{q}。', 'これは{q}。', 'That was a {q}.'), { q: TRIAD_NAME[quality] }) });
  } },
  seventhSpell: { ref: 'omt2e-sevenths', make(rng) {
    const quality = pick(rng, ['maj7', '7', 'm7', 'm7b5', 'dim7']);
    const root = pick(rng, EASY_ROOTS);
    const notes = chordNotes(root, quality);
    return fill(rng, { ref: 'omt2e-sevenths', prompt: fmt(t('{c}（{q}）：{a} {b} {d} ___', '{c}（{q}）：{a} {b} {d} ___', '{c} ({q}): {a} {b} {d} ___'), { c: pn(`${root}${quality}`), q: SEVENTH_NAME[quality], a: pn(notes[0]), b: pn(notes[1]), d: pn(notes[2]) }),
      answer: [pn(notes[3])], extra: [pn(spellAbove(notes[3], 0, 1)), pn(spellAbove(notes[3], 0, -1))],
      audio: { notes: ascendingMidis(notes, 3), mode: 'harmonic' },
      hint: t('大七：大七度；属七、小七、半减七：小七度；减七：减七度。', '長七：長 7 度、属七・短七・半減七：短 7 度、減七：減 7 度。', 'Maj7: major 7th; dom7, m7, m7♭5: minor 7th; dim7: diminished 7th.'),
      explain: fmt(t('{c} = {n}。', '{c} = {n}。', '{c} = {n}.'), { c: pn(`${root}${quality}`), n: notes.map(pn).join(' ') }) });
  } },
  seventhEar: { ref: 'omt-triads', make(rng) {
    const quality = pick(rng, ['maj7', '7', 'm7', 'm7b5', 'dim7']);
    const shape = { maj7: [0, 4, 7, 11], 7: [0, 4, 7, 10], m7: [0, 3, 7, 10], m7b5: [0, 3, 6, 10], dim7: [0, 3, 6, 9] }[quality];
    const root = 50 + Math.floor(rng() * 8);
    return choice(rng, { ref: 'omt-triads', prompt: t('听：这是哪种七和弦？', '聴いて：どの七の和音？', 'Listen: which seventh chord?'), correct: SEVENTH_NAME[quality], wrong: Object.values(SEVENTH_NAME),
      audio: { notes: shape.map((s) => root + s), mode: 'harmonic' },
      hint: t('属七"想往前走"，大七柔和，减七最紧张。', '属七は先へ進みたがり、長七は柔らかく、減七は最も緊張。', 'Dom7 wants to move, maj7 is soft, dim7 is the tensest.'),
      explain: fmt(t('这是{q}。', 'これは{q}。', 'That was a {q}.'), { q: SEVENTH_NAME[quality] }) });
  } },
  chordSymbolNotes: { ref: 'wiki-chord-notation', make(rng) {
    const items = [['', 'major'], ['m', 'minor'], ['dim', 'diminished'], ['aug', 'augmented'], ['maj7', 'maj7'], ['7', '7'], ['m7', 'm7'], ['m7b5', 'm7b5'], ['dim7', 'dim7']];
    const [suffix, q] = pick(rng, items);
    const root = pick(rng, ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'Eb']);
    const notes = TRIADS[q] ? triadNotes(root, q) : chordNotes(root, q);
    const wrong = items.filter(([s]) => s !== suffix).map(([, w]) => (TRIADS[w] ? triadNotes(root, w) : chordNotes(root, w)).map(pn).join(' '));
    return choice(rng, { ref: 'wiki-chord-notation', prompt: fmt(t('{c} 由哪些音组成？', '{c} の構成音は？', 'Which notes make {c}?'), { c: pn(`${root}${suffix}`) }),
      correct: notes.map(pn).join(' '), wrong, audio: { notes: ascendingMidis(notes, 3), mode: 'harmonic' },
      hint: t('字母是根音，后面的符号说明性质。', '文字が根音、その後ろが種類。', 'The letter is the root; the suffix gives the quality.'),
      explain: fmt(t('{c} = {n}。', '{c} = {n}。', '{c} = {n}.'), { c: pn(`${root}${suffix}`), n: notes.map(pn).join(' ') }) });
  } },
  inversionBass: { ref: 'omt2e-figured-bass', make(rng) {
    const root = pick(rng, EASY_ROOTS);
    const seventh = rng() < 0.4;
    const notes = seventh ? chordNotes(root, '7') : triadNotes(root, rng() < 0.5 ? 'major' : 'minor');
    const inv = Math.floor(rng() * notes.length);
    const invName = [t('原位', '基本形', 'root position'), t('第一转位', '第 1 転回形', 'first inversion'), t('第二转位', '第 2 転回形', 'second inversion'), t('第三转位', '第 3 転回形', 'third inversion')];
    const figures = seventh ? ['7', '6/5', '4/3', '4/2'] : ['5/3', '6', '6/4'];
    const chordName = seventh ? pn(`${root}7`) : pn(`${root}${notes[1] === spellAbove(root, 2, 3) ? 'm' : ''}`);
    if (rng() < 0.5) {
      return choice(rng, { ref: 'omt2e-figured-bass', prompt: fmt(t('{c} 的{i}，最低音是？', '{c} の{i}の最低音は？', 'The bass of {c} in {i} is…'), { c: chordName, i: invName[inv] }),
        correct: pn(notes[inv]), wrong: [...notes.filter((_, i) => i !== inv).map(pn), pn(spellAbove(root, 1, 2))],
        audio: { notes: ascendingMidis([...notes.slice(inv), ...notes.slice(0, inv)], 3), mode: 'harmonic' },
        hint: t('原位根音在下，第一转位三音在下，第二转位五音在下，第三转位七音在下。', '基本形は根音、第 1 は 3 度、第 2 は 5 度、第 3 は 7 度が最低音。', 'Root, third, fifth or seventh in the bass for root position, 1st, 2nd, 3rd inversion.'),
        explain: fmt(t('{c} 的{i}：{b} 在最低。', '{c} の{i}：{b} が最低音。', '{c} in {i}: {b} in the bass.'), { c: chordName, i: invName[inv], b: pn(notes[inv]) }) });
    }
    return choice(rng, { ref: 'omt2e-figured-bass', prompt: fmt(t('{k}的{i}，数字低音记作？', '{k}の{i}の数字は？', 'The figures for a {k} in {i} are…'), { k: seventh ? t('七和弦', '七の和音', 'seventh chord') : t('三和弦', '三和音', 'triad'), i: invName[inv] }),
      correct: figures[inv], wrong: ['5/3', '6', '6/4', '7', '6/5', '4/3', '4/2'],
      hint: t('数字是从低音往上数的音程。', '数字はベースからの音程。', 'Figures are intervals above the bass.'),
      explain: fmt(t('{i}：{f}。', '{i}：{f}。', '{i}: {f}.'), { i: invName[inv], f: figures[inv] }) });
  } },
  romanChord: { ref: 'omt2e-roman-numerals', make(rng) {
    const minor = rng() < 0.4;
    const key = pick(rng, minor ? ['A', 'E', 'D', 'C', 'G'] : ['C', 'G', 'D', 'F', 'Bb', 'A', 'Eb']);
    const scale = spellHeptatonic(key, minor ? HARM_MINOR : MAJOR);
    const table = minor ? [['i', 'm'], ['ii°', 'dim'], ['III+', 'aug'], ['iv', 'm'], ['V', ''], ['VI', ''], ['vii°', 'dim']] : [['I', ''], ['ii', 'm'], ['iii', 'm'], ['IV', ''], ['V', ''], ['vi', 'm'], ['vii°', 'dim']];
    const d = minor ? pick(rng, [0, 3, 4, 5, 6]) : Math.floor(rng() * 7);
    const answer = pn(`${scale[d]}${table[d][1]}`);
    const wrong = [pn(`${scale[d]}${table[d][1] === 'm' ? '' : 'm'}`), pn(`${scale[(d + 1) % 7]}${table[(d + 1) % 7][1]}`), pn(`${scale[(d + 6) % 7]}${table[(d + 6) % 7][1]}`), pn(`${scale[d]}dim`)].filter((x) => x !== answer);
    return choice(rng, { ref: 'omt2e-roman-numerals', prompt: fmt(t('{k}里的 {r} 是哪个和弦？', '{k}の {r} はどの和音？', 'In {k}, {r} is…'), { k: minor ? fmt(t('{x} 小调', '{x} 短調', '{x} minor'), { x: pn(key) }) : fmt(t('{x} 大调', '{x} 長調', '{x} major'), { x: pn(key) }), r: table[d][0] }),
      correct: answer, wrong,
      hint: t('数字 = 根音是第几级；大写大三和弦，小写小三和弦，° 减三和弦。', '数字 = 根音の音度、大文字は長、小文字は短、° は減。', 'The numeral is the root’s degree; upper case major, lower case minor, ° diminished.'),
      explain: fmt(t('第 {n} 级是 {r}，{q}：{a}。', '第 {n} 音は {r}、{q}：{a}。', 'Degree {n} is {r}; {q}: {a}.'), { n: d + 1, r: pn(scale[d]), q: table[d][0], a: answer }) });
  } },
  secondaryDominant: { ref: 'omt2e-tonicization', make(rng) {
    const key = pick(rng, ['C', 'G', 'D', 'F', 'Bb']);
    const scale = spellHeptatonic(key, MAJOR);
    const [label, d] = pick(rng, [['V/ii', 1], ['V/iii', 2], ['V/IV', 3], ['V/V', 4], ['V/vi', 5]]);
    const root = spellAbove(scale[d], 4, 7);
    const answer = pn(`${root}7`);
    return choice(rng, { ref: 'omt2e-tonicization', prompt: fmt(t('{k} 大调里的 {l}（属七和弦）是哪个和弦？', '{k} 長調の {l}（属七）は？', 'In {k} major, {l} (as a dominant seventh) is…'), { k: pn(key), l: label }),
      correct: answer, wrong: [pn(`${root}m7`), pn(`${scale[d]}7`), pn(`${spellAbove(scale[d], 3, 5)}7`), pn(`${spellAbove(scale[d], 4, 6)}7`)].filter((x) => x !== answer),
      hint: t('先找被离调的和弦的根音，再往上数纯五度，做成属七和弦。', '一時的な主和音の根音から完全 5 度上に属七を作る。', 'Find the target chord’s root, go up a perfect fifth and build a dominant seventh.'),
      explain: fmt(t('{l}：{t} 的属七 = {a}。', '{l}：{t} の属七 = {a}。', '{l}: the dominant seventh of {t} = {a}.'), { l: label, t: pn(scale[d]), a: answer }) });
  } },
  neapolitan: { ref: 'omt2e-neapolitan', make(rng) {
    const key = pick(rng, ['C', 'A', 'D', 'G', 'E', 'F']);
    const root = spellAbove(key, 1, 1);
    const notes = triadNotes(root, 'major');
    return choice(rng, { ref: 'omt2e-neapolitan', prompt: fmt(t('{k} 调的那不勒斯和弦（♭II）是？', '{k} のナポリの和音（♭II）は？', 'The Neapolitan (♭II) in {k} is…'), { k: pn(key) }),
      correct: notes.map(pn).join(' '), wrong: [triadNotes(spellAbove(key, 1, 2), 'minor'), triadNotes(spellAbove(key, 1, 2), 'major'), triadNotes(root, 'minor'), triadNotes(spellAbove(key, 5, 8), 'major')].map((n) => n.map(pn).join(' ')),
      hint: t('降低的第二级（ra）上的大三和弦。', '下げた第 2 音（ra）の上の長三和音。', 'A major triad on the lowered 2nd (ra).'),
      explain: fmt(t('{k} 的第二级降半音得 {r}，上面叠大三和弦：{n}；通常用第一转位（♭II6）。', '{k} の第 2 音を下げて {r}、長三和音 {n}。ふつう第 1 転回形（♭II6）。', 'Lower {k}’s 2nd to {r} and stack a major triad: {n}, usually in first inversion (♭II6).'), { k: pn(key), r: pn(root), n: notes.map(pn).join(' ') }) });
  } },
  cadenceType: { ref: ['musictheory-net-cadences', 'omt2e-cadences'], make(rng) {
    const key = pick(rng, ['C', 'G', 'F', 'D']);
    const s = spellHeptatonic(key, MAJOR);
    const name = { I: pn(s[0]), IV: pn(s[3]), V: pn(s[4]), vi: pn(`${s[5]}m`), ii: pn(`${s[1]}m`) };
    const kinds = [['V', 'I', t('正格终止', '正格終止', 'authentic')], ['I', 'V', t('半终止', '半終止', 'half')], ['ii', 'V', t('半终止', '半終止', 'half')], ['IV', 'I', t('变格终止', '変格終止', 'plagal')], ['V', 'vi', t('阻碍终止', '偽終止', 'deceptive')]];
    const [a, b, label] = pick(rng, kinds);
    return choice(rng, { ref: 'musictheory-net-cadences', prompt: fmt(t('{k} 大调，乐句结尾是 {a} → {b}（{ra} → {rb}）。这是？', '{k} 長調、フレーズの終わり {a} → {b}（{ra} → {rb}）。これは？', 'In {k} major a phrase ends {a} → {b} ({ra} → {rb}). That is…'), { k: pn(key), a: name[a], b: name[b], ra: a, rb: b }),
      correct: label, wrong: [t('正格终止', '正格終止', 'authentic'), t('半终止', '半終止', 'half'), t('变格终止', '変格終止', 'plagal'), t('阻碍终止', '偽終止', 'deceptive')],
      hint: t('停在 V 上 = 半终止；V–I 正格；IV–I 变格；V–vi 阻碍。', 'V で止まる = 半終止、V–I 正格、IV–I 変格、V–vi 偽終止。', 'Ending on V = half; V–I authentic; IV–I plagal; V–vi deceptive.'),
      explain: fmt(t('{ra} → {rb}：{l}。', '{ra} → {rb}：{l}。', '{ra} → {rb}: {l}.'), { ra: a, rb: b, l: label }) });
  } },
  nctType: { ref: 'omt2e-embellishing', make(rng) {
    const types = [
      [t('经过音', '経過音', 'passing tone'), t('级进进入，同方向级进离开', '順次で入り、同じ向きへ順次で出る', 'step in, step out the same way')],
      [t('辅助音', '刺繍音', 'neighbour tone'), t('级进进入，反方向级进回到原音', '順次で入り、反対へ順次で戻る', 'step in, step back the other way')],
      [t('倚音', '倚音', 'appoggiatura'), t('跳进进入，反方向级进离开', '跳躍で入り、反対へ順次で出る', 'leap in, step out the other way')],
      [t('逃音', '逸音', 'escape tone'), t('级进进入，反方向跳进离开', '順次で入り、反対へ跳躍で出る', 'step in, leap out the other way')],
      [t('延留音', '掛留音', 'suspension'), t('保持前一个和弦的音，强拍上不协和，向下级进解决', '前の音を保ち、強拍で不協和、下へ順次で解決', 'held over, dissonant on the strong beat, resolves down by step')],
      [t('先现音', '先取音', 'anticipation'), t('下一个和弦的音提前出现', '次の和音の音が先に出る', 'a note of the next chord arrives early')],
      [t('持续音', '保続音', 'pedal tone'), t('低音保持不动，上方和弦变化', 'ベースが動かず上の和音が変わる', 'the bass holds while chords change above')],
    ];
    const [name, desc] = pick(rng, types);
    return choice(rng, { ref: 'omt2e-embellishing', prompt: fmt(t('"{d}"——这是哪种和弦外音？', '「{d}」——どの非和声音？', '“{d}” — which embellishing tone?'), { d: desc }), correct: name, wrong: types.map((x) => x[0]),
      hint: t('看两件事：怎么来（级进/跳进/保持），怎么走（方向）。', '入り方（順次・跳躍・保持）と出方（向き）を見る。', 'Check how it arrives (step, leap, held) and how it leaves (direction).'),
      explain: fmt(t('{n}：{d}。', '{n}：{d}。', '{n}: {d}.'), { n: name, d: desc }) });
  } },

  // 新黎曼 -----------------------------------------------------------------
  plr: { ref: 'omt2e-neo-riemannian', make(rng, { ops = ['P', 'R', 'L'] } = {}) {
    const start = { root: Math.floor(rng() * 12), major: rng() < 0.6 };
    const op = pick(rng, ops);
    const end = PLR[op](start);
    const wrong = Object.keys(PLR).filter((k) => k !== op).map((k) => triadLabel(PLR[k](start))).filter((x) => x !== triadLabel(end));
    return choice(rng, { ref: 'omt2e-neo-riemannian', prompt: fmt(t('{c} 经过 {o} 变换得到？', '{c} に {o} を施すと？', 'Apply {o} to {c}:'), { c: triadLabel(start), o: op }),
      correct: triadLabel(end), wrong, audio: { notes: [triadPcs(start).map((p) => 60 + p), triadPcs(end).map((p) => 60 + p)], mode: 'chords' },
      hint: t('P 同根音；R 关系大小调；L 导音交换；S、N、H 动两个或三个音。', 'P 同じ根音、R 平行調、L 導音交換、S・N・H は 2〜3 音を動かす。', 'P same root; R relative; L leading-tone exchange; S, N, H move two or three notes.'),
      explain: fmt(t('{c} —{o}→ {e}。', '{c} —{o}→ {e}。', '{c} —{o}→ {e}.'), { c: triadLabel(start), o: op, e: triadLabel(end) }) });
  } },
  plrCycle: { ref: 'omt2e-neo-riemannian', make(rng) {
    const [ops, len, scale] = pick(rng, [[['P', 'L'], 6, t('六声音阶', '六音音階', 'hexatonic')], [['R', 'P'], 8, t('八声音阶', '八音音階', 'octatonic')]]);
    let chord = { root: Math.floor(rng() * 12), major: true };
    const cycle = [chord];
    for (let i = 0; i < len - 1; i += 1) { chord = PLR[ops[i % 2]](chord); cycle.push(chord); }
    const ask = 2 + Math.floor(rng() * (len - 3));
    const answer = triadLabel(cycle[ask]);
    const shown = cycle.map((c, i) => (i === ask ? '?' : triadLabel(c))).join(' → ');
    return choice(rng, { ref: 'omt2e-neo-riemannian', prompt: fmt(t('{o} 交替循环：{s}。问号是？', '{o} の交互サイクル：{s}。? は？', '{o} cycle: {s}. What is “?”'), { o: ops.join(''), s: shown }),
      correct: answer, wrong: Object.keys(PLR).map((k) => triadLabel(PLR[k](cycle[ask - 1]))).filter((x) => x !== answer),
      visual: { kind: 'ring', labels: cycle.map(triadLabel), mark: ask },
      hint: fmt(t('交替做 {a} 和 {b}；这个循环一共 {n} 个三和弦。', '{a} と {b} を交互に。全部で {n} 個の三和音。', 'Alternate {a} and {b}; the cycle has {n} triads.'), { a: ops[0], b: ops[1], n: len }),
      explain: fmt(t('{o} 循环经过 {n} 个三和弦后回到起点，所有音合起来是{s}。', '{o} サイクルは {n} 個で一周し、音を集めると{s}。', 'The {o} cycle closes after {n} triads; its notes form the {s} scale.'), { o: ops.join(''), n: len, s: scale }) });
  } },
  seventhTower: { ref: 'mto-mcclimon', make(rng) {
    const root = pick(rng, ['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    const dim = chordNotes(root, 'dim7');
    const k = Math.floor(rng() * 4);
    const lowered = dim.map((n, i) => (i === k ? spellAbove(n, -1, -1) : n));
    const pcs = lowered.map((n) => parseNote(n).pc);
    const answer = nameChord(pcs, true);
    return choice(rng, { ref: 'mto-mcclimon', prompt: fmt(t('{c}（{n}）里把 {x} 降低半音，得到哪个和弦？', '{c}（{n}）の {x} を半音下げると？', 'Lower {x} in {c} ({n}) by a half step. Which chord results?'), { c: pn(`${root}dim7`), n: dim.map(pn).join(' '), x: pn(dim[k]) }),
      correct: answer, wrong: [nameChord(dim.map((n, i) => parseNote(n).pc + (i === k ? 1 : 0))), pn(`${simplestName(pcs[0])}m7`), pn(`${spellAbove(dim[k], -1, -1)}maj7`)].filter((x) => x && x !== answer),
      audio: { notes: [ascendingMidis(dim, 3), ascendingMidis(lowered, 3)], mode: 'chords' },
      hint: t('减七和弦任意一个音降半音，都会变成一个属七和弦；升半音则变成半减七和弦。', '減七のどれか 1 音を半音下げると属七、上げると半減七になる。', 'Lowering any note of a dim7 by a half step gives a dominant seventh; raising one gives a half-diminished seventh.'),
      explain: fmt(t('只动一个音、动半音：{c} → {a}。这就是"八音塔"里减七和弦连到四个属七和弦的那种连接。', '1 音を半音だけ：{c} → {a}。「八音塔」で減七が 4 つの属七につながる連結です。', 'One note, one half step: {c} → {a} — the kind of link the octatonic tower draws from a dim7 to four dominant sevenths.'), { c: pn(`${root}dim7`), a: answer }) });
  } },

  // 爵士 -------------------------------------------------------------------
  twelveBar: { ref: 'wiki-twelve-bar', make(rng) {
    const key = pick(rng, ['C', 'F', 'G', 'Bb', 'A', 'E']);
    const s = spellHeptatonic(key, MAJOR);
    const bars = ['I', 'I', 'I', 'I', 'IV', 'IV', 'I', 'I', 'V', 'IV', 'I', 'V'];
    const bar = pick(rng, [5, 9, 10, 12, 1, 7]);
    const chord = { I: pn(`${key}7`), IV: pn(`${s[3]}7`), V: pn(`${s[4]}7`) };
    return choice(rng, { ref: 'wiki-twelve-bar', prompt: fmt(t('{k} 调的基本十二小节布鲁斯，第 {b} 小节是？', '{k} の基本 12 小節ブルースの第 {b} 小節は？', 'In a basic 12-bar blues in {k}, bar {b} is…'), { k: pn(key), b: bar }),
      correct: chord[bars[bar - 1]], wrong: [...Object.values(chord), pn(`${s[1]}m7`)],
      hint: t('I I I I｜IV IV I I｜V IV I V', 'I I I I｜IV IV I I｜V IV I V', 'I I I I | IV IV I I | V IV I V'),
      explain: fmt(t('第 {b} 小节是 {r}：{c}。', '第 {b} 小節は {r}：{c}。', 'Bar {b} is {r}: {c}.'), { b: bar, r: bars[bar - 1], c: chord[bars[bar - 1]] }) });
  } },
  iiVI: { ref: 'omt2e-iivi', make(rng) {
    const minor = rng() < 0.4;
    const key = pick(rng, ['C', 'F', 'Bb', 'Eb', 'G', 'D']);
    const ii = spellAbove(key, 1, 2); const V = spellAbove(key, 4, 7);
    const chords = minor ? [`${ii}m7b5`, `${V}7`, `${key}m7`] : [`${ii}m7`, `${V}7`, `${key}maj7`];
    const ask = Math.floor(rng() * 3);
    const shown = chords.map((c, i) => (i === ask ? '___' : pn(c))).join(' → ');
    const alt = minor ? [`${ii}m7`, `${V}m7`, `${key}maj7`] : [`${ii}m7b5`, `${V}maj7`, `${key}m7`];
    return fill(rng, { ref: 'omt2e-iivi', prompt: fmt(t('{k} ii–V–I：{s}', '{k} の ii–V–I：{s}', 'ii–V–I in {k}: {s}'), { k: minor ? fmt(t('{x} 小调', '{x} 短調', '{x} minor'), { x: pn(key) }) : fmt(t('{x} 大调', '{x} 長調', '{x} major'), { x: pn(key) }), s: shown }),
      answer: [pn(chords[ask])], extra: [pn(alt[ask]), pn(`${spellAbove(chords[ask].replace(/m7b5|m7|maj7|7/, ''), 0, 1)}7`)],
      audio: { notes: chords.map((c) => ascendingMidis(chordNotes(c.replace(/m7b5|maj7|m7|7/, ''), c.match(/m7b5|maj7|m7|7/)[0]), 3)), mode: 'chords' },
      hint: t('大调 m7 – 7 – maj7；小调 ∅7 – 7 – m7；根音按五度往下走。', '長調 m7 – 7 – maj7、短調 ∅7 – 7 – m7、根音は 5 度ずつ下がる。', 'Major m7 – 7 – maj7; minor ∅7 – 7 – m7; roots fall by fifths.'),
      explain: fmt(t('{s}。', '{s}。', '{s}.'), { s: chords.map(pn).join(' → ') }) });
  } },
  tritoneSub: { ref: 'omt2e-substitutions', make(rng) {
    const root = pick(rng, ['G', 'C', 'D', 'A', 'E', 'F', 'Bb']);
    const sub = spellAbove(root, 4, 6);
    const third = spellAbove(root, 2, 4); const seventh = spellAbove(root, 6, 10);
    return choice(rng, { ref: 'omt2e-substitutions', prompt: fmt(t('{c} 的三全音替代是？', '{c} の裏コードは？', 'The tritone substitute for {c} is…'), { c: pn(`${root}7`) }),
      correct: pn(`${sub}7`), wrong: [pn(`${spellAbove(root, 3, 5)}7`), pn(`${spellAbove(root, 1, 1)}7`), pn(`${spellAbove(root, 4, 7)}7`), pn(`${sub}m7`)],
      hint: t('隔一个三全音（三个全音）的属七和弦。', '三全音（全音 3 つ）離れた属七。', 'The dominant seventh a tritone (three whole steps) away.'),
      explain: fmt(t('{a} 和 {b} 共享三全音 {x}–{y}，所以能互换。', '{a} と {b} は三全音 {x}–{y} を共有するので交換できる。', '{a} and {b} share the tritone {x}–{y}, so they can swap.'), { a: pn(`${root}7`), b: pn(`${sub}7`), x: pn(third), y: pn(seventh) }) });
  } },
  guideTones: { ref: 'omt2e-jazz-voicings', make(rng) {
    const q = pick(rng, ['maj7', '7', 'm7', 'm7b5']);
    const root = pick(rng, ['C', 'D', 'F', 'G', 'A', 'Bb', 'Eb']);
    const notes = chordNotes(root, q);
    const answer = `${pn(notes[1])} ${pn(notes[3])}`;
    return choice(rng, { ref: 'omt2e-jazz-voicings', prompt: fmt(t('{c} 的导向音（三音和七音）是？', '{c} のガイド・トーン（3 度と 7 度）は？', 'The guide tones (3rd and 7th) of {c} are…'), { c: pn(`${root}${q}`) }),
      correct: answer, wrong: [`${pn(notes[0])} ${pn(notes[2])}`, `${pn(notes[2])} ${pn(notes[3])}`, `${pn(notes[0])} ${pn(notes[1])}`, `${pn(spellAbove(notes[1], 0, q === 'm7' || q === 'm7b5' ? 1 : -1))} ${pn(notes[3])}`, `${pn(notes[1])} ${pn(notes[2])}`, `${pn(notes[0])} ${pn(notes[3])}`, `${pn(notes[1])} ${pn(spellAbove(notes[3], 0, 1))}`],
      hint: t('三音决定大小，七音决定是哪种七和弦。', '3 度が長短、7 度が七の和音の種類を決める。', 'The third decides major/minor; the seventh decides the seventh-chord type.'),
      explain: fmt(t('{c} = {n}，导向音是 {g}。', '{c} = {n}、ガイド・トーンは {g}。', '{c} = {n}; guide tones {g}.'), { c: pn(`${root}${q}`), n: notes.map(pn).join(' '), g: answer }) });
  } },
  guidePath: { ref: 'omt2e-jazz-voicings', make(rng) {
    const key = pick(rng, ['C', 'F', 'Bb', 'G', 'Eb']);
    const ii = spellAbove(key, 1, 2); const V = spellAbove(key, 4, 7);
    const dm7 = chordNotes(ii, 'm7'); const g7 = chordNotes(V, '7');
    return choice(rng, { ref: 'omt2e-jazz-voicings', prompt: fmt(t('{a} → {b}：{a} 的三音 {x} 到了 {b} 里变成？', '{a} → {b}：{a} の 3 度 {x} は {b} で何になる？', '{a} → {b}: the third of {a}, {x}, becomes what in {b}?'), { a: pn(`${ii}m7`), b: pn(`${V}7`), x: pn(dm7[1]) }),
      correct: t('七音（音不变）', '7 度（音はそのまま）', 'the seventh (same note)'), wrong: [t('三音', '3 度', 'the third'), t('根音', '根音', 'the root'), t('五音', '5 度', 'the fifth')],
      hint: fmt(t('{b} = {n}。', '{b} = {n}。', '{b} = {n}.'), { b: pn(`${V}7`), n: g7.map(pn).join(' ') }),
      explain: t('五度进行里，前一个和弦的三音常常原地不动，成为下一个和弦的七音；七音则往下走半音成为下一个和弦的三音。', '5 度進行では、前の和音の 3 度がそのまま次の 7 度になり、7 度は半音下がって次の 3 度になる。', 'In fifth-based motion the third stays put to become the next seventh, while the seventh steps down a half step to become the next third.') });
  } },
  chordScaleDegree: { ref: 'omt2e-chord-scale', make(rng) {
    const key = pick(rng, ['C', 'F', 'G', 'Bb', 'D']);
    const s = spellHeptatonic(key, MAJOR);
    const quals = ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5'];
    const d = Math.floor(rng() * 7);
    return choice(rng, { ref: 'omt2e-chord-scale', prompt: fmt(t('{k} 大调里的 {c}，按和弦—音阶理论配哪个调式？', '{k} 長調の {c} にはどの旋法？', 'In {k} major, which mode colours {c}?'), { k: pn(key), c: pn(`${s[d]}${quals[d]}`) }),
      correct: MODES[d].name, wrong: MODES.map((m) => m.name),
      hint: t('第几级和弦就用大调的第几个调式。', '何度の和音なら長音階の何番目の旋法。', 'Degree number = mode number of the major scale.'),
      explain: fmt(t('第 {n} 级 → {m}：从 {r} 开始弹 {k} 大调的音。', '第 {n} 度 → {m}：{k} 長調の音を {r} から。', 'Degree {n} → {m}: {k} major’s notes from {r}.'), { n: d + 1, m: MODES[d].name, r: pn(s[d]), k: pn(key) }) });
  } },
  drop2: { ref: 'wiki-voicing', make(rng) {
    const q = pick(rng, ['maj7', '7', 'm7']);
    const root = pick(rng, ['C', 'F', 'G', 'D', 'Bb']);
    const notes = chordNotes(root, q);
    const drop3 = rng() < 0.4;
    const moved = drop3 ? notes[1] : notes[2];
    return choice(rng, { ref: drop3 ? 'guitar-chord-drop' : 'wiki-voicing', prompt: fmt(t('{c} 紧密排列 {n}（由低到高），做 {d} 要把哪个音降低八度？', '{c} の密集配置 {n}（低→高）、{d} にはどの音をオクターヴ下げる？', '{c} in close position {n} (low to high): which note drops an octave for {d}?'), { c: pn(`${root}${q}`), n: notes.map(pn).join(' '), d: drop3 ? 'drop 3' : 'drop 2' }),
      correct: pn(moved), wrong: notes.map(pn),
      hint: drop3 ? t('从上往下数第三个。', '上から 3 番目。', 'Third from the top.') : t('从上往下数第二个。', '上から 2 番目。', 'Second from the top.'),
      explain: fmt(t('从上数：{r}。第 {k} 个是 {m}。', '上から：{r}。{k} 番目が {m}。', 'From the top: {r}. Number {k} is {m}.'), { r: [...notes].reverse().map(pn).join(' '), k: drop3 ? 3 : 2, m: pn(moved) }) });
  } },
  dominantMotion: { ref: 'omt2e-iivi', make(rng) {
    const root = pick(rng, ['G', 'D', 'A', 'C', 'F', 'E']);
    const yes = rng() < 0.5;
    const target = yes ? spellAbove(root, 3, 5) : spellAbove(root, ...pick(rng, [[1, 2], [2, 4], [4, 7], [5, 9]]));
    const kind = rng() < 0.5 ? '7' : 'm7';
    const strong = yes && kind === '7';
    const label = strong ? t('强功能进行（属七根音上行四度）', '強い機能進行（属七が 4 度上へ）', 'strong functional (dominant) motion') : yes ? t('根音下行五度，但不是属七', '根音は 5 度下行だが属七ではない', 'falling-fifth root motion, not a dominant') : t('不是五度进行', '5 度進行ではない', 'not fifth motion');
    return choice(rng, { ref: 'omt2e-iivi', prompt: fmt(t('{a} → {b} 属于哪一种？', '{a} → {b} はどれ？', '{a} → {b} is…'), { a: pn(`${root}${kind}`), b: pn(`${target}maj7`) }),
      correct: label, wrong: [t('强功能进行（属七根音上行四度）', '強い機能進行（属七が 4 度上へ）', 'strong functional (dominant) motion'), t('根音下行五度，但不是属七', '根音は 5 度下行だが属七ではない', 'falling-fifth root motion, not a dominant'), t('不是五度进行', '5 度進行ではない', 'not fifth motion'), t('转调到火星', '火星へ転調', 'a modulation to Mars')], n: 4,
      hint: t('先看根音是不是往上走了纯四度（=往下五度），再看前一个和弦是不是属七。', 'まず根音が 4 度上（5 度下）か、次に前の和音が属七か。', 'Check whether the root rises a fourth (falls a fifth), then whether the first chord is a dominant seventh.'),
      explain: t('"进行分析"把"属七 + 根音上行四度"标为强功能进行，只有根音五度关系则标为普通的下五度进行。', '「進行分析」は「属七 + 根音 4 度上行」を強い機能進行、根音の 5 度関係だけなら普通の 5 度下行とする。', 'Progression analysis labels “dominant seventh + root up a fourth” as strong functional motion; fifth-related roots alone are plain falling-fifth motion.') });
  } },
  keyCenter: { ref: 'omt2e-roman-numerals', make(rng) {
    const keys = ['C', 'G', 'D', 'F', 'Bb', 'A', 'Eb'];
    const quals = ['', 'm', 'm', '', '', 'm', 'dim'];
    const diatonic = (k) => spellHeptatonic(k, MAJOR).map((r, i) => pn(`${r}${quals[i]}`));
    for (let tries = 0; tries < 20; tries += 1) {
      const key = pick(rng, keys);
      const chords = shuffle(diatonic(key), rng).slice(0, 4);
      const fits = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'].filter((k) => chords.every((c) => diatonic(k).includes(c)));
      if (fits.length !== 1) continue;
      return choice(rng, { ref: 'omt2e-roman-numerals', prompt: fmt(t('{c}——这些和弦全部属于哪个大调？', '{c}——これらがすべて入る長調は？', '{c} — which major key contains all of these?'), { c: chords.join(' ') }),
        correct: pn(key), wrong: keys.filter((k) => k !== key).map(pn),
        hint: t('大调里：I、IV、V 大三和弦，ii、iii、vi 小三和弦，vii° 减三和弦。', '長調：I・IV・V は長、ii・iii・vi は短、vii° は減。', 'In major: I, IV, V major; ii, iii, vi minor; vii° diminished.'),
        explain: fmt(t('{k} 大调的顺阶和弦：{d}。"调性中心"工具也是按和弦音落在哪个音阶里来打分的。', '{k} 長調の和音：{d}。「調性中心」ツールも和音の音がどの音階に入るかで採点します。', '{k} major’s diatonic chords: {d}. The Key Center tool also scores keys by how many chord tones fit each scale.'), { k: pn(key), d: diatonic(key).join(' ') }) });
    }
    return GENERATORS.romanChord.make(rng);
  } },

  // 乐器、吉他 ---------------------------------------------------------------
  transposing: { ref: 'wiki-transposing-list', make(rng) {
    const [id, name] = pick(rng, [['clarinet-bb', t('降 B 调单簧管', 'B♭ クラリネット', 'B♭ clarinet')], ['sax-alto', t('中音萨克斯', 'アルト・サックス', 'alto saxophone')], ['horn', t('圆号（F 调）', 'ホルン（F）', 'horn in F')], ['trumpet-bb', t('降 B 调小号', 'B♭ トランペット', 'B♭ trumpet')], ['sax-tenor', t('次中音萨克斯', 'テナー・サックス', 'tenor saxophone')]]);
    const written = pick(rng, ['C5', 'D5', 'E5', 'G4', 'F4', 'A4']);
    const concert = writtenToConcert(id, written).name;
    const letter = concert.replace(/-?\d+$/, '');
    return choice(rng, { ref: 'wiki-transposing-list', prompt: fmt(t('{i} 谱上写 {w}，实际响的是哪个音名？', '{i} が {w} と書かれた音を吹くと、実音は？', 'A {i} reads {w}. Which pitch class sounds?'), { i: name, w: pn(written) }),
      correct: pn(letter), wrong: [pn(written.replace(/-?\d+$/, '')), pn(spellAbove(letter, 1, 2)), pn(spellAbove(letter, -1, -2)), pn(spellAbove(letter, 2, 3))].filter((x) => x !== pn(letter)),
      hint: t('降 B 调乐器响得比谱面低大二度（次中音萨克斯再低八度）；E♭ 中音萨克斯低大六度；F 调圆号低纯五度。', 'B♭ 楽器は長 2 度低い（テナー・サックスはさらにオクターヴ下）、E♭ アルトは長 6 度、F ホルンは完全 5 度低い。', 'B♭ instruments sound a major 2nd lower (tenor sax an octave more); E♭ alto a major 6th; F horn a perfect 5th.'),
      explain: fmt(t('写 {w} → 实际 {c}。', '{w} → 実音 {c}。', 'Written {w} → sounding {c}.'), { w: pn(written), c: pn(concert) }) });
  } },
  fretNote: { ref: 'wiki-standard-tuning', make(rng) {
    const string = Math.floor(rng() * 6);
    const fret = pick(rng, [0, 1, 2, 3, 5, 7, 8, 10, 12]);
    const midi = midiAt('guitar', string, fret);
    const name = simplestName(midi % 12, false);
    const openNames = ['E', 'A', 'D', 'G', 'B', 'E'];
    return choice(rng, { ref: 'wiki-standard-tuning', prompt: fmt(t('标准调弦，{s} 弦（空弦 {o}）第 {f} 品是？', '標準チューニング、{s} 弦（開放 {o}）の {f} フレットは？', 'Standard tuning: string {s} (open {o}), fret {f} is…'), { s: 6 - string, o: openNames[string], f: fret }),
      correct: pn(name), wrong: [1, 2, -1, -2, 5].map((d) => pn(simplestName(mod12(midi + d), false))),
      hint: t('每升一品高一个半音；第 12 品回到空弦音高八度。', '1 フレットで半音上がり、12 フレットで開放の 1 オクターヴ上。', 'Each fret adds a half step; fret 12 is the open note an octave up.'),
      explain: fmt(t('{o} 往上 {f} 个半音 = {n}。', '{o} から半音 {f} = {n}。', '{o} plus {f} half steps = {n}.'), { o: openNames[string], f: fret, n: pn(name) }) });
  } },

  // 世界与律学 ---------------------------------------------------------------
  chineseNote: { ref: ['zhwiki-pentatonic', 'zhwiki-heptatonic'], make(rng, { heptatonic = false } = {}) {
    const gong = pick(rng, ['C', 'D', 'F', 'G', 'Bb', 'Eb', 'A']);
    const jie = [['宫', 0, 0], ['商', 1, 2], ['角', 2, 4], ['徵', 4, 7], ['羽', 5, 9]];
    const pian = [['清角', 3, 5], ['变徵', 3, 6], ['闰', 6, 10], ['变宫', 6, 11]];
    const [name, steps, semis] = pick(rng, heptatonic ? pian : jie.slice(1));
    const answer = spellAbove(gong, steps, semis);
    const nameJa = { 商: '商', 角: '角', 徵: '徵', 羽: '羽', 清角: '清角', 变徵: '変徵', 闰: '閏', 变宫: '変宮' }[name];
    return choice(rng, { ref: heptatonic ? 'zhwiki-heptatonic' : 'zhwiki-pentatonic', prompt: fmt(t('以 {g} 为宫，{n} 是哪个音？', '{g} を宮とすると、{j} は？', 'With {g} as gong, which note is {n}?'), { g: pn(gong), n: name, j: nameJa }),
      correct: pn(answer), wrong: [...jie, ...pian].map(([, s, n]) => pn(spellAbove(gong, s, n))).filter((x) => x !== pn(answer)),
      hint: t('宫商角徵羽 = do re mi sol la；清角 fa、变徵 升 fa、闰 降 ti、变宫 ti。', '宮商角徵羽 = do re mi sol la、清角 fa・変徵 ♯fa・閏 ♭ti・変宮 ti。', 'Gong shang jue zhi yu = do re mi sol la; qingjue fa, bianzhi ♯fa, run ♭ti, biangong ti.'),
      explain: fmt(t('以 {g} 为宫：{n} = {a}。', '{g} が宮：{j} = {a}。', 'With {g} as gong: {n} = {a}.'), { g: pn(gong), n: name, j: nameJa, a: pn(answer) }) });
  } },
  thaatNote: { ref: 'wiki-thaat', make(rng) {
    const id = pick(rng, Object.keys(THAATS));
    const semis = thaatSemitones(id);
    const altered = THAATS[id].svaras.map((s, i) => [s, i]).filter(([s]) => !['S', 'R', 'G', 'M', 'P', 'D', 'N'].includes(s));
    if (!altered.length || rng() < 0.4) {
      return choice(rng, { ref: 'wiki-thaat', prompt: fmt(t('{n} thaat 和哪个西方音阶同音？', '{n} タートと同じ音の西洋音階は？', 'Which Western scale matches {n} thaat?'), { n: THAATS[id].raga === 'Miyan ki Todi' ? 'Todi' : id[0].toUpperCase() + id.slice(1) }),
        correct: THAATS[id].western, wrong: Object.values(THAATS).map((x) => x.western),
        hint: t('看哪些 svara 被降低（komal）或升高（tivra）。', 'どの svara が下がる（komal）か上がる（tivra）か見る。', 'Check which svaras are lowered (komal) or raised (tivra).'),
        explain: fmt(t('C 上的音：{n} → {w}。', 'C 上の音：{n} → {w}。', 'On C: {n} → {w}.'), { n: semis.map((s) => pn(simplestName(s))).join(' '), w: THAATS[id].western }) });
    }
    const [sv, i] = pick(rng, altered);
    const name = spellAbove('C', i, semis[i]);
    return choice(rng, { ref: 'wiki-thaat', prompt: fmt(t('把 Sa 放在 C 上，{n} thaat 的 {s} 是哪个音？', 'Sa を C にすると、{n} タートの {s} は？', 'With Sa on C, which note is {s} in {n} thaat?'), { n: id[0].toUpperCase() + id.slice(1), s: sv }),
      correct: pn(name), wrong: [pn(spellAbove('C', i, semis[i] + 1)), pn(spellAbove('C', i, semis[i] - 1)), pn(spellAbove('C', i, MAJOR[i])), pn(spellAbove('C', (i + 1) % 7, semis[(i + 1) % 7])), pn(spellAbove('C', (i + 6) % 7, semis[(i + 6) % 7]))].filter((x) => x !== pn(name)),
      hint: t('小写（如 r g d n）是降低的音，M\' 是升高的 Ma。', '小文字（r g d n）は下がった音、M\' は上がった Ma。', 'Lower-case (r g d n) are lowered; M\' is the raised Ma.'),
      explain: fmt(t('{s} = {a}。', '{s} = {a}。', '{s} = {a}.'), { s: sv, a: pn(name) }) });
  } },
  edoCents: { ref: 'wiki-pythagorean', make(rng) {
    const n = pick(rng, [5, 7, 12, 17, 19, 22, 24, 31, 53]);
    const step = 1200 / n;
    const label = (x) => (Number.isInteger(x) ? String(x) : x.toFixed(1));
    return choice(rng, { ref: 'wiki-pythagorean', prompt: fmt(t('{n} 平均律（一个八度平均分 {n} 份）每一步约多少音分？', '{n} 平均律の 1 歩は約何セント？', 'About how many cents is one step of {n}-EDO?'), { n }),
      correct: label(step), wrong: [12, 24, 31, 53, 19, 7].filter((m) => m !== n).map((m) => label(1200 / m)),
      hint: t('一个八度 = 1200 音分，除以份数。', 'オクターヴ = 1200 セント、分割数で割る。', 'An octave is 1200 cents; divide by the number of steps.'),
      explain: fmt(t('1200 ÷ {n} ≈ {s} 音分。', '1200 ÷ {n} ≈ {s} セント。', '1200 ÷ {n} ≈ {s} cents.'), { n, s: label(step) }) });
  } },
  ratioCents: { ref: 'wiki-harmonic-series', make(rng) {
    const items = [['2/1', 1200, t('八度', 'オクターヴ', 'octave')], ['3/2', 702, t('纯五度', '完全 5 度', 'perfect fifth')], ['4/3', 498, t('纯四度', '完全 4 度', 'perfect fourth')], ['5/4', 386, t('纯律大三度', '純正長 3 度', 'just major third')], ['6/5', 316, t('纯律小三度', '純正短 3 度', 'just minor third')], ['7/4', 969, t('七度泛音的小七度', '第 7 倍音の短 7 度', 'harmonic seventh')], ['11/9', 347, t('中立三度', '中立 3 度', 'neutral third')]];
    const [ratio, cents, name] = pick(rng, items);
    return choice(rng, { ref: ratio === '11/9' ? 'wiki-neutral-third' : 'wiki-harmonic-series', prompt: fmt(t('频率比 {r}（{n}）大约多少音分？', '周波数比 {r}（{n}）は約何セント？', 'About how many cents is the ratio {r} ({n})?'), { r: ratio, n: name }),
      correct: String(cents), wrong: items.filter((i) => i[0] !== ratio).map((i) => String(i[1])),
      audio: { notes: [60, 60 + cents / 100], mode: 'harmonic' },
      hint: t('音分 = 1200 × log₂(频率比)；纯五度约 702，平均律五度正好 700。', 'セント = 1200 × log₂(比)。純正 5 度は約 702、平均律の 5 度はちょうど 700。', 'Cents = 1200 × log₂(ratio); a pure fifth is about 702, the tempered fifth exactly 700.'),
      explain: fmt(t('{r} ≈ {c} 音分。', '{r} ≈ {c} セント。', '{r} ≈ {c} cents.'), { r: ratio, c: cents }) });
  } },
  harmonicNumber: { ref: 'wiki-harmonic-series', make(rng) {
    const items = [[2, t('一个八度', 'オクターヴ', 'an octave')], [3, t('纯五度', '完全 5 度', 'a perfect fifth')], [4, t('纯四度', '完全 4 度', 'a perfect fourth')]];
    const [n, label] = pick(rng, items);
    return choice(rng, { ref: 'wiki-harmonic-series', prompt: fmt(t('第 {n} 泛音比第 {m} 泛音高多少？', '第 {n} 倍音は第 {m} 倍音よりどれだけ高い？', 'How far above harmonic {m} is harmonic {n}?'), { n, m: n - 1 }),
      correct: label, wrong: items.map((i) => i[1]).concat([t('一个大三度', '長 3 度', 'a major third')]),
      audio: { notes: [36 + 12 * Math.log2(n - 1), 36 + 12 * Math.log2(n)], mode: 'melody' },
      hint: t('频率比 n:(n−1)：2:1 八度，3:2 五度，4:3 四度。', '比 n:(n−1)：2:1 オクターヴ、3:2 は 5 度、4:3 は 4 度。', 'The ratio n:(n−1): 2:1 octave, 3:2 fifth, 4:3 fourth.'),
      explain: fmt(t('{n}:{m} = {l}。', '{n}:{m} = {l}。', '{n}:{m} = {l}.'), { n, m: n - 1, l: label }) });
  } },
  // 纯律音程：比、最大质数（质数极限）与 Huygens-Fokker 音程表的标准英文名称（中日文为对英文名的直译说明）
  primeLimit: { ref: 'wiki-limit', make(rng) {
    const [ratio, limit] = pick(rng, JI_INTERVALS.map((i) => [i[0], i[1]]));
    return choice(rng, { ref: 'wiki-limit', prompt: fmt(t('{r} 属于哪个质数极限？', '{r} はどの素数リミット？', 'Which prime limit is {r}?'), { r: ratio }),
      correct: `${limit}-limit`, wrong: ['3-limit', '5-limit', '7-limit', '11-limit'], n: 4,
      audio: { notes: [60, 60 + 12 * Math.log2(Number(ratio.split('/')[0]) / Number(ratio.split('/')[1]))], mode: 'harmonic' },
      hint: t('分子、分母里出现的最大质数（2 不算"极限"的主角，只表示八度）。', '分子・分母に出てくる最大の素数（2 はオクターヴを表すだけ）。', 'The largest prime in numerator or denominator (2 only means octaves).'),
      explain: fmt(t('{r} 的最大质数是 {p}：{p}-limit。7-limit 也叫 septimal，11-limit 也叫 undecimal。', '{r} の最大の素数は {p}：{p}-limit。7-limit は septimal、11-limit は undecimal とも。', '{r}’s largest prime is {p}: {p}-limit. 7-limit is also called septimal, 11-limit undecimal.'), { r: ratio, p: limit }) });
  } },
  jiInterval: { ref: 'hf-intervals', make(rng) {
    const item = pick(rng, JI_INTERVALS);
    const [ratio, , name] = item;
    const label = (i) => t(`${i[2]}（${i[3]}）`, `${i[2]}（${i[4]}）`, i[2]);
    const audio = { notes: [60, 60 + 12 * Math.log2(Number(ratio.split('/')[0]) / Number(ratio.split('/')[1]))], mode: 'harmonic' };
    if (rng() < 0.5) {
      return choice(rng, { ref: 'hf-intervals', prompt: fmt(t('频率比 {r} 的标准音程名称是？', '比 {r} の標準的な音程名は？', 'What is the standard name of the ratio {r}?'), { r: ratio }),
        correct: label(item), wrong: JI_INTERVALS.filter((i) => i !== item).map(label), audio,
        hint: t('先看最大质数：7 的叫 septimal（或 harmonic seventh），11 的叫 undecimal。', 'まず最大の素数：7 なら septimal（または harmonic seventh）、11 なら undecimal。', 'Check the largest prime first: 7 gives septimal (or harmonic seventh), 11 gives undecimal.'),
        explain: fmt(t('{r} = {n}（Huygens-Fokker 音程表）。', '{r} = {n}（Huygens-Fokker の音程表）。', '{r} = {n} (Huygens-Fokker list of intervals).'), { r: ratio, n: name }) });
    }
    return choice(rng, { ref: 'hf-intervals', prompt: fmt(t('"{n}"是哪个频率比？', '「{n}」はどの比？', 'Which ratio is the “{n}”?'), { n: name }),
      correct: ratio, wrong: JI_INTERVALS.filter((i) => i !== item).map((i) => i[0]), audio,
      hint: t('septimal = 用到 7，undecimal = 用到 11。', 'septimal = 7 を使う、undecimal = 11 を使う。', 'Septimal uses 7; undecimal uses 11.'),
      explain: fmt(t('{n} = {r}。', '{n} = {r}。', '{n} = {r}.'), { n: name, r: ratio }) });
  } },
  turkishKoma: { ref: 'wiki-turkish-makam', make(rng) {
    const items = [['bakiye', '4'], ['küçük mücenneb', '5'], ['büyük mücenneb', '8'], ['tanîni', '9']];
    const [name, k] = pick(rng, items);
    return choice(rng, { ref: 'wiki-turkish-makam', prompt: fmt(t('土耳其 53 koma 体系里，{n} 是几个 koma？', 'トルコの 53 コマ体系で {n} は何コマ？', 'In the Turkish 53-comma system, {n} is how many commas?'), { n: name }),
      correct: k, wrong: ['1', '3', '4', '5', '8', '9'],
      hint: t('tanîni（全音）9，bakiye 4，küçük mücenneb 5，büyük mücenneb 8。', 'tanîni（全音）9、bakiye 4、küçük 5、büyük 8。', 'Tanîni (whole tone) 9, bakiye 4, küçük mücenneb 5, büyük mücenneb 8.'),
      explain: fmt(t('{n} = {k} koma（每 koma 约 22.6 音分）。', '{n} = {k} コマ（1 コマ約 22.6 セント）。', '{n} = {k} commas (about 22.6 cents each).'), { n: name, k }) });
  } },

  // 二十世纪 -----------------------------------------------------------------
  pcInteger: { ref: 'omt2e-pitch-class', make(rng) {
    const pc = Math.floor(rng() * 12);
    const name = simplestName(pc, rng() < 0.5);
    return choice(rng, { ref: 'omt2e-pitch-class', prompt: fmt(t('{n} 的整数音级是？（C = 0）', '{n} の整数ピッチクラスは？（C = 0）', 'What is the pitch-class integer of {n}? (C = 0)'), { n: pn(name) }),
      correct: String(pc), wrong: [1, 2, 11, 10, 3].map((d) => String(mod12(pc + d))), visual: { kind: 'clock', pcs: [pc] },
      hint: t('从 C = 0 开始，每半音加 1。', 'C = 0 から半音ごとに 1。', 'Start at C = 0, add 1 per half step.'),
      explain: fmt(t('{n} = {p}。', '{n} = {p}。', '{n} = {p}.'), { n: pn(name), p: pc }) });
  } },
  intervalClass: { ref: 'omt2e-integer-intervals', make(rng) {
    const a = Math.floor(rng() * 12); const b = Math.floor(rng() * 12);
    const d = mod12(b - a); const ic = Math.min(d, 12 - d);
    return choice(rng, { ref: 'omt2e-integer-intervals', prompt: fmt(t('音级 {a} 和 {b} 之间的音程级是？', 'ピッチクラス {a} と {b} の音程クラスは？', 'The interval class between pcs {a} and {b} is…'), { a, b }),
      correct: String(ic), wrong: ['0', '1', '2', '3', '4', '5', '6', String(d)].filter((x) => x !== String(ic)), visual: { kind: 'clock', pcs: [a, b] },
      hint: t('在钟面上走短的那一边，结果不超过 6。', '時計の短いほうを回る。6 を超えない。', 'Go the short way round the clock; never more than 6.'),
      explain: fmt(t('一边 {d}，另一边 {e}，取小的：{i}。', '片方 {d}、もう片方 {e}、小さいほう：{i}。', 'One way {d}, the other {e}; take the smaller: {i}.'), { d, e: 12 - d, i: ic }) });
  } },
  tnIn: { ref: 'omt2e-normal-order', make(rng) {
    const set = pick(rng, [[0, 4, 7], [0, 3, 7], [0, 1, 4], [0, 2, 6], [0, 4, 8], [0, 1, 6]]);
    const base = transpose(set, Math.floor(rng() * 12));
    const n = 1 + Math.floor(rng() * 11);
    const inv = rng() < 0.4;
    const result = inv ? invert(base, n) : transpose(base, n);
    const wrongs = [transpose(base, n + 1), inv ? transpose(base, n) : invert(base, n), transpose(base, n - 1)].map((s) => formatSet(s, '{}'));
    return choice(rng, { ref: 'omt2e-normal-order', prompt: fmt(t('对 {s} 做 {o}{n}，得到？', '{s} に {o}{n} を施すと？', 'Apply {o}{n} to {s}:'), { s: formatSet(base, '{}'), o: inv ? 'I' : 'T', n }),
      correct: formatSet(result, '{}'), wrong: wrongs.filter((w) => w !== formatSet(result, '{}')), visual: { kind: 'clock', pcs: base },
      hint: inv ? t('In：用 n 减去每个数（n − x），再对 12 取余。', 'In：n から各数を引く（n − x）、12 で割った余り。', 'In: subtract each number from n (n − x), mod 12.') : t('Tn：每个数加 n，超过 11 就减 12。', 'Tn：各数に n を足し、11 を超えたら 12 を引く。', 'Tn: add n to each number, mod 12.'),
      explain: fmt(t('结果是 {r}（t = 10，e = 11）。', '結果は {r}（t = 10、e = 11）。', 'The result is {r} (t = 10, e = 11).'), { r: formatSet(result, '{}') }) });
  } },
  primeForm: { ref: 'omt2e-prime-form', make(rng) {
    const set = pick(rng, [[0, 4, 7], [0, 3, 7], [0, 1, 4], [0, 2, 6], [0, 4, 8], [0, 1, 6], [0, 1, 3], [0, 2, 5], [0, 2, 7]]);
    const shown = transpose(set, Math.floor(rng() * 12));
    const prime = primeForm(shown);
    const fmtP = (p) => `(${p.map((x) => (x === 10 ? 't' : x === 11 ? 'e' : x)).join('')})`;
    const others = [[0, 3, 7], [0, 4, 7], [0, 2, 5], [0, 1, 4], [0, 2, 6], [0, 4, 8], [0, 1, 6], [0, 1, 3], [0, 2, 7], [0, 1, 5]].map((s) => fmtP(primeForm(s)));
    return choice(rng, { ref: 'omt2e-prime-form', prompt: fmt(t('{s} 的原型（prime form）是？', '{s} のプライム・フォームは？', 'The prime form of {s} is…'), { s: formatSet(shown, '{}') }),
      correct: fmtP(prime), wrong: others.filter((o) => o !== fmtP(prime)), visual: { kind: 'clock', pcs: shown },
      hint: t('先排成最紧凑的顺序，移到 0 开头，再和它的倒影比谁往左更紧。', '最も詰めた順に並べ、0 から始め、反転と比べて左に詰まったほう。', 'Find the most compact order, transpose to 0, and compare with its inversion for left-packing.'),
      explain: fmt(t('{s} 属于集合类 {p}。', '{s} はセット・クラス {p}。', '{s} belongs to set class {p}.'), { s: formatSet(shown, '{}'), p: fmtP(prime) }) });
  } },
  icVector: { ref: 'omt2e-ic-vector', make(rng) {
    const set = pick(rng, [[0, 4, 7], [0, 3, 7], [0, 1, 2], [0, 2, 4], [0, 4, 8], [0, 3, 6], [0, 1, 6], [0, 2, 7]]);
    const v = intervalVector(set);
    const label = `<${v.join('')}>`;
    const wrong = [[0, 0, 1, 1, 1, 0], [2, 1, 0, 0, 0, 0], [0, 2, 0, 1, 0, 0], [0, 0, 0, 3, 0, 0], [0, 0, 2, 0, 0, 1], [1, 0, 0, 0, 1, 1], [0, 1, 0, 0, 2, 0]].map((x) => `<${x.join('')}>`).filter((x) => x !== label);
    return choice(rng, { ref: 'omt2e-ic-vector', prompt: fmt(t('{s} 的音程级向量是？', '{s} の音程クラス・ベクトルは？', 'The interval-class vector of {s} is…'), { s: formatSet(set, '{}') }), correct: label, wrong,
      hint: t('两两配对算音程级，数一数 1 到 6 各有几个；三音集合总和是 3。', '2 つずつ組んで音程クラスを数える。3 音なら合計 3。', 'Pair the notes, tally interval classes 1–6; a trichord totals 3.'),
      explain: fmt(t('{s} → {v}。', '{s} → {v}。', '{s} → {v}.'), { s: formatSet(set, '{}'), v: label }) });
  } },
  rowForm: { ref: 'omt2e-twelve-tone', make(rng) {
    const row = shuffle([...Array(12).keys()], rng);
    const four = row.slice(0, 4);
    const kind = pick(rng, ['R', 'I']);
    const result = kind === 'R' ? [...row].reverse().slice(0, 4) : row.map((x) => mod12(2 * row[0] - x)).slice(0, 4);
    const show = (xs) => xs.map((x) => (x === 10 ? 't' : x === 11 ? 'e' : x)).join(' ');
    return choice(rng, { ref: 'omt2e-twelve-tone', prompt: fmt(t('序列 {r} …… 的 {k} 形式前四个音是？', '音列 {r} …… の {k} 形の最初の 4 音は？', 'For the row {r} …, the first four notes of {k} are…'), { r: show(row), k: kind === 'R' ? t('逆行 R', '逆行 R', 'retrograde R') : t('倒影 I（从同一个音开始）', '反行 I（同じ音から）', 'inversion I (same starting note)') }),
      correct: show(result), wrong: [show(four), show([...row].reverse().slice(0, 4).map((x) => mod12(x + 1))), show(row.map((x) => mod12(-x)).slice(0, 4)), show(row.slice(8))].filter((w) => w !== show(result)),
      hint: kind === 'R' ? t('逆行就是从最后一个音倒着读。', '逆行は最後の音から逆に読む。', 'Retrograde reads the row backwards.') : t('倒影把每个音程的方向翻过来：上行 3 变成下行 3。', '反行は各音程の向きを逆に：上へ 3 は下へ 3。', 'Inversion flips each interval: up 3 becomes down 3.'),
      explain: fmt(t('{k}：{r} ……', '{k}：{r} ……', '{k}: {r} …'), { k: kind, r: show(result) }) });
  } },

  // 微分音 -------------------------------------------------------------------
  neutralTriad: { ref: 'wiki-neutral-third', make(rng) {
    const kinds = [['major', 4, TRIAD_NAME.major], ['minor', 3, TRIAD_NAME.minor], ['neutral', 3.5, t('中立三和弦', '中立三和音', 'neutral triad')]];
    const [, third, name] = pick(rng, kinds);
    const root = 57 + Math.floor(rng() * 6);
    return choice(rng, { ref: 'wiki-neutral-third', prompt: t('听：这是大三、小三，还是中立三和弦？', '聴いて：長三・短三・中立三和音のどれ？', 'Listen: major, minor or neutral triad?'), correct: name, wrong: [...kinds.map((k) => k[2]), TRIAD_NAME.augmented], n: 4,
      audio: { notes: [root, root + third, root + 7], mode: 'harmonic' },
      hint: t('中立三和弦的三音在大三度和小三度正中间（约 350 音分），听起来"不大不小"。', '中立三和音の 3 度は長 3 度と短 3 度のちょうど中間（約 350 セント）で、長でも短でもない。', 'A neutral triad’s third sits halfway between major and minor (about 350 cents) — neither major nor minor.'),
      explain: fmt(t('这是{n}。', 'これは{n}。', 'That was a {n}.'), { n: name }) });
  } },
};

/** 题卡中的生成器占位展开成具体题卡 */
export function expandCards(cards, rng = Math.random) {
  return cards.flatMap((card) => {
    if (card.type !== 'gen') return [card];
    const gen = GENERATORS[card.gen];
    if (!gen) throw new Error(`unknown generator ${card.gen}`);
    return Array.from({ length: card.count ?? 1 }, () => gen.make(rng, card.params || {}));
  });
}

/** 生成器默认引用的资料（供注释汇总与资料列表使用） */
export const generatorRefs = (name) => [].concat(GENERATORS[name]?.ref ?? []);

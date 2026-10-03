// 爵士进阶：重配和声、和弦配置、bebop 语汇与曲式库
// 依据（各函数旁注明）：
//   ref:omt2e-substitutions  OMT 2e 6.6：五度进行中前一和弦可换成同根属七；调式交替（ii∅7 代 ii7、V7 加 ♭9）；
//                            任何属七可换成相距三全音的属七（两者共享同一个三全音）
//   ref:wiki-backdoor        维基百科「Backdoor progression」（引 Coker 1997 等）：iv7–♭VII7–I
//   ref:wiki-coltrane        维基百科「Coltrane changes」（引 Porter 2000 等）：C 调 ii–V–I → Dm7 E♭7 A♭maj7 B7 Emaj7 G7 Cmaj7
//   ref:omt2e-jazz-voicings  OMT 2e 6.3：两个上方声部用三音与七音（省略五音）
//   ref:wiki-voicing         维基百科「Voicing (music)」：drop-2 把第二声部降低八度
//   ref:guitar-chord-drop    guitar-chord.org：drop 3 把从上往下数第三个音降低八度
//   ref:wiki-so-what         维基百科「So What chord」（引 Levine 等）：自下而上三个纯四度加一个大三度，作小十一和弦（1 4 ♭7 ♭3 5）
//   ref:wiki-upper-structure 维基百科「Upper structure」（引 Levine《The Jazz Piano Book》第 14 章、Ellenberger）：C7 上的高结构三和弦表
//   ref:wiki-bebop-scale     维基百科「Bebop scale」（引 David Baker 等）：四种 bebop 音阶；Barry Harris 称 bebop 大调音阶为大六度减音阶
//   ref:jgl-sixth-dim        Jazz Guitar Licks（Stef Ramin）：大六度减音阶由大六和弦与减七和弦交替构成（Barry Harris 的和声概念）
//   ref:larsen-enclosure     Jens Larsen「Chromatic Enclosure」：从上方和下方包围目标音
//   ref:wiki-twelve-bar      维基百科「Twelve-bar blues」：基本、quick change、bebop（Spitzer 2001）与小调布鲁斯
//   ref:wiki-blues-for-alice 维基百科「Blues for Alice」（引 The Real Book 等）
//   ref:wiki-rhythm-changes  维基百科「Rhythm changes」（引 Spitzer 2001、Holbrook 2008）
import { parseNote, spellAbove } from './pitch_spelling.js';

/** 和弦性质：每个和弦音写作 [相对根音的音级（0 根音、2 三音…）, 半音] */
export const QUALITIES = {
  maj7: { suffix: 'maj7', tones: [[0, 0], [2, 4], [4, 7], [6, 11]] },
  m7: { suffix: 'm7', tones: [[0, 0], [2, 3], [4, 7], [6, 10]] },
  '7': { suffix: '7', tones: [[0, 0], [2, 4], [4, 7], [6, 10]] },
  m7b5: { suffix: 'm7♭5', tones: [[0, 0], [2, 3], [4, 6], [6, 10]] },
  dim7: { suffix: '°7', tones: [[0, 0], [2, 3], [4, 6], [6, 9]] },
  '6': { suffix: '6', tones: [[0, 0], [2, 4], [4, 7], [5, 9]] },
  m6: { suffix: 'm6', tones: [[0, 0], [2, 3], [4, 7], [5, 9]] },
  '7b9': { suffix: '7♭9', tones: [[0, 0], [2, 4], [4, 7], [6, 10], [1, 13]] },
  maj: { suffix: '', tones: [[0, 0], [2, 4], [4, 7]] },
  m: { suffix: 'm', tones: [[0, 0], [2, 3], [4, 7]] },
};

const QUALITY_ALIASES = [
  [/^(maj7|M7|Δ7|Δ|ma7)$/, 'maj7'], [/^(m7b5|m7♭5|ø7|ø|-7b5)$/, 'm7b5'], [/^(dim7|°7|o7)$/, 'dim7'],
  [/^(m7|-7|min7|mi7)$/, 'm7'], [/^(7b9|7♭9)$/, '7b9'], [/^7$/, '7'], [/^(6)$/, '6'], [/^(m6|-6)$/, 'm6'],
  [/^(m|-|min)$/, 'm'], [/^$/, 'maj'],
];

/** 解析和弦符号，如 "Dm7" "G7" "Cmaj7" "Bbm7b5" "F#°7" */
export function parseChordSymbol(symbol) {
  const match = String(symbol).trim().match(/^([A-G](?:#|b|♯|♭)?)(.*)$/);
  if (!match) return null;
  const root = parseNote(match[1].replace('♯', '#').replace('♭', 'b'));
  if (!root) return null;
  const rest = match[2].trim();
  const alias = QUALITY_ALIASES.find(([re]) => re.test(rest));
  if (!alias) return null;
  return { root: match[1].replace('♯', '#').replace('♭', 'b'), rootPc: root.pc, quality: alias[1] };
}

export function chordSymbol(root, quality) {
  return `${root}${QUALITIES[quality].suffix}`;
}

/** 和弦音的拼写（按音级），如 G7 → G B D F */
export function chordTones(root, quality) {
  return QUALITIES[quality].tones.map(([steps, semis]) => spellAbove(root, steps, semis));
}

const interval = (fromPc, toPc) => (toPc - fromPc + 12) % 12;

// ---------------------------------------------------------------------------
// 重配和声
// ---------------------------------------------------------------------------

/** 三全音替代：属七换成相距三全音的属七（ref:omt2e-substitutions），根音按减五度拼写，如 G7 → D♭7 */
export function tritoneSub(root) {
  return spellAbove(root, 4, 6);
}

/**
 * 对一串和弦应用某种重配技巧。
 * @param {string[]} symbols 和弦符号
 * @param {string} key 主音（大调）
 * @param {'tritone'|'applied'|'mixture'|'backdoor'|'coltrane'} technique
 * @returns {{ chords: string[], changes: Array<{ at: number, from: string[], to: string[], note: string }> }}
 */
export function reharmonize(symbols, key, technique) {
  const parsed = symbols.map((s) => {
    const chord = parseChordSymbol(s);
    if (!chord) throw new Error(`无法识别的和弦: ${s}`);
    return chord;
  });
  const tonicPc = parseNote(key).pc;
  const degree = (chord) => interval(tonicPc, chord.rootPc);
  const out = [];
  const changes = [];
  for (let i = 0; i < parsed.length; i++) {
    const chord = parsed[i];
    const next = parsed[i + 1];
    const after = parsed[i + 2];
    const original = chordSymbol(chord.root, chord.quality);
    if (technique === 'tritone' && (chord.quality === '7' || chord.quality === '7b9')) {
      const sub = chordSymbol(tritoneSub(chord.root), chord.quality);
      out.push(sub);
      changes.push({ at: i, from: [original], to: [sub], note: 'tritone' });
      continue;
    }
    if (technique === 'applied' && next && interval(chord.rootPc, next.rootPc) === 5 && !['7', '7b9'].includes(chord.quality) && chord.quality !== 'dim7') {
      // 五度进行的前一和弦换成同根属七（ref:omt2e-substitutions）
      const sub = chordSymbol(chord.root, '7');
      out.push(sub);
      changes.push({ at: i, from: [original], to: [sub], note: 'applied' });
      continue;
    }
    if (technique === 'mixture') {
      // 调式交替：ii7 → ii∅7，V7 → V7♭9（ref:omt2e-substitutions）
      if (degree(chord) === 2 && chord.quality === 'm7') {
        const sub = chordSymbol(chord.root, 'm7b5');
        out.push(sub);
        changes.push({ at: i, from: [original], to: [sub], note: 'mixture-ii' });
        continue;
      }
      if (degree(chord) === 7 && chord.quality === '7') {
        const sub = chordSymbol(chord.root, '7b9');
        out.push(sub);
        changes.push({ at: i, from: [original], to: [sub], note: 'mixture-v' });
        continue;
      }
    }
    if (technique === 'backdoor' && degree(chord) === 7 && ['7', '7b9'].includes(chord.quality) && next && degree(next) === 0) {
      // V7–I 改为 iv7–♭VII7–I（ref:wiki-backdoor）
      const iv = chordSymbol(spellAbove(key, 3, 5), 'm7');
      const bVII = chordSymbol(spellAbove(key, 6, 10), '7');
      out.push(iv, bVII);
      changes.push({ at: i, from: [original], to: [iv, bVII], note: 'backdoor' });
      continue;
    }
    if (technique === 'coltrane' && degree(chord) === 2 && chord.quality === 'm7' && next && degree(next) === 7 && next.quality === '7' && after && degree(after) === 0) {
      // ii–V–I → ii7 V7/♭VI ♭VImaj7 V7/III IIImaj7 V7 Imaj7（ref:wiki-coltrane）
      const seq = [
        chordSymbol(chord.root, 'm7'),
        chordSymbol(spellAbove(key, 2, 3), '7'),
        chordSymbol(spellAbove(key, 5, 8), 'maj7'),
        chordSymbol(spellAbove(key, 6, 11), '7'),
        chordSymbol(spellAbove(key, 2, 4), 'maj7'),
        chordSymbol(spellAbove(key, 4, 7), '7'),
        chordSymbol(after.root, 'maj7'),
      ];
      out.push(...seq);
      changes.push({ at: i, from: [original, chordSymbol(next.root, next.quality), chordSymbol(after.root, after.quality)], to: seq, note: 'coltrane' });
      i += 2;
      continue;
    }
    out.push(original);
  }
  return { chords: out, changes };
}

/** 三全音替代共享的三全音（原和弦的三音与七音互换角色） */
export function sharedTritone(root) {
  const original = chordTones(root, '7');
  const sub = chordTones(tritoneSub(root), '7');
  return { original: [original[1], original[3]], substitute: [sub[1], sub[3]] };
}

// ---------------------------------------------------------------------------
// 和弦配置（音高以 MIDI 表示，便于排列八度）
// ---------------------------------------------------------------------------

const midiOf = (name, octave) => {
  const n = parseNote(name);
  return 12 * (octave + 1) + [0, 2, 4, 5, 7, 9, 11][n.step] + n.accidental;
};

/** 四音密集排列的四个转位（自下而上），以 rootOctave 为根音所在八度 */
export function closePositions(root, quality, rootOctave = 4) {
  const names = chordTones(root, quality).slice(0, 4);
  const base = names.map((name, i) => {
    let midi = midiOf(name, rootOctave);
    if (i > 0) while (midi <= midiOf(names[0], rootOctave)) midi += 12;
    return { name, midi };
  });
  base.sort((a, b) => a.midi - b.midi);
  const inversions = [];
  let current = base;
  for (let i = 0; i < base.length; i++) {
    inversions.push(current.map((v) => ({ ...v })));
    current = [...current.slice(1), { ...current[0], midi: current[0].midi + 12 }];
  }
  return inversions;
}

/** drop 2：从上往下数第二个音降八度（ref:wiki-voicing）；drop 3：第三个音降八度（ref:guitar-chord-drop） */
export function dropVoicing(close, which) {
  const fromTop = [...close].sort((a, b) => b.midi - a.midi);
  const dropped = fromTop.map((v, i) => (i === which - 1 ? { ...v, midi: v.midi - 12 } : v));
  return dropped.sort((a, b) => a.midi - b.midi);
}

/** 3–7 骨架：低音根音，上方两个声部为三音和七音，省略五音（ref:omt2e-jazz-voicings） */
export function shellVoicings(root, quality) {
  const [r, third, , seventh] = chordTones(root, quality);
  const bass = { name: r, midi: midiOf(r, 3) };
  const lift = (name, min) => { let m = midiOf(name, 3); while (m <= min) m += 12; return { name, midi: m }; };
  const a = lift(third, bass.midi);
  const b = lift(seventh, a.midi);
  const c = lift(seventh, bass.midi);
  const d = lift(third, c.midi);
  return [[bass, a, b], [bass, c, d]];
}

/** So What 和弦：自下而上三个纯四度加一个大三度，作小十一和弦 1 4 ♭7 ♭3 5（ref:wiki-so-what） */
export function soWhatVoicing(root, octave = 3) {
  const steps = [[0, 0], [3, 5], [6, 10], [9, 15], [11, 19]];
  const rootMidi = midiOf(root, octave);
  return steps.map(([s, semis]) => ({ name: spellAbove(root, s, semis), midi: rootMidi + semis }));
}

/** 属七上的高结构三和弦（ref:wiki-upper-structure，按 C7 的表换算到任意根音） */
export const UPPER_STRUCTURES = [
  { label: 'US II', steps: 1, semis: 2, triad: 'maj', result: '13♯11' },
  { label: 'US ♭III', steps: 2, semis: 3, triad: 'maj', result: '7♯9' },
  { label: 'US ♭V', steps: 4, semis: 6, triad: 'maj', result: '7♭9♯11' },
  { label: 'US ♭VI', steps: 5, semis: 8, triad: 'maj', result: '7♯9♭13' },
  { label: 'US VI', steps: 5, semis: 9, triad: 'maj', result: '13♭9' },
  { label: 'US i', steps: 0, semis: 0, triad: 'm', result: '7♯9' },
  { label: 'US ♭ii', steps: 1, semis: 1, triad: 'm', result: '7♭9♭13' },
  { label: 'US ♭iii', steps: 2, semis: 3, triad: 'm', result: '7♯9♯11' },
];

export function upperStructure(root, item) {
  const triadRoot = spellAbove(root, item.steps, item.semis);
  const [, third, , seventh] = chordTones(root, '7');
  const left = [{ name: third, midi: midiOf(third, 3) }];
  let s = midiOf(seventh, 3);
  while (s <= left[0].midi) s += 12;
  left.push({ name: seventh, midi: s });
  let base = midiOf(triadRoot, 4);
  while (base <= s) base += 12;
  const triad = chordTones(triadRoot, item.triad).map((name, i) => {
    let m = midiOf(name, 4);
    while (m < base || (i > 0 && m <= base)) m += 12;
    return { name, midi: i === 0 ? base : m };
  });
  return { triadName: chordSymbol(triadRoot, item.triad), symbol: `${root}${item.result}`, left, triad };
}

// ---------------------------------------------------------------------------
// Bebop 语汇
// ---------------------------------------------------------------------------

/** 四种 bebop 音阶，[音级, 半音]（ref:wiki-bebop-scale） */
export const BEBOP_SCALES = {
  dominant: { added: 'between ♭7 and 1', tones: [[0, 0], [1, 2], [2, 4], [3, 5], [4, 7], [5, 9], [6, 10], [6, 11]] },
  major: { added: '♯5 between 5 and 6', tones: [[0, 0], [1, 2], [2, 4], [3, 5], [4, 7], [4, 8], [5, 9], [6, 11]] },
  melodicMinor: { added: 'between 5 and 6', tones: [[0, 0], [1, 2], [2, 3], [3, 5], [4, 7], [4, 8], [5, 9], [6, 11]] },
  harmonicMinor: { added: '♭7 between ♭6 and 7', tones: [[0, 0], [1, 2], [2, 3], [3, 5], [4, 7], [5, 8], [6, 10], [6, 11]] },
};

export function bebopScale(root, kind) {
  return BEBOP_SCALES[kind].tones.map(([steps, semis]) => ({ name: spellAbove(root, steps, semis), semis }));
}

/**
 * 从根音下行的八分音符音阶：标出落在正拍上的音。
 * bebop 音阶加入经过音的目的，是让和弦音持续落在正拍上（ref:wiki-bebop-scale）。
 */
export function bebopDescent(root, kind, chordQuality) {
  const scale = bebopScale(root, kind);
  const chordSemis = new Set(QUALITIES[chordQuality].tones.map(([, s]) => s % 12));
  const line = [{ ...scale[0], semis: 12 }, ...[...scale].reverse().slice(0, -1), scale[0]];
  return line.map((note, i) => ({ ...note, onBeat: i % 2 === 0, chordTone: chordSemis.has(note.semis % 12) }));
}

/** 半音包围：上方半音 → 下方半音 → 目标，或反过来（ref:larsen-enclosure） */
export function chromaticEnclosures(targetMidi) {
  return [
    { order: 'above-below', midis: [targetMidi + 1, targetMidi - 1, targetMidi] },
    { order: 'below-above', midis: [targetMidi - 1, targetMidi + 1, targetMidi] },
  ];
}

/** 大六度减音阶的和声化：大六和弦与减七和弦交替（ref:jgl-sixth-dim ref:wiki-bebop-scale） */
export function sixthDiminishedHarmonization(root) {
  const scale = bebopScale(root, 'major');
  const sixth = new Set([0, 4, 7, 9]);
  return scale.map((note) => ({ name: note.name, chord: sixth.has(note.semis) ? '6' : '°7' }));
}

// ---------------------------------------------------------------------------
// 曲式库：每个和弦写作 [音级, 半音, 性质]，相对主音；均为已核对原文的和弦表
// ---------------------------------------------------------------------------

const C = (steps, semis, quality) => [steps, semis, quality];
export const FORMS = [
  { id: 'blues-basic', ref: 'wiki-twelve-bar', key: 'C', bars: [[C(0, 0, 'maj')], [C(0, 0, 'maj')], [C(0, 0, 'maj')], [C(0, 0, 'maj')], [C(3, 5, 'maj')], [C(3, 5, 'maj')], [C(0, 0, 'maj')], [C(0, 0, 'maj')], [C(4, 7, 'maj')], [C(3, 5, 'maj')], [C(0, 0, 'maj')], [C(4, 7, 'maj')]] },
  { id: 'blues-quick', ref: 'wiki-twelve-bar', key: 'C', bars: [[C(0, 0, 'maj')], [C(3, 5, 'maj')], [C(0, 0, 'maj')], [C(0, 0, 'maj')], [C(3, 5, 'maj')], [C(3, 5, 'maj')], [C(0, 0, 'maj')], [C(0, 0, 'maj')], [C(4, 7, 'maj')], [C(3, 5, 'maj')], [C(0, 0, 'maj')], [C(0, 0, 'maj')]] },
  { id: 'blues-bebop', ref: 'wiki-twelve-bar', key: 'F', bars: [[C(0, 0, '7')], [C(3, 5, '7')], [C(0, 0, '7')], [C(4, 7, '7'), C(0, 0, '7')], [C(3, 5, '7')], [C(3, 6, 'dim7')], [C(0, 0, '7')], [C(5, 9, '7b9')], [C(1, 2, 'm7')], [C(4, 7, '7')], [C(0, 0, '7'), C(5, 9, '7b9')], [C(1, 2, 'm7'), C(4, 7, '7')]] },
  { id: 'blues-minor', ref: 'wiki-twelve-bar', key: 'C', bars: [[C(0, 0, 'm7')], [C(0, 0, 'm7')], [C(0, 0, 'm7')], [C(0, 0, 'm7')], [C(3, 5, 'm7')], [C(3, 5, 'm7')], [C(0, 0, 'm7')], [C(0, 0, 'm7')], [C(5, 8, '7')], [C(4, 7, '7')], [C(0, 0, 'm7')], [C(0, 0, 'm7')]] },
  { id: 'blues-bird', ref: 'wiki-blues-for-alice', key: 'F', bars: [[C(0, 0, 'maj7')], [C(6, 11, 'm7b5'), C(2, 4, '7')], [C(5, 9, 'm7'), C(1, 2, '7')], [C(4, 7, 'm7'), C(0, 0, '7')], [C(3, 5, '7')], [C(3, 5, 'm7'), C(6, 10, '7')], [C(2, 4, 'm7'), C(5, 9, '7')], [C(2, 3, 'm7'), C(5, 8, '7')], [C(1, 2, 'm7')], [C(4, 7, '7')], [C(0, 0, '7'), C(5, 9, '7')], [C(1, 2, 'm7'), C(4, 7, '7')]] },
  { id: 'rhythm-changes', ref: 'wiki-rhythm-changes', key: 'Bb', sections: ['A', 'A', 'B', 'A'], bars: (() => {
    const a1 = [[C(0, 0, 'maj7'), C(5, 9, '7')], [C(1, 2, 'm7'), C(4, 7, '7')], [C(0, 0, 'maj7'), C(5, 9, '7')], [C(1, 2, 'm7'), C(4, 7, '7')], [C(4, 7, 'm7'), C(0, 0, '7')], [C(3, 5, 'maj7'), C(6, 10, '7')], [C(2, 4, 'm7'), C(5, 9, '7')], [C(1, 2, 'm7'), C(4, 7, '7')]];
    const a2 = [...a1.slice(0, 6), [C(1, 2, 'm7'), C(4, 7, '7')], [C(0, 0, 'maj7')]];
    const b = [[C(2, 4, '7')], [C(2, 4, '7')], [C(5, 9, '7')], [C(5, 9, '7')], [C(1, 2, '7')], [C(1, 2, '7')], [C(4, 7, '7')], [C(4, 7, '7')]];
    return [...a1, ...a2, ...b, ...a2];
  })() },
];

/** 把曲式写成某个调的和弦符号 */
export function realizeForm(form, key = form.key) {
  return form.bars.map((bar) => bar.map(([steps, semis, quality]) => chordSymbol(spellAbove(key, steps, semis), quality)));
}

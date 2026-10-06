// 逐步听例与同一张卡的讲解对应；事实依据沿用题卡的 ref。
// 不从高亮部件猜音频：圈住特征音并不等于只播放那个音。
import { guideDemoEvents } from './learn_guide_audio.js?v=20261006-guide-audio1';

const ORIGINAL = 'original';
const melody = (notes, chord) => ({ play: notes.map((n) => [n]), ...(chord ? { chord } : {}) });
const chords = (...play) => ({ play });
const rhythm = (notes, beats, bpm = 100) => ({ play: notes.map((n) => n === null ? [] : [].concat(n)), beats, bpm });
const named = (zh, ja, en, demo) => ({ ...demo, caption: { zh, ja, en } });
const voice = (notes, beats = 1, start = 0) => notes.map((note, i) => ({ at: start + i * beats, notes: [note], beats }));
const poly = (...voices) => ({ bpm: 120, events: voices.flat() });
const join = (...demos) => {
  let offset = 0;
  const events = [];
  for (const demo of demos) {
    const part = guideDemoEvents(demo);
    events.push(...part.map((e) => ({ at: (offset + e.at) / 1000, notes: e.notes, beats: e.duration / 0.94, ...(e.velocity ? { velocity: e.velocity } : {}) })));
    offset += Math.max(...part.map((e) => e.at + e.duration * 1000), 0) + 600;
  }
  return { bpm: 60, events };
};
const C = [48, 52, 55], Cm = [48, 51, 55], Dm = [50, 53, 57], F = [53, 57, 60], G = [43, 59, 62];
const CM7 = [48, 52, 55, 59], Cm7 = [48, 51, 55, 58], Dm7 = [50, 53, 57, 60], G7 = [43, 53, 59, 62];
const Fm7 = [53, 56, 60, 63], Bb7 = [46, 56, 62, 65], Db7 = [49, 53, 56, 59];
const major = [60, 62, 64, 65, 67, 69, 71, 72], naturalMinor = [57, 59, 60, 62, 64, 65, 67, 69];
const harmonicMinor = [57, 59, 60, 62, 64, 65, 68, 69], melodicMinor = [57, 59, 60, 62, 64, 66, 68, 69];
const whole = [60, 62, 64, 66, 68, 70, 72], octWH = [60, 62, 63, 65, 66, 68, 69, 71, 72], octHW = [60, 61, 63, 64, 66, 67, 69, 70, 72];
const lydianDominant = [60, 62, 64, 66, 67, 69, 70, 72];
const whiteModes = {
  lydian: [53, 55, 57, 59, 60, 62, 64, 65], mixolydian: [55, 57, 59, 60, 62, 64, 65, 67],
  dorian: [50, 52, 53, 55, 57, 59, 60, 62], phrygian: [52, 53, 55, 57, 59, 60, 62, 64],
  locrian: [59, 60, 62, 64, 65, 67, 69, 71],
};
const mono = poly(voice([60, 62, 64, 65, 67, 64, 62, 60]));
const hetero = poly(voice([60, 62, 64, 65, 67, 64, 62, 60]), voice([72, 74, 74, 76, 76, 77, 77, 79, 79, 77, 76, 74, 74, 72, 72, 72], 0.5));
const homo = rhythm([[48, 64, 67, 72], [53, 65, 69, 72], [55, 62, 67, 71], [48, 64, 67, 72]], [2, 2, 2, 2], 120);
const independent = poly(voice([72, 74, 76, 72, 71, 72, 74, 72]), voice([48, 55, 52, 53], 2, 0.5));
const upperPair = named('单声部 → 支声', 'モノフォニー → ヘテロフォニー', 'Monophony → heterophony', join(mono, hetero));
const lowerPair = named('主调 → 复调', 'ホモフォニー → ポリフォニー', 'Homophony → polyphony', join(homo, independent));
const pac = chords([43, 59, 62, 67], [48, 55, 64, 72]);
const iac = chords([43, 59, 62, 67], [48, 55, 60, 64]);
const backdoor = chords(Fm7, Bb7, CM7);
const augSix = chords([44, 60, 66], [44, 60, 62, 66], [44, 60, 63, 66], G);
const thirds = chords([60, 64], [60, 63]);
const pure = (ratio) => 60 + 12 * Math.log2(ratio);
const harmonicSeries = melody([1, 2, 3, 4, 5, 6].map((r) => 36 + 12 * Math.log2(r)));

// 每项依次对应 steps；original 表示经检查仍适合该步骤的原例，null 表示该步没有听例。
export const STEP_DEMOS = {
  'keys#0': [ORIGINAL, melody([60, 61]), melody([60, 62])],
  'staff#0': [melody([67, 69, 81]), melody([67, 53]), melody([81]), melody([60])],
  'staff:4#0': [melody([59, 60]), ORIGINAL, ORIGINAL],
  'rhythm#0': [rhythm([60, 64], [1, 2]), rhythm([60, 60, 60, 60, 60], [4, 2, 1, 0.5, 0.25], 150), rhythm(Array(15).fill(60), [4, 2, 2, 1, 1, 1, 1, ...Array(8).fill(0.5)], 150), named('附点二分（3拍）→ 连音线合并的两个二分（4拍）', '付点2分（3拍）→ タイで結んだ2分2つ（4拍）', 'Dotted half (3 beats) → tied halves (4 beats)', rhythm([60, null, 60], [3, 1, 4]))],
  'intervals#0': [melody([60, 61, 62, 63, 64]), melody([60, 62, 64]), chords([60, 64])],
  'intervalqual#0': [thirds, chords([60, 67], [60, 64], [60, 63]), chords([60, 67], [60, 68], [60, 64], [60, 63], [60, 62], [60, 74]), ORIGINAL],
  'intervalqual:3#0': [melody([60, 62]), join(melody([60, 62]), melody([60, 74]))],
  'major#0': [ORIGINAL, ORIGINAL, named('G 大调（F♯）→ F 大调（B♭）', 'ト長調（F♯）→ ヘ長調（B♭）', 'G major (F♯) → F major (B♭)', join(melody([55, 57, 59, 60, 62, 64, 66, 67]), melody([53, 55, 57, 58, 60, 62, 64, 65])))],
  'major:1#0': [melody(major), ORIGINAL],
  'minor#0': [named('A 大调 → A 小调', 'イ長調 → イ短調', 'A major → A minor', chords([57, 61, 64], [57, 60, 64])), melody(naturalMinor), named('和声小调 → 旋律小调上行、下行', '和声的短音階 → 旋律的短音階の上行・下行', 'Harmonic minor → melodic minor up and down', join(melody(harmonicMinor), melody([...melodicMinor, ...naturalMinor.slice().reverse().slice(1)]))), named('关系调 C–Am → 同主音调 C–Cm', '平行調 C–Am → 同主調 C–Cm', 'Relative C–Am → parallel C–Cm', chords(C, [45, 48, 52], C, Cm))],
  'minor:1#0': [join(melody(naturalMinor), melody(harmonicMinor), melody([...melodicMinor, ...naturalMinor.slice().reverse().slice(1)])), ORIGINAL],
  'minor:4#0': [chords([57, 60, 64], [59, 62, 65], C, Dm, [52, 55, 59], F, G), chords([57, 60, 64], [59, 62, 65], [52, 56, 59], [57, 60, 64])],
  'modes#0': [ORIGINAL,
    named('F Lydian → C Ionian → G Mixolydian', 'F Lydian → C Ionian → G Mixolydian', 'F Lydian → C Ionian → G Mixolydian', join(melody(whiteModes.lydian), melody(major), melody(whiteModes.mixolydian))),
    named('D Dorian → A Aeolian → E Phrygian → B Locrian', 'D Dorian → A Aeolian → E Phrygian → B Locrian', 'D Dorian → A Aeolian → E Phrygian → B Locrian', join(...[whiteModes.dorian, naturalMinor, whiteModes.phrygian, whiteModes.locrian].map((s) => melody(s)))),
    named('F Lydian → B Locrian', 'F Lydian → B Locrian', 'F Lydian → B Locrian', join(melody(whiteModes.lydian), melody(whiteModes.locrian))),
  ],
  'modes:2#0': [thirds, ORIGINAL],
  'modes:4#0': [chords(CM7, [48, 52, 55, 58], Cm7, [48, 51, 54, 58]), ORIGINAL],
  'pentatonic#0': [ORIGINAL, ORIGINAL, melody([64, 67, 69])],
  'pentatonic:1#0': [join(...[60, 62, 64, 67, 69].map((_, i) => melody([60, 62, 64, 67, 69, 72, 74, 76, 79, 81].slice(i, i + 6)))), ORIGINAL],
  'pentatonic:2#0': [ORIGINAL, melody([60, 62, 64, 67, 69, 72])],
  'texture#0': [named('单声部 → 支声 → 主调 → 复调', 'モノ → ヘテロ → ホモ → ポリ', 'Monophony → heterophony → homophony → polyphony', join(mono, hetero, homo, independent)), upperPair, lowerPair, named('单声部 → 主调 → 复调', 'モノ → ホモ → ポリ', 'Monophony → homophony → polyphony', join(mono, homo, independent))],
  'triads#0': [chords([60, 64, 67]), ORIGINAL, ORIGINAL],
  'triads:3#0': [ORIGINAL, chords(C, Cm, [52, 55, 60])],
  'triads:4#0': [chords([51, 55, 59], [55, 59, 63]), chords([60, 64, 68], [59, 62, 65, 68])],
  'sevenths#0': [chords([55, 59, 62], [55, 59, 62, 65]), chords([60, 64, 67, 71], [60, 64, 67, 70], [60, 63, 67, 70], [60, 63, 66, 70], [60, 63, 66, 69]), ORIGINAL],
  'inversions#0': [melody([48, 52, 55]), ORIGINAL, chords([52, 55, 60]), chords([52, 55, 60], [55, 60, 64])],
  'inversions:2#0': [ORIGINAL, ORIGINAL],
  'symbols:3#0': [melody([60, 64, 67, 70, 74, 77, 81]), ORIGINAL],
  'chordplus#0': [chords([60, 65, 67], [60, 62, 67]), chords([60, 64, 67, 74]), chords([60, 64, 67, 69]), ORIGINAL],
  'chordplus:1#0': [ORIGINAL, chords([55, 60, 67])],
  'chordplus:2#0': [chords([60, 64, 67, 74], [60, 64, 67, 77], [60, 64, 67, 69]), ORIGINAL],
  'roman#0': [chords(C, Dm), chords(C, Dm, [47, 50, 53], [48, 52, 56]), ORIGINAL, chords([57, 60, 64], [59, 62, 65], C, Dm, [52, 55, 59], F, G)],
  'voicing#0': [ORIGINAL, chords([60, 64, 67], [48, 55, 64]), chords([48, 55, 64], [48, 55, 64, 67]), chords([48, 55, 64, 72])],
  'voicing:4#0': [ORIGINAL, ORIGINAL],
  'cadences#0': [pac, pac, chords(C, G), named('变格 IV–I → 阻碍 V–vi', '変格 IV–I → 偽終止 V–vi', 'Plagal IV–I → deceptive V–vi', join(chords(F, C), chords(G, [45, 60, 64, 69])))],
  'cadences:1#0': [pac, iac],
  'cadences:2#0': [chords(C, G), ORIGINAL],
  'sixfour#0': [chords([43, 60, 64]), ORIGINAL, chords([43, 60, 64], G), named('经过 → 辅助 → 琶音四六', '経過 → 補助 → 分散の四六', 'Passing → neighbouring → arpeggiated six-four', join(chords([48, 55, 64], [50, 55, 65], [52, 55, 60]), chords(C, [48, 53, 57], C), chords(C, [52, 55, 60], [55, 60, 64])))],
  'sixfour:1#0': [chords([53, 57, 62, 74], [43, 60, 64, 72]), chords([53, 57, 62, 74], [43, 60, 64, 72], [43, 59, 62, 71], [48, 55, 64, 72])],
  'sixfour:3#0': [ORIGINAL, chords(C, [52, 55, 60], [55, 60, 64])],
  'tonicization#0': [ORIGINAL, ORIGINAL, melody([65, 66, 67]), chords(C, [45, 48, 52], [50, 54, 57], G)],
  'tonicization:1#0': [ORIGINAL, chords(Dm, [50, 54, 57], G)],
  'chromatic#0': [chords(C, [44, 48, 51]), ORIGINAL, augSix, chords(C, [48, 51, 54, 57], C)],
  'chromatic:1#0': [ORIGINAL, chords(Cm, C)],
  'neoriemann#0': [chords([60, 64, 67], [60, 63, 67]), ORIGINAL, ORIGINAL, chords([60, 64, 67], [61, 64, 68], [60, 65, 68], [59, 63, 68])],
  'neoriemann:1#0': [chords([60, 64, 67], [61, 64, 68]), ORIGINAL],
  'neoriemann:2#0': [ORIGINAL, melody([60, 63, 64, 67, 68, 71, 72])],
  'neoriemann:4#0': [ORIGINAL, chords([48, 51, 54, 57], [47, 51, 54, 57])],
  'fretboard#0': [ORIGINAL, melody([55, 59]), chords([48, 52, 55, 60, 64], [45, 52, 57, 61, 64], [43, 47, 50, 55, 59, 67], [40, 47, 52, 56, 59, 64], [50, 57, 62, 66])],
  'nonchord:1#0': [melody([60, 62, 64]), melody([64, 65, 64])],
  'nonchord:2#0': [ORIGINAL, join(melody([60, 65, 64]), melody([64, 65, 60]))],
  'nctmore#0': [ORIGINAL, join(melody([60, 65, 64]), melody([64, 65, 60])), ORIGINAL, join(poly([{ at: 0, notes: [48, 64], beats: 2 }, { at: 1.5, notes: [71], beats: 0.5 }, { at: 2, notes: [43, 62, 71], beats: 2 }]), chords([48, 64, 67], [48, 65, 69], [48, 67, 71], [48, 64, 67]))],
  'nctmore:2#0': [poly([{ at: 0, notes: [48, 64], beats: 2 }, { at: 1.5, notes: [71], beats: 0.5 }, { at: 2, notes: [43, 62, 71], beats: 2 }]), named('持续低音 → 上行延留', '保続低音 → 上行掛留', 'Pedal tone → upward suspension', join(chords([48, 64, 67], [48, 65, 69], [48, 67, 71], [48, 64, 67]), chords([48, 64, 71], [48, 64, 72])))],
  'swing:2#0': [named('摇摆八分：前长后短', 'スウィング：長・短', 'Swing eighths: long–short', rhythm([60, 67, 60, 67, 60, 67], [2 / 3, 1 / 3, 2 / 3, 1 / 3, 2 / 3, 1 / 3])), { bpm: 100, events: [0, 1, 2, 3].map((at) => ({ at, notes: [60], beats: 0.8, velocity: at % 2 ? 1 : 0.45 })) }],
  'blues#0': [ORIGINAL, chords(C, C, C, C, F, F, C, C, G, F, C, G)],
  'bluesscale#0': [ORIGINAL, melody([60, 62, 63, 64, 67, 69, 72]), null, chords([48, 52, 55, 58], [53, 57, 60, 63], G7, [48, 52, 55, 58])],
  'bluesscale:2#0': [ORIGINAL, melody([57, 60, 62, 63, 64, 67, 69])],
  'jazz:1#0': [join(chords(Dm7, G7, CM7), chords([50, 53, 56, 60], G7, Cm7)), ORIGINAL],
  'jazz:3#0': [ORIGINAL, chords([50, 53, 56, 60], [43, 53, 59, 68], CM7)],
  'guidetone#0': [ORIGINAL, ORIGINAL, null],
  'jazzvoicing#0': [chords([48, 52, 58], [48, 58, 64]), chords([60, 64, 67, 71], [55, 60, 64, 71], [52, 60, 67, 71]), chords([52, 57, 62, 67, 71]), chords([52, 58, 62, 66, 69])],
  'chordscale#0': [join(melody([50, 53, 57, 60, 64, 67, 71]), melody([50, 52, 53, 55, 57, 59, 60, 62])), join(melody([62, 64, 65, 67, 69, 71, 72, 74], Dm7), melody([55, 57, 59, 60, 62, 64, 65, 67], G7), melody(major, CM7)), join(melody([62, 64, 65, 67, 69, 71, 72, 74]), melody([64, 65, 67, 69, 71, 72, 74, 76]), melody([57, 59, 60, 62, 64, 65, 67, 69])), rhythm([62, 64, 65, 67, 69, 71, 72, 74], Array(8).fill(0.5))],
  'melodicminor#0': [ORIGINAL, null, chords([48, 51, 55, 59]), melody([55, 56, 58, 59, 61, 63, 65, 67], [43, 53, 59, 63])],
  'melodicminor:2#0': [ORIGINAL, melody([60, 62, 64, 65, 67, 68, 70, 72], [48, 52, 55, 58])],
  'melodicminor:3#0': [ORIGINAL, melody([60, 62, 63, 65, 66, 68, 70, 72], [48, 51, 54, 58])],
  'harmonicminor#0': [ORIGINAL, melody([52, 53, 56, 57, 59, 60, 62, 64], [40, 50, 56, 60]), null, melody([60, 62, 64, 65, 67, 68, 71, 72])],
  'harmonicminor:2#0': [ORIGINAL, melody([60, 62, 63, 66, 67, 69, 70, 72], Cm7)],
  'harmonicminor:3#0': [ORIGINAL, join(melody([62, 64, 65, 67, 68, 71, 72, 74]), melody([64, 65, 67, 68, 71, 72, 74, 76]))],
  'symmetric#0': [ORIGINAL, chords([60, 64, 68], [62, 66, 70]), melody(octWH), named('先全后半 → 先半后全', '全・半 → 半・全', 'Whole–half → half–whole', join(melody(octWH, [48, 51, 54, 57]), melody(octHW, [48, 52, 55, 58])))],
  'symmetric:2#0': [ORIGINAL, melody(octHW, [48, 52, 55, 58])],
  'morescales#0': [join(melody([60, 61, 63, 65, 67, 68, 71, 72]), melody([60, 61, 63, 65, 67, 69, 71, 72])), ORIGINAL, rhythm([72, 71, 70, 69, 67, 65, 64, 62, 60], Array(9).fill(0.5))],
  'morescales:1#0': [named('那不勒斯小调 → 那不勒斯大调', 'ナポリ短音階 → ナポリ長音階', 'Neapolitan minor → Neapolitan major', join(melody([60, 61, 63, 65, 67, 68, 71, 72], [48, 51, 55, 59]), melody([60, 61, 63, 65, 67, 69, 71, 72], [48, 51, 55, 59]))), chords([60, 63, 68], [60, 63, 69])],
  'morescales:3#0': [ORIGINAL, rhythm([72, 71, 70, 69, 67, 65, 64, 62, 60], Array(9).fill(0.5))],
  'substitutions#0': [join(chords(Dm7, G7, CM7), chords([50, 53, 56, 60], G7, Cm7)), ORIGINAL, chords(CM7, [45, 49, 52, 55], Dm7, G7), named('后门 → Coltrane 进行', '裏口 → コルトレーン進行', 'Backdoor → Coltrane changes', join(backdoor, chords(Dm7, [51, 55, 58, 61], [44, 48, 51, 55], [47, 51, 54, 57], [40, 44, 47, 51], G7, CM7)))],
  'substitutions:2#0': [ORIGINAL, chords([50, 53, 56, 60], [43, 53, 59, 68], CM7)],
  'color#0': [chords([48, 52, 58, 61, 63]), chords([48, 52, 58, 61, 63], [48, 52, 58, 66, 68]), chords([48, 58, 62, 66])],
  'color:1#0': [ORIGINAL, chords([43, 53, 59, 61], [43, 53, 59, 63], [43, 53, 59, 68])],
  'negharmony#0': [ORIGINAL, ORIGINAL, null],
  'lcc#0': [null, ORIGINAL, named('Lydian 音阶 → 属—主', 'リディアン音階 → 属・主', 'Lydian scale → dominant–tonic', join(melody([60, 62, 64, 66, 67, 69, 71, 72]), pac)), null],
  'heptatonic#0': [melody([65, 66, 70, 71]), named('清乐 → 燕乐 → 雅乐', '清楽 → 燕楽 → 雅楽', 'Qingyue → yanyue → yayue', join(melody(major), melody([60, 62, 64, 65, 67, 69, 70, 72]), melody([60, 62, 64, 66, 67, 69, 71, 72]))), melody([60, 62, 64, 67, 69]), null],
  'thaat#0': [null, null, ORIGINAL, ORIGINAL],
  'world:1#0': [melody([60, 62, 63.5, 65, 67]), named('Rast → Bayati → Hijaz → Nahawand → Kurd', 'Rast → Bayati → Hijaz → Nahawand → Kurd', 'Rast → Bayati → Hijaz → Nahawand → Kurd', join(...[[60, 62, 63.5, 65, 67], [60, 61.5, 63, 65], [60, 61, 64, 65], [60, 62, 63, 65, 67], [60, 61, 63, 65]].map((s) => melody(s))))],
  'world:2#0': [ORIGINAL, join(melody([60, 61.5, 63, 65, 67, 68, 70, 72]), melody([60, 61, 64, 65, 67, 68, 70, 72]))],
  'harmonics#0': [harmonicSeries, chords([36, 48, 36 + 12 * Math.log2(3), 60, 36 + 12 * Math.log2(5)]), harmonicSeries, chords([60, pure(3 / 2)], [60, pure(5 / 4)])],
  'harmonics:1#0': [harmonicSeries],
  'collections#0': [join(melody([60, 62, 64, 67, 69, 72]), melody(whole), melody(octWH)), ORIGINAL, melody(lydianDominant), join(melody(whole), melody(octWH))],
  'collections:3#0': [melody(lydianDominant), ORIGINAL],
  'micro:1#0': [ORIGINAL, named('5 → 19 → 31 → 53 平均律的五个台阶', '5 → 19 → 31 → 53平均律の5段', 'Five steps in 5 → 19 → 31 → 53 EDO', join(...[5, 19, 31, 53].map((edo) => melody(Array.from({ length: 6 }, (_, i) => 60 + i * 12 / edo)))))],
  'micro:2#0': [chords([60, 70], [60, pure(7 / 4)]), chords([48, 52, 55, 58], [48, 48 + 12 * Math.log2(5 / 4), 48 + 12 * Math.log2(3 / 2), 48 + 12 * Math.log2(7 / 4)])],
  'micro:3#0': [chords([60, 63.5], [60, pure(11 / 9)]), chords([60, pure(5 / 4)], [60, pure(11 / 9)], [60, pure(6 / 5)])],
  'microharmony#0': [chords([60, 63], [60, 63.5], [60, 64]), ORIGINAL, chords([60, pure(3 / 2)], [60, pure(5 / 4)], [60, pure(7 / 4)], [60, pure(11 / 9)])],
  'microharmony:3#0': [ORIGINAL, melody([48 + 12 * Math.log2(7), 48 + 12 * Math.log2(11)])],
  'modes2:1#0': [chords([44, 56, 60, 63], [46, 58, 62, 65]), named('shuttle → cadence', 'shuttle → cadence', 'Shuttle → cadence', join(chords(Cm, [46, 50, 53], [44, 48, 51], [46, 50, 53]), chords([44, 48, 51], [46, 50, 53], Cm)))],
  'cadences2#0': [null, chords([53, 62, 69, 74], [52, 59, 68, 76]), chords([50, 57, 62, 65], [52, 59, 68, 76], [45, 57, 61, 64]), null],
  'cadences2:1#0': [chords([53, 62, 69, 74]), ORIGINAL, ORIGINAL],
  'cadences2:2#0': [ORIGINAL, ORIGINAL, null],
  'cadences2:3#0': [ORIGINAL, ORIGINAL, chords([45, 57, 60, 64], [50, 58, 62, 65], [52, 56, 62, 64], [45, 57, 60, 64])],
  'cadences2:4#0': [ORIGINAL, chords(Dm7, G7), chords(CM7, [45, 55, 60, 64], Dm7, G7, CM7), chords(CM7, [49, 52, 55, 58], Dm7)],
  'voiceleading:2#0': [ORIGINAL, named('声部交叉 → 声部超越', '声部交差 → 声部超越', 'Voice crossing → overlap', join(poly(voice([64, 59]), voice([60, 62])), poly(voice([64, 60]), voice([60, 57]))))],
  'voiceleading:3#0': [chords([43, 55, 62, 71], [48, 55, 64, 72]), chords([43, 59, 62, 67], [48, 55, 64, 72])],
  'schemas:1#0': [ORIGINAL, chords([48, 55, 64], [45, 57, 64], [50, 57, 65], [43, 55, 62])],
  'schemas:3#0': [chords([41, 57, 65], [43, 55, 62], [45, 57, 64], [48, 55, 64]), named('V–I → IV–I → vi–I', 'V–I → IV–I → vi–I', 'V–I → IV–I → vi–I', join(chords(G, C), chords(F, C), chords([45, 57, 64], C)))],
  'schemas:4#0': [ORIGINAL, chords(C, G, [45, 48, 52], [40, 47, 55], F, C, F, G)],
  'schemas2:1#0': [chords(Cm, [46, 50, 53], [44, 48, 51]), ORIGINAL],
  'schemas2:3#0': [ORIGINAL, chords(CM7, [51, 55, 58, 61], Dm7, Db7)],
  'schemas2:4#0': [ORIGINAL, chords([48, 55, 60, 63], [48, 55, 59, 63], [48, 55, 58, 63], [48, 55, 57, 63])],
  'motif#0': [ORIGINAL, join(melody([64, 67, 64, 60]), melody([66, 69, 66, 62]))],
  'motif:1#0': [melody([60, 62, 64]), ORIGINAL],
  'motif:2#0': [named('原形 → 倒影', '原形 → 反行', 'Original → inversion', join(melody([60, 62, 64]), melody([60, 59, 57]))), named('原形 → 逆行', '原形 → 逆行', 'Original → retrograde', join(melody([60, 62, 64]), melody([64, 62, 60])))],
  'motif:3#0': [named('原形 → 扩大 → 紧缩', '原形 → 拡大 → 縮小', 'Original → augmentation → diminution', join(rhythm([64, 67, 64, 67], [1, 1, 1, 1]), rhythm([64, 67, 64, 67], [2, 2, 2, 2]), rhythm([64, 67, 64, 67], [0.5, 0.5, 0.5, 0.5]))), named('晚半拍进入 → 附点长短', '半拍遅く → 付点の長短', 'Half-beat displacement → dotted rhythm', join(poly(voice([64, 67, 64, 67], 1, 0.5)), rhythm([64, 67, 64, 67], [1.5, 0.5, 1.5, 0.5])))],
  'motif:4#0': [rhythm([64, 62, 60], [1, 0.5, 0.5]), melody([64, 60])],
  'modulation2:2#0': [chords(C, [44, 48, 51]), chords(C, [44, 48, 51], C, [51, 55, 58], C, [45, 49, 52], C, [40, 44, 47])],
  'canon#0': [named('导句先入 → 答句晚两拍加入', '先行声部 → 2拍後に応答', 'Leader → follower enters two beats later', poly(voice([72, 74, 76, 72]), voice([60, 62, 64, 60], 1, 2))), named('同一旋律相隔四拍轮唱', '同じ旋律を4拍ずらして輪唱', 'The same melody in a round, four beats apart', poly(voice([72, 74, 76, 72, 76, 77, 79, 79]), voice([60, 62, 64, 60, 64, 65, 67, 67], 1, 4)))],
  'blues2#0': [ORIGINAL, chords(...[0, 0, 0, 0, 1, 1, 0, 0, 2, 1, 0, 0].map((i) => [[48, 52, 55, 58], [53, 57, 60, 63], G7][i]))],
  'blues2:2#0': [chords(Cm7, Fm7, G7), chords([50, 53, 56, 60], G7, Cm7)],
  'turnarounds:1#0': [ORIGINAL, chords([50, 54, 57, 60], G7, CM7)],
  'turnarounds:3#0': [chords([50, 53, 57], [49, 53, 56], C), chords(CM7, [51, 55, 58], [44, 48, 51], Db7)],
};

// 这些卡片各步骤都在解释同一个例子，经逐卡检查无需换曲；仍走步骤切换/停止逻辑。
export const SHARED_DEMO_CARDS = new Set([
  'triads:2#0', 'sevenths:2#0', 'chordplus:3#0', 'cadences:3#0', 'functions#0',
  'sixfour:2#0', 'tonicization:2#0', 'chromatic:2#0', 'chromatic:3#0', 'chromatic:4#0',
  'nonchord#0', 'nctmore:1#0', 'nctmore:3#0', 'counterpoint#0', 'bluesscale:1#0', 'jazz#0', 'jazz:2#0',
  'guidetone:2#0', 'jazzvoicing:1#0', 'jazzvoicing:3#0', 'jazzvoicing:4#0', 'symmetric:1#0', 'morescales:2#0',
  'substitutions:3#0', 'color:2#0', 'color:3#0', 'negharmony:2#0', 'heptatonic:2#0', 'harmonics:4#0',
  'collections:1#0', 'microharmony:1#0', 'dictation:2#0', 'dictation:3#0', 'dictation:4#0',
  'modes2#0', 'modes2:2#0', 'modes2:3#0', 'pentaharm:2#0', 'pentaharm:3#0', 'pentaharm:4#0',
  'voiceleading:1#0', 'voiceleading:4#0', 'schemas:2#0', 'schemas2#0', 'turnarounds#0',
]);

export function withStepDemos(card, key) {
  if (card.type !== 'guide' || !card.demo?.play) return card;
  const demos = STEP_DEMOS[key] || (SHARED_DEMO_CARDS.has(key) ? card.steps.map(() => ORIGINAL) : null);
  if (!demos) throw new Error(`Missing guide audio steps: ${key}`);
  return { ...card, stepDemos: demos.map((demo) => demo === ORIGINAL ? card.demo : demo) };
}

export function guideDemoForStep(card, index) {
  return card.stepDemos ? card.stepDemos[index] ?? null : card.demo;
}

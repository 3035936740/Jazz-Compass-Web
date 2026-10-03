// 指板与 CAGED 系统
// 依据：
//   ref:wiki-standard-tuning 维基百科「Standard tuning」：六弦吉他 E2 A2 D3 G3 B3 E4（相邻纯四度，G–B 为大三度）；
//                            四弦贝斯 E1 A1 D2 G2；曼陀林 G3 D4 A4 E5；尤克里里（高音）G4 C4 E4 A4
//   ref:agt-caged            Applied Guitar Theory「CAGED System for Guitar」：五个开放和弦形（C、A、G、E、D）及各音的音程标注（记谱图逐格转录）；
//                            每个形可整体平移（用横按代替琴枕）；形与形按 C→A→G→E→D→C 的顺序沿指板相接；
//                            例：C 形上移 2 品为 D，E 形在第 2 品为 F#，D 形上移 3 品为 F
// 吉他按实际发音标注音高；乐谱上吉他比实音高八度记谱（见 instruments.js 的 ref:wiki-transposing）。
import { parsePitch, parseNote, spellAbove } from './pitch_spelling.js';

export const TUNINGS = {
  guitar: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  bass: ['E1', 'A1', 'D2', 'G2'],
  mandolin: ['G3', 'D4', 'A4', 'E5'],
  ukulele: ['G4', 'C4', 'E4', 'A4'],
};

/** 第 string 根弦（0 = 最低音弦，与 TUNINGS 的顺序一致）第 fret 品的 MIDI 音高 */
export const midiAt = (tuning, string, fret) => parsePitch(TUNINGS[tuning][string]).midi + fret;

/** 指板上所有属于给定音级集合的位置 */
export function positionsOf(tuning, pitchClasses, maxFret = 15) {
  const wanted = new Set(pitchClasses.map((pc) => ((pc % 12) + 12) % 12));
  const result = [];
  TUNINGS[tuning].forEach((_, string) => {
    for (let fret = 0; fret <= maxFret; fret += 1) {
      const midi = midiAt(tuning, string, fret);
      if (wanted.has(midi % 12)) result.push({ string, fret, midi });
    }
  });
  return result;
}

/**
 * 五个开放和弦形：frets 为六根弦（低 E → 高 E）的品位，null 为不弹；labels 为音程（R 根音、3 大三度、5 纯五度）。
 * 按 Applied Guitar Theory 的开放和弦图转录。ref:agt-caged
 */
export const CAGED_SHAPES = {
  C: { root: 'C', frets: [null, 3, 2, 0, 1, 0], labels: [null, 'R', '3', '5', 'R', '3'] },
  A: { root: 'A', frets: [null, 0, 2, 2, 2, 0], labels: [null, 'R', '5', 'R', '3', '5'] },
  G: { root: 'G', frets: [3, 2, 0, 0, 3, 3], labels: ['R', '3', '5', 'R', '5', 'R'] },
  E: { root: 'E', frets: [0, 2, 2, 1, 0, 0], labels: ['R', '5', 'R', '3', '5', 'R'] },
  D: { root: 'D', frets: [null, null, 0, 2, 3, 2], labels: [null, null, 'R', '5', 'R', '3'] },
};
export const CAGED_ORDER = ['C', 'A', 'G', 'E', 'D'];

/** 把某个形平移到给定根音：返回平移的品数与各弦位置（含 MIDI） */
export function cagedVoicing(rootName, shapeId, octaveShift = 0) {
  const shape = CAGED_SHAPES[shapeId];
  const shift = ((parseNote(rootName).pc - parseNote(shape.root).pc + 12) % 12) + 12 * octaveShift;
  const notes = shape.frets.map((fret, string) => (fret === null ? null : {
    string, fret: fret + shift, label: shape.labels[string], midi: midiAt('guitar', string, fret + shift),
  })).filter(Boolean);
  return { shape: shapeId, shift, notes };
}

/** 某个大三和弦的五个 CAGED 把位，按在指板上的位置由低到高排列 */
export function cagedPositions(rootName) {
  return CAGED_ORDER.map((id) => cagedVoicing(rootName, id)).sort((a, b) => a.shift - b.shift || CAGED_ORDER.indexOf(a.shape) - CAGED_ORDER.indexOf(b.shape));
}

/** 大三和弦三个音的拼写 */
export const majorTriad = (rootName) => [rootName, spellAbove(rootName, 2, 4), spellAbove(rootName, 4, 7)];

export const LABEL_TO_INDEX = { R: 0, 3: 1, 5: 2 };

// 五线谱读谱的核心逻辑：四种谱号、线/间位置 ↔ 音高、口诀
// 五线谱有五条线，音写在对应的线或间上；超出范围用加线：ref:omt2e-notation
// 高音谱号绕第二线 G、低音谱号的点从第四线 F 开始、中音谱号以第三线为中心、次中音谱号以第四线为中心；各谱号的口诀：ref:omt2e-clefs
// 具体音高：高音谱号第二线 = G4，低音谱号第四线 = F3，中音 / 次中音谱号把中央 C 放在第三 / 第四线：ref:wiki-clef
// 大谱表 = 高音谱表在上、低音谱表在下，用竖线和花括号连起来，中央 C 在两行之间的线上：ref:omt2e-keyboard
// 中央 C = C4，每个八度从 C 开始编号：ref:omt2e-aspn

export const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const LETTER_PC = [0, 2, 4, 5, 7, 9, 11];

/** 音名（字母 + 八度）的"全音阶序号"：C0 = 0，D0 = 1……C4 = 28 */
export const diatonicIndex = (letter, octave) => octave * 7 + LETTERS.indexOf(letter);
export const fromDiatonic = (index) => ({ letter: LETTERS[((index % 7) + 7) % 7], octave: Math.floor(index / 7) });

/**
 * 谱号：line = 谱号标出的那条线（从下往上 1–5），pitch = 那条线的音；bottom = 第一线（最下面那条线）的全音阶序号
 * glyph 为 Unicode 音乐符号（C 谱号由界面自己画）
 */
export const CLEFS = {
  treble: { line: 2, pitch: 'G4', letter: 'G', glyph: '\u{1D11E}' },
  bass: { line: 4, pitch: 'F3', letter: 'F', glyph: '\u{1D122}' },
  alto: { line: 3, pitch: 'C4', letter: 'C', glyph: null },
  tenor: { line: 4, pitch: 'C4', letter: 'C', glyph: null },
};
export const CLEF_ORDER = ['treble', 'bass', 'alto', 'tenor'];

for (const clef of Object.values(CLEFS)) {
  const letter = clef.pitch[0];
  const octave = Number(clef.pitch.slice(1));
  clef.bottom = diatonicIndex(letter, octave) - (clef.line - 1) * 2;
}

/** 位置：0 = 第一线，1 = 第一间，2 = 第二线……8 = 第五线；负数在下方、大于 8 在上方（要加线） */
export function positionToPitch(clefId, position) {
  const { letter, octave } = fromDiatonic(CLEFS[clefId].bottom + position);
  return { letter, octave, name: `${letter}${octave}` };
}

export function pitchToPosition(clefId, letter, octave) {
  return diatonicIndex(letter, octave) - CLEFS[clefId].bottom;
}

/** 位置在线上还是间里；第几线 / 第几间（从下往上，1 起） */
export function describePosition(position) {
  const onLine = position % 2 === 0;
  if (position >= 0 && position <= 8) return { onLine, number: onLine ? position / 2 + 1 : (position + 1) / 2, ledgers: 0 };
  // 加线：第一线下方的线在 -2、-4……，第五线上方在 10、12……
  const ledgers = position < 0 ? Math.floor(-position / 2) : Math.floor((position - 8) / 2);
  return { onLine, number: null, ledgers, below: position < 0 };
}

/** 位置需要的加线（返回加线所在的位置列表） */
export function ledgerPositions(position) {
  const list = [];
  for (let p = -2; p >= position; p -= 2) list.push(p);
  for (let p = 10; p <= position; p += 2) list.push(p);
  return list;
}

/** MIDI 音高（升降号 accidental：-2..2） */
export function pitchMidi(letter, octave, accidental = 0) {
  return 12 * (octave + 1) + LETTER_PC[LETTERS.indexOf(letter)] + accidental;
}

/** 把 MIDI 音拼成音名：prefer = 'sharp' | 'flat' */
export function spellMidi(midi, prefer = 'sharp') {
  const pc = ((midi % 12) + 12) % 12;
  const octaveOf = (letter, accidental) => (midi - LETTER_PC[LETTERS.indexOf(letter)] - accidental) / 12 - 1;
  const natural = LETTER_PC.indexOf(pc);
  if (natural >= 0) return { letter: LETTERS[natural], accidental: 0, octave: octaveOf(LETTERS[natural], 0) };
  if (prefer === 'flat') {
    const letter = LETTERS[LETTER_PC.indexOf(pc + 1)];
    return { letter, accidental: -1, octave: octaveOf(letter, -1) };
  }
  const letter = LETTERS[LETTER_PC.indexOf(pc - 1)];
  return { letter, accidental: 1, octave: octaveOf(letter, 1) };
}

export const accidentalSign = (accidental) => (accidental > 0 ? '♯'.repeat(accidental) : accidental < 0 ? '♭'.repeat(-accidental) : '');
export const pitchLabel = ({ letter, accidental = 0, octave }) => `${letter}${accidentalSign(accidental)}${octave}`;

/** 线上、间里的音名（从下往上） */
export function lineLetters(clefId) {
  return [0, 2, 4, 6, 8].map((p) => positionToPitch(clefId, p).letter);
}
export function spaceLetters(clefId) {
  return [1, 3, 5, 7].map((p) => positionToPitch(clefId, p).letter);
}

/** OMT 1.3 给出的口诀（英文原文；线、间各一句） */
export const MNEMONICS = {
  treble: { lines: 'Every Good Bird Does Fly', spaces: 'FACE' },
  bass: { lines: "Good Bikes Don't Fall Apart", spaces: 'All Cows Eat Grass' },
  alto: { lines: 'Fat Alley Cats Eat Garbage', spaces: 'Grand Boats Drift Flamboyantly' },
  tenor: { lines: 'Dodges, Fords, and Chevrolets Everywhere', spaces: "Elvis's Guitar Broke Down" },
};

// ======================= 记谱：调号、拍号、时值、临时记号 =======================
// 调号：升号顺序 F C G D A E B，降号顺序相反；写在谱号之后、拍号之前；对所有八度都有效。
//   升号之字形（一下一上）中间有一次"折返"，次中音谱号没有折返，F♯、G♯ 写在低八度；降号在所有谱号里都是标准之字形：ref:omt2e-major-scales
//   调号写在每一行开头；低音谱号第五个升号 A♯ 通常写在最下面的间、第七个降号 F♭ 写在谱表下方的间：ref:wiki-key-signature
// 临时记号作用到本小节结束（同一位置的后续音），连音线连过小节线时继续有效：ref:wiki-accidental
// 附点让时值增加一半（再加附点再加前一个的一半）；连音线连接同音高的音，后一个不重新奏出；全休止符挂在线下、二分休止符坐在线上：ref:omt2e-rhythm
// 拍号：单拍子与复拍子：ref:omt2e-simple-meter ref:omt2e-compound-meter
// 音分：一个八度 1200 音分，f2 = f1 × 2^(c/1200)：ref:wiki-cent

export const SHARP_ORDER = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
export const FLAT_ORDER = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];

/** 调号里各字母的升降：key > 0 为升号个数，< 0 为降号个数 */
export function keyAlterations(key) {
  const map = Object.fromEntries(LETTERS.map((l) => [l, 0]));
  if (key > 0) SHARP_ORDER.slice(0, key).forEach((l) => { map[l] = 1; });
  if (key < 0) FLAT_ORDER.slice(0, -key).forEach((l) => { map[l] = -1; });
  return map;
}

// 高音谱号里调号各符号的位置（0 = 第一线）；其他谱号由同一形状平移，次中音谱号的升号单独排
const SHARP_POSITIONS = { treble: [8, 5, 9, 6, 3, 7, 4], bass: [6, 3, 7, 4, 1, 5, 2], alto: [7, 4, 8, 5, 2, 6, 3], tenor: [2, 6, 3, 7, 4, 8, 5] };
const FLAT_POSITIONS = { treble: [4, 7, 3, 6, 2, 5, 1], bass: [2, 5, 1, 4, 0, 3, -1], alto: [3, 6, 2, 5, 1, 4, 0], tenor: [5, 8, 4, 7, 3, 6, 2] };

/** 调号在某个谱号里的写法：[{ letter, position, alter }] */
export function keySignatureLayout(clefId, key) {
  if (!key) return [];
  const order = key > 0 ? SHARP_ORDER : FLAT_ORDER;
  const positions = (key > 0 ? SHARP_POSITIONS : FLAT_POSITIONS)[clefId];
  return order.slice(0, Math.abs(key)).map((letter, i) => ({ letter, position: positions[i], alter: key > 0 ? 1 : -1 }));
}

/** 调号对应的大调 / 关系小调主音（升号调最后一个升号上方半音、降号调倒数第二个降号即主音）：ref:omt2e-major-scales ref:omt2e-minor */
export const KEY_NAMES = {
  '-7': ['C♭', 'a♭'], '-6': ['G♭', 'e♭'], '-5': ['D♭', 'b♭'], '-4': ['A♭', 'f'], '-3': ['E♭', 'c'], '-2': ['B♭', 'g'], '-1': ['F', 'd'],
  0: ['C', 'a'], 1: ['G', 'e'], 2: ['D', 'b'], 3: ['A', 'f♯'], 4: ['E', 'c♯'], 5: ['B', 'g♯'], 6: ['F♯', 'd♯'], 7: ['C♯', 'a♯'],
};

/** 时值（以四分音符为 1 拍）：w 全、h 二分、q 四分、e 八分、s 十六分；dots 个附点 */
export const BASE_BEATS = { w: 4, h: 2, q: 1, e: 0.5, s: 0.25 };
export const DURATION_ORDER = ['w', 'h', 'q', 'e', 's'];
export function durationBeats(duration, dots = 0) {
  let total = BASE_BEATS[duration]; let add = BASE_BEATS[duration];
  for (let i = 0; i < dots; i += 1) { add /= 2; total += add; }
  return total;
}
/** 一小节有几拍（以四分音符计）：3/8 = 1.5，6/8 = 3 */
export const measureBeats = ([top, bottom]) => (top * 4) / bottom;
/** 复拍子（上方数字为 6、9、12）的一拍是附点四分音符 */
export const isCompound = ([top, bottom]) => bottom === 8 && top % 3 === 0 && top > 3;
/** 符杠分组的长度（以四分音符计）：单拍子按一拍，复拍子按附点四分 */
export const beamGroupBeats = (meter) => (isCompound(meter) ? 1.5 : meter[1] === 8 ? 0.5 * 2 : 1);

/** 把一段长度拆成可写的时值（可带一个附点），从长到短 */
export function decompose(beats) {
  const options = [];
  DURATION_ORDER.forEach((d) => { options.push({ duration: d, dots: 1, beats: durationBeats(d, 1) }); options.push({ duration: d, dots: 0, beats: durationBeats(d, 0) }); });
  options.sort((a, b) => b.beats - a.beats);
  const parts = [];
  let left = beats;
  while (left > 1e-6) {
    const fit = options.find((o) => o.beats <= left + 1e-6);
    if (!fit) break;
    parts.push({ duration: fit.duration, dots: fit.dots });
    left -= fit.beats;
  }
  return parts;
}

/**
 * 把一个声部的事件排进小节：放不下的部分拆成几段，用连音线连起来（休止符拆开但不连）
 * 事件：{ rest, duration, dots, tie, notes: [{ letter, octave, alter|null, cents }] }
 * 返回 [{ events: [{ ...event, onset, beats, source, tiedIn, tieOut }] }]；tiedIn 表示这一段是前一段连过来的
 */
export function layoutMeasures(events, meter) {
  const EPS = 1e-6;
  const capacity = measureBeats(meter);
  const measures = [{ events: [] }];
  let used = 0;
  events.forEach((event, source) => {
    let remaining = durationBeats(event.duration, event.dots);
    let first = true;
    while (remaining > EPS) {
      if (capacity - used < EPS) { measures.push({ events: [] }); used = 0; }
      const take = Math.min(remaining, capacity - used);
      const last = take >= remaining - EPS;
      const parts = first && last ? [{ duration: event.duration, dots: event.dots }] : decompose(take);
      parts.forEach((part, i) => {
        const beats = durationBeats(part.duration, part.dots);
        const finalPiece = last && i === parts.length - 1;
        measures[measures.length - 1].events.push({
          ...event, ...part, onset: used, beats, source,
          tiedIn: !(first && i === 0) && !event.rest,
          tieOut: event.rest ? false : finalPiece ? Boolean(event.tie) : true,
        });
        used += beats;
      });
      remaining -= take;
      first = false;
    }
  });
  return measures;
}

/**
 * 一个小节里每个音实际的升降与是否要写出临时记号：
 *  写了临时记号（alter 不为 null）→ 用它，并在本小节内记住；没写 → 本小节先前记住的，再不然按调号
 *  显示：写了且和"本来就该是"的不同才画出来；由连音线连过来的音沿用前一个音
 */
export function resolveMeasure(measureEvents, key, carry = {}) {
  const signature = keyAlterations(key);
  const memory = { ...carry };
  return measureEvents.map((event) => (event.rest ? [] : event.notes.map((note) => {
    const spot = `${note.letter}${note.octave}`;
    const inEffect = memory[spot] ?? signature[note.letter];
    // 连音线连过来的音（包括连过小节线）沿用前一个音的升降，不再写临时记号
    if (event.tiedIn) return { alter: event.tiedAlters?.[spot] ?? inEffect, show: false };
    if (note.alter === null || note.alter === undefined) return { alter: inEffect, show: false };
    memory[spot] = note.alter;
    return { alter: note.alter, show: note.alter !== inEffect };
  })));
}

/** 在当前调号里给一个 MIDI 音拼写：调内音不写临时记号；调外音按调号方向（降号调用降、其余用升） */
export function spellInKey(midi, key) {
  const signature = keyAlterations(key);
  const pc = ((midi % 12) + 12) % 12;
  for (const letter of LETTERS) {
    const alter = signature[letter];
    if ((LETTER_PC[LETTERS.indexOf(letter)] + alter + 12) % 12 === pc) {
      const octave = Math.round((midi - LETTER_PC[LETTERS.indexOf(letter)] - alter) / 12) - 1;
      return { letter, octave, alter: null };
    }
  }
  const spelled = spellMidi(midi, key < 0 ? 'flat' : 'sharp');
  return { letter: spelled.letter, octave: spelled.octave, alter: spelled.accidental };
}

/** 带音分偏移的频率 */
export const centsFrequency = (midi, cents = 0) => 440 * 2 ** ((midi - 69) / 12 + cents / 1200);

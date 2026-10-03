// 乐理闯关 · 其余引导卡（进阶关、主关里的第二张以后的引导卡）的"圈出来讲"
// 键名：`关卡键#卡片序号`（如 'staff:1#0'、'keys#3'）。和 learn_tours.js 一样：只配图和标注，
// 标注里的名字、数字都来自同一张卡的讲解文字，依据是那张卡上的 ref（见 learn_units_*.js / learn_branches_*.js）。
const t = (zh, ja, en) => ({ zh, ja, en });
const m = (at, label, place) => ({ at: [].concat(at), label, ...(place ? { place } : {}) });
const keys = (...midis) => midis.map((k) => `k${k}`);
const ns = (...ids) => ids.map((i) => `n${i}`);
const heads = (...ids) => ids.map((i) => `head${i}`);
const chord = (col, pitches, extra = {}) => pitches.map((p, i) => ({ p, col, d: 'w', ...(i === 0 ? extra : {}) }));
const seq = (pitches, d = 'q', extra = {}) => pitches.map((p) => ({ p, d, ...extra }));
const piano = (from, to, lit, more = {}) => ({ kind: 'piano', from, to, lit, names: 'white', ...more });
const staffOf = (clef, notes, more = {}) => ({ kind: 'notation', staves: [{ clef }], notes, ...more });
const cells = (...texts) => texts.map((text) => (typeof text === 'string' || text.zh ? { text } : text));

export const MORE_TOURS = {
  // ======================= 入门 =======================
  'keys:1#0': {
    visual: piano(60, 72, [61, 63], { names: 'white' }),
    tour: [
      [m('k61', t('C♯ = D♭', 'C♯ = D♭', 'C♯ = D♭')), m('k63', t('D♯ = E♭', 'D♯ = E♭', 'D♯ = E♭'), 'below')],
      [m(keys(64, 65), t('E♯ 就是 F', 'E♯ は F', 'E♯ is F')), m(keys(71, 72), t('C♭ 就是 B', 'C♭ は B', 'C♭ is B'), 'below')],
    ],
  },
  'keys:2#0': {
    visual: piano(60, 71, [60, 65], { names: 'white' }),
    tour: [
      [m(keys(61, 63), t('两个一组 → 左边是 C', '2 つ組 → 左が C', 'group of two → C on its left')), m(keys(66, 68, 70), t('三个一组 → 左边是 F', '3 つ組 → 左が F', 'group of three → F on its left'), 'below')],
      m(keys(60, 71), t('C D E F G A B 往右数', 'C D E F G A B と右へ', 'count C D E F G A B rightwards')),
    ],
  },
  'keys:3#0': {
    visual: staffOf('treble', [{ p: 'C##4', d: 'w', label: 'C×' }, { p: 'D4', d: 'w', label: 'D' }, { p: 'Ebb4', d: 'w', label: 'E♭♭' }]),
    tour: [
      [m('head0', t('重升：升高一个全音', 'ダブルシャープ：全音上げる', 'double sharp: up a whole step')), m('head2', t('重降：降低一个全音', 'ダブルフラット：全音下げる', 'double flat: down a whole step'), 'below')],
      m(['n0', 'n1', 'n2'], t('三个都弹 D', '3 つとも D を弾く', 'all three sound D')),
      m('n2', t('临时记号写在左边、同一线或间', '臨時記号は左に、同じ線・間に', 'accidental on the left, same line or space')),
    ],
  },
  'keys:4#0': {
    visual: staffOf('treble', [{ p: 'E4', d: 'w', label: 'E' }, { p: 'F#4', d: 'w', label: 'F♯' }, { p: 'Gb4', d: 'w', label: 'G♭' }]),
    tour: [
      [m('n1', t('全音写成下一个字母 F♯', '全音は次の文字 F♯', 'whole step = next letter, F♯')), m('n2', t('不写成 G♭', 'G♭ とは書かない', 'not G♭'), 'below')],
      m(['n0', 'n1'], t('先选字母，再调距离', '文字を決めてから距離を調整', 'pick the letter, then fix the distance')),
    ],
  },
  'staff:1#0': {
    visual: staffOf('treble', [...seq(['E4', 'G4', 'B4', 'D5', 'F5'], 'w'), ...seq(['F4', 'A4', 'C5', 'E5'], 'w')].map((n, i) => ({ ...n, label: n.p[0] }))),
    tour: [
      m(ns(0, 1, 2, 3, 4), t('线：E G B D F', '線：E G B D F', 'lines: E G B D F')),
      m(ns(5, 6, 7, 8), t('间：F A C E = face', '間：F A C E = face', 'spaces: F A C E = face')),
    ],
  },
  'staff:2#0': {
    visual: staffOf('bass', [...seq(['G2', 'B2', 'D3', 'F3', 'A3'], 'w'), ...seq(['A2', 'C3', 'E3', 'G3'], 'w')].map((n, i) => ({ ...n, label: n.p[0] }))),
    tour: [
      m(['clef0', 'line0-4'], t('两个点夹住第四线 F', '2 つの点が第 4 線 F を挟む', 'the dots frame the F line')),
      [m(ns(0, 1, 2, 3, 4), t('线：G B D F A', '線：G B D F A', 'lines: G B D F A')), m(ns(5, 6, 7, 8), t('间：A C E G', '間：A C E G', 'spaces: A C E G'), 'below')],
    ],
  },
  'staff:3#0': {
    visual: staffOf('alto', [{ p: 'C4', d: 'w', label: 'C4', lit: true }, ...seq(['F3', 'A3', 'C4', 'E4', 'G4'], 'w').map((n) => ({ ...n, label: n.p[0] }))]),
    tour: [
      m(['clef0', 'n0'], t('中心卡在中线 = 中央 C', '中心が真ん中の線 = 中央の C', 'centred on the middle line = middle C')),
      m(ns(1, 2, 3, 4, 5), t('线：F A C E G', '線：F A C E G', 'lines: F A C E G')),
      m('clef0', t('为了少用加线', '加線を減らすため', 'fewer ledger lines')),
    ],
  },
  'staff:4#0': {
    visual: piano(47, 72, [59, 60], { names: 'c', labels: { 59: 'B3', 60: 'C4' } }),
    tour: [
      m(keys(59, 60), t('B3 的下一个白键是 C4', 'B3 の次の白鍵は C4', 'after B3 comes C4')),
      m(keys(48, 60, 72), t('八度编号从 C 开始换', 'オクターヴ番号は C で替わる', 'octave numbers change at C')),
      m(keys(48, 60, 72), t('音级：所有的 C', 'ピッチクラス：すべての C', 'pitch class: every C'), 'below'),
    ],
  },
  'rhythm:1#0': {
    visual: { kind: 'values', rows: [{ seq: ['w', 'h', 'q', 'e', 's'].map((d) => ({ d })) }, { seq: ['w', 'h', 'q', 'e', 's'].map((d) => ({ d, rest: true })) }, { seq: [{ d: 'q', rest: true, dot: true }, '=', { d: 'q', rest: true }, '+', { d: 'e', rest: true }] }], labels: [t('音符', '音符', 'notes'), t('休止符', '休符', 'rests'), t('附点', '付点', 'dotted')] },
    tour: [
      m(['row0', 'row1'], t('每种音符都有同名的休止符', '音符ごとに同じ名前の休符', 'every note has a matching rest')),
      m('row2', t('休止符也能加附点', '休符にも付点', 'rests can be dotted too'), 'below'),
    ],
  },
  'rhythm:2#0': {
    visual: { kind: 'values', rows: [{ seq: [{ d: 'h', dot: true }, '=', { d: 'h' }, '+', { d: 'q' }] }, { seq: [{ d: 'h' }, '+', { d: 'q' }, '+', { d: 'e' }] }], labels: [t('附点', '付点', 'dotted'), t('双附点', '複付点', 'double-dotted')] },
    tour: [
      m('row0', t('加上本身的一半', '自分の半分を足す', 'adds half the note')),
      m('row1', t('2 + 1 + ½ = 3½ 拍', '2 + 1 + ½ = 3½ 拍', '2 + 1 + ½ = 3½ beats'), 'below'),
    ],
  },
  'rhythm:3#0': {
    visual: { kind: 'beats', rows: [{ label: t('平常', 'ふつう', 'usual'), groups: [2, 2, 2, 2] }, { label: t('切分', 'シンコペーション', 'syncopated'), groups: [1, 2, 2, 2, 1] }] },
    tour: [
      null,
      [m('r0', t('重音在强拍', 'アクセントは強拍', 'accents on strong beats')), m('r1', t('重音挪到弱拍', 'アクセントが弱拍へ', 'accents moved to weak beats'), 'below')],
    ],
  },
  'rhythm:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('全', '全', 'whole'), sub: '8' }, { text: t('二分', '2 分', 'half'), sub: '4' }, { text: t('四分', '4 分', 'quarter'), sub: '2' }, { text: t('八分', '8 分', 'eighth'), sub: '1' }] }, { cells: [{ text: t('附点四分', '付点 4 分', 'dotted quarter'), sub: '3' }, { text: t('附点二分', '付点 2 分', 'dotted half'), sub: '6' }] }] },
    tour: [
      m('row0', t('都换成八分音符来数', '8 分音符に換算', 'count in eighths')),
      m('row1', t('附点加一半', '付点は半分足す', 'a dot adds half'), 'below'),
    ],
  },
  'pentatonic:1#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'C', sub: t('宫', '宮', 'gong') }, { text: 'D', sub: t('商', '商', 'shang') }, { text: 'E', sub: t('角', '角', 'jue') }, { text: 'G', sub: t('徵', '徴', 'zhi') }, { text: 'A', sub: t('羽', '羽', 'yu'), lit: true }] }] },
    tour: [
      m('row0', t('五个音都能当主音', '5 つの音どれも主音になれる', 'any of the five can be the tonic')),
      m('c0-4', t('C 宫的音、A 为主音 = A 羽调式', 'C 宮の音で A が主音 = A 羽調式', 'C-gong notes, A as tonic = A yu mode')),
    ],
  },
  'pentatonic:2#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: cells('C', 'G', 'D', 'A', 'E') }, { cells: [{ text: 'C' }, { text: 'D', sub: '+2' }, { text: 'E', sub: '+2' }, { text: 'G', sub: '+3' }, { text: 'A', sub: '+2' }] }] },
    tour: [
      [m('row0', t('连叠五度', '5 度を重ねる', 'stack fifths')), m('row1', t('排进一个八度', '1 オクターヴに並べる', 'fit into one octave'), 'below')],
      m('row1', t('台阶 2–2–3–2–3', '段差 2–2–3–2–3', 'steps 2–2–3–2–3'), 'below'),
    ],
  },
  'pentatonic:3#0': {
    visual: piano(60, 72, [60, 62, 64, 67, 69], { names: 'white', labels: { 65: t('清角', '清角', 'qj.'), 66: t('变徵', '変徴', 'bz.'), 70: t('闰', '閏', 'run'), 71: t('变宫', '変宮', 'bg.') } }),
    tour: [
      [m(keys(64, 67), t('小三度缺口', '短 3 度のすき間', 'minor-third gap')), m(keys(69, 72), t('小三度缺口', '短 3 度のすき間', 'minor-third gap'))],
      [m('k65', t('清：高半音', '清：半音高い', 'qing: a half step higher'), 'below'), m('k71', t('变：低半音', '変：半音低い', 'bian: a half step lower'), 'below')],
    ],
  },
  'pentatonic:4#0': {
    visual: piano(60, 72, [60, 62, 64, 67, 69], { names: 'lit' }),
    tour: [
      m(keys(60, 64), t('唯一的大三度：下面是宫', '唯一の長 3 度：下が宮', 'the only major third: gong is the lower note')),
      m('k69', t('旋律停在哪个音，就是什么调式', '旋律が止まる音が旋法名', 'where the melody stops names the mode'), 'below'),
    ],
  },
  'major:1#0': {
    visual: staffOf('treble', seq(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'], 'q').map((n, i) => ({ ...n, label: ['do', 're', 'mi', 'fa', 'sol', 'la', 'ti'][i] }))),
    tour: [
      [m('n0', t('主音', '主音', 'tonic')), m('n4', t('属音', '属音', 'dominant')), m('n6', t('导音', '導音', 'leading tone'), 'below')],
      m('n0', t('从 C 开始 = C 大调', 'C から = ハ長調', 'starts on C = C major')),
    ],
  },
  'major:2#0': {
    tour: [
      [m(['M:G', 'M:D', 'M:A'], t('升号：F C G D A E B', 'シャープ：F C G D A E B', 'sharps: F C G D A E B')), m(['M:F', 'M:Bb', 'M:Eb'], t('降号：倒过来', 'フラット：逆順', 'flats: reversed'), 'below')],
      [m('M:D', t('D 大调：C♯ 往上半音', 'ニ長調：C♯ の半音上', 'D major: a half step above C♯')), m('M:Bb', t('B♭ 大调：倒数第二个降号', '変ロ長調：最後から 2 番目のフラット', 'B♭ major: second-to-last flat'), 'below')],
      null,
    ],
  },
  'major:3#0': {
    visual: staffOf('treble', seq(['E4', 'F#4', 'G#4', 'A4', 'B4', 'C#5', 'D#5', 'E5'], 'q')),
    tour: [m(ns(0, 1, 2, 3, 4, 5, 6, 7), t('七个连续字母 + 升降号对上台阶', '連続する 7 文字 + 臨時記号', 'seven letters, accidentals fix the steps'))],
  },
  'major:4#0': {
    tour: [[m(['M:G', 'M:D', 'M:A', 'M:E'], t('顺时针：升号越来越多', '時計回り：シャープが増える', 'clockwise: more sharps')), m(['M:F', 'M:Bb', 'M:Eb', 'M:Ab'], t('逆时针：降号越来越多', '反時計回り：フラットが増える', 'counter-clockwise: more flats'), 'below')]],
  },
  'minor:1#0': {
    visual: piano(57, 69, [57, 59, 60, 62, 64, 65, 68, 69], { names: 'white', labels: { 68: 'G♯' } }),
    tour: [
      m(keys(67, 68), t('和声小调：第 7 音升高', '和声的短音階：第 7 音を上げる', 'harmonic minor: raised 7th')),
      m(keys(57, 60, 64, 68), t('A C E G♯ = 小大七', 'A C E G♯ = マイナー・メジャー 7', 'A C E G♯ = minor-major 7th'), 'below'),
    ],
  },
  'minor:2#0': {
    visual: piano(57, 69, [67, 68, 69], { names: 'white', labels: { 67: 'te', 68: 'ti', 69: 'do' } }),
    tour: [
      m(keys(67, 69), t('低全音：下主音 te', '全音下：下主音 te', 'a whole step below: subtonic te')),
      m(keys(68, 69), t('只差半音：导音 ti', '半音下：導音 ti', 'a half step below: leading tone ti')),
    ],
  },
  'minor:3#0': {
    tour: [
      m(['M:C', 'm:A'], t('关系调：调号相同', '平行調：調号が同じ', 'relative: same key signature')),
      m(['M:C', 'M:Eb'], t('c 小调多三个降号（同 E♭ 大调）', 'ハ短調はフラット 3 つ（変ホ長調と同じ）', 'C minor: three more flats (as E♭ major)')),
    ],
  },
  'minor:4#0': {
    visual: { kind: 'blocks', rows: [{ label: t('自然', '自然', 'natural'), cells: cells('i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII') }, { label: t('升导音', '導音を上げる', 'raised 7'), cells: cells('i', 'ii°', 'III', 'iv', { text: 'V', lit: true }, 'VI', { text: 'vii°', lit: true }) }] },
    tour: [
      m('row0', t('小调的七个和弦', '短調の 7 和音', 'the seven chords in minor')),
      [m('c1-4', t('v → V', 'v → V', 'v → V'), 'below'), m('c1-6', t('VII → vii°', 'VII → vii°', 'VII → vii°'), 'below')],
    ],
  },
  'modes:1#0': {
    visual: { kind: 'blocks', rows: [{ label: t('大调改', '長調から', 'from major'), cells: [{ text: 'Lydian', sub: '♯4' }, { text: 'Mixolydian', sub: '♭7' }] }, { label: t('小调改', '短調から', 'from minor'), cells: [{ text: 'Dorian', sub: '♮6' }, { text: 'Phrygian', sub: '♭2' }, { text: 'Locrian', sub: '♭2 ♭5' }] }] },
    tour: [
      [m('row0', t('先写大调再改一个音', '長調を書いて 1 音変える', 'write major, change one note')), m('row1', t('先写自然小调再改', '自然短音階から変える', 'write natural minor, then change'), 'below')],
      null,
    ],
  },
  'modes:2#0': {
    visual: piano(60, 72, [60, 62, 64, 66, 67, 69, 71, 72], { names: 'white', labels: { 64: t('大三度', '長 3 度', 'M3'), 66: 'F♯' } }),
    tour: [
      m(keys(60, 64), t('大三度：亮的一组', '長 3 度：明るいグループ', 'major third: the bright group')),
      m(keys(60, 64, 67, 71), t('C E G B = Cmaj7', 'C E G B = Cmaj7', 'C E G B = Cmaj7'), 'below'),
    ],
  },
  'modes:3#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: cells('Lydian', 'Ionian', 'Mixolydian', 'Dorian') }, { arrows: true, cells: cells('Dorian', 'Aeolian', 'Phrygian', 'Locrian') }] },
    tour: [
      m('row0', t('降 4 → 降 7 → 降 3', '4 → 7 → 3 を下げる', 'lower 4, then 7, then 3')),
      m('row1', t('降 6 → 降 2 → 降 5：每步只降一个音', '6 → 2 → 5、1 歩ごとに 1 音', 'lower 6, 2, 5 — one note per step'), 'below'),
    ],
  },
  'modes:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'maj7', sub: 'Ionian · Lydian' }, { text: '7', sub: 'Mixolydian' }] }, { cells: [{ text: 'm7', sub: 'Dorian · Phrygian · Aeolian' }, { text: 'm7♭5', sub: 'Locrian' }] }] },
    tour: [
      m(['row0', 'row1'], t('第 1、3、5、7 音 = 主七和弦', '第 1・3・5・7 音 = 主七の和音', '1-3-5-7 = the tonic seventh')),
      m('c1-0', t('D Dorian → Dm7', 'D ドリアン → Dm7', 'D Dorian → Dm7'), 'below'),
    ],
  },
  'intervals:1#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('近', '近い', 'near'), sub: t('二、三度', '2・3 度', '2nds, 3rds') }, { text: t('中', '中くらい', 'middle'), sub: t('四、五度', '4・5 度', '4ths, 5ths') }, { text: t('远', '遠い', 'far'), sub: t('六、七、八度', '6・7・8 度', '6ths–8ves') }] }] },
    tour: [m('row0', t('先估宽窄', 'まず広さを見積もる', 'estimate the size first'))],
  },
  'intervals:2#0': {
    visual: staffOf('treble', [...chord(0, ['C4', 'G4'], { label: t('空', '空虚', 'open') }), ...chord(1, ['C4', 'E4'], { label: t('甜', '甘い', 'sweet') }), { p: 'C4', col: 2, d: 'w', label: t('挤', '窮屈', 'crowded') }, { p: 'D4', col: 2, d: 'w', dx: 13 }]),
    tour: [[m(ns(0, 1), t('纯五度', '完全 5 度', 'perfect 5th')), m(ns(2, 3), t('三度', '3 度', '3rd'), 'below'), m(ns(4, 5), t('二度', '2 度', '2nd'))]],
  },
  'intervals:3#0': {
    visual: staffOf('treble', [...chord(0, ['C4', 'E4']), ...chord(1, ['C4', 'D4']).map((n, i) => (i === 1 ? { ...n, dx: 13 } : n)), ...chord(2, ['C4', 'Eb4'])]),
    tour: [
      [m(ns(0, 1), t('都在线上：三度', 'どちらも線：3 度', 'both on lines: a 3rd')), m(ns(2, 3), t('一线一间：二度', '線と間：2 度', 'line and space: a 2nd'), 'below')],
      [m(ns(0, 1), t('4 个半音：大三度', '半音 4 つ：長 3 度', '4 half steps: M3')), m(ns(4, 5), t('3 个半音：小三度', '半音 3 つ：短 3 度', '3 half steps: m3'), 'below')],
    ],
  },
  'intervals:4#0': {
    visual: { kind: 'blocks', rows: [{ label: t('完全协和', '完全協和', 'perfect'), cells: cells('1', '5', '8') }, { label: t('不完全协和', '不完全協和', 'imperfect'), cells: cells('3', '6') }, { label: t('不协和', '不協和', 'dissonant'), cells: cells('2', '7', t('增 / 减', '増 / 減', 'aug / dim')) }] },
    tour: [
      m('row2', t('不稳定，想往别处去', '不安定で動きたい', 'unstable, wants to move'), 'below'),
      [m('row0', t('完全协和', '完全協和', 'perfect consonance')), m('row1', t('不完全协和', '不完全協和', 'imperfect consonance'), 'below')],
    ],
  },
  'intervalqual:1#0': {
    visual: staffOf('treble', [...chord(0, ['C4', 'F#4'], { label: t('增四度', '増 4 度', 'aug 4th') }), ...chord(1, ['C4', 'Gb4'], { label: t('减五度', '減 5 度', 'dim 5th') })]),
    tour: [
      null,
      [m(ns(0, 1), 'C–F♯'), m(ns(2, 3), t('C–G♭：同音不同度数', 'C–G♭：同じ音、別の度数', 'C–G♭: same sound, other number'), 'below')],
    ],
  },
  'intervalqual:2#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: '2 ↔ 7' }, { text: '3 ↔ 6' }, { text: '4 ↔ 5' }] }, { cells: [{ text: t('大 ↔ 小', '長 ↔ 短', 'M ↔ m') }, { text: t('增 ↔ 减', '増 ↔ 減', 'aug ↔ dim') }, { text: t('纯 = 纯', '完全 = 完全', 'P = P') }] }] },
    tour: [
      [m('row0', t('度数相加 = 9', '度数の和 = 9', 'numbers add to 9')), m('row1', t('性质翻面', '性質が反転', 'qualities flip'), 'below')],
      m('row0', t('先转位，换一个好认的', '転回して読みやすく', 'invert to make it easier')),
    ],
  },
  'intervalqual:3#0': {
    visual: staffOf('treble', [...chord(0, ['C4', 'D4'], { label: t('二度', '2 度', '2nd') }).map((n, i) => (i ? { ...n, dx: 13 } : n)), ...chord(1, ['C4', 'D5'], { label: t('九度', '9 度', '9th') })]),
    tour: [
      m(ns(0, 1), t('单音程：八度以内', '単音程：オクターヴ以内', 'simple: within an octave')),
      m(ns(2, 3), t('九度 = 八度 + 二度', '9 度 = 8 度 + 2 度', '9th = octave + 2nd'), 'below'),
    ],
  },
  'intervalqual:4#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: t('数字母', '文字を数える', 'count letters'), sub: t('度数', '度数', 'number') }, { text: t('数半音', '半音を数える', 'count half steps'), sub: t('性质', '性質', 'quality') }] }] },
    tour: [m('row0', t('度数 + 性质', '度数 + 性質', 'number + quality'))],
  },
  'texture:1#0': {
    visual: { kind: 'blocks', rows: [{ label: t('一条线', '1 本', 'one line'), cells: cells(t('单声部', 'モノフォニー', 'monophony')) }, { label: t('同一旋律', '同じ旋律', 'one tune'), cells: cells(t('支声', 'ヘテロフォニー', 'heterophony')) }, { label: t('一起走', '一緒に動く', 'together'), cells: cells(t('主调', 'ホモフォニー', 'homophony')) }, { label: t('各走各的', '別々に', 'independent'), cells: cells(t('复调', 'ポリフォニー', 'polyphony')) }] },
    tour: [m(['row0', 'row1'], t('数线条', '線を数える', 'count the lines')), m(['row2', 'row3'], t('看关系', '関係を見る', 'look at how they relate'), 'below')],
  },
  'texture:2#0': {
    visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [...[['C5', 'G4', 'E4', 'C3'], ['B4', 'G4', 'D4', 'G2'], ['C5', 'G4', 'E4', 'C3']].flatMap((ch, col) => ch.map((p, k) => ({ p, s: k === 3 ? 1 : 0, col, d: 'h', ...(k === 0 && col === 0 ? {} : {}) })))].map((n) => ({ ...n, d: 'w' })) },
    tour: [
      m(['n0', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7'], t('一起换和弦：主调织体', '一緒に和音を変える：ホモフォニー', 'changing chords together: homophony')),
      null,
    ],
  },
  'texture:3#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: t('独唱', '独唱', 'solo'), sub: t('单声部', 'モノフォニー', 'monophony') }, { text: t('加伴奏', '伴奏が入る', 'accompanied'), sub: t('主调', 'ホモフォニー', 'homophony') }, { text: t('间奏', '間奏', 'interlude'), sub: t('复调', 'ポリフォニー', 'polyphony') }] }] },
    tour: [m('row0', t('在织体之间移动', 'テクスチュアの間を移動', 'moving between textures')), m('row0', t('一首曲子里换来换去', '1 曲の中で入れ替わる', 'changing within one piece'))],
  },
  'texture:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: '1', sub: t('几条线？', '何本？', 'how many lines?') }, { text: '2', sub: t('什么关系？', 'どんな関係？', 'what relation?') }] }] },
    tour: [m('row0', t('两个问题', '2 つの質問', 'two questions'))],
  },

  // ======================= 和声 =======================
  'triads:1#0': {
    visual: staffOf('treble', [{ p: 'C4', d: 'w', label: t('根音', '根音', 'root') }, { p: 'E4', d: 'w', label: t('三音', '3 音', '3rd') }, { p: 'G4', d: 'w', label: t('五音', '5 音', '5th') }, ...chord(3, ['C4', 'E4', 'G4'])], { cols: 4 }),
    tour: [
      [m('n0', t('最低：根音', 'いちばん下：根音', 'lowest: root'), 'below'), m('n1', t('中间：三音', '真ん中：3 音', 'middle: third')), m('n2', t('最高：五音', 'いちばん上：5 音', 'top: fifth'))],
      m(ns(3, 4, 5), t('大三度 + 纯五度 = 大三和弦', '長 3 度 + 完全 5 度 = 長三和音', 'M3 + P5 = major')),
    ],
  },
  'triads:2#0': {
    visual: staffOf('treble', [...chord(0, ['C4', 'E4', 'G4'], { label: t('大', '長', 'maj') }), ...chord(1, ['C4', 'Eb4', 'G4'], { label: t('小', '短', 'min') }), ...chord(2, ['C4', 'Eb4', 'Gb4'], { label: t('减', '減', 'dim') }), ...chord(3, ['C4', 'E4', 'G#4'], { label: t('增', '増', 'aug') })]),
    tour: [[m(ns(6, 7, 8), t('减：紧缩', '減：縮こまる', 'dim: squeezed')), m(ns(9, 10, 11), t('增：撑开', '増：押し広げる', 'aug: stretched'), 'below')]],
  },
  'triads:3#0': {
    visual: { kind: 'blocks', rows: [{ cells: [['I', 1], ['ii', 0], ['iii', 0], ['IV', 1], ['V', 1], ['vi', 0], ['vii°', 2]].map(([text, k]) => ({ text, sub: [t('小', '短', 'min'), t('大', '長', 'maj'), t('减', '減', 'dim')][k], lit: k === 1 })) }] },
    tour: [
      [m(['c0-0', 'c0-3', 'c0-4'], t('大三和弦', '長三和音', 'major')), m('c0-6', t('减三和弦', '減三和音', 'diminished'), 'below')],
      null,
    ],
  },
  'triads:4#0': {
    visual: staffOf('treble', [...chord(0, ['Eb4', 'G4', 'B4'], { label: 'E♭+' }), ...chord(1, ['G4', 'B4', 'Eb5'], { label: t('转位', '転回', 'inverted') }), ...chord(2, ['G4', 'B4', 'D#5'], { label: 'G+' })]),
    tour: [
      [m(ns(3, 4, 5), t('第一转位 G–B–E♭', '第 1 転回 G–B–E♭', 'first inversion G–B–E♭')), m(ns(6, 7, 8), t('和 G–B–D♯ 同音', 'G–B–D♯ と同じ音', 'same sound as G–B–D♯'), 'below')],
      m(ns(0, 1, 2), t('全由大三度叠成', '長 3 度だけで積む', 'stacked major thirds only')),
    ],
  },
  'inversions:1#0': {
    visual: staffOf('bass', [...chord(0, ['C3', 'E3', 'G3'], { label: t('原位', '基本', 'root') }), ...chord(1, ['E3', 'G3', 'C4'], { label: t('一转', '1 転', '1st') }), ...chord(2, ['G3', 'C4', 'E4'], { label: t('二转', '2 転', '2nd') })]),
    tour: [[m('head0', t('根音在下', '根音が下', 'root below'), 'below'), m('head3', t('三音在下', '3 音が下', 'third below')), m('head6', t('五音在下', '5 音が下', 'fifth below'), 'below')]],
  },
  'inversions:2#0': {
    visual: staffOf('bass', [...chord(0, ['G2', 'B2', 'D3', 'F3'], { label: '7' }), ...chord(1, ['B2', 'D3', 'F3', 'G3'], { label: '6/5' }), ...chord(2, ['D3', 'F3', 'G3', 'B3'], { label: '4/3' }), ...chord(3, ['F2', 'G2', 'B2', 'D3'], { label: '4/2' }).map((x, i) => (i === 1 ? { ...x, dx: 13 } : x))].map((n) => n)),
    tour: [
      m(['label0', 'label4', 'label8', 'label12'], t('7、6/5、4/3、4/2', '7・6/5・4/3・4/2', '7, 6/5, 4/3, 4/2'), 'below'),
      m(heads(0, 4, 8, 12), t('低音依次 G、B、D、F', 'バスは G・B・D・F', 'bass: G, B, D, F')),
    ],
  },
  'inversions:3#0': {
    visual: { kind: 'blocks', rows: [{ label: t('转位', '転回', 'inversion'), cells: [{ text: 'C/E', sub: t('E 在和弦里', 'E は和音の中', 'E is in the chord') }, { text: 'C/G', sub: t('G 在和弦里', 'G は和音の中', 'G is in the chord') }] }, { label: t('另一个低音', '別のバス', 'other bass'), cells: [{ text: 'C/D', sub: t('D 不在', 'D はない', 'D is not') }, { text: 'C/F♯', sub: t('F♯ 不在', 'F♯ はない', 'F♯ is not') }] }] },
    tour: [m('row0', t('就是转位', 'ただの転回', 'simply inversions')), m('row1', t('上面一个和弦、下面另一个低音', '上に和音、下に別のバス', 'a chord over another bass'), 'below')],
  },
  'inversions:4#0': {
    visual: staffOf('treble', [...chord(0, ['G4', 'C5', 'E5'], { label: t('排列', '配置', 'voicing') }), ...chord(1, ['C4', 'E4', 'G4'], { label: t('叠成三度', '3 度に', 'in thirds') })]),
    tour: [m(ns(3, 4, 5), t('先叠成三度找根音', 'まず 3 度に積んで根音を探す', 'stack in thirds to find the root'))],
  },
  'voicing:1#0': {
    visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [{ p: 'C4', s: 0, col: 0, d: 'w' }, { p: 'E4', s: 0, col: 0, d: 'w' }, { p: 'G4', s: 0, col: 0, d: 'w' }, { p: 'C3', s: 1, col: 1, d: 'w' }, { p: 'G3', s: 1, col: 1, d: 'w' }, { p: 'E4', s: 0, col: 1, d: 'w' }] },
    tour: [
      m(ns(0, 1, 2), t('紧密：中间放不下别的和弦音', '密集：間に入らない', 'close: no room between')),
      m(ns(3, 4), t('C 和 G 之间能放 E', 'C と G の間に E が入る', 'room for E between C and G'), 'below'),
    ],
  },
  'voicing:2#0': {
    visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [{ p: 'E5', s: 0, d: 'h', col: 0 }, { p: 'G4', s: 0, d: 'h', col: 1 }, { p: 'C4', s: 1, d: 'h', col: 0 }, { p: 'C3', s: 1, d: 'h', col: 1 }] },
    tour: [
      m(['staff0', 'staff1'], t('六条规则', '6 つのきまり', 'six rules')),
      [m('n0', t('女高：符干朝上', 'ソプラノ：棒は上', 'soprano: stem up')), m('n1', t('女中：朝下', 'アルト：下', 'alto: down'), 'below'), m('n2', t('男高：朝上', 'テノール：上', 'tenor: up')), m('n3', t('男低：朝下', 'バス：下', 'bass: down'), 'below')],
      m(['n0', 'n1'], t('相邻上方声部 ≤ 八度', '隣の上声部 ≤ 8 度', 'upper neighbours ≤ an octave')),
    ],
  },
  'voicing:3#0': {
    visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [{ p: 'C5', s: 0, col: 0, d: 'w' }, { p: 'G4', s: 0, col: 0, d: 'w' }, { p: 'E4', s: 0, col: 0, d: 'w' }, { p: 'C3', s: 1, col: 0, d: 'w' }] },
    tour: [
      m(['n0', 'n3'], t('重复低音上的音（C）', 'バスの音（C）を重ねる', 'double the bass note (C)')),
      m('n1', t('爵士：五音常省略', 'ジャズ：5 音は省略しがち', 'jazz: the fifth is often dropped')),
    ],
  },
  'voicing:4#0': {
    visual: staffOf('treble', [...chord(0, ['C4', 'E4', 'G4', 'B4'], { label: t('紧密', '密集', 'close') }), ...chord(1, ['G3', 'C4', 'E4', 'B4'], { label: 'drop 2' })]),
    tour: [
      m(['head2', 'head4'], t('从上数第二个音降八度', '上から 2 番目を 1 オクターヴ下げる', 'second from top drops an octave')),
      m(ns(4, 5, 6, 7), t('音域拉开，吉他好按', '広がってギターで押さえやすい', 'spread out, easy on guitar'), 'below'),
    ],
  },
  'symbols:1#0': {
    visual: { kind: 'blocks', rows: [{ label: t('小三', '短三', 'minor'), cells: cells('Cm', 'C-', 'Cmin') }, { label: t('减三', '減三', 'dim'), cells: cells('Cdim', 'C°') }, { label: t('增三', '増三', 'aug'), cells: cells('Caug', 'C+') }, { label: t('半减七', '半減七', 'half-dim'), cells: cells('Cm7♭5', 'Cø') }] },
    tour: [m(['row0', 'row1', 'row2'], t('同一个和弦，几种写法', '同じ和音の別表記', 'several spellings, one chord')), m('row3', t('半减七', '半減七', 'half-diminished'), 'below')],
  },
  'symbols:2#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'C7', sub: t('大三 + 小七', '長三 + 短 7', 'maj + m7') }, { text: 'Cmaj7', sub: t('大三 + 大七', '長三 + 長 7', 'maj + M7') }, { text: 'Cm7', sub: t('小三 + 小七', '短三 + 短 7', 'min + m7') }] }, { cells: [{ text: 'Cm7♭5', sub: t('减三 + 小七', '減三 + 短 7', 'dim + m7') }, { text: 'Cdim7', sub: t('减三 + 减七', '減三 + 減 7', 'dim + d7') }] }] },
    tour: [m('c0-0', t('单写 7 = 属七', '7 だけ = 属七', 'plain 7 = dominant')), m('row1', t('减三和弦上的两种七和弦', '減三和音の上の 2 種', 'two sevenths on a diminished triad'), 'below')],
  },
  'symbols:3#0': {
    visual: staffOf('treble', chord(0, ['C4', 'E4', 'G4', 'Bb4', 'D5'], { label: 'C9' }).concat(chord(1, ['C4', 'E4', 'G4', 'D5'], { label: 'Cadd9' }))),
    tour: [
      m('head4', t('九音 = 八度 + 二度 = D', '9 音 = 8 度 + 2 度 = D', '9th = octave + 2nd = D')),
      [m('head3', t('C9 带七音', 'C9 は 7 音つき', 'C9 includes the 7th')), m(ns(5, 6, 7, 8), t('只加九音：Cadd9', '9 音だけ：Cadd9', 'ninth only: Cadd9'), 'below')],
    ],
  },
  'symbols:4#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'C', sub: t('根音', '根音', 'root') }, { text: 'm7', sub: t('性质', '性質', 'quality') }, { text: '(♭9)', sub: t('延伸', 'テンション', 'extension') }, { text: '/E', sub: t('低音', 'バス', 'bass') }] }] },
    tour: [m('row0', t('根音 → 性质 → 附加 → 低音', '根音 → 性質 → 付加 → バス', 'root → quality → extras → bass'))],
  },
  'chordplus:1#0': {
    visual: staffOf('treble', [...chord(0, ['G4', 'C5', 'D5'], { label: 'Gsus4' }).map((n, i) => (i === 2 ? { ...n, dx: 13 } : n)), ...chord(1, ['G4', 'B4', 'D5'], { label: 'G' })]),
    tour: [m(['head1', 'head4'], t('四度落到三度：C → B', '4 度が 3 度へ：C → B', '4th falls to 3rd: C → B')), m(ns(0, 1, 2), t('流行音乐里常常不解决', 'ポップスでは解決しないことも', 'often left unresolved in pop'))],
  },
  'chordplus:2#0': {
    visual: staffOf('treble', [...chord(0, ['C4', 'E4', 'G4', 'A4'], { label: 'C6' }).map((n, i) => (i === 3 ? { ...n, dx: 13 } : n)), ...chord(1, ['A3', 'C4', 'E4', 'G4'], { label: 'Am7' })]),
    tour: [m('head3', t('加音：不是七音的音', '付加音：7 音でない音', 'added tone: not a seventh')), m(['n0', 'n4'], t('音完全一样，两种听法', '同じ音で 2 通りの聞き方', 'same notes, two hearings'), 'below')],
  },
  'chordplus:3#0': {
    visual: staffOf('bass', chord(0, ['E2', 'B2', 'E3'], { label: 'E5' })),
    tour: [m(ns(0, 1, 2), t('根音 + 五音（+ 八度）', '根音 + 5 音（+ 8 度）', 'root + fifth (+ octave)')), m(['head0', 'head1'], t('频率比接近 3:2', '周波数比はほぼ 3:2', 'ratio close to 3:2')), null],
  },
  'chordplus:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'sus', sub: t('换掉三音', '3 音を置き換え', 'replace the 3rd') }, { text: 'add / 6', sub: t('加一个音', '1 音足す', 'add a note') }, { text: '5', sub: t('只留根音和五音', '根音と 5 音だけ', 'root and fifth only') }] }] },
    tour: [m('row0', t('换、加、减', '置き換え・追加・削除', 'replace, add, remove'))],
  },
  'sevenths:1#0': {
    visual: staffOf('treble', [...chord(0, ['C4', 'E4', 'G4', 'B4'], { label: 'maj7' }), ...chord(1, ['C4', 'E4', 'G4', 'Bb4'], { label: '7' }), ...chord(2, ['C4', 'Eb4', 'G4', 'Bb4'], { label: 'm7' }), ...chord(3, ['C4', 'Eb4', 'Gb4', 'Bb4'], { label: 'ø7' }), ...chord(4, ['C4', 'Eb4', 'Gb4', 'Bbb4'], { label: '°7' })]),
    tour: [
      m(ns(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11), t('三和弦 + 七度', '三和音 + 7 度', 'triad + seventh')),
      m(ns(12, 13, 14, 15, 16, 17, 18, 19), t('减三和弦 + 小七 / 减七', '減三和音 + 短 7 / 減 7', 'dim triad + m7 / dim 7'), 'below'),
    ],
  },
  'sevenths:2#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [['Cmaj7', [60, 64, 67, 71]], ['C7', [60, 64, 67, 70]], ['Cm7', [60, 63, 67, 70]], ['Cø7', [60, 63, 66, 70]], ['C°7', [60, 63, 66, 69]]].map(([text, play]) => ({ text, play })) }] },
    tour: [m('row0', t('依次听五种七和弦', '5 種の七の和音を順に', 'the five sevenths in turn'))],
  },
  'sevenths:3#0': {
    visual: { kind: 'blocks', rows: [{ label: t('大调', '長調', 'major'), cells: cells('I7', 'ii7', 'iii7', 'IV7', 'V7', 'vi7', 'vii∅7') }, { label: t('小调', '短調', 'minor'), cells: cells('i7', 'ii∅7', 'V7', 'vii°7') }] },
    tour: [m('c0-4', t('V7：属七', 'V7：属七', 'V7: dominant')), m('c1-3', t('升导音后 vii°7：减七', '導音を上げて vii°7：減七', 'raised 7: vii°7 diminished'), 'below')],
  },
  'sevenths:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('大小七', '長短七', 'major-minor'), sub: t('= 属七', '= 属七', '= dominant 7th') }] }, { arrows: true, cells: [{ text: t('大', '長', 'major'), sub: t('三和弦', '三和音', 'triad') }, { text: t('小', '短', 'minor'), sub: t('七度', '7 度', 'seventh') }] }] },
    tour: [m('row0', t('两套名字', '2 通りの名前', 'two sets of names')), m('row1', t('前字：三和弦；后字：七度', '前：三和音、後：7 度', 'first: triad, then: 7th'), 'below')],
  },
  'roman:1#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'IV', sub: '5 − 1' }, { text: 'VI', sub: '5 + 1' }] }] },
    tour: [m('row0', t('IV = 5 − 1，VI = 5 + 1', 'IV = 5 − 1、VI = 5 + 1', 'IV = 5 − 1, VI = 5 + 1')), null],
  },
  'roman:2#0': {
    visual: { kind: 'blocks', rows: [{ cells: cells('V7', 'ii7') }, { cells: [{ text: 'vii∅7', sub: t('半减七', '半減七', 'half-dim') }, { text: 'vii°7', sub: t('全减七', '減七', 'fully dim') }] }] },
    tour: [m('row0', t('右上加 7', '右上に 7', 'add a superscript 7')), m('row1', t('∅ 半减七，° 全减七', '∅ 半減、° 減七', '∅ half-dim, ° fully dim'), 'below')],
  },
  'roman:3#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: '1', sub: t('叠回原位', '基本形に', 'root position') }, { text: '2', sub: t('认音和性质', '音と性質', 'notes, quality') }, { text: '3', sub: t('罗马数字', 'ローマ数字', 'numeral') }] }, { arrows: true, cells: [{ text: '4', sub: '° ∅ +' }, { text: '5', sub: t('转位数字', '転回数字', 'inversion figures') }] }] },
    tour: [m('row0', t('先找根音和性质', 'まず根音と性質', 'root and quality first')), m('row1', t('再补记号和转位', '記号と転回を足す', 'then symbols and inversion'), 'below')],
  },
  'roman:4#0': {
    visual: { kind: 'blocks', rows: [{ label: t('C 大调', 'ハ長調', 'C major'), cells: [{ text: 'G7', sub: 'V7' }] }, { label: t('F 大调', 'ヘ長調', 'F major'), cells: [{ text: 'C7', sub: 'V7' }] }] },
    tour: [m(['row0', 'row1'], t('换了调，还是 V7', '調が変わっても V7', 'different key, still V7'))],
  },
  'functions:1#0': {
    visual: { kind: 'blocks', rows: [{ label: t('主', '主', 'tonic'), cells: cells('I', 'vi') }, { label: t('下属', '下属', 'predom.'), cells: cells('ii6', 'IV') }, { label: t('属', '属', 'dominant'), cells: cells('V', 'V7', 'vii°6') }] },
    tour: [[m('row0', t('家', '家', 'home')), m('row2', t('想回家', '帰りたい', 'wants home'), 'below')], m('row1', t('强下属：ii6、IV', '強い下属：ii6・IV', 'strong predominants: ii6, IV'))],
  },
  'functions:2#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'Tb', sub: 'I' }, { text: 'PD', sub: 'IV / ii6' }, { text: 'D', sub: 'V' }, { text: 'Te', sub: 'I' }] }] },
    tour: [m('row0', t('主 → 下属 → 属 → 主', '主 → 下属 → 属 → 主', 'T → PD → D → T')), m(['c0-2', 'c0-3'], t('先找终止式', 'まず終止を探す', 'find the cadence first'), 'below')],
  },
  'functions:3#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'I' }, { text: 'V6', sub: t('延长', '延長', 'prolongs') }, { text: 'I' }] }, { arrows: true, cells: [{ text: 'IV' }, { text: 'I' }] }] },
    tour: [m('row0', t('还在家里转一转', 'まだ家の中', 'still at home')), m('row1', t('IV – I 也能延长主和弦', 'IV – I も主和音を延ばす', 'IV – I can prolong the tonic too'), 'below')],
  },
  'functions:4#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: t('家', '家', 'home'), sub: 'T' }, { text: t('准备', '準備', 'prepare'), sub: 'PD' }, { text: t('想回家', '帰りたい', 'longing'), sub: 'D' }, { text: t('家', '家', 'home'), sub: 'T' }] }] },
    tour: [m('row0', t('从家出发又回到家', '家を出て家に戻る', 'leave home, come back'))],
  },
  'cadences:1#0': {
    visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [{ p: 'G2', s: 1, col: 0, d: 'w', label: 'V' }, { p: 'B3', s: 1, col: 0, d: 'w' }, { p: 'D4', s: 0, col: 0, d: 'w' }, { p: 'G4', s: 0, col: 0, d: 'w' }, { p: 'C3', s: 1, col: 1, d: 'w', label: 'I' }, { p: 'G3', s: 1, col: 1, d: 'w' }, { p: 'E4', s: 0, col: 1, d: 'w' }, { p: 'C5', s: 0, col: 1, d: 'w', lit: true }] },
    tour: [m(['head0', 'head4'], t('两个和弦都是原位', 'どちらも基本形', 'both in root position'), 'below'), m('head7', t('最高声部落到 do', '最上声が do', 'top voice lands on do'))],
  },
  'cadences:2#0': {
    visual: { kind: 'blocks', rows: [{ label: t('半终止', '半終止', 'half'), arrows: true, cells: cells('x', { text: 'V', lit: true }) }, { label: t('阻碍', '偽終止', 'deceptive'), arrows: true, cells: cells('V', { text: 'vi', lit: true }) }] },
    tour: [m('row0', t('停在属和弦上', '属和音で止まる', 'stops on V')), m('row1', t('不去 I，走到 vi', 'I でなく vi へ', 'goes to vi, not I'), 'below')],
  },
  'cadences:3#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'IV', play: [53, 57, 60, 65] }, { text: 'I', play: [48, 55, 64, 72] }] }] },
    tour: [m('row0', t('"阿们"终止', '「アーメン」終止', '"Amen" cadence')), m('c0-1', t('也可以只是延长主和弦', '主和音の延長にも', 'or just prolonging I'), 'below')],
  },
  'cadences:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'V–I', sub: t('正格', '正格', 'authentic') }, { text: 'x–V', sub: t('半终止', '半終止', 'half') }, { text: 'IV–I', sub: t('变格', '変格', 'plagal') }, { text: 'V–vi', sub: t('阻碍', '偽終止', 'deceptive') }] }] },
    tour: [m('row0', t('看最后两个和弦', '最後の 2 和音を見る', 'look at the last two chords'))],
  },
  'sixfour:1#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'ii6', sub: 'PD' }, { text: 'I6/4', sub: t('终止四六', '終止 4 6', 'cad. 6/4'), lit: true }, { text: 'V' }, { text: 'I' }] }] },
    tour: [m('c0-0', t('强下属通向终止四六', '強い下属から終止 4 6 へ', 'strong predominant leads in')), m(['c0-1', 'c0-2'], t('6→5、4→3', '6→5・4→3', '6→5, 4→3'), 'below')],
  },
  'sixfour:2#0': {
    visual: staffOf('bass', [{ p: 'C3', d: 'h', label: 'I' }, { p: 'D3', d: 'h', label: 'V6/4', lit: true }, { p: 'E3', d: 'h', label: 'I6' }]),
    tour: [m('n1', t('低音是经过音', 'バスが経過音', 'the bass passes')), m(ns(0, 1, 2), t('C – D – E', 'C – D – E', 'C – D – E'))],
  },
  'sixfour:3#0': {
    visual: { kind: 'blocks', rows: [{ label: t('辅助', '補助', 'neighbour'), arrows: true, cells: cells('I', { text: 'IV6/4', lit: true }, 'I') }, { label: t('琶音', 'アルペジオ', 'arpeggiated'), cells: [{ text: t('低音分解', 'バスが分散', 'bass arpeggiates') }] }] },
    tour: [m('row0', t('低音不动，上方做邻音', 'バスは動かず上が隣接音', 'bass holds, upper voices neighbour')), m('row1', t('低音在和弦音之间分解', 'バスが和音の音を分散', 'bass moves among chord tones'), 'below')],
  },
  'sixfour:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('终止', '終止', 'cadential'), sub: t('sol → V', 'sol → V', 'sol → V') }, { text: t('经过', '経過', 'passing'), sub: t('低音经过', 'バス経過', 'bass passes') }] }, { cells: [{ text: t('辅助', '補助', 'neighbour'), sub: t('低音不动', 'バス保持', 'bass holds') }, { text: t('琶音', 'アルペジオ', 'arpeggiated'), sub: t('低音分解', 'バス分散', 'bass arpeggiates') }] }] },
    tour: [m(['row0', 'row1'], t('看低音在做什么', 'バスが何をしているか', 'watch the bass'))],
  },
  'figured:1#0': {
    visual: staffOf('bass', [...chord(0, ['C3', 'E3', 'G3'], { label: t('（5/3）', '（5/3）', '(5/3)') }), ...chord(1, ['E3', 'G3', 'C4'], { label: '6' }), ...chord(2, ['G3', 'C4', 'E4'], { label: '6/4' })]),
    tour: [m(['label0', 'label3', 'label6'], t('从低音往上数', 'バスから数える', 'counted up from the bass'), 'below'), m(ns(0, 1, 2), t('实现：把数字变成和弦', '実施：数字を和音に', 'realising: figures into chords'))],
  },
  'figured:2#0': {
    visual: staffOf('bass', [...chord(0, ['G2', 'B2', 'D3', 'F3'], { label: '7' }), ...chord(1, ['B2', 'D3', 'F3', 'G3'], { label: '6/5' }), ...chord(2, ['D3', 'F3', 'G3', 'B3'], { label: '4/3' }), ...chord(3, ['F2', 'G2', 'B2', 'D3'], { label: '4/2' }).map((x, i) => (i === 1 ? { ...x, dx: 13 } : x))]),
    tour: [m(['label0', 'label4', 'label8', 'label12'], t('完整数字的简写', '完全な数字の略記', 'shorthand of the full figures'), 'below')],
  },
  'figured:3#0': {
    visual: staffOf('bass', [{ p: 'A2', d: 'w', label: '♯' }, { p: 'D3', d: 'w', label: '♭6' }]),
    tour: [m('label1', t('升降号写在数字前', '臨時記号は数字の前', 'accidental before the figure'), 'below'), m('label0', t('单独一个记号 = 三度', '記号だけ = 3 度', 'a lone accidental = the third'), 'below')],
  },
  'figured:4#0': {
    visual: { kind: 'blocks', rows: [{ label: t('三和弦', '三和音', 'triads'), cells: cells('5/3', '6', '6/4') }, { label: t('七和弦', '七の和音', 'sevenths'), cells: cells('7', '6/5', '4/3', '4/2') }] },
    tour: [m(['row0', 'row1'], t('从低音往上数', 'バスから上へ数える', 'count up from the bass'))],
  },
  'form:1#0': {
    visual: { kind: 'blocks', rows: [{ label: t('五部', '5 部', 'five-part'), cells: cells({ text: 'A', lit: true }, 'B', { text: 'A', lit: true }, 'C', { text: 'A', lit: true }) }, { label: t('七部', '7 部', 'seven-part'), cells: cells({ text: 'A', lit: true }, 'B', { text: 'A', lit: true }, 'C', { text: 'A', lit: true }, 'B', { text: 'A', lit: true }) }] },
    tour: [m(['c0-1', 'c0-3'], t('插部', 'エピソード', 'episodes'))],
  },
  'form:2#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: cells(t('乐曲', '楽曲', 'piece'), t('乐章', '楽章', 'mvt'), t('段落', '部分', 'section'), t('主题', '主題', 'theme')) }, { arrows: true, cells: cells(t('乐句', 'フレーズ', 'phrase'), t('乐思', '楽想', 'idea'), t('动机', '動機', 'motive')) }] },
    tour: [m(['row0', 'row1'], t('一层套一层', '入れ子', 'nested levels')), m('c1-0', t('先找乐句结尾', 'まずフレーズの終わり', 'find phrase endings first'), 'below')],
  },
  'form:3#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: t('乐句', 'フレーズ', 'phrase') }, { text: t('终止式', '終止', 'cadence'), lit: true }] }] },
    tour: [m('c0-1', t('目标几乎总是终止式', '目標はほぼ終止', 'the goal is almost always a cadence'))],
  },
  'form:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: cells('A', 'B', "A′") }] },
    tour: [m('c0-2', t('回来时加撇', '戻ったら ′', 'a prime on return'))],
  },
  'forms:1#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('呈示', '提示', 'presentation'), sub: t('基本乐思 ×2', '基本楽想 ×2', 'basic idea ×2') }, { text: t('展开', '継続', 'continuation'), sub: t('加速 → 终止', '加速 → 終止', 'speeds up → cadence') }] }] },
    tour: [m('row0', t('句子式 = 呈示 + 展开', '文型 = 提示 + 継続', 'sentence = presentation + continuation'))],
  },
  'forms:2#0': {
    visual: { kind: 'blocks', rows: [{ cells: cells('‖: A :‖', '‖: B :‖') }, { label: t('再现', '再現', 'rounded'), cells: cells('A', { text: "B … A′", lit: true }) }] },
    tour: [m('row0', t('两个反复段，各反复一次', '2 つの反復部', 'two repeated halves')), m('row1', t('回到开头材料 = 再现二部', '冒頭に戻る = 再現二部', 'opening returns = rounded binary'), 'below')],
  },
  'forms:3#0': {
    visual: { kind: 'blocks', rows: [{ label: t('三部', '三部', 'ternary'), cells: cells('A', { text: 'B', sub: t('对比', '対比', 'contrast') }, "A′") }, { label: t('通谱', '通作', 'through-composed'), cells: cells('A', 'B', 'C') }] },
    tour: [m('row0', t('对比的 B，再回到 A', '対比の B、A へ戻る', 'contrasting B, back to A')), m('row1', t('每段都不同：通谱体', '全部違う：通作', 'all different: through-composed'), 'below')],
  },
  'forms:4#0': {
    visual: { kind: 'blocks', rows: [{ label: t('第一段', '前半', '1st half'), cells: cells(t('呈示部', '提示部', 'exposition')) }, { label: t('第二段', '後半', '2nd half'), cells: cells(t('发展部', '展開部', 'development'), t('再现部', '再現部', 'recapitulation')) }] },
    tour: [m(['row0', 'row1'], t('开放的再现二部曲式', '開いた再現二部形式', 'an open rounded binary')), m('row0', t('主部 → 过渡 → 副部 → 结束部', '第 1 主題 → 推移 → 第 2 主題 → 小結尾', 'P → TR → S → C'))],
  },
  'tonicization:1#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'I', play: [48, 60, 64, 67] }, { text: 'V/ii', sub: 'A C♯ E', play: [45, 61, 64, 67], lit: true }, { text: 'ii', sub: 'D F A', play: [50, 62, 65, 69] }] }] },
    tour: [m(['c0-1', 'c0-2'], t('目标往上纯五度', '目標の完全 5 度上', 'a fifth above the target')), m('c0-1', t('ii 的同根和弦改成大三和弦', '同じ根音の和音を長三和音に', 'make the chord on that root major'), 'below')],
  },
  'tonicization:2#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'I', play: [48, 60, 64, 67] }, { text: 'vii°7/V', sub: 'F♯ A C E♭', play: [54, 60, 63, 69], lit: true }, { text: 'V', sub: 'G', play: [43, 59, 62, 67] }] }] },
    tour: [m(['c0-1', 'c0-2'], t('目标下方半音的减七', '目標の半音下の減七', 'dim 7th a half step below the target')), m('c0-1', t('F♯ A C E♭ → G', 'F♯ A C E♭ → G', 'F♯ A C E♭ → G'), 'below')],
  },
  'tonicization:3#0': {
    visual: { kind: 'blocks', rows: [{ label: t('直接', '直接', 'direct'), arrows: true, cells: cells(t('旧调', '元の調', 'old key'), t('新调', '新しい調', 'new key')) }, { label: t('共同和弦', '共通和音', 'pivot'), arrows: true, cells: cells(t('旧调', '元の調', 'old key'), { text: t('共同和弦', '共通和音', 'pivot'), lit: true }, t('新调', '新しい調', 'new key')) }] },
    tour: [m(['row0', 'row1'], t('突然换，或借共同和弦', '突然か、共通和音で', 'abruptly, or via a pivot')), null],
  },
  'tonicization:4#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: t('同一个临时记号', '同じ臨時記号', 'repeated accidental'), sub: t('线索', '手がかり', 'clue') }, { text: t('终止式', '終止', 'cadence'), sub: t('证据', '証拠', 'proof'), lit: true }] }] },
    tour: [m('row0', t('线索 → 证据', '手がかり → 証拠', 'clue → proof'))],
  },
  'chromatic:1#0': {
    visual: piano(60, 72, [60, 62, 63, 65, 67, 68, 70], { names: 'white', labels: { 68: 'le' } }),
    tour: [m('k68', t('le：降低的第 6 级', 'le：下げた第 6 音', 'le: lowered 6')), m('k68', t('借用和弦前加 ♭：♭VI', '借用和音に ♭：♭VI', 'flat roots get a ♭: ♭VI'), 'below')],
  },
  'chromatic:2#0': {
    visual: staffOf('treble', [...chord(0, ['D4', 'F4', 'Bb4'], { label: '♭II6' }), ...chord(1, ['E4', 'G#4', 'B4'], { label: 'V' })]),
    tour: [m(ns(0, 1, 2), t('建在 ra 上，第一转位', 'ra の上、第 1 転回', 'on ra, first inversion')), m(['head2', 'head4'], t('ra 往下走到 ti（B♭ → G♯）', 'ra が ti へ（B♭ → G♯）', 'ra moves down to ti (B♭ → G♯)'))],
  },
  'chromatic:3#0': {
    visual: staffOf('bass', [...chord(0, ['Ab2', 'C3', 'F#3'], { label: 'It+6' }), ...chord(1, ['Ab2', 'C3', 'D3', 'F#3'], { label: 'Fr+6' }), ...chord(2, ['Ab2', 'C3', 'Eb3', 'F#3'], { label: 'Ger+6' }), ...chord(3, ['G2', 'B2', 'D3', 'G3'], { label: 'V' })]),
    tour: [m(['head0', 'head2'], t('le 与 fi：增六度', 'le と fi：増 6 度', 'le and fi: augmented sixth')), [m('head5', t('法：加 2 级', '仏：2 を足す', 'Fr: adds 2')), m('head9', t('德：加降 3 级', '独：♭3 を足す', 'Ger: adds ♭3'), 'below')]],
  },
  'chromatic:4#0': {
    visual: staffOf('treble', [...chord(0, ['C4', 'E4', 'G4'], { label: 'C' }), ...chord(1, ['C4', 'Eb4', 'Gb4', 'A4'], { label: 'CTo7' }), ...chord(2, ['C4', 'E4', 'G4'], { label: 'C' })]),
    tour: [m(ns(3, 4, 5, 6), t('只是装饰后面的和弦', '後ろの和音を飾るだけ', 'only decorates the next chord')), m(['head0', 'head3', 'head7'], t('共享根音 C', '根音 C を共有', 'shares the root C'), 'below')],
  },
  'circle:1#0': {
    tour: [m(['M:C', 'M:G', 'M:D', 'M:A'], t('顺时针 3 格 = 3 个升号', '時計回り 3 つ = シャープ 3 つ', '3 steps clockwise = 3 sharps')), m(['M:C', 'M:F', 'M:Bb', 'M:Eb'], t('逆时针 3 格 = 3 个降号', '反時計回り 3 つ = フラット 3 つ', '3 steps anticlockwise = 3 flats'), 'below')],
  },
  'circle:2#0': {
    tour: [m(['M:C', 'm:A'], t('关系小调：同一位置', '平行調：同じ位置', 'relative minor: same spot')), m(['M:Eb', 'm:C'], t('c 小调在 E♭ 旁', 'ハ短調は E♭ の隣', 'C minor sits by E♭'), 'below'), m(['M:F', 'M:C', 'M:G', 'm:D', 'm:A', 'm:E'], t('近关系调', '近親調', 'closely related keys'))],
  },
  'circle:3#0': {
    tour: [m(['M:C', 'M:G'], t('一格 = 30°', '1 つ = 30°', 'one step = 30°')), [m(['M:C', 'M:A'], t('90°：小三度', '90°：短 3 度', '90°: minor third')), m(['M:C', 'M:F#'], t('180°：三全音', '180°：三全音', '180°: tritone'), 'below')], m(['M:D', 'M:G', 'M:C'], t('D → G → C 逆时针', 'D → G → C 反時計回り', 'D → G → C anticlockwise'))],
  },
  'circle:4#0': {
    tour: [m(['M:C', 'M:A', 'M:F#', 'M:Eb'], t('一条轴：四个音互相代替', '1 本の軸：4 音が代理し合う', 'one axis: four mutual substitutes')), m(['M:C', 'M:A', 'M:F#', 'M:Eb'], t('主轴：相隔 90°', '主軸：90° おき', 'tonic axis: 90° apart')), m(['M:C', 'M:F#'], t('极与对极', '極と対極', 'pole and counterpole'))],
  },
  'neoriemann:1#0': {
    visual: staffOf('treble', [...chord(0, ['C4', 'E4', 'G4'], { label: 'C' }), ...chord(1, ['C#4', 'E4', 'G#4'], { label: 'C♯m' }), ...chord(2, ['C4', 'F4', 'Ab4'], { label: 'Fm' }), ...chord(3, ['B3', 'Eb4', 'Ab4'], { label: 'A♭m' })]),
    tour: [
      m(['head4', 'n3', 'n5'], t('S：动根音和五音，保留 E', 'S：根音と 5 音を動かし E を残す', 'S: root and fifth move, E stays')),
      [m(ns(6, 7, 8), t('N：保留 C', 'N：C を残す', 'N: keeps C')), m(ns(9, 10, 11), t('H：三个音都动', 'H：3 音すべて動く', 'H: all three move'), 'below')],
    ],
  },
  'neoriemann:2#0': {
    visual: { kind: 'ring', labels: ['C', 'Cm', 'A♭', 'A♭m', 'E', 'Em'], edges: ['P', 'L', 'P', 'L', 'P', 'L'] },
    tour: [m(['n0', 'n1', 'n2', 'n3', 'n4', 'n5'], t('P、L 交替，六步回家', 'P・L を交互に 6 歩で戻る', 'P and L alternate, home in six')), m(['n0', 'n3'], t('合起来是六声音阶', '合わせると六音音階', 'together: the hexatonic scale'))],
  },
  'neoriemann:3#0': {
    visual: { kind: 'ring', labels: ['C', 'Am', 'A', 'F♯m', 'F♯', 'D♯m', 'E♭', 'Cm'], edges: ['R', 'P', 'R', 'P', 'R', 'P', 'R', 'P'] },
    tour: [m(['n0', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7'], t('RP：八步闭合，八声音阶', 'RP：8 歩で閉じる、八音音階', 'RP: closes in eight, octatonic')), m('n0', t('RL 要走 24 步', 'RL は 24 歩', 'RL takes 24 steps'))],
  },
  'neoriemann:4#0': {
    visual: { kind: 'tower', center: 'Cdim7', above: ['D♯ø7', 'F♯ø7', 'Aø7', 'Cø7'], below: ['B7', 'D7', 'F7', 'A♭7'], aboveLabel: t('升高一个音 → 半减七', '1 音上げる → 半減七', 'raise one note → half-dim 7'), belowLabel: t('降低一个音 → 属七', '1 音下げる → 属七', 'lower one note → dominant 7') },
    tour: [m(['top', 'center', 'bottom'], t('只动一点点音就连起来', 'わずかな動きでつながる', 'linked by tiny moves')), [m(['center', 'b0'], t('C 降为 B：Cdim7 → B7', 'C を B に：Cdim7 → B7', 'C down to B: Cdim7 → B7'), 'below'), m('top', t('升高一个音：4 个半减七', '1 音上げる：半減七 4 つ', 'raise one: four half-dim 7ths'))]],
  },

  // ======================= 旋律与对位 =======================
  'nonchord:1#0': {
    visual: staffOf('treble', seq(['C4', 'D4', 'E4', 'F4', 'E4']).map((n, i) => ({ ...n, lit: i === 1 || i === 3 }))),
    tour: [m('n1', t('经过音：同方向一步一步', '経過音：同じ方向に順次', 'passing: steps on in one direction')), m('n3', t('辅助音：出去又回来', '刺繍音：出て戻る', 'neighbour: out and back'))],
  },
  'nonchord:2#0': {
    visual: staffOf('treble', seq(['E4', 'F4', 'D4', 'E4']).map((n, i) => ({ ...n, lit: i === 1 || i === 2 }))),
    tour: [m(ns(1, 2), t('上方、下方各一个级进音', '上下の順次音', 'one step above, one below')), m('n1', t('不完全：一边级进一边跳进', '不完全：片側が跳躍', 'incomplete: one side leaps'))],
  },
  'nonchord:3#0': {
    visual: { kind: 'blocks', rows: [{ label: t('只用级进', '順次だけ', 'steps only'), cells: cells(t('经过', '経過', 'passing'), t('辅助', '刺繍', 'neighbour')) }, { label: t('带跳进', '跳躍あり', 'with a leap'), cells: cells(t('倚音', '倚音', 'appoggiatura'), t('逃音', '逸音', 'escape')) }, { label: t('有静止', '保持あり', 'with a held note'), cells: cells(t('延留', '掛留', 'suspension'), t('上行延留', '上行掛留', 'retardation'), t('持续', '保続', 'pedal'), t('先现', '先取', 'anticipation')) }] },
    tour: [m(['row0', 'row1', 'row2'], t('三个音里的中间那个', '3 音のうち真ん中', 'the middle of three notes')), m('row1', t('倚音、逃音带跳进', '倚音・逸音は跳躍', 'appoggiatura, escape: a leap'))],
  },
  'nonchord:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('怎么来', 'どう来る', 'in'), sub: t('级进 / 跳进 / 保持', '順次 / 跳躍 / 保持', 'step / leap / hold') }, { text: t('怎么走', 'どう行く', 'out'), sub: t('同向 / 反向', '同方向 / 反方向', 'same / opposite') }, { text: t('拍位', '拍', 'beat'), sub: t('强 / 弱', '強 / 弱', 'strong / weak') }] }] },
    tour: [m('row0', t('三个问题', '3 つの質問', 'three questions'))],
  },
  'nctmore:1#0': {
    visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [{ p: 'C3', s: 1, col: 0, d: 'w' }, { p: 'C5', s: 0, col: 0, d: 'w', label: t('准备', '予備', 'prep.') }, { p: 'G2', s: 1, col: 1, d: 'w' }, { p: 'C5', s: 0, col: 1, d: 'w', label: '4', lit: true }, { p: 'G2', s: 1, col: 2, d: 'w' }, { p: 'B4', s: 0, col: 2, d: 'w', label: '3' }] },
    tour: [[m('n1', t('准备：协和', '予備：協和', 'prepared: consonant')), m('n3', t('延留：强拍上不协和', '掛留：強拍で不協和', 'suspended: dissonant on the beat'), 'below'), m('n5', t('解决：往下一步', '解決：1 歩下へ', 'resolved: down a step'))], m(['label3', 'label5'], '4–3', 'below')],
  },
  'nctmore:2#0': {
    visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [{ p: 'C3', s: 1, col: 0, d: 'w' }, { p: 'E4', s: 0, col: 0, d: 'w' }, { p: 'F3', s: 1, col: 1, d: 'w' }, { p: 'F4', s: 0, col: 1, d: 'w' }, { p: 'G3', s: 1, col: 2, d: 'w' }, { p: 'D4', s: 0, col: 2, d: 'w' }, { p: 'C3', s: 1, col: 3, d: 'w' }, { p: 'E4', s: 0, col: 3, d: 'w' }] },
    tour: [m(ns(5, 7), t('下一个和弦的音提前出现', '次の和音の音が先に出る', 'the next chord’s note arrives early')), m(ns(0, 2, 4, 6), t('持续音：低音保持不变时', '保続音：バスが保つとき', 'pedal: when the bass holds'), 'below')],
  },
  'nctmore:3#0': {
    visual: staffOf('treble', seq(['C5', 'B4', 'G4', 'A4', 'B4']).map((n, i) => ({ ...n, lit: i === 1 }))),
    tour: [m('n1', t('第二个音不协和却跳走', '2 音目は不協和なのに跳ぶ', 'the 2nd note is dissonant yet leaps')), m(['n0', 'n4'], t('强拍到强拍只差一步', '強拍から強拍は 1 歩だけ', 'strong beat to strong beat: one step'))],
  },
  'nctmore:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: cells(t('进', '入り', 'in'), t('出', '出', 'out'), t('拍位', '拍', 'beat')) }] },
    tour: [m('row0', t('用三个特征认出所有装饰音', '3 つの特徴で見分ける', 'three features identify them all'))],
  },
  'counterpoint:1#0': {
    visual: staffOf('treble', seq(['D4', 'F4', 'E4', 'D4', 'G4', 'F4', 'A4', 'G4', 'F4', 'E4', 'D4'], 'w').map((n, i) => ({ ...n, lit: i === 6 })), { cols: 11 }),
    tour: [m(['n0', 'n10'], t('主音开始、主音结束；只有一个最高点', '主音で始まり主音で終わる、頂点は 1 つ', 'starts and ends on the tonic; one high point'))],
  },
  'counterpoint:2#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('反向', '反行', 'contrary'), sub: '↑ ↓', lit: true }, { text: t('同向', '並行', 'similar'), sub: '↑ ↑' }, { text: t('平行', '平行', 'parallel'), sub: '↑ ↑ =' }, { text: t('斜向', '斜行', 'oblique'), sub: '— ↑' }] }, { cells: [{ text: t('平行五度 / 八度', '連続 5 度 / 8 度', 'parallel 5ths / 8ves'), sub: t('禁止', '禁止', 'forbidden') }] }] },
    tour: [m('c0-0', t('反向最能保持独立', '反行がいちばん独立', 'contrary keeps lines most independent')), m('row1', t('一类对位禁止', '第 1 類で禁止', 'forbidden in first species'), 'below')],
  },
  'counterpoint:3#0': {
    visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [{ p: 'D3', s: 1, col: 0, d: 'w' }, { p: 'A4', s: 0, col: 0, d: 'w', label: '5' }, { p: 'E3', s: 1, col: 1, d: 'w' }, { p: 'C#5', s: 0, col: 1, d: 'w', label: 'ti' }, { p: 'D3', s: 1, col: 2, d: 'w' }, { p: 'D5', s: 0, col: 2, d: 'w', label: '8' }] },
    tour: [m(ns(0, 1), t('开头：完全协和', '始め：完全協和', 'begin: perfect consonance')), m(ns(2, 3), t('定旋律 re → 对位 ti', '定旋律 re → 対旋律 ti', 'CF re → counterpoint ti'))],
  },
  'counterpoint:4#0': {
    visual: { kind: 'blocks', rows: [{ label: t('完全', '完全', 'perfect'), cells: cells('1', '5', '8') }, { label: t('不完全', '不完全', 'imperfect'), cells: cells({ text: '3', lit: true }, { text: '6', lit: true }) }, { label: t('不协和', '不協和', 'dissonant'), cells: cells('2', '7', t('增减', '増減', 'aug/dim')) }] },
    tour: [m('row1', t('多用不完全协和', '不完全協和を多めに', 'favour imperfect consonances'))],
  },
  'species:1#0': {
    visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [{ p: 'C3', s: 1, col: 0, d: 'w' }, { p: 'E4', s: 0, col: 0, d: 'h', label: t('强', '強', 'strong') }, { p: 'F4', s: 0, col: 1, d: 'h', label: t('弱：经过', '弱：経過', 'weak: passing') }, { p: 'D3', s: 1, col: 2, d: 'w' }, { p: 'G4', s: 0, col: 2, d: 'h', label: t('强', '強', 'strong') }] },
    tour: [m(['n1', 'n4'], t('强拍永远协和', '強拍は常に協和', 'strong beats always consonant')), m('n2', t('弱拍的经过音可以不协和', '弱拍の経過音は不協和でもよい', 'weak-beat passing tones may clash'), 'below')],
  },
  'species:2#0': {
    visual: { kind: 'beats', rows: [{ groups: [1, 1, 1, 1] }] },
    tour: [m(['b0-0-0', 'b0-2-0'], t('第 1 拍最强，第 3 拍次强', '1 拍目が最強、3 拍目が次', 'beat 1 strongest, beat 3 next')), null],
  },
  'species:3#0': {
    visual: { kind: 'blocks', rows: [{ label: t('上方', '上声', 'above'), cells: cells('7–6', '4–3', '9–8') }, { label: t('下方', '下声', 'below'), cells: cells('2–3', '5–6', '4–5') }] },
    tour: [m(['row0', 'row1'], t('多用不协和延留', '不協和の掛留を多く', 'use plenty of dissonant suspensions')), m(['c0-1', 'c1-1'], t('按解决音程套规则', '解決の音程で規則を当てる', 'apply rules to the resolution interval'), 'below')],
  },
  'species:4#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: cells(t('一类', '1 類', '1st'), t('二类', '2 類', '2nd'), t('三类', '3 類', '3rd'), t('四类', '4 類', '4th'), { text: t('五类', '5 類', '5th'), lit: true }) }] },
    tour: [m(['c0-0', 'c0-3'], t('循序渐进的练习（Fux 1725）', '段階的な練習（Fux 1725）', 'a graded method (Fux 1725)')), m('c0-4', t('华彩：把节奏混在一起', '華麗：リズムを混ぜる', 'florid: mixes the rhythms'), 'below')],
  },
  'instruments:1#0': {
    visual: { kind: 'blocks', rows: [{ label: t('写 C 响', 'C と書くと', 'written C sounds'), cells: [{ text: 'B♭', sub: t('单簧管 / 小号', 'クラリネット / トランペット', 'clarinet / trumpet') }, { text: 'E♭', sub: t('中音萨克斯', 'アルト・サックス', 'alto sax') }, { text: 'F', sub: t('圆号', 'ホルン', 'horn') }] }] },
    tour: [m('row0', t('写 C，各自响不同的音', 'C と書いて別々の音', 'written C, each sounds different')), m('row0', t('反方向移同样的距离', '逆方向に同じだけ移す', 'transpose the opposite way'), 'below')],
  },
  'instruments:2#0': {
    visual: { kind: 'blocks', rows: [{ label: t('低八度', '1 オクターヴ低い', 'octave lower'), cells: cells(t('低音提琴', 'コントラバス', 'double bass'), t('吉他', 'ギター', 'guitar')) }, { label: t('高八度', '1 オクターヴ高い', 'octave higher'), cells: cells(t('短笛', 'ピッコロ', 'piccolo'), t('木琴', 'シロフォン', 'xylophone')) }] },
    tour: [m(['row0', 'row1'], t('只差一个八度', '1 オクターヴだけ違う', 'only an octave off')), null],
  },
  'instruments:3#0': {
    visual: { kind: 'blocks', rows: [{ label: t('乐队', 'オーケストラ', 'band'), cells: cells(t('C 大调', 'ハ長調', 'C major')) }, { label: t('B♭ 单簧管', 'B♭ クラリネット', 'B♭ clarinet'), cells: [{ text: t('D 大调', 'ニ長調', 'D major'), sub: t('高大二度', '長 2 度上', 'up a M2') }] }, { label: t('E♭ 萨克斯', 'E♭ サックス', 'E♭ sax'), cells: [{ text: t('A 大调', 'イ長調', 'A major'), sub: t('高大六度', '長 6 度上', 'up a M6') }] }] },
    tour: [m('row1', t('谱子写高大二度', '譜面は長 2 度上', 'written a major 2nd higher')), m('row2', t('写高大六度', '長 6 度上に書く', 'written a major 6th higher'), 'below')],
  },
  'instruments:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('降 B 调', 'B♭ 管', 'in B♭'), sub: t('写 C 响 B♭', 'C → B♭', 'C sounds B♭') }, { text: t('E♭ 调', 'E♭ 管', 'in E♭'), sub: t('写 C 响 E♭', 'C → E♭', 'C sounds E♭') }, { text: t('F 调', 'F 管', 'in F'), sub: t('写 C 响 F', 'C → F', 'C sounds F') }] }] },
    tour: [m('row0', t('名字里的调 = 写 C 响什么', '名前の調 = C の実音', 'the key in the name = what C sounds'))],
  },
  'fretboard:1#0': {
    visual: { kind: 'strings', strings: ['E', 'A', 'D', 'G', 'B', 'E'], midis: [40, 45, 50, 55, 59, 64], frets: 5, dots: [{ s: 0, f: 1 }, { s: 0, f: 2 }] },
    tour: [m(['d0', 'd1'], t('每品高一个半音', '1 フレットで半音', 'each fret: a half step'))],
  },
  'fretboard:2#0': {
    visual: { kind: 'strings', strings: ['E', 'A', 'D', 'G', 'B', 'E'], midis: [40, 45, 50, 55, 59, 64], frets: 5, dots: [{ s: 0, f: 5 }, { s: 3, f: 4 }] },
    tour: [[m('d0', t('第 5 品 = 下一根空弦 A', '5 フレット = 次の開放弦 A', 'fret 5 = next open string, A')), m('d1', t('G 弦用第 4 品', 'G 弦は 4 フレット', 'G string uses fret 4'), 'below')]],
  },
  'fretboard:3#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: cells('C', 'A', 'G', 'E', 'D', 'C') }] },
    tour: [m('row0', t('五个形首尾相接', '5 つの形がつながる', 'five shapes link up')), m(['c0-0', 'c0-1'], t('C 形上移 2 品 = D', 'C 形を 2 フレット上 = D', 'C shape up 2 frets = D'), 'below')],
  },
  'fretboard:4#0': {
    visual: { kind: 'strings', strings: ['E', 'A', 'D', 'G', 'B', 'E'], midis: [40, 45, 50, 55, 59, 64], frets: 5, dots: [{ s: 1, f: 3 }] },
    tour: [m(['s1', 'd0'], t('空弦 A + 3 品 = C', '開放 A + 3 フレット = C', 'open A + 3 frets = C'))],
  },

  // ======================= 节奏与爵士 =======================
  'meter:1#0': {
    visual: { kind: 'beats', rows: [{ label: '3/4', groups: [1, 1, 1], sub: 2 }, { label: '6/8', groups: [1, 1], sub: 3 }] },
    tour: [m('r1', t('6/8：两拍，每拍三份', '6/8：2 拍、1 拍 3 つ', '6/8: two beats, three each'), 'below'), [m('r0', t('三拍，每拍两份', '3 拍、1 拍 2 つ', 'three beats, two each')), m('r1', t('音符总数一样，重音不同', '音の数は同じ、アクセントが違う', 'same notes, different accents'), 'below')]],
  },
  'meter:2#0': {
    visual: { kind: 'beats', rows: [{ label: '5/8', groups: [2, 3] }, { label: '7/8', groups: [2, 2, 3] }] },
    tour: [m(['g0-0', 'g0-1'], t('一长一短：2 + 3', '長短：2 + 3', 'short–long: 2 + 3')), m('r1', t('aksak：跛行', 'アクサク：足を引きずる', 'aksak: limping'), 'below')],
  },
  'meter:3#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: cells('3/16', '2/16', '3/16', '…') }, { cells: [{ text: t('复合节拍', 'ポリメーター', 'polymeter'), sub: t('两种拍子同时', '2 つの拍子が同時に', 'two meters at once') }, { text: t('节拍转换', 'メトリック・モジュレーション', 'metric modulation'), sub: t('时值对上时值', '音価を合わせる', 'note value = note value') }] }] },
    tour: [m('row0', t('不断换拍号（《春之祭》结尾）', '拍子が変わり続ける（《春の祭典》終わり）', 'ever-changing meters (end of The Rite)')), m('row1', t('两种做法', '2 つの手法', 'two techniques'), 'below')],
  },
  'meter:4#0': {
    visual: { kind: 'blocks', rows: [{ label: t('每拍几份', '1 拍の分割', 'beat division'), cells: [{ text: '2', sub: t('单拍子', '単純', 'simple') }, { text: '3', sub: t('复拍子', '複合', 'compound') }] }, { label: t('每小节几拍', '1 小節の拍数', 'beats per bar'), cells: [{ text: '2' }, { text: '3' }, { text: '4' }] }] },
    tour: [m(['row0', 'row1'], t('两个问题定拍子', '2 つの質問で拍子が決まる', 'two questions name the meter'))],
  },
  'swing:1#0': {
    visual: { kind: 'values', rows: [{ seq: [{ d: 'e' }, { d: 'e' }, { d: 'e' }], tuplet: '3' }, { seq: [{ d: 'e' }, { d: 'e' }], tuplet: '2' }, { seq: [{ d: 'q' }, { d: 'q' }, { d: 'q' }], tuplet: '3' }], labels: [t('三连音', '3 連符', 'triplet'), t('二连音', '2 連符', 'duplet'), t('四分三连', '4 分 3 連', 'quarter triplet')] },
    tour: [m(['row0', 'row1'], t('从另一种拍子借来的分法', '別の拍子から借りた分割', 'divisions borrowed from the other meter type')), m('row2', t('任何层级都能三连', 'どの階層でも 3 連', 'triplets at any level'), 'below')],
  },
  'swing:2#0': {
    visual: { kind: 'beats', rows: [{ groups: [1, 1, 1, 1] }] },
    tour: [null, m(['b0-1-0', 'b0-3-0'], t('第 2、4 拍加重音：反拍', '2・4 拍にアクセント：バックビート', 'accents on 2 and 4: backbeat'))],
  },
  'swing:3#0': {
    visual: { kind: 'beats', rows: [{ label: t('层级', '階層', 'hierarchy'), groups: [1, 1, 1, 1] }, { label: t('切分', 'シンコペ', 'syncopation'), groups: [1, 2, 1] }] },
    tour: [m('b0-0-0', t('第 1 拍最强', '1 拍目が最強', 'beat 1 strongest')), m('r1', t('连音线、附点、休止符都能制造切分', 'タイ・付点・休符で作れる', 'ties, dots or rests make syncopation'), 'below')],
  },
  'swing:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('三连 / 二连', '3 連 / 2 連', 'triplet / duplet'), sub: t('借来的分法', '借りた分割', 'borrowed divisions') }, { text: t('摇摆', 'スウィング', 'swing'), sub: t('演奏方式', '演奏法', 'performance') }, { text: t('切分', 'シンコペ', 'syncopation'), sub: t('重音位置', 'アクセントの位置', 'where accents fall') }] }] },
    tour: [m('row0', t('四个概念各管一件事', '4 つの概念はそれぞれ別のこと', 'four concepts, four jobs'))],
  },
  'blues:1#0': {
    visual: { kind: 'blocks', rows: [['I7', 'I7', 'I7', 'I7'], ['IV7', 'IV7', 'I7', 'I7'], ['V7', 'IV7', 'I7', 'V7']].map((r) => ({ cells: r.map((text) => ({ text })) })) },
    tour: [m(['row0', 'row1', 'row2'], t('三个四小节乐句，全是属七', '4 小節 × 3、すべて属七', 'three 4-bar phrases, all dominant 7ths'))],
  },
  'blues:2#0': {
    visual: { kind: 'blocks', rows: [{ label: 'quick change', cells: cells('I7', { text: 'IV7', lit: true }, 'I7', 'I7') }, { label: t('小调', '短調', 'minor'), cells: cells('im7', 'ivm7', 'im7', 'im7') }] },
    tour: [m('c0-1', t('第 2 小节先去 IV', '2 小節目で IV へ', 'bar 2 visits IV')), m('row1', t('换成小七和弦', 'マイナー 7 に', 'minor sevenths'), 'below')],
  },
  'blues:3#0': {
    visual: { kind: 'blocks', rows: [{ label: t('第 4 小节', '4 小節目', 'bar 4'), arrows: true, cells: cells('ii7', 'V7', { text: t('→ IV', '→ IV', '→ IV'), lit: true }) }, { label: 'Bird blues', arrows: true, cells: cells('ii–V', 'ii–V', 'ii–V', '…') }] },
    tour: [m('row0', t('用 ii–V 走向 IV', 'ii–V で IV へ', 'ii–V leading to IV')), m('row1', t('一连串下行的 ii–V', '下行する ii–V の連続', 'a chain of descending ii–Vs'), 'below')],
  },
  'blues:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: cells('I', 'IV', 'V') }, { cells: cells('quick change', t('小调', '短調', 'minor'), 'bebop', t('爵士', 'ジャズ', 'jazz')) }] },
    tour: [[m('row0', t('基本框架', '基本の枠', 'the basic frame')), m('row1', t('各种改法', 'いろいろな変形', 'variations'), 'below')]],
  },
  'bluesscale:1#0': {
    dropKeys: true,
    visual: piano(60, 72, [60, 63, 65, 66, 67, 70, 72], { names: 'lit', labels: { 66: 'fi' } }),
    tour: [m('k66', t('小调五声 + 经过音 fi', '短調ペンタ + 経過音 fi', 'minor pentatonic + passing fi'))],
  },
  'bluesscale:2#0': {
    visual: piano(57, 72, [60, 62, 63, 64, 67, 69], { names: 'white' }),
    tour: [m(keys(60, 69), t('C D D♯ E G A', 'C D D♯ E G A', 'C D D♯ E G A')), m(keys(57, 67), t('A 布鲁斯音阶：同一组音', 'A ブルース：同じ音', 'A blues: the same notes'), 'below')],
  },
  'bluesscale:3#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'a', sub: t('唱一句', '1 行歌う', 'sing a line') }, { text: 'a', sub: t('重复', '繰り返す', 'repeat') }, { text: 'b', sub: t('对比', '対比', 'contrast'), lit: true }] }, { arrows: true, cells: cells(t('人声', '歌', 'voice'), t('乐器应答', '楽器が応える', 'instrument answers')) }] },
    tour: [m('row0', 'aab'), m('row1', t('问答', 'コール・アンド・レスポンス', 'call and response'), 'below')],
  },
  'bluesscale:4#0': {
    visual: piano(60, 72, [60, 63, 64, 67, 70], { names: 'white', labels: { 63: 'me', 64: 'mi' } }),
    tour: [m(keys(63, 64), t('me 和 mi 撞在一起', 'me と mi がぶつかる', 'me and mi rub together'))],
  },
  'jazz:1#0': {
    visual: { kind: 'blocks', rows: [{ label: t('大调', '長調', 'major'), arrows: true, cells: [{ text: 'ii7', sub: 'm7' }, { text: 'V7', sub: '7' }, { text: 'Imaj7', sub: 'maj7' }] }, { label: t('小调', '短調', 'minor'), arrows: true, cells: [{ text: 'ii∅7', sub: '∅7' }, { text: 'V7', sub: '7' }, { text: 'i7', sub: 'm7' }] }] },
    tour: [m(['row0', 'row1'], t('根音五度下行 + 固定性质', '根音が 5 度下行 + 決まった性質', 'roots down in fifths + fixed qualities')), null],
  },
  'jazz:2#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'Bm7', sub: 'ii/vi', lit: true, play: [47, 50, 54, 57] }, { text: 'E7', sub: 'V/vi', play: [40, 50, 52, 56] }, { text: 'Am', sub: 'vi', play: [45, 48, 52, 55] }] }] },
    tour: [m('c0-0', t('属七前面加一个 ii', '属七の前に ii', 'add a ii before the dominant')), m('row0', t('一个小的 ii–V', '小さな ii–V', 'a small ii–V'), 'below')],
  },
  'jazz:3#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'Dm7♭5', sub: 'ii∅7', play: [50, 53, 56, 60] }, { text: 'G7', sub: 'V7', play: [43, 53, 55, 59] }, { text: 'Cm7', sub: 'i7', play: [48, 51, 55, 58] }] }] },
    tour: [m('c0-0', t('小调的 ii 是半减七', '短調の ii は半減七', 'minor ii is half-diminished')), m('c0-1', t('大调里也常加 ♭9', '長調でも ♭9 を足す', 'major keys borrow ♭9 too'), 'below')],
  },
  'jazz:4#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'ii7', sub: 'Dorian' }, { text: 'V7', sub: 'Mixolydian' }, { text: 'Imaj7', sub: 'Ionian' }] }] },
    tour: [m('row0', t('最先学的三种对应', '最初に覚える 3 つ', 'the first three pairings'))],
  },
  'chordscale:1#0': {
    visual: { kind: 'blocks', rows: [{ cells: [['I', 'Ionian'], ['ii', 'Dorian'], ['iii', 'Phrygian'], ['IV', 'Lydian']].map(([text, sub]) => ({ text, sub })) }, { cells: [['V', 'Mixolydian'], ['vi', 'Aeolian'], ['vii', 'Locrian']].map(([text, sub]) => ({ text, sub })) }] },
    tour: [m(['row0', 'row1'], t('第几级 = 第几个调式', '何度 = 何番目の旋法', 'degree = mode number'))],
  },
  'chordscale:2#0': {
    visual: { kind: 'blocks', rows: [{ label: 'm7', cells: [{ text: 'ii', sub: 'Dorian' }, { text: 'iii', sub: 'Phrygian' }, { text: 'vi', sub: 'Aeolian' }] }, { label: 'maj7', cells: [{ text: 'I', sub: 'Ionian' }, { text: 'IV', sub: 'Lydian' }] }] },
    tour: [m('row0', t('同是小七，按级数选', '同じ m7 でも度数で選ぶ', 'same m7, choose by degree')), m('row1', t('区分 I 和 IV', 'I と IV を区別', 'tell I from IV'), 'below')],
  },
  'chordscale:3#0': {
    visual: { kind: 'blocks', rows: [{ label: t('缺少', '足りない', 'missing'), cells: cells(t('声部进行', '声部進行', 'voice leading'), t('半音装饰', '半音の装飾', 'chromaticism'), t('蓝调音', 'ブルー・ノート', 'blue notes')) }, { label: t('补上', '補う', 'add'), cells: cells(t('听唱片', 'レコードを聴く', 'listen'), t('扒谱', '耳コピ', 'transcribe'), t('一起即兴', '一緒に即興', 'play together')) }] },
    tour: [m('c0-0', t('没讲和弦之间的连接', '和音のつながりがない', 'ignores connections between chords')), m('row1', t('替代不了耳朵', '耳の代わりにはならない', 'no substitute for ears'), 'below')],
  },
  'chordscale:4#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: cells(t('罗马数字', 'ローマ数字', 'Roman numeral'), t('调式', '旋法', 'mode')) }] },
    tour: [m('row0', t('先分析，再选调式（不是转调）', '分析してから旋法（転調ではない）', 'analyse, then choose a mode (no key change)'))],
  },
  'melodicminor:1#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: t('找母音阶', '親音階を探す', 'find the parent') }, { text: t('从那个音写七个字母', 'その音から 7 文字', 'seven letters from that note') }] }] },
    tour: [m('row0', t('先写爵士小调，再换起点', 'ジャズ・マイナーを書いて始点を替える', 'write jazz minor, change the start'))],
  },
  'melodicminor:2#0': {
    visual: piano(60, 72, [60, 62, 64, 66, 67, 69, 70, 72], { names: 'white', labels: { 66: '♯4', 70: '♭7' } }),
    tour: [m(keys(66, 70), t('大调升 4 降 7 = Lydian dominant', '♯4・♭7 = リディアン・ドミナント', '♯4 and ♭7 = Lydian dominant')), m(keys(68, 70), t('Mixolydian ♭6：降 6 降 7', 'ミクソリディアン ♭6：♭6・♭7', 'Mixolydian ♭6: ♭6 and ♭7'), 'below')],
  },
  'melodicminor:3#0': {
    visual: piano(55, 67, [55, 56, 58, 59, 61, 63, 65, 67], { names: 'white', labels: { 56: '♭9', 58: '♯9', 61: '♭5', 63: '♯5' } }),
    tour: [m(keys(56, 58, 61, 63), t('其余全是变化音', 'ほかはすべて変化音', 'everything else is altered')), m('k55', t('Locrian ♮2：配 m7♭5', 'ロクリアン ♮2：m7♭5 に', 'Locrian ♮2: for m7♭5'), 'below')],
  },
  'melodicminor:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: cells(t('爵士小调', 'ジャズ・マイナー', 'jazz minor'), 'Dorian ♭2', 'Lydian aug.', 'Lydian dom.') }, { cells: cells('Mixolydian ♭6', 'Locrian ♮2', 'Altered') }] },
    tour: [m(['row0', 'row1'], t('一个母音阶，七个调式', '1 つの親音階、7 つの旋法', 'one parent, seven modes'))],
  },
  'harmonicminor:1#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'Phrygian dom.', sub: '♭2–3' }, { text: 'Lydian ♯2', sub: '1–♯2' }, { text: 'Dorian ♯4', sub: '♭3–♯4' }] }] },
    tour: [m('row0', t('增二度落在不同位置', '増 2 度の位置が違う', 'the augmented 2nd moves around'))],
  },
  'harmonicminor:2#0': {
    visual: piano(60, 72, [60, 63, 64, 66, 67, 69, 71, 72], { names: 'white', labels: { 63: '♯2', 66: '♯4' } }),
    tour: [m('k63', t('Lydian 再升高第 2 音', 'リディアンの 2 音も上げる', 'Lydian with a raised 2')), m(keys(62, 66), t('Dorian ♯4：C D E♭ F♯ G A B♭', 'ドリアン ♯4：C D E♭ F♯ G A B♭', 'Dorian ♯4: C D E♭ F♯ G A B♭'), 'below')],
  },
  'harmonicminor:3#0': {
    visual: piano(60, 72, [60, 62, 64, 65, 67, 68, 71, 72], { names: 'white', labels: { 68: '♭6' } }),
    tour: [m('k68', t('大调只降第 6 音', '長調の 6 音だけ下げる', 'major with only 6 lowered')), null],
  },
  'harmonicminor:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: cells(t('和声小调', '和声的短音階', 'harmonic minor'), 'Locrian ♮6', 'Ionian ♯5', 'Dorian ♯4') }, { cells: cells('Phrygian dom.', 'Lydian ♯2', 'Super-Locrian ♭♭7') }] },
    tour: [m(['row0', 'row1'], t('增二度的七种位置', '増 2 度の 7 つの位置', 'seven homes for the augmented 2nd'))],
  },
  'symmetric:1#0': {
    visual: piano(60, 72, [60, 62, 64, 66, 68, 70], { names: 'lit' }),
    tour: [[m(keys(60, 64, 68), 'C E G♯'), m(keys(62, 66, 70), t('D F♯ A♯：相差大二度', 'D F♯ A♯：長 2 度違い', 'D F♯ A♯: a major 2nd apart'), 'below')], null],
  },
  'symmetric:2#0': {
    visual: piano(60, 72, [60, 62, 63, 65, 66, 68, 69, 71, 72], { names: 'white' }),
    tour: [m(keys(60, 62, 63), t('W-H：先全后半，配 dim7', 'W-H：全半、dim7 に', 'W-H: whole then half, for dim7')), m(keys(60, 61, 63), t('H-W：先半后全，配属七', 'H-W：半全、属七に', 'H-W: half then whole, for dom7'), 'below')],
  },
  'symmetric:3#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('第一种', '第 1', 'mode 1'), sub: t('全音：2 个版本', '全音：2 通り', 'whole-tone: 2 versions') }, { text: t('第二种', '第 2', 'mode 2'), sub: t('八声：3 个版本', '八音：3 通り', 'octatonic: 3 versions') }] }] },
    tour: [m('row0', t('移位几次就回到同一组音', '数回の移高で同じ音に戻る', 'only a few distinct transpositions'))],
  },
  'symmetric:4#0': {
    visual: { kind: 'blocks', rows: [{ label: t('全音', '全音', 'whole-tone'), cells: cells(t('6 个音', '6 音', '6 notes'), t('2 个版本', '2 通り', '2 versions'), '7♯5') }, { label: t('减音阶', 'ディミニッシュ', 'diminished'), cells: cells(t('8 个音', '8 音', '8 notes'), t('3 个版本', '3 通り', '3 versions'), 'dim7 / 7') }] },
    tour: [m(['row0', 'row1'], t('6 个音或 8 个音', '6 音か 8 音', 'six notes or eight'))],
  },
  'morescales:1#0': {
    visual: piano(60, 72, [60, 61, 63, 65, 67, 68, 71, 72], { names: 'white', labels: { 61: '♭2', 68: '♭6' } }),
    tour: [m('k61', t('和声小调降 2', '和声的短音階の 2 を下げる', 'harmonic minor with ♭2')), m(keys(63, 68), t('都有小三度，区别在第 6 音', 'どちらも短 3 度、違いは 6 音', 'both have a minor 3rd; they differ at 6'), 'below')],
  },
  'morescales:2#0': {
    visual: piano(60, 72, [60, 61, 64, 65, 67, 68, 71, 72], { names: 'white' }),
    tour: [[m(keys(61, 64), t('增二', '増 2', 'aug 2nd')), m(keys(68, 71), t('增二', '増 2', 'aug 2nd'))], m(keys(60, 72), t('和 Bhairav 同音', 'バイラヴと同じ音', 'same notes as Bhairav'), 'below')],
  },
  'morescales:3#0': {
    visual: piano(60, 72, [60, 62, 64, 65, 67, 69, 70, 71, 72], { names: 'white', labels: { 71: t('加的音', '追加', 'added') } }),
    tour: [m(keys(70, 71, 72), t('♭7 和 1 之间加一个音', '♭7 と 1 の間に 1 音', 'one note between ♭7 and 1')), m(keys(60, 64, 67, 70), t('和弦音落在正拍', '和音の音が表拍に', 'chord tones on the beat'), 'below')],
  },
  'morescales:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: '1', sub: t('哪些音？', 'どの音？', 'which notes?') }, { text: '2', sub: t('配什么和弦？', 'どの和音？', 'which chord?') }, { text: '3', sub: t('哪个母音阶？', 'どの親音階？', 'which parent?') }] }] },
    tour: [m('row0', t('三个问题', '3 つの質問', 'three questions'))],
  },
  'jazzvoicing:1#0': {
    visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [{ p: 'G2', s: 1, col: 0, d: 'w', label: 'G7' }, { p: 'F3', s: 1, col: 0, d: 'w' }, { p: 'B3', s: 1, col: 0, d: 'w' }, { p: 'C3', s: 1, col: 1, d: 'w', label: 'Cmaj7' }, { p: 'E3', s: 1, col: 1, d: 'w' }, { p: 'B3', s: 1, col: 1, d: 'w' }] },
    tour: [m(heads(1, 2, 4, 5), t('只放三音和七音', '3 音と 7 音だけ', 'only the 3rd and 7th')), m(['staff0', 'staff1'], t('低音区宽、高音区窄', '低音域は広く、高音域は狭く', 'wide low, narrow high'))],
  },
  'jazzvoicing:2#0': {
    visual: staffOf('treble', [...chord(0, ['C4', 'E4', 'G4', 'B4'], { label: t('紧密', '密集', 'close') }), ...chord(1, ['G3', 'C4', 'E4', 'B4'], { label: 'drop 2' }), ...chord(2, ['E3', 'C4', 'G4', 'B4'], { label: 'drop 3' })]),
    tour: [m(['n4', 'n9'], t('从上往下数第二个 / 第三个降八度', '上から 2 番目 / 3 番目を下げる', 'drop the 2nd / 3rd from the top'))],
  },
  'jazzvoicing:3#0': {
    visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [{ p: 'E3', s: 1, col: 0, d: 'w', label: 'Em11' }, { p: 'A3', s: 1, col: 0, d: 'w' }, { p: 'D4', s: 0, col: 0, d: 'w' }, { p: 'G4', s: 0, col: 0, d: 'w' }, { p: 'B4', s: 0, col: 0, d: 'w' }] },
    tour: [[m(heads(0, 1, 2, 3), t('三个纯四度', '完全 4 度 × 3', 'three perfect 4ths'), 'below'), m(heads(3, 4), t('+ 大三度', '+ 長 3 度', '+ a major 3rd'))], m(ns(0, 1, 2, 3, 4), t('Bill Evans 在《So What》里用', 'ビル・エヴァンスが《So What》で', 'Bill Evans on "So What"'))],
  },
  'jazzvoicing:4#0': {
    visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [{ p: 'E3', s: 1, col: 0, d: 'w', label: 'C7' }, { p: 'Bb3', s: 1, col: 0, d: 'w' }, { p: 'D4', s: 0, col: 0, d: 'w' }, { p: 'F#4', s: 0, col: 0, d: 'w' }, { p: 'A4', s: 0, col: 0, d: 'w' }] },
    tour: [m(heads(0, 1), t('左手：E、B♭（三全音）', '左手：E・B♭（三全音）', 'left hand: E, B♭ (tritone)'), 'below'), m(heads(2, 3, 4), t('右手 D 大三和弦 = 9、♯11、13', '右手 D = 9・♯11・13', 'right hand D = 9, ♯11, 13'))],
  },
  'substitutions:1#0': {
    visual: piano(60, 72, [65, 71], { names: 'white', labels: { 65: 'F', 71: 'B / C♭' } }),
    tour: [m(keys(65, 71), t('G7 和 D♭7 共享 B–F', 'G7 と D♭7 は B–F を共有', 'G7 and D♭7 share B–F'))],
  },
  'substitutions:2#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'C' }, { text: 'Am → A7', lit: true }, { text: 'Dm' }, { text: 'G7' }] }, { cells: [{ text: 'ii7 → ii∅7', sub: 'la → le' }, { text: 'V7 → V7♭9', sub: 'la → le' }] }] },
    tour: [m('c0-1', t('换成同根音的属七', '同じ根音の属七に', 'make it a dominant on the same root')), m('row1', t('用 le 代替 la', 'la の代わりに le', 'le replaces la'), 'below')],
  },
  'substitutions:3#0': {
    visual: { kind: 'blocks', rows: [{ label: t('正门', '表門', 'front door'), arrows: true, cells: cells('Dm7', 'G7', 'C') }, { label: t('后门', '裏門', 'back door'), arrows: true, cells: [{ text: 'Fm7' }, { text: 'B♭7', lit: true }, { text: 'C' }] }] },
    tour: [m('row1', t('iv7 – ♭VII7 – I', 'iv7 – ♭VII7 – I', 'iv7 – ♭VII7 – I'), 'below'), m('c1-1', t('B♭ 在属轴上', 'B♭ は属軸の上', 'B♭ lies on the dominant axis'))],
  },
  'substitutions:4#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: cells('Dm7', 'E♭7', { text: 'A♭maj7', lit: true }, 'B7', { text: 'Emaj7', lit: true }, 'G7', { text: 'Cmaj7', lit: true }) }] },
    tour: [m(['c0-2', 'c0-4', 'c0-6'], t('三个相隔大三度的调中心', '長 3 度離れた 3 つの中心', 'three centres a major third apart')), m('row0', t('《Giant Steps》', '《Giant Steps》', '"Giant Steps"'), 'below')],
  },
  'color:1#0': {
    visual: piano(55, 67, [55, 56, 58, 59, 61, 63, 65, 67], { names: 'white', labels: { 56: '♭9', 58: '♯9', 61: '♭5', 63: '♯5' } }),
    tour: [m(keys(56, 58, 61, 63), t('四个变化音', '4 つの変化音', 'four altered tones')), m(keys(55, 59, 65), t('选几个变化音，每次可以不同', '変化音を選ぶ、毎回違ってよい', 'pick some altered tones — any each time'), 'below')],
  },
  'color:2#0': {
    visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [{ p: 'C3', s: 1, col: 0, d: 'w', label: 'Cblk' }, { p: 'Bb3', s: 1, col: 0, d: 'w' }, { p: 'D4', s: 0, col: 0, d: 'w' }, { p: 'F#4', s: 0, col: 0, d: 'w' }] },
    tour: [[m(heads(1, 2, 3), t('B♭ 增三和弦', 'B♭ 増三和音', 'B♭ augmented')), m('head0', t('低全音的低音 C', '全音下のバス C', 'bass a whole step lower: C'), 'below')], m(ns(0, 1, 2, 3), t('音全部来自全音音阶', 'すべて全音音階の音', 'all from the whole-tone scale'))],
  },
  'color:3#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'V+7' }, { text: 'III+', sub: t('和声小调', '和声的短音階', 'harmonic minor') }, { text: 'Imaj7♯5' }] }] },
    tour: [m('row0', t('增三和弦出现的三个地方', '増三和音が出る 3 か所', 'three homes for the augmented triad'))],
  },
  'color:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'alt', sub: t('属七 + 变化音', '属七 + 変化音', 'dom7 + alterations') }, { text: 'blk', sub: t('增三 + 低全音', '増三 + 全音下', 'aug + bass a tone below') }, { text: 'aug', sub: t('两个大三度', '長 3 度 × 2', 'two major thirds') }] }] },
    tour: [m('row0', t('三种"紧"的颜色', '3 つの緊張した色', 'three tense colours'))],
  },
  'lcc:1#0': {
    tour: [m(['M:C', 'M:G', 'M:D', 'M:A', 'M:E', 'M:B', 'M:F#'], t('调性顺序：一路叠五度', '調性の順序：5 度を重ねる', 'tonal order: stacked fifths')), [m(['M:C', 'M:G', 'M:D'], 'ingoing'), m(['M:B', 'M:F#'], 'outgoing', 'below')]],
  },
  'lcc:2#0': {
    visual: { kind: 'blocks', rows: [{ label: t('主要', '主要', 'principal'), cells: cells('Lydian', 'Lyd. Aug.', 'Lyd. Dim.', 'Lyd. ♭7') }, { label: t('辅助', '補助', 'auxiliary'), cells: [{ text: 'Aux. Aug.', sub: t('全音', '全音', 'whole-tone') }, { text: 'Aux. Dim.', sub: 'W-H' }, { text: 'Aux. Dim. Blues', sub: 'H-W' }] }] },
    tour: [m(['row0', 'row1'], t('七个主要音阶', '7 つの主要音階', 'seven principal scales')), m('row1', t('辅助音阶 = 全音、减、属减', '補助 = 全音・ディミニッシュ・コンディミ', 'auxiliaries = whole-tone, dim, dom-dim'), 'below')],
  },
  'lcc:3#0': {
    visual: piano(60, 77, [65, 67, 69, 71, 72, 74, 76], { names: 'white', labels: { 65: t('Lydian 主音', 'リディアン主音', 'Lydian tonic'), 67: 'G7' } }),
    tour: [m(keys(65, 76), t('G7 用 F Lydian', 'G7 は F リディアン', 'G7 uses F Lydian')), m(keys(65, 67), t('G → F：Lydian Tonic Interval', 'G → F：リディアン・トニック・インターヴァル', 'G → F: the Lydian tonic interval'), 'below')],
  },
  'lcc:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('垂直', '垂直', 'vertical'), sub: t('一个和弦、一个母音阶', '1 和音・1 親音階', 'one chord, one parent') }, { text: t('水平', '水平', 'horizontal'), sub: t('跨和弦、走向解决', '和音をまたぎ解決へ', 'across chords, toward resolution') }] }] },
    tour: [m('row0', t('先垂直，再水平', '垂直から水平へ', 'vertical first, then horizontal'))],
  },
  'keycenter:1#0': {
    visual: { kind: 'blocks', rows: [{ cells: [['I', 1], ['ii', 0], ['iii', 0], ['IV', 1], ['V', 1], ['vi', 0], ['vii°', 2]].map(([text, k]) => ({ text, lit: k === 1 || k === 2 })) }] },
    tour: [m(['c0-3', 'c0-4'], t('两个相邻的大三和弦：IV、V', '隣り合う 2 つの長三和音：IV・V', 'two adjacent majors: IV, V'))],
  },
  'keycenter:2#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'G7' }, { text: 'C', sub: t('强功能进行', '強進行', 'dominant motion'), lit: true }] }, { arrows: true, cells: [{ text: 'Dm7' }, { text: 'G7', sub: t('下五度进行', '5 度下行', 'down a fifth') }] }] },
    tour: [[m('row0', t('属七 + 根音上行四度', '属七 + 根音 4 度上', 'dom7 + root up a fourth')), m('row1', t('不是属七：普通下五度', '属七でない：普通の 5 度下行', 'not a dom7: plain down-a-fifth'), 'below')]],
  },
  'keycenter:3#0': {
    visual: piano(57, 69, [57, 59, 60, 62, 64, 65, 68, 69], { names: 'white', labels: { 68: 'G♯' } }),
    tour: [m(keys(57, 69), t('试三种音阶：音在里面加分', '3 つの音階を試す', 'try three scales, score the fits')), m('k68', t('E7 的 G♯：和声小调得分高', 'E7 の G♯：和声的短音階が高得点', 'E7’s G♯ favours harmonic minor'), 'below')],
  },
  'keycenter:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('临时记号', '臨時記号', 'accidentals'), sub: t('线索', '手がかり', 'clue') }, { text: t('终止式', '終止', 'cadence'), sub: t('证据', '証拠', 'proof') }, { text: t('分数', '得点', 'score'), sub: t('参考', '参考', 'reference') }] }] },
    tour: [m('row0', t('三者结合判断', '3 つを合わせて判断', 'combine all three'))],
  },
  'negharmony:1#0': {
    visual: { kind: 'clock', pcs: [0, 7], mirror: 7, names: true },
    tour: [m('mirror', t('主音和属音的中点', '主音と属音の中点', 'midpoint of tonic and dominant'))],
  },
  'negharmony:2#0': {
    visual: { kind: 'clock', pcs: [7, 11, 2, 5], mirror: 7, names: true },
    tour: [m(['pc7', 'pc11', 'pc2', 'pc5'], t('G7 → 翻过去是 Dm7♭5', 'G7 → 反転して Dm7♭5', 'G7 flips to Dm7♭5')), m('mirror', t('引力不变：都回到 C', '引力は同じ：どちらも C へ', 'same pull: both go home to C'))],
  },
  'negharmony:3#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'Zarlino', sub: t('16 世纪', '16 世紀', '16th c.') }, { text: 'Riemann', sub: t('和声二元论', '和声二元論', 'dualism') }, { text: 'Levy', sub: t('中点翻转', '中点で反転', 'midpoint axis') }, { text: 'Coleman / Collier' }] }] },
    tour: [m(['c0-0', 'c0-1'], t('上叠是大三，下叠是小三', '上に積むと長、下に積むと短', 'stacked up: major; down: minor')), m(['c0-2', 'c0-3'], t('Levy 移到中点；Coleman 命名', 'Levy が中点へ、Coleman が命名', 'Levy moved the axis; Coleman named it'), 'below')],
  },
  'negharmony:4#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: t('和弦', '和音', 'chord') }, { text: t('轴（主音）', '軸（主音）', 'axis (tonic)') }, { text: t('翻过去', '反転', 'flipped'), lit: true }] }] },
    tour: [m('row0', t('输入和弦和轴', '和音と軸を入力', 'enter a chord and an axis'))],
  },
  'guidetone:1#0': {
    visual: staffOf('treble', [...chord(0, ['G4', 'B4', 'D5', 'F5'], { label: 'G7' })].map((n, i) => ({ ...n, lit: i === 1 || i === 3 }))),
    tour: [m(heads(1, 3), t('三音 + 七音', '3 音 + 7 音', '3rd + 7th'))],
  },
  'guidetone:2#0': {
    visual: staffOf('treble', [{ p: 'F4', col: 0, d: 'h', label: 'Dm7' }, { p: 'C5', col: 0, d: 'h' }, { p: 'F4', col: 1, d: 'h', label: 'G7' }, { p: 'B4', col: 1, d: 'h' }, { p: 'E4', col: 2, d: 'h', label: 'Cmaj7' }, { p: 'B4', col: 2, d: 'h' }]),
    tour: [m(heads(0, 2, 4), t('三音 → 七音 → 三音', '3 音 → 7 音 → 3 音', '3rd → 7th → 3rd')), [m(heads(0, 2, 4), 'F–F–E', 'below'), m(heads(1, 3, 5), 'C–B–B')]],
  },
  'guidetone:3#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('壳音', 'シェル', 'shell'), sub: t('根 + 三 + 七', '根・3・7', 'R + 3 + 7') }, { text: 'drop 2' }, { text: t('伴奏型', 'コンピング', 'comping'), sub: 'Charleston…' }] }] },
    tour: [m('row0', t('和弦报告给出的配置和节奏', 'コード・レポートの配置とリズム', 'voicings and rhythms in the report'))],
  },
  'guidetone:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('替代和弦', '代理和音', 'substitutes'), sub: t('三全音替代等', '裏コードなど', 'tritone sub…') }, { text: 'CST', sub: t('按亮度排序', '明るさ順', 'by brightness') }, { text: 'LCC', sub: t('母音阶候选', '親音階の候補', 'parent candidates') }] }] },
    tour: [m('row0', t('换什么、弹什么', '何に替え、何を弾くか', 'what to swap, what to play'))],
  },

  // ======================= 民族与律学 =======================
  'world:1#0': {
    visual: { kind: 'blocks', rows: [{ label: 'Rast', cells: [{ text: 'C' }, { text: 'D', sub: '1' }, { text: 'E½♭', sub: '¾', lit: true }, { text: 'F', sub: '¾' }, { text: 'G', sub: '1' }] }, { cells: [{ text: 'Bayati', sub: '¾ ¾ 1' }, { text: 'Hijaz', sub: '½ 1½ ½' }, { text: 'Kurd', sub: '½ 1 1' }] }] },
    tour: [m('row0', t('以全音为单位：1、¾、½、1½', '全音単位：1・¾・½・1½', 'in whole tones: 1, ¾, ½, 1½')), m('row1', t('不同 jins 的台阶', 'ジンスごとの段差', 'steps of other ajnas'), 'below')],
  },
  'world:2#0': {
    visual: { kind: 'blocks', rows: [{ label: 'Maqam Rast', cells: [{ text: t('Jins Rast', 'ジンス・ラスト', 'Jins Rast'), sub: t('第 1 级', '第 1 度', 'degree 1') }, { text: t('Upper Rast / Nahawand', '上のラスト / ナハワンド', 'Upper Rast / Nahawand'), sub: t('第 5 级', '第 5 度', 'degree 5') }] }, { label: 'Bayati · Hijaz', cells: [{ text: t('下面的 jins', '下のジンス', 'lower jins'), sub: t('第 1 级', '第 1 度', 'degree 1') }, { text: 'Nahawand / Rast', sub: t('第 4 级', '第 4 度', 'degree 4') }] }] },
    tour: [m('row0', t('下面一个，上面一个（可换）', '下に 1 つ、上に 1 つ（交換可）', 'one below, one above (swappable)')), m('row1', t('上面的 jins 在第 4 级', '上のジンスは第 4 度', 'upper jins on degree 4'), 'below')],
  },
  'world:3#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'bakiye', sub: '4' }, { text: 'küçük m.', sub: '5' }, { text: 'büyük m.', sub: '8' }, { text: 'tanîni', sub: '9' }] }, { cells: [{ text: 'Rast', sub: t('起点', '始まり', 'start') }, { text: 'Nevâ', sub: t('主导音', '主音的', 'dominant') }] }] },
    tour: [m('row0', t('53 koma 里的音程名（koma 数）', '53 コマの音程名（コマ数）', 'interval names (in koma)')), m('row1', t('Makam Rast：从 Rast 开始，主导音 Nevâ', 'マカーム・ラスト：Rast から、主要音 Nevâ', 'Makam Rast: from Rast, dominant Nevâ'), 'below')],
  },
  'world:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('音', '音', 'notes'), sub: t('骨架', '骨組み', 'skeleton'), lit: true }, { text: t('旋律走向', '旋律の流れ', 'melodic path') }, { text: t('装饰', '装飾', 'ornaments') }, { text: t('用法', '使い方', 'usage') }] }] },
    tour: [m('c0-0', t('这里练的是骨架', 'ここで練習するのは骨組み', 'here we practise the skeleton'))],
  },
  'thaat:1#0': {
    visual: { kind: 'blocks', rows: [{ cells: [['Bilaval', 'Ionian'], ['Kalyan', 'Lydian'], ['Khamaj', 'Mixolydian']].map(([text, sub]) => ({ text, sub })) }, { cells: [['Kafi', 'Dorian'], ['Asavari', 'Aeolian'], ['Bhairavi', 'Phrygian']].map(([text, sub]) => ({ text, sub })) }, { cells: [{ text: 'Bhairav', sub: t('双和声', '二重和声', 'double harmonic') }, { text: 'Poorvi · Marva · Todi', sub: t('别的组合', '別の組み合わせ', 'other combinations') }] }] },
    tour: [m(['row0', 'row1'], t('六个和教会调式同音', '6 つは教会旋法と同じ音', 'six match the church modes'))],
  },
  'thaat:2#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'Sa', sub: t('不变', '固定', 'fixed') }, { text: 'Re', sub: '♮ / komal' }, { text: 'Ga', sub: '♮ / komal' }, { text: 'Ma', sub: '♮ / tivra' }, { text: 'Pa', sub: t('不变', '固定', 'fixed') }, { text: 'Dha', sub: '♮ / komal' }, { text: 'Ni', sub: '♮ / komal' }] }] },
    tour: [m(['c0-0', 'c0-4'], t('Sa、Pa 不变', 'Sa・Pa は固定', 'Sa and Pa fixed')), m(['c0-1', 'c0-6'], t('五个可变 → 2⁵ = 32 种', '5 つが可変 → 2⁵ = 32', 'five variable → 2⁵ = 32'), 'below')],
  },
  'thaat:3#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'thaat', sub: t('北印度', '北インド', 'north') }, { text: 'melakarta', sub: t('南印度 · 约 1640', '南インド · 約 1640', 'south · c. 1640') }] }, { arrows: true, cells: [{ text: 'Bilaval' }, { text: t('第 29 号 Sankarabharanam', '第 29 番 サンカラーバラナム', 'No. 29 Sankarabharanam') }] }] },
    tour: [m('row0', t('南北两套母音阶', '南北 2 つの親音階', 'two parent-scale systems')), m('row1', t('Bilaval ↔ 第 29 号', 'Bilaval ↔ 第 29 番', 'Bilaval ↔ No. 29'), 'below')],
  },
  'thaat:4#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'thaat', sub: t('分类', '分類', 'classifies') }, { text: t('拉格', 'ラーガ', 'raga'), sub: t('可能少用或多用音', '音が増減することも', 'may omit or add notes') }] }] },
    tour: [m('row0', t('分类工具，不是作曲规则', '分類の道具で作曲規則ではない', 'a classification, not a rule'))],
  },
  'heptatonic:1#0': {
    visual: piano(60, 72, [60, 62, 64, 67, 69], { names: 'white', labels: { 65: t('清角 fa', '清角 fa', 'qj. fa'), 66: '♯fa', 70: '♭ti', 71: t('变宫 ti', '変宮 ti', 'bg. ti') } }),
    tour: [m(keys(65, 66, 70, 71), t('以宫为 do：清角 fa、变徵 ♯fa、闰 ♭ti、变宫 ti', '宮を do に：fa・♯fa・♭ti・ti', 'gong as do: fa, ♯fa, ♭ti, ti'))],
  },
  'heptatonic:2#0': {
    visual: { kind: 'blocks', rows: [{ label: t('清乐', '清楽', 'qingyue'), cells: cells(t('新音阶', '新音階', 'new scale'), t('下徵音阶', '下徴音階', 'xiazhi')) }, { label: t('燕乐', '燕楽', 'yanyue'), cells: cells(t('俗乐音阶', '俗楽音階', 'folk scale'), t('清商音阶', '清商音階', 'qingshang')) }, { label: t('雅乐', '雅楽', 'yayue'), cells: cells(t('古音阶', '古音階', 'old scale'), t('正声音阶', '正声音階', 'zhengsheng')) }] },
    tour: [m(['row0', 'row1', 'row2'], t('三种七声音阶的别名', '3 つの七声音階の別名', 'other names of the three scales'))],
  },
  'heptatonic:3#0': {
    visual: { kind: 'blocks', rows: [{ label: t('同宫', '同宮', 'same gong'), arrows: true, cells: cells(t('宫', '宮', 'gong'), t('商', '商', 'shang'), t('角', '角', 'jue'), t('徵', '徴', 'zhi'), t('羽', '羽', 'yu'), t('宫', '宮', 'gong')) }, { label: t('异宫', '異宮', 'new gong'), arrows: true, cells: cells(t('角弦', '角弦', 'jue string'), { text: t('成为宫弦', '宮弦になる', 'becomes gong'), lit: true }) }] },
    tour: [m('row0', t('五调朝元：宫不变，换主音', '五調朝元：宮は同じ、主音が替わる', 'gong stays, the tonic rotates')), m('row1', t('宫音本身移到另一律', '宮そのものが別の律へ', 'gong itself moves'), 'below')],
  },
  'heptatonic:4#0': {
    visual: piano(60, 72, [60, 62, 64, 65, 67, 69, 71], { names: 'white', labels: { 60: t('宫', '宮', 'gong'), 62: t('商', '商', 'sh.'), 64: t('角', '角', 'jue'), 67: t('徵', '徴', 'zhi'), 69: t('羽', '羽', 'yu') } }),
    tour: [m(keys(60, 62, 64, 67, 69), t('主音一般是五个正音之一', '主音は 5 つの正音のどれか', 'the tonic is one of the five main notes'))],
  },
  'temperaments:1#0': {
    visual: { kind: 'circle', highlight: [] },
    tour: [m(['M:Eb', 'M:Bb', 'M:F', 'M:C', 'M:G', 'M:D', 'M:A', 'M:E', 'M:B', 'M:F#', 'M:Db', 'M:Ab'], t('11 个纯五度：E♭ 到 G♯', '純正 5 度 11 個：E♭ → G♯', '11 pure fifths: E♭ to G♯')), m(['M:Ab', 'M:Eb'], t('剩下的狼五度 G♯–E♭', '残るウルフ G♯–E♭', 'the leftover wolf G♯–E♭'))],
  },
  'temperaments:2#0': {
    visual: { kind: 'ruler', from: 380, to: 420, ticks: [{ at: 386.31, label: '5:4' }, { at: 400, label: t('平均律', '平均律', '12-TET') }, { at: 407.82, label: t('毕达哥拉斯', 'ピタゴラス', 'Pythagorean'), up: false }] },
    tour: [m('t0', t('纯大三度 5:4', '純正長 3 度 5:4', 'pure major third 5:4')), m('t0', t('狼五度仍在 G♯–E♭', 'ウルフは G♯–E♭', 'the wolf stays at G♯–E♭'))],
  },
  'temperaments:3#0': {
    visual: { kind: 'ruler', from: 695, to: 705, ticks: [{ at: 700, label: t('平均律 700', '平均律 700', '12-TET 700'), lit: true }, { at: 701.955, label: t('纯五度 ≈ 702', '純正 ≈ 702', 'pure ≈ 702'), up: false }] },
    tour: [m(['t0', 't1'], t('每个五度窄约 2 音分', '5 度ごとに約 2 セント狭い', 'each fifth ~2 cents narrow')), null],
  },
  'temperaments:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('毕达哥拉斯', 'ピタゴラス', 'Pythagorean'), sub: t('五度纯 · 有狼', '5 度純正 · ウルフ', 'pure 5ths · wolf') }, { text: t('中庸全音', 'ミーントーン', 'meantone'), sub: t('三度纯 · 有狼', '3 度純正 · ウルフ', 'pure 3rds · wolf') }, { text: t('平均律', '平均律', 'equal'), sub: t('都差一点', '少しずつずれる', 'all slightly off') }] }] },
    tour: [m('row0', t('五度纯、三度纯，还是都差一点', '5 度か 3 度か、全部少しずつか', 'pure fifths, pure thirds, or all a bit off'))],
  },
  'welltemper:1#0': {
    visual: { kind: 'ruler', from: 0, to: 30, unit: '¢', ticks: [{ at: 1.955, label: '1.955' }, { at: 23.46, label: '23.46', lit: true }], spans: [{ from: 0, to: 23.46, label: '12 × 1.955' }] },
    tour: [m('t0', t('每个纯五度多 1.955 音分', '純正 5 度ごとに 1.955 セント多い', '1.955 cents extra per pure fifth')), m('t1', t('叠 12 个 = 毕达哥拉斯音差', '12 個で = ピタゴラス・コンマ', '12 of them = the Pythagorean comma'))],
  },
  'welltemper:2#0': {
    visual: { kind: 'circle', highlight: [] },
    tour: [m(['M:C', 'M:G', 'M:D', 'M:A'], t('C–G、G–D、D–A 各缩 1/4', 'C–G・G–D・D–A を 1/4 ずつ', 'C–G, G–D, D–A narrowed by ¼')), m(['M:B', 'M:F#', 'M:Db', 'M:Ab', 'M:Eb', 'M:Bb', 'M:F', 'M:E'], t('其余保持纯', 'ほかは純正', 'the rest stay pure'), 'below')],
  },
  'welltemper:3#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: '6 × ⅙', sub: t('缩窄的五度', '狭めた 5 度', 'narrowed fifths'), lit: true }, { text: '6', sub: t('纯五度', '純正 5 度', 'pure fifths') }] }] },
    tour: [m('c0-0', t('6 × 1/6 正好分完一个音差', '6 × 1/6 でコンマを使い切る', '6 × 1/6 uses up one comma'))],
  },
  'welltemper:4#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: t('一个音差', 'コンマ 1 つ', 'one comma') }, { text: t('分给哪几个五度？', 'どの 5 度に配る？', 'which fifths share it?') }] }] },
    tour: [m('row0', t('所有良好律都在回答这个问题', 'すべての良律の問い', 'every well temperament answers this'))],
  },
  'harmonics:1#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: '2 : 1', sub: t('八度', 'オクターヴ', 'octave') }, { text: '3 : 2', sub: t('纯五度', '完全 5 度', 'P5') }, { text: '4 : 3', sub: t('纯四度', '完全 4 度', 'P4') }] }] },
    tour: [m('row0', t('相邻泛音：n : (n−1)', '隣の倍音：n : (n−1)', 'neighbours: n : (n−1)'))],
  },
  'harmonics:2#0': {
    visual: { kind: 'ruler', from: 290, to: 710, ticks: [{ at: 300, label: t('平均小三度', '平均短 3', '12-TET m3') }, { at: 315.64, label: '6:5', up: false }, { at: 700, label: '700' }, { at: 701.955, label: '3:2', up: false }] },
    tour: [m(['t2', 't3'], t('五度很接近：听起来协和', '5 度はほぼ同じ：協和的', 'fifths almost match: consonant'))],
  },
  'harmonics:3#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('分音', '部分音', 'partial'), sub: t('任何正弦波', '任意の正弦波', 'any sine component') }, { text: t('泛音', '倍音', 'overtone'), sub: t('最低分音之上', '最低部分音より上', 'above the lowest') }, { text: t('非谐性', '非調和性', 'inharmonicity'), sub: t('偏离整数倍', '整数倍からずれる', 'off the integer multiples') }] }, { cells: [{ text: t('马林巴、定音鼓', 'マリンバ・ティンパニ', 'marimba, timpani'), sub: t('听得出音高', '音高がわかる', 'definite pitch') }, { text: t('镲、锣', 'シンバル・ゴング', 'cymbals, gongs'), sub: t('听不出', 'わからない', 'no definite pitch') }] }] },
    tour: [m('row0', t('三个名词', '3 つの用語', 'three terms')), m('row1', t('非谐分音也可能听出音高', '非調和でも音高がわかることも', 'inharmonic can still sound pitched'), 'below')],
  },
  'harmonics:4#0': {
    visual: piano(60, 72, [60, 62, 64, 66, 67, 69, 70, 72], { names: 'white', labels: { 66: '♯4', 70: '♭7' } }),
    tour: [m(keys(66, 70), t('升 4、降 7 = Lydian dominant', '♯4・♭7 = リディアン・ドミナント', '♯4, ♭7 = Lydian dominant'))],
  },

  // ======================= 二十世纪与微分音 =======================
  'pitchclass:1#0': {
    visual: { kind: 'clock', pcs: [0, 4, 7], names: true },
    tour: [[m('pc0', 'C = 0'), m(['pc10', 'pc11'], t('10 = t，11 = e', '10 = t、11 = e', '10 = t, 11 = e'), 'below')]],
  },
  'pitchclass:2#0': {
    visual: { kind: 'clock', pcs: [2, 11], names: true },
    tour: [m(['pc11', 'pc0', 'pc1', 'pc2'], t('短的一边：3 步 → 音程级 3', '短い側：3 歩 → 音程クラス 3', 'short way: 3 steps → ic 3'))],
  },
  'pitchclass:3#0': {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: t('有序音高', '順序つき音高', 'ordered pitch'), sub: '+/−' }, { text: t('无序音高', '順序なし音高', 'unordered pitch') }, { text: t('有序音级', '順序つき音級', 'ordered pc'), sub: t('顺时针', '時計回り', 'clockwise') }, { text: t('音程级', '音程クラス', 'interval class'), sub: '0–6' }] }] },
    tour: [m(['c0-0', 'c0-1'], t('最具体的两种', 'いちばん具体的な 2 つ', 'the two most concrete')), m(['c0-2', 'c0-3'], t('越来越抽象', 'だんだん抽象的に', 'more and more abstract'), 'below')],
  },
  'pitchclass:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('大三度', '長 3 度', 'M3'), sub: '= 4' }, { text: t('纯五度', '完全 5 度', 'P5'), sub: '= 7' }, { text: t('三全音', '三全音', 'tritone'), sub: '= 6' }] }] },
    tour: [m('row0', t('直接用半音数', '半音の数で', 'just count half steps'))],
  },
  'posttonal:1#0': {
    visual: { kind: 'clock', pcs: [0, 4, 7], names: true },
    tour: [m(['pc0', 'pc4', 'pc7'], t('Tn：每个数加 n；In：用 n 减', 'Tn：n を足す、In：n から引く', 'Tn: add n; In: subtract from n'))],
  },
  'posttonal:2#0': {
    visual: { kind: 'clock', pcs: [8, 9, 3], names: true },
    tour: [m(['pc8', 'pc9', 'pc3'], t('排成跨度最小的样子', 'いちばん狭く並べる', 'arrange in the tightest span')), m(['pc3', 'pc8', 'pc9'], t('[3, 8, 9]：跨度 6', '[3, 8, 9]：幅 6', '[3, 8, 9]: span 6'))],
  },
  'posttonal:3#0': {
    visual: { kind: 'clock', pcs: [11, 2], names: true },
    tour: [m(['pc11', 'pc0', 'pc1', 'pc2'], t('11 + 3 = 2', '11 + 3 = 2', '11 + 3 = 2'))],
  },
  'posttonal:4#0': {
    visual: { kind: 'clock', pcs: [0, 4, 7], names: true, mirror: 0 },
    tour: [m(['pc0', 'pc4', 'pc7', 'mirror'], t('移位 = 转动；倒影 = 翻过去再转', '移高 = 回す、反行 = 裏返して回す', 'transpose = rotate; invert = flip then rotate'))],
  },
  'setclass:1#0': {
    visual: { kind: 'clock', pcs: [0, 3, 7], names: true },
    tour: [m(['pc0', 'pc3', 'pc7'], t('大三、小三和弦都是 (037)', '長三・短三どちらも (037)', 'major and minor triads are both (037)'))],
  },
  'setclass:2#0': {
    visual: { kind: 'clock', pcs: [0, 4, 7], names: true },
    tour: [m(['pc0', 'pc4', 'pc7'], t('<001110>：一个 3、一个 4、一个 5', '<001110>：3・4・5 が 1 つずつ', '<001110>: one 3, one 4, one 5')), m(['pc0', 'pc4', 'pc7'], t('三音集合总和是 3', '3 音集合の合計は 3', 'trichords sum to 3'))],
  },
  'setclass:3#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: '(037)', sub: '3-11' }, { text: '(048)', sub: '3-12' }, { text: '(0369)', sub: '4-28' }, { text: '(0258)', sub: '4-27' }] }] },
    tour: [m('row0', t('常用的 Forte 编号', 'よく使うフォルテ番号', 'common Forte numbers'))],
  },
  'setclass:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('原型', '原型', 'prime form'), sub: t('名字', '名前', 'name') }, { text: t('向量', 'ベクトル', 'vector'), sub: t('音响', '響き', 'sound') }, { text: 'Forte', sub: t('编号', '番号', 'number') }] }] },
    tour: [m('row0', t('名字、音响、编号', '名前・響き・番号', 'name, sound, number'))],
  },
  'collections:1#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('五声', 'ペンタ', 'pentatonic'), sub: '2–2–3–2–3' }, { text: t('全音', '全音', 'whole-tone'), sub: '2–2–2–2–2–2' }, { text: t('八声', '八音', 'octatonic'), sub: '2–1–2–1…' }] }, { cells: [{ text: t('六声', '六音', 'hexatonic'), sub: '1–3–1–3…', lit: true }, { text: 'acoustic', sub: '2–2–2–1–2–1–2' }] }] },
    tour: [m(['row0', 'row1'], t('用重复的台阶造音阶', '同じ段差の繰り返し', 'scales from repeating steps')), m('c1-0', t('距离模型', '距離モデル', 'distance model'), 'below')],
  },
  'collections:2#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('第 1 种', '第 1', 'mode 1'), sub: t('2 个版本', '2 通り', '2') }, { text: t('第 2 种', '第 2', 'mode 2'), sub: t('3 个', '3 通り', '3') }, { text: t('第 3 种', '第 3', 'mode 3'), sub: t('4 个', '4 通り', '4') }, { text: t('第 4–7 种', '第 4–7', 'modes 4–7'), sub: t('各 6 个', '各 6 通り', '6 each') }] }] },
    tour: [m('row0', t('版本越少，对称性越强', '通り数が少ないほど対称的', 'fewer versions = more symmetry'))],
  },
  'collections:3#0': {
    visual: { kind: 'ring', labels: ['C', 'Cm', 'A♭', 'A♭m', 'E', 'Em'], edges: ['P', 'L', 'P', 'L', 'P', 'L'] },
    tour: [null, m(['n0', 'n1', 'n2', 'n3', 'n4', 'n5'], t('PL 循环的音 = 六声音集', 'PL 循環の音 = 六音音階', 'PL cycle notes = hexatonic collection'))],
  },
  'collections:4#0': {
    visual: { kind: 'blocks', rows: [{ label: t('对称', '対称', 'symmetric'), cells: cells(t('全音', '全音', 'whole-tone'), t('八声', '八音', 'octatonic'), t('六声', '六音', 'hexatonic')) }, { label: t('泛音 / 五度', '倍音 / 5 度', 'overtones / fifths'), cells: cells(t('五声', 'ペンタ', 'pentatonic'), 'acoustic') }] },
    tour: [[m('row0', t('对称的三种', '対称な 3 つ', 'the symmetric three')), m('row1', t('和泛音、五度有关', '倍音・5 度と関係', 'related to overtones and fifths'), 'below')]],
  },
  'twelvetone:1#0': {
    visual: { kind: 'blocks', rows: [{ label: 'P', cells: cells('0', '11', '7', '8') }, { label: 'R', cells: cells('8', '7', '11', '0') }, { label: 'I', cells: cells('0', '1', '5', '4') }] },
    tour: [[m('row1', t('逆行：倒着读', '逆行：後ろから読む', 'retrograde: read backwards')), m('row2', t('倒影：音程方向反过来', '反行：音程の向きを逆に', 'inversion: intervals flipped'), 'below')]],
  },
  'twelvetone:2#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('固定零', '固定ド', 'fixed zero'), sub: t('P0 从 C 开始', 'P0 は C から', 'P0 starts on C') }, { text: t('可动零', '移動ド', 'movable zero'), sub: t('P0 从第一个音开始', 'P0 は最初の音から', 'P0 starts on the first note') }] }] },
    tour: [m('row0', t('两种编号习惯', '2 通りの番号の付け方', 'two numbering habits')), m('row0', t('选一种并保持一致', '1 つ選んで一貫させる', 'pick one and stay consistent'), 'below')],
  },
  'twelvetone:3#0': {
    visual: { kind: 'blocks', rows: [{ label: t('十二音', '十二音', 'twelve-tone'), cells: cells(t('12 个音级平均使用', '12 音を均等に', 'all 12 pcs evenly')) }, { label: t('序列主义', 'セリエリズム', 'serialism'), cells: cells(t('音高', '音高', 'pitch'), t('时值', '音価', 'duration'), t('力度', '強弱', 'dynamics')) }] },
    tour: [m('row0', t('不去找调或主音', '調や主音を求めない', 'no key or tonic')), m('row1', t('任何要素都能排成顺序', 'どの要素も順序化できる', 'any element can be ordered'), 'below')],
  },
  'twelvetone:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'P', sub: '× 12' }, { text: 'I', sub: '× 12' }, { text: 'R', sub: '× 12' }, { text: 'RI', sub: '× 12' }] }] },
    tour: [m('row0', t('一共 48 种形式', '全部で 48 形', '48 forms in all'))],
  },
  'micro:1#0': {
    visual: { kind: 'ruler', from: 0, to: 400, ticks: [0, 50, 100, 150, 200, 250, 300, 350, 400].map((at) => ({ at, label: at % 100 ? '' : String(at), lit: at % 100 !== 0 })) },
    tour: [m(['t1', 't3', 't5', 't7'], t('半音中间的四分之一音', '半音の間の 4 分音', 'quarter tones between the half steps')), null],
  },
  'micro:2#0': {
    visual: { kind: 'ruler', from: 950, to: 1010, ticks: [{ at: 968.83, label: '7:4 ≈ 969', lit: true }, { at: 1000, label: t('平均律 1000', '平均律 1000', '12-TET 1000') }] },
    tour: [m(['t0', 't1'], t('窄约 31 音分', '約 31 セント狭い', 'about 31 cents narrower')), m('t0', t('4 : 5 : 6 : 7 的和谐七和弦', '4 : 5 : 6 : 7 の和声的七', 'the 4:5:6:7 harmonic seventh'))],
  },
  'micro:3#0': {
    visual: { kind: 'ruler', from: 290, to: 410, ticks: [{ at: 300, label: t('小三度', '短 3 度', 'm3') }, { at: 347.41, label: '11:9', up: false }, { at: 350, label: '350', lit: true }, { at: 400, label: t('大三度', '長 3 度', 'M3') }] },
    tour: [m(['t1', 't2'], t('相差不到 3 音分', '差は 3 セント未満', 'less than 3 cents apart')), m(['t0', 't1', 't3'], t('11:9 在 5:4 与 6:5 之间', '11:9 は 5:4 と 6:5 の間', '11:9 between 5:4 and 6:5'), 'below')],
  },
  'micro:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('平均律', '平均律', 'EDO') }, { text: 'koma' }, { text: t('纯律比例', '純正比', 'just ratios') }] }, { cells: [{ text: '1200 × log₂(f₂ / f₁)', lit: true }] }] },
    tour: [m('row1', t('都换算成音分来比较', 'すべてセントに換算', 'convert everything to cents'), 'below')],
  },
  'microharmony:1#0': {
    visual: { kind: 'ruler', from: 290, to: 410, ticks: [{ at: 300, label: t('小三', '短三', 'minor') }, { at: 350, label: t('中立', '中立', 'neutral'), lit: true }, { at: 400, label: t('大三', '長三', 'major') }] },
    tour: [m('t1', t('离大、小三度都约差四分之一音', '長短どちらとも約 4 分音違い', 'about a quarter tone from each'))],
  },
  'microharmony:2#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: '2D', sub: '3/2 · 4/3 · 9/8' }, { text: '3D', sub: '5/4 · 6/5 · 5/3' }] }, { cells: [{ text: '4D', sub: '7/4 · 7/6 · 8/7' }, { text: '5D', sub: '11/8 · 11/9 · 11/6' }] }] },
    tour: [m(['row0', 'row1'], t('最大质数决定维度', '最大の素数が次元を決める', 'the largest prime sets the dimension')), m('row0', t('Colorspeak：5/4 = yo 3rd', 'Colorspeak：5/4 = yo 3rd', 'Colorspeak: 5/4 = yo 3rd'))],
  },
  'microharmony:3#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: 'Ah–Chy–Ly', sub: '1/1 · 3/2 · 5/4 · 3D' }, { text: 'Ah–Chy–My', sub: '1/1 · 3/2 · 7/4 · 4D' }, { text: 'Ah–Chy–Fuzi', sub: '1/1 · 3/2 · 11/6 · 5D' }] }] },
    tour: [m('row0', t('三种预设依次听', '3 つのプリセット', 'the three presets in turn')), m('c0-2', t('维度越高越陌生', '次元が高いほど耳慣れない', 'higher dimension, stranger sound'), 'below')],
  },
  'microharmony:4#0': {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: t('中立三和弦', '中立三和音', 'neutral triad'), sub: t('24 / 31 平均', '24 / 31 平均律', '24 / 31 EDO') }, { text: 'LΛMPLIGHT', sub: t('维度 + 名字', '次元 + 名前', 'dimensions + names') }] }] },
    tour: [m('row0', t('新的颜色，新的名字', '新しい色、新しい名前', 'new colours, new names'))],
  },
};

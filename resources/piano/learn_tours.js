// 乐理闯关 · 开场引导卡的"圈出来讲"：每个主关第一张引导卡配一张图（visual），
// 讲到第几步，就把那一步说到的东西在图上圈出来并贴上名字（tour[i] 对应 steps[i]，null 表示这一步不圈）。
// 这里只给图和标注，不引入新的乐理事实：标注里的每个名字、数字都来自同一张引导卡的讲解文字，
// 依据就是那张卡上的 ref（见 learn_units_*.js）。图上的部件名见 learn_visuals.js。
const t = (zh, ja, en) => ({ zh, ja, en });
const m = (at, label, place) => ({ at: [].concat(at), label, ...(place ? { place } : {}) });
const heads = (...ids) => ids.map((i) => `head${i}`);
const ns = (...ids) => ids.map((i) => `n${i}`);
const keys = (...midis) => midis.map((k) => `k${k}`);
const chord = (col, pitches, extra = {}) => pitches.map((p, i) => ({ p, col, d: 'w', ...(i === 0 ? extra : {}) }));

export const TOURS = {
  // ---------------- 入门 ----------------
  keys: {
    dropKeys: true,
    visual: { kind: 'piano', from: 60, to: 71, lit: [60, 61], names: 'white' },
    tour: [
      [m(keys(61, 63), t('两个一组的黑键', '2 つ組の黒鍵', 'group of two')), m(keys(66, 68, 70), t('三个一组的黑键', '3 つ組の黒鍵', 'group of three')), m('k64', t('白键用字母命名', '白鍵は文字で呼ぶ', 'white keys: letters'), 'below')],
      m(keys(60, 61), t('紧挨着的两个键 = 半音', '隣り合う 2 鍵 = 半音', 'neighbours = half step')),
      m(keys(60, 62), t('两个半音 = 全音', '半音 2 つ = 全音', 'two half steps = whole step')),
    ],
  },
  staff: {
    visual: {
      kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }],
      notes: [{ p: 'G4', s: 0, d: 'w', col: 0, label: 'G4' }, { p: 'F3', s: 1, d: 'w', col: 0, label: 'F3' }, { p: 'A5', s: 0, d: 'w', col: 1 }, { p: 'C4', s: 0, d: 'w', col: 2, lit: true, label: 'C4', labelAt: 'below' }],
    },
    tour: [
      m('staff0', t('五条线：音越高，写得越高', '5 本の線：高い音ほど上', 'five lines: higher = higher')),
      [m(['clef0', 'n0'], t('高音谱号绕着第二线 G', 'ト音記号は第 2 線の G', 'treble clef: G line')), m(['clef1', 'n1'], t('低音谱号的点在第四线 F', 'ヘ音記号の点は第 4 線の F', 'bass clef dot: F line'), 'below')],
      m(['ledger2', 'head2'], t('加线：写不下的音往上接', '加線：上に延ばす', 'ledger line')),
      [m('brace', t('大谱表', '大譜表', 'grand staff')), m(['n3'], t('中央 C = C4', '中央の C = C4', 'middle C = C4'), 'below')],
    ],
  },
  rhythm: {
    visual: {
      kind: 'values',
      rows: ['w', 'h', 'q', 'e', 's', { seq: [{ d: 'h', dot: true }, '=', { d: 'h' }, '+', { d: 'q' }] }, { seq: [{ d: 'h' }, { d: 'h', tie: true }] }],
      labels: [t('全音符', '全音符', 'whole'), t('二分', '2 分', 'half'), t('四分', '4 分', 'quarter'), t('八分', '8 分', 'eighth'), t('十六分', '16 分', '16th'), t('附点', '付点', 'dot'), t('连音线', 'タイ', 'tie')],
    },
    tour: [
      m('n0-0', t('一个音符：多高 + 多长', '音符 = 高さ + 長さ', 'a note: pitch + length')),
      m(['row0', 'row1', 'row2', 'row3', 'row4'], t('常见的五种时值', 'よく使う 5 つの音価', 'five common values')),
      m(['row0', 'row1', 'row2', 'row3'], t('每往下一行，就对半切一次', '1 段下がるごとに半分', 'each row halves the one above')),
      [m('row5', t('附点：变长一半', '付点：半分長く', 'dot: adds half')), m('row6', t('连音线：连成一个长音', 'タイ：1 つの長い音', 'tie: one long note'), 'below')],
    ],
  },
  pentatonic: {
    dropKeys: true,
    visual: { kind: 'piano', from: 60, to: 71, lit: [60, 62, 64, 67, 69], names: 'lit', labels: { 60: t('宫', '宮', 'gong'), 62: t('商', '商', 'shang'), 64: t('角', '角', 'jue'), 67: t('徵', '徴', 'zhi'), 69: t('羽', '羽', 'yu') } },
    tour: [
      m(keys(60, 62, 64, 67, 69), t('宫 商 角 徵 羽', '宮 商 角 徴 羽', 'gong shang jue zhi yu')),
      m('k60', t('C 当作"宫"', 'C を「宮」に', 'C as gong')),
      m(keys(64, 67), t('相邻两音之间没有半音', '隣どうしに半音はない', 'no half steps between neighbours')),
    ],
  },
  major: {
    dropKeys: true,
    visual: { kind: 'piano', from: 60, to: 72, lit: [60, 62, 64, 65, 67, 69, 71, 72], names: 'white', labels: { 60: '1', 62: '2', 64: '3', 65: '4', 67: '5', 69: '6', 71: '7', 72: '8' } },
    tour: [
      [m(keys(64, 65), t('3–4：半音', '3–4：半音', '3–4: half')), m(keys(71, 72), t('7–8：半音', '7–8：半音', '7–8: half'))],
      m(keys(60, 72), t('从 C 开始：全是白键', 'C から：白鍵だけ', 'from C: all white keys'), 'below'),
      null,
    ],
  },
  minor: {
    dropKeys: true,
    visual: { kind: 'piano', from: 57, to: 69, lit: [57, 59, 60, 62, 64, 65, 67, 69], names: 'white', labels: { 57: '1', 59: '2', 60: '3', 62: '4', 64: '5', 65: '6', 67: '7', 69: '8' } },
    tour: [
      m('k60', t('第三个音：低了半音', '第 3 音：半音低い', '3rd: a half step lower')),
      [m(keys(59, 60), t('H', 'H', 'H')), m(keys(64, 65), t('H', 'H', 'H'))],
      m(keys(67, 68), t('和声小调：第 7 音升高半音', '和声的短音階：第 7 音を半音上げる', 'harmonic minor: raise the 7th')),
      m('k57', t('A 小调 ↔ C 大调：关系调', 'イ短調 ↔ ハ長調：平行調', 'A minor ↔ C major: relative')),
    ],
  },
  modes: {
    visual: {
      kind: 'blocks',
      rows: [
        { label: t('大三度', '長 3 度', 'major 3rd'), cells: [{ text: 'F', sub: 'Lydian' }, { text: 'C', sub: 'Ionian' }, { text: 'G', sub: 'Mixolydian' }] },
        { label: t('小三度', '短 3 度', 'minor 3rd'), cells: [{ text: 'D', sub: 'Dorian' }, { text: 'A', sub: 'Aeolian' }, { text: 'E', sub: 'Phrygian' }, { text: 'B', sub: 'Locrian' }] },
      ],
    },
    tour: [
      m('c1-0', t('从 D 弹白键 = D Dorian', 'D から白鍵 = D ドリアン', 'D on white keys = D Dorian')),
      m('row0', t('比较"亮"：Lydian 最亮', '明るい：リディアンが最も明るい', 'bright: Lydian brightest')),
      m('row1', t('比较"暗"：Locrian 最暗', '暗い：ロクリアンが最も暗い', 'dark: Locrian darkest'), 'below'),
      [m('c0-0', t('Lydian：第 4 音升高', 'リディアン：第 4 音を上げる', 'Lydian: raised 4th')), m('c1-3', t('Locrian：再降低第 5 音', 'ロクリアン：さらに第 5 音を下げる', 'Locrian: lowered 5th too'), 'below')],
    ],
  },
  intervals: {
    dropKeys: true,
    visual: { kind: 'piano', from: 60, to: 67, lit: [60, 64], names: 'white', labels: { 61: '1', 62: '2', 63: '3', 64: '4' } },
    tour: [
      m(keys(61, 62, 63, 64), t('数半音：4 个', '半音を数える：4 つ', 'count half steps: 4')),
      m(keys(60, 62, 64), t('只数字母：C D E = 三度', '文字だけ：C D E = 3 度', 'count letters: C D E = 3rd'), 'below'),
      m(keys(60, 64), t('大三度', '長 3 度', 'major third')),
    ],
  },
  intervalqual: {
    visual: {
      kind: 'blocks',
      rows: [
        { cells: [{ text: 'C–E', sub: t('三度', '3 度', '3rd') }, { text: 'C–E♭', sub: t('三度', '3 度', '3rd') }] },
        { label: t('纯', '完全', 'perfect'), cells: ['1', '4', '5', '8'] },
        { label: t('大 / 小', '長 / 短', 'major / minor'), cells: ['2', '3', '6', '7'] },
        { label: t('转位', '転回', 'inversion'), arrows: true, cells: [{ text: 'C–E', sub: t('大三度', '長 3 度', 'M3') }, { text: 'E–C', sub: t('小六度', '短 6 度', 'm6') }] },
      ],
    },
    tour: [
      m('row0', t('度数只数字母：都是三度', '度数は文字だけ：どちらも 3 度', 'letters only: both 3rds')),
      [m('row1', t('纯音程', '完全音程', 'perfect')), m('row2', t('分大和小', '長と短', 'major or minor'), 'below')],
      m(['row1', 'row2'], t('再大半音 = 增，再小半音 = 减', '半音広い = 増、狭い = 減', 'wider = aug, narrower = dim')),
      m('row3', t('3 + 6 = 9；大 ↔ 小', '3 + 6 = 9；長 ↔ 短', '3 + 6 = 9; major ↔ minor'), 'below'),
    ],
  },
  texture: {
    visual: {
      kind: 'blocks',
      rows: [
        { cells: [{ text: t('单声部', 'モノフォニー', 'monophony'), sub: t('一条旋律', '旋律 1 本', 'one melody') }, { text: t('支声', 'ヘテロフォニー', 'heterophony'), sub: t('同一旋律的变体', '同じ旋律の変形', 'variants of one tune') }] },
        { cells: [{ text: t('主调', 'ホモフォニー', 'homophony'), sub: t('节奏一致', 'リズムがそろう', 'same rhythm') }, { text: t('复调', 'ポリフォニー', 'polyphony'), sub: t('各自独立', 'それぞれ独立', 'independent lines') }] },
      ],
    },
    tour: [
      m(['row0', 'row1'], t('织体 = 几条声部、怎样配合', 'テクスチュア = 声部の数と関わり方', 'texture = how many lines, how they combine')),
      m('row0', t('只有一条旋律（或它的变体）', '旋律 1 本（またはその変形）', 'one tune (or its variants)')),
      m('row1', t('一起换和声 / 各唱各的', '一緒に和声を変える / 別々に歌う', 'move together / move independently'), 'below'),
      null,
    ],
  },

  // ---------------- 和声 ----------------
  triads: {
    visual: { kind: 'notation', notes: [...chord(0, ['C4', 'E4', 'G4'], { label: 'C' }), ...chord(1, ['C4', 'Eb4', 'G4'], { label: 'Cm' })] },
    tour: [
      m(ns(0, 1, 2), t('叠两个三度：C E G', '3 度を 2 つ重ねる：C E G', 'two stacked thirds: C E G')),
      [m(ns(0, 1, 2), t('大三和弦', '長三和音', 'major')), m(ns(3, 4, 5), t('小三和弦', '短三和音', 'minor'))],
      [m('head1', t('E：大三度', 'E：長 3 度', 'E: major 3rd')), m('head4', t('E♭：小三度', 'E♭：短 3 度', 'E♭: minor 3rd'), 'below')],
    ],
  },
  inversions: {
    visual: { kind: 'notation', staves: [{ clef: 'bass' }], notes: [...chord(0, ['C3', 'E3', 'G3'], { label: 'C' }), ...chord(1, ['E3', 'G3', 'C4'], { label: 'C/E' }), ...chord(2, ['G3', 'C4', 'E4'], { label: 'C/G' })] },
    tour: [
      m(heads(0, 3, 6), t('最低的音 = 低音', 'いちばん低い音 = バス', 'lowest note = bass'), 'below'),
      [m(ns(0, 1, 2), t('原位', '基本形', 'root')), m(ns(3, 4, 5), t('第一转位', '第 1 転回', '1st inv.')), m(ns(6, 7, 8), t('第二转位', '第 2 転回', '2nd inv.'))],
      m('label3', t('C/E：E 在最低', 'C/E：E がいちばん下', 'C/E: E in the bass'), 'below'),
      [m(ns(3, 4, 5), '6'), m(ns(6, 7, 8), '6/4')],
    ],
  },
  voicing: {
    visual: {
      kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }],
      notes: [
        { p: 'C4', s: 0, col: 0, d: 'w' }, { p: 'E4', s: 0, col: 0, d: 'w' }, { p: 'G4', s: 0, col: 0, d: 'w' },
        { p: 'C3', s: 1, col: 1, d: 'w' }, { p: 'G3', s: 1, col: 1, d: 'w' }, { p: 'E4', s: 0, col: 1, d: 'w' },
        { p: 'C3', s: 1, col: 2, d: 'w' }, { p: 'G3', s: 1, col: 2, d: 'w' }, { p: 'E4', s: 0, col: 2, d: 'w' }, { p: 'G4', s: 0, col: 2, d: 'w' },
      ],
    },
    tour: [
      null,
      [m(ns(0, 1, 2), t('紧密排列', '密集配分', 'close')), m(ns(3, 4, 5), t('开放排列', '開離配分', 'open'), 'below')],
      m(heads(7, 9), t('G 出现了两次 = 重复', 'G が 2 回 = 重複', 'G twice = doubling')),
      null,
    ],
  },
  symbols: {
    visual: {
      kind: 'blocks',
      rows: [
        { cells: [{ text: 'C', sub: t('根音', '根音', 'root') }] },
        { cells: [{ text: 'C' }, { text: 'm', sub: t('小三和弦', '短三和音', 'minor') }] },
        { cells: [{ text: 'C' }, { text: '7', sub: t('小七度', '短 7 度', 'minor 7th') }] },
        { cells: ['Cm', 'C-', 'Cmin'] },
      ],
    },
    tour: [
      m('c0-0', t('大写字母 = 根音；只写字母 = 大三和弦', '大文字 = 根音；文字だけ = 長三和音', 'capital = root; letter alone = major')),
      [m('c1-1', t('加 m：小三和弦', 'm：短三和音', 'm: minor')), m('c2-1', t('加 7：多一个七度', '7：7 度を足す', '7: add a seventh'), 'below')],
      m('row3', t('同一个和弦的几种写法', '同じ和音の別表記', 'one chord, several spellings'), 'below'),
    ],
  },
  chordplus: {
    visual: {
      kind: 'notation',
      notes: [
        ...chord(0, ['C4', 'E4', 'G4'], { label: 'C' }),
        { p: 'C4', col: 1, d: 'w', label: 'Csus4' }, { p: 'F4', col: 1, d: 'w' }, { p: 'G4', col: 1, d: 'w', dx: 13 },
        { p: 'C4', col: 2, d: 'w', label: 'Csus2' }, { p: 'D4', col: 2, d: 'w', dx: 13 }, { p: 'G4', col: 2, d: 'w' },
        ...chord(3, ['C4', 'E4', 'G4', 'D5'], { label: 'Cadd9' }),
        { p: 'C4', col: 4, d: 'w', label: 'C6' }, { p: 'E4', col: 4, d: 'w' }, { p: 'G4', col: 4, d: 'w' }, { p: 'A4', col: 4, d: 'w', dx: 13 },
      ],
      cols: 5,
    },
    tour: [
      [m('head4', t('F 代替三音', 'F が 3 度の代わり', 'F replaces the 3rd')), m('head7', t('D 代替三音', 'D が 3 度の代わり', 'D replaces the 3rd'), 'below')],
      m('head12', t('加 D（九度），不带七音', 'D（9 度）を足す、7 度なし', 'add D (9th), no 7th')),
      m('head16', t('加 A（六度）', 'A（6 度）を足す', 'add A (6th)')),
      null,
    ],
  },
  sevenths: {
    visual: { kind: 'notation', notes: [...chord(0, ['G4', 'B4', 'D5', 'F5'], { label: 'G7' }), ...chord(1, ['C4', 'E4', 'G4', 'B4'], { label: 'Cmaj7' })] },
    tour: [
      m('head3', t('再叠一个三度：七音', 'もう 1 つ 3 度：7 度', 'one more third: the 7th')),
      null,
      [m(ns(0, 1, 2, 3), t('G7：想往前走', 'G7：先へ進みたい', 'G7: wants to move')), m(ns(4, 5, 6, 7), t('Cmaj7：像到家', 'Cmaj7：家に着いた感じ', 'Cmaj7: at home'), 'below')],
    ],
  },
  roman: {
    visual: {
      kind: 'blocks',
      rows: [
        { label: t('C 大调', 'ハ長調', 'C major'), cells: [['C', 'I', [60, 64, 67]], ['Dm', 'ii', [62, 65, 69]], ['Em', 'iii', [64, 67, 71]], ['F', 'IV', [65, 69, 72]], ['G', 'V', [67, 71, 74]], ['Am', 'vi', [69, 72, 76]], ['B°', 'vii°', [71, 74, 77]]].map(([text, sub, play]) => ({ text, sub, play })) },
        { label: t('A 小调', 'イ短調', 'A minor'), cells: [['Am', 'i'], ['B°', 'ii°'], ['C', 'III'], ['Dm', 'iv'], ['Em', 'v'], ['F', 'VI'], ['G', 'VII']].map(([text, sub]) => ({ text, sub })) },
      ],
    },
    tour: [
      [m('c0-0', t('C 上的和弦 = I', 'C 上の和音 = I', 'chord on C = I')), m('c0-1', t('D 上 = ii', 'D 上 = ii', 'on D = ii'), 'below')],
      [m('c0-4', t('大写 = 大三', '大文字 = 長', 'upper case = major')), m('c0-6', t('° = 减三', '° = 減', '° = diminished'), 'below')],
      m('row0', t('每个大调都一样', 'どの長調も同じ', 'same in every major key')),
      m('row1', t('小调', '短調', 'minor'), 'below'),
    ],
  },
  functions: {
    visual: {
      kind: 'blocks',
      rows: [{ arrows: true, cells: [{ text: 'I', sub: 'T', play: [48, 52, 55] }, { text: 'IV', sub: 'PD', play: [53, 57, 60] }, { text: 'V', sub: 'D', play: [55, 59, 62] }, { text: 'I', sub: 'T', play: [48, 52, 55] }] }],
    },
    tour: [
      [m('c0-0', t('家', '家', 'home')), m('c0-1', t('做准备', '準備', 'prepare'), 'below'), m('c0-2', t('最想回家', 'いちばん帰りたい', 'longs for home')), m('c0-3', t('回家', '帰宅', 'back home'), 'below')],
      [m('c0-1', t('IV、ii 都是准备', 'IV と ii が準備', 'IV and ii prepare')), m('c0-2', t('V = G', 'V = G', 'V = G'), 'below')],
    ],
  },
  cadences: {
    visual: {
      kind: 'blocks',
      rows: [
        { label: t('正格', '正格', 'authentic'), arrows: true, cells: ['V', 'I'] },
        { label: t('半终止', '半終止', 'half'), arrows: true, cells: ['…', 'V'] },
        { label: t('变格', '変格', 'plagal'), arrows: true, cells: ['IV', 'I'] },
        { label: t('阻碍', '偽終止', 'deceptive'), arrows: true, cells: ['V', 'vi'] },
      ],
    },
    tour: [
      null,
      m('row0', t('像句号', '句点のよう', 'like a period')),
      m('row1', t('像逗号或问号', '読点や疑問符のよう', 'like a comma or question mark')),
      [m('row2', t('"阿们"终止', '「アーメン」終止', '"Amen" cadence')), m('row3', t('出乎意料', '意外な行き先', 'a surprise'), 'below')],
    ],
  },
  sixfour: {
    visual: {
      kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }],
      notes: [
        { p: 'G2', s: 1, col: 0, d: 'w' }, { p: 'C4', s: 0, col: 0, d: 'w' }, { p: 'E4', s: 0, col: 0, d: 'w' }, { p: 'C5', s: 0, col: 0, d: 'w' },
        { p: 'G2', s: 1, col: 1, d: 'w' }, { p: 'B3', s: 1, col: 1, d: 'w' }, { p: 'D4', s: 0, col: 1, d: 'w' }, { p: 'B4', s: 0, col: 1, d: 'w' },
        { p: 'C2', s: 1, col: 2, d: 'w' }, { p: 'G3', s: 1, col: 2, d: 'w' }, { p: 'E4', s: 0, col: 2, d: 'w' }, { p: 'C5', s: 0, col: 2, d: 'w' },
      ],
    },
    tour: [
      m(ns(0, 1, 2), t('低音上方：四度 + 六度', 'バスの上に 4 度 + 6 度', 'a 4th and a 6th above the bass')),
      [m(heads(1, 2), t('C、E：装饰音', 'C・E：装飾音', 'C, E: embellishing')), m(heads(5, 6), t('落到 B、D', 'B・D へ', 'fall to B, D'), 'below')],
      m(ns(0, 1, 2, 3, 4, 5, 6, 7), t('四六 + V = 一个整体（属）', '4 6 + V = ひとまとまり（属）', 'cadential 6/4 + V = one dominant')),
      null,
    ],
  },
  figured: {
    visual: { kind: 'notation', staves: [{ clef: 'bass' }], notes: [...chord(0, ['C3', 'E3', 'G3'], { label: t('（不写）', '（なし）', '(none)') }), ...chord(1, ['E3', 'G3', 'C4'], { label: '6' }), ...chord(2, ['G3', 'C4', 'E4'], { label: '6/4' })] },
    tour: [
      [m(heads(0, 3, 6), t('只写低音', 'バスだけ書く', 'only the bass is written')), m(['label3', 'label6'], t('数字', '数字', 'figures'), 'below')],
      [m(ns(3, 4, 5), t('6 = 第一转位', '6 = 第 1 転回', '6 = 1st inv.')), m(ns(6, 7, 8), t('6/4 = 第二转位', '6/4 = 第 2 転回', '6/4 = 2nd inv.'))],
    ],
  },
  form: {
    visual: {
      kind: 'blocks',
      rows: [
        { arrows: true, cells: [{ text: t('乐句', 'フレーズ', 'phrase'), sub: t('半终止', '半終止', 'half cad.') }, { text: t('乐句', 'フレーズ', 'phrase'), sub: t('正格终止', '正格終止', 'authentic cad.') }] },
        { cells: ['A', 'B', 'A', 'C', 'A'].map((text) => ({ text, lit: text === 'A' })) },
      ],
    },
    tour: [
      [m('c0-0', t('逗号 / 问号', '読点 / 疑問符', 'comma / question')), m('c0-1', t('句号', '句点', 'period'))],
      m(['c1-0', 'c1-2', 'c1-4'], t('A 反复回来', 'A が何度も戻る', 'A keeps returning'), 'below'),
    ],
  },
  forms: {
    visual: {
      kind: 'blocks',
      rows: [
        { cells: [t('乐曲', '楽曲', 'piece'), t('乐章', '楽章', 'mvt'), t('段落', '部分', 'section'), t('主题', '主題', 'theme'), t('乐句', 'フレーズ', 'phrase'), t('动机', '動機', 'motive')].map((text) => ({ text })) },
        { label: t('二部', '二部形式', 'binary'), cells: ['‖: A :‖', '‖: B :‖'] },
        { label: t('三部', '三部形式', 'ternary'), cells: ['A', 'B', 'A'] },
        { label: t('奏鸣曲式', 'ソナタ形式', 'sonata'), arrows: true, cells: [t('呈示部', '提示部', 'expo.'), t('发展部', '展開部', 'dev.'), t('再现部', '再現部', 'recap.')].map((text) => ({ text })) },
      ],
    },
    tour: [
      m('row0', t('一层套一层；最小的是动机', '入れ子；最小は動機', 'nested; the smallest is the motive')),
      m('c0-4', t('乐句：朝着终止式走', 'フレーズ：終止へ向かう', 'phrase: heads for a cadence')),
      [m('row1', t('两个反复段', '2 つの反復部', 'two repeated halves')), m('row2', t('中间 B 形成对比', '中間の B が対比', 'contrasting B'), 'below')],
      m('row3', t('呈示 → 发展 → 再现', '提示 → 展開 → 再現', 'expo → dev → recap'), 'below'),
    ],
  },
  tonicization: {
    visual: {
      kind: 'blocks',
      rows: [{ arrows: true, cells: [{ text: 'I', sub: 'C', play: [48, 60, 64, 67] }, { text: 'V/V', sub: 'D F♯ A', play: [50, 62, 66, 69] }, { text: 'V', sub: 'G', play: [43, 59, 62, 67] }, { text: 'I', sub: 'C', play: [48, 60, 64, 72] }] }],
    },
    tour: [
      m('c0-2', t('暂时的"家"', '一時的な「家」', 'a temporary home')),
      m('c0-1', t('属和弦的属和弦', '属和音の属和音', 'the dominant of the dominant')),
      m('c0-1', t('F♯：升高的临时记号', 'F♯：上げる臨時記号', 'F♯: a raised accidental'), 'below'),
      null,
    ],
  },
  chromatic: {
    visual: {
      kind: 'blocks',
      rows: [
        { label: t('借用', '借用', 'mixture'), arrows: true, cells: [{ text: 'I' }, { text: '♭VI', sub: 'A♭ C E♭' }] },
        { label: 'N6', arrows: true, cells: [{ text: 'I' }, { text: '♭II6', sub: 'D♭ F A♭' }, { text: 'V' }, { text: 'I' }] },
        { label: t('增六', '増 6', 'aug. 6th'), cells: ['It+6', 'Fr+6', 'Ger+6'] },
      ],
    },
    tour: [
      m('c0-1', t('从同主音小调借来', '同主短調から借りる', 'borrowed from the parallel minor')),
      m('c1-1', t('建在 ra 上，第一转位', 'ra の上、第 1 転回', 'built on ra, 1st inversion')),
      m('row2', t('意大利、法国、德国三种', 'イタリア・フランス・ドイツ', 'Italian, French, German'), 'below'),
      null,
    ],
  },
  circle: {
    tour: [
      [m(['M:C', 'M:G'], t('顺时针：上行纯五度', '時計回り：完全 5 度上', 'clockwise: up a 5th')), m(['M:F', 'M:C'], t('逆时针：上行纯四度', '反時計回り：完全 4 度上', 'counter-clockwise: up a 4th'), 'below')],
      [m('M:C', t('I 主', 'I 主', 'I tonic')), m('M:G', t('V 属', 'V 属', 'V dominant'), 'below'), m('M:F', t('IV 下属', 'IV 下属', 'IV subdominant'), 'below'), m('m:A', t('关系小调', '平行調（短）', 'relative minor'), 'below')],
      m(['M:D', 'M:G', 'M:C'], t('ii → V → I：逆时针一格一格', 'ii → V → I：反時計回りに 1 つずつ', 'ii → V → I, step by step')),
      m(['M:F', 'M:C', 'M:G'], t('隔壁的调只差一个升降号', '隣の調は臨時記号 1 つ違い', 'neighbours differ by one accidental')),
    ],
  },
  neoriemann: {
    visual: { kind: 'notation', notes: [...chord(0, ['C4', 'E4', 'G4'], { label: 'C' }), ...chord(1, ['C4', 'Eb4', 'G4'], { label: 'Cm' }), ...chord(2, ['C4', 'E4', 'A4'], { label: 'Am' }), ...chord(3, ['B3', 'E4', 'G4'], { label: 'Em' })] },
    tour: [
      m(heads(3, 5), t('C、G：两个共同音', 'C・G：共通音 2 つ', 'C, G: two common tones')),
      m('head4', t('只动一个音：E → E♭', '1 音だけ動く：E → E♭', 'one note moves: E → E♭')),
      [m(ns(3, 4, 5), 'P'), m(ns(6, 7, 8), 'R'), m(ns(9, 10, 11), 'L')],
      null,
    ],
  },

  // ---------------- 旋律与对位 ----------------
  nonchord: {
    visual: { kind: 'notation', notes: ['C4', 'D4', 'E4', 'E4', 'F4', 'E4'].map((p) => ({ p, d: 'q' })) },
    tour: [
      null,
      m(ns(0, 1, 2), t('看怎么来、往哪儿去', 'どう来て、どこへ行く', 'how it arrives and leaves')),
      [m('n1', t('D：一路走过去', 'D：通り過ぎる', 'D: walks through')), m('n4', t('F：出去又回来', 'F：出て戻る', 'F: steps out and back'), 'below')],
    ],
  },
  nctmore: {
    visual: {
      kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }],
      notes: [
        { p: 'C3', s: 1, col: 0, d: 'w' }, { p: 'E4', s: 0, col: 0, d: 'w' }, { p: 'C5', s: 0, col: 0, d: 'w' },
        { p: 'G2', s: 1, col: 1, d: 'w' }, { p: 'D4', s: 0, col: 1, d: 'w' }, { p: 'C5', s: 0, col: 1, d: 'w' },
        { p: 'G2', s: 1, col: 2, d: 'w' }, { p: 'D4', s: 0, col: 2, d: 'w' }, { p: 'B4', s: 0, col: 2, d: 'w' },
      ],
    },
    tour: [
      m(ns(2, 5, 8), t('看前后：一步还是跳', '前後を見る：順次か跳躍か', 'step or leap?')),
      null,
      [m('head2', t('保持不动', '保つ', 'held')), m('head5', t('强拍上成了外音', '強拍で非和声音に', 'dissonant on the strong beat'), 'below'), m('head8', t('往下一步解决', '1 歩下へ解決', 'resolves down a step'))],
      null,
    ],
  },
  counterpoint: {
    visual: {
      kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }],
      notes: [
        { p: 'C3', s: 1, col: 0, d: 'w' }, { p: 'E4', s: 0, col: 0, d: 'w' }, { p: 'D3', s: 1, col: 1, d: 'w' }, { p: 'F4', s: 0, col: 1, d: 'w' },
        { p: 'E3', s: 1, col: 2, d: 'w' }, { p: 'G4', s: 0, col: 2, d: 'w' }, { p: 'C3', s: 1, col: 3, d: 'w' }, { p: 'C4', s: 0, col: 3, d: 'w' },
      ],
    },
    tour: [
      [m(ns(1, 3, 5, 7), t('上面写的一条', '上に書く旋律', 'the added line')), m(ns(0, 2, 4, 6), t('下面的旋律', '下の旋律', 'the given line'), 'below')],
      [m(ns(0, 1), t('三度（十度）：不完全协和', '3 度（10 度）：不完全協和', '3rd (10th): imperfect')), m(ns(6, 7), t('八度：完全协和', '8 度：完全協和', 'octave: perfect'), 'below')],
    ],
  },
  species: {
    visual: {
      kind: 'blocks',
      rows: [
        { cells: [{ text: t('反向', '反行', 'contrary'), sub: '↑ ↓' }, { text: t('同向', '並行', 'similar'), sub: '↑ ↑' }, { text: t('平行', '平行', 'parallel'), sub: '↑ ↑ =' }, { text: t('斜向', '斜行', 'oblique'), sub: '— ↑' }] },
        { cells: [{ text: t('二类', '第 2 類', '2nd'), sub: '2 : 1' }, { text: t('三类', '第 3 類', '3rd'), sub: '4 : 1' }, { text: t('四类', '第 4 類', '4th'), sub: t('错开半小节', '半小節ずらす', 'offset by half') }] },
      ],
    },
    tour: [
      m('row0', t('两个声部的四种进行', '2 声部の 4 種の動き', 'four kinds of motion')),
      m('c1-0', t('二分音符对全音符', '2 分音符 対 全音符', 'halves against wholes'), 'below'),
      m('c1-1', t('四分音符', '4 分音符', 'quarters'), 'below'),
      m('c1-2', t('像切分，出现延留音', 'シンコペーション、掛留', 'syncopated, with suspensions'), 'below'),
    ],
  },
  instruments: {
    visual: { kind: 'notation', notes: [{ p: 'C5', d: 'w', label: t('谱面 C', '記譜 C', 'written C') }, { p: 'Bb4', d: 'w', label: t('实际 B♭', '実音 B♭', 'sounds B♭') }] },
    tour: [
      [m('n0', t('谱上写 C', '譜面は C', 'written C')), m('n1', t('实际低一个大二度', '実音は長 2 度下', 'sounds a major 2nd lower'), 'below')],
      null,
    ],
  },
  fretboard: {
    visual: { kind: 'strings', strings: ['E', 'A', 'D', 'G', 'B', 'E'], midis: [40, 45, 50, 55, 59, 64] },
    tour: [
      m(['s0', 's1', 's2', 's3', 's4', 's5'], t('从最粗到最细：E A D G B E', '太い弦から：E A D G B E', 'thick to thin: E A D G B E')),
      [m(['s3', 's4'], t('G–B：大三度', 'G–B：長 3 度', 'G–B: major 3rd')), m(['s0', 's1'], t('其余大多：纯四度', 'ほかは完全 4 度', 'others: perfect 4ths'), 'below')],
      null,
    ],
  },

  // ---------------- 节奏与爵士 ----------------
  meter: {
    visual: {
      kind: 'beats',
      rows: [
        { label: t('二拍子', '2 拍子', 'duple'), groups: [2, 2] },
        { label: t('三拍子', '3 拍子', 'triple'), groups: [3, 3] },
        { label: t('四拍子', '4 拍子', 'quadruple'), groups: [4] },
        { label: t('单拍子', '単純拍子', 'simple'), groups: [1, 1, 1], sub: 2 },
        { label: t('复拍子', '複合拍子', 'compound'), groups: [1, 1, 1], sub: 3 },
      ],
    },
    tour: [
      m('r2', t('一下一下的脉冲 = 拍', '規則的な鼓動 = 拍', 'the steady pulse = beats')),
      m(['r0', 'r1', 'r2'], t('两个、三个、四个一组', '2・3・4 つずつ', 'groups of 2, 3 or 4')),
      [m('r3', t('每拍分两份', '1 拍を 2 つに', 'beat splits in 2')), m('r4', t('每拍分三份', '1 拍を 3 つに', 'beat splits in 3'), 'below')],
    ],
  },
  swing: {
    visual: {
      kind: 'values',
      rows: [
        { seq: [{ d: 'e' }, { d: 'e' }, { d: 'e' }, { d: 'e' }] },
        { seq: [{ d: 'e' }, { d: 'e' }, { d: 'e' }], tuplet: '3' },
        { seq: [{ d: 'e' }, { d: 'e' }, { d: 'e' }, { d: 'e' }] },
        { seq: [{ d: 'q' }, { d: 'e' }, { d: 'q' }, { d: 'e' }], tuplet: '3' },
      ],
      labels: [t('一拍两份', '1 拍 2 つ', '2 per beat'), t('三连音', '3 連符', 'triplet'), t('谱面', '記譜', 'written'), t('演奏', '演奏', 'played')],
    },
    tour: [
      m('row1', t('一拍分三份：写个 3', '1 拍を 3 つ：3 と書く', 'three per beat: marked 3')),
      null,
      null,
      [m('row2', t('写成普通八分音符', '普通の 8 分音符で書く', 'written as plain eighths')), m('row3', t('弹成前长后短，约 2:1', '長・短（約 2:1）で弾く', 'played long–short, about 2:1'), 'below')],
    ],
  },
  blues: {
    visual: {
      kind: 'blocks',
      rows: [['I', 'I', 'I', 'I'], ['IV', 'IV', 'I', 'I'], ['V', 'IV', 'I', 'V']].map((cells) => ({ cells: cells.map((text) => ({ text, play: { I: [48, 52, 55], IV: [53, 57, 60], V: [55, 59, 62] }[text] })) })),
    },
    tour: [
      m(['row0', 'row1', 'row2'], t('12 个小节，只用 I、IV、V', '12 小節、I・IV・V だけ', '12 bars, only I, IV and V')),
      [m(['c1-0', 'c1-1'], t('第 5–6 小节：IV', '5–6 小節目：IV', 'bars 5–6: IV')), m('c2-0', t('第 9 小节：V', '9 小節目：V', 'bar 9: V'), 'below')],
    ],
  },
  bluesscale: {
    dropKeys: true,
    visual: { kind: 'piano', from: 60, to: 72, lit: [60, 63, 65, 66, 67, 70], names: 'lit', labels: { 60: 'do', 63: 'me', 65: 'fa', 66: 'fi', 67: 'sol', 70: 'te' } },
    tour: [
      [m('k66', t('fi：半音经过音', 'fi：半音の経過音', 'fi: chromatic passing tone')), m(keys(60, 63), t('小调五声 + 1 个音', '短調ペンタ + 1 音', 'minor pentatonic + 1'), 'below')],
      m(keys(60, 62, 63, 64, 67, 69), t('大调布鲁斯：C D D♯ E G A', 'メジャー・ブルース：C D D♯ E G A', 'major blues: C D D♯ E G A'), 'below'),
      null,
      null,
    ],
  },
  jazz: {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'Dm7', sub: 'ii', play: [50, 53, 57, 60] }, { text: 'G7', sub: 'V', play: [55, 59, 62, 65] }, { text: 'Cmaj7', sub: 'I', play: [48, 52, 55, 59] }] }] },
    tour: [
      m('row0', t('C 调的 ii–V–I', 'ハ長調の ii–V–I', 'ii–V–I in C')),
      [m('c0-0', t('小七和弦', 'マイナー・セブンス', 'minor 7th')), m('c0-1', t('属七和弦', 'ドミナント・セブンス', 'dominant 7th'), 'below'), m('c0-2', t('落到 I', 'I に着地', 'lands on I'))],
    ],
  },
  chordscale: {
    visual: {
      kind: 'notation',
      notes: [...chord(0, ['D4', 'F4', 'A4', 'C5', 'E5', 'G5', 'B5'], { label: 'Dm13' }), ...['D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'].map((p, i) => ({ p, col: i + 1, d: 'q' }))],
      cols: 8,
    },
    tour: [
      [m(ns(0, 1, 2, 3, 4, 5, 6), t('Dm7 叠到十三音', 'Dm7 を 13 度まで', 'Dm7 stacked to the 13th')), m(ns(7, 8, 9, 10, 11, 12, 13), t('按顺序排 = D Dorian', '順に並べる = D ドリアン', 'in order = D Dorian'), 'below')],
      null,
      null,
      m(ns(0, 1, 2, 3), t('和弦音放在正拍上', '和音の音を表拍に', 'chord tones on the beat')),
    ],
  },
  melodicminor: {
    dropKeys: true,
    visual: { kind: 'piano', from: 60, to: 72, lit: [60, 62, 63, 65, 67, 69, 71], names: 'lit', labels: { 60: '1', 62: '2', 63: '♭3', 65: '4', 67: '5', 69: '6', 71: '7' } },
    tour: [
      m('k63', t('只把第三音降低', '第 3 音だけ下げる', 'only the 3rd is lowered')),
      null,
      m(keys(60, 63, 67, 71), t('CmMaj7 的音', 'CmMaj7 の音', 'the tones of CmMaj7'), 'below'),
      null,
    ],
  },
  harmonicminor: {
    dropKeys: true,
    visual: { kind: 'piano', from: 57, to: 69, lit: [57, 59, 60, 62, 64, 65, 68, 69], names: 'lit', labels: { 57: '1', 59: '2', 60: '♭3', 62: '4', 64: '5', 65: '♭6', 68: '7', 69: '8' } },
    tour: [
      [m(keys(65, 68), t('增二度：三个半音', '増 2 度：半音 3 つ', 'augmented 2nd: 3 half steps')), m('k68', t('升高的第七音', '上げた第 7 音', 'raised 7th'), 'below')],
      null,
      null,
      null,
    ],
  },
  symmetric: {
    visual: { kind: 'piano', from: 60, to: 72, lit: [60, 62, 64, 66, 68, 70], names: 'lit' },
    tour: [
      m(keys(60, 62, 64, 66, 68, 70), t('每一步都是全音，6 个音', 'すべて全音、6 音', 'all whole steps, 6 notes')),
      m(keys(60, 64, 68), t('增三和弦', '増三和音', 'augmented triad'), 'below'),
      null,
      null,
    ],
  },
  morescales: {
    visual: { kind: 'piano', from: 60, to: 72, lit: [60, 61, 64, 65, 67, 68, 71, 72], names: 'lit' },
    tour: [
      null,
      [m(keys(61, 64), t('增二度', '増 2 度', 'aug. 2nd')), m(keys(68, 71), t('增二度', '増 2 度', 'aug. 2nd'))],
      null,
    ],
  },
  jazzvoicing: {
    visual: {
      kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }],
      notes: [
        { p: 'C3', s: 1, col: 0, d: 'w' }, { p: 'E3', s: 1, col: 0, d: 'w' }, { p: 'Bb3', s: 1, col: 0, d: 'w' },
        { p: 'C3', s: 1, col: 1, d: 'w' }, { p: 'Bb3', s: 1, col: 1, d: 'w' }, { p: 'E4', s: 0, col: 1, d: 'w' },
        { p: 'E3', s: 1, col: 2, d: 'w' }, { p: 'A3', s: 1, col: 2, d: 'w' }, { p: 'D4', s: 0, col: 2, d: 'w' }, { p: 'G4', s: 0, col: 2, d: 'w' }, { p: 'B4', s: 0, col: 2, d: 'w' },
      ],
    },
    tour: [
      [m(ns(0, 1, 2), t('壳音：C E B♭', 'シェル：C E B♭', 'shell: C E B♭'), 'below'), m(ns(3, 4, 5), t('C B♭ E', 'C B♭ E', 'C B♭ E'))],
      null,
      m(ns(6, 7, 8, 9, 10), t('So What：三个纯四度 + 大三度', 'So What：完全 4 度 3 つ + 長 3 度', 'So What: three 4ths + a major 3rd')),
      null,
    ],
  },
  substitutions: {
    visual: {
      kind: 'blocks',
      rows: [
        { label: 'ii–V–I', arrows: true, cells: [{ text: 'Dm7', play: [50, 53, 57, 60] }, { text: 'G7', play: [55, 59, 62, 65] }, { text: 'Cmaj7', play: [48, 52, 55, 59] }] },
        { label: t('三全音替代', '裏コード', 'tritone sub'), arrows: true, cells: [{ text: 'Dm7', play: [50, 53, 57, 60] }, { text: 'D♭7', play: [49, 53, 56, 59] }, { text: 'Cmaj7', play: [48, 52, 55, 59] }] },
      ],
    },
    tour: [
      m('row0', t('大调：m7 – 7 – maj7', '長調：m7 – 7 – maj7', 'major: m7 – 7 – maj7')),
      [m('c0-1', 'G7'), m('c1-1', t('D♭7：共享 B–F 三全音', 'D♭7：B–F の三全音を共有', 'D♭7 shares the B–F tritone'), 'below')],
      null,
      null,
    ],
  },
  color: {
    visual: {
      kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }],
      notes: [
        { p: 'C3', s: 1, col: 0, d: 'w', label: 'C7alt' }, { p: 'E3', s: 1, col: 0, d: 'w' }, { p: 'Bb3', s: 1, col: 0, d: 'w' }, { p: 'Db4', s: 0, col: 0, d: 'w' }, { p: 'Eb4', s: 0, col: 0, d: 'w', dx: 13 },
        { p: 'C3', s: 1, col: 2, d: 'w', label: 'Cblk' }, { p: 'Bb3', s: 1, col: 2, d: 'w' }, { p: 'D4', s: 0, col: 2, d: 'w' }, { p: 'F#4', s: 0, col: 2, d: 'w' },
      ],
      cols: 3,
    },
    tour: [
      [m(ns(0, 1, 2), t('根音、三音、七音', '根音・3 度・7 度', 'root, 3rd, 7th'), 'below'), m(ns(3, 4), t('变化音', '変化音', 'altered tones'))],
      m(ns(3, 4), t('加哪些由演奏者决定', 'どれを足すかは奏者次第', "the player's choice")),
      m(ns(5, 6, 7, 8), t('C 上面一个 B♭ 增三和弦', 'C の上に B♭ の増三和音', 'B♭ augmented over C')),
    ],
  },
  lcc: {
    visual: {
      kind: 'blocks',
      rows: [
        { arrows: true, cells: ['C', 'G', 'D', 'A', 'E', 'B', 'F♯'] },
        { cells: ['C', 'D', 'E', 'F♯', 'G', 'A', 'B'].map((text, i) => ({ text, lit: i === 0 })) },
      ],
    },
    tour: [
      null,
      [m('row0', t('六个纯五度叠起来', '完全 5 度を 6 回重ねる', 'six stacked perfect 5ths')), m('row1', t('排起来 = C Lydian', '並べ替える = C リディアン', 'in order = C Lydian'), 'below')],
      m('c0-0', t('Lydian 主音', 'リディアン・トニック', 'Lydian tonic')),
      null,
    ],
  },
  keycenter: {
    visual: { kind: 'blocks', rows: [{ arrows: true, cells: [{ text: 'Dm7', play: [50, 53, 57, 60] }, { text: 'G7', play: [55, 59, 62, 65] }, { text: 'Cmaj7', play: [48, 52, 55, 59] }] }] },
    tour: [
      m('row0', t('和弦音落在哪个音阶里？', '和音の音はどの音階に？', 'which scale holds these tones?')),
      null,
      [m(['c0-0', 'c0-1'], t('普通的下五度进行', '普通の 5 度下行', 'plain down-a-fifth move')), m(['c0-1', 'c0-2'], t('属七 → 上行纯四度：强功能', '属七 → 完全 4 度上：強進行', 'dom7 up a 4th: strong'), 'below')],
    ],
  },
  negharmony: {
    visual: { kind: 'clock', pcs: [0, 4, 7], mirror: 7, names: true },
    tour: [
      m('mirror', t('镜子：E♭ 与 E 之间', '鏡：E♭ と E の間', 'mirror: between E♭ and E')),
      [m(['pc0', 'pc7'], t('C ↔ G', 'C ↔ G', 'C ↔ G')), m(['pc4', 'pc3'], t('E ↔ E♭', 'E ↔ E♭', 'E ↔ E♭'), 'below')],
      null,
    ],
  },
  guidetone: {
    visual: { kind: 'notation', staves: [{ clef: 'bass' }], notes: [{ p: 'F3', col: 0, d: 'w', label: 'Dm7' }, { p: 'C4', col: 0, d: 'w' }, { p: 'F3', col: 1, d: 'w', label: 'G7' }, { p: 'B3', col: 1, d: 'w' }, { p: 'E3', col: 2, d: 'w', label: 'Cmaj7' }, { p: 'B3', col: 2, d: 'w' }] },
    tour: [
      m(ns(0, 1), t('三音 F + 七音 C', '3 度 F + 7 度 C', '3rd F + 7th C')),
      [m(heads(0, 2), t('F 不动：变成七音', 'F はそのまま：7 度に', 'F stays: becomes the 7th'), 'below'), m(heads(1, 3), t('C 下行半音 → B', 'C が半音下の B へ', 'C slips down to B'))],
      null,
    ],
  },

  // ---------------- 世界音乐与律学 ----------------
  world: {
    visual: { kind: 'ruler', from: 300, to: 400, ticks: [{ at: 300, label: 'E♭' }, { at: 350, label: t('四分之一音', '4 分音', 'quarter tone'), lit: true }, { at: 400, label: 'E' }] },
    tour: [
      m('t1', t('半个半音', '半音の半分', 'half of a half step')),
      null,
      null,
    ],
  },
  thaat: {
    visual: {
      kind: 'blocks',
      rows: [
        { cells: ['Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni'] },
        { cells: [{ text: 'Bilawal', sub: 'Ionian' }, { text: 'Kalyan', sub: 'Lydian' }, { text: 'Khamaj', sub: 'Mixolydian' }] },
        { cells: [{ text: 'Kafi', sub: 'Dorian' }, { text: 'Asavari', sub: 'Aeolian' }, { text: 'Bhairavi', sub: 'Phrygian' }] },
      ],
    },
    tour: [
      null,
      m(['row1', 'row2'], t('最重要的 10 种 thaat 里的 6 种', '主要な 10 の thaat のうち 6 つ', '6 of the 10 main thaats'), 'below'),
      m('row0', t('Sa 可以放在任何音高上', 'Sa はどの高さにも置ける', 'Sa can sit on any pitch')),
      m(['row1', 'row2'], t('和西方调式同音', '西洋の旋法と同じ音', 'same notes as Western modes'), 'below'),
    ],
  },
  heptatonic: {
    dropKeys: true,
    visual: { kind: 'piano', from: 60, to: 71, lit: [60, 62, 64, 65, 67, 69, 71], names: 'lit', labels: { 60: t('宫', '宮', 'gong'), 62: t('商', '商', 'sh.'), 64: t('角', '角', 'jue'), 65: t('清角', '清角', 'qj.'), 67: t('徵', '徴', 'zhi'), 69: t('羽', '羽', 'yu'), 71: t('变宫', '変宮', 'bg.') } },
    tour: [
      [m('k65', t('清角 = F', '清角 = F', 'qingjue = F')), m('k71', t('变宫 = B', '変宮 = B', 'biangong = B'))],
      m(keys(60, 71), t('清乐音阶', '清楽音階', 'qingyue scale'), 'below'),
      null,
      null,
    ],
  },
  temperaments: {
    visual: { kind: 'blocks', rows: [{ cells: [{ text: '3 : 2', sub: t('纯五度', '純正 5 度', 'pure 5th') }] }, { cells: [t('纯', '純正', 'pure'), t('纯', '純正', 'pure'), t('纯', '純正', 'pure'), '…', { text: t('狼五度', 'ウルフ', 'wolf'), lit: true }].map((cell) => (cell.text ? cell : { text: cell })) }] },
    tour: [
      m('c0-0', t('频率比 3:2', '周波数比 3:2', 'frequency ratio 3:2')),
      m('c1-4', t('最后剩下一个难听的五度', '最後に残る汚い 5 度', 'one bad fifth left over'), 'below'),
      m('row1', t('哪些要纯、哪些让一点', 'どれを純正に、どれを譲るか', 'which to keep pure, which to temper'), 'below'),
    ],
  },
  welltemper: {
    visual: { kind: 'circle', highlight: [] },
    tour: [
      null,
      m(['M:C', 'M:G', 'M:D', 'M:A', 'M:E', 'M:B', 'M:F#', 'M:Db', 'M:Ab', 'M:Eb', 'M:Bb', 'M:F'], t('12 个纯五度回不到原点', '純正 5 度 12 回では戻れない', '12 pure fifths overshoot')),
      m(['M:Ab', 'M:Eb'], t('狼五度：G♯–E♭', 'ウルフ：G♯–E♭', 'wolf: G♯–E♭')),
      [m(['M:C', 'M:G', 'M:D', 'M:A'], t('C–G、G–D、D–A 缩窄', 'C–G・G–D・D–A を狭く', 'C–G, G–D, D–A narrowed')), m(['M:B', 'M:F'], t('B–F 缩窄', 'B–F を狭く', 'B–F narrowed'), 'below')],
    ],
  },
  harmonics: {
    visual: {
      kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }],
      notes: [{ p: 'C2', s: 1, label: 'f' }, { p: 'C3', s: 1, label: '2f' }, { p: 'G3', s: 1, label: '3f' }, { p: 'C4', s: 0, label: '4f' }, { p: 'E4', s: 0, label: '5f' }, { p: 'G4', s: 0, label: '6f' }].map((n) => ({ ...n, d: 'w' })),
    },
    tour: [
      m('n0', t('基频 f', '基音 f', 'fundamental f'), 'below'),
      m(ns(1, 2, 3, 4, 5), t('高于基频的成分：泛音', '基音より上：倍音', 'above it: overtones')),
      [m(ns(0, 1), t('八度', 'オクターヴ', 'octave'), 'below'), m(ns(1, 2), t('纯五度', '完全 5 度', 'P5')), m(ns(2, 3), t('纯四度', '完全 4 度', 'P4'))],
      null,
    ],
  },

  // ---------------- 二十世纪与微分音 ----------------
  pitchclass: {
    visual: { kind: 'clock', pcs: [8], names: true },
    tour: [
      m('pc8', t('A♭4、A♭3、G♯2 都是 8', 'A♭4・A♭3・G♯2 はすべて 8', 'A♭4, A♭3, G♯2 are all 8')),
      m('pc0', t('C = 0', 'C = 0', 'C = 0')),
      m(['pc9', 'pc5'], t('9 → 5：顺时针数 8', '9 → 5：時計回りに 8', '9 → 5: 8 clockwise')),
      null,
    ],
  },
  posttonal: {
    visual: { kind: 'clock', pcs: [0, 4, 7], names: true },
    tour: [
      m('pc0', t('固定零：C = 0', '固定ド：C = 0', 'fixed zero: C = 0')),
      m(['pc11', 'pc0'], t('11 之后回到 0', '11 の次は 0', 'after 11 comes 0')),
      m(['pc0', 'pc4', 'pc7'], t('每个数都加 n', 'すべてに n を足す', 'add n to each')),
    ],
  },
  setclass: {
    visual: { kind: 'clock', pcs: [0, 4, 7], names: true },
    tour: [
      m(['pc0', 'pc4', 'pc7'], t('音级集合 {0, 4, 7}', 'ピッチクラス集合 {0, 4, 7}', 'pc set {0, 4, 7}')),
      null,
      m(['pc0', 'pc4', 'pc7'], t('大三和弦：(037)', '長三和音：(037)', 'major triad: (037)')),
      m(['pc0', 'pc4', 'pc7'], '<001110>'),
    ],
  },
  collections: {
    visual: { kind: 'piano', from: 60, to: 72, lit: [60, 61, 64, 65, 68, 69], names: 'lit' },
    tour: [
      m(keys(61, 63, 66, 68, 70), t('五声音集 = 钢琴黑键', '五音音階 = 黒鍵', 'pentatonic = black keys')),
      m(keys(60, 61, 64, 65, 68, 69), t('1–3–1–3–1：六声音集', '1–3–1–3–1：ヘキサトニック', '1–3–1–3–1: hexatonic'), 'below'),
      null,
      null,
    ],
  },
  twelvetone: {
    visual: {
      kind: 'blocks',
      rows: [
        { cells: [{ text: 'P', sub: t('原型', '原形', 'prime') }, { text: 'I', sub: t('倒影', '反行', 'inversion') }, { text: 'R', sub: t('逆行', '逆行', 'retrograde') }, { text: 'RI', sub: t('逆行倒影', '逆行反行', 'retro-inv.') }] },
        { cells: [{ text: 'P0 = C', sub: t('固定零', '固定ド', 'fixed zero') }, { text: t('P0 = 第一个音', 'P0 = 最初の音', 'P0 = first note'), sub: t('可动零', '移動ド', 'movable zero') }] },
      ],
    },
    tour: [
      null,
      m('row0', t('四种变化', '4 つの変形', 'four transformations')),
      null,
      m('row1', t('两种编号习惯', '2 通りの番号の付け方', 'two numbering habits'), 'below'),
    ],
  },
  micro: {
    visual: {
      kind: 'blocks',
      rows: [
        { cells: [{ text: '1200¢', sub: t('一个八度', '1 オクターヴ', 'one octave') }] },
        { cells: [{ text: '12', sub: t('钢琴', 'ピアノ', 'piano') }, { text: '24', sub: t('四分之一音', '4 分音', 'quarter tones') }, { text: '53', sub: 'koma' }] },
      ],
    },
    tour: [
      m('c0-0', t('一个八度 = 1200 音分', '1 オクターヴ = 1200 セント', 'octave = 1200 cents')),
      m(['c1-0', 'c1-1'], t('切 12 份 / 24 份', '12 等分 / 24 等分', '12 or 24 parts'), 'below'),
      m('c1-2', t('土耳其理论：53 个 koma', 'トルコ理論：53 コマ', 'Turkish theory: 53 koma'), 'below'),
    ],
  },
  microharmony: {
    visual: { kind: 'ruler', from: 280, to: 420, ticks: [{ at: 300, label: t('小三度', '短 3 度', 'm3') }, { at: 347.41, label: '11:9', up: false }, { at: 350, label: t('中立', '中立', 'neutral'), lit: true }, { at: 400, label: t('大三度', '長 3 度', 'M3') }] },
    tour: [
      m(['t1', 't2'], t('比小三度宽、比大三度窄', '短 3 度より広く長 3 度より狭い', 'wider than m3, narrower than M3')),
      null,
      null,
    ],
  },
};

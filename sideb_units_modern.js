// Side-B 第 6 章（二十世纪与微分音）：B6-1 ~ B6-5。
// 出处（每条事实都在原文里核对过）：
//   音高 vs 音级：音高是有具体频率的音（不含八度等同，C4 和 C3 是不同的音高）；音级是八度等同与等音等同的一组音高（A♭4、A♭3、G♯2 是同一个音级）；
//     整数记法 C = 0、C♯/D♭ = 1 …… B = 11，像钟面：ref:omt2e-pitch-class
//   四种音程：有序音高音程（半音数，带 + / − 表方向）、无序音高音程（不带方向）、有序音级音程（在钟面上顺时针往上数，C→E = 4、E→C = 8）、
//     音程级（两音级之间较短的距离，总是 ≤ 6）；在无调性音乐里 G–B♭ 和 G–A♯ 是同一个音程，不再用"小三度"这类调性名称：ref:omt2e-integer-intervals
//   音级集合：任意一组音级；标准顺序 = 升序排列里最紧凑的写法（写成方括号）：写成一个八度内的升序、把第一个音级复制到末尾、找相邻最大的有序音级音程、
//     从它右边的音级开始写；Tn：每个音级加 n（模 12）；In：用 n 减去每个音级：ref:omt2e-normal-order
//   集合类 = 由移位或倒影相关的一组音级集合；用原型命名（标准顺序移到 0，与其倒影的同样结果比，取更靠左紧凑者，写在圆括号里）；
//     同性质的三和弦移位相关，大小三和弦倒影相关（C 大三 I0 = F 小三）：ref:omt2e-prime-form
//   音程级向量：数出集合里每两个音级之间的音程级（ic1–ic6），写成六位数放在尖括号里；C 大三和弦 = <001110>；三音集合的总和是 3、四音 6、五音 10：ref:omt2e-ic-vector
//   Forte 编号与集合类表：ref:wiki-set-classes
//   音集：自然音音集（不强调中心音时叫泛自然音）、五声（ma2–ma2–mi3–ma2–mi3，五个纯五度、钢琴黑键）、全音（只有两个：偶数 WT0 与奇数 WT1）、
//     八音（全半交替，只有三个）、六音（1–3–1–3–1–3）、原音音集；梅西安的有限移位调式：移位不到 12 种就会重复：ref:omt2e-collections
//   有限移位调式：可以移到十二个音上，但至少有两次移位得到相同的音级；由 Olivier Messiaen 整理，发表在《我的音乐语言的技巧》里；
//     第一调式就是全音音阶：ref:wiki-messiaen-modes
//   十二音：大致平等地使用十二个音级，通常不找调、调式或主音；用一个固定的十二音顺序（音列），常用移位（T）、倒影（I）、逆行（R）、逆行倒影（RI）；
//     一共有 479,001,600 种音列；除非音列有特殊对称，每条音列有 48 个形式（P、I、R、RI 各 12 个）；常与"第二维也纳乐派"（Schoenberg、Webern、Berg）联系在一起；
//     "序列主义"更宽，不一定是十二音：ref:omt2e-twelve-tone
//   行形式的命名：固定零（P0 从 C 开始，最常见）与移动零（P0 由分析者选定）；I0 与 P0 同一个起音，R0 从 P0 的最后一个音开始；
//     矩阵第一类：P 读行、I 读列；Elisabeth Lutyens《Motet》的音列以 C 为 0 是 0–11–3–7–8–4–2–6–5–1–9–10：ref:omt2e-row-naming
//   极限（limit）：一个律制的频率比里用到的最大质数（或奇数）因子，这个说法来自 Harry Partch；7-limit 叫 septimal，11-limit 叫 undecimal：ref:wiki-limit
//   纯律里音高写成相对 1/1 的分数，2/1 是八度：ref:gann-ji；纯律音程的标准名称：ref:hf-intervals
//   中立三度：比小三度宽、比大三度窄；24 平均律里是 350 音分；纯律的中立三度 11:9 约 347.41 音分，是大三度 5/4 与小三度 6/5 的中项：ref:wiki-neutral-third
const t = (zh, ja, en) => ({ zh, ja, en });
const G = (id, gen, count, skills, params) => ({ id, type: 'gen', gen, count, skills, ...(params ? { params } : {}) });

// ===================== B6-1 音级与整数音程 =====================
export const LEVEL_B6_1 = {
  minutes: 12,
  insight: t('无调性音乐里不再问"小三度还是增二度"，只数半音：G–B♭ 和 G–A♯ 都是 3。', '無調の音楽では「短 3 度か増 2 度か」を問わず半音を数えるだけ：G–B♭ も G–A♯ も 3。', 'In atonal music you stop asking “minor third or augmented second?” and just count semitones: G–B♭ and G–A♯ are both 3.'),
  sections: {
    discover: [
      {
        id: 'b61-d1', type: 'discover', ref: 'omt2e-integer-intervals',
        prompt: t('先听 G–B♭，再听 G–A♯。在钢琴上是同两个键。没有调的时候，它们还算两种不同的音程吗？', 'まず G–B♭、次に G–A♯。ピアノでは同じ 2 つの鍵。調がないとき、これは別の音程？', 'Hear G–B♭, then G–A♯ — the same two piano keys. Without a key, are they still different intervals?'),
        play: [{ label: 'G–B♭', audio: { notes: [67, 70], mode: 'harmonic' } }, { label: 'G–A♯', audio: { notes: [67, 70], mode: 'harmonic' } }],
        options: [t('不算：都是 3 个半音', '別ではない：どちらも半音 3 つ', 'No: both are 3 semitones'), t('算：一个小三度、一个增二度', '別：短 3 度と増 2 度', 'Yes: a minor third and an augmented second'), t('听不出来', '分からない', 'Can’t tell')],
        answer: 0,
        insight: {
          title: t('用半音数代替调性名称', '調性の名前の代わりに半音の数', 'Semitone counts replace tonal names'),
          text: t('在调性音乐里，G–B♭（小三度）和 G–A♯（增二度）因为调不同而不同；无调性音乐没有调，这个区别就不重要了，所以我们直接数半音。音级也一样：八度等同、等音等同的一组音高算同一个音级，用整数 0–11 表示（C = 0）。', '調性音楽では G–B♭（短 3 度）と G–A♯（増 2 度）は調によって違う。無調の音楽には調がないので、この違いは意味がなくなり、半音を数える。音級も同じ：オクターヴと異名同音で等しい音高のグループを 1 つの音級として、整数 0–11（C = 0）で表す。', 'In tonal music G–B♭ (minor third) and G–A♯ (augmented second) differ by context; atonal music has no key, so the distinction falls away and we count semitones. Pitch classes work the same way: pitches equivalent by octave and enharmonic spelling form one pitch class, numbered 0–11 (C = 0).'),
        },
      },
    ],
    explain: [
      {
        id: 'b61-e1', type: 'page', ref: 'omt2e-integer-intervals',
        title: t('四种音程', '4 種類の音程', 'Four kinds of interval'),
        text: [
          t('有序音高音程：两个具体音高之间的半音数，带 + / − 表方向（C4→E5 = +16）。无序音高音程：同样数半音，但不管方向（16）。有序音级音程：在钟面上从第一个音级顺时针数到第二个（C→E = 4，E→C = 8，就像 9 点到 5 点是 8 个小时）。音程级：两个音级之间较短的那段距离，所以总是 ≤ 6。', '順序付き音高音程：2 つの音高の間の半音数、+ / − で方向（C4→E5 = +16）。順序なし音高音程：半音を数えるが方向は問わない（16）。順序付き音級音程：時計で 1 つ目の音級から 2 つ目まで時計回りに（C→E = 4、E→C = 8、9 時から 5 時が 8 時間のように）。音程クラス：2 つの音級の間の短い方の距離なので常に 6 以下。', 'Ordered pitch interval: semitones between two specific pitches, signed for direction (C4→E5 = +16). Unordered pitch interval: the same count without direction (16). Ordered pitch-class interval: count clockwise around the clock from the first pc to the second (C→E = 4, E→C = 8 — like 9 o’clock to 5 o’clock being 8 hours). Interval class: the shorter distance between two pcs, so always ≤ 6.'),
        ],
        visual: { kind: 'clock', pcs: [0, 4] },
        tool: { feature: 'posttonal' },
      },
      {
        id: 'b61-e2', type: 'discover', practice: true, ref: 'omt2e-pitch-class',
        prompt: t('A♭4、A♭3、G♯2 是同一个音级吗？它的整数是几？', 'A♭4・A♭3・G♯2 は同じ音級？ 整数は？', 'Are A♭4, A♭3 and G♯2 the same pitch class? What is its integer?'),
        options: [t('是，都是 8', '同じ、どれも 8', 'Yes, all 8'), t('不是，三个音高不同', '違う、音高が違う', 'No, they are different pitches'), t('是，都是 9', '同じ、どれも 9', 'Yes, all 9')],
        answer: 0,
        insight: { title: t('八度等同 + 等音等同', 'オクターヴ等価 + 異名同音', 'Octave plus enharmonic equivalence'), text: t('音高不同（八度、拼法都不同），但属于同一个音级：G♯ / A♭ = 8。', '音高は違う（オクターヴも綴りも違う）が、同じ音級：G♯ / A♭ = 8。', 'Different pitches (octave and spelling differ), one pitch class: G♯/A♭ = 8.') },
      },
    ],
    experiment: [
      { id: 'b61-x1', type: 'experiment', toy: 'pc', ref: ['omt2e-pitch-class', 'omt2e-integer-intervals'],
        prompt: t('选两个音级，看两个方向的有序音级音程和音程级。为什么两个方向加起来总是 12？音程级最大会是几？', '2 つの音級を選び、両方向の順序付き音級音程と音程クラスを見よう。両方向を足すといつも 12 なのはなぜ？ 音程クラスの最大は？', 'Pick two pitch classes and see the ordered pc interval both ways plus the interval class. Why do the two directions always add up to 12? What is the largest interval class?'),
        params: {},
        breakthrough: { id: 'b61-clock', text: t('你在钟面上数出了音程：顺时针一圈是 12。', '時計の上で音程を数えた：時計回り 1 周は 12。', 'You counted intervals on the clock: once round is 12.') } },
    ],
    challenge: [
      {
        id: 'b61-c1', type: 'choice', error: 'pc-interval', skills: ['calc'], ref: 'omt2e-integer-intervals',
        variants: [
          { prompt: t('E→C 的有序音级音程是？', 'E→C の順序付き音級音程は？', 'The ordered pc interval E→C is…'), options: ['8', '4', '−4', '6'] },
          { prompt: t('C4→E5 的有序音高音程是？', 'C4→E5 の順序付き音高音程は？', 'The ordered pitch interval C4→E5 is…'), options: ['+16', '+4', '16', '−8'] },
          { prompt: t('C 和 A 之间的音程级是？', 'C と A の音程クラスは？', 'The interval class between C and A is…'), options: ['3', '9', '−3', '6'] },
        ],
        answer: 0,
        explain: t('有序音级音程顺时针数（E→C = 8）；有序音高音程带方向与八度（C4→E5 = +16）；音程级取较短的一边（C–A：9 与 3 取 3）。', '順序付き音級音程は時計回り（E→C = 8）。順序付き音高音程は方向とオクターヴを含む（C4→E5 = +16）。音程クラスは短い方（C–A：9 と 3 なら 3）。', 'Ordered pc intervals count clockwise (E→C = 8); ordered pitch intervals keep direction and octave (C4→E5 = +16); interval class takes the shorter way (C–A: 3, not 9).'),
      },
      {
        id: 'b61-c2', type: 'choice', error: 'pc-interval', skills: ['identify'], ref: 'omt2e-integer-intervals',
        variants: [
          { prompt: t('音程级最大是多少？', '音程クラスの最大は？', 'The largest interval class is…'), options: ['6', '11', '12', '7'] },
          { prompt: t('下面哪种音程既不管八度也不管方向？', 'オクターヴも方向も問わない音程は？', 'Which interval ignores both octave and direction?'), options: [t('音程级', '音程クラス', 'Interval class'), t('有序音高音程', '順序付き音高音程', 'Ordered pitch interval'), t('无序音高音程', '順序なし音高音程', 'Unordered pitch interval'), t('有序音级音程', '順序付き音級音程', 'Ordered pc interval')] },
        ],
        answer: 0,
        explain: t('音程级取两音级之间较短的距离，所以 ≤ 6；它不管八度、也不管方向，是最抽象的一种。', '音程クラスは短い方の距離なので 6 以下。オクターヴも方向も問わない最も抽象的なもの。', 'Interval class is the shorter distance, so ≤ 6; it ignores octave and direction — the most abstract kind.'),
      },
      {
        id: 'b61-c3', type: 'choice', error: 'pc-interval', skills: ['spell'], ref: 'omt2e-pitch-class',
        variants: [
          { prompt: t('音级 11 是哪个音？', '音級 11 はどの音？', 'Pitch class 11 is…'), options: [t('B（或 C♭）', 'B（または C♭）', 'B (or C♭)'), t('B♭', 'B♭', 'B♭'), t('C', 'C', 'C'), t('A♯', 'A♯', 'A♯')] },
          { prompt: t('E♯ 是音级几？', 'E♯ は音級いくつ？', 'E♯ is pitch class…'), options: ['5', '4', '6', '11'] },
        ],
        answer: 0,
        explain: t('C = 0，往上数半音：B = 11；E♯ 和 F 等音，是 5。', 'C = 0 から半音を数える：B = 11。E♯ は F と異名同音で 5。', 'Count semitones from C = 0: B = 11; E♯ is enharmonic with F, so 5.'),
      },
      G('b61-g1', 'pcInteger', 2, ['spell']),
      G('b61-g2', 'intervalClass', 1, ['calc']),
    ],
  },
  pool: [G('b61-p1', 'pcInteger', 3, ['spell']), G('b61-p2', 'intervalClass', 3, ['calc'])],
};

// ===================== B6-2 音集与对称 =====================
export const LEVEL_B6_2 = {
  minutes: 12,
  insight: t('全音音集只有 2 个、八音 3 个、六音 4 个：越对称的音集，越快"移回自己"。', '全音音集合は 2 つ、八音は 3 つ、六音は 4 つ：対称な音集合ほど早く「自分に戻る」。', 'Two whole-tone collections, three octatonic, four hexatonic: the more symmetric the collection, the sooner it transposes back onto itself.'),
  sections: {
    discover: [
      {
        id: 'b62-d1', type: 'discover', ref: ['omt2e-collections', 'wiki-messiaen-modes'],
        prompt: t('把 C 大调音阶往上移一个半音，音全换了吗？再把全音音阶（C D E F♯ G♯ A♯）往上移一个全音呢？', 'ハ長調音階を半音上げると音はすべて変わる？ 全音音階（C D E F♯ G♯ A♯）を全音上げると？', 'Move the C major scale up a semitone — do all the notes change? Now move the whole-tone scale (C D E F♯ G♯ A♯) up a whole step.'),
        play: [{ label: t('全音音阶', '全音音階', 'Whole-tone'), audio: { notes: [60, 62, 64, 66, 68, 70, 72], mode: 'melody' } }, { label: t('移一个全音', '全音上へ', 'Up a whole step'), audio: { notes: [62, 64, 66, 68, 70, 72, 74], mode: 'melody' } }],
        options: [t('全音音阶移一个全音后，音完全没变', '全音音階は全音上げても音がまったく変わらない', 'The whole-tone scale moved a whole step has exactly the same notes'), t('两个都完全变了', 'どちらもすべて変わる', 'Both change completely'), t('大调音阶没变', '長音階が変わらない', 'The major scale stays the same')],
        answer: 0,
        insight: {
          title: t('有限移位', '移高の限られた旋法', 'Limited transposition'),
          text: t('自然音音集移 12 次得到 12 个不同的音集；全音音集只有两个（偶数 WT0、奇数 WT1），八音音集只有三个。Olivier Messiaen 把这种"移位到某一步就和原来一样"的调式整理成"有限移位调式"，第一调式就是全音音阶。', '全音階の音集合は 12 回移すと 12 通り。全音音集合は 2 つだけ（偶数 WT0・奇数 WT1）、八音音集合は 3 つ。Olivier Messiaen はこのように「ある所まで移すと元と同じになる」旋法を「移調の限られた旋法」としてまとめ、第 1 旋法が全音音階。', 'The diatonic collection gives 12 different collections under transposition; there are only two whole-tone collections (even WT0, odd WT1) and three octatonic. Olivier Messiaen catalogued such modes — which repeat before reaching twelve transpositions — as “modes of limited transposition”; his Mode 1 is the whole-tone scale.'),
        },
      },
    ],
    explain: [
      {
        id: 'b62-e1', type: 'page', ref: 'omt2e-collections',
        title: t('二十世纪常用的音集', '20 世紀によく使われた音集合', 'Collections favoured in the 20th century'),
        text: [
          t('自然音音集：不刻意强调某个中心音时叫泛自然音（Stravinsky《彼得鲁什卡》开头常这样写）。五声音集：ma2–ma2–mi3–ma2–mi3，也可以看成五个纯五度，或钢琴的黑键；没有半音，任何一个音都容易当中心。全音音集：六个全音，只有两个。八音音集：全半交替，八个音，只有三个，爵士叫减音阶。六音音集：1–3–1–3–1–3。原音音集：像 Mixolydian 但升四级，大致对应泛音列最低的几个分音。', '全音階の音集合：中心音を強調しないときは汎全音階（ストラヴィンスキー《ペトルーシュカ》冒頭など）。五音音集合：長 2–長 2–短 3–長 2–短 3、完全 5 度 5 つ、ピアノの黒鍵とも見られる。半音がなくどの音も中心になりやすい。全音音集合：全音 6 つ、2 つだけ。八音音集合：全半交互の 8 音、3 つだけ、ジャズのディミニッシュ。六音音集合：1–3–1–3–1–3。アコースティック：♯4 のミクソリディアンのようで、倍音列の低い部分音にほぼ対応。', 'Diatonic: without a stressed centre it is pandiatonic (as often in the opening of Stravinsky’s Petrushka). Pentatonic: M2–M2–m3–M2–m3, also a stack of five perfect fifths or the black keys; with no semitones, any note can serve as centre. Whole-tone: six whole steps, only two exist. Octatonic: alternating whole and half steps, eight notes, only three exist — jazz’s diminished scale. Hexatonic: 1–3–1–3–1–3. Acoustic: like Mixolydian with a raised fourth, roughly matching the lowest partials of the harmonic series.'),
        ],
        tool: { feature: 'posttonal' },
      },
      {
        id: 'b62-e2', type: 'discover', practice: true, ref: 'omt2e-collections',
        prompt: t('全音音集 WT0 包含哪些音级？', '全音音集合 WT0 の音級は？', 'Which pitch classes are in WT0?'),
        options: [t('所有偶数：0 2 4 6 8 10', 'すべての偶数：0 2 4 6 8 10', 'all even ones: 0 2 4 6 8 10'), t('所有奇数', 'すべての奇数', 'all odd ones'), t('0 3 6 9', '0 3 6 9', '0 3 6 9')],
        answer: 0,
        insight: { title: t('一偶一奇', '偶数と奇数', 'Even and odd'), text: t('WT0 = 偶数音级（从 C 开始），WT1 = 奇数音级（从 C♯ 开始）；把 WT1 往上移一个半音就回到 WT0。', 'WT0 = 偶数の音級（C から）、WT1 = 奇数（C♯ から）。WT1 を半音上げると WT0 に戻る。', 'WT0 is the even pcs (from C), WT1 the odd ones (from C♯); moving WT1 up a semitone gives WT0 again.') },
      },
    ],
    experiment: [
      { id: 'b62-x1', type: 'experiment', toy: 'collection', ref: ['omt2e-collections', 'wiki-messiaen-modes'],
        prompt: t('选一个音集，一个个点 T0–T11，看和 T0 共有几个音；下面会写出一共有几个不同的移位。哪个音集移到 T4 就和原来一模一样？', '音集合を選び、T0–T11 を順に押して T0 との共通音の数を見よう。異なる移高が何通りあるかも出る。T4 で元とまったく同じになる音集合は？', 'Pick a collection and step through T0–T11, watching how many notes it shares with T0; the total number of distinct transpositions appears below. Which collection is identical to itself at T4?'),
        params: {},
        breakthrough: { id: 'b62-symmetry', text: t('你找到了会"移回自己"的音集。', '「自分に戻る」音集合を見つけた。', 'You found collections that transpose back onto themselves.') } },
    ],
    challenge: [
      {
        id: 'b62-c1', type: 'choice', error: 'collection', skills: ['calc'], ref: ['omt2e-collections', 'wiki-messiaen-modes'],
        variants: [
          { prompt: t('不同的八音音集一共有几个？', '異なる八音音集合はいくつ？', 'How many distinct octatonic collections are there?'), options: ['3', '2', '12', '8'] },
          { prompt: t('不同的全音音集一共有几个？', '異なる全音音集合はいくつ？', 'How many distinct whole-tone collections are there?'), options: ['2', '6', '12', '3'] },
          { prompt: t('不同的六音音集（1–3–1–3–1–3）一共有几个？', '異なる六音音集合（1–3–1–3–1–3）はいくつ？', 'How many distinct hexatonic (1–3–1–3–1–3) collections are there?'), options: ['4', '3', '6', '12'] },
        ],
        answer: 0,
        explain: t('全音音集每 2 个半音重复（2 个），八音每 3 个（3 个），六音每 4 个（4 个）。', '全音音集合は半音 2 つごとに重なる（2 つ）、八音は 3（3 つ）、六音は 4（4 つ）。', 'Whole-tone repeats every 2 semitones (2 collections), octatonic every 3 (3), hexatonic every 4 (4).'),
      },
      {
        id: 'b62-c2', type: 'choice', error: 'collection', skills: ['identify'], ref: 'omt2e-collections',
        variants: [
          { prompt: t('五声音集的相邻音程排列是？', '五音音集合の隣接音程の並びは？', 'The pentatonic collection’s step pattern is…'), options: ['ma2–ma2–mi3–ma2–mi3', 'ma2–ma2–mi2–ma2–ma2–ma2–mi2', 'mi2–ma2 交替', 'ma2 × 6'] },
          { prompt: t('原音音集最像哪个调式？', 'アコースティック音集合に最も近い旋法は？', 'The acoustic collection is most like which mode?'), options: [t('Mixolydian 但升四级', '♯4 のミクソリディアン', 'Mixolydian with a raised fourth'), t('Dorian', 'ドリアン', 'Dorian'), t('Phrygian', 'フリジアン', 'Phrygian'), t('Locrian', 'ロクリアン', 'Locrian')] },
          { prompt: t('不刻意强调中心音地使用自然音音集，叫？', '中心音を強調せず全音階の音集合を使うことを何という？', 'Using the diatonic collection without stressing any centre is called…'), options: [t('泛自然音', '汎全音階', 'pandiatonicism'), t('十二音', '12 音', 'twelve-tone'), t('调式混合', '同主調借用', 'mode mixture'), t('全音音阶', '全音音階', 'whole-tone')] },
        ],
        answer: 0,
        explain: t('五声：ma2–ma2–mi3–ma2–mi3；原音音集：Mixolydian 升四级；不强调中心音的自然音音集叫泛自然音。', '五音：長 2–長 2–短 3–長 2–短 3。アコースティック：♯4 のミクソリディアン。中心音を強調しない全音階は汎全音階。', 'Pentatonic: M2–M2–m3–M2–m3; acoustic: Mixolydian with ♯4; diatonic without a centre is pandiatonic.'),
      },
      {
        id: 'b62-c3', type: 'choice', error: 'collection', skills: ['identify'], ref: 'wiki-messiaen-modes',
        variants: [
          { prompt: t('"有限移位调式"是谁整理的？', '「移調の限られた旋法」をまとめたのは？', 'Who catalogued the “modes of limited transposition”?'), options: ['Olivier Messiaen', 'Arnold Schoenberg', 'Igor Stravinsky', 'Claude Debussy'] },
          { prompt: t('有限移位调式的第一调式是？', '移調の限られた旋法の第 1 旋法は？', 'Messiaen’s Mode 1 is…'), options: [t('全音音阶', '全音音階', 'the whole-tone scale'), t('八音音阶', '八音音階', 'the octatonic scale'), t('大调音阶', '長音階', 'the major scale'), t('五声音阶', '五音音階', 'the pentatonic scale')] },
        ],
        answer: 0,
        explain: t('Messiaen 在《我的音乐语言的技巧》里整理了有限移位调式；第一调式就是全音音阶。', 'Messiaen は《わが音楽語法》で移調の限られた旋法をまとめた。第 1 旋法が全音音階。', 'Messiaen catalogued them in The Technique of My Musical Language; Mode 1 is the whole-tone scale.'),
      },
      G('b62-g1', 'tnIn', 2, ['calc']),
      G('b62-g2', 'symmetricScale', 1, ['identify']),
    ],
  },
  pool: [G('b62-p1', 'tnIn', 3, ['calc']), G('b62-p2', 'symmetricScale', 3, ['identify'])],
};

// ===================== B6-3 集合级分析 =====================
export const LEVEL_B6_3 = {
  minutes: 19, core: true,
  insight: t('听起来"像一家人"的和弦，往往是同一个集合类：移位或倒影过去，音程内容一模一样。', '「家族のように」聞こえる和音は、たいてい同じセット・クラス：移高や反転をしても音程の中身はまったく同じ。', 'Chords that sound like family usually share a set class: transposed or inverted, their interval content is identical.'),
  sections: {
    discover: [
      {
        id: 'b63-d1', type: 'discover', ref: 'omt2e-prime-form',
        prompt: t('三个和弦：C–D♭–E、D–E♭–F♯、C–E♭–E。它们听起来像一家人吗？', '3 つの和音：C–D♭–E、D–E♭–F♯、C–E♭–E。家族のように聞こえる？', 'Three chords: C–D♭–E, D–E♭–F♯, C–E♭–E. Do they sound related?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: { chords: [[60, 61, 64], [62, 63, 66], [60, 63, 64]], gap: 1000 } }],
        options: [t('像：同样的"半音 + 小三度 + 大三度"', '似ている：同じ「半音 + 短 3 度 + 長 3 度」', 'Yes: the same semitone + minor third + major third'), t('完全不像', 'まったく似ていない', 'Not at all'), t('只有前两个像', '最初の 2 つだけ', 'Only the first two')],
        answer: 0,
        insight: {
          title: t('同一个集合类 (014)', '同じセット・クラス (014)', 'One set class: (014)'),
          text: t('C–D♭–E 是 [0,1,4]；D–E♭–F♯ 是它的 T2；C–E♭–E 是它的倒影。集合类就是由移位或倒影相关的一组音级集合，用原型命名：(014)。就像所有大三和弦彼此移位相关、大小三和弦彼此倒影相关一样。', 'C–D♭–E は [0,1,4]、D–E♭–F♯ はその T2、C–E♭–E はその反転。セット・クラスは移高か反転で関係づく音級集合のグループで、プライム・フォームで呼ぶ：(014)。長三和音どうしが移高関係、長三と短三が反転関係にあるのと同じ。', 'C–D♭–E is [0,1,4]; D–E♭–F♯ is its T2; C–E♭–E is its inversion. A set class is a group of pc sets related by transposition or inversion, named by its prime form: (014). Just as all major triads are related by transposition, and major and minor triads by inversion.'),
        },
      },
    ],
    explain: [
      {
        id: 'b63-e1', type: 'page', ref: 'omt2e-normal-order',
        title: t('标准顺序、Tn 与 In', '正規順序・Tn・In', 'Normal order, Tn and In'),
        text: [
          t('标准顺序 = 最紧凑的升序写法（方括号）：把音级在一个八度内升序排好，把第一个复制到末尾，找相邻最大的有序音级音程，从它右边那个音级开始写。例：G♯、A、D♯ → 8,9,3,8，最大的是 9→3（6）→ [3,8,9]。', '正規順序 = 最も詰まった上行の書き方（角括弧）：1 オクターヴ内で上行に並べ、最初の音級を最後に複製し、隣接する最大の順序付き音級音程を探して、その右の音級から書く。例：G♯・A・D♯ → 8,9,3,8、最大は 9→3（6）→ [3,8,9]。', 'Normal order is the most compact ascending arrangement (square brackets): list the pcs ascending within an octave, copy the first to the end, find the largest ordered pc interval between neighbours, and start from the pc to its right. Example: G♯, A, D♯ → 8,9,3,8; the largest is 9→3 (6) → [3,8,9].'),
          t('Tn：每个音级加 n（模 12）。In：用 n 减去每个音级（n − x）。', 'Tn：各音級に n を足す（mod 12）。In：n から各音級を引く（n − x）。', 'Tn adds n to every pc (mod 12). In subtracts every pc from n (n − x).'),
        ],
        tool: { feature: 'posttonal' },
      },
      {
        id: 'b63-e2', type: 'page', ref: ['omt2e-prime-form', 'omt2e-ic-vector'],
        title: t('原型与音程级向量', 'プライム・フォームと音程クラス・ベクトル', 'Prime form and the interval-class vector'),
        text: [
          t('原型：把标准顺序移到 0；再把它倒影、写成标准顺序、移到 0；两者里更靠左紧凑的那个就是原型，写在圆括号里不加逗号，例如 (02357)。原型只是集合类的名字，本身没有特别地位。', 'プライム・フォーム：正規順序を 0 に移す。それを反転して正規順序にし 0 に移す。左に詰まっている方がプライム・フォームで、丸括弧にカンマなしで書く（例 (02357)）。名前にすぎず特別な地位はない。', 'Prime form: transpose the normal order to 0; also invert it, put that in normal order and transpose to 0; whichever is more packed to the left is the prime form, written in parentheses without commas, e.g. (02357). It is just a label for the set class.'),
          t('音程级向量：数出每两个音级之间的音程级（ic1–ic6），写成尖括号里的六位数。C 大三和弦 = <001110>。三音集合的总和一定是 3，四音 6，五音 10——可以用来检查自己算得对不对。', '音程クラス・ベクトル：すべての 2 音級間の音程クラス（ic1–ic6）を数え、山括弧の 6 桁にする。C 長三和音 = <001110>。三音集合の合計は必ず 3、四音 6、五音 10——検算に使える。', 'Interval-class vector: tally the interval class between every pair of pcs (ic1–ic6) as six digits in angle brackets. A C major triad is <001110>. A trichord’s digits always sum to 3, a tetrachord’s to 6, a pentachord’s to 10 — a handy check.'),
        ],
      },
      {
        id: 'b63-e3', type: 'discover', practice: true, ref: 'omt2e-ic-vector',
        prompt: t('C 大三和弦（0, 4, 7）的音程级向量是？', 'C 長三和音（0, 4, 7）の音程クラス・ベクトルは？', 'What is the interval-class vector of C major (0, 4, 7)?'),
        options: ['<001110>', '<010101>', '<100110>'],
        answer: 0,
        insight: { title: t('每两个音一对', '2 音ずつ', 'Every pair'), text: t('C–E = ic4、E–G = ic3、C–G = ic5：ic3、ic4、ic5 各一个 → <001110>。', 'C–E = ic4、E–G = ic3、C–G = ic5：ic3・ic4・ic5 が 1 つずつ → <001110>。', 'C–E = ic4, E–G = ic3, C–G = ic5: one each of ic3, ic4, ic5 → <001110>.') },
      },
    ],
    experiment: [
      { id: 'b63-x1', type: 'experiment', toy: 'set', ref: ['omt2e-normal-order', 'omt2e-prime-form', 'omt2e-ic-vector', 'wiki-set-classes'],
        prompt: t('在钟面上选几个音级，看标准顺序、原型、Forte 编号和音程级向量怎么变。试着找一个和 (014) 同一集合类、但音完全不同的三和弦。', '時計で音級をいくつか選び、正規順序・プライム・フォーム・フォルテ番号・音程クラス・ベクトルの変化を見よう。(014) と同じセット・クラスで音がまったく違う三和音を探してみて。', 'Select a few pcs on the clock and watch normal order, prime form, Forte number and ic vector change. Try to find a trichord in the same set class as (014) but with completely different notes.'),
        params: { start: [0, 1, 4] },
        breakthrough: { id: 'b63-analyse', text: t('你一步算出了标准顺序、原型和向量。', '正規順序・プライム・フォーム・ベクトルを一気に求めた。', 'You worked out normal order, prime form and vector in one go.') } },
    ],
    challenge: [
      {
        id: 'b63-c1', type: 'choice', error: 'normal-order', skills: ['calc'], ref: 'omt2e-normal-order',
        variants: [
          { prompt: t('音级 {8, 9, 3} 的标准顺序是？', '音級 {8, 9, 3} の正規順序は？', 'The normal order of {8, 9, 3} is…'), options: ['[3, 8, 9]', '[8, 9, 3]', '[9, 3, 8]', '[0, 1, 4]'] },
          { prompt: t('T4 [11, 2, 4] = ?', 'T4 [11, 2, 4] = ?', 'T4 [11, 2, 4] = ?'), options: ['[3, 6, 8]', '[7, 10, 0]', '[1, 4, 6]', '[11, 2, 4]'] },
          { prompt: t('I0 [0, 4, 7]（C 大三和弦）得到哪个三和弦？', 'I0 [0, 4, 7]（C 長三和音）はどの三和音？', 'I0 of [0, 4, 7] (C major) gives which triad?'), options: [t('F 小三和弦 [5, 8, 0]', 'F 短三和音 [5, 8, 0]', 'F minor [5, 8, 0]'), t('C 小三和弦', 'C 短三和音', 'C minor'), t('A 小三和弦', 'A 短三和音', 'A minor'), t('G 大三和弦', 'G 長三和音', 'G major')] },
        ],
        answer: 0,
        explain: t('标准顺序从最大间隔的右边开始写；Tn 加 n；In 用 n 减（0 − 0 = 0、0 − 4 = 8、0 − 7 = 5 → F 小三）。', '正規順序は最大の間隔の右から。Tn は n を足す。In は n から引く（0−0=0、0−4=8、0−7=5 → F 短三）。', 'Normal order starts right of the largest gap; Tn adds n; In subtracts from n (0−0 = 0, 0−4 = 8, 0−7 = 5 → F minor).'),
      },
      {
        id: 'b63-c2', type: 'choice', error: 'prime-form', skills: ['calc'], ref: 'omt2e-prime-form',
        variants: [
          { prompt: t('[10, 0, 2, 3, 5] 的原型是？', '[10, 0, 2, 3, 5] のプライム・フォームは？', 'The prime form of [10, 0, 2, 3, 5] is…'), options: ['(02357)', '(02457)', '(01357)', '(0235)'] },
          { prompt: t('大三和弦和小三和弦属于同一个集合类吗？', '長三和音と短三和音は同じセット・クラス？', 'Are major and minor triads in the same set class?'), options: [t('是，它们倒影相关：(037)', '同じ、反転関係：(037)', 'Yes — related by inversion: (037)'), t('不是，大三是 (047)', '違う、長三は (047)', 'No — major is (047)'), t('只有移位相关的才算', '移高関係だけが同じ', 'Only transpositions count'), t('不是，小三是 (034)', '違う、短三は (034)', 'No — minor is (034)')] },
        ],
        answer: 0,
        explain: t('移到 0 得 [0,2,4,5,7]，倒影再移到 0 得 [0,2,3,5,7]，后者更靠左紧凑 → (02357)；大小三和弦倒影相关，同属 (037)。', '0 に移すと [0,2,4,5,7]、反転して 0 に移すと [0,2,3,5,7]、後者の方が左に詰まる → (02357)。長三と短三は反転関係で (037)。', 'Transposed to 0: [0,2,4,5,7]; the inversion to 0: [0,2,3,5,7], more packed left → (02357); major and minor triads are inversionally related, both (037).'),
      },
      {
        id: 'b63-c3', type: 'choice', error: 'interval-vector', skills: ['calc'], ref: 'omt2e-ic-vector',
        variants: [
          { prompt: t('四音集合的音程级向量六个数加起来是？', '四音集合の音程クラス・ベクトルの合計は？', 'A tetrachord’s ic-vector digits sum to…'), options: ['6', '4', '3', '10'] },
          { prompt: t('[4, 6, 9, 0]（E F♯ A C）的音程级向量是？', '[4, 6, 9, 0]（E F♯ A C）のベクトルは？', 'The ic vector of [4, 6, 9, 0] (E F♯ A C) is…'), options: ['<012111>', '<001110>', '<102111>', '<012120>'] },
        ],
        answer: 0,
        explain: t('n 个音有 n(n−1)/2 对：四音 6 对；E F♯ A C：ic2、ic3×2、ic4、ic5、ic6 → <012111>。', 'n 音で n(n−1)/2 組：四音は 6 組。E F♯ A C：ic2・ic3×2・ic4・ic5・ic6 → <012111>。', 'n notes give n(n−1)/2 pairs: six for a tetrachord; E F♯ A C has ic2, ic3 ×2, ic4, ic5, ic6 → <012111>.'),
      },
      G('b63-g1', 'primeForm', 2, ['calc']),
      G('b63-g2', 'icVector', 1, ['calc']),
    ],
    lab: [{ id: 'b63-lab', type: 'lab', lab: 'set-trichords', mandatory: true, minutes: 6 }],
  },
  pool: [G('b63-p1', 'primeForm', 3, ['calc']), G('b63-p2', 'icVector', 3, ['calc']), G('b63-p3', 'tnIn', 2, ['calc'])],
};

// ===================== B6-4 十二音矩阵与音列分析 =====================
const LUTYENS = [0, 11, 3, 7, 8, 4, 2, 6, 5, 1, 9, 10];
export const LEVEL_B6_4 = {
  minutes: 18, core: true,
  insight: t('一条音列有 48 个形式，但它们都是同一条：P、I、R、RI 只是向前、倒着、照镜子地读。', '1 つの音列には 48 の形があるが、どれも同じ音列：P・I・R・RI は前から、後ろから、鏡に映して読むだけ。', 'A row has 48 forms, but they are all one row: P, I, R and RI just read it forwards, backwards and in the mirror.'),
  sections: {
    discover: [
      {
        id: 'b64-d1', type: 'discover', ref: ['omt2e-twelve-tone', 'omt2e-row-naming'],
        prompt: t('先听 Lutyens《Motet》的音列（以 C 为 0：0–11–3–7–8–4–2–6–5–1–9–10），再听它的逆行（倒着走）。十二个音有没有重复的？', 'まず Lutyens《Motet》の音列（C = 0：0–11–3–7–8–4–2–6–5–1–9–10）、次にその逆行。12 音に重複はある？', 'Hear the row of Lutyens’s Motet (C = 0: 0–11–3–7–8–4–2–6–5–1–9–10), then its retrograde. Is any of the twelve notes repeated?'),
        play: [{ label: 'P0', audio: { notes: LUTYENS.map((p) => 60 + p), mode: 'melody' } }, { label: 'R0', audio: { notes: [...LUTYENS].reverse().map((p) => 60 + p), mode: 'melody' } }],
        options: [t('没有：十二个音级各出现一次', 'ない：12 の音級が 1 回ずつ', 'No: each of the twelve pitch classes appears once'), t('有，C 出现两次', 'ある、C が 2 回', 'Yes, C twice'), t('只有七个音', '7 音だけ', 'There are only seven notes')],
        answer: 0,
        insight: {
          title: t('音列：十二个音级的一种顺序', '音列：12 音級の 1 つの順序', 'A row: one ordering of all twelve pitch classes'),
          text: t('十二音音乐大致平等地使用十二个音级，通常不找调或主音。作曲家用一个固定的十二音顺序（音列），再用移位（T）、倒影（I）、逆行（R）、逆行倒影（RI）来变化它。一共有 479,001,600 种可能的音列；除非有特殊对称，每条音列有 48 个形式。这种写法常与 Schoenberg、Webern、Berg 的"第二维也纳乐派"联系在一起。', '12 音音楽は 12 の音級をほぼ平等に使い、ふつう調や主音を求めない。作曲家は 12 音の固定した順序（音列）を使い、移高（T）・反行（I）・逆行（R）・逆行反行（RI）で変化させる。音列は 479,001,600 通り。特別な対称がなければ各音列に 48 の形がある。シェーンベルク・ウェーベルン・ベルクの「新ウィーン楽派」とよく結びつけられる。', 'Twelve-tone music uses all twelve pcs roughly equally, usually without a key or tonic. Composers fix an ordering of the twelve (a row) and vary it by transposition (T), inversion (I), retrograde (R) and retrograde inversion (RI). There are 479,001,600 possible rows; unless a row is specially symmetric it has 48 forms. The technique is associated with the Second Viennese School: Schoenberg, Webern and Berg.'),
        },
      },
    ],
    explain: [
      {
        id: 'b64-e1', type: 'page', ref: 'omt2e-row-naming',
        title: t('行形式的命名与矩阵', '音列形の名前とマトリクス', 'Naming row forms, and the matrix'),
        text: [
          t('固定零（最常见）：P0 从 C 开始；I0 也从 C 开始；R0 是 P0 倒过来（从 P0 的最后一个音开始）；RI0 是 I0 倒过来。移动零：P0 由分析者按音乐选定，其余形式照样推。', '固定ゼロ（最も一般的）：P0 は C から、I0 も C から、R0 は P0 の逆（P0 の最後の音から）、RI0 は I0 の逆。移動ゼロ：P0 は分析者が音楽に合わせて選び、残りは同様に求める。', 'Fixed zero (most common): P0 starts on C; I0 also starts on C; R0 is P0 backwards (starting on P0’s last note); RI0 is I0 backwards. Moveable zero: the analyst chooses P0 from the music and derives the rest the same way.'),
          t('矩阵：第一行写 P0，第一列写 I0，其余每一行都是 P 的一个移位。P 读行（从左到右），R 读行（从右到左），I 读列（从上到下），RI 读列（从下到上）。', 'マトリクス：1 行目に P0、1 列目に I0、残りの各行は P の移高。P は行を左から、R は行を右から、I は列を上から、RI は列を下から読む。', 'The matrix: P0 across the top row, I0 down the first column, every other row a transposition of P. Read P along a row left to right, R right to left, I down a column, RI up a column.'),
        ],
        tool: { feature: 'posttonal' },
      },
      {
        id: 'b64-e2', type: 'discover', practice: true, ref: 'omt2e-twelve-tone',
        prompt: t('音列 0–11–3–7……的倒影 I0 前三个音是？', '音列 0–11–3–7… の反行 I0 の最初の 3 音は？', 'The first three notes of I0 for the row 0–11–3–7… are…'),
        options: ['0–1–9', '0–11–3', '10–9–1'],
        answer: 0,
        insight: { title: t('音程方向反过来', '音程の向きを逆に', 'Reverse each interval’s direction'), text: t('P0 往下 1 个半音（0→11），I0 就往上 1 个（0→1）；P0 再往上 4 个（11→3），I0 就往下 4 个（1→9）。也就是 12 − 每个音级。', 'P0 が半音下がる（0→11）なら I0 は半音上がる（0→1）。P0 が 4 上がる（11→3）なら I0 は 4 下がる（1→9）。つまり 12 − 各音級。', 'Where P0 goes down 1 (0→11), I0 goes up 1 (0→1); where P0 goes up 4 (11→3), I0 goes down 4 (1→9) — i.e. 12 − each pc.') },
      },
    ],
    experiment: [
      { id: 'b64-x1', type: 'experiment', toy: 'matrix', ref: ['omt2e-row-naming', 'omt2e-twelve-tone'],
        prompt: t('Lutyens 音列的 12×12 矩阵：选 P、I、R、RI 和下标，看它在矩阵里是哪一行或哪一列，再播放。RI0 的最后一个音为什么是 0？', 'Lutyens の音列の 12×12 マトリクス：P・I・R・RI と添字を選び、マトリクスのどの行・列かを見て再生しよう。RI0 の最後の音が 0 なのはなぜ？', 'The 12×12 matrix of the Lutyens row: choose P, I, R or RI and a subscript, see which row or column it is, and play it. Why does RI0 end on 0?'),
        params: { row: LUTYENS },
        breakthrough: { id: 'b64-matrix', text: t('48 个形式都在一张表里，你会读了。', '48 の形が 1 枚の表に——読めるようになった。', 'All 48 forms in one table — and you can read it.') } },
    ],
    challenge: [
      {
        id: 'b64-c1', type: 'choice', error: 'row-form', skills: ['calc'], ref: 'omt2e-twelve-tone',
        variants: [
          { prompt: t('音列 P0 = 0–11–3–7–8–4–2–6–5–1–9–10，它的 R0 前三个音是？', 'P0 = 0–11–3–7–8–4–2–6–5–1–9–10 の R0 の最初の 3 音は？', 'For P0 = 0–11–3–7–8–4–2–6–5–1–9–10, the first three notes of R0 are…'), options: ['10–9–1', '0–1–9', '0–11–3', '2–3–11'] },
          { prompt: t('P0 = 0–11–3–7……，P2 的前三个音是？', 'P0 = 0–11–3–7… のとき P2 の最初の 3 音は？', 'If P0 = 0–11–3–7…, P2 begins…'), options: ['2–1–5', '2–11–3', '0–1–5', '10–9–1'] },
          { prompt: t('一条普通的音列一共有几个形式？', '普通の音列にはいくつの形がある？', 'How many forms does an ordinary row have?'), options: ['48', '12', '24', '4'] },
        ],
        answer: 0,
        explain: t('R0 = P0 倒过来（10–9–1…）；P2 = 每个音级 + 2（2–1–5…）；P、I、R、RI 各 12 个 = 48。', 'R0 = P0 の逆（10–9–1…）。P2 = 各音級 + 2（2–1–5…）。P・I・R・RI 各 12 = 48。', 'R0 is P0 backwards (10–9–1…); P2 adds 2 to every pc (2–1–5…); 12 each of P, I, R and RI = 48.'),
      },
      {
        id: 'b64-c2', type: 'choice', error: 'row-form', skills: ['identify'], ref: 'omt2e-row-naming',
        variants: [
          { prompt: t('按固定零的约定，I0 从哪个音开始？', '固定ゼロでは I0 はどの音から？', 'Under the fixed-zero convention, I0 begins on…'), options: [t('C（和 P0 一样）', 'C（P0 と同じ）', 'C (like P0)'), t('P0 的最后一个音', 'P0 の最後の音', 'P0’s last note'), t('任何音', 'どの音でも', 'any note'), t('B', 'B', 'B')] },
          { prompt: t('在矩阵里，RI 怎么读？', 'マトリクスで RI はどう読む？', 'How do you read RI in the matrix?'), options: [t('沿某一列从下往上', 'ある列を下から上へ', 'Up a column, bottom to top'), t('沿某一行从左往右', 'ある行を左から右へ', 'Along a row, left to right'), t('沿某一行从右往左', 'ある行を右から左へ', 'Along a row, right to left'), t('沿对角线', '対角線に沿って', 'Along the diagonal')] },
        ],
        answer: 0,
        explain: t('固定零：P0、I0 都从 C 开始；P 读行、R 倒读行、I 读列、RI 从下往上读列。', '固定ゼロ：P0・I0 とも C から。P は行、R は行を逆、I は列、RI は列を下から。', 'Fixed zero: P0 and I0 both start on C; P reads a row, R a row backwards, I a column, RI a column upwards.'),
      },
      {
        id: 'b64-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: 'omt2e-twelve-tone',
        variants: [
          { prompt: t('"序列主义"和"十二音"的关系是？', '「セリー主義」と「12 音」の関係は？', 'How do “serialism” and “twelve-tone” relate?'), options: [t('序列主义更宽：不一定是十二音的音列', 'セリー主義の方が広い：12 音の音列とは限らない', 'Serialism is broader: not every serial piece uses a twelve-tone row'), t('完全是同一回事', 'まったく同じ', 'They are identical'), t('十二音更宽', '12 音の方が広い', 'Twelve-tone is broader'), t('两者无关', '無関係', 'They are unrelated')] },
          { prompt: t('十二音作曲常与哪个乐派联系在一起？', '12 音作曲とよく結びつけられる楽派は？', 'Twelve-tone composition is most associated with…'), options: [t('第二维也纳乐派（Schoenberg、Webern、Berg）', '新ウィーン楽派（シェーンベルク・ウェーベルン・ベルク）', 'the Second Viennese School (Schoenberg, Webern, Berg)'), t('那不勒斯乐派', 'ナポリ楽派', 'the Neapolitan School'), t('印象派', '印象派', 'Impressionism'), t('曼海姆乐派', 'マンハイム楽派', 'the Mannheim School')] },
        ],
        answer: 0,
        explain: t('序列主义指把音乐要素排序，不一定是十二音；十二音作曲常与第二维也纳乐派联系在一起。', 'セリー主義は音楽要素を順序づけること全般で 12 音とは限らない。12 音作曲は新ウィーン楽派とよく結びつけられる。', 'Serialism orders musical elements of any kind; twelve-tone composition is associated with the Second Viennese School.'),
      },
      G('b64-g1', 'rowForm', 3, ['calc']),
    ],
    lab: [{ id: 'b64-lab', type: 'lab', lab: 'row-inversion', mandatory: true, minutes: 6 }],
  },
  pool: [G('b64-p1', 'rowForm', 5, ['calc'])],
};

// ===================== B6-5 微分音与扩展纯律 =====================
export const LEVEL_B6_5 = {
  minutes: 12,
  insight: t('纯律的音程是简单的频率比；比里出现的最大质数（极限）越大，就越走出十二平均律的格子。', '純正律の音程は単純な周波数比。比に出てくる最大の素数（リミット）が大きいほど、12 平均律の格子の外へ出る。', 'Just intervals are simple frequency ratios; the larger the biggest prime in the ratio (the limit), the further you step outside the equal-tempered grid.'),
  sections: {
    discover: [
      {
        id: 'b65-d1', type: 'discover', ref: ['wiki-neutral-third', 'wiki-limit'],
        prompt: t('三个和弦：C 大三、C 小三、C 加上一个 11:9 的三度再加五度。第三个听起来是大还是小？', '3 つの和音：C 長三、C 短三、11:9 の 3 度と 5 度の C。3 つ目は長？ 短？', 'Three chords: C major, C minor, and C with an 11:9 third plus a fifth. Is the third one major or minor?'),
        play: [
          { label: t('大三', '長三', 'Major'), audio: { notes: [60, 64 - 0.137, 67 + 0.0196], mode: 'harmonic' } },
          { label: t('小三', '短三', 'Minor'), audio: { notes: [60, 63 + 0.156, 67 + 0.0196], mode: 'harmonic' } },
          { label: '11:9', audio: { notes: [60, 63 + 0.474, 67 + 0.0196], mode: 'harmonic' } },
        ],
        options: [t('都不是：它在大三度和小三度中间', 'どちらでもない：長 3 度と短 3 度の間', 'Neither: it sits between a major and a minor third'), t('明显是大三和弦', 'はっきり長三和音', 'Clearly major'), t('明显是小三和弦', 'はっきり短三和音', 'Clearly minor')],
        answer: 0,
        insight: {
          title: t('中立三度', '中立 3 度', 'The neutral third'),
          text: t('中立三度比小三度宽、比大三度窄：24 平均律里是 350 音分；纯律的 11:9 约 347.41 音分，正好是大三度 5/4 和小三度 6/5 的中项。它的比里有质数 11，是"11-limit"（undecimal）的音程。', '中立 3 度は短 3 度より広く長 3 度より狭い：24 平均律で 350 セント、純正の 11:9 は約 347.41 セントで、長 3 度 5/4 と短 3 度 6/5 の中間項。比に素数 11 があり、「11-limit」（undecimal）の音程。', 'A neutral third is wider than a minor third and narrower than a major one: 350 cents in 24-tone equal temperament; the just 11:9 is about 347.41 cents, the mediant of 5/4 and 6/5. Its ratio contains the prime 11, making it an 11-limit (undecimal) interval.'),
        },
      },
    ],
    explain: [
      {
        id: 'b65-e1', type: 'page', ref: ['gann-ji', 'wiki-limit', 'hf-intervals'],
        title: t('用分数写音高', '分数で音高を書く', 'Writing pitches as fractions'),
        text: [
          t('纯律把音高写成相对参考音 1/1 的分数：2/1 是高八度，3/2 是纯五度，5/4 是纯律大三度。一个律制里频率比用到的最大质数叫它的"极限"（limit），这个说法来自 Harry Partch：只用 2、3、5 的是 5-limit，用到 7 的是 7-limit（septimal），用到 11 的是 11-limit（undecimal）。纯律音程有标准的英文名称（例如 7:4 叫 harmonic seventh）。', '純正律は音高を基準音 1/1 に対する分数で書く：2/1 はオクターヴ上、3/2 は完全 5 度、5/4 は純正長 3 度。音律の周波数比に使う最大の素数を「リミット」と呼び、Harry Partch の用語：2・3・5 だけなら 5-limit、7 まで使えば 7-limit（septimal）、11 まで使えば 11-limit（undecimal）。純正音程には英語の標準名がある（7:4 は harmonic seventh など）。', 'Just intonation writes pitches as fractions of a reference 1/1: 2/1 is the octave above, 3/2 the perfect fifth, 5/4 the just major third. The largest prime used in a tuning’s ratios is its limit — Harry Partch’s term: 2, 3 and 5 only is 5-limit; using 7 is 7-limit (septimal); using 11 is 11-limit (undecimal). Just intervals have standard English names (7:4 is the harmonic seventh, for example).'),
        ],
        tool: { feature: 'micro' },
      },
      {
        id: 'b65-e2', type: 'discover', practice: true, ref: 'wiki-limit',
        prompt: t('7:4 这个音程属于几 limit？', '7:4 は何リミット？', 'What limit is the ratio 7:4?'),
        options: ['7-limit', '5-limit', '11-limit'],
        answer: 0,
        insight: { title: t('看最大的质数', '最大の素数を見る', 'Look for the largest prime'), text: t('7 和 4 = 2 × 2：最大的质数是 7，所以是 7-limit（septimal）。', '7 と 4 = 2 × 2：最大の素数は 7、だから 7-limit（septimal）。', '7 and 4 = 2 × 2: the largest prime is 7, so it is 7-limit (septimal).') },
      },
    ],
    experiment: [
      { id: 'b65-x1', type: 'experiment', toy: 'ji', ref: ['wiki-limit', 'wiki-neutral-third', 'hf-intervals'],
        prompt: t('点一个频率比，听它和根音一起响，看音分、和十二平均律差多少、属于几 limit；再点"中立三和弦"。哪个比离十二平均律最远？', '比を押して根音と一緒に鳴らし、セント・12 平均律との差・リミットを見よう。「中立三和音」も押して。12 平均律から一番遠いのは？', 'Tap a ratio to hear it with the root and see its cents, distance from 12-tone equal temperament and limit; then try the neutral triad. Which ratio is farthest from equal temperament?'),
        params: {},
        breakthrough: { id: 'b65-ji', text: t('你听到了十二个半音之间的颜色。', '12 の半音の間にある色を聴いた。', 'You heard the colours between the twelve semitones.') } },
    ],
    challenge: [
      {
        id: 'b65-c1', type: 'choice', error: 'ji-ratio', skills: ['calc'], ref: 'wiki-limit',
        variants: [
          { prompt: t('5:4 属于几 limit？', '5:4 は何リミット？', 'What limit is 5:4?'), options: ['5-limit', '3-limit', '7-limit', '2-limit'] },
          { prompt: t('11:8 属于几 limit？', '11:8 は何リミット？', 'What limit is 11:8?'), options: ['11-limit', '7-limit', '5-limit', '13-limit'] },
          { prompt: t('"septimal"指的是哪个极限？', '「septimal」はどのリミット？', '“Septimal” refers to which limit?'), options: ['7-limit', '5-limit', '11-limit', '3-limit'] },
        ],
        answer: 0,
        explain: t('看比里最大的质数：5:4 → 5；11:8 → 11；septimal = 7-limit，undecimal = 11-limit。', '比の最大の素数を見る：5:4 → 5、11:8 → 11。septimal = 7-limit、undecimal = 11-limit。', 'Find the largest prime: 5:4 → 5; 11:8 → 11; septimal = 7-limit, undecimal = 11-limit.'),
      },
      {
        id: 'b65-c2', type: 'choice', error: 'ji-ratio', skills: ['identify'], ref: 'wiki-neutral-third',
        variants: [
          { prompt: t('中立三度在 24 平均律里是多少音分？', '24 平均律の中立 3 度は何セント？', 'How many cents is a neutral third in 24-tone equal temperament?'), options: ['350', '300', '400', '386'] },
          { prompt: t('纯律中立三度 11:9 大约多少音分？', '純正の中立 3 度 11:9 は約何セント？', 'About how many cents is the just neutral third 11:9?'), options: ['347', '386', '316', '400'] },
          { prompt: t('11:9 和大三度 5/4、小三度 6/5 是什么关系？', '11:9 と 5/4・6/5 の関係は？', 'How does 11:9 relate to 5/4 and 6/5?'), options: [t('它是两者的中项', '両者の中間項', 'It is their mediant'), t('它比两者都大', '両方より大きい', 'It is larger than both'), t('它等于 5/4', '5/4 と等しい', 'It equals 5/4'), t('它比两者都小', '両方より小さい', 'It is smaller than both')] },
        ],
        answer: 0,
        explain: t('中立三度在大小三度之间：24 平均律 350 音分，纯律 11:9 ≈ 347.41 音分，是 5/4 与 6/5 的中项（(5+6)/(4+5) = 11/9）。', '中立 3 度は長短 3 度の間：24 平均律 350 セント、純正 11:9 ≈ 347.41 セント、5/4 と 6/5 の中間項（(5+6)/(4+5) = 11/9）。', 'Between major and minor: 350 cents in 24-TET, 11:9 ≈ 347.41 cents just, the mediant of 5/4 and 6/5 ((5+6)/(4+5) = 11/9).'),
      },
      {
        id: 'b65-c3', type: 'choice', error: 'ji-ratio', skills: ['calc'], ref: 'gann-ji',
        variants: [
          { prompt: t('纯律里，比参考音 1/1 高一个八度的音写作？', '純正律で基準 1/1 の 1 オクターヴ上は？', 'In just intonation, the octave above 1/1 is written…'), options: ['2/1', '3/2', '1/2', '8/1'] },
          { prompt: t('3/2 再叠一个 3/2，得到的比是？', '3/2 にもう 1 つ 3/2 を重ねると？', 'Stacking 3/2 on 3/2 gives…'), options: ['9/4', '6/4', '3/4', '9/2'] },
        ],
        answer: 0,
        explain: t('音高写成相对 1/1 的分数，八度是 2/1；叠音程就是把比相乘：3/2 × 3/2 = 9/4（大九度，再除以 2 得 9/8 大二度）。', '音高は 1/1 に対する分数で、オクターヴは 2/1。音程を重ねるのは比を掛けること：3/2 × 3/2 = 9/4（長 9 度、2 で割ると 9/8 の長 2 度）。', 'Pitches are fractions of 1/1, the octave being 2/1; stacking intervals multiplies ratios: 3/2 × 3/2 = 9/4 (a major ninth; halve it for the 9/8 whole tone).'),
      },
      G('b65-g1', 'primeLimit', 2, ['calc']),
      G('b65-g2', 'jiInterval', 1, ['identify']),
    ],
  },
  pool: [G('b65-p1', 'primeLimit', 3, ['calc']), G('b65-p2', 'jiInterval', 3, ['identify']), G('b65-p3', 'neutralTriad', 2, ['identify'])],
};

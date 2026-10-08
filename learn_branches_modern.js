// 乐理闯关 · 二十世纪与微分音的进阶关：每个主关后面 4 关（第 5 关"综合测验"在开局时抽题）。
// 题卡只用 references.js 中已登记、已核实的资料；{ type: 'gen' } 的题由 learn_generators.js 按同样的资料计算生成。
// 依据汇总（由 scripts/annotate-learn.mjs 生成）：
//   ref:rubin-nonfunctional ref:arndt-tonality ref:koozin-planing ref:ircam-spectral ref:ircam-spectrum ref:gann-ji
//   ref:gann-ji-reasons ref:omt2e-pitch-class ref:omt2e-integer-intervals ref:omt2e-normal-order ref:omt2e-prime-form
//   ref:omt2e-ic-vector ref:wiki-set-classes ref:omt2e-collections ref:wiki-messiaen-modes ref:omt2e-neo-riemannian
//   ref:omt2e-twelve-tone ref:omt2e-row-naming ref:wiki-arabic-maqam ref:wiki-pythagorean ref:wiki-harmonic-series
//   ref:hf-intervals ref:wiki-limit ref:wiki-neutral-third ref:wiki-turkish-makam
// @refs-end

const t = (zh, ja, en) => ({ zh, ja, en });
const opt = (id, label) => ({ id, label });
const G = (gen, count = 2, params) => ({ type: 'gen', gen, count, ...(params ? { params } : {}) });
const L = (title, cards) => ({ title, cards });

import { MODERN_BRANCHES } from './modern_harmony_course.js?v=20261008-spectrum-side1';
export const BRANCHES = { ...MODERN_BRANCHES,
  pitchclass: [
    L(t('音名换成数字', '音名を数字に', 'Notes to numbers'), [
      { type: 'guide', ref: 'omt2e-pitch-class', visual: { kind: 'clock', pcs: [0, 4, 7] }, tool: { feature: 'posttonal' },
        title: t('一个钟面，12 个数', '時計の文字盤、12 の数', 'A clock face, twelve numbers'),
        steps: [
          t('C = 0，C♯/D♭ = 1，……，B = 11；10 常写成 t，11 写成 e。同音异名的音是同一个数。', 'C = 0、C♯/D♭ = 1……B = 11。10 は t、11 は e と書くことが多い。異名同音は同じ数。', 'C = 0, C♯/D♭ = 1 … B = 11; 10 is often written t and 11 e. Enharmonic notes share a number.'),
        ] },
      G('pcInteger', 5),
    ]),
    L(t('音程级', '音程クラス', 'Interval classes'), [
      { type: 'guide', ref: 'omt2e-integer-intervals', visual: { kind: 'clock', pcs: [2, 11] },
        title: t('走钟面上短的那一边', '時計の短いほうを回る', 'Take the short way round'),
        steps: [
          t('音程级是两个音级之间最短的距离，所以总在 0 到 6 之间：2 和 11 之间，一边 9 步、一边 3 步，音程级是 3。', '音程クラスは 2 つのピッチクラスの最短距離で、いつも 0〜6。2 と 11 の間は片方 9 歩・もう片方 3 歩で、音程クラスは 3。', 'An interval class is the shortest distance between two pitch classes, always 0–6: between 2 and 11 it is 9 one way and 3 the other, so ic 3.'),
        ] },
      G('intervalClass', 5),
    ]),
    L(t('四种音程', '4 種類の音程', 'Four kinds of interval'), [
      { type: 'guide', ref: 'omt2e-integer-intervals',
        title: t('从最具体到最抽象', '最も具体的から最も抽象的へ', 'From most specific to most abstract'),
        steps: [
          t('有序音高音程：带方向（+/−）的半音数，最具体。无序音高音程：半音数，不带方向。', '順序付きピッチ音程：向き（+/−）つきの半音数で最も具体的。順序なしピッチ音程：向きなしの半音数。', 'Ordered pitch interval: semitones with direction (+/−), the most specific. Unordered pitch interval: semitones without direction.'),
          t('有序音级音程：在钟面上永远顺时针数（9 点到 5 点是 8 小时，不是 4）。音程级：最短距离，最抽象。', '順序付きピッチクラス音程：時計回りに数える（9 時から 5 時は 8 時間で 4 ではない）。音程クラス：最短距離で最も抽象的。', 'Ordered pitch-class interval: always count clockwise (9 to 5 o’clock is 8 hours, never 4). Interval class: the shortest distance, the most abstract.'),
        ] },
      { type: 'match', ref: 'omt2e-integer-intervals',
        prompt: t('从 C4 到下方的 A3：音程种类 ↔ 数值', 'C4 から下の A3：音程の種類 ↔ 値', 'From C4 down to A3: interval kind ↔ value'),
        pairs: [[t('有序音高音程', '順序付きピッチ音程', 'ordered pitch interval'), '−3'], [t('无序音高音程', '順序なしピッチ音程', 'unordered pitch interval'), '3'], [t('有序音级音程（0 → 9）', '順序付きピッチクラス音程（0 → 9）', 'ordered pc interval (0 → 9)'), '9']],
        hint: t('有序音级音程总是顺时针：0 → 9 要走 9 步。', '順序付きピッチクラス音程は時計回り：0 → 9 は 9 歩。', 'Ordered pc intervals go clockwise: 0 → 9 takes 9 steps.'),
        explain: t('往下 3 个半音：−3；不管方向：3；钟面上 0 顺时针到 9：9。音程级则是 3。', '3 半音下：−3、向きなし：3、時計回りで 0 → 9：9。音程クラスは 3。', 'Down three semitones: −3; ignoring direction: 3; clockwise from 0 to 9: 9. The interval class is 3.') },
      { type: 'choice', ref: 'omt2e-integer-intervals',
        prompt: t('哪种音程最抽象？', 'もっとも抽象的な音程は？', 'Which kind of interval is the most abstract?'),
        options: [t('音程级', '音程クラス', 'interval class'), t('有序音高音程', '順序付きピッチ音程', 'ordered pitch interval'), t('无序音高音程', '順序なしピッチ音程', 'unordered pitch interval')], answer: 0,
        hint: t('它不管八度、方向和先后。', 'オクターヴも向きも順序も問わない。', 'It ignores octave, direction and order.'),
        explain: t('音程级只看两个音级之间最短的距离。', '音程クラスは 2 つのピッチクラスの最短距離だけを見る。', 'An interval class only measures the shortest distance between two pitch classes.') },
      G('intervalClass', 2),
    ]),
    L(t('音级综合', 'ピッチクラスの総合', 'Pitch-class review'), [
      { type: 'guide', ref: ['omt2e-pitch-class', 'omt2e-integer-intervals'], tool: { feature: 'posttonal' },
        title: t('数字让比较更容易', '数字にすると比べやすい', 'Numbers make comparison easy'),
        steps: [
          t('在无调性音乐里，音程常常直接用半音数来理解，比用"大小纯增减"的名字更合适。', '無調音楽では、音程は「長短完全増減」の名前より半音数で考えるほうが合う。', 'In atonal music intervals are often better understood as semitone counts than as tonal names.'),
        ] },
      G('pcInteger', 2), G('intervalClass', 3),
    ]),
  ],

  posttonal: [
    L(t('移位与倒影', '移高と反転', 'Transposition and inversion'), [
      { type: 'guide', ref: 'omt2e-normal-order', visual: { kind: 'clock', pcs: [0, 4, 7] }, tool: { feature: 'posttonal' },
        title: t('Tn 加，In 减', 'Tn は足し、In は引く', 'Tn adds, In subtracts'),
        steps: [
          t('Tn：每个数加 n（超过 11 减 12）。In：先倒影（取 12 的补数），再移位 n；也可以直接用 n 减去每个数。', 'Tn：各数に n を足す（11 を超えたら 12 を引く）。In：まず反転（12 の補数）してから n 移高、または n から各数を引く。', 'Tn: add n to each number (mod 12). In: invert (take each number’s complement mod 12) then transpose by n — or simply subtract each number from n.'),
        ] },
      G('tnIn', 5),
    ]),
    L(t('标准顺序', 'ノーマル・オーダー', 'Normal order'), [
      { type: 'guide', ref: 'omt2e-normal-order', visual: { kind: 'clock', pcs: [8, 9, 3] },
        title: t('最紧凑的写法', '最も詰めた書き方', 'The most compressed spelling'),
        steps: [
          t('标准顺序：把集合按升序排成跨度最小的样子，作用像三和弦的"原位"，方便分类和比较。', 'ノーマル・オーダー：セットを上行順に、幅が最小になるよう並べたもの。三和音の「基本形」のように分類・比較しやすい。', 'Normal order arranges a set ascending with the smallest span — like root position for any chord, for easy classification.'),
          t('例：G♯、A、D♯（8、9、3）→ 比较三种排法的跨度：[3, 8, 9] 跨度 6，[8, 9, 3] 跨度 7，[9, 3, 8] 跨度 11——标准顺序是 [3, 8, 9]。', '例：G♯・A・D♯（8・9・3）→ 3 通りの幅を比べる：[3, 8, 9] は 6、[8, 9, 3] は 7、[9, 3, 8] は 11——ノーマル・オーダーは [3, 8, 9]。', 'Example: G♯, A, D♯ (8, 9, 3) → compare the spans of the rotations: [3, 8, 9] spans 6, [8, 9, 3] 7, [9, 3, 8] 11 — so the normal order is [3, 8, 9].'),
        ] },
      { type: 'choice', ref: 'omt2e-normal-order',
        prompt: t('{0, 4, 7} 的标准顺序是？', '{0, 4, 7} のノーマル・オーダーは？', 'The normal order of {0, 4, 7} is…'),
        options: ['[0, 4, 7]', '[4, 7, 0]', '[7, 0, 4]'], answer: 0,
        hint: t('比较三种排法的首尾跨度：7、8、9。', '3 通りの最初と最後の幅：7・8・9。', 'Compare spans of the three rotations: 7, 8, 9.'),
        explain: t('[0, 4, 7] 跨度 7，最小。', '[0, 4, 7] は幅 7 で最小。', '[0, 4, 7] spans 7, the smallest.') },
      { type: 'choice', ref: 'omt2e-normal-order',
        prompt: t('标准顺序在集合理论里的作用最像？', 'ノーマル・オーダーの役割に一番近いのは？', 'Normal order works most like…'),
        options: [t('三和弦的原位', '三和音の基本形', 'root position for triads'), t('调号', '調号', 'a key signature'), t('拍号', '拍子記号', 'a time signature')], answer: 0,
        hint: t('一种标准的排列方式，方便比较。', '比べやすい標準の並べ方。', 'A standard ordering for comparison.'),
        explain: t('就像原位让三和弦好比较，标准顺序让任何集合好比较。', '基本形が三和音を比べやすくするように、どんなセットも比べやすくする。', 'Like root position for triads, it makes any set easy to compare.') },
      G('tnIn', 2),
    ]),
    L(t('钟面算术', '時計の算数', 'Clock arithmetic'), [
      { type: 'guide', ref: 'omt2e-pitch-class', visual: { kind: 'clock', pcs: [11, 2] },
        title: t('超过 11 就绕回来', '11 を超えたら戻る', 'Past 11, wrap around'),
        steps: [
          t('音级的加减都在钟面上进行：11 + 3 = 2（14 − 12），2 − 5 = 9（−3 + 12）。', 'ピッチクラスの足し引きは時計の上で：11 + 3 = 2（14 − 12）、2 − 5 = 9（−3 + 12）。', 'Pitch-class arithmetic happens on the clock: 11 + 3 = 2 (14 − 12); 2 − 5 = 9 (−3 + 12).'),
        ] },
      { type: 'fill', ref: 'omt2e-pitch-class',
        prompt: t('音级运算：10 + 5 = ___，1 − 4 = ___', 'ピッチクラスの計算：10 + 5 = ___、1 − 4 = ___', 'Pitch-class arithmetic: 10 + 5 = ___, 1 − 4 = ___'),
        bank: [opt('3', '3'), opt('9', '9'), opt('15', '15'), opt('-3', '−3')], answer: ['3', '9'],
        hint: t('结果要在 0 到 11 之间。', '結果は 0〜11。', 'Results must be 0–11.'),
        explain: t('15 − 12 = 3；−3 + 12 = 9。', '15 − 12 = 3、−3 + 12 = 9。', '15 − 12 = 3; −3 + 12 = 9.') },
      G('pcInteger', 3),
    ]),
    L(t('变换综合', '変換の総合', 'Transformation review'), [
      { type: 'guide', ref: 'omt2e-normal-order', tool: { feature: 'posttonal' },
        title: t('钟面帮你算', '時計が計算を助ける', 'The clock does the maths'),
        steps: [
          t('移位就是整体转动钟面上的图形；倒影就是把图形翻过去再转。', '移高は時計上の図形を回すこと、反転は図形を裏返してから回すこと。', 'Transposition rotates the shape on the clock; inversion flips it, then rotates.'),
        ] },
      G('tnIn', 4), G('intervalClass', 1),
    ]),
  ],

  setclass: [
    L(t('找原型', 'プライム・フォームを探す', 'Finding the prime form'), [
      { type: 'guide', ref: 'omt2e-prime-form', tool: { feature: 'posttonal' },
        title: t('移到 0，再和倒影比', '0 に移して反転と比べる', 'Move to 0, then compare with the inversion'),
        steps: [
          t('原型：集合（标准顺序）移到 0 开头，再和它的倒影比较，选往左边更紧凑的那个。集合类就用原型命名，例如大三、小三和弦都是 (037)。', 'プライム・フォーム：セット（ノーマル・オーダー）を 0 始まりに移し、反転と比べて左に詰まったほうを選ぶ。セット・クラスはこれで名づける（長三・短三はどちらも (037)）。', 'Prime form: transpose the normal order to start on 0, compare with its inversion, and take the one packed more to the left. Set classes are named this way — major and minor triads are both (037).'),
        ] },
      G('primeForm', 5),
    ]),
    L(t('音程级向量', '音程クラス・ベクトル', 'Interval-class vectors'), [
      { type: 'guide', ref: 'omt2e-ic-vector', visual: { kind: 'clock', pcs: [0, 4, 7] },
        title: t('6 个数字的"体检表"', '6 桁の「健康診断」', 'A six-digit check-up'),
        steps: [
          t('向量依次数出集合里有几个音程级 1、2、3、4、5、6。C 大三和弦是 <001110>：一个 3、一个 4、一个 5。', 'ベクトルはセット内の音程クラス 1〜6 の数を順に数える。C の長三和音は <001110>：3・4・5 が 1 つずつ。', 'The vector tallies interval classes 1 through 6. C major is <001110>: one each of 3, 4 and 5.'),
          t('三音集合总和是 3，四音集合是 6，五音集合是 10。向量能粗略描述一个集合的整体音响。', '3 音なら合計 3、4 音なら 6、5 音なら 10。ベクトルはセットの響きをおおまかに表す。', 'A trichord totals 3, a tetrachord 6, a pentachord 10. The vector roughly sums up a set’s sound.'),
        ] },
      G('icVector', 5),
    ]),
    L(t('Forte 编号与集合类表', 'フォート番号とセット・クラス表', 'Forte numbers and the set-class table'), [
      { type: 'guide', ref: ['wiki-set-classes', 'omt2e-prime-form'], tool: { feature: 'posttonal' },
        title: t('每个集合类都有编号', 'どのセット・クラスにも番号がある', 'Every set class has a number'),
        steps: [
          t('所有可能的集合类都整理在集合类表里（维基百科等都有）。常用 Forte 编号：大小三和弦 (037) 是 3-11，增三和弦 (048) 是 3-12，减七和弦 (0369) 是 4-28，(0258)（属七、半减七）是 4-27。', 'すべてのセット・クラスはセット・クラス表にまとめられている（ウィキペディアなど）。フォート番号の例：長短三和音 (037) は 3-11、増三和音 (048) は 3-12、減七 (0369) は 4-28、(0258)（属七・半減七）は 4-27。', 'All set classes are listed in set-class tables (on Wikipedia and elsewhere). Common Forte numbers: (037), major/minor triads, is 3-11; (048), augmented, 3-12; (0369), diminished seventh, 4-28; (0258), dominant and half-diminished sevenths, 4-27.'),
        ] },
      { type: 'match', ref: 'wiki-set-classes',
        prompt: t('原型 ↔ Forte 编号', 'プライム・フォーム ↔ フォート番号', 'Prime form ↔ Forte number'),
        pairs: [['(037)', '3-11'], ['(048)', '3-12'], ['(0258)', '4-27'], ['(0369)', '4-28']],
        hint: t('第一个数字是集合里的音数。', '最初の数字は音の数。', 'The first number is the number of notes.'),
        explain: t('3- 是三音集合，4- 是四音集合。', '3- は 3 音、4- は 4 音のセット。', '3- are trichords, 4- tetrachords.') },
      { type: 'choice', ref: 'wiki-set-classes',
        prompt: t('属七和弦和半减七和弦属于同一个集合类吗？', '属七と半減七は同じセット・クラス？', 'Are dominant and half-diminished sevenths in the same set class?'),
        options: [t('是，都是 (0258)', 'はい、どちらも (0258)', 'yes — both are (0258)'), t('不是', 'いいえ', 'no')], answer: 0,
        hint: t('它们互为倒影。', '互いに反転。', 'They are inversions of each other.'),
        explain: t('G B D F 倒过来就是半减七的结构，集合类同为 (0258)，Forte 4-27。', 'G B D F を反転すると半減七の形で、同じ (0258)・4-27。', 'Inverting G B D F gives the half-diminished shape: both (0258), Forte 4-27.') },
      G('primeForm', 2),
    ]),
    L(t('集合类综合', 'セット・クラスの総合', 'Set-class review'), [
      { type: 'guide', ref: ['omt2e-prime-form', 'omt2e-ic-vector'], tool: { feature: 'posttonal' },
        title: t('名字、音响、编号', '名前・響き・番号', 'Name, sound, number'),
        steps: [
          t('原型给集合类起名，向量描述它的音响，Forte 编号是它在表里的位置。', 'プライム・フォームが名前、ベクトルが響き、フォート番号が表の位置。', 'Prime form names the class, the vector describes its sound, the Forte number is its place in the table.'),
        ] },
      G('primeForm', 3), G('icVector', 3),
    ]),
  ],

  collections: [
    L(t('五种音集的台阶', '5 つの音集合の段差', 'Step patterns of five collections'), [
      { type: 'guide', ref: 'omt2e-collections', tool: { feature: 'posttonal' }, demo: { play: [[60], [61], [64], [65], [68], [69], [72]] },
        title: t('用重复的台阶造音阶', '繰り返す段差で音階を作る', 'Scales from repeating steps'),
        steps: [
          t('五声 2–2–3–2–3；全音 2–2–2–2–2–2；八声 2–1 交替；六声 1–3 交替；acoustic 2–2–2–1–2–1–2。听：六声音集 C D♭ E F A♭ A。', '五音 2–2–3–2–3、全音 2–2–2–2–2–2、八音は 2–1 交互、六音は 1–3 交互、アコースティック 2–2–2–1–2–1–2。聴いて：六音 C D♭ E F A♭ A。', 'Pentatonic 2–2–3–2–3; whole-tone 2–2–2–2–2–2; octatonic alternating 2–1; hexatonic alternating 1–3; acoustic 2–2–2–1–2–1–2. Listen: hexatonic C D♭ E F A♭ A.'),
          t('用重复的音程模式生成音集，叫"距离模型"。', '繰り返す音程パターンで音集合を作ることを「距離モデル」と呼ぶ。', 'Generating collections from a repeating interval pattern is the “distance model”.'),
        ] },
      { type: 'match', ref: 'omt2e-collections',
        prompt: t('音集 ↔ 音数', '音集合 ↔ 音の数', 'Collection ↔ number of notes'),
        pairs: [[t('五声', '五音', 'pentatonic'), '5'], [t('六声', '六音', 'hexatonic'), '6'], ['acoustic', '7'], [t('八声', '八音', 'octatonic'), '8']],
        hint: t('数台阶的个数。', '段差を数える。', 'Count the steps.'),
        explain: t('五声 5、六声 6、acoustic 7、八声 8（全音也是 6）。', '五音 5・六音 6・アコースティック 7・八音 8（全音も 6）。', 'Pentatonic 5, hexatonic 6, acoustic 7, octatonic 8 (whole-tone is also 6).') },
      G('symmetricScale', 2),
    ]),
    L(t('梅西安的七种调式', 'メシアンの 7 つの旋法', 'Messiaen’s seven modes'), [
      { type: 'guide', ref: 'wiki-messiaen-modes', tool: { feature: 'posttonal' },
        title: t('移不出 12 个版本', '12 通りに移せない', 'Not twelve transpositions'),
        steps: [
          t('第 1 种（全音）只有 2 个版本，第 2 种（八声）3 个，第 3 种 4 个，第 4 到第 7 种各 6 个。版本越少，对称性越强。', '第 1（全音）は 2 通り、第 2（八音）は 3、第 3 は 4、第 4〜7 はそれぞれ 6。種類が少ないほど対称性が強い。', 'Mode 1 (whole-tone) has 2 versions, mode 2 (octatonic) 3, mode 3 four, modes 4–7 six each. Fewer versions means more symmetry.'),
        ] },
      { type: 'match', ref: 'wiki-messiaen-modes',
        prompt: t('梅西安调式 ↔ 不同版本数', 'メシアンの旋法 ↔ 移高の数', 'Messiaen mode ↔ distinct transpositions'),
        pairs: [[t('第 1 种', '第 1', 'mode 1'), '2'], [t('第 2 种', '第 2', 'mode 2'), '3'], [t('第 3 种', '第 3', 'mode 3'), '4'], [t('第 4 种', '第 4', 'mode 4'), '6']],
        hint: t('第 3 种的台阶 2–1–1 重复三次，周期 4 个半音。', '第 3 は 2–1–1 を 3 回、周期は半音 4。', 'Mode 3 repeats 2–1–1 three times — a period of 4 semitones.'),
        explain: t('2、3、4、6：周期越短，版本越少。', '2・3・4・6：周期が短いほど種類が少ない。', '2, 3, 4, 6: the shorter the period, the fewer versions.') },
      { type: 'choice', ref: 'wiki-messiaen-modes',
        prompt: t('梅西安第 2 种有限移位调式就是？', 'メシアンの第 2 旋法は？', 'Messiaen’s second mode is…'),
        options: [t('八声（减）音阶', '八音（ディミニッシュ）音階', 'the octatonic (diminished) scale'), t('全音音阶', '全音音階', 'the whole-tone scale'), t('五声音阶', '五声音階', 'the pentatonic')], answer: 0,
        hint: t('3 个版本。', '3 通り。', 'Three versions.'),
        explain: t('第 2 种 = 八声音阶，台阶半全交替。', '第 2 = 八音音階、半全交互。', 'Mode 2 = the octatonic, alternating half and whole steps.') },
      G('symmetricScale', 1),
    ]),
    L(t('acoustic 与六声音集', 'アコースティックと六音', 'Acoustic and hexatonic'), [
      { type: 'guide', ref: ['omt2e-collections', 'omt2e-neo-riemannian'], demo: { play: [[60, 64, 67], [60, 63, 67], [60, 63, 68], [59, 63, 68], [59, 64, 68], [59, 64, 67]] },
        title: t('两种"二十世纪味"的音集', '2 つの「20 世紀らしい」音集合', 'Two “20th-century” collections'),
        steps: [
          t('acoustic 音集来自泛音列最低的几个音程：大调升 4 降 7。', 'アコースティック音集は倍音列の低い音程から：長調の ♯4・♭7。', 'The acoustic collection comes from the lowest overtone intervals: major with ♯4 and ♭7.'),
          t('六声音集（1–3 交替）正是 PL 循环里所有三和弦的音：听 C → Cm → A♭ → A♭m → E → Em。', '六音音集（1–3 交互）は PL サイクルの三和音の音を集めたもの：聴いて C → Cm → A♭ → A♭m → E → Em。', 'The hexatonic collection (alternating 1–3) holds every note of a PL cycle: listen to C → Cm → A♭ → A♭m → E → Em.'),
        ] },
      { type: 'choice', ref: 'omt2e-neo-riemannian',
        prompt: t('PL 循环里的音合起来是哪个音集？', 'PL サイクルの音を集めると？', 'The notes of a PL cycle form which collection?'),
        options: [t('六声音集', '六音音集', 'hexatonic'), t('acoustic 音集', 'アコースティック', 'acoustic'), t('五声音集', '五音音集', 'pentatonic')], answer: 0,
        hint: t('半音和小三度交替。', '半音と短 3 度が交互。', 'Half steps and minor thirds alternate.'),
        explain: t('PL 循环 → 六声音集；RP 循环 → 八声音集。', 'PL → 六音、RP → 八音。', 'PL cycle → hexatonic; RP cycle → octatonic.') },
      { type: 'choice', ref: 'omt2e-collections',
        prompt: t('acoustic 音集最接近哪个调式？', 'アコースティック音集にいちばん近い旋法は？', 'The acoustic collection is closest to which mode?'),
        options: [t('Mixolydian（但第 4 音升高）', 'ミクソリディアン（第 4 音を上げる）', 'Mixolydian with a raised 4th'), 'Dorian', 'Phrygian'], answer: 0,
        hint: t('OMT：像 Mixolydian，但有 ♯4。', 'OMT：ミクソリディアンに似て ♯4。', 'OMT: like Mixolydian but with ♯4.'),
        explain: t('Mixolydian 1 2 3 4 5 6 ♭7 → 把 4 升高 = acoustic（Lydian dominant）。', 'ミクソ 1 2 3 4 5 6 ♭7 の 4 を上げる = アコースティック（リディアン・ドミナント）。', 'Mixolydian 1 2 3 4 5 6 ♭7 with the 4 raised = acoustic (Lydian dominant).') },
      G('plrCycle', 1),
    ]),
    L(t('音集综合', '音集合の総合', 'Collection review'), [
      { type: 'guide', ref: 'omt2e-collections', tool: { feature: 'posttonal' },
        title: t('看台阶认音集', '段差で音集合を見分ける', 'Know a collection by its steps'),
        steps: [
          t('全音、八声、六声都对称；五声和 acoustic 则和泛音列、五度叠置有关。', '全音・八音・六音は対称、五音とアコースティックは倍音列や 5 度の積み重ねと関係する。', 'Whole-tone, octatonic and hexatonic are symmetric; pentatonic and acoustic relate to fifths and the overtone series.'),
        ] },
      G('symmetricScale', 3), G('primeForm', 2),
    ]),
  ],

  twelvetone: [
    L(t('逆行与倒影', '逆行と反行', 'Retrograde and inversion'), [
      { type: 'guide', ref: 'omt2e-twelve-tone', tool: { feature: 'posttonal' },
        title: t('倒着读、翻过来读', '逆から読む、ひっくり返す', 'Read it backwards, read it flipped'),
        steps: [
          t('逆行 R：从最后一个音倒着读。倒影 I：每个音程方向反过来（上行 3 变下行 3），从同一个音开始。逆行倒影 RI：倒影再倒着读。', '逆行 R：最後の音から逆に。反行 I：各音程の向きを逆に（上へ 3 → 下へ 3）、同じ音から。逆反行 RI：反行を逆から。', 'Retrograde R reads the row backwards. Inversion I flips every interval (up 3 becomes down 3) from the same starting note. Retrograde inversion RI reads the inversion backwards.'),
        ] },
      G('rowForm', 5),
    ]),
    L(t('固定零与可动零', '固定ゼロと移動ゼロ', 'Fixed zero and movable zero'), [
      { type: 'guide', ref: 'omt2e-row-naming',
        title: t('P0 从哪里开始', 'P0 はどこから', 'Where P0 starts'),
        steps: [
          t('给序列编号有两种习惯：固定零（P0 总是从 C 开始）和可动零（P0 从序列自己的第一个音开始）。', '番号づけには 2 つの流儀：固定ゼロ（P0 はいつも C から）と移動ゼロ（P0 は音列の最初の音から）。', 'Two conventions: fixed zero (P0 always starts on C) and movable zero (P0 starts on the row’s own first note).'),
          t('读别人的分析时两种都会遇到；自己用的时候选一种并保持一致。矩阵可以一次把所有形式排出来。', '他人の分析ではどちらにも出会う。自分では 1 つ選んで一貫させる。行列ですべての形を一度に並べられる。', 'You’ll meet both in the literature; pick one and stay consistent. A matrix lays out every form at once.'),
        ] },
      { type: 'choice', ref: 'omt2e-row-naming',
        prompt: t('序列第一个音是 E。用"可动零"，P0 从哪个音开始？', '音列の最初の音が E。移動ゼロでは P0 はどこから？', 'A row starts on E. Under movable zero, P0 starts on…'),
        options: ['E', 'C', 'B'], answer: 0,
        hint: t('可动零跟着序列自己的第一个音。', '移動ゼロは音列自身の最初の音。', 'Movable zero follows the row’s own first note.'),
        explain: t('可动零：P0 = 序列本身，从 E 开始；固定零下这个序列会叫 P4。', '移動ゼロ：P0 = 音列そのもの（E から）。固定ゼロでは P4。', 'Movable zero: P0 is the row itself, on E; under fixed zero it would be P4.') },
      { type: 'choice', ref: 'omt2e-row-naming',
        prompt: t('同一个序列从 E 开始，用"固定零"应该叫？', '同じ音列（E から）は固定ゼロで？', 'The same row starting on E, under fixed zero, is called…'),
        options: ['P4', 'P0', 'P11'], answer: 0,
        hint: t('E = 4。', 'E = 4。', 'E = 4.'),
        explain: t('固定零以 C = 0 计，E 是 4，所以叫 P4。', '固定ゼロは C = 0 で、E は 4、P4。', 'Fixed zero counts C = 0; E is 4, so P4.') },
      G('pcInteger', 2),
    ]),
    L(t('十二音音乐的背景', '12 音音楽の背景', 'The context of twelve-tone music'), [
      { type: 'guide', ref: 'omt2e-twelve-tone',
        title: t('序列主义与十二音', 'セリエリズムと 12 音', 'Serialism and twelve-tone composition'),
        steps: [
          t('十二音作曲大致平均使用全部 12 个音级，通常不去找调或主音；作曲家常用一个固定的序列，再加以移位、倒影、逆行、逆行倒影。', '12 音技法は 12 のピッチクラスをほぼ均等に使い、ふつう調や主音を探さない。作曲家は決まった音列を使い、移高・反行・逆行・逆反行を加える。', 'Twelve-tone composition uses all twelve pitch classes roughly equally and usually has no key or tonic; composers often use a fixed row and transform it by T, I, R and RI.'),
          t('"序列主义"更广：把任何要素（音高、时值、力度……）排成顺序。这种写法常和"第二维也纳乐派"的作曲家联系在一起，实践中做法差异很大。', '「セリエリズム」はより広く、音高・音価・強弱など何でも順序づける。「新ウィーン楽派」の作曲家と結びつけられることが多く、実際のやり方は多様。', 'Serialism is broader, ordering any element — pitch, duration, dynamics. The style is often associated with the Second Viennese School, and practice varies widely.'),
        ] },
      { type: 'choice', ref: 'omt2e-twelve-tone',
        prompt: t('十二音作曲常和哪一群作曲家联系在一起？', '12 音技法とよく結びつけられる作曲家のグループは？', 'Twelve-tone composition is often associated with which group of composers?'),
        options: [t('第二维也纳乐派', '新ウィーン楽派', 'the Second Viennese School'), t('印象派', '印象派', 'the Impressionists'), t('巴洛克乐派', 'バロック', 'the Baroque')], answer: 0,
        hint: t('OMT 9.1 的说法。', 'OMT 9.1 の説明。', 'As OMT 9.1 puts it.'),
        explain: t('它常与第二维也纳乐派相联系。', '新ウィーン楽派と結びつけられることが多い。', 'It is commonly associated with the Second Viennese School.') },
      { type: 'match', ref: 'omt2e-twelve-tone',
        prompt: t('变形 ↔ 缩写', '変形 ↔ 略号', 'Transformation ↔ abbreviation'),
        pairs: [[t('移位', '移高', 'transposition'), 'T'], [t('倒影', '反行', 'inversion'), 'I'], [t('逆行', '逆行', 'retrograde'), 'R'], [t('逆行倒影', '逆反行', 'retrograde inversion'), 'RI']],
        hint: t('英文首字母。', '英語の頭文字。', 'English initials.'),
        explain: t('T、I、R、RI 四种变形。', 'T・I・R・RI の 4 つ。', 'The four transformations T, I, R, RI.') },
      G('rowForm', 1),
    ]),
    L(t('十二音综合', '12 音の総合', 'Twelve-tone review'), [
      { type: 'guide', ref: ['omt2e-twelve-tone', 'omt2e-row-naming'], tool: { feature: 'posttonal' },
        title: t('一个序列，四十八种形式', '1 つの音列、48 の形', 'One row, forty-eight forms'),
        steps: [
          t('P、I、R、RI 各有 12 个移位，一共 48 种形式；矩阵把它们一次排出来。', 'P・I・R・RI にそれぞれ 12 の移高、合計 48。行列で一度に並べられる。', 'P, I, R and RI each have 12 transpositions — 48 forms, all laid out by a matrix.'),
        ] },
      G('rowForm', 4), G('pcInteger', 1),
    ]),
  ],

  micro: [
    L(t('听听微分音的"怪"声音', '微分音の「不思議な」響きを聴く', 'Hearing strange microtonal sounds'), [
      { type: 'guide', ref: ['wiki-arabic-maqam', 'wiki-pythagorean'], tool: { feature: 'micro' }, demo: { play: [[60], [60.5], [61], [61.5], [62], [62.5], [63], [63.5], [64]] },
        title: t('半音中间还有音', '半音の間にも音がある', 'Notes between the half steps'),
        steps: [
          t('24 平均把每个半音再分成两半（50 音分）。听：从 C 到 E 一步一个四分之一音——在钢琴上找不到中间那些音。', '24 平均は各半音をさらに半分（50 セント）。聴いて：C から E まで四分音ずつ——ピアノにはない音が間に並ぶ。', '24-TET halves every semitone (50 cents). Listen: C to E in quarter tones — the in-between notes aren’t on a piano.'),
          t('不同的平均律听起来很不一样：5 平均每步 240 音分，19 平均约 63.2，31 平均约 38.7，53 平均约 22.6。', '平均律ごとに響きは大きく違う：5 平均は 1 歩 240 セント、19 平均は約 63.2、31 平均は約 38.7、53 平均は約 22.6。', 'Different EDOs sound very different: 5-EDO steps are 240 cents, 19-EDO about 63.2, 31-EDO about 38.7, 53-EDO about 22.6.'),
        ] },
      { type: 'choice', ref: 'wiki-arabic-maqam', audio: { notes: [60, 60.5, 61], mode: 'melody' },
        prompt: t('听：C、比 C 高 50 音分的音、C♯。中间那个音是？', '聴いて：C・C より 50 セント高い音・C♯。真ん中の音は？', 'Listen: C, a note 50 cents above C, C♯. The middle note is…'),
        options: [t('四分之一音', '四分音', 'a quarter tone'), t('半音', '半音', 'a half step'), t('全音', '全音', 'a whole step')], answer: 0,
        hint: t('只有半个半音。', '半音の半分。', 'Half a half step.'),
        explain: t('50 音分 = 半个半音 = 四分之一音。', '50 セント = 半音の半分 = 四分音。', '50 cents = half a semitone = a quarter tone.') },
      G('edoCents', 3),
    ]),
    L(t('七度泛音的和声', '第 7 倍音の和声', 'Harmony with the 7th harmonic'), [
      { type: 'guide', ref: ['wiki-harmonic-series', 'hf-intervals', 'wiki-limit'], tool: { feature: 'micro' }, demo: { play: [[48, 52, 55, 58], [48, 51.86, 55.02, 57.69]] },
        title: t('比平均律的小七度窄得多', '平均律の短 7 度よりずっと狭い', 'Much narrower than a tempered minor seventh'),
        steps: [
          t('第 7 泛音和第 4 泛音的比是 7:4，约 969 音分，比平均律的小七度（1000 音分）窄约 31 音分。它的标准名称是 harmonic seventh，用到质数 7，属于 7-limit（septimal）。', '第 7 倍音と第 4 倍音の比 7:4 は約 969 セントで、平均律の短 7 度（1000）より約 31 セント狭い。標準名は harmonic seventh、素数 7 を使うので 7-limit（septimal）。', 'The 7th harmonic against the 4th is 7:4, about 969 cents — some 31 cents narrower than the tempered minor seventh (1000). Its standard name is the harmonic seventh; it uses the prime 7, so it is 7-limit (septimal).'),
          t('听：先是平均律的 C7，再是按泛音 4:5:6:7 调的"和谐七和弦"——它更融合、几乎不晃动。', '聴いて：平均律の C7、次に倍音 4:5:6:7 で調律した七の和音——より溶け合い、ほとんど揺れない。', 'Listen: an equal-tempered C7, then a 4:5:6:7 “harmonic seventh” chord tuned to the overtones — smoother, with almost no beating.'),
        ] },
      { type: 'choice', ref: 'wiki-harmonic-series',
        prompt: t('7:4 大约多少音分？', '7:4 は約何セント？', 'About how many cents is 7:4?'),
        options: ['969', '1000', '1088'], answer: 0,
        hint: t('比平均律小七度（1000）窄一些。', '平均律の短 7 度（1000）より少し狭い。', 'A bit narrower than the tempered minor seventh (1000).'),
        explain: t('1200 × log₂(1.75) ≈ 969 音分。', '1200 × log₂(1.75) ≈ 969 セント。', '1200 × log₂(1.75) ≈ 969 cents.') },
      G('primeLimit', 3),
    ]),
    L(t('四分之一音、koma 与中立三度', '四分音・コマ・中立 3 度', 'Quarter tones, commas and neutral thirds'), [
      { type: 'guide', ref: ['wiki-neutral-third', 'wiki-turkish-makam'], demo: { play: [[60, 64], [60, 63.5], [60, 63]] },
        title: t('三种细分八度的方法', 'オクターヴを細かく分ける 3 つの方法', 'Three finer divisions'),
        steps: [
          t('24 平均（50 音分一步）、土耳其 53 koma（约 22.6 音分一步）、纯律的整数比。中立三度在 24 平均里是 350 音分，纯律 11:9 约 347.41 音分，两者差不到 3 音分。', '24 平均（1 歩 50 セント）、トルコの 53 コマ（約 22.6 セント）、純正律の整数比。中立 3 度は 24 平均で 350、純正 11:9 で約 347.41、差は 3 セント未満。', '24-TET (50-cent steps), Turkish 53 commas (about 22.6 cents) and just ratios. The neutral third is 350 cents in 24-TET and about 347.41 as 11:9 — under 3 cents apart.'),
          t('11:9 正好是大三度 5:4 和小三度 6:5 的"中项"，所以它"既像大三度又像小三度"。听：大三度、中立三度、小三度。', '11:9 は長 3 度 5:4 と短 3 度 6:5 の「中間項」なので、長 3 度にも短 3 度にも聞こえる。聴いて：長 3 度・中立 3 度・短 3 度。', '11:9 is the mediant of 5:4 and 6:5, equally well-tuned as a major and a minor third. Listen: major, neutral, minor thirds.'),
        ] },
      { type: 'choice', ref: 'wiki-neutral-third',
        prompt: t('11:9 为什么被认为"既像大三度又像小三度"？', 'なぜ 11:9 は「長 3 度にも短 3 度にも」と言える？', 'Why is 11:9 “equally a major and a minor third”?'),
        options: [t('它是 5:4 和 6:5 的中项', '5:4 と 6:5 の中間項だから', 'it is the mediant of 5:4 and 6:5'), t('它等于 12 平均的三度', '12 平均の 3 度と同じだから', 'it equals the 12-TET third'), t('因为它是纯五度的一半', '純正 5 度の半分だから', 'because it is half a pure fifth')], answer: 0,
        hint: t('(5+6):(4+5) = 11:9。', '(5+6):(4+5) = 11:9。', '(5+6):(4+5) = 11:9.'),
        explain: t('把 5/4 和 6/5 的分子分母分别相加得到 11/9：它和两者的拍频一样。', '5/4 と 6/5 の分子・分母を足すと 11/9。両者とのうなりが同じ。', 'Adding numerators and denominators of 5/4 and 6/5 gives 11/9, which beats equally against both.') },
      G('turkishKoma', 2), G('edoCents', 1),
    ]),
    L(t('微分音综合', '微分音の総合', 'Microtone review'), [
      { type: 'guide', ref: ['wiki-pythagorean', 'wiki-harmonic-series'], tool: { feature: 'micro' },
        title: t('音分是通用的尺子', 'セントは共通のものさし', 'Cents are the common ruler'),
        steps: [
          t('不管是平均律、koma 还是纯律比例，都可以换算成音分来比较：音分 = 1200 × log₂(频率比)。', '平均律・コマ・純正の比、どれもセントに換算して比べられる：セント = 1200 × log₂(比)。', 'EDO steps, commas or just ratios can all be compared in cents: cents = 1200 × log₂(ratio).'),
        ] },
      G('edoCents', 2), G('ratioCents', 2), G('primeLimit', 1),
    ]),
  ],

  microharmony: [
    L(t('听辨中立三和弦', '中立三和音を聴き分ける', 'Hearing neutral triads'), [
      { type: 'guide', ref: 'wiki-neutral-third', tool: { feature: 'micro' }, demo: { play: [[57, 61, 64], [57, 60.5, 64], [57, 60, 64]] },
        title: t('大、中立、小', '長・中立・短', 'Major, neutral, minor'),
        steps: [
          t('听：A 大三、A 中立三、A 小三和弦。中立三度离大三度和小三度都大约差四分之一音，大多数人很难分辨不同的中立三度。', '聴いて：A の長三・中立三・短三和音。中立 3 度は長・短 3 度からどちらも約四分音離れ、中立 3 度どうしの違いはほとんど聴き分けられない。', 'Listen: A major, A neutral, A minor. The neutral third is about a quarter tone from both; most people can barely tell different neutral thirds apart.'),
        ] },
      G('neutralTriad', 5),
    ]),
    L(t('质数极限', '素数リミット', 'Prime limits'), [
      { type: 'guide', ref: 'wiki-limit', tool: { feature: 'micro' },
        title: t('最大质数决定"极限"', '最大の素数が「リミット」を決める', 'The largest prime sets the limit'),
        steps: [
          t('只含 2 和 3 的比（3/2、4/3、9/8）是 3-limit（也就是毕达哥拉斯律）；含 5 的（5/4、6/5、5/3）是 5-limit；含 7 的（7/4、7/6、8/7）是 7-limit，又叫 septimal；含 11 的（11/8、11/9、11/6）是 11-limit，又叫 undecimal。', '2 と 3 だけの比（3/2・4/3・9/8）は 3-limit（ピタゴラス音律）、5 を含む（5/4・6/5・5/3）は 5-limit、7 を含む（7/4・7/6・8/7）は 7-limit で septimal とも、11 を含む（11/8・11/9・11/6）は 11-limit で undecimal とも呼ぶ。', 'Ratios using only 2 and 3 (3/2, 4/3, 9/8) are 3-limit (Pythagorean tuning); with 5 (5/4, 6/5, 5/3) 5-limit; with 7 (7/4, 7/6, 8/7) 7-limit, also called septimal; with 11 (11/8, 11/9, 11/6) 11-limit, also called undecimal.'),
          t('这个概念来自 Harry Partch。十二平均律的基本极限是 5，足够写出所有基本三和弦；Partch 在自己的音乐里把质数上限定在 11。', 'この考え方は Harry Partch に由来する。平均律の基本リミットは 5 で、基本的な三和音はすべて書ける。Partch は自作で素数の上限を 11 にした。', 'The idea comes from Harry Partch. The essential limit of equal temperament is 5, enough for all the basic triads; in his own music Partch capped the prime at 11.'),
        ] },
      { type: 'match', ref: 'wiki-limit',
        prompt: t('频率比 ↔ 质数极限', '比 ↔ 素数リミット', 'Ratio ↔ prime limit'),
        pairs: [['9/8', '3-limit'], ['6/5', '5-limit'], ['8/7', '7-limit'], ['11/6', '11-limit']],
        hint: t('找比里最大的质数。', '比の中の最大の素数。', 'Find the largest prime in the ratio.'),
        explain: t('9/8 只有 2、3；6/5 有 5；8/7 有 7；11/6 有 11。', '9/8 は 2・3、6/5 は 5、8/7 は 7、11/6 は 11。', '9/8 has only 2 and 3; 6/5 has 5; 8/7 has 7; 11/6 has 11.') },
      G('primeLimit', 4),
    ]),
    L(t('三种纯律和弦：5、7、11-limit', '3 つの純正和音：5・7・11-limit', 'Three just chords: 5-, 7- and 11-limit'), [
      { type: 'guide', ref: ['hf-intervals', 'gann-ji', 'wiki-harmonic-series'], tool: { feature: 'micro' }, demo: { play: [[48, 55.02, 51.86], [48, 55.02, 57.69], [48, 55.02, 58.49]] },
        title: t('1/1–3/2 上面换一个音', '1/1–3/2 の上の 1 音を替える', 'Change one note above 1/1–3/2'),
        steps: [
          t('微分音工具的三个预设：1/1、5/4、3/2 是纯律大三和弦（5-limit）；1/1、3/2、7/4 用到 7（7-limit），7/4 的标准名称是 harmonic seventh；1/1、3/2、11/6 用到 11（11-limit），11/6 叫 undecimal neutral seventh。听：三种依次。', '微分音ツールの 3 つのプリセット：1/1・5/4・3/2 は純正長三和音（5-limit）、1/1・3/2・7/4 は 7 を使う（7-limit）、7/4 の標準名は harmonic seventh。1/1・3/2・11/6 は 11 を使う（11-limit）、11/6 は undecimal neutral seventh。聴いて：3 つを順に。', 'The microtonal tool’s three presets: 1/1, 5/4, 3/2 is the just major triad (5-limit); 1/1, 3/2, 7/4 uses 7 (7-limit), and 7/4 is called the harmonic seventh; 1/1, 3/2, 11/6 uses 11 (11-limit), and 11/6 is the undecimal neutral seventh. Listen to all three.'),
          t('Kyle Gann 的说明：以 C 为基音时，第 7 泛音比平均律的降 B "低"约 31 音分；第 11 泛音正好落在 F 和 F♯ 中间。', 'Kyle Gann の説明：C を基音にすると、第 7 倍音は平均律の B♭ より約 31 セント「低く」、第 11 倍音は F と F♯ のちょうど中間に来る。', 'As Kyle Gann puts it: over C, the 7th harmonic is about 31 cents “flat” of the tempered B♭, and the 11th harmonic falls halfway between F and F♯.'),
        ] },
      { type: 'choice', ref: 'hf-intervals',
        prompt: t('11-limit 预设里的 11/6，标准名称是？', '11-limit のプリセットにある 11/6 の標準名は？', 'In the 11-limit preset, what is 11/6 called?'),
        options: [t('undecimal neutral seventh（十一限中立七度）', 'undecimal neutral seventh（11 リミットの中立 7 度）', 'undecimal neutral seventh'), t('harmonic seventh（泛音七度）', 'harmonic seventh（ハーモニック・セブンス）', 'harmonic seventh'), t('undecimal semi-augmented fourth（十一限半增四度）', 'undecimal semi-augmented fourth（11 リミットの半増 4 度）', 'undecimal semi-augmented fourth'), t('major sixth（大六度）', 'major sixth（長 6 度）', 'major sixth')], answer: 0,
        hint: t('它用到 11，比小七度窄一点。', '11 を使い、短 7 度より少し狭い。', 'It uses 11 and is a little narrower than a minor seventh.'),
        explain: t('11/6 = undecimal neutral seventh；7/4 是 harmonic seventh，11/8 是 undecimal semi-augmented fourth。', '11/6 = undecimal neutral seventh。7/4 は harmonic seventh、11/8 は undecimal semi-augmented fourth。', '11/6 = undecimal neutral seventh; 7/4 is the harmonic seventh and 11/8 the undecimal semi-augmented fourth.') },
      { type: 'choice', ref: ['hf-intervals', 'wiki-limit'],
        prompt: t('1/1、5/4、3/2 是什么和弦？', '1/1・5/4・3/2 はどんな和音？', 'What chord is 1/1, 5/4, 3/2?'),
        options: [t('纯律大三和弦（5-limit）', '純正長三和音（5-limit）', 'a just major triad (5-limit)'), t('中立三和弦', '中立三和音', 'a neutral triad'), t('带泛音七度的和弦（7-limit）', 'ハーモニック・セブンスの和音（7-limit）', 'a harmonic-seventh chord (7-limit)'), t('纯律小三和弦（5-limit）', '純正短三和音（5-limit）', 'a just minor triad (5-limit)')], answer: 0,
        hint: t('5/4 是大三度，3/2 是纯五度。', '5/4 は長 3 度、3/2 は完全 5 度。', '5/4 is a major third, 3/2 a perfect fifth.'),
        explain: t('1/1 + 5/4（major third）+ 3/2（perfect fifth）= 纯律大三和弦；最大质数是 5，属于 5-limit。纯律小三和弦是 1/1、6/5、3/2。', '1/1 + 5/4（major third）+ 3/2（perfect fifth）= 純正長三和音、最大の素数 5 で 5-limit。純正短三和音は 1/1・6/5・3/2。', '1/1 + 5/4 (major third) + 3/2 (perfect fifth) = the just major triad; its largest prime is 5, so 5-limit. The just minor triad is 1/1, 6/5, 3/2.') },
      G('jiInterval', 2),
    ]),
    L(t('微分音和声综合', '微分音の和声の総合', 'Microtonal harmony review'), [
      { type: 'guide', ref: ['wiki-neutral-third', 'wiki-limit', 'hf-intervals'], tool: { feature: 'micro' },
        title: t('新的颜色，标准的名字', '新しい色、標準の名前', 'New colours, standard names'),
        steps: [
          t('中立三和弦是 24 平均、31 平均里的新颜色；质数极限按最大质数给纯律音程分类，Huygens-Fokker 微分音中心的音程表给每个比一个标准的英文名称。', '中立三和音は 24 平均・31 平均の新しい色。素数リミットは最大の素数で純正音程を分類し、Huygens-Fokker 微分音センターの音程表は各比に標準の英語名を与える。', 'Neutral triads are a new colour in 24- and 31-TET; prime limits sort just intervals by their largest prime, and the Huygens-Fokker Foundation’s list gives each ratio a standard English name.'),
        ] },
      G('neutralTriad', 2), G('primeLimit', 1), G('jiInterval', 1), G('ratioCents', 1),
    ]),
  ],
};

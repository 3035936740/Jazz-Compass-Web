// Side-B 第 6 章（二十世纪以来的音高组织）的扩展关：每个普通关通过后解锁。节奏和普通关一样（发现 → 讲解 → 实验 → 挑战），
// 把对应 A 面关卡的进阶关 + 综合测验重新、更细地讲一遍（讲解更长；挑战相当于综合测验）。节点格式见 sideb_ui.js / SIDE_B_DESIGN.md。
// 出处（每条事实都在原文里核对过）：
//   B6-1x：音高 vs 音级（八度等同、同音异名等同；A♭4、A♭3、G♯2 同一音级）；整数记法 C = 0；德彪西的音乐"准调性"、有时不宜假定同音异名等同，要从多个角度看：ref:omt2e-pitch-class
//          无调性音乐里音程宜用半音数；四种音程（有序 / 无序音高音程、有序音级音程（顺时针，像 12 小时钟：9 点到 5 点是 8 小时；A(9) 到 F(5) 是 8）、音程级 ≤ 6）；
//          G–B♭ 与 G–A♯ 在调性里是小三度与增二度、在无调性里相同；C4–E4 = 4、C4–E5 = 16；C 到 E 是 4、E 到 C 是 8；7 → 5、8 → 4、9 → 3；从最具体到最抽象：ref:omt2e-integer-intervals
//          音级集合；标准顺序（像原位；G♯4、A2、D♯3、A4 → [3, 8, 9]；平局时选向一边最紧凑的）；Tn 既是操作也是度量；德彪西《沉没的教堂》开头动机 <2, 4, 11> 在第 18 小节 T4 到 <6, 8, 3>、
//          第 18 到 19 小节无序集合的移位；用减法求 Tn 的下标；倒影：陈怡《多耶》（2000）；取 12 的补数；I8 [2, 4, 7] = [1, 4, 6]（先倒影再移位，或用 n 减）；交叉相加求 In 的下标：ref:omt2e-normal-order
//   B6-2x：全音阶集合与泛全音阶（斯特拉文斯基《彼得鲁什卡》开头）；五声（2–2–3–2–3、五度叠置、黑键、去掉形成半音的两个音、五种旋转、小调五声、陈怡打击乐协奏曲第一乐章 2:13、只有两个三和弦）；
//          全音（WT0 / WT1、影视里的梦境套路）；八声（爵士叫减音阶；OCT0,1 / OCT1,2 / OCT2,3；Joan Tower《Silver Ladders》；20 世纪前在俄国就常见；8 个大小三和弦、4 个减三和弦、
//          除大七外每种七和弦各 4 个、没有五度根音关系；肖邦《g 小调叙事曲》1836 在 B♭7 上）；六声（小二度与小三度交替、只能移位四次、HEX0,1、三大三小两增、两个相距半音的增三和弦）；
//          acoustic（泛音列最低的音程）；梅西安的有限移位调式；距离模型（1:2、1:3"魔术"六音集、1:5，与巴托克相关）；微分音调式（Ligeti、频谱乐派）、合成调式（巴托克《小宇宙》）、
//          威尔第《圣母颂》的"scala enigmatica"；为什么是这些音集（泛音列、对称（巴托克《世俗康塔塔》）、最大均匀（Clough 与 Douthett 1991、Agmon 1990 论斯卡拉蒂））：ref:omt2e-collections
//   B6-3x：集合类的定义、"class"即"组"、生物学类比（被子植物纲 vs 前院的植物）；为什么是移位和倒影；巴托克《主题与倒影》[10, 0, 2, 3, 5] 与 [3, 5, 7, 8, 10] 的 T5、左右手倒影；
//          大小三和弦的 T2、I0、I2 例；原型的五步算法（(02357)）；原型只是标签；集合类表、Forte 编号、补集：ref:omt2e-prime-form
//          音程级向量的定义与 C 大三 <001110>；数每一对音；E4、F♯4、C5、A5 → [4, 6, 9, 0] → <012111>；三音 3、四音 6、五音 10；尖括号 / 方括号 / 圆括号；分析用途：ref:omt2e-ic-vector
//          Forte 与 Rahn 两种原型写法（352 个里 17 个不同；Rahn 从右最分散、Forte 最小跨度内往左最紧凑）；A / B；按向量整数递减排序；Z 关系（zygo-，"轭"）；
//          4-Z15 [0,1,4,6] 与 4-Z29 [0,1,3,7]（<111111>，跨度 6 与 7）；Carter 的编号表（1960–67 之前）、Martino 1961、Hanson 1960；
//          命名的集合：3-5 维也纳三音和弦、4-27A 半减七 / 小六 / 特里斯坦和弦、4-27B 属七 / 德国六 / 泛音七和弦、6-20 六声（"拿破仑颂"）、6-35 全音、6-30 彼得鲁什卡和弦、6-34 神秘和弦：ref:wiki-set-classes
//   B6-4x：十二音作曲大致平均使用十二音级、不宜找调；序列主义 vs 十二音；第二维也纳乐派；仍有人写；479,001,600 个序列；四种操作（半音、严格倒影、逆行 / 蟹行卡农、RI）；48 种形式 / 序列类；
//          P 的选择与按起始音级编号；R 按最后一个音级；I 按第一个音级（与操作下标不一定相同）；RI；矩阵读法；Lutyens《Motet》Op. 27 的 P0 与矩阵；基本规则；
//          Dallapiccola《Piccola Musica Notturna》（1954）；Tavener《The Lamb》的原形、倒影、逆行、逆行倒影与调式终止音 G；序列用于主题、动机、和弦：ref:omt2e-twelve-tone
//          固定零 / 可动零；Lutyens 女中音从 D4 进入、可动零 P0 = 2–1–5–9–10–6–4–8–7–3–11–0；两种习惯的利弊；固定零在近年学术写作里更常见但不代表更好；三种矩阵：ref:omt2e-row-naming
//   B6-5x：纯律分数记法（1/1 任意、八度等价、写在 1/1 与 2/1 之间、5/12 = 5/6 = 5/3 = 10/3 = 20/3、最难习惯的一点）；音分（1200、公式、3986.3137、各比的音分值）；
//          平均律是为移调的妥协（不更好听、有拍音）；托勒密大调音阶的音分与 D 调里 680 音分的五度；Partch 43 音、Lou Harrison（甘美兰、Kirnberger II）、Ben Johnston 等作曲家；
//          La Monte Young《The Well-Tuned Piano》的 1323/1024：ref:gann-ji
//          极限一词出自 Partch；平均律基本极限 5；Partch 上限 11、扩展调性；中世纪前三个泛音、三和弦前五个；20 世纪之交非裔美国人音乐的四音和弦、属七 ≈ 4:5:6:7、大七 ≈ 8:10:12:15；
//          奇数极限 vs 质数极限（9/8、81/64 例）；Partch 关于 9 的引文；septimal、undecimal；美国甘美兰流派与 Lou Harrison：ref:wiki-limit
//          中立三度（次大 / 超小三度）、Land 1880、Zalzal / Al-Farabi 27:22 / Avicenna 39:32；11:9（347.41，5/4 与 6/5 的中项）、16:13（359.47，9/7 与 7/6 的中项）、350（平均律五度的一半）；
//          约 12 音分内难分辨、离平均律大小三度约四分之一音；中立三和弦模糊、见于四分之一音音阶与 31 平均律；婴儿的歌；Ives、Tenney、Gayle Young；托勒密"均匀全音阶"：ref:wiki-neutral-third
//          英文音程名（11/9 undecimal neutral third、7/4 harmonic seventh 等）：ref:hf-intervals
const t = (zh, ja, en) => ({ zh, ja, en });
const G = (id, gen, count, skills, params) => ({ id, type: 'gen', gen, count, skills, ...(params ? { params } : {}) });

// ===================== B6-1x 音级与整数音程 · 扩展关 =====================
// 对应 A 面：posttonal（移位与倒影 / 标准顺序 / 钟面算术 / 变换综合）+ pitchclass（音名换成数字 / 音程级 / 四种音程 / 综合）
const EXT_B6_1 = {
  minutes: 20,
  insight: t('把音变成数字，是为了在没有调的音乐里也能比较：同一个动机移了位、翻了面，数字一减、一加就看得出来。数字是工具，耳朵仍是最后的裁判。', '音を数字にするのは、調のない音楽でも比べられるようにするため：同じ動機が移高・反転されても、引き算と足し算ですぐわかる。数字は道具で、最後の判定は耳。', 'Turning notes into numbers lets us compare in music without keys: transpose or invert a motive, and a subtraction or addition reveals it. Numbers are tools; the ear is still the final judge.'),
  sections: {
    discover: [
      {
        id: 'b61x-d1', type: 'discover', ref: 'omt2e-integer-intervals',
        prompt: t('C4 到 E5：有序音高音程是多少？音程级是多少？', 'C4 から E5：順序付き音高音程はいくつ？ 音程クラスは？', 'C4 to E5: what is the ordered pitch interval, and the interval class?'),
        play: [{ label: 'C4–E5', audio: { notes: [60, 76], mode: 'melody' } }],
        options: [t('+16；音程级 4', '+16、音程クラス 4', '+16; interval class 4'), t('+4；音程级 4', '+4、音程クラス 4', '+4; interval class 4'), t('+16；音程级 8', '+16、音程クラス 8', '+16; interval class 8')],
        answer: 0,
        insight: {
          title: t('从最具体到最抽象', '最も具体的から最も抽象的へ', 'From most concrete to most abstract'),
          text: t('音高音程算八度：C4–E4 是 4，E 再升一个八度到 E5 就是 4 + 12 = 16，有序的再加上方向（+16）。音级只看 C 和 E：有序音级音程从 C 顺时针到 E 是 4（E 到 C 则是 8）；音程级取钟面上短的一边，C–E 和 E–C 都是 4。四种音程，从最具体的有序音高音程，到最抽象的音程级。', '音高音程はオクターヴを数える：C4–E4 は 4、E を 1 オクターヴ上げて E5 にすれば 4 + 12 = 16、順序付きなら方向も付く（+16）。音級は C と E だけを見る：順序付き音級音程は C から時計回りに E まで 4（E から C なら 8）。音程クラスは時計の短い側で、C–E も E–C も 4。4 種の音程は、最も具体的な順序付き音高音程から、最も抽象的な音程クラスまで。', 'Pitch intervals count octaves: C4–E4 is 4, and raising E an octave to E5 makes 4 + 12 = 16, ordered with direction (+16). Pitch classes see only C and E: the ordered pc interval clockwise from C to E is 4 (E to C is 8); the interval class takes the shorter way round, 4 for both. Four interval types run from the most concrete, the ordered pitch interval, to the most abstract, the interval class.'),
        },
      },
    ],
    explain: [
      {
        id: 'b61x-e1', type: 'page', ref: ['omt2e-pitch-class', 'omt2e-integer-intervals'],
        title: t('进阶 1 · 音高、音级与"调性名字"的局限', '発展 1・音高、音級、そして「調性の名前」の限界', 'Advanced 1 · Pitch, pitch class, and the limits of tonal names'),
        text: [
          t('音高是有确定频率的单个音，不包含八度等同：C4 和 C3 是不同的音高。集合理论里"class"就是"组"：音级是一组音高——由八度等同和同音异名等同联系在一起的所有音高，例如 A♭4、A♭3、G♯2 都属于同一个音级。七个字母处理不好十二个音级，所以用整数记法：所有 C（和 B♯ 等同音异名）是 0，C♯/D♭ 是 1……B（和 C♭）是 11。', '音高は確定した周波数を持つ個々の音で、オクターヴの同等性を含まない：C4 と C3 は違う音高。集合論の「class（クラス）」は「グループ」のこと：音級は音高のグループ——オクターヴ同等と異名同音同等で結ばれたすべての音高。たとえば A♭4・A♭3・G♯2 は同じ音級。7 つの文字では 12 の音級をうまく扱えないので整数表記を使う：すべての C（と B♯ など異名同音）は 0、C♯/D♭ は 1……B（と C♭）は 11。', 'A pitch is a discrete tone with its own frequency, without octave equivalence: C4 and C3 are different pitches. In set theory “class” means “group”: a pitch class is all pitches related by octave and enharmonic equivalence — A♭4, A♭3 and G♯2 belong to one. Seven letters handle twelve pitch classes badly, so integer notation is used: every C (and B♯ and so on) is 0, C♯/D♭ is 1, … B (and C♭) is 11.'),
          t('在调性音乐里，音程的协和与不协和由调性本身决定：G 和 B♭ 在 g 小调里是协和的小三度；拼成 G 和 A♯（比如在 b 小调里）就成了不协和的增二度——尽管 B♭ 和 A♯ 是同一个琴键。无调性音乐没有调，这个区分就不再重要，所以改用半音数来量音程。不过 OMT 也提醒：二十世纪以来的音乐非常多样，德彪西的音乐"准调性"，常常更适合不假定同音异名等同的看法——但有时又适合；分析时要依靠音乐直觉，从多个角度尝试，直到找到最合适的。', '調性音楽では音程の協和・不協和は調性そのものが決める：G と B♭ はト短調では協和する短 3 度だが、G と A♯ と綴れば（たとえばロ短調で）不協和な増 2 度になる——B♭ と A♯ は同じ鍵盤なのに。無調の音楽には調がないので、この区別は意味を失い、半音数で音程を測る。ただし OMT は注意する：20 世紀以降の音楽はきわめて多様で、ドビュッシーの音楽は「準調性的」なので、異名同音を同一視しない見方が合うことが多い——だが合わないこともある。分析では音楽的直感に頼り、いくつもの視点を試して最も合うものを探すこと。', 'In tonal music consonance and dissonance depend on the key: G–B♭ is a consonant minor third in G minor; spelled G–A♯ (say in B minor) it is a dissonant augmented second — though B♭ and A♯ are one key. Atonal music has no key, so the distinction lapses and intervals are measured in semitones. Yet OMT cautions that post-tonal music is extremely varied: Debussy’s quasi-tonal music often benefits from not assuming enharmonic equivalence — but sometimes it does; rely on musical intuition and try several perspectives until one fits.'),
        ],
      },
      {
        id: 'b61x-e2', type: 'discover', practice: true, ref: 'omt2e-pitch-class',
        prompt: t('C𝄪、D、E𝄫 用整数记法各是几？', 'C𝄪・D・E𝄫 は整数表記でそれぞれいくつ？', 'In integer notation, what are C𝄪, D and E𝄫?'),
        options: [t('都是 2', 'すべて 2', 'All 2'), t('0、2、4', '0・2・4', '0, 2, 4'), t('1、2、3', '1・2・3', '1, 2, 3')],
        answer: 0,
        insight: { title: t('同音异名，同一个整数', '異名同音は同じ整数', 'Enharmonic, same integer'), text: t('三个拼法都是同一个琴键，所以是同一个音级 2。', '3 つの綴りは同じ鍵盤なので同じ音級 2。', 'All three spellings are the same key, hence one pitch class, 2.') },
      },
      {
        id: 'b61x-e3', type: 'page', ref: 'omt2e-integer-intervals',
        title: t('进阶 2 · 四种音程，各有用处', '発展 2・4 種の音程、それぞれの使い道', 'Advanced 2 · Four kinds of interval, each with its use'),
        text: [
          t('按"音高还是音级""有序还是无序"两个维度，得到四种音程。有序音高音程：两个音高之间的半音数，用 +/− 表示方向，最具体。无序音高音程：半音数、不带方向，更适合和声音程。有序音级音程：在音级空间（钟面）里永远顺时针（上行）数，像 12 小时的钟——9 点到 5 点是 8 小时，绝不是 4；所以 A（9）到 F（5）也是 8。音程级（无序音级音程）：两个音级之间最短的距离，所以只有 1 到 6 六种：数到 7 时逆时针更近，7 变成 5，8 变成 4，9 变成 3。', '「音高か音級か」「順序付きか否か」の 2 つの軸で 4 種の音程になる。順序付き音高音程：2 つの音高の間の半音数に +/− で方向を付ける、最も具体的。順序なし音高音程：半音数だけで方向なし、和声的な音程に向く。順序付き音級音程：音級空間（時計）でいつも時計回り（上行）に数える。12 時間の時計のように 9 時から 5 時は 8 時間で、決して 4 ではない。だから A（9）から F（5）も 8。音程クラス（順序なし音級音程）：2 つの音級の最短距離なので 1〜6 の 6 種だけ。7 になると反時計回りのほうが近いので 7 は 5、8 は 4、9 は 3 になる。', 'Two dimensions — pitch versus pitch class, ordered versus unordered — give four interval types. Ordered pitch interval: semitones between pitches with +/− for direction, the most concrete. Unordered pitch interval: semitones without direction, suited to harmonic intervals. Ordered pitch-class interval: always counted clockwise (ascending) round the clock, like a 12-hour clock — 9 to 5 is 8 hours, never 4; so A (9) to F (5) is 8. Interval class (unordered pc interval): the shortest distance between two pitch classes, so only six, 1–6: at 7 the counter-clockwise way is shorter, so 7 becomes 5, 8 becomes 4, 9 becomes 3.'),
          t('音程级的好处，是把一个音程、它的转位和它的复音程都联系起来——正如音级把一个音高、它的同音异名和它的八度移位联系起来。调性音乐里有时要区分十三度和六度、有时不必；分析无调性音乐时也一样，不同种类的音程适合描述不同的现象。', '音程クラスの利点は、ある音程とその転回形、その複音程を結び付けること——音級がある音高とその異名同音、オクターヴ移動を結び付けるのと同じ。調性音楽で 13 度と 6 度を区別すべきときもそうでないときもあるように、無調の音楽の分析でも、現象によって合う音程の種類が違う。', 'Interval class relates an interval, its inversion and its compounds — just as a pitch class relates a pitch, its respellings and its octave displacements. As in tonal music, where one sometimes distinguishes a thirteenth from a sixth and sometimes not, different interval types suit different phenomena in atonal analysis.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('有序音高', '順序付き音高', 'ordered pitch'), cells: ['C4→E5', '+16'] }, { label: t('无序音高', '順序なし音高', 'unordered pitch'), cells: ['C4–E5', '16'] }, { label: t('有序音级', '順序付き音級', 'ordered pc'), cells: ['C→E / E→C', '4 / 8'] }, { label: t('音程级', '音程クラス', 'interval class'), cells: ['C–E', '4'] }] },
      },
      {
        id: 'b61x-e4', type: 'discover', practice: true, ref: 'omt2e-integer-intervals',
        prompt: t('A（9）到 F（5）的有序音级音程是多少？音程级呢？', 'A（9）から F（5）の順序付き音級音程は？ 音程クラスは？', 'From A (9) to F (5): the ordered pc interval, and the interval class?'),
        options: [t('8；音程级 4', '8、音程クラス 4', '8; interval class 4'), t('4；音程级 4', '4、音程クラス 4', '4; interval class 4'), t('−4；音程级 8', '−4、音程クラス 8', '−4; interval class 8')],
        answer: 0,
        insight: { title: t('像上班：9 点到 5 点', '9 時から 5 時の勤務のように', 'Like a 9-to-5 shift'), text: t('顺时针从 9 数到 5 是 8；短的一边是 4。', '9 から 5 へ時計回りに 8、短い側は 4。', 'Clockwise from 9 to 5 is 8; the short way is 4.') },
      },
      {
        id: 'b61x-e5', type: 'page', ref: 'omt2e-normal-order',
        title: t('进阶 3 · 移位 Tn：既是操作，也是度量', '発展 3・移高 Tn：操作でもあり、測定でもある', 'Advanced 3 · Transposition Tn: an operation and a measurement'),
        text: [
          t('把一组音级当作一个整体时，叫音级集合（pc set）。标准顺序是把它按升序写成最紧凑的样子，作用像三和弦的原位。算法：去掉重复、按升序写成一个八度内的样子（例如 G♯4、A2、D♯3、A4 → 8, 9, 3）；把第一个音级抄到末尾（8, 9, 3, 8）；找相邻音级之间最大的有序音级音程（8→9 是 1，9→3 是 6，3→8 是 5，最大是 9→3）；从最大音程右边的音开始重写，用方括号：[3, 8, 9]。最大音程平局时，选向一边最紧凑的；还平局就选向下方最紧凑的。', 'ひとまとまりとして扱う音級のグループを音級集合（pc set）という。正規順序はそれを昇順で最も詰めて書いたもので、三和音の基本形のような働きをする。手順：重複を除き、1 オクターヴ内の昇順に書く（たとえば G♯4・A2・D♯3・A4 → 8, 9, 3）。最初の音級を末尾に写す（8, 9, 3, 8）。隣り合う音級間で最大の順序付き音級音程を探す（8→9 は 1、9→3 は 6、3→8 は 5、最大は 9→3）。最大音程の右の音から書き直し、角括弧で：[3, 8, 9]。最大音程が同点なら一方に最も詰まったものを、なお同点なら下に最も詰まったものを選ぶ。', 'A group of pitch classes treated as a unit is a pitch-class set. Its normal order is the most compressed ascending arrangement, much like root position for triads. Method: remove duplicates and write in ascending order within an octave (G♯4, A2, D♯3, A4 → 8, 9, 3); copy the first pc to the end (8, 9, 3, 8); find the largest ordered pc interval between neighbours (8→9 = 1, 9→3 = 6, 3→8 = 5: 9→3); rewrite starting just right of it, in square brackets: [3, 8, 9]. On a tie, choose the ordering most packed to one side, then most packed to the bottom.'),
          t('移位可以是一个"操作"（对音级或集合做的事），也可以是一个"度量"（两者之间的距离），记作 Tn，下标 n 是两个集合之间的有序音级音程。德彪西《沉没的教堂》开头的动机 <D, E, B> = <2, 4, 11> 在第 18 小节被移高四个半音成 <F♯, G♯, D♯> = <6, 8, 3>，象征教堂慢慢升出水面：T4 [11, 2, 4] = [3, 6, 8]。从第 18 到 19 小节，动机以更隐蔽的方式保留下来：移位的是无序的音级集合，而不是有序的那条——排成标准顺序后才看得出来。判断两个集合是否 Tn 关系：都写成标准顺序，后一个减前一个，如果差都一样，就是这个 Tn：[3, 6, 8] − [11, 2, 4] = 4 4 4。', '移高は「操作」（音級や集合にすること）でも「測定」（2 つの間の距離）でもあり、Tn と書く。添字 n は 2 つの集合の間の順序付き音級音程。ドビュッシー《沈める寺》冒頭の動機 <D, E, B> = <2, 4, 11> は第 18 小節で 4 半音高く <F♯, G♯, D♯> = <6, 8, 3> に移され、聖堂がゆっくり水面に浮かぶさまを表す：T4 [11, 2, 4] = [3, 6, 8]。第 18 から 19 小節へは、動機がもっと分かりにくい形で保たれる：移高されるのは順序付きの列でなく順序のない音級集合——正規順序に並べて初めて分かる。2 つの集合が Tn の関係か調べるには、どちらも正規順序にし、後ろから前を引く。差がすべて同じならその Tn：[3, 6, 8] − [11, 2, 4] = 4 4 4。', 'Transposition can be an operation (done to a pitch class or set) or a measurement (the distance between them), written Tn, n being the ordered pc interval between the sets. The opening motive of Debussy’s “La cathédrale engloutie”, <D, E, B> = <2, 4, 11>, returns four semitones higher in bar 18 as <F♯, G♯, D♯> = <6, 8, 3>, the cathedral slowly rising above the water: T4 [11, 2, 4] = [3, 6, 8]. From bar 18 into 19 the motive survives more obscurely — the unordered set is transposed, not the ordered one — visible once in normal order. To test a Tn relation, put both sets in normal order and subtract the first from the second; if the differences match, that is the Tn: [3, 6, 8] − [11, 2, 4] = 4 4 4.'),
        ],
      },
      {
        id: 'b61x-e6', type: 'discover', practice: true, ref: 'omt2e-normal-order',
        prompt: t('{1, 5, 8} 的标准顺序是？（相邻有序音级音程：1→5 是 4，5→8 是 3，8→1 是 5）', '{1, 5, 8} の正規順序は？（隣接する順序付き音級音程：1→5 は 4、5→8 は 3、8→1 は 5）', 'The normal order of {1, 5, 8}? (adjacent ordered pc intervals: 1→5 = 4, 5→8 = 3, 8→1 = 5)'),
        options: ['[1, 5, 8]', '[5, 8, 1]', '[8, 1, 5]'],
        answer: 0,
        insight: { title: t('从最大音程右边开始', '最大音程の右から', 'Start right of the largest gap'), text: t('最大的是 8→1（5），从它右边的 1 开始：[1, 5, 8]——就是 D♭ 大三和弦的原位。', '最大は 8→1（5）、その右の 1 から：[1, 5, 8]——変ニ長三和音の基本形そのもの。', 'The largest is 8→1 (5), so start on 1: [1, 5, 8] — the D♭ major triad in root position.') },
      },
      {
        id: 'b61x-e7', type: 'page', ref: 'omt2e-normal-order',
        title: t('进阶 4 · 倒影 In：三种算法与"交叉相加"', '発展 4・反転 In：3 つの計算と「交差加算」', 'Advanced 4 · Inversion In: three methods and cross-addition'),
        text: [
          t('倒影和移位一样常用来连接相似的东西：陈怡《多耶》（2000）里两个姿态有同样的音程（一个 2、一个 3、一个 5），只是排列方式不同，耳朵仍听出它们很像。没给下标时，"倒影"指 mod 12 倒影：取每个整数对 12 的补数（4 的补数是 8，6 是 6，0 是 0），[2, 4, 7] 倒影成 [5, 8, 10]。In 是"先倒影、再移位"：I8 [2, 4, 7]：先倒影得 [5, 8, 10]，再加 8 得 [1, 4, 6]。也可以直接用 n 减每个音级：8 − 2、8 − 4、8 − 7 = 6、4、1，即 [1, 4, 6]。', '反転も移高と同じく、似たもの同士をつなぐのによく使われる：陳怡《多耶》（2000）の 2 つの身ぶりは同じ音程（2・3・5 が 1 つずつ）を持つが並び方が違い、それでも耳はよく似ていると感じる。添字がないときの「反転」は mod 12 の反転：各整数の 12 に対する補数を取る（4 の補数は 8、6 は 6、0 は 0）。[2, 4, 7] は [5, 8, 10] になる。In は「反転してから移高」：I8 [2, 4, 7] はまず反転して [5, 8, 10]、8 を足して [1, 4, 6]。各音級を n から引いてもよい：8 − 2・8 − 4・8 − 7 = 6・4・1、つまり [1, 4, 6]。', 'Inversion, like transposition, often links similar objects: two gestures in Chen Yi’s Duo Ye (2000) share interval content (a 2, a 3 and a 5) arranged differently, and the ear hears them as alike. Without an index, “invert” means invert mod 12: take each integer’s complement (4 → 8, 6 → 6, 0 → 0), so [2, 4, 7] becomes [5, 8, 10]. In means invert then transpose: I8 [2, 4, 7] → [5, 8, 10] → add 8 → [1, 4, 6]. Or subtract each pc from n: 8 − 2, 8 − 4, 8 − 7 = 6, 4, 1, i.e. [1, 4, 6].'),
          t('判断两个集合是否 In 关系、并求出下标：两个倒影相关的集合，写成标准顺序后，音级会以相反的顺序一一对应，像镜子一样——每一对相加都得到同一个数，就是倒影的下标（因为 y = n − x，所以 n = x + y）。具体做法是"交叉相加"：上下对齐写两个集合，一个的最左加另一个的最右、中间加中间、最右加最左；和大于等于 12 就减 12。', '2 つの集合が In の関係か調べ、添字を求めるには：反転で関係する 2 つの集合を正規順序で書くと、音級が逆順で 1 対 1 に対応し、鏡のようになる——どの組を足しても同じ数になり、それが反転の添字（y = n − x なので n = x + y）。具体的には「交差加算」：2 つの集合を上下にそろえて書き、一方の左端ともう一方の右端、真ん中どうし、右端と左端を足す。和が 12 以上なら 12 を引く。', 'To test an In relation and find its index: two inversionally related sets in normal order map onto each other in reverse order, like a mirror — every pair sums to the same number, the index (since y = n − x, n = x + y). The cross-addition method: write the sets one above the other and add the leftmost of one to the rightmost of the other, middle to middle, rightmost to leftmost; subtract 12 from sums of 12 or more.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: '[2, 4, 7]', cells: ['2', '4', '7'] }, { label: '[1, 4, 6]', cells: ['6', '4', '1'] }, { label: '+', cells: ['8', '8', '8'] }] },
      },
      {
        id: 'b61x-e8', type: 'discover', practice: true, ref: 'omt2e-normal-order',
        prompt: t('I3 [0, 4, 7] 是？', 'I3 [0, 4, 7] は？', 'What is I3 [0, 4, 7]?'),
        options: ['[8, 11, 3]', '[3, 7, 10]', '[5, 8, 0]'],
        answer: 0,
        insight: { title: t('用 3 减每个数', '3 から各数を引く', 'Subtract each from 3'), text: t('3 − 0 = 3，3 − 4 = −1 → 11，3 − 7 = −4 → 8：{3, 11, 8}，标准顺序 [8, 11, 3]——A♭ 小三和弦。', '3 − 0 = 3、3 − 4 = −1 → 11、3 − 7 = −4 → 8：{3, 11, 8}、正規順序 [8, 11, 3]——変イ短三和音。', '3 − 0 = 3, 3 − 4 = −1 → 11, 3 − 7 = −4 → 8: {3, 11, 8}, normal order [8, 11, 3] — an A♭ minor triad.') },
      },
    ],
    experiment: [
      { id: 'b61x-x1', type: 'experiment', toy: 'pc', ref: ['omt2e-pitch-class', 'omt2e-integer-intervals'],
        prompt: t('从 A（9）和 F（5）开始：两个方向的有序音级音程各是多少？加起来为什么是 12？再试 C 和 F♯（0 和 6）：为什么两个方向一样长，音程级正好是最大的 6？', 'A（9）と F（5）から始めよう：両方向の順序付き音級音程は？ 足すとなぜ 12？ 次に C と F♯（0 と 6）：なぜ両方向が同じ長さで、音程クラスがちょうど最大の 6 なのか？', 'Start with A (9) and F (5): what are the ordered pc intervals each way, and why do they sum to 12? Then try C and F♯ (0 and 6): why are both ways equal, the interval class exactly the maximum, 6?'),
        params: { a: 9, b: 5 },
        breakthrough: { id: 'b61x-clock', text: t('你在钟面上看清了：两个方向互补，短的那边就是音程级。', '時計の上で見えた：2 つの方向は補い合い、短い側が音程クラス。', 'You saw it on the clock: the two directions complement each other, and the shorter is the interval class.') } },
    ],
    challenge: [
      {
        id: 'b61x-c1', type: 'choice', error: 'pc-interval', skills: ['calc'], ref: 'omt2e-integer-intervals',
        variants: [
          { prompt: t('E 到 C 的有序音级音程是？', 'E から C の順序付き音級音程は？', 'The ordered pc interval from E to C is…'), options: ['8', '4', '−4'] },
          { prompt: t('有序音级音程 9 对应的音程级是？', '順序付き音級音程 9 の音程クラスは？', 'An ordered pc interval of 9 has interval class…'), options: ['3', '9', '6'] },
          { prompt: t('C4 往下到 A3 的有序音高音程是？', 'C4 から下の A3 への順序付き音高音程は？', 'The ordered pitch interval from C4 down to A3 is…'), options: ['−3', '+9', '3'] },
        ],
        answer: 0,
        explain: t('E→C 顺时针 8；9 的短边是 3；往下三个半音写成 −3。', 'E→C は時計回りで 8。9 の短い側は 3。下へ 3 半音は −3。', 'E→C clockwise is 8; 9’s short side is 3; three semitones down is −3.'),
      },
      {
        id: 'b61x-c2', type: 'choice', error: 'pc-interval', skills: ['calc'], ref: 'omt2e-normal-order',
        variants: [
          { prompt: t('[3, 6, 8] 和 [11, 2, 4] 是什么关系？', '[3, 6, 8] と [11, 2, 4] の関係は？', 'How are [3, 6, 8] and [11, 2, 4] related?'), options: ['T4', 'T8', 'I3'] },
          { prompt: t('I8 [2, 4, 7] 是？', 'I8 [2, 4, 7] は？', 'I8 [2, 4, 7] is…'), options: ['[1, 4, 6]', '[10, 0, 3]', '[5, 8, 10]'] },
          { prompt: t('[2, 4, 7] 不加下标的 mod 12 倒影是？', '[2, 4, 7] の添字なしの mod 12 反転は？', 'The plain mod-12 inversion of [2, 4, 7] is…'), options: ['[5, 8, 10]', '[1, 4, 6]', '[7, 4, 2]'] },
        ],
        answer: 0,
        explain: t('[3, 6, 8] − [11, 2, 4] = 4 4 4：T4；I8：8 − 2、8 − 4、8 − 7 → [1, 4, 6]；补数 10、8、5 → [5, 8, 10]。', '[3, 6, 8] − [11, 2, 4] = 4 4 4：T4。I8：8 − 2・8 − 4・8 − 7 → [1, 4, 6]。補数 10・8・5 → [5, 8, 10]。', '[3, 6, 8] − [11, 2, 4] = 4 4 4: T4; I8: 8 − 2, 8 − 4, 8 − 7 → [1, 4, 6]; complements 10, 8, 5 → [5, 8, 10].'),
      },
      {
        id: 'b61x-c3', type: 'choice', error: 'normal-order', skills: ['calc'], ref: 'omt2e-normal-order',
        variants: [
          { prompt: t('G♯4、A2、D♯3、A4 的标准顺序是？', 'G♯4・A2・D♯3・A4 の正規順序は？', 'The normal order of G♯4, A2, D♯3, A4 is…'), options: ['[3, 8, 9]', '[8, 9, 3]', '[9, 3, 8]'] },
          { prompt: t('标准顺序在集合理论里的作用最像？', '正規順序は集合論で何に最も近い働き？', 'In set theory, normal order works most like…'), options: [t('三和弦的原位', '三和音の基本形', 'root position for triads'), t('调号', '調号', 'a key signature'), t('拍号', '拍子記号', 'a time signature')] },
          { prompt: t('标准顺序算法里，最大音程平局时先选？', '正規順序の手順で最大音程が同点なら、まず選ぶのは？', 'When the largest intervals tie in the normal-order method, first choose…'), options: [t('向一边最紧凑的排法', '一方に最も詰まった並び', 'the ordering most packed to one side'), t('最高音最高的', '最高音がいちばん高いもの', 'the one with the highest top note'), t('随便一个', 'どれでもよい', 'any of them')] },
        ],
        answer: 0,
        explain: t('8, 9, 3 里最大音程是 9→3，从 3 开始：[3, 8, 9]；标准顺序像原位；平局先选向一边最紧凑的，再选向下方最紧凑的。', '8, 9, 3 の最大音程は 9→3、3 から：[3, 8, 9]。正規順序は基本形のよう。同点ならまず一方に最も詰まったもの、次に下に最も詰まったもの。', 'In 8, 9, 3 the largest gap is 9→3, so [3, 8, 9]; normal order is like root position; ties go first to the most packed to one side, then to the bottom.'),
      },
      {
        id: 'b61x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: ['omt2e-normal-order', 'omt2e-pitch-class'],
        variants: [
          { prompt: t('《沉没的教堂》第 18 小节的移位，OMT 说它象征什么？', '《沈める寺》第 18 小節の移高は何を表すと OMT は言う？', 'What does OMT say the bar-18 transposition in “La cathédrale engloutie” represents?'), options: [t('教堂慢慢升出水面', '聖堂がゆっくり水面に浮かぶ', 'the cathedral slowly rising above the water'), t('钟声', '鐘の音', 'bells ringing'), t('教堂沉下去', '聖堂が沈む', 'the cathedral sinking')] },
          { prompt: t('分析德彪西时，OMT 提醒什么？', 'ドビュッシーの分析で OMT が注意することは？', 'What does OMT caution about analysing Debussy?'), options: [t('他的音乐准调性，常常不宜假定同音异名等同，要从多个角度看', '準調性的なので異名同音を同一視しないほうがよいことが多く、多くの視点で見ること', 'His quasi-tonal music often resists enharmonic equivalence; try several perspectives'), t('一律用整数记法', 'いつも整数表記を使う', 'Always use integer notation'), t('不能分析', '分析できない', 'It cannot be analysed')] },
          { prompt: t('陈怡《多耶》里两个倒影相关的姿态有什么共同点？', '陳怡《多耶》の反転で関係する 2 つの身ぶりの共通点は？', 'What do the two inversionally related gestures in Chen Yi’s Duo Ye share?'), options: [t('同样的音程（2、3、5 各一个），排列不同', '同じ音程（2・3・5 が 1 つずつ）、並びが違う', 'The same intervals (a 2, a 3, a 5), arranged differently'), t('完全相同的音', 'まったく同じ音', 'Exactly the same notes'), t('同样的节奏', '同じリズム', 'The same rhythm')] },
        ],
        answer: 0,
        explain: t('T4 象征教堂升起；德彪西的音乐要灵活看待同音异名；《多耶》的两个姿态音程相同、排列不同。', 'T4 は聖堂が浮かぶさま。ドビュッシーでは異名同音を柔軟に扱う。《多耶》の 2 つの身ぶりは音程が同じで並びが違う。', 'T4 shows the cathedral rising; Debussy needs a flexible view of enharmonics; the Duo Ye gestures share intervals arranged differently.'),
      },
      G('b61x-g1', 'pcInteger', 1, ['calc']),
      G('b61x-g2', 'tnIn', 1, ['calc']),
    ],
  },
  pool: [G('b61x-p1', 'intervalClass', 2, ['calc']), G('b61x-p2', 'tnIn', 2, ['calc'])],
};

// ===================== B6-2x 音集与对称 · 扩展关 =====================
// 对应 A 面：collections（五种音集的台阶 / 梅西安七种调式 / acoustic 与六声 / 综合）
const EXT_B6_2 = {
  minutes: 22,
  insight: t('二十世纪作曲家偏爱的音集各有来历：五声和全音阶来自五度叠置，acoustic 来自泛音列，全音、八声、六声来自对称。对称让音乐脱离"从低音往上"的泛音世界，建立另一种秩序。', '20 世紀の作曲家が好んだ音集合にはそれぞれ由来がある：五音と全音階は 5 度の積み重ね、アコースティックは倍音列、全音・八音・六音は対称性から。対称性は音楽を「低音から上へ」の倍音の世界から離し、別の秩序を作る。', 'Each favourite 20th-century collection has a pedigree: pentatonic and diatonic from stacked fifths, acoustic from the harmonic series, whole-tone, octatonic and hexatonic from symmetry. Symmetry lets music leave the bass-up world of overtones and build a different order.'),
  sections: {
    discover: [
      {
        id: 'b62x-d1', type: 'discover', ref: 'omt2e-collections',
        prompt: t('五声音集 C D E G A 里能搭出几个三和弦？那五声旋律是不是只能用这几个和弦伴奏？', '五音音集合 C D E G A で三和音はいくつ作れる？ 五音の旋律はそれだけで伴奏しなければならない？', 'How many triads fit in the pentatonic collection C D E G A? Must pentatonic melodies be harmonised with only those?'),
        play: [{ label: 'C D E G A', audio: { notes: [60, 62, 64, 67, 69, 72], mode: 'melody' } }],
        options: [t('只有两个（C 大三、A 小三）；五声旋律常常不在五声里配和声', '2 つだけ（C の長三・A の短三）。五音の旋律は五音の外で和声付けされることが多い', 'Only two (C major, A minor); pentatonic melodies often aren’t harmonised within the collection'), t('五个，每个音上一个', '5 つ、各音に 1 つ', 'Five, one on each note'), t('一个都没有', '1 つもない', 'None')],
        answer: 0,
        insight: {
          title: t('旋律在五声里，和声可以不在', '旋律は五音、和声はその外でもよい', 'Melody inside, harmony outside'),
          text: t('C D E G A 里只有 C E G 和 A C E 两个三和弦。OMT 举了陈怡打击乐协奏曲第一乐章：2:13 弦乐奏出五声旋律，铜管有时用听起来很无调的和弦伴奏——五声旋律并不需要在五声里配和声，事实上常常不是。', 'C D E G A には C E G と A C E の 2 つの三和音しかない。OMT は陳怡の打楽器協奏曲第 1 楽章を挙げる：2:13 で弦が五音の旋律を奏で、金管はときに無調的に聞こえる和音で伴奏する——五音の旋律は五音の中で和声付けする必要はなく、実際そうでないことが多い。', 'C D E G A holds only two triads, C E G and A C E. OMT cites the first movement of Chen Yi’s percussion concerto: at 2:13 the strings play a pentatonic melody, sometimes accompanied by atonal-sounding brass chords — pentatonic melodies needn’t be harmonised within the collection, and often aren’t.'),
        },
      },
    ],
    explain: [
      {
        id: 'b62x-e1', type: 'page', ref: 'omt2e-collections',
        title: t('进阶 1 · 全音阶、泛全音阶与五声', '発展 1・全音階、汎全音階、五音', 'Advanced 1 · Diatonic, pandiatonic, pentatonic'),
        text: [
          t('全音阶集合是许多西方音乐的基础。二十世纪以来，作曲家有时用全音阶集合，却不让任何一个音听起来像中心——既不是调性也不是调式，叫"泛全音阶"；斯特拉文斯基常写这样的段落，芭蕾《彼得鲁什卡》的开头就有很多。', '全音階の集合は多くの西洋音楽の基礎。20 世紀以降、作曲家は全音階の集合を使いながら、どの音も中心に聞こえないようにすることがあった——調性でも旋法でもなく、「汎全音階的」という。ストラヴィンスキーはよくこうした部分を書き、バレエ《ペトルーシュカ》の冒頭に多く聞かれる。', 'The diatonic collection underlies much Western music. In the 20th and 21st centuries composers sometimes used it without letting any pitch sound central — neither tonal nor modal but pandiatonic; Stravinsky wrote many such passages, heard throughout the opening of Petrushka.'),
          t('五声音集遍布全球，由 大二–大二–小三–大二–小三 构成。可以从三个角度得到它：大调音阶去掉两个音；把全音阶看成一串纯五度（F C G D A E B），五声是更窄的一串（C G D A E）；或者钢琴的黑键。它去掉的正是全音阶里形成半音的两个音；没有半音，它更容易旋转、不强调某个主音，五个音都容易当中心——C、D、E……开头各是一个调式，其中一种常见旋转叫"小调五声"。', '五音音集合は世界中にあり、長 2–長 2–短 3–長 2–短 3 でできている。3 つの見方で得られる：長音階から 2 音を除く。全音階を完全 5 度の列（F C G D A E B）と見て、五音はその狭い列（C G D A E）。あるいはピアノの黒鍵。除かれるのは全音階で半音を作る 2 音。半音がないので回しやすく、特定の主音を強調せず、5 つのどの音も中心になりやすい——C・D・E……から始めればそれぞれ旋法になり、よくある回転の 1 つが「マイナー・ペンタトニック」。', 'The pentatonic collection, found worldwide, has the pattern M2–M2–m3–M2–m3. It can be derived three ways: the major scale minus two notes; a narrower stack of fifths (C G D A E) than the diatonic’s (F C G D A E B); or the piano’s black keys. It removes exactly the two notes that make half steps; without semitones it rotates easily, stressing no tonic — each note can be a centre, C, D, E… each starting a mode, one common rotation being the minor pentatonic.'),
        ],
      },
      {
        id: 'b62x-e2', type: 'discover', practice: true, ref: 'omt2e-collections',
        prompt: t('把全音阶看成一串纯五度 F C G D A E B，五声音集是其中哪一段？', '全音階を完全 5 度の列 F C G D A E B と見ると、五音音集合はどの部分？', 'Seeing the diatonic as the fifths F C G D A E B, which stretch is the pentatonic?'),
        options: ['C G D A E', 'F C G D A', 'G D A E B'],
        answer: 0,
        insight: { title: t('去掉两头的 F 和 B', '両端の F と B を除く', 'Drop F and B from the ends'), text: t('F 和 B 正是 C 大调里形成半音（E–F、B–C）的两个音。', 'F と B はハ長調で半音（E–F・B–C）を作る 2 音。', 'F and B are exactly the notes forming C major’s half steps (E–F, B–C).') },
      },
      {
        id: 'b62x-e3', type: 'page', ref: 'omt2e-collections',
        title: t('进阶 2 · 全音与八声：名字、和弦与例子', '発展 2・全音と八音：名前、和音、例', 'Advanced 2 · Whole-tone and octatonic: names, chords, examples'),
        text: [
          t('全音音集只有一种台阶，旋转起来很模糊，作曲家常用它制造不安定感（影视里一个有名的套路是用它配梦境）。只有两个：偶数音级 [0, 2, 4, 6, 8, 10] 和奇数音级 [1, 3, 5, 7, 9, 11]，可以记作 WT0 和 WT1；WT1 往上移半音又回到 WT0。八声音集由全音、半音交替构成，共八个音；爵士乐手叫它减音阶，因为它很配完全减七和弦。它只有三个：OCT0,1、OCT1,2、OCT2,3，下标是这个音集里独有的那个半音（C–C♯、C♯–D、D–E♭）。', '全音音集合は 1 種類の音程しかなく回転すると曖昧で、作曲家はよく不安定な感じを出すのに使う（映像では夢の場面に付けるのが有名な定番）。2 つしかない：偶数の音級 [0, 2, 4, 6, 8, 10] と奇数の音級 [1, 3, 5, 7, 9, 11]、WT0 と WT1 と書ける。WT1 を半音上げると WT0 に戻る。八音音集合は全音と半音が交互で 8 音。ジャズ奏者は完全減七によく合うのでディミニッシュ・スケールと呼ぶ。3 つしかない：OCT0,1・OCT1,2・OCT2,3。添字はその音集合に固有の半音（C–C♯・C♯–D・D–E♭）。', 'The whole-tone collection has one step size and is rotationally ambiguous, often used for an unsettled feeling (a famous screen trope accompanies dream sequences with it). There are only two: even pcs [0, 2, 4, 6, 8, 10] and odd [1, 3, 5, 7, 9, 11], WT0 and WT1; WT1 up a half step is WT0 again. The octatonic alternates whole and half steps for eight notes; jazz players call it the diminished scale, as it fits a fully diminished seventh chord. There are only three: OCT0,1, OCT1,2, OCT2,3, the subscript naming the half step unique to each (C–C♯, C♯–D, D–E♭).'),
          t('Joan Tower 常用八声音集，她的《Silver Ladders》开头特别明显；和其他音集不同，八声在 20 世纪以前就相当常见，尤其在俄国。它能搭出不少熟悉的和弦：八个大小三和弦（还有四个减三和弦）、除了大七和弦以外每种七和弦各四个；但没有根音相距五度的和弦，所以不可能有主—属进行，取而代之的是大量三度根音关系。肖邦在《g 小调叙事曲》（1836）里就在一个 B♭7 和弦上用了八声音集。', 'ジョーン・タワーはよく八音音集合を使い、《Silver Ladders》の冒頭で特にはっきり聞こえる。ほかの音集合と違い、八音は 20 世紀以前、特にロシアでかなり見られる。なじみのある和音がたくさん作れる：長短三和音 8 つ（減三和音も 4 つ）、長七以外の各種七の和音が 4 つずつ。だが根音が 5 度関係の和音はないので主–属の進行はありえず、代わりに 3 度の根音関係がたくさんある。ショパンは《バラード第 1 番ト短調》（1836）で B♭7 の上に八音音集合を使った。', 'Joan Tower uses the octatonic often, audibly at the opening of Silver Ladders; unlike the others it appears fairly often before the 20th century, especially in Russia. It yields many familiar chords: eight major/minor triads (plus four diminished), four of every seventh-chord type except the major seventh; but no chords with roots a fifth apart, so no tonic–dominant motion — instead a plethora of root motion by thirds. Chopin used it over a B♭7 chord in his Ballade in G minor (1836).'),
        ],
      },
      {
        id: 'b62x-e4', type: 'discover', practice: true, ref: 'omt2e-collections',
        prompt: t('八声音集里为什么不可能有主—属进行？', '八音音集合でなぜ主–属の進行がありえない？', 'Why is tonic–dominant motion impossible within the octatonic collection?'),
        options: [t('里面没有根音相距五度的和弦', '根音が 5 度関係の和音がないから', 'It contains no chords with roots a fifth apart'), t('里面没有三和弦', '三和音がないから', 'It contains no triads'), t('它只有六个音', '6 音しかないから', 'It has only six notes')],
        answer: 0,
        insight: { title: t('三度代替五度', '5 度の代わりに 3 度', 'Thirds instead of fifths'), text: t('八声里有八个大小三和弦，但根音都相距小三度的倍数，只有大量三度根音关系。', '八音には長短三和音が 8 つあるが、根音はすべて短 3 度の倍数離れ、3 度の根音関係ばかり。', 'It holds eight major/minor triads, but their roots lie minor thirds apart — plenty of third relations, no fifths.') },
      },
      {
        id: 'b62x-e5', type: 'page', ref: 'omt2e-collections',
        title: t('进阶 3 · 六声、acoustic 与"距离模型"', '発展 3・六音、アコースティック、「距離モデル」', 'Advanced 3 · Hexatonic, acoustic and the “distance model”'),
        text: [
          t('六声音集由小二度和小三度交替构成，共六个音；虽然别的六音音阶也有（比如布鲁斯音阶），"六声音集"专指这一种。和八声一样，它只能移位四次就回到同一组音，按最低的那个半音命名（HEX0,1 是含 C–C♯ 的那个）；它包含三和弦，却不暗示某个主和弦或调：每个六声音集有三个大三、三个小三和两个增三和弦——把两个相距半音的增三和弦放在一起，也能得到六声音集。acoustic 音集来自泛音列最低的几个音程，长期以来人们把这些低音程和协和联系在一起；它像大调，但四级升高、七级降低。', '六音音集合は短 2 度と短 3 度が交互で 6 音。ほかにも 6 音の音階はある（ブルース・スケールなど）が、「六音音集合」はこの 1 つだけを指す。八音と同じく 4 回移高すると同じ音の組に戻り、最も低い半音で名付ける（HEX0,1 は C–C♯ を含むもの）。三和音を含むが、特定の主和音や調を示さない：各六音音集合には長三和音 3・短三和音 3・増三和音 2 がある——半音離れた 2 つの増三和音を合わせても六音音集合になる。アコースティック音集合は倍音列の最も低い音程から来ており、それらの低い音程は昔から協和と結び付けられてきた。長音階に似ているが、4 度が上がり 7 度が下がっている。', 'The hexatonic collection alternates minor seconds and minor thirds for six notes; other six-note scales exist (the blues scale), but “hexatonic collection” always means this one. Like the octatonic it has only four distinct transpositions, named by its lowest semitone (HEX0,1 contains C–C♯); it contains triads yet implies no tonic: three major, three minor and two augmented triads — juxtaposing two augmented triads a semitone apart also generates it. The acoustic collection derives from the lowest intervals of the overtone series, long associated with consonance; it resembles the major scale with a raised fourth and lowered seventh.'),
          t('梅西安对只能移位几次就重复的音集特别感兴趣，称之为"有限移位调式"。"距离模型"是其中更受限的一类，由两个音程交替构成：1:2（半音和全音交替，又是八声）、1:3（半音和小三度，即六声，集合理论里叫"魔术"六音集）、1:5（半音和纯四度），这种组织方式和巴托克关系密切。这还只是冰山一角：还有 Ligeti 和频谱乐派喜爱的微分音调式、由全音阶改动得来的合成调式（如巴托克《小宇宙》某些乐曲的非标准调号）、以及威尔第《圣母颂》里几乎不在别处用的"谜一样的音阶"（scala enigmatica）。', 'メシアンは数回移高すると繰り返す音集合に特に関心を持ち、「移調の限られた旋法」と呼んだ。「距離モデル」はその中のより限られた種類で、2 つの音程の交替でできる：1:2（半音と全音の交替、また八音）、1:3（半音と短 3 度、すなわち六音、集合論では「マジック」ヘクサコード）、1:5（半音と完全 4 度）。この組織法はバルトークと強く結び付いている。これは氷山の一角にすぎない：リゲティやスペクトル楽派が好む微分音の旋法、全音階を変えて作る合成旋法（バルトーク《ミクロコスモス》のいくつかの曲の標準外の調号など）、ヴェルディ《アヴェ・マリア》の、ほかではほとんど使われない「謎の音階」（スカーラ・エニグマティカ）もある。', 'Messiaen was drawn to collections that repeat after a few transpositions, his “modes of limited transposition”. The “distance model” is a more restricted kind, alternating two intervals: 1:2 (semitones and whole tones — the octatonic again), 1:3 (semitones and minor thirds — the hexatonic, the “magic” hexachord in set-class terms), 1:5 (semitones and perfect fourths); this organisation is strongly associated with Bartók. And that is the tip of the iceberg: microtonal modes beloved of Ligeti and the spectral school, synthetic modes altered from the diatonic (the non-standard key signatures of some pieces in Bartók’s Mikrokosmos), and one-off cases like the “scala enigmatica” of Verdi’s Ave Maria.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: '1:2', cells: [t('八声', '八音', 'octatonic')] }, { label: '1:3', cells: [t('六声（"魔术"六音集）', '六音（「マジック」ヘクサコード）', 'hexatonic (“magic” hexachord)')] }, { label: '1:5', cells: [t('半音 + 纯四度', '半音 + 完全 4 度', 'semitone + fourth')] }] },
      },
      {
        id: 'b62x-e6', type: 'discover', practice: true, ref: 'omt2e-collections',
        prompt: t('每个六声音集里有哪些三和弦？', '各六音音集合に含まれる三和音は？', 'Which triads does each hexatonic collection contain?'),
        options: [t('三个大三、三个小三、两个增三', '長三 3・短三 3・増三 2', 'Three major, three minor, two augmented'), t('八个大小三和弦', '長短三和音 8 つ', 'Eight major/minor triads'), t('只有两个三和弦', '三和音 2 つだけ', 'Only two triads')],
        answer: 0,
        insight: { title: t('两个增三和弦的合体', '2 つの増三和音の合体', 'Two augmented triads combined'), text: t('例如 C E G♯ 和 B D♯ G（相距半音）合起来就是一个六声音集。', 'たとえば C E G♯ と B D♯ G（半音離れ）を合わせると六音音集合。', 'E.g. C E G♯ and B D♯ G (a semitone apart) together form a hexatonic collection.') },
      },
      {
        id: 'b62x-e7', type: 'page', ref: 'omt2e-collections',
        title: t('进阶 4 · 为什么偏偏是这些音集', '発展 4・なぜほかならぬこれらの音集合なのか', 'Advanced 4 · Why these collections?'),
        text: [
          t('这些调式为什么一再出现在不同的场合？这个大问题吸引了许多理论关注，OMT 列出三个要点。一、对应自然泛音列：一种假说认为，人们喜欢重要的音和泛音列低处的音（即通常所说的协和音程：八度、五度等）对齐的调式——acoustic 音集是这个想法特别字面的实现。二、对称：这是二十世纪作曲家的核心关注之一，原因之一是想建立一种新的秩序，不植根于泛音列和"从低音往上"的根音低音和声；对称可以在音阶内部（如有限移位调式的旋转对称），也可以在音阶之间（如巴托克的《世俗康塔塔》）。', 'なぜこれらの旋法はさまざまな場面に繰り返し現れるのか？ この大きな問いは多くの理論的関心を集めてきた。OMT は 3 点を挙げる。1. 自然倍音列との対応：重要な音が倍音列の低い音（ふつう協和音程と呼ばれる 8 度・5 度など）と重なる旋法を人は好む、という仮説——アコースティック音集合はこの考えを特に文字どおりに実現したもの。2. 対称性：20 世紀の作曲家の中心的な関心の 1 つで、その理由の 1 つは、倍音列と「低音から上へ」の根音バスの和声に根ざさない新しい秩序を作りたいという願い。対称性は音階の内部（移調の限られた旋法の回転対称）にも、音階どうしの間（バルトーク《カンタータ・プロファーナ》）にもありうる。', 'Why do these modes keep cropping up? The question has attracted much theoretical attention; OMT highlights three ideas. Correspondence to the overtone series: one hypothesis is that people like modes whose important pitches align with low harmonics, conventionally called consonances (octaves, fifths) — the acoustic collection being a particularly literal implementation. Symmetry, a key 20th-century preoccupation, partly from a desire for a new order not rooted in the overtone series and bass-up fundamental-bass harmony; it can be internal to a scale (the rotational symmetry of modes of limited transposition) or between scales (Bartók’s Cantata Profana).'),
          t('三、最大均匀：一种重要的调式构造理论强调音在空间里平均分布（Clough 与 Douthett 1991 年的《Maximally Even Sets》）。再想想全音阶：它大多是全音，只有两个半音，而且两个半音离得尽可能远——这种最大化的间隔让全音阶的音"最大均匀"；Agmon（1990）甚至在一首斯卡拉蒂奏鸣曲里看到这种思想。', '3. 最大均等性：旋法の構成に関する有力な理論は、音が空間に均等に分布することを重視する（クラフとドゥーセットの 1991 年『Maximally Even Sets』）。全音階をもう一度考えよう：ほとんど全音で、半音は 2 つだけ、しかも 2 つの半音はできるだけ離れている——この最大化された間隔によって全音階の音は「最大均等」になる。アグモン（1990）はスカルラッティのソナタにさえこの考えを見ている。', 'Maximal evenness: a prominent theory of modal construction stresses even distribution of pitches (Clough and Douthett’s 1991 “Maximally Even Sets”). Consider the diatonic again: mostly whole tones, with only two semitones placed as far apart as possible — that maximised spacing makes it maximally even; Agmon (1990) even sees the idea in a Scarlatti sonata.'),
        ],
      },
      {
        id: 'b62x-e8', type: 'discover', practice: true, ref: 'omt2e-collections',
        prompt: t('全音阶为什么被说成"最大均匀"？', 'なぜ全音階は「最大均等」と言われる？', 'Why is the diatonic called maximally even?'),
        options: [t('两个半音离得尽可能远', '2 つの半音ができるだけ離れているから', 'Its two semitones are as far apart as possible'), t('它全是全音', 'すべて全音だから', 'It is all whole tones'), t('它有十二个音', '12 音あるから', 'It has twelve notes')],
        answer: 0,
        insight: { title: t('E–F 和 B–C', 'E–F と B–C', 'E–F and B–C'), text: t('C 大调的两个半音被三个和两个全音隔开，分得尽量开。', 'ハ長調の 2 つの半音は全音 3 つと 2 つで隔てられ、できるだけ離れている。', 'C major’s two semitones are separated by three and two whole tones, as far apart as possible.') },
      },
    ],
    experiment: [
      { id: 'b62x-x1', type: 'experiment', toy: 'collection', ref: ['omt2e-collections', 'wiki-messiaen-modes'],
        prompt: t('从六声音集开始，一个个点 T0–T11：哪些移位和 T0 完全一样？一共有几个不同的六声音集？再换成两种八声音集和梅西安第三种调式，比较它们各有几个不同的移位。', '六音音集合から始め、T0–T11 を 1 つずつ押そう：T0 とまったく同じになる移高は？ 異なる六音音集合はいくつ？ 次に 2 種の八音音集合とメシアン第 3 旋法に替え、異なる移高の数を比べよう。', 'Start with the hexatonic and tap T0–T11 one by one: which transpositions equal T0? How many distinct hexatonic collections are there? Then switch to the two octatonic orderings and Messiaen’s mode 3 and compare their numbers of distinct transpositions.'),
        params: { start: 'hexatonic' },
        breakthrough: { id: 'b62x-four', text: t('六声 4 个、八声 3 个、全音 2 个——对称越强，版本越少。', '六音 4、八音 3、全音 2——対称性が強いほど版は少ない。', 'Hexatonic 4, octatonic 3, whole-tone 2 — the more symmetric, the fewer versions.') } },
    ],
    challenge: [
      {
        id: 'b62x-c1', type: 'choice', error: 'collection', skills: ['identify'], ref: 'omt2e-collections',
        variants: [
          { prompt: t('OCT1,2 这个名字里的下标代表什么？', 'OCT1,2 の添字は何を表す？', 'What does the subscript in OCT1,2 denote?'), options: [t('这个八声音集独有的半音（C♯–D）', 'その八音音集合に固有の半音（C♯–D）', 'the half step unique to that collection (C♯–D)'), t('第一和第二个音', '1 番目と 2 番目の音', 'its first and second notes'), t('移位次数', '移高の回数', 'the number of transpositions')] },
          { prompt: t('WT1 往上移一个半音得到？', 'WT1 を半音上げると？', 'WT1 transposed up a half step gives…'), options: ['WT0', 'WT1', 'OCT0,1'] },
          { prompt: t('八声音集里没有哪种七和弦？', '八音音集合にない七の和音は？', 'Which seventh chord does the octatonic lack?'), options: [t('大七和弦', '長七', 'the major seventh'), t('属七和弦', '属七', 'the dominant seventh'), t('减七和弦', '減七', 'the diminished seventh')] },
        ],
        answer: 0,
        explain: t('下标是独有的半音；WT1 + 1 = WT0；八声里除大七外每种七和弦各四个。', '添字は固有の半音。WT1 + 1 = WT0。八音には長七以外の各七の和音が 4 つずつ。', 'The subscript names the unique half step; WT1 + 1 = WT0; the octatonic has four of every seventh type except the major seventh.'),
      },
      {
        id: 'b62x-c2', type: 'choice', error: 'collection', skills: ['identify'], ref: 'omt2e-collections',
        variants: [
          { prompt: t('距离模型 1:3 是哪个音集？', '距離モデル 1:3 はどの音集合？', 'Distance model 1:3 is which collection?'), options: [t('六声（"魔术"六音集）', '六音（「マジック」ヘクサコード）', 'the hexatonic (“magic” hexachord)'), t('八声', '八音', 'the octatonic'), t('全音', '全音', 'the whole-tone')] },
          { prompt: t('距离模型的组织方式和哪位作曲家关系密切？', '距離モデルの組織法と強く結び付く作曲家は？', 'The distance model is strongly associated with…'), options: [t('巴托克', 'バルトーク', 'Bartók'), t('肖邦', 'ショパン', 'Chopin'), t('威尔第', 'ヴェルディ', 'Verdi')] },
          { prompt: t('acoustic 音集来自哪里？', 'アコースティック音集合はどこから来た？', 'Where does the acoustic collection come from?'), options: [t('泛音列最低的几个音程', '倍音列の最も低い音程', 'the lowest intervals of the overtone series'), t('钢琴黑键', 'ピアノの黒鍵', 'the piano’s black keys'), t('两个增三和弦', '2 つの増三和音', 'two augmented triads')] },
        ],
        answer: 0,
        explain: t('1:3 是六声；距离模型与巴托克相关；acoustic 来自泛音列最低的音程。', '1:3 は六音。距離モデルはバルトークと結び付く。アコースティックは倍音列の低い音程から。', '1:3 is the hexatonic; the distance model is Bartók’s; the acoustic collection comes from the lowest overtone intervals.'),
      },
      {
        id: 'b62x-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: 'omt2e-collections',
        variants: [
          { prompt: t('既不是调性也不是调式、用全音阶却不让任何音当中心，叫？', '調性でも旋法でもなく、全音階を使いながらどの音も中心にしない書き方は？', 'Using the diatonic collection with no pitch sounding central — neither tonal nor modal — is called…'), options: [t('泛全音阶', '汎全音階', 'pandiatonic'), t('无调性', '無調', 'atonal'), t('复调性', '多調', 'polytonal')] },
          { prompt: t('哪位作曲家的《Silver Ladders》开头明显用了八声音集？', '《Silver Ladders》の冒頭ではっきり八音音集合を使う作曲家は？', 'Whose Silver Ladders opens audibly octatonic?'), options: [t('Joan Tower', 'ジョーン・タワー', 'Joan Tower'), t('陈怡', '陳怡', 'Chen Yi'), t('Lili Boulanger', 'リリ・ブーランジェ', 'Lili Boulanger')] },
          { prompt: t('哪个是"音阶之间"的对称的例子？', '「音階どうしの間」の対称性の例は？', 'Which is an example of symmetry between scales?'), options: [t('巴托克《世俗康塔塔》', 'バルトーク《カンタータ・プロファーナ》', 'Bartók’s Cantata Profana'), t('有限移位调式的旋转对称', '移調の限られた旋法の回転対称', 'the rotational symmetry of modes of limited transposition'), t('acoustic 音集', 'アコースティック音集合', 'the acoustic collection')] },
        ],
        answer: 0,
        explain: t('泛全音阶（如《彼得鲁什卡》开头）；Joan Tower《Silver Ladders》；音阶之间的对称以《世俗康塔塔》为例，音阶内部的对称是有限移位调式。', '汎全音階（《ペトルーシュカ》冒頭など）。ジョーン・タワー《Silver Ladders》。音階どうしの対称は《カンタータ・プロファーナ》、音階内部の対称は移調の限られた旋法。', 'Pandiatonic (as at the opening of Petrushka); Joan Tower’s Silver Ladders; symmetry between scales is the Cantata Profana, internal symmetry the modes of limited transposition.'),
      },
      {
        id: 'b62x-c4', type: 'choice', error: 'collection', skills: ['calc'], ref: 'omt2e-collections',
        variants: [
          { prompt: t('五声音集 C D E G A 有几种旋转（以各个音当中心）？', '五音音集合 C D E G A の回転（各音を中心に）はいくつ？', 'How many rotations (each note as centre) has the pentatonic C D E G A?'), options: ['5', '2', '12'] },
          { prompt: t('不同的六声音集一共有几个？', '異なる六音音集合はいくつ？', 'How many distinct hexatonic collections exist?'), options: ['4', '3', '2'] },
          { prompt: t('肖邦在《g 小调叙事曲》里在哪个和弦上用了八声音集？', 'ショパンは《バラード ト短調》でどの和音の上に八音音集合を使った？', 'Over which chord did Chopin use the octatonic in his G minor Ballade?'), options: ['B♭7', 'D7', 'Gm'] },
        ],
        answer: 0,
        explain: t('五声有五种旋转；六声只能移位四次就重复：4 个；肖邦在 B♭7 上用八声。', '五音は 5 通りの回転。六音は 4 回で繰り返す：4 つ。ショパンは B♭7 の上で八音。', 'Five pentatonic rotations; four distinct hexatonic collections; Chopin’s octatonic sits over B♭7.'),
      },
      G('b62x-g1', 'symmetricScale', 1, ['identify']),
      G('b62x-g2', 'tnIn', 1, ['calc']),
    ],
  },
  pool: [G('b62x-p1', 'symmetricScale', 2, ['identify']), G('b62x-p2', 'primeForm', 2, ['calc'])],
};

// ===================== B6-3x 集合级分析 · 扩展关 =====================
// 对应 A 面：setclass（找原型 / 音程级向量 / Forte 编号与集合类表 / 综合）
const EXT_B6_3 = {
  minutes: 22,
  insight: t('集合类把"听起来像一家人"的和弦归在一起：移位、倒影都算同一类，所以大三、小三和弦都是 (037)。原型是名字，向量是音响，Forte 编号是表里的位置——还有一些不同的集合类，向量却一模一样（Z 关系）。', '集合クラスは「家族のように聞こえる」和音をまとめる：移高も反転も同じクラスなので、長三和音も短三和音も (037)。プライム・フォームは名前、ベクトルは響き、フォルテ番号は表の位置——そしてベクトルがまったく同じなのに違う集合クラスもある（Z 関係）。', 'Set classes group chords that sound like family: transpositions and inversions count as one, so major and minor triads are both (037). Prime form is the name, the vector the sound, the Forte number the table position — and some different set classes share identical vectors (the Z-relation).'),
  sections: {
    discover: [
      {
        id: 'b63x-d1', type: 'discover', ref: ['wiki-set-classes', 'omt2e-prime-form'],
        prompt: t('G7（G B D F）和 Bø7（B D F A）是同一个集合类吗？', 'G7（G B D F）と Bø7（B D F A）は同じ集合クラス？', 'Are G7 (G B D F) and Bø7 (B D F A) the same set class?'),
        play: [{ label: 'G7', audio: { notes: [[55, 59, 62, 65]], mode: 'chords' } }, { label: 'Bø7', audio: { notes: [[59, 62, 65, 69]], mode: 'chords' } }],
        options: [t('是，都是 4-27 (0258)，互为倒影', 'そう。どちらも 4-27 (0258)、互いの反転', 'Yes — both 4-27 (0258), inversions of each other'), t('不是，一个是属七一个是半减七', '違う。属七と半減七', 'No — one is dominant, one half-diminished'), t('只有在 C 大调里是', 'ハ長調のときだけ', 'Only in C major')],
        answer: 0,
        insight: {
          title: t('移位和倒影都算一类', '移高も反転も同じクラス', 'Transposition and inversion both count'),
          text: t('Bø7 = {11, 2, 5, 9}，标准顺序 [9, 11, 2, 5]，移到 0 是 [0, 2, 5, 8]；G7 = [11, 2, 5, 7] → [0, 3, 6, 8]，倒影后正是 [0, 2, 5, 8]。维基的集合类表把 4-27A [0,2,5,8] 列为半减七、小六和弦、特里斯坦和弦，4-27B [0,3,6,8] 列为属七、德国六和弦、"泛音七和弦"。就像大三、小三和弦互为倒影、同属 (037)。', 'Bø7 = {11, 2, 5, 9}、正規順序 [9, 11, 2, 5]、0 に移して [0, 2, 5, 8]。G7 = [11, 2, 5, 7] → [0, 3, 6, 8]、反転するとまさに [0, 2, 5, 8]。ウィキペディアの集合クラス表は 4-27A [0,2,5,8] を半減七・短六・トリスタン和音、4-27B [0,3,6,8] を属七・ドイツの六・「倍音七」とする。長三和音と短三和音が互いの反転で同じ (037) なのと同じ。', 'Bø7 = {11, 2, 5, 9}, normal order [9, 11, 2, 5], transposed to 0: [0, 2, 5, 8]; G7 = [11, 2, 5, 7] → [0, 3, 6, 8], whose inversion is exactly [0, 2, 5, 8]. Wikipedia’s table lists 4-27A [0,2,5,8] as the half-diminished seventh, minor sixth and Tristan chord, 4-27B [0,3,6,8] as the dominant seventh, German sixth and harmonic seventh chord — just as major and minor triads are inversions within (037).'),
        },
      },
    ],
    explain: [
      {
        id: 'b63x-e1', type: 'page', ref: 'omt2e-prime-form',
        title: t('进阶 1 · 集合与集合类：花园与"类"', '発展 1・集合と集合クラス：庭と「綱」', 'Advanced 1 · Sets and set classes: a garden versus a “class”'),
        text: [
          t('集合类最简单的定义是"由移位或倒影联系起来的一组音级集合"。"class"就是"组"：音级是一组由八度和同音异名联系的音高，音程级是一组互为转位或差八度的音程。OMT 用生物学打比方：同一个"纲"的植物以特定的方式相关（被子植物纲是会开花的植物），而某人前院里的植物也是一组，却只是"集"、不是"纲"。音级集合是分析者出于某种理由放在一起的一组音；音级集合类（简称集合类）则是所有由移位或倒影相关的音级集合组成的"组的组"。', '集合クラスの最も簡単な定義は「移高か反転で関係づけられた音級集合のグループ」。「class」は「グループ」のこと：音級はオクターヴと異名同音で関係する音高のグループ、音程クラスは互いの転回やオクターヴ違いの音程のグループ。OMT は生物学にたとえる：同じ「綱」の植物は特定の仕方で関係する（被子植物綱は花を咲かせる植物）が、誰かの前庭の植物もグループではあっても「集合」で「綱」ではない。音級集合は分析者が何かの理由でまとめた音のグループ、音級集合クラス（略して集合クラス）は移高か反転で関係するすべての音級集合からなる「グループのグループ」。', 'The simplest definition of a set class is “a group of pitch-class sets related by transposition or inversion”. “Class” means “group”: a pitch class groups pitches related by octave and enharmonic equivalence; an interval class groups intervals related by inversion or octaves. OMT’s biology analogy: plants in one class are related in a specific way (Angiospermae produce flowers), while the plants in someone’s front yard form a set, not a class. A pitch-class set is a group the analyst chooses for some reason; a pitch-class set class — set class for short — is the group of groups related by transposition or inversion.'),
          t('为什么是移位和倒影？因为分析大量二十世纪以来的音乐，就是研究音级集合之间的移位和倒影关系。巴托克《主题与倒影》的两段里，右手的两组 [10, 0, 2, 3, 5] 和 [3, 5, 7, 8, 10] 是 T5 关系，左手两组也一样；而在每一段里，左右手又以倒影相关——它们听起来都一样，可以说都属于同一个集合类。大小三和弦就是熟悉的例子：同性质的三和弦互为移位（C 大三 [0, 4, 7] 的 T2 是 D 大三 [2, 6, 9]），相反性质的互为倒影（C 大三的 I0 是 F 小三 [5, 8, 0]，I2 是 G 小三 [7, 10, 2]）。', 'なぜ移高と反転なのか？ 20 世紀以降の多くの音楽の分析は、音級集合どうしの移高と反転の関係を調べることだから。バルトーク《主題と反行》の 2 つの部分では、右手の 2 組 [10, 0, 2, 3, 5] と [3, 5, 7, 8, 10] が T5 の関係で、左手も同じ。各部分の中では左右の手が反転で関係する——すべて同じに聞こえ、同じ集合クラスに属すると言える。長短三和音がなじみの例：同じ性質の三和音は互いの移高（C 長三 [0, 4, 7] の T2 は D 長三 [2, 6, 9]）、反対の性質は互いの反転（C 長三の I0 は F 短三 [5, 8, 0]、I2 は G 短三 [7, 10, 2]）。', 'Why transposition and inversion? Because much post-tonal analysis studies exactly those relations between pc sets. In Bartók’s “Subject and Reflection” the right-hand sets [10, 0, 2, 3, 5] and [3, 5, 7, 8, 10] are related by T5, as are the left-hand sets, and within each passage the hands are related by inversion — all sounding alike, all members of one set class. Triads are the familiar case: same-quality triads are transpositions (T2 of C major [0, 4, 7] is D major [2, 6, 9]), opposite qualities inversions (I0 of C major is F minor [5, 8, 0], I2 is G minor [7, 10, 2]).'),
        ],
      },
      {
        id: 'b63x-e2', type: 'discover', practice: true, ref: 'omt2e-prime-form',
        prompt: t('C 大三和弦 [0, 4, 7] 的 I2 是？', 'C 長三和音 [0, 4, 7] の I2 は？', 'I2 of the C major triad [0, 4, 7] is…'),
        options: [t('G 小三 [7, 10, 2]', 'G 短三 [7, 10, 2]', 'G minor [7, 10, 2]'), t('D 大三 [2, 6, 9]', 'D 長三 [2, 6, 9]', 'D major [2, 6, 9]'), t('F 小三 [5, 8, 0]', 'F 短三 [5, 8, 0]', 'F minor [5, 8, 0]')],
        answer: 0,
        insight: { title: t('2 减每个音', '2 から各音を引く', 'Subtract each from 2'), text: t('2 − 0 = 2，2 − 4 = 10，2 − 7 = 7：{2, 10, 7} = G B♭ D。D 大三是 T2，F 小三是 I0。', '2 − 0 = 2、2 − 4 = 10、2 − 7 = 7：{2, 10, 7} = G B♭ D。D 長三は T2、F 短三は I0。', '2 − 0 = 2, 2 − 4 = 10, 2 − 7 = 7: {2, 10, 7} = G B♭ D. D major is T2, F minor I0.') },
      },
      {
        id: 'b63x-e3', type: 'page', ref: ['omt2e-prime-form', 'wiki-set-classes'],
        title: t('进阶 2 · 原型的算法；Forte 与 Rahn 的两种写法', '発展 2・プライム・フォームの計算；フォルテとラーンの 2 つの書き方', 'Advanced 2 · Computing prime form; Forte’s and Rahn’s versions'),
        text: [
          t('音级集合用标准顺序命名，集合类用原型命名：移到 0、并且（和它的倒影比）往左最紧凑的那个版本，写在圆括号里、不加逗号。OMT 用巴托克那个动机示范五步：一、标准顺序 [10, 0, 2, 3, 5]；二、移到 0：T2 = [0, 2, 4, 5, 7]；三、倒影后排成标准顺序：I0 = [5, 7, 8, 10, 0]；四、再移到 0：T7 = [0, 2, 3, 5, 7]；五、比较第二步和第四步，往左更紧凑的是原型：(02357)。原型只是集合类的标签，没有特殊地位——作曲家用了 [0, 1, 4]，并不因为它和原型 (014) 数字相同就有什么意义。', '音級集合は正規順序で、集合クラスはプライム・フォームで名付ける：0 に移し、（反転と比べて）左に最も詰まった版を、丸括弧にコンマなしで書く。OMT はバルトークの動機で 5 段階を示す：1. 正規順序 [10, 0, 2, 3, 5]。2. 0 に移す：T2 = [0, 2, 4, 5, 7]。3. 反転して正規順序に：I0 = [5, 7, 8, 10, 0]。4. また 0 に移す：T7 = [0, 2, 3, 5, 7]。5. 2 と 4 を比べ、左に詰まったほうがプライム・フォーム：(02357)。プライム・フォームは集合クラスのラベルにすぎず特別な地位はない——作曲家が [0, 1, 4] を使っても、プライム・フォーム (014) と同じ数字だから意味があるわけではない。', 'Pc sets are named by normal order, set classes by prime form: transposed to zero and most compact to the left (compared with its inversion), written in parentheses without commas. OMT’s five steps with the Bartók motive: (1) normal order [10, 0, 2, 3, 5]; (2) transpose to 0: T2 = [0, 2, 4, 5, 7]; (3) invert and put in normal order: I0 = [5, 7, 8, 10, 0]; (4) transpose to 0: T7 = [0, 2, 3, 5, 7]; (5) the one more compact to the left is the prime form: (02357). A prime form is just a label with no special status — a composer’s [0, 1, 4] means nothing extra for matching (014).'),
          t('得到原型有两种略有不同的方法：较早的 Allen Forte 法和后来、现在更流行的 John Rahn 法，常常都被含糊地说成"往左最紧凑"。更精确地说，Rahn 选"从右边看最分散"的版本，Forte 选"在最小跨度内往左最紧凑"的版本；在 352 个集合类里，有 17 个两种方法结果不同，维基的表用 Rahn 写法、在脚注里列出 Forte 写法。集合类表还按补集配对（和原集合一起凑满十二个音的集合），不对称的集合把原型标 A、倒影标 B。在 Forte 之前（1960–67），Elliott Carter 就为自己整理过一份编号的音级集合（他叫"和弦"）表；Donald Martino 1961 年的文章列出了组合性用的六音、四音、三音、五音集合表；Howard Hanson 1960 年的《现代音乐的和声材料》更早于集合论术语。', 'プライム・フォームを得る方法は 2 つあって少し違う：早いアレン・フォルテ法と、のちの、今はより一般的なジョン・ラーン法。どちらもあいまいに「左に最も詰まった」と言われがち。正確には、ラーンは「右から見て最も散らばった」版を、フォルテは「最小の幅の中で左に最も詰まった」版を選ぶ。352 の集合クラスのうち 17 で結果が違い、ウィキペディアの表はラーン式で、フォルテ式を脚注に載せる。表は補集合（元の集合と合わせて 12 音になる集合）でも組にし、非対称な集合はプライム・フォームを A、反転を B とする。フォルテ以前（1960–67）にエリオット・カーターは自分用に番号付きの音級集合（彼は「和音」と呼んだ）の表を作っていた。ドナルド・マルティーノは 1961 年の論文で組合せ性のための 6 音・4 音・3 音・5 音の表を示し、ハワード・ハンソンの 1960 年『現代音楽の和声素材』は集合論の用語に先立つ。', 'There are two slightly different methods: Allen Forte’s earlier one and John Rahn’s later, now more popular one, both loosely called “most packed to the left”. Precisely, Rahn picks the version most dispersed from the right, Forte the version most packed to the left within the smallest span; for 17 of the 352 set classes they differ, and Wikipedia’s table uses Rahn’s, footnoting Forte’s. Tables also pair sets with their complements (which complete the twelve-tone collection), marking asymmetric sets’ prime forms A and inversions B. Before Forte (1960–67), Elliott Carter had made his own numbered list of pc sets, “chords” as he called them; Donald Martino tabled hexachords, tetrachords, trichords and pentachords for combinatoriality in 1961; and Howard Hanson’s Harmonic Materials of Modern Music (1960) predates set-theoretic terminology.'),
        ],
      },
      {
        id: 'b63x-e4', type: 'discover', practice: true, ref: 'omt2e-prime-form',
        prompt: t('标准顺序 [1, 2, 5] 的原型是？（移到 0 是 [0, 1, 4]；倒影排成标准顺序再移到 0 是 [0, 3, 4]）', '正規順序 [1, 2, 5] のプライム・フォームは？（0 に移すと [0, 1, 4]、反転を正規順序にして 0 に移すと [0, 3, 4]）', 'The prime form of [1, 2, 5]? (transposed to 0: [0, 1, 4]; inverted, normal order, to 0: [0, 3, 4])'),
        options: ['(014)', '(034)', '(125)'],
        answer: 0,
        insight: { title: t('往左更紧凑', '左により詰まった', 'More packed to the left'), text: t('[0, 1, 4] 的第二个数 1 比 [0, 3, 4] 的 3 小，更靠左：(014)。', '[0, 1, 4] の 2 番目の 1 は [0, 3, 4] の 3 より小さく、左に詰まる：(014)。', '[0, 1, 4] has 1 where [0, 3, 4] has 3, more packed left: (014).') },
      },
      {
        id: 'b63x-e5', type: 'page', ref: ['omt2e-ic-vector', 'wiki-set-classes'],
        title: t('进阶 3 · 音程级向量与 Z 关系', '発展 3・音程クラス・ベクトルと Z 関係', 'Advanced 3 · Interval-class vectors and the Z-relation'),
        text: [
          t('集合类的整体音响部分由音级之间的音程决定。音程级向量把集合里每种音程级各有几个数出来，写成尖括号里的六位数：第一位是音程级 1 的个数，第二位是 2……C 大三和弦是 <001110>。要数集合里每一对音的音程级，而不只是相邻的：例如 E4、F♯4、C5、A5 的标准顺序是 [4, 6, 9, 0]，从最左的 4 开始和右边每个音比，再从 6 开始……最后得到 <012111>。三音集合一共 3 个音程级（各位相加为 3），四音集合 6 个，五音集合 10 个——可以用来检查。尖括号把向量和标准顺序（方括号）、原型（圆括号）区分开。', '集合クラスの全体の響きは、ある程度は音級間の音程で決まる。音程クラス・ベクトルは集合の中の各音程クラスの数を数え、山括弧の 6 桁で書く：1 桁目は音程クラス 1 の数、2 桁目は 2……C 長三和音は <001110>。隣り合う音だけでなく、すべての 2 音の組の音程クラスを数える：たとえば E4・F♯4・C5・A5 の正規順序は [4, 6, 9, 0]、左端の 4 と右のすべての音を比べ、次に 6 から……最後に <012111>。3 音の集合は音程クラスが全部で 3（桁の合計が 3）、4 音は 6、5 音は 10——検算に使える。山括弧はベクトルを正規順序（角括弧）やプライム・フォーム（丸括弧）と区別する。', 'A set class’s overall sound is partly characterised by its intervals. The interval-class vector tallies each interval class in the set as six digits in angle brackets — the first counting IC 1s, the second IC 2s… — the C major triad being <001110>. Count every pair, not just neighbours: E4, F♯4, C5, A5 in normal order [4, 6, 9, 0], comparing 4 with everything to its right, then 6, and so on, gives <012111>. Trichords total 3, tetrachords 6, pentachords 10 — a handy check. Angle brackets distinguish vectors from normal order (square) and prime form (parentheses).'),
          t('维基的表按向量当作整数从大到小排序（这也是 Forte 编号的策略）。标"Z"的是一对不同的集合类：音程级内容完全相同，却不是倒影关系——"Z"来自古希腊语的 zygo-（"轭"）。例如两个"全音程四音集合" 4-Z15 [0,1,4,6] 和 4-Z29 [0,1,3,7]，向量都是 <111111>，每种音程级各一个；前者最小跨度 6 个半音，后者 7 个。表里还给很多集合起了熟悉的名字：3-5 [0,1,6] 叫"维也纳三音和弦"，6-20 是六声音集（"拿破仑颂"六音和弦），6-35 是全音音阶，6-30 是"彼得鲁什卡和弦"，6-34 是神秘和弦。', 'ウィキペディアの表はベクトルを整数と見て大きい順に並べる（これがフォルテ番号の方針でもある）。「Z」の付いたものは異なる集合クラスの対で、音程クラスの内容がまったく同じなのに反転の関係ではない——「Z」は古代ギリシャ語の zygo-（「くびき」）から。たとえば 2 つの「全音程テトラコード」4-Z15 [0,1,4,6] と 4-Z29 [0,1,3,7] はどちらもベクトル <111111>、各音程クラスが 1 つずつ。前者の最小の幅は 6 半音、後者は 7。表は多くの集合になじみの名前も付ける：3-5 [0,1,6] は「ウィーン三和音」、6-20 は六音音集合（「ナポレオンへの頌歌」ヘクサコード）、6-35 は全音音階、6-30 は「ペトルーシュカ和音」、6-34 は神秘和音。', 'Wikipedia orders sets by their vector read as an integer, decreasing — Forte’s strategy for his numbering. Sets marked Z are pairs of different set classes with identical interval-class content, unrelated by inversion — “Z” from the Greek zygo-, “yoke”. The two all-interval tetrachords 4-Z15 [0,1,4,6] and 4-Z29 [0,1,3,7] both have <111111>, one of each interval class; the first spans 6 semitones at minimum, the second 7. The table also names many sets: 3-5 [0,1,6] the Viennese trichord, 6-20 the hexatonic (“Ode-to-Napoleon” hexachord), 6-35 the whole-tone scale, 6-30 the Petrushka chord, 6-34 the mystic chord.'),
        ],
      },
      {
        id: 'b63x-e6', type: 'discover', practice: true, ref: 'omt2e-ic-vector',
        prompt: t('C 小三和弦 [0, 3, 7] 的音程级向量是？', 'C 短三和音 [0, 3, 7] の音程クラス・ベクトルは？', 'The interval-class vector of the C minor triad [0, 3, 7] is…'),
        options: ['<001110>', '<010101>', '<002100>'],
        answer: 0,
        insight: { title: t('和大三和弦一样', '長三和音と同じ', 'Same as the major triad'), text: t('0–3 是 3，3–7 是 4，0–7 是 5（短边）：各一个，和大三和弦一样——它们是同一个集合类。', '0–3 は 3、3–7 は 4、0–7 は 5（短い側）：1 つずつで長三和音と同じ——同じ集合クラスだから。', '0–3 = 3, 3–7 = 4, 0–7 = 5 (short way): one each, as for major — they are one set class.') },
      },
    ],
    experiment: [
      { id: 'b63x-x1', type: 'experiment', toy: 'set', ref: ['wiki-set-classes', 'omt2e-ic-vector', 'omt2e-prime-form'],
        prompt: t('钟面上已经选好了全音程四音集合 4-Z15 [0, 1, 4, 6]：看它的向量是不是 <111111>。再换成 [0, 1, 3, 7]（4-Z29）：向量一样吗？原型、Forte 编号呢？最后试 [0, 4, 7] 和 [0, 3, 7]，看大小三和弦为什么是同一个原型。', '時計にはすでに全音程テトラコード 4-Z15 [0, 1, 4, 6] が選んである：ベクトルは <111111>？ 次に [0, 1, 3, 7]（4-Z29）に替えよう：ベクトルは同じ？ プライム・フォームとフォルテ番号は？ 最後に [0, 4, 7] と [0, 3, 7] で、長短三和音がなぜ同じプライム・フォームなのか見よう。', 'The clock already holds the all-interval tetrachord 4-Z15 [0, 1, 4, 6]: is its vector <111111>? Switch to [0, 1, 3, 7] (4-Z29): same vector? Prime form and Forte number? Finally try [0, 4, 7] and [0, 3, 7] to see why major and minor triads share a prime form.'),
        params: { start: [0, 1, 4, 6] },
        breakthrough: { id: 'b63x-z', text: t('你找到了一对 Z 关系：同样的音程，不同的集合类。', 'Z 関係の対を見つけた：同じ音程、違う集合クラス。', 'You found a Z-pair: same intervals, different set classes.') } },
    ],
    challenge: [
      {
        id: 'b63x-c1', type: 'choice', error: 'prime-form', skills: ['calc'], ref: 'omt2e-prime-form',
        variants: [
          { prompt: t('[10, 0, 2, 3, 5] 的原型是？', '[10, 0, 2, 3, 5] のプライム・フォームは？', 'The prime form of [10, 0, 2, 3, 5] is…'), options: ['(02357)', '(02457)', '(01357)'] },
          { prompt: t('[10, 0, 2, 3, 5] 和 [3, 5, 7, 8, 10] 是什么关系？', '[10, 0, 2, 3, 5] と [3, 5, 7, 8, 10] の関係は？', 'How are [10, 0, 2, 3, 5] and [3, 5, 7, 8, 10] related?'), options: ['T5', 'T7', 'I1'] },
          { prompt: t('Rahn 选原型的标准更精确地说是？', 'ラーンのプライム・フォームの基準を正確に言うと？', 'Rahn’s criterion, stated precisely, is…'), options: [t('从右边看最分散', '右から見て最も散らばった', 'most dispersed from the right'), t('在最小跨度内往左最紧凑', '最小の幅の中で左に最も詰まった', 'most packed left within the smallest span'), t('数字和最小', '数字の合計が最小', 'smallest digit sum')] },
        ],
        answer: 0,
        explain: t('五步得 (02357)；两组相差 5：T5；Rahn = 从右最分散，Forte = 最小跨度内往左最紧凑。', '5 段階で (02357)。差は 5：T5。ラーン = 右から最も散らばる、フォルテ = 最小の幅で左に最も詰まる。', 'Five steps give (02357); they differ by 5: T5; Rahn = most dispersed from the right, Forte = most packed left within the smallest span.'),
      },
      {
        id: 'b63x-c2', type: 'choice', error: 'interval-vector', skills: ['calc'], ref: 'omt2e-ic-vector',
        variants: [
          { prompt: t('[4, 6, 9, 0] 的音程级向量是？', '[4, 6, 9, 0] の音程クラス・ベクトルは？', 'The interval-class vector of [4, 6, 9, 0] is…'), options: ['<012111>', '<111111>', '<021111>'] },
          { prompt: t('五音集合的音程级向量各位加起来是多少？', '5 音集合の音程クラス・ベクトルの桁の合計は？', 'A pentachord’s vector digits sum to…'), options: ['10', '5', '6'] },
          { prompt: t('增三和弦 (048) 的音程级向量是？', '増三和音 (048) の音程クラス・ベクトルは？', 'The vector of the augmented triad (048) is…'), options: ['<000300>', '<000030>', '<003000>'] },
        ],
        answer: 0,
        explain: t('[4, 6, 9, 0] 各对：2、5、4、3、6、3 → <012111>；五音集合 10 对；(048) 三个音程级 4 → <000300>。', '[4, 6, 9, 0] の各組：2・5・4・3・6・3 → <012111>。5 音集合は 10 組。(048) は音程クラス 4 が 3 つ → <000300>。', '[4, 6, 9, 0] pairs: 2, 5, 4, 3, 6, 3 → <012111>; a pentachord has 10 pairs; (048) has three IC 4s → <000300>.'),
      },
      {
        id: 'b63x-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: 'wiki-set-classes',
        variants: [
          { prompt: t('集合类表里的"Z"代表什么？', '集合クラス表の「Z」は何を表す？', 'What does “Z” mark in a set-class table?'), options: [t('音程级内容相同、却不是倒影关系的一对集合类', '音程クラスの内容が同じなのに反転関係でない集合クラスの対', 'a pair of set classes with identical interval content, unrelated by inversion'), t('全音音阶', '全音音階', 'the whole-tone scale'), t('对称的集合', '対称な集合', 'a symmetric set')] },
          { prompt: t('两种原型写法在多少个集合类上结果不同？', '2 つのプライム・フォームの書き方で結果が違う集合クラスはいくつ？', 'For how many set classes do the two prime-form methods differ?'), options: [t('352 个里的 17 个', '352 のうち 17', '17 of 352'), t('全部', 'すべて', 'all of them'), t('一个也没有', '1 つもない', 'none')] },
          { prompt: t('在 Forte 之前为自己整理过编号和弦表的作曲家是？', 'フォルテ以前に自分用の番号付き和音表を作った作曲家は？', 'Which composer kept his own numbered list of chords before Forte?'), options: [t('Elliott Carter', 'エリオット・カーター', 'Elliott Carter'), t('Arnold Schoenberg', 'アルノルト・シェーンベルク', 'Arnold Schoenberg'), t('Olivier Messiaen', 'オリヴィエ・メシアン', 'Olivier Messiaen')] },
        ],
        answer: 0,
        explain: t('Z 关系：同音程内容、非倒影；17/352 个结果不同；Carter 早在 1960–67 年之前就有自己的表。', 'Z 関係：同じ音程内容で反転でない。17/352 で結果が違う。カーターは 1960–67 年以前に自分の表を持っていた。', 'Z: same interval content, not inversions; 17 of 352 differ; Carter kept his own list before 1960–67.'),
      },
      {
        id: 'b63x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: 'wiki-set-classes',
        variants: [
          { prompt: t('"维也纳三音和弦"是哪个集合类？', '「ウィーン三和音」はどの集合クラス？', 'Which set class is the Viennese trichord?'), options: ['3-5 (016)', '3-11 (037)', '3-12 (048)'] },
          { prompt: t('6-20 [0,1,4,5,8,9] 在维基的表里被称作？', '6-20 [0,1,4,5,8,9] はウィキペディアの表で何と呼ばれる？', 'Wikipedia names 6-20 [0,1,4,5,8,9] the…'), options: [t('六声音集（"拿破仑颂"六音和弦）', '六音音集合（「ナポレオンへの頌歌」ヘクサコード）', 'hexatonic (“Ode-to-Napoleon” hexachord)'), t('彼得鲁什卡和弦', 'ペトルーシュカ和音', 'Petrushka chord'), t('神秘和弦', '神秘和音', 'mystic chord')] },
          { prompt: t('哪两个是"全音程四音集合"？', '「全音程テトラコード」の 2 つは？', 'Which two are the all-interval tetrachords?'), options: ['4-Z15, 4-Z29', '4-27, 4-28', '4-1, 4-2'] },
        ],
        answer: 0,
        explain: t('维也纳三音和弦 3-5 (016)；6-20 是六声音集；全音程四音集合是 4-Z15 与 4-Z29（向量都是 <111111>）。', 'ウィーン三和音は 3-5 (016)。6-20 は六音音集合。全音程テトラコードは 4-Z15 と 4-Z29（どちらも <111111>）。', 'The Viennese trichord is 3-5 (016); 6-20 is the hexatonic; the all-interval tetrachords are 4-Z15 and 4-Z29 (both <111111>).'),
      },
      G('b63x-g1', 'primeForm', 1, ['calc']),
      G('b63x-g2', 'icVector', 1, ['calc']),
    ],
  },
  pool: [G('b63x-p1', 'primeForm', 2, ['calc']), G('b63x-p2', 'icVector', 2, ['calc'])],
};

// ===================== B6-4x 十二音矩阵与音列分析 · 扩展关 =====================
// 对应 A 面：twelvetone（逆行与倒影 / 固定零与可动零 / 十二音音乐的背景 / 综合）
const LUTYENS_D = [2, 1, 5, 9, 10, 6, 4, 8, 7, 3, 11, 0];
const EXT_B6_4 = {
  minutes: 22,
  insight: t('十二音技法给出一个序列和四种变形，可作曲家用它的方式千差万别：有人严格、有人松动，也有人只借用序列手法写调式音乐。分析时最容易出错的不是变形本身，而是命名习惯——先弄清 P0 从哪里开始。', '十二音技法は 1 つの音列と 4 つの変形を与えるが、作曲家の使い方はさまざま：厳格な人も緩やかな人も、音列の手法だけを借りて旋法的な音楽を書く人もいる。分析で最も間違えやすいのは変形そのものでなく命名の慣習——まず P0 がどこから始まるかを確かめる。', 'Twelve-tone technique offers a row and four operations, but composers use them in wildly different ways — strictly, loosely, or borrowing serial devices for modal music. In analysis the commonest pitfall is not the operations but the naming conventions: first establish where P0 begins.'),
  sections: {
    discover: [
      {
        id: 'b64x-d1', type: 'discover', ref: 'omt2e-twelve-tone',
        prompt: t('John Tavener《The Lamb》：女高音唱 G–B–A–F♯–G，女中音同时唱 G–E♭–F–A♭–G。女中音这条和女高音是什么关系？这首曲子是十二音音乐吗？', 'ジョン・タヴナー《The Lamb》：ソプラノが G–B–A–F♯–G、アルトが同時に G–E♭–F–A♭–G。アルトはソプラノとどんな関係？ この曲は十二音音楽？', 'In John Tavener’s “The Lamb” the sopranos sing G–B–A–F♯–G while the altos sing G–E♭–F–A♭–G. How is the alto line related, and is the piece twelve-tone?'),
        play: [{ label: t('女高音', 'ソプラノ', 'Soprano'), audio: { notes: [67, 71, 69, 66, 67], mode: 'melody' } }, { label: t('女中音', 'アルト', 'Alto'), audio: { notes: [67, 63, 65, 68, 67], mode: 'melody' } }],
        options: [t('是倒影；它用了严格的序列手法，但不是十二音音乐', '反転。厳格な音列の手法を使うが十二音音楽ではない', 'It is the inversion; strict serial technique, but not twelve-tone'), t('是逆行；这是十二音音乐', '逆行。十二音音楽', 'It is the retrograde; the piece is twelve-tone'), t('没有关系', '関係はない', 'They are unrelated')],
        answer: 0,
        insight: {
          title: t('序列的，但不是十二音的', '音列的だが十二音ではない', 'Serial, but not twelve-tone'),
          text: t('B 往上大三度，女中音就往下大三度到 E♭……每个音程方向反过来：倒影。接下来女高音唱一条更长的旋律，后半是前半的严格逆行；再来一遍时女中音唱倒影再唱逆行倒影。这显然是很"序列"的写法，但这一段有很清楚的调式终止音 G，两个声部也都能用调式来理解。"序列主义"泛指把音乐元素（音高、时值、力度……）排成某种次序，不是所有序列作品都用十二音序列。', 'B へ長 3 度上がれば、アルトは長 3 度下がって E♭ へ……各音程の向きが逆：反転。続いてソプラノはもっと長い旋律を歌い、後半は前半の厳格な逆行。繰り返しではアルトが反転、次に逆行反転を歌う。明らかにとても「音列的」な書き方だが、この部分には G というはっきりした旋法の終止音があり、2 声部とも旋法で理解できる。「セリアリズム」は音楽要素（音高・音価・強弱……）をある順序に並べること全般を指し、音列作品がすべて十二音列を使うわけではない。', 'Up a major third to B, the altos go down a major third to E♭… every interval reversed: the inversion. The sopranos then sing a longer tune whose second half strictly retrogrades the first; on its repeat the altos sing the inversion, then the retrograde inversion. Clearly very serial writing — yet the passage has a clear modal final on G, and both parts fit standard modes. “Serialism” broadly means putting musical elements (pitches, durations, dynamics…) in some order; not every serial piece uses a twelve-tone row.'),
        },
      },
    ],
    explain: [
      {
        id: 'b64x-e1', type: 'page', ref: 'omt2e-twelve-tone',
        title: t('进阶 1 · 序列主义、十二音与四种操作', '発展 1・セリアリズム、十二音、4 つの操作', 'Advanced 1 · Serialism, twelve-tone and the four operations'),
        text: [
          t('十二音作曲大致平均地使用全部十二个音级，所以（通常）不宜去找调、调式或主音。它常和"第二维也纳乐派"——勋伯格、韦伯恩、贝尔格——联系在一起，但影响了许多作曲家，今天仍有人写。十二音音乐基于一个按特定次序包含全部十二个音级的序列；每首作品的次序都不同——可选的序列有 479,001,600 个！有些因为性质受欢迎被许多作品用过，大多数从没被用过。', '十二音作曲は 12 の音級をおおむね均等に使うので、（ふつう）調・旋法・主音を探すのは適切でない。シェーンベルク・ウェーベルン・ベルクの「新ウィーン楽派」と結び付けられることが多いが、多くの作曲家に影響し、今も書かれている。十二音音楽は 12 の音級すべてを特定の順に含む音列に基づく。順序は作品ごとに違う——選べる音列は 479,001,600 通り！ 性質が好まれて多くの作品に使われたものもあれば、一度も使われていないものがほとんど。', 'Twelve-tone composition uses all twelve pitch classes roughly equally, so it usually isn’t appropriate to look for a key, mode or tonic. It is associated with the “Second Viennese School” — Schoenberg, Webern, Berg — but influenced many composers and is still written today. It rests on a row containing all twelve pcs in a particular order, different in each piece — there are 479,001,600 to choose from! Some, with favoured properties, recur in several works; most have never been used.'),
          t('四种主要操作不会从根本上改变序列：移位 T（只按半音、不按调内级数）；倒影 I（每个音程方向反过来，保持半音数，不用调内倒影）；逆行 R（把音高次序倒过来——调性音乐里的先例是"蟹行"卡农，但比移位、倒影少见得多）；逆行倒影 RI（两者结合，先后次序会影响结果）。能用这些操作互相转换的序列是同一个序列的不同形式；除非序列有某些能映射到自身的性质，否则一共有 48 种形式：P、I、R、RI 各在十二个音级上开始，合称一个"序列类"。', '4 つの主な操作は音列を根本的には変えない：移高 T（半音単位のみ、調内の度数ではない）、反転 I（各音程の向きを逆に、半音数を保つ。調内の反転は使わない）、逆行 R（音高の順を逆に——調性音楽での先例は「蟹行」カノンだが、移高や反転よりずっとまれ）、逆行反転 RI（2 つを組み合わせる。順序で結果が変わる）。これらで互いに移り合う音列は同じ音列の形。音列が自分に重なる性質を持たない限り、全部で 48 の形がある：P・I・R・RI がそれぞれ 12 の音級から始まり、まとめて「音列クラス」という。', 'Four main operations move a row without fundamentally changing it: transposition T (by semitones only, never diatonic steps); inversion I (reversing interval directions, preserving semitone sizes — no diatonic inversion); retrograde R (reversing the order — precedented in the “crab” canon, though far rarer in tonal music than T and I); retrograde inversion RI (combining both; the order of operations matters). Rows related by these are forms of one row; unless a row maps onto itself, there are 48 forms — P, I, R and RI each starting on all twelve pcs — making a row class.'),
        ],
      },
      {
        id: 'b64x-e2', type: 'discover', practice: true, ref: 'omt2e-twelve-tone',
        prompt: t('一般的十二音序列一共有多少种形式？', '一般的な十二音列の形は全部でいくつ？', 'How many forms does a typical twelve-tone row have?'),
        options: ['48', '12', '4', '479,001,600'],
        answer: 0,
        insight: { title: t('4 × 12', '4 × 12', '4 × 12'), text: t('P、I、R、RI 四种，各有十二个起点；479,001,600 是可能的序列总数。', 'P・I・R・RI の 4 種がそれぞれ 12 の始まり。479,001,600 は可能な音列の総数。', 'Four types (P, I, R, RI), each on twelve starting pcs; 479,001,600 is the number of possible rows.') },
      },
      {
        id: 'b64x-e3', type: 'page', ref: 'omt2e-twelve-tone',
        title: t('进阶 2 · 怎么给序列形式标下标；矩阵的读法', '発展 2・音列の形の添字の付け方；マトリクスの読み方', 'Advanced 2 · Subscripting row forms; reading the matrix'),
        text: [
          t('原型 P 是其他形式所关联的主要形式：通常选作品开头最突出的那个；几个同样突出时随便选一个（掷硬币！）。OMT 的做法是按起始音级编号：从 G（7）开始是 P7，从 B（11）开始是 P11。逆行 R 用"最后一个音级"作下标——这样互为逆行的两个形式下标相同：倒着的、以 F♯（6）结尾的是 R6。倒影 I 按第一个音级编号：从 E♭（3）开始是 I3；注意这个名字不一定等于产生它的倒影操作的下标，只有从 P0 出发时两者才一样。逆行倒影 RI 和 I 的关系就像 R 和 P，按最后一个音级命名。', '原形 P はほかの形が関係づけられる主な形：ふつう作品冒頭で最も目立つものを選ぶ。同じくらい目立つものがいくつかあれば適当に選ぶ（コインを投げて！）。OMT は開始音級で番号を付ける：G（7）から始まれば P7、B（11）からなら P11。逆行 R は「最後の音級」を添字にする——互いに逆行する 2 つの形が同じ添字になるように。逆向きで F♯（6）で終わるものは R6。反転 I は最初の音級で番号を付ける：E♭（3）から始まれば I3。この名前は、それを生む反転操作の添字と同じとは限らず、P0 から始めたときだけ一致するので注意。逆行反転 RI と I の関係は R と P と同じで、最後の音級で名付ける。', 'The prime P is the main reference form, usually the most salient at the opening; if several are equally prominent, just choose one (flip a coin!). OMT numbers rows by their starting pc: starting on G (7) is P7, on B (11) P11. Retrogrades take the last pc as subscript, so exact retrogrades share a subscript: a reversed form ending on F♯ (6) is R6. Inversions are labelled by their first pc: starting on E♭ (3) is I3 — not necessarily the subscript of the inversion operation producing it, which matches only when starting from P0. RI relates to I as R to P, named by its last pc.'),
          t('矩阵把一个序列类的 48 种形式排在一张 12 × 12 的表里：P 在最上面一行从左往右读，R 是同一行从右往左读；I 从同一个音开始，沿第一列从上往下读，RI 沿同一列从下往上读。以 Elisabeth Lutyens 的《Motet》（Excerpta Tractati Logico-Philosophici），Op. 27 为例，P0 = 0–11–3–7–8–4–2–6–5–1–9–10，第一列（I0）是 0–1–9–5–4–8–10–6–7–11–3–2。十二音技法的基本"规则"是：音级按序列的次序出现；一个音级奏过之后，要到下一个序列才再出现。', 'マトリクスは音列クラスの 48 の形を 12 × 12 の表に並べる：P は最上段を左から右へ、R は同じ段を右から左へ読む。I は同じ音から始めて第 1 列を上から下へ、RI は同じ列を下から上へ読む。エリザベス・ラッチェンス《Motet》（Excerpta Tractati Logico-Philosophici）Op. 27 では P0 = 0–11–3–7–8–4–2–6–5–1–9–10、第 1 列（I0）は 0–1–9–5–4–8–10–6–7–11–3–2。十二音技法の基本の「規則」は：音級は音列の順に現れ、一度鳴った音級は次の音列まで繰り返さない。', 'A matrix lays the 48 forms out on a 12 × 12 grid: P along the top row left to right, R the same row right to left; I from the same pitch down the first column, RI up that column. For Elisabeth Lutyens’s Motet (Excerpta Tractati Logico-Philosophici), Op. 27, P0 = 0–11–3–7–8–4–2–6–5–1–9–10 and the first column (I0) is 0–1–9–5–4–8–10–6–7–11–3–2. The basic “rules”: pcs appear in row order, and once played a pc isn’t repeated until the next row.'),
        ],
      },
      {
        id: 'b64x-e4', type: 'discover', practice: true, ref: 'omt2e-twelve-tone',
        prompt: t('一个逆行形式最后一个音是 F♯（6），按 OMT 的习惯叫什么？', '最後の音が F♯（6）の逆行形は、OMT の慣習で何と呼ぶ？', 'A retrograde form ending on F♯ (6) is called what, by OMT’s convention?'),
        options: ['R6', 'R0', 'P6', 'I6'],
        answer: 0,
        insight: { title: t('R 看最后一个音', 'R は最後の音で', 'R names the last note'), text: t('这样 R6 正好是 P6 倒着读，两个下标一致。', 'こうすれば R6 はちょうど P6 の逆読みで、添字がそろう。', 'That way R6 is exactly P6 reversed, with matching subscripts.') },
      },
      {
        id: 'b64x-e5', type: 'page', ref: 'omt2e-row-naming',
        title: t('进阶 3 · 固定零与可动零；三种矩阵', '発展 3・固定ゼロと移動ゼロ；3 種のマトリクス', 'Advanced 3 · Fixed zero, moveable zero; three matrices'),
        text: [
          t('命名的主要分歧只有一个：序列以哪个音为中心——在所有场合都用同一个音（习惯上是 C），还是用对这首作品重要的音。方法一"固定零"：不管原型是什么，它从 C 开始的那个移位就是 P0；这大概是今天最常见的习惯，也叫"以零为中心"。于是 P0、I0 从 C 开始，R0、RI0 在 C 上结束。方法二"可动零"：把 P0 指定给第一个出现、或最有意义的那个形式，不管它从哪个音开始，也叫"以原形为中心"。Lutyens《Motet》里第一个进入的声部（女中音）从 D4 开始唱原型的前六个音，所以按可动零，P0 = 2–1–5–9–10–6–4–8–7–3–11–0。', '命名の主な違いは 1 つだけ：音列をどの音を中心に整理するか——どの場合も同じ音（慣習では C）か、その作品にとって重要な音か。方法 1「固定ゼロ」：原形が何であれ、C から始まるその移高を P0 とする。今日おそらく最も一般的で、「ゼロ中心」ともいう。P0 と I0 は C から始まり、R0 と RI0 は C で終わる。方法 2「移動ゼロ」：最初に現れる形か最も意味のある形を、どの音から始まるかにかかわらず P0 にする。「原形中心」ともいう。ラッチェンス《Motet》で最初に入る声部（アルト）は D4 から原形の最初の 6 音を歌うので、移動ゼロでは P0 = 2–1–5–9–10–6–4–8–7–3–11–0。', 'Naming differs on one choice: organise rows around the same pitch everywhere (conventionally C) or around a pitch important to the piece. Option 1, “fixed zero”: whatever the prime, its transposition starting on C is P0 — probably the most common convention today, also called “zero-centred”; P0 and I0 start on C, R0 and RI0 end on C. Option 2, “moveable zero”: P0 is the first or most meaningful form, whatever pitch it starts on — “original-centred”. In Lutyens’s Motet the first voice to enter (alto) starts on D4 with the prime’s first hexachord, so with moveable zero P0 = 2–1–5–9–10–6–4–8–7–3–11–0.'),
          t('两种习惯其实没那么不同：移位和其他操作在所有体系里都一样，差别只在用哪个形式当参照。想按音乐的意义指定 P0，可动零可能更合适——但你得每次都给 P0 的音高找个"好理由"，这不一定总是恰当；固定零清楚一致，所以在近年的学术写作里更常见，但这不代表它"更好"。很多时候甚至不清楚哪个方向该叫 P、哪个叫 I（或 R）。矩阵也有三种：一、P0 从 C 开始、在最上面一行（最常见）；二、P0 仍在最上面、但从 D 开始——形式的名字不变、音换了位置；三、混合型：D 开始的那行在最上面，却按"从 C 开始是 P0"标作 P2——音不变、名字变了。读别人的分析时要先弄清用的是哪一种。', '2 つの慣習は実はそれほど違わない：移高などの操作はどの体系でも同じで、違いはどの形を参照にするかだけ。音楽的な意味で P0 を決めたいなら移動ゼロが合うかもしれない——だが毎回 P0 の音高の「よい理由」を探すことになり、それが常に適切とは限らない。固定ゼロは明快で一貫しているので近年の研究でより一般的だが、それが「よりよい」わけではない。多くの場合、どちらの向きを P とし I（や R）とするかさえはっきりしない。マトリクスも 3 種ある：1. P0 が C から始まり最上段（最も一般的）。2. P0 は最上段だが D から始まる——形の名前は同じで、音の位置が変わる。3. 混合型：D から始まる段が最上段だが、「C から始まるのが P0」に従って P2 と書く——音は同じで名前が変わる。他人の分析を読むときはまずどれかを確かめること。', 'The conventions aren’t so different: operations work the same in all systems; only the reference form differs. Moveable zero suits musically sensitive choices of P0 — but then you need a “good” reason for P0’s pitch every time, which isn’t always appropriate; fixed zero offers clarity and consistency, hence its prevalence in recent scholarship, though that doesn’t make it better. Often it isn’t even clear which orientation should be P and which I (or R). Matrices come in three types: (1) P0 starting on C in the top row (most common); (2) P0 still on top but starting on D — row names the same, pitches moved; (3) a hybrid: the D version on top but labelled P2 by the C-based convention — pitches the same, names changed. Check which you are reading.'),
        ],
      },
      {
        id: 'b64x-e6', type: 'discover', practice: true, ref: 'omt2e-row-naming',
        prompt: t('Lutyens《Motet》里从 D 开始的原型，按"固定零"该叫什么？', 'ラッチェンス《Motet》の D から始まる原形は、「固定ゼロ」では何と呼ぶ？', 'In Lutyens’s Motet, the prime starting on D is called what under fixed zero?'),
        options: ['P2', 'P0', 'I2', 'R2'],
        answer: 0,
        insight: { title: t('D = 2', 'D = 2', 'D = 2'), text: t('固定零以 C = 0 计，从 D 开始就是 P2；按可动零它才是 P0。', '固定ゼロは C = 0 なので D から始まれば P2。移動ゼロなら P0。', 'Fixed zero counts from C = 0, so starting on D is P2; with moveable zero it would be P0.') },
      },
      {
        id: 'b64x-e7', type: 'page', ref: 'omt2e-twelve-tone',
        title: t('进阶 4 · 实践里的十二音：严格、松动与"只借手法"', '発展 4・実践の十二音：厳格、緩やか、「手法だけ借りる」', 'Advanced 4 · Twelve-tone in practice: strict, loose, borrowed'),
        text: [
          t('上面的"规则"是所有十二音作曲家至少都知道的，但他们实际怎么做差别很大。Luigi Dallapiccola 的《Piccola Musica Notturna》（"小夜曲"，1954）是公认的十二音名作，但从一开始就以轻松的态度重复音高甚至动机：有一个序列，但它逐渐、不教条地展开——这是 Dallapiccola 风格的关键，也是许多"序列"音乐的常态：偏离严格做法极为常见。OMT 的作者甚至觉得它和德彪西的世界（也许是《牧神午后前奏曲》的"夜晚"版本）一样近，不亚于和"严格"序列主义者的距离。', '上の「規則」はすべての十二音作曲家が少なくとも知っているが、実際のやり方は大きく違う。ルイジ・ダッラピッコラ《Piccola Musica Notturna》（「小さな夜の音楽」、1954）は定評ある十二音の名作だが、冒頭からずっと音高や動機まで気軽に繰り返す：音列はあるが、徐々に、教条的でなく展開する——これがダッラピッコラの様式の鍵で、多くの「音列」音楽の常態でもある：厳格なやり方から外れることはきわめて多い。OMT の筆者は、この曲がドビュッシーの世界（《牧神の午後への前奏曲》の「夜」版かも）とも、「厳格な」セリアリストと同じくらい近いと感じている。', 'All twelve-tone composers know the basic “rules”, but practice varies widely. Luigi Dallapiccola’s Piccola Musica Notturna (“little night music”, 1954), a canonic twelve-tone work, repeats pitches and even motivic figures freely from the start: there is a row, but it unfolds gradually, undogmatically — key to his style and to much “serial” music, where deviation from strict practice is extremely common. OMT’s author hears it as close to Debussy’s world (a night-time complement to the Prélude à l’après-midi d’un faune, perhaps) as to the strict serialists.'),
          t('反过来，也有明显不是十二音、却用了严格序列技法的音乐——前面 Tavener 的《The Lamb》就是例子。无论哪种做法，十二音序列至少会被用来构成：主题（但序列主题不一定正好十二个音，也不一定是完整的序列陈述）；动机（序列里重复出现的小细胞）；和弦（不受调性约束，序列的性质决定和弦的构成）。', '逆に、明らかに十二音でないのに厳格な音列技法を使う音楽もある——先のタヴナー《The Lamb》がその例。どのやり方でも、十二音列は少なくとも次の構成に使われる：主題（ただし音列の主題はちょうど 12 音とは限らず、完全な音列提示とも限らない）、動機（音列の中で繰り返す小さな細胞）、和音（調性の制約がなく、音列の性質が和音の作りを決める）。', 'Conversely, some music is clearly not twelve-tone yet uses strict serial techniques — Tavener’s “The Lamb” above. Either way, rows are used at least to build themes (though serial themes needn’t be exactly twelve notes or complete row statements), motives (small cells recurring within a row) and chords (free of tonal constraints, shaped by the row’s properties).'),
        ],
      },
      {
        id: 'b64x-e8', type: 'discover', practice: true, ref: 'omt2e-twelve-tone',
        prompt: t('Dallapiccola《Piccola Musica Notturna》对十二音"规则"的态度是？', 'ダッラピッコラ《Piccola Musica Notturna》の十二音の「規則」への態度は？', 'How does Dallapiccola’s Piccola Musica Notturna treat the twelve-tone “rules”?'),
        options: [t('轻松地重复音高和动机，序列逐渐、不教条地展开', '音高や動機を気軽に繰り返し、音列は徐々に、教条的でなく展開する', 'It repeats pitches and motives freely; the row unfolds gradually, undogmatically'), t('严格遵守，从不重复', '厳格に守り、決して繰り返さない', 'Strictly, never repeating'), t('根本没有序列', '音列はまったくない', 'It has no row at all')],
        answer: 0,
        insight: { title: t('偏离是常态', '外れるのが常態', 'Deviation is the norm'), text: t('OMT：在许多"序列"音乐里，偏离严格做法极为常见。', 'OMT：多くの「音列」音楽で、厳格なやり方からの逸脱はきわめて多い。', 'OMT: in much “serial” music, deviation from strict practice is extremely common.') },
      },
    ],
    experiment: [
      { id: 'b64x-x1', type: 'experiment', toy: 'matrix', ref: ['omt2e-row-naming', 'omt2e-twelve-tone'],
        prompt: t('这次矩阵最上面一行是 Lutyens 序列从 D 开始的版本（2–1–5–9–10–6–4–8–7–3–11–0），也就是女中音唱的那个。工具按固定零（C = 0）命名：这一行叫什么？再找出普通关里那个从 C 开始的 P0 在哪一行——这正是 OMT 说的第三种"混合型"矩阵。', '今回マトリクスの最上段は、ラッチェンスの音列を D から始めた版（2–1–5–9–10–6–4–8–7–3–11–0）、アルトが歌うもの。ツールは固定ゼロ（C = 0）で名付ける：この段は何と呼ばれる？ 次に普通の関の C から始まる P0 がどの段にあるか探そう——これが OMT の言う 3 つ目の「混合型」マトリクス。', 'This time the top row is Lutyens’s row starting on D (2–1–5–9–10–6–4–8–7–3–11–0), as the altos sing it. The tool names forms by fixed zero (C = 0): what is this row called? Then find which row holds the C-based P0 from the main level — this is OMT’s third, “hybrid” matrix type.'),
        params: { row: LUTYENS_D },
        breakthrough: { id: 'b64x-hybrid', text: t('同一张网格，换一种命名，名字全变了，音一个没动。', '同じ格子でも命名を替えると名前がすべて変わり、音は 1 つも動かない。', 'Same grid, different naming: every name changed, not a single note moved.') } },
    ],
    challenge: [
      {
        id: 'b64x-c1', type: 'choice', error: 'row-form', skills: ['calc'], ref: 'omt2e-twelve-tone',
        variants: [
          { prompt: t('Lutyens 序列 P0 = 0–11–3–7–8–4–2–6–5–1–9–10，I0 的前四个音是？', 'ラッチェンスの音列 P0 = 0–11–3–7–8–4–2–6–5–1–9–10、I0 の最初の 4 音は？', 'For Lutyens’s P0 = 0–11–3–7–8–4–2–6–5–1–9–10, the first four notes of I0 are…'), options: ['0–1–9–5', '0–11–3–7', '10–9–1–5'] },
          { prompt: t('Lutyens 序列的 R0 从哪个音级开始？', 'ラッチェンスの音列の R0 はどの音級から始まる？', 'Lutyens’s R0 begins on which pc?'), options: ['10', '0', '11'] },
          { prompt: t('一个倒影形式从 E♭ 开始，叫？', 'E♭ から始まる反転形は？', 'An inversion form starting on E♭ is…'), options: ['I3', 'I0', 'R3'] },
        ],
        answer: 0,
        explain: t('倒影：0、12−11=1、12−3=9、12−7=5；R0 是 P0 倒着读，从 10 开始（以 0 结尾）；倒影按第一个音级命名：I3。', '反転：0・12−11=1・12−3=9・12−7=5。R0 は P0 の逆読みで 10 から（0 で終わる）。反転は最初の音級で：I3。', 'Inversion: 0, 12−11 = 1, 12−3 = 9, 12−7 = 5; R0 reads P0 backwards, starting on 10 (ending on 0); inversions are named by their first pc: I3.'),
      },
      {
        id: 'b64x-c2', type: 'choice', error: 'row-form', skills: ['identify'], ref: 'omt2e-row-naming',
        variants: [
          { prompt: t('"固定零"习惯里，R0 在哪个音上结束？', '「固定ゼロ」で R0 はどの音で終わる？', 'Under fixed zero, R0 ends on…'), options: ['C', t('P0 的最后一个音', 'P0 の最後の音', 'the last note of P0'), t('任意', '任意', 'anything')] },
          { prompt: t('哪种矩阵是"音不变、名字变"？', '「音は同じ、名前が変わる」マトリクスはどれ？', 'Which matrix type keeps the pitches but changes the names?'), options: [t('第三种（混合型）', '3 つ目（混合型）', 'type 3 (hybrid)'), t('第一种', '1 つ目', 'type 1'), t('第二种', '2 つ目', 'type 2')] },
          { prompt: t('近年的学术写作里哪种习惯更常见？', '近年の研究でより一般的な慣習は？', 'Which convention is more common in recent scholarship?'), options: [t('固定零', '固定ゼロ', 'fixed zero'), t('可动零', '移動ゼロ', 'moveable zero'), t('两者一样', '同じくらい', 'equally common')] },
        ],
        answer: 0,
        explain: t('固定零：P0、I0 从 C 开始，R0、RI0 在 C 结束；第三种矩阵音不变名字变（第二种是名字不变音变）；固定零因清楚一致而更常见，但不代表更好。', '固定ゼロ：P0・I0 は C から、R0・RI0 は C で終わる。3 つ目のマトリクスは音が同じで名前が変わる（2 つ目は名前が同じで音が変わる）。固定ゼロは明快で一貫しているので一般的だが、よりよいわけではない。', 'Fixed zero: P0 and I0 start on C, R0 and RI0 end on C; type 3 keeps pitches and changes names (type 2 the reverse); fixed zero is commoner for clarity, not because it is better.'),
      },
      {
        id: 'b64x-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: 'omt2e-twelve-tone',
        variants: [
          { prompt: t('"序列主义"和"十二音作曲"的关系是？', '「セリアリズム」と「十二音作曲」の関係は？', 'How do “serialism” and “twelve-tone composition” relate?'), options: [t('序列主义更广，不是所有序列作品都用十二音序列', 'セリアリズムのほうが広く、音列作品がすべて十二音列を使うわけではない', 'Serialism is broader; not all serial pieces use a twelve-tone row'), t('完全相同', 'まったく同じ', 'They are identical'), t('十二音作曲更广', '十二音作曲のほうが広い', 'Twelve-tone is broader')] },
          { prompt: t('十二音技法里的倒影是哪种倒影？', '十二音技法の反転はどんな反転？', 'What kind of inversion does twelve-tone technique use?'), options: [t('保持半音数的严格倒影', '半音数を保つ厳格な反転', 'exact inversion, preserving semitone sizes'), t('调内倒影', '調内の反転', 'diatonic inversion'), t('只倒转方向、不管大小', '向きだけ逆にし大きさは問わない', 'direction only, any size')] },
          { prompt: t('十二音序列至少会被用来构成哪些东西？', '十二音列は少なくとも何の構成に使われる？', 'Rows are used at least to build…'), options: [t('主题、动机、和弦', '主題・動機・和音', 'themes, motives and chords'), t('只有主题', '主題だけ', 'themes only'), t('只有节奏', 'リズムだけ', 'rhythm only')] },
        ],
        answer: 0,
        explain: t('序列主义是更广的概念；十二音的倒影保持半音数；序列用于主题、动机、和弦。', 'セリアリズムはより広い概念。十二音の反転は半音数を保つ。音列は主題・動機・和音に使われる。', 'Serialism is broader; twelve-tone inversion preserves semitones; rows build themes, motives and chords.'),
      },
      {
        id: 'b64x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: 'omt2e-twelve-tone',
        variants: [
          { prompt: t('《The Lamb》里女高音的长旋律后半是前半的什么？', '《The Lamb》のソプラノの長い旋律の後半は前半の何？', 'In “The Lamb”, the second half of the sopranos’ longer tune is the first half’s…'), options: [t('严格逆行', '厳格な逆行', 'strict retrograde'), t('倒影', '反転', 'inversion'), t('移位', '移高', 'transposition')] },
          { prompt: t('《The Lamb》那一段有什么调式特征？', '《The Lamb》のその部分の旋法的な特徴は？', 'What modal feature does that passage of “The Lamb” have?'), options: [t('很清楚的调式终止音 G', 'はっきりした旋法の終止音 G', 'a clear modal final on G'), t('没有任何中心音', '中心音がまったくない', 'no centre at all'), t('一直在转调', 'ずっと転調している', 'constant modulation')] },
          { prompt: t('十二音作曲常和哪一群作曲家联系在一起？', '十二音作曲がよく結び付けられる作曲家のグループは？', 'Twelve-tone composition is commonly associated with…'), options: [t('勋伯格、韦伯恩、贝尔格（第二维也纳乐派）', 'シェーンベルク・ウェーベルン・ベルク（新ウィーン楽派）', 'Schoenberg, Webern, Berg (Second Viennese School)'), t('德彪西、拉威尔、萨蒂', 'ドビュッシー・ラヴェル・サティ', 'Debussy, Ravel, Satie'), t('巴托克、柯达伊、亚纳切克', 'バルトーク・コダーイ・ヤナーチェク', 'Bartók, Kodály, Janáček')] },
        ],
        answer: 0,
        explain: t('《The Lamb》后半是严格逆行，终止音 G 很清楚；十二音作曲常与第二维也纳乐派相联系。', '《The Lamb》の後半は厳格な逆行で、終止音 G がはっきり。十二音作曲は新ウィーン楽派と結び付けられる。', '“The Lamb” has a strict retrograde and a clear final on G; twelve-tone writing is associated with the Second Viennese School.'),
      },
      G('b64x-g1', 'rowForm', 2, ['calc']),
    ],
  },
  pool: [G('b64x-p1', 'rowForm', 3, ['calc']), G('b64x-p2', 'pcInteger', 1, ['calc'])],
};

// ===================== B6-5x 微分音与扩展纯律 · 扩展关 =====================
// 对应 A 面：micro（四分之一音 / 七度泛音 / koma 与中立三度 / 综合）+ microharmony（中立三和弦 / 质数极限 / 三种纯律和弦 / 综合）
const JI_RATIOS_X = [[16, 15], [9, 8], [8, 7], [7, 6], [6, 5], [11, 9], [5, 4], [9, 7], [7, 4]];
const EXT_B6_5 = {
  minutes: 22,
  insight: t('纯律用分数写音高：分数越简单，越接近泛音列的低处；平均律为了能转调，把这些分数都"凑整"成 100 音分的倍数。许多二十世纪作曲家觉得这个妥协牺牲了声音的感性，于是重新回到分数。', '純正律は分数で音高を書く：分数が簡単なほど倍音列の低い所に近い。平均律は転調のため、それらの分数をすべて 100 セントの倍数に「丸めた」。多くの 20 世紀の作曲家はこの妥協が響きの官能性を犠牲にしたと感じ、分数に戻った。', 'Just intonation writes pitches as fractions: the simpler the fraction, the nearer the bottom of the harmonic series; equal temperament rounds them all to multiples of 100 cents so music can modulate. Many 20th-century composers felt that compromise sacrificed sonic sensuousness and returned to fractions.'),
  sections: {
    discover: [
      {
        id: 'b65x-d1', type: 'discover', ref: 'gann-ji',
        prompt: t('在纯律的分数记法里，5/12、5/6、5/3、10/3、20/3 是同一个音（音级）吗？', '純正律の分数表記で、5/12・5/6・5/3・10/3・20/3 は同じ音（音級）？', 'In just-intonation fractions, are 5/12, 5/6, 5/3, 10/3 and 20/3 the same pitch class?'),
        options: [t('是：只差乘除 2（八度），通常写成 1/1 到 2/1 之间的 5/3', 'そう：2 を掛けたり割ったり（オクターヴ）しただけで、ふつう 1/1 と 2/1 の間の 5/3 と書く', 'Yes — they differ only by factors of 2 (octaves); usually written 5/3, between 1/1 and 2/1'), t('不是，五个不同的音', '違う、5 つの別の音', 'No, five different pitches'), t('只有 5/3 和 10/3 一样', '5/3 と 10/3 だけ同じ', 'Only 5/3 and 10/3 match')],
        answer: 0,
        insight: {
          title: t('1/1 = 2/1 = 4/1', '1/1 = 2/1 = 4/1', '1/1 = 2/1 = 4/1'),
          text: t('纯律记法里，音高是它和一个固定基音（1/1，可以任意指定，例如 C）的频率比。乘或除以 2 就是八度，所以表示八度关系的分数是等价的：就像钢琴上八个键都叫 C 一样，1/1 = 2/1 = 4/1。分数通常写在 1/1 和 2/1 之间——3/4 和 7/2 一般写成 3/2 和 7/4。Kyle Gann 说，对很多人来说，这是律学理论里最难习惯的一点。', '純正律の表記では、音高はある固定した基音（1/1、任意に決めてよい、たとえば C）との周波数比。2 を掛けたり割ったりするのはオクターヴなので、オクターヴの関係を表す分数は同等：ピアノの 8 つの鍵がみな C と呼ばれるように、1/1 = 2/1 = 4/1。分数はふつう 1/1 と 2/1 の間に書く——3/4 と 7/2 は 3/2 と 7/4 と書く。カイル・ガンは、多くの人にとってこれが調律理論でいちばん慣れにくい点だという。', 'In just-intonation notation a pitch is its frequency ratio to a fixed fundamental (1/1, chosen arbitrarily, say C). Multiplying or dividing by 2 is an octave, so octave-related fractions are equivalent: as eight piano keys are all called C, 1/1 = 2/1 = 4/1. Fractions are usually written between 1/1 and 2/1 — 3/4 and 7/2 become 3/2 and 7/4. Kyle Gann calls this, for many people, the hardest aspect of tuning theory to get used to.'),
        },
      },
    ],
    explain: [
      {
        id: 'b65x-e1', type: 'page', ref: 'gann-ji',
        title: t('进阶 1 · 音分：给分数量尺寸', '発展 1・セント：分数の大きさを測る', 'Advanced 1 · Cents: measuring fractions'),
        text: [
          t('音分是半音的百分之一，一个八度按定义是 1200 音分，所以钢琴上的音程都是 100 的倍数：半音 100、全音 200、小三度 300……纯五度 700。把频率比换成音分的公式：音分 = log(a/b) × 1200 / log 2；用常用对数时，1200 / log 2 ≈ 3986.3137，Gann 说他就把这个常数存在计算器里。', 'セントは半音の 100 分の 1 で、1 オクターヴは定義により 1200 セント。だからピアノの音程はすべて 100 の倍数：半音 100、全音 200、短 3 度 300……完全 5 度 700。周波数比をセントに直す式：セント = log(a/b) × 1200 / log 2。常用対数なら 1200 / log 2 ≈ 3986.3137、ガンはこの定数を電卓に保存しているという。', 'A cent is a hundredth of a half step; an octave is by definition 1200 cents, so piano intervals are all multiples of 100: half step 100, whole step 200, minor third 300 … perfect fifth 700. To convert a ratio: cents = log(a/b) × 1200 / log 2; with base-10 logs, 1200 / log 2 ≈ 3986.3137, a constant Gann keeps stored on his calculator.'),
          t('用这个公式得到：16/15 ≈ 111.73，9/8 ≈ 203.91，8/7 ≈ 231.17，7/6 ≈ 266.87，6/5 ≈ 315.64，11/9 ≈ 347.4，5/4 ≈ 386.31，9/7 ≈ 435.08 音分。这些都不是 100 的倍数；只有 4/3（498）和 3/2（702）很接近 500 和 700，9/8（204）也差不多。', 'この式で：16/15 ≈ 111.73、9/8 ≈ 203.91、8/7 ≈ 231.17、7/6 ≈ 266.87、6/5 ≈ 315.64、11/9 ≈ 347.4、5/4 ≈ 386.31、9/7 ≈ 435.08 セント。どれも 100 の倍数ではない。4/3（498）と 3/2（702）だけが 500 と 700 にとても近く、9/8（204）もほぼ同じ。', 'The formula gives 16/15 ≈ 111.73, 9/8 ≈ 203.91, 8/7 ≈ 231.17, 7/6 ≈ 266.87, 6/5 ≈ 315.64, 11/9 ≈ 347.4, 5/4 ≈ 386.31, 9/7 ≈ 435.08 cents. None is a multiple of 100; only 4/3 (498) and 3/2 (702) come very close to 500 and 700, with 9/8 (204) almost as close.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('比', '比', 'ratio'), cells: ['9/8', '7/6', '6/5', '11/9', '5/4', '9/7'] }, { label: t('音分', 'セント', 'cents'), cells: ['204', '267', '316', '347', '386', '435'] }] },
      },
      {
        id: 'b65x-e2', type: 'discover', practice: true, ref: 'gann-ji',
        prompt: t('纯律大三度 5/4 约 386 音分。平均律大三度 400 音分比它宽多少？', '純正の長 3 度 5/4 は約 386 セント。平均律の長 3 度 400 セントはそれよりどれだけ広い？', 'The just major third 5/4 is about 386 cents. How much wider is the 400-cent equal-tempered third?'),
        options: [t('约 14 音分', '約 14 セント', 'About 14 cents'), t('约 2 音分', '約 2 セント', 'About 2 cents'), t('约 31 音分', '約 31 セント', 'About 31 cents')],
        answer: 0,
        insight: { title: t('400 − 386', '400 − 386', '400 − 386'), text: t('和泛音列那张表一致：第 5 泛音比平均律低约 14 音分。', '倍音列の表と一致：第 5 倍音は平均律より約 14 セント低い。', 'Matching the harmonic-series table: harmonic 5 is about 14 cents below equal temperament.') },
      },
      {
        id: 'b65x-e3', type: 'page', ref: 'gann-ji',
        title: t('进阶 2 · 平均律是个妥协；回到纯律的作曲家们', '発展 2・平均律は妥協；純正律に戻った作曲家たち', 'Advanced 2 · Equal temperament as compromise; composers who returned to just intonation'),
        text: [
          t('Gann 说，我们把八度分成十二个相等的音程，不是因为这样更好听——它一点也不，持续的音之间有听得见的拍音、有点"嗡嗡"的——而是为了能把任何音乐移到任何调。看托勒密的大调音阶：C D E F G A B 的比是 1/1、9/8、5/4、4/3、3/2、5/3、15/8，音分是 0、204、386、498、702、884、1088；在 C 调里很好听。但移到 D 调重新算：D 到 A 的五度只有 680 音分，而不是理想的 702，"听起来很糟"，带着"哇–哇–哇"的咆哮。所以纯律在只有十二个键的键盘上很难移调、转调。', 'ガンによれば、オクターヴを 12 の等しい音程に分けるのは、そのほうがよく響くからではない——まったく違い、持続音の間に聞こえるうなりがあって少し「ブンブン」する——どんな音楽もどの調にも移せるようにするため。プトレマイオスの長音階を見よう：C D E F G A B の比は 1/1・9/8・5/4・4/3・3/2・5/3・15/8、セントは 0・204・386・498・702・884・1088。ハ調ではよく響く。だが D の調に移して計算し直すと、D から A の 5 度は理想の 702 でなく 680 セントしかなく、「ひどく聞こえ」、「ワウ・ワウ・ワウ」とうなる。だから純正律は 12 鍵の鍵盤では移調や転調が難しい。', 'Gann: we divide the octave into twelve equal intervals not because it sounds better — it doesn’t at all, it’s slightly buzzy with audible beating between sustained pitches — but so we can transpose any music to any key. Take Ptolemy’s major scale: C D E F G A B as 1/1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, or 0, 204, 386, 498, 702, 884, 1088 cents — fine in C. Recalculate from D, though, and D–A is only 680 cents instead of 702, and “it sounds awful”, with a wow-wow-wow growl. Hence just intonation makes transposition and modulation hard on a twelve-key keyboard.'),
          t('许多近代作曲家觉得平均律这个妥协是个错误：为了能从任何调转到任何调，牺牲了音乐声音的感性。Harry Partch 是第一个：他定义了一个八度 43 个音的音阶，还自己发明乐器来演奏；Lou Harrison 是下一位放弃平均律的重要人物，用过许多来自印尼甘美兰的调律，他的《钢琴协奏曲》还回到 18 世纪几乎纯的 Kirnberger II 调律。其他用纯律作曲的人有 Partch 的门生 Ben Johnston（Gann 的老师）、La Monte Young、Terry Riley、Pauline Oliveros、James Tenney、Rhys Chatham、Glenn Branca（第 3、4、5 交响曲）、Ben Neill、Dean Drummond，以及 Gann 自己。La Monte Young 的《The Well-Tuned Piano》有一个极奇特的音阶，其中 1323/1024 来自 7/4 × 7/4 × 3/2 × 3/2 × 3/2（再移回八度内）。', '多くの近代の作曲家は平均律という妥協を誤りだと感じた：どの調からどの調へも移れることを優先して、音楽の響きの官能性を犠牲にしたと。ハリー・パーチが最初で、1 オクターヴ 43 音の音階を定め、それを弾く楽器も自作した。ルー・ハリソンが平均律を捨てた次の重要人物で、インドネシアのガムランの調律を多く使い、《ピアノ協奏曲》では 18 世紀のほぼ純正なキルンベルガー II に戻った。ほかに純正律で作曲した人に、パーチの弟子ベン・ジョンストン（ガンの師）、ラ・モンテ・ヤング、テリー・ライリー、ポーリン・オリヴェロス、ジェイムズ・テニー、リース・チャタム、グレン・ブランカ（交響曲第 3・4・5 番）、ベン・ニール、ディーン・ドラモンド、そしてガン自身がいる。ラ・モンテ・ヤング《The Well-Tuned Piano》の音階はきわめて独特で、1323/1024 は 7/4 × 7/4 × 3/2 × 3/2 × 3/2（をオクターヴ内に戻したもの）から来る。', 'Many recent composers felt equal temperament was a mistake, prioritising modulation over music’s sonic sensuousness. Harry Partch was the first: he defined a 43-pitch scale and invented instruments to play it; Lou Harrison was next, using many Indonesian gamelan tunings and, in his Piano Concerto, the almost-pure 18th-century Kirnberger II. Others working in just intonation include Partch’s protégé Ben Johnston (Gann’s teacher), La Monte Young, Terry Riley, Pauline Oliveros, James Tenney, Rhys Chatham, Glenn Branca (Symphonies 3–5), Ben Neill, Dean Drummond and Gann himself. La Monte Young’s The Well-Tuned Piano uses a very exotic scale whose 1323/1024 comes from 7/4 × 7/4 × 3/2 × 3/2 × 3/2 (brought back into the octave).'),
        ],
      },
      {
        id: 'b65x-e4', type: 'discover', practice: true, ref: 'gann-ji',
        prompt: t('用托勒密的 C 大调纯律音阶在 D 调演奏，D 到 A 的五度只有多少音分？', 'プトレマイオスのハ長調の純正音階で D の調を弾くと、D から A の 5 度は何セントしかない？', 'Playing in D on Ptolemy’s just C major scale, the fifth D–A is only how many cents?'),
        options: ['680', '702', '700', '720'],
        answer: 0,
        insight: { title: t('5/3 ÷ 9/8 = 40/27', '5/3 ÷ 9/8 = 40/27', '5/3 ÷ 9/8 = 40/27'), text: t('A（884）− D（204）= 680：比纯五度窄 22 音分，"听起来很糟"。', 'A（884）− D（204）= 680：純正 5 度より 22 セント狭く、「ひどく聞こえる」。', 'A (884) − D (204) = 680: 22 cents narrow, and “it sounds awful”.') },
      },
      {
        id: 'b65x-e5', type: 'page', ref: 'wiki-limit',
        title: t('进阶 3 · 极限：奇数极限与质数极限', '発展 3・リミット：奇数リミットと素数リミット', 'Advanced 3 · Limits: odd limit and prime limit'),
        text: [
          t('"极限"是一个调律体系的比里用到的最大质数或奇数因子，这个词是 Harry Partch 创的。平均律的基本极限是 5，足够构成所有基本三和弦；提高极限就能造出更复杂的和弦——Partch 在自己的音乐里把质数上限定为 11，目标是扩展调性。中世纪音乐只把八度和纯五度（前三个泛音之间的关系）当协和；文艺复兴前后在西方兴起的三和弦和声，其大小三度涉及前五个泛音。20 世纪之交，四音和弦成为非裔美国人音乐的基本单位；它们通常被解释成大小三度的叠置，但也可以看成来自 5 以上的泛音，例如平均律的属七近似 4:5:6:7（虽然近似得很差），大七和弦近似 8:10:12:15。', '「リミット」はある調律体系の比で使われる最大の素数か奇数の因数で、この語はハリー・パーチが作った。平均律の基本のリミットは 5 で、すべての基本の三和音を作るのに十分。リミットを上げればより複雑な和音が作れる——パーチは自分の音楽で素数の上限を 11 とし、調性を広げることを目指した。中世音楽ではオクターヴと完全 5 度（最初の 3 つの倍音の関係）だけが協和とされ、ルネサンスのころ西洋で起こった三和音の和声の長短 3 度は最初の 5 つの倍音に関わる。20 世紀への変わり目に 4 音の和音がアフリカ系アメリカ人の音楽の基本単位になった。ふつう長短 3 度の積み重ねと説明されるが、5 より上の倍音から直接来るとも見なせる：平均律の属七は 4:5:6:7 に（とても粗く）近く、長七は 8:10:12:15 に近い。', 'A limit is the highest prime or odd factor used in a tuning system’s ratios, a term devised by Harry Partch. Equal temperament’s essential limit is 5, enough for all basic triads; raising it allows more complex chords — Partch capped his prime factor at 11, aiming to expand tonality. Medieval music counted only octaves and fifths (relations among the first three harmonics) consonant; the triadic harmony that arose in the West around the Renaissance involves the first five harmonics. Around 1900 tetrads became fundamental building blocks in African-American music; usually explained as stacked thirds, they can also be seen as coming from harmonics above 5 — the 12-ET dominant seventh approximates 4:5:6:7 (albeit very poorly), the major seventh 8:10:12:15.'),
          t('Partch 之后出现了两种不同的说法：奇数极限（分子或分母能被整除的最大奇数不超过 n）和质数极限（分子分母只用不超过 n 的质数分解）。两者即使在 n 是奇质数时也不包含同样的音程：9/8 的奇数极限是 9、质数极限是 3；81/64（ditone）是 81 和 3。Partch 说："9 虽然不是质数，却也是音乐里的一个“恒等”（identity），只因为它是奇数。"质数极限常用对应的数系名称来称呼：7-limit 叫 septimal，11-limit 叫 undecimal。1970 年代末，美国西岸受印尼甘美兰启发出现了"美国甘美兰"流派，核心人物是 Lou Harrison；他们自己造甘美兰乐器，常用纯律调音。', 'パーチ以後、2 つの異なる定式化が生まれた：奇数リミット（分子か分母を割り切る最大の奇数が n 以下）と素数リミット（分子分母を n 以下の素数だけで因数分解できる）。n が奇素数でも両者は同じ音程を含まない：9/8 の奇数リミットは 9、素数リミットは 3。81/64（ダイトーン）は 81 と 3。パーチは言う：「9 は素数ではないが、それでも音楽における『アイデンティティ』である。単に奇数だから」。素数リミットはよく対応する数体系の名で呼ばれる：7 リミットはセプティマル、11 リミットはアンデシマル。1970 年代末、米国西海岸でインドネシアのガムランに触発された「アメリカン・ガムラン」派が生まれ、中心人物はルー・ハリソン。彼らは自分でガムラン楽器を作り、よく純正律で調律した。', 'Since Partch two formulations have emerged: odd limit (the largest odd number dividing numerator or denominator is at most n) and prime limit (both factor into primes no greater than n). Even for odd prime n they include different intervals: 9/8 is odd-limit 9 but prime-limit 3; 81/64 (the ditone) is 81 and 3. Partch: “The number 9, though not a prime, is nevertheless an identity in music, simply because it is an odd number.” Prime limits are often named by numeral system: 7-limit is septimal, 11-limit undecimal. In the late 1970s the American gamelan school arose on the US West Coast, inspired by Indonesian gamelan, with Lou Harrison at its centre; its musicians built their own instruments, often tuned in just intonation.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('比', '比', 'ratio'), cells: ['3/2', '5/4', '7/5', '9/8', '81/64'] }, { label: t('奇数极限', '奇数リミット', 'odd limit'), cells: ['3', '5', '7', '9', '81'] }, { label: t('质数极限', '素数リミット', 'prime limit'), cells: ['3', '5', '7', '3', '3'] }] },
      },
      {
        id: 'b65x-e6', type: 'discover', practice: true, ref: 'wiki-limit',
        prompt: t('9/8 的奇数极限和质数极限分别是？', '9/8 の奇数リミットと素数リミットは？', 'What are the odd limit and prime limit of 9/8?'),
        options: [t('奇数极限 9，质数极限 3', '奇数リミット 9、素数リミット 3', 'Odd limit 9, prime limit 3'), t('都是 9', 'どちらも 9', 'Both 9'), t('都是 3', 'どちらも 3', 'Both 3')],
        answer: 0,
        insight: { title: t('9 = 3 × 3', '9 = 3 × 3', '9 = 3 × 3'), text: t('最大的奇因子是 9，但只用到质数 3（和 2）。', '最大の奇数因数は 9 だが、使う素数は 3（と 2）だけ。', 'The largest odd factor is 9, but the only primes are 3 (and 2).') },
      },
      {
        id: 'b65x-e7', type: 'page', ref: 'wiki-neutral-third',
        title: t('进阶 4 · 中立三度：三种、一个历史、一个婴儿', '発展 4・中立 3 度：3 種、1 つの歴史、1 人の赤ちゃん', 'Advanced 4 · Neutral thirds: three kinds, a history, and infants'),
        text: [
          t('中立三度比小三度宽、比大三度窄，在 24 平均律里叫中立三度，在纯律里也叫"次大三度"或"超小三度"；这个名字是 Jan Pieter Land 1880 年起的，他提到归于 Zalzal（8 世纪）的中立三度——Al-Farabi（10 世纪）描述为 27:22（354.5 音分），Avicenna（11 世纪）描述为 39:32（342.5 音分），Zalzal 的三度可能是个游移的音程。可以叫中立三度的有三种：十一限中立三度 11:9（约 347.41 音分），是 5/4 和 6/5 的中项，所以作为大三度和小三度"调得一样好"；十三限中立三度 16:13（约 359.47），最大，因为很少有音乐用到第 13 泛音而少见，它是 9/7 和 7/6 的中项；平均律中立三度 350 音分，比 11:9 稍宽，正好是平均律纯五度的一半。', '中立 3 度は短 3 度より広く長 3 度より狭く、24 平均律では中立 3 度、純正律では「サブメジャー 3 度」「スーパーマイナー 3 度」とも呼ぶ。名前は 1880 年にヤン・ピーテル・ラントが付けた。彼はザルザル（8 世紀）に帰される中立 3 度に触れている——アル＝ファーラービー（10 世紀）は 27:22（354.5 セント）、アヴィセンナ（11 世紀）は 39:32（342.5 セント）とした。ザルザルの 3 度は動く音程だったかもしれない。中立 3 度と呼べるものは 3 つ：アンデシマル中立 3 度 11:9（約 347.41 セント）は 5/4 と 6/5 の中間数で、長 3 度としても短 3 度としても「同じくらいよく合う」。トライデシマル中立 3 度 16:13（約 359.47）は最も大きく、第 13 倍音を使う音楽が少ないのでまれ。9/7 と 7/6 の中間数。平均律の中立 3 度 350 セントは 11:9 よりやや広く、平均律の完全 5 度のちょうど半分。', 'A neutral third is wider than minor and narrower than major — “neutral” in 24-TET, “submajor” or “superminor” in just intonation; Jan Pieter Land named it in 1880, citing the third attributed to Zalzal (8th century), described by Al-Farabi (10th century) as 27:22 (354.5 cents) and by Avicenna (11th century) as 39:32 (342.5) — Zalzal’s third may have been mobile. Three intervals qualify: the undecimal 11:9 (about 347.41 cents), the mediant of 5/4 and 6/5, equally well tuned as major and minor third; the tridecimal 16:13 (about 359.47), the largest, rare because little music uses the 13th harmonic, the mediant of 9/7 and 7/6; and the equal-tempered 350 cents, slightly wider than 11:9 and exactly half an equal-tempered fifth.'),
          t('这几种都在约 12 音分之内，大多数人很难听出差别；它们比平均律小三度高约四分之一音、比大三度低约四分之一音。两个中立三度叠成的三和弦既不大也不小，所以中立三和弦是模糊的；它不在十二平均律里，但在四分之一音音阶和 31 平均律里都有。几项个案研究发现，婴儿即兴唱歌时经常出现中立三度：在大小二度、三度之后出现，但在小于半音的音程和纯四度以上的音程之前。Charles Ives、James Tenney、Gayle Young 等现代作曲家用过它；托勒密的"均匀全音阶"里用了两个纯律中立三度 27/22 和 11/9。', 'これらはどれも約 12 セント以内で、多くの人には聞き分けにくい。平均律の短 3 度より約 4 分音高く、長 3 度より約 4 分音低い。中立 3 度 2 つでできた三和音は長でも短でもないので中立三和音はあいまい。12 平均律にはないが、4 分音音階や 31 平均律にはある。いくつかの事例研究で、赤ちゃんの即興の歌に中立 3 度がよく現れることがわかった：長短 2 度・3 度の後、半音より小さい音程や完全 4 度以上の音程より前に現れる。チャールズ・アイヴズ、ジェイムズ・テニー、ゲイル・ヤングら現代の作曲家が使い、プトレマイオスの「均等な全音階」は 2 つの純正な中立 3 度 27/22 と 11/9 を使う。', 'All these lie within about 12 cents and are hard for most people to tell apart; they sit roughly a quarter tone above the 12-ET minor third and below the major. A triad of two neutral thirds is neither major nor minor — ambiguous — absent from 12-TET but present in the quarter-tone scale and 31-TET. Case studies found neutral thirds regularly in infants’ improvised songs, arising after major and minor seconds and thirds but before intervals smaller than a semitone or as large as a fourth. Modern composers including Charles Ives, James Tenney and Gayle Young have used it; Ptolemy’s “even diatonic” uses two just neutral thirds, 27/22 and 11/9.'),
        ],
      },
      {
        id: 'b65x-e8', type: 'discover', practice: true, ref: 'wiki-neutral-third',
        prompt: t('为什么说 11:9 是"作为大三度和小三度调得一样好"的唯一比？', 'なぜ 11:9 は「長 3 度としても短 3 度としても同じくらいよく合う」唯一の比なのか？', 'Why is 11:9 the unique ratio equally well tuned as a major and a minor third?'),
        options: [t('它是 5/4 和 6/5 的中项，相关泛音的拍频相同', '5/4 と 6/5 の中間数で、関係する倍音のうなりの周波数が同じだから', 'It is the mediant of 5/4 and 6/5, with equal beat rates between the relevant harmonics'), t('它正好 350 音分', 'ちょうど 350 セントだから', 'It is exactly 350 cents'), t('它是质数', '素数だから', 'It is prime')],
        answer: 0,
        insight: { title: t('(5 + 6) / (4 + 5) = 11/9', '(5 + 6) / (4 + 5) = 11/9', '(5 + 6) / (4 + 5) = 11/9'), text: t('低音的第 5 泛音对高音的第 4 泛音、低音的第 6 泛音对高音的第 5 泛音，拍频都是 f/9。350 音分的是平均律中立三度。', '低い音の第 5 倍音と高い音の第 4 倍音、低い音の第 6 倍音と高い音の第 5 倍音のうなりはどちらも f/9。350 セントは平均律の中立 3 度。', 'The lower note’s 5th harmonic against the upper’s 4th, and its 6th against the upper’s 5th, both beat at f/9. The 350-cent one is the equal-tempered neutral third.') },
      },
    ],
    experiment: [
      { id: 'b65x-x1', type: 'experiment', toy: 'ji', ref: ['gann-ji', 'hf-intervals', 'wiki-limit'],
        prompt: t('这次的频率比是 Gann 那张表从小到大的一串：16/15、9/8、8/7、7/6、6/5、11/9、5/4、9/7，再加上 7/4。依次点，听它和根音一起响，对照音分和极限：哪一个离平均律最远？7/6、11/9 这类 septimal、undecimal 音程，钢琴上找得到吗？', '今回の周波数比はガンの表の小さい順：16/15・9/8・8/7・7/6・6/5・11/9・5/4・9/7、それに 7/4。順に押して根音と一緒に聴き、セントとリミットを見比べよう：平均律から最も遠いのは？ 7/6 や 11/9 のようなセプティマル・アンデシマルの音程はピアノで見つかる？', 'This time the ratios run small to large from Gann’s table: 16/15, 9/8, 8/7, 7/6, 6/5, 11/9, 5/4, 9/7, plus 7/4. Tap each, hear it against the root, and compare cents and limits: which strays furthest from equal temperament? Can a piano find septimal and undecimal intervals like 7/6 and 11/9?'),
        params: { ratios: JI_RATIOS_X },
        breakthrough: { id: 'b65x-between', text: t('你听到了钢琴键"之间"的音。', 'ピアノの鍵の「間」の音が聞こえた。', 'You heard the notes between the piano keys.') } },
    ],
    challenge: [
      {
        id: 'b65x-c1', type: 'choice', error: 'ji-ratio', skills: ['calc'], ref: 'gann-ji',
        variants: [
          { prompt: t('7/6 大约多少音分？', '7/6 はおよそ何セント？', 'About how many cents is 7/6?'), options: ['267', '316', '231'] },
          { prompt: t('分数 7/2 通常写成？', '分数 7/2 はふつう何と書く？', 'The fraction 7/2 is usually written as…'), options: ['7/4', '7/1', '14/4'] },
          { prompt: t('Gann 说他存在计算器里的常数 3986.3137 是什么？', 'ガンが電卓に保存している定数 3986.3137 は何？', 'What is the constant 3986.3137 Gann keeps on his calculator?'), options: [t('1200 / log 2（常用对数）', '1200 / log 2（常用対数）', '1200 / log 2 (base-10)'), t('一个八度的音分数', '1 オクターヴのセント数', 'the cents in an octave'), t('毕达哥拉斯音差', 'ピタゴラス・コンマ', 'the Pythagorean comma')] },
        ],
        answer: 0,
        explain: t('7/6 ≈ 266.87；分数移到 1/1 与 2/1 之间：7/2 → 7/4；音分 = log(a/b) × 1200 / log 2 ≈ log(a/b) × 3986.3137。', '7/6 ≈ 266.87。分数は 1/1 と 2/1 の間へ：7/2 → 7/4。セント = log(a/b) × 1200 / log 2 ≈ log(a/b) × 3986.3137。', '7/6 ≈ 266.87; fractions go between 1/1 and 2/1: 7/2 → 7/4; cents = log(a/b) × 1200 / log 2 ≈ log(a/b) × 3986.3137.'),
      },
      {
        id: 'b65x-c2', type: 'choice', error: 'ji-ratio', skills: ['identify'], ref: 'wiki-limit',
        variants: [
          { prompt: t('"极限"这个词是谁创的？', '「リミット」という語を作ったのは？', 'Who devised the term “limit”?'), options: [t('Harry Partch', 'ハリー・パーチ', 'Harry Partch'), t('Lou Harrison', 'ルー・ハリソン', 'Lou Harrison'), t('Kyle Gann', 'カイル・ガン', 'Kyle Gann')] },
          { prompt: t('81/64 的奇数极限和质数极限是？', '81/64 の奇数リミットと素数リミットは？', 'The odd and prime limits of 81/64 are…'), options: [t('81 和 3', '81 と 3', '81 and 3'), t('3 和 3', '3 と 3', '3 and 3'), t('81 和 81', '81 と 81', '81 and 81')] },
          { prompt: t('7-limit 的音程又叫？', '7 リミットの音程の別名は？', '7-limit intervals are also called…'), options: ['septimal', 'undecimal', 'tridecimal'] },
        ],
        answer: 0,
        explain: t('极限一词出自 Partch；81 = 3⁴：奇数极限 81、质数极限 3；7-limit = septimal（11 是 undecimal）。', 'リミットはパーチの語。81 = 3⁴：奇数リミット 81、素数リミット 3。7 リミット = セプティマル（11 はアンデシマル）。', 'Partch coined it; 81 = 3⁴: odd limit 81, prime limit 3; 7-limit is septimal (11 is undecimal).'),
      },
      {
        id: 'b65x-c3', type: 'choice', error: 'ji-ratio', skills: ['identify'], ref: 'wiki-neutral-third',
        variants: [
          { prompt: t('哪一种中立三度最大？', '最も大きい中立 3 度は？', 'Which neutral third is largest?'), options: [t('16:13（约 359 音分）', '16:13（約 359 セント）', '16:13 (about 359 cents)'), t('11:9（约 347 音分）', '11:9（約 347 セント）', '11:9 (about 347 cents)'), t('平均律的 350 音分', '平均律の 350 セント', 'the equal-tempered 350 cents')] },
          { prompt: t('"中立三度"这个名字是谁、哪一年起的？', '「中立 3 度」という名前を付けたのは誰で何年？', 'Who named the neutral third, and when?'), options: [t('Jan Pieter Land，1880 年', 'ヤン・ピーテル・ラント、1880 年', 'Jan Pieter Land, 1880'), t('Al-Farabi，10 世纪', 'アル＝ファーラービー、10 世紀', 'Al-Farabi, 10th century'), t('Harry Partch，1940 年代', 'ハリー・パーチ、1940 年代', 'Harry Partch, 1940s')] },
          { prompt: t('中立三和弦在哪种律制里找得到？', '中立三和音が見つかる律は？', 'In which tuning is the neutral triad found?'), options: [t('四分之一音音阶、31 平均律', '4 分音音階・31 平均律', 'the quarter-tone scale and 31-TET'), t('十二平均律', '12 平均律', '12-TET'), t('毕达哥拉斯律', 'ピタゴラス律', 'Pythagorean tuning')] },
        ],
        answer: 0,
        explain: t('16:13 最大；Land 1880 年起名；中立三和弦不在十二平均律里，但在四分之一音音阶和 31 平均律里。', '16:13 が最大。ラントが 1880 年に命名。中立三和音は 12 平均律になく、4 分音音階や 31 平均律にある。', '16:13 is largest; Land named it in 1880; the neutral triad is absent from 12-TET but found in quarter tones and 31-TET.'),
      },
      {
        id: 'b65x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: 'gann-ji',
        variants: [
          { prompt: t('谁定义了一个八度 43 个音的音阶并自制乐器？', '1 オクターヴ 43 音の音階を定め、楽器を自作したのは？', 'Who defined a 43-pitch scale and built instruments for it?'), options: [t('Harry Partch', 'ハリー・パーチ', 'Harry Partch'), t('La Monte Young', 'ラ・モンテ・ヤング', 'La Monte Young'), t('Ben Johnston', 'ベン・ジョンストン', 'Ben Johnston')] },
          { prompt: t('Lou Harrison 的《钢琴协奏曲》用了哪种调律？', 'ルー・ハリソン《ピアノ協奏曲》の調律は？', 'Which tuning does Lou Harrison’s Piano Concerto use?'), options: [t('几乎纯的 Kirnberger II', 'ほぼ純正なキルンベルガー II', 'the almost-pure Kirnberger II'), t('十二平均律', '12 平均律', '12-TET'), t('43 音阶', '43 音の音階', 'a 43-note scale')] },
          { prompt: t('按 Gann 的说法，我们用十二平均律主要是为了？', 'ガンによれば、12 平均律を使う主な理由は？', 'According to Gann, we use 12-TET mainly so that…'), options: [t('能把任何音乐移到任何调', 'どんな音楽もどの調にも移せるように', 'any music can be transposed to any key'), t('它比纯律好听', '純正律より響きがよいから', 'it sounds better than just intonation'), t('它没有拍音', 'うなりがないから', 'it has no beating')] },
        ],
        answer: 0,
        explain: t('Partch 的 43 音阶；Harrison《钢琴协奏曲》用 Kirnberger II；平均律是为了移调的妥协，并不更好听、还有拍音。', 'パーチの 43 音音階。ハリソン《ピアノ協奏曲》はキルンベルガー II。平均律は移調のための妥協で、響きがよいわけでなくうなりもある。', 'Partch’s 43-note scale; Harrison’s Piano Concerto uses Kirnberger II; equal temperament is a compromise for transposition — not better-sounding, and it beats.'),
      },
      G('b65x-g1', 'primeLimit', 1, ['identify']),
      G('b65x-g2', 'jiInterval', 1, ['calc']),
    ],
  },
  pool: [G('b65x-p1', 'primeLimit', 2, ['identify']), G('b65x-p2', 'neutralTriad', 2, ['hearing'])],
};

export const EXT_MODERN = { 'B6-1': EXT_B6_1, 'B6-2': EXT_B6_2, 'B6-3': EXT_B6_3, 'B6-4': EXT_B6_4, 'B6-5': EXT_B6_5 };

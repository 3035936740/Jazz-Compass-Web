// Side-B 第 4 章（节奏与爵士）：B4-1 ~ B4-9（B4-10 在 sideb_units_rhythm.js）。
// 出处（每条事实都在原文里核对过）：
//   摇摆八分音符：写成普通的直八分，演奏成前长后短、近似三连音（第一个约是第二个的两倍长）；比例因曲、因人而异，速度快时更直、速度慢时摇摆更明显；
//     反拍（backbeat）= 四拍子里 2、4 拍的重音（古典音乐通常重音在 1、3 拍），但和弦变化与根音仍多在第 1 拍；标准摇摆鼓点：叠钹上的摇摆八分 + 踩镲上的反拍；
//     切分 = 节拍的层次被打破，反拍本身就是一种切分：ref:omt2e-swing
//   三连音 = 单拍子里把一拍（或细分、或几拍）分成三份，上面写 3；二连音 = 复拍子里把一拍分成两份，上面写 2；切分可以由连音线、附点、休止或力度造成：ref:omt2e-rhythm-more
//   布鲁斯：所有和弦都是属七；属七和弦可以有任何功能（主、下属、属）；以变格终止（IV–I）收束而不是正格终止；大小三度自由混用；
//     十二小节 = 三句、每句四小节：第一句全是 I，第二句两小节 IV、两小节 I，第三句 V–IV–I–I；常见变化：第 2 小节去 IV 再回 I、最后一两小节用转回句（V7 或 III–VI–II–V）；
//     十六小节布鲁斯；小调布鲁斯：i 与 iv 是小七和弦、V 仍是属七，第三句常换成 ii–V–i；爵士布鲁斯加入 ii–V：ref:omt2e-blues-harmony
//   第 2 小节用 IV 的变化叫 quick change（quick to four）：ref:wiki-twelve-bar
//   布鲁斯音阶 = 小调五声加一个半音经过音：do–me–fa–fi–sol–te；从第二个音开始是大调布鲁斯音阶 do–re–ri–mi–sol–la，和大三和弦的冲突较小；
//     歌词常是 aab（第一句重复，第三句对比），旋律留空给乐器"应答"（call-and-response）：ref:omt2e-blues-scale
//   ii–V–I：大调 mi7–7–ma7，小调 ø7–7–mi7（V 在大小调都是属七）；靠"根音五度进行 + 这串和弦性质"认出来；ii–V 可以离调到别的调（应用 ii–V），
//     如《Afternoon in Paris》A 段先后在 B♭ 大调、A♭ 大调上做 ii–V–I：ref:omt2e-iivi
//   和弦—音阶理论：把十三和弦的音重新排列就是一个七声音阶（Dm13 = D Dorian）；用罗马数字分析定出调和功能再选调式（ii → Dorian、V → Mixolydian、I → Ionian……）；
//     即兴时把和弦音放在强拍上；它不意味着每换一个和弦就换调；源自 George Russell 的 Lydian Chromatic Concept：ref:omt2e-chord-scale
//   爵士配置：间距仿照泛音列（低音区宽、高音区窄），延伸音放高处、十三音要在七音上方；重复低音或根音；最常省略五音，七音与根音很少省（有贝斯时可以省根音）；
//     声部要"懒"：能保持就保持，其次全音 / 半音，三度跳进也容易，大跳少用；两个上方声部用三音与七音（根音五度关系时两条线交替，二度关系时平行）；
//     第三个声部在上面连九音与十三音；先用调内的延伸音：ref:omt2e-jazz-voicings
//   So What 和弦：从下往上三个纯四度加一个大三度，Bill Evans 在 Miles Davis《So What》里用：ref:wiki-so-what；上方结构三和弦：在复杂和弦的最高处放一个大或小三和弦：ref:wiki-upper-structure
//   替代：五度进行里前一个和弦可以换成同根音的属七（变成应用属和弦）；调式混合最常见的是用 iiø7 代替 ii7、V7 加 ♭9（都用 le）；
//     三全音替代：用相隔三全音的属七代替属七（两者共用同一个三全音），常以下行小二度解决；转回句里常隔一个换一个，得到半音下行的低音；
//     替代在谱上可能不写、直接写进和弦标记、或写在括号里：ref:omt2e-substitutions
//   旋律小调（爵士小调）= 只用上行形式，等于把大调的三音降低：1 2 ♭3 4 5 6 7；七个调式：I、Dorian ♭2、Lydian augmented、Lydian dominant（acoustic）、
//     Aeolian dominant、半减（Locrian ♮2）、变化音阶（altered / super-Locrian）：ref:wiki-jazz-minor
//   变化音阶 = 旋律小调的第七个调式；保留属七的根音、三音、七音，把 5、9、11、13 全部变化（♭5、♭9、♯9、♭13）：ref:wiki-altered-scale
//   和声小调 = 自然小调把七级升高半音，六、七级之间是增二度：ref:wiki-harmonic-minor；和声大调 = 大调把六级降低半音（= 和声小调把三级升高）：ref:wiki-harmonic-major
//   全音音阶：六个音、每两个相邻音都是全音；只有两个（互补）：ref:wiki-whole-tone；八音音阶：全音半音交替，只有三个；爵士里叫减音阶（两个减七和弦交错），
//     分"半全"与"全半"：ref:wiki-octatonic；bebop 音阶：在七声音阶里加一个半音经过音成为八个音，从和弦音、强拍开始依次弹，和弦音就一直落在强拍上；
//     bebop 属音阶 = Mixolydian 在 ♭7 与主音之间加经过音：ref:wiki-bebop-scale
//   负和声：每个音沿主音与属音之间的轴在五度圈上镜像（C 调：C 与 G 之间）；大三和弦变小三和弦、上行变下行；保持朝主音的功能拉力；
//     源自 Ernst Levy 的两极理论，Steve Coleman 提出"负和声"这个名称，Jacob Collier 让它广为人知；和旋律倒影不同：严格镜像每个音：ref:wiki-negative-harmony
//   LCC：George Russell 1953 年首次出版；每个和弦都有一个和它"最统一"的音阶，叫母音阶（parent scale）；Lydian 音阶 = 六个上行五度，最下面的音叫 Lydian 主音；
//     Russell 说在多次测试里，多数人觉得 C Lydian 叠成三度比 C 大调叠成三度更和 C 大三和弦统一：ref:george-russell-lcc
const t = (zh, ja, en) => ({ zh, ja, en });
const G = (id, gen, count, skills, params) => ({ id, type: 'gen', gen, count, skills, ...(params ? { params } : {}) });

// 鼓点试听：直八分 / 摇摆八分 + 反拍
const ride = (off) => [0, 1, 2, 3, 4, 5, 6, 7].flatMap((b) => [b, b + off]);
const groove = (off, back = true) => ({ rhythm: { bpm: 120, cycle: 8, repeats: 1, tracks: [{ beats: ride(off), midi: 81 }, ...(back ? [{ beats: [1, 3, 5, 7], midi: 50 }] : []), { beats: [0, 2, 4, 6], midi: 36 }] } });
// C 调导向音配置 [低音, 三音 / 七音, 三音 / 七音, 九音 / 十三音]（与 sideb_toys.guideVoicing 的结果相同）
const V = {
  Cmaj7: [48, 64, 71, 74], Am7: [45, 67, 72, 74], Dm7: [50, 65, 72, 76], G7: [43, 65, 71, 76], A7: [45, 67, 73, 78], D7: [50, 66, 72, 76],
  Eb7: [51, 67, 73, 77], Db7: [49, 65, 71, 75], Ab7: [44, 66, 72, 77], C7: [48, 64, 70, 74], F7: [41, 63, 69, 74],
};

// ===================== B4-1 节奏 II：连音、切分、摇摆与反拍 =====================
export const LEVEL_B4_1 = {
  minutes: 14,
  insight: t('摇摆的八分音符写成直八分，演奏时前长后短（大约 2:1）：谱上不写，耳朵和身体来补。', 'スウィングの 8 分音符はストレートで書き、前を長く後を短く（約 2:1）演奏する：譜面には書かず、耳と体が補う。', 'Swing eighths are written straight and played long–short (about 2:1): the page doesn’t show it — your ear and body supply it.'),
  sections: {
    discover: [
      {
        id: 'b41-d1', type: 'discover', ref: 'omt2e-swing',
        prompt: t('同样写成八分音符的鼓点，演奏两次。哪一次"摇"起来了？差别在哪里？', '同じ 8 分音符で書かれたドラム・パターンを 2 回。どちらが「揺れて」いる？ 違いは？', 'The same written eighth notes on the drums, played twice. Which one swings, and what changed?'),
        play: [{ label: t('A', 'A', 'A'), audio: groove(0.5) }, { label: t('B', 'B', 'B'), audio: groove(2 / 3) }],
        options: [t('B：每拍的第二个八分音符晚来、变短（前长后短）', 'B：各拍の 2 つ目の 8 分音符が遅れて短くなる（前が長く後が短い）', 'B: the second eighth of each beat comes late and short (long–short)'), t('A：两个八分音符一样长才摇摆', 'A：2 つの 8 分音符が同じ長さだからスウィング', 'A: equal eighths are what swings'), t('B 只是更快', 'B は速いだけ', 'B is just faster')],
        answer: 0,
        insight: {
          title: t('写的是直的，弹的是摇的', '書くのはストレート、弾くのはスウィング', 'Written straight, played swung'),
          text: t('摇摆八分音符演奏成近似三连音的前长后短，第一个大约是第二个的两倍长；但谱上一律写成普通八分音符，演奏者自己知道要摇。实际比例因曲、因人而异：速度快时更直，速度慢时摇得更明显。', 'スウィングの 8 分音符は 3 連符に近い長短で演奏し、1 つ目は 2 つ目の約 2 倍。でも譜面は普通の 8 分音符で書き、奏者が自分で揺らす。比率は曲や奏者で違い、速いと直線的、遅いとはっきり揺れる。', 'Swing eighths are played long–short in a quasi-triplet rhythm, the first about twice the second — but always written as plain eighths; performers know to swing them. The ratio varies by tune and player: faster tempos tend to be straighter, slower ones swing harder.'),
        },
      },
    ],
    explain: [
      {
        id: 'b41-e1', type: 'page', ref: 'omt2e-rhythm-more',
        title: t('三连音与二连音', '3 連符と 2 連符', 'Triplets and duplets'),
        text: [
          t('三连音：在单拍子里把一拍（或一个细分、或几拍）分成三份，上面写一个 3。二连音：在复拍子里把一拍分成两份，上面写一个 2。它们都是"连音"（tuplet）——借来另一种拍子的分法。', '3 連符：単純拍子で 1 拍（または細分、または数拍）を 3 つに分け、上に 3 と書く。2 連符：複合拍子で 1 拍を 2 つに分け、上に 2 と書く。どちらも連符——別の拍子の分け方を借りる。', 'A triplet divides a beat (or a subdivision, or several beats) of simple meter into three, marked with a 3. A duplet divides a compound-meter beat into two, marked with a 2. Both are tuplets — borrowing the other kind of meter’s division.'),
        ],
        tool: { feature: 'rhythm' },
      },
      {
        id: 'b41-e2', type: 'page', ref: 'omt2e-swing',
        title: t('反拍与切分', 'バックビートとシンコペーション', 'Backbeat and syncopation'),
        text: [
          t('反拍（backbeat）是四拍子里 2、4 拍上的重音，和古典音乐常见的 1、3 拍重音正好相反；不过和弦变化与根音仍多在第 1 拍。标准的摇摆鼓点 = 叠钹上的摇摆八分 + 踩镲上的反拍。', 'バックビートは 4 拍子の 2・4 拍のアクセントで、クラシックでよくある 1・3 拍とは逆。ただしコードの変化とルートは多く 1 拍目。標準的なスウィングのドラム = ライドのスウィング 8 分 + ハイハットのバックビート。', 'The backbeat is an accent on beats 2 and 4 of a quadruple meter — the opposite of the usual classical accents on 1 and 3, although chord changes and roots still mostly fall on beat 1. A standard swing beat = swing eighths on the ride + backbeat on the hi-hat.'),
          t('切分就是节拍的层次被打破：在弱的位置放重音。反拍本身就是一种切分；连音线、附点、休止或力度也都能造成切分。', 'シンコペーションは拍の階層が崩れること：弱い位置にアクセント。バックビート自体がその一種で、タイ・付点・休符・強弱でも生まれる。', 'Syncopation subverts the meter’s hierarchy by accenting weak positions. The backbeat is one kind; ties, dots, rests and dynamics can create it too.'),
        ],
      },
      {
        id: 'b41-e3', type: 'discover', practice: true, ref: 'omt2e-swing',
        prompt: t('速度越来越快时，摇摆的比例一般会？', 'テンポが速くなると、スウィングの比率はふつう？', 'As the tempo gets faster, the swing ratio usually…'),
        options: [t('变得更直（更接近 1:1）', 'よりストレートに（1:1 に近づく）', 'gets straighter (closer to 1:1)'), t('变得更摇（3:1）', 'より強く揺れる（3:1）', 'swings harder (3:1)'), t('完全不变', 'まったく変わらない', 'never changes')],
        answer: 0,
        insight: { title: t('比例不是固定的', '比率は固定ではない', 'The ratio isn’t fixed'), text: t('三连音的 2:1 只是常用的说法；速度快时更直，速度慢时摇得更明显，不同演奏者也不一样。', '3 連符の 2:1 はよく使う説明にすぎない。速いと直線的、遅いと強く揺れ、奏者によっても違う。', 'Triplet 2:1 is just the usual explanation; fast tempos are straighter, slow ones swing harder, and players differ.') },
      },
    ],
    experiment: [
      { id: 'b41-x1', type: 'experiment', toy: 'swing', ref: 'omt2e-swing',
        prompt: t('换几种长短比例，开关反拍，听同一段鼓点的"感觉"怎么变。哪个比例最像你听过的摇摆乐？', '長短の比率を変え、バックビートをオン・オフして、同じドラム・パターンの「ノリ」の変化を聴こう。どの比率が聴いたことのあるスウィングに一番近い？', 'Try different long–short ratios and switch the backbeat on and off. How does the same groove feel? Which ratio sounds most like the swing you know?'),
        params: {},
        breakthrough: { id: 'b41-swing', text: t('你亲手把直八分"摇"了起来。', '自分の手でストレートの 8 分を「揺らした」。', 'You made straight eighths swing yourself.') } },
    ],
    challenge: [
      {
        id: 'b41-c1', type: 'choice', error: 'swing-feel', skills: ['identify'], ref: 'omt2e-swing',
        variants: [
          { prompt: t('爵士谱上的摇摆八分音符一般怎么写？', 'ジャズの譜面でスウィングの 8 分音符はふつうどう書く？', 'How are swing eighths usually notated in jazz?'), options: [t('写成普通的直八分音符', '普通のストレートの 8 分音符で', 'As plain straight eighths'), t('每拍写成三连音', '毎拍 3 連符で', 'As triplets on every beat'), t('写成附点八分 + 十六分', '付点 8 分 + 16 分で', 'As dotted eighth + sixteenth'), t('写成四分音符', '4 分音符で', 'As quarter notes')] },
          { prompt: t('四拍子的反拍落在哪几拍？', '4 拍子のバックビートは何拍目？', 'In quadruple meter, the backbeat falls on beats…'), options: ['2、4', '1、3', '1、2', '3、4'] },
          { prompt: t('标准摇摆鼓点里，反拍通常由哪个乐器奏出？', '標準のスウィングのドラムで、バックビートはふつう何で？', 'In a standard swing beat, which instrument usually plays the backbeat?'), options: [t('踩镲（hi-hat）', 'ハイハット', 'The hi-hat'), t('叠钹（ride）', 'ライド', 'The ride cymbal'), t('低音鼓', 'バスドラム', 'The bass drum'), t('定音鼓', 'ティンパニ', 'The timpani')] },
        ],
        answer: 0,
        explain: t('摇摆八分写成直八分；反拍是 2、4 拍；标准鼓点里叠钹打摇摆八分、踩镲打反拍。', 'スウィングの 8 分はストレートで書く。バックビートは 2・4 拍。標準のドラムはライドでスウィング 8 分、ハイハットでバックビート。', 'Swing eighths are written straight; the backbeat is beats 2 and 4; the ride plays swing eighths and the hi-hat the backbeat.'),
      },
      {
        id: 'b41-c2', type: 'choice', error: 'concept', skills: ['identify'], ref: 'omt2e-rhythm-more',
        variants: [
          { prompt: t('在 4/4 里把一拍分成三份，叫？', '4/4 で 1 拍を 3 つに分けるのは？', 'Dividing one beat of 4/4 into three is a…'), options: [t('三连音', '3 連符', 'triplet'), t('二连音', '2 連符', 'duplet'), t('附点', '付点', 'dotted rhythm'), t('切分', 'シンコペーション', 'syncopation')] },
          { prompt: t('在 6/8 里把一拍（附点四分音符）分成两份，叫？', '6/8 で 1 拍（付点 4 分）を 2 つに分けるのは？', 'Dividing one beat of 6/8 (a dotted quarter) into two is a…'), options: [t('二连音', '2 連符', 'duplet'), t('三连音', '3 連符', 'triplet'), t('五连音', '5 連符', 'quintuplet'), t('附点', '付点', 'dotted rhythm')] },
        ],
        answer: 0,
        explain: t('单拍子里分三份是三连音，复拍子里分两份是二连音——都是借另一种拍子的分法。', '単純拍子で 3 分割は 3 連符、複合拍子で 2 分割は 2 連符——どちらも別の拍子の分け方を借りる。', 'Three in a simple beat is a triplet; two in a compound beat is a duplet — each borrows the other meter’s division.'),
      },
      {
        id: 'b41-c3', type: 'choice', error: 'missing-syncopation', skills: ['apply'], ref: ['omt2e-swing', 'omt2e-rhythm-more'],
        variants: [
          { prompt: t('下面哪一种不会造成切分？', 'シンコペーションを生まないのは？', 'Which of these does NOT create syncopation?'), options: [t('每小节都在第 1 拍放最强的重音', '毎小節 1 拍目に一番強いアクセント', 'The strongest accent on beat 1 of every bar'), t('弱拍上的音用连音线连过下一拍', '弱拍の音をタイで次の拍へ', 'Tying a weak-beat note over the next beat'), t('在 2、4 拍上加重音', '2・4 拍にアクセント', 'Accenting beats 2 and 4'), t('强拍上休止、弱拍上起音', '強拍で休み弱拍で打つ', 'Resting on the beat and attacking off it')] },
          { prompt: t('为什么说反拍本身就是一种切分？', 'なぜバックビート自体がシンコペーションなの？', 'Why is the backbeat itself a kind of syncopation?'), options: [t('重音放在本来较弱的 2、4 拍上', '本来弱い 2・4 拍にアクセントを置くから', 'It accents the normally weaker beats 2 and 4'), t('它改变了拍号', '拍子記号を変えるから', 'It changes the time signature'), t('它让速度变快', 'テンポを速くするから', 'It speeds up the tempo'), t('它只用三连音', '3 連符しか使わないから', 'It only uses triplets')] },
        ],
        answer: 0,
        explain: t('切分 = 打破节拍层次：重音落在较弱的位置；连音线、附点、休止、力度和反拍都能做到。', 'シンコペーション = 拍の階層を崩すこと：弱い位置のアクセント。タイ・付点・休符・強弱・バックビートで生まれる。', 'Syncopation breaks the metric hierarchy by accenting weaker positions — via ties, dots, rests, dynamics or the backbeat.'),
      },
      {
        id: 'b41-c4', type: 'tap', skills: ['hearing'], ref: 'omt2e-swing', bpm: 84, cycle: 4, cycles: 2,
        variants: [
          { prompt: t('左手（F 键或左边的按钮）打 1、3 拍，右手（J 键或右边的按钮）打 2、4 拍的反拍。先听预备拍，再打两小节。', '左手（F キーか左のボタン）で 1・3 拍、右手（J キーか右のボタン）で 2・4 拍のバックビート。予備拍を聴いてから 2 小節叩こう。', 'Left hand (F or the left pad) on beats 1 and 3, right hand (J or the right pad) on the backbeat, 2 and 4. Listen to the count-in, then tap two bars.'), hands: { left: [0, 2, 4, 6], right: [1, 3, 5, 7] } },
          { prompt: t('右手（J 键或右边的按钮）打摇摆八分（每拍前长后短，约 2:1），左手（F 键或左边的按钮）打 2、4 拍。先听预备拍，再打两小节。', '右手（J キーか右のボタン）でスウィング 8 分（各拍前長後短、約 2:1）、左手（F キーか左のボタン）で 2・4 拍。予備拍を聴いてから 2 小節。', 'Right hand (J or the right pad) plays swing eighths (long–short, about 2:1), left hand (F or the left pad) beats 2 and 4. Listen to the count-in, then tap two bars.'), hands: { right: [0, 1, 2, 3, 4, 5, 6, 7].flatMap((b) => [b, b + 2 / 3]), left: [1, 3, 5, 7] } },
        ],
        breakthrough: { id: 'b41-backbeat', text: t('你的手打在了 2、4 拍上——这就是爵士的律动。', '手が 2・4 拍に乗った——これがジャズのグルーヴ。', 'Your hands landed on 2 and 4 — that is the jazz groove.') },
      },
      G('b41-g1', 'noteValue', 1, ['calc']),
      G('b41-g2', 'meterClass', 1, ['identify']),
    ],
    lab: [{ id: 'b41-lab', type: 'lab', lab: 'rhythm-sync-2bars', mandatory: true, minutes: 4 }],
  },
  pool: [G('b41-p1', 'noteValue', 3, ['calc']), G('b41-p2', 'meterClass', 3, ['identify'])],
};

// ===================== B4-2 布鲁斯：形式、音阶与和声 =====================
const BLUES_C = ['C7', 'C7', 'C7', 'C7', 'F7', 'F7', 'C7', 'C7', 'G7', 'F7', 'C7', 'C7'].map((s) => V[s]);
export const LEVEL_B4_2 = {
  minutes: 13,
  insight: t('布鲁斯里每个和弦都可以是属七，最后靠 IV–I 收束——和古典靠 V–I 完全不同。', 'ブルースではどの和音も属七でよく、最後は IV–I で閉じる——V–I で閉じるクラシックとはまったく違う。', 'In the blues every chord can be a dominant seventh, and the close comes from IV–I — completely unlike classical V–I.'),
  sections: {
    discover: [
      {
        id: 'b42-d1', type: 'discover', ref: 'omt2e-blues-harmony',
        prompt: t('听一遍十二小节布鲁斯（每小节两拍一个和弦，听起来更快）。C7、F7、G7 全是属七。最后一句 G7–F7–C7：它靠哪一步"回家"？', '12 小節ブルースを 1 回（1 小節 2 拍で速め）。C7・F7・G7 はすべて属七。最後のフレーズ G7–F7–C7 はどの一歩で「家に帰る」？', 'Hear a 12-bar blues (two beats per bar to keep it brisk). C7, F7 and G7 are all dominant sevenths. In the last phrase, G7–F7–C7, which step brings it home?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: { chords: BLUES_C, gap: 700 } }],
        options: [t('F7–C7：IV–I（变格终止）', 'F7–C7：IV–I（変格終止）', 'F7–C7: IV–I (a plagal close)'), t('G7–C7：V–I', 'G7–C7：V–I', 'G7–C7: V–I'), t('根本没有回家', 'まったく帰らない', 'It never gets home')],
        answer: 0,
        insight: {
          title: t('属七不一定是"属"', '属七が「属」とは限らない', 'A dominant seventh needn’t be dominant'),
          text: t('布鲁斯里所有和弦都是属七，属七可以当主、当下属、当属；结构上靠变格终止（IV–I）收束，而不是正格终止；大三度和小三度自由混用。十二小节分三句：I I I I ｜ IV IV I I ｜ V IV I I。', 'ブルースではすべての和音が属七で、属七が主にも下属にも属にもなる。構造上の終止は正格ではなく変格（IV–I）。長 3 度と短 3 度を自由に混ぜる。12 小節は 3 フレーズ：I I I I ｜ IV IV I I ｜ V IV I I。', 'In the blues every chord is a dominant seventh, and dominant sevenths can serve as tonic, subdominant or dominant; structural closure comes from plagal (IV–I) rather than authentic cadences; major and minor thirds mix freely. Twelve bars, three phrases: I I I I | IV IV I I | V IV I I.'),
        },
      },
    ],
    explain: [
      {
        id: 'b42-e1', type: 'page', ref: ['omt2e-blues-harmony', 'wiki-twelve-bar'],
        title: t('一个"框架"，很多种写法', '1 つの「枠組み」、たくさんの書き方', 'One schema, many versions'),
        text: [
          t('布鲁斯是一个框架：很多进行都能看成它的变化。最常见的：第 2 小节先去 IV 再回 I（quick change）；最后一两小节加转回句，从一个 V7 到完整的 III–VI–II–V。还有十六小节布鲁斯（四句、每句四小节）。', 'ブルースは枠組み：多くの進行がその変化と見なせる。よくあるのは 2 小節目で IV へ行って I へ戻る（クイック・チェンジ）、最後の 1–2 小節にターンアラウンド（V7 1 つから III–VI–II–V まで）。16 小節ブルース（4 小節 × 4 フレーズ）もある。', 'The blues is a schema: many progressions are variations of it. Most common: bar 2 visits IV and returns to I (the quick change); a turnaround in the last bar or two, from a single V7 to a full III–VI–II–V. There is also the 16-bar blues (four 4-bar phrases).'),
          t('小调布鲁斯：i 和 iv 是小七和弦，V 仍是属七；因为大三的 V 到小三的 iv 听起来泄气，第三句常换成 ii–V–i。爵士布鲁斯则在里面加了好几组 ii–V。', 'マイナー・ブルース：i と iv は短七、V は属七のまま。長三の V から短三の iv は拍子抜けに聞こえるので、第 3 フレーズはよく ii–V–i に。ジャズ・ブルースは ii–V をいくつも加える。', 'Minor blues: i and iv are minor sevenths, V stays dominant; since major V to minor iv can sound anticlimactic, the third phrase usually becomes ii–V–i. The jazz blues adds several ii–Vs.'),
        ],
        tool: { feature: 'blues' },
      },
      {
        id: 'b42-e2', type: 'page', ref: 'omt2e-blues-scale',
        title: t('布鲁斯音阶与"应答"', 'ブルース・スケールと「コール・アンド・レスポンス」', 'The blues scale and call-and-response'),
        text: [
          t('布鲁斯音阶 = 小调五声音阶加一个半音经过音：do–me–fa–fi–sol–te。从它的第二个音开始转一下，得到大调布鲁斯音阶：do–re–ri–mi–sol–la，和大三和弦冲突更小。', 'ブルース・スケール = マイナー・ペンタトニック + 半音の経過音：do–me–fa–fi–sol–te。2 つ目の音から回すとメジャー・ブルース・スケール：do–re–ri–mi–sol–la、長三和音とぶつかりにくい。', 'The blues scale is a minor pentatonic with an added chromatic passing tone: do–me–fa–fi–sol–te. Rotated to begin on its second note it becomes the major blues scale, do–re–ri–mi–sol–la, which clashes less with major chords.'),
          t('有歌词的布鲁斯常是 aab：第一句唱完再重复一次，第三句对比。旋律常常留下空当，让乐器来"应答"。', '歌詞のあるブルースはよく aab：1 行目をくり返し、3 行目が対比。旋律はよく隙間を空け、楽器が「応える」。', 'Sung blues often use aab lyrics: a line, its repeat, then a contrasting line. Melodies leave gaps for instruments to answer — call and response.'),
        ],
      },
      {
        id: 'b42-e3', type: 'discover', practice: true, ref: 'omt2e-blues-harmony',
        prompt: t('C 小调布鲁斯的第三句，最常见的写法是？', 'ハ短調ブルースの第 3 フレーズでよくあるのは？', 'In a C minor blues, the third phrase most often goes…'),
        options: ['Dø7 – G7 – Cm7', 'G7 – Fm7 – Cm7', 'F7 – C7 – G7'],
        answer: 0,
        insight: { title: t('小调布鲁斯用 ii–V–i', 'マイナー・ブルースは ii–V–i', 'Minor blues uses ii–V–i'), text: t('大三的 V 走到小三的 iv 听起来泄气，所以第三句常换成 ii–V–i。', '長三の V から短三の iv は拍子抜けなので、第 3 フレーズは ii–V–i に。', 'Major V to minor iv sounds anticlimactic, so the third phrase usually becomes ii–V–i.') },
      },
    ],
    experiment: [
      { id: 'b42-x1', type: 'experiment', toy: 'blues', ref: ['omt2e-blues-harmony', 'wiki-twelve-bar', 'omt2e-blues-scale'],
        prompt: t('换几种布鲁斯形式，播放时看着小节走；再听布鲁斯音阶和大调布鲁斯音阶。哪个音是"多加"的那个半音？', 'ブルースの形を替え、再生しながら小節を追おう。ブルース・スケールとメジャー・ブルース・スケールも聴こう。「足された」半音はどれ？', 'Switch blues forms and follow the bars as it plays; then hear the blues and major blues scales. Which note is the added half step?'),
        params: {},
        breakthrough: { id: 'b42-twelve', text: t('十二小节在你手里走了一圈。', '12 小節が手の中で一巡した。', 'You took the twelve bars all the way round.') } },
    ],
    challenge: [
      {
        id: 'b42-c1', type: 'choice', error: 'blues-form', skills: ['identify'], ref: 'omt2e-blues-harmony',
        variants: [
          { prompt: t('基本十二小节布鲁斯的第二句（第 5–8 小节）是？', '基本の 12 小節ブルースの第 2 フレーズ（5–8 小節）は？', 'In a basic 12-bar blues, the second phrase (bars 5–8) is…'), options: ['IV IV I I', 'I I I I', 'V IV I I', 'IV V I I'] },
          { prompt: t('基本十二小节布鲁斯的第三句（第 9–12 小节）是？', '基本の 12 小節ブルースの第 3 フレーズ（9–12 小節）は？', 'In a basic 12-bar blues, the third phrase (bars 9–12) is…'), options: ['V IV I I', 'IV IV I I', 'I I I I', 'ii V I I'] },
          { prompt: t('"quick change"指的是？', '「クイック・チェンジ」とは？', 'The “quick change” means…'), options: [t('第 2 小节先去 IV 再回 I', '2 小節目で IV へ行って I へ戻る', 'Going to IV in bar 2, then back to I'), t('最后一小节换成 V', '最後の小節を V に', 'Ending on V'), t('全部换成小七和弦', 'すべて短七に', 'Making every chord minor'), t('加快速度', 'テンポを上げる', 'Speeding up')] },
        ],
        answer: 0,
        explain: t('三句：I I I I ｜ IV IV I I ｜ V IV I I；quick change 在第 2 小节用 IV。', '3 フレーズ：I I I I ｜ IV IV I I ｜ V IV I I。クイック・チェンジは 2 小節目に IV。', 'Three phrases: I I I I | IV IV I I | V IV I I; the quick change puts IV in bar 2.'),
      },
      {
        id: 'b42-c2', type: 'choice', error: 'blues-form', skills: ['function'], ref: 'omt2e-blues-harmony',
        variants: [
          { prompt: t('布鲁斯和古典和声最大的不同之一是？', 'ブルースとクラシックの和声の大きな違いの 1 つは？', 'One of the biggest differences between blues and classical harmony is…'), options: [t('属七和弦可以有任何功能', '属七がどんな機能にもなれる', 'Dominant sevenths can have any function'), t('布鲁斯不用七和弦', 'ブルースは七の和音を使わない', 'The blues avoids seventh chords'), t('布鲁斯只用小三和弦', 'ブルースは短三和音だけ', 'The blues uses only minor triads'), t('布鲁斯一定以 V–I 结束', 'ブルースは必ず V–I で終わる', 'The blues always ends V–I')] },
          { prompt: t('小调布鲁斯里，V 是什么和弦？', 'マイナー・ブルースの V は？', 'In a minor blues, V is…'), options: [t('仍是属七', '属七のまま', 'still a dominant seventh'), t('小七', '短七', 'a minor seventh'), t('大七', '長七', 'a major seventh'), t('减七', '減七', 'a diminished seventh')] },
        ],
        answer: 0,
        explain: t('布鲁斯里属七可以当主、下属、属；小调布鲁斯的 i、iv 是小七，V 仍是属七。', 'ブルースの属七は主・下属・属のどれにも。マイナー・ブルースの i・iv は短七、V は属七のまま。', 'Blues dominant sevenths serve any function; in a minor blues i and iv are minor sevenths while V stays dominant.'),
      },
      {
        id: 'b42-c3', type: 'choice', error: 'scale-pattern', skills: ['spell'], ref: 'omt2e-blues-scale',
        variants: [
          { prompt: t('C 布鲁斯音阶是？', 'C ブルース・スケールは？', 'The C blues scale is…'), options: ['C E♭ F G♭ G B♭', 'C D E G A', 'C D E♭ E G A', 'C E F G B'] },
          { prompt: t('C 大调布鲁斯音阶是？', 'C メジャー・ブルース・スケールは？', 'The C major blues scale is…'), options: ['C D E♭ E G A', 'C E♭ F G♭ G B♭', 'C D E F G A B', 'C D E G A'] },
        ],
        answer: 0,
        explain: t('布鲁斯音阶 do–me–fa–fi–sol–te；大调布鲁斯音阶 do–re–ri–mi–sol–la。', 'ブルース・スケール do–me–fa–fi–sol–te、メジャー・ブルース do–re–ri–mi–sol–la。', 'Blues scale do–me–fa–fi–sol–te; major blues scale do–re–ri–mi–sol–la.'),
      },
      G('b42-g1', 'twelveBar', 2, ['identify']),
      G('b42-g2', 'bluesScale', 1, ['spell']),
    ],
  },
  pool: [G('b42-p1', 'twelveBar', 3, ['identify']), G('b42-p2', 'bluesScale', 3, ['spell'])],
};

// ===================== B4-3 ii–V–I 与和弦—音阶 =====================
export const LEVEL_B4_3 = {
  minutes: 13,
  insight: t('Dm13 的七个音就是 D Dorian：把和弦叠到十三音，就得到一个调式。', 'Dm13 の 7 音は D ドリアンそのもの：和音を 13th まで積むと旋法になる。', 'The seven notes of Dm13 are D Dorian: stack a chord to the 13th and you have a mode.'),
  sections: {
    discover: [
      {
        id: 'b43-d1', type: 'discover', ref: 'omt2e-chord-scale',
        prompt: t('先听 Dm13（D F A C E G B 叠在一起），再听 D Dorian 音阶。两者的音有什么关系？', 'まず Dm13（D F A C E G B を重ねる）、次に D ドリアン。2 つの音の関係は？', 'Hear Dm13 (D F A C E G B stacked), then the D Dorian scale. How do their notes relate?'),
        play: [{ label: 'Dm13', audio: { notes: [50, 53, 57, 60, 64, 67, 71], mode: 'harmonic' } }, { label: 'D Dorian', audio: { notes: [62, 64, 65, 67, 69, 71, 72, 74], mode: 'melody' } }],
        options: [t('完全是同一组音：一个竖着叠，一个横着排', 'まったく同じ音：縦に積むか横に並べるか', 'Exactly the same notes: one stacked, one in a row'), t('毫无关系', '関係ない', 'No relation'), t('音阶多出三个音', '音階は 3 音多い', 'The scale has three extra notes')],
        answer: 0,
        insight: {
          title: t('和弦和音阶是一组音的两种排法', '和音と音階は同じ音の 2 通りの並べ方', 'A chord and a scale are two arrangements of one set'),
          text: t('和弦—音阶理论的出发点：十三和弦的七个音重新排列就是一个七声音阶。所以遇到 Dm7，可以用 D Dorian 的音来即兴。它由 Berklee 等学校教授，源自 George Russell 的 Lydian Chromatic Concept。', 'コード・スケール理論の出発点：13th コードの 7 音を並べ直すと七音音階になる。だから Dm7 では D ドリアンの音で即興できる。バークリーなどで教えられ、George Russell の Lydian Chromatic Concept に由来する。', 'Chord-scale theory starts here: the seven notes of a thirteenth chord, rearranged, form a seven-note scale. So over Dm7 you can improvise with D Dorian. Taught at Berklee and elsewhere, it grew out of George Russell’s Lydian Chromatic Concept.'),
        },
      },
    ],
    explain: [
      {
        id: 'b43-e1', type: 'page', ref: 'omt2e-iivi',
        title: t('ii–V–I 的样子', 'ii–V–I の姿', 'What a ii–V–I looks like'),
        text: [
          t('大调：mi7–7–ma7（Dm7–G7–Cmaj7）；小调：ø7–7–mi7（Dø7–G7–Cm7）——V 在大小调都是属七。认它靠两样东西：根音五度进行，加上这串特有的和弦性质。', '長調：mi7–7–ma7（Dm7–G7–Cmaj7）、短調：ø7–7–mi7（Dø7–G7–Cm7）——V は長調でも短調でも属七。見分けるには、根音の 5 度進行とこの和音の種類の並び。', 'Major: mi7–7–ma7 (Dm7–G7–Cmaj7); minor: ø7–7–mi7 (Dø7–G7–Cm7) — V is dominant either way. You spot it by root motion in fifths plus that distinctive sequence of qualities.'),
          t('ii–V 也可以拿到别的调去，暂时离调到另一个和弦：例如《Afternoon in Paris》A 段先在 B♭ 大调、再在 A♭ 大调上做 ii–V–I。', 'ii–V は別の調へ持って行き、一時的に別の和音をトニックにできる：たとえば《Afternoon in Paris》の A セクションは B♭ 長調、次に A♭ 長調で ii–V–I。', 'A ii–V can also be applied to another key to tonicize a different chord: the A section of “Afternoon in Paris” does ii–V–I in B♭ major and then in A♭ major.'),
        ],
        tool: { feature: 'cst' },
      },
      {
        id: 'b43-e2', type: 'page', ref: 'omt2e-chord-scale',
        title: t('罗马数字决定调式', 'ローマ数字が旋法を決める', 'The Roman numeral picks the mode'),
        text: [
          t('大调里：I → Ionian，ii → Dorian，iii → Phrygian，IV → Lydian，V → Mixolydian，vi → Aeolian，viiø → Locrian。即兴时把和弦音放在强拍上，其余三个音当经过音或延伸音。', '長調で：I → イオニアン、ii → ドリアン、iii → フリジアン、IV → リディアン、V → ミクソリディアン、vi → エオリアン、viiø → ロクリアン。即興では和声音を強拍に、残り 3 音は経過音か拡張音に。', 'In major: I → Ionian, ii → Dorian, iii → Phrygian, IV → Lydian, V → Mixolydian, vi → Aeolian, viiø → Locrian. Put chord tones on the strong beats; the other three notes act as passing tones or extensions.'),
          t('注意：这不表示每换一个和弦就换了调。《Fly Me to the Moon》开头一串五度进行都在 C 大调里，所以 Am7（vi）用 Aeolian、Dm7（ii）用 Dorian，同样是小七和弦，调式不同。', '注意：和音が変わるたびに転調するわけではない。《Fly Me to the Moon》冒頭の 5 度進行はすべてハ長調なので、Am7（vi）はエオリアン、Dm7（ii）はドリアン。同じ短七でも旋法が違う。', 'Careful: this doesn’t mean the key changes with every chord. The opening circle-of-fifths progression of “Fly Me to the Moon” stays in C, so Am7 (vi) takes Aeolian and Dm7 (ii) Dorian — same quality, different modes.'),
        ],
      },
      {
        id: 'b43-e3', type: 'discover', practice: true, ref: 'omt2e-chord-scale',
        prompt: t('在 C 大调的进行里遇到 Am7（vi），和弦—音阶理论配哪个调式？', 'ハ長調の進行で Am7（vi）に合う旋法は？', 'In a C major progression, which mode colours Am7 (vi)?'),
        options: ['A Aeolian', 'A Dorian', 'A Phrygian'],
        answer: 0,
        insight: { title: t('看功能，不只看性质', '種類だけでなく機能を見る', 'Look at function, not just quality'), text: t('Am7 在 C 大调是 vi，对应第六个调式 Aeolian（A B C D E F G）；只看"小七和弦"就配 Dorian，会带出调外的 F♯。', 'Am7 はハ長調の vi なので第 6 旋法エオリアン（A B C D E F G）。「短七」だけ見てドリアンにすると調外の F♯ が出る。', 'Am7 is vi in C, so it takes the sixth mode, Aeolian (A B C D E F G); choosing Dorian just because it is minor would add an out-of-key F♯.') },
      },
    ],
    experiment: [
      { id: 'b43-x1', type: 'experiment', toy: 'chordScale', ref: 'omt2e-chord-scale',
        prompt: t('在 C 大调里点每一级的七和弦，看它叠到十三音之后是哪个调式，再听和弦和音阶。哪一级配 Lydian？', 'ハ長調の各度の七の和音を押し、13th まで積むとどの旋法かを見て、和音と音階を聴こう。リディアンはどの度？', 'Tap each seventh chord in C, see which mode it becomes when stacked to the 13th, and hear chord and scale. Which degree takes Lydian?'),
        params: {},
        breakthrough: { id: 'b43-modes', text: t('七个和弦、七个调式，你把它们一一对上了。', '7 つの和音と 7 つの旋法を、1 つずつ対応させた。', 'Seven chords, seven modes — you matched them one by one.') } },
    ],
    challenge: [
      {
        id: 'b43-c1', type: 'choice', error: 'wrong-function', skills: ['identify'], ref: 'omt2e-iivi',
        variants: [
          { prompt: t('小调 ii–V–I 的和弦性质依次是？', '短調の ii–V–I の和音の種類は順に？', 'The chord qualities of a minor ii–V–I, in order, are…'), options: ['ø7 – 7 – mi7', 'mi7 – 7 – ma7', 'mi7 – mi7 – mi7', '°7 – 7 – ma7'] },
          { prompt: t('E♭ 大调的 ii–V–I 是？', '変ホ長調の ii–V–I は？', 'ii–V–I in E♭ major is…'), options: ['Fm7 – B♭7 – E♭maj7', 'Fm7 – B♭maj7 – E♭7', 'B♭m7 – E♭7 – A♭maj7', 'Fø7 – B♭7 – E♭m7'] },
          { prompt: t('怎样最快认出一个 ii–V–I？', 'ii–V–I を一番早く見分けるには？', 'The quickest way to recognise a ii–V–I is…'), options: [t('根音五度进行 + mi7–7–ma7（或 ø7–7–mi7）的性质', '根音の 5 度進行 + mi7–7–ma7（または ø7–7–mi7）の種類', 'Root motion by fifths + the qualities mi7–7–ma7 (or ø7–7–mi7)'), t('看第一个和弦的根音', '最初の和音の根音を見る', 'Look at the first chord’s root'), t('数一共有几个音', '音の数を数える', 'Count the notes'), t('看最高音', '最高音を見る', 'Look at the top note')] },
        ],
        answer: 0,
        explain: t('大调 mi7–7–ma7、小调 ø7–7–mi7，根音按五度下行。', '長調 mi7–7–ma7、短調 ø7–7–mi7、根音は 5 度下行。', 'Major mi7–7–ma7, minor ø7–7–mi7, roots falling by fifths.'),
      },
      {
        id: 'b43-c2', type: 'choice', error: 'chord-scale', skills: ['apply'], ref: 'omt2e-chord-scale',
        variants: [
          { prompt: t('大调里的 IVmaj7，按和弦—音阶理论配哪个调式？', '長調の IVmaj7 に合う旋法は？', 'In major, which mode colours IVmaj7?'), options: ['Lydian', 'Ionian', 'Mixolydian', 'Dorian'] },
          { prompt: t('大调里的 V7，按和弦—音阶理论配哪个调式？', '長調の V7 に合う旋法は？', 'In major, which mode colours V7?'), options: ['Mixolydian', 'Lydian', 'Aeolian', 'Ionian'] },
          { prompt: t('大调里的 iii7，按和弦—音阶理论配哪个调式？', '長調の iii7 に合う旋法は？', 'In major, which mode colours iii7?'), options: ['Phrygian', 'Dorian', 'Aeolian', 'Locrian'] },
        ],
        answer: 0,
        explain: t('调式的序号 = 罗马数字的级数：IV → 第四个调式 Lydian，V → Mixolydian，iii → Phrygian。', '旋法の番号 = ローマ数字の度数：IV → 第 4 旋法リディアン、V → ミクソリディアン、iii → フリジアン。', 'Mode number = scale degree: IV → the fourth mode, Lydian; V → Mixolydian; iii → Phrygian.'),
      },
      {
        id: 'b43-c3', type: 'choice', error: 'concept', skills: ['apply'], ref: 'omt2e-chord-scale',
        variants: [
          { prompt: t('用和弦—音阶即兴时，哪些音最好放在强拍上？', 'コード・スケールで即興するとき、強拍に置くとよいのは？', 'When improvising with chord-scales, which notes belong on the strong beats?'), options: [t('和弦音', '和声音', 'Chord tones'), t('音阶里不在和弦里的音', '和音にない音階音', 'Scale tones outside the chord'), t('调外的半音', '調外の半音', 'Chromatic notes outside the key'), t('越高越好', '高いほどよい', 'The highest notes')] },
          { prompt: t('和弦—音阶理论常被指出的一个局限是？', 'コード・スケール理論の限界としてよく指摘されるのは？', 'A frequently noted limitation of chord-scale theory is…'), options: [t('容易忽略和弦之间的声部进行', '和音間の声部進行を見落としやすい', 'It can neglect voice leading between chords'), t('它不能用于小七和弦', '短七に使えない', 'It can’t handle minor sevenths'), t('它只适用于古典音乐', 'クラシックにしか使えない', 'It only applies to classical music'), t('它没有音阶', '音階がない', 'It has no scales')] },
        ],
        answer: 0,
        explain: t('和弦音放在强拍上才能把旋律和进行连起来；只看单个和弦，容易每个和弦都当成新调、忽略声部进行。', '和声音を強拍に置くと旋律が進行とつながる。和音ごとに見ると、毎回新しい調のように扱い声部進行を見落としやすい。', 'Chord tones on strong beats tie the line to the changes; looking at chords one by one tends to treat each as a new key and ignore voice leading.'),
      },
      G('b43-g1', 'chordScaleDegree', 2, ['apply']),
      G('b43-g2', 'iiVI', 1, ['spell']),
    ],
  },
  pool: [G('b43-p1', 'chordScaleDegree', 3, ['apply']), G('b43-p2', 'iiVI', 3, ['spell'])],
};

// ===================== B4-4 导向音、调性中心与进行分析 =====================
export const LEVEL_B4_4 = {
  minutes: 13,
  insight: t('ii–V–I 的三音和七音连成两条线，每一步只动半音或不动：耳朵其实是跟着这两条线走的。', 'ii–V–I の 3 度と 7 度は 2 本の線になり、1 歩ごとに半音動くか動かない：耳は実はこの 2 本の線を追っている。', 'The 3rds and 7ths of a ii–V–I form two lines that move by half step or not at all: your ear is really following those two lines.'),
  sections: {
    discover: [
      {
        id: 'b44-d1', type: 'discover', ref: 'omt2e-jazz-voicings',
        prompt: t('只听低音和上面两个音：Dm7 → G7 → Cmaj7。上面两个音一共动了几步？', 'バスと上の 2 音だけ：Dm7 → G7 → Cmaj7。上の 2 音は合計何歩動いた？', 'Hear just the bass and two upper notes: Dm7 → G7 → Cmaj7. How far do the two upper notes move?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: { chords: [[50, 65, 72], [43, 65, 71], [48, 64, 71]], gap: 1000 } }],
        options: [t('几乎不动：C→B、F→E，各走一个半音', 'ほとんど動かない：C→B、F→E、それぞれ半音 1 つ', 'Hardly at all: C→B and F→E, a half step each'), t('每一步都跳八度', '毎回オクターヴ跳躍', 'An octave leap each time'), t('它们跟着低音一起跳', 'バスと一緒に跳ぶ', 'They leap with the bass')],
        answer: 0,
        insight: {
          title: t('3–7 声部进行', '3–7 の声部進行', 'The 3–7 voice-leading paradigm'),
          text: t('只用两个上方声部时，用和弦的三音和七音（省略五音）。根音五度关系时（如 ii–V–I），一条线在三音与七音之间交替，另一条反过来；根音二度关系时，两条线平行。右手里只会出现四度和五度两种音程。', '上声 2 つなら和音の 3 度と 7 度（5 度は省く）。根音が 5 度関係（ii–V–I など）なら 1 本は 3 度と 7 度を交互に、もう 1 本はその逆。2 度関係なら 2 本は平行。右手には 4 度と 5 度の 2 種類の音程しか出ない。', 'With two upper voices, use each chord’s 3rd and 7th (omit the 5th). When roots are a fifth apart (as in ii–V–I), one line alternates 3rd and 7th and the other does the reverse; when roots are a second apart, the lines move in parallel. The right hand then only ever plays fourths and fifths.'),
        },
      },
    ],
    explain: [
      {
        id: 'b44-e1', type: 'page', ref: ['omt2e-iivi', 'wiki-turnaround'],
        title: t('调性中心：一段进行在哪个调', '調性の中心：その進行は何調か', 'Key centres: which key is a passage in?'),
        text: [
          t('爵士曲子常常在几段 ii–V–I 之间换调性中心。先找 ii–V（mi7 接一个根音低五度的 7），它指向的 I 就是这段的调性中心——即使 I 没有真的出现。', 'ジャズの曲はよく ii–V–I ごとに調性の中心が変わる。まず ii–V（mi7 から根音が 5 度下の 7）を探す。それが指す I がその部分の中心——I が実際に出なくても。', 'Jazz tunes often shift key centre from one ii–V–I to the next. Find the ii–V (a mi7 moving to a 7 a fifth below); the I it points to is that passage’s key centre — even if the I never arrives.'),
          t('转回句（turnaround）把乐句引回开头，常见的有 I–vi–ii–V、I–VI–II–V（= I–V/ii–V/V–V）、布鲁斯的 V–IV–I。', 'ターンアラウンドはフレーズを冒頭へ戻す：I–vi–ii–V、I–VI–II–V（= I–V/ii–V/V–V）、ブルースの V–IV–I など。', 'A turnaround leads back to the top: common ones are I–vi–ii–V, I–VI–II–V (= I–V/ii–V/V–V) and the blues V–IV–I.'),
        ],
        tool: { feature: 'circle' },
      },
      {
        id: 'b44-e2', type: 'discover', practice: true, ref: 'omt2e-iivi',
        prompt: t('Cm7 – F7 – B♭maj7 这一段的调性中心是？', 'Cm7 – F7 – B♭maj7 の調性の中心は？', 'What is the key centre of Cm7 – F7 – B♭maj7?'),
        options: [t('B♭ 大调', '変ロ長調', 'B♭ major'), t('C 小调', 'ハ短調', 'C minor'), t('F 大调', 'ヘ長調', 'F major')],
        answer: 0,
        insight: { title: t('ii–V 指向 I', 'ii–V は I を指す', 'A ii–V points to its I'), text: t('Cm7–F7 是 B♭ 大调的 ii–V，所以这一段在 B♭ 大调——哪怕整首曲子是别的调。', 'Cm7–F7 は変ロ長調の ii–V なので、この部分は変ロ長調——曲全体が別の調でも。', 'Cm7–F7 is ii–V in B♭, so this passage is in B♭ major — even if the tune as a whole is in another key.') },
      },
    ],
    experiment: [
      { id: 'b44-x1', type: 'experiment', toy: 'guide', ref: 'omt2e-jazz-voicings',
        prompt: t('选一个进行，只留低音和三音 / 七音，看两条线怎么走；再加上九音 / 十三音的线。V–IV–I 里两条线是交替还是平行？', '進行を選び、バスと 3 度 / 7 度だけで 2 本の線の動きを見よう。次に 9th / 13th の線を足す。V–IV–I では 2 本は交互？ 平行？', 'Pick a progression and keep just the bass and the 3rds/7ths to watch the two lines; then add the 9th/13th line. In V–IV–I, do the lines alternate or move in parallel?'),
        params: { layers: ['bass', 'guide'] },
        breakthrough: { id: 'b44-lines', text: t('你看见了藏在和弦里的两条线。', '和音に隠れた 2 本の線が見えた。', 'You saw the two lines hidden inside the chords.') } },
    ],
    challenge: [
      {
        id: 'b44-c1', type: 'choice', error: 'missing-guide-tone', skills: ['voiceLeading'], ref: 'omt2e-jazz-voicings',
        variants: [
          { prompt: t('G7 → Cmaj7 时，G7 的七音 F 最顺的走法是？', 'G7 → Cmaj7 で、G7 の 7 度 F の一番なめらかな行き先は？', 'From G7 to Cmaj7, the smoothest move for G7’s seventh, F, is…'), options: [t('下行半音到 E（Cmaj7 的三音）', '半音下の E（Cmaj7 の 3 度）へ', 'Down a half step to E (Cmaj7’s 3rd)'), t('上行到 G', 'G へ上行', 'Up to G'), t('跳到 C', 'C へ跳躍', 'Leap to C'), t('保持不动', 'そのまま', 'Stay')] },
          { prompt: t('Dm7 → G7 时，Dm7 的三音 F 怎么走最顺？', 'Dm7 → G7 で、Dm7 の 3 度 F は？', 'From Dm7 to G7, how does Dm7’s third, F, move most smoothly?'), options: [t('保持不动，变成 G7 的七音', 'そのまま G7 の 7 度になる', 'It stays and becomes G7’s seventh'), t('跳到 B', 'B へ跳躍', 'It leaps to B'), t('上行到 G', 'G へ上行', 'It rises to G'), t('下行到 D', 'D へ下行', 'It falls to D')] },
        ],
        answer: 0,
        explain: t('五度进行里三音和七音互换角色：Dm7 的 F（三音）留下当 G7 的七音，G7 的 F（七音）下行半音到 Cmaj7 的三音 E。', '5 度進行では 3 度と 7 度が役割を交換：Dm7 の F（3 度）が残って G7 の 7 度に、G7 の F（7 度）は半音下の Cmaj7 の 3 度 E へ。', 'In fifth motion 3rds and 7ths trade roles: Dm7’s F (third) stays as G7’s seventh, then G7’s F (seventh) falls a half step to E, Cmaj7’s third.'),
      },
      {
        id: 'b44-c2', type: 'choice', error: 'key-center', skills: ['function'], ref: ['omt2e-iivi', 'wiki-turnaround'],
        variants: [
          { prompt: t('Am7 – D7 – Gmaj7 这一段的调性中心是？', 'Am7 – D7 – Gmaj7 の調性の中心は？', 'What is the key centre of Am7 – D7 – Gmaj7?'), options: [t('G 大调', 'ト長調', 'G major'), t('A 小调', 'イ短調', 'A minor'), t('D 大调', 'ニ長調', 'D major'), t('C 大调', 'ハ長調', 'C major')] },
          { prompt: t('I–VI–II–V 的转回句里，VI 和 II 其实是？', 'ターンアラウンド I–VI–II–V の VI と II は？', 'In the turnaround I–VI–II–V, VI and II are really…'), options: [t('应用属和弦：V/ii 和 V/V', '副属和音：V/ii と V/V', 'applied dominants: V/ii and V/V'), t('借用和弦：♭VI 和 ♭II', '借用和音：♭VI と ♭II', 'borrowed chords ♭VI and ♭II'), t('主和弦', '主和音', 'tonic chords'), t('减七和弦', '減七', 'diminished sevenths')] },
        ],
        answer: 0,
        explain: t('ii–V 指向的 I 就是调性中心；I–VI–II–V = I–V/ii–V/V–V。', 'ii–V が指す I が中心。I–VI–II–V = I–V/ii–V/V–V。', 'The I a ii–V points to is the key centre; I–VI–II–V = I–V/ii–V/V–V.'),
      },
      {
        id: 'b44-c3', type: 'choice', error: 'missing-guide-tone', skills: ['identify'], ref: 'omt2e-jazz-voicings',
        variants: [
          { prompt: t('只用两个上方声部配和弦时，用哪两个音？', '上声 2 つで和音をつけるなら、どの 2 音？', 'With only two upper voices, which two chord tones do you use?'), options: [t('三音和七音', '3 度と 7 度', 'The 3rd and 7th'), t('根音和五音', '根音と 5 度', 'The root and 5th'), t('五音和九音', '5 度と 9 度', 'The 5th and 9th'), t('根音和三音', '根音と 3 度', 'The root and 3rd')] },
          { prompt: t('根音二度关系的两个和弦（如 F7–G7），三音和七音的两条线怎么走？', '根音が 2 度関係の 2 つの和音（F7–G7 など）では、3 度と 7 度の線は？', 'For two chords whose roots are a second apart (e.g. F7–G7), how do the 3rd and 7th lines move?'), options: [t('平行移动', '平行に動く', 'In parallel'), t('交替互换', '交互に入れ替わる', 'They alternate'), t('都不动', 'どちらも動かない', 'Neither moves'), t('一条上一条下跳八度', '1 本が上、1 本が下へオクターヴ跳躍', 'One leaps up an octave, one down')] },
        ],
        answer: 0,
        explain: t('三音和七音决定和弦的性质；五度关系交替、二度关系平行。', '3 度と 7 度が和音の種類を決める。5 度関係は交互、2 度関係は平行。', 'The 3rd and 7th define the quality; fifth-related chords alternate, second-related chords move in parallel.'),
      },
      G('b44-g1', 'guideTones', 2, ['identify']),
      G('b44-g2', 'keyCenter', 1, ['function']),
    ],
  },
  pool: [G('b44-p1', 'guideTones', 3, ['identify']), G('b44-p2', 'keyCenter', 3, ['function']), G('b44-p3', 'iiVI', 2, ['spell'])],
};

// ===================== B4-5 爵士配置 =====================
export const LEVEL_B4_5 = {
  minutes: 18, core: true,
  insight: t('省掉五音几乎听不出差别，省掉七音就变了另一个和弦：和弦的身份在三音和七音里。', '5 度を省いてもほとんど変わらないが、7 度を省くと別の和音になる：和音の正体は 3 度と 7 度にある。', 'Leave out the fifth and you barely notice; leave out the seventh and it is a different chord: a chord’s identity lives in its 3rd and 7th.'),
  sections: {
    discover: [
      {
        id: 'b45-d1', type: 'discover', ref: 'omt2e-jazz-voicings',
        prompt: t('三次弹的都是 G7：A 完整（G B D F），B 省掉五音（G B F），C 省掉七音（G B D）。哪一个听起来"变了"？', '3 回とも G7：A は全部（G B D F）、B は 5 度なし（G B F）、C は 7 度なし（G B D）。「変わった」と聞こえるのは？', 'All three are G7: A complete (G B D F), B without the fifth (G B F), C without the seventh (G B D). Which one sounds different?'),
        play: [{ label: 'A', audio: { notes: [43, 59, 62, 65], mode: 'harmonic' } }, { label: 'B', audio: { notes: [43, 59, 65], mode: 'harmonic' } }, { label: 'C', audio: { notes: [43, 59, 62], mode: 'harmonic' } }],
        options: [t('C：没有七音，就只是一个大三和弦了', 'C：7 度がないとただの長三和音', 'C: without the seventh it is just a major triad'), t('B：没有五音完全不像 G7', 'B：5 度なしでは G7 に聞こえない', 'B: without the fifth it no longer sounds like G7'), t('三个一样', '3 つとも同じ', 'All the same')],
        answer: 0,
        insight: {
          title: t('先省五音', 'まず 5 度を省く', 'Omit the fifth first'),
          text: t('最常省略的是五音：它在泛音列里很早出现（第 3 泛音），加强根音，却几乎不添性格。七音和根音很少省——不过有贝斯手弹根音时，上方声部可以故意不弹根音。', '一番よく省くのは 5 度：倍音列の早い位置（第 3 倍音）にあり、根音を強めるが性格はほとんど足さない。7 度と根音はめったに省かない——ただしベースが根音を弾くなら、上声で根音を省いてよい。', 'The fifth is the usual omission: it appears early in the harmonic series (partial 3) and reinforces the root without adding much character. The seventh and root are hardly ever omitted — though with a bassist playing roots, the upper voices may leave the root out on purpose.'),
        },
      },
    ],
    explain: [
      {
        id: 'b45-e1', type: 'page', ref: 'omt2e-jazz-voicings',
        title: t('间距、重复与延伸音', '間隔・重複・拡張音', 'Spacing, doubling and extensions'),
        text: [
          t('间距仿照泛音列：低音区音程宽、高音区音程窄。低音区音挤在一起会发浑；延伸音放在上面，十三音一定要在七音上方，否则听起来像六音。要重复的话，重复低音或根音。', '間隔は倍音列にならう：低音域は広く、高音域は狭く。低音域で音が詰まると濁る。拡張音は上に、13th は必ず 7 度より上（でないと 6th に聞こえる）。重複するならバスか根音。', 'Space chords like the harmonic series: wide intervals low, close intervals high. Close notes in the low register sound muddy; keep extensions on top, and always voice the 13th above the 7th or it sounds like a 6th. If you double, double the bass or the root.'),
          t('声部要"懒"：能保持就保持，其次全音或半音，三度跳进也容易；大跳留给需要对比的地方。三个上方声部的常用做法：3–7 两条线，再在上面加一条连九音和十三音的线，先用调内的延伸音。', '声部は「怠け者」に：保てるなら保ち、次に全音・半音、3 度の跳躍も楽。大跳躍は対比が欲しいところだけ。上声 3 つなら：3–7 の 2 本の線の上に 9th と 13th を結ぶ線を足し、まず調内の拡張音を使う。', 'Make the voices lazy: hold common tones, otherwise move by whole or half step; skips of a third are easy too; save leaps for contrast. With three upper voices: the 3–7 pair plus a top line connecting 9ths and 13ths, starting with the extensions that fit the key.'),
        ],
        tool: { feature: 'jazzmore' },
      },
      {
        id: 'b45-e2', type: 'page', ref: ['wiki-so-what', 'wiki-upper-structure'],
        title: t('两种有名的配置', '有名な 2 つのヴォイシング', 'Two famous voicings'),
        text: [
          t('So What 和弦：从下往上三个纯四度，再加一个大三度。Bill Evans 在 Miles Davis 的《So What》里用它作"阿门"式的应答，例如 E 小调的 So What 和弦就是 E A D G B（Em11）。', 'So What コード：下から完全 4 度 3 つと長 3 度 1 つ。Bill Evans が Miles Davis《So What》の「アーメン」の応答に使った。たとえば E マイナーの So What コードは E A D G B（Em11）。', 'The So What chord: three perfect fourths and a major third from the bottom up, used by Bill Evans for the “amen” response in Miles Davis’s “So What”. An E-minor So What chord is E A D G B (Em11).'),
          t('上方结构三和弦：在复杂和弦的最高几个音放一个大三或小三和弦，例如不弹根音的 C7♯9。', 'アッパー・ストラクチャー：複雑な和音の一番上に長三か短三和音を置く。たとえばルートなしの C7♯9。', 'Upper-structure triads: a major or minor triad sounding in the top notes of a more complex harmony — for example a rootless C7♯9.'),
        ],
        audio: { notes: [40, 45, 50, 55, 59], mode: 'harmonic' },
      },
      {
        id: 'b45-e3', type: 'discover', practice: true, ref: 'omt2e-jazz-voicings',
        prompt: t('G13 里的 13 音 E，放在七音 F 的下面会怎样？', 'G13 の 13th（E）を 7 度 F の下に置くと？', 'What happens if G13’s 13th, E, sits below the seventh, F?'),
        options: [t('听起来像六音（G6 的味道）', '6th に聞こえる（G6 の響き）', 'It sounds like a 6th (a G6 colour)'), t('完全没影响', 'まったく影響なし', 'No effect at all'), t('变成小三和弦', '短三和音になる', 'It becomes a minor triad')],
        answer: 0,
        insight: { title: t('延伸音放在上面', '拡張音は上に', 'Extensions go on top'), text: t('十三音和六音是同一个音级，位置决定我们怎么听：在七音上方才是"十三音"。', '13th と 6th は同じ音名で、位置が聞こえ方を決める：7 度より上で初めて「13th」。', 'The 13th and the 6th are the same pitch class; placement decides how we hear it — above the 7th it is a 13th.') },
      },
    ],
    experiment: [
      { id: 'b45-x1', type: 'experiment', toy: 'guide', ref: 'omt2e-jazz-voicings',
        prompt: t('打开 / 关闭五音、九音 / 十三音，看上方声部一共要动几个半音；再整体压低一个八度，听"发浑"是什么样。', '5 度や 9th / 13th をオン・オフし、上声の移動量を見よう。全体を 1 オクターヴ下げて「濁り」も聴こう。', 'Toggle the fifths and the 9th/13th line and watch how far the upper voices move; then drop everything an octave and hear what “muddy” means.'),
        params: { layers: ['bass', 'guide', 'top'], lowOption: true },
        breakthrough: { id: 'b45-lazy', text: t('你听到了"懒"声部的好处：几乎不动，和弦就换了。', '「怠け者」の声部のよさが聞こえた：ほとんど動かずに和音が変わる。', 'You heard what lazy voices buy you: the chords change while the hands barely move.') } },
    ],
    challenge: [
      {
        id: 'b45-c1', type: 'choice', error: 'incomplete-chord', skills: ['apply'], ref: 'omt2e-jazz-voicings',
        variants: [
          { prompt: t('配爵士和弦时，最常省略的是哪个音？', 'ジャズで一番よく省く音は？', 'Which chord tone is most commonly omitted in jazz voicings?'), options: [t('五音', '5 度', 'The fifth'), t('三音', '3 度', 'The third'), t('七音', '7 度', 'The seventh'), t('根音（没有贝斯时）', '根音（ベースなし）', 'The root (without a bassist)')] },
          { prompt: t('什么时候可以放心地不弹根音？', '根音を省いても安心なのは？', 'When can you safely leave out the root?'), options: [t('有贝斯手弹根音的时候', 'ベースが根音を弾くとき', 'When a bassist is playing it'), t('任何时候', 'いつでも', 'Always'), t('只有在小调里', '短調だけ', 'Only in minor'), t('只有一个人独奏的时候', 'ソロのときだけ', 'Only when playing solo')] },
        ],
        answer: 0,
        explain: t('五音最可省；七音、三音决定性质；根音交给贝斯时上方可以不弹。', '5 度が一番省ける。7 度・3 度が種類を決める。根音はベースに任せれば上声で省ける。', 'The fifth is the most expendable; the 3rd and 7th define the quality; with a bassist the root can go.'),
      },
      {
        id: 'b45-c2', type: 'choice', error: 'voicing-register', skills: ['voiceLeading'], ref: 'omt2e-jazz-voicings',
        variants: [
          { prompt: t('按泛音列的道理，间距应该？', '倍音列にならうと、間隔は？', 'Following the harmonic series, spacing should be…'), options: [t('低音区宽、高音区窄', '低音域で広く、高音域で狭く', 'wide low, close high'), t('低音区窄、高音区宽', '低音域で狭く、高音域で広く', 'close low, wide high'), t('到处一样', 'どこも同じ', 'the same everywhere'), t('越窄越好', '狭いほどよい', 'as close as possible')] },
          { prompt: t('两个和弦之间，"懒"声部最优先的走法是？', '2 つの和音の間で、「怠け者」の声部が一番優先するのは？', 'Between two chords, a lazy voice first tries to…'), options: [t('保持共同音', '共通音を保つ', 'hold a common tone'), t('跳六度', '6 度跳躍', 'leap a sixth'), t('跟低音平行', 'バスと平行', 'move parallel with the bass'), t('跳八度', 'オクターヴ跳躍', 'leap an octave')] },
        ],
        answer: 0,
        explain: t('低音区宽、高音区窄；懒声部：保持 > 全音 / 半音 > 三度 > 大跳。', '低音域は広く高音域は狭く。怠け者の声部：保持 > 全音・半音 > 3 度 > 大跳躍。', 'Wide low, close high; lazy voices: hold > step > skip > leap.'),
      },
      {
        id: 'b45-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: ['wiki-so-what', 'wiki-upper-structure'],
        variants: [
          { prompt: t('So What 和弦从下往上的音程是？', 'So What コードの下からの音程は？', 'From the bottom up, the So What chord’s intervals are…'), options: [t('三个纯四度 + 一个大三度', '完全 4 度 3 つ + 長 3 度', 'three perfect fourths + a major third'), t('四个大三度', '長 3 度 4 つ', 'four major thirds'), t('三个纯五度 + 一个小三度', '完全 5 度 3 つ + 短 3 度', 'three perfect fifths + a minor third'), t('全是二度', 'すべて 2 度', 'all seconds')] },
          { prompt: t('"上方结构"指的是？', '「アッパー・ストラクチャー」とは？', '“Upper structure” refers to…'), options: [t('在复杂和弦的最高几个音放一个大三或小三和弦', '複雑な和音の一番上に長三か短三和音を置く', 'a major or minor triad in the top notes of a complex chord'), t('把根音放在最高', '根音を一番上に', 'putting the root on top'), t('只弹低音', 'バスだけ弾く', 'playing only the bass'), t('把和弦写在高音谱表', 'ト音譜表に書く', 'writing on the treble staff')] },
        ],
        answer: 0,
        explain: t('So What 和弦：三个纯四度 + 大三度；上方结构：顶上一个三和弦。', 'So What コード：完全 4 度 3 つ + 長 3 度。アッパー・ストラクチャー：上に三和音。', 'So What chord: three fourths and a major third; upper structure: a triad on top.'),
      },
      G('b45-g1', 'guideTones', 1, ['identify']),
      G('b45-g2', 'drop2', 2, ['spell']),
    ],
    lab: [{ id: 'b45-lab', type: 'lab', lab: 'jazz-ii-V-I-rootless', mandatory: true, minutes: 6 }],
  },
  pool: [G('b45-p1', 'drop2', 3, ['spell']), G('b45-p2', 'guideTones', 3, ['identify'])],
};

// ===================== B4-6 旋律小调与和声小调的调式体系 =====================
const MM_SETS = [
  { id: 'mm', label: t('旋律小调（爵士小调）', '旋律的短音階（ジャズ・マイナー）', 'Melodic (jazz) minor'), steps: [0, 2, 3, 5, 7, 9, 11], mark: 2, markNote: t('大调只降低了三音', '長調の 3 度だけ下げた', 'only the third of major is lowered'), noKey: true },
  { id: 'lyddom', label: t('Lydian dominant（第 4 调式）', 'リディアン・ドミナント（第 4 旋法）', 'Lydian dominant (mode 4)'), steps: [0, 2, 4, 6, 7, 9, 10], mark: 3, markNote: t('升四级 + 降七级', '♯4 + ♭7', '♯4 with ♭7'), noKey: true },
  { id: 'locnat2', label: t('Locrian ♮2（第 6 调式）', 'ロクリアン ♮2（第 6 旋法）', 'Locrian ♮2 (mode 6)'), steps: [0, 2, 3, 5, 6, 8, 10], mark: 1, markNote: t('半减七和弦上的自然九音', '半減七の上のナチュラル 9th', 'a natural 9th over a half-diminished chord'), noKey: true },
  { id: 'altered', label: t('变化音阶（第 7 调式）', 'オルタード（第 7 旋法）', 'Altered (mode 7)'), steps: [0, 1, 3, 4, 6, 8, 10], mark: 1, markNote: t('♭9、♯9、♭5、♭13 全部变化，只留根音、三音、七音', '♭9・♯9・♭5・♭13 をすべて変化、根音・3 度・7 度だけ残す', '♭9, ♯9, ♭5 and ♭13 all altered; only root, 3rd and 7th remain'), noKey: true },
  { id: 'hm', label: t('和声小调', '和声的短音階', 'Harmonic minor'), steps: [0, 2, 3, 5, 7, 8, 11], mark: 6, markNote: t('升高的七级：六、七级之间是增二度', '上げた第 7 音：6–7 度の間が増 2 度', 'raised seventh: an augmented second between 6 and 7'), noKey: true },
  { id: 'hmaj', label: t('和声大调', '和声的長音階', 'Harmonic major'), steps: [0, 2, 4, 5, 7, 8, 11], mark: 5, markNote: t('大调降低六级', '長調の第 6 音を下げる', 'major with a lowered sixth'), noKey: true },
];
export const LEVEL_B4_6 = {
  minutes: 13,
  insight: t('变化音阶其实就是旋律小调从第七个音开始：G 变化音阶 = A♭ 旋律小调。', 'オルタード・スケールは旋律的短音階を第 7 音から始めたもの：G オルタード = A♭ 旋律的短音階。', 'The altered scale is just melodic minor started on its seventh note: G altered = A♭ melodic minor.'),
  sections: {
    discover: [
      {
        id: 'b46-d1', type: 'discover', ref: ['wiki-altered-scale', 'wiki-jazz-minor'],
        prompt: t('先听 G 变化音阶（G A♭ B♭ C♭ D♭ E♭ F），再听 A♭ 旋律小调（A♭ B♭ C♭ D♭ E♭ F G）。它们是什么关系？', 'G オルタード（G A♭ B♭ C♭ D♭ E♭ F）、次に A♭ 旋律的短音階（A♭ B♭ C♭ D♭ E♭ F G）。関係は？', 'Hear G altered (G A♭ B♭ C♭ D♭ E♭ F), then A♭ melodic minor (A♭ B♭ C♭ D♭ E♭ F G). How are they related?'),
        play: [{ label: t('G 变化音阶', 'G オルタード', 'G altered'), audio: { notes: [55, 56, 58, 59, 61, 63, 65, 67], mode: 'melody' } }, { label: t('A♭ 旋律小调', 'A♭ 旋律的短音階', 'A♭ melodic minor'), audio: { notes: [56, 58, 59, 61, 63, 65, 67, 68], mode: 'melody' } }],
        options: [t('同一组音，只是从不同的音开始', '同じ音で、始まる音が違うだけ', 'The same notes, starting on different degrees'), t('完全不同的两组音', 'まったく違う 2 組', 'Two unrelated sets'), t('只有一个音一样', '1 音だけ同じ', 'Only one note in common')],
        answer: 0,
        insight: {
          title: t('一个音阶，七个调式', '1 つの音階、7 つの旋法', 'One scale, seven modes'),
          text: t('爵士小调就是上行的旋律小调，相当于把大调的三音降低：1 2 ♭3 4 5 6 7。和大调一样，它从每个音开始都是一个调式：I、Dorian ♭2、Lydian augmented、Lydian dominant、Aeolian dominant、Locrian ♮2（半减）、变化音阶（super-Locrian）。变化音阶保留属七的根音、三音和七音，其余全部变化，给属和弦加紧张。', 'ジャズ・マイナーは上行形の旋律的短音階で、長調の 3 度を下げたもの：1 2 ♭3 4 5 6 7。長調と同じく、各音から始めると旋法になる：I、ドリアン ♭2、リディアン・オーギュメント、リディアン・ドミナント、エオリアン・ドミナント、ロクリアン ♮2（半減）、オルタード（スーパー・ロクリアン）。オルタードは属七の根音・3 度・7 度を残し、残りをすべて変化させて緊張を足す。', 'Jazz minor is the ascending melodic minor — major with a lowered third: 1 2 ♭3 4 5 6 7. Like major, every note starts a mode: I, Dorian ♭2, Lydian augmented, Lydian dominant, Aeolian dominant, Locrian ♮2 (half-diminished) and the altered scale (super-Locrian). The altered scale keeps a dominant seventh’s root, 3rd and 7th and alters everything else, adding tension over the dominant.'),
        },
      },
    ],
    explain: [
      {
        id: 'b46-e1', type: 'page', ref: ['wiki-harmonic-minor', 'wiki-harmonic-major'],
        title: t('和声小调与和声大调', '和声的短音階と和声的長音階', 'Harmonic minor and harmonic major'),
        text: [
          t('和声小调：自然小调把第七级升高半音，于是七级成了指向主音的导音，六、七级之间出现增二度。和声大调：大调把第六级降低半音（也等于和声小调把三级升高），两者的上半部分（上四音列）一样。', '和声的短音階：自然的短音階の第 7 音を半音上げ、第 7 音が主音への導音になり、6–7 度の間に増 2 度ができる。和声的長音階：長調の第 6 音を半音下げる（和声的短音階の 3 度を上げたものとも言える）。両者の上のテトラコードは同じ。', 'Harmonic minor raises natural minor’s seventh by a half step, giving a leading tone and an augmented second between 6 and 7. Harmonic major lowers major’s sixth by a half step (equivalently, harmonic minor with a raised third); the two share their upper tetrachord.'),
        ],
        tool: { feature: 'ref' },
      },
      {
        id: 'b46-e2', type: 'discover', practice: true, ref: 'wiki-jazz-minor',
        prompt: t('C 旋律小调（上行）和 C 大调只差哪个音？', 'C 旋律的短音階（上行）と C 長調の違いは？', 'C melodic minor (ascending) differs from C major in which note?'),
        options: [t('三音：E 变成 E♭', '3 度：E が E♭', 'The third: E becomes E♭'), t('七音：B 变成 B♭', '7 度：B が B♭', 'The seventh: B becomes B♭'), t('六音：A 变成 A♭', '6 度：A が A♭', 'The sixth: A becomes A♭')],
        answer: 0,
        insight: { title: t('大调降三音', '長調の 3 度を下げる', 'Major with a flat third'), text: t('上行旋律小调 = 1 2 ♭3 4 5 6 7，所以也叫 Ionian ♭3。', '上行の旋律的短音階 = 1 2 ♭3 4 5 6 7、だからイオニアン ♭3 とも呼ぶ。', 'Ascending melodic minor = 1 2 ♭3 4 5 6 7, hence the name Ionian ♭3.') },
      },
    ],
    experiment: [
      { id: 'b46-x1', type: 'experiment', toy: 'scale', ref: ['wiki-jazz-minor', 'wiki-altered-scale', 'wiki-harmonic-minor', 'wiki-harmonic-major'],
        prompt: t('在几个主音上听旋律小调、它的几个调式、和声小调和和声大调。特征音（高亮的那个）在哪里？', 'いくつかの主音で旋律的短音階とその旋法、和声的短音階・和声的長音階を聴こう。特性音（ハイライト）はどこ？', 'On a few tonics, hear melodic minor and some of its modes, harmonic minor and harmonic major. Where is the tell-tale note (highlighted)?'),
        params: { sets: MM_SETS },
        breakthrough: { id: 'b46-family', text: t('你在一个音阶家族里认出了七个不同的颜色。', '1 つの音階の家族に 7 つの色を見分けた。', 'You found seven colours inside one scale family.') } },
    ],
    challenge: [
      {
        id: 'b46-c1', type: 'choice', error: 'mode-character', skills: ['identify'], ref: ['wiki-jazz-minor', 'wiki-altered-scale'],
        variants: [
          { prompt: t('变化音阶是旋律小调的第几个调式？', 'オルタードは旋律的短音階の第何旋法？', 'The altered scale is which mode of melodic minor?'), options: [t('第七个', '第 7', 'The seventh'), t('第四个', '第 4', 'The fourth'), t('第二个', '第 2', 'The second'), t('第五个', '第 5', 'The fifth')] },
          { prompt: t('Lydian dominant 是旋律小调的第几个调式？', 'リディアン・ドミナントは旋律的短音階の第何旋法？', 'Lydian dominant is which mode of melodic minor?'), options: [t('第四个', '第 4', 'The fourth'), t('第七个', '第 7', 'The seventh'), t('第六个', '第 6', 'The sixth'), t('第三个', '第 3', 'The third')] },
          { prompt: t('半减七和弦上带自然九音的调式（Locrian ♮2）是旋律小调的第几个调式？', 'ロクリアン ♮2 は旋律的短音階の第何旋法？', 'Locrian ♮2 is which mode of melodic minor?'), options: [t('第六个', '第 6', 'The sixth'), t('第二个', '第 2', 'The second'), t('第七个', '第 7', 'The seventh'), t('第一个', '第 1', 'The first')] },
        ],
        answer: 0,
        explain: t('旋律小调七个调式：I、Dorian ♭2、Lydian augmented、Lydian dominant、Aeolian dominant、Locrian ♮2、变化音阶。', '旋律的短音階の 7 旋法：I、ドリアン ♭2、リディアン・オーギュメント、リディアン・ドミナント、エオリアン・ドミナント、ロクリアン ♮2、オルタード。', 'Melodic minor’s modes: I, Dorian ♭2, Lydian augmented, Lydian dominant, Aeolian dominant, Locrian ♮2, altered.'),
      },
      {
        id: 'b46-c2', type: 'choice', error: 'scale-pattern', skills: ['spell'], ref: ['wiki-altered-scale', 'wiki-jazz-minor'],
        variants: [
          { prompt: t('G7 上用的 G 变化音阶，和哪个旋律小调是同一组音？', 'G7 で使う G オルタードと同じ音の旋律的短音階は？', 'G altered (over G7) has the same notes as which melodic minor?'), options: [t('A♭ 旋律小调', 'A♭ 旋律的短音階', 'A♭ melodic minor'), t('G 旋律小调', 'G 旋律的短音階', 'G melodic minor'), t('D 旋律小调', 'D 旋律的短音階', 'D melodic minor'), t('C 旋律小调', 'C 旋律的短音階', 'C melodic minor')] },
          { prompt: t('变化音阶在属七上变化了哪些音？', 'オルタードは属七のどの音を変化させる？', 'Which tones does the altered scale alter over a dominant seventh?'), options: [t('五音、九音、十一音、十三音', '5 度・9 度・11 度・13 度', 'the 5th, 9th, 11th and 13th'), t('根音和三音', '根音と 3 度', 'the root and 3rd'), t('只有七音', '7 度だけ', 'only the 7th'), t('什么都不变', '何も変えない', 'nothing')] },
        ],
        answer: 0,
        explain: t('变化音阶 = 半音上方那个旋律小调的第七调式；保留根音、三音、七音，把 5、9、11、13 全部变化。', 'オルタード = 半音上の旋律的短音階の第 7 旋法。根音・3 度・7 度を残し、5・9・11・13 をすべて変化。', 'Altered = the seventh mode of the melodic minor a half step up; it keeps root, 3rd and 7th and alters 5, 9, 11 and 13.'),
      },
      {
        id: 'b46-c3', type: 'choice', error: 'scale-pattern', skills: ['spell'], ref: ['wiki-harmonic-minor', 'wiki-harmonic-major'],
        variants: [
          { prompt: t('A 和声小调是？', 'A 和声的短音階は？', 'A harmonic minor is…'), options: ['A B C D E F G♯', 'A B C D E F♯ G♯', 'A B C D E F G', 'A B C♯ D E F G♯'] },
          { prompt: t('C 和声大调是？', 'C 和声的長音階は？', 'C harmonic major is…'), options: ['C D E F G A♭ B', 'C D E♭ F G A♭ B', 'C D E F G A B♭', 'C D E♭ F G A B'] },
        ],
        answer: 0,
        explain: t('和声小调 = 自然小调升七级；和声大调 = 大调降六级。', '和声的短音階 = 自然的短音階の第 7 音を上げる。和声的長音階 = 長調の第 6 音を下げる。', 'Harmonic minor = natural minor with a raised 7th; harmonic major = major with a lowered 6th.'),
      },
      G('b46-g1', 'scaleLibrary', 2, ['spell']),
      G('b46-g2', 'minorScale', 1, ['spell']),
    ],
  },
  pool: [G('b46-p1', 'scaleLibrary', 3, ['spell']), G('b46-p2', 'minorScale', 3, ['spell'])],
};

// ===================== B4-7 对称音阶与 bebop 音阶 =====================
const SYM_SETS = [
  { id: 'wt', label: t('全音音阶', '全音音階', 'Whole-tone'), steps: [0, 2, 4, 6, 8, 10], degrees: [0, 1, 2, 3, 4, 5], noKey: true },
  { id: 'hw', label: t('减音阶（半全）', 'ディミニッシュ（半全）', 'Diminished (half–whole)'), steps: [0, 1, 3, 4, 6, 7, 9, 10], degrees: [0, 1, 1, 2, 3, 4, 5, 6], noKey: true },
  { id: 'wh', label: t('减音阶（全半）', 'ディミニッシュ（全半）', 'Diminished (whole–half)'), steps: [0, 2, 3, 5, 6, 8, 9, 11], degrees: [0, 1, 2, 3, 4, 5, 5, 6], noKey: true },
  { id: 'bebop', label: t('bebop 属音阶', 'ビバップ・ドミナント', 'Bebop dominant'), steps: [0, 2, 4, 5, 7, 9, 10, 11], degrees: [0, 1, 2, 3, 4, 5, 6, 6], mark: 7, markNote: t('加在降七级和主音之间的经过音', '♭7 と主音の間の経過音', 'the passing tone added between ♭7 and the root'), noKey: true },
];
export const LEVEL_B4_7 = {
  minutes: 12,
  insight: t('全音音阶只有两个、减音阶只有三个：对称的音阶一移调就会"撞回自己"。', '全音音階は 2 つ、ディミニッシュは 3 つだけ：対称な音階は移調するとすぐ「自分に戻る」。', 'There are only two whole-tone scales and three diminished scales: transpose a symmetric scale and it soon lands back on itself.'),
  sections: {
    discover: [
      {
        id: 'b47-d1', type: 'discover', ref: 'wiki-whole-tone',
        prompt: t('从 C 开始的全音音阶，和从 D 开始的全音音阶。两组音一样吗？', 'C から始まる全音音階と D から始まる全音音階。同じ音？', 'A whole-tone scale from C and one from D. Are the notes the same?'),
        play: [{ label: t('从 C', 'C から', 'From C'), audio: { notes: [60, 62, 64, 66, 68, 70, 72], mode: 'melody' } }, { label: t('从 D', 'D から', 'From D'), audio: { notes: [62, 64, 66, 68, 70, 72, 74], mode: 'melody' } }],
        options: [t('一样：从 D 开始只是从同一组音的第二个音开始', '同じ：D からは同じ音の 2 つ目から始めただけ', 'The same: starting on D just starts the same set on its second note'), t('完全不同', 'まったく違う', 'Completely different'), t('差三个音', '3 音違う', 'Three notes differ')],
        answer: 0,
        insight: {
          title: t('对称 = 移调后不变', '対称 = 移調しても変わらない', 'Symmetry = unchanged by transposition'),
          text: t('全音音阶的六个音之间全是全音，在十二平均律里只有两个，彼此互补（合起来正好十二个音），可以看成"六平均律"。八音音阶（全音、半音交替）只有三个；爵士里叫减音阶，因为它是两个减七和弦交错在一起，分"半全"和"全半"两种起法。', '全音音階の 6 音の間はすべて全音で、12 平均律では 2 つしかなく互いに補い合う（合わせてちょうど 12 音）。「6 平均律」とも言える。八音音階（全音と半音が交互）は 3 つだけ。ジャズではディミニッシュ・スケールと呼び、2 つの減七和音が組み合わさったもの。「半全」と「全半」の 2 通りの始め方がある。', 'All six steps of the whole-tone scale are whole tones; in 12-tone equal temperament there are only two, complementary (together they make all twelve notes) — a “six-tone equal temperament”. The octatonic scale (alternating whole and half steps) has only three forms; in jazz it is the diminished scale, two interlocking diminished seventh chords, starting half–whole or whole–half.'),
        },
      },
    ],
    explain: [
      {
        id: 'b47-e1', type: 'page', ref: 'wiki-bebop-scale',
        title: t('bebop 音阶：让和弦音落在强拍上', 'ビバップ・スケール：和声音を強拍に', 'Bebop scales: chord tones on the beat'),
        text: [
          t('七声音阶一个八度七个音，按八分音符依次弹，和弦音不会一直落在强拍上。bebop 音阶加进一个半音经过音成为八个音：从和弦音、强拍开始依次弹，根音、三音、五音、七音就会一直落在强拍上。最常见的 bebop 属音阶 = Mixolydian 在降七级和主音之间加一个经过音。', '七音音階は 8 分音符で順に弾くと和声音が強拍に乗り続けない。ビバップ・スケールは半音の経過音を足して 8 音に：強拍の和声音から順に弾けば、根音・3 度・5 度・7 度がずっと強拍に乗る。一番よく使うビバップ・ドミナント = ミクソリディアンの ♭7 と主音の間に経過音。', 'Play a seven-note scale in steady eighths and the chord tones drift off the beats. A bebop scale adds a chromatic passing tone to make eight notes: start on a chord tone on the beat and the root, 3rd, 5th and 7th stay on the beats. The bebop dominant scale = Mixolydian with a passing tone between ♭7 and the root.'),
        ],
        audio: { notes: [72, 71, 70, 69, 67, 65, 64, 62, 60], mode: 'melody' },
        tool: { feature: 'ref' },
      },
      {
        id: 'b47-e2', type: 'discover', practice: true, ref: 'wiki-octatonic',
        prompt: t('一共有几个不同的八音（减）音阶？', '異なる八音（ディミニッシュ）音階はいくつ？', 'How many distinct octatonic (diminished) scales are there?'),
        options: ['3', '12', '2'],
        answer: 0,
        insight: { title: t('三个就够了', '3 つで足りる', 'Three is all'), text: t('八音音阶移小三度就和自己重合，所以十二个起点只有三个不同的音阶；全音音阶移全音就重合，只有两个。', '八音音階は短 3 度移すと自分と重なるので、12 の開始音から異なるのは 3 つだけ。全音音階は全音で重なるので 2 つ。', 'The octatonic scale maps onto itself at a minor third, so twelve starting points give only three scales; the whole-tone scale repeats at a whole step, so there are two.') },
      },
    ],
    experiment: [
      { id: 'b47-x1', type: 'experiment', toy: 'scale', ref: ['wiki-whole-tone', 'wiki-octatonic', 'wiki-bebop-scale'],
        prompt: t('在不同主音上听全音音阶、两种减音阶和 bebop 属音阶。从 C 和从 E♭ 开始的半全减音阶，音一样吗？', '異なる主音で全音音階・2 種類のディミニッシュ・ビバップ・ドミナントを聴こう。C と E♭ から始める半全ディミニッシュは同じ音？', 'On different tonics, hear the whole-tone scale, both diminished scales and the bebop dominant. Do half–whole diminished scales from C and from E♭ share their notes?'),
        params: { sets: SYM_SETS },
        breakthrough: { id: 'b47-symmetry', text: t('你发现了：对称的音阶换了起点，音却没变。', '対称な音階は始まりを変えても音が変わらない——それに気づいた。', 'You found it: a symmetric scale changes its starting point but not its notes.') } },
    ],
    challenge: [
      {
        id: 'b47-c1', type: 'choice', error: 'scale-pattern', skills: ['calc'], ref: ['wiki-whole-tone', 'wiki-octatonic'],
        variants: [
          { prompt: t('十二平均律里一共有几个不同的全音音阶？', '12 平均律で異なる全音音階はいくつ？', 'How many distinct whole-tone scales exist in 12-tone equal temperament?'), options: ['2', '6', '12', '3'] },
          { prompt: t('八音音阶的音程排列是？', '八音音階の音程の並びは？', 'The octatonic scale’s step pattern is…'), options: [t('全音、半音交替', '全音と半音が交互', 'alternating whole and half steps'), t('全是全音', 'すべて全音', 'all whole steps'), t('全是半音', 'すべて半音', 'all half steps'), t('W–W–H–W–W–W–H', 'W–W–H–W–W–W–H', 'W–W–H–W–W–W–H')] },
          { prompt: t('爵士里减音阶可以看成哪两个和弦交错？', 'ジャズのディミニッシュ・スケールはどの 2 つの和音の組み合わせ？', 'In jazz, the diminished scale can be seen as two interlocking…'), options: [t('减七和弦', '減七和音', 'diminished seventh chords'), t('增三和弦', '増三和音', 'augmented triads'), t('大七和弦', '長七和音', 'major seventh chords'), t('属七和弦', '属七和音', 'dominant seventh chords')] },
        ],
        answer: 0,
        explain: t('全音音阶只有两个；八音音阶全半交替、只有三个，是两个减七和弦交错。', '全音音階は 2 つ。八音音階は全半交互で 3 つ、2 つの減七和音の組み合わせ。', 'Two whole-tone scales; the octatonic alternates whole and half steps, exists in three forms and interlocks two diminished sevenths.'),
      },
      {
        id: 'b47-c2', type: 'choice', error: 'scale-pattern', skills: ['apply'], ref: 'wiki-bebop-scale',
        variants: [
          { prompt: t('bebop 音阶为什么要八个音？', 'ビバップ・スケールはなぜ 8 音？', 'Why does a bebop scale have eight notes?'), options: [t('依次弹时让和弦音一直落在强拍上', '順に弾くと和声音がずっと強拍に乗るように', 'So chord tones stay on the beats when played in order'), t('因为它是对称音阶', '対称な音階だから', 'Because it is symmetric'), t('为了避开三音', '3 度を避けるため', 'To avoid the third'), t('为了凑满一个八度', '1 オクターヴを埋めるため', 'To fill the octave')] },
          { prompt: t('C bebop 属音阶比 C Mixolydian 多哪个音？', 'C ビバップ・ドミナントは C ミクソリディアンに何を足す？', 'Which note does C bebop dominant add to C Mixolydian?'), options: ['B', 'C♯', 'E♭', 'F♯'] },
        ],
        answer: 0,
        explain: t('多一个经过音，和弦音就落在强拍；bebop 属音阶在 ♭7（B♭）和主音之间加了 B。', '経過音を 1 つ足すと和声音が強拍に。ビバップ・ドミナントは ♭7（B♭）と主音の間に B を足す。', 'The extra passing tone keeps chord tones on the beats; the bebop dominant adds B between ♭7 (B♭) and the root.'),
      },
      {
        id: 'b47-c3', type: 'choice', error: 'scale-pattern', skills: ['spell'], ref: 'wiki-whole-tone',
        variants: [
          { prompt: t('从 C 开始的全音音阶是？', 'C から始まる全音音階は？', 'The whole-tone scale on C is…'), options: ['C D E F♯ G♯ A♯', 'C D E F G A', 'C D E♭ F G♭ A♭', 'C E♭ F G♭ G B♭'] },
          { prompt: t('下面哪一个和 C 全音音阶是同一组音？', 'C の全音音階と同じ音なのは？', 'Which of these has the same notes as the C whole-tone scale?'), options: [t('从 D 开始的全音音阶', 'D から始まる全音音階', 'The whole-tone scale on D'), t('从 C♯ 开始的全音音阶', 'C♯ から始まる全音音階', 'The whole-tone scale on C♯'), t('C 大调', 'ハ長調', 'C major'), t('C 减音阶', 'C ディミニッシュ', 'The C diminished scale')] },
        ],
        answer: 0,
        explain: t('全音音阶：C D E F♯ G♯ A♯；从 D、E、F♯、G♯、A♯ 开始都是同一组音，从 C♯ 开始的是另一组。', '全音音階：C D E F♯ G♯ A♯。D・E・F♯・G♯・A♯ から始めても同じ音、C♯ からは別の組。', 'Whole tone: C D E F♯ G♯ A♯; starting on D, E, F♯, G♯ or A♯ gives the same set, while C♯ gives the other one.'),
      },
      G('b47-g1', 'symmetricScale', 2, ['calc']),
      G('b47-g2', 'bebopDominant', 1, ['spell']),
    ],
  },
  pool: [G('b47-p1', 'symmetricScale', 3, ['calc']), G('b47-p2', 'bebopDominant', 3, ['spell'])],
};

// ===================== B4-8 和弦替代与再和声 =====================
export const LEVEL_B4_8 = {
  minutes: 19, core: true,
  insight: t('G7 和 D♭7 共用同一个三全音（B 与 F）：换了根音，"紧张"没换。', 'G7 と D♭7 は同じ三全音（B と F）を共有する：根音を替えても「緊張」は替わらない。', 'G7 and D♭7 share the same tritone (B and F): the root changes, the tension doesn’t.'),
  sections: {
    discover: [
      {
        id: 'b48-d1', type: 'discover', ref: 'omt2e-substitutions',
        prompt: t('先听 Dm7 – G7 – Cmaj7，再听 Dm7 – D♭7 – Cmaj7。第二遍低音怎么走？上面两个音变了吗？', 'まず Dm7 – G7 – Cmaj7、次に Dm7 – D♭7 – Cmaj7。2 回目のバスの動きは？ 上の 2 音は変わった？', 'Hear Dm7 – G7 – Cmaj7, then Dm7 – D♭7 – Cmaj7. How does the bass move the second time? Did the two upper notes change?'),
        play: [{ label: 'Dm7–G7–Cmaj7', audio: { chords: [V.Dm7, V.G7, V.Cmaj7], gap: 1000 } }, { label: 'Dm7–D♭7–Cmaj7', audio: { chords: [V.Dm7, V.Db7, V.Cmaj7], gap: 1000 } }],
        options: [t('低音 D–D♭–C 半音下行；上面的 F 和 B 几乎没变', 'バスは D–D♭–C と半音下行、上の F と B はほとんど同じ', 'The bass slides D–D♭–C by half steps; the upper F and B stay put'), t('上面两个音全变了', '上の 2 音はすべて変わった', 'Both upper notes changed'), t('第二遍换了调', '2 回目は転調した', 'The second one changes key')],
        answer: 0,
        insight: {
          title: t('三全音替代', '裏コード（三全音代理）', 'The tritone substitution'),
          text: t('任何属七都可以换成相隔三全音的另一个属七，进行的功能不变：两个和弦的三音与七音正好互换（G7 的 B、F 就是 D♭7 的 F、C♭）。所以三全音替代常以下行小二度解决，低音变成半音线。', 'どの属七も三全音離れた属七に替えられ、進行の機能は変わらない：2 つの和音の 3 度と 7 度がちょうど入れ替わる（G7 の B・F は D♭7 の F・C♭）。だから裏コードはよく短 2 度下へ解決し、バスが半音の線になる。', 'Any dominant seventh can be replaced by the dominant seventh a tritone away and the progression still functions: the two chords swap 3rd and 7th (G7’s B and F are D♭7’s F and C♭). Tritone subs therefore often resolve down a minor second, turning the bass into a chromatic line.'),
        },
      },
    ],
    explain: [
      {
        id: 'b48-e1', type: 'page', ref: 'omt2e-substitutions',
        title: t('三种常见的替代', 'よくある 3 つの代理', 'Three common substitutions'),
        text: [
          t('应用和弦：五度进行里，前一个和弦可以换成同根音的属七，变成下一个和弦的属和弦。转回句 I–vi–ii–V 就能变成一串属七：I–VI7–II7–V7。', '副属和音：5 度進行では、前の和音を同じ根音の属七に替えて次の和音の属和音にできる。ターンアラウンド I–vi–ii–V は属七の連鎖 I–VI7–II7–V7 になる。', 'Applied chords: in fifth motion, the first chord can become the dominant seventh on the same root, an applied V7 to the next. The turnaround I–vi–ii–V becomes a chain of dominants: I–VI7–II7–V7.'),
          t('调式混合：大调里借同主音小调的和弦，爵士里最常见的是用 iiø7 代替 ii7、给 V7 加 ♭9——都用到 le（降低的第六级）；混合和弦和原来的和弦功能相同。', '同主調借用：長調で同主短調の和音を借りる。ジャズで一番多いのは ii7 の代わりの iiø7 と、V7 に ♭9——どちらも le（下げた第 6 音）を使い、機能は元の和音と同じ。', 'Mode mixture: borrowing from the parallel minor; in jazz the most common are iiø7 for ii7 and adding ♭9 to V7 — both use le (the lowered sixth), and mixture chords keep the same function.'),
          t('三全音替代：任何属七（应用的或调内的）都可以换。转回句里常隔一个换一个：C–E♭7–D7–D♭7–C，低音一路半音下行。', '裏コード：どの属七（副属でも調内でも）も替えられる。ターンアラウンドではよく 1 つおきに：C–E♭7–D7–D♭7–C、バスは半音ずつ下行。', 'Tritone substitution: any dominant seventh, applied or diatonic, can be replaced. In turnarounds every other chord is often swapped: C–E♭7–D7–D♭7–C, a chromatic bass line all the way down.'),
        ],
        tool: { feature: 'jazzmore' },
      },
      {
        id: 'b48-e2', type: 'discover', practice: true, ref: 'omt2e-substitutions',
        prompt: t('A7 的三全音替代是？', 'A7 の裏コードは？', 'What is the tritone substitute for A7?'),
        options: ['E♭7', 'E7', 'D7'],
        answer: 0,
        insight: { title: t('相隔三全音', '三全音離れ', 'A tritone away'), text: t('A 往上（或往下）三全音是 E♭；A7 的三音 C♯、七音 G，正好是 E♭7 的七音 D♭ 和三音 G。', 'A の三全音上（下）は E♭。A7 の 3 度 C♯・7 度 G は、E♭7 の 7 度 D♭ と 3 度 G。', 'A tritone from A is E♭; A7’s third C♯ and seventh G are E♭7’s seventh D♭ and third G.') },
      },
    ],
    experiment: [
      { id: 'b48-x1', type: 'experiment', toy: 'progression', ref: 'omt2e-substitutions',
        prompt: t('转回句 Cmaj7 – ? – ? – ? – Cmaj7：每个槽位可以选调内和弦、应用属七或三全音替代。试试"隔一个换一个"，听低音变成半音线。', 'ターンアラウンド Cmaj7 – ? – ? – ? – Cmaj7：各スロットで調内和音・副属七・裏コードを選べる。「1 つおき」に替えて、バスが半音の線になるのを聴こう。', 'Turnaround Cmaj7 – ? – ? – ? – Cmaj7: each slot can be the diatonic chord, an applied dominant or a tritone sub. Try swapping every other chord and hear the bass become a chromatic line.'),
        params: { gap: 950, slots: [
          { fn: 'T', fnLabel: t('主', '主', 'T'), options: [{ label: 'Cmaj7', notes: V.Cmaj7 }] },
          { options: [{ label: 'Am7 (vi)', notes: V.Am7 }, { label: 'A7 (V7/ii)', notes: V.A7 }, { label: t('E♭7（A7 的替代）', 'E♭7（A7 の裏）', 'E♭7 (sub for A7)'), notes: V.Eb7, note: t('E♭–D–D♭–C：低音开始半音下行。', 'E♭–D–D♭–C：バスが半音下行し始める。', 'E♭–D–D♭–C: the bass starts sliding down.') }] },
          { fn: 'PD', fnLabel: t('下属', '下属', 'PD'), options: [{ label: 'Dm7 (ii)', notes: V.Dm7 }, { label: 'D7 (V7/V)', notes: V.D7 }, { label: t('A♭7（D7 的替代）', 'A♭7（D7 の裏）', 'A♭7 (sub for D7)'), notes: V.Ab7 }] },
          { fn: 'D', fnLabel: t('属', '属', 'D'), options: [{ label: 'G7 (V7)', notes: V.G7 }, { label: t('D♭7（G7 的替代）', 'D♭7（G7 の裏）', 'D♭7 (sub for G7)'), notes: V.Db7, note: t('B 和 F 两个音没变——共用同一个三全音。', 'B と F は変わらない——同じ三全音を共有。', 'B and F stay — the same tritone.') }] },
          { fn: 'T', fnLabel: t('主', '主', 'T'), options: [{ label: 'Cmaj7', notes: V.Cmaj7 }] },
        ],
        presets: [
          { label: t('调内', '調内', 'Diatonic'), picks: [0, 0, 0, 0, 0], explain: t('I–vi–ii–V：最基本的转回句。', 'I–vi–ii–V：一番基本のターンアラウンド。', 'I–vi–ii–V: the basic turnaround.') },
          { label: t('应用属七', '副属七', 'Applied'), picks: [0, 1, 1, 0, 0], explain: t('五度进行里每个和弦都换成属七：I–VI7–II7–V7。', '5 度進行の各和音を属七に：I–VI7–II7–V7。', 'Every chord in the fifth chain becomes a dominant: I–VI7–II7–V7.') },
          { label: t('隔一个替代', '1 つおきに裏', 'Every other sub'), picks: [0, 2, 1, 1, 0], explain: t('C–E♭7–D7–D♭7–C：低音一路半音下行，上方声部几乎不动。', 'C–E♭7–D7–D♭7–C：バスは半音ずつ下行、上声はほとんど動かない。', 'C–E♭7–D7–D♭7–C: a chromatic bass, upper voices barely moving.') },
        ] },
        breakthrough: { id: 'b48-chromatic', text: t('你把一条普通的转回句变成了半音下行的低音线。', '普通のターンアラウンドを半音下行のベース・ラインに変えた。', 'You turned a plain turnaround into a chromatic bass line.') } },
    ],
    challenge: [
      {
        id: 'b48-c1', type: 'choice', error: 'substitution', skills: ['calc'], ref: 'omt2e-substitutions',
        variants: [
          { prompt: t('G7 和 D♭7 共用的两个音是？', 'G7 と D♭7 が共有する 2 音は？', 'Which two notes do G7 and D♭7 share?'), options: [t('B（C♭）和 F', 'B（C♭）と F', 'B (C♭) and F'), t('G 和 D♭', 'G と D♭', 'G and D♭'), t('D 和 A♭', 'D と A♭', 'D and A♭'), t('一个也不共用', '1 つもない', 'None')] },
          { prompt: t('三全音替代最典型的解决方式是？', '裏コードの典型的な解決は？', 'A tritone sub most typically resolves…'), options: [t('下行小二度', '短 2 度下行', 'down a minor second'), t('上行纯四度', '完全 4 度上行', 'up a perfect fourth'), t('下行大三度', '長 3 度下行', 'down a major third'), t('保持不动', 'そのまま', 'by staying put')] },
        ],
        answer: 0,
        explain: t('两个属七的三音和七音互换；替代和弦的根音再下行小二度就是目标和弦。', '2 つの属七は 3 度と 7 度を交換。代理和音の根音から短 2 度下が目標の和音。', 'The two dominants swap 3rd and 7th; the sub’s root falls a minor second to the target.'),
      },
      {
        id: 'b48-c2', type: 'choice', error: 'substitution', skills: ['function'], ref: 'omt2e-substitutions',
        variants: [
          { prompt: t('C 大调转回句 C–Am7–Dm7–G7 换成一串应用属七，变成？', 'ハ長調のターンアラウンド C–Am7–Dm7–G7 を副属七の連鎖にすると？', 'Turning the C turnaround C–Am7–Dm7–G7 into applied dominants gives…'), options: ['C–A7–D7–G7', 'C–A♭7–D♭7–G7', 'C–Am7♭5–Dm7♭5–G7', 'C–E7–A7–D7'] },
          { prompt: t('爵士里最常见的调式混合和弦有？', 'ジャズで一番多い借用和音は？', 'The most common mixture chords in jazz include…'), options: [t('iiø7 代替 ii7，以及 V7♭9', 'ii7 の代わりの iiø7、そして V7♭9', 'iiø7 for ii7, and V7♭9'), t('Imaj7 代替 I', 'I の代わりの Imaj7', 'Imaj7 for I'), t('IV 代替 V', 'V の代わりの IV', 'IV for V'), t('vi 代替 I', 'I の代わりの vi', 'vi for I')] },
        ],
        answer: 0,
        explain: t('五度进行里前一个和弦换成同根音属七；混合和弦用 le：iiø7、V7♭9，功能不变。', '5 度進行で前の和音を同じ根音の属七に。借用和音は le を使う：iiø7・V7♭9、機能は同じ。', 'In fifth motion, the earlier chord becomes a dominant on the same root; mixture chords use le — iiø7, V7♭9 — with unchanged function.'),
      },
      {
        id: 'b48-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: 'omt2e-substitutions',
        variants: [
          { prompt: t('乐谱上的和弦替代可能怎样出现？', 'リードシートで代理和音はどう現れる？', 'How might a substitution appear in a lead sheet?'), options: [t('不写（即兴加上）、直接写进和弦标记，或写在括号里', '書かない（即興で）、コード・シンボルに直接、または括弧内', 'Not at all (improvised), written into the symbols, or in parentheses'), t('只能写在括号里', '括弧内だけ', 'Only in parentheses'), t('一定要写成罗马数字', '必ずローマ数字で', 'Always as Roman numerals'), t('只能由贝斯手决定', 'ベースだけが決める', 'Only the bassist decides')] },
          { prompt: t('三全音替代可以替换哪些和弦？', '裏コードで替えられるのは？', 'Which chords can a tritone sub replace?'), options: [t('属七和弦（应用的或调内的）', '属七（副属でも調内でも）', 'Dominant sevenths, applied or diatonic'), t('只有主和弦', '主和音だけ', 'Only tonic chords'), t('只有小七和弦', '短七だけ', 'Only minor sevenths'), t('任何三和弦', 'どの三和音でも', 'Any triad')] },
        ],
        answer: 0,
        explain: t('替代可以不写、写进标记或放在括号里；三全音替代换的是属七。', '代理は書かない・シンボルに書く・括弧に入れる。裏コードが替えるのは属七。', 'Substitutions may be unwritten, written in, or parenthesised; tritone subs replace dominant sevenths.'),
      },
      G('b48-g1', 'tritoneSub', 2, ['calc']),
      G('b48-g2', 'secondaryDominant', 1, ['function']),
    ],
    lab: [{ id: 'b48-lab', type: 'lab', lab: 'jazz-subV-rootless', mandatory: true, minutes: 6 }],
  },
  pool: [G('b48-p1', 'tritoneSub', 3, ['calc']), G('b48-p2', 'secondaryDominant', 3, ['function'])],
};

// ===================== B4-9 负和声与 LCC =====================
export const LEVEL_B4_9 = {
  minutes: 12,
  insight: t('负和声把 G7 镜像成 D F A♭ C（Dm7♭5）：它照样把耳朵推回 C，只是从"下面"推。', 'ネガティブ・ハーモニーは G7 を D F A♭ C（Dm7♭5）に反転する：やはり C へ戻すが、「下から」押す。', 'Negative harmony mirrors G7 into D F A♭ C (Dm7♭5): it still pushes the ear back to C — just from below.'),
  sections: {
    discover: [
      {
        id: 'b49-d1', type: 'discover', ref: 'wiki-negative-harmony',
        prompt: t('先听 G7 → C，再听 Dm7♭5（D F A♭ C）→ C。第二个和弦也会"想回"C 吗？', 'まず G7 → C、次に Dm7♭5（D F A♭ C）→ C。2 つ目の和音も C へ「帰りたがる」？', 'Hear G7 → C, then Dm7♭5 (D F A♭ C) → C. Does the second chord also want to resolve to C?'),
        play: [{ label: 'G7 → C', audio: { chords: [[43, 59, 62, 65], [48, 64, 67, 72]], gap: 1000 } }, { label: 'Dm7♭5 → C', audio: { chords: [[50, 56, 60, 65], [48, 64, 67, 72]], gap: 1000 } }],
        options: [t('会：它也被拉回 C，只是颜色更暗', '帰りたがる：やはり C へ引かれるが色は暗い', 'Yes: it is pulled to C too, just in a darker colour'), t('完全不会', 'まったく帰らない', 'Not at all'), t('它会去 G', 'G へ行く', 'It wants to go to G')],
        answer: 0,
        insight: {
          title: t('沿 C–G 之间的轴镜像', 'C と G の間の軸で反転', 'Mirror across the axis between C and G'),
          text: t('负和声把每个音沿主音与属音之间的轴在五度圈上镜像（C 调：C↔G、D↔F、E↔E♭、A↔B♭、B↔A♭）。大三和弦变成小三和弦，上行变成下行，但朝主音的功能拉力保留下来。G7（G B D F）镜像后是 C A♭ F D，也就是 Dm7♭5。', 'ネガティブ・ハーモニーは各音を主音と属音の間の軸で五度圏上に反転する（C 調：C↔G・D↔F・E↔E♭・A↔B♭・B↔A♭）。長三和音は短三和音に、上行は下行になるが、主音への機能的な引力は残る。G7（G B D F）を反転すると C A♭ F D、つまり Dm7♭5。', 'Negative harmony mirrors every pitch across the axis between tonic and dominant on the circle of fifths (in C: C↔G, D↔F, E↔E♭, A↔B♭, B↔A♭). Major chords become minor, rising gestures fall, yet the functional pull toward the tonic remains. G7 (G B D F) mirrors to C A♭ F D — Dm7♭5.'),
        },
      },
    ],
    explain: [
      {
        id: 'b49-e1', type: 'page', ref: 'wiki-negative-harmony',
        title: t('负和声从哪里来', 'ネガティブ・ハーモニーの由来', 'Where negative harmony comes from'),
        text: [
          t('它源自 Ernst Levy（1895–1981）在《A Theory of Harmony》里的两极理论；"负和声"这个名称由萨克斯手 Steve Coleman 提出，21 世纪初经 Jacob Collier 广为人知。它和旋律倒影不同：负和声严格镜像每一个音，不为留在调里而调整。', 'Ernst Levy（1895–1981）の《A Theory of Harmony》の極性理論に由来し、「ネガティブ・ハーモニー」という名はサックス奏者 Steve Coleman が提唱、21 世紀初めに Jacob Collier によって広まった。旋律の反行とは違い、すべての音を厳密に反転し、調にとどまるための調整はしない。', 'It stems from Ernst Levy’s (1895–1981) theory of polarity in A Theory of Harmony; saxophonist Steve Coleman coined the term, and Jacob Collier brought it wide attention in the early 21st century. Unlike melodic inversion, it strictly reflects every pitch rather than adjusting to stay in the scale.'),
        ],
        visual: { kind: 'circle', highlight: ['C', 'G'] },
        tool: { feature: 'other' },
      },
      {
        id: 'b49-e2', type: 'page', ref: ['george-russell-lcc', 'omt2e-chord-scale'],
        title: t('LCC：Lydian 作为"引力中心"', 'LCC：リディアンを「重力の中心」に', 'The LCC: Lydian as the centre of gravity'),
        text: [
          t('George Russell 的 Lydian Chromatic Concept（1953 年首次出版）认为：每个和弦都有一个和它听起来最统一的音阶，叫它的母音阶。Lydian 音阶由六个上行五度组成（C G D A E B F♯），最下面的音叫 Lydian 主音。Russell 说在多次测试里，多数人觉得 C Lydian 叠成三度比 C 大调叠成三度更和 C 大三和弦统一。', 'George Russell の Lydian Chromatic Concept（1953 年初版）によれば、どの和音にもそれと最も統一して響く音階があり、それを親音階と呼ぶ。リディアン音階は上行する 6 つの 5 度（C G D A E B F♯）からなり、一番下の音をリディアン・トニックと呼ぶ。Russell は、多くのテストで C リディアンを 3 度に積んだほうが C 長調を積むより C 長三和音と統一して響くと多くの人が答えたと述べる。', 'George Russell’s Lydian Chromatic Concept (first published 1953) holds that every chord has a scale that sounds in closest unity with it, its parent scale. The Lydian scale is a ladder of six ascending fifths (C G D A E B F♯), and its lowest tone is the Lydian tonic. Russell reports that in repeated tests most listeners heard C Lydian in thirds as more unified with a C major triad than C major in thirds.'),
          t('我们学过的和弦—音阶理论，就是建立在 LCC 的基础上。', '前に学んだコード・スケール理論は、この LCC を土台にしている。', 'The chord-scale theory we met earlier is based on the LCC.'),
        ],
        audio: { notes: [48, 52, 55, 59, 62, 66, 69], mode: 'harmonic' },
      },
      {
        id: 'b49-e3', type: 'discover', practice: true, ref: 'wiki-negative-harmony',
        prompt: t('在 C 调里，C 大三和弦（C E G）的负和声是？', 'C 調で C 長三和音（C E G）のネガティブは？', 'In C, the negative of the C major triad (C E G) is…'),
        options: [t('C 小三和弦（G E♭ C）', 'C 短三和音（G E♭ C）', 'C minor (G E♭ C)'), t('A 小三和弦', 'A 短三和音', 'A minor'), t('还是 C 大三和弦', 'C 長三和音のまま', 'Still C major')],
        answer: 0,
        insight: { title: t('大变小', '長が短に', 'Major turns minor'), text: t('C↔G、E↔E♭、G↔C：C E G 变成 G E♭ C，也就是 C 小三和弦。', 'C↔G・E↔E♭・G↔C：C E G は G E♭ C、つまり C 短三和音。', 'C↔G, E↔E♭, G↔C: C E G becomes G E♭ C — C minor.') },
      },
    ],
    experiment: [
      { id: 'b49-x1', type: 'experiment', toy: 'negative', ref: 'wiki-negative-harmony',
        prompt: t('点 C 大调里的和弦，看它的负和声是哪几个音，再听原和弦、负和声、主和弦。哪些和弦镜像后还在 C 大调里？', 'ハ長調の和音を押してネガティブの音を見て、元の和音・ネガティブ・主和音を聴こう。反転してもハ長調に残る和音は？', 'Tap chords of C major to see their negatives, then hear original, negative and tonic. Which chords stay inside C major after mirroring?'),
        params: {},
        breakthrough: { id: 'b49-mirror', text: t('你把整个调照进了镜子里。', '調全体を鏡に映した。', 'You held a whole key up to the mirror.') } },
    ],
    challenge: [
      {
        id: 'b49-c1', type: 'choice', error: 'negative-harmony', skills: ['calc'], ref: 'wiki-negative-harmony',
        variants: [
          { prompt: t('C 调的负和声里，E 对应哪个音？', 'C 調のネガティブで E に対応する音は？', 'In C, which note does E map to?'), options: ['E♭', 'E', 'A', 'B♭'] },
          { prompt: t('C 调的负和声里，G7（G B D F）变成？', 'C 調のネガティブで G7（G B D F）は？', 'In C, G7 (G B D F) becomes…'), options: ['C A♭ F D', 'C E G B♭', 'D F♯ A C', 'G B D F'] },
          { prompt: t('C 调的负和声里，F 大三和弦（F A C）变成？', 'C 調のネガティブで F 長三和音（F A C）は？', 'In C, the F major triad (F A C) becomes…'), options: ['D B♭ G（G 小三和弦）', 'F A♭ C', 'A C E', 'C E G'] },
        ],
        answer: 0,
        explain: t('C 调的轴在 C 与 G 之间：C↔G、D↔F、E↔E♭、A↔B♭、B↔A♭、F♯↔D♭。', 'C 調の軸は C と G の間：C↔G・D↔F・E↔E♭・A↔B♭・B↔A♭・F♯↔D♭。', 'In C the axis lies between C and G: C↔G, D↔F, E↔E♭, A↔B♭, B↔A♭, F♯↔D♭.'),
      },
      {
        id: 'b49-c2', type: 'choice', error: 'concept', skills: ['identify'], ref: 'wiki-negative-harmony',
        variants: [
          { prompt: t('负和声和旋律倒影的区别是？', 'ネガティブ・ハーモニーと旋律の反行の違いは？', 'How does negative harmony differ from melodic inversion?'), options: [t('负和声严格镜像每个音，不为留在调里而调整', 'すべての音を厳密に反転し、調にとどまる調整をしない', 'It strictly reflects every pitch, without adjusting to stay in the scale'), t('没有区别', '違いはない', 'No difference'), t('负和声只用于小调', '短調だけ', 'It works only in minor'), t('负和声保持所有和弦不变', 'すべての和音をそのまま保つ', 'It keeps every chord unchanged')] },
          { prompt: t('"负和声"这个名称由谁提出？', '「ネガティブ・ハーモニー」の名を提唱したのは？', 'Who coined the term “negative harmony”?'), options: ['Steve Coleman', 'Ernst Levy', 'Jacob Collier', 'Hugo Riemann'] },
        ],
        answer: 0,
        explain: t('理论源自 Ernst Levy，名称由 Steve Coleman 提出，Jacob Collier 让它流行；它严格镜像每个音。', '理論は Ernst Levy、名称は Steve Coleman、広めたのは Jacob Collier。すべての音を厳密に反転する。', 'Levy’s theory, Coleman’s name, Collier’s popularity; every pitch is strictly reflected.'),
      },
      {
        id: 'b49-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: 'george-russell-lcc',
        variants: [
          { prompt: t('LCC 里的 Lydian 音阶由什么组成？', 'LCC のリディアン音階は何からなる？', 'In the LCC, the Lydian scale consists of…'), options: [t('六个上行的纯五度', '上行する完全 5 度 6 つ', 'six ascending perfect fifths'), t('七个半音', '半音 7 つ', 'seven half steps'), t('两个减七和弦', '減七和音 2 つ', 'two diminished sevenths'), t('三个大三度', '長 3 度 3 つ', 'three major thirds')] },
          { prompt: t('LCC 里，一个和弦"最统一"的音阶叫？', 'LCC で、和音と「最も統一する」音階は？', 'In the LCC, the scale most unified with a chord is its…'), options: [t('母音阶（parent scale）', '親音階（parent scale）', 'parent scale'), t('副音阶', '副音階', 'secondary scale'), t('负音阶', 'ネガティブ音階', 'negative scale'), t('布鲁斯音阶', 'ブルース・スケール', 'blues scale')] },
        ],
        answer: 0,
        explain: t('Lydian 音阶 = 六个上行五度，最下面是 Lydian 主音；和和弦最统一的音阶叫母音阶。', 'リディアン音階 = 上行する 5 度 6 つ、一番下がリディアン・トニック。和音と最も統一する音階が親音階。', 'Lydian scale = six ascending fifths, its lowest tone the Lydian tonic; the scale most unified with a chord is its parent scale.'),
      },
      G('b49-g1', 'negative', 3, ['calc']),
    ],
  },
  pool: [G('b49-p1', 'negative', 5, ['calc'])],
};

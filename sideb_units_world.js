// Side-B 第 5 章（世界音乐与律学）：B5-1 ~ B5-4。
// 出处（每条事实都在原文里核对过）：
//   七声调式 = 在五声调式的小三度音程间加入两个偏音；按加入的偏音分三种：清乐（加清角与变宫，又叫新音阶、下徵音阶）、
//     燕乐（加清角与闰，又叫俗乐音阶、清商音阶）、雅乐（加变徵与变宫，又叫古音阶、正声音阶）；
//     多了两个音，但没有改变五声调式的基本特点，仍以五声调式的方法命名（如清乐宫调式）：ref:zhwiki-heptatonic
//   旋宫：《礼记·礼运》"五声六律十二管旋相为宫"；《乐书要录》的"旋相为宫图"可查同宫（均）之下各调调头（同宫转调）与异宫之下各调调头（异宫转调）；
//     清代王坦《琴旨》："以角弦易为宫弦，其宫旋；角既为宫，则宫转为徵……此之谓旋宫转调也"；
//     "七宫还原"：向属方向或下属方向在七个不同调高上旋宫转调，最终回到起始调：ref:huain-xuangong
//   五种调式的色彩（宫、徵近大调色彩；商、角、羽近小调色彩，羽调式功能上最接近西洋小调）：ref:sccm-ethnic-modes；十二律名以黄钟为 C：ref:zhwiki-shierlu
//   thaat：Vishnu Narayan Bhatkhande（1860–1936）的体系，仿照卡纳提克的 melakarta（约 1640 年由 Venkatamakhin 提出）；
//     七个 swara：Sa Re Ga Ma Pa Dha Ni，Sa 不固定音高（像首调唱名）；S、P 不变，R G D N 可以是本位或降（komal），M 可以是本位或升（tivra），
//     共 2⁵ = 32 种，Bhatkhande 选出十个：Bilawal、Kalyan、Khamaj、Bhairav、Poorvi、Marwa、Kafi、Asavari、Bhairavi、Todi；
//     每个拉格都基于（或变化自）其中一个；不少 thaat 对应西方调式（Bilaval = Ionian、Kalyan = Lydian、Khamaj = Mixolydian、Kafi = Dorian、
//     Asavari = Aeolian、Bhairavi = Phrygian），Bhairav 对应双和声音阶：ref:wiki-thaat
//   木卡姆：由 jins（复数 ajnas）组成，jins 多数是四个相邻音（四音列），也有三音、五音的；音阶有下方（第一）jins 和上方（第二）jins，
//     多按下方 jins 分族；木卡姆音阶是微分音的，不按十二平均律，四分之一音只是记谱惯例；多数含纯五度或纯四度（或都有），八度都是纯的：ref:wiki-arabic-maqam
//   jins：音程决定它的性格，移调不变；主音是旋律回归的音；ghammaz 是除主音外最重要的音，也是开始新 jins（转调）最常见的起点；
//     木卡姆其实是在许多 jins 之间走的一条路：ref:maqamworld-jins；各木卡姆的音与播放频率：ref:maqamworld-maqam
//   泛音列：频率是基音整数倍的一串音；弦或空气柱同时以许多模式振动；最低的那个分音（基音）通常被听成音高，
//     稳定音的音色很大程度取决于各泛音的相对强弱；与十二平均律相比，有些泛音明显偏低或偏高（谱例标出各泛音与平均律相差的音分）：ref:wiki-harmonic-series
//   五度相生律：用纯五度 3:2（八度 2:1 之后最简单的比）一个接一个生成；十二个纯五度比七个八度多出约 23.46 音分，叫毕达哥拉斯音差；
//     十二音的五度相生律只用十一个纯五度，剩下的那个（如 G♯–E♭ 的减六度）严重不准，叫狼五度：ref:wiki-pythagorean
//   中全音律：把五度缩小来改善三度；名字来自用几何平均把大三度分成两个相等的全音；四分之一音差中全音律让大三度是纯的 5:4，
//     Zarlino 在 1571 年用清楚的数学描述了它；狼五度让有些调不能用；十二平均律让所有半音一样大：ref:wiki-meantone
//   Werckmeister III（1691 年论著中的"正确的律"）：大多数五度是纯的，只有 C–G、G–D、D–A、B–F♯ 各缩小 1/4 音差；
//     所有大三度都接近 400 音分，因为不是所有五度都缩小，所以没有狼五度、十二个调都能用：ref:wiki-werckmeister
//   现在通称的 Vallotti 律（其实是误称）：六个五度各缩小 1/6 毕达哥拉斯音差，另外六个是纯的：ref:wiki-vallotti
//   音分 = 1200 × log₂(频率比)；律制的具体数值由 temperaments.js 按上面的定义计算
const t = (zh, ja, en) => ({ zh, ja, en });
const G = (id, gen, count, skills, params) => ({ id, type: 'gen', gen, count, skills, ...(params ? { params } : {}) });
const hzOf = (f0, ns) => ns.map((n) => 69 + 12 * Math.log2((f0 * n) / 440));

// ===================== B5-1 中国七声调式与旋宫 =====================
export const LEVEL_B5_1 = {
  minutes: 13,
  insight: t('"旋宫"就是把宫音沿五度移一步：阶名不变，调高换了；"同宫"则是宫音不动、换一个音当主音。', '「旋宮」は宮音を 5 度ずらすこと：階名はそのまま、調の高さが変わる。「同宮」は宮音を動かさず主音を替える。', 'Rotating the gong moves it by a fifth: the degree names stay, the pitch level changes; staying in the same gong keeps it and picks a different tonic.'),
  sections: {
    discover: [
      {
        id: 'b51-d1', type: 'discover', ref: 'zhwiki-heptatonic',
        prompt: t('三条都是 C 宫的七声音阶，五个正音（宫商角徵羽）都一样。听一听：差别出在哪两个音上？', '3 つとも C 宮の七声音階で、5 つの正音（宮商角徴羽）は同じ。違いはどの 2 音？', 'All three are seven-tone scales on C gong with the same five main notes (gong, shang, jue, zhi, yu). Where do they differ?'),
        play: [
          { label: t('A：清乐', 'A：清楽', 'A: Qingyue'), audio: { notes: [60, 62, 64, 65, 67, 69, 71, 72], mode: 'melody' } },
          { label: t('B：雅乐', 'B：雅楽', 'B: Yayue'), audio: { notes: [60, 62, 64, 66, 67, 69, 71, 72], mode: 'melody' } },
          { label: t('C：燕乐', 'C：燕楽', 'C: Yanyue'), audio: { notes: [60, 62, 64, 65, 67, 69, 70, 72], mode: 'melody' } },
        ],
        options: [t('在两个小三度里加进去的"偏音"不同', '2 つの短 3 度の間に加えた「偏音」が違う', 'In the two extra notes added inside the minor thirds'), t('五个正音不同', '5 つの正音が違う', 'In the five main notes'), t('三条一模一样', 'まったく同じ', 'They are identical')],
        answer: 0,
        insight: {
          title: t('七声 = 五声 + 两个偏音', '七声 = 五声 + 2 つの偏音', 'Seven tones = five tones + two passing tones'),
          text: t('七声调式是在五声调式的小三度音程间加入两个偏音：清乐加清角和变宫（F、B），雅乐加变徵和变宫（F♯、B），燕乐加清角和闰（F、B♭）。它们没有改变五声调式的基本特点，所以仍按五声调式命名，例如"清乐宫调式"。', '七声調式は五声調式の短 3 度の間に偏音を 2 つ加えたもの：清楽は清角と変宮（F・B）、雅楽は変徴と変宮（F♯・B）、燕楽は清角と閏（F・B♭）。五声の基本的な特徴は変わらないので、名前も五声のやり方で「清楽宮調式」などと呼ぶ。', 'Seven-tone modes add two pian notes inside the minor thirds of the pentatonic: Qingyue adds qingjue and biangong (F, B), Yayue bianzhi and biangong (F♯, B), Yanyue qingjue and run (F, B♭). The pentatonic character stays, so they keep pentatonic names, such as “Qingyue gong mode”.'),
        },
      },
    ],
    explain: [
      {
        id: 'b51-e1', type: 'page', ref: ['zhwiki-heptatonic', 'sccm-ethnic-modes'],
        title: t('三种七声音阶，五种调式', '3 種の七声音階、5 つの調式', 'Three seven-tone scales, five modes'),
        text: [
          t('清乐音阶又叫新音阶、下徵音阶；雅乐音阶又叫古音阶、正声音阶；燕乐音阶又叫俗乐音阶、清商音阶。调式仍以五个正音为主音：宫、商、角、徵、羽——宫、徵调式偏大调色彩，商、角、羽调式偏小调色彩，羽调式在功能上最接近西洋小调。', '清楽音階は新音階・下徴音階、雅楽音階は古音階・正声音階、燕楽音階は俗楽音階・清商音階とも呼ぶ。調式の主音は 5 つの正音：宮・商・角・徴・羽——宮・徴調式は長調的、商・角・羽調式は短調的な色彩で、羽調式は機能的に西洋の短調に最も近い。', 'Qingyue is also called the “new scale”, Yayue the “ancient scale”, Yanyue the “popular scale”. Tonics are still the five main notes: gong, shang, jue, zhi, yu — gong and zhi modes lean major, shang, jue and yu lean minor, and the yu mode is functionally closest to Western minor.'),
        ],
        tool: { feature: 'chinese' },
      },
      {
        id: 'b51-e2', type: 'page', ref: 'huain-xuangong',
        title: t('旋相为宫', '旋相為宮', 'Rotating the gong'),
        text: [
          t('《礼记·礼运》已有"五声六律十二管旋相为宫"的说法。清代王坦《琴旨》把它说得很清楚："以角弦易为宫弦，其宫旋；角既为宫，则宫转为徵……此之谓旋宫转调也"——原来的角音当了新的宫，原来的宫就成了徵。', '《礼記・礼運》にすでに「五声六律十二管旋相為宮」とある。清代の王坦《琴旨》は「角の弦を宮の弦に替えれば宮が旋る。角が宮になれば宮は徴になる……これを旋宮転調という」と明確に述べる——元の角が新しい宮になり、元の宮は徴になる。', 'The Liji already speaks of the five tones, six pitch-pipes and twelve pipes “each taking its turn as gong”. Wang Tan’s Qing-dynasty Qinzhi spells it out: “make the jue string the gong string and the gong rotates; once jue is gong, gong becomes zhi … this is called rotating the gong to change key” — the old jue becomes the new gong and the old gong becomes zhi.'),
          t('同一个宫音下换主音（如 C 宫系统里的 C 宫、D 商、E 角、G 徵、A 羽）叫同宫转调；宫音本身换了叫异宫转调。"七宫还原"则向属方向或下属方向在七个调高上旋宫，最后回到起点。', '同じ宮音のまま主音を替える（C 宮系統の C 宮・D 商・E 角・G 徴・A 羽）のが同宮転調、宮音そのものが変わるのが異宮転調。「七宮還原」は属方向か下属方向に 7 つの調高を旋宮して出発点に戻る。', 'Changing the tonic under one gong (in the C gong system: C gong, D shang, E jue, G zhi, A yu) is same-gong modulation; changing the gong itself is different-gong modulation. “Seven gongs returning” rotates through seven pitch levels towards the dominant or subdominant side and arrives back home.'),
        ],
      },
      {
        id: 'b51-e3', type: 'discover', practice: true, ref: 'huain-xuangong',
        prompt: t('C 宫系统（宫音是 C）里，以 G 为主音的是什么调式？', 'C 宮系統（宮音 C）で、G を主音とする調式は？', 'In the C gong system (gong = C), which mode has G as its tonic?'),
        options: [t('徵调式', '徴調式', 'Zhi mode'), t('商调式', '商調式', 'Shang mode'), t('羽调式', '羽調式', 'Yu mode')],
        answer: 0,
        insight: { title: t('同宫换主音', '同宮で主音を替える', 'Same gong, new tonic'), text: t('C 宫系统的五个正音是 C 宫、D 商、E 角、G 徵、A 羽；以 G 为主音就是 G 徵调式——宫音没变，这叫同宫。', 'C 宮系統の 5 つの正音は C 宮・D 商・E 角・G 徴・A 羽。G が主音なら G 徴調式——宮音は変わらないので同宮。', 'The C gong system’s main notes are C gong, D shang, E jue, G zhi and A yu; with G as tonic you have the G zhi mode — the gong is unchanged, so this is same-gong.') },
      },
    ],
    experiment: [
      { id: 'b51-x1', type: 'experiment', toy: 'xuangong', ref: ['zhwiki-heptatonic', 'huain-xuangong', 'zhwiki-shierlu'],
        prompt: t('选调式和音阶种类，看每个音的阶名（偏音高亮）；再按"宫音上移 / 下移纯五度"旋宫，看律名和音怎么变。连续上移七次会回到哪里？', '調式と音階の種類を選び、各音の階名（偏音はハイライト）を見よう。「宮音を完全 5 度上 / 下へ」で旋宮し、律名と音の変化を見る。7 回続けて上げるとどこへ戻る？', 'Pick a mode and scale type and read each note’s degree name (pian notes highlighted); then rotate the gong up or down a fifth and watch the pitch name and notes change. Where do seven rotations upward take you?'),
        params: {},
        breakthrough: { id: 'b51-rotate', text: t('你亲手旋了宫：同一套阶名，换了一个调高。', '自分の手で旋宮した：同じ階名で、調の高さが変わった。', 'You rotated the gong yourself: the same degree names at a new pitch.') } },
    ],
    challenge: [
      {
        id: 'b51-c1', type: 'choice', error: 'chinese-mode', skills: ['identify'], ref: 'zhwiki-heptatonic',
        variants: [
          { prompt: t('雅乐音阶在五声之外加的是哪两个偏音？', '雅楽音階が五声に加える 2 つの偏音は？', 'Which two pian notes does the Yayue scale add?'), options: [t('变徵、变宫', '変徴・変宮', 'bianzhi and biangong'), t('清角、变宫', '清角・変宮', 'qingjue and biangong'), t('清角、闰', '清角・閏', 'qingjue and run'), t('变徵、闰', '変徴・閏', 'bianzhi and run')] },
          { prompt: t('燕乐音阶在五声之外加的是哪两个偏音？', '燕楽音階が五声に加える 2 つの偏音は？', 'Which two pian notes does the Yanyue scale add?'), options: [t('清角、闰', '清角・閏', 'qingjue and run'), t('变徵、变宫', '変徴・変宮', 'bianzhi and biangong'), t('清角、变宫', '清角・変宮', 'qingjue and biangong'), t('变宫、闰', '変宮・閏', 'biangong and run')] },
          { prompt: t('"新音阶""下徵音阶"指的是哪种七声音阶？', '「新音階」「下徴音階」はどの七声音階？', 'The “new scale” or “lower-zhi scale” is…'), options: [t('清乐音阶', '清楽音階', 'the Qingyue scale'), t('雅乐音阶', '雅楽音階', 'the Yayue scale'), t('燕乐音阶', '燕楽音階', 'the Yanyue scale'), t('五声音阶', '五声音階', 'the pentatonic scale')] },
        ],
        answer: 0,
        explain: t('清乐：清角 + 变宫；雅乐：变徵 + 变宫；燕乐：清角 + 闰。清乐又叫新音阶、下徵音阶。', '清楽：清角 + 変宮、雅楽：変徴 + 変宮、燕楽：清角 + 閏。清楽は新音階・下徴音階とも。', 'Qingyue: qingjue + biangong; Yayue: bianzhi + biangong; Yanyue: qingjue + run. Qingyue is also the “new” or “lower-zhi” scale.'),
      },
      {
        id: 'b51-c2', type: 'choice', error: 'chinese-mode', skills: ['calc'], ref: 'huain-xuangong',
        variants: [
          { prompt: t('C 宫旋宫（宫音上移纯五度）一次，新的宫音是？', 'C 宮を 1 回旋宮（宮音を完全 5 度上へ）すると新しい宮は？', 'Rotating C gong once (gong up a fifth), the new gong is…'), options: ['G', 'F', 'D', 'A'] },
          { prompt: t('C 宫系统里，下面哪一个不是同宫的五种调式之一？', 'C 宮系統で、同宮の 5 つの調式でないのは？', 'Which is NOT one of the five modes of the C gong system?'), options: [t('F 宫', 'F 宮', 'F gong'), t('D 商', 'D 商', 'D shang'), t('G 徵', 'G 徴', 'G zhi'), t('A 羽', 'A 羽', 'A yu')] },
          { prompt: t('宫音不动、只换主音，叫？', '宮音を動かさず主音だけ替えるのは？', 'Keeping the gong and only changing the tonic is called…'), options: [t('同宫转调', '同宮転調', 'same-gong modulation'), t('异宫转调', '異宮転調', 'different-gong modulation'), t('七宫还原', '七宮還原', 'seven gongs returning'), t('偏音', '偏音', 'a pian note')] },
        ],
        answer: 0,
        explain: t('宫音上移纯五度：C → G；C 宫系统：C 宫、D 商、E 角、G 徵、A 羽；宫音不变换主音是同宫转调。', '宮音を完全 5 度上へ：C → G。C 宮系統：C 宮・D 商・E 角・G 徴・A 羽。宮音はそのまま主音を替えるのが同宮転調。', 'Gong up a fifth: C → G; the C gong system is C gong, D shang, E jue, G zhi, A yu; keeping the gong and moving the tonic is same-gong modulation.'),
      },
      {
        id: 'b51-c3', type: 'choice', error: 'chinese-mode', skills: ['identify'], ref: 'sccm-ethnic-modes',
        variants: [
          { prompt: t('五种调式里，功能上最接近西洋小调的是？', '5 つの調式で、機能的に西洋の短調に最も近いのは？', 'Of the five modes, which is functionally closest to Western minor?'), options: [t('羽调式', '羽調式', 'Yu'), t('宫调式', '宮調式', 'Gong'), t('徵调式', '徴調式', 'Zhi'), t('商调式', '商調式', 'Shang')] },
          { prompt: t('下面哪两种调式偏大调色彩？', '長調的な色彩なのは？', 'Which two modes lean towards a major colour?'), options: [t('宫、徵', '宮・徴', 'Gong and zhi'), t('商、羽', '商・羽', 'Shang and yu'), t('角、羽', '角・羽', 'Jue and yu'), t('商、角', '商・角', 'Shang and jue')] },
        ],
        answer: 0,
        explain: t('宫、徵调式偏大调色彩；商、角、羽偏小调色彩，羽调式最接近西洋小调。', '宮・徴は長調的、商・角・羽は短調的、羽調式が西洋の短調に最も近い。', 'Gong and zhi lean major; shang, jue and yu lean minor, yu being closest to Western minor.'),
      },
      G('b51-g1', 'chineseNote', 3, ['spell']),
    ],
  },
  pool: [G('b51-p1', 'chineseNote', 5, ['spell', 'identify'])],
};

// ===================== B5-2 thaat 与木卡姆 =====================
export const LEVEL_B5_2 = {
  minutes: 13,
  insight: t('thaat 是在"五个可变音各取哪一种"里选（32 种里选出 10 个）；木卡姆是几块 jins 拼起来，音不一定落在半音上。', 'ターートは「5 つの可変音をどちらにするか」の組み合わせ（32 から 10）。マカームはジンスをつないだもので、音は半音に乗るとは限らない。', 'A thaat is a choice of form for each of five variable notes (ten picked from 32); a maqam is built from ajnas whose notes need not land on semitones.'),
  sections: {
    discover: [
      {
        id: 'b52-d1', type: 'discover', ref: ['maqamworld-maqam', 'wiki-arabic-maqam'],
        prompt: t('先听 C 大调音阶，再听木卡姆 Rast（按 MaqamWorld 的频率）。第三个音和第七个音有什么不同？', 'まずハ長調、次にマカーム・ラースト（MaqamWorld の周波数）。3 つ目と 7 つ目の音は何が違う？', 'Hear C major, then maqam Rast (at MaqamWorld’s frequencies). What is different about the third and seventh notes?'),
        play: [{ label: t('C 大调', 'ハ長調', 'C major'), audio: { notes: [60, 62, 64, 65, 67, 69, 71, 72], mode: 'melody' } }, { label: 'Rast', audio: { notes: hzOf(1, [260.74, 293.33, 320, 347.65, 391.11, 440, 482, 521.48]), mode: 'melody' } }],
        options: [t('落在两个半音之间（比 E、B 低、比 E♭、B♭ 高）', '2 つの半音の間（E・B より低く、E♭・B♭ より高い）', 'They fall between the semitones (lower than E and B, higher than E♭ and B♭)'), t('完全一样', 'まったく同じ', 'Exactly the same'), t('高了一个八度', '1 オクターヴ高い', 'An octave higher')],
        answer: 0,
        insight: {
          title: t('木卡姆不按十二平均律', 'マカームは 12 平均律ではない', 'Maqam is not twelve-tone equal temperament'),
          text: t('木卡姆音阶是微分音的，不按十二平均律；记谱时常用"四分之一音"（半降号）表示，但这只是惯例，实际音高因地区和时代而不同。多数木卡姆含纯五度或纯四度，八度都是纯的。', 'マカームの音階は微分音的で 12 平均律ではない。記譜ではよく「4 分音」（半フラット）で表すが慣例にすぎず、実際の音高は地域や時代で違う。多くは完全 5 度か完全 4 度を含み、オクターヴはすべて完全。', 'Maqam scales are microtonal, not twelve-tone equal temperament; quarter-tone notation (half-flats) is only a convention, and real pitches vary by region and era. Most maqam scales contain a perfect fifth or fourth, and all octaves are perfect.'),
        },
      },
    ],
    explain: [
      {
        id: 'b52-e1', type: 'page', ref: 'wiki-thaat',
        title: t('Bhatkhande 的十个 thaat', 'Bhatkhande の 10 のターート', 'Bhatkhande’s ten thaats'),
        text: [
          t('印度斯坦音乐的七个 swara 是 Sa Re Ga Ma Pa Dha Ni，Sa 不固定音高，像首调唱名。Sa 和 Pa 不变；Re、Ga、Dha、Ni 可以是本位或降（komal），Ma 可以是本位或升（tivra）——五个可变音各取一种，一共 2⁵ = 32 种。Vishnu Narayan Bhatkhande（1860–1936）仿照卡纳提克的 melakarta，选出十个：Bilawal、Kalyan、Khamaj、Bhairav、Poorvi、Marwa、Kafi、Asavari、Bhairavi、Todi；每个拉格都基于（或变化自）其中之一。', 'ヒンドゥスターニー音楽の 7 つのスワラは Sa Re Ga Ma Pa Dha Ni で、Sa は固定の音高を持たない（移動ドのよう）。Sa と Pa は不変、Re・Ga・Dha・Ni は本位か下げ（コーマル）、Ma は本位か上げ（ティーヴラ）——5 つの可変音から 1 つずつで 2⁵ = 32 通り。Vishnu Narayan Bhatkhande（1860–1936）はカルナータカのメーラカルタにならい 10 個を選んだ：Bilawal・Kalyan・Khamaj・Bhairav・Poorvi・Marwa・Kafi・Asavari・Bhairavi・Todi。どのラーガもそのどれかに基づく（か変化形）。', 'The seven Hindustani swaras are Sa Re Ga Ma Pa Dha Ni, with Sa not tied to a pitch, like movable do. Sa and Pa are fixed; Re, Ga, Dha and Ni can be natural or flat (komal), Ma natural or sharp (tivra) — one form each for five variable notes gives 2⁵ = 32 combinations. Vishnu Narayan Bhatkhande (1860–1936), modelling his system on the Carnatic melakarta, chose ten: Bilawal, Kalyan, Khamaj, Bhairav, Poorvi, Marwa, Kafi, Asavari, Bhairavi and Todi; every raga is based on, or varies, one of them.'),
          t('不少 thaat 和西方调式音一样：Bilaval = Ionian、Kalyan = Lydian、Khamaj = Mixolydian、Kafi = Dorian、Asavari = Aeolian、Bhairavi = Phrygian；Bhairav 则对应双和声音阶。', '多くのターートは西洋の旋法と同じ音：Bilaval = イオニアン、Kalyan = リディアン、Khamaj = ミクソリディアン、Kafi = ドリアン、Asavari = エオリアン、Bhairavi = フリジアン。Bhairav はダブル・ハーモニック・スケールに対応。', 'Several thaats match Western modes: Bilaval = Ionian, Kalyan = Lydian, Khamaj = Mixolydian, Kafi = Dorian, Asavari = Aeolian, Bhairavi = Phrygian; Bhairav corresponds to the double harmonic scale.'),
        ],
        tool: { feature: 'world' },
      },
      {
        id: 'b52-e2', type: 'page', ref: ['wiki-arabic-maqam', 'maqamworld-jins'],
        title: t('jins：拼成木卡姆的积木', 'ジンス：マカームの積み木', 'Ajnas: the building blocks of a maqam'),
        text: [
          t('木卡姆由一块块 jins（复数 ajnas）组成：多数是四个相邻音（四音列），也有三音、五音的。音阶有下方（第一）jins 和上方（第二）jins，木卡姆多半按下方 jins 分族。jins 的性格由它的音程决定，移调也不变。', 'マカームはジンス（複数形アジュナース）でできている：多くは隣り合う 4 音（テトラコード）、3 音や 5 音のものもある。音階には下（第 1）と上（第 2）のジンスがあり、多くは下のジンスで族に分ける。ジンスの性格は音程で決まり、移調しても変わらない。', 'A maqam is built from ajnas (singular jins): mostly four adjacent notes (a tetrachord), sometimes three or five. A scale has a lower (first) and an upper (second) jins, and maqams are mostly grouped into families by the lower one. A jins’s intervals define its character, unchanged by transposition.'),
          t('jins 的主音是旋律回归的音；ghammaz 是除主音外最重要的音，也是开始新 jins（转调）最常见的起点——所以 MaqamWorld 说，木卡姆其实是在许多 jins 之间走的一条路。', 'ジンスの主音は旋律が戻る音。ガンマーズは主音以外で最も重要な音で、新しいジンス（転調）を始める最もよくある起点——だから MaqamWorld は、マカームは多くのジンスの間をたどる道だという。', 'A jins’s tonic is where the melody returns; the ghammaz is the most important note besides the tonic and the commonest starting point for a new jins (modulation) — which is why MaqamWorld calls a maqam a pathway among many ajnas.'),
        ],
      },
      {
        id: 'b52-e3', type: 'discover', practice: true, ref: 'wiki-thaat',
        prompt: t('S、P 不变，R G D N 各有本位 / 降两种，M 有本位 / 升两种。一共能组合出几种七声音阶？', 'S・P は不変、R G D N は本位 / 下げ、M は本位 / 上げ。七音音階はいくつ作れる？', 'S and P are fixed; R, G, D and N can be natural or flat, M natural or sharp. How many seven-note scales are possible?'),
        options: ['32', '10', '12'],
        answer: 0,
        insight: { title: t('2 × 2 × 2 × 2 × 2', '2 × 2 × 2 × 2 × 2', '2 × 2 × 2 × 2 × 2'), text: t('五个可变音各两种：2⁵ = 32；Bhatkhande 从中选出当时常用的十个。', '5 つの可変音が各 2 通り：2⁵ = 32。Bhatkhande はそこから当時よく使われた 10 個を選んだ。', 'Five variable notes, two forms each: 2⁵ = 32; Bhatkhande highlighted the ten common in his day.') },
      },
    ],
    experiment: [
      { id: 'b52-x1', type: 'experiment', toy: 'world', ref: ['wiki-thaat', 'maqamworld-maqam', 'maqamworld-jins'],
        prompt: t('在 thaat 里点 Kalyan、Bhairav、Todi，看变化的音（高亮）和对应的西方调式；切到木卡姆，听 Rast、Bayati、Hijaz，看相邻音程里的 ¾ 和 1½。', 'ターートで Kalyan・Bhairav・Todi を押し、変化音（ハイライト）と西洋の旋法を見よう。マカームに切り替え、Rast・Bayati・Hijaz を聴き、隣の音程の ¾ と 1½ を見る。', 'Under thaat, tap Kalyan, Bhairav and Todi to see the altered notes (highlighted) and Western equivalents; switch to maqam and hear Rast, Bayati and Hijaz — look for the ¾ and 1½ steps.'),
        params: {},
        breakthrough: { id: 'b52-world', text: t('你在两套体系里都听到了"十二平均律以外"的颜色。', '2 つの体系で「12 平均律の外」の色を聴いた。', 'You heard colours beyond twelve-tone equal temperament in two systems.') } },
    ],
    challenge: [
      {
        id: 'b52-c1', type: 'choice', error: 'world-system', skills: ['identify'], ref: 'wiki-thaat',
        variants: [
          { prompt: t('Kalyan thaat 和哪个西方调式音一样？', 'Kalyan ターートと同じ音の西洋の旋法は？', 'Kalyan thaat has the same notes as which Western mode?'), options: ['Lydian', 'Ionian', 'Mixolydian', 'Dorian'] },
          { prompt: t('Bhairavi thaat 和哪个西方调式音一样？', 'Bhairavi ターートと同じ音の西洋の旋法は？', 'Bhairavi thaat has the same notes as which Western mode?'), options: ['Phrygian', 'Aeolian', 'Dorian', 'Locrian'] },
          { prompt: t('Khamaj thaat 的特征是？', 'Khamaj ターートの特徴は？', 'Khamaj thaat is distinguished by…'), options: [t('降低的 Ni（komal n）', '下げた Ni（コーマル n）', 'a flat Ni (komal n)'), t('升高的 Ma（tivra M）', '上げた Ma（ティーヴラ M）', 'a sharp Ma (tivra M)'), t('全部本位音', 'すべて本位', 'all natural notes'), t('降低的 Re 和 Dha', '下げた Re と Dha', 'flat Re and Dha')] },
        ],
        answer: 0,
        explain: t('Kalyan = Lydian（tivra Ma），Bhairavi = Phrygian（r g d n 都降），Khamaj = Mixolydian（komal Ni）。', 'Kalyan = リディアン（ティーヴラ Ma）、Bhairavi = フリジアン（r g d n すべて下げ）、Khamaj = ミクソリディアン（コーマル Ni）。', 'Kalyan = Lydian (tivra Ma), Bhairavi = Phrygian (r g d n all flat), Khamaj = Mixolydian (komal Ni).'),
      },
      {
        id: 'b52-c2', type: 'choice', error: 'world-system', skills: ['identify'], ref: ['wiki-arabic-maqam', 'maqamworld-jins'],
        variants: [
          { prompt: t('jins 最常见的大小是？', 'ジンスで一番多い大きさは？', 'The most common size of a jins is…'), options: [t('四个相邻音（四音列）', '隣り合う 4 音（テトラコード）', 'four adjacent notes (a tetrachord)'), t('七个音', '7 音', 'seven notes'), t('十二个音', '12 音', 'twelve notes'), t('两个音', '2 音', 'two notes')] },
          { prompt: t('木卡姆多半按什么分族？', 'マカームは多く何で族に分ける？', 'Maqams are mostly grouped into families by…'), options: [t('下方（第一）jins', '下（第 1）のジンス', 'their lower (first) jins'), t('上方 jins', '上のジンス', 'their upper jins'), t('速度', 'テンポ', 'tempo'), t('音域', '音域', 'range')] },
          { prompt: t('ghammaz 是？', 'ガンマーズとは？', 'The ghammaz is…'), options: [t('除主音外最重要的音，常是开始新 jins 的地方', '主音以外で最も重要な音、新しいジンスを始める所', 'the most important note besides the tonic, often where a new jins begins'), t('最低的音', '一番低い音', 'the lowest note'), t('一种节奏', 'リズムの一種', 'a rhythm'), t('一种乐器', '楽器の一種', 'an instrument')] },
        ],
        answer: 0,
        explain: t('jins 多为四音列；木卡姆多按下方 jins 分族；ghammaz 是主音之外最重要、最常开始新 jins 的音。', 'ジンスは多くテトラコード。マカームは多く下のジンスで族に分ける。ガンマーズは主音以外で最も重要、新しいジンスがよく始まる音。', 'Ajnas are mostly tetrachords; maqams are grouped by their lower jins; the ghammaz is the key note besides the tonic, where new ajnas often begin.'),
      },
      {
        id: 'b52-c3', type: 'choice', error: 'world-system', skills: ['apply'], ref: 'wiki-arabic-maqam',
        variants: [
          { prompt: t('木卡姆记谱里的"四分之一音"应该怎么理解？', 'マカームの記譜の「4 分音」はどう理解する？', 'How should quarter tones in maqam notation be understood?'), options: [t('只是记谱惯例，实际音高因地区、时代而异', '記譜の慣例にすぎず、実際の音高は地域や時代で違う', 'As a notational convention; real pitches vary by region and era'), t('正好是 50 音分，到处一样', 'ちょうど 50 セントでどこでも同じ', 'Exactly 50 cents everywhere'), t('就是十二平均律的半音', '12 平均律の半音そのもの', 'Equal-tempered semitones'), t('只用在印度音乐', 'インド音楽だけ', 'Only in Indian music')] },
          { prompt: t('木卡姆音阶里的八度是？', 'マカーム音階のオクターヴは？', 'In maqam scales, octaves are…'), options: [t('纯八度', '完全 8 度', 'perfect'), t('都缩小四分之一音', 'すべて 4 分音狭い', 'all a quarter tone narrow'), t('都放大半音', 'すべて半音広い', 'all a semitone wide'), t('不固定', '固定されない', 'not fixed')] },
        ],
        answer: 0,
        explain: t('四分之一音是记谱惯例；多数木卡姆含纯五度或纯四度，八度都是纯的。', '4 分音は記譜の慣例。多くのマカームは完全 5 度か 4 度を含み、オクターヴは完全。', 'Quarter tones are a convention; most maqams contain a perfect fifth or fourth and all octaves are perfect.'),
      },
      G('b52-g1', 'thaatNote', 3, ['spell']),
    ],
  },
  pool: [G('b52-p1', 'thaatNote', 5, ['spell', 'identify'])],
};

// ===================== B5-3 泛音列与音色 =====================
export const LEVEL_B5_3 = {
  minutes: 12,
  insight: t('一个音其实是一串音：基音的 2、3、4……倍同时在响，哪几个强，就决定了它的音色。', '1 つの音は実は音の列：基音の 2・3・4……倍が同時に鳴り、どれが強いかが音色を決める。', 'One note is really a stack of notes: 2, 3, 4… times the fundamental sound together, and which are strong decides the timbre.'),
  sections: {
    discover: [
      {
        id: 'b53-d1', type: 'discover', ref: 'wiki-harmonic-series',
        prompt: t('先听 110 Hz 一个纯音，再听 110、220、330、440、550 Hz 一起响。第二个听起来像几个音？', 'まず 110 Hz の純音、次に 110・220・330・440・550 Hz を同時に。2 つ目は何音に聞こえる？', 'Hear a pure 110 Hz tone, then 110, 220, 330, 440 and 550 Hz together. How many notes does the second sound like?'),
        play: [{ label: t('只有基音', '基音だけ', 'Fundamental only'), audio: { notes: hzOf(110, [1]), mode: 'harmonic' } }, { label: t('基音 + 4 个泛音', '基音 + 倍音 4 つ', 'Fundamental + 4 harmonics'), audio: { notes: hzOf(110, [1, 2, 3, 4, 5]), mode: 'harmonic' } }],
        options: [t('主要还是一个音（A2），只是更"亮"、更丰满', '主に 1 音（A2）で、明るく豊かになっただけ', 'Mostly still one note (A2), just brighter and fuller'), t('五个清清楚楚的音', 'はっきりした 5 音', 'Five clearly separate notes'), t('完全听不出音高', '音高が分からない', 'No pitch at all')],
        answer: 0,
        insight: {
          title: t('基音决定音高，泛音决定音色', '基音が音高を、倍音が音色を決める', 'The fundamental sets the pitch, the harmonics the colour'),
          text: t('泛音列是频率为基音整数倍的一串音。弦或空气柱同时以许多模式振动；我们通常把最低的那个分音（基音）听成音高，而稳定音的音色很大程度上取决于各个泛音的相对强弱。', '倍音列は基音の整数倍の周波数の音の列。弦や空気柱は同時に多くのモードで振動する。ふつう最も低い部分音（基音）が音高として聞こえ、安定した音の音色は各倍音の相対的な強さで大きく決まる。', 'The harmonic series is the set of tones at integer multiples of a fundamental. A string or air column vibrates in many modes at once; we usually hear the lowest partial, the fundamental, as the pitch, while a steady tone’s timbre depends largely on the relative strength of the harmonics.'),
        },
      },
    ],
    explain: [
      {
        id: 'b53-e1', type: 'page', ref: ['wiki-harmonic-series', 'wiki-pythagorean'],
        title: t('泛音列里的音程', '倍音列の中の音程', 'Intervals in the harmonic series'),
        text: [
          t('第 1、2 个泛音相差八度（2:1），第 2、3 个相差纯五度（3:2）——这正是五度相生律用的"八度之后最简单的比"。越往上，相邻泛音越靠近。', '第 1・第 2 倍音は 8 度（2:1）、第 2・第 3 倍音は完全 5 度（3:2）——ピタゴラス音律が使う「オクターヴの次に簡単な比」。上へ行くほど隣どうしが近づく。', 'Harmonics 1 and 2 are an octave apart (2:1), 2 and 3 a perfect fifth (3:2) — the “next simplest ratio after the octave” used by Pythagorean tuning. Higher up, neighbouring harmonics get closer and closer.'),
          t('泛音和十二平均律并不完全一致：有些明显偏低或偏高。例如第 7 分音（7:4 相对第 4 分音）比平均律的小七度低约 31 音分，第 11 分音落在两个平均律音之间。', '倍音は 12 平均律と完全には一致しない：明らかに低い・高いものがある。たとえば第 7 倍音（第 4 倍音に対して 7:4）は平均律の短 7 度より約 31 セント低く、第 11 倍音は平均律の 2 音の間に落ちる。', 'Harmonics do not quite match equal temperament: some are clearly flat or sharp. The 7th harmonic (7:4 against the 4th) is about 31 cents below an equal-tempered minor seventh, and the 11th falls between two equal-tempered notes.'),
        ],
        tool: { feature: 'micro' },
      },
      {
        id: 'b53-e2', type: 'discover', practice: true, ref: 'wiki-harmonic-series',
        prompt: t('基音是 100 Hz，第 3 分音是多少赫兹？', '基音が 100 Hz のとき、第 3 倍音は何 Hz？', 'With a 100 Hz fundamental, what is the 3rd harmonic?'),
        options: ['300 Hz', '150 Hz', '103 Hz'],
        answer: 0,
        insight: { title: t('整数倍', '整数倍', 'Integer multiples'), text: t('第 n 个泛音 = 基音 × n：第 3 个是 300 Hz，和第 2 个（200 Hz）相差纯五度 3:2。', '第 n 倍音 = 基音 × n：第 3 倍音は 300 Hz、第 2 倍音（200 Hz）と完全 5 度 3:2。', 'The nth harmonic = fundamental × n: the 3rd is 300 Hz, a 3:2 fifth above the 2nd (200 Hz).') },
      },
    ],
    experiment: [
      { id: 'b53-x1', type: 'experiment', toy: 'harmonics', ref: 'wiki-harmonic-series',
        prompt: t('开关前 16 个泛音，听合起来的音色怎么变；红框的泛音和平均律相差超过 10 音分（鼠标停在上面能看到差多少）。只开奇数泛音时，声音变成什么样？', '最初の 16 倍音をオン・オフして、合わさった音色の変化を聴こう。赤枠は平均律と 10 セント以上違う倍音（マウスを乗せると差が見える）。奇数倍音だけにすると？', 'Toggle the first 16 harmonics and hear how the combined colour changes; red-outlined harmonics are more than 10 cents off equal temperament (hover to see by how much). What happens with odd harmonics only?'),
        params: { fundamental: 110 },
        breakthrough: { id: 'b53-timbre', text: t('你亲手调出了一个音色：同一个音高，不同的泛音组合。', '自分の手で音色を作った：同じ音高、違う倍音の組み合わせ。', 'You built a timbre yourself: the same pitch, a different mix of harmonics.') } },
    ],
    challenge: [
      {
        id: 'b53-c1', type: 'choice', error: 'harmonic-series', skills: ['calc'], ref: 'wiki-harmonic-series',
        variants: [
          { prompt: t('基音 110 Hz，第 4 分音是？', '基音 110 Hz の第 4 倍音は？', 'Fundamental 110 Hz: the 4th harmonic is…'), options: ['440 Hz', '220 Hz', '330 Hz', '550 Hz'] },
          { prompt: t('第 2 分音和第 3 分音之间是什么音程？', '第 2 倍音と第 3 倍音の間の音程は？', 'What interval lies between harmonics 2 and 3?'), options: [t('纯五度（3:2）', '完全 5 度（3:2）', 'a perfect fifth (3:2)'), t('八度（2:1）', '8 度（2:1）', 'an octave (2:1)'), t('大三度（5:4）', '長 3 度（5:4）', 'a major third (5:4)'), t('纯四度（4:3）', '完全 4 度（4:3）', 'a perfect fourth (4:3)')] },
          { prompt: t('第 4 分音和第 5 分音之间是什么音程？', '第 4 倍音と第 5 倍音の間の音程は？', 'What interval lies between harmonics 4 and 5?'), options: [t('大三度（5:4）', '長 3 度（5:4）', 'a major third (5:4)'), t('小三度（6:5）', '短 3 度（6:5）', 'a minor third (6:5)'), t('纯四度（4:3）', '完全 4 度（4:3）', 'a perfect fourth (4:3)'), t('纯五度（3:2）', '完全 5 度（3:2）', 'a perfect fifth (3:2)')] },
        ],
        answer: 0,
        explain: t('第 n 个泛音 = 基音 × n；相邻两个泛音 n、n+1 的比是 (n+1):n。', '第 n 倍音 = 基音 × n。隣の倍音 n と n+1 の比は (n+1):n。', 'The nth harmonic = fundamental × n; neighbours n and n+1 are in the ratio (n+1):n.'),
      },
      {
        id: 'b53-c2', type: 'choice', error: 'concept', skills: ['identify'], ref: 'wiki-harmonic-series',
        variants: [
          { prompt: t('一个稳定的音，音色主要由什么决定？', '安定した音の音色を主に決めるのは？', 'A steady tone’s timbre is mainly determined by…'), options: [t('各泛音的相对强弱', '各倍音の相対的な強さ', 'the relative strength of the harmonics'), t('基音的频率', '基音の周波数', 'the fundamental frequency'), t('音的长短', '音の長さ', 'how long it lasts'), t('谱号', '音部記号', 'the clef')] },
          { prompt: t('我们通常把哪个分音听成音高？', 'ふつう音高として聞こえる部分音は？', 'Which partial do we usually hear as the pitch?'), options: [t('最低的那个（基音）', '最も低いもの（基音）', 'the lowest (the fundamental)'), t('最响的那个', '一番大きいもの', 'the loudest'), t('第 7 个', '第 7', 'the 7th'), t('最高的那个', '一番高いもの', 'the highest')] },
        ],
        answer: 0,
        explain: t('基音通常被听成音高；音色取决于泛音的相对强弱。', '基音がふつう音高として聞こえ、音色は倍音の相対的な強さで決まる。', 'The fundamental is usually heard as the pitch; timbre depends on the harmonics’ relative strengths.'),
      },
      {
        id: 'b53-c3', type: 'choice', error: 'harmonic-series', skills: ['calc'], ref: 'wiki-harmonic-series',
        variants: [
          { prompt: t('第 7 分音和平均律的小七度相比？', '第 7 倍音を平均律の短 7 度と比べると？', 'Compared with an equal-tempered minor seventh, the 7th harmonic is…'), options: [t('低约 31 音分', '約 31 セント低い', 'about 31 cents flat'), t('完全一样', 'まったく同じ', 'exactly the same'), t('高约 31 音分', '約 31 セント高い', 'about 31 cents sharp'), t('低一个半音', '半音低い', 'a semitone flat')] },
          { prompt: t('越往泛音列的高处，相邻泛音之间的距离？', '倍音列の上のほうほど、隣の倍音どうしの距離は？', 'Higher up the series, the distance between neighbouring harmonics…'), options: [t('越来越近', 'どんどん近くなる', 'gets smaller'), t('越来越远', 'どんどん遠くなる', 'gets larger'), t('一直是八度', 'ずっと 8 度', 'stays an octave'), t('一直是五度', 'ずっと 5 度', 'stays a fifth')] },
        ],
        answer: 0,
        explain: t('7:4 ≈ 969 音分，比平均律小七度（1000 音分）低约 31 音分；相邻泛音的比 (n+1):n 越往上越接近 1。', '7:4 ≈ 969 セントで、平均律の短 7 度（1000 セント）より約 31 セント低い。隣の倍音の比 (n+1):n は上ほど 1 に近い。', '7:4 ≈ 969 cents, about 31 below the equal-tempered minor seventh (1000); the ratio (n+1):n approaches 1 higher up.'),
      },
      G('b53-g1', 'harmonicNumber', 2, ['calc']),
      G('b53-g2', 'ratioCents', 1, ['calc']),
    ],
  },
  pool: [G('b53-p1', 'harmonicNumber', 3, ['calc']), G('b53-p2', 'ratioCents', 3, ['calc'])],
};

// ===================== B5-4 律制的计算 =====================
export const LEVEL_B5_4 = {
  minutes: 14,
  insight: t('十二个纯五度回不到原点，差一个毕达哥拉斯音差（约 23.5 音分）：每种律制都是在决定这点差分给谁。', '純正 5 度を 12 回重ねても元に戻らず、ピタゴラス・コンマ（約 23.5 セント）余る：どの音律もこの差を誰に割り振るかを決めている。', 'Twelve pure fifths overshoot by the Pythagorean comma (about 23.5 cents): every temperament is a decision about who absorbs that gap.'),
  sections: {
    discover: [
      {
        id: 'b54-d1', type: 'discover', ref: ['wiki-pythagorean', 'wiki-meantone'],
        prompt: t('同一个 C 大三和弦，先用五度相生律，再用四分之一音差中全音律。哪一个的大三度听起来更"稳"、不抖？', '同じ C 長三和音を、ピタゴラス音律、次に 1/4 コンマ・ミーントーンで。長 3 度がより「落ち着いて」揺れないのは？', 'The same C major triad in Pythagorean tuning, then quarter-comma meantone. In which does the major third sound steadier, without beating?'),
        play: [
          { label: t('五度相生律', 'ピタゴラス音律', 'Pythagorean'), audio: { notes: [60, 64 + 0.0782, 67 + 0.0196], mode: 'harmonic' } },
          { label: t('中全音律', 'ミーントーン', 'Meantone'), audio: { notes: [60, 64 - 0.1369, 67 - 0.0342], mode: 'harmonic' } },
        ],
        options: [t('中全音律：它的大三度是纯的 5:4', 'ミーントーン：長 3 度が純正の 5:4', 'Meantone: its major third is a pure 5:4'), t('五度相生律：五度纯，三度就纯', 'ピタゴラス：5 度が純正なら 3 度も純正', 'Pythagorean: pure fifths mean pure thirds'), t('两个一样', '同じ', 'They are the same')],
        answer: 0,
        insight: {
          title: t('纯五度和纯三度不能兼得', '純正 5 度と純正 3 度は両立しない', 'Pure fifths and pure thirds can’t both win'),
          text: t('五度相生律用纯五度 3:2 一个接一个生成，四个纯五度叠出来的大三度比纯律的 5:4 宽约 21.5 音分。中全音律把五度缩小来改善三度：四分之一音差中全音律让大三度正好是纯的 5:4，名字就来自用几何平均把大三度分成两个相等的全音。', 'ピタゴラス音律は純正 5 度 3:2 を次々に重ね、4 つ重ねた長 3 度は純正の 5:4 より約 21.5 セント広い。ミーントーンは 5 度を狭めて 3 度をよくする：1/4 コンマ・ミーントーンでは長 3 度がちょうど純正 5:4 になり、名前は長 3 度を幾何平均で 2 つの等しい全音に分けることから来ている。', 'Pythagorean tuning stacks pure 3:2 fifths, and the major third built from four of them is about 21.5 cents wider than a pure 5:4. Meantone narrows the fifths to improve the thirds: quarter-comma meantone makes the major third exactly 5:4, and the name comes from splitting that third into two equal tones by a geometric mean.'),
        },
      },
    ],
    explain: [
      {
        id: 'b54-e1', type: 'page', ref: ['wiki-pythagorean', 'wiki-meantone'],
        title: t('音差与狼五度', 'コンマとウルフ', 'Commas and wolves'),
        text: [
          t('十二个纯五度比七个八度多出约 23.46 音分，叫毕达哥拉斯音差。十二音的五度相生律只用十一个纯五度，剩下的那个（例如 G♯–E♭ 的减六度）严重不准，叫狼五度。四分之一音差中全音律把每个五度都缩小 1/4 个音差（Zarlino 在 1571 年用清楚的数学描述了它），三度纯了，狼五度却更宽，有些调就不能用。', '純正 5 度を 12 回重ねると 7 オクターヴより約 23.46 セント多く、これをピタゴラス・コンマという。12 音のピタゴラス音律は純正 5 度を 11 個だけ使い、残りの 1 つ（G♯–E♭ の減 6 度など）がひどく狂う——ウルフ 5 度。1/4 コンマ・ミーントーンは各 5 度を 1/4 コンマずつ狭め（Zarlino が 1571 年に数学的に明確に記述）、3 度は純正になるがウルフはさらに広がり、使えない調ができる。', 'Twelve pure fifths exceed seven octaves by about 23.46 cents: the Pythagorean comma. Twelve-note Pythagorean tuning uses only eleven pure fifths, leaving one (such as the diminished sixth G♯–E♭) badly out of tune: the wolf fifth. Quarter-comma meantone narrows every fifth by a quarter comma (Zarlino described it clearly in 1571); the thirds become pure but the wolf grows wider and some keys become unusable.'),
        ],
        tool: { feature: 'temperaments' },
      },
      {
        id: 'b54-e2', type: 'page', ref: ['wiki-werckmeister', 'wiki-vallotti', 'wiki-meantone'],
        title: t('让十二个调都能用', '12 の調をすべて使えるように', 'Making all twelve keys usable'),
        text: [
          t('Werckmeister III（1691 年论著中的"正确的律"）：大多数五度是纯的，只有 C–G、G–D、D–A、B–F♯ 各缩小 1/4 音差；因为不是所有五度都缩小，所以没有狼五度、十二个调都能用，各调大三度都接近 400 音分（不同调宽窄不同，各有颜色）。现在通称的 Vallotti 律：六个五度各缩小 1/6 毕达哥拉斯音差，另外六个是纯的。十二平均律则让所有半音一样大。', 'ヴェルクマイスター III（1691 年の論著の「正しい音律」）：多くの 5 度は純正で、C–G・G–D・D–A・B–F♯ だけを各 1/4 コンマ狭める。すべての 5 度を狭めないのでウルフがなく、12 の調がすべて使え、長 3 度はどれも 400 セントに近い（調ごとに広さが違い、それぞれの色がある）。いわゆるヴァロッティ音律：6 つの 5 度を各 1/6 ピタゴラス・コンマ狭め、残り 6 つは純正。12 平均律はすべての半音を同じ大きさにする。', 'Werckmeister III (the “correct temperament” of his 1691 treatise): most fifths pure, only C–G, G–D, D–A and B–F♯ narrowed by a quarter comma each; since not every fifth is tempered there is no wolf, all twelve keys work, and every major third is near 400 cents (each key a little different in colour). The temperament now called Vallotti narrows six fifths by a sixth of a Pythagorean comma and leaves six pure. Equal temperament makes every semitone the same size.'),
        ],
      },
      {
        id: 'b54-e3', type: 'discover', practice: true, ref: 'wiki-pythagorean',
        prompt: t('十二个纯五度（每个约 702 音分）比七个八度（8400 音分）多出多少？', '純正 5 度 12 個（各約 702 セント）は 7 オクターヴ（8400 セント）よりどれだけ多い？', 'Twelve pure fifths (about 702 cents each) exceed seven octaves (8400 cents) by how much?'),
        options: [t('约 23.5 音分（毕达哥拉斯音差）', '約 23.5 セント（ピタゴラス・コンマ）', 'about 23.5 cents (the Pythagorean comma)'), t('0 音分', '0 セント', '0 cents'), t('约 100 音分', '約 100 セント', 'about 100 cents')],
        answer: 0,
        insight: { title: t('回不到原点', '元に戻らない', 'It doesn’t close'), text: t('12 × 701.955 ≈ 8423.5，比 8400 多约 23.5 音分，这就是毕达哥拉斯音差。', '12 × 701.955 ≈ 8423.5、8400 より約 23.5 セント多い。これがピタゴラス・コンマ。', '12 × 701.955 ≈ 8423.5, about 23.5 cents more than 8400: the Pythagorean comma.') },
      },
    ],
    experiment: [
      { id: 'b54-x1', type: 'experiment', toy: 'temper', ref: ['wiki-pythagorean', 'wiki-meantone', 'wiki-werckmeister', 'wiki-vallotti'],
        prompt: t('换律制，看十二个调的大三度比纯律宽多少，以及闭合的那个五度是不是狼五度；点一个调听它的大三和弦。中全音律里 C 大三和弦和 E 大三和弦（E–G♯）听起来差多少？', '音律を替えて、12 の調の長 3 度が純正よりどれだけ広いか、閉じる 5 度がウルフかを見よう。調を押すと長三和音が鳴る。ミーントーンで C と E（E–G♯）の長三和音はどれだけ違う？', 'Switch temperaments and see how much wider than pure each key’s major third is, and whether the closing fifth is a wolf; tap a key to hear its major triad. In meantone, how different do C major and E major (E–G♯) sound?'),
        params: {},
        breakthrough: { id: 'b54-wolf', text: t('你亲耳听到了狼五度，也听到了好律为什么叫"好"。', '自分の耳でウルフを聴き、ウェル・テンペラメントがなぜ「良い」のかも聴いた。', 'You heard the wolf — and why well temperaments earned their name.') } },
    ],
    challenge: [
      {
        id: 'b54-c1', type: 'choice', error: 'temperament', skills: ['calc'], ref: 'wiki-pythagorean',
        variants: [
          { prompt: t('毕达哥拉斯音差约是多少音分？', 'ピタゴラス・コンマは約何セント？', 'The Pythagorean comma is about…'), options: [t('23.5 音分', '23.5 セント', '23.5 cents'), t('5 音分', '5 セント', '5 cents'), t('50 音分', '50 セント', '50 cents'), t('100 音分', '100 セント', '100 cents')] },
          { prompt: t('五度相生律用的五度是？', 'ピタゴラス音律の 5 度は？', 'Pythagorean tuning uses fifths of…'), options: [t('纯五度 3:2', '純正 5 度 3:2', 'pure 3:2'), t('700 音分', '700 セント', '700 cents'), t('缩小 1/4 音差的五度', '1/4 コンマ狭い 5 度', 'fifths narrowed by a quarter comma'), t('5:4', '5:4', '5:4')] },
          { prompt: t('十二音的五度相生律里，"狼五度"是怎么来的？', '12 音のピタゴラス音律のウルフはどうして生まれる？', 'In twelve-note Pythagorean tuning, the wolf fifth comes from…'), options: [t('只用十一个纯五度，剩下那个吃下全部音差', '純正 5 度を 11 個だけ使い、残り 1 つがコンマを全部抱える', 'using only eleven pure fifths, the last absorbing the whole comma'), t('所有五度都缩小一点', 'すべての 5 度を少しずつ狭める', 'narrowing every fifth a little'), t('三度太纯', '3 度が純正すぎる', 'thirds that are too pure'), t('八度不纯', 'オクターヴが純正でない', 'impure octaves')] },
        ],
        answer: 0,
        explain: t('五度相生律用纯五度 3:2；十二个纯五度比七个八度多约 23.46 音分；只用十一个纯五度时，剩下的那个就是狼五度。', 'ピタゴラス音律は純正 5 度 3:2。12 個で 7 オクターヴより約 23.46 セント多い。11 個だけ使うと残り 1 つがウルフ。', 'Pythagorean tuning uses pure 3:2 fifths; twelve of them exceed seven octaves by about 23.46 cents; with only eleven pure fifths, the last one is the wolf.'),
      },
      {
        id: 'b54-c2', type: 'choice', error: 'temperament', skills: ['identify'], ref: ['wiki-meantone', 'wiki-werckmeister', 'wiki-vallotti'],
        variants: [
          { prompt: t('四分之一音差中全音律的大三度是？', '1/4 コンマ・ミーントーンの長 3 度は？', 'In quarter-comma meantone the major third is…'), options: [t('纯的 5:4', '純正の 5:4', 'a pure 5:4'), t('81:64', '81:64', '81:64'), t('400 音分', '400 セント', '400 cents'), t('比纯律宽 21.5 音分', '純正より 21.5 セント広い', '21.5 cents wider than pure')] },
          { prompt: t('Werckmeister III 缩小了哪几个五度？', 'ヴェルクマイスター III で狭める 5 度は？', 'Which fifths does Werckmeister III temper?'), options: [t('C–G、G–D、D–A、B–F♯，各 1/4 音差', 'C–G・G–D・D–A・B–F♯、各 1/4 コンマ', 'C–G, G–D, D–A and B–F♯, a quarter comma each'), t('全部十二个', '12 個すべて', 'all twelve'), t('一个也不缩小', '1 つも狭めない', 'none'), t('只有 G♯–E♭', 'G♯–E♭ だけ', 'only G♯–E♭')] },
          { prompt: t('现在通称的 Vallotti 律怎样分配音差？', 'いわゆるヴァロッティ音律はコンマをどう分ける？', 'How does the temperament now called Vallotti distribute the comma?'), options: [t('六个五度各缩小 1/6 毕达哥拉斯音差，另外六个纯', '6 つの 5 度を各 1/6 ピタゴラス・コンマ、残り 6 つは純正', 'six fifths each narrowed by 1/6 Pythagorean comma, six pure'), t('十二个五度平均分', '12 個の 5 度に均等', 'evenly over all twelve fifths'), t('全部给一个五度', '1 つの 5 度に全部', 'all on one fifth'), t('四个五度各 1/4', '4 つの 5 度に各 1/4', 'four fifths a quarter each')] },
        ],
        answer: 0,
        explain: t('中全音律：三度纯 5:4；Werckmeister III：C–G、G–D、D–A、B–F♯ 各 1/4 音差；Vallotti：六个五度各 1/6 毕达哥拉斯音差。', 'ミーントーン：3 度が純正 5:4。ヴェルクマイスター III：C–G・G–D・D–A・B–F♯ を各 1/4 コンマ。ヴァロッティ：6 つの 5 度を各 1/6 ピタゴラス・コンマ。', 'Meantone: pure 5:4 thirds; Werckmeister III: C–G, G–D, D–A, B–F♯ a quarter comma each; Vallotti: six fifths a sixth of a Pythagorean comma each.'),
      },
      {
        id: 'b54-c3', type: 'choice', error: 'temperament', skills: ['apply'], ref: ['wiki-werckmeister', 'wiki-meantone'],
        variants: [
          { prompt: t('为什么 Werckmeister III 没有狼五度？', 'ヴェルクマイスター III にウルフがないのはなぜ？', 'Why does Werckmeister III have no wolf fifth?'), options: [t('只缩小一部分五度，音差分散开了', '一部の 5 度だけ狭め、コンマを分散した', 'It tempers only some fifths, spreading the comma'), t('它的三度全是纯的', '3 度がすべて純正', 'All its thirds are pure'), t('它只有七个音', '7 音しかない', 'It has only seven notes'), t('它用 4 分音', '4 分音を使う', 'It uses quarter tones')] },
          { prompt: t('十二平均律的特点是？', '12 平均律の特徴は？', 'Equal temperament is characterised by…'), options: [t('所有半音一样大', 'すべての半音が同じ大きさ', 'every semitone the same size'), t('所有大三度都是纯的', 'すべての長 3 度が純正', 'every major third pure'), t('所有五度都是纯的', 'すべての 5 度が純正', 'every fifth pure'), t('有一个狼五度', 'ウルフが 1 つある', 'one wolf fifth')] },
        ],
        answer: 0,
        explain: t('好律把音差分给几个五度，没有狼五度、各调都能用；十二平均律把所有半音做成一样大。', 'ウェル・テンペラメントはコンマを数個の 5 度に分け、ウルフがなく全調使える。12 平均律はすべての半音を同じ大きさにする。', 'Well temperaments share the comma among a few fifths, so there is no wolf and every key works; equal temperament makes all semitones equal.'),
      },
      G('b54-g1', 'ratioCents', 2, ['calc']),
      G('b54-g2', 'edoCents', 1, ['calc']),
    ],
  },
  pool: [G('b54-p1', 'ratioCents', 3, ['calc']), G('b54-p2', 'edoCents', 3, ['calc'])],
};

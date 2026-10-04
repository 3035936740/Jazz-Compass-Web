// 乐理闯关 · 支线大关卡（额外大分支）
// 每个支线挂在一个主关旁边（parent），那个主关的全部内容（主关、进阶 1–4、综合测验）都通关后才开放；
// 支线不影响主线和普通结业挑战，但 EX 结业挑战要求全部支线通关，题目也会从支线里抽。
// 结构和主关一样：cards 是支线的主关，branch 是 4 个进阶关（第 5 个综合测验在开局时抽题）；
// 引导卡直接带图（visual）和"圈出来讲"（tour），标注里的名字都来自同一张卡的讲解，依据见卡上的 ref。
// 修改题卡后运行 node scripts/annotate-learn.mjs 更新下面的汇总与 references.js 的 usedIn
// 依据汇总（本文件题卡引用的全部资料）：
//   ref:wiki-cadence ref:omt2e-cadences ref:wiki-andalusian-cadence ref:thinkspace-cadences ref:omt2e-neapolitan
//   ref:omt2e-iivi
// @refs-end

const t = (zh, ja, en) => ({ zh, ja, en });
const opt = (id, label) => ({ id, label });
const m = (at, label, place) => ({ at: [].concat(at), label, ...(place ? { place } : {}) });
const cells = (...texts) => texts.map((text) => (typeof text === 'string' || text.zh ? { text } : text));

// A 小调里的几个和弦（MIDI，低音在前），终止式 2 的试听共用
const A = {
  i: [45, 57, 60, 64], iv: [50, 57, 62, 65], iv6: [53, 62, 69, 74], V: [52, 59, 68, 76], I: [45, 57, 61, 64],
  VI: [53, 57, 60, 65], VII: [43, 55, 59, 62], N6: [50, 58, 62, 65], V7: [52, 56, 62, 64],
};
const C = { ii7: [50, 57, 60, 65], V7: [43, 53, 59, 64], Imaj7: [48, 55, 59, 64], I: [48, 55, 64, 72], dim: [49, 55, 64, 70], ii: [50, 57, 65, 72] };

export const UNITS = [
  {
    id: 'cadences2', parent: 'cadences', section: 'harmony', feature: 'progression', icon: '.2',
    // 曲式结构工具里能看到终止式在乐句、乐段里的位置
    extraTools: [{ feature: 'form' }],
    title: t('终止式 2：更多的收尾', '終止形 2：もっと多くの終わり方', 'Cadences 2: more ways to end'),
    blurb: t('弗里吉亚半终止、皮卡迪三度、强拍与弱拍终止、安达卢西亚进行、那不勒斯六与爵士里的终止', 'フリギア半終止・ピカルディの 3 度・強拍と弱拍の終止・アンダルシア進行・ナポリの六・ジャズの終止', 'Phrygian half cadence, Picardy third, accented and unaccented cadences, the Andalusian progression, the Neapolitan and jazz cadences'),
    cards: [
      { type: 'guide', ref: ['wiki-cadence', 'omt2e-cadences'], demo: { play: [A.iv6, A.V, A.i, A.iv, A.V, A.I] },
        visual: { kind: 'blocks', rows: [
          { label: t('弗里吉亚半终止', 'フリギア半終止', 'Phrygian half'), arrows: true, cells: cells({ text: 'iv6', play: A.iv6 }, { text: 'V', play: A.V, lit: true }) },
          { label: t('皮卡迪三度', 'ピカルディの 3 度', 'Picardy third'), arrows: true, cells: cells({ text: 'V', play: A.V }, { text: t('I（大三）', 'I（長三）', 'I (major)'), play: A.I, lit: true }) },
          { label: t('落在哪一拍', 'どの拍で終わるか', 'which beat'), cells: cells({ text: t('强拍', '強拍', 'strong beat'), sub: t('重音终止', 'アクセントのある終止', 'accented') }, { text: t('弱拍', '弱拍', 'weak beat'), sub: t('非重音终止', 'アクセントのない終止', 'unaccented') }) },
        ] },
        tour: [
          null,
          m('row0', t('小调的 iv6 → V', '短調の iv6 → V', 'iv6 → V in minor')),
          m('c1-1', t('小调乐曲用大三和弦收尾', '短調の曲を長三和音で閉じる', 'a minor piece ends on a major chord')),
          m('row2', t('看最后一个音落在强拍还是弱拍', '最後の音が強拍か弱拍か', 'is the last note on a strong or weak beat?'), 'below'),
        ],
        title: t('终止式不止四种', '終止形は 4 種類だけではない', 'More than four cadences'),
        steps: [
          t('主关学过正格、半终止、变格和阻碍终止。这条支线看几种名字比较特别的收尾，每种都会说明它是什么和弦、名字从哪里来。', 'メインでは正格・半終止・変格・偽終止を学びました。この支線では名前が少し特別な終わり方を見ます。どの和音か、名前の由来も説明します。', 'The main level covered authentic, half, plagal and deceptive cadences. This side quest looks at endings with more unusual names: which chords they use and where the names come from.'),
          t('弗里吉亚半终止：小调里的 iv6–V。低音从第六级往下半音走到第五级，这个半音很像 15 世纪弗里吉亚调式终止里的半音，所以叫这个名字。听：iv6–V。', 'フリギア半終止：短調の iv6–V。ベースが第 6 音から半音下の第 5 音へ進み、15 世紀のフリギア旋法の終止の半音に似ているのでこう呼ばれます。聴いて：iv6–V。', 'The Phrygian half cadence is iv6–V in minor. The bass falls a semitone from scale degree 6 to 5, like the half step in the 15th-century Phrygian cadence, hence the name. Listen: iv6–V.'),
          t('皮卡迪三度：小调（或调式）的段落最后用大三和弦的主和弦收尾。听：A 小调最后落在 A 大三和弦。', 'ピカルディの 3 度：短調（または旋法）の部分を長三和音の主和音で終えること。聴いて：イ短調が最後に A の長三和音へ。', 'A Picardy third ends a minor (or modal) section on a major tonic chord. Listen: A minor ending on an A major chord.'),
          t('按落拍分：最后一个音落在强拍（通常是小节的第一拍）叫重音终止；落在弱拍（比如在一个长倚音之后）叫非重音终止。', '拍で分ける：最後の音が強拍（ふつう小節の 1 拍目）ならアクセントのある終止、弱拍（長い倚音のあとなど）ならアクセントのない終止。', 'By metre: a metrically accented cadence puts its final note on a strong beat (usually the downbeat); an unaccented one puts it on a weak beat, for instance after a long appoggiatura.'),
        ] },
      { type: 'choice', ref: 'wiki-cadence', audio: { notes: [A.iv6, A.V], mode: 'chords' },
        prompt: t('听：A 小调里 iv6 走到 V，低音 F 往下半音到 E。这是？', '聴いて：イ短調の iv6 → V、ベースは F から半音下の E へ。これは？', 'Listen: iv6 to V in A minor, the bass falling a semitone from F to E. This is…'),
        options: [t('弗里吉亚半终止', 'フリギア半終止', 'a Phrygian half cadence'), t('皮卡迪三度', 'ピカルディの 3 度', 'a Picardy third'), t('变格终止', '変格終止', 'a plagal cadence')], answer: 0,
        hint: t('停在 V 上，而且低音是 6→5 的半音。', 'V で止まり、ベースは 6→5 の半音。', 'It stops on V, with a 6→5 semitone in the bass.'),
        explain: t('停在 V 上是半终止；小调 iv6–V 低音 6→5 的半音，就是弗里吉亚半终止。', 'V で止まるので半終止。短調の iv6–V でベースが 6→5 の半音ならフリギア半終止。', 'Stopping on V makes it a half cadence; iv6–V in minor with the 6→5 semitone in the bass is the Phrygian half cadence.') },
      { type: 'choice', ref: 'wiki-cadence', audio: { notes: [A.i, A.iv, A.V, A.I], mode: 'chords' },
        prompt: t('听：一段 A 小调，最后一个和弦是 A 大三和弦。这叫？', '聴いて：イ短調のフレーズが最後に A の長三和音で終わる。これは？', 'Listen: a passage in A minor ends on an A major chord. This is called…'),
        options: [t('皮卡迪三度', 'ピカルディの 3 度', 'a Picardy third'), t('阻碍终止', '偽終止', 'a deceptive cadence'), t('弗里吉亚半终止', 'フリギア半終止', 'a Phrygian half cadence')], answer: 0,
        hint: t('最后的主和弦里，三音被升高了（C → C♯）。', '最後の主和音の 3 音が上がっている（C → C♯）。', 'The third of the final tonic is raised (C → C♯).'),
        explain: t('小调或调式的段落用大三和弦的主和弦收尾，就是皮卡迪三度。', '短調や旋法の部分を長三和音の主和音で閉じるのがピカルディの 3 度。', 'Ending a minor or modal section on a major tonic chord is a Picardy third.') },
      { type: 'match', ref: 'wiki-cadence',
        prompt: t('收尾 ↔ 特点', '終わり方 ↔ 特徴', 'Ending ↔ feature'),
        pairs: [
          [t('弗里吉亚半终止', 'フリギア半終止', 'Phrygian half cadence'), t('小调 iv6–V', '短調の iv6–V', 'iv6–V in minor')],
          [t('皮卡迪三度', 'ピカルディの 3 度', 'Picardy third'), t('小调段落以大三主和弦结束', '短調の部分を長三の主和音で閉じる', 'a minor section ends on a major tonic')],
          [t('重音终止', 'アクセントのある終止', 'accented cadence'), t('最后的音在强拍', '最後の音が強拍', 'final note on a strong beat')],
          [t('非重音终止', 'アクセントのない終止', 'unaccented cadence'), t('最后的音在弱拍', '最後の音が弱拍', 'final note on a weak beat')],
        ],
        hint: t('前两个看和弦，后两个看落拍。', '前の 2 つは和音、後の 2 つは拍を見る。', 'The first two are about chords, the last two about beats.'),
        explain: t('弗里吉亚半终止和皮卡迪三度说的是用什么和弦；重音 / 非重音终止说的是最后一个音落在哪一拍。', 'フリギア半終止とピカルディの 3 度は和音の話、アクセントの有無は最後の音がどの拍に来るかの話。', 'The Phrygian half cadence and the Picardy third are about the chords; accented and unaccented cadences are about where the last note falls in the bar.') },
      { type: 'choice', ref: 'wiki-cadence',
        prompt: t('一个终止式的最后一个音在长倚音之后才出现，落在弱拍上。按落拍它属于？', '終止の最後の音が長い倚音のあとで弱拍に来る。拍で分けると？', 'A cadence’s final note arrives after a long appoggiatura, on a weak beat. By metre it is…'),
        options: [t('非重音终止', 'アクセントのない終止', 'metrically unaccented'), t('重音终止', 'アクセントのある終止', 'metrically accented'), t('半终止', '半終止', 'a half cadence')], answer: 0,
        hint: t('看最后一个音的位置，不看和弦。', '和音ではなく最後の音の位置を見る。', 'Look at where the last note falls, not at the chords.'),
        explain: t('最后的音落在弱拍，就是非重音终止。和弦是哪种终止，是另一个问题。', '最後の音が弱拍ならアクセントのない終止。どの和音の終止かは別の問題。', 'A final note on a weak beat makes it metrically unaccented. Which chords it uses is a separate question.') },
    ],
    branch: [
      {
        title: t('弗里吉亚半终止', 'フリギア半終止', 'The Phrygian half cadence'),
        cards: [
          { type: 'guide', ref: 'wiki-cadence', demo: { play: [A.iv6, A.V] },
            visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes: [
              { p: 'F3', s: 1, col: 0, d: 'w', label: 'iv6' }, { p: 'D4', s: 1, col: 0, d: 'w' }, { p: 'A4', s: 0, col: 0, d: 'w' }, { p: 'D5', s: 0, col: 0, d: 'w' },
              { p: 'E3', s: 1, col: 1, d: 'w', label: 'V', lit: true }, { p: 'B3', s: 1, col: 1, d: 'w' }, { p: 'G#4', s: 0, col: 1, d: 'w' }, { p: 'E5', s: 0, col: 1, d: 'w' },
            ] },
            tour: [
              m(['head0', 'head1', 'head2', 'head3'], t('D F A，低音是三音 F', 'D F A、ベースは 3 音 F', 'D F A with the third, F, in the bass')),
              m(['head0', 'head4'], t('低音 F → E：半音', 'ベース F → E：半音', 'bass F → E: a semitone'), 'below'),
              m(['head3', 'head7'], t('文艺复兴调式和声的遗留', 'ルネサンスの旋法和声の名残', 'a survival of modal Renaissance harmony')),
            ],
            title: t('低音往下走半音', 'ベースが半音下がる', 'A semitone down in the bass'),
            steps: [
              t('在 A 小调里，iv 是 D 小三和弦（D F A）。把三音 F 放到低音，就是 iv6。', 'イ短調の iv はニ短三和音（D F A）。3 音の F をベースに置くと iv6。', 'In A minor, iv is D minor (D F A). With its third, F, in the bass it becomes iv6.'),
              t('iv6 接 V（E G♯ B）：低音 F 往下半音到 E，也就是第六级到第五级。', 'iv6 から V（E G♯ B）へ：ベースは F から半音下の E、つまり第 6 音から第 5 音。', 'iv6 moves to V (E G♯ B): the bass falls a semitone from F to E, scale degree 6 to 5.'),
              t('名字来自 15 世纪弗里吉亚调式终止里 ii–I 的半音；因为是文艺复兴调式和声的遗留，听起来有古风。', '名前は 15 世紀のフリギア旋法の終止 ii–I の半音から。ルネサンスの旋法和声の名残なので、古風に聞こえます。', 'The name comes from the semitone of ii–I in the 15th-century Phrygian cadence; as a survival of modal Renaissance harmony it sounds archaic.'),
            ] },
          { type: 'choice', ref: 'wiki-cadence',
            prompt: t('弗里吉亚半终止的低音走的是？', 'フリギア半終止のベースの動きは？', 'In a Phrygian half cadence the bass moves…'),
            options: [t('第六级 → 第五级（下行半音）', '第 6 音 → 第 5 音（半音下行）', 'from degree 6 to 5 (down a semitone)'), t('第五级 → 第一级', '第 5 音 → 第 1 音', 'from degree 5 to 1'), t('第四级 → 第一级', '第 4 音 → 第 1 音', 'from degree 4 to 1')], answer: 0,
            hint: t('名字里的"弗里吉亚"指的就是这个半音。', '名前の「フリギア」はこの半音のこと。', 'The "Phrygian" in the name refers to that semitone.'),
            explain: t('小调里第六级到第五级是半音（A 小调 F → E），很像弗里吉亚调式终止里的半音。', '短調の第 6 音 → 第 5 音は半音（イ短調で F → E）で、フリギア旋法の終止の半音に似ています。', 'In minor, degree 6 to 5 is a semitone (F → E in A minor), like the half step of the Phrygian cadence.') },
          { type: 'fill', ref: 'wiki-cadence',
            prompt: t('A 小调的弗里吉亚半终止：iv6 的低音是 ___，V 的低音是 ___', 'イ短調のフリギア半終止：iv6 のベースは ___、V のベースは ___', 'Phrygian half cadence in A minor: the bass of iv6 is ___ and of V is ___'),
            bank: [opt('F', 'F'), opt('E', 'E'), opt('D', 'D'), opt('A', 'A')], answer: ['F', 'E'],
            hint: t('iv = D F A，第一转位把三音放到低音。', 'iv = D F A、第 1 転回形は 3 音がベース。', 'iv = D F A; first inversion puts the third in the bass.'),
            explain: t('D 小三和弦第一转位的低音是 F；V（E G♯ B）原位的低音是 E。F → E 是半音。', 'ニ短三和音の第 1 転回形はベース F、V（E G♯ B）基本形はベース E。F → E は半音。', 'D minor in first inversion has F in the bass; V (E G♯ B) in root position has E. F → E is a semitone.') },
          { type: 'choice', ref: 'wiki-cadence',
            prompt: t('弗里吉亚半终止停在哪个和弦上？', 'フリギア半終止はどの和音で止まる？', 'Which chord does a Phrygian half cadence stop on?'),
            options: ['V', 'i', 'iv'], answer: 0,
            hint: t('它是一种半终止。', '半終止の一種。', 'It is a kind of half cadence.'),
            explain: t('半终止都停在 V 上；弗里吉亚半终止是从 iv6 走到 V 的那一种。', '半終止は V で止まる。フリギア半終止は iv6 から V へ進むもの。', 'Half cadences stop on V; the Phrygian one approaches V from iv6.') },
          { type: 'choice', ref: 'wiki-cadence',
            prompt: t('为什么说弗里吉亚半终止听起来有古风？', 'フリギア半終止が古風に聞こえるのはなぜ？', 'Why does the Phrygian half cadence sound archaic?'),
            options: [t('它是文艺复兴调式和声的遗留', 'ルネサンスの旋法和声の名残だから', 'it survives from modal Renaissance harmony'), t('它只用大三和弦', '長三和音しか使わないから', 'it uses only major chords'), t('它没有低音', 'ベースがないから', 'it has no bass')], answer: 0,
            hint: t('想想名字里的"弗里吉亚"。', '名前の「フリギア」を考えて。', 'Think of the word "Phrygian".'),
            explain: t('这个终止是文艺复兴调式和声留下来的，所以听起来古老，前面接 v（v–iv6–V）时更明显。', 'ルネサンスの旋法和声の名残なので古風に聞こえ、前に v を置く（v–iv6–V）といっそう際立ちます。', 'It is a survival of modal Renaissance harmony, so it sounds archaic, especially after v (v–iv6–V).') },
        ],
      },
      {
        title: t('皮卡迪三度与"阳性 / 阴性"终止', 'ピカルディの 3 度と「男性・女性」終止', 'The Picardy third and "masculine / feminine" cadences'),
        cards: [
          { type: 'guide', ref: 'wiki-cadence', demo: { play: [A.iv, A.V, A.i, A.iv, A.V, A.I] },
            visual: { kind: 'blocks', rows: [
              { label: t('小调收尾', '短調で終わる', 'minor ending'), arrows: true, cells: cells({ text: 'iv', play: A.iv }, { text: 'V', play: A.V }, { text: t('i（小三）', 'i（短三）', 'i (minor)'), play: A.i }) },
              { label: t('皮卡迪三度', 'ピカルディの 3 度', 'Picardy third'), arrows: true, cells: cells({ text: 'iv', play: A.iv }, { text: 'V', play: A.V }, { text: t('I（大三）', 'I（長三）', 'I (major)'), play: A.I, lit: true }) },
              { label: t('旧称', '旧称', 'old names'), cells: cells({ text: t('阳性', '男性', 'masculine'), sub: t('= 强拍收尾', '= 強拍で終わる', '= strong ending') }, { text: t('阴性', '女性', 'feminine'), sub: t('= 弱拍收尾', '= 弱拍で終わる', '= weak ending') }) },
            ] },
            tour: [
              [m('c0-2', t('C', 'C', 'C')), m('c1-2', t('C♯', 'C♯', 'C♯'), 'below')],
              m('row1', t('文艺复兴时期出现的手法', 'ルネサンスに生まれた手法', 'a Renaissance device')),
              m('row2', t('现在说"重音 / 非重音终止"', '今は「アクセントのある / ない終止」', 'today: accented / unaccented'), 'below'),
            ],
            title: t('最后一个和弦变亮了', '最後の和音が明るくなる', 'The last chord turns bright'),
            steps: [
              t('皮卡迪三度（皮卡迪终止）：小调或调式的段落，最后用大三和弦的主和弦收尾——A 小调最后不是 A C E，而是 A C♯ E。', 'ピカルディの 3 度（ピカルディ終止）：短調や旋法の部分を長三和音の主和音で終える。イ短調の最後が A C E ではなく A C♯ E。', 'The Picardy third (Picardy cadence): a minor or modal section ends on a major tonic — A C♯ E instead of A C E in A minor.'),
              t('这个手法出现在文艺复兴时期的西方音乐里。', 'この手法はルネサンス期の西洋音楽で生まれました。', 'The device originated in Western music in the Renaissance.'),
              t('"阳性 / 阴性终止"是过去用来说节奏上"强 / 弱"收尾的说法，至少从 1980 年代中期起就已经不常用了（苏珊·麦克拉蕊在《阴性终止》一书里专门讨论过音乐术语里的性别用词）。现在说"重音终止 / 非重音终止"。', '「男性・女性終止」は昔リズム上の「強い・弱い」終わり方を指した言葉で、少なくとも 1980 年代半ばからはあまり使われていません（スーザン・マクレアリーが『フェミニン・エンディング』で音楽用語の性別表現を論じています）。今は「アクセントのある / ない終止」と言います。', '"Masculine" and "feminine" once described rhythmically strong or weak cadences; they have not been generally used since at least the mid-1980s (Susan McClary discusses gendered music terminology in Feminine Endings). Today we say metrically accented or unaccented.'),
            ] },
          { type: 'choice', ref: 'wiki-cadence',
            prompt: t('A 小调的皮卡迪三度，最后的和弦是？', 'イ短調のピカルディの 3 度、最後の和音は？', 'A Picardy third in A minor ends on…'),
            options: ['A C♯ E', 'A C E', 'E G♯ B'], answer: 0,
            hint: t('主和弦变成大三和弦。', '主和音が長三和音になる。', 'The tonic becomes major.'),
            explain: t('A 小三和弦 A C E 的三音升高半音，变成 A C♯ E。', 'イ短三和音 A C E の 3 音を半音上げて A C♯ E。', 'The third of A C E is raised to give A C♯ E.') },
          { type: 'choice', ref: 'wiki-cadence',
            prompt: t('"阳性终止""阴性终止"原来指的是？', '「男性終止」「女性終止」はもともと何を指した？', 'What did "masculine" and "feminine" cadence originally describe?'),
            options: [t('节奏上强 / 弱的收尾', 'リズム上の強い・弱い終わり方', 'rhythmically strong or weak endings'), t('大调 / 小调', '長調・短調', 'major or minor keys'), t('男声 / 女声', '男声・女声', 'male or female voices')], answer: 0,
            hint: t('和最后一个音落在哪一拍有关。', '最後の音がどの拍に来るかに関係。', 'It has to do with where the last note falls.'),
            explain: t('这是过去对节奏强 / 弱收尾的说法，现在一般改说重音 / 非重音终止。', '昔のリズムの強弱の言い方で、今はふつうアクセントのある / ない終止と言います。', 'It is an old name for rhythmically strong or weak endings; today we usually say metrically accented or unaccented.') },
          { type: 'choice', ref: 'wiki-cadence',
            prompt: t('今天更常用哪一对说法？', '今よく使われるのはどちら？', 'Which pair of terms is used today?'),
            options: [t('重音终止 / 非重音终止', 'アクセントのある終止 / ない終止', 'metrically accented / unaccented'), t('阳性 / 阴性终止', '男性 / 女性終止', 'masculine / feminine'), t('上行 / 下行终止', '上行 / 下行終止', 'rising / falling')], answer: 0,
            hint: t('旧说法至少从 1980 年代中期起就不常用了。', '古い言い方は少なくとも 1980 年代半ばからあまり使われない。', 'The old terms have not been generally used since the mid-1980s.'),
            explain: t('说"最后的音落在强拍 / 弱拍"，也就是重音 / 非重音终止，不带性别色彩，意思也更清楚。', '「最後の音が強拍 / 弱拍」＝アクセントのある / ない終止。性別の含みがなく、意味もはっきりします。', '"Final note on a strong / weak beat" — accented or unaccented — is clearer and free of gendered language.') },
          { type: 'match', ref: 'wiki-cadence',
            prompt: t('旧称 ↔ 现在的说法', '旧称 ↔ 今の言い方', 'Old name ↔ current term'),
            pairs: [[t('阳性终止', '男性終止', 'masculine'), t('重音终止', 'アクセントのある終止', 'metrically accented')], [t('阴性终止', '女性終止', 'feminine'), t('非重音终止', 'アクセントのない終止', 'metrically unaccented')]],
            hint: t('强 ↔ 强，弱 ↔ 弱。', '強 ↔ 強、弱 ↔ 弱。', 'Strong ↔ strong, weak ↔ weak.'),
            explain: t('阳性 = 强拍收尾 = 重音终止；阴性 = 弱拍收尾 = 非重音终止。', '男性 = 強拍で終わる = アクセントあり。女性 = 弱拍で終わる = アクセントなし。', 'Masculine = strong-beat ending = accented; feminine = weak-beat ending = unaccented.') },
        ],
      },
      {
        title: t('安达卢西亚进行与那不勒斯六', 'アンダルシア進行とナポリの六', 'The Andalusian progression and the Neapolitan'),
        cards: [
          { type: 'guide', ref: ['wiki-andalusian-cadence', 'thinkspace-cadences', 'omt2e-neapolitan'], demo: { play: [A.i, A.VII, A.VI, A.V] },
            visual: { kind: 'blocks', rows: [
              { label: t('安达卢西亚', 'アンダルシア', 'Andalusian'), arrows: true, cells: cells({ text: 'Am', sub: 'i', play: A.i }, { text: 'G', sub: '♭VII', play: A.VII }, { text: 'F', sub: '♭VI', play: A.VI }, { text: 'E', sub: 'V', play: A.V, lit: true }) },
              { label: t('那不勒斯六 → 正格', 'ナポリの六 → 正格', 'Neapolitan → authentic'), arrows: true, cells: cells({ text: 'N6', sub: '♭II6', play: A.N6, lit: true }, { text: 'V7', play: A.V7 }, { text: 'i', play: A.i }) },
            ] },
            tour: [
              m('row0', t('低音一步步往下：A G F E', 'ベースが順に下がる：A G F E', 'the bass steps down: A G F E')),
              m('c0-3', t('G♯ 是导音', 'G♯ が導音', 'G♯ is the leading tone'), 'below'),
              m('row1', t('旧称"悲怆终止"', '旧称「悲愴終止」', 'once called a "pathetic cadence"'), 'below'),
            ],
            title: t('名字叫"终止"，却不一定是终止', '「終止」という名前でも終止とは限らない', 'Called a cadence, but not always one'),
            steps: [
              t('安达卢西亚进行：A 小调里 Am–G–F–E，也就是 i–♭VII–♭VI–V；低音是一串往下的四音音列。', 'アンダルシア進行：イ短調の Am–G–F–E、つまり i–♭VII–♭VI–V。ベースは下行する 4 音の音列。', 'The Andalusian progression: Am–G–F–E in A minor, i–♭VII–♭VI–V, over a descending four-note bass line.'),
              t('最后的 E 和弦里 G♯ 是导音。虽然常被叫作"安达卢西亚终止"，但它并不是真正的终止（只在乐句结尾出现一次的那种），最常见的用法是反复循环的固定音型。', '最後の E の和音の G♯ は導音。「アンダルシア終止」と呼ばれることも多いが、本当の終止（フレーズの終わりに一度だけ出るもの）ではなく、繰り返すオスティナートとして使われるのが普通です。', 'In the final E chord, G♯ is the leading tone. Despite the name "Andalusian cadence" it is not a true cadence (one that occurs once, ending a phrase); it is most often an ostinato that repeats.'),
              t('那不勒斯六（N6）是降二级上的大三和弦第一转位。有一个旧称叫"悲怆终止"：正格终止前面先出现那不勒斯六。这个说法已经过时，现代的大多数音乐词典里查不到。', 'ナポリの六（N6）は ♭II の長三和音の第 1 転回形。古い呼び名「悲愴終止」は、正格終止の前にナポリの六が来るもの。今ではほとんどの音楽辞典に載っていない古い用語です。', 'The Neapolitan sixth (N6) is a major chord on the lowered second degree, in first inversion. An old name, "pathetic cadence", means a perfect cadence preceded by a Neapolitan sixth — an outdated term missing from most modern dictionaries.'),
            ] },
          { type: 'choice', ref: 'wiki-andalusian-cadence', audio: { notes: [A.i, A.VII, A.VI, A.V], mode: 'chords' },
            prompt: t('听：Am–G–F–E。用小调的级数写是？', '聴いて：Am–G–F–E。短調の度数で書くと？', 'Listen: Am–G–F–E. In minor-key Roman numerals that is…'),
            options: ['i–♭VII–♭VI–V', 'i–iv–V–i', 'vi–IV–I–V'], answer: 0,
            hint: t('从 A 往下数：G 是 ♭VII，F 是 ♭VI。', 'A から下へ：G は ♭VII、F は ♭VI。', 'Counting down from A: G is ♭VII, F is ♭VI.'),
            explain: t('安达卢西亚进行在 A 小调里就是 i–♭VII–♭VI–V，最后的 E 和弦带导音 G♯。', 'アンダルシア進行はイ短調で i–♭VII–♭VI–V、最後の E には導音 G♯。', 'The Andalusian progression is i–♭VII–♭VI–V in A minor, with the leading tone G♯ in the last chord.') },
          { type: 'choice', ref: 'wiki-andalusian-cadence',
            prompt: t('安达卢西亚进行最常见的用法是？', 'アンダルシア進行のいちばん多い使い方は？', 'How is the Andalusian progression most often used?'),
            options: [t('反复循环的固定音型', '繰り返すオスティナート', 'as a repeating ostinato'), t('只在全曲最后出现一次', '曲の最後に一度だけ', 'once, at the very end'), t('只用在大调', '長調だけ', 'only in major keys')], answer: 0,
            hint: t('名字里有"终止"，但它不是真正的终止。', '名前に「終止」とあるが本当の終止ではない。', 'Its name says cadence, but it is not a true one.'),
            explain: t('真正的终止只在乐句结尾出现一次；安达卢西亚进行通常一遍遍循环。', '本当の終止はフレーズの終わりに一度。アンダルシア進行はふつう何度も繰り返されます。', 'A true cadence happens once at a phrase ending; the Andalusian progression usually loops.') },
          { type: 'choice', ref: 'thinkspace-cadences', audio: { notes: [A.N6, A.V7, A.i], mode: 'chords' },
            prompt: t('听：N6–V7–i。这种"那不勒斯六接正格终止"的旧称是？', '聴いて：N6–V7–i。「ナポリの六＋正格終止」の古い呼び名は？', 'Listen: N6–V7–i. The old name for "Neapolitan sixth before a perfect cadence" is…'),
            options: [t('悲怆终止', '悲愴終止', 'pathetic cadence'), t('弗里吉亚半终止', 'フリギア半終止', 'Phrygian half cadence'), t('变格终止', '変格終止', 'plagal cadence')], answer: 0,
            hint: t('这个说法已经过时了。', 'すでに古い用語。', 'The term is outdated.'),
            explain: t('"悲怆终止"指正格终止前面先有那不勒斯六；这是旧说法，现代大多数词典已经不收。', '「悲愴終止」は正格終止の前にナポリの六が来るもの。今の辞典にはほとんど載らない古い用語。', '"Pathetic cadence" means a perfect cadence preceded by a Neapolitan sixth; it is an old term most modern dictionaries leave out.') },
          { type: 'fill', ref: ['omt2e-neapolitan', 'thinkspace-cadences'],
            prompt: t('那不勒斯六 = 降 ___ 级上的大三和弦，___ 转位', 'ナポリの六 = ♭___ 度の長三和音の第 ___ 転回形', 'Neapolitan sixth = a major chord on ♭___, inversion number ___'),
            bank: [opt('2', '2'), opt('1', '1'), opt('6', '6'), opt('3', '3')], answer: ['2', '1'],
            hint: t('名字里的"六"指六和弦，也就是第一转位。', '名前の「六」は六の和音、つまり第 1 転回形。', 'The "sixth" means a 6 chord, i.e. first inversion.'),
            explain: t('♭II6：降二级上的大三和弦，第一转位（A 小调是 B♭ D F，低音 D）。', '♭II6：♭II の長三和音の第 1 転回形（イ短調で B♭ D F、ベース D）。', '♭II6: a major chord on the lowered second degree in first inversion (B♭ D F over D in A minor).') },
        ],
      },
      {
        title: t('爵士里的终止', 'ジャズの終止', 'Cadences in jazz'),
        cards: [
          { type: 'guide', ref: ['omt2e-iivi', 'omt2e-cadences', 'wiki-cadence'], demo: { play: [C.ii7, C.V7, C.Imaj7] },
            visual: { kind: 'blocks', rows: [
              { label: 'ii–V–I', arrows: true, cells: cells({ text: 'Dm7', sub: 'ii', play: C.ii7 }, { text: 'G7', sub: 'V', play: C.V7 }, { text: 'Cmaj7', sub: 'I', play: C.Imaj7, lit: true }) },
              { label: t('停在 V', 'V で止まる', 'stops on V'), arrows: true, cells: cells({ text: 'Dm7', sub: 'ii', play: C.ii7 }, { text: 'G7', sub: 'V', play: C.V7, lit: true }) },
              { label: t('减七半音', '減七の半音', 'dim7 half step'), arrows: true, cells: cells({ text: 'C', play: C.I }, { text: 'C♯°7', play: C.dim, lit: true }, { text: 'Dm7', play: C.ii }) },
            ] },
            tour: [
              m('row0', t('爵士最常见的终止', 'ジャズでいちばん多い終止', 'the most common jazz cadence')),
              m('row1', t('结尾在 V 上：半终止', 'V で終わる：半終止', 'ends on V: a half cadence')),
              m('row2', t('回到段落开头：turnaround', '段落の頭へ戻る：ターンアラウンド', 'back to the top: a turnaround'), 'below'),
              m('c2-1', t('夹在相隔大二度的两个和弦之间', '長 2 度離れた 2 つの和音の間', 'between chords a major second apart'), 'below'),
            ],
            title: t('ii–V–I 与它的变体', 'ii–V–I とその変化形', 'ii–V–I and its relatives'),
            steps: [
              t('爵士里最常见的终止是 ii–V–I：大调里是 m7–7–maj7（Dm7–G7–Cmaj7），小调里是 ø7–7–m7。有人把它叫"完整的爵士终止"，但这不是教材里的标准术语。', 'ジャズで最も多い終止は ii–V–I：長調で m7–7–maj7（Dm7–G7–Cmaj7）、短調で ø7–7–m7。「フル・ジャズ・カデンツ」と呼ぶ人もいますが、教科書の標準用語ではありません。', 'The most common jazz cadence is ii–V–I: m7–7–maj7 in major (Dm7–G7–Cmaj7), ø7–7–m7 in minor. Some call it a "full jazz cadence", but that is not a standard textbook term.'),
              t('只有 ii–V、停在 V 上：按定义，结尾在 V 上就是半终止。"爵士半终止"同样不是标准术语。', 'ii–V だけで V で止まる：定義上、V で終われば半終止。「ジャズ半終止」も標準用語ではありません。', 'Just ii–V, stopping on V: by definition, ending on V is a half cadence. "Jazz half cadence" is not a standard term either.'),
              t('爵士里有一类终止叫 turnaround（原来叫 turnback，这个名字更准确）：用终止把音乐带回曲式里已经出现过的段落，比如 AABA 里回到 A。', 'ジャズにはターンアラウンド（もとはターンバックと呼ばれ、そのほうが正確）という終止がある：AABA の A に戻るなど、曲の既出の部分へ戻すための終止。', 'Jazz has a cadence category called the turnaround (originally "turnback", the more accurate name): a cadence that returns to an earlier part of the form, such as the A in AABA.'),
              t('半音终止在爵士里很常见：上行的减七半音终止用一个副属减七和弦，在相隔大二度的两个和弦之间制造推动力，例如 C–C♯°7–Dm7。', '半音の終止はジャズでよく使われる：上行の減七半音終止は副次的な減七の和音を使い、長 2 度離れた 2 つの和音の間に推進力を生む。例：C–C♯°7–Dm7。', 'Half-step cadences are common in jazz: the ascending diminished-seventh half-step cadence uses a secondary dim7 to create momentum between two chords a major second apart, e.g. C–C♯°7–Dm7.'),
            ] },
          { type: 'choice', ref: 'omt2e-iivi', audio: { notes: [C.ii7, C.V7, C.Imaj7], mode: 'chords' },
            prompt: t('C 大调的 ii–V–I，三个和弦是？', 'ハ長調の ii–V–I の 3 つの和音は？', 'The three chords of ii–V–I in C major are…'),
            options: ['Dm7 – G7 – Cmaj7', 'Dm7 – G7 – C7', 'D7 – G7 – Cmaj7'], answer: 0,
            hint: t('大调里是 m7–7–maj7。', '長調では m7–7–maj7。', 'In major: m7–7–maj7.'),
            explain: t('ii 是小七（Dm7），V 是属七（G7），I 是大七（Cmaj7）。', 'ii はマイナー 7（Dm7）、V はドミナント 7（G7）、I はメジャー 7（Cmaj7）。', 'ii is a minor seventh (Dm7), V a dominant seventh (G7), I a major seventh (Cmaj7).') },
          { type: 'choice', ref: 'omt2e-iivi',
            prompt: t('小调的 ii–V–I，三个和弦的性质是？', '短調の ii–V–I のコードの種類は？', 'In minor, the chord qualities of ii–V–I are…'),
            options: ['ø7 – 7 – m7', 'm7 – 7 – maj7', 'ø7 – maj7 – 7'], answer: 0,
            hint: t('小调的 ii 是半减七。', '短調の ii はハーフディミニッシュ。', 'In minor, ii is half-diminished.'),
            explain: t('小调：ii 半减七（ø7）、V 属七、i 小七。', '短調：ii はハーフディミニッシュ（ø7）、V はドミナント 7、i はマイナー 7。', 'Minor: half-diminished ii, dominant-seventh V, minor-seventh i.') },
          { type: 'choice', ref: 'omt2e-cadences', audio: { notes: [C.ii7, C.V7], mode: 'chords' },
            prompt: t('听：Dm7–G7 就停了。按终止式的定义，这是？', '聴いて：Dm7–G7 で止まる。終止の定義では？', 'Listen: Dm7–G7 and it stops. By the definition of cadences this is…'),
            options: [t('半终止', '半終止', 'a half cadence'), t('正格终止', '正格終止', 'an authentic cadence'), t('变格终止', '変格終止', 'a plagal cadence')], answer: 0,
            hint: t('最后一个和弦是 V。', '最後の和音は V。', 'The last chord is V.'),
            explain: t('结尾停在 V 上就是半终止，不管前面是 ii 还是别的和弦。', 'V で終われば、前が ii でも何でも半終止。', 'Ending on V makes it a half cadence, whatever comes before.') },
          { type: 'choice', ref: 'wiki-cadence',
            prompt: t('turnaround（turnback）指的是？', 'ターンアラウンド（ターンバック）とは？', 'A turnaround (turnback) is…'),
            options: [t('把音乐带回已出现过的段落的终止', '既出の部分へ戻す終止', 'a cadence that returns to an earlier part of the form'), t('转到远关系调', '遠隔調への転調', 'a modulation to a distant key'), t('全曲最后的长音', '曲の最後の長い音', 'the long final note of a piece')], answer: 0,
            hint: t('想想 AABA 里每次回到 A 之前。', 'AABA で A に戻る直前を考えて。', 'Think of the moment before each return to A in AABA.'),
            explain: t('turnaround 原名 turnback，作用就是"转回去"：回到曲式里已经出现过的段落。', 'ターンアラウンドはもとターンバック。曲の既出の部分へ「戻る」ための終止。', 'Originally called a turnback, it "turns back" to a part of the form already heard.') },
          { type: 'choice', ref: 'wiki-cadence', audio: { notes: [C.I, C.dim, C.ii], mode: 'chords' },
            prompt: t('听：C–C♯°7–Dm7。中间的减七和弦在做什么？', '聴いて：C–C♯°7–Dm7。真ん中の減七は何をしている？', 'Listen: C–C♯°7–Dm7. What is the diminished seventh doing?'),
            options: [t('在相隔大二度的两个和弦之间半音推进', '長 2 度離れた和音の間を半音で進める', 'pushing by half step between chords a major second apart'), t('代替主和弦收尾', '主和音の代わりに終わる', 'replacing the tonic at the end'), t('转到 C 小调', 'ハ短調へ転調', 'modulating to C minor')], answer: 0,
            hint: t('低音 C → C♯ → D。', 'ベース C → C♯ → D。', 'The bass goes C → C♯ → D.'),
            explain: t('这是上行的减七半音终止：副属减七夹在相隔大二度的两个和弦之间，低音一路半音往上。', '上行の減七半音終止：副次的な減七が長 2 度離れた和音の間に入り、ベースが半音ずつ上がる。', 'This is the ascending dim7 half-step cadence: a secondary dim7 between two chords a major second apart, the bass rising by half steps.') },
        ],
      },
    ],
  },
];

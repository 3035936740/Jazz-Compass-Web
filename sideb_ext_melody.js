// Side-B 第 3 章（旋律、对位与乐器）的扩展关：每个普通关通过后解锁。节奏和普通关一样（发现 → 讲解 → 实验 → 挑战），
// 把对应 A 面关卡（含挂在上面的支线关卡）的进阶关 + 综合测验重新、更细地讲一遍（讲解更长；挑战相当于综合测验）。节点格式见 sideb_ui.js / SIDE_B_DESIGN.md。
// 出处（每条事实都在原文里核对过）：
//   B3-1x：移调乐器的谱面不按实音写；"B♭ 乐器"指写 C 响 B♭；乐器本身不移调，是谱子按移调写；即兴用的和弦记号也要移调；八度移调（低音提琴低八度、短笛与钢片琴高八度、钟琴高两个八度）；
//          同一族乐器有多种尺寸（E♭、C、B♭、A 单簧管、中音 E♭、低音 B♭；短笛、长笛、中音长笛 G；各种萨克斯；B♭、C、D、E♭ 小号与短号），按移调写可以让同一个谱面音对应同一个指法；
//          阀键发明（19 世纪）以前圆号和小号只能吹一个基音的泛音列；18 世纪初德国发明了插在吹嘴与导管之间的变调管（crook），所有圆号谱都按 C 写；18 世纪中叶有了插在中间的变调管；
//          阀键让这些不再必要，但有人觉得音色较差（瓦格纳有时在同一首曲子里同时为自然圆号和阀键圆号写声部）；19 世纪初 F 调成为标准，高音谱号里低纯五度；
//          低音谱号里有作曲家要求低五度，也有要求高四度；巴洛克时期德国的 Chorton 与 Kammerton 两种音高标准，巴赫许多康塔塔里管风琴声部比其他乐器低一个全音记谱；
//          今天的古乐团混用 A415 与 A440（约差半音）；吉他、贝斯、低音大管低八度，短笛、木琴、钢片琴和部分竖笛高八度，钟琴、garklein 竖笛、古钹高两个八度：ref:wiki-transposing
//          不移调的乐器（人声、钢琴、小提琴、中提琴、大提琴、长笛、双簧管、大管、长号、上低音号、大号、竖琴）；八度移调（短笛高八度；低音长笛、低音大管、吉他、低音提琴低八度）；
//          B♭ 乐器都写高大二度（单簧管、小号、高音萨克斯低大二度；低音单簧管、次中音萨克斯低大九度），B♭ 乐器没有比谱面高的；E♭ 单簧管高小三度，中音萨克斯低大六度，
//          上低音萨克斯低大十三度；F 调：英国管与圆号低纯五度；A 调单簧管低小三度（和 E♭ 乐器方向正好相反）；中音长笛是 G 调；中提琴用中音谱号，大提琴、大管、长号常换次中音谱号；
//          "B♭ 乐器在 B♭ 调演奏，实际是 A♭ 调"这种说法要说清楚是乐器的移调还是乐曲的调：ref:ibmt-transposition
//          常见移调乐器一览：ref:wiki-transposing-list
//   B3-2x：标准调弦与"变格调弦"（scordatura）相对；小提琴 G3 D4 A4 E5（纯五度）、中提琴 C3 G3 D4 A4（比小提琴低纯五度）、大提琴 C2 G2 D3 A3（比中提琴低八度）、
//          低音提琴 E1 A1 D2 G2（纯四度，最高空弦与大提琴的 G 相同）；古提琴（viol）按四度、中间一个大三度；六弦吉他 E2 A2 D3 G3 B3 E4（纯四度，G–B 是大三度），
//          谱面比实音高八度；文艺复兴鲁特琴调弦把 G 弦降成 F♯，大三度移到第 3、4 弦之间；七弦吉他加低 B；四弦贝斯 E1 A1 D2 G2；曼陀林 G3 D4 A4 E5（同小提琴）；
//          琵琶最常见 A2 D3 E3 A3：ref:wiki-standard-tuning
//          CAGED：五个开放和弦形 C、A、G、E、D 都能移动（多半用横按代替琴枕）；C 形上移 2 品是 D（要横按 1–3 弦）；A 形在第 2 品是 B；G 形在第 6 品是 B♭（第 1 弦上的根音常省略）；
//          E 形在第 2 品是 F♯；D 形上移 3 品是 F；同一和弦的五个形按 C→A→G→E→D→C 首尾相接，相邻的形共用根音或一组音：ref:agt-caged
//   B3-3x：经过音填三度，两个相邻经过音可填四度，可在强拍或弱拍；完全辅助音在同一个音的两次出现之间，弱拍更常见；双辅助音上下各一级，整体稳定，通常在弱位置；
//          不完全辅助音一边级进一边跳进；倚音在较强位置、跳进（通常往上）进入、反向级进；逃音在较弱位置、级进（通常往上）进入、反向跳进；
//          先现音是早到的下一个和弦音，多见于乐句结尾；切分音同样早到但用连音线连过去不重奏；延留音是先现音的反面（上一和弦的音留下、新和弦音晚到），
//          准备–延留–解决，上方常见 9–8、7–6、4–3，除 9–8 外解决音不同时出现在别的声部；上行延留音几乎只用于大段落最后的和弦，常与延留音同时出现：ref:omt-embellishing
//          三大类（级进 / 跳进 / 静止）；装饰音多为三音音型的中间音；倚音、逃音向下离开更常见；延留与上行延留都在较强位置；持续音在低音，以音级标记；先现音是两音音型：ref:omt2e-embellishing
//          中文术语：环音（双辅助音）、邻音 / 刺绣音、逃音（前级后跳）、够音（前跳后级，后部倚音）；"延留音"大类含悬停音、阻碍音、倚音，除延留音外和弦外音都在弱拍：ref:zhwiki-nct
//          换音的两种形式、第 1、3、5 音协和、第 2 音不协和并跳走、整体级进一步、不协和音与下一强拍同音：ref:omt-species3
//   B3-4x：定旋律的四个目标与全部条件（8–16 音、全音符、do 始终、级进到主音、音域≤十度、一个高点、大跳后反向级进、不连续同向跳进、Fux F 调例外、小调导音只在倒数第二小节）；
//          Huron 的五种旋律倾向（pitch proximity、step declination、step inertia、melodic regression、melodic arch）：ref:omt-cantus
//          下方对位只能从 do 开始（sol 构成四度、fa–do 易误听）；ti–do / re–do 的反向级进结尾；高点不重合；一次同音反复；声部交叉与超越（E4 后不能 F4）；
//          两声部不超过十二度、超过十度只能短暂；同度只用首尾；P5–P12 等同 P5–P5：ref:omt-species1
//          二类对位：小节内跳进、次高点、二分休止开头、倒数第二小节两种写法、强拍规则、跨小节线按一类、强拍间隐伏五八度可以、弱拍同度可以、弱拍不协和只能是经过音：ref:omt-species2
//          纯四度只在涉及最低声部时不协和；协和分类；Fux《Gradus ad Parnassum》1725：ref:omt2e-intro
//   B3-5x：第三类的拍位、开头、结尾、强拍之间（三个同完全音程不行、强拍五度前第 3、4 拍、强拍八度前第 2–4 拍）、两个连续不协和经过音、双辅助音的走向：ref:omt-species3
//          第四类：斜向进行、延留类型、按解决音程套用一类规则、6–5 不连用、后拍五八度、打破类别、开头、唯一的结尾（re–do 上 7–6 / 2–3）：ref:omt-species4
//          第五类：混合四类、开头完全协和、clausula vera 结尾、装饰挂留、八分音符成对在弱拍、Fux 在四、五类之间介绍：ref:omt2e-fifth
//          卡农：dux / comes、canon in x、fuga ligata、伴奏卡农、无穷卡农 / rota、《Three Blind Mice》、《Sumer is icumen in》、双重卡农（BWV 9）、定量卡农、Missa prolationum、
//          Nancarrow、谜语卡农、《哥德堡变奏曲》九首卡农、若斯坎《De profundis》四度卡农、赖希的相位：ref:wiki-canon
//          Fux 定旋律与第一类实验的评分规则同 B3-4 普通关：ref:gotham-species ref:omt-intervals
const t = (zh, ja, en) => ({ zh, ja, en });
const G = (id, gen, count, skills, params) => ({ id, type: 'gen', gen, count, skills, ...(params ? { params } : {}) });
// 整个和弦共用的标注（数字低音、和弦名……）写在谱表下方同一条基线上
const col = (ps, c, extra = {}) => ps.map((p) => ({ p, d: 'w', col: c, ...(extra.label && extra.s === undefined ? { labelAt: 'bottom' } : {}), ...extra }));

// ===================== B3-1x 移调乐器与总谱阅读 · 扩展关 =====================
// 对应 A 面：instruments（常见移调乐器 / 八度移调 / 为乐器写调号 / 综合）的进阶关
const EXT_B3_1 = {
  minutes: 20,
  insight: t('移调乐器不是"乐器在移调"，而是谱子为了演奏者方便而移调：同一族乐器看到同一个谱面音，就用同一个指法。', '移調楽器は「楽器が移調する」のではなく、奏者の便宜のため譜面が移調する：同じ族の楽器は同じ譜面の音を同じ運指で吹ける。', 'Transposing instruments do not transpose; their music is written transposed for the player’s sake: one written note means one fingering across a whole instrument family.'),
  sections: {
    discover: [
      {
        id: 'b31x-d1', type: 'discover', ref: ['wiki-transposing', 'ibmt-transposition'],
        prompt: t('一位单簧管手手里有 B♭ 和 A 两支单簧管。同一个谱面 C，两支分别响 B♭ 和 A。为什么不干脆都按实音写？', 'クラリネット奏者が B♭ と A の 2 本を持つ。同じ譜面の C が、それぞれ B♭ と A で鳴る。なぜ実音で書かない？', 'A clarinettist owns B♭ and A clarinets. The same written C sounds B♭ on one, A on the other. Why not just write concert pitch?'),
        play: [{ label: t('B♭ 单簧管', 'B♭ クラリネット', 'B♭ clarinet'), audio: { notes: [58], mode: 'melody' } }, { label: t('A 单簧管', 'A クラリネット', 'A clarinet'), audio: { notes: [57], mode: 'melody' } }],
        options: [t('这样同一个谱面音就对应同一个指法，换乐器不用换读法', '同じ譜面の音が同じ運指になり、楽器を替えても読み方を変えなくてよい', 'So one written note means one fingering — switch instruments without relearning'), t('因为乐器自己会移调', '楽器自体が移調するから', 'Because the instrument itself transposes'), t('为了让谱子更难读', '譜面を難しくするため', 'To make the music harder to read')],
        answer: 0,
        insight: {
          title: t('谱子移调，乐器不移调', '移調するのは譜面で、楽器ではない', 'The music transposes, not the instrument'),
          text: t('很多乐器有好几种尺寸——单簧管有 E♭、C、B♭、A，还有中音、低音；萨克斯、小号也是一整族。按移调写，演奏者在任何一支上看到同一个谱面音都用同一个指法，只是响出来的音不同。"B♭ 单簧管"的"B♭"就是：写 C 时实际响什么。', '多くの楽器にはいくつもの大きさがある——クラリネットは E♭・C・B♭・A、アルト・バスも。サクソフォンやトランペットも一族。移調して書けば、どの楽器でも同じ譜面の音は同じ運指で、鳴る音だけが違う。「B♭ クラリネット」の B♭ は、C と書いたときに実際に鳴る音。', 'Many instruments come in several sizes — clarinets in E♭, C, B♭, A, plus alto and bass; saxophones and trumpets are whole families. Writing transposed lets players use the same fingering for the same written note on any of them; only the sounding pitch differs. The “B♭” in “B♭ clarinet” is what sounds when C is written.'),
        },
      },
    ],
    explain: [
      {
        id: 'b31x-e1', type: 'page', ref: 'wiki-transposing',
        title: t('进阶 · 圆号为什么是 F 调：变调管的故事', '発展・ホルンはなぜ F 管か：替え管の話', 'Advanced · Why the horn is in F: a story of crooks'),
        text: [
          t('19 世纪发明阀键以前，圆号和小号只能吹出一个基音上的泛音列。18 世纪初，德国人发明了一套"变调管"（crook）：插在吹嘴和导管之间，加长发音的管子，就能换基音。于是所有圆号谱都按 C 写，插上不同的变调管，同一支乐器几乎可以变成任何调的移调乐器。', '19 世紀にバルブが発明される前、ホルンとトランペットは 1 つの基音の倍音列しか吹けなかった。18 世紀初め、ドイツで「替え管」（クルック）が考案された：マウスピースと導管のあいだに差し込み管を長くして基音を変える。こうしてホルンの譜面はすべて C で書かれ、替え管しだいで 1 本の楽器がほぼどの調の移調楽器にもなった。', 'Before valves (19th century), horns and trumpets could play only the overtone series of one fundamental. In the early 18th century Germans devised crooks — inserted between mouthpiece and lead pipe to lengthen the tube and change the fundamental. So all horn music was written as if in C, and crooks made one instrument a transposing instrument in almost any key.'),
          t('换变调管很费时间，还得防止它在演奏中掉出来，所以只能在长休止时换；18 世纪中叶有了插在乐器中段的变调管，也能兼作调音滑管。阀键出现后就不必换了，但不少演奏者和作曲家觉得阀键乐器的音色较差——瓦格纳有时在同一首作品里同时为自然圆号和阀键圆号写声部。19 世纪初 F 调成为标准：高音谱号里比谱面低纯五度；低音谱号里，作曲家对"低五度还是高四度"看法不一。', '替え管の交換は時間がかかり、演奏中に抜け落ちないよう気をつける必要もあったので、長い休みの間にしか替えられなかった。18 世紀半ばには楽器の中ほどに差す替え管ができ、調律のスライドにもなった。バルブの登場で不要になったが、バルブ楽器の音色は劣ると考える奏者や作曲家も多く、ワーグナーは同じ曲でナチュラル・ホルンとバルブ・ホルンの両方のパートを書くこともあった。19 世紀初め F 管が標準になった：ト音記号では記譜より完全 5 度低い。ヘ音記号では「5 度下か 4 度上か」作曲家によって違った。', 'Changing crooks was slow, and keeping them from falling out was a worry, so it happened only in long rests; mid-18th-century medial crooks, inserted in the middle, could also serve as tuning slides. Valves made all this unnecessary, though many found valved tone inferior — Wagner sometimes wrote for natural and valved horns together. F became standard in the early 19th century: a perfect fifth below written pitch in treble clef; in bass clef, composers disagreed whether it went down a fifth or up a fourth.'),
        ],
      },
      {
        id: 'b31x-e2', type: 'discover', practice: true, ref: 'wiki-transposing',
        prompt: t('圆号谱在高音谱号里写 G4，实际响什么？', 'ホルン譜のト音記号で G4、実音は？', 'A horn part in treble clef shows G4. What sounds?'),
        options: ['C4', 'D5', 'G3', 'F4'],
        answer: 0,
        insight: { title: t('F 调：低纯五度', 'F 管：完全 5 度下', 'In F: a fifth lower'), text: t('写 C 响 F，比谱面低纯五度：G4 → C4。', 'C と書いて F が鳴る、記譜より完全 5 度下：G4 → C4。', 'Written C sounds F, a fifth lower: G4 → C4.') },
      },
      {
        id: 'b31x-e3', type: 'page', ref: 'ibmt-transposition',
        title: t('进阶 1 · 按"调"分组：B♭、E♭、F、A、G', '発展 1・「調」で分ける：B♭・E♭・F・A・G', 'Advanced 1 · Grouped by key: B♭, E♭, F, A, G'),
        text: [
          t('B♭ 乐器：实音都在谱面下方大二度——单簧管、小号、高音萨克斯低大二度；低音单簧管、次中音萨克斯再多低一个八度（大九度）。B♭ 乐器没有一件比谱面高，所以读它们的谱一律往下移大二度，给它们写谱一律往上移（别忘了次中音萨克斯多一个八度）。', 'B♭ 楽器：実音はどれも記譜の長 2 度下——クラリネット・トランペット・ソプラノ・サックスは長 2 度下、バス・クラリネットとテナー・サックスはさらに 1 オクターヴ下（長 9 度）。B♭ 楽器で記譜より高く鳴るものはないので、読むときはいつも長 2 度下げ、書くときはいつも上げる（テナー・サックスのオクターヴを忘れずに）。', 'B♭ instruments all sound below written pitch — clarinet, trumpet, soprano sax a major second down; bass clarinet and tenor sax an extra octave (a major ninth). No B♭ instrument sounds higher than written, so read down a major second and write up one (minding the tenor sax’s octave).'),
          t('E♭ 乐器：E♭ 单簧管比谱面高小三度；中音萨克斯低大六度，上低音萨克斯低大十三度（大六度加八度）。F 调：英国管和圆号都低纯五度。A 调单簧管低小三度——正好和 E♭ 单簧管方向相反，最容易弄混。中音长笛是 G 调。另外，有些乐器为了少用加线会换谱号：中提琴用中音谱号，大提琴、大管、长号常换到次中音谱号。', 'E♭ 楽器：E♭ クラリネットは記譜より短 3 度上、アルト・サックスは長 6 度下、バリトン・サックスは長 13 度下（長 6 度 + 1 オクターヴ）。F 管：イングリッシュ・ホルンとホルンはどちらも完全 5 度下。A 管クラリネットは短 3 度下——E♭ クラリネットとちょうど逆向きで、いちばん混同しやすい。アルト・フルートは G 管。加線を減らすため音部記号を替える楽器もある：ヴィオラはアルト記号、チェロ・ファゴット・トロンボーンはよくテノール記号へ。', 'E♭ instruments: E♭ clarinet sounds a minor third higher; alto sax a major sixth lower; baritone sax a major thirteenth lower. In F: English horn and horn both sound a fifth lower. The A clarinet sounds a minor third lower — the exact opposite of the E♭ clarinet, easily confused. The alto flute is in G. Some instruments switch clefs to avoid ledger lines: viola reads alto clef; cello, bassoon and trombone often switch to tenor clef.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: 'B♭', cells: ['−M2', '−M9 (T.Sax, B.Cl)'] }, { label: 'E♭', cells: ['+m3 (E♭ Cl)', '−M6 (A.Sax)', '−M13 (Bar.Sax)'] }, { label: 'F', cells: ['−P5'] }, { label: 'A', cells: ['−m3'] }] },
      },
      {
        id: 'b31x-e4', type: 'discover', practice: true, ref: 'ibmt-transposition',
        prompt: t('A 调单簧管和 E♭ 单簧管，谱面同样写 C5，实际各响什么？', 'A 管と E♭ 管のクラリネット、同じ譜面 C5 の実音は？', 'A clarinet and E♭ clarinet both read C5. What does each sound?'),
        options: [t('A 单簧管 A4，E♭ 单簧管 E♭5', 'A 管 A4、E♭ 管 E♭5', 'A clarinet A4, E♭ clarinet E♭5'), t('都响 C5', 'どちらも C5', 'Both sound C5'), t('A 单簧管 E♭5，E♭ 单簧管 A4', 'A 管 E♭5、E♭ 管 A4', 'A clarinet E♭5, E♭ clarinet A4')],
        answer: 0,
        insight: { title: t('方向正好相反', '向きがちょうど逆', 'Exactly opposite directions'), text: t('A 单簧管低小三度（C5 → A4），E♭ 单簧管高小三度（C5 → E♭5）。', 'A 管は短 3 度下（C5 → A4）、E♭ 管は短 3 度上（C5 → E♭5）。', 'The A clarinet sounds a minor third down (C5 → A4), the E♭ clarinet a minor third up (C5 → E♭5).') },
      },
      {
        id: 'b31x-e5', type: 'page', ref: ['wiki-transposing', 'ibmt-transposition'],
        title: t('进阶 2 · 八度移调与音高标准', '発展 2・オクターヴ移調とピッチの基準', 'Advanced 2 · Octave transposition and pitch standards'),
        text: [
          t('有些乐器的音域在常用谱号里放不下，为了少用加线，就按实音的上下一两个八度来写——"按八度移调"：调号不变，只是响得高或低一两个八度。低音提琴、贝斯、吉他、低音大管低八度；短笛、木琴、钢片琴和部分竖笛高八度；钟琴、garklein 竖笛、古钹高两个八度。不移调的乐器有人声、钢琴、小提琴、中提琴、大提琴、长笛、双簧管、大管、长号、上低音号、大号和竖琴。', '常用の音部記号に収まらない音域の楽器は、加線を減らすため実音の 1〜2 オクターヴ上下で書く——「オクターヴ移調」：調号は同じで、1〜2 オクターヴ高く・低く鳴るだけ。コントラバス・ベース・ギター・コントラファゴットは 1 オクターヴ下、ピッコロ・シロフォン・チェレスタと一部のリコーダーは 1 オクターヴ上、グロッケンシュピール・ガークライン・クロタルは 2 オクターヴ上。移調しない楽器は声・ピアノ・ヴァイオリン・ヴィオラ・チェロ・フルート・オーボエ・ファゴット・トロンボーン・ユーフォニアム・テューバ・ハープ。', 'Instruments whose range sits awkwardly in common clefs are written one or two octaves from concert pitch to avoid ledger lines — “transposing at the octave”: same key signature, sounding an octave or two higher or lower. Double bass, bass guitar, guitar and contrabassoon sound an octave lower; piccolo, xylophone, celesta and some recorders an octave higher; glockenspiel, garklein recorder and crotales two octaves higher. Non-transposing: voice, piano, violin, viola, cello, flute, oboe, bassoon, trombone, euphonium, tuba, harp.'),
          t('移调还有一个历史原因：巴洛克时期的德国，不同用途的乐器常按不同的音高标准调音——Chorton（"合唱音高"）和 Kammerton（"室内乐音高"），合奏时某些乐器的谱子就得移调来补偿：巴赫的许多康塔塔里，管风琴声部比其他乐器低一个全音记谱。今天的古乐团有时把 A415 和 A440 的乐器混在一起，两者大约差半音，于是其中一组的谱子要移调。', '移調には歴史的な理由もある：バロック時代のドイツでは、用途の違う楽器が別のピッチ基準——Chorton（「合唱のピッチ」）と Kammerton（「室内楽のピッチ」）——で調律されることが多く、合奏では一部の楽器の譜面を移調して補った。バッハの多くのカンタータでは、オルガン・パートがほかの楽器より全音低く記譜されている。今日の古楽アンサンブルでは A415 と A440 の楽器を組み合わせることがあり、両者は約半音違うので、一方の譜面を移調する。', 'There is a historical reason too: in Baroque Germany instruments for different purposes were often tuned to different standards, Chorton (“choir pitch”) and Kammerton (“chamber pitch”), so some parts were transposed to compensate — in many Bach cantatas the organ part is notated a whole step lower than the rest. Some early-music ensembles today mix A415 and A440 instruments, roughly a semitone apart, transposing one group’s parts.'),
        ],
      },
      {
        id: 'b31x-e6', type: 'discover', practice: true, ref: 'wiki-transposing',
        prompt: t('钟琴（glockenspiel）谱面写 C5，实际响什么？', 'グロッケンシュピールの譜面 C5、実音は？', 'A glockenspiel part shows C5. What sounds?'),
        options: ['C7', 'C6', 'C5', 'C4'],
        answer: 0,
        insight: { title: t('高两个八度', '2 オクターヴ上', 'Two octaves up'), text: t('钟琴、garklein 竖笛和古钹都比谱面高两个八度：C5 → C7。', 'グロッケン・ガークライン・クロタルは記譜より 2 オクターヴ上：C5 → C7。', 'Glockenspiel, garklein recorder and crotales sound two octaves up: C5 → C7.') },
      },
      {
        id: 'b31x-e7', type: 'page', ref: ['ibmt-transposition', 'wiki-transposing'],
        title: t('进阶 3 · 整个调也要移，以及一句容易说混的话', '発展 3・調ごと移す、そして紛らわしい言い方', 'Advanced 3 · Moving the whole key, and a phrase that confuses'),
        text: [
          t('给移调乐器写分谱，不只是一个个音移，调号也一起移：乐队在实音 C 大调，B♭ 单簧管的分谱写高大二度——D 大调（两个升号）；中音萨克斯写高大六度——A 大调；F 调圆号写高纯五度——G 大调。即兴用的和弦记号也要写成移调后的样子。', '移調楽器のパート譜は音を 1 つずつ移すだけでなく、調号ごと移す：オーケストラが実音ハ長調なら、B♭ クラリネットのパートは長 2 度上——ニ長調（♯ 2）、アルト・サックスは長 6 度上——イ長調、F 管ホルンは完全 5 度上——ト長調。即興用のコード記号も移調した形で書く。', 'Writing a transposing part moves the key signature too: with the band in concert C major, the B♭ clarinet part is a major second higher — D major (two sharps); alto sax a major sixth higher — A major; horn in F a fifth higher — G major. Chord symbols for improvisation are written transposed as well.'),
          t('说话时要小心："B♭ 乐器在 B♭ 调演奏，其实是 A♭ 调"——这句话两个"B♭"意思不同。更清楚的说法是："读 B♭ 移调谱的乐器，按 B♭ 大调的调号演奏时，实音是 A♭ 大调。"沟通时说清楚是乐器的移调，还是乐曲的调。', '言い方に注意：「B♭ の楽器が B♭ で吹くと実は A♭」——2 つの「B♭」は意味が違う。はっきり言えば「B♭ の移調譜を読む楽器が、変ロ長調の調号で吹くと、実音は変イ長調」。楽器の移調なのか曲の調なのかを明確に。', 'Watch your words: “a B♭ instrument playing in B♭ is really in A♭” uses B♭ in two senses. Clearer: “an instrument reading in B♭, playing in the key signature of B♭ major, sounds in A♭ major concert.” Say whether you mean the instrument’s transposition or the piece’s key.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('实音', '実音', 'concert'), cells: ['C', 'F', 'B♭', 'E♭'] }, { label: 'B♭ Cl', cells: ['D', 'G', 'C', 'F'] }, { label: 'A.Sax', cells: ['A', 'D', 'G', 'C'] }, { label: 'Hn F', cells: ['G', 'C', 'F', 'B♭'] }] },
      },
      {
        id: 'b31x-e8', type: 'discover', practice: true, ref: 'ibmt-transposition',
        prompt: t('乐队演奏实音 E♭ 大调，上低音萨克斯的分谱写什么调？', 'オーケストラが実音変ホ長調。バリトン・サックスのパートは何調？', 'The band plays in concert E♭ major. What key is the baritone sax part in?'),
        options: [t('C 大调（高大六度再加一个八度）', 'ハ長調（長 6 度 + 1 オクターヴ上）', 'C major (a major sixth plus an octave higher)'), t('F 大调', 'ヘ長調', 'F major'), t('E♭ 大调', '変ホ長調', 'E♭ major')],
        answer: 0,
        insight: { title: t('和中音萨克斯同调', 'アルト・サックスと同じ調', 'Same key as the alto sax'), text: t('上低音萨克斯是 E♭ 乐器，低大十三度：E♭ 上方大六度是 C，再多一个八度只影响音区，调号是 C 大调。', 'バリトン・サックスは E♭ 楽器で長 13 度下：E♭ の長 6 度上は C、オクターヴは音域だけで、調号はハ長調。', 'The baritone sax is in E♭, sounding a major thirteenth lower: a major sixth above E♭ is C; the extra octave only affects register, so the part is in C major.') },
      },
    ],
    experiment: [
      { id: 'b31x-x1', type: 'experiment', toy: 'transpose', ref: ['ibmt-transposition', 'wiki-transposing-list'],
        prompt: t('依次选 E♭ 单簧管、中音萨克斯、次中音萨克斯、圆号、短笛，同一个谱面音各响什么？再把乐队的实音调换成 E♭、B♭，看每件乐器的分谱调号怎么变。', 'E♭ クラリネット・アルト・サックス・テナー・サックス・ホルン・ピッコロを順に選び、同じ譜面の音が何で鳴るか。次にオーケストラの実音を E♭・B♭ にして各パートの調号の変化を見よう。', 'Pick E♭ clarinet, alto sax, tenor sax, horn and piccolo in turn: what does the same written note sound? Then set the band’s concert key to E♭ and B♭ and watch each part’s key signature.'),
        params: { instruments: ['clarinet-eb', 'sax-alto', 'sax-tenor', 'horn', 'piccolo', 'clarinet-a', 'sax-baritone', 'glockenspiel'], keys: ['Eb', 'Bb', 'F', 'C'] },
        breakthrough: { id: 'b31x-families', text: t('你看清了每一族的移调方向：B♭ 都往下、E♭ 单簧管往上、中音萨克斯往下大六度。', '各族の移調の向きが見えた：B♭ はすべて下、E♭ クラリネットは上、アルト・サックスは長 6 度下。', 'You saw each family’s direction: B♭ always down, E♭ clarinet up, alto sax down a major sixth.') } },
    ],
    challenge: [
      {
        id: 'b31x-c1', type: 'choice', error: 'transposition', skills: ['calc'], ref: 'ibmt-transposition',
        variants: [
          { prompt: t('次中音萨克斯谱面写 D5，实际响什么？', 'テナー・サックスの譜面 D5、実音は？', 'A tenor sax part shows D5. What sounds?'), options: ['C4', 'C5', 'B♭3', 'D4'] },
          { prompt: t('中音萨克斯谱面写 C5，实际响什么？', 'アルト・サックスの譜面 C5、実音は？', 'An alto sax part shows C5. What sounds?'), options: ['E♭4', 'A4', 'E♭5', 'C4'] },
          { prompt: t('英国管谱面写 D5，实际响什么？', 'イングリッシュ・ホルンの譜面 D5、実音は？', 'An English horn part shows D5. What sounds?'), options: ['G4', 'A4', 'D4', 'C5'] },
        ],
        answer: 0,
        explain: t('次中音萨克斯低大九度、中音萨克斯低大六度、英国管低纯五度。', 'テナー・サックスは長 9 度下、アルト・サックスは長 6 度下、イングリッシュ・ホルンは完全 5 度下。', 'Tenor sax sounds a major ninth lower, alto sax a major sixth lower, English horn a fifth lower.'),
      },
      {
        id: 'b31x-c2', type: 'choice', error: 'transposition', skills: ['calc'], ref: ['ibmt-transposition', 'wiki-transposing'],
        variants: [
          { prompt: t('乐队演奏实音 A 大调，B♭ 小号的分谱写什么调？', 'オーケストラが実音イ長調。B♭ トランペットのパートは？', 'Concert A major. The B♭ trumpet part is in…'), options: [t('B 大调', 'ロ長調', 'B major'), t('G 大调', 'ト長調', 'G major'), t('A 大调', 'イ長調', 'A major')] },
          { prompt: t('乐队演奏实音 D 大调，F 调圆号的分谱写什么调？', 'オーケストラが実音ニ長調。F 管ホルンのパートは？', 'Concert D major. The horn in F part is in…'), options: [t('A 大调', 'イ長調', 'A major'), t('G 大调', 'ト長調', 'G major'), t('E 大调', 'ホ長調', 'E major')] },
          { prompt: t('乐队演奏实音 G 大调，A 调单簧管的分谱写什么调？', 'オーケストラが実音ト長調。A 管クラリネットのパートは？', 'Concert G major. The A clarinet part is in…'), options: [t('B♭ 大调', '変ロ長調', 'B♭ major'), t('E 大调', 'ホ長調', 'E major'), t('A 大调', 'イ長調', 'A major')] },
        ],
        answer: 0,
        explain: t('给乐器写分谱，往实音的反方向移：B♭ 乐器写高大二度、F 调写高纯五度、A 调写高小三度。', 'パート譜は実音と逆向きに移す：B♭ 楽器は長 2 度上、F 管は完全 5 度上、A 管は短 3 度上。', 'Write parts in the opposite direction of the sounding transposition: B♭ up a major second, F up a fifth, A up a minor third.'),
      },
      {
        id: 'b31x-c3', type: 'choice', error: 'transposition', skills: ['identify'], ref: ['wiki-transposing', 'ibmt-transposition'],
        variants: [
          { prompt: t('下面哪件乐器"按八度移调"（比谱面低八度）？', '「オクターヴ移調」（記譜より 1 オクターヴ下）の楽器は？', 'Which instrument transposes at the octave (an octave lower)?'), options: [t('低音大管', 'コントラファゴット', 'Contrabassoon'), t('次中音萨克斯', 'テナー・サックス', 'Tenor saxophone'), t('圆号', 'ホルン', 'Horn'), t('大管', 'ファゴット', 'Bassoon')] },
          { prompt: t('下面哪件乐器不移调？', '移調しない楽器は？', 'Which instrument does not transpose?'), options: [t('大号', 'テューバ', 'Tuba'), t('短笛', 'ピッコロ', 'Piccolo'), t('中音长笛', 'アルト・フルート', 'Alto flute'), t('英国管', 'イングリッシュ・ホルン', 'English horn')] },
          { prompt: t('中音长笛是什么调的乐器？', 'アルト・フルートは何管？', 'The alto flute is in…'), options: ['G', 'F', 'E♭', 'B♭'] },
        ],
        answer: 0,
        explain: t('低音大管、吉他、低音提琴低八度；大号按实音写；中音长笛是 G 调。', 'コントラファゴット・ギター・コントラバスは 1 オクターヴ下。テューバは実音。アルト・フルートは G 管。', 'Contrabassoon, guitar and double bass sound an octave lower; the tuba reads at concert pitch; the alto flute is in G.'),
      },
      {
        id: 'b31x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: 'wiki-transposing',
        variants: [
          { prompt: t('18 世纪的圆号靠什么换调？', '18 世紀のホルンは何で調を替えた？', 'How did 18th-century horns change key?'), options: [t('插上不同长度的变调管（crook）', '長さの違う替え管（クルック）を差す', 'By inserting crooks of different lengths'), t('按阀键', 'バルブを押す', 'By pressing valves'), t('换一支新的圆号', '別のホルンに替える', 'By swapping horns')] },
          { prompt: t('巴赫的许多康塔塔里，管风琴声部为什么比其他乐器低一个全音记谱？', 'バッハの多くのカンタータでオルガン・パートが全音低く記譜されるのはなぜ？', 'Why is the organ part a whole step lower in many Bach cantatas?'), options: [t('乐器按不同的音高标准（Chorton / Kammerton）调音', '楽器が別のピッチ基準（Chorton / Kammerton）で調律されていたから', 'Instruments were tuned to different pitch standards (Chorton / Kammerton)'), t('管风琴是 B♭ 乐器', 'オルガンは B♭ 楽器だから', 'The organ is a B♭ instrument'), t('为了好读', '読みやすくするため', 'For readability')] },
          { prompt: t('圆号的 F 调是什么时候成为标准的？', 'ホルンの F 管が標準になったのはいつ？', 'When did F become the standard horn pitch?'), options: [t('19 世纪初', '19 世紀初め', 'The early 19th century'), t('17 世纪', '17 世紀', 'The 17th century'), t('20 世纪末', '20 世紀末', 'The late 20th century')] },
        ],
        answer: 0,
        explain: t('变调管加长管子来换基音；巴洛克德国有 Chorton 与 Kammerton 两种音高标准；F 调 19 世纪初成为标准。', '替え管は管を長くして基音を変える。バロックのドイツには Chorton と Kammerton。F 管は 19 世紀初めに標準に。', 'Crooks lengthened the tube to change the fundamental; Baroque Germany had Chorton and Kammerton; F became standard in the early 19th century.'),
      },
      G('b31x-g1', 'transposing', 2, ['calc']),
    ],
  },
  pool: [G('b31x-p1', 'transposing', 4, ['calc'])],
};

// ===================== B3-2x 指板上的和声 · 扩展关 =====================
// 对应 A 面：fretboard（指板上的音名 / 相邻弦的音程 / CAGED 五个形 / 综合）的进阶关
const EXT_B3_2 = {
  minutes: 18,
  insight: t('弦乐器的"标准调弦"各有逻辑：提琴族按五度，低音提琴和吉他主要按四度；CAGED 则把五个开放和弦形变成可以移动的模块，首尾相接铺满整条指板。', '弦楽器の「標準調弦」にはそれぞれ論理がある：ヴァイオリン族は 5 度、コントラバスとギターは主に 4 度。CAGED は 5 つの開放コードの形を動かせる部品にし、つなげて指板全体を覆う。', 'Each string family’s standard tuning has its logic: violins in fifths, double bass and guitar mainly in fourths; CAGED turns five open chord shapes into movable modules that link up the whole neck.'),
  sections: {
    discover: [
      {
        id: 'b32x-d1', type: 'discover', ref: 'wiki-standard-tuning',
        prompt: t('小提琴的四根空弦 G3 D4 A4 E5 是按什么音程调的？吉他 E2 A2 D3 G3 B3 E4 呢？', 'ヴァイオリンの開放弦 G3 D4 A4 E5 は何の音程で調弦？ ギター E2 A2 D3 G3 B3 E4 は？', 'Violin open strings G3 D4 A4 E5 are tuned in what interval? And guitar E2 A2 D3 G3 B3 E4?'),
        play: [{ label: t('小提琴空弦', 'ヴァイオリン開放弦', 'Violin open strings'), audio: { notes: [55, 62, 69, 76], mode: 'melody' } }, { label: t('吉他空弦', 'ギター開放弦', 'Guitar open strings'), audio: { notes: [40, 45, 50, 55, 59, 64], mode: 'melody' } }],
        options: [t('小提琴全是纯五度；吉他是纯四度，只有 G–B 是大三度', 'ヴァイオリンはすべて完全 5 度、ギターは完全 4 度で G–B だけ長 3 度', 'Violin all perfect fifths; guitar perfect fourths except G–B, a major third'), t('两者都是纯五度', 'どちらも完全 5 度', 'Both in fifths'), t('两者都是纯四度', 'どちらも完全 4 度', 'Both in fourths')],
        answer: 0,
        insight: {
          title: t('五度族与四度族', '5 度族と 4 度族', 'Fifth-tuners and fourth-tuners'),
          text: t('提琴族按纯五度：中提琴 C3 G3 D4 A4 比小提琴低纯五度，大提琴 C2 G2 D3 A3 比中提琴低八度；低音提琴 E1 A1 D2 G2 改按纯四度（最高的 G 和大提琴的 G 一样）。吉他按纯四度，只在 G–B 之间是大三度——古提琴（viol）也是按四度、中间夹一个大三度。', 'ヴァイオリン族は完全 5 度：ヴィオラ C3 G3 D4 A4 はヴァイオリンの完全 5 度下、チェロ C2 G2 D3 A3 はヴィオラの 1 オクターヴ下。コントラバス E1 A1 D2 G2 は完全 4 度（いちばん高い G はチェロの G と同じ）。ギターは完全 4 度で G–B だけ長 3 度——ヴィオール族も 4 度で真ん中に長 3 度。', 'The violin family tunes in fifths: viola C3 G3 D4 A4 a fifth below violin, cello C2 G2 D3 A3 an octave below viola; the double bass E1 A1 D2 G2 switches to fourths (its top G matches the cello’s G). The guitar tunes in fourths with one major third, G–B — just as viols tune in fourths with a third in the middle.'),
        },
      },
    ],
    explain: [
      {
        id: 'b32x-e1', type: 'page', ref: 'wiki-standard-tuning',
        title: t('进阶 1 · 吉他和它的亲戚们', '発展 1・ギターとその親戚', 'Advanced 1 · The guitar and its relatives'),
        text: [
          t('"标准调弦"是和"变格调弦"（scordatura，为了改变音色或技术可能而改的调弦）相对的说法。六弦吉他 E2 A2 D3 G3 B3 E4，谱面比实音高一个八度。每往上一品高一个半音，第 12 品是空弦的高八度；相邻弦多是纯四度，所以第 5 品等于下一根弦的空弦——只有 G 弦要按第 4 品才等于 B 弦。', '「標準調弦」は「スコルダトゥーラ」（音色や技術のために変える調弦）に対する言い方。6 弦ギターは E2 A2 D3 G3 B3 E4、譜面は実音より 1 オクターヴ高い。1 フレットで半音上がり、12 フレットで開放弦の 1 オクターヴ上。隣の弦はたいてい完全 4 度なので 5 フレットが次の弦の開放と同じ——G 弦だけは 4 フレットで B 弦と同じ。', '“Standard tuning” contrasts with scordatura, an altered tuning for timbre or technique. The six-string guitar is E2 A2 D3 G3 B3 E4, written an octave above sounding pitch. Each fret raises a semitone and fret 12 gives the octave; adjacent strings are mostly fourths apart, so fret 5 matches the next open string — except the G string, where fret 4 matches B.'),
          t('亲戚们：文艺复兴鲁特琴调弦把 G 弦降成 F♯，大三度就移到第 3、4 弦之间；七弦吉他多一根低 B；四弦贝斯 E1 A1 D2 G2（和四弦低音提琴一样），五弦贝斯再加低 B，六弦贝斯再加高 C——都保持纯四度。曼陀林 G3 D4 A4 E5 和小提琴一样按五度；中国琵琶最常见 A2 D3 E3 A3。', '親戚：ルネサンス・リュート調弦は G 弦を F♯ に下げ、長 3 度が 3・4 弦の間に移る。7 弦ギターは低い B を追加。4 弦ベース E1 A1 D2 G2（4 弦コントラバスと同じ）、5 弦は低い B、6 弦はさらに高い C——どれも完全 4 度を保つ。マンドリン G3 D4 A4 E5 はヴァイオリンと同じ 5 度。中国の琵琶は A2 D3 E3 A3 が最も一般的。', 'Relatives: Renaissance-lute tuning lowers the G string to F♯, moving the major third between strings 3 and 4; the seven-string adds a low B; four-string bass E1 A1 D2 G2 (like the four-string double bass), five-string adds a low B, six-string a high C — all in fourths. The mandolin, G3 D4 A4 E5, tunes in fifths like the violin; the Chinese pipa is most often A2 D3 E3 A3.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('吉他', 'ギター', 'guitar'), cells: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'] }, { label: t('鲁特琴', 'リュート', 'lute'), cells: ['E2', 'A2', 'D3', 'F♯3', 'B3', 'E4'] }, { label: t('贝斯', 'ベース', 'bass'), cells: ['E1', 'A1', 'D2', 'G2'] }] },
      },
      {
        id: 'b32x-e2', type: 'discover', practice: true, ref: 'wiki-standard-tuning',
        prompt: t('用文艺复兴鲁特琴调弦（E A D F♯ B E）时，哪两根弦之间是大三度？', 'ルネサンス・リュート調弦（E A D F♯ B E）で長 3 度になるのはどの 2 本？', 'In Renaissance-lute tuning (E A D F♯ B E), which two strings are a major third apart?'),
        options: [t('D 与 F♯（第 4、3 弦）', 'D と F♯（4・3 弦）', 'D and F♯ (strings 4 and 3)'), t('F♯ 与 B', 'F♯ と B', 'F♯ and B'), t('A 与 D', 'A と D', 'A and D')],
        answer: 0,
        insight: { title: t('大三度往下挪了一根弦', '長 3 度が 1 本下へ', 'The third moves down a string'), text: t('G 降成 F♯：D–F♯ 是大三度，F♯–B 变成纯四度。', 'G を F♯ に：D–F♯ が長 3 度、F♯–B は完全 4 度に。', 'With G lowered to F♯, D–F♯ is the major third and F♯–B becomes a fourth.') },
      },
      {
        id: 'b32x-e2b', type: 'page', ref: 'wiki-standard-tuning',
        title: t('进阶 2 · 从调弦推出同音与八度', '発展 2・調弦から同音とオクターヴを導く', 'Advanced 2 · Deriving unisons and octaves from the tuning'),
        text: [
          t('知道了"相邻弦纯四度（5 品），G–B 大三度（4 品）"，就能推出同一个音在别的弦上的位置：换到高一根弦，品数减 5（越过 G–B 时减 4）。例如 A 弦第 7 品（E3）= D 弦第 2 品（E3）。', '「隣の弦は完全 4 度（5 フレット）、G–B は長 3 度（4 フレット）」がわかれば、同じ音がほかの弦のどこにあるかを導ける：1 本高い弦へ移るとフレット数は 5 減る（G–B をまたぐときは 4）。例：A 弦 7 フレット（E3）= D 弦 2 フレット（E3）。', 'From “adjacent strings a fourth apart (5 frets), G–B a major third (4 frets)” you can find the same pitch on another string: moving up a string, subtract 5 frets (4 when crossing G–B). E.g. A string fret 7 (E3) = D string fret 2 (E3).'),
          t('八度：隔一根弦，两个纯四度只有 10 个半音，比八度少 2 个，所以往高两根弦、品数加 2；越过 G–B 时两次跨度共 9 个半音，要加 3。例如第 6 弦第 3 品 G2 → D 弦第 5 品 G3；D 弦第 2 品 E3 → B 弦第 5 品 E4。最外两根空弦 E2 和 E4 相差两个八度。', 'オクターヴ：1 本飛ばすと完全 4 度 2 つで 10 半音、オクターヴより 2 少ないので、2 本上の弦で 2 フレット足す。G–B をまたぐと 2 つで 9 半音なので 3 足す。例：6 弦 3 フレット G2 → D 弦 5 フレット G3、D 弦 2 フレット E3 → B 弦 5 フレット E4。いちばん外側の開放弦 E2 と E4 は 2 オクターヴ違う。', 'Octaves: skipping a string, two fourths make 10 semitones, 2 short of an octave, so go up two strings and add 2 frets; across G–B the two spans make 9, so add 3. E.g. string 6 fret 3 G2 → D string fret 5 G3; D string fret 2 E3 → B string fret 5 E4. The outer open strings E2 and E4 are two octaves apart.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('同音', '同音', 'unison'), cells: ['−5', t('越过 G–B −4', 'G–B をまたぐ −4', 'across G–B −4')] }, { label: t('八度', 'オクターヴ', 'octave'), cells: ['+2', t('越过 G–B +3', 'G–B をまたぐ +3', 'across G–B +3')] }] },
      },
      {
        id: 'b32x-e2c', type: 'discover', practice: true, ref: 'wiki-standard-tuning',
        prompt: t('A 弦第 3 品是 C3。它高八度的 C4 在 G 弦第几品？', 'A 弦 3 フレットは C3。1 オクターヴ上の C4 は G 弦の何フレット？', 'A string fret 3 is C3. On which G-string fret is C4, an octave up?'),
        options: ['5', '3', '4', '6'],
        answer: 0,
        insight: { title: t('隔一根弦，加 2 品', '1 本飛ばして 2 フレット足す', 'Skip a string, add 2 frets'), text: t('A → D → G 没有越过 G–B，两个纯四度差八度 2 个半音：3 + 2 = 5（G3 + 5 个半音 = C4）。', 'A → D → G は G–B をまたがない。完全 4 度 2 つはオクターヴに 2 半音足りない：3 + 2 = 5（G3 + 5 半音 = C4）。', 'A → D → G does not cross G–B; two fourths fall 2 semitones short: 3 + 2 = 5 (G3 + 5 semitones = C4).') },
      },
      {
        id: 'b32x-e3', type: 'page', ref: 'agt-caged',
        title: t('进阶 3 · CAGED：五个可以移动的形', '発展 3・CAGED：動かせる 5 つの形', 'Advanced 3 · CAGED: five movable shapes'),
        text: [
          t('吉他不像钢琴那样一字排开，而是一张音的网格，所以需要一个办法把它简化。CAGED 用五个最常见的开放和弦形——C、A、G、E、D——把指板分成五块。每个形都能移动，多半用横按代替琴枕：C 形上移 2 品是 D（要横按第 1–3 弦）；A 形在第 2 品是 B；G 形在第 6 品是 B♭（第 1 弦上的根音不好按，常常省略）；E 形在第 2 品是 F♯；D 形上移 3 品是 F。', 'ギターはピアノのように一直線ではなく音の格子なので、簡単に見る工夫が要る。CAGED は最もよく使う 5 つの開放コードの形——C・A・G・E・D——で指板を 5 つに分ける。どの形も動かせ、たいていナットの代わりにバレーで押さえる：C 形を 2 フレット上げると D（1〜3 弦をバレー）、A 形の 2 フレットで B、G 形の 6 フレットで B♭（1 弦の根音は押さえにくく省くことが多い）、E 形の 2 フレットで F♯、D 形を 3 フレット上げると F。', 'The guitar is a grid of notes rather than a line like the piano, so it needs simplifying. CAGED uses the five commonest open chord shapes — C, A, G, E, D — to divide the neck into five zones. Each shape is movable, usually by barring in place of the nut: the C shape up 2 frets is D (barring strings 1–3); the A shape at fret 2 is B; the G shape at fret 6 is B♭ (its first-string root is awkward and often omitted); the E shape at fret 2 is F♯; the D shape up 3 frets is F.'),
          t('同一个和弦的五个形按 C → A → G → E → D → C 首尾相接：相邻的两个形共用根音或一组音。以 C 和弦为例：开放 C 形第 5 弦上的根音也是 A 形的根音；A 形 C 和弦上面几根弦的音又是 G 形的上半部分；G 形第 6 弦的根音和 E 形（第 8 品横按）共用；E 形第 4 弦的根音接到 D 形；D 形再接回 C 形。', '同じコードの 5 つの形は C → A → G → E → D → C とつながる：隣り合う形は根音や音の組を共有する。C コードなら：開放 C 形の 5 弦の根音は A 形の根音、A 形 C コードの上のほうの弦の音は G 形の上半分、G 形の 6 弦の根音は E 形（8 フレットのバレー）と共有、E 形の 4 弦の根音が D 形へ、D 形がまた C 形へ。', 'One chord’s five shapes link C → A → G → E → D → C, neighbours sharing a root or a group of notes. For C: the open C shape’s fifth-string root is also the A shape’s root; the upper strings of the A-shape C form the top of the G shape; the G shape’s sixth-string root is shared with the E shape (barred at fret 8); the E shape’s fourth-string root leads to the D shape, which links back to the C shape.'),
        ],
        visual: { kind: 'blocks', rows: [{ cells: ['C', 'A', 'G', 'E', 'D', 'C'] }] },
      },
      {
        id: 'b32x-e4', type: 'discover', practice: true, ref: 'agt-caged',
        prompt: t('G 形整体移到第 6 品，是什么和弦？', 'G 形を 6 フレットへ動かすと何のコード？', 'Move the G shape up to fret 6. Which chord?'),
        options: ['B♭', 'C', 'A', 'B'],
        answer: 0,
        insight: { title: t('从 G 往上数半音', 'G から半音を数える', 'Count semitones up from G'), text: t('G 形上移 3 品：G → A♭ → A → B♭（根音在第 3 品 → 第 6 品）；第 1 弦上的根音常常省略。', 'G 形を 3 フレット上げる：G → A♭ → A → B♭（根音が 3 フレット → 6 フレット）。1 弦の根音はよく省く。', 'Up three frets: G → A♭ → A → B♭ (root moving from fret 3 to fret 6); the first-string root is often left out.') },
      },
    ],
    experiment: [
      { id: 'b32x-x1', type: 'experiment', toy: 'fret', ref: ['agt-caged', 'wiki-standard-tuning'],
        prompt: t('选 C 和弦，依次点 C、A、G、E、D 五个形，看它们怎样一个接一个往上爬；再换成 D 和 F，看哪个形落在开放把位。', 'C コードを選び、C・A・G・E・D の 5 つの形を順に押して、どう上へつながるか見よう。次に D と F に替え、どの形が開放ポジションに来るか。', 'Choose C and tap the C, A, G, E, D shapes in turn to see them climb the neck; then switch to D and F to see which shape lands in open position.'),
        params: { roots: ['C', 'D', 'F', 'G', 'A'] },
        breakthrough: { id: 'b32x-chain', text: t('你看到了五个形首尾相接，铺满了整条指板。', '5 つの形がつながり、指板全体を覆うのが見えた。', 'You saw the five shapes link end to end across the whole neck.') } },
    ],
    challenge: [
      {
        id: 'b32x-c1', type: 'choice', error: 'fretboard', skills: ['identify'], ref: 'wiki-standard-tuning',
        variants: [
          { prompt: t('中提琴的标准调弦是？', 'ヴィオラの標準調弦は？', 'The viola’s standard tuning is…'), options: ['C3 G3 D4 A4', 'G3 D4 A4 E5', 'C2 G2 D3 A3', 'E1 A1 D2 G2'] },
          { prompt: t('低音提琴是按什么音程调弦的？', 'コントラバスの調弦の音程は？', 'The double bass is tuned in…'), options: [t('纯四度', '完全 4 度', 'perfect fourths'), t('纯五度', '完全 5 度', 'perfect fifths'), t('大三度', '長 3 度', 'major thirds')] },
          { prompt: t('曼陀林的调弦和哪件乐器一样？', 'マンドリンの調弦と同じ楽器は？', 'The mandolin is tuned like…'), options: [t('小提琴', 'ヴァイオリン', 'the violin'), t('吉他', 'ギター', 'the guitar'), t('大提琴', 'チェロ', 'the cello')] },
        ],
        answer: 0,
        explain: t('提琴族按五度（中提琴比小提琴低五度）；低音提琴按四度；曼陀林 G3 D4 A4 E5 同小提琴。', 'ヴァイオリン族は 5 度（ヴィオラはヴァイオリンの 5 度下）、コントラバスは 4 度、マンドリン G3 D4 A4 E5 はヴァイオリンと同じ。', 'Violins tune in fifths (viola a fifth below violin); the double bass in fourths; the mandolin G3 D4 A4 E5 matches the violin.'),
      },
      {
        id: 'b32x-c2', type: 'choice', error: 'fretboard', skills: ['calc'], ref: 'wiki-standard-tuning',
        variants: [
          { prompt: t('吉他 B 弦第 3 品是哪个音？', 'ギター B 弦 3 フレットは？', 'Guitar B string, fret 3?'), options: ['D', 'C♯', 'E', 'C'] },
          { prompt: t('吉他 D 弦第 7 品是哪个音？', 'ギター D 弦 7 フレットは？', 'Guitar D string, fret 7?'), options: ['A', 'G', 'B', 'G♯'] },
          { prompt: t('吉他第 6 弦第 12 品是哪个音？', 'ギター 6 弦 12 フレットは？', 'Guitar string 6, fret 12?'), options: [t('E（高八度）', 'E（1 オクターヴ上）', 'E (an octave up)'), 'D', 'F', 'B'] },
        ],
        answer: 0,
        explain: t('空弦音往上数半音：B + 3 = D、D + 7 = A、第 12 品是空弦的高八度。', '開放弦から半音を数える：B + 3 = D、D + 7 = A、12 フレットは 1 オクターヴ上。', 'Count semitones from the open string: B + 3 = D, D + 7 = A, fret 12 is the octave.'),
      },
      {
        id: 'b32x-c3', type: 'choice', error: 'fretboard', skills: ['calc'], ref: 'agt-caged',
        variants: [
          { prompt: t('D 形上移 3 品是什么和弦？', 'D 形を 3 フレット上げると？', 'The D shape up three frets is…'), options: ['F', 'E', 'G', 'F♯'] },
          { prompt: t('A 形横按在第 5 品是什么和弦？', 'A 形を 5 フレットでバレーすると？', 'The A shape barred at fret 5 is…'), options: ['D', 'C', 'E', 'B'] },
          { prompt: t('同一个和弦沿指板往上，G 形后面接哪个形？', '同じコードで指板を上がると、G 形の次は？', 'Climbing the neck with one chord, which shape follows G?'), options: [t('E 形', 'E 形', 'The E shape'), t('A 形', 'A 形', 'The A shape'), t('D 形', 'D 形', 'The D shape')] },
        ],
        answer: 0,
        explain: t('形移几品，和弦就升几个半音（D + 3 = F、A + 5 = D）；顺序是 C A G E D。', '何フレット動かせばその半音分上がる（D + 3 = F、A + 5 = D）。順番は C A G E D。', 'Move a shape n frets and the chord rises n semitones (D + 3 = F, A + 5 = D); the order is C A G E D.'),
      },
      {
        id: 'b32x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: 'wiki-standard-tuning',
        variants: [
          { prompt: t('和"标准调弦"相对的叫什么？', '「標準調弦」に対する言い方は？', 'What contrasts with “standard tuning”?'), options: [t('变格调弦（scordatura）', 'スコルダトゥーラ', 'Scordatura'), t('平均律', '平均律', 'Equal temperament'), t('移调', '移調', 'Transposition')] },
          { prompt: t('吉他谱面和实音相比？', 'ギターの譜面と実音の関係は？', 'Guitar notation compared with sounding pitch?'), options: [t('谱面高八度', '譜面が 1 オクターヴ高い', 'Written an octave higher'), t('一样', '同じ', 'The same'), t('谱面低八度', '譜面が 1 オクターヴ低い', 'Written an octave lower')] },
        ],
        answer: 0,
        explain: t('为改变音色或技术而改的调弦叫 scordatura；吉他按八度移调，谱面比实音高八度。', '音色や技術のために変える調弦がスコルダトゥーラ。ギターはオクターヴ移調で、譜面が実音より 1 オクターヴ高い。', 'Altered tunings are scordatura; the guitar transposes at the octave, written an octave above sounding pitch.'),
      },
      {
        id: 'b32x-c5', type: 'choice', error: 'fretboard', skills: ['calc'], ref: 'wiki-standard-tuning',
        variants: [
          { prompt: t('D 弦第 2 品（E3）的高八度在 B 弦第几品？', 'D 弦 2 フレット（E3）の 1 オクターヴ上は B 弦の何フレット？', 'D string fret 2 (E3): the octave above is on which B-string fret?'), options: ['5', '4', '3', '7'] },
          { prompt: t('A 弦第 7 品（E3）在 D 弦第几品能弹到同一个音？', 'A 弦 7 フレット（E3）と同じ音は D 弦の何フレット？', 'A string fret 7 (E3) is the same pitch as which D-string fret?'), options: ['2', '3', '12', '5'] },
          { prompt: t('G 弦第 9 品（E4）在 B 弦第几品能弹到同一个音？', 'G 弦 9 フレット（E4）と同じ音は B 弦の何フレット？', 'G string fret 9 (E4) is the same pitch as which B-string fret?'), options: ['5', '4', '6', '0'] },
        ],
        answer: 0,
        explain: t('同音：往高一根弦减 5 品，越过 G–B 减 4；八度：往高两根弦加 2 品，越过 G–B 加 3。', '同音：1 本上の弦で 5 引く（G–B をまたぐと 4）。オクターヴ：2 本上の弦で 2 足す（G–B をまたぐと 3）。', 'Unison: up one string, minus 5 frets (minus 4 across G–B); octave: up two strings, plus 2 (plus 3 across G–B).'),
      },
      G('b32x-g1', 'fretNote', 2, ['calc']),
    ],
  },
  pool: [G('b32x-p1', 'fretNote', 4, ['calc'])],
};

// ===================== B3-3x 非和弦音分析 · 扩展关 =====================
// 对应 A 面：nonchord（经过音与辅助音 / 双辅助音与不完全辅助音 / 三大类 / 综合）+ nctmore（延留三步 / 先现、持续、上行延留 / 换音 / 进阶综合）
const EXT_B3_3 = {
  minutes: 20,
  insight: t('认非和弦音只问三件事：怎么来、怎么走、落在强拍还是弱拍。名字只是这三个答案的组合；先现音"早到"，延留音"晚到"。', '非和声音は 3 つだけ問う：どう入るか、どう出るか、強拍か弱拍か。名前はその答えの組み合わせ。先取音は「早く来る」、掛留音は「遅れて来る」。', 'Identify embellishing tones with three questions: how it arrives, how it leaves, strong or weak position. The names are just combinations of answers; anticipations arrive early, suspensions late.'),
  sections: {
    discover: [
      {
        id: 'b33x-d1', type: 'discover', ref: 'omt-embellishing',
        prompt: t('两种结尾都是 G7 → C。A：旋律在 G7 的最后一拍就提前唱出 C，再在 C 和弦上保持；B：G7 里的 F 留到 C 和弦上，再往下走到 E。哪一个是"早到"，哪一个是"晚到"？', 'どちらも G7 → C の終わり方。A：旋律が G7 の最後の拍で先に C を歌い、C の和音で保つ。B：G7 の F を C の和音まで残し、E へ下がる。「早く来る」のはどちら、「遅れて来る」のはどちら？', 'Both endings go G7 → C. A: the melody sings C early, on G7’s last beat, then holds it over C. B: G7’s F is held into the C chord, then steps down to E. Which arrives early, which late?'),
        play: [{ label: 'A', audio: { chords: [[43, 59, 65, 74], [43, 59, 65, 72], [48, 60, 64, 72], [48, 60, 64, 72]], gap: 650 } }, { label: 'B', audio: { chords: [[43, 59, 62, 65], [48, 55, 60, 65], [48, 55, 60, 64], [48, 55, 60, 64]], gap: 650 } }],
        options: [t('A 早到（先现音），B 晚到（延留音）', 'A が早い（先取音）、B が遅い（掛留音）', 'A early (anticipation), B late (suspension)'), t('A 晚到，B 早到', 'A が遅く、B が早い', 'A late, B early'), t('两个都是经过音', 'どちらも経過音', 'Both are passing tones')],
        answer: 0,
        insight: {
          title: t('一个提前，一个拖后', '片方は先回り、片方は居残り', 'One comes early, one stays late'),
          text: t('先现音是下一个和弦的音提前出现；延留音则是上一个和弦的音留下来，迫使新和弦的音晚到。两者在很多方面正好相反——但写作时，延留音要处理得小心得多：准备、延留、向下级进解决。', '先取音は次の和音の音が先に現れる。掛留音は前の和音の音が居残り、新しい和音の音を遅らせる。多くの点で正反対だが、作曲では掛留音のほうがずっと慎重に扱う：予備・掛留・下行順次で解決。', 'An anticipation is a tone of the next chord heard early; a suspension is a tone of the previous chord that lingers, forcing the new chord tone to arrive late. They are in many ways opposites — but a suspension needs far more care: preparation, suspension, stepwise resolution down.'),
        },
      },
    ],
    explain: [
      {
        id: 'b33x-e1', type: 'page', ref: ['omt-embellishing', 'zhwiki-nct'],
        title: t('进阶 1 · 经过音与辅助音的细节', '発展 1・経過音と刺繍音の細部', 'Advanced 1 · Fine points of passing and neighbour tones'),
        text: [
          t('经过音最典型的是"和弦音–经过音–和弦音"填满一个三度；两个相邻的经过音也可以填满相距四度的两个和弦音。经过音可以在强拍（重音经过音），也可以在弱拍。完全辅助音夹在同一个音的两次出现之间，进出都是级进；它也可以在强拍或弱拍，但在弱拍更常见。', '経過音の典型は「和音音–経過音–和音音」で 3 度を埋める形。隣り合う 2 つの経過音で 4 度離れた和音音の間を埋めることもできる。経過音は強拍（アクセント付き）にも弱拍にも置ける。完全刺繍音は同じ音の 2 回の間にはさまり、出入りとも順次。強拍・弱拍どちらもあるが、弱拍のほうが多い。', 'The typical passing tone fills a third: chord tone – passing tone – chord tone; two adjacent passing tones can fill a fourth. Passing tones may be accented or unaccented. A complete neighbour sits between two statements of the same tone, stepping out and back; it can be accented or unaccented, but unaccented is more common.'),
          t('双辅助音从同一个稳定音开始和结束，中间是它上方一级和下方一级的两个装饰音。单看每一个都像不完全辅助音，合在一起却互相平衡，整体和完全辅助音一样稳定；它通常在弱位置。中文和声教材把它叫"环音"（上下环绕式双辅助音），完全辅助音也叫邻音、刺绣音。', '二重刺繍音は同じ安定音で始まり終わり、その間に 1 つ上と 1 つ下の装飾音を置く。1 つずつ見れば不完全刺繍音だが、組になると釣り合い、全体として完全刺繍音と同じくらい安定する。ふつう弱い位置。中国語の和声教本では「環音」と呼ぶ。', 'A double neighbour starts and ends on the same stable tone, with one step above and one step below in between. Each alone looks like an incomplete neighbour, but together they balance out with the stability of a complete neighbour; it is typically unaccented. Chinese harmony texts call it 环音 (“encircling tone”), and the complete neighbour 邻音 or 刺绣音.'),
        ],
      },
      {
        id: 'b33x-e2', type: 'discover', practice: true, ref: 'omt-embellishing',
        prompt: t('C 大三和弦上，旋律 G–A–B–C（G 和 C 都是和弦音）。A 和 B 是什么？', 'C の和音の上で旋律 G–A–B–C（G と C は和音音）。A と B は？', 'Over a C triad the melody runs G–A–B–C (G and C are chord tones). What are A and B?'),
        options: [t('两个相邻的经过音，填满四度', '4 度を埋める 2 つの経過音', 'Two adjacent passing tones filling a fourth'), t('双辅助音', '二重刺繍音', 'A double neighbour'), t('倚音和逃音', '倚音と逸音', 'An appoggiatura and an escape tone')],
        answer: 0,
        insight: { title: t('一级一级走过去', '1 段ずつ通り抜ける', 'Step by step through'), text: t('G 到 C 相距四度，中间两个音同方向级进：两个经过音。', 'G から C は 4 度、間の 2 音は同方向に順次：経過音 2 つ。', 'G to C spans a fourth; the two notes between move by step in one direction: two passing tones.') },
      },
      {
        id: 'b33x-e3', type: 'page', ref: ['omt-embellishing', 'omt2e-embellishing', 'zhwiki-nct'],
        title: t('进阶 2 · 不完全辅助音：倚音与逃音', '発展 2・不完全刺繍音：倚音と逸音', 'Advanced 2 · Incomplete neighbours: appoggiatura and escape tone'),
        text: [
          t('广义上，不完全辅助音是离一个稳定音一级、另一边用跳进连接的装饰音。其中两种有专门的名字。倚音：在较强的位置，跳进进入（通常往上），再反向级进（通常往下）到更稳定的音。逃音（échappée）：在较弱的位置，从和弦音级进进入（通常往上），再反向跳进（通常往下）离开。两者都是向下离开比向上离开更常见。', '広い意味では、不完全刺繍音は安定音から 1 段離れ、反対側は跳躍でつながる装飾音。2 種類に特別な名前がある。倚音：強い位置にあり、跳躍で入って（ふつう上へ）、反対方向へ順次（ふつう下へ）で安定音へ。逸音（エシャペ）：弱い位置にあり、和音音から順次で入り（ふつう上へ）、反対方向へ跳躍（ふつう下へ）で出る。どちらも下へ出るほうが多い。', 'Broadly, an incomplete neighbour is a step from a stable tone and connected by leap on the other side. Two kinds have names. Appoggiatura: accented, approached by leap (usually up), left by step the other way (usually down) to a more stable tone. Escape tone (échappée): unaccented, approached by step from a chord tone (usually up), left by leap the other way (usually down). Both are more often left downward.'),
          t('中文和声教材的叫法：逃音又称"前级后跳的辅助音"或逸音；"前跳后级的辅助音"叫够音，也称后部倚音。可见同一个音型在不同传统里归类不同——认它，还是看"怎么来、怎么走、落在哪"。', '中国語の和声教本の呼び方：逸音は「前が順次・後が跳躍の補助音」、「前が跳躍・後が順次の補助音」は「够音」（後部倚音）とも呼ばれる。同じ音型でも伝統によって分類が違う——見分けるには「どう入り、どう出て、どこに落ちるか」を見る。', 'In Chinese harmony texts the escape tone is the “step-then-leap auxiliary” (逸音), and the “leap-then-step auxiliary” is called 够音 or “rear appoggiatura”. The same figure is classified differently in different traditions — identify it by how it arrives, leaves and where it falls.'),
        ],
      },
      {
        id: 'b33x-e4', type: 'discover', practice: true, ref: 'omt-embellishing',
        prompt: t('C 大三和弦上，旋律 E → A → G，A 落在强拍上。A 是？', 'C の和音の上で旋律 E → A → G、A は強拍。A は？', 'Over a C triad the melody goes E → A → G, with A on the strong beat. What is A?'),
        options: [t('倚音', '倚音', 'Appoggiatura'), t('逃音', '逸音', 'Escape tone'), t('经过音', '経過音', 'Passing tone')],
        answer: 0,
        insight: { title: t('跳进来，级进走', '跳んで入り、順次で出る', 'Leap in, step out'), text: t('E→A 往上跳，A→G 反向级进，又在强拍：典型的倚音。', 'E→A は上へ跳躍、A→G は反対方向へ順次、しかも強拍：典型的な倚音。', 'E→A leaps up, A→G steps back down, and it is accented: a textbook appoggiatura.') },
      },
      {
        id: 'b33x-e5', type: 'page', ref: ['omt2e-embellishing', 'omt-embellishing'],
        title: t('进阶 3 · 静止的音：延留、上行延留、持续、先现', '発展 3・動かない音：掛留・リターデイション・保続・先取', 'Advanced 3 · Static notes: suspension, retardation, pedal, anticipation'),
        text: [
          t('延留音由三部分组成：准备（和弦音，协和）、延留（同一个音，和弦变化时还留着，在强位置）、解决（往下一级，仍在同一个和弦上）。上方声部最常见的是 9–8、7–6、4–3；除了 9–8，延留着的时候解决音的音级不应同时出现在别的声部。上行延留音就是向上解决的延留，几乎只留给大段落或乐章的最后一个和弦，常和延留音同时出现。比起写 SUS、RET，更常用低音数字标出音程模式。', '掛留音は 3 つの部分からなる：予備（和音音、協和）、掛留（同じ音が和音の変化後も残る、強い位置）、解決（1 段下へ、同じ和音のまま）。上声で最も多いのは 9–8・7–6・4–3。9–8 以外では、掛留中に解決音の音名をほかの声部で同時に鳴らさない。リターデイションは上へ解決する掛留で、ほぼ大きな区切りや楽章の最後の和音に限られ、掛留と同時に現れることが多い。SUS・RET と書くより数字付き低音で音程の型を示すほうが普通。', 'A suspension has three parts: preparation (a chord tone, consonant), suspension (the same note held as the harmony changes, accented), resolution (down a step, over the same harmony). The commonest upper-voice patterns are 9–8, 7–6, 4–3; except for 9–8, the resolution’s pitch class should not sound in another voice against the suspended tone. A retardation is an upward-resolving suspension, almost always reserved for the final chord of a large section or movement, often alongside a suspension. Figured-bass numbers are preferred over SUS or RET labels.'),
          t('持续音多在低音：低音一直保持，上方和弦照常变化，通常用低音的音级数字标记。先现音只有两个音：一个和弦音提前出现，在当前和弦里成为外音，通常紧挨着换和弦之前，多见于乐句或大段落的结尾。', '保続音は多くバスにある：バスが保たれ、上の和音は普通に変わる。ふつうバスの音度番号で示す。先取音は 2 音だけの身ぶり：和音音が早く現れ、今の和音では外音になる。ふつう和音が変わる直前で、フレーズや大きな区切りの終わりに多い。', 'Pedal tones usually sit in the bass: held while the chords above change, labelled with the bass scale degree. The anticipation is a two-note gesture: a chord tone heard early as a non-chord tone, usually just before the harmony changes, typically at the ends of phrases and larger sections.'),
        ],
      },
      {
        id: 'b33x-e6', type: 'discover', practice: true, ref: 'omt-embellishing',
        prompt: t('C 和弦上的 4–3 延留：F 留着时，另一个声部能同时唱 E 吗？', 'C の和音上の 4–3 掛留：F が残っている間、ほかの声部が E を同時に歌ってよい？', 'A 4–3 suspension over C: while F is held, may another voice sing E at the same time?'),
        options: [t('不能；只有 9–8 可以同时有解决音', 'だめ。解決音の同時を許すのは 9–8 だけ', 'No; only 9–8 tolerates the resolution tone elsewhere'), t('可以，随意', '自由に', 'Yes, freely'), t('必须同时有', '必ず同時に鳴らす', 'It must')],
        answer: 0,
        insight: { title: t('别提前泄露答案', '答えを先に漏らさない', 'Don’t give the resolution away'), text: t('解决音 E 在别的声部先响，延留的张力就没了。9–8 是例外：解决音本来就在低音里。', '解決音 E が先にほかの声部で鳴ると掛留の緊張が消える。9–8 は例外：解決音はもともとバスにある。', 'If E already sounds elsewhere, the suspension loses its tension. 9–8 is the exception: its resolution is the bass note itself.') },
      },
      {
        id: 'b33x-e7', type: 'page', ref: ['omt-embellishing', 'zhwiki-nct', 'omt-species3'],
        title: t('进阶 4 · 切分与先现；中文的"延留音"大类；换音', '発展 4・シンコペーションと先取；中国語の「延留音」；カンビアータ', 'Advanced 4 · Syncopation vs anticipation; the Chinese 延留音 family; the cambiata'),
        text: [
          t('切分音和先现音一样是"早到"：通常属于下一拍的和弦。区别在于切分音用连音线连进那个和弦，不重新奏出；先现音则在新和弦上再唱一次。中文和声教材（斯波索宾等）里的"延留音"是一个大类：悬停音（有准备、向下解决，即挂留）、阻碍音（有准备、向上解决）、倚音（没有准备的延留音），都在强拍或次强拍；除了延留音，其他和弦外音都出现在弱拍。', 'シンコペーションも先取音と同じく「早く来る」音で、ふつう次の拍の和音に属する。違いは、シンコペーションはタイでその和音へつなぎ、弾き直さないこと；先取音は新しい和音でもう一度鳴らす。中国語の和声教本（スポソービンほか）では「延留音」は大きな分類：悬停音（予備あり・下行解決＝掛留）、阻碍音（予備あり・上行解決）、倚音（予備のない延留音）で、いずれも強拍か次強拍。延留音以外の和弦外音はすべて弱拍に出る。', 'A syncopation, like an anticipation, arrives early and usually belongs to the next chord — but it is tied into that chord, not restruck, while an anticipation sounds again on the new chord. In Chinese harmony texts (Sposobin et al.) 延留音 is a broad family: 悬停音 (prepared, resolving down — the suspension), 阻碍音 (prepared, resolving up), and 倚音 (the unprepared kind, the appoggiatura), all on strong or medium beats; all other non-chord tones fall on weak beats.'),
          t('三类对位里还有一个可以带着不协和跳进的五音音型——换音（nota cambiata）：下行一步 → 下行三度 → 上行一步 → 上行一步，或者整个反过来。第一、三、五个音和定旋律协和；第二个音不协和却跳走了。它整体从一个强拍级进到下一个强拍，四周都是级进，而且不协和的那个音和下一个强拍是同一个音高，所以跳进的不良效果被抵消了。', '第 3 類対位法には、不協和のまま跳躍できる 5 音の音型もある——カンビアータ：1 段下 → 3 度下 → 1 段上 → 1 段上、またはその逆。1・3・5 番目は定旋律と協和、2 番目は不協和なのに跳び去る。全体では強拍から次の強拍へ 1 段進み、周りはすべて順次、しかも不協和の音と次の強拍は同じ高さなので、跳躍の悪影響が打ち消される。', 'Third species adds a five-note figure that leaps from a dissonance — the nota cambiata: down a step, down a third, up a step, up a step (or the mirror). Notes 1, 3 and 5 are consonant with the cantus; note 2 is dissonant and leaps away. The figure moves one step from downbeat to downbeat, is surrounded by steps, and the dissonant tone equals the next downbeat’s pitch, so the leap does little harm.'),
        ],
      },
      {
        id: 'b33x-e8', type: 'discover', practice: true, ref: 'omt-species3',
        prompt: t('从 C 开始写向上形式的换音（上行一步 → 上行三度 → 下行一步 → 下行一步）：', 'C から上向きのカンビアータを書く（1 段上 → 3 度上 → 1 段下 → 1 段下）：', 'Write the upward cambiata from C (up a step, up a third, down a step, down a step):'),
        options: ['C–D–F–E–D', 'C–D–E–F–G', 'C–B–G–A–B', 'C–E–D–C–B'],
        answer: 0,
        insight: { title: t('第二个音和最后一个音相同', '2 番目と最後の音が同じ', 'Note 2 equals the last note'), text: t('C→D（一步）→F（三度）→E→D：第二个音 D 不协和却跳走，最后又回到 D，整体从 C 上行一级到 D。', 'C→D（1 段）→F（3 度）→E→D：2 番目の D は不協和で跳び去り、最後に D へ戻る。全体で C から D へ 1 段上がる。', 'C→D (step) →F (third) →E→D: the dissonant D leaps away, the figure returns to D, and overall it rises one step from C to D.') },
      },
    ],
    experiment: [
      { id: 'b33x-x1', type: 'experiment', toy: 'nct', ref: ['omt2e-embellishing', 'omt-embellishing'],
        prompt: t('按三大类来找：只用级进的两种、带跳进的两种、带静止音的两种各是哪些"进来 / 离开"组合？听的时候注意：哪几种通常落在较强的位置，哪几种在较弱的位置？', '3 つの分類で探そう：順次だけの 2 種、跳躍を含む 2 種、動かない音を含む 2 種は、それぞれどの「入り方 / 出方」？ 聴きながら、どれが強い位置、どれが弱い位置に来やすいか注意。', 'Hunt by category: which approach/leave pairs give the two stepwise types, the two leaping types and the two static types? As you listen, note which usually fall in stronger positions and which in weaker ones.'),
        params: {},
        breakthrough: { id: 'b33x-cats', text: t('你把每种非和弦音都放回了它所属的类：级进、跳进、静止。', 'どの非和声音も、順次・跳躍・静止の分類に戻せた。', 'You placed every embellishing tone back in its family: step, leap, static.') } },
    ],
    challenge: [
      {
        id: 'b33x-c1', type: 'choice', error: 'nct-type', skills: ['identify'], ref: ['omt-embellishing', 'omt-species3'],
        variants: [
          { prompt: t('C 和弦上，旋律 E–F–D–E。F 和 D 合起来叫？', 'C の和音の上で E–F–D–E。F と D を合わせて？', 'Over C, the melody E–F–D–E. Together F and D form…'), options: [t('双辅助音', '二重刺繍音', 'a double neighbour'), t('两个经过音', '2 つの経過音', 'two passing tones'), t('换音', 'カンビアータ', 'a cambiata')] },
          { prompt: t('C 和弦上，旋律 E–F–C（F 在弱位置）。F 是？', 'C の和音の上で E–F–C（F は弱い位置）。F は？', 'Over C, the melody E–F–C (F unaccented). F is…'), options: [t('逃音', '逸音', 'an escape tone'), t('倚音', '倚音', 'an appoggiatura'), t('完全辅助音', '完全刺繍音', 'a complete neighbour')] },
          { prompt: t('哪一种非和弦音只有两个音构成？', '2 音だけでできる非和声音は？', 'Which embellishing tone is a two-note gesture?'), options: [t('先现音', '先取音', 'Anticipation'), t('经过音', '経過音', 'Passing tone'), t('延留音', '掛留音', 'Suspension')] },
        ],
        answer: 0,
        explain: t('上下各一级围绕同一个音是双辅助音；级进进、反向跳出、在弱位置是逃音；先现音是两个音的音型。', '同じ音の上下 1 段ずつで囲むのが二重刺繍音。順次で入り反対へ跳躍で出て弱い位置なら逸音。先取音は 2 音の身ぶり。', 'Steps above and below one tone make a double neighbour; step in, leap out the other way, unaccented is an escape tone; the anticipation has two notes.'),
      },
      {
        id: 'b33x-c2', type: 'choice', error: 'suspension', skills: ['identify'], ref: 'omt-embellishing',
        variants: [
          { prompt: t('上行延留音通常出现在哪里？', 'リターデイションはふつうどこに出る？', 'Where does a retardation usually appear?'), options: [t('大段落或乐章的最后一个和弦', '大きな区切りや楽章の最後の和音', 'On the final chord of a large section or movement'), t('乐句开头', 'フレーズの冒頭', 'At phrase beginnings'), t('任何弱拍', 'どの弱拍でも', 'On any weak beat')] },
          { prompt: t('上方声部最常见的三种延留是？', '上声で最も多い 3 種の掛留は？', 'The three commonest upper-voice suspensions are…'), options: ['9–8, 7–6, 4–3', '2–3, 5–6, 4–5', '6–5, 3–2, 8–7'] },
          { prompt: t('切分音和先现音的区别是？', 'シンコペーションと先取音の違いは？', 'How does a syncopation differ from an anticipation?'), options: [t('切分音用连音线连进下一个和弦，不重新奏出', 'シンコペーションはタイで次の和音へつなぎ、弾き直さない', 'The syncopation is tied into the next chord, not restruck'), t('切分音晚到', 'シンコペーションは遅れて来る', 'The syncopation arrives late'), t('没有区别', '違いはない', 'No difference')] },
        ],
        answer: 0,
        explain: t('上行延留音几乎只用在大段落的结尾；上方常见 9–8、7–6、4–3；切分音连过去，先现音重新唱。', 'リターデイションはほぼ大きな区切りの終わりだけ。上声は 9–8・7–6・4–3。シンコペーションはタイでつなぎ、先取音は弾き直す。', 'Retardations are almost always at large-scale endings; upper-voice suspensions are typically 9–8, 7–6, 4–3; syncopations are tied over, anticipations restruck.'),
      },
      {
        id: 'b33x-c3', type: 'choice', error: 'nct-type', skills: ['identify'], ref: ['omt-embellishing', 'omt2e-embellishing'],
        variants: [
          { prompt: t('倚音和逃音哪一个通常落在较强的位置？', '倚音と逸音、ふつう強い位置に来るのは？', 'Which is usually accented, the appoggiatura or the escape tone?'), options: [t('倚音', '倚音', 'The appoggiatura'), t('逃音', '逸音', 'The escape tone'), t('都不是', 'どちらでもない', 'Neither')] },
          { prompt: t('双辅助音通常在什么位置？', '二重刺繍音はふつうどの位置？', 'Where is a double neighbour usually placed?'), options: [t('弱位置', '弱い位置', 'Unaccented'), t('强位置', '強い位置', 'Accented'), t('只在终止', '終止だけ', 'Only at cadences')] },
          { prompt: t('倚音和逃音更常见的离开方向是？', '倚音と逸音のより多い出方は？', 'Appoggiaturas and escape tones are more often left…'), options: [t('向下', '下へ', 'downward'), t('向上', '上へ', 'upward'), t('不动', '動かない', 'by repetition')] },
        ],
        answer: 0,
        explain: t('倚音在较强的位置，逃音在较弱的位置；双辅助音通常在弱位置；两者都多半向下离开。', '倚音は強い位置、逸音は弱い位置。二重刺繍音はふつう弱い位置。どちらも下へ出ることが多い。', 'Appoggiaturas are accented, escape tones unaccented; double neighbours are usually unaccented; both are more often left downward.'),
      },
      {
        id: 'b33x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: 'zhwiki-nct',
        variants: [
          { prompt: t('中文和声教材里，"有准备、向上解决的延留音"叫？', '中国語の和声教本で「予備あり・上行解決の延留音」は？', 'In Chinese harmony texts, the “prepared, upward-resolving 延留音” is called…'), options: [t('阻碍音', '阻碍音', '阻碍音'), t('悬停音', '悬停音', '悬停音'), t('够音', '够音', '够音')] },
          { prompt: t('中文和声教材里，倚音被归为哪一类？', '中国語の和声教本では、倚音はどの分類？', 'In Chinese harmony texts, the appoggiatura (倚音) belongs to…'), options: [t('没有准备的延留音', '予備のない延留音', 'the unprepared 延留音'), t('经过音', '経過音', 'passing tones'), t('先现音', '先取音', 'anticipations')] },
          { prompt: t('中文和声教材里，"环音"指？', '中国語の和声教本の「環音」は？', 'In Chinese harmony texts, 环音 means…'), options: [t('上下环绕式双辅助音', '上下を回る二重刺繍音', 'the double neighbour'), t('持续音', '保続音', 'the pedal tone'), t('换音', 'カンビアータ', 'the cambiata')] },
        ],
        answer: 0,
        explain: t('延留音大类：悬停音（向下解决）、阻碍音（向上解决）、倚音（没有准备）；环音是双辅助音。', '延留音の分類：悬停音（下行解決）・阻碍音（上行解決）・倚音（予備なし）。環音は二重刺繍音。', 'The 延留音 family: 悬停音 (down), 阻碍音 (up), 倚音 (unprepared); 环音 is the double neighbour.'),
      },
      {
        id: 'b33x-c5', type: 'choice', error: 'cp-dissonance', skills: ['apply'], ref: 'omt-species3',
        variants: [
          { prompt: t('换音 C–B–G–A–B 里，哪两个音音高相同？', 'カンビアータ C–B–G–A–B で同じ高さの 2 音は？', 'In the cambiata C–B–G–A–B, which two notes share a pitch?'), options: [t('第二个和第五个（B）', '2 番目と 5 番目（B）', 'The second and fifth (B)'), t('第一个和第三个', '1 番目と 3 番目', 'The first and third'), t('第三个和第四个', '3 番目と 4 番目', 'The third and fourth')] },
          { prompt: t('换音里哪几个音必须和定旋律协和？', 'カンビアータで定旋律と協和すべき音は？', 'Which notes of a cambiata must be consonant with the cantus?'), options: [t('第一、三、五个', '1・3・5 番目', 'The first, third and fifth'), t('第二、四个', '2・4 番目', 'The second and fourth'), t('全部', 'すべて', 'All of them')] },
        ],
        answer: 0,
        explain: t('换音的第二个音不协和、跳走，最后一个音又回到它；第一、三、五个音协和。', 'カンビアータの 2 番目は不協和で跳び去り、最後の音がそこへ戻る。1・3・5 番目は協和。', 'The cambiata’s second note is dissonant and leaps away, and the last note returns to it; notes 1, 3 and 5 are consonant.'),
      },
      G('b33x-g1', 'nctType', 2, ['identify']),
    ],
  },
  pool: [G('b33x-p1', 'nctType', 4, ['identify'])],
};

// ===================== B3-4x 类别对位 I–II · 扩展关 =====================
// 对应 A 面：counterpoint（写定旋律 / 四种进行与平行五八度 / 开头与结尾 / 综合）+ species（二类 / 三类 / 四类 / 五类与 Fux，本关讲到二类，其余在 B3-5x）
const FUX_C = 'C3 E3 F3 G3 E3 A3 G3 E3 F3 E3 D3 C3'.split(' ');
const EXT_B3_4 = {
  minutes: 22,
  insight: t('类别对位的规则不是武断的禁令，而是四个目标的具体写法：平滑、声部独立、变化、朝目标运动。每条规则都能问一句"它在保护哪一个？"', '類別対位法の規則は勝手な禁止ではなく、4 つの目標の具体化：滑らかさ・声部の独立・変化・目標への運動。どの規則にも「どれを守っている？」と問える。', 'Species rules are not arbitrary bans but concrete forms of four aims: smoothness, independence, variety, goal-directed motion. Of every rule you can ask: which aim does it protect?'),
  sections: {
    discover: [
      {
        id: 'b34x-d1', type: 'discover', ref: 'omt-species1',
        prompt: t('在定旋律下方写第一类对位，第一个音可以用 do（同度或八度）。为什么不能用 sol？', '定旋律の下に第一類を書くとき、最初の音は do（同度か 8 度）でよい。なぜ sol はだめ？', 'Writing first species below the cantus, you may start on do (unison or octave). Why not sol?'),
        play: [{ label: t('下方 do', '下に do', 'do below'), audio: { chords: [[48, 60]], gap: 1200 } }, { label: t('下方 sol', '下に sol', 'sol below'), audio: { chords: [[43, 60]], gap: 1200 } }],
        options: [t('sol 和上方的 do 构成纯四度，涉及最低声部时是不协和', '下の sol と上の do は完全 4 度、最低声部を含むので不協和', 'sol below do makes a perfect fourth, dissonant when it involves the lowest voice'), t('sol 太低唱不到', 'sol は低すぎて歌えない', 'sol is too low to sing'), t('没有原因', '理由はない', 'No reason')],
        answer: 0,
        insight: {
          title: t('四度：要看在哪两个声部之间', '4 度：どの声部の間かで決まる', 'The fourth depends on which voices'),
          text: t('纯四度和最低声部构成时不协和，在两个上方声部之间则协和。下方从 sol 开始会形成四度；从 fa 开始虽然是纯五度，但开头的 fa–do 很容易被听成 do–sol，弄乱调性。所以下方只能从 do 开始。', '完全 4 度は最低声部とつくると不協和、上 2 声部の間なら協和。下から sol で始めると 4 度になる。fa で始めると完全 5 度だが、冒頭の fa–do は do–sol に聞こえやすく調性が混乱する。だから下は do からだけ。', 'A perfect fourth is dissonant against the lowest voice but consonant between upper voices. Starting below on sol makes a fourth; starting on fa gives a fifth, but an opening fa–do is easily heard as do–sol, confusing the key. So a lower counterpoint must start on do.'),
        },
      },
    ],
    explain: [
      {
        id: 'b34x-e1', type: 'page', ref: ['omt-cantus', 'omt2e-intro'],
        title: t('进阶 1 · 一条好定旋律的全部条件', '発展 1・良い定旋律の条件すべて', 'Advanced 1 · Every trait of a good cantus firmus'),
        text: [
          t('定旋律练的是四种基本素质：平滑、声部的独立与完整、变化、朝目标运动。具体条件：约 8–16 个音，全是全音符；从 do 开始、在 do 结束，以级进到达最后的主音（多半 re–do，有时 ti–do）；相邻音都是旋律上协和的音程；音域不超过十度，通常小于八度；只有一个最高点，而且只出现一次；从开头到最高点再到结尾，形状清楚平滑。', '定旋律で鍛えるのは 4 つの基本：滑らかさ、旋律の独立と完全さ、変化、目標への運動。具体的には：約 8〜16 音で全音符だけ。do で始まり do で終わり、最後の主音へ順次で入る（多くは re–do、時に ti–do）。隣の音はすべて旋律的に協和な音程。音域は 10 度以内、ふつう 8 度未満。最高点は 1 つで 1 回だけ。冒頭から最高点、終わりまで形がはっきり滑らか。', 'A cantus trains four basics: smoothness, independence and integrity of the line, variety, goal-directed motion. Specifically: about 8–16 notes, all whole notes; begin and end on do, approaching the final tonic by step (usually re–do, sometimes ti–do); every melodic interval consonant; range no more than a tenth, usually under an octave; one climax, heard once; a clear, smooth shape from start to climax to end.'),
          t('还有：大多级进，带一些（多半是小的）跳进；不重复"动机"；四度或更大的跳进后要反向级进；不连续跳进超过两次，也不连续向同一方向跳进（Fux 的 F 调定旋律是例外：两次下行跳进勾出一个协和三和弦）；导音进行到主音；小调里导音只出现在倒数第二小节，升高的第六级只在走向导音时使用。', 'さらに：ほとんど順次で、いくつか（多くは小さな）跳躍。「動機」を繰り返さない。4 度以上の跳躍の後は反対方向へ順次。跳躍は 2 回まで続けてよいが、同じ方向に続けない（フックスのヘ調定旋律は例外：2 回の下行跳躍が協和三和音をなぞる）。導音は主音へ。短調では導音は最後から 2 小節目だけ、上げた第 6 音は導音へ進むときだけ。', 'Also: mostly steps with some (mostly small) leaps; no repeated motives; a leap of a fourth or more is followed by a step the other way; no more than two leaps in a row, and no consecutive leaps in one direction (Fux’s F cantus is the exception, its two descending leaps outlining a consonant triad); the leading tone goes to the tonic; in minor the leading tone appears only in the penultimate bar, and the raised sixth only on the way to it.'),
        ],
      },
      {
        id: 'b34x-e2', type: 'discover', practice: true, ref: 'omt-cantus',
        prompt: t('定旋律从 E 往上跳六度到 C。下一个音最好是？', '定旋律が E から 6 度上の C へ跳躍。次の音は？', 'A cantus leaps up a sixth from E to C. The next note should be…'),
        options: [t('反向级进，例如 B', '反対方向へ順次、たとえば B', 'A step back down, e.g. B'), t('再往上跳到 E', 'さらに上の E へ跳ぶ', 'Another leap up to E'), t('重复 C', 'C を繰り返す', 'Repeat C')],
        answer: 0,
        insight: { title: t('大跳之后往回走一步', '大跳躍の後は 1 歩戻る', 'After a big leap, step back'), text: t('四度以上的跳进后反向级进，旋律才平滑；连续向同一方向跳进是不允许的。', '4 度以上の跳躍の後は反対へ順次すると滑らか。同じ方向への連続跳躍は不可。', 'Stepping back after a leap of a fourth or more keeps the line smooth; consecutive leaps in one direction are not allowed.') },
      },
      {
        id: 'b34x-e3', type: 'page', ref: 'omt-cantus',
        title: t('进阶 2 · 规则背后：Huron 的五种旋律倾向', '発展 2・規則の背景：ヒューロンの 5 つの旋律傾向', 'Advanced 2 · Behind the rules: Huron’s five melodic tendencies'),
        text: [
          t('这些条件有些专属于严格的类别对位，但合起来描述的是多种风格里旋律的普遍倾向。David Huron 归纳了西方音乐旋律的五种性质：音高邻近（pitch proximity）——级进多于跳进，小跳多于大跳；级进下行（step declination）——下行级进多于上行级进，下行常被感知为能量降低、走向休息；级进惯性（step inertia）——旋律多半继续同一方向，改变方向较少。', 'これらの条件には厳格対位法特有のものもあるが、合わせると多くの様式の旋律に共通する傾向を表している。デヴィッド・ヒューロンは西洋音楽の旋律の 5 つの性質をまとめた：音高近接（pitch proximity）——跳躍より順次、大跳躍より小跳躍が多い。順次下行（step declination）——上行より下行の順次が多く、下行はエネルギーの減少・休息へ向かう動きと感じられやすい。順次の慣性（step inertia）——旋律は向きを変えるより同じ向きに続くことが多い。', 'Some of these traits are specific to strict species, but together they describe general tendencies of melodies in many styles. David Huron identifies five: pitch proximity — more steps than leaps, more small leaps than large; step declination — more descending than ascending steps, descent being heard as a loss of energy toward rest; step inertia — melodies more often continue in the same direction than change.'),
          t('旋律回归（melodic regression）——极端音区的音倾向回到中间（音越高，下方可选的音越多）；旋律拱形（melodic arch）——乐句前半上行、到达高点、后半下行，体现"静—动—静"。定旋律的"只有一个高点"和"大跳后反向级进"，正是这些倾向在严格风格里的具体写法。', '旋律の回帰（melodic regression）——極端な音域の音は中央へ戻ろうとする（高い音ほど下に選べる音が多い）。旋律のアーチ（melodic arch）——フレーズの前半で上がり、最高点に達し、後半で下がる。「静—動—静」の表れ。定旋律の「最高点は 1 つ」「大跳躍の後は反対へ順次」は、これらの傾向の厳格な様式での書き方そのもの。', 'Melodic regression — notes in extreme registers tend back toward the middle (the higher a note, the more notes lie below it); melodic arch — rising in the first half of a phrase, reaching a climax, falling in the second, a rest–motion–rest shape. The cantus rules “one climax” and “step back after a leap” are these tendencies written out in a strict style.'),
        ],
      },
      {
        id: 'b34x-e4', type: 'discover', practice: true, ref: 'omt-cantus',
        prompt: t('"乐句前半上行、到达高点、后半下行"是 Huron 的哪一种倾向？', '「前半で上がり、最高点、後半で下がる」はヒューロンのどの傾向？', '“Rise in the first half, climax, fall in the second” is which of Huron’s tendencies?'),
        options: [t('旋律拱形（melodic arch）', '旋律のアーチ（melodic arch）', 'Melodic arch'), t('级进惯性（step inertia）', '順次の慣性（step inertia）', 'Step inertia'), t('音高邻近（pitch proximity）', '音高近接（pitch proximity）', 'Pitch proximity')],
        answer: 0,
        insight: { title: t('静—动—静', '静—動—静', 'Rest–motion–rest'), text: t('拱形是其他几种倾向在一个乐句里的综合。', 'アーチはほかの傾向が 1 つのフレーズで組み合わさったもの。', 'The arch combines the other tendencies within one phrase.') },
      },
      {
        id: 'b34x-e5', type: 'page', ref: 'omt-species1',
        title: t('进阶 3 · 第一类：声部独立的细节', '発展 3・第一類：声部の独立の細部', 'Advanced 3 · First species: details of independence'),
        text: [
          t('对位声部的最高点不能和定旋律的最高点重合（双重高点会让某一刻过分突出）；允许一次同音反复，但最好不用；避免声部交叉（上声暂时低于下声）和声部超越（一个声部跳过另一声部上一个音的位置，例如上声唱 E4 后，下声下一小节不能唱 F4）。', '対旋律の最高点は定旋律の最高点と重ねない（二重の最高点は 1 か所を強調しすぎる）。同音反復は 1 回まで許されるが、なるべく使わない。声部の交差（上声が一時的に下声より低い）と超越（片方が相手の直前の音を越える。上声が E4 を歌った次の小節で下声が F4 を歌えない）は避ける。', 'The counterpoint’s climax must not coincide with the cantus climax (a double climax over-emphasises one moment); one repeated note is allowed, but better none; avoid voice crossing (upper voice below lower) and overlap (a voice passing the other’s previous note — after an upper E4, the lower voice cannot take F4 next bar).'),
          t('两声部相距不超过纯十二度，尽量在八度以内，超过十度只在"紧急情况"下短暂使用——太远会削弱融合，也不好演奏。同度只用在开头和结尾；除首尾外多用不完全协和。绝对不要连续两个同样大小的完全协和（P5–P5、P8–P8），复音程也算：P5–P12 等于 P5–P5；不同的完全协和相连（如 P8–P5）可以，但最好每个完全协和后接不完全协和。', '2 声部の間は完全 12 度以内、なるべく 8 度以内。10 度を超えるのは「緊急時」に短くだけ——離れすぎると融合が弱まり、演奏もしにくい。同度は最初と最後だけ。それ以外は不完全協和を多く。同じ大きさの完全協和を続けない（P5–P5、P8–P8）。複音程も同じ：P5–P12 は P5–P5 と同じ。違う完全協和の連続（P8–P5 など）は可だが、完全協和の後はなるべく不完全協和に。', 'Keep within a perfect twelfth, ideally an octave, exceeding a tenth only briefly in “emergencies” — too far apart weakens fusion and performability. Unisons only first and last; otherwise prefer imperfect consonances. Never two perfect consonances of the same size in a row (P5–P5, P8–P8), compounds included: P5–P12 counts as P5–P5; different perfect consonances in a row (P8–P5) are allowed, but try to follow each with an imperfect one.'),
        ],
      },
      {
        id: 'b34x-e6', type: 'discover', practice: true, ref: 'omt-species1',
        prompt: t('上声唱 E4，下一小节下声从 C4 跳到 F4，上声走到 G4。这叫？', '上声が E4、次の小節で下声が C4 から F4 へ、上声は G4 へ。これは？', 'The upper voice sings E4; next bar the lower voice leaps C4 → F4 while the upper goes to G4. This is…'),
        options: [t('声部超越', '声部の超越', 'Voice overlap'), t('声部交叉', '声部の交差', 'Voice crossing'), t('平行五度', '平行 5 度', 'Parallel fifths')],
        answer: 0,
        insight: { title: t('越过了对方上一个音', '相手の直前の音を越えた', 'It passed the other voice’s previous note'), text: t('F4 高于上声刚才的 E4，虽然没有交叉，却越过了它，声部就不容易分清。', 'F4 は上声の直前の E4 より高い。交差していなくても越えているので、声部が聞き分けにくい。', 'F4 is above the upper voice’s previous E4: no crossing, but an overlap that blurs the voices.') },
      },
      {
        id: 'b34x-e7', type: 'page', ref: 'omt-species2',
        title: t('进阶 4 · 第二类：强拍、跨小节线与弱拍', '発展 4・第二類：強拍・小節線をまたぐ動き・弱拍', 'Advanced 4 · Second species: downbeats, barlines, weak beats'),
        text: [
          t('二类对位比一类更以级进为主；必须跳进时，最好在小节内（强拍到弱拍）跳，而不是跨小节线；通常还要有一两个"次高点"。可以先写两个二分音符，也可以用二分休止符开头再接一个二分音符——后者让节奏特征更清楚，也更好写。倒数第二小节可以是一个全音符（最后两小节和一类相同），也可以是两个二分音符。', '第二類は第一類よりさらに順次中心。跳躍が必要なら小節線をまたがず小節内（強拍→弱拍）で。ふつう 1〜2 個の「副次的な最高点」も必要。2 分音符 2 つで始めても、2 分休符の後に 2 分音符 1 つで始めてもよい——後者のほうがリズムの性格がはっきりし、書きやすい。最後から 2 小節目は全音符（最後の 2 小節が第一類と同じ）でも 2 分音符 2 つでもよい。', 'Second species is even more stepwise than first; if you must leap, leap within the bar (strong to weak) rather than across the barline; one or two secondary climaxes are usual. Begin with two half notes, or a half rest then a half note — the latter makes the rhythm clearer and is easier to write. The penultimate bar may be a whole note (making the last two bars first species) or two halves.'),
          t('强拍永远协和，多用三、六度，避免同度。跨小节线（弱拍到强拍）的进行和强拍到强拍的进行都按一类规则：两个相邻小节不能以同一个完全音程开头；相邻强拍之间不能勾出不协和的旋律音程（例外：强拍到弱拍跳八度后反向级进，和前一个强拍形成七度，这是平滑进行的结果，可以）；同一个不完全协和不超过连续三个小节；强拍之间的隐伏五八度可以，因为中间的音削弱了效果。弱拍可以是同度；弱拍的不协和只能是经过音。', '強拍は常に協和、3・6 度を多く、同度は避ける。小節線をまたぐ動き（弱拍→強拍）と強拍→強拍の動きは第一類の規則に従う：隣り合う小節を同じ完全音程で始めない。隣の強拍どうしで不協和な旋律音程をなぞらない（例外：強拍から弱拍へ 8 度跳んで反対へ順次し、前の強拍と 7 度になるのは、滑らかな動きの結果なので可）。同じ不完全協和は 3 小節まで。強拍間の並達 5・8 度は、間の音が効果を弱めるので可。弱拍は同度でもよい。弱拍の不協和は経過音だけ。', 'Downbeats are always consonant, preferably thirds and sixths, avoiding unisons. Motion across the barline (weak to strong) and downbeat to downbeat follows first species: don’t begin two consecutive bars with the same perfect interval; don’t outline a dissonant melodic interval between downbeats (except when an octave leap strong-to-weak is followed by a step back, making a seventh with the previous downbeat — the result of smooth motion); no more than three bars in a row on the same imperfect consonance; hidden fifths between downbeats are fine, weakened by the note between. Weak beats may be unisons; a weak-beat dissonance must be a passing tone.'),
        ],
      },
      {
        id: 'b34x-e8', type: 'discover', practice: true, ref: 'omt-species2',
        prompt: t('二类对位：这一小节的弱拍是纯五度，下一小节强拍也是纯五度。可以吗？', '第二類：この小節の弱拍が完全 5 度、次の小節の強拍も完全 5 度。よい？', 'Second species: this bar’s weak beat is a perfect fifth, and the next downbeat is too. Allowed?'),
        options: [t('不可以：跨小节线按一类规则，等于连续五度', 'だめ：小節線をまたぐ動きは第一類の規則で、連続 5 度になる', 'No: across the barline first-species rules apply — consecutive fifths'), t('可以，弱拍不算', 'よい、弱拍は数えない', 'Yes, weak beats don’t count'), t('只在结尾可以', '終わりだけよい', 'Only at the end')],
        answer: 0,
        insight: { title: t('两个声部同时动，就按一类看', '2 声部が同時に動けば第一類として見る', 'Both voices move: judge it as first species'), text: t('弱拍到强拍，两个声部同时移动，和一类的情况一样，所以不能连续纯五度。', '弱拍→強拍では 2 声部が同時に動き、第一類と同じ状況なので連続完全 5 度は不可。', 'From weak beat to downbeat both voices move, just as in first species, so consecutive fifths are out.') },
      },
    ],
    experiment: [
      { id: 'b34x-x1', type: 'experiment', toy: 'species', ref: ['omt-species1', 'omt-intervals', 'gotham-species'],
        prompt: t('又一条毛病很多的第一类对位：开头不是完全协和、中间出现同度、倒数第二个音不对、还用同向进行进入五度。逐个修好，改到 100 分——每修一处，想想它保护的是平滑、独立、变化还是朝目标运动。', 'また問題だらけの第一類対旋律：冒頭が完全協和でない、途中に同度、最後から 2 番目の音が違う、同方向で 5 度に入る。1 つずつ直して 100 点に——直すたびに、それが滑らかさ・独立・変化・目標への運動のどれを守るか考えよう。', 'Another faulty first-species line: it doesn’t open on a perfect consonance, has a unison mid-way, a wrong penultimate note, and enters a fifth by similar motion. Fix them one by one to 100 — and for each fix, ask whether it protects smoothness, independence, variety or goal-directed motion.'),
        params: { species: 1, cantus: FUX_C, start: 'A3 G3 A3 G3 G3 C4 B3 C4 A3 C4 A3 C4'.split(' ') },
        breakthrough: { id: 'b34x-clean', text: t('又一条对位被你修到满分，而且你知道每条规则在保护什么。', 'また 1 本の対旋律を満点に。しかも各規則が何を守るかもわかった。', 'Another counterpoint repaired to full marks — and you know what each rule protects.') } },
    ],
    challenge: [
      {
        id: 'b34x-c1', type: 'choice', error: 'cp-line', skills: ['identify'], ref: 'omt-cantus',
        variants: [
          { prompt: t('定旋律的音域一般不超过？', '定旋律の音域はふつう何以内？', 'A cantus firmus’s range should not exceed…'), options: [t('十度（通常小于八度）', '10 度（ふつう 8 度未満）', 'a tenth (usually under an octave)'), t('十二度', '12 度', 'a twelfth'), t('两个八度', '2 オクターヴ', 'two octaves')] },
          { prompt: t('小调定旋律里，导音可以出现在哪里？', '短調の定旋律で導音が出てよいのは？', 'In a minor-key cantus, where may the leading tone appear?'), options: [t('只在倒数第二小节', '最後から 2 小節目だけ', 'Only in the penultimate bar'), t('任何地方', 'どこでも', 'Anywhere'), t('只在开头', '冒頭だけ', 'Only at the start')] },
          { prompt: t('Fux 的 F 调定旋律里连续两次下行跳进为什么被接受？', 'フックスのヘ調定旋律で 2 回続く下行跳躍が許されるのはなぜ？', 'Why are the two consecutive descending leaps in Fux’s F cantus accepted?'), options: [t('它们勾出一个协和三和弦', '協和三和音をなぞるから', 'They outline a consonant triad'), t('Fux 写错了', 'フックスの誤り', 'Fux made a mistake'), t('跳进都是二度', 'どちらも 2 度だから', 'Both leaps are seconds')] },
        ],
        answer: 0,
        explain: t('定旋律音域不超过十度；小调导音只在倒数第二小节；Fux 的 F 调定旋律是例外，因为两次跳进勾出协和三和弦。', '音域は 10 度以内。短調の導音は最後から 2 小節目だけ。フックスのヘ調は 2 回の跳躍が協和三和音をなぞるので例外。', 'Range within a tenth; minor leading tone only in the penultimate bar; Fux’s F cantus is the exception because its two leaps outline a consonant triad.'),
      },
      {
        id: 'b34x-c2', type: 'choice', error: 'cp-frame', skills: ['apply'], ref: 'omt-species1',
        variants: [
          { prompt: t('第一类对位里，两声部最远可以相距？', '第一類で 2 声部の間は最大どこまで？', 'In first species, how far apart may the voices be at most?'), options: [t('纯十二度（尽量八度以内）', '完全 12 度（なるべく 8 度以内）', 'A perfect twelfth (ideally within an octave)'), t('两个八度', '2 オクターヴ', 'Two octaves'), t('纯五度', '完全 5 度', 'A perfect fifth')] },
          { prompt: t('P5 接 P12 算不算连续五度？', 'P5 の次に P12 は連続 5 度？', 'Does P5 followed by P12 count as consecutive fifths?'), options: [t('算，复音程按单音程看', 'なる。複音程は単音程と同じ', 'Yes — compounds count as simple intervals'), t('不算', 'ならない', 'No'), t('只在下方对位算', '下の対旋律だけ', 'Only below the cantus')] },
          { prompt: t('定旋律以 ti–do 结尾，上方第一类对位最后两个音应是？', '定旋律が ti–do で終わるとき、上の第一類の最後の 2 音は？', 'If the cantus ends ti–do, the first-species counterpoint ends…'), options: ['re–do', 'ti–do', 'sol–do'] },
        ],
        answer: 0,
        explain: t('两声部不超过十二度；复音程与单音程同等看待；定旋律 ti–do 时对位用 re–do，反向级进到达。', '12 度以内。複音程は単音程と同じに扱う。定旋律が ti–do なら対旋律は re–do で反行順次。', 'Within a twelfth; compound intervals count as simple; with ti–do in the cantus the counterpoint ends re–do, by contrary step.'),
      },
      {
        id: 'b34x-c3', type: 'choice', error: 'cp-rhythm', skills: ['apply'], ref: 'omt-species2',
        variants: [
          { prompt: t('二类对位里必须跳进时，最好在哪里跳？', '第二類で跳躍が必要なら、どこで跳ぶ？', 'In second species, if you must leap, where is best?'), options: [t('小节内，从强拍到弱拍', '小節内、強拍から弱拍へ', 'Within the bar, strong to weak'), t('跨小节线，从弱拍到强拍', '小節線をまたいで弱拍から強拍へ', 'Across the barline, weak to strong'), t('哪里都一样', 'どこでも同じ', 'It makes no difference')] },
          { prompt: t('二类对位的弱拍上可以出现什么不协和？', '第二類の弱拍に出てよい不協和は？', 'What dissonance may appear on a second-species weak beat?'), options: [t('只有经过音', '経過音だけ', 'Only a passing tone'), t('辅助音和换音', '刺繍音とカンビアータ', 'Neighbours and cambiatas'), t('任何不协和', 'どの不協和でも', 'Any dissonance')] },
          { prompt: t('二类对位强拍之间的隐伏五度可以吗？', '第二類の強拍間の並達 5 度はよい？', 'Are hidden fifths between second-species downbeats allowed?'), options: [t('可以，中间的音削弱了效果', 'よい。間の音が効果を弱める', 'Yes — the intervening note weakens them'), t('不可以', 'だめ', 'No'), t('只在开头可以', '冒頭だけ', 'Only at the start')] },
        ],
        answer: 0,
        explain: t('跳进放在小节内；弱拍的不协和只能是经过音；强拍之间的隐伏五八度可以。', '跳躍は小節内に。弱拍の不協和は経過音だけ。強拍間の並達 5・8 度は可。', 'Leap within the bar; weak-beat dissonance only as a passing tone; hidden fifths between downbeats are fine.'),
      },
      {
        id: 'b34x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: ['omt-cantus', 'omt2e-intro'],
        variants: [
          { prompt: t('"下行级进多于上行级进"是 Huron 的哪一种倾向？', '「上行より下行の順次が多い」はヒューロンのどれ？', '“More descending than ascending steps” is which tendency?'), options: [t('级进下行（step declination）', '順次下行（step declination）', 'Step declination'), t('旋律回归（melodic regression）', '旋律の回帰（melodic regression）', 'Melodic regression'), t('旋律拱形（melodic arch）', '旋律のアーチ（melodic arch）', 'Melodic arch')] },
          { prompt: t('Fux 的《Gradus ad Parnassum》出版于哪一年？', 'フックスの『グラドゥス・アド・パルナッスム』の出版年は？', 'When was Fux’s Gradus ad Parnassum published?'), options: ['1725', '1625', '1825'] },
          { prompt: t('两个上方声部之间的纯四度是？', '上 2 声部の間の完全 4 度は？', 'A perfect fourth between two upper voices is…'), options: [t('协和', '協和', 'consonant'), t('不协和', '不協和', 'dissonant'), t('完全协和中最稳定的', '完全協和で最も安定', 'the most stable perfect consonance')] },
        ],
        answer: 0,
        explain: t('级进下行是下行多于上行；《Gradus ad Parnassum》1725 年出版；纯四度只在涉及最低声部时不协和。', '順次下行は下行が多いこと。『グラドゥス』は 1725 年。完全 4 度は最低声部を含むときだけ不協和。', 'Step declination means more descending steps; Gradus ad Parnassum appeared in 1725; the fourth is dissonant only against the lowest voice.'),
      },
      G('b34x-g1', 'consonance', 1, ['identify']),
      G('b34x-g2', 'motion', 1, ['identify']),
    ],
  },
  pool: [G('b34x-p1', 'consonance', 2, ['identify']), G('b34x-p2', 'motion', 2, ['identify'])],
};

// ===================== B3-5x 类别对位 III–IV 与模仿 · 扩展关 =====================
// 对应 A 面：species（三类 / 四类 / 五类与 Fux）+ 支线 canon（进入的时间 / 进入的音程 / 倒影、逆行与扩大 / 用检查器写卡农）
// 《Frère Jacques》前四小节（同 B3-5 普通关的导句；wiki-canon 把它列为简单卡农 / 轮唱的例子）
const FRERE = [[60, 1], [62, 1], [64, 1], [60, 1], [60, 1], [62, 1], [64, 1], [60, 1], [64, 1], [65, 1], [67, 2], [64, 1], [65, 1], [67, 2]];
const EXT_B3_5 = {
  minutes: 24,
  insight: t('从第三类到第五类，再到卡农，不协和越来越自由，但每一个都要有来处和去处；卡农则把这件事推到极致：改导句一个音，两处音程一起变。', '第 3 類から第 5 類、そしてカノンへ、不協和はどんどん自由になるが、どれにも来る道と行く先が要る。カノンはそれを極限まで押し進める：先行声部の 1 音を変えると、2 か所の音程が同時に変わる。', 'From third to fifth species and on to canon, dissonance grows freer, yet each must come from somewhere and go somewhere; canon pushes this to the limit — change one note of the leader and two intervals change at once.'),
  sections: {
    discover: [
      {
        id: 'b35x-d1', type: 'discover', ref: 'omt-species4',
        prompt: t('第四类对位里，同样的"挂留"有两种：7–6 和 9–8。为什么 7–6 可以连用好几次，9–8 却不能连续两次？', '第四類では同じ「掛留」に 7–6 と 9–8 がある。なぜ 7–6 は何度も続けてよく、9–8 は 2 回続けられない？', 'In fourth species, 7–6 and 9–8 are both suspensions. Why may 7–6 repeat several times but 9–8 never twice in a row?'),
        play: [{ label: '7–6', audio: { chords: [[50, 60], [50, 59]], gap: 900 } }, { label: '9–8', audio: { chords: [[48, 62], [48, 60]], gap: 900 } }],
        options: [t('延留按解决后的音程套用一类规则：两个 9–8 等于连续两个八度', '掛留は解決後の音程で第一類の規則を当てはめる：9–8 が 2 回なら連続 8 度', 'Suspensions follow first-species rules for their resolution: two 9–8s mean consecutive octaves'), t('9–8 太难唱', '9–8 は歌いにくい', '9–8 is hard to sing'), t('7–6 不是不协和', '7–6 は不協和ではない', '7–6 is not dissonant')],
        answer: 0,
        insight: {
          title: t('看解决音程', '解決音程を見る', 'Look at the resolution'),
          text: t('7–6、4–3（上方）和 2–3、5–6（下方）解决到不完全协和，可以多用，但和一类里的三、六度一样不超过连续三次；9–8、4–5 解决到完全协和，不能连用；"协和的挂留" 6–5 也不能连用，因为它"解决"到五度。', '7–6・4–3（上）と 2–3・5–6（下）は不完全協和へ解決するので多用できるが、第一類の 3・6 度と同じく 3 回まで。9–8・4–5 は完全協和へ解決するので続けられない。「協和の掛留」6–5 も 5 度へ「解決」するので続けない。', '7–6 and 4–3 (above) and 2–3 and 5–6 (below) resolve to imperfect consonances and may be used freely, but no more than three in a row, like thirds and sixths in first species; 9–8 and 4–5 resolve to perfect consonances and cannot repeat; nor can the “consonant suspension” 6–5, whose “resolution” is a fifth.'),
        },
      },
    ],
    explain: [
      {
        id: 'b35x-e1', type: 'page', ref: 'omt-species3',
        title: t('进阶 1 · 第三类：强拍之间的规则', '発展 1・第三類：強拍どうしの規則', 'Advanced 1 · Third species: rules between downbeats'),
        text: [
          t('四对一：第 1 拍强、第 3 拍次强、第 2、4 拍弱。可以四个四分音符开头，也可以四分休止符加三个四分音符。最后一个音是全音符 do；倒数第二个音（倒数第二小节最后一个四分音符）：定旋律是 re 时用 ti，是 ti 时用 re。强拍协和、不用同度、多用三六度；第 4 拍进入下一强拍按一类规则。', '4 対 1：第 1 拍が強、第 3 拍が次強、第 2・4 拍が弱。4 分音符 4 つで始めても、4 分休符の後に 3 つでもよい。最後は全音符の do。最後から 2 番目（最後から 2 小節目の最後の 4 分音符）は、定旋律が re なら ti、ti なら re。強拍は協和・同度なし・3・6 度を多く。第 4 拍から次の強拍への動きは第一類の規則。', 'Four against one: beat 1 strong, beat 3 moderately strong, beats 2 and 4 weak. Begin with four quarters or a quarter rest and three quarters. End on a whole-note do; the penultimate note (last quarter of the penultimate bar) is ti over re, re over ti. Downbeats consonant, no unisons, prefer thirds and sixths; beat 4 into the next downbeat follows first species.'),
          t('强拍到强拍：不能连续三个小节以同一个完全音程开头（两个可以）；同一个不完全协和不超过三个小节；相邻强拍不能勾出不协和的旋律音程。如果强拍是五度，上一小节第 3、4 拍都不能是五度；如果强拍是八度，上一小节第 2、3、4 拍都不能是八度——多夹一两个音，平行五八度的问题并不会消失。强拍之间的隐伏五八度可以。两个连续的不协和经过音（P4–d5 或 d5–P4）可以，只要不落在强拍、并朝同一方向级进。', '強拍→強拍：3 小節続けて同じ完全音程で始めない（2 つまでなら可）。同じ不完全協和は 3 小節まで。隣の強拍どうしで不協和な旋律音程をなぞらない。強拍が 5 度なら前の小節の第 3・4 拍は 5 度にしない。強拍が 8 度なら前の小節の第 2・3・4 拍は 8 度にしない——音を 1〜2 個はさんでも平行 5・8 度の問題は消えない。強拍間の並達 5・8 度は可。不協和な経過音 2 つの連続（P4–d5・d5–P4）は、強拍に落ちず同じ方向へ順次なら可。', 'Downbeat to downbeat: no three consecutive bars beginning with the same perfect interval (two are fine); no more than three on the same imperfect consonance; no dissonant melodic interval between downbeats. If a downbeat is a fifth, beats 3 and 4 of the previous bar may not be fifths; if an octave, beats 2, 3 and 4 may not be octaves — adding a note or two does not cure parallels. Hidden fifths and octaves between downbeats are allowed. Two dissonant passing tones in a row (P4–d5 or d5–P4) are fine if off the downbeat and stepwise in one direction.'),
        ],
      },
      {
        id: 'b35x-e2', type: 'discover', practice: true, ref: 'omt-species3',
        prompt: t('第三类：下一小节强拍是八度，这一小节第 2 拍也是八度（第 3、4 拍不是）。可以吗？', '第三類：次の小節の強拍が 8 度、この小節の第 2 拍も 8 度（第 3・4 拍は違う）。よい？', 'Third species: the next downbeat is an octave, and beat 2 of this bar is also an octave (beats 3–4 are not). Allowed?'),
        options: [t('不可以：强拍八度前，第 2、3、4 拍都不能是八度', 'だめ：強拍の 8 度の前は第 2・3・4 拍とも 8 度不可', 'No: before a downbeat octave, beats 2, 3 and 4 may not be octaves'), t('可以，中间隔了两个音', 'よい、間に 2 音ある', 'Yes, two notes intervene'), t('只有第 4 拍才算', '第 4 拍だけが問題', 'Only beat 4 matters')],
        answer: 0,
        insight: { title: t('夹几个音也救不了', '音をはさんでも救えない', 'Intervening notes don’t help'), text: t('八度的限制比五度更宽：上一小节第 2、3、4 拍都要避开八度。', '8 度の制限は 5 度より広い：前の小節の第 2・3・4 拍すべてで 8 度を避ける。', 'The octave rule reaches further than the fifth rule: avoid octaves on beats 2, 3 and 4 of the previous bar.') },
      },
      {
        id: 'b35x-e3', type: 'page', ref: ['omt-species3', 'omt-species4'],
        title: t('进阶 2 · 双辅助音的走向；第四类的细节', '発展 2・二重刺繍音の進み方；第四類の細部', 'Advanced 2 · Where the double neighbour goes; fourth-species details'),
        text: [
          t('三类里的双辅助音：第 1、4 拍是同一个音，第 2、3 拍是它上方和下方一级（C–D–B–C 或 C–B–D–C），第 2、3 拍都不协和。用的时候，第 3 拍到第 4 拍的方向要和第 4 拍到下一强拍的方向相同，而且跨小节线也要级进。第四类：两个声部总是斜向进行；从 do 或 sol（上方）、do（下方）开始，总是以二分休止符开头；首尾可以是同度。', '第三類の二重刺繍音：第 1・4 拍が同じ音、第 2・3 拍はその 1 つ上と 1 つ下（C–D–B–C か C–B–D–C）で、どちらも不協和。使うときは、第 3→4 拍の向きと第 4 拍→次の強拍の向きをそろえ、小節線をまたぐ動きも順次に。第四類：2 声部は常に斜行。上なら do か sol、下なら do で始め、必ず 2 分休符から。最初と最後は同度でもよい。', 'The third-species double neighbour: beats 1 and 4 are the same note, beats 2 and 3 a step above and below (C–D–B–C or C–B–D–C), both dissonant. The direction from beat 3 to 4 should match that from beat 4 to the next downbeat, and the motion across the barline should be a step. Fourth species: the voices always move obliquely; begin on do or sol above, do below, always after a half rest; first and last dyads may be unisons.'),
          t('第四类要避免连续两个弱拍构成五度或八度（"后拍五八度"），因为听众会把弱拍当成主要的协和。没有不协和挂留可用时，可以用协和的连音，或从强拍的协和往上跳到弱拍的协和；一两次上行跳进是必要的，免得一路下行超出音域。实在不行可以"打破类别"——按二类写一两个小节，尽快回到四类，一个练习里最多一次。结尾只有一种：定旋律必须以 re–do 结尾，对位在倒数第二小节写 do–ti，形成上方 7–6 或下方 2–3 延留，最后是全音符 do。', '第四類では弱拍が 2 回続けて 5 度や 8 度にならないようにする（「後拍の 5・8 度」）。聴き手は弱拍を主な協和と受け取るから。不協和の掛留が使えないときは協和のタイや、強拍の協和から弱拍の協和へ上に跳ぶ。音域を保つため上行跳躍が 1〜2 回は必要。どうしても無理なら「類を破る」——第二類で 1〜2 小節書いてすぐ第四類に戻る。1 つの課題で 1 回まで。終わり方は 1 つだけ：定旋律は re–do で終わり、対旋律は最後から 2 小節目で do–ti、上なら 7–6、下なら 2–3 の掛留になり、最後は全音符の do。', 'Avoid fifths or octaves on consecutive weak beats (“after-beat” fifths/octaves), since listeners hear the weak beats as the main consonances. If no dissonant suspension fits, use a consonant tie or leap up from a downbeat consonance to a weak-beat one; one or two upward leaps are needed to stay in range. As a last resort, “break species” — write a bar or two of second species and resume ties at once, no more than once per exercise. There is one ending: the cantus must end re–do, the counterpoint has do–ti in the penultimate bar, a 7–6 above or 2–3 below, then a whole-note do.'),
        ],
      },
      {
        id: 'b35x-e4', type: 'discover', practice: true, ref: 'omt-species4',
        prompt: t('第四类对位的结尾，定旋律 re–do，对位在上方倒数第二小节写 do–ti。这里形成哪种延留？', '第四類の終わり、定旋律 re–do、上の対旋律は最後から 2 小節目で do–ti。どの掛留？', 'Ending fourth species: cantus re–do, counterpoint above with do–ti in the penultimate bar. Which suspension?'),
        options: ['7–6', '9–8', '4–3', '2–3'],
        answer: 0,
        insight: { title: t('do 对 re 是七度', 're に対する do は 7 度', 'do over re is a seventh'), text: t('do 在 re 上方是七度，往下解决到 ti 成六度：7–6。在下方则是 2–3。', 're の上の do は 7 度、ti へ下がって 6 度：7–6。下なら 2–3。', 'do above re is a seventh, resolving down to ti, a sixth: 7–6. Below the cantus it is 2–3.') },
      },
      {
        id: 'b35x-e5', type: 'page', ref: ['omt2e-fifth', 'omt2e-intro'],
        title: t('进阶 3 · 第五类：把前四类混在一起', '発展 3・第五類：前の 4 類を混ぜる', 'Advanced 3 · Fifth species: mixing the first four'),
        text: [
          t('第五类（华彩对位）把前四类的技巧组合起来：对位里可以有全音符（一类）、二分音符（二类）、四分音符（三类）和挂留（四类），顺序几乎任意——它开始像真正的音乐了，难处是不仅要平衡协和的种类，也要平衡各类的节奏。开头照例用完全协和，结尾用 clausula vera（真终止）。', '第五類（華やかな対位法）は前の 4 類の技法を組み合わせる：対旋律に全音符（第一類）・2 分音符（第二類）・4 分音符（第三類）・掛留（第四類）が、ほぼどんな順序でも現れる——本物の音楽らしくなり、難しさは協和の種類だけでなく各類のリズムのバランスをとること。冒頭はいつもどおり完全協和、終わりは clausula vera（真の終止）。', 'Fifth (florid) species combines the earlier techniques: whole notes (1st), halves (2nd), quarters (3rd) and suspensions (4th) in almost any order — it starts to resemble real music, and the challenge is balancing types of species as well as types of consonance. Begin with a perfect consonance and end with a clausula vera.'),
          t('新加入的只有两样：挂留可以加装饰（把小节第一个音延长成二分音符，就回到朴素的四类挂留）；第一次出现八分音符——总是成对，在弱拍上（占小节的第二或第四个四分音符），例如"带回音的先现"装饰挂留，或一对经过八分音符。Fux 在第四类和第五类"之间"介绍了装饰挂留和八分音符。', '新しく加わるのは 2 つだけ：掛留を装飾できる（小節の最初の音を 2 分音符に伸ばせば素朴な第四類の掛留に戻る）。そして初めて 8 分音符が出る——必ず対で、弱拍（小節の 2 つ目か 4 つ目の 4 分音符）に置く。たとえば「回音付きの先取」で装飾した掛留や、1 対の経過的な 8 分音符。フックスは装飾掛留と 8 分音符を第四類と第五類の「間」で導入している。', 'Only two things are new: suspensions may be embellished (sustain the bar’s first note for a half note and you are back to a plain fourth-species suspension), and eighth notes appear for the first time — always in pairs, on weak beats (the second or fourth quarter of the bar), as in the “anticipation with turn” embellishment or a pair of passing eighths. Fux introduces embellished suspensions and eighth notes “in between” fourth and fifth species.'),
        ],
      },
      {
        id: 'b35x-e6', type: 'discover', practice: true, ref: 'omt2e-fifth',
        prompt: t('第五类对位里，八分音符可以怎样出现？', '第五類で 8 分音符はどう現れてよい？', 'How may eighth notes appear in fifth species?'),
        options: [t('成对，在弱拍上', '対で、弱拍に', 'In pairs, on weak beats'), t('单个，在强拍上', '1 つずつ、強拍に', 'Singly, on downbeats'), t('任何地方', 'どこでも', 'Anywhere')],
        answer: 0,
        insight: { title: t('只是装饰', '装飾にすぎない', 'Only decoration'), text: t('八分音符总是成对，落在小节的第二或第四个四分音符上。', '8 分音符は必ず対で、小節の 2 つ目か 4 つ目の 4 分音符に。', 'Eighths always come in pairs, on the second or fourth quarter of the bar.') },
      },
      {
        id: 'b35x-e7', type: 'page', ref: 'wiki-canon',
        title: t('进阶 4 · 卡农的术语与种类', '発展 4・カノンの用語と種類', 'Advanced 4 · Canon terms and kinds'),
        text: [
          t('先唱的声部叫导句（leader，拉丁文 dux），模仿的声部叫答句（follower，comes）。几个声部就叫"几声部卡农"（canon in two、canon in three）。中世纪、文艺复兴到巴洛克（直到 18 世纪初），所有模仿性的对位都叫 fugue，今天所说的严格模仿当时叫 fuga ligata——"被束缚的赋格"。带一个或几个不模仿的独立声部的卡农，叫伴奏卡农（accompanied canon）。', '先に歌う声部を先行声部（leader、ラテン語 dux）、模倣する声部を後続声部（follower、comes）という。声部数で「2 声のカノン」「3 声のカノン」と呼ぶ。中世・ルネサンス・バロック（18 世紀初めまで）では模倣的な対位法はすべて fugue と呼ばれ、今日の厳格な模倣は fuga ligata——「縛られたフーガ」と呼ばれた。模倣しない独立声部を伴うカノンを伴奏付きカノン（accompanied canon）という。', 'The first voice is the leader (Latin dux), the imitating voice the follower (comes); a canon of x voices is a “canon in x”. Through the early 18th century all imitative counterpoint was called fugue, and strict imitation — today’s canon — was fuga ligata, “fettered fugue”. A canon with one or more independent non-imitating parts is an accompanied canon.'),
          t('最常见的是无穷卡农（canon perpetuus），也就是轮唱（round，中世纪拉丁文 rota）：每个声部唱到结尾都可以从头再来，例如《Three Blind Mice》；《Sumer is icumen in》就是一首标明为 rota 的作品。双重卡农是同时进行两个不同的卡农——巴赫康塔塔 BWV 9 的二重唱咏叹调，长笛与双簧管一组、女高音与女中音一组。巴赫的《哥德堡变奏曲》有九首卡农，模仿音程从同度一路扩大到九度。', '最もよく知られるのは無限カノン（canon perpetuus）、つまり輪唱（round、中世ラテン語で rota）：各声部は終わりまで来たらまた最初から歌える。《Three Blind Mice》がその例で、《Sumer is icumen in》は rota と記された曲の一例。二重カノンは 2 つの異なるカノンを同時に進める——バッハのカンタータ BWV 9 の二重唱アリアは、フルートとオーボエ、ソプラノとアルトがそれぞれ組になる。バッハの《ゴルトベルク変奏曲》には 9 曲のカノンがあり、模倣の音程は同度から 9 度まで広がっていく。', 'The most familiar is the perpetual canon (canon perpetuus), or round (medieval Latin rota): each voice can start again on reaching the end, as in “Three Blind Mice”; “Sumer is icumen in” is a piece designated rota. A double canon runs two different canons at once — the duet aria in Bach’s Cantata BWV 9 pairs flute with oboe and soprano with alto. Bach’s Goldberg Variations contain nine canons at intervals growing from the unison to the ninth.'),
        ],
      },
      {
        id: 'b35x-e8', type: 'discover', practice: true, ref: 'wiki-canon',
        prompt: t('巴洛克以前，今天所说的"卡农"（严格模仿）叫什么？', 'バロック以前、今日の「カノン」（厳格な模倣）は何と呼ばれた？', 'Before the 18th century, what was strict imitation — today’s canon — called?'),
        options: [t('fuga ligata（被束缚的赋格）', 'fuga ligata（縛られたフーガ）', 'fuga ligata (“fettered fugue”)'), t('rota', 'rota', 'rota'), t('comes', 'comes', 'comes')],
        answer: 0,
        insight: { title: t('那时都叫 fugue', '当時はすべて fugue', 'Then it was all “fugue”'), text: t('模仿性的对位统称 fugue，严格的那种加上 ligata。rota 是轮唱，comes 是答句。', '模倣的な対位法はすべて fugue、厳格なものに ligata を付けた。rota は輪唱、comes は後続声部。', 'All imitative counterpoint was fugue; the strict kind was ligata. Rota is a round; comes is the follower.') },
      },
      {
        id: 'b35x-e9', type: 'page', ref: 'wiki-canon',
        title: t('进阶 5 · 比例卡农、谜语卡农与相位', '発展 5・比例カノン、謎カノン、フェイジング', 'Advanced 5 · Mensuration canons, puzzle canons, phasing'),
        text: [
          t('定量卡农（mensuration canon，也叫比例卡农）的答句按某个节奏比例模仿：时值加倍是扩大卡农，减半是缩小卡农。15 世纪末到 16 世纪初写了很多这样的卡农；奥克冈的《Missa prolationum》每一段都是定量卡农，速度和进入音程各不相同。20 世纪，Conlon Nancarrow 为自动钢琴写了复杂的速度卡农。若斯坎的经文歌《De profundis》开头六小节，两个上方声部是四度卡农。', '比例カノン（mensuration canon）の後続声部はあるリズムの比で模倣する：音価を倍にすれば拡大カノン、半分にすれば縮小カノン。15 世紀末〜16 世紀初めに多く書かれ、オケゲムの《Missa prolationum》は各部分がすべて比例カノンで、速さも入りの音程も違う。20 世紀にはコンロン・ナンカロウが自動ピアノのために複雑なテンポ・カノンを書いた。ジョスカンのモテット《De profundis》の冒頭 6 小節では、上 2 声部が 4 度のカノン。', 'In a mensuration (proportional) canon the follower imitates at a rhythmic proportion: doubled values make an augmentation canon, halved a diminution canon. Many were written in the late 15th and early 16th centuries; every section of Ockeghem’s Missa prolationum is a mensuration canon at different speeds and entry intervals. In the 20th century Conlon Nancarrow wrote complex tempo canons for player piano. The first six bars of Josquin’s motet De profundis set the two upper voices in canon at the fourth.'),
          t('谜语卡农（puzzle / riddle / enigma canon）只写出一个声部，其余声部的规则和进入时间要靠猜。史蒂夫·赖希早期的《Piano Phase》（1967）和《Clapping Music》（1972）用他所谓的"相位"（phasing）：一种声部距离不断调整的卡农，旋律与和声不重要，只靠模仿的时间间隔。', '謎カノン（puzzle / riddle / enigma canon）は 1 声部だけが書かれ、ほかの声部の規則と入る時間は推測しなければならない。スティーヴ・ライヒの初期の《Piano Phase》（1967）と《Clapping Music》（1972）は、彼が「フェイジング」と呼ぶ手法を使う：声部間の距離を絶えず変えるカノンで、旋律や和声は重要でなく、模倣の時間間隔だけに頼る。', 'A puzzle (riddle, enigma) canon notates only one voice; the rules for the others and their entries must be guessed. Steve Reich’s early Piano Phase (1967) and Clapping Music (1972) use what he calls phasing: a continually adjusting canon with variable distance between the voices, relying not on melody or harmony but on the time intervals of imitation.'),
        ],
      },
      {
        id: 'b35x-e10', type: 'discover', practice: true, ref: 'wiki-canon',
        prompt: t('奥克冈的《Missa prolationum》每一段都是哪种卡农？', 'オケゲムの《Missa prolationum》の各部分はどのカノン？', 'Every section of Ockeghem’s Missa prolationum is which kind of canon?'),
        options: [t('定量（比例）卡农', '比例カノン', 'Mensuration (proportional) canon'), t('蟹行卡农', '蟹行カノン', 'Crab canon'), t('轮唱', '輪唱', 'A round')],
        answer: 0,
        insight: { title: t('不同速度一起走', '違う速さで一緒に進む', 'Different speeds at once'), text: t('各声部按不同的时值比例唱同一条旋律，进入音程也不同。', '各声部が違う音価の比で同じ旋律を歌い、入りの音程も違う。', 'The voices sing one melody at different rhythmic proportions and entry intervals.') },
      },
    ],
    experiment: [
      { id: 'b35x-x1', type: 'experiment', toy: 'canon', ref: ['wiki-canon', 'omt-intervals', 'omt-species1'],
        prompt: t('还是《Frère Jacques》。先选"高三度、晚 8 拍、自由（按音阶）"：没有拍上的不协和，却有平行；换成"严格（按半音）"，调外音带来了不协和。再试"倒影 + 高五度、晚 8 拍"：能不能一个问题都没有？', 'また《Frère Jacques》。まず「3 度上・8 拍遅れ・自由（音階どおり）」：拍上の不協和はないが平行がある。「厳格（半音どおり）」に替えると調外の音が不協和を生む。次に「反行 + 5 度上・8 拍遅れ」：問題をゼロにできる？', 'Frère Jacques again. First pick “third above, 8 beats, free (diatonic)”: no on-beat dissonance, but parallels; switch to “strict (exact)” and out-of-key notes bring dissonance. Then try “inversion + fifth above, 8 beats”: can you get zero problems?'),
        params: { leader: FRERE, steps: [2, 4, -4, 0], delays: [8, 4], bpm: 132 },
        breakthrough: { id: 'b35x-mirror', text: t('你听到了：同一条导句，换成严格、自由或倒影，碰撞的地方完全不同。', '同じ先行声部でも、厳格・自由・反行でぶつかる所がまったく違うと聞き取れた。', 'You heard it: one leader, and strict, free or inverted imitation collide in completely different places.') } },
    ],
    challenge: [
      {
        id: 'b35x-c1', type: 'choice', error: 'cp-frame', skills: ['apply'], ref: 'omt-species3',
        variants: [
          { prompt: t('第三类：下一小节强拍是五度，这一小节哪几拍不能是五度？', '第三類：次の強拍が 5 度なら、この小節のどの拍を 5 度にしない？', 'Third species: if the next downbeat is a fifth, which beats of this bar may not be fifths?'), options: [t('第 3、4 拍', '第 3・4 拍', 'Beats 3 and 4'), t('只有第 4 拍', '第 4 拍だけ', 'Only beat 4'), t('第 1–4 拍', '第 1〜4 拍', 'Beats 1–4')] },
          { prompt: t('第三类：连续几个小节以同一个完全音程开头就不行？', '第三類：何小節続けて同じ完全音程で始めるとだめ？', 'Third species: how many consecutive bars may not begin with the same perfect interval?'), options: [t('三个（两个可以）', '3 小節（2 つは可）', 'Three (two are fine)'), t('两个', '2 小節', 'Two'), t('四个', '4 小節', 'Four')] },
          { prompt: t('第三类里两个连续的不协和经过音（P4–d5）什么时候可以？', '第三類で不協和な経過音 2 つの連続（P4–d5）がよいのは？', 'When are two dissonant passing tones in a row (P4–d5) allowed in third species?'), options: [t('不落在强拍，并朝同一方向级进', '強拍に落ちず、同じ向きに順次', 'Off the downbeat and stepwise in one direction'), t('永远不行', 'いつでもだめ', 'Never'), t('落在强拍时', '強拍のとき', 'On the downbeat')] },
        ],
        answer: 0,
        explain: t('强拍五度前避开第 3、4 拍的五度；连续三个同样的完全音程不行；两个经过音在弱拍、同方向级进可以。', '強拍の 5 度の前は第 3・4 拍の 5 度を避ける。同じ完全音程 3 つ連続は不可。経過音 2 つは弱拍で同方向順次なら可。', 'Before a downbeat fifth avoid fifths on beats 3–4; three bars on the same perfect interval are out; two passing tones are fine off the beat, stepwise in one direction.'),
      },
      {
        id: 'b35x-c2', type: 'choice', error: 'suspension', skills: ['apply'], ref: 'omt-species4',
        variants: [
          { prompt: t('定旋律下方的第四类对位，可用的不协和延留是？', '定旋律の下の第四類で使える不協和の掛留は？', 'Below the cantus, the usable dissonant suspensions are…'), options: ['2–3, 5–6, 4–5', '7–6, 4–3, 9–8', '6–5, 3–2, 8–7'] },
          { prompt: t('第四类里"后拍五八度"指什么？', '第四類の「後拍の 5・8 度」とは？', 'In fourth species, what are “after-beat” fifths or octaves?'), options: [t('连续两个弱拍构成五度或八度', '弱拍が 2 回続けて 5 度や 8 度', 'Fifths or octaves on consecutive weak beats'), t('强拍上的五度', '強拍の 5 度', 'A fifth on a downbeat'), t('最后的八度', '最後の 8 度', 'The final octave')] },
          { prompt: t('第四类里"打破类别"时应怎样写？', '第四類で「類を破る」ときは？', 'When “breaking species” in fourth species, you should…'), options: [t('按二类写一两个小节，尽快回到四类', '第二類で 1〜2 小節書き、すぐ第四類に戻る', 'Write a bar or two of second species and resume as soon as possible'), t('改成一类写到结尾', '最後まで第一類にする', 'Switch to first species to the end'), t('随便写', '自由に書く', 'Write anything')] },
        ],
        answer: 0,
        explain: t('下方可用 2–3、5–6、4–5；后拍五八度是连续弱拍上的五八度；打破类别按二类，越短越好。', '下は 2–3・5–6・4–5。後拍の 5・8 度は連続する弱拍の 5・8 度。類を破るときは第二類で、短く。', 'Below: 2–3, 5–6, 4–5; after-beat fifths are on consecutive weak beats; break species using second species, as briefly as possible.'),
      },
      {
        id: 'b35x-c3', type: 'choice', error: 'cp-rhythm', skills: ['identify'], ref: ['omt2e-fifth', 'omt-species3'],
        variants: [
          { prompt: t('第五类对位的结尾用什么？', '第五類の終わりは？', 'Fifth species ends with…'), options: [t('clausula vera（真终止）', 'clausula vera（真の終止）', 'a clausula vera'), t('半终止', '半終止', 'a half cadence'), t('阻碍进行', '偽終止', 'a deceptive cadence')] },
          { prompt: t('把第五类里装饰过的挂留"还原"，该怎么做？', '第五類の装飾された掛留を「元に戻す」には？', 'How do you “undo” an embellished fifth-species suspension?'), options: [t('把小节第一个音延长成二分音符', '小節の最初の音を 2 分音符に伸ばす', 'Sustain the bar’s first note for a half note'), t('删掉连音线', 'タイを消す', 'Remove the tie'), t('改成八分音符', '8 分音符にする', 'Make it eighth notes')] },
          { prompt: t('第三类里使用双辅助音时，第 3→4 拍的方向应该？', '第三類で二重刺繍音を使うとき、第 3→4 拍の向きは？', 'Using a double neighbour in third species, the beat 3→4 direction should…'), options: [t('和第 4 拍到下一强拍的方向相同', '第 4 拍から次の強拍への向きと同じ', 'match the direction from beat 4 to the next downbeat'), t('和它相反', 'その逆', 'oppose it'), t('无所谓', 'どちらでも', 'not matter')] },
        ],
        answer: 0,
        explain: t('第五类以 clausula vera 结尾；装饰挂留延长第一个音就回到四类；双辅助音后的方向要一致并级进过小节线。', '第五類は clausula vera で終わる。装飾掛留は最初の音を伸ばせば第四類に戻る。二重刺繍音の後は向きをそろえ、小節線を順次で越える。', 'Fifth species ends with a clausula vera; sustaining the first note turns an embellished suspension back into fourth species; after a double neighbour keep the direction and step across the barline.'),
      },
      {
        id: 'b35x-c4', type: 'choice', error: 'canon-type', skills: ['identify'], ref: 'wiki-canon',
        variants: [
          { prompt: t('只写出一个声部、其余声部和进入时间要靠猜的卡农叫？', '1 声部だけ書かれ、ほかの声部と入りを推測するカノンは？', 'A canon notating one voice, with the others and their entries to be guessed, is a…'), options: [t('谜语卡农', '謎カノン', 'puzzle canon'), t('伴奏卡农', '伴奏付きカノン', 'accompanied canon'), t('双重卡农', '二重カノン', 'double canon')] },
          { prompt: t('同时进行两个不同卡农的作品叫？', '2 つの異なるカノンを同時に進める曲は？', 'A piece unfolding two different canons at once is a…'), options: [t('双重卡农', '二重カノン', 'double canon'), t('倒影卡农', '反行カノン', 'canon by inversion'), t('轮唱', '輪唱', 'round')] },
          { prompt: t('导句和答句的拉丁文是？', '先行声部と後続声部のラテン語は？', 'The Latin terms for leader and follower are…'), options: ['dux / comes', 'rota / fuga', 'recte / retro'] },
        ],
        answer: 0,
        explain: t('谜语卡农只写一个声部；双重卡农同时有两个卡农；导句 dux、答句 comes。', '謎カノンは 1 声部だけ。二重カノンは 2 つのカノンが同時。先行 dux、後続 comes。', 'A puzzle canon notates one voice; a double canon runs two canons; leader dux, follower comes.'),
      },
      {
        id: 'b35x-c5', type: 'choice', error: 'canon-type', skills: ['identify'], ref: 'wiki-canon',
        variants: [
          { prompt: t('巴赫《哥德堡变奏曲》里的九首卡农，模仿音程是？', 'バッハ《ゴルトベルク変奏曲》の 9 曲のカノンの模倣音程は？', 'The nine canons of Bach’s Goldberg Variations imitate at…'), options: [t('从同度逐步扩大到九度', '同度から 9 度まで順に広がる', 'intervals growing from the unison to the ninth'), t('全是八度', 'すべて 8 度', 'the octave throughout'), t('全是五度', 'すべて 5 度', 'the fifth throughout')] },
          { prompt: t('若斯坎《De profundis》开头，两个上方声部是什么卡农？', 'ジョスカン《De profundis》冒頭の上 2 声部は何のカノン？', 'At the start of Josquin’s De profundis, the two upper voices form a canon at…'), options: [t('四度卡农', '4 度のカノン', 'the fourth'), t('同度卡农', '同度のカノン', 'the unison'), t('蟹行卡农', '蟹行カノン', 'a crab canon')] },
          { prompt: t('史蒂夫·赖希的"相位"（phasing）是一种怎样的卡农？', 'スティーヴ・ライヒの「フェイジング」はどんなカノン？', 'What kind of canon is Steve Reich’s phasing?'), options: [t('声部距离不断调整的卡农', '声部間の距離を絶えず変えるカノン', 'One whose distance between voices keeps adjusting'), t('倒影卡农', '反行カノン', 'An inversion canon'), t('谜语卡农', '謎カノン', 'A puzzle canon')] },
        ],
        answer: 0,
        explain: t('《哥德堡》的卡农从同度到九度；《De profundis》开头是四度卡农；相位是距离不断变化的卡农。', '《ゴルトベルク》のカノンは同度から 9 度。《De profundis》冒頭は 4 度のカノン。フェイジングは距離が変わり続けるカノン。', 'The Goldberg canons run from unison to ninth; De profundis opens with a canon at the fourth; phasing is a canon with continually changing distance.'),
      },
      G('b35x-g1', 'consonance', 1, ['identify']),
    ],
  },
  pool: [G('b35x-p1', 'consonance', 2, ['identify']), G('b35x-p2', 'nctType', 2, ['identify'])],
};

export const EXT_MELODY = { 'B3-1': EXT_B3_1, 'B3-2': EXT_B3_2, 'B3-3': EXT_B3_3, 'B3-4': EXT_B3_4, 'B3-5': EXT_B3_5 };

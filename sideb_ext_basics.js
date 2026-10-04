// Side-B 第 1 章的扩展关：每个普通关通过后解锁。节奏和普通关一样（发现 → 讲解 → 实验 → 挑战），
// 把对应 A 面关卡的 4 个进阶关 + 综合测验重新、更细地讲一遍（讲解更长；挑战相当于综合测验）。节点格式见 sideb_ui.js / SIDE_B_DESIGN.md。
// 出处（每条事实都在原文里核对过）：
//   B1-1x：黑键的命名（白键上方半音 = 升、下方半音 = 降）、E♯ = F、F♭ = E、B♯ = C、C♭ = B、D𝄪 = E、E𝄪 = F♯、A𝄫 = G、C𝄫 = B♭；
//          从 E、B 往上找全音数两个键，从黑键找全音也数两个键：ref:omt2e-half-whole
//          黑键两个、三个一组交替，每个八度重复；C 在两个黑键左边、F 在三个黑键左边；大谱表（高音谱表在上、低音谱表在下，左边用直线和花括号连起来，
//          通常左手弹低音谱表）；中央 C 在两个谱表之间的那条加线上，两个谱表里写的是同一个音；数度数时第一个音算"一"：ref:omt2e-keyboard
//          高音谱号绕着下数第二线（G 线）、低音谱号的点从上数第二线（F 线）开始、中音谱号以中线为 C、次中音谱号以上数第二线为 C；
//          各谱号的线与间（EGBDF / FACE、GBDFA / ACEG、FACEG / GBDF、DFACE / EGBD）；加线像谱表继续往外延伸：ref:omt2e-clefs
//          画高音谱号 3 步、低音谱号 3 步、中音 / 次中音谱号 4 步（也可以用字母 K 速写）；加线不要多画：ref:omt2e-notation
//          ASPN 的数字与乐器无关；钢琴有完整的第 1~7 个八度，外加第 0、8 个八度的一部分：ref:omt2e-aspn
//          升降号不改变度数（generic size）：ref:omt2e-intervals
//   B1-2x：每种音符都有休止符；全休止符挂在线下、二分休止符坐在线上；给休止符加一条旗时值减半；加符干 / 涂黑符头 / 加旗都让时值减半；
//          附点加一半，后面的点各加前一个点的一半（双附点 = 原时值的 1¾）；连音线只连同一个音高、被连过去的音不再奏、不用在休止符上；
//          圆滑线连接不同的音（和连音线不同）；二全音符（breve）= 两个全音符：ref:omt2e-rhythm
//          切分：重音落在拍外，可以由连音线、附点、休止符或力度造成；三连音读 1-la-li、二连音读 1-and：ref:omt2e-rhythm-more
//          单拍子的分拍读 "and"（写成 +）、十六分读 "e" 和 "a"；弱起（anacrusis）算作前面一个想象小节的最后几拍，最后一小节通常相应缩短；
//          二、三、四拍子的指挥图式；符杠按拍连：ref:omt2e-simple-meter
//          复拍子的分拍读 "la"、"li"，再细分读 "ta"；复拍子的指挥图式和单拍子相同：ref:omt2e-compound-meter
//          不对称拍子（小节分成长短不等的组；也叫 mixed / complex / non-isochronous meter）、变拍子、无拍子音乐、
//          感知拍子与记谱拍子；Brubeck《Unsquare Dance》用不对称拍子打破方块舞的四拍期待：ref:omt2e-20c-rhythm
//          aksak（土耳其语"跛行"）、2+2+3、保加利亚民间舞与印度古典音乐、五拍按重音分成 2+3 或 3+2、马其顿的 3+2+2+3+2：ref:wiki-metre
//          交叉节奏（cross-rhythm）、3:2 = hemiola、4:3；贝多芬 Op. 18 No. 6 谐谑曲写在 3/4、听起来像 6/8：ref:wiki-polyrhythm
//          节拍调制：旧的某个时值等于新的某个时值（像一座桥，前后听起来一样、作用不同）；这个名称由 Richard Franko Goldman 在评论
//          Elliott Carter 的大提琴奏鸣曲时提出，Carter 本人更喜欢叫 tempo modulation：ref:wiki-metric-modulation
//   B1-3x：旋律音程（先后）与和声音程（同时）；度数 = 线和间的数目，同度不叫"一度"、八个线间叫"八度"；纯音程（同度、四、五、八度）与大小音程；
//          大调音阶法（把下面的音当大调主音，上面的音在不在这个大调里）；E♭–C♭ 的例子；增 / 减比纯或大 / 小大或小半音，
//          减五度也叫三全音；倍增 / 倍减、三倍增 / 减；单音程与复音程（加 7；八、十一、十二度是纯，九、十、十三度是大小；性质不变）；
//          转位：度数相加为 9，纯 ↔ 纯、大 ↔ 小、增 ↔ 减；下面的音是难调或"假想调"的主音时，转位来算更方便；
//          协和 = 较稳定、不需要解决，不协和 = 较不稳定、需要解决；不同时代、地区的理论家对音程和性质的定义各不相同：ref:omt2e-intervals
//          半音数记法 i4 = 4 个半音；先只看字母数度数（两头都算）；i0~i12 与音程名的对照（i6 = A4 / d5）；i4 + i8 = i12（转位互补）：ref:omt-intervals
//          对位里的完全协和（纯一、五、八度）、不完全协和（大小三、六度）、不协和（所有二、七度和增减音程）；
//          纯四度和最低声部构成时算不协和，在两个上方声部之间算协和：ref:omt2e-intro
//          支线 dictation（挂在 intervals 下）：听写 = 把没见过的节奏、旋律、和弦进行写成五线谱；节奏听写用点格（dot grid）、斜线记号（斜线 = 起音、横线 = 延长、圆圈 = 休止），
//          边听边打拍或指挥；旋律听写先写节奏，再用轮廓线（上 / 下 / 同音，跳进可以打星号）和唱名；Karpinski《Manual for Ear Training and Sight Singing》（2007）
//          的 protonotation：长竖线是强拍，横线表示时值，用首调唱名，箭头标跳进方向：ref:omt-pb-dictation
//   B1-4x：首调唱名（do 随音阶移动）与固定唱名（do 永远是 C）；supertonic 是唯一的 super-；升号顺序 F C G D A E B、降号相反（回文）；
//          升号呈"之"字形，在高音、低音、中音谱号里写到 D♯ 后断开再继续，次中音谱号不断开但 F♯、G♯ 写在低八度；降号总是完整的"之"字形；
//          C 大调和 F 大调要直接记；C♭ 大调七个降号、C♯ 大调七个升号；需要重升 / 重降的调号是"假想调"（F♭ 大调要 B𝄫）；
//          五度圈相邻两调相差五度，底部三个调号是等音调（B 大调五个升号 = C♭ 大调七个降号）：ref:omt2e-major-scales
//          小调第三音比同名大调低半音；三种小调像冰淇淋的口味——作品只说"小调"，调号按自然小调；三种小调主要对演奏者练习有用；
//          me、le、te 读作 may、lay、tay；自然小调结尾缺少大调那种 ti–do 半音带来的终止感，和声小调有 ti；旋律小调上行有 ti、下行同自然小调；
//          上主音在主音上方全音、下主音在主音下方全音；与同名大调相比降低的音：自然小调 3 个、和声小调 2 个、旋律小调上行 1 个；
//          关系调主音差三个半音；升号调不能和降号调成为关系调（D♭ 大调的关系小调是 B♭ 小调，不是七个升号的 A♯ 小调）；
//          小调也可能是假想调；看第一个和最后一个音帮助判断大调还是关系小调（Reichardt《Durch die bunten Rosenhecken》，四个降号：A♭ 大调或 F 小调）：ref:omt2e-minor
//          小调的罗马数字 i、ii°、III、iv、v / V、VI、VII / vii°（V 与 vii° 用升高的导音）；七和弦 v⁷ / V⁷、VII⁷ / vii°⁷ 同理：ref:omt2e-roman-numerals
//   B1-5x：明暗连续体（亮的含 mi：Lydian、Ionian、Mixolydian；暗的含 me：Dorian、Aeolian、Phrygian、Locrian）；各调式与大调 / 自然小调的差别
//          （Lydian ↑4、Mixolydian ↓7、Dorian = 小调 ↑6 la、Phrygian ↓2 ra、Locrian ↓2 ↓5 se）；任何音都可以当起点（D♭ Mixolydian 等）；
//          半音"音阶"叫半音音集，常常上行写升号、下行写降号：ref:omt2e-modes
//          和弦—音阶理论：十三和弦的音可以重排成七声音阶（Dm13 = D Dorian）；源自 George Russell 的 LCC（1953），由 Aebersold、Baker、Coker 推广：ref:omt2e-chord-scale
//          流行音乐的调式进行（多来自 Biamonte 与 Tagg）：特征音（color note，Persichetti 叫 characteristic notes）；Mixolydian 的 ♭VII 有属功能、
//          双重变格 ♭VII–IV–I、subtonic shuttle（Kinks《Tired of Waiting for You》，Gotye《Somebody That I Used to Know》的小调版）；
//          aeolian shuttle i–♭VII–♭VI–♭VII 难成终止；aeolian cadence ♭VI–♭VII–i，常用皮卡第三度，被叫作 Mario cadence，《指环王》护戒同盟主题；
//          lament i–♭VII–♭VI–v；Dorian 的 la 改变 IV 和 ii，和 funk、disco 关系密切（CHIC《Dance, Dance, Dance》、Daft Punk《Get Lucky》是 B Dorian），
//          有人把 dorian shuttle 听成 ii–V；Lydian 的 II♯：接 V 时应看作 V/V；流行歌很少整首 Lydian，II♯ 常被 IV 或 ii 抵消（Fleetwood Mac《Sara》）；
//          Taylor Swift《Starlight》的 A–B 是 E 大调 IV–V 不是 lydian shuttle；lydian cadence II♯–IV–I（《Forget You》）；
//          三步听辨：主和弦三音 → 第七级 ti / te → 其他升高的特征音（大调里的 fi、小调里的 la）：ref:omt-pb-modal-schemas
//   B1-6x：宫商角徵羽相当于 do re mi sol la，五音间的音程关系固定；任何一个音都可以当主音（宫调式、商调式……）；
//          七声 = 五声加变宫与清角，二者相距三全音，一般不当主音；三分损益：《史记·律书》九九八十一为宫，三分去一五十四为徵，
//          三分益一七十二为商，三分去一四十八为羽，三分益一六十四为角；与五度相生的结果相同，五音之间是简单整数比：ref:zhwiki-pentatonic
//          七声调式 = 在五声的小三度间加两个偏音，分清乐、燕乐、雅乐；仍按五声调式命名；很少用偏音当主音：ref:zhwiki-heptatonic
//          贺绿汀：《史记》荆轲易水"为变徵之声，士皆垂泪涕泣……复为羽声慷慨"（变徵 ≈ C 调的升 F，羽 ≈ A）；纪元前 770 年已有七声的记载；
//          隋唐龟兹乐"八十四调"是 12 × 7 的理论推算；姜白石十七首歌曲用的是七声调式；陕北民歌（徵调式缺角音、有变宫升 F 与清角 C）、
//          山西七声（结构同 Mixolydian）、湖南花鼓调等都不能用五声的框框去套：ref:helvting-scales
//          五声音集对应钢琴黑键，也可以叠五个纯五度得到，台阶 2–2–3–2–3；它去掉了自然音阶里产生半音的两个音（fa、ti），
//          没有半音，所以更容易旋转、主音不那么突出；五种旋转各自成调：ref:omt2e-collections
//          五声是蓝调音阶和自然音阶的子集；五种旋转互不相同；流行音乐最常用大五声与小五声；摇滚把五声当和弦根音，和弦性质自由（大三、小三、强力和弦……），
//          于是出现"音级冲突 / 交错关系"（mi 与 me、la 与 le）；Biamonte 等指出平行横按和弦在吉他上很顺手；Stevie Wonder《Higher Ground》低音很清楚；
//          D–A、C–G 两对五度（TLC《Waterfalls》）也可读作 Mixolydian 的 I–V–♭VII–IV；什么是"典型的五声进行"是开放问题；
//          《Hey Joe》（Jimi Hendrix 1966，E 为主音）五个和弦以下行四度相连，正好用到五声的全部五个音，Biamonte 归为第 4 种旋转：ref:omt2e-pentatonic-harmony
//   B1-7x：织体 = 各声部的密度与相互作用；单声部 = 一条没有伴奏的旋律，所有乐器齐奏（同度）也是，是最简单、最"暴露"的织体（巴赫无伴奏大提琴组曲第 1 号前奏曲、
//          Pete Seeger《Where Have All the Flowers Gone?》）；支声 = 同一旋律的几个变体同时进行，变化可以是小装饰音也可以是较长的经过句，只要旋律材料基本不变
//          （Göksel Baktagir《Ana Hasreti》、the Chieftains《The Wind That Shakes the Barley》）；主调分"同节奏"（homorhythm，众赞歌式柱式和弦：Tcherepnin 圆号四重奏
//          众赞歌、the Longest Johns《Wild Mountain Thyme》）与"旋律加伴奏"（最常见，伴奏节奏常与旋律不同：Hindemith 长笛奏鸣曲、Ella Fitzgerald 唱《Misty》）；
//          复调 = 各声部有独立的旋律与节奏，合起来形成和声（Shostakovich D 大调赋格 No. 5、《Rent》"I'll Cover You – Reprise"）；多数作品织体会变化：ref:omt2e-texture
//          两声部进行的四种：反向、同向、平行、斜向；对位要平衡的几种特质：流畅独立的旋律线、音的融合（tonal fusion）、变化、朝目标运动——它们常互相冲突，
//          要在更长的段落里取得平衡；David Huron（2006）：ref:omt2e-intro
const t = (zh, ja, en) => ({ zh, ja, en });
const G = (id, gen, count, skills, params) => ({ id, type: 'gen', gen, count, skills, ...(params ? { params } : {}) });
const nn = (p) => ({ p, d: 'w', lit: true });

// ===================== B1-1x 音高、拼写与记谱 · 扩展关 =====================
// 对应 A 面：keys 的进阶关（一个黑键两个名字 / 在键盘上找音 / 重升与重降 / 半音全音综合）与 staff 的进阶关（高音谱号 / 低音谱号 / 中音谱号 / 八度编号与大谱表）
const EXT_B1_1 = {
  minutes: 19,
  insight: t('谱号只是告诉你"哪条线是哪个音"；同一个音高，在不同谱号、不同拼法里，长相可以完全不同。', '音部記号は「どの線が何の音か」を決めるだけ。同じ高さでも、記号や綴りが違えば見た目はまるで違う。', 'A clef only tells you which line is which note; the same pitch can look completely different in another clef or spelling.'),
  sections: {
    discover: [
      {
        id: 'b11x-d1', type: 'discover', ref: ['omt2e-keyboard', 'omt2e-aspn'],
        prompt: t('大谱表上有两个音：一个写在高音谱表下面的第一条加线上，一个写在低音谱表上面的第一条加线上。听一听，它们是同一个音吗？', '大譜表に 2 つの音：ト音譜表の下の第 1 加線と、ヘ音譜表の上の第 1 加線。聴いてみよう。同じ音？', 'Two notes on the grand staff: one on the first ledger line below the treble staff, one on the first ledger line above the bass staff. Listen — are they the same pitch?'),
        play: [{ label: t('高音谱表里的那个', 'ト音譜表のほう', 'The treble one'), audio: { notes: [60], mode: 'melody' } }, { label: t('低音谱表里的那个', 'ヘ音譜表のほう', 'The bass one'), audio: { notes: [60], mode: 'melody' } }],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes: [{ p: 'C4', d: 'w', s: 0, col: 0, lit: true }, { p: 'C4', d: 'w', s: 1, col: 1, lit: true }], cols: 2 },
        options: [t('是，都是中央 C（C4）', 'はい、どちらも中央の C（C4）', 'Yes — both are middle C (C4)'), t('不是，差一个八度', 'いいえ、1 オクターヴ違う', 'No, an octave apart'), t('不是，差一个全音', 'いいえ、全音違う', 'No, a whole step apart')],
        answer: 0,
        insight: {
          title: t('中央 C 夹在两个谱表中间', '中央の C は 2 つの譜表のあいだ', 'Middle C sits between the two staves'),
          text: t('大谱表把高音谱表放在上面、低音谱表放在下面，左边用一条直线和花括号连起来。把两个谱表挤在一起时，中央 C 正好落在中间那条加线上；把谱表拉开，它在两个谱表里各写一次，声音还是同一个。', '大譜表はト音譜表を上、ヘ音譜表を下に置き、左端を線と括弧でつなぐ。2 つを詰めると中央の C はちょうど真ん中の加線。離して書くと両方の譜表に 1 回ずつ現れるが、音は同じ。', 'A grand staff puts the treble staff above the bass staff, joined on the left by a line and a brace. Squeeze them together and middle C lands on the ledger line in between; spread them apart and it appears once in each staff — still one pitch.'),
        },
      },
    ],
    explain: [
      {
        id: 'b11x-e1', type: 'page', ref: ['omt2e-keyboard', 'omt2e-half-whole'],
        title: t('进阶 1 · 黑键的两个名字从哪来', '発展 1・黒鍵の 2 つの名前はどこから', 'Advanced 1 · Where a black key’s two names come from'),
        text: [
          t('黑键两个一组、三个一组地交替，整架钢琴每个八度重复一次。分组是为了让手和眼更快找到它们：两个黑键左边是 C，三个黑键左边是 F。', '黒鍵は 2 つと 3 つのまとまりが交互に並び、オクターヴごとにくり返す。まとまりがあるのは目と手ですぐ見つけるため：2 つの左が C、3 つの左が F。', 'Black keys alternate in groups of two and three, repeating every octave. The grouping helps eyes and hands find them fast: C is left of the two, F left of the three.'),
          t('黑键没有自己的字母，名字借自旁边的白键：在某个白键上方半音，就叫"这个白键升"（C 右边的黑键 = C♯）；在某个白键下方半音，就叫"这个白键降"（D 左边的黑键 = D♭）。所以每个黑键天生有两个名字。', '黒鍵には自分の文字がなく、隣の白鍵から名前を借りる：白鍵の半音上なら「その白鍵の ♯」（C の右 = C♯）、半音下なら「その白鍵の ♭」（D の左 = D♭）。だから黒鍵はどれも 2 つの名前を持つ。', 'Black keys have no letter of their own; they borrow from neighbours. A half step above a white key is that key “sharp” (right of C = C♯); a half step below is that key “flat” (left of D = D♭). So every black key is born with two names.'),
        ],
        visual: { kind: 'piano', from: 60, to: 71, lit: [61, 63, 66, 68, 70], names: 'c' },
      },
      {
        id: 'b11x-e2', type: 'demo', ref: 'omt2e-half-whole',
        title: t('白键也有别名', '白鍵にも別名がある', 'White keys have other names too'),
        steps: [
          { text: t('E–F、B–C 之间没有黑键，它们本来就只差半音。所以 E♯ 就是 F，F♭ 就是 E。', 'E–F と B–C の間に黒鍵はない。もともと半音だから。だから E♯ は F、F♭ は E。', 'E–F and B–C have no black key between them — they are already half steps. So E♯ is F and F♭ is E.'), visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [nn('E#4'), nn('F4'), nn('Fb4'), nn('E4')], cols: 4 }, audio: { notes: [65, 65, 64, 64], mode: 'melody' } },
          { text: t('同样，B♯ 就是 C，C♭ 就是 B。注意八度编号跟着字母：B♯3 = C4，C♭4 = B3。', '同じく B♯ は C、C♭ は B。オクターヴ番号は文字に従う：B♯3 = C4、C♭4 = B3。', 'Likewise B♯ is C and C♭ is B. The octave number follows the letter: B♯3 = C4, C♭4 = B3.'), visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [nn('B#3'), nn('C4'), nn('Cb4'), nn('B3')], cols: 4 }, audio: { notes: [60, 60, 59, 59], mode: 'melody' } },
        ],
      },
      {
        id: 'b11x-e3', type: 'discover', practice: true, ref: 'omt2e-half-whole',
        prompt: t('C 右边的黑键往上数一个全音，是哪个键？', 'C の右の黒鍵から全音上は？', 'A whole step above the black key right of C is…'),
        visual: { kind: 'piano', from: 60, to: 67, lit: [61], names: 'c' },
        options: [t('D 右边的黑键（D♯ / E♭）', 'D の右の黒鍵（D♯ / E♭）', 'The black key right of D (D♯ / E♭)'), t('白键 D', '白鍵 D', 'The white key D'), t('白键 E', '白鍵 E', 'The white key E')],
        answer: 0,
        insight: { title: t('从黑键出发也数两个键', '黒鍵からも 2 つ数える', 'From a black key, count two keys too'), text: t('全音 = 两个半音 = 往右数两个键（黑白都算）：C♯ → D → D♯。', '全音 = 半音 2 つ = 右へ 2 鍵（黒白とも数える）：C♯ → D → D♯。', 'A whole step = two half steps = two keys to the right, black and white alike: C♯ → D → D♯.') },
      },
      {
        id: 'b11x-e4', type: 'page', ref: ['omt2e-half-whole', 'omt2e-intervals'],
        title: t('进阶 3 · 重升、重降：一次挪一个全音', '発展 3・ダブルシャープとダブルフラット：一度に全音', 'Advanced 3 · Double sharps and flats move a whole step'),
        text: [
          t('重升号（𝄪）升高两个半音，重降号（𝄫）降低两个半音。D𝄪 弹的是 E；E𝄪 弹的是 F♯（也就是 G♭）；A𝄫 弹的是 G；C𝄫 弹的是 B♭（也就是 A♯）。', '𝄪 は半音 2 つ上げ、𝄫 は半音 2 つ下げる。D𝄪 は E、E𝄪 は F♯（= G♭）、A𝄫 は G、C𝄫 は B♭（= A♯）。', 'A double sharp (𝄪) raises two half steps and a double flat (𝄫) lowers two. D𝄪 sounds as E; E𝄪 as F♯ (= G♭); A𝄫 as G; C𝄫 as B♭ (= A♯).'),
          t('为什么不直接写 E？因为升降号不改变度数：字母决定"几度"。旋律或和弦需要某个字母时（比如要的是"D 的上方半音"），就只能在这个字母上加记号，于是会出现重升重降。', 'なぜ E と書かない？ 変化記号は度数を変えないから——「何度」かは文字が決める。旋律や和音がその文字を必要とするとき（たとえば「D の半音上」）、その文字に記号を付けるしかない。', 'Why not just write E? Because accidentals do not change the generic size — the letter decides “which degree”. When a melody or chord needs that letter (say, “a half step above D♯”), you can only add signs to it, hence doubles.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [nn('D##4'), nn('E##4'), nn('Abb4'), nn('Cbb5')], cols: 4 },
      },
      {
        id: 'b11x-e5', type: 'page', ref: ['omt2e-half-whole', 'omt2e-keyboard', 'omt2e-intervals'],
        title: t('进阶 4 · 全音的两个难点：E 与 B，和"写哪个字母"', '発展 4・全音の 2 つの難所：E と B、そして「どの文字で書くか」', 'Advanced 4 · Two traps with whole steps: E and B, and which letter'),
        text: [
          t('E、B 往上找全音：往右数两个键，落在 F、C 右边的黑键（F♯、C♯）；C、F 往下找全音：落在 B、E 左边的黑键（B♭、E♭）。', 'E・B から全音上：右へ 2 鍵で F・C の右の黒鍵（F♯・C♯）。C・F から全音下：B・E の左の黒鍵（B♭・E♭）。', 'A whole step above E or B: two keys right, the black keys right of F and C (F♯, C♯). A whole step below C or F: the black keys left of B and E (B♭, E♭).'),
          t('数"几度"时第一个音算"一"：E 到 F 是二度。E 往上全音写 F♯，是相邻字母（二度）；写成 G♭ 声音一样，但字母隔了一个，变成了三度。听起来一样，写出来是两种音程。', '度数は最初の音を「1」と数える：E から F は 2 度。E の全音上を F♯ と書けば隣の文字（2 度）、G♭ と書けば同じ音でも文字が 1 つ飛んで 3 度になる。', 'Count the first note as “one”: E to F is a second. Spell a whole step above E as F♯ and it is a second (adjacent letters); as G♭ it sounds the same but skips a letter — a third. Same sound, two different intervals on paper.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [{ p: 'E4', d: 'w', col: 0 }, { p: 'F#4', d: 'w', col: 0, lit: true }, { p: 'E4', d: 'w', col: 1 }, { p: 'Gb4', d: 'w', col: 1, lit: true }], cols: 2 },
      },
      {
        id: 'b11x-e6', type: 'discover', practice: true, ref: ['omt2e-half-whole', 'omt2e-intervals'],
        prompt: t('C𝄫 在键盘上是哪个键？', 'C𝄫 は鍵盤のどれ？', 'Which key is C𝄫?'),
        options: [t('黑键 B♭（A♯）', '黒鍵 B♭（A♯）', 'The black key B♭ (A♯)'), t('白键 B', '白鍵 B', 'The white key B'), t('白键 A', '白鍵 A', 'The white key A')],
        answer: 0,
        insight: { title: t('往下两个半音', '半音 2 つ下', 'Two half steps down'), text: t('C → B（半音）→ B♭（再半音）。C𝄫 和 B♭、A♯ 同音。', 'C → B（半音）→ B♭（もう半音）。C𝄫 は B♭・A♯ と同じ音。', 'C → B (half step) → B♭ (another). C𝄫 sounds as B♭ and A♯.') },
      },
      {
        id: 'b11x-e7', type: 'page', ref: ['omt2e-clefs', 'omt2e-notation'],
        title: t('进阶 5、6 · 高音谱号与低音谱号：名字里藏着位置', '発展 5・6・ト音記号とヘ音記号：名前に位置が隠れている', 'Advanced 5–6 · Treble and bass clefs: the name gives the place'),
        text: [
          t('高音谱号又叫 G 谱号：它绕着下数第二线，那条线就是 G4。线（下→上）E G B D F，间 F A C E。手写时三步：一条斜竖线、在上数第二线处交叉的半圆、最后绕住下数第二线。', 'ト音記号は G 記号：下から 2 本目の線（G4）を巻く。線（下→上）E G B D F、間 F A C E。手書きは 3 ステップ：斜めの縦線、上から 2 本目で交わる半円、最後に下から 2 本目を巻く。', 'The treble clef is the G clef: it curls round the second line from the bottom, G4. Lines bottom to top E G B D F, spaces F A C E. By hand in three steps: a slanted vertical line, a half circle crossing it at the second line from the top, then a curl round the second line from the bottom.'),
          t('低音谱号又叫 F 谱号：起笔的点在上数第二线上，那条线是 F3，右边两个点夹住它。线 G B D F A，间 A C E G。手写也是三步：先点、再画反写的 C（不超出谱表上沿）、最后在上面两个间里各点一个点。', 'ヘ音記号は F 記号：書き始めの点が上から 2 本目（F3）にあり、右の 2 つの点がそれをはさむ。線 G B D F A、間 A C E G。手書きも 3 ステップ：点、裏返しの C（上の線を越えない）、上の 2 つの間に点。', 'The bass clef is the F clef: its starting dot sits on the second line from the top, F3, framed by two dots on the right. Lines G B D F A, spaces A C E G. Three steps by hand: the dot, a backward C that stays inside the staff, then dots in the top two spaces.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes: [{ p: 'G4', d: 'w', s: 0, col: 0, lit: true, label: 'G4' }, { p: 'F3', d: 'w', s: 1, col: 1, lit: true, label: 'F3' }], cols: 2 },
      },
      {
        id: 'b11x-e8', type: 'page', ref: ['omt2e-clefs', 'omt2e-notation'],
        title: t('进阶 7 · 两个 C 谱号：中音与次中音', '発展 7・2 つのハ音記号：アルトとテノール', 'Advanced 7 · Two C clefs: alto and tenor'),
        text: [
          t('C 谱号的中心指着中央 C。中音谱号指中线：线 F A C E G、间 G B D F，主要给中提琴用。次中音谱号指上数第二线：线 D F A C E、间 E G B D，大提琴、大管、长号有时会用（它们平时主要用低音谱号）。', 'ハ音記号の中心は中央の C を指す。アルト記号は真ん中の線：線 F A C E G、間 G B D F、主にヴィオラ。テノール記号は上から 2 本目：線 D F A C E、間 E G B D、チェロ・ファゴット・トロンボーンが時々使う（普段はヘ音記号）。', 'A C clef’s centre points at middle C. The alto clef points at the middle line: lines F A C E G, spaces G B D F — mainly for viola. The tenor clef points at the second line from the top: lines D F A C E, spaces E G B D — sometimes used by cello, bassoon and trombone (whose main clef is bass).'),
          t('两个 C 谱号画法一样（两条竖线 + 两个反写的 C，在指向 C 的那条线上相接），次中音只是整体高一条线；手写时也可以用字母 K 速写。', '2 つのハ音記号の書き方は同じ（縦線 2 本 + 裏返しの C 2 つが C の線で接する）。テノールは 1 線上にずらすだけ。手書きでは K の字で略記してもよい。', 'Both C clefs are drawn the same way (two vertical lines and two backward Cs meeting on the C line); the tenor clef is simply one line higher. By hand you may abbreviate either as the letter K.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'alto' }, { clef: 'tenor' }], notes: [{ p: 'C4', d: 'w', s: 0, col: 0, lit: true, label: 'C4' }, { p: 'C4', d: 'w', s: 1, col: 1, lit: true, label: 'C4' }], cols: 2 },
      },
      {
        id: 'b11x-e9', type: 'discover', practice: true, ref: 'omt2e-clefs',
        prompt: t('次中音谱号的最下面一条线是哪个音？', 'テノール記号のいちばん下の線は？', 'What is the bottom line of the tenor clef?'),
        visual: { kind: 'notation', staves: [{ clef: 'tenor' }], notes: [nn('D3')], cols: 1 },
        options: ['D3', 'F3', 'E3', 'G3'],
        answer: 0,
        insight: { title: t('从 C 那条线往下数', 'C の線から下へ数える', 'Count down from the C line'), text: t('上数第二线是 C4，往下每条线隔一个字母：C4 → A3 → F3 → D3。所以次中音谱号的线是 D F A C E。', '上から 2 本目が C4。線を 1 本下がるごとに文字 1 つ飛ばし：C4 → A3 → F3 → D3。線は D F A C E。', 'The second line from the top is C4; each line down skips a letter: C4 → A3 → F3 → D3. The tenor lines are D F A C E.') },
      },
      {
        id: 'b11x-e10', type: 'page', ref: ['omt2e-aspn', 'omt2e-keyboard', 'omt2e-clefs', 'omt2e-notation'],
        title: t('进阶 8 · 八度编号、加线与大谱表', '発展 8・オクターヴ番号・加線・大譜表', 'Advanced 8 · Octave numbers, ledger lines and the grand staff'),
        text: [
          t('钢琴有完整的第 1~7 个八度，两头再加第 0 和第 8 个八度的一小段。ASPN 的编号和乐器无关：C4 不管用长笛、长号、小提琴还是人声发出，都叫 C4。', 'ピアノにはオクターヴ 1〜7 が丸ごとあり、両端に 0 と 8 が少しずつ。ASPN の番号は楽器に関係ない：C4 はフルートでもトロンボーンでも声でも C4。', 'A piano has complete octaves 1–7, plus a little of octaves 0 and 8. ASPN numbers do not depend on the instrument: C4 is C4 on flute, trombone, violin or voice.'),
          t('音太高或太低时用加线把谱表往外延伸，每条线、每个间照样按字母往下排，就像谱表一直延续下去；但只画到音符为止，不要多画一条。钢琴谱写在大谱表上，通常右手弹上面的高音谱表、左手弹下面的低音谱表。', '高すぎ・低すぎる音は加線で譜表を延ばす。線と間はそのまま文字順に続く——譜表が続いているかのように。ただし音符のところまでで、余分に引かない。ピアノは大譜表で、ふつう右手が上のト音、左手が下のヘ音。', 'Ledger lines extend the staff for notes too high or low; each line and space keeps the letter order as if the staff simply continued — but stop at the note, never an extra line. Piano music uses the grand staff, usually right hand on the treble staff above and left hand on the bass staff below.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [nn('A5'), nn('C6'), nn('E6'), nn('A3')], cols: 4 },
      },
      {
        id: 'b11x-e11', type: 'discover', practice: true, ref: ['omt2e-aspn', 'omt2e-keyboard'],
        prompt: t('钢琴最低的几个键属于第几个八度？', 'ピアノのいちばん低い数鍵は第何オクターヴ？', 'The lowest few keys of a piano belong to which octave?'),
        options: [t('第 0 个八度（只有一小段）', '第 0 オクターヴ（少しだけ）', 'Octave 0 (only a little of it)'), t('第 1 个八度', '第 1 オクターヴ', 'Octave 1'), t('第 −1 个八度', '第 −1 オクターヴ', 'Octave −1')],
        answer: 0,
        insight: { title: t('0 到 8', '0 から 8', 'Zero to eight'), text: t('ASPN 从最低的八度 0 开始往上数。钢琴两头各只有第 0、第 8 个八度的一小段，中间第 1~7 个八度是完整的。', 'ASPN はいちばん低いオクターヴ 0 から数える。ピアノの両端は 0 と 8 の一部だけ、1〜7 は完全。', 'ASPN counts up from octave 0. A piano has only a little of octaves 0 and 8 at the ends; octaves 1–7 are complete.') },
      },
    ],
    experiment: [
      { id: 'b11x-x1', type: 'experiment', toy: 'spell', ref: ['omt2e-half-whole', 'omt2e-clefs', 'omt2e-aspn'],
        prompt: t('先选次中音谱号，点 D4、F♯4、B3，看它们画在哪里；再换中音谱号点同样的键。找一个"一个键五种写法里有两种八度编号"的例子（提示：试试 C 和 B 附近）。', 'まずテノール記号で D4・F♯4・B3 を押して位置を見よう。次にアルト記号で同じ鍵。「1 つの鍵の書き方に 2 つのオクターヴ番号が出る」例を探そう（ヒント：C と B のあたり）。', 'Pick the tenor clef and tap D4, F♯4, B3 to see where they sit; switch to alto and tap the same keys. Find a key whose spellings carry two octave numbers (hint: near C and B).'),
        params: { start: 62, clef: 'tenor' },
        breakthrough: { id: 'b11x-clefs', text: t('同一个音在四种谱号里换了位置，名字和编号却没变——谱号只是换了"地图"。', '同じ音が 4 つの記号で位置を変えても、名前と番号は同じ——記号は「地図」を替えただけ。', 'One pitch moved around four clefs but kept its name and number — the clef only swaps the map.') } },
    ],
    challenge: [
      {
        id: 'b11x-c1', type: 'choice', error: 'enharmonic', skills: ['spell'], ref: 'omt2e-half-whole',
        variants: [
          { prompt: t('E𝄪 和下面哪个音同音？', 'E𝄪 と同じ音は？', 'E𝄪 sounds the same as…'), options: ['F♯', 'F', 'G', 'E♯'] },
          { prompt: t('A𝄫 和下面哪个音同音？', 'A𝄫 と同じ音は？', 'A𝄫 sounds the same as…'), options: ['G', 'A♭', 'G♭', 'B𝄫'] },
          { prompt: t('D𝄪 和下面哪个音同音？', 'D𝄪 と同じ音は？', 'D𝄪 sounds the same as…'), options: ['E', 'D♯', 'F', 'E♭'] },
        ],
        answer: 0,
        explain: t('重升 / 重降一次挪两个半音：E → F → F♯，A → A♭ → G，D → D♯ → E。', '𝄪 / 𝄫 は半音 2 つ：E → F → F♯、A → A♭ → G、D → D♯ → E。', 'Doubles move two half steps: E → F → F♯, A → A♭ → G, D → D♯ → E.'),
      },
      {
        id: 'b11x-c2', type: 'choice', error: 'interval-size', skills: ['spell'], ref: ['omt2e-intervals', 'omt2e-half-whole'],
        variants: [
          { prompt: t('B 往上一个全音，写成二度（相邻字母）应该是？', 'B から全音上を 2 度（隣の文字）で書くと？', 'A whole step above B, spelled as a second (next letter), is…'), options: ['C♯', 'D♭', 'C', 'B♯'] },
          { prompt: t('F 往下一个全音，写成二度应该是？', 'F から全音下を 2 度で書くと？', 'A whole step below F, spelled as a second, is…'), options: ['E♭', 'D♯', 'E', 'F♭'] },
          { prompt: t('E 往上一个全音，写成二度应该是？', 'E から全音上を 2 度で書くと？', 'A whole step above E, spelled as a second, is…'), options: ['F♯', 'G♭', 'F', 'E♯'] },
        ],
        answer: 0,
        explain: t('二度要用相邻的字母，再用升降号把距离调成两个半音；写成另一个字母就变成三度了。', '2 度は隣の文字を使い、変化記号で半音 2 つに合わせる。別の文字で書くと 3 度になる。', 'A second uses the adjacent letter, then accidentals fix the distance to two half steps; another letter would make it a third.'),
      },
      {
        id: 'b11x-c3', type: 'choice', error: 'clef', skills: ['identify'], ref: 'omt2e-clefs',
        variants: [
          { prompt: t('中音谱号的四个间（下→上）是？', 'アルト記号の 4 つの間（下→上）は？', 'The four spaces of the alto clef, bottom to top, are…'), options: ['G B D F', 'F A C E', 'A C E G', 'E G B D'] },
          { prompt: t('次中音谱号的五条线（下→上）是？', 'テノール記号の 5 本の線（下→上）は？', 'The five lines of the tenor clef, bottom to top, are…'), options: ['D F A C E', 'F A C E G', 'G B D F A', 'E G B D F'] },
          { prompt: t('低音谱号的四个间（下→上）是？', 'ヘ音記号の 4 つの間（下→上）は？', 'The four spaces of the bass clef, bottom to top, are…'), options: ['A C E G', 'G B D F', 'F A C E', 'E G B D'] },
        ],
        answer: 0,
        explain: t('先找谱号指着的那条线（G、F 或 C），再按字母一线一间地往外数。', 'まず記号が指す線（G・F・C）を見つけ、文字順に線と間を数える。', 'Find the line the clef points to (G, F or C), then count letters line by space outward.'),
      },
      {
        id: 'b11x-c4', type: 'choice', error: 'clef', skills: ['identify'], ref: ['omt2e-clefs', 'omt2e-notation'],
        variants: [
          { prompt: t('高音谱号为什么又叫 G 谱号？', 'ト音記号が G 記号と呼ばれるのはなぜ？', 'Why is the treble clef also called the G clef?'), options: [t('它绕住的下数第二线是 G', '巻いている下から 2 本目の線が G だから', 'It curls round the second line from the bottom, which is G'), t('它的形状像字母 G 的小写', '形が小文字の g に似ているから', 'It looks like a lowercase g'), t('它最低的线是 G', 'いちばん下の線が G だから', 'Its lowest line is G')] },
          { prompt: t('低音谱号为什么又叫 F 谱号？', 'ヘ音記号が F 記号と呼ばれるのはなぜ？', 'Why is the bass clef also called the F clef?'), options: [t('它起笔的点在上数第二线，那条线是 F', '書き始めの点が上から 2 本目の線（F）にあるから', 'Its starting dot is on the second line from the top, which is F'), t('它最高的线是 F', 'いちばん上の線が F だから', 'Its top line is F'), t('它只能写 F 调的曲子', 'F の調の曲しか書けないから', 'It is only for pieces in F')] },
        ],
        answer: 0,
        explain: t('谱号的名字就是它"指着"的那个音：G 谱号绕着 G 线，F 谱号的点从 F 线开始，C 谱号的中心对着中央 C。', '記号の名前は指している音：G 記号は G の線を巻き、F 記号の点は F の線から、C 記号の中心は中央の C。', 'A clef’s name is the note it points at: the G clef curls round G, the F clef’s dot starts on F, the C clef centres on middle C.'),
      },
      {
        id: 'b11x-c5', type: 'choice', error: 'octave', skills: ['spell'], ref: ['omt2e-aspn', 'omt2e-half-whole'],
        variants: [
          { prompt: t('和 F4 同一个键、写成 E 的话是？', 'F4 と同じ鍵を E で書くと？', 'The key of F4 spelled with E is…'), options: ['E♯4', 'E♯3', 'E4', 'F♭4'] },
          { prompt: t('和 B4 同一个键、写成 C 的话是？', 'B4 と同じ鍵を C で書くと？', 'The key of B4 spelled with C is…'), options: ['C♭5', 'C♭4', 'C5', 'B♯4'] },
          { prompt: t('和 C6 同一个键、写成 B 的话是？', 'C6 と同じ鍵を B で書くと？', 'The key of C6 spelled with B is…'), options: ['B♯5', 'B♯6', 'B5', 'C♭6'] },
        ],
        answer: 0,
        explain: t('八度编号跟着字母、每个八度从 C 开始：E 和 F 在同一个八度里，所以 E♯4 = F4；C♭ 属于新的八度，所以 C♭5 = B4。', '番号は文字に従い、各オクターヴは C から：E と F は同じオクターヴなので E♯4 = F4。C♭ は新しいオクターヴなので C♭5 = B4。', 'The number follows the letter and each octave starts at C: E and F share an octave, so E♯4 = F4; C♭ belongs to the new octave, so C♭5 = B4.'),
      },
      {
        id: 'b11x-c6', type: 'choice', error: 'wrong-note', skills: ['identify'], ref: ['omt2e-keyboard', 'omt2e-notation'],
        variants: [
          { prompt: t('钢琴谱的大谱表，通常怎么分工？', 'ピアノの大譜表のふつうの分担は？', 'How is a piano grand staff usually divided?'), options: [t('上面高音谱表给右手，下面低音谱表给左手', '上のト音譜表が右手、下のヘ音譜表が左手', 'Treble staff above for the right hand, bass staff below for the left'), t('上面给左手，下面给右手', '上が左手、下が右手', 'Above for the left hand, below for the right'), t('两个谱表都是右手', '両方とも右手', 'Both staves for the right hand')] },
          { prompt: t('在加线上写音，下面哪种写法是错的？', '加線の書き方で間違っているのは？', 'Writing on ledger lines, which is wrong?'), options: [t('在音符外面再多画一条加线', '音符の外側に加線をもう 1 本引く', 'Drawing one extra ledger line beyond the note'), t('加线只画到音符为止', '加線は音符のところまで', 'Stopping the ledger lines at the note'), t('加线上下的字母照常排列', '加線の文字はそのまま続く', 'Continuing the letter order on ledger lines')] },
        ],
        answer: 0,
        explain: t('大谱表：高音谱表在上（通常右手）、低音谱表在下（通常左手），用直线和花括号连起来。加线就像谱表继续延伸，但只画到音符为止。', '大譜表：上がト音（ふつう右手）、下がヘ音（ふつう左手）、線と括弧でつなぐ。加線は譜表の続きだが、音符のところまで。', 'Grand staff: treble above (usually right hand), bass below (usually left), joined by a line and brace. Ledger lines continue the staff but stop at the note.'),
      },
      G('b11x-g1', 'staffRead', 2, ['identify'], { clefs: ['alto', 'tenor', 'bass'] }),
      G('b11x-g2', 'halfWhole', 2, ['spell']),
    ],
  },
  pool: [G('b11x-p1', 'keyName', 3, ['identify']), G('b11x-p2', 'staffRead', 3, ['identify'], { clefs: ['treble', 'bass', 'alto', 'tenor'] }), G('b11x-p3', 'halfWhole', 3, ['spell'])],
};

// ===================== B1-2x 脉动、细分与节拍层级 · 扩展关 =====================
// 对应 A 面：rhythm（休止符 / 双附点 / 连音线与切分 / 时值计算）、meter（复拍子 / 不对称拍子 / 变拍子与复合节拍 / 拍子综合）、
// meter2（3 对 4 与重音 / 节拍调制两种接法 / 综合）的进阶关
const R = (bpm, cycle, accents, others, repeats = 3) => ({ rhythm: { bpm, cycle, repeats, tracks: [{ beats: accents, midi: 81 }, { beats: others, midi: 69 }] } });
const EXT_B1_2 = {
  minutes: 22,
  insight: t('拍子不是"一小节几个音"，而是"重音怎么分组"：同样五个八分音符，2+3 和 3+2 是两种走路的样子。', '拍子は「1 小節に何音」ではなく「アクセントのまとまり方」。同じ 8 分音符 5 つでも 2+3 と 3+2 は別の歩き方。', 'Meter is not “how many notes per bar” but how the accents group: the same five eighths walk differently as 2+3 and as 3+2.'),
  sections: {
    discover: [
      {
        id: 'b12x-d1', type: 'discover', ref: ['wiki-metre', 'omt2e-20c-rhythm'],
        prompt: t('两段都是一小节五个八分音符，只是重音的位置不同。哪一段是"短—长"（2+3）？', 'どちらも 1 小節 8 分音符 5 つ、アクセントの位置だけ違う。「短—長」（2+3）はどっち？', 'Both are five eighths per bar; only the accents differ. Which one is “short–long” (2+3)?'),
        play: [
          { label: 'A', audio: R(240, 5, [0, 2], [1, 3, 4]) },
          { label: 'B', audio: R(240, 5, [0, 3], [1, 2, 4]) },
        ],
        options: [t('A：重音在第 1、3 个八分音符', 'A：アクセントが 1・3 番目', 'A: accents on eighths 1 and 3'), t('B：重音在第 1、4 个八分音符', 'B：アクセントが 1・4 番目', 'B: accents on eighths 1 and 4'), t('两段一样', '同じ', 'They are the same')],
        answer: 0,
        insight: {
          title: t('五拍按重音分成 2+3 或 3+2', '5 拍はアクセントで 2+3 か 3+2', 'Five splits into 2+3 or 3+2 by accent'),
          text: t('单、复拍子之外的分法要按"加法"来看：五拍可以是 2+3，也可以是 3+2，看重音落在哪里。这种长短不一的拍子也叫 aksak——土耳其语"跛行"。', '単純・複合以外の分け方は「足し算」で見る：5 拍は 2+3 にも 3+2 にもなり、アクセントの位置で決まる。長短のある拍子は aksak（トルコ語で「足を引きずる」）とも呼ばれる。', 'Divisions beyond simple and compound are read additively: five beats can be 2+3 or 3+2, depending on the accent. Such limping meters are also called aksak — Turkish for “limping”.'),
        },
      },
    ],
    explain: [
      {
        id: 'b12x-e1', type: 'page', ref: 'omt2e-rhythm',
        title: t('进阶 1 · 休止符：安静也有长短', '発展 1・休符：静けさにも長さがある', 'Advanced 1 · Rests: silence has length too'),
        text: [
          t('每种音符都有同名的休止符，长短一样，也能一分为二。全休止符挂在线下面，二分休止符坐在线上面——可以想成"全休止符更重，所以垂下来"，二分休止符像一顶礼帽。', 'どの音符にも同じ長さの休符があり、半分に分けられる。全休符は線からぶら下がり、2 分休符は線の上に乗る——全休符は「重いから垂れる」、2 分休符はシルクハット、と覚えよう。', 'Every note value has a rest of the same length, and rests halve too. A whole rest hangs below a line, a half rest sits on top of one — think “the whole rest is heavier, so it hangs”, and the half rest looks like a top hat.'),
          t('让时值减半的三种写法：加符干（全 → 二分）、把符头涂黑（二分 → 四分）、加一条旗（四分 → 八分、八分 → 十六分）。休止符加旗也一样减半。很少见的二全音符（breve）等于两个全音符。', '音価を半分にする 3 つの方法：符尾を付ける（全 → 2 分）、符頭を塗る（2 分 → 4 分）、旗を付ける（4 分 → 8 分、8 分 → 16 分）。休符も旗で半分。まれな倍全音符（breve）は全音符 2 つ。', 'Three ways to halve a value: add a stem (whole → half), fill the notehead (half → quarter), add a flag (quarter → eighth, eighth → sixteenth). A flag halves a rest too. The rare double whole note (breve) equals two whole notes.'),
        ],
        visual: { kind: 'values', rows: ['w', 'h', 'q', 'e'] },
      },
      {
        id: 'b12x-e2', type: 'demo', ref: 'omt2e-rhythm',
        title: t('进阶 2 · 第二个点加第一个点的一半', '発展 2・2 つ目の点は 1 つ目の半分', 'Advanced 2 · The second dot adds half the first'),
        steps: [
          { text: t('附点加上音符本身的一半：附点四分 = 四分 + 八分 = 三个八分音符。', '付点は音符の半分を足す：付点 4 分 = 4 分 + 8 分 = 8 分 3 つ。', 'A dot adds half the note: dotted quarter = quarter + eighth = three eighths.'), visual: { kind: 'blocks', rows: [{ label: t('附点四分', '付点 4 分', 'dotted quarter'), cells: ['♩', '+ ♪'] }, { label: t('等于', '＝', 'equals'), cells: ['♪', '♪', '♪'] }] } },
          { text: t('第二个点再加"第一个点"的一半：双附点四分 = 四分 + 八分 + 十六分 = 七个十六分音符，也就是原来的 1¾ 倍。', '2 つ目の点は「1 つ目の点」の半分：複付点 4 分 = 4 分 + 8 分 + 16 分 = 16 分 7 つ、元の 1¾ 倍。', 'A second dot adds half of the first dot: double-dotted quarter = quarter + eighth + sixteenth = seven sixteenths, 1¾ times the original.'), visual: { kind: 'blocks', rows: [{ label: t('双附点四分', '複付点 4 分', 'double-dotted quarter'), cells: ['4', '+ 2', '+ 1'] }, { label: t('十六分音符', '16 分音符', 'sixteenths'), cells: ['= 7'] }] } },
        ],
      },
      {
        id: 'b12x-e3', type: 'discover', practice: true, ref: 'omt2e-rhythm',
        prompt: t('双附点二分音符等于几个十六分音符？', '複付点 2 分音符は 16 分音符いくつ？', 'A double-dotted half note equals how many sixteenths?'),
        options: ['14', '12', '7', '15'],
        answer: 0,
        insight: { title: t('8 + 4 + 2', '8 + 4 + 2', '8 + 4 + 2'), text: t('二分 = 8 个十六分，第一个点加 4，第二个点加 2：一共 14 个（还是原来的 1¾ 倍）。', '2 分 = 16 分 8 つ、1 つ目の点で +4、2 つ目で +2：計 14（やはり 1¾ 倍）。', 'Half = 8 sixteenths, the first dot adds 4, the second adds 2: 14 in all (again 1¾ times).') },
      },
      {
        id: 'b12x-e4', type: 'page', ref: ['omt2e-rhythm', 'omt2e-rhythm-more'],
        title: t('进阶 3 · 连音线、圆滑线与切分', '発展 3・タイ・スラー・シンコペーション', 'Advanced 3 · Ties, slurs and syncopation'),
        text: [
          t('连音线是一条弧线，连接两个（或更多）同样高的音，把时值加在一起：被连过去的音不再弹。连音线从不用在休止符上。长得像的圆滑线连接的是不同的音，意思是连贯地奏——两者别弄混。', 'タイは同じ高さの 2 音（以上）を結ぶ弧で、長さを足す：結ばれた後の音は弾き直さない。休符には使わない。見た目の似たスラーは違う音を結び、なめらかに演奏する意味——混同しないこと。', 'A tie is a curve joining two or more notes of the same pitch into one longer note: the tied-to note is not played again. Ties are never used with rests. The look-alike slur joins different pitches and means play smoothly — do not mix them up.'),
          t('切分：重音落在拍外。造成切分的方法有四种——连音线、附点、休止符、力度记号。比如每拍开头放一个休止符，或者把弱的八分音符标上重音。', 'シンコペーション：アクセントが拍の外に来ること。作り方は 4 つ——タイ・付点・休符・強弱記号。たとえば各拍の頭を休符にする、弱い 8 分音符にアクセントを付ける。', 'Syncopation: accents off the beat. Four ways to make it — ties, dots, rests and dynamics: say, a rest at the start of each beat, or an accent on the weak eighth.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [{ p: 'G4', d: 'q' }, { p: 'A4', d: 'h', lit: true }, { p: 'G4', d: 'q' }], cols: 3 },
      },
      {
        id: 'b12x-e5', type: 'discover', practice: true, ref: 'omt2e-rhythm-more',
        prompt: t('一小节 4/4：每拍开头都是八分休止符，后面跟一个八分音符。这是靠什么造成切分的？', '4/4 の 1 小節：各拍の頭が 8 分休符、続いて 8 分音符。何でシンコペーションを作っている？', 'A bar of 4/4: every beat starts with an eighth rest followed by an eighth note. What creates the syncopation?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: { rhythm: { bpm: 96, cycle: 8, repeats: 2, tracks: [{ beats: [1, 3, 5, 7], midi: 76 }, { beats: [0, 2, 4, 6], midi: 50 }] } } }],
        options: [t('休止符', '休符', 'Rests'), t('连音线', 'タイ', 'Ties'), t('调号', '調号', 'The key signature')],
        answer: 0,
        insight: { title: t('拍头空了，重音就挪到拍外', '拍の頭が空けば、アクセントは拍の外へ', 'Empty the downbeat and the accent moves off it'), text: t('每拍开头的休止符让每个起音都落在"and"上：这是用休止符造成的切分。连音线、附点、力度也能做到，调号只管音高。', '各拍の頭の休符で、どの音も「and」に来る：休符によるシンコペーション。タイ・付点・強弱でもできる。調号は音高だけ。', 'The rest at each beat start puts every attack on the “and”: syncopation by rests. Ties, dots and dynamics can do it too; a key signature only concerns pitch.') },
      },
      {
        id: 'b12x-e6', type: 'page', ref: ['omt2e-simple-meter', 'omt2e-compound-meter', 'omt2e-rhythm-more'],
        title: t('进阶 4 · 怎么数：and、e、a，la、li，还有弱起', '発展 4・数え方：and・e・a、la・li、そして弱起', 'Advanced 4 · Counting: and, e, a; la, li; and pickups'),
        text: [
          t('单拍子：拍读数字，分拍读 "and"（写成 +），十六分音符读 "e"、"a"：1 e + a。复拍子：分拍读 "la"、"li"（1 la li），再细分读 "ta"。借来的分法也借读法：三连音读 1-la-li，二连音读 1-and。', '単純拍子：拍は数字、分割は「and」（+）、16 分は「e」「a」：1 e + a。複合拍子：分割は「la」「li」（1 la li）、さらに細かくは「ta」。借りた分割は数え方も借りる：3 連符は 1-la-li、2 連符は 1-and。', 'Simple meter: beats are numbers, divisions “and” (written +), sixteenths “e” and “a”: 1 e + a. Compound: divisions “la”, “li” (1 la li), subdivisions “ta”. Borrowed divisions borrow the syllables: triplets 1-la-li, duplets 1-and.'),
          t('弱起（anacrusis）从小节中间开始：它算作前面一个"想象中的小节"的最后几拍，所以不从 1 数起。乐曲用弱起开头时，最后一小节通常会缩短同样的长度。', '弱起（アナクルーシス）は小節の途中から始まる：前にある「想像上の小節」の最後の拍として数えるので、1 からは数えない。弱起で始まる曲は、ふつう最後の小節がその分短い。', 'A pickup (anacrusis) starts mid-bar: it counts as the last beat(s) of an imaginary bar before, so it is not counted from 1. When a piece starts with a pickup, the last bar is usually shortened by the same amount.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('单拍子', '単純', 'simple'), cells: ['1', 'e', '+', 'a'] }, { label: t('复拍子', '複合', 'compound'), cells: ['1', 'ta', 'la', 'ta', 'li', 'ta'] }] },
      },
      {
        id: 'b12x-e7', type: 'page', ref: ['omt2e-simple-meter', 'omt2e-compound-meter'],
        title: t('进阶 5 · 复拍子：指挥图式一样，符杠不一样', '発展 5・複合拍子：図形は同じ、連桁は違う', 'Advanced 5 · Compound meter: same conducting pattern, different beams'),
        text: [
          t('指挥图式只看"几拍"：二拍子下—上，三拍子下—外—上，四拍子下—里—外—上；复拍子用同样的图式。第一拍是强拍（向下），最后一拍是弱拍（向上，带着预备感）。', '指揮の図形は「何拍か」だけで決まる：2 拍子は下—上、3 拍子は下—外—上、4 拍子は下—内—外—上。複合拍子も同じ図形。1 拍目が強拍（下へ）、最後の拍がアップビート（上へ、予備の感じ）。', 'Conducting patterns depend only on the number of beats: duple down–up, triple down–out–up, quadruple down–in–out–up; compound meters use the same ones. Beat 1 is the downbeat (down), the last beat the upbeat (up, anticipatory).'),
          t('符杠按拍连，让人一眼看出拍在哪：2/4 里四个十六分音符连成一组（= 一拍），6/8 里三个八分音符连成一组（= 一个附点四分音符拍）。', '連桁は拍ごとにつなぎ、拍の位置をひと目で見せる：2/4 では 16 分 4 つで 1 組（= 1 拍）、6/8 では 8 分 3 つで 1 組（= 付点 4 分の 1 拍）。', 'Beams connect notes by beat so you can see the beats: in 2/4 four sixteenths form a group (one beat); in 6/8 three eighths do (one dotted-quarter beat).'),
        ],
        visual: { kind: 'beats', rows: [{ label: '2/4', groups: [4, 4] }, { label: '6/8', groups: [3, 3] }] },
      },
      {
        id: 'b12x-e8', type: 'discover', practice: true, ref: 'omt2e-simple-meter',
        prompt: t('一首 4/4 的歌用一个四分音符的弱起开头。最后一小节通常有几拍？', '4/4 の歌が 4 分音符 1 つの弱起で始まる。最後の小節はふつう何拍？', 'A 4/4 song starts with a one-quarter pickup. How many beats does the last bar usually have?'),
        options: ['3', '4', '1', '5'],
        answer: 0,
        insight: { title: t('借出去的要还回来', '借りた分は返す', 'What the pickup borrows, the end gives back'), text: t('弱起算作想象小节的最后一拍，最后一小节通常少同样的长度：4 − 1 = 3 拍。', '弱起は想像上の小節の最後の拍。最後の小節はふつう同じ長さだけ短い：4 − 1 = 3 拍。', 'The pickup is the last beat of an imaginary bar; the last bar is usually shortened by the same amount: 4 − 1 = 3 beats.') },
      },
      {
        id: 'b12x-e9', type: 'page', ref: ['omt2e-20c-rhythm', 'wiki-metre'],
        title: t('进阶 6 · 不对称拍子：长短不一的拍', '発展 6・非対称拍子：長さの違う拍', 'Advanced 6 · Asymmetrical meters: beats of unequal length'),
        text: [
          t('不对称拍子把一小节分成长短不等的组，脉动变得不均匀。这个名字并不统一，也有人叫 mixed、complex 或 non-isochronous meter。常见的是以八分音符为分拍的 5/8、7/8，但也可以用十六分或四分音符。', '非対称拍子は 1 小節を長さの違うまとまりに分け、脈が不均等になる。名称は統一されておらず、mixed・complex・non-isochronous とも呼ばれる。8 分音符単位の 5/8・7/8 がよくあるが、16 分や 4 分のものもある。', 'Asymmetrical meters divide the bar into unequal groups, making the pulse uneven. The name is not universal — also “mixed”, “complex” or “non-isochronous” meters. 5/8 and 7/8 on the eighth are common, but sixteenth or quarter units occur too.'),
          t('2+2+3 这类拍子在保加利亚民间舞和印度古典音乐里都很常见；马其顿还有 3+2+2+3+2 这样长的组合。Dave Brubeck 四重奏的《Unsquare Dance》故意不用方块舞惯常的四拍，让听众的期待落空。', '2+2+3 のような拍子はブルガリアの民俗舞踊やインド古典音楽でよく使われ、マケドニアには 3+2+2+3+2 という長い組み合わせもある。デイヴ・ブルーベック・カルテットの《Unsquare Dance》は、スクエアダンスのふつうの 4 拍子を避けて期待を外す。', 'Meters like 2+2+3 are common in Bulgarian folk dances and Indian classical music; Macedonian music even uses 3+2+2+3+2. The Dave Brubeck Quartet’s “Unsquare Dance” avoids the square dance’s usual quadruple meter to upset expectations.'),
        ],
        visual: { kind: 'beats', rows: [{ label: '5/8', groups: [2, 3] }, { label: '7/8', groups: [2, 2, 3] }] },
      },
      {
        id: 'b12x-e10', type: 'demo', ref: ['omt2e-20c-rhythm', 'wiki-metre'],
        title: t('进阶 7 · 变拍子、无拍子与"听到的拍子"', '発展 7・変拍子・無拍・「聞こえる拍子」', 'Advanced 7 · Changing meter, ametric music and the meter you hear'),
        steps: [
          { text: t('变拍子：乐曲里换拍号（任何换拍子都算）。听：一小节 3/8、一小节 2/8 交替。', '変拍子：曲の途中で拍子が変わる（どんな変化でも）。3/8 と 2/8 が交互に。', 'Changing meter: any change of time signature within a piece. Listen: bars of 3/8 and 2/8 alternating.'), audio: R(240, 5, [0, 3], [1, 2, 4], 4) },
          { text: t('无拍子（ametric）的音乐听不出任何拍子，即使谱上写了拍号。还有一种情况：谱上写的拍子和听众感觉到的拍子不一样——这叫"感知拍子与记谱拍子"。', '無拍（ametric）の音楽は、拍子記号があっても拍が聞き取れない。また、楽譜の拍子と聴き手の感じる拍子が違うこともある——「知覚される拍子と記譜上の拍子」の問題。', 'Ametric music has no perceivable meter, even if a time signature is written. And sometimes the written meter differs from the one listeners perceive — an issue of perceived versus notated meter.') },
        ],
      },
      {
        id: 'b12x-e11', type: 'discover', practice: true, ref: ['wiki-metre', 'omt2e-20c-rhythm'],
        prompt: t('7/8 分成 2+2+3：重音落在第几个八分音符上？', '7/8 を 2+2+3 に：アクセントは何番目の 8 分音符？', '7/8 grouped 2+2+3: which eighths carry the accents?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: R(260, 7, [0, 2, 4], [1, 3, 5, 6]) }],
        options: [t('第 1、3、5 个', '1・3・5 番目', '1, 3 and 5'), t('第 1、4、6 个', '1・4・6 番目', '1, 4 and 6'), t('第 1、3、6 个', '1・3・6 番目', '1, 3 and 6')],
        answer: 0,
        insight: { title: t('每组的第一个音最重', '各まとまりの最初が重い', 'Each group’s first note is strong'), text: t('2+2+3：第 1 组从 1 开始，第 2 组从 3 开始，第 3 组从 5 开始（最后一组多一个音）。', '2+2+3：1 組目は 1、2 組目は 3、3 組目は 5 から（最後の組が 1 つ長い）。', '2+2+3: group one starts on 1, group two on 3, group three on 5 (the last group is one longer).') },
      },
      {
        id: 'b12x-e12', type: 'page', ref: ['wiki-polyrhythm', 'wiki-metric-modulation'],
        title: t('进阶 8 · 同时与先后：交叉节奏和节拍调制', '発展 8・同時と前後：クロスリズムとメトリック・モジュレーション', 'Advanced 8 · At once or one after another: cross-rhythm and metric modulation'),
        text: [
          t('3 个均匀的音对 2 个（3:2）叫 hemiola；还有 4:3、5:4 等。整段都建立在这种叠加上的叫交叉节奏（cross-rhythm）。贝多芬 Op. 18 No. 6 的谐谑曲写在 3/4，一个持续的交叉节奏却"想说服我们它其实是 6/8"。', '均等な 3 音対 2 音（3:2）はヘミオラ。4:3・5:4 なども。全体がこの重なりに基づくものをクロスリズムという。ベートーヴェン Op. 18 No. 6 のスケルツォは 3/4 だが、続くクロスリズムが「本当は 6/8 だと思わせようとする」。', 'Three even notes against two (3:2) is a hemiola; there are also 4:3, 5:4 and more. When a passage is built on such layering it is a cross-rhythm. Beethoven’s Scherzo in Op. 18 No. 6 is in 3/4, yet a persistent cross-rhythm “does its best to persuade us that it is really in 6/8”.'),
          t('节拍调制是"先后"：让旧速度里的某个时值等于新速度里的某个时值，像一座桥——它前后听起来一样，作用却变了。这个名称由 Richard Franko Goldman 在评论 Elliott Carter 的大提琴奏鸣曲时提出；Carter 本人更愿意叫它 tempo modulation。', 'メトリック・モジュレーションは「前後」：旧テンポのある音価を新テンポのある音価に等しくする橋——前後で同じに聞こえるが役割が変わる。名前はリチャード・フランコ・ゴールドマンがエリオット・カーターのチェロ・ソナタを評したときに付けた。カーター自身は tempo modulation と呼ぶほうを好む。', 'Metric modulation happens in sequence: a note value in the old tempo equals one in the new, like a bridge — it sounds the same before and after but functions differently. Richard Franko Goldman coined the term reviewing Elliott Carter’s Cello Sonata; Carter preferred “tempo modulation”.'),
        ],
        visual: { kind: 'beats', rows: [{ label: '3', groups: [4, 4, 4] }, { label: '4', groups: [3, 3, 3, 3] }] },
      },
      {
        id: 'b12x-e13', type: 'discover', practice: true, ref: 'wiki-metric-modulation',
        prompt: t('♩ = 90 的 4/4 转到 6/8，八分音符不变。新的附点四分音符速度是多少？', '♩ = 90 の 4/4 から 6/8 へ、8 分音符は同じ。新しい付点 4 分のテンポは？', 'From 4/4 at ♩ = 90 to 6/8 with the eighth unchanged. What is the new dotted-quarter tempo?'),
        options: ['60', '90', '135', '45'],
        answer: 0,
        insight: { title: t('桥是八分音符', '橋は 8 分音符', 'The eighth is the bridge'), text: t('90 × 2 = 每分钟 180 个八分音符；6/8 一拍三个八分：180 ÷ 3 = 60。拍慢了，细小的脉动没变。', '90 × 2 = 毎分 180 の 8 分音符。6/8 は 1 拍に 8 分 3 つ：180 ÷ 3 = 60。拍は遅くなるが細かい脈は同じ。', '90 × 2 = 180 eighths a minute; 6/8 has three per beat: 180 ÷ 3 = 60. The beat slows; the small pulse stays.') },
      },
    ],
    experiment: [
      { id: 'b12x-x1', type: 'experiment', toy: 'poly', ref: 'wiki-polyrhythm',
        prompt: t('先听 3:2（hemiola），再换 4:3，单独静音一行听另一行。数一数：一个循环里两行一起响几次？', 'まず 3:2（ヘミオラ）、次に 4:3。1 段ずつミュートしてもう片方を聴こう。1 周で 2 段が同時に鳴るのは何回？', 'Hear 3:2 (the hemiola), then 4:3; mute one row to hear the other. How many times per cycle do the rows sound together?'),
        params: { ratios: [[3, 2], [4, 3], [2, 3], [3, 4]], bpm: 80 },
        breakthrough: { id: 'b12x-poly', text: t('你听出来了：两条节奏只在循环开头重合，中间各走各的。', '2 つのリズムは周期の頭でだけ重なり、あいだは別々に進む——聴き取れた。', 'You heard it: the two rhythms meet only at the start of the cycle and go their own ways in between.') } },
      { id: 'b12x-x2', type: 'experiment', toy: 'meter', ref: ['omt2e-simple-meter', 'omt2e-compound-meter'],
        prompt: t('在 2/4、6/8、3/8、12/8 之间切换，打开"细分"：符杠该怎么分组？哪两个拍号一拍里的十六分音符一样多？', '2/4・6/8・3/8・12/8 を切り替え、「細分」をオン：連桁はどうまとまる？ 1 拍の 16 分音符の数が同じなのはどれとどれ？', 'Switch between 2/4, 6/8, 3/8 and 12/8 with subdivision on: how should beams group? Which two meters have the same number of sixteenths per beat?'),
        params: { meters: ['2/4', '6/8', '3/8', '12/8'], bpm: 66 } },
    ],
    challenge: [
      {
        id: 'b12x-c1', type: 'choice', error: 'note-value', skills: ['calc'], ref: 'omt2e-rhythm',
        variants: [
          { prompt: t('双附点八分音符等于几个三十二分音符？', '複付点 8 分音符は 32 分音符いくつ？', 'A double-dotted eighth equals how many thirty-seconds?'), options: ['7', '6', '4', '8'] },
          { prompt: t('双附点全音符等于几个四分音符？', '複付点全音符は 4 分音符いくつ？', 'A double-dotted whole note equals how many quarters?'), options: ['7', '6', '8', '5'] },
          { prompt: t('附点二分音符加一个连在一起的四分音符，一共几拍（四分音符一拍）？', '付点 2 分音符に 4 分音符をタイでつなぐと何拍（4 分 = 1 拍）？', 'A dotted half tied to a quarter lasts how many beats (quarter = 1)?'), options: ['4', '3', '3½', '5'] },
        ],
        answer: 0,
        explain: t('附点加一半，第二个点加前一个点的一半（双附点 = 1¾ 倍）；连音线把时值加起来。', '付点で半分、2 つ目の点は前の点の半分（複付点 = 1¾ 倍）。タイは長さを足す。', 'A dot adds half, a second dot half the previous dot (double dot = 1¾×); a tie adds durations.'),
      },
      {
        id: 'b12x-c2', type: 'choice', error: 'note-value', skills: ['identify'], ref: 'omt2e-rhythm',
        variants: [
          { prompt: t('下面关于连音线的说法，哪个是对的？', 'タイについて正しいのは？', 'Which is true of ties?'), options: [t('只连同一个音高，被连过去的音不再奏', '同じ高さだけを結び、後の音は弾き直さない', 'Same pitch only; the tied-to note is not replayed'), t('可以连休止符', '休符も結べる', 'They can join rests'), t('连接不同的音，表示连贯地奏', '違う音を結び、なめらかに弾く', 'They join different pitches to mean smooth playing')] },
          { prompt: t('全休止符和二分休止符怎么区分？', '全休符と 2 分休符の見分け方は？', 'How do you tell a whole rest from a half rest?'), options: [t('全休止符挂在线下，二分休止符坐在线上', '全休符は線から下がり、2 分休符は線の上', 'The whole rest hangs below a line, the half rest sits on top'), t('全休止符坐在线上，二分休止符挂在线下', '全休符が上、2 分休符が下', 'The whole rest sits on top, the half rest hangs below'), t('全休止符有旗', '全休符には旗がある', 'The whole rest has a flag')] },
        ],
        answer: 0,
        explain: t('连音线只连同音、从不连休止符（连不同音的是圆滑线）；全休止符"重"，所以挂在线下。', 'タイは同じ音だけ、休符には使わない（違う音はスラー）。全休符は「重い」から線から下がる。', 'Ties join the same pitch and never rests (different pitches take a slur); the “heavier” whole rest hangs below the line.'),
      },
      {
        id: 'b12x-c3', type: 'choice', error: 'syncopation', skills: ['identify'], ref: 'omt2e-rhythm-more',
        variants: [
          { prompt: t('哪一种不能用来造成切分？', 'シンコペーションを作れないのは？', 'Which cannot create syncopation?'), options: [t('调号', '調号', 'A key signature'), t('连音线', 'タイ', 'A tie'), t('拍头的休止符', '拍頭の休符', 'A rest on the beat'), t('弱拍上的重音记号', '弱拍のアクセント', 'An accent on a weak beat')] },
          { prompt: t('三连音通常怎么数？', '3 連符のふつうの数え方は？', 'How are triplets usually counted?'), options: ['1-la-li', '1-e-+-a', '1-and', '1-ta'] },
        ],
        answer: 0,
        explain: t('切分来自连音线、附点、休止符和力度；三连音借复拍子的读法 1-la-li，二连音借单拍子的 1-and。', 'シンコペーションはタイ・付点・休符・強弱から。3 連符は複合拍子の 1-la-li、2 連符は単純拍子の 1-and を借りる。', 'Syncopation comes from ties, dots, rests and dynamics; triplets borrow compound counting (1-la-li), duplets simple (1-and).'),
      },
      {
        id: 'b12x-c4', type: 'listen', error: 'meter-grouping', skills: ['hearing'], ref: ['wiki-metre', 'omt2e-20c-rhythm'],
        prompt: t('听：这段不对称拍子怎么分组？', '聴いて：この非対称拍子のまとまりは？', 'Listen: how is this asymmetrical meter grouped?'),
        options: ['2+3', '3+2', '2+2+3', '3+2+2'],
        variants: [
          { play: [{ label: t('播放', '再生', 'Play'), audio: R(240, 5, [0, 2], [1, 3, 4]) }], answer: 0 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: R(240, 5, [0, 3], [1, 2, 4]) }], answer: 1 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: R(260, 7, [0, 2, 4], [1, 3, 5, 6]) }], answer: 2 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: R(260, 7, [0, 3, 5], [1, 2, 4, 6]) }], answer: 3 },
        ],
        explain: t('数重音之间有几个八分音符：每个重音开始一组。', 'アクセントの間の 8 分音符を数える：アクセントごとに 1 組。', 'Count the eighths between accents: each accent starts a group.'),
        breakthrough: { id: 'b12x-hear-aksak', text: t('你用耳朵分清了长短不一的拍。', '長さの違う拍を耳で聴き分けた。', 'You heard beats of unequal length.') },
      },
      {
        id: 'b12x-c5', type: 'choice', error: 'wrong-meter', skills: ['identify'], ref: ['omt2e-20c-rhythm', 'wiki-polyrhythm', 'wiki-metric-modulation'],
        variants: [
          { prompt: t('谱上写 3/4，听起来却一直像 6/8。这是哪一类问题？', '楽譜は 3/4 なのにずっと 6/8 に聞こえる。どういう問題？', 'Written in 3/4 but heard as 6/8 throughout. What issue is this?'), options: [t('感知拍子与记谱拍子', '知覚される拍子と記譜上の拍子', 'Perceived versus notated meter'), t('无拍子', '無拍', 'Ametric music'), t('节拍调制', 'メトリック・モジュレーション', 'Metric modulation'), t('弱起', '弱起', 'An anacrusis')] },
          { prompt: t('旧速度里的一个时值等于新速度里的一个时值，用来接到新速度。这叫？', '旧テンポの音価を新テンポの音価に等しくしてつなぐ。これは？', 'A note value in the old tempo equals one in the new, linking the tempos. This is…'), options: [t('节拍调制', 'メトリック・モジュレーション', 'Metric modulation'), t('交叉节奏', 'クロスリズム', 'Cross-rhythm'), t('变拍子', '変拍子', 'Changing meter'), t('切分', 'シンコペーション', 'Syncopation')] },
          { prompt: t('3 个均匀的音对 2 个，又叫？', '均等な 3 音対 2 音の別名は？', 'Three even notes against two is also called…'), options: ['hemiola', 'aksak', t('二连音', '2 連符', 'duplet'), 'anacrusis'] },
        ],
        answer: 0,
        explain: t('谱面和听感不一致 = 感知 vs 记谱；节拍调制是先后两个速度用一个时值连起来；3:2 = hemiola。', '楽譜と聞こえ方のずれ = 知覚 vs 記譜。メトリック・モジュレーションは前後 2 つのテンポを 1 つの音価でつなぐ。3:2 = ヘミオラ。', 'Score versus ear = perceived vs notated meter; metric modulation links two successive tempos by one value; 3:2 = hemiola.'),
      },
      {
        id: 'b12x-c6', type: 'choice', error: 'tempo-calculation', skills: ['calc'], ref: 'wiki-metric-modulation',
        variants: [
          { prompt: t('♩ = 80 的 4/4 转到 6/8，八分音符不变。新的附点四分音符 = ?', '♩ = 80 の 4/4 → 6/8、8 分音符は同じ。新しい付点 4 分 = ?', '4/4 at ♩ = 80 to 6/8, eighth unchanged. New dotted quarter = ?'), options: ['53⅓', '80', '120', '40'] },
          { prompt: t('♩ = 60，把三连音八分（一拍三个）当成新的八分（一拍两个）。新的四分 = ?', '♩ = 60、3 連 8 分（1 拍 3 つ）を新しい 8 分（1 拍 2 つ）に。新しい 4 分 = ?', '♩ = 60; the triplet eighth (three per beat) becomes the new eighth (two per beat). New quarter = ?'), options: ['90', '40', '120', '60'] },
          { prompt: t('♩ = 72，拍不变：旧四分 = 新附点四分。新的八分音符每分钟多少个？', '♩ = 72、拍は同じ：旧 4 分 = 新付点 4 分。新しい 8 分音符は毎分いくつ？', '♩ = 72 with the beat kept: old quarter = new dotted quarter. How many new eighths per minute?'), options: ['216', '144', '108', '72'] },
        ],
        answer: 0,
        explain: t('先算桥的时值每分钟有几个，再按新拍子换算：80 × 2 ÷ 3 = 53⅓；60 × 3 ÷ 2 = 90；72 × 3 = 216。', 'まず橋の音価が毎分いくつか、次に新しい拍子で換算：80 × 2 ÷ 3 = 53⅓、60 × 3 ÷ 2 = 90、72 × 3 = 216。', 'Find how many bridge values per minute, then regroup: 80 × 2 ÷ 3 = 53⅓; 60 × 3 ÷ 2 = 90; 72 × 3 = 216.'),
      },
      G('b12x-g1', 'meterClass', 1, ['identify']),
      G('b12x-g2', 'additiveMeter', 1, ['identify']),
      G('b12x-g3', 'noteValue', 1, ['calc']),
    ],
  },
  pool: [G('b12x-p1', 'noteValue', 3, ['calc']), G('b12x-p2', 'meterClass', 2, ['identify']), G('b12x-p3', 'additiveMeter', 2, ['identify'])],
};

// ===================== B1-3x 音程的计算与转位 · 扩展关 =====================
// 对应 A 面：intervals（听旋律音程 / 听和声音程 / 读谱上的音程 / 协和与不协和）、intervalqual（增减音程 / 转位 / 复音程 / 音程综合）的进阶关
const col = (ps, c) => ps.map((p) => ({ p, d: 'w', col: c }));
const EXT_B1_3 = {
  minutes: 20,
  insight: t('一个音程有两个"尺子"：字母量度数，半音量性质——两把尺子分开用，就不会被升降号骗。', '音程には 2 本の物差し：文字で度数、半音で性質。別々に使えば変化記号にだまされない。', 'An interval has two rulers: letters measure the size, half steps the quality — use them separately and accidentals cannot fool you.'),
  sections: {
    discover: [
      {
        id: 'b13x-d1', type: 'discover', ref: ['omt2e-intervals', 'omt-intervals'],
        prompt: t('C–E 是大三度。把上面的 E 再升高半音（E♯），声音和 C–F 一样。那么 C–E♯ 叫什么？', 'C–E は長 3 度。上の E を半音上げて E♯ にすると C–F と同じ音。C–E♯ は何？', 'C–E is a major third. Raise the E a half step to E♯ and it sounds like C–F. What is C–E♯ called?'),
        play: [{ label: 'C–E', audio: { notes: [[60, 64]], mode: 'chords' } }, { label: 'C–E♯', audio: { notes: [[60, 65]], mode: 'chords' } }],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['C4', 'E4'], 0), ...col(['C4', 'E#4'], 1), ...col(['C4', 'F4'], 2)], cols: 3 },
        options: [t('增三度', '増 3 度', 'An augmented third'), t('纯四度', '完全 4 度', 'A perfect fourth'), t('大四度', '長 4 度', 'A major fourth')],
        answer: 0,
        insight: {
          title: t('字母没变，度数就没变', '文字が同じなら度数も同じ', 'Same letters, same size'),
          text: t('C、D、E 三个字母 → 三度；升降号不改变度数。大三度再大半音就是增三度。它和纯四度（C–F）声音一样，写法和用法却不同。还要注意："大四度"不存在——四度只有纯、增、减。', 'C・D・E の 3 文字 → 3 度。変化記号は度数を変えない。長 3 度より半音広いのが増 3 度。完全 4 度（C–F）と同じ音でも書き方と使い方が違う。「長 4 度」は存在しない——4 度は完全・増・減だけ。', 'C, D, E — three letters → a third; accidentals never change the size. A half step wider than major is augmented. It sounds like the perfect fourth C–F but is written and used differently. And there is no “major fourth” — fourths are perfect, augmented or diminished.'),
        },
      },
    ],
    explain: [
      {
        id: 'b13x-e1', type: 'page', ref: ['omt2e-intervals', 'omt-intervals'],
        title: t('进阶 1、2 · 旋律音程与和声音程', '発展 1・2・旋律音程と和声音程', 'Advanced 1–2 · Melodic and harmonic intervals'),
        text: [
          t('两个音先后出现是旋律音程，同时出现是和声音程。不管哪一种，量法都一样：先只看字母数度数（两头都算），再数半音定性质。', '2 音が前後に鳴れば旋律音程、同時なら和声音程。どちらも測り方は同じ：まず文字だけで度数（両端を数える）、次に半音で性質。', 'Notes one after the other form a melodic interval; sounding together, a harmonic one. Either way the method is the same: count letters for the size (both ends included), then half steps for the quality.'),
          t('最简单的量法是数半音：C4 到 E4 是 4 个半音，写成 i4。但 i4 既可以是大三度（C–E），也可以是减四度（C–F♭）——半音数只说"多宽"，字母才说"几度"。', 'いちばん簡単なのは半音を数えること：C4 から E4 は半音 4 つ、i4 と書く。でも i4 は長 3 度（C–E）にも減 4 度（C–F♭）にもなる——半音数は「幅」だけ、度数は文字が決める。', 'The simplest measure is half steps: C4 to E4 is four, written i4. But i4 can be a major third (C–E) or a diminished fourth (C–F♭) — half steps give the width, letters give the size.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [{ p: 'C4', d: 'h', col: 0 }, { p: 'E4', d: 'h', col: 1 }, ...col(['C4', 'E4'], 2), ...col(['C4', 'Fb4'], 3)], cols: 4 },
      },
      {
        id: 'b13x-e2', type: 'demo', ref: 'omt-intervals',
        title: t('同一个宽度，几个名字', '同じ幅に、いくつもの名前', 'One width, several names'),
        steps: [
          { text: t('i6（6 个半音）：C–F♯ 是增四度，C–G♭ 是减五度。', 'i6（半音 6 つ）：C–F♯ は増 4 度、C–G♭ は減 5 度。', 'i6 (six half steps): C–F♯ is an augmented fourth, C–G♭ a diminished fifth.'), visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['C4', 'F#4'], 0), ...col(['C4', 'Gb4'], 1)], cols: 2 }, audio: { notes: [[60, 66], [60, 66]], mode: 'chords' } },
          { text: t('i3：C–E♭ 是小三度，C–D♯ 是增二度。i8：C–A♭ 是小六度，C–G♯ 是增五度。', 'i3：C–E♭ は短 3 度、C–D♯ は増 2 度。i8：C–A♭ は短 6 度、C–G♯ は増 5 度。', 'i3: C–E♭ is a minor third, C–D♯ an augmented second. i8: C–A♭ is a minor sixth, C–G♯ an augmented fifth.'), visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['C4', 'Eb4'], 0), ...col(['C4', 'D#4'], 1), ...col(['C4', 'Ab4'], 2), ...col(['C4', 'G#4'], 3)], cols: 4 } },
        ],
      },
      {
        id: 'b13x-e3', type: 'page', ref: 'omt2e-intervals',
        title: t('进阶 3 · 在谱上读度数，再用"大调音阶法"定性质', '発展 3・譜面で度数、「長音階法」で性質', 'Advanced 3 · Size on the staff, quality by the major-scale method'),
        text: [
          t('度数是两个音之间线和间的个数（两头都算）。同一线或同一间叫"同度"而不叫"一度"，隔八个线间叫"八度"而不叫"第八度"。都在线上或都在间里：三、五、七度；一个在线一个在间：二、四、六度。', '度数は 2 音の間の線と間の数（両端も数える）。同じ線・間は「1 度」ではなく「同度」、8 つ目は「8 度（オクターヴ）」。両方とも線か両方とも間なら 3・5・7 度、線と間なら 2・4・6 度。', 'Size is the number of lines and spaces between the notes, both ends included. The same line or space is a “unison”, not a “first”; eight lines and spaces is an “octave”. Both on lines or both in spaces: thirds, fifths, sevenths; one on a line and one in a space: seconds, fourths, sixths.'),
          t('大调音阶法：把下面的音想成大调的主音，看上面的音在不在这个大调里。在：同度、四、五、八度是纯，二、三、六、七度是大。不在：可能是小（降低的二、三、六、七度），也可能是增或减。例：E♭–C♭ 是六度，E♭ 大调里是 C 不是 C♭，所以比大六度小半音 = 小六度。', '長音階法：下の音を長調の主音と考え、上の音がその長調にあるか見る。ある：同度・4・5・8 度は完全、2・3・6・7 度は長。ない：短（下がった 2・3・6・7 度）か、増・減。例：E♭–C♭ は 6 度。E♭ 長調には C（C♭ ではない）があるので、長 6 度より半音狭い = 短 6 度。', 'Major-scale method: imagine the lower note as a major tonic and check whether the upper note is in that key. If so: unisons, fourths, fifths, octaves are perfect; seconds, thirds, sixths, sevenths major. If not: minor (a lowered 2, 3, 6, 7) or augmented / diminished. E.g. E♭–C♭ is a sixth; E♭ major has C, not C♭, so it is a half step smaller than major = a minor sixth.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['Eb4', 'C5'], 0), ...col(['Eb4', 'Cb5'], 1)], cols: 2 },
      },
      {
        id: 'b13x-e4', type: 'discover', practice: true, ref: 'omt2e-intervals',
        prompt: t('A♭–F♭ 是什么音程？（A♭ 大调有四个降号：B♭ E♭ A♭ D♭）', 'A♭–F♭ は何？（A♭ 長調は ♭ 4 つ：B♭ E♭ A♭ D♭）', 'What is A♭–F♭? (A♭ major has four flats: B♭ E♭ A♭ D♭)'),
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['Ab4', 'Fb5'], 0)], cols: 1 },
        options: [t('小六度', '短 6 度', 'Minor sixth'), t('大六度', '長 6 度', 'Major sixth'), t('减六度', '減 6 度', 'Diminished sixth'), t('增五度', '増 5 度', 'Augmented fifth')],
        answer: 0,
        insight: { title: t('不在调里，小半音', '調にない → 半音狭い', 'Not in the key → a half step smaller'), text: t('A、B、C、D、E、F → 六度；A♭ 大调里是 F，F♭ 比它低半音，所以是小六度。', 'A・B・C・D・E・F → 6 度。A♭ 長調は F、F♭ は半音低いので短 6 度。', 'A–F is a sixth; A♭ major has F, and F♭ is a half step lower, so it is a minor sixth.') },
      },
      {
        id: 'b13x-e5', type: 'page', ref: 'omt2e-intervals',
        title: t('进阶 4 · 增、减，以及倍增、倍减', '発展 4・増・減、そして重増・重減', 'Advanced 4 · Augmented, diminished — and doubly so'),
        text: [
          t('五种性质：增（A 或 +）、大、纯、小、减（d 或 °）。增 = 比纯或大大半音；减 = 比纯或小小半音。F–C 是纯五度，把上面的 C 降成 C♭：减五度，也叫三全音。也可以动下面的音：把 F 降成 F♭，F♭–C 变大半音，成了增五度。', '5 つの性質：増（A か +）・長・完全・短・減（d か °）。増 = 完全・長より半音広い、減 = 完全・短より半音狭い。F–C は完全 5 度、上の C を C♭ に：減 5 度（三全音）。下の音を動かしてもよい：F を F♭ にすると半音広がり増 5 度。', 'Five qualities: augmented (A or +), major, perfect, minor, diminished (d or °). Augmented = a half step wider than perfect or major; diminished = a half step narrower than perfect or minor. F–C is a perfect fifth; lower the C to C♭: a diminished fifth, the tritone. Or move the bottom: F♭–C is a half step wider — an augmented fifth.'),
          t('还能再往外推：比增再大半音是倍增，再大半音是三倍增；比减再小半音是倍减，再小半音是三倍减。它们很少见，但规则完全一样。', 'さらに広げられる：増より半音広いのが重増、もう半音で三重増。減より半音狭いのが重減、もう半音で三重減。まれだが規則は同じ。', 'It goes further: a half step beyond augmented is doubly augmented, then triply augmented; a half step below diminished is doubly diminished, then triply diminished. Rare, but the rule is the same.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['F4', 'C5'], 0), ...col(['F4', 'Cb5'], 1), ...col(['Fb4', 'C5'], 2), ...col(['Fb4', 'C#5'], 3)], cols: 4 },
      },
      {
        id: 'b13x-e6', type: 'discover', practice: true, ref: 'omt2e-intervals',
        prompt: t('F♭–C♯ 是什么音程？', 'F♭–C♯ は何？', 'What is F♭–C♯?'),
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['Fb4', 'C#5'], 0)], cols: 1 },
        options: [t('倍增五度', '重増 5 度', 'Doubly augmented fifth'), t('增五度', '増 5 度', 'Augmented fifth'), t('小六度', '短 6 度', 'Minor sixth')],
        answer: 0,
        insight: { title: t('两头各放大半音', '両端でそれぞれ半音広げる', 'Each end widens it a half step'), text: t('F–C 纯五度；F♭ 让它大半音（增），C♯ 再大半音（倍增）。声音和小六度一样宽，度数仍是五度。', 'F–C 完全 5 度、F♭ で半音（増）、C♯ でさらに半音（重増）。短 6 度と同じ幅でも度数は 5 度。', 'F–C is perfect; F♭ widens it (augmented), C♯ widens it again (doubly augmented). As wide as a minor sixth, still a fifth.') },
      },
      {
        id: 'b13x-e7', type: 'page', ref: ['omt2e-intervals', 'omt-intervals'],
        title: t('进阶 5、6 · 复音程与转位', '発展 5・6・複音程と転回', 'Advanced 5–6 · Compound intervals and inversion'),
        text: [
          t('同度到八度是单音程，超过八度是复音程。单音程加 7 就是对应的复音程：二 → 九、三 → 十、四 → 十一、五 → 十二、六 → 十三。性质不变：十一、十二度和八度一样是纯音程，九、十、十三度是大小音程。A–C 是小三度，把 C 移高八度就是小十度。', '同度から 8 度までが単音程、8 度を超えると複音程。単音程に 7 を足すと対応する複音程：2 → 9、3 → 10、4 → 11、5 → 12、6 → 13。性質は同じ：11・12 度は 8 度と同じく完全、9・10・13 度は長短。A–C は短 3 度、C を 1 オクターヴ上げると短 10 度。', 'Unison through octave are simple intervals; anything larger is compound. Add 7 for the compound form: 2 → 9, 3 → 10, 4 → 11, 5 → 12, 6 → 13. The quality stays: 11ths and 12ths are perfect like octaves; 9ths, 10ths, 13ths major or minor. A–C is a minor third; move the C up an octave for a minor tenth.'),
          t('转位是把两个音"翻过来"（把下面的音移高八度）。度数相加为 9：同度 ↔ 八度、二 ↔ 七、三 ↔ 六、四 ↔ 五；纯 ↔ 纯、大 ↔ 小、增 ↔ 减。半音数相加为 12：C–E（i4）+ E–C（i8）= i12。下面的音是难调甚至"假想调"的主音时，先转位再算就容易多了。', '転回は 2 音を「ひっくり返す」（下の音を 1 オクターヴ上げる）。度数の和は 9：同度 ↔ 8 度、2 ↔ 7、3 ↔ 6、4 ↔ 5。完全 ↔ 完全、長 ↔ 短、増 ↔ 減。半音数の和は 12：C–E（i4）+ E–C（i8）= i12。下の音が難しい調や「架空の調」の主音なら、転回してから考えると楽。', 'Inversion “flips” the pair (the lower note goes up an octave). Sizes add to 9: unison ↔ octave, 2 ↔ 7, 3 ↔ 6, 4 ↔ 5; perfect ↔ perfect, major ↔ minor, augmented ↔ diminished. Half steps add to 12: C–E (i4) + E–C (i8) = i12. When the lower note is the tonic of a hard or even imaginary key, invert first.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['A3', 'C4'], 0), ...col(['A3', 'C5'], 1), ...col(['C4', 'E4'], 2), ...col(['E4', 'C5'], 3)], cols: 4 },
      },
      {
        id: 'b13x-e8', type: 'discover', practice: true, ref: 'omt2e-intervals',
        prompt: t('G♯–F 是什么音程？（G♯ 大调要用重升号，可以先转位：F–G♯）', 'G♯–F は何？（G♯ 長調には 𝄪 が要る。転回して F–G♯ から）', 'What is G♯–F? (G♯ major needs a double sharp — invert to F–G♯ first)'),
        options: [t('减七度', '減 7 度', 'Diminished seventh'), t('小七度', '短 7 度', 'Minor seventh'), t('增六度', '増 6 度', 'Augmented sixth')],
        answer: 0,
        insight: { title: t('先转位：F–G♯ 是增二度', '転回：F–G♯ は増 2 度', 'Invert: F–G♯ is an augmented second'), text: t('F 大调里是 G，G♯ 大半音 → 增二度；转回去：2 + 7 = 9、增 ↔ 减 → 减七度。', 'F 長調は G、G♯ は半音広い → 増 2 度。戻すと 2 + 7 = 9、増 ↔ 減 → 減 7 度。', 'F major has G; G♯ is a half step wider → augmented second. Back again: 2 + 7 = 9, augmented ↔ diminished → diminished seventh.') },
      },
      {
        id: 'b13x-e9', type: 'page', ref: ['omt2e-intervals', 'omt2e-intro'],
        title: t('进阶 7 · 协和与不协和：三级分类和"难以捉摸的纯四度"', '発展 7・協和と不協和：3 段階と「つかみにくい完全 4 度」', 'Advanced 7 · Consonance and dissonance: three tiers and the elusive fourth'),
        text: [
          t('协和音程较稳定，好像不需要解决；不协和音程较不稳定，好像需要解决。对位里再细分：完全协和（纯一度、纯五度、纯八度）、不完全协和（大小三度、大小六度）、不协和（所有二度、七度和所有增减音程）。', '協和音程は安定し解決を求めないように聞こえ、不協和音程は不安定で解決を求めるように聞こえる。対位法ではさらに：完全協和（完全 1・5・8 度）、不完全協和（長短 3・6 度）、不協和（すべての 2・7 度と増減音程）。', 'Consonances are more stable, as if needing no resolution; dissonances less stable, as if they must resolve. Counterpoint subdivides: perfect consonances (P1, P5, P8), imperfect consonances (major and minor 3rds and 6ths), dissonances (all 2nds, 7ths and augmented or diminished intervals).'),
          t('纯四度的地位特殊：它和最低声部构成时算不协和，出现在两个上方声部之间时算协和。这些分类不是自然定律——不同时代、不同地方的理论家，对"音程"和各种性质的定义都不一样。', '完全 4 度は特別：最低声部とつくると不協和、上の 2 声部のあいだなら協和。これらの分類は自然法則ではない——時代や地域によって、理論家の「音程」や性質の定義は違ってきた。', 'The perfect fourth is special: dissonant when it involves the lowest voice, consonant between two upper voices. These categories are not laws of nature — theorists in different times and places have defined intervals and their qualities differently.'),
        ],
      },
      {
        id: 'b13x-e10', type: 'discover', practice: true, ref: 'omt2e-intro',
        prompt: t('四个声部里，女高音和女低音之间是纯四度（低音在更下面）。在对位规则里它算？', '4 声で、ソプラノとアルトのあいだが完全 4 度（バスはもっと下）。対位法の規則では？', 'In four parts, soprano and alto form a perfect fourth (the bass is lower). In counterpoint rules it counts as…'),
        options: [t('协和（不涉及最低声部）', '協和（最低声部を含まない）', 'Consonant (it does not involve the lowest voice)'), t('不协和', '不協和', 'Dissonant'), t('完全协和，和纯五度一样', '完全協和、完全 5 度と同じ', 'A perfect consonance like the fifth')],
        answer: 0,
        insight: { title: t('看它和谁构成', '誰とつくるかを見る', 'It depends on who forms it'), text: t('纯四度只有和最低声部构成时才算不协和；在两个上方声部之间算协和。', '完全 4 度が不協和になるのは最低声部とつくるときだけ。上の 2 声部のあいだなら協和。', 'A perfect fourth is dissonant only against the lowest voice; between two upper voices it is consonant.') },
      },
      {
        id: 'b13x-e11', type: 'page', ref: 'omt-pb-dictation',
        title: t('支线 · 听写：把听到的音程和旋律写下来', '支線・聴音：聞こえた音程と旋律を書きとる', 'Side quest · Dictation: writing down what you hear'),
        text: [
          t('A 面 intervals 下面挂着一个支线"听写"：老师弹一段你没见过的节奏、旋律或和弦进行，你把它写成五线谱。节奏听写可以先画点格（每个点是一拍），再用斜线记号：斜线 = 起音，横线 = 延长，圆圈 = 休止，最后翻成五线谱。边听边打拍或指挥，能听出音落在拍上还是拍外。', 'A 面の intervals には支線「聴音」がある：初めて聞くリズム・旋律・和音進行を五線譜に書く。リズム聴音はまず点のグリッド（1 点 = 1 拍）を描き、スラッシュ記譜で：スラッシュ = 発音、横線 = 伸ばす、丸 = 休符。最後に五線譜にする。拍を打つか指揮しながら聴くと、音が拍の上か外かが分かる。', 'Under A-side intervals hangs a side quest, dictation: someone plays a rhythm, melody or progression you have never seen and you write it in staff notation. For rhythm, draw a dot grid (one dot per beat), then slash notation — slashes for attacks, dashes for sustains, circles for rests — and translate to staff notation. Tap or conduct to hear whether notes land on or off the beat.'),
          t('旋律听写先写节奏，再加音高：用轮廓线标出每个音往上、往下还是同音（跳进的地方可以打个星号），或者直接写唱名，再换成五线谱上的音——这里就要用到音程：知道"上行三度"，才能从 mi 写到 sol。还有一种 protonotation（Gary Karpinski 2007 年的视唱练耳教材）：长竖线表示强拍，横线表示时值，写首调唱名，用箭头标跳进的方向。', '旋律聴音はまずリズム、次に音高：輪郭線で各音が上・下・同音かを示し（跳躍には星印）、あるいは階名を書いてから五線譜の音にする——ここで音程が要る：「3 度上」と分かれば mi から sol へ書ける。protonotation（ゲイリー・カーピンスキー 2007 年の聴音・視唱教本）もある：長い縦線が強拍、横線が長さ、移動ドの階名、跳躍は矢印で方向を示す。', 'For melody, write the rhythm first, then pitch: contour lines show whether each note goes up, down or stays (mark leaps with a star), or write solfège, then convert to notes — this is where intervals come in: knowing “up a third” takes you from mi to sol. There is also protonotation (Gary Karpinski’s 2007 ear-training manual): long vertical lines for downbeats, horizontal lines for duration, movable-do syllables, arrows for the direction of leaps.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: '1', cells: ['/', '/', '/', '—'] }, { label: '2', cells: ['↑', '↓', '↑*', '='] }] },
      },
      {
        id: 'b13x-e12', type: 'discover', practice: true, ref: ['omt-pb-dictation', 'omt2e-intervals'],
        prompt: t('听四个音（C 大调）：先画轮廓，再写唱名。哪一个对？', '4 つの音を聴こう（ハ長調）：輪郭を描き、階名を書く。正しいのは？', 'Hear four notes (C major): sketch the contour, then the syllables. Which is right?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: { notes: [60, 64, 62, 67], mode: 'melody' } }],
        options: [t('上 · 下 · 上（跳进）：do mi re sol', '上・下・上（跳躍）：do mi re sol', 'Up · down · up (leap): do mi re sol'), t('上 · 上 · 下：do re mi re', '上・上・下：do re mi re', 'Up · up · down: do re mi re'), t('下 · 上 · 上：do ti re mi', '下・上・上：do ti re mi', 'Down · up · up: do ti re mi')],
        answer: 0,
        insight: { title: t('轮廓 + 音程 = 唱名', '輪郭 + 音程 = 階名', 'Contour + intervals = syllables'), text: t('C → E 上行三度（mi），E → D 下行二度（re），D → G 上行四度跳进（sol）。', 'C → E は 3 度上（mi）、E → D は 2 度下（re）、D → G は 4 度上の跳躍（sol）。', 'C → E up a third (mi), E → D down a second (re), D → G a leap up a fourth (sol).') },
      },
    ],
    experiment: [
      { id: 'b13x-x1', type: 'experiment', toy: 'interval', ref: ['omt2e-intervals', 'omt-intervals'],
        prompt: t('从 F4–C5（纯五度）开始：把 C 改成 C♭，再把 F 改成 F♭，再把 C 改成 C♯——看性质一步步从纯变到减、增、倍增。最后把第二个音放到第 5 个八度、第一个音放到第 3 个八度，看复音程。', 'F4–C5（完全 5 度）から：C を C♭、F を F♭、C を C♯ に——性質が完全 → 減 → 増 → 重増と変わるのを見よう。最後に 2 つ目の音をオクターヴ 5、1 つ目を 3 にして複音程を見よう。', 'Start from F4–C5 (a perfect fifth): make the C a C♭, then the F an F♭, then the C a C♯ — watch the quality go perfect → diminished → augmented → doubly augmented. Then put the second note in octave 5 and the first in octave 3 for a compound interval.'),
        params: { first: { letter: 'F', alter: 0, octave: 4 }, second: { letter: 'C', alter: 0, octave: 5 } },
        breakthrough: { id: 'b13x-quality', text: t('度数一直是五度，变的只有性质：字母和半音是两把尺子。', '度数はずっと 5 度、変わるのは性質だけ：文字と半音は 2 本の物差し。', 'The size stayed a fifth the whole time; only the quality moved — letters and half steps are two rulers.') } },
    ],
    challenge: [
      {
        id: 'b13x-c1', type: 'choice', error: 'interval-quality', skills: ['identify'], ref: 'omt2e-intervals',
        variants: [
          { prompt: t('E♭–C♭ 是什么音程？', 'E♭–C♭ は何？', 'What is E♭–C♭?'), options: [t('小六度', '短 6 度', 'Minor sixth'), t('大六度', '長 6 度', 'Major sixth'), t('减六度', '減 6 度', 'Diminished sixth'), t('增五度', '増 5 度', 'Augmented fifth')] },
          { prompt: t('D–A♯ 是什么音程？', 'D–A♯ は何？', 'What is D–A♯?'), options: [t('增五度', '増 5 度', 'Augmented fifth'), t('小六度', '短 6 度', 'Minor sixth'), t('纯五度', '完全 5 度', 'Perfect fifth'), t('大五度', '長 5 度', 'Major fifth')] },
          { prompt: t('B–F 是什么音程？', 'B–F は何？', 'What is B–F?'), options: [t('减五度', '減 5 度', 'Diminished fifth'), t('纯五度', '完全 5 度', 'Perfect fifth'), t('增四度', '増 4 度', 'Augmented fourth'), t('小五度', '短 5 度', 'Minor fifth')] },
        ],
        answer: 0,
        explain: t('先数字母定度数，再用大调音阶法：上面的音不在下面音的大调里，就看它小了还是大了几个半音。五度没有"大小"，只有纯、增、减。', 'まず文字で度数、次に長音階法：上の音が下の音の長調になければ、何半音狭い・広いかを見る。5 度に長短はなく、完全・増・減だけ。', 'Count letters for the size, then use the major-scale method: if the upper note is not in the lower note’s major key, see how many half steps it is off. Fifths have no major or minor — only perfect, augmented, diminished.'),
      },
      {
        id: 'b13x-c2', type: 'choice', error: 'interval-quality', skills: ['identify'], ref: 'omt2e-intervals',
        variants: [
          { prompt: t('比增四度再大半音、度数不变的音程叫？', '増 4 度より半音広く、度数が同じ音程は？', 'A fourth a half step wider than augmented is…'), options: [t('倍增四度', '重増 4 度', 'Doubly augmented fourth'), t('纯五度', '完全 5 度', 'Perfect fifth'), t('大四度', '長 4 度', 'Major fourth'), t('三倍增四度', '三重増 4 度', 'Triply augmented fourth')] },
          { prompt: t('比减三度再小半音、度数不变的音程叫？', '減 3 度より半音狭く、度数が同じ音程は？', 'A third a half step narrower than diminished is…'), options: [t('倍减三度', '重減 3 度', 'Doubly diminished third'), t('小三度', '短 3 度', 'Minor third'), t('减二度', '減 2 度', 'Diminished second'), t('大二度', '長 2 度', 'Major second')] },
        ],
        answer: 0,
        explain: t('度数不变时，比增再大半音是倍增、比减再小半音是倍减；再往外一步是三倍增 / 三倍减。', '度数が同じなら、増より半音広いのが重増、減より半音狭いのが重減。さらに 1 歩で三重増 / 三重減。', 'With the size unchanged, a half step beyond augmented is doubly augmented, below diminished doubly diminished; one more step is triply.'),
      },
      {
        id: 'b13x-c3', type: 'choice', error: 'interval-inversion', skills: ['calc'], ref: 'omt2e-intervals',
        variants: [
          { prompt: t('增六度转位后是？', '増 6 度を転回すると？', 'An augmented sixth inverts to…'), options: [t('减三度', '減 3 度', 'A diminished third'), t('增三度', '増 3 度', 'An augmented third'), t('小三度', '短 3 度', 'A minor third'), t('减四度', '減 4 度', 'A diminished fourth')] },
          { prompt: t('大七度转位后是？', '長 7 度を転回すると？', 'A major seventh inverts to…'), options: [t('小二度', '短 2 度', 'A minor second'), t('大二度', '長 2 度', 'A major second'), t('小三度', '短 3 度', 'A minor third'), t('增二度', '増 2 度', 'An augmented second')] },
          { prompt: t('i5 转位后是几个半音？', 'i5 を転回すると半音いくつ？', 'i5 inverts to how many half steps?'), options: ['i7', 'i4', 'i5', 'i9'] },
        ],
        answer: 0,
        explain: t('度数相加为 9，大 ↔ 小、增 ↔ 减、纯 ↔ 纯；半音数相加为 12。', '度数の和は 9、長 ↔ 短・増 ↔ 減・完全 ↔ 完全。半音数の和は 12。', 'Sizes add to 9; major ↔ minor, augmented ↔ diminished, perfect ↔ perfect; half steps add to 12.'),
      },
      {
        id: 'b13x-c4', type: 'choice', error: 'interval-size', skills: ['calc'], ref: 'omt2e-intervals',
        variants: [
          { prompt: t('C4 到 G5 是什么音程？', 'C4 から G5 は何？', 'What is C4 to G5?'), options: [t('纯十二度', '完全 12 度', 'Perfect twelfth'), t('大十二度', '長 12 度', 'Major twelfth'), t('纯十一度', '完全 11 度', 'Perfect eleventh'), t('纯五度', '完全 5 度', 'Perfect fifth')] },
          { prompt: t('D4 到 E5 是什么音程？', 'D4 から E5 は何？', 'What is D4 to E5?'), options: [t('大九度', '長 9 度', 'Major ninth'), t('纯九度', '完全 9 度', 'Perfect ninth'), t('大十度', '長 10 度', 'Major tenth'), t('大二度', '長 2 度', 'Major second')] },
          { prompt: t('A3 到 F5 是什么音程？', 'A3 から F5 は何？', 'What is A3 to F5?'), options: [t('小十三度', '短 13 度', 'Minor thirteenth'), t('小六度', '短 6 度', 'Minor sixth'), t('大十三度', '長 13 度', 'Major thirteenth'), t('小十四度', '短 14 度', 'Minor fourteenth')] },
        ],
        answer: 0,
        explain: t('超过八度：单音程加 7，性质不变（十一、十二度是纯，九、十、十三度是大小）。', '8 度を超えたら単音程 + 7、性質は同じ（11・12 度は完全、9・10・13 度は長短）。', 'Beyond an octave: simple interval + 7, same quality (11ths and 12ths perfect; 9ths, 10ths, 13ths major or minor).'),
      },
      {
        id: 'b13x-c5', type: 'choice', error: 'consonance', skills: ['identify'], ref: 'omt2e-intro',
        variants: [
          { prompt: t('在对位里，大六度属于？', '対位法で長 6 度は？', 'In counterpoint, a major sixth is…'), options: [t('不完全协和', '不完全協和', 'An imperfect consonance'), t('完全协和', '完全協和', 'A perfect consonance'), t('不协和', '不協和', 'A dissonance')] },
          { prompt: t('在对位里，增四度属于？', '対位法で増 4 度は？', 'In counterpoint, an augmented fourth is…'), options: [t('不协和', '不協和', 'A dissonance'), t('不完全协和', '不完全協和', 'An imperfect consonance'), t('完全协和', '完全協和', 'A perfect consonance')] },
          { prompt: t('在对位里，和最低声部构成的纯四度属于？', '対位法で最低声部との完全 4 度は？', 'In counterpoint, a perfect fourth against the lowest voice is…'), options: [t('不协和', '不協和', 'A dissonance'), t('完全协和', '完全協和', 'A perfect consonance'), t('不完全协和', '不完全協和', 'An imperfect consonance')] },
        ],
        answer: 0,
        explain: t('完全协和：纯一、五、八度；不完全协和：三、六度；不协和：二、七度和所有增减音程；纯四度和最低声部构成时算不协和。', '完全協和：完全 1・5・8 度。不完全協和：3・6 度。不協和：2・7 度とすべての増減音程。完全 4 度は最低声部とつくると不協和。', 'Perfect consonances: P1, P5, P8; imperfect: thirds and sixths; dissonances: seconds, sevenths and all augmented or diminished intervals; a fourth against the lowest voice is dissonant.'),
      },
      G('b13x-g1', 'intervalName', 2, ['identify'], { codes: ['A4', 'd5', 'm6', 'M6', 'm7', 'M7'] }),
      G('b13x-g2', 'intervalInvert', 1, ['calc']),
      G('b13x-g3', 'intervalEar', 1, ['hearing'], { harmonic: true, codes: ['m3', 'M3', 'P4', 'P5', 'm6', 'M6'] }),
    ],
  },
  pool: [G('b13x-p1', 'intervalName', 3, ['identify']), G('b13x-p2', 'intervalInvert', 2, ['calc']), G('b13x-p3', 'consonance', 2, ['identify']), G('b13x-p4', 'intervalEar', 2, ['hearing'])],
};

// ===================== B1-4x 调号、音阶与音级功能 · 扩展关 =====================
// 对应 A 面：major（级名与唱名 / 升号与降号的顺序 / 各调的大调音阶 / 调号练习）、minor（三种小调 / 小调的级名 / 关系调与同主音调 / 小调里的和弦）的进阶关
const scaleNotes = (ps) => ps.map((p, i) => ({ p, d: 'q', col: i }));
const EXT_B1_4 = {
  minutes: 21,
  insight: t('调号只是把一个调要用的升降号集中写在前面；同一个调号永远对应一对关系大小调，要靠音乐本身（开头、结尾、导音）来分辨。', '調号はその調の変化記号を最初にまとめたもの。1 つの調号は必ず平行調の長調と短調のペアに対応し、どちらかは音楽そのもの（始まり・終わり・導音）で見分ける。', 'A key signature just gathers a key’s accidentals at the start; every signature belongs to a pair of relative keys, told apart by the music itself — first and last notes, the leading tone.'),
  sections: {
    discover: [
      {
        id: 'b14x-d1', type: 'discover', ref: 'omt2e-major-scales',
        prompt: t('看谱：上面一行是 B 大调音阶（五个升号：B C♯ D♯ E F♯ G♯ A♯），下面一行是 C♭ 大调音阶（七个降号：C♭ D♭ E♭ F♭ G♭ A♭ B♭）——每个音的字母都不一样。分别点两个播放键，比较两段的声音。', '譜を見よう：上は B 長調（♯ 5：B C♯ D♯ E F♯ G♯ A♯）、下は C♭ 長調（♭ 7：C♭ D♭ E♭ F♭ G♭ A♭ B♭）——どの音も文字が違う。2 つの再生ボタンを押して音を比べよう。', 'Look at the score: the top line is B major (five sharps: B C♯ D♯ E F♯ G♯ A♯), the bottom line C♭ major (seven flats: C♭ D♭ E♭ F♭ G♭ A♭ B♭) — every letter differs. Play both and compare the sound.'),
        play: [{ label: t('上：B 大调', '上：B 長調', 'Top: B major'), audio: { notes: [59, 61, 63, 64, 66, 68, 70, 71], mode: 'melody' } }, { label: t('下：C♭ 大调', '下：C♭ 長調', 'Bottom: C♭ major'), audio: { notes: [59, 61, 63, 64, 66, 68, 70, 71], mode: 'melody' } }],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'treble' }], notes: [...['B3', 'C#4', 'D#4', 'E4', 'F#4', 'G#4', 'A#4', 'B4'].map((p, i) => ({ p, d: 'q', s: 0, col: i })), ...['Cb4', 'Db4', 'Eb4', 'Fb4', 'Gb4', 'Ab4', 'Bb4', 'Cb5'].map((p, i) => ({ p, d: 'q', s: 1, col: i }))], cols: 8 },
        options: [t('声音完全一样：按的是同一组琴键，只是写法不同（等音调）', 'まったく同じ音：同じ鍵を押していて、書き方だけが違う（異名同音調）', 'Exactly the same: the same keys, only spelled differently (enharmonic keys)'), t('C♭ 大调低半音', 'C♭ 長調が半音低い', 'C♭ major is a half step lower'), t('B 大调更亮，因为是升号调', '♯ 系だから B 長調が明るい', 'B major is brighter because it uses sharps')],
        answer: 0,
        insight: {
          title: t('五度圈底部的三个调', '五度圏の下の 3 つ', 'The three keys at the bottom of the circle'),
          text: t('五度圈上相邻的调相差五度；从顶上的 C 顺时针每次多一个升号，逆时针每次多一个降号。转到底部（5、6、7 点钟位置）时，升号调和降号调会重叠成等音调：B 大调（五个升号）和 C♭ 大调（七个降号）写法不同、声音相同。', '五度圏で隣り合う調は 5 度違い。上の C から時計回りに ♯ が 1 つずつ、反時計回りに ♭ が 1 つずつ増える。下（5・6・7 時）では ♯ 系と ♭ 系が重なり異名同音調になる：B 長調（♯ 5）と C♭ 長調（♭ 7）は書き方が違うが音は同じ。', 'Neighbours on the circle of fifths are a fifth apart; from C at the top, clockwise adds sharps, counter-clockwise adds flats. At the bottom (5, 6 and 7 o’clock) the two sides overlap as enharmonic keys: B major (five sharps) and C♭ major (seven flats) look different and sound the same.'),
        },
      },
    ],
    explain: [
      {
        id: 'b14x-e1', type: 'page', ref: ['omt2e-major-scales', 'omt2e-minor'],
        title: t('进阶 1 · 唱名与级名：两套"名字"', '発展 1・階名と音度名：2 組の「名前」', 'Advanced 1 · Solfège and degree names: two sets of names'),
        text: [
          t('唱名 do re mi fa sol la ti 跟着音阶走：哪个调的主音都叫 do，这叫首调唱名（movable do）；另一种固定唱名（fixed do）里，do 永远是 C。小调里新出现 me、le、te，分别读作 "may"、"lay"、"tay"。', '階名 do re mi fa sol la ti は音階について動く：どの調でも主音が do——移動ド。もう一方の固定ドでは do はいつも C。短調では me・le・te が新しく出てきて、「メイ」「レイ」「テイ」と読む。', 'Solfège do re mi fa sol la ti moves with the scale: every tonic is do — movable do. In fixed do, do is always C. Minor adds me, le and te, pronounced “may”, “lay”, “tay”.'),
          t('级名：主音、上主音、中音、下属音、属音、下中音、导音。上主音是唯一带 super-（"在上方"）的名字；sub- 表示"在下方"：下属音在主音下方五度，下中音在主音下方三度。小调多一个"下主音"——主音下方全音的降七级（te）；上主音则是主音上方全音。', '音度名：主音・上主音・中音・下属音・属音・下中音・導音。super-（上）が付くのは上主音だけ。sub-（下）は「主音の下」：下属音は主音の 5 度下、下中音は 3 度下。短調には「下主音」が加わる——主音の全音下の ♭7（te）。上主音は主音の全音上。', 'Degree names: tonic, supertonic, mediant, subdominant, dominant, submediant, leading tone. The supertonic is the only “super-” (above) name; “sub-” means below the tonic: the subdominant a fifth below, the submediant a third below. Minor adds the subtonic, the lowered seventh a whole step below the tonic (te); the supertonic is a whole step above.'),
        ],
      },
      {
        id: 'b14x-e2', type: 'page', ref: 'omt2e-major-scales',
        title: t('进阶 2 · 调号的写法：顺序、形状和两个要背的调', '発展 2・調号の書き方：順番・形・覚える 2 つの調', 'Advanced 2 · Writing signatures: order, shape and two keys to memorise'),
        text: [
          t('升号顺序永远是 F C G D A E B，降号正好倒过来 B E A D G C F——两串字母互为回文，在任何谱号里都一样。调号写在谱号之后、拍号之前，调号里的升降号对所有八度都有效。', '♯ の順はいつも F C G D A E B、♭ はちょうど逆の B E A D G C F——互いに回文で、どの音部記号でも同じ。調号は音部記号の後、拍子記号の前。調号の記号はすべてのオクターヴに効く。', 'Sharps always enter F C G D A E B; flats exactly the reverse, B E A D G C F — palindromes of each other, in every clef. The signature goes after the clef and before the time signature, and applies in every octave.'),
          t('形状：降号总是完整的"之"字形（一上一下）。升号也是"之"字形，但在高音、低音、中音谱号里写到 D♯ 后会断开一下再继续；次中音谱号不断开，只是 F♯、G♯ 写在低一个八度。认调：升号调最后一个升号往上半音是主音；降号调倒数第二个降号就是主音。C 大调（无升降）和 F 大调（一个降号 B♭）没有窍门，直接记；C♭ 大调七个降号，C♯ 大调七个升号。', '形：♭ はいつも完全なジグザグ（上下交互）。♯ もジグザグだが、ト音・ヘ音・アルト記号では D♯ の後でいったん崩れてまた続く。テノール記号では崩れないが、F♯ と G♯ が下のオクターヴに書かれる。調の見分け方：♯ 系は最後の ♯ の半音上が主音、♭ 系は最後から 2 つ目の ♭ が主音。C 長調（なし）と F 長調（♭ 1 つ）はそのまま覚える。C♭ 長調は ♭ 7 つ、C♯ 長調は ♯ 7 つ。', 'Shape: flats always make a perfect zig-zag. Sharps zig-zag too, but in treble, bass and alto clefs the pattern breaks after D♯ and resumes; in tenor clef it does not break, but F♯ and G♯ sit an octave lower. Naming: in sharp keys the tonic is a half step above the last sharp; in flat keys it is the second-to-last flat. C major (nothing) and F major (one flat, B♭) have no trick — memorise them; C♭ major has seven flats, C♯ major seven sharps.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: '♯', cells: ['F', 'C', 'G', 'D', 'A', 'E', 'B'] }, { label: '♭', cells: ['B', 'E', 'A', 'D', 'G', 'C', 'F'] }] },
      },
      {
        id: 'b14x-e3', type: 'discover', practice: true, ref: 'omt2e-major-scales',
        prompt: t('调号最后一个升号是 E♯。这是哪个大调？', '調号の最後の ♯ が E♯。何長調？', 'The last sharp of a signature is E♯. Which major key?'),
        options: [t('F♯ 大调', 'F♯ 長調', 'F♯ major'), t('F 大调', 'F 長調', 'F major'), t('E 大调', 'E 長調', 'E major'), t('B 大调', 'B 長調', 'B major')],
        answer: 0,
        insight: { title: t('往上半音', '半音上', 'A half step up'), text: t('E♯ 往上半音是 F♯（不是 F——字母要往下一个）。六个升号：F♯ 大调。', 'E♯ の半音上は F♯（F ではない——文字は次へ）。♯ 6 つ：F♯ 長調。', 'A half step above E♯ is F♯ (not F — move to the next letter). Six sharps: F♯ major.') },
      },
      {
        id: 'b14x-e4', type: 'page', ref: 'omt2e-major-scales',
        title: t('进阶 3、4 · 写任何调的音阶，和"假想调"', '発展 3・4・どの調の音階も書ける、そして「架空の調」', 'Advanced 3–4 · Writing any scale, and imaginary keys'),
        text: [
          t('大调永远是 W W H W W W H，用开头那个音（连同升降号）命名：从 B♭ 开始是 B♭ 大调，不是 B 大调。写法：先写七个连续的字母，再加升降号让台阶对上。', '長音階はいつも W W H W W W H、始まりの音（臨時記号ごと）で呼ぶ：B♭ から始まれば B♭ 長調で、B 長調ではない。書き方：連続する 7 文字を書き、変化記号で段差を合わせる。', 'Major is always W W H W W W H, named after its first note including any accidental: starting on B♭ it is B♭ major, not B major. Method: write seven consecutive letters, then add accidentals until the steps fit.'),
          t('能写成一个调号的调叫"真实调"（C 到 C♯、C 到 C♭ 这 15 个）；如果调号需要重升或重降，就是"假想调"。F♭ 大调就是假想调：它的调号需要 B𝄫。小调也可能是假想调。偶尔真的会在乐曲里遇到假想调。', '1 つの調号で書ける調は「実在の調」（C〜C♯、C〜C♭ の 15 調）。調号に 𝄪 や 𝄫 が要るなら「架空の調」。F♭ 長調は架空の調：調号に B𝄫 が必要。短調も架空になりうる。曲の中で実際に出会うこともある。', 'Keys that fit a key signature are “real” (the 15 from C to C♯ and C to C♭); if the signature would need a double sharp or flat, the key is “imaginary”. F♭ major is imaginary — it would need B𝄫. Minor keys can be imaginary too, and you do occasionally meet them in music.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: scaleNotes(['Fb4', 'Gb4', 'Ab4', 'Bbb4', 'Cb5', 'Db5', 'Eb5', 'Fb5']), cols: 8 },
      },
      {
        id: 'b14x-e5', type: 'discover', practice: true, ref: 'omt2e-major-scales',
        prompt: t('下面哪个大调是"假想调"？', '「架空の調」はどれ？', 'Which major key is imaginary?'),
        options: [t('D♯ 大调', 'D♯ 長調', 'D♯ major'), t('C♯ 大调', 'C♯ 長調', 'C♯ major'), t('G♭ 大调', 'G♭ 長調', 'G♭ major'), t('C♭ 大调', 'C♭ 長調', 'C♭ major')],
        answer: 0,
        insight: { title: t('超过七个就要重升', '7 つを超えたら 𝄪', 'Past seven you need doubles'), text: t('D♯ 大调要 D♯ E♯ F𝄪 G♯ A♯ B♯ C𝄪：调号得写重升，所以是假想调（它的等音调是 E♭ 大调）。C♯、C♭ 是最远的真实调。', 'D♯ 長調は D♯ E♯ F𝄪 G♯ A♯ B♯ C𝄪：調号に 𝄪 が要るので架空（異名同音調は E♭ 長調）。C♯・C♭ がいちばん遠い実在の調。', 'D♯ major needs D♯ E♯ F𝄪 G♯ A♯ B♯ C𝄪 — double sharps in the signature, so it is imaginary (its enharmonic is E♭ major). C♯ and C♭ are the farthest real keys.') },
      },
      {
        id: 'b14x-e6', type: 'page', ref: 'omt2e-minor',
        title: t('进阶 5 · 三种小调：是"口味"，不是三个调', '発展 5・3 つの短音階：「味」であって 3 つの調ではない', 'Advanced 5 · Three minors: flavours, not three keys'),
        text: [
          t('小调的第三音总比同名大调低半音。三种小调像冰淇淋的口味：一首作品只说"在 A 小调"，不说"在和声小调"；小调的调号永远按自然小调写。三种形式主要是给演奏者练习用的，让手指熟悉古典音乐里最常见的小调写法。', '短調の第 3 音はいつも同名長調より半音低い。3 つの短音階はアイスクリームの味のようなもの：曲は「イ短調」と言い、「和声的短音階で」とは言わない。短調の調号はいつも自然短音階で書く。3 つの形は主に演奏者の練習用で、古典音楽でよく使われる短調の型に指を慣らすため。', 'A minor scale’s third is always a half step below the same-named major’s. The three minors are like ice-cream flavours: a piece is simply “in A minor”, never “in harmonic minor”, and minor signatures always follow natural minor. The three forms are mainly for performers, to learn the minor patterns most used in classical music.'),
          t('和同名大调比，降低的音：自然小调 3 个（3、6、7）、和声小调 2 个（3、6）、旋律小调上行 1 个（3）；旋律小调下行和自然小调一样。和声小调第 6、7 音之间是三个半音（3Hs）。', '同名長調と比べて下がる音：自然短音階 3 つ（3・6・7）、和声的 2 つ（3・6）、旋律的上行 1 つ（3）。旋律的下行は自然短音階と同じ。和声的短音階の第 6・7 音の間は半音 3 つ（3Hs）。', 'Lowered degrees compared with the same-named major: natural minor three (3, 6, 7), harmonic two (3, 6), ascending melodic one (3); descending melodic equals natural. In harmonic minor, degrees 6–7 span three half steps (3Hs).'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: scaleNotes(['A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G#5', 'A5']), cols: 8 },
      },
      {
        id: 'b14x-e7', type: 'demo', ref: 'omt2e-minor',
        title: t('进阶 6 · 结尾的"关门声"：ti–do', '発展 6・終わりの「閉まる音」：ti–do', 'Advanced 6 · The closing click: ti–do'),
        steps: [
          { text: t('自然小调唱到结尾，没有大调那种"关上门"的感觉——大调的终止感有一部分来自 ti 到 do 的上行半音。自然小调结尾是 te–do，差一个全音。', '自然短音階を最後まで歌うと、長調のような「閉まる」感じがない——長調の終止感の一部は ti から do への上行半音から来る。自然短音階の終わりは te–do、全音。', 'Sing natural minor to the end and the “door-closing” feeling of major is missing — major’s closure comes partly from the rising half step ti–do. Natural minor ends te–do, a whole step.'), audio: { notes: [69, 71, 72, 74, 76, 77, 79, 81], mode: 'melody' } },
          { text: t('和声小调把第七音升成 ti（导音），结尾又有了半音：G♯–A。这个导音从主音下方全音的"下主音"变成了下方半音的"导音"。', '和声的短音階は第 7 音を ti（導音）に上げ、終わりにまた半音ができる：G♯–A。主音の全音下の「下主音」が半音下の「導音」になる。', 'Harmonic minor raises the seventh to ti, the leading tone, and the final half step returns: G♯–A. The subtonic a whole step below becomes a leading tone a half step below.'), audio: { notes: [69, 71, 72, 74, 76, 77, 80, 81], mode: 'melody' } },
          { text: t('旋律小调上行用 la、ti（有终止感），下行改用 le、te，和自然小调一样。', '旋律的短音階は上行で la・ti（終止感あり）、下行では le・te、自然短音階と同じ。', 'Melodic minor uses la and ti going up (closure), le and te coming down, like natural minor.'), audio: { notes: [69, 71, 72, 74, 76, 78, 80, 81, 79, 77, 76, 74, 72, 71, 69], mode: 'melody' } },
        ],
      },
      {
        id: 'b14x-e8', type: 'discover', practice: true, ref: 'omt2e-minor',
        prompt: t('B 旋律小调下行时，第七级叫什么？', 'B 旋律的短音階の下行で、第 7 音の名前は？', 'Descending B melodic minor: what is the seventh degree called?'),
        options: [t('下主音（A，te）', '下主音（A、te）', 'The subtonic (A, te)'), t('导音（A♯，ti）', '導音（A♯、ti）', 'The leading tone (A♯, ti)'), t('上主音', '上主音', 'The supertonic')],
        answer: 0,
        insight: { title: t('上行导音，下行下主音', '上行は導音、下行は下主音', 'Leading tone up, subtonic down'), text: t('旋律小调上行用导音 A♯，下行用下主音 A——下行和自然小调一样。', '旋律的短音階は上行で導音 A♯、下行で下主音 A——下行は自然短音階と同じ。', 'Melodic minor uses the leading tone A♯ going up and the subtonic A coming down — like natural minor.') },
      },
      {
        id: 'b14x-e9', type: 'page', ref: 'omt2e-minor',
        title: t('进阶 7 · 关系调与同主音调的陷阱', '発展 7・平行調と同主調の落とし穴', 'Advanced 7 · Traps with relative and parallel keys'),
        text: [
          t('关系调共用调号：小调主音在关系大调主音下方三个半音。注意：升号调不能和降号调成为关系调，所以要选对等音名。D♭ 大调（五个降号）往下三个半音可以写成 B♭ 或 A♯，但只有 B♭ 小调（五个降号）是它的关系小调——A♯ 小调有七个升号。同主音调共用主音（C 大调 ↔ C 小调）。', '平行調（relative）は調号を共有：短調の主音は長調の主音の半音 3 つ下。♯ 系と ♭ 系は平行調になれないので、正しい異名を選ぶ。D♭ 長調（♭ 5）の半音 3 つ下は B♭ とも A♯ とも書けるが、平行調は B♭ 短調（♭ 5）だけ——A♯ 短調は ♯ 7。同主調（parallel）は主音を共有（C 長調 ↔ C 短調）。', 'Relative keys share a signature: the minor tonic is three half steps below the relative major’s. A sharp key can never be relative to a flat key, so pick the right spelling: three half steps below D♭ major (five flats) could be B♭ or A♯, but only B♭ minor (five flats) is its relative — A♯ minor has seven sharps. Parallel keys share a tonic (C major ↔ C minor).'),
          t('看到调号只能缩小到两个调：一个大调和它的关系小调。再看第一个和最后一个音——乐曲常在主音上开始和结束。Louise Reichardt 的歌曲《Durch die bunten Rosenhecken》有四个降号：不是 A♭ 大调就是 F 小调，要看旋律从哪里开始、在哪里结束。', '調号だけでは 2 つに絞れるだけ：長調とその平行短調。そこで最初と最後の音を見る——曲は主音で始まり主音で終わることが多い。ルイーゼ・ライヒャルトの歌曲《Durch die bunten Rosenhecken》は ♭ 4 つ：A♭ 長調か F 短調で、旋律の始まりと終わりで判断する。', 'A signature narrows things to two keys: a major and its relative minor. Then check the first and last notes — pieces often start and end on the tonic. Louise Reichardt’s song “Durch die bunten Rosenhecken” has four flats: A♭ major or F minor, decided by where the melody starts and ends.'),
        ],
        visual: { kind: 'circle', highlight: ['D♭'], inner: ['B♭'] },
      },
      {
        id: 'b14x-e10', type: 'page', ref: 'omt2e-roman-numerals',
        title: t('进阶 8 · 升高导音改变了 V、vii 和它们的七和弦', '発展 8・導音を上げると V・vii とその七の和音が変わる', 'Advanced 8 · Raising the leading tone changes V, vii and their sevenths'),
        text: [
          t('小调的三和弦：i、ii°、III、iv、v、VI、VII。升高导音后，v 变成大三和弦 V，VII 变成减三和弦 vii°。所以小调里 v / V、VII / vii° 两种都会出现，取决于导音有没有升高。', '短調の三和音：i・ii°・III・iv・v・VI・VII。導音を上げると v は長三和音 V、VII は減三和音 vii° になる。短調では導音を上げるかどうかで v / V、VII / vii° の両方が出てくる。', 'Minor-key triads: i, ii°, III, iv, v, VI, VII. Raise the leading tone and v becomes the major V, VII the diminished vii°. So minor uses both v / V and VII / vii°, depending on whether the leading tone is raised.'),
          t('七和弦也一样：自然的 v⁷ 是小七和弦，升高导音后是属七和弦 V⁷；自然的 VII⁷ 是属七和弦，升高导音后是减七和弦 vii°⁷。小调的 ii 是半减七和弦 iiø⁷。', '七の和音も同じ：自然のままの v⁷ は短七、導音を上げると属七 V⁷。自然の VII⁷ は属七、導音を上げると減七 vii°⁷。短調の ii は半減七 iiø⁷。', 'Sevenths too: natural v⁷ is a minor seventh, raised it becomes the dominant seventh V⁷; natural VII⁷ is a dominant seventh, raised it becomes the diminished seventh vii°⁷. Minor’s ii is half-diminished, iiø⁷.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...['E4', 'G4', 'B4'].map((p) => ({ p, d: 'w', col: 0 })), ...['E4', 'G#4', 'B4'].map((p) => ({ p, d: 'w', col: 1, lit: true })), ...['G4', 'B4', 'D5'].map((p) => ({ p, d: 'w', col: 2 })), ...['G#4', 'B4', 'D5'].map((p) => ({ p, d: 'w', col: 3, lit: true }))], cols: 4 },
      },
      {
        id: 'b14x-e11', type: 'discover', practice: true, ref: 'omt2e-roman-numerals',
        prompt: t('D 小调里，用升高的导音，vii°⁷ 是哪四个音？', 'ニ短調で導音を上げた vii°⁷ の 4 音は？', 'In D minor with the raised leading tone, vii°⁷ is…'),
        options: ['C♯ E G B♭', 'C E G B♭', 'C♯ E G♯ B', 'C♯ E G B'],
        answer: 0,
        insight: { title: t('导音上叠小三度', '導音から短 3 度を重ねる', 'Stack minor thirds on the leading tone'), text: t('D 小调导音 C♯；C♯–E–G–B♭ 每层都是小三度，七音 B♭ 来自调号（le）：减七和弦。', 'ニ短調の導音は C♯。C♯–E–G–B♭ はすべて短 3 度、第 7 音 B♭ は調号から（le）：減七。', 'D minor’s leading tone is C♯; C♯–E–G–B♭ stacks minor thirds, the seventh B♭ coming from the signature (le): a diminished seventh.') },
      },
    ],
    experiment: [
      { id: 'b14x-x1', type: 'experiment', toy: 'keyChords', ref: ['omt2e-roman-numerals', 'omt2e-minor'],
        prompt: t('切到几个小调，打开七和弦：找出 V⁷ 和 vii°⁷——它们都用了哪个升高的音？再盯住 E 大三和弦，看它在哪些调里出现。', 'いくつかの短調に切り替え、七の和音をオンに：V⁷ と vii°⁷ はどの上げた音を使っている？ 次に E の長三和音に注目し、どの調に出てくるか見よう。', 'Switch to a few minor keys and turn on sevenths: which raised note do V⁷ and vii°⁷ share? Then watch the E major triad and see which keys contain it.'),
        params: { keys: [['A', 'minor'], ['D', 'minor'], ['E', 'minor'], ['C', 'minor'], ['A', 'major'], ['E', 'major'], ['C', 'major'], ['G', 'major']], watch: ['E', 'G♯°', 'E7'] },
        breakthrough: { id: 'b14x-raised', text: t('你看到了：小调的 V 和 vii° 都靠同一个升高的导音。', '短調の V と vii° は同じ上げた導音に頼っている——見えた。', 'You saw it: minor’s V and vii° both rely on the same raised leading tone.') } },
      { id: 'b14x-x2', type: 'experiment', toy: 'scale', ref: ['omt2e-major-scales', 'omt2e-minor'],
        prompt: t('换几个主音，比较大调和三种小调：数一数和大调相比各降低了几个音（自然 3、和声 2、旋律上行 1）。', '主音を替えて長調と 3 つの短音階を比べ、長調より下がった音の数を数えよう（自然 3・和声 2・旋律上行 1）。', 'Try several tonics and compare major with the three minors: count how many degrees are lowered (natural 3, harmonic 2, ascending melodic 1).'),
        params: { sets: [
          { id: 'major', label: t('大调', '長調', 'Major'), steps: [0, 2, 4, 5, 7, 9, 11] },
          { id: 'natural', label: t('自然小调', '自然短音階', 'Natural minor'), steps: [0, 2, 3, 5, 7, 8, 10] },
          { id: 'harmonic', label: t('和声小调', '和声的短音階', 'Harmonic minor'), steps: [0, 2, 3, 5, 7, 8, 11], mark: 6, markNote: t('升高的第七音（导音）', '上げた第 7 音（導音）', 'the raised seventh (leading tone)'), noKey: true },
          { id: 'melodic', label: t('旋律小调（上行）', '旋律的短音階（上行）', 'Melodic minor (ascending)'), steps: [0, 2, 3, 5, 7, 9, 11], noKey: true },
        ] } },
    ],
    challenge: [
      {
        id: 'b14x-c1', type: 'choice', error: 'key-signature', skills: ['identify'], ref: 'omt2e-major-scales',
        variants: [
          { prompt: t('调号倒数第二个降号是 G♭。这是哪个大调？', '最後から 2 つ目の ♭ が G♭。何長調？', 'The second-to-last flat is G♭. Which major key?'), options: [t('G♭ 大调', 'G♭ 長調', 'G♭ major'), t('D♭ 大调', 'D♭ 長調', 'D♭ major'), t('C♭ 大调', 'C♭ 長調', 'C♭ major'), t('F 大调', 'F 長調', 'F major')] },
          { prompt: t('调号最后一个升号是 B♯。这是哪个大调？', '最後の ♯ が B♯。何長調？', 'The last sharp is B♯. Which major key?'), options: [t('C♯ 大调', 'C♯ 長調', 'C♯ major'), t('C 大调', 'C 長調', 'C major'), t('B 大调', 'B 長調', 'B major'), t('F♯ 大调', 'F♯ 長調', 'F♯ major')] },
          { prompt: t('一个降号的调号是哪个大调？', '♭ 1 つの調号は何長調？', 'One flat is which major key?'), options: [t('F 大调', 'F 長調', 'F major'), t('B♭ 大调', 'B♭ 長調', 'B♭ major'), t('C 大调', 'C 長調', 'C major'), t('E♭ 大调', 'E♭ 長調', 'E♭ major')] },
        ],
        answer: 0,
        explain: t('降号调：倒数第二个降号是主音；升号调：最后一个升号往上半音（换到下一个字母）；F 大调一个降号要直接记。', '♭ 系：最後から 2 つ目の ♭ が主音。♯ 系：最後の ♯ の半音上（次の文字）。F 長調の ♭ 1 つはそのまま覚える。', 'Flat keys: the second-to-last flat is the tonic; sharp keys: a half step above the last sharp (next letter); F major’s single flat is memorised.'),
      },
      {
        id: 'b14x-c2', type: 'choice', error: 'key-relation', skills: ['calc'], ref: 'omt2e-minor',
        variants: [
          { prompt: t('G♭ 大调（六个降号）的关系小调是？', 'G♭ 長調（♭ 6）の平行短調は？', 'The relative minor of G♭ major (six flats) is…'), options: [t('E♭ 小调', 'E♭ 短調', 'E♭ minor'), t('D♯ 小调', 'D♯ 短調', 'D♯ minor'), t('G♭ 小调', 'G♭ 短調', 'G♭ minor'), t('B♭ 小调', 'B♭ 短調', 'B♭ minor')] },
          { prompt: t('B 大调（五个升号）的关系小调是？', 'B 長調（♯ 5）の平行短調は？', 'The relative minor of B major (five sharps) is…'), options: [t('G♯ 小调', 'G♯ 短調', 'G♯ minor'), t('A♭ 小调', 'A♭ 短調', 'A♭ minor'), t('B 小调', 'B 短調', 'B minor'), t('E 小调', 'E 短調', 'E minor')] },
          { prompt: t('F 小调的同主音大调有几个降号？', 'ヘ短調の同主長調は ♭ いくつ？', 'How many flats has the parallel major of F minor?'), options: ['1', '4', '0', '3'] },
        ],
        answer: 0,
        explain: t('关系小调：往下三个半音，并选和大调同一类（升 / 降）的拼法；同主音调主音相同：F 大调一个降号。', '平行短調：半音 3 つ下、長調と同じ系統（♯ / ♭）の綴りを選ぶ。同主調は主音が同じ：F 長調は ♭ 1 つ。', 'Relative minor: three half steps down, spelled in the same family (sharps or flats) as the major; parallel keys share the tonic: F major has one flat.'),
      },
      {
        id: 'b14x-c3', type: 'choice', error: 'scale-degree', skills: ['function'], ref: ['omt2e-major-scales', 'omt2e-minor'],
        variants: [
          { prompt: t('E 自然小调里的 D 叫什么？', 'ホ短調（自然）の D の名前は？', 'In E natural minor, D is the…'), options: [t('下主音', '下主音', 'Subtonic'), t('导音', '導音', 'Leading tone'), t('下中音', '下中音', 'Submediant'), t('上主音', '上主音', 'Supertonic')] },
          { prompt: t('哪个级名是唯一带"上方"（super-）的？', 'super-（上）が付く唯一の音度名は？', 'Which is the only “super-” degree name?'), options: [t('上主音', '上主音', 'Supertonic'), t('下中音', '下中音', 'Submediant'), t('属音', '属音', 'Dominant'), t('下属音', '下属音', 'Subdominant')] },
          { prompt: t('首调唱名里，E♭ 大调的 do 是哪个音？', '移動ドで E♭ 長調の do は？', 'In movable do, what is do in E♭ major?'), options: ['E♭', 'C', 'B♭', 'G'] },
        ],
        answer: 0,
        explain: t('下主音 = 主音下方全音（te）；上主音是唯一的 super-；首调唱名里每个调的主音都叫 do。', '下主音 = 主音の全音下（te）。super- は上主音だけ。移動ドではどの調でも主音が do。', 'Subtonic = a whole step below the tonic (te); the supertonic is the only “super-”; in movable do every tonic is do.'),
      },
      {
        id: 'b14x-c4', type: 'choice', error: 'key-signature', skills: ['identify'], ref: 'omt2e-major-scales',
        variants: [
          { prompt: t('下面哪个是"假想调"？', '「架空の調」は？', 'Which key is imaginary?'), options: [t('G♯ 大调', 'G♯ 長調', 'G♯ major'), t('F♯ 大调', 'F♯ 長調', 'F♯ major'), t('D♭ 大调', 'D♭ 長調', 'D♭ major'), t('C♯ 大调', 'C♯ 長調', 'C♯ major')] },
          { prompt: t('五度圈底部，和 C♯ 大调（七个升号）等音的是？', '五度圏の下で、C♯ 長調（♯ 7）と異名同音の調は？', 'At the bottom of the circle, the enharmonic of C♯ major (seven sharps) is…'), options: [t('D♭ 大调（五个降号）', 'D♭ 長調（♭ 5）', 'D♭ major (five flats)'), t('C♭ 大调', 'C♭ 長調', 'C♭ major'), t('B 大调', 'B 長調', 'B major'), t('G♭ 大调', 'G♭ 長調', 'G♭ major')] },
        ],
        answer: 0,
        explain: t('调号需要重升或重降的是假想调（G♯ 大调要 F𝄪）；五度圈底部三个调号两两等音。', '調号に 𝄪 / 𝄫 が要るのが架空の調（G♯ 長調は F𝄪）。五度圏の下の 3 つは異名同音のペア。', 'A key needing doubles in its signature is imaginary (G♯ major needs F𝄪); the bottom three signatures pair up enharmonically.'),
      },
      {
        id: 'b14x-c5', type: 'choice', error: 'wrong-chord', skills: ['function'], ref: 'omt2e-roman-numerals',
        variants: [
          { prompt: t('C 小调里不升高导音，v⁷ 是什么七和弦？', 'ハ短調で導音を上げないとき、v⁷ は？', 'In C minor without the raised leading tone, v⁷ is a…'), options: [t('小七和弦（G B♭ D F）', '短七（G B♭ D F）', 'minor seventh (G B♭ D F)'), t('属七和弦（G B D F）', '属七（G B D F）', 'dominant seventh (G B D F)'), t('减七和弦', '減七', 'diminished seventh')] },
          { prompt: t('G 小调里，升高导音后的 V 是哪三个音？', 'ト短調で導音を上げた V の 3 音は？', 'In G minor, V with the raised leading tone is…'), options: ['D F♯ A', 'D F A', 'F A C', 'D F♯ A♯'] },
          { prompt: t('小调的 ii 级七和弦是？', '短調の ii の七の和音は？', 'The ii seventh chord in minor is…'), options: [t('半减七和弦 iiø⁷', '半減七 iiø⁷', 'half-diminished, iiø⁷'), t('小七和弦 ii⁷', '短七 ii⁷', 'minor seventh, ii⁷'), t('减七和弦 ii°⁷', '減七 ii°⁷', 'diminished seventh, ii°⁷')] },
        ],
        answer: 0,
        explain: t('自然小调的 v⁷ 是小七和弦，升高导音才是 V⁷；V 的三音就是导音；ii 级是半减七。', '自然短音階の v⁷ は短七、導音を上げて V⁷。V の第 3 音が導音。ii は半減七。', 'Natural-minor v⁷ is a minor seventh; raise the leading tone for V⁷; V’s third is the leading tone; ii is half-diminished.'),
      },
      G('b14x-g1', 'keySignature', 1, ['identify']),
      G('b14x-g2', 'relativeParallel', 1, ['calc']),
      G('b14x-g3', 'minorScale', 1, ['spell']),
      G('b14x-g4', 'majorDegree', 1, ['function']),
    ],
  },
  pool: [G('b14x-p1', 'keySignature', 3, ['identify']), G('b14x-p2', 'relativeParallel', 2, ['calc']), G('b14x-p3', 'minorScale', 2, ['spell']), G('b14x-p4', 'majorDegree', 2, ['function'])],
};

// ===================== B1-5x 调式 · 扩展关 =====================
// 对应 A 面：modes（特征音 / 听辨 / 明暗阶梯 / 调式配和弦）、modes2（Aeolian 的 ♭VI 与 ♭VII / Dorian 的大 IV / Lydian 的 II♯ / 用耳朵分辨）的进阶关
const MODE_SETS = [
  { id: 'lydian', label: t('Lydian（利底亚）', 'リディア', 'Lydian'), steps: [0, 2, 4, 6, 7, 9, 11], mark: 3, markNote: t('fi：升高的第四音', 'fi：上げた第 4 音', 'fi: raised 4'), noKey: true },
  { id: 'ionian', label: t('Ionian（大调）', 'イオニア（長調）', 'Ionian (major)'), steps: [0, 2, 4, 5, 7, 9, 11], noKey: true },
  { id: 'mixolydian', label: t('Mixolydian（混合利底亚）', 'ミクソリディア', 'Mixolydian'), steps: [0, 2, 4, 5, 7, 9, 10], mark: 6, markNote: t('te：降低的第七音', 'te：下げた第 7 音', 'te: lowered 7'), noKey: true },
  { id: 'dorian', label: t('Dorian（多利亚）', 'ドリア', 'Dorian'), steps: [0, 2, 3, 5, 7, 9, 10], mark: 5, markNote: t('la：比自然小调高的第六音', 'la：自然短音階より高い第 6 音', 'la: 6 raised from natural minor'), noKey: true },
  { id: 'aeolian', label: t('Aeolian（自然小调）', 'エオリア（自然短音階）', 'Aeolian (natural minor)'), steps: [0, 2, 3, 5, 7, 8, 10], noKey: true },
  { id: 'phrygian', label: t('Phrygian（弗里几亚）', 'フリギア', 'Phrygian'), steps: [0, 1, 3, 5, 7, 8, 10], mark: 1, markNote: t('ra：降低的第二音', 'ra：下げた第 2 音', 'ra: lowered 2'), noKey: true },
  { id: 'locrian', label: t('Locrian（洛克里亚）', 'ロクリア', 'Locrian'), steps: [0, 1, 3, 5, 6, 8, 10], mark: 4, markNote: t('se：降低的第五音', 'se：下げた第 5 音', 'se: lowered 5'), noKey: true },
];
// 低音 + 密集三和弦（C 调为主音）
const TRI = { C: [36, 60, 64, 67], Cm: [36, 60, 63, 67], 'B♭': [46, 58, 62, 65], F: [41, 60, 65, 69], Fm: [41, 60, 65, 68], 'A♭': [44, 60, 63, 68], D: [38, 62, 66, 69], Gm: [43, 58, 62, 67], G: [43, 59, 62, 67] };
const prog = (...names) => ({ notes: names.map((n) => TRI[n]), mode: 'chords' });
const EXT_B1_5 = {
  minutes: 22,
  insight: t('调式不只是"换个音阶"：在流行音乐里，一个调式靠一两个和弦（♭VII、大 IV、II♯）就能被听出来——关键是那个与大调或小调不同的特征音。', '旋法は「音階を替える」だけではない。ポップスでは ♭VII・長い IV・II♯ のような 1〜2 個の和音で旋法が聞こえる——鍵は長調・短調と違う特性音。', 'A mode is more than a different scale: in pop music one or two chords — ♭VII, a major IV, II♯ — make it audible, thanks to the one colour note that differs from major or minor.'),
  sections: {
    discover: [
      {
        id: 'b15x-d1', type: 'discover', ref: 'omt-pb-modal-schemas',
        prompt: t('两个循环都从 C 小三和弦出发。A：Cm – F（大三）；B：Cm – Fm（小三）。哪一个是 Dorian？', '2 つのループはどちらも C の短三和音から。A：Cm – F（長三）、B：Cm – Fm（短三）。ドリアはどっち？', 'Both loops start on C minor. A: Cm – F (major); B: Cm – Fm (minor). Which one is Dorian?'),
        play: [{ label: 'A：Cm – F', audio: prog('Cm', 'F', 'Cm', 'F') }, { label: 'B：Cm – Fm', audio: prog('Cm', 'Fm', 'Cm', 'Fm') }],
        options: [t('A：小主和弦 + 大 IV', 'A：短い主和音 + 長い IV', 'A: minor tonic + major IV'), t('B：小主和弦 + 小 iv', 'B：短い主和音 + 短い iv', 'B: minor tonic + minor iv'), t('两个都是 Dorian', 'どちらもドリア', 'Both are Dorian')],
        answer: 0,
        insight: {
          title: t('一个 A♮ 就够了', 'A♮ ひとつで十分', 'One A♮ is enough'),
          text: t('Dorian 和自然小调只差第六级：Dorian 用 la（A♮），自然小调用 le（A♭）。la 让 IV 变成大三和弦，于是"小主和弦 + 大 IV"的来回（dorian shuttle）就成了 Dorian 最明显的标志。它在 funk、disco 里特别常见；没怎么听过这类音乐的人，常把它误听成 ii–V。', 'ドリアと自然短音階の違いは第 6 音だけ：ドリアは la（A♮）、自然短音階は le（A♭）。la で IV が長三和音になり、「短い主和音 + 長い IV」の往復（dorian shuttle）がドリアのいちばんの目印。ファンクやディスコでとても多い。あまり聴いたことのない人は ii–V と聞き違えやすい。', 'Dorian differs from natural minor only in degree 6: la (A♮) instead of le (A♭). La makes IV major, so shuttling between a minor tonic and a major IV — the dorian shuttle — is Dorian’s clearest sign. It is everywhere in funk and disco; listeners new to those styles often mishear it as ii–V.'),
        },
      },
    ],
    explain: [
      {
        id: 'b15x-e1', type: 'page', ref: ['omt2e-modes', 'omt-pb-modal-schemas'],
        title: t('进阶 1 · 特征音：和大调或小调比，哪一个音不同', '発展 1・特性音：長調・短調と比べてどの音が違うか', 'Advanced 1 · Colour notes: which note differs from major or minor'),
        text: [
          t('用"同主音"的方式看调式：主音不变，和大调或自然小调比。Lydian = 大调升高第 4 音（fi）；Mixolydian = 大调降低第 7 音（te）；Dorian = 自然小调升高第 6 音（la）；Phrygian = 自然小调降低第 2 音（ra）；Locrian = 自然小调降低第 2、5 音（ra、se）。', '同主調の見方で旋法を見る：主音はそのまま、長調か自然短音階と比べる。リディア = 長調の第 4 音を上げる（fi）、ミクソリディア = 第 7 音を下げる（te）、ドリア = 自然短音階の第 6 音を上げる（la）、フリギア = 第 2 音を下げる（ra）、ロクリア = 第 2・5 音を下げる（ra・se）。', 'View the modes in the parallel way: keep the tonic and compare with major or natural minor. Lydian = major with raised 4 (fi); Mixolydian = major with lowered 7 (te); Dorian = natural minor with raised 6 (la); Phrygian = natural minor with lowered 2 (ra); Locrian = natural minor with lowered 2 and 5 (ra, se).'),
          t('这个与众不同的音叫"特征音"（color note；Persichetti 叫它 characteristic note）。任何音都可以当调式的起点：D♭ Mixolydian、G♭ Aeolian、F♯ Lydian 都成立——写的时候要小心升降号。', 'この違う 1 音を「特性音」（color note、パーシケッティは characteristic note と呼んだ）という。どの音からでも旋法は作れる：D♭ ミクソリディア、G♭ エオリア、F♯ リディアなど——臨時記号に注意。', 'That one distinctive note is the colour note (Persichetti called it the characteristic note). Any pitch can start a mode — D♭ Mixolydian, G♭ Aeolian, F♯ Lydian — just mind the accidentals.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: ['D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5'].map((p, i) => ({ p, d: 'q', col: i, lit: p === 'B4' })), cols: 8 },
      },
      {
        id: 'b15x-e2', type: 'discover', practice: true, ref: 'omt2e-modes',
        prompt: t('D♭ Mixolydian 的第七个音是？', 'D♭ ミクソリディアの第 7 音は？', 'The seventh note of D♭ Mixolydian is…'),
        options: ['C♭', 'C', 'B♭', 'B'],
        answer: 0,
        insight: { title: t('大调降 7', '長調の ♭7', 'Major with a lowered 7'), text: t('D♭ 大调第七音是 C；Mixolydian 降低它 → C♭（te）。字母不变，只改升降号。', 'D♭ 長調の第 7 音は C。ミクソリディアはそれを下げる → C♭（te）。文字はそのまま、記号だけ変える。', 'D♭ major’s seventh is C; Mixolydian lowers it to C♭ (te) — same letter, new accidental.') },
      },
      {
        id: 'b15x-e3', type: 'page', ref: ['omt2e-modes', 'omt-pb-modal-schemas'],
        title: t('进阶 2、3 · 先听三音分两组，再一级级往暗走', '発展 2・3・まず 3 度で 2 組に、それから 1 段ずつ暗く', 'Advanced 2–3 · Split by the third, then step darker one note at a time'),
        text: [
          t('含 mi（大三度）的是亮的一组：Lydian、Ionian、Mixolydian；含 me（小三度）的是暗的一组：Dorian、Aeolian、Phrygian、Locrian。亮的调式听起来更像大调，暗的更像小调。', 'mi（長 3 度）を含むのが明るい組：リディア・イオニア・ミクソリディア。me（短 3 度）を含むのが暗い組：ドリア・エオリア・フリギア・ロクリア。明るい旋法ほど長調に、暗いほど短調に近く聞こえる。', 'Modes with mi (a major third) form the bright group: Lydian, Ionian, Mixolydian; with me (a minor third) the dark group: Dorian, Aeolian, Phrygian, Locrian. Brighter modes sound more like major, darker ones more like minor.'),
          t('从最亮到最暗，每一步只降低一个音：Lydian →（降 4）Ionian →（降 7）Mixolydian →（降 3）Dorian →（降 6）Aeolian →（降 2）Phrygian →（降 5）Locrian。附带一提：十二个相邻半音的"半音音阶"没有全音半音的模式，所以理论上叫"半音音集"；它常常上行写升号、下行写降号。', '最も明るいものから暗いものへ、1 歩ごとに 1 音だけ下げる：リディア →（4 を下げ）イオニア →（7）ミクソリディア →（3）ドリア →（6）エオリア →（2）フリギア →（5）ロクリア。ついでに：隣り合う 12 の半音の「半音階」は全音・半音のパターンがないので、理論では「半音の集合」と呼ぶ。上行は ♯、下行は ♭ で書くことが多い。', 'From brightest to darkest, each step lowers one note: Lydian → (lower 4) Ionian → (lower 7) Mixolydian → (lower 3) Dorian → (lower 6) Aeolian → (lower 2) Phrygian → (lower 5) Locrian. An aside: twelve adjacent half steps have no whole/half pattern, so theorists call it the chromatic collection rather than a scale; it is often written with sharps going up and flats coming down.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: 'mi', cells: ['Lydian', 'Ionian', 'Mixolydian'] }, { label: 'me', cells: ['Dorian', 'Aeolian', 'Phrygian', 'Locrian'] }] },
      },
      {
        id: 'b15x-e4', type: 'page', ref: ['omt2e-chord-scale', 'omt2e-modes'],
        title: t('进阶 4 · 调式配什么和弦：和弦—音阶理论', '発展 4・旋法に合う和音：コード・スケール理論', 'Advanced 4 · Which chord fits a mode: chord–scale theory'),
        text: [
          t('取调式的第 1、3、5、7 个音，就是它的"主七和弦"：Ionian、Lydian → 大七；Mixolydian → 属七；Dorian、Phrygian、Aeolian → 小七；Locrian → 半减七（m7♭5）。', '旋法の第 1・3・5・7 音を取ると「主七の和音」：イオニア・リディア → 長七、ミクソリディア → 属七、ドリア・フリギア・エオリア → 短七、ロクリア → 半減七（m7♭5）。', 'Take a mode’s notes 1, 3, 5, 7 for its tonic seventh chord: Ionian and Lydian → major seventh; Mixolydian → dominant seventh; Dorian, Phrygian, Aeolian → minor seventh; Locrian → half-diminished (m7♭5).'),
          t('反过来也成立：把一个和弦叠到十三音，七个音重排就是一个七声音阶——Dm13 的 D F A C E G B 正好是 D Dorian。这就是爵士即兴里的"和弦—音阶理论"：它基于 George Russell 的《Lydian Chromatic Concept》（1953），由 Jamey Aebersold、David Baker、Jerry Coker 等爵士教育家推广，伯克利等许多院校都在教。', '逆も成り立つ：和音を 13 度まで重ね、7 音を並べ替えると 7 音音階——Dm13 の D F A C E G B はちょうど D ドリア。これがジャズ即興の「コード・スケール理論」：ジョージ・ラッセルの『リディアン・クロマティック・コンセプト』（1953）にもとづき、ジェイミー・エバーソルド、デイヴィッド・ベイカー、ジェリー・コーカーらが広め、バークリーなど多くの学校で教えられている。', 'It works backwards too: stack a chord to the thirteenth and its seven notes reorder into a scale — Dm13’s D F A C E G B is exactly D Dorian. That is jazz’s chord–scale theory, based on George Russell’s Lydian Chromatic Concept (1953), popularised by educators Jamey Aebersold, David Baker and Jerry Coker, and taught at Berklee and many other schools.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: ['D4', 'F4', 'A4', 'C5', 'E5', 'G5', 'B5'].map((p) => ({ p, d: 'w', col: 0 })).concat(['D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'].map((p, i) => ({ p, d: 'q', col: i + 1 }))), cols: 8 },
      },
      {
        id: 'b15x-e5', type: 'discover', practice: true, ref: ['omt2e-chord-scale', 'omt2e-modes'],
        prompt: t('G Mixolydian 的第 1、3、5、7 个音叠起来，是什么和弦？', 'G ミクソリディアの第 1・3・5・7 音を重ねると？', 'Stack notes 1, 3, 5, 7 of G Mixolydian. Which chord?'),
        options: [t('G7（属七）', 'G7（属七）', 'G7 (dominant seventh)'), t('Gmaj7（大七）', 'Gmaj7（長七）', 'Gmaj7 (major seventh)'), t('Gm7（小七）', 'Gm7（短七）', 'Gm7 (minor seventh)')],
        answer: 0,
        insight: { title: t('大三度 + te', '長 3 度 + te', 'Major third + te'), text: t('G B D F：大三和弦加上降低的第七音 F（te）= 属七和弦。', 'G B D F：長三和音 + 下げた第 7 音 F（te）= 属七。', 'G B D F: a major triad plus the lowered seventh F (te) = a dominant seventh.') },
      },
      {
        id: 'b15x-e6', type: 'page', ref: 'omt-pb-modal-schemas',
        title: t('进阶 5 · 流行音乐里的 ♭VII 与 ♭VI', '発展 5・ポップスの ♭VII と ♭VI', 'Advanced 5 · ♭VII and ♭VI in pop music'),
        text: [
          t('"调式"是个非常复杂的词——Grove 音乐辞典的"Mode"条目有 238 页、九位作者。这里只看流行与摇滚里几种套路化的和弦进行（主要依据 Nicole Biamonte 和 Philip Tagg 的研究）。一首歌用了某个调式的套路，不代表整首都在这个调式里。', '「旋法」はとても複雑な語——Grove 音楽事典の「Mode」の項目は 238 ページ、著者 9 人。ここではポップスとロックで定型化した和音進行だけを見る（主にニコル・ビアモンテとフィリップ・タッグの研究による）。旋法の定型を使っても、曲全体がその旋法とは限らない。', '“Mode” is a very complicated term — Grove’s article on it runs 238 pages with nine authors. Here we look only at schematic progressions in pop and rock (based mainly on Nicole Biamonte and Philip Tagg). Using a modal schema does not put the whole song in that mode.'),
          t('Mixolydian 的特征音 te 带来 ♭VII，它通常有属功能，可以看作大调 V 的替身：双重变格 ♭VII–IV–I，或者在 I 和 ♭VII 之间来回的 subtonic shuttle（Kinks《Tired of Waiting for You》）。主和弦换成小三和弦，同样的来回就暗示 Aeolian（Gotye《Somebody That I Used to Know》的前奏和主歌）。', 'ミクソリディアの特性音 te から ♭VII ができる。ふつう属機能を持ち、長調の V の代わりと考えられる：ダブル・プラガル ♭VII–IV–I、または I と ♭VII を往復する subtonic shuttle（キンクス《Tired of Waiting for You》）。主和音を短三和音にすると同じ往復がエオリアを示す（ゴティエ《Somebody That I Used to Know》のイントロとヴァース）。', 'Mixolydian’s te gives ♭VII, which usually has dominant function — a stand-in for major’s V: the double plagal ♭VII–IV–I, or the subtonic shuttle between I and ♭VII (the Kinks, “Tired of Waiting for You”). With a minor tonic the same shuttle implies Aeolian (intro and verses of Gotye’s “Somebody That I Used to Know”).'),
        ],
      },
      {
        id: 'b15x-e7', type: 'demo', ref: 'omt-pb-modal-schemas',
        title: t('Aeolian 的三种套路', 'エオリアの 3 つの定型', 'Three Aeolian schemas'),
        steps: [
          { text: t('aeolian shuttle i–♭VII–♭VI–♭VII：在 i 和 ♭VI 之间来回，♭VII 是经过。一直绕圈，没有目标，所以很难形成真正的终止（Gotye 那首歌的副歌）。', 'aeolian shuttle i–♭VII–♭VI–♭VII：i と ♭VI を往復し、♭VII は経過。ぐるぐる回って目標がないので、本当の終止になりにくい（ゴティエの曲のコーラス）。', 'Aeolian shuttle i–♭VII–♭VI–♭VII: back and forth between i and ♭VI with a passing ♭VII. Circling without a goal, it hardly makes a real cadence (the chorus of that Gotye song).'), audio: prog('Cm', 'B♭', 'A♭', 'B♭', 'Cm') },
          { text: t('aeolian cadence ♭VI–♭VII–i：有目标，停在主和弦上，一般不拿来循环；最后常用皮卡第三度变成大三和弦（♭VI–♭VII–I）。它常被联想到胜利和英雄——《超级马里奥》过关的号角就是它（所以也叫 Mario cadence），《指环王》护戒同盟主题的乐句也这样结束。', 'aeolian cadence ♭VI–♭VII–i：目標があり主和音で止まる。ループにはあまり使わない。最後はよくピカルディの 3 度で長三和音に（♭VI–♭VII–I）。勝利や英雄を連想させる——《スーパーマリオ》のクリアのファンファーレ（Mario cadence とも）、《ロード・オブ・ザ・リング》旅の仲間のテーマのフレーズの終わり。', 'Aeolian cadence ♭VI–♭VII–i: goal-directed, landing on the tonic, rarely looped; it very often ends with a Picardy third (♭VI–♭VII–I). Associated with success and heroism — the Super Mario Bros. level-clear fanfare (hence “Mario cadence”) and the Fellowship theme from The Lord of the Rings.'), audio: prog('A♭', 'B♭', 'C') },
          { text: t('lament i–♭VII–♭VI–v：最后是小属 v，没有升高的导音（ti），只有 te。', 'lament i–♭VII–♭VI–v：最後は短い属 v、上げた導音（ti）はなく te だけ。', 'Lament i–♭VII–♭VI–v: it ends on a minor v — no raised leading tone (ti), only te.'), audio: prog('Cm', 'B♭', 'A♭', 'Gm') },
        ],
      },
      {
        id: 'b15x-e8', type: 'discover', practice: true, ref: 'omt-pb-modal-schemas',
        prompt: t('A♭ – B♭ – C（C 为主音，最后是大三和弦）。这是？', 'A♭ – B♭ – C（主音 C、最後は長三和音）。これは？', 'A♭ – B♭ – C (C is home, ending on a major chord). This is…'),
        play: [{ label: t('播放', '再生', 'Play'), audio: prog('A♭', 'B♭', 'C') }],
        options: [t('aeolian cadence（带皮卡第三度）', 'aeolian cadence（ピカルディの 3 度つき）', 'An aeolian cadence (with a Picardy third)'), t('subtonic shuttle', 'subtonic shuttle', 'A subtonic shuttle'), t('lydian cadence', 'lydian cadence', 'A lydian cadence')],
        answer: 0,
        insight: { title: t('根音一路往上进入主和弦', '根音が上って主和音へ', 'Roots climb into the tonic'), text: t('♭VI–♭VII–I：有目标地停在主和弦上；把最后的小主和弦换成大三，就是皮卡第三度。', '♭VI–♭VII–I：目標をもって主和音に止まる。最後の短い主和音を長三にするのがピカルディの 3 度。', '♭VI–♭VII–I lands purposefully on the tonic; making the final minor tonic major is the Picardy third.') },
      },
      {
        id: 'b15x-e9', type: 'page', ref: 'omt-pb-modal-schemas',
        title: t('进阶 6、7 · Dorian 的大 IV 与 Lydian 的 II♯', '発展 6・7・ドリアの長い IV とリディアの II♯', 'Advanced 6–7 · Dorian’s major IV and Lydian’s II♯'),
        text: [
          t('Dorian 的 la 改变了 IV 和 ii 的性质（vi° 不用）。Daft Punk《Get Lucky》在 B Dorian，每四小节一次 IV–i，把 Bm 确立为主和弦；CHIC《Dance, Dance, Dance》也是 dorian shuttle。这个来回还可以向上扩展到 i⁷。', 'ドリアの la は IV と ii の性質を変える（vi° は使わない）。ダフト・パンク《Get Lucky》は B ドリアで、4 小節ごとの IV–i が Bm を主和音にする。CHIC《Dance, Dance, Dance》も dorian shuttle。この往復は i⁷ まで上に広げることもある。', 'Dorian’s la changes the quality of IV and ii (vi° is not used). Daft Punk’s “Get Lucky” is in B Dorian, with IV–i every four bars establishing Bm as tonic; CHIC’s “Dance, Dance, Dance” uses the dorian shuttle too, which can arch up to i⁷.'),
          t('Lydian 的 fi 让 II 变成大三和弦，写作 II♯。如果 II♯ 接到 V（古典里常见），应该看作副属 V/V。流行歌很少整首都是 Lydian，II♯ 常常后来被 IV 或 ii 抵消（Fleetwood Mac《Sara》）。小心别把相邻两个大三和弦都当成 Lydian：Taylor Swift《Starlight》主歌的 A–B 其实是 E 大调的 IV–V。lydian cadence II♯–IV–I 则让 fi 马上被 IV 的 fa 抵消。', 'リディアの fi で II が長三和音になり II♯ と書く。II♯ が V に進むなら（古典で多い）副属 V/V と考える。ポップスで曲全体がリディアなのはまれで、II♯ は後で IV や ii に打ち消されることが多い（フリートウッド・マック《Sara》）。隣り合う長三和音をすぐリディアと思わないこと：テイラー・スウィフト《Starlight》のヴァースの A–B は E 長調の IV–V。lydian cadence II♯–IV–I では fi がすぐ IV の fa に打ち消される。', 'Lydian’s fi makes II major, written II♯. If II♯ goes to V, as in classical music, read it as the applied V/V. Few pop songs stay Lydian throughout; II♯ is often neutralised later by IV or ii (Fleetwood Mac, “Sara”). Do not call every pair of stepwise major chords Lydian: the A–B of Taylor Swift’s “Starlight” verses is IV–V in E. The lydian cadence II♯–IV–I cancels fi with IV’s fa right away.'),
        ],
      },
      {
        id: 'b15x-e10', type: 'discover', practice: true, ref: 'omt-pb-modal-schemas',
        prompt: t('C 大调里，D 大三和弦接到 G 大三和弦。应该怎么读这个 D？', 'ハ長調で、D の長三和音が G の長三和音へ。この D はどう読む？', 'In C major, a D major chord moves to G major. How should the D be read?'),
        options: [t('副属 V/V', '副属 V/V', 'An applied V/V'), t('Lydian 的 II♯', 'リディアの II♯', 'Lydian II♯'), t('Mixolydian 的 ♭VII', 'ミクソリディアの ♭VII', 'Mixolydian ♭VII')],
        answer: 0,
        insight: { title: t('看它往哪里去', '行き先を見る', 'Look where it goes'), text: t('II♯ 接到 V，就是 V/V；只有不去 V（例如接 IV 或回 I）时，才需要 Lydian 的 II♯ 这个标签。', 'II♯ が V へ行けば V/V。V へ行かないとき（IV へ、I へ戻る）だけリディアの II♯ と呼ぶ。', 'II♯ going to V is V/V; only when it goes elsewhere (to IV, back to I) do you need the Lydian label II♯.') },
      },
      {
        id: 'b15x-e11', type: 'page', ref: 'omt-pb-modal-schemas',
        title: t('进阶 8 · 用耳朵分辨调式：三步', '発展 8・耳で旋法を見分ける：3 ステップ', 'Advanced 8 · Identifying modes by ear: three steps'),
        text: [
          t('第一步：听主音，再听整个主和弦——三音是大三度（大调、Mixolydian、Lydian）还是小三度（小调、Aeolian、Dorian）？第二步：听第七级。在主音下方半音是 ti，下方全音是 te。大主和弦 + te → Mixolydian；小主和弦 + ti → 一般说的小调。', 'ステップ 1：主音、次に主和音全体を聴く——第 3 音は長 3 度（長調・ミクソリディア・リディア）か短 3 度（短調・エオリア・ドリア）か。ステップ 2：第 7 音を聴く。主音の半音下なら ti、全音下なら te。長い主和音 + te → ミクソリディア、短い主和音 + ti → ふつうの短調。', 'Step 1: hear the tonic, then the whole tonic chord — is its third major (major, Mixolydian, Lydian) or minor (minor, Aeolian, Dorian)? Step 2: listen to degree 7, a half step below the tonic (ti) or a whole step (te). Major tonic + te → Mixolydian; minor tonic + ti → ordinary minor.'),
          t('第三步（还没确定时）：听其他升高的特征音。大主和弦里第 4 级升高（fi）→ Lydian，否则是大调；小主和弦里第 6 级升高（la）→ Dorian，否则是 Aeolian。', 'ステップ 3（まだ決まらないとき）：ほかの上がった特性音を聴く。長い主和音で第 4 音が上がっていれば（fi）リディア、でなければ長調。短い主和音で第 6 音が上がっていれば（la）ドリア、でなければエオリア。', 'Step 3, if still unsure: listen for other raised colour notes. A major tonic with raised 4 (fi) → Lydian, otherwise major; a minor tonic with raised 6 (la) → Dorian, otherwise Aeolian.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: '1', cells: ['mi', 'me'] }, { label: '2', cells: ['ti', 'te'] }, { label: '3', cells: ['fi', 'la'] }] },
      },
      {
        id: 'b15x-e12', type: 'discover', practice: true, ref: 'omt-pb-modal-schemas',
        prompt: t('小主和弦，第七级是 te，第六级是 le。这是？', '短い主和音、第 7 音は te、第 6 音は le。これは？', 'Minor tonic, degree 7 is te, degree 6 is le. This is…'),
        options: ['Aeolian', 'Dorian', t('小调（和声小调）', '短調（和声的）', 'Minor (harmonic)'), 'Mixolydian'],
        answer: 0,
        insight: { title: t('三步走完', '3 ステップを最後まで', 'All three steps'), text: t('小三 → 暗的一组；te → 不是一般的小调；le（没有升高到 la）→ Aeolian。', '短 3 度 → 暗い組、te → ふつうの短調ではない、le（la ではない）→ エオリア。', 'Minor third → dark group; te → not ordinary minor; le (not raised to la) → Aeolian.') },
      },
    ],
    experiment: [
      { id: 'b15x-x1', type: 'experiment', toy: 'progression', ref: 'omt-pb-modal-schemas',
        prompt: t('每格选一个和弦（C 为主音），或者点上面的套路：双重变格、aeolian shuttle、aeolian cadence、lament、dorian shuttle、lydian cadence。听一听：哪一个有"到达"的感觉，哪一个一直在绕圈？', '各スロットで和音を選ぶ（主音 C）、または上の定型を押そう：ダブル・プラガル、aeolian shuttle、aeolian cadence、lament、dorian shuttle、lydian cadence。どれに「到着」感があり、どれが回り続ける？', 'Pick a chord per slot (C is home), or tap a schema above: double plagal, aeolian shuttle, aeolian cadence, lament, dorian shuttle, lydian cadence. Which ones arrive, and which keep circling?'),
        params: { gap: 900, slots: [
          { options: [{ label: 'C', notes: TRI.C }, { label: 'Cm', notes: TRI.Cm }, { label: 'A♭', notes: TRI['A♭'] }] },
          { options: [{ label: 'B♭', notes: TRI['B♭'] }, { label: 'F', notes: TRI.F }, { label: 'D', notes: TRI.D }, { label: 'Fm', notes: TRI.Fm }] },
          { options: [{ label: 'A♭', notes: TRI['A♭'] }, { label: 'F', notes: TRI.F }, { label: 'B♭', notes: TRI['B♭'] }, { label: 'C', notes: TRI.C }, { label: 'Cm', notes: TRI.Cm }] },
          { options: [{ label: 'B♭', notes: TRI['B♭'] }, { label: 'C', notes: TRI.C }, { label: 'Gm', notes: TRI.Gm }, { label: 'F', notes: TRI.F }, { label: 'Cm', notes: TRI.Cm }] },
        ], presets: [
          { label: t('双重变格 ♭VII–IV–I', 'ダブル・プラガル', 'Double plagal'), picks: [0, 0, 1, 1], explain: t('C – B♭ – F – C：♭VII–IV–I，大主和弦 + te = Mixolydian。', 'C – B♭ – F – C：♭VII–IV–I、長い主和音 + te = ミクソリディア。', 'C – B♭ – F – C: ♭VII–IV–I; major tonic + te = Mixolydian.') },
          { label: 'aeolian shuttle', picks: [1, 0, 0, 0], explain: t('Cm – B♭ – A♭ – B♭：一直绕圈，没有目标。', 'Cm – B♭ – A♭ – B♭：回り続けて目標がない。', 'Cm – B♭ – A♭ – B♭: circling, no goal.') },
          { label: 'aeolian cadence', picks: [2, 0, 3, 1], explain: t('A♭ – B♭ – C：带皮卡第三度的 aeolian cadence（Mario cadence）。', 'A♭ – B♭ – C：ピカルディの 3 度つき aeolian cadence（Mario cadence）。', 'A♭ – B♭ – C: an aeolian cadence with a Picardy third (the Mario cadence).') },
          { label: 'lament', picks: [1, 0, 0, 2], explain: t('Cm – B♭ – A♭ – Gm：最后是小属 v，没有 ti。', 'Cm – B♭ – A♭ – Gm：最後は短い v、ti がない。', 'Cm – B♭ – A♭ – Gm: ending on minor v, no ti.') },
          { label: 'dorian shuttle', picks: [1, 1, 4, 3], explain: t('Cm – F – Cm – F：小主和弦 + 大 IV（la）= Dorian。', 'Cm – F – Cm – F：短い主和音 + 長い IV（la）= ドリア。', 'Cm – F – Cm – F: minor tonic + major IV (la) = Dorian.') },
          { label: 'lydian cadence', picks: [0, 2, 1, 1], explain: t('C – D – F – C：II♯ 的 fi 马上被 IV 的 fa 抵消。', 'C – D – F – C：II♯ の fi がすぐ IV の fa に打ち消される。', 'C – D – F – C: II♯’s fi is cancelled at once by IV’s fa.') },
        ] },
        breakthrough: { id: 'b15x-schemas', text: t('你听出来了：调式的颜色常常就藏在一个和弦里。', '旋法の色はたいてい 1 つの和音に隠れている——聴き取れた。', 'You heard it: a mode’s colour often hides in a single chord.') } },
      { id: 'b15x-x2', type: 'experiment', toy: 'scale', ref: 'omt2e-modes',
        prompt: t('从 Lydian 依次点到 Locrian，看金色的特征音；再换主音试试 D♭ Mixolydian、F♯ Lydian。', 'リディアからロクリアまで順に押して金色の特性音を見よう。主音を替えて D♭ ミクソリディア、F♯ リディアも。', 'Step from Lydian to Locrian watching the golden colour note; then try D♭ Mixolydian and F♯ Lydian.'),
        params: { sets: MODE_SETS } },
    ],
    challenge: [
      {
        id: 'b15x-c1', type: 'choice', error: 'mode-character', skills: ['identify'], ref: 'omt2e-modes',
        variants: [
          { prompt: t('F♯ Lydian 的第四个音是？', 'F♯ リディアの第 4 音は？', 'The fourth note of F♯ Lydian is…'), options: ['B♯', 'B', 'C♯', 'A♯'] },
          { prompt: t('G♭ Aeolian 的第六个音是？', 'G♭ エオリアの第 6 音は？', 'The sixth note of G♭ Aeolian is…'), options: ['E𝄫', 'E♭', 'D', 'F♭'] },
          { prompt: t('E Locrian 的第五个音是？', 'E ロクリアの第 5 音は？', 'The fifth note of E Locrian is…'), options: ['B♭', 'B', 'A♯', 'C'] },
        ],
        answer: 0,
        explain: t('先写同主音的大调或自然小调，再改特征音：Lydian 升 4、Aeolian 的第 6 音就是自然小调的 le、Locrian 降 5。字母不变，只改升降号。', 'まず同主の長調か自然短音階を書き、特性音を変える：リディアは 4 を上げ、エオリアの第 6 音は自然短音階の le、ロクリアは 5 を下げる。文字はそのまま。', 'Write the parallel major or natural minor, then change the colour note: Lydian raises 4, Aeolian’s sixth is natural minor’s le, Locrian lowers 5. Keep the letter, change the accidental.'),
      },
      {
        id: 'b15x-c2', type: 'choice', error: 'mode-character', skills: ['function'], ref: ['omt2e-chord-scale', 'omt2e-modes'],
        variants: [
          { prompt: t('哪个调式的主七和弦是半减七（m7♭5）？', '主七の和音が半減七（m7♭5）になる旋法は？', 'Which mode’s tonic seventh chord is half-diminished (m7♭5)?'), options: ['Locrian', 'Phrygian', 'Dorian', 'Mixolydian'] },
          { prompt: t('Dm13 的七个音重排后是哪个调式？', 'Dm13 の 7 音を並べ替えると何の旋法？', 'Dm13’s seven notes reordered form which mode?'), options: ['D Dorian', 'D Aeolian', 'D Phrygian', 'D Mixolydian'] },
          { prompt: t('和弦—音阶理论基于谁的理论？', 'コード・スケール理論は誰の理論にもとづく？', 'Chord–scale theory is based on whose work?'), options: ['George Russell', 'Philip Tagg', 'Vincent Persichetti', 'Nicole Biamonte'] },
        ],
        answer: 0,
        explain: t('Locrian 有 me、se、te：小三、减五、小七 = 半减七；Dm13 = D F A C E G B = D Dorian；和弦—音阶理论基于 Russell 的 LCC（1953）。', 'ロクリアは me・se・te：短 3・減 5・短 7 = 半減七。Dm13 = D F A C E G B = D ドリア。コード・スケール理論はラッセルの LCC（1953）にもとづく。', 'Locrian has me, se, te: minor third, diminished fifth, minor seventh = half-diminished; Dm13 = D F A C E G B = D Dorian; chord–scale theory builds on Russell’s LCC (1953).'),
      },
      {
        id: 'b15x-c3', type: 'listen', error: 'mode-character', skills: ['hearing'], ref: 'omt-pb-modal-schemas',
        prompt: t('听这个循环（C 为主音）：它是哪种调式套路？', 'このループを聴こう（主音 C）。どの旋法の定型？', 'Listen to this loop (C is home): which modal schema is it?'),
        options: ['subtonic shuttle (Mixolydian)', 'aeolian shuttle', 'dorian shuttle', 'lydian cadence'],
        variants: [
          { play: [{ label: t('播放', '再生', 'Play'), audio: prog('C', 'B♭', 'C', 'B♭') }], answer: 0 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: prog('Cm', 'B♭', 'A♭', 'B♭') }], answer: 1 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: prog('Cm', 'F', 'Cm', 'F') }], answer: 2 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: prog('D', 'F', 'C') }], answer: 3 },
        ],
        explain: t('先听主和弦是大是小，再听 ♭VII（te）、大 IV（la）或 II♯（fi）这些特征和弦。', 'まず主和音が長か短か、次に ♭VII（te）・長い IV（la）・II♯（fi）などの特性和音を聴く。', 'First hear whether the tonic is major or minor, then listen for the colour chords: ♭VII (te), major IV (la), II♯ (fi).'),
        breakthrough: { id: 'b15x-hear-schema', text: t('你用耳朵认出了一个调式套路。', '旋法の定型を耳で聞き分けた。', 'You recognised a modal schema by ear.') },
      },
      {
        id: 'b15x-c4', type: 'choice', error: 'mode-character', skills: ['function'], ref: 'omt-pb-modal-schemas',
        variants: [
          { prompt: t('为什么 aeolian shuttle 很难形成真正的终止？', 'aeolian shuttle が本当の終止になりにくいのはなぜ？', 'Why does the aeolian shuttle hardly make a real cadence?'), options: [t('它在 i 和 ♭VI 之间一直绕圈，没有目标', 'i と ♭VI を回り続けて目標がない', 'It circles between i and ♭VI without a goal'), t('它没有主和弦', '主和音がない', 'It has no tonic chord'), t('它的和弦都是减三和弦', '和音がすべて減三和音', 'All its chords are diminished')] },
          { prompt: t('lament i–♭VII–♭VI–v 为什么暗示 Aeolian 而不是和声小调？', 'lament i–♭VII–♭VI–v が和声的短音階ではなくエオリアを示すのはなぜ？', 'Why does the lament i–♭VII–♭VI–v imply Aeolian rather than harmonic minor?'), options: [t('最后是小属 v，只有 te 没有 ti', '最後が短い v で、ti がなく te だけ', 'It ends on minor v — te, no ti'), t('它有大 IV', '長い IV がある', 'It has a major IV'), t('它停在主和弦上', '主和音で止まる', 'It stops on the tonic')] },
          { prompt: t('Mixolydian 的 ♭VII 在流行音乐里通常有什么功能？', 'ポップスでミクソリディアの ♭VII はふつう何の機能？', 'In pop music, Mixolydian’s ♭VII usually has which function?'), options: [t('属功能，像 V 的替身', '属機能、V の代わり', 'Dominant — a stand-in for V'), t('主功能', '主機能', 'Tonic'), t('它没有功能', '機能はない', 'No function')] },
        ],
        answer: 0,
        explain: t('终止 = 到达目标；aeolian shuttle 一直绕圈。lament 的小属 v 没有导音。♭VII 常替代 V，有属功能。', '終止 = 目標に到着。aeolian shuttle は回り続ける。lament の短い v には導音がない。♭VII はよく V の代わりで属機能。', 'A cadence reaches a goal; the aeolian shuttle keeps circling. The lament’s minor v has no leading tone. ♭VII often replaces V with dominant function.'),
      },
      {
        id: 'b15x-c5', type: 'choice', error: 'mode-character', skills: ['identify'], ref: 'omt-pb-modal-schemas',
        variants: [
          { prompt: t('大主和弦，第七级是 ti，第四级是 fi。这是？', '長い主和音、第 7 音は ti、第 4 音は fi。これは？', 'Major tonic, degree 7 is ti, degree 4 is fi. This is…'), options: ['Lydian', t('大调', '長調', 'Major'), 'Mixolydian', 'Dorian'] },
          { prompt: t('大主和弦，第七级是 te。这是？', '長い主和音、第 7 音は te。これは？', 'Major tonic, degree 7 is te. This is…'), options: ['Mixolydian', 'Lydian', t('大调', '長調', 'Major'), 'Aeolian'] },
          { prompt: t('小主和弦，第七级是 te，第六级是 la。这是？', '短い主和音、第 7 音は te、第 6 音は la。これは？', 'Minor tonic, degree 7 is te, degree 6 is la. This is…'), options: ['Dorian', 'Aeolian', t('小调', '短調', 'Minor'), 'Phrygian'] },
        ],
        answer: 0,
        explain: t('三步：主和弦三音 → 第七级 ti / te → 其他升高的特征音（fi、la）。', '3 ステップ：主和音の 3 度 → 第 7 音 ti / te → ほかの上がった特性音（fi・la）。', 'Three steps: tonic third → degree 7 ti or te → other raised colour notes (fi, la).'),
      },
      G('b15x-g1', 'modeSpell', 1, ['spell']),
      G('b15x-g2', 'modeBrightness', 1, ['identify']),
      G('b15x-g3', 'modeEar', 1, ['hearing']),
    ],
  },
  pool: [G('b15x-p1', 'modeSpell', 3, ['spell']), G('b15x-p2', 'modeBrightness', 2, ['identify']), G('b15x-p3', 'modeEar', 2, ['hearing'])],
};

// ===================== B1-6x 五声与五声和声 · 扩展关 =====================
// 对应 A 面：pentatonic（五种五声调式 / 五声 = 五个纯五度 / 偏音 / 五声调式综合）、pentaharm（五种旋转 / 五声当根音 / 同一音级的两种形态 / 五度与五声）的进阶关
const PENTA_SETS = [
  { id: 'gong', label: t('宫（大五声）', '宮（長調ペンタトニック）', 'Gong (major pentatonic)'), steps: [0, 2, 4, 7, 9], noKey: true },
  { id: 'shang', label: t('商', '商', 'Shang'), steps: [0, 2, 5, 7, 10], noKey: true },
  { id: 'jue', label: t('角', '角', 'Jue'), steps: [0, 3, 5, 8, 10], noKey: true },
  { id: 'zhi', label: t('徵', '徵', 'Zhi'), steps: [0, 2, 5, 7, 9], noKey: true },
  { id: 'yu', label: t('羽（小五声）', '羽（短調ペンタトニック）', 'Yu (minor pentatonic)'), steps: [0, 3, 5, 7, 10], noKey: true },
];
// 《Hey Joe》式的四度链（E 为主音）：每个根音可选大三、小三或强力和弦
const HJ = {
  C: [36, 60, 64, 67], Cm: [36, 60, 63, 67], C5: [36, 48, 55, 60],
  G: [43, 59, 62, 67], Gm: [43, 58, 62, 67], G5: [43, 50, 55, 62],
  D: [38, 62, 66, 69], Dm: [38, 62, 65, 69], D5: [38, 45, 50, 57],
  A: [45, 61, 64, 69], Am: [45, 60, 64, 69], A5: [45, 52, 57, 64],
  E: [40, 59, 64, 68], Em: [40, 59, 64, 67], E5: [40, 47, 52, 59],
};
const hjSlot = (r) => ({ options: [{ label: r, notes: HJ[r] }, { label: `${r}m`, notes: HJ[`${r}m`] }, { label: `${r}5`, notes: HJ[`${r}5`] }] });
const EXT_B1_6 = {
  minutes: 21,
  insight: t('五声没有半音，所以五个音轮流都能当主音；可也正因为它"不偏不倚"，同一串和弦常常既能读成五声，也能读成别的调式。', '五音音階には半音がないので、5 つの音が順に主音になれる。でも「偏りがない」からこそ、同じ和音列が五音にも別の旋法にも読めることが多い。', 'The pentatonic has no half steps, so any of its five notes can be home — and precisely because it is so even, the same chords can often be read as pentatonic or as another mode.'),
  sections: {
    discover: [
      {
        id: 'b16x-d1', type: 'discover', ref: 'omt2e-pentatonic-harmony',
        prompt: t('五个大三和弦，根音一路"下行四度"：C – G – D – A – E，停在 E 上。这五个根音合起来是什么音集？', '5 つの長三和音、根音が「4 度下行」で C – G – D – A – E と進み E で止まる。5 つの根音を合わせると何の音集合？', 'Five major triads with roots falling by fourths: C – G – D – A – E, ending on E. What collection do the five roots make?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: { notes: [HJ.C, HJ.G, HJ.D, HJ.A, HJ.E], mode: 'chords' } }],
        options: [t('一个五声音集（C D E G A）', '五音音階（C D E G A）', 'A pentatonic collection (C D E G A)'), t('C 大调音阶', 'ハ長調の音階', 'The C major scale'), t('全音音阶', '全音音階', 'A whole-tone scale')],
        answer: 0,
        insight: {
          title: t('《Hey Joe》的四度链', '《Hey Joe》の 4 度の鎖', 'The chain of fourths in “Hey Joe”'),
          text: t('这就是《Hey Joe》（Jimi Hendrix 1966 年版以 E 为主音）的主要进行：五个和弦以下行四度（= 上行五度）相连，最后到主和弦，正好用到五声的全部五个音——Nicole Biamonte 把它归为五声的"第 4 种旋转"。可是五个都是大三和弦，和弦音里同时出现了 G 和 G♯、C 和 C♯：这就是五声和声里常见的"音级冲突"。', 'これが《Hey Joe》（ジミ・ヘンドリックス 1966 年版は主音 E）の主な進行：5 つの和音が下行 4 度（= 上行 5 度）でつながり主和音に着く。五音の 5 音をちょうど全部使う——ニコル・ビアモンテは五音の「第 4 の転回」に分類した。でも 5 つとも長三和音なので、和音の中に G と G♯、C と C♯ が同時に出てくる：五音和声によくある「音度の衝突」。', 'This is the main progression of “Hey Joe” (E is tonic in Jimi Hendrix’s 1966 version): five chords linked by falling fourths (= rising fifths) ending on the tonic, using exactly all five pentatonic notes — Nicole Biamonte files it under pentatonic “rotation 4”. But all five are major triads, so G and G♯, C and C♯ both appear: the scale-degree conflict typical of pentatonic harmony.'),
        },
      },
    ],
    explain: [
      {
        id: 'b16x-e1', type: 'page', ref: ['zhwiki-pentatonic', 'omt2e-collections'],
        title: t('进阶 1 · 五种五声调式：谁当主音，就叫什么调式', '発展 1・5 つの五声調式：主音になった音で名前が決まる', 'Advanced 1 · Five pentatonic modes: the home note names the mode'),
        text: [
          t('宫、商、角、徵、羽大致相当于简谱的 1、2、3、5、6（do re mi sol la），五个音之间的音程关系是固定的：台阶（半音数）2–2–3–2–3。五个音中的任何一个都可以当主音：以宫为主音是宫调式，以商为主音是商调式，依此类推。', '宮・商・角・徵・羽はおおよそ数字譜の 1・2・3・5・6（do re mi sol la）。5 音の音程関係は固定：段差（半音数）は 2–2–3–2–3。どの音も主音になれる：宮が主音なら宮調式、商なら商調式……。', 'Gong, shang, jue, zhi and yu correspond roughly to 1 2 3 5 6 (do re mi sol la); the intervals between them are fixed: steps of 2–2–3–2–3 half steps. Any of the five can be the tonic: gong as tonic gives the gong mode, shang the shang mode, and so on.'),
          t('调式名写成"主音 + 阶名"：用 C 宫的五个音（C D E G A）、以 A 为主音，就是"A 羽调式"；以 G 为主音就是"G 徵调式"。先认宫，再看主音的阶名。', '調式名は「主音 + 階名」：C 宮の 5 音（C D E G A）で A が主音なら「A 羽調式」、G が主音なら「G 徵調式」。まず宮を見つけ、主音の階名を見る。', 'The name is “tonic + degree”: with the five notes of C gong (C D E G A) and A as tonic, it is “A yu mode”; with G as tonic, “G zhi mode”. Find gong first, then name the tonic’s degree.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: ['C4', 'D4', 'E4', 'G4', 'A4'].map((p, i) => ({ p, d: 'q', col: i, label: ['宫', '商', '角', '徵', '羽'][i] })), cols: 5 },
      },
      {
        id: 'b16x-e2', type: 'discover', practice: true, ref: 'zhwiki-pentatonic',
        prompt: t('用 F 宫的五个音（F G A C D），以 D 为主音，叫什么调式？', 'F 宮の 5 音（F G A C D）で D が主音の調式は？', 'With the five notes of F gong (F G A C D) and D as tonic, the mode is…'),
        options: [t('D 羽调式', 'D 羽調式', 'D yu mode'), t('D 商调式', 'D 商調式', 'D shang mode'), t('D 徵调式', 'D 徵調式', 'D zhi mode')],
        answer: 0,
        insight: { title: t('D 是 F 宫的羽', 'D は F 宮の羽', 'D is yu in F gong'), text: t('F 宫：F 宫、G 商、A 角、C 徵、D 羽。主音 D 是羽 → D 羽调式。', 'F 宮：F 宮・G 商・A 角・C 徵・D 羽。主音 D は羽 → D 羽調式。', 'F gong: F gong, G shang, A jue, C zhi, D yu. The tonic D is yu → D yu mode.') },
      },
      {
        id: 'b16x-e3', type: 'page', ref: ['zhwiki-pentatonic', 'omt2e-collections'],
        title: t('进阶 2 · 三分损益与五度相生：五声从哪里来', '発展 2・三分損益と五度相生：五音はどこから', 'Advanced 2 · Adding and subtracting thirds, stacking fifths: where the five come from'),
        text: [
          t('《史记·律书》："九九八十一以为宫。三分去一，五十四以为徵。三分益一，七十二以为商。三分去一，四十八以为羽。三分益一，六十四以为角。"取 81 个单位长的竹管定宫，交替"去掉三分之一"（音高上行五度）和"加上三分之一"（下行四度），依次得到徵、商、羽、角。这和"五度相生"的结果相同，五音之间都是简单的整数比（例如宫 : 徵 = 3 : 2）。', '『史記・律書』：「九九八十一以為宮。三分去一、五十四以為徵。三分益一、七十二以為商。三分去一、四十八以為羽。三分益一、六十四以為角」。81 単位の竹管で宮を定め、「3 分の 1 を除く」（5 度上）と「3 分の 1 を加える」（4 度下）を交互に行い、徵・商・羽・角を得る。これは「五度相生」と同じ結果で、5 音の間はどれも簡単な整数比（宮 : 徵 = 3 : 2 など）。', 'The Shiji (“Treatise on Pitch-pipes”): “Nine nines, eighty-one, make gong. Remove a third: fifty-four make zhi. Add a third: seventy-two make shang. Remove a third: forty-eight make yu. Add a third: sixty-four make jue.” Start with an 81-unit pipe for gong and alternately remove a third (up a fifth) and add a third (down a fourth) to get zhi, shang, yu, jue — the same result as stacking fifths, with simple whole-number ratios (gong : zhi = 3 : 2).'),
          t('用西方的说法：从 C 连叠纯五度 C–G–D–A–E，排进一个八度就是 C D E G A；钢琴的五个黑键也是一个五声音集。自然音集是 F C G D A E B 一串五度，五声就是中间那五个——它去掉的正是产生半音的两个音（fa、ti）。没有半音，所以五声更容易旋转，哪个音当主音都不那么"偏向"。', '西洋の言い方では：C から完全 5 度を C–G–D–A–E と重ね、1 オクターヴに並べると C D E G A。ピアノの 5 つの黒鍵も五音の集合。全音階は F C G D A E B の 5 度の列で、五音はその真ん中の 5 つ——取り除かれるのは半音を生む 2 音（fa・ti）。半音がないので回転しやすく、どの音を主音にしても「偏り」が少ない。', 'In Western terms: stack fifths from C — C–G–D–A–E — and order them in an octave: C D E G A; the piano’s five black keys form one too. The diatonic set is the chain F C G D A E B; the pentatonic is its middle five, dropping exactly the two notes that make half steps (fa and ti). With no half steps it rotates easily, with no strong pull toward any one tonic.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('管长', '管長', 'length').zh === '管长' ? '81' : '81', cells: ['宫 81', '徵 54', '商 72', '羽 48', '角 64'] }] },
      },
      {
        id: 'b16x-e4', type: 'discover', practice: true, ref: 'zhwiki-pentatonic',
        prompt: t('商的管长是 72。下一步"三分去一"，得到哪个音、管长多少？', '商の管長は 72。次の「三分去一」で何の音、管長はいくつ？', 'Shang’s pipe is 72. The next step “removes a third”: which note, and what length?'),
        options: [t('羽，48', '羽、48', 'Yu, 48'), t('角，64', '角、64', 'Jue, 64'), t('徵，54', '徵、54', 'Zhi, 54')],
        answer: 0,
        insight: { title: t('72 × ⅔ = 48', '72 × ⅔ = 48', '72 × ⅔ = 48'), text: t('去掉三分之一：72 − 24 = 48，音高升五度，得到羽；再"三分益一"：48 + 16 = 64，得到角。', '3 分の 1 を除く：72 − 24 = 48、5 度上がって羽。次に「三分益一」：48 + 16 = 64 で角。', 'Remove a third: 72 − 24 = 48, a fifth higher — yu; then add a third: 48 + 16 = 64 — jue.') },
      },
      {
        id: 'b16x-e5', type: 'page', ref: ['zhwiki-heptatonic', 'zhwiki-pentatonic', 'helvting-scales'],
        title: t('进阶 3 · 偏音与七声：五声以外的音很早就在了', '発展 3・偏音と七声：五音の外の音は昔からあった', 'Advanced 3 · Auxiliary notes and seven-note modes: the notes outside were there early'),
        text: [
          t('在五声的两个小三度"缺口"里各加一个偏音，就得到七声调式；按加入的偏音不同，分为清乐、燕乐、雅乐三种，仍按五声的方法命名（如清乐宫调式）。偏音一般不当主音——例如变宫和清角相距三全音，很不稳定。', '五音の 2 つの短 3 度の「すき間」に偏音を 1 つずつ加えると七声調式。加える偏音で清楽・燕楽・雅楽の 3 種に分かれ、名前は五音と同じ方法（清楽宮調式など）。偏音はふつう主音にしない——変宮と清角は三全音離れていてとても不安定。', 'Add one auxiliary note into each of the pentatonic’s two minor-third gaps and you get a seven-note mode — qingyue, yanyue or yayue depending on which notes are added — still named the pentatonic way (e.g. qingyue gong mode). Auxiliary notes rarely serve as tonic: bian-gong and qing-jue, for instance, lie a tritone apart.'),
          t('贺绿汀指出，五声以外的音早就是音乐内容的一部分：《史记》记荆轲在易水边"为变徵之声，士皆垂泪涕泣……复为羽声慷慨"（变徵约当 C 调的升 F）；纪元前 770 年已有七声的记载；隋唐从龟兹传来的"八十四调"是 12 个半音 × 7 种调式的理论推算；宋代姜白石的十七首歌曲用的是七声调式。', '賀緑汀は、五音の外の音が早くから音楽内容の一部だったと指摘する：『史記』は荊軻が易水のほとりで「変徵の声をなし、士みな涙を垂れ……また羽声をなして慷慨す」と記す（変徵はハ調の F♯ に相当）。紀元前 770 年にはすでに七声の記録がある。隋唐に亀茲から伝わった「八十四調」は 12 半音 × 7 調式の理論上の数。宋の姜白石の 17 曲は七声調式を使う。', 'He Luting points out that notes beyond the five were part of the music early on: the Shiji tells how Jing Ke at the Yi River sang “in the bian-zhi sound, and the men all wept… then in the yu sound, fierce and stirring” (bian-zhi ≈ F♯ in C); seven-note scales are recorded by 770 BCE; the Sui–Tang “84 modes” from Kucha were a theoretical 12 × 7; and the seventeen songs of the Song poet-composer Jiang Baishi use seven-note modes.'),
        ],
      },
      {
        id: 'b16x-e6', type: 'page', ref: ['helvting-scales', 'omt2e-collections'],
        title: t('进阶 4 · 先找宫，再看主音——以及"别用框框去套"', '発展 4・まず宮、次に主音——そして「枠にはめない」', 'Advanced 4 · Find gong, then the tonic — and don’t force a frame'),
        text: [
          t('认五声调式的步骤：五个音按 2–2–3–2–3 排好，那两个连续的全音（宫–商–角）构成唯一的大三度，它下面的音就是宫；再看旋律停在哪个音上（往往也是开始的音），它的阶名就是调式名。', '五声調式を見分ける手順：5 音を 2–2–3–2–3 に並べ、続く 2 つの全音（宮–商–角）がつくる唯一の長 3 度の下の音が宮。次に旋律が止まる音（始まりの音であることも多い）の階名が調式名。', 'To identify a pentatonic mode: order the five notes as 2–2–3–2–3; the two consecutive whole steps (gong–shang–jue) form the only major third, and its lower note is gong. Then the note the melody settles on (often also where it starts) gives the mode name.'),
          t('但贺绿汀也提醒：不能把所有民间调式都硬塞进五声的框框。陕北民歌的徵调式缺角音、却有变宫（升 F）和清角（C）作为特性音；山西的一种七声音阶结构和 Mixolydian 一样，但旋律进行不同；湖南花鼓调升高三音和七音，近似吉卜赛音阶。要从同类民歌的实际规律去认识它们。', 'しかし賀緑汀は、すべての民間調式を五音の枠に押し込むなと注意する：陝北民謡の徵調式は角音を欠き、変宮（F♯）と清角（C）を特性音にもつ。山西のある七声音階は構造がミクソリディアと同じだが旋律の動きが違う。湖南の花鼓調は第 3・7 音を上げ、ジプシー音階に近い。同類の民謡の実際の規則から理解すべきだ。', 'Yet He Luting warns against forcing every folk mode into the pentatonic frame: northern Shaanxi zhi-mode songs lack jue and use bian-gong (F♯) and qing-jue (C) as their signature notes; a Shanxi seven-note scale has the structure of Mixolydian but moves differently; Hunan huagu tunes raise the third and seventh, close to the “Gypsy” scale. Learn them from how such songs actually behave.'),
        ],
      },
      {
        id: 'b16x-e7', type: 'discover', practice: true, ref: ['omt2e-collections', 'zhwiki-pentatonic'],
        prompt: t('一段旋律只用 B♭ C D F G，最后停在 G 上。这是什么调式？', '旋律は B♭ C D F G だけを使い、最後は G で止まる。何の調式？', 'A melody uses only B♭ C D F G and ends on G. Which mode?'),
        options: [t('G 羽调式（B♭ 宫）', 'G 羽調式（B♭ 宮）', 'G yu mode (B♭ gong)'), t('G 宫调式', 'G 宮調式', 'G gong mode'), t('G 徵调式（C 宫）', 'G 徵調式（C 宮）', 'G zhi mode (C gong)')],
        answer: 0,
        insight: { title: t('B♭–D 是唯一的大三度', 'B♭–D が唯一の長 3 度', 'B♭–D is the only major third'), text: t('B♭–C–D 两个连续全音 → 宫是 B♭；G 在 B♭ 宫里是羽 → G 羽调式。', 'B♭–C–D と全音が 2 つ続く → 宮は B♭。G は B♭ 宮の羽 → G 羽調式。', 'B♭–C–D are two whole steps → gong is B♭; G is yu in B♭ gong → G yu mode.') },
      },
      {
        id: 'b16x-e8', type: 'page', ref: 'omt2e-pentatonic-harmony',
        title: t('进阶 5、6 · 五声在摇滚和声里：根音是五声的，和弦性质随意', '発展 5・6・ロックの五音和声：根音は五音、和音の性質は自由', 'Advanced 5–6 · Pentatonic harmony in rock: pentatonic roots, any chord quality'),
        text: [
          t('五声既是蓝调音阶的子集，也是自然音阶的子集：只有五个音、没有半音。五种旋转互不相同（不是所有五音音集都这样），流行音乐里最常用"大五声"和"小五声"两种。', '五音は ブルース音階の部分集合でもあり、全音階の部分集合でもある：5 音だけ、半音なし。5 つの転回は互いに違う（すべての 5 音集合がそうではない）。ポップスでよく使うのは「長調ペンタトニック」と「短調ペンタトニック」。', 'The pentatonic is a subset of both the blues scale and the diatonic: five notes, no half steps. Its five rotations all differ (not every five-note set does), and pop music mostly uses two: major and minor pentatonic.'),
          t('摇滚常把五声的音当作和弦的根音：和弦可以是大三、小三、强力和弦（只有根音和五音、没有三音），或加七音、加音。因为性质很自由，所有和弦音合起来往往不只是五声，甚至不属于任何七声调式。', 'ロックは五音の音を和音の根音に使うことが多い：和音は長三・短三・パワーコード（根音と 5 度だけ、3 度なし）、七の和音や付加音でもよい。性質が自由なので、全部の和音構成音を合わせると五音どころか、どの 7 音旋法にも収まらないことがよくある。', 'Rock often uses pentatonic notes as chord roots: the chords may be major, minor, power chords (root and fifth, no third), sevenths or added-note chords. With quality so free, the total set of chord tones is often not pentatonic — or even any seven-note mode.'),
        ],
      },
      {
        id: 'b16x-e9', type: 'demo', ref: 'omt2e-pentatonic-harmony',
        title: t('进阶 7 · 同一个音级的两种形态', '発展 7・同じ音度の 2 つの姿', 'Advanced 7 · One scale degree in two forms'),
        steps: [
          { text: t('在五声根音上用平行的大三和弦：E 为主音时，C、G、D、A、E 大三和弦里同时有 G♯（mi）和 G（me），C♯（la）和 C（le）。这叫"音级冲突"或"交错关系"。', '五音の根音に平行の長三和音を置く：主音 E なら、C・G・D・A・E の長三和音の中に G♯（mi）と G（me）、C♯（la）と C（le）が同時に出てくる。「音度の衝突」「対斜」と呼ぶ。', 'Parallel major triads on pentatonic roots: with E as tonic, the C, G, D, A, E triads contain both G♯ (mi) and G (me), C♯ (la) and C (le). This is a scale-degree conflict, or cross relation.'), audio: { notes: [HJ.C, HJ.G, HJ.D, HJ.A, HJ.E], mode: 'chords' } },
          { text: t('Nicole Biamonte 等人指出，这大概不是巧合：根音按五声走、和弦全是平行的横按大三和弦，在吉他上一个指型平移就能弹。Stevie Wonder《Higher Ground》的循环也能这样理解——第一个和弦的性质有点含糊，低音却非常清楚。', 'ニコル・ビアモンテらは、これは偶然ではないだろうと言う：根音は五音、和音はすべて平行の長三のバレーコード——ギターでは 1 つの形をずらすだけで弾ける。スティーヴィー・ワンダー《Higher Ground》のループもこう理解できる——最初の和音の性質はややあいまいだが、バスはとても明確。', 'Nicole Biamonte and others note it is probably no coincidence: pentatonic roots with parallel major barre chords just slide one shape along the guitar neck. Stevie Wonder’s “Higher Ground” loop can be read this way — the first chord’s quality is a bit ambiguous, but the bass is perfectly clear.') },
        ],
      },
      {
        id: 'b16x-e10', type: 'discover', practice: true, ref: 'omt2e-pentatonic-harmony',
        prompt: t('判断一段五声和声进行时，最可靠的线索是什么？', '五音和声の進行を判断するとき、いちばん確かな手がかりは？', 'Judging a pentatonic chord progression, the most reliable clue is…'),
        options: [t('低音（根音）', 'バス（根音）', 'The bass (roots)'), t('每个和弦的性质', '各和音の性質', 'Each chord’s quality'), t('有没有七音', '七の音があるか', 'Whether there are sevenths')],
        answer: 0,
        insight: { title: t('性质可以含糊，低音不会', '性質はあいまいでも、バスは明確', 'Quality may blur; the bass will not'), text: t('五声决定的是根音；和弦性质很自由，有时还含糊不清——所以从低音读出五声最稳。', '五音が決めるのは根音。性質は自由で、あいまいなこともある——だからバスから五音を読むのが確か。', 'The pentatonic governs the roots; qualities are free and sometimes ambiguous — so read the pentatonic from the bass.') },
      },
      {
        id: 'b16x-e11', type: 'page', ref: ['omt2e-pentatonic-harmony', 'omt-pb-modal-schemas'],
        title: t('进阶 8 · 五度、五声与 Mixolydian：一样的进行，不止一种读法', '発展 8・5 度・五音・ミクソリディア：同じ進行に複数の読み方', 'Advanced 8 · Fifths, pentatonic, Mixolydian: one progression, several readings'),
        text: [
          t('五声和自然音集都能用五度连出来，所以按五度组织的进行常常可以用五声来理解。例如两对相隔全音的五度 D–A、C–G：这正是 TLC《Waterfalls》的和弦进行。可是同一个 D–A–C–G 也能读成 D 调的 I–V–♭VII–IV，也就是 Mixolydian 双重变格（♭VII–IV–I）加上一个 V。', '五音も全音階も 5 度でつなげて作れるので、5 度で組み立てた進行は五音で理解できることが多い。たとえば全音離れた 2 組の 5 度 D–A、C–G：TLC《Waterfalls》の進行。でも同じ D–A–C–G は D 調の I–V–♭VII–IV、つまりミクソリディアのダブル・プラガル（♭VII–IV–I）に V を加えたものとも読める。', 'Both pentatonic and diatonic sets can be built from fifths, so fifth-based progressions can often be heard pentatonically — e.g. two fifths a whole step apart, D–A and C–G: TLC’s “Waterfalls”. Yet the same D–A–C–G reads in D as I–V–♭VII–IV, a Mixolydian double plagal (♭VII–IV–I) plus a V.'),
          t('什么才算"典型的五声进行"？这是个开放问题：大多数进行不到五个和弦，和弦性质又很自由；只看音的话，所有五声进行都是自然音调式的子集。还要看主旋律、即兴独奏和风格语境。像《Hey Joe》那样五个和弦正好用完五声的五个音，五声的读法就很有说服力——即使如此，它也能被看作 Aeolian 的子集，或延长的双重变格。', '「典型的な五音の進行」とは？ 開かれた問題だ：ほとんどの進行は 5 和音より少なく、和音の性質も自由。音だけを見れば、どの五音進行も全音階旋法の部分集合。主旋律・即興ソロ・様式の文脈も見る必要がある。《Hey Joe》のように 5 和音で五音の 5 音をちょうど使い切ると、五音の読みにかなり説得力がある——それでもエオリアの部分集合や、延長されたダブル・プラガルとも見られる。', 'What makes a quintessentially pentatonic progression? An open question: most progressions use fewer than five chords, qualities are flexible, and by notes alone every pentatonic progression is a subset of the diatonic modes. Melody, solos and style matter too. A five-chord progression using all and only the pentatonic notes, like “Hey Joe”, makes a strong pentatonic case — though even it can be heard as an Aeolian subset or an extended double plagal.'),
        ],
      },
      {
        id: 'b16x-e12', type: 'discover', practice: true, ref: ['omt2e-pentatonic-harmony', 'omt-pb-modal-schemas'],
        prompt: t('D – A – C – G 读成 D 调，四个和弦的级数是？', 'D – A – C – G を D 調で読むと？', 'Read D – A – C – G in D. The numerals are…'),
        options: ['I – V – ♭VII – IV', 'I – IV – ♭VII – ♭III', 'I – V – vi – IV', 'V – II – IV – I'],
        answer: 0,
        insight: { title: t('后三个就是双重变格的走法', '後ろの 3 つはダブル・プラガルの動き', 'The last three move like a double plagal'), text: t('D = I、A = V、C = ♭VII、G = IV：五声也说得通，Mixolydian 也说得通。', 'D = I、A = V、C = ♭VII、G = IV：五音でも、ミクソリディアでも読める。', 'D = I, A = V, C = ♭VII, G = IV: pentatonic works, and so does Mixolydian.') },
      },
    ],
    experiment: [
      { id: 'b16x-x1', type: 'experiment', toy: 'progression', ref: 'omt2e-pentatonic-harmony',
        prompt: t('《Hey Joe》式的四度链 C – G – D – A – E：每个根音选大三、小三或强力和弦（5）。全选大三时，听得到 G 与 G♯、C 与 C♯ 的冲突；全选强力和弦时，冲突还在吗？', '《Hey Joe》式の 4 度の鎖 C – G – D – A – E：各根音で長三・短三・パワーコード（5）を選ぼう。全部長三だと G と G♯、C と C♯ の衝突が聞こえる。全部パワーコードなら衝突は残る？', 'The “Hey Joe” chain C – G – D – A – E: choose major, minor or a power chord (5) on each root. All major, you hear G against G♯, C against C♯; all power chords — is the conflict still there?'),
        params: { gap: 800, slots: ['C', 'G', 'D', 'A', 'E'].map(hjSlot), presets: [
          { label: t('全部大三', 'すべて長三', 'All major'), picks: [0, 0, 0, 0, 0], explain: t('五个平行大三和弦：mi / me、la / le 同时出现。', '5 つの平行長三和音：mi / me、la / le が同時に。', 'Five parallel major triads: mi / me and la / le both appear.') },
          { label: t('全部强力和弦', 'すべてパワーコード', 'All power chords'), picks: [2, 2, 2, 2, 2], explain: t('没有三音，就没有 mi / me 的冲突，只剩五声的根音和五音。', '3 度がないので mi / me の衝突は消え、五音の根音と 5 度だけ。', 'No thirds, no mi / me conflict — only pentatonic roots and fifths.') },
        ] },
        breakthrough: { id: 'b16x-conflict', text: t('你听到了：根音是五声的，和弦性质一变，音级冲突就出现或消失。', '根音は五音のまま、和音の性質を変えると音度の衝突が現れたり消えたりする——聴き取れた。', 'You heard it: the roots stay pentatonic while the chord quality makes the scale-degree conflict appear or vanish.') } },
      { id: 'b16x-x2', type: 'experiment', toy: 'scale', ref: ['zhwiki-pentatonic', 'omt2e-collections'],
        prompt: t('换主音、换五种调式（宫商角徵羽），听每种的颜色；数一数每种的台阶，看 2–2–3–2–3 怎样旋转。', '主音と 5 つの調式（宮商角徵羽）を替えて色を聴こう。段差を数えて 2–2–3–2–3 がどう回転するか見よう。', 'Change the tonic and the five modes (gong, shang, jue, zhi, yu) to hear each colour; count the steps and watch 2–2–3–2–3 rotate.'),
        params: { sets: PENTA_SETS } },
    ],
    challenge: [
      {
        id: 'b16x-c1', type: 'choice', error: 'chinese-mode', skills: ['identify'], ref: ['zhwiki-pentatonic', 'omt2e-collections'],
        variants: [
          { prompt: t('五个音 E♭ F G B♭ C，旋律停在 C。这是？', '5 音 E♭ F G B♭ C、旋律は C で止まる。これは？', 'Five notes E♭ F G B♭ C, ending on C. This is…'), options: [t('C 羽调式（E♭ 宫）', 'C 羽調式（E♭ 宮）', 'C yu mode (E♭ gong)'), t('C 宫调式', 'C 宮調式', 'C gong mode'), t('C 商调式（B♭ 宫）', 'C 商調式（B♭ 宮）', 'C shang mode (B♭ gong)'), t('C 徵调式（F 宫）', 'C 徵調式（F 宮）', 'C zhi mode (F gong)')] },
          { prompt: t('五个音 A B C♯ E F♯，旋律停在 B。这是？', '5 音 A B C♯ E F♯、旋律は B で止まる。これは？', 'Five notes A B C♯ E F♯, ending on B. This is…'), options: [t('B 商调式（A 宫）', 'B 商調式（A 宮）', 'B shang mode (A gong)'), t('B 羽调式', 'B 羽調式', 'B yu mode'), t('B 宫调式', 'B 宮調式', 'B gong mode'), t('B 角调式（G 宫）', 'B 角調式（G 宮）', 'B jue mode (G gong)')] },
          { prompt: t('五个音 D E F♯ A B，旋律停在 A。这是？', '5 音 D E F♯ A B、旋律は A で止まる。これは？', 'Five notes D E F♯ A B, ending on A. This is…'), options: [t('A 徵调式（D 宫）', 'A 徵調式（D 宮）', 'A zhi mode (D gong)'), t('A 羽调式（C 宫）', 'A 羽調式（C 宮）', 'A yu mode (C gong)'), t('A 宫调式', 'A 宮調式', 'A gong mode'), t('A 商调式（G 宫）', 'A 商調式（G 宮）', 'A shang mode (G gong)')] },
        ],
        answer: 0,
        explain: t('两个连续全音构成的大三度，下面那个音是宫；旋律停在的音的阶名就是调式名。', '続く 2 つの全音の長 3 度の下の音が宮。旋律が止まる音の階名が調式名。', 'The lower note of the major third formed by two consecutive whole steps is gong; the final note’s degree names the mode.'),
      },
      {
        id: 'b16x-c2', type: 'choice', error: 'chinese-mode', skills: ['calc'], ref: 'zhwiki-pentatonic',
        variants: [
          { prompt: t('三分损益：宫 81 "三分去一"得到？', '三分損益：宮 81 から「三分去一」で？', 'Remove a third from gong 81. You get…'), options: [t('徵 54', '徵 54', 'Zhi 54'), t('商 72', '商 72', 'Shang 72'), t('羽 48', '羽 48', 'Yu 48'), t('角 64', '角 64', 'Jue 64')] },
          { prompt: t('三分损益：羽 48 "三分益一"得到？', '三分損益：羽 48 から「三分益一」で？', 'Add a third to yu 48. You get…'), options: [t('角 64', '角 64', 'Jue 64'), t('徵 54', '徵 54', 'Zhi 54'), t('商 72', '商 72', 'Shang 72'), t('宫 81', '宮 81', 'Gong 81')] },
          { prompt: t('宫 : 徵 的管长比是 81 : 54。化简是？', '宮 : 徵 の管長比 81 : 54 を簡単にすると？', 'The pipe ratio gong : zhi is 81 : 54. Simplified?'), options: ['3 : 2', '4 : 3', '9 : 8', '2 : 1'] },
        ],
        answer: 0,
        explain: t('去一 = ×⅔（升五度），益一 = ×4⁄3（降四度）：81 → 54 → 72 → 48 → 64；81 : 54 = 3 : 2，正是纯五度。', '去一 = ×⅔（5 度上）、益一 = ×4⁄3（4 度下）：81 → 54 → 72 → 48 → 64。81 : 54 = 3 : 2、完全 5 度。', 'Remove = ×⅔ (up a fifth), add = ×4⁄3 (down a fourth): 81 → 54 → 72 → 48 → 64; 81 : 54 = 3 : 2, a perfect fifth.'),
      },
      {
        id: 'b16x-c3', type: 'choice', error: 'chinese-mode', skills: ['identify'], ref: ['zhwiki-heptatonic', 'helvting-scales'],
        variants: [
          { prompt: t('七声调式是怎样得到的？', '七声調式はどうできる？', 'How is a seven-note (heptatonic) Chinese mode formed?'), options: [t('在五声的两个小三度缺口里各加一个偏音', '五音の 2 つの短 3 度のすき間に偏音を 1 つずつ', 'Add an auxiliary note in each of the two minor-third gaps'), t('把五声升高半音', '五音を半音上げる', 'Raise the pentatonic a half step'), t('叠七个纯五度', '完全 5 度を 7 つ重ねる', 'Stack seven fifths')] },
          { prompt: t('隋唐的"八十四调"是怎么算出来的？', '隋唐の「八十四調」はどう数えた？', 'How was the Sui–Tang “84 modes” figure reached?'), options: [t('12 个半音 × 7 种调式的理论推算', '12 半音 × 7 調式の理論上の数', 'A theoretical 12 half steps × 7 modes'), t('实际用过的 84 首曲子', '実際に使われた 84 曲', '84 pieces actually used'), t('84 种乐器', '84 種の楽器', '84 instruments')] },
          { prompt: t('荆轲易水边"为变徵之声"——变徵大约相当于 C 调的？', '荊軻の「変徵の声」——変徵はハ調のおよそ？', 'Jing Ke sang “in the bian-zhi sound” — bian-zhi is roughly which note in C?'), options: ['F♯', 'F', 'B♭', 'A'] },
        ],
        answer: 0,
        explain: t('七声 = 五声加两个偏音（分清乐、燕乐、雅乐）；八十四调是 12 × 7 的理论数；变徵在徵下方半音，C 调里约当升 F。', '七声 = 五音 + 偏音 2 つ（清楽・燕楽・雅楽）。八十四調は 12 × 7 の理論上の数。変徵は徵の半音下、ハ調で F♯ ほど。', 'Heptatonic = pentatonic + two auxiliary notes (qingyue, yanyue, yayue); 84 = a theoretical 12 × 7; bian-zhi sits a half step below zhi — about F♯ in C.'),
      },
      {
        id: 'b16x-c4', type: 'choice', error: 'pentatonic-harmony', skills: ['function'], ref: 'omt2e-pentatonic-harmony',
        variants: [
          { prompt: t('E 为主音，C 大三和弦之后接 G 大三和弦。哪个音级以两种形态出现？', '主音 E、C の長三和音の後に G の長三和音。2 つの姿で現れる音度は？', 'Tonic E: a C major chord, then G major. Which degree appears in two forms?'), options: [t('mi 与 me（G♯ 与 G）', 'mi と me（G♯ と G）', 'mi and me (G♯ and G)'), t('fa 与 fi', 'fa と fi', 'fa and fi'), t('ti 与 te', 'ti と te', 'ti and te')] },
          { prompt: t('强力和弦里有哪几个音？', 'パワーコードの構成音は？', 'Which notes are in a power chord?'), options: [t('根音和五音', '根音と 5 度', 'Root and fifth'), t('根音和三音', '根音と 3 度', 'Root and third'), t('根音、三音、五音', '根音・3 度・5 度', 'Root, third and fifth')] },
          { prompt: t('五声和声里，什么来自五声音阶？', '五音和声で五音音階から来るのは？', 'In pentatonic harmony, what comes from the pentatonic scale?'), options: [t('和弦的根音', '和音の根音', 'The chord roots'), t('每个和弦的三音', '各和音の 3 度', 'Every chord’s third'), t('所有和弦音', 'すべての構成音', 'All chord tones')] },
        ],
        answer: 0,
        explain: t('五声决定根音，和弦性质随意（大三、小三、强力和弦）；E 为主音时，G 大三里的 G 是 me，E 大三里的 G♯ 是 mi。', '五音が根音を決め、性質は自由（長三・短三・パワーコード）。主音 E なら G 長三の G は me、E 長三の G♯ は mi。', 'The pentatonic sets the roots; quality is free (major, minor, power chord); with E as tonic, G major’s G is me while E major’s G♯ is mi.'),
      },
      {
        id: 'b16x-c5', type: 'choice', error: 'pentatonic-harmony', skills: ['identify'], ref: ['omt2e-pentatonic-harmony', 'omt2e-collections'],
        variants: [
          { prompt: t('五声音集从自然音集里去掉了哪两个音（按大调级数）？', '五音は全音階からどの 2 音を除く（長調の音度で）？', 'Which two degrees does the pentatonic remove from the diatonic (in major)?'), options: [t('fa 和 ti（第 4、7 级）', 'fa と ti（第 4・7 音）', 'fa and ti (4 and 7)'), t('re 和 la', 're と la', 're and la'), t('mi 和 sol', 'mi と sol', 'mi and sol')] },
          { prompt: t('D – A – C – G 这条进行，五声和 Mixolydian 哪个读法对？', 'D – A – C – G は五音とミクソリディアのどちらの読みが正しい？', 'D – A – C – G: is the pentatonic or the Mixolydian reading right?'), options: [t('两种都说得通，这是开放问题', 'どちらも成り立つ、開かれた問題', 'Both work — it is an open question'), t('只能是五声', '五音だけ', 'Only pentatonic'), t('只能是 Mixolydian', 'ミクソリディアだけ', 'Only Mixolydian')] },
        ],
        answer: 0,
        explain: t('五声去掉产生半音的 fa、ti；D–A–C–G 既是两对五度（五声），也是 I–V–♭VII–IV（Mixolydian）。', '五音は半音を生む fa・ti を除く。D–A–C–G は 2 組の 5 度（五音）でもあり、I–V–♭VII–IV（ミクソリディア）でもある。', 'The pentatonic drops the half-step makers fa and ti; D–A–C–G is both two pairs of fifths (pentatonic) and I–V–♭VII–IV (Mixolydian).'),
      },
      G('b16x-g1', 'scaleLibrary', 1, ['spell']),
      G('b16x-g2', 'circleStep', 1, ['calc']),
    ],
  },
  pool: [G('b16x-p1', 'chineseNote', 3, ['identify']), G('b16x-p2', 'scaleLibrary', 2, ['spell'])],
};

// ===================== B1-7x 织体与声部独立 · 扩展关 =====================
// 对应 A 面：texture（辨认四种织体 / 主调与四部和声 / 织体会变化 / 织体综合）的进阶关
const TX_MELODY = [[0, 72], [1, 74], [2, 76], [3, 72], [4, 76], [5, 77], [6, 79]];
const TX_LAYERS = {
  melody: TX_MELODY,
  octave: TX_MELODY.map(([b, m]) => [b, m - 12]),
  variant: [[0, 72], [0.5, 71], [1, 74], [2, 76], [2.5, 74], [3, 72], [4, 76], [5, 77], [5.5, 76], [6, 79]],
  block: [[0, 48], [0, 60], [0, 64], [1, 43], [1, 59], [1, 65], [2, 48], [2, 60], [2, 67], [3, 45], [3, 57], [3, 64], [4, 48], [4, 60], [4, 67], [5, 41], [5, 57], [5, 65], [6, 43], [6, 59], [6, 62]],
  accomp: [[0, 48], [0.5, 64], [1, 43], [1.5, 65], [2, 48], [2.5, 67], [3, 45], [3.5, 64], [4, 48], [4.5, 67], [5, 41], [5.5, 65], [6, 43], [6.5, 62], [7, 48], [7.5, 64]],
  canon: TX_MELODY.map(([b, m]) => [b + 2, m - 12]).filter(([b]) => b < 8),
};
const txAudio = (...ids) => ({ rhythm: { bpm: 100, cycle: 8, repeats: 1, tracks: ids.map((id) => ({ beats: TX_LAYERS[id].map((n) => n[0]), midis: TX_LAYERS[id].map((n) => n[1]) })) } });
const TEXTURE_X = {
  bpm: 100, cycle: 8,
  layers: [
    { id: 'melody', label: t('旋律', '旋律', 'Melody'), notes: TX_LAYERS.melody },
    { id: 'octave', label: t('低八度齐奏', '1 オクターヴ下のユニゾン', 'Doubling an octave below'), notes: TX_LAYERS.octave },
    { id: 'variant', label: t('同一旋律的变体', '同じ旋律の変奏', 'Variant of the melody'), notes: TX_LAYERS.variant },
    { id: 'block', label: t('同节奏的柱式和弦', '同じリズムの和音', 'Block chords in the same rhythm'), notes: TX_LAYERS.block },
    { id: 'accomp', label: t('节奏不同的伴奏', 'リズムの違う伴奏', 'Accompaniment in another rhythm'), notes: TX_LAYERS.accomp },
    { id: 'canon', label: t('晚两拍进来的同一旋律', '2 拍遅れて入る同じ旋律', 'The melody entering two beats later'), notes: TX_LAYERS.canon },
  ],
  presets: [
    { label: t('单声部', 'モノフォニー', 'Monophony'), layers: ['melody'], explain: t('一条没有伴奏的旋律。', '伴奏のない旋律 1 本。', 'One unaccompanied line.') },
    { label: t('单声部（八度齐奏）', 'モノフォニー（オクターヴのユニゾン）', 'Monophony (octave unison)'), layers: ['melody', 'octave'], explain: t('两个声部，奏的却是同一条线：仍然是单声部。', '2 声部でも同じ線を奏でる：モノフォニーのまま。', 'Two parts playing the same line: still monophony.') },
    { label: t('支声', 'ヘテロフォニー', 'Heterophony'), layers: ['melody', 'variant'], explain: t('同一旋律的两个版本，一个加了装饰。', '同じ旋律の 2 つの版、片方に装飾。', 'Two versions of one melody, one embellished.') },
    { label: t('主调：同节奏', 'ホモフォニー：ホモリズム', 'Homophony: homorhythm'), layers: ['melody', 'block'], explain: t('所有声部节奏一致，像众赞歌那样的柱式和弦。', '全声部が同じリズム、コラールのような和音の塊。', 'All parts in the same rhythm — chorale-like block chords.') },
    { label: t('主调：旋律加伴奏', 'ホモフォニー：旋律と伴奏', 'Homophony: melody and accompaniment'), layers: ['melody', 'accomp'], explain: t('旋律清楚，伴奏用不同的节奏填满和声。', '旋律がはっきりし、伴奏は違うリズムで和声を満たす。', 'A clear melody; the accompaniment fills the harmony in a different rhythm.') },
    { label: t('复调', 'ポリフォニー', 'Polyphony'), layers: ['melody', 'canon'], explain: t('两条独立的旋律，节奏错开。', '独立した 2 本の旋律、リズムがずれる。', 'Two independent lines, rhythms offset.') },
  ],
};
const EXT_B1_7 = {
  minutes: 18,
  insight: t('声部多不等于复调：八个乐器齐奏还是单声部，四个声部一起换和弦是主调——要看的是线和线之间是什么关系。', '声部が多くてもポリフォニーとは限らない：8 つの楽器のユニゾンはモノフォニー、4 声部が一緒に和音を変えるのはホモフォニー——見るのは線どうしの関係。', 'More parts does not mean polyphony: eight instruments in unison are monophony, four parts changing chords together are homophony — what matters is how the lines relate.'),
  sections: {
    discover: [
      {
        id: 'b17x-d1', type: 'discover', ref: 'omt2e-texture',
        prompt: t('同一条旋律，两种加法：A 加了一个低八度、奏同样的音；B 加了同节奏的柱式和弦。哪一个仍然是单声部？', '同じ旋律に 2 通りの加え方：A は 1 オクターヴ下で同じ音、B は同じリズムの和音。モノフォニーのままなのはどっち？', 'One melody, two additions: A adds an octave below playing the same notes; B adds block chords in the same rhythm. Which is still monophony?'),
        play: [{ label: 'A', audio: txAudio('melody', 'octave') }, { label: 'B', audio: txAudio('melody', 'block') }],
        options: [t('A：只是把同一条线重叠了', 'A：同じ線を重ねただけ', 'A: it just doubles the same line'), t('B：节奏一样就是单声部', 'B：リズムが同じならモノフォニー', 'B: same rhythm means monophony'), t('两个都不是单声部', 'どちらも違う', 'Neither')],
        answer: 0,
        insight: {
          title: t('齐奏也是单声部', 'ユニゾンもモノフォニー', 'Unison is still monophony'),
          text: t('单声部 = 一条没有伴奏的旋律线；所有乐器齐奏（同度或八度）时仍只有一条线，所以还是单声部——它是最简单、也最"暴露"的织体。B 多了和声，各声部以同样的节奏一起换和弦：这是主调里的"同节奏"。', 'モノフォニー = 伴奏のない旋律線 1 本。全楽器がユニゾン（同度やオクターヴ）でも線は 1 本なのでモノフォニー——最も単純で、最も「むき出し」のテクスチュア。B は和声が加わり、全声部が同じリズムで和音を変える：ホモフォニーの「ホモリズム」。', 'Monophony is a single unaccompanied line; when everyone plays in unison (or octaves) there is still one line, so it stays monophony — the simplest and most exposed texture. B adds harmony, all parts changing chords in the same rhythm: homorhythm, a kind of homophony.'),
        },
      },
    ],
    explain: [
      {
        id: 'b17x-e1', type: 'page', ref: 'omt2e-texture',
        title: t('进阶 1 · 四种织体，再看细一点', '発展 1・4 つのテクスチュアをもっと細かく', 'Advanced 1 · The four textures, more closely'),
        text: [
          t('织体描述各声部的"密度"和"相互作用"。单声部：一条没有伴奏的线，例如巴赫无伴奏大提琴组曲第 1 号的前奏曲、Pete Seeger 的独唱《Where Have All the Flowers Gone?》。', 'テクスチュアは声部の「密度」と「相互作用」を表す。モノフォニー：伴奏のない線 1 本。バッハの無伴奏チェロ組曲第 1 番プレリュード、ピート・シーガーの独唱《Where Have All the Flowers Gone?》など。', 'Texture describes the density of the voices and how they interact. Monophony: one unaccompanied line — the Prelude of Bach’s Cello Suite No. 1, Pete Seeger singing “Where Have All the Flowers Gone?” alone.'),
          t('支声：同一条旋律的几种变体同时出现。变化可以只是小小的装饰音，也可以是某个声部较长的经过句——只要旋律材料基本不变。土耳其古典音乐 Göksel Baktagir 的《Ana Hasreti》里管乐给拨弦乐器的旋律加装饰；爱尔兰 reel《The Wind That Shakes the Barley》（the Chieftains）里小提琴和长笛的旋律略有不同。', 'ヘテロフォニー：同じ旋律のいくつかの変奏が同時に。違いは小さな装飾音でも、ある声部の長めの走句でもよい——旋律素材がほぼ同じなら。トルコ古典音楽ギョクセル・バクタギル《Ana Hasreti》では管楽器が撥弦の旋律を装飾し、アイルランドのリール《The Wind That Shakes the Barley》（チーフタンズ）ではフィドルとフルートの旋律が少し違う。', 'Heterophony: several variants of one melody at once — from tiny embellishments to longer runs in one part, as long as the melodic material stays much the same. In Göksel Baktagir’s Turkish classical piece “Ana Hasreti” winds embellish the plucked strings’ melody; in the Irish reel “The Wind That Shakes the Barley” (the Chieftains) fiddle and flute differ slightly.'),
        ],
      },
      {
        id: 'b17x-e2', type: 'discover', practice: true, ref: 'omt2e-texture',
        prompt: t('听：两个声部基本是同一条旋律，上面那个多了几个经过的小音。这是？', '聴いて：2 声部はほぼ同じ旋律で、上には経過の小さな音が加わる。これは？', 'Listen: both parts play essentially the same melody; the upper adds a few passing notes. This is…'),
        play: [{ label: t('播放', '再生', 'Play'), audio: txAudio('variant', 'octave') }],
        options: [t('支声', 'ヘテロフォニー', 'Heterophony'), t('复调', 'ポリフォニー', 'Polyphony'), t('主调', 'ホモフォニー', 'Homophony')],
        answer: 0,
        insight: { title: t('同一旋律的变体', '同じ旋律の変奏', 'Variants of one melody'), text: t('旋律材料没变，只是一个声部加了装饰：支声。', '旋律素材は同じで、片方に装飾が加わるだけ：ヘテロフォニー。', 'Same melodic material, one part embellished: heterophony.') },
      },
      {
        id: 'b17x-e3', type: 'page', ref: 'omt2e-texture',
        title: t('进阶 2 · 主调的两个分支：同节奏，和旋律加伴奏', '発展 2・ホモフォニーの 2 つの枝：ホモリズムと旋律＋伴奏', 'Advanced 2 · Two branches of homophony: homorhythm, and melody with accompaniment'),
        text: [
          t('主调织体：几个声部以相同的步调一起移动和声，常常是一条旋律为主、其他声部填充和声。它又分两种。同节奏（homorhythm）：所有声部节奏几乎完全一样，最常见于众赞歌式的写法，旋律与和声像一块块柱式和弦一起走——例如 Tcherepnin 的圆号四重奏众赞歌；民歌《Wild Mountain Thyme》（the Longest Johns）里旋律突出，但各声部仍以同样的节奏唱。', 'ホモフォニー：複数の声部が同じ歩調で和声を動かす。多くは 1 本の旋律が主で、ほかが和声を満たす。2 種類ある。ホモリズム：全声部のリズムがほぼ同じ、コラール風の書法で多く、旋律と和声が和音の塊で進む——チェレプニンのホルン四重奏のコラールなど。民謡《Wild Mountain Thyme》（ロンゲスト・ジョンズ）では旋律が目立つが、声部は同じリズムで歌う。', 'Homophony: voices moving harmonically at the same pace, often one melody leading while the others fill the harmony. Two kinds. Homorhythm: all parts in nearly identical rhythm, typical of chorale-like writing, melody and harmony moving in block chords — e.g. Tcherepnin’s horn-quartet Chorale; in “Wild Mountain Thyme” (the Longest Johns) the melody stands out but the voices still sing in rhythmic unison.'),
          t('旋律加伴奏：大概是最常见的主调——旋律清楚，其他声部是"伴奏"，节奏往往和旋律不同。Hindemith 长笛奏鸣曲第二乐章里钢琴从不和长笛完全同节奏，却负责填满和声；Ella Fitzgerald 唱《Misty》时钢琴为人声伴奏。', '旋律と伴奏：おそらく最も多いホモフォニー——旋律がはっきりし、ほかの声部が「伴奏」、リズムはしばしば旋律と違う。ヒンデミットのフルート・ソナタ第 2 楽章ではピアノはフルートと完全に同じリズムにならないが和声を満たす。エラ・フィッツジェラルドの《Misty》ではピアノが歌を伴奏する。', 'Melody and accompaniment, probably the most common homophony: a clear melody with supporting voices, often in a different rhythm. In the second movement of Hindemith’s Flute Sonata the piano never quite matches the flute’s rhythm yet fills out the harmony; in “Misty” the piano accompanies Ella Fitzgerald’s voice.'),
        ],
      },
      {
        id: 'b17x-e4', type: 'discover', practice: true, ref: 'omt2e-texture',
        prompt: t('听：上面一条旋律，下面的伴奏每拍分成两个音，节奏和旋律不同。这是主调的哪一种？', '聴いて：上に旋律、下の伴奏は 1 拍を 2 音に分け、リズムが旋律と違う。ホモフォニーのどれ？', 'Listen: a melody on top; below, the accompaniment splits each beat into two notes, unlike the melody. Which kind of homophony?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: txAudio('melody', 'accomp') }],
        options: [t('旋律加伴奏', '旋律と伴奏', 'Melody and accompaniment'), t('同节奏', 'ホモリズム', 'Homorhythm'), t('支声', 'ヘテロフォニー', 'Heterophony')],
        answer: 0,
        insight: { title: t('伴奏有自己的节奏', '伴奏には自分のリズム', 'The accompaniment has its own rhythm'), text: t('伴奏节奏不同、只负责和声，旋律清楚地在上面：旋律加伴奏。', '伴奏はリズムが違い和声を受け持ち、旋律ははっきり上に：旋律と伴奏。', 'A differently rhythmed accompaniment supplying harmony under a clear melody: melody and accompaniment.') },
      },
      {
        id: 'b17x-e5', type: 'page', ref: ['omt2e-texture', 'omt2e-intro'],
        title: t('进阶 3 · 复调：独立的线怎样合成和声', '発展 3・ポリフォニー：独立した線が和声になる', 'Advanced 3 · Polyphony: independent lines that make harmony'),
        text: [
          t('复调：每个声部都有自己独立的旋律和节奏，合在一起又形成和声。西方古典音乐里最典型的是赋格，例如肖斯塔科维奇的 D 大调赋格（No. 5）；音乐剧《Rent》的"I\'ll Cover You – Reprise"结尾合唱里，三层人声唱不同的旋律和节奏，一起构成新的和声。', 'ポリフォニー：各声部に独立した旋律とリズムがあり、合わさって和声をつくる。西洋古典ではフーガが典型、たとえばショスタコーヴィチのニ長調フーガ（第 5 番）。ミュージカル《レント》の "I\'ll Cover You – Reprise" の終わりの合唱では、3 層の声が違う旋律とリズムで新しい和声をつくる。', 'Polyphony: every voice has its own melody and rhythm, yet together they make harmony. Fugues are the classic case, like Shostakovich’s Fugue No. 5 in D major; in the final chorus of “I’ll Cover You – Reprise” from Rent, three vocal layers sing different melodies and rhythms that combine into new harmonies.'),
          t('两个声部可以有四种进行：反向（一上一下）、同向（同一方向）、平行（同方向、同距离，前后音程种类一样，例如平行三度）、斜向（一个动、一个不动）。对位要同时照顾几种常常互相冲突的特质：流畅而独立的旋律线、音的融合（同时发声的音合成协和的整体）、变化、朝目标运动——它们来自人的听觉与认知（David Huron 2006），要在更长的段落里取得平衡。', '2 声部の進行は 4 種類：反行（上と下）、同行（同じ方向）、平行（同方向・同距離、前後の音程の種類が同じ、たとえば平行 3 度）、斜行（片方だけ動く）。対位法は互いにぶつかりがちな特質を同時に扱う：なめらかで独立した線、音の融合（同時の音が協和したまとまりになる）、変化、目標への動き——人の聴覚と認知から来ており（デイヴィッド・ヒューロン 2006）、長い区間でバランスを取る。', 'Two parts can move four ways: contrary (opposite directions), similar (same direction), parallel (same direction and distance, keeping the interval type — e.g. parallel thirds), oblique (one moves, one stays). Counterpoint balances traits that often conflict: smooth, independent lines; tonal fusion (simultaneous notes forming a consonant unity); variety; motion toward a goal — rooted in perception and cognition (David Huron 2006) and balanced over longer passages.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [{ p: 'E5', d: 'h', col: 0 }, { p: 'C4', d: 'h', col: 0 }, { p: 'D5', d: 'h', col: 1 }, { p: 'D4', d: 'h', col: 1 }, { p: 'C5', d: 'h', col: 2 }, { p: 'E4', d: 'h', col: 2 }], cols: 3 },
      },
      {
        id: 'b17x-e6', type: 'discover', practice: true, ref: 'omt2e-intro',
        prompt: t('上声部 E5 → D5 → C5，下声部 C4 → D4 → E4。这是哪种进行？', '上声部 E5 → D5 → C5、下声部 C4 → D4 → E4。どの進行？', 'Upper part E5 → D5 → C5, lower part C4 → D4 → E4. Which motion?'),
        options: [t('反向', '反行', 'Contrary'), t('平行', '平行', 'Parallel'), t('斜向', '斜行', 'Oblique'), t('同向', '同行', 'Similar')],
        answer: 0,
        insight: { title: t('一上一下', '上と下', 'One up, one down'), text: t('上声部下行、下声部上行：反向。它最能保持两个声部各自独立。', '上声部は下行、下声部は上行：反行。2 声部の独立をいちばん保ちやすい。', 'The upper part falls while the lower rises: contrary motion — the best keeper of independence.') },
      },
      {
        id: 'b17x-e7', type: 'page', ref: ['omt2e-texture', 'omt2e-roman-numerals'],
        title: t('进阶 4 · 一首曲子里，织体会换', '発展 4・1 曲の中でテクスチュアは変わる', 'Advanced 4 · Texture changes within a piece'),
        text: [
          t('大多数作品不会只停在一种织体：常见的是独唱或独奏开头（单声部），接着加入伴奏（旋律加伴奏），间奏几件乐器各奏各的（复调），最后全体一起唱出柱式和弦（同节奏）。分析时一段一段问两个问题：有几条线？它们是同一旋律、一起走和声，还是各走各的？', 'ほとんどの作品は 1 つのテクスチュアにとどまらない：独唱・独奏で始まり（モノフォニー）、伴奏が加わり（旋律と伴奏）、間奏では楽器がそれぞれ別に（ポリフォニー）、最後は全員で和音の塊（ホモリズム）。分析では区間ごとに 2 つの問い：線は何本？ 同じ旋律か、一緒に和声を動かすか、別々か？', 'Most works move between textures: a solo opening (monophony), then accompaniment (melody and accompaniment), an interlude where instruments go their own ways (polyphony), a final full-choir chordal passage (homorhythm). Analyse passage by passage with two questions: how many lines, and are they one melody, moving together harmonically, or independent?'),
          t('四部和声（女高、女中、男高、男低一起换和弦）是典型的主调同节奏写法，"古典和声连接器"写的就是这种织体；对位则偏向复调。', '4 声体和声（ソプラノ・アルト・テノール・バスが一緒に和音を変える）はホモリズムの典型で、「古典和声連結」が書くのはこのテクスチュア。対位法はポリフォニー寄り。', 'Four-part harmony — soprano, alto, tenor and bass changing chords together — is typical homorhythmic homophony, the texture the classical voice-leading tool writes; counterpoint leans toward polyphony.'),
        ],
      },
      {
        id: 'b17x-e8', type: 'discover', practice: true, ref: 'omt2e-texture',
        prompt: t('一首歌：开头无伴奏独唱 → 吉他按和弦伴奏 → 间奏小提琴和长笛各奏一条不同的旋律。织体依次是？', '歌：無伴奏の独唱 → ギターの和音伴奏 → 間奏でヴァイオリンとフルートが別々の旋律。テクスチュアは順に？', 'A song: unaccompanied solo voice → guitar chord accompaniment → an interlude where violin and flute play different melodies. The textures in order are…'),
        options: [t('单声部 → 旋律加伴奏 → 复调', 'モノフォニー → 旋律と伴奏 → ポリフォニー', 'Monophony → melody and accompaniment → polyphony'), t('支声 → 复调 → 主调', 'ヘテロフォニー → ポリフォニー → ホモフォニー', 'Heterophony → polyphony → homophony'), t('单声部 → 同节奏 → 支声', 'モノフォニー → ホモリズム → ヘテロフォニー', 'Monophony → homorhythm → heterophony')],
        answer: 0,
        insight: { title: t('一段一段地判断', '区間ごとに判断', 'Judge passage by passage'), text: t('无伴奏一条线、旋律加不同节奏的伴奏、两条独立旋律：同一首歌里换了三次织体。', '無伴奏の線 1 本、違うリズムの伴奏つき旋律、独立した 2 本の旋律：1 曲で 3 回変わる。', 'One unaccompanied line, melody with a differently rhythmed accompaniment, two independent melodies: three textures in one song.') },
      },
    ],
    experiment: [
      { id: 'b17x-x1', type: 'experiment', toy: 'texture', ref: 'omt2e-texture',
        prompt: t('六个预设：单声部、八度齐奏、支声、同节奏、旋律加伴奏、复调。也可以自己开关每一层——试试只开"旋律 + 低八度齐奏 + 同一旋律的变体"，它更像哪一种？', '6 つのプリセット：モノフォニー、オクターヴのユニゾン、ヘテロフォニー、ホモリズム、旋律と伴奏、ポリフォニー。各層を自分でオン・オフしてもよい——「旋律 + オクターヴのユニゾン + 変奏」だけにすると、どれに近い？', 'Six presets: monophony, octave unison, heterophony, homorhythm, melody and accompaniment, polyphony. Or toggle layers yourself — try only “melody + octave doubling + variant”: which does it resemble?'),
        params: TEXTURE_X,
        breakthrough: { id: 'b17x-six', text: t('同一条旋律，你搭出了六种织体：差别全在线和线的关系。', '同じ旋律で 6 つのテクスチュア：違いはすべて線どうしの関係。', 'One melody, six textures: the difference lies entirely in how the lines relate.') } },
    ],
    challenge: [
      {
        id: 'b17x-c1', type: 'choice', error: 'texture-type', skills: ['identify'], ref: 'omt2e-texture',
        variants: [
          { prompt: t('合唱团 30 个人齐唱同一条旋律，没有伴奏。这是？', '合唱団 30 人が同じ旋律をユニゾンで、伴奏なし。これは？', 'Thirty singers sing one melody in unison, unaccompanied. This is…'), options: [t('单声部', 'モノフォニー', 'Monophony'), t('复调', 'ポリフォニー', 'Polyphony'), t('主调', 'ホモフォニー', 'Homophony'), t('支声', 'ヘテロフォニー', 'Heterophony')] },
          { prompt: t('小提琴和长笛同奏一首 reel，彼此的旋律略有不同。这是？', 'ヴァイオリンとフルートが同じリールを、旋律を少し違えて。これは？', 'Fiddle and flute play a reel together, their melodies slightly different. This is…'), options: [t('支声', 'ヘテロフォニー', 'Heterophony'), t('复调', 'ポリフォニー', 'Polyphony'), t('单声部', 'モノフォニー', 'Monophony'), t('主调', 'ホモフォニー', 'Homophony')] },
          { prompt: t('赋格里三个声部各有独立的旋律和节奏。这是？', 'フーガで 3 声部がそれぞれ独立した旋律とリズム。これは？', 'In a fugue three voices each have their own melody and rhythm. This is…'), options: [t('复调', 'ポリフォニー', 'Polyphony'), t('支声', 'ヘテロフォニー', 'Heterophony'), t('主调', 'ホモフォニー', 'Homophony'), t('单声部', 'モノフォニー', 'Monophony')] },
        ],
        answer: 0,
        explain: t('人数不决定织体：齐唱一条线是单声部；同一旋律的变体是支声；独立的线是复调。', '人数ではなく関係で決まる：ユニゾンの線 1 本はモノフォニー、同じ旋律の変奏はヘテロフォニー、独立した線はポリフォニー。', 'The number of performers does not decide: one unison line is monophony; variants of a melody are heterophony; independent lines are polyphony.'),
      },
      {
        id: 'b17x-c2', type: 'choice', error: 'texture-type', skills: ['identify'], ref: 'omt2e-texture',
        variants: [
          { prompt: t('众赞歌：四个声部节奏几乎完全一样，一块块和弦往前走。这是主调的哪一种？', 'コラール：4 声部のリズムがほぼ同じで、和音の塊で進む。ホモフォニーのどれ？', 'A chorale: four parts in nearly identical rhythm, moving in block chords. Which kind of homophony?'), options: [t('同节奏（homorhythm）', 'ホモリズム', 'Homorhythm'), t('旋律加伴奏', '旋律と伴奏', 'Melody and accompaniment'), t('支声', 'ヘテロフォニー', 'Heterophony')] },
          { prompt: t('歌手唱旋律，钢琴用分解和弦伴奏，节奏和歌声不同。这是主调的哪一种？', '歌手が旋律、ピアノは分散和音で伴奏、リズムは歌と違う。ホモフォニーのどれ？', 'A singer has the melody; the piano accompanies in broken chords with a different rhythm. Which kind of homophony?'), options: [t('旋律加伴奏', '旋律と伴奏', 'Melody and accompaniment'), t('同节奏（homorhythm）', 'ホモリズム', 'Homorhythm'), t('复调', 'ポリフォニー', 'Polyphony')] },
        ],
        answer: 0,
        explain: t('同节奏：所有声部节奏一样（众赞歌式）；旋律加伴奏：伴奏节奏不同，只负责和声。', 'ホモリズム：全声部が同じリズム（コラール風）。旋律と伴奏：伴奏はリズムが違い、和声を受け持つ。', 'Homorhythm: all parts share the rhythm (chorale-like); melody and accompaniment: the accompaniment has its own rhythm and supplies harmony.'),
      },
      {
        id: 'b17x-c3', type: 'listen', error: 'texture-type', skills: ['hearing'], ref: 'omt2e-texture',
        prompt: t('听：这是哪种织体？', '聴いて：どのテクスチュア？', 'Listen: which texture is this?'),
        options: [t('单声部', 'モノフォニー', 'Monophony'), t('支声', 'ヘテロフォニー', 'Heterophony'), t('主调', 'ホモフォニー', 'Homophony'), t('复调', 'ポリフォニー', 'Polyphony')],
        variants: [
          { play: [{ label: t('播放', '再生', 'Play'), audio: txAudio('melody', 'octave') }], answer: 0 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: txAudio('melody', 'variant') }], answer: 1 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: txAudio('melody', 'block') }], answer: 2 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: txAudio('melody', 'canon') }], answer: 3 },
        ],
        explain: t('先数有几条线，再听它们是同一旋律、一起换和声，还是各走各的。', 'まず線の数、次に同じ旋律か、一緒に和声を変えるか、別々か。', 'Count the lines, then hear whether they are one melody, moving together harmonically, or independent.'),
        breakthrough: { id: 'b17x-hear', text: t('你用耳朵分出了织体。', 'テクスチュアを耳で聞き分けた。', 'You told the textures apart by ear.') },
      },
      {
        id: 'b17x-c4', type: 'choice', error: 'motion', skills: ['voiceLeading'], ref: 'omt2e-intro',
        variants: [
          { prompt: t('上声部保持 G4，下声部 C3 → E3。这是？', '上声部は G4 のまま、下声部 C3 → E3。これは？', 'The upper part holds G4 while the lower goes C3 → E3. This is…'), options: [t('斜向', '斜行', 'Oblique'), t('反向', '反行', 'Contrary'), t('平行', '平行', 'Parallel'), t('同向', '同行', 'Similar')] },
          { prompt: t('E4–C4（大三度）→ F4–D4（小三度）。这是？', 'E4–C4（長 3 度）→ F4–D4（短 3 度）。これは？', 'E4–C4 (a major third) → F4–D4 (a minor third). This is…'), options: [t('平行（平行三度）', '平行（平行 3 度）', 'Parallel (parallel thirds)'), t('同向', '同行', 'Similar'), t('反向', '反行', 'Contrary'), t('斜向', '斜行', 'Oblique')] },
          { prompt: t('C4–G4（纯五度）→ E4–C5（小六度）。这是？', 'C4–G4（完全 5 度）→ E4–C5（短 6 度）。これは？', 'C4–G4 (a fifth) → E4–C5 (a minor sixth). This is…'), options: [t('同向', '同行', 'Similar'), t('平行', '平行', 'Parallel'), t('反向', '反行', 'Contrary'), t('斜向', '斜行', 'Oblique')] },
        ],
        answer: 0,
        explain: t('一个不动是斜向；同方向且音程种类不变是平行；同方向但音程变了是同向；一上一下是反向。', '片方が動かなければ斜行、同方向で音程の種類が同じなら平行、同方向で音程が変われば同行、上と下なら反行。', 'One part still: oblique; same direction, same interval type: parallel; same direction, interval changes: similar; opposite directions: contrary.'),
      },
      {
        id: 'b17x-c5', type: 'choice', error: 'texture-type', skills: ['apply'], ref: ['omt2e-texture', 'omt2e-intro'],
        variants: [
          { prompt: t('四部和声里，有一个声部开始唱节奏完全不同的独立旋律。织体往哪边偏？', '4 声体で、1 声部がまったく違うリズムの独立した旋律を歌い始める。テクスチュアはどちらへ？', 'In four-part harmony one voice starts an independent melody in a totally different rhythm. The texture shifts toward…'), options: [t('复调', 'ポリフォニー', 'Polyphony'), t('单声部', 'モノフォニー', 'Monophony'), t('支声', 'ヘテロフォニー', 'Heterophony')] },
          { prompt: t('对位里"音的融合"（tonal fusion）指的是？', '対位法の「音の融合」とは？', 'In counterpoint, “tonal fusion” means…'), options: [t('同时发声的音倾向合成协和的整体', '同時の音が協和したまとまりになろうとすること', 'Simultaneous notes tending to form a consonant unity'), t('两条旋律节奏完全一样', '2 本の旋律のリズムが完全に同じ', 'Two melodies in identical rhythm'), t('所有声部唱同一个音', '全声部が同じ音を歌う', 'All voices singing one pitch')] },
          { prompt: t('织体描述的是？', 'テクスチュアが表すのは？', 'Texture describes…'), options: [t('各声部的密度与相互作用', '声部の密度と相互作用', 'The density and interaction of the voices'), t('乐曲的速度', '曲の速さ', 'The tempo'), t('乐器的音色', '楽器の音色', 'The instruments’ timbre')] },
        ],
        answer: 0,
        explain: t('声部越独立越接近复调；tonal fusion 是同时的音合成协和整体的倾向；织体 = 密度与相互作用。', '声部が独立するほどポリフォニー。tonal fusion は同時の音が協和したまとまりになろうとする傾向。テクスチュア = 密度と相互作用。', 'More independent voices lean toward polyphony; tonal fusion is the tendency of simultaneous notes to form a consonant unity; texture = density and interaction.'),
      },
      G('b17x-g1', 'motion', 2, ['voiceLeading']),
    ],
  },
  pool: [G('b17x-p1', 'motion', 3, ['voiceLeading']), G('b17x-p2', 'consonance', 2, ['identify'])],
};

export const EXT_BASICS = { 'B1-1': EXT_B1_1, 'B1-2': EXT_B1_2, 'B1-3': EXT_B1_3, 'B1-4': EXT_B1_4, 'B1-5': EXT_B1_5, 'B1-6': EXT_B1_6, 'B1-7': EXT_B1_7 };

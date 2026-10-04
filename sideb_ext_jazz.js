// Side-B 第 4 章（爵士与节奏）的扩展关：每个普通关通过后解锁。节奏和普通关一样（发现 → 讲解 → 实验 → 挑战），
// 把对应 A 面关卡（含挂在上面的支线关卡）的进阶关 + 综合测验重新、更细地讲一遍（讲解更长；挑战相当于综合测验）。节点格式见 sideb_ui.js / SIDE_B_DESIGN.md。
// 出处（每条事实都在原文里核对过）：
//   B4-1x：摇摆八分写成普通八分、演奏约 2:1；比例因曲目和演奏者而异，快速度更平、慢速度摇得更厉害（Gillespie《Eternal Triangle》较平、Basie《Duet》较不均）；
//          《Anything Goes》序曲先摇摆、0:52 起是平直八分；反拍是四拍子第 2、4 拍的重音，与古典音乐 1、3 拍重相反，但第 1 拍仍是换和弦和根音出现的地方；
//          标准摇摆鼓点：反拍在闭合的踩镲上，摇摆八分在 ride 镲上；跟着爵士打拍时打反拍；拍子是有层级的等距脉冲，切分是层级被打乱；
//          反拍、强调一对八分音符的第二个、用休止和连音线避开正拍开始乐句（Carla Bley《Donkey》1976）都是切分：ref:omt2e-swing
//          三连音（单拍子里分三份，写 3）可在拍、细分（十六分三连音 = 一个八分音符）或跨拍（三个四分三连音 = 一个二分音符）层级；二连音（复拍子里分两份，写 2）；
//          三连音常数 1-la-li，二连音数 1-and；超拍子是几小节一组的重音模式，快速度时尤其明显（贝多芬第九交响曲谐谑曲 1824，按四拍子指挥超拍子，1、3 小节较强）；
//          切分可以由连音线、附点、休止符和力度记号造成：ref:omt2e-rhythm-more
//          节奏听写：点格（表示拍和小节）、斜线表示起音、横线表示延长、圆圈表示休止（斜线记谱），再翻成五线谱；打拍或指挥能听出音在不在拍上；
//          旋律听写先写节奏，再加轮廓线（星号标跳进）和唱名：ref:omt-pb-dictation
//   B4-2x：布鲁斯的根源可追溯到被奴役的非裔美国人的音乐，最早的布鲁斯出现在 19 世纪末，源自田间号子、劳动歌以及西非音乐的微分音和节奏特点；与爵士来源不同（爵士最先在新奥尔良形成）；
//          三大差别：属七可以是任何功能、变格终止提供结构上的收束、大小三度自由混用甚至同时出现（常写成带 ♯9 的属七）；12 小节由三个四小节乐句组成，和弦不属于同一个调；
//          第二小节先到 IV；最后一两小节的 turnaround 从 V7 到 III–VI–II–V；16 小节布鲁斯（Muddy Waters《Hoochie Coochie Man》1954）；小调布鲁斯 i、iv 小七、V 属七、第三句换成 ii–V–I；
//          爵士布鲁斯：第 8 小节副 ii–V 指向第 9 小节的 ii、第三句 ii–V–I（Ellington《C Jam Blues》）；Ma Rainey《Runaway Blues》1928 第一句用 IV、最后的 V 前加 V/V；
//          Bessie Smith《Empty Bed Blues, Pt. 1》1928 在新和声前加 ii–V；Beach Boys《Surfin' USA》1963 是 16 小节、前两句以两小节 V 开始；B.B. King《The Thrill is Gone》1970 小调、最后一句 ♭VI–V：ref:omt2e-blues-harmony
//          W. C. Handy 最早把布鲁斯写成谱；原来第 12 小节重复属和弦，后来 V–IV–I–I 的"shuffle blues"成为标准；quick to four；bebop 布鲁斯（Parker《Now's the Time》《Billie's Bounce》、
//          Rollins《Tenor Madness》）第 6 小节 ♯IV°7、第 8 小节 V/ii♭9；小调布鲁斯（Coltrane《Equinox》《Mr. P.C.》）第 9 小节 ♭VI7，五级可以是 V7 或 v7；旋律与歌词常是 AA'B：ref:wiki-twelve-bar
//          aab 歌词；问答很可能继承自被奴役者的劳动歌；《Gulf Coast Blues》（Clarence Williams 作，Bessie Smith 1923 年录音）每句 a 只唱在乐句的前两小节；
//          布鲁斯音阶与 I、V 和弦产生风格性的冲突；大调布鲁斯音阶与大三和弦较不冲突，但在大三和弦上用布鲁斯音阶也完全正常：ref:omt2e-blues-scale
//          《Blues for Alice》：Charlie Parker 1951 年作，F 大调，通常以 Fmaj7 或 F6 开始，大量使用 ii–V–I 的改编 12 小节布鲁斯（"Bird Blues"），1951 年 8 月为 Verve 首次录音
//          （Red Rodney、John Lewis、Ray Brown、Kenny Clarke）：ref:wiki-blues-for-alice
//   B4-3x：ii–V–I 常在终止处以完全正格终止收束、也是积木；大调 mi7–7–ma7、小调 ∅7–7–mi7（V 都是大三）；图式；《Misty》ma7 → 6（《My Funny Valentine》同）、《Prelude to a Kiss》V → 增三（保留小七）、
//          《A Night in Tunisia》V 降五；性质标记功能、完全减七也有属功能；应用的 ii；只有 ii–V 也认得出；《Afternoon in Paris》（John Lewis）的 ii–V–I 指向 B♭（♭VII）再指向 A♭（♭VI），
//          把 Imaj7 变成 mi7 成为 ii7、往下转全音；McClimon 2017 的 ii–V 空间（五度圈、四种箭头）；Lee Morgan《Ceora》整首由 ii–V–I 组成：ref:omt2e-iivi
//          和弦—音阶理论：Berklee 等校教授；基于 George Russell 的 LCC（1953）；Aebersold、Baker、Coker 推广；十三和弦 = 七声音阶（Dm7 = D Dorian）；母音阶；正拍放和弦音；
//          可从旋律小调、和声小调、和声大调推出更多对应；调式不是调性中心；《Fly Me to the Moon》（Bart Howard 1954）开头五度根音运动用到七种里的六种、明明在 C 调；
//          Coltrane《Giant Steps》（1960）第一段独奏多用琶音和音阶片段；四个局限（声部进行、半音化 Parker / Gillespie / Bud Powell、时代错置 Armstrong / Parker、Galper / Crook、口传传统）：ref:omt2e-chord-scale
//   B4-4x：间距模仿泛音列（第 1、2 分音八度，第 13 分音起半音）；低音区太密发浑；低音提琴低八度、最低 E1；延伸音放高声部、13 在七音上方否则像 6；重复低音或根音；最常省五音（第 3 分音），
//          七音与根音几乎不省、有低音手时可省上方根音；懒声部（共同音 → 级进 → 三度 → 大跳），大跳在同一和弦内最自然；3–7 范式：五度关系互换、二度关系平行、右手只有四度和五度；
//          第三条线在九音与十三音之间来回；延伸音先试调内版本再凭耳朵升降；规则可以打破但要知道为什么：ref:omt2e-jazz-voicings
//          turnaround 的定义、从 I 或 iii 开始、结束在 V7 或 ♭II7、12 小节布鲁斯第 12 小节可停在属；全部可以是七和弦；常见形式列表（含 Tadd Dameron）；大三的 VI 产生 C–C♯–D；
//          II7–V7–I；ii–♭II–I 的三条半音线（F 常作持续音）；♭II7 与 V7 等音同三全音；line cliché；副属 vs 替代属；ragtime 进行常在标准曲桥段、本身调不确定；
//          C–A7–D7–G、C–E♭7–D7–D♭7、C–E♭7–A♭M7–D♭7：ref:wiki-turnaround
//          ragtime 进行：沿五度圈的副属链，因 ragtime 得名但古老得多、parlour music 典型、源自古典音乐后传入美国民间音乐、"逐渐累积"：ref:wiki-ragtime-progression
//          I–vi–ii–V–I 里用 V7/ii 代替 vi、前面加 ii/ii（被强调的 turnaround）：ref:omt2e-iivi
//   B4-5x：密集 / 开放排列；drop-n 从上往下编号（大概来自铜管编曲）、默认同一八度、drop 2 降第 2 声部；C 大三的三个 drop 2（《Super Mario Bros.》主题）；G7 的四个 drop 2 和 4；
//          不处理降两个八度或多八度同音；吉他四度调弦使密集排列别扭、drop 指法可平移、不用变调夹；Ives《The Unanswered Question》开头宽而轻的 G 大三；《诗篇交响曲》首尾和弦的配置；
//          苏萨《华盛顿邮报进行曲》四个八度重复；莫扎特第 24 号钢琴协奏曲末乐章的重复：ref:wiki-voicing
//          So What 和弦：三个纯四度 + 大三度、五音配置；Bill Evans 在《So What》主题的"amen"应答音型里使用；Em11 = E A D G B = 吉他最低五弦；1 4 ♭7 ♭3 5；顶音降半音的四度和弦；
//          代替四度配置、平行移动；同组音可当 C6Δ9、Asus4 7(9)、G6/9、F Lydian、F♯ Phrygian 等；Tyner《Peresina》、Burton《Gentle Wind and Falling Tear》、影响 Chick Corea；
//          Mark Levine《The Jazz Piano Book》；Mantooth "Miracle voicing"：ref:wiki-so-what
//          高结构：最上方一个大 / 小三和弦；C7♯9 = E B♭ + E♭ 大三、根音常省；按音程简写（US♭III 等）及目录（USII、US♭V、US♭VI、USVI、USi、US♭ii、US♭iii、US♯iv）；
//          C13♭9♯11 的音都在减音阶 C–D♭–D♯–E–F♯–G–A–B♭ 里：ref:wiki-upper-structure
//   B4-6x：爵士小调 = 上行旋律小调、Ionian ♭3、合成音阶、Dorian 换大七、WHWWWWH、Forte 7-34、V 为属七；来源（从七音开始用延伸音，需要升高调内七音得到稳定主和弦）；
//          给属七找高半音的爵士小调（A♭ 爵士小调对 G7）；用于小大七和弦；I–vi–ii–V 例；各级七和弦；七个调式及别名（以 C 为主音的拼写）；名字是大调调式名的变体：ref:wiki-jazz-minor
//          变化音阶：保留根音、大三、小七，其余全部变化（♭5 ♭9 ♭11 ♭13，小三看作 ♯9），没有 9、11、5、13；半全半全全全全；7alt；旋律小调第 7 调式；Locrian ♭4；
//          大调主音升半音 / 大调除主音外全降；Pomeroy 音阶、Ravel 音阶、减全音音阶；在属和弦上增加紧张：ref:wiki-altered-scale
//          和声小调 = Aeolian ♮7、增二度、大调降三六；旋律用法（莫扎特、贝多芬第 14 号四重奏终乐章、舒伯特《死神与少女》第一乐章，下行多于上行）；流行歌曲与新古典金属；
//          即兴用在 V7 而不是 i 上、♯5 与 ♭9；III+ 不在自然调式和声里、与半音化发展有关；增三与减七由单一音程生成；七种七和弦 vs 自然小调四种：ref:wiki-harmonic-minor
//          和声大调 = 大调降六 = 和声小调升三、上半段同和声小调；Rimsky-Korsakov 四个基础音阶；Taruskin 的询问、Lyadov 与 Iogansen；德彪西、武满彻《Coral Island》《Rain Tree Sketch II》（献给梅西安）、
//          George Russell 的 "Lydian diminished scale"；Nat Bhairav / Sarasangi；声部进行价值、不受五度圈支配、六级增三和弦；七个调式名：ref:wiki-harmonic-major
//   B4-7x：全音音阶：十二平均律只有两个、六声、"六平均律"；没有导音、模糊；三和弦全是增三、两个相距大二度的增三和弦；Piston 引文与"好莱坞风格"；Forte 6-35；梅西安第一种有限移位调式；
//          Perle 的 C2；斯克里亚宾神秘和弦；Ahle 1662《Es ist genug》与巴赫 BWV 60；莫扎特《音乐玩笑》；格林卡、鲍罗丁、达尔戈梅日斯基、里姆斯基-科萨科夫《萨特阔》《天方夜谭》；德彪西《帆》；
//          爵士：Beiderbecke《In a Mist》1928、Redman《Chant of the Weed》1931、Gil Evans 1958、Shorter《JuJu》1965、Coltrane《One Down, One Up》1965（像《Impressions》）、增三和弦用于 turnaround 或代替属七、
//          Tatum、Monk《Four in One》1948《Trinkle-Tinkle》1952；Stevie Wonder《You Are the Sunshine of My Life》1972 第 2、4 小节：ref:wiki-whole-tone
//          八声音阶：常指全半交替；爵士叫减音阶 / 对称减音阶、两个交错减七；三个减七覆盖十二音、三个八声音阶、各两个调式；科萨科夫音阶、Pijper 音阶；四个相距小三度的小调前四音；
//          肖邦 Op. 50 No. 3、李斯特《叹息》、德彪西《云》英国管旋律、斯特拉文斯基俄国时期作品、《三乐章交响曲》"伦巴" E♭7 / C7：ref:wiki-octatonic
//          有限移位调式：定义、《我的音乐语言技巧》、对称组、两种看法、七种调式的移位数与调式数、"系列是封闭的"、15 种广义调式与 0 1 4 5 8 9：ref:wiki-messiaen-modes
//          bebop 音阶：加经过音成八声、和弦音落在正拍、David Baker 起名、Christian / Parker / Powell / Gillespie；属七、大调（Barry Harris 大六减音阶）、旋律小调（小六减音阶）、
//          和声小调（Levine《The Drop 2 Book》称 bebop 自然小调、小调 ii–V–i 三个和弦、bebop 大调的第六调式）；七降五减音阶 = 梅西安第六调式：ref:wiki-bebop-scale
//          那不勒斯大 / 小调：都是小三度、差第六音、二级降低、Phrygian 和声 / 旋律小调、强力和弦或小三和弦伴奏、第四调式 Lydian dominant ♭6 配 9♯11♭13、第五调式大调 Locrian：ref:wiki-neapolitan-scale
//          双和声：Ionian ♭2 ♭6、两个增二度四音组、与 Bhairav / Mayamalavagowla / 拜占庭 / Hijaz Kar / 吉普赛大调同音、内含三全音替代、《Misirlou》（E 调）、圣-桑酒神节舞曲、德彪西、
//          Blackmore、《Tradition》固定音型（C 调）、SMSTSMS 回文（大调调式里只有 Dorian 是回文）：ref:wiki-double-harmonic
//   B4-8x：替代是爵士的基石；副属替代（五度进行、turnaround 全换属七）；调式混合（Cole Porter《All of You》、Ella Fitzgerald、C 大调、la / le）；最常见混合和弦 iiø7 与 V7♭9 都以 le 代 la、功能相同；
//          三全音替代爵士独有、代替 V7、两层含义、三全音映射回自己、向下小二度解决；McClimon 的三全音替代"影子空间"（被替代的 V7 前有它的 ii7）；替代的三种写法（Ellington《Satin Doll》）：ref:omt2e-substitutions
//          后门进行 iv7–♭VII7–I（Jerry Coker）、正门 ii–V7–I、♭VII7 借自同主音小调、IV → iv → ♭VII7 → I、G7 与 B♭7 共两音、A♭ 与 F 为上方导音；后门 IV–V ♭VI M7–♭VII7–I = "马里奥终止"；
//          可用轴心体系理解；Shelton Berg 的另一种"后门"（♯ivø7–VII7(♭9)–Imaj9 代替 iii7）、阻碍终止：ref:wiki-backdoor
//          Coltrane 进行的别名；《Bags & Trane》《Three Little Words》、《Cannonball Adderley Quintet in Chicago》《Limehouse Blues》；1960《Giant Steps》《Countdown》（Eddie Vinson《Tune Up》的再和声）；
//          替代 ii–V–I、根音大三度、增三和弦、爵士通常五度运动；David Demsey 与灵性 / 历史来源、印度拉格；Dennis Sandole、Granoff 音乐学校、Slonimsky《Thesaurus》1947；
//          《Have You Met Miss Jones?》（1937）桥段、Tadd Dameron《Lady Bird》与《Lazy Bird》；Countdown 公式：ref:wiki-coltrane
//          再和声的定义；一个旋律音的多种配法（E 当根音 / 三音 / 九音 / ♯5）；要考虑整条旋律（E♭–F–G 配 D7 的冲突）；爵士再和声、Art Tatum 先驱、Coltrane / Miles Davis / Bill Evans；
//          三全音替代的原理（B、F = C♭、F）、Dm7–D♭7–Cmaj7、对大七和弦（Thad Jones）；爵士三种功能、同功能互换；组合例 C | Am7 | Dm7 | G7 | C → E7 A7 | B♭m7 E♭7 | D7 F7 | A♭maj7 D♭maj7 | C；平移（F7 → G♭7）：ref:wiki-harmonization
//          Blackadder 和弦：Joshua Taipale 命名、2017 YouTube、《Love Live! Sunshine!!》《Guilty Eyes Fever》、7 首用例与表格；增三和弦 + 根音上方全音的低音、[0, 2, 6, 10]；
//          也可读作省略三音的张力和弦（9(♭5)omit3、+6(+11)omit3）、同音异名拼法问题；"总称"、与神秘和弦 / 特里斯坦和弦不同（没有谱子）：ref:soundquest-blk
//   B4-9x：负和声的定义（主音与属音之间的轴）；Levy 的极性理论、Coleman 命名、Collier 推广；五度圈上的轴；大小互换、上下行互换、保留功能拉力；与倒影的两点不同；
//          Zarlino（1517–1590）的极性、Tartini（1692–1770）；Riemann（1849–1919）和声二元论与下方泛音列；Levy《A Theory of Harmony》、telluric gravity、镜子移到根音与五音中点（E♭ 与 E 之间）、书中没有"负和声"一词；
//          Coleman（1970 年代末或 80 年代初，Von Freeman、Parker、Tatum、Coltrane、Rollins；1990 年代联系 Levy；Barak Schmool）；Collier（访谈与 YouTube、未明确套用、变格顺时针）：ref:wiki-negative-harmony
//          （实验里 Fm ↔ G、B♭7 ↔ Bø7 是按同一条轴自己算出来的结果）
//          LCCOTO 1953 年初版到第四版、50 年发展；Lydian 音阶与 Lydian 调式无关、七音六个纯五度、纯五度源自泛音列；调性引力、Lydian 主音（六个五度最下面的音）；垂直 / 水平；
//          12 个 Lydian 半音阶、144 种音程、ingoing / outgoing；母音阶听辨测试；七个主要音阶；1953 年小册子、第一份来自爵士的理论贡献、《Kind of Blue》、Berendt 引文；
//          放弃大小调体系、拉威尔 / 斯克里亚宾 / 德彪西 / 巴赫先例、根音阶用 F♯；Miles / Coltrane / Bill Evans、调式爵士运动；武满彻引文；1959 年 3 月：ref:george-russell-lcc
//          一般理论 / CST / LCC 三种配音阶方法（C 大调 / G Mixolydian / F Lydian）、Lydian 主音、Lydian Tonic Interval（G7 为小七度或大二度）、ii–V–I–vi 里 Am7 也可用 C Lydian 避开 fa；七个主要音阶（Lydian = 调性顺序前七个音，嵌入第 8、9、10 个音得 Lydian Augmented / Diminished / Flat 7th，三个辅助音阶 = 全音、减（全半）、属减（半全））：ref:aizcutei-lcc
//   B4-10x：复节奏的定义、交叉节奏、与不规则节奏的区别、同一循环、脉动也算、son clave；《唐璜》第一幕第五场（3/4、2/4、后加 3/8）、贝多芬第三交响曲、肖邦 Op. 10 No. 10（Alan Walker）、
//          勃拉姆斯 Op. 78（3+3 / 2+2+2、第 235 小节）、德彪西《雪花飞舞》；贝多芬 Op. 18 No. 6 谐谑曲（Ernest Walker）、是复节奏不是复拍子（三拍主、二拍次）；《Carol of the Bells》（Leontovych）固定音型、
//          莫扎特第 12 号钢琴奏鸣曲第 64–65 小节；撒哈拉以南非洲强调次拍、交叉节奏是生成原则、哲学含义、没有"节奏"一词；Novotney、Agawu、非洲 3:2 二拍为主；balafon / gyil；
//          古巴伦巴 quinto 6/8 对 2/2；卡纳提克 konnakol；《Afro Blue》1959 Santamaría 6:4、Elvin Jones 3/4 华尔兹叠 2:3、1963 Coltrane 颠倒层级；爵士常见的 3:2 / 2:3 / 4:3（Tony Williams 与 Miles）/ 3/4 对 4/4
//          （Elvin Jones、McCoy Tyner）；Olatunji（约鲁巴 sakara、Airto Moreira、Santana、Mickey Hart）、Santamaría 1950 年代：ref:wiki-polyrhythm
//          不对称拍子（别名、Sondheim 1979、Lloyd Webber《Skimbleshanks》、Brubeck《Unsquare Dance》1961）；无拍（Ives《The Cage》约 1904）；变拍子（Tucker《Libera Me》1995、Markis 1967）；
//          复拍子（巴托克《Ara táskor》1931 第 11 小节明写、拉威尔四重奏第二乐章 1902 暗含 = 分组不协和）；节拍调制常事后才察觉、"音符 = 音符"；Carter《Canaries》1949：ref:omt2e-20c-rhythm
//          节拍调制定义、像转调的枢纽；Goldman 评 Carter《大提琴奏鸣曲》首次描述、Carter 叫速度调制、比例速度；巴赫慢引子后快板加倍；公式；♩ = 84 两个二分 = 三个二分 → 126：ref:wiki-metric-modulation
const t = (zh, ja, en) => ({ zh, ja, en });
const G = (id, gen, count, skills, params) => ({ id, type: 'gen', gen, count, skills, ...(params ? { params } : {}) });

// ===================== B4-1x 节奏 II · 扩展关 =====================
// 对应 A 面：swing（三连音与二连音 / 摇摆与反拍 / 切分 / 综合）+ dictation（节奏、旋律、低音线、和弦进行听写）
const EXT_B4_1 = {
  minutes: 18,
  insight: t('摇摆是"怎么演奏"，切分是"重音放在哪"，三连音和二连音是"借来的分法"：三件事不同，却一起造出爵士的律动。', 'スウィングは「どう演奏するか」、シンコペーションは「アクセントをどこに置くか」、3 連符と 2 連符は「借りた分割」：別々のことが一緒にジャズのグルーヴを作る。', 'Swing is how you play, syncopation is where the accent goes, triplets and duplets are borrowed divisions: three different things that together make the jazz groove.'),
  sections: {
    discover: [
      {
        id: 'b41x-d1', type: 'discover', ref: 'omt2e-swing',
        prompt: t('同一串四分音符，A 把重音放在第 1、3 拍，B 放在第 2、4 拍。哪一个是爵士常见的反拍？第 1 拍在爵士里还重要吗？', '同じ 4 分音符の列で、A は 1・3 拍に、B は 2・4 拍にアクセント。ジャズによくあるバックビートはどちら？ ジャズでも 1 拍目は大事？', 'The same quarter notes: A accents beats 1 and 3, B accents 2 and 4. Which is the jazz backbeat? Does beat 1 still matter in jazz?'),
        play: [
          { label: 'A', audio: { rhythm: { bpm: 96, cycle: 4, repeats: 2, tracks: [{ beats: [0, 1, 2, 3], midi: 48 }, { beats: [0, 2], midi: 76 }] } } },
          { label: 'B', audio: { rhythm: { bpm: 96, cycle: 4, repeats: 2, tracks: [{ beats: [0, 1, 2, 3], midi: 48 }, { beats: [1, 3], midi: 76 }] } } },
        ],
        options: [t('B 是反拍；第 1 拍仍是换和弦、弹根音的地方', 'B がバックビート。1 拍目は今もコードが変わり根音が鳴る場所', 'B is the backbeat; beat 1 is still where chords change and roots sound'), t('A 是反拍；第 1 拍不重要', 'A がバックビート。1 拍目は大事でない', 'A is the backbeat; beat 1 doesn’t matter'), t('两个都不是切分', 'どちらもシンコペーションではない', 'Neither is syncopation')],
        answer: 0,
        insight: {
          title: t('不是最响，但仍最重要', 'いちばん大きくなくても、いちばん大事', 'Not the loudest, still the most important'),
          text: t('反拍是四拍子第 2、4 拍的重音，和古典音乐通常 1、3 拍最重正好相反——所以它本身就是一种切分。但第 1 拍在爵士里依然重要：和弦多在那里换、根音多在那里出现，只是它不一定是最响的拍。', 'バックビートは 4 拍子の 2・4 拍のアクセントで、ふつう 1・3 拍が強いクラシックとは正反対——だからそれ自体がシンコペーション。でも 1 拍目はジャズでも大事：コードはたいていそこで変わり、根音もそこで鳴る。いちばん大きい拍とは限らないだけ。', 'The backbeat accents beats 2 and 4 of quadruple meter, the opposite of classical music’s usual 1 and 3 — which makes it a syncopation in itself. But beat 1 still matters in jazz: chords usually change and roots sound there; it just may not be the loudest beat.'),
        },
      },
    ],
    explain: [
      {
        id: 'b41x-e1', type: 'page', ref: 'omt2e-rhythm-more',
        title: t('进阶 1 · 借来的分法：在哪个层级、怎么数', '発展 1・借りた分割：どの階層で、どう数えるか', 'Advanced 1 · Borrowed divisions: at which level, and how to count'),
        text: [
          t('一般来说，单拍子把拍分成两份，复拍子分成三份。单拍子里把一拍（或一个细分、几拍）分成三份叫三连音，上面写 3，常被看成"从复拍子借来的"；复拍子里把一拍分成两份叫二连音，上面写 2。三连音可以出现在任何层级：拍的层级最常见；十六分音符三连音占一个八分音符（2/4 里的细分）；三个四分音符三连音则跨好几拍，占一个二分音符。', 'ふつう単純拍子は拍を 2 つに、複合拍子は 3 つに分ける。単純拍子で 1 拍（または細分・数拍）を 3 つに分けるのが 3 連符で、上に 3 と書き、「複合拍子から借りた」と見なされる。複合拍子で 1 拍を 2 つに分けるのが 2 連符で、上に 2 と書く。3 連符はどの階層にも出る：拍の階層がいちばん多い。16 分音符の 3 連符は 8 分音符 1 つ分（2/4 の細分）。4 分音符の 3 連符は数拍にまたがり 2 分音符 1 つ分。', 'Normally simple meter divides the beat in two and compound meter in three. Dividing a beat (or a subdivision, or several beats) of simple meter into three makes a triplet, marked 3 and thought of as borrowed from compound meter; dividing a compound beat in two makes a duplet, marked 2. Triplets can occur at any level: the beat level is commonest; a sixteenth-note triplet equals one eighth (the division in 2/4); three quarter-note triplets span several beats, taking up a half note.'),
          t('数法也是"借来的"：三连音通常数 1-la-li，二连音数 1-and、2-and。', '数え方も「借りもの」：3 連符はふつう 1-la-li、2 連符は 1-and、2-and と数える。', 'Counting is borrowed too: triplets are usually counted 1-la-li, duplets 1-and, 2-and.'),
        ],
      },
      {
        id: 'b41x-e2', type: 'discover', practice: true, ref: 'omt2e-rhythm-more',
        prompt: t('4/4 里写着 3 的三个四分音符（四分音符三连音）一共占多长？', '4/4 で 3 と書かれた 4 分音符 3 つ（4 分音符の 3 連符）の長さは？', 'In 4/4, three quarter notes marked 3 (a quarter-note triplet) take up…'),
        options: [t('一个二分音符', '2 分音符 1 つ', 'one half note'), t('三拍', '3 拍', 'three beats'), t('一个四分音符', '4 分音符 1 つ', 'one quarter note')],
        answer: 0,
        insight: { title: t('三个挤进两个的位置', '3 つを 2 つ分に詰める', 'Three in the space of two'), text: t('三连音把三个音放进两个同样时值的位置：三个四分三连音 = 两个四分音符 = 一个二分音符。', '3 連符は同じ音価 2 つ分に 3 つを入れる：4 分の 3 連符 3 つ = 4 分音符 2 つ = 2 分音符 1 つ。', 'A triplet fits three notes in the space of two: three quarter-note triplets = two quarters = one half note.') },
      },
      {
        id: 'b41x-e3', type: 'page', ref: 'omt2e-swing',
        title: t('进阶 2 · 摇摆的比例与鼓点', '発展 2・スウィングの比率とドラム', 'Advanced 2 · Swing ratios and the drum groove'),
        text: [
          t('用三连音来解释摇摆很常见，但实际的比例因曲目、因演奏者而不同。一般来说，速度越快越平，速度慢时摇得更厉害：Dizzy Gillespie 的《Eternal Triangle》摇摆比较平，Count Basie 的《Duet》则比较不均。音乐剧《Anything Goes》的序曲里两种都有：开头几分钟是摇摆八分，0:52 起的中段是平直八分，感觉一下子变了。', 'スウィングを 3 連符で説明するのはよくあるが、実際の比率は曲や奏者によって違う。一般に速いテンポほど平らに、遅いテンポほど大きく跳ねる：ディジー・ガレスピーの《Eternal Triangle》は比較的平らで、カウント・ベイシーの《Duet》は不均等。ミュージカル《Anything Goes》序曲には両方ある：最初の数分はスウィング 8 分、0:52 からの中間部はストレート 8 分で、感じががらりと変わる。', 'Triplets are the usual way to explain swing, but the real ratio varies by piece and performer. Generally, faster tempos are straighter and slower ones swing harder: Dizzy Gillespie’s “Eternal Triangle” has a more even swing, Count Basie’s “Duet” a more uneven one. The overture to Anything Goes has both: swung for the first minutes, then straight eighths from 0:52, and the feel changes dramatically.'),
          t('标准的摇摆鼓点由两样东西组成：反拍打在闭合的踩镲上，摇摆八分打在 ride 镲上。鼓点千变万化、多半是即兴的，但大部分爵士鼓点里都能找到这两样。跟着爵士打拍时，试着打反拍而不是正拍。', '標準的なスウィングのドラムは 2 つでできている：バックビートはクローズしたハイハットで、スウィング 8 分はライド・シンバルで。パターンは多様でたいてい即興だが、ほとんどのジャズのドラムにこの 2 つがある。ジャズに合わせて拍を打つときは、表拍でなくバックビートを打ってみよう。', 'A standard swing drum beat has two parts: the backbeat on the closed hi-hat and the swing eighths on the ride cymbal. Drum patterns vary widely and are mostly improvised, but you will find these two in most jazz grooves. When tapping along to jazz, try tapping the backbeat rather than the downbeat.'),
        ],
      },
      {
        id: 'b41x-e4', type: 'discover', practice: true, ref: 'omt2e-swing',
        prompt: t('同一首曲子从慢速版换成快速版，摇摆比例一般会怎样？', '同じ曲を遅い版から速い版にすると、スウィングの比率はふつう？', 'Moving from a slow to a fast version of a tune, the swing ratio usually…'),
        options: [t('更平（更接近 1:1）', 'より平ら（1:1 に近づく）', 'gets straighter (closer to 1:1)'), t('更不均（超过 2:1）', 'より不均等（2:1 以上）', 'gets more uneven (beyond 2:1)'), t('完全不变', 'まったく変わらない', 'stays exactly the same')],
        answer: 0,
        insight: { title: t('越快越平', '速いほど平ら', 'Faster means straighter'), text: t('2:1 只是方便的说法；快速度时摇摆趋向平直，慢速度时更明显。', '2:1 は便宜的な説明。速いとストレートに近づき、遅いとはっきり跳ねる。', '2:1 is a convenient description; fast tempos tend straighter, slow ones swing more.') },
      },
      {
        id: 'b41x-e5', type: 'page', ref: ['omt2e-rhythm-more', 'omt2e-swing'],
        title: t('进阶 3 · 切分的四种做法与超拍子', '発展 3・シンコペーションの 4 つの作り方とハイパー拍子', 'Advanced 3 · Four ways to syncopate, and hypermeter'),
        text: [
          t('拍子是一串等距的脉冲带出的层级：4/4 里第 1 拍最重要，第 3 拍次之，第 2、4 拍最不重要——"重要"是指换和弦、转调这类事情多发生在那里。切分就是这个层级被打乱。它可以由连音线、附点、休止符或力度记号造成。爵士里常见的切分有：反拍；强调一对八分音符里的第二个；用休止和连音线避开正拍来开始乐句——Carla Bley 的《Donkey》（1976）就是例子。', '拍子は等間隔の拍がつくる階層：4/4 では 1 拍目が最も重要、3 拍目が次、2・4 拍目が最も低い——「重要」とはコード・チェンジや転調がそこで起こりやすいということ。シンコペーションはこの階層が崩されること。タイ・付点・休符・強弱記号で作れる。ジャズによくあるのは：バックビート、8 分音符の対の 2 つ目を強調すること、休符とタイで表拍を避けてフレーズを始めること——カーラ・ブレイの《Donkey》（1976）がその例。', 'Meter is a hierarchy implied by equally spaced pulses: in 4/4 beat 1 matters most, beat 3 less, beats 2 and 4 least — “matters” meaning chord changes and key changes tend to happen there. Syncopation subverts that hierarchy, through ties, dots, rests or dynamics. Common jazz syncopations: the backbeat; accenting the second eighth of a pair; starting lines off the downbeat with rests and ties — as in Carla Bley’s “Donkey” (1976).'),
          t('层级还可以往上一层：超拍子（hypermeter）是几个小节一组的重音模式，在快速度下尤其明显。贝多芬第九交响曲的谐谑曲（1824）可以按四拍子的图式"指挥小节"：第 1、3 小节较强，第 2、4 小节较弱。', '階層はさらに上にもある：ハイパー拍子は数小節単位のアクセントの型で、速いテンポで特にはっきりする。ベートーヴェン《第九》のスケルツォ（1824）は小節を 4 拍子の図式で振れる：1・3 小節目が強く、2・4 小節目が弱い。', 'The hierarchy extends upward: hypermeter is the accent pattern across groups of bars, especially at fast tempos. The Scherzo of Beethoven’s Ninth (1824) can be conducted bar by bar in a quadruple pattern: bars 1 and 3 stronger, 2 and 4 weaker.'),
        ],
      },
      {
        id: 'b41x-e6', type: 'discover', practice: true, ref: 'omt2e-rhythm-more',
        prompt: t('一小节八个八分音符，每个都奏出，但重音记号都落在反拍（每拍的后半拍）上。这算切分吗？靠什么造成？', '1 小節に 8 分音符 8 つ、全部鳴るが、アクセント記号はすべて裏拍に。シンコペーション？ 何によって？', 'Eight eighth notes in a bar, all played, but every accent mark falls on an offbeat. Is it syncopation, and created by what?'),
        options: [t('算，靠力度（重音）记号', 'そう。強弱（アクセント）記号による', 'Yes — created by dynamics (accents)'), t('不算，因为每个八分音符都奏出了', 'いいえ、8 分音符が全部鳴っているから', 'No, since every eighth is played'), t('算，靠连音线', 'そう。タイによる', 'Yes — created by ties')],
        answer: 0,
        insight: { title: t('不用改节奏也能切分', 'リズムを変えなくても切れる', 'Syncopation without changing the rhythm'), text: t('每个分拍上都有音，但反拍上的重音照样打乱了层级。', 'どの分割にも音があるが、裏拍のアクセントがやはり階層を崩す。', 'Every division sounds, yet offbeat accents still subvert the hierarchy.') },
      },
      {
        id: 'b41x-e7', type: 'page', ref: 'omt-pb-dictation',
        title: t('进阶 4 · 听写：点格、斜线、横线、圆圈', '発展 4・聴音：ドット・グリッド、スラッシュ、横線、丸', 'Advanced 4 · Dictation: dots, slashes, dashes, circles'),
        text: [
          t('节奏听写的一种方法是先画点格：一串表示拍和小节的点（例如 4/4 四小节）。听的时候，在听到起音的地方画斜线，延长的音画横线，休止画圆圈——这叫斜线记谱；最后再翻成五线谱。一边打拍或指挥一边听很有用：打拍能听出一个音是不是落在拍上、拍上是不是休止；指挥能帮你分辨哪些拍有起音、延长或休止。', 'リズム聴音の方法の 1 つは、まずドット・グリッドを描くこと：拍と小節を表す点の列（たとえば 4/4 を 4 小節）。聴きながら、発音が聞こえた所にスラッシュ、伸ばす音に横線、休符に丸を書く——これがスラッシュ記譜。最後に五線譜に直す。拍を打つか指揮しながら聴くと役に立つ：打てば音が拍の上か、拍に休符があるかがわかり、指揮すればどの拍に発音・延長・休符があるかがわかる。', 'One approach to rhythmic dictation starts with a dot grid: dots for beats and bars (say, four bars of 4/4). As you listen, place slashes where you hear articulations, dashes for sustained notes and circles for rests — slash notation — then translate it into staff notation. Tapping or conducting helps: tapping tells you whether a note falls on a beat or a rest sits on it; conducting shows which beats have articulations, sustains and rests.'),
          t('旋律听写的第一步是先写下节奏，再加音高：画轮廓线表示每个音向上、向下或不变，用星号（或别的符号）标出跳进，再写下唱名。', '旋律聴音の第一歩はまずリズムを書き、そこに音高を加えること：輪郭線で各音が上・下・同じかを示し、星印（などの記号）で跳躍を示し、階名を書く。', 'Melodic dictation starts by writing the rhythm, then adding pitch: contour lines for up, down or same, stars (or another symbol) for leaps, then solmization syllables.'),
        ],
      },
      {
        id: 'b41x-e8', type: 'discover', practice: true, ref: 'omt-pb-dictation',
        prompt: t('斜线记谱里，一拍的位置画了一个圆圈，表示？', 'スラッシュ記譜で、拍の位置に丸が描いてある。意味は？', 'In slash notation, a circle on a beat means…'),
        options: [t('休止', '休符', 'a rest'), t('起音', '発音', 'an articulation'), t('延长到下一拍', '次の拍まで伸ばす', 'a note held into the next beat')],
        answer: 0,
        insight: { title: t('斜线、横线、圆圈', 'スラッシュ・横線・丸', 'Slash, dash, circle'), text: t('斜线 = 起音，横线 = 延长，圆圈 = 休止。', 'スラッシュ = 発音、横線 = 延長、丸 = 休符。', 'Slash = articulation, dash = sustain, circle = rest.') },
      },
    ],
    experiment: [
      { id: 'b41x-x1', type: 'experiment', toy: 'swing', ref: 'omt2e-swing',
        prompt: t('从轻摇摆 3:2 开始，再换 2:1、3:1 和平直 1:1，开关反拍。想象速度很快的曲子：哪个比例更合适？慢的抒情曲呢？', '軽いスウィング 3:2 から始め、2:1・3:1・ストレート 1:1 に替え、バックビートをオン・オフ。とても速い曲ならどの比率が合う？ 遅いバラードなら？', 'Start with light swing 3:2, then try 2:1, 3:1 and straight 1:1, toggling the backbeat. For a very fast tune, which ratio fits? For a slow ballad?'),
        params: { ratio: '3:2' },
        breakthrough: { id: 'b41x-ratio', text: t('你听出来了：摇摆不是一个固定的比例，而是一段范围。', 'スウィングは決まった比率でなく、幅のあるものだと聞き取れた。', 'You heard it: swing is not one fixed ratio but a range.') } },
    ],
    challenge: [
      {
        id: 'b41x-c1', type: 'choice', error: 'note-value', skills: ['calc'], ref: 'omt2e-rhythm-more',
        variants: [
          { prompt: t('2/4 里一个十六分音符三连音（三个音）一共占多长？', '2/4 で 16 分音符の 3 連符（3 音）の長さは？', 'In 2/4, a sixteenth-note triplet (three notes) lasts…'), options: [t('一个八分音符', '8 分音符 1 つ', 'one eighth note'), t('一个四分音符', '4 分音符 1 つ', 'one quarter note'), t('三个十六分音符', '16 分音符 3 つ', 'three sixteenths')] },
          { prompt: t('6/8 里在一拍上写 2 的两个八分音符，叫？', '6/8 で 1 拍に 2 と書いた 8 分音符 2 つは？', 'In 6/8, two eighths marked 2 on one beat form a…'), options: [t('二连音', '2 連符', 'duplet'), t('三连音', '3 連符', 'triplet'), t('附点节奏', '付点リズム', 'dotted rhythm')] },
          { prompt: t('三连音通常怎么数？', '3 連符はふつうどう数える？', 'How are triplets usually counted?'), options: ['1-la-li', '1-e-and-a', '1-and'] },
        ],
        answer: 0,
        explain: t('十六分三连音 = 两个十六分 = 一个八分；复拍子里分两份是二连音；三连音数 1-la-li。', '16 分 3 連 = 16 分 2 つ = 8 分 1 つ。複合拍子で 2 つに分けるのが 2 連符。3 連符は 1-la-li。', 'A sixteenth triplet = two sixteenths = one eighth; dividing a compound beat in two is a duplet; triplets count 1-la-li.'),
      },
      {
        id: 'b41x-c2', type: 'choice', error: 'swing-feel', skills: ['identify'], ref: 'omt2e-swing',
        variants: [
          { prompt: t('标准摇摆鼓点里，摇摆八分通常打在哪里？', '標準的なスウィングのドラムで、スウィング 8 分はどこで？', 'In a standard swing drum beat, the swing eighths are usually on…'), options: [t('ride 镲', 'ライド・シンバル', 'the ride cymbal'), t('闭合的踩镲', 'クローズしたハイハット', 'the closed hi-hat'), t('大鼓', 'バスドラム', 'the bass drum')] },
          { prompt: t('Gillespie《Eternal Triangle》和 Basie《Duet》，哪一首的摇摆更不均？', 'ガレスピー《Eternal Triangle》とベイシー《Duet》、より不均等なのは？', 'Which swings more unevenly: Gillespie’s “Eternal Triangle” or Basie’s “Duet”?'), options: [t('《Duet》', '《Duet》', '“Duet”'), t('《Eternal Triangle》', '《Eternal Triangle》', '“Eternal Triangle”'), t('一样', '同じ', 'The same')] },
          { prompt: t('爵士里第 1 拍还重要吗？', 'ジャズで 1 拍目は今も大事？', 'Does beat 1 still matter in jazz?'), options: [t('重要：多在那里换和弦、弹根音', '大事：そこでコードが変わり根音が鳴ることが多い', 'Yes: chords usually change and roots sound there'), t('不重要，只有反拍重要', 'いいえ、バックビートだけが大事', 'No, only the backbeat matters'), t('只在慢曲里重要', '遅い曲だけ', 'Only in ballads')] },
        ],
        answer: 0,
        explain: t('摇摆八分在 ride 镲、反拍在踩镲；《Duet》摇得更不均；第 1 拍仍是换和弦和根音的位置。', 'スウィング 8 分はライド、バックビートはハイハット。《Duet》のほうが不均等。1 拍目は今もコード・チェンジと根音の位置。', 'Swing eighths on the ride, backbeat on the hi-hat; “Duet” swings more unevenly; beat 1 is still where chords change and roots sound.'),
      },
      {
        id: 'b41x-c3', type: 'choice', error: 'syncopation', skills: ['identify'], ref: ['omt2e-rhythm-more', 'omt2e-swing'],
        variants: [
          { prompt: t('下面哪一项不是 OMT 列出的切分做法？', 'OMT が挙げるシンコペーションの作り方でないのは？', 'Which is not one of the ways OMT lists to create syncopation?'), options: [t('把每拍都写成四分音符', '全拍を 4 分音符で書く', 'Writing every beat as a quarter note'), t('连音线', 'タイ', 'Ties'), t('拍头的休止符', '拍頭の休符', 'Rests on the beat')] },
          { prompt: t('四小节一组的超拍子里，哪几小节较强？', '4 小節単位のハイパー拍子で強い小節は？', 'In a four-bar hypermeter, which bars are stronger?'), options: [t('第 1、3 小节', '1・3 小節目', 'Bars 1 and 3'), t('第 2、4 小节', '2・4 小節目', 'Bars 2 and 4'), t('只有第 4 小节', '4 小節目だけ', 'Only bar 4')] },
          { prompt: t('用休止和连音线避开正拍来开始乐句，OMT 举的例子是？', '休符とタイで表拍を避けてフレーズを始める例として OMT が挙げるのは？', 'OMT’s example of starting lines off the downbeat with rests and ties is…'), options: [t('Carla Bley《Donkey》', 'カーラ・ブレイ《Donkey》', 'Carla Bley, “Donkey”'), t('《Gulf Coast Blues》', '《Gulf Coast Blues》', '“Gulf Coast Blues”'), t('《Blues for Alice》', '《Blues for Alice》', '“Blues for Alice”')] },
        ],
        answer: 0,
        explain: t('切分来自连音线、附点、休止和力度；超拍子的 1、3 小节较强；《Donkey》用休止和连音线避开正拍。', 'シンコペーションはタイ・付点・休符・強弱から。ハイパー拍子は 1・3 小節目が強い。《Donkey》は休符とタイで表拍を避ける。', 'Syncopation comes from ties, dots, rests and dynamics; hypermetric bars 1 and 3 are stronger; “Donkey” avoids downbeats with rests and ties.'),
      },
      {
        id: 'b41x-c4', type: 'choice', error: 'concept', skills: ['apply'], ref: 'omt-pb-dictation',
        variants: [
          { prompt: t('旋律听写的第一步是？', '旋律聴音の第一歩は？', 'The first step of melodic dictation is…'), options: [t('先写下节奏', 'まずリズムを書く', 'write down the rhythm'), t('先写调号', 'まず調号を書く', 'write the key signature'), t('先写最高音', 'まず最高音を書く', 'write the highest note')] },
          { prompt: t('斜线记谱里，横线表示？', 'スラッシュ記譜で横線の意味は？', 'In slash notation, a dash means…'), options: [t('延长的音', '伸ばす音', 'a sustained note'), t('休止', '休符', 'a rest'), t('跳进', '跳躍', 'a leap')] },
          { prompt: t('旋律听写时，星号常用来标出？', '旋律聴音で星印がよく示すのは？', 'In melodic dictation, stars often mark…'), options: [t('跳进', '跳躍', 'leaps'), t('休止', '休符', 'rests'), t('重音', 'アクセント', 'accents')] },
        ],
        answer: 0,
        explain: t('先节奏后音高；横线是延长；星号标跳进。', 'まずリズム、次に音高。横線は延長、星印は跳躍。', 'Rhythm before pitch; a dash is a sustain; stars mark leaps.'),
      },
      G('b41x-g1', 'noteValue', 1, ['calc']),
      G('b41x-g2', 'meterClass', 1, ['identify']),
    ],
  },
  pool: [G('b41x-p1', 'noteValue', 2, ['calc']), G('b41x-p2', 'meterClass', 2, ['identify'])],
};

// ===================== B4-2x 布鲁斯 · 扩展关 =====================
// 对应 A 面：blues（十二小节 / 变体 / bebop 布鲁斯与 Blues for Alice / 综合）+ bluesscale（各调音阶 / 大调布鲁斯音阶 / 歌词与问答 / 综合）+ 支线 blues2（quick change 与 16 小节 / 小调 / 爵士布鲁斯 / turnaround）
const EXT_B4_2 = {
  minutes: 20,
  insight: t('布鲁斯不是"简化的调性音乐"，而是另一套规则：属七可以是任何功能、靠变格进行收束、大小三度同时出现。它是一个框架，可以改得面目全非，仍然是布鲁斯。', 'ブルースは「簡単な調性音楽」ではなく別の規則：属七はどの機能にもなり、変格進行で締めくくり、長短 3 度が同時に鳴る。枠組みなので、大きく変えてもブルースのまま。', 'The blues is not simplified tonal music but a different rule set: dominant sevenths can take any function, plagal motion closes, major and minor thirds coexist. It is a schema that can be altered extensively and still be the blues.'),
  sections: {
    discover: [
      {
        id: 'b42x-d1', type: 'discover', ref: 'omt2e-blues-harmony',
        prompt: t('C 调布鲁斯最后一句：G7 – F7 – C7 – C7。F7 是一个属七和弦。它在这里起"属功能"吗？', 'C のブルース最後のフレーズ：G7 – F7 – C7 – C7。F7 は属七の和音。ここで「属機能」？', 'The last phrase of a C blues: G7 – F7 – C7 – C7. F7 is a dominant-seventh chord. Is it acting as a dominant here?'),
        play: [{ label: t('第三句', '第 3 フレーズ', 'Third phrase'), audio: { chords: [[43, 59, 62, 65], [41, 57, 63, 65], [48, 58, 64, 67], [48, 58, 64, 67]], gap: 900 } }],
        options: [t('不是：布鲁斯里属七可以是主、属或下属，F7 在这里是下属，靠 IV–I 收束', 'いいえ：ブルースの属七は主・属・下属のどれにもなる。F7 はここで下属、IV–I で締めくくる', 'No: in the blues a dominant seventh can be tonic, dominant or subdominant; F7 is subdominant here, closing by IV–I'), t('是，所有属七都是属功能', 'はい、属七はすべて属機能', 'Yes, every dominant seventh is a dominant'), t('它是转调到 F', 'F への転調', 'It modulates to F')],
        answer: 0,
        insight: {
          title: t('另一套和声规则', '別の和声の規則', 'A different harmonic rule set'),
          text: t('布鲁斯和调性音乐、爵士最大的三个不同：属七和弦可以是任何功能；结构上的收束靠变格终止（IV–I）而不是正格终止；大三度和小三度自由混用，甚至同时出现（和弦记号里有时写成带 ♯9 的属七）。最基本的 12 小节里所有和弦都是属七，它们不属于同一个调。', 'ブルースが調性音楽やジャズと最も違う 3 点：属七の和音はどの機能にもなる。構造上の終止は正格でなく変格（IV–I）。長 3 度と短 3 度が自由に混ざり、同時にも鳴る（コード記号では ♯9 付きの属七と書くこともある）。基本の 12 小節では全部が属七で、1 つの調に収まらない。', 'The blues differs most from tonal and jazz harmony in three ways: dominant sevenths can have any function; plagal cadences (IV–I), not authentic ones, give structural closure; major and minor thirds mix freely, even at once (sometimes written as a dominant chord with ♯9). In the basic 12-bar form every chord is a dominant seventh, and they don’t fit into a single key.'),
        },
      },
    ],
    explain: [
      {
        id: 'b42x-e1', type: 'page', ref: ['omt2e-blues-harmony', 'wiki-twelve-bar'],
        title: t('进阶 1 · 布鲁斯从哪里来', '発展 1・ブルースはどこから来たか', 'Advanced 1 · Where the blues comes from'),
        text: [
          t('布鲁斯传统非常古老，根源可以追溯到被奴役的非裔美国人的音乐，至今仍影响着 21 世纪的流行音乐。因为年代久远，历史记载很有限；最早的布鲁斯歌曲出现在 19 世纪末，似乎是从更早的非裔美国人音乐风格——田间号子、劳动歌——以及西非音乐的微分音和节奏特点中发展出来的。所以，虽然爵士乐手常弹布鲁斯，布鲁斯的来源和爵士不同：爵士最先在新奥尔良，由非洲、加勒比和欧洲的影响混合而成。', 'ブルースの伝統はとても古く、根は奴隷にされたアフリカ系アメリカ人の音楽にさかのぼり、21 世紀のポピュラー音楽にも影響し続けている。古いため記録は限られる。最古のブルースは 19 世紀末に現れ、それ以前のアフリカ系アメリカ人の音楽——フィールド・ハラーや労働歌——と西アフリカ音楽の微分音やリズムの特徴から育ったらしい。だからジャズ奏者がよくブルースを弾くとはいえ、ブルースの起源はジャズとは別：ジャズはまずニューオーリンズで、アフリカ・カリブ・ヨーロッパの影響が混ざって生まれた。', 'The blues tradition is very old, with roots in the music of enslaved African Americans, and it still shapes 21st-century popular music. Documentation is limited by its age; the earliest blues songs existed in the late 1800s, apparently growing out of earlier African American styles such as field hollers and work songs, plus microtonal and rhythmic traits of West African music. So although jazz musicians often play the blues, its origins are distinct from jazz, which developed first in New Orleans from African, Caribbean and European influences.'),
          t('W. C. Handy 最早把布鲁斯写成谱，它的流行带出了"race records"和 Bessie Smith、Ma Rainey 这样的歌手。12 小节的形式也是后来才固定下来的：最初第 12 小节重复属和弦，后来第三句 V–IV–I–I 的"shuffle blues"写法才成为标准。', 'ブルースを最初に楽譜にしたのは W. C. ハンディで、その人気が「レイス・レコード」やベッシー・スミス、マ・レイニーのような歌手を生んだ。12 小節の形も後から定まった：初めは 12 小節目で属和音を繰り返し、のちに第 3 フレーズ V–IV–I–I の「シャッフル・ブルース」が標準になった。', 'W. C. Handy first wrote the blues down, and its popularity led to “race records” and singers like Bessie Smith and Ma Rainey. The 12-bar form settled later: originally the dominant was repeated in bar 12; later the V–IV–I–I “shuffle blues” pattern became standard in the third phrase.'),
        ],
      },
      {
        id: 'b42x-e2', type: 'discover', practice: true, ref: 'omt2e-blues-harmony',
        prompt: t('布鲁斯的和弦记号里写成 C7♯9，常常是为了表示什么？', 'ブルースのコード記号で C7♯9 と書くのは、多くの場合何を表すため？', 'In the blues, writing C7♯9 often signals…'),
        options: [t('大三度和小三度同时出现', '長 3 度と短 3 度が同時に鳴る', 'major and minor thirds sounding together'), t('转到 C 小调', 'ハ短調への転調', 'a modulation to C minor'), t('这个和弦是下属功能', 'この和音は下属機能', 'that the chord is a subdominant')],
        answer: 0,
        insight: { title: t('♯9 就是小三度', '♯9 は短 3 度', '♯9 is the minor third'), text: t('C 上的 ♯9 是 D♯，和 E♭ 同音：大三度 E 和"小三度"同时响，这是布鲁斯的特色。', 'C の ♯9 は D♯ で E♭ と同じ音：長 3 度 E と「短 3 度」が同時に鳴るのがブルースの特徴。', 'The ♯9 over C is D♯, the same pitch as E♭: major third E and the “minor third” together — a blues hallmark.') },
      },
      {
        id: 'b42x-e3', type: 'page', ref: ['wiki-twelve-bar', 'omt2e-blues-harmony'],
        title: t('进阶 2 · 各种布鲁斯的和弦表', '発展 2・いろいろなブルースのコード表', 'Advanced 2 · A chart of blues variants'),
        text: [
          t('bebop 布鲁斯（Charlie Parker 的《Now\'s the Time》《Billie\'s Bounce》、Sonny Rollins 的《Tenor Madness》等）在框架里塞进更多和弦：第 4 小节是 V7–I7，第 6 小节用 ♯IV°7，第 8 小节用 V/ii♭9（即 VI7♭9），第 9、10 小节 ii7–V7，最后两小节 I7–V/ii、ii–V。小调布鲁斯（John Coltrane 的《Equinox》《Mr. P.C.》）：i7 四小节、iv7 两小节、i7 两小节，第三句 ♭VI7–V7–i7；五级可以是大的 V7 也可以是小的 v7。', 'ビバップ・ブルース（パーカー《Now\'s the Time》《Billie\'s Bounce》、ロリンズ《Tenor Madness》など）は枠にもっと和音を詰める：4 小節目は V7–I7、6 小節目は ♯IV°7、8 小節目は V/ii♭9（VI7♭9）、9・10 小節目は ii7–V7、最後の 2 小節は I7–V/ii、ii–V。マイナー・ブルース（コルトレーン《Equinox》《Mr. P.C.》）：i7 が 4 小節、iv7 が 2 小節、i7 が 2 小節、第 3 フレーズは ♭VI7–V7–i7。5 度の和音は長の V7 でも短の v7 でもよい。', 'The bebop blues (Parker’s “Now’s the Time” and “Billie’s Bounce”, Rollins’s “Tenor Madness”) packs in more chords: bar 4 is V7–I7, bar 6 uses ♯IV°7, bar 8 V/ii♭9 (VI7♭9), bars 9–10 ii7–V7, the last two bars I7–V/ii, ii–V. The minor blues (Coltrane’s “Equinox”, “Mr. P.C.”): four bars of i7, two of iv7, two of i7, then ♭VI7–V7–i7; the fifth-degree chord may be major V7 or minor v7.'),
          t('OMT 的小调布鲁斯则把第三句的 V–IV–I 换成 ii–V–I，因为大三的 V 走到小三的 iv 听起来会泄气。录音里的变体更多：Muddy Waters 的《Hoochie Coochie Man》（1954）是 16 小节；Beach Boys 的《Surfin\' USA》（1963）也是 16 小节，但前两句都以两小节 V 开始；B.B. King 的《The Thrill is Gone》（1970）是小调，最后一句用 ♭VI–V 代替 ii–V。', 'OMT のマイナー・ブルースは第 3 フレーズの V–IV–I を ii–V–I に替える。長の V から短の iv へ進むと拍子抜けに聞こえるから。録音にはさらに変化がある：マディ・ウォーターズ《Hoochie Coochie Man》（1954）は 16 小節。ビーチ・ボーイズ《Surfin\' USA》（1963）も 16 小節だが、最初の 2 フレーズは V 2 小節で始まる。B.B. キング《The Thrill is Gone》（1970）は短調で、最後のフレーズの ii–V を ♭VI–V に替える。', 'OMT’s minor blues replaces the third phrase’s V–IV–I with ii–V–I, since major V to minor iv sounds anticlimactic. Recordings vary further: Muddy Waters’s “Hoochie Coochie Man” (1954) is a 16-bar blues; the Beach Boys’ “Surfin’ USA” (1963) is 16 bars, but its first two phrases begin with two bars of V; B.B. King’s “The Thrill is Gone” (1970) is in minor and replaces the final ii–V with ♭VI–V.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: '1–4', cells: ['I7', 'IV7', 'I7', 'V7 I7'] }, { label: '5–8', cells: ['IV7', '♯IV°7', 'I7', 'V/ii♭9'] }, { label: '9–12', cells: ['ii7', 'V7', 'I7 V/ii', 'ii7 V7'] }] },
      },
      {
        id: 'b42x-e4', type: 'discover', practice: true, ref: 'wiki-twelve-bar',
        prompt: t('F 调 bebop 布鲁斯第 6 小节常用的 ♯IV°7 是哪个和弦？', 'F のビバップ・ブルース 6 小節目によく使う ♯IV°7 は？', 'In an F bebop blues, which chord is the ♯IV°7 of bar 6?'),
        options: ['B°7', 'B♭7', 'E°7', 'C°7'],
        answer: 0,
        insight: { title: t('IV 上升半音', 'IV を半音上げる', 'IV raised a half step'), text: t('F 调的 IV 是 B♭，升高半音是 B：B°7（B D F A♭），连接第 5 小节的 B♭7 和第 7 小节的 F7。', 'F の IV は B♭、半音上げて B：B°7（B D F A♭）。5 小節目の B♭7 と 7 小節目の F7 をつなぐ。', 'IV in F is B♭; raised a half step it is B: B°7 (B D F A♭), linking bar 5’s B♭7 to bar 7’s F7.') },
      },
      {
        id: 'b42x-e5', type: 'page', ref: ['omt2e-blues-scale', 'wiki-twelve-bar'],
        title: t('进阶 3 · 歌词、问答与两种布鲁斯音阶', '発展 3・歌詞、コール・アンド・レスポンス、2 つのブルース・スケール', 'Advanced 3 · Lyrics, call and response, two blues scales'),
        text: [
          t('12 小节的三个四小节乐句常配 aab 歌词：唱一行、重复一次（有时略改）、再唱对比的一行；旋律常跟着这个结构（维基称作 AA\'B）。问答（call and response）很可能继承自被奴役的非洲人和非裔美国人的劳动歌：有歌词的人声旋律是"问"，乐器的填充是"答"。以 Clarence Williams 作、Bessie Smith 1923 年录音的《Gulf Coast Blues》为例：每一行 a 歌词都完全只唱在乐句的前两小节里，后两小节留给乐器。', '12 小節の 3 つの 4 小節フレーズにはよく aab の歌詞が付く：1 行歌い、繰り返し（少し変えることも）、対照的な 1 行を歌う。旋律もこの構造に従うことが多い（ウィキペディアでは AA\'B）。コール・アンド・レスポンスは奴隷にされたアフリカ人とアフリカ系アメリカ人の労働歌から受け継がれたらしい：歌詞のある声の旋律が「コール」、楽器の合いの手が「レスポンス」。クラレンス・ウィリアムズ作、ベッシー・スミス 1923 年録音の《Gulf Coast Blues》では、a の歌詞はどれもフレーズの最初の 2 小節だけで歌われ、後の 2 小節は楽器に残される。', 'The three four-bar phrases of a 12-bar blues are often matched with aab lyrics: a line, its repeat (sometimes altered), then a contrasting line; the melody often follows suit (Wikipedia calls it AA\'B). Call and response was likely inherited from the work songs of enslaved Africans and African Americans: the sung melody is the call, an instrumental filler the response. In “Gulf Coast Blues” (by Clarence Williams, recorded by Bessie Smith in 1923), each a line is sung entirely in the first two bars of its phrase, leaving the last two to the instruments.'),
          t('布鲁斯音阶 do–me–fa–fi–sol–te 和 I、V 这样的大三和弦会产生风格性的冲突；从它的第二个音开始转，就得到大调布鲁斯音阶 do–re–ri–mi–sol–la，和大三和弦的冲突小一些。即兴时可以在大三和弦上想大调布鲁斯音阶——但在大三和弦上用带降三、降七的布鲁斯音阶，也是完全正常的做法。', 'ブルース・スケール do–me–fa–fi–sol–te は I や V のような長三和音と様式的にぶつかる。2 つ目の音から回すとメジャー・ブルース・スケール do–re–ri–mi–sol–la になり、長三和音とのぶつかりは少ない。即興では長三和音の上でメジャー・ブルース・スケールを考えるとよい——ただし長三和音の上で ♭3・♭7 のあるブルース・スケールを使うのもまったく普通。', 'The blues scale do–me–fa–fi–sol–te clashes stylistically with major chords like I and V; rotating it to start on its second note gives the major blues scale do–re–ri–mi–sol–la, less dissonant with major chords. When improvising you can think major blues over major chords — but using the blues scale, with its flat third and seventh, over major chords is also perfectly normal.'),
        ],
      },
      {
        id: 'b42x-e6', type: 'discover', practice: true, ref: 'omt2e-blues-scale',
        prompt: t('《Gulf Coast Blues》里，每一行 a 歌词唱在四小节乐句的哪里？', '《Gulf Coast Blues》で a の歌詞は 4 小節フレーズのどこで歌われる？', 'In “Gulf Coast Blues”, where in each four-bar phrase is an a line sung?'),
        options: [t('只在前两小节', '最初の 2 小節だけ', 'Only in the first two bars'), t('只在后两小节', '後の 2 小節だけ', 'Only in the last two bars'), t('四小节都唱满', '4 小節いっぱい', 'Across all four bars')],
        answer: 0,
        insight: { title: t('留白给乐器', '楽器に空ける', 'Leaving room for the band'), text: t('人声唱前两小节（问），乐器填后两小节（答）。', '声が最初の 2 小節（コール）、楽器が後の 2 小節（レスポンス）。', 'Voice in bars 1–2 (call), instruments in bars 3–4 (response).') },
      },
      {
        id: 'b42x-e7', type: 'page', ref: ['omt2e-blues-harmony', 'wiki-blues-for-alice'],
        title: t('进阶 4 · 爵士布鲁斯与"Bird Blues"', '発展 4・ジャズ・ブルースと「バード・ブルース」', 'Advanced 4 · Jazz blues and “Bird Blues”'),
        text: [
          t('爵士布鲁斯在 12 小节里加进好几个 ii–V，减弱变格收束的分量：第 8 小节不再停在主和弦，而是一个副属 ii–V 指向第 9 小节的 ii；第三句的 V–IV–I 换成 ii–V–I。它同时保留了布鲁斯的特色（不在 V 上的属七、变格解决）。Lincoln Center 爵士乐团演奏 Ellington 的《C Jam Blues》就是这样，独奏段最容易听出来。更早的录音也有这种手法：Bessie Smith 的《Empty Bed Blues, Pt. 1》（1928）在大多数新和声前加一个 ii–V；Ma Rainey 的《Runaway Blues》（1928）第一句用了 IV，最后的 V 前还加了 V/V。', 'ジャズ・ブルースは 12 小節にいくつも ii–V を加え、変格終止の比重を下げる：8 小節目は主和音にとどまらず、副属の ii–V で 9 小節目の ii へ。第 3 フレーズの V–IV–I は ii–V–I に。同時にブルースの特徴（V 以外の属七、変格の解決）も残す。リンカーン・センター・ジャズ・オーケストラによるエリントン《C Jam Blues》がその例で、ソロの部分で聞きやすい。もっと古い録音にもある：ベッシー・スミス《Empty Bed Blues, Pt. 1》（1928）はたいていの新しい和声の前に ii–V を置き、マ・レイニー《Runaway Blues》（1928）は最初のフレーズで IV を使い、最後の V の前に V/V を加える。', 'The jazz blues adds several ii–Vs, weakening the plagal closure: bar 8 leaves the tonic for an applied ii–V to the ii in bar 9, and the third phrase’s V–IV–I becomes ii–V–I, while non-V dominant sevenths and plagal resolutions remain. The Lincoln Center Jazz Orchestra’s “C Jam Blues” (Ellington) plays it this way, clearest in the solos. Earlier records do similar things: Bessie Smith’s “Empty Bed Blues, Pt. 1” (1928) precedes most new harmonies with a ii–V; Ma Rainey’s “Runaway Blues” (1928) uses IV in the first phrase and adds V/V before the final V.'),
          t('Charlie Parker 的《Blues for Alice》（1951）把这推得更远：一首 F 大调、大量使用 ii–V–I 的改编 12 小节布鲁斯，通常以 Fmaj7 或 F6 开始，被视为"Bird Blues"的范例。Parker 第一次录这首曲子是 1951 年 8 月为 Verve 唱片，阵容有 Red Rodney（小号）、John Lewis（钢琴）、Ray Brown（贝斯）和 Kenny Clarke（鼓）。', 'チャーリー・パーカー《Blues for Alice》（1951）はさらに進める：ヘ長調で ii–V–I を多用した改変 12 小節ブルースで、ふつう Fmaj7 か F6 で始まり、「バード・ブルース」の好例とされる。パーカーの初録音は 1951 年 8 月のヴァーヴで、メンバーはレッド・ロドニー（tp）、ジョン・ルイス（p）、レイ・ブラウン（b）、ケニー・クラーク（ds）。', 'Charlie Parker’s “Blues for Alice” (1951) goes further: a modified 12-bar blues in F major with heavy use of ii–V–I, usually beginning on Fmaj7 or F6, regarded as a fine example of “Bird Blues”. Parker first recorded it in August 1951 for Verve, with Red Rodney (trumpet), John Lewis (piano), Ray Brown (bass) and Kenny Clarke (drums).'),
        ],
      },
      {
        id: 'b42x-e8', type: 'discover', practice: true, ref: 'omt2e-blues-harmony',
        prompt: t('爵士布鲁斯第 8 小节的副属 ii–V 指向哪里？', 'ジャズ・ブルース 8 小節目の副属 ii–V はどこへ向かう？', 'In the jazz blues, the applied ii–V of bar 8 leads to…'),
        options: [t('第 9 小节的 ii', '9 小節目の ii', 'the ii of bar 9'), t('第 9 小节的 V', '9 小節目の V', 'the V of bar 9'), t('第 11 小节的 I', '11 小節目の I', 'the I of bar 11')],
        answer: 0,
        insight: { title: t('一路 ii–V', 'ii–V の連続', 'ii–V all the way'), text: t('第 8 小节的 ii–V 引出第 9 小节的 ii，接着就是第三句的 ii–V–I。', '8 小節目の ii–V が 9 小節目の ii を導き、そのまま第 3 フレーズの ii–V–I へ。', 'Bar 8’s ii–V leads to bar 9’s ii, which begins the third phrase’s ii–V–I.') },
      },
    ],
    experiment: [
      { id: 'b42x-x1', type: 'experiment', toy: 'blues', ref: ['omt2e-blues-harmony', 'wiki-twelve-bar', 'omt2e-blues-scale'],
        prompt: t('F 调布鲁斯：依次播放基本、quick change、结尾回到 V、小调四种形式，跟着高亮的小节数一数——哪几小节变了？再比较布鲁斯音阶和大调布鲁斯音阶在 F7 上的味道。', 'F のブルース：基本・クイック・チェンジ・最後に V・マイナーの 4 つを順に再生し、光る小節を数えよう——どの小節が変わった？ 次に F7 の上でブルース・スケールとメジャー・ブルース・スケールの味を比べよう。', 'A blues in F: play the basic, quick-change, turnaround-to-V and minor forms, counting the highlighted bars — which bars changed? Then compare the blues scale and the major blues scale over F7.'),
        params: { key: 5 },
        breakthrough: { id: 'b42x-forms', text: t('你听出了：改了这么多小节，它仍然是布鲁斯。', 'こんなに小節を変えても、まだブルースだと聞き取れた。', 'You heard it: change all those bars and it is still the blues.') } },
    ],
    challenge: [
      {
        id: 'b42x-c1', type: 'choice', error: 'blues-form', skills: ['identify'], ref: 'omt2e-blues-harmony',
        variants: [
          { prompt: t('布鲁斯里，结构上的收束主要靠什么终止？', 'ブルースで構造上の締めくくりは主にどの終止？', 'In the blues, structural closure comes mainly from…'), options: [t('变格终止（IV–I）', '変格終止（IV–I）', 'plagal cadences (IV–I)'), t('正格终止（V–I）', '正格終止（V–I）', 'authentic cadences (V–I)'), t('阻碍进行', '偽終止', 'deceptive cadences')] },
          { prompt: t('下面哪一项不是 OMT 列出的布鲁斯和声特点？', 'OMT が挙げるブルースの和声の特徴でないのは？', 'Which is not one of OMT’s blues harmonic traits?'), options: [t('所有和弦都在同一个大调里', 'すべての和音が 1 つの長調に収まる', 'All chords belong to one major key'), t('属七可以是任何功能', '属七はどの機能にもなる', 'Dominant sevenths can take any function'), t('大小三度可以同时出现', '長短 3 度が同時に鳴る', 'Major and minor thirds can sound together')] },
          { prompt: t('布鲁斯和爵士的来源是？', 'ブルースとジャズの起源は？', 'The origins of blues and jazz are…'), options: [t('不同：爵士最先在新奥尔良形成', '別：ジャズはまずニューオーリンズで生まれた', 'Distinct: jazz developed first in New Orleans'), t('相同', '同じ', 'The same'), t('布鲁斯源自爵士', 'ブルースはジャズから生まれた', 'The blues grew out of jazz')] },
        ],
        answer: 0,
        explain: t('布鲁斯靠变格收束，和弦不属于同一个调；它和爵士来源不同。', 'ブルースは変格で締め、和音は 1 つの調に収まらない。起源もジャズとは別。', 'The blues closes plagally, its chords span more than one key, and its origins are distinct from jazz.'),
      },
      {
        id: 'b42x-c2', type: 'choice', error: 'blues-form', skills: ['identify'], ref: ['wiki-twelve-bar', 'omt2e-blues-harmony'],
        variants: [
          { prompt: t('维基的小调布鲁斯第 9 小节是？', 'ウィキペディアのマイナー・ブルース 9 小節目は？', 'In Wikipedia’s minor blues, bar 9 is…'), options: ['♭VI7', 'iv7', 'ii∅7', 'V7'] },
          { prompt: t('bebop 布鲁斯第 8 小节常用什么和弦？', 'ビバップ・ブルース 8 小節目によく使うのは？', 'Bar 8 of a bebop blues typically has…'), options: [t('V/ii♭9（VI7♭9）', 'V/ii♭9（VI7♭9）', 'V/ii♭9 (VI7♭9)'), t('IV7', 'IV7', 'IV7'), t('♭VII7', '♭VII7', '♭VII7')] },
          { prompt: t('最初的 12 小节布鲁斯第 12 小节是什么？', '初期の 12 小節ブルースの 12 小節目は？', 'In the original 12-bar form, bar 12 was…'), options: [t('重复属和弦', '属和音の繰り返し', 'a repeated dominant'), t('IV', 'IV', 'IV'), t('ii–V', 'ii–V', 'ii–V')] },
        ],
        answer: 0,
        explain: t('维基小调布鲁斯第 9 小节 ♭VI7；bebop 布鲁斯第 8 小节 V/ii♭9；最初第 12 小节重复属和弦，后来 V–IV–I–I 才成为标准。', 'ウィキペディアのマイナー・ブルース 9 小節目は ♭VI7。ビバップ・ブルース 8 小節目は V/ii♭9。初めは 12 小節目が属和音の繰り返しで、のちに V–IV–I–I が標準に。', 'Wikipedia’s minor blues has ♭VI7 in bar 9; the bebop blues V/ii♭9 in bar 8; originally bar 12 repeated the dominant, before V–IV–I–I became standard.'),
      },
      {
        id: 'b42x-c3', type: 'choice', error: 'scale-pattern', skills: ['identify'], ref: 'omt2e-blues-scale',
        variants: [
          { prompt: t('大调布鲁斯音阶和布鲁斯音阶相比，在大三和弦上？', 'メジャー・ブルース・スケールはブルース・スケールに比べ、長三和音の上で？', 'Compared with the blues scale, the major blues scale over major chords is…'), options: [t('冲突较小', 'ぶつかりが少ない', 'less dissonant'), t('冲突更大', 'ぶつかりが大きい', 'more dissonant'), t('不能用', '使えない', 'unusable')] },
          { prompt: t('在大三和弦上用布鲁斯音阶（降三、降七）是？', '長三和音の上でブルース・スケール（♭3・♭7）を使うのは？', 'Using the blues scale (flat third, flat seventh) over major chords is…'), options: [t('完全正常的做法', 'まったく普通のこと', 'perfectly normal practice'), t('错误', '誤り', 'a mistake'), t('只在小调布鲁斯里可以', 'マイナー・ブルースだけ', 'only allowed in a minor blues')] },
          { prompt: t('问答（call and response）在布鲁斯里很可能继承自？', 'コール・アンド・レスポンスはブルースで何から受け継がれたらしい？', 'In the blues, call and response was likely inherited from…'), options: [t('被奴役者的劳动歌', '奴隷にされた人々の労働歌', 'the work songs of the enslaved'), t('歌剧', 'オペラ', 'opera'), t('bebop', 'ビバップ', 'bebop')] },
        ],
        answer: 0,
        explain: t('大调布鲁斯音阶冲突较小，但布鲁斯音阶在大三和弦上也完全正常；问答很可能来自劳动歌。', 'メジャー・ブルース・スケールはぶつかりが少ないが、ブルース・スケールも長三和音の上でまったく普通。コール・アンド・レスポンスは労働歌から来たらしい。', 'The major blues scale clashes less, but the blues scale over major chords is perfectly normal; call and response likely came from work songs.'),
      },
      {
        id: 'b42x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: ['wiki-blues-for-alice', 'omt2e-blues-harmony'],
        variants: [
          { prompt: t('《Blues for Alice》在什么调？', '《Blues for Alice》の調は？', '“Blues for Alice” is in…'), options: [t('F 大调', 'ヘ長調', 'F major'), t('C 大调', 'ハ長調', 'C major'), t('B♭ 大调', '変ロ長調', 'B♭ major')] },
          { prompt: t('哪一首被 OMT 举作 16 小节布鲁斯的例子？', 'OMT が 16 小節ブルースの例に挙げるのは？', 'Which does OMT cite as a 16-bar blues?'), options: [t('《Hoochie Coochie Man》', '《Hoochie Coochie Man》', '“Hoochie Coochie Man”'), t('《C Jam Blues》', '《C Jam Blues》', '“C Jam Blues”'), t('《Gulf Coast Blues》', '《Gulf Coast Blues》', '“Gulf Coast Blues”')] },
          { prompt: t('B.B. King 的《The Thrill is Gone》最后一句用什么代替 ii–V？', 'B.B. キング《The Thrill is Gone》最後のフレーズで ii–V の代わりは？', 'In B.B. King’s “The Thrill is Gone”, what replaces the final ii–V?'), options: ['♭VI–V', 'IV–I', '♭VII–IV'] },
        ],
        answer: 0,
        explain: t('《Blues for Alice》在 F 大调；《Hoochie Coochie Man》是 16 小节布鲁斯；《The Thrill is Gone》用 ♭VI–V。', '《Blues for Alice》はヘ長調。《Hoochie Coochie Man》は 16 小節ブルース。《The Thrill is Gone》は ♭VI–V。', '“Blues for Alice” is in F major; “Hoochie Coochie Man” is a 16-bar blues; “The Thrill is Gone” uses ♭VI–V.'),
      },
      G('b42x-g1', 'twelveBar', 1, ['identify']),
      G('b42x-g2', 'bluesScale', 1, ['spell']),
    ],
  },
  pool: [G('b42x-p1', 'twelveBar', 2, ['identify']), G('b42x-p2', 'bluesScale', 2, ['spell'])],
};

// ===================== B4-3x ii–V–I 与和弦—音阶 · 扩展关 =====================
// 对应 A 面：jazz（各调 ii–V–I / 附加的 ii / 小调 ii–V–i / 综合）+ chordscale（调内调式 / 同一种和弦三种选择 / 局限 / 综合）
const EXT_B4_3 = {
  minutes: 20,
  insight: t('ii–V–I 是一个"图式"：根音五度 + m7–7–maj7 的性质，变了形也认得出，还能整组搬到别的调去；和弦—音阶理论则按罗马数字给每个和弦配颜色——但它不是调，也不是爵士即兴的全部。', 'ii–V–I は「スキーマ」：根音の 5 度進行 + m7–7–maj7 の性質。形が変わっても認識でき、まるごと別の調へ移せる。コード・スケール理論はローマ数字で各和音に色を付ける——ただしそれは調ではなく、ジャズ即興のすべてでもない。', 'ii–V–I is a schema: fifth-related roots plus m7–7–maj7 qualities, recognisable even when altered and movable wholesale to other keys; chord–scale theory colours each chord by its Roman numeral — but those colours are not keys, nor the whole of jazz improvisation.'),
  sections: {
    discover: [
      {
        id: 'b43x-d1', type: 'discover', ref: 'omt2e-iivi',
        prompt: t('John Lewis 的《Afternoon in Paris》（C 调）开头：Cm7 – F7 – B♭maj7，紧接着 B♭m7 – E♭7 – A♭maj7。B♭maj7 变成 B♭m7 之后，它起什么作用？', 'ジョン・ルイス《Afternoon in Paris》（C）の冒頭：Cm7 – F7 – B♭maj7、すぐに B♭m7 – E♭7 – A♭maj7。B♭maj7 が B♭m7 になると、どんな役割？', 'John Lewis’s “Afternoon in Paris” (in C) opens Cm7 – F7 – B♭maj7, then B♭m7 – E♭7 – A♭maj7. Once B♭maj7 becomes B♭m7, what is it doing?'),
        play: [{ label: t('两组 ii–V–I', '2 組の ii–V–I', 'Two ii–V–Is'), audio: { chords: [[48, 63, 70], [41, 57, 63], [46, 57, 62], [46, 56, 61], [39, 55, 61], [44, 55, 60]], gap: 850 } }],
        options: [t('变成 A♭ 调的 ii7，于是往下转了一个全音', 'A♭ の ii7 になり、全音下へ転調する', 'It becomes ii7 of A♭, forcing a move down a whole step'), t('它还是 B♭ 调的主和弦', 'まだ B♭ の主和音', 'It is still the tonic of B♭'), t('它是 C 调的属和弦', 'C の属和音', 'It is the dominant of C')],
        answer: 0,
        insight: {
          title: t('ii–V 可以整组搬家', 'ii–V はまるごと引っ越せる', 'A ii–V can move house'),
          text: t('开头两组 ii–V–I 分别指向 B♭（C 调的 ♭VII）和 A♭（♭VI）。把前一个 Imaj7 的三音降低变成小七和弦，它就成了下一个调的 ii7——功能变了，于是往下转一个全音。因为 ii–V–I 在爵士里无处不在，不只属和弦可以"应用"，ii 也可以：整组 ii–V–(I) 都能拿来强调别的和弦。', '最初の 2 組の ii–V–I は B♭（C の ♭VII）と A♭（♭VI）へ向かう。前の Imaj7 の 3 度を下げて短七にすると次の調の ii7 になる——機能が変わり、全音下へ転調する。ii–V–I はジャズのどこにでもあるので、属和音だけでなく ii も「応用」できる：ii–V–(I) 全体で別の和音を強調できる。', 'The first two ii–V–Is point to B♭ (♭VII in C) and A♭ (♭VI). Lowering the third of the previous Imaj7 turns it into the next key’s ii7 — its function changes, forcing a move down a whole step. Because ii–V–I is everywhere in jazz, not only dominants but ii chords can be applied: a whole ii–V–(I) can tonicize another chord.'),
        },
      },
    ],
    explain: [
      {
        id: 'b43x-e1', type: 'page', ref: 'omt2e-iivi',
        title: t('进阶 1 · 图式：变了形也认得出', '発展 1・スキーマ：形が変わっても認識できる', 'Advanced 1 · A schema survives alteration'),
        text: [
          t('ii–V–I 常出现在终止处，以完全正格终止收束，也像积木一样出现在曲子各处。大调里是 mi7–7–ma7，小调里是 ∅7–7–mi7（V 不论大小调都是大三的属七）。它是一个"图式"——大脑能认出的常见模式，即使具体呈现有变化。只有 ii–V、没接 I，也认得出来，因为根音关系和性质的组合太有辨识度了。', 'ii–V–I は終止によく現れて完全正格終止で締めくくり、曲中のあちこちに部品としても現れる。長調では mi7–7–ma7、短調では ∅7–7–mi7（V は長調でも短調でも長三和音の属七）。これは「スキーマ」——具体的な形が変わっても脳が認識できる型。I に解決しない ii–V だけでも認識できる。根音の関係と性質の組み合わせがそれだけ特徴的だから。', 'ii–V–I appears reliably at cadences, closing with a PAC, and as a building block throughout a tune. In major it is mi7–7–ma7; in minor ∅7–7–mi7 (V is major either way). It is a schema — a common pattern the brain recognises even when its presentation varies. Even a ii–V without its I is recognisable, so distinctive is the combination of root motion and qualities.'),
          t('OMT 举的变形：《Misty》把 ma7 换成 6 和弦（《My Funny Valentine》也是）；《Prelude to a Kiss》把通常是属七的 V 换成增三和弦（保留小七度）；《A Night in Tunisia》也改了 V，不过是把五音降低而不是升高。', 'OMT が挙げる変形：《Misty》は ma7 を 6 の和音に（《My Funny Valentine》も同じ）。《Prelude to a Kiss》はふつう属七の V を増三和音に（短 7 度は残す）。《A Night in Tunisia》も V を変えるが、5 度を上げるのでなく下げる。', 'OMT’s alterations: “Misty” replaces the ma7 with a 6 chord (as does “My Funny Valentine”); “Prelude to a Kiss” replaces the dominant-quality V with an augmented chord (keeping the minor seventh); “A Night in Tunisia” alters V too, but lowers the fifth instead of raising it.'),
        ],
      },
      {
        id: 'b43x-e2', type: 'discover', practice: true, ref: 'omt2e-iivi',
        prompt: t('《Prelude to a Kiss》的 ii–V–I 里，V 被换成了什么？', '《Prelude to a Kiss》の ii–V–I で V は何に替わる？', 'In the ii–V–I of “Prelude to a Kiss”, V is replaced by…'),
        options: [t('增三和弦（保留小七度）', '増三和音（短 7 度は残す）', 'an augmented chord (minor seventh kept)'), t('6 和弦', '6 の和音', 'a 6 chord'), t('五音降低的属七', '5 度を下げた属七', 'a dominant with lowered fifth')],
        answer: 0,
        insight: { title: t('升五和降五', '5 度を上げるか下げるか', 'Raised fifth, lowered fifth'), text: t('《Prelude to a Kiss》升高五音（增三 + 小七），《A Night in Tunisia》降低五音；《Misty》改的是 I（6 和弦）。', '《Prelude to a Kiss》は 5 度を上げ（増三 + 短 7）、《A Night in Tunisia》は下げる。《Misty》が変えるのは I（6 の和音）。', '“Prelude to a Kiss” raises the fifth (augmented + minor seventh), “A Night in Tunisia” lowers it; “Misty” alters the I (a 6 chord).') },
      },
      {
        id: 'b43x-e3', type: 'page', ref: 'omt2e-iivi',
        title: t('进阶 2 · 应用的 ii–V 与"ii–V 空间"', '発展 2・応用の ii–V と「ii–V 空間」', 'Advanced 2 · Applied ii–Vs and “ii–V space”'),
        text: [
          t('和弦性质是功能的重要标记：属七和弦名字里就带着"属"，完全减七和弦也有属功能。应用和弦的技巧就是把属和弦从原调里拿出来放进新调，它们仍然起属的作用；在爵士里，ii 也能这样"应用"。Michael McClimon（2017）把所有 ii–V–I 关系画成一个"ii–V 空间"：按五度圈排列，每个和弦前面都有一个 ii–V。', '和音の性質は機能の大事な目印：属七の和音は名前に「属」がある。完全減七も属機能を持つ。応用和音の技法は属和音を元の調から取り出して新しい調に入れることで、それでも属として働く。ジャズでは ii も同じように「応用」できる。マイケル・マクリモン（2017）は ii–V–I の関係をすべて「ii–V 空間」に描いた：五度圏に並べ、各和音の前に ii–V がある。', 'Chord quality is a key marker of function: the dominant seventh has “dominant” in its name, and fully diminished chords also have dominant function. Applied chords take dominants out of their key and drop them into a new one, where they still act as dominants; in jazz, ii chords can be applied too. Michael McClimon (2017) drew all ii–V–I relations as a “ii–V space”: arranged as the circle of fifths, each chord preceded by a ii–V.'),
          t('空间里有四种箭头：黑色实线连接一个 ii–V–I 图式内部的和弦，灰色实线表示五度圈关系；长虚线表示同根音、只把七音降低（ma7 → 7），短虚线表示同根音、只把三音降低（7 → mi7）。用它来看，Lee Morgan 的《Ceora》整首都由 ii–V–I 组成，半音化的进行也变得好懂。', '空間には 4 種類の矢印がある：黒の実線は 1 つの ii–V–I の中の和音を結び、灰色の実線は五度圏の関係。長い破線は同じ根音で 7 度だけ下げる（ma7 → 7）、短い破線は同じ根音で 3 度だけ下げる（7 → mi7）。これで見ると、リー・モーガン《Ceora》は全曲が ii–V–I でできていて、半音的な進行もわかりやすくなる。', 'The space has four kinds of arrow: solid black within a ii–V–I schema, solid grey for circle-of-fifths relations; long dashes keep the root and lower the seventh (ma7 → 7), short dashes keep the root and lower the third (7 → mi7). Seen this way, Lee Morgan’s “Ceora” consists entirely of ii–V–Is, and its chromatic progression becomes intelligible.'),
        ],
      },
      {
        id: 'b43x-e4', type: 'discover', practice: true, ref: 'omt2e-iivi',
        prompt: t('在 ii–V 空间里，从 Cmaj7 到 C7 是哪一种箭头？', 'ii–V 空間で Cmaj7 から C7 はどの矢印？', 'In ii–V space, which arrow goes from Cmaj7 to C7?'),
        options: [t('长虚线（只把七音降低）', '長い破線（7 度だけ下げる）', 'Long dashes (only the seventh lowered)'), t('短虚线（只把三音降低）', '短い破線（3 度だけ下げる）', 'Short dashes (only the third lowered)'), t('灰色实线（五度圈）', '灰色の実線（五度圏）', 'Solid grey (circle of fifths)')],
        answer: 0,
        insight: { title: t('一次只改一个音', '一度に 1 音だけ変える', 'One note at a time'), text: t('C E G B → C E G B♭：同根音、七音降低。再把三音降低（C7 → Cm7）是短虚线，Cm7 就能当 B♭ 调的 ii。', 'C E G B → C E G B♭：同じ根音で 7 度を下げる。さらに 3 度を下げる（C7 → Cm7）のが短い破線で、Cm7 は B♭ の ii になれる。', 'C E G B → C E G B♭: same root, lowered seventh. Lowering the third next (C7 → Cm7) is a short-dash arrow, and Cm7 can serve as ii of B♭.') },
      },
      {
        id: 'b43x-e5', type: 'page', ref: 'omt2e-chord-scale',
        title: t('进阶 3 · 和弦—音阶：从哪里来，怎么用', '発展 3・コード・スケール：どこから来て、どう使うか', 'Advanced 3 · Chord–scale theory: origins and use'),
        text: [
          t('和弦—音阶理论是 Berklee 音乐学院和许多大学教授的即兴方法，基于 George Russell 的《Lydian Chromatic Concept of Tonal Organization》（1953），由爵士教育家 Jamey Aebersold、David Baker 和 Jerry Coker 推广。名字来自这个想法：十三和弦的音可以重新排成一个七声音阶——Dm7 叠到十三音是 D F A C E G B，正是 D Dorian 的音。基本概念是每个和弦都来自一个"母音阶"。即兴时把和弦音放在正拍上，旋律就能把和弦"说"出来；用同样的办法，还能从旋律小调、和声小调与和声大调的调式里推出更多对应。', 'コード・スケール理論はバークリー音楽大学など多くの大学で教えられる即興の方法で、ジョージ・ラッセル『Lydian Chromatic Concept of Tonal Organization』（1953）に基づき、ジャズ教育者ジェイミー・エーバーソルド、デヴィッド・ベイカー、ジェリー・コーカーが広めた。名前は、13 の和音の音を 7 音の音階に並べ替えられるという考えから——Dm7 を 13 まで積むと D F A C E G B、D ドリアンと同じ音。基本は、どの和音も「親の音階」から来るという考え。即興では和音の音を表拍に置くと旋律が和音を「語る」。同じやり方で、旋律的短音階・和声的短音階・和声的長音階の旋法からも対応を導ける。', 'Chord–scale theory, taught at Berklee and many other schools, is based on George Russell’s Lydian Chromatic Concept of Tonal Organization (1953) and was popularised by Jamey Aebersold, David Baker and Jerry Coker. The name comes from the idea that a thirteenth chord’s notes can be rearranged as a seven-note scale — Dm7 extended to the thirteenth is D F A C E G B, the notes of D Dorian. Every chord comes from a parent scale. Placing chord tones on downbeats lets an improvised melody imply the harmony; the same approach yields relationships from the melodic minor, harmonic minor and harmonic major modes.'),
          t('关键是：这些调式不是调性中心，和弦一换不代表转调。先做罗马数字分析，再选调式：Bart Howard 的《Fly Me to the Moon》（1954）开头一串五度根音运动，用到了七种调内对应里的六种，但它明明就在 C 调，不是七个调。John Coltrane 在《Giant Steps》（1960）的第一段独奏里，因为速度快、调性关系不寻常，旋律主要由琶音和音阶片段组成。', '大事なのは：これらの旋法は調の中心ではなく、和音が変わるたびに転調するわけではないこと。まずローマ数字分析をし、それから旋法を選ぶ：バート・ハワード《Fly Me to the Moon》（1954）冒頭の 5 度の根音進行は、調内の 7 つの対応のうち 6 つを使うが、明らかにハ長調で、7 つの調ではない。ジョン・コルトレーンは《Giant Steps》（1960）の最初のコーラスで、テンポが速く調の関係が普通でないため、主にアルペジオと音階の断片で旋律を作る。', 'Crucially, these modes are not key centres; a chord change is not a modulation. Analyse Roman numerals first, then choose modes: the opening of Bart Howard’s “Fly Me to the Moon” (1954) uses six of the seven diatonic relationships in circle-of-fifths root motion, yet it is clearly in C, not seven keys. In his first chorus on “Giant Steps” (1960), John Coltrane — facing a fast tempo and unusual key relationships — builds lines mainly from arpeggios and scale fragments.'),
        ],
      },
      {
        id: 'b43x-e6', type: 'discover', practice: true, ref: 'omt2e-chord-scale',
        prompt: t('在 C 调的进行里，Am7（vi）和 Dm7（ii）都是小七和弦。按功能各配哪个调式？', 'C のコード進行で Am7（vi）と Dm7（ii）はどちらも短七。機能に従うとそれぞれどの旋法？', 'In a C-major progression, Am7 (vi) and Dm7 (ii) are both minor sevenths. Matching function, which modes do they get?'),
        options: [t('Am7 配 Aeolian，Dm7 配 Dorian', 'Am7 はエオリア、Dm7 はドリア', 'Am7 Aeolian, Dm7 Dorian'), t('都配 Dorian', 'どちらもドリア', 'Both Dorian'), t('Am7 配 Dorian，Dm7 配 Phrygian', 'Am7 はドリア、Dm7 はフリギア', 'Am7 Dorian, Dm7 Phrygian')],
        answer: 0,
        insight: { title: t('同一种性质，不同的功能', '同じ性質、違う機能', 'Same quality, different function'), text: t('vi 是第六个调式 Aeolian、ii 是第二个 Dorian：两者都只用 C 大调的音，区分开才贴合调性。', 'vi は第 6 旋法エオリア、ii は第 2 旋法ドリア。どちらもハ長調の音だけで、区別すると調に合う。', 'vi is the sixth mode, Aeolian; ii the second, Dorian: both stay within C major, and distinguishing them keeps the lines in the key.') },
      },
      {
        id: 'b43x-e7', type: 'page', ref: 'omt2e-chord-scale',
        title: t('进阶 4 · 和弦—音阶理论的四个局限', '発展 4・コード・スケール理論の 4 つの限界', 'Advanced 4 · Four limitations of chord–scale theory'),
        text: [
          t('一些爵士教育者指出了它的局限。一、缺少和弦之间的声部进行：学生容易把每个和弦都看成新的调性中心，而不是把整段进行看成来自一个母音阶，结果即兴断断续续、不连贯。二、缺少 bebop 和布鲁斯风格常用的半音化：它通常不考虑 Charlie Parker、Dizzy Gillespie、Bud Powell 等 bebop 乐手用的辅助音、经过音、副导音和蓝调音。', '一部のジャズ教育者は限界を指摘している。1. 和音どうしの声部進行がない：学生は進行全体を 1 つの親音階から来たものと見るより、和音ごとに新しい調の中心と見がちで、即興がぶつ切りで旋律的でなくなる。2. ビバップやブルース系の様式でよく使う半音的な音がない：パーカー、ガレスピー、バド・パウエルらビバップ奏者の刺繍音・経過音・副導音・ブルー・ノートをふつう扱わない。', 'Some jazz educators point out its limitations. First, no voice leading between chords: students may see each chord as a new key centre rather than the whole progression as derived from a parent scale, producing choppy, unmelodic improvisation. Second, it lacks the chromaticism of bebop and blues-based styles: neighbour tones, passing tones, secondary leading tones and blue notes used by Charlie Parker, Dizzy Gillespie and Bud Powell.'),
          t('三、时代错置：把 1960 年代的调式概念套在 1920–50 年代的曲子上——Louis Armstrong 和 Charlie Parker 并不按和弦—音阶思考；Hal Galper、Hal Crook 等教育者主张先练旋律装饰、和弦音即兴和布鲁斯即兴，再学和弦—音阶。四、回避口传传统：它重眼睛和理智，而不是耳朵和直觉；练调式代替不了扒独奏、背曲子、跟着录音即兴和与人合奏。', '3. 時代錯誤：1960 年代の旋法の考えを 1920〜50 年代の曲に当てはめること——ルイ・アームストロングもチャーリー・パーカーもコード・スケールで考えてはいなかった。ハル・ギャルパーやハル・クルックらは、コード・スケールの前に旋律の装飾・和音の音による即興・ブルースの即興を重視する。4. 口承の伝統を避けること：耳と直感より目と知性を重んじる。旋法の練習は、ソロの採譜、曲の暗記、録音に合わせた即興、仲間とのジャムの代わりにはならない。', 'Third, anachronism: applying a 1960s modal concept to tunes from 1920–50 — Louis Armstrong and Charlie Parker did not think in chord–scales; educators such as Hal Galper and Hal Crook stress melodic embellishment, chord-tone and blues-based improvisation first. Fourth, avoiding the oral tradition: it favours eye and intellect over ear and intuition; practising chord–scales is no substitute for transcribing solos, memorising tunes, improvising with recordings or jamming.'),
        ],
      },
      {
        id: 'b43x-e8', type: 'discover', practice: true, ref: 'omt2e-chord-scale',
        prompt: t('"Louis Armstrong 和 Charlie Parker 并不按和弦—音阶思考"说的是哪一条局限？', '「アームストロングもパーカーもコード・スケールで考えていなかった」はどの限界？', '“Armstrong and Parker did not think in chord–scales” illustrates which limitation?'),
        options: [t('时代错置', '時代錯誤', 'Anachronism'), t('缺少声部进行', '声部進行がない', 'No voice leading'), t('回避口传传统', '口承の伝統を避ける', 'Avoiding the oral tradition')],
        answer: 0,
        insight: { title: t('1960 年代的概念', '1960 年代の考え', 'A 1960s concept'), text: t('调式思维来自 1960 年代，套在 1920–50 年代的曲子上就时代错置了。', '旋法の考えは 1960 年代のもの。1920〜50 年代の曲に当てはめると時代錯誤。', 'Modal thinking dates from the 1960s; applying it to 1920–50 tunes is anachronistic.') },
      },
    ],
    experiment: [
      { id: 'b43x-x1', type: 'experiment', toy: 'chordScale', ref: 'omt2e-chord-scale',
        prompt: t('按五度根音运动依次点 vi → ii → V → I → IV → viiø（《Fly Me to the Moon》开头也是一串五度进行）。每一级叠到十三音是哪个调式？六个调式用的是不是同一组音？', '5 度の根音進行で vi → ii → V → I → IV → viiø と順に押そう（《Fly Me to the Moon》の冒頭も 5 度進行の連続）。13 まで積むとどの旋法？ 6 つの旋法は同じ音の集まり？', 'Tap vi → ii → V → I → IV → viiø in circle-of-fifths order (the opening of “Fly Me to the Moon” is also a chain of fifths). Which mode does each stack to? Do the six modes share one set of notes?'),
        params: { start: 5 },
        breakthrough: { id: 'b43x-onekey', text: t('你看到了：六种调式、一组音、一个调。', '6 つの旋法、1 組の音、1 つの調だと見えた。', 'You saw it: six modes, one set of notes, one key.') } },
    ],
    challenge: [
      {
        id: 'b43x-c1', type: 'choice', error: 'wrong-function', skills: ['function'], ref: 'omt2e-iivi',
        variants: [
          { prompt: t('小调的 ii–V–i 三个和弦的性质是？', '短調の ii–V–i の 3 和音の性質は？', 'The qualities of a minor-key ii–V–i are…'), options: ['∅7 – 7 – mi7', 'mi7 – 7 – ma7', 'mi7 – mi7 – mi7'] },
          { prompt: t('《Afternoon in Paris》开头的第一组 ii–V–I 指向 C 调的哪一级？', '《Afternoon in Paris》冒頭の最初の ii–V–I は C のどの度へ？', 'The first ii–V–I in “Afternoon in Paris” targets which degree of C?'), options: ['♭VII', '♭VI', 'IV'] },
          { prompt: t('除了属七，哪一种和弦也有属功能？', '属七のほかに属機能を持つ和音は？', 'Besides the dominant seventh, which chord also has dominant function?'), options: [t('完全减七和弦', '完全減七', 'The fully diminished seventh'), t('大七和弦', '長七', 'The major seventh'), t('小七和弦', '短七', 'The minor seventh')] },
        ],
        answer: 0,
        explain: t('小调 ∅7–7–mi7；第一组指向 B♭（♭VII），接着是 A♭（♭VI）；完全减七也有属功能。', '短調は ∅7–7–mi7。最初は B♭（♭VII）へ、次に A♭（♭VI）へ。完全減七も属機能。', 'Minor is ∅7–7–mi7; the first targets B♭ (♭VII), then A♭ (♭VI); fully diminished chords also have dominant function.'),
      },
      {
        id: 'b43x-c2', type: 'choice', error: 'chord-scale', skills: ['identify'], ref: 'omt2e-chord-scale',
        variants: [
          { prompt: t('Dm7 叠到十三音的 D F A C E G B，和哪个调式的音相同？', 'Dm7 を 13 まで積んだ D F A C E G B と同じ音の旋法は？', 'Dm7 extended to the thirteenth, D F A C E G B, matches which mode?'), options: ['D Dorian', 'D Aeolian', 'D Phrygian'] },
          { prompt: t('C 调里 Fmaj7（IV）按功能配哪个调式？', 'C で Fmaj7（IV）に機能で合う旋法は？', 'In C, Fmaj7 (IV) by function takes…'), options: ['F Lydian', 'F Ionian', 'F Mixolydian'] },
          { prompt: t('和弦—音阶理论里的调式是调性中心吗？', 'コード・スケール理論の旋法は調の中心？', 'Are the modes in chord–scale theory key centres?'), options: [t('不是，换和弦不代表转调', 'いいえ、和音が変わっても転調ではない', 'No — a chord change is not a modulation'), t('是，每个和弦一个调', 'はい、和音ごとに 1 つの調', 'Yes, one key per chord'), t('只有属七是', '属七だけ', 'Only for dominant sevenths')] },
        ],
        answer: 0,
        explain: t('Dm7 十三 = D Dorian；IV 配 Lydian；调式只给和弦上色，不是调。', 'Dm7 の 13 = D ドリア。IV はリディア。旋法は色付けで、調ではない。', 'Dm7 thirteenth = D Dorian; IV takes Lydian; modes colour chords, they are not keys.'),
      },
      {
        id: 'b43x-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: 'omt2e-chord-scale',
        variants: [
          { prompt: t('和弦—音阶理论基于谁的理论？', 'コード・スケール理論は誰の理論に基づく？', 'Chord–scale theory is based on whose theory?'), options: [t('George Russell', 'ジョージ・ラッセル', 'George Russell'), t('Jamey Aebersold', 'ジェイミー・エーバーソルド', 'Jamey Aebersold'), t('Charlie Parker', 'チャーリー・パーカー', 'Charlie Parker')] },
          { prompt: t('"缺少半音化"这条局限指它通常不考虑什么？', '「半音的な音がない」という限界で、ふつう扱わないものは？', 'The “lack of chromaticism” limitation means it usually ignores…'), options: [t('辅助音、经过音、副导音和蓝调音', '刺繍音・経過音・副導音・ブルー・ノート', 'neighbour tones, passing tones, secondary leading tones and blue notes'), t('三和弦', '三和音', 'triads'), t('节奏', 'リズム', 'rhythm')] },
          { prompt: t('《Giant Steps》第一段独奏里，Coltrane 的旋律主要由什么组成？', '《Giant Steps》最初のコーラスでコルトレーンの旋律は主に何でできている？', 'In his first “Giant Steps” chorus, Coltrane’s lines consist mainly of…'), options: [t('琶音和音阶片段', 'アルペジオと音階の断片', 'arpeggios and scale fragments'), t('长音', 'ロングトーン', 'long tones'), t('蓝调音', 'ブルー・ノート', 'blue notes')] },
        ],
        answer: 0,
        explain: t('它基于 George Russell 的 LCC；缺少 bebop、布鲁斯的半音装饰；Coltrane 在快速度下多用琶音和音阶片段。', 'ラッセルの LCC に基づく。ビバップやブルースの半音的装飾がない。コルトレーンは速いテンポで主にアルペジオと音階の断片を使う。', 'It rests on Russell’s LCC; it lacks bebop and blues chromaticism; at speed Coltrane uses mostly arpeggios and scale fragments.'),
      },
      {
        id: 'b43x-c4', type: 'choice', error: 'wrong-function', skills: ['function'], ref: 'omt2e-iivi',
        variants: [
          { prompt: t('ii–V 空间里，从 G7 到 Gm7 是哪种箭头？', 'ii–V 空間で G7 から Gm7 はどの矢印？', 'In ii–V space, G7 to Gm7 is which arrow?'), options: [t('短虚线（三音降低）', '短い破線（3 度を下げる）', 'Short dashes (third lowered)'), t('长虚线（七音降低）', '長い破線（7 度を下げる）', 'Long dashes (seventh lowered)'), t('黑色实线', '黒の実線', 'Solid black')] },
          { prompt: t('ii–V 空间是谁提出的？', 'ii–V 空間を提案したのは？', 'Who proposed ii–V space?'), options: [t('Michael McClimon（2017）', 'マイケル・マクリモン（2017）', 'Michael McClimon (2017)'), t('George Russell（1953）', 'ジョージ・ラッセル（1953）', 'George Russell (1953)'), t('Hal Crook', 'ハル・クルック', 'Hal Crook')] },
          { prompt: t('哪一首被 OMT 说成"整首由 ii–V–I 组成"？', 'OMT が「全曲 ii–V–I でできている」と言うのは？', 'Which tune does OMT call entirely composed of ii–V–Is?'), options: [t('Lee Morgan《Ceora》', 'リー・モーガン《Ceora》', 'Lee Morgan, “Ceora”'), t('《Misty》', '《Misty》', '“Misty”'), t('《Fly Me to the Moon》', '《Fly Me to the Moon》', '“Fly Me to the Moon”')] },
        ],
        answer: 0,
        explain: t('三音降低是短虚线；ii–V 空间来自 McClimon 2017；《Ceora》整首是 ii–V–I。', '3 度を下げるのは短い破線。ii–V 空間はマクリモン 2017。《Ceora》は全曲 ii–V–I。', 'Lowering the third is a short-dash arrow; ii–V space is McClimon 2017; “Ceora” is all ii–V–Is.'),
      },
      G('b43x-g1', 'iiVI', 1, ['function']),
      G('b43x-g2', 'chordScaleDegree', 1, ['identify']),
    ],
  },
  pool: [G('b43x-p1', 'iiVI', 2, ['function']), G('b43x-p2', 'chordScaleDegree', 2, ['identify'])],
};

// ===================== B4-4x 导向音、调性中心与进行分析 · 扩展关 =====================
// 对应 A 面：guidetone（导向音 / 路径 / 和弦报告）+ keycenter（找调 / 强功能进行 / 三种音阶体系 / 综合）+ 支线 turnarounds（大三的 VI / ragtime 进行 / ii–♭II–I 与 Tadd Dameron / 综合）
const EXT_B4_4 = {
  minutes: 21,
  insight: t('声部要"懒"：三音和七音两条线几乎不用动就能串起一整段进行；turnaround 则是在这条懒线上做文章——小三变大三、V 换成 ♭II，都是为了多一条半音线。', '声部は「怠け者」に：3 度と 7 度の 2 本の線はほとんど動かずに進行全体をつなぐ。ターンアラウンドはその線に手を加える——短三を長三に、V を ♭II に、どれも半音の線を 1 本増やすため。', 'Lazy voices: the third-and-seventh lines string a whole progression together with hardly any motion; turnarounds work on those lines — minor to major, V to ♭II — each adding another chromatic line.'),
  sections: {
    discover: [
      {
        id: 'b44x-d1', type: 'discover', ref: 'omt2e-jazz-voicings',
        prompt: t('只看低音上面的两个音（三音和七音）。A：Dm7 – G7 – Cmaj7（根音相距五度）；B：G7 – F7（根音相距二度）– C7。两种情况下，两条线分别怎么走？', '低音の上の 2 音（3 度と 7 度）だけを見る。A：Dm7 – G7 – Cmaj7（根音は 5 度関係）、B：G7 – F7（根音は 2 度関係）– C7。2 本の線はそれぞれどう動く？', 'Watch only the two notes above the bass (third and seventh). A: Dm7 – G7 – Cmaj7 (roots a fifth apart); B: G7 – F7 (roots a second apart) – C7. How do the two lines move in each case?'),
        play: [{ label: 'A', audio: { chords: [[50, 65, 72], [43, 65, 71], [48, 64, 71]], gap: 900 } }, { label: 'B', audio: { chords: [[43, 59, 65], [41, 57, 63], [48, 58, 64]], gap: 900 } }],
        options: [t('五度关系时三音、七音互换位置；二度关系时两条线平行移动', '5 度関係では 3 度と 7 度が入れ替わり、2 度関係では 2 本が平行に動く', 'By fifth, third and seventh swap roles; by second, the lines move in parallel'), t('两种情况都平行移动', 'どちらも平行', 'Parallel in both'), t('两种情况都要大跳', 'どちらも大跳躍', 'Big leaps in both')],
        answer: 0,
        insight: {
          title: t('3–7 范式', '3–7 のパラダイム', 'The 3–7 paradigm'),
          text: t('低音上方只写两个声部时，通常用三音和七音（省掉五音）。根音相距五度（C7–F7、G7–Cmaj7）时，一个声部在三音和七音之间来回，另一个声部顺序相反；根音相距二度时，两条线平行移动，一条一直唱三音、另一条一直唱七音——右手只会出现四度和五度两种音程。', '低音の上に 2 声部だけ書くなら、ふつう 3 度と 7 度（5 度は省く）。根音が 5 度関係（C7–F7、G7–Cmaj7）なら、片方の声部が 3 度と 7 度を行き来し、もう片方は逆の順。2 度関係なら 2 本は平行に動き、片方はずっと 3 度、もう片方はずっと 7 度——右手には 4 度と 5 度の 2 種類の音程しか出ない。', 'With two voices above the bass, use the third and seventh (omitting the fifth). Roots a fifth apart (C7–F7, G7–Cmaj7): one voice alternates third and seventh, the other the reverse; roots a second apart: the lines move in parallel, one on thirds, the other on sevenths — the right hand only ever has fourths and fifths.'),
        },
      },
    ],
    explain: [
      {
        id: 'b44x-e1', type: 'page', ref: 'omt2e-jazz-voicings',
        title: t('进阶 1 · 间距、重复与省略', '発展 1・間隔、重複、省略', 'Advanced 1 · Spacing, doubling, omission'),
        text: [
          t('间距模仿泛音列：泛音列里第 1、2 分音相距八度，越往上越密，从第 13 分音起相邻分音只差半音。所以低音区音靠得太近会发浑、听起来不协和，即使和弦本身是协和的；高音区间隔太宽，上面的音会显得孤立突出（有时这正是想要的）。爵士里的低音多由低音提琴演奏，它比谱面低八度，最低音是 E1，中央 C 下面第三个 E——低音和其他声部隔得很远是正常的。延伸音放在高声部：13 音要放在七音上方，否则听起来就是 6 音。', '間隔は倍音列をまねる：倍音列の第 1・2 倍音は 8 度離れ、上へ行くほど詰まり、第 13 倍音からは隣どうしが半音。だから低音域で音を詰めると、和音自体は協和でも濁って不協和に聞こえる。高音域で間を広げすぎると上の音が孤立して目立つ（それが狙いのこともある）。ジャズのベースはたいていコントラバスで、記譜より 1 オクターヴ低く、最低音は E1——中央ハの 3 つ下の E。ベースがほかの声部から大きく離れるのは普通。拡張音は高い声部に：13 度は 7 度より上に置かないと 6 度に聞こえる。', 'Spacing mimics the harmonic series: partials 1 and 2 are an octave apart, they crowd closer going up, and from partial 13 neighbours are only a half step apart. Close notes in a low register sound muddy and dissonant even when the chord is consonant; wide gaps up high make the top note sound isolated (sometimes desirable). Jazz bass lines are usually played on upright bass, sounding an octave below written, its lowest note E1, three Es below middle C — so a bass far from the rest is normal. Extensions belong in the upper voices: put the thirteenth above the seventh, or it sounds like a sixth.'),
          t('重复：最安全的是重复低音（通常是和弦里稳定的音），其次是重复根音。省略：最常省的是五音——它是泛音列里很早出现的第 3 分音，只加强根音，自己没有多少特色；七音和根音几乎从不省，省掉根音有让整个和弦不稳的风险——不过有低音手时可以故意省掉上方的根音，低音手会弹它。', '重複：いちばん安全なのは低音（ふつう和音の安定した音）、次は根音。省略：いちばんよく省くのは 5 度——倍音列の早い第 3 倍音で、根音を強めるだけでそれ自体の個性は少ない。7 度と根音はほとんど省かない。根音を省くと和音全体が不安定になるおそれがある——ただしベーシストがいれば上声の根音をわざと省いてよい。ベースが根音を弾くから。', 'Doubling: the safest note to double is the bass (usually a stable chord member), next the root. Omission: the fifth is omitted most often — partial 3, early in the series, it reinforces the root without much character of its own; the seventh and root are hardly ever omitted, since dropping the root risks destabilising the chord — though with a bassist you may omit it from the upper voices, as the bass supplies it.'),
        ],
      },
      {
        id: 'b44x-e2', type: 'discover', practice: true, ref: 'omt2e-jazz-voicings',
        prompt: t('G13 的 13 音 E 放在七音 F 的下面，会听成什么？', 'G13 の 13 度 E を 7 度 F より下に置くと、何に聞こえる？', 'Put G13’s thirteenth, E, below the seventh F. What does it sound like?'),
        options: [t('6 音（G6 的味道）', '6 度（G6 の響き）', 'A sixth (a G6 sound)'), t('还是 13 音', 'やはり 13 度', 'Still a thirteenth'), t('♭9', '♭9', 'A ♭9')],
        answer: 0,
        insight: { title: t('名字就是位置', '名前が位置を表す', 'The name tells the register'), text: t('爵士和声里 13 和 6 不一样：13 音要在七音上方才像 13。', 'ジャズ和声では 13 と 6 は別物：13 度は 7 度より上で初めて 13 らしくなる。', 'In jazz harmony a thirteenth is not a sixth: it must sit above the seventh to sound like one.') },
      },
      {
        id: 'b44x-e3', type: 'page', ref: 'omt2e-jazz-voicings',
        title: t('进阶 2 · "懒"的声部，第三条线', '発展 2・「怠け者」の声部と 3 本目の線', 'Advanced 2 · Lazy voices and a third line'),
        text: [
          t('除了低音（常常跳进），声部换和弦时应尽量少动。最省事的是共同音——保持不动；其次是全音或半音；三度的跳也好唱好奏，很多时候不得不跳；大跳主要用来制造对比和刺激，要少用、有理由地用。大跳在同一个和弦内部最自然，跨过换和弦的大跳会让和弦听起来不连贯、也更难演奏。', 'ベース（よく跳躍する）を除き、声部は和音が変わるときなるべく動かない。いちばん楽なのは共通音——動かないこと。次は全音か半音。3 度の跳躍も歌いやすく弾きやすく、跳ばざるをえない場面も多い。大跳躍は主に対比と刺激のためで、控えめに、理由をもって。大跳躍は同じ和音の中なら自然だが、和音の変わり目をまたぐと和音がつながらず演奏も難しくなる。', 'Apart from the bass (which often leaps), voices should move as little as possible at a chord change. Best is a common tone — not moving; next a whole or half step; a skip of a third is also easy and often unavoidable; leaps are for contrast and excitement, used sparingly and with reason. Leaps sound most natural within one chord; leaping across a chord change makes the chords sound disconnected and harder to play.'),
          t('三个上方声部时，初学者常想加回五音，但更地道的做法是继续省五音、加延伸音：在 3–7 两条线上面加一条在九音和十三音之间来回的线。延伸音常常被升高或降低；先试调内的那个版本（不加临时记号），听起来别扭再试着升或降，让耳朵决定。这些只是常规——可以打破，但要知道自己为什么打破。', '上声 3 つでは初心者は 5 度を戻したくなるが、より様式的なのは 5 度を省いたまま拡張音を加えること：3–7 の 2 本の上に、9 度と 13 度を行き来する線を 1 本足す。拡張音はよく上げたり下げたりされる。まず調内の版（臨時記号なし）を試し、ぎこちなければ上げ下げを試して耳で決める。これらは慣習にすぎない——破ってもよいが、なぜ破るのかを知っておくこと。', 'With three upper voices beginners want the fifth back, but more idiomatic is to keep omitting it and add extensions: above the 3–7 lines, a third line alternating ninths and thirteenths. Extensions are often altered; try the diatonic version first (no accidentals), and if it sounds awkward, try raising or lowering it and let your ear decide. These are guidelines — break them if you like, but know why.'),
        ],
      },
      {
        id: 'b44x-e4', type: 'discover', practice: true, ref: 'omt2e-jazz-voicings',
        prompt: t('按"懒声部"的优先顺序，下面哪种移动最优先？', '「怠け者の声部」の優先順位で、最も優先される動きは？', 'By “lazy voice” priorities, which motion comes first?'),
        options: [t('共同音（保持不动）', '共通音（動かない）', 'A common tone (stay put)'), t('三度的跳', '3 度の跳躍', 'A skip of a third'), t('跨过换和弦的大跳', '和音の変わり目をまたぐ大跳躍', 'A leap across the chord change')],
        answer: 0,
        insight: { title: t('不动、级进、三度、大跳', '動かない・順次・3 度・大跳躍', 'Stay, step, skip, leap'), text: t('共同音 → 全音或半音 → 三度 → 大跳（少用）。', '共通音 → 全音・半音 → 3 度 → 大跳躍（控えめに）。', 'Common tone → whole or half step → third → leap (sparingly).') },
      },
      {
        id: 'b44x-e5', type: 'page', ref: ['wiki-turnaround', 'omt2e-iivi'],
        title: t('进阶 3 · turnaround 的家族', '発展 3・ターンアラウンドの一族', 'Advanced 3 · The turnaround family'),
        text: [
          t('turnaround 是段落结尾把音乐带回下一段（多半是同一段或整首重来）的一段，可以靠和弦进行，也可以靠旋律。它通常从主和弦（或代替它的 iii）开始，结束在属和弦 V7 上，下一段从 I 开始；也可以结束在属的替代 ♭II7 上。所以在 12 小节布鲁斯里，第 12 小节可以停在属和弦上。turnaround 里的和弦都可以是七和弦：大三的多用属七，小三的用小七（如 ii7）。', 'ターンアラウンドはセクションの終わりで次のセクション（多くは同じセクションか曲全体の繰り返し）へ導く部分で、和声でも旋律でもよい。ふつう主和音（またはその代理の iii）で始まり、属の V7 で終わり、次のセクションは I から。属の代理 ♭II7 で終わることもある。だから 12 小節ブルースでは 12 小節目が属和音で終わってよい。ターンアラウンドの和音はすべて七の和音でよい：長三は属七、短三は短七（ii7 など）が普通。', 'A turnaround is a passage at the end of a section leading to the next (most often a repeat of that section or the whole piece), harmonically or melodically. It typically begins on the tonic (or the substitute iii) and ends on V7, with the next section starting on I; it may also end on ♭II7, a dominant substitute. So in a 12-bar blues bar 12 may end on the dominant. All its chords may be sevenths: dominant sevenths for major chords, minor sevenths for minor (e.g. ii7).'),
          t('维基列出的常见形式：I–vi–ii–V；I–VI–II–V（即 I–V/ii–V/V–V）；I–♭iii°–ii7–V7；I–vi–♭VI7♯11–V；V–IV–I（布鲁斯 turnaround）；I–♭III–♭VI–♭II7（Tadd Dameron turnaround）；iii–VI–ii–V。OMT 补充：I–vi–ii–V–I 里可以用同根音的 V7/ii 代替 vi，再在它前面加一个 ii/ii——ii 和弦就被自己的 ii–V–(I) 强调了，这是很常见的变体。', 'ウィキペディアが挙げる典型：I–vi–ii–V、I–VI–II–V（I–V/ii–V/V–V）、I–♭iii°–ii7–V7、I–vi–♭VI7♯11–V、V–IV–I（ブルースのターンアラウンド）、I–♭III–♭VI–♭II7（タッド・ダメロンのターンアラウンド）、iii–VI–ii–V。OMT の補足：I–vi–ii–V–I の vi を同じ根音の V7/ii に替え、その前に ii/ii を置ける——ii の和音が自分の ii–V–(I) で強調される。とてもよくある変形。', 'Wikipedia’s typical forms: I–vi–ii–V; I–VI–II–V (I–V/ii–V/V–V); I–♭iii°–ii7–V7; I–vi–♭VI7♯11–V; V–IV–I (the blues turnaround); I–♭III–♭VI–♭II7 (the Tadd Dameron turnaround); iii–VI–ii–V. OMT adds: in I–vi–ii–V–I, replace vi with V7/ii (same root) and precede it with ii/ii — the ii chord gets its own ii–V–(I), a very common variant.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: 'I–vi–ii–V', cells: ['C', 'Am', 'Dm', 'G7'] }, { label: 'I–VI–II–V', cells: ['C', 'A7', 'D7', 'G7'] }, { label: 'I–♭iii°–ii–V', cells: ['C', 'E♭°', 'Dm7', 'G7'] }, { label: 'Dameron', cells: ['C', 'E♭', 'A♭', 'D♭7'] }] },
      },
      {
        id: 'b44x-e6', type: 'discover', practice: true, ref: 'omt2e-iivi',
        prompt: t('C 调的 I–vi–ii–V–I，把 vi 换成 V7/ii，再在前面加 ii/ii。第二、三个和弦是？', 'C の I–vi–ii–V–I で vi を V7/ii に替え、その前に ii/ii を置く。2・3 番目の和音は？', 'In C, I–vi–ii–V–I with vi replaced by V7/ii and preceded by ii/ii. What are chords two and three?'),
        options: ['Em7 – A7', 'Am7 – D7', 'Bm7 – E7'],
        answer: 0,
        insight: { title: t('ii 的 ii–V', 'ii の ii–V', 'The ii’s own ii–V'), text: t('ii 是 Dm，它的属是 A7（V7/ii），A7 的 ii 是 Em7（ii/ii）：C – Em7 – A7 – Dm7 – G7 – C。', 'ii は Dm、その属は A7（V7/ii）、A7 の ii は Em7（ii/ii）：C – Em7 – A7 – Dm7 – G7 – C。', 'ii is Dm; its dominant is A7 (V7/ii); A7’s ii is Em7 (ii/ii): C – Em7 – A7 – Dm7 – G7 – C.') },
      },
      {
        id: 'b44x-e7', type: 'page', ref: ['wiki-turnaround', 'wiki-ragtime-progression'],
        title: t('进阶 4 · 副属链与三全音替代', '発展 4・副属の連鎖と三全音代理', 'Advanced 4 · Chains of secondary dominants and tritone subs'),
        text: [
          t('ragtime 进行（C 调 E7–A7–D7–G7–C）是沿五度圈的一串副属和弦，因为在 ragtime 里流行而得名，其实古老得多；它也是 parlour music 的典型，起源于古典音乐，后来传入美国民间音乐，是"一点点累积"长出来的：先是属和弦有了自己的属，这个属又有了属……它常出现在爵士标准曲的桥段里。III7–VI7–II7–V7 会回到 C 大调，但它本身的调是不确定的。', 'ラグタイム進行（C で E7–A7–D7–G7–C）は五度圏に沿った副属の連鎖で、ラグタイムで流行したことから名付けられたが、実はずっと古い。パーラー・ミュージックの典型でもあり、クラシックに起源を持ち、のちにアメリカの民俗音楽へ広がった。「少しずつ積み重なって」できた：まず属和音が自分の属を得て、その属がまた属を得て……ジャズ・スタンダードのブリッジによく現れる。III7–VI7–II7–V7 はハ長調へ戻るが、それ自体の調は定まらない。', 'The ragtime progression (in C, E7–A7–D7–G7–C) is a chain of secondary dominants around the circle of fifths, named for its popularity in ragtime though much older; typical of parlour music, it originated in classical music and spread to American folk music, growing “by gradual accretion”: the dominant acquired its own dominant, which acquired another… It often appears in the bridge of jazz standards. III7–VI7–II7–V7 leads back to C major but is itself indefinite in key.'),
          t('I–vi–ii–V 还能这样变：vi、ii 换成属七得到 C–A7–D7–G；把三全音替代用在 vi 和 V 上得到 C–E♭7–D7–D♭7，用在 I 以外的每个和弦上得到 C–E♭7–A♭M7–D♭7。ii–♭II–I（Dm–D♭–C）处处是半音线：根音 D–D♭–C、三音 F–F–E（F 常当持续音）、五音 A–A♭–G。♭II7 和 V7 含有同一个三全音（等音），所以作用相同；根音半音下行形成熟悉的 line cliché。副属把属和弦往五度圈里延伸，替代属则用小二度取代了五度循环。', 'I–vi–ii–V はさらに変えられる：vi と ii を属七にして C–A7–D7–G。三全音代理を vi と V に使えば C–E♭7–D7–D♭7、I 以外すべてに使えば C–E♭7–A♭M7–D♭7。ii–♭II–I（Dm–D♭–C）は半音の線だらけ：根音 D–D♭–C、3 度 F–F–E（F はよく保続音に）、5 度 A–A♭–G。♭II7 と V7 は異名同音で同じ三全音を含むので同じ働き。根音の半音下行がおなじみのライン・クリシェになる。副属は属を五度圏の中で延ばし、代理属は 5 度の循環を短 2 度に置き換える。', 'I–vi–ii–V can be transformed further: dominant vi and ii give C–A7–D7–G; tritone-substituting vi and V gives C–E♭7–D7–D♭7, and every chord but I gives C–E♭7–A♭M7–D♭7. ii–♭II–I (Dm–D♭–C) is chromatic throughout: roots D–D♭–C, thirds F–F–E (F often a pedal), fifths A–A♭–G. ♭II7 and V7 share the same tritone enharmonically, so they work alike; the half-step root descent forms the familiar line cliché. Secondary dominants stay inside the circle of fifths; substitute dominants replace that cycle with minor seconds.'),
        ],
      },
      {
        id: 'b44x-e8', type: 'discover', practice: true, ref: 'wiki-turnaround',
        prompt: t('把三全音替代用在 C–Am–Dm–G 的 vi 和 V 上（先把它们变成属七），结果是？', 'C–Am–Dm–G の vi と V に三全音代理を使う（まず属七にする）と？', 'Apply the tritone sub to vi and V of C–Am–Dm–G (making them dominants first). The result is…'),
        options: ['C – E♭7 – D7 – D♭7', 'C – A7 – D7 – G7', 'C – E♭7 – A♭M7 – D♭7'],
        answer: 0,
        insight: { title: t('A7 → E♭7，G7 → D♭7', 'A7 → E♭7、G7 → D♭7', 'A7 → E♭7, G7 → D♭7'), text: t('A 和 E♭、G 和 D♭ 都相距三全音；ii 也换成属七 D7，就是维基给的 C–E♭7–D7–D♭7。', 'A と E♭、G と D♭ はどちらも三全音離れ。ii も属七 D7 にするとウィキペディアの C–E♭7–D7–D♭7。', 'A and E♭, G and D♭ are tritones apart; with ii as D7 too, it is Wikipedia’s C–E♭7–D7–D♭7.') },
      },
    ],
    experiment: [
      { id: 'b44x-x1', type: 'experiment', toy: 'guide', ref: 'omt2e-jazz-voicings',
        prompt: t('先只开低音和三音 / 七音，比较 ii–V–I（五度）和 V–IV–I（二度）里两条线怎么走；再打开九音 / 十三音那条线，看它是不是也在两个音之间来回。', 'まず低音と 3 度・7 度だけを出し、ii–V–I（5 度）と V–IV–I（2 度）で 2 本の線の動きを比べよう。次に 9 度・13 度の線を出し、それも 2 音を行き来するか見よう。', 'First show only bass and thirds/sevenths, comparing how the lines move in ii–V–I (fifths) and V–IV–I (seconds); then add the ninth/thirteenth line and see whether it too alternates between two notes.'),
        params: { layers: ['bass', 'guide', 'top'] },
        breakthrough: { id: 'b44x-lazy', text: t('三条线，几乎不动，就把一整段进行串了起来。', '3 本の線がほとんど動かずに進行全体をつないだ。', 'Three lines, barely moving, strung the whole progression together.') } },
    ],
    challenge: [
      {
        id: 'b44x-c1', type: 'choice', error: 'voicing-register', skills: ['apply'], ref: 'omt2e-jazz-voicings',
        variants: [
          { prompt: t('为什么低音区的音不宜靠得太近？', 'なぜ低音域で音を詰めないほうがよい？', 'Why avoid close spacing in a low register?'), options: [t('会发浑、听起来不协和', '濁って不協和に聞こえる', 'It sounds muddy and dissonant'), t('低音乐器弹不到', '低音楽器が届かない', 'Bass instruments can’t reach'), t('会变成小调', '短調になる', 'It turns minor')] },
          { prompt: t('配置七和弦时最常省略的是？', '七の和音を配置するとき最もよく省くのは？', 'The note most often omitted when voicing a seventh chord is…'), options: [t('五音', '5 度', 'the fifth'), t('七音', '7 度', 'the seventh'), t('三音', '3 度', 'the third')] },
          { prompt: t('重复音时最安全的是重复？', '重複で最も安全なのは？', 'The safest note to double is…'), options: [t('低音', '低音', 'the bass'), t('七音', '7 度', 'the seventh'), t('延伸音', '拡張音', 'an extension')] },
        ],
        answer: 0,
        explain: t('低音区太密会发浑；最常省五音；重复低音（或根音）最安全。', '低音域で詰めると濁る。いちばんよく省くのは 5 度。低音（または根音）の重複が最も安全。', 'Low close spacing sounds muddy; the fifth is omitted most; doubling the bass (or root) is safest.'),
      },
      {
        id: 'b44x-c2', type: 'choice', error: 'rough-voice-leading', skills: ['voiceLeading'], ref: 'omt2e-jazz-voicings',
        variants: [
          { prompt: t('根音相距二度时，3–7 两条线的右手只会出现哪两种音程？', '根音が 2 度関係のとき、3–7 の右手に出る 2 種の音程は？', 'With roots a second apart, which two intervals appear in the 3–7 right hand?'), options: [t('四度和五度', '4 度と 5 度', 'Fourths and fifths'), t('三度和六度', '3 度と 6 度', 'Thirds and sixths'), t('二度和七度', '2 度と 7 度', 'Seconds and sevenths')] },
          { prompt: t('加第三个上方声部时，OMT 建议加什么？', '3 つ目の上声を加えるとき OMT が勧めるのは？', 'Adding a third upper voice, OMT suggests…'), options: [t('在九音和十三音之间来回的线', '9 度と 13 度を行き来する線', 'a line alternating ninths and thirteenths'), t('把五音加回来', '5 度を戻す', 'adding the fifth back'), t('重复三音', '3 度を重複', 'doubling the third')] },
          { prompt: t('延伸音该先试哪个版本？', '拡張音はまずどの版を試す？', 'Which version of an extension should you try first?'), options: [t('调内的那个（不加临时记号）', '調内の版（臨時記号なし）', 'The diatonic one (no accidentals)'), t('一律升高', 'いつも上げる', 'Always raised'), t('一律降低', 'いつも下げる', 'Always lowered')] },
        ],
        answer: 0,
        explain: t('二度关系的 3–7 线只有四度、五度；第三条线走九音与十三音；延伸音先试调内的版本。', '2 度関係の 3–7 は 4 度と 5 度だけ。3 本目は 9 度と 13 度。拡張音はまず調内の版。', '3–7 lines over seconds give only fourths and fifths; the third line uses ninths and thirteenths; try diatonic extensions first.'),
      },
      {
        id: 'b44x-c3', type: 'choice', error: 'key-center', skills: ['function'], ref: ['wiki-turnaround', 'wiki-ragtime-progression'],
        variants: [
          { prompt: t('Tadd Dameron turnaround 在 C 调是？', 'C のタッド・ダメロンのターンアラウンドは？', 'The Tadd Dameron turnaround in C is…'), options: ['C – E♭ – A♭ – D♭7', 'C – Am – Dm – G7', 'C – A7 – D7 – G7'] },
          { prompt: t('turnaround 除了结束在 V7，还可以结束在？', 'ターンアラウンドは V7 のほか何で終われる？', 'Besides V7, a turnaround may end on…'), options: [t('♭II7（属的替代）', '♭II7（属の代理）', '♭II7 (a dominant substitute)'), t('IV', 'IV', 'IV'), t('vii°', 'vii°', 'vii°')] },
          { prompt: t('III7–VI7–II7–V7 本身在什么调？', 'III7–VI7–II7–V7 それ自体の調は？', 'What key is III7–VI7–II7–V7 itself in?'), options: [t('不确定（但会回到 C）', '定まらない（でも C へ戻る）', 'Indefinite (though it leads back to C)'), t('E 大调', 'ホ長調', 'E major'), t('A 小调', 'イ短調', 'A minor')] },
        ],
        answer: 0,
        explain: t('Dameron：I–♭III–♭VI–♭II7；turnaround 可以结束在 ♭II7；ragtime 进行本身调不确定。', 'ダメロン：I–♭III–♭VI–♭II7。♭II7 で終わってもよい。ラグタイム進行自体の調は定まらない。', 'Dameron: I–♭III–♭VI–♭II7; a turnaround may end on ♭II7; the ragtime chain itself is indefinite in key.'),
      },
      {
        id: 'b44x-c4', type: 'choice', error: 'substitution', skills: ['function'], ref: 'wiki-turnaround',
        variants: [
          { prompt: t('ii–♭II–I（Dm–D♭–C）里，三音的线是？', 'ii–♭II–I（Dm–D♭–C）で 3 度の線は？', 'In ii–♭II–I (Dm–D♭–C), the third line is…'), options: ['F – F – E', 'F – E – E', 'A – A♭ – G'] },
          { prompt: t('为什么 ♭II7 能代替 V7？', 'なぜ ♭II7 は V7 の代わりになる？', 'Why can ♭II7 replace V7?'), options: [t('两者含有同一个三全音（等音）', '異名同音で同じ三全音を含む', 'They share the same tritone (enharmonically)'), t('根音相同', '根音が同じ', 'They share a root'), t('都是小七', 'どちらも短七', 'Both are minor sevenths')] },
          { prompt: t('副属和替代属的区别是？', '副属と代理属の違いは？', 'How do secondary and substitute dominants differ?'), options: [t('副属留在五度圈里，替代属用小二度取代五度循环', '副属は五度圏の中、代理属は 5 度の循環を短 2 度に置き換える', 'Secondaries stay in the circle of fifths; substitutes replace it with minor seconds'), t('没有区别', '違いはない', 'No difference'), t('副属只用在小调', '副属は短調だけ', 'Secondaries only occur in minor')] },
        ],
        answer: 0,
        explain: t('三音 F–F–E；♭II7 与 V7 共用三全音；副属沿五度圈，替代属走小二度。', '3 度は F–F–E。♭II7 と V7 は三全音を共有。副属は五度圏、代理属は短 2 度。', 'Thirds F–F–E; ♭II7 and V7 share a tritone; secondaries follow fifths, substitutes minor seconds.'),
      },
      G('b44x-g1', 'guideTones', 1, ['spell']),
      G('b44x-g2', 'keyCenter', 1, ['function']),
    ],
  },
  pool: [G('b44x-p1', 'guideTones', 2, ['spell']), G('b44x-p2', 'keyCenter', 2, ['function'])],
};

// ===================== B4-5x 爵士配置 · 扩展关 =====================
// 对应 A 面：jazzvoicing（壳音 / drop 2 / So What 与四度和弦 / 高结构三和弦）
const EXT_B4_5 = {
  minutes: 20,
  insight: t('配置就是"同样的音，怎么摆"：drop 2 从上往下数、So What 用四度叠、高结构把一个三和弦放在三全音上——摆法不同，同一个和弦的颜色就不同。', '配置とは「同じ音をどう並べるか」：ドロップ 2 は上から数え、ソー・ホワットは 4 度で積み、アッパー・ストラクチャーは三全音の上に三和音を置く——並べ方で同じ和音の色が変わる。', 'Voicing is how you arrange the same notes: drop 2 counts from the top, So What stacks fourths, upper structures set a triad over a tritone — arrange differently and one chord takes on different colours.'),
  sections: {
    discover: [
      {
        id: 'b45x-d1', type: 'discover', ref: 'wiki-upper-structure',
        prompt: t('左手都是 C7 的三音和七音 E、B♭。A：右手弹 E♭ 大三和弦（E♭ G B♭）；B：右手弹 D 大三和弦（D F♯ A）。两种各得到什么和弦？', '左手はどちらも C7 の 3 度と 7 度 E・B♭。A：右手で E♭ の長三和音（E♭ G B♭）、B：右手で D の長三和音（D F♯ A）。それぞれ何の和音になる？', 'The left hand plays C7’s third and seventh, E and B♭. A: right hand E♭ major (E♭ G B♭); B: right hand D major (D F♯ A). What chord results each time?'),
        play: [{ label: 'A', audio: { chords: [[52, 58, 63, 67, 70]], gap: 1600 } }, { label: 'B', audio: { chords: [[52, 58, 62, 66, 69]], gap: 1600 } }],
        options: [t('A 是 C7♯9，B 是 C13♯11', 'A は C7♯9、B は C13♯11', 'A is C7♯9, B is C13♯11'), t('A 是 E♭ 大三和弦，B 是 D 大三和弦', 'A は E♭ の長三和音、B は D の長三和音', 'A is E♭ major, B is D major'), t('两个都是 Cmaj7', 'どちらも Cmaj7', 'Both are Cmaj7')],
        answer: 0,
        insight: {
          title: t('三全音定性质，三和弦管颜色', '三全音が性質を、三和音が色を決める', 'The tritone fixes the quality, the triad adds colour'),
          text: t('E–B♭ 这个三全音是 C7 的三音和小七音，定下了属七的声音；上方的三和弦就是"高结构"。对根音 C 来说，E♭ 是 ♯9、G 是五音、B♭ 是七音：C7♯9；D、F♯、A 是 9、♯11、13：C13♯11。根音 C 常常省略——为了好弹，或者因为有低音手。', 'E–B♭ の三全音は C7 の 3 度と短 7 度で、属七の響きを決める。上の三和音が「アッパー・ストラクチャー」。根音 C から見ると E♭ は ♯9、G は 5 度、B♭ は 7 度：C7♯9。D・F♯・A は 9・♯11・13：C13♯11。根音 C はよく省かれる——弾きやすさのため、またはベーシストがいるため。', 'The tritone E–B♭ is C7’s third and minor seventh, defining the dominant sound; the triad above is the “upper structure”. Relative to C, E♭ is ♯9, G the fifth, B♭ the seventh: C7♯9; D, F♯, A are 9, ♯11, 13: C13♯11. The root C is often omitted — for ease of playing, or because a bassist is present.'),
        },
      },
    ],
    explain: [
      {
        id: 'b45x-e1', type: 'page', ref: 'wiki-voicing',
        title: t('进阶 1 · drop-n：从上往下数', '発展 1・ドロップ n：上から数える', 'Advanced 1 · Drop-n: counting from the top'),
        text: [
          t('最紧凑的排列叫密集排列，间距更宽的叫开放排列。"drop-n"命名法从上往下看配置（大概来自铜管组编曲：旋律是给定的）：默认的、没降过的配置所有声部都在同一个八度里，从最高音往下编号——最高的是第 1 声部，第二高的是第 2 声部……drop 2 就是把第 2 声部降一个八度。例如 C 大三和弦有三个 drop 2 配置，从最高音往下读是 C E G、G C E、E G C——《超级马力欧兄弟》主题开头引子之后的前三个旋律音下面，就是这三个配置。', '最も詰まった配置を密集配分、間隔の広いものを開離配分という。「ドロップ n」の呼び方は配置を上から見る（おそらくホーン・セクションの編曲から：旋律が与えられている）。基準となる、何も下げていない配置ではすべての声部が同じオクターヴにあり、最高音から下へ番号を付ける——いちばん高いのが第 1 声部、次が第 2 声部……ドロップ 2 は第 2 声部を 1 オクターヴ下げること。たとえばハ長三和音のドロップ 2 は 3 つあり、最高音から下へ読むと C E G、G C E、E G C——《スーパーマリオブラザーズ》のテーマで導入句の後の最初の 3 つの旋律音を支える配置がこれ。', 'The most compact voicing is close position; wider spacings are open position. The “drop-n” nomenclature views voicings from the top down (probably from horn-section arranging, where the melody is given): the default, undropped voicing has every voice in one octave, numbered from the top — the highest is voice 1, the next voice 2… Drop 2 lowers voice 2 by an octave. A C-major triad has three drop-2 voicings, reading down from the top: C E G, G C E, E G C — heard under the first three melody notes (after the intro) of the Super Mario Bros. theme.'),
          t('还有 drop 4、drop 2 和 4、drop 3 等组合：G7 的四个 drop 2 和 4 配置，从最高音往下读是 G D F B、B F G D、D G B F、F B D G。这套命名不处理把声部降两个八度以上、或同一个音出现在几个八度的情况。吉他手很爱用 drop 配置：弦与弦之间多是纯四度，大多数密集排列在吉他上很别扭；drop 配置的指法可以在指板上横着、竖着平移，不用变调夹就能在任何调、任何音区弹，转调和半音进行都方便。', 'ドロップ 4、ドロップ 2 & 4、ドロップ 3 などの組み合わせもある：G7 のドロップ 2 & 4 は 4 つあり、最高音から下へ G D F B、B F G D、D G B F、F B D G。この呼び方は 2 オクターヴ以上下げる場合や同じ音を複数のオクターヴに置く場合は扱わない。ギタリストはドロップ配置をよく使う：弦の間がほぼ完全 4 度なので密集配分はたいてい弾きにくい。ドロップ配置の運指は指板の上を横にも縦にも平行移動でき、カポなしでどの調・どの音域でも弾け、転調や半音進行もしやすい。', 'There are also drop 4, drop 2-and-4, drop 3 and so on: G7’s four drop-2-and-4 voicings, read from the top, are G D F B, B F G D, D G B F, F B D G. The system doesn’t cover dropping a voice two or more octaves, or one pitch in several octaves. Guitarists favour drop voicings: the strings are mostly a fourth apart, making most close voicings cumbersome, while drop fingerings shift easily across and along the neck, playable in any key and register without a capo — handy for modulation and chromatic motion.'),
        ],
      },
      {
        id: 'b45x-e2', type: 'discover', practice: true, ref: 'wiki-voicing',
        prompt: t('Cmaj7 密集排列由低到高是 C4 E4 G4 B4。它的 drop 2 配置（由低到高）是？', 'Cmaj7 の密集配分は下から C4 E4 G4 B4。そのドロップ 2（下から）は？', 'Cmaj7 in close position, bottom up, is C4 E4 G4 B4. Its drop-2 voicing, bottom up, is…'),
        options: ['G3 C4 E4 B4', 'C4 E4 G4 B3', 'E3 C4 G4 B4', 'C4 G4 B4 E5'],
        answer: 0,
        insight: { title: t('从最高音往下数第二个', '最高音から下へ 2 番目', 'Second from the top'), text: t('第 1 声部是 B4，第 2 声部是 G4；把 G4 降一个八度到最低：G3 C4 E4 B4。', '第 1 声部は B4、第 2 声部は G4。G4 を 1 オクターヴ下げていちばん下へ：G3 C4 E4 B4。', 'Voice 1 is B4, voice 2 is G4; drop G4 an octave to the bottom: G3 C4 E4 B4.') },
      },
      {
        id: 'b45x-e3', type: 'page', ref: 'wiki-so-what',
        title: t('进阶 2 · So What 和弦：四个四度里藏着很多和弦', '発展 2・ソー・ホワット・コード：4 度の中に多くの和音', 'Advanced 2 · The So What chord: many chords in a stack of fourths'),
        text: [
          t('So What 和弦是一种特定的五音配置：从下往上三个纯四度，再加一个大三度。Bill Evans 在 Miles Davis《So What》主题的"阿门"应答音型里用了它。E 上的 So What 和弦 E A D G B 是一个 Em11 配置——它和吉他最低五根弦的标准调弦完全一样，本质上就是按吉他的排法摆出的小十一和弦（1、4、♭7、♭3、5）。也可以把它看成五个音的四度和弦，把最上面一个音降半音。', 'ソー・ホワット・コードは特定の 5 音の配置：下から完全 4 度を 3 つ、その上に長 3 度。ビル・エヴァンスがマイルス・デイヴィス《So What》のテーマの「アーメン」応答音型で使った。E の上のソー・ホワット E A D G B は Em11 の配置——ギターの低い 5 本の標準調弦とまったく同じで、本質的にはギター式に並べた短十一の和音（1・4・♭7・♭3・5）。5 音の 4 度和音の最上音を半音下げたものとも見なせる。', 'The So What chord is a specific five-note voicing: three perfect fourths from the bottom, then a major third. Bill Evans used it in the “amen” response figure to the head of Miles Davis’s “So What”. On E, E A D G B is an Em11 voicing — identical to the standard tuning of a guitar’s five lowest strings, essentially a minor eleventh chord arranged as on a guitar (1, 4, ♭7, ♭3, 5). It can also be seen as a five-note quartal chord with the top note lowered a semitone.'),
          t('它常被用来代替四度配置，可以做调内或半音的平行移动。四度和声的结构通常很模糊，所以同一组音可以配很多根音：不换琴键，E A D G B 也能当 C6Δ9、Asus4 7(9)、G6/9、F Lydian 或 F♯ Phrygian 用。McCoy Tyner 的《Peresina》、Gary Burton 的《Gentle Wind and Falling Tear》大量使用它；Tyner 的这类配置影响了 Chick Corea（《Now He Sings, Now He Sobs》里的《Steps》《Matrix》）。"So What chord"这个名字在 Mark Levine 的《The Jazz Piano Book》里被大量使用；Frank Mantooth 则把它叫作"Miracle voicing"。', 'よく 4 度配置の代わりに使われ、調内や半音での平行移動（プレーニング）にも使える。4 度和声の構造はふつう曖昧なので、同じ音に多くの根音を当てられる：鍵盤を変えずに E A D G B を C6Δ9、Asus4 7(9)、G6/9、F リディア、F♯ フリギアとしても使える。マッコイ・タイナー《Peresina》、ゲイリー・バートン《Gentle Wind and Falling Tear》が多用し、タイナーのこうした配置はチック・コリア（《Now He Sings, Now He Sobs》の《Steps》《Matrix》）に影響した。「So What chord」という名前はマーク・レヴィン『The Jazz Piano Book』で多用され、フランク・マントゥースは「Miracle voicing」と呼んだ。', 'It is often used instead of quartal voicings and in diatonic or chromatic planing. Since quartal structures are vague, many roots fit: without changing keys, E A D G B can serve as C6Δ9, Asus4 7(9), G6/9, F Lydian or F♯ Phrygian. McCoy Tyner’s “Peresina” and Gary Burton’s “Gentle Wind and Falling Tear” use it extensively; Tyner’s voicings influenced Chick Corea (“Steps” and “Matrix” on Now He Sings, Now He Sobs). The name “So What chord” is used throughout Mark Levine’s The Jazz Piano Book; Frank Mantooth called it the “Miracle voicing”.'),
        ],
      },
      {
        id: 'b45x-e4', type: 'discover', practice: true, ref: 'wiki-so-what',
        prompt: t('E 上的 So What 和弦 E A D G B，和什么完全一样？', 'E の上のソー・ホワット E A D G B とまったく同じなのは？', 'The So What chord on E, E A D G B, is identical to…'),
        options: [t('吉他最低五根弦的标准调弦', 'ギターの低い 5 本の標準調弦', 'the standard tuning of a guitar’s five lowest strings'), t('E 小调五声音阶从 E 往上', 'E から上のホ短調五音音階', 'the E minor pentatonic upward from E'), t('E7 的密集排列', 'E7 の密集配分', 'E7 in close position')],
        answer: 0,
        insight: { title: t('四个空弦的四度', '4 本の開放弦の 4 度', 'Fourths of the open strings'), text: t('E–A–D–G 三个纯四度，G–B 大三度：正是吉他第 6 到第 2 弦。', 'E–A–D–G の完全 4 度 3 つと G–B の長 3 度：ギターの 6 弦から 2 弦そのもの。', 'E–A–D–G three fourths, G–B a major third: exactly guitar strings 6 to 2.') },
      },
      {
        id: 'b45x-e5', type: 'page', ref: 'wiki-upper-structure',
        title: t('进阶 3 · 高结构三和弦的简写与目录', '発展 3・アッパー・ストラクチャーの略記と一覧', 'Advanced 3 · Upper-structure shorthand and catalogue'),
        text: [
          t('高结构是爵士钢琴手和编曲者发展出的配置方法：在一个更复杂的和声最上面放一个大三或小三和弦。行话按"下方和弦根音到上方三和弦根音的音程"来称呼：C7 上的 E♭ 大三和弦离 C 是（复）小三度，所以叫 US♭III。维基列出的其他高结构（都在 C7 上）：USII（D 大三，C13♯11）、US♭V（G♭ 大三，C7♭9♯11）、US♭VI（A♭ 大三，C7♯9♭13）、USVI（A 大三，C13♭9）、USi（C 小三，C7♯9）、US♭ii（D♭ 小三，C7♭9♭13）、US♭iii（E♭ 小三，C7♯9♯11）；US♭V 还有一个相关版本 US♯iv（F♯ 小三，C13♭9♯11）。', 'アッパー・ストラクチャーはジャズ・ピアニストや編曲者が発展させた配置法：より複雑な和声のいちばん上に長三和音か短三和音を置く。業界では「下の和音の根音から上の三和音の根音までの音程」で呼ぶ：C7 の上の E♭ の長三和音は C から（複）短 3 度なので US♭III。ウィキペディアの一覧（すべて C7 の上）：USII（D 長三、C13♯11）、US♭V（G♭ 長三、C7♭9♯11）、US♭VI（A♭ 長三、C7♯9♭13）、USVI（A 長三、C13♭9）、USi（C 短三、C7♯9）、US♭ii（D♭ 短三、C7♭9♭13）、US♭iii（E♭ 短三、C7♯9♯11）。US♭V には関連版 US♯iv（F♯ 短三、C13♭9♯11）もある。', 'Upper structures, developed by jazz pianists and arrangers, sound a major or minor triad in the uppermost pitches of a more complex harmony. Jazz parlance names them by the interval from the bottom chord’s root to the triad’s root: E♭ major over C7 lies a (compound) minor third above C, so it is US♭III. Wikipedia’s others, all over C7: USII (D major, C13♯11), US♭V (G♭ major, C7♭9♯11), US♭VI (A♭ major, C7♯9♭13), USVI (A major, C13♭9), USi (C minor, C7♯9), US♭ii (D♭ minor, C7♭9♭13), US♭iii (E♭ minor, C7♯9♯11); US♭V has a related version, US♯iv (F♯ minor, C13♭9♯11).'),
          t('能在和弦上方再放哪些音，要看这个和弦暗示的音阶。例如 C13♭9♯11 的音（C E G B♭ D♭ F♯ A）全都在减音阶 C–D♭–D♯–E–F♯–G–A–B♭ 里，这个音阶就是旋律和和声手法的"音池"。', '和音の上にさらにどの音を置けるかは、その和音が示す音階で決まる。たとえば C13♭9♯11 の音（C E G B♭ D♭ F♯ A）はすべて減音階 C–D♭–D♯–E–F♯–G–A–B♭ に含まれ、この音階が旋律と和声の手法の「プール」になる。', 'Which extra pitches fit depends on the scale the chord implies: the notes of C13♭9♯11 (C E G B♭ D♭ F♯ A) all lie in the diminished scale C–D♭–D♯–E–F♯–G–A–B♭, a pool for melodic and harmonic devices.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: 'US', cells: ['II', '♭III', '♭V', '♭VI', 'VI'] }, { label: 'C7 +', cells: ['D', 'E♭', 'G♭', 'A♭', 'A'] }, { label: '=', cells: ['13♯11', '7♯9', '7♭9♯11', '7♯9♭13', '13♭9'] }] },
      },
      {
        id: 'b45x-e6', type: 'discover', practice: true, ref: 'wiki-upper-structure',
        prompt: t('C7 上方弹 A♭ 大三和弦（US♭VI），得到什么和弦？', 'C7 の上で A♭ の長三和音（US♭VI）を弾くと？', 'An A♭ major triad over C7 (US♭VI) gives…'),
        options: ['C7♯9♭13', 'C13♭9', 'C7♭9♯11'],
        answer: 0,
        insight: { title: t('A♭ C E♭ 对 C', 'C から見た A♭ C E♭', 'A♭ C E♭ against C'), text: t('A♭ = ♭13，C = 根音，E♭ = ♯9：C7♯9♭13。', 'A♭ = ♭13、C = 根音、E♭ = ♯9：C7♯9♭13。', 'A♭ = ♭13, C = root, E♭ = ♯9: C7♯9♭13.') },
      },
      {
        id: 'b45x-e7', type: 'page', ref: 'wiki-voicing',
        title: t('进阶 4 · 管弦乐里的配置与重复', '発展 4・オーケストラの配置と重複', 'Advanced 4 · Voicing and doubling in orchestral music'),
        text: [
          t('配置不只是爵士的事。有些作曲家设计的配置一听就认得出：Charles Ives《The Unanswered Question》开头，弦乐以极轻的音量奏出一个间距很宽的 G 大三和弦，几乎听不见——Ives 说它代表"德鲁伊的寂静"。斯特拉文斯基《诗篇交响曲》的首尾和弦也很有名：开头那个 E 小三和弦被"反常地"排开，小三度在四个八度里重复，根音和五音只出现两次、在最高和最低处；最后的 C 大三和弦，根音在五个八度里重复，五音留给自然泛音，决定性的三音只在最高音区出现一次——效果正好相反：极其清晰、协和。', '配置はジャズだけのものではない。作曲家が考えた配置には聞いてすぐわかるものもある：アイヴズ《The Unanswered Question》の冒頭では、弦が間隔の広い ト長三和音をほとんど聞こえないほど弱く奏でる——アイヴズはそれを「ドルイドの沈黙」と言った。ストラヴィンスキー《詩篇交響曲》の最初と最後の和音も有名：冒頭のホ短三和音は「ひねくれた」配置で、短 3 度が 4 つのオクターヴで重複し、根音と 5 度は最高と最低に 2 回だけ。最後のハ長三和音は根音が 5 つのオクターヴで重複し、5 度は自然倍音に任され、決定的な 3 度は最高音域に 1 回だけ——正反対の、とても澄んだ協和の効果。', 'Voicing is not just a jazz matter. Some composers’ voicings are instantly recognisable: Charles Ives’s The Unanswered Question opens with strings playing a widely spaced G-major chord very softly, at the edge of audibility — for Ives, “The Silence of the Druids”. The first and last chords of Stravinsky’s Symphony of Psalms are famous: the opening E-minor triad is “perversely” spaced, its minor third doubled in four octaves while root and fifth appear only twice, at the extremes; the final C-major chord doubles its root in five octaves, leaves the fifth to the natural overtones and sounds its decisive third just once, at the top — the opposite effect, super-clarity and consonance.'),
          t('重复（doubling）是让几个声部演奏同一个声部，同音或隔八度。苏萨《华盛顿邮报进行曲》开头，旋律在四个八度里重复；莫扎特第 24 号钢琴协奏曲末乐章的开头主题由小提琴演奏，有些乐句先由长笛高八度重复，再由大管低八度重复，最后双簧管和大管一起加入，重复跨越三个八度。', '重複（ダブリング）はいくつかの声部に同じパートを、同じ高さかオクターヴ違いで演奏させること。スーザ《ワシントン・ポスト》冒頭では旋律が 4 つのオクターヴで重複される。モーツァルトのピアノ協奏曲第 24 番終楽章の冒頭主題はヴァイオリンが弾き、いくつかのフレーズはまずフルートが 1 オクターヴ上で、次にファゴットが 1 オクターヴ下で重ね、最後にオーボエとファゴットが一緒に加わって 3 オクターヴにわたる重複になる。', 'Doubling assigns the same part to several voices, at the same pitch or in octaves. The opening of Sousa’s “Washington Post March” doubles the melody in four octaves; the opening theme of the finale of Mozart’s Piano Concerto No. 24 is played by the violins, with phrases doubled first by flute an octave above, then bassoon an octave below, and finally oboe and bassoon together, spanning three octaves.'),
        ],
      },
      {
        id: 'b45x-e8', type: 'discover', practice: true, ref: 'wiki-voicing',
        prompt: t('《诗篇交响曲》最后的 C 大三和弦，三音在哪里、出现几次？', '《詩篇交響曲》最後のハ長三和音で、3 度はどこに何回？', 'In the final C-major chord of the Symphony of Psalms, where is the third, and how often?'),
        options: [t('只在最高音区出现一次', '最高音域に 1 回だけ', 'Once only, in the highest range'), t('在五个八度里重复', '5 つのオクターヴで重複', 'Doubled in five octaves'), t('完全没有', 'まったくない', 'Not at all')],
        answer: 0,
        insight: { title: t('根音五个八度，三音一次', '根音は 5 オクターヴ、3 度は 1 回', 'Root in five octaves, third once'), text: t('根音在五个八度里重复，五音交给自然泛音，三音只在最高处出现一次。', '根音は 5 つのオクターヴで重複、5 度は自然倍音に、3 度は最高音域に 1 回だけ。', 'The root is doubled in five octaves, the fifth left to overtones, the third heard once at the top.') },
      },
    ],
    experiment: [
      { id: 'b45x-x1', type: 'experiment', toy: 'guide', ref: 'omt2e-jazz-voicings',
        prompt: t('先只开低音和三音 / 七音（壳音），再加五音、再加九音 / 十三音：哪一层加进去声音变化最大？最后整体压低一个八度，听低音区"发浑"。', 'まず低音と 3 度・7 度（シェル）だけ、次に 5 度、さらに 9 度・13 度を加えよう：どの層で響きがいちばん変わる？ 最後に全体を 1 オクターヴ下げ、低音域の「濁り」を聞こう。', 'Start with bass plus thirds/sevenths (a shell), then add the fifth, then ninths/thirteenths: which layer changes the sound most? Finally drop everything an octave and hear the low-register mud.'),
        params: { layers: ['bass', 'guide', 'fifth', 'top'], lowOption: true },
        breakthrough: { id: 'b45x-layers', text: t('你听出来了：五音几乎不改变颜色，延伸音才是颜色。', '5 度はほとんど色を変えず、色を決めるのは拡張音だと聞き取れた。', 'You heard it: the fifth barely changes the colour; the extensions are the colour.') } },
    ],
    challenge: [
      {
        id: 'b45x-c1', type: 'choice', error: 'voicing-register', skills: ['apply'], ref: 'wiki-voicing',
        variants: [
          { prompt: t('"drop-n"命名法从哪里开始给声部编号？', '「ドロップ n」の呼び方はどこから声部に番号を付ける？', 'Where does drop-n numbering start?'), options: [t('从最高音往下', '最高音から下へ', 'From the top voice down'), t('从最低音往上', '最低音から上へ', 'From the bass up'), t('从根音开始', '根音から', 'From the root')] },
          { prompt: t('G7 的 drop 2 和 4 配置，从最高音往下读，下面哪个是其中之一？', 'G7 のドロップ 2 & 4（最高音から下へ）の 1 つは？', 'Which is one of G7’s drop-2-and-4 voicings, read from the top?'), options: ['G D F B', 'G F D B', 'B D F G'] },
          { prompt: t('为什么吉他手爱用 drop 配置？', 'なぜギタリストはドロップ配置を好む？', 'Why do guitarists favour drop voicings?'), options: [t('弦间多是纯四度，密集排列很别扭', '弦の間がほぼ完全 4 度で密集配分が弾きにくい', 'The strings are mostly fourths apart, so close voicings are awkward'), t('drop 配置音量最大', 'ドロップ配置がいちばん音量が大きい', 'Drop voicings are loudest'), t('吉他只能弹四个音', 'ギターは 4 音しか弾けない', 'Guitars can only play four notes')] },
        ],
        answer: 0,
        explain: t('drop-n 从最高音往下编号；G7 的 drop 2 和 4 有 G D F B 等四个；吉他弦按四度调，密集排列别扭。', 'ドロップ n は最高音から番号付け。G7 のドロップ 2 & 4 は G D F B など 4 つ。ギターは 4 度調弦で密集配分が弾きにくい。', 'Drop-n numbers from the top; G7’s drop-2-and-4 voicings include G D F B; guitars are tuned in fourths, making close voicings awkward.'),
      },
      {
        id: 'b45x-c2', type: 'choice', error: 'concept', skills: ['identify'], ref: 'wiki-so-what',
        variants: [
          { prompt: t('So What 和弦的结构（自下而上）是？', 'ソー・ホワット・コードの構造（下から）は？', 'The So What chord, bottom up, is…'), options: [t('三个纯四度 + 一个大三度', '完全 4 度 3 つ + 長 3 度', 'three perfect fourths + a major third'), t('四个纯四度', '完全 4 度 4 つ', 'four perfect fourths'), t('两个大三度 + 两个小三度', '長 3 度 2 つ + 短 3 度 2 つ', 'two major and two minor thirds')] },
          { prompt: t('So What 和弦是谁在 Miles Davis《So What》里用的？', '《So What》でソー・ホワット・コードを使ったのは？', 'Who used the So What chord in Miles Davis’s “So What”?'), options: [t('Bill Evans', 'ビル・エヴァンス', 'Bill Evans'), t('McCoy Tyner', 'マッコイ・タイナー', 'McCoy Tyner'), t('Chick Corea', 'チック・コリア', 'Chick Corea')] },
          { prompt: t('Frank Mantooth 把 So What 和弦叫作？', 'フランク・マントゥースはソー・ホワット・コードを何と呼んだ？', 'Frank Mantooth called the So What chord the…'), options: [t('Miracle voicing', 'Miracle voicing', 'Miracle voicing'), t('Psalms chord', 'Psalms chord', 'Psalms chord'), t('Mystic chord', 'Mystic chord', 'Mystic chord')] },
        ],
        answer: 0,
        explain: t('三个纯四度 + 大三度；Bill Evans 在《So What》的"阿门"应答里用它；Mantooth 叫它 Miracle voicing。', '完全 4 度 3 つ + 長 3 度。ビル・エヴァンスが《So What》の「アーメン」応答で使用。マントゥースは Miracle voicing と呼んだ。', 'Three fourths plus a major third; Bill Evans used it in the “amen” response of “So What”; Mantooth called it the Miracle voicing.'),
      },
      {
        id: 'b45x-c3', type: 'choice', error: 'incomplete-chord', skills: ['spell'], ref: 'wiki-upper-structure',
        variants: [
          { prompt: t('C7 上方弹 A 大三和弦（USVI）得到？', 'C7 の上で A の長三和音（USVI）を弾くと？', 'An A major triad over C7 (USVI) gives…'), options: ['C13♭9', 'C13♯11', 'C7♯9♭13'] },
          { prompt: t('C7 上方弹 E♭ 小三和弦（US♭iii）得到？', 'C7 の上で E♭ の短三和音（US♭iii）を弾くと？', 'An E♭ minor triad over C7 (US♭iii) gives…'), options: ['C7♯9♯11', 'C7♯9', 'C7♭9♭13'] },
          { prompt: t('C13♭9♯11 的音都包含在哪种音阶里？', 'C13♭9♯11 の音がすべて含まれる音階は？', 'All the notes of C13♭9♯11 lie in which scale?'), options: [t('减音阶 C–D♭–D♯–E–F♯–G–A–B♭', '減音階 C–D♭–D♯–E–F♯–G–A–B♭', 'the diminished scale C–D♭–D♯–E–F♯–G–A–B♭'), t('C 大调音阶', 'ハ長調の音階', 'the C major scale'), t('C 布鲁斯音阶', 'C のブルース・スケール', 'the C blues scale')] },
        ],
        answer: 0,
        explain: t('A C♯ E 对 C 是 13、♭9、根音之外的 E（三音）：C13♭9；E♭ G♭ B♭ 是 ♯9、♯11、♭7：C7♯9♯11；C13♭9♯11 的音都在 C 的半全减音阶里。', 'A C♯ E は C に対し 13・♭9・3 度：C13♭9。E♭ G♭ B♭ は ♯9・♯11・♭7：C7♯9♯11。C13♭9♯11 の音は C の減音階に全部入る。', 'A C♯ E over C are 13, ♭9 and the third: C13♭9; E♭ G♭ B♭ are ♯9, ♯11, ♭7: C7♯9♯11; C13♭9♯11 fits the C diminished scale.'),
      },
      {
        id: 'b45x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: 'wiki-voicing',
        variants: [
          { prompt: t('Ives《The Unanswered Question》开头的弦乐和弦是？', 'アイヴズ《The Unanswered Question》冒頭の弦の和音は？', 'The opening string chord of Ives’s The Unanswered Question is…'), options: [t('间距很宽、极轻的 G 大三和弦', '間隔の広い、とても弱いト長三和音', 'a widely spaced, very soft G-major chord'), t('密集的 E 小三和弦', '密集したホ短三和音', 'a close E-minor triad'), t('So What 和弦', 'ソー・ホワット・コード', 'a So What chord')] },
          { prompt: t('苏萨《华盛顿邮报进行曲》开头，旋律在几个八度里重复？', 'スーザ《ワシントン・ポスト》冒頭で旋律は何オクターヴで重複？', 'At the opening of Sousa’s “Washington Post March”, the melody is doubled in how many octaves?'), options: ['4', '2', '6'] },
          { prompt: t('《诗篇交响曲》开头的 E 小三和弦里，哪个音在四个八度里重复？', '《詩篇交響曲》冒頭のホ短三和音で 4 オクターヴに重複するのは？', 'In the opening E-minor chord of the Symphony of Psalms, which note is doubled in four octaves?'), options: [t('小三度 G', '短 3 度 G', 'the minor third, G'), t('根音 E', '根音 E', 'the root, E'), t('五音 B', '5 度 B', 'the fifth, B')] },
        ],
        answer: 0,
        explain: t('Ives：宽而轻的 G 大三；苏萨：四个八度；斯特拉文斯基：小三度在四个八度里重复。', 'アイヴズ：広く弱いト長三和音。スーザ：4 オクターヴ。ストラヴィンスキー：短 3 度が 4 オクターヴで重複。', 'Ives: a wide, soft G major; Sousa: four octaves; Stravinsky: the minor third doubled in four octaves.'),
      },
      G('b45x-g1', 'drop2', 1, ['spell']),
      G('b45x-g2', 'guideTones', 1, ['spell']),
    ],
  },
  pool: [G('b45x-p1', 'drop2', 2, ['spell']), G('b45x-p2', 'guideTones', 2, ['spell'])],
};

// ===================== B4-6x 旋律小调与和声小调的调式体系 · 扩展关 =====================
// 对应 A 面：melodicminor（拼写 / Lydian dominant 与 Mixolydian ♭6 / Altered 与 Locrian ♮2 / 综合）+ harmonicminor（拼写 / Lydian ♯2 与 Dorian ♯4 / 和声大调 / 综合）
const MODE_SETS_X = [
  { id: 'dorb2', label: t('Dorian ♭2（旋律小调第 2 调式）', 'ドリアン ♭2（旋律的短音階の第 2 旋法）', 'Dorian ♭2 (melodic minor mode 2)'), steps: [0, 1, 3, 5, 7, 9, 10], mark: 1, markNote: t('Dorian 降二级，又叫 Phrygian ♮6', 'ドリアンの 2 度を下げる。フリギア ♮6 とも', 'Dorian with ♭2, also called Phrygian ♮6'), noKey: true },
  { id: 'lydaug', label: t('Lydian augmented（第 3 调式）', 'リディアン・オーギュメント（第 3 旋法）', 'Lydian augmented (mode 3)'), steps: [0, 2, 4, 6, 8, 9, 11], mark: 4, markNote: t('Lydian 再升五级', 'リディアンの 5 度をさらに上げる', 'Lydian with a raised fifth'), noKey: true },
  { id: 'mixb6', label: t('Mixolydian ♭6（第 5 调式）', 'ミクソリディアン ♭6（第 5 旋法）', 'Mixolydian ♭6 (mode 5)'), steps: [0, 2, 4, 5, 7, 8, 10], mark: 5, markNote: t('又叫 Aeolian dominant', 'エオリアン・ドミナントとも', 'also called Aeolian dominant'), noKey: true },
  { id: 'dorb5', label: t('Dorian ♭5（和声大调第 2 调式）', 'ドリアン ♭5（和声的長音階の第 2 旋法）', 'Dorian ♭5 (harmonic major mode 2)'), steps: [0, 2, 3, 5, 6, 9, 10], mark: 4, markNote: t('Dorian 降五级', 'ドリアンの 5 度を下げる', 'Dorian with a lowered fifth'), noKey: true },
  { id: 'mixb2', label: t('Mixolydian ♭2（和声大调第 5 调式）', 'ミクソリディアン ♭2（和声的長音階の第 5 旋法）', 'Mixolydian ♭2 (harmonic major mode 5)'), steps: [0, 1, 4, 5, 7, 9, 10], mark: 1, markNote: t('属七和弦上的 ♭9', '属七の上の ♭9', 'a ♭9 over a dominant seventh'), noKey: true },
];
const EXT_B4_6 = {
  minutes: 23,
  insight: t('旋律小调、和声小调、和声大调都是"合成音阶"：从大调改一两个音得到，再各自转出七个调式。记住母音阶和起点，二十一个名字就不用死背。', '旋律的短音階・和声的短音階・和声的長音階はどれも「合成音階」：長調の 1〜2 音を変えて得られ、それぞれ 7 つの旋法に回せる。親音階と始まりの音を覚えれば、21 の名前を丸暗記しなくてよい。', 'Melodic minor, harmonic minor and harmonic major are all synthetic scales: change one or two notes of major, then rotate each into seven modes. Remember the parent and the starting note, and the twenty-one names need no rote learning.'),
  sections: {
    discover: [
      {
        id: 'b46x-d1', type: 'discover', ref: 'wiki-jazz-minor',
        prompt: t('G7 要解决到 C，想在 G7 上用一个包含所有常见变化音（♭5、♯5、♭9、♯9）的音阶。可以直接借哪个爵士小调？', 'G7 から C へ解決するとき、G7 の上でよくある変化音（♭5・♯5・♭9・♯9）をすべて含む音階を使いたい。どのジャズ・マイナーを借りればよい？', 'G7 resolves to C, and over G7 you want a scale containing all the common alterations (♭5, ♯5, ♭9, ♯9). Which jazz minor scale can you borrow?'),
        play: [{ label: 'G7', audio: { notes: [[43, 59, 65]], mode: 'chords' } }, { label: t('A♭ 爵士小调', 'A♭ ジャズ・マイナー', 'A♭ jazz minor'), audio: { notes: [56, 58, 59, 61, 63, 65, 67, 68], mode: 'melody' } }],
        options: [t('A♭ 爵士小调（比 G 高半音）', 'A♭ ジャズ・マイナー（G の半音上）', 'A♭ jazz minor (a half step above G)'), t('G 爵士小调', 'G ジャズ・マイナー', 'G jazz minor'), t('C 爵士小调', 'C ジャズ・マイナー', 'C jazz minor')],
        answer: 0,
        insight: {
          title: t('高半音的爵士小调', '半音上のジャズ・マイナー', 'The jazz minor a half step up'),
          text: t('维基引用的说法：要给任何属七和弦找合适的爵士小调，就用主音比和弦根音高半音的那一个。A♭ 爵士小调包含 G7 的根音、三音、七音和四个最常见的变化音，所以 G7 上不必把 ♭5 ♯5 ♭9 ♯9 都写出来。这就是变化音阶：旋律小调的第 7 个调式。', 'ウィキペディアが引く言い方：どの属七にも合うジャズ・マイナーは、主音が和音の根音より半音高いもの。A♭ ジャズ・マイナーは G7 の根音・3 度・7 度と最もよくある 4 つの変化音を含むので、G7 に ♭5 ♯5 ♭9 ♯9 をすべて書かなくてよい。これがオルタード・スケール：旋律的短音階の第 7 旋法。', 'As Wikipedia quotes: to find the right jazz minor scale for any dominant seventh, use the one whose tonic is a half step above the chord root. A♭ jazz minor holds G7’s root, third and seventh plus its four commonest alterations, so G7 needn’t be written G7♭5♯5♭9♯9. This is the altered scale: the seventh mode of melodic minor.'),
        },
      },
    ],
    explain: [
      {
        id: 'b46x-e1', type: 'page', ref: 'wiki-jazz-minor',
        title: t('进阶 1 · 爵士小调从哪里来', '発展 1・ジャズ・マイナーはどこから来たか', 'Advanced 1 · Where jazz minor comes from'),
        text: [
          t('爵士小调就是旋律小调的上行形式（只用上行），又叫 Ionian ♭3：可以看成大调降三音，所以是"合成音阶"；也可以看成 Dorian 把小七度换成大七度。音程顺序 全半全全全全半（WHWWWWH），Forte 编号 7-34。它和和声小调一样，第五级上是属七和弦。它的来源被解释为：爵士从七音开始用延伸音，于是需要"把调内的七音半音升高，造出稳定的主和弦声音"，而不是用和 ii 相关联的小七和弦当主和弦。', 'ジャズ・マイナーは旋律的短音階の上行形（上行だけを使う）で、イオニアン ♭3 ともいう：長調の 3 度を下げたものと見なせるので「合成音階」。ドリアンの短 7 度を長 7 度に替えたものとも見なせる。音程は 全半全全全全半（WHWWWWH）、フォルテ番号 7-34。和声的短音階と同じく第 5 度上が属七。由来は、ジャズが 7 度から拡張音を使うため「調内の 7 度を半音上げて安定した主和音の響きを作る」必要があったからと説明される——ii に結び付く短七を主和音にするのではなく。', 'Jazz minor is the ascending form of melodic minor, used ascending only — also called Ionian ♭3: major with a minor third, hence a synthetic scale; or Dorian with a major seventh. Its steps are W–H–W–W–W–W–H, Forte number 7-34. Like harmonic minor, it has a dominant seventh on V. It is explained as arising from jazz’s use of extensions from the seventh up: the need to “chromatically raise the diatonic 7th to create a stable, tonic sound” rather than use a minor seventh chord, associated with ii, for tonic.'),
          t('它用在小大七和弦上，也能写出调内的进行，例如 I–vi–ii–V：C-Δ7 A-7(♭5) D-7 G7(♭13)。各级七和弦：I 小大七、ii 小七、♭III 增大七、IV 属七、V 属七、vi 半减七、vii 半减七——两个属七、两个半减七。', '短長七の和音の上で使い、調内の進行も書ける。たとえば I–vi–ii–V：C-Δ7 A-7(♭5) D-7 G7(♭13)。各度の七の和音：I 短長七、ii 短七、♭III 増長七、IV 属七、V 属七、vi 半減七、vii 半減七——属七が 2 つ、半減七が 2 つ。', 'It is used over a minor-major seventh chord and supports diatonic progressions such as I–vi–ii–V: C-Δ7 A-7(♭5) D-7 G7(♭13). Its seventh chords: I minor-major seventh, ii minor seventh, ♭III augmented major seventh, IV and V dominant sevenths, vi and vii half-diminished — two dominants, two half-diminished.'),
        ],
      },
      {
        id: 'b46x-e2', type: 'discover', practice: true, ref: 'wiki-jazz-minor',
        prompt: t('C 爵士小调（C D E♭ F G A B）里，哪两级的七和弦是属七？', 'C ジャズ・マイナー（C D E♭ F G A B）で属七になるのはどの 2 度？', 'In C jazz minor (C D E♭ F G A B), which two degrees carry dominant sevenths?'),
        options: [t('IV 和 V（F7、G7）', 'IV と V（F7・G7）', 'IV and V (F7, G7)'), t('只有 V', 'V だけ', 'Only V'), t('I 和 V', 'I と V', 'I and V')],
        answer: 0,
        insight: { title: t('两个属七', '属七が 2 つ', 'Two dominants'), text: t('F A C E♭ 和 G B D F 都是属七；F7 对应的就是第 4 调式 Lydian dominant。', 'F A C E♭ と G B D F はどちらも属七。F7 に対応するのが第 4 旋法リディアン・ドミナント。', 'F A C E♭ and G B D F are both dominant sevenths; F7 corresponds to mode 4, Lydian dominant.') },
      },
      {
        id: 'b46x-e3', type: 'page', ref: 'wiki-jazz-minor',
        title: t('进阶 2 · 七个调式和它们的别名', '発展 2・7 つの旋法とその別名', 'Advanced 2 · Seven modes and their aliases'),
        text: [
          t('和大调一样，爵士小调从每个音开始都是一个调式（以 C 为主音写出）：I 爵士小调 C D E♭ F G A B；II Dorian ♭2（又叫 Phrygian ♮6、Cappadocian、Javanese）C D♭ E♭ F G A B♭；III Lydian augmented（Lydian ♯5）C D E F♯ G♯ A B；IV Acoustic 音阶（Lydian dominant、Lydian ♭7、Mixolydian ♯4、Overtone）C D E F♯ G A B♭；V Aeolian dominant（Aeolian ♮3、Mixolydian ♭6、Descending melodic major、Hindu）C D E F G A♭ B♭；VI 半减（Locrian ♮2、Aeolian ♭5）C D E♭ F G♭ A♭ B♭；VII Altered（Super Locrian、Altered dominant）C D♭ E♭ F♭ G♭ A♭ B♭。', '長調と同じく、ジャズ・マイナーはどの音から始めても旋法になる（C を主音に書く）：I ジャズ・マイナー C D E♭ F G A B。II ドリアン ♭2（フリギア ♮6、カッパドキア、ジャワとも）C D♭ E♭ F G A B♭。III リディアン・オーギュメント（リディアン ♯5）C D E F♯ G♯ A B。IV アコースティック・スケール（リディアン・ドミナント、リディアン ♭7、ミクソリディアン ♯4、オーバートーン）C D E F♯ G A B♭。V エオリアン・ドミナント（エオリアン ♮3、ミクソリディアン ♭6、下行旋律的長音階、ヒンドゥー）C D E F G A♭ B♭。VI ハーフ・ディミニッシュ（ロクリアン ♮2、エオリアン ♭5）C D E♭ F G♭ A♭ B♭。VII オルタード（スーパー・ロクリアン、オルタード・ドミナント）C D♭ E♭ F♭ G♭ A♭ B♭。', 'Like major, jazz minor yields a mode from each note (written on C): I jazz minor C D E♭ F G A B; II Dorian ♭2 (Phrygian ♮6, Cappadocian, Javanese) C D♭ E♭ F G A B♭; III Lydian augmented (Lydian ♯5) C D E F♯ G♯ A B; IV the acoustic scale (Lydian dominant, Lydian ♭7, Mixolydian ♯4, overtone) C D E F♯ G A B♭; V Aeolian dominant (Aeolian ♮3, Mixolydian ♭6, descending melodic major, Hindu) C D E F G A♭ B♭; VI half-diminished (Locrian ♮2, Aeolian ♭5) C D E♭ F G♭ A♭ B♭; VII altered (super-Locrian, altered dominant) C D♭ E♭ F♭ G♭ A♭ B♭.'),
          t('这些名字都是大调调式名字的变体：例如 Phrygian ♮6——第 2 个调式——就是 Phrygian 把六级换成大六度。每个调式都可以看成某个调内调式升高或降低一个音：Dorian ♭2 = Phrygian 升六级，Lydian augmented = Lydian 升五级。', 'これらの名前は長調の旋法名の変形：たとえばフリギア ♮6（第 2 旋法）はフリギアの 6 度を長 6 度にしたもの。どの旋法も、ある調内の旋法の 1 音を上げるか下げるかしたものと見なせる：ドリアン ♭2 = フリギアの 6 度を上げたもの、リディアン・オーギュメント = リディアンの 5 度を上げたもの。', 'The names are variations on the diatonic mode names: Phrygian ♮6 — mode 2 — is Phrygian with a major sixth. Each mode is a diatonic mode with one note raised or lowered: Dorian ♭2 = Phrygian with a raised sixth, Lydian augmented = Lydian with a raised fifth.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: 'II', cells: ['Dorian ♭2', 'Phrygian ♮6'] }, { label: 'IV', cells: ['Lydian dominant', 'Acoustic'] }, { label: 'V', cells: ['Mixolydian ♭6', 'Aeolian dominant'] }, { label: 'VI', cells: ['Locrian ♮2', 'Aeolian ♭5'] }, { label: 'VII', cells: ['Altered', 'Super Locrian'] }] },
      },
      {
        id: 'b46x-e4', type: 'discover', practice: true, ref: 'wiki-jazz-minor',
        prompt: t('"Acoustic 音阶""Overtone 音阶""Mixolydian ♯4"指的是旋律小调的第几个调式？', '「アコースティック」「オーバートーン」「ミクソリディアン ♯4」は旋律的短音階の第何旋法？', '“Acoustic”, “overtone” and “Mixolydian ♯4” name which mode of melodic minor?'),
        options: [t('第 4 个（Lydian dominant）', '第 4（リディアン・ドミナント）', 'The fourth (Lydian dominant)'), t('第 5 个', '第 5', 'The fifth'), t('第 7 个', '第 7', 'The seventh')],
        answer: 0,
        insight: { title: t('一个调式，五个名字', '1 つの旋法に 5 つの名前', 'One mode, five names'), text: t('C D E F♯ G A B♭：Lydian 的 ♯4 + Mixolydian 的 ♭7，所以也叫 Lydian ♭7、Mixolydian ♯4。', 'C D E F♯ G A B♭：リディアンの ♯4 + ミクソリディアンの ♭7。だからリディアン ♭7、ミクソリディアン ♯4 とも。', 'C D E F♯ G A B♭: Lydian’s ♯4 plus Mixolydian’s ♭7, hence also Lydian ♭7 and Mixolydian ♯4.') },
      },
      {
        id: 'b46x-e5', type: 'page', ref: 'wiki-altered-scale',
        title: t('进阶 3 · 变化音阶的四种看法', '発展 3・オルタード・スケールの 4 つの見方', 'Advanced 3 · Four ways to see the altered scale'),
        text: [
          t('变化音阶（altered dominant、super-Locrian）是一个"所有非必要音都被变化"的属音阶：它保留定义属七的三个不可省的音——根音、大三度、小七度——其余全部变化：五音变 ♭5，九音变 ♭9，十一音变 ♭11（等于大三度），十三音变 ♭13（等于 ♯5），小三度可以看成 ♯9。所以它没有大九度、纯十一度、纯五度和大十三度。台阶是 半全半全全全全。和弦记号写成"alt"：C7alt 代替了 C7♯5♭9♯9♯11 这类又长又容易混淆的写法。', 'オルタード・スケール（オルタード・ドミナント、スーパー・ロクリアン）は「必須でない音をすべて変化させた」属の音階：属七を決める 3 つの欠かせない音——根音・長 3 度・短 7 度——を残し、ほかはすべて変化：5 度は ♭5、9 度は ♭9、11 度は ♭11（長 3 度と同じ）、13 度は ♭13（♯5 と同じ）、短 3 度は ♯9 と見なせる。だから長 9 度・完全 11 度・完全 5 度・長 13 度はない。音程は 半全半全全全全。コード記号では「alt」：C7alt が C7♯5♭9♯9♯11 のような長くて紛らわしい書き方の代わりになる。', 'The altered scale (altered dominant, super-Locrian) is a dominant scale with every non-essential tone altered: it keeps the three irreducible tones of a dominant seventh — root, major third, minor seventh — and alters the rest: ♭5, ♭9, ♭11 (= major third), ♭13 (= ♯5), and the minor third read as ♯9. So it lacks a major ninth, perfect eleventh, perfect fifth and major thirteenth. Its steps: H–W–H–W–W–W–W. Chord symbols write “alt”: C7alt replaces long, confusable names like C7♯5♭9♯9♯11.'),
          t('四种看法：一、它很早就是上行旋律小调的第 7 个调式；二、把 Locrian 的四级降低（F → F♭）就是它，所以也叫 Locrian ♭4；三、把大调的主音升高半音（C♯ D E F G A B）；四、把大调除主音以外的音全部降低（C♯ 大调 → C♯ 变化音阶）。它还叫 Pomeroy 音阶（Herb Pomeroy）、Ravel 音阶（拉威尔），以及"减全音音阶"——下半像减音阶、上半像全音音阶。因为它含有属七的必要音，在爵士里可以在属和弦上写旋律，变化音带来额外的紧张。', '4 つの見方：1. 昔から上行旋律的短音階の第 7 旋法。2. ロクリアンの 4 度を下げる（F → F♭）とこれになるので、ロクリアン ♭4 とも。3. 長調の主音を半音上げる（C♯ D E F G A B）。4. 長調の主音以外をすべて下げる（嬰ハ長調 → C♯ オルタード）。ポメロイ・スケール（ハーブ・ポメロイ）、ラヴェル・スケール、「ディミニッシュト・ホールトーン」——下半分が減音階、上半分が全音音階に似る——とも呼ばれる。属七の必須音を含むので、ジャズでは属和音の上で旋律を作れ、変化音が緊張を加える。', 'Four views: it has long existed as mode 7 of ascending melodic minor; it is Locrian with a lowered fourth (F → F♭), hence Locrian ♭4; it is a major scale with its tonic raised a half step (C♯ D E F G A B); and it is a major scale with every note but the tonic lowered (C♯ major → C♯ altered). It is also the Pomeroy scale (after Herb Pomeroy), the Ravel scale, and the “diminished whole-tone” scale — like a diminished scale below and a whole-tone scale above. Holding the essential dominant tones, it suits melodies over dominant chords, its alterations adding tension.'),
        ],
      },
      {
        id: 'b46x-e6', type: 'discover', practice: true, ref: 'wiki-altered-scale',
        prompt: t('把 C Locrian（C D♭ E♭ F G♭ A♭ B♭）的哪个音降低半音，就得到 C 变化音阶？', 'C ロクリアン（C D♭ E♭ F G♭ A♭ B♭）のどの音を半音下げると C オルタードになる？', 'Lower which note of C Locrian (C D♭ E♭ F G♭ A♭ B♭) to get C altered?'),
        options: [t('四级 F → F♭', '4 度 F → F♭', 'The fourth, F → F♭'), t('五级 G♭ → G♭♭', '5 度 G♭ → G♭♭', 'The fifth'), t('二级 D♭ → D♭♭', '2 度 D♭ → D♭♭', 'The second')],
        answer: 0,
        insight: { title: t('F♭ 就是大三度', 'F♭ は長 3 度', 'F♭ is the major third'), text: t('F♭ 与 E 同音：降低四级就让音阶里有了属七需要的大三度。', 'F♭ は E と同じ音：4 度を下げると属七に必要な長 3 度が入る。', 'F♭ sounds as E: lowering the fourth supplies the major third a dominant needs.') },
      },
      {
        id: 'b46x-e7', type: 'page', ref: 'wiki-harmonic-minor',
        title: t('进阶 4 · 和声小调：旋律用法与和弦', '発展 4・和声的短音階：旋律での使い方と和音', 'Advanced 4 · Harmonic minor: melodic use and chords'),
        text: [
          t('和声小调（Aeolian ♮7）是自然小调把七级升高半音，于是六、七级之间出现增二度；也可以把同主音大调的三、六级降低得到。它主要作为和弦的基础发展起来，但有时也用在旋律上：莫扎特、贝多芬（第 14 号弦乐四重奏终乐章）、舒伯特（《死神与少女》四重奏第一乐章）都有例子，而且下行比上行用得多得多。流行音乐里有 Katy B《Easy Please Me》、Bobby Brown《My Prerogative》、Jazmine Sullivan《Bust Your Windows》；它还催生了重金属的子类型"新古典金属"（Chuck Schuldiner、Yngwie Malmsteen、Ritchie Blackmore、Randy Rhoads）。', '和声的短音階（エオリアン ♮7）は自然短音階の 7 度を半音上げたもので、6・7 度の間に増 2 度ができる。同主長調の 3・6 度を下げても得られる。主に和音の基盤として発達したが、旋律にも使われる：モーツァルト、ベートーヴェン（弦楽四重奏曲第 14 番終楽章）、シューベルト（《死と乙女》第 1 楽章）に例があり、上行より下行でずっと多く使われる。ポップスでは Katy B《Easy Please Me》、ボビー・ブラウン《My Prerogative》、ジャズミン・サリヴァン《Bust Your Windows》。ヘヴィメタルの一派「ネオクラシカル・メタル」も生んだ（チャック・シュルディナー、イングヴェイ・マルムスティーン、リッチー・ブラックモア、ランディ・ローズ）。', 'Harmonic minor (Aeolian ♮7) raises natural minor’s seventh a semitone, creating an augmented second between 6 and 7; it can also be made by lowering the third and sixth of the parallel major. It evolved chiefly as a basis for chords but is sometimes melodic — in Mozart, Beethoven (finale of String Quartet No. 14) and Schubert (first movement of Death and the Maiden) — far more often descending than ascending. Pop examples: Katy B’s “Easy Please Me”, Bobby Brown’s “My Prerogative”, Jazmine Sullivan’s “Bust Your Windows”; it also spawned neoclassical metal (Chuck Schuldiner, Yngwie Malmsteen, Ritchie Blackmore, Randy Rhoads).'),
          t('即兴时传统上把它用在 V7 上，"而不是用在 i 上"：A 小调里七级从 G 升到 G♯，五级三和弦变成大三和弦；它不只勾出 E7，还加上新的紧张音 ♯5（C 对 E）和 ♭9（F 对 E）。III 级上的增三和弦不存在于任何"自然"的调式和声里，它在现代半音化的发展中起过作用。增三和弦由大三度生成、减七和弦由小三度生成，所以它们的转位都只是等音的另一个增三或减七和弦。和声小调有七种七和弦，自然小调只有四种。', '即興では伝統的に V7 の上で使い、「i の上では使わない」：イ短調で 7 度を G から G♯ に上げると第 5 度の三和音が長三和音になる。E7 をなぞるだけでなく、新しい緊張音 ♯5（E に対する C）と ♭9（E に対する F）も加わる。III の増三和音はどの「自然な」旋法和声にもなく、近代の半音主義の発展に一役買った。増三和音は長 3 度、減七は短 3 度で生成されるので、その転回形は異名同音の別の増三・減七にすぎない。和声的短音階には 7 種類の七の和音があり、自然短音階は 4 種類だけ。', 'In improvisation it traditionally goes over V7, “not for use over the i chord”: in A minor, raising G to G♯ makes the V triad major, and the scale not only outlines E7 but adds tensions ♯5 (C over E) and ♭9 (F over E). The augmented triad on III exists in no “natural” modal harmony and played a part in the rise of modern chromaticism. Augmented triads are generated by major thirds, diminished sevenths by minor thirds, so their inversions are just other augmented or diminished chords, enharmonically. Harmonic minor has seven types of seventh chord; natural minor only four.'),
        ],
      },
      {
        id: 'b46x-e8', type: 'discover', practice: true, ref: 'wiki-harmonic-minor',
        prompt: t('A 小调里，用和声小调在 E7 上即兴，比起 E7 本身多了哪两个紧张音？', 'イ短調で E7 の上に和声的短音階を使うと、E7 自体に比べてどの 2 つの緊張音が加わる？', 'In A minor, using harmonic minor over E7 adds which two tensions beyond E7 itself?'),
        options: [t('♯5（C）和 ♭9（F）', '♯5（C）と ♭9（F）', '♯5 (C) and ♭9 (F)'), t('9（F♯）和 13（C♯）', '9（F♯）と 13（C♯）', '9 (F♯) and 13 (C♯)'), t('♯11（A♯）和 ♭7（D）', '♯11（A♯）と ♭7（D）', '♯11 (A♯) and ♭7 (D)')],
        answer: 0,
        insight: { title: t('比大调的 V7 更紧张', '長調の V7 より緊張する', 'More tension than major’s V7'), text: t('A 和声小调 A B C D E F G♯：对 E 来说 C 是 ♯5、F 是 ♭9。', 'A 和声的短音階 A B C D E F G♯：E に対し C は ♯5、F は ♭9。', 'A harmonic minor A B C D E F G♯: against E, C is ♯5 and F is ♭9.') },
      },
      {
        id: 'b46x-e9', type: 'page', ref: 'wiki-harmonic-major',
        title: t('进阶 5 · 和声大调：被遗忘的第四个音阶', '発展 5・和声的長音階：忘れられた 4 つ目の音階', 'Advanced 5 · Harmonic major: the forgotten fourth scale'),
        text: [
          t('和声大调就是大调降低六级，也是和声小调升高三级；它的上半段和和声小调相同。Rimsky-Korsakov 认为和声的基础是四个音阶：自然大调、自然小调、和声小调、和声大调。但音乐学家 Richard Taruskin 询问同行，发现大多数人从没听说过它，甚至有一位 Rimsky-Korsakov 的同辈以为是他发明的；帮他整理和声教学法的 Anatoly Lyadov 的方法来自老师 Yuliy Iogansen。德彪西的音乐里常见这个音阶；武满彻在《Coral Island》和献给梅西安的《Rain Tree Sketch II》里用过它，他的概念可能来自 George Russell 把它配置成"Lydian diminished scale"的想法。在印度音乐里，它对应印度斯坦的 Raag Nat Bhairav 和卡纳提克的 Raga Sarasangi。', '和声的長音階は長調の 6 度を下げたもので、和声的短音階の 3 度を上げたものでもある。上半分は和声的短音階と同じ。リムスキー＝コルサコフは和声の基礎を 4 つの音階とした：自然長音階・自然短音階・和声的短音階・和声的長音階。だが音楽学者リチャード・タラスキンが同僚に尋ねると、大半は聞いたこともなく、リムスキー＝コルサコフと同時代の 1 人は彼が発明したと思っていた。彼の和声教育法をまとめたアナトーリ・リャードフの方法は、師ユーリー・ヨガンセンに由来する。ドビュッシーの音楽によく見られ、武満徹は《Coral Island》やメシアンに献呈した《Rain Tree Sketch II》で使った。その考えはジョージ・ラッセルがこれを「リディアン・ディミニッシュト・スケール」として構成した発想から来たのかもしれない。インド音楽ではヒンドゥスターニーのナト・バイラヴ、カルナータカのサラサンギに対応する。', 'Harmonic major is major with a lowered sixth — or harmonic minor with a raised third; its upper tetrachord matches harmonic minor’s. Rimsky-Korsakov held four scales to be the basis of harmony: natural major and minor, harmonic minor and major. Yet Richard Taruskin polled colleagues and found most had never heard of it; one of Rimsky-Korsakov’s peers thought he had invented it (Anatoly Lyadov, who helped shape his harmony pedagogy, drew on his teacher Yuliy Iogansen). It is common in Debussy; Toru Takemitsu used it in Coral Island and Rain Tree Sketch II (dedicated to Messiaen), perhaps via George Russell’s configuration of it as a “Lydian diminished scale”. In Indian music it corresponds to Raag Nat Bhairav (Hindustani) and Raga Sarasangi (Carnatic).'),
          t('这个合成音阶的主要价值在于它带来的声部进行可能性，爵士独奏者常用它的各个调式。降低的六级打开了不受五度圈支配的进行，作曲家可以用它写出更对称的和声；除了小调的下属和弦，六级上的三和弦是增三和弦。它的七个调式：和声大调（Ionian ♭6）、Dorian ♭5、Phrygian ♭4、Lydian ♭3、Mixolydian ♭2、Lydian ♯2 ♯5、Locrian 𝄫7。', 'この合成音階の主な価値は、それが生む声部進行の可能性にあり、ジャズのソリストはその旋法をよく使う。下げた 6 度は五度圏に支配されない進行への入口になり、より対称的な和声も書ける。短調の下属和音のほか、第 6 度の三和音は増三和音。7 つの旋法：和声的長音階（イオニアン ♭6）、ドリアン ♭5、フリギア ♭4、リディアン ♭3、ミクソリディアン ♭2、リディアン ♯2 ♯5、ロクリアン 𝄫7。', 'This synthetic scale’s chief value lies in the voice-leading possibilities it generates, and jazz soloists use its modes. The lowered sixth opens progressions not governed by the circle of fifths and allows more symmetrical harmonies; besides its minor subdominant, the triad on the sixth degree is augmented. Its seven modes: harmonic major (Ionian ♭6), Dorian ♭5, Phrygian ♭4, Lydian ♭3, Mixolydian ♭2, Lydian ♯2 ♯5, Locrian 𝄫7.'),
        ],
      },
      {
        id: 'b46x-e10', type: 'discover', practice: true, ref: 'wiki-harmonic-major',
        prompt: t('C 和声大调（C D E F G A♭ B）第六级上的三和弦是？', 'C 和声的長音階（C D E F G A♭ B）の第 6 度上の三和音は？', 'The triad on the sixth degree of C harmonic major (C D E F G A♭ B) is…'),
        options: [t('增三和弦 A♭ C E', '増三和音 A♭ C E', 'augmented, A♭ C E'), t('大三和弦 A♭ C E♭', '長三和音 A♭ C E♭', 'major, A♭ C E♭'), t('小三和弦 A C E', '短三和音 A C E', 'minor, A C E')],
        answer: 0,
        insight: { title: t('A♭ 到 E 是增五度', 'A♭ から E は増 5 度', 'A♭ to E is augmented'), text: t('音阶里没有 E♭，只有 E：A♭–C–E 两个大三度叠起来，是增三和弦。', '音階に E♭ はなく E だけ：A♭–C–E は長 3 度 2 つで増三和音。', 'The scale has E, not E♭: A♭–C–E stacks two major thirds, an augmented triad.') },
      },
    ],
    experiment: [
      { id: 'b46x-x1', type: 'experiment', toy: 'scale', ref: ['wiki-jazz-minor', 'wiki-harmonic-major'],
        prompt: t('这次听普通关没出现的五个调式：Dorian ♭2、Lydian augmented、Mixolydian ♭6（来自旋律小调），Dorian ♭5、Mixolydian ♭2（来自和声大调）。每个只和某个调内调式差一个音——高亮的就是那个音。', '今回は普通の関に出なかった 5 つの旋法を聴こう：ドリアン ♭2・リディアン・オーギュメント・ミクソリディアン ♭6（旋律的短音階から）、ドリアン ♭5・ミクソリディアン ♭2（和声的長音階から）。どれもある調内旋法と 1 音だけ違う——ハイライトがその音。', 'This time hear five modes the main level skipped: Dorian ♭2, Lydian augmented, Mixolydian ♭6 (from melodic minor), Dorian ♭5 and Mixolydian ♭2 (from harmonic major). Each differs from a diatonic mode by one note — the highlighted one.'),
        params: { sets: MODE_SETS_X },
        breakthrough: { id: 'b46x-onenote', text: t('你听出来了：每个"新"调式都只是一个熟悉的调式改了一个音。', 'どの「新しい」旋法も、なじみの旋法を 1 音変えただけだと聞き取れた。', 'You heard it: every “new” mode is a familiar one with one note changed.') } },
    ],
    challenge: [
      {
        id: 'b46x-c1', type: 'choice', error: 'mode-character', skills: ['identify'], ref: 'wiki-jazz-minor',
        variants: [
          { prompt: t('Mixolydian ♭6 是旋律小调的第几个调式？', 'ミクソリディアン ♭6 は旋律的短音階の第何旋法？', 'Mixolydian ♭6 is which mode of melodic minor?'), options: [t('第 5 个', '第 5', 'The fifth'), t('第 4 个', '第 4', 'The fourth'), t('第 3 个', '第 3', 'The third')] },
          { prompt: t('Locrian ♮2 的另一个名字是？', 'ロクリアン ♮2 の別名は？', 'Another name for Locrian ♮2 is…'), options: [t('Aeolian ♭5', 'エオリアン ♭5', 'Aeolian ♭5'), t('Phrygian ♮6', 'フリギア ♮6', 'Phrygian ♮6'), t('Lydian ♭7', 'リディアン ♭7', 'Lydian ♭7')] },
          { prompt: t('爵士小调第 3 级上的七和弦是？', 'ジャズ・マイナーの第 3 度上の七の和音は？', 'The seventh chord on degree 3 of jazz minor is…'), options: [t('增大七和弦', '増長七', 'augmented major seventh'), t('属七和弦', '属七', 'dominant seventh'), t('半减七和弦', '半減七', 'half-diminished seventh')] },
        ],
        answer: 0,
        explain: t('Mixolydian ♭6 是第 5 调式；Locrian ♮2 = Aeolian ♭5；♭III 是增大七。', 'ミクソリディアン ♭6 は第 5 旋法。ロクリアン ♮2 = エオリアン ♭5。♭III は増長七。', 'Mixolydian ♭6 is mode 5; Locrian ♮2 = Aeolian ♭5; ♭III is an augmented major seventh.'),
      },
      {
        id: 'b46x-c2', type: 'choice', error: 'scale-pattern', skills: ['spell'], ref: 'wiki-altered-scale',
        variants: [
          { prompt: t('变化音阶里没有下面哪个音？', 'オルタード・スケールにない音は？', 'Which tone is absent from the altered scale?'), options: [t('纯五度', '完全 5 度', 'the perfect fifth'), t('大三度', '長 3 度', 'the major third'), t('小七度', '短 7 度', 'the minor seventh')] },
          { prompt: t('变化音阶又叫"减全音音阶"，因为？', 'オルタードが「ディミニッシュト・ホールトーン」と呼ばれるのは？', 'The altered scale is called “diminished whole-tone” because…'), options: [t('下半像减音阶、上半像全音音阶', '下半分が減音階、上半分が全音音階に似る', 'its lower part resembles the diminished scale and its upper part the whole-tone scale'), t('它只有全音', '全音だけだから', 'it has only whole steps'), t('它是减七和弦', '減七の和音だから', 'it is a diminished seventh chord')] },
          { prompt: t('把 C 大调的主音升高半音，得到哪个变化音阶？', 'ハ長調の主音を半音上げるとどのオルタード？', 'Raising the tonic of C major a half step gives which altered scale?'), options: [t('C♯ 变化音阶', 'C♯ オルタード', 'C♯ altered'), t('C 变化音阶', 'C オルタード', 'C altered'), t('B 变化音阶', 'B オルタード', 'B altered')] },
        ],
        answer: 0,
        explain: t('变化音阶保留根音、大三、小七，没有纯五度；下半像减音阶、上半像全音音阶；C♯ D E F G A B 是 C♯ 变化音阶。', 'オルタードは根音・長 3 度・短 7 度を残し、完全 5 度はない。下半分は減音階、上半分は全音音階に似る。C♯ D E F G A B は C♯ オルタード。', 'The altered scale keeps root, major third and minor seventh but no perfect fifth; diminished below, whole-tone above; C♯ D E F G A B is C♯ altered.'),
      },
      {
        id: 'b46x-c3', type: 'choice', error: 'scale-pattern', skills: ['identify'], ref: ['wiki-harmonic-minor', 'wiki-harmonic-major'],
        variants: [
          { prompt: t('和声小调在旋律上更常用于？', '和声的短音階が旋律でより多く使われるのは？', 'Melodically, harmonic minor is used far more often…'), options: [t('下行', '下行', 'descending'), t('上行', '上行', 'ascending'), t('只在低音', 'バスだけ', 'only in the bass')] },
          { prompt: t('和声小调有几种不同的七和弦？', '和声的短音階の七の和音は何種類？', 'How many types of seventh chord does harmonic minor contain?'), options: ['7', '4', '5'] },
          { prompt: t('和声大调在印度斯坦音乐里对应哪个 raag？', '和声的長音階はヒンドゥスターニー音楽のどのラーグに対応？', 'Harmonic major corresponds to which Hindustani raag?'), options: ['Nat Bhairav', 'Bhairavi', 'Yaman'] },
        ],
        answer: 0,
        explain: t('和声小调多用于下行；它有七种七和弦（自然小调四种）；和声大调对应 Nat Bhairav。', '和声的短音階は下行で多い。七の和音は 7 種類（自然短音階は 4 種類）。和声的長音階はナト・バイラヴ。', 'Harmonic minor is mostly used descending; it has seven seventh-chord types (natural minor four); harmonic major corresponds to Nat Bhairav.'),
      },
      {
        id: 'b46x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: ['wiki-harmonic-major', 'wiki-jazz-minor'],
        variants: [
          { prompt: t('谁认为和声大调是和声的四个基础音阶之一？', '和声的長音階を和声の 4 つの基礎音階の 1 つとしたのは？', 'Who counted harmonic major among the four scales at the basis of harmony?'), options: [t('Rimsky-Korsakov', 'リムスキー＝コルサコフ', 'Rimsky-Korsakov'), t('Richard Taruskin', 'リチャード・タラスキン', 'Richard Taruskin'), t('George Russell', 'ジョージ・ラッセル', 'George Russell')] },
          { prompt: t('爵士小调为什么被说成"合成音阶"？', 'ジャズ・マイナーが「合成音階」と言われるのは？', 'Why is jazz minor called a synthetic scale?'), options: [t('它可以由大调降三音得到', '長調の 3 度を下げて得られるから', 'It can be derived from major with a minor third'), t('它是电子合成器发明的', 'シンセサイザーが発明したから', 'It was invented by synthesizers'), t('它有八个音', '8 音あるから', 'It has eight notes')] },
          { prompt: t('武满彻在哪部作品里用了和声大调？', '武満徹が和声的長音階を使った作品は？', 'In which work did Takemitsu use harmonic major?'), options: [t('《Rain Tree Sketch II》', '《Rain Tree Sketch II》', 'Rain Tree Sketch II'), t('《So What》', '《So What》', 'So What'), t('《Giant Steps》', '《Giant Steps》', 'Giant Steps')] },
        ],
        answer: 0,
        explain: t('Rimsky-Korsakov 提出四个基础音阶；爵士小调是大调降三；武满彻的《Rain Tree Sketch II》（献给梅西安）用了和声大调。', 'リムスキー＝コルサコフの 4 つの基礎音階。ジャズ・マイナーは長調の 3 度下げ。武満《Rain Tree Sketch II》（メシアンに献呈）が和声的長音階を使う。', 'Rimsky-Korsakov named the four basic scales; jazz minor is major with a flat third; Takemitsu’s Rain Tree Sketch II (dedicated to Messiaen) uses harmonic major.'),
      },
      G('b46x-g1', 'scaleLibrary', 2, ['spell'], { ids: ['melodic_minor', 'dorian_flat_2', 'lydian_sharp_5', 'lydian_dominant', 'aeolian_dominant', 'aeolian_flat_5', 'altered_dominant', 'harmonic_major'] }),
    ],
  },
  pool: [G('b46x-p1', 'scaleLibrary', 4, ['spell'], { ids: ['melodic_minor', 'lydian_dominant', 'altered_dominant', 'harmonic_minor', 'phrygian_dominant', 'harmonic_major'] })],
};

// ===================== B4-7x 对称音阶与 bebop 音阶 · 扩展关 =====================
// 对应 A 面：symmetric（全音音阶 / 减音阶两种排法 / 有限移位调式 / 综合）+ morescales（那不勒斯 / 双和声 / 四种 bebop / 速查大综合）
const SYM_SETS_X = [
  { id: 'messiaen3', label: t('梅西安第三种调式', 'メシアン第 3 旋法', 'Messiaen mode 3'), steps: [0, 2, 3, 4, 6, 7, 8, 10, 11], degrees: [0, 1, 2, 2, 3, 4, 5, 6, 6], noKey: true },
  { id: 'bebopmaj', label: t('bebop 大调音阶', 'ビバップ・メジャー', 'Bebop major'), steps: [0, 2, 4, 5, 7, 8, 9, 11], degrees: [0, 1, 2, 3, 4, 4, 5, 6], mark: 5, markNote: t('5 和 6 之间加的 ♯5', '5 と 6 の間に加えた ♯5', 'the ♯5 added between 5 and 6'), noKey: true },
  { id: 'bebophm', label: t('bebop 和声小调音阶', 'ビバップ・ハーモニック・マイナー', 'Bebop harmonic minor'), steps: [0, 2, 3, 5, 7, 8, 10, 11], degrees: [0, 1, 2, 3, 4, 5, 6, 6], mark: 6, markNote: t('♭6 和 7 之间加的 ♭7', '♭6 と 7 の間に加えた ♭7', 'the ♭7 added between ♭6 and 7'), noKey: true },
  { id: 'neapmin', label: t('那不勒斯小调音阶', 'ナポリ短音階', 'Neapolitan minor'), steps: [0, 1, 3, 5, 7, 8, 11], mark: 1, markNote: t('和声小调降二级', '和声的短音階の 2 度を下げる', 'harmonic minor with a lowered second'), noKey: true },
  { id: 'dblharm', label: t('双和声音阶', 'ダブル・ハーモニック', 'Double harmonic'), steps: [0, 1, 4, 5, 7, 8, 11], mark: 1, markNote: t('Ionian ♭2 ♭6：两个增二度', 'イオニアン ♭2 ♭6：増 2 度が 2 つ', 'Ionian ♭2 ♭6: two augmented seconds'), noKey: true },
];
const EXT_B4_7 = {
  minutes: 24,
  insight: t('对称音阶移几次就回到原样：全音音阶只有 2 个、减音阶只有 3 个；bebop 音阶则反过来，故意多加一个音，让八个音里的和弦音整齐地落在正拍上。', '対称音階は数回移すと元に戻る：全音音階は 2 つ、減音階は 3 つだけ。ビバップ・スケールは逆に音を 1 つ足して、8 音のうち和音の音がきれいに表拍に来るようにする。', 'Symmetric scales return to themselves after a few transpositions: only two whole-tone and three diminished scales exist; bebop scales go the other way, adding one note so that in eight notes the chord tones land neatly on the beats.'),
  sections: {
    discover: [
      {
        id: 'b47x-d1', type: 'discover', ref: 'wiki-whole-tone',
        prompt: t('分别从 C、C♯、D 开始写全音音阶。三个音阶里一共有几组不同的音？', 'C・C♯・D から全音音階を書く。3 つの音階に、異なる音の組はいくつ？', 'Write whole-tone scales from C, C♯ and D. How many different sets of notes do the three give?'),
        play: [{ label: 'C', audio: { notes: [60, 62, 64, 66, 68, 70, 72], mode: 'melody' } }, { label: 'C♯', audio: { notes: [61, 63, 65, 67, 69, 71, 73], mode: 'melody' } }, { label: 'D', audio: { notes: [62, 64, 66, 68, 70, 72, 74], mode: 'melody' } }],
        options: [t('两组：C 和 D 开头的是同一组音', '2 組：C と D から始めたものは同じ音', 'Two: the C and D scales share one set of notes'), t('三组，各不相同', '3 組、それぞれ違う', 'Three, all different'), t('一组', '1 組', 'One')],
        answer: 0,
        insight: {
          title: t('只移一次就回到原样', '1 回移すだけで元に戻る', 'One transposition and it repeats'),
          text: t('十二平均律里只有两个互补的全音音阶，都是六声音阶；一个全音音阶也可以看成"六平均律"。梅西安把它叫作他的第一种有限移位调式；George Perle 把它叫作音程循环 2（C2），只有 C2₀ 和 C2₁ 两个位置。', '12 平均律には互いに補い合う全音音階が 2 つしかなく、どちらも 6 音音階。1 つの全音音階は「6 平均律」とも見なせる。メシアンはこれを自分の第 1 の移調の限られた旋法と呼び、ジョージ・パールは音程サイクル 2（C2）と呼んだ。位置は C2₀ と C2₁ の 2 つだけ。', 'In 12-tone equal temperament there are only two complementary whole-tone scales, both hexatonic; one can be thought of as “six-tone equal temperament”. Messiaen called it his first mode of limited transposition; George Perle calls it interval cycle 2 (C2), with only two positions, C2₀ and C2₁.'),
        },
      },
    ],
    explain: [
      {
        id: 'b47x-e1', type: 'page', ref: 'wiki-whole-tone',
        title: t('进阶 1 · 全音音阶：模糊、没有导音', '発展 1・全音音階：ぼんやり、導音なし', 'Advanced 1 · Whole-tone: blurred, no leading tone'),
        text: [
          t('全音音阶没有导音，所有音距离相等，"没有一个音突出，音阶产生模糊、不清晰的效果"；它上面搭的三和弦全是增三和弦——六个音可以由两个根音相距大二度的增三和弦弹出。Walter Piston 说，听到的是"音中心"而不是主音，而且只有被重复或延长强调时才出现；自 1930 年代起，全音和声成了"好莱坞风格"的老套。因为太对称，许多作曲家改用"几乎全音"的六声音阶：斯克里亚宾的神秘和弦就是全音音阶把一个音升高半音。', '全音音階には導音がなく、すべての音が等間隔なので「どの音も目立たず、ぼやけた不明瞭な効果を生む」。その上の三和音はすべて増三和音——6 音は根音が長 2 度離れた 2 つの増三和音で弾ける。ウォルター・ピストンは、聞こえるのは主音でなく「音の中心」で、それも反復や長さで強調されたときだけだという。1930 年代以降、全音和声は「ハリウッド・スタイル」の常套句になった。対称すぎるので、多くの作曲家は「ほぼ全音」の 6 音音階を使った：スクリャービンの神秘和音は全音音階の 1 音を半音上げたもの。', 'The whole-tone scale has no leading tone; all its tones are equidistant, so “no single tone stands out, [and] the scale creates a blurred, indistinct effect”; its triads are all augmented — the six notes are just two augmented triads a major second apart. Walter Piston: one hears tone centres rather than tonics, and only when stressed by repetition or duration; since the 1930s whole-tone harmony has been a platitude of the “Hollywood style”. Being so symmetric, it led many composers to “almost whole-tone” hexachords: Scriabin’s mystic chord is a whole-tone scale with one note raised a semitone.'),
          t('古典音乐里的例子：1662 年 Johann Rudolf Ahle 为《Es ist genug》写的旋律，开头四个音就是全音音阶的四个音，巴赫用这首众赞歌结束康塔塔 BWV 60；莫扎特在《音乐玩笑》里也用了它。19 世纪俄国作曲家常用它表现不祥：格林卡《鲁斯兰与柳德米拉》、鲍罗丁《伊戈尔王》序曲的结尾，达尔戈梅日斯基《石客》里骑士长的主题，里姆斯基-科萨科夫的《萨特阔》和《天方夜谭》（开头主题"就是一条下行的全音音阶加上调内装饰"）。德彪西《前奏曲》第一册的第二首《帆》几乎完全在一个全音音阶里。', 'クラシックの例：1662 年にヨハン・ルドルフ・アーレが《Es ist genug》に付けた旋律は冒頭 4 音が全音音階の 4 音で、バッハはこのコラールでカンタータ BWV 60 を締めくくった。モーツァルトも《音楽の冗談》で使った。19 世紀ロシアの作曲家は不吉さを描くのによく使った：グリンカ《ルスランとリュドミラ》、ボロディン《イーゴリ公》序曲の終わり、ダルゴムイシスキー《石の客》の騎士長の主題、リムスキー＝コルサコフ《サトコ》と《シェエラザード》（冒頭主題は「調内の飾りを付けた下行全音音階にすぎない」）。ドビュッシー《前奏曲集》第 1 巻第 2 曲《帆》はほぼ全体が 1 つの全音音階。', 'Classical examples: Johann Rudolf Ahle’s 1662 melody for “Es ist genug” opens with four notes of the whole-tone scale, and Bach ended Cantata BWV 60 with that chorale; Mozart used it in his Musical Joke. 19th-century Russians often used it for the ominous: the endings of the overtures to Glinka’s Ruslan and Lyudmila and Borodin’s Prince Igor, the Commander’s theme in Dargomyzhsky’s The Stone Guest, Rimsky-Korsakov’s Sadko and Scheherazade (whose opening theme is “simply a descending whole-tone scale with diatonic trimmings”). “Voiles”, the second of Debussy’s first book of Préludes, stays almost entirely within one whole-tone scale.'),
        ],
      },
      {
        id: 'b47x-e2', type: 'discover', practice: true, ref: 'wiki-whole-tone',
        prompt: t('斯克里亚宾的神秘和弦和全音音阶是什么关系？', 'スクリャービンの神秘和音と全音音階の関係は？', 'How is Scriabin’s mystic chord related to the whole-tone scale?'),
        options: [t('全音音阶把一个音升高半音', '全音音階の 1 音を半音上げたもの', 'A whole-tone scale with one note raised a semitone'), t('完全相同', 'まったく同じ', 'Identical'), t('两个全音音阶合起来', '2 つの全音音階を合わせたもの', 'Both whole-tone scales combined')],
        answer: 0,
        insight: { title: t('打破对称', '対称を崩す', 'Breaking the symmetry'), text: t('改动一个音的位置，移位时就能得到更多不同的资源。', '1 音の位置を変えると、移高でより多様な素材が得られる。', 'Moving one semitone’s position yields more variety under transposition.') },
      },
      {
        id: 'b47x-e3', type: 'page', ref: 'wiki-whole-tone',
        title: t('进阶 2 · 爵士与流行里的全音音阶', '発展 2・ジャズとポップスの全音音階', 'Advanced 2 · Whole-tone in jazz and pop'),
        text: [
          t('爵士里较早的例子有 Bix Beiderbecke 的《In a Mist》（1928）和 Don Redman 的《Chant of the Weed》（1931）；1958 年 Gil Evans 的编曲给了 Redman 原作里"突兀的全音线条"鲜明的色彩。Wayne Shorter 的《JuJu》（1965）大量使用全音音阶；John Coltrane 的《One Down, One Up》（1965）建立在两个增三和弦上，结构和他更早的《Impressions》一样简单。钢琴手 Art Tatum 和 Thelonious Monk 都大量、创造性地使用它，Monk 的《Four in One》（1948）和《Trinkle-Tinkle》（1952）就是好例子。', 'ジャズでの早い例はビックス・バイダーベック《In a Mist》（1928）とドン・レッドマン《Chant of the Weed》（1931）。1958 年、ギル・エヴァンスの編曲はレッドマンの原曲の「唐突な全音の線」に鮮やかな色を与えた。ウェイン・ショーター《JuJu》（1965）は全音音階を多用し、ジョン・コルトレーン《One Down, One Up》（1965）は 2 つの増三和音の上に、以前の《Impressions》と同じ単純な構造で作られている。ピアニストのアート・テイタムとセロニアス・モンクは全音音階を多く創造的に使った。モンクの《Four in One》（1948）と《Trinkle-Tinkle》（1952）がよい例。', 'Early jazz instances include Bix Beiderbecke’s “In a Mist” (1928) and Don Redman’s “Chant of the Weed” (1931); in 1958 Gil Evans’s arrangement gave striking colour to the “abrupt whole-tone lines” of Redman’s original. Wayne Shorter’s “JuJu” (1965) uses the scale heavily; John Coltrane’s “One Down, One Up” (1965) is built on two augmented chords in the same simple structure as his earlier “Impressions”. Art Tatum and Thelonious Monk used it extensively and creatively — Monk’s “Four in One” (1948) and “Trinkle-Tinkle” (1952) are fine examples.'),
          t('这些只是最明显的例子：大量爵士曲目（包括许多标准曲）都用增三和弦和对应的音阶，通常是为了在 turnaround 里制造紧张，或者代替属七和弦。流行音乐里一个突出的例子，是 Stevie Wonder 1972 年《You Are the Sunshine of My Life》开头的第 2、4 小节。', 'これらは最も目立つ例にすぎない：多くのジャズ曲（スタンダードを含む）が増三和音とそれに対応する音階を使い、たいていはターンアラウンドで緊張を作るため、または属七の代わりとして。ポップスでの目立つ例は、スティーヴィー・ワンダー 1972 年《You Are the Sunshine of My Life》冒頭の 2・4 小節目。', 'These are only the most overt examples: a vast number of jazz tunes, many standards included, use augmented chords and their scales, usually to create tension in turnarounds or as a substitute for a dominant seventh. A prominent pop example is bars two and four of the opening of Stevie Wonder’s 1972 “You Are the Sunshine of My Life”.'),
        ],
      },
      {
        id: 'b47x-e4', type: 'discover', practice: true, ref: 'wiki-whole-tone',
        prompt: t('Coltrane 的《One Down, One Up》建立在什么上面？', 'コルトレーン《One Down, One Up》は何の上に作られている？', 'Coltrane’s “One Down, One Up” is built on…'),
        options: [t('两个增三和弦', '2 つの増三和音', 'two augmented chords'), t('两个减七和弦', '2 つの減七', 'two diminished sevenths'), t('一个 ii–V–I', '1 つの ii–V–I', 'a single ii–V–I')],
        answer: 0,
        insight: { title: t('结构像《Impressions》', '構造は《Impressions》と同じ', 'Shaped like “Impressions”'), text: t('两个增三和弦——正好合成一个全音音阶的两半。', '2 つの増三和音——ちょうど全音音階の 2 つの半分。', 'Two augmented chords — exactly the two halves of a whole-tone scale.') },
      },
      {
        id: 'b47x-e5', type: 'page', ref: 'wiki-octatonic',
        title: t('进阶 3 · 八声（减）音阶：三个、两种排法、很多名字', '発展 3・8 音（ディミニッシュ）音階：3 つ、2 つの並び、多くの名前', 'Advanced 3 · The octatonic scale: three of them, two modes, many names'),
        text: [
          t('"八声音阶"可以指任何八个音的音阶，但多半指全音、半音交替的对称音阶。爵士理论叫它减音阶或对称减音阶，因为它可以看成两个交错的减七和弦（就像增音阶是两个交错的增三和弦）。半音阶的十二个音被三个不相交的减七和弦覆盖，任取两个合起来就是一个八声音阶——三选二，所以只有三个八声音阶。每个恰好有两个调式：先全后半和先半后全。20 世纪初圣彼得堡里姆斯基-科萨科夫圈子里的作曲家太熟悉它，叫它"科萨科夫音阶"；在荷兰因为作曲家 Willem Pijper 而叫 Pijper 音阶。', '「8 音音階」はどんな 8 音の音階でもよいが、多くは全音と半音が交互の対称音階を指す。ジャズ理論ではディミニッシュ・スケールまたはシンメトリック・ディミニッシュと呼ぶ。2 つの減七が組み合わさったものと見なせるから（オーギュメント・スケールが 2 つの増三和音の組み合わせなのと同じ）。半音階の 12 音は互いに重ならない 3 つの減七で覆われ、そのうち 2 つを合わせると 8 音音階——3 つから 2 つを選ぶので 8 音音階は 3 つだけ。それぞれに旋法はちょうど 2 つ：全半と半全。20 世紀初めのサンクトペテルブルクではリムスキー＝コルサコフの周りの作曲家にあまりになじみ深く「コルサコフ音階」と呼ばれ、オランダでは作曲家ウィレム・パイパーにちなみパイパー音階と呼ばれる。', '“Octatonic” can mean any eight-note scale but usually means the symmetric scale of alternating whole and half steps. Jazz theory calls it the diminished or symmetric diminished scale, since it is two interlocking diminished seventh chords (as the augmented scale is two interlocking augmented triads). The twelve chromatic notes are covered by three disjoint diminished sevenths, any two of which form an octatonic collection — three ways to choose two, so three octatonic scales. Each has exactly two modes: whole–half and half–whole. Around Rimsky-Korsakov in early-20th-century St Petersburg it was so familiar it was called the “Korsakovian scale”; in the Netherlands it is the Pijper scale, after Willem Pijper.'),
          t('它还有一个特点：包含四个相距小三度的小调音阶的前四个音——C 音阶里有 C D E♭ F、E♭ F G♭ A♭、F♯ G♯ A B、A B C D。肖邦《玛祖卡》Op. 50 No. 3、李斯特《叹息》的结尾、德彪西《夜曲》第一乐章《云》里英国管的旋律都有它；里姆斯基-科萨科夫的学生斯特拉文斯基大量使用，特别是俄国时期的《火鸟》（1910）、《彼得鲁什卡》（1911）、《春之祭》（1913）直到《管乐交响曲》（1920）。评论家写《三乐章交响曲》第一乐章的一段"光辉地八声化"："在爵士里并不陌生，这个调式在那里叫“减音阶”，但斯特拉文斯基当然是从里姆斯基那里学来的"——那段"伦巴"交替着 E♭7 和 C7。', 'もう 1 つの特徴：小 3 度ずつ離れた 4 つの短音階の最初の 4 音を含む——C の音階には C D E♭ F、E♭ F G♭ A♭、F♯ G♯ A B、A B C D がある。ショパン《マズルカ》Op. 50 No. 3、リスト《ため息》の終わり、ドビュッシー《夜想曲》第 1 曲《雲》のイングリッシュ・ホルンの旋律にあり、リムスキー＝コルサコフの弟子ストラヴィンスキーが多用した。特にロシア時代の《火の鳥》（1910）、《ペトルーシュカ》（1911）、《春の祭典》（1913）から《管楽器のための交響曲》（1920）まで。批評家は《3 楽章の交響曲》第 1 楽章の一節を「見事に 8 音的」と書いた：「ジャズでは珍しくない、そこでは『ディミニッシュ・スケール』と呼ばれるが、ストラヴィンスキーはもちろんリムスキーから知った」——その「ルンバ」は E♭7 と C7 を交互に鳴らす。', 'It also contains the first four notes of four minor scales a minor third apart — the C scale holds C D E♭ F, E♭ F G♭ A♭, F♯ G♯ A B and A B C D. It appears in Chopin’s Mazurka Op. 50 No. 3, the close of Liszt’s “Un Sospiro”, and the cor anglais melody of Debussy’s “Nuages”; Rimsky-Korsakov’s student Stravinsky used it extensively, especially in The Firebird (1910), Petrushka (1911), The Rite of Spring (1913) through the Symphonies of Wind Instruments (1920). A passage in the first movement of his Symphony in Three Movements was called “gloriously octatonic, not an unfamiliar situation in jazz, where this mode is known as the ‘diminished scale’, but Stravinsky of course knew it from Rimsky” — its “rumba” alternates E♭7 and C7.'),
        ],
      },
      {
        id: 'b47x-e6', type: 'discover', practice: true, ref: 'wiki-octatonic',
        prompt: t('为什么十二平均律里只有三个八声音阶？', 'なぜ 12 平均律に 8 音音階は 3 つしかない？', 'Why are there only three octatonic scales in 12-tone equal temperament?'),
        options: [t('三个减七和弦任取两个，只有三种取法', '3 つの減七から 2 つを選ぶ方法は 3 通りだけ', 'Choosing two of the three diminished sevenths gives only three combinations'), t('因为它有八个音', '8 音あるから', 'Because it has eight notes'), t('因为梅西安规定的', 'メシアンが決めたから', 'Because Messiaen decreed it')],
        answer: 0,
        insight: { title: t('3 选 2 = 3', '3 から 2 を選ぶ = 3', '3 choose 2 = 3'), text: t('三个不相交的减七和弦覆盖十二个音；任两个合起来就是一个八声音阶。', '重ならない 3 つの減七が 12 音を覆う。どの 2 つを合わせても 8 音音階。', 'Three disjoint diminished sevenths cover all twelve notes; any two make an octatonic scale.') },
      },
      {
        id: 'b47x-e7', type: 'page', ref: 'wiki-messiaen-modes',
        title: t('进阶 4 · 梅西安的七种有限移位调式', '発展 4・メシアンの 7 つの移調の限られた旋法', 'Advanced 4 · Messiaen’s seven modes of limited transposition'),
        text: [
          t('梅西安在《我的音乐语言技巧》里整理了"有限移位调式"：可以移到十二个音上，但至少有两个移位给出同样的音级，所以移位是"有限的"。它们由几个对称的组构成，每组最后一个音和下一组第一个音相同。还有另一种看法：大调从不同级开始会得到新的调式（如 Dorian），而有限移位调式能换起点的次数也有限——全音音阶从哪里开始都一样，只有 1 个调式；减音阶只能从全音或半音开始，有 2 个调式。', 'メシアンは『わが音楽語法』で「移調の限られた旋法」をまとめた：12 の音に移せるが、少なくとも 2 つの移高が同じ音級になるので移高が「限られる」。いくつかの対称な群でできており、各群の最後の音は次の群の最初の音と共通。もう 1 つの見方：長音階はどの度から始めても新しい旋法（ドリアンなど）になるが、移調の限られた旋法は始まりを変えられる回数も限られる——全音音階はどこから始めても同じで旋法は 1 つ、減音階は全音か半音で始めるしかなく旋法は 2 つ。', 'In The Technique of My Musical Language Messiaen compiled the “modes of limited transposition”: transposable to all twelve notes, but at least two transpositions yield the same pitch classes. They consist of symmetrical groups, each group’s last note shared with the next group’s first. Seen another way: the major scale gives a new mode from each degree (Dorian, etc.), but these modes can be shifted only a limited number of times — the whole-tone scale is the same from any note, one mode; the diminished scale can start only with a tone or a semitone, two modes.'),
          t('第一种（全音音阶）：2 个移位、1 个调式；第二种（八声、减音阶）：3 个移位（像减七和弦）、2 个调式；第三种（全半半 ×3）：4 个移位（像增三和弦）、3 个调式；第四到第七种都是 6 个移位（像三全音），分别有 4、3、4、5 个调式。梅西安写道："它们的系列是封闭的，至少在我们十二个半音的平均律里，数学上不可能找到别的。"其实还能找到符合条件的，但都是这七种的截取；排除 0、1、11、12 个音的极端情况，共有 15 种"广义梅西安调式"，其中一些被他省略的也很重要，例如六声集合 0 1 4 5 8 9。', '第 1（全音音階）：移高 2・旋法 1。第 2（8 音・減音階）：移高 3（減七と同じ）・旋法 2。第 3（全半半 ×3）：移高 4（増三和音と同じ）・旋法 3。第 4〜第 7 はどれも移高 6（三全音と同じ）で、旋法はそれぞれ 4・3・4・5。メシアンは書いた：「その系列は閉じている。少なくとも 12 半音の平均律では、ほかを見つけることは数学的に不可能だ」。実は条件を満たすものはほかにもあるが、どれもこの 7 つの切り詰め。0・1・11・12 音の極端なものを除くと「一般化されたメシアン旋法」は 15 あり、彼が省いたものの中にも 6 音の集合 0 1 4 5 8 9 のように音楽的に重要なものがある。', 'Mode 1 (whole-tone): 2 transpositions, 1 mode; mode 2 (octatonic): 3 transpositions (like the diminished seventh), 2 modes; mode 3 (tone–semitone–semitone ×3): 4 transpositions (like the augmented triad), 3 modes; modes 4–7: 6 transpositions each (like the tritone), with 4, 3, 4 and 5 modes. Messiaen wrote: “Their series is closed, it is mathematically impossible to find others, at least in our tempered system of 12 semitones.” Others fitting the criteria exist but are truncations of the seven; excluding sets of 0, 1, 11 or 12 notes there are 15 generalised Messiaen modes, some musically important ones omitted by him, like the hexatonic collection 0 1 4 5 8 9.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('调式', '旋法', 'mode'), cells: ['1', '2', '3', '4', '5', '6', '7'] }, { label: t('移位', '移高', 'transp.'), cells: ['2', '3', '4', '6', '6', '6', '6'] }, { label: t('调式数', '旋法数', 'modes'), cells: ['1', '2', '3', '4', '3', '4', '5'] }] },
      },
      {
        id: 'b47x-e8', type: 'discover', practice: true, ref: 'wiki-messiaen-modes',
        prompt: t('梅西安第三种调式（全、半、半重复三次）有几个不同的移位？', 'メシアン第 3 旋法（全・半・半を 3 回）の移高はいくつ？', 'How many distinct transpositions does Messiaen’s mode 3 (tone–semitone–semitone, three times) have?'),
        options: ['4', '3', '6', '12'],
        answer: 0,
        insight: { title: t('像增三和弦', '増三和音のように', 'Like the augmented triad'), text: t('每组四个半音，移大三度就回到原样：12 ÷ 3 = 4 个移位。', '各群は 4 半音、長 3 度移すと元に戻る：12 ÷ 3 = 4 つ。', 'Each group spans four semitones; moving up a major third returns the same notes: 12 ÷ 3 = 4 transpositions.') },
      },
      {
        id: 'b47x-e9', type: 'page', ref: 'wiki-bebop-scale',
        title: t('进阶 5 · 四种 bebop 音阶', '発展 5・4 つのビバップ・スケール', 'Advanced 5 · Four bebop scales'),
        text: [
          t('bebop 音阶是在常见的七声音阶里加一个音（通常是半音经过音）变成八声：七个音时和弦音不会自然地都落在正拍上，八个音时只要从和弦音、在正拍开始顺着弹，和弦音就会一直落在正拍，非和弦音都在反拍——历来好旋律都是把和弦音放在正拍上。爵士教育家 David Baker 起了"bebop 音阶"这个外号，因为 bebop 时代的乐手（Charlie Christian、Charlie Parker、Bud Powell、Dizzy Gillespie 等）常用它们。', 'ビバップ・スケールはよくある 7 音音階に 1 音（ふつう半音の経過音）を加えて 8 音にしたもの：7 音では和音の音が自然にすべて表拍に来ないが、8 音なら和音の音から表拍で始めて順に弾けば、和音の音がずっと表拍に来て、非和声音はすべて裏拍になる——昔からよい旋律は和音の音を表拍に置く。ジャズ教育者デヴィッド・ベイカーが「ビバップ・スケール」と名付けた。ビバップ時代の奏者（チャーリー・クリスチャン、チャーリー・パーカー、バド・パウエル、ディジー・ガレスピーら）がよく使ったから。', 'A bebop scale adds one note (usually a chromatic passing tone) to a common seven-note scale, making eight: with seven, chord tones don’t all fall on the beats, but with eight, starting from a chord tone on a beat, the chord tones keep landing on the beats and the non-chord tones on offbeats — chord tones on beats being a trait of strong melodies throughout history. Jazz educator David Baker nicknamed them “bebop scales” because bebop-era players (Charlie Christian, Charlie Parker, Bud Powell, Dizzy Gillespie…) used them often.'),
          t('属七 bebop：Mixolydian 在 ♭7 和主音之间加经过音，含有同主音大调和 Mixolydian 的全部音，用在属七和 II–V 上。大调 bebop：Ionian 在 5、6 级之间加 ♯5，让 1 3 5 6（大六和弦）落在正拍；Barry Harris 叫它"大六减音阶"——一个大六和弦加上二级上的减七和弦（2 4 ♭6 7）。旋律小调 bebop：在 5、6 级之间加经过音，含有上行旋律小调与和声小调的全部音，用在小六和弦上（Harris 叫"小六减音阶"）。和声小调 bebop（Mark Levine《The Drop 2 Book》叫 bebop 自然小调）：在 ♭6 和 7 之间加 ♭7，含有和声小调和自然小调的全部音，小调 ii–V–i 的三个和弦都能用；它是 bebop 大调的第六个调式（C bebop 和声小调 = E♭ bebop 大调）。另有"七降五减音阶"，等于梅西安第六种调式。', '属七ビバップ：ミクソリディアンの ♭7 と主音の間に経過音を加え、同主長調とミクソリディアンの音をすべて含み、属七や II–V に使う。メジャー・ビバップ：イオニアンの 5・6 度の間に ♯5 を加え、1 3 5 6（長六の和音）が表拍に来る。バリー・ハリスは「メジャー・シックス・ディミニッシュト」と呼んだ——長六の和音と第 2 度上の減七（2 4 ♭6 7）。旋律的短音階ビバップ：5・6 度の間に経過音を加え、上行旋律的短音階と和声的短音階の音をすべて含み、短六の和音に使う（ハリスは「マイナー・シックス・ディミニッシュト」）。和声的短音階ビバップ（マーク・レヴィン『The Drop 2 Book』ではビバップ自然短音階）：♭6 と 7 の間に ♭7 を加え、和声的短音階と自然短音階の音をすべて含み、短調 ii–V–i の 3 和音すべてに使える。メジャー・ビバップの第 6 旋法（C ビバップ・ハーモニック・マイナー = E♭ メジャー・ビバップ）。さらに「セブンス・フラット 5・ディミニッシュト」はメシアン第 6 旋法と同じ。', 'Bebop dominant: Mixolydian plus a passing tone between ♭7 and the root, containing all notes of the major and Mixolydian scales on that root, used over dominant sevenths and II–V. Bebop major: Ionian plus ♯5 between 5 and 6, putting 1 3 5 6 (a major sixth chord) on the beats; Barry Harris called it the major sixth diminished scale — a major sixth chord plus a diminished seventh on degree 2 (2 4 ♭6 7). Bebop melodic minor: a passing tone between 5 and 6, containing all notes of ascending melodic and harmonic minor, used over minor sixth chords (Harris’s minor sixth diminished scale). Bebop harmonic minor (bebop natural minor in Mark Levine’s The Drop 2 Book): ♭7 between ♭6 and 7, containing harmonic and natural minor, usable over all three chords of a minor ii–V–i; it is mode 6 of bebop major (C bebop harmonic minor = E♭ bebop major). The seventh flat 5 diminished scale equals Messiaen’s sixth mode.'),
        ],
      },
      {
        id: 'b47x-e10', type: 'discover', practice: true, ref: 'wiki-bebop-scale',
        prompt: t('C bebop 和声小调音阶（C D E♭ F G A♭ B♭ B）和哪个 bebop 大调音阶同音？', 'C ビバップ・ハーモニック・マイナー（C D E♭ F G A♭ B♭ B）と同じ音のメジャー・ビバップは？', 'C bebop harmonic minor (C D E♭ F G A♭ B♭ B) has the same notes as which bebop major scale?'),
        options: [t('E♭ bebop 大调', 'E♭ メジャー・ビバップ', 'E♭ bebop major'), t('C bebop 大调', 'C メジャー・ビバップ', 'C bebop major'), t('A♭ bebop 大调', 'A♭ メジャー・ビバップ', 'A♭ bebop major')],
        answer: 0,
        insight: { title: t('第六个调式', '第 6 旋法', 'The sixth mode'), text: t('E♭ bebop 大调 E♭ F G A♭ B♭ B C D：从第六个音 C 开始就是 C bebop 和声小调。', 'E♭ メジャー・ビバップ E♭ F G A♭ B♭ B C D：6 番目の C から始めると C ビバップ・ハーモニック・マイナー。', 'E♭ bebop major E♭ F G A♭ B♭ B C D, started on its sixth note C, is C bebop harmonic minor.') },
      },
      {
        id: 'b47x-e11', type: 'page', ref: ['wiki-neapolitan-scale', 'wiki-double-harmonic'],
        title: t('进阶 6 · 那不勒斯音阶与双和声音阶', '発展 6・ナポリ音階とダブル・ハーモニック', 'Advanced 6 · Neapolitan and double harmonic scales'),
        text: [
          t('那不勒斯大调和那不勒斯小调都是"小调"：主音上方都是小三度，区别在第六音。它们和和声小调、上行旋律小调的区别是二级降低，所以也被叫作"Phrygian 和声小调""Phrygian 旋律小调"，和 Phrygian 一样主音上方是小二度；用强力和弦或小三和弦伴奏都很好。那不勒斯大调的第四个调式（Lydian dominant ♭6）很适合 9♯11♭13 和弦——它含有所有变化音，还有全音音阶没有的还原五音；第五个调式叫大调 Locrian。', 'ナポリ長音階とナポリ短音階はどちらも「短調」：主音の上が短 3 度で、違いは第 6 音。和声的短音階や上行旋律的短音階との違いは 2 度が下がっていることなので、「フリギア和声的短音階」「フリギア旋律的短音階」とも呼ばれ、フリギアと同じく主音の上が短 2 度。パワー・コードや短三和音での伴奏がよく合う。ナポリ長音階の第 4 旋法（リディアン・ドミナント ♭6）は 9♯11♭13 の和音に最適——すべての変化音に加え、全音音階にないナチュラルの 5 度を含む。第 5 旋法はメジャー・ロクリアンと呼ばれる。', 'The Neapolitan major and minor scales are both minor — a minor third above the root — and differ in their sixth. They differ from harmonic and ascending melodic minor by a lowered second, hence the names “Phrygian harmonic minor” and “Phrygian melodic minor”, sharing Phrygian’s minor second above the tonic; power or minor chords accompany them well. Neapolitan major’s fourth mode (Lydian dominant ♭6) suits a 9♯11♭13 chord — all the alterations plus the natural fifth a whole-tone scale lacks; its fifth mode is the major Locrian scale.'),
          t('双和声大调音阶（Ionian ♭2 ♭6）有两个带增二度的"和声四音组"，所以叫"双和声"；和声大调、和声小调都只有一个增二度。它和印度斯坦的 Bhairav thaat、卡纳提克的 Mayamalavagowla、拜占庭音阶、阿拉伯的 Hijaz Kar、吉普赛大调同音，内含一个三全音替代（比主音高半音的属七）。用例：Roubanis 的《Misirlou》（E 调）、圣-桑《参孙与达丽拉》的酒神节舞曲、德彪西《格拉纳达之夜》等、Deep Purple / Rainbow 的 Ritchie Blackmore（《Gates of Babylon》《Stargazer》）、音乐剧《屋顶上的小提琴手》里《Tradition》的固定音型（C 调）。它的台阶 半–小三度–半–全–半–小三度–半（SMSTSMS）是回文，正着读倒着读都一样——大调调式里只有 Dorian 是回文。', 'ダブル・ハーモニック・メジャー（イオニアン ♭2 ♭6）は増 2 度を持つ「和声的テトラコード」が 2 つあるので「ダブル・ハーモニック」。和声的長音階・和声的短音階は増 2 度が 1 つだけ。ヒンドゥスターニーのバイラヴ・タート、カルナータカのマーヤーマーラヴァゴウラ、ビザンティン音階、アラブのヒジャーズ・カール、ジプシー・メジャーと同じ音で、三全音代理（主音の半音上の属七）を内に持つ。例：ルバニス《Misirlou》（E）、サン＝サーンス《サムソンとデリラ》のバッカナール、ドビュッシー《グラナダの夕べ》など、ディープ・パープル／レインボーのリッチー・ブラックモア（《Gates of Babylon》《Stargazer》）、ミュージカル《屋根の上のバイオリン弾き》の《Tradition》のオスティナート（C）。音程 半・短 3・半・全・半・短 3・半（SMSTSMS）は回文で、前から読んでも後ろから読んでも同じ——長音階の旋法で回文なのはドリアンだけ。', 'The double harmonic major scale (Ionian ♭2 ♭6) has two harmonic tetrachords with augmented seconds, hence “double harmonic”; harmonic major and minor have only one. It matches the Hindustani Bhairav thaat, the Carnatic Mayamalavagowla, the Byzantine scale, the Arabic Hijaz Kar and the Gypsy major scale, and contains a built-in tritone substitution (a dominant seventh a half step above the root). Uses: Roubanis’s “Misirlou” (in E), the Bacchanale from Saint-Saëns’s Samson and Delilah, Debussy’s “Soirée dans Grenade” and others, Ritchie Blackmore of Deep Purple and Rainbow (“Gates of Babylon”, “Stargazer”), and the ostinato of “Tradition” from Fiddler on the Roof (in C). Its steps S–M–S–T–S–M–S form a palindrome, reading the same backwards — among the major scale’s modes only Dorian is a palindrome.'),
        ],
      },
      {
        id: 'b47x-e12', type: 'discover', practice: true, ref: 'wiki-double-harmonic',
        prompt: t('双和声音阶的台阶 SMSTSMS 有什么特点？', 'ダブル・ハーモニックの音程 SMSTSMS の特徴は？', 'What is special about the double harmonic’s step pattern SMSTSMS?'),
        options: [t('是回文：倒着读也一样', '回文：逆から読んでも同じ', 'It is a palindrome: the same backwards'), t('只有全音', '全音だけ', 'It has only whole steps'), t('和大调一样', '長調と同じ', 'It matches the major scale')],
        answer: 0,
        insight: { title: t('像 Dorian 一样对称', 'ドリアンのように対称', 'Symmetric like Dorian'), text: t('半、小三度、半、全、半、小三度、半——以中间的全音为轴左右对称。', '半・短 3・半・全・半・短 3・半——真ん中の全音を軸に左右対称。', 'Semitone, minor third, semitone, tone, semitone, minor third, semitone — mirrored around the central tone.') },
      },
    ],
    experiment: [
      { id: 'b47x-x1', type: 'experiment', toy: 'scale', ref: ['wiki-messiaen-modes', 'wiki-bebop-scale', 'wiki-neapolitan-scale', 'wiki-double-harmonic'],
        prompt: t('在几个主音上听：梅西安第三种调式（九个音）、bebop 大调和 bebop 和声小调（八个音，高亮的是加进去的音）、那不勒斯小调和双和声音阶（高亮的是降低的二级）。哪一个最像你在中东或印度音乐里听过的声音？', 'いくつかの主音で聴こう：メシアン第 3 旋法（9 音）、メジャー・ビバップとビバップ・ハーモニック・マイナー（8 音、ハイライトは加えた音）、ナポリ短音階とダブル・ハーモニック（ハイライトは下げた 2 度）。中東やインドの音楽で聞いた響きに最も近いのは？', 'On a few tonics, hear Messiaen’s mode 3 (nine notes), bebop major and bebop harmonic minor (eight notes, the added note highlighted), Neapolitan minor and double harmonic (the lowered second highlighted). Which sounds most like music you have heard from the Middle East or India?'),
        params: { sets: SYM_SETS_X },
        breakthrough: { id: 'b47x-colours', text: t('六、七、八、九个音——你听出了每一种音阶独特的"指纹"。', '6・7・8・9 音——どの音階にも独自の「指紋」があると聞き取れた。', 'Six, seven, eight, nine notes — you heard each scale’s own fingerprint.') } },
    ],
    challenge: [
      {
        id: 'b47x-c1', type: 'choice', error: 'scale-pattern', skills: ['identify'], ref: ['wiki-whole-tone', 'wiki-messiaen-modes'],
        variants: [
          { prompt: t('全音音阶的 Forte 编号是？', '全音音階のフォルテ番号は？', 'The whole-tone scale’s Forte number is…'), options: ['6-35', '7-34', '8-28'] },
          { prompt: t('梅西安第四到第七种调式各有几个移位？', 'メシアン第 4〜第 7 旋法の移高はそれぞれいくつ？', 'How many transpositions do Messiaen’s modes 4–7 each have?'), options: ['6', '4', '3'] },
          { prompt: t('德彪西哪首前奏曲几乎完全在一个全音音阶里？', 'ほぼ全体が 1 つの全音音階のドビュッシーの前奏曲は？', 'Which Debussy prelude stays almost entirely within one whole-tone scale?'), options: [t('《帆》（Voiles）', '《帆》（Voiles）', '“Voiles”'), t('《云》（Nuages）', '《雲》（Nuages）', '“Nuages”'), t('《格拉纳达之夜》', '《グラナダの夕べ》', '“Soirée dans Grenade”')] },
        ],
        answer: 0,
        explain: t('全音音阶 6-35；梅西安第四到第七种都是 6 个移位；《帆》几乎全在一个全音音阶里（《云》是八声的例子）。', '全音音階は 6-35。メシアン第 4〜第 7 はどれも移高 6。《帆》はほぼ 1 つの全音音階（《雲》は 8 音音階の例）。', 'Whole-tone is 6-35; Messiaen’s modes 4–7 each have six transpositions; “Voiles” is almost all one whole-tone scale (“Nuages” is an octatonic example).'),
      },
      {
        id: 'b47x-c2', type: 'choice', error: 'scale-pattern', skills: ['identify'], ref: 'wiki-octatonic',
        variants: [
          { prompt: t('在荷兰，八声音阶又叫？', 'オランダで 8 音音階は何と呼ばれる？', 'In the Netherlands the octatonic scale is called the…'), options: [t('Pijper 音阶', 'パイパー音階', 'Pijper scale'), t('科萨科夫音阶', 'コルサコフ音階', 'Korsakovian scale'), t('Pomeroy 音阶', 'ポメロイ音階', 'Pomeroy scale')] },
          { prompt: t('斯特拉文斯基《三乐章交响曲》里那段"伦巴"交替哪两个和弦？', 'ストラヴィンスキー《3 楽章の交響曲》の「ルンバ」で交互に鳴る 2 和音は？', 'The “rumba” in Stravinsky’s Symphony in Three Movements alternates…'), options: ['E♭7 / C7', 'G7 / C7', 'D♭7 / G7'] },
          { prompt: t('每个八声音阶有几个调式？', '各 8 音音階の旋法はいくつ？', 'How many modes does each octatonic scale have?'), options: ['2', '8', '3'] },
        ],
        answer: 0,
        explain: t('荷兰叫 Pijper 音阶；"伦巴"交替 E♭7 和 C7；每个八声音阶只有先全后半、先半后全两个调式。', 'オランダではパイパー音階。「ルンバ」は E♭7 と C7。各 8 音音階の旋法は全半・半全の 2 つだけ。', 'The Dutch call it the Pijper scale; the “rumba” alternates E♭7 and C7; each octatonic scale has two modes, whole–half and half–whole.'),
      },
      {
        id: 'b47x-c3', type: 'choice', error: 'scale-pattern', skills: ['spell'], ref: 'wiki-bebop-scale',
        variants: [
          { prompt: t('大调 bebop 音阶加的音在哪里？', 'メジャー・ビバップに加える音はどこ？', 'Where is the added note in bebop major?'), options: [t('5 和 6 之间（♯5）', '5 と 6 の間（♯5）', 'Between 5 and 6 (♯5)'), t('♭7 和 1 之间', '♭7 と 1 の間', 'Between ♭7 and 1'), t('♭6 和 7 之间', '♭6 と 7 の間', 'Between ♭6 and 7')] },
          { prompt: t('Barry Harris 把旋律小调 bebop 音阶叫作？', 'バリー・ハリスは旋律的短音階ビバップを何と呼んだ？', 'Barry Harris called the bebop melodic minor scale the…'), options: [t('小六减音阶', 'マイナー・シックス・ディミニッシュト', 'minor sixth diminished scale'), t('大六减音阶', 'メジャー・シックス・ディミニッシュト', 'major sixth diminished scale'), t('减全音音阶', 'ディミニッシュト・ホールトーン', 'diminished whole-tone scale')] },
          { prompt: t('哪种 bebop 音阶能用在小调 ii–V–i 的全部三个和弦上？', '短調 ii–V–i の 3 和音すべてに使えるビバップ・スケールは？', 'Which bebop scale works over all three chords of a minor ii–V–i?'), options: [t('和声小调 bebop', 'ビバップ・ハーモニック・マイナー', 'Bebop harmonic minor'), t('属七 bebop', 'ビバップ・ドミナント', 'Bebop dominant'), t('大调 bebop', 'メジャー・ビバップ', 'Bebop major')] },
        ],
        answer: 0,
        explain: t('大调 bebop 在 5、6 之间加 ♯5；旋律小调 bebop 是"小六减音阶"；和声小调 bebop 适用于小调 ii–V–i 的三个和弦。', 'メジャー・ビバップは 5・6 の間に ♯5。旋律的短音階ビバップは「マイナー・シックス・ディミニッシュト」。ビバップ・ハーモニック・マイナーは短調 ii–V–i の 3 和音すべてに。', 'Bebop major adds ♯5 between 5 and 6; bebop melodic minor is the minor sixth diminished scale; bebop harmonic minor covers all three chords of a minor ii–V–i.'),
      },
      {
        id: 'b47x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: ['wiki-whole-tone', 'wiki-double-harmonic', 'wiki-neapolitan-scale'],
        variants: [
          { prompt: t('Stevie Wonder 哪首歌开头的第 2、4 小节用了全音音阶？', 'スティーヴィー・ワンダーのどの曲の冒頭 2・4 小節目が全音音階？', 'Which Stevie Wonder song uses the whole-tone scale in bars 2 and 4 of its opening?'), options: [t('《You Are the Sunshine of My Life》', '《You Are the Sunshine of My Life》', '“You Are the Sunshine of My Life”'), t('《Superstition》', '《Superstition》', '“Superstition”'), t('《Isn\'t She Lovely》', '《Isn\'t She Lovely》', '“Isn\'t She Lovely”')] },
          { prompt: t('《屋顶上的小提琴手》里《Tradition》的固定音型用了哪种音阶？', '《屋根の上のバイオリン弾き》《Tradition》のオスティナートの音階は？', 'The ostinato of “Tradition” from Fiddler on the Roof uses which scale?'), options: [t('双和声大调音阶', 'ダブル・ハーモニック・メジャー', 'the double harmonic major'), t('全音音阶', '全音音階', 'the whole-tone scale'), t('bebop 属音阶', 'ビバップ・ドミナント', 'the bebop dominant')] },
          { prompt: t('那不勒斯大调和那不勒斯小调的区别在？', 'ナポリ長音階と短音階の違いは？', 'Neapolitan major and minor differ in their…'), options: [t('第六音', '第 6 音', 'sixth'), t('三音', '3 度', 'third'), t('二音', '2 度', 'second')] },
        ],
        answer: 0,
        explain: t('《You Are the Sunshine of My Life》第 2、4 小节；《Tradition》的固定音型是双和声大调；两种那不勒斯音阶都是小三度，差在第六音。', '《You Are the Sunshine of My Life》の 2・4 小節目。《Tradition》はダブル・ハーモニック・メジャー。ナポリ音階はどちらも短 3 度で、違いは第 6 音。', '“You Are the Sunshine of My Life” bars 2 and 4; “Tradition” uses the double harmonic major; both Neapolitan scales have a minor third, differing in the sixth.'),
      },
      G('b47x-g1', 'symmetricScale', 1, ['identify']),
      G('b47x-g2', 'bebopDominant', 1, ['spell']),
    ],
  },
  pool: [G('b47x-p1', 'symmetricScale', 2, ['identify']), G('b47x-p2', 'bebopDominant', 2, ['spell'])],
};

// ===================== B4-8x 和弦替代与再和声 · 扩展关 =====================
// 对应 A 面：substitutions（三全音替代 / 副属替代与借用 / 后门进行 / Coltrane 进行）+ color（alt / Blackadder / 增三和弦 / 综合）+ 支线 reharm（旋律音分类 / 古典 / 爵士 / 布鲁斯配法）
const RV = {
  C: [48, 55, 64, 72], E7: [40, 56, 62], A7: [45, 55, 61], Am7: [45, 55, 60], Bbm7: [46, 56, 61], Eb7: [39, 55, 61], Dm7: [50, 60, 65], D7: [50, 60, 66],
  F7: [41, 57, 63], G7: [43, 59, 65], Abmaj7: [44, 55, 60], Dbmaj7: [49, 60, 65], Cend: [48, 55, 64],
};
const slotX = (fn, a, b) => ({ fn, fnLabel: t(fn === 'T' ? '主' : fn === 'D' ? '属' : '下属', fn === 'T' ? '主' : fn === 'D' ? '属' : '下属', fn), options: [{ label: a[0], notes: a[1] }, ...(b ? [{ label: b[0], notes: b[1] }] : [])] });
const EXT_B4_8 = {
  minutes: 24,
  insight: t('替代不是乱换：副属保留根音、三全音替代保留三全音、后门进行保留两个共同音、Coltrane 进行把调中心按大三度排开。每一种都留下一点"旧的"，听众才认得出这是同一首曲子。', '代理は好き勝手な取り替えではない：副属は根音を、裏コードは三全音を、バックドアは 2 つの共通音を残し、コルトレーン・チェンジは調の中心を長 3 度ずつ並べる。どれも「古いもの」を少し残すので、聴き手は同じ曲だとわかる。', 'Substitution is not random swapping: applied chords keep the root, tritone subs keep the tritone, the backdoor keeps two common tones, Coltrane changes space key centres by major thirds. Each keeps something old, so listeners still recognise the tune.'),
  sections: {
    discover: [
      {
        id: 'b48x-d1', type: 'discover', ref: 'wiki-backdoor',
        prompt: t('先听正门 Dm7 – G7 – C，再听后门 Fm7 – B♭7 – C。后门进行里，B♭7 的哪两个音像"上方导音"一样往下解决到 C 和弦？', 'まず表門 Dm7 – G7 – C、次に裏門 Fm7 – B♭7 – C。バックドアで B♭7 のどの 2 音が「上からの導音」のように C の和音へ下がる？', 'Hear the front door Dm7 – G7 – C, then the backdoor Fm7 – B♭7 – C. Which two notes of B♭7 resolve down into C like “upper leading tones”?'),
        play: [{ label: t('正门', '表門', 'Front door'), audio: { chords: [[50, 53, 60, 65], [43, 53, 59, 65], [48, 52, 60, 67]], gap: 900 } }, { label: t('后门', '裏門', 'Backdoor'), audio: { chords: [[41, 56, 60, 63], [46, 56, 62, 65], [48, 55, 64, 67]], gap: 900 } }],
        options: [t('A♭ → G、F → E', 'A♭ → G、F → E', 'A♭ → G and F → E'), t('B → C、F → E', 'B → C、F → E', 'B → C and F → E'), t('B♭ → C、D → E', 'B♭ → C、D → E', 'B♭ → C and D → E')],
        answer: 0,
        insight: {
          title: t('不走正门，走后门', '表門でなく裏門から', 'Not the front door but the back'),
          text: t('iv7 – ♭VII7 – I 被叫作"后门进行"（爵士理论家 Jerry Coker 的说法），因为默认的 ii–V–I 是"正门"。♭VII7 是从同主音小调借来的属七，所以能解决到 I，前面常是 IV → iv。G7（G B D F）和 B♭7（B♭ D F A♭）有两个共同音；正门里是 B 和 F 分别往上、往下解决到 C 和 E，后门里则是 A♭ 和 F 从上方解决到 G 和 E。', 'iv7 – ♭VII7 – I は「バックドア進行」と呼ばれる（ジャズ理論家ジェリー・コーカーの言い方）。基本の ii–V–I が「表門」だから。♭VII7 は同主短調から借りた属七なので I へ解決でき、前にはよく IV → iv が来る。G7（G B D F）と B♭7（B♭ D F A♭）は 2 音共通。表門では B と F がそれぞれ C と E へ上下に解決し、裏門では A♭ と F が上から G と E へ解決する。', 'iv7 – ♭VII7 – I is nicknamed the backdoor progression (jazz theorist Jerry Coker’s term), since the normal ii–V–I is the “front door”. ♭VII7 is a dominant seventh borrowed from the parallel minor, so it can resolve to I, often preceded by IV → iv. G7 (G B D F) and B♭7 (B♭ D F A♭) share two tones; in the front door B and F resolve up and down to C and E, in the backdoor A♭ and F resolve down to G and E as upper leading tones.'),
        },
      },
    ],
    explain: [
      {
        id: 'b48x-e1', type: 'page', ref: 'omt2e-substitutions',
        title: t('进阶 1 · 三种替代：同根音、借小调、隔三全音', '発展 1・3 つの代理：同じ根音、短調から借りる、三全音離れ', 'Advanced 1 · Three substitutions: same root, borrowed, a tritone away'),
        text: [
          t('给熟悉的曲子做新诠释是爵士的基石之一，所以和弦替代非常重要。一、副属替代：根音按五度进行时，可以把前一个和弦换成同根音的属七，它就成了后一个和弦的副属——turnaround 里每个和弦都和下一个相距五度，于是可以全部换成属七。二、调式混合：Cole Porter 的《All of You》（Ella Fitzgerald 的录音在 C 大调）里 A♮（la）和 A♭（le）交替，带来伤感的味道；A♭ 是从 C 小调借来的。爵士里最常见的混合和弦是用 iiø7 代替 ii7、在 V7 上加 ♭9——两者都是用 le 代替 la；混合版和调内版功能相同。', '聞き慣れた曲に新しい解釈を与えることはジャズの礎の 1 つなので、コード代理はとても重要。1. 副属による代理：根音が 5 度で進むとき、前の和音を同じ根音の属七に替えると、後の和音の副属になる——ターンアラウンドはどの和音も次と 5 度関係なので、すべて属七にできる。2. モーダル・インターチェンジ：コール・ポーター《All of You》（エラ・フィッツジェラルドの録音はハ長調）では A♮（la）と A♭（le）が交互に現れ、感傷的な味わいになる。A♭ はハ短調から借りたもの。ジャズで最もよくある借用和音は ii7 の代わりの iiø7 と、V7 に ♭9 を加えること——どちらも la の代わりに le。借用版と調内版の機能は同じ。', 'New readings of old favourites are a cornerstone of jazz, so chord substitution matters greatly. One, applied chords: when roots move by fifth, replace the first chord with the dominant seventh on the same root, making it an applied chord to the next — in a turnaround every chord is a fifth from the next, so all can become dominants. Two, mode mixture: Cole Porter’s “All of You” (Ella Fitzgerald’s recording is in C) alternates A♮ (la) and A♭ (le) for a sentimental effect, A♭ being borrowed from C minor. Jazz’s commonest mixture chords are iiø7 for ii7 and ♭9 on V7 — both substitute le for la; mixed and diatonic versions share a function.'),
          t('三、三全音替代：前两种在流行和古典里也常见，三全音替代则是爵士独有的。它代替 V7（应用的或调内的）。名字有两层意思：替代和弦和原和弦相隔三全音，而且两者共享同一个三全音——三全音把十二个音平分成两半，移三全音就映射回自己。认出它的一个办法：它向下小二度半音解决。', '3. 三全音代理（裏コード）：前の 2 つはポップスやクラシックにもよくあるが、裏コードはジャズ独自のもの。V7（副属でも調内でも）を置き換える。名前の意味は 2 つ：代理和音は元の和音から三全音離れていて、しかも同じ三全音を共有する——三全音は 12 音をちょうど半分に分けるので、三全音移すと自分自身に重なる。見分け方の 1 つ：短 2 度下へ半音で解決する。', 'Three, the tritone substitution: the first two are common in pop and classical styles too, but the tritone sub is unique to jazz. It replaces V7, applied or diatonic. The name means two things: the substitute lies a tritone from the original, and the two share the same tritone — the tritone divides the twelve notes evenly, so transposing by a tritone maps it onto itself. One way to spot it: it resolves chromatically down a minor second.'),
        ],
      },
      {
        id: 'b48x-e2', type: 'discover', practice: true, ref: 'omt2e-substitutions',
        prompt: t('爵士里最常见的两种混合和弦（iiø7 代替 ii7、V7 加 ♭9），都把哪个音换成了哪个？', 'ジャズで最もよくある 2 つの借用和音（ii7 の代わりの iiø7、V7 の ♭9）は、どの音をどの音に替えている？', 'The two commonest jazz mixture chords (iiø7 for ii7, ♭9 on V7) both replace which note with which?'),
        options: [t('la 换成 le', 'la を le に', 'la with le'), t('ti 换成 te', 'ti を te に', 'ti with te'), t('mi 换成 me', 'mi を me に', 'mi with me')],
        answer: 0,
        insight: { title: t('C 调里的 A → A♭', 'C での A → A♭', 'A → A♭ in C'), text: t('Dm7♭5 的五音和 G7♭9 的九音都是 A♭：从 C 小调借来的 le。', 'Dm7♭5 の 5 度も G7♭9 の 9 度も A♭：ハ短調から借りた le。', 'The fifth of Dm7♭5 and the ninth of G7♭9 are both A♭: le borrowed from C minor.') },
      },
      {
        id: 'b48x-e3', type: 'page', ref: ['omt2e-substitutions', 'wiki-harmonization'],
        title: t('进阶 2 · 三全音替代的原理、写法与组合', '発展 2・裏コードの仕組み、書き方、組み合わせ', 'Advanced 2 · Tritone subs: why, how they are written, combining them'),
        text: [
          t('原理：属七的三音和七音，与相隔三全音的属七的七音和三音等音——G7 的 B、F 就是 D♭7 的 C♭、F。三全音是属七声音的标志，所以 D♭7 能代替 G7；Dm7 – D♭7 – Cmaj7 的低音成了半音线，上方声部进行平滑。也可以对大七和弦做三全音替代：Dm7 – D♭maj7 – Cmaj7，Thad Jones 的大乐队作品里有时这样写。McClimon 把三全音替代画成 ii–V 空间背后的一个"影子空间"，被替代的 V7 前面也有它自己的 ii7。', '仕組み：属七の 3 度と 7 度は、三全音離れた属七の 7 度と 3 度と異名同音——G7 の B・F は D♭7 の C♭・F。三全音は属七の響きの目印なので D♭7 は G7 の代わりになる。Dm7 – D♭7 – Cmaj7 ではバスが半音の線になり、上声も滑らかに進む。長七にも裏コードを使える：Dm7 – D♭maj7 – Cmaj7。サド・ジョーンズはビッグバンドの作品でときどきこう書く。マクリモンは裏コードを ii–V 空間の背後の「影の空間」として描き、代理された V7 の前にもそれ自身の ii7 がある。', 'Why: a dominant’s third and seventh are enharmonically the seventh and third of the dominant a tritone away — G7’s B and F are D♭7’s C♭ and F. The tritone defines the dominant sound, so D♭7 can replace G7; in Dm7 – D♭7 – Cmaj7 the bass becomes chromatic and the upper voices move smoothly. Major sevenths can be tritone-substituted too: Dm7 – D♭maj7 – Cmaj7, as Thad Jones sometimes writes for big band. McClimon draws tritone subs as a “shadow space” behind ii–V space, the substituted V7 preceded by its own ii7.'),
          t('谱上怎么写：替代可以完全不写、由乐手即兴加入；可以直接写进和弦记号；也可以写在括号里，表示是可选的——Ellington《Satin Doll》里调式混合的 iiø7 就有这几种写法。把几种技巧组合起来，C | Am7 | Dm7 | G7 | C 可以变成 E7 A7 | B♭m7 E♭7 | D7 F7 | A♭maj7 D♭maj7 | C。爵士里只有主、下属、属三种功能，所以同功能的和弦也能互换（如 ii 代 IV、vi 或 iii 代 I）。还有"平移"（planing）：保持和弦的形状和配置，半音或三全音地上下滑动，例如 F7 滑到 G♭7。', '譜面での書き方：代理はまったく書かず奏者が即興で加えることも、コード記号に直接書くことも、括弧に入れて「任意」と示すこともある——エリントン《Satin Doll》の借用 iiø7 にはこれらの書き方がある。いくつかの技法を組み合わせると、C | Am7 | Dm7 | G7 | C は E7 A7 | B♭m7 E♭7 | D7 F7 | A♭maj7 D♭maj7 | C になる。ジャズの機能は主・下属・属の 3 つだけなので、同じ機能の和音どうしも入れ替えられる（ii で IV、vi や iii で I など）。さらに「プレーニング」：和音の形と配置を保ったまま半音や三全音で上下に滑らせる。たとえば F7 から G♭7 へ。', 'On the page, a substitution may be left unwritten and improvised, written into the chord symbols, or put in parentheses as optional — Ellington’s “Satin Doll” shows all three for a mixture iiø7. Combining techniques, C | Am7 | Dm7 | G7 | C can become E7 A7 | B♭m7 E♭7 | D7 F7 | A♭maj7 D♭maj7 | C. Jazz has only three functions — tonic, subdominant, dominant — so chords of the same function can swap (ii for IV, vi or iii for I). There is also planing: sliding a chord up or down chromatically or by a tritone while keeping its shape and voicing, e.g. F7 to G♭7.'),
        ],
      },
      {
        id: 'b48x-e4', type: 'discover', practice: true, ref: 'wiki-harmonization',
        prompt: t('为什么 D♭7 能代替 G7？', 'なぜ D♭7 は G7 の代わりになる？', 'Why can D♭7 replace G7?'),
        options: [t('G7 的三音 B、七音 F 等于 D♭7 的七音 C♭、三音 F', 'G7 の 3 度 B と 7 度 F が D♭7 の 7 度 C♭ と 3 度 F に等しい', 'G7’s third B and seventh F equal D♭7’s seventh C♭ and third F'), t('它们根音相同', '根音が同じ', 'They share a root'), t('它们都在 C 大调里', 'どちらもハ長調の和音', 'Both belong to C major')],
        answer: 0,
        insight: { title: t('同一个三全音，换了拼法', '同じ三全音、綴りが違うだけ', 'One tritone, respelled'), text: t('B–F 和 C♭–F 是同一对音：三全音没变，所以功能也没变。', 'B–F と C♭–F は同じ 2 音：三全音が変わらないので機能も変わらない。', 'B–F and C♭–F are the same two pitches: the tritone stays, so the function stays.') },
      },
      {
        id: 'b48x-e5', type: 'page', ref: 'wiki-backdoor',
        title: t('进阶 3 · 后门进行与"马里奥终止"', '発展 3・バックドア進行と「マリオ終止」', 'Advanced 3 · The backdoor and the “Mario cadence”'),
        text: [
          t('后门进行 iv7 – ♭VII7 – I 也叫"后门 ii–V"；名字基于一个假设：通往主和弦的正常路线 ii–V7–I 是"正门"。♭VII7 是从同主音小调借来的转调和弦，是属七，所以能解决到 I；常见的写法是 IV → iv → ♭VII7 → I。还有"后门 IV–V"：♭VI M7 – ♭VII7 – I，因为《超级马力欧兄弟》过关音乐而被叫作"马里奥终止"。也可以用轴心体系来理解后门进行。', 'バックドア進行 iv7 – ♭VII7 – I は「バックドア ii–V」とも呼ばれる。名前は、主和音への普通の道 ii–V7–I が「表門」だという前提から。♭VII7 は同主短調から借りた転換和音で属七なので I へ解決でき、よくある形は IV → iv → ♭VII7 → I。「バックドア IV–V」もある：♭VI M7 – ♭VII7 – I。《スーパーマリオブラザーズ》のステージ・クリアの音楽から「マリオ終止」とも呼ばれる。アクシス・システムで理解することもできる。', 'The backdoor progression iv7 – ♭VII7 – I is also called the backdoor ii–V, on the assumption that the normal route to the tonic, ii–V7–I, is the “front door”. ♭VII7, a pivot borrowed from the parallel minor, is a dominant seventh and can resolve to I; it is commonly preceded by IV going to iv. There is also a backdoor IV–V: ♭VI M7 – ♭VII7 – I, known as the “Mario cadence” after the end-of-level music in Super Mario Bros. The backdoor can also be understood through the axis system.'),
          t('注意：作者 Shelton Berg 用"后门"指另一个完全无关的进行：在走向被强调的 iii 的 iiø7 – V7（C 调里 ♯ivø7 – VII7）之后，不落在 iii7（E G B D），而落在非常相似的 Imaj9（C E G B D），意外地从"后门"回家。属七向上一级解决叫阻碍终止。', '注意：シェルトン・バーグは「バックドア」をまったく別の進行に使う：強調された iii へ向かう iiø7 – V7（C では ♯ivø7 – VII7）の後、iii7（E G B D）でなく、よく似た Imaj9（C E G B D）に着地し、思いがけず「裏門」から家に帰る。属七が 1 段上に解決するのは偽終止。', 'Beware: Shelton Berg uses “backdoor” for an unrelated progression: after a iiø7 – V7 toward a tonicised iii (in C, ♯ivø7 – VII7), it lands not on iii7 (E G B D) but on the very similar Imaj9 (C E G B D), arriving home unexpectedly by the back door. A dominant seventh resolving up a step is a deceptive cadence.'),
        ],
      },
      {
        id: 'b48x-e6', type: 'discover', practice: true, ref: 'wiki-backdoor',
        prompt: t('C 调的"马里奥终止"（后门 IV–V）是？', 'C の「マリオ終止」（バックドア IV–V）は？', 'The “Mario cadence” (backdoor IV–V) in C is…'),
        options: ['A♭maj7 – B♭7 – C', 'Fm7 – B♭7 – C', 'F – G7 – C'],
        answer: 0,
        insight: { title: t('♭VI – ♭VII – I', '♭VI – ♭VII – I', '♭VI – ♭VII – I'), text: t('♭VI M7 = A♭maj7，♭VII7 = B♭7；Fm7 – B♭7 – C 是后门 ii–V。', '♭VI M7 = A♭maj7、♭VII7 = B♭7。Fm7 – B♭7 – C はバックドア ii–V。', '♭VI M7 = A♭maj7, ♭VII7 = B♭7; Fm7 – B♭7 – C is the backdoor ii–V.') },
      },
      {
        id: 'b48x-e7', type: 'page', ref: 'wiki-coltrane',
        title: t('进阶 4 · Coltrane 进行：大三度的魔方', '発展 4・コルトレーン・チェンジ：長 3 度の魔方陣', 'Advanced 4 · Coltrane changes: a major-third matrix'),
        text: [
          t('Coltrane 进行（又叫 Coltrane Matrix、半音三度关系、多主音进行）是在常见进行上用替代和弦的一种模式。Coltrane 先在《Bags & Trane》（《Three Little Words》）和《Cannonball Adderley Quintet in Chicago》（《Limehouse Blues》）里展示，1960 年的专辑《Giant Steps》里在《Giant Steps》和《Countdown》中扩展；《Countdown》是 Eddie Vinson《Tune Up》的再和声（维基的说法；OMT 把《Tune Up》记在 Miles Davis 名下）。它替代 ii–V–I，根音按大三度上下移动、勾出一个增三和弦——爵士里通常是五度根音运动，三度根音运动很少见。"Countdown 公式"：把四小节的 Dm7 | G7 | C | C 换成 Dm7 E♭7 | A♭ B7 | E G7 | C。', 'コルトレーン・チェンジ（コルトレーン・マトリクス、半音的 3 度関係、マルチトニック・チェンジとも）は、よくある進行に代理和音を使う型。コルトレーンはまず《Bags & Trane》（《Three Little Words》）と《Cannonball Adderley Quintet in Chicago》（《Limehouse Blues》）で示し、1960 年のアルバム《Giant Steps》の《Giant Steps》と《Countdown》で発展させた。《Countdown》はエディ・ヴィンソン《Tune Up》のリハーモナイズ（ウィキペディアの説。OMT は《Tune Up》をマイルス・デイヴィスの曲とする）。ii–V–I を置き換え、根音が長 3 度ずつ上下して増三和音をなぞる——ジャズの根音はふつう 5 度で動き、3 度の動きは珍しい。「カウントダウン公式」：4 小節の Dm7 | G7 | C | C を Dm7 E♭7 | A♭ B7 | E G7 | C に。', 'Coltrane changes (the Coltrane matrix or cycle, chromatic third relations, multi-tonic changes) are a pattern of substitute chords over common progressions. Coltrane first showed them on Bags & Trane (“Three Little Words”) and Cannonball Adderley Quintet in Chicago (“Limehouse Blues”), then expanded them on the 1960 album Giant Steps in “Giant Steps” and “Countdown” — the latter a reharmonisation of Eddie Vinson’s “Tune Up” (per Wikipedia; OMT credits “Tune Up” to Miles Davis). They replace ii–V–I with roots moving by major thirds, outlining an augmented triad — unusual in jazz, where fifth motion is the norm. The “Countdown formula” turns Dm7 | G7 | C | C into Dm7 E♭7 | A♭ B7 | E G7 | C.'),
          t('影响：William Paterson 大学的 David Demsey 指出，Coltrane 去世后有人认为他对"半音三度关系"的执着来自宗教或灵性（三个相等的调区像"魔法三角""三位一体"），但这些三度关系的来源其实更"世俗"、更有历史；他也研究印度拉格。Coltrane 跟 Dennis Sandole 学和声、在费城的 Granoff 音乐学校学习，还研究过 Nicolas Slonimsky 的《音阶与旋律型宝典》（1947）。Richard Rodgers 的《Have You Met Miss Jones?》（1937）桥段已经有大三度转调，早于 Tadd Dameron 的《Lady Bird》（Coltrane 的《Lazy Bird》就以它命名）；《Giant Steps》和《Countdown》的增三和弦调性循环可能都受它启发。', '影響：ウィリアム・パターソン大学のデヴィッド・デムジーによれば、コルトレーンの死後、彼の「半音的 3 度関係」へのこだわりは宗教や精神性（3 つの等しい調域が「魔法の三角形」「三位一体」）から来たと言われたが、実はもっと「地上的」で歴史的な由来がある。彼はインドのラーガも研究した。デニス・サンドールに和声を学び、フィラデルフィアのグラノフ音楽学校で学び、ニコラス・スロニムスキー『音階と旋律パターンのシソーラス』（1947）も研究した。リチャード・ロジャース《Have You Met Miss Jones?》（1937）のブリッジにはすでに長 3 度の転調があり、タッド・ダメロン《Lady Bird》（コルトレーン《Lazy Bird》の名の由来）より前。《Giant Steps》と《Countdown》の増三和音による調の循環は、どちらもそこから着想を得たのかもしれない。', 'Influences: David Demsey of William Paterson University notes that after Coltrane’s death his “preoccupation with chromatic third-relations” was attributed to religion or spirituality (three equal key areas as a “magic triangle” or “the trinity”), but shows their origins were more “earthly” and historical; he also studied Indian ragas. Coltrane studied harmony with Dennis Sandole and at the Granoff School of Music in Philadelphia, and studied Nicolas Slonimsky’s Thesaurus of Scales and Melodic Patterns (1947). The bridge of Richard Rodgers’s “Have You Met Miss Jones?” (1937) already modulated by major thirds, predating Tadd Dameron’s “Lady Bird” (after which Coltrane named “Lazy Bird”); “Giant Steps” and “Countdown” may both owe their augmented cycles to it.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('原来', '元', 'original'), cells: ['Dm7', 'G7', 'C', 'C'] }, { label: 'Countdown', cells: ['Dm7 E♭7', 'A♭ B7', 'E G7', 'C'] }] },
      },
      {
        id: 'b48x-e8', type: 'discover', practice: true, ref: 'wiki-coltrane',
        prompt: t('Coltrane 进行的根音运动为什么在爵士里不寻常？', 'コルトレーン・チェンジの根音の動きがジャズで珍しいのはなぜ？', 'Why is the root motion of Coltrane changes unusual in jazz?'),
        options: [t('根音按大三度移动，而爵士通常按五度移动', '根音が長 3 度で動くが、ジャズはふつう 5 度で動く', 'Roots move by major thirds, whereas jazz normally moves by fifths'), t('根音完全不动', '根音がまったく動かない', 'The roots never move'), t('只用小三和弦', '短三和音だけを使う', 'It uses only minor triads')],
        answer: 0,
        insight: { title: t('三个调中心勾出一个增三和弦', '3 つの調の中心が増三和音をなぞる', 'Three key centres outline an augmented triad'), text: t('A♭、E、C 相隔大三度，合起来是一个增三和弦。', 'A♭・E・C は長 3 度ずつ離れ、合わせると増三和音。', 'A♭, E and C lie a major third apart, together an augmented triad.') },
      },
      {
        id: 'b48x-e9', type: 'page', ref: 'wiki-harmonization',
        title: t('进阶 5 · 再和声：一个音，很多种配法', '発展 5・リハーモナイズ：1 つの音に多くの付け方', 'Advanced 5 · Reharmonisation: one note, many harmonies'),
        text: [
          t('再和声是保留现有旋律、改变伴奏和声的技巧，通常是为了增加趣味或变化。一个旋律音可以有很多种配法：E 可以配 E 大三和弦（当根音）、C 大三和弦（当三音）、Dm7（当九音）、A♭ 增三和弦（当 ♯5）等等。但再和声通常不只对付一个音，而是一整条旋律线：同一个和弦下面往往有好几个旋律音，都要考虑。例如原来配 E♭maj7 的旋律 E♭–F–G，换成 D7 就不太好——每个旋律音都和和弦音形成半音或小九度的冲突；有经验的编曲者可能故意用这种很不协和的和弦，但需要好耳朵和深入的和声理解。', 'リハーモナイズは既存の旋律を保ったまま伴奏の和声を変える技法で、ふつう面白さや変化のために行う。1 つの旋律音には多くの付け方がある：E には E の長三和音（根音として）、C の長三和音（3 度として）、Dm7（9 度として）、A♭ の増三和音（♯5 として）など。だがリハーモナイズはふつう 1 音でなく旋律線全体を扱う：1 つの和音の下にいくつも旋律音があり、すべてを考える必要がある。たとえば E♭maj7 が付いていた旋律 E♭–F–G を D7 にするのはあまりよくない——どの旋律音も和音の音と半音か短 9 度でぶつかる。経験ある編曲者はこうした強い不協和をあえて使うこともあるが、よい耳と深い和声の理解が必要。', 'Reharmonisation keeps an existing melody and alters its accompanying harmony, usually for interest or variety. One melodic tone can be harmonised many ways: E as the root of E major, the third of C major, the ninth of Dm7, the ♯5 of A♭ augmented, and more. But reharmonisation usually deals with a whole line: several melody notes may sit over one harmony, and all must be considered. A melody E♭–F–G originally over E♭maj7 would fare badly over D7 — every melody note forms a semitone or minor-ninth clash with the chord; experienced arrangers may choose such dissonance deliberately, but it takes a good ear and deep harmonic understanding.'),
          t('在爵士里，再和声通常指给一首曲子的部分或全部换上新的和弦进行：乐手常拿著名标准曲的旋律，改它的和声，让它听起来更现代、更前卫。Art Tatum 是再和声的先驱，之后 John Coltrane、Miles Davis 和 Bill Evans 最早认真探索它的可能，如今它已是爵士乐手和编曲者的基本工具。', 'ジャズではリハーモナイズはふつう曲の一部または全部に新しいコード進行を付け直すことを指す：奏者は有名なスタンダードの旋律を取り、和声を変えて、より現代的・前衛的に響かせる。アート・テイタムはリハーモナイズの先駆者で、のちにジョン・コルトレーン、マイルス・デイヴィス、ビル・エヴァンスが最初にその可能性を本格的に探った。今ではジャズ奏者と編曲者の必須の道具。', 'In jazz the term usually means refitting some or all of a tune with a new progression: players take a well-known standard’s melody and alter the changes to sound more contemporary or progressive. Art Tatum was a pioneer; later John Coltrane, Miles Davis and Bill Evans were among the first to explore it seriously, and it is now an essential tool for jazz players and arrangers.'),
        ],
      },
      {
        id: 'b48x-e10', type: 'discover', practice: true, ref: 'wiki-harmonization',
        prompt: t('旋律音 E 配在哪个和弦上，会成为它的 ♯5？', '旋律音 E がどの和音で ♯5 になる？', 'Over which chord does the melody note E become the ♯5?'),
        options: [t('A♭ 增三和弦（A♭ C E）', 'A♭ の増三和音（A♭ C E）', 'A♭ augmented (A♭ C E)'), t('Dm7', 'Dm7', 'Dm7'), t('C 大三和弦', 'C の長三和音', 'C major')],
        answer: 0,
        insight: { title: t('同一个 E，四种身份', '同じ E に 4 つの役', 'One E, four identities'), text: t('E 在 E 大三里是根音、在 C 里是三音、在 Dm7 里是九音、在 A♭ 增三和弦里是 ♯5。', 'E は E 長三和音で根音、C で 3 度、Dm7 で 9 度、A♭ の増三和音で ♯5。', 'E is the root of E major, the third of C, the ninth of Dm7, the ♯5 of A♭ augmented.') },
      },
      {
        id: 'b48x-e11', type: 'page', ref: 'soundquest-blk',
        title: t('进阶 6 · Blackadder 和弦：一个"总称"', '発展 6・ブラックアダー・コード：1 つの「総称」', 'Advanced 6 · The Blackadder chord: an umbrella term'),
        text: [
          t('"Blackadder 和弦"是音乐研究者 Joshua Taipale 为一种现代流行和弦起的名字，2017 年在 YouTube 视频里解释：他在《Love Live! Sunshine!!》的《Guilty Eyes Fever》里听到一个很陌生的和弦，后来又在另外几首曲子里遇到同样的和弦，问爵士乐迷也没人认得，于是重新分析并起了这个名字；他找到 7 首用例，如今一张表格里收集了更多例子。视频里的定义是：一个增三和弦，低音放在它根音上方全音的位置（例如 B♭aug/C）。用音程说，就是根音加上它上方 2、6、10 个半音的音：[0, 2, 6, 10]。', '「ブラックアダー・コード」は音楽研究家ジョシュア・タイパレが現代ポップスのあるコードに付けた名前で、2017 年に YouTube 動画で解説された：《ラブライブ！サンシャイン!!》の《Guilty Eyes Fever》にとても聞き慣れないコードが出てきて、のちに別の曲でも同じコードに出会い、ジャズ・ファンに尋ねても誰も知らなかったので、改めて分析して名前を付けた。本人は 7 曲の例を見つけ、今ではスプレッドシートにもっと多くの例が集められている。動画での定義は、増三和音に対し、その根音の全音上をベースに据えたスラッシュ・コード（たとえば B♭aug/C）。音程で言えば、根音とその 2・6・10 半音上の音：[0, 2, 6, 10]。', '“Blackadder chord” is the name music researcher Joshua Taipale gave a modern pop chord, explained in a 2017 YouTube video: he heard a very unfamiliar chord in “Guilty Eyes Fever” from Love Live! Sunshine!!, met it again in several other songs, found no jazz fan who recognised it, and analysed and named it; he found seven examples, and a spreadsheet now collects many more. The video defines it as an augmented triad over a bass a whole step above its root (e.g. B♭aug/C). In intervals: a root plus the notes 2, 6 and 10 semitones above it, [0, 2, 6, 10].'),
          t('麻烦在于，[0, 2, 6, 10] 不一定最适合读成"增三和弦 + 高全音的低音"。它也可以看成省略三音的张力和弦——补上不存在的大三度，它就是属九和弦的变种，写成 9(♭5)omit3 或 +6(+11)omit3 之类；再加上同音异名的拼法问题（6 个半音是增四还是减五？10 个半音通常是小七，偶尔是增六）。所以"Blackadder 和弦"不对应单一的和弦名，而是一个包含好几种可能的"总称"——和斯克里亚宾的神秘和弦、瓦格纳的特里斯坦和弦不同，它没有一份谱子，只有共同的 [0, 2, 6, 10] 结构。', '厄介なのは、[0, 2, 6, 10] を「増三和音 + 全音上のベース」と読むのが常に最適とは限らないこと。3 度を省いたテンション・コードとも見なせる——ない長 3 度を補えばドミナント・ナインスの亜種になり、9(♭5)omit3 や +6(+11)omit3 などと書ける。さらに異名同音の綴りの問題（6 半音は増 4 度か減 5 度か、10 半音はたいてい短 7 度だがまれに増 6 度）。だから「ブラックアダー・コード」は 1 つのコード名に対応せず、いくつもの可能性を含む「総称」——スクリャービンの神秘和音やワーグナーのトリスタン和音と違い、楽譜はなく、共通しているのは [0, 2, 6, 10] の形だけ。', 'The catch: [0, 2, 6, 10] isn’t always best read as “augmented triad over a bass a tone above”. It can also be a tension chord with the third omitted — supply the missing major third and it is a variant dominant ninth, written 9(♭5)omit3 or +6(+11)omit3 and the like; and enharmonic spelling complicates it further (is 6 semitones an augmented fourth or diminished fifth? 10 is usually a minor seventh, occasionally an augmented sixth). So “Blackadder chord” names no single chord symbol but an umbrella of possibilities — unlike Scriabin’s mystic chord or Wagner’s Tristan chord, it has no score behind it, only the shared [0, 2, 6, 10] shape.'),
        ],
      },
      {
        id: 'b48x-e12', type: 'discover', practice: true, ref: 'soundquest-blk',
        prompt: t('Blackadder 和弦用半音数表示是哪种结构？', 'ブラックアダー・コードを半音数で表すと？', 'In semitones above its root, the Blackadder chord is…'),
        options: ['[0, 2, 6, 10]', '[0, 4, 8]', '[0, 3, 6, 9]'],
        answer: 0,
        insight: { title: t('全都在一个全音音阶里', 'すべて 1 つの全音音階に', 'All in one whole-tone scale'), text: t('C、D、F♯、B♭：低音 C 加上 B♭ 增三和弦（B♭ D F♯）。[0, 4, 8] 是增三和弦，[0, 3, 6, 9] 是减七和弦。', 'C・D・F♯・B♭：ベース C と B♭ の増三和音（B♭ D F♯）。[0, 4, 8] は増三和音、[0, 3, 6, 9] は減七。', 'C, D, F♯, B♭: bass C under a B♭ augmented triad (B♭ D F♯). [0, 4, 8] is an augmented triad, [0, 3, 6, 9] a diminished seventh.') },
      },
    ],
    experiment: [
      { id: 'b48x-x1', type: 'experiment', toy: 'progression', ref: ['wiki-harmonization', 'omt2e-substitutions'],
        prompt: t('维基的例子：C | Am7 | Dm7 | G7 | C 组合几种替代后变成 E7 A7 | B♭m7 E♭7 | D7 F7 | A♭maj7 D♭maj7 | C。先点"原来"，再点"组合替代"，然后一个槽位一个槽位地切换：哪一步换来的是副属，哪一步是三全音替代？', 'ウィキペディアの例：C | Am7 | Dm7 | G7 | C にいくつもの代理を組み合わせると E7 A7 | B♭m7 E♭7 | D7 F7 | A♭maj7 D♭maj7 | C。まず「元」、次に「代理の組み合わせ」を押し、それからスロットを 1 つずつ切り替えよう：どれが副属で、どれが裏コード？', 'Wikipedia’s example: combining substitutions turns C | Am7 | Dm7 | G7 | C into E7 A7 | B♭m7 E♭7 | D7 F7 | A♭maj7 D♭maj7 | C. Press “Original”, then “Combined”, then switch slot by slot: which steps bring applied dominants, which tritone subs?'),
        params: { gap: 800, slots: [
          slotX('T', ['C', RV.C], ['E7', RV.E7]), slotX('T', ['C', RV.C], ['A7', RV.A7]), slotX('T', ['Am7', RV.Am7], ['B♭m7', RV.Bbm7]), slotX('T', ['Am7', RV.Am7], ['E♭7', RV.Eb7]),
          slotX('PD', ['Dm7', RV.Dm7], ['D7', RV.D7]), slotX('PD', ['Dm7', RV.Dm7], ['F7', RV.F7]), slotX('D', ['G7', RV.G7], ['A♭maj7', RV.Abmaj7]), slotX('D', ['G7', RV.G7], ['D♭maj7', RV.Dbmaj7]), slotX('T', ['C', RV.Cend]),
        ], presets: [
          { label: t('原来', '元', 'Original'), picks: [0, 0, 0, 0, 0, 0, 0, 0, 0], explain: t('C | Am7 | Dm7 | G7 | C：每个和弦占两个槽位。', 'C | Am7 | Dm7 | G7 | C：各和音が 2 スロットを占める。', 'C | Am7 | Dm7 | G7 | C: each chord fills two slots.') },
          { label: t('组合替代', '代理の組み合わせ', 'Combined'), picks: [1, 1, 1, 1, 1, 1, 1, 1, 0], explain: t('E7 A7 | B♭m7 E♭7 | D7 F7 | A♭maj7 D♭maj7 | C：维基给出的组合结果。', 'E7 A7 | B♭m7 E♭7 | D7 F7 | A♭maj7 D♭maj7 | C：ウィキペディアが示す組み合わせ。', 'E7 A7 | B♭m7 E♭7 | D7 F7 | A♭maj7 D♭maj7 | C: Wikipedia’s combined result.') },
        ] },
        breakthrough: { id: 'b48x-combo', text: t('你一步一步拆开了一段复杂的再和声。', '複雑なリハーモナイズを 1 歩ずつ分解できた。', 'You took a complex reharmonisation apart step by step.') } },
    ],
    challenge: [
      {
        id: 'b48x-c1', type: 'choice', error: 'substitution', skills: ['function'], ref: 'omt2e-substitutions',
        variants: [
          { prompt: t('三种替代里，哪一种是爵士独有的？', '3 つの代理のうちジャズ独自のものは？', 'Of the three substitution types, which is unique to jazz?'), options: [t('三全音替代', '裏コード', 'The tritone substitution'), t('副属替代', '副属による代理', 'Applied chords'), t('调式混合', 'モーダル・インターチェンジ', 'Mode mixture')] },
          { prompt: t('认出三全音替代的一个办法是？', '裏コードを見分ける方法の 1 つは？', 'One way to recognise a tritone sub is…'), options: [t('它向下小二度半音解决', '短 2 度下へ半音で解決する', 'it resolves chromatically down a minor second'), t('它向上纯四度解决', '完全 4 度上へ解決する', 'it resolves up a perfect fourth'), t('它是小七和弦', '短七の和音', 'it is a minor seventh chord')] },
          { prompt: t('和弦记号写在括号里的替代表示？', 'コード記号で括弧に入った代理の意味は？', 'A substitution written in parentheses means it is…'), options: [t('可选的', '任意', 'optional'), t('必须的', '必須', 'mandatory'), t('错误的', '誤り', 'a mistake')] },
        ],
        answer: 0,
        explain: t('三全音替代是爵士独有；它向下小二度解决；括号里的替代是可选的。', '裏コードはジャズ独自。短 2 度下へ解決する。括弧の代理は任意。', 'The tritone sub is unique to jazz; it resolves down a minor second; parenthesised substitutions are optional.'),
      },
      {
        id: 'b48x-c2', type: 'choice', error: 'substitution', skills: ['function'], ref: 'wiki-backdoor',
        variants: [
          { prompt: t('F 调的后门进行是？', 'F のバックドア進行は？', 'The backdoor progression in F is…'), options: ['B♭m7 – E♭7 – F', 'Gm7 – C7 – F', 'D♭maj7 – E♭7 – F'] },
          { prompt: t('后门进行里的 ♭VII7 是从哪里借来的？', 'バックドアの ♭VII7 はどこから借りた？', 'Where is the backdoor ♭VII7 borrowed from?'), options: [t('同主音小调', '同主短調', 'the parallel minor'), t('属调', '属調', 'the dominant key'), t('关系小调', '平行調', 'the relative minor')] },
          { prompt: t('"后门进行"这个名字是谁的说法？', '「バックドア進行」は誰の言い方？', 'Whose term is “backdoor progression”?'), options: [t('Jerry Coker', 'ジェリー・コーカー', 'Jerry Coker'), t('George Russell', 'ジョージ・ラッセル', 'George Russell'), t('Barry Harris', 'バリー・ハリス', 'Barry Harris')] },
        ],
        answer: 0,
        explain: t('F 调 iv7 = B♭m7、♭VII7 = E♭7；♭VII7 借自同主音小调；名字出自 Jerry Coker。', 'F の iv7 = B♭m7、♭VII7 = E♭7。♭VII7 は同主短調から。名前はジェリー・コーカー。', 'In F, iv7 = B♭m7, ♭VII7 = E♭7; ♭VII7 comes from the parallel minor; the term is Jerry Coker’s.'),
      },
      {
        id: 'b48x-c3', type: 'choice', error: 'key-center', skills: ['function'], ref: 'wiki-coltrane',
        variants: [
          { prompt: t('"Countdown 公式"把 Dm7 | G7 | C | C 换成？', '「カウントダウン公式」は Dm7 | G7 | C | C を何に？', 'The Countdown formula turns Dm7 | G7 | C | C into…'), options: ['Dm7 E♭7 | A♭ B7 | E G7 | C', 'Dm7 D♭7 | C | C | C', 'Dm7 G7 | Em7 A7 | Dm7 G7 | C'] },
          { prompt: t('Coltrane 最早在哪首曲子里展示这种替代？', 'コルトレーンがこの代理を最初に示した曲は？', 'In which track did Coltrane first demonstrate these substitutions?'), options: [t('《Three Little Words》（《Bags & Trane》）', '《Three Little Words》（《Bags & Trane》）', '“Three Little Words” (Bags & Trane)'), t('《So What》', '《So What》', '“So What”'), t('《Blue Monk》', '《Blue Monk》', '“Blue Monk”')] },
          { prompt: t('哪首 1937 年的标准曲桥段已经有大三度转调？', '1937 年のどのスタンダードのブリッジにすでに長 3 度の転調がある？', 'Which 1937 standard already modulates by major thirds in its bridge?'), options: [t('《Have You Met Miss Jones?》', '《Have You Met Miss Jones?》', '“Have You Met Miss Jones?”'), t('《Misty》', '《Misty》', '“Misty”'), t('《Satin Doll》', '《Satin Doll》', '“Satin Doll”')] },
        ],
        answer: 0,
        explain: t('Countdown 公式：Dm7 E♭7 | A♭ B7 | E G7 | C；最早见于《Three Little Words》和《Limehouse Blues》；《Have You Met Miss Jones?》（1937）桥段已有大三度转调。', 'カウントダウン公式：Dm7 E♭7 | A♭ B7 | E G7 | C。最初は《Three Little Words》と《Limehouse Blues》。《Have You Met Miss Jones?》（1937）のブリッジにすでに長 3 度の転調。', 'Countdown formula: Dm7 E♭7 | A♭ B7 | E G7 | C; first on “Three Little Words” and “Limehouse Blues”; “Have You Met Miss Jones?” (1937) already modulates by major thirds.'),
      },
      {
        id: 'b48x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: ['wiki-harmonization', 'soundquest-blk'],
        variants: [
          { prompt: t('谁被称为爵士再和声的先驱？', 'ジャズのリハーモナイズの先駆者とされるのは？', 'Who is called a pioneer of jazz reharmonisation?'), options: [t('Art Tatum', 'アート・テイタム', 'Art Tatum'), t('Joshua Taipale', 'ジョシュア・タイパレ', 'Joshua Taipale'), t('Thad Jones', 'サド・ジョーンズ', 'Thad Jones')] },
          { prompt: t('Blackadder 和弦最早是在哪首曲子里被注意到的？', 'ブラックアダー・コードが最初に注目された曲は？', 'In which song was the Blackadder chord first noticed?'), options: [t('《Guilty Eyes Fever》', '《Guilty Eyes Fever》', '“Guilty Eyes Fever”'), t('《Giant Steps》', '《Giant Steps》', '“Giant Steps”'), t('《Misirlou》', '《Misirlou》', '“Misirlou”')] },
          { prompt: t('为什么说"Blackadder 和弦"是一个"总称"？', 'なぜ「ブラックアダー・コード」は「総称」なのか？', 'Why is “Blackadder chord” an umbrella term?'), options: [t('同一个 [0, 2, 6, 10] 结构可以有好几种和弦名和拼法', '同じ [0, 2, 6, 10] の形にいくつものコード名と綴りがありうる', 'One [0, 2, 6, 10] shape admits several chord names and spellings'), t('它有一份固定的谱子', '決まった楽譜があるから', 'It has one fixed score'), t('它只出现在一首歌里', '1 曲にしか出ないから', 'It appears in only one song')] },
        ],
        answer: 0,
        explain: t('Art Tatum 是再和声先驱；Blackadder 和弦因《Guilty Eyes Fever》被注意到；它是一个包含多种读法的总称。', 'アート・テイタムがリハーモナイズの先駆者。ブラックアダー・コードは《Guilty Eyes Fever》で注目された。複数の読み方を含む総称。', 'Art Tatum pioneered reharmonisation; the Blackadder chord was noticed in “Guilty Eyes Fever”; it is an umbrella of several readings.'),
      },
      G('b48x-g1', 'tritoneSub', 1, ['function']),
      G('b48x-g2', 'secondaryDominant', 1, ['function']),
    ],
  },
  pool: [G('b48x-p1', 'tritoneSub', 2, ['function']), G('b48x-p2', 'secondaryDominant', 2, ['function'])],
};

// ===================== B4-9x 负和声与 LCC · 扩展关 =====================
// 对应 A 面：negharmony（单音 / 和弦 / 来历 / 综合）+ lcc（调性顺序 / 七个主要音阶 / Lydian 主音 / 综合）
// LCC 的七个主要音阶（aizcutei-lcc 的表；Aux. Augmented = 全音、Aux. Diminished = 减音阶（全半）、Aux. Diminished Blues = 属减（半全））
const LCC_SETS = [
  { id: 'lyd', label: t('Lydian', 'リディアン', 'Lydian'), steps: [0, 2, 4, 6, 7, 9, 11], mark: 3, markNote: t('调性顺序的前七个音：♯4 代替 4', 'トーナル・オーダーの最初の 7 音：4 の代わりに ♯4', 'the first seven tones of the tonal order: ♯4 instead of 4'), noKey: true },
  { id: 'lydaug', label: t('Lydian Augmented', 'リディアン・オーギュメンテッド', 'Lydian Augmented'), steps: [0, 2, 4, 6, 8, 9, 11], mark: 4, markNote: t('嵌入调性顺序第 8 个音：♯5', 'トーナル・オーダーの 8 番目を入れる：♯5', 'tonal-order tone 8 added: ♯5'), noKey: true },
  { id: 'lyddim', label: t('Lydian Diminished', 'リディアン・ディミニッシュト', 'Lydian Diminished'), steps: [0, 2, 3, 6, 7, 9, 11], mark: 2, markNote: t('嵌入调性顺序第 9 个音：♭3', 'トーナル・オーダーの 9 番目を入れる：♭3', 'tonal-order tone 9 added: ♭3'), noKey: true },
  { id: 'lydb7', label: t('Lydian Flat 7th', 'リディアン・フラット・セブンス', 'Lydian Flat 7th'), steps: [0, 2, 4, 6, 7, 9, 10], mark: 6, markNote: t('嵌入调性顺序第 10 个音：♭7', 'トーナル・オーダーの 10 番目を入れる：♭7', 'tonal-order tone 10 added: ♭7'), noKey: true },
  { id: 'auxaug', label: t('Aux. Augmented（= 全音音阶）', 'Aux. オーギュメンテッド（= 全音音階）', 'Aux. Augmented (= whole-tone)'), steps: [0, 2, 4, 6, 8, 10], degrees: [0, 1, 2, 3, 4, 5], noKey: true },
  { id: 'auxdim', label: t('Aux. Diminished（= 减音阶，全半）', 'Aux. ディミニッシュト（= ディミニッシュ、全半）', 'Aux. Diminished (= diminished, whole–half)'), steps: [0, 2, 3, 5, 6, 8, 9, 11], degrees: [0, 1, 2, 3, 4, 5, 5, 6], noKey: true },
  { id: 'auxdimblues', label: t('Aux. Diminished Blues（= 属减，半全）', 'Aux. ディミニッシュト・ブルース（= ドミナント・ディミニッシュ、半全）', 'Aux. Diminished Blues (= dominant diminished, half–whole)'), steps: [0, 1, 3, 4, 6, 7, 9, 10], degrees: [0, 1, 1, 2, 3, 4, 5, 6], noKey: true },
];
const EXT_B4_9 = {
  minutes: 22,
  insight: t('负和声和 LCC 都想回答"为什么会有引力"：一个用镜子（主音与属音之间的轴）翻转，保留回家的拉力；一个用五度阶梯，把 Lydian 当作最"统一"的音阶。两者都是理论家的视角，不是唯一的真理。', '負の和声も LCC も「なぜ引力があるのか」に答えようとする：一方は鏡（主音と属音の間の軸）で反転し、帰る引力を保つ。もう一方は 5 度の梯子で、リディアンを最も「統一された」音階とする。どちらも理論家の視点で、唯一の真理ではない。', 'Negative harmony and LCC both ask why tonal gravity exists: one flips everything in a mirror between tonic and dominant, keeping the pull home; the other climbs a ladder of fifths and treats Lydian as the most unified scale. Both are theorists’ perspectives, not the only truth.'),
  sections: {
    discover: [
      {
        id: 'b49x-d1', type: 'discover', ref: 'wiki-negative-harmony',
        prompt: t('从 C 往上叠一个大三度和一个纯五度得到 C E G。如果从 C 往下叠同样的两个音程呢？', 'C から上に長 3 度と完全 5 度を積むと C E G。同じ 2 つの音程を C から下に積むと？', 'Stacking a major third and a perfect fifth up from C gives C E G. What do the same intervals give stacked down from C?'),
        play: [{ label: t('往上', '上へ', 'Up'), audio: { notes: [[60, 64, 67]], mode: 'chords' } }, { label: t('往下', '下へ', 'Down'), audio: { notes: [[53, 56, 60]], mode: 'chords' } }],
        options: [t('C A♭ F：F 小三和弦', 'C A♭ F：F の短三和音', 'C A♭ F: an F minor triad'), t('C A F：F 大三和弦', 'C A F：F の長三和音', 'C A F: an F major triad'), t('还是 C 大三和弦', 'やはり C の長三和音', 'Still C major')],
        answer: 0,
        insight: {
          title: t('大三和弦的"反面"', '長三和音の「裏」', 'The flip side of major'),
          text: t('意大利理论家 Zarlino（1517–1590）发现：把建构大三和弦的过程倒过来——从同一个音往下叠大三度和纯五度——就得到小三和弦，于是认为大小三和弦是"极性相反"的。这个想法两百年没人注意，直到小提琴家 Tartini（1692–1770）用弦长划分来解释小三和弦时才引用它。', 'イタリアの理論家ツァルリーノ（1517–1590）は、長三和音を作る手順を逆にする——同じ音から下へ長 3 度と完全 5 度を積む——と短三和音になることに気づき、長短の三和音は「極性が反対」だと考えた。この考えは 200 年間注目されず、ヴァイオリニストのタルティーニ（1692–1770）が弦の長さの分割で短三和音を説明しようとしたときに引用した。', 'The Italian theorist Zarlino (1517–1590) noticed that inverting the process of building a major triad — stacking a major third and perfect fifth down from the same note — yields a minor triad, and concluded the two are polar opposites. The idea went unnoticed for two centuries until the violinist Tartini (1692–1770) cited it in explaining the minor triad by string-length division.'),
        },
      },
    ],
    explain: [
      {
        id: 'b49x-e1', type: 'page', ref: 'wiki-negative-harmony',
        title: t('进阶 1 · 从 Riemann 到 Levy：镜子放在哪里', '発展 1・リーマンからレヴィへ：鏡をどこに置くか', 'Advanced 1 · From Riemann to Levy: where to put the mirror'),
        text: [
          t('德国音乐学家 Hugo Riemann（1849–1919）把 Zarlino 视为现代和声论述的先驱，把 Zarlino、Tartini 等人的想法扩展成"和声二元论"（Riemann 理论）。他相信用"下方泛音列"作为小三和弦的理论基础——尽管下方泛音既听不到、也测不出来。', 'ドイツの音楽学者フーゴー・リーマン（1849–1919）はツァルリーノを近代和声論の先駆者とみなし、ツァルリーノやタルティーニらの考えを「和声二元論」（リーマン理論）に広げた。彼は短三和音の理論的基礎として「下方倍音列」に入れ込んだ——下方倍音は自然には聞こえず、検出もできないのに。', 'The German musicologist Hugo Riemann (1849–1919) saw Zarlino as the pioneer of modern harmonic discourse and expanded his, Tartini’s and others’ ideas into a broad theory of harmonic dualism (Riemannian theory). He invested in an undertone series as the basis of the minor triad, even though undertones are neither naturally audible nor detectable.'),
          t('Ernst Levy（1895–1981）在《A Theory of Harmony》里提出"极性理论"，并用"大地引力"（telluric gravity）一词补充二元论。他最重要的一步是挪动镜子的位置：不放在和弦根音上（Zarlino 例子里的 C），而放在根音与五音的中点——在 C 调里，是 E♭ 和 E 之间。"负和声"这个词并没有出现在 Levy 的书里。', 'エルンスト・レヴィ（1895–1981）は『A Theory of Harmony』で「極性理論」を唱え、「大地の引力」（telluric gravity）という語で二元論を補った。最も重要な一歩は鏡の位置を移したこと：和音の根音（ツァルリーノの例の C）ではなく、根音と 5 度の中点——ハ調では E♭ と E の間——に置いた。「負の和声」という語はレヴィの本には出てこない。', 'Ernst Levy (1895–1981), in A Theory of Harmony, proposed a “polarity theory”, adding the term “telluric gravity” to dualist thought. His key move was relocating the mirror: not at the chord’s root (the C of Zarlino’s example) but at the midpoint between root and fifth — in C, between E♭ and E. The term “negative harmony” does not appear in Levy’s text.'),
        ],
      },
      {
        id: 'b49x-e2', type: 'discover', practice: true, ref: 'wiki-negative-harmony',
        prompt: t('按 Levy 的做法，在 C 调里镜子放在哪里？', 'レヴィのやり方で、ハ調の鏡はどこ？', 'Following Levy, where is the mirror in C?'),
        options: [t('E♭ 和 E 之间（根音与五音的中点）', 'E♭ と E の間（根音と 5 度の中点）', 'Between E♭ and E (midway between root and fifth)'), t('在 C 上', 'C の上', 'On C'), t('在 F♯ 上', 'F♯ の上', 'On F♯')],
        answer: 0,
        insight: { title: t('C ↔ G、E ↔ E♭', 'C ↔ G、E ↔ E♭', 'C ↔ G, E ↔ E♭'), text: t('镜子在 C 和 G 的正中间：C 翻到 G，E 翻到 E♭，大三和弦 C E G 翻成 G E♭ C = C 小三和弦。', '鏡は C と G のちょうど真ん中：C は G に、E は E♭ に。長三和音 C E G は G E♭ C = C の短三和音に。', 'The mirror sits midway between C and G: C flips to G, E to E♭, and C E G becomes G E♭ C, a C minor triad.') },
      },
      {
        id: 'b49x-e3', type: 'page', ref: 'wiki-negative-harmony',
        title: t('进阶 2 · 命名与传播；和倒影不一样在哪', '発展 2・命名と広まり；反行形との違い', 'Advanced 2 · Naming and spread; how it differs from inversion'),
        text: [
          t('1970 年代末或 1980 年代初，萨克斯手 Steve Coleman 创造了"负和声"一词，用来描述他在萨克斯手 Von Freeman 的演奏中，以及 Charlie Parker、Art Tatum、John Coltrane、Sonny Rollins 等人作品里观察到的一些调性进行；到 1990 年代，他才把自己的想法和 Levy 的极性理论联系起来。Coleman 说他把这个概念告诉了音乐教育者 Barak Schmool，而 Schmool 教过 Jacob Collier。21 世纪，Collier 通过访谈和 YouTube 大师课让它广为人知；他并没有在自己的音乐里明确套用负和声的具体方法，而是感兴趣于：不靠正格终止（在五度圈上逆时针走），而用变格终止（顺时针走）也能得到回到主和弦的解决感与引力。', '1970 年代末か 1980 年代初め、サックス奏者スティーヴ・コールマンは「負の和声」という語を作り、サックス奏者フォン・フリーマンの演奏や、チャーリー・パーカー、アート・テイタム、ジョン・コルトレーン、ソニー・ロリンズらの作品に見られる調的な進行を表した。1990 年代になって自分の考えをレヴィの極性理論と結び付けた。コールマンによれば、この概念を音楽教育者バラク・シュムールに伝え、シュムールがジェイコブ・コリアーを教えた。21 世紀、コリアーはインタビューや YouTube のマスタークラスでこれを広めた。彼は自分の音楽で負の和声の方法を厳密には使っておらず、正格終止（五度圏を反時計回り）の代わりに変格終止（時計回り）でも主和音への解決感と引力を得られる、という点に関心がある。', 'In the late 1970s or early 1980s saxophonist Steve Coleman coined “negative harmony” for tonal progressions he observed in the playing of saxophonist Von Freeman and in Charlie Parker, Art Tatum, John Coltrane and Sonny Rollins; in the 1990s he linked it to Levy’s polarity theory. Coleman says he shared the concept with educator Barak Schmool, who taught Jacob Collier. In the 21st century Collier popularised it through interviews and YouTube masterclasses; he has not explicitly applied its exact methods in his music, but is interested in getting the same feeling of resolution and gravity to the tonic through plagal cadences (clockwise on the circle of fifths) instead of perfect cadences (counter-clockwise).'),
          t('做法：在某个调里，沿着五度圈上主音与属音之间切开的轴，把每个音翻过去。这样大三和弦变小三和弦（反之亦然），上行的音型变下行（反之亦然），但负的版本保留了和原来一样指向主音的功能拉力。它看起来像旋律倒影，但有两点不同：负和声对每个音严格反射，而调内倒影可能为了留在音阶里调整某些音；而且负的形式相对原来移了一个五度，而不是留在同一个调域。', 'やり方：ある調で、五度圏の主音と属音の間を切る軸に沿って各音を反転する。すると長三和音は短三和音に（逆も同様）、上行の音型は下行に（逆も同様）なるが、負の版は元と同じく主音へ向かう機能的な引力を保つ。旋律の反行に似ているが 2 点違う：負の和声はすべての音を厳密に反射するが、調内の反行は音階内にとどまるため一部の音を調整することがある。また負の形は元に対して 5 度移高され、同じ調域にとどまらない。', 'Method: within a key, flip each pitch across an axis cutting the circle of fifths between tonic and dominant. Major chords become minor and vice versa, ascending gestures descending and vice versa, yet the negative version keeps the same functional pull toward the tonic. It resembles melodic inversion but differs in two ways: negative harmony reflects every pitch strictly, whereas diatonic inversion may adjust pitches to stay in the scale; and the negative form is transposed by a fifth relative to the original rather than staying in the same key area.'),
        ],
      },
      {
        id: 'b49x-e4', type: 'discover', practice: true, ref: 'wiki-negative-harmony',
        prompt: t('"负和声"这个词是谁创造的？', '「負の和声」という語を作ったのは？', 'Who coined the term “negative harmony”?'),
        options: [t('Steve Coleman', 'スティーヴ・コールマン', 'Steve Coleman'), t('Ernst Levy', 'エルンスト・レヴィ', 'Ernst Levy'), t('Jacob Collier', 'ジェイコブ・コリアー', 'Jacob Collier')],
        answer: 0,
        insight: { title: t('Levy 定轴，Coleman 命名，Collier 推广', 'レヴィが軸、コールマンが命名、コリアーが普及', 'Levy’s axis, Coleman’s name, Collier’s reach'), text: t('Levy 的书里没有这个词；Coleman 1970 年代末或 80 年代初起名；Collier 让它广为人知。', 'レヴィの本にこの語はない。コールマンが 1970 年代末か 80 年代初めに命名し、コリアーが広めた。', 'Levy’s book lacks the term; Coleman coined it in the late 1970s or early 1980s; Collier made it widely known.') },
      },
      {
        id: 'b49x-e5', type: 'page', ref: 'george-russell-lcc',
        title: t('进阶 3 · LCC 的基本观念', '発展 3・LCC の基本的な考え', 'Advanced 3 · The core ideas of LCC'),
        text: [
          t('George Russell 的《利迪亚半音调性组织概念》（LCCOTO）1953 年首次出版，修订到第四版也是最终版，是 50 年持续发展的成果。它说的 Lydian 音阶"与大调的 Lydian 调式无关"：Russell 认为比传统的协和 / 不协和视角更客观的原则，体现在 Lydian 音阶自我组织的结构里——七个音、六个相距纯五度的音程；纯五度是"调性磁力"的基石，源自泛音列。音有在"调性引力"下结合的天性，引力中心叫 Lydian 主音：一串六个连续纯五度最下面的那个音。', 'ジョージ・ラッセル『リディアン・クロマティック・コンセプト』（LCCOTO）は 1953 年に初版が出て、第 4 版にして最終版まで改訂された、50 年にわたる発展の成果。そこでいうリディアン音階は「長調のリディア旋法とは関係ない」：ラッセルは、従来の協和・不協和の視点より客観的な原理がリディアン音階の自己組織的な構造——7 つの音、完全 5 度ずつの 6 つの音程——に現れると考える。完全 5 度は「調的な磁力」の礎で、倍音列に由来する。音には「調的引力」のもとで結び付く性質があり、引力の中心をリディアン・トニックという：連続する 6 つの完全 5 度のいちばん下の音。', 'George Russell’s Lydian Chromatic Concept of Tonal Organization (LCCOTO), first published in 1953 and revised to a fourth and final edition, is the fruit of 50 years’ development. Its Lydian scale is “not related to the Lydian mode of the Ionian major scale”: Russell argues that a more objective principle than consonance/dissonance lies in the Lydian scale’s self-organised structure — seven notes, six intervals of a perfect fifth; the fifth, building block of “tonal magnetism”, originates in the overtone series. Tones bond under a “tonal gravity”, centred on the Lydian tonic: the lowest tone of a ladder of six consecutive fifths.'),
          t('Lydian 音阶的"垂直"性质表达一种存在、完整的状态；大调的"水平"性质依靠功能和声（如属到主），表达寻求解决、"正在成为"的状态。七声的 Lydian 音阶是调性引力的基础，最终的表现是十二音的 Lydian 半音阶——十二平均律里共有 12 个（即五度圈），构成从"内行"（ingoing）到"外行"（outgoing）的 144 种音程。书里有一个听辨测试：分别以三度叠起 C 大调音阶和 C Lydian 音阶，问哪一个和 C 大三和弦更统一、更有终止感——多年来世界各地的测试里，大多数人选了 Lydian。', 'リディアン音階の「垂直」な性質は存在し完結した状態を、長音階の「水平」な性質は機能和声（属→主など）に頼り解決を求める「なりつつある」状態を表す。7 音のリディアン音階が調的引力の基礎で、その究極の表現が 12 音のリディアン・クロマティック・スケール——12 平均律に 12 個（つまり五度圏）あり、「イン」（ingoing）から「アウト」（outgoing）まで 144 の音程を作る。本には聴き比べのテストがある：ハ長調の音階と C リディアンをそれぞれ 3 度で積み、どちらが C の長三和音とより統一され終止感があるか——長年世界各地のテストで、多くの人がリディアンを選んだ。', 'The Lydian scale’s vertical nature conveys a state of being and completeness; the major scale’s horizontal nature, relying on functional harmony such as dominant–tonic, conveys becoming, seeking resolution. The seven-tone Lydian scale founds tonal gravity; its ultimate expression is the twelve-tone Lydian chromatic scale — twelve of them in equal temperament (the circle of fifths), a matrix of 144 intervals from ingoing to outgoing. The book offers a listening test: the C major scale and C Lydian, each stacked in thirds — which sounds more unified and final with a C major triad? In tests worldwide over the years, most people chose Lydian.'),
        ],
      },
      {
        id: 'b49x-e6', type: 'discover', practice: true, ref: 'george-russell-lcc',
        prompt: t('C G D A E B F♯ 这一串六个纯五度里，Lydian 主音是哪个音？', 'C G D A E B F♯ という 6 つの完全 5 度の列で、リディアン・トニックはどれ？', 'In the ladder of six fifths C G D A E B F♯, which tone is the Lydian tonic?'),
        options: [t('C（最下面的音）', 'C（いちばん下）', 'C (the lowest tone)'), t('F♯（最上面的音）', 'F♯（いちばん上）', 'F♯ (the top tone)'), t('G', 'G', 'G')],
        answer: 0,
        insight: { title: t('五度的主音是下面的音', '5 度の主音は下の音', 'A fifth’s tonic is its lower tone'), text: t('LCC：五度的主音是它下面的音，一串六个五度的主音就是最下面的音。C Lydian = C D E F♯ G A B。', 'LCC：5 度の主音は下の音、6 つの 5 度の列の主音はいちばん下の音。C リディアン = C D E F♯ G A B。', 'LCC: the tonic of a fifth is its lower tone, so a ladder of six fifths has its lowest tone as tonic. C Lydian = C D E F♯ G A B.') },
      },
      {
        id: 'b49x-e7', type: 'page', ref: ['george-russell-lcc', 'aizcutei-lcc'],
        title: t('进阶 4 · LCC 的历史影响；它和 CST 的不同', '発展 4・LCC の歴史的影響；CST との違い', 'Advanced 4 · LCC’s influence, and how it differs from CST'),
        text: [
          t('LCC 最初是 1953 年自费出版的小册子，被称为第一份来自爵士的理论贡献，引出了调式即兴，进而有了 Miles Davis 的《Kind of Blue》（1959 年 3 月开录）；Joachim Berendt 说它是"Miles Davis 和 John Coltrane 调式音乐的伟大开路者"。它放弃了统治西方音乐 350 多年的大小调体系，但在拉威尔、斯克里亚宾、德彪西乃至巴赫的作品里都有先例；它的根音阶沿泛音列从 C 到 C、用 F♯ 而不是 F。对 Miles、Coltrane、Bill Evans 等人，它提供了和声背景和继续探索的路径，也催生了 70、80 年代流行的"调式爵士"运动。武满彻说：LCC 是两本最出色的音乐书之一，另一本是梅西安的《我的音乐语言技巧》。', 'LCC は最初 1953 年に自費出版された小冊子で、ジャズから出た初めての理論的貢献とされ、モード即興を導き、マイルス・デイヴィス《Kind of Blue》（1959 年 3 月に録音開始）につながった。ヨアヒム・ベーレントは「マイルス・デイヴィスとジョン・コルトレーンのモードへの偉大な道を開いたもの」と言う。350 年以上西洋音楽を支配した長短調の体系を捨てたが、ラヴェル、スクリャービン、ドビュッシー、さらにはバッハにも先例がある。その根の音階は倍音列に従い C から C まで、F でなく F♯ を使う。マイルス、コルトレーン、ビル・エヴァンスらに和声的な背景と探求の道を与え、70〜80 年代に流行した「モード・ジャズ」運動も生んだ。武満徹は、LCC は最も素晴らしい音楽書 2 冊のうちの 1 冊で、もう 1 冊はメシアン『わが音楽語法』だと語った。', 'LCC began as a self-published pamphlet in 1953, called the first theoretical contribution to come from jazz; it introduced modal improvisation, leading to Miles Davis’s Kind of Blue (first session March 1959) — Joachim Berendt calls it “the great path-breaker for Miles Davis and John Coltrane’s modality”. It abandons the major-minor system that dominated Western music for over 350 years, yet has precedent in Ravel, Scriabin, Debussy and some of Bach; its root scale follows the overtone series from C to C with F♯ instead of F. For Miles, Coltrane, Bill Evans and later generations it offered a harmonic background and a path forward, and gave rise to the “modal” jazz movement popular in the ’70s and ’80s. Toru Takemitsu called it one of the two most splendid books about music, the other being Messiaen’s My Musical Language.'),
          t('和和弦—音阶理论（CST）比较：一般理论按调的中心配音阶（C 调 → C），CST 按和弦根音配调式（G7 → G Mixolydian），LCC 两者都不是：它给每个和弦找一个 Lydian 母音阶，其中心叫"Lydian 主音"——G7 用 F Lydian（全是白键），Cmaj7 用 C Lydian。除了大七和弦，其他和弦的调式中心和 Lydian 主音都是错开的，这个距离叫"Lydian Tonic Interval"（G7 是小七度或大二度）。在 ii–V–I–vi 里，Am7 也可以用 C Lydian，以避开有强烈倾向的 fa。', 'コード・スケール理論（CST）と比べると：一般の理論は調の中心で音階を当て（C 調 → C）、CST は和音の根音で旋法を当てる（G7 → G ミクソリディアン）。LCC はどちらでもない：各和音にリディアンの親音階を当て、その中心を「リディアン・トニック」と呼ぶ——G7 には F リディアン（すべて白鍵）、Cmaj7 には C リディアン。長七以外の和音では旋法の中心とリディアン・トニックがずれ、その距離を「リディアン・トニック・インターバル」という（G7 なら短 7 度または長 2 度）。ii–V–I–vi では Am7 にも C リディアンを使い、強い傾向を持つ fa を避けられる。', 'Compared with chord–scale theory: general theory assigns scales by key centre (C key → C), CST by chord root (G7 → G Mixolydian); LCC by neither — it gives each chord a Lydian parent scale centred on the “Lydian tonic”: G7 takes F Lydian (all white keys), Cmaj7 C Lydian. Except for major sevenths, a chord’s modal centre and Lydian tonic differ, by the “Lydian Tonic Interval” (for G7 a minor seventh or major second). In ii–V–I–vi, Am7 can also take C Lydian, avoiding the strongly tending fa.'),
        ],
      },
      {
        id: 'b49x-e8', type: 'discover', practice: true, ref: 'aizcutei-lcc',
        prompt: t('C 调里的 G7，一般理论、CST、LCC 分别配什么音阶？', 'ハ調の G7 に、一般の理論・CST・LCC はそれぞれどの音階を当てる？', 'For G7 in C, which scale does general theory, CST and LCC each assign?'),
        options: [t('C 大调 / G Mixolydian / F Lydian', 'ハ長調 / G ミクソリディアン / F リディアン', 'C major / G Mixolydian / F Lydian'), t('都是 G Mixolydian', 'すべて G ミクソリディアン', 'G Mixolydian for all'), t('C Lydian / G Lydian / F Lydian', 'C リディアン / G リディアン / F リディアン', 'C Lydian / G Lydian / F Lydian')],
        answer: 0,
        insight: { title: t('三种中心', '3 つの中心', 'Three centres'), text: t('按调（C）、按根音（G）、按 Lydian 主音（F）：F Lydian = F G A B C D E，全是白键。', '調で（C）、根音で（G）、リディアン・トニックで（F）：F リディアン = F G A B C D E、すべて白鍵。', 'By key (C), by root (G), by Lydian tonic (F): F Lydian = F G A B C D E, all white keys.') },
      },
    ],
    experiment: [
      { id: 'b49x-x1', type: 'experiment', toy: 'negative', ref: 'wiki-negative-harmony',
        prompt: t('这次放进几个借来的和弦。先点 Fm 和 B♭7（后门进行的两个和弦），看它们的负和声是什么；再点 G7 和 Cm。你会发现后门和正门互为镜像吗？', '今回は借用和音をいくつか入れた。まず Fm と B♭7（バックドア進行の 2 和音）を押し、その負の和声を見よう。次に G7 と Cm。バックドアと表門が互いの鏡像だとわかる？', 'This time some borrowed chords are included. Tap Fm and B♭7 (the two backdoor chords) and see their negatives; then G7 and Cm. Do the backdoor and the front door turn out to mirror each other?'),
        params: { chords: [['C', [0, 4, 7]], ['Cm', [0, 3, 7]], ['F', [5, 9, 0]], ['Fm', [5, 8, 0]], ['G7', [7, 11, 2, 5]], ['B♭7', [10, 2, 5, 8]], ['A♭', [8, 0, 3]], ['Bø7', [11, 2, 5, 9]]] },
        breakthrough: { id: 'b49x-mirror', text: t('你算出来了：Fm ↔ G、B♭7 ↔ Bø7——后门进行就是正门的负和声。', '計算できた：Fm ↔ G、B♭7 ↔ Bø7——バックドアは表門の負の和声。', 'You worked it out: Fm ↔ G, B♭7 ↔ Bø7 — the backdoor is the front door’s negative.') } },
      { id: 'b49x-x2', type: 'experiment', toy: 'scale', ref: ['aizcutei-lcc', 'george-russell-lcc'],
        prompt: t('LCC 的七个主要音阶：先听 Lydian，再依次听嵌入调性顺序第 8、9、10 个音得到的 Lydian Augmented、Lydian Diminished、Lydian Flat 7th（高亮的就是新加的那个音），最后听三个辅助音阶。然后把主音换成 F，听 F Lydian——按 LCC，C 调里的 G7 就用这个音阶（G7 的 Lydian 主音是 F）。', 'LCC の 7 つの主要音階：まずリディアン、次にトーナル・オーダーの 8・9・10 番目の音を入れたリディアン・オーギュメンテッド、リディアン・ディミニッシュト、リディアン・フラット・セブンス（ハイライトが新しく入った音）、最後に 3 つの補助音階を聴こう。それから主音を F に替え F リディアンを聴く——LCC ではハ調の G7 にこの音階を使う（G7 のリディアン・トニックは F）。', 'LCC’s seven principal scales: hear Lydian, then Lydian Augmented, Lydian Diminished and Lydian Flat 7th, made by adding tonal-order tones 8, 9 and 10 (the new tone is highlighted), then the three auxiliary scales. Then set the tonic to F and hear F Lydian — in LCC, G7 in C takes this scale (G7’s Lydian tonic is F).'),
        params: { sets: LCC_SETS },
        breakthrough: { id: 'b49x-lcc', text: t('你听完了 LCC 的七种颜色：从最"内行"的 Lydian 一步步走向外。', 'LCC の 7 つの色を聴き終えた：最も「イン」なリディアンから一歩ずつ外へ。', 'You heard LCC’s seven colours, stepping out from the most ingoing, Lydian.') } },
    ],
    challenge: [
      {
        id: 'b49x-c1', type: 'choice', error: 'negative-harmony', skills: ['calc'], ref: 'wiki-negative-harmony',
        variants: [
          { prompt: t('C 调里 Fm（F A♭ C）的负和声是？', 'ハ調で Fm（F A♭ C）の負の和声は？', 'In C, the negative of Fm (F A♭ C) is…'), options: [t('G 大三和弦（D B G）', 'G の長三和音（D B G）', 'G major (D B G)'), t('Gm', 'Gm', 'G minor'), t('F 大三和弦', 'F の長三和音', 'F major')] },
          { prompt: t('C 调里 A♭ 大三和弦（A♭ C E♭）的负和声是？', 'ハ調で A♭ の長三和音（A♭ C E♭）の負の和声は？', 'In C, the negative of A♭ major (A♭ C E♭) is…'), options: [t('Em（B G E）', 'Em（B G E）', 'E minor (B G E)'), t('E 大三和弦', 'E の長三和音', 'E major'), t('A♭m', 'A♭m', 'A♭ minor')] },
          { prompt: t('负和声变换下，上行的音型会变成？', '負の和声では、上行する音型は？', 'Under negative harmony, an ascending gesture becomes…'), options: [t('下行', '下行', 'descending'), t('还是上行', 'やはり上行', 'still ascending'), t('不动', '動かない', 'static')] },
        ],
        answer: 0,
        explain: t('按 C↔G 的轴翻转：F→D、A♭→B、C→G，Fm → G；A♭→B、C→G、E♭→E，A♭ → Em；上行变下行。', 'C↔G の軸で反転：F→D・A♭→B・C→G で Fm → G。A♭→B・C→G・E♭→E で A♭ → Em。上行は下行に。', 'Flip across the C–G axis: F→D, A♭→B, C→G, so Fm → G; A♭→B, C→G, E♭→E, so A♭ → Em; ascending becomes descending.'),
      },
      {
        id: 'b49x-c2', type: 'choice', error: 'concept', skills: ['identify'], ref: 'wiki-negative-harmony',
        variants: [
          { prompt: t('谁最早指出大小三和弦"极性相反"？', '長短三和音の「極性が反対」だと最初に指摘したのは？', 'Who first described major and minor triads as polar opposites?'), options: [t('Zarlino', 'ツァルリーノ', 'Zarlino'), t('Riemann', 'リーマン', 'Riemann'), t('Coleman', 'コールマン', 'Coleman')] },
          { prompt: t('Riemann 用什么作为小三和弦的理论基础？', 'リーマンは短三和音の理論的基礎に何を使った？', 'What did Riemann use as a theoretical basis for the minor triad?'), options: [t('下方泛音列', '下方倍音列', 'an undertone series'), t('五度圈', '五度圏', 'the circle of fifths'), t('平均律', '平均律', 'equal temperament')] },
          { prompt: t('负和声和调内旋律倒影有什么不同？', '負の和声と調内の旋律の反行の違いは？', 'How does negative harmony differ from diatonic melodic inversion?'), options: [t('它严格反射每个音，不为留在音阶里调整', 'すべての音を厳密に反射し、音階内にとどめるための調整をしない', 'It reflects every pitch strictly, never adjusting to stay in the scale'), t('它只反射根音', '根音だけを反射する', 'It reflects only roots'), t('完全一样', 'まったく同じ', 'They are identical')] },
        ],
        answer: 0,
        explain: t('Zarlino 提出极性；Riemann 依靠下方泛音列；负和声严格反射、而且整体移了一个五度。', 'ツァルリーノが極性を提唱。リーマンは下方倍音列に頼った。負の和声は厳密に反射し、全体が 5 度移る。', 'Zarlino proposed the polarity; Riemann relied on undertones; negative harmony reflects strictly and shifts by a fifth overall.'),
      },
      {
        id: 'b49x-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: ['george-russell-lcc', 'aizcutei-lcc'],
        variants: [
          { prompt: t('LCC 第一版是哪一年？', 'LCC の初版は何年？', 'When was LCC first published?'), options: ['1953', '1959', '1925'] },
          { prompt: t('十二平均律里共有多少个 Lydian 半音阶？', '12 平均律にリディアン・クロマティック・スケールはいくつ？', 'How many Lydian chromatic scales exist in equal temperament?'), options: ['12', '7', '144'] },
          { prompt: t('按 LCC，Cmaj7 的 Lydian 主音是？', 'LCC で Cmaj7 のリディアン・トニックは？', 'In LCC, the Lydian tonic of Cmaj7 is…'), options: ['C', 'F', 'G'] },
        ],
        answer: 0,
        explain: t('LCC 1953 年出版；共有 12 个 Lydian 半音阶（144 是音程数）；大七和弦的 Lydian 主音就是根音。', 'LCC は 1953 年。リディアン・クロマティック・スケールは 12（144 は音程の数）。長七のリディアン・トニックは根音。', 'LCC appeared in 1953; there are 12 Lydian chromatic scales (144 counts intervals); a major seventh’s Lydian tonic is its root.'),
      },
      {
        id: 'b49x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: 'george-russell-lcc',
        variants: [
          { prompt: t('LCC 被认为直接引出了哪张专辑的调式即兴？', 'LCC が直接導いたとされるモード即興のアルバムは？', 'LCC is credited with leading to the modal improvisation of which album?'), options: [t('《Kind of Blue》', '《Kind of Blue》', 'Kind of Blue'), t('《Giant Steps》', '《Giant Steps》', 'Giant Steps'), t('《Now He Sings, Now He Sobs》', '《Now He Sings, Now He Sobs》', 'Now He Sings, Now He Sobs')] },
          { prompt: t('LCC 里大调音阶的"水平"性质表达的是？', 'LCC で長音階の「水平」な性質が表すのは？', 'In LCC, the major scale’s horizontal nature conveys…'), options: [t('寻求解决、"正在成为"的状态', '解決を求める「なりつつある」状態', 'becoming, seeking resolution'), t('存在、完整的状态', '存在し完結した状態', 'being and completeness'), t('没有引力', '引力がない', 'no gravity')] },
          { prompt: t('武满彻把 LCC 和哪本书并列为最出色的两本音乐书？', '武満徹が LCC と並べて最も素晴らしい音楽書としたのは？', 'Which book did Takemitsu pair with LCC as the two most splendid books on music?'), options: [t('梅西安《我的音乐语言技巧》', 'メシアン『わが音楽語法』', 'Messiaen’s My Musical Language'), t('Fux《Gradus ad Parnassum》', 'フックス『グラドゥス・アド・パルナッスム』', 'Fux’s Gradus ad Parnassum'), t('Levy《A Theory of Harmony》', 'レヴィ『A Theory of Harmony』', 'Levy’s A Theory of Harmony')] },
        ],
        answer: 0,
        explain: t('LCC 引出调式即兴与《Kind of Blue》；大调是"水平"、Lydian 是"垂直"；武满彻并列的是梅西安的书。', 'LCC はモード即興と《Kind of Blue》へ。長音階は「水平」、リディアンは「垂直」。武満が並べたのはメシアンの本。', 'LCC led to modal improvisation and Kind of Blue; major is horizontal, Lydian vertical; Takemitsu paired it with Messiaen’s book.'),
      },
      G('b49x-g1', 'negative', 2, ['calc']),
    ],
  },
  pool: [G('b49x-p1', 'negative', 3, ['calc']), G('b49x-p2', 'scaleLibrary', 1, ['spell'], { ids: ['lydian', 'lydian_sharp_5', 'lydian_dominant'] })],
};

// ===================== B4-10x 节奏 III · 扩展关 =====================
// 对应 A 面：meter2（3 对 4 与重音 / 节拍调制：细分不变 / 拍不变与公式 / 综合）+ swing（三连音、切分与摇摆）
const EXT_B4_10 = {
  minutes: 25,
  insight: t('复节奏是"同时"，节拍调制是"先后"；而同一个 3:2，在贝多芬的赫米奥拉里三拍是主、在西非音乐里两拍是主——谁是主拍，取决于传统。', 'ポリリズムは「同時」、メトリック・モジュレーションは「前後」。そして同じ 3:2 でも、ベートーヴェンのヘミオラでは 3 拍が主、西アフリカの音楽では 2 拍が主——どちらが主拍かは伝統で決まる。', 'Polyrhythm is simultaneous, metric modulation successive; and the same 3:2 has the triple beats primary in Beethoven’s hemiola but the duple beats primary in West African music — which beat is primary depends on the tradition.'),
  sections: {
    discover: [
      {
        id: 'b410x-d1', type: 'discover', ref: 'wiki-polyrhythm',
        prompt: t('Mongo Santamaría 1959 年的《Afro Blue》建立在 6:4（两轮 3:2）的交叉节奏上；1963 年 Coltrane 和鼓手 Elvin Jones 录这首曲子时，把它改成 3/4 的摇摆，每小节叠两个交叉拍（2:3）。听这两种层次：它们是什么关系？', 'モンゴ・サンタマリア 1959 年の《Afro Blue》は 6:4（3:2 を 2 周）のクロスリズムの上に作られた。1963 年にコルトレーンとドラマーのエルヴィン・ジョーンズはこれを 3/4 のスウィングにし、各小節に 2 つのクロスビート（2:3）を重ねた。この 2 つの層を聴こう：どんな関係？', 'Mongo Santamaría’s 1959 “Afro Blue” rests on a 6:4 cross-rhythm (two cycles of 3:2); when Coltrane recorded it in 1963 with drummer Elvin Jones, he recast it as 3/4 swing with two cross-beats per bar (2:3). Hear the two layerings: how are they related?'),
        play: [
          { label: '3:2', audio: { rhythm: { bpm: 72, cycle: 2, repeats: 3, tracks: [{ beats: [0, 1], midi: 45 }, { beats: [0, 0.6667, 1.3333], midi: 76 }] } } },
          { label: '2:3', audio: { rhythm: { bpm: 108, cycle: 3, repeats: 3, tracks: [{ beats: [0, 1, 2], midi: 45 }, { beats: [0, 1.5], midi: 76 }] } } },
        ],
        options: [t('同样的 2 对 3，只是哪一层当主拍反过来了', '同じ 2 対 3 で、どちらの層を主拍にするかが逆になっただけ', 'The same two-against-three, with the primary layer reversed'), t('完全无关的两种节奏', 'まったく無関係な 2 つのリズム', 'Two unrelated rhythms'), t('一种是复节奏，一种是节拍调制', '片方はポリリズム、片方はメトリック・モジュレーション', 'One is polyrhythm, the other metric modulation')],
        answer: 0,
        insight: {
          title: t('颠倒拍子的层级', '拍の階層を逆にする', 'Reversing the metric hierarchy'),
          text: t('维基说 Coltrane"颠倒了 Santamaría 原作的拍子层级"。Elvin Jones 在 3/4 爵士华尔兹每小节上叠两个交叉拍，这种摇摆的 3/4 大概是爵士里最常见的明显交叉节奏。复节奏是爵士的常客，但整首建立在交叉节奏上的就少一些。', 'ウィキペディアによれば、コルトレーンは「サンタマリアの原曲の拍子の階層を逆にした」。エルヴィン・ジョーンズは 3/4 のジャズ・ワルツの各小節に 2 つのクロスビートを重ね、このスウィングする 3/4 はジャズで最もよくある明白なクロスリズムだろう。ポリリズムはジャズの定番だが、曲全体がクロスリズムの上にあるものは少ない。', 'Wikipedia says Coltrane “reversed the metric hierarchy of Santamaría’s composition”. Elvin Jones superimposed two cross-beats on every bar of a 3/4 jazz waltz; this swung 3/4 is perhaps the commonest overt cross-rhythm in jazz. Polyrhythm is a staple of modern jazz, though systemic cross-rhythm is less common.'),
        },
      },
    ],
    explain: [
      {
        id: 'b410x-e1', type: 'page', ref: 'wiki-polyrhythm',
        title: t('进阶 1 · 复节奏的定义与古典里的例子', '発展 1・ポリリズムの定義とクラシックの例', 'Advanced 1 · Defining polyrhythm; classical examples'),
        text: [
          t('复节奏是同时使用两种以上、不容易被听成彼此派生或同一个拍子的简单表现的节奏；它可以是整首曲子的基础（交叉节奏），也可以只出现一段。它和"不规则节奏"（如三连音）不同：后者可以只在一个声部里出现，复节奏则要求至少两种节奏在同一个循环里同时进行（其中一种通常是不规则节奏），底下明显或隐含的脉动也可以算作其中一种。所以 son clave 是复节奏：它"三"的那一半暗示了和整个节奏型的脉动不同的拍子。', 'ポリリズムは、互いに派生したとも同じ拍子の単純な表れとも聞こえにくい 2 つ以上のリズムを同時に使うこと。曲全体の基礎（クロスリズム）にも、一時的な部分にもなる。不規則なリズム（3 連符など）とは違う：後者は 1 声部の中だけでも起こるが、ポリリズムは少なくとも 2 つのリズムが同じリズム周期の中で同時に進むことを要する（その一方はふつう不規則なリズム）。明示的・暗示的な基本の拍もその 1 つと見なせる。だからソン・クラーベはポリリズム：「3」の半分がパターン全体の拍とは違う拍子を示すから。', 'Polyrhythm is the simultaneous use of two or more rhythms not readily heard as deriving from one another or as simple manifestations of one meter; it may underlie a whole piece (cross-rhythm) or a passing section. Unlike irrational rhythms (such as triplets), which can occur within a single part, polyrhythm needs at least two rhythms concurrently in the same cycle, one usually irrational; the underlying pulse, explicit or implicit, can count as one. So the son clave is polyrhythmic: its “three” half suggests a meter different from the pulse of the whole pattern.'),
          t('欧洲艺术音乐里，复节奏会时不时和主导的拍子相矛盾：莫扎特《唐璜》第一幕第五场，两个乐队以不同的拍子（3/4 和 2/4）一起演奏，后来又加入第三个、用 3/8 的乐队；贝多芬《第三交响曲》开头附近；肖邦《练习曲》Op. 10 No. 10（Alan Walker 说演奏者被放进了"交叉节奏和切分的马蜂窝"）；勃拉姆斯《G 大调小提琴奏鸣曲》Op. 78 第一乐章，6/4 的重音在 3+3 和 2+2+2 之间来回、或在小提琴和钢琴上叠在一起，在第 235 小节达到高潮；德彪西《儿童园地》的《雪花飞舞》。', 'ヨーロッパの芸術音楽では、ポリリズムが支配的な拍子とときおり矛盾する：モーツァルト《ドン・ジョヴァンニ》第 1 幕第 5 場では 2 つの楽団が違う拍子（3/4 と 2/4）で一緒に演奏し、のちに 3/8 の第 3 の楽団が加わる。ベートーヴェン《交響曲第 3 番》の冒頭近く。ショパン《練習曲》Op. 10 No. 10（アラン・ウォーカーは奏者が「クロスリズムとシンコペーションの蜂の巣」に置かれたと言う）。ブラームス《ヴァイオリン・ソナタ ト長調》Op. 78 第 1 楽章では 6/4 の強勢が 3+3 と 2+2+2 を行き来し、あるいはヴァイオリンとピアノで重なり、第 235 小節で頂点に達する。ドビュッシー《子供の領分》の《雪は踊っている》。', 'In European art music polyrhythm periodically contradicts the prevailing meter: in Act 1, Scene 5 of Mozart’s Don Giovanni two orchestras play together in different meters (3/4 and 2/4), later joined by a third in 3/8; near the opening of Beethoven’s Third Symphony; Chopin’s Étude Op. 10 No. 10 (Alan Walker: the player is placed in “a veritable hornets’ nest of cross-rhythms and syncopations”); Brahms’s Violin Sonata in G, Op. 78, first movement, switching 6/4 stresses between 3+3 and 2+2+2 or superimposing both, culminating at bar 235; Debussy’s “The Snow Is Dancing” from Children’s Corner.'),
        ],
      },
      {
        id: 'b410x-e2', type: 'discover', practice: true, ref: 'wiki-polyrhythm',
        prompt: t('《唐璜》第一幕第五场里，后来加入的第三个乐队用什么拍子？', '《ドン・ジョヴァンニ》第 1 幕第 5 場で後から加わる第 3 の楽団の拍子は？', 'In Act 1, Scene 5 of Don Giovanni, the third band that joins later plays in…'),
        options: ['3/8', '2/4', '6/8', '4/4'],
        answer: 0,
        insight: { title: t('三个乐队，三种拍子', '3 つの楽団、3 つの拍子', 'Three bands, three meters'), text: t('先是 3/4 和 2/4 两个乐队，后来加入 3/8 的第三个乐队。', 'まず 3/4 と 2/4 の 2 楽団、のちに 3/8 の第 3 の楽団が加わる。', 'First two bands in 3/4 and 2/4, then a third in 3/8.') },
      },
      {
        id: 'b410x-e3', type: 'page', ref: 'wiki-polyrhythm',
        title: t('进阶 2 · 赫米奥拉：是复节奏，不是复拍子', '発展 2・ヘミオラ：ポリリズムであってポリメーターではない', 'Advanced 2 · Hemiola: polyrhythm, not polymeter'),
        text: [
          t('贝多芬《弦乐四重奏》Op. 18 No. 6 的谐谑曲是 3/4，Ernest Walker 说它有"一个异常顽固的交叉节奏，竭力要说服我们它其实是 6/8"。同时听到 3/4 和 6/8 的错觉像是复拍子，但两种拍组其实在同一个拍子层级里互动：三拍是主拍，二拍是次要的交叉拍。', 'ベートーヴェン《弦楽四重奏曲》Op. 18 No. 6 のスケルツォは 3/4 で、アーネスト・ウォーカーは「実は 6/8 だと私たちを説得しようとする、妙にしつこいクロスリズム」があると言う。3/4 と 6/8 が同時に聞こえる錯覚はポリメーターのようだが、2 つの拍の組は 1 つの拍子の階層の中で関わり合う：3 拍が主拍で、2 拍は副次的なクロスビート。', 'The Scherzo of Beethoven’s String Quartet Op. 18 No. 6 is in 3/4, but Ernest Walker notes “a curiously persistent cross-rhythm that does its best to persuade us that it is really in 6/8”. The illusion of simultaneous 3/4 and 6/8 suggests polymeter, but the two beat schemes interact within a single metric hierarchy: the triple beats are primary, the duple beats secondary cross-beats.'),
          t('Mykola Leontovych《Carol of the Bells》那个四个音的固定音型，就是 2 对 3 赫米奥拉合起来的节奏。莫扎特《第 12 号钢琴奏鸣曲》第一乐章第 64、65 小节也有复节奏：三组均匀分布、各三个的起音横跨两个小节。', 'ミコラ・レオントーヴィチ《Carol of the Bells》の 4 音のオスティナートは、2 対 3 のヘミオラを合わせたリズム。モーツァルト《ピアノ・ソナタ第 12 番》第 1 楽章第 64・65 小節にもポリリズムがある：3 つずつ均等に並んだ打点 3 組が 2 小節にまたがる。', 'The four-note ostinato of Mykola Leontovych’s “Carol of the Bells” is the composite of a two-against-three hemiola. Bars 64–65 of the first movement of Mozart’s Piano Sonata No. 12 hold another polyrhythm: three evenly spaced sets of three attacks spanning two bars.'),
        ],
      },
      {
        id: 'b410x-e4', type: 'discover', practice: true, ref: 'wiki-polyrhythm',
        prompt: t('贝多芬 Op. 18 No. 6 谐谑曲里同时有 3/4 和 6/8 的感觉。维基怎么归类它？', 'ベートーヴェン Op. 18 No. 6 のスケルツォには 3/4 と 6/8 の感じが同時にある。ウィキペディアの分類は？', 'Beethoven’s Op. 18 No. 6 Scherzo feels like 3/4 and 6/8 at once. How does Wikipedia classify it?'),
        options: [t('复节奏（同一个拍子层级里的交叉拍），不是复拍子', 'ポリリズム（1 つの拍子の階層の中のクロスビート）で、ポリメーターではない', 'Polyrhythm (cross-beats within one metric hierarchy), not polymeter'), t('复拍子', 'ポリメーター', 'Polymeter'), t('节拍调制', 'メトリック・モジュレーション', 'Metric modulation')],
        answer: 0,
        insight: { title: t('一个拍子，两种拍组', '1 つの拍子、2 つの拍の組', 'One meter, two groupings'), text: t('三拍是主、二拍是交叉拍：仍是一个拍子。', '3 拍が主、2 拍がクロスビート：拍子は 1 つ。', 'Triple beats primary, duple beats crossing: still one meter.') },
      },
      {
        id: 'b410x-e5', type: 'page', ref: 'wiki-polyrhythm',
        title: t('进阶 3 · 撒哈拉以南非洲的交叉节奏', '発展 3・サハラ以南アフリカのクロスリズム', 'Advanced 3 · Cross-rhythm in sub-Saharan Africa'),
        text: [
          t('传统欧洲节奏里，最基本的声部通常强调主拍；源自撒哈拉以南非洲的节奏里，最基本的声部则通常强调次拍。在这些传统里，交叉节奏是生成原则：拍子永远处在矛盾的状态。从非洲音乐家的哲学看，交叉拍可以象征我们都会遇到的困难时刻：一边稳稳站在主拍上一边打交叉拍，就像在应付生活的挑战时仍守住人生的目标；许多撒哈拉以南的语言甚至没有"节奏"或"音乐"这样的词，节奏就是生活本身的织物。', '伝統的なヨーロッパのリズムでは最も基本的なパートはふつう主拍を強調するが、サハラ以南アフリカに由来するリズムでは最も基本的なパートはふつう副拍を強調する。これらの伝統ではクロスリズムが生成の原理で、拍子は常に矛盾した状態にある。アフリカの音楽家の哲学的な見方では、クロスビートは誰もが出会う困難な瞬間を象徴しうる：主拍にしっかり立ちながらクロスビートを打つことは、人生の試練に対処しながら目的を保つ準備になる。サハラ以南の多くの言語には「リズム」や「音楽」という語さえなく、リズムは生活そのものの織物とされる。', 'In traditional European rhythms the most fundamental parts typically emphasise the primary beats; in rhythms of sub-Saharan African origin they typically emphasise the secondary beats. In these traditions cross-rhythm is the generating principle: the meter is in a permanent state of contradiction. From the African musician’s philosophical perspective, cross-beats can symbolise the challenging moments we all meet — playing them while grounded in the main beats prepares one to keep a life purpose amid life’s challenges; many sub-Saharan languages have no word for rhythm or even music, rhythm being the very fabric of life.'),
          t('Eugene Novotney 说，3:2 关系（及其变化）是大多数西非复节奏织体的基础；Victor Kofi Agawu 则说："这里没有独立性，因为 2 和 3 属于同一个完形（Gestalt）。"非洲的 3:2 里，二拍是主拍、三拍是次拍——和贝多芬的赫米奥拉正好相反。非洲木琴（balafon、gyil）的音乐常以交叉节奏为基础；古巴伦巴同时用三分和二分的节奏，例如领奏的 quinto 鼓打 6/8，其余乐手保持 2/2；南印度卡纳提克音乐用一种节奏视唱法 konnakol 来构造非常复杂的复节奏。', 'ユージン・ノヴォトニーは、3:2 の関係（とその変形）がほとんどの典型的な西アフリカのポリリズムの土台だと言い、ヴィクター・コフィ・アガウは「ここに独立性はない。2 と 3 は 1 つのゲシュタルトに属するから」と言う。アフリカの 3:2 では 2 拍が主拍、3 拍が副拍——ベートーヴェンのヘミオラとちょうど逆。アフリカの木琴（バラフォン、ギル）の音楽はよくクロスリズムに基づく。キューバのルンバは 3 系と 2 系のリズムを同時に使い、たとえばリードのキント・ドラムは 6/8、ほかは 2/2 を保つ。南インドのカルナータカ音楽はコナッコルというリズムのソルフェージュで非常に複雑なポリリズムを作る。', 'Eugene Novotney: the 3:2 relationship (and its permutations) is the foundation of most typical West African polyrhythmic textures; Victor Kofi Agawu: “there is no independence here, because 2 and 3 belong to a single Gestalt.” In African 3:2 the duple beats are primary and the triple secondary — the reverse of Beethoven’s hemiola. African xylophone music (balafon, gyil) is often built on cross-rhythm; Cuban rumba uses 3-based and 2-based rhythms at once, the lead quinto drum perhaps in 6/8 while the rest keep 2/2; South Indian Carnatic music uses konnakol, a rhythmic solfège, to build highly complex polyrhythms.'),
        ],
      },
      {
        id: 'b410x-e6', type: 'discover', practice: true, ref: 'wiki-polyrhythm',
        prompt: t('按维基的说法，非洲的 3:2 交叉节奏里，主拍是哪一组？', 'ウィキペディアによれば、アフリカの 3:2 のクロスリズムで主拍はどちら？', 'According to Wikipedia, which beats are primary in the African 3:2 cross-rhythm?'),
        options: [t('二拍那组（三拍是次拍）', '2 拍の組（3 拍は副拍）', 'The duple beats (the triple are secondary)'), t('三拍那组', '3 拍の組', 'The triple beats'), t('没有主拍', '主拍はない', 'Neither')],
        answer: 0,
        insight: { title: t('和赫米奥拉相反', 'ヘミオラと逆', 'The reverse of hemiola'), text: t('贝多芬的赫米奥拉里三拍为主；非洲的 3:2 里二拍为主。', 'ベートーヴェンのヘミオラは 3 拍が主、アフリカの 3:2 は 2 拍が主。', 'In Beethoven’s hemiola the triple beats lead; in African 3:2 the duple beats do.') },
      },
      {
        id: 'b410x-e7', type: 'page', ref: 'wiki-polyrhythm',
        title: t('进阶 4 · 爵士里常见的四种复节奏', '発展 4・ジャズによくある 4 つのポリリズム', 'Advanced 4 · Four common polyrhythms in jazz'),
        text: [
          t('爵士里常见的复节奏有：3:2，以四分音符三连音的形式出现；2:3，通常是附点四分音符对四分音符；4:3，附点八分音符对四分音符——需要一定技术才能奏准，在 Tony Williams 跟 Miles Davis 合作使用它之前，爵士里很少见；还有 3/4 对 4/4，和 2:3 一起，因 Elvin Jones 和 McCoy Tyner 与 Coltrane 的合作而出名。', 'ジャズによくあるポリリズム：3:2 は 4 分音符の 3 連符として、2:3 はふつう付点 4 分音符対 4 分音符として、4:3 は付点 8 分音符対 4 分音符として——正確に奏するには技術が要り、トニー・ウィリアムスがマイルス・デイヴィスとの共演で使うまでジャズではほとんど見られなかった。そして 3/4 対 4/4 は、2:3 とともにエルヴィン・ジョーンズとマッコイ・タイナーがコルトレーンとの共演で有名にした。', 'Common jazz polyrhythms: 3:2, as the quarter-note triplet; 2:3, usually dotted quarters against quarters; 4:3, dotted eighths against quarters — demanding to play accurately, and rare in jazz before Tony Williams used it with Miles Davis; and 3/4 against 4/4, which along with 2:3 was used famously by Elvin Jones and McCoy Tyner with John Coltrane.'),
          t('非洲鼓手也深刻影响了爵士和美国流行音乐：受过约鲁巴 sakara 鼓乐训练的 Babatunde Olatunji 后来和 Airto Moreira、Carlos Santana、Grateful Dead 的 Mickey Hart 等爵士和摇滚乐手合作；古巴康加手 Mongo Santamaría 在 1950 年代作为乐队领队，把非洲—拉丁节奏和 R&B、爵士融合在一起。', 'アフリカのドラマーもジャズとアメリカのポピュラー音楽に深く影響した：ヨルバのサカラ・ドラミングを学んだババトゥンデ・オラトゥンジは、のちにアイアート・モレイラ、カルロス・サンタナ、グレイトフル・デッドのミッキー・ハートらジャズやロックの音楽家と共演した。キューバのコンガ奏者モンゴ・サンタマリアは 1950 年代にバンドリーダーとして、アフロ・ラテンのリズムを R&B やジャズと融合させた。', 'African drummers shaped jazz and American popular music too: Babatunde Olatunji, trained in Yoruba sakara drumming, went on to work with jazz and rock artists including Airto Moreira, Carlos Santana and the Grateful Dead’s Mickey Hart; the Cuban conguero Mongo Santamaría, as a 1950s bandleader, fused Afro-Latin rhythms with R&B and jazz.'),
        ],
      },
      {
        id: 'b410x-e8', type: 'discover', practice: true, ref: 'wiki-polyrhythm',
        prompt: t('爵士里的 4:3 通常怎样演奏？在谁使用之前很少见？', 'ジャズの 4:3 はふつうどう演奏する？ 誰が使う前は珍しかった？', 'How is 4:3 usually played in jazz, and before whom was it rare?'),
        options: [t('附点八分对四分；Tony Williams', '付点 8 分対 4 分。トニー・ウィリアムス', 'Dotted eighths against quarters; Tony Williams'), t('四分三连音；Elvin Jones', '4 分の 3 連符。エルヴィン・ジョーンズ', 'Quarter-note triplets; Elvin Jones'), t('附点四分对四分；Art Blakey', '付点 4 分対 4 分。アート・ブレイキー', 'Dotted quarters against quarters; Art Blakey')],
        answer: 0,
        insight: { title: t('三个附点八分 = 四个十六分 × 3', '付点 8 分 3 つ = 16 分 4 つ × 3', 'Dotted eighths over quarters'), text: t('附点八分（3 个十六分长）四下 = 12 个十六分 = 三个四分：4 对 3。', '付点 8 分（16 分 3 つ分）4 つ = 16 分 12 個 = 4 分 3 つ：4 対 3。', 'Four dotted eighths (three sixteenths each) = 12 sixteenths = three quarters: 4 against 3.') },
      },
      {
        id: 'b410x-e9', type: 'page', ref: 'omt2e-20c-rhythm',
        title: t('进阶 5 · 不对称拍子、无拍、变拍子与复拍子', '発展 5・非対称拍子、無拍子、変拍子、ポリメーター', 'Advanced 5 · Asymmetric meter, ametric music, changing meter, polymeter'),
        text: [
          t('不对称拍子的小节被分成不相等的拍组，脉动不均匀；这个名称并非通用，也叫"混合拍子""复杂拍子""非等时拍子"等。例子：Stephen Sondheim《Ladies In Their Sensitivities》（1979）、Andrew Lloyd Webber《Skimbleshanks: The Railway Cat》、Dave Brubeck 四重奏的《Unsquare Dance》（1961）——一般的方块舞是四拍子，这首"不方的舞"用不对称拍子打破听众的预期。无拍音乐可以有也可以没有拍号，但听不出拍子：Charles Ives 的歌曲《The Cage》（约 1904）没有严格的脉动，烘托出笼中豹来回踱步的焦躁。', '非対称拍子の小節は等しくない拍の組に分けられ、拍が不均等になる。この名前は普遍的ではなく、「混合拍子」「複雑拍子」「非等時拍子」などとも呼ばれる。例：スティーヴン・ソンドハイム《Ladies In Their Sensitivities》（1979）、アンドリュー・ロイド・ウェバー《Skimbleshanks: The Railway Cat》、デイヴ・ブルーベック・カルテット《Unsquare Dance》（1961）——普通のスクエア・ダンスは 4 拍子だが、この「スクエアでないダンス」は非対称拍子で聴き手の予想を裏切る。無拍子の音楽は拍子記号があってもなくてもよいが、拍子が聞き取れない：チャールズ・アイヴズの歌曲《The Cage》（1904 頃）は厳格な拍がなく、檻の中を歩き回る豹の落ち着かなさを支える。', 'Asymmetric meters divide bars into unequal groupings, making an uneven pulse; the term is not universal — also “mixed”, “complex” or “non-isochronous” meters. Examples: Stephen Sondheim’s “Ladies In Their Sensitivities” (1979), Andrew Lloyd Webber’s “Skimbleshanks: The Railway Cat”, and the Dave Brubeck Quartet’s “Unsquare Dance” (1961) — square dances are usually in quadruple meter, so this “unsquare” dance defies expectations. Ametric music may or may not have a time signature but has no perceivable meter: Charles Ives’s song “The Cage” (c. 1904) has no strict pulse, supporting the restless pacing of the caged leopard.'),
          t('变拍子是任何改变拍子的写法，没有规则限制，甚至可以每小节都变：Tui St. George Tucker《Requiem》里的《Libera Me》（1995）用它描绘"天地震动"，Andreas Markis《Aegean Festival Overture》（1967）用它模仿常有变拍子的希腊民间音乐。复拍子是两个以上的拍子同时进行，可以明写也可以暗含：巴托克为两把小提琴写的《Ara táskor》（收获之歌，1931）从第 11 小节起明写两种拍子；拉威尔《F 大调弦乐四重奏》第二乐章（1902）是暗含的复拍子——也可以看成一种"分组不协和"。', '変拍子は拍子を変える書き方のことで、規則の制限はなく、小節ごとに変わってもよい：トゥイ・セント・ジョージ・タッカー《レクイエム》の《Libera Me》（1995）は「天が揺り動かされる」さまを描き、アンドレアス・マルキス《エーゲ海祝典序曲》（1967）は変拍子の多いギリシャ民謡を模す。ポリメーターは 2 つ以上の拍子が同時に進むことで、明示も暗示もありうる：バルトークの 2 つのヴァイオリンのための《Ara táskor》（収穫の歌、1931）は第 11 小節から 2 つの拍子を明記し、ラヴェル《弦楽四重奏曲ヘ長調》第 2 楽章（1902）は暗示的なポリメーター——「グルーピングの不協和」とも見なせる。', 'Changing meter is any change of meter, with no limits — even bar by bar: Tui St. George Tucker’s “Libera Me” from her Requiem (1995) paints the heavens being shaken; Andreas Markis’s Aegean Festival Overture (1967) evokes Greek folk music, which often changes meter. Polymeter is two or more meters at once, explicit or implicit: Bartók’s “Ara táskor” (Harvest Song, 1931) for two violins writes two meters from bar 11; the second movement of Ravel’s String Quartet in F (1902) is implicit polymeter — a kind of grouping dissonance.'),
        ],
      },
      {
        id: 'b410x-e10', type: 'discover', practice: true, ref: 'omt2e-20c-rhythm',
        prompt: t('Brubeck 的《Unsquare Dance》为什么叫"不方的舞"？', 'ブルーベック《Unsquare Dance》はなぜ「スクエアでないダンス」？', 'Why is Brubeck’s piece called “Unsquare Dance”?'),
        options: [t('方块舞通常是四拍子，它却用不对称拍子', 'スクエア・ダンスはふつう 4 拍子だが、非対称拍子を使うから', 'Square dances are usually quadruple, but it uses an asymmetric meter'), t('它没有拍子', '拍子がないから', 'It has no meter'), t('它每小节都换拍子', '小節ごとに拍子が変わるから', 'Its meter changes every bar')],
        answer: 0,
        insight: { title: t('打破预期', '予想を裏切る', 'Defying expectations'), text: t('用不对称的拍组代替方块舞习惯的四拍子。', 'スクエア・ダンスの 4 拍子の代わりに非対称な拍の組を使う。', 'Unequal beat groups replace the square dance’s usual four.') },
      },
      {
        id: 'b410x-e11', type: 'page', ref: ['wiki-metric-modulation', 'omt2e-20c-rhythm'],
        title: t('进阶 6 · 节拍调制：名字、公式与 Carter', '発展 6・メトリック・モジュレーション：名前、公式、カーター', 'Advanced 6 · Metric modulation: name, formula, Carter'),
        text: [
          t('节拍调制是由变化前听到的某个时值或分组引出的速度和 / 或分组的改变：旧拍子里的一个时值等于新拍子里的一个时值，像和声转调里的枢纽音或枢纽和弦——前后的作用不同，听起来却一样，是一个可以听到的共同元素。最早由 Richard Franko Goldman 在评论 Elliott Carter 的《大提琴奏鸣曲》时提出；Carter 本人更喜欢叫它"速度调制"，另一个同义词是"比例速度"。最简单的未标记的形式早已有之：巴赫的慢引子之后，快板传统上以两倍速度进行，旧速度的十六分音符为新速度的八分音符做准备。', 'メトリック・モジュレーションは、変化の前に聞こえた音価やまとまりから導かれるテンポや分割の変化：古い拍子のある音価を新しい拍子のある音価と等しくする。和声の転調の共通音や共通和音のように——前後で働きは違うが同じに聞こえる、耳で聞ける共通要素。最初にリチャード・フランコ・ゴールドマンがエリオット・カーター《チェロ・ソナタ》の評で述べた。カーター自身は「テンポ・モジュレーション」と呼ぶのを好み、「比例テンポ」という同義語もある。最も単純な無表示の形は昔からある：バッハのゆっくりした序奏の後、アレグロは伝統的に 2 倍の速さで、古いテンポの 16 分音符が新しいテンポの 8 分音符を準備する。', 'Metric modulation is a change in tempo and/or grouping derived from a note value or grouping heard before the change: a value in the old meter is made equal to one in the new, like a pivot in tonal modulation — functioning differently before and after but sounding the same, an audible common element. Richard Franko Goldman first described it reviewing Elliott Carter’s Cello Sonata; Carter prefers “tempo modulation”, and “proportional tempi” is a synonym. Its simplest unmarked form is old: after a Bach slow introduction the allegro traditionally goes at double speed, the old tempo’s sixteenths preparing the new tempo’s eighths.'),
          t('公式：新速度 ÷ 旧速度 = 新小节里枢纽时值的个数 ÷ 旧小节里枢纽时值的个数。例：4/4、♩ = 84，"两个二分音符 = 三个二分音符"，新速度 = 84 × 3 ÷ 2 = 126。它让突兀的速度变化变得平滑，听众往往事后才察觉。Carter 以节拍调制闻名：在《为四个定音鼓写的八首曲子》的《Canaries》（1949）里，他在换拍子前一小节加入三连音，让新的小节听起来像是三连音的延续；之后又保持八分音符不变，让下一次换拍子同样天衣无缝。', '公式：新テンポ ÷ 旧テンポ = 新しい小節の枢軸音価の数 ÷ 旧い小節の枢軸音価の数。例：4/4、♩ = 84 で「2 分音符 2 つ = 2 分音符 3 つ」なら新テンポ = 84 × 3 ÷ 2 = 126。突然のテンポ変化を滑らかにし、聴き手はたいてい後から気づく。カーターはメトリック・モジュレーションで有名：《4 つのティンパニのための 8 つの小品》の《Canaries》（1949）では、拍子が変わる前の小節に 3 連符を入れ、新しい小節が 3 連符の続きのように聞こえるようにした。その後も 8 分音符を保ち、次の拍子の変化も継ぎ目なく。', 'Formula: new tempo ÷ old tempo = pivot values per new bar ÷ pivot values per old bar. Example: 4/4 at ♩ = 84 with “two half notes = three half notes” gives 84 × 3 ÷ 2 = 126. It smooths abrupt tempo changes, often noticed only in retrospect. Carter is known for it: in “Canaries” from Eight Pieces for Four Timpani (1949) he adds triplets in the bar before a meter change so the new bar sounds like an extension of them, then keeps the eighth note constant to make the next change seamless too.'),
        ],
      },
      {
        id: 'b410x-e12', type: 'discover', practice: true, ref: 'wiki-metric-modulation',
        prompt: t('旧速度 ♩ = 120，旧小节里 3 个枢纽时值，新小节里 2 个。新速度是？', '旧テンポ ♩ = 120、旧い小節に枢軸音価 3 つ、新しい小節に 2 つ。新テンポは？', 'Old tempo ♩ = 120, three pivot values per old bar, two per new bar. The new tempo is…'),
        options: ['80', '180', '120', '60'],
        answer: 0,
        insight: { title: t('新 = 旧 × 新个数 ÷ 旧个数', '新 = 旧 × 新の数 ÷ 旧の数', 'New = old × new count ÷ old count'), text: t('120 × 2 ÷ 3 = 80。', '120 × 2 ÷ 3 = 80。', '120 × 2 ÷ 3 = 80.') },
      },
    ],
    experiment: [
      { id: 'b410x-x1', type: 'experiment', toy: 'poly', ref: 'wiki-polyrhythm',
        prompt: t('依次听爵士常见的 3:2、2:3 和 4:3。4:3 那条打 4 下的，就是 Tony Williams 的附点八分对四分；2:3 是 Elvin Jones 在 3/4 华尔兹上叠的交叉拍。关掉一行、只听另一行，再一起听：你能一直守住主拍吗？', 'ジャズによくある 3:2・2:3・4:3 を順に聴こう。4:3 の 4 打の行がトニー・ウィリアムスの付点 8 分対 4 分、2:3 はエルヴィン・ジョーンズが 3/4 のワルツに重ねたクロスビート。1 行を消してもう 1 行だけ、次に一緒に：主拍を保ち続けられる？', 'Hear the common jazz ratios 3:2, 2:3 and 4:3 in turn. The four-beat line of 4:3 is Tony Williams’s dotted eighths over quarters; 2:3 is Elvin Jones’s cross-beats over a 3/4 waltz. Mute one line, hear the other alone, then both: can you hold on to the main beat?'),
        params: { ratios: [[3, 2], [2, 3], [4, 3]], bpm: 84 },
        breakthrough: { id: 'b410x-hold', text: t('交叉拍在耳边，主拍还在脚下。', 'クロスビートは耳に、主拍は足元に。', 'Cross-beats in your ears, the main beat still under your feet.') } },
    ],
    challenge: [
      {
        id: 'b410x-c1', type: 'choice', error: 'polymeter', skills: ['identify'], ref: ['wiki-polyrhythm', 'omt2e-20c-rhythm'],
        variants: [
          { prompt: t('复节奏和"一个声部里的三连音"有什么不同？', 'ポリリズムと「1 声部の中の 3 連符」の違いは？', 'How does polyrhythm differ from a triplet within one part?'), options: [t('复节奏要求至少两种节奏在同一个循环里同时进行', 'ポリリズムは少なくとも 2 つのリズムが同じ周期で同時に進むことを要する', 'Polyrhythm needs at least two rhythms concurrently in one cycle'), t('没有不同', '違いはない', 'No difference'), t('三连音一定是复节奏', '3 連符は必ずポリリズム', 'Triplets are always polyrhythms')] },
          { prompt: t('巴托克《Ara táskor》从第 11 小节起是？', 'バルトーク《Ara táskor》の第 11 小節からは？', 'From bar 11, Bartók’s “Ara táskor” is…'), options: [t('明写的复拍子', '明示的なポリメーター', 'explicit polymeter'), t('节拍调制', 'メトリック・モジュレーション', 'metric modulation'), t('无拍音乐', '無拍子の音楽', 'ametric music')] },
          { prompt: t('《Carol of the Bells》的四音固定音型是？', '《Carol of the Bells》の 4 音のオスティナートは？', 'The four-note ostinato of “Carol of the Bells” is…'), options: [t('2 对 3 赫米奥拉合起来的节奏', '2 対 3 のヘミオラを合わせたリズム', 'the composite of a two-against-three hemiola'), t('3 对 4', '3 対 4', 'three against four'), t('5/8 拍子', '5/8 拍子', 'a 5/8 meter')] },
        ],
        answer: 0,
        explain: t('复节奏要两种节奏同时；巴托克从第 11 小节起明写两种拍子；《Carol of the Bells》是 2:3 的合成节奏。', 'ポリリズムは 2 つのリズムが同時。バルトークは第 11 小節から 2 つの拍子を明記。《Carol of the Bells》は 2:3 の合成リズム。', 'Polyrhythm needs two concurrent rhythms; Bartók writes two meters from bar 11; “Carol of the Bells” is a 2:3 composite.'),
      },
      {
        id: 'b410x-c2', type: 'choice', error: 'wrong-ratio', skills: ['hearing'], ref: 'wiki-polyrhythm',
        variants: [
          { prompt: t('《Afro Blue》（1959）建立在什么交叉节奏上？', '《Afro Blue》（1959）は何のクロスリズムの上に？', '“Afro Blue” (1959) rests on which cross-rhythm?'), options: [t('6:4（两轮 3:2）', '6:4（3:2 を 2 周）', '6:4 (two cycles of 3:2)'), t('4:3', '4:3', '4:3'), t('5:4', '5:4', '5:4')] },
          { prompt: t('爵士里 3:2 通常以什么形式出现？', 'ジャズで 3:2 はふつうどんな形で？', 'In jazz, 3:2 usually appears as…'), options: [t('四分音符三连音', '4 分音符の 3 連符', 'the quarter-note triplet'), t('附点八分对四分', '付点 8 分対 4 分', 'dotted eighths over quarters'), t('十六分音符', '16 分音符', 'sixteenth notes')] },
          { prompt: t('3/4 对 4/4 和 2:3 一起，因哪两位与 Coltrane 的合作而出名？', '3/4 対 4/4 と 2:3 を有名にした、コルトレーンの共演者 2 人は？', 'Which two players with Coltrane made 3/4 against 4/4 (and 2:3) famous?'), options: [t('Elvin Jones 和 McCoy Tyner', 'エルヴィン・ジョーンズとマッコイ・タイナー', 'Elvin Jones and McCoy Tyner'), t('Tony Williams 和 Herbie Hancock', 'トニー・ウィリアムスとハービー・ハンコック', 'Tony Williams and Herbie Hancock'), t('Art Blakey 和 Horace Silver', 'アート・ブレイキーとホレス・シルヴァー', 'Art Blakey and Horace Silver')] },
        ],
        answer: 0,
        explain: t('《Afro Blue》是 6:4；3:2 是四分三连音；Elvin Jones 和 McCoy Tyner 让 3/4 对 4/4 出名。', '《Afro Blue》は 6:4。3:2 は 4 分の 3 連符。エルヴィン・ジョーンズとマッコイ・タイナーが 3/4 対 4/4 を有名に。', '“Afro Blue” is 6:4; 3:2 is the quarter-note triplet; Elvin Jones and McCoy Tyner made 3/4 against 4/4 famous.'),
      },
      {
        id: 'b410x-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: ['omt2e-20c-rhythm', 'wiki-polyrhythm'],
        variants: [
          { prompt: t('Ives 的《The Cage》是哪种节奏写法的例子？', 'アイヴズ《The Cage》はどのリズム書法の例？', 'Ives’s “The Cage” exemplifies…'), options: [t('无拍音乐', '無拍子の音楽', 'ametric music'), t('不对称拍子', '非対称拍子', 'asymmetric meter'), t('节拍调制', 'メトリック・モジュレーション', 'metric modulation')] },
          { prompt: t('南印度卡纳提克音乐用什么来构造复杂的复节奏？', '南インドのカルナータカ音楽は何で複雑なポリリズムを作る？', 'What does Carnatic music use to build complex polyrhythms?'), options: [t('konnakol（节奏视唱）', 'コナッコル（リズムのソルフェージュ）', 'konnakol (rhythmic solfège)'), t('son clave', 'ソン・クラーベ', 'the son clave'), t('赫米奥拉', 'ヘミオラ', 'hemiola')] },
          { prompt: t('Andreas Markis《Aegean Festival Overture》用变拍子是为了？', 'アンドレアス・マルキス《エーゲ海祝典序曲》が変拍子を使うのは？', 'Why does Markis’s Aegean Festival Overture use changing meter?'), options: [t('模仿常有变拍子的希腊民间音乐', '変拍子の多いギリシャ民謡を模すため', 'To evoke Greek folk music, which often changes meter'), t('描绘天地震动', '天が揺れるさまを描くため', 'To paint the heavens shaking'), t('表现笼中的豹', '檻の中の豹を表すため', 'To depict a caged leopard')] },
        ],
        answer: 0,
        explain: t('《The Cage》是无拍音乐；konnakol 用于卡纳提克复节奏；Markis 模仿希腊民间音乐（"天地震动"是 Tucker 的《Libera Me》）。', '《The Cage》は無拍子。コナッコルはカルナータカのポリリズム。マルキスはギリシャ民謡を模す（「天が揺れる」はタッカー《Libera Me》）。', '“The Cage” is ametric; konnakol serves Carnatic polyrhythm; Markis evokes Greek folk music (“the heavens shaken” is Tucker’s “Libera Me”).'),
      },
      {
        id: 'b410x-c4', type: 'choice', error: 'tempo-calculation', skills: ['calc'], ref: 'wiki-metric-modulation',
        variants: [
          { prompt: t('♩ = 84，"两个二分音符 = 三个二分音符"。新速度？', '♩ = 84、「2 分音符 2 つ = 2 分音符 3 つ」。新テンポは？', '♩ = 84, “two half notes = three half notes”. New tempo?'), options: ['126', '56', '168', '84'] },
          { prompt: t('旧速度 90：旧小节 3 个枢纽时值，新小节 4 个。新速度？', '旧テンポ 90：旧い小節に枢軸音価 3 つ、新しい小節に 4 つ。新テンポは？', 'Old tempo 90: three pivot values per old bar, four per new bar. New tempo?'), options: ['120', '67.5', '90', '360'] },
          { prompt: t('"节拍调制"一词最早由谁提出？', '「メトリック・モジュレーション」を最初に述べたのは？', 'Who first described “metric modulation”?'), options: [t('Richard Franko Goldman', 'リチャード・フランコ・ゴールドマン', 'Richard Franko Goldman'), t('Elliott Carter', 'エリオット・カーター', 'Elliott Carter'), t('Ernest Walker', 'アーネスト・ウォーカー', 'Ernest Walker')] },
        ],
        answer: 0,
        explain: t('84 × 3 ÷ 2 = 126；90 × 4 ÷ 3 = 120；Goldman 在评论 Carter 的《大提琴奏鸣曲》时首次描述（Carter 自己叫它速度调制）。', '84 × 3 ÷ 2 = 126。90 × 4 ÷ 3 = 120。ゴールドマンがカーター《チェロ・ソナタ》の評で最初に述べた（カーター自身はテンポ・モジュレーションと呼ぶ）。', '84 × 3 ÷ 2 = 126; 90 × 4 ÷ 3 = 120; Goldman first described it reviewing Carter’s Cello Sonata (Carter calls it tempo modulation).'),
      },
      G('b410x-g1', 'additiveMeter', 1, ['identify']),
      G('b410x-g2', 'noteValue', 1, ['calc']),
    ],
  },
  pool: [G('b410x-p1', 'additiveMeter', 2, ['identify']), G('b410x-p2', 'meterClass', 2, ['identify'])],
};

export const EXT_JAZZ = { 'B4-1': EXT_B4_1, 'B4-2': EXT_B4_2, 'B4-3': EXT_B4_3, 'B4-4': EXT_B4_4, 'B4-5': EXT_B4_5, 'B4-6': EXT_B4_6, 'B4-7': EXT_B4_7, 'B4-8': EXT_B4_8, 'B4-9': EXT_B4_9, 'B4-10': EXT_B4_10 };

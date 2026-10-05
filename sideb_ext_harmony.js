// Side-B 第 2 章（和声）的扩展关：每个普通关通过后解锁。节奏和普通关一样（发现 → 讲解 → 实验 → 挑战），
// 把对应 A 面关卡（含挂在上面的支线关卡）的进阶关 + 综合测验重新、更细地讲一遍（讲解更长；挑战相当于综合测验）。节点格式见 sideb_ui.js / SIDE_B_DESIGN.md。
// B2-12（综合关）没有对应的 A 面关卡，不设扩展关。
// 出处（每条事实都在原文里核对过）：
//   B2-1x：三和弦可以叠成全在线上或全在间里；最紧凑的叠法里最低是根音、中间三音、最高五音（"雪人"，正式叫原位）；大、小三和弦按三度命名，减、增三和弦按五度命名；
//          拼三和弦的步骤（写根音 → 画雪人 → 想根音的大调调号 → 加调号里的升降号 → 再改三音、五音）；A♭ 小三和弦的例子：ref:omt2e-triads
//          四种三和弦的唱名：大 do–mi–sol、小 do–me–sol / la–do–mi、减 ti–re–fa、增 me–sol–ti：ref:omt-triads
//          七和弦：四个音能叠成三度，最高的叫七音（也叫"和弦七音"，和第七级区分）；五种常见性质与两套名称（半减七没有别名）；前一个字说三和弦、后一个字说七度；
//          拼七和弦的步骤与 A♭ 减七和弦（C♭、E𝄫）的例子；根音是假想调时用等音改写；常见的听感比喻（大七"快乐又爵士"、属七"没有解决"、小七"忧伤又爵士"、
//          半减七"吓人又爵士"、减七"很吓人"）：ref:omt2e-sevenths
//          低音（bass）≠ 根音；原位 / 第一转位 / 第二转位 / 第三转位；数字低音写的是低音上方的音程，大数字写在上面；完整数字 5/3、6/3、6/4，
//          几个世纪前为了省纸和墨水而缩写：原位不写、第一转位写 6、第二转位保留 6/4 以免和 6 混淆；把数字低音变成和弦叫"realizing"；
//          升降号写在被改变的数字前面，也可以用斜线或加号表示升高半音：ref:omt2e-figured-bass
//          斜杠和弦：斜杠后是低音，C/E、C/G 是转位；上方结构（upper structure）的低音不一定是和弦音：C/A♭ = A♭M7♯5、Am/D = D–A–C–E：ref:wiki-chord-notation
//          和声小调：自然小调升高第七级，第六、七级之间是增二度；III 级是增三和弦，不出现在七种"自然"调式的和声里，在半音化的发展中起过作用；
//          vii° 有属功能：ref:wiki-harmonic-minor
//          大调、小调里各级三和弦与七和弦的性质（小调 V、vii° 用升高的导音）：ref:omt2e-roman-numerals
//   B2-2x：和弦符号四个部分：根音、三和弦性质、延伸音、非根音的低音；默认：三和弦是大三、加上的七度是小七、其他延伸音与加音是大或纯；符号随爵士发展而来、
//          从未完全统一，自己写时选一种用到底；C7 = 属七；延伸音 9、11、13 用复音程的名字有两个原因：写出最高的延伸音就意味着下面的都包含在内，且实际常放在上方；
//          ♯11、♭9 是"升高 / 降低这个延伸音"，不一定真的是升号 / 降号音；改变的延伸音前先写 7，常加括号；add 不含七音（Cadd9 = C–E–G–D），add2 放在三和弦里面；
//          加六不写 add（很常见、不会误解），6/9 也一样；sus 用纯四度（默认）或大二度代替三音，名字来自四度解决到三度的延留，后面常接同根音的和弦（不是必须）；
//          七和弦加 sus 写成 C7sus（免得 Csus7 像 Csus2）；斜杠后是低音，可以不是和弦音（C/F♯）；和弦符号是绝对的标签、罗马数字是相对的；
//          符号不是分析，目的是让手指在对的时间按对的音：C/A♭ 常比 A♭7(♯5) 好读；隐含的延伸音不一定都弹：ref:omt2e-chord-symbols
//          sus 来自对位里的延留（前一个和弦的音留到下一个和弦形成不协和，再解决，常见四度到三度，七、九、二度也常见）；流行音乐里常不解决，
//          也不要求延留音来自前一个和弦；没有三音，所以调性含糊：ref:wiki-suspended-chord
//          加音和弦：三和弦加一个或几个"不是七音"的音；加音放在低音时通常直接写成斜杠和弦（C/D 而不是 Cadd2/D）；Csus2 与 Cmadd2 都有 D，差在有没有三音：ref:wiki-added-tone
//          加六和弦：18 世纪拉莫称之为 sixte ajoutée（第六级加到三和弦上），他关注下属和弦里加六度在终止式中的对位进行；C6 与 Am7 第一转位同音，根音要看语境；
//          15 世纪的 fauxbourdon 里常有平行六度；数字低音的"6"后来就是第一转位：ref:wiki-sixth-chord
//          强力和弦（五度和弦）：根音 + 五音（可加八度），多用于加失真的电吉他（重金属、朋克）；失真产生各泛音的和与差频（互调失真），大三、小三和弦会变得混浊，
//          十二平均律的三度又偏离纯律；根音和五音接近 3:2，互调出来的分音和原来的泛音很接近，声音更整齐；失真够强时还会在低八度出现新的基频，更"有力"；
//          也比较好按：ref:wiki-power-chord
//          罗马数字分析：调名写在调号下（大调大写、小调小写，可加 m）；IV = 5 − 1、VI = 5 + 1；手写大写罗马数字上下加横线；五步（叠回原位 → 认音与性质 →
//          写根音级数的罗马数字（大小写）→ 加 °、ø、+ → 写转位数字）；同一和弦连续出现可以重复写或不写；巴赫众赞歌《Jesu, meiner Seelen Wonne》（BWV 359）、
//          《Caro mio ben》的分析示例：ref:omt2e-roman-numerals
//   B2-3x：七和弦的转位与数字；只写 7 = 原位七和弦，什么都不写 = 原位三和弦；"孤立的临时记号"（不跟任何数字）指低音上方的三度；
//          建议在脑子里叠回原位而不是写出来，以节省时间：ref:omt2e-figured-bass
//          八度法则：部分谱（partimento）传统里的"小抄"，每个音级一个和弦；版本很多，OMT 的版本接近 Fedele Fenaroli（那不勒斯，1775），为保持四个声部、避免平行稍作修改；
//          四步搭建：全用平行六和弦（没错，但没有层次）→ 第一个和最后一个和弦用 5/3 → 上行与下行的属和弦也用 5/3 → 在每个主和属（含转位）前面加七和弦，
//          其中一处加半音变化以更强地离调到属；分声部练习：上方声部分别以主音、中音、属音为中心（Fenaroli 的"位置"）；
//          用模进配音阶：5–6（上行逐音交替）、7–6 延留链（上行要 7–6–8 重新开始）、五度循环（"下五上四"，隔一个低音形成级进）、2–3（7–6 的转位，上行 2–3–1）：ref:omt2e-galant-rule-octave
//          自然音模进保留移位的音程度数、不保留性质，所以留在同一个调里（IV 到 vii° 是增四度）；如果都是纯五度会变成 G–C–F–B♭–E♭…离开原调；
//          交替加副属七和弦的下行五度模进仍是自然音模进（强拍根音仍按调内音级走）；真正的半音模进保持音程性质：ref:omt2e-chromatic-sequences
//   B2-4x：紧密排列（最紧凑）与开放排列；配置本身就是音色：斯特拉文斯基《诗篇交响曲》开头的 E 小三和弦把小三度重复在四个八度、根音和五音只在两头各出现一次；
//          艾夫斯《未回答的问题》开头弦乐极弱地奏一个排得很开的 G 大三和弦；巴赫避免过多的平行：平行三度、六度不超过连续四个音；
//          drop-n：默认所有声部在同一个八度、从上往下编号，drop 把一个或几个声部降低八度；drop-1 没有定义；这套名称不包括降两个八度或同音重复：ref:wiki-voicing
//          SATB：女高、女中写在高音谱表，男高、男低写在低音谱表；女高、男高符干朝上，女中、男低朝下；音域（女高 C4–G5、女中 G3–D5、男高 C3–G4、男低 F2–D4）；
//          相邻上方声部不超过八度、男高与男低不超过十二度；间距与交叉错误最常出在女中与男高之间（写在不同谱表上）；三和弦通常重复低音上的音，导音与和弦七音等倾向音不重复，
//          七和弦一人一个音；低音必须符合罗马数字的转位，上方声部可以有多种排法：ref:omt2e-roman-numerals
//          爵士配置：重复时重复低音或根音；最常省略五音（它是泛音列里很早的分音（第 3 分音），加强根音却不太增加色彩），省七音或根音则声音变化很大；
//          演奏时根音常被省掉（由贝斯负责）：ref:omt2e-jazz-voicings
//          第一类对位：不要连续两个同样大小的完全协和（P5–P5、P8–P8，含复合音程，P5–P12 等同 P5–P5）；不同的完全协和相连（P8–P5）可以，但最好之后接不完全协和；
//          平行五八度让"音的融合"压过旋律独立，并让变化与运动停住；不要以同向进入完全协和（直接 / 隐伏八度）；避免声部交叉与超越（例：上声部 E4 后，下声部不能唱 F4）；
//          同一种不完全协和不超过连续三个；尽量反向进行：ref:omt-species1
//          V⁷ 到 I 的三种解决：默认解决（各倾向音按倾向走，得到三个根音、一个三音、没有五音的 I——完全正常，根音和三音才是必需的；re 上行到 mi 很少见、易出问题）、
//          不完全 V⁷（省五音、只能重复根音，重复 ti 或 fa 会出平行八度）、导音下跳（内声部的 ti 下跳到 sol：它不是不协和音、在内声部不显眼、是离 sol 最近的音）；
//          小调里 V⁷ 要用 ti 不用 te；写法顺序：先写整条低音，再写女高，最后成对地填内声部（我有什么、缺什么、它们要去哪）；Margaret Casson《The Cuckoo》的 PAC：ref:omt2e-v7
//          预属七和弦：和弦七音以级进或保持音进入、向下级进解决；ii⁷ 最常见，常在乐句末；ii⁷ 前面最好用 I⁶ 而不是 I（避免平行）；ii⁷ 到 V⁷ 时其中一个要不完全；
//          IV⁷、vi⁷ 较少、多为原位；V⁷ 到 vi⁷ 不常见；Josephine Lang《Dort hoch auf jenem Berge》的例子：ref:omt2e-pd7
//   B2-5x：强下属 IV 与 ii⁶ 都给低音 fa 配和声，预示属和弦要来；最常见的写法错误是平行八度或五度；写 ii⁶：先写低音 fa–sol–do，再从 V 写女高（活跃音、从上方进入与低音反向，或保持音），
//          最后填内声部；ii⁶ 是第一转位，可以重复任何让进行最顺、避开平行的音；IV 根音级进，更容易出平行，上方声部尽量和低音反向，几乎总是重复低音；
//          原位 ii 较少，大调里可作强下属（小调的 ii° 一般不用原位）；Maria Szymanowska 的进行曲例子：ref:omt2e-predominants
//          la（第六级）的用法：乐句开头延长主和弦（IV⁶ 等）；乐句中间作阻碍进行（V–vi），或用 vi 把主区接到强下属区（do–la–fa 分解）；乐句结尾作小调的弗里几亚半终止（iv⁶–V）
//          或代替强下属的 fa；OMT 把 V–vi 叫"阻碍进行"（deceptive motion）而不是"阻碍终止"，因为它避开终止；写 plagal IV⁶：低音总是向下分解、女高最常 mi–fa–sol：ref:omt2e-la-bass
//          导音和弦：三和弦总以第一转位 vii°⁶ 出现（其他转位与低音不协和）；小调要用 ti；大调里不改是半减七，作曲家几乎总把七音降低成全减七（C 大调 B–D–F–A♭），
//          vii°⁷ 比 viiø⁷ 常见得多；vii°⁷ 的各转位可以按低音代替 V⁷ 的各转位；莫扎特《安魂曲》"Agnus Dei" 用 vii°⁷ 延长主和弦：ref:omt2e-vii6
//          和声分析步骤：听出乐句结尾 → 分析结尾的终止（半终止停在 V，正格终止 V(7)–I；看低音 sol 或 sol–do）→ 往前找强下属（低音常是 fa，也可能是 re）→ 从头往终止分析；
//          每个乐句只有一组 Tb–PD–D–Te：D 标在终止的属和弦上、正格终止的主和弦标 Te（半终止可省）、PD 标在终止前第一个强下属上、Tb 标在开头的主和弦上；
//          浪漫派音乐里开头的主和弦有时延迟或省略：ref:omt2e-phrase-model
//          延长（prolongation）：和弦的影响持续得比一个和弦更久（冰淇淋的比喻）；最常见的是在主和弦之间放 V⁶ 或倒置的 V⁷：三个和弦长，首尾是 I 或 I⁶，中间是 V⁶ 或倒置的 V⁷；
//          主和弦更强，因为它在更强的拍或超拍上，并至少有一次是原位；Clara Schumann 钢琴三重奏的例子；V⁴₃ 常把 I 接到 I⁶：ref:omt2e-tonic-v6
//          plagal（变格）进行：IV 不作下属而是延长 I，分析时写成 (IV)；最常见于正格终止之后或乐句开头；OMT 用"plagal motion"而不是"plagal cadence"；
//          正格终止后的写法：I 与 (IV) 都完整、重复低音、上方声部级进或保持音，女高常是 do；亨德尔《哈利路亚》合唱：ref:omt2e-plagal
//          四和弦套路：I、IV、V、vi 是流行音乐最常见的和弦；doo-wop I–vi–IV–V（1950–60 年代，Gene Chandler《Duke of Earl》，后来还有《Friday》《Total Eclipse of the Heart》），
//          ii 可代替 IV（Otis Redding《Try a Little Tenderness》），可旋转（Coldplay《Viva la Vida》从 IV 开始）；singer/songwriter vi–IV–I–V 或 I–V–vi–IV（1990 年代中期的
//          Sarah McLachlan、Jewel、Joan Osborne），也可读作关系小调 i–VI–III–VII，调性模糊（没有正格终止，只有 IV–I 或 VII–i；《Despacito》Bm–G–D–A），
//          Heart《What About Love》在关系大小调间来回；IV–I–V–vi 的"阻碍"旋转（Lady Gaga《Alejandro》）；hopscotch IV–V–vi–I（约 2010 年后，根音"级进、级进、跳进"，
//          Sam Smith《Dancing with a Stranger》），小调读法 VI–VII–i–III，常把 VII 换成 V：ref:omt-pb-4chord
//          '50s 进行又叫"Heart and Soul"和弦、"Stand by Me"进行、"ice cream changes"：ref:wiki-50s-progression
//          I–V–vi–IV 又叫 Axis 进行（因澳洲喜剧乐队 The Axis of Awesome 而得名），四种旋转；vi–IV–I–V 被《波士顿环球报》专栏作家 Marc Hirsh 戏称为"sensitive female chord progression"：ref:wiki-axis-progression
//          王道进行（ōdō shinkō）IVM7–V7–iii7–vi，日本流行音乐常见；"王道"在日语里指轻松的办法；也叫"小恶魔和弦进行"（龟田诚治 2014 年在 NHK 节目里命名）；
//          接 ii7–V7–I 是大调里一整条五度循环（V7 代替 vii°）；V7 有第三转位（G7/F）和原位两种版本：ref:wiki-royal-road
//          帕赫贝尔《卡农》：D 大调，三声部同度卡农加固定低音；进行 I–V–vi–iii–IV–I–IV–V 属于叫作 Romanesca 的模进型；1968 年 Jean-François Paillard 室内乐团的录音让它流行起来：ref:wiki-pachelbel-canon
//   B2-6x：和声功能：主只有 I（小调 i）；强下属 IV、ii（小调 iv、ii°），弱下属 iii、vi（小调 VII、III、VI）；属 V、vii°；乐句模型至少要有主和属，通常还有下属，从左往右走；
//          终止像标点，能帮你找乐句结尾、确立调；PAC 两个条件（主和弦上女高是 do；V 与 I 都是原位），少一个就是 IAC；半终止 x–V；
//          Joseph Boulogne（圣乔治骑士）《Ballet No. 6》的半终止与 PAC：ref:omt2e-cadences
//          三种 IAC：原位 IAC（最高声部不是主音）、转位 IAC、导音 IAC（用 vii° 代替 V）；Caplin、Schmalfeldt、Hepokoski 与 Darcy 等较新的理论把后两种算作非终止；
//          躲避终止（evaded）：V⁴₂ 接 I⁶，七音必须下行到 I 的三音，于是避开了原位 I；半终止也叫"不完全终止"，是需要继续的弱终止；
//          弗里几亚半终止：小调 iv⁶–V，低音第六级到第五级的半音像 15 世纪弗里几亚调式终止里 ii–I 的半音，是文艺复兴调式和声的遗留，听起来古老，前面接 v 时更明显
//          （巴赫众赞歌《Schau, lieber Gott, wie meine Feind》）；变格终止 IV–I 常配"阿门"一词，所以也叫"阿门终止"；Caplin 质疑古典时期是否存在变格终止，19 世纪才开始出现；
//          罕见的变格半终止 I–IV（《Auld Lang Syne》，勃拉姆斯单簧管三重奏 Op. 114 呈示部结尾）；皮卡第三度：文艺复兴时期出现，调式或小调段落以大三的主和弦结束
//          （巴赫《Jesu, meine Freude》）；"阳性 / 阴性"终止至少从 1980 年代中期起就不再普遍使用，Susan McClary《Feminine Endings》讨论了乐理术语里的性别问题，
//          现在说重音 / 非重音终止；兰迪尼终止（14 世纪到 15 世纪初，上声部用一个逃逸音先缩成纯五度再到八度）；
//          爵士里有一类终止叫 turnaround（原名 turnback，更准确）：把音乐带回曲式里已经出现过的段落，AABA 里有两个；上行的减七半音终止：ref:wiki-cadence
//          终止四六：低音 sol 上方六度与四度两个装饰音（经过音、延留音）构成，是 V 的装饰，和 V(7) 一起标作 cad.⁶₄；不标 I⁶₄ 的原因：它在强下属之后（标 I 会暗示下属走到主），
//          而且它听起来是 V 的装饰；拼法：低音 sol → 找低音上方六度和四度 → 其中一个放女高 → 内声部一个重复低音（避免平行所必需）、一个放另一个音；
//          解决：六度落五度、四度落三度，接 V⁷ 时重复低音的声部下行到七音（8–7）；任何通向 V 的和弦都能通向它，最常见是强下属 IV 与 ii⁶：ref:omt2e-cad64
//          经过四六（低音经过音，两边功能相同，常延长主或下属，也可以倒过来用）；辅助四六（又叫 pedal 四六：低音不动，上方两个声部做上邻音，两边都是原位，常延长 I 或 V，
//          女高常是不动的线）；琶音四六（低音跳到五音、上方保持，例如结尾的低音分解或圆舞曲伴奏，一般不必标出；Josephine Lang《Dem Königs-Sohn》、
//          Sophie de Auguste Weyrauch《Six Danses》No. 3）：ref:omt2e-64-chords
//          安达卢西亚终止：源自弗拉门戈的说法，四个和弦级进下行，Phrygian 视角 iv–III–II–I，Aeolian 视角 i–♭VII–♭VI–V；也叫"小调下行四音音列"；可追溯到文艺复兴；
//          名字叫终止，其实多用作反复的固定音型；Del Shannon《Runaway》：ref:wiki-andalusian-cadence
//          "悲怆终止"（pathetic cadence）：正格终止前面先有那不勒斯六；pathetic 是"感人、凄切"的意思（像贝多芬《悲怆》奏鸣曲）：ref:thinkspace-cadences
//          那不勒斯六：ra 上的大三和弦，通常第一转位 ♭II⁶，ra 下行到 ti；♭II⁶–V 或 ♭II⁶–vii°⁷/V–V（减七加强推向属）；肖邦 F 小调夜曲 Op. 55 No. 1：ref:omt2e-neapolitan
//          ii–V–I：根音五度进行 + 性质序列（大调 mi7–7–ma7，小调 ø7–7–mi7，V 在大小调里都是大三）；《Afternoon in Paris》《All the Things You Are》《My Funny Valentine》
//          《Joy Spring》的最后终止都是 ii–V–I：ref:omt2e-iivi
//   B2-7x：曲式是层层嵌套的单位（乐曲 ⊃ 乐章 ⊃ 段落 ⊃ 主题 ⊃ 乐句 ⊃ 乐思 ⊃ 动机），层级有时会合并；动机是规律出现、通常比乐思小的单位，分析时圈出反复并变形的动机，
//          不要把大段旋律当动机（贝多芬第五交响曲开头的常见错误）；"动机"一词通常指音高动机，也有节奏、轮廓、音色动机；常见变形：扩大、紧缩、倒影、移位、逆行、音程变化、加装饰；
//          分段分析：先找乐句结尾（常是终止），再用方括号把乐句分成乐思（常两小节）；乐句 = 相对完整、朝目标前进并到达收束的意思；John Williams、Lin-Manuel Miranda 的例子：ref:omt2e-form-concepts
//          乐句可以是任何长度，4、8、16 小节特别常见（Schubert《Du bist die Ruh》4 小节、Fanny Hensel《Abendbild》13 小节）；方括号标乐思与次乐句，弧线标乐句及以上；
//          不是每个停顿或 V–I 都是终止；原型（句子式、乐段）与独特结构两端之间是连续谱，两类都很常见；句子式 = 呈示（基本乐思 + 重复，常 4 小节）+ 展开（常与呈示等长或更长，少有更短），
//          展开的四个特征：碎片化（只指单位长度）、节奏活动增加、模进、和声节奏加快；展开不一定有碎片化，没有的话可用"单位"（u.）标；呈示常在主和弦上，可延长主、走到属或强下属；
//          只要有呈示和展开就算"句子式的"（sentential）；乐段 = 前句（常以半终止结束）+ 后句（更强的终止，常 PAC），后句可等长或更长、少有更短；前句"提问"、后句"回答"；
//          后句的对比乐思几乎总和前句不同；转调通常发生在后句；重复乐句 = 写出来的重复（不是反复记号）；两个句子式构成前后句关系 = 复乐段；
//          Louise Farrenc 大提琴奏鸣曲、莫扎特单簧管协奏曲的例子：ref:omt2e-phrase
//          二部曲式：两个反复段，17–19 世纪很常见、大量用于舞曲；18 世纪反复记号常见、反复时期待即兴装饰，19 世纪常写出反复；再现二部（第二反复段中间某处，开头的 A 在主调回来，
//          之前常有半终止，莫扎特第 25 交响曲小步舞曲）与单纯二部；"平衡"指第一反复段的结尾在第二反复段结尾回来（主调），要有一个"交汇点"（crux）；斯卡拉蒂 K. 322：ref:omt2e-binary
//          三部曲式 ABA：A、B 各自可以反复，但 A 与 B 不一起反复；ABC 通常叫通谱体；有段落本身是完整曲式时叫复合三部（小步舞曲与三声中部、谐谑曲与三声中部）；
//          B 在调性、调式、织体、拍号、节奏、旋律、音域、配器等方面形成对比，长度大致与 A 成比例；咏叹调里的 B 常比 A 不稳定：ref:omt2e-ternary
//          奏鸣曲式：和声上开放、再现、平衡的二部曲式；呈示部 = 主部主题 P（主调，以主调终止结束）→ 过渡 TR（以"中间停顿"medial caesura 结束）→ 副部主题 S（非主调：大调多为 V，
//          小调多为 III 或 v，以"呈示部关键终止"结束）→ 结束部 C；只有 TR 不稳定；依附型 / 独立型过渡；发展部大而不稳定（模进、半音化与转调、部分的主题陈述，模进的模型常有四到八小节），
//          可能有再过渡；再现部的 S 回到主调；之前可有引子、之后可有尾声：ref:omt2e-sonata
//          回旋曲：叠句（主调、相同材料、常以主调 PAC 结束，多为紧凑的简单主题或再现二部，后来可能缩短）与插部（对比的调与材料，通常更复杂）交替；
//          插部分"内部主题"（像三声中部，常是同主音的 minore / maggiore、常是再现二部、可能不完整）和"副部主题群"（像奏鸣曲的 TR、S、CL、RT，大调到 V、小调多到 III）：ref:omt-rondo
//          扩充：内部（重复、拉长、"再来一次"one-more-time——Janet Schmalfeldt 1989 年提出：尝试终止 → 被回避 → 再试；另辟路径：绕道 detour 会回到之前的材料，改道 reroute 不回来）
//          与外部（前缀如引子；后缀如终止后的补充、小尾声、尾声）；紧缩总在乐句内部；只有意料之外的重复才算扩充；门德尔松《赫布里底群岛》序曲的绕道：ref:omt2e-phrase-expansion
//          模进：同一声部里把动机或较长段落移到更高或更低处重述；18、19 世纪最常见的发展手法之一；通常两段、很少超过三四段，方向一致、间距相同；真模进是精确移位，调内模进是按音阶移位
//          （巴赫双小提琴协奏曲第 22–24 小节两种都有）；节奏模进、变化模进：ref:wiki-sequence
//          动机是"具有主题身份的最小结构单位"（贝多芬第五交响曲的四音动机、西贝柳斯《芬兰颂》开头的两音动机）；可以有和声、旋律、节奏方面；
//          和人、地点、观念相联系的动机叫主导动机（leitmotif）或固定乐思（idée fixe）：ref:wiki-motif
//   B2-8x：离调 = 让非主和弦暂时听起来像主和弦，用从临时调借来的副属（V(7)）与副导（vii°(7)）和弦；斜线前是它在临时调里的身份、斜线后是被离调的和弦，读作"…of…"；
//          副和弦几乎总带临时记号，特别是升高音；也可以看成同根音调内和弦的变化（ii 变 II♯ = V/V）；大调里常把副导七降低七音成全减七（C 大调 vii°7/V = F♯–A–C–E♭）；
//          Joseph Bologne《Six Concertante Quartets》No. 1 的 V7/V、Josephine Lang《Du gleichst dem klaren blauen See》的 vii°7/V；半减七作副和弦在古典里罕见、爵士里几乎都是 iiø7：ref:omt2e-tonicization
//          转调 = 较长时间的主音改变；直接（突然）转调常在乐句交界处，所以也叫乐句转调；共同和弦转调：一个两个调都有的和弦，上方写旧调级数、下方写新调级数（"iv⁷ becomes ii⁷"）；
//          找共同和弦：在旧调里分析到说不通，往回退一个和弦试；最好的共同和弦两边都是下属，其次是旧调的主和弦变成新调的下属（I becomes IV），含属和弦的最差（"V becomes I"）；
//          终止确立调，同一个临时记号反复出现暗示转调；近关系调 = 调号相差不超过一个升降号（三列两行的格子）；离调与转调是一条谱的两端（长度与确立的强度），
//          中间的灰色地带叫"扩展离调"；不同的人对转调的接受程度不同；Josephine Lang《Der Winter》、Joseph Bologne 弦乐四重奏的例子：ref:omt2e-modulation
//          半音转调：调式混合扩大了共同和弦（C 大调借用 C 小调的和弦，就能轻松转到 E♭、A♭、B♭ 大调与 F、G 小调）；威尔第《弄臣》用 ♭VI⁶ 作共同和弦；勃拉姆斯 Op. 39 No. 14 把 vii°⁶ 重新理解成 ii°⁶；
//          共同音转调：特别适合半音关系的三度调（C 与 A♭ 共有 C、C 与 E♭ 共有 G、C 与 A、C 与 E 共有 E）；舒曼《献给》（Op. 25 No. 1）在第 13 小节 A♭ 大调 PAC 后，把 A♭ 重新理解成 G♯，
//          转到 F♭ 大调（为清楚写成 E 大调）；同音异名重释：属七与德国增六（七音向下级进 vs 增六度向外解决到 5̂）：ref:omt2e-chromatic-modulation
//          减七和弦可以重新拼写，让四个音中的任何一个当根音，所以能解决到四个不同的目标：ref:omt2e-dim7-reinterpret
//   B2-9x：调式混合 = 从同主音调借音，大调借小调更常见；改变和弦性质、不改变功能；可用于旋律、一个或几个和弦、扩展离调与转调；根音被降低的借用和弦前加 ♭（♭VI）；
//          只用 le 的借用和弦：ii°⁶、iiø⁷、iv；I 换成 i 常见，V 换成 v 不常见——大调里出现 v 更可能是扩展离调或转调；皮卡第三度是小调里唯一常见的混合用法，
//          名字来源不明，16、17 世纪很常见，18、19 世纪少了：ref:omt2e-mixture
//          爵士里最常见的混合：用 iiø⁷ 代替 ii⁷、在 V⁷ 上加 ♭9（都是用 le 代替 la）；Cole Porter《All of You》（Ella Fitzgerald 唱，C 大调）里 A♮ 与 A♭ 交替；
//          副属作替代：五度进行里把第一个和弦换成同根音的属七；三全音替代只出现在爵士里：替代和弦相隔三全音、且共用同一个三全音，任何属七都能换成相隔三全音的属七，
//          特征是向下半音解决；转回句常每隔一个换成三全音替代，得到半音低音线：ref:omt-pb-substitutions
//          增六和弦：增六度向外各走半音到八度（5̂），所以拼成增六度而不是小七度；小调里更常见，大调里借用 ♭6̂ 来用；意大利、法国、德国三种名称虽然以国家命名，
//          但来源众说纷纭——Kostka 与 Payne 说意大利六"没有历史依据，只是方便的传统标签"；意大利六与不完全的属七同音；法国六的音都在同一个全音音阶里，带有 19 世纪法国音乐
//          （特别是印象派）的色彩，也常见于俄罗斯音乐（舒伯特《美丽的磨坊女》第 5 首"Am Feierabend"）；贝多芬 Op. 78 第二乐章以意大利六开头；德国六与属七同音但功能不同，
//          常见于贝多芬与拉格泰姆；德国六直接到 V 容易出平行五度（"莫扎特五度"，共性写作时期偶尔被接受），可以先到终止四六避开：ref:wiki-augmented-sixth
//          增六和弦：le 与 fi 构成增六度，向外解决到 V：ref:omt2e-aug6
//          共同音减七（CTº7）与共同音增六（CT+6）与 vii°7、德国六同音但功能不同：只装饰接下来的和弦（大三和弦或属七，通常是 I 或 V），由几个同时的邻音构成，
//          含有被装饰和弦的根音（所以叫"共同音"）；四部写作里常重复被装饰和弦的五音：ref:omt2e-common-tone
//          后门进行 iv⁷–♭VII⁷–I（Jerry Coker 的说法，"后门 ii–V"；相对于 ii–V–I 这个"前门"）；♭VII⁷ 借自同主音小调，和 G7 有两个共同音，A♭ 与 F 作为上导音落到 G 与 E；
//          常见 IV–iv–♭VII⁷–I；后门 IV–V：♭VI maj7–♭VII⁷–I，也叫 Mario cadence：ref:wiki-backdoor
//          小调 line cliché（min、min/maj7、min7、min6）：从主音开始半音下行到小六度（D 小调 D、C♯、C、B），Django Reinhardt 常用，今天的 Gypsy 爵士吉他手更常用：ref:djangobooks-line-cliche
//   B2-10x：五度圈把 12 个音级排成上行纯五度的循环，反方向是上行纯四度，所以也叫四度圈；从 C 起 C G D A E B/C♭ F♯/G♭ C♯/D♭ A♭ E♭ B♭ F；相邻的调号最接近；
//          12 个 3:2 纯律五度不会正好回到起点，多出一个"毕达哥拉斯音差"，于是有了调整五度的律制（历史上的良律、十二平均律）；记谱时要在某处做一次等音替换（A♯ 上方五度写成 F，
//          技术上成了减六度）；近关系调相差一个升降号，在五度圈上相邻；和弦进行常在根音相差纯五度的和弦之间走，所以五度圈也能表示和弦之间的"和声距离"；
//          历史：1600 年代末到 1700 年代初为了说明巴洛克的转调而发展起来；第一张五度圈图出现在作曲家、理论家 Mykola Dyletsky 的《Grammatika》（1677），用来教俄罗斯读者写西方式复调；
//          Johann David Heinichen 在《Neu erfundene und gründliche Anweisung》（1711）里画了"音乐圆圈"（Musicalischer Circul），也收在《Der General-Bass in der Composition》（1728），
//          他把关系小调放在大调旁边，并不反映调的实际远近；Mattheson（1735）等人想改进，David Kellner（1737）提出大调在外圈、关系小调在内圈：ref:wiki-circle-of-fifths
//          近关系调共有六个（大调 I 为例）：ii、iii、IV、V、vi 和同主音小调 i——四个与原调只差一个音、一个音完全相同、一个主音相同；转调最常去近关系调；
//          远关系调可以经过近关系调连环转调（C → G → D）；海顿时代讲究整体调性统一；莫扎特钢琴奏鸣曲 K. 309 第一乐章只转到近关系调（属、上主、下中）：ref:wiki-closely-related
//          轴心体系：Ernő Lendvai 分析巴托克音乐时提出，关心和声与调性的替代；把 12 个音分成三组，每组四个音彼此相隔小三度或三全音（相当于三个减七和弦），叫"轴"，
//          类比主、下属、属；相隔三全音的一对叫"枝"，每条轴有主枝和副枝，两端叫"极"与"对极"；Lendvai 认为这些关系有自然的基础，试图在功能框架里"解释"巴托克的半音化：ref:wiki-axis-system
//   B2-11x：新黎曼理论以 Hugo Riemann 命名，解释靠共同音而不是靠留在一个调里的三和弦进行；每个变换都在一个大三与一个小三之间切换（像 Caps Lock，按两次回到原样）；
//          R（关系：保留大三度、另一音走全音，C ↔ Am）、P（平行：保留纯五度、另一音走半音，C ↔ Cm）、L（导音交换：保留小三度、另一音走半音，C ↔ Em）；
//          S（滑动：移动构成纯五度的两个音，C ↔ C♯m）、N（Nebenverwandt，"邻近关系"：移动构成小三度的两个音，C ↔ Fm）、H（六声极：三个音各动半音、没有共同音，C ↔ A♭m，可写成 PLP）；
//          任何两个大小三和弦之间最多五步；勃拉姆斯小提琴与大提琴二重协奏曲第一乐章第 268–79 小节用 P、L 交替连接两个 A♭ 大三和弦（Richard Cohn 1998 的问题）；
//          Laurie Anderson《O Superman》一直用连续的 L 变换；Tonnetz：横向纯五度、左上到右下大三度、左下到右上小三度，三角形是三和弦，P、R、L 是沿三条边翻三角形，
//          考虑等音时是环面；一个调里的三和弦在 Tonnetz 上挨在一起；循环：PL 六步（母音阶是半音与小三度交替的六声音阶）、RP 八步（半音与全音交替的八声音阶）、
//          RL 经过全部 24 个三和弦（常被省略或截短）、PLR 要走两轮、以一个音为中心；增三和弦填在 R 相关的两个三和弦之间，可以重新拼写，各动一个音能接三个小三与三个大三和弦——
//          Weitzmann 区域（以 19 世纪理论家 Carl Friedrich Weitzmann 命名，只有四个增三和弦）；Cube Dance（最初由 Douthett 与 Steinbach 构想）用增三和弦在 PL 循环之间"转调"：ref:omt2e-neo-riemannian
//          Douthett 与 Steinbach（1998）的"Power Towers"图把小七、属七、半减七、减七和弦纳入同一个模型：ref:mto-mcclimon
const t = (zh, ja, en) => ({ zh, ja, en });
const G = (id, gen, count, skills, params) => ({ id, type: 'gen', gen, count, skills, ...(params ? { params } : {}) });
// 整个和弦共用的标注（数字低音、和弦名……）写在谱表下方同一条基线上
const col = (ps, c, extra = {}) => ps.map((p) => ({ p, d: 'w', col: c, ...(extra.label && extra.s === undefined ? { labelAt: 'bottom' } : {}), ...extra }));

// ===================== B2-1x 和弦的构成、拼写与转位 · 扩展关 =====================
// 对应 A 面：triads（四种三和弦的拼写 / 听辨 / 调里每级的性质 / 增三与减三）、sevenths（五种七和弦 / 听辨 / 调里的七和弦 / 别名）、
// inversions（找最低音 / 七和弦的四种位置 / 斜杠和弦 / 转位综合）的进阶关
const EXT_B2_1 = {
  minutes: 22,
  insight: t('拼和弦先管字母（雪人形状），再管升降号（性质）；读转位只看最低的音，再把它叠回三度找根音。', '和音の綴りはまず文字（雪だるまの形）、次に変化記号（種類）。転回はいちばん下の音だけを見て、3 度に積み直して根音を探す。', 'Spell chords letters first (the snowperson shape), accidentals second (the quality); read inversions from the lowest note, then restack in thirds to find the root.'),
  sections: {
    discover: [
      {
        id: 'b21x-d1', type: 'discover', ref: ['wiki-harmonic-minor', 'omt2e-triads'],
        prompt: t('先听 C–E–G♯（增三和弦），再把 C 移到上面：E–G♯–C。第二个和弦听起来像什么？', 'まず C–E–G♯（増三和音）、次に C を上へ：E–G♯–C。2 つ目は何に聞こえる？', 'Hear C–E–G♯ (augmented), then move the C on top: E–G♯–C. What does the second chord sound like?'),
        play: [{ label: 'C–E–G♯', audio: { notes: [[60, 64, 68]], mode: 'chords' } }, { label: 'E–G♯–C', audio: { notes: [[64, 68, 72]], mode: 'chords' } }],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['C4', 'E4', 'G#4'], 0), ...col(['E4', 'G#4', 'C5'], 1), ...col(['E4', 'G#4', 'B#4'], 2, { lit: true })], cols: 3 },
        options: [t('还是一个增三和弦（和 E–G♯–B♯ 同音）', 'やはり増三和音（E–G♯–B♯ と同じ音）', 'Still an augmented triad (same sound as E–G♯–B♯)'), t('C 增三和弦的第一转位，听起来完全不同', 'C 増三和音の第 1 転回、まったく違う響き', 'C augmented in first inversion, sounding totally different'), t('一个大三和弦', '長三和音', 'A major triad')],
        answer: 0,
        insight: {
          title: t('只用大三度叠成的和弦', '長 3 度だけでできた和音', 'A chord built only of major thirds'),
          text: t('增三和弦是两个大三度叠成的；转位以后，相邻的音还是两个大三度（G♯–C 写成 G♯–B♯ 就看得出来），所以听起来还是增三和弦，只是拼法换了。和声小调的 III 级就是增三和弦——它不会出现在七种"自然"调式的和声里，在半音化和声的发展中起过作用。', '増三和音は長 3 度 2 つでできている。転回しても隣り合う音はやはり長 3 度 2 つ（G♯–C を G♯–B♯ と書けば分かる）なので、響きは増三和音のまま、綴りが変わるだけ。和声的短音階の III は増三和音——7 つの「自然な」旋法の和声には出てこず、半音階的和声の発展に一役買った。', 'An augmented triad is two stacked major thirds; inverted, its neighbours are still two major thirds (spell G♯–C as G♯–B♯ and you see it), so it still sounds augmented — only the spelling changes. Harmonic minor’s III is augmented — a chord absent from the harmony of the seven “natural” modes, which played a part in the rise of chromaticism.'),
        },
      },
    ],
    explain: [
      {
        id: 'b21x-e1', type: 'page', ref: ['omt2e-triads', 'omt-triads'],
        title: t('进阶 1 · 四步拼出任何三和弦', '発展 1・4 ステップでどんな三和音も綴る', 'Advanced 1 · Spell any triad in four steps'),
        text: [
          t('① 写根音；② 在上面画"雪人"——三度、五度的字母（全在线上或全在间里）；③ 想根音的大调调号；④ 把调号里用得到的升降号加上，得到大三和弦；要小、减、增三和弦，再改三音或五音。例：A♭ 小三和弦——A♭、C、E；A♭ 大调有 B♭ E♭ A♭ D♭，加上 E♭ 得到 A♭–C–E♭（大三）；三音降半音 → A♭–C♭–E♭。', '① 根音を書く。② その上に「雪だるま」——3 度・5 度の文字（全部線か全部間）。③ 根音の長調の調号を思い出す。④ 調号の変化記号を付けて長三和音に。短・減・増なら 3 度か 5 度をさらに変える。例：A♭ の短三和音——A♭・C・E。A♭ 長調は B♭ E♭ A♭ D♭ なので E♭ を付けて A♭–C–E♭（長三）、3 度を半音下げて A♭–C♭–E♭。', '① Write the root; ② draw the snowperson above it — the letters a third and a fifth up, all lines or all spaces; ③ recall the root’s major key signature; ④ add the accidentals that apply to get a major triad, then alter the third or fifth for minor, diminished or augmented. E.g. A♭ minor: A♭, C, E; A♭ major has B♭ E♭ A♭ D♭, so E♭ gives A♭–C–E♭ (major); lower the third → A♭–C♭–E♭.'),
          t('名字从哪来：大、小三和弦按三度的性质命名（五度都是纯五度）；减、增三和弦按五度的性质命名（减五度、增五度）。用唱名记：大 do–mi–sol，小 do–me–sol 或 la–do–mi，减 ti–re–fa，增 me–sol–ti。', '名前の由来：長・短三和音は 3 度の種類で（5 度はどちらも完全）、減・増三和音は 5 度の種類で名づける。階名で覚えると：長 do–mi–sol、短 do–me–sol か la–do–mi、減 ti–re–fa、増 me–sol–ti。', 'Where the names come from: major and minor triads are named for their third (both have perfect fifths); diminished and augmented for their fifth. In solfège: major do–mi–sol, minor do–me–sol or la–do–mi, diminished ti–re–fa, augmented me–sol–ti.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [{ p: 'Ab4', d: 'w', col: 0 }, ...col(['Ab4', 'C5', 'E5'], 1), ...col(['Ab4', 'C5', 'Eb5'], 2), ...col(['Ab4', 'Cb5', 'Eb5'], 3, { lit: true })], cols: 4 },
      },
      {
        id: 'b21x-e2', type: 'discover', practice: true, ref: 'omt2e-triads',
        prompt: t('D♭ 减三和弦怎么拼？', 'D♭ の減三和音の綴りは？', 'How is a D♭ diminished triad spelled?'),
        options: ['D♭ F♭ A𝄫', 'D♭ E A♭', 'D♭ F A♭', 'C♯ E G'],
        answer: 0,
        insight: { title: t('先大三，再改三音和五音', 'まず長三、それから 3 度と 5 度', 'Major first, then alter third and fifth'), text: t('D♭ 大三 = D♭ F A♭；减三和弦要小三度 + 减五度：F → F♭，A♭ → A𝄫。字母保持 D、F、A。', 'D♭ 長三 = D♭ F A♭。減三は短 3 度 + 減 5 度：F → F♭、A♭ → A𝄫。文字は D・F・A のまま。', 'D♭ major = D♭ F A♭; diminished needs a minor third and diminished fifth: F → F♭, A♭ → A𝄫. Letters stay D, F, A.') },
      },
      {
        id: 'b21x-e3', type: 'page', ref: ['omt2e-roman-numerals', 'wiki-harmonic-minor'],
        title: t('进阶 3、4 · 调里每一级的性质，和两个"特别"的三和弦', '発展 3・4・各音度の和音の種類と、2 つの「特別な」三和音', 'Advanced 3–4 · Chord qualities on each degree, and two special triads'),
        text: [
          t('每个大调都一样：I、IV、V 大三，ii、iii、vi 小三，vii° 减三。小调：i、ii°、III、iv、v / V、VI、VII / vii°——用升高的导音时 v 变成 V、VII 变成 vii°。描述一个三和弦要说清楚三件事：根音、性质、转位。', 'どの長調も同じ：I・IV・V は長三、ii・iii・vi は短三、vii° は減三。短調：i・ii°・III・iv・v / V・VI・VII / vii°——導音を上げると v は V、VII は vii° に。三和音は根音・種類・転回の 3 つで表す。', 'Every major key is the same: I, IV, V major; ii, iii, vi minor; vii° diminished. Minor: i, ii°, III, iv, v / V, VI, VII / vii° — with the raised leading tone v becomes V and VII becomes vii°. A triad is described by root, quality and inversion.'),
          t('和声小调把自然小调的第七级升高，第六、七级之间出现增二度。它的 III 级是增三和弦（III+），在七种"自然"调式的和声里都找不到；vii° 是减三和弦，有属功能。减七和弦则是四个音全用小三度叠起来的。', '和声的短音階は自然短音階の第 7 音を上げ、第 6・7 音の間に増 2 度ができる。III は増三和音（III+）で、7 つの「自然な」旋法の和声には見つからない。vii° は減三和音で属機能をもつ。減七の和音は 4 音すべて短 3 度で積む。', 'Harmonic minor raises natural minor’s seventh, leaving an augmented second between 6 and 7. Its III is augmented (III+), found in none of the seven “natural” modes’ harmony; vii° is diminished, with dominant function. A diminished seventh stacks minor thirds all the way.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['C4', 'E4', 'G#4'], 0, { lit: true }), ...col(['G#4', 'B4', 'D5'], 1), ...col(['G#4', 'B4', 'D5', 'F5'], 2)], cols: 3 },
      },
      {
        id: 'b21x-e4', type: 'page', ref: 'omt2e-sevenths',
        title: t('进阶 5 · 七和弦：拼法、名字和听感', '発展 5・七の和音：綴り・名前・響き', 'Advanced 5 · Seventh chords: spelling, names, sound'),
        text: [
          t('七和弦是四个能叠成三度的音，像"加长的雪人"：根音、三音、五音、七音（也叫"和弦七音"，免得和音阶的第七级混淆）。拼法和三和弦一样，只是多画一个七度：例如 A♭ 减七——先写 A♭ C E G，想 A♭ 大调调号得到 A♭ C E♭ G，再改成减三和弦 + 减七度：C♭、E𝄫、G♭ → A♭–C♭–E𝄫–G♭。根音如果是"假想调"（需要重升重降），先用等音改写。', '七の和音は 3 度に積める 4 音、「長い雪だるま」：根音・第 3 音・第 5 音・第 7 音（音階の第 7 音と区別して「和音の 7 度」とも）。綴り方は三和音と同じで 7 度を 1 つ足すだけ：A♭ の減七——A♭ C E G を書き、A♭ 長調の調号で A♭ C E♭ G、さらに減三和音 + 減 7 度に：C♭・E𝄫・G♭ → A♭–C♭–E𝄫–G♭。根音が「架空の調」になるなら異名同音で書き直す。', 'A seventh chord is four notes stackable in thirds — an “extra-long snowperson”: root, third, fifth, seventh (the “chordal seventh”, distinct from scale degree 7). Spell it like a triad with one more third: A♭ fully diminished — write A♭ C E G, apply A♭ major’s signature (A♭ C E♭ G), then make a diminished triad plus diminished seventh: C♭, E𝄫, G♭ → A♭–C♭–E𝄫–G♭. If the root’s key would be imaginary, respell enharmonically.'),
          t('两套名字：大大七（= 大七和弦）、大小七（= 属七和弦）、小小七（= 小七和弦）、半减七（没有别名）、全减七（= 减七和弦）；前一个字说三和弦，后一个字说七度。学听音时常配个比喻：大七"快乐又爵士"，属七"没有解决、急着要去下一个和弦"，小七"忧伤又爵士"，半减七"吓人又爵士"，减七"很吓人"。', '2 組の名前：長長七（= 長七）、長短七（= 属七）、短短七（= 短七）、半減七（別名なし）、完全減七（= 減七）。前の字が三和音、後の字が 7 度。聴き分けにはよく比喩を使う：長七「楽しくてジャズっぽい」、属七「解決していない、次へ行きたい」、短七「悲しくてジャズっぽい」、半減七「怖くてジャズっぽい」、減七「とても怖い」。', 'Two naming systems: major-major (= major seventh), major-minor (= dominant seventh), minor-minor (= minor seventh), half-diminished (no other name), fully diminished (= diminished seventh); the first word is the triad, the second the seventh. For ear training people pair them with images: major seventh “happy and jazzy”, dominant seventh “unresolved, needing to move”, minor seventh “sad and jazzy”, half-diminished “scary and jazzy”, fully diminished “very scary”.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['Ab4', 'Cb5', 'Ebb5', 'Gb5'], 0, { lit: true }), ...col(['C#4', 'E4', 'G4', 'B4'], 1)], cols: 2 },
      },
      {
        id: 'b21x-e5', type: 'discover', practice: true, ref: 'omt2e-sevenths',
        prompt: t('C♯ 半减七和弦怎么拼？', 'C♯ の半減七の綴りは？', 'Spell a C♯ half-diminished seventh chord.'),
        play: [{ label: t('播放', '再生', 'Play'), audio: { notes: [[61, 64, 67, 71]], mode: 'chords' } }],
        options: ['C♯ E G B', 'C♯ E G B♭', 'C♯ E♯ G♯ B', 'C♯ E G♯ B'],
        answer: 0,
        insight: { title: t('减三和弦 + 小七度', '減三和音 + 短 7 度', 'Diminished triad + minor seventh'), text: t('C♯ 大三 C♯ E♯ G♯ → 减三 C♯ E G；C♯ 到 B 是小七度：C♯ E G B。', 'C♯ 長三 C♯ E♯ G♯ → 減三 C♯ E G。C♯ から B は短 7 度：C♯ E G B。', 'C♯ major C♯ E♯ G♯ → diminished C♯ E G; C♯ to B is a minor seventh: C♯ E G B.') },
      },
      {
        id: 'b21x-e6', type: 'page', ref: 'omt2e-figured-bass',
        title: t('进阶 6、7 · 低音不等于根音：数字低音的全写与缩写', '発展 6・7・バスは根音ではない：数字付き低音の全形と略記', 'Advanced 6–7 · The bass is not the root: full and abbreviated figures'),
        text: [
          t('"低音"是整首曲子最低的那个声部，不管谁在唱或奏。A 大三和弦的根音永远是 A；原位低音是 A，第一转位低音是 C♯，第二转位低音是 E。数字低音写的是低音上方的音程（不是根音上方），大数字写在上面：原位 5/3，第一转位 6/3，第二转位 6/4。', '「バス」は曲のいちばん低い声部で、誰が歌い奏でていてもよい。A の長三和音の根音はいつも A。基本形のバスは A、第 1 転回は C♯、第 2 転回は E。数字はバスから上の音程（根音からではない）、大きい数字が上：基本形 5/3、第 1 転回 6/3、第 2 転回 6/4。', 'The bass is the lowest voice, whoever sings or plays it. An A major triad’s root is always A; in root position the bass is A, in first inversion C♯, in second E. Figures give intervals above the bass (not the root), larger numbers on top: root position 5/3, first inversion 6/3, second 6/4.'),
          t('几个世纪前纸和墨水很贵，人们把数字缩写：原位什么都不写，第一转位写 6，第二转位保留 6/4，免得和 6 混在一起。七和弦：7、6/5、4/3、4/2。把数字低音变成和弦叫"realizing"。要改变某个音，就在那个数字前写升降号；也可以在数字上画斜线或在前面加"+"，表示升高半音。', '昔は紙とインクが高かったので数字を略した：基本形は何も書かず、第 1 転回は 6、第 2 転回は 6 と混同しないよう 6/4 のまま。七の和音は 7・6/5・4/3・4/2。数字から和音にするのを「realizing」という。ある音を変えるには、その数字の前に変化記号を書く。数字に斜線や前に「+」を付けて半音上げを示すこともある。', 'Centuries ago paper and ink were expensive, so figures were abbreviated: root position gets nothing, first inversion 6, second inversion keeps 6/4 to avoid confusion with 6. Sevenths: 7, 6/5, 4/3, 4/2. Turning figures into chords is “realizing” them. To alter a note, put the accidental before its figure; a slash through a figure or a “+” before it also means raise a half step.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['A3', 'C#4', 'E4'], 0, { label: '5/3' }), ...col(['C#4', 'E4', 'A4'], 1, { label: '6' }), ...col(['E4', 'A4', 'C#5'], 2, { label: '6/4' })], cols: 3 },
      },
      {
        id: 'b21x-e7', type: 'demo', ref: 'omt2e-figured-bass',
        title: t('G7 的四种位置', 'G7 の 4 つの形', 'Four positions of G7'),
        steps: [
          { text: t('原位：G 在低音 → 7。第一转位：B 在低音 → 6/5。', '基本形：バス G → 7。第 1 転回：バス B → 6/5。', 'Root position: G in the bass → 7. First inversion: B in the bass → 6/5.'), visual: { kind: 'notation', staves: [{ clef: 'bass' }], notes: [...col(['G2', 'B2', 'D3', 'F3'], 0, { label: '7' }), ...col(['B2', 'D3', 'F3', 'G3'], 1, { label: '6/5' })], cols: 2 }, audio: { notes: [[43, 47, 50, 53], [47, 50, 53, 55]], mode: 'chords' } },
          { text: t('第二转位：D 在低音 → 4/3。第三转位：七音 F 在低音 → 4/2。', '第 2 転回：バス D → 4/3。第 3 転回：第 7 音 F がバス → 4/2。', 'Second inversion: D in the bass → 4/3. Third inversion: the seventh F in the bass → 4/2.'), visual: { kind: 'notation', staves: [{ clef: 'bass' }], notes: [...col(['D3', 'F3', 'G3', 'B3'], 0, { label: '4/3' }), ...col(['F2', 'G2', 'B2', 'D3'], 1, { label: '4/2' })], cols: 2 }, audio: { notes: [[50, 53, 55, 59], [41, 43, 47, 50]], mode: 'chords' } },
        ],
      },
      {
        id: 'b21x-e8', type: 'discover', practice: true, ref: 'omt2e-figured-bass',
        prompt: t('低音是 F，上面有 G、D、B（叠回三度是 G B D F）。数字低音写？', 'バスは F、上に G・D・B（3 度に積み直すと G B D F）。数字は？', 'The bass is F with G, D, B above (restacked: G B D F). The figures are…'),
        options: ['4/2', '6/5', '4/3', '7'],
        answer: 0,
        insight: { title: t('七音在低音', '第 7 音がバス', 'The seventh in the bass'), text: t('根音是 G，低音 F 是七音 → 第三转位 → 4/2。', '根音は G、バスの F は第 7 音 → 第 3 転回 → 4/2。', 'The root is G; the bass F is the seventh → third inversion → 4/2.') },
      },
      {
        id: 'b21x-e9', type: 'page', ref: 'wiki-chord-notation',
        title: t('进阶 8 · 斜杠和弦：转位，还是另一个低音', '発展 8・スラッシュ・コード：転回か、別のバスか', 'Advanced 8 · Slash chords: inversion or a different bass'),
        text: [
          t('斜杠后面写的是低音。如果低音是和弦自己的音，这就是转位：C/E = C 大三和弦第一转位，C/G = 第二转位。', 'スラッシュの後はバス。バスが和音自身の音なら転回：C/E = C 長三和音の第 1 転回、C/G = 第 2 転回。', 'After the slash comes the bass. If the bass is a chord tone, it is an inversion: C/E = C major in first inversion, C/G = second inversion.'),
          t('低音也可以不是和弦音——这就是一个和弦放在另一个低音上面，叫"上方结构"（upper structure）：C/A♭（A♭–C–E–G）等于 A♭M7♯5，Am/D 就是 D–A–C–E。爵士的和弦记号通常让演奏者自由配置、自己加张力音；作曲家想要某一组特定的张力音时，才会用上方结构写出来。', 'バスが和音にない音でもよい——和音を別のバスの上に置く「アッパー・ストラクチャー」：C/A♭（A♭–C–E–G）は A♭M7♯5、Am/D は D–A–C–E。ジャズのコード表記はふつう配置やテンションを奏者に任せる。作曲者が特定のテンションの組を求めるときにアッパー・ストラクチャーで書く。', 'The bass need not be a chord tone — a chord over a different bass, an upper structure: C/A♭ (A♭–C–E–G) equals A♭M7♯5; Am/D is D–A–C–E. Jazz symbols usually leave voicing and added tensions to the player; upper structures are used when the composer wants a specific set of tensions.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes: [...col(['E4', 'G4', 'C5'], 0, { s: 0 }), { p: 'E3', d: 'w', s: 1, col: 0, label: 'C/E' }, ...col(['C4', 'E4', 'G4'], 1, { s: 0 }), { p: 'Ab2', d: 'w', s: 1, col: 1, lit: true, label: 'C/A♭' }], cols: 2 },
      },
      {
        id: 'b21x-e10', type: 'discover', practice: true, ref: 'wiki-chord-notation',
        prompt: t('Am/C 和 Am/D，哪一个是转位？', 'Am/C と Am/D、転回なのはどっち？', 'Am/C or Am/D — which is an inversion?'),
        options: [t('Am/C：C 是 Am 的三音', 'Am/C：C は Am の第 3 音', 'Am/C: C is Am’s third'), t('Am/D：D 是 Am 的根音', 'Am/D：D は Am の根音', 'Am/D: D is Am’s root'), t('两个都是', 'どちらも', 'Both')],
        answer: 0,
        insight: { title: t('低音是不是和弦音', 'バスが和音の音かどうか', 'Is the bass a chord tone?'), text: t('A C E 里有 C：Am/C 是第一转位。D 不在里面：Am/D 是上方结构，合起来是 D–A–C–E。', 'A C E に C がある：Am/C は第 1 転回。D はない：Am/D はアッパー・ストラクチャーで D–A–C–E。', 'C is in A C E: Am/C is first inversion. D is not: Am/D is an upper structure, D–A–C–E.') },
      },
    ],
    experiment: [
      { id: 'b21x-x1', type: 'experiment', toy: 'chord', ref: ['omt2e-triads', 'omt2e-sevenths', 'omt2e-figured-bass'],
        prompt: t('选增三和弦，依次换三种转位：拼法变了，听起来却一直是增三和弦。再选减七和弦试四个位置。最后选 A♭ 减七，看 C♭、E𝄫 是怎么出现的。', '増三和音を選び、3 つの形を順に：綴りは変わるが響きは増三和音のまま。次に減七で 4 つの形。最後に A♭ の減七で C♭・E𝄫 がどう出るか見よう。', 'Choose an augmented triad and step through its inversions: the spelling changes, the sound stays augmented. Then try the four positions of a diminished seventh. Finally pick A♭ diminished seventh and watch C♭ and E𝄫 appear.'),
        params: { quality: 'aug' },
        breakthrough: { id: 'b21x-symmetric', text: t('你发现了：只用一种音程叠成的和弦，转位以后"换汤不换药"。', '1 種類の音程だけで積んだ和音は、転回しても中身は同じ——見つけた。', 'You found it: chords built from one interval stay the same kind of chord when inverted.') } },
    ],
    challenge: [
      {
        id: 'b21x-c1', type: 'choice', error: 'wrong-chord', skills: ['spell'], ref: ['omt2e-triads', 'omt2e-sevenths'],
        variants: [
          { prompt: t('E♭ 增三和弦怎么拼？', 'E♭ の増三和音の綴りは？', 'Spell E♭ augmented.'), options: ['E♭ G B', 'E♭ G B♭', 'E♭ G♭ B♭', 'D♯ G B'] },
          { prompt: t('B♭ 减七和弦怎么拼？', 'B♭ の減七の綴りは？', 'Spell B♭ fully diminished seventh.'), options: ['B♭ D♭ F♭ A𝄫', 'B♭ D♭ F♭ A♭', 'B♭ D F A♭', 'A♯ C♯ E G'] },
          { prompt: t('F♯ 大七和弦怎么拼？', 'F♯ の長七の綴りは？', 'Spell F♯ major seventh.'), options: ['F♯ A♯ C♯ E♯', 'F♯ A♯ C♯ E', 'F♯ A C♯ E', 'G♭ B♭ D♭ F'] },
        ],
        answer: 0,
        explain: t('先画雪人（字母），用根音的大调调号得到大三和弦 / 大七和弦，再改三音、五音、七音；字母始终不变。', 'まず雪だるま（文字）、根音の長調の調号で長三・長七にし、3・5・7 度を変える。文字は変えない。', 'Draw the snowperson (letters), apply the root’s major signature for a major triad or major seventh, then alter third, fifth, seventh — never change the letters.'),
      },
      {
        id: 'b21x-c2', type: 'choice', error: 'wrong-inversion', skills: ['identify'], ref: 'omt2e-figured-bass',
        variants: [
          { prompt: t('E♭ 大三和弦，低音是 B♭。完整数字和缩写分别是？', 'E♭ 長三和音、バス B♭。全形と略記は？', 'E♭ major with B♭ in the bass. Full and abbreviated figures?'), options: ['6/4 · 6/4', '6/3 · 6', '5/3 · —', '6/4 · 6'] },
          { prompt: t('G 小三和弦，低音是 B♭。完整数字和缩写分别是？', 'G 短三和音、バス B♭。全形と略記は？', 'G minor with B♭ in the bass. Full and abbreviated figures?'), options: ['6/3 · 6', '6/4 · 6/4', '5/3 · —', '6/5 · 6/5'] },
          { prompt: t('D7（D F♯ A C），低音是 F♯。数字低音写？', 'D7（D F♯ A C）、バス F♯。数字は？', 'D7 (D F♯ A C) with F♯ in the bass. The figures are…'), options: ['6/5', '4/3', '4/2', '7'] },
        ],
        answer: 0,
        explain: t('五音在低音的三和弦保留 6/4（免得和 6 混淆）；三音在低音写 6；七和弦三音在低音写 6/5。', '5 度がバスの三和音は 6/4 のまま（6 と混同しないため）。3 度がバスなら 6。七の和音で 3 度がバスなら 6/5。', 'A triad with its fifth in the bass keeps 6/4 (to avoid confusion with 6); third in the bass is 6; a seventh chord with its third in the bass is 6/5.'),
      },
      {
        id: 'b21x-c3', type: 'choice', error: 'wrong-chord', skills: ['identify'], ref: 'omt2e-sevenths',
        variants: [
          { prompt: t('"大小七和弦"的另一个名字是？', '「長短七」の別名は？', 'Another name for the major-minor seventh chord is…'), options: [t('属七和弦', '属七', 'dominant seventh'), t('大七和弦', '長七', 'major seventh'), t('小七和弦', '短七', 'minor seventh'), t('半减七和弦', '半減七', 'half-diminished seventh')] },
          { prompt: t('哪一种七和弦通常没有别名？', '別名がふつうない七の和音は？', 'Which seventh chord typically has no other name?'), options: [t('半减七和弦', '半減七', 'half-diminished'), t('全减七和弦', '完全減七', 'fully diminished'), t('大大七和弦', '長長七', 'major-major'), t('小小七和弦', '短短七', 'minor-minor')] },
          { prompt: t('"和弦七音"为什么要加"和弦"两个字？', '「和音の 7 度」とわざわざ言うのはなぜ？', 'Why say “chordal” seventh?'), options: [t('和音阶的第七级区分开', '音階の第 7 音と区別するため', 'To distinguish it from scale degree 7'), t('因为它总是最低的音', 'いつもいちばん低いから', 'Because it is always lowest'), t('因为它总要升高', 'いつも上げるから', 'Because it is always raised')] },
        ],
        answer: 0,
        explain: t('大小七 = 属七；半减七没有别名；"和弦七音"是根音上方七度，和"第七级"不是一回事。', '長短七 = 属七。半減七に別名はない。「和音の 7 度」は根音から 7 度上の音で、「第 7 音度」とは別。', 'Major-minor = dominant seventh; the half-diminished has no other name; the chordal seventh is a seventh above the root, not scale degree 7.'),
      },
      {
        id: 'b21x-c4', type: 'choice', error: 'wrong-inversion', skills: ['identify'], ref: ['wiki-chord-notation', 'omt2e-figured-bass'],
        variants: [
          { prompt: t('C/E 是什么？', 'C/E とは？', 'What is C/E?'), options: [t('C 大三和弦第一转位', 'C 長三和音の第 1 転回', 'C major in first inversion'), t('E 小三和弦', 'E の短三和音', 'E minor'), t('上方结构，低音不是和弦音', 'アッパー・ストラクチャー', 'An upper structure with a non-chord bass')] },
          { prompt: t('C/A♭ 合起来等于哪个和弦？', 'C/A♭ を合わせると何？', 'C/A♭ altogether equals…'), options: ['A♭M7♯5', 'A♭maj7', 'Cm7', 'A♭7'] },
          { prompt: t('G/F 的低音 F 是 G 三和弦的音吗？', 'G/F のバス F は G 三和音の音？', 'Is the bass F of G/F a note of the G triad?'), options: [t('不是：另一个低音放在下面', 'いいえ：別のバスを下に置く', 'No: a different bass placed below'), t('是：它是三音', 'はい：第 3 音', 'Yes: it is the third'), t('是：它是五音', 'はい：第 5 音', 'Yes: it is the fifth')] },
        ],
        answer: 0,
        explain: t('斜杠后是低音：是和弦音就是转位，不是就是上方结构（C/A♭ = A♭–C–E–G = A♭M7♯5）。', 'スラッシュの後はバス：和音の音なら転回、違えばアッパー・ストラクチャー（C/A♭ = A♭–C–E–G = A♭M7♯5）。', 'After the slash is the bass: a chord tone means inversion, otherwise an upper structure (C/A♭ = A♭–C–E–G = A♭M7♯5).'),
      },
      {
        id: 'b21x-c5', type: 'choice', error: 'wrong-function', skills: ['function'], ref: ['omt2e-roman-numerals', 'wiki-harmonic-minor'],
        variants: [
          { prompt: t('A 和声小调的 III 级三和弦是？', 'イ和声的短音階の III は？', 'The III triad of A harmonic minor is…'), options: [t('C E G♯（增三）', 'C E G♯（増三）', 'C E G♯ (augmented)'), t('C E G（大三）', 'C E G（長三）', 'C E G (major)'), t('C E♭ G（小三）', 'C E♭ G（短三）', 'C E♭ G (minor)')] },
          { prompt: t('大调里 iii 级七和弦是什么性质？', '長調の iii の七の和音は？', 'In major, the iii seventh chord is…'), options: [t('小七', '短七', 'minor seventh'), t('大七', '長七', 'major seventh'), t('属七', '属七', 'dominant seventh'), t('半减七', '半減七', 'half-diminished')] },
          { prompt: t('I⁷ 和 V⁷ 写法都是"大写 + 7"，它们的七度一样吗？', 'I⁷ と V⁷ はどちらも「大文字 + 7」。7 度は同じ？', 'I⁷ and V⁷ are both “capital + 7”. Are their sevenths the same?'), options: [t('不一样：I⁷ 是大七，V⁷ 是属七（小七度）', '違う：I⁷ は長七、V⁷ は属七（短 7 度）', 'No: I⁷ is a major seventh, V⁷ a dominant seventh (minor seventh)'), t('一样，都是大七度', '同じ、どちらも長 7 度', 'Yes, both major sevenths')] },
        ],
        answer: 0,
        explain: t('和声小调升高第七级，III 变成增三；大调 iii⁷ 是小七；大写只说明三和弦是大三，七度是大是小要看调。', '和声的短音階は第 7 音を上げ III が増三に。長調の iii⁷ は短七。大文字は三和音が長三という意味だけで、7 度は調で決まる。', 'Harmonic minor raises the seventh, making III augmented; major’s iii⁷ is a minor seventh; capitals only say the triad is major — the seventh depends on the key.'),
      },
      G('b21x-g1', 'seventhSpell', 1, ['spell']),
      G('b21x-g2', 'inversionBass', 1, ['identify']),
      G('b21x-g3', 'triadEar', 1, ['hearing']),
      G('b21x-g4', 'seventhEar', 1, ['hearing']),
    ],
  },
  pool: [G('b21x-p1', 'triadSpell', 3, ['spell']), G('b21x-p2', 'seventhSpell', 2, ['spell']), G('b21x-p3', 'inversionBass', 2, ['identify'])],
};

// ===================== B2-2x 和弦符号 ⇄ 罗马数字 · 扩展关 =====================
// 对应 A 面：symbols（同一和弦不同写法 / 七和弦记号 / 9、11、13 / 综合）、chordplus（sus / add 与 6 / 强力和弦 / 综合）、
// roman（大调罗马数字 / 七和弦的罗马数字 / 分析五步 / 综合）、支线 symbols2（斜线与转位 / 流行的 6 与古典的 6 / sus 与 add / 两套记法翻译）的进阶关
const EXT_B2_2 = {
  minutes: 24,
  insight: t('和弦符号告诉手指"弹哪些音"，罗马数字告诉耳朵"它在调里是谁"——同一个数字 6，在两套记法里意思完全不同。', 'コード・シンボルは指に「どの音を弾くか」、ローマ数字は耳に「調の中で誰か」を伝える——同じ数字 6 でも 2 つの記法で意味がまるで違う。', 'Chord symbols tell your fingers which notes to play; Roman numerals tell your ear who the chord is in the key — and the same digit 6 means completely different things in the two systems.'),
  sections: {
    discover: [
      {
        id: 'b22x-d1', type: 'discover', ref: ['wiki-sixth-chord', 'omt2e-chord-symbols', 'omt2e-figured-bass'],
        prompt: t('A：流行和弦符号 C6；B：C 大调里的古典罗马数字 I6。听一听、看一看，两个"6"是同一个意思吗？', 'A：ポップスのコード・シンボル C6、B：ハ長調の古典ローマ数字 I6。聴いて見比べよう。2 つの「6」は同じ意味？', 'A: the pop chord symbol C6; B: the classical Roman numeral I6 in C major. Listen and look — do the two 6s mean the same thing?'),
        play: [{ label: 'A：C6', audio: { notes: [[48, 60, 64, 67, 69]], mode: 'chords' } }, { label: 'B：I6', audio: { notes: [[52, 60, 67, 72]], mode: 'chords' } }],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes: [...col(['C4', 'E4', 'G4', 'A4'], 0, { s: 0 }), { p: 'C3', d: 'w', s: 1, col: 0, label: 'C6' }, ...col(['C4', 'G4', 'C5'], 1, { s: 0 }), { p: 'E3', d: 'w', s: 1, col: 1, label: 'I6' }], cols: 2 },
        options: [t('不是：C6 是加了大六度的 C 大三和弦；I6 是 C 大三和弦的第一转位', '違う：C6 は長 6 度を加えた C の長三和音、I6 は C の長三和音の第 1 転回', 'No: C6 is a C major triad with an added major sixth; I6 is C major in first inversion'), t('是：都是加六度', '同じ：どちらも 6 度を加える', 'Yes: both add a sixth'), t('是：都是第一转位', '同じ：どちらも第 1 転回', 'Yes: both are first inversion')],
        answer: 0,
        insight: {
          title: t('先问：这是哪一套记法？', 'まず：どちらの記法か', 'First ask: which system is this?'),
          text: t('流行符号里加六度很常见、又不会被误解，所以直接写 C6（C E G A），不写 add。古典数字低音里的 6 指"低音上方有三度和六度"，就是第一转位：I6 低音是 E。18 世纪拉莫把加六的和弦叫 sixte ajoutée；C6 和 Am7 第一转位音完全一样，根音是谁要看语境。', 'ポップスでは 6 度の付加がよくあり誤解もないので add を付けず C6（C E G A）と書く。古典の数字の 6 は「バスの上に 3 度と 6 度」、つまり第 1 転回：I6 のバスは E。18 世紀にラモーは付加 6 の和音を sixte ajoutée と呼んだ。C6 と Am7 の第 1 転回は同じ音で、根音は文脈で決まる。', 'In pop symbols an added sixth is common and unambiguous, so C6 (C E G A) is written without “add”. In classical figures, 6 means a third and sixth above the bass — first inversion: I6 has E in the bass. In the 18th century Rameau called the added-sixth chord the sixte ajoutée; C6 and Am7 in first inversion share the same notes, and context decides the root.'),
        },
      },
    ],
    explain: [
      {
        id: 'b22x-e1', type: 'page', ref: 'omt2e-chord-symbols',
        title: t('进阶 1 · 和弦符号的四个部分与"默认值"', '発展 1・コード・シンボルの 4 部分と「既定値」', 'Advanced 1 · The four parts of a chord symbol and its defaults'),
        text: [
          t('一个和弦符号最多有四部分：① 根音；② 三和弦的性质；③ 延伸音；④ 不是根音时的低音（斜杠后）。它也叫"lead sheet 符号"——lead sheet 是只写旋律和这些符号的爵士谱。', 'コード・シンボルは最大 4 部分：① 根音、② 三和音の種類、③ テンション（延長音）、④ 根音でないときのバス（スラッシュの後）。リードシート記号とも呼ぶ——リードシートは旋律とこの記号だけのジャズの譜面。', 'A chord symbol has up to four parts: ① the root; ② the triad quality; ③ extensions; ④ a non-root bass after a slash. They are also called lead-sheet symbols, after jazz scores that show only a melody and these symbols.'),
          t('默认值：只写字母就是大三和弦；加上的 7 默认是小七度——所以 C7 是属七（大三和弦 + 小七度）；其他延伸音和加音默认是大音程或纯音程。小三和弦可以写 Cm、C−、Cmin，减三和弦 C°、Cdim……这些写法是随着爵士发展一路产生的，从来没有完全统一；看懂各种写法，但自己写时选一种用到底。', '既定値：文字だけなら長三和音。付ける 7 は既定で短 7 度——だから C7 は属七（長三 + 短 7 度）。ほかのテンションや付加音は既定で長か完全。短三和音は Cm・C−・Cmin、減三和音は C°・Cdim……ジャズとともに生まれ、完全には統一されなかった。いろいろ読めるようにし、自分で書くときは 1 つに決めて通す。', 'Defaults: a bare letter is a major triad; an added 7 is a minor seventh — so C7 is a dominant seventh (major triad + minor seventh); other extensions and added notes are major or perfect. Minor can be Cm, C−, Cmin; diminished C°, Cdim… These grew up with jazz and were never fully standardised — read them all, but pick one system for your own charts.'),
        ],
        visual: { kind: 'blocks', rows: [{ cells: [{ text: 'C', sub: t('根音', '根音', 'root') }, { text: 'm', sub: t('性质', '種類', 'quality') }, { text: '7(♭9)', sub: t('延伸', 'テンション', 'extensions') }, { text: '/E♭', sub: t('低音', 'バス', 'bass') }] }] },
      },
      {
        id: 'b22x-e2', type: 'page', ref: 'omt2e-chord-symbols',
        title: t('进阶 2、3 · 9、11、13：为什么用复音程的名字', '発展 2・3・9・11・13：なぜ複音程の名前か', 'Advanced 2–3 · 9, 11, 13: why compound names'),
        text: [
          t('七和弦再往上叠三度就是九音、十一音、十三音——其实就是二、四、六度的复音程。为什么不叫二、四、六？两个原因：写出最高的延伸音，就意味着下面的延伸音都包含在内（C11 = 三和弦 + 七、九、十一）；而且延伸音实际上常放在其他和弦音的上方，真的响在十三度那么高。不过"包含在内"不等于"全都要弹"：实际演奏常省掉中间的一些音。', '七の和音にさらに 3 度を積むと 9・11・13 度——実は 2・4・6 度の複音程。なぜ 2・4・6 と呼ばない？ 理由は 2 つ：いちばん上のテンションを書けば下のテンションもすべて含む（C11 = 三和音 + 7・9・11）。そしてテンションは実際ほかの和音構成音の上に置かれ、本当に 13 度の高さで鳴ることが多い。ただし「含む」は「全部弾く」ではない：実際は途中の音をよく省く。', 'Stack thirds above a seventh chord and you get the 9th, 11th and 13th — compound 2nds, 4ths and 6ths. Why the bigger names? Two reasons: writing the highest extension implies all those below (C11 = triad + 7, 9, 11), and extensions are usually voiced above the other chord tones, really sounding that high. But implied is not the same as played: in practice some of the in-between notes are usually left out.'),
          t('改变的延伸音用升降号表示"升高 / 降低这个延伸音"，不一定真的是升号或降号音：C7(♯11) 用 F♯；E♭7(♭9) 的 ♭9 是 F♭。写的时候先写 7，再把改变的延伸音放进括号，免得演奏者以为升降号是给根音的。', '変化したテンションは ♯・♭ で「そのテンションを上げる・下げる」を表し、実際の音が ♯・♭ とは限らない：C7(♯11) は F♯、E♭7(♭9) の ♭9 は F♭。書くときはまず 7、変化したテンションは括弧に入れ、記号が根音にかかると誤解されないようにする。', 'Altered extensions use ♯ and ♭ to mean “raise / lower this extension”, not necessarily a sharp or flat note: C7(♯11) uses F♯; the ♭9 of E♭7(♭9) is F♭. Write the 7 first and put altered extensions in parentheses so no one applies the accidental to the root.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['C4', 'E4', 'G4', 'Bb4', 'D5', 'F5', 'A5'], 0), ...col(['C4', 'E4', 'G4', 'Bb4', 'F#5'], 1, { lit: true })], cols: 2 },
      },
      {
        id: 'b22x-e3', type: 'discover', practice: true, ref: 'omt2e-chord-symbols',
        prompt: t('E♭7(♭9) 的 ♭9 是哪个音？', 'E♭7(♭9) の ♭9 は？', 'What is the ♭9 of E♭7(♭9)?'),
        options: ['F♭', 'E', 'F', 'G♭'],
        answer: 0,
        insight: { title: t('"降低九音"，不是"写个降号"', '「9 度を下げる」であって「♭を書く」ではない', '“Lower the ninth”, not “add a flat sign”'), text: t('E♭ 的大九度是 F；降半音、字母不变 → F♭（和 E 同音，但要写成 F♭）。', 'E♭ の長 9 度は F。半音下げて文字はそのまま → F♭（E と同じ音だが F♭ と書く）。', 'E♭’s major ninth is F; lower it keeping the letter → F♭ (sounds as E, spelled F♭).') },
      },
      {
        id: 'b22x-e4', type: 'page', ref: ['wiki-suspended-chord', 'omt2e-chord-symbols', 'wiki-added-tone'],
        title: t('进阶 4、5 · sus 与 add：换掉三音，还是多加一个音', '発展 4・5・sus と add：3 度を替えるか、1 音足すか', 'Advanced 4–5 · sus and add: replace the third, or add a note'),
        text: [
          t('sus 来自对位里的延留：前一个和弦的音"留"到下一个和弦里，形成不协和，再解决——最常见的是四度落到三度（七度、九度、二度的延留也常见）。所以 Csus 默认是纯四度代替三音：C–F–G；Csus2 用大二度：C–D–G。没有三音，听起来分不出大小调。流行音乐里 sus 常常不解决，也不要求那个音来自前一个和弦；七和弦加 sus 写成 C7sus，免得 Csus7 看起来像 Csus2。', 'sus は対位法の掛留から：前の和音の音が次の和音に「残り」不協和になって解決する——いちばん多いのは 4 度から 3 度（7・9・2 度の掛留もよくある）。だから Csus は既定で完全 4 度が 3 度の代わり：C–F–G。Csus2 は長 2 度：C–D–G。3 度がないので長短が分からない。ポップスでは解決しないことが多く、前の和音から来る必要もない。七の和音に sus は C7sus と書く（Csus7 は Csus2 に見えやすい）。', 'Sus comes from contrapuntal suspensions: a note of the previous chord is held into the next, clashes, then resolves — most often a fourth falling to the third (sevenths, ninths and seconds are common too). So Csus defaults to a perfect fourth replacing the third: C–F–G; Csus2 uses a major second: C–D–G. With no third it is neither major nor minor. Pop often leaves sus unresolved, without needing the note from the previous chord; with a seventh write C7sus, since Csus7 could be misread as Csus2.'),
          t('加音和弦 = 三和弦再加一个或几个"不是七音"的音。Cadd9 是 C–E–G 再加上方的 D，没有七音（C9 则还有 B♭）；Cadd2 把 D 放进三和弦里：C–D–E–G。加六太常见、又不会误解，所以写 C6 不写 add；六度和九度一起加也写成 C6/9。Csus2 和 Cmadd2 都有 D，差在有没有三音 E♭。加的音如果放在低音，通常直接写成斜杠和弦：C/D，而不是 Cadd2/D。', '付加音の和音 = 三和音 +「7 度ではない」音を 1 つ以上。Cadd9 は C–E–G の上に D、7 度なし（C9 なら B♭ も）。Cadd2 は D を三和音の中に：C–D–E–G。付加 6 はよくあり誤解もないので add なしで C6。6 度と 9 度を一緒に加えるのも C6/9。Csus2 と Cmadd2 はどちらも D を持ち、違いは 3 度 E♭ の有無。付加音がバスなら、ふつう Cadd2/D ではなく C/D と書く。', 'An added-tone chord is a triad plus one or more notes that are not the seventh. Cadd9 is C–E–G with D above and no seventh (C9 also has B♭); Cadd2 puts the D inside: C–D–E–G. The added sixth is common and unambiguous, so C6 needs no “add”; sixth plus ninth is C6/9. Csus2 and Cmadd2 both contain D — they differ by the third, E♭. An added note in the bass is usually written as a slash chord: C/D rather than Cadd2/D.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['C4', 'F4', 'G4'], 0, { label: 'Csus' }), ...col(['C4', 'D4', 'G4'], 1, { label: 'Csus2' }), ...col(['C4', 'E4', 'G4', 'D5'], 2, { label: 'Cadd9' }), ...col(['C4', 'D4', 'Eb4', 'G4'], 3, { label: 'Cmadd2' })], cols: 4 },
      },
      {
        id: 'b22x-e5', type: 'discover', practice: true, ref: ['wiki-suspended-chord', 'omt2e-chord-symbols'],
        prompt: t('Gsus 接 G：哪个音在动？', 'Gsus から G へ：動く音は？', 'Gsus to G: which note moves?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: { notes: [[43, 55, 60, 62], [43, 55, 59, 62]], mode: 'chords' } }],
        options: [t('C 落到 B（四度解决到三度）', 'C が B へ（4 度が 3 度へ解決）', 'C falls to B (fourth resolving to third)'), t('D 落到 C', 'D が C へ', 'D falls to C'), t('G 升到 A', 'G が A へ', 'G rises to A')],
        answer: 0,
        insight: { title: t('延留的老规矩', '掛留の昔からの型', 'The old suspension pattern'), text: t('Gsus = G C D；C 落到 B，变成 G B D。这就是对位里的 4–3 延留。', 'Gsus = G C D。C が B に下り G B D に。対位法の 4–3 掛留。', 'Gsus = G C D; C falls to B, giving G B D — the contrapuntal 4–3 suspension.') },
      },
      {
        id: 'b22x-e6', type: 'page', ref: 'wiki-power-chord',
        title: t('进阶 6 · 强力和弦：为什么失真吉他离不开它', '発展 6・パワーコード：なぜ歪んだギターに欠かせないか', 'Advanced 6 · Power chords: why distorted guitars love them'),
        text: [
          t('强力和弦（又叫五度和弦）只有根音和五音，可以再加八度，写成 E5、A5。它是摇滚，尤其是重金属和朋克的核心元素，通常配合故意加上的失真或过载效果。', 'パワーコード（5 度の和音）は根音と 5 度だけ、オクターヴを足してもよい。E5・A5 と書く。ロック、とくにヘヴィメタルとパンクの中核で、ふつう意図的なディストーションやオーバードライブと組み合わせる。', 'A power chord (fifth chord) has only root and fifth, possibly with octaves — E5, A5. It is central to rock, especially heavy metal and punk, usually played with deliberate distortion or overdrive.'),
          t('原因在声学：失真会在各音的泛音之间产生"和频"与"差频"（互调失真）。大三、小三和弦的音程比例复杂，产生一大堆频率，听起来混浊；而且吉他按十二平均律调音，小三度比纯律窄、大三度比纯律宽。根音和五音很接近简单的 3 : 2，互调出来的分音和原来的泛音靠得很近，声音更整齐；失真够强时还会在根音低八度处冒出一个新的基频，所以听起来更低沉、更"有力"。另外它也很好按。', '理由は音響にある：ディストーションは各音の倍音の「和」と「差」の周波数を生む（相互変調ひずみ）。長三・短三和音は比が複雑で周波数がたくさん生まれ濁る。しかもギターは平均律で、短 3 度は純正より狭く長 3 度は広い。根音と 5 度は単純な 3 : 2 に近く、生まれる部分音が元の倍音に近いのでまとまる。ひずみが強いと根音の 1 オクターヴ下に新しい基音まで現れ、低く「力強く」聞こえる。押さえやすいのも利点。', 'The reason is acoustic: distortion creates sum and difference frequencies between the notes’ harmonics (intermodulation). Major and minor triads have complex ratios, spawning many frequencies — messy; and guitars in equal temperament have minor thirds narrower and major thirds wider than just. Root and fifth sit close to a simple 3 : 2, so the new partials land near the original harmonics — a coherent sound; with enough distortion a new fundamental even appears an octave below the root, sounding bassier and more “powerful”. They are also easy to play.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'bass' }], notes: [...col(['E2', 'B2', 'E3'], 0, { label: 'E5' }), ...col(['A2', 'E3', 'A3'], 1, { label: 'A5' })], cols: 2 },
      },
      {
        id: 'b22x-e7', type: 'discover', practice: true, ref: 'wiki-power-chord',
        prompt: t('为什么大三和弦经过重失真容易变混浊，强力和弦却不会？', '強いディストーションで長三和音は濁りやすいのに、パワーコードはなぜ濁らない？', 'Why does a major triad turn muddy under heavy distortion while a power chord does not?'),
        options: [t('根音和五音接近 3 : 2，互调产生的频率和原来的泛音很接近', '根音と 5 度は 3 : 2 に近く、相互変調の周波数が元の倍音に近い', 'Root and fifth are close to 3 : 2, so intermodulation lands near the original harmonics'), t('强力和弦的音量比较小', 'パワーコードは音量が小さい', 'Power chords are quieter'), t('失真只对三度起作用', 'ひずみは 3 度にだけ効く', 'Distortion only affects thirds')],
        answer: 0,
        insight: { title: t('简单的比例，整齐的频率', '単純な比、まとまった周波数', 'Simple ratio, tidy frequencies'), text: t('三度的比例复杂（平均律还偏离纯律），互调后频率一团乱；纯五度接近 3 : 2，生成的分音很整齐。', '3 度は比が複雑（しかも平均律は純正からずれる）で相互変調後に乱れる。完全 5 度は 3 : 2 に近く、生まれる部分音が整う。', 'Thirds have complex ratios (and equal temperament detunes them), so intermodulation gets messy; a fifth near 3 : 2 yields tidy partials.') },
      },
      {
        id: 'b22x-e8', type: 'page', ref: 'omt2e-roman-numerals',
        title: t('进阶 7、8 · 罗马数字：写法和分析五步', '発展 7・8・ローマ数字：書き方と分析の 5 ステップ', 'Advanced 7–8 · Roman numerals: writing them and five analysis steps'),
        text: [
          t('先在调号下写调名：大调用大写字母（E♭），小调用小写字母（可以再加 m，如 dm）。IV 和 VI 容易搞混：IV = 5 − 1，VI = 5 + 1。手写大写罗马数字时上下各加一条横线，和小写区分开。七和弦在右上加 7，大小写跟着三和弦；减三和弦上的两种七和弦：半减七 viiø⁷、全减七 vii°⁷。', 'まず調号の下に調名：長調は大文字（E♭）、短調は小文字（m を足して dm でも）。IV と VI は混同しやすい：IV = 5 − 1、VI = 5 + 1。手書きの大文字ローマ数字は上下に横線を引いて小文字と区別する。七の和音は右上に 7、大小は三和音に従う。減三和音上の 2 つの七の和音：半減七 viiø⁷、完全減七 vii°⁷。', 'Write the key under the signature: uppercase for major (E♭), lowercase for minor (optionally with m, as in dm). IV and VI get confused: IV = 5 − 1, VI = 5 + 1. Handwritten uppercase numerals get bars across top and bottom to tell them from lowercase. Sevenths add a superscript 7, case following the triad; the two sevenths on a diminished triad are half-diminished viiø⁷ and fully diminished vii°⁷.'),
          t('分析每个和弦：① 转位的和弦先（在脑子里）叠回原位；② 认出所有音和性质；③ 按根音的级数写罗马数字，用大小写表示性质；④ 补上 °、ø、+；⑤ 写转位数字。同一个和弦连续出现时，可以重复写，也可以不写。OMT 用巴赫众赞歌《Jesu, meiner Seelen Wonne》（BWV 359）和《Caro mio ben》示范这套步骤——罗马数字分析不只用在众赞歌上。', '各和音の分析：① 転回形は（頭の中で）基本形に積み直す、② 音と種類を確認、③ 根音の音度でローマ数字を書き、大小で種類を示す、④ °・ø・+ を足す、⑤ 転回の数字を書く。同じ和音が続くときは繰り返して書いても書かなくてもよい。OMT はバッハのコラール《Jesu, meiner Seelen Wonne》（BWV 359）と《Caro mio ben》でこの手順を示す——ローマ数字分析はコラールだけのものではない。', 'For each chord: ① restack inversions in root position (mentally); ② identify all notes and the quality; ③ write the numeral for the root’s scale degree, case showing quality; ④ add °, ø, +; ⑤ add the inversion figures. A chord repeated may or may not get its numeral repeated. OMT demonstrates with Bach’s chorale “Jesu, meiner Seelen Wonne” (BWV 359) and “Caro mio ben” — Roman numerals are not just for chorales.'),
        ],
        visual: { kind: 'blocks', rows: [{ cells: ['①', '②', '③', '④', '⑤'] }, { cells: [t('叠回原位', '基本形へ', 'restack'), t('认音', '音を確認', 'notes'), t('级数', '音度', 'degree'), '° ø +', '6 6/4 7…'] }] },
      },
      {
        id: 'b22x-e9', type: 'discover', practice: true, ref: ['omt2e-roman-numerals', 'omt2e-figured-bass'],
        prompt: t('D 大调：最低音 G，上面有 B、C♯、E。罗马数字是？', 'ニ長調：バス G、上に B・C♯・E。ローマ数字は？', 'D major: G in the bass, with B, C♯, E above. The numeral is…'),
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes: [...col(['B3', 'C#4', 'E4'], 0, { s: 0 }), { p: 'G2', d: 'w', s: 1, col: 0 }], cols: 1 },
        options: ['viiø⁴₃', 'IV⁷', 'ii⁶₅', 'vii°⁷'],
        answer: 0,
        insight: { title: t('先叠回三度，再看低音', 'まず 3 度に積み直し、バスを見る', 'Restack in thirds, then read the bass'), text: t('G B C♯ E 叠成三度是 C♯–E–G–B：减三和弦 + 小七度 = 半减七，根音 C♯ 是 D 大调第七级 → viiø⁷；低音 G 是五音 → 第二转位 4/3 → viiø⁴₃。', 'G B C♯ E を 3 度に積むと C♯–E–G–B：減三和音 + 短 7 度 = 半減七、根音 C♯ はニ長調の第 7 音 → viiø⁷。バス G は第 5 音 → 第 2 転回 4/3 → viiø⁴₃。', 'G B C♯ E restacks as C♯–E–G–B: diminished triad + minor seventh = half-diminished; the root C♯ is degree 7 of D major → viiø⁷; the bass G is the fifth → second inversion, 4/3 → viiø⁴₃.') },
      },
      {
        id: 'b22x-e10', type: 'page', ref: ['omt2e-chord-symbols', 'omt2e-figured-bass'],
        title: t('支线 · 两套记法之间的翻译', '支線・2 つの記法のあいだの翻訳', 'Side quest · Translating between the two systems'),
        text: [
          t('和弦符号是"绝对"的标签：它直接告诉你弹哪些音，跟调无关。罗马数字是"相对"的：它说的是这个和弦在调里的位置。同一个 Am，在 C 大调是 vi，在 G 大调是 ii。翻译时：先认根音和性质（决定大小写），再看斜杠后的低音是哪个和弦音（决定转位：三音 → 6，五音 → 6/4），最后放进调里数级数——G/B 在 C 大调就是 V6，F/A 是 IV6，Em/G 是 iii6。', 'コード・シンボルは「絶対」のラベル：どの音を弾くかを直接示し、調とは無関係。ローマ数字は「相対」：調の中での位置を示す。同じ Am でもハ長調では vi、ト長調では ii。翻訳の手順：根音と種類（大小）→ スラッシュの後のバスが何の音か（転回：3 度 → 6、5 度 → 6/4）→ 調の中の音度。G/B はハ長調で V6、F/A は IV6、Em/G は iii6。', 'Chord symbols are absolute labels: they say exactly which notes to play, with no key involved. Roman numerals are relative: they locate the chord within a key. The same Am is vi in C major and ii in G major. To translate: root and quality (case), then which chord member the slash bass is (third → 6, fifth → 6/4), then count the degree in the key — in C, G/B is V6, F/A is IV6, Em/G is iii6.'),
          t('和弦符号不是分析，目的是让演奏者的手指在对的时间按到对的音。所以有时会选更好读、而不是更"有功能意义"的写法：一个其实起 A♭7(♯5) 作用、作为 A♭ 邻和弦的和弦，常常写成更好读的 C/A♭。两种写法都能弹出对的音，哪个更好要看语境。', 'コード・シンボルは分析ではなく、奏者の指を正しいタイミングで正しい音へ導くためのもの。だから「機能的に正しい」より「読みやすい」書き方を選ぶこともある：実際には A♭7(♯5) として A♭ の隣接和音の働きをする和音を、読みやすい C/A♭ と書くことが多い。どちらでも正しい音が出る。どちらがよいかは文脈次第。', 'Chord symbols are not analysis; their job is to get fingers to the right notes at the right time. So the easier-to-read spelling sometimes wins over the more functional one: a chord really acting as A♭7(♯5), neighbouring A♭, is often written C/A♭. Both give the right notes; which is better depends on context.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: 'C', cells: ['G/B → V6', 'F/A → IV6', 'Em/G → iii6'] }, { label: 'G', cells: ['Am → ii', 'D7 → V7', 'C/E → IV6'] }] },
      },
      {
        id: 'b22x-e11', type: 'discover', practice: true, ref: ['omt2e-chord-symbols', 'omt2e-roman-numerals'],
        prompt: t('F 大调的 ii⁶₅ 写成和弦符号是？', 'ヘ長調の ii⁶₅ をコード・シンボルにすると？', 'F major’s ii⁶₅ as a chord symbol is…'),
        options: ['Gm7/B♭', 'Gm7', 'B♭maj7', 'Gm/D'],
        answer: 0,
        insight: { title: t('根音、性质、低音', '根音・種類・バス', 'Root, quality, bass'), text: t('F 大调 ii⁷ = G B♭ D F（Gm7）；6/5 是三音在低音 → B♭：Gm7/B♭。', 'ヘ長調 ii⁷ = G B♭ D F（Gm7）。6/5 は 3 度がバス → B♭：Gm7/B♭。', 'In F, ii⁷ = G B♭ D F (Gm7); 6/5 puts the third in the bass → B♭: Gm7/B♭.') },
      },
    ],
    experiment: [
      { id: 'b22x-x1', type: 'experiment', toy: 'keyChords', ref: ['omt2e-roman-numerals', 'omt2e-chord-symbols'],
        prompt: t('盯住 Am，在 C、G、F 大调和 E 小调之间切换，看它在每个调里是几级；再切到七和弦，盯住 G7——它在哪些调里是 V⁷？', 'Am に注目してハ・ト・ヘ長調とホ短調を切り替え、各調で何度か見よう。七の和音にして G7 に注目——どの調で V⁷？', 'Watch Am while switching between C, G, F major and E minor to see its degree in each; then switch to sevenths and watch G7 — in which keys is it V⁷?'),
        params: { keys: [['C', 'major'], ['G', 'major'], ['F', 'major'], ['E', 'minor'], ['C', 'minor'], ['D', 'major']], watch: ['Am', 'G7', 'Dm7', 'Bø7'] },
        breakthrough: { id: 'b22x-relative', text: t('同一个符号，换个调就是另一个罗马数字：符号是绝对的，罗马数字是相对的。', '同じシンボルでも調が変わればローマ数字が変わる：シンボルは絶対、ローマ数字は相対。', 'One symbol, a different numeral in each key: symbols are absolute, numerals relative.') } },
    ],
    challenge: [
      {
        id: 'b22x-c1', type: 'choice', error: 'wrong-chord', skills: ['spell'], ref: 'omt2e-chord-symbols',
        variants: [
          { prompt: t('C11 按规则包含哪些音（不考虑省略）？', 'C11 に規則上含まれる音は（省略は考えない）？', 'By rule, which notes does C11 imply (ignoring omissions)?'), options: ['C E G B♭ D F', 'C E G F', 'C E G B D F', 'C F G'] },
          { prompt: t('C7(♯11) 的 ♯11 是哪个音？', 'C7(♯11) の ♯11 は？', 'The ♯11 of C7(♯11) is…'), options: ['F♯', 'F', 'G♭', 'E♯'] },
          { prompt: t('Cadd9 有哪些音？', 'Cadd9 の構成音は？', 'Cadd9 contains…'), options: ['C E G D', 'C E G B♭ D', 'C D G', 'C E G B D'] },
        ],
        answer: 0,
        explain: t('最高延伸音意味着下面的都包含（11 → 7、9、11，七度默认小七）；♯11 是升高十一音；add9 不含七音。', 'いちばん上のテンションは下を全部含む（11 → 7・9・11、7 度は既定で短 7 度）。♯11 は 11 度を上げる。add9 は 7 度を含まない。', 'The top extension implies those below (11 → 7, 9, 11, the seventh minor by default); ♯11 raises the eleventh; add9 has no seventh.'),
      },
      {
        id: 'b22x-c2', type: 'choice', error: 'wrong-chord', skills: ['identify'], ref: ['omt2e-chord-symbols', 'wiki-suspended-chord', 'wiki-added-tone'],
        variants: [
          { prompt: t('Csus（没写数字）默认有哪些音？', 'Csus（数字なし）の既定の構成音は？', 'Csus (no number) defaults to…'), options: ['C F G', 'C D G', 'C E F G', 'C E G'] },
          { prompt: t('七和弦加 sus，标准写法是？', '七の和音に sus、標準の書き方は？', 'A seventh chord with a suspension is written…'), options: ['C7sus', 'Csus7', 'Csus(7)', 'C7add4'] },
          { prompt: t('Csus2 和 Cmadd2 的差别在哪？', 'Csus2 と Cmadd2 の違いは？', 'Csus2 vs Cmadd2 — the difference is…'), options: [t('有没有三音 E♭', '3 度 E♭ の有無', 'Whether the third E♭ is present'), t('有没有 D', 'D の有無', 'Whether D is present'), t('有没有五音', '5 度の有無', 'Whether the fifth is present')] },
        ],
        answer: 0,
        explain: t('sus 默认纯四度代替三音；C7sus 免得 Csus7 像 Csus2；sus 没有三音，madd2 有三音。', 'sus は既定で完全 4 度が 3 度の代わり。C7sus は Csus7 が Csus2 に見えないため。sus に 3 度はなく、madd2 にはある。', 'Sus defaults to a perfect fourth replacing the third; C7sus avoids confusion with Csus2; sus lacks the third, madd2 keeps it.'),
      },
      {
        id: 'b22x-c3', type: 'choice', error: 'wrong-chord', skills: ['identify'], ref: ['wiki-sixth-chord', 'omt2e-chord-symbols', 'omt2e-figured-bass'],
        variants: [
          { prompt: t('流行和弦符号 Am6 有哪些音？', 'コード・シンボル Am6 の構成音は？', 'The pop symbol Am6 contains…'), options: ['A C E F♯', 'A C E F', 'C E A', 'A C E G'] },
          { prompt: t('C 大调的古典罗马数字 ii6 是什么？', 'ハ長調の ii6 は？', 'In C major, the Roman numeral ii6 is…'), options: [t('Dm 第一转位，低音 F', 'Dm の第 1 転回、バス F', 'Dm in first inversion, F in the bass'), t('Dm 加大六度 B', 'Dm に長 6 度 B を加える', 'Dm with an added B'), t('D6 和弦', 'D6 の和音', 'a D6 chord')] },
          { prompt: t('C6 和哪个七和弦的第一转位同音？', 'C6 と同じ音になる七の和音の第 1 転回は？', 'C6 shares its notes with the first inversion of…'), options: ['Am7', 'Cmaj7', 'Em7', 'Fmaj7'] },
        ],
        answer: 0,
        explain: t('流行符号的 6 = 加大六度；古典数字的 6 = 第一转位；C6（C E G A）= Am7 的第一转位，根音看语境。', 'ポップスの 6 = 長 6 度の付加、古典の 6 = 第 1 転回。C6（C E G A）= Am7 の第 1 転回、根音は文脈次第。', 'Pop 6 = added major sixth; classical 6 = first inversion; C6 (C E G A) = Am7 in first inversion, root by context.'),
      },
      {
        id: 'b22x-c4', type: 'choice', error: 'wrong-function', skills: ['function'], ref: ['omt2e-roman-numerals', 'omt2e-chord-symbols'],
        variants: [
          { prompt: t('E♭ 大调：B♭7/D 的罗马数字是？', '変ホ長調：B♭7/D のローマ数字は？', 'E♭ major: B♭7/D as a Roman numeral is…'), options: ['V⁶₅', 'V⁴₃', 'V⁷', 'iii⁶'] },
          { prompt: t('A 小调（升高导音）：G♯°7 的罗马数字是？', 'イ短調（導音を上げる）：G♯°7 は？', 'A minor (raised leading tone): G♯°7 is…'), options: ['vii°⁷', 'viiø⁷', 'VII⁷', 'v⁷'] },
          { prompt: t('同一个 Dm，在 C 大调和 F 大调里分别是？', '同じ Dm はハ長調とヘ長調でそれぞれ？', 'The same Dm in C major and in F major is…'), options: ['ii / vi', 'vi / ii', 'ii / iii', 'iv / vi'] },
        ],
        answer: 0,
        explain: t('先认根音和性质，再看低音是哪个和弦音（三音 → 6/5），最后放进调里数级数；符号是绝对的，罗马数字随调而变。', '根音と種類 → バスが何の音か（3 度 → 6/5）→ 調の中の音度。シンボルは絶対、ローマ数字は調で変わる。', 'Root and quality, then which member is in the bass (third → 6/5), then the degree in the key; symbols are absolute, numerals change with the key.'),
      },
      {
        id: 'b22x-c5', type: 'choice', error: 'concept', skills: ['identify'], ref: ['wiki-power-chord', 'omt2e-roman-numerals'],
        variants: [
          { prompt: t('A5 有哪些音？', 'A5 の構成音は？', 'A5 contains…'), options: ['A E', 'A C♯ E', 'A D', 'A C E'] },
          { prompt: t('手写大写罗马数字为什么上下加横线？', '手書きの大文字ローマ数字に上下の横線を引くのはなぜ？', 'Why do handwritten uppercase numerals get top and bottom bars?'), options: [t('和小写区分开', '小文字と区別するため', 'To tell them from lowercase'), t('表示七和弦', '七の和音を示すため', 'To show a seventh chord'), t('表示转位', '転回を示すため', 'To show inversion')] },
          { prompt: t('IV 和 VI 怎么记不混？', 'IV と VI を混同しない覚え方は？', 'How do you keep IV and VI apart?'), options: [t('IV = 5 − 1，VI = 5 + 1', 'IV = 5 − 1、VI = 5 + 1', 'IV = 5 − 1, VI = 5 + 1'), t('IV 总是小写', 'IV はいつも小文字', 'IV is always lowercase'), t('VI 总是减三和弦', 'VI はいつも減三和音', 'VI is always diminished')] },
        ],
        answer: 0,
        explain: t('强力和弦 = 根音 + 五音；手写大写罗马数字加横线以区分大小写；IV = V − I，VI = V + I。', 'パワーコード = 根音 + 5 度。手書きの大文字は横線で大小を区別。IV = V − I、VI = V + I。', 'Power chord = root + fifth; handwritten capitals get bars to distinguish case; IV = V − I, VI = V + I.'),
      },
      G('b22x-g1', 'chordSymbolNotes', 2, ['spell']),
      G('b22x-g2', 'romanChord', 2, ['function']),
    ],
  },
  pool: [G('b22x-p1', 'chordSymbolNotes', 3, ['spell']), G('b22x-p2', 'romanChord', 3, ['function']), G('b22x-p3', 'inversionBass', 2, ['identify'])],
};

// ===================== B2-3x 数字低音与八度法则 · 扩展关 =====================
// 对应 A 面：figured（三和弦的数字 / 七和弦的数字 / 数字前的临时记号 / 综合）、支线 ruleoctave（上行 / 七和弦让方向更清楚 / 用模进配音阶 / 给低音线配和弦）的进阶关
const SQ = {
  C: [48, 60, 64, 67], C7: [48, 58, 64, 67], F: [41, 60, 65, 69], 'B°': [47, 59, 62, 65], B7: [47, 59, 63, 69],
  Em: [40, 59, 64, 67], Am: [45, 60, 64, 69], A7: [45, 61, 64, 67], Dm: [38, 62, 65, 69], G: [43, 59, 62, 67], G7: [43, 59, 62, 65], Cend: [36, 60, 64, 67],
};
const sq = (...names) => names.map((n) => ({ label: n === 'Cend' ? 'C' : n, notes: SQ[n] }));
const EXT_B2_3 = {
  minutes: 22,
  insight: t('数字低音写的永远是"低音上方的音程"；八度法则则是一张"每个低音配一个和弦"的小抄——先立主和属这两根柱子，再在它们前面放七和弦把音乐推过去。', '数字はいつも「バスの上の音程」。オクターヴの規則は「各バス音に 1 つの和音」の早見表——まず主と属という 2 本の柱を立て、その前に七の和音を置いて音楽を押し出す。', 'Figures always mean intervals above the bass; the Rule of the Octave is a cheat sheet of one chord per bass note — raise the pillars of tonic and dominant first, then place seventh chords before them to push the music on.'),
  sections: {
    discover: [
      {
        id: 'b23x-d1', type: 'discover', ref: 'omt2e-figured-bass',
        prompt: t('A 小调，低音 E 上只写了一个 ♯，没有数字。先听不加升号的 E–G–B，再听加了之后的和弦。那个 ♯ 改变的是哪个音？', 'イ短調、バス E の下に ♯ だけ、数字なし。まず ♯ なしの E–G–B、次に付けた和音を聴こう。♯ が変えたのはどの音？', 'A minor: under the bass E there is only a ♯, no number. Hear E–G–B without it, then the chord with it. Which note does the ♯ change?'),
        play: [{ label: 'E–G–B', audio: { notes: [[40, 59, 64, 67]], mode: 'chords' } }, { label: t('加上 ♯', '♯ 付き', 'With the ♯'), audio: { notes: [[40, 59, 64, 68]], mode: 'chords' } }],
        options: [t('低音上方的三度：G → G♯', 'バスの上の 3 度：G → G♯', 'The third above the bass: G → G♯'), t('低音本身：E → E♯', 'バス自身：E → E♯', 'The bass itself: E → E♯'), t('低音上方的五度：B → B♯', 'バスの上の 5 度：B → B♯', 'The fifth above: B → B♯')],
        answer: 0,
        insight: {
          title: t('孤立的临时记号指三度', '孤立した臨時記号は 3 度', 'An orphaned accidental means the third'),
          text: t('不跟任何数字、单独出现的临时记号（"孤立"或"悬着"的临时记号）默认作用在低音上方的三度：G 变 G♯，E–G♯–B 成了带导音的 V。另外两条默认：只写 7 就是原位七和弦，什么都不写就是原位三和弦。', '数字なしで単独に出る臨時記号（「孤立した」「ぶら下がった」臨時記号）は、既定でバスの上の 3 度にかかる：G が G♯ になり、E–G♯–B は導音を含む V。ほかの既定：7 だけなら基本形の七の和音、何もなければ基本形の三和音。', 'An accidental standing alone — orphaned or hanging — applies by default to the third above the bass: G becomes G♯, and E–G♯–B is V with its leading tone. Two more defaults: a lone 7 means a root-position seventh chord; no figures at all mean a root-position triad.'),
        },
      },
    ],
    explain: [
      {
        id: 'b23x-e1', type: 'page', ref: 'omt2e-figured-bass',
        title: t('进阶 1、2 · 七和弦的完整数字与缩写', '発展 1・2・七の和音の全形と略記', 'Advanced 1–2 · Full and abbreviated figures for seventh chords'),
        text: [
          t('七和弦有四个音，所以有原位和三个转位：根音在低音是原位，三音是第一转位，五音是第二转位，七音是第三转位。完整数字从低音往上数所有音程（大数字在上）：7/5/3、6/5/3、6/4/3、6/4/2；日常用的缩写只留最能区分的数字：7、6/5、4/3、4/2。', '七の和音は 4 音なので基本形と 3 つの転回：根音がバスなら基本形、第 3 音で第 1 転回、第 5 音で第 2 転回、第 7 音で第 3 転回。全形はバスからのすべての音程（大きい数が上）：7/5/3・6/5/3・6/4/3・6/4/2。ふだんの略記は区別に必要な数字だけ：7・6/5・4/3・4/2。', 'A seventh chord has four notes, so root position plus three inversions: root, third, fifth or seventh in the bass. Full figures list every interval above the bass, larger on top: 7/5/3, 6/5/3, 6/4/3, 6/4/2; the everyday abbreviations keep only the distinguishing numbers: 7, 6/5, 4/3, 4/2.'),
          t('读数字时，OMT 建议在脑子里把和弦叠回原位，不必真的写出来，省时间：例如 C 大调低音 B 上写 6/5——B 上方有三度 D、五度 F、六度 G，叠回去是 G B D F，三音在低音，就是 V⁶₅。', '数字を読むとき、OMT は頭の中で基本形に積み直すことを勧める（書き出さなくてよい、時間の節約）。例：ハ長調でバス B に 6/5——B の上に 3 度 D、5 度 F、6 度 G、積み直すと G B D F、第 3 音がバスなので V⁶₅。', 'When reading figures, OMT suggests restacking in root position in your head rather than writing it out — it saves time. E.g. C major, 6/5 over B: a third D, fifth F, sixth G above B; restacked G B D F with the third in the bass: V⁶₅.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'bass' }], notes: [...col(['G2', 'B2', 'D3', 'F3'], 0, { label: '7' }), ...col(['B2', 'D3', 'F3', 'G3'], 1, { label: '6/5' }), ...col(['D3', 'F3', 'G3', 'B3'], 2, { label: '4/3' }), ...col(['F2', 'G2', 'B2', 'D3'], 3, { label: '4/2' })], cols: 4 },
      },
      {
        id: 'b23x-e2', type: 'discover', practice: true, ref: 'omt2e-figured-bass',
        prompt: t('F 大调，低音 E 上写 6/5。是哪个和弦？', 'ヘ長調、バス E に 6/5。どの和音？', 'F major: 6/5 over a bass E. Which chord?'),
        options: [t('C7 第一转位（V⁶₅）', 'C7 の第 1 転回（V⁶₅）', 'C7 in first inversion (V⁶₅)'), t('Em7 原位', 'Em7 の基本形', 'Em7 in root position'), t('A 小三和弦第一转位', 'A の短三和音の第 1 転回', 'A minor in first inversion')],
        answer: 0,
        insight: { title: t('E 是三音', 'E は第 3 音', 'E is the third'), text: t('E 上方三度 G、五度 B♭、六度 C：叠回去是 C E G B♭（C7），E 是三音 → V⁶₅。', 'E の上に 3 度 G・5 度 B♭・6 度 C：積み直すと C E G B♭（C7）、E は第 3 音 → V⁶₅。', 'Above E: a third G, fifth B♭, sixth C — restacked C E G B♭ (C7) with E as third → V⁶₅.') },
      },
      {
        id: 'b23x-e3', type: 'page', ref: 'omt2e-figured-bass',
        title: t('进阶 3 · 数字上的临时记号', '発展 3・数字に付く臨時記号', 'Advanced 3 · Accidentals in figured bass'),
        text: [
          t('要改变上方的某个音，就把 ♭、♯、♮ 写在那个数字的前面：♯6 是把六度升高半音，♭7 是把七度降低半音。在数字上画一道斜线，或在数字前加 "+"，也表示把这个音升高半音。', '上の音を変えるには ♭・♯・♮ をその数字の前に書く：♯6 は 6 度を半音上げ、♭7 は 7 度を半音下げる。数字に斜線を引くか、前に「+」を付けても半音上げを示す。', 'To alter an upper note, put ♭, ♯ or ♮ before its figure: ♯6 raises the sixth a half step, ♭7 lowers the seventh. A slash through a figure, or a “+” before it, also means raise it a half step.'),
          t('最常见的是小调：小调调号按自然小调，导音不在调号里，所以 V 上常写一个孤立的 ♯（或 ♮）来升高三音；导音出现在上方声部时都要靠数字上的临时记号补出来——例如 vii°⁶（低音是第二级）上写 ♯6。导音本身在低音时（如 V⁶），直接把升号写在低音音符上就行。', 'いちばん多いのは短調：調号は自然短音階なので導音は調号にない。そこで V にはよく孤立した ♯（または ♮）を書いて第 3 音を上げる。導音が上声に出るときは数字の臨時記号で補う——たとえば vii°⁶（バスは第 2 音）には ♯6。導音そのものがバスにあるとき（V⁶ など）は、バスの音符に直接 ♯ を書けばよい。', 'Minor keys need this most: the signature follows natural minor, so the leading tone is missing; V usually carries an orphaned ♯ (or ♮) to raise its third, and whenever the leading tone sits in an upper voice a figured accidental supplies it — e.g. ♯6 over vii°⁶ (bass on degree 2). When the leading tone is itself in the bass (as in V⁶), the sharp simply goes on the bass note.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'bass' }], notes: [{ p: 'D3', d: 'w', col: 0, label: '♯' }, { p: 'F#3', d: 'w', col: 1, label: '6' }, { p: 'D3', d: 'w', col: 2, label: '♯6' }], cols: 3 },
      },
      {
        id: 'b23x-e4', type: 'discover', practice: true, ref: 'omt2e-figured-bass',
        prompt: t('G 小调，低音 D 上只写一个 ♯。实现出来是哪个和弦？', 'ト短調、バス D に ♯ だけ。実現するとどの和音？', 'G minor: a lone ♯ under the bass D. Realised, the chord is…'),
        options: ['D F♯ A（V）', 'D F A（v）', 'D♯ F♯ A', 'D F A♯'],
        answer: 0,
        insight: { title: t('三度升高 = 导音', '3 度を上げる = 導音', 'Raising the third = the leading tone'), text: t('孤立的 ♯ 作用在低音上方三度：F → F♯，F♯ 正是 G 小调的导音，得到大三和弦 V。', '孤立した ♯ はバスの上の 3 度に：F → F♯。F♯ はト短調の導音で、長三和音 V になる。', 'The orphaned ♯ raises the third above the bass: F → F♯, G minor’s leading tone — giving major V.') },
      },
      {
        id: 'b23x-e5', type: 'page', ref: 'omt2e-galant-rule-octave',
        title: t('支线 · 八度法则：一张给低音配和弦的小抄', '支線・オクターヴの規則：バスに和音を付ける早見表', 'Side quest · The Rule of the Octave: a cheat sheet for bass lines'),
        text: [
          t('八度法则是部分谱（partimento）传统里的重要工具：给低音音阶的每个音级配一个和弦，照着配就能走很远。它有很多细节不同的版本；OMT 用的版本很接近 Fedele Fenaroli（那不勒斯，1775 年），只为了始终保持四个声部、避免任何平行做了少许修改。', 'オクターヴの規則はパルティメント伝統の重要な道具：バスの音階の各音度に 1 つの和音を対応させ、それに従うだけでかなり遠くまで行ける。細部の違う版がたくさんある。OMT の版はフェデーレ・フェナローリ（ナポリ、1775 年）にとても近く、4 声を保ち平行を避けるために少しだけ変えてある。', 'The Rule of the Octave is a key tool of the partimento tradition: one chord for each degree of the bass scale, and matching them up takes you a long way. There are many subtly different versions; OMT’s follows Fedele Fenaroli (Naples, 1775) closely, slightly modified to keep four voices throughout and avoid any hint of parallels.'),
          t('四步搭出来：① 全部用平行的六和弦——没有语法错误，但没有层次、也不有趣；② 第一个和最后一个和弦改成 5/3，收束在主和弦上；③ 上行和下行的属和弦也改成 5/3（它们也很重要）；④ 在每个主和弦和属和弦（包括它们的转位）前面放七和弦，其中一处还加上半音变化，更强地离调到属。', '4 ステップ：① すべて平行の六の和音——文法の誤りはないが、階層がなく面白くない。② 最初と最後の和音を 5/3 にして主和音で閉じる。③ 上行と下行の属和音も 5/3 に（これも重要）。④ 主和音と属和音（転回形も）の前に七の和音を置く。そのうち 1 か所は半音の変化を加え、属への一時的転調を強める。', 'Build it in four steps: ① all parallel sixth chords — not wrong, but flat and dull; ② make the first and last chords 5/3 for closure on the tonic; ③ make the dominant chords 5/3 in both directions too; ④ precede every tonic and dominant chord (inversions included) with a seventh chord — once with a chromatic alteration to tonicise the dominant more strongly.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'bass' }], notes: ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'].map((p, i) => ({ p, d: 'q', col: i, label: ['5/3', '6', '6', '6', '5/3', '6', '6', '5/3'][i] })), cols: 8, caption: t('第三步：主与属用 5/3，其余用 6', 'ステップ 3：主と属は 5/3、ほかは 6', 'Step three: 5/3 on tonic and dominant, 6 elsewhere') },
      },
      {
        id: 'b23x-e6', type: 'discover', practice: true, ref: 'omt2e-galant-rule-octave',
        prompt: t('第四步把七和弦放在哪里？为什么？', 'ステップ 4 で七の和音をどこに置く？ なぜ？', 'In step four, where do the seventh chords go, and why?'),
        options: [t('主和弦与属和弦（含转位）前面：用不协和把音乐推向这两根柱子', '主和音と属和音（転回形も）の前：不協和で音楽をこの 2 本の柱へ押す', 'Before tonic and dominant chords (inversions included): dissonance pushes toward those pillars'), t('每个和弦上都加', 'すべての和音に', 'On every chord'), t('只放在最后一个和弦上', '最後の和音だけ', 'Only on the last chord')],
        answer: 0,
        insight: { title: t('不协和指向稳定', '不協和は安定を指す', 'Dissonance points to stability'), text: t('七和弦的不协和让耳朵想走到下一个稳定的和弦；放在主和属前面，层次就出来了。', '七の和音の不協和は次の安定した和音へ向かわせる。主と属の前に置くと階層がはっきりする。', 'A seventh chord’s dissonance makes the ear want the next stable chord; placed before tonic and dominant, it builds the hierarchy.') },
      },
      {
        id: 'b23x-e7', type: 'page', ref: 'omt2e-galant-rule-octave',
        title: t('支线 · 用模进给音阶配和声', '支線・反復進行で音階に和声を付ける', 'Side quest · Harmonising the scale with sequences'),
        text: [
          t('八度法则可以看作平行六和弦的"模进式"配法。还有其他模进配法，都是一两个和声一组、沿音阶方向重复：5–6（上行时在每个低音上交替五度和六度）；7–6 延留链（上方声部下行，所以上行音阶要加一个八度跳回去重新开始，变成 7–6–8；下行就不用改）；2–3 延留（7–6 的转位，上行时变成 2–3–1，低音看是 9–8–10）。', 'オクターヴの規則は平行六の和音の「反復進行」的な付け方とも見られる。ほかにも反復進行の付け方がある。どれも 1〜2 個の和声を 1 組にして音階の方向に繰り返す：5–6（上行で各バス音の上に 5 度と 6 度を交互に）、7–6 の掛留の鎖（上声が下行するので、上行音階ではオクターヴ上へ跳んでやり直す 7–6–8、下行はそのまま）、2–3 の掛留（7–6 の転回、上行では 2–3–1、バスから見ると 9–8–10）。', 'The Rule can be seen as a sequential harmonisation with parallel sixths, and there are other sequential ones, each repeating a one- or two-chord pattern along the scale: 5–6 (ascending, alternating fifth and sixth above each bass note); 7–6 suspension chains (the upper part descends, so an ascending scale needs an octave leap to restart, 7–6–8; descending needs no change); 2–3 suspensions (the inversion of 7–6, ascending 2–3–1, or 9–8–10 from the bass).'),
          t('五度循环：根音"下行五度"，实际上常写成"下五上四"留在同一个音区——这样每两个和弦低音就低一级，隔一个低音就藏着一条级进下行的音阶。', '五度圏進行：根音が「5 度下行」、実際には同じ音域に留まるため「5 度下・4 度上」と書くことが多い——2 つの和音ごとにバスが 1 段下がり、1 つおきのバスに下行音階が隠れている。', 'The cycle of fifths: roots fall by fifths, usually written “down a fifth, up a fourth” to stay in register — so every two chords the bass lands a step lower, and alternate bass notes hide a descending scale.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'bass' }], notes: ['C3', 'F3', 'B2', 'E3', 'A2', 'D3', 'G2', 'C3'].map((p, i) => ({ p, d: 'q', col: i, lit: i % 2 === 0 })), cols: 8 },
      },
      {
        id: 'b23x-e8', type: 'page', ref: 'omt2e-chromatic-sequences',
        title: t('支线 · 自然音模进与半音模进', '支線・全音階的反復進行と半音階的反復進行', 'Side quest · Diatonic and chromatic sequences'),
        text: [
          t('自然音的下行五度模进 I–IV–vii°–iii–vi–ii–V–I：模型（根音下行五度）每次下移一级。为了留在同一个调里，IV 到 vii° 的根音是增四度（F–B），不是纯五度；如果每一步都是纯五度，根音会走成 G–C–F–B♭–E♭–A♭……很快离开原调，变成半音模进。自然音模进保留移位的音程度数，但不保留性质。', '全音階的な下行 5 度の反復進行 I–IV–vii°–iii–vi–ii–V–I：モデル（根音の 5 度下行）を毎回 1 段下げる。同じ調に留まるため IV から vii° の根音は増 4 度（F–B）で完全 5 度ではない。毎回完全 5 度なら根音は G–C–F–B♭–E♭–A♭……とすぐ調を離れ、半音階的反復進行になる。全音階的反復進行は移動の度数を保つが、種類は保たない。', 'The diatonic descending-fifths sequence I–IV–vii°–iii–vi–ii–V–I moves its model (a root falling a fifth) down a step each time. To stay in one key, IV to vii° is an augmented fourth (F–B), not a perfect fifth; with perfect fifths throughout the roots would run G–C–F–B♭–E♭–A♭… and leave the key — a chromatic sequence. Diatonic sequences keep the interval size, not its quality.'),
          t('把每隔一个和弦换成副属七和弦（C7–F、B7–Em、A7–Dm、G7–C），听起来半音很多，但它仍不算真正的半音模进：强拍上的根音（C–B–A–G）还是沿着同一个调的音级走。真正的半音模进连音程性质也保持，和弦性质也一组一组相同。', '1 つおきの和音を副属七に替える（C7–F・B7–Em・A7–Dm・G7–C）と半音が多く聞こえるが、本当の半音階的反復進行ではない：強拍の根音（C–B–A–G）はやはり同じ調の音度をたどる。本当の半音階的反復進行は音程の種類まで保ち、和音の種類も組ごとに同じ。', 'Turn every other chord into an applied dominant seventh (C7–F, B7–Em, A7–Dm, G7–C) and it sounds very chromatic, yet it is still not a true chromatic sequence: the downbeat roots (C–B–A–G) still walk the degrees of one key. A true chromatic sequence keeps interval quality too, with matching chord qualities in every copy.'),
        ],
      },
      {
        id: 'b23x-e9', type: 'discover', practice: true, ref: 'omt2e-chromatic-sequences',
        prompt: t('C 大调的下行五度模进里，哪一对根音不是纯五度 / 纯四度？', 'ハ長調の下行 5 度の反復進行で、完全 5 度・4 度でない根音の組は？', 'In C major’s descending-fifths sequence, which root pair is not a perfect fifth or fourth?'),
        options: [t('F → B（IV → vii°，增四度）', 'F → B（IV → vii°、増 4 度）', 'F → B (IV → vii°, augmented fourth)'), t('C → F（I → IV）', 'C → F（I → IV）', 'C → F (I → IV)'), t('A → D（vi → ii）', 'A → D（vi → ii）', 'A → D (vi → ii)')],
        answer: 0,
        insight: { title: t('为了留在调里"作弊"一次', '調に留まるための「ずる」', 'One “cheat” to stay in key'), text: t('F 下行纯五度是 B♭，会离开 C 大调；用 B（增四度）就留在调里。', 'F の完全 5 度下は B♭ でハ長調を離れる。B（増 4 度）なら調に留まる。', 'A perfect fifth below F is B♭, outside C major; B (an augmented fourth) keeps it in key.') },
      },
    ],
    experiment: [
      { id: 'b23x-x1', type: 'experiment', toy: 'progression', ref: ['omt2e-chromatic-sequences', 'omt2e-galant-rule-octave'],
        prompt: t('下行五度模进 C – F – B° – Em – Am – Dm – G – C。在第 1、3、5、7 格换成副属七和弦（C7、B7、A7、G7），听半音一下子多起来；可是强拍上的根音 C–B–A–G 变了吗？', '下行 5 度の反復進行 C – F – B° – Em – Am – Dm – G – C。1・3・5・7 番目を副属七（C7・B7・A7・G7）に替えると半音が一気に増える。でも強拍の根音 C–B–A–G は変わった？', 'Descending fifths C – F – B° – Em – Am – Dm – G – C. Swap slots 1, 3, 5, 7 for applied sevenths (C7, B7, A7, G7) and the chromaticism jumps — but did the downbeat roots C–B–A–G change?'),
        params: { gap: 760, slots: [
          { options: sq('C', 'C7') }, { options: sq('F') }, { options: sq('B°', 'B7') }, { options: sq('Em') },
          { options: sq('Am', 'A7') }, { options: sq('Dm') }, { options: sq('G', 'G7') }, { options: sq('Cend') },
        ], presets: [
          { label: t('自然音模进', '全音階的', 'Diatonic'), picks: [0, 0, 0, 0, 0, 0, 0, 0], explain: t('全用调内和弦：IV → vii° 是增四度，其余是纯五度 / 纯四度。', 'すべて調内の和音：IV → vii° は増 4 度、ほかは完全 5 度・4 度。', 'All diatonic: IV → vii° is an augmented fourth, the rest perfect fifths or fourths.') },
          { label: t('交替副属七', '副属七を交互に', 'Alternating applied sevenths'), picks: [1, 0, 1, 0, 1, 0, 1, 0], explain: t('C7–F、B7–Em、A7–Dm、G7–C：半音多了，强拍根音 C–B–A–G 仍按调内音级走——还是自然音模进。', 'C7–F・B7–Em・A7–Dm・G7–C：半音は増えたが、強拍の根音 C–B–A–G は調内の音度のまま——全音階的反復進行のまま。', 'C7–F, B7–Em, A7–Dm, G7–C: more chromatic, but downbeat roots C–B–A–G still follow the key — still a diatonic sequence.') },
        ] },
        breakthrough: { id: 'b23x-seq', text: t('你听出来了：半音多不等于半音模进，要看根音是否还沿着同一个调的音级走。', '半音が多くても半音階的反復進行とは限らない。根音が同じ調の音度をたどるかを見る——聴き取れた。', 'You heard it: lots of chromatic notes do not make a chromatic sequence — check whether the roots still walk one key’s degrees.') } },
    ],
    challenge: [
      {
        id: 'b23x-c1', type: 'choice', error: 'wrong-inversion', skills: ['identify'], ref: 'omt2e-figured-bass',
        variants: [
          { prompt: t('G 大调，低音 C 上写 4/2。是哪个和弦？', 'ト長調、バス C に 4/2。どの和音？', 'G major: 4/2 over a bass C. Which chord?'), options: [t('D7 第三转位（V⁴₂）', 'D7 の第 3 転回（V⁴₂）', 'D7 in third inversion (V⁴₂)'), t('C 大七和弦原位', 'Cmaj7 の基本形', 'Cmaj7 in root position'), t('Am7 第一转位', 'Am7 の第 1 転回', 'Am7 in first inversion')] },
          { prompt: t('B♭ 大调，低音 C 上写 4/3。是哪个和弦？', '変ロ長調、バス C に 4/3。どの和音？', 'B♭ major: 4/3 over a bass C. Which chord?'), options: [t('F7 第二转位（V⁴₃）', 'F7 の第 2 転回（V⁴₃）', 'F7 in second inversion (V⁴₃)'), t('Cm7 原位', 'Cm7 の基本形', 'Cm7 in root position'), t('A°7 第一转位', 'A°7 の第 1 転回', 'A°7 in first inversion')] },
          { prompt: t('低音下面只写一个 7，代表？', 'バスの下に 7 だけ。意味は？', 'A lone 7 under the bass means…'), options: [t('原位七和弦', '基本形の七の和音', 'A root-position seventh chord'), t('第七级上的三和弦', '第 7 音上の三和音', 'A triad on degree 7'), t('第三转位', '第 3 転回', 'Third inversion')] },
        ],
        answer: 0,
        explain: t('从低音往上数，叠回原位找根音，再看低音是哪个和弦音；只写 7 是原位七和弦。', 'バスから数えて基本形に積み直し根音を探し、バスが何の音かを見る。7 だけなら基本形の七の和音。', 'Count up from the bass, restack to find the root, then see which member is in the bass; a lone 7 means root-position seventh.'),
      },
      {
        id: 'b23x-c2', type: 'choice', error: 'wrong-chord', skills: ['spell'], ref: 'omt2e-figured-bass',
        variants: [
          { prompt: t('D 小调，低音 A 上只写 ♯。实现出来是？', 'ニ短調、バス A に ♯ だけ。実現すると？', 'D minor: a lone ♯ over A. Realised:'), options: ['A C♯ E', 'A C E', 'A♯ C E', 'A C E♯'] },
          { prompt: t('E 小调，低音 D♯ 上写 6。实现出来是？', 'ホ短調、バス D♯ に 6。実現すると？', 'E minor: 6 over D♯. Realised:'), options: ['D♯ F♯ B', 'D♯ F♯ A', 'D♯ G B', 'D♯ F♯ C'] },
          { prompt: t('数字 6 上画一道斜线，意思是？', '数字 6 に斜線。意味は？', 'A slash through a 6 means…'), options: [t('把六度升高半音', '6 度を半音上げる', 'Raise the sixth a half step'), t('不要六度', '6 度を省く', 'Omit the sixth'), t('把六度降低半音', '6 度を半音下げる', 'Lower the sixth a half step')] },
        ],
        answer: 0,
        explain: t('孤立的临时记号作用在三度；6 = 三度 + 六度（D♯ 上是 F♯、B，即 V⁶）；斜线或 + 表示升高半音。', '孤立した臨時記号は 3 度に。6 = 3 度 + 6 度（D♯ の上は F♯・B、V⁶）。斜線や + は半音上げ。', 'An orphaned accidental hits the third; 6 = third + sixth (over D♯: F♯ and B, V⁶); a slash or + raises a half step.'),
      },
      {
        id: 'b23x-c3', type: 'choice', error: 'concept', skills: ['apply'], ref: 'omt2e-galant-rule-octave',
        variants: [
          { prompt: t('OMT 的八度法则版本接近谁？', 'OMT のオクターヴの規則は誰の版に近い？', 'OMT’s Rule of the Octave closely follows…'), options: [t('Fedele Fenaroli（那不勒斯，1775）', 'フェデーレ・フェナローリ（ナポリ、1775）', 'Fedele Fenaroli (Naples, 1775)'), 'Jean-Philippe Rameau', 'Johann Joseph Fux', 'Heinrich Schenker'] },
          { prompt: t('八度法则搭建的第一步（全用平行六和弦）有什么问题？', '第 1 ステップ（すべて平行六）の問題は？', 'What is wrong with step one (all parallel sixths)?'), options: [t('没有语法错误，但没有层次', '文法の誤りはないが、階層がない', 'Nothing grammatical — it just lacks hierarchy'), t('有平行五度', '平行 5 度がある', 'It has parallel fifths'), t('和弦都不在调里', '和音が調にない', 'The chords leave the key')] },
          { prompt: t('7–6 延留链配上行音阶时要怎么改？', '7–6 の掛留の鎖を上行音階に付けるときの変更は？', 'How must a 7–6 chain change for an ascending scale?'), options: [t('上方声部跳回八度重新开始（7–6–8）', '上声がオクターヴ跳んでやり直す（7–6–8）', 'The upper part leaps an octave to restart (7–6–8)'), t('不用改', '変更不要', 'No change'), t('改成 4–3', '4–3 にする', 'Switch to 4–3')] },
        ],
        answer: 0,
        explain: t('OMT 的版本接近 Fenaroli；平行六和弦没错但平淡；7–6 的上方声部下行，配上行音阶要跳回八度重来。', 'OMT の版はフェナローリに近い。平行六は誤りではないが平板。7–6 は上声が下行するので、上行音階ではオクターヴ跳んでやり直す。', 'OMT’s version follows Fenaroli; parallel sixths are correct but flat; 7–6 has a falling upper part, so an ascending scale needs an octave leap to restart.'),
      },
      {
        id: 'b23x-c4', type: 'choice', error: 'concept', skills: ['function'], ref: 'omt2e-chromatic-sequences',
        variants: [
          { prompt: t('自然音模进保留移位音程的什么？', '全音階的反復進行が保つのは移動の音程の何？', 'A diatonic sequence preserves the transposition interval’s…'), options: [t('度数，不保留性质', '度数（種類は保たない）', 'Size, not quality'), t('度数和性质', '度数と種類', 'Size and quality'), t('性质，不保留度数', '種類（度数は保たない）', 'Quality, not size')] },
          { prompt: t('下行五度模进每隔一个和弦换成副属七，它变成半音模进了吗？', '下行 5 度の反復進行で 1 つおきに副属七にすると、半音階的反復進行になる？', 'Make every other chord of a descending-fifths sequence an applied seventh: is it now chromatic?'), options: [t('没有：强拍根音仍按同一个调的音级走', 'いいえ：強拍の根音は同じ調の音度をたどる', 'No: the downbeat roots still follow one key'), t('是：只要有半音就是', 'はい：半音があればそう', 'Yes: any chromatic note makes it so')] },
        ],
        answer: 0,
        explain: t('自然音模进只保留度数，才留得在调里；副属只是半音装饰，强拍根音没离开调内音级。', '全音階的反復進行は度数だけを保つので調に留まる。副属は半音の装飾で、強拍の根音は調内の音度のまま。', 'Diatonic sequences keep size only, staying in key; applied dominants are chromatic decoration while downbeat roots stay diatonic.'),
      },
      G('b23x-g1', 'inversionBass', 2, ['identify']),
      G('b23x-g2', 'romanChord', 1, ['function']),
      G('b23x-g3', 'seventhSpell', 1, ['spell']),
    ],
  },
  pool: [G('b23x-p1', 'inversionBass', 3, ['identify']), G('b23x-p2', 'romanChord', 2, ['function'])],
};

// ===================== B2-4x 四部写作 I · 扩展关 =====================
// 对应 A 面：voicing（紧密与开放 / 音域与间距 / 重复与省略 / drop 2 与 drop 3）、支线 voiceleading（平行五八度 / 直接五八度、交叉与超越 / 导音的解决 / 七音的解决）的进阶关
// SATB 和弦按 [男低, 男高, 女中, 女高] 的 MIDI 写
// 改好后的一种答案（检查器 100 分）：I [48,60,64,72] · IV [41,60,65,69] · V⁷（不完全，重复根音）[43,59,65,67] · I [48,60,64,67]
const SATB_BAD = { I: [48, 60, 64, 72], IV: [41, 60, 65, 69], V7bad: [43, 59, 67, 71], Ibad: [48, 60, 72, 72] };
const EXT_B2_4 = {
  minutes: 23,
  core: true,
  insight: t('四部写作的每条规则都在保护一件事：要么让四条线各自听得清（独立），要么让和弦站得稳（倾向音去该去的地方）。', '4 声体の規則はどれも 1 つのものを守る：4 本の線をそれぞれ聞こえるようにする（独立）か、和音を安定させる（傾向音を行くべき所へ）。', 'Every four-part rule protects one thing: either that four lines stay audible (independence) or that the harmony stands firm (tendency tones going where they should).'),
  sections: {
    discover: [
      {
        id: 'b24x-d1', type: 'discover', ref: 'omt2e-v7',
        prompt: t('C 大调 V⁷ → I，每个音都按倾向走（F → E、B → C、D → C、G → C）。听最后的 I：它少了五音 G。这算写错了吗？', 'ハ長調 V⁷ → I、どの音も傾向どおり（F → E・B → C・D → C・G → C）。最後の I を聴こう：第 5 音 G がない。これは誤り？', 'C major V⁷ → I with every note following its tendency (F → E, B → C, D → C, G → C). Hear the final I: it has no fifth, G. Is that a mistake?'),
        play: [{ label: 'V⁷ → I', audio: { notes: [[43, 59, 65, 74], [36, 60, 64, 72]], mode: 'chords' } }],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes: [{ p: 'D5', d: 'w', s: 0, col: 0 }, { p: 'F4', d: 'w', s: 0, col: 0 }, { p: 'B3', d: 'w', s: 1, col: 0 }, { p: 'G2', d: 'w', s: 1, col: 0 }, { p: 'C5', d: 'w', s: 0, col: 1 }, { p: 'E4', d: 'w', s: 0, col: 1 }, { p: 'C4', d: 'w', s: 1, col: 1 }, { p: 'C2', d: 'w', s: 1, col: 1 }], cols: 2 },
        options: [t('不算：这是默认解决，三个根音一个三音，完全正常', '誤りではない：既定の解決で、根音 3 つ・第 3 音 1 つは完全に正常', 'No: it is the default resolution — three roots and a third is perfectly normal'), t('算：每个和弦都必须完整', '誤り：和音はいつも完全でなければならない', 'Yes: every chord must be complete'), t('算：应该让 re 上行到 mi', '誤り：re を mi へ上げるべき', 'Yes: re should rise to mi')],
        answer: 0,
        insight: {
          title: t('根音和三音才是必需的', '必要なのは根音と第 3 音', 'Root and third are what matter'),
          text: t('完整的 V⁷ 按倾向解决，就会得到三个根音、一个三音、没有五音的 I——这是正常、预期中的写法。五音不提供关键信息：根音决定和弦叫什么，三音决定性质。反过来让 re 上行到 mi（两个根音两个三音）很少见，还容易带来声部进行问题。想要完整的 I 也有办法：省掉 V⁷ 的五音，或者让内声部的导音下跳到 sol。', '完全な V⁷ を傾向どおり解決すると、根音 3 つ・第 3 音 1 つ・第 5 音なしの I になる——正常で予想どおりの書き方。第 5 音は重要な情報を持たない：根音が和音の名前を、第 3 音が種類を決める。逆に re を mi に上げる（根音 2・第 3 音 2）のはまれで、問題を起こしやすい。完全な I が欲しければ方法がある：V⁷ の第 5 音を省くか、内声の導音を sol へ跳ばせる。', 'A complete V⁷ resolved by tendency gives an I with three roots, one third and no fifth — normal and expected. The fifth carries no essential information: the root names the chord and the third gives its quality. Moving re up to mi instead (two roots, two thirds) is rare and invites voice-leading trouble. For a complete I there are two ways: omit V⁷’s fifth, or drop an inner-voice leading tone to sol.'),
        },
      },
    ],
    explain: [
      {
        id: 'b24x-e1', type: 'page', ref: ['wiki-voicing', 'omt2e-roman-numerals'],
        title: t('进阶 1 · 紧密、开放，以及"排法就是音色"', '発展 1・密集・開離、そして「配置は音色」', 'Advanced 1 · Close, open, and voicing as colour'),
        text: [
          t('紧密排列是最紧凑的排法：相邻的音之间再也放不下别的和弦音；开放排列至少有一处空得下和弦音。四部和声里低音必须符合罗马数字的转位，上面三个声部却可以有很多种排法——没有唯一正确的答案。', '密集配置はいちばん詰まった並べ方：隣り合う音のあいだにほかの和音構成音が入らない。開離配置は少なくとも 1 か所に入る余地がある。4 声体ではバスはローマ数字の転回どおりでなければならないが、上の 3 声の並べ方はいろいろあり、正解は 1 つではない。', 'Close position is the most compact voicing: no chord tone fits between neighbours; open position leaves room somewhere. In four-part writing the bass must match the numeral’s inversion, but the upper three voices can be arranged many ways — there is no single right answer.'),
          t('排法本身就是音色：斯特拉文斯基《诗篇交响曲》开头那个短促的 E 小三和弦，把小三度重复在四个八度上，根音和五音只在最高和最低处各出现一次；艾夫斯《未回答的问题》开头，弦乐以几乎听不见的极弱奏出一个排得很开的 G 大三和弦。', '配置そのものが音色になる：ストラヴィンスキー《詩篇交響曲》冒頭の短い E 短三和音は、短 3 度を 4 オクターヴに重ね、根音と 5 度は最高と最低に 1 回ずつ。アイヴズ《答えのない質問》の冒頭では弦が聞こえるか聞こえないかの弱さで、大きく開いた G 長三和音を奏でる。', 'Voicing is colour: the staccato E minor chord opening Stravinsky’s Symphony of Psalms doubles the minor third in four octaves, with root and fifth only once each at the extremes; Ives’s The Unanswered Question opens with strings playing a widely spaced G major chord at the edge of audibility.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes: [...col(['C4', 'E4', 'G4'], 0, { s: 0 }), { p: 'C3', d: 'w', s: 1, col: 0 }, { p: 'E5', d: 'w', s: 0, col: 1 }, { p: 'G4', d: 'w', s: 0, col: 1 }, { p: 'C4', d: 'w', s: 1, col: 1 }, { p: 'C2', d: 'w', s: 1, col: 1 }], cols: 2 },
      },
      {
        id: 'b24x-e2', type: 'page', ref: 'omt2e-roman-numerals',
        title: t('进阶 2 · 六条规则里的数字：音域与间距', '発展 2・6 つの規則の数字：音域と間隔', 'Advanced 2 · The numbers in the six rules: range and spacing'),
        text: [
          t('六条规则：符干方向、和弦构成、音域、间距、声部交叉、重复。符干：女高、女中写在高音谱表，男高、男低写在低音谱表；女高、男高符干朝上，女中、男低朝下。音域：女高 C4–G5，女中 G3–D5，男高 C3–G4，男低 F2–D4。', '6 つの規則：符尾の向き・和音の構成・音域・間隔・声部交差・重複。符尾：ソプラノとアルトはト音譜表、テノールとバスはヘ音譜表。ソプラノとテノールは上向き、アルトとバスは下向き。音域：ソプラノ C4–G5、アルト G3–D5、テノール C3–G4、バス F2–D4。', 'Six rules: stem direction, chord construction, range, spacing, voice crossing, doubling. Stems: soprano and alto on the treble staff, tenor and bass on the bass staff; soprano and tenor stems up, alto and bass down. Ranges: soprano C4–G5, alto G3–D5, tenor C3–G4, bass F2–D4.'),
          t('间距：相邻的上方声部（女高—女中、女中—男高）不超过八度，男高与男低之间可以到十二度。间距错误和声部交叉都最常出在女中和男高之间——因为它们写在不同的谱表上，眼睛不容易发现。', '間隔：隣り合う上 3 声（ソプラノ—アルト、アルト—テノール）は 1 オクターヴ以内、テノールとバスは 12 度まで。間隔の誤りも声部交差も、アルトとテノールのあいだで最も多い——別々の譜表に書かれていて目で気づきにくいから。', 'Spacing: adjacent upper voices (soprano–alto, alto–tenor) within an octave; tenor and bass up to a twelfth. Spacing errors and voice crossings are both most common between alto and tenor — they sit on different staves, so the eye misses them.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: 'S', cells: ['C4 – G5'] }, { label: 'A', cells: ['G3 – D5'] }, { label: 'T', cells: ['C3 – G4'] }, { label: 'B', cells: ['F2 – D4'] }] },
      },
      {
        id: 'b24x-e3', type: 'discover', practice: true, ref: 'omt2e-roman-numerals',
        prompt: t('女高 E5 · 女中 G4 · 男高 E3 · 男低 C3。哪里有问题？', 'ソプラノ E5・アルト G4・テノール E3・バス C3。どこが問題？', 'Soprano E5 · alto G4 · tenor E3 · bass C3. What is wrong?'),
        options: [t('女中与男高相距超过八度', 'アルトとテノールが 1 オクターヴを超えて離れている', 'Alto and tenor are more than an octave apart'), t('男高与男低超过十二度', 'テノールとバスが 12 度を超える', 'Tenor and bass exceed a twelfth'), t('女高超出音域', 'ソプラノが音域外', 'The soprano is out of range')],
        answer: 0,
        insight: { title: t('最常出错的一对', 'いちばん間違えやすいペア', 'The usual suspects'), text: t('G4 到 E3 是十三度，超过八度；男高与男低 E3–C3 只有三度，没问题；E5 在女高音域内。', 'G4 から E3 は 13 度で 1 オクターヴ超え。テノールとバス E3–C3 は 3 度で問題なし。E5 はソプラノの音域内。', 'G4 down to E3 is a thirteenth — beyond an octave; tenor–bass E3–C3 is only a third; E5 is in the soprano range.') },
      },
      {
        id: 'b24x-e4', type: 'page', ref: ['omt2e-roman-numerals', 'omt2e-jazz-voicings', 'wiki-voicing'],
        title: t('进阶 3、4 · 重复与省略，古典与爵士；drop 2 与 drop 3', '発展 3・4・重複と省略、古典とジャズ。drop 2 と drop 3', 'Advanced 3–4 · Doubling and omission, classical and jazz; drop 2 and drop 3'),
        text: [
          t('古典四部：三和弦通常重复低音上的音；导音、和弦七音这类倾向音永远不重复；七和弦四个音正好一人一个。爵士配置：要重复就重复低音或根音；最常省略的是五音——它是泛音列里很早出现的第 3 分音，主要加强根音、本身色彩不多，省掉它几乎听不出差别，省七音或根音则声音变化很大。演奏时根音也常被省掉，因为贝斯会弹。', '古典の 4 声：三和音はふつうバスの音を重複。導音や和音の 7 度のような傾向音は決して重複しない。七の和音は 4 音で 1 人 1 音。ジャズの配置：重複するならバスか根音。最もよく省くのは 5 度——倍音列の早い第 3 部分音で根音を強めるが色は少なく、省いてもほとんど変わらない。7 度や根音を省くと響きが大きく変わる。演奏ではベースが弾くので根音もよく省く。', 'Classical four parts: triads usually double the bass note; tendency tones such as the leading tone and chordal seventh are never doubled; seventh chords give one note to each voice. Jazz voicing: double the bass or the root; the most common omission is the fifth — partial 3, early in the harmonic series, reinforcing the root with little colour of its own, so leaving it out changes little, whereas dropping the seventh or root changes the sound a lot. In performance the root is often omitted too, since the bassist plays it.'),
          t('"drop-n"记法：默认的排法是所有声部在同一个八度里，从上往下编号；drop 2 就是把从上往下第二个声部降低八度，drop 3 降第三个，也可以同时降几个（drop 2 and 4）。drop-1 没有定义——降掉最高的声部，剩下的还是在同一个八度里，只是换了一个新的最高声部。这套名称不包括降两个八度，也不包括同一个音重复在几个八度。', '「drop-n」記法：既定の配置は全声部が同じオクターヴ内にあり、上から番号を振る。drop 2 は上から 2 番目の声部を 1 オクターヴ下げ、drop 3 は 3 番目。複数を同時に下げることも（drop 2 and 4）。drop-1 は定義されない——いちばん上を下げても残りは同じオクターヴのままで、新しい最高声部ができるだけ。2 オクターヴ下げることや同じ音の重複は扱わない。', 'Drop-n naming: the default voicing keeps every voice within one octave, numbered from the top down; drop 2 lowers the second voice from the top by an octave, drop 3 the third, and several can drop at once (drop 2 and 4). Drop-1 is undefined — lowering the top voice just leaves a new top voice with everything still in one octave. The system does not cover drops of two octaves or doubled pitches.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['C4', 'E4', 'G4', 'B4'], 0, { label: 'close' }), ...col(['G3', 'C4', 'E4', 'B4'], 1, { label: 'drop 2', lit: true }), ...col(['E3', 'C4', 'G4', 'B4'], 2, { label: 'drop 3' })], cols: 3 },
      },
      {
        id: 'b24x-e5', type: 'discover', practice: true, ref: 'wiki-voicing',
        prompt: t('紧密排列 F4 A4 C5 E5（Fmaj7），做 drop 2 之后是？', '密集配置 F4 A4 C5 E5（Fmaj7）を drop 2 にすると？', 'Close-position F4 A4 C5 E5 (Fmaj7) as drop 2 becomes…'),
        options: ['C4 F4 A4 E5', 'A3 F4 C5 E5', 'F3 A4 C5 E5', 'E4 F4 A4 C5'],
        answer: 0,
        insight: { title: t('从上往下数第二个', '上から 2 番目', 'Second from the top'), text: t('从上往下：1 = E5，2 = C5，3 = A4，4 = F4。把 C5 降八度到 C4：C4 F4 A4 E5。', '上から：1 = E5、2 = C5、3 = A4、4 = F4。C5 を C4 に下げる：C4 F4 A4 E5。', 'Top down: 1 = E5, 2 = C5, 3 = A4, 4 = F4. Drop C5 to C4: C4 F4 A4 E5.') },
      },
      {
        id: 'b24x-e6', type: 'page', ref: ['omt-species1', 'wiki-voicing'],
        title: t('支线 · 平行、直接、交叉、超越：每条规则保护什么', '支線・平行・直接・交差・超越：各規則が守るもの', 'Side quest · Parallel, direct, crossing, overlap: what each rule protects'),
        text: [
          t('不要连续两个同样大小的完全协和：P5–P5、P8–P8，复合音程也算（P5 接 P12 就等于 P5 接 P5）。两个不同的完全协和相连（如 P8–P5）是允许的，不过最好每个完全协和后面接一个不完全协和。原因是：平行五八度让"音的融合"压过了旋律的独立，连续两个最稳定的音响还会让变化和运动停下来。也不要以同向进入完全协和（直接或隐伏八度）——这会让一个本来就很突出的音程更引人注意。', '同じ大きさの完全協和を 2 つ続けない：P5–P5・P8–P8、複音程も含む（P5 → P12 は P5 → P5 と同じ）。違う完全協和の連続（P8–P5 など）は許されるが、完全協和の後には不完全協和を置くのがよい。理由：平行 5・8 度は「音の融合」を旋律の独立より優先させ、最も安定した響きの連続は変化と動きも止めてしまう。完全協和へ同方向で入るのも避ける（直接・隠伏 8 度）——もともと目立つ音程をさらに目立たせる。', 'Never two perfect consonances of the same size in a row: P5–P5, P8–P8, compounds included (P5 to P12 counts as P5 to P5). Two different perfect consonances (P8–P5) are allowed, but ideally follow each perfect consonance with an imperfect one. Why: parallel fifths and octaves let tonal fusion override melodic independence, and back-to-back stable sonorities stall variety and motion. Do not enter a perfect consonance by similar motion either (direct or hidden octaves) — it spotlights an interval that already stands out.'),
          t('声部交叉（上方声部暂时比下方低）和声部超越（一个声部跳过另一个声部上一个音的位置，例如上方唱了 E4，下一拍下方不能唱 F4）都会让两条线难以分辨。平行的不完全协和也别太多：同一种不连续超过三个。维基百科举的例子里，巴赫让平行三度、平行六度都不超过连续四个音，以保持各条线的独立。', '声部交差（上声が一時的に下声より低い）と声部超越（ある声部がほかの声部の直前の音を跳び越える。たとえば上声が E4 を歌った後、下声は F4 を歌えない）は、どちらも 2 本の線を聞き分けにくくする。平行の不完全協和も多すぎないように：同じ種類は 3 つまで。ウィキペディアの例ではバッハは平行 3 度・6 度を連続 4 音以上続けず、線の独立を保っている。', 'Voice crossing (the upper voice dipping below the lower) and voice overlap (one voice leaping past the other’s previous note — after an upper E4, the lower may not take F4) both make lines hard to tell apart. Do not overuse parallel imperfect consonances either: no more than three of a kind in a row. In Wikipedia’s example, Bach never keeps parallel thirds or sixths for more than four consecutive notes, preserving the lines’ independence.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['C4', 'G4'], 0), ...col(['D4', 'A4'], 1, { lit: true }), ...col(['E4', 'C5'], 2), ...col(['G4', 'G5'], 3, { lit: true })], cols: 4 },
      },
      {
        id: 'b24x-e7', type: 'discover', practice: true, ref: 'omt-species1',
        prompt: t('上方声部 E4 → G4，下方声部 C4 → G3。上一拍是三度，这一拍是八度。这是？', '上声 E4 → G4、下声 C4 → G3。前は 3 度、今は 8 度。これは？', 'Upper E4 → G4, lower C4 → G3: a third, then an octave. This is…'),
        options: [t('反向进入八度——没问题', '反行で 8 度へ——問題なし', 'Contrary motion into an octave — fine'), t('直接八度', '直接 8 度', 'A direct octave'), t('平行八度', '平行 8 度', 'Parallel octaves')],
        answer: 0,
        insight: { title: t('看方向', '方向を見る', 'Check the directions'), text: t('上方上行、下方下行，是反向进入八度；直接八度要求两个声部同向进入。', '上声は上行、下声は下行で反行。直接 8 度は 2 声部が同方向で入る場合。', 'The upper voice rises and the lower falls — contrary motion; a direct octave needs both voices moving the same way.') },
      },
      {
        id: 'b24x-e8', type: 'page', ref: 'omt2e-v7',
        title: t('支线 · 导音与 V⁷ 的三种解决', '支線・導音と V⁷ の 3 つの解決', 'Side quest · The leading tone and three resolutions of V⁷'),
        text: [
          t('V 加上七音 fa 变成属七，多出来的不协和让它更想回到 I——Margaret Casson 的《The Cuckoo》就用 V⁷ 做完满正格终止。写 V⁷ → I 的顺序：先写整条低音（sol → do），再给女高选一个"活跃"的音并按倾向解决，最后把两个内声部成对填上：我有什么、缺什么、它们要去哪？小调里 V⁷ 要用 ti，不是 te。', 'V に 7 度の fa を加えると属七になり、増えた不協和で I へ戻りたさが強まる——マーガレット・キャッソン《The Cuckoo》は V⁷ で完全正格終止をつくる。V⁷ → I の書き方：まずバス全体（sol → do）、次にソプラノに「活動的な」音を選び傾向どおり解決、最後に内声 2 つを組で埋める：何がある？ 何が足りない？ どこへ行く？ 短調では V⁷ に te ではなく ti を使う。', 'Adding the seventh fa turns V into a dominant seventh whose extra dissonance pulls harder toward I — Margaret Casson’s “The Cuckoo” ends with a PAC on V⁷. To write V⁷ → I: the whole bass first (sol → do), then a soprano active note resolved by tendency, then fill the inner voices as a pair — what do I have, what do I need, where do they go? In minor, V⁷ uses ti, not te.'),
          t('三种解决：① 默认解决——各倾向音按倾向走，I 有三个根音、一个三音、没有五音，完全正常；② 不完全 V⁷——省掉五音，只能重复根音（重复 ti 或 fa 的话，两个声部都按倾向解决就会出平行八度），得到完整的 I；③ 导音下跳——完整的 V⁷ 里，内声部的 ti 下跳到 sol，也得到完整的 I。这样做行得通是因为：ti 不是不协和音；它在内声部不显眼；它是离 sol 最近的音。', '3 つの解決：① 既定の解決——傾向音が傾向どおりに進み、I は根音 3・第 3 音 1・第 5 音なしで完全に正常。② 不完全な V⁷——第 5 音を省き、重複できるのは根音だけ（ti や fa を重複すると両方が傾向どおり進んで平行 8 度）、完全な I が得られる。③ 導音の下行跳躍——完全な V⁷ で内声の ti が sol へ跳び、完全な I になる。これがうまくいくのは：ti は不協和音ではない、内声で目立たない、sol に最も近い音だから。', 'Three resolutions: ① default — tendency tones resolve and I has three roots, one third, no fifth: perfectly normal; ② incomplete V⁷ — omit the fifth and double only the root (doubling ti or fa makes parallel octaves when both resolve), yielding a complete I; ③ leading-tone drop — in a complete V⁷ an inner-voice ti leaps down to sol for a complete I. It works because ti is not dissonant, sits unobtrusively in an inner voice, and is the closest note that can reach sol.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes: [{ p: 'D5', d: 'h', s: 0, col: 0 }, { p: 'B4', d: 'h', s: 0, col: 0, lit: true }, { p: 'F4', d: 'h', s: 1, col: 0 }, { p: 'G2', d: 'h', s: 1, col: 0 }, { p: 'C5', d: 'h', s: 0, col: 1 }, { p: 'G4', d: 'h', s: 0, col: 1, lit: true }, { p: 'E4', d: 'h', s: 1, col: 1 }, { p: 'C3', d: 'h', s: 1, col: 1 }], cols: 2 },
      },
      {
        id: 'b24x-e9', type: 'discover', practice: true, ref: 'omt2e-v7',
        prompt: t('F 大调：想让 I 完整，把 V⁷ 写成不完整的（省掉五音 G）。这时要重复哪个音？', 'ヘ長調：完全な I にしたいので V⁷ を不完全に（第 5 音 G を省く）。何を重複する？', 'F major: for a complete I, write an incomplete V⁷ (no fifth, G). Which note is doubled?'),
        options: [t('根音 C', '根音 C', 'The root, C'), t('导音 E', '導音 E', 'The leading tone, E'), t('七音 B♭', '第 7 音 B♭', 'The seventh, B♭')],
        answer: 0,
        insight: { title: t('只能重复根音', '重複できるのは根音だけ', 'Only the root may be doubled'), text: t('重复 E 或 B♭，两个声部都按倾向解决（E → F、B♭ → A）就成了平行八度；重复根音 C 才安全。', 'E や B♭ を重複すると、両声部が傾向どおり（E → F・B♭ → A）進んで平行 8 度。根音 C なら安全。', 'Doubling E or B♭ sends both voices to the same goal (E → F, B♭ → A): parallel octaves. Doubling the root C is safe.') },
      },
      {
        id: 'b24x-e10', type: 'page', ref: 'omt2e-pd7',
        title: t('支线 · 七音怎么来、怎么走：预属七和弦', '支線・7 度の入り方と進み方：前属七の和音', 'Side quest · How sevenths arrive and leave: predominant sevenths'),
        text: [
          t('给 V 加七音能加强它回到 I 的力量；给预属和弦加七音也一样，会加强它走向 V 的力量（Josephine Lang《Dort hoch auf jenem Berge》里有例子）。所有预属七和弦都遵守两条：和弦七音通常以级进或保持音进入；和弦七音向下级进解决。', 'V に 7 度を加えると I へ戻る力が強まる。前属和音に 7 度を加えても同じで、V へ向かう力が強まる（ヨゼフィーネ・ラング《Dort hoch auf jenem Berge》に例がある）。すべての前属七に共通の 2 つ：和音の 7 度はふつう順次進行か保留音で入る、和音の 7 度は下へ順次進行で解決する。', 'A seventh on V strengthens its pull to I; a seventh on a predominant likewise strengthens its pull to V (see Josephine Lang’s “Dort hoch auf jenem Berge”). All predominant sevenths follow two guidelines: approach the chordal seventh by step or common tone; resolve it down by step.'),
          t('ii⁷ 及其转位最常见，ii⁷ 常出现在乐句末。写 ii⁷ 时注意两件事：它前面常是主和弦，最好用 I⁶ 而不是 I，以免出平行；ii⁷ 接到 V⁷ 时，两个和弦里要有一个不完全，否则会出声部进行问题。IV⁷、vi⁷ 少得多，多是原位；vi⁷ 只用来把主区连到强的预属区，V⁷ 接 vi⁷ 并不常见。', 'ii⁷ とその転回形が最も多く、ii⁷ はフレーズの終わり近くによく出る。ii⁷ を書くときの注意 2 つ：前はよく主和音で、平行を避けるため I より I⁶ がよい。ii⁷ から V⁷ へ進むときは、どちらかを不完全にしないと声部進行の問題が起きる。IV⁷・vi⁷ はずっと少なく、多くは基本形。vi⁷ は主の領域を強い前属の領域へつなぐときだけで、V⁷ から vi⁷ は一般的でない。', 'ii⁷ and its inversions are the most common, ii⁷ itself typically near a phrase end. Two cautions: it is often preceded by tonic, best as I⁶ rather than I to avoid parallels; and when ii⁷ goes to V⁷, one of the two must be incomplete to avoid voice-leading trouble. IV⁷ and vi⁷ are far less common, mostly in root position; vi⁷ only links the tonic area to the strong predominant area — V⁷ to vi⁷ is uncommon.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes: [{ p: 'D5', d: 'h', s: 0, col: 0 }, { p: 'C5', d: 'h', s: 0, col: 0, lit: true }, { p: 'A3', d: 'h', s: 1, col: 0 }, { p: 'F3', d: 'h', s: 1, col: 0 }, { p: 'D5', d: 'h', s: 0, col: 1 }, { p: 'B4', d: 'h', s: 0, col: 1, lit: true }, { p: 'G3', d: 'h', s: 1, col: 1 }, { p: 'G2', d: 'h', s: 1, col: 1 }], cols: 2 },
      },
      {
        id: 'b24x-e11', type: 'discover', practice: true, ref: 'omt2e-pd7',
        prompt: t('C 大调 ii⁷ → V：ii⁷ 的七音 C 该怎么走？', 'ハ長調 ii⁷ → V：ii⁷ の 7 度 C はどう進む？', 'C major ii⁷ → V: where does ii⁷’s seventh, C, go?'),
        options: [t('往下级进到 B', '下へ順次進行して B', 'Down by step to B'), t('往上到 D', '上へ D', 'Up to D'), t('保持在 C', 'C のまま', 'Stay on C')],
        answer: 0,
        insight: { title: t('七音向下级进', '7 度は下へ順次', 'Sevenths step down'), text: t('和弦七音向下级进解决：C → B，正好是 V 的三音。', '和音の 7 度は下へ順次進行：C → B、ちょうど V の第 3 音。', 'Chordal sevenths resolve down by step: C → B, the third of V.') },
      },
    ],
    experiment: [
      { id: 'b24x-x1', type: 'experiment', toy: 'satb', ref: ['omt2e-roman-numerals', 'omt2e-v7', 'omt-species1'],
        prompt: t('这段 I–IV–V⁷–I 有三个毛病：V⁷ 里没有七音、导音被重复了，接到 I 时还出现平行八度。用上下箭头移动音符，随时播放，改到 100 分。提示：先给 V⁷ 找回七音 F，再想想不完全 V⁷ 该重复哪个音，最后让 I 有三音。', 'この I–IV–V⁷–I には 3 つの問題：V⁷ に 7 度がない、導音が重複している、I へ進むとき平行 8 度。上下矢印で音を動かし、いつでも再生して 100 点にしよう。ヒント：まず V⁷ に 7 度 F を取り戻し、不完全な V⁷ で何を重複するか考え、最後に I に第 3 音を。', 'This I–IV–V⁷–I has three faults: V⁷ lacks its seventh, the leading tone is doubled, and parallel octaves appear going to I. Move notes with the arrows, play any time, and reach 100. Hint: give V⁷ back its seventh F, decide what an incomplete V⁷ doubles, then give I its third.'),
        params: { keyName: 'C', tonic: 0, romans: ['I', 'IV', 'V7', 'I'], chords: [SATB_BAD.I, SATB_BAD.IV, SATB_BAD.V7bad, SATB_BAD.Ibad] },
        breakthrough: { id: 'b24x-fixed', text: t('你找回了七音、拆掉了重复的导音，也消掉了平行八度。', '7 度を取り戻し、重複した導音をほどき、平行 8 度も消した。', 'You restored the seventh, undid the doubled leading tone and removed the parallel octaves.') } },
    ],
    challenge: [
      {
        id: 'b24x-c1', type: 'choice', error: 'range', skills: ['voiceLeading'], ref: 'omt2e-roman-numerals',
        variants: [
          { prompt: t('男低音 E2 · 男高 G3 · 女中 C4 · 女高 E4。哪里有问题？', 'バス E2・テノール G3・アルト C4・ソプラノ E4。どこが問題？', 'Bass E2 · tenor G3 · alto C4 · soprano E4. What is wrong?'), options: [t('男低音低于 F2，超出音域', 'バスが F2 より低く音域外', 'The bass is below F2, out of range'), t('男高与男低超过十二度', 'テノールとバスが 12 度超え', 'Tenor–bass exceeds a twelfth'), t('女高高于 G5', 'ソプラノが G5 より高い', 'The soprano is above G5')] },
          { prompt: t('女高 C5 · 女中 E4 · 男高 G4 · 男低 C3。哪里有问题？', 'ソプラノ C5・アルト E4・テノール G4・バス C3。どこが問題？', 'Soprano C5 · alto E4 · tenor G4 · bass C3. What is wrong?'), options: [t('男高比女中高：声部交叉', 'テノールがアルトより高い：声部交差', 'Tenor above alto: voice crossing'), t('女高与女中超过八度', 'ソプラノとアルトが 1 オクターヴ超え', 'Soprano–alto exceeds an octave'), t('男低超出音域', 'バスが音域外', 'Bass out of range')] },
          { prompt: t('男高与男低之间最多可以相距？', 'テノールとバスの間隔の上限は？', 'Tenor and bass may be at most…'), options: [t('十二度', '12 度', 'a twelfth'), t('八度', '8 度', 'an octave'), t('十度', '10 度', 'a tenth'), t('十五度', '15 度', 'a fifteenth')] },
        ],
        answer: 0,
        explain: t('音域：女高 C4–G5、女中 G3–D5、男高 C3–G4、男低 F2–D4；相邻上方声部不超过八度、男高男低不超过十二度；女中与男高最容易交叉。', '音域：ソプラノ C4–G5・アルト G3–D5・テノール C3–G4・バス F2–D4。上 3 声の隣は 1 オクターヴ以内、テノールとバスは 12 度以内。アルトとテノールが最も交差しやすい。', 'Ranges: S C4–G5, A G3–D5, T C3–G4, B F2–D4; adjacent upper voices within an octave, tenor–bass within a twelfth; alto and tenor cross most often.'),
      },
      {
        id: 'b24x-c2', type: 'choice', error: 'parallel-fifths', skills: ['voiceLeading'], ref: 'omt-species1',
        variants: [
          { prompt: t('两个声部：C3–G4（纯十二度）接 D4–A4（纯五度），同时上行。算平行吗？', '2 声部：C3–G4（完全 12 度）から D4–A4（完全 5 度）、ともに上行。平行？', 'C3–G4 (a twelfth) to D4–A4 (a fifth), both rising. Parallel?'), options: [t('算：P12 接 P5 等同 P5 接 P5', 'はい：P12 → P5 は P5 → P5 と同じ', 'Yes: P12 to P5 counts as P5 to P5'), t('不算：大小不同', 'いいえ：大きさが違う', 'No: different sizes'), t('不算：只有同度才算', 'いいえ：同度だけ', 'No: only unisons count')] },
          { prompt: t('P8 接 P5（两个声部同向）允许吗？', 'P8 → P5（同方向）は許される？', 'P8 to P5 (same direction) — allowed?'), options: [t('允许（大小不同），但最好之后接不完全协和', '許される（大きさが違う）が、後に不完全協和がよい', 'Allowed (different sizes), though ideally followed by an imperfect consonance'), t('不允许，等同平行八度', '許されない、平行 8 度と同じ', 'Not allowed — same as parallel octaves')] },
          { prompt: t('为什么要避免平行五八度？', 'なぜ平行 5・8 度を避ける？', 'Why avoid parallel fifths and octaves?'), options: [t('音的融合压过独立，两条线听成一条', '音の融合が独立を上回り、2 本が 1 本に聞こえる', 'Fusion overrides independence; two lines sound as one'), t('因为它们不协和', '不協和だから', 'Because they are dissonant'), t('因为音域太宽', '音域が広すぎるから', 'Because the range is too wide')] },
        ],
        answer: 0,
        explain: t('同样大小的完全协和不能连用（复合音程也算）；不同大小可以；平行五八度让融合压过独立。', '同じ大きさの完全協和は続けない（複音程も含む）。違う大きさなら可。平行 5・8 度は融合が独立を上回る。', 'Same-size perfect consonances may not follow each other (compounds included); different sizes may; parallels let fusion override independence.'),
      },
      {
        id: 'b24x-c3', type: 'choice', error: 'unresolved-leading-tone', skills: ['voiceLeading'], ref: 'omt2e-v7',
        variants: [
          { prompt: t('导音下跳到 sol 为什么可以？', '導音が sol へ跳ぶのはなぜ許される？', 'Why may the leading tone drop to sol?'), options: [t('它不是不协和音、在内声部、离 sol 最近', '不協和音ではない・内声・sol に最も近い', 'It is not dissonant, it is in an inner voice, and it is closest to sol'), t('因为它在女高声部', 'ソプラノにあるから', 'Because it is in the soprano'), t('因为导音可以随便走', '導音はどこへでも行けるから', 'Because leading tones may go anywhere')] },
          { prompt: t('G 小调的 V⁷ 里，第三音应该是？', 'ト短調の V⁷ の第 3 音は？', 'In G minor, the third of V⁷ is…'), options: ['F♯ (ti)', 'F (te)', 'E♭', 'A'] },
          { prompt: t('写 V⁷ → I 的推荐顺序？', 'V⁷ → I の推奨される書く順番は？', 'The recommended order for writing V⁷ → I?'), options: [t('低音 → 女高 → 内声部成对', 'バス → ソプラノ → 内声を組で', 'Bass → soprano → inner voices as a pair'), t('女高 → 女中 → 男高 → 男低', 'ソプラノ → アルト → テノール → バス', 'Soprano → alto → tenor → bass'), t('内声部先写', '内声から', 'Inner voices first')] },
        ],
        answer: 0,
        explain: t('导音下跳只在内声部、只到 sol；小调 V⁷ 用 ti；先写低音和女高，再填内声部。', '導音の跳躍は内声で sol へだけ。短調の V⁷ は ti。バスとソプラノを書いてから内声を埋める。', 'The leading-tone drop happens only inside, only to sol; minor V⁷ uses ti; write bass and soprano first, then the inner pair.'),
      },
      {
        id: 'b24x-c4', type: 'choice', error: 'unresolved-seventh', skills: ['voiceLeading'], ref: 'omt2e-pd7',
        variants: [
          { prompt: t('和弦七音通常怎样进入？', '和音の 7 度はふつうどう入る？', 'How is a chordal seventh usually approached?'), options: [t('级进或保持音', '順次進行か保留音', 'By step or common tone'), t('大跳', '大きな跳躍', 'By a large leap'), t('从下方跳上来', '下から跳び上がる', 'By leaping up from below')] },
          { prompt: t('ii⁷ 前面接主和弦，最好用哪个？', 'ii⁷ の前の主和音はどれがよい？', 'Before ii⁷, which tonic is best?'), options: ['I⁶', 'I', 'I⁶₄', 'i'] },
          { prompt: t('ii⁷ 接 V⁷ 时要注意？', 'ii⁷ から V⁷ で注意することは？', 'When ii⁷ goes to V⁷…'), options: [t('其中一个和弦要不完全', 'どちらかを不完全にする', 'One of the two must be incomplete'), t('两个都要完整', '両方とも完全に', 'Both must be complete'), t('七音要重复', '7 度を重複する', 'Double the sevenths')] },
        ],
        answer: 0,
        explain: t('七音级进或保持音进入、向下级进解决；ii⁷ 前用 I⁶ 避免平行；ii⁷ → V⁷ 要有一个不完全。', '7 度は順次か保留音で入り、下へ順次で解決。ii⁷ の前は I⁶ で平行を避ける。ii⁷ → V⁷ はどちらか不完全。', 'Sevenths enter by step or common tone and resolve down by step; use I⁶ before ii⁷ to avoid parallels; one of ii⁷ / V⁷ must be incomplete.'),
      },
      {
        id: 'b24x-c5', type: 'choice', error: 'bad-doubling', skills: ['spell'], ref: ['omt2e-jazz-voicings', 'omt2e-roman-numerals'],
        variants: [
          { prompt: t('爵士配置里最常省略哪个音？', 'ジャズの配置でいちばんよく省く音は？', 'Which note is most often omitted in jazz voicings?'), options: [t('五音', '5 度', 'The fifth'), t('三音', '3 度', 'The third'), t('七音', '7 度', 'The seventh')] },
          { prompt: t('为什么省掉五音几乎听不出差别？', '5 度を省いてもほとんど変わらないのはなぜ？', 'Why does omitting the fifth change so little?'), options: [t('它是泛音列很早的第 3 分音，加强根音却少有自己的色彩', '倍音列の早い第 3 部分音で、根音を強めるが自分の色は少ない', 'It is partial 3, early in the series — it reinforces the root with little colour of its own'), t('因为五音总是最低的音', 'いつも最低音だから', 'Because the fifth is always lowest'), t('因为五音不协和', '5 度は不協和だから', 'Because the fifth is dissonant')] },
          { prompt: t('古典四部的三和弦通常重复哪个音？', '古典 4 声の三和音でふつう重複する音は？', 'In classical four parts, triads usually double…'), options: [t('低音上的音', 'バスの音', 'The bass note'), t('导音', '導音', 'The leading tone'), t('三音', '第 3 音', 'The third')] },
        ],
        answer: 0,
        explain: t('爵士常省五音（第 3 分音，色彩少）；古典三和弦通常重复低音，导音和七音不重复。', 'ジャズはよく 5 度を省く（第 3 部分音、色が少ない）。古典の三和音はふつうバスを重複し、導音と 7 度は重複しない。', 'Jazz often omits the fifth (partial 3, little colour); classical triads usually double the bass, never the leading tone or seventh.'),
      },
      G('b24x-g1', 'motion', 2, ['voiceLeading']),
      G('b24x-g2', 'drop2', 1, ['spell']),
    ],
  },
  pool: [G('b24x-p1', 'motion', 3, ['voiceLeading']), G('b24x-p2', 'drop2', 2, ['spell']), G('b24x-p3', 'dominantMotion', 2, ['voiceLeading'])],
};

// ===================== B2-5x 和声功能与乐句模型 · 扩展关 =====================
// 对应 A 面：functions（主下属属的成员 / 乐句模型 / 延长主和弦 / 综合）、支线 schemas（doo-wop / singer-songwriter / hopscotch / 王道与卡农）的进阶关
const PC = {
  C: [48, 60, 64, 67], Am: [45, 60, 64, 69], F: [41, 60, 65, 69], G: [43, 59, 62, 67], Dm: [38, 62, 65, 69], Em: [40, 59, 64, 67],
  Fmaj7: [41, 60, 64, 69], G7: [43, 59, 62, 65], Em7: [40, 59, 62, 67], Am7: [45, 60, 64, 67], Dm7: [38, 60, 65, 69],
};
const pc = (...names) => ({ notes: names.map((n) => PC[n]), mode: 'chords' });
const opt = (n, label = n) => ({ label, notes: PC[n] });
const CANON = { notes: [[50, 62, 66, 69], [45, 61, 64, 69], [47, 62, 66, 71], [42, 61, 66, 69], [43, 62, 67, 71], [38, 62, 66, 69], [43, 59, 67, 71], [45, 61, 64, 69]], mode: 'chords' };
const EXT_B2_5 = {
  minutes: 23,
  insight: t('和声功能看的是"往哪里去"：ii⁶ 和 IV 名字不同，却都在 fa 上预告属和弦；流行歌里同样四个和弦，换个顺序、换个起点，就是不同的套路。', '和声機能は「どこへ行くか」で決まる：ii⁶ と IV は名前が違っても fa の上で属を予告する。ポップスの同じ 4 和音も、順番と始点が変われば別の定型。', 'Harmonic function is about where a chord is going: ii⁶ and IV differ in name but both foretell the dominant over fa; in pop, the same four chords in another order or rotation make a different schema.'),
  sections: {
    discover: [
      {
        id: 'b25x-d1', type: 'discover', ref: ['omt-pb-4chord', 'wiki-axis-progression'],
        prompt: t('循环 Am – F – C – G 听三遍。你觉得"家"是 C 还是 Am？', 'ループ Am – F – C – G を 3 回。「家」は C？ Am？', 'Hear the loop Am – F – C – G three times. Is home C or Am?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: pc('Am', 'F', 'C', 'G', 'Am', 'F', 'C', 'G', 'Am', 'F', 'C', 'G') }],
        options: [t('都说得通：这个进行本身没有正格终止，主和弦不明确', 'どちらもあり得る：進行自体に正格終止がなく、主和音がはっきりしない', 'Either works: the progression has no authentic cadence, so the tonic is unclear'), t('一定是 C', '必ず C', 'Definitely C'), t('一定是 Am', '必ず Am', 'Definitely Am')],
        answer: 0,
        insight: {
          title: t('调性模糊', '調性のあいまいさ', 'Tonal ambiguity'),
          text: t('这是 singer/songwriter 套路（vi–IV–I–V，也能读成关系小调的 i–VI–III–VII）。它只有 IV–I 或 VII–i 这样的"终止"，没有 V–I，所以主和弦要靠前后的段落、循环从哪个和弦开始和结束、旋律的重要音来判断。《Despacito》的 Bm–G–D–A 有人听成 D 大调、有人听成 B 小调；Heart 的《What About Love》就利用这种两可在关系大小调之间来回。', 'これは singer/songwriter の定型（vi–IV–I–V、関係短調として i–VI–III–VII とも）。IV–I や VII–i の「終止」しかなく V–I がないので、主和音は前後の部分、ループの始まりと終わりの和音、旋律の重要な音で決まる。《Despacito》の Bm–G–D–A はニ長調にもロ短調にも聞こえる。ハートの《What About Love》はこの両義性を使って平行調を行き来する。', 'This is the singer/songwriter schema (vi–IV–I–V, or in the relative minor i–VI–III–VII). Its only “cadences” are IV–I or VII–i — no V–I — so the tonic depends on surrounding sections, which chord starts and ends the loop, and key melody notes. “Despacito”’s Bm–G–D–A sounds like D major to some and B minor to others; Heart’s “What About Love” exploits the ambiguity, moving between relative major and minor.'),
        },
      },
    ],
    explain: [
      {
        id: 'b25x-e1', type: 'page', ref: ['omt2e-predominants', 'omt2e-la-bass', 'omt2e-vii6'],
        title: t('进阶 1 · 三种功能的成员，以及几个"替身"', '発展 1・3 つの機能のメンバーといくつかの「代役」', 'Advanced 1 · Members of the three functions, and some stand-ins'),
        text: [
          t('强下属：IV 和 ii⁶，都给低音 fa 配和声，听到它们就预告属和弦要来（原位 ii 少一些，大调里也能当强下属；小调的 ii° 一般不用原位）。属：V、V⁷，以及导音和弦——三和弦总以第一转位 vii°⁶ 出现，因为其他转位和低音不协和；它的七和弦在大调里本来是半减七，作曲家几乎总把七音降成全减七（C 大调 B–D–F–A♭），所以 vii°⁷ 比 viiø⁷ 常见得多，它的各转位可以按低音代替 V⁷ 的各转位。', '強い前属：IV と ii⁶、どちらもバスの fa に和声を付け、属が来ることを予告する（基本形の ii は少なめで、長調なら強い前属になれる。短調の ii° はふつう基本形では使わない）。属：V・V⁷、そして導音和音——三和音はいつも第 1 転回 vii°⁶（ほかの転回はバスと不協和）。その七の和音は長調では本来半減七だが、作曲家はほぼいつも 7 度を下げて完全減七にする（ハ長調 B–D–F–A♭）。だから vii°⁷ は viiø⁷ よりずっと多く、その各転回はバス音に応じて V⁷ の各転回の代わりになる。', 'Strong predominants: IV and ii⁶, both harmonising fa in the bass and foretelling the dominant (root-position ii is rarer but can serve in major; minor’s ii° is not normally in root position). Dominants: V, V⁷, and the leading-tone chord — as a triad always vii°⁶, since other inversions clash with the bass; its seventh chord is half-diminished in major, but composers nearly always lower the seventh to make it fully diminished (C major B–D–F–A♭), so vii°⁷ is far more common than viiø⁷, and its inversions can stand in for V⁷’s according to the bass.'),
          t('主：I，以及 la（第六级）的几种用法：乐句开头延长主和弦；乐句中间用 vi 把主区接到强下属区（低音 do–la–fa 一路分解下来），或者作阻碍进行 V–vi。OMT 把 V–vi 叫"阻碍进行"而不是"阻碍终止"——它的作用是避开终止，而不是制造终止。', '主：I、そして la（第 6 音）のいくつかの使い方：フレーズの始めで主和音を延長、フレーズの中ほどで vi が主の領域を強い前属の領域につなぐ（バスが do–la–fa と分散して下りる）、あるいは偽終止的進行 V–vi。OMT は V–vi を「偽終止」ではなく「偽進行」（deceptive motion）と呼ぶ——終止をつくるのではなく、避けるのが目的だから。', 'Tonic: I, plus several uses of la (degree 6): prolonging tonic at a phrase beginning; mid-phrase, vi connecting the tonic area to the strong predominant (bass arpeggiating do–la–fa), or the deceptive motion V–vi. OMT calls V–vi “deceptive motion” rather than “deceptive cadence” because it avoids a cadence rather than making one.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: 'T', cells: ['I', 'vi'] }, { label: 'PD', cells: ['IV', 'ii⁶', 'ii'] }, { label: 'D', cells: ['V', 'V⁷', 'vii°⁶', 'vii°⁷'] }] },
      },
      {
        id: 'b25x-e2', type: 'discover', practice: true, ref: 'omt2e-vii6',
        prompt: t('C 大调里，作曲家最常用的导音七和弦是？', 'ハ長調で作曲家がいちばんよく使う導音七の和音は？', 'In C major, the leading-tone seventh chord composers use most is…'),
        options: [t('B–D–F–A♭（全减七，降低了七音）', 'B–D–F–A♭（完全減七、7 度を下げる）', 'B–D–F–A♭ (fully diminished, seventh lowered)'), t('B–D–F–A（半减七，不改）', 'B–D–F–A（半減七、そのまま）', 'B–D–F–A (half-diminished, unaltered)'), t('B–D♯–F♯–A', 'B–D♯–F♯–A', 'B–D♯–F♯–A')],
        answer: 0,
        insight: { title: t('作曲家偏爱全减七的声音', '作曲家は完全減七の響きを好む', 'Composers prefer the fully diminished sound'), text: t('大调里不改是半减七，但作曲家几乎总把七音降低成 A♭：vii°⁷ 比 viiø⁷ 常见得多。', '長調でそのままなら半減七だが、作曲家はほぼいつも 7 度を A♭ に下げる：vii°⁷ は viiø⁷ よりずっと多い。', 'Unaltered it is half-diminished, but composers nearly always lower the seventh to A♭: vii°⁷ is far more common than viiø⁷.') },
      },
      {
        id: 'b25x-e3', type: 'page', ref: 'omt2e-phrase-model',
        title: t('进阶 2 · 从终止往回读：一个乐句只有一组 Tb–PD–D–Te', '発展 2・終止から逆に読む：1 フレーズに Tb–PD–D–Te は 1 組だけ', 'Advanced 2 · Read back from the cadence: one Tb–PD–D–Te per phrase'),
        text: [
          t('分析步骤：① 听出乐句在哪里结束（新的乐句开始、或开头又出现了，就说明旧的刚结束；也听"到达目标"的感觉）；② 分析结尾的终止：半终止停在 V，正格终止是 V(7)–I，看低音的 sol 或 sol–do；③ 从终止往前找强下属，低音通常是 fa，也可能是 re；④ 回到乐句开头，按主和弦延长的套路往终止分析。', '分析の手順：① フレーズの終わりを聴き取る（新しいフレーズの始まりや冒頭の再現は、前のフレーズが終わった印。「目標に着いた」感じも）。② 終わりの終止を分析：半終止は V で止まり、正格終止は V(7)–I。バスの sol や sol–do を見る。③ 終止から前へ強い前属を探す。バスはふつう fa、re のこともある。④ フレーズの始めに戻り、主和音延長の型を手がかりに終止へ向かって分析。', 'Steps: ① hear where the phrase ends (a new phrase starting, or the opening returning, means the old one just ended; listen for a sense of goal); ② analyse the cadence: a half cadence ends on V, an authentic cadence is V(7)–I — look for sol or sol–do in the bass; ③ back up to find the strong predominant, usually fa in the bass, sometimes re; ④ go back to the start and analyse toward the cadence using tonic-prolongation patterns.'),
          t('标乐句模型：每个乐句只有一组 Tb–PD–D–Te。D 标在终止的属和弦上；正格终止的主和弦标 Te（半终止就省略）；PD 标在终止前、从左往右数第一个强下属上；Tb 标在开头的主和弦上。浪漫派音乐里，开头的主和弦有时会延迟出现，甚至省略。', 'フレーズ・モデルのラベル：1 フレーズに Tb–PD–D–Te は 1 組だけ。D は終止の属和音に。正格終止なら主和音に Te（半終止なら省略）。PD は終止の直前の、左から数えて最初の強い前属に。Tb は冒頭の主和音に。ロマン派では冒頭の主和音が遅れたり省かれたりすることがある。', 'Label the phrase model: exactly one Tb–PD–D–Te per phrase. D goes on the cadential dominant; Te on the tonic of an authentic cadence (omit it for a half cadence); PD on the first strong predominant, reading left to right, right before the cadential dominant; Tb on the opening tonic. In Romantic music the opening tonic is sometimes delayed or omitted.'),
        ],
        visual: { kind: 'blocks', rows: [{ cells: [{ text: 'I', sub: 'Tb' }, { text: 'V⁶₅' }, { text: 'I' }, { text: 'vi' }, { text: 'ii⁶', sub: 'PD' }, { text: 'V⁷', sub: 'D' }, { text: 'I', sub: 'Te' }] }] },
      },
      {
        id: 'b25x-e4', type: 'discover', practice: true, ref: 'omt2e-phrase-model',
        prompt: t('I – vi – IV – ii⁶ – V – I：PD 应该标在哪个和弦上？', 'I – vi – IV – ii⁶ – V – I：PD はどの和音に？', 'I – vi – IV – ii⁶ – V – I: which chord gets the PD label?'),
        options: [t('IV（终止前从左往右第一个强下属）', 'IV（終止の前で左から最初の強い前属）', 'IV (the first strong predominant before the cadence, reading left to right)'), t('ii⁶（紧挨着 V 的那个）', 'ii⁶（V の直前）', 'ii⁶ (right next to V)'), t('vi', 'vi', 'vi')],
        answer: 0,
        insight: { title: t('从左往右的第一个', '左から最初の', 'The first, reading left to right'), text: t('IV 和 ii⁶ 都是强下属，PD 标在从左往右数到的第一个上——IV。vi 是把主区接到强下属的弱下属。', 'IV と ii⁶ はどちらも強い前属。PD は左から数えて最初のもの——IV。vi は主の領域を強い前属につなぐ弱い前属。', 'Both IV and ii⁶ are strong predominants; PD goes on the first, reading left to right — IV. vi is the weak predominant linking the tonic area.') },
      },
      {
        id: 'b25x-e5', type: 'page', ref: ['omt2e-tonic-v6', 'omt2e-plagal'],
        title: t('进阶 3 · 延长主和弦：在家里多待一会儿', '発展 3・主和音の延長：もう少し家にいる', 'Advanced 3 · Prolonging the tonic: staying home a little longer'),
        text: [
          t('"延长"是指一个和弦的影响持续得比它本身更久。OMT 的比喻：想慢慢享受一份冰淇淋，可以一小口一小口地吃（一直重复同一个和弦），但更有意思的是吃一点、放回冰箱、做点别的再回来——中间放别的和弦。最常见的做法：三个和弦，首尾是 I 或 I⁶，中间是 V⁶ 或倒置的 V⁷。主和弦更"强"，因为它落在更强的拍或超拍上，而且至少有一次是原位（Clara Schumann 钢琴三重奏第三乐章开头就是这样）。V⁴₃ 的低音 re 可以去 do 也可以去 mi，所以它常把 I 接到 I⁶。', '「延長」とは和音の影響がその和音自体より長く続くこと。OMT のたとえ：アイスクリームを長く楽しむなら、少しずつかじる（同じ和音を繰り返す）手もあるが、もっと面白いのは少し食べて冷凍庫に戻し、別のことをしてまた戻ること——間に別の和音を置く。いちばん多いのは 3 和音で、最初と最後が I か I⁶、真ん中が V⁶ か転回形の V⁷。主和音が「強い」のは、より強い拍・ハイパー拍にあり、少なくとも 1 回は基本形だから（クララ・シューマンのピアノ三重奏曲第 3 楽章冒頭）。V⁴₃ のバス re は do にも mi にも行けるので、よく I から I⁶ へつなぐ。', 'Prolongation means a chord’s influence lasts longer than the chord itself. OMT’s image: to enjoy ice cream for a long time you could take tiny bites (repeat the chord), but it is nicer to eat some, put it back in the freezer, do something else and return — other chords in between. Most common: three chords, I or I⁶ at both ends, V⁶ or an inverted V⁷ in the middle. The tonic stays stronger because it sits on stronger beats or hyperbeats and appears at least once in root position (as at the start of Clara Schumann’s Piano Trio, III). V⁴₃’s bass re can go to do or mi, so it often links I to I⁶.'),
          t('IV 也可以不当下属、而是延长 I：这叫 plagal（变格）进行，分析时写成 (IV)。它最常出现在两个地方：正格终止之后（亨德尔《哈利路亚》合唱结尾那样），或者乐句开头。所以 OMT 说"plagal motion"而不总说"plagal cadence"——在 18、19 世纪音乐里，(IV)–I 多半是延长，不是终止。正格终止之后写它：I 和 (IV) 都写完整、重复低音、上方声部级进或保持音，女高常停在 do。', 'IV が前属ではなく I を延長することもある：プラガル進行で、分析では (IV) と書く。多いのは 2 か所：正格終止の後（ヘンデル《ハレルヤ》合唱の終わりのように）か、フレーズの始め。だから OMT は「plagal cadence」より「plagal motion」と言う——18・19 世紀の音楽では (IV)–I の多くは延長で、終止ではない。正格終止の後に書くなら：I と (IV) を完全に、バスを重複、上声は順次か保留音、ソプラノはよく do。', 'IV can also prolong I instead of acting as predominant — plagal motion, written (IV). It appears mainly after an authentic cadence (as at the end of Handel’s “Hallelujah” Chorus) or at a phrase beginning. Hence OMT prefers “plagal motion” to “plagal cadence”: in 18th- and 19th-century music (IV)–I is usually prolongational, not cadential. After a PAC: make I and (IV) complete, double the bass, move upper voices by step or common tone, soprano usually on do.'),
        ],
      },
      {
        id: 'b25x-e6', type: 'discover', practice: true, ref: 'omt2e-plagal',
        prompt: t('一首曲子在 V⁷–I 完满终止之后，又接了 IV–I。这里的 IV 是什么作用？', '曲が V⁷–I の完全終止の後、さらに IV–I。この IV の役割は？', 'After a V⁷–I perfect cadence, a piece continues IV–I. What is that IV doing?'),
        options: [t('延长主和弦（plagal 进行），写成 (IV)', '主和音の延長（プラガル進行）、(IV) と書く', 'Prolonging the tonic (plagal motion), written (IV)'), t('强下属，预告属和弦', '強い前属、属を予告', 'A strong predominant foretelling V'), t('一个新的终止，真正的结尾', '新しい終止、本当の終わり', 'A new cadence, the real ending')],
        answer: 0,
        insight: { title: t('终止已经完成了', '終止はもう済んでいる', 'The cadence is already done'), text: t('正格终止后的 IV–I 是在主和弦上"停留"：plagal motion，不是新的终止。', '正格終止の後の IV–I は主和音に「とどまる」：plagal motion で、新しい終止ではない。', 'IV–I after an authentic cadence lingers on the tonic: plagal motion, not a new cadence.') },
      },
      {
        id: 'b25x-e7', type: 'page', ref: ['omt-pb-4chord', 'wiki-50s-progression', 'wiki-axis-progression'],
        title: t('支线 · 四和弦套路：同样四个和弦，不同顺序', '支線・4 和音の定型：同じ 4 つ、違う順番', 'Side quest · Four-chord schemas: the same four chords in different orders'),
        text: [
          t('I、IV、V、vi 大概是流行音乐里最常见的四个和弦，按不同顺序排就成了不同的套路。doo-wop：I–vi–IV–V（C–Am–F–G），名字来自 1950 年代到 60 年代初的摇滚抒情歌（Gene Chandler《Duke of Earl》），之后也一直有人用（《Friday》、Bonnie Tyler《Total Eclipse of the Heart》的副歌）；它也叫"Heart and Soul"和弦、"Stand by Me"进行、"ice cream changes"。ii 和 IV 在这里功能相同，可以用 ii 代替（Otis Redding《Try a Little Tenderness》）；循环也可以从别的和弦开始，叫"旋转"（Coldplay《Viva la Vida》的乐句从 IV 开始）。', 'I・IV・V・vi はおそらくポップスで最も多い 4 和音で、順番を変えると別の定型になる。doo-wop：I–vi–IV–V（C–Am–F–G）、名前は 1950 年代〜60 年代初めのロック・バラード（ジーン・チャンドラー《Duke of Earl》）から。その後もずっと使われる（《Friday》、ボニー・タイラー《Total Eclipse of the Heart》のサビ）。「Heart and Soul」コード、「Stand by Me」進行、「ice cream changes」とも呼ばれる。ii と IV はここで同じ機能なので ii に替えてよい（オーティス・レディング《Try a Little Tenderness》）。ループは別の和音から始めてもよく、「回転」という（コールドプレイ《Viva la Vida》は IV から）。', 'I, IV, V and vi are probably pop’s most common chords, and their orderings make distinct schemas. Doo-wop: I–vi–IV–V (C–Am–F–G), named for late-1950s and early-1960s rock ballads (Gene Chandler’s “Duke of Earl”) and used ever since (“Friday”, the chorus of Bonnie Tyler’s “Total Eclipse of the Heart”); also called the “Heart and Soul” chords, the “Stand by Me” changes, the “ice cream changes”. ii shares IV’s function here and can replace it (Otis Redding, “Try a Little Tenderness”); the loop can start elsewhere — rotation (Coldplay’s “Viva la Vida” phrases begin on IV).'),
          t('singer/songwriter：vi–IV–I–V 或 I–V–vi–IV，1990 年代中期在 Sarah McLachlan、Jewel、Joan Osborne 等创作歌手里特别常见；I–V–vi–IV 又叫 Axis 进行（因澳洲喜剧乐队 The Axis of Awesome 而得名）。从 IV 开始的 IV–I–V–vi 最后是 V–vi，有"阻碍"的味道（Lady Gaga《Alejandro》副歌）。hopscotch：IV–V–vi–I，约 2010 年以后越来越常见（Sam Smith《Dancing with a Stranger》），根音走法是"级进、级进、跳进"；小调读法 VI–VII–i–III，常把 VII 换成带导音的 V。', 'singer/songwriter：vi–IV–I–V か I–V–vi–IV、1990 年代半ばのサラ・マクラクラン、ジュエル、ジョーン・オズボーンらでとくに多い。I–V–vi–IV は Axis 進行とも（オーストラリアのコメディ・ロックバンド、アクシス・オブ・オーサムにちなむ）。IV から始める IV–I–V–vi は最後が V–vi で「偽」の味（レディー・ガガ《Alejandro》のサビ）。hopscotch：IV–V–vi–I、2010 年ごろから増えている（サム・スミス《Dancing with a Stranger》）。根音は「順次・順次・跳躍」。短調の読み VI–VII–i–III では VII を導音つきの V に替えることが多い。', 'Singer/songwriter: vi–IV–I–V or I–V–vi–IV, especially common from the mid-1990s with Sarah McLachlan, Jewel, Joan Osborne; I–V–vi–IV is also the “Axis progression”, after the Australian comedy band The Axis of Awesome. Starting on IV, IV–I–V–vi ends V–vi with a deceptive flavour (the chorus of Lady Gaga’s “Alejandro”). Hopscotch: IV–V–vi–I, increasingly common since about 2010 (Sam Smith, “Dancing with a Stranger”), roots moving step, step, skip; in minor VI–VII–i–III, VII often replaced by V with its leading tone.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: 'doo-wop', cells: ['I', 'vi', 'IV', 'V'] }, { label: 's/s', cells: ['vi', 'IV', 'I', 'V'] }, { label: 'hopscotch', cells: ['IV', 'V', 'vi', 'I'] }] },
      },
      {
        id: 'b25x-e8', type: 'discover', practice: true, ref: 'omt-pb-4chord',
        prompt: t('听：F – G – Am – C。是哪个套路？', '聴いて：F – G – Am – C。どの定型？', 'Listen: F – G – Am – C. Which schema?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: pc('F', 'G', 'Am', 'C', 'F', 'G', 'Am', 'C') }],
        options: ['hopscotch', 'doo-wop', 'singer/songwriter', t('王道进行', '王道進行', 'royal road')],
        answer: 0,
        insight: { title: t('级进、级进、跳进', '順次・順次・跳躍', 'Step, step, skip'), text: t('F–G–A 级进上行，再跳到 C：IV–V–vi–I。', 'F–G–A と順次に上がり、C へ跳ぶ：IV–V–vi–I。', 'F–G–A by step, then a skip to C: IV–V–vi–I.') },
      },
      {
        id: 'b25x-e9', type: 'page', ref: ['wiki-royal-road', 'wiki-pachelbel-canon'],
        title: t('支线 · 两个有名字的套路：王道进行与卡农进行', '支線・名前のある 2 つの定型：王道進行とカノン進行', 'Side quest · Two named schemas: the royal road and the Canon'),
        text: [
          t('王道进行（王道進行，ōdō shinkō）IVM7–V7–iii7–vi 在日本流行音乐里很常见（C 调 Fmaj7–G7–Em7–Am），vi 也常换成 vi7。"王道"在日语里指轻松省力的办法；它也叫"小恶魔和弦进行"，是音乐制作人龟田诚治 2014 年在 NHK 节目里起的名字。后面接 ii7–V7–I，整条 IVM7–V7–iii7–vi–ii7–V7–I 就是大调里一整条五度循环（V7 代替 vii°）。V7 有第三转位（G7/F，多见于华丽的流行编曲）和原位（多见于摇滚和电子乐）两种版本。', '王道進行（ōdō shinkō）IVM7–V7–iii7–vi は日本のポップスでよく使われる（ハ調 Fmaj7–G7–Em7–Am）、vi は vi7 にもよくなる。「王道」は日本語で楽な方法の意味。「小悪魔コード進行」とも呼ばれ、音楽プロデューサーの亀田誠治が 2014 年の NHK の番組で名づけた。続けて ii7–V7–I を置くと、IVM7–V7–iii7–vi–ii7–V7–I は長調の完全な 5 度圏進行になる（V7 が vii° の代わり）。V7 には第 3 転回（G7/F、豪華なポップスの編曲に多い）と基本形（ロックや電子音楽に多い）の 2 版がある。', 'The royal road progression (ōdō shinkō) IVM7–V7–iii7–vi is common in Japanese pop (in C: Fmaj7–G7–Em7–Am), often with vi7. In Japanese ōdō means an easy way to do something; it is also called the “koakuma chord progression”, a name coined by producer Seiji Kameda on an NHK show in 2014. Followed by ii7–V7–I, IVM7–V7–iii7–vi–ii7–V7–I makes a full circle of fifths in major (V7 standing in for vii°). V7 appears in third inversion (G7/F, in lush pop arrangements) or root position (mainly rock and electronic music).'),
          t('帕赫贝尔《卡农》（D 大调）是三个声部的同度卡农，下面一条固定低音反复——进行是 I–V–vi–iii–IV–I–IV–V，属于叫作 Romanesca 的模进型。它沉寂了几百年，1968 年 Jean-François Paillard 室内乐团的录音让它重新流行，这条进行后来被大量流行歌借用。', 'パッヘルベル《カノン》（ニ長調）は 3 声の同度カノンで、下に固定バスが繰り返す——進行は I–V–vi–iii–IV–I–IV–V、ロマネスカと呼ばれる反復進行の型。何世紀も忘れられていたが、1968 年のジャン＝フランソワ・パイヤール室内管弦楽団の録音で再び人気になり、この進行は多くのポップスに使われた。', 'Pachelbel’s Canon (D major) is a three-part canon at the unison over a repeating ground bass — the progression I–V–vi–iii–IV–I–IV–V, a sequential pattern known as the Romanesca. Forgotten for centuries, it became popular again after a 1968 recording by Jean-François Paillard’s chamber orchestra, and its progression has been borrowed by many pop songs.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: '4536', cells: ['IVM7', 'V7', 'iii7', 'vi'] }, { label: 'Canon', cells: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'] }] },
      },
      {
        id: 'b25x-e10', type: 'demo', ref: 'wiki-pachelbel-canon',
        title: t('听卡农进行', 'カノン進行を聴く', 'Hear the Canon progression'),
        steps: [
          { text: t('D – A – Bm – F♯m – G – D – G – A：I–V–vi–iii–IV–I–IV–V，停在 V 上，接回开头的 I 就能一直循环。', 'D – A – Bm – F♯m – G – D – G – A：I–V–vi–iii–IV–I–IV–V、V で止まり、冒頭の I に戻ってずっと回る。', 'D – A – Bm – F♯m – G – D – G – A: I–V–vi–iii–IV–I–IV–V, ending on V and looping back to I.'), audio: CANON },
        ],
      },
    ],
    experiment: [
      { id: 'b25x-x1', type: 'experiment', toy: 'progression', ref: ['omt-pb-4chord', 'wiki-royal-road'],
        prompt: t('四个槽位，点上面的套路：doo-wop、用 ii 代替 IV、singer/songwriter、阻碍旋转 IV–I–V–vi、hopscotch、王道进行。每个都听两遍：哪个最像停在"家"里？哪个最模糊？', '4 つのスロット。上の定型を押そう：doo-wop、IV を ii に、singer/songwriter、偽の回転 IV–I–V–vi、hopscotch、王道進行。2 回ずつ聴いて、いちばん「家」に止まるのは？ いちばんあいまいなのは？', 'Four slots — tap a schema above: doo-wop, ii for IV, singer/songwriter, the deceptive rotation IV–I–V–vi, hopscotch, royal road. Hear each twice: which feels most at home, which most ambiguous?'),
        params: { gap: 820, slots: [
          { options: [opt('C'), opt('Am'), opt('F'), opt('Fmaj7')] },
          { options: [opt('Am'), opt('F'), opt('G'), opt('C'), opt('G7')] },
          { options: [opt('F'), opt('Dm'), opt('C'), opt('G'), opt('Am'), opt('Em7')] },
          { options: [opt('G'), opt('Am'), opt('C'), opt('G7')] },
        ], presets: [
          { label: 'doo-wop', picks: [0, 0, 0, 0], explain: t('I–vi–IV–V：最后 V 接回 I，像 V–I。', 'I–vi–IV–V：最後の V が I に戻り、V–I のよう。', 'I–vi–IV–V: the final V returns to I, like V–I.') },
          { label: t('ii 代替 IV', 'IV を ii に', 'ii for IV'), picks: [0, 0, 1, 0], explain: t('I–vi–ii–V：ii 与 IV 功能相同。', 'I–vi–ii–V：ii と IV は同じ機能。', 'I–vi–ii–V: ii shares IV’s function.') },
          { label: 'singer/songwriter', picks: [1, 1, 2, 0], explain: t('vi–IV–I–V：没有 V–I，C 还是 Am 都说得通。', 'vi–IV–I–V：V–I がなく、C でも Am でも。', 'vi–IV–I–V: no V–I, so C or Am both work.') },
          { label: 'IV–I–V–vi', picks: [2, 3, 3, 1], explain: t('从 IV 开始的旋转，最后 V–vi 有阻碍的味道。', 'IV から始める回転、最後の V–vi に偽の味。', 'The rotation from IV, ending V–vi with a deceptive flavour.') },
          { label: 'hopscotch', picks: [2, 2, 4, 2], explain: t('IV–V–vi–I：级进、级进、跳进。', 'IV–V–vi–I：順次・順次・跳躍。', 'IV–V–vi–I: step, step, skip.') },
          { label: t('王道进行', '王道進行', 'royal road'), picks: [3, 4, 5, 1], explain: t('IVM7–V7–iii7–vi：日本流行音乐常见的 4536。', 'IVM7–V7–iii7–vi：日本のポップスでおなじみの 4536。', 'IVM7–V7–iii7–vi: J-pop’s familiar 4536.') },
        ] },
        breakthrough: { id: 'b25x-schemas', text: t('你听出来了：同样的几个和弦，顺序和起点一变，"家"的感觉就跟着变。', '同じ和音でも順番と始点で「家」の感じが変わる——聴き取れた。', 'You heard it: the same chords in a new order or starting point change where home seems to be.') } },
    ],
    challenge: [
      {
        id: 'b25x-c1', type: 'choice', error: 'wrong-function', skills: ['function'], ref: ['omt2e-predominants', 'omt2e-la-bass', 'omt2e-vii6'],
        variants: [
          { prompt: t('强下属 IV 和 ii⁶ 的低音都是哪个音级？', '強い前属 IV と ii⁶ のバスはどちらも？', 'Strong predominants IV and ii⁶ both have which degree in the bass?'), options: ['fa (4̂)', 're (2̂)', 'la (6̂)', 'sol (5̂)'] },
          { prompt: t('导音三和弦通常以什么形式出现？', '導音三和音はふつうどの形？', 'The leading-tone triad usually appears as…'), options: [t('第一转位 vii°⁶', '第 1 転回 vii°⁶', 'first inversion, vii°⁶'), t('原位 vii°', '基本形 vii°', 'root position, vii°'), t('第二转位 vii°⁶₄', '第 2 転回 vii°⁶₄', 'second inversion, vii°⁶₄')] },
          { prompt: t('V–vi 在 OMT 里叫什么？为什么？', 'OMT で V–vi は何と呼ぶ？ なぜ？', 'What does OMT call V–vi, and why?'), options: [t('阻碍进行：它避开终止', '偽進行：終止を避けるから', 'Deceptive motion: it avoids a cadence'), t('阻碍终止：它结束乐句', '偽終止：フレーズを終えるから', 'Deceptive cadence: it ends the phrase'), t('半终止', '半終止', 'A half cadence')] },
        ],
        answer: 0,
        explain: t('IV 与 ii⁶ 都配 fa；vii° 三和弦总用 vii°⁶（其他转位与低音不协和）；V–vi 避开终止，所以 OMT 叫"阻碍进行"。', 'IV と ii⁶ は fa に。vii° 三和音はいつも vii°⁶（ほかの転回はバスと不協和）。V–vi は終止を避けるので OMT は「偽進行」と呼ぶ。', 'IV and ii⁶ harmonise fa; the vii° triad is always vii°⁶ (other inversions clash with the bass); V–vi avoids a cadence, hence “deceptive motion”.'),
      },
      {
        id: 'b25x-c2', type: 'choice', error: 'wrong-function', skills: ['function'], ref: ['omt2e-phrase-model', 'omt2e-tonic-v6'],
        variants: [
          { prompt: t('一个以半终止结束的乐句，Te 标签怎么办？', '半終止で終わるフレーズの Te ラベルは？', 'For a phrase ending with a half cadence, what about the Te label?'), options: [t('省略', '省略', 'Omit it'), t('标在 V 上', 'V に付ける', 'Put it on V'), t('标在开头的 I 上', '冒頭の I に', 'Put it on the opening I')] },
          { prompt: t('I – V⁶ – I 里，主和弦为什么听起来比 V⁶ 更"强"？', 'I – V⁶ – I で主和音が V⁶ より「強い」のはなぜ？', 'In I – V⁶ – I, why does the tonic sound stronger than V⁶?'), options: [t('它在更强的拍上，而且是原位', 'より強い拍にあり、基本形だから', 'It is on stronger beats and in root position'), t('它更响', '音が大きいから', 'It is louder'), t('它有七音', '7 度があるから', 'It has a seventh')] },
          { prompt: t('分析乐句时，OMT 建议先做什么？', 'フレーズを分析するとき OMT が勧める最初の一歩は？', 'What does OMT suggest doing first when analysing a phrase?'), options: [t('听出乐句在哪里结束，分析终止', 'フレーズの終わりを聴き取り終止を分析', 'Find where the phrase ends and analyse the cadence'), t('从第一个和弦开始一个个标', '最初の和音から順にラベル', 'Label chords one by one from the start'), t('先找所有七和弦', 'まず七の和音を全部探す', 'Find all the seventh chords first')] },
        ],
        answer: 0,
        explain: t('半终止没有 Te；延长主和弦时，主和弦在强拍且至少一次原位；分析从终止往回读。', '半終止に Te はない。延長では主和音が強拍にあり、少なくとも 1 回は基本形。分析は終止から逆に読む。', 'A half cadence has no Te; in prolongations the tonic sits on strong beats and appears in root position; analyse backward from the cadence.'),
      },
      {
        id: 'b25x-c3', type: 'listen', error: 'wrong-function', skills: ['hearing'], ref: ['omt-pb-4chord', 'wiki-royal-road'],
        prompt: t('听这个循环（C 调）：它是哪个套路？', 'このループを聴こう（ハ調）：どの定型？', 'Listen to this loop (in C): which schema is it?'),
        options: ['doo-wop', 'singer/songwriter', 'hopscotch', t('王道进行', '王道進行', 'royal road')],
        variants: [
          { play: [{ label: t('播放', '再生', 'Play'), audio: pc('C', 'Am', 'F', 'G', 'C', 'Am', 'F', 'G') }], answer: 0 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: pc('Am', 'F', 'C', 'G', 'Am', 'F', 'C', 'G') }], answer: 1 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: pc('F', 'G', 'Am', 'C', 'F', 'G', 'Am', 'C') }], answer: 2 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: pc('Fmaj7', 'G7', 'Em7', 'Am', 'Fmaj7', 'G7', 'Em7', 'Am') }], answer: 3 },
        ],
        explain: t('都是 I、IV、V、vi 一类的和弦，关键听"怎么回到大主和弦"：doo-wop 是 V–I，singer/songwriter 是 IV–I，hopscotch 是 vi–I；王道进行带七和弦、停在 vi。', 'どれも I・IV・V・vi 系。「長い主和音へどう戻るか」を聴く：doo-wop は V–I、singer/songwriter は IV–I、hopscotch は vi–I。王道進行は七の和音つきで vi に止まる。', 'All use I, IV, V, vi; listen for how they return to the major tonic: doo-wop V–I, singer/songwriter IV–I, hopscotch vi–I; the royal road adds sevenths and rests on vi.'),
        breakthrough: { id: 'b25x-hear', text: t('你用耳朵分清了几个流行套路。', 'いくつかのポップスの定型を耳で聞き分けた。', 'You told pop schemas apart by ear.') },
      },
      {
        id: 'b25x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: ['wiki-royal-road', 'wiki-pachelbel-canon', 'wiki-axis-progression', 'wiki-50s-progression'],
        variants: [
          { prompt: t('王道进行接上 ii7–V7–I 以后，整条根音走的是？', '王道進行に ii7–V7–I を続けると、根音全体は？', 'The royal road followed by ii7–V7–I gives roots that…'), options: [t('一整条五度循环（V7 代替 vii°）', '完全な 5 度圏進行（V7 が vii° の代わり）', 'a full circle of fifths (V7 replacing vii°)'), t('一条半音下行', '半音の下行', 'a chromatic descent'), t('一直在 I 和 V 之间', 'I と V の往復', 'shuttle between I and V')] },
          { prompt: t('帕赫贝尔《卡农》的进行是？', 'パッヘルベル《カノン》の進行は？', 'Pachelbel’s Canon progression is…'), options: ['I–V–vi–iii–IV–I–IV–V', 'I–vi–IV–V', 'IV–V–iii–vi', 'I–V–vi–IV'] },
          { prompt: t('"Axis 进行"指的是？', '「Axis 進行」とは？', 'The “Axis progression” is…'), options: ['I–V–vi–IV', 'I–vi–IV–V', 'IV–V–vi–I', 'IV–V–iii–vi'] },
        ],
        answer: 0,
        explain: t('4536 + 251 是一整条五度循环；卡农进行 I–V–vi–iii–IV–I–IV–V（Romanesca）；Axis 是 I–V–vi–IV。', '4536 + 251 は完全な 5 度圏。カノン進行 I–V–vi–iii–IV–I–IV–V（ロマネスカ）。Axis は I–V–vi–IV。', '4536 + 251 is a full circle of fifths; the Canon is I–V–vi–iii–IV–I–IV–V (the Romanesca); Axis is I–V–vi–IV.'),
      },
      {
        id: 'b25x-c5', type: 'choice', error: 'concept', skills: ['function'], ref: 'omt-pb-4chord',
        variants: [
          { prompt: t('singer/songwriter 套路为什么常常调性模糊？', 'singer/songwriter の定型がよくあいまいなのはなぜ？', 'Why is the singer/songwriter schema often tonally ambiguous?'), options: [t('没有正格终止，只有 IV–I 或 VII–i', '正格終止がなく、IV–I か VII–i だけ', 'No authentic cadence — only IV–I or VII–i'), t('它用了增三和弦', '増三和音を使うから', 'It uses an augmented triad'), t('它没有大三和弦', '長三和音がないから', 'It has no major chords')] },
          { prompt: t('hopscotch 的小调读法里常把 VII 换成什么？', 'hopscotch の短調読みで VII をよく何に替える？', 'In hopscotch’s minor reading, VII is often replaced by…'), options: [t('带导音的 V', '導音つきの V', 'V with its leading tone'), 'iv', 'ii°', 'III+'] },
          { prompt: t('doo-wop 里 ii 为什么能代替 IV？', 'doo-wop で ii が IV の代わりになるのはなぜ？', 'Why can ii replace IV in doo-wop?'), options: [t('两者在这里功能相同（都在 V 前）', 'ここでは同じ機能（どちらも V の前）', 'They share the same function here (both before V)'), t('它们的根音相同', '根音が同じだから', 'They share a root'), t('因为 ii 是大三和弦', 'ii が長三和音だから', 'Because ii is major')] },
        ],
        answer: 0,
        explain: t('没有 V–I 就难定主和弦；hopscotch 小调读法常用 V 代替 VII；ii 与 IV 都是下属功能。', 'V–I がないと主和音が決めにくい。hopscotch の短調読みは VII の代わりに V をよく使う。ii と IV はどちらも前属機能。', 'Without V–I the tonic is hard to pin down; minor hopscotch often uses V for VII; ii and IV are both predominant.'),
      },
      G('b25x-g1', 'romanChord', 2, ['function']),
      G('b25x-g2', 'cadenceType', 1, ['function']),
    ],
  },
  pool: [G('b25x-p1', 'romanChord', 3, ['function']), G('b25x-p2', 'cadenceType', 2, ['function'])],
};

// ===================== B2-6x 终止式与四六和弦 · 扩展关 =====================
// 对应 A 面：cadences（PAC 与 IAC / 半终止与阻碍 / 变格 / 综合）、sixfour（终止四六 / 经过四六 / 辅助与琶音四六 / 综合）、
// 支线 cadences2（弗里几亚半终止 / 皮卡第三度与重音终止 / 安达卢西亚与那不勒斯六 / 爵士的终止）的进阶关
const CD = {
  F: [41, 60, 65, 69], ii6: [41, 62, 65, 69], cad64: [43, 60, 64, 72], G: [43, 59, 62, 67], G7: [43, 59, 65, 67], C: [36, 60, 64, 72], Am: [45, 60, 64, 69], CE: [40, 60, 67, 72], Ghc: [43, 59, 62, 67],
  Am_: [45, 57, 60, 64], G_: [43, 55, 59, 62], F_: [41, 57, 60, 65], E_: [40, 56, 59, 64], Dm6: [41, 50, 57, 62], Emaj: [40, 56, 59, 64], AmPic: [45, 57, 61, 64],
};
const cd = (...names) => ({ notes: names.map((n) => CD[n]), mode: 'chords' });
const cdo = (n, label) => ({ label, notes: CD[n] });
const EXT_B2_6 = {
  minutes: 24,
  insight: t('终止是乐句的标点：PAC 是句号，半终止是逗号；而"名字叫终止"的东西不一定在结尾——安达卢西亚进行一遍遍循环，plagal 进行常常只是在家里多待一会儿。', '終止はフレーズの句読点：PAC は句点、半終止は読点。でも「終止」という名前でも終わりにあるとは限らない——アンダルシア進行は何度も回り、プラガル進行はしばしば家に少し長くいるだけ。', 'Cadences are a phrase’s punctuation: a PAC is a full stop, a half cadence a comma. Yet things called “cadences” are not always endings — the Andalusian cadence loops over and over, and plagal motion often just lingers at home.'),
  sections: {
    discover: [
      {
        id: 'b26x-d1', type: 'discover', ref: 'omt2e-cad64',
        prompt: t('C 大调：ii⁶ – ？ – V – I。问号处的和弦是 G–C–E（低音 G，上面 C 和 E），音和 I⁶₄ 一模一样。它在这里是主和弦吗？', 'ハ長調：ii⁶ – ？ – V – I。？の和音は G–C–E（バス G、上に C と E）で、I⁶₄ と同じ音。ここで主和音？', 'C major: ii⁶ – ? – V – I. The chord at ? is G–C–E (bass G, with C and E), the same notes as I⁶₄. Is it a tonic chord here?'),
        play: [{ label: 'ii⁶ – ? – V – I', audio: cd('ii6', 'cad64', 'G', 'C') }],
        options: [t('不是：它是 V 的装饰，标成 cad.⁶₄ 和 V 一起看', '違う：V の装飾で、cad.⁶₄ として V と一緒に見る', 'No: it decorates V — label it cad.⁶₄ together with V'), t('是：音一样就是主和弦', 'そう：音が同じなら主和音', 'Yes: same notes, same tonic chord'), t('是一个新的下属和弦', '新しい前属の和音', 'A new predominant chord')],
        answer: 0,
        insight: {
          title: t('看声音，不只看拼法', '綴りだけでなく響きを見る', 'Hear the sound, not just the spelling'),
          text: t('低音 sol 上方的六度和四度其实是两个装饰音（经过音、延留音），它们会落到五度和三度，变成 V。所以把它标成 cad.⁶₄、和 V 当成一个单位。如果标成 I⁶₄，就等于说"下属走到了主"——可耳朵听到的是低音 sol 上的属在被拉长；I⁶₄ 只反映了拼法，cad.⁶₄ 反映了声音。', 'バス sol の上の 6 度と 4 度は 2 つの装飾音（経過音・掛留音）で、5 度と 3 度に落ちて V になる。だから cad.⁶₄ と書き、V と 1 単位で扱う。I⁶₄ と書くと「前属が主に進んだ」ことになるが、耳に聞こえるのはバス sol 上の属が引き延ばされる響き。I⁶₄ は綴りだけ、cad.⁶₄ は響きを表す。', 'The sixth and fourth above sol are two embellishing tones (a passing tone and a suspension) that fall to the fifth and third, becoming V. So it is labelled cad.⁶₄, one unit with V. Calling it I⁶₄ would claim a predominant moved to tonic — but the ear hears the dominant on sol being stretched; I⁶₄ reflects the spelling only, cad.⁶₄ the sound.'),
        },
      },
    ],
    explain: [
      {
        id: 'b26x-e1', type: 'page', ref: ['omt2e-cadences', 'wiki-cadence'],
        title: t('进阶 1 · PAC、三种 IAC，和"躲开的终止"', '発展 1・PAC、3 種の IAC、「避けられた終止」', 'Advanced 1 · PAC, three kinds of IAC, and the evaded cadence'),
        text: [
          t('终止像文章里的标点：它告诉你乐句在哪里结束，也帮忙确立调，所以分析时先听终止点往往是好的第一步。正格终止 V–I：两个条件都满足——主和弦上女高是 do，V 和 I 都是原位——就是完满正格终止（PAC）；少一个条件就是不完满正格终止（IAC）。', '終止は文章の句読点：フレーズの終わりを示し、調の確立も助ける。だから分析ではまず終止点を聴くのがよい第一歩。正格終止 V–I：2 条件——主和音でソプラノが do、V と I がともに基本形——を満たせば完全正格終止（PAC）、1 つでも欠ければ不完全正格終止（IAC）。', 'Cadences work like punctuation: they show where phrases end and help establish the key, so listening for cadence points is a good first step in analysis. Authentic V–I: with both conditions — do in the soprano over tonic, and both chords in root position — it is a perfect authentic cadence (PAC); missing either makes it imperfect (IAC).'),
          t('IAC 可以分三种：原位 IAC（和弦都是原位，但最高声部不是主音）；转位 IAC（一个或两个和弦转位）；导音 IAC（用 vii° 代替 V）。William Caplin、Janet Schmalfeldt、Hepokoski 与 Darcy 等较新的理论把后两种算作"不是终止"。其中一种叫躲避终止：V⁴₂ 接 I⁶——七音必须下行到 I 的三音，只能落到不太稳的第一转位，正好"躲开"了原位 I。', 'IAC は 3 種類：基本形 IAC（どちらも基本形だが最上声が主音でない）、転回 IAC（片方か両方が転回形）、導音 IAC（V の代わりに vii°）。ウィリアム・カプリン、ジャネット・シュマルフェルト、ヘポコスキとダーシーなど新しい理論は、後の 2 つを「終止ではない」とする。その一つが回避終止：V⁴₂ から I⁶——第 7 音は I の第 3 音へ下行しなければならず、不安定な第 1 転回に着くので、基本形の I を「避ける」。', 'IACs come in three kinds: root-position IAC (both in root position, but the top voice is not the tonic); inverted IAC (one or both chords inverted); leading-tone IAC (vii° replacing V). Newer theories — William Caplin, Janet Schmalfeldt, Hepokoski and Darcy — count the last two as non-cadential. One such case is the evaded cadence: V⁴₂ to I⁶ — the seventh must fall to I’s third, landing on the less stable first inversion and “evading” root-position I.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes: [{ p: 'D5', d: 'h', s: 0, col: 0 }, { p: 'C5', d: 'h', s: 0, col: 1, label: 'PAC' }, { p: 'G2', d: 'h', s: 1, col: 0 }, { p: 'C3', d: 'h', s: 1, col: 1 }, { p: 'D5', d: 'h', s: 0, col: 2 }, { p: 'E5', d: 'h', s: 0, col: 3, label: 'IAC' }, { p: 'G2', d: 'h', s: 1, col: 2 }, { p: 'C3', d: 'h', s: 1, col: 3 }], cols: 4 },
      },
      {
        id: 'b26x-e2', type: 'discover', practice: true, ref: 'wiki-cadence',
        prompt: t('V⁴₂ 接 I⁶（七音 F 下行到 E）。这叫什么？', 'V⁴₂ から I⁶（第 7 音 F が E へ）。これは？', 'V⁴₂ to I⁶ (the seventh F falling to E). What is this called?'),
        options: [t('躲避终止（一种转位 IAC）', '回避終止（転回 IAC の一種）', 'An evaded cadence (a kind of inverted IAC)'), t('完满正格终止', '完全正格終止', 'A perfect authentic cadence'), t('半终止', '半終止', 'A half cadence')],
        answer: 0,
        insight: { title: t('七音逼它落到 I⁶', '第 7 音が I⁶ へ導く', 'The seventh forces I⁶'), text: t('低音的七音必须下行到 I 的三音，于是只能接 I⁶，"躲开"了原位 I；较新的理论把它算作非终止。', 'バスの第 7 音は I の第 3 音へ下りるしかなく、I⁶ になって基本形 I を「避ける」。新しい理論では非終止とされる。', 'The bass seventh must fall to I’s third, giving I⁶ and evading root-position I; newer theories class it as non-cadential.') },
      },
      {
        id: 'b26x-e3', type: 'page', ref: 'wiki-cadence',
        title: t('进阶 2、3 · 半终止、弗里几亚半终止、变格终止', '発展 2・3・半終止、フリギア半終止、プラガル終止', 'Advanced 2–3 · Half, Phrygian half and plagal cadences'),
        text: [
          t('半终止（也叫"不完全终止"）停在 V 上，听起来没完成、悬着，是需要继续的弱终止。其中一种叫弗里几亚半终止：小调里的 iv⁶–V。低音从第六级到第五级的半音（A 小调 F → E），很像 15 世纪弗里几亚调式终止里 ii–I 的半音，所以得名；它是文艺复兴调式和声留下来的，听起来很古老，前面接 v（v–iv⁶–V）时更明显——巴赫众赞歌《Schau, lieber Gott, wie meine Feind》里就有。', '半終止（「不完全終止」とも）は V で止まり、未完で宙に浮いて聞こえる、続きを求める弱い終止。その一つがフリギア半終止：短調の iv⁶–V。バスの第 6 音から第 5 音への半音（イ短調 F → E）が 15 世紀のフリギア旋法の終止の ii–I の半音に似ているのが名の由来。ルネサンスの旋法和声の名残で古風に聞こえ、前に v があると（v–iv⁶–V）なおさら——バッハのコラール《Schau, lieber Gott, wie meine Feind》にある。', 'A half cadence (also “imperfect cadence”) stops on V, sounding unfinished — a weak cadence calling for continuation. One kind is the Phrygian half cadence, iv⁶–V in minor: the bass half step from degree 6 to 5 (F → E in A minor) resembles the half step of ii–I in the 15th-century Phrygian cadence. A survival of modal Renaissance harmony, it sounds archaic, especially after v (v–iv⁶–V) — as in Bach’s chorale “Schau, lieber Gott, wie meine Feind”.'),
          t('变格终止 IV–I 常常配上赞美诗结尾的"阿门"，所以也叫"阿门终止"。不过 William Caplin 质疑古典时期是否真有变格终止，认为它到 19 世纪才开始出现——这和 OMT 把 (IV)–I 多半看作"延长"的说法一致。还有罕见的"变格半终止" I–IV，像正格终止一样是四度上行，通常在前乐句结尾（《Auld Lang Syne》）；勃拉姆斯单簧管三重奏 Op. 114 第一乐章甚至用它结束整个呈示部。', 'プラガル終止 IV–I は賛美歌の終わりの「アーメン」によく付けられるので「アーメン終止」とも。ただしウィリアム・カプリンは古典派に本当のプラガル終止があるか疑い、19 世紀から現れるとする——OMT が (IV)–I の多くを「延長」とみるのと一致する。まれな「プラガル半終止」I–IV もあり、正格終止と同じく 4 度上行、ふつう前楽句の終わり（《Auld Lang Syne》）。ブラームスのクラリネット三重奏曲 Op. 114 第 1 楽章では提示部全体をこれで終える。', 'The plagal cadence IV–I is often set to a hymn’s closing “Amen” — hence “Amen cadence”. William Caplin, though, doubts that plagal cadences exist in the Classical era, seeing them emerge in the 19th century — consistent with OMT treating (IV)–I mostly as prolongation. The rare plagal half cadence I–IV, an ascending fourth like an authentic cadence, usually ends an antecedent (“Auld Lang Syne”); Brahms’s Clarinet Trio Op. 114 even closes its first-movement exposition with one.'),
        ],
      },
      {
        id: 'b26x-e4', type: 'discover', practice: true, ref: 'wiki-cadence',
        prompt: t('听（A 小调）：Dm/F → E。低音怎么走？这是什么终止？', '聴いて（イ短調）：Dm/F → E。バスは？ 何の終止？', 'Listen (A minor): Dm/F → E. How does the bass move, and what cadence is it?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: cd('Dm6', 'Emaj') }],
        options: [t('F → E 下行半音：弗里几亚半终止', 'F → E の半音下行：フリギア半終止', 'F → E down a half step: a Phrygian half cadence'), t('D → E：正格终止', 'D → E：正格終止', 'D → E: an authentic cadence'), t('F → E：阻碍进行', 'F → E：偽進行', 'F → E: a deceptive motion')],
        answer: 0,
        insight: { title: t('第六级 → 第五级', '第 6 音 → 第 5 音', 'Degree 6 → degree 5'), text: t('iv⁶（低音 F）接 V（E G♯ B）：停在 V 上，是半终止；低音的半音让它带着古老的弗里几亚味道。', 'iv⁶（バス F）から V（E G♯ B）：V で止まるので半終止。バスの半音が古いフリギアの味を出す。', 'iv⁶ (bass F) to V (E G♯ B): it stops on V — a half cadence — and the bass half step gives its old Phrygian flavour.') },
      },
      {
        id: 'b26x-e5', type: 'page', ref: 'omt2e-cad64',
        title: t('进阶 4 · 终止四六：拼法与解决', '発展 4・終止の四六：綴りと解決', 'Advanced 4 · The cadential six-four: spelling and resolution'),
        text: [
          t('拼终止四六的三步：① 低音写 sol；② 找出低音上方的六度和四度，一个放在女高；③ 内声部一个重复低音（这是避免平行所必需的），另一个放剩下的那个音。它虽然常出现在终止处，其实也能出现在乐句任何地方，装饰 V(7)。', '終止の四六の綴り 3 ステップ：① バスに sol。② バスの上の 6 度と 4 度を求め、1 つをソプラノに。③ 内声の 1 つはバスを重複（平行を避けるために必要）、もう 1 つは残りの音。終止によく出るが、フレーズのどこでも V(7) の装飾として現れうる。', 'Three steps to spell it: ① sol in the bass; ② find the sixth and fourth above it, putting one in the soprano; ③ in the inner voices one doubles the bass (necessary to avoid parallels) and the other takes the remaining note. Though common at cadences, it can embellish V(7) anywhere in a phrase.'),
          t('解决按数字走：低音上方六度的那个声部落到五度，四度的那个声部落到三度。如果要接 V⁷，重复低音的那个声部就下行一步成为七音（8–7）。任何通向 V 的和弦都能通向终止四六，最常见的是强下属 IV 和 ii⁶。', '解決は数字どおり：6 度の声部は 5 度へ、4 度の声部は 3 度へ。V⁷ へ進むなら、バスを重複していた声部が 1 歩下りて第 7 音に（8–7）。V へ進む和音なら何でも終止の四六へ進めるが、最も多いのは強い前属 IV と ii⁶。', 'Resolve by the figures: the voice a sixth above the bass falls to the fifth, the voice a fourth above falls to the third. For V⁷, the voice doubling the bass steps down to the seventh (8–7). Any chord that approaches V can approach the cadential six-four, most often the strong predominants IV and ii⁶.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes: [{ p: 'E5', d: 'h', s: 0, col: 0, label: '6' }, { p: 'C5', d: 'h', s: 0, col: 0 }, { p: 'D5', d: 'h', s: 0, col: 1, label: '5' }, { p: 'B4', d: 'h', s: 0, col: 1 }, { p: 'G3', d: 'h', s: 1, col: 0 }, { p: 'G2', d: 'h', s: 1, col: 0 }, { p: 'F3', d: 'h', s: 1, col: 1, label: '7' }, { p: 'G2', d: 'h', s: 1, col: 1 }], cols: 2 },
      },
      {
        id: 'b26x-e6', type: 'page', ref: 'omt2e-64-chords',
        title: t('进阶 5、6 · 另外三种四六和弦：经过、辅助、琶音', '発展 5・6・ほかの 3 つの四六：経過・補助・分散', 'Advanced 5–6 · Three more six-fours: passing, neighbour, arpeggiating'),
        text: [
          t('经过四六：低音的经过音上配一个四六和弦，两边的和弦功能一定相同（例如 I – V⁶₄ – I⁶），最常延长主或下属，也可以倒过来用。写法：先写低音的三个级进音（首尾属于同一功能区），中间的经过音上找六度和四度、内声部重复低音，女高要走级进的线，内声部尽量少动。', '経過の四六：バスの経過音に四六の和音を付ける。両側の和音は必ず同じ機能（例 I – V⁶₄ – I⁶）、主か前属の延長が多く、逆向きにも使える。書き方：まずバスの 3 つの順次音（最初と最後が同じ機能領域）、真ん中の経過音の上に 6 度と 4 度、内声でバスを重複、ソプラノは順次に動く線、内声はなるべく動かさない。', 'Passing six-four: a chord on a passing bass note, always between chords of the same function (e.g. I – V⁶₄ – I⁶), mostly prolonging tonic or predominant, and it works backwards too. To write: three stepwise bass notes (first and last in the same functional area), sixth and fourth over the middle one with the bass doubled, a stepwise soprano, inner voices moving as little as possible.'),
          t('辅助四六（又叫 pedal 四六）：低音不动，上方两个声部做上邻音；两边都是原位和弦，常延长 I 或 V，女高常常是一条不动的线。琶音四六：低音跳到五音、上方声部保持着和弦——例如结尾的低音分解、圆舞曲式伴奏；它可以延长任何和声，分析时一般不必标出来。', '補助の四六（ペダルの四六とも）：バスは動かず、上の 2 声が上隣音の動き。両側はどちらも基本形で、I か V の延長が多く、ソプラノは動かない線のことが多い。分散の四六：バスが第 5 音へ跳び、上声は和音を保つ——曲尾のバスの分散やワルツ風の伴奏など。どの和声も延長でき、分析でふつう表記しない。', 'Neighbour (or pedal) six-four: a static bass under upper-neighbour motion in two voices; both sides root position, usually prolonging I or V, the soprano often static. Arpeggiating six-four: the bass leaps to the fifth while the upper voices sustain the chord — in closing bass arpeggiations or waltz accompaniments; it can prolong any harmony and usually needs no label.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: 'pass.', cells: ['C', 'D', 'E'] }, { label: 'n.', cells: ['C', 'C', 'C'] }, { label: 'arp.', cells: ['C', 'G', 'C'] }] },
      },
      {
        id: 'b26x-e7', type: 'discover', practice: true, ref: 'omt2e-64-chords',
        prompt: t('低音 G – G – G，中间那个和弦是 G–C–E，两边是 V。这是哪种四六？', 'バス G – G – G、真ん中の和音は G–C–E、両側は V。どの四六？', 'Bass G – G – G; the middle chord is G–C–E, with V on both sides. Which six-four?'),
        options: [t('辅助（pedal）四六，延长 V', '補助（ペダル）の四六、V の延長', 'Neighbour (pedal) six-four prolonging V'), t('终止四六', '終止の四六', 'Cadential six-four'), t('经过四六', '経過の四六', 'Passing six-four')],
        answer: 0,
        insight: { title: t('低音不动 = 辅助', 'バスが動かない = 補助', 'A static bass means neighbour'), text: t('C、E 是 B、D 的上邻音，低音一直是 G：辅助四六，两边原位 V。', 'C・E は B・D の上隣音、バスはずっと G：補助の四六、両側は基本形の V。', 'C and E are upper neighbours of B and D over a constant G: a neighbour six-four between root-position Vs.') },
      },
      {
        id: 'b26x-e8', type: 'page', ref: 'wiki-cadence',
        title: t('支线 · 皮卡第三度、重音终止与兰迪尼终止', '支線・ピカルディの 3 度、アクセント終止、ランディーニ終止', 'Side quest · Picardy third, accented endings and the Landini cadence'),
        text: [
          t('皮卡第三度（皮卡第终止）是文艺复兴时期出现的手法：调式或小调的段落，最后用大三和弦的主和弦收尾，例如巴赫《Jesu, meine Freude》第 12–13 小节。A 小调结尾不是 A C E，而是 A C♯ E。', 'ピカルディの 3 度（ピカルディ終止）はルネサンスに生まれた手法：旋法や短調の部分を長三和音の主和音で終える。バッハ《Jesu, meine Freude》第 12–13 小節など。イ短調なら最後は A C E ではなく A C♯ E。', 'The Picardy third (Picardy cadence), born in the Renaissance, ends a modal or minor passage on a major tonic chord — e.g. Bach’s “Jesu, meine Freude”, mm. 12–13. In A minor the last chord is not A C E but A C♯ E.'),
          t('终止也看节拍位置：最后的和弦落在强拍是"重音终止"，延后到弱拍（例如经过一个长倚音）是"非重音终止"，前者通常更强、结构上更重要。过去有人把它们叫"阳性 / 阴性"终止，但至少从 1980 年代中期起这对说法就不再普遍使用；Susan McClary 在《Feminine Endings》里讨论过乐理术语中的性别问题。更早的兰迪尼终止（14 世纪到 15 世纪初，因作曲家 Francesco Landini 大量使用而得名）在上声部用一个逃逸音，先缩成纯五度再到八度。', '終止は拍の位置でも見る：最後の和音が強拍なら「アクセントのある終止」、弱拍に遅れる（長い倚音の後など）なら「アクセントのない終止」で、前者がふつう強く構造上重要。昔は「男性・女性」終止と呼ぶこともあったが、少なくとも 1980 年代半ば以降はあまり使われない。スーザン・マクラリーは『Feminine Endings』で音楽理論用語の性の問題を論じた。さらに古いランディーニ終止（14 世紀〜15 世紀初め、作曲家フランチェスコ・ランディーニが多用）は上声に逸音を置き、いったん完全 5 度に狭めてから 8 度へ。', 'Metre matters too: a final chord on a strong beat is a metrically accented cadence; delayed to a weak beat (say after a long appoggiatura) it is unaccented — the former usually stronger and more structural. These were once called “masculine” and “feminine” cadences, terms not generally used since at least the mid-1980s; Susan McClary discusses music theory’s gendered terms in Feminine Endings. The older Landini cadence (14th to early 15th century, after the composer Francesco Landini, who used it profusely) has an escape tone in the upper voice that briefly narrows the interval to a fifth before the octave.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['E4', 'G#4', 'B4'], 0), ...col(['A4', 'C5', 'E5'], 1), ...col(['A4', 'C#5', 'E5'], 2, { lit: true })], cols: 3 },
      },
      {
        id: 'b26x-e9', type: 'page', ref: ['wiki-andalusian-cadence', 'thinkspace-cadences', 'omt2e-neapolitan'],
        title: t('支线 · 安达卢西亚进行与那不勒斯六', '支線・アンダルシア進行とナポリの六', 'Side quest · The Andalusian cadence and the Neapolitan sixth'),
        text: [
          t('安达卢西亚"终止"是从弗拉门戈借来的说法：四个和弦级进下行，按 Phrygian 看是 iv–III–II–I，按 Aeolian（小调）看是 i–♭VII–♭VI–V（A 小调 Am–G–F–E，最后的 E 和弦里 G♯ 是导音），也叫"小调下行四音音列"，可以追溯到文艺复兴。名字里有"终止"，但它很少只在结尾出现一次，最常用作一遍遍反复的固定音型——Del Shannon《Runaway》就是这样。', 'アンダルシア「終止」はフラメンコから借りた言い方：4 和音が順次下行、フリギアで見れば iv–III–II–I、エオリア（短調）で見れば i–♭VII–♭VI–V（イ短調 Am–G–F–E、最後の E の和音の G♯ は導音）。「短調の下行テトラコード」とも呼ばれ、ルネサンスまでさかのぼれる。名前に「終止」とあるが、終わりに 1 回だけ出ることは少なく、たいてい繰り返されるオスティナート——デル・シャノン《Runaway》もそう。', 'The Andalusian “cadence” is a term borrowed from flamenco: four chords descending by step — iv–III–II–I seen from Phrygian, i–♭VII–♭VI–V from Aeolian (A minor: Am–G–F–E, with G♯ the leading tone in the E chord) — also called the minor descending tetrachord, traceable to the Renaissance. Despite the name it rarely occurs just once at an ending; it is mostly a repeating ostinato, as in Del Shannon’s “Runaway”.'),
          t('那不勒斯六（♭II⁶）是 ra（降二级）上的大三和弦，通常第一转位，是半音化的下属；ra 下行解决到 ti。它常走 ♭II⁶–V，或者中间插一个 vii°⁷/V，把推向属和弦的力量加强（肖邦 F 小调夜曲 Op. 55 No. 1 有例子）。正格终止前面先有那不勒斯六，旧称"悲怆终止"——pathetic 在这里是"感人、凄切"的意思，像贝多芬《悲怆》奏鸣曲的"悲怆"。', 'ナポリの六（♭II⁶）は ra（下げた第 2 音）上の長三和音で、ふつう第 1 転回、半音階的な前属。ra は ti へ下りて解決する。♭II⁶–V か、間に vii°⁷/V をはさんで属への押しを強める（ショパンのヘ短調ノクターン Op. 55 No. 1 に例）。正格終止の前にナポリの六がくるものは古く「悲愴終止」と呼ばれた——pathetic はここで「感動的、悲痛な」の意味で、ベートーヴェンの《悲愴》ソナタの「悲愴」と同じ。', 'The Neapolitan sixth (♭II⁶) is a major triad on ra (lowered 2), usually in first inversion — a chromatic predominant; ra resolves down to ti. It typically goes ♭II⁶–V, or inserts vii°⁷/V to intensify the push to the dominant (as in Chopin’s Nocturne in F minor, Op. 55 No. 1). An authentic cadence preceded by a Neapolitan sixth was once called a “pathetic cadence” — pathetic meaning moving or poignant, as in Beethoven’s “Pathétique” Sonata.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'bass' }], notes: ['A2', 'G2', 'F2', 'E2'].map((p, i) => ({ p, d: 'h', col: i, label: ['i', '♭VII', '♭VI', 'V'][i] })), cols: 4 },
      },
      {
        id: 'b26x-e10', type: 'discover', practice: true, ref: 'wiki-andalusian-cadence',
        prompt: t('听：Am – G – F – E 反复两遍。它最常被怎样使用？', '聴いて：Am – G – F – E を 2 回。いちばん多い使われ方は？', 'Listen: Am – G – F – E twice. How is it most often used?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: cd('Am_', 'G_', 'F_', 'E_', 'Am_', 'G_', 'F_', 'E_') }],
        options: [t('反复循环的固定音型', '繰り返すオスティナート', 'As a repeating ostinato'), t('只在全曲最后出现一次', '曲の最後に 1 回だけ', 'Only once at the very end'), t('作为转调的过渡', '転調の経過として', 'As a modulating link')],
        answer: 0,
        insight: { title: t('名字叫终止，其实在绕圈', '名前は終止、実は回っている', 'Called a cadence, really a loop'), text: t('真正的终止只在乐句结尾出现一次；安达卢西亚进行通常一遍遍循环（Del Shannon《Runaway》）。', '本当の終止はフレーズの終わりに 1 回だけ。アンダルシア進行はたいてい繰り返し回る（デル・シャノン《Runaway》）。', 'A true cadence appears once at a phrase end; the Andalusian cadence usually loops (Del Shannon’s “Runaway”).') },
      },
      {
        id: 'b26x-e11', type: 'page', ref: ['omt2e-iivi', 'wiki-cadence'],
        title: t('支线 · 爵士里的终止：ii–V–I 与 turnaround', '支線・ジャズの終止：ii–V–I とターンアラウンド', 'Side quest · Cadences in jazz: ii–V–I and turnarounds'),
        text: [
          t('爵士里的终止一般也就叫终止。最重要的是 ii–V–I：根音五度进行，加上一串固定的和弦性质——大调 m7–7–maj7（Dm7–G7–Cmaj7），小调 ø7–7–m7；V 不管大调小调都是大三（属七）。《Afternoon in Paris》《All the Things You Are》《My Funny Valentine》《Joy Spring》的最后终止都是 ii–V–I。', 'ジャズの終止もふつう単に終止と呼ぶ。最も重要なのは ii–V–I：根音の 5 度進行と決まった和音の種類の並び——長調 m7–7–maj7（Dm7–G7–Cmaj7）、短調 ø7–7–m7。V は長調でも短調でも長三（属七）。《Afternoon in Paris》《All the Things You Are》《My Funny Valentine》《Joy Spring》の最後の終止はどれも ii–V–I。', 'In jazz cadences are usually just called cadences. The key one is ii–V–I: roots by fifth plus a fixed series of qualities — major m7–7–maj7 (Dm7–G7–Cmaj7), minor ø7–7–m7; V is major (dominant seventh) either way. “Afternoon in Paris”, “All the Things You Are”, “My Funny Valentine” and “Joy Spring” all end with ii–V–I.'),
          t('有一类终止叫 turnaround（原名 turnback，更准确）：它把音乐带回曲式里已经出现过的段落。AABA 曲式里有两个 turnback：第一个 A 结尾（为了重复 A），以及 B 段结尾（为了第三次奏 A）；从第二个 A 到 B 不算，因为 B 是第一次出现。半音终止在爵士里常见到快成陈词滥调，例如上行的减七半音终止：副属减七夹在相隔大二度的两个和弦之间（C – C♯°7 – Dm7）。', 'ターンアラウンド（もとは turnback、こちらのほうが正確）という終止がある：曲の形式の中で既に出た部分へ戻す。AABA 形式には 2 つ：最初の A の終わり（A を繰り返すため）と B の終わり（3 回目の A のため）。2 つ目の A から B は数えない、B は初めて出るから。半音の終止はジャズでよくあり、ほとんど決まり文句——たとえば上行の減七半音終止：長 2 度離れた 2 つの和音のあいだに副減七をはさむ（C – C♯°7 – Dm7）。', 'One category is the turnaround (originally “turnback”, more accurate): a cadence returning to a section already heard. AABA has two: at the end of the first A (to repeat it) and at the end of B (for the third A); A2 to B does not count, as B is new. Half-step cadences are common to the point of cliché in jazz — e.g. the ascending diminished-seventh half-step cadence, an applied diminished seventh between two chords a major second apart (C – C♯°7 – Dm7).'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('大调', '長調', 'major'), cells: ['iim7', 'V7', 'Imaj7'] }, { label: t('小调', '短調', 'minor'), cells: ['iiø7', 'V7', 'im7'] }] },
      },
      {
        id: 'b26x-e12', type: 'discover', practice: true, ref: 'wiki-cadence',
        prompt: t('AABA 曲式里，哪两处是 turnaround（turnback）？', 'AABA 形式でターンアラウンドはどの 2 か所？', 'In AABA form, where are the two turnarounds?'),
        options: [t('第一个 A 的结尾和 B 段的结尾', '最初の A の終わりと B の終わり', 'End of the first A and end of B'), t('第二个 A 的结尾和最后', '2 つ目の A の終わりと最後', 'End of the second A and the very end'), t('每个 A 的开头', '各 A の始め', 'The start of every A')],
        answer: 0,
        insight: { title: t('"转回去"', '「戻る」', '“Turning back”'), text: t('A1 结尾转回 A2，B 结尾转回 A3；A2 到 B 不算，因为 B 是第一次出现。', 'A1 の終わりで A2 へ、B の終わりで A3 へ。A2 から B は数えない、B は初めて出るから。', 'End of A1 turns back to A2; end of B turns back to A3; A2 to B does not count since B is new.') },
      },
    ],
    experiment: [
      { id: 'b26x-x1', type: 'experiment', toy: 'progression', ref: ['omt2e-cad64', 'omt2e-cadences', 'omt2e-la-bass'],
        prompt: t('造一个终止：下属 → （终止四六）→ 属 → 结尾。试试上面的预设：带终止四六的 PAC、加 8–7 的 V⁷、半终止、阻碍进行、转位 IAC。听结尾的"标点"怎么变。', '終止をつくろう：前属 →（終止の四六）→ 属 → 終わり。上のプリセット：終止の四六つき PAC、8–7 の V⁷、半終止、偽進行、転回 IAC。終わりの「句読点」がどう変わるか聴こう。', 'Build a cadence: predominant → (cadential six-four) → dominant → ending. Try the presets: PAC with a cadential six-four, V⁷ via 8–7, half cadence, deceptive motion, inverted IAC. Hear how the closing punctuation changes.'),
        params: { gap: 820, slots: [
          { options: [cdo('ii6', 'ii⁶'), cdo('F', 'IV')] },
          { options: [cdo('cad64', 'cad.⁶₄'), cdo('G', 'V')] },
          { options: [cdo('G', 'V'), cdo('G7', 'V⁷'), cdo('Ghc', t('V（停住）', 'V（止める）', 'V (stop)'))] },
          { options: [cdo('C', 'I'), cdo('Am', 'vi'), cdo('CE', 'I⁶'), cdo('Ghc', t('（不走，停在 V）', '（V のまま）', '(stay on V)'))] },
        ], presets: [
          { label: t('PAC + 终止四六', 'PAC + 終止の四六', 'PAC with cad.⁶₄'), picks: [0, 0, 0, 0], explain: t('ii⁶ – cad.⁶₄ – V – I：六度落五度、四度落三度，原位 V–I、女高到 do。', 'ii⁶ – cad.⁶₄ – V – I：6 度は 5 度へ、4 度は 3 度へ、基本形 V–I、ソプラノは do へ。', 'ii⁶ – cad.⁶₄ – V – I: sixth to fifth, fourth to third, root-position V–I with do on top.') },
          { label: t('8–7 到 V⁷', '8–7 で V⁷', '8–7 into V⁷'), picks: [1, 0, 1, 0], explain: t('IV – cad.⁶₄ – V⁷ – I：重复低音的声部下行成七音。', 'IV – cad.⁶₄ – V⁷ – I：バスを重複した声部が下りて第 7 音に。', 'IV – cad.⁶₄ – V⁷ – I: the voice doubling the bass steps down to the seventh.') },
          { label: t('半终止', '半終止', 'Half cadence'), picks: [0, 0, 2, 3], explain: t('停在 V 上：像逗号，等待下文。', 'V で止まる：読点のように続きを待つ。', 'Stopping on V: a comma waiting for more.') },
          { label: t('阻碍进行', '偽進行', 'Deceptive motion'), picks: [1, 1, 1, 1], explain: t('V⁷ – vi：躲开终止，乐句还得继续。', 'V⁷ – vi：終止を避け、フレーズは続く。', 'V⁷ – vi: the cadence is dodged and the phrase must go on.') },
          { label: t('转位 IAC', '転回 IAC', 'Inverted IAC'), picks: [0, 1, 1, 2], explain: t('结尾是 I⁶：有正格的味道，但不是 PAC。', '最後が I⁶：正格の味はあるが PAC ではない。', 'Ending on I⁶: authentic in flavour, but not a PAC.') },
        ] },
        breakthrough: { id: 'b26x-punct', text: t('你自己造出了句号、逗号和"被骗"的结尾。', '句点・読点・「だまされた」終わりを自分でつくった。', 'You built a full stop, a comma and a deceptive ending yourself.') } },
    ],
    challenge: [
      {
        id: 'b26x-c1', type: 'choice', error: 'cadence-type', skills: ['identify'], ref: ['omt2e-cadences', 'wiki-cadence'],
        variants: [
          { prompt: t('V – I 都是原位，但主和弦上女高是 mi。这是？', 'V – I ともに基本形、でも主和音でソプラノは mi。これは？', 'V – I both in root position, but mi in the soprano over I. This is…'), options: [t('原位 IAC', '基本形 IAC', 'A root-position IAC'), 'PAC', t('半终止', '半終止', 'A half cadence'), t('躲避终止', '回避終止', 'An evaded cadence')] },
          { prompt: t('vii°⁶ – I（女高到 do）。这是？', 'vii°⁶ – I（ソプラノ do）。これは？', 'vii°⁶ – I (do in the soprano). This is…'), options: [t('导音 IAC', '導音 IAC', 'A leading-tone IAC'), 'PAC', t('变格终止', 'プラガル終止', 'A plagal cadence'), t('弗里几亚半终止', 'フリギア半終止', 'A Phrygian half cadence')] },
          { prompt: t('I – IV 在前乐句结尾（像《Auld Lang Syne》）。这是？', '前楽句の終わりの I – IV（《Auld Lang Syne》のように）。これは？', 'I – IV ending an antecedent (as in “Auld Lang Syne”). This is…'), options: [t('变格半终止', 'プラガル半終止', 'A plagal half cadence'), t('变格终止', 'プラガル終止', 'A plagal cadence'), 'PAC', t('阻碍进行', '偽進行', 'A deceptive motion')] },
        ],
        answer: 0,
        explain: t('PAC 要原位 + 女高 do；原位但女高不是 do 是原位 IAC；用 vii° 是导音 IAC；I–IV 结束前乐句是罕见的变格半终止。', 'PAC は基本形 + ソプラノ do。基本形でソプラノが do でなければ基本形 IAC。vii° なら導音 IAC。前楽句を終える I–IV はまれなプラガル半終止。', 'A PAC needs root position and do on top; root position without do is a root-position IAC; vii° makes a leading-tone IAC; I–IV ending an antecedent is the rare plagal half cadence.'),
      },
      {
        id: 'b26x-c2', type: 'choice', error: 'wrong-function', skills: ['function'], ref: ['omt2e-cad64', 'omt2e-64-chords'],
        variants: [
          { prompt: t('终止四六里，重复低音的声部接 V⁷ 时怎么走？', '終止の四六でバスを重複した声部は V⁷ へどう進む？', 'In a cadential six-four, the voice doubling the bass moves into V⁷ how?'), options: [t('下行一步成为七音（8–7）', '1 歩下りて第 7 音に（8–7）', 'Down a step to the seventh (8–7)'), t('上行到九音', '上の 9 度へ', 'Up to the ninth'), t('保持不动', 'そのまま', 'It stays')] },
          { prompt: t('为什么终止四六不标成 I⁶₄？', 'なぜ終止の四六を I⁶₄ と書かない？', 'Why is the cadential six-four not labelled I⁶₄?'), options: [t('它是 V 的装饰；标 I 会暗示下属走到主', 'V の装飾で、I と書くと前属が主へ進んだことになるから', 'It decorates V; labelling it I would imply predominant to tonic'), t('因为它没有三音', '3 度がないから', 'It has no third'), t('因为低音是 do', 'バスが do だから', 'Its bass is do')] },
          { prompt: t('经过四六两边的和弦有什么特点？', '経過の四六の両側の和音の特徴は？', 'What is true of the chords around a passing six-four?'), options: [t('功能相同', '同じ機能', 'They share the same function'), t('一定是 V 和 I', '必ず V と I', 'They are always V and I'), t('都是第二转位', 'どちらも第 2 転回', 'Both are second inversion')] },
        ],
        answer: 0,
        explain: t('cad.⁶₄ 是 V 的装饰，8–7 接 V⁷；经过四六两边功能相同。', 'cad.⁶₄ は V の装飾、8–7 で V⁷ へ。経過の四六の両側は同じ機能。', 'cad.⁶₄ decorates V and moves 8–7 into V⁷; a passing six-four sits between chords of the same function.'),
      },
      {
        id: 'b26x-c3', type: 'listen', error: 'cadence-type', skills: ['hearing'], ref: ['omt2e-cadences', 'omt2e-la-bass', 'wiki-cadence'],
        prompt: t('听结尾：这是什么终止？', '終わりを聴こう：何の終止？', 'Listen to the ending: which cadence is it?'),
        options: ['PAC', t('半终止', '半終止', 'Half cadence'), t('阻碍进行', '偽進行', 'Deceptive motion'), t('弗里几亚半终止', 'フリギア半終止', 'Phrygian half cadence')],
        variants: [
          { play: [{ label: t('播放', '再生', 'Play'), audio: cd('ii6', 'cad64', 'G', 'C') }], answer: 0 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: cd('C', 'F', 'Ghc') }], answer: 1 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: cd('F', 'G7', 'Am') }], answer: 2 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: cd('Am_', 'Dm6', 'Emaj') }], answer: 3 },
        ],
        explain: t('V–I 原位到 do 是 PAC；停在 V 是半终止；V–vi 是阻碍进行；小调 iv⁶–V（低音半音下行）是弗里几亚半终止。', '基本形 V–I で do へなら PAC、V で止まれば半終止、V–vi は偽進行、短調 iv⁶–V（バス半音下行）はフリギア半終止。', 'Root-position V–I to do is a PAC; stopping on V is a half cadence; V–vi is deceptive motion; minor iv⁶–V with a half-step bass is a Phrygian half cadence.'),
        breakthrough: { id: 'b26x-hear', text: t('你用耳朵分出了四种结尾。', '4 種類の終わりを耳で聞き分けた。', 'You told four endings apart by ear.') },
      },
      {
        id: 'b26x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: ['wiki-cadence', 'wiki-andalusian-cadence', 'thinkspace-cadences'],
        variants: [
          { prompt: t('"阳性 / 阴性终止"今天更常说成？', '「男性・女性終止」は今ふつう何と言う？', '“Masculine / feminine” cadences are now usually called…'), options: [t('重音 / 非重音终止', 'アクセントのある・ない終止', 'Metrically accented / unaccented cadences'), t('完满 / 不完满终止', '完全・不完全終止', 'Perfect / imperfect cadences'), t('正格 / 变格终止', '正格・プラガル終止', 'Authentic / plagal cadences')] },
          { prompt: t('安达卢西亚进行在 A 小调里的级数是？', 'アンダルシア進行のイ短調での度数は？', 'The Andalusian cadence in A minor is…'), options: ['i–♭VII–♭VI–V', 'i–iv–V–i', 'i–♭VI–♭III–♭VII', 'iv⁶–V'] },
          { prompt: t('"悲怆终止"指的是？', '「悲愴終止」とは？', 'The “pathetic cadence” is…'), options: [t('那不勒斯六之后的正格终止', 'ナポリの六の後の正格終止', 'An authentic cadence preceded by a Neapolitan sixth'), t('小调的变格终止', '短調のプラガル終止', 'A minor plagal cadence'), t('停在 vi 上的终止', 'vi で止まる終止', 'A cadence ending on vi')] },
        ],
        answer: 0,
        explain: t('"阳性 / 阴性"自 1980 年代中期起不再普遍使用；安达卢西亚 = i–♭VII–♭VI–V；悲怆终止 = N⁶ + 正格终止（旧称）。', '「男性・女性」は 1980 年代半ば以降あまり使われない。アンダルシア = i–♭VII–♭VI–V。悲愴終止 = N⁶ + 正格終止（古い呼び名）。', '“Masculine / feminine” fell out of general use by the mid-1980s; Andalusian = i–♭VII–♭VI–V; pathetic cadence = N⁶ + authentic cadence (an old term).'),
      },
      {
        id: 'b26x-c5', type: 'choice', error: 'concept', skills: ['function'], ref: ['omt2e-iivi', 'omt2e-neapolitan', 'wiki-cadence'],
        variants: [
          { prompt: t('小调 ii–V–I 的和弦性质是？', '短調の ii–V–I の和音の種類は？', 'The qualities of a minor-key ii–V–I are…'), options: ['ø7 – 7 – m7', 'm7 – 7 – maj7', 'm7 – m7 – m7', '°7 – 7 – m7'] },
          { prompt: t('那不勒斯六的 ra 往哪里解决？', 'ナポリの六の ra はどこへ解決？', 'Where does the Neapolitan’s ra resolve?'), options: [t('下行到 ti', '下行して ti', 'Down to ti'), t('上行到 re', '上行して re', 'Up to re'), t('保持到 V', 'V まで保持', 'It holds into V')] },
          { prompt: t('C – C♯°7 – Dm7 里的减七和弦在做什么？', 'C – C♯°7 – Dm7 の減七は何をしている？', 'What is the diminished seventh doing in C – C♯°7 – Dm7?'), options: [t('在相隔大二度的两个和弦之间半音推进', '長 2 度離れた 2 和音のあいだを半音で押し進める', 'Pushing by half step between two chords a major second apart'), t('代替主和弦', '主和音の代わり', 'Standing in for the tonic'), t('作为终止四六', '終止の四六として', 'Acting as a cadential six-four')] },
        ],
        answer: 0,
        explain: t('小调 ii–V–I：ø7–7–m7（V 总是大三）；ra 下行到 ti；C♯°7 是 Dm7 的副属减七，低音半音上行。', '短調 ii–V–I：ø7–7–m7（V はいつも長三）。ra は ti へ下りる。C♯°7 は Dm7 への副減七で、バスが半音上行。', 'Minor ii–V–I: ø7–7–m7 (V always major); ra falls to ti; C♯°7 is an applied diminished seventh to Dm7, the bass rising by half step.'),
      },
      G('b26x-g1', 'cadenceType', 2, ['function']),
      G('b26x-g2', 'neapolitan', 1, ['spell']),
    ],
  },
  pool: [G('b26x-p1', 'cadenceType', 3, ['function']), G('b26x-p2', 'neapolitan', 2, ['spell']), G('b26x-p3', 'iiVI', 2, ['function'])],
};

// ===================== B2-7x 乐句、乐段与曲式分析 · 扩展关 =====================
// 对应 A 面：form（回旋 / 动机与层级 / 乐句结尾 / 综合）、forms（句子式 / 二部 / 三部 / 奏鸣曲式）、支线 motif（模进 / 倒影与逆行 / 扩大紧缩移位 / 装饰与碎片化）、
// 支线 phrase2（展开部分 / 内部扩充 / 外部扩充 / 听出 A 与 A′）的进阶关
const MOTIF = [[60, 1], [62, 1], [64, 1], [60, 1], [null, 4]];
const mel = (ps, d = 'q') => ps.map((p, i) => ({ p, d, col: i }));
const EXT_B2_7 = {
  minutes: 25,
  insight: t('曲式是一层套一层的"分组"：最小的动机会被变形、组成乐思，乐思组成乐句，乐句再组成二部、三部、奏鸣曲——分析时先找终止，从结尾往回分。', '形式は入れ子の「まとまり」：最小の動機が変形されて楽想に、楽想がフレーズに、フレーズが二部・三部・ソナタに——分析はまず終止を見つけ、終わりから分ける。', 'Form is nested grouping: the smallest motive is transformed into ideas, ideas into phrases, phrases into binary, ternary and sonata forms — analyse by finding cadences first and dividing back from the endings.'),
  sections: {
    discover: [
      {
        id: 'b27x-d1', type: 'discover', ref: ['omt2e-form-concepts', 'wiki-motif'],
        prompt: t('分析贝多芬第五交响曲开头时，有人把前 13 小节整个框起来叫"动机"。这样对吗？', 'ベートーヴェンの第 5 交響曲の冒頭を分析して、最初の 13 小節全体を「動機」と囲んだ人がいる。正しい？', 'Analysing the opening of Beethoven’s Fifth, someone boxes the first 13 bars as “the motive”. Is that right?'),
        play: [{ label: t('四音动机', '4 音の動機', 'The four-note motive'), audio: { notes: [67, 67, 67, 63], mode: 'melody' } }],
        options: [t('不对：动机很短，开头那四个音才是动机，它会反复、被变形', '違う：動機は短い。冒頭の 4 音が動機で、繰り返され変形される', 'No: motives are short — the opening four notes are the motive, recurring and transformed'), t('对：越长越能代表全曲', '正しい：長いほど曲全体を表す', 'Yes: the longer, the more representative'), t('对：一个主题就是一个动机', '正しい：主題 = 動機', 'Yes: a theme is a motive')],
        answer: 0,
        insight: {
          title: t('最小的、有主题身份的单位', '主題としての同一性をもつ最小単位', 'The smallest unit with thematic identity'),
          text: t('动机是"具有主题身份的最小结构单位"，通常比乐思还小。第一次做动机分析的人常选得太大——一整个主题。贝多芬第五交响曲的四音动机被旋律和和声上不断延伸，构成第一乐章的主部主题；西贝柳斯《芬兰颂》开头的动机甚至只有两个音。', '動機は「主題としての同一性をもつ最小の構造単位」で、ふつう楽想より小さい。初めて動機分析をする人はよく大きすぎるもの——主題全体——を選ぶ。ベートーヴェンの第 5 交響曲の 4 音の動機は旋律的・和声的に広げられ第 1 楽章の第 1 主題になる。シベリウス《フィンランディア》冒頭の動機はわずか 2 音。', 'A motive is “the smallest structural unit possessing thematic identity”, usually smaller than an idea. First-timers often pick something too big — a whole theme. Beethoven’s four-note motive is extended melodically and harmonically into the first movement’s main theme; the opening motive of Sibelius’s Finlandia has just two notes.'),
        },
      },
    ],
    explain: [
      {
        id: 'b27x-e1', type: 'page', ref: ['omt2e-form-concepts', 'wiki-motif'],
        title: t('支线 · 动机的七种变形', '支線・動機の 7 つの変形', 'Side quest · Seven transformations of a motive'),
        text: [
          t('"动机"通常指音高动机，也有节奏动机、轮廓动机、音色动机。它在曲子里反复出现时常常会变：扩大（时值变长）、紧缩（时值变短）、倒影（方向反过来）、移位（换到不同的拍位）、逆行（倒着唱）、音程变化（例如小二度变大二度）、加装饰（在基本形状上加装饰音）。', '「動機」はふつう音高の動機を指すが、リズム・輪郭・音色の動機もある。曲の中で繰り返されるうちによく変わる：拡大（音価を長く）、縮小（短く）、反行（方向を逆に）、転位（拍の位置をずらす）、逆行（後ろから）、音程の変化（短 2 度を長 2 度にするなど）、装飾（基本形に装飾音を加える）。', '“Motive” usually means a pitch motive, though rhythmic, contour and timbral motives exist. As it recurs it changes: enlargement (longer values), contraction (shorter), inversion (direction flipped), displacement (a new metric position), retrograde (backwards), intervallic manipulation (e.g. a minor second becoming major), embellishment (ornaments added to the basic shape).'),
          t('和某个人物、地点或观念联系在一起的动机叫主导动机（leitmotif）或固定乐思（idée fixe）。动机分析时只圈那些反复出现、被变形的动机，它们才最值得谈。', '人物・場所・観念と結びついた動機はライトモティーフ（leitmotif）または固定楽想（idée fixe）。動機分析では繰り返され変形される動機だけを囲む——それがいちばん語る価値がある。', 'A motive tied to a person, place or idea is a leitmotif or idée fixe. In motivic analysis, circle the motives that recur and are transformed — they are the ones worth talking about.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...mel(['C4', 'D4', 'E4']), { p: 'C4', d: 'q', col: 3, label: t('倒影', '反行', 'inv.') }, { p: 'B3', d: 'q', col: 4 }, { p: 'A3', d: 'q', col: 5 }, { p: 'E4', d: 'q', col: 6, label: t('逆行', '逆行', 'retro.') }, { p: 'D4', d: 'q', col: 7 }, { p: 'C4', d: 'q', col: 8 }], cols: 9 },
      },
      {
        id: 'b27x-e2', type: 'discover', practice: true, ref: 'omt2e-form-concepts',
        prompt: t('动机 C–D–E 晚半拍出现，音高、时值都没变。这是哪种变形？', '動機 C–D–E が半拍遅れて現れ、音高も音価も同じ。どの変形？', 'The motive C–D–E reappears half a beat later, pitches and values unchanged. Which transformation?'),
        options: [t('移位', '転位', 'Displacement'), t('紧缩', '縮小', 'Contraction'), t('逆行', '逆行', 'Retrograde')],
        answer: 0,
        insight: { title: t('只换了拍位', '拍の位置だけ', 'Only the metric position'), text: t('移位改变的是动机和拍子的关系，重音因此落在别处。', '転位は動機と拍の関係を変え、アクセントが別の所に来る。', 'Displacement changes the motive’s relation to the beat, moving the accents.') },
      },
      {
        id: 'b27x-e3', type: 'page', ref: ['wiki-sequence', 'omt2e-phrase'],
        title: t('支线 · 模进：真模进与调内模进', '支線・反復進行（ゼクエンツ）：真正と調的', 'Side quest · Sequences: real and tonal'),
        text: [
          t('模进是在同一个声部里，把一个动机（或更长的段落）移到更高或更低的地方再说一遍——18、19 世纪最常见、最简单的发展手法之一。典型的模进：两段，很少超过三四段；方向一致（一直往上或一直往下）；每段之间距离相同。旋律和和声可以只有一方在模进。', '反復進行は、同じ声部で動機（またはもっと長い部分）を高く・低く移して言い直すこと——18・19 世紀で最も多く、最も簡単な展開手法のひとつ。典型は：2 回、3〜4 回を超えることはまれ、方向が一定（ずっと上か下）、間隔が同じ。旋律と和声のどちらかだけが反復進行することもある。', 'A sequence restates a motive (or longer passage) higher or lower in the same voice — one of the commonest, simplest ways to elaborate a melody in 18th- and 19th-century music. Typically two segments, rarely more than three or four, moving one way, at a constant distance. Melody or harmony can sequence without the other.'),
          t('真模进的后几段是第一段的精确移位；调内模进按音阶移位，度数不变、大小随音阶改变（C–D–E 在 C 大调上移一级是 D–E–F，E–F 变成了小二度）。巴赫《双小提琴协奏曲》第一乐章第 22–24 小节两种都有。在句子式里，模进是"展开"部分的特征之一。', '真正の反復進行は後の段が最初の段の正確な移高。調的反復進行は音階に沿って移し、度数は同じで大きさは音階で変わる（C–D–E をハ長調で 1 段上げると D–E–F、E–F は短 2 度に）。バッハ《2 つのヴァイオリンのための協奏曲》第 1 楽章第 22–24 小節には両方がある。文型（センテンス）では、反復進行は「展開」部分の特徴のひとつ。', 'In a real sequence later segments are exact transpositions; in a tonal sequence they follow the scale, keeping interval sizes but not qualities (C–D–E up a step in C major is D–E–F, E–F now a minor second). Bach’s Concerto for Two Violins, first movement bars 22–24, has both. In a sentence, sequence is one trait of the continuation.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...mel(['C4', 'D4', 'E4', 'D4', 'E4', 'F4', 'E4', 'F4', 'G4'])], cols: 9 },
      },
      {
        id: 'b27x-e3p', type: 'discover', practice: true, ref: 'wiki-sequence',
        prompt: t('C–D–E 往上移到 D–E–F♯（每段完全一样：全音、全音）。这是什么模进？', 'C–D–E を D–E–F♯ へ（どちらも全音・全音でまったく同じ）。どの反復進行？', 'C–D–E moved up to D–E–F♯ (both whole step, whole step). Which kind of sequence?'),
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: mel(['C4', 'D4', 'E4', 'D4', 'E4', 'F#4']), cols: 6 },
        options: [t('真模进（精确移位）', '真正の反復進行（正確な移高）', 'A real sequence (exact transposition)'), t('调内模进', '調的反復進行', 'A tonal sequence'), t('不算模进', '反復進行ではない', 'Not a sequence')],
        answer: 0,
        insight: { title: t('音程大小也一样', '音程の大きさまで同じ', 'Even the interval sizes match'), text: t('每段都是全音 + 全音：精确移位 = 真模进；如果留在 C 大调写成 D–E–F，就是调内模进。', 'どちらも全音 + 全音：正確な移高 = 真正。ハ長調に留まって D–E–F なら調的。', 'Whole step + whole step both times: exact transposition = real sequence; staying in C as D–E–F would be tonal.') },
      },
      {
        id: 'b27x-e4', type: 'page', ref: 'omt2e-form-concepts',
        title: t('进阶 · 曲式的层级与分段分析', '発展・形式の階層と分節分析', 'Advanced · The hierarchy of form and segmentation analysis'),
        text: [
          t('一种理解曲式的方式是层层分组：乐曲包含乐章，乐章包含段落，段落包含主题，主题包含乐句……最小的是动机。实际上层级有时会合并，例如一个乐句就构成整个段落，所以这张层级图是指南，不是死规定。', '形式は階層的なまとまりと考えられる：曲は楽章を、楽章は部分を、部分は主題を、主題はフレーズを含み……最小は動機。実際には階層が重なることもあり（1 フレーズで部分全体になるなど）、この図は目安であって固い決まりではない。', 'One way to see form is as nested groups: a piece contains movements, movements sections, sections themes, themes phrases… down to the motive. In practice levels sometimes collapse — a single phrase may be a whole section — so treat the hierarchy as a guide, not a rule.'),
          t('乐句是一个"相对完整"的意思：有开头、中间和结尾，朝目标前进并到达收束——在调性音乐里多半靠终止式。做分段分析：先找乐句的结尾（常是终止），再在谱的上方用方括号把乐句分成更小的乐思（常是两小节，也可长可短）。表示乐思和次乐句用方括号，乐句及以上（必须以终止结束的）用弧线。注意：不是每个停顿或每个 V–I 都是终止。', 'フレーズは「比較的完結した」考え：始め・中・終わりがあり、目標へ向かって収束する——調性音楽ではたいてい終止形による。分節分析：まずフレーズの終わり（よく終止）を見つけ、譜面の上に角括弧でより小さな楽想（よく 2 小節、長短あり）に分ける。楽想と小フレーズは角括弧、フレーズ以上（終止で終わるもの）は弧。注意：すべての休止や V–I が終止ではない。', 'A phrase is a relatively complete thought with beginning, middle and end, moving toward closure — in tonal music usually a cadence. For segmentation analysis: find phrase endings (often cadences), then use square brackets above the staff to divide phrases into ideas (often two bars, sometimes longer or shorter). Brackets for ideas and subphrases, arcs for phrases and above (anything that must end with a cadence). Beware: not every pause or V–I is a cadence.'),
        ],
        visual: { kind: 'blocks', rows: [{ cells: [t('乐曲', '曲', 'piece'), t('乐章', '楽章', 'movement'), t('段落', '部分', 'section'), t('主题', '主題', 'theme'), t('乐句', 'フレーズ', 'phrase'), t('乐思', '楽想', 'idea'), t('动机', '動機', 'motive')] }] },
      },
      {
        id: 'b27x-e5', type: 'page', ref: 'omt2e-phrase',
        title: t('进阶 · 句子式与乐段，以及"独特的乐句结构"', '発展・文型と楽節、そして「独自のフレーズ構造」', 'Advanced · Sentences, periods and unique phrase forms'),
        text: [
          t('句子式是一种特殊的乐句：呈示（基本乐思 + 它的重复，常 4 小节；重复可以有变化，轮廓相同就听成重复）+ 展开（常和呈示一样长或更长，很少更短）。展开有四个特征：碎片化（单位变短——只指长度，不管旋律内容）、节奏更密、模进、和声节奏加快；不一定四个都有，没有碎片化时可以把整段标成一个"单位"。只要有呈示和展开，就算"句子式的"。', '文型（センテンス）は特別なフレーズ：提示（基本楽想 + その反復、よく 4 小節。反復は変化してもよく、輪郭が同じなら反復に聞こえる）+ 継続（よく提示と同じ長さかそれ以上、短いことはまれ）。継続の 4 つの特徴：断片化（単位が短くなる——長さのことで旋律内容ではない）、リズムの活発化、反復進行、和声リズムの加速。4 つ全部とは限らず、断片化がなければ全体を 1 つの「単位」と表記できる。提示と継続があれば「文型的」。', 'A sentence is a special phrase: presentation (basic idea plus its repetition, often four bars; the repetition may vary — same contour reads as repetition) + continuation (usually as long as the presentation or longer, rarely shorter). Continuations show fragmentation (shorter units — length only, not content), more rhythmic activity, sequence, faster harmonic rhythm; not all four need appear, and without fragmentation the whole can be labelled a “unit”. Presentation plus continuation is enough to be sentential.'),
          t('乐段由两个乐句组成：前句（基本乐思 + 对比乐思，常以半终止结束，像"提问"）和后句（通常从相同的基本乐思开始，以更强的终止——常是 PAC——"回答"；对比乐思几乎总和前句不同）。乐段可以留在一个调，也可以转调，转调通常在后句。两个句子式按前后句排起来叫复乐段；把一个乐句写出来再重复一遍（不是用反复记号）叫重复乐句。别忘了：不属于任何原型的"独特"乐句结构和原型一样常见。', '楽節は 2 つのフレーズ：前楽句（基本楽想 + 対照楽想、よく半終止で終わり「問い」）と後楽句（ふつう同じ基本楽想で始まり、より強い終止——よく PAC——で「答える」。対照楽想はほぼ必ず前楽句と違う）。楽節は 1 つの調に留まることも転調することもあり、転調はふつう後楽句で。2 つの文型が前後楽句の関係にあれば複楽節。フレーズを書き出してもう一度繰り返す（反復記号ではなく）のが反復フレーズ。原型に属さない「独自の」構造も原型と同じくらいよくある。', 'A period has two phrases: an antecedent (basic idea + contrasting idea, usually ending on a half cadence — a “question”) and a consequent (usually starting with the same basic idea and answering with a stronger cadence, often a PAC; its contrasting idea almost always differs). A period may stay in one key or modulate, usually in the consequent. Two sentences as antecedent and consequent make a compound period; a phrase written out again (not via repeat signs) is a repeated phrase. Unique phrase forms are just as common as these archetypes.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('句子式', '文型', 'sentence'), cells: ['b.i.', 'b.i.', t('展开', '継続', 'continuation')] }, { label: t('乐段', '楽節', 'period'), cells: ['b.i. + c.i. → HC', 'b.i. + c.i.′ → PAC'] }] },
      },
      {
        id: 'b27x-e6', type: 'discover', practice: true, ref: 'omt2e-phrase',
        prompt: t('一个乐句：两小节基本乐思、再来一次（略有装饰），然后一小节一小节的碎片、和弦换得更快，最后半终止。这是？', 'フレーズ：2 小節の基本楽想とその反復（少し装飾）、続いて 1 小節ずつの断片、和音の交替が速くなり、最後は半終止。これは？', 'A phrase: a two-bar basic idea, repeated with slight embellishment, then one-bar fragments with faster chord changes, ending on a half cadence. This is…'),
        options: [t('句子式（以半终止结束也可以）', '文型（半終止で終わってもよい）', 'A sentence (it may end on a half cadence)'), t('乐段的前句', '楽節の前楽句', 'A period’s antecedent'), t('重复乐句', '反復フレーズ', 'A repeated phrase')],
        answer: 0,
        insight: { title: t('呈示 + 展开', '提示 + 継続', 'Presentation + continuation'), text: t('基本乐思与它的重复是呈示，碎片化、和声节奏加快是展开；展开可以走向任何一种终止。', '基本楽想とその反復が提示、断片化と和声リズムの加速が継続。継続はどの終止にも向かえる。', 'Basic idea plus repetition is the presentation; fragmentation and faster harmonic rhythm make the continuation, which may head to any cadence.') },
      },
      {
        id: 'b27x-e7', type: 'page', ref: 'omt2e-phrase-expansion',
        title: t('支线 · 比预期长或短：扩充与紧缩', '支線・予想より長い・短い：拡大と縮小', 'Side quest · Longer or shorter than expected: expansion and contraction'),
        text: [
          t('"预期长度"来自原型、来自能预料到的终止位置，或者来自同一个乐句先后出现的两个版本。内部扩充发生在乐句开始之后、终止之前：重复（只有意料之外的重复才算——呈示里的重复不算）、拉长（和声或旋律持续得比预期久）、"再来一次"（Janet Schmalfeldt 1989 年提出：尝试终止 → 终止被回避 → 再试一次，常像"倒回去"）、另辟路径（绕道 detour 会回到之前的材料再终止，改道 reroute 不回来）。这些手法常常一起用。', '「予想される長さ」は原型、予想できる終止の位置、あるいは同じフレーズの 2 つの版から来る。内部の拡大はフレーズの開始後・終止前：反復（予想外の反復だけ——提示の反復は数えない）、引き延ばし（和声や旋律が予想より長く続く）、「もう一度」（ジャネット・シュマルフェルトが 1989 年に提唱：終止を試みる → 回避される → もう一度、よく「巻き戻し」のように）、別の道（迂回 detour は前の素材に戻ってから終止、経路変更 reroute は戻らない）。これらはよく組み合わされる。', '“Expected length” comes from an archetype, a predictable cadence point, or two versions of the same phrase. Internal expansion happens after the start and before the cadence: repetition (only unexpected repetition counts — not the presentation’s), stretching (a harmony or melody lasting longer than expected), the one-more-time technique (Janet Schmalfeldt, 1989: attempt a cadence → evade it → try again, often like “backing up”), alternative paths (a detour returns to earlier material before cadencing; a reroute does not). They are often combined.'),
          t('外部扩充在乐句之外：前缀在开头之前（例如引子），后缀在终止之后（终止后的补充、小尾声、尾声）。紧缩相反，让乐句比预期短，而且总发生在乐句内部。门德尔松《赫布里底群岛》序曲就有一个"绕道"：展开部分被重复，听起来"跑偏"了一下才又回到正轨。', '外部の拡大はフレーズの外：接頭部は始まりの前（序奏など）、接尾部は終止の後（終止後の延長、コデッタ、コーダ）。縮小は逆にフレーズを予想より短くし、必ずフレーズの内部で起こる。メンデルスゾーン《ヘブリディーズ諸島》序曲には「迂回」がある：継続部が繰り返され、少し「脱線」してから軌道に戻る。', 'External expansions sit outside the phrase: prefixes before it (an introduction), suffixes after the cadence (post-cadential extensions, codettas, codas). Contraction does the opposite — a shorter phrase — and always happens inside it. Mendelssohn’s Hebrides Overture has a detour: the continuation is repeated, veering off track before returning.'),
        ],
        visual: { kind: 'blocks', rows: [{ cells: [t('前缀', '接頭', 'prefix'), t('乐句（内部扩充 / 紧缩）', 'フレーズ（内部の拡大・縮小）', 'phrase (internal expansion / contraction)'), t('后缀', '接尾', 'suffix')] }] },
      },
      {
        id: 'b27x-e8', type: 'discover', practice: true, ref: 'omt2e-phrase-expansion',
        prompt: t('音乐走到终止前，本该落到 I 却被回避了，然后用同样的终止材料又试一次，这次成功。这是？', '終止で I に着くはずが回避され、同じ終止の素材でもう一度試して今度は成功。これは？', 'The music heads for a cadence, the expected I is evaded, then the same cadential material tries again and succeeds. This is…'),
        options: [t('"再来一次"（one-more-time）', '「もう一度」（one-more-time）', 'The one-more-time technique'), t('后缀', '接尾部', 'A suffix'), t('紧缩', '縮小', 'A contraction')],
        answer: 0,
        insight: { title: t('尝试 → 回避 → 再试', '試す → 回避 → 再挑戦', 'Try → evade → retry'), text: t('Schmalfeldt 的 one-more-time：终止被回避后用同样的材料再来，像倒回去重演一遍；它是内部扩充。', 'シュマルフェルトの one-more-time：回避された後に同じ素材でもう一度、巻き戻して再演するように。内部の拡大。', 'Schmalfeldt’s one-more-time: after the evasion the same material returns as if backing up — an internal expansion.') },
      },
      {
        id: 'b27x-e9', type: 'page', ref: ['omt2e-binary', 'omt2e-ternary'],
        title: t('进阶 · 二部与三部：反复、再现、平衡', '発展・二部と三部：反復・再現・均衡', 'Advanced · Binary and ternary: repeats, return, balance'),
        text: [
          t('二部曲式有两大部分，各自通常反复，所以叫"反复段"；它在 17–19 世纪很常见，舞曲用得尤其多，常常嵌在更大的复合曲式里。17、18 世纪通常写反复记号，反复时期待演奏者即兴加装饰；19 世纪更常把反复写出来。再现二部：第二反复段中间某处，开头的 A 在主调回来（可以只回来开头），之前常有半终止（莫扎特第 25 交响曲的小步舞曲）；单纯二部没有实质的回归。"平衡"指第一反复段的结尾在第二反复段结尾回来（在主调），而且要有一个开始逐小节对应的"交汇点"——斯卡拉蒂 K. 322 回来的材料将近 24 小节。', '二部形式は 2 つの大きな部分からなり、それぞれふつう反復されるので「反復部」と呼ぶ。17〜19 世紀によく使われ、とくに舞曲で多く、より大きな複合形式に埋め込まれることも多い。17・18 世紀はふつう反復記号で書き、反復では即興の装飾が期待された。19 世紀は反復を書き出すことが増えた。再現二部：第 2 反復部の途中で冒頭の A が主調で戻る（冒頭だけでもよい）、その前によく半終止（モーツァルト交響曲第 25 番のメヌエット）。単純二部には実質的な回帰がない。「均衡」は第 1 反復部の終わりが第 2 反復部の終わりに（主調で）戻ることで、小節単位で対応し始める「交点」が必要——スカルラッティ K. 322 では戻る素材が 24 小節近い。', 'Binary form has two parts, usually each repeated — hence “reprises”; common in the 17th–19th centuries, especially in dances, and often embedded in larger compound forms. 17th- and 18th-century scores usually use repeat signs, with improvised decoration expected on the repeat; 19th-century composers more often wrote repeats out. Rounded binary: the opening of A returns in the home key somewhere in the second reprise (only its beginning need return), often after a half cadence (the Menuetto of Mozart’s Symphony No. 25); simple binary has no substantial return. “Balanced” means the tail of the first reprise returns, in the home key, at the tail of the second, with a crux point where bar-for-bar mapping begins — in Scarlatti’s K. 322 nearly 24 bars return.'),
          t('三部曲式 ABA：A、B 各自可以反复，但 A 和 B 不会一起反复；ABC 一般叫通谱体。B 在调性、调式、织体、拍号、节奏、旋律、音域、配器等方面形成对比，长度大致与 A 成比例；小步舞曲与三声中部里 A、B 一样稳定，咏叹调里的 B 往往更不稳定。某个段落本身就是完整曲式（常是再现二部）时，叫复合三部曲式。', '三部形式 ABA：A と B はそれぞれ反復できるが、A と B が一緒に反復されることはない。ABC はふつう通作形式。B は調・旋法・テクスチュア・拍子・リズム・旋律・音域・楽器などで対照をつくり、長さはおおよそ A に比例。メヌエットとトリオでは A と B が同じくらい安定し、アリアでは B のほうが不安定なことが多い。ある部分自体が完全な形式（よく再現二部）なら複合三部形式。', 'Ternary ABA: A and B may each repeat, but never together; ABC is usually called through-composed. B contrasts in key, mode, texture, metre, rhythm, melody, range or instrumentation, with a length roughly proportional to A; in minuet and trio A and B are similarly stable, while in arias B is often less stable. When a section is itself a complete form (often rounded binary), the ternary is compound.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('再现二部', '再現二部', 'rounded'), cells: ['‖: A :‖', '‖: B  A′ :‖'] }, { label: t('三部', '三部', 'ternary'), cells: ['‖: A :‖', '‖: B :‖', '‖: A′ :‖'] }] },
      },
      {
        id: 'b27x-e10', type: 'discover', practice: true, ref: 'omt2e-binary',
        prompt: t('二部曲式的第二反复段，只有最后几小节逐小节对应第一反复段的结尾（移到主调），开头的 A 没有回来。这是？', '二部形式の第 2 反復部で、最後の数小節だけが第 1 反復部の終わりと小節ごとに対応し（主調で）、冒頭の A は戻らない。これは？', 'In a binary form’s second reprise only the last few bars map bar-for-bar onto the end of the first reprise (now in the home key); the opening A never returns. This is…'),
        options: [t('带平衡的单纯二部', '均衡のある単純二部', 'Simple binary with a balanced aspect'), t('再现二部', '再現二部', 'Rounded binary'), t('三部曲式', '三部形式', 'Ternary form')],
        answer: 0,
        insight: { title: t('结尾回来 ≠ 开头回来', '終わりの回帰 ≠ 始めの回帰', 'Ending returns ≠ opening returns'), text: t('开头没回来 → 单纯二部；第一段的结尾在第二段结尾回来 → 带"平衡"。', '冒頭が戻らない → 単純二部。第 1 部の終わりが第 2 部の終わりに戻る → 「均衡」つき。', 'No opening return → simple binary; the first reprise’s ending returning at the second’s end → balanced.') },
      },
      {
        id: 'b27x-e11', type: 'page', ref: ['omt2e-sonata', 'omt-rondo'],
        title: t('进阶 · 奏鸣曲式与回旋曲的细节', '発展・ソナタ形式とロンドの細部', 'Advanced · Details of sonata and rondo forms'),
        text: [
          t('奏鸣曲式可以看成一个和声上开放、带再现、也带平衡的二部曲式：第一反复段是呈示部，第二反复段包括发展部和再现部。呈示部：主部主题 P（主调，以主调终止结束）→ 过渡 TR（以"中间停顿"medial caesura 结束）→ 副部主题 S（不在主调：大调多为 V，小调多为 III 或 v，以"呈示部关键终止"结束）→ 结束部 C（一大段后缀）。四段里只有 TR 不稳定。过渡分依附型（材料来自 P，常像 P 又说一遍再转向）和独立型。发展部大而不稳定：模进（模型常有四到八小节）、半音化与转调、只陈述部分主题，可能接一段再过渡；再现部的 S 回到主调。前面可以有引子，后面可以有尾声。', 'ソナタ形式は、和声的に開いた・再現のある・均衡のある二部形式と見られる：第 1 反復部が提示部、第 2 反復部が展開部と再現部。提示部：第 1 主題 P（主調、主調の終止で終わる）→ 推移 TR（「中間休止」medial caesura で終わる）→ 第 2 主題 S（主調以外：長調はよく V、短調は III か v、「提示部の本質的終止」で終わる）→ 終結部 C（大きな接尾部）。不安定なのは TR だけ。推移は従属型（P の素材から、P の言い直しのように始まって逸れる）と独立型。展開部は大きく不安定：反復進行（モデルはよく 4〜8 小節）、半音階と転調、主題の一部だけ、再推移が続くことも。再現部の S は主調に戻る。前に序奏、後にコーダがあってよい。', 'Sonata form can be read as a harmonically open, rounded and balanced binary: the first reprise is the exposition; the second holds development and recapitulation. Exposition: primary theme P (tonic, ending with a tonic cadence) → transition TR (ending with the medial caesura) → secondary theme S (non-tonic: usually V in major, III or v in minor, ending with the essential expositional cadence) → closing area C (a large suffix). Only TR is unstable. Transitions are dependent (from P’s material, often restarting like P then veering) or independent. The development is large and unstable — sequences (models often four to eight bars), chromaticism and modulation, partial themes — possibly followed by a retransition; in the recapitulation S returns in the tonic. An introduction may precede and a coda follow.'),
          t('回旋曲是叠句与插部的交替（例如 A B A C A）：叠句每次都在主调、材料相同，常以主调 PAC 结束，通常是紧凑的简单主题或再现二部，后来出现时可能缩短；插部在对比的调与材料上，通常比叠句复杂。插部分两种：内部主题（像小步舞曲的三声中部，常是同主音换调式 minore / maggiore，常是再现二部，可能不完整）和副部主题群（像奏鸣曲的 TR、S、CL、RT，大调到 V、小调多到 III）。让叠句"回来"有戏剧性，是回旋曲美学的重要部分。', 'ロンドはリフレインとエピソードの交替（例 A B A C A）：リフレインは毎回主調で同じ素材、よく主調の PAC で終わり、ふつう緊密な単純主題か再現二部で、後で短縮されることも。エピソードは対照的な調と素材で、ふつうリフレインより複雑。エピソードは 2 種：内部主題（メヌエットのトリオのよう、よく同主調の minore / maggiore、よく再現二部、不完全なことも）と第 2 主題群（ソナタの TR・S・CL・RT のよう、長調は V、短調は多く III へ）。リフレインの「回帰」を劇的にすることがロンドの美学の要。', 'A rondo alternates refrains and episodes (e.g. A B A C A): the refrain always returns in the tonic with the same material, usually ending with a tonic PAC — typically a tight-knit simple theme or a rounded binary, sometimes abridged later; episodes bring contrasting keys and material and are usually more complex. Episodes are interior themes (like a minuet’s trio, often minore / maggiore, often rounded binary, sometimes incomplete) or second-theme complexes (like a sonata’s TR, S, CL, RT — to V in major, mostly III in minor). Dramatising the refrain’s return is central to the rondo aesthetic.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('呈示部', '提示部', 'exposition'), cells: ['P', 'TR', 'MC', 'S', 'EEC', 'C'] }, { label: t('第二段', '第 2 部', 'reprise 2'), cells: [t('发展部', '展開部', 'development'), 'RT', t('再现部', '再現部', 'recap.')] }] },
      },
      {
        id: 'b27x-e12', type: 'discover', practice: true, ref: 'omt2e-sonata',
        prompt: t('小调奏鸣曲的呈示部，副部主题最常在哪个调？', '短調のソナタの提示部で、第 2 主題はふつうどの調？', 'In a minor-key sonata exposition, the secondary theme is usually in…'),
        options: [t('关系大调 III（或小属 v）', '平行長調 III（または短い v）', 'The relative major III (or minor v)'), t('主调', '主調', 'The tonic'), t('下属调', '下属調', 'The subdominant')],
        answer: 0,
        insight: { title: t('S 不在主调', 'S は主調ではない', 'S is not in the tonic'), text: t('大调奏鸣曲的 S 多在属调 V，小调多在 III 或 v；到再现部才回到主调。', '長調のソナタの S は多く属調 V、短調は III か v。再現部で主調に戻る。', 'In major S is usually in V, in minor in III or v; it returns to the tonic in the recapitulation.') },
      },
    ],
    experiment: [
      { id: 'b27x-x1', type: 'experiment', toy: 'canon', ref: ['wiki-sequence', 'omt2e-form-concepts'],
        prompt: t('动机 C–D–E–C 后面跟一次"回答"。把模仿方式在"调内"和"严格"之间切换：调内是调内模进（音程大小跟着音阶变），严格是真模进（精确移位）。再切到"倒影"，听方向反过来的动机。', '動機 C–D–E–C の後に「応答」。模倣のしかたを「調内」と「厳格」で切り替えよう：調内は調的反復進行（音程の大きさが音階に従う）、厳格は真正の反復進行（正確な移高）。「反行」にすると方向が逆の動機が聞こえる。', 'The motive C–D–E–C is followed by an “answer”. Switch the imitation between diatonic (a tonal sequence — interval sizes follow the scale) and strict (a real sequence — exact transposition). Then choose inversion to hear the motive turned upside down.'),
        params: { leader: MOTIF, steps: [2, 4, 0], delays: [4, 8], bpm: 100 },
        breakthrough: { id: 'b27x-seq', text: t('你听出了真模进和调内模进的差别，还听到了动机的倒影。', '真正と調的の反復進行の違い、そして動機の反行を聴き取った。', 'You heard real versus tonal sequence, and the motive inverted.') } },
    ],
    challenge: [
      {
        id: 'b27x-c1', type: 'choice', error: 'form-type', skills: ['identify'], ref: ['omt2e-form-concepts', 'wiki-sequence'],
        variants: [
          { prompt: t('四个四分音符的动机，变成四个二分音符（音高不变）。这是？', '4 分音符 4 つの動機が 2 分音符 4 つに（音高同じ）。これは？', 'A four-quarter-note motive becomes four half notes (same pitches). This is…'), options: [t('扩大', '拡大', 'Enlargement'), t('紧缩', '縮小', 'Contraction'), t('移位', '転位', 'Displacement'), t('倒影', '反行', 'Inversion')] },
          { prompt: t('C–D–E 在 C 大调里上移一级成 D–E–F（E–F 成了小二度）。这是？', 'C–D–E をハ長調で 1 段上げ D–E–F（E–F は短 2 度に）。これは？', 'C–D–E moved up a step in C major to D–E–F (E–F now a minor second). This is…'), options: [t('调内模进', '調的反復進行', 'A tonal sequence'), t('真模进', '真正の反復進行', 'A real sequence'), t('逆行', '逆行', 'Retrograde'), t('音程变化', '音程の変化', 'Intervallic manipulation')] },
          { prompt: t('一个动机被别的作品反复用来代表某个人物。它叫？', 'ある人物を表すために繰り返し使われる動機は？', 'A motive repeatedly used to represent a character is called…'), options: [t('主导动机（leitmotif）', 'ライトモティーフ', 'A leitmotif'), t('碎片', '断片', 'A fragment'), t('基本乐思', '基本楽想', 'A basic idea'), t('尾声', 'コーダ', 'A coda')] },
        ],
        answer: 0,
        explain: t('扩大只拉长时值；调内模进保留度数不保留大小；和人物、地点、观念联系的动机叫主导动机。', '拡大は音価を長くするだけ。調的反復進行は度数を保ち大きさは保たない。人物・場所・観念と結びついた動機はライトモティーフ。', 'Enlargement lengthens values only; a tonal sequence keeps sizes, not qualities; a motive tied to a character, place or idea is a leitmotif.'),
      },
      {
        id: 'b27x-c2', type: 'choice', error: 'form-type', skills: ['identify'], ref: 'omt2e-phrase',
        variants: [
          { prompt: t('句子式的展开部分，长度最少见的是？', '文型の継続部で、いちばん珍しい長さは？', 'In a sentence, which continuation length is least common?'), options: [t('比呈示短', '提示より短い', 'Shorter than the presentation'), t('和呈示一样长', '提示と同じ', 'The same length'), t('比呈示长', '提示より長い', 'Longer')] },
          { prompt: t('乐段如果转调，通常在哪里转？', '楽節が転調するならふつうどこで？', 'If a period modulates, where does it usually happen?'), options: [t('后句', '後楽句', 'In the consequent'), t('前句开头', '前楽句の始め', 'At the start of the antecedent'), t('基本乐思里', '基本楽想の中', 'Inside the basic idea')] },
          { prompt: t('"碎片化"指什么变短了？', '「断片化」で短くなるのは？', 'What gets shorter in “fragmentation”?'), options: [t('单位的长度', '単位の長さ', 'The length of the units'), t('音符的时值', '音符の音価', 'Note values'), t('旋律的音域', '旋律の音域', 'The melody’s range')] },
        ],
        answer: 0,
        explain: t('展开常和呈示等长或更长，少有更短；乐段转调多在后句；碎片化只指单位长度变短。', '継続はよく提示と同じかそれ以上、短いのはまれ。楽節の転調は後楽句に多い。断片化は単位の長さだけ。', 'Continuations are usually as long or longer, rarely shorter; periods modulate in the consequent; fragmentation concerns unit length only.'),
      },
      {
        id: 'b27x-c3', type: 'choice', error: 'form-type', skills: ['identify'], ref: ['omt2e-binary', 'omt2e-ternary'],
        variants: [
          { prompt: t('‖: A :‖: B A′ :‖，A′ 在第二反复段中间、主调上回来。这是？', '‖: A :‖: B A′ :‖、A′ が第 2 反復部の途中で主調に戻る。これは？', '‖: A :‖: B A′ :‖, with A′ returning mid-reprise in the tonic. This is…'), options: [t('再现二部', '再現二部', 'Rounded binary'), t('单纯二部', '単純二部', 'Simple binary'), t('三部曲式', '三部形式', 'Ternary form'), t('通谱体', '通作形式', 'Through-composed')] },
          { prompt: t('‖: A B :‖ A（A 和 B 一起反复）符合三部曲式吗？', '‖: A B :‖ A（A と B が一緒に反復）は三部形式？', 'Is ‖: A B :‖ A (A and B repeated together) ternary form?'), options: [t('不符合：三部曲式里 A 和 B 不会一起反复', 'いいえ：三部形式で A と B は一緒に反復しない', 'No: in ternary, A and B never repeat together'), t('符合', 'はい', 'Yes')] },
          { prompt: t('小步舞曲与三声中部，每段都是完整的再现二部。这是？', 'メヌエットとトリオ、各部が完全な再現二部。これは？', 'Minuet and trio, each part a complete rounded binary. This is…'), options: [t('复合三部曲式', '複合三部形式', 'Compound ternary form'), t('奏鸣曲式', 'ソナタ形式', 'Sonata form'), t('回旋曲', 'ロンド', 'Rondo')] },
        ],
        answer: 0,
        explain: t('开头的 A 在第二段回来 = 再现二部；三部曲式里 A、B 不一起反复；段落本身是完整曲式 = 复合三部。', '冒頭の A が第 2 部で戻る = 再現二部。三部形式で A・B は一緒に反復しない。部分自体が完全な形式 = 複合三部。', 'A’s opening returning in reprise 2 = rounded binary; ternary never repeats A and B together; sections that are complete forms = compound ternary.'),
      },
      {
        id: 'b27x-c4', type: 'choice', error: 'form-type', skills: ['identify'], ref: ['omt2e-sonata', 'omt-rondo'],
        variants: [
          { prompt: t('奏鸣曲式呈示部里，唯一不稳定的段落是？', 'ソナタ形式の提示部で唯一不安定な部分は？', 'Which exposition section is the only unstable one?'), options: [t('过渡 TR', '推移 TR', 'The transition, TR'), t('主部主题 P', '第 1 主題 P', 'The primary theme, P'), t('副部主题 S', '第 2 主題 S', 'The secondary theme, S'), t('结束部 C', '終結部 C', 'The closing area, C')] },
          { prompt: t('过渡 TR 以什么结束？', '推移 TR は何で終わる？', 'The transition ends with…'), options: [t('中间停顿（medial caesura）', '中間休止（medial caesura）', 'The medial caesura'), t('呈示部关键终止', '提示部の本質的終止', 'The essential expositional cadence'), t('尾声', 'コーダ', 'A coda')] },
          { prompt: t('回旋曲的叠句有什么特点？', 'ロンドのリフレインの特徴は？', 'What is true of a rondo’s refrain?'), options: [t('每次都在主调、材料相同', '毎回主調で同じ素材', 'It always returns in the tonic with the same material'), t('每次都换调', '毎回調が変わる', 'It changes key each time'), t('它比插部复杂', 'エピソードより複雑', 'It is more complex than the episodes')] },
        ],
        answer: 0,
        explain: t('呈示部只有 TR 不稳定，它以中间停顿结束；回旋曲的叠句在主调、材料相同，插部通常更复杂。', '提示部で不安定なのは TR だけ、中間休止で終わる。ロンドのリフレインは主調・同じ素材、エピソードがふつうより複雑。', 'Only TR is unstable, ending at the medial caesura; a rondo refrain returns in the tonic with the same material, the episodes usually more complex.'),
      },
      {
        id: 'b27x-c5', type: 'choice', error: 'form-type', skills: ['identify'], ref: 'omt2e-phrase-expansion',
        variants: [
          { prompt: t('PAC 之后又重复了两次 V–I。这是？', 'PAC の後に V–I がさらに 2 回。これは？', 'After a PAC, V–I is repeated twice more. This is…'), options: [t('后缀（终止后的补充）', '接尾部（終止後の延長）', 'A suffix (post-cadential extension)'), t('内部扩充', '内部の拡大', 'An internal expansion'), t('紧缩', '縮小', 'A contraction')] },
          { prompt: t('乐句走上一段新材料，最后没回到之前的材料就终止了。这是？', 'フレーズが新しい素材へ逸れ、前の素材に戻らずに終止。これは？', 'A phrase veers into new material and cadences without returning. This is…'), options: [t('改道（reroute）', '経路変更（reroute）', 'A reroute'), t('绕道（detour）', '迂回（detour）', 'A detour'), t('前缀', '接頭部', 'A prefix')] },
          { prompt: t('紧缩发生在哪里？', '縮小が起こるのは？', 'Where does contraction happen?'), options: [t('总在乐句内部', 'いつもフレーズの内部', 'Always inside the phrase'), t('乐句之前', 'フレーズの前', 'Before the phrase'), t('终止之后', '終止の後', 'After the cadence')] },
        ],
        answer: 0,
        explain: t('终止后的补充是后缀；不回来的另辟路径是改道，回来的是绕道；紧缩总在乐句内部。', '終止後の延長は接尾部。戻らない別の道は経路変更、戻るのは迂回。縮小はいつもフレーズの内部。', 'Post-cadential material is a suffix; an alternative path that never returns is a reroute (one that does is a detour); contraction is always internal.'),
      },
      {
        id: 'b27x-c6', type: 'choice', error: 'form-type', skills: ['identify'], ref: ['omt2e-phrase', 'omt2e-form-concepts'],
        variants: [
          { prompt: t('分段分析里，方括号和弧线分别标什么？', '分節分析で角括弧と弧はそれぞれ何を示す？', 'In segmentation analysis, what do brackets and arcs mark?'), options: [t('方括号：乐思、次乐句；弧线：乐句及以上', '角括弧：楽想・小フレーズ、弧：フレーズ以上', 'Brackets: ideas and subphrases; arcs: phrases and above'), t('方括号：乐句；弧线：动机', '角括弧：フレーズ、弧：動機', 'Brackets: phrases; arcs: motives'), t('两者一样', 'どちらも同じ', 'They are the same')] },
          { prompt: t('乐段的前句通常以什么终止结束？', '楽節の前楽句はふつう何の終止で終わる？', 'A period’s antecedent usually ends with…'), options: [t('半终止（较弱）', '半終止（弱い）', 'A half cadence (weaker)'), 'PAC', t('阻碍进行', '偽進行', 'A deceptive motion')] },
          { prompt: t('句子式的呈示部分由什么组成？', '文型の提示部は何でできている？', 'A sentence’s presentation consists of…'), options: [t('基本乐思和它的重复', '基本楽想とその反復', 'A basic idea and its repetition'), t('基本乐思和对比乐思', '基本楽想と対照楽想', 'A basic idea and a contrasting idea'), t('四个碎片', '4 つの断片', 'Four fragments')] },
        ],
        answer: 0,
        explain: t('方括号标不必以终止结束的单位、弧线标乐句及以上；前句多以半终止结束；呈示 = 基本乐思 + 重复（乐段才是基本乐思 + 对比乐思）。', '角括弧は終止で終わらなくてよい単位、弧はフレーズ以上。前楽句は多く半終止。提示 = 基本楽想 + 反復（楽節が基本楽想 + 対照楽想）。', 'Brackets mark units that need not cadence, arcs phrases and above; antecedents usually end on a half cadence; a presentation is basic idea + repetition (a period uses basic + contrasting ideas).'),
      },
      G('b27x-g1', 'cadenceType', 1, ['function']),
    ],
  },
  pool: [G('b27x-p1', 'cadenceType', 3, ['function'])],
};

// ===================== B2-8x 离调与转调 · 扩展关 =====================
// 对应 A 面：tonicization（副属 / 副导七 / 转调的两种方式 / 综合）、支线 modulation2（自然音与半音模进 / 共同音转调 / 同音异名重释 / 减七的四个去向）的进阶关
const MD = { C: [48, 60, 64, 67], Am: [45, 60, 64, 69], Em: [40, 59, 64, 67], G: [43, 59, 62, 67], D7: [38, 60, 66, 69], 'F♯°7': [42, 60, 63, 69], Gend: [43, 62, 67, 71], Ab: [44, 60, 63, 68], E: [40, 59, 64, 68], B7: [47, 57, 63, 66] };
const md = (...names) => ({ notes: names.map((n) => MD[n]), mode: 'chords' });
const mdo = (n, label = n) => ({ label, notes: MD[n] });
const EXT_B2_8 = {
  minutes: 24,
  core: true,
  insight: t('离调和转调不是两个格子，而是一条谱的两端：越长、终止越确定，就越像转调；共同和弦、共同音、同音异名，都是把耳朵"骗"到新调的桥。', '一時的転調と転調は 2 つの箱ではなく 1 本の帯の両端：長く、終止がはっきりするほど転調らしい。共通和音・共通音・異名同音は耳を新しい調へ「だまして」渡す橋。', 'Tonicization and modulation are not two boxes but two ends of one spectrum: the longer and more firmly cadenced, the more it is a modulation; pivot chords, common tones and enharmonic respellings are bridges that coax the ear into a new key.'),
  sections: {
    discover: [
      {
        id: 'b28x-d1', type: 'discover', ref: 'omt2e-chromatic-modulation',
        prompt: t('先听 A♭ 大三和弦，再听 E 大三和弦。两个和弦相隔很远，可接起来不突兀——它们有一个共同音。是哪个？', 'まず A♭ の長三和音、次に E の長三和音。遠い調なのに唐突でない——共通音が 1 つある。どれ？', 'Hear A♭ major, then E major. Distant chords, yet the join is smooth — they share one tone. Which?'),
        play: [{ label: 'A♭ → E', audio: md('Ab', 'E') }],
        options: [t('A♭ = G♯（A♭ 的根音成了 E 的三音）', 'A♭ = G♯（A♭ の根音が E の第 3 音に）', 'A♭ = G♯ (A♭’s root becomes E’s third)'), t('C', 'C', 'C'), t('E♭ = D♯', 'E♭ = D♯', 'E♭ = D♯')],
        answer: 0,
        insight: {
          title: t('耳朵抓住一个音，换了身份', '耳が 1 音をつかみ、役割が変わる', 'The ear holds one note while its role changes'),
          text: t('舒曼歌曲《献给》（Op. 25 No. 1）第 13 小节用 PAC 确立 A♭ 大调，耳朵停在 A♭ 上；接着这个 A♭ 被重新理解成 G♯——E 大三和弦的三音，几小节后 E 大调被确立（其实是 F♭ 大调，为了好读写成 E）。不用共同和弦、只靠一个共同音转调，特别适合主和弦相隔三度、又带半音变化的"半音关系三度调"。', 'シューマンの歌曲《献呈》（Op. 25 No. 1）は第 13 小節の PAC で変イ長調を確立し、耳は A♭ にとどまる。その A♭ が G♯——ホ長調の主和音の第 3 音——と読み替えられ、数小節後にホ長調が確立する（本当は変ヘ長調だが読みやすくホ長調で書く）。共通和音なしに 1 つの共通音だけで転調する方法は、主和音が 3 度離れ半音の変化を伴う「半音的 3 度関係」の調にとくに向く。', 'In Schumann’s song “Widmung” (Op. 25 No. 1) a PAC in bar 13 confirms A♭ major and the ear holds the A♭; it is then reinterpreted as G♯, the third of E major, confirmed a few bars later (really F♭ major, written as E for clarity). Modulating by a single common tone rather than a pivot chord suits keys a third apart with chromatic alteration — chromatic mediants.'),
        },
      },
    ],
    explain: [
      {
        id: 'b28x-e1', type: 'page', ref: 'omt2e-tonicization',
        title: t('进阶 1、2 · 副属与副导：读法与写法', '発展 1・2・副属と副導：読み方と書き方', 'Advanced 1–2 · Applied dominants and leading-tone chords: reading and writing'),
        text: [
          t('离调就是让一个不是主和弦的和弦"暂时听起来像主和弦"，用的是从临时调借来的副属和弦 V(7) 和副导和弦 vii°(7)。斜线前写它在临时调里的身份，斜线后写被离调的和弦，读的时候把斜线读成"的"（of）：V/ii 读作"二级的五级"。副和弦几乎总带临时记号，特别是升高音——它们在制造临时的导音。也可以把副属看成同根音调内和弦的"变化版"：C 大调的 ii（D F A）变成 II♯（D F♯ A），就是 V/V。', '一時的転調は主和音でない和音を「一時的に主和音のように」聞かせること。一時的な調から借りた副属 V(7) と副導 vii°(7) を使う。スラッシュの前はその調での役割、後は目標の和音で、スラッシュを「の」（of）と読む：V/ii は「2 度の 5 度」。副和音はほぼいつも臨時記号、とくに上げる記号を伴う——一時的な導音をつくっているから。副属は同じ根音の調内和音の「変化形」とも見られる：ハ長調の ii（D F A）が II♯（D F♯ A）になれば V/V。', 'Tonicization makes a non-tonic chord sound like a temporary tonic, using applied dominants V(7) and applied leading-tone chords vii°(7) borrowed from the temporary key. Before the slash is the chord’s role in that key, after it the chord tonicized; read the slash as “of”: V/ii is “five of two”. Applied chords nearly always carry accidentals, especially raising ones — they create temporary leading tones. You can also see an applied dominant as an altered diatonic chord on the same root: C major’s ii (D F A) becoming II♯ (D F♯ A) is V/V.'),
          t('副导七和弦的根音在目标根音下方半音。大调里不改的话是半减七，但作曲家通常把七音降低成全减七：C 大调 vii°⁷/V = F♯–A–C–E♭（Josephine Lang 的歌曲《Du gleichst dem klaren blauen See》里就有，还加了一个终止四六）。半减七当副和弦在古典音乐里罕见，在爵士里几乎都是副 iiø⁷。', '副導七の根音は目標の根音の半音下。長調でそのままなら半減七だが、作曲家はふつう 7 度を下げて完全減七にする：ハ長調 vii°⁷/V = F♯–A–C–E♭（ヨゼフィーネ・ラングの歌曲《Du gleichst dem klaren blauen See》にあり、終止の四六も加わる）。半減七の副和音は古典ではまれで、ジャズではほぼ副 iiø⁷。', 'An applied leading-tone seventh has its root a half step below the target’s. Unaltered in major it is half-diminished, but composers usually lower the seventh for a fully diminished chord: C major vii°⁷/V = F♯–A–C–E♭ (as in Josephine Lang’s song “Du gleichst dem klaren blauen See”, with a cadential six-four added). A half-diminished applied chord is rare in classical music; in jazz it is almost always an applied iiø⁷.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes: [{ p: 'A4', d: 'h', s: 0, col: 0 }, { p: 'C5', d: 'h', s: 0, col: 0 }, { p: 'Eb5', d: 'h', s: 0, col: 0 }, { p: 'F#3', d: 'h', s: 1, col: 0, lit: true, label: 'vii°⁷/V' }, { p: 'B4', d: 'h', s: 0, col: 1 }, { p: 'D5', d: 'h', s: 0, col: 1 }, { p: 'G4', d: 'h', s: 0, col: 1 }, { p: 'G3', d: 'h', s: 1, col: 1, label: 'V' }], cols: 2 },
      },
      {
        id: 'b28x-e2', type: 'discover', practice: true, ref: 'omt2e-tonicization',
        prompt: t('F 大调里，vii°⁷/vi 是哪四个音？', 'ヘ長調の vii°⁷/vi の 4 音は？', 'In F major, vii°⁷/vi is…'),
        options: ['C♯ E G B♭', 'C E G B♭', 'C♯ E G♯ B', 'E G B♭ D♭'],
        answer: 0,
        insight: { title: t('目标下方半音，叠小三度', '目標の半音下から短 3 度を積む', 'A half step below the target, stacked in minor thirds'), text: t('F 大调 vi = Dm，D 的导音是 C♯：C♯–E–G–B♭，每层小三度。', 'ヘ長調 vi = Dm、D の導音は C♯：C♯–E–G–B♭、すべて短 3 度。', 'F major’s vi is Dm; D’s leading tone is C♯: C♯–E–G–B♭, all minor thirds.') },
      },
      {
        id: 'b28x-e3', type: 'page', ref: 'omt2e-modulation',
        title: t('进阶 3 · 两种转调，和怎样选共同和弦', '発展 3・2 種類の転調と共通和音の選び方', 'Advanced 3 · Two ways to modulate, and choosing a pivot'),
        text: [
          t('转调是较长时间的主音改变。直接转调突然换到新调，常发生在乐句交界处，所以也叫"乐句转调"——分析时直接标出新调就好。共同和弦转调更含蓄：先用一个两个调都有的和弦，上方写它在旧调的级数、下方写在新调的级数（例如"iv⁷ 变成 ii⁷"）。找共同和弦的办法：在旧调里一直分析到说不通，往回退一个和弦试试；还不行就再退一个。', '転調は長めの主音の変更。直接転調は突然新しい調へ進み、フレーズの境目でよく起こるので「フレーズ転調」とも——分析では新しい調を書けばよい。共通和音による転調はもっと控えめ：両方の調にある和音を使い、上に旧調の度数、下に新調の度数（「iv⁷ が ii⁷ になる」など）。共通和音の探し方：旧調で分析して通じなくなったら 1 つ戻って試し、だめならもう 1 つ戻る。', 'Modulation is a longer-term change of tonic. A direct modulation jumps to the new key, often at a phrase boundary — hence “phrase modulation” — and you simply label the new key. A pivot-chord modulation is subtler: one chord belongs to both keys, labelled with the old numeral above and the new below (“iv⁷ becomes ii⁷”). To find it, analyse in the old key until it stops making sense, back up one chord and try it as the pivot; if not, back up once more.'),
          t('有好几个候选时，最好的共同和弦两边都是下属——因为属和弦马上就要来，两边都"在通往 V 的路上"；其次是旧调的主和弦变成新调的下属（I 变成 IV）；最差的是牵涉属和弦的，例如"V 变成 I"——同一个和弦不可能同时既不稳定又很稳定。转调后别太快就终止：可以先用阻碍进行躲开新调的终止，再试一次。近关系调是调号只差一个升降号的调，共同和弦最多。', '候補が複数あれば、最良は両方で前属のもの——すぐ V が来るので、両方の調で「V へ向かう途中」になる。次は旧調の主和音が新調の前属になるもの（I が IV に）。最悪は属を含むもの、たとえば「V が I に」——同じ和音が同時に不安定かつ非常に安定ということはない。転調後すぐに終止しないこと：偽進行で新調の終止を避け、もう一度試すとよい。近親調は調号が 1 つ違いの調で、共通和音が最も多い。', 'With several candidates, the best pivot is predominant in both keys — V is coming soon, so it heads toward V in both; next best is old tonic becoming new predominant (I becomes IV); worst is anything involving the dominant, like “V becomes I” — one chord cannot be both unstable and very stable. Don’t cadence too soon after the pivot: a deceptive motion can dodge the new key’s cadence before a retry. Closely related keys — signatures one accidental apart — share the most chords.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: 'C', cells: ['I', 'vi', '…'] }, { label: 'G', cells: ['', 'ii', 'V⁷', 'I'] }] },
      },
      {
        id: 'b28x-e4', type: 'discover', practice: true, ref: 'omt2e-modulation',
        prompt: t('C 大调转 G 大调，哪个共同和弦最好？', 'ハ長調からト長調へ。最良の共通和音は？', 'C major to G major: which pivot is best?'),
        options: [t('Am：C 的 vi = G 的 ii（两边都是下属）', 'Am：C の vi = G の ii（両方前属）', 'Am: vi in C = ii in G (predominant in both)'), t('G：C 的 V = G 的 I', 'G：C の V = G の I', 'G: V in C = I in G'), t('Em：C 的 iii = G 的 vi', 'Em：C の iii = G の vi', 'Em: iii in C = vi in G')],
        answer: 0,
        insight: { title: t('两边都在去 V 的路上', '両方で V への途中', 'On the way to V in both keys'), text: t('Am 在 C 是弱下属、在 G 是强下属 ii，接下来 D⁷（G 的 V⁷）自然就来了；"V 变成 I"是最差的选择。', 'Am は C で弱い前属、G で強い前属 ii。次に D⁷（G の V⁷）が自然に来る。「V が I に」は最悪。', 'Am is a weak predominant in C and the strong ii in G, so D⁷ (G’s V⁷) follows naturally; “V becomes I” is the worst choice.') },
      },
      {
        id: 'b28x-e5', type: 'page', ref: 'omt2e-modulation',
        title: t('进阶 4 · 临时记号是线索，终止是证据；还有"扩展离调"', '発展 4・臨時記号は手がかり、終止は証拠。そして「拡張された一時的転調」', 'Advanced 4 · Accidentals are clues, cadences are proof — and extended tonicization'),
        text: [
          t('两条找转调的建议：终止确立调，所以先找到终止，就知道新调在哪里出现；同一个临时记号在一段里反复出现，暗示可能转调——再找一个确立这个新调的终止来证实。', '転調を見つける 2 つのコツ：終止が調を確立するので、まず終止を見つければ新しい調の場所が分かる。同じ臨時記号がある部分で何度も出るなら転調の可能性——その調を確立する終止を探して確かめる。', 'Two tips: cadences establish keys, so find the cadences first and you know where new keys appear; the same accidental recurring through a passage hints at a modulation — confirm it by finding a cadence in that key.'),
          t('离调和转调可以看成一条谱的两端，依据是段落的长度和新调确立的强度：最清楚的转调是用终止确立新调、之后继续留在新调；较弱的转调可能确立之后马上回原调。两者之间的灰色地带叫"扩展离调"。不同的人对转调的接受程度不一样：分析时要能说清楚你为什么这样听，也要理解别人为什么可能听成另一种。', '一時的転調と転調は、部分の長さと新しい調の確立の強さで決まる 1 本の帯の両端。最もはっきりした転調は終止で新しい調を確立し、その後も新しい調に留まる。弱い転調は確立してすぐ元の調に戻ることも。その間の灰色の領域を「拡張された一時的転調」と呼ぶ。転調の受け入れ方は人によって違う：自分がなぜそう聞くか説明でき、別の聞き方も理解できるように。', 'Tonicization and modulation are two poles on a spectrum of length and strength: the clearest modulations confirm the new key with a cadence and stay there; weaker ones may cadence and go straight back. The grey area between is “extended tonicization”. People differ in how readily they accept key changes: be able to explain your hearing, and to understand why someone else might hear it differently.'),
        ],
      },
      {
        id: 'b28x-e6', type: 'page', ref: 'omt2e-chromatic-modulation',
        title: t('支线 · 转到远关系调：借用和弦与共同音', '支線・遠隔調へ：借用和音と共通音', 'Side quest · Reaching distant keys: borrowed chords and common tones'),
        text: [
          t('调式混合能扩大共同和弦的范围：C 大调借用 C 小调的和弦后，就能比较容易地转到 E♭ 大调（共有 7 个和弦）、A♭ 大调、B♭ 大调，以及 F 小调、G 小调。威尔第《弄臣》用借来的 ♭VI⁶ 当共同和弦；勃拉姆斯圆舞曲 Op. 39 No. 14 则把 G 大调调内的 vii°⁶ 重新理解成 E 大调的混合和弦 ii°⁶——反方向也行得通。', '旋法の混合で共通和音の範囲が広がる：ハ長調がハ短調の和音を借りれば、変ホ長調（共通和音 7 つ）・変イ長調・変ロ長調、ヘ短調・ト短調へ楽に転調できる。ヴェルディ《リゴレット》は借用の ♭VI⁶ を共通和音に使う。ブラームスのワルツ Op. 39 No. 14 はト長調の調内 vii°⁶ をホ長調の混合和音 ii°⁶ と読み替える——逆向きもできる。', 'Mode mixture widens the pool of pivots: borrowing from C minor lets C major modulate easily to E♭ major (seven shared chords), A♭ major, B♭ major, F minor and G minor. Verdi’s Rigoletto uses a borrowed ♭VI⁶ as pivot; Brahms’s Waltz Op. 39 No. 14 reinterprets G major’s diatonic vii°⁶ as a mixture chord, ii°⁶, in E major — it works the other way too.'),
          t('也可以不用共同和弦，只用一个共同音。主和弦相隔三度、又带半音变化的调——"半音关系三度调"——最适合这样转：C 与 A♭（共有 C）、C 与 E♭（共有 G）、C 与 A、C 与 E（共有 E）。', '共通和音ではなく 1 つの共通音で転調することもできる。主和音が 3 度離れ半音の変化を伴う調——「半音的 3 度関係」——にいちばん向く：C と A♭（C を共有）、C と E♭（G）、C と A、C と E（E）。', 'You can also use a single common tone instead of a pivot chord. It suits keys whose tonics are a third apart with chromatic alteration — chromatic mediants: C and A♭ (sharing C), C and E♭ (G), C and A, C and E (E).'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['C4', 'E4', 'G4'], 0), ...col(['C4', 'Eb4', 'Ab4'], 1), ...col(['Bb3', 'Eb4', 'G4'], 2), ...col(['C#4', 'E4', 'A4'], 3), ...col(['B3', 'E4', 'G#4'], 4)], cols: 5 },
      },
      {
        id: 'b28x-e7', type: 'discover', practice: true, ref: 'omt2e-chromatic-modulation',
        prompt: t('C 大调和 E♭ 大调的主和弦共有哪个音？', 'ハ長調と変ホ長調の主和音の共通音は？', 'Which tone do the tonic triads of C major and E♭ major share?'),
        options: ['G', 'C', 'E♭', 'B♭'],
        answer: 0,
        insight: { title: t('C E G 与 E♭ G B♭', 'C E G と E♭ G B♭', 'C E G and E♭ G B♭'), text: t('两个和弦都有 G：把 G 留住，就能直接走到 E♭ 大调。', 'どちらも G を持つ：G を保てば変ホ長調へ直接行ける。', 'Both contain G: hold it and step straight into E♭ major.') },
      },
      {
        id: 'b28x-e8', type: 'page', ref: ['omt2e-chromatic-modulation', 'omt2e-dim7-reinterpret'],
        title: t('支线 · 同音异名重释：一个声音，两种身份', '支線・異名同音の読み替え：1 つの響き、2 つの役割', 'Side quest · Enharmonic reinterpretation: one sound, two identities'),
        text: [
          t('同音异名让一个和弦在新调里换一个身份，从而打开通往远关系调的路。最常见的是属七和德国增六：E♭–G–B♭–D♭ 是 A♭ 大调的 V⁷，七音 D♭ 向下级进解决；把 D♭ 拼成 C♯，E♭–G–B♭–C♯ 就是 G 调的德国增六，增六度 E♭–C♯ 向外解决到 D（5̂）。耳朵听到的是同一个和弦，"七音向下"和"增六度向外"这一点不同，就是两者最根本的区别。', '異名同音で和音が新しい調で別の役割を得て、遠隔調への道が開く。最も多いのは属七とドイツの増六：E♭–G–B♭–D♭ は変イ長調の V⁷ で、第 7 音 D♭ は下へ順次進行。D♭ を C♯ と書けば E♭–G–B♭–C♯ はト調のドイツの増六で、増 6 度 E♭–C♯ は外へ開いて D（5̂）へ。耳には同じ和音だが、「7 度は下へ」と「増 6 度は外へ」の違いが両者の根本的な区別。', 'Enharmonic respelling gives a chord a new identity in a new key, opening paths to distant keys. The classic case is dominant seventh versus German augmented sixth: E♭–G–B♭–D♭ is V⁷ of A♭, its seventh D♭ falling by step; respell D♭ as C♯ and E♭–G–B♭–C♯ is a German augmented sixth in G, the augmented sixth E♭–C♯ resolving outward to D (5̂). The ear hears the same chord; “seventh down” versus “augmented sixth out” is the fundamental difference.'),
          t('减七和弦全由小三度组成，可以重新拼写，让四个音中的任何一个当根音，所以它能解决到四个不同的目标——一个和弦，四扇门：B–D–F–A♭ 解决到 C；拼成 D–F–A♭–C♭ 解决到 E♭；拼成 F–A♭–C♭–E𝄫 解决到 G♭；拼成 G♯–B–D–F 解决到 A。', '減七の和音はすべて短 3 度なので、4 音のどれを根音にしても綴り直せ、4 つの違う目標へ解決できる——1 つの和音に 4 つの扉：B–D–F–A♭ は C へ、D–F–A♭–C♭ と綴れば E♭ へ、F–A♭–C♭–E𝄫 なら G♭ へ、G♯–B–D–F なら A へ。', 'A diminished seventh is all minor thirds, so it can be respelled with any of its four notes as root and resolve to four different targets — one chord, four doors: B–D–F–A♭ to C; as D–F–A♭–C♭ to E♭; as F–A♭–C♭–E𝄫 to G♭; as G♯–B–D–F to A.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['Eb4', 'G4', 'Bb4', 'Db5'], 0, { label: 'V⁷/A♭' }), ...col(['Eb4', 'G4', 'Bb4', 'C#5'], 1, { label: 'Ger⁺⁶/G', lit: true })], cols: 2 },
      },
      {
        id: 'b28x-e9', type: 'discover', practice: true, ref: 'omt2e-dim7-reinterpret',
        prompt: t('B–D–F–A♭ 拼成 D–F–A♭–C♭，它会解决到哪里？', 'B–D–F–A♭ を D–F–A♭–C♭ と綴ると、どこへ解決？', 'Respell B–D–F–A♭ as D–F–A♭–C♭. Where does it resolve?'),
        options: [t('E♭（D 当导音）', 'E♭（D が導音）', 'E♭ (D as leading tone)'), 'C', 'A', 'G'],
        answer: 0,
        insight: { title: t('谁当根音，谁就是导音', '根音にした音が導音', 'Whichever note is root is the leading tone'), text: t('D 当根音（导音），往上半音到 E♭：D–F–A♭–C♭ 是 E♭ 调的 vii°⁷。', 'D を根音（導音）にすると半音上の E♭ へ：D–F–A♭–C♭ は変ホ調の vii°⁷。', 'D as root (leading tone) rises to E♭: D–F–A♭–C♭ is vii°⁷ of E♭.') },
      },
    ],
    experiment: [
      { id: 'b28x-x1', type: 'experiment', toy: 'progression', ref: ['omt2e-modulation', 'omt2e-tonicization'],
        prompt: t('C 大调 → G 大调。第二格选共同和弦：Am（vi = ii，最好）、C（I = IV，其次）、G（V = I，最差）；第三格选 D⁷ 或副导 F♯°⁷。听哪一种转得最自然。', 'ハ長調 → ト長調。2 番目で共通和音を選ぼう：Am（vi = ii、最良）、C（I = IV、次点）、G（V = I、最悪）。3 番目は D⁷ か副導 F♯°⁷。どれがいちばん自然に転調する？', 'C major → G major. Slot 2 is the pivot: Am (vi = ii, best), C (I = IV, next best), G (V = I, worst); slot 3 is D⁷ or the applied F♯°⁷. Which modulates most naturally?'),
        params: { gap: 820, slots: [
          { options: [mdo('C', 'C (I)')] },
          { options: [mdo('Am', 'Am (vi = ii)'), mdo('C', 'C (I = IV)'), mdo('G', 'G (V = I)')] },
          { options: [mdo('D7', 'D⁷ (V⁷ in G)'), mdo('F♯°7', 'F♯°⁷ (vii°⁷ in G)')] },
          { options: [mdo('Gend', 'G (I)')] },
        ], presets: [
          { label: t('最好的共同和弦', '最良の共通和音', 'Best pivot'), picks: [0, 0, 0, 0], explain: t('Am 在两个调里都是下属，接着 D⁷ 走向 G。', 'Am は両方の調で前属、続く D⁷ が G へ。', 'Am is predominant in both keys, then D⁷ heads to G.') },
          { label: 'I = IV', picks: [0, 1, 0, 0], explain: t('旧调主和弦变成新调下属：功能上也说得通。', '旧調の主和音が新調の前属：機能的にも通じる。', 'Old tonic becomes new predominant: functionally fine.') },
          { label: 'V = I', picks: [0, 2, 0, 0], explain: t('同一个和弦又是不稳定的 V、又是稳定的 I——耳朵很难这样听。', '同じ和音が不安定な V と安定した I を兼ねる——耳はそう聞きにくい。', 'One chord as unstable V and stable I at once — hard for the ear to accept.') },
          { label: t('副导七', '副導七', 'Applied vii°⁷'), picks: [0, 0, 1, 0], explain: t('F♯°⁷（vii°⁷ in G）代替 D⁷，同样把耳朵推向 G。', 'F♯°⁷（ト調の vii°⁷）が D⁷ の代わりに、同じく G へ押す。', 'F♯°⁷ (vii°⁷ in G) replaces D⁷ and pushes toward G just the same.') },
        ] },
        breakthrough: { id: 'b28x-pivot', text: t('你比较了三种共同和弦，听出为什么"两边都是下属"最顺。', '3 つの共通和音を比べ、「両方で前属」がいちばん自然な理由を聴き取った。', 'You compared three pivots and heard why “predominant in both” is smoothest.') } },
    ],
    challenge: [
      {
        id: 'b28x-c1', type: 'choice', error: 'wrong-chord', skills: ['spell'], ref: 'omt2e-tonicization',
        variants: [
          { prompt: t('D 大调的 V⁷/IV 是？', 'ニ長調の V⁷/IV は？', 'In D major, V⁷/IV is…'), options: ['D F♯ A C', 'D F♯ A C♯', 'A C♯ E G', 'G B D F'] },
          { prompt: t('B♭ 大调的 V⁷/V 是？', '変ロ長調の V⁷/V は？', 'In B♭ major, V⁷/V is…'), options: ['C E G B♭', 'C E♭ G B♭', 'F A C E♭', 'G B D F'] },
          { prompt: t('G 大调的 vii°⁷/ii 是？', 'ト長調の vii°⁷/ii は？', 'In G major, vii°⁷/ii is…'), options: ['G♯ B D F', 'G B D F', 'F♯ A C E♭', 'C♯ E G B♭'] },
        ],
        answer: 0,
        explain: t('V⁷/x：目标根音往上纯五度，做成属七；vii°⁷/x：目标根音下方半音，叠小三度。副和弦多半带升高的临时记号（D 大调 V⁷/IV 用 C♮ 是降低音，属于例外）。', 'V⁷/x：目標の根音の完全 5 度上で属七。vii°⁷/x：目標の根音の半音下から短 3 度を積む。副和音はたいてい上げる臨時記号（ニ長調 V⁷/IV の C♮ は下げる例外）。', 'V⁷/x: a perfect fifth above the target, as a dominant seventh; vii°⁷/x: a half step below the target, stacked in minor thirds. Applied chords mostly carry raising accidentals (the C♮ in D major’s V⁷/IV is a lowering exception).'),
      },
      {
        id: 'b28x-c2', type: 'choice', error: 'wrong-function', skills: ['function'], ref: 'omt2e-modulation',
        variants: [
          { prompt: t('D 大调转 A 大调，最好的共同和弦是？', 'ニ長調からイ長調。最良の共通和音は？', 'D major to A major: the best pivot is…'), options: [t('Bm：D 的 vi = A 的 ii', 'Bm：D の vi = A の ii', 'Bm: vi in D = ii in A'), t('A：D 的 V = A 的 I', 'A：D の V = A の I', 'A: V in D = I in A'), t('F♯m：D 的 iii = A 的 vi', 'F♯m：D の iii = A の vi', 'F♯m: iii in D = vi in A')] },
          { prompt: t('共同和弦转调怎么标？', '共通和音による転調の書き方は？', 'How is a pivot chord labelled?'), options: [t('上方旧调级数、下方新调级数', '上に旧調、下に新調の度数', 'Old-key numeral above, new-key numeral below'), t('只写新调级数', '新調の度数だけ', 'Only the new-key numeral'), t('写成副属', '副属として', 'As an applied chord')] },
          { prompt: t('直接转调为什么也叫"乐句转调"？', '直接転調が「フレーズ転調」とも呼ばれるのはなぜ？', 'Why is a direct modulation also called a phrase modulation?'), options: [t('它常发生在乐句交界处', 'フレーズの境目でよく起こるから', 'It often happens at phrase boundaries'), t('它只持续一个乐句', '1 フレーズだけ続くから', 'It lasts one phrase'), t('它需要共同和弦', '共通和音が必要だから', 'It needs a pivot chord')] },
        ],
        answer: 0,
        explain: t('最好的共同和弦两边都是下属；标法是上旧下新；直接转调常在乐句交界处。', '最良の共通和音は両方で前属。上に旧、下に新。直接転調はフレーズの境目に多い。', 'The best pivot is predominant in both keys; label old above, new below; direct modulations often fall at phrase boundaries.'),
      },
      {
        id: 'b28x-c3', type: 'choice', error: 'key-relation', skills: ['calc'], ref: ['omt2e-modulation', 'omt2e-chromatic-modulation'],
        variants: [
          { prompt: t('下面哪个不是 C 大调的近关系调？', 'ハ長調の近親調でないのは？', 'Which is not closely related to C major?'), options: [t('E♭ 大调', '変ホ長調', 'E♭ major'), t('G 大调', 'ト長調', 'G major'), t('D 小调', 'ニ短調', 'D minor'), t('E 小调', 'ホ短調', 'E minor')] },
          { prompt: t('C 大调和 A 大调的主和弦共有哪个音？', 'ハ長調とイ長調の主和音の共通音は？', 'Which tone do C major and A major tonic triads share?'), options: ['E', 'C', 'A', 'G'] },
          { prompt: t('C 大调借用 C 小调的和弦后，和哪个调的共同和弦最多？', 'ハ長調がハ短調の和音を借りると、共通和音が最も多い調は？', 'Borrowing from C minor, C major shares the most chords with…'), options: [t('E♭ 大调（7 个）', '変ホ長調（7 つ）', 'E♭ major (seven)'), t('A♭ 大调', '変イ長調', 'A♭ major'), t('B♭ 大调', '変ロ長調', 'B♭ major')] },
        ],
        answer: 0,
        explain: t('近关系调调号相差不超过一个升降号（E♭ 大调差三个降号）；C 与 A 共有 E；借用和弦后 C 大调与 E♭ 大调共有 7 个和弦。', '近親調は調号の差が 1 つまで（変ホ長調は ♭ 3 つ違う）。C と A は E を共有。借用後のハ長調と変ホ長調の共通和音は 7 つ。', 'Closely related keys differ by at most one accidental (E♭ major differs by three flats); C and A share E; with mixture C major shares seven chords with E♭ major.'),
      },
      {
        id: 'b28x-c4', type: 'choice', error: 'concept', skills: ['function'], ref: ['omt2e-chromatic-modulation', 'omt2e-dim7-reinterpret'],
        variants: [
          { prompt: t('E♭–G–B♭–D♭ 拼成 E♭–G–B♭–C♯ 后，在哪个调里是德国增六？', 'E♭–G–B♭–D♭ を E♭–G–B♭–C♯ と綴ると、どの調のドイツの増六？', 'Respelled E♭–G–B♭–C♯, it is a German sixth in…'), options: [t('G 调', 'ト調', 'G'), t('A♭ 调', '変イ調', 'A♭'), t('E♭ 调', '変ホ調', 'E♭'), t('C 调', 'ハ調', 'C')] },
          { prompt: t('属七和德国增六最根本的区别在于？', '属七とドイツの増六の根本的な違いは？', 'The fundamental difference between V⁷ and the German sixth is…'), options: [t('七音向下级进 vs 增六度向外解决到 5̂', '7 度が下へ順次 vs 増 6 度が外へ 5̂', 'Seventh down by step vs augmented sixth outward to 5̂'), t('一个是大三和弦，一个是小三和弦', '片方は長三、片方は短三', 'One is major, the other minor'), t('音完全不同', '音がまったく違う', 'Completely different notes')] },
          { prompt: t('一个减七和弦能重新拼写成几种"导七"？', '1 つの減七はいくつの「導七」に綴り直せる？', 'How many leading-tone sevenths can one diminished seventh be respelled as?'), options: ['4', '3', '2', '12'] },
        ],
        answer: 0,
        explain: t('E♭–C♯ 是增六度，向外到 D——G 调的属音；属七的七音向下、增六度向外；减七的四个音都能当根音。', 'E♭–C♯ は増 6 度で外へ D——ト調の属音。属七の 7 度は下へ、増 6 度は外へ。減七は 4 音とも根音になれる。', 'E♭–C♯ is an augmented sixth opening to D — the dominant of G; the V⁷ seventh falls while the augmented sixth opens out; any of a diminished seventh’s four notes can be the root.'),
      },
      {
        id: 'b28x-c5', type: 'choice', error: 'concept', skills: ['identify'], ref: 'omt2e-modulation',
        variants: [
          { prompt: t('介于离调和转调之间、说不清的情况叫？', '一時的転調と転調の間のはっきりしない場合は？', 'The grey area between tonicization and modulation is called…'), options: [t('扩展离调', '拡張された一時的転調', 'Extended tonicization'), t('直接转调', '直接転調', 'Direct modulation'), t('共同和弦', '共通和音', 'A pivot chord')] },
          { prompt: t('哪一种情况最清楚地是"转调"？', 'どれがいちばんはっきりした「転調」？', 'Which is most clearly a modulation?'), options: [t('用终止确立新调，之后继续留在新调', '終止で新しい調を確立し、その後も留まる', 'A cadence confirms the new key and the music stays there'), t('一个副属和弦接到它的目标', '副属が目標へ進む', 'One applied dominant to its target'), t('一个临时记号出现一次', '臨時記号が 1 回出る', 'One accidental appearing once')] },
        ],
        answer: 0,
        explain: t('离调与转调是一条谱的两端，中间是扩展离调；最清楚的转调要有终止确立新调并留在那里。', '一時的転調と転調は帯の両端、間が拡張された一時的転調。最もはっきりした転調は終止で確立し留まる。', 'They are poles of a spectrum with extended tonicization between; the clearest modulation cadences in the new key and stays.'),
      },
      G('b28x-g1', 'secondaryDominant', 2, ['spell']),
      G('b28x-g2', 'closelyRelated', 1, ['calc']),
    ],
  },
  pool: [G('b28x-p1', 'secondaryDominant', 3, ['spell']), G('b28x-p2', 'closelyRelated', 2, ['calc'])],
};

// ===================== B2-9x 半音化和声：混合、那不勒斯、增六 · 扩展关 =====================
// 对应 A 面：chromatic（借用和弦 / 那不勒斯六 / 三种增六 / 共同音减七）、支线 schemas2（小调的写法 / 按语境加七音 / 副属与三全音替代 / 后门进行与 line cliché）的进阶关
const CH = {
  C0: [48, 60, 64, 67], It: [44, 60, 66, 72], Fr: [44, 60, 62, 66], Ger: [44, 60, 63, 66], N6: [41, 61, 65, 68], iv: [41, 60, 65, 68],
  cad64: [43, 60, 64, 67], V: [43, 59, 62, 67], C: [36, 60, 64, 67], CTo7: [48, 63, 66, 69], Fm7: [41, 60, 63, 68], Bb7: [46, 58, 62, 68], Cmaj7: [36, 59, 64, 67],
  Dm: [38, 62, 65, 69], DmM7: [38, 61, 65, 69], Dm7: [38, 60, 65, 69], Dm6: [38, 59, 65, 69],
};
const ch = (...names) => ({ notes: names.map((n) => CH[n]), mode: 'chords' });
const cho = (n, label) => ({ label, notes: CH[n] });
const EXT_B2_9 = {
  minutes: 24,
  insight: t('半音化和弦大多是"借来的音"：le 从同主音小调借来，ra 造出那不勒斯六，le 和 fi 撑开增六度——音变了，功能常常没变。', '半音的和音の多くは「借りた音」：le は同主短調から、ra がナポリの六をつくり、le と fi が増 6 度を広げる——音が変わっても機能はたいてい同じ。', 'Most chromatic chords are made of borrowed notes: le from the parallel minor, ra building the Neapolitan, le and fi opening the augmented sixth — the notes change, the function often does not.'),
  sections: {
    discover: [
      {
        id: 'b29x-d1', type: 'discover', ref: ['wiki-augmented-sixth', 'omt2e-aug6'],
        prompt: t('C 调：A♭–C–E♭–F♯（德国增六）听起来和 A♭7（A♭–C–E♭–G♭）一模一样。可它为什么要写成 F♯ 而不是 G♭？', 'ハ調：A♭–C–E♭–F♯（ドイツの増六）は A♭7（A♭–C–E♭–G♭）とまったく同じ響き。なぜ G♭ でなく F♯ と書く？', 'In C: A♭–C–E♭–F♯ (a German sixth) sounds exactly like A♭7 (A♭–C–E♭–G♭). Why is it spelled F♯, not G♭?'),
        play: [{ label: t('增六 → 终止四六 → V', '増六 → 終止の四六 → V', 'Ger⁺⁶ → cad.⁶₄ → V'), audio: ch('Ger', 'cad64', 'V') }],
        options: [t('因为 A♭ 和 F♯ 要向外各走半音，张开到两个 G', 'A♭ と F♯ が外へ半音ずつ進み、2 つの G に開くから', 'Because A♭ and F♯ move outward by half step, opening to two Gs'), t('因为 F♯ 比较好读', 'F♯ のほうが読みやすいから', 'Because F♯ is easier to read'), t('两种写法没有区别', '違いはない', 'There is no difference')],
        answer: 0,
        insight: {
          title: t('拼法告诉你往哪里走', '綴りが行き先を示す', 'The spelling shows where it goes'),
          text: t('增六度 A♭–F♯ 向外各走半音，张开成八度的 sol（G）；写成小七度 A♭–G♭ 就看不出这种张开。所以德国增六和属七同音，功能却不同。直接到 V 容易出平行五度——这种平行叫"莫扎特五度"，共性写作时期偶尔被接受；先到终止四六就能避开。', '増 6 度 A♭–F♯ は外へ半音ずつ進んでオクターヴの sol（G）に開く。短 7 度 A♭–G♭ と書いてはこの開きが見えない。だからドイツの増六は属七と同じ音でも機能が違う。直接 V へ行くと平行 5 度になりやすい——「モーツァルトの 5 度」と呼ばれ、共通慣習期にときどき許された。終止の四六を経れば避けられる。', 'The augmented sixth A♭–F♯ opens outward by half step to an octave sol (G); spelled as a minor seventh A♭–G♭ the opening would vanish. So the German sixth shares the dominant seventh’s notes but not its function. Going straight to V invites parallel fifths — “Mozart fifths”, occasionally accepted in common-practice music; passing through the cadential six-four avoids them.'),
        },
      },
    ],
    explain: [
      {
        id: 'b29x-e1', type: 'page', ref: ['omt2e-mixture', 'omt-pb-substitutions'],
        title: t('进阶 1 · 借用和弦：改性质，不改功能', '発展 1・借用和音：種類を変え、機能は変えない', 'Advanced 1 · Borrowed chords: new quality, same function'),
        text: [
          t('调式混合是从同主音调借音，大调借小调要常见得多。借来的音改变和弦的性质，却不改变它的功能。它可以只出现在旋律里，也可以是一个或几个和弦，甚至是扩展离调或转调。最常见的是只用 le（降低的第六级）的下属和弦：ii°⁶、iiø⁷、iv。根音被降低的借用和弦，罗马数字前加 ♭，例如 ♭VI。', '旋法の混合は同主調から音を借りること。長調が短調から借りるほうがずっと多い。借りた音は和音の種類を変えるが機能は変えない。旋律だけのことも、1 つ以上の和音のことも、拡張された一時的転調や転調のこともある。最も多いのは le（下げた第 6 音）だけを使う前属：ii°⁶・iiø⁷・iv。根音が下がった借用和音はローマ数字の前に ♭（♭VI など）。', 'Modal mixture borrows notes from the parallel key, far more often major borrowing from minor. Borrowed notes change a chord’s quality but not its function. Mixture can colour a melody, one or more chords, or an extended tonicization or modulation. The commonest are predominants using only le (lowered 6): ii°⁶, iiø⁷, iv. Chords with lowered roots take a flat before the numeral, e.g. ♭VI.'),
          t('I 换成 i 很常见，V 换成 v 却不常见——大调里出现 v，更可能是扩展离调或转调。小调里唯一常见的混合用法是皮卡第三度：以大三和弦的主和弦结束；这个名字的来源不明，它在 16、17 世纪很常见，到 18、19 世纪就少了。爵士里最常见的混合是用 iiø⁷ 代替 ii⁷、在 V⁷ 上加 ♭9——都是用 le 代替 la；Cole Porter 的《All of You》（Ella Fitzgerald 唱，C 大调）里 A♮ 和 A♭ 的交替特别抓耳。', 'I を i に替えるのはよくあるが、V を v に替えるのは少ない——長調の v は拡張された一時的転調か転調のことが多い。短調で唯一よくある混合はピカルディの 3 度：長三和音の主和音で終わる。名前の由来は不明で、16・17 世紀によく使われ、18・19 世紀には減った。ジャズで最も多い混合は ii⁷ の代わりに iiø⁷、V⁷ に ♭9——どちらも la の代わりに le。コール・ポーター《All of You》（エラ・フィッツジェラルド、ハ長調）では A♮ と A♭ の交替が耳を引く。', 'Swapping I for i is common, V for v is not — a v in major more likely signals extended tonicization or modulation. The one common mixture in minor is the Picardy third, ending on a major tonic; the name’s origin is unknown, and it was common in the 16th and 17th centuries but faded in the 18th and 19th. In jazz the commonest mixture is iiø⁷ for ii⁷ and ♭9 on V⁷ — both le for la; Cole Porter’s “All of You” (Ella Fitzgerald, in C) catches the ear by alternating A♮ and A♭.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['D4', 'F4', 'A4'], 0, { label: 'ii' }), ...col(['F4', 'Ab4', 'D5'], 1, { label: 'ii°⁶', lit: true }), ...col(['F4', 'A4', 'C5'], 2, { label: 'IV' }), ...col(['F4', 'Ab4', 'C5'], 3, { label: 'iv', lit: true })], cols: 4 },
      },
      {
        id: 'b29x-e2', type: 'discover', practice: true, ref: 'omt2e-mixture',
        prompt: t('C 大调的乐曲里，一段出现了好几次 Gm（v）。最可能是？', 'ハ長調の曲で Gm（v）が何度も出る部分。最もありそうなのは？', 'In a C major piece, Gm (v) appears several times in a passage. Most likely it is…'),
        options: [t('扩展离调或转调（例如往 F 大调去）', '拡張された一時的転調か転調（ヘ長調へなど）', 'An extended tonicization or modulation (e.g. toward F)'), t('一个普通的借用属和弦', 'ふつうの借用の属', 'An ordinary borrowed dominant'), t('皮卡第三度', 'ピカルディの 3 度', 'A Picardy third')],
        answer: 0,
        insight: { title: t('V 换成 v 不常见', 'V を v にするのは珍しい', 'V to v is uncommon'), text: t('借用通常改下属和主和弦；大调里反复出现 v，更像离开了原调。', '借用はふつう前属や主和音を変える。長調で v が何度も出るなら、元の調を離れている可能性が高い。', 'Mixture usually alters predominants and the tonic; a recurring v in major suggests leaving the key.') },
      },
      {
        id: 'b29x-e3', type: 'page', ref: ['omt2e-neapolitan', 'wiki-augmented-sixth', 'omt2e-aug6'],
        title: t('进阶 2、3 · 那不勒斯六与三种增六', '発展 2・3・ナポリの六と 3 種の増六', 'Advanced 2–3 · The Neapolitan and three augmented sixths'),
        text: [
          t('那不勒斯六（♭II⁶）建在 ra（降二级）上，是大三和弦，通常第一转位，属于下属功能：把 ii°⁶ 里的 re 降成 ra 就得到它；ra 往下走到 ti。它常直接走 V（可以加终止四六），也常在中间插一个 vii°⁷/V。', 'ナポリの六（♭II⁶）は ra（下げた第 2 音）上の長三和音で、ふつう第 1 転回、前属機能：ii°⁶ の re を ra に下げれば得られる。ra は ti へ下りる。よく直接 V へ（終止の四六を加えてもよい）、間に vii°⁷/V をはさむことも。', 'The Neapolitan sixth (♭II⁶) is a major triad on ra (lowered 2), usually in first inversion, with predominant function: lower ii°⁶’s re to ra. Ra falls to ti. It often goes straight to V (perhaps via a cadential six-four), or through vii°⁷/V.'),
          t('增六和弦都含有 le 与 fi（升四级）之间的增六度，向外各走半音解决到 V 的 sol；它们在小调里更常见，大调里借用 le 来用。C 调：意大利六 A♭–C–F♯（和不完全的属七同音）；法国六 A♭–C–D–F♯（四个音都在同一个全音音阶里，带有 19 世纪法国音乐、特别是印象派的色彩，在俄罗斯音乐里也常见——舒伯特《美丽的磨坊女》"Am Feierabend"里就有）；德国六 A♭–C–E♭–F♯（和属七同音，常见于贝多芬和拉格泰姆）。三个名字以国家命名，可来源众说纷纭；Kostka 与 Payne 说意大利六这个名字"没有历史依据，只是方便的传统标签"。', '増六の和音はどれも le と fi（上げた第 4 音）の間の増 6 度を含み、外へ半音ずつ進んで V の sol へ解決する。短調で多く、長調では le を借りて使う。ハ調：イタリアの六 A♭–C–F♯（不完全な属七と同じ音）、フランスの六 A♭–C–D–F♯（4 音とも同じ全音音階にあり、19 世紀フランス音楽、とくに印象派の色、ロシア音楽にも多い——シューベルト《美しき水車小屋の娘》「Am Feierabend」にある）、ドイツの六 A♭–C–E♭–F♯（属七と同じ音、ベートーヴェンやラグタイムに多い）。国の名がついているが由来は諸説あり、コストカとペインはイタリアの六という名を「歴史的根拠はなく、便利な慣習的ラベルにすぎない」と言う。', 'Augmented sixth chords all contain the augmented sixth between le and fi (raised 4), opening outward by half step to V’s sol; commoner in minor, borrowed via le in major. In C: Italian A♭–C–F♯ (enharmonic with an incomplete dominant seventh); French A♭–C–D–F♯ (all in one whole-tone scale, the colour of 19th-century French music, especially Impressionism, and frequent in Russian music — as in Schubert’s “Am Feierabend” from Die schöne Müllerin); German A♭–C–E♭–F♯ (enharmonic with a dominant seventh, frequent in Beethoven and ragtime). Despite the national names their origins are disputed; Kostka and Payne call “Italian sixth” “simply a convenient and traditional label” with no historical authenticity.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes: [{ p: 'F#4', d: 'w', s: 0, col: 0, label: 'It' }, { p: 'C4', d: 'w', s: 1, col: 0 }, { p: 'Ab2', d: 'w', s: 1, col: 0 }, { p: 'F#4', d: 'w', s: 0, col: 1, label: 'Fr' }, { p: 'D4', d: 'w', s: 0, col: 1 }, { p: 'C4', d: 'w', s: 1, col: 1 }, { p: 'Ab2', d: 'w', s: 1, col: 1 }, { p: 'F#4', d: 'w', s: 0, col: 2, label: 'Ger' }, { p: 'Eb4', d: 'w', s: 0, col: 2 }, { p: 'C4', d: 'w', s: 1, col: 2 }, { p: 'Ab2', d: 'w', s: 1, col: 2 }], cols: 3 },
      },
      {
        id: 'b29x-e4', type: 'discover', practice: true, ref: 'wiki-augmented-sixth',
        prompt: t('哪一种增六和弦的四个音都在同一个全音音阶里？', '4 音とも同じ全音音階にある増六は？', 'Which augmented sixth has all its notes in one whole-tone scale?'),
        options: [t('法国增六（A♭ C D F♯）', 'フランスの六（A♭ C D F♯）', 'The French sixth (A♭ C D F♯)'), t('德国增六', 'ドイツの六', 'The German sixth'), t('意大利增六', 'イタリアの六', 'The Italian sixth')],
        answer: 0,
        insight: { title: t('A♭ C D F♯ 每两个相隔全音', 'A♭ C D F♯ は全音ずつ', 'A♭ C D F♯ are whole steps apart'), text: t('A♭–(B♭)–C–D–(E)–F♯：都在同一个全音音阶里，所以法国六有印象派的色彩。', 'A♭–(B♭)–C–D–(E)–F♯：同じ全音音階に入るので、フランスの六は印象派の色をもつ。', 'A♭–(B♭)–C–D–(E)–F♯: one whole-tone scale, hence the French sixth’s Impressionist colour.') },
      },
      {
        id: 'b29x-e5', type: 'page', ref: 'omt2e-common-tone',
        title: t('进阶 4 · 共同音和弦：同样的音，只是装饰', '発展 4・共通音和音：同じ音、ただの装飾', 'Advanced 4 · Common-tone chords: same notes, mere decoration'),
        text: [
          t('共同音减七（CTº7）和共同音增六（CT+6）跟 vii°⁷、德国增六的音一样，用法却完全不同：它们不推动和声前进，只是装饰接下来的那个和弦——通常是大三和弦（I 或 V），有时是属七。名字里的"共同音"是说它们含有被装饰和弦的根音；vii°⁷ 和德国六就不含。', '共通音減七（CTº7）と共通音増六（CT+6）は vii°⁷・ドイツの六と同じ音だが使い方がまったく違う：和声を進めず、続く和音を飾るだけ——ふつう長三和音（I か V）、ときに属七。「共通音」は飾られる和音の根音を含むことを指す。vii°⁷ やドイツの六は含まない。', 'Common-tone diminished sevenths (CTº7) and common-tone augmented sixths (CT+6) share pitches with vii°⁷ and the German sixth but work differently: they do not drive the harmony, they decorate the next chord — usually a major triad (I or V), sometimes a dominant seventh. “Common tone” means they contain the embellished chord’s root, which vii°⁷ and the German sixth do not.'),
          t('它们其实是几个同时出现的邻音叠在一起的结果：C 大三和弦写四部时常重复五音 G：E 下邻到 D♯，两个 G 一个下邻到 F♯、一个上邻到 A，叠起来就是全减七 C–D♯–F♯–A，而根音 C 一直保留。硬把它分析成某个 vii°⁷，会得到一个根本不存在的目标和弦，所以不如直接叫 CTº7。四部写作时常重复被装饰和弦的五音。', '実はいくつかの同時の隣接音が重なった結果：C の長三和音を 4 声で書くと第 5 音 G をよく重複する：E は D♯ へ下隣、2 つの G の一方は F♯ へ下隣、他方は A へ上隣。重ねると完全減七 C–D♯–F♯–A になり、根音 C はずっと保たれる。無理にある vii°⁷ と分析すると、存在しない目標の和音が出てくるので、素直に CTº7 と呼ぶ。4 声体では飾られる和音の第 5 音をよく重複する。', 'They arise from several simultaneous neighbour tones: C major in four parts often doubles the fifth G: E dips to D♯, one G dips to F♯ and the other rises to A, adding up to the fully diminished C–D♯–F♯–A while the root C stays put. Forcing it into some vii°⁷ yields a target chord that is not there, so call it CTº7. In four parts the embellished chord’s fifth is often doubled.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['C4', 'E4', 'G4'], 0), ...col(['C4', 'D#4', 'F#4', 'A4'], 1, { lit: true, label: 'CTº7' }), ...col(['C4', 'E4', 'G4'], 2)], cols: 3 },
      },
      {
        id: 'b29x-e6', type: 'discover', practice: true, ref: 'omt2e-common-tone',
        prompt: t('C 大三和弦 → C–D♯–F♯–A → C 大三和弦。中间的减七和弦是什么？', 'C 長三和音 → C–D♯–F♯–A → C 長三和音。真ん中の減七は？', 'C major → C–D♯–F♯–A → C major. What is the middle diminished seventh?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: ch('C0', 'CTo7', 'C0') }],
        options: [t('共同音减七：只装饰 C 和弦（C 一直保留）', '共通音減七：C の和音を飾るだけ（C は保たれる）', 'A common-tone diminished seventh: it just decorates C (C held throughout)'), t('vii°⁷/V，走向 G', 'vii°⁷/V、G へ', 'vii°⁷/V heading to G'), t('那不勒斯六', 'ナポリの六', 'A Neapolitan sixth')],
        answer: 0,
        insight: { title: t('含有被装饰和弦的根音', '飾られる和音の根音を含む', 'It contains the embellished chord’s root'), text: t('C 一直在，其他声部做邻音再回来：这是装饰，不是去别的和弦。', 'C はずっとあり、ほかの声部が隣接音で戻る：装飾であって、ほかの和音へは行かない。', 'C stays while the other voices neighbour and return: decoration, not progression.') },
      },
      {
        id: 'b29x-e7', type: 'page', ref: ['omt-pb-substitutions', 'wiki-backdoor', 'djangobooks-line-cliche'],
        title: t('支线 · 爵士里的借用与替代：后门、三全音、line cliché', '支線・ジャズの借用と代理：裏口・三全音・ラインクリシェ', 'Side quest · Borrowing and substitution in jazz: backdoor, tritone, line cliché'),
        text: [
          t('后门进行 iv⁷–♭VII⁷–I（Jerry Coker 的说法，也叫"后门 ii–V"）：相对于 ii–V–I 这个"前门"，它从后门回家。♭VII⁷ 借自同主音小调，是属七，所以能解决到 I；常见的走法是 IV–iv–♭VII⁷–I。C 大调里 G7（G B D F）和 B♭7（B♭ D F A♭）有两个共同音；A♭ 和 F 作为"上导音"分别落到 G 和 E。还有"后门 IV–V"：♭VI maj7–♭VII⁷–I，也被叫作 Mario cadence。', '裏口進行 iv⁷–♭VII⁷–I（ジェリー・コーカーの呼び名、「裏口の ii–V」とも）：ii–V–I という「表口」に対して裏口から家へ帰る。♭VII⁷ は同主短調から借りた属七なので I へ解決できる。よくあるのは IV–iv–♭VII⁷–I。ハ長調の G7（G B D F）と B♭7（B♭ D F A♭）は共通音が 2 つ。A♭ と F は「上の導音」として G と E へ下りる。「裏口の IV–V」♭VI maj7–♭VII⁷–I もあり、Mario cadence とも呼ばれる。', 'The backdoor progression iv⁷–♭VII⁷–I (Jerry Coker’s term, also the “backdoor ii–V”) comes home by the back door rather than the ii–V–I “front door”. ♭VII⁷, borrowed from the parallel minor, is a dominant seventh and can resolve to I; a common route is IV–iv–♭VII⁷–I. In C, G7 (G B D F) and B♭7 (B♭ D F A♭) share two tones; A♭ and F act as upper leading tones falling to G and E. There is also a backdoor IV–V: ♭VI maj7–♭VII⁷–I, also called the Mario cadence.'),
          t('三全音替代是爵士独有的：任何属七都能换成相隔三全音的属七（G7 → D♭7），因为两者相隔三全音、而且共用同一个三全音（B–F = C♭–F），进行的功能不变；认它最可靠的特征是向下半音解决（D♭7 → C）。小调的 line cliché（min、min/maj7、min7、min6）在一个小三和弦上做一条从主音开始半音下行到小六度的线（D 小调 D–C♯–C–B），Django Reinhardt 常用，今天的 Gypsy 爵士吉他手更常用；这里的 6 是加六度，不是古典的第一转位。', '三全音代理（裏コード）はジャズ独自：どの属七も三全音離れた属七に替えられる（G7 → D♭7）。三全音離れていて同じ三全音（B–F = C♭–F）を共有するので、進行の機能は変わらない。いちばん確かな目印は半音下行の解決（D♭7 → C）。短調のラインクリシェ（min・min/maj7・min7・min6）は短三和音の上で主音から短 6 度まで半音下行する線（ニ短調 D–C♯–C–B）、ジャンゴ・ラインハルトがよく使い、今のジプシー・ジャズのギタリストはさらによく使う。この 6 は付加 6 で、古典の第 1 転回ではない。', 'The tritone substitution is unique to jazz: any dominant seventh can be replaced by the one a tritone away (G7 → D♭7), because they are a tritone apart and share the same tritone (B–F = C♭–F), so the progression functions the same; its surest sign is resolution down by half step (D♭7 → C). The minor line cliché (min, min/maj7, min7, min6) runs a chromatic line from the tonic down to the minor sixth over one minor chord (in D minor D–C♯–C–B) — a Django Reinhardt favourite, even commoner among today’s Gypsy-jazz guitarists; that 6 is an added sixth, not a classical first inversion.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('后门', '裏口', 'backdoor'), cells: ['Fm7', 'B♭7', 'Cmaj7'] }, { label: 'line cliché', cells: ['Dm', 'Dm(maj7)', 'Dm7', 'Dm6'] }] },
      },
      {
        id: 'b29x-e8', type: 'discover', practice: true, ref: 'wiki-backdoor',
        prompt: t('听：Fm7 – B♭7 – Cmaj7。这叫什么？B♭7 里哪两个音和 G7 共有？', '聴いて：Fm7 – B♭7 – Cmaj7。これは何？ B♭7 と G7 の共通音は？', 'Listen: Fm7 – B♭7 – Cmaj7. What is it, and which two tones does B♭7 share with G7?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: ch('Fm7', 'Bb7', 'Cmaj7') }],
        options: [t('后门进行；D 与 F', '裏口進行。D と F', 'The backdoor progression; D and F'), t('三全音替代；B 与 F', '三全音代理。B と F', 'A tritone substitution; B and F'), t('安达卢西亚进行；C 与 G', 'アンダルシア進行。C と G', 'The Andalusian cadence; C and G')],
        answer: 0,
        insight: { title: t('从后门回家', '裏口から家へ', 'Home by the back door'), text: t('iv⁷–♭VII⁷–I；B♭ D F A♭ 与 G B D F 共有 D、F，A♭ 落到 G、F 落到 E。', 'iv⁷–♭VII⁷–I。B♭ D F A♭ と G B D F は D・F を共有し、A♭ は G へ、F は E へ。', 'iv⁷–♭VII⁷–I; B♭ D F A♭ and G B D F share D and F, with A♭ falling to G and F to E.') },
      },
    ],
    experiment: [
      { id: 'b29x-x1', type: 'experiment', toy: 'progression', ref: ['wiki-augmented-sixth', 'omt2e-neapolitan', 'omt2e-mixture'],
        prompt: t('C → 下属 → （终止四六）→ V → I。第二格换成借用的 iv、那不勒斯六、意大利六、法国六、德国六；第三格选终止四六或直接到 V。哪一种最"紧"？德国六直接到 V 时，留意平行五度。', 'C → 前属 →（終止の四六）→ V → I。2 番目を借用の iv・ナポリの六・イタリア・フランス・ドイツの六に替え、3 番目は終止の四六か直接 V。どれがいちばん「緊張」する？ ドイツの六から直接 V なら平行 5 度に注意。', 'C → predominant → (cadential six-four) → V → I. Swap slot 2 for borrowed iv, the Neapolitan, or the Italian, French, German sixth; slot 3 is the cadential six-four or straight to V. Which is tightest? Going German sixth straight to V, listen for parallel fifths.'),
        params: { gap: 820, slots: [
          { options: [cho('C0', 'I')] },
          { options: [cho('iv', 'iv'), cho('N6', '♭II⁶'), cho('It', 'It⁺⁶'), cho('Fr', 'Fr⁺⁶'), cho('Ger', 'Ger⁺⁶')] },
          { options: [cho('cad64', 'cad.⁶₄'), cho('V', 'V')] },
          { options: [cho('V', 'V')] },
          { options: [cho('C', 'I')] },
        ], presets: [
          { label: t('借用 iv', '借用 iv', 'Borrowed iv'), picks: [0, 0, 1, 0, 0], explain: t('F–A♭–C：le 带来暗色，功能仍是下属。', 'F–A♭–C：le が暗さを加えるが機能は前属のまま。', 'F–A♭–C: le darkens it, still a predominant.') },
          { label: t('那不勒斯六', 'ナポリの六', 'Neapolitan'), picks: [0, 1, 0, 0, 0], explain: t('D♭ 往下走到 B（ra → ti），中间可以经过终止四六。', 'D♭ は B へ下りる（ra → ti）、終止の四六を経てもよい。', 'D♭ falls to B (ra → ti), here via the cadential six-four.') },
          { label: t('法国六', 'フランスの六', 'French'), picks: [0, 3, 1, 0, 0], explain: t('A♭ C D F♯：全音音阶的色彩。', 'A♭ C D F♯：全音音階の色。', 'A♭ C D F♯: whole-tone colour.') },
          { label: t('德国六 → 终止四六', 'ドイツの六 → 終止の四六', 'German → cad.⁶₄'), picks: [0, 4, 0, 0, 0], explain: t('先到终止四六，避开"莫扎特五度"。', '終止の四六を経て「モーツァルトの 5 度」を避ける。', 'Via the cadential six-four, avoiding “Mozart fifths”.') },
        ] },
        breakthrough: { id: 'b29x-colors', text: t('你比较了五种下属色彩，听出它们都往同一个 V 去。', '5 つの前属の色を比べ、どれも同じ V へ向かうのを聴き取った。', 'You compared five predominant colours and heard them all head for the same V.') } },
    ],
    challenge: [
      {
        id: 'b29x-c1', type: 'choice', error: 'wrong-chord', skills: ['spell'], ref: ['wiki-augmented-sixth', 'omt2e-aug6'],
        variants: [
          { prompt: t('A 小调的德国增六是？', 'イ短調のドイツの六は？', 'The German sixth in A minor is…'), options: ['F A C D♯', 'F A C D', 'F A♭ C D♯', 'F A C E♭'] },
          { prompt: t('G 调的意大利增六是？', 'ト調のイタリアの六は？', 'The Italian sixth in G is…'), options: ['E♭ G C♯', 'E♭ G C', 'E G C♯', 'E♭ G B♭ C♯'] },
          { prompt: t('D 调的法国增六是？', 'ニ調のフランスの六は？', 'The French sixth in D is…'), options: ['B♭ D E G♯', 'B♭ D F G♯', 'B D E G♯', 'B♭ D E G'] },
        ],
        answer: 0,
        explain: t('都从 le（降六级）开始：意大利 le–do–fi；法国再加 re；德国再加 me。', 'どれも le（下げた第 6 音）から：イタリア le–do–fi、フランスは re を、ドイツは me を加える。', 'All start on le: Italian le–do–fi; French adds re; German adds me.'),
      },
      {
        id: 'b29x-c2', type: 'choice', error: 'wrong-function', skills: ['function'], ref: ['omt2e-mixture', 'omt2e-neapolitan', 'omt2e-common-tone'],
        variants: [
          { prompt: t('借用和弦改变了什么？', '借用和音が変えるのは？', 'What does a borrowed chord change?'), options: [t('性质，不改变功能', '種類（機能は変えない）', 'Its quality, not its function'), t('功能，不改变性质', '機能（種類は変えない）', 'Its function, not its quality'), t('都改变', '両方', 'Both')] },
          { prompt: t('那不勒斯六的 ra 往哪里解决？', 'ナポリの六の ra の解決先は？', 'Where does the Neapolitan’s ra resolve?'), options: [t('往下到 ti', '下へ ti', 'Down to ti'), t('往上到 re', '上へ re', 'Up to re'), t('保持', 'そのまま', 'It stays')] },
          { prompt: t('共同音减七和 vii°⁷ 的区别？', '共通音減七と vii°⁷ の違いは？', 'How does a CTº7 differ from vii°⁷?'), options: [t('音一样，但它含有被装饰和弦的根音，只起装饰作用', '音は同じだが飾られる和音の根音を含み、装飾だけ', 'Same notes, but it contains the embellished root and only decorates'), t('音完全不同', '音がまったく違う', 'Completely different notes'), t('它有属功能', '属機能をもつ', 'It has dominant function')] },
        ],
        answer: 0,
        explain: t('混合改性质不改功能；ra 下行到 ti；CTº7 含被装饰和弦的根音、只是装饰。', '混合は種類を変え機能は変えない。ra は ti へ。CTº7 は飾られる和音の根音を含み装飾だけ。', 'Mixture changes quality, not function; ra falls to ti; a CTº7 contains the embellished root and merely decorates.'),
      },
      {
        id: 'b29x-c3', type: 'listen', error: 'wrong-chord', skills: ['hearing'], ref: ['wiki-augmented-sixth', 'omt2e-neapolitan', 'omt2e-mixture'],
        prompt: t('听：第二个和弦是哪一种？', '聴いて：2 つ目の和音はどれ？', 'Listen: which is the second chord?'),
        options: [t('借用 iv', '借用 iv', 'Borrowed iv'), t('那不勒斯六', 'ナポリの六', 'Neapolitan sixth'), t('意大利增六', 'イタリアの六', 'Italian sixth'), t('德国增六', 'ドイツの六', 'German sixth')],
        variants: [
          { play: [{ label: t('播放', '再生', 'Play'), audio: ch('C0', 'iv', 'V', 'C') }], answer: 0 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: ch('C0', 'N6', 'V', 'C') }], answer: 1 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: ch('C0', 'It', 'V', 'C') }], answer: 2 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: ch('C0', 'Ger', 'cad64', 'V', 'C') }], answer: 3 },
        ],
        explain: t('听低音和外声部：增六的低音 A♭ 和上方 F♯ 向外张开到 G；那不勒斯六的 D♭ 往下到 B；借用 iv 的 A♭ 往下到 G。', 'バスと外声を聴く：増六はバス A♭ と上の F♯ が G へ開く。ナポリの六は D♭ が B へ。借用 iv は A♭ が G へ。', 'Listen to bass and outer voices: augmented sixths open A♭ and F♯ out to G; the Neapolitan’s D♭ falls to B; the borrowed iv’s A♭ falls to G.'),
        breakthrough: { id: 'b29x-hear', text: t('你用耳朵分出了几种半音化下属。', '半音的な前属をいくつか耳で聞き分けた。', 'You told chromatic predominants apart by ear.') },
      },
      {
        id: 'b29x-c4', type: 'choice', error: 'substitution', skills: ['function'], ref: ['omt-pb-substitutions', 'wiki-backdoor', 'djangobooks-line-cliche'],
        variants: [
          { prompt: t('A7 的三全音替代是？', 'A7 の三全音代理は？', 'The tritone substitute for A7 is…'), options: ['E♭7', 'D7', 'E7', 'B♭7'] },
          { prompt: t('后门进行 iv⁷–♭VII⁷–I 在 G 大调是？', 'ト長調の裏口進行 iv⁷–♭VII⁷–I は？', 'The backdoor progression in G major is…'), options: ['Cm7 – F7 – Gmaj7', 'Am7 – D7 – Gmaj7', 'C7 – F7 – G7', 'Cmaj7 – F7 – Gmaj7'] },
          { prompt: t('A 小调 line cliché 的那条线是？', 'イ短調のラインクリシェの線は？', 'The line in an A minor line cliché is…'), options: ['A – G♯ – G – F♯', 'A – B – C – D', 'A – G – F – E', 'A – A♯ – B – C'] },
        ],
        answer: 0,
        explain: t('三全音替代 = 相隔三全音的属七（A7 → E♭7）；后门 = iv⁷–♭VII⁷–I；line cliché 从主音半音下行到小六度。', '三全音代理 = 三全音離れた属七（A7 → E♭7）。裏口 = iv⁷–♭VII⁷–I。ラインクリシェは主音から短 6 度まで半音下行。', 'Tritone sub = the dominant seventh a tritone away (A7 → E♭7); backdoor = iv⁷–♭VII⁷–I; the line cliché falls chromatically from the tonic to the minor sixth.'),
      },
      {
        id: 'b29x-c5', type: 'choice', error: 'concept', skills: ['identify'], ref: ['wiki-augmented-sixth', 'omt2e-mixture'],
        variants: [
          { prompt: t('德国增六直接接 V 时容易出现的问题叫？', 'ドイツの六から直接 V で起こりやすい問題は？', 'Going straight from a German sixth to V risks…'), options: [t('莫扎特五度（平行五度）', 'モーツァルトの 5 度（平行 5 度）', 'Mozart fifths (parallel fifths)'), t('声部交叉', '声部交差', 'Voice crossing'), t('导音重复', '導音の重複', 'A doubled leading tone')] },
          { prompt: t('意大利增六这个名字，Kostka 与 Payne 怎么说？', 'イタリアの六という名前についてコストカとペインは？', 'What do Kostka and Payne say about the name “Italian sixth”?'), options: [t('没有历史依据，只是方便的传统标签', '歴史的根拠はなく、便利な慣習的ラベル', 'No historical authenticity — just a convenient traditional label'), t('因为它在意大利发明', 'イタリアで発明されたから', 'Because it was invented in Italy'), t('因为它只出现在歌剧里', 'オペラにしか出ないから', 'Because it only appears in opera')] },
          { prompt: t('皮卡第三度在哪两个世纪最常见？', 'ピカルディの 3 度が最も多かったのは？', 'When was the Picardy third most common?'), options: [t('16、17 世纪', '16・17 世紀', 'The 16th and 17th centuries'), t('18、19 世纪', '18・19 世紀', 'The 18th and 19th centuries'), t('20 世纪', '20 世紀', 'The 20th century')] },
        ],
        answer: 0,
        explain: t('德国六 → V 容易出莫扎特五度，先到终止四六可避开；意大利六名字没有历史依据；皮卡第三度 16、17 世纪最常见。', 'ドイツの六 → V はモーツァルトの 5 度になりやすく、終止の四六を経れば避けられる。イタリアの六の名に歴史的根拠はない。ピカルディの 3 度は 16・17 世紀に多い。', 'German sixth to V risks Mozart fifths, avoided via the cadential six-four; “Italian sixth” has no historical basis; the Picardy third flourished in the 16th–17th centuries.'),
      },
      G('b29x-g1', 'neapolitan', 1, ['spell']),
      G('b29x-g2', 'tritoneSub', 1, ['function']),
    ],
  },
  pool: [G('b29x-p1', 'neapolitan', 2, ['spell']), G('b29x-p2', 'tritoneSub', 2, ['function']), G('b29x-p3', 'secondaryDominant', 2, ['spell'])],
};

// ===================== B2-10x 五度圈与调关系 · 扩展关 =====================
// 对应 A 面：circle（读调号 / 关系调、同主音调与近关系调 / 转动：五度、四度与角度 / 轴心体系）的进阶关
const AX = { C: [48, 60, 64, 67], G7: [43, 59, 62, 65], Db7: [49, 59, 65, 68], E7: [40, 59, 62, 68], Bb7: [46, 58, 62, 68], Dm7: [38, 60, 65, 69], Cend: [36, 60, 64, 72] };
const axo = (n, label) => ({ label, notes: AX[n] });
const EXT_B2_10 = {
  minutes: 21,
  insight: t('五度圈既是调号的地图，也是和声距离的地图：近关系调挤在一起，转 90° 是小三度、转 180° 是三全音——Lendvai 甚至在这些角度上看出了"代替"的关系。', '五度圏は調号の地図であり和声的距離の地図：近親調は固まり、90° 回せば短 3 度、180° で三全音——レンドヴァイはこの角度に「代理」の関係まで見た。', 'The circle of fifths maps both key signatures and harmonic distance: close keys cluster, a 90° turn is a minor third, 180° a tritone — and Lendvai even read substitution into those angles.'),
  sections: {
    discover: [
      {
        id: 'b210x-d1', type: 'discover', ref: 'wiki-circle-of-fifths',
        prompt: t('从 C 开始，一个接一个叠 12 个音程比正好是 3 : 2 的纯律五度。最后能正好回到 C 吗？', 'C から周波数比ちょうど 3 : 2 の純正 5 度を 12 個重ねる。最後にぴったり C に戻る？', 'Starting on C, stack twelve just fifths of exactly 3 : 2. Do you land exactly back on C?'),
        options: [t('不能：会多出一点点（毕达哥拉斯音差）', '戻らない：少し高くなる（ピタゴラス・コンマ）', 'No: it overshoots slightly (the Pythagorean comma)'), t('能，正好回到 C', 'ぴったり戻る', 'Yes, exactly'), t('会低半音', '半音低くなる', 'It lands a half step low')],
        answer: 0,
        insight: {
          title: t('圈其实合不上', '円は本当は閉じない', 'The circle does not really close'),
          text: t('12 个 3 : 2 的纯五度会比起点高出一点点，叫毕达哥拉斯音差，移调和转调时就会出问题。于是人们发明了"调整"五度的律制——历史上的各种良律和今天的十二平均律——让一串五度能回到起点，五度圈才真正闭合。', '3 : 2 の純正 5 度を 12 個重ねると出発点より少し高くなる——ピタゴラス・コンマ。移調や転調で問題になる。そこで 5 度を「調整（テンパー）」する音律——歴史上のウェル・テンペラメントや今の 12 平均律——が考えられ、5 度の連なりが出発点に戻り、五度圏が本当に閉じる。', 'Twelve 3 : 2 fifths overshoot the start slightly — the Pythagorean comma — which causes trouble when transposing or modulating. Tuning systems that temper the fifth — historical well temperaments and today’s twelve-tone equal temperament — bring the chain back to its start so the circle truly closes.'),
        },
      },
    ],
    explain: [
      {
        id: 'b210x-e1', type: 'page', ref: 'wiki-circle-of-fifths',
        title: t('进阶 · 五度圈从哪里来', '発展・五度圏はどこから来たか', 'Advanced · Where the circle came from'),
        text: [
          t('五度圈是 1600 年代末到 1700 年代初发展起来的，用来说明巴洛克时代的转调。第一张五度圈图出现在作曲家、理论家 Mykola Dyletsky 的《Grammatika》（1677）里——它想教俄罗斯读者用西方的方式写复调。1711 年，Johann David Heinichen 在《Neu erfundene und gründliche Anweisung》里画了一个"音乐圆圈"（Musicalischer Circul），1728 年又收进《Der General-Bass in der Composition》。', '五度圏は 1600 年代末〜1700 年代初めに、バロックの転調を説明するために発達した。最初の図は作曲家・理論家ミコラ・ジレツキー『グラマティカ』（1677）にあり、ロシアの読者に西洋式の多声音楽の書き方を教えるためのもの。1711 年、ヨハン・ダーフィト・ハイニヒェンが『Neu erfundene und gründliche Anweisung』で「音楽の円」（Musicalischer Circul）を描き、1728 年の『Der General-Bass in der Composition』にも収めた。', 'The circle of fifths developed in the late 1600s and early 1700s to theorise Baroque modulation. The first diagram appears in the Grammatika (1677) of composer-theorist Mykola Dyletsky, meant to teach a Russian audience Western-style polyphony. In 1711 Johann David Heinichen drew a “Musicalischer Circul” in his Neu erfundene und gründliche Anweisung, republished in Der General-Bass in der Composition (1728).'),
          t('Heinichen 把关系小调放在大调旁边，并不反映调与调真正的远近；Johann Mattheson（1735）等人试着改进，David Kellner（1737）提出大调排外圈、关系小调排内圈——就是今天常见的样子，后来又发展成把同主音小调也放进来的"和弦空间"。', 'ハイニヒェンは平行短調を長調の隣に置き、調の実際の近さを反映していなかった。ヨハン・マッテゾン（1735）らが改良を試み、ダーフィト・ケルナー（1737）は長調を外円、平行短調を内円に置く案を出した——今よく見る形で、のちに同主短調も含む「和音空間」へ発展した。', 'Heinichen placed each relative minor next to its major, which did not reflect real key proximity; Johann Mattheson (1735) and others tried to improve it, and David Kellner (1737) proposed majors on an outer circle and relative minors on an inner one — today’s familiar layout, later extended into chordal spaces including parallel minors.'),
        ],
        visual: { kind: 'circle', highlight: ['C', 'G', 'F'], inner: ['A'] },
      },
      {
        id: 'b210x-e2', type: 'page', ref: 'wiki-circle-of-fifths',
        title: t('进阶 1、3 · 读五度圈：格数、方向和那一次等音替换', '発展 1・3・五度圏を読む：マスの数・方向・1 回の異名同音', 'Advanced 1–3 · Reading the circle: steps, direction, and one enharmonic swap'),
        text: [
          t('从 C 开始顺时针：C G D A E B（= C♭）F♯（= G♭）C♯（= D♭）A♭ E♭ B♭ F，再回到 C——每一格上行纯五度。反过来逆时针每一格是上行纯四度，所以它也叫"四度圈"。顺时针走几格就有几个升号，逆时针几格就有几个降号；相邻的调号最接近。', 'C から時計回り：C G D A E B（= C♭）F♯（= G♭）C♯（= D♭）A♭ E♭ B♭ F、そして C——1 マスごとに完全 5 度上。逆に反時計回りは 1 マスごとに完全 4 度上なので「四度圏」とも。時計回りのマス数が ♯ の数、反時計回りが ♭ の数。隣り合う調号がいちばん近い。', 'Clockwise from C: C G D A E B (= C♭) F♯ (= G♭) C♯ (= D♭) A♭ E♭ B♭ F, back to C — each step a perfect fifth up. Counter-clockwise each step is a perfect fourth up, hence “circle of fourths”. Steps clockwise give the number of sharps, counter-clockwise the flats; neighbours are the closest signatures.'),
          t('一圈 12 格，一格 30°：转 90°（3 格）到 A 或 E♭，与 C 相差小三度；转 180°（6 格）到 F♯ / G♭，相差三全音。要在谱上写出一整圈，必须在某处做一次等音替换：顺时针 A♯ 上方的五度本该是 E♯，却写成 F（技术上成了减六度）。和弦进行常在根音相差纯五度的和弦之间走，所以五度圈也能表示和弦之间的"和声距离"。', '1 周 12 マス、1 マス 30°：90°（3 マス）回すと A か E♭ で C と短 3 度、180°（6 マス）で F♯ / G♭、三全音。1 周を譜面に書くにはどこかで 1 回異名同音の置き換えが要る：時計回りで A♯ の 5 度上は E♯ のはずが F と書かれる（技術的には減 6 度）。和音進行は根音が完全 5 度の和音間で動くことが多いので、五度圏は和音どうしの「和声的距離」も示せる。', 'Twelve steps, 30° each: 90° (three steps) reaches A or E♭, a minor third from C; 180° (six steps) reaches F♯ / G♭, a tritone. Writing a full circle requires one enharmonic swap: clockwise, the fifth above A♯ should be E♯ but is written F (technically a diminished sixth). Progressions often move between chords whose roots lie a fifth apart, so the circle also shows harmonic distance between chords.'),
        ],
        visual: { kind: 'circle', highlight: ['C', 'A', 'E♭', 'F♯'] },
      },
      {
        id: 'b210x-e3', type: 'discover', practice: true, ref: 'wiki-circle-of-fifths',
        prompt: t('从 E 大调（四个升号）在五度圈上转 180°，到哪个调？有几个降号？', 'ホ長調（♯ 4）から五度圏で 180° 回すと？ ♭ はいくつ？', 'From E major (four sharps), turn 180° on the circle. Which key, and how many flats?'),
        options: [t('B♭ 大调，两个降号', '変ロ長調、♭ 2', 'B♭ major, two flats'), t('A♭ 大调，四个降号', '変イ長調、♭ 4', 'A♭ major, four flats'), t('B 大调，五个升号', 'ロ長調、♯ 5', 'B major, five sharps')],
        answer: 0,
        insight: { title: t('6 格 = 三全音', '6 マス = 三全音', 'Six steps = a tritone'), text: t('E → B → F♯ → C♯ → G♯(A♭) → E♭ → B♭：六格到 B♭，和 E 相差三全音，两个降号。', 'E → B → F♯ → C♯ → G♯(A♭) → E♭ → B♭：6 マスで B♭、E と三全音、♭ 2。', 'E → B → F♯ → C♯ → G♯ (A♭) → E♭ → B♭: six steps to B♭, a tritone from E, with two flats.') },
      },
      {
        id: 'b210x-e4', type: 'page', ref: ['wiki-closely-related', 'omt2e-modulation'],
        title: t('进阶 2 · 近关系调：维基百科算六个', '発展 2・近親調：ウィキペディアでは 6 つ', 'Advanced 2 · Closely related keys: six by Wikipedia’s count'),
        text: [
          t('近关系调是和原调共享很多音的调，以大调 I 为例共有六个：ii（下属的关系小调）、iii（属的关系小调）、IV（少一个升号或多一个降号）、V（多一个升号或少一个降号）、vi（关系小调，调号相同）、i（同主音小调，主音相同）。其中四个和原调只差一个音，一个音完全相同，一个主音相同。（OMT 的近关系调是"调号相差不超过一个升降号"，就不包括同主音小调——定义的角度不同。）', '近親調は原調と多くの音を共有する調で、長調 I なら 6 つ：ii（下属の平行短調）、iii（属の平行短調）、IV（♯ が 1 つ少ないか ♭ が 1 つ多い）、V（♯ が 1 つ多いか ♭ が 1 つ少ない）、vi（平行短調、同じ調号）、i（同主短調、同じ主音）。4 つは原調と 1 音だけ違い、1 つは音がすべて同じ、1 つは主音が同じ。（OMT の近親調は「調号の差が 1 つ以内」なので同主短調は含まない——定義の観点が違う。）', 'Closely related keys share many tones with the home key; for a major tonic there are six: ii (relative minor of the subdominant), iii (relative minor of the dominant), IV (one sharp fewer or flat more), V (one sharp more or flat fewer), vi (relative minor, same signature) and i (parallel minor, same tonic). Four differ by one pitch, one shares all, one shares the tonic. (OMT defines closely related keys as signatures within one accidental, which leaves out the parallel minor — a different angle of definition.)'),
          t('它们是转调最常去的地方。远关系调可以经过近关系调"连环转调"去（C → G → D）。海顿时代的作曲家很讲究整体调性统一，四个乐章的作品里不会出现和整体主调不近关系的调；莫扎特钢琴奏鸣曲 K. 309 第一乐章只转到近关系调（属调、上主调、下中调）。', '転調の最もよくある行き先。遠隔調へは近親調を経て「連鎖転調」で行ける（C → G → D）。ハイドンの時代の作曲家は全体の調の統一を重んじ、4 楽章の作品に全体の主調と近親でない調は出さなかった。モーツァルトのピアノ・ソナタ K. 309 第 1 楽章は近親調（属調・上主調・下中調）にしか転調しない。', 'They are the commonest modulation targets; distant keys can be reached by chain modulation through close ones (C → G → D). Composers of Haydn’s day prized overall tonal unity, never presenting a key not closely related to the whole work’s tonic in a four-movement piece; the first movement of Mozart’s Piano Sonata K. 309 modulates only to closely related keys (dominant, supertonic, submediant).'),
        ],
        visual: { kind: 'circle', highlight: ['C', 'G', 'F'], inner: ['A', 'E', 'D'] },
      },
      {
        id: 'b210x-e5', type: 'discover', practice: true, ref: 'wiki-closely-related',
        prompt: t('按维基百科的算法，下面哪个不是 G 大调的近关系调？', 'ウィキペディアの数え方で、ト長調の近親調でないのは？', 'By Wikipedia’s count, which is not closely related to G major?'),
        options: [t('F 大调', 'ヘ長調', 'F major'), t('G 小调', 'ト短調', 'G minor'), t('B 小调', 'ロ短調', 'B minor'), t('C 大调', 'ハ長調', 'C major')],
        answer: 0,
        insight: { title: t('ii、iii、IV、V、vi、i', 'ii・iii・IV・V・vi・i', 'ii, iii, IV, V, vi, i'), text: t('G 大调的近关系调：Am、Bm、C、D、Em、Gm；F 大调差两个升降号，不在其中。', 'ト長調の近親調：Am・Bm・C・D・Em・Gm。ヘ長調は調号が 2 つ違い、入らない。', 'G major’s close keys: Am, Bm, C, D, Em, Gm; F major is two accidentals away.') },
      },
      {
        id: 'b210x-e6', type: 'page', ref: 'wiki-axis-system',
        title: t('进阶 4 · 轴心体系：转 90° 也能代替', '発展 4・軸システム：90° 回しても代理できる', 'Advanced 4 · The axis system: a 90° turn can substitute'),
        text: [
          t('匈牙利学者 Ernő Lendvai 在分析巴托克的音乐时提出"轴心体系"，关心的是和声与调性上的替代。传统和声里本来就有替代（例如阻碍终止里 vi 代替 I）；Lendvai 认为巴托克还用了另一组替代：相隔小三度、甚至相隔三全音的和弦与调——三全音一般被看作离主音最远的关系——也能互相代替，而且他认为这有自然的基础，并借此在功能框架里"解释"巴托克的半音化。', 'ハンガリーの学者エルネー・レンドヴァイがバルトークの音楽を分析して提唱した「軸システム」は、和声と調の代理を扱う。伝統的和声にも代理はある（偽終止で vi が I の代わりになるなど）。レンドヴァイは、バルトークがさらに別の代理を使ったと考えた：短 3 度、さらには三全音——ふつう主音から最も遠い関係——離れた和音や調も互いに代理になる、と。彼はこれに自然な基盤があると主張し、機能の枠組みでバルトークの半音階法を「説明」しようとした。', 'Hungarian scholar Ernő Lendvai devised the axis system analysing Bartók, concerned with harmonic and tonal substitution. Traditional harmony already substitutes (vi for I in a deceptive cadence); Lendvai argued Bartók used another set: chords and keys a minor third or even a tritone apart — normally the most remote relation from the tonic — can stand in for each other. He claimed a naturalistic basis for this and used it to “explain” Bartók’s chromaticism within a functional model.'),
          t('做法：把 12 个音分成三组，每组四个音彼此相隔小三度或三全音（正好是三个减七和弦的音），叫三条"轴"，类比主、下属、属。以 C 为主音：主轴 C、E♭、F♯、A；下属轴 F、A♭、B、D；属轴 G、B♭、C♯、E。相隔三全音的一对叫一个"枝"（C/F♯、E♭/A），每条轴有主枝和副枝，两端叫"极"与"对极"。所以 D♭7 能代替 G7：它们都在属轴上，是一对极与对极。', 'やり方：12 音を、互いに短 3 度か三全音離れた 4 音ずつの 3 組に分ける（ちょうど 3 つの減七の音）。これを 3 本の「軸」と呼び、主・下属・属にたとえる。C が主音なら：主軸 C・E♭・F♯・A、下属軸 F・A♭・B・D、属軸 G・B♭・C♯・E。三全音離れた 2 音を「枝」（C/F♯、E♭/A）と呼び、各軸に主枝と副枝があり、両端は「極」と「対極」。だから D♭7 は G7 の代わりになる：どちらも属軸の極と対極。', 'Method: split the twelve tones into three groups of four, each a minor third or tritone apart (the notes of the three diminished sevenths) — three “axes”, likened to tonic, subdominant and dominant. With C as tonic: tonic axis C, E♭, F♯, A; subdominant axis F, A♭, B, D; dominant axis G, B♭, C♯, E. A tritone pair is a “branch” (C/F♯, E♭/A); each axis has a principal and a secondary branch, whose ends are “pole” and “counterpole”. Hence D♭7 can replace G7: both sit on the dominant axis as pole and counterpole.'),
        ],
        visual: { kind: 'circle', highlight: ['G', 'B♭', 'D♭', 'E'], axis: true },
      },
      {
        id: 'b210x-e7', type: 'discover', practice: true, ref: 'wiki-axis-system',
        prompt: t('以 C 为主音，A 在哪条轴上？', 'C が主音のとき、A はどの軸？', 'With C as tonic, which axis is A on?'),
        options: [t('主轴（C、E♭、F♯、A）', '主軸（C・E♭・F♯・A）', 'The tonic axis (C, E♭, F♯, A)'), t('属轴', '属軸', 'The dominant axis'), t('下属轴', '下属軸', 'The subdominant axis')],
        answer: 0,
        insight: { title: t('从 C 每转 90° 一个', 'C から 90° ごと', 'Every 90° from C'), text: t('C → E♭ → F♯ → A：都相隔小三度，在主轴上；A 和 E♭ 是一对"枝"。', 'C → E♭ → F♯ → A：すべて短 3 度、主軸。A と E♭ は 1 本の「枝」。', 'C → E♭ → F♯ → A, all minor thirds apart on the tonic axis; A and E♭ form a branch.') },
      },
    ],
    experiment: [
      { id: 'b210x-x1', type: 'experiment', toy: 'progression', ref: ['wiki-axis-system', 'omt-pb-substitutions', 'wiki-backdoor'],
        prompt: t('Dm7 → （属轴上的一个属七）→ C。第二格依次换 G7、D♭7、E7、B♭7——它们都在 C 的属轴上。哪一个最像 G7？哪一个最远？', 'Dm7 →（属軸上の属七）→ C。2 番目を G7・D♭7・E7・B♭7 に替えよう——どれも C の属軸上。いちばん G7 らしいのは？ いちばん遠いのは？', 'Dm7 → (a dominant seventh on the dominant axis) → C. Swap slot 2 through G7, D♭7, E7, B♭7 — all on C’s dominant axis. Which sounds most like G7, which farthest?'),
        params: { gap: 900, slots: [
          { options: [axo('Dm7', 'Dm7')] },
          { options: [axo('G7', 'G7（极）'), axo('Db7', 'D♭7（对极）'), axo('E7', 'E7'), axo('Bb7', 'B♭7')] },
          { options: [axo('Cend', 'C')] },
        ], presets: [
          { label: 'G7', picks: [0, 0, 0], explain: t('原来的属七：ii–V–I。', '元の属七：ii–V–I。', 'The original dominant seventh: ii–V–I.') },
          { label: 'D♭7', picks: [0, 1, 0], explain: t('对极，也是爵士里的三全音替代：低音半音下行到 C。', '対極、ジャズの三全音代理でもある：バスが C へ半音下行。', 'The counterpole — also jazz’s tritone sub: the bass slides down to C.') },
          { label: 'B♭7', picks: [0, 3, 0], explain: t('副枝上的音，就是后门进行的 ♭VII⁷。', '副枝の音、裏口進行の ♭VII⁷。', 'On the secondary branch — the backdoor ♭VII⁷.') },
        ] },
        breakthrough: { id: 'b210x-axis', text: t('你听到了：同一条轴上的属七都能把耳朵带回 C，只是路线不同。', '同じ軸の属七はどれも耳を C に連れ戻す、道筋が違うだけ——聴き取れた。', 'You heard it: dominant sevenths on one axis all lead back to C, by different routes.') } },
    ],
    challenge: [
      {
        id: 'b210x-c1', type: 'choice', error: 'key-relation', skills: ['calc'], ref: 'wiki-circle-of-fifths',
        variants: [
          { prompt: t('五度圈上从 C 逆时针走 4 格，是哪个大调？', '五度圏で C から反時計回りに 4 マスは？', 'Four steps counter-clockwise from C is which major key?'), options: [t('A♭ 大调（四个降号）', '変イ長調（♭ 4）', 'A♭ major (four flats)'), t('E 大调', 'ホ長調', 'E major'), t('E♭ 大调', '変ホ長調', 'E♭ major'), t('D♭ 大调', '変ニ長調', 'D♭ major')] },
          { prompt: t('五度圈为什么也叫"四度圈"？', '五度圏が「四度圏」とも呼ばれるのはなぜ？', 'Why is the circle of fifths also called the circle of fourths?'), options: [t('反方向走就是一个个上行纯四度', '逆方向は完全 4 度ずつ上がる', 'Going the other way ascends by perfect fourths'), t('它只有四个调', '調が 4 つだけ', 'It has only four keys'), t('它从 F 开始', 'F から始まる', 'It starts on F')] },
          { prompt: t('12 个 3 : 2 的纯五度之后多出来的那一点叫？', '3 : 2 の純正 5 度 12 個の後に余る小さな差は？', 'The small overshoot after twelve 3 : 2 fifths is called…'), options: [t('毕达哥拉斯音差', 'ピタゴラス・コンマ', 'The Pythagorean comma'), t('三全音', '三全音', 'A tritone'), t('减六度', '減 6 度', 'A diminished sixth')] },
        ],
        answer: 0,
        explain: t('逆时针几格就有几个降号；反方向是四度；12 个纯律五度多出毕达哥拉斯音差。', '反時計回りのマス数が ♭ の数。逆方向は 4 度。純正 5 度 12 個でピタゴラス・コンマが余る。', 'Counter-clockwise steps count flats; the reverse direction goes by fourths; twelve just fifths overshoot by the Pythagorean comma.'),
      },
      {
        id: 'b210x-c2', type: 'choice', error: 'key-relation', skills: ['calc'], ref: 'wiki-closely-related',
        variants: [
          { prompt: t('D 大调的近关系调里，和 D 大调主音相同的是？', 'ニ長調の近親調で主音が同じなのは？', 'Among D major’s closely related keys, which shares its tonic?'), options: [t('D 小调', 'ニ短調', 'D minor'), t('B 小调', 'ロ短調', 'B minor'), t('A 大调', 'イ長調', 'A major'), t('G 大调', 'ト長調', 'G major')] },
          { prompt: t('F 大调的 iii 近关系调是？', 'ヘ長調の近親調 iii は？', 'F major’s closely related iii is…'), options: [t('A 小调', 'イ短調', 'A minor'), t('D 小调', 'ニ短調', 'D minor'), t('G 小调', 'ト短調', 'G minor'), t('C 大调', 'ハ長調', 'C major')] },
          { prompt: t('莫扎特 K. 309 第一乐章转到哪些调？', 'モーツァルト K. 309 第 1 楽章の転調先は？', 'Where does the first movement of Mozart’s K. 309 modulate?'), options: [t('只转到近关系调（属、上主、下中）', '近親調だけ（属・上主・下中）', 'Only to closely related keys (dominant, supertonic, submediant)'), t('转到三全音关系的调', '三全音関係の調へ', 'To the tritone key'), t('只转到同主音小调', '同主短調だけ', 'Only to the parallel minor')] },
        ],
        answer: 0,
        explain: t('近关系调：ii、iii、IV、V、vi、i；同主音小调主音相同；K. 309 第一乐章只转到近关系调。', '近親調：ii・iii・IV・V・vi・i。同主短調は主音が同じ。K. 309 第 1 楽章は近親調だけ。', 'Close keys: ii, iii, IV, V, vi, i; the parallel minor shares the tonic; K. 309’s first movement stays among close keys.'),
      },
      {
        id: 'b210x-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: 'wiki-circle-of-fifths',
        variants: [
          { prompt: t('第一张五度圈图出现在哪里？', '最初の五度圏の図はどこに？', 'Where does the first circle-of-fifths diagram appear?'), options: [t('Dyletsky《Grammatika》（1677）', 'ジレツキー『グラマティカ』（1677）', 'Dyletsky’s Grammatika (1677)'), t('Heinichen（1711）', 'ハイニヒェン（1711）', 'Heinichen (1711)'), t('Kellner（1737）', 'ケルナー（1737）', 'Kellner (1737)')] },
          { prompt: t('谁提出大调排外圈、关系小调排内圈？', '長調を外円、平行短調を内円にする案を出したのは？', 'Who proposed majors outside and relative minors on an inner circle?'), options: [t('David Kellner（1737）', 'ダーフィト・ケルナー（1737）', 'David Kellner (1737)'), t('Heinichen', 'ハイニヒェン', 'Heinichen'), t('Dyletsky', 'ジレツキー', 'Dyletsky')] },
        ],
        answer: 0,
        explain: t('Dyletsky 1677 年最早画出；Heinichen 1711 年的"音乐圆圈"把关系小调放在大调旁边；Kellner 1737 年提出内外两圈。', 'ジレツキーが 1677 年に最初。ハイニヒェン 1711 年の「音楽の円」は平行短調を長調の隣に。ケルナー 1737 年が内外 2 円。', 'Dyletsky drew it first (1677); Heinichen’s 1711 circle put relative minors beside majors; Kellner (1737) proposed inner and outer circles.'),
      },
      {
        id: 'b210x-c4', type: 'choice', error: 'concept', skills: ['function'], ref: 'wiki-axis-system',
        variants: [
          { prompt: t('以 C 为主音，F 在哪条轴上？', 'C が主音のとき F はどの軸？', 'With C as tonic, F is on which axis?'), options: [t('下属轴（F、A♭、B、D）', '下属軸（F・A♭・B・D）', 'The subdominant axis (F, A♭, B, D)'), t('主轴', '主軸', 'The tonic axis'), t('属轴', '属軸', 'The dominant axis')] },
          { prompt: t('每条轴上的四个音彼此相隔？', '各軸の 4 音の間隔は？', 'The four notes on each axis are separated by…'), options: [t('小三度或三全音', '短 3 度か三全音', 'Minor thirds or tritones'), t('纯五度', '完全 5 度', 'Perfect fifths'), t('全音', '全音', 'Whole steps')] },
          { prompt: t('轴心体系是谁在分析谁的音乐时提出的？', '軸システムは誰が誰の音楽を分析して提唱した？', 'Who devised the axis system, analysing whose music?'), options: [t('Ernő Lendvai 分析巴托克', 'エルネー・レンドヴァイがバルトークを', 'Ernő Lendvai, analysing Bartók'), t('Jerry Coker 分析爵士', 'ジェリー・コーカーがジャズを', 'Jerry Coker, analysing jazz'), t('Heinichen 分析巴洛克', 'ハイニヒェンがバロックを', 'Heinichen, analysing Baroque music')] },
        ],
        answer: 0,
        explain: t('三条轴：主 C E♭ F♯ A、下属 F A♭ B D、属 G B♭ C♯ E；每条轴四个音相隔小三度或三全音；Lendvai 分析巴托克时提出。', '3 本の軸：主 C E♭ F♯ A、下属 F A♭ B D、属 G B♭ C♯ E。各軸の 4 音は短 3 度か三全音。レンドヴァイがバルトーク分析で。', 'Three axes — tonic C E♭ F♯ A, subdominant F A♭ B D, dominant G B♭ C♯ E — each a minor third or tritone apart; devised by Lendvai for Bartók.'),
      },
      G('b210x-g1', 'circleStep', 1, ['calc']),
      G('b210x-g2', 'closelyRelated', 1, ['calc']),
      G('b210x-g3', 'axis', 1, ['function']),
    ],
  },
  pool: [G('b210x-p1', 'circleStep', 3, ['calc']), G('b210x-p2', 'closelyRelated', 2, ['calc']), G('b210x-p3', 'axis', 2, ['function']), G('b210x-p4', 'keySignature', 2, ['identify'])],
};

// ===================== B2-11x 新黎曼变换 · 扩展关 =====================
// 对应 A 面：neoriemann（S、N、H / PL 循环 / RP、RL、PLR 循环 / 七和弦的"八音塔"）的进阶关
const PL = { notes: [[60, 64, 67], [60, 63, 67], [60, 63, 68], [59, 63, 68], [59, 64, 68], [59, 64, 67], [60, 64, 67]], mode: 'chords' };
const RP = { notes: [[60, 64, 67], [60, 64, 69], [61, 64, 69], [61, 66, 69], [61, 66, 70], [63, 66, 70], [63, 67, 70], [63, 67, 72], [64, 67, 72]], mode: 'chords' };
const EXT_B2_11 = {
  minutes: 21,
  insight: t('新黎曼理论不问"这个和弦在哪个调"，只问"动了哪个音、动了多少"：每次只动一两个半音，就能从 C 大三走到很远的地方，而且一步也不跳。', 'ネオ・リーマン理論は「どの調の和音か」ではなく「どの音がどれだけ動いたか」を問う：毎回 1〜2 半音動かすだけで、C の長三和音から遠くまで、1 歩も跳ばずに行ける。', 'Neo-Riemannian theory asks not which key a chord is in, but which note moved and how far: moving a semitone or two at a time takes C major far afield without a single leap.'),
  sections: {
    discover: [
      {
        id: 'b211x-d1', type: 'discover', ref: 'omt2e-neo-riemannian',
        prompt: t('从 C 大三开始，交替做 P 和 L：C → Cm → A♭ → A♭m → E → Em → …… 下一个是什么？', 'C の長三和音から P と L を交互に：C → Cm → A♭ → A♭m → E → Em → …… 次は？', 'Start on C major and alternate P and L: C → Cm → A♭ → A♭m → E → Em → … What comes next?'),
        play: [{ label: t('PL 循环', 'PL サイクル', 'The PL cycle'), audio: PL }],
        options: [t('回到 C 大三：六步一圈', 'C の長三和音に戻る：6 歩で 1 周', 'Back to C major: six steps make a loop'), t('B 大三', 'B の長三和音', 'B major'), t('G 小三', 'G の短三和音', 'G minor')],
        answer: 0,
        insight: {
          title: t('PL 循环六步闭合', 'PL サイクルは 6 歩で閉じる', 'The PL cycle closes in six'),
          text: t('Em 做 L 回到 C。六个三和弦闭合成一个环，所有音合起来是六声音阶（半音与小三度交替）。勃拉姆斯小提琴与大提琴二重协奏曲第一乐章（第 268–79 小节）就用这种 P、L 交替连接两个 A♭ 大三和弦——用罗马数字解释不通，用"动了哪个音"就说得通。', 'Em に L で C に戻る。6 つの三和音が輪になり、全部の音を合わせると六音音階（半音と短 3 度の交互）。ブラームスのヴァイオリンとチェロのための二重協奏曲第 1 楽章（第 268–79 小節）はこの P・L の交互で 2 つの A♭ 長三和音をつなぐ——ローマ数字では説明できないが、「どの音が動いたか」なら説明できる。', 'L on Em returns to C. Six triads close a loop whose notes together form the hexatonic scale (alternating semitones and minor thirds). Brahms’s Double Concerto, first movement (bars 268–79), links two A♭ major triads with just this P–L alternation — inexplicable by Roman numerals, clear by asking which note moved.'),
        },
      },
    ],
    explain: [
      {
        id: 'b211x-e1', type: 'page', ref: 'omt2e-neo-riemannian',
        title: t('进阶 · P、R、L 再看一遍：保留什么、动什么', '発展・P・R・L をもう一度：何を残し、何を動かすか', 'Advanced · P, R, L again: what stays, what moves'),
        text: [
          t('新黎曼理论以理论家 Hugo Riemann 命名，用来解释那些靠共同音、而不是靠留在一个调里连起来的三和弦进行。每个变换都在一个大三和弦和一个小三和弦之间切换：P（平行）保留纯五度、另一个音走半音（C ↔ Cm）；L（导音交换）保留小三度、另一个音走半音（C ↔ Em）；R（关系）保留大三度、另一个音走全音（C ↔ Am）。', 'ネオ・リーマン理論は理論家フーゴー・リーマンにちなみ、1 つの調に留まるのではなく共通音でつながる三和音進行を説明する。どの変換も長三和音と短三和音を切り替える：P（平行）は完全 5 度を残し残りの音が半音（C ↔ Cm）、L（導音交換）は短 3 度を残し半音（C ↔ Em）、R（平行調）は長 3 度を残し全音（C ↔ Am）。', 'Neo-Riemannian theory, named after the theorist Hugo Riemann, explains triadic progressions linked by common tones rather than by staying in one key. Each transformation toggles between a major and a minor triad: P (parallel) keeps the perfect fifth and moves the other note a semitone (C ↔ Cm); L (leading-tone exchange) keeps the minor third, moving a semitone (C ↔ Em); R (relative) keeps the major third, moving a whole tone (C ↔ Am).'),
          t('每个变换都像键盘上的 Caps Lock：按一次切到大写，再按一次回到小写，不会出现"第三种"。所以对 C 连做两次 L，就在 C 和 Em 之间来回。19 世纪的作曲家很少一直重复同一个变换，20 世纪就有了：Laurie Anderson 的《O Superman》从头到尾都是连续的 L 变换。', 'どの変換もキーボードの Caps Lock のよう：1 回で大文字、もう 1 回で小文字に戻り、「3 つ目」はない。だから C に L を 2 回すれば C と Em を行き来するだけ。19 世紀の作曲家は同じ変換を繰り返すことはまれだったが、20 世紀にはある：ローリー・アンダーソン《O Superman》は最初から最後まで連続する L 変換。', 'Each transformation is like Caps Lock: press once for capitals, again to return — never a third state. So L twice on C just shuttles between C and Em. Nineteenth-century composers seldom repeated one transformation, but the 20th century did: Laurie Anderson’s “O Superman” uses successive L transformations throughout.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['C4', 'E4', 'G4'], 0), ...col(['C4', 'Eb4', 'G4'], 1, { label: 'P' }), ...col(['B3', 'E4', 'G4'], 2, { label: 'L' }), ...col(['C4', 'E4', 'A4'], 3, { label: 'R' })], cols: 4 },
      },
      {
        id: 'b211x-e2', type: 'page', ref: 'omt2e-neo-riemannian',
        title: t('进阶 · Tonnetz：翻三角形', '発展・トーンネッツ：三角形を裏返す', 'Advanced · The Tonnetz: flipping triangles'),
        text: [
          t('Tonnetz 是一张音的网：从左到右是纯五度，左上到右下是大三度，左下到右上是小三度，任意一个小三角形的三个音就是一个大三或小三和弦。P 沿五度那条边把三角形翻过去，R 沿大三度那条边翻，L 沿小三度那条边翻。不考虑等音时它可以无限延伸，考虑等音时它就卷成一个"甜甜圈"（环面）。', 'トーンネッツは音の網：左右に完全 5 度、左上から右下に長 3 度、左下から右上に短 3 度。どの小さな三角形の 3 音も長三か短三和音。P は 5 度の辺で、R は長 3 度の辺で、L は短 3 度の辺で三角形を裏返す。異名同音を考えなければ無限に広がり、考えればドーナツ形（トーラス）になる。', 'The Tonnetz is a web of pitches: fifths left to right, major thirds top-left to bottom-right, minor thirds bottom-left to top-right; any small triangle is a major or minor triad. P flips a triangle across its fifth edge, R across its major-third edge, L across its minor-third edge. Without enharmonic equivalence it extends forever; with it, it wraps into a torus.'),
          t('一个调里的三和弦在 Tonnetz 上挨在一起，相隔遥远的调也离得很远；反过来，它也能帮你想出一般共性写作语法想不到的和弦进行。勃拉姆斯那段进行在 Tonnetz 上就是沿一列三角形往上走（起点要把 G♯ 大三重新理解成 A♭ 大三）。', '1 つの調の三和音はトーンネッツで隣り合い、遠い調は遠い。逆に、ふつうの共通慣習の文法では思いつかない進行を考える助けにもなる。ブラームスのあの進行はトーンネッツで三角形の列を上へ進む（出発点で G♯ の長三和音を A♭ と読み替える）。', 'Triads in one key cluster on the Tonnetz and distant keys lie far apart; conversely it suggests progressions common-practice syntax would not. The Brahms passage climbs a column of triangles (re-reading G♯ major as A♭ major at the start).'),
        ],
        visual: { kind: 'blocks', rows: [{ label: '5', cells: ['C', 'G', 'D'] }, { label: 'M3', cells: ['E', 'B', 'F♯'] }] },
      },
      {
        id: 'b211x-e3', type: 'discover', practice: true, ref: 'omt2e-neo-riemannian',
        prompt: t('对 G 小三和弦（G B♭ D）做 R，得到？', 'G の短三和音（G B♭ D）に R をすると？', 'Apply R to G minor (G B♭ D). You get…'),
        options: [t('B♭ 大三（B♭ D F）', 'B♭ の長三和音（B♭ D F）', 'B♭ major (B♭ D F)'), t('E♭ 大三', 'E♭ の長三和音', 'E♭ major'), t('G 大三', 'G の長三和音', 'G major')],
        answer: 0,
        insight: { title: t('保留大三度 B♭–D', '長 3 度 B♭–D を残す', 'Keep the major third B♭–D'), text: t('R 保留大三度，另一个音走全音：G 上行全音到 F，得到 B♭ D F。从小三和弦出发时，翻转的方向和从大三和弦出发时相反。', 'R は長 3 度を残し残りの音が全音：G が F へ全音上がり B♭ D F。短三和音から始めると、裏返す方向は長三和音からとは逆。', 'R keeps the major third and moves the other note a whole tone: G rises to F, giving B♭ D F. Starting from a minor triad, the flips go the opposite way.') },
      },
      {
        id: 'b211x-e4', type: 'page', ref: 'omt2e-neo-riemannian',
        title: t('进阶 2、3 · 四种循环和它们的"母音阶"', '発展 2・3・4 つのサイクルとその「母音階」', 'Advanced 2–3 · Four cycles and their parent scales'),
        text: [
          t('作曲家常用一串变换组成闭合的循环（像模进一样有固定的模式）。两种变换交替的循环有三种：PL 循环六步闭合，所有音合起来是六声音阶（半音、小三度交替）；RP 循环八步闭合（C → Am → A → F♯m → F♯ → D♯m → E♭ → Cm → C），合起来是八声音阶（半音、全音交替）；RL 循环要经过全部 24 个大小三和弦才回到起点，所以常被省略或截短。', '作曲家は変換の連鎖で閉じたサイクルをよくつくる（反復進行のように決まった型）。2 つの変換を交互にするサイクルは 3 つ：PL は 6 歩で閉じ、全部の音で六音音階（半音と短 3 度の交互）。RP は 8 歩で閉じ（C → Am → A → F♯m → F♯ → D♯m → E♭ → Cm → C）、八音音階（半音と全音の交互）。RL は 24 個すべての長短三和音を通ってやっと戻るので、よく省略されたり短縮されたりする。', 'Composers often chain transformations into closed cycles (patterned like sequences). Three cycles alternate two transformations: PL closes in six, its notes forming the hexatonic scale (semitones and minor thirds alternating); RP closes in eight (C → Am → A → F♯m → F♯ → D♯m → E♭ → Cm → C), forming the octatonic scale (semitones and whole tones); RL passes through all 24 major and minor triads before returning, so it is often skipped or truncated.'),
          t('三种变换的循环里值得一提的是 PLR 循环：要走两轮 PLR 才回到起点，而且整个循环里每个三和弦都含有同一个音——它围着一个音转。', '3 つの変換のサイクルで注目すべきは PLR サイクル：PLR を 2 周してやっと戻り、サイクル中のどの三和音も同じ 1 音を含む——1 つの音のまわりを回る。', 'Among three-transformation cycles the notable one is PLR: it takes two rounds to return, and every triad in it contains one shared pitch — it revolves around a single note.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: 'PL', cells: ['6', t('六声', '六音', 'hexatonic')] }, { label: 'RP', cells: ['8', t('八声', '八音', 'octatonic')] }, { label: 'RL', cells: ['24', '—'] }] },
      },
      {
        id: 'b211x-e5', type: 'demo', ref: 'omt2e-neo-riemannian',
        title: t('听 RP 循环', 'RP サイクルを聴く', 'Hear the RP cycle'),
        steps: [
          { text: t('C → Am → A → F♯m → F♯ → D♯m → E♭ → Cm → C：每一步只动一个音，八步回到 C。', 'C → Am → A → F♯m → F♯ → D♯m → E♭ → Cm → C：1 歩ごとに 1 音だけ動き、8 歩で C に戻る。', 'C → Am → A → F♯m → F♯ → D♯m → E♭ → Cm → C: one note per step, home in eight.'), audio: RP },
        ],
      },
      {
        id: 'b211x-e6', type: 'discover', practice: true, ref: 'omt2e-neo-riemannian',
        prompt: t('PLR 循环有什么特别之处？', 'PLR サイクルの特徴は？', 'What is special about the PLR cycle?'),
        options: [t('每个三和弦都含有同一个音，走两轮才回到起点', 'どの三和音も同じ音を含み、2 周でやっと戻る', 'Every triad shares one pitch, and it takes two rounds to return'), t('它经过全部 24 个三和弦', '24 個すべてを通る', 'It passes through all 24 triads'), t('它的母音阶是全音音阶', '母音階は全音音階', 'Its parent scale is whole-tone')],
        answer: 0,
        insight: { title: t('围着一个音转', '1 つの音のまわりを回る', 'Revolving around one note'), text: t('PLR 循环以一个共同音为中心；RL 才是经过全部 24 个的那一种。', 'PLR サイクルは 1 つの共通音が中心。24 個すべてを通るのは RL。', 'PLR centres on one common tone; RL is the one through all 24.') },
      },
      {
        id: 'b211x-e7', type: 'page', ref: 'omt2e-neo-riemannian',
        title: t('进阶 1 · S、N、H：只留一个共同音，甚至一个也不留', '発展 1・S・N・H：共通音 1 つだけ、あるいはゼロ', 'Advanced 1 · S, N, H: one common tone, or none'),
        text: [
          t('还有三种常见的变换，每次动两个或三个音：S（滑动）正好和 P 相反，移动构成纯五度的那两个音、保留三音（C ↔ C♯m，共享 E）；N（Nebenverwandt，德语"邻近关系"）移动构成小三度的两个音，像邻音一样（C ↔ Fm，共享 C）；H（六声极）三个音各动一个半音，一个共同音也没有（C ↔ A♭m），它连起 PL 循环里正对面的两个三和弦，也可以写成 PLP。', 'ほかによく使う変換が 3 つ、毎回 2〜3 音を動かす：S（スライド）は P のちょうど逆で、完全 5 度をつくる 2 音を動かし第 3 音を残す（C ↔ C♯m、E を共有）。N（ドイツ語 Nebenverwandt「近隣関係」）は短 3 度をつくる 2 音を隣接音のように動かす（C ↔ Fm、C を共有）。H（ヘクサポール）は 3 音とも半音ずつ動き共通音がない（C ↔ A♭m）、PL サイクルの真向かいの 2 つをつなぎ、PLP とも書ける。', 'Three more common transformations move two or three notes: S (slide), the opposite of P, moves the two notes of the perfect fifth and keeps the third (C ↔ C♯m, sharing E); N (Nebenverwandt, German “neighbour-related”) moves the two notes of the minor third like neighbour tones (C ↔ Fm, sharing C); H (hexatonic pole) moves all three notes by semitone with no common tone (C ↔ A♭m), joining opposite corners of a PL cycle — also writable as PLP.'),
          t('其实任何两个大小三和弦之间都可以用 P、L、R 组合起来，最多五步就到；最有意思的是"节约声部进行"——每个声部最多只动一级。增三和弦也能当桥：它填在 R 相关的两个三和弦中间，又因为对称，可以重新拼写，各动一个半音就能接到三个小三和弦或三个大三和弦——19 世纪理论家 Carl Friedrich Weitzmann 详细写过它，所以这样的一组叫"Weitzmann 区域"（增三和弦只有四个）。Douthett 与 Steinbach 的"Cube Dance"就用增三和弦在不同的 PL 循环之间"转调"。', '実はどの 2 つの長短三和音も P・L・R の組み合わせで、最多 5 歩でつながる。いちばん面白いのは「節約的な声部進行」——どの声部も最大 1 度しか動かない。増三和音も橋になる：R でつながる 2 つの三和音の間に入り、対称なので綴り直せ、半音 1 つで 3 つの短三和音か 3 つの長三和音へつながる——19 世紀の理論家カール・フリードリヒ・ヴァイツマンが詳しく書いたので、この組を「ヴァイツマン領域」と呼ぶ（増三和音は 4 つしかない）。ダウセットとスタインバックの「キューブ・ダンス」は増三和音を使って PL サイクルのあいだを「転調」する。', 'Any two major or minor triads can be joined by combining P, L and R in five steps or fewer; the most interesting paths use parsimonious voice leading, no voice moving more than a step. Augmented triads can bridge too: one fills the gap between R-related triads and, being symmetrical, can be respelled to reach three minor or three major triads by moving one note a semitone — the 19th-century theorist Carl Friedrich Weitzmann wrote at length about this, hence “Weitzmann regions” (there are only four augmented triads). Douthett and Steinbach’s “Cube Dance” uses augmented triads to “modulate” between PL cycles.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...col(['C4', 'E4', 'G4'], 0), ...col(['C#4', 'E4', 'G#4'], 1, { label: 'S' }), ...col(['C4', 'F4', 'Ab4'], 2, { label: 'N' }), ...col(['B3', 'Eb4', 'Ab4'], 3, { label: 'H' })], cols: 4 },
      },
      {
        id: 'b211x-e8', type: 'discover', practice: true, ref: 'omt2e-neo-riemannian',
        prompt: t('C 大三 → A♭ 小三（A♭ C♭ E♭）。哪一种变换？有几个共同音？', 'C 長三 → A♭ 短三（A♭ C♭ E♭）。どの変換？ 共通音はいくつ？', 'C major → A♭ minor (A♭ C♭ E♭). Which transformation, and how many common tones?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: { notes: [[60, 64, 67], [59, 63, 68]], mode: 'chords' } }],
        options: [t('H，没有共同音（三个音各动半音）', 'H、共通音なし（3 音とも半音）', 'H, no common tones (each note moves a semitone)'), t('S，共享一个音', 'S、1 音共有', 'S, one shared tone'), t('L，共享两个音', 'L、2 音共有', 'L, two shared tones')],
        answer: 0,
        insight: { title: t('六声极', 'ヘクサポール', 'The hexatonic pole'), text: t('C→C♭(B)、E→E♭、G→A♭：三个音各走半音，没有共同音；它是 PL 循环里正对面的两个三和弦。', 'C→C♭(B)・E→E♭・G→A♭：3 音とも半音、共通音なし。PL サイクルの真向かいの 2 つ。', 'C→C♭ (B), E→E♭, G→A♭: every note moves a semitone, no common tone — opposite corners of the PL cycle.') },
      },
      {
        id: 'b211x-e9', type: 'page', ref: 'mto-mcclimon',
        title: t('进阶 4 · 七和弦呢？Power Towers', '発展 4・七の和音は？ パワー・タワー', 'Advanced 4 · What about seventh chords? Power Towers', ),
        text: [
          t('新黎曼的基本变换只管大小三和弦。七和弦的节约声部进行也有人建模：Childs（1998）的模型和三和弦的新黎曼变换很接近，Gollin（1998）探索三维的 Tonnetz、特别关注属七与半减七。Douthett 与 Steinbach（1998）的模型又把小七和弦与全减七和弦也纳进来，用一张他们叫作"Power Towers"的图来表示。', 'ネオ・リーマンの基本変換は長短三和音だけを扱う。七の和音の節約的声部進行をモデル化した人もいる：チャイルズ（1998）のモデルは三和音のネオ・リーマン変換に近く、ゴリン（1998）は 3 次元のトーンネッツを探り、とくに属七と半減七に注目した。ダウセットとスタインバック（1998）のモデルは短七と完全減七も含め、彼らが「パワー・タワー」と呼ぶ図で表した。', 'The basic neo-Riemannian transformations handle only major and minor triads. Others have modelled parsimonious voice leading among sevenths: Childs (1998) builds a model close to triadic transformations; Gollin (1998) explores three-dimensional Tonnetze focused on dominant and half-diminished sevenths; Douthett and Steinbach (1998) also include minor sevenths and fully diminished sevenths, in a diagram they call the “Power Towers”.'),
        ],
      },
    ],
    experiment: [
      { id: 'b211x-x1', type: 'experiment', toy: 'plr', ref: 'omt2e-neo-riemannian',
        prompt: t('从 C 大三开始：先交替按 P、L，数几步回到 C（应该是 6）；再交替按 R、P，数几步（应该是 8）。最后试试连按两次同一个变换——是不是回到了原来的和弦？', 'C の長三和音から：P と L を交互に押して何歩で C に戻るか（6 のはず）、次に R と P を交互に（8 のはず）。最後に同じ変換を 2 回続けて——元の和音に戻る？', 'From C major: alternate P and L and count the steps back to C (six); then alternate R and P (eight). Finally press one transformation twice — back where you started?'),
        params: {},
        breakthrough: { id: 'b211x-cycles', text: t('你亲手走完了 PL 和 RP 循环，也证实了每个变换"按两次就回来"。', 'PL と RP のサイクルを自分で歩き、どの変換も「2 回で戻る」ことを確かめた。', 'You walked the PL and RP cycles yourself and confirmed that each transformation undoes itself.') } },
    ],
    challenge: [
      {
        id: 'b211x-c1', type: 'choice', error: 'nr-transform', skills: ['calc'], ref: 'omt2e-neo-riemannian',
        variants: [
          { prompt: t('对 E 大三（E G♯ B）做 L，得到？', 'E の長三和音（E G♯ B）に L は？', 'L on E major (E G♯ B) gives…'), options: [t('G♯ 小三（G♯ B D♯）', 'G♯ の短三和音（G♯ B D♯）', 'G♯ minor (G♯ B D♯)'), t('C♯ 小三', 'C♯ の短三和音', 'C♯ minor'), t('E 小三', 'E の短三和音', 'E minor')] },
          { prompt: t('对 D 小三（D F A）做 P，得到？', 'D の短三和音（D F A）に P は？', 'P on D minor (D F A) gives…'), options: [t('D 大三（D F♯ A）', 'D の長三和音（D F♯ A）', 'D major (D F♯ A)'), t('F 大三', 'F の長三和音', 'F major'), t('B♭ 大三', 'B♭ の長三和音', 'B♭ major')] },
          { prompt: t('对 A 大三（A C♯ E）做 S（滑动），得到？', 'A の長三和音（A C♯ E）に S は？', 'S on A major (A C♯ E) gives…'), options: [t('B♭ 小三（B♭ D♭ F）', 'B♭ の短三和音（B♭ D♭ F）', 'B♭ minor (B♭ D♭ F)'), t('A 小三', 'A の短三和音', 'A minor'), t('F♯ 小三', 'F♯ の短三和音', 'F♯ minor')] },
        ],
        answer: 0,
        explain: t('L 保留小三度、根音下行半音；P 保留纯五度、三音走半音；S 移动纯五度的两个音、保留三音（C♯ = D♭）。', 'L は短 3 度を残し根音が半音下。P は完全 5 度を残し第 3 音が半音。S は 5 度の 2 音を動かし第 3 音を残す（C♯ = D♭）。', 'L keeps the minor third and drops the root a semitone; P keeps the fifth and moves the third; S moves the fifth’s two notes and keeps the third (C♯ = D♭).'),
      },
      {
        id: 'b211x-c2', type: 'choice', error: 'nr-transform', skills: ['identify'], ref: 'omt2e-neo-riemannian',
        variants: [
          { prompt: t('RP 循环所有音合起来是什么音阶？', 'RP サイクルの音を合わせると何の音階？', 'The RP cycle’s notes together form which scale?'), options: [t('八声音阶（半音、全音交替）', '八音音階（半音と全音の交互）', 'Octatonic (semitones and whole tones)'), t('六声音阶', '六音音階', 'Hexatonic'), t('全音音阶', '全音音階', 'Whole-tone')] },
          { prompt: t('哪个循环要经过全部 24 个大小三和弦？', '24 個すべてを通るサイクルは？', 'Which cycle passes through all 24 major and minor triads?'), options: ['RL', 'PL', 'RP', 'PLR'] },
          { prompt: t('PL 循环几步闭合？', 'PL サイクルは何歩で閉じる？', 'How many steps does the PL cycle take?'), options: ['6', '8', '24', '4'] },
        ],
        answer: 0,
        explain: t('PL 六步（六声音阶），RP 八步（八声音阶），RL 经过全部 24 个；PLR 走两轮、围着一个音转。', 'PL 6 歩（六音音階）、RP 8 歩（八音音階）、RL は 24 個すべて。PLR は 2 周、1 音のまわり。', 'PL in six (hexatonic), RP in eight (octatonic), RL through all 24; PLR takes two rounds around one note.'),
      },
      {
        id: 'b211x-c3', type: 'listen', error: 'nr-transform', skills: ['hearing'], ref: 'omt2e-neo-riemannian',
        prompt: t('听两个和弦（从 C 大三出发）：这是哪个变换？', '2 つの和音を聴こう（C の長三和音から）：どの変換？', 'Hear two chords (from C major): which transformation?'),
        options: ['P', 'L', 'R', 'H'],
        variants: [
          { play: [{ label: t('播放', '再生', 'Play'), audio: { notes: [[60, 64, 67], [60, 63, 67]], mode: 'chords' } }], answer: 0 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: { notes: [[60, 64, 67], [59, 64, 67]], mode: 'chords' } }], answer: 1 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: { notes: [[60, 64, 67], [60, 64, 69]], mode: 'chords' } }], answer: 2 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: { notes: [[60, 64, 67], [59, 63, 68]], mode: 'chords' } }], answer: 3 },
        ],
        explain: t('P：三音下行半音；L：根音下行半音；R：五音上行全音；H：三个音都动半音。', 'P：第 3 音が半音下、L：根音が半音下、R：第 5 音が全音上、H：3 音とも半音。', 'P: the third drops a semitone; L: the root drops a semitone; R: the fifth rises a whole tone; H: all three move a semitone.'),
        breakthrough: { id: 'b211x-hear', text: t('你用耳朵听出了哪个音在动。', 'どの音が動いたかを耳で聞き取った。', 'You heard which note moved.') },
      },
      {
        id: 'b211x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: ['omt2e-neo-riemannian', 'mto-mcclimon'],
        variants: [
          { prompt: t('Tonnetz 上，L 变换沿哪条边翻三角形？', 'トーンネッツで L 変換はどの辺で三角形を裏返す？', 'On the Tonnetz, L flips a triangle across which edge?'), options: [t('小三度那条边', '短 3 度の辺', 'The minor-third edge'), t('纯五度那条边', '完全 5 度の辺', 'The fifth edge'), t('大三度那条边', '長 3 度の辺', 'The major-third edge')] },
          { prompt: t('"Weitzmann 区域"是以什么为中心？', '「ヴァイツマン領域」の中心は？', 'What is at the centre of a Weitzmann region?'), options: [t('一个增三和弦', '増三和音', 'An augmented triad'), t('一个减七和弦', '減七の和音', 'A diminished seventh'), t('一个属七和弦', '属七の和音', 'A dominant seventh')] },
          { prompt: t('Douthett 与 Steinbach 的 Power Towers 纳入了哪两种七和弦，补上前人模型的不足？', 'ダウセットとスタインバックのパワー・タワーが加えた 2 種の七の和音は？', 'Which two seventh-chord types did Douthett and Steinbach’s Power Towers add?'), options: [t('小七和弦与全减七和弦', '短七と完全減七', 'Minor sevenths and fully diminished sevenths'), t('大七和弦与增七和弦', '長七と増七', 'Major and augmented sevenths'), t('属七和弦与大七和弦', '属七と長七', 'Dominant and major sevenths')] },
        ],
        answer: 0,
        explain: t('P 沿五度、R 沿大三度、L 沿小三度翻；Weitzmann 区域以增三和弦为中心；Power Towers 加入小七与全减七。', 'P は 5 度、R は長 3 度、L は短 3 度の辺。ヴァイツマン領域の中心は増三和音。パワー・タワーは短七と完全減七を加えた。', 'P flips across the fifth, R the major third, L the minor third; Weitzmann regions centre on an augmented triad; the Power Towers add minor and fully diminished sevenths.'),
      },
      G('b211x-g1', 'plr', 1, ['calc']),
      G('b211x-g2', 'plrCycle', 1, ['identify']),
    ],
  },
  pool: [G('b211x-p1', 'plr', 3, ['calc']), G('b211x-p2', 'plrCycle', 2, ['identify'])],
};

export const EXT_HARMONY = { 'B2-1': EXT_B2_1, 'B2-2': EXT_B2_2, 'B2-3': EXT_B2_3, 'B2-4': EXT_B2_4, 'B2-5': EXT_B2_5, 'B2-6': EXT_B2_6, 'B2-7': EXT_B2_7, 'B2-8': EXT_B2_8, 'B2-9': EXT_B2_9, 'B2-10': EXT_B2_10, 'B2-11': EXT_B2_11 };

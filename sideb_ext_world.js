// Side-B 第 5 章（世界音乐与律学）的扩展关：每个普通关通过后解锁。节奏和普通关一样（发现 → 讲解 → 实验 → 挑战），
// 把对应 A 面关卡的进阶关 + 综合测验重新、更细地讲一遍（讲解更长；挑战相当于综合测验）。节点格式见 sideb_ui.js / SIDE_B_DESIGN.md。
// 出处（每条事实都在原文里核对过）：
//   B5-1x：宫商角徵羽约等于 do re mi sol la；任何一音都可构成调式（宫调式、商调式……）；加变宫、清角成七声，二者相距三全音、一般不作主音；
//          五声来自三分损益法前五音：《史记·律书》"九九八十一以为宫。三分去一，五十四以为徵。三分益一，七十二以为商。三分去一，四十八以为羽。三分益一，六十四以为角"；管长与频率成反比：ref:zhwiki-pentatonic
//          十二律：律吕名、阴阳（六律六吕）、正律 / 半律 / 倍律；伶伦取竹的传说（《吕氏春秋》）；三分损益最早见于《管子·地员》、《史记·律书》首次确定算法与管长；京房六十律、发现"仲吕不生黄钟"；
//          钱乐之三百六十律；何承天最早提出十二平均律；吉备真备 735 年带《乐书要录》回日本；蔡元定十八律；朱载堉十二平均律；黄钟、太簇、姑洗、林钟、南吕即宫商角徵羽；
//          律吕对应 C、C♯……B；日本以壹越对应 D；三分损益以黄钟九寸为主音、用 2/3 或 4/3：ref:zhwiki-shierlu
//          七声调式：在五声的小三度间加两个偏音；清乐（加和 / 清角与导 / 变宫，又叫新音阶、下徵音阶）、燕乐（加清角与闰 / 清羽，又叫俗乐音阶、清商音阶）、
//          雅乐（加中 / 变徵与变宫，又叫古音阶、正声音阶）；仍按五声命名；主音一般是五个正音；与白键教会调式的对应表：ref:zhwiki-heptatonic
//          《礼记·礼运》"五声六律十二管旋相为宫"；《乐书要录》的"旋相为宫图"；同宫转调与异宫转调；王坦《琴旨》"以角弦易为宫弦"；长春鼓吹乐《五调朝元呔音》；
//          "七宫还原"（福建笼吹"七清"、南昆"翻七调"、广东音乐唢呐"翻七调"、吉林梨树《七宫还原冬来尾》向属方向或下属方向）；"三十五调朝元"；词牌的"犯调"；
//          高腔里因唢呐伴奏而来的旋宫转调：ref:huain-xuangong
//   B5-2x：thaat 是北印度的"母音阶"、对应卡纳提克的 melakarta；用于给拉格分类而不是作曲；拉格不一定用全 thaat 的音；也指西塔琴、维纳琴的品和卡塔克舞的起始姿势；
//          Bhatkhande（1860–1936）仿照 Venkatamakhin 约 1640 年的 melakarta、走访各 gharana、得出 32 个 thaat、选 10 个；Shree、Puriya Dhanashree 属 Poorvi、Malkauns 属 Bhairavi、Darbari Kanada 属 Asavari；
//          七个 swara 的全名、sargam、Sa 可移动；以 Bilawal（= Ionian，卡纳提克 Dheerasankarabharanam）为参照；shuddha / komal / tivra / vikrt；2⁵ = 32；thaat 的六条规则；
//          Hindol（S G M D N）归 Kalyan 也见于 Marwa、Jaijaiwanti 同时有两种 Ni；thaat 只给粗略结构，唱法看 pakad / chalan；Janak 拉格（Bilaval 来自 Alhaiya Bilaval）：ref:wiki-thaat
//          木卡姆：旋律类型、即兴技巧；72 种七声音列；由增、大、中立、小二度构成；不含节奏成分；"木卡姆"一词最早见于 14 世纪 al-Safadi 与 al-Maraghi 的论著；阿拉伯、波斯、土耳其三大文化；
//          不一定是平均律；24 平均的记谱只是惯例、四舍五入到最近的四分之一音；常用半降的是 E、B，A 较少；半升很少；不是所有调都用、因乐器而较难移调；实际音高因年代地区而异、靠耳朵学；
//          无品乐器（乌德、小提琴）或可调音乐器（nay、qanun、单簧管）能如实演奏；钢弦有品乐器靠推弦；jins 多为四音、也有三音五音；下方 jins 决定家族、上方 jins 的起点叫 dominant；
//          9 个基本 jins / 9 个家族；Bayati 和 'Ushshaq Turki 音列相同但核心音不同：ref:wiki-arabic-maqam
//          jins 是 3、4 或 5 个音的片段；木卡姆是许多 jins 之间的路径；主音、导音、ghammaz（除主音外最重要、新 jins 常从它开始）；jins 的大小 = 主音到 ghammaz 的音数；基本音阶、jins baggage、扩展音阶：ref:maqamworld-jins
//          MaqamWorld 的木卡姆索引：ref:maqamworld-maqam
//          土耳其 makam：53 koma（Holdrian comma），全音 = 9 koma，实际用 24 个；Arel-Ezgi-Uzdilek 记谱多 6 个变音记号；cins 与 seyir（上行、下行、下行—上行三种）；节奏对应物 usul；
//          由四音列加五音列构成；Durak（主音）、Güçlü（"属音"，多为五级、也常是四级、偶尔三级）、Yeden（导音）：ref:wiki-turkish-makam
//   B5-3x：泛音列定义、弦与空气柱同时多模式振动；基音被听成音高、音色主要由谐音相对强度决定；分音（Ellis 译 Helmholtz 的"简单音"）、谐音（基频也是）、谐分音、非谐性（音分）、
//          泛音（不含基频、数时小心）；马林巴 / 颤音琴 / 管钟 / 定音鼓 / 颂钵 vs 镲 / 锣；钢琴与铜管偏差的原因；与 12 平均律的差（3 +2、5 −14、7 −31、9 +4、11 −49、13 +41、15 −12）、
//          5 音分的最小可觉差；Hindemith 1930 年代末；Mersenne 引文；Dahlhaus 引文；音色还受起音瞬态、共振峰、噪音、非谐性影响；单簧管圆柱 / 萨克斯圆锥；
//          结合音（200 + 300 → 100；7:5 → 100、300、500、700，最低比低音低十七度）；David Cope（1997）的音程强度：ref:wiki-harmonic-series
//   B5-4x：毕达哥拉斯律只用 3:2 与 2:1（3:2 是八度后的下一个泛音、最易凭耳调准）；D 为中心的 E♭…G♯ 十一个纯五度；毕达哥拉斯音差约 23.46；ε ≈ 1.955、狼五度 ≈ 678.495（减六度）；
//          源自古代美索不达米亚、被误归于毕达哥拉斯；托勒密、波爱修斯把四音列划分归于埃拉托色尼；用到 16 世纪初；音程名（limma、apotome、epogdoön、semiditone、ditone、diatessaron、
//          tritone、diapente、diapason）；sesqui- 前缀都是纯律：ref:wiki-pythagorean
//          中全音律：缩窄五度改善三度、几何平均；15 世纪到 19 世纪、今天有限使用；Ramos 1482《Musica Practica》、Gaffurius 1496、Aron 1523、Zarlino 1571；四分之一同调音差；
//          平均律约 1/11 同调音差（1/12 毕达哥拉斯）；狼五度的来源；31 音（Rossi 1666、Zaragoza 1674、惠更斯 1691）与 53 份（Gallé、牛顿、Mercator）；Printz 与颤音；
//          仍用于管风琴、古乐演奏者；John Adams《Absolute Jest》2012、Ligeti《Passacaglia ungherese》1978：ref:wiki-meantone
//          Werckmeister 的两种编号（1691 论著顺序 / 单弦琴标记从 III 开始）；I (III)"正确的律"（C–G、G–D、D–A、B–F♯ 各 1/4 音差、接近中全音律五度、大三度接近 400、无狼、适合 ficte、巴赫）；
//          II (IV)（1/3 音差、自然音音乐、接近六分之一音差中全音律）；III (V)（1/4 音差、更接近平均律）；Septenarius（196 = 7 × 7 × 4）：ref:wiki-werckmeister
//          现代"Vallotti 律"= Young 第二种律的移位版、归于 Vallotti 是错误、与他真正的律听不出差别；《Della scienza teorica e pratica della moderna musica》第二卷；1728、1779、1950：ref:wiki-vallotti
const t = (zh, ja, en) => ({ zh, ja, en });
const G = (id, gen, count, skills, params) => ({ id, type: 'gen', gen, count, skills, ...(params ? { params } : {}) });

// ===================== B5-1x 中国七声调式与旋宫 · 扩展关 =====================
// 对应 A 面：heptatonic（偏音练习 / 清乐、燕乐、雅乐 / 旋宫转调 / 综合）
const EXT_B5_1 = {
  minutes: 21,
  insight: t('五声来自三分损益，十二律是同一套算法的延伸；七声在五声的小三度空隙里加两个偏音，三种加法就是三种音阶；旋宫则让宫音在十二律上转圈——转七次就"还原"。', '五声は三分損益から、十二律は同じ計算の延長。七声は五声の短 3 度の隙間に 2 つの偏音を加え、加え方の 3 通りが 3 つの音階になる。旋宮は宮音を十二律の上で回す——7 回で「還元」する。', 'The pentatonic comes from the “thirds subtracted and added” method, the twelve lü extend the same arithmetic; the heptatonic adds two bianyin in the pentatonic’s minor-third gaps, three ways giving three scales; xuangong turns gong around the twelve lü — seven turns and it is “restored”.'),
  sections: {
    discover: [
      {
        id: 'b51x-d1', type: 'discover', ref: 'zhwiki-pentatonic',
        prompt: t('《史记·律书》："九九八十一以为宫。三分去一，五十四以为徵……"一根长 81 的竹管定为宫，去掉三分之一得 54，是徵。比宫高还是低？高多少？', '『史記・律書』：「九九八十一以て宮と為す。三分去一、五十四以て徴と為す……」。長さ 81 の竹管を宮とし、3 分の 1 を去って 54 にすると徴。宮より高い？ 低い？ どれだけ？', 'The Shiji says: “nine nines, eighty-one, is gong; subtract a third, fifty-four is zhi…” A pipe of length 81 is gong; removing a third gives 54, zhi. Higher or lower than gong, and by how much?'),
        play: [{ label: t('宫 → 徵', '宮 → 徴', 'gong → zhi'), audio: { notes: [60, 67], mode: 'melody' } }],
        options: [t('高纯五度（管长变成 2/3，频率变成 3/2）', '完全 5 度高い（管長が 2/3、周波数が 3/2 に）', 'A perfect fifth higher (length × 2/3, frequency × 3/2)'), t('低纯四度', '完全 4 度低い', 'A perfect fourth lower'), t('高八度', '1 オクターヴ高い', 'An octave higher')],
        answer: 0,
        insight: {
          title: t('三分损益', '三分損益', 'Subtract a third, add a third'),
          text: t('管子两端开口，管长和基音的波长成正比、和频率成反比。81 → 54（三分去一）→ 72（三分益一）→ 48（去一）→ 64（益一），依次得到宫、徵、商、羽、角；这五个音之间是简单的整数比，所以容易和谐。这种"三分损益"在这五个音上和纯律的结果相同。', '管は両端が開いているので、管長は基音の波長に比例し、周波数に反比例する。81 → 54（三分去一）→ 72（三分益一）→ 48（去一）→ 64（益一）で、宮・徴・商・羽・角が順に得られる。この 5 音の間は簡単な整数比なので調和しやすい。この「三分損益」はこの 5 音では純正律と同じ結果になる。', 'An open pipe’s length is proportional to the wavelength of its fundamental and inversely proportional to its frequency. 81 → 54 (subtract a third) → 72 (add a third) → 48 → 64 gives gong, zhi, shang, yu, jue in turn; their simple integer ratios make them consonant. On these five notes this method gives the same result as just intonation.'),
        },
      },
    ],
    explain: [
      {
        id: 'b51x-e1', type: 'page', ref: ['zhwiki-pentatonic', 'zhwiki-shierlu'],
        title: t('进阶 1 · 五声与十二律：同一个算法', '発展 1・五声と十二律：同じ計算', 'Advanced 1 · Pentatonic and twelve lü: one algorithm'),
        text: [
          t('宫、商、角、徵、羽大致相当于简谱的 do、re、mi、sol、la，相互的音程关系固定不变；五声中任何一个音都可以当主音构成调式：以宫为主音是宫调式，以商为主音是商调式，依此类推。三分损益法的计算方法最早见于《管子·地员》；汉朝《史记·律书》首次确定十二律的具体算法和律管长度。通常以黄钟为主音、律管长九寸，再用 2/3 或 4/3 的比例依次求出其余各律。', '宮・商・角・徴・羽はおおよそ略譜の do・re・mi・sol・la に当たり、互いの音程関係は固定している。五声のどの音も主音にして旋法を作れる：宮を主音にすれば宮調式、商なら商調式、以下同様。三分損益法の計算は『管子・地員』に最初に見え、漢の『史記・律書』が初めて十二律の具体的な算法と律管の長さを定めた。ふつう黄鐘を主音とし律管を九寸として、2/3 か 4/3 の比で他の律を順に求める。', 'Gong, shang, jue, zhi, yu roughly match do, re, mi, sol, la, with fixed intervals among them; any of the five can be the tonic of a mode: gong mode, shang mode and so on. The method first appears in the Guanzi (“Diyuan”); the Han-dynasty Shiji (“Lüshu”) first fixed the twelve lü’s algorithm and pipe lengths. Usually huangzhong is the tonic with a pipe of nine cun, and the other lü follow by ratios of 2/3 or 4/3.'),
          t('十二律依次叫黄钟、大吕、太簇、夹钟、姑洗、仲吕、蕤宾、林钟、夷则、南吕、无射、应钟，其中黄钟、太簇、姑洗、林钟、南吕就是五音的宫、商、角、徵、羽。单数的六律属阳、叫"律"，双数的六律属阴、叫"吕"，所以又称律吕、六律六吕；十二律又称正律，以区别于高八度的"半律"和低八度的"倍律"。中国通常把它们对应为 C、C♯、D……B，日本则以壹越对应 D。', '十二律は順に黄鐘・大呂・太簇・夾鐘・姑洗・仲呂・蕤賓・林鐘・夷則・南呂・無射・応鐘といい、そのうち黄鐘・太簇・姑洗・林鐘・南呂が五音の宮・商・角・徴・羽。奇数番目の 6 つは陽で「律」、偶数番目の 6 つは陰で「呂」なので、律呂・六律六呂ともいう。十二律は正律ともいい、1 オクターヴ上の「半律」、下の「倍律」と区別する。中国ではふつう C・C♯・D……B に当て、日本は壱越を D に当てる。', 'The twelve lü are huangzhong, dalü, taicu, jiazhong, guxian, zhonglü, ruibin, linzhong, yize, nanlü, wuyi, yingzhong; huangzhong, taicu, guxian, linzhong and nanlü are gong, shang, jue, zhi, yu. The odd-numbered six are yang, called lü (律), the even six yin, called lü (吕) — hence lülü, “six lü and six lü”; they are also the “proper lü”, distinguished from octave-higher “half lü” and octave-lower “double lü”. China usually maps them to C, C♯, D … B; Japan maps ichikotsu to D.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('管长', '管長', 'length'), cells: ['81', '54', '72', '48', '64'] }, { label: t('音', '音', 'note'), cells: [t('宫', '宮', 'gong'), t('徵', '徴', 'zhi'), t('商', '商', 'shang'), t('羽', '羽', 'yu'), t('角', '角', 'jue')] }] },
      },
      {
        id: 'b51x-e2', type: 'discover', practice: true, ref: 'zhwiki-pentatonic',
        prompt: t('商的管长 72，按"三分去一"得到哪个音？管长多少？', '商の管長 72 を「三分去一」すると、どの音で管長はいくつ？', 'Shang’s pipe is 72. Subtracting a third gives which note, and what length?'),
        options: [t('羽，48', '羽、48', 'Yu, 48'), t('角，64', '角、64', 'Jue, 64'), t('徵，54', '徴、54', 'Zhi, 54')],
        answer: 0,
        insight: { title: t('72 × 2/3 = 48', '72 × 2/3 = 48', '72 × 2/3 = 48'), text: t('去一是 ×2/3（高纯五度）：商的上方五度是羽；再三分益一（×4/3）得 64，是角。', '去一は ×2/3（完全 5 度上）：商の 5 度上は羽。さらに三分益一（×4/3）で 64、角。', 'Subtracting a third is × 2/3 (up a fifth): a fifth above shang is yu; adding a third (× 4/3) then gives 64, jue.') },
      },
      {
        id: 'b51x-e3', type: 'page', ref: 'zhwiki-shierlu',
        title: t('进阶 2 · 十二律的历史：从伶伦到朱载堉', '発展 2・十二律の歴史：伶倫から朱載堉へ', 'Advanced 2 · A history of the twelve lü: from Ling Lun to Zhu Zaiyu'),
        text: [
          t('《吕氏春秋·古乐》记载，黄帝命乐官伶伦制乐，伶伦取竹截成三寸九分吹出"黄钟"，又听凤凰的鸣叫确定十二律。汉朝京房在三分损益的基础上从十二律推出六十律，并第一个发现三分损益"仲吕不生黄钟"的问题——从仲吕再算下去回不到黄钟。刘宋的钱乐之再推出三百六十律；同时期的何承天在三分损益的基础上按线性关系调整律管长度，成为世界上最早提出十二平均律的人。', '『呂氏春秋・古楽』によれば、黄帝は楽官の伶倫に楽を作らせ、伶倫は竹を三寸九分に切って「黄鐘」を吹き、鳳凰の鳴き声を聞いて十二律を定めた。漢の京房は三分損益をもとに十二律から六十律を導き、三分損益の「仲呂は黄鐘を生まず」——仲呂から計算を続けても黄鐘に戻らない——という問題を初めて見つけた。劉宋の銭楽之はさらに三百六十律を導き、同時代の何承天は三分損益をもとに線形の関係で律管の長さを調整し、世界で最初に十二平均律を唱えた人となった。', 'The Lüshi Chunqiu says the Yellow Emperor ordered the music official Ling Lun to create music; Ling Lun cut bamboo three cun nine fen long to sound huangzhong and fixed the twelve lü by listening to the phoenix. In the Han, Jing Fang extended the method from twelve to sixty lü and first discovered that “zhonglü does not generate huangzhong” — continuing from zhonglü never returns to huangzhong. In the Liu Song, Qian Lezhi derived 360 lü, while He Chengtian adjusted pipe lengths by a linear relation, becoming the first in the world to propose twelve-tone equal temperament.'),
          t('735 年，遣唐使吉备真备把《乐书要录》带回日本，十二律由此传入日本（也传入朝鲜）；宋朝蔡元定在十二律之上新增六个变律成十八律；明朝朱载堉跳出三分损益，用连续比例把八度分成十二等分，成功生成十二平均律。日本在平安时代后期按雅乐调名把律名改为壹越、断金、平调……，现在以 D 对应壹越。', '735 年、遣唐使の吉備真備が『楽書要録』を日本に持ち帰り、十二律が日本に伝わった（朝鮮にも伝わった）。宋の蔡元定は十二律に 6 つの変律を加えて十八律とし、明の朱載堉は三分損益を離れ、連続比で 1 オクターヴを 12 等分して十二平均律を作り出した。日本では平安時代後期に雅楽の調名によって律名を壱越・断金・平調……と改め、現在は壱越を D に当てる。', 'In 735 the envoy Kibi no Makibi brought the Yueshu Yaolu back to Japan, introducing the twelve lü there (they also reached Korea); in the Song, Cai Yuanding added six variant lü for eighteen; in the Ming, Zhu Zaiyu left the method behind and divided the octave into twelve equal parts by continuous proportion, producing twelve-tone equal temperament. In late Heian Japan the lü were renamed after gagaku modes — ichikotsu, tangin, hyōjō… — and ichikotsu now corresponds to D.'),
        ],
      },
      {
        id: 'b51x-e4', type: 'discover', practice: true, ref: 'zhwiki-shierlu',
        prompt: t('谁最早发现三分损益"仲吕不生黄钟"的问题？', '三分損益の「仲呂は黄鐘を生まず」という問題を最初に見つけたのは？', 'Who first discovered that “zhonglü does not generate huangzhong”?'),
        options: [t('汉朝京房', '漢の京房', 'Jing Fang (Han)'), t('明朝朱载堉', '明の朱載堉', 'Zhu Zaiyu (Ming)'), t('刘宋何承天', '劉宋の何承天', 'He Chengtian (Liu Song)')],
        answer: 0,
        insight: { title: t('回不到起点', '出発点に戻れない', 'It never comes back'), text: t('京房推出六十律时发现了这个问题；何承天最早提出十二平均律，朱载堉成功生成十二平均律。', '京房が六十律を導くときに見つけた。何承天が最初に十二平均律を唱え、朱載堉が十二平均律を作り出した。', 'Jing Fang found it while deriving sixty lü; He Chengtian first proposed equal temperament and Zhu Zaiyu produced it.') },
      },
      {
        id: 'b51x-e5', type: 'page', ref: ['zhwiki-heptatonic', 'zhwiki-pentatonic'],
        title: t('进阶 3 · 三种七声音阶与西方调式的对应', '発展 3・3 つの七声音階と西洋の旋法', 'Advanced 3 · The three heptatonic scales and Western modes'),
        text: [
          t('七声调式是在五声调式的小三度音程里加入两个偏音得到的。加入和音（清角）和导音（变宫）是清乐调式，又叫新音阶、下徵音阶；加入和音（清角）和闰音（清羽）是燕乐调式，又叫俗乐音阶、清商音阶；加入中音（变徵）和导音（变宫）是雅乐调式，又叫古音阶、正声音阶。它们虽然多了两个音，却没有改变五声调式的基本特点，仍按五声的方法命名（如"清乐宫调式"）；一般只用宫、商、角、徵、羽当主音，很少用偏音，因为偏音非常不稳定、不和谐——清角和变宫之间是三全音。', '七声調式は五声調式の短 3 度の音程に 2 つの偏音を加えたもの。和音（清角）と導音（変宮）を加えると清楽調式で、新音階・下徴音階ともいう。和音（清角）と閏音（清羽）を加えると燕楽調式で、俗楽音階・清商音階ともいう。中音（変徴）と導音（変宮）を加えると雅楽調式で、古音階・正声音階ともいう。2 音多いが五声調式の基本的な特徴は変わらず、名前も五声の方法による（「清楽宮調式」など）。ふつう宮・商・角・徴・羽だけを主音にし、偏音はほとんど使わない。偏音はとても不安定で不協和だから——清角と変宮の間は三全音。', 'Heptatonic modes add two bianyin in the pentatonic’s minor-third gaps. Adding he (qingjue) and dao (biangong) gives qingyue, also called the new scale or xiazhi scale; adding he (qingjue) and run (qingyu) gives yanyue, also the popular or qingshang scale; adding zhong (bianzhi) and dao (biangong) gives yayue, also the ancient or zhengsheng scale. Two extra notes do not change the pentatonic character, and the modes keep pentatonic names (e.g. “qingyue gong mode”); the tonic is normally one of the five main notes, rarely a bianyin, which is very unstable and dissonant — qingjue and biangong are a tritone apart.'),
          t('维基的对照表把它们和只用白键的教会调式对应起来：以宫为主音时，清乐音阶的宫商角和徵羽导是 1 2 3 4 5 6 7——Ionian；燕乐音阶从 5 开始（5 6 7 1 2 3 4）——Mixolydian；雅乐音阶从 4 开始（4 5 6 7 1 2 3）——Lydian。也就是说，C 宫清乐是 C 大调音阶，C 宫燕乐是 C D E F G A B♭，C 宫雅乐是 C D E F♯ G A B。', 'ウィキペディアの対照表は、白鍵だけの教会旋法に対応させる：宮を主音とすると、清楽音階の宮商角和徴羽導は 1 2 3 4 5 6 7——イオニア。燕楽音階は 5 から（5 6 7 1 2 3 4）——ミクソリディア。雅楽音階は 4 から（4 5 6 7 1 2 3）——リディア。つまり C 宮の清楽はハ長調の音階、C 宮の燕楽は C D E F G A B♭、C 宮の雅楽は C D E F♯ G A B。', 'Wikipedia’s table maps them to white-key church modes: with gong as tonic, qingyue’s gong-shang-jue-he-zhi-yu-dao are 1 2 3 4 5 6 7 — Ionian; yanyue starts on 5 (5 6 7 1 2 3 4) — Mixolydian; yayue starts on 4 (4 5 6 7 1 2 3) — Lydian. So C-gong qingyue is the C major scale, C-gong yanyue C D E F G A B♭, C-gong yayue C D E F♯ G A B.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('清乐', '清楽', 'qingyue'), cells: ['C D E F G A B', 'Ionian'] }, { label: t('燕乐', '燕楽', 'yanyue'), cells: ['C D E F G A B♭', 'Mixolydian'] }, { label: t('雅乐', '雅楽', 'yayue'), cells: ['C D E F♯ G A B', 'Lydian'] }] },
      },
      {
        id: 'b51x-e6', type: 'discover', practice: true, ref: 'zhwiki-heptatonic',
        prompt: t('雅乐音阶以宫为主音时，和哪个教会调式同音？', '雅楽音階を宮から始めると、どの教会旋法と同じ音？', 'Yayue with gong as tonic has the same notes as which church mode?'),
        options: ['Lydian', 'Mixolydian', 'Ionian', 'Dorian'],
        answer: 0,
        insight: { title: t('变徵就是 ♯4', '変徴は ♯4', 'Bianzhi is ♯4'), text: t('雅乐加的是变徵（♯fa）和变宫（ti）：C D E F♯ G A B，正是 C Lydian。', '雅楽が加えるのは変徴（♯fa）と変宮（ti）：C D E F♯ G A B、まさに C リディア。', 'Yayue adds bianzhi (♯fa) and biangong (ti): C D E F♯ G A B, exactly C Lydian.') },
      },
      {
        id: 'b51x-e7', type: 'page', ref: 'huain-xuangong',
        title: t('进阶 4 · 旋相为宫：同宫、异宫与"七宫还原"', '発展 4・旋相為宮：同宮・異宮と「七宮還元」', 'Advanced 4 · Xuan xiang wei gong: same-gong, different-gong and “seven-gong restoration”'),
        text: [
          t('中国自古把五声和天道伦理对应，所以特别重视"移宫犯调"的理论。早在先秦，《礼记·礼运》就有"五声六律十二管旋相为宫"的记载；唐代《乐书要录》还载有把干支、方位、月律等综合在一起的"旋相为宫图"，实质是像旋转的轮盘一样判明宫调转换：从图上既能得到同一个宫（均）之下各调的调头律高——同宫转调，也能得到不同宫（均）之下各调的律高——异宫转调。清代王坦《琴旨》说得很清楚："所谓旋宫转调也，以角弦易为宫弦，其宫旋；角既为宫，则宫转为徵，徵生商而转商，商生羽而转羽，羽生角而转角也。"', '中国では古くから五声を天道や倫理に対応させたので、「移宮犯調」の理論を特に重んじた。先秦には『礼記・礼運』に「五声六律十二管旋りて相い宮と為る」とあり、唐の『楽書要録』には干支・方位・月律などをまとめた「旋相為宮図」も載る。実質は回る円盤のように宮調の転換を判断するもの：図から同じ宮（均）の下の各調の主音の律高——同宮転調——も、違う宮（均）の下の各調の律高——異宮転調——も得られる。清の王坦『琴旨』ははっきり言う：「所謂旋宮転調とは、角弦を以て宮弦に易え、其の宮旋る。角既に宮と為れば、則ち宮は転じて徴と為り……」。', 'China has long linked the five notes with cosmic and ethical order, so it valued the theory of “moving gong and crossing modes”. In the pre-Qin Liji (“Liyun”) we read: “five notes, six lü and twelve pipes revolve, each in turn becoming gong”; the Tang Yueshu Yaolu contains a “revolving-gong chart” combining stems and branches, directions and monthly lü — in essence a rotating wheel for working out modal changes: it gives the pitches of each mode under one gong (same-gong modulation) and under different gongs (different-gong modulation). Wang Tan’s Qing-dynasty Qinzhi explains: “rotating gong means taking the jue string as the gong string; once jue is gong, gong becomes zhi…”'),
          t('民间音乐里也有这些手法。长春鼓吹乐《五调朝元呔音》在同一个宫系统里依次转换宫、商、角、徵、羽五种调式，最后回到宫调式，叫"朝元"。"七宫还原"是南北乐种都常见的方式：福建"笼吹"的"七清"、南昆过场曲牌的"翻七调"、广东音乐唢呐的"翻七调"；吉林梨树县的《七宫还原冬来尾》向"属方向"或"下属方向"在七个不同的调高上旋宫转调，最后回到起始调，实现"还原"。还有"三十五调朝元"。词牌的"犯调"也有转调或转调式的意思；高腔唱腔里也有因唢呐伴奏而来的旋宫转调。', '民間音楽にもこうした手法がある。長春の鼓吹楽《五調朝元呔音》は同じ宮の系統の中で宮・商・角・徴・羽の 5 つの調式を順に転換し、最後に宮調式に戻る——「朝元」。「七宮還元」は南北の楽種によく見られる：福建の「籠吹」の「七清」、南崑の過場曲牌の「翻七調」、広東音楽のチャルメラの「翻七調」。吉林省梨樹県の《七宮還元冬来尾》は「属方向」か「下属方向」へ 7 つの調高で旋宮転調し、最後に出発の調に戻って「還元」する。「三十五調朝元」もある。詞牌の「犯調」にも転調・転旋法の意味があり、高腔の唱腔にもチャルメラの伴奏による旋宮転調がある。', 'Folk music uses these techniques too. The Changchun wind-and-percussion piece “Wudiao chaoyuan daiyin” moves through the gong, shang, jue, zhi and yu modes within one gong system and returns to gong — “paying homage to the origin”. “Seven-gong restoration” is common north and south: “qiqing” in Fujian longchui, “fan qi diao” in Southern Kun interlude tunes and in Cantonese suona music; “Qigong huanyuan donglaiwei” from Lishu county, Jilin, modulates by xuangong through seven pitch levels toward the dominant or subdominant side and returns to the opening key. There is even a “thirty-five-mode homage”. The ci-poetry term fandiao also means changing key or mode, and gaoqiang singing has xuangong modulations arising from suona accompaniment.'),
        ],
      },
      {
        id: 'b51x-e8', type: 'discover', practice: true, ref: 'huain-xuangong',
        prompt: t('《五调朝元呔音》属于哪一种转调？', '《五調朝元呔音》はどちらの転調？', '“Wudiao chaoyuan daiyin” is which kind of modulation?'),
        options: [t('同宫转调：宫不变，换五种调式', '同宮転調：宮はそのまま、5 つの調式を替える', 'Same-gong: gong stays, five modes in turn'), t('异宫转调：宫音换了七次', '異宮転調：宮音が 7 回替わる', 'Different-gong: gong changes seven times'), t('不转调', '転調しない', 'No modulation')],
        answer: 0,
        insight: { title: t('朝元与还原', '朝元と還元', 'Homage versus restoration'), text: t('"五调朝元"在同一个宫系统里换调式；"七宫还原"则在七个不同的调高上旋宫。', '「五調朝元」は同じ宮の系統で調式を替え、「七宮還元」は 7 つの調高で旋宮する。', '“Five-mode homage” changes mode within one gong; “seven-gong restoration” rotates gong through seven pitch levels.') },
      },
    ],
    experiment: [
      { id: 'b51x-x1', type: 'experiment', toy: 'xuangong', ref: ['zhwiki-heptatonic', 'huain-xuangong', 'zhwiki-shierlu'],
        prompt: t('这次从 F 宫的燕乐音阶开始。先在同一个宫里依次换宫、商、角、徵、羽调式（同宫转调，像"五调朝元"）；再连续向上旋宫七次（异宫转调，像"七宫还原"）——会回到哪里？换成清乐、雅乐，偏音的位置怎么变？', '今回は F 宮の燕楽音階から始める。まず同じ宮で宮・商・角・徴・羽の調式を順に替え（同宮転調、「五調朝元」のように）、次に続けて 7 回上へ旋宮しよう（異宮転調、「七宮還元」のように）——どこに戻る？ 清楽・雅楽に替えると偏音の位置はどう変わる？', 'This time start from F-gong yanyue. First change gong, shang, jue, zhi, yu modes within one gong (same-gong, like “five-mode homage”); then rotate gong upward seven times (different-gong, like “seven-gong restoration”) — where do you end up? Switch to qingyue and yayue: where do the bianyin move?'),
        params: { gong: 'F', type: 'yanyue' },
        breakthrough: { id: 'b51x-wheel', text: t('你亲手转了一圈"旋相为宫图"。', '「旋相為宮図」を自分の手で 1 周回した。', 'You turned the revolving-gong wheel with your own hands.') } },
    ],
    challenge: [
      {
        id: 'b51x-c1', type: 'choice', error: 'chinese-mode', skills: ['calc'], ref: 'zhwiki-pentatonic',
        variants: [
          { prompt: t('羽的管长 48，"三分益一"得到？', '羽の管長 48 を「三分益一」すると？', 'Yu’s pipe is 48; adding a third gives…'), options: [t('角，64', '角、64', 'jue, 64'), t('宫，81', '宮、81', 'gong, 81'), t('商，72', '商、72', 'shang, 72')] },
          { prompt: t('三分损益法的计算最早见于？', '三分損益法の計算が最初に見えるのは？', 'The method first appears in…'), options: [t('《管子·地员》', '『管子・地員』', 'the Guanzi (“Diyuan”)'), t('《乐书要录》', '『楽書要録』', 'the Yueshu Yaolu'), t('《琴旨》', '『琴旨』', 'the Qinzhi')] },
          { prompt: t('为什么七声调式一般不用清角或变宫当主音？', 'なぜ七声調式はふつう清角や変宮を主音にしない？', 'Why are qingjue and biangong rarely the tonic?'), options: [t('它们很不稳定，两者相距三全音', 'とても不安定で、2 つは三全音離れているから', 'They are unstable, a tritone apart'), t('它们太低', '低すぎるから', 'They are too low'), t('古书禁止', '古書が禁じたから', 'Ancient texts forbid it')] },
        ],
        answer: 0,
        explain: t('48 × 4/3 = 64，是角；三分损益最早见于《管子·地员》；清角和变宫相距三全音、不稳定。', '48 × 4/3 = 64、角。三分損益は『管子・地員』が最初。清角と変宮は三全音離れ、不安定。', '48 × 4/3 = 64, jue; the method first appears in the Guanzi; qingjue and biangong are a tritone apart and unstable.'),
      },
      {
        id: 'b51x-c2', type: 'choice', error: 'concept', skills: ['identify'], ref: 'zhwiki-shierlu',
        variants: [
          { prompt: t('十二律里哪五个律就是宫商角徵羽？', '十二律のうち宮商角徴羽に当たる 5 つは？', 'Which five lü are gong, shang, jue, zhi, yu?'), options: [t('黄钟、太簇、姑洗、林钟、南吕', '黄鐘・太簇・姑洗・林鐘・南呂', 'huangzhong, taicu, guxian, linzhong, nanlü'), t('黄钟、大吕、太簇、夹钟、姑洗', '黄鐘・大呂・太簇・夾鐘・姑洗', 'huangzhong, dalü, taicu, jiazhong, guxian'), t('林钟、夷则、南吕、无射、应钟', '林鐘・夷則・南呂・無射・応鐘', 'linzhong, yize, nanlü, wuyi, yingzhong')] },
          { prompt: t('谁最早提出十二平均律？', '最初に十二平均律を唱えたのは？', 'Who first proposed twelve-tone equal temperament?'), options: [t('刘宋何承天', '劉宋の何承天', 'He Chengtian (Liu Song)'), t('宋朝蔡元定', '宋の蔡元定', 'Cai Yuanding (Song)'), t('汉朝京房', '漢の京房', 'Jing Fang (Han)')] },
          { prompt: t('十二律是怎样传入日本的？', '十二律はどうやって日本に伝わった？', 'How did the twelve lü reach Japan?'), options: [t('735 年吉备真备带回《乐书要录》', '735 年に吉備真備が『楽書要録』を持ち帰った', 'Kibi no Makibi brought back the Yueshu Yaolu in 735'), t('明朝朱载堉东渡', '明の朱載堉が渡った', 'Zhu Zaiyu travelled there'), t('平安时代从朝鲜传入', '平安時代に朝鮮から', 'From Korea in the Heian period')] },
        ],
        answer: 0,
        explain: t('黄钟、太簇、姑洗、林钟、南吕即五音；何承天最早提出、朱载堉成功生成十二平均律；吉备真备 735 年带回《乐书要录》。', '黄鐘・太簇・姑洗・林鐘・南呂が五音。何承天が最初に唱え、朱載堉が作り出した。吉備真備が 735 年に『楽書要録』を持ち帰った。', 'Huangzhong, taicu, guxian, linzhong, nanlü are the five notes; He Chengtian proposed and Zhu Zaiyu produced equal temperament; Kibi no Makibi brought the Yueshu Yaolu in 735.'),
      },
      {
        id: 'b51x-c3', type: 'choice', error: 'chinese-mode', skills: ['identify'], ref: 'zhwiki-heptatonic',
        variants: [
          { prompt: t('清乐音阶又叫？', '清楽音階の別名は？', 'Qingyue is also called…'), options: [t('新音阶、下徵音阶', '新音階・下徴音階', 'the new scale, xiazhi scale'), t('古音阶、正声音阶', '古音階・正声音階', 'the ancient scale, zhengsheng scale'), t('俗乐音阶、清商音阶', '俗楽音階・清商音階', 'the popular scale, qingshang scale')] },
          { prompt: t('C 宫燕乐音阶是？', 'C 宮の燕楽音階は？', 'C-gong yanyue is…'), options: ['C D E F G A B♭', 'C D E F♯ G A B', 'C D E F G A B'] },
          { prompt: t('雅乐调式加的两个偏音是？', '雅楽調式が加える 2 つの偏音は？', 'Which two bianyin does yayue add?'), options: [t('变徵和变宫', '変徴と変宮', 'bianzhi and biangong'), t('清角和闰', '清角と閏', 'qingjue and run'), t('清角和变宫', '清角と変宮', 'qingjue and biangong')] },
        ],
        answer: 0,
        explain: t('清乐 = 新音阶；燕乐 C D E F G A B♭；雅乐加变徵和变宫。', '清楽 = 新音階。燕楽は C D E F G A B♭。雅楽は変徴と変宮を加える。', 'Qingyue = the new scale; yanyue is C D E F G A B♭; yayue adds bianzhi and biangong.'),
      },
      {
        id: 'b51x-c4', type: 'choice', error: 'chinese-mode', skills: ['identify'], ref: 'huain-xuangong',
        variants: [
          { prompt: t('"五声六律十二管旋相为宫"出自？', '「五声六律十二管旋りて相い宮と為る」の出典は？', '“Five notes, six lü, twelve pipes revolve to be gong” comes from…'), options: [t('《礼记·礼运》', '『礼記・礼運』', 'the Liji (“Liyun”)'), t('《史记·律书》', '『史記・律書』', 'the Shiji (“Lüshu”)'), t('《吕氏春秋》', '『呂氏春秋』', 'the Lüshi Chunqiu')] },
          { prompt: t('《七宫还原冬来尾》怎样转调？', '《七宮還元冬来尾》はどう転調する？', 'How does “Qigong huanyuan donglaiwei” modulate?'), options: [t('向属方向或下属方向在七个调高上旋宫，最后回到起始调', '属方向か下属方向へ 7 つの調高で旋宮し、最後に出発の調に戻る', 'Through seven pitch levels toward dominant or subdominant, back to the start'), t('在同一个宫里换五种调式', '同じ宮で 5 つの調式を替える', 'Five modes within one gong'), t('只转一次', '1 回だけ転調', 'Just once')] },
          { prompt: t('从"旋相为宫图"上可以得到哪两种转调？', '「旋相為宮図」から得られる 2 種の転調は？', 'Which two kinds of modulation can be read from the revolving-gong chart?'), options: [t('同宫转调和异宫转调', '同宮転調と異宮転調', 'same-gong and different-gong'), t('关系调和同主音调', '平行調と同主調', 'relative and parallel'), t('上行和下行', '上行と下行', 'ascending and descending')] },
        ],
        answer: 0,
        explain: t('出自《礼记·礼运》；《七宫还原冬来尾》在七个调高上旋宫后还原；旋相为宫图能读出同宫与异宫转调。', '出典は『礼記・礼運』。《七宮還元冬来尾》は 7 つの調高で旋宮して還元。旋相為宮図から同宮・異宮転調が読める。', 'From the Liji; the Lishu piece rotates through seven pitch levels and returns; the chart gives same-gong and different-gong modulation.'),
      },
      G('b51x-g1', 'chineseNote', 2, ['identify'], { heptatonic: true }),
    ],
  },
  pool: [G('b51x-p1', 'chineseNote', 4, ['identify'], { heptatonic: true })],
};

// ===================== B5-2x thaat 与木卡姆 · 扩展关 =====================
// 对应 A 面：thaat（与西方调式 / svara、komal、tivra / 北印度与南印度 / 综合）+ world（jins / 木卡姆由 jins 搭成 / 土耳其 makam / 世界调式综合）
const EXT_B5_2 = {
  minutes: 23,
  insight: t('thaat、木卡姆、makam 都不只是"一组音"：thaat 是给拉格分类的框架，木卡姆是许多 jins 之间的一条路，makam 还规定了旋律的走向（seyir）。纸上的音阶只是骨架，血肉在口传的唱法里。', 'タート・マカーム・マカムはどれも「音の集まり」だけではない：タートはラーガを分類する枠組み、マカームは多くのジンスの間の道、マカムは旋律の進み方（セイル）まで決める。紙の上の音階は骨組みで、肉付けは口伝えの歌い方にある。', 'Thaat, maqam and makam are more than sets of notes: a thaat is a framework for classifying ragas, a maqam a pathway among ajnas, a makam also prescribes the melodic route (seyir). The scale on paper is a skeleton; the flesh lives in orally transmitted practice.'),
  sections: {
    discover: [
      {
        id: 'b52x-d1', type: 'discover', ref: 'wiki-thaat',
        prompt: t('Raga Hindol 只用 S G M D N 五个音。Bhatkhande 把它归到 Kalyan thaat——但这五个音在 Marwa thaat 里也有。这说明 thaat 是什么？', 'ラーガ・ヒンドールは S G M D N の 5 音だけを使う。バトカンデはこれをカリヤーン・タートに分類した——だがこの 5 音はマールワー・タートにもある。これはタートについて何を示す？', 'Raga Hindol uses only S G M D N. Bhatkhande assigned it to Kalyan thaat — but those five notes also occur in Marwa thaat. What does this say about thaats?'),
        options: [t('thaat 是分类工具，难免有模糊，有时要按演奏习惯来判断', 'タートは分類の道具で曖昧さは避けられず、演奏の慣習で判断することもある', 'A thaat is a classification tool; ambiguity is inevitable and sometimes settled by performance practice'), t('thaat 规定拉格必须用全七个音', 'タートはラーガに 7 音すべてを使わせる', 'A thaat forces a raga to use all seven notes'), t('Bhatkhande 分错了', 'バトカンデの誤り', 'Bhatkhande made a mistake')],
        answer: 0,
        insight: {
          title: t('分类，不是作曲规则', '分類であって作曲規則ではない', 'Classification, not a composing rule'),
          text: t('thaat 的主要功能是给拉格分类，而不是作曲工具；属于某个 thaat 的拉格不一定用全它的音，也可能用别的音。Jaijaiwanti 同时用本位和降低的 Ni（有时 Ga 也是），按定义不属于任何 thaat。Bhatkhande 用"临时的考虑，诉诸演奏实践"来解决这些情况：thaat 的数目少，是精确与效率之间的折中。', 'タートの主な役割はラーガの分類で、作曲の道具ではない。あるタートに属するラーガがその音をすべて使うとは限らず、ほかの音を使うこともある。ジャイジャイワンティはシュッダとコーマルの Ni を両方使い（Ga もそうなることがある）、定義上どのタートにも当たらない。バトカンデはこうした場合を「その場の判断で、演奏の実践に訴えて」解決した：タートの数が少ないのは正確さと効率の折衷。', 'A thaat’s primary function is classifying ragas, not composition; a raga said to belong to a thaat need not use all its notes and may use others. Jaijaiwanti uses both shuddha and komal Ni (sometimes both Ga), fitting no thaat by definition. Bhatkhande resolved such cases “by an ad hoc consideration, appealing to musical performance practice”: the small number of thaats is a compromise between accuracy and efficiency.'),
        },
      },
    ],
    explain: [
      {
        id: 'b52x-e1', type: 'page', ref: 'wiki-thaat',
        title: t('进阶 1 · Bhatkhande 的 thaat 体系', '発展 1・バトカンデのタート体系', 'Advanced 1 · Bhatkhande’s thaat system'),
        text: [
          t('thaat 是北印度（印度斯坦）音乐的"母音阶"，相当于卡纳提克音乐的 melakarta 拉格；这个词也指西塔琴、维纳琴的品，以及卡塔克舞者开场的姿势。现代 thaat 体系由音乐学家 Vishnu Narayan Bhatkhande（1860–1936）建立：他仿照音乐学家 Venkatamakhin 约 1640 年设计的 melakarta 分类，走访了许多 gharana（流派），详细分析拉格，得出 32 个 thaat，每个以一个代表拉格命名；当时流行的有十几个，他只突出了 10 个：Bilawal、Kalyan、Khamaj、Bhairav、Poorvi、Marwa、Kafi、Asavari、Bhairavi、Todi。例如 Shree 和 Puriya Dhanashree 属 Poorvi，Malkauns 属 Bhairavi，Darbari Kanada 属 Asavari。', 'タートは北インド（ヒンドゥスターニー）音楽の「親音階」で、カルナータカ音楽のメーラカルタ・ラーガに当たる。この語はシタールやヴィーナのフレット、カタック・ダンサーの冒頭の姿勢も指す。現代のタート体系は音楽学者ヴィシュヌ・ナーラーヤン・バトカンデ（1860–1936）が作った：音楽学者ヴェーンカタマキンが 1640 年ごろ考案したメーラカルタ分類にならい、多くのガラーナ（流派）を訪ね、ラーガを詳しく分析して 32 のタートを得た。それぞれ代表的なラーガの名を持つ。当時十数が流行していたが、彼は 10 だけを取り上げた：ビラーワル・カリヤーン・カマージ・バイラヴ・プールヴィ・マールワー・カーフィー・アーサーヴァリー・バイラヴィ・トーディー。たとえばシュリーとプーリヤ・ダナーシュリーはプールヴィ、マールカウンスはバイラヴィ、ダルバーリー・カーナダはアーサーヴァリー。', 'A thaat is a “parent scale” in North Indian (Hindustani) music, the counterpart of the Carnatic melakarta raga; the word also names the frets of sitar and veena and a Kathak dancer’s opening posture. The modern system is by musicologist Vishnu Narayan Bhatkhande (1860–1936), modelled on the melakarta classification devised around 1640 by Venkatamakhin; visiting many gharanas and analysing ragas, he arrived at 32 thaats, each named after a prominent raga, and of the dozen-plus popular in his day highlighted ten: Bilawal, Kalyan, Khamaj, Bhairav, Poorvi, Marwa, Kafi, Asavari, Bhairavi and Todi. Shree and Puriya Dhanashree belong to Poorvi, Malkauns to Bhairavi, Darbari Kanada to Asavari.'),
          t('七个 swara 叫 shadja、rishabh、gandhar、madhyam、pancham、dhaivat、nishad，简写 Sa、Re（卡纳提克写 Ri）、Ga、Ma、Pa、Dha、Ni；合称 sargam（取前四个音的辅音），相当于视唱的唱名；Sa 不对应固定音高，像首调唱名一样指主音。参照的基本调式是 Bilawal（= Ionian，卡纳提克叫 Dheerasankarabharanam）：R、G、D、N 可以本位（shuddha）或降低（komal），从不升高；M 可以本位或升高（tivra），从不降低；变化了的音叫 vikrt swara。S、P 固定，其余五个各两种：2⁵ = 32。', '7 つのスワラはシャドジャ・リシャブ・ガーンダール・マディヤム・パンチャム・ダイヴァト・ニシャードで、Sa・Re（カルナータカでは Ri）・Ga・Ma・Pa・Dha・Ni と略す。まとめてサルガム（最初の 4 音の子音から）といい、視唱の階名に当たる。Sa は固定音高でなく、移動ドのように主音を指す。基準の旋法はビラーワル（= イオニア、カルナータカではディーラシャンカラーバラナム）：R・G・D・N はシュッダ（本位）かコーマル（下げる）で上げることはなく、M はシュッダかティーヴラ（上げる）で下げることはない。変化した音をヴィクリト・スワラという。S と P は固定、ほか 5 音が各 2 通り：2⁵ = 32。', 'The seven swaras are shadja, rishabh, gandhar, madhyam, pancham, dhaivat, nishad — Sa, Re (Ri in Carnatic), Ga, Ma, Pa, Dha, Ni; together the sargam (from the first four consonants), India’s solfège; Sa is no fixed pitch but the tonic, as in movable-do. The reference mode is Bilawal (= Ionian; Carnatic Dheerasankarabharanam): R, G, D, N may be shuddha or komal (flat) but never sharp; M shuddha or tivra (sharp) but never flat; altered notes are vikrt swaras. S and P fixed, five others two ways each: 2⁵ = 32.'),
        ],
      },
      {
        id: 'b52x-e2', type: 'discover', practice: true, ref: 'wiki-thaat',
        prompt: t('Malkauns 拉格属于哪个 thaat？', 'ラーガ・マールカウンスはどのタート？', 'Raga Malkauns belongs to which thaat?'),
        options: ['Bhairavi', 'Poorvi', 'Asavari', 'Kalyan'],
        answer: 0,
        insight: { title: t('维基举的例子', 'ウィキペディアの例', 'Wikipedia’s examples'), text: t('Shree、Puriya Dhanashree → Poorvi；Malkauns → Bhairavi；Darbari Kanada → Asavari。', 'シュリー・プーリヤ・ダナーシュリー → プールヴィ、マールカウンス → バイラヴィ、ダルバーリー・カーナダ → アーサーヴァリー。', 'Shree, Puriya Dhanashree → Poorvi; Malkauns → Bhairavi; Darbari Kanada → Asavari.') },
      },
      {
        id: 'b52x-e3', type: 'page', ref: 'wiki-thaat',
        title: t('进阶 2 · thaat 的六条规则；thaat 和拉格的不同', '発展 2・タートの 6 つの規則；タートとラーガの違い', 'Advanced 2 · Six rules of a thaat; thaat versus raga'),
        text: [
          t('Bhatkhande 只把符合这些规则的音阶叫 thaat：从十二个音（七个本位、Re Ga Dha Ni 四个降低、Ma 一个升高）里取七个；按 Sa Re Ga Ma Pa Dha Ni 的上行顺序；同一个音不能同时有本位和变化两种形式；不像拉格那样有分开的上行和下行；没有情感特质（拉格按定义有）；thaat 本身不被演唱，被演唱的是由它产生的拉格。任何音高都可以被指定为 Sa。', 'バトカンデは次の規則を満たす音階だけをタートと呼んだ：12 音（本位 7、Re Ga Dha Ni の下げ 4、Ma の上げ 1）から 7 音を取る。Sa Re Ga Ma Pa Dha Ni の上行順。同じ音の本位と変化形を両方含まない。ラーガのように上行と下行が別にない。情感の性質を持たない（ラーガは定義上持つ）。タートそのものは歌われず、歌われるのはタートから生まれたラーガ。どの音高でも Sa にしてよい。', 'Bhatkhande called a scale a thaat only if: it takes seven of the twelve tones (seven natural, four flat — Re Ga Dha Ni — one sharp, Ma); in ascending order Sa Re Ga Ma Pa Dha Ni; never both natural and altered forms of one note; no separate ascending and descending lines, unlike a raga; no emotional quality (which ragas by definition have); thaats are not sung, the ragas produced from them are. Any pitch may be designated Sa.'),
          t('所有 thaat 都是七个音，但很多拉格（audav、shadav 类型）少于七个、有的多于七个；拉格不必用全 thaat 的音，按它实际有的音来归类。thaat 只给出拉格的粗略结构，不说明怎么唱——拉格的唱法（chalan）来自它的 pakad。thaat 以一个代表拉格命名，那个拉格叫这个 thaat 的 Janak 拉格：例如 Bilaval thaat 是以 Alhaiya Bilaval 拉格命名的。', 'タートはどれも 7 音だが、多くのラーガ（アウダヴ・シャーダヴ型）は 7 音より少なく、多いものもある。ラーガはタートの音をすべて使う必要はなく、実際に持つ音で分類される。タートはラーガの大まかな構造しか示さず、歌い方は示さない——ラーガの歌い方（チャラン）はパカドから来る。タートは代表的なラーガの名を持ち、そのラーガをそのタートのジャナク・ラーガという：たとえばビラーワル・タートはアルハイヤー・ビラーワルにちなむ。', 'All thaats have seven notes, but many ragas (audav and shadav types) have fewer and some more; a raga needn’t use every thaat note and is assigned by the notes it does have. Thaats give only a rough structure, not how to sing the raga — its chalan comes from its pakad. Each thaat is named after a prominent raga, its Janak raga: Bilaval thaat after raga Alhaiya Bilaval.'),
        ],
      },
      {
        id: 'b52x-e4', type: 'discover', practice: true, ref: 'wiki-thaat',
        prompt: t('下面哪一项不是 thaat 的规则？', 'タートの規則でないのは？', 'Which is not one of the rules of a thaat?'),
        options: [t('thaat 有分开的上行和下行', 'タートには上行と下行が別にある', 'A thaat has separate ascending and descending lines'), t('同一个音不能同时有本位和变化形式', '同じ音の本位と変化形を両方含まない', 'It cannot contain both forms of one note'), t('thaat 没有情感特质', 'タートは情感の性質を持たない', 'It has no emotional quality')],
        answer: 0,
        insight: { title: t('那是拉格的特点', 'それはラーガの特徴', 'That belongs to ragas'), text: t('拉格可以有不同的上行和下行，thaat 没有。', 'ラーガには別々の上行・下行がありうるが、タートにはない。', 'Ragas may have distinct ascents and descents; thaats do not.') },
      },
      {
        id: 'b52x-e5', type: 'page', ref: ['wiki-arabic-maqam', 'maqamworld-jins'],
        title: t('进阶 3 · 木卡姆：音阶、记谱与真实的音高', '発展 3・マカーム：音階、記譜、本当の音高', 'Advanced 3 · Maqam: scale, notation and real intonation'),
        text: [
          t('阿拉伯木卡姆是旋律调式体系，"一种即兴的技巧"，规定一首乐曲的音高、音型和发展。有 72 种七声音列，由增、大、中立、小二度构成；每个木卡姆还带着传统的惯用乐句、重要音、旋律发展和转调方式；它不包含节奏成分。"木卡姆"一词最早出现在 14 世纪 al-Safadi 和 Abdulqadir al-Maraghi 的论著里；北非、近东和中亚都属于这个调式家族，主要是阿拉伯、波斯、土耳其三大文化。', 'アラブのマカームは旋律の旋法体系で、「即興の技法」であり、曲の音高・音型・展開を決める。72 の 7 音の音列があり、増・長・中立・短 2 度でできている。各マカームは伝統的な決まり文句・重要な音・旋律の展開・転調の仕方も伴い、リズムの要素は含まない。「マカーム」という語は 14 世紀のサファディーとアブドゥルカーディル・マラーギーの論著に初めて現れる。北アフリカ・近東・中央アジアがこの旋法の家族に属し、主にアラブ・ペルシャ・トルコの 3 文化。', 'The Arabic maqam is a system of melodic modes, “a technique of improvisation” defining a piece’s pitches, patterns and development. There are 72 heptatonic tone rows, built from augmented, major, neutral and minor seconds; each maqam also carries habitual phrases, important notes, melodic development and modulation, but no rhythmic component. The term first appears in 14th-century treatises by al-Safadi and Abdulqadir al-Maraghi; North Africa, the Near East and Central Asia share this modal family — chiefly Arabic, Persian and Turkish.'),
          t('木卡姆的音不一定按平均律调。20 世纪初采用了简化记谱：把八度分成 24 等分，所有音四舍五入到最近的四分之一音，用半降、半升记号写在五线谱上。最常用的半降音是 E、B，A 较少；半升很少见，因为木卡姆实际上不在所有调上演奏、受乐器限制也比西方音阶难移调。24 音体系完全是记谱惯例，不影响实际音高：乐手仍演奏口传下来的细微差别，音高还随年代、地区变化（像口音），所以木卡姆主要靠耳朵学。乌德、小提琴等无品乐器，nay、qanun、单簧管等可调音乐器能如实演奏；钢琴只能弹不含四分之一音的木卡姆（如 Nahawand、‘Ajam），也弹不出细节；钢弦有品乐器可以像布鲁斯一样推弦。', 'マカームの音は平均律とは限らない。20 世紀初めに簡略な記譜が採用された：1 オクターヴを 24 等分し、すべての音を最も近い 4 分音に丸め、半フラット・半シャープで五線に書く。最もよく使う半フラットは E と B、A はより少ない。半シャープはまれ。マカームは実際にはすべての調で演奏されず、楽器の制約で西洋の音階より移調しにくいから。24 音体系はまったくの記譜の慣習で、実際の音高には影響しない：奏者は口伝えの細かな差を今も演奏し、音高は時代や地域でも（なまりのように）変わるので、マカームは主に耳で学ぶ。ウードやヴァイオリンなどフレットのない楽器、ネイ・カーヌーン・クラリネットなど音程を調整できる楽器なら忠実に演奏できる。ピアノは 4 分音のないマカーム（ナハワンド・アジャムなど）しか弾けず、細部も再現できない。スチール弦のフレット楽器はブルースのようにチョーキングで。', 'Maqam notes are not always equal-tempered. Early in the 20th century a simplified notation was adopted: the octave divided into 24 equal steps, every note rounded to the nearest quarter tone and written with half-flats and half-sharps. The commonest half-flats are E and B, A less so; half-sharps are rare, since maqams aren’t played in every key and are harder to transpose than Western scales because of instrument limits. The 24-tone system is purely notational and does not affect real intonation: players still perform orally transmitted microtonal details, and intonation varies by period and region (like accents), so maqams are learned by ear. Fretless instruments (oud, violin) and tunable ones (nay, qanun, clarinet) can render them faithfully; the piano can play only quarter-tone-free maqams (Nahawand, ‘Ajam) without their details; steel-string fretted instruments can bend strings, as in blues.'),
        ],
      },
      {
        id: 'b52x-e6', type: 'discover', practice: true, ref: 'wiki-arabic-maqam',
        prompt: t('木卡姆记谱里最常用的半降音是哪两个？', 'マカームの記譜で最もよく使う半フラットの 2 音は？', 'Which two half-flats are commonest in maqam notation?'),
        options: [t('E 和 B', 'E と B', 'E and B'), t('C 和 F', 'C と F', 'C and F'), t('G 和 D', 'G と D', 'G and D')],
        answer: 0,
        insight: { title: t('A 较少，半升很少', 'A はより少なく、半シャープはまれ', 'A less often, half-sharps rare'), text: t('例如 Rast 里的 E 半降、B 半降。但这只是记谱，实际音高靠口传。', 'たとえばラストの E 半フラット・B 半フラット。だがこれは記譜にすぎず、実際の音高は口伝え。', 'E.g. the half-flat E and B of Rast — notation only; real pitch is passed on orally.') },
      },
      {
        id: 'b52x-e7', type: 'page', ref: ['maqamworld-jins', 'wiki-arabic-maqam'],
        title: t('进阶 4 · jins 的解剖：主音、ghammaz 与"行李"', '発展 4・ジンスの解剖：主音、ガンマーズ、「荷物」', 'Advanced 4 · Anatomy of a jins: tonic, ghammaz and “baggage”'),
        text: [
          t('jins（复数 ajnas）是木卡姆音阶里 3、4 或 5 个音的片段，是阿拉伯音乐的基本旋律单位——木卡姆其实是许多 ajnas 之间的一条路径。每个 jins 由它的音程定义，移调时不变。主音是旋律主要强调、回来解决的音，通常是第一个音；主音下方紧挨着的是导音；ghammaz 是除主音外最重要的强调音，也是新 jins 最常见的起点（换 jins 或木卡姆叫转调）。jins 的"大小"是主音到 ghammaz 之间的音数，这些音是它的基本音阶；两边属于它旋律词汇的音叫 jins 的"行李"（baggage），合起来是扩展音阶。', 'ジンス（複数アジュナース）はマカームの音階の 3・4・5 音の断片で、アラブ音楽の基本的な旋律単位——マカームとは実は多くのアジュナースの間の道。各ジンスは音程で定義され、移調しても変わらない。主音は旋律が主に強調し、解決に戻る音で、ふつう最初の音。主音のすぐ下が導音。ガンマーズは主音の次に重要な強調の音で、新しいジンスが最もよく始まる音（ジンスやマカームを替えることを転調という）。ジンスの「大きさ」は主音からガンマーズまでの音の数で、それが基本音階。両側の、旋律の語彙に属する音をジンスの「荷物」（バゲッジ）といい、合わせて拡張音階。', 'A jins (plural ajnas) is a maqam scale fragment of 3, 4 or 5 notes, the basic melodic unit of Arabic music — a maqam is really a pathway among many ajnas. Each jins is defined by intervals that don’t change under transposition. Its tonic is the note of principal emphasis and resolution, usually the first; the leading tone lies just below it; the ghammaz is the next most important note and the commonest starting point for a new jins (changing jins or maqam is modulation). A jins’s size is the number of notes from tonic to ghammaz, its basic scale; notes beyond it on either side that belong to its vocabulary are its “baggage”, together forming the extended scale.'),
          t('维基补充：木卡姆音阶有一个下方（第一）jins 和一个上方（第二）jins，多数按下方 jins 分成家族；上方 jins 可以从下方 jins 的最后一个音或下一个音开始，有时两者重叠；上方 jins 的起点叫 dominant，是仅次于主音的重要音。各家理论对 ajnas 的分类没有共识，但大多数同意 9 个基本 jins（‘Ajam、Bayati、Hijaz、Kurd、Nahawand、Nikriz、Rast、Saba、Sikah），对应 9 个主要家族。音列完全相同的木卡姆也可能不同：Bayati 和 ‘Ushshaq Turki 音列一样，但"核心音"不同。', 'ウィキペディアの補足：マカームの音階には下（第 1）のジンスと上（第 2）のジンスがあり、多くは下のジンスで家族に分けられる。上のジンスは下のジンスの最後の音か次の音から始まり、重なることもある。上のジンスの始まりをドミナントといい、主音に次いで重要。アジュナースの分類に定説はないが、多くは 9 つの基本ジンス（アジャム・バヤーティー・ヒジャーズ・クルド・ナハワンド・ニクリーズ・ラスト・サバー・スィーカー）と 9 つの主要な家族に同意する。音列が同じでも違うマカームがある：バヤーティーとウッシャーク・トゥルキーは同じ音列だが「核」の音が違う。', 'Wikipedia adds: a maqam scale has a lower (first) and an upper (second) jins, most maqams being grouped into families by the lower jins; the upper jins starts on the lower one’s last note or the next, sometimes overlapping; its starting note is the dominant, second in importance to the tonic. References disagree on classifying ajnas, but most accept 9 basic ajnas (‘Ajam, Bayati, Hijaz, Kurd, Nahawand, Nikriz, Rast, Saba, Sikah), making the 9 main families. Identical tone rows can still differ: Bayati and ‘Ushshaq Turki share a row but have different nuclei.'),
        ],
      },
      {
        id: 'b52x-e8', type: 'discover', practice: true, ref: 'maqamworld-jins',
        prompt: t('jins 里的 ghammaz 是什么？', 'ジンスのガンマーズとは？', 'What is a jins’s ghammaz?'),
        options: [t('除主音外最重要的音，新 jins 常从它开始', '主音の次に重要な音で、新しいジンスがよくそこから始まる', 'The next most important note after the tonic, where a new jins often begins'), t('主音下方的导音', '主音の下の導音', 'The leading tone below the tonic'), t('jins 外面的"行李"音', 'ジンスの外の「荷物」の音', 'A “baggage” note outside the jins')],
        answer: 0,
        insight: { title: t('大小 = 主音到 ghammaz', '大きさ = 主音からガンマーズまで', 'Size = tonic to ghammaz'), text: t('主音到 ghammaz 的音数就是 jins 的大小（3、4 或 5）。', '主音からガンマーズまでの音の数がジンスの大きさ（3・4・5）。', 'The number of notes from tonic to ghammaz is the jins’s size (3, 4 or 5).') },
      },
      {
        id: 'b52x-e9', type: 'page', ref: 'wiki-turkish-makam',
        title: t('进阶 5 · 土耳其 makam：53 koma、seyir 与三个重要音', '発展 5・トルコのマカム：53 コマ、セイル、3 つの重要な音', 'Advanced 5 · Turkish makam: 53 komas, seyir and three key notes'),
        text: [
          t('土耳其 makam 规定独特的音程结构（cinsler，"属"）和旋律发展（seyir）；无论是固定的作品还是即兴（如 taksim），都要遵循这个旋律类型；它的节奏对应物叫 usul。土耳其理论把八度分成 53 个等分的 koma（Holdrian comma），全音等于 9 koma，实际只用其中 24 个音；Arel-Ezgi-Uzdilek 记谱（以 53 平均为基础）在西方的 4 个变音记号之外又加了 6 个。', 'トルコのマカムは独特の音程構造（ジンスレル、「属」）と旋律の展開（セイル）を定める。決まった作品でも即興（タクスィームなど）でも、この旋律型に従う。リズムの対応物はウスール。トルコの理論は 1 オクターヴを 53 の等しいコマ（ホルダーのコンマ）に分け、全音は 9 コマ、実際にはそのうち 24 音だけを使う。アレル・エズギ・ウズディレク記譜（53 平均律に基づく）は西洋の 4 つの変化記号に 6 つを加える。', 'A Turkish makam specifies a distinctive interval structure (cinsler, “genera”) and melodic development (seyir); fixed compositions and improvisations (taksim) alike follow the melody type; its rhythmic counterpart is usul. Turkish theory divides the octave into 53 equal komas (Holdrian commas), a whole tone being nine, of which only 24 pitches are used in practice; the Arel-Ezgi-Uzdilek notation, based on 53-TET, adds six accidentals to the West’s four.'),
          t('makam 更像作曲结构的指南：用某个 makam 写的作品会以或多或少有序的方式走过它的音——这叫 seyir（"路线"），有上行、下行、下行—上行三种。makam 由一个四音列加一个五音列（或反过来）构成，有三个重要音：Durak（"主音"），第一个四音列或五音列的起点，作品总在它上结束；Güçlü（"属音"），第二个音列的起点，作品中段的临时主音——别和西方的属音混淆：它常是五级，也常是四级，偶尔是三级；Yeden（"导音"），多半是作品的倒数第二个音，解决到主音，有时接近西方导音（略高或略低），有时接近下主音。', 'マカムは作曲の構造の手引きに近い：あるマカムで書かれた作品は、その音を多かれ少なかれ順序立てて巡る——これをセイル（「道筋」）といい、上行・下行・下行上行の 3 種がある。マカムは 4 音列と 5 音列（またはその逆）でできており、重要な音が 3 つある：ドゥラク（「主音」）は最初の 4 音列か 5 音列の始まりで、作品は必ずそこで終わる。ギュチリュ（「属音」）は 2 つ目の音列の始まりで、作品の中ほどの一時的な主音——西洋の属音と混同しないこと：5 度のことが多いが 4 度のことも多く、まれに 3 度。イェデン（「導音」）はたいてい作品の最後から 2 番目の音で主音に解決し、西洋の導音に近い（やや高いか低い）ことも、下主音に近いこともある。', 'A makam is essentially a guide to compositional structure: a piece in it moves through its notes in a more or less ordered way — the seyir (“route”), ascending, descending or descending-ascending. A makam is built of a tetrachord plus a pentachord (or vice versa), with three important notes: the Durak (“tonic”), start of the first tetrachord or pentachord, on which every piece ends; the Güçlü (“dominant”), start of the second, a temporary tonic mid-piece — not the Western dominant: often the fifth degree, as often the fourth, occasionally the third; the Yeden (“leading tone”), usually the penultimate note, resolving to the tonic, sometimes near a Western leading tone (slightly sharper or flatter), sometimes near a subtonic.'),
        ],
      },
      {
        id: 'b52x-e10', type: 'discover', practice: true, ref: 'wiki-turkish-makam',
        prompt: t('土耳其 makam 的 Güçlü 和西方的属音有什么不同？', 'トルコのマカムのギュチリュは西洋の属音とどう違う？', 'How does the Turkish güçlü differ from the Western dominant?'),
        options: [t('它常是五级，但也常是四级、偶尔是三级', '5 度のことが多いが、4 度のことも多く、まれに 3 度', 'Often the fifth degree, but as often the fourth and occasionally the third'), t('它永远是五级', 'いつも 5 度', 'Always the fifth degree'), t('它就是主音', '主音そのもの', 'It is the tonic')],
        answer: 0,
        insight: { title: t('第二个音列的起点', '2 つ目の音列の始まり', 'Start of the second segment'), text: t('Güçlü 是第二个四音列或五音列的第一个音，作品中段的临时主音。', 'ギュチリュは 2 つ目の 4 音列か 5 音列の最初の音で、作品の中ほどの一時的な主音。', 'The güçlü is the first note of the second tetrachord or pentachord, a temporary tonic mid-piece.') },
      },
    ],
    experiment: [
      { id: 'b52x-x1', type: 'experiment', toy: 'world', ref: ['wiki-thaat', 'maqamworld-jins', 'wiki-arabic-maqam'],
        prompt: t('先点 Bhairavi、Asavari、Poorvi，对照它们的代表拉格（Malkauns、Darbari Kanada、Shree）想想：哪些音是 komal、哪个是 tivra？再切到木卡姆，比较 Bayati 和 Hijaz 的下方 jins：哪一个有中立二度（四分之一音），哪一个在钢琴上就能弹？', 'まずバイラヴィ・アーサーヴァリー・プールヴィを押し、代表的なラーガ（マールカウンス・ダルバーリー・カーナダ・シュリー）と照らして考えよう：どの音がコーマルで、どれがティーヴラ？ 次にマカームに切り替え、バヤーティーとヒジャーズの下のジンスを比べよう：中立 2 度（4 分音）があるのはどちらで、ピアノで弾けるのはどちら？', 'Tap Bhairavi, Asavari and Poorvi, recalling their ragas (Malkauns, Darbari Kanada, Shree): which notes are komal, which tivra? Then switch to maqam and compare the lower jins of Bayati and Hijaz: which has a neutral second (a quarter tone), and which can a piano play?'),
        params: {},
        breakthrough: { id: 'b52x-skeleton', text: t('你看到了骨架；剩下的，要用耳朵去学。', '骨組みは見えた。残りは耳で学ぶもの。', 'You have seen the skeleton; the rest is learned by ear.') } },
    ],
    challenge: [
      {
        id: 'b52x-c1', type: 'choice', error: 'world-system', skills: ['identify'], ref: 'wiki-thaat',
        variants: [
          { prompt: t('Bhatkhande 的 thaat 体系是仿照什么建立的？', 'バトカンデのタート体系は何にならった？', 'Bhatkhande modelled his thaat system on…'), options: [t('Venkatamakhin 约 1640 年的 melakarta 分类', 'ヴェーンカタマキンの 1640 年ごろのメーラカルタ分類', 'Venkatamakhin’s melakarta classification of c. 1640'), t('西方的教会调式', '西洋の教会旋法', 'Western church modes'), t('阿拉伯的木卡姆', 'アラブのマカーム', 'Arabic maqams')] },
          { prompt: t('Bhatkhande 研究得出了多少个 thaat，最后突出了几个？', 'バトカンデの研究でタートはいくつ得られ、いくつ取り上げられた？', 'How many thaats did Bhatkhande’s research yield, and how many did he highlight?'), options: [t('32 个，突出 10 个', '32、うち 10', '32, highlighting 10'), t('72 个，突出 12 个', '72、うち 12', '72, highlighting 12'), t('10 个，全部突出', '10、すべて', '10, all of them')] },
          { prompt: t('Bilawal thaat 是以哪个拉格命名的？', 'ビラーワル・タートはどのラーガにちなむ？', 'Bilawal thaat is named after which raga?'), options: ['Alhaiya Bilaval', 'Yaman', 'Malkauns'] },
        ],
        answer: 0,
        explain: t('仿照 melakarta；32 个里突出 10 个；Bilaval 的 Janak 拉格是 Alhaiya Bilaval。', 'メーラカルタにならい、32 のうち 10 を取り上げた。ビラーワルのジャナク・ラーガはアルハイヤー・ビラーワル。', 'Modelled on the melakarta; 10 highlighted of 32; Bilaval’s Janak raga is Alhaiya Bilaval.'),
      },
      {
        id: 'b52x-c2', type: 'choice', error: 'world-system', skills: ['identify'], ref: ['wiki-arabic-maqam', 'maqamworld-jins'],
        variants: [
          { prompt: t('木卡姆的 24 平均记谱和实际音高的关系是？', 'マカームの 24 平均律の記譜と実際の音高の関係は？', 'How does 24-TET maqam notation relate to real intonation?'), options: [t('只是记谱惯例，实际音高靠口传、因年代地区而异', '記譜の慣習にすぎず、実際の音高は口伝えで時代や地域で違う', 'A notational convention only; real pitch is oral and varies by era and region'), t('完全一致', '完全に一致', 'They match exactly'), t('实际就是 12 平均律', '実際は 12 平均律', 'Practice is 12-TET')] },
          { prompt: t('木卡姆音阶多半按哪个 jins 分家族？', 'マカームは多くの場合どのジンスで家族に分けられる？', 'Maqams are mostly grouped into families by…'), options: [t('下方（第一）jins', '下（第 1）のジンス', 'the lower (first) jins'), t('上方 jins', '上のジンス', 'the upper jins'), t('最后一个音', '最後の音', 'the final note')] },
          { prompt: t('哪种乐器能如实演奏木卡姆的微分音？', 'マカームの微分音を忠実に演奏できる楽器は？', 'Which instrument can render maqam microtones faithfully?'), options: [t('乌德（无品）', 'ウード（フレットなし）', 'the oud (fretless)'), t('钢琴', 'ピアノ', 'the piano'), t('定音的钟琴', '音程固定のグロッケン', 'a fixed-pitch glockenspiel')] },
        ],
        answer: 0,
        explain: t('24 平均只是记谱；家族按下方 jins 分；无品的乌德或可调音的 nay、qanun 能如实演奏。', '24 平均律は記譜だけ。家族は下のジンスで分ける。フレットのないウードや調整できるネイ・カーヌーンなら忠実に。', '24-TET is notation only; families follow the lower jins; the fretless oud or tunable nay and qanun render microtones faithfully.'),
      },
      {
        id: 'b52x-c3', type: 'choice', error: 'world-system', skills: ['identify'], ref: 'wiki-turkish-makam',
        variants: [
          { prompt: t('土耳其理论里一个全音等于几个 koma？', 'トルコの理論で全音は何コマ？', 'In Turkish theory a whole tone equals how many komas?'), options: ['9', '4', '53'] },
          { prompt: t('土耳其 makam 的 seyir 有哪三种？', 'トルコのマカムのセイルの 3 種は？', 'What are the three types of seyir?'), options: [t('上行、下行、下行—上行', '上行・下行・下行上行', 'ascending, descending, descending-ascending'), t('快、中、慢', '速・中・遅', 'fast, medium, slow'), t('大调、小调、中立', '長・短・中立', 'major, minor, neutral')] },
          { prompt: t('作品总在哪个音上结束？', '作品は必ずどの音で終わる？', 'Every piece in a makam ends on the…'), options: [t('Durak（主音）', 'ドゥラク（主音）', 'Durak (tonic)'), t('Güçlü', 'ギュチリュ', 'Güçlü'), t('Yeden', 'イェデン', 'Yeden')] },
        ],
        answer: 0,
        explain: t('全音 = 9 koma；seyir 有上行、下行、下行—上行；作品结束在 Durak 上。', '全音 = 9 コマ。セイルは上行・下行・下行上行。作品はドゥラクで終わる。', 'A whole tone = 9 komas; seyir is ascending, descending or descending-ascending; pieces end on the Durak.'),
      },
      {
        id: 'b52x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: ['wiki-thaat', 'wiki-arabic-maqam'],
        variants: [
          { prompt: t('为什么 Jaijaiwanti 按定义不属于任何 thaat？', 'なぜジャイジャイワンティは定義上どのタートにも属さない？', 'Why does Jaijaiwanti fit no thaat by definition?'), options: [t('它同时用本位和降低的 Ni', 'シュッダとコーマルの Ni を両方使うから', 'It uses both shuddha and komal Ni'), t('它只有五个音', '5 音しかないから', 'It has only five notes'), t('它不用 Sa', 'Sa を使わないから', 'It omits Sa')] },
          { prompt: t('"木卡姆"一词最早出现在哪个世纪的论著里？', '「マカーム」という語が最初に現れる論著は何世紀？', 'In which century’s treatises does the term maqam first appear?'), options: [t('14 世纪', '14 世紀', 'the 14th'), t('18 世纪', '18 世紀', 'the 18th'), t('10 世纪', '10 世紀', 'the 10th')] },
          { prompt: t('拉格的唱法（chalan）来自哪里？', 'ラーガの歌い方（チャラン）はどこから？', 'Where does a raga’s chalan come from?'), options: [t('它的 pakad', 'そのパカド', 'its pakad'), t('它的 thaat', 'そのタート', 'its thaat'), t('它的 Sa 的音高', 'その Sa の音高', 'the pitch of its Sa')] },
        ],
        answer: 0,
        explain: t('Jaijaiwanti 同时有两种 Ni；"木卡姆"一词始见于 14 世纪；唱法来自 pakad，thaat 只给粗略结构。', 'ジャイジャイワンティは 2 種の Ni。「マカーム」は 14 世紀から。歌い方はパカドから、タートは大まかな構造だけ。', 'Jaijaiwanti has both Ni; maqam first appears in the 14th century; the chalan comes from the pakad, the thaat giving only rough structure.'),
      },
      G('b52x-g1', 'thaatNote', 1, ['identify']),
      G('b52x-g2', 'turkishKoma', 1, ['calc']),
    ],
  },
  pool: [G('b52x-p1', 'thaatNote', 2, ['identify']), G('b52x-p2', 'turkishKoma', 2, ['calc'])],
};

// ===================== B5-3x 泛音列与音色 · 扩展关 =====================
// 对应 A 面：harmonics（泛音之间的音程 / 频率比与音分 / 泛音与音色 / 泛音列与 acoustic 音阶）
const EXT_B5_3 = {
  minutes: 21,
  insight: t('泛音列给了"协和"一个物理的起点：小整数比、结合音都从那里来；但它也"什么都能证明"——到第 20 个泛音，从八度到四分之一音都有了。泛音是材料，不是规则。', '倍音列は「協和」に物理的な出発点を与える：小さな整数比も結合音もそこから来る。だが「何でも正当化できる」——第 20 倍音までに 8 度から 4 分音まで何でもある。倍音は素材であって規則ではない。', 'The harmonic series gives consonance a physical starting point — small ratios and combination tones come from it; but it also “justifies everything”: by the twentieth harmonic it holds everything from the octave to the quarter tone. Harmonics are material, not rules.'),
  sections: {
    discover: [
      {
        id: 'b53x-d1', type: 'discover', ref: 'wiki-harmonic-series',
        prompt: t('200 Hz 和 300 Hz 一起响（纯五度）。听者还会感到一个"结合音"——它是多少赫兹？', '200 Hz と 300 Hz が同時に鳴る（完全 5 度）。聴き手はさらに「結合音」を感じる——何ヘルツ？', '200 Hz and 300 Hz sound together (a perfect fifth). Listeners also perceive a “combination tone” — at what frequency?'),
        options: [t('100 Hz（比低音再低一个八度）', '100 Hz（低い音のさらに 1 オクターヴ下）', '100 Hz (an octave below the lower note)'), t('500 Hz', '500 Hz', '500 Hz'), t('250 Hz', '250 Hz', '250 Hz')],
        answer: 0,
        insight: {
          title: t('差音', '差音', 'The difference tone'),
          text: t('一阶结合音是两者的差：300 − 200 = 100 Hz。它再和两个音作用，二阶结合音是 200（300 − 100）和 100（200 − 100）Hz，之后各阶都一样——都是 100、200、300 的组合。不协和的三全音 7:5（例如 700 和 500 Hz）则得到 200、300……实际上包含 100、300、500、700 Hz 四个音，最低的 100 Hz 比低音低两个八度加大三度。', '1 次の結合音は 2 音の差：300 − 200 = 100 Hz。これがさらに 2 音と作用し、2 次の結合音は 200（300 − 100）と 100（200 − 100）Hz、以降はどれも同じ——100・200・300 の組み合わせ。不協和な三全音 7:5（たとえば 700 と 500 Hz）では 200・300……が生じ、実は 100・300・500・700 Hz の 4 音を含む。最も低い 100 Hz は低い音より 2 オクターヴと長 3 度下。', 'The first-order combination tone is the difference: 300 − 200 = 100 Hz. Interacting with both notes, it yields second-order tones of 200 (300 − 100) and 100 (200 − 100) Hz, and every further order is the same — combinations of 100, 200, 300. A dissonant tritone 7:5 (say 700 and 500 Hz) gives 200, 300… and actually contains four notes, 100, 300, 500 and 700 Hz, the lowest a seventeenth (two octaves and a major third) below the lower note.'),
        },
      },
    ],
    explain: [
      {
        id: 'b53x-e1', type: 'page', ref: 'wiki-harmonic-series',
        title: t('进阶 1 · 分音、谐音、泛音与非谐性', '発展 1・部分音、倍音、上音、非調和性', 'Advanced 1 · Partials, harmonics, overtones, inharmonicity'),
        text: [
          t('泛音列（也叫谐音列）是频率为基频整数倍的一串音。弦或空气柱同时以许多模式振动，波来回传播、互相加强或抵消，只有整数倍的频率留下来。最低的分音（基音）通常被听成音高；稳定音的音色主要由各个谐音的相对强度决定。"复合音"可以描述成许多简单周期波（正弦波）即"分音"的组合，各有频率、振幅和相位（Ellis 翻译 Helmholtz 时叫它们"简单音"）；分音不一定是最低谐音的整数倍。"谐音"是理想谐音列的成员，基频也算一个谐音（它是自己的 1 倍）；真实乐音里和谐音相符的分音叫"谐分音"。', '倍音列（ハーモニック・シリーズ）は周波数が基本周波数の整数倍になる音の列。弦や気柱は多くのモードで同時に振動し、波が往復して強め合い打ち消し合い、整数倍の周波数だけが残る。最も低い部分音（基音）がふつう音高として聞こえ、安定した音の音色は主に各倍音の相対的な強さで決まる。「複合音」は多くの単純な周期波（正弦波）すなわち「部分音」の組み合わせとして記述でき、それぞれ周波数・振幅・位相を持つ（エリスはヘルムホルツを訳す際に「単純音」と呼んだ）。部分音は最も低い倍音の整数倍とは限らない。「倍音」は理想の倍音列の一員で、基音も倍音の 1 つ（自分の 1 倍）。実際の音で倍音に合う部分音を「調和部分音」という。', 'The harmonic (overtone) series is the sequence of tones whose frequencies are integer multiples of a fundamental. A string or air column vibrates in many modes at once; waves travelling both ways reinforce and cancel, leaving integer multiples. The lowest partial, the fundamental, is usually heard as the pitch; a steady tone’s timbre depends mainly on the relative strengths of the harmonics. A complex tone can be described as many simple periodic (sine) waves, “partials”, each with its own frequency, amplitude and phase (“simple tones” in Ellis’s Helmholtz translation), not necessarily integer multiples. A harmonic is a member of the ideal series — the fundamental is one (one times itself); real partials matching harmonics are harmonic partials.'),
          t('"非谐性"是分音偏离最接近的理想谐音的程度，通常以音分计。许多有音高的原声乐器被设计得非谐性很低，所以把它们的分音叫"谐音"很方便（虽然不严格）。"泛音"是最低分音之上的任何分音，不包括基频——所以"第二泛音"不一定是第三个分音，数的时候要小心。马林巴、颤音琴、管钟、定音鼓、颂钵的分音大多不谐和，但因为几个强分音接近谐音，仍能给耳朵明确的音高；镲、锣这类无音高乐器富含不谐和分音，可能完全听不出音高。钢琴等弦乐器、铜管乐器的分音也会偏离，原因是金属的刚性以及振动的空气或琴弦和琴身的相互作用。', '「非調和性」は部分音が最も近い理想の倍音からずれる度合いで、ふつうセントで測る。音高のある多くのアコースティック楽器は非調和性が低く作られているので、その部分音を「倍音」と呼ぶのは（厳密ではないが）便利。「上音」は最低の部分音より上のすべての部分音で、基音を含まない——だから「第 2 上音」は 3 番目の部分音とは限らず、数えるとき注意。マリンバ・ヴィブラフォン・チューブラーベル・ティンパニ・シンギングボウルの部分音は大半が非調和だが、倍音に近い強い部分音がいくつかあるので明確な音高感を与える。シンバルやタムタムのような無音高楽器は非調和な部分音に富み、音高を感じさせないこともある。ピアノなどの弦楽器や金管楽器の部分音もずれるが、それは金属の剛性や、振動する空気や弦と楽器本体の相互作用による。', 'Inharmonicity is a partial’s deviation from the nearest ideal harmonic, usually in cents. Many pitched acoustic instruments are built for low inharmonicity, so calling their partials “harmonics” is convenient if not strictly accurate. An overtone is any partial above the lowest, excluding the fundamental — so the “second overtone” is not necessarily the third partial; count carefully. Marimba, vibraphone, tubular bells, timpani and singing bowls have mostly inharmonic partials yet give a good sense of pitch through a few strong harmonic-like partials; cymbals and tam-tams, rich in inharmonic partials, may imply no pitch at all. Piano strings and brass deviate too, from metal stiffness and the interaction of the vibrating air or string with the instrument body.'),
        ],
      },
      {
        id: 'b53x-e2', type: 'discover', practice: true, ref: 'wiki-harmonic-series',
        prompt: t('在一个理想的谐音乐器上，"第二泛音"是第几个分音（谐音）？', '理想的な調和楽器で「第 2 上音」は何番目の部分音（倍音）？', 'On an ideal harmonic instrument, the “second overtone” is which partial (harmonic)?'),
        options: [t('第三个', '3 番目', 'The third'), t('第二个', '2 番目', 'The second'), t('第一个', '1 番目', 'The first')],
        answer: 0,
        insight: { title: t('泛音不算基频', '上音は基音を数えない', 'Overtones skip the fundamental'), text: t('第 1 谐音是基频，第一泛音是第 2 谐音，第二泛音是第 3 谐音。', '第 1 倍音が基音、第 1 上音が第 2 倍音、第 2 上音が第 3 倍音。', 'Harmonic 1 is the fundamental; overtone 1 is harmonic 2; overtone 2 is harmonic 3.') },
      },
      {
        id: 'b53x-e3', type: 'page', ref: 'wiki-harmonic-series',
        title: t('进阶 2 · 泛音和十二平均律差多少', '発展 2・倍音と 12 平均律の差', 'Advanced 2 · How far harmonics stray from equal temperament'),
        text: [
          t('把泛音移八度压进一个八度里，有些很接近西方半音阶的音；但十二平均律和许多泛音都有一点不准，尤其是第 7、11、13 泛音。维基的表（以 C 为基音）：第 3 泛音（纯五度 3:2）比平均律高 2 音分；第 9（9:8）高 4；第 5（大三度 5:4）低 14；第 15（15:8）低 12；第 7（7:4，小七度）低 31；第 11（11:8，接近三全音）低 49；第 13（13:8）高 41。表里把超过 5 音分的差异标出，因为 5 音分（半音的二十分之一）大约是人耳对先后出现的音的"最小可觉差"——同时响时更小的差异也听得出。', '倍音をオクターヴ移動して 1 オクターヴに収めると、西洋の半音階の音に近いものもある。だが 12 平均律は多くの倍音と少しずれ、特に第 7・11・13 倍音。ウィキペディアの表（C を基音として）：第 3 倍音（完全 5 度 3:2）は平均律より 2 セント高い。第 9（9:8）は 4 高い。第 5（長 3 度 5:4）は 14 低い。第 15（15:8）は 12 低い。第 7（7:4、短 7 度）は 31 低い。第 11（11:8、三全音に近い）は 49 低い。第 13（13:8）は 41 高い。表は 5 セントを超える差に色を付ける。5 セント（半音の 20 分の 1）は、順に鳴る音に対する人の耳の「弁別閾」だから——同時に鳴ればもっと小さな差も聞こえる。', 'Compress the harmonics into one octave and some approximate the Western chromatic scale; but 12-tone equal temperament is slightly out of tune with many, especially the 7th, 11th and 13th. Wikipedia’s table (on C): harmonic 3 (the fifth, 3:2) is 2 cents above equal temperament; 9 (9:8) +4; 5 (major third, 5:4) −14; 15 (15:8) −12; 7 (7:4, minor seventh) −31; 11 (11:8, near the tritone) −49; 13 (13:8) +41. Differences over 5 cents are highlighted, 5 cents (a twentieth of a semitone) being roughly the ear’s just noticeable difference for successive notes — smaller ones are audible when simultaneous.'),
          t('作曲家 Paul Hindemith 在 1930 年代末根据这些泛音关系给音程排了不协和程度的次序。Marin Mersenne 写道："协和的次序是自然的……我们从一数到六以上的数法建立在自然之上。"但 Carl Dahlhaus 提醒：泛音列数到 20，"从八度到四分之一音，有用的和无用的音全都有。泛音列可以证明一切，也就是说，什么也证明不了。"', '作曲家パウル・ヒンデミットは 1930 年代末、これらの倍音関係をもとに音程を不協和の度合いで順位付けした。マラン・メルセンヌは書いた：「協和の順序は自然である……1 から 6 以上へ数える数え方は自然に基づいている」。だがカール・ダールハウスは言う：倍音列を 20 まで数えれば「8 度から 4 分音まで、役に立つ音も立たない音もすべて含む。倍音列はすべてを正当化する、つまり何も正当化しない」。', 'In the late 1930s Paul Hindemith ranked intervals by relative dissonance based on these harmonic relationships. Marin Mersenne wrote: “The order of the Consonances is natural, and … the way we count them, starting from unity up to the number six and beyond is founded in nature.” But Carl Dahlhaus cautions that the series, counted to 20, “includes everything from the octave to the quarter tone, (and) useful and useless musical tones. The natural-tone-row justifies everything, that means, nothing.”'),
        ],
        visual: { kind: 'blocks', rows: [{ label: t('泛音', '倍音', 'harmonic'), cells: ['3', '5', '7', '9', '11', '13', '15'] }, { label: t('音分差', 'セント差', 'cents'), cells: ['+2', '−14', '−31', '+4', '−49', '+41', '−12'] }] },
      },
      {
        id: 'b53x-e4', type: 'discover', practice: true, ref: 'wiki-harmonic-series',
        prompt: t('第 5 泛音（大三度 5:4）和十二平均律的大三度相比？', '第 5 倍音（長 3 度 5:4）は 12 平均律の長 3 度と比べて？', 'Harmonic 5 (the major third, 5:4) compared with the equal-tempered major third is…'),
        options: [t('低约 14 音分', '約 14 セント低い', 'about 14 cents lower'), t('高约 14 音分', '約 14 セント高い', 'about 14 cents higher'), t('完全一样', 'まったく同じ', 'exactly the same')],
        answer: 0,
        insight: { title: t('平均律的大三度偏宽', '平均律の長 3 度は広め', 'Equal-tempered thirds run wide'), text: t('14 音分远超 5 音分的最小可觉差，所以平均律大三度和纯律的差别听得出来。', '14 セントは 5 セントの弁別閾をはるかに超えるので、平均律と純正の長 3 度の差は聞き取れる。', '14 cents is well beyond the 5-cent threshold, so equal-tempered and just thirds sound audibly different.') },
      },
      {
        id: 'b53x-e5', type: 'page', ref: 'wiki-harmonic-series',
        title: t('进阶 3 · 音色：单簧管与萨克斯；音程强度', '発展 3・音色：クラリネットとサックス；音程の強さ', 'Advanced 3 · Timbre: clarinet versus saxophone; interval strength'),
        text: [
          t('各个泛音的相对强度主要决定不同乐器的音色，不过起音瞬态、共振峰、噪音和非谐性也起作用。例如单簧管和萨克斯的吹嘴和簧片相似，都靠一个吹嘴端被视为封闭的管腔里的空气共鸣发声；但单簧管的共鸣管是圆柱形的，偶数泛音较弱；萨克斯的是圆锥形的，偶数泛音更强，音色更复杂。', '各倍音の相対的な強さが楽器の音色を主に決めるが、立ち上がりの過渡音・フォルマント・ノイズ・非調和性も関わる。たとえばクラリネットとサクソフォンはマウスピースとリードが似ていて、どちらもマウスピース側が閉じていると見なされる管の中の空気の共鳴で音を出す。だがクラリネットの共鳴管は円筒形で偶数倍音が弱く、サクソフォンは円錐形で偶数倍音が強く出て、より複雑な音色になる。', 'The relative strengths of the harmonics mainly determine timbre, though onset transients, formants, noises and inharmonicities also play a part. The clarinet and saxophone have similar mouthpieces and reeds, both sounding through air resonating in a chamber closed at the mouthpiece end; but the clarinet’s cylindrical resonator weakens the even harmonics, while the saxophone’s conical one lets them sound strongly, giving a more complex tone.'),
          t('David Cope（1997）提出"音程强度"的概念：一个音程的强度、协和度或稳定性，取决于它接近泛音列里较低较强、还是较高较弱的位置。所以平均律的纯五度比平均律的小三度"强"，因为它们分别近似纯五度和纯律小三度，而纯五度在泛音列里位置更低。', 'デヴィッド・コープ（1997）は「音程の強さ」という考えを示した：音程の強さ・協和度・安定性は、それが倍音列の低く強い位置に近いか、高く弱い位置に近いかで決まる。だから平均律の完全 5 度は平均律の短 3 度より「強い」。それぞれ純正の完全 5 度と純正短 3 度に近く、純正 5 度のほうが倍音列で低い位置にあるから。', 'David Cope (1997) proposed “interval strength”: an interval’s strength, consonance or stability depends on how closely it approximates a lower, stronger or a higher, weaker position in the harmonic series. So an equal-tempered fifth is stronger than an equal-tempered minor third, approximating a just fifth and a just minor third respectively, the fifth sitting lower in the series.'),
        ],
      },
      {
        id: 'b53x-e6', type: 'discover', practice: true, ref: 'wiki-harmonic-series',
        prompt: t('单簧管的偶数泛音为什么较弱？', 'クラリネットの偶数倍音が弱いのはなぜ？', 'Why are the clarinet’s even harmonics weaker?'),
        options: [t('它的共鸣管是圆柱形的', '共鳴管が円筒形だから', 'Its resonator is cylindrical'), t('它用簧片', 'リードを使うから', 'It uses a reed'), t('它是木头做的', '木でできているから', 'It is made of wood')],
        answer: 0,
        insight: { title: t('圆柱 vs 圆锥', '円筒 vs 円錐', 'Cylinder versus cone'), text: t('萨克斯也用簧片，但共鸣管是圆锥形，偶数泛音更强。', 'サックスもリードを使うが共鳴管は円錐形で、偶数倍音が強い。', 'The saxophone also has a reed, but its conical bore lets even harmonics sound strongly.') },
      },
    ],
    experiment: [
      { id: 'b53x-x1', type: 'experiment', toy: 'harmonics', ref: 'wiki-harmonic-series',
        prompt: t('这次基频是 100 Hz，数字好算。先只开奇数泛音（像单簧管那样偶数泛音很弱），再全部打开（更像萨克斯）。然后只开第 7、11、13 泛音：红框是不是正好落在它们身上？', '今回は基本周波数 100 Hz で計算しやすい。まず奇数倍音だけ（クラリネットのように偶数倍音が弱い）、次に全部（サックスに近い）。それから第 7・11・13 倍音だけ：赤枠はちょうどそれらに付く？', 'This time the fundamental is 100 Hz for easy arithmetic. First turn on only the odd harmonics (weak evens, like a clarinet), then all of them (more like a saxophone). Then only harmonics 7, 11 and 13: do the red boxes land exactly on them?'),
        params: { fundamental: 100 },
        breakthrough: { id: 'b53x-recipe', text: t('同一个音高，换一张泛音"配方"，就换了一种乐器的声音。', '同じ音高でも倍音の「レシピ」を替えれば、別の楽器の音になる。', 'Same pitch, new harmonic recipe, a different instrument.') } },
    ],
    challenge: [
      {
        id: 'b53x-c1', type: 'choice', error: 'harmonic-series', skills: ['identify'], ref: 'wiki-harmonic-series',
        variants: [
          { prompt: t('"非谐性"通常用什么单位度量？', '「非調和性」はふつう何の単位で測る？', 'Inharmonicity is usually measured in…'), options: [t('音分', 'セント', 'cents'), t('赫兹', 'ヘルツ', 'hertz'), t('分贝', 'デシベル', 'decibels')] },
          { prompt: t('哪种乐器分音大多不谐和，却仍能给出清楚的音高？', '部分音の大半が非調和なのに明確な音高を与える楽器は？', 'Which instrument has mostly inharmonic partials yet still gives a clear pitch?'), options: [t('马林巴', 'マリンバ', 'marimba'), t('镲', 'シンバル', 'cymbals'), t('单簧管', 'クラリネット', 'clarinet')] },
          { prompt: t('基频算不算一个"谐音"？', '基音は「倍音」に含まれる？', 'Is the fundamental a harmonic?'), options: [t('算，它是自己的 1 倍', '含まれる。自分の 1 倍だから', 'Yes — it is one times itself'), t('不算', '含まれない', 'No'), t('只在弦乐器上算', '弦楽器だけ', 'Only on strings')] },
        ],
        answer: 0,
        explain: t('非谐性以音分计；马林巴靠几个强分音给出音高（镲没有）；基频是第 1 谐音，但不是泛音。', '非調和性はセントで。マリンバは強い部分音で音高を与える（シンバルは与えない）。基音は第 1 倍音だが上音ではない。', 'Inharmonicity is in cents; the marimba gets pitch from a few strong partials (cymbals don’t); the fundamental is harmonic 1 but not an overtone.'),
      },
      {
        id: 'b53x-c2', type: 'choice', error: 'harmonic-series', skills: ['calc'], ref: 'wiki-harmonic-series',
        variants: [
          { prompt: t('哪个泛音和十二平均律相差最大（约 49 音分）？', '12 平均律との差が最も大きい（約 49 セント）倍音は？', 'Which harmonic deviates most from 12-TET (about 49 cents)?'), options: [t('第 11', '第 11', 'the 11th'), t('第 7', '第 7', 'the 7th'), t('第 3', '第 3', 'the 3rd')] },
          { prompt: t('人耳对先后出现的两个音的"最小可觉差"大约是？', '順に鳴る 2 音に対する人の耳の「弁別閾」はおよそ？', 'The ear’s just noticeable difference for successive notes is about…'), options: [t('5 音分', '5 セント', '5 cents'), t('50 音分', '50 セント', '50 cents'), t('0.1 音分', '0.1 セント', '0.1 cents')] },
          { prompt: t('7:5 的三全音（700 与 500 Hz）实际包含哪四个音？', '7:5 の三全音（700 と 500 Hz）が実際に含む 4 音は？', 'A 7:5 tritone (700 and 500 Hz) actually contains which four notes?'), options: [t('100、300、500、700 Hz', '100・300・500・700 Hz', '100, 300, 500, 700 Hz'), t('500、700、1200 Hz 和 200 Hz', '500・700・1200 と 200 Hz', '500, 700, 1200 and 200 Hz'), t('只有 500、700 Hz', '500・700 Hz だけ', 'only 500 and 700 Hz')] },
        ],
        answer: 0,
        explain: t('第 11 泛音低约 49 音分；最小可觉差约 5 音分；7:5 的结合音给出 100、300、500、700 Hz。', '第 11 倍音は約 49 セント低い。弁別閾は約 5 セント。7:5 の結合音で 100・300・500・700 Hz。', 'Harmonic 11 is about 49 cents low; the JND is about 5 cents; a 7:5 yields 100, 300, 500 and 700 Hz.'),
      },
      {
        id: 'b53x-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: 'wiki-harmonic-series',
        variants: [
          { prompt: t('谁说"泛音列可以证明一切，也就是说，什么也证明不了"？', '「倍音列はすべてを正当化する、つまり何も正当化しない」と言ったのは？', 'Who said the harmonic series “justifies everything, that means, nothing”?'), options: [t('Carl Dahlhaus', 'カール・ダールハウス', 'Carl Dahlhaus'), t('Marin Mersenne', 'マラン・メルセンヌ', 'Marin Mersenne'), t('Paul Hindemith', 'パウル・ヒンデミット', 'Paul Hindemith')] },
          { prompt: t('按 David Cope 的"音程强度"，哪个更强？', 'デヴィッド・コープの「音程の強さ」でより強いのは？', 'By David Cope’s interval strength, which is stronger?'), options: [t('平均律纯五度', '平均律の完全 5 度', 'the equal-tempered fifth'), t('平均律小三度', '平均律の短 3 度', 'the equal-tempered minor third'), t('一样强', '同じ', 'neither')] },
          { prompt: t('除了泛音的相对强度，下面哪一项也影响音色？', '倍音の相対的な強さのほか、音色に関わるものは？', 'Besides harmonic strengths, which also shapes timbre?'), options: [t('起音瞬态和共振峰', '立ち上がりの過渡音とフォルマント', 'onset transients and formants'), t('乐谱的调号', '楽譜の調号', 'the key signature'), t('演奏者的身高', '奏者の身長', 'the player’s height')] },
        ],
        answer: 0,
        explain: t('那句话出自 Dahlhaus；平均律五度近似泛音列里更低的纯五度，所以更"强"；起音瞬态、共振峰、噪音、非谐性也影响音色。', 'その言葉はダールハウス。平均律 5 度は倍音列でより低い純正 5 度に近いので「強い」。過渡音・フォルマント・ノイズ・非調和性も音色に関わる。', 'The line is Dahlhaus’s; the tempered fifth approximates the lower just fifth, so it is stronger; transients, formants, noise and inharmonicity also shape timbre.'),
      },
      {
        id: 'b53x-c4', type: 'choice', error: 'harmonic-series', skills: ['calc'], ref: 'wiki-harmonic-series',
        variants: [
          { prompt: t('300 Hz 和 400 Hz 一起响，一阶结合音（差音）是？', '300 Hz と 400 Hz が同時に鳴ると、1 次の結合音（差音）は？', '300 Hz and 400 Hz together give a first-order combination (difference) tone of…'), options: ['100 Hz', '700 Hz', '350 Hz'] },
          { prompt: t('基频 100 Hz，第三泛音是多少赫兹？', '基音 100 Hz の第 3 上音は何ヘルツ？', 'With a 100 Hz fundamental, the third overtone is…'), options: ['400 Hz', '300 Hz', '200 Hz'] },
          { prompt: t('基频 100 Hz，第 7 谐音是多少赫兹？', '基音 100 Hz の第 7 倍音は何ヘルツ？', 'With a 100 Hz fundamental, harmonic 7 is…'), options: ['700 Hz', '800 Hz', '600 Hz'] },
        ],
        answer: 0,
        explain: t('差音 400 − 300 = 100；第三泛音 = 第 4 谐音 = 400 Hz；第 7 谐音 = 700 Hz。', '差音 400 − 300 = 100。第 3 上音 = 第 4 倍音 = 400 Hz。第 7 倍音 = 700 Hz。', 'Difference tone 400 − 300 = 100; the third overtone is harmonic 4 = 400 Hz; harmonic 7 = 700 Hz.'),
      },
      G('b53x-g1', 'harmonicNumber', 1, ['calc']),
      G('b53x-g2', 'ratioCents', 1, ['calc']),
    ],
  },
  pool: [G('b53x-p1', 'harmonicNumber', 2, ['calc']), G('b53x-p2', 'ratioCents', 2, ['calc'])],
};

// ===================== B5-4x 律制的计算 · 扩展关 =====================
// 对应 A 面：temperaments（毕达哥拉斯 / 中庸全音 / 十二平均 / 综合）+ welltemper（毕达哥拉斯音差 / Werckmeister III / Vallotti / 良好律综合）
const EXT_B5_4 = {
  minutes: 22,
  insight: t('每一种律制都在回答同一个问题：十二个纯五度比七个八度多出来的那一点，要放在哪里？毕达哥拉斯全塞进一个狼五度，中全音律为纯三度牺牲五度，良好律分给几个五度，平均律平均分掉。名字背后还有不少历史误会。', 'どの律も同じ問いに答えている：12 の純正 5 度が 7 オクターヴより余るわずかな分をどこに置くか。ピタゴラスは 1 つのウルフ 5 度に押し込み、ミーントーンは純正 3 度のために 5 度を犠牲にし、ウェル・テンペラメントはいくつかの 5 度に分け、平均律は均等に分ける。名前の裏には歴史の誤解も少なくない。', 'Every temperament answers one question: where to put the small excess of twelve pure fifths over seven octaves? Pythagorean crams it into one wolf, meantone sacrifices fifths for pure thirds, well temperaments share it among a few fifths, equal temperament spreads it evenly. Behind the names lie quite a few historical misunderstandings.'),
  sections: {
    discover: [
      {
        id: 'b54x-d1', type: 'discover', ref: 'wiki-pythagorean',
        prompt: t('毕达哥拉斯律的大三度叫 ditone，比是 81:64；纯律大三度是 5:4。哪一个更宽？', 'ピタゴラス律の長 3 度はダイトーンで比は 81:64、純正の長 3 度は 5:4。どちらが広い？', 'The Pythagorean major third, the ditone, is 81:64; the just major third is 5:4. Which is wider?'),
        options: [t('ditone 81:64 更宽（81/64 ≈ 1.266 > 1.25）', 'ダイトーン 81:64 のほうが広い（81/64 ≈ 1.266 > 1.25）', 'The ditone 81:64 (81/64 ≈ 1.266 > 1.25)'), t('5:4 更宽', '5:4 のほうが広い', '5:4'), t('一样宽', '同じ', 'They are equal')],
        answer: 0,
        insight: {
          title: t('四个纯五度叠出来的三度', '純正 5 度 4 つで積んだ 3 度', 'A third stacked from four pure fifths'),
          text: t('毕达哥拉斯律只用纯五度 3:2 和八度 2:1：3:2 是弦振动在八度之后的下一个泛音，是第二协和的纯音程，也最容易凭耳朵调准。叠四个五度再降两个八度得到 81:64，比泛音列里的 5:4 宽。维基也说明：所有带 sesqui- 前缀的音程都是纯律，例如 sesquiquartum 5:4；ditone、semiditone 则是毕达哥拉斯律专有的名字。', 'ピタゴラス律は純正 5 度 3:2 と 8 度 2:1 だけを使う：3:2 は弦の振動で 8 度の次の倍音で、2 番目に協和な純正音程であり、耳で最も合わせやすい。5 度を 4 つ積んで 2 オクターヴ下げると 81:64 で、倍音列の 5:4 より広い。ウィキペディアは、sesqui- の付く音程はすべて純正（たとえばセスクイクァルトゥム 5:4）で、ダイトーンやセミダイトーンはピタゴラス律に固有の名前だと説明する。', 'Pythagorean tuning uses only pure fifths 3:2 and octaves 2:1: 3:2 is the next harmonic of a string after the octave, the next most consonant pure interval and the easiest to tune by ear. Four fifths minus two octaves give 81:64, wider than the series’ 5:4. Wikipedia notes that every interval with the prefix sesqui- is justly tuned (sesquiquartum 5:4), while ditone and semiditone are specific to Pythagorean tuning.'),
        },
      },
    ],
    explain: [
      {
        id: 'b54x-e1', type: 'page', ref: 'wiki-pythagorean',
        title: t('进阶 1 · 毕达哥拉斯律：名字、来源与那个狼', '発展 1・ピタゴラス律：名前、起源、そしてウルフ', 'Advanced 1 · Pythagorean tuning: name, origin and the wolf'),
        text: [
          t('这个体系可以追溯到古代美索不达米亚；它以古希腊的毕达哥拉斯（公元前 6 世纪）命名，但被现代乐理作者普遍误归于他。托勒密和后来的波爱修斯把只用"semitonium"和"tonus"两种音程划分四音列（256:243 × 9:8 × 9:8）归功于埃拉托色尼。所谓"毕达哥拉斯律"一直被乐手用到 16 世纪初。以 D 为中心向上、向下各叠纯五度：E♭–B♭–F–C–G–D–A–E–B–F♯–C♯–G♯，这十一个纯五度造出十二个音。', 'この体系は古代メソポタミアにさかのぼる。古代ギリシャのピタゴラス（前 6 世紀）にちなんで名付けられたが、現代の音楽理論家に広く誤って帰属されている。プトレマイオスとのちのボエティウスは、「セミトニウム」と「トヌス」の 2 種だけでテトラコードを分ける方法（256:243 × 9:8 × 9:8）をエラトステネスに帰した。いわゆる「ピタゴラス律」は 16 世紀初めまで音楽家に使われた。D を中心に上下へ純正 5 度を積む：E♭–B♭–F–C–G–D–A–E–B–F♯–C♯–G♯、この 11 の純正 5 度で 12 音を作る。', 'The system dates to ancient Mesopotamia; it is named after — and widely misattributed by modern authors to — Pythagoras (6th century BC). Ptolemy, and later Boethius, ascribed the division of the tetrachord into just “semitonium” and “tonus” (256:243 × 9:8 × 9:8) to Eratosthenes. “Pythagorean tuning” was used by musicians up to the beginning of the 16th century. Stacking pure fifths up and down from D gives E♭–B♭–F–C–G–D–A–E–B–F♯–C♯–G♯: eleven pure fifths make twelve notes.'),
          t('这样 G♯ 和 A♭ 相对 D 的频率比不同，差约 23.46 音分（将近四分之一个半音），就是毕达哥拉斯音差。十一个纯五度各约 701.955 音分（700 + ε，ε ≈ 1.955）；十二个五度平均必须正好 700，所以剩下那个只有 700 − 11ε ≈ 678.495 音分——狼五度，严格说应叫减六度（G♯–E♭）。毕达哥拉斯律的音程有一整套名字：limma（小半音，256:243）、apotome（大半音，2187:2048）、epogdoön（全音，9:8）、semiditone（小三度，32:27）、ditone（大三度，81:64）、diatessaron（纯四度，4:3）、tritone（三全音，729:512）、diapente（纯五度，3:2）、diapason（八度，2:1）。', 'こうして G♯ と A♭ は D に対する周波数比が違い、約 23.46 セント（半音の 4 分の 1 近く）の差ができる——ピタゴラス・コンマ。11 の純正 5 度は各約 701.955 セント（700 + ε、ε ≈ 1.955）。12 の 5 度の平均はちょうど 700 でなければならないので、残りの 1 つは 700 − 11ε ≈ 678.495 セントしかない——ウルフ 5 度、正しくは減 6 度（G♯–E♭）。ピタゴラス律の音程には一連の名前がある：リンマ（小半音 256:243）、アポトメ（大半音 2187:2048）、エポグドオン（全音 9:8）、セミダイトーン（短 3 度 32:27）、ダイトーン（長 3 度 81:64）、ディアテッサロン（完全 4 度 4:3）、トライトーン（729:512）、ディアペンテ（完全 5 度 3:2）、ディアパソン（8 度 2:1）。', 'G♯ and A♭ then have different ratios to D, about 23.46 cents apart (nearly a quarter semitone) — the Pythagorean comma. The eleven pure fifths are about 701.955 cents each (700 + ε, ε ≈ 1.955); since the twelve must average exactly 700, the last is only 700 − 11ε ≈ 678.495 cents — the wolf fifth, properly a diminished sixth (G♯–E♭). Pythagorean intervals have their own names: limma (minor semitone, 256:243), apotome (major semitone, 2187:2048), epogdoön (tone, 9:8), semiditone (minor third, 32:27), ditone (major third, 81:64), diatessaron (fourth, 4:3), tritone (729:512), diapente (fifth, 3:2), diapason (octave, 2:1).'),
        ],
      },
      {
        id: 'b54x-e2', type: 'discover', practice: true, ref: 'wiki-pythagorean',
        prompt: t('毕达哥拉斯律的狼五度（G♯–E♭）大约多少音分？', 'ピタゴラス律のウルフ 5 度（G♯–E♭）はおよそ何セント？', 'About how many cents is the Pythagorean wolf (G♯–E♭)?'),
        options: ['678.5', '701.955', '700', '723.5'],
        answer: 0,
        insight: { title: t('700 − 11ε', '700 − 11ε', '700 − 11ε'), text: t('700 − 11 × 1.955 ≈ 678.495：比纯五度窄一个毕达哥拉斯音差（约 23.46）。', '700 − 11 × 1.955 ≈ 678.495：純正 5 度よりピタゴラス・コンマ（約 23.46）狭い。', '700 − 11 × 1.955 ≈ 678.495: a Pythagorean comma (about 23.46) narrower than pure.') },
      },
      {
        id: 'b54x-e3', type: 'page', ref: 'wiki-meantone',
        title: t('进阶 2 · 中全音律：从 Ramos 到 Ligeti', '発展 2・ミーントーン：ラモスからリゲティまで', 'Advanced 2 · Meantone: from Ramos to Ligeti'),
        text: [
          t('中全音律缩窄纯五度来改善三度，名字来自把大三度（5:4）分成两个相等全音所用的几何平均。15 世纪末已经普遍使用：Bartolomé Ramos de Pareja 在 1482 年的《Musica Practica》里写到它，Franchinus Gaffurius 1496 年发表了描述，Pietro Aron 1523 年的大键琴调律手册里有一段可能就是后来所说的四分之一音差中全音律——C–E 的三度调纯，C–G 的五度稍窄；Gioseffo Zarlino 在 1571 年用清楚的数学描述了相当于四分之一音差中全音律的"新律"。最有名的四分之一音差中全音律把十二个五度各缩窄 1/4 个"同调音差"（syntonic comma）；而十二平均律的五度只需缩窄约 1/11 个同调音差（或 1/12 个毕达哥拉斯音差）。', 'ミーントーンは純正 5 度を狭めて 3 度を改善する律で、名前は長 3 度（5:4）を 2 つの等しい全音に分けるのに使う幾何平均から。15 世紀末にはすでに広く使われていた：バルトロメ・ラモス・デ・パレハが 1482 年の『Musica Practica』で書き、フランキヌス・ガッフリウスが 1496 年に記述を出し、ピエトロ・アーロンの 1523 年のチェンバロ調律の手引きには、のちの 4 分の 1 シントニック・コンマ・ミーントーンらしき記述がある——C–E の 3 度を純正にし、C–G の 5 度を少し狭くする。ジョゼッフォ・ツァルリーノは 1571 年に 4 分の 1 コンマ・ミーントーンに当たる「新しい律」を明確な数学で記述した。最も有名な 4 分の 1 コンマ・ミーントーンは 12 の 5 度をそれぞれシントニック・コンマの 1/4 ずつ狭める。12 平均律の 5 度はシントニック・コンマの約 1/11（ピタゴラス・コンマの 1/12）しか狭めない。', 'Meantone narrows fifths to improve thirds; the name comes from the geometric mean that splits the major third (5:4) into two equal tones. It was common by the late 15th century: Bartolomé Ramos de Pareja wrote of it in his 1482 Musica Practica; Franchinus Gaffurius published a description in 1496; Pietro Aron’s 1523 harpsichord tuning manual possibly describes what was later called quarter-comma meantone — C–E tuned pure, C–G slightly flat; Gioseffo Zarlino described a corresponding “new temperament” in clear mathematical terms in 1571. Quarter-comma meantone, the best known, narrows each of the twelve fifths by 1/4 syntonic comma; 12-tone equal temperament narrows them only about 1/11 syntonic comma (1/12 Pythagorean).'),
          t('狼五度来自把中全音律"无穷多"的音映射到有限的琴键上：越过八度时总有一个五度比其他的更窄。17 世纪有人主张把八度分得更细：主张 31 音的有 Lemme Rossi（1666）、Joseph Zaragoza（1674）、惠更斯（1691）；主张 53 份的有 Jean Gallé、牛顿和 Nicholas Mercator。缩窄五度也不总被当作缺点：Wolfgang Printz 觉得缩窄五度的拍音很迷人，作曲家可能用它模拟颤音。平均律成为标准后，中全音律仍广泛用在管风琴上；今天的古乐演奏者常偏爱它；John Adams（《Absolute Jest》，2012）和 Ligeti（《Passacaglia ungherese》，1978）也用它写过作品。', 'ウルフ 5 度は、ミーントーンの「無限の」音を有限の鍵盤に割り当てることから生じる：オクターヴを越えるとき、どこかの 5 度がほかより狭くならざるをえない。17 世紀にはオクターヴをもっと細かく分ける提案もあった：31 音を唱えたのはレンメ・ロッシ（1666）、ホセ・サラゴサ（1674）、ホイヘンス（1691）、53 分割を支持したのはジャン・ガレ、ニュートン、ニコラス・メルカトル。5 度を狭めることはいつも欠点と見なされたわけではない：ヴォルフガング・プリンツは狭めた 5 度のうなりを魅力的だと感じ、作曲家はそれでヴィブラートを模したかもしれない。平均律が標準になってもミーントーンはオルガンで広く使われ続け、今日の古楽奏者もよく好む。ジョン・アダムズ（《Absolute Jest》2012）やリゲティ（《Passacaglia ungherese》1978）もこの律で作曲した。', 'The wolf arises from mapping meantone’s infinitely many notes onto finitely many keys: crossing the octave, some fifth must be flatter than the rest. Seventeenth-century advocates of finer divisions included Lemme Rossi (1666), Joseph Zaragoza (1674) and Christiaan Huygens (1691) for 31 notes, and Jean Gallé, Isaac Newton and Nicholas Mercator for 53. Narrowed fifths were not always seen as a flaw: Wolfgang Printz found their beating charming, and composers may have used it to simulate vibrato. As equal temperament became standard, meantone stayed in wide use on organs; early-music performers often prefer it today; John Adams (Absolute Jest, 2012) and György Ligeti (Passacaglia ungherese, 1978) have written in it.'),
        ],
      },
      {
        id: 'b54x-e4', type: 'discover', practice: true, ref: 'wiki-meantone',
        prompt: t('谁在 1571 年用清楚的数学描述了相当于四分之一音差中全音律的"新律"？', '1571 年に 4 分の 1 コンマ・ミーントーンに当たる「新しい律」を明確な数学で記述したのは？', 'Who described in clear mathematical terms, in 1571, a “new temperament” corresponding to quarter-comma meantone?'),
        options: [t('Zarlino', 'ツァルリーノ', 'Zarlino'), t('Pietro Aron', 'ピエトロ・アーロン', 'Pietro Aron'), t('Werckmeister', 'ヴェルクマイスター', 'Werckmeister')],
        answer: 0,
        insight: { title: t('1482、1496、1523、1571', '1482・1496・1523・1571', '1482, 1496, 1523, 1571'), text: t('Ramos（1482）、Gaffurius（1496）、Aron（1523，"可能"）、Zarlino（1571，清楚的数学）。', 'ラモス（1482）、ガッフリウス（1496）、アーロン（1523、「らしき」）、ツァルリーノ（1571、明確な数学）。', 'Ramos (1482), Gaffurius (1496), Aron (1523, “possibly”), Zarlino (1571, clear mathematics).') },
      },
      {
        id: 'b54x-e5', type: 'page', ref: 'wiki-werckmeister',
        title: t('进阶 3 · Werckmeister：两套编号，三种律', '発展 3・ヴェルクマイスター：2 通りの番号、3 つの律', 'Advanced 3 · Werckmeister: two numberings, three temperaments'),
        text: [
          t('Werckmeister 律有两种编号：一种按他 1691 年论著里作为"良好律"提出的顺序，另一种按他在单弦琴上的标记——单弦琴的标记从 III 开始，因为 I 是纯律、II 是四分之一音差中全音律。所以通常说的"Werckmeister III"其实是"Werckmeister I (III)"，他称之为"正确的律"：大多数五度像毕达哥拉斯律一样是纯的，只有 C–G、G–D、D–A、B–F♯ 四个五度各缩窄 1/4 音差；不管用毕达哥拉斯音差还是同调音差，缩窄后的五度实际上和中全音律的五度一样。所有大三度都相当接近 400 音分，又因为不是所有五度都缩窄，所以没有狼五度，十二个音都能当主音。Werckmeister 指出这种律特别适合演奏半音化的音乐（"ficte"），这可能是它近年流行于巴赫音乐的原因。', 'ヴェルクマイスターの律には 2 通りの番号がある：1 つは 1691 年の論著で「良い律」として示された順、もう 1 つはモノコード上の表示——モノコードの表示は III から始まる。I が純正律、II が 4 分の 1 コンマ・ミーントーンだから。だから普通「ヴェルクマイスター III」と呼ばれるのは実は「ヴェルクマイスター I (III)」で、彼は「正しい律」と呼んだ：大半の 5 度はピタゴラス律のように純正で、C–G・G–D・D–A・B–F♯ の 4 つだけを 1/4 コンマずつ狭める。ピタゴラス・コンマでもシントニック・コンマでも、狭めた 5 度は実用上ミーントーンの 5 度と同じ。長 3 度はどれも 400 セントにかなり近く、すべての 5 度を狭めるわけではないのでウルフ 5 度はなく、12 音すべてを主音にできる。ヴェルクマイスターはこの律を半音的な音楽（「フィクテ」）に特に向くとしており、それが近年バッハの音楽の調律として人気がある理由かもしれない。', 'Werckmeister’s temperaments are numbered two ways: by the order he presented them as “good temperaments” in his 1691 treatise, and by their labels on his monochord — which start from III, since just intonation is I and quarter-comma meantone II. So what is usually called “Werckmeister III” is really “Werckmeister I (III)”, his “correct temperament”: mostly pure fifths, as in Pythagorean tuning, with only C–G, G–D, D–A and B–F♯ narrowed by 1/4 comma; whether Pythagorean or syntonic comma, the tempered fifths are practically meantone fifths. All major thirds are reasonably close to 400 cents, and since not all fifths are tempered there is no wolf, so all twelve notes can be tonics. Werckmeister called it particularly suited to chromatic music (“ficte”), which may explain its recent popularity for Bach.'),
          t('另外两种：Werckmeister II (IV) 以 1/3 音差划分，C–G、D–A、E–B、F♯–C♯、B♭–F 缩窄 1/3 音差，G♯–D♯、E♭–B♭ 放宽 1/3 音差，其余纯五度，主要为自然音音乐（很少用黑键）设计，大多数音程接近六分之一音差中全音律；Werckmeister III (V) 以 1/4 音差划分，D–A、A–E、F♯–C♯、C♯–G♯、F–C 缩窄，G♯–D♯ 放宽，比前两种更接近平均律。最后的"Septenarius"律不按音差的分数设计，而是把单弦琴分成 196 = 7 × 7 × 4 份，直接给出弦长。', 'ほかの 2 つ：ヴェルクマイスター II (IV) は 1/3 コンマで分け、C–G・D–A・E–B・F♯–C♯・B♭–F を 1/3 コンマ狭め、G♯–D♯・E♭–B♭ を 1/3 コンマ広げ、ほかは純正。主に全音階的な音楽（黒鍵をあまり使わない）向けで、音程の大半は 6 分の 1 コンマ・ミーントーンに近い。ヴェルクマイスター III (V) は 1/4 コンマで分け、D–A・A–E・F♯–C♯・C♯–G♯・F–C を狭め、G♯–D♯ を広げる。前の 2 つより平均律に近い。最後の「セプテナリウス」はコンマの分数で考えず、モノコードを 196 = 7 × 7 × 4 に分けて弦長を直接示した。', 'The others: Werckmeister II (IV), in 1/3-comma divisions, narrows C–G, D–A, E–B, F♯–C♯ and B♭–F by 1/3 comma and widens G♯–D♯ and E♭–B♭ by 1/3, the rest pure; designed for mainly diatonic music (few black notes), most intervals near sixth-comma meantone. Werckmeister III (V), in 1/4-comma divisions, narrows D–A, A–E, F♯–C♯, C♯–G♯ and F–C and widens G♯–D♯ — closer to equal temperament than the other two. The final “Septenarius” tuning is not built from comma fractions but divides the monochord into 196 = 7 × 7 × 4 parts, giving string lengths directly.'),
        ],
        visual: { kind: 'blocks', rows: [{ label: 'I (III)', cells: ['C–G', 'G–D', 'D–A', 'B–F♯', '−¼'] }, { label: 'II (IV)', cells: ['C–G', 'D–A', 'E–B', 'F♯–C♯', 'B♭–F', '−⅓'] }, { label: 'III (V)', cells: ['D–A', 'A–E', 'F♯–C♯', 'C♯–G♯', 'F–C', '−¼'] }] },
      },
      {
        id: 'b54x-e6', type: 'discover', practice: true, ref: 'wiki-werckmeister',
        prompt: t('Werckmeister 单弦琴上的编号为什么从 III 开始？', 'ヴェルクマイスターのモノコードの番号はなぜ III から始まる？', 'Why do Werckmeister’s monochord labels start at III?'),
        options: [t('I 是纯律，II 是四分之一音差中全音律', 'I が純正律、II が 4 分の 1 コンマ・ミーントーンだから', 'I is just intonation and II quarter-comma meantone'), t('前两种失传了', '最初の 2 つは失われたから', 'The first two were lost'), t('III 代表三个缩窄的五度', 'III は狭めた 5 度 3 つを表すから', 'III stands for three tempered fifths')],
        answer: 0,
        insight: { title: t('"III"其实是第一种', '「III」は実は 1 つ目', '“III” is really the first'), text: t('通常说的 Werckmeister III 是论著里的第一种良好律（I），单弦琴上标 III。', '普通のヴェルクマイスター III は論著の 1 つ目の良い律（I）で、モノコードでは III と表示。', 'The usual “Werckmeister III” is the treatise’s first good temperament (I), labelled III on the monochord.') },
      },
      {
        id: 'b54x-e7', type: 'page', ref: 'wiki-vallotti',
        title: t('进阶 4 · "Vallotti 律"其实不是 Vallotti 的', '発展 4・「ヴァロッティ律」は実はヴァロッティのものではない', 'Advanced 4 · The “Vallotti temperament” isn’t Vallotti’s'),
        text: [
          t('今天叫"Vallotti 律"（也叫 Vallotti-Barca、Vallotti-Tartini、Vallotti-Young）的循环律，其实是 Young 第二种律的移位版本。把它归于 18 世纪的管风琴家、作曲家、乐理家 Francesco Vallotti 是个错误——没有证据显示他提过它；不过它和 Vallotti 真正设计的、略有不同的律在听觉上分不出来。', '今日「ヴァロッティ律」（ヴァロッティ＝バルカ、ヴァロッティ＝タルティーニ、ヴァロッティ＝ヤングとも）と呼ばれる循環律は、実はヤングの第 2 の律をずらしたもの。18 世紀のオルガニスト・作曲家・理論家フランチェスコ・ヴァロッティに帰するのは誤り——彼がそれを提案した証拠はない。ただし、ヴァロッティが実際に考えた少し違う律とは耳で区別できない。', 'The circulating temperament now called “Vallotti” (also Vallotti-Barca, Vallotti-Tartini, Vallotti-Young) is a shifted version of Young’s second temperament. Attributing it to the 18th-century organist, composer and theorist Francesco Vallotti is a mistake — there is no evidence he ever suggested it — though it is audibly indistinguishable from a slightly different temperament he did devise.'),
          t('Vallotti 对自己律的描述在他的论著《Della scienza teorica e pratica della moderna musica》第二卷。他说自己在 1728 年就形成了理论体系，但第一卷直到 1779 年——他去世前一年——才出版；其余三卷一直是手稿，到 1950 年四卷才以《Trattato della moderna musica》为题一起出版。他的律生前和身后很长时间都很少受到关注。', 'ヴァロッティ自身の律の記述は論著『Della scienza teorica e pratica della moderna musica』第 2 巻にある。理論体系は 1728 年までにできていたと述べたが、第 1 巻は 1779 年——亡くなる前年——まで出版されず、残りの 3 巻は手稿のままで、1950 年に 4 巻が『Trattato della moderna musica』の題でまとめて出版された。彼の律は生前もその後もしばらくほとんど注目されなかった。', 'Vallotti describes his temperament in book 2 of his treatise Della scienza teorica e pratica della moderna musica. He said he had developed his system by 1728, but book 1 was not published until 1779, the year before he died; the other three books remained in manuscript until all four appeared in 1950 as Trattato della moderna musica. His temperament received very little attention during his lifetime and for some time after.'),
        ],
      },
      {
        id: 'b54x-e8', type: 'discover', practice: true, ref: 'wiki-vallotti',
        prompt: t('今天所说的"Vallotti 律"其实是什么？', '今日の「ヴァロッティ律」は実は何？', 'What is today’s “Vallotti temperament” really?'),
        options: [t('Young 第二种律的移位版本', 'ヤングの第 2 の律をずらしたもの', 'A shifted version of Young’s second temperament'), t('Werckmeister III', 'ヴェルクマイスター III', 'Werckmeister III'), t('四分之一音差中全音律', '4 分の 1 コンマ・ミーントーン', 'Quarter-comma meantone')],
        answer: 0,
        insight: { title: t('名字归错了人', '名前の帰属の誤り', 'A misattributed name'), text: t('没有证据显示 Vallotti 提过它，但它和他真正的律听不出差别。', 'ヴァロッティが提案した証拠はないが、本当の彼の律と聞き分けられない。', 'No evidence Vallotti proposed it, but it sounds indistinguishable from his real one.') },
      },
    ],
    experiment: [
      { id: 'b54x-x1', type: 'experiment', toy: 'temper', ref: ['wiki-pythagorean', 'wiki-meantone', 'wiki-werckmeister', 'wiki-vallotti'],
        prompt: t('依次比较毕达哥拉斯、中全音、Werckmeister III、Vallotti 和平均律：哪一种有狼五度？Werckmeister III 里最"纯"的大三度在哪个调，最宽的在哪个调？点 C 和 F♯ 的大三和弦听听差别。', 'ピタゴラス・ミーントーン・ヴェルクマイスター III・ヴァロッティ・平均律を順に比べよう：ウルフ 5 度があるのは？ ヴェルクマイスター III で最も「純正」に近い長 3 度はどの調、最も広いのはどの調？ C と F♯ の長三和音を鳴らして違いを聴こう。', 'Compare Pythagorean, meantone, Werckmeister III, Vallotti and equal temperament in turn: which have a wolf? In Werckmeister III, which key has the purest major third and which the widest? Play the C and F♯ major triads to hear the difference.'),
        params: { temperaments: ['pythagorean', 'meantone', 'werckmeister3', 'vallotti', 'equal'] },
        breakthrough: { id: 'b54x-keycolour', text: t('你听到了"调性色彩"：在良好律里，每个调的三度宽窄都不一样。', '「調の色」が聞こえた：ウェル・テンペラメントでは調ごとに 3 度の広さが違う。', 'You heard key colour: in a well temperament every key’s third is a different width.') } },
    ],
    challenge: [
      {
        id: 'b54x-c1', type: 'choice', error: 'temperament', skills: ['identify'], ref: 'wiki-pythagorean',
        variants: [
          { prompt: t('毕达哥拉斯律最早可以追溯到哪里？', 'ピタゴラス律の起源は？', 'Pythagorean tuning dates back to…'), options: [t('古代美索不达米亚', '古代メソポタミア', 'ancient Mesopotamia'), t('文艺复兴时期的意大利', 'ルネサンスのイタリア', 'Renaissance Italy'), t('18 世纪的德国', '18 世紀のドイツ', '18th-century Germany')] },
          { prompt: t('毕达哥拉斯律里的 apotome 是？', 'ピタゴラス律のアポトメは？', 'In Pythagorean tuning, the apotome is…'), options: [t('大半音 2187:2048', '大半音 2187:2048', 'the major semitone, 2187:2048'), t('小半音 256:243', '小半音 256:243', 'the minor semitone, 256:243'), t('全音 9:8', '全音 9:8', 'the whole tone, 9:8')] },
          { prompt: t('毕达哥拉斯律大约被用到什么时候？', 'ピタゴラス律はいつごろまで使われた？', 'Pythagorean tuning was used up to about…'), options: [t('16 世纪初', '16 世紀初め', 'the beginning of the 16th century'), t('19 世纪', '19 世紀', 'the 19th century'), t('今天仍是标准', '今も標準', 'it is still standard today')] },
        ],
        answer: 0,
        explain: t('源自古代美索不达米亚、被误归于毕达哥拉斯；apotome 是大半音 2187:2048；用到 16 世纪初。', '古代メソポタミアに起源を持ち、ピタゴラスに誤って帰された。アポトメは大半音 2187:2048。16 世紀初めまで使われた。', 'From ancient Mesopotamia, misattributed to Pythagoras; the apotome is the major semitone 2187:2048; used until the early 16th century.'),
      },
      {
        id: 'b54x-c2', type: 'choice', error: 'temperament', skills: ['identify'], ref: 'wiki-meantone',
        variants: [
          { prompt: t('四分之一音差中全音律每个五度缩窄多少？', '4 分の 1 コンマ・ミーントーンは各 5 度をどれだけ狭める？', 'Quarter-comma meantone narrows each fifth by…'), options: [t('1/4 个同调音差', 'シントニック・コンマの 1/4', '1/4 syntonic comma'), t('1/4 个毕达哥拉斯音差', 'ピタゴラス・コンマの 1/4', '1/4 Pythagorean comma'), t('1/12 个毕达哥拉斯音差', 'ピタゴラス・コンマの 1/12', '1/12 Pythagorean comma')] },
          { prompt: t('17 世纪谁主张把八度分成 31 份？', '17 世紀にオクターヴの 31 分割を唱えたのは？', 'Who in the 17th century advocated a 31-note octave?'), options: [t('惠更斯（1691）', 'ホイヘンス（1691）', 'Christiaan Huygens (1691)'), t('牛顿', 'ニュートン', 'Isaac Newton'), t('Werckmeister', 'ヴェルクマイスター', 'Werckmeister')] },
          { prompt: t('Ligeti 用中全音律写的作品是？', 'リゲティがミーントーンで書いた作品は？', 'Which Ligeti work is in meantone?'), options: [t('《Passacaglia ungherese》（1978）', '《Passacaglia ungherese》（1978）', 'Passacaglia ungherese (1978)'), t('《Absolute Jest》（2012）', '《Absolute Jest》（2012）', 'Absolute Jest (2012)'), t('《Threnody》', '《Threnody》', 'Threnody')] },
        ],
        answer: 0,
        explain: t('每个五度缩窄 1/4 同调音差；31 份的倡导者有 Rossi、Zaragoza、惠更斯（牛顿支持 53 份）；Ligeti《Passacaglia ungherese》（《Absolute Jest》是 John Adams 的）。', '各 5 度をシントニック・コンマの 1/4 狭める。31 分割はロッシ・サラゴサ・ホイヘンス（ニュートンは 53 分割）。リゲティは《Passacaglia ungherese》（《Absolute Jest》はジョン・アダムズ）。', 'Each fifth narrowed by 1/4 syntonic comma; 31-note advocates were Rossi, Zaragoza and Huygens (Newton favoured 53); Ligeti’s is Passacaglia ungherese (Absolute Jest is John Adams’s).'),
      },
      {
        id: 'b54x-c3', type: 'choice', error: 'temperament', skills: ['identify'], ref: 'wiki-werckmeister',
        variants: [
          { prompt: t('通常说的 Werckmeister III 缩窄了哪四个五度？', '普通のヴェルクマイスター III で狭める 4 つの 5 度は？', 'Which four fifths does the usual Werckmeister III narrow?'), options: ['C–G, G–D, D–A, B–F♯', 'D–A, A–E, F♯–C♯, F–C', 'C–G, D–A, E–B, B♭–F'] },
          { prompt: t('Werckmeister II (IV) 主要为哪种音乐设计？', 'ヴェルクマイスター II (IV) は主にどんな音楽向け？', 'Werckmeister II (IV) was designed mainly for…'), options: [t('自然音音乐（很少用黑键）', '全音階的な音楽（黒鍵をあまり使わない）', 'mainly diatonic music (few black notes)'), t('半音化音乐', '半音的な音楽', 'chromatic music'), t('十二音音乐', '十二音音楽', 'twelve-tone music')] },
          { prompt: t('Septenarius 律是怎么定义的？', 'セプテナリウスはどう定義される？', 'How is the Septenarius tuning defined?'), options: [t('把单弦琴分成 196 份，直接给弦长', 'モノコードを 196 に分け、弦長を直接示す', 'By dividing the monochord into 196 parts and giving string lengths'), t('每个五度缩窄 1/6 音差', '各 5 度を 1/6 コンマ狭める', 'By narrowing every fifth 1/6 comma'), t('十二个纯五度', '12 の純正 5 度', 'By twelve pure fifths')] },
        ],
        answer: 0,
        explain: t('"III" = I (III)：C–G、G–D、D–A、B–F♯；II (IV) 为自然音音乐；Septenarius 用 196 份弦长。', '「III」= I (III)：C–G・G–D・D–A・B–F♯。II (IV) は全音階的な音楽向け。セプテナリウスは 196 分割の弦長。', '“III” = I (III): C–G, G–D, D–A, B–F♯; II (IV) suits diatonic music; Septenarius uses 196-part string lengths.'),
      },
      {
        id: 'b54x-c4', type: 'choice', error: 'concept', skills: ['identify'], ref: ['wiki-vallotti', 'wiki-werckmeister'],
        variants: [
          { prompt: t('Vallotti 论著的第一卷哪一年出版？', 'ヴァロッティの論著第 1 巻の出版年は？', 'When was book 1 of Vallotti’s treatise published?'), options: [t('1779 年（他去世前一年）', '1779 年（亡くなる前年）', '1779, the year before he died'), t('1728 年', '1728 年', '1728'), t('1950 年', '1950 年', '1950')] },
          { prompt: t('为什么 Werckmeister III（通常说法）没有狼五度？', 'なぜ（普通の）ヴェルクマイスター III にウルフ 5 度がない？', 'Why has the usual Werckmeister III no wolf?'), options: [t('只缩窄四个五度，音差分摊掉了', '4 つの 5 度だけを狭め、コンマが分散されたから', 'Four fifths absorb the comma between them'), t('它是平均律', '平均律だから', 'It is equal temperament'), t('它只用七个音', '7 音しか使わないから', 'It uses only seven notes')] },
          { prompt: t('Werckmeister 说他的"正确的律"特别适合什么？', 'ヴェルクマイスターは「正しい律」が何に特に向くと言った？', 'Werckmeister said his “correct temperament” particularly suits…'), options: [t('半音化的音乐（"ficte"）', '半音的な音楽（「フィクテ」）', 'chromatic music (“ficte”)'), t('只用白键的音乐', '白鍵だけの音楽', 'white-key music only'), t('声乐', '声楽', 'vocal music')] },
        ],
        answer: 0,
        explain: t('第一卷 1779 年出版；四个五度各缩 1/4 音差，分完了音差，没有狼；适合半音化音乐。', '第 1 巻は 1779 年。4 つの 5 度が 1/4 コンマずつでコンマを分け、ウルフなし。半音的な音楽向け。', 'Book 1 appeared in 1779; four fifths each take 1/4 comma, so no wolf; suited to chromatic music.'),
      },
      G('b54x-g1', 'ratioCents', 1, ['calc']),
      G('b54x-g2', 'edoCents', 1, ['calc']),
    ],
  },
  pool: [G('b54x-p1', 'ratioCents', 2, ['calc']), G('b54x-p2', 'edoCents', 2, ['calc'])],
};

export const EXT_WORLD = { 'B5-1': EXT_B5_1, 'B5-2': EXT_B5_2, 'B5-3': EXT_B5_3, 'B5-4': EXT_B5_4 };

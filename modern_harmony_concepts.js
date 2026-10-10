// 二十世纪技法五个专题的"背景与概念"：定义、名称、历史、代表作品与争议。A 面每关的讲解卡与题目、Side-B 的讲解页与挑战题共用这里的内容。
// 每一条都按下列资料核对后自己改写，不转载原文或谱例（Arndt 的书页明确为 All Rights Reserved，只引用概念事实）：
// ref:rubin-nonfunctional ref:koozin-planing ref:wiki-parallel-harmony ref:wiki-chromatic-mediant ref:arndt-tonality
// ref:wiki-polytonality ref:wiki-petrushka-chord ref:wiki-octatonic
// ref:wiki-atonality ref:omt2e-normal-order
// ref:wiki-spectral-music ref:ircam-spectral
// ref:gann-ji ref:gann-ji-reasons ref:wiki-limit ref:wiki-neutral-third
const t = (zh, ja, en) => ({ zh, ja, en });
/** 选择题：第一个选项是答案（播放时会打乱顺序） */
const C = (ref, prompt, options, explain, hint) => ({ type: 'choice', ref, prompt, options, answer: 0, explain, ...(hint ? { hint } : {}) });
const M = (ref, prompt, pairs, explain) => ({ type: 'match', ref, prompt, pairs, explain });
const guide = (ref, title, steps) => ({ type: 'guide', ref, title, steps });

// ---------------- 非功能和声 ----------------
const NF_REF = ['rubin-nonfunctional', 'koozin-planing', 'wiki-parallel-harmony', 'wiki-chromatic-mediant', 'arndt-tonality'];
const NF_STEPS = [
  t('二十世纪初，作曲家开始寻找功能和声之外的路。德彪西、拉威尔等印象派作曲家用的和弦大多很熟悉，只是用法换了：和弦不再按“准备—紧张—解决”的等级排队。', '20 世紀初め、作曲家は機能和声の外に道を探しました。ドビュッシーやラヴェルら印象派が使う和音の多くは見慣れたものですが、使い方が変わり、「準備—緊張—解決」の序列に並ばなくなりました。', 'In the early twentieth century composers looked for paths beyond functional harmony. Impressionists such as Debussy and Ravel mostly used familiar chords in new ways: the chords no longer line up in a hierarchy of preparation, tension and release.'),
  t('最直接的做法是平行移动（planing，也叫平行和声）：一个音响的所有声部按同样的音程移动。每个和弦性质相同，就不产生需要解决的紧张，和声进行感被削弱；这时一般不用罗马数字，只按根音和性质给和弦命名。', '最も直接的な方法は平行移動（プレーニング、平行和声）です。一つの響きの全声部が同じ音程で動きます。和音の種類が同じなので解決すべき緊張が生まれず、和声進行感が弱まります。この場合ふつうローマ数字は使わず、根音と種類で和音を呼びます。', 'The most direct technique is planing (parallel harmony): every voice of one sonority moves by the same interval. With every chord of the same quality there is no tension demanding release, so the sense of progression weakens; Roman numerals are usually set aside and chords are named by root and quality.'),
  t('平行移动分两种：等距平行（real planing）按半音移动，音程结构完全不变；调内平行（diatonic planing）留在一个音阶里按级数移动，和弦性质会随之改变。等距平行移得越远，就越难归入同一个调号。', '平行には二種類あります。実平行（real planing）は半音単位で動き、音程構造がまったく変わりません。音階内の平行（diatonic planing）は一つの音階の中を度数で動き、和音の種類が変わります。実平行を遠くまで続けるほど、一つの調号には収まらなくなります。', 'There are two kinds: real planing moves by semitones and keeps the interval structure exactly; diatonic planing moves by scale steps within one scale, so chord qualities change. The further real planing travels, the less the chords fit one key signature.'),
  t('另一种连接靠共同音：让两个音响共有的音保持不动，把它们接起来；也可以把一个音等音异名地重新解释（例如把 A♭ 读成 G♯），迅速换到另一个调区。', 'もう一つは共通音による連結です。二つの響きに共通する音を保って結びます。また一つの音を異名同音で読み替える（A♭ を G♯ とする）ことで、すばやく別の調域へ移れます。', 'Another connection uses common tones: keep a note the two sonorities share. A note can also be reinterpreted enharmonically (A♭ read as G♯) to jump quickly to another key region.'),
  t('半音中音关系：两个和弦根音相距大三度或小三度、同为大三或同为小三、只有一个共同音，例如 C 与 E、C 与 A♭。性质相反又没有共同音的（如 C 与 E♭ 小三）叫双重半音中音。这类连接在浪漫派以后、在印象派音乐里更常见。', '半音的中音関係：根音が長 3 度か短 3 度離れ、どちらも長三和音か短三和音で、共通音が一つ（C と E、C と A♭）。種類が逆で共通音のないもの（C と E♭ 短三和音）は二重半音的中音です。ロマン派以降、印象派の音楽でより多く使われました。', 'Chromatic mediants: roots a major or minor third apart, both major or both minor, one common tone — C and E, C and A♭. With opposite quality and no common tone (C and E♭ minor) it is a doubly chromatic mediant. These connections became more common from the Romantic period and in impressionist music.'),
  t('非功能不等于没有中心。德彪西《沉没的教堂》（1910）在不同的主音之间游移，到高潮和再现处，用自然音旋律和主音持续音清楚地投射出 C。这首曲子的“管风琴和弦”也是平行和声的著名例子。', '非機能は中心がないことではありません。ドビュッシー《沈める寺》（1910）は主音の間を漂いますが、頂点と再現では全音階の旋律と主音保続音で C をはっきり示します。この曲の「オルガンの和音」は平行和声の有名な例でもあります。', 'Nonfunctional does not mean centreless. Debussy’s “La cathédrale engloutie” (1910) drifts between tonics, yet at its climax and reprise it clearly projects C with a diatonic melody and a tonic pedal. Its “organ chords” are also a famous example of parallel harmony.'),
];
const NF = {
  guide: guide(NF_REF, t('背景与概念：平行、共同音与半音中音', '背景と概念：平行・共通音・半音的中音', 'Background: planing, common tones and chromatic mediants'), NF_STEPS),
  main: [
    C(['wiki-parallel-harmony', 'rubin-nonfunctional'], t('一个音响的所有声部按同样的音程移动，这种写法叫？', '一つの響きの全声部が同じ音程で動く書き方は？', 'All voices of a sonority move by the same interval. What is this called?'),
      [t('平行移动（planing）', '平行移動（プレーニング）', 'Planing'), t('共同音连接', '共通音連結', 'Common-tone connection'), t('属—主终止', '属—主の終止', 'Dominant–tonic cadence'), t('逆行', '逆行', 'Retrograde')],
      t('平行移动也叫平行和声：每个声部移动同样的音程，和弦性质保持一致，和声进行感被削弱。', '平行移動は平行和声とも呼ばれ、各声部が同じ音程で動き、和音の種類が一定なので和声進行感が弱まります。', 'Planing (parallel harmony) moves every voice by the same interval; chord quality stays constant, weakening the sense of progression.')),
    C(['rubin-nonfunctional'], t('为什么平行移动的段落里通常不用罗马数字分析？', '平行移動の部分では、なぜふつうローマ数字で分析しない？', 'Why are Roman numerals usually not used for a passage of planing?'),
      [t('和弦性质都一样，不形成功能上的紧张与解决，只按根音和性质命名', '和音の種類が同じで機能的な緊張と解決がなく、根音と種類で呼ぶから', 'The chords share one quality and create no functional tension and release, so they are named by root and quality'), t('因为平行移动只能在小调里出现', '平行移動は短調にしか現れないから', 'Because planing only occurs in minor keys'), t('因为平行移动的和弦一定是七和弦', '平行移動の和音は必ず七の和音だから', 'Because planed chords are always sevenths'), t('因为平行移动没有低音', '平行移動には低音がないから', 'Because planing has no bass')],
      t('Rubin 指出：非功能和声一般无法用罗马数字这种调性分析工具，而是回到按根音与性质命名。', 'Rubin によれば、非機能和声にはふつうローマ数字の調性分析は使えず、根音と種類で呼びます。', 'Rubin notes that Roman-numeral analysis usually does not apply; chords are named by root and quality instead.')),
    C(['wiki-chromatic-mediant'], t('C 大三和弦接 E 大三和弦：根音相距大三度、同为大三和弦、只有一个共同音 E。这种关系叫？', 'C の長三和音から E の長三和音へ：根音は長 3 度離れ、どちらも長三和音で共通音は E だけ。この関係は？', 'C major to E major: roots a major third apart, both major, sharing only E. What is this relationship?'),
      [t('半音中音关系', '半音的中音関係', 'A chromatic mediant relationship'), t('调内平行', '音階内の平行', 'Diatonic planing'), t('属到主', '属から主', 'Dominant to tonic'), t('双重半音中音', '二重半音的中音', 'A doubly chromatic mediant')],
      t('根音相距三度、同性质、一个共同音，是半音中音；性质相反且没有共同音才叫双重半音中音。', '根音が 3 度、同じ種類、共通音一つなら半音的中音。種類が逆で共通音なしが二重半音的中音です。', 'Roots a third apart, same quality, one common tone: a chromatic mediant. Opposite quality with no common tone is a doubly chromatic mediant.')),
    M(['koozin-planing', 'rubin-nonfunctional', 'wiki-parallel-harmony'], t('连接方法 ↔ 做法', '連結の方法 ↔ やり方', 'Connection ↔ how it works'), [
      [t('等距平行', '実平行', 'Real planing'), t('每个声部移动同样的半音数，音程结构不变', '各声部が同じ半音数動き、音程構造は不変', 'Every voice moves the same number of semitones; structure unchanged')],
      [t('调内平行', '音階内の平行', 'Diatonic planing'), t('留在一个音阶里按级数移动，性质可能改变', '一つの音階の中を度数で動き、種類が変わりうる', 'Moves by scale steps within one scale; quality may change')],
      [t('共同音连接', '共通音連結', 'Common-tone connection'), t('保留两个和弦共有的音', '二つの和音に共通する音を保つ', 'Keeps a note the two chords share')],
      [t('等音重新解释', '異名同音の読み替え', 'Enharmonic reinterpretation'), t('把 A♭ 读成 G♯，转到另一个调区', 'A♭ を G♯ と読み、別の調域へ', 'Reads A♭ as G♯ to reach another key region')],
    ], t('前两种是平行移动的两种规则；后两种靠保留或重新解释一个音来连接。', '前の二つは平行移動の規則、後の二つは一音を保つか読み替えて結びます。', 'The first two are the two rules of planing; the last two connect by keeping or reinterpreting a note.')),
    C(['arndt-tonality'], t('德彪西《沉没的教堂》在高潮和再现处，用什么清楚地投射出 C 的中心？', 'ドビュッシー《沈める寺》は頂点と再現で、何によって C の中心をはっきり示す？', 'At its climax and reprise, how does Debussy’s “La cathédrale engloutie” clearly project C as the centre?'),
      [t('自然音旋律和主音持续音', '全音階の旋律と主音保続音', 'A diatonic melody and a tonic pedal point'), t('属七到主的完满终止', '属七から主への完全終止', 'A perfect authentic cadence from V7'), t('一个十二音列', '十二音の音列', 'A twelve-tone row'), t('四分之一音', '四分音', 'Quarter-tones')],
      t('Arndt 用这首曲子说明非功能调性：曲子在不同主音之间游移，但靠旋律和持续音仍然确立了 C。', 'Arndt はこの曲で非機能調性を説明します。主音の間を漂いつつ、旋律と保続音で C を確立します。', 'Arndt uses the piece to illustrate nonfunctional tonality: it drifts between tonics yet establishes C through melody and a pedal.')),
  ],
  branches: [
    [
      C(['rubin-nonfunctional'], t('一串等距平行的大三和弦越移越远，结果会怎样？', '実平行の長三和音を遠くまで続けると、どうなる？', 'What happens as a chain of real-planed major triads travels further?'),
        [t('越来越难归入同一个调号', 'ますます一つの調号に収まらなくなる', 'They fit one key signature less and less'), t('自动回到主和弦', '自動的に主和音へ戻る', 'They automatically return to the tonic'), t('和弦性质逐渐变成小三', '和音が次第に短三和音になる', 'They gradually turn minor'), t('声部数逐渐减少', '声部数が減っていく', 'Voices gradually drop out')],
        t('每个和弦的音程结构完全相同，移得越远，用到的音就越分散到不同调号里，这也让它离共同实践时期的写法更远。', '音程構造が同じなので、遠く動くほど音が別々の調号に散り、共通慣習期の書法から離れます。', 'With identical structures, the further the chain moves, the more its notes scatter across key signatures, distancing it from common-practice writing.')),
      C(['koozin-planing', 'wiki-parallel-harmony'], t('“等距平行”（real planing）保留了什么？', '「実平行」（real planing）が保つのは？', 'What does real planing preserve?'),
        [t('每个和弦内部的音程结构（按半音完全一样）', '各和音の内部の音程構造（半音で完全に同じ）', 'Each chord’s internal interval structure, exact in semitones'), t('每个和弦的音名', '各和音の音名', 'Each chord’s note names'), t('和弦的功能', '和音の機能', 'Each chord’s function'), t('同一个低音', '同じ低音', 'The same bass note')],
        t('等距平行按半音移动每个声部，所以内部音程完全不变；调内平行才会改变性质。', '実平行は各声部を半音単位で動かすので内部の音程は不変。種類が変わるのは音階内の平行です。', 'Real planing moves each voice by semitones, so internal intervals stay identical; diatonic planing is the kind that changes qualities.')),
    ],
    [
      C(['koozin-planing', 'wiki-parallel-harmony'], t('C 大调里把 C–E–G 按音阶位置上移一级，得到 D–F–A。这种平行叫？', 'C 長調で C–E–G を音階上の位置で一つ上げると D–F–A。この平行は？', 'In C major, C–E–G moved up one scale step gives D–F–A. What kind of planing is this?'),
        [t('调内平行（diatonic planing）', '音階内の平行（diatonic planing）', 'Diatonic planing'), t('等距平行（real planing）', '実平行（real planing）', 'Real planing'), t('半音中音', '半音的中音', 'Chromatic mediant'), t('等音转调', '異名同音転調', 'Enharmonic modulation')],
        t('按音阶位置移动、留在 C 大调里，大三和弦变成了小三和弦：这是调内平行。', '音階の位置で動き C 長調に留まるので、長三和音が短三和音になります。音階内の平行です。', 'Moving by scale position within C major turns the major triad minor: diatonic planing.')),
      C(['wiki-parallel-harmony'], t('维基百科把德彪西《落叶》里的平行列为哪种平行的例子？', 'Wikipedia はドビュッシー《枯葉》の平行をどの種類の例に挙げる？', 'Wikipedia cites the planing in Debussy’s “Feuilles mortes” as an example of which kind?'),
        [t('调内平行', '音階内の平行', 'Diatonic planing'), t('等距平行', '実平行', 'Real planing'), t('三全音替代', '裏コード', 'Tritone substitution'), t('十二音技法', '十二音技法', 'Twelve-tone technique')],
        t('“Feuilles mortes”是调内平行的例子；拉威尔《库普兰之墓》的小步舞曲是三和弦平行的例子。', '《枯葉》は音階内の平行、ラヴェル《クープランの墓》のメヌエットは三和音の平行の例です。', '“Feuilles mortes” illustrates diatonic planing; the Menuet of Ravel’s Le Tombeau de Couperin illustrates triadic planing.')),
    ],
    [
      C(['rubin-nonfunctional'], t('把一个音从 A♭ 重新读成 G♯，用来连接下一个和弦。这种做法叫？', 'A♭ を G♯ と読み替えて次の和音につなぐ方法は？', 'Reading a note as G♯ instead of A♭ to connect to the next chord is called what?'),
        [t('等音（异名同音）重新解释', '異名同音の読み替え', 'Enharmonic reinterpretation'), t('平行移动', '平行移動', 'Planing'), t('持续音', '保続音', 'Pedal point'), t('逆行', '逆行', 'Retrograde')],
        t('Rubin 用这种办法说明：一个音换个写法，就能迅速把两个相距很远的调区接起来。', 'Rubin は、一音を書き換えるだけで遠い調域へすばやくつながると説明します。', 'Rubin shows that respelling one note can quickly tie together distant key regions.')),
      C(['wiki-chromatic-mediant'], t('C 大三和弦和 E♭ 小三和弦：根音相距三度、性质相反、没有共同音。这种关系叫？', 'C の長三和音と E♭ の短三和音：根音は 3 度、種類が逆、共通音なし。この関係は？', 'C major and E♭ minor: roots a third apart, opposite quality, no common tone. What is this?'),
        [t('双重半音中音', '二重半音的中音', 'A doubly chromatic mediant'), t('半音中音', '半音的中音', 'A chromatic mediant'), t('关系大小调', '平行調', 'Relative major and minor'), t('调内平行', '音階内の平行', 'Diatonic planing')],
        t('Forte 把同性质、一个共同音的叫半音中音；性质相反、没有共同音的更远，叫双重半音中音。', 'Forte は同じ種類・共通音一つを半音的中音、種類が逆で共通音なしをさらに遠い二重半音的中音とします。', 'Forte calls same-quality, one-common-tone pairs chromatic mediants; opposite quality with no common tone is the more distant doubly chromatic mediant.')),
    ],
    [
      C(['arndt-tonality'], t('下面哪一项是 Arndt 列出的、能让一个音听起来像主音的因素？', 'Arndt が挙げる、ある音を主音らしく聴かせる要因はどれ？', 'Which of these does Arndt list as a factor that makes a note sound like the tonic?'),
        [t('反复出现，并在乐句开头或结尾', '繰り返し現れ、フレーズの始めや終わりに来る', 'Repetition, and beginning or ending phrases'), t('只出现一次', '一度だけ現れる', 'Appearing only once'), t('永远用最短的时值', 'いつも最短の音価', 'Always having the shortest duration'), t('音量一定最小', '音量が必ず最小', 'Always being the softest')],
        t('Arndt 列出六类因素：重音（节奏、节拍、力度、织体、音区、结构上的强调）、重复、级进（尤其半音）进入、作为音程或和弦的根音、属于自然音 / 五声 / acoustic 音阶，以及和声功能。', 'Arndt は六つの要因を挙げます：アクセント（リズム・拍・強弱・テクスチュア・音域・構造上の強調）、反復、順次（特に半音）での接近、音程や和音の根音であること、全音階・五音・アコースティック音階に属すること、和声機能。', 'Arndt lists six factors: accent (rhythmic, metric, dynamic, textural, registral, structural), repetition, stepwise approach (especially by half step), being a root, membership in a diatonic, pentatonic or acoustic scale, and harmonic function.')),
      C(['arndt-tonality'], t('Arndt 把“回避和声功能、但仍有主音感”的调性叫？', 'Arndt は「和声機能を避けつつ主音感がある」調性を何と呼ぶ？', 'What does Arndt call a sense of tonic that avoids harmonic function?'),
        [t('非功能调性', '非機能調性', 'Nonfunctional tonality'), t('功能调性', '機能調性', 'Functional tonality'), t('悬置的调性（无调性）', '宙づりの調性（無調）', 'Suspended tonality (atonality)'), t('浮动的调性', '揺れ動く調性', 'Fluctuating tonality')],
        t('功能调性靠主—下属—属的功能；非功能调性回避功能但仍有中心，常用自然音、五声或 acoustic 音阶；功能几乎不起作用时，Arndt 更愿意说“音高中心性”。', '機能調性は機能に頼り、非機能調性は機能を避けても中心を持ち、全音階・五音・アコースティック音階をよく使います。機能がほぼ働かないときは「ピッチ中心性」と呼ぶ方が適切だとします。', 'Functional tonality relies on function; nonfunctional tonality avoids it yet keeps a centre, often with diatonic, pentatonic or acoustic scales. Where function hardly matters Arndt prefers “pitch centricity”.')),
    ],
  ],
};

// ---------------- 多调性 ----------------
const PT_REF = ['arndt-tonality', 'wiki-polytonality', 'wiki-petrushka-chord', 'wiki-octatonic'];
const PT_STEPS = [
  t('双调性是同时感觉到两个不同的主音；两个以上统称多调性，但实际上超过两个就很难做到。两个中心通常放在不同的音区，用不同的音阶。', '複調は二つの異なる主音を同時に感じることです。それ以上をまとめて多調と呼びますが、実際には二つを超えるのはとても難しいです。二つの中心は普通、別の音域と別の音階に置かれます。', 'Bitonality is the sense of two different tonics at once; more than two is polytonality, though in practice beyond two is very hard to achieve. The centres usually sit in different registers and scales.'),
  t('两个和弦叠在一起叫复合和弦（polychord），它不一定是双调性：双调性还要靠重音、重复和各层的旋律来建立各自的中心。爵士里的九、十一、十三和弦也常能拆成两个和弦，却没有“两个调”的意思。', '二つの和音を重ねたものをポリコードと呼びますが、複調とは限りません。複調にはアクセント・反復・各層の旋律が各中心を支える必要があります。ジャズの 9・11・13 の和音も二つの和音に分けられますが、「二つの調」の意味はありません。', 'Two stacked chords form a polychord, which is not necessarily bitonality: bitonality also needs accents, repetition and melody establishing each centre. Jazz ninth, eleventh and thirteenth chords often split into two chords without implying two keys.'),
  t('同一个主音、不同的音阶不是双调性。普朗克《三首永动曲》第一首能听出两种音阶，但它们共用 B♭ 为主音，更合适的说法是复调式（polymodal）。大小调材料混用、主音不变，也不算双调性。', '同じ主音で音階が違うのは複調ではありません。プーランク《三つの無窮動》第 1 曲は二つの音階が聴こえますが主音 B♭ を共有するので、複旋法（polymodal）と呼ぶ方が適切です。主音が同じまま長短の素材を混ぜるのも複調ではありません。', 'Different scales on one tonic are not bitonality. Poulenc’s Trois mouvements perpétuels No. 1 has two recognisable scales sharing the tonic B♭, so it is better called polymodal. Mixing major and minor material over one tonic is not bitonality either.'),
  t('斯特拉文斯基《春之祭》（1913）被普遍认为让双调性流行起来；受他影响的有法国“六人团”（尤其米约）和美国的科普兰。米约《巴西的回忆》（1920）里有一例：右手在 B 大调，左手在 G 大调。', 'ストラヴィンスキー《春の祭典》（1913）が複調を広めたと広く考えられています。影響を受けたのはフランス六人組（特にミヨー）とアメリカのコープランドです。ミヨー《ブラジルの郷愁》（1920）には右手が B 長調、左手が G 長調の例があります。', 'Stravinsky’s Rite of Spring (1913) is widely credited with popularising bitonality; influenced composers include Les Six (especially Milhaud) and Copland. One passage of Milhaud’s Saudades do Brasil (1920) has the right hand in B major and the left in G major.'),
  t('彼得鲁什卡和弦：斯特拉文斯基 1911 年的芭蕾《彼得鲁什卡》里，C 大三和弦与 F♯ 大三和弦同时发声，两个大三和弦相距三全音。更早，李斯特和拉威尔《水的嬉戏》（1901）里也出现过相距三全音的两个大三和弦。', 'ペトルーシュカ和音：ストラヴィンスキー 1911 年のバレエ《ペトルーシュカ》で、C と F♯ の長三和音が同時に鳴ります。三全音離れた二つの長三和音です。それ以前にリストやラヴェル《水の戯れ》（1901）にも同様の例があります。', 'The Petrushka chord: in Stravinsky’s 1911 ballet Petrushka, C major and F♯ major triads sound together — two major triads a tritone apart. Earlier, Liszt and Ravel’s Jeux d’eau (1901) also used such a pair.'),
  t('多调性在理论上有争议：巴比特称它是“自相矛盾的说法”；van den Toorn 指出《彼得鲁什卡》那段只用一个八声音集里的音，用八声音集解释那种“对立”。Tymoczko 则认为调性是心理概念，两个调区至少在初步层面可以同时被听到。', '多調には理論上の論争があります。バビットは「自己矛盾した表現」と呼び、ファン・デン・トールンは《ペトルーシュカ》の箇所が一つの八音音階の音だけでできていることを示し、その「対立」を八音音階で説明しました。ティモツコは調性を心理的な概念とみなし、二つの調域は少なくとも初歩的には同時に聴こえると主張します。', 'Polytonality is debated: Babbitt called it a “self-contradictory expression”; van den Toorn showed the Petrushka passage uses only one octatonic collection and explained its “opposition” octatonically. Tymoczko argues tonality is psychological, and two key areas can at least rudimentarily be heard at once.'),
];
const PT = {
  guide: guide(PT_REF, t('背景与概念：复合和弦、彼得鲁什卡和弦与争议', '背景と概念：ポリコード・ペトルーシュカ和音・論争', 'Background: polychords, the Petrushka chord and the debate'), PT_STEPS),
  main: [
    C(['arndt-tonality'], t('双调性指什么？', '複調とは？', 'What is bitonality?'),
      [t('同时感觉到两个不同的主音', '二つの異なる主音を同時に感じること', 'The sense of two different tonics at once'), t('先用一个调，再转到另一个调', 'ある調から別の調へ移ること', 'Using one key, then moving to another'), t('同一主音的大调和小调交替', '同じ主音の長調と短調の交替', 'Alternating major and minor on one tonic'), t('两件乐器演奏同一个调', '二つの楽器が同じ調で演奏すること', 'Two instruments playing in the same key')],
      t('关键是“同时”和“两个主音”。先后换调是转调；同主音的大小调混用是调式混合。', '鍵は「同時」と「二つの主音」。順に替わるのは転調、同主音の長短の混用は旋法混合です。', 'The key words are “at once” and “two tonics”. Successive keys are modulation; mixing major and minor on one tonic is mixture.')),
    C(['wiki-petrushka-chord'], t('斯特拉文斯基《彼得鲁什卡》里的“彼得鲁什卡和弦”由哪两个三和弦同时发声？', 'ストラヴィンスキー《ペトルーシュカ》の「ペトルーシュカ和音」はどの二つの三和音の同時発音？', 'Which two triads sound together in Stravinsky’s “Petrushka chord”?'),
      [t('C 大三和弦与 F♯ 大三和弦', 'C と F♯ の長三和音', 'C major and F♯ major'), t('C 大三和弦与 G 大三和弦', 'C と G の長三和音', 'C major and G major'), t('C 大三和弦与 C 小三和弦', 'C の長三和音と短三和音', 'C major and C minor'), t('C 大三和弦与 E 大三和弦', 'C と E の長三和音', 'C major and E major')],
      t('两个大三和弦相距三全音，同时发声时冲突得很厉害；六个音合起来正好属于一个八声音集。', '三全音離れた二つの長三和音で、同時に鳴ると強くぶつかります。六音を合わせると一つの八音音階に収まります。', 'Two major triads a tritone apart clash strongly; together their six notes lie in one octatonic collection.')),
    C(['arndt-tonality', 'wiki-polytonality'], t('只把两个和弦叠在一起（复合和弦），足以证明双调性吗？', '二つの和音を重ねただけ（ポリコード）で、複調の証明になる？', 'Does stacking two chords (a polychord) prove bitonality?'),
      [t('不够：还要有重音、重复和各层旋律支持各自的中心', '不十分：アクセント・反復・各層の旋律が各中心を支える必要がある', 'No: accents, repetition and each layer’s melody must support separate centres'), t('足够：两个和弦就是两个调', '十分：和音二つは調二つ', 'Yes: two chords mean two keys'), t('足够，只要两个和弦根音不同', '根音が違えば十分', 'Yes, as long as the roots differ'), t('只有在小调里才足够', '短調でだけ十分', 'Only in minor keys')],
      t('复合和弦不一定意味着多调性；爵士常用的延伸和弦就能拆成两个和弦，却没有“两个调”的意思。', 'ポリコードは多調を意味するとは限りません。ジャズの拡張和音も二つに分けられますが「二つの調」ではありません。', 'Polychords do not necessarily imply polytonality; jazz extended chords split into two chords without meaning two keys.')),
    C(['wiki-polytonality'], t('哪部作品被普遍认为让双调性流行起来？', '複調を広めたと広く考えられている作品は？', 'Which work is widely credited with popularising bitonality?'),
      [t('斯特拉文斯基《春之祭》（1913）', 'ストラヴィンスキー《春の祭典》（1913）', 'Stravinsky, The Rite of Spring (1913)'), t('莫扎特《音乐玩笑》', 'モーツァルト《音楽の冗談》', 'Mozart, A Musical Joke'), t('巴赫《键盘练习曲集》第三卷的二重奏', 'バッハ《クラヴィーア練習曲集》第 3 部の二重奏', 'Bach, a duetto from Clavier-Übung III'), t('德彪西《沉没的教堂》', 'ドビュッシー《沈める寺》', 'Debussy, “La cathédrale engloutie”')],
      t('莫扎特和巴赫的例子被看作更早的零星用法；Casella 在 1924 年就把《春之祭》称为第一部完整呈现多调性的作品。', 'モーツァルトとバッハの例はそれ以前の散発的な使用とされ、カゼッラは 1924 年に《春の祭典》を多調を完全に示した最初の作品と呼びました。', 'Mozart’s and Bach’s are earlier isolated uses; Casella in 1924 called the Rite the first work presenting polytonality in typical completeness.')),
    M(['arndt-tonality', 'wiki-polytonality'], t('名称 ↔ 意思', '名称 ↔ 意味', 'Term ↔ meaning'), [
      [t('双调性', '複調', 'Bitonality'), t('同时有两个中心', '同時に二つの中心', 'Two centres at once')],
      [t('复合和弦', 'ポリコード', 'Polychord'), t('两个熟悉的和弦叠置', '見慣れた二つの和音の重ね合わせ', 'Two familiar chords superimposed')],
      [t('复调式', '複旋法', 'Polymodality'), t('同一主音、不同音阶', '同じ主音で違う音階', 'One tonic, different scales')],
      [t('转调', '転調', 'Modulation'), t('先后换到另一个中心', '順に別の中心へ移る', 'Moving to another centre in succession')],
    ], t('分清“同时还是先后”“两个主音还是一个主音”“只是叠了和弦还是建立了中心”。', '「同時か順番か」「主音は二つか一つか」「和音を重ねただけか中心を立てたか」を区別します。', 'Distinguish simultaneous vs successive, two tonics vs one, and stacked chords vs established centres.')),
  ],
  branches: [
    [
      C(['arndt-tonality'], t('双调性里，两个中心通常怎样安排？', '複調では二つの中心をふつうどう配置する？', 'In bitonality, how are the two centres usually arranged?'),
        [t('放在不同音区，用不同音阶', '別の音域に置き、別の音階を使う', 'In different registers, with different scales'), t('放在同一个音区，用同一个音阶', '同じ音域で同じ音階', 'In the same register and scale'), t('只用打击乐区分', '打楽器だけで区別', 'Distinguished only by percussion'), t('一个中心不发声', '一つの中心は鳴らさない', 'One centre stays silent')],
        t('Arndt 指出不同的主音一般有不同的音区和音阶，这让两层更容易分开听。', 'Arndt によれば異なる主音は普通、別の音域と音階を持ち、二層を聴き分けやすくします。', 'Arndt notes different tonics generally occupy different registers and scales, making the layers easier to separate.')),
      C(['arndt-tonality'], t('为什么说“多于两个调”的多调性在实际中很少？', 'なぜ「三つ以上の調」の多調は実際には少ない？', 'Why is polytonality with more than two keys rare in practice?'),
        [t('同时建立两个以上的主音感非常困难', '三つ以上の主音感を同時に立てるのは非常に難しいから', 'Establishing more than two tonics at once is extremely difficult'), t('因为乐器不够', '楽器が足りないから', 'Because there are not enough instruments'), t('因为十二平均律只允许两个调', '十二平均律は調を二つしか許さないから', 'Because equal temperament allows only two keys'), t('因为规则禁止', '規則で禁止されているから', 'Because rules forbid it')],
        t('Arndt 说双调性属于更大的多调性范畴，但实际上要做出超过两个的调性感极其困难。', 'Arndt は、複調は多調の一部だが、実際には二つを超える調性感を作るのは極めて難しいと述べます。', 'Arndt notes bitonality belongs to polytonality, but practically producing more than two is extremely difficult.')),
    ],
    [
      C(['wiki-polytonality'], t('爵士里的十三和弦可以拆成两个三和弦。为什么通常不叫双调性？', 'ジャズの 13 の和音は二つの三和音に分けられる。なぜ普通、複調と呼ばない？', 'A jazz thirteenth chord can split into two triads. Why is it not usually called bitonality?'),
        [t('复合和弦不一定意味着多个调；这里没有两个中心', 'ポリコードは複数の調を意味するとは限らず、ここに中心は二つない', 'A polychord need not imply several keys; there are not two centres here'), t('因为爵士不用三和弦', 'ジャズは三和音を使わないから', 'Because jazz never uses triads'), t('因为十三和弦只有三个音', '13 の和音は三音しかないから', 'Because a thirteenth chord has only three notes'), t('因为它总在小调里', 'いつも短調だから', 'Because it is always in minor')],
        t('维基百科指出：延伸和弦与复合和弦在爵士里很常见，并不表示“多个调”。', 'Wikipedia によれば、拡張和音やポリコードはジャズで普通に使われ、「複数の調」を示すものではありません。', 'Wikipedia notes extended and polychordal harmonies are the norm in jazz without suggesting multiple keys.')),
      C(['wiki-petrushka-chord', 'wiki-octatonic'], t('彼得鲁什卡和弦（C 大三 + F♯ 大三）的六个音合起来，属于哪种音集？', 'ペトルーシュカ和音（C + F♯）の六音を合わせると、どの音集合に入る？', 'Together, the six notes of the Petrushka chord (C + F♯ major) belong to which collection?'),
        [t('一个八声（减）音集', '一つの八音（減）音階', 'One octatonic (diminished) collection'), t('C 大调音阶', 'C 長音階', 'The C major scale'), t('全音音阶', '全音音階', 'The whole-tone scale'), t('五声音阶', '五音音階', 'The pentatonic scale')],
        t('C E G 与 F♯ A♯ C♯ 都在 C–C♯–D♯–E–F♯–G–A–A♯ 这个八声音集里，这正是 van den Toorn 的八声音集解释。', 'C E G と F♯ A♯ C♯ はどちらも C–C♯–D♯–E–F♯–G–A–A♯ の八音音階に入ります。ファン・デン・トールンの説明の根拠です。', 'C E G and F♯ A♯ C♯ both lie in C–C♯–D♯–E–F♯–G–A–A♯, the basis of van den Toorn’s octatonic account.')),
    ],
    [
      C(['wiki-polytonality'], t('米约《巴西的回忆》（1920）里被引用的一例，右手和左手分别在什么调？', 'ミヨー《ブラジルの郷愁》（1920）でよく引かれる例では、右手と左手はそれぞれ何調？', 'In the often-cited passage from Milhaud’s Saudades do Brasil (1920), what keys are the right and left hands in?'),
        [t('右手 B 大调，左手 G 大调', '右手 B 長調、左手 G 長調', 'Right hand B major, left hand G major'), t('两手都在 C 大调', '両手とも C 長調', 'Both hands in C major'), t('右手 C 小调，左手 C 大调', '右手 C 短調、左手 C 長調', 'Right hand C minor, left hand C major'), t('右手 F♯ 大调，左手 C 大调', '右手 F♯ 長調、左手 C 長調', 'Right hand F♯ major, left hand C major')],
        t('维基百科也注明另一种读法：两手合起来可看成扩展的 G 大调。同一段音乐可以有不同解释。', 'Wikipedia は、両手合わせて拡張された G 長調と見る読み方も併記しています。', 'Wikipedia also notes the alternative reading of both hands together as extended G major.')),
      C(['arndt-tonality'], t('两层的音区和节奏分得很开，是否就一定是多调性？', '二層の音域とリズムがはっきり分かれていれば、必ず多調？', 'If two layers are clearly separated by register and rhythm, is it necessarily polytonality?'),
        [t('不一定：还要看各层是否维持不同的中心', '限らない：各層が別の中心を保つかを見る必要がある', 'Not necessarily: check whether each layer keeps a different centre'), t('一定是', '必ずそう', 'Always'), t('只要有两个声部就是', '声部が二つあればそう', 'Any two voices make it so'), t('只要节奏不同就是', 'リズムが違えばそう', 'Different rhythms make it so')],
        t('音区和节奏帮助分辨声部；双调性的判断还需要中心的证据。', '音域とリズムは声部の聴き分けを助けますが、複調の判断には中心の証拠が要ります。', 'Register and rhythm help separate voices; bitonality also needs evidence of centres.')),
    ],
    [
      C(['wiki-polytonality'], t('普朗克《三首永动曲》第一首能听出两种音阶，却共用 B♭ 为主音。更合适的说法是？', 'プーランク《三つの無窮動》第 1 曲は二つの音階が聴こえるが主音 B♭ を共有する。より適切なのは？', 'Poulenc’s Trois mouvements perpétuels No. 1 has two scales sharing the tonic B♭. What is the better description?'),
        [t('复调式（polymodal）', '複旋法（polymodal）', 'Polymodal'), t('双调性', '複調', 'Bitonal'), t('无调性', '無調', 'Atonal'), t('十二音', '十二音', 'Twelve-tone')],
        t('两种音阶靠共同的主音融合在一起，所以容易被误认为多调性，其实是复调式。', '二つの音階が共通の主音で溶け合うので多調と誤解されやすいですが、実際は複旋法です。', 'The two scales merge through the shared tonic, so it is easily mistaken for polytonality but is polymodal.')),
      C(['wiki-polytonality'], t('巴比特为什么质疑“多调性”这个概念？', 'バビットはなぜ「多調」という概念を疑った？', 'Why did Babbitt question the notion of polytonality?'),
        [t('他认为“同时两个调”是自相矛盾的说法，只能当作和声单位扩展程度的标签', '「同時に二つの調」は自己矛盾で、和声単位の拡張の程度を示すラベルにしかならないと考えたから', 'He called it self-contradictory, usable only as a label for a degree of expansion of a harmonic unit'), t('他认为多调性只适用于爵士', '多調はジャズにしか当てはまらないと考えたから', 'He thought it applied only to jazz'), t('他认为八声音集不存在', '八音音階は存在しないと考えたから', 'He thought the octatonic scale did not exist'), t('他从没听过斯特拉文斯基', 'ストラヴィンスキーを聴いたことがなかったから', 'He had never heard Stravinsky')],
        t('支持多调性可以被感知的一方以 Tymoczko 为代表；反对或质疑的还有 Hindemith、Forte、Boretz。', '多調は知覚できるとする側の代表はティモツコ。疑問を呈したのはほかにヒンデミット、フォート、ボレッツ。', 'Tymoczko represents those who think it perceivable; Hindemith, Forte and Boretz also questioned it.')),
    ],
  ],
};

// ---------------- 无调性 ----------------
const AT_REF = ['wiki-atonality', 'arndt-tonality', 'omt2e-normal-order'];
const AT_STEPS = [
  t('无调性在最广的意义上指没有调性中心的音乐：不围绕一个中心三和弦建立和声等级，半音阶里的各个音彼此独立地使用。', '無調とは最も広い意味で調性の中心をもたない音楽です。中心の三和音を軸にした和声の序列を使わず、半音階の各音を互いに独立して使います。', 'In its broadest sense atonality is music without a tonal centre: no hierarchy of harmonies around one central triad, with the chromatic notes functioning independently.'),
  t('“无调性”这个词由 Joseph Marx 在 1907 年的调性研究里提出。没有调性中心的音乐更早就有，例如李斯特 1885 年的《无调性小品》。', '「無調」という語は 1907 年に Joseph Marx が調性研究の中で作りました。中心のない音楽はそれ以前にもあり、リストの《無調のバガテル》（1885）がその例です。', 'The term “atonality” was coined in 1907 by Joseph Marx in a study of tonality. Music without a tonal centre existed earlier, such as Liszt’s Bagatelle sans tonalité (1885).'),
  t('勋伯格和第二维也纳乐派经历了两个阶段：先是“自由无调性”，有意回避传统的自然音和声（如勋伯格《月迷彼埃罗》1912、贝尔格《沃采克》1917–1922）；一战后再发展出系统的十二音技法。', 'シェーンベルクと新ウィーン楽派は二段階を経ました。まず伝統的な全音階和声を意図的に避ける「自由無調」（シェーンベルク《月に憑かれたピエロ》1912、ベルク《ヴォツェック》1917–1922）、第一次大戦後に体系的な十二音技法です。', 'Schoenberg and the Second Viennese School went through two phases: first “free atonality”, deliberately avoiding diatonic harmony (Schoenberg’s Pierrot lunaire, 1912; Berg’s Wozzeck, 1917–1922); after World War I, the systematic twelve-tone technique.'),
  t('自由无调性虽然“自由”，常用一个很小的音程“细胞”统一作品：细胞可以扩展，也能像音列那样变形；个别音还能当作枢纽，让几个细胞重叠出现。', '自由無調は「自由」でも、小さな音程の「細胞」で作品をまとめることが多いです。細胞は拡張され、音列のように変形され、一部の音が軸となって細胞が重なって現れます。', 'Free atonality, though free, often unifies a work with a minute intervallic cell, which may be expanded or transformed like a row; single notes can act as pivots for overlapping statements of the cell.'),
  t('Kostka 与 Payne 归纳了勋伯格无调性音乐的四个做法：避免旋律或和声上的八度；避免大小三和弦等传统音集；避免连续超过三个音来自同一个自然音阶；多用跳进、少用级进的旋律。', 'コストカとペインは、シェーンベルクの無調音楽の四つの手法をまとめました：旋律・和声のオクターヴを避ける、長短三和音などの伝統的な音集合を避ける、同じ全音階から 4 音以上続けない、順次より跳躍の多い旋律を使う。', 'Kostka and Payne list four procedures in Schoenberg’s atonal music: avoid melodic or harmonic octaves; avoid traditional collections such as major or minor triads; avoid more than three successive pitches from one diatonic scale; use disjunct melodies.'),
  t('这个名称本身有争议。勋伯格强烈反对，说把音的关系叫“无调性”，就像把颜色关系叫“无光谱”一样牵强；巴比特也认为这个词说不通。Arndt 指出它起初带贬义，有人更愿意说“悬置的调性”。', 'この名称には論争があります。シェーンベルクは強く反対し、音の関係を「無調」と呼ぶのは色の関係を「無スペクトル」と呼ぶほど無理があると述べ、バビットもこの語は意味をなさないとしました。Arndt は、元は軽蔑語だったため「宙づりの調性」と言う人もいると指摘します。', 'The term itself is disputed. Schoenberg strongly objected that calling a relation of tones atonal is as far-fetched as calling a relation of colours “aspectral”; Babbitt also found it senseless. Arndt notes it began as a derogatory label, and some prefer “suspended tonality”.'),
];
const AT = {
  guide: guide(AT_REF, t('背景与概念：自由无调性、细胞与四个做法', '背景と概念：自由無調・細胞・四つの手法', 'Background: free atonality, cells and four procedures'), AT_STEPS),
  main: [
    C(['wiki-atonality'], t('“无调性”（atonality）这个词是谁在哪一年提出的？', '「無調」（atonality）という語を作ったのは誰で、何年？', 'Who coined the term “atonality”, and when?'),
      [t('Joseph Marx，1907 年', 'Joseph Marx、1907 年', 'Joseph Marx, 1907'), t('勋伯格，1923 年', 'シェーンベルク、1923 年', 'Schoenberg, 1923'), t('巴比特，1949 年', 'バビット、1949 年', 'Babbitt, 1949'), t('李斯特，1885 年', 'リスト、1885 年', 'Liszt, 1885')],
      t('Joseph Marx 在 1907 年的调性研究里提出这个词；李斯特 1885 年写的是《无调性小品》，比这个词更早。', 'Joseph Marx が 1907 年の調性研究で作りました。リストの《無調のバガテル》（1885）は語より早い作品です。', 'Joseph Marx coined it in a 1907 study; Liszt’s Bagatelle sans tonalité (1885) predates the term.')),
    C(['wiki-atonality'], t('勋伯格与第二维也纳乐派经历的两个阶段，依次是？', 'シェーンベルクと新ウィーン楽派の二つの段階は、順に？', 'In order, what were the two phases of Schoenberg and the Second Viennese School?'),
      [t('自由无调性 → 十二音技法', '自由無調 → 十二音技法', 'Free atonality → twelve-tone technique'), t('十二音技法 → 自由无调性', '十二音技法 → 自由無調', 'Twelve-tone → free atonality'), t('频谱音乐 → 自由无调性', 'スペクトル音楽 → 自由無調', 'Spectral music → free atonality'), t('印象派 → 十二音技法', '印象派 → 十二音技法', 'Impressionism → twelve-tone')],
      t('先是 1908 年起的自由无调性（如《月迷彼埃罗》），一战后才发展出系统的十二音技法。', 'まず 1908 年からの自由無調（《月に憑かれたピエロ》など）、第一次大戦後に体系的な十二音技法です。', 'Free atonality came first from 1908 (e.g. Pierrot lunaire); the systematic twelve-tone technique followed after World War I.')),
    C(['wiki-atonality'], t('下面哪一项不在 Kostka 与 Payne 归纳的勋伯格无调性四个做法里？', 'コストカとペインがまとめたシェーンベルク無調の四つの手法に入らないのは？', 'Which is NOT one of the four procedures in Schoenberg’s atonal music listed by Kostka and Payne?'),
      [t('用大三和弦收束乐句', '長三和音でフレーズを終える', 'Ending phrases on major triads'), t('避免旋律或和声上的八度', '旋律・和声のオクターヴを避ける', 'Avoiding melodic or harmonic octaves'), t('避免连续超过三个音来自同一个自然音阶', '同じ全音階から 4 音以上続けない', 'Avoiding more than three successive notes from one diatonic scale'), t('多用跳进的旋律', '跳躍の多い旋律', 'Using disjunct melodies')],
      t('四个做法都是“避免”传统要素：八度、大小三和弦、长串的自然音阶音，以及级进为主的旋律。', '四つの手法はいずれも伝統的要素を「避ける」もの：オクターヴ、長短三和音、全音階の長い連続、順次中心の旋律。', 'All four avoid traditional elements: octaves, major/minor triads, long diatonic runs and conjunct melodies.')),
    C(['wiki-atonality', 'arndt-tonality'], t('勋伯格怎样看待“无调性”这个名称？', 'シェーンベルクは「無調」という名称をどう見た？', 'How did Schoenberg regard the term “atonality”?'),
      [t('反对：音之间总有关系，就像颜色关系不能叫“无光谱”', '反対した：音には常に関係がある。色の関係を「無スペクトル」と呼べないのと同じ', 'He objected: tones always relate, just as colour relations cannot be called “aspectral”'), t('很喜欢，是他自己起的名字', '気に入っていた。自分で付けた名前だった', 'He liked it; he coined it himself'), t('只同意用于十二音作品', '十二音作品にだけ使うことに同意した', 'He accepted it only for twelve-tone works'), t('从没表达过意见', '意見を述べたことはない', 'He never expressed a view')],
      t('勋伯格与巴比特都批评这个词；Arndt 也提到它起初是贬义的标签。', 'シェーンベルクもバビットもこの語を批判し、Arndt も元は軽蔑的なラベルだったと述べます。', 'Schoenberg and Babbitt both criticised the term; Arndt notes it began as a pejorative label.')),
  ],
  branches: [
    [
      C(['wiki-atonality'], t('自由无调性作品常用什么来统一全曲？', '自由無調の作品は何で全体をまとめることが多い？', 'What often unifies a freely atonal work?'),
        [t('一个小的音程“细胞”及其变形', '小さな音程の「細胞」とその変形', 'A small intervallic cell and its transformations'), t('属七到主的终止', '属七から主への終止', 'Dominant-seventh cadences'), t('固定的调号', '固定した調号', 'A fixed key signature'), t('十二小节布鲁斯', '12 小節ブルース', 'A twelve-bar blues')],
        t('细胞可以作为和弦或旋律出现，按固定顺序时还能像音列那样做移位、倒影等变形。', '細胞は和音や旋律として現れ、順序が固定されていれば音列のように移高・反転できます。', 'A cell can appear as chord or melody; with fixed order it can be transposed or inverted like a row.')),
      C(['wiki-atonality'], t('按 Kostka 与 Payne 的归纳，勋伯格无调性的旋律更偏向？', 'コストカとペインのまとめでは、シェーンベルク無調の旋律はどちら寄り？', 'According to Kostka and Payne, Schoenberg’s atonal melodies tend toward what?'),
        [t('跳进（不连贯）的旋律', '跳躍の多い（非連続的な）旋律', 'Disjunct (leaping) melodies'), t('全部级进', 'すべて順次進行', 'All stepwise motion'), t('只用一个音反复', '一音の反復だけ', 'One repeated note'), t('只用五声音阶', '五音音階だけ', 'Pentatonic only')],
        t('四个做法之一是用不连贯的旋律，也就是回避以级进为主的旋律。', '四つの手法の一つは非連続的な旋律、つまり順次中心の旋律を避けることです。', 'One of the four procedures is disjunct melody — avoiding mainly stepwise lines.')),
    ],
    [
      C(['omt2e-normal-order'], t('一个动机整体移位以后，什么保持不变？', '動機を全体で移高すると、何が変わらない？', 'After transposing a whole motif, what stays the same?'),
        [t('相邻音之间的有向距离', '隣り合う音の有向距離', 'The directed distances between adjacent notes'), t('音名', '音名', 'The note names'), t('起音', '最初の音', 'The starting note'), t('最低音', '最低音', 'The lowest note')],
        t('移位让每个音移动同样的距离，所以相邻音的距离和集合类都不变。', '移高は各音を同じだけ動かすので、隣接音の距離もセット・クラスも変わりません。', 'Transposition moves every note equally, so adjacent distances and set class are preserved.')),
      C(['omt2e-normal-order'], t('音级集合 {0, 1, 4} 做 T2，得到？', '音級集合 {0, 1, 4} を T2 すると？', 'What is T2 of the pitch-class set {0, 1, 4}?'),
        [t('{2, 3, 6}', '{2, 3, 6}', '{2, 3, 6}'), t('{2, 3, 5}', '{2, 3, 5}', '{2, 3, 5}'), t('{0, 11, 8}', '{0, 11, 8}', '{0, 11, 8}'), t('{1, 2, 4}', '{1, 2, 4}', '{1, 2, 4}')],
        t('每个音级加 2（mod 12）：0→2、1→3、4→6。{0, 11, 8} 是 I0 倒影。', '各音級に 2 を足す（mod 12）：0→2、1→3、4→6。{0, 11, 8} は I0 の反転です。', 'Add 2 to each (mod 12): 0→2, 1→3, 4→6. {0, 11, 8} is the I0 inversion.')),
    ],
    [
      C(['omt2e-normal-order'], t('{0, 1, 4} 用 I0 倒影，得到哪组音级？', '{0, 1, 4} を I0 で反転すると？', 'What is I0 of {0, 1, 4}?'),
        [t('{0, 11, 8}', '{0, 11, 8}', '{0, 11, 8}'), t('{0, 1, 4}', '{0, 1, 4}', '{0, 1, 4}'), t('{2, 3, 6}', '{2, 3, 6}', '{2, 3, 6}'), t('{4, 1, 0}', '{4, 1, 0}', '{4, 1, 0}')],
        t('I0：每个音级 x 变成 0 − x（mod 12）：0→0、1→11、4→8。{4, 1, 0} 只是倒着写同一组音。', 'I0：各音級 x を 0 − x（mod 12）に：0→0、1→11、4→8。{4, 1, 0} は同じ音を逆に書いただけ。', 'I0 maps x to 0 − x (mod 12): 0→0, 1→11, 4→8. {4, 1, 0} merely lists the same set backwards.')),
      C(['wiki-atonality'], t('逆行（R）改变的是动机的什么？', '逆行（R）が変えるのは動機の何？', 'What does retrograde (R) change in a motif?'),
        [t('音的先后顺序', '音の順序', 'The order of the notes'), t('每个音的高度', '各音の高さ', 'Each note’s pitch'), t('用到的音级', '使う音級', 'The pitch classes used'), t('拍号', '拍子記号', 'The time signature')],
        t('逆行只把顺序倒过来，用到的音不变；倒影才改变每一步的方向。', '逆行は順序を逆にするだけで音は同じ。各一歩の方向を変えるのは反転です。', 'Retrograde only reverses order; inversion is what flips each step’s direction.')),
    ],
    [
      C(['wiki-atonality'], t('即使在一首“无调性”作品里，中心感还可能从哪里出现？', '「無調」の作品でも、中心感はどこから生まれうる？', 'Even in an “atonal” work, where can a sense of centre still arise?'),
        [t('对某个音的反复、配器、音区、时值延长或节拍重音', 'ある音の反復・楽器法・音域・音の延長・拍のアクセント', 'Repetition of a pitch, instrumentation, register, rhythmic elongation or metric accent'), t('只能来自属七和弦', '属七の和音からだけ', 'Only from dominant sevenths'), t('无调性里不可能出现', '無調では起こりえない', 'It is impossible in atonal music'), t('只来自调号', '調号からだけ', 'Only from a key signature')],
        t('维基百科称之为“靠强调建立的调性”：在主题或线条层面仍可能听到中心。', 'Wikipedia はこれを「主張による調性」と呼び、主題や線のレベルで中心が聴こえることがあるとします。', 'Wikipedia calls this tonality “by assertion”, heard on the thematic or linear level.')),
      C(['wiki-atonality'], t('Grout 怎样描述“无调性音乐”？', 'Grout は「無調音楽」をどう述べた？', 'How did Grout describe “atonal music”?'),
        [t('使用这个词的人听不出调性中心的音乐', 'この語を使う人が調性の中心を聴き取れない音楽', 'Music in which the person using the word cannot hear tonal centres'), t('不使用任何音的音乐', '音を使わない音楽', 'Music using no tones'), t('只用十二音列写的音乐', '十二音列だけで書かれた音楽', 'Music written only with twelve-tone rows'), t('只用打击乐的音乐', '打楽器だけの音楽', 'Music for percussion only')],
        t('Grout 怀疑无调性是否真的可能，把它当作一个主观的类别。', 'Grout は無調が本当に可能か疑い、主観的なカテゴリーとしました。', 'Grout doubted atonality is truly possible and treated it as a subjective category.')),
    ],
  ],
};

// ---------------- 频谱和声 ----------------
const SP_REF = ['wiki-spectral-music', 'ircam-spectral'];
const SP_STEPS = [
  t('频谱音乐以声音的声学性质——声音的频谱——作为作曲的基础；作曲决定常参考声谱图和对频谱的数学分析，或用数学方法生成的频谱。', 'スペクトル音楽は音の音響的性質——音のスペクトル——を作曲の基礎にします。作曲上の判断は、ソノグラムやスペクトルの数学的分析、数学的に生成したスペクトルに基づくことが多いです。', 'Spectral music uses the acoustic properties of sound — its spectrum — as a basis for composition, often guided by sonograms and mathematical analysis of spectra, or by mathematically generated spectra.'),
  t('它在 1970 年代初起源于法国，主要在巴黎 IRCAM 和 l’Itinéraire 乐团发展，代表作曲家是格里塞（Grisey）和米哈伊（Murail）；“频谱音乐”这个名称通常认为是 Dufourt 在 1979 年提出的。Murail 说它与其说是风格，不如说是一种美学态度。', '1970 年代初めにフランスで生まれ、主にパリの IRCAM とイティネレール・アンサンブルで発展しました。代表はグリゼーとミュライユ。「スペクトル音楽」の名はデュフールが 1979 年に唱えたとされます。ミュライユは様式ではなく美学的な態度だと述べています。', 'It originated in France in the early 1970s, developed mainly at IRCAM and with Ensemble l’Itinéraire, by composers such as Grisey and Murail; Dufourt is credited with the term musique spectrale (1979). Murail described it as an aesthetic attitude rather than a style.'),
  t('音高和音程常取自泛音列，所以会用到微分音。格里塞把频谱里不在平均律上的音高近似到最近的四分之一音或六分之一音，再交给乐器演奏。', '音高と音程はしばしば倍音列から取られるため、微分音を使います。グリゼーはスペクトル中の平均律にない音高を最も近い四分音か六分音に近似して楽器に演奏させました。', 'Pitches and intervals often derive from the harmonic series, so microtones appear. Grisey approximated non-tempered pitches to the nearest quarter- or sixth-tone for instruments.'),
  t('“器乐加法合成”：让每件乐器演奏声音里的一个分音，用一组乐器重新合成出一个音响。', '「器楽的加算合成」：各楽器が音の一つの部分音を演奏し、楽器群で一つの響きを合成し直します。', '“Additive instrumental synthesis” assigns each instrument one partial of a sound, rebuilding the sound with the ensemble.'),
  t('频谱不一定是谐波：钟的频谱是非谐的，分音不是基频的整数倍。调幅、调频、差音、谐波融合等心理声学现象也被当作作曲材料。', 'スペクトルは調和的とは限りません。鐘のスペクトルは非調和で、部分音は基音の整数倍ではありません。振幅変調・周波数変調・差音・倍音の融合などの心理音響現象も素材になります。', 'Spectra need not be harmonic: a bell’s spectrum is inharmonic, its partials not whole-number multiples. Amplitude and frequency modulation, difference tones, harmonic fusion and other psychoacoustic phenomena become material.'),
  t('形式上重视“过程”和时间的伸展，常用插值让材料平滑地从一种状态过渡到另一种。代表作有格里塞《声学空间》（其中的《Partiels》，1975）、Dufourt《Saturne》（1978–79）、Murail《Gondwana》（1980）。', '形式では「プロセス」と時間の引き伸ばしを重視し、補間で素材をある状態から別の状態へ滑らかに移します。代表作はグリゼー《音響空間》（中の《パルシエル》1975）、デュフール《サテュルヌ》（1978–79）、ミュライユ《ゴンドワナ》（1980）。', 'Formally it values process and the stretching of time, moving material smoothly between states by interpolation. Key works: Grisey’s Les espaces acoustiques (including Partiels, 1975), Dufourt’s Saturne (1978–79), Murail’s Gondwana (1980).'),
];
const SP = {
  guide: guide(SP_REF, t('背景与概念：起源、器乐合成与过程', '背景と概念：起源・器楽合成・プロセス', 'Background: origins, instrumental synthesis and process'), SP_STEPS),
  main: [
    C(['wiki-spectral-music'], t('频谱音乐把什么当作作曲的基础？', 'スペクトル音楽は何を作曲の基礎にする？', 'What does spectral music take as its compositional basis?'),
      [t('声音的频谱（声学性质）', '音のスペクトル（音響的性質）', 'The spectrum of sound (its acoustic properties)'), t('十二音列', '十二音列', 'A twelve-tone row'), t('功能和声', '機能和声', 'Functional harmony'), t('民歌旋律', '民謡の旋律', 'Folk melodies')],
      t('频谱音乐以声音的声学性质为基础，常参考声谱图与频谱分析来做作曲决定。', 'スペクトル音楽は音の音響的性質を基礎とし、ソノグラムやスペクトル分析を参考に作曲上の判断をします。', 'Spectral music builds on the acoustic properties of sound, guided by sonograms and spectral analysis.')),
    C(['wiki-spectral-music'], t('频谱音乐在哪里、由哪些作曲家发展起来？', 'スペクトル音楽はどこで、どの作曲家によって発展した？', 'Where, and by whom, was spectral music developed?'),
      [t('1970 年代的法国，格里塞、Murail 等（IRCAM 与 l’Itinéraire）', '1970 年代のフランス、グリゼー、ミュライユら（IRCAM とイティネレール）', '1970s France: Grisey, Murail and others (IRCAM, l’Itinéraire)'), t('1910 年代的维也纳，勋伯格', '1910 年代のウィーン、シェーンベルク', '1910s Vienna: Schoenberg'), t('1950 年代的纽约，凯奇', '1950 年代のニューヨーク、ケージ', '1950s New York: Cage'), t('1910 年代的巴黎，斯特拉文斯基', '1910 年代のパリ、ストラヴィンスキー', '1910s Paris: Stravinsky')],
      t('德国的 Feedback 小组和罗马尼亚作曲家也在同一时期发展出各自的频谱做法。', 'ドイツのフィードバック・グループやルーマニアの作曲家も同時期に独自のスペクトル技法を発展させました。', 'The German Feedback group and Romanian composers developed their own spectral approaches in the same period.')),
    C(['wiki-spectral-music'], t('“器乐加法合成”是指？', '「器楽的加算合成」とは？', 'What is “additive instrumental synthesis”?'),
      [t('每件乐器演奏声音的一个分音，合起来重建一个音响', '各楽器が音の一つの部分音を演奏し、合わせて響きを再構成する', 'Each instrument plays one partial, together rebuilding a sound'), t('把录音一层层叠加', '録音を重ねていく', 'Layering recordings'), t('用合成器代替所有乐器', 'すべての楽器をシンセサイザーに替える', 'Replacing every instrument with a synthesiser'), t('所有乐器齐奏同一旋律', '全楽器が同じ旋律を斉奏する', 'All instruments playing one melody in unison')],
      t('这是频谱音乐常见的配器思路：把电子分析得到的成分分配给原声乐器。', 'スペクトル音楽によくある管弦楽法で、電子的分析で得た成分をアコースティック楽器に割り当てます。', 'A common spectral orchestration approach: assigning analysed components to acoustic instruments.')),
    C(['ircam-spectral'], t('格里塞怎样处理频谱中不在平均律上的音高？', 'グリゼーはスペクトル中の平均律にない音高をどう扱った？', 'How did Grisey handle non-tempered pitches in a spectrum?'),
      [t('近似到最近的四分之一音或六分之一音', '最も近い四分音か六分音に近似した', 'Approximated them to the nearest quarter- or sixth-tone'), t('全部改成十二平均律', 'すべて十二平均律に直した', 'Rounded all to twelve-tone equal temperament'), t('全部删掉', 'すべて削除した', 'Deleted them'), t('交给打击乐演奏', '打楽器に任せた', 'Gave them to percussion')],
      t('IRCAM 对格里塞作品的介绍提到他的“频率和声”带有非平均律音高，近似到四分之一音或六分之一音。', 'IRCAM のグリゼー紹介によれば、彼の「周波数の和声」は平均律にない音高を含み、四分音か六分音に近似されます。', 'IRCAM’s overview notes his “harmony of frequencies” with non-tempered pitches approximated to quarter- or sixth-tones.')),
  ],
  branches: [
    [
      C(['wiki-spectral-music'], t('钟的频谱为什么叫“非谐”的？', '鐘のスペクトルはなぜ「非調和」と呼ぶ？', 'Why is a bell’s spectrum called inharmonic?'),
        [t('它的分音不是基频的整数倍', '部分音が基音の整数倍ではないから', 'Its partials are not whole-number multiples of the fundamental'), t('它没有任何分音', '部分音がまったくないから', 'It has no partials'), t('它只有一个音', '音が一つしかないから', 'It has only one tone'), t('它比小提琴响', 'ヴァイオリンより大きいから', 'It is louder than a violin')],
        t('谐波频谱的分音是整数倍；钟的分音偏离整数倍，所以是非谐频谱。', '調和スペクトルの部分音は整数倍。鐘の部分音は整数倍からずれるので非調和です。', 'Harmonic spectra have whole-number partials; a bell’s deviate, so its spectrum is inharmonic.')),
      C(['wiki-spectral-music'], t('“频谱音乐”（musique spectrale）这个名称通常认为是谁提出的？', '「スペクトル音楽」（musique spectrale）の名は誰が唱えたとされる？', 'Who is usually credited with the term “spectral music” (musique spectrale)?'),
        [t('Hugues Dufourt（1979 年）', 'ユーグ・デュフール（1979 年）', 'Hugues Dufourt (1979)'), t('勋伯格', 'シェーンベルク', 'Schoenberg'), t('Harry Partch', 'ハリー・パーチ', 'Harry Partch'), t('德彪西', 'ドビュッシー', 'Debussy')],
        t('Dufourt 在 1979 年发表的文章中提出这个名称；他本人也是 l’Itinéraire 的作曲家。', 'デュフールは 1979 年の論文でこの名を用いました。彼自身もイティネレールの作曲家です。', 'Dufourt introduced the term in a 1979 article; he was himself an l’Itinéraire composer.')),
    ],
    [
      C(['wiki-spectral-music'], t('频谱音乐的音高常取自泛音列，所以经常用到？', 'スペクトル音楽の音高は倍音列から取られることが多いので、よく使うのは？', 'Because spectral pitches often come from the harmonic series, what do they often involve?'),
        [t('微分音', '微分音', 'Microtones'), t('十二音列', '十二音列', 'Twelve-tone rows'), t('布鲁斯音阶', 'ブルース・スケール', 'Blues scales'), t('只用白键', '白鍵だけ', 'White keys only')],
        t('泛音列里很多分音不落在十二平均律上，例如第 7、11 分音，所以会用到微分音。', '倍音列の多くの部分音（第 7・11 など）は十二平均律から外れるので微分音を使います。', 'Many partials (the 7th, 11th…) fall between equal-tempered notes, so microtones appear.')),
      C(['ircam-spectral'], t('第 7 分音比最近的十二平均律音约低 31 音分。近似到最近的四分之一音，会落在哪里？', '第 7 部分音は最も近い十二平均律の音より約 31 セント低い。最も近い四分音に近似するとどこ？', 'The 7th partial is about 31 cents below the nearest equal-tempered note. Where does it land on the nearest quarter-tone?'),
        [t('比那个平均律音低四分之一音（−50 音分）', 'その平均律の音より四分音低い（−50 セント）', 'A quarter-tone (−50 cents) below that note'), t('正好在那个平均律音上', 'その平均律の音ちょうど', 'Exactly on that note'), t('比它高四分之一音', '四分音高い', 'A quarter-tone above it'), t('低一个半音', '半音低い', 'A semitone below')],
        t('−31 离 −50 是 19 音分，离 0 是 31 音分，所以最近的四分之一音是 −50。', '−31 は −50 から 19 セント、0 から 31 セント離れているので、最も近い四分音は −50 です。', '−31 is 19 cents from −50 and 31 from 0, so the nearest quarter-tone is −50.'),
        t('比较 −31 到 0 与到 −50 的距离。', '−31 から 0 と −50 までの距離を比べる。', 'Compare the distance from −31 to 0 and to −50.')),
    ],
    [
      C(['wiki-spectral-music'], t('下面哪些是频谱音乐会用到的心理声学现象？', 'スペクトル音楽が用いる心理音響現象は？', 'Which psychoacoustic phenomena does spectral music use?'),
        [t('差音、调幅、调频、谐波融合', '差音・振幅変調・周波数変調・倍音の融合', 'Difference tones, amplitude and frequency modulation, harmonic fusion'), t('平行五度、导音解决', '平行五度・導音の解決', 'Parallel fifths and leading-tone resolution'), t('十二音矩阵', '十二音マトリクス', 'Twelve-tone matrices'), t('布鲁斯的蓝调音', 'ブルーノート', 'Blue notes')],
        t('维基百科列出调幅、调频、差音、谐波融合、残余音高、Shepard 音等。', 'Wikipedia は振幅変調・周波数変調・差音・倍音融合・残余音高・シェパード・トーンなどを挙げます。', 'Wikipedia lists amplitude and frequency modulation, difference tones, harmonic fusion, residue pitch and Shepard tones.')),
      C(['wiki-spectral-music'], t('440 Hz 和 550 Hz 同时响，一阶差音是多少？', '440 Hz と 550 Hz が同時に鳴るとき、一次差音は？', '440 Hz and 550 Hz sound together. What is the first-order difference tone?'),
        [t('110 Hz', '110 Hz', '110 Hz'), t('990 Hz', '990 Hz', '990 Hz'), t('495 Hz', '495 Hz', '495 Hz'), t('1.25 Hz', '1.25 Hz', '1.25 Hz')],
        t('一阶差音 = 高频 − 低频 = 550 − 440 = 110 Hz。990 是两者之和。', '一次差音 = 高い周波数 − 低い周波数 = 550 − 440 = 110 Hz。990 は和です。', 'First-order difference = high − low = 550 − 440 = 110 Hz; 990 is the sum.')),
    ],
    [
      C(['wiki-spectral-music'], t('频谱音乐在形式上常强调什么？', 'スペクトル音楽は形式上、何を重視することが多い？', 'What does spectral music often emphasise formally?'),
        [t('过程与时间的伸展，用插值平滑过渡', 'プロセスと時間の引き伸ばし、補間による滑らかな移行', 'Process and stretched time, with smooth interpolation'), t('严格的奏鸣曲式', '厳格なソナタ形式', 'Strict sonata form'), t('十二小节循环', '12 小節の反復', 'Twelve-bar cycles'), t('只用突然的对比', '突然の対比だけ', 'Only sudden contrasts')],
        t('早期作品多用渐变的过程；格里塞和 Murail 在 1980 年代后期以后也加入了更突然的对比。', '初期作品は段階的なプロセスが多く、グリゼーとミュライユは 1980 年代後半以降より突然の対比も取り入れました。', 'Early works favour gradual processes; from the later 1980s Grisey and Murail also embraced sudden contrasts.')),
      C(['wiki-spectral-music'], t('下面哪一部是格里塞《声学空间》里的作品？', 'グリゼー《音響空間》に含まれる作品は？', 'Which is part of Grisey’s Les espaces acoustiques?'),
        [t('《Partiels》（1975）', '《パルシエル》（1975）', 'Partiels (1975)'), t('《Gondwana》', '《ゴンドワナ》', 'Gondwana'), t('《Saturne》', '《サテュルヌ》', 'Saturne'), t('《月迷彼埃罗》', '《月に憑かれたピエロ》', 'Pierrot lunaire')],
        t('《Gondwana》是 Murail 的作品，《Saturne》是 Dufourt 的作品，《月迷彼埃罗》是勋伯格的自由无调性作品。', '《ゴンドワナ》はミュライユ、《サテュルヌ》はデュフール、《月に憑かれたピエロ》はシェーンベルクの自由無調作品です。', 'Gondwana is by Murail, Saturne by Dufourt, Pierrot lunaire Schoenberg’s free-atonal work.')),
    ],
  ],
};

// ---------------- 微分音和声 ----------------
const MT_REF = ['gann-ji', 'gann-ji-reasons', 'wiki-limit', 'wiki-neutral-third'];
const MT_STEPS = [
  t('纯律按频率之间的整数比例选择音高，因此音阶的步子几乎必然大小不等。一个八度用 12 个音是一种很自然的上限，但绝不是不可更改的。', '純正律は周波数どうしの整数比で音高を選ぶので、音階の歩みはほぼ必然的に不等になります。一オクターヴ 12 音は自然な上限の一つですが、絶対ではありません。', 'Just intonation chooses pitches by whole-number frequency ratios, almost necessarily producing unequal scale steps. Twelve pitches per octave is a natural limit of sorts, but by no means sacrosanct.'),
  t('“极限”（limit）这个概念来自 Harry Partch：限定生成音程所用的最大质数；Partch 自己的音乐把质因数限制在 11。后来发展出“奇数极限”和“质数极限”两种说法。', '「リミット」の考えはハリー・パーチに由来します。音程を作る素数の最大値を限るもので、パーチ自身は素因数を 11 までにしました。のちに「奇数リミット」と「素数リミット」の二つの定式化が生まれました。', 'The idea of a limit comes from Harry Partch: capping the largest prime used to generate intervals; Partch capped his own at 11. Two formulations followed: odd limit and prime limit.'),
  t('三度不止大小两种：7/6（约 267 音分，很窄的小三度）、6/5、11/9（中立三度）、5/4、9/7（约 435 音分）。两个 7 相关的三度各离十二平均律约三分之一个半音，所以把八度分成 36 等分能容纳许多 7 限音程。', '3 度は長短の二種類だけではありません：7/6（約 267 セント、とても狭い短 3 度）、6/5、11/9（中立 3 度）、5/4、9/7（約 435 セント）。7 に関わる二つの 3 度は十二平均律から約三分の一半音ずれるので、オクターヴを 36 等分すると多くの 7 リミット音程を収められます。', 'Thirds come in more than two sizes: 7/6 (about 267 cents, a very narrow minor third), 6/5, 11/9 (neutral), 5/4, 9/7 (about 435 cents). The two 7-related thirds each sit about a third of a semitone from equal temperament, so 36 equal steps per octave accommodate many 7-limit intervals.'),
  t('11 相关的音程（如 11/10、11/9）非常接近四分之一音，所以四分之一音（24 平均）能很好地近似许多 11 限音程。', '11 に関わる音程（11/10、11/9 など）は四分音にとても近いので、四分音（24 平均）は多くの 11 リミット音程をよく近似します。', 'Eleven-related intervals such as 11/10 and 11/9 are very close to quarter-tones, so a quarter-tone (24-tone) scale closely approximates many 11-limit intervals.'),
  t('中立三度比小三度宽、比大三度窄。11:9 约 347.41 音分，是 5/4 与 6/5 的中项，可以说是“作为大三度和小三度调得一样好”的唯一比例；24 平均里的中立三度正好 350 音分，是平均律纯五度的一半。“中立三度”这个名称由 Land 在 1880 年提出。', '中立 3 度は短 3 度より広く長 3 度より狭い音程です。11:9 は約 347.41 セントで 5/4 と 6/5 の中項であり、長 3 度としても短 3 度としても同じくらいよく調律された唯一の比です。24 平均の中立 3 度はちょうど 350 セントで、平均律の完全 5 度の半分です。この名は 1880 年にランドが付けました。', 'A neutral third is wider than minor and narrower than major. 11:9, about 347.41 cents, is the mediant of 5/4 and 6/5 — the unique ratio equally well tuned as a major and a minor third; the 24-tone neutral third is exactly 350 cents, half an equal-tempered fifth. Land named it in 1880.'),
  t('设计微分音和声时，把基准频率、比例、实际频率和进入时间都写清楚，别人才能重现；喜欢哪种声音由你决定，计算和规则可以核对。', '微分音の和声を設計するときは、基準周波数・比・実周波数・入りのタイミングを明記すれば他人が再現できます。どの響きが好きかはあなたの自由、計算と規則は確かめられます。', 'When designing microtonal harmony, state the reference, ratios, actual frequencies and entry times so others can reproduce it; which sound you prefer is your choice, but calculations and rules can be checked.'),
];
const MT = {
  guide: guide(MT_REF, t('背景与概念：极限、更多的三度与中立三度', '背景と概念：リミット・さまざまな 3 度・中立 3 度', 'Background: limits, more thirds and the neutral third'), MT_STEPS),
  main: [
    C(['wiki-limit'], t('“极限”（limit）这个概念最早来自谁？', '「リミット」の考えは誰に由来する？', 'Who originated the idea of a limit?'),
      [t('Harry Partch', 'ハリー・パーチ', 'Harry Partch'), t('Ben Johnston', 'ベン・ジョンストン', 'Ben Johnston'), t('Kyle Gann', 'カイル・ガン', 'Kyle Gann'), t('Zarlino', 'ツァルリーノ', 'Zarlino')],
      t('Partch 提出限定质数的想法，并把自己音乐的质因数限制在 11。', 'パーチが素数を限る考えを示し、自身の音楽では素因数を 11 までにしました。', 'Partch proposed limiting the primes and capped his own music at 11.')),
    C(['wiki-neutral-third'], t('11/9（约 347 音分）是哪两个音程的中项？', '11/9（約 347 セント）はどの二つの音程の中項？', 'Of which two intervals is 11/9 (about 347 cents) the mediant?'),
      [t('5/4 与 6/5', '5/4 と 6/5', '5/4 and 6/5'), t('9/8 与 10/9', '9/8 と 10/9', '9/8 and 10/9'), t('3/2 与 4/3', '3/2 と 4/3', '3/2 and 4/3'), t('7/4 与 2/1', '7/4 と 2/1', '7/4 and 2/1')],
      t('中项把分子、分母分别相加：(5+6)/(4+5)=11/9。它处在大三度 5/4 和小三度 6/5 之间。', '中項は分子・分母をそれぞれ足す：(5+6)/(4+5)=11/9。長 3 度 5/4 と短 3 度 6/5 の間にあります。', 'A mediant adds numerators and denominators: (5+6)/(4+5) = 11/9, between the major third 5/4 and minor third 6/5.'),
      t('把两个比例的分子相加、分母相加。', '二つの比の分子どうし、分母どうしを足す。', 'Add the numerators together and the denominators together.')),
    C(['gann-ji'], t('为什么四分之一音（24 平均）能很好地近似许多 11 限音程？', 'なぜ四分音（24 平均）は多くの 11 リミット音程をよく近似できる？', 'Why does a quarter-tone (24-tone) scale closely approximate many 11-limit intervals?'),
      [t('11 相关的音程（如 11/10、11/9）非常接近四分之一音', '11 に関わる音程（11/10、11/9 など）が四分音にとても近いから', 'Eleven-related intervals such as 11/10 and 11/9 lie very close to quarter-tones'), t('因为 24 是 11 的倍数', '24 は 11 の倍数だから', 'Because 24 is a multiple of 11'), t('因为 11 限只有两个音', '11 リミットには二音しかないから', 'Because the 11-limit has only two notes'), t('因为四分之一音就是纯律', '四分音は純正律そのものだから', 'Because quarter-tones are just intonation')],
      t('Gann 指出 11/10、11/9 这类音程都非常接近四分之一音的位置。', 'Gann は 11/10 や 11/9 などがどれも四分音の位置にとても近いと指摘します。', 'Gann notes that intervals such as 11/10 and 11/9 sit very close to quarter-tone positions.')),
    C(['gann-ji'], t('7/6 与 9/7 两个三度各离十二平均律约三分之一个半音。哪种等分律能容纳很多 7 限音程？', '7/6 と 9/7 の 3 度はどちらも十二平均律から約三分の一半音ずれる。多くの 7 リミット音程を収められる等分は？', 'The thirds 7/6 and 9/7 each sit about a third of a semitone from equal temperament. Which equal division accommodates many 7-limit intervals?'),
      [t('把八度分成 36 等分', 'オクターヴの 36 等分', '36 equal steps per octave'), t('把八度分成 5 等分', 'オクターヴの 5 等分', '5 equal steps per octave'), t('把八度分成 7 等分', 'オクターヴの 7 等分', '7 equal steps per octave'), t('把八度分成 12 等分', 'オクターヴの 12 等分', '12 equal steps per octave')],
      t('36 等分每步约 33.3 音分，也就是三分之一个半音，正好落在这些 7 相关音程附近。', '36 等分は 1 段約 33.3 セント、つまり三分の一半音で、これらの 7 関連の音程の近くに来ます。', 'Each step of 36-EDO is about 33.3 cents — a third of a semitone — landing near these 7-related intervals.')),
  ],
  branches: [
    [
      C(['gann-ji', 'wiki-limit'], t('比例 6/5 属于几限（质数极限）？', '比 6/5 は何リミット（素数リミット）？', 'What prime limit does the ratio 6/5 belong to?'),
        [t('5 限', '5 リミット', '5-limit'), t('3 限', '3 リミット', '3-limit'), t('7 限', '7 リミット', '7-limit'), t('11 限', '11 リミット', '11-limit')],
        t('6 = 2 × 3，5 是质数，最大的质因数是 5，所以是 5 限。', '6 = 2 × 3、5 は素数。最大の素因数は 5 なので 5 リミット。', '6 = 2 × 3 and 5 is prime; the largest prime factor is 5, so 5-limit.')),
      C(['gann-ji-reasons'], t('纯律是按什么选择音高的？', '純正律は何によって音高を選ぶ？', 'How does just intonation choose pitches?'),
        [t('按频率之间的整数比例', '周波数どうしの整数比で', 'By whole-number ratios between frequencies'), t('把八度平均分成 12 份', 'オクターヴを 12 等分して', 'By dividing the octave into 12 equal parts'), t('按钢琴琴键', 'ピアノの鍵盤で', 'By piano keys'), t('随机选择', 'ランダムに', 'At random')],
        t('Gann 的定义：按频率间的整数比例选择音高，因此音阶步子几乎必然不等大。', 'Gann の定義：周波数間の整数比で音高を選ぶので、音階の歩みはほぼ必然的に不等になります。', 'Gann’s definition: choosing pitches by whole-number frequency ratios, almost necessarily giving unequal steps.')),
    ],
    [
      C(['wiki-neutral-third'], t('24 平均里的中立三度是多少音分？', '24 平均の中立 3 度は何セント？', 'How many cents is the 24-tone equal-tempered neutral third?'),
        [t('350', '350', '350'), t('347.41', '347.41', '347.41'), t('400', '400', '400'), t('300', '300', '300')],
        t('24 平均每步 50 音分，中立三度是 7 步 = 350 音分，正好是平均律纯五度（700）的一半；347.41 是纯律 11:9。', '24 平均は 1 段 50 セント、中立 3 度は 7 段 = 350 セントで平均律の完全 5 度（700）のちょうど半分。347.41 は純正の 11:9。', 'Each 24-tone step is 50 cents; the neutral third is 7 steps = 350, exactly half the tempered fifth (700); 347.41 is the just 11:9.')),
      C(['wiki-limit'], t('Partch 在自己的音乐里把质因数限制到几？', 'パーチは自身の音楽で素因数をいくつまでにした？', 'To which prime did Partch cap his own music?'),
        [t('11', '11', '11'), t('5', '5', '5'), t('7', '7', '7'), t('13', '13', '13')],
        t('Partch 的音乐使用到 11 限；“极限”的想法也由他提出。', 'パーチの音楽は 11 リミットまでを使い、「リミット」の考えも彼が示しました。', 'Partch’s music used up to the 11-limit; he also originated the idea of a limit.')),
    ],
    [
      C(['wiki-neutral-third'], t('11:9、27:22、16:13 这几种中立三度，彼此相差大约在多少音分以内？', '11:9・27:22・16:13 の中立 3 度は、互いにおよそ何セント以内の差？', 'The neutral thirds 11:9, 27:22 and 16:13 all lie within about how many cents of each other?'),
        [t('约 12 音分以内', '約 12 セント以内', 'About 12 cents'), t('约 100 音分', '約 100 セント', 'About 100 cents'), t('约 50 音分', '約 50 セント', 'About 50 cents'), t('完全相同', 'まったく同じ', 'They are identical')],
        t('它们都在约 12 音分之内，大多数人很难靠耳朵区分；16:13 约 359.47 音分，是最大的一个。', 'どれも約 12 セント以内で、多くの人は耳で区別しにくいです。16:13 は約 359.47 セントで最大です。', 'They lie within about 12 cents, hard for most people to distinguish; 16:13, about 359.47 cents, is the largest.')),
      C(['gann-ji'], t('7/6 这个三度大约多少音分？', '3 度 7/6 は約何セント？', 'About how many cents is the third 7/6?'),
        [t('约 267 音分', '約 267 セント', 'About 267 cents'), t('约 316 音分', '約 316 セント', 'About 316 cents'), t('约 386 音分', '約 386 セント', 'About 386 cents'), t('约 435 音分', '約 435 セント', 'About 435 cents')],
        t('7/6 约 267 音分，是很窄的小三度；6/5 约 316，5/4 约 386，9/7 约 435。', '7/6 は約 267 セントのとても狭い短 3 度。6/5 は約 316、5/4 は約 386、9/7 は約 435。', '7/6 is about 267 cents, a very narrow minor third; 6/5 ≈ 316, 5/4 ≈ 386, 9/7 ≈ 435.')),
    ],
    [
      C(['wiki-limit'], t('“极限”后来发展出哪两种说法？', '「リミット」はのちにどの二つの定式化に分かれた？', 'Into which two formulations did the limit concept later develop?'),
        [t('奇数极限与质数极限', '奇数リミットと素数リミット', 'Odd limit and prime limit'), t('大调极限与小调极限', '長調リミットと短調リミット', 'Major and minor limits'), t('上行极限与下行极限', '上行リミットと下行リミット', 'Ascending and descending limits'), t('八度极限与五度极限', 'オクターヴ・リミットと 5 度リミット', 'Octave and fifth limits')],
        t('质数极限看最大的质因数；奇数极限看能整除分子或分母的最大奇数。两者即使 n 是奇质数，包含的音程也不完全相同。', '素数リミットは最大の素因数、奇数リミットは分子か分母を割り切る最大の奇数を見ます。n が奇素数でも両者が含む音程は同じではありません。', 'Prime limit looks at the largest prime factor; odd limit at the largest odd number dividing the numerator or denominator. Even for an odd prime n they do not contain the same intervals.')),
      C(['wiki-neutral-third'], t('“中立三度”这个名称是谁在什么时候提出的？', '「中立 3 度」の名は誰が、いつ付けた？', 'Who named the neutral third, and when?'),
        [t('Jan Pieter Land，1880 年', 'ヤン・ピーテル・ランド、1880 年', 'Jan Pieter Land, 1880'), t('Harry Partch，1949 年', 'ハリー・パーチ、1949 年', 'Harry Partch, 1949'), t('Zarlino，1558 年', 'ツァルリーノ、1558 年', 'Zarlino, 1558'), t('Kyle Gann，1984 年', 'カイル・ガン、1984 年', 'Kyle Gann, 1984')],
        t('Land 在 1880 年这样命名，并提到 8 世纪的 Zalzal 所用的中立三度。', 'ランドは 1880 年にこう名付け、8 世紀のザルザルの中立 3 度に言及しました。', 'Land named it in 1880, referring to the neutral third attributed to the 8th-century Zalzal.')),
    ],
  ],
};

// 每张题卡的提示（不直接给答案，只指向该想的那一步）
const H = {
  nonfunctional: [
    [t('想想“所有声部同样移动”在讲解卡里叫什么。', '「全声部が同じだけ動く」は解説で何と呼んだ？', 'Recall what the guide calls moving every voice equally.'), t('罗马数字依靠的是功能：主、下属、属。', 'ローマ数字は主・下属・属という機能に頼っている。', 'Roman numerals rely on function: tonic, predominant, dominant.'), t('数共同音，再看两个和弦是不是同一种性质。', '共通音を数え、二つの和音が同じ種類か見る。', 'Count common tones, then check whether both chords share a quality.'), t('先找“音程结构不变”和“留在一个音阶里”这两条。', 'まず「音程構造が不変」と「一つの音階に留まる」の二つを探す。', 'Start with “structure unchanged” and “stays in one scale”.'), t('Arndt 用旋律和低音的什么做法来确立中心？', 'Arndt は旋律と低音のどんなやり方で中心を確立すると言った？', 'How do melody and bass establish the centre in Arndt’s example?')],
    [[t('和弦结构完全相同时，它们用到的音会集中还是分散？', '構造が同じ和音を続けると、使う音はまとまる？散らばる？', 'With identical structures, do the notes cluster or scatter?'), t('“等距”指每个声部移动的距离怎样？', '「実」は各声部の移動距離がどうであること？', 'What does “real” say about each voice’s distance?')],
     [t('看移动是按半音还是按音阶位置。', '半音単位か音階の位置単位かを見る。', 'Check whether it moves by semitones or by scale position.'), t('维基百科的例子里，德彪西这首是哪一类？', 'Wikipedia の例でドビュッシーのこの曲はどちら？', 'In Wikipedia’s examples, which kind is the Debussy piece?')],
     [t('A♭ 和 G♯ 在键盘上是同一个键。', 'A♭ と G♯ は鍵盤上で同じ鍵。', 'A♭ and G♯ are the same key on the keyboard.'), t('数共同音，再比较两个和弦的性质。', '共通音を数え、二つの和音の種類を比べる。', 'Count common tones and compare the two qualities.')],
     [t('想想一个音“反复出现、在句首句尾”会给人什么感觉。', '音が「繰り返し、句の始めと終わりに来る」とどう感じる？', 'What effect does repeating a note at phrase beginnings and ends have?'), t('关键词：回避功能，但仍有主音。', 'キーワード：機能を避けるが主音はある。', 'Key words: avoids function, still has a tonic.')]],
  ],
  polytonality: [
    [t('注意“同时”和“两个”。', '「同時」と「二つ」に注目。', 'Notice “at once” and “two”.'), t('两个大三和弦的根音相距三全音。', '二つの長三和音の根音は三全音離れている。', 'The two major triads’ roots are a tritone apart.'), t('建立一个中心需要哪些因素？', '中心を立てるには何が要る？', 'What does it take to establish a centre?'), t('Casella 在 1924 年这样评价过一部斯特拉文斯基的作品。', 'カゼッラは 1924 年にストラヴィンスキーのある作品をこう評した。', 'Casella praised a Stravinsky work this way in 1924.'), t('先分清“同时 / 先后”，再分清“主音几个”。', 'まず「同時か順番か」、次に「主音はいくつか」。', 'First simultaneous vs successive, then how many tonics.')],
    [[t('想想怎样让两层更容易分开听。', '二層を聴き分けやすくする方法を考える。', 'Think about how to make two layers easy to tell apart.'), t('建立一个主音已经不简单，那么三个呢？', '主音を一つ立てるのも簡単ではない。では三つなら？', 'Establishing one tonic is hard enough; what about three?')],
     [t('延伸和弦拆开以后，有没有两个中心？', '拡張和音を分けたとき、中心は二つある？', 'When an extended chord is split, are there two centres?'), t('把 C E G 和 F♯ A♯ C♯ 放进一个“全、半”交替的音集里试试。', 'C E G と F♯ A♯ C♯ を「全・半」交互の音集合に入れてみる。', 'Try fitting C E G and F♯ A♯ C♯ into an alternating whole–half collection.')],
     [t('维基百科的图注写明了两只手各自的调。', 'Wikipedia の図の説明に両手の調が書いてある。', 'Wikipedia’s caption names each hand’s key.'), t('音区和节奏只帮我们分开声部。', '音域とリズムは声部を分ける助けにすぎない。', 'Register and rhythm only help separate the voices.')],
     [t('主音只有一个时，还能叫“两个调”吗？', '主音が一つでも「二つの調」と呼べる？', 'With only one tonic, can it be “two keys”?'), t('巴比特关心的是“同时两个调”这个说法本身是否成立。', 'バビットが問題にしたのは「同時に二つの調」という言い方そのもの。', 'Babbitt questioned whether “two keys at once” makes sense at all.')]],
  ],
  atonality: [
    [t('这个词出现在 20 世纪初的一篇调性研究里。', 'この語は 20 世紀初めの調性研究に現れる。', 'The word appears in an early-twentieth-century study of tonality.'), t('系统的方法是在一战之后出现的。', '体系的な方法は第一次大戦後に現れた。', 'The systematic method came after World War I.'), t('四个做法都在“避免”传统的东西。', '四つの手法はどれも伝統的なものを「避ける」。', 'All four procedures avoid something traditional.'), t('勋伯格拿颜色和光谱作了一个比喻。', 'シェーンベルクは色とスペクトルのたとえを使った。', 'Schoenberg used an analogy with colour and spectrum.')],
    [[t('自由无调性也需要把作品联系在一起的东西。', '自由無調にも作品をつなぐものが要る。', 'Free atonality still needs something to bind the work together.'), t('级进是相邻的音，跳进隔得更远。', '順次は隣の音、跳躍はもっと離れる。', 'Steps are adjacent notes; leaps are further apart.')],
     [t('每个音都移动同样的距离。', '各音が同じ距離だけ動く。', 'Every note moves the same distance.'), t('每个音级加 2，超过 11 就减 12。', '各音級に 2 を足し、11 を超えたら 12 を引く。', 'Add 2 to each; subtract 12 if it exceeds 11.')],
     [t('I0：用 0 减去每个音级，再取 mod 12。', 'I0：0 から各音級を引き、mod 12。', 'I0: subtract each pitch class from 0, mod 12.'), t('逆行只是从后往前读。', '逆行は後ろから読むだけ。', 'Retrograde just reads from the end.')],
     [t('一个音可以靠哪些方式被“强调”？', '音はどんな方法で「強調」されうる？', 'In what ways can a pitch be emphasised?'), t('Grout 认为这是一个主观的类别。', 'Grout はこれを主観的なカテゴリーとした。', 'Grout treated it as a subjective category.')]],
  ],
  spectralharmony: [
    [t('名字里的“频谱”指什么？', '名前の「スペクトル」は何を指す？', 'What does “spectrum” in the name refer to?'), t('想想 IRCAM 在哪个城市。', 'IRCAM はどの都市にある？', 'Think about where IRCAM is.'), t('“加法合成”是把成分一个个加起来。', '「加算合成」は成分を一つずつ足していくこと。', '“Additive synthesis” sums components one by one.'), t('四分之一音、六分之一音都比半音更细。', '四分音・六分音はどちらも半音より細かい。', 'Quarter- and sixth-tones are both finer than a semitone.')],
    [[t('谐波分音是基频的几倍？', '調和的な部分音は基音の何倍？', 'What multiples of the fundamental are harmonic partials?'), t('这个名称出现在 1979 年的一篇文章里。', 'この名は 1979 年の論文に出てくる。', 'The term appears in a 1979 article.')],
     [t('第 7、11 分音落在十二平均律的什么位置？', '第 7・11 部分音は十二平均律のどこに来る？', 'Where do the 7th and 11th partials fall relative to equal temperament?'), t('比较 −31 到 0 与到 −50 的距离。', '−31 から 0 と −50 までの距離を比べる。', 'Compare the distance from −31 to 0 and to −50.')],
     [t('这些现象都和“我们怎样听”有关。', 'これらはどれも「どう聴こえるか」に関わる。', 'These phenomena concern how we hear.'), t('差音 = 高频 − 低频。', '差音 = 高い周波数 − 低い周波数。', 'Difference tone = higher − lower frequency.')],
     [t('频谱音乐喜欢渐变还是突变？早期作品尤其明显。', 'スペクトル音楽は漸変と急変のどちら？初期作品で特に顕著。', 'Gradual or sudden change? Especially clear in early works.'), t('另外三部分别属于 Murail、Dufourt 和勋伯格。', 'ほかの三つはミュライユ、デュフール、シェーンベルクの作品。', 'The other three belong to Murail, Dufourt and Schoenberg.')]],
  ],
  microtonalharmony: [
    [t('这个人在《音乐的起源》（Genesis of a Music）里讨论纯律。', 'この人は『音楽の起源』（Genesis of a Music）で純正律を論じた。', 'This person discussed just intonation in Genesis of a Music.'), t('把两个比例的分子相加、分母相加。', '二つの比の分子どうし、分母どうしを足す。', 'Add the numerators together and the denominators together.'), t('11/9 约 347 音分，四分之一音的位置是 350。', '11/9 は約 347 セント、四分音の位置は 350。', '11/9 is about 347 cents; the quarter-tone position is 350.'), t('三分之一个半音约是多少音分？哪种等分每步这么大？', '三分の一半音は約何セント？どの等分の一段がその大きさ？', 'About how many cents is a third of a semitone, and which division has steps that size?')],
    [[t('把分子、分母分解质因数，找最大的那个。', '分子と分母を素因数分解し、最大のものを探す。', 'Factor the numerator and denominator; find the largest prime.'), t('“纯”指的是怎样的频率关系？', '「純正」とはどんな周波数関係？', 'What frequency relationship does “just” mean?')],
     [t('24 平均每步 50 音分，中立三度在 300 与 400 之间。', '24 平均は 1 段 50 セント、中立 3 度は 300 と 400 の間。', 'Each 24-tone step is 50 cents; the neutral third lies between 300 and 400.'), t('这个质数也出现在本关的中立三度 11:9 里。', 'この素数は本課の中立 3 度 11:9 にも出てくる。', 'This prime also appears in this lesson’s neutral third 11:9.')],
     [t('它们都叫中立三度，说明彼此很接近。', 'どれも中立 3 度と呼ばれるので、互いにとても近い。', 'They are all called neutral thirds, so they are close to each other.'), t('它比 6/5（约 316 音分）还窄。', '6/5（約 316 セント）よりさらに狭い。', 'It is narrower still than 6/5 (about 316 cents).')],
     [t('一种看质数，另一种看奇数。', '一方は素数、もう一方は奇数を見る。', 'One looks at primes, the other at odd numbers.'), t('命名时还提到了 8 世纪的 Zalzal。', '命名のとき 8 世紀のザルザルにも触れた。', 'The naming referred to the 8th-century Zalzal.')]],
  ],
};
for (const [id, c] of Object.entries({ nonfunctional: NF, polytonality: PT, atonality: AT, spectralharmony: SP, microtonalharmony: MT })) {
  c.main.forEach((card, i) => { card.hint ||= H[id][0][i]; });
  c.branches.forEach((cards, k) => cards.forEach((card, i) => { card.hint ||= H[id][1][k][i]; }));
}
// 讲解卡的图：每一步一行关键词（blocks 图），讲到哪一步就圈出哪一行
const K = (label, ...cells) => ({ label, cells: cells.map((text, i) => ({ text, ...(i === 0 ? { lit: true } : {}) })) });
export const CONCEPT_KEYS = {
  nonfunctional: [
    K(t('背景', '背景', 'Background'), t('德彪西', 'ドビュッシー', 'Debussy'), t('拉威尔', 'ラヴェル', 'Ravel')),
    K(t('平行移动', '平行移動', 'Planing'), t('同样的音程', '同じ音程', 'same interval'), t('不用罗马数字', 'ローマ数字なし', 'no Roman numerals')),
    K(t('两种平行', '二種類の平行', 'Two kinds'), t('等距平行', '実平行', 'real'), t('调内平行', '音階内の平行', 'diatonic')),
    K(t('共同音', '共通音', 'Common tones'), t('保留共同音', '共通音を保つ', 'keep a shared note'), t('等音重新解释', '異名同音の読み替え', 'enharmonic respelling')),
    K(t('半音中音', '半音的中音', 'Chromatic mediant'), t('根音相距三度', '根音が 3 度', 'roots a third apart'), t('一个共同音', '共通音一つ', 'one common tone')),
    K(t('中心', '中心', 'Centre'), t('《沉没的教堂》', '《沈める寺》', '“La cathédrale engloutie”'), t('C 持续音', 'C の保続音', 'C pedal')),
  ],
  polytonality: [
    K(t('双调性', '複調', 'Bitonality'), t('两个主音', '二つの主音', 'two tonics'), t('不同音区', '別の音域', 'different registers')),
    K(t('复合和弦', 'ポリコード', 'Polychord'), t('两个和弦叠置', '和音の重ね合わせ', 'stacked chords'), t('≠ 双调性', '≠ 複調', '≠ bitonality')),
    K(t('复调式', '複旋法', 'Polymodal'), t('同一个主音', '同じ主音', 'one tonic'), t('不同音阶', '別の音階', 'different scales')),
    K(t('历史', '歴史', 'History'), t('《春之祭》1913', '《春の祭典》1913', 'The Rite of Spring 1913'), t('米约', 'ミヨー', 'Milhaud')),
    K(t('彼得鲁什卡和弦', 'ペトルーシュカ和音', 'Petrushka chord'), t('C 大三', 'C 長三', 'C major'), t('F♯ 大三', 'F♯ 長三', 'F♯ major')),
    K(t('争议', '論争', 'Debate'), t('巴比特', 'バビット', 'Babbitt'), t('八声音集', '八音音階', 'octatonic')),
  ],
  atonality: [
    K(t('定义', '定義', 'Definition'), t('没有调性中心', '調性の中心なし', 'no tonal centre'), t('各音独立', '各音が独立', 'notes independent')),
    K(t('名称', '名称', 'The term'), t('Marx 1907', 'Marx 1907', 'Marx 1907'), t('李斯特 1885', 'リスト 1885', 'Liszt 1885')),
    K(t('两个阶段', '二つの段階', 'Two phases'), t('自由无调性', '自由無調', 'free atonality'), t('十二音', '十二音', 'twelve-tone')),
    K(t('细胞', '細胞', 'Cells'), t('小音程细胞', '小さな音程の細胞', 'small interval cell'), t('变形', '変形', 'transformations')),
    K(t('四个做法', '四つの手法', 'Four procedures'), t('避免八度、三和弦', 'オクターヴ・三和音を避ける', 'avoid octaves, triads'), t('多用跳进', '跳躍を多く', 'prefer leaps')),
    K(t('争议', '論争', 'Debate'), t('勋伯格', 'シェーンベルク', 'Schoenberg'), t('巴比特', 'バビット', 'Babbitt')),
  ],
  spectralharmony: [
    K(t('定义', '定義', 'Definition'), t('声音的频谱', '音のスペクトル', 'the spectrum of sound'), t('声谱图', 'ソノグラム', 'sonograms')),
    K(t('起源', '起源', 'Origins'), t('1970 年代法国', '1970 年代フランス', '1970s France'), t('格里塞、Murail', 'グリゼー、ミュライユ', 'Grisey, Murail')),
    K(t('微分音', '微分音', 'Microtones'), t('泛音列', '倍音列', 'harmonic series'), t('四分 / 六分之一音', '四分音・六分音', 'quarter/sixth-tones')),
    K(t('器乐加法合成', '器楽的加算合成', 'Instrumental synthesis'), t('一件乐器', '一つの楽器', 'one instrument'), t('一个分音', '一つの部分音', 'one partial')),
    K(t('非谐频谱', '非調和スペクトル', 'Inharmonic'), t('钟声', '鐘', 'bells'), t('差音', '差音', 'difference tones')),
    K(t('过程', 'プロセス', 'Process'), t('插值', '補間', 'interpolation'), t('《Partiels》1975', '《パルシエル》1975', 'Partiels 1975')),
  ],
  microtonalharmony: [
    K(t('纯律', '純正律', 'Just intonation'), t('整数比例', '整数比', 'whole-number ratios'), t('步子不等', '不等な歩み', 'unequal steps')),
    K(t('极限', 'リミット', 'Limits'), t('Partch', 'パーチ', 'Partch'), t('11 限', '11 リミット', '11-limit')),
    K(t('更多的三度', 'さまざまな 3 度', 'More thirds'), t('7/6 · 9/7', '7/6 · 9/7', '7/6 · 9/7'), t('36 等分', '36 等分', '36-EDO')),
    K(t('11 限', '11 リミット', '11-limit'), t('11/9', '11/9', '11/9'), t('四分之一音', '四分音', 'quarter-tones')),
    K(t('中立三度', '中立 3 度', 'Neutral third'), t('约 347¢', '約 347¢', '≈ 347¢'), t('24 平均 350¢', '24 平均 350¢', '24-EDO 350¢')),
    K(t('写清方案', '設計を明記', 'Write it down'), t('基准、比例', '基準・比', 'reference, ratios'), t('频率、时间', '周波数・時間', 'Hz, timing')),
  ],
};
/** 讲解卡用的图与逐步圈注 */
export function conceptVisual(topicId) {
  return { kind: 'blocks', rows: CONCEPT_KEYS[topicId] };
}
export function conceptTour(topicId) {
  return CONCEPT_KEYS[topicId].map((row, i) => [{ at: [`row${i}`], label: row.label }]);
}
/** 每个专题：A 面主关追加的讲解卡和题目、四个进阶关各追加的题目 */
export const MODERN_CONCEPTS = { nonfunctional: NF, polytonality: PT, atonality: AT, spectralharmony: SP, microtonalharmony: MT };
/** Side-B 讲解页：同样的背景与概念，用段落呈现 */
export const conceptPage = (topicId, id) => {
  const c = MODERN_CONCEPTS[topicId];
  return { id, type: 'page', ref: c.guide.ref, title: c.guide.title, text: c.guide.steps, visual: conceptVisual(topicId) };
};
/**
 * Side-B 概念题：把 A 面的题目两两合成一道有两个变体的题（重试时换另一道），skills 标为识别与应用。
 * which：'main'（主关题）或 'branch'（进阶题）
 */
export function conceptQuestions(topicId, which, prefix) {
  const c = MODERN_CONCEPTS[topicId];
  const pool = (which === 'main' ? c.main : c.branches.flat()).filter((q) => q.type === 'choice');
  const pairs = [[pool[0], pool[1]], [pool[2], pool[3]]].filter(([a, b]) => a && b);
  return pairs.map(([a, b], i) => ({
    id: `${prefix}${i + 1}`, type: 'choice', ref: [...new Set([...[].concat(a.ref), ...[].concat(b.ref)])], skills: ['identify', 'apply'], error: 'concept', answer: 0,
    variants: [a, b].map((q) => ({ prompt: q.prompt, options: q.options, explain: q.explain })),
  }));
}

// Side-B 实操任务（Practical Lab）登记表：工具收到 #<工具>?q=@lab:<id>[@chapter|@ex] 时按这里显示任务条、准备初始内容、交给 lab_checks.js 评分。
// 只放任务说明、参数与"胜利瞬间"；评分规则与出处在 lab_checks.js。
// 任务说明里的乐理：终止四六的 6→5、4→3：ref:omt2e-cad64；复节奏与节拍调制：ref:wiki-polyrhythm ref:wiki-metric-modulation；
// 6/8 是复二拍子、一拍是附点四分音符：ref:omt2e-compound-meter；爵士配置的 3–7 骨架、9→13 的上声部线条、省略根音与五音：ref:omt2e-jazz-voicings ref:wiki-jazz-chord；切分与连音线：ref:omt2e-rhythm-more ref:omt2e-rhythm
// 三全音替代：两个属七共用同一个三全音、三音与七音互换 ref:omt2e-substitutions
// 集合类（标准顺序、原型、Tn / In）ref:omt2e-normal-order ref:omt2e-prime-form；十二音行与 I0 ref:omt2e-twelve-tone ref:omt2e-row-naming
// 类别对位：第一类的开头、终止与平行规则 ref:omt-species1；第四类的预备—挂留—解决与终止的 7–6 挂留 ref:omt-species4
// 八度法则（低音上行 1–5 级，主和属用 5/3、其余用 6）：ref:omt2e-galant-rule-octave；副属和弦：ref:omt2e-tonicization；那不勒斯六和弦 ra → ti：ref:omt2e-neapolitan
const t = (zh, ja, en) => ({ zh, ja, en });
/** 预先写在谱上的全音符（对位实操的定旋律） */
const wholeNotes = (line) => line.split(' ').map((p) => ({ rest: false, duration: 'w', dots: 0, tie: false, notes: [{ letter: p[0], octave: Number(p.slice(-1)), alter: null, cents: 0 }] }));
// Fux《Gradus ad Parnassum》C 调定旋律（图 44 / 45，数据 ref:gotham-species），移到 C3 写在低音谱表
const FUX_C = 'C3 E3 F3 G3 E3 A3 G3 E3 F3 E3 D3 C3';
/** 预先写好的四分音符（十二音行），naturals 写明还原，避免同一小节里的临时记号延续 */
const quarterNotes = (names) => names.map((p) => ({ rest: false, duration: 'q', dots: 0, tie: false, notes: [{ letter: p[0], octave: Number(p.slice(-1)), alter: p.includes('#') ? 1 : p.includes('b') ? -1 : 0, cents: 0 }] }));
// OMT 2e 举的 Elisabeth Lutyens《Motet》的音列（以 C 为 0）：0–11–3–7–8–4–2–6–5–1–9–10（ref:omt2e-row-naming）
const LUTYENS = [0, 11, 3, 7, 8, 4, 2, 6, 5, 1, 9, 10];

export const LABS = {
  'vl-ii6-V7-I': {
    id: 'vl-ii6-V7-I', tool: 'staff', check: 'fourPart', minutes: 5,
    title: t('四部写作：C 大调 ii6–V7–I', '4 声体：ハ長調 ii6–V7–I', 'Four-part writing: ii6–V7–I in C major'),
    brief: t('在大谱表上写三个和弦，每个和弦 4 个音同时开始（常见写法：上行谱表女中、女高，下行谱表男低、男高；3 + 1 也可以）。随时点"检查一下"看评分单，边听边改。', '大譜表に 3 つの和音を書く。各和音は 4 音が同時に始まる（よくあるのはト音譜表にアルトとソプラノ、ヘ音譜表にバスとテノール。3 + 1 でもよい）。いつでも「チェック」で採点表を見て、聴きながら直そう。', 'Write three chords on the grand staff, each with 4 notes starting together (usually alto and soprano on the treble staff, bass and tenor on the bass staff; 3 + 1 works too). Check any time to see the score sheet; listen and revise.'),
    params: { keyName: 'C', tonic: 0, romans: ['ii6', 'V7', 'I'] },
    setup: { clef: 'grand', key: 0, meter: [4, 4], clear: true },
    breakthrough: { id: 'clean-ii-V-I', when: ['chords', 'leading', 'seventh', 'parallels'], text: t('第一次写出导音、七音都正确解决、没有平行五八度的 ii6–V7–I。', '導音も第 7 音も正しく解決し、平行 5・8 度のない ii6–V7–I が初めて書けた。', 'Your first ii6–V7–I with the leading tone and seventh resolved and no parallels.') },
  },
  'vl-cad64': {
    id: 'vl-cad64', tool: 'staff', check: 'fourPart', minutes: 6,
    title: t('四部写作：G 大调 IV–I6/4–V7–I（终止四六）', '4 声体：ト長調 IV–I6/4–V7–I（終止の四六）', 'Four-part writing: IV–I6/4–V7–I in G major (cadential 6/4)'),
    brief: t('写四个和弦：终止四六的低音保持属音，上方的六度、四度级进下行到 V7 的五度、三度。', '4 つの和音を書く：終止の四六はバスが属音のまま、上の 6 度と 4 度が V7 の 5 度・3 度へ順次下行。', 'Write four chords: the cadential 6/4 keeps the dominant in the bass while its sixth and fourth step down to the fifth and third of V7.'),
    params: { keyName: 'G', tonic: 7, romans: ['IV', 'I6/4', 'V7', 'I'] },
    setup: { clef: 'grand', key: 1, meter: [4, 4], clear: true },
    breakthrough: { id: 'cad64', when: ['chords', 'parallels'], text: t('终止四六写对了：低音不动，上方两个声部滑进属七。', '終止の四六ができた：バスはそのまま、上の 2 声が属七へ滑り込む。', 'Cadential 6/4 done: the bass holds while two upper voices slide into V7.') },
  },
  'jazz-ii-V-I-rootless': {
    id: 'jazz-ii-V-I-rootless', tool: 'staff', check: 'jazzVoicing', minutes: 6,
    title: t('爵士配置：Dm9–G13–Cmaj9（不弹根音）', 'ジャズ・ヴォイシング：Dm9–G13–Cmaj9（ルートレス）', 'Jazz voicing: Dm9–G13–Cmaj9 (rootless)'),
    brief: t('在上行谱表写三个和弦（每个四个音、二分音符），根音交给低音不弹。先让三音和七音彼此半音、全音地接起来，再把 9 音、13 音放在上面。每次检查都能听到并看到各声部一共动了几个半音。', 'ト音譜表に 3 つの和音（各 4 音、2 分音符）。根音はベースに任せて弾かない。まず第 3 音と第 7 音を半音・全音でつなぎ、その上に 9th・13th を。チェックのたびに各声部の移動量が分かる。', 'Write three chords on the treble staff (four notes each, half notes) and leave the root to the bass. First link the 3rds and 7ths by half or whole step, then add the 9th and 13th on top. Each check shows how many half steps the voices moved.'),
    params: { symbols: ['Dm9', 'G13', 'Cmaj9'], rootless: true },
    setup: { clef: 'treble', key: 0, meter: [4, 4], clear: true },
    breakthrough: { id: 'smooth-rootless', when: ['identity', 'guide', 'motion'], text: t('三个和弦几乎不用动手就连起来了——这就是 guide tone 的力量。', '3 つの和音がほとんど手を動かさずにつながった——これがガイド・トーンの力。', 'Three chords linked with almost no motion — that is the power of guide tones.') },
  },
  'rhythm-sync-2bars': {
    id: 'rhythm-sync-2bars', tool: 'staff', check: 'rhythm', minutes: 4,
    title: t('节奏：两小节 4/4 的切分', 'リズム：4/4 の 2 小節でシンコペーション', 'Rhythm: two bars of 4/4 syncopation'),
    brief: t('用同一个音写两小节 4/4：至少三个反拍起音、一个跨拍的连音线、一处切分。写完播放，听听重音怎样"推"着拍子走。', '同じ音で 4/4 を 2 小節：裏拍の打点 3 つ以上、拍をまたぐタイ 1 つ、シンコペーション 1 つ。再生して、アクセントが拍を「押す」感じを聴こう。', 'On one pitch, write two bars of 4/4 with at least three off-beat attacks, one tie across a beat and one syncopation. Play it back and hear the accents push against the beat.'),
    params: { meter: [4, 4], measures: 2, offbeats: 3, tiesAcross: 1, syncopations: 1 },
    setup: { clef: 'treble', key: 0, meter: [4, 4], clear: true },
    breakthrough: { id: 'first-syncopation', when: ['offbeats', 'ties', 'syncopation'], text: t('你自己写出了切分：重音落在拍子之间。', '自分でシンコペーションが書けた：アクセントが拍と拍の間に。', 'You wrote your own syncopation: the accent lands between the beats.') },
  },
  'rhythm-68-2bars': {
    id: 'rhythm-68-2bars', tool: 'staff', check: 'rhythm', minutes: 4,
    title: t('节奏：两小节 6/8', 'リズム：6/8 を 2 小節', 'Rhythm: two bars of 6/8'),
    brief: t('用同一个音写两小节 6/8（一拍 = 附点四分音符，每拍分成三个八分音符）：至少两个落在拍与拍之间的起音、一个跨过拍点的连音线、一处切分。写完播放，感受"一拍分三"的摇摆。', '同じ音で 6/8 を 2 小節（1 拍 = 付点 4 分、1 拍を 8 分 3 つに）：拍と拍の間の打点 2 つ以上、拍をまたぐタイ 1 つ、シンコペーション 1 つ。再生して「1 拍 3 分割」の揺れを感じよう。', 'On one pitch, write two bars of 6/8 (beat = dotted quarter, three eighths per beat) with at least two attacks between beats, one tie across a beat and one syncopation. Play it and feel the three-to-a-beat lilt.'),
    params: { meter: [6, 8], measures: 2, offbeats: 2, tiesAcross: 1, syncopations: 1 },
    setup: { clef: 'treble', key: 0, meter: [6, 8], clear: true },
    breakthrough: { id: 'rhythm-68', when: ['offbeats', 'ties', 'syncopation'], text: t('你在复拍子里写出了切分：拍子分三，重音落在三份之间。', '複合拍子でシンコペーションが書けた：拍は 3 分割、アクセントはその間に。', 'You wrote syncopation in compound meter: the beat splits in three and the accent lands between.') },
  },
  'fb-rule-octave': {
    id: 'fb-rule-octave', tool: 'staff', check: 'fourPart', minutes: 6,
    title: t('数字低音：八度法则（C 大调上行 C–G）', '数字付き低音：オクターヴの規則（ハ長調 上行 C–G）', 'Figured bass: the Rule of the Octave (C major, rising C–G)'),
    brief: t('低音是 C D E F G，数字是 — 6 6 6 —（主音和属音上 5/3，其余是六和弦），也就是 I vii°6 I6 ii6 V。每个和弦 4 个音同时开始。提示：低音一路上行，上方声部尽量往下走或保持，就不容易出现平行。', 'バスは C D E F G、数字は — 6 6 6 —（主音と属音は 5/3、ほかは六の和音）、つまり I vii°6 I6 ii6 V。各和音は 4 音が同時に始まる。ヒント：バスはずっと上行するので、上声はなるべく下がるか保つと平行になりにくい。', 'The bass is C D E F G with figures — 6 6 6 — (5/3 on tonic and dominant, sixth chords elsewhere): I vii°6 I6 ii6 V. Each chord has 4 notes starting together. Tip: the bass keeps rising, so move the upper voices down or hold them to avoid parallels.'),
    params: { keyName: 'C', tonic: 0, romans: ['I', 'vii°6', 'I6', 'ii6', 'V'] },
    setup: { clef: 'grand', key: 0, meter: [4, 4], clear: true },
    breakthrough: { id: 'rule-octave', when: ['chords', 'parallels'], text: t('你亲手实现了一段八度法则：两根柱子，中间三座六和弦的桥。', '自分の手でオクターヴの規則をリアライズした：2 本の柱と、間にかかる六の和音の橋。', 'You realized the Rule of the Octave yourself: two pillars bridged by three sixth chords.') },
  },
  'vl-secondary': {
    id: 'vl-secondary', tool: 'staff', check: 'fourPart', minutes: 6,
    title: t('四部写作：C 大调 I–V6/5/V–V–I（副属和弦）', '4 声体：ハ長調 I–V6/5/V–V–I（副属和音）', 'Four-part writing: I–V6/5/V–V–I in C major (applied chord)'),
    brief: t('V6/5/V 是 D–F♯–A–C 的第一转位：低音 F♯ 是指向 G 的"临时导音"，要上行半音；七音 C 级进下行到 B。写完听一听，G 是不是像短暂地成了主和弦。', 'V6/5/V は D–F♯–A–C の第 1 転回：バスの F♯ は G への「一時的な導音」なので半音上がる。第 7 音 C は B へ順次下行。書いたら聴いてみよう、G が一瞬主和音のように聞こえる？', 'V6/5/V is D–F♯–A–C in first inversion: the bass F♯ is a temporary leading tone to G and rises a half step; the seventh C steps down to B. Listen — does G briefly sound like a tonic?'),
    params: { keyName: 'C', tonic: 0, romans: ['I', 'V6/5/V', 'V', 'I'] },
    setup: { clef: 'grand', key: 0, meter: [4, 4], clear: true },
    breakthrough: { id: 'applied-chord', when: ['chords', 'seventh', 'parallels'], text: t('你写出了第一个副属和弦，并且让它正确地解决了。', '初めての副属和音を書き、正しく解決させた。', 'You wrote your first applied chord and resolved it correctly.') },
  },
  'vl-n6': {
    id: 'vl-n6', tool: 'staff', check: 'fourPart', minutes: 6,
    title: t('四部写作：C 小调 i–N6–V–i（那不勒斯六和弦）', '4 声体：ハ短調 i–N6–V–i（ナポリの六）', 'Four-part writing: i–N6–V–i in C minor (Neapolitan sixth)'),
    brief: t('调号三个降号。N6 是 D♭ 大三和弦的第一转位（低音 F，通常重复低音）；D♭（ra）往下走到 V 的 B（ti），中间是减三度。V 要用还原的 B（升高的导音），它在外声部时要上行到 C。', '調号は ♭ 3 つ。N6 は D♭ 長三和音の第 1 転回（バス F、ふつうバスを重複）。D♭（ra）は V の B（ti）へ下がる（減 3 度）。V には本位の B（上げた導音）を使い、外声にあれば C へ上がる。', 'Three flats in the signature. N6 is D♭ major in first inversion (F in the bass, usually doubled); D♭ (ra) moves down to B (ti) in V — a diminished third. Use B natural (the raised leading tone) in V; in an outer voice it rises to C.'),
    params: { keyName: 'C', tonic: 0, minor: true, romans: ['i', 'N6', 'V', 'i'] },
    setup: { clef: 'grand', key: -3, meter: [4, 4], clear: true },
    breakthrough: { id: 'neapolitan', when: ['chords', 'leading', 'parallels'], text: t('ra 落到 ti：你写出了那不勒斯六和弦最有味道的那一步。', 'ra から ti へ：ナポリの六の一番おいしい一歩が書けた。', 'Ra down to ti: you wrote the Neapolitan’s most flavourful step.') },
  },
  'vl-synthesis': {
    id: 'vl-synthesis', tool: 'staff', check: 'fourPart', minutes: 7,
    title: t('和声综合：C 大调 I–vi–V6/5/V–I6/4–V7–I', '和声の総合：ハ長調 I–vi–V6/5/V–I6/4–V7–I', 'Harmony synthesis: I–vi–V6/5/V–I6/4–V7–I in C major'),
    brief: t('六个和弦把这一章串起来：vi 离开主和弦，V6/5/V 离调到 V，I6/4 是终止四六（低音 G），再 V7–I 完满终止。副属和弦的七音 C 可以先保持到终止四六里，再落到 V7 的 B；终止四六的六度、四度下行到五度、三度。', '6 つの和音でこの章をつなぐ：vi で主和音を離れ、V6/5/V で V へトニカイズ、I6/4 は終止の四六（バス G）、そして V7–I の完全終止。副属和音の第 7 音 C は終止の四六まで保ってから V7 の B へ。終止の四六の 6 度・4 度は 5 度・3 度へ下がる。', 'Six chords tie the chapter together: vi leaves the tonic, V6/5/V tonicizes V, I6/4 is the cadential 6/4 (G in the bass), then V7–I closes with a PAC. The applied chord’s seventh C may be held into the 6/4 before falling to B in V7; the 6/4’s sixth and fourth fall to the fifth and third.'),
    params: { keyName: 'C', tonic: 0, romans: ['I', 'vi', 'V6/5/V', 'I6/4', 'V7', 'I'] },
    setup: { clef: 'grand', key: 0, meter: [4, 4], clear: true },
    breakthrough: { id: 'harmony-synthesis', when: ['chords', 'leading', 'seventh', 'parallels'], text: t('一整句和声，从离开到回家，全部由你写成。', '離れてから帰るまでの 1 フレーズの和声を、すべて自分で書いた。', 'A whole phrase, from departure to homecoming, written entirely by you.') },
  },
  'cp-species1': {
    id: 'cp-species1', tool: 'staff', check: 'species', minutes: 7,
    title: t('第一类对位：在 Fux 的 C 调定旋律上方', '第一類対位法：フックスのハ調定旋律の上に', 'First species: above Fux’s C cantus firmus'),
    brief: t('低音谱表上已经写好 12 个全音符的定旋律（不要改动它）。在高音谱表上方写对位：每小节一个全音符；从 do 或 sol（同度、五度、八度）开始；中间多用三度、六度；不要连续两个相同的完全协和音程，也不要同向进入完全协和音程；倒数第二小节是小三度或大六度，最后反向级进到 do。', 'ヘ音譜表には 12 の全音符の定旋律が書いてある（変えないこと）。ト音譜表に対旋律を書く：1 小節 1 全音符。do か sol（1 度・5 度・8 度）で始め、途中は 3 度・6 度を多めに。同じ完全協和音程を 2 つ続けず、並達で完全協和音程に入らない。最後から 2 小節目は短 3 度か長 6 度、最後は反行の順次進行で do へ。', 'The bass staff already holds a 12-note cantus firmus in whole notes (leave it alone). Write a counterpoint on the treble staff: one whole note per bar; start on do or sol (unison, fifth or octave); use mostly thirds and sixths; never two of the same perfect interval in a row, and never approach a perfect interval in similar motion; make the penultimate bar a minor third or major sixth and finish on do by contrary step.'),
    params: { species: 1, cantus: FUX_C.split(' '), position: 'above' },
    setup: { clef: 'grand', key: 0, meter: [4, 4], clear: true, prefill: [[], wholeNotes(FUX_C)] },
    breakthrough: { id: 'first-species', when: ['frame', 'consonance', 'parallels'], text: t('两条线各走各的，合起来又处处协和——这就是第一类对位。', '2 本の線がそれぞれ動き、合わせればどこも協和——これが第一類対位法。', 'Two independent lines that are consonant everywhere — that is first species.') },
  },
  'cp-species4': {
    id: 'cp-species4', tool: 'staff', check: 'species', minutes: 8,
    title: t('第四类对位：挂留（Fux 的 C 调定旋律）', '第四類対位法：掛留（フックスのハ調定旋律）', 'Fourth species: suspensions (Fux’s C cantus)'),
    brief: t('定旋律已经写在低音谱表上（不要改动）。在高音谱表写二分音符：第一小节先休止半小节；之后每个弱拍的音用连音线（T）连到下一小节的强拍，强拍若不协和就是挂留，要在弱拍级进下行解决到协和（上方可用 7–6、4–3、9–8）。结尾固定：倒数第二小节 C（连过来）–B，最后一小节全音符 C。', '定旋律はヘ音譜表に書いてある（変えないこと）。ト音譜表に 2 分音符を書く：第 1 小節は半小節休み、その後は弱拍の音をタイ（T）で次の小節の強拍へつなぐ。強拍が不協和なら掛留なので、弱拍で順次下行して協和へ解決（上声は 7–6・4–3・9–8）。終わりは固定：最後から 2 小節目は C（タイ）–B、最後の小節は全音符の C。', 'The cantus is already on the bass staff (leave it alone). Write half notes on the treble staff: start with a half rest; then tie each weak-beat note (T) into the next downbeat — if that downbeat is dissonant it is a suspension and must resolve down by step to a consonance on the weak beat (above: 7–6, 4–3, 9–8). The ending is fixed: penultimate bar C (tied over)–B, final bar a whole-note C.'),
    params: { species: 4, cantus: FUX_C.split(' '), position: 'above' },
    setup: { clef: 'grand', key: 0, meter: [4, 4], clear: true, prefill: [[], wholeNotes(FUX_C)] },
    breakthrough: { id: 'fourth-species', when: ['consonance', 'parallels'], text: t('一串挂留接连落下：不协和被预备、被解决，听起来只有"甜"。', '掛留が次々に落ちていく：不協和は予備され解決され、甘く響くだけ。', 'A chain of suspensions falling into place: prepared, resolved, and simply sweet.') },
  },
  'jazz-subV-rootless': {
    id: 'jazz-subV-rootless', tool: 'staff', check: 'jazzVoicing', minutes: 6,
    title: t('再和声：Dm9–D♭9–Cmaj9（三全音替代，不弹根音）', 'リハーモナイズ：Dm9–D♭9–Cmaj9（裏コード、ルートレス）', 'Reharmonization: Dm9–D♭9–Cmaj9 (tritone sub, rootless)'),
    brief: t('把 ii–V–I 的 G7 换成它的三全音替代 D♭9。在高音谱表写三个和弦（每个四个音、二分音符），根音交给低音不弹。D♭9 的三音 F、七音 C♭（= B）就是 G7 的七音和三音——让这两个音尽量不动，再把九音放在上面。', 'ii–V–I の G7 を裏コード D♭9 に替える。ト音譜表に 3 つの和音（各 4 音、2 分音符）、根音はベースに任せて弾かない。D♭9 の 3 度 F と 7 度 C♭（= B）は G7 の 7 度と 3 度——この 2 音をなるべく動かさず、9th を上に。', 'Replace the G7 of a ii–V–I with its tritone sub, D♭9. Write three chords on the treble staff (four notes each, half notes), leaving the root to the bass. D♭9’s 3rd F and 7th C♭ (= B) are G7’s 7th and 3rd — keep those two still and put the 9th on top.'),
    params: { symbols: ['Dm9', 'D♭9', 'Cmaj9'], rootless: true },
    setup: { clef: 'treble', key: 0, meter: [4, 4], clear: true },
    breakthrough: { id: 'subV-voicing', when: ['identity', 'guide', 'motion'], text: t('换了根音，手几乎没动：三全音替代就是这么"省力"。', '根音を替えても手はほとんど動かない：裏コードはこんなに「楽」。', 'New root, hands barely moved: that is how economical a tritone sub is.') },
  },
  'set-trichords': {
    id: 'set-trichords', tool: 'staff', check: 'setWrite', minutes: 6,
    title: t('集合类：写出三个 (014) 三和弦', 'セット・クラス：(014) の三和音を 3 つ', 'Set class: write three (014) trichords'),
    brief: t('在谱上写三个三音和弦（每个和弦三个音同时开始），它们都要属于集合类 (014)，而且彼此不同：至少有一对是移位（Tn）关系、一对是倒影（In）关系。例如 C–D♭–E 是 [0,1,4]；同一小节里的还原音要写还原号。', '譜に三和音を 3 つ（各 3 音が同時に始まる）。どれもセット・クラス (014) に属し、互いに違うこと：少なくとも 1 組は移高（Tn）、1 組は反転（In）の関係に。たとえば C–D♭–E は [0,1,4]。同じ小節の本位音にはナチュラルを。', 'Write three three-note chords (three notes starting together each), all members of set class (014) and all different: at least one pair related by transposition (Tn) and one by inversion (In). C–D♭–E, for example, is [0,1,4]; within a bar, write naturals explicitly.'),
    params: { prime: [0, 1, 4], count: 3 },
    setup: { clef: 'treble', key: 0, meter: [4, 4], clear: true },
    breakthrough: { id: 'set-family', when: ['members', 'relations'], text: t('三个听起来像亲戚的和弦——同一个集合类，移位与倒影。', '親戚のように聞こえる 3 つの和音——同じセット・クラスの移高と反転。', 'Three chords that sound related — one set class, transposed and inverted.') },
  },
  'row-inversion': {
    id: 'row-inversion', tool: 'staff', check: 'rowForm', minutes: 6,
    title: t('十二音：写出 Lutyens《Motet》音列的 I0', '12 音：Lutyens《Motet》の音列の I0', 'Twelve-tone: write I0 of Lutyens’s Motet row'),
    brief: t('高音谱表上已经写好 P0（以 C 为 0：0–11–3–7–8–4–2–6–5–1–9–10，不要改动）。在低音谱表按顺序写出 I0：每个音的音程方向反过来，也就是 I0 的每个音级 = 12 − P0 的音级（模 12）。八度随意，十二个音一个不能少。', 'ト音譜表に P0（C = 0：0–11–3–7–8–4–2–6–5–1–9–10、変えないこと）が書いてある。ヘ音譜表に I0 を順に書く：各音程の向きを逆に、つまり I0 の各音級 = 12 − P0 の音級（mod 12）。オクターヴは自由、12 音すべて。', 'P0 is already on the treble staff (C = 0: 0–11–3–7–8–4–2–6–5–1–9–10 — leave it). On the bass staff write I0 in order: reverse every interval’s direction, i.e. each pitch class of I0 = 12 − that of P0 (mod 12). Any octave; all twelve notes.'),
    params: { row: LUTYENS, form: 'I0', givenStaff: 0, answerStaff: 1 },
    setup: { clef: 'grand', key: 0, meter: [4, 4], clear: true, prefill: [quarterNotes(['C5', 'B4', 'Eb5', 'G5', 'Ab4', 'E5', 'D5', 'F#5', 'F5', 'C#5', 'A4', 'Bb4']), []] },
    breakthrough: { id: 'row-mirror', when: ['order', 'aggregate'], text: t('你把整条音列照进了镜子：每一步都反过来走。', '音列全体を鏡に映した：一歩ずつ逆向きに。', 'You mirrored the whole row: every step reversed.') },
  },
  'poly-32-mm': {
    id: 'poly-32-mm', tool: 'rhythm', sub: 'poly', check: 'tempo', minutes: 5,
    title: t('复节奏 3:2 与节拍调制', 'ポリリズム 3:2 とメトリック・モジュレーション', 'Polyrhythm 3:2 and metric modulation'),
    brief: t('① 把复节奏设成 3:2 并播放，听两条线在哪里重合；② 节拍调制选"细分不变（八分 = 八分）"、旧速度 ♩ = 96，先自己算出新的附点四分音符速度填进下面，再在工具里播放听一遍前后对比。', '① ポリリズムを 3:2 にして再生し、2 本の線が重なる所を聴く。② メトリック・モジュレーションは「細分を保つ（8 分 = 8 分）」、旧テンポ ♩ = 96。新しい付点 4 分のテンポを先に自分で計算して下に入力し、ツールで前後を聴き比べる。', '① Set the polyrhythm to 3:2 and play it — listen for where the lines coincide. ② For metric modulation choose “keep the subdivision (eighth = eighth)” with ♩ = 96; work out the new dotted-quarter tempo yourself, enter it below, then play the before/after in the tool.'),
    params: { ratio: [3, 2], mm: { oldTempo: 96, preset: 'keepSub' }, mustPlay: true },
    answer: { label: t('新速度（附点四分音符 = ?）', '新テンポ（付点 4 分 = ?）', 'New tempo (dotted quarter = ?)') },
    breakthrough: { id: 'metric-modulation', when: ['answer'], text: t('你自己算出了节拍调制后的新速度，再亲耳听到它。', 'メトリック・モジュレーション後の新テンポを自分で計算し、耳で確かめた。', 'You calculated the new tempo yourself — and then heard it.') },
  },
};

const MODES = ['level', 'chapter', 'ex'];
/** 'vl-ii6-V7-I@ex' → { id, mode }（没写模式 = 普通关） */
export function parseLabRef(ref) {
  const [id, mode] = String(ref).split('@');
  return { id, mode: MODES.includes(mode) ? mode : 'level' };
}
/** 成绩的存储键：普通关就是实操 id，章节测试 / EX 另存为 id@chapter、id@ex（考试要重新完成，不能拿普通关的成绩） */
export const labResultKey = (id, mode = 'level') => (mode && mode !== 'level' ? `${id}@${mode}` : id);
/** 打开任务的链接：#staff?q=@lab:<id>[@mode]；复节奏工具的任务开在节奏工具里 */
export const labHref = (lab, mode = 'level') => `#${lab.tool}?q=${encodeURIComponent(`@lab:${lab.id}${mode === 'level' ? '' : `@${mode}`}`)}`;

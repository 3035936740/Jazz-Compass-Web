// Side-B 第 2 章（和声）的其余关卡：B2-1 B2-2 B2-3 B2-5 B2-6 B2-7 B2-8 B2-9 B2-10 B2-11 B2-12（B2-4 在 sideb_units_harmony.js）。
// 出处（每条事实都在原文里核对过）：
//   三和弦可以叠成三度（全在线或全在间），根音 / 三音 / 五音，四种性质（大三：大三度 + 纯五度；小三：小三度 + 纯五度；减三：小三度 + 减五度；增三：大三度 + 增五度）：ref:omt2e-triads
//   五种常见七和弦（大大七 = 大七、大小七 = 属七、小小七 = 小七、半减七、减七）：ref:omt2e-sevenths
//   低音决定转位（三音在低音 = 第一转位、五音 = 第二转位、七音 = 第三转位），数字低音标出转位，升降号写在被改变的数字前面，斜线或加号表示升高半音：ref:omt2e-figured-bass
//   和弦符号写根音、性质、延伸音和低音；不指明调；三和弦默认大三、七度默认小七度：ref:omt2e-chord-symbols
//   罗马数字表示根音的音级、性质和转位；大写大三、小写小三，° 减、+ 增、ø 半减；大调 I ii iii IV V vi vii°，小调 i ii° III iv v/V VI VII/vii°：ref:omt2e-roman-numerals
//   八度法则是 partimento 传统里给低音配和弦的"速查表"，OMT 的版本接近 Fenaroli（那不勒斯，1775），用四步搭建：先全用平行六和弦，
//     再在首尾主和弦用 5/3，再在属音上用 5/3，最后在主和属前面加七和弦：ref:omt2e-galant-rule-octave
//   和声功能：主（只有 I / i）、下属（强：IV、ii；弱：iii、vi）、属（V、vii°）；乐句模型；完满终止 = V–I 都是原位且女高是 do，否则不完满；半终止 x–V：ref:omt2e-cadences
//   强下属 IV 和 ii6 都给低音 fa 配和声，预告属和弦要来；用强下属时最常见的写法错误是平行八度、五度：ref:omt2e-predominants
//   和声分析的策略：先找终止、再找通往终止的强下属，最后从乐句开头往后分析：ref:omt2e-phrase-model
//   主和弦的延长：最常见的是在主和弦之间放 V6 或转位的 V7：ref:omt2e-tonic-v6
//   终止四六：低音 sol 上方六度和四度两个装饰音，标成 cad.6/4（不标 I6/4）——它出现在强下属之后、低音是 sol，听起来是对 V 的装饰；六度下行到五度、四度下行到三度：ref:omt2e-cad64
//   经过四六（两边是同一功能）、辅助四六（低音不动、两边都是原位）、琶音四六：ref:omt2e-64-chords
//   阻碍进行 V(7)–vi：它避开了终止而不是完成一个终止，所以 OMT 不叫"阻碍终止"：ref:omt2e-la-bass
//   乐句 = 朝目标（通常是终止）前进的相对完整的想法，4、8、16 小节最常见；乐句（句子）= 呈示 + 展开；乐段 = 前句（较弱的终止，多为半终止）+ 后句（更强的终止，多为完满终止）；
//     重复乐句的两句终止相同：ref:omt2e-phrase
//   动机是短小、反复出现的单位：ref:omt2e-form-concepts；二部曲式有两个反复的段落，分简单二部与再现二部（第二段中间回到开头的材料）：ref:omt2e-binary；三部曲式 ABA：ref:omt2e-ternary
//   离调：用副属和弦（V(7)/x、vii°(7)/x）让一个非主和弦暂时听起来像主和弦；斜杠读作"的"，V/ii 读作"二级的属和弦"；副属和弦几乎总带升高的临时记号：ref:omt2e-tonicization
//   转调：较长时间换主音；直接转调（常在乐句交界）与共同和弦转调（共同和弦同时属于两个调）；终止确立调，反复出现的同一临时记号提示可能转调：ref:omt2e-modulation
//   调式混合：从同主音小调借音；改变和弦性质但不改变功能；降低根音的和弦在罗马数字前加降号（♭VI）：ref:omt2e-mixture
//   那不勒斯六和弦：建在 ra 上的大三和弦，通常第一转位（♭II6），ra 下行到 ti；常见 ♭II6–V、♭II6–vii°7/V–V：ref:omt2e-neapolitan
//   增六和弦：le 与 fi 之间的增六度，分意大利、法国、德国三种，没有根音，解决到原位属和弦：ref:omt2e-aug6
//   近关系调：共六个——四个只差一个音（IV、V、ii、iii），一个音完全相同（关系小调 vi），一个主音相同（同主音小调 i）：ref:wiki-closely-related
//   五度圈（按调号升降号个数排列，顺时针多一个升号）：ref:omt2e-major-scales ref:wiki-circle-of-fifths
//   四部写作的规则（平行五八度、导音与七音的解决）：ref:omt-species1 ref:omt2e-v7 ref:omt2e-pd7
//   新黎曼变换：每个变换在一个大三和弦和一个小三和弦之间切换；P、R、L 只动一个音、保留两个共同音（R：C 与 Am；P：C 与 Cm；L：C 与 Em）：ref:omt2e-neo-riemannian
const t = (zh, ja, en) => ({ zh, ja, en });
const G = (id, gen, count, skills, params) => ({ id, type: 'gen', gen, count, skills, ...(params ? { params } : {}) });
const nn = (p) => ({ p, d: 'w', lit: true });
const chordCol = (ps, col) => ps.map((p) => ({ p, d: 'w', col }));

// C 大调的四部和弦 [男低, 男高, 女中, 女高]（玩具与试听用）
const V4 = {
  I: [48, 64, 67, 72], Iend: [48, 64, 67, 72], vi: [45, 64, 69, 72], IV: [53, 65, 69, 72], ii6: [53, 62, 69, 74], ii: [50, 65, 69, 74],
  V: [43, 62, 67, 71], V7: [55, 65, 71, 74], Vhalf: [55, 62, 67, 71],
  // 离调示范：C – Am/A7 – Dm – G/G7 – C（A7 的 C♯ 上行到 D、七音 G 下行到 F）
  Am: [45, 64, 69, 72], A7: [45, 61, 67, 76], Dm: [50, 62, 65, 74], G: [55, 59, 67, 74], G7: [55, 59, 65, 74],
  // 半音化下属 → V：iv、N6（ra 下行到 ti）、It+6（le 下行、fi 上行）
  iv: [53, 65, 68, 72], N6: [53, 65, 68, 73], It6: [44, 60, 66, 72], Vafter: [43, 62, 67, 71],
  // 终止四六：六度、四度下行到 V7 的五度、三度
  cad64: [55, 64, 67, 72], V7c: [55, 62, 65, 71], Ic: [48, 60, 64, 72],
};

// 八度法则第三步（上行 C D E F G：I vii°6 I6 ii6 V），上方三声部和低音反向，避开平行
const ROT3 = [[48, 64, 67, 72], [50, 62, 65, 71], [52, 60, 67, 72], [53, 57, 65, 74], [43, 59, 62, 74]];

// ===================== B2-1 和弦的构成、拼写与转位 =====================
export const LEVEL_B2_1 = {
  minutes: 13,
  insight: t('转位只换了最低的音；数字低音写的就是"低音上方的音程"。', '転回で変わるのは一番下の音だけ。数字付き低音は「バスから上の音程」を書いている。', 'Inversion only changes the lowest note; figured bass simply lists the intervals above the bass.'),
  sections: {
    discover: [
      {
        id: 'b21-d1', type: 'discover', ref: 'omt2e-figured-bass',
        prompt: t('三次弹的都是 C、E、G，只是最低的音不同。和弦变了吗？', '3 回とも C・E・G、違うのは一番下の音だけ。和音は変わった？', 'All three are C, E, G — only the lowest note differs. Did the chord change?'),
        play: [{ label: t('C 在低音', 'バスが C', 'C in the bass'), audio: { notes: [48, 64, 67, 72], mode: 'harmonic' } }, { label: t('E 在低音', 'バスが E', 'E in the bass'), audio: { notes: [52, 60, 67, 72], mode: 'harmonic' } }, { label: t('G 在低音', 'バスが G', 'G in the bass'), audio: { notes: [43, 60, 64, 72], mode: 'harmonic' } }],
        options: [t('还是 C 大三和弦，只是转位不同', 'C 長三和音のまま、転回が違うだけ', 'Still a C major triad — just different inversions'), t('变成三个不同的和弦', '3 つの別の和音になった', 'Three different chords'), t('只有第一个是和弦', '1 つ目だけが和音', 'Only the first is a chord')],
        answer: 0,
        insight: {
          title: t('低音决定转位', 'バスが転回を決める', 'The bass decides the inversion'),
          text: t('三音在低音是第一转位、五音在低音是第二转位（七和弦的七音在低音是第三转位）。数字低音用"低音上方的音程"来标：6 = 低音上方三度和六度（第一转位），6/4 = 上方四度和六度（第二转位）；原位 5/3 常省略不写。', '第 3 音がバスなら第 1 転回、第 5 音なら第 2 転回（七の和音の第 7 音なら第 3 転回）。数字付き低音は「バスから上の音程」で書く：6 = 3 度と 6 度（第 1 転回）、6/4 = 4 度と 6 度（第 2 転回）。基本形 5/3 はふつう省略。', 'Third in the bass = first inversion, fifth in the bass = second (a seventh chord’s seventh in the bass = third). Figured bass lists intervals above the bass: 6 = a third and sixth (first inversion), 6/4 = a fourth and sixth (second); root-position 5/3 is usually omitted.'),
        },
      },
    ],
    explain: [
      {
        id: 'b21-e1', type: 'page', ref: ['omt2e-triads', 'omt2e-sevenths'],
        title: t('四种三和弦，五种七和弦', '4 種の三和音、5 種の七の和音', 'Four triads, five sevenths'),
        text: [
          t('三和弦能叠成三度——三个音全在线上或全在间里，从下往上是根音、三音、五音。性质看三度和五度：大三（大三度 + 纯五度）、小三（小三度 + 纯五度）、减三（小三度 + 减五度）、增三（大三度 + 增五度）。', '三和音は 3 度に積める——3 音すべて線上か間に、下から根音・第 3 音・第 5 音。種類は 3 度と 5 度で：長三（長 3 + 完全 5）、短三（短 3 + 完全 5）、減三（短 3 + 減 5）、増三（長 3 + 増 5）。', 'A triad stacks in thirds — all on lines or all in spaces: root, third, fifth from the bottom. Quality comes from the third and fifth: major (M3 + P5), minor (m3 + P5), diminished (m3 + d5), augmented (M3 + A5).'),
          t('再叠一个三度就是七和弦。五种常见的：大大七（大七和弦）、大小七（属七和弦）、小小七（小七和弦）、半减七、减七。', 'さらに 3 度を積むと七の和音。よくある 5 つ：長長七（長七）、長短七（属七）、短短七（短七）、半減七、減七。', 'Add another third for a seventh chord. Five common qualities: major-major (major seventh), major-minor (dominant seventh), minor-minor (minor seventh), half-diminished, fully diminished.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...chordCol(['C4', 'E4', 'G4'], 0), ...chordCol(['C4', 'Eb4', 'G4'], 1), ...chordCol(['C4', 'Eb4', 'Gb4'], 2), ...chordCol(['C4', 'E4', 'G#4'], 3)], cols: 4 },
      },
      {
        id: 'b21-e2', type: 'discover', practice: true, ref: 'omt2e-figured-bass',
        prompt: t('G7（G B D F）的低音是 B。这是第几转位？数字低音怎么写？', 'G7（G B D F）のバスが B。第何転回？ 数字は？', 'G7 (G B D F) with B in the bass: which inversion, which figures?'),
        options: [t('第一转位，6/5', '第 1 転回、6/5', 'First inversion, 6/5'), t('第二转位，4/3', '第 2 転回、4/3', 'Second inversion, 4/3'), t('第一转位，6', '第 1 転回、6', 'First inversion, 6')],
        answer: 0,
        insight: { title: t('三音在低音 = 第一转位', '第 3 音がバス = 第 1 転回', 'Third in the bass = first inversion'), text: t('七和弦的四个位置：原位 7、第一转位 6/5、第二转位 4/3、第三转位 4/2。B 是 G7 的三音。', '七の和音の 4 つの形：基本形 7、第 1 転回 6/5、第 2 転回 4/3、第 3 転回 4/2。B は G7 の第 3 音。', 'A seventh chord’s four positions: root 7, first inversion 6/5, second 4/3, third 4/2. B is G7’s third.') },
      },
      {
        id: 'b21-e3', type: 'page', ref: 'omt2e-figured-bass',
        title: t('数字低音里的临时记号', '数字付き低音の臨時記号', 'Accidentals in figured bass'),
        text: [
          t('要改变某个音时，把升降号写在那个数字的前面（例如 ♯6）；数字上加一条斜线或在前面加 +，表示把这个音升高半音。单独一个升降号（没有数字）指的是低音上方三度。', 'ある音を変えるときは、その数字の前に臨時記号を書く（♯6 など）。数字に斜線か前に + をつけると、その音を半音上げる。数字なしの臨時記号はバスから 3 度上の音。', 'To alter a note, put the accidental before its figure (e.g. ♯6); a slash through a figure or a + before it raises that note a half step. An accidental with no figure applies to the third above the bass.'),
        ],
      },
    ],
    experiment: [
      { id: 'b21-x1', type: 'experiment', toy: 'chord', ref: ['omt2e-triads', 'omt2e-sevenths', 'omt2e-figured-bass', 'omt2e-chord-symbols'],
        prompt: t('选根音、性质、转位，看拼写、低音、数字低音和和弦符号怎么一起变。找一找：减七和弦换哪个转位，听起来都"一样"？', '根音・種類・転回を選び、綴り・バス・数字・コード・シンボルが一緒に変わるのを見よう。減七はどの転回でも「同じ」に聞こえる？', 'Pick root, quality and inversion; watch spelling, bass, figures and chord symbol change together. Does a diminished seventh sound “the same” in every inversion?'),
        params: {},
        breakthrough: { id: 'b21-chord', text: t('你亲手搭出了和弦，并读出了它的数字低音。', '自分で和音を組み立て、数字付き低音を読み取った。', 'You built chords yourself and read their figures.') } },
    ],
    challenge: [
      {
        id: 'b21-c1', type: 'choice', error: 'wrong-chord', skills: ['identify'], ref: 'omt2e-triads',
        variants: [
          { prompt: t('D–F–A♭ 是什么三和弦？', 'D–F–A♭ は何の三和音？', 'What triad is D–F–A♭?'), options: [t('减三和弦', '減三和音', 'Diminished'), t('小三和弦', '短三和音', 'Minor'), t('增三和弦', '増三和音', 'Augmented'), t('大三和弦', '長三和音', 'Major')] },
          { prompt: t('E♭–G–B 是什么三和弦？', 'E♭–G–B は何の三和音？', 'What triad is E♭–G–B?'), options: [t('增三和弦', '増三和音', 'Augmented'), t('大三和弦', '長三和音', 'Major'), t('小三和弦', '短三和音', 'Minor'), t('减三和弦', '減三和音', 'Diminished')] },
          { prompt: t('F♯–A–C♯ 是什么三和弦？', 'F♯–A–C♯ は何の三和音？', 'What triad is F♯–A–C♯?'), options: [t('小三和弦', '短三和音', 'Minor'), t('大三和弦', '長三和音', 'Major'), t('减三和弦', '減三和音', 'Diminished'), t('增三和弦', '増三和音', 'Augmented')] },
        ],
        answer: 0,
        explain: t('看三度和五度：小三度 + 减五度 = 减三；大三度 + 增五度 = 增三；小三度 + 纯五度 = 小三。', '3 度と 5 度を見る：短 3 + 減 5 = 減三、長 3 + 増 5 = 増三、短 3 + 完全 5 = 短三。', 'Check the third and fifth: m3 + d5 = diminished; M3 + A5 = augmented; m3 + P5 = minor.'),
      },
      {
        id: 'b21-c2', type: 'choice', error: 'wrong-inversion', skills: ['identify'], ref: 'omt2e-figured-bass',
        variants: [
          { prompt: t('F 大三和弦（F A C），低音是 C。数字低音是？', 'F 長三和音（F A C）、バスが C。数字は？', 'F major (F A C) with C in the bass. Figures?'), options: ['6/4', '6', '5/3', '4/3'] },
          { prompt: t('D7（D F♯ A C），低音是 C。数字低音是？', 'D7（D F♯ A C）、バスが C。数字は？', 'D7 (D F♯ A C) with C in the bass. Figures?'), options: ['4/2', '6/5', '4/3', '7'] },
          { prompt: t('A 小三和弦（A C E），低音是 C。数字低音是？', 'A 短三和音（A C E）、バスが C。数字は？', 'A minor (A C E) with C in the bass. Figures?'), options: ['6', '6/4', '5/3', '6/5'] },
        ],
        answer: 0,
        explain: t('五音在低音 = 第二转位 6/4；七音在低音 = 第三转位 4/2；三音在低音 = 第一转位 6。', '第 5 音がバス = 第 2 転回 6/4、第 7 音 = 第 3 転回 4/2、第 3 音 = 第 1 転回 6。', 'Fifth in the bass = second inversion 6/4; seventh = third inversion 4/2; third = first inversion 6.'),
      },
      {
        id: 'b21-c3', type: 'choice', error: 'wrong-chord', skills: ['identify', 'spell'], ref: 'omt2e-sevenths',
        variants: [
          { prompt: t('B–D–F–A 是什么七和弦？', 'B–D–F–A は何の七の和音？', 'What seventh chord is B–D–F–A?'), options: [t('半减七和弦', '半減七', 'Half-diminished'), t('减七和弦', '減七', 'Fully diminished'), t('小七和弦', '短七', 'Minor seventh'), t('属七和弦', '属七', 'Dominant seventh')] },
          { prompt: t('C–E–G–B♭ 是什么七和弦？', 'C–E–G–B♭ は何の七の和音？', 'What seventh chord is C–E–G–B♭?'), options: [t('属七和弦（大小七）', '属七（長短七）', 'Dominant seventh (major-minor)'), t('大七和弦', '長七', 'Major seventh'), t('小七和弦', '短七', 'Minor seventh'), t('半减七和弦', '半減七', 'Half-diminished')] },
        ],
        answer: 0,
        explain: t('先看三和弦，再看七度：B–D–F 是减三、B–A 是小七度 → 半减七；C–E–G 是大三、C–B♭ 是小七度 → 大小七（属七）。', 'まず三和音、次に 7 度：B–D–F は減三、B–A は短 7 度 → 半減七。C–E–G は長三、C–B♭ は短 7 度 → 長短七（属七）。', 'Triad first, then the seventh: B–D–F diminished + minor seventh = half-diminished; C–E–G major + minor seventh = major-minor (dominant).'),
      },
      G('b21-g1', 'inversionBass', 2, ['identify']),
      G('b21-g2', 'seventhSpell', 1, ['spell']),
    ],
  },
  pool: [G('b21-p1', 'triadSpell', 3, ['spell']), G('b21-p2', 'seventhSpell', 3, ['spell']), G('b21-p3', 'inversionBass', 3, ['identify']), G('b21-p4', 'triadEar', 2, ['hearing'])],
};

// ===================== B2-2 和弦符号 ⇄ 罗马数字 =====================
export const LEVEL_B2_2 = {
  minutes: 12,
  insight: t('G 在 C 大调是 V，在 G 大调是 I，在 D 大调是 IV：符号说"是什么"，罗马数字说"在调里做什么"。', 'G はハ長調で V、ト長調で I、ニ長調で IV：シンボルは「何か」、ローマ数字は「調の中で何をするか」。', 'G is V in C, I in G, IV in D: the symbol says what it is, the Roman numeral what it does in the key.'),
  sections: {
    discover: [
      {
        id: 'b22-d1', type: 'discover', ref: ['omt2e-chord-symbols', 'omt2e-roman-numerals'],
        prompt: t('同一个 G 和弦，先接在 C 大调的句子后面，再放在 G 大调的句子结尾。听起来"作用"一样吗？', '同じ G の和音を、ハ長調のフレーズの後と、ト長調のフレーズの終わりに。「働き」は同じに聞こえる？', 'The same G chord, first after a C-major phrase, then ending a G-major phrase. Does it do the same job?'),
        play: [
          { label: t('C 大调：…→ G', 'ハ長調：…→ G', 'C major: … → G'), audio: { chords: [[48, 64, 67, 72], [53, 65, 69, 72], [43, 62, 67, 71]], gap: 800 } },
          { label: t('G 大调：…→ G', 'ト長調：…→ G', 'G major: … → G'), audio: { chords: [[48, 64, 67, 72], [50, 62, 66, 69], [43, 59, 67, 71]], gap: 800 } },
        ],
        options: [t('不一样：在 C 大调里它是 V（等着回家），在 G 大调里它是 I（已经到家）', '違う：ハ長調では V（帰りたがる）、ト長調では I（着いた）', 'Different: in C it is V (wants to go home), in G it is I (home)'), t('完全一样，都是 G', 'まったく同じ、どちらも G', 'Exactly the same — both G'), t('听不出区别', '違いが分からない', 'No difference')],
        answer: 0,
        insight: {
          title: t('两套名字，回答两个问题', '2 つの名前は 2 つの問いに答える', 'Two naming systems answer two questions'),
          text: t('和弦符号写的是根音、性质、延伸音和低音，不指明调；罗马数字写的是根音在调里的音级、性质和转位，所以离不开调。同一个 G，在 C 大调是 V，在 G 大调是 I，在 D 大调是 IV。', 'コード・シンボルは根音・種類・拡張音・バスを書き、調は指定しない。ローマ数字は根音の調の中での音度・種類・転回を書くので、調と切り離せない。同じ G がハ長調で V、ト長調で I、ニ長調で IV。', 'Chord symbols give root, quality, extensions and bass without naming a key; Roman numerals give the root’s scale degree, quality and inversion, so they depend on the key. The same G is V in C, I in G, IV in D.'),
        },
      },
    ],
    explain: [
      {
        id: 'b22-e1', type: 'page', ref: 'omt2e-chord-symbols',
        title: t('和弦符号的默认值', 'コード・シンボルの既定値', 'Chord-symbol defaults'),
        text: [
          t('只写一个字母就是大三和弦；加上的七度默认是小七度（G7 = G B D F）；其他延伸音和加音默认是大或纯音程。变化音用升降号（或 +/−）标出。', '文字だけなら長三和音。加えた 7 度は既定で短 7 度（G7 = G B D F）。ほかの拡張音や付加音は既定で長か完全。変化は ♯♭（または +/−）で。', 'A letter alone means a major triad; an added seventh is minor by default (G7 = G B D F); other extensions are major or perfect. Alterations use sharps and flats (or +/−).'),
        ],
      },
      {
        id: 'b22-e2', type: 'page', ref: 'omt2e-roman-numerals',
        tool: { feature: 'circle' },
        title: t('罗马数字：大小写就是性质', 'ローマ数字：大文字・小文字が種類', 'Roman numerals: case is quality'),
        text: [
          t('大写 = 大三，小写 = 小三，° = 减三，+ = 增三；七和弦加 7，半减七用 ø，减七用 °。', '大文字 = 長三、小文字 = 短三、° = 減三、+ = 増三。七の和音は 7、半減七は ø、減七は °。', 'Upper case = major, lower case = minor, ° = diminished, + = augmented; add 7 for sevenths, ø for half-diminished, ° for fully diminished.'),
          t('大调：I ii iii IV V vi vii°；小调：i ii° III iv v（用升高的导音时是 V）VI VII（升高导音时是 vii°）。', '長調：I ii iii IV V vi vii°。短調：i ii° III iv v（導音を上げると V）VI VII（上げると vii°）。', 'Major: I ii iii IV V vi vii°. Minor: i ii° III iv v (V with the raised leading tone) VI VII (vii° when raised).'),
        ],
      },
      {
        id: 'b22-e3', type: 'discover', practice: true, ref: 'omt2e-roman-numerals',
        prompt: t('E 小调里的 B7 是几级？', 'ホ短調の B7 は何度？', 'In E minor, what is B7?'),
        options: ['V7', 'v7', 'VII7'],
        answer: 0,
        insight: { title: t('升高的导音让 v 变成 V', '導音を上げると v が V に', 'The raised leading tone turns v into V'), text: t('E 小调的第五级是 B；用升高的导音 D♯ 时，B–D♯–F♯ 是大三和弦，加小七度 A 就是 V7（属七）。', 'ホ短調の第 5 音は B。導音 D♯ を使うと B–D♯–F♯ は長三和音、短 7 度 A を加えて V7（属七）。', 'E minor’s fifth degree is B; with the raised leading tone D♯, B–D♯–F♯ is major, and the minor seventh A makes V7.') },
      },
    ],
    experiment: [
      { id: 'b22-x1', type: 'experiment', toy: 'keyChords', ref: ['omt2e-roman-numerals', 'omt2e-chord-symbols'],
        prompt: t('盯住一个和弦（例如 G），在不同的调之间切换，看它在每个调里是几级；再切到七和弦看看。', '1 つの和音（G など）に注目して調を切り替え、各調で何度かを見よう。七の和音にも切り替えて。', 'Watch one chord (say G) and switch keys to see its numeral in each; then switch to seventh chords.'),
        params: { keys: [['C', 'major'], ['G', 'major'], ['D', 'major'], ['F', 'major'], ['E', 'minor'], ['A', 'minor']], watch: ['G', 'Am', 'D', 'B7'] },
        breakthrough: { id: 'b22-watch', text: t('你看到了：同一个符号，在不同的调里扮演不同的角色。', '同じシンボルが調によって違う役を演じる——見えた。', 'You saw one symbol play different roles in different keys.') } },
    ],
    challenge: [
      {
        id: 'b22-c1', type: 'choice', error: 'wrong-function', skills: ['function'], ref: 'omt2e-roman-numerals',
        variants: [
          { prompt: t('F 大调里，Gm 是几级？', 'ヘ長調で Gm は何度？', 'In F major, what is Gm?'), options: ['ii', 'II', 'iv', 'vi'] },
          { prompt: t('D 大调里，Bm 是几级？', 'ニ長調で Bm は何度？', 'In D major, what is Bm?'), options: ['vi', 'VI', 'ii', 'iii'] },
          { prompt: t('A 小调里，F 是几级？', 'イ短調で F は何度？', 'In A minor, what is F?'), options: ['VI', 'vi', 'IV', 'III'] },
        ],
        answer: 0,
        explain: t('先找根音在调里的音级，再用大小写表示性质：小三用小写，大三用大写。', 'まず根音の音度、次に大文字・小文字で種類：短三は小文字、長三は大文字。', 'Find the root’s scale degree, then use case for quality: lower case minor, upper case major.'),
      },
      {
        id: 'b22-c2', type: 'choice', error: 'wrong-chord', skills: ['spell'], ref: ['omt2e-roman-numerals', 'omt2e-chord-symbols'],
        variants: [
          { prompt: t('B♭ 大调的 V7 写成和弦符号是？', '変ロ長調の V7 をコード・シンボルで書くと？', 'V7 in B♭ major as a chord symbol is…'), options: ['F7', 'Fmaj7', 'Fm7', 'E♭7'] },
          { prompt: t('G 大调的 viiø7 写成和弦符号是？', 'ト長調の viiø7 をコード・シンボルで書くと？', 'viiø7 in G major as a chord symbol is…'), options: ['F♯ø7', 'F♯°7', 'F♯m7', 'F7'] },
          { prompt: t('E♭ 大调的 IVmaj7（IV7）写成和弦符号是？', '変ホ長調の IV7 をコード・シンボルで書くと？', 'IV7 in E♭ major as a chord symbol is…'), options: ['A♭maj7', 'A♭7', 'A♭m7', 'B♭maj7'] },
        ],
        answer: 0,
        explain: t('大调里：V7 是属七（大三 + 小七），viiø7 是半减七，IV7 是大七。', '長調で：V7 は属七（長三 + 短 7）、viiø7 は半減七、IV7 は長七。', 'In major: V7 is a dominant seventh (major triad + minor seventh), viiø7 half-diminished, IV7 a major seventh.'),
      },
      {
        id: 'b22-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: 'omt2e-chord-symbols',
        variants: [
          { prompt: t('和弦符号 D7 里的七度默认是？', 'コード・シンボル D7 の 7 度は既定で？', 'In the chord symbol D7, the seventh is by default…'), options: [t('小七度（C）', '短 7 度（C）', 'A minor seventh (C)'), t('大七度（C♯）', '長 7 度（C♯）', 'A major seventh (C♯)'), t('减七度（C♭）', '減 7 度（C♭）', 'A diminished seventh (C♭)'), t('要看调号', '調号しだい', 'Depends on the key')] },
          { prompt: t('和弦符号只写一个 E♭，表示？', 'コード・シンボルが E♭ だけなら？', 'A chord symbol that is just E♭ means…'), options: [t('E♭ 大三和弦', 'E♭ 長三和音', 'An E♭ major triad'), t('E♭ 小三和弦', 'E♭ 短三和音', 'An E♭ minor triad'), t('只弹一个 E♭', 'E♭ 1 音だけ', 'Play the single note E♭'), t('E♭ 属七和弦', 'E♭ 属七', 'An E♭ dominant seventh')] },
        ],
        answer: 0,
        explain: t('和弦符号以大三和弦为默认；加上的七度默认是小七度，和调号无关。', 'コード・シンボルは長三和音が既定、加えた 7 度は既定で短 7 度。調号とは関係ない。', 'Chord symbols default to a major triad, and an added seventh is minor — regardless of key signature.'),
      },
      G('b22-g1', 'romanChord', 2, ['function', 'identify']),
      G('b22-g2', 'chordSymbolNotes', 1, ['spell']),
    ],
  },
  pool: [G('b22-p1', 'romanChord', 3, ['function', 'identify']), G('b22-p2', 'chordSymbolNotes', 3, ['spell']), G('b22-p3', 'seventhSpell', 2, ['spell'])],
};

// ===================== B2-3 数字低音与八度法则 =====================
export const LEVEL_B2_3 = {
  minutes: 18, core: true,
  insight: t('八度法则其实是一张"给低音配和弦"的速查表：先找主和属这两个稳定点，中间用六和弦连起来。', 'オクターヴの規則は「バスに和音をつける」早見表：まず主と属の 2 つの支点を決め、間を六の和音でつなぐ。', 'The Rule of the Octave is a cheat sheet for harmonising a bass: fix the two pillars, tonic and dominant, and connect them with sixth chords.'),
  sections: {
    discover: [
      {
        id: 'b23-d1', type: 'discover', ref: 'omt2e-galant-rule-octave',
        prompt: t('同一条上行低音 C D E F G：A 版全部用六和弦，B 版在 C 和 G 上用原位三和弦、其余用六和弦。哪一版更有"起点和落点"？', '同じ上行バス C D E F G：A はすべて六の和音、B は C と G で基本形、ほかは六の和音。「出発点と着地点」があるのはどっち？', 'One rising bass C D E F G: A uses sixth chords throughout; B uses root-position triads on C and G and sixth chords elsewhere. Which has a clearer start and arrival?'),
        play: [
          { label: t('A：全是六和弦', 'A：すべて六の和音', 'A: all sixth chords'), audio: { chords: [[48, 57, 64], [50, 59, 65], [52, 60, 67], [53, 62, 69], [55, 64, 71]], gap: 650 } },
          { label: t('B：首尾 5/3', 'B：始めと終わりが 5/3', 'B: 5/3 at the ends'), audio: { chords: ROT3, gap: 650 } },
        ],
        options: [t('B：主音和属音上用原位，像两根柱子', 'B：主音と属音で基本形、2 本の柱のよう', 'B: root position on tonic and dominant, like two pillars'), t('A 更有方向', 'A のほうが方向がある', 'A has more direction'), t('一样', '同じ', 'The same')],
        answer: 0,
        insight: {
          title: t('先立柱子，再搭桥', 'まず柱、次に橋', 'Pillars first, then bridges'),
          text: t('OMT 用四步搭起八度法则：先全部用平行六和弦（没错，但没有层次）；再在第一个和最后一个主和弦上用原位 5/3；然后属音上也用 5/3；最后在主和弦与属和弦前面加上七和弦。八度法则是 partimento 传统里给低音配和弦的"速查表"，OMT 用的版本接近 1775 年那不勒斯的 Fenaroli。', 'OMT は 4 段階でオクターヴの規則を組み立てる：まず平行の六の和音（誤りではないが階層がない）、次に最初と最後の主和音を基本形 5/3 に、さらに属音も 5/3 に、最後に主和音と属和音の前に七の和音を置く。partimento の伝統でバスに和音をつける「早見表」で、OMT の版は 1775 年ナポリの Fenaroli に近い。', 'OMT builds the Rule in four steps: parallel sixth chords throughout (correct but flat); root-position 5/3 on the first and last tonic; 5/3 on the dominant too; finally seventh chords before tonic and dominant chords. It is the partimento tradition’s cheat sheet for harmonising basses; OMT’s version is close to Fenaroli (Naples, 1775).'),
        },
      },
    ],
    explain: [
      {
        id: 'b23-e1', type: 'page', ref: 'omt2e-figured-bass',
        title: t('从数字到和弦', '数字から和音へ', 'From figures to chords'),
        text: [
          t('把数字低音变成和弦叫"实现"（realizing）。数字写的是低音上方的音程：没写（5/3）是原位，6 是第一转位，6/4 是第二转位；七和弦是 7、6/5、4/3、4/2。', '数字付き低音を和音にすることを「リアライズ」という。数字はバスから上の音程：無記入（5/3）は基本形、6 は第 1 転回、6/4 は第 2 転回、七の和音は 7・6/5・4/3・4/2。', 'Turning figures into chords is called realizing. Figures are intervals above the bass: none (5/3) is root position, 6 first inversion, 6/4 second; seventh chords are 7, 6/5, 4/3, 4/2.'),
        ],
      },
      {
        id: 'b23-e2', type: 'demo', ref: 'omt2e-galant-rule-octave',
        title: t('八度法则的四步', 'オクターヴの規則の 4 段階', 'The Rule in four steps'),
        steps: [
          { text: t('第一步：上行音阶全部配平行六和弦——没有错误，但也没有层次。', '第 1 段階：上行音階すべてに平行の六の和音——誤りはないが階層もない。', 'Step 1: parallel sixth chords on every note — no errors, but no hierarchy.'), audio: { chords: [[48, 57, 64], [50, 59, 65], [52, 60, 67], [53, 62, 69], [55, 64, 71]], gap: 600 } },
          { text: t('第二步：第一个和最后一个主和弦用原位 5/3，给出"起点"和"终点"。', '第 2 段階：最初と最後の主和音を基本形 5/3 にし、「始まり」と「終わり」を示す。', 'Step 2: root-position 5/3 on the first and last tonic, marking start and end.') },
          { text: t('第三步：属音上也用 5/3——主和属是两个"稳定点"。', '第 3 段階：属音も 5/3 に——主と属は 2 つの「支点」。', 'Step 3: 5/3 on the dominant too — tonic and dominant are the two pillars.'), audio: { chords: ROT3, gap: 650 } },
          { text: t('第四步：在主和弦和属和弦前面加上七和弦，不协和让耳朵更想走到下一个稳定点。其中一处还加了半音变化，更强地指向属。', '第 4 段階：主和音と属和音の前に七の和音を置き、不協和で次の支点へ向かわせる。1 か所には半音の変化を加えて属をより強く指す。', 'Step 4: seventh chords before tonic and dominant chords, their dissonance pulling toward the next pillar. One spot also gets a chromatic alteration, pointing harder at the dominant.') },
        ],
      },
      {
        id: 'b23-e3', type: 'discover', practice: true, ref: 'omt2e-galant-rule-octave',
        prompt: t('按第三步（主和属用 5/3、其余用 6）给上行低音 C D E F G 配和弦，D 上是什么？', '第 3 段階（主・属は 5/3、ほかは 6）で上行バス C D E F G に和音をつけると、D の上は？', 'Using step 3 (5/3 on tonic and dominant, 6 elsewhere) on the rising bass C D E F G, what goes over D?'),
        options: [t('D 上的六和弦：B–D–F（vii°6）', 'D の上の六の和音：B–D–F（vii°6）', 'A sixth chord over D: B–D–F (vii°6)'), t('D 小三和弦原位（ii）', 'D 短三和音の基本形（ii）', 'D minor in root position (ii)'), t('G 大三和弦（V）', 'G 長三和音（V）', 'G major (V)')],
        answer: 0,
        insight: { title: t('6 = 低音上方三度和六度', '6 = バスから 3 度と 6 度', '6 = a third and sixth above the bass'), text: t('D 上方三度是 F、六度是 B：B–D–F 的第一转位，也就是 vii°6。', 'D の 3 度上は F、6 度上は B：B–D–F の第 1 転回、つまり vii°6。', 'A third above D is F and a sixth is B: B–D–F in first inversion — vii°6.') },
      },
    ],
    experiment: [
      { id: 'b23-x1', type: 'experiment', toy: 'progression', ref: ['omt2e-galant-rule-octave', 'omt2e-figured-bass'],
        prompt: t('低音固定是 C D E F G。每个音上选原位还是六和弦，播放整句，找出最有"柱子与桥"感觉的组合。', 'バスは C D E F G 固定。各音で基本形か六の和音を選び、全体を再生して「柱と橋」の感じが最も強い組み合わせを探そう。', 'The bass is fixed: C D E F G. Choose root position or a sixth chord on each note, play the phrase, and find the combination with the clearest “pillars and bridges”.'),
        params: { gap: 700, slots: [
          { fn: 'T', fnLabel: t('主', '主', 'T'), options: [{ label: 'C: 5/3', notes: [48, 64, 67, 72] }, { label: 'C: 6', notes: [48, 57, 64, 69] }] },
          { options: [{ label: 'D: 6', notes: [50, 62, 65, 71] }, { label: 'D: 5/3', notes: [50, 62, 65, 69] }] },
          { options: [{ label: 'E: 6', notes: [52, 60, 67, 72] }, { label: 'E: 5/3', notes: [52, 59, 67, 71] }] },
          { options: [{ label: 'F: 6', notes: [53, 57, 65, 74] }, { label: 'F: 5/3', notes: [53, 57, 65, 72] }] },
          { fn: 'D', fnLabel: t('属', '属', 'D'), options: [{ label: 'G: 5/3', notes: [43, 59, 62, 74] }, { label: 'G: 6', notes: [43, 59, 64, 71] }] },
        ] },
        breakthrough: { id: 'b23-pillars', text: t('你亲耳听出了"柱子与桥"：主和属立住，中间用六和弦连起来。', '「柱と橋」を自分の耳で聴き取った：主と属が立ち、間を六の和音がつなぐ。', 'You heard the pillars and bridges: tonic and dominant stand firm, sixth chords connect them.') } },
    ],
    challenge: [
      {
        id: 'b23-c1', type: 'choice', error: 'wrong-inversion', skills: ['apply'], ref: 'omt2e-figured-bass',
        variants: [
          { prompt: t('C 大调，低音 E，数字 6。上方是哪两个音？', 'ハ長調、バス E、数字 6。上の 2 音は？', 'C major, bass E, figure 6. Which two notes go above?'), options: ['G、C', 'G、B', 'A、C', 'F、A'] },
          { prompt: t('C 大调，低音 G，数字 6/4。上方是哪两个音？', 'ハ長調、バス G、数字 6/4。上の 2 音は？', 'C major, bass G, figures 6/4. Which two notes go above?'), options: ['C、E', 'B、D', 'C、D', 'B、E'] },
          { prompt: t('C 大调，低音 F，数字 6。上方是哪两个音？', 'ハ長調、バス F、数字 6。上の 2 音は？', 'C major, bass F, figure 6. Which two notes go above?'), options: ['A、D', 'A、C', 'B、D', 'G、C'] },
        ],
        answer: 0,
        explain: t('数字就是低音上方的音程：E 上方三度 G、六度 C；G 上方四度 C、六度 E；F 上方三度 A、六度 D。', '数字はバスから上の音程：E の 3 度上 G、6 度上 C。G の 4 度上 C、6 度上 E。F の 3 度上 A、6 度上 D。', 'Figures are intervals above the bass: over E a third G and sixth C; over G a fourth C and sixth E; over F a third A and sixth D.'),
      },
      {
        id: 'b23-c2', type: 'choice', error: 'concept', skills: ['apply'], ref: 'omt2e-galant-rule-octave',
        variants: [
          { prompt: t('八度法则搭建的第四步做什么？', 'オクターヴの規則の第 4 段階は？', 'What does step 4 of building the Rule do?'), options: [t('在主和弦与属和弦前面加七和弦', '主和音と属和音の前に七の和音を置く', 'Add seventh chords before tonic and dominant chords'), t('全部改成原位', 'すべて基本形にする', 'Make everything root position'), t('把低音改成下行', 'バスを下行にする', 'Make the bass descend'), t('去掉所有六和弦', '六の和音をすべて取る', 'Remove all sixth chords')] },
          { prompt: t('按八度法则的第三步，上行音阶里哪些音级用原位 5/3？', 'オクターヴの規則の第 3 段階で、上行音階のどの音度が基本形 5/3？', 'In step 3 of the Rule, which degrees of the rising scale take root-position 5/3?'), options: [t('第 1、5 级和最高的第 1 级', '第 1・5 音と最上の第 1 音', 'Degrees 1, 5 and the top 1'), t('每一级', 'すべての音度', 'Every degree'), t('只有第 4 级', '第 4 音だけ', 'Only degree 4'), t('第 2、6 级', '第 2・6 音', 'Degrees 2 and 6')] },
        ],
        answer: 0,
        explain: t('四步：平行六和弦 → 首尾主和弦 5/3 → 属音 5/3 → 主与属之前加七和弦。', '4 段階：平行の六 → 始めと終わりの主和音 5/3 → 属音 5/3 → 主と属の前に七の和音。', 'Four steps: parallel sixths → 5/3 on the first and last tonic → 5/3 on the dominant → sevenths before tonic and dominant.'),
      },
      {
        id: 'b23-c3', type: 'choice', error: 'wrong-note', skills: ['spell'], ref: 'omt2e-figured-bass',
        variants: [
          { prompt: t('A 小调，低音 E，数字 ♯（没有数字）。改变的是哪个音？', 'イ短調、バス E、数字なしの ♯。変わるのはどの音？', 'A minor, bass E, a lone ♯. Which note is altered?'), options: [t('低音上方三度：G 变成 G♯', 'バスの 3 度上：G が G♯ に', 'The third above the bass: G becomes G♯'), t('低音本身变成 E♯', 'バス自身が E♯ に', 'The bass itself becomes E♯'), t('低音上方五度：B 变成 B♯', '5 度上：B が B♯ に', 'The fifth: B becomes B♯'), t('低音上方六度：C 变成 C♯', '6 度上：C が C♯ に', 'The sixth: C becomes C♯')] },
          { prompt: t('D 小调，低音 A，数字 ♯6。改变的是哪个音？', 'ニ短調、バス A、数字 ♯6。変わるのはどの音？', 'D minor, bass A, figure ♯6. Which note is altered?'), options: [t('低音上方六度：F 变成 F♯', 'バスの 6 度上：F が F♯ に', 'The sixth above the bass: F becomes F♯'), t('低音上方三度：C 变成 C♯', '3 度上：C が C♯ に', 'The third: C becomes C♯'), t('低音本身变成 A♯', 'バス自身が A♯ に', 'The bass becomes A♯'), t('不改变任何音', '何も変わらない', 'Nothing changes')] },
        ],
        answer: 0,
        explain: t('升降号写在哪个数字前面就改变哪个音；单独的升降号指低音上方三度。', '臨時記号は前に書かれた数字の音を変える。数字なしの臨時記号はバスの 3 度上。', 'An accidental alters the note of the figure it precedes; a lone accidental applies to the third above the bass.'),
      },
      G('b23-g1', 'inversionBass', 2, ['identify']),
      G('b23-g2', 'romanChord', 1, ['function']),
    ],
    lab: [{ id: 'b23-lab', type: 'lab', lab: 'fb-rule-octave', mandatory: true, minutes: 6 }],
  },
  pool: [G('b23-p1', 'inversionBass', 3, ['identify', 'apply']), G('b23-p2', 'romanChord', 3, ['function']), G('b23-p3', 'triadSpell', 2, ['spell'])],
};

// ===================== B2-5 和声功能与乐句模型 =====================
export const LEVEL_B2_5 = {
  minutes: 13,
  insight: t('IV 和 ii6 低音都是 fa，做的是同一件事：预告属和弦就要来了。', 'IV と ii6 はどちらもバスが fa で、同じ仕事をする：もうすぐ属和音が来ると予告する。', 'IV and ii6 both put fa in the bass and do the same job: announce that the dominant is coming.'),
  sections: {
    discover: [
      {
        id: 'b25-d1', type: 'discover', ref: 'omt2e-predominants',
        prompt: t('两句的头尾都一样（I … V – I），中间一个用 IV、一个用 ii6。听低音和"往前推"的感觉，有什么共同点？', '2 つのフレーズは頭と終わりが同じ（I … V – I）、真ん中が IV と ii6。バスと「前に進む」感じに共通点は？', 'Two phrases with the same start and end (I … V – I); the middle chord is IV in one and ii6 in the other. What do the bass and the forward push have in common?'),
        play: [
          { label: 'I–IV–V–I', audio: { chords: [V4.I, V4.IV, V4.Vhalf, V4.Iend], gap: 800 } },
          { label: 'I–ii6–V–I', audio: { chords: [V4.I, V4.ii6, V4.Vhalf, V4.Iend], gap: 800 } },
        ],
        options: [t('低音都是 F（fa），都让人等着属和弦', 'どちらもバスが F（fa）、属和音を待たせる', 'Both have F (fa) in the bass and make you expect the dominant'), t('IV 更像回家，ii6 更像出发', 'IV は帰宅、ii6 は出発', 'IV feels like home, ii6 like leaving'), t('没有共同点', '共通点はない', 'Nothing in common')],
        answer: 0,
        insight: {
          title: t('功能看"去哪里"，不看名字', '機能は名前ではなく「行き先」', 'Function is about where a chord leads'),
          text: t('和声功能分三类：主（稳定，只有 I）、下属（离开主、走向属；IV 与 ii 是强下属，iii 与 vi 是弱下属）、属（急着回主：V 与 vii°）。IV 和 ii6 都给低音 fa 配和声，都在预告属和弦。', '和声機能は 3 つ：主（安定、I だけ）、下属（主から離れ属へ。IV と ii は強い下属、iii と vi は弱い下属）、属（主へ急ぐ：V と vii°）。IV と ii6 はどちらもバス fa に和音をつけ、属和音を予告する。', 'Three functions: tonic (stable — only I), predominant (leaving tonic toward dominant; IV and ii are strong, iii and vi weak), dominant (urgent to return: V and vii°). IV and ii6 both harmonise fa in the bass and both announce the dominant.'),
        },
      },
    ],
    explain: [
      {
        id: 'b25-e1', type: 'page', ref: ['omt2e-cadences', 'omt2e-tonic-v6'],
        tool: { feature: 'circle' },
        title: t('乐句模型：T → PD → D → T', 'フレーズ・モデル：T → PD → D → T', 'The phrase model: T → PD → D → T'),
        text: [
          t('一个乐句的功能通常按这个顺序流动：从主出发、经过下属、到属、再回主（或停在属上形成半终止）。', 'フレーズの機能はふつうこの順で流れる：主から出て、下属を通り、属へ、そして主へ戻る（または属で止まって半終止）。', 'A phrase’s functions usually flow in this order: start on tonic, pass through predominant, reach dominant, return to tonic (or stop on the dominant for a half cadence).'),
          t('开头常常要"延长"主和弦：最常见的办法是在主和弦之间放 V6 或转位的 V7，让主和弦的影响持续更久。', '冒頭ではよく主和音を「引き延ばす」：最もよくあるのは主和音の間に V6 や転回形の V7 を置くこと。', 'Openings often prolong the tonic: most commonly with V6 or inverted V7 chords between tonic chords.'),
        ],
      },
      {
        id: 'b25-e2', type: 'discover', practice: true, ref: 'omt2e-phrase-model',
        prompt: t('分析一个乐句时，OMT 建议先从哪里下手？', 'フレーズを分析するとき、OMT はどこから始めるよう勧める？', 'When analysing a phrase, where does OMT suggest starting?'),
        options: [t('先找乐句结尾的终止', 'まずフレーズ終わりの終止', 'The cadence at the end'), t('第一个和弦', '最初の和音', 'The first chord'), t('最高的音', '一番高い音', 'The highest note')],
        answer: 0,
        insight: { title: t('从终点往回找', 'ゴールから逆にたどる', 'Work back from the goal'), text: t('先听出乐句结尾、分析终止；再往前找通往终止的强下属（低音多半是 fa）；最后回到乐句开头往后分析。', 'まずフレーズの終わりを聴き取って終止を分析、次に終止へ向かう強い下属（バスはたいてい fa）、最後にフレーズの頭から分析。', 'Find and analyse the cadence first, then the strong predominant leading to it (fa usually in the bass), and finally analyse from the beginning.') },
      },
    ],
    experiment: [
      { id: 'b25-x1', type: 'experiment', toy: 'progression', ref: ['omt2e-cadences', 'omt2e-predominants'],
        prompt: t('每个槽位按功能上色。换一换下属（IV、ii6、ii）和属（V、V7），播放整句，听"往前推"的力量怎么变。', '各スロットは機能で色分け。下属（IV・ii6・ii）と属（V・V7）を替えて全体を再生し、「前へ押す」力の変化を聴こう。', 'Each slot is coloured by function. Swap the predominant (IV, ii6, ii) and dominant (V, V7), play the phrase, and hear how the forward push changes.'),
        params: { slots: [
          { fn: 'T', fnLabel: t('主', '主', 'T'), options: [{ label: 'I', notes: V4.I }] },
          { fn: 'PD', fnLabel: t('下属', '下属', 'PD'), options: [{ label: 'IV', notes: V4.IV }, { label: 'ii6', notes: V4.ii6 }, { label: 'ii', notes: V4.ii }] },
          { fn: 'D', fnLabel: t('属', '属', 'D'), options: [{ label: 'V', notes: V4.Vhalf }, { label: 'V7', notes: V4.V7 }] },
          { fn: 'T', fnLabel: t('主', '主', 'T'), options: [{ label: 'I', notes: V4.Iend }] },
        ] },
        breakthrough: { id: 'b25-model', text: t('你亲手搭出了一个完整的乐句模型。', '自分の手でフレーズ・モデルを組み立てた。', 'You built a complete phrase model yourself.') } },
    ],
    challenge: [
      {
        id: 'b25-c1', type: 'choice', error: 'wrong-function', skills: ['function'], ref: 'omt2e-cadences',
        variants: [
          { prompt: t('大调里，下面哪个和弦是"弱下属"？', '長調で「弱い下属」は？', 'In major, which is a weak predominant?'), options: ['vi', 'IV', 'ii', 'V'] },
          { prompt: t('大调里，下面哪个和弦是属功能？', '長調で属機能の和音は？', 'In major, which chord has dominant function?'), options: ['vii°', 'IV', 'vi', 'iii'] },
          { prompt: t('大调里，下面哪个和弦是强下属？', '長調で強い下属は？', 'In major, which is a strong predominant?'), options: ['ii', 'iii', 'vi', 'vii°'] },
        ],
        answer: 0,
        explain: t('主：I；强下属：IV、ii；弱下属：iii、vi；属：V、vii°。', '主：I、強い下属：IV・ii、弱い下属：iii・vi、属：V・vii°。', 'Tonic: I; strong PD: IV, ii; weak PD: iii, vi; dominant: V, vii°.'),
      },
      {
        id: 'b25-c2', type: 'choice', error: 'wrong-function', skills: ['function', 'apply'], ref: 'omt2e-predominants',
        variants: [
          { prompt: t('乐句里，强下属的低音通常是哪个音级？', 'フレーズで強い下属のバスはふつうどの音度？', 'In a phrase, what scale degree is usually in the bass of a strong predominant?'), options: [t('fa（第 4 级）', 'fa（第 4 音）', 'fa (degree 4)'), t('do（第 1 级）', 'do（第 1 音）', 'do (degree 1)'), t('ti（第 7 级）', 'ti（第 7 音）', 'ti (degree 7)'), t('mi（第 3 级）', 'mi（第 3 音）', 'mi (degree 3)')] },
          { prompt: t('用强下属写四部和声时，最常见的错误是？', '強い下属で 4 声体を書くときに最も多い誤りは？', 'The most common part-writing error with strong predominants is…'), options: [t('平行八度或五度', '平行 8 度・5 度', 'Parallel octaves or fifths'), t('导音重复', '導音の重複', 'Doubled leading tone'), t('七音没有解决', '第 7 音の未解決', 'Unresolved seventh'), t('超出音域', '音域外', 'Out of range')] },
        ],
        answer: 0,
        explain: t('IV 与 ii6 都给 fa 配和声；IV 到 V 根音级进，最容易所有声部一起上行而出现平行，上方声部尽量和低音反向。', 'IV と ii6 はどちらも fa に和音をつける。IV → V は根音が順次進行で、全声部が一緒に上がって平行になりやすい。上声はバスと反行に。', 'IV and ii6 both harmonise fa; IV to V moves its root by step, so all voices rising together easily makes parallels — move the upper voices against the bass.'),
      },
      {
        id: 'b25-c3', type: 'listen', error: 'wrong-function', skills: ['hearing'], ref: 'omt2e-cadences',
        prompt: t('听：这句停在哪个功能上？', '聴いて：このフレーズはどの機能で止まる？', 'Listen: on which function does this phrase stop?'),
        options: [t('主（回到 I）', '主（I に戻る）', 'Tonic (back to I)'), t('属（停在 V）', '属（V で止まる）', 'Dominant (stops on V)'), t('下属（停在 IV）', '下属（IV で止まる）', 'Predominant (stops on IV)'), t('听不出', '分からない', 'Can’t tell')],
        variants: [
          { play: [{ label: t('播放', '再生', 'Play'), audio: { chords: [V4.I, V4.IV, V4.Vhalf, V4.Iend], gap: 800 } }], answer: 0 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: { chords: [V4.I, V4.ii6, V4.Vhalf], gap: 800 } }], answer: 1 },
        ],
        explain: t('停在 V 上有"没说完"的感觉（半终止）；回到 I 是到家了（正格终止）。', 'V で止まると「言い終わっていない」感じ（半終止）。I に戻ると帰宅（正格終止）。', 'Stopping on V sounds unfinished (half cadence); returning to I is home (authentic cadence).'),
      },
      G('b25-g1', 'dominantMotion', 2, ['function']),
      G('b25-g2', 'romanChord', 1, ['identify']),
    ],
  },
  pool: [G('b25-p1', 'dominantMotion', 3, ['function']), G('b25-p2', 'romanChord', 3, ['identify', 'function']), G('b25-p3', 'cadenceType', 2, ['hearing', 'function'])],
};

// ===================== B2-6 终止式与四六和弦 =====================
export const LEVEL_B2_6 = {
  minutes: 14,
  insight: t('终止四六写出来像 I，听起来却是 V：它其实是装饰属和弦的两个音。', '終止の四六は書くと I に見えるが、聞こえるのは V：属和音を飾る 2 つの音。', 'The cadential 6/4 looks like I but sounds like V: it is really two embellishing tones over the dominant.'),
  sections: {
    discover: [
      {
        id: 'b26-d1', type: 'discover', ref: 'omt2e-cad64',
        prompt: t('听 ii6 → ? → V → I。中间那个和弦的音是 C、E、G，但低音是 G。它更像"回到主和弦"，还是"已经到了属音、上面还没落定"？', 'ii6 → ? → V → I を聴こう。真ん中の和音は C・E・G だがバスは G。「主和音に戻った」？ それとも「属音に着いたが上がまだ落ち着かない」？', 'Hear ii6 → ? → V → I. The middle chord is C, E, G over a G in the bass. Does it sound like a return to tonic, or like arriving on the dominant with the upper notes not yet settled?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: { chords: [V4.ii6, V4.cad64, V4.V7c, V4.Ic], gap: 850 } }],
        options: [t('已经到了属音，上方两个音还要往下落', '属音に着いていて、上の 2 音はまだ下がる', 'Arrived on the dominant; two upper notes still have to fall'), t('回到了主和弦', '主和音に戻った', 'A return to the tonic'), t('是一个新的调', '新しい調', 'A new key')],
        answer: 0,
        insight: {
          title: t('cad.6/4 是属的装饰', 'cad.6/4 は属の装飾', 'The cadential 6/4 decorates the dominant'),
          text: t('终止四六是低音 sol 上方的六度和四度两个装饰音，所以标成 cad.6/4 而不是 I6/4：它出现在强下属之后，低音是 sol，听起来是对 V 的装饰。解决时六度下行到五度、四度下行到三度。', '終止の四六はバス sol の 6 度と 4 度上の 2 つの装飾音なので、I6/4 ではなく cad.6/4 と書く：強い下属のあとに来て、バスは sol、V の装飾に聞こえる。解決では 6 度が 5 度へ、4 度が 3 度へ下がる。', 'The cadential 6/4 is two embellishing tones, a sixth and a fourth above sol in the bass — hence cad.6/4, not I6/4: it follows a strong predominant, has sol in the bass and sounds like an elaboration of V. The sixth falls to a fifth and the fourth to a third.'),
        },
      },
    ],
    explain: [
      {
        id: 'b26-e1', type: 'page', ref: 'omt2e-cadences',
        title: t('完满、不完满与半终止', '完全・不完全・半終止', 'Perfect, imperfect and half cadences'),
        text: [
          t('正格终止是 V–I。两个和弦都是原位、而且女高落在 do 上，叫完满正格终止（PAC）；少一个条件就是不完满正格终止（IAC）。', '正格終止は V–I。両方が基本形で、ソプラノが do なら完全正格終止（PAC）、条件が欠ければ不完全正格終止（IAC）。', 'An authentic cadence is V–I. Both in root position with do in the soprano makes a perfect authentic cadence (PAC); otherwise it is imperfect (IAC).'),
          t('半终止是 x–V：停在属和弦上。', '半終止は x–V：属和音で止まる。', 'A half cadence is x–V: it stops on the dominant.'),
        ],
      },
      {
        id: 'b26-e2', type: 'page', ref: 'omt2e-64-chords',
        title: t('另外三种四六和弦', 'ほかの 3 つの四六の和音', 'Three more six-four chords'),
        text: [
          t('经过四六：低音的经过音上的和弦，两边的和弦属于同一功能（延长主或下属）。辅助四六：低音不动，上方两个声部做上邻音，两边都是原位（延长主或属）。琶音四六：低音在和弦里琶音到五音，分析时一般不特别标出。', '経過の四六：バスの経過音上の和音で、両側は同じ機能（主か下属の引き延ばし）。補助の四六：バスは動かず、上の 2 声が上方隣接音、両側は基本形（主か属の引き延ばし）。アルペッジョの四六：バスが第 5 音へアルペッジョ、分析ではふつう表示しない。', 'Passing 6/4: a chord over a passing bass, between chords of the same function (prolonging tonic or predominant). Neighbour 6/4: static bass, two upper voices move to upper neighbours, root position on both sides (prolonging tonic or dominant). Arpeggiating 6/4: the bass arpeggiates to the fifth; usually not labelled.'),
        ],
      },
      {
        id: 'b26-e3', type: 'discover', practice: true, ref: 'omt2e-la-bass',
        prompt: t('V7 → vi：耳朵期待回到 I，却落到了 vi。OMT 为什么把它叫"阻碍进行"，而不叫"阻碍终止"？', 'V7 → vi：I を期待したのに vi へ。OMT はなぜ「偽終止」ではなく「偽進行」と呼ぶ？', 'V7 → vi: you expect I but land on vi. Why does OMT call it deceptive motion rather than a deceptive cadence?'),
        audio: { chords: [V4.I, V4.ii6, V4.V7, [45, 64, 72, 72]], gap: 800 },
        options: [t('因为它避开了终止，而不是完成一个终止', '終止を避けていて、終止を作っていないから', 'Because it avoids a cadence rather than creating one'), t('因为 vi 是主功能', 'vi は主機能だから', 'Because vi has tonic function'), t('因为只出现在小调', '短調にしか出ないから', 'Because it only happens in minor')],
        answer: 0,
        insight: { title: t('避开终止', '終止を避ける', 'Avoiding the cadence'), text: t('V(7)–vi 常出现在乐句中间，用来避开终止，所以 OMT 用"阻碍进行"这个说法。', 'V(7)–vi はよくフレーズの途中で終止を避けるのに使われるので、OMT は「偽進行」と呼ぶ。', 'V(7)–vi often appears mid-phrase to avoid a cadence, so OMT calls it deceptive motion.') },
      },
    ],
    experiment: [
      { id: 'b26-x1', type: 'experiment', toy: 'progression', ref: ['omt2e-cadences', 'omt2e-cad64', 'omt2e-la-bass'],
        prompt: t('点上面的结尾，或者自己换后面几个槽位：完满、不完满、半终止、带终止四六的完满终止，还有阻碍进行。', '上の終わり方を押すか、後ろのスロットを自分で替えよう：完全・不完全・半終止・終止の四六つき完全終止、そして偽進行。', 'Tap an ending above, or swap the later slots yourself: PAC, IAC, HC, PAC with a cadential 6/4, and deceptive motion.'),
        params: { slots: [
          { fn: 'T', fnLabel: t('主', '主', 'T'), options: [{ label: 'I', notes: [48, 64, 67, 72] }] },
          { fn: 'PD', fnLabel: t('下属', '下属', 'PD'), options: [{ label: 'ii6', notes: [53, 62, 69, 74] }, { label: 'IV', notes: [53, 60, 69, 72] }] },
          { fn: 'D', fnLabel: t('属', '属', 'D'), options: [{ label: 'cad.6/4', notes: [55, 64, 67, 72], note: t('看起来像 I，低音却是 sol：上方的 E、C 马上要落到 D、B。', 'I に見えるがバスは sol：上の E・C はすぐ D・B へ落ちる。', 'Looks like I, but sol is in the bass: E and C are about to fall to D and B.') }, { label: 'V', notes: [55, 62, 67, 71] }] },
          { fn: 'D', fnLabel: t('属', '属', 'D'), options: [{ label: 'V7', notes: [55, 62, 65, 71] }, { label: t('V7（女高 re）', 'V7（ソプラノ re）', 'V7 (re on top)'), notes: [55, 59, 65, 74] }, { label: 'V', notes: [55, 62, 67, 71] }] },
          { fn: 'T', fnLabel: t('结尾', '終わり', 'End'), options: [{ label: t('I（女高 do）', 'I（ソプラノ do）', 'I (do on top)'), notes: [48, 60, 64, 72] }, { label: t('I（女高 mi）', 'I（ソプラノ mi）', 'I (mi on top)'), notes: [48, 60, 64, 76] }, { label: 'vi', notes: [45, 60, 64, 72] }, { label: t('（停在 V）', '（V で止まる）', '(stop on V)'), notes: [55, 62, 67, 71] }] },
        ],
        presets: [
          { label: 'PAC', picks: [0, 0, 1, 0, 0], explain: t('V7–I 都是原位，女高落在 do：完满正格终止。', 'V7–I は基本形、ソプラノは do：完全正格終止。', 'V7–I in root position, do on top: a PAC.') },
          { label: t('终止四六', '終止の四六', 'Cad. 6/4'), picks: [0, 0, 0, 0, 0], explain: t('cad.6/4 装饰属和弦：六度、四度先往下落，再接 V7–I。', 'cad.6/4 が属和音を飾る：6 度と 4 度が下がってから V7–I。', 'The cadential 6/4 decorates the dominant: the sixth and fourth fall, then V7–I.') },
          { label: 'IAC', picks: [0, 0, 1, 1, 1], explain: t('女高停在 mi：不完满正格终止。', 'ソプラノが mi：不完全正格終止。', 'The soprano ends on mi: an IAC.') },
          { label: 'HC', picks: [0, 1, 0, 2, 3], explain: t('停在属和弦上：半终止。', '属和音で止まる：半終止。', 'Stopping on the dominant: a half cadence.') },
          { label: t('阻碍进行', '偽進行', 'Deceptive'), picks: [0, 0, 1, 0, 2], explain: t('V7 到 vi：避开了终止。', 'V7 から vi：終止を避ける。', 'V7 to vi: the cadence is avoided.') },
        ] },
        breakthrough: { id: 'b26-endings', text: t('你亲耳比较了五种结尾。', '5 つの終わり方を自分の耳で比べた。', 'You compared five endings by ear.') } },
    ],
    challenge: [
      {
        id: 'b26-c1', type: 'choice', error: 'concept', skills: ['identify'], ref: 'omt2e-cadences',
        variants: [
          { prompt: t('V–I 都是原位，但女高结束在 mi。这是？', 'V–I は基本形だがソプラノが mi で終わる。これは？', 'V–I both in root position, but the soprano ends on mi. This is…'), options: [t('不完满正格终止（IAC）', '不完全正格終止（IAC）', 'An IAC'), t('完满正格终止（PAC）', '完全正格終止（PAC）', 'A PAC'), t('半终止', '半終止', 'A half cadence'), t('阻碍进行', '偽進行', 'Deceptive motion')] },
          { prompt: t('IV → V，乐句停在 V 上。这是？', 'IV → V でフレーズが V で止まる。これは？', 'IV → V, and the phrase stops on V. This is…'), options: [t('半终止', '半終止', 'A half cadence'), t('完满正格终止', '完全正格終止', 'A PAC'), t('不完满正格终止', '不完全正格終止', 'An IAC'), t('变格终止', '変格終止', 'A plagal cadence')] },
        ],
        answer: 0,
        explain: t('PAC：V–I 都原位且女高 do；少一个条件是 IAC；停在 V 上是半终止。', 'PAC：V–I が基本形でソプラノ do、条件が欠ければ IAC、V で止まれば半終止。', 'PAC: V–I in root position with do on top; missing either is an IAC; stopping on V is a half cadence.'),
      },
      {
        id: 'b26-c2', type: 'choice', error: 'rough-voice-leading', skills: ['voiceLeading'], ref: 'omt2e-cad64',
        variants: [
          { prompt: t('C 大调终止四六（G 上的 C、E）解决到 V 时，C 和 E 怎么走？', 'ハ長調の終止の四六（G の上の C・E）が V へ解決するとき、C と E は？', 'In C major, how do C and E in the cadential 6/4 (over G) move into V?'), options: [t('E 下行到 D，C 下行到 B', 'E は D へ、C は B へ下行', 'E falls to D, C falls to B'), t('E 上行到 F，C 上行到 D', 'E は F へ、C は D へ上行', 'E rises to F, C rises to D'), t('都不动', 'どちらも動かない', 'Both stay'), t('E 跳到 G，C 跳到 G', 'E は G へ、C は G へ跳躍', 'E leaps to G, C leaps to G')] },
          { prompt: t('G 大调终止四六（D 上的 G、B）解决到 V 时，G 和 B 怎么走？', 'ト長調の終止の四六（D の上の G・B）が V へ解決するとき、G と B は？', 'In G major, how do G and B in the cadential 6/4 (over D) move into V?'), options: [t('B 下行到 A，G 下行到 F♯', 'B は A へ、G は F♯ へ下行', 'B falls to A, G falls to F♯'), t('B 上行到 C，G 上行到 A', 'B は C へ、G は A へ上行', 'B rises to C, G rises to A'), t('都不动', 'どちらも動かない', 'Both stay'), t('B 下行到 G，G 下行到 D', 'B は G へ、G は D へ', 'B falls to G, G falls to D')] },
        ],
        answer: 0,
        explain: t('低音上方的六度下行到五度、四度下行到三度。', 'バスの 6 度上が 5 度へ、4 度上が 3 度へ下がる。', 'The sixth above the bass falls to the fifth, the fourth to the third.'),
      },
      {
        id: 'b26-c3', type: 'choice', error: 'wrong-function', skills: ['function'], ref: 'omt2e-64-chords',
        variants: [
          { prompt: t('低音 C–C–C，上方 I → 6/4 → I（两个声部上邻音再回来）。这是哪种四六？', 'バス C–C–C、上は I → 6/4 → I（2 声が上方隣接音へ行って戻る）。どの四六？', 'Bass C–C–C, upper voices I → 6/4 → I (two voices to upper neighbours and back). Which 6/4?'), options: [t('辅助四六', '補助の四六', 'Neighbour 6/4'), t('经过四六', '経過の四六', 'Passing 6/4'), t('终止四六', '終止の四六', 'Cadential 6/4'), t('琶音四六', 'アルペッジョの四六', 'Arpeggiating 6/4')] },
          { prompt: t('低音 C–D–E，和弦 I → 6/4 → I6，中间是低音的经过音。这是哪种四六？', 'バス C–D–E、和音 I → 6/4 → I6、真ん中はバスの経過音。どの四六？', 'Bass C–D–E, chords I → 6/4 → I6, the middle a passing bass note. Which 6/4?'), options: [t('经过四六', '経過の四六', 'Passing 6/4'), t('辅助四六', '補助の四六', 'Neighbour 6/4'), t('终止四六', '終止の四六', 'Cadential 6/4'), t('琶音四六', 'アルペッジョの四六', 'Arpeggiating 6/4')] },
        ],
        answer: 0,
        explain: t('辅助四六：低音不动、两边原位；经过四六：低音经过、两边同一功能；终止四六：低音 sol、装饰 V。', '補助の四六：バスは動かず両側は基本形。経過の四六：バスが経過し両側は同じ機能。終止の四六：バス sol で V を飾る。', 'Neighbour: static bass, root position on both sides; passing: a passing bass between chords of one function; cadential: sol in the bass, decorating V.'),
      },
      G('b26-g1', 'cadenceType', 2, ['hearing', 'identify']),
      G('b26-g2', 'dominantMotion', 1, ['function']),
    ],
  },
  pool: [G('b26-p1', 'cadenceType', 3, ['hearing', 'identify']), G('b26-p2', 'dominantMotion', 3, ['function']), G('b26-p3', 'romanChord', 2, ['identify'])],
};

// ===================== B2-7 乐句、乐段与曲式分析 =====================
// 乐段 / 重复乐句 / 乐句的示例（本课自编的简单材料）：每句四个和弦，女高是旋律
const PHRASE = {
  a: [[48, 64, 67, 72], [53, 65, 69, 74], [43, 62, 67, 71], [43, 62, 67, 71]],
  b: [[48, 64, 67, 72], [53, 65, 69, 74], [55, 65, 71, 74], [48, 64, 67, 72]],
};
export const LEVEL_B2_7 = {
  minutes: 13,
  insight: t('乐段的两句开头一样、结尾不同：前句停在较弱的终止上，后句用更强的终止回答——像一问一答。', '楽節の 2 つのフレーズは始まりが同じで終わりが違う：前楽句は弱い終止、後楽句はより強い終止で答える——問いと答え。', 'A period’s two phrases begin alike and end differently: the antecedent stops on a weaker cadence and the consequent answers with a stronger one — question and answer.'),
  sections: {
    discover: [
      {
        id: 'b27-d1', type: 'discover', ref: 'omt2e-phrase',
        prompt: t('两句开头一模一样。第一句停在 V 上，第二句回到 I。合起来像什么？', '2 つのフレーズは始まりがまったく同じ。1 つ目は V で、2 つ目は I で終わる。合わせると何に聞こえる？', 'The two phrases begin identically. The first stops on V, the second returns to I. Together, what do they sound like?'),
        play: [{ label: t('两句连起来', '2 つ続けて', 'Both phrases'), audio: { chords: [...PHRASE.a, ...PHRASE.b], gap: 650 } }],
        options: [t('一问一答：前句没说完（半终止），后句说完了（完满终止）', '問いと答え：前は言い終わらず（半終止）、後で言い終わる（完全終止）', 'Question and answer: the first is unfinished (HC), the second finishes (PAC)'), t('同一句重复两遍', '同じフレーズを 2 回', 'The same phrase twice'), t('两首不同的曲子', '別々の 2 曲', 'Two different pieces')],
        answer: 0,
        insight: {
          title: t('乐段 = 前句 + 后句', '楽節 = 前楽句 + 後楽句', 'Period = antecedent + consequent'),
          text: t('乐段由两句组成：前句通常以较弱的终止结束（多为半终止），后句以更强的终止结束（多为完满正格终止），所以常被说成"提问"与"回答"。如果两句终止相同，就是重复乐句而不是乐段。', '楽節は 2 つのフレーズからなる：前楽句はふつう弱い終止（多くは半終止）、後楽句はより強い終止（多くは完全正格終止）で終わるので、「問い」と「答え」と言われる。終止が同じなら楽節ではなく反復フレーズ。', 'A period has two phrases: the antecedent usually ends with a weaker cadence (most often a half cadence), the consequent with a stronger one (most often a PAC) — hence “question” and “answer”. If both end with the same cadence it is a repeated phrase, not a period.'),
        },
      },
    ],
    explain: [
      {
        id: 'b27-e1', type: 'page', ref: ['omt2e-phrase', 'omt2e-form-concepts'],
        title: t('从动机到乐句', '動機からフレーズへ', 'From motive to phrase'),
        text: [
          t('动机是短小、反复出现的单位（别把整段旋律当成动机）。乐句是朝着目标前进的相对完整的想法，在古典音乐里目标几乎总是终止；4、8、16 小节的乐句最常见。', '動機は短く、くり返し現れる単位（長い旋律を動機と呼ばない）。フレーズはゴールへ向かう比較的まとまった考えで、古典音楽ではゴールはほぼいつも終止。4・8・16 小節がよくある。', 'A motive is a short recurring unit (don’t call a whole melody a motive). A phrase is a relatively complete thought moving toward a goal — in classical music almost always a cadence; 4, 8 and 16 bars are common.'),
          t('句子（sentence）是一种乐句：呈示（一个基本乐思和它的重复）+ 展开。', 'センテンスはフレーズの一種：提示（基本楽想とその反復）+ 継続。', 'A sentence is a kind of phrase: a presentation (a basic idea and its repetition) plus a continuation.'),
        ],
      },
      {
        id: 'b27-e2', type: 'page', ref: ['omt2e-binary', 'omt2e-ternary'],
        title: t('二部与三部曲式', '二部形式と三部形式', 'Binary and ternary'),
        text: [
          t('二部曲式有两个段落（常各自反复）：简单二部，和再现二部——第二段中间回到开头的材料（主调上）。三部曲式是 ABA：中段 B 带来对比（常在新调上，也可能比较不稳定），然后回到 A。', '二部形式は 2 つの部分（それぞれ反復が多い）：単純二部と、第 2 部の途中で冒頭の材料が（主調で）戻る再現二部。三部形式は ABA：中間部 B が対比（新しい調が多く、不安定なことも）をもたらし、A に戻る。', 'Binary form has two reprises (usually each repeated): simple binary, and rounded binary, where the opening material returns (in the home key) midway through the second reprise. Ternary is ABA: a contrasting B (often in a new key, possibly unstable) between statements of A.'),
        ],
      },
      {
        id: 'b27-e3', type: 'discover', practice: true, ref: 'omt2e-phrase',
        prompt: t('两句都以完满正格终止结束，第二句是第一句的写出来的重复。这是乐段吗？', '2 つとも完全正格終止で終わり、2 つ目は 1 つ目を書き出した反復。これは楽節？', 'Both phrases end with a PAC, and the second is a written-out repeat of the first. Is it a period?'),
        options: [t('不是，是重复乐句', 'いいえ、反復フレーズ', 'No — a repeated phrase'), t('是乐段', '楽節', 'Yes, a period'), t('是句子', 'センテンス', 'A sentence')],
        answer: 0,
        insight: { title: t('终止强弱决定', '終止の強弱で決まる', 'Cadence strength decides'), text: t('乐段的后句一定比前句终止得更强；两句终止相同就是重复乐句。', '楽節の後楽句は必ず前より強く終止する。終止が同じなら反復フレーズ。', 'In a period the consequent always ends more strongly; identical cadences mean a repeated phrase.') },
      },
    ],
    experiment: [
      { id: 'b27-x1', type: 'experiment', toy: 'progression', ref: 'omt2e-phrase',
        prompt: t('两句四个和弦。改第一句的结尾（V 或 I），播放，听它什么时候是乐段（前弱后强）、什么时候是重复乐句（两句一样）。', '4 つの和音のフレーズが 2 つ。1 つ目の終わり（V か I）を替えて再生し、楽節（前が弱く後が強い）か反復フレーズ（同じ）かを聴こう。', 'Two four-chord phrases. Change the end of the first (V or I), play, and hear when it is a period (weak then strong) and when a repeated phrase (the same).'),
        params: { gap: 600, slots: [
          { options: [{ label: 'I', notes: PHRASE.a[0] }] }, { options: [{ label: 'ii6', notes: PHRASE.a[1] }] }, { options: [{ label: 'V', notes: PHRASE.a[2] }] },
          { fn: 'D', fnLabel: t('前句结尾', '前の終わり', 'End 1'), options: [{ label: t('V（半终止）', 'V（半終止）', 'V (HC)'), notes: PHRASE.a[3] }, { label: t('I（完满）', 'I（完全）', 'I (PAC)'), notes: PHRASE.b[3] }] },
          { options: [{ label: 'I', notes: PHRASE.b[0] }] }, { options: [{ label: 'ii6', notes: PHRASE.b[1] }] }, { options: [{ label: 'V7', notes: PHRASE.b[2] }] },
          { fn: 'T', fnLabel: t('后句结尾', '後の終わり', 'End 2'), options: [{ label: t('I（完满）', 'I（完全）', 'I (PAC)'), notes: PHRASE.b[3] }] },
        ] },
        breakthrough: { id: 'b27-period', text: t('你亲手把两句话变成了一问一答。', '自分の手で 2 つのフレーズを問いと答えにした。', 'You turned two phrases into a question and answer.') } },
    ],
    challenge: [
      {
        id: 'b27-c1', type: 'choice', error: 'form-type', skills: ['identify'], ref: 'omt2e-phrase',
        variants: [
          { prompt: t('前句以半终止结束，后句以完满正格终止结束。这是？', '前楽句は半終止、後楽句は完全正格終止。これは？', 'The first phrase ends with an HC, the second with a PAC. This is…'), options: [t('乐段', '楽節', 'A period'), t('重复乐句', '反復フレーズ', 'A repeated phrase'), t('句子', 'センテンス', 'A sentence'), t('三部曲式', '三部形式', 'Ternary form')] },
          { prompt: t('一个乐句由"基本乐思 + 它的重复"再加上展开组成。这是？', '「基本楽想 + その反復」に継続が続くフレーズ。これは？', 'A phrase made of a basic idea plus its repetition, followed by a continuation. This is…'), options: [t('句子', 'センテンス', 'A sentence'), t('乐段', '楽節', 'A period'), t('重复乐句', '反復フレーズ', 'A repeated phrase'), t('二部曲式', '二部形式', 'Binary form')] },
        ],
        answer: 0,
        explain: t('乐段：前句较弱终止 + 后句更强终止；句子：呈示（基本乐思 + 重复）+ 展开。', '楽節：前は弱い終止 + 後はより強い終止。センテンス：提示（基本楽想 + 反復）+ 継続。', 'Period: weaker cadence then stronger; sentence: presentation (idea + repetition) plus continuation.'),
      },
      {
        id: 'b27-c2', type: 'choice', error: 'form-type', skills: ['identify'], ref: ['omt2e-binary', 'omt2e-ternary'],
        variants: [
          { prompt: t('两个反复的段落，第二段中间回到开头的材料（在主调上）。这是？', '反復する 2 つの部分、第 2 部の途中で冒頭の材料が（主調で）戻る。これは？', 'Two repeated reprises; the opening material returns (in the home key) midway through the second. This is…'), options: [t('再现二部曲式', '再現二部形式', 'Rounded binary'), t('简单二部曲式', '単純二部形式', 'Simple binary'), t('三部曲式', '三部形式', 'Ternary'), t('回旋曲式', 'ロンド形式', 'Rondo')] },
          { prompt: t('A、对比的 B（新调）、再回到 A。这是？', 'A、対比的な B（新しい調）、そして A へ。これは？', 'A, a contrasting B (new key), then A again. This is…'), options: [t('三部曲式', '三部形式', 'Ternary'), t('简单二部曲式', '単純二部形式', 'Simple binary'), t('乐段', '楽節', 'A period'), t('句子', 'センテンス', 'A sentence')] },
        ],
        answer: 0,
        explain: t('再现二部：第二段里回到开头；三部：ABA。', '再現二部：第 2 部で冒頭が戻る。三部：ABA。', 'Rounded binary: the opening returns within the second reprise; ternary: ABA.'),
      },
      {
        id: 'b27-c3', type: 'choice', error: 'concept', skills: ['apply'], ref: 'omt2e-form-concepts',
        variants: [
          { prompt: t('下面哪一个最适合叫"动机"？', '「動機」と呼ぶのに最もふさわしいのは？', 'Which best fits the word “motive”?'), options: [t('一个反复出现的短小节奏音型', 'くり返し現れる短いリズム型', 'A short rhythmic figure that keeps recurring'), t('整首曲子的主旋律', '曲全体の主旋律', 'The whole main melody'), t('一个八小节的乐段', '8 小節の楽節', 'An eight-bar period'), t('整个第二段', '第 2 部全体', 'The whole second section')] },
          { prompt: t('做分段分析（segmentation）时，第一步通常是？', '区分分析の最初のステップは？', 'The first step of a segmentation analysis is usually…'), options: [t('找出乐句的结尾（常常是终止）', 'フレーズの終わり（多くは終止）を見つける', 'Find the phrase endings (often cadences)'), t('数一共有多少个音', '音の総数を数える', 'Count all the notes'), t('先标出每个动机', 'まずすべての動機に印', 'Label every motive first'), t('找出最高的音', '最も高い音を探す', 'Find the highest note')] },
        ],
        answer: 0,
        explain: t('动机要短；分段分析先找乐句结尾（多由终止标出），再把乐句分成更小的单位。', '動機は短い。区分分析はまずフレーズの終わり（多くは終止）を見つけ、それから細かく分ける。', 'Motives are short; segmentation starts from phrase endings (usually marked by cadences), then divides phrases into smaller units.'),
      },
      G('b27-g1', 'cadenceType', 3, ['hearing']),
    ],
  },
  pool: [G('b27-p1', 'cadenceType', 3, ['hearing', 'identify']), G('b27-p2', 'dominantMotion', 2, ['function'])],
};

// ===================== B2-8 离调与转调 =====================
export const LEVEL_B2_8 = {
  minutes: 19, core: true,
  insight: t('把 Am 换成 A7，下一个 Dm 就突然有了"到达"的感觉：副属和弦让一个普通和弦暂时当了主和弦。', 'Am を A7 に替えると、次の Dm が急に「到着」に聞こえる：副属和音は普通の和音を一時的に主和音にする。', 'Swap Am for A7 and the next Dm suddenly sounds like an arrival: a secondary dominant briefly makes an ordinary chord a tonic.'),
  sections: {
    discover: [
      {
        id: 'b28-d1', type: 'discover', ref: 'omt2e-tonicization',
        prompt: t('先听 C – Am – Dm – G – C，再听 C – A7 – Dm – G7 – C。为什么第二遍里的 Dm 突然有了更强的到达感？', 'C – Am – Dm – G – C、次に C – A7 – Dm – G7 – C。なぜ 2 回目の Dm は到着感が強い？', 'Hear C – Am – Dm – G – C, then C – A7 – Dm – G7 – C. Why does Dm sound like a stronger arrival the second time?'),
        play: [
          { label: 'C–Am–Dm–G–C', audio: { chords: [V4.I, V4.Am, V4.Dm, V4.G, V4.Ic], gap: 800 } },
          { label: 'C–A7–Dm–G7–C', audio: { chords: [V4.I, V4.A7, V4.Dm, V4.G7, V4.Ic], gap: 800 } },
        ],
        options: [t('A7 像 Dm 的"属和弦"：C♯ 是指向 D 的导音', 'A7 は Dm の「属和音」：C♯ が D への導音', 'A7 acts like Dm’s dominant: C♯ is a leading tone to D'), t('第二遍更响', '2 回目のほうが大きい', 'The second is louder'), t('Dm 在第二遍换了调', '2 回目の Dm は調が違う', 'Dm is in another key the second time')],
        answer: 0,
        insight: {
          title: t('借来的导音让 Dm 暂时当了主和弦', '借りた導音で Dm が一時的に主和音になる', 'A borrowed leading tone makes Dm a temporary tonic'),
          text: t('离调是让一个非主和弦暂时听起来像主和弦：用从暂时的调"借来"的副属和弦（V(7)/x）或副导和弦（vii°(7)/x）。A7 = D 小调的 V7，写成 V7/ii，读作"二级的属七"。副属和弦几乎总带临时记号，尤其是升高的（这里的 C♯）。', 'トニカイゼーションは主和音でない和音を一時的に主和音に聞こえさせること：一時的な調から「借りた」副属和音（V(7)/x）や副導和音（vii°(7)/x）を使う。A7 はニ短調の V7 なので V7/ii と書き「II の V7」と読む。副属和音にはほぼ必ず臨時記号、とくに上げる記号（ここでは C♯）がつく。', 'Tonicization makes a non-tonic chord sound briefly like a tonic, using secondary dominants (V(7)/x) or secondary leading-tone chords (vii°(7)/x) borrowed from the temporary key. A7 is V7 of D minor — written V7/ii, read “five-seven of two”. Applied chords nearly always carry accidentals, especially raising ones (here C♯).'),
        },
      },
    ],
    explain: [
      {
        id: 'b28-e1', type: 'page', ref: 'omt2e-tonicization',
        title: t('怎么写副属和弦', '副属和音の書き方', 'Writing applied chords'),
        text: [
          t('斜杠前面是这个和弦在暂时调里的身份，斜杠后面是被离调的和弦：V/V 是"属的属"。在 C 大调，V/V = D–F♯–A，V7/V = D–F♯–A–C，vii°7/V = F♯–A–C–E♭。', '斜線の前は一時的な調での役割、後ろはトニカイズされる和音：V/V は「属の属」。ハ長調で V/V = D–F♯–A、V7/V = D–F♯–A–C、vii°7/V = F♯–A–C–E♭。', 'Before the slash: the chord’s identity in the temporary key; after it: the chord being tonicized. V/V is “five of five”. In C: V/V = D–F♯–A, V7/V = D–F♯–A–C, vii°7/V = F♯–A–C–E♭.'),
          t('另一种看法：副属和弦是和它同根音的自然和弦的"变化版"——ii 把三音升高，就成了 V/V。', '別の見方：副属和音は同じ根音の音階上の和音の「変化形」——ii の第 3 音を上げると V/V。', 'Another view: an applied chord is an altered version of the diatonic chord on the same root — raise the third of ii and you get V/V.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...chordCol(['D4', 'F4', 'A4'], 0), ...chordCol(['D4', 'F#4', 'A4'], 1), ...chordCol(['D4', 'F#4', 'A4', 'C5'], 2)], cols: 3 },
      },
      {
        id: 'b28-e2', type: 'page', ref: 'omt2e-modulation',
        title: t('离调与转调', 'トニカイゼーションと転調', 'Tonicization vs modulation'),
        text: [
          t('转调是较长时间地换了主音。两种基本做法：直接转调（常出现在乐句交界，直接到新调），和共同和弦转调——用一个同时属于两个调的和弦作为"枢纽"，更含蓄。', '転調は長い時間主音が変わること。基本は 2 つ：直接転調（フレーズの境目でいきなり新しい調へ）と、両方の調に属する和音を「軸」にする共通和音転調（より目立たない）。', 'Modulation is a longer-term change of tonic. Two basic kinds: direct modulation (often at phrase boundaries, straight into the new key) and pivot-chord modulation, subtler, using a chord that belongs to both keys.'),
          t('找转调的线索：终止确立调；同一个临时记号反复出现，就看看有没有终止确立了新调。', '転調の手がかり：終止が調を確立する。同じ臨時記号がくり返し出たら、新しい調を確立する終止を探す。', 'Clues: cadences establish keys; when the same accidental keeps appearing, look for a cadence confirming a new key.'),
        ],
      },
      {
        id: 'b28-e3', type: 'discover', practice: true, ref: 'omt2e-modulation',
        prompt: t('从 C 大调转到 G 大调，下面哪个和弦可以当共同和弦？', 'ハ長調からト長調への転調で、共通和音になれるのは？', 'Modulating from C major to G major, which chord can serve as a pivot?'),
        options: [t('Am（C 调的 vi = G 调的 ii）', 'Am（ハ長調の vi = ト長調の ii）', 'Am (vi in C = ii in G)'), t('F（只在 C 调里）', 'F（ハ長調だけ）', 'F (only in C)'), t('D（只在 G 调里）', 'D（ト長調だけ）', 'D (only in G)')],
        answer: 0,
        insight: { title: t('两个调都有的和弦', '両方の調にある和音', 'A chord native to both keys'), text: t('共同和弦同时属于旧调和新调：Am 在 C 大调是 vi、在 G 大调是 ii。F（C 调的 IV）在 G 大调里不是自然和弦。', '共通和音は旧調と新調の両方に属する：Am はハ長調で vi、ト長調で ii。F（ハ長調の IV）はト長調の音階上にない。', 'A pivot belongs to both keys: Am is vi in C and ii in G. F (IV in C) is not diatonic in G.') },
      },
    ],
    experiment: [
      { id: 'b28-x1', type: 'experiment', toy: 'progression', ref: 'omt2e-tonicization',
        prompt: t('每个槽位都可以换成它的"副属"版本（Am → A7、G → G7）。一个个换，听哪个和弦被"推"成了暂时的主和弦。', '各スロットは「副属」版（Am → A7、G → G7）に替えられる。1 つずつ替えて、どの和音が一時的な主和音に「押し上げられる」か聴こう。', 'Each slot can switch to its applied version (Am → A7, G → G7). Swap them one at a time and hear which chord gets pushed into a temporary tonic.'),
        params: { slots: [
          { fn: 'T', fnLabel: t('主', '主', 'T'), options: [{ label: 'C', notes: V4.I }] },
          { options: [{ label: 'Am (vi)', notes: V4.Am }, { label: t('A7 (V7/ii)', 'A7 (V7/ii)', 'A7 (V7/ii)'), notes: V4.A7, note: t('C♯ 是指向 D 的导音。', 'C♯ が D への導音。', 'C♯ leads to D.') }] },
          { fn: 'PD', fnLabel: t('下属', '下属', 'PD'), options: [{ label: 'Dm (ii)', notes: V4.Dm }] },
          { fn: 'D', fnLabel: t('属', '属', 'D'), options: [{ label: 'G (V)', notes: V4.G }, { label: 'G7 (V7)', notes: V4.G7 }] },
          { fn: 'T', fnLabel: t('主', '主', 'T'), options: [{ label: 'C', notes: V4.Ic }] },
        ] },
        breakthrough: { id: 'b28-tonicize', text: t('你亲手把一个普通的 Dm 变成了暂时的主和弦。', '普通の Dm を自分の手で一時的な主和音にした。', 'You turned an ordinary Dm into a temporary tonic.') } },
    ],
    challenge: [
      {
        id: 'b28-c1', type: 'choice', error: 'wrong-chord', skills: ['spell'], ref: 'omt2e-tonicization',
        variants: [
          { prompt: t('G 大调的 V7/V 是？', 'ト長調の V7/V は？', 'V7/V in G major is…'), options: ['A–C♯–E–G', 'A–C–E–G', 'D–F♯–A–C', 'E–G♯–B–D'] },
          { prompt: t('F 大调的 V/V 是？', 'ヘ長調の V/V は？', 'V/V in F major is…'), options: ['G–B–D', 'G–B♭–D', 'C–E–G', 'D–F♯–A'] },
          { prompt: t('C 大调的 V7/IV 是？', 'ハ長調の V7/IV は？', 'V7/IV in C major is…'), options: ['C–E–G–B♭', 'C–E–G–B', 'F–A–C–E♭', 'G–B–D–F'] },
        ],
        answer: 0,
        explain: t('先找被离调的和弦（G 调的 V = D），再在它的调里找属七（D 调的 V7 = A C♯ E G）。', 'まずトニカイズされる和音（ト長調の V = D）、次にその調の属七（ニ長調の V7 = A C♯ E G）。', 'Find the tonicized chord (V in G = D), then its dominant seventh (V7 of D = A C♯ E G).'),
      },
      {
        id: 'b28-c2', type: 'choice', error: 'wrong-function', skills: ['function'], ref: 'omt2e-tonicization',
        variants: [
          { prompt: t('C 大调里出现 E7（E G♯ B D），接着是 Am。E7 怎么标？', 'ハ長調で E7（E G♯ B D）のあとに Am。E7 は？', 'In C major, E7 (E G♯ B D) goes to Am. How is E7 labelled?'), options: ['V7/vi', 'III7', 'V7/iii', 'V7'] },
          { prompt: t('C 大调里出现 F♯°7（F♯ A C E♭），接着是 G。F♯°7 怎么标？', 'ハ長調で F♯°7（F♯ A C E♭）のあとに G。F♯°7 は？', 'In C major, F♯°7 (F♯ A C E♭) goes to G. How is F♯°7 labelled?'), options: ['vii°7/V', 'vii°7', '♯iv°7', 'V7/V'] },
        ],
        answer: 0,
        explain: t('看它解决到哪里：E7 解决到 Am（vi）→ V7/vi；F♯°7 解决到 G（V）→ vii°7/V。', '解決先を見る：E7 → Am（vi）なら V7/vi、F♯°7 → G（V）なら vii°7/V。', 'Look at where it resolves: E7 → Am (vi) is V7/vi; F♯°7 → G (V) is vii°7/V.'),
      },
      {
        id: 'b28-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: 'omt2e-modulation',
        variants: [
          { prompt: t('离调和转调的主要区别是？', 'トニカイゼーションと転調の主な違いは？', 'The main difference between tonicization and modulation is…'), options: [t('转调是较长时间换了主音；离调只是暂时', '転調は長く主音が変わる、トニカイゼーションは一時的', 'Modulation changes the tonic for longer; tonicization is temporary'), t('转调只用在小调', '転調は短調だけ', 'Modulation only happens in minor'), t('离调一定要有共同和弦', 'トニカイゼーションには必ず共通和音', 'Tonicization always needs a pivot chord'), t('没有区别', '違いはない', 'No difference')] },
          { prompt: t('判断转调最有力的证据是？', '転調を判断する最も強い証拠は？', 'The strongest evidence of a modulation is…'), options: [t('一个终止确立了新调', '終止が新しい調を確立する', 'A cadence establishing the new key'), t('出现一个临时记号', '臨時記号が 1 つ出る', 'A single accidental'), t('速度变了', 'テンポが変わる', 'A tempo change'), t('音量变了', '音量が変わる', 'A dynamic change')] },
        ],
        answer: 0,
        explain: t('转调是较长时间的换主音；终止确立调，反复出现的临时记号提示要去找确立新调的终止。', '転調は長い主音の交代。終止が調を確立し、くり返す臨時記号は新しい調の終止を探す合図。', 'Modulation is a longer-term change of tonic; cadences establish keys, and recurring accidentals tell you to look for one.'),
      },
      G('b28-g1', 'secondaryDominant', 2, ['spell', 'function']),
      G('b28-g2', 'closelyRelated', 1, ['identify']),
    ],
    lab: [{ id: 'b28-lab', type: 'lab', lab: 'vl-secondary', mandatory: true, minutes: 6 }],
  },
  pool: [G('b28-p1', 'secondaryDominant', 3, ['spell', 'function']), G('b28-p2', 'closelyRelated', 3, ['identify']), G('b28-p3', 'romanChord', 2, ['function'])],
};

// ===================== B2-9 半音化和声：混合、那不勒斯、增六 =====================
export const LEVEL_B2_9 = {
  minutes: 18, core: true,
  insight: t('增六和弦的重点不是背 It / Fr / Ger，而是两个声部向外解决：A♭ 往下到 G、F♯ 往上到 G。', '増六の要点は It・Fr・Ger の暗記ではなく、2 声が外へ解決すること：A♭ は G へ下がり、F♯ は G へ上がる。', 'The point of augmented sixths is not memorising It / Fr / Ger but two voices resolving outward: A♭ down to G, F♯ up to G.'),
  sections: {
    discover: [
      {
        id: 'b29-d1', type: 'discover', ref: 'omt2e-aug6',
        prompt: t('只听两个音：A♭ 和 F♯（中间隔着增六度），然后它们一个往下、一个往上。两个声部最后在哪里会合？', '2 音だけ聴こう：A♭ と F♯（間は増 6 度）、それから片方は下へ、片方は上へ。最後はどこで出会う？', 'Hear just two notes: A♭ and F♯ (an augmented sixth apart), then one moves down and the other up. Where do they meet?'),
        play: [{ label: t('增六度 → 八度', '増 6 度 → オクターヴ', 'Augmented sixth → octave'), audio: { chords: [[56, 66], [55, 67]], gap: 1100 } }, { label: t('放进整个和弦', '和音全体で', 'In a full chord'), audio: { chords: [V4.I, V4.It6, V4.Vafter, V4.Iend], gap: 900 } }],
        options: [t('在 G 的八度上：A♭ 下行半音、F♯ 上行半音', 'G のオクターヴで：A♭ は半音下、F♯ は半音上', 'On G, an octave apart: A♭ down a half step, F♯ up a half step'), t('在 C 上', 'C で', 'On C'), t('它们不会会合', '出会わない', 'They never meet')],
        answer: 0,
        insight: {
          title: t('增六 = 两股倾向向外解决', '増六 = 2 つの傾向が外へ解決', 'Augmented sixth: two tendencies resolving outward'),
          text: t('增六和弦是一组半音化的下属和弦，特征是 le（降低的第六级）和 fi（升高的第四级）之间的增六度。它们没有根音，解决到原位属和弦：le 下行、fi 上行，向外落到属音的八度上。意大利、法国、德国三种只是在这个音程之外加的音不同。', '増六の和音は半音階的な下属和音のグループで、le（下げた第 6 音）と fi（上げた第 4 音）の増 6 度が特徴。根音はなく、基本形の属和音へ解決する：le は下へ、fi は上へ、外向きに属音のオクターヴへ。イタリア・フランス・ドイツの 3 種は、この音程に加える音が違うだけ。', 'Augmented sixth chords are chromatic predominants defined by the augmented sixth between le (lowered 6) and fi (raised 4). They have no root and resolve to a root-position dominant: le falls, fi rises, outward onto the dominant octave. Italian, French and German types differ only in what is added to that interval.'),
        },
      },
    ],
    explain: [
      {
        id: 'b29-e1', type: 'page', ref: 'omt2e-mixture',
        title: t('调式混合：借同主音小调的音', '同主調借用：同主短調から音を借りる', 'Mixture: borrowing from the parallel minor'),
        text: [
          t('调式混合从同主音小调借音，在大调里更常见。它改变和弦的性质，但不改变功能：iv 仍是下属，ii°6、iiø7 也一样。降低根音的和弦在罗马数字前加降号（♭VI）。', '同主調借用は同主短調から音を借り、長調でより多い。和音の種類は変わるが機能は変わらない：iv も ii°6・iiø7 も下属のまま。根音を下げた和音はローマ数字の前に ♭（♭VI）。', 'Mixture borrows from the parallel minor, more often in major. It changes chord quality but not function: iv is still a predominant, as are ii°6 and iiø7. Chords with lowered roots get a flat before the numeral (♭VI).'),
        ],
      },
      {
        id: 'b29-e2', type: 'page', ref: 'omt2e-neapolitan',
        title: t('那不勒斯六和弦', 'ナポリの六の和音', 'The Neapolitan sixth'),
        text: [
          t('建在 ra（降低的第二级）上的大三和弦，是半音化的下属和弦，通常用第一转位（♭II6）。声部进行里 ra 往下解决到 ti。常见进行：♭II6–V，或 ♭II6–vii°7/V–V（中间的减七和弦让通往属的推力更强）。', 'ra（下げた第 2 音）の上の長三和音で、半音階的な下属和音。ふつう第 1 転回（♭II6）。声部進行では ra が ti へ下がる。よくある進行：♭II6–V、または ♭II6–vii°7/V–V（減七が属への推進を強める）。', 'A major triad on ra (lowered 2), a chromatic predominant, usually in first inversion (♭II6). In the voice leading ra resolves down to ti. Common progressions: ♭II6–V, or ♭II6–vii°7/V–V (the diminished seventh intensifies the push to V).'),
        ],
      },
      {
        id: 'b29-e3', type: 'discover', practice: true, ref: 'omt2e-mixture',
        prompt: t('C 大调里把 IV（F A C）换成 iv（F A♭ C），它的功能变了吗？', 'ハ長調で IV（F A C）を iv（F A♭ C）に替えると、機能は変わる？', 'In C major, swap IV (F A C) for iv (F A♭ C). Does its function change?'),
        audio: { chords: [V4.I, V4.IV, V4.V, V4.Iend, V4.I, V4.iv, V4.V, V4.Iend], gap: 700 },
        options: [t('不变，还是下属；只是颜色变暗', '変わらない、下属のまま。色が暗くなるだけ', 'No — still a predominant, just a darker colour'), t('变成了属功能', '属機能になる', 'It becomes a dominant'), t('变成了主功能', '主機能になる', 'It becomes a tonic')],
        answer: 0,
        insight: { title: t('借来的颜色', '借りた色', 'A borrowed colour'), text: t('混合改变性质、不改变功能。', '借用は種類を変え、機能は変えない。', 'Mixture changes quality, not function.') },
      },
    ],
    experiment: [
      { id: 'b29-x1', type: 'experiment', toy: 'progression', ref: ['omt2e-mixture', 'omt2e-neapolitan', 'omt2e-aug6'],
        prompt: t('下属槽位里换上 IV、iv（混合）、N6（那不勒斯）、It+6（意大利增六），听每一种怎样走向 V。', '下属スロットを IV・iv（借用）・N6（ナポリ）・It+6（イタリアの増六）に替え、それぞれが V へどう向かうか聴こう。', 'Put IV, iv (mixture), N6 (Neapolitan) or It+6 (Italian augmented sixth) in the predominant slot and hear how each leads to V.'),
        params: { slots: [
          { fn: 'T', fnLabel: t('主', '主', 'T'), options: [{ label: 'I', notes: V4.I }] },
          { fn: 'PD', fnLabel: t('下属', '下属', 'PD'), options: [{ label: 'IV', notes: V4.IV }, { label: 'iv', notes: V4.iv, note: t('A♭ 是从同主音小调借来的。', 'A♭ は同主短調から借りた音。', 'A♭ is borrowed from the parallel minor.') }, { label: 'N6', notes: V4.N6, note: t('D♭（ra）往下解决到 B（ti）。', 'D♭（ra）は B（ti）へ下がる。', 'D♭ (ra) resolves down to B (ti).') }, { label: 'It+6', notes: V4.It6, note: t('A♭ 往下、F♯ 往上，向外落到 G 的八度。', 'A♭ は下へ、F♯ は上へ、G のオクターヴへ。', 'A♭ down, F♯ up — outward onto the octave G.') }] },
          { fn: 'D', fnLabel: t('属', '属', 'D'), options: [{ label: 'V', notes: V4.Vafter }] },
          { fn: 'T', fnLabel: t('主', '主', 'T'), options: [{ label: 'I', notes: V4.Iend }] },
        ] },
        breakthrough: { id: 'b29-outward', text: t('你听出了增六度向外解决的那一下。', '増 6 度が外へ解決する瞬間を聴き取った。', 'You heard the augmented sixth open outward.') } },
    ],
    challenge: [
      {
        id: 'b29-c1', type: 'choice', error: 'wrong-chord', skills: ['spell'], ref: 'omt2e-neapolitan',
        variants: [
          { prompt: t('A 小调的那不勒斯六和弦（♭II6）是？', 'イ短調のナポリの六（♭II6）は？', 'The Neapolitan sixth (♭II6) in A minor is…'), options: [t('B♭ 大三和弦，低音 D', 'B♭ 長三和音、バス D', 'B♭ major with D in the bass'), t('B 小三和弦，低音 D', 'B 短三和音、バス D', 'B minor with D in the bass'), t('B♭ 大三和弦，低音 B♭', 'B♭ 長三和音、バス B♭', 'B♭ major with B♭ in the bass'), t('D 小三和弦', 'D 短三和音', 'D minor')] },
          { prompt: t('C 小调的那不勒斯六和弦（♭II6）是？', 'ハ短調のナポリの六（♭II6）は？', 'The Neapolitan sixth (♭II6) in C minor is…'), options: [t('D♭ 大三和弦，低音 F', 'D♭ 長三和音、バス F', 'D♭ major with F in the bass'), t('D 小三和弦，低音 F', 'D 短三和音、バス F', 'D minor with F in the bass'), t('D♭ 大三和弦，低音 D♭', 'D♭ 長三和音、バス D♭', 'D♭ major with D♭ in the bass'), t('F 小三和弦', 'F 短三和音', 'F minor')] },
        ],
        answer: 0,
        explain: t('♭II 是建在降低的第二级（ra）上的大三和弦；6 表示第一转位，低音是三音（也就是第四级 fa）。', '♭II は下げた第 2 音（ra）上の長三和音、6 は第 1 転回でバスは第 3 音（第 4 音 fa）。', '♭II is a major triad on lowered 2 (ra); the 6 means first inversion, with its third (fa, degree 4) in the bass.'),
      },
      {
        id: 'b29-c2', type: 'choice', error: 'unresolved-leading-tone', skills: ['voiceLeading'], ref: 'omt2e-aug6',
        variants: [
          { prompt: t('C 大调的增六和弦（A♭ … F♯）解决到 V 时，A♭ 和 F♯ 怎么走？', 'ハ長調の増六（A♭ … F♯）が V へ解決するとき、A♭ と F♯ は？', 'In C, how do A♭ and F♯ of an augmented sixth chord move into V?'), options: [t('A♭ 下行到 G，F♯ 上行到 G', 'A♭ は G へ下行、F♯ は G へ上行', 'A♭ down to G, F♯ up to G'), t('A♭ 上行到 A，F♯ 下行到 F', 'A♭ は A へ、F♯ は F へ', 'A♭ up to A, F♯ down to F'), t('都不动', 'どちらも動かない', 'Both stay'), t('都上行', 'どちらも上行', 'Both rise')] },
          { prompt: t('A 小调的增六和弦（F … D♯）解决到 V 时，F 和 D♯ 怎么走？', 'イ短調の増六（F … D♯）が V へ解決するとき、F と D♯ は？', 'In A minor, how do F and D♯ of an augmented sixth chord move into V?'), options: [t('F 下行到 E，D♯ 上行到 E', 'F は E へ下行、D♯ は E へ上行', 'F down to E, D♯ up to E'), t('F 上行到 G，D♯ 下行到 D', 'F は G へ、D♯ は D へ', 'F up to G, D♯ down to D'), t('都不动', 'どちらも動かない', 'Both stay'), t('都下行', 'どちらも下行', 'Both fall')] },
        ],
        answer: 0,
        explain: t('le 下行半音、fi 上行半音，向外落到属音的八度上，再接原位属和弦。', 'le は半音下、fi は半音上、外へ属音のオクターヴに着き、基本形の属和音へ。', 'Le falls a half step and fi rises one, outward onto the dominant octave, followed by root-position V.'),
      },
      {
        id: 'b29-c3', type: 'choice', error: 'wrong-function', skills: ['function'], ref: ['omt2e-mixture', 'omt2e-neapolitan', 'omt2e-aug6'],
        variants: [
          { prompt: t('iv、♭II6、增六和弦有什么共同点？', 'iv・♭II6・増六の共通点は？', 'What do iv, ♭II6 and augmented sixth chords share?'), options: [t('都是（半音化的）下属功能，走向属', 'どれも（半音階的な）下属機能で属へ向かう', 'All are (chromatic) predominants leading to V'), t('都是主功能', 'どれも主機能', 'All are tonics'), t('都是属七和弦', 'どれも属七', 'All are dominant sevenths'), t('都只出现在大调', 'どれも長調だけ', 'All occur only in major')] },
          { prompt: t('C 大调里的 ♭VI 是？', 'ハ長調の ♭VI は？', 'In C major, ♭VI is…'), options: [t('A♭ 大三和弦（从同主音小调借来）', 'A♭ 長三和音（同主短調から借用）', 'A♭ major (borrowed from the parallel minor)'), t('A 小三和弦', 'A 短三和音', 'A minor'), t('A♭ 小三和弦', 'A♭ 短三和音', 'A♭ minor'), t('F 大三和弦', 'F 長三和音', 'F major')] },
        ],
        answer: 0,
        explain: t('混合、那不勒斯与增六都是半音化的下属，走向属；降低根音的和弦用 ♭ 标在罗马数字前。', '借用・ナポリ・増六はどれも半音階的な下属で属へ向かう。根音を下げた和音はローマ数字の前に ♭。', 'Mixture, Neapolitan and augmented sixths are chromatic predominants leading to V; lowered-root chords get ♭ before the numeral.'),
      },
      G('b29-g1', 'neapolitan', 2, ['spell']),
      G('b29-g2', 'secondaryDominant', 1, ['function']),
    ],
    lab: [{ id: 'b29-lab', type: 'lab', lab: 'vl-n6', mandatory: true, minutes: 6 }],
  },
  pool: [G('b29-p1', 'neapolitan', 3, ['spell', 'function']), G('b29-p2', 'secondaryDominant', 3, ['function']), G('b29-p3', 'romanChord', 2, ['identify'])],
};

// ===================== B2-10 五度圈与调关系 =====================
export const LEVEL_B2_10 = {
  minutes: 12,
  insight: t('近关系调就是五度圈上左右的邻居，再加上它们的关系小调——都和原调只差一个音。', '近親調は五度圏の左右の隣と、その平行短調——どれも元の調と 1 音しか違わない。', 'Closely related keys are the neighbours on the circle of fifths plus their relative minors — each differs from the home key by at most one note.'),
  sections: {
    discover: [
      {
        id: 'b210-d1', type: 'discover', ref: ['wiki-closely-related', 'omt2e-major-scales'],
        prompt: t('C 大调和 G 大调的音阶有几个音不同？C 大调和 D 大调呢？', 'ハ長調とト長調の音階はいくつ違う？ ハ長調とニ長調は？', 'How many notes differ between the C and G major scales? Between C and D major?'),
        play: [{ label: t('C 大调', 'ハ長調', 'C major'), audio: { notes: [60, 62, 64, 65, 67, 69, 71, 72], mode: 'melody' } }, { label: t('G 大调', 'ト長調', 'G major'), audio: { notes: [67, 69, 71, 72, 74, 76, 78, 79], mode: 'melody' } }, { label: t('D 大调', 'ニ長調', 'D major'), audio: { notes: [62, 64, 66, 67, 69, 71, 73, 74], mode: 'melody' } }],
        options: [t('C 与 G 只差一个音（F/F♯）；C 与 D 差两个', 'C と G は 1 音だけ（F/F♯）、C と D は 2 音', 'C and G differ by one note (F/F♯); C and D by two'), t('都差一个', 'どちらも 1 音', 'Both by one'), t('都差三个', 'どちらも 3 音', 'Both by three')],
        answer: 0,
        insight: {
          title: t('近关系 = 只差一个音', '近親 = 1 音違い', 'Closely related = one note apart'),
          text: t('一个调的近关系调共有六个：IV 和 V（五度圈上的左右邻居）以及 ii 和 iii（它们的关系小调）都只差一个音；vi（关系小调）的音完全相同；i（同主音小调）主音相同。转调最常去的就是这些调。', 'ある調の近親調は 6 つ：IV と V（五度圏の左右の隣）、ii と iii（その平行短調）は 1 音違い、vi（平行短調）は音がまったく同じ、i（同主短調）は主音が同じ。転調で最もよく行く先。', 'A key has six closely related keys: IV and V (its neighbours on the circle) and ii and iii (their relative minors) differ by one note; vi (the relative minor) shares every note; i (the parallel minor) shares the tonic. These are the commonest destinations of a modulation.'),
        },
      },
    ],
    explain: [
      {
        id: 'b210-e1', type: 'page', ref: 'omt2e-major-scales',
        tool: { feature: 'circle' },
        title: t('五度圈', '五度圏', 'The circle of fifths'),
        text: [
          t('把所有大调按调号里升降号的个数排在一个圆上，就是五度圈：顺时针每走一格多一个升号（或少一个降号），逆时针多一个降号。', 'すべての長調を調号の臨時記号の数で円に並べたのが五度圏：時計回りに 1 つ進むごとに ♯ が 1 つ増え（♭ が 1 つ減り）、反時計回りに ♭ が増える。', 'Arrange all major keys by the number of accidentals in their signatures and you get the circle of fifths: each step clockwise adds a sharp (or removes a flat), counter-clockwise adds a flat.'),
        ],
        visual: { kind: 'circle', highlight: ['C', 'G', 'F'], inner: ['A', 'E', 'D'] },
      },
      {
        id: 'b210-e2', type: 'discover', practice: true, ref: 'wiki-closely-related',
        prompt: t('D 大调的近关系调里，哪一个和它的音完全相同？', 'ニ長調の近親調で、音がまったく同じなのは？', 'Among D major’s closely related keys, which shares every note?'),
        options: [t('B 小调（关系小调）', 'ロ短調（平行短調）', 'B minor (relative minor)'), t('D 小调（同主音小调）', 'ニ短調（同主短調）', 'D minor (parallel minor)'), t('A 大调（属调）', 'イ長調（属調）', 'A major (dominant)')],
        answer: 0,
        insight: { title: t('关系调共用调号', '平行調は調号を共有', 'Relative keys share a signature'), text: t('B 小调和 D 大调都是两个升号；D 小调主音相同但调号不同；A 大调多一个升号。', 'ロ短調とニ長調はどちらも ♯ 2 つ。ニ短調は主音が同じだが調号が違い、イ長調は ♯ が 1 つ多い。', 'B minor and D major both have two sharps; D minor shares the tonic but not the signature; A major has one more sharp.') },
      },
    ],
    experiment: [
      { id: 'b210-x1', type: 'experiment', toy: 'keyRel', ref: ['wiki-closely-related', 'wiki-circle-of-fifths'],
        prompt: t('点五度圈上的任何一个大调，看它的六个近关系调亮在哪里。它们总是挤在一起吗？', '五度圏のどの長調でも押して、6 つの近親調がどこに光るか見よう。いつも固まっている？', 'Tap any major key on the circle and see where its six closely related keys light up. Are they always clustered?'),
        params: {},
        breakthrough: { id: 'b210-cluster', text: t('你看出来了：近关系调总在五度圈上挨在一起。', '近親調はいつも五度圏で隣り合っている——見えた。', 'You saw it: closely related keys always sit together on the circle.') } },
    ],
    challenge: [
      {
        id: 'b210-c1', type: 'choice', error: 'key-relation', skills: ['identify'], ref: 'wiki-closely-related',
        variants: [
          { prompt: t('下面哪个不是 G 大调的近关系调？', 'ト長調の近親調でないのは？', 'Which is NOT closely related to G major?'), options: [t('A 大调', 'イ長調', 'A major'), t('E 小调', 'ホ短調', 'E minor'), t('C 大调', 'ハ長調', 'C major'), t('B 小调', 'ロ短調', 'B minor')] },
          { prompt: t('下面哪个不是 F 大调的近关系调？', 'ヘ長調の近親調でないのは？', 'Which is NOT closely related to F major?'), options: [t('E♭ 大调', '変ホ長調', 'E♭ major'), t('D 小调', 'ニ短調', 'D minor'), t('C 大调', 'ハ長調', 'C major'), t('G 小调', 'ト短調', 'G minor')] },
        ],
        answer: 0,
        explain: t('近关系调：IV、V、ii、iii、vi 和 i。G 大调的 IV 是 C、V 是 D；A 大调差两个升号。', '近親調：IV・V・ii・iii・vi・i。ト長調の IV は C、V は D。イ長調は ♯ 2 つ違い。', 'Closely related: IV, V, ii, iii, vi and i. G’s IV is C and V is D; A major is two sharps away.'),
      },
      {
        id: 'b210-c2', type: 'choice', error: 'key-relation', skills: ['calc'], ref: ['wiki-closely-related', 'omt2e-major-scales'],
        variants: [
          { prompt: t('E♭ 大调的属调是？', '変ホ長調の属調は？', 'The dominant key of E♭ major is…'), options: [t('B♭ 大调', '変ロ長調', 'B♭ major'), t('A♭ 大调', '変イ長調', 'A♭ major'), t('C 小调', 'ハ短調', 'C minor'), t('F 大调', 'ヘ長調', 'F major')] },
          { prompt: t('A 大调的下属调是？', 'イ長調の下属調は？', 'The subdominant key of A major is…'), options: [t('D 大调', 'ニ長調', 'D major'), t('E 大调', 'ホ長調', 'E major'), t('F♯ 小调', '嬰ヘ短調', 'F♯ minor'), t('B 大调', 'ロ長調', 'B major')] },
        ],
        answer: 0,
        explain: t('五度圈上顺时针一格是属调（上方五度），逆时针一格是下属调。', '五度圏で時計回りに 1 つが属調（5 度上）、反時計回りに 1 つが下属調。', 'One step clockwise is the dominant key (a fifth up), one step counter-clockwise the subdominant.'),
      },
      {
        id: 'b210-c3', type: 'choice', error: 'key-relation', skills: ['identify'], ref: 'wiki-closely-related',
        variants: [
          { prompt: t('一个大调一共有几个近关系调？', '長調の近親調はいくつ？', 'How many closely related keys does a major key have?'), options: ['6', '2', '4', '12'] },
          { prompt: t('近关系调里，哪一个和原调"主音相同"？', '近親調で「主音が同じ」なのは？', 'Among closely related keys, which shares the tonic?'), options: [t('同主音小调 i', '同主短調 i', 'The parallel minor, i'), t('关系小调 vi', '平行短調 vi', 'The relative minor, vi'), t('属调 V', '属調 V', 'The dominant, V'), t('下属调 IV', '下属調 IV', 'The subdominant, IV')] },
        ],
        answer: 0,
        explain: t('六个：IV、V、ii、iii（只差一个音），vi（音相同），i（主音相同）。', '6 つ：IV・V・ii・iii（1 音違い）、vi（音が同じ）、i（主音が同じ）。', 'Six: IV, V, ii, iii (one note apart), vi (same notes), i (same tonic).'),
      },
      G('b210-g1', 'circleStep', 2, ['calc']),
      G('b210-g2', 'closelyRelated', 1, ['identify']),
    ],
  },
  pool: [G('b210-p1', 'circleStep', 3, ['calc']), G('b210-p2', 'closelyRelated', 3, ['identify']), G('b210-p3', 'keySignature', 2, ['identify'])],
};

// ===================== B2-11 新黎曼变换 =====================
export const LEVEL_B2_11 = {
  minutes: 12,
  insight: t('P、L、R 每次只动一个音，另外两个音保持不动——所以这些"不在调里"的进行听起来那么顺。', 'P・L・R は毎回 1 音だけ動き、残り 2 音はそのまま——だから「調にない」進行がこんなに滑らかに聞こえる。', 'P, L and R each move just one note and keep the other two — which is why these “out-of-key” progressions sound so smooth.'),
  sections: {
    discover: [
      {
        id: 'b211-d1', type: 'discover', ref: 'omt2e-neo-riemannian',
        prompt: t('C 大三 → A 小三 → F 大三 → F 小三。用调性和声很难解释，但为什么听起来很顺？数一数每一步动了几个音。', 'C 長三 → A 短三 → F 長三 → F 短三。調性和声では説明しにくいのに、なぜ滑らか？ 1 歩ごとに何音動いた？', 'C major → A minor → F major → F minor. Hard to explain with key-based harmony — so why does it sound smooth? Count how many notes move each time.'),
        play: [{ label: t('播放', '再生', 'Play'), audio: { chords: [[60, 64, 67], [60, 64, 69], [60, 65, 69], [60, 65, 68]], gap: 900 } }],
        options: [t('每一步只动一个音，另外两个音不动', '毎回 1 音だけ動き、残り 2 音は動かない', 'Each step moves one note and keeps two'), t('每一步三个音都在动', '毎回 3 音とも動く', 'All three notes move each time'), t('因为都在 C 大调里', 'すべてハ長調だから', 'Because everything is in C major')],
        answer: 0,
        insight: {
          title: t('共同音带路', '共通音が道案内', 'Common tones lead the way'),
          text: t('新黎曼理论用"保留共同音"来理解三和弦之间的进行，而不是靠留在一个调里。每个变换都在一个大三和弦和一个小三和弦之间切换。最基本的三个只动一个音、保留两个共同音：R（关系：C 与 Am）、P（同主音：C 与 Cm）、L（导音交换：C 与 Em）。', 'ネオ・リーマン理論は、1 つの調にとどまることではなく「共通音を保つこと」で三和音の進行を理解する。どの変換も長三和音と短三和音を行き来する。基本の 3 つは 1 音だけ動いて共通音 2 つを保つ：R（平行：C と Am）、P（同主：C と Cm）、L（導音交換：C と Em）。', 'Neo-Riemannian theory explains triadic progressions by shared common tones rather than by staying in one key. Every transformation toggles between a major and a minor triad. The basic three move one note and keep two: R (relative: C and Am), P (parallel: C and Cm), L (leading-tone exchange: C and Em).'),
        },
      },
    ],
    explain: [
      {
        id: 'b211-e1', type: 'page', ref: 'omt2e-neo-riemannian',
        title: t('P、L、R 动的是哪个音', 'P・L・R で動く音', 'Which note moves in P, L and R'),
        text: [
          t('从 C 大三（C E G）出发：P 把 E 降成 E♭ → C 小三；R 把 G 升到 A → A 小三；L 把 C 降到 B → E 小三。', 'C 長三（C E G）から：P は E を E♭ に → C 短三。R は G を A に → A 短三。L は C を B に → E 短三。', 'From C major (C E G): P lowers E to E♭ → C minor; R raises G to A → A minor; L lowers C to B → E minor.'),
          t('还有只保留一个共同音、动两个音的变换：S（C 与 C♯m）、N（C 与 Fm）；H（C 与 A♭m）一个共同音都不保留，三个音各移动半音。', '共通音を 1 つだけ保ち 2 音動く変換も：S（C と C♯m）、N（C と Fm）。H（C と A♭m）は共通音がなく、3 音それぞれ半音動く。', 'Others keep one common tone and move two notes: S (C and C♯m), N (C and Fm); H (C and A♭m) keeps none, shifting each note a half step.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...chordCol(['C4', 'E4', 'G4'], 0), ...chordCol(['C4', 'Eb4', 'G4'], 1), ...chordCol(['C4', 'E4', 'A4'], 2), ...chordCol(['B3', 'E4', 'G4'], 3)], cols: 4 },
      },
      {
        id: 'b211-e2', type: 'discover', practice: true, ref: 'omt2e-neo-riemannian',
        prompt: t('A 小三（A C E）做 R 变换，得到哪个和弦？', 'A 短三（A C E）に R をかけると？', 'Apply R to A minor (A C E). What do you get?'),
        options: [t('C 大三（A 下行到 G）', 'C 長三（A が G へ下がる）', 'C major (A moves down to G)'), t('A 大三', 'A 長三', 'A major'), t('F 大三', 'F 長三', 'F major')],
        answer: 0,
        insight: { title: t('变换可以来回走', '変換は行き来できる', 'Transformations go both ways'), text: t('R 连接 C 大三和 A 小三，从哪一边出发都一样：A 小三做 R 回到 C 大三。', 'R は C 長三と A 短三を結び、どちらから始めても同じ：A 短三に R で C 長三に戻る。', 'R links C major and A minor in both directions: R on A minor gives C major.') },
      },
    ],
    experiment: [
      { id: 'b211-x1', type: 'experiment', toy: 'plr', ref: 'omt2e-neo-riemannian',
        prompt: t('从 C 大三开始，按 P、L、R 走一条路，每一步都看是哪个音、动了几个半音。试试 L 和 R 交替，能走到多远？', 'C 長三から P・L・R で道をたどり、毎回どの音が何半音動いたか見よう。L と R を交互に使うとどこまで行ける？', 'Start on C major and walk a path with P, L and R, watching which note moves and by how much. Alternate L and R — how far can you get?'),
        params: {},
        breakthrough: { id: 'b211-walk', text: t('你只靠每次动一个音，走出了好几个调以外。', '1 音ずつ動かすだけで、いくつもの調の外まで歩いた。', 'Moving one note at a time, you walked several keys away.') } },
    ],
    challenge: [
      {
        id: 'b211-c1', type: 'choice', error: 'nr-transform', skills: ['calc'], ref: 'omt2e-neo-riemannian',
        variants: [
          { prompt: t('G 大三做 L 变换得到？', 'G 長三に L をかけると？', 'L applied to G major gives…'), options: [t('B 小三', 'B 短三', 'B minor'), t('E 小三', 'E 短三', 'E minor'), t('G 小三', 'G 短三', 'G minor'), t('D 小三', 'D 短三', 'D minor')] },
          { prompt: t('F 大三做 R 变换得到？', 'F 長三に R をかけると？', 'R applied to F major gives…'), options: [t('D 小三', 'D 短三', 'D minor'), t('A 小三', 'A 短三', 'A minor'), t('F 小三', 'F 短三', 'F minor'), t('C 小三', 'C 短三', 'C minor')] },
          { prompt: t('E 小三做 P 变换得到？', 'E 短三に P をかけると？', 'P applied to E minor gives…'), options: [t('E 大三', 'E 長三', 'E major'), t('G 大三', 'G 長三', 'G major'), t('C 大三', 'C 長三', 'C major'), t('B 大三', 'B 長三', 'B major')] },
        ],
        answer: 0,
        explain: t('大三和弦：P 同根音的小三、R 下方小三度的小三、L 上方大三度的小三；小三和弦反过来。', '長三和音から：P は同じ根音の短三、R は短 3 度下の短三、L は長 3 度上の短三。短三和音からは逆。', 'From a major triad: P = the minor on the same root, R = the minor a minor third below, L = the minor a major third above; from minor, the reverse.'),
      },
      {
        id: 'b211-c2', type: 'choice', error: 'nr-transform', skills: ['voiceLeading'], ref: 'omt2e-neo-riemannian',
        variants: [
          { prompt: t('C 大三 → E 小三（L），动的是哪个音？', 'C 長三 → E 短三（L）で動くのは？', 'C major → E minor (L): which note moves?'), options: [t('C 下行半音到 B', 'C が半音下の B へ', 'C down a half step to B'), t('E 上行到 F', 'E が F へ', 'E up to F'), t('G 上行到 A', 'G が A へ', 'G up to A'), t('三个音都动', '3 音とも', 'All three')] },
          { prompt: t('C 大三 → A 小三（R），动的是哪个音？', 'C 長三 → A 短三（R）で動くのは？', 'C major → A minor (R): which note moves?'), options: [t('G 上行全音到 A', 'G が全音上の A へ', 'G up a whole step to A'), t('C 下行到 B', 'C が B へ', 'C down to B'), t('E 下行到 E♭', 'E が E♭ へ', 'E down to E♭'), t('三个音都动', '3 音とも', 'All three')] },
        ],
        answer: 0,
        explain: t('L：根音下行半音（C → B）；R：五音上行全音（G → A）；P：三音下行半音（E → E♭）。', 'L：根音が半音下（C → B）、R：第 5 音が全音上（G → A）、P：第 3 音が半音下（E → E♭）。', 'L: the root falls a half step (C → B); R: the fifth rises a whole step (G → A); P: the third falls a half step (E → E♭).'),
      },
      {
        id: 'b211-c3', type: 'choice', error: 'concept', skills: ['identify'], ref: 'omt2e-neo-riemannian',
        variants: [
          { prompt: t('哪一个变换一个共同音都不保留？', '共通音を 1 つも保たない変換は？', 'Which transformation keeps no common tone?'), options: ['H', 'P', 'R', 'L'] },
          { prompt: t('哪一个变换连接 C 大三和 F 小三？', 'C 長三と F 短三を結ぶ変換は？', 'Which transformation links C major and F minor?'), options: ['N', 'S', 'P', 'H'] },
        ],
        answer: 0,
        explain: t('H（C 与 A♭m）：三个音各移半音，没有共同音；N（C 与 Fm）：保留一个共同音。', 'H（C と A♭m）：3 音それぞれ半音、共通音なし。N（C と Fm）：共通音 1 つ。', 'H (C and A♭m) shifts every note a half step, no common tones; N (C and Fm) keeps one.'),
      },
      G('b211-g1', 'plr', 2, ['calc']),
      G('b211-g2', 'plrCycle', 1, ['calc']),
    ],
  },
  pool: [G('b211-p1', 'plr', 3, ['calc', 'voiceLeading']), G('b211-p2', 'plrCycle', 3, ['calc'])],
};

// ===================== B2-12 和声综合：从分析到写作 =====================
export const LEVEL_B2_12 = {
  minutes: 19, core: true,
  insight: t('分析和写作是同一件事的两面：先听出功能和终止，写的时候就知道每个和弦要往哪里去。', '分析と作曲は同じことの表と裏：機能と終止を聴き取れば、書くときに各和音の行き先が分かる。', 'Analysis and writing are two sides of one skill: hear the functions and cadences, and you know where each chord must go when you write.'),
  sections: {
    discover: [
      {
        id: 'b212-d1', type: 'discover', ref: ['omt2e-phrase-model', 'omt2e-tonicization', 'omt2e-cad64'],
        prompt: t('听这一句：I – vi – V6/5/V – cad.6/4 – V7 – I。哪几个和弦一起把耳朵"推"向最后的终止？', 'このフレーズ：I – vi – V6/5/V – cad.6/4 – V7 – I。最後の終止へ耳を「押す」のはどの和音たち？', 'Hear: I – vi – V6/5/V – cad.6/4 – V7 – I. Which chords together push the ear toward the final cadence?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: { chords: [V4.I, V4.vi, [54, 62, 69, 72], [55, 64, 67, 72], [55, 62, 65, 71], V4.Ic], gap: 800 } }],
        options: [t('V6/5/V 把 V 离调，终止四六再装饰 V，最后 V7–I', 'V6/5/V が V をトニカイズし、終止の四六が V を飾り、V7–I へ', 'V6/5/V tonicizes V, the cadential 6/4 decorates it, then V7–I'), t('只有最后的 I', '最後の I だけ', 'Only the final I'), t('vi 一个就够了', 'vi だけで十分', 'Just the vi')],
        answer: 0,
        insight: {
          title: t('一层层加强的终止', '何層にも強められた終止', 'A cadence reinforced in layers'),
          text: t('这一句把前面学过的东西叠在一起：vi 作为弱下属离开主和弦；V6/5/V 用 F♯ 把耳朵指向 G（离调到 V）；终止四六是属和弦上的装饰；最后 V7–I 完满终止。分析时从终止往回找，写作时从目标往前想。', 'このフレーズはこれまでの内容を重ねている：vi は弱い下属として主和音を離れ、V6/5/V は F♯ で耳を G へ向け（V へのトニカイゼーション）、終止の四六は属和音の装飾、最後に V7–I の完全終止。分析は終止から逆にたどり、作曲はゴールから考える。', 'This phrase stacks what you have learned: vi leaves the tonic as a weak predominant; V6/5/V points at G with F♯ (tonicizing V); the cadential 6/4 decorates the dominant; V7–I closes with a PAC. Analyse backward from the cadence; write forward toward the goal.'),
        },
      },
    ],
    explain: [
      {
        id: 'b212-e1', type: 'page', ref: 'omt2e-phrase-model',
        title: t('分析的四步', '分析の 4 段階', 'Four steps of analysis'),
        text: [
          t('一、听出乐句在哪里结束；二、分析结尾的终止（半终止停在 V；正格终止是 V(7)–I，注意低音 sol 或 sol–do，留意终止四六）；三、往前找强下属（低音通常是 fa，也可能是 re）；四、回到乐句开头往后分析。', '1. フレーズの終わりを聴き取る。2. 終止を分析（半終止は V で止まる、正格終止は V(7)–I。バスの sol や sol–do、終止の四六に注意）。3. その前の強い下属を探す（バスはたいてい fa、re のことも）。4. フレーズの頭から分析。', '1. Hear where the phrase ends. 2. Analyse the cadence (an HC stops on V; an AC is V(7)–I — look for sol or sol–do in the bass and watch for the cadential 6/4). 3. Back up to the strong predominant (fa usually in the bass, sometimes re). 4. Analyse from the beginning.'),
        ],
      },
      {
        id: 'b212-e2', type: 'discover', practice: true, ref: 'omt2e-tonicization',
        prompt: t('C 大调里的 V6/5/V，低音是哪个音？', 'ハ長調の V6/5/V のバスは？', 'In C major, what is the bass of V6/5/V?'),
        options: ['F♯', 'D', 'C', 'A'],
        answer: 0,
        insight: { title: t('第一转位 = 三音在低音', '第 1 転回 = 第 3 音がバス', 'First inversion = third in the bass'), text: t('V/V 是 D–F♯–A–C；6/5 是第一转位，低音是三音 F♯——它正是指向 G 的导音。', 'V/V は D–F♯–A–C、6/5 は第 1 転回でバスは第 3 音 F♯——G への導音そのもの。', 'V7/V is D–F♯–A–C; 6/5 is first inversion, with the third F♯ in the bass — the very leading tone to G.') },
      },
    ],
    experiment: [
      { id: 'b212-x1', type: 'experiment', toy: 'satb', ref: ['omt2e-roman-numerals', 'omt-species1', 'omt2e-v7', 'omt2e-pd7'],
        prompt: t('这段 I – vi – ii6 – V7 – I 里藏着几处毛病。用上下箭头移动音符，边听边看评分，把它改到 100 分。', 'この I – vi – ii6 – V7 – I にはいくつか問題がある。矢印で音を動かし、聴きながら採点を見て 100 点にしよう。', 'This I – vi – ii6 – V7 – I hides several problems. Move notes with the arrows, listening and watching the score, until it reaches 100.'),
        params: { keyName: 'C', tonic: 0, romans: ['I', 'vi', 'ii6', 'V7', 'I'], chords: [[48, 64, 67, 72], [45, 64, 69, 72], [53, 65, 69, 74], [55, 65, 71, 74], [48, 67, 72, 79]] },
        breakthrough: { id: 'b212-fixed', text: t('你把一整句四部和声修到了满分。', '1 フレーズの 4 声体を満点まで直した。', 'You repaired a whole four-part phrase to full marks.') } },
    ],
    challenge: [
      {
        id: 'b212-c1', type: 'choice', error: 'wrong-function', skills: ['function'], ref: ['omt2e-phrase-model', 'omt2e-cadences'],
        variants: [
          { prompt: t('分析 I – IV – V – vi：最后是什么？', 'I – IV – V – vi を分析：最後は？', 'Analyse I – IV – V – vi: what is the ending?'), options: [t('阻碍进行（避开终止）', '偽進行（終止を避ける）', 'Deceptive motion (avoiding the cadence)'), t('完满正格终止', '完全正格終止', 'A PAC'), t('半终止', '半終止', 'A half cadence'), t('变格终止', '変格終止', 'A plagal cadence')] },
          { prompt: t('分析 I – vi – ii6 – V：最后是什么？', 'I – vi – ii6 – V を分析：最後は？', 'Analyse I – vi – ii6 – V: what is the ending?'), options: [t('半终止', '半終止', 'A half cadence'), t('完满正格终止', '完全正格終止', 'A PAC'), t('阻碍进行', '偽進行', 'Deceptive motion'), t('不完满正格终止', '不完全正格終止', 'An IAC')] },
        ],
        answer: 0,
        explain: t('V–vi 避开终止；停在 V 上是半终止。', 'V–vi は終止を避ける。V で止まれば半終止。', 'V–vi avoids the cadence; stopping on V is a half cadence.'),
      },
      {
        id: 'b212-c2', type: 'choice', error: 'wrong-function', skills: ['function', 'apply'], ref: ['omt2e-tonicization', 'omt2e-cad64'],
        variants: [
          { prompt: t('C 大调：… – D7 – C/G – G7 – C。D7 和 C/G 怎么标？', 'ハ長調：… – D7 – C/G – G7 – C。D7 と C/G は？', 'C major: … – D7 – C/G – G7 – C. How are D7 and C/G labelled?'), options: [t('V7/V 和 cad.6/4', 'V7/V と cad.6/4', 'V7/V and cad.6/4'), t('II7 和 I6/4（主和弦）', 'II7 と I6/4（主和音）', 'II7 and I6/4 (a tonic)'), t('V7 和 I', 'V7 と I', 'V7 and I'), t('ii7 和 IV', 'ii7 と IV', 'ii7 and IV')] },
          { prompt: t('G 大调：… – A7 – G/D – D7 – G。A7 和 G/D 怎么标？', 'ト長調：… – A7 – G/D – D7 – G。A7 と G/D は？', 'G major: … – A7 – G/D – D7 – G. How are A7 and G/D labelled?'), options: [t('V7/V 和 cad.6/4', 'V7/V と cad.6/4', 'V7/V and cad.6/4'), t('II7 和 I6/4（主和弦）', 'II7 と I6/4（主和音）', 'II7 and I6/4 (a tonic)'), t('V7 和 I', 'V7 と I', 'V7 and I'), t('ii7 和 IV', 'ii7 と IV', 'ii7 and IV')] },
        ],
        answer: 0,
        explain: t('D7 解决到 G（V）→ V7/V；属音在低音、接在通往 V 的路上的 I6/4 是终止四六。', 'D7 は G（V）へ解決 → V7/V。V へ向かう途中でバスが属音の I6/4 は終止の四六。', 'D7 resolves to G (V) → V7/V; a I6/4 over the dominant on the way to V is a cadential 6/4.'),
      },
      {
        id: 'b212-c3', type: 'choice', error: 'parallel-fifths', skills: ['voiceLeading'], ref: ['omt2e-predominants', 'omt-species1'],
        variants: [
          { prompt: t('IV → V 时四个声部全部上行一级，会出什么问题？', 'IV → V で 4 声すべてが 1 音上がると何が起きる？', 'IV → V with all four voices rising a step: what goes wrong?'), options: [t('平行五度和八度', '平行 5 度と 8 度', 'Parallel fifths and octaves'), t('导音重复', '導音の重複', 'Doubled leading tone'), t('声部交叉', '声部の交差', 'Voice crossing'), t('没有问题', '問題なし', 'Nothing')] },
          { prompt: t('IV → V 时怎样最容易避开平行？', 'IV → V で平行を避ける最も簡単な方法は？', 'Easiest way to avoid parallels from IV to V?'), options: [t('上方三个声部和低音反向（往下走）', '上の 3 声をバスと反行（下へ）', 'Move the upper three voices against the bass (downward)'), t('所有声部都上行', 'すべて上行', 'Move every voice up'), t('重复导音', '導音を重複', 'Double the leading tone'), t('让女高和男低一起上行', 'ソプラノとバスを一緒に上行', 'Move soprano and bass up together')] },
        ],
        answer: 0,
        explain: t('IV 到 V 根音级进，所有声部同向就会平行；上方声部尽量和低音反向。', 'IV → V は根音が順次進行なので、全声部が同じ向きだと平行になる。上声はバスと反行に。', 'IV to V moves by step, so all voices in the same direction make parallels; keep the upper voices moving against the bass.'),
      },
      G('b212-g1', 'secondaryDominant', 1, ['function']),
      G('b212-g2', 'cadenceType', 2, ['hearing']),
    ],
    lab: [{ id: 'b212-lab', type: 'lab', lab: 'vl-synthesis', mandatory: true, minutes: 7 }],
  },
  pool: [G('b212-p1', 'secondaryDominant', 3, ['function', 'spell']), G('b212-p2', 'cadenceType', 3, ['hearing']), G('b212-p3', 'romanChord', 2, ['identify']), G('b212-p4', 'motion', 2, ['voiceLeading'])],
};

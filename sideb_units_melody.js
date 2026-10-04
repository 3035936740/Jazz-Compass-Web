// Side-B 第 3 章（旋律、对位与乐器）：B3-1 ~ B3-5。
// 出处（每条事实都在原文里核对过）：
//   移调乐器：谱面上的音和实际发音（concert pitch，钢琴这类不移调乐器的音高）不同；乐器的"调"= 吹出谱面上的 C 时听到的实音
//     （B♭ 单簧管写 C 响 B♭）；为了少用加线，有的乐器按八度移调：低音提琴、吉他、低音大管比谱面低八度，短笛、钢片琴高八度，钟琴高两个八度；
//     总谱里移调乐器一般按移调后的样子写（和分谱一样），20 世纪起也有作曲家整份总谱写实音：ref:wiki-transposing
//   各乐器的移调：B♭ 单簧管、B♭ 小号、高音萨克斯比谱面低大二度，次中音萨克斯低大九度；E♭ 单簧管高小三度，中音萨克斯低大六度，上低音萨克斯低大十三度；
//     圆号、英国管（F）低纯五度；从实音写给 B♭ 乐器要上移大二度，写给中音 / 上低音萨克斯要上移大六度：ref:ibmt-transposition
//   吉他标准调弦 E2 A2 D3 G3 B3 E4：相邻都是纯四度，只有 G–B 是大三度：ref:wiki-standard-tuning；吉他比谱面低八度：ref:wiki-transposing ref:ibmt-transposition
//   CAGED：五个开放和弦形（C、A、G、E、D）都可以整体平移（用横按代替琴枕）；同一个和弦的五个形沿指板按 C→A→G→E→D→C 首尾相接；
//     例如 C 形上移 2 品是 D，E 形 C 和弦的根音在第 8 品：ref:agt-caged
//   非和弦音：几乎都是三个音的中间那个，第一个和第三个音与低音协和；按动作分三类——只用级进（经过音：同方向级进进出；辅助音：反方向级进进出）、
//     含跳进（倚音：跳进进来、反向级进离开，通常在较强的位置；逃音：级进进来、反向跳进离开，通常在较弱的位置；两者都更常向下离开）、
//     含保持的音（延留音 / 挂留：保持过来、级进下行离开；上行延留音：保持过来、级进上行离开，两者都在较强的位置；持续音多在低音；
//     先现音是两个音的动作，和弦音提前出现）：ref:omt2e-embellishing
//   定旋律：约 8–16 个音、全音符，以 do 开始和结束，以 re–do（有时 ti–do）级进到达主音，音域不超过十度，一个只出现一次的最高点，
//     以级进为主，大跳后反向级进：ref:omt2e-intro
//   第一类对位：一对一，全音符；上方对位从 do 或 sol（P1、P5、P8）开始，下方对位从 do 开始；结尾是 do，反向级进到达，倒数第二个音程是小三度或大六度；
//     两条线的最高点不要重合；避免交叉与超越；两声部不超过十二度；同度只用于首尾；中间多用不完全协和；绝不连续两个同样大小的完全协和（P5–P12 也算）；
//     同一种不完全协和不超过三次连续；不要以同向进行进入完全协和（直接 / 隐伏八度）；多用反向进行：ref:omt-species1
//   第二类对位：二对一；强拍总是协和；弱拍的不协和只能是经过音（下拍之间是三度，经过音填在中间）；协和弱拍的几种型（协和经过音、替代、跳过的经过音、
//     音程分割、换音区、旋律进行的延迟、协和辅助音）；可以先休止半小节：ref:omt-species2
//   第三类对位：四对一；强拍协和且不用同度；不协和要级进进出（经过音、辅助音），例外是双辅助音和换音（nota cambiata，五个音的型）：ref:omt-species3
//   第四类对位：两条线错开半小节，弱拍的音连到下一个强拍；挂留 = 预备（弱拍、协和）—挂留（强拍、不协和、同一个音）—解决（弱拍、协和、下行一级）；
//     上方可用 7–6、4–3、9–8，下方可用 2–3、5–6、4–5；按解决音程看待（不要连续两个 9–8）；7–6 / 4–3 可以多用但不超过三次连续；
//     先休止半小节；结尾固定：定旋律以 re–do 结束，对位倒数第二小节 do–ti（上方是 7–6 挂留）、最后 do：ref:omt-species4
//   协和与不协和（完全协和 P1 P5 P8，不完全协和 3 6，其余包括低音上方的纯四度都是不协和）：ref:omt-intervals
//   卡农：旋律在一段时间之后被模仿；先出现的叫导句（dux / leader），模仿的叫答句（comes / follower）；在同度或八度上完全一样的叫轮唱（round），
//     如《Frère Jacques》；严格卡农保留音程性质，自由卡农只保留度数；倒影卡农方向相反；逆行卡农（蟹行卡农）倒着走；
//     比例（量度）卡农按比例放慢（扩大）或加快（缩小）；巴赫《哥德堡变奏曲》里有九首卡农，模仿的音程从同度一路到九度：ref:wiki-canon
//   Fux 的定旋律与解答：ref:gotham-species ref:omt2e-gradus
const t = (zh, ja, en) => ({ zh, ja, en });
const G = (id, gen, count, skills, params) => ({ id, type: 'gen', gen, count, skills, ...(params ? { params } : {}) });

const FUX_C = 'C3 E3 F3 G3 E3 A3 G3 E3 F3 E3 D3 C3'.split(' ');

// ===================== B3-1 移调乐器与总谱阅读 =====================
export const LEVEL_B3_1 = {
  minutes: 12,
  insight: t('乐器的"调"就是它吹出谱面上的 C 时听到的音：B♭ 单簧管写 C、响 B♭。', '楽器の「調」は譜面の C を吹いたときに鳴る音：B♭ クラリネットは C と書いて B♭ が鳴る。', 'An instrument’s “key” is the pitch you hear when it plays a written C: a B♭ clarinet reads C and sounds B♭.'),
  sections: {
    discover: [
      {
        id: 'b31-d1', type: 'discover', ref: ['wiki-transposing', 'ibmt-transposition'],
        prompt: t('钢琴和 B♭ 单簧管都照着谱面上的"C"演奏。先听钢琴，再听单簧管实际发出的音。', 'ピアノと B♭ クラリネットがどちらも譜面の「C」を演奏する。ピアノ、次にクラリネットの実音を聴こう。', 'A piano and a B♭ clarinet both play a written “C”. Hear the piano, then what the clarinet actually sounds.'),
        play: [{ label: t('钢琴：写 C', 'ピアノ：C', 'Piano: written C'), audio: { notes: [60], mode: 'melody' } }, { label: t('单簧管：写 C', 'クラリネット：C', 'Clarinet: written C'), audio: { notes: [58], mode: 'melody' } }],
        options: [t('单簧管低了一个全音：响的是 B♭', 'クラリネットは全音低い：鳴っているのは B♭', 'The clarinet is a whole step lower: it sounds B♭'), t('两个一样高', '同じ高さ', 'They are the same'), t('单簧管高了八度', 'クラリネットは 1 オクターヴ高い', 'The clarinet is an octave higher')],
        answer: 0,
        insight: {
          title: t('"B♭ 调乐器"的意思', '「B♭ 管」の意味', 'What “in B♭” means'),
          text: t('移调乐器的谱面不按实音（concert pitch，钢琴的音高）写。说一件乐器"在 B♭ 调"，是指它吹出谱面上的 C 时，实际听到的是 B♭。所以 B♭ 单簧管、B♭ 小号、高音萨克斯都比谱面低大二度。', '移調楽器の譜面は実音（ピアノの音高）では書かれない。「B♭ 管」とは、譜面の C を吹いたときに B♭ が鳴るという意味。だから B♭ クラリネット・B♭ トランペット・ソプラノ・サックスは譜面より長 2 度低い。', 'Transposing instruments are not written at concert pitch (the piano’s pitch). An instrument “in B♭” sounds B♭ when it plays a written C — so B♭ clarinet, B♭ trumpet and soprano sax all sound a major second below the page.'),
        },
      },
    ],
    explain: [
      {
        id: 'b31-e1', type: 'page', ref: 'ibmt-transposition',
        tool: { feature: 'instruments' },
        title: t('常见的移调', 'よくある移調', 'Common transpositions'),
        text: [
          t('B♭：单簧管、小号、高音萨克斯低大二度；次中音萨克斯低大九度（再低一个八度）。E♭：中音萨克斯低大六度，上低音萨克斯低大十三度；E♭ 单簧管反而高小三度。F：圆号、英国管低纯五度。', 'B♭：クラリネット・トランペット・ソプラノ・サックスは長 2 度下、テナー・サックスは長 9 度下（さらに 1 オクターヴ下）。E♭：アルト・サックスは長 6 度下、バリトン・サックスは長 13 度下、E♭ クラリネットは逆に短 3 度上。F：ホルンとイングリッシュ・ホルンは完全 5 度下。', 'B♭: clarinet, trumpet and soprano sax sound a major 2nd lower; tenor sax a major 9th lower (an extra octave). E♭: alto sax a major 6th lower, baritone sax a major 13th lower, while the E♭ clarinet sounds a minor 3rd higher. F: horn and English horn sound a perfect 5th lower.'),
          t('反过来，从实音写分谱就往相反的方向移：给 B♭ 乐器上移大二度，给中音萨克斯上移大六度。', '逆に実音からパート譜を書くときは反対方向へ：B♭ 楽器には長 2 度上、アルト・サックスには長 6 度上。', 'Going the other way, writing a part from concert pitch moves in the opposite direction: up a major 2nd for B♭ instruments, up a major 6th for alto sax.'),
        ],
      },
      {
        id: 'b31-e2', type: 'page', ref: 'wiki-transposing',
        title: t('只差八度的乐器，和总谱', 'オクターヴだけ違う楽器と総譜', 'Octave transposers, and the full score'),
        text: [
          t('有的乐器只为了少用加线而按八度移调：低音提琴、吉他、低音大管比谱面低八度，短笛、钢片琴高八度，钟琴高两个八度。它们的调号和实音一样。', '加線を減らすためにオクターヴだけ移す楽器もある：コントラバス・ギター・コントラファゴットは 1 オクターヴ下、ピッコロ・チェレスタは 1 オクターヴ上、グロッケンシュピールは 2 オクターヴ上。調号は実音と同じ。', 'Some instruments transpose only by octaves to avoid ledger lines: double bass, guitar and contrabassoon sound an octave lower, piccolo and celesta an octave higher, glockenspiel two octaves higher. Their key signatures match concert pitch.'),
          t('总谱里，移调乐器一般和分谱一样按移调后的样子写；20 世纪起也有作曲家整份总谱都写实音。读总谱时先看每一行写的是什么乐器、在什么调。', '総譜では移調楽器はふつうパート譜と同じく移調して書かれる。20 世紀からは総譜全体を実音で書く作曲家もいる。総譜を読むときは、まず各段の楽器と調を確認。', 'In a full score transposing parts are usually written transposed, as in the players’ parts; since the 20th century some composers write entire scores at concert pitch. When reading a score, first check each staff’s instrument and key.'),
        ],
      },
      {
        id: 'b31-e3', type: 'discover', practice: true, ref: 'ibmt-transposition',
        prompt: t('乐队要演奏实音 E♭ 大调。中音萨克斯的分谱要写什么调？', 'バンドが実音で変ホ長調を演奏する。アルト・サックスのパート譜は何調？', 'The band plays in concert E♭ major. What key is the alto sax part written in?'),
        options: [t('C 大调（上移大六度）', 'ハ長調（長 6 度上）', 'C major (up a major 6th)'), t('F 大调（上移大二度）', 'ヘ長調（長 2 度上）', 'F major (up a major 2nd)'), t('E♭ 大调（不变）', '変ホ長調（そのまま）', 'E♭ major (unchanged)')],
        answer: 0,
        insight: { title: t('往实音的反方向移', '実音と反対方向へ', 'Move opposite to the sound'), text: t('中音萨克斯比谱面低大六度，所以写谱要上移大六度：E♭ 上方大六度是 C，C 大调没有升降号——这正是萨克斯手喜欢降号调的原因之一。', 'アルト・サックスは譜面より長 6 度低いので、書くときは長 6 度上へ：E♭ の長 6 度上は C、ハ長調は調号なし。', 'Alto sax sounds a major 6th lower, so the part goes up a major 6th: a major 6th above E♭ is C, and C major has no sharps or flats.') },
      },
    ],
    experiment: [
      { id: 'b31-x1', type: 'experiment', toy: 'transpose', ref: ['ibmt-transposition', 'wiki-transposing'],
        prompt: t('选一件乐器和谱面上的一个音，看它实际响什么；再选乐队的实音调，看这件乐器的分谱要写什么调。吉他和低音提琴的调号为什么不变？', '楽器と譜面の音を選び、実音を見よう。次にバンドの実音の調を選び、この楽器のパート譜の調を見よう。ギターとコントラバスの調号はなぜ変わらない？', 'Pick an instrument and a written note to see what sounds; then pick the band’s concert key to see the part’s written key. Why don’t guitar and double bass change key signature?'),
        params: {},
        breakthrough: { id: 'b31-transpose', text: t('你能在谱面和实音之间来回翻译了。', '譜面と実音を自在に行き来できるようになった。', 'You can now translate between written and concert pitch.') } },
    ],
    challenge: [
      {
        id: 'b31-c1', type: 'choice', error: 'transposition', skills: ['calc'], ref: 'ibmt-transposition',
        variants: [
          { prompt: t('B♭ 小号的谱面上写 G4，实际响什么？', 'B♭ トランペットの譜面が G4。実音は？', 'A B♭ trumpet part shows G4. What sounds?'), options: ['F4', 'A4', 'G4', 'E♭4'] },
          { prompt: t('圆号（F）的谱面上写 C5，实际响什么？', 'ホルン（F）の譜面が C5。実音は？', 'A horn (in F) part shows C5. What sounds?'), options: ['F4', 'G5', 'C5', 'E♭5'] },
          { prompt: t('中音萨克斯的谱面上写 A4，实际响什么？', 'アルト・サックスの譜面が A4。実音は？', 'An alto sax part shows A4. What sounds?'), options: ['C4', 'C5', 'F♯4', 'B♭4'] },
        ],
        answer: 0,
        explain: t('B♭ 乐器低大二度、F 乐器低纯五度、中音萨克斯低大六度。', 'B♭ 楽器は長 2 度下、F 楽器は完全 5 度下、アルト・サックスは長 6 度下。', 'B♭ instruments sound a major 2nd lower, F instruments a perfect 5th lower, alto sax a major 6th lower.'),
      },
      {
        id: 'b31-c2', type: 'choice', error: 'transposition', skills: ['calc', 'apply'], ref: 'ibmt-transposition',
        variants: [
          { prompt: t('要让 B♭ 单簧管响出实音 D5，谱面要写？', 'B♭ クラリネットで実音 D5 を鳴らすには譜面は？', 'For a B♭ clarinet to sound D5, write…'), options: ['E5', 'C5', 'D5', 'F♯5'] },
          { prompt: t('乐队演奏实音 F 大调。B♭ 小号的分谱写什么调？', 'バンドが実音ヘ長調。B♭ トランペットのパート譜は何調？', 'The band plays in concert F major. What key is the B♭ trumpet part in?'), options: [t('G 大调', 'ト長調', 'G major'), t('E♭ 大调', '変ホ長調', 'E♭ major'), t('F 大调', 'ヘ長調', 'F major'), t('C 大调', 'ハ長調', 'C major')] },
          { prompt: t('乐队演奏实音 B♭ 大调。圆号（F）的分谱写什么调？', 'バンドが実音変ロ長調。ホルン（F）のパート譜は何調？', 'The band plays in concert B♭ major. What key is the horn (F) part in?'), options: [t('F 大调', 'ヘ長調', 'F major'), t('E♭ 大调', '変ホ長調', 'E♭ major'), t('B♭ 大调', '変ロ長調', 'B♭ major'), t('C 大调', 'ハ長調', 'C major')] },
        ],
        answer: 0,
        explain: t('写分谱往相反方向移：B♭ 乐器上移大二度，F 乐器上移纯五度。', 'パート譜は反対方向へ：B♭ 楽器は長 2 度上、F 楽器は完全 5 度上。', 'Parts move the opposite way: up a major 2nd for B♭ instruments, up a perfect 5th for F instruments.'),
      },
      {
        id: 'b31-c3', type: 'choice', error: 'transposition', skills: ['identify'], ref: 'wiki-transposing',
        variants: [
          { prompt: t('下面哪件乐器只按八度移调（调号和实音一样）？', 'オクターヴだけ移調する（調号は実音と同じ）楽器は？', 'Which instrument transposes only by an octave (same key signature as concert)?'), options: [t('吉他', 'ギター', 'Guitar'), t('中音萨克斯', 'アルト・サックス', 'Alto sax'), t('圆号', 'ホルン', 'Horn'), t('B♭ 单簧管', 'B♭ クラリネット', 'B♭ clarinet')] },
          { prompt: t('钟琴（glockenspiel）的实音和谱面相比？', 'グロッケンシュピールの実音は譜面と比べて？', 'Glockenspiel sounds, compared with the page…'), options: [t('高两个八度', '2 オクターヴ上', 'two octaves higher'), t('低一个八度', '1 オクターヴ下', 'an octave lower'), t('一样', '同じ', 'the same'), t('低大二度', '長 2 度下', 'a major 2nd lower')] },
          { prompt: t('次中音萨克斯和高音萨克斯都在 B♭ 调，区别是？', 'テナーとソプラノ・サックスはどちらも B♭ 管。違いは？', 'Tenor and soprano sax are both in B♭. The difference is…'), options: [t('次中音再低一个八度（低大九度）', 'テナーはさらに 1 オクターヴ下（長 9 度下）', 'the tenor sounds an extra octave lower (a major 9th)'), t('次中音高大二度', 'テナーは長 2 度上', 'the tenor sounds a major 2nd higher'), t('没有区别', '違いはない', 'no difference'), t('次中音不移调', 'テナーは移調しない', 'the tenor doesn’t transpose')] },
        ],
        answer: 0,
        explain: t('吉他、低音提琴低八度，短笛高八度，钟琴高两个八度；次中音萨克斯在 B♭ 移调之外再低一个八度。', 'ギター・コントラバスは 1 オクターヴ下、ピッコロは上、グロッケンは 2 オクターヴ上。テナー・サックスは B♭ の移調にさらに 1 オクターヴ下。', 'Guitar and double bass sound an octave lower, piccolo an octave higher, glockenspiel two octaves higher; the tenor sax adds an octave to the B♭ transposition.'),
      },
      G('b31-g1', 'transposing', 3, ['calc']),
    ],
  },
  pool: [G('b31-p1', 'transposing', 5, ['calc', 'apply'])],
};

// ===================== B3-2 指板上的和声 =====================
export const LEVEL_B3_2 = {
  minutes: 12,
  insight: t('同一个和弦在指板上有五个位置，CAGED 把它们连成一条首尾相接的链。', '同じ和音は指板に 5 つの位置があり、CAGED はそれを 1 本の鎖につなぐ。', 'One chord has five places on the neck, and CAGED links them into one continuous chain.'),
  sections: {
    discover: [
      {
        id: 'b32-d1', type: 'discover', ref: 'agt-caged',
        prompt: t('两次弹的都是 C 大三和弦：一次在开放把位（C 形），一次在第 3 品（A 形）。听起来是同一个和弦吗？', '2 回ともハ長三和音：1 回は開放ポジション（C フォーム）、1 回は 3 フレット（A フォーム）。同じ和音に聞こえる？', 'Both are C major: once in open position (C shape), once at the 3rd fret (A shape). Is it the same chord?'),
        play: [{ label: t('C 形', 'C フォーム', 'C shape'), audio: { notes: [48, 52, 55, 60, 64], mode: 'harmonic' } }, { label: t('A 形（第 3 品）', 'A フォーム（3 フレット）', 'A shape (3rd fret)'), audio: { notes: [48, 55, 60, 64, 67], mode: 'harmonic' } }],
        options: [t('是同一个和弦，只是音的排列和位置不同', '同じ和音で、配置と位置が違うだけ', 'The same chord, just voiced and placed differently'), t('第二个是 A 和弦', '2 つ目は A の和音', 'The second is an A chord'), t('完全不同', 'まったく違う', 'Completely different')],
        answer: 0,
        insight: {
          title: t('形可以移动', 'フォームは動かせる', 'Shapes move'),
          text: t('CAGED 用五个开放和弦形（C、A、G、E、D）来看指板：每个形都能整体平移，用横按代替琴枕。把 A 形移到第 3 品，响的就是 C。同一个和弦的五个形沿指板按 C→A→G→E→D→C 首尾相接。', 'CAGED は 5 つの開放コード・フォーム（C・A・G・E・D）で指板を見る：どのフォームも平行移動でき、ナットの代わりにセーハする。A フォームを 3 フレットへ動かすと C が鳴る。同じ和音の 5 つのフォームは指板上で C→A→G→E→D→C とつながる。', 'CAGED reads the neck through five open shapes (C, A, G, E, D): each can slide as a whole, a barre replacing the nut. Move the A shape to the 3rd fret and you get C. One chord’s five shapes connect along the neck in the order C→A→G→E→D→C.'),
        },
      },
    ],
    explain: [
      {
        id: 'b32-e1', type: 'page', ref: ['wiki-standard-tuning', 'wiki-transposing'],
        tool: { feature: 'fretboard' },
        title: t('六根弦的标准调弦', '6 弦の標準チューニング', 'Standard tuning'),
        text: [
          t('六弦吉他从低到高是 E2 A2 D3 G3 B3 E4：相邻两根弦都是纯四度，只有 G–B 是大三度。所以在同一品上，大部分弦之间的关系一样，到 B 弦要"错开一品"。', '6 弦ギターは低い方から E2 A2 D3 G3 B3 E4：隣り合う弦は完全 4 度で、G–B だけ長 3 度。だから同じフレットでもほとんどの弦の関係は同じで、B 弦で「1 フレットずれる」。', 'A six-string guitar is tuned E2 A2 D3 G3 B3 E4 from low to high: perfect fourths between neighbours, except a major third from G to B. So shapes behave the same across most strings and shift by one fret at the B string.'),
          t('吉他谱比实音高八度记（实际声音低八度），调号和实音一样。', 'ギター譜は実音より 1 オクターヴ高く書く（実際は 1 オクターヴ下で鳴る）。調号は実音と同じ。', 'Guitar music is written an octave above how it sounds; the key signature matches concert pitch.'),
        ],
        visual: { kind: 'strings', strings: ['E', 'A', 'D', 'G', 'B', 'E'], midis: [40, 45, 50, 55, 59, 64], frets: 5, dots: [{ s: 0, f: 5 }, { s: 1, f: 5 }, { s: 2, f: 5 }, { s: 3, f: 4 }, { s: 4, f: 5 }] },
      },
      {
        id: 'b32-e2', type: 'discover', practice: true, ref: 'wiki-standard-tuning',
        prompt: t('在 D 弦（第 4 弦）第 5 品按下去，音和哪根空弦一样？', 'D 弦（4 弦）の 5 フレットは、どの開放弦と同じ音？', 'Fret 5 on the D string matches which open string?'),
        options: [t('G 弦', 'G 弦', 'The G string'), t('B 弦', 'B 弦', 'The B string'), t('A 弦', 'A 弦', 'The A string')],
        answer: 0,
        insight: { title: t('纯四度 = 5 品', '完全 4 度 = 5 フレット', 'A perfect fourth = 5 frets'), text: t('D 往上纯四度（5 个半音）是 G。只有 G 弦到 B 弦是大三度，所以那里要用第 4 品。', 'D の完全 4 度上（半音 5 つ）は G。G 弦と B 弦の間だけ長 3 度なので、そこは 4 フレット。', 'A perfect fourth (5 half steps) above D is G. Only G to B is a major third, so there you use fret 4.') },
      },
    ],
    experiment: [
      { id: 'b32-x1', type: 'experiment', toy: 'fret', ref: 'agt-caged',
        prompt: t('选一个和弦，看它的五个形落在指板哪里；点单个形可以听。C 的 E 形根音在第几品？换成 G，开放把位变成了哪个形？', '和音を選んで 5 つのフォームの位置を見よう。1 つのフォームを押すと聴ける。C の E フォームのルートは何フレット？ G にすると開放ポジションはどのフォーム？', 'Pick a chord and see where its five shapes fall; tap one shape to hear it. Where is the root of C’s E shape? Switch to G — which shape is in open position now?'),
        params: {},
        breakthrough: { id: 'b32-caged', text: t('你看到了一个和弦铺满整个指板。', '1 つの和音が指板全体に広がるのが見えた。', 'You saw one chord cover the whole neck.') } },
    ],
    challenge: [
      {
        id: 'b32-c1', type: 'choice', error: 'fretboard', skills: ['calc'], ref: 'wiki-standard-tuning',
        variants: [
          { prompt: t('吉他标准调弦里，哪两根相邻的弦之间不是纯四度？', '標準チューニングで、隣り合う弦が完全 4 度でないのは？', 'In standard tuning, which neighbouring strings are not a perfect fourth apart?'), options: ['G–B', 'D–G', 'A–D', 'B–E'] },
          { prompt: t('六弦吉他标准调弦从低到高是？', '6 弦ギターの標準チューニング（低い方から）は？', 'Standard six-string tuning from low to high is…'), options: ['E A D G B E', 'E A D G C F', 'D A D G A D', 'G D A E B E'] },
        ],
        answer: 0,
        explain: t('E2 A2 D3 G3 B3 E4：只有 G–B 是大三度。', 'E2 A2 D3 G3 B3 E4：G–B だけ長 3 度。', 'E2 A2 D3 G3 B3 E4: only G–B is a major third.'),
      },
      {
        id: 'b32-c2', type: 'choice', error: 'fretboard', skills: ['apply'], ref: 'agt-caged',
        variants: [
          { prompt: t('把开放的 C 形整体上移 2 品，得到什么和弦？', '開放の C フォームを 2 フレット上へ動かすと何の和音？', 'Slide the open C shape up 2 frets. What chord is it?'), options: ['D', 'C♯', 'E', 'B♭'] },
          { prompt: t('E 形的 C 和弦，根音（第 6 弦）在第几品？', 'E フォームの C の和音、ルート（6 弦）は何フレット？', 'In the E-shape C chord, the root (6th string) is at which fret?'), options: ['8', '3', '5', '10'] },
          { prompt: t('E 形横按在第 2 品，是什么和弦？', 'E フォームを 2 フレットでセーハすると何の和音？', 'An E-shape barre at the 2nd fret is which chord?'), options: ['F♯', 'F', 'G', 'E♭'] },
        ],
        answer: 0,
        explain: t('形整体平移多少品，根音就升高多少个半音：C 上移 2 品是 D；E 形根音在第 6 弦，C 在第 8 品；E 上移 2 品是 F♯。', 'フォームを動かしたフレット数だけルートが上がる：C を 2 フレット上げると D、E フォームのルートは 6 弦で C は 8 フレット、E を 2 フレット上げると F♯。', 'Slide a shape n frets and the root rises n half steps: C up 2 is D; the E shape’s root is on string 6, C at fret 8; E up 2 is F♯.'),
      },
      {
        id: 'b32-c3', type: 'choice', error: 'fretboard', skills: ['identify'], ref: 'agt-caged',
        variants: [
          { prompt: t('同一个和弦沿指板往上，A 形后面接哪个形？', '同じ和音を指板の上へたどると、A フォームの次は？', 'Moving up the neck on one chord, which shape follows the A shape?'), options: ['G', 'E', 'C', 'D'] },
          { prompt: t('同一个和弦沿指板往上，E 形后面接哪个形？', '同じ和音を指板の上へたどると、E フォームの次は？', 'Moving up the neck on one chord, which shape follows the E shape?'), options: ['D', 'C', 'G', 'A'] },
        ],
        answer: 0,
        explain: t('顺序是 C→A→G→E→D，然后又回到 C。', '順番は C→A→G→E→D、そしてまた C。', 'The order is C→A→G→E→D, then back to C.'),
      },
      G('b32-g1', 'fretNote', 3, ['calc']),
    ],
  },
  pool: [G('b32-p1', 'fretNote', 5, ['calc', 'identify'])],
};

// ===================== B3-3 非和弦音分析 =====================
export const LEVEL_B3_3 = {
  minutes: 13,
  insight: t('认非和弦音不靠背名字：看它怎么进来、怎么离开，名字自己就出来了。', '非和声音は名前の暗記ではなく、入り方と出方を見れば名前が決まる。', 'You don’t memorise embellishing tones by name: look at how they arrive and leave, and the name follows.'),
  sections: {
    discover: [
      {
        id: 'b33-d1', type: 'discover', ref: 'omt2e-embellishing',
        prompt: t('C 大三和弦上，中间的音都是 F（不属于和弦）。A：E–F–G；B：C–F–E。哪一个的 F 更像"靠"在 E 上？', 'ハ長三和音の上で、真ん中はどちらも F（和音外）。A：E–F–G、B：C–F–E。F が E に「寄りかかって」いるのは？', 'Over C major, the middle note is F (not in the chord) both times. A: E–F–G; B: C–F–E. In which does F lean on E?'),
        play: [{ label: 'A：E–F–G', audio: { chords: [[48, 55, 64], [48, 55, 65], [48, 55, 67]], gap: 600 } }, { label: 'B：C–F–E', audio: { chords: [[48, 55, 60], [48, 55, 65], [48, 55, 64]], gap: 600 } }],
        options: [t('B：跳进到 F，再级进落回 E', 'B：F へ跳躍し、順次で E へ落ちる', 'B: it leaps to F, then steps down to E'), t('A：一路级进经过', 'A：順次に通り過ぎる', 'A: it passes through by step'), t('两个一样', '同じ', 'They are the same')],
        answer: 0,
        insight: {
          title: t('进来和离开的方式决定名字', '入り方と出方が名前を決める', 'Approach and departure decide the name'),
          text: t('非和弦音几乎都是三个音的中间那个，两头是和弦音。A 里的 F 级进进来、同方向级进离开，是经过音；B 里的 F 跳进进来、反方向级进离开，是倚音——它通常落在较强的位置，所以听起来像"靠"在下一个音上。', '非和声音はほとんど 3 音の真ん中で、両端は和声音。A の F は順次で入り同じ方向へ順次で出るので経過音。B の F は跳躍で入り反対方向へ順次で出るので倚音——ふつう強い位置にあるので、次の音に「寄りかかる」ように聞こえる。', 'An embellishing tone is almost always the middle of three notes with chord tones on either side. In A, F arrives by step and leaves by step in the same direction: a passing tone. In B, F arrives by leap and leaves by step the other way: an appoggiatura — usually on the stronger beat, so it seems to lean on the next note.'),
        },
      },
    ],
    explain: [
      {
        id: 'b33-e1', type: 'page', ref: 'omt2e-embellishing',
        tool: { feature: 'nonchord' },
        title: t('三类非和弦音', '非和声音の 3 つのグループ', 'Three families of embellishing tones'),
        text: [
          t('只用级进：经过音（同方向级进进出）、辅助音（反方向级进进出，分上辅助音和下辅助音）。', '順次進行だけ：経過音（同じ方向へ順次で入って出る）、刺繍音（反対方向へ順次で入って出る。上方・下方がある）。', 'Stepwise only: passing tones (in and out by step, same direction) and neighbour tones (in and out by step, opposite directions — upper or lower).'),
          t('含跳进：倚音（跳进进来、反向级进离开，通常在较强的位置）、逃音（级进进来、反向跳进离开，通常在较弱的位置）。两者都更常向下离开。', '跳躍を含む：倚音（跳躍で入り反対方向へ順次で出る、ふつう強い位置）、逸音（順次で入り反対方向へ跳躍で出る、ふつう弱い位置）。どちらも下へ出ることが多い。', 'With a leap: appoggiaturas (leap in, step out the other way, usually on the stronger beat) and escape tones (step in, leap out the other way, usually on the weaker beat). Both more often leave downward.'),
          t('含保持的音：延留音（挂留，保持过来、级进下行）、上行延留音（保持过来、级进上行），都在较强的位置；持续音多在低音，上方和弦换了它不动；先现音只有两个音：下一个和弦的音提前出现。', '保持を含む：掛留音（保持して入り順次下行）、リターデイション（保持して入り順次上行）、どちらも強い位置。保続音は多くバスにあり、上の和音が変わっても動かない。先取音は 2 音の動き：次の和音の音が先に出る。', 'With a held note: suspensions (held over, then step down) and retardations (held over, then step up), both on the stronger beat; pedal tones, usually in the bass, stay put under changing chords; anticipations are two-note gestures — a chord tone arrives early.'),
        ],
      },
      {
        id: 'b33-e2', type: 'discover', practice: true, ref: 'omt2e-embellishing',
        prompt: t('F 和弦换到 C 和弦时，F 保持不动，然后级进下行到 E。这个 F 是？', 'F の和音から C の和音へ変わるとき、F が保持され、それから E へ順次下行。この F は？', 'As F major changes to C major, F is held, then steps down to E. That F is…'),
        audio: { chords: [[41, 57, 65], [48, 55, 65], [48, 55, 64]], gap: 700 },
        options: [t('延留音（挂留）', '掛留音', 'A suspension'), t('经过音', '経過音', 'A passing tone'), t('倚音', '倚音', 'An appoggiatura')],
        answer: 0,
        insight: { title: t('保持过来，再往下走', '保持して、下へ', 'Held over, then down'), text: t('上一个和弦里的音保持到新和弦上变成不协和，再级进下行解决：这就是延留音（挂留）。往上解决的叫上行延留音。', '前の和音の音が新しい和音の上で保持されて不協和になり、順次下行して解決：これが掛留音。上へ解決するのはリターデイション。', 'A note from the previous chord is held into the new one, becomes dissonant, then resolves down by step: a suspension. Resolving upward makes it a retardation.') },
      },
    ],
    experiment: [
      { id: 'b33-x1', type: 'experiment', toy: 'nct', ref: 'omt2e-embellishing',
        prompt: t('选"怎么进来"和"怎么离开"，看它是哪一种非和弦音，并在 C 大三和弦上听。哪些组合不属于任何一种？', '「入り方」と「出方」を選んで、どの非和声音か見て、ハ長三和音の上で聴こう。どれにも当てはまらない組み合わせは？', 'Choose how the note arrives and leaves, see which embellishing tone it is, and hear it over C major. Which combinations fit none of them?'),
        params: {},
        breakthrough: { id: 'b33-table', text: t('你用两个问题就能认出每一种非和弦音。', '2 つの問いだけで非和声音を見分けられるようになった。', 'Two questions are all you need to name any embellishing tone.') } },
    ],
    challenge: [
      {
        id: 'b33-c1', type: 'choice', error: 'nct-type', skills: ['identify'], ref: 'omt2e-embellishing',
        variants: [
          { prompt: t('级进进来、反向跳进离开，通常在较弱的位置。这是？', '順次で入り反対方向へ跳躍で出る、ふつう弱い位置。これは？', 'Step in, leap out the other way, usually on a weaker beat. This is…'), options: [t('逃音', '逸音', 'An escape tone'), t('倚音', '倚音', 'An appoggiatura'), t('经过音', '経過音', 'A passing tone'), t('辅助音', '刺繍音', 'A neighbour tone')] },
          { prompt: t('级进进来、反向级进离开（回到原来的音）。这是？', '順次で入り反対方向へ順次で出る（元の音に戻る）。これは？', 'Step in, step out the other way (back to the first note). This is…'), options: [t('辅助音', '刺繍音', 'A neighbour tone'), t('经过音', '経過音', 'A passing tone'), t('逃音', '逸音', 'An escape tone'), t('先现音', '先取音', 'An anticipation')] },
          { prompt: t('保持过来、级进上行解决，在较强的位置。这是？', '保持して入り順次上行で解決、強い位置。これは？', 'Held over, resolved up by step, on a stronger beat. This is…'), options: [t('上行延留音', 'リターデイション', 'A retardation'), t('延留音（挂留）', '掛留音', 'A suspension'), t('持续音', '保続音', 'A pedal tone'), t('倚音', '倚音', 'An appoggiatura')] },
        ],
        answer: 0,
        explain: t('看进出：级进 / 跳进 / 保持，同方向 / 反方向；再看在强位置还是弱位置。', '入り方と出方：順次・跳躍・保持、同じ方向か反対か。それから強い位置か弱い位置か。', 'Check the approach and departure — step, leap or held; same or opposite direction — then whether it sits on a strong or weak beat.'),
      },
      {
        id: 'b33-c2', type: 'listen', error: 'nct-type', skills: ['hearing'], ref: 'omt2e-embellishing',
        prompt: t('听：C 大三和弦上，中间那个音是什么？', '聴いて：ハ長三和音の上で、真ん中の音は？', 'Listen: over C major, what is the middle note?'),
        options: [t('经过音', '経過音', 'A passing tone'), t('辅助音', '刺繍音', 'A neighbour tone'), t('倚音', '倚音', 'An appoggiatura'), t('逃音', '逸音', 'An escape tone')],
        variants: [
          { play: [{ label: t('播放', '再生', 'Play'), audio: { chords: [[48, 55, 64], [48, 55, 65], [48, 55, 67]], gap: 600 } }], answer: 0 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: { chords: [[48, 55, 64], [48, 55, 62], [48, 55, 64]], gap: 600 } }], answer: 1 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: { chords: [[48, 55, 60], [48, 55, 65], [48, 55, 64]], gap: 600 } }], answer: 2 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: { chords: [[48, 55, 64], [48, 55, 65], [48, 55, 60]], gap: 600 } }], answer: 3 },
        ],
        explain: t('E–F–G 经过；E–D–E 辅助；C–F–E 跳进来、级进走是倚音；E–F–C 级进来、跳进走是逃音。', 'E–F–G は経過、E–D–E は刺繍、C–F–E は跳躍で入り順次で出る倚音、E–F–C は順次で入り跳躍で出る逸音。', 'E–F–G passes; E–D–E is a neighbour; C–F–E leaps in and steps out (appoggiatura); E–F–C steps in and leaps out (escape tone).'),
      },
      {
        id: 'b33-c3', type: 'choice', error: 'nct-type', skills: ['apply'], ref: 'omt2e-embellishing',
        variants: [
          { prompt: t('下一个和弦的音提前出现、只有两个音的动作。这是？', '次の和音の音が先に出る、2 音だけの動き。これは？', 'A chord tone arrives early, a two-note gesture. This is…'), options: [t('先现音', '先取音', 'An anticipation'), t('经过音', '経過音', 'A passing tone'), t('延留音（挂留）', '掛留音', 'A suspension'), t('辅助音', '刺繍音', 'A neighbour tone')] },
          { prompt: t('低音一直是 C，上方的和弦从 C 换到 F 又换到 G7 再回到 C。这个低音 C 是？', 'バスはずっと C、上の和音は C → F → G7 → C。このバスの C は？', 'The bass stays on C while the chords above go C → F → G7 → C. That bass C is…'), options: [t('持续音', '保続音', 'A pedal tone'), t('先现音', '先取音', 'An anticipation'), t('逃音', '逸音', 'An escape tone'), t('倚音', '倚音', 'An appoggiatura')] },
        ],
        answer: 0,
        explain: t('先现音是两个音的动作；持续音多在低音，上方和弦换了它不动。', '先取音は 2 音の動き。保続音は多くバスにあり、上の和音が変わっても動かない。', 'An anticipation is a two-note gesture; a pedal tone sits (usually in the bass) under changing chords.'),
      },
      G('b33-g1', 'nctType', 3, ['identify']),
    ],
  },
  pool: [G('b33-p1', 'nctType', 5, ['identify', 'hearing'])],
};

// ===================== B3-4 类别对位 I–II =====================
export const LEVEL_B3_4 = {
  minutes: 19, core: true,
  insight: t('终止是两条线反向级进"合拢"到八度：倒数第二个音程是大六度或小三度。', '終止は 2 本の線が反行の順次進行でオクターヴへ「閉じる」こと：最後から 2 番目の音程は長 6 度か短 3 度。', 'A cadence is two lines closing in contrary stepwise motion onto the octave: the penultimate interval is a major sixth or minor third.'),
  sections: {
    discover: [
      {
        id: 'b34-d1', type: 'discover', ref: 'omt-species1',
        prompt: t('定旋律最后是 D–C。上方的对位，A 版是 B–C（大六度 → 八度），B 版是 G–C（纯五度 → 八度）。哪一个更像"到达"？', '定旋律の最後は D–C。上の対旋律、A は B–C（長 6 度 → 8 度）、B は G–C（完全 5 度 → 8 度）。「着いた」感じが強いのは？', 'The cantus ends D–C. Above it, version A goes B–C (major 6th → octave), version B G–C (perfect 5th → octave). Which sounds more like an arrival?'),
        play: [{ label: 'A：B–C', audio: { chords: [[52, 67], [50, 71], [48, 72]], gap: 800 } }, { label: 'B：G–C', audio: { chords: [[52, 64], [50, 67], [48, 72]], gap: 800 } }],
        options: [t('A：两条线反向级进，合拢到八度', 'A：2 本の線が反行の順次進行でオクターヴへ閉じる', 'A: the lines close in contrary stepwise motion onto the octave'), t('B：五度更稳', 'B：5 度のほうが安定', 'B: the fifth is more stable'), t('一样', '同じ', 'The same')],
        answer: 0,
        insight: {
          title: t('终止要"合拢"', '終止は「閉じる」', 'The cadence closes in'),
          text: t('第一类对位的结尾是 do，而且要反向级进到达：定旋律 re–do，对位就是 ti–do；定旋律 ti–do，对位就是 re–do。所以倒数第二个音程是大六度或小三度，大调小调都一样。B 版的 G–C 是同向跳进进入八度，正是要避免的直接八度。', '第一類対位法の終わりは do で、反行の順次進行で到達する：定旋律が re–do なら対旋律は ti–do、ti–do なら re–do。だから最後から 2 番目の音程は長 6 度か短 3 度で、長調でも短調でも同じ。B の G–C は並行の跳躍でオクターヴに入る、避けるべき並達 8 度。', 'First species ends on do, reached by contrary step: if the cantus goes re–do, the counterpoint goes ti–do; if ti–do, then re–do. So the penultimate interval is a major sixth or minor third, in major and minor alike. Version B’s G–C enters the octave by similar motion with a leap — the direct octave to avoid.'),
        },
      },
    ],
    explain: [
      {
        id: 'b34-e1', type: 'page', ref: ['omt-species1', 'omt2e-intro'],
        tool: { feature: 'counterpoint' },
        title: t('第一类：一对一', '第一類：1 対 1', 'First species: one against one'),
        text: [
          t('定旋律（约 8–16 个全音符、以 do 开始和结束）上方或下方，每个音配一个全音符。上方对位从 do 或 sol（同度、五度、八度）开始，下方对位从 do 开始。', '定旋律（全音符で 8–16 音ほど、do で始まり do で終わる）の上か下に、1 音ずつ全音符をつける。上の対旋律は do か sol（1 度・5 度・8 度）、下は do で始める。', 'Above or below a cantus firmus (about 8–16 whole notes, beginning and ending on do), write one whole note per note. A counterpoint above begins on do or sol (unison, fifth or octave); below, on do.'),
          t('中间多用三度、六度；同度只用于首尾；绝不连续两个同样大小的完全协和（P5–P12 也算）；不要同向进入完全协和；同一种三度或六度不超过三次连续；两条线的最高点不要重合；多用反向进行。', '途中は 3 度・6 度を多く。1 度は最初と最後だけ。同じ大きさの完全協和を 2 つ続けない（P5–P12 も同じ）。並行で完全協和に入らない。同じ 3 度・6 度は 3 回まで。2 本の最高点を重ねない。反行を多く。', 'Use mostly thirds and sixths; unisons only at the ends; never two perfect intervals of the same size in a row (P5–P12 counts); never approach a perfect interval in similar motion; no more than three of the same third or sixth in a row; don’t let the climaxes coincide; prefer contrary motion.'),
        ],
      },
      {
        id: 'b34-e2', type: 'page', ref: 'omt-species2',
        title: t('第二类：二对一', '第二類：2 対 1', 'Second species: two against one'),
        text: [
          t('对位改成二分音符。强拍总是协和，强拍到强拍之间照第一类的规则看（不能连续两个小节以同一个完全协和开始）。弱拍可以不协和，但只能是经过音：两个强拍之间是三度，经过音级进填在中间。可以先休止半小节再进入。', '対旋律は 2 分音符に。強拍はいつも協和で、強拍から強拍へは第一類の規則で見る（同じ完全協和で始まる小節を 2 つ続けない）。弱拍は不協和でもよいが経過音だけ：強拍どうしが 3 度で、間を順次で埋める。半小節休んでから入ってもよい。', 'The counterpoint moves in half notes. Downbeats are always consonant, and downbeat-to-downbeat motion follows first-species rules (no two bars starting on the same perfect interval). Weak beats may be dissonant, but only as passing tones: the downbeats are a third apart and the passing tone fills it by step. You may begin with a half rest.'),
        ],
      },
      {
        id: 'b34-e3', type: 'discover', practice: true, ref: 'omt-species2',
        prompt: t('第二类对位里，下拍 C、下一个下拍 A，中间的弱拍可以放一个不协和的经过音吗？', '第二類で強拍 C、次の強拍 A。間の弱拍に不協和の経過音を置ける？', 'In second species, the downbeats are C then A. Can the weak beat between them be a dissonant passing tone?'),
        options: [t('可以：C–B–A 是级进填满三度', '置ける：C–B–A は 3 度を順次で埋める', 'Yes: C–B–A fills the third by step'), t('不可以：弱拍必须协和', '置けない：弱拍は協和でなければならない', 'No: weak beats must be consonant'), t('可以：随便跳进也行', '置ける：跳躍でもよい', 'Yes: any leap is fine')],
        answer: 0,
        insight: { title: t('不协和只能"路过"', '不協和は「通り過ぎる」だけ', 'Dissonance may only pass through'), text: t('第二类的不协和都是经过音：不能跳进跳出，不能在不协和上改变方向，也不能落在强拍。', '第二類の不協和はすべて経過音：跳躍で出入りせず、不協和で向きを変えず、強拍にも置かない。', 'Every second-species dissonance is a passing tone: never leapt to or from, never a turning point, never on a downbeat.') },
      },
    ],
    experiment: [
      { id: 'b34-x1', type: 'experiment', toy: 'species', ref: ['omt-species1', 'omt-intervals', 'gotham-species'],
        prompt: t('Fux 的 C 调定旋律上方有一条毛病很多的第一类对位。用上下箭头一个个移动，边听边看评分，把它改到 100 分。', 'フックスのハ調定旋律の上に、問題だらけの第一類対旋律がある。矢印で 1 音ずつ動かし、聴きながら採点を見て 100 点にしよう。', 'Above Fux’s C cantus sits a first-species line full of problems. Move notes with the arrows, listening and watching the score, until it reaches 100.'),
        params: { species: 1, cantus: FUX_C, start: 'G3 B3 C4 D4 G3 C4 B3 G3 A3 G3 B3 C4'.split(' ') },
        breakthrough: { id: 'b34-clean', text: t('一整条对位，被你修到没有一处毛病。', '1 本の対旋律を、1 か所の問題もなくなるまで直した。', 'You repaired a whole counterpoint until nothing was wrong.') } },
    ],
    challenge: [
      {
        id: 'b34-c1', type: 'choice', error: 'cp-frame', skills: ['apply'], ref: 'omt-species1',
        variants: [
          { prompt: t('定旋律以 re–do 结束，上方对位最后两个音应该是？', '定旋律が re–do で終わるとき、上の対旋律の最後の 2 音は？', 'The cantus ends re–do. The counterpoint above should end…'), options: ['ti–do', 're–do', 'sol–do', 'fa–mi'] },
          { prompt: t('上方对位的第一个音可以是？', '上の対旋律の最初の音は？', 'A counterpoint above may begin on…'), options: [t('do 或 sol', 'do か sol', 'do or sol'), t('只有 mi', 'mi だけ', 'only mi'), t('fa', 'fa', 'fa'), t('任何音', 'どの音でも', 'any note')] },
          { prompt: t('下方对位的第一个音必须是？', '下の対旋律の最初の音は？', 'A counterpoint below must begin on…'), options: ['do', 'sol', 'fa', 'mi'] },
        ],
        answer: 0,
        explain: t('上方从 do 或 sol 开始，下方只能从 do（下方的 sol 会形成不协和的四度）；结尾反向级进到 do。', '上は do か sol、下は do だけ（下の sol は不協和な 4 度になる）。終わりは反行の順次進行で do へ。', 'Above: do or sol; below: only do (sol below makes a dissonant fourth). End on do by contrary step.'),
      },
      {
        id: 'b34-c2', type: 'choice', error: 'parallel-fifths', skills: ['voiceLeading'], ref: 'omt-species1',
        variants: [
          { prompt: t('第一类里，下面哪一组连续音程是不允许的？', '第一類で、許されない連続音程は？', 'In first species, which consecutive intervals are forbidden?'), options: ['P5 → P12', 'P8 → P5', 'M6 → m3', 'P5 → M6'] },
          { prompt: t('两个声部同向进行进入八度，叫做？', '2 声部が並行でオクターヴに入ることを何という？', 'Two voices approaching an octave in similar motion is called…'), options: [t('直接（隐伏）八度', '並達 8 度', 'A direct (hidden) octave'), t('反向八度', '反行 8 度', 'A contrary octave'), t('辅助音', '刺繍音', 'A neighbour tone'), t('完全终止', '完全終止', 'A perfect cadence')] },
        ],
        answer: 0,
        explain: t('同样大小的完全协和连续出现（包括复音程 P5–P12）都不行；不同的完全协和（P8–P5）可以；同向进入完全协和是直接五 / 八度。', '同じ大きさの完全協和の連続は不可（複音程 P5–P12 も）。違う完全協和（P8–P5）は可。並行で完全協和に入るのが並達 5・8 度。', 'Two perfect intervals of the same size in a row are out (compound P5–P12 too); different ones (P8–P5) are allowed; approaching a perfect interval in similar motion is a direct fifth/octave.'),
      },
      {
        id: 'b34-c3', type: 'choice', error: 'cp-dissonance', skills: ['apply'], ref: 'omt-species2',
        variants: [
          { prompt: t('第二类对位里，不协和音程可以出现在哪里？', '第二類で不協和音程を置けるのは？', 'In second species, where may a dissonance appear?'), options: [t('弱拍的经过音', '弱拍の経過音', 'On a weak beat, as a passing tone'), t('强拍', '強拍', 'On a downbeat'), t('任何位置', 'どこでも', 'Anywhere'), t('只在最后一小节', '最後の小節だけ', 'Only in the last bar')] },
          { prompt: t('第二类里，"辅助音"型（下拍—邻音—回到原音）的中间音必须？', '第二類の刺繍音型（強拍—隣接音—元の音）の真ん中は？', 'In second species, the middle of a neighbour figure (downbeat — neighbour — same note) must be…'), options: [t('协和', '協和', 'consonant'), t('不协和', '不協和', 'dissonant'), t('同度', '同度', 'a unison'), t('休止', '休符', 'a rest')] },
        ],
        answer: 0,
        explain: t('第二类的不协和只能是经过音；辅助音型在第二类里是"协和辅助音"（五度对六度，六度对五度）。', '第二類の不協和は経過音だけ。刺繍音型は第二類では「協和刺繍音」（5 度なら 6 度、6 度なら 5 度）。', 'Second-species dissonance must be a passing tone; the neighbour figure there is a consonant neighbour (a fifth goes to a sixth and vice versa).'),
      },
      G('b34-g1', 'consonance', 2, ['identify']),
      G('b34-g2', 'motion', 1, ['voiceLeading']),
    ],
    lab: [{ id: 'b34-lab', type: 'lab', lab: 'cp-species1', mandatory: true, minutes: 7 }],
  },
  pool: [G('b34-p1', 'consonance', 3, ['identify']), G('b34-p2', 'motion', 3, ['voiceLeading']), G('b34-p3', 'intervalName', 2, ['identify'])],
};

// ===================== B3-5 类别对位 III–IV 与模仿 =====================
// 第四类试听（Fux C 调定旋律的最后 4 小节：E3 F3 E3 D3 … C3）：每半小节一个和弦
const SUS = [[52, 64], [53, 64], [53, 62], [52, 62], [52, 60], [50, 60], [50, 59], [48, 60]];
const PLAIN = [[52, 64], [53, 62], [53, 62], [52, 60], [52, 60], [50, 59], [50, 59], [48, 60]];
const FRERE = [[60, 1], [62, 1], [64, 1], [60, 1], [60, 1], [62, 1], [64, 1], [60, 1], [64, 1], [65, 1], [67, 2], [64, 1], [65, 1], [67, 2]];
export const LEVEL_B3_5 = {
  minutes: 19, core: true,
  insight: t('挂留就是一个音"不肯走"：低音先动，它被留成不协和，再往下一级落到协和上。', '掛留は 1 つの音が「動かない」こと：バスが先に動き、その音が不協和として残り、1 つ下の協和へ落ちる。', 'A suspension is a note that refuses to move: the bass moves first, it is left dissonant, then it falls one step onto a consonance.'),
  sections: {
    discover: [
      {
        id: 'b35-d1', type: 'discover', ref: 'omt-species4',
        prompt: t('同一段结尾的两种写法。A：上方每个音都比下方晚半拍才移动；B：两条线一起移动。哪一个有更多"紧—松"？', '同じ終わり方の 2 通り。A：上の音はいつも下より半拍遅れて動く。B：2 本が一緒に動く。「張り—緩み」が多いのは？', 'Two versions of the same ending. A: the upper note always moves half a bar after the lower; B: both move together. Which has more tension and release?'),
        play: [{ label: t('A：错开', 'A：ずらす', 'A: offset'), audio: { chords: SUS, gap: 520 } }, { label: t('B：一起', 'B：一緒に', 'B: together'), audio: { chords: PLAIN, gap: 520 } }],
        options: [t('A：上方的音留下来变成不协和，再落下去解决', 'A：上の音が残って不協和になり、落ちて解決する', 'A: the upper note is left dissonant, then falls to resolve'), t('B：一起动更紧张', 'B：一緒に動くほうが緊張する', 'B: moving together is tenser'), t('一样', '同じ', 'The same')],
        answer: 0,
        insight: {
          title: t('预备—挂留—解决', '予備—掛留—解決', 'Preparation — suspension — resolution'),
          text: t('第四类对位把对位错开半小节：弱拍的音（预备，协和）连到下一个强拍；低音一动，它就成了不协和（挂留）；再级进下行一级到协和（解决）。上方可用 7–6、4–3、9–8；下方可用 2–3、5–6、4–5。', '第四類は対旋律を半小節ずらす：弱拍の音（予備、協和）が次の強拍へタイでつながる。バスが動くとそれが不協和（掛留）になり、1 つ順次下行して協和へ（解決）。上声では 7–6・4–3・9–8、下声では 2–3・5–6・4–5。', 'Fourth species offsets the counterpoint by half a bar: a weak-beat note (preparation, consonant) is tied into the next downbeat; when the bass moves it becomes dissonant (the suspension); then it steps down to a consonance (resolution). Above: 7–6, 4–3, 9–8; below: 2–3, 5–6, 4–5.'),
        },
      },
    ],
    explain: [
      {
        id: 'b35-e1', type: 'page', ref: 'omt-species3',
        title: t('第三类：四对一', '第三類：4 対 1', 'Third species: four against one'),
        text: [
          t('对位改成四分音符。强拍协和、不用同度；第 2–4 拍可以不协和，但要级进进出：经过音或辅助音。两个例外：双辅助音（如 C–D–B–C，第 2、3 拍都不协和）和换音（nota cambiata，五个音：级进下行—下跳三度—级进上行—级进上行）。', '対旋律は 4 分音符に。強拍は協和で 1 度は使わない。2–4 拍目は不協和でもよいが、順次で出入りする：経過音か刺繍音。例外は 2 つ：二重刺繍音（C–D–B–C のように 2・3 拍目がともに不協和）と、カンビアータ（5 音：順次下行—3 度下へ跳躍—順次上行—順次上行）。', 'The counterpoint moves in quarter notes. Downbeats are consonant and not unisons; beats 2–4 may be dissonant if approached and left by step — passing or neighbour tones. Two exceptions: the double neighbour (e.g. C–D–B–C, beats 2 and 3 both dissonant) and the nota cambiata (five notes: step down, leap down a third, step up, step up).'),
        ],
      },
      {
        id: 'b35-e2', type: 'page', ref: 'wiki-canon',
        tool: { feature: 'counterpoint', q: '@sub:canon' },
        title: t('模仿与卡农', '模倣とカノン', 'Imitation and canon'),
        text: [
          t('卡农是一条旋律在一段时间之后被模仿：先出现的叫导句（dux），模仿的叫答句（comes）。在同度或八度上完全一样的叫轮唱，比如《Frère Jacques》。保留音程性质的是严格卡农，只保留度数的是自由卡农；还有倒影卡农（方向相反）、逆行卡农（倒着走，又叫蟹行卡农）、比例卡农（放慢或加快）。巴赫《哥德堡变奏曲》里的九首卡农，模仿音程从同度一路到九度。', 'カノンは旋律が一定時間後に模倣される技法：先に出るのが先行声部（dux）、模倣するのが後続声部（comes）。同度かオクターヴでまったく同じものが輪唱で、《Frère Jacques》がその例。音程の種類まで保つのが厳格カノン、度数だけ保つのが自由カノン。ほかに反行カノン、逆行カノン（蟹カノン）、比例カノン（拡大・縮小）。バッハ《ゴルトベルク変奏曲》の 9 曲のカノンは、模倣の音程が同度から 9 度まで。', 'A canon imitates a melody after a set delay: the first voice is the leader (dux), the imitating voice the follower (comes). An exact imitation at the unison or octave is a round, like “Frère Jacques”. Keeping interval qualities makes a strict canon, keeping only interval numbers a free canon; there are also inversion canons (contrary direction), retrograde or crab canons (backwards) and mensuration canons (slower or faster). Bach’s Goldberg Variations contain nine canons at intervals from the unison up to the ninth.'),
        ],
      },
      {
        id: 'b35-e3', type: 'discover', practice: true, ref: 'omt-species4',
        prompt: t('上方对位里，强拍的 F 对着定旋律的 G 是七度，这个 F 是从上一小节连过来的。下一步应该？', '上の対旋律で、強拍の F は定旋律の G に対して 7 度。この F は前の小節からタイでつながっている。次は？', 'Above the cantus, the downbeat F forms a seventh with the cantus G, tied over from the previous bar. What next?'),
        options: [t('级进下行到 E（六度）：7–6 挂留', 'E へ順次下行（6 度）：7–6 の掛留', 'Step down to E (a sixth): a 7–6 suspension'), t('级进上行到 G（八度）', 'G へ順次上行（8 度）', 'Step up to G (an octave)'), t('跳到 C', 'C へ跳躍', 'Leap to C')],
        answer: 0,
        insight: { title: t('挂留总是往下解决', '掛留はいつも下へ解決', 'Suspensions resolve down'), text: t('第四类的解决总是比挂留音低一级、并且协和。按解决后的音程看待它：7–6 可以多用，但别连续超过三次；9–8 不能连续用（等于连续八度）。', '第四類の解決は必ず掛留音の 1 つ下で協和。解決後の音程で考える：7–6 は多用してよいが 3 回までに、9–8 は連続不可（連続 8 度と同じ）。', 'A fourth-species resolution is always one step below the suspension and consonant. Treat it by its resolution: use 7–6 freely (but not more than three in a row); never two 9–8s in a row (that is consecutive octaves).') },
      },
    ],
    experiment: [
      { id: 'b35-x1', type: 'experiment', toy: 'species', ref: ['omt-species4', 'gotham-species'],
        prompt: t('第四类对位：每个弱拍的音都会连到下一小节的强拍。用箭头移动弱拍的音（最后两个是固定的终止），让每个不协和的强拍都被预备、并级进下行解决，改到 100 分。', '第四類：弱拍の音はすべて次の小節の強拍へタイでつながる。矢印で弱拍の音を動かし（最後の 2 つは固定の終止）、不協和な強拍がすべて予備され順次下行で解決するようにして 100 点に。', 'Fourth species: every weak-beat note ties into the next downbeat. Move the weak-beat notes (the last two are the fixed cadence) so that every dissonant downbeat is prepared and resolves down by step — reach 100.'),
        params: { species: 4, cantus: FUX_C, start: 'C4 A4 G4 E4 G4 F4 E4 C4 D4 C4 B3'.split(' ') },
        breakthrough: { id: 'b35-chain', text: t('你写出了一串挂留：每个不协和都有来处，也有去处。', '掛留の連鎖が書けた：どの不協和にも来た道と行く先がある。', 'You wrote a chain of suspensions: every dissonance comes from somewhere and goes somewhere.') } },
      { id: 'b35-x2', type: 'experiment', toy: 'canon', ref: ['wiki-canon', 'omt-intervals'],
        prompt: t('《Frère Jacques》的前四小节当导句。换答句的音程、进入时间和模仿方式：晚两小节在同度进入为什么正好？晚一小节呢？', '《Frère Jacques》の最初の 4 小節を先行声部に。後続声部の音程・入る時間・模倣の仕方を変えてみよう。2 小節遅れの同度がぴったりなのはなぜ？ 1 小節遅れだと？', 'Use the first four bars of “Frère Jacques” as the leader. Change the follower’s interval, delay and kind of imitation: why does a unison entry two bars later fit perfectly? What about one bar later?'),
        params: { leader: FRERE, steps: [0, -7, 4, -3], delays: [8, 4, 2], bpm: 132 } },
    ],
    challenge: [
      {
        id: 'b35-c1', type: 'choice', error: 'suspension', skills: ['voiceLeading'], ref: 'omt-species4',
        variants: [
          { prompt: t('上方对位可以用的挂留是？', '上の対旋律で使える掛留は？', 'Which suspensions are available above the cantus?'), options: ['7–6、4–3、9–8', '2–3、5–6、4–5', '6–5、3–2、8–7', '7–8、2–1、5–4'] },
          { prompt: t('下方对位可以用的挂留是？', '下の対旋律で使える掛留は？', 'Which suspensions are available below the cantus?'), options: ['2–3、5–6、4–5', '7–6、4–3、9–8', '6–7、3–4、8–9', '7–8、2–1、5–4'] },
          { prompt: t('挂留的三个部分依次是？', '掛留の 3 つの部分は順に？', 'The three parts of a suspension, in order, are…'), options: [t('预备 — 挂留 — 解决', '予備 — 掛留 — 解決', 'preparation — suspension — resolution'), t('挂留 — 预备 — 解决', '掛留 — 予備 — 解決', 'suspension — preparation — resolution'), t('解决 — 挂留 — 预备', '解決 — 掛留 — 予備', 'resolution — suspension — preparation'), t('经过 — 辅助 — 回到原音', '経過 — 刺繍 — 元の音', 'passing — neighbour — return')] },
        ],
        answer: 0,
        explain: t('上方：7–6、4–3、9–8；下方：2–3、5–6、4–5。预备在弱拍、协和；挂留在强拍、不协和、同一个音；解决在弱拍、协和、低一级。', '上声：7–6・4–3・9–8、下声：2–3・5–6・4–5。予備は弱拍で協和、掛留は強拍で不協和の同じ音、解決は弱拍で協和の 1 つ下。', 'Above: 7–6, 4–3, 9–8; below: 2–3, 5–6, 4–5. Preparation: weak beat, consonant; suspension: downbeat, dissonant, same note; resolution: weak beat, consonant, a step lower.'),
      },
      {
        id: 'b35-c2', type: 'choice', error: 'cp-dissonance', skills: ['identify'], ref: 'omt-species3',
        variants: [
          { prompt: t('第三类里，C–D–B–C（第 2、3 拍都不协和）这个型叫？', '第三類で C–D–B–C（2・3 拍目がともに不協和）の型は？', 'In third species, the figure C–D–B–C (beats 2 and 3 both dissonant) is a…'), options: [t('双辅助音', '二重刺繍音', 'double neighbour'), t('换音（nota cambiata）', 'カンビアータ', 'nota cambiata'), t('经过音', '経過音', 'passing tone'), t('挂留', '掛留', 'suspension')] },
          { prompt: t('"级进下行—下跳三度—级进上行—级进上行"这五个音的型叫？', '「順次下行—3 度下へ跳躍—順次上行—順次上行」の 5 音の型は？', 'The five-note figure “step down, leap down a third, step up, step up” is the…'), options: [t('换音（nota cambiata）', 'カンビアータ', 'nota cambiata'), t('双辅助音', '二重刺繍音', 'double neighbour'), t('终止式', '終止形', 'cadence'), t('倚音', '倚音', 'appoggiatura')] },
        ],
        answer: 0,
        explain: t('第三类的不协和一般级进进出；双辅助音和换音是两个允许跳离不协和的例外。', '第三類の不協和はふつう順次で出入りする。二重刺繍音とカンビアータは不協和から跳躍してよい 2 つの例外。', 'Third-species dissonances normally move by step; the double neighbour and the nota cambiata are the two exceptions that leap from a dissonance.'),
      },
      {
        id: 'b35-c3', type: 'choice', error: 'canon-type', skills: ['identify'], ref: 'wiki-canon',
        variants: [
          { prompt: t('答句在同度或八度上和导句完全一样，这种卡农叫？', '後続声部が同度かオクターヴで先行声部とまったく同じカノンは？', 'A canon whose follower copies the leader exactly at the unison or octave is a…'), options: [t('轮唱（round）', '輪唱（ラウンド）', 'round'), t('倒影卡农', '反行カノン', 'inversion canon'), t('蟹行卡农', '蟹カノン', 'crab canon'), t('比例卡农', '比例カノン', 'mensuration canon')] },
          { prompt: t('导句下行三度时，答句上行三度。这是？', '先行声部が 3 度下がると後続声部は 3 度上がる。これは？', 'When the leader falls a third, the follower rises a third. This is a…'), options: [t('倒影卡农', '反行カノン', 'inversion canon'), t('逆行卡农', '逆行カノン', 'retrograde canon'), t('轮唱', '輪唱', 'round'), t('严格卡农', '厳格カノン', 'strict canon')] },
          { prompt: t('答句只保留度数（大三度可能变成小三度），叫？', '後続声部が度数だけ保つ（長 3 度が短 3 度になることも）のは？', 'A follower that keeps only interval numbers (a major third may become minor) makes a…'), options: [t('自由卡农', '自由カノン', 'free canon'), t('严格卡农', '厳格カノン', 'strict canon'), t('蟹行卡农', '蟹カノン', 'crab canon'), t('比例卡农', '比例カノン', 'mensuration canon')] },
        ],
        answer: 0,
        explain: t('轮唱：同度 / 八度完全一样；倒影：方向相反；逆行（蟹行）：倒着走；比例：放慢或加快；严格保留音程性质，自由只保留度数。', '輪唱：同度・オクターヴで同じ。反行：向きが逆。逆行（蟹）：後ろから。比例：拡大・縮小。厳格は音程の種類まで、自由は度数だけ。', 'Round: exact at unison/octave; inversion: contrary direction; retrograde (crab): backwards; mensuration: slower or faster; strict keeps interval qualities, free only numbers.'),
      },
      G('b35-g1', 'consonance', 2, ['identify']),
      G('b35-g2', 'motion', 1, ['voiceLeading']),
    ],
    lab: [{ id: 'b35-lab', type: 'lab', lab: 'cp-species4', mandatory: true, minutes: 8 }],
  },
  pool: [G('b35-p1', 'consonance', 3, ['identify']), G('b35-p2', 'motion', 3, ['voiceLeading']), G('b35-p3', 'intervalName', 2, ['identify'])],
};


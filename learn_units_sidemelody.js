// 乐理闯关 · 支线大关卡（旋律与对位部分；结构与规则见 learn_units_side.js 顶部的说明）
// 修改题卡后运行 node scripts/annotate-learn.mjs 更新下面的汇总与 references.js 的 usedIn
// 依据汇总（本文件题卡引用的全部资料）：
//   ref:wiki-canon ref:omt-intervals ref:omt-species1
// @refs-end

const t = (zh, ja, en) => ({ zh, ja, en });
const opt = (id, label) => ({ id, label });
const m = (at, label, place) => ({ at: [].concat(at), label, ...(place ? { place } : {}) });
const cells = (...texts) => texts.map((text) => (typeof text === 'string' || text.zh ? { text } : text));

export const UNITS = [
  // ======================= 模仿与卡农 =======================
  {
    id: 'canon', parent: 'species', section: 'melody', feature: 'counterpoint', toolQuery: '@sub:canon', icon: 'dux',
    title: t('模仿与卡农', '模倣とカノン', 'Imitation and canon'),
    blurb: t('导句与答句、轮唱、进入的时间与音程、严格与自由卡农、倒影卡农，以及用对位规则检查声部之间的音程', '先行声部と後続声部・輪唱・入りの時間と音程・厳格と自由のカノン・反行カノン、対位法の規則で音程を確かめる', 'Leader and follower, rounds, entry time and interval, strict and free canons, inversion canons, and checking the intervals with counterpoint rules'),
    cards: [
      { type: 'guide', ref: 'wiki-canon', demo: { play: [[60], [62], [64], [60]] },
        visual: { kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'treble' }], notes: [
          { p: 'C5', s: 0, col: 0, d: 'q' }, { p: 'D5', s: 0, col: 1, d: 'q' }, { p: 'E5', s: 0, col: 2, d: 'q' }, { p: 'C5', s: 0, col: 3, d: 'q' },
          { p: 'C4', s: 1, col: 2, d: 'q', lit: true }, { p: 'D4', s: 1, col: 3, d: 'q', lit: true },
        ] },
        tour: [
          m(['head0', 'head1', 'head2', 'head3'], t('先出现的旋律：导句（dux）', '先に出る旋律：先行声部（dux）', 'the first melody: the leader (dux)')),
          m(['head4', 'head5'], t('晚两拍、低八度进入：答句（comes）', '2 拍遅れ 8 度下で入る：後続声部（comes）', 'enters two beats later, an octave lower: the follower (comes)'), 'below'),
        ],
        title: t('同一条旋律，晚一点再来一次', '同じ旋律を少し遅れてもう一度', 'The same melody again, a little later'),
        steps: [
          t('卡农是一种对位技法：一条旋律（导句 dux）出现后，另一个声部在一段时间之后模仿它（答句 comes）。答句可以完全照抄节奏和音程，也可以做某种变化。', 'カノンは対位法の技法：ある旋律（先行声部 dux）の後、別の声部が一定時間後にそれを模倣する（後続声部 comes）。リズムと音程をそのまま写すことも、変化させることもある。', 'A canon is a contrapuntal technique: after a melody (the leader, dux), another voice imitates it some time later (the follower, comes), either exactly or with some transformation.'),
          t('所有声部完全一样、在同度或八度上的反复卡农叫轮唱，例如《两只老虎》（Frère Jacques）。', 'すべての声部が同じで、同度か 8 度で繰り返すカノンを輪唱という。例：《フレール・ジャック》。', 'A repeating canon with identical voices at the unison or octave is a round — Frère Jacques is one.'),
        ] },
      { type: 'match', ref: 'wiki-canon',
        prompt: t('名称 ↔ 意思', '名称 ↔ 意味', 'Term ↔ meaning'),
        pairs: [[t('导句（dux）', '先行声部（dux）', 'leader (dux)'), t('先出现的旋律', '先に出る旋律', 'the first melody')], [t('答句（comes）', '後続声部（comes）', 'follower (comes)'), t('后进入的模仿', '後から入る模倣', 'the later imitation')], [t('轮唱', '輪唱', 'round'), t('同度或八度上完全一样的反复卡农', '同度か 8 度で同じ旋律を繰り返すカノン', 'an identical repeating canon at the unison or octave')]],
        hint: t('dux 是领头的。', 'dux は先導役。', 'Dux leads.'),
        explain: t('导句先出现，答句晚一点模仿；完全一样的反复卡农叫轮唱。', '先行声部が先、後続声部が遅れて模倣。同じ旋律の繰り返しが輪唱。', 'The leader comes first, the follower imitates later; an identical repeating canon is a round.') },
      { type: 'choice', ref: 'wiki-canon',
        prompt: t('《两只老虎》（Frère Jacques）的轮唱属于哪种卡农？', '《フレール・ジャック》の輪唱はどんなカノン？', 'Singing Frère Jacques as a round is which kind of canon?'),
        options: [t('简单卡农（同度或八度）', '単純カノン（同度か 8 度）', 'a simple canon at the unison or octave'), t('倒影卡农', '反行カノン', 'an inversion canon'), t('逆行卡农', '逆行カノン', 'a retrograde canon')], answer: 0,
        hint: t('每组唱的都一样。', 'どのグループも同じ旋律。', 'Every group sings the same tune.'),
        explain: t('每个声部完全一样，只是晚一两小节进入：这是简单卡农，也就是轮唱。', 'どの声部も同じで、1〜2 小節遅れて入るだけ：単純カノン＝輪唱。', 'Each voice is identical, entering a bar or two later: a simple canon, i.e. a round.') },
      { type: 'choice', ref: 'wiki-canon',
        prompt: t('设计一首卡农时，至少要决定哪两件事？', 'カノンを作る時、少なくとも何を決める？', 'Designing a canon, which two things must you decide at least?'),
        options: [t('答句晚多久进入、在什么音程上进入', '後続声部がどれだけ遅れて、どの音程で入るか', 'how late the follower enters and at what interval'), t('速度和音量', 'テンポと音量', 'tempo and volume'), t('乐器和调号', '楽器と調号', 'instruments and key signature')], answer: 0,
        hint: t('时间与音高。', '時間と音高。', 'Time and pitch.'),
        explain: t('卡农按声部数、各声部之间的移调音程、进入的时间差等来分类。', 'カノンは声部数・声部間の音程・入りの時間差などで分類される。', 'Canons are classified by number of voices, the interval of transposition and the time between entries, among other things.') },
    ],
    branch: [
      {
        title: t('进入的时间：错开多少才好听', '入りの時間：どれだけずらすか', 'Entry time: how far apart?'),
        cards: [
          { type: 'guide', ref: ['wiki-canon', 'omt-intervals'],
            visual: { kind: 'blocks', rows: [
              { label: t('晚两小节', '2 小節遅れ', 'two bars later'), cells: cells({ text: t('三度 六度 八度', '3 度 6 度 8 度', 'thirds, sixths, octaves'), lit: true }) },
              { label: t('晚一拍', '1 拍遅れ', 'one beat later'), cells: cells({ text: t('拍上二度 七度', '拍上に 2 度 7 度', 'seconds, sevenths on the beat') }) },
            ] },
            tour: [
              m('row0', t('同一条旋律和自己配得好', '自分と合う', 'the tune fits with itself')),
              m('row1', t('换个距离就可能撞在一起', '距離を変えるとぶつかる', 'another distance may clash'), 'below'),
            ],
            title: t('距离决定两个声部碰在一起的音', '距離で重なる音が決まる', 'The distance decides which notes meet'),
            steps: [
              t('答句晚多少进入，决定了每一刻两个声部是哪两个音同时响。同一条旋律，换一个距离，结果可能完全不同。', '後続声部の遅れ方で、各瞬間にどの 2 音が同時に鳴るかが決まる。同じ旋律でも距離を変えると結果がまったく違う。', 'How late the follower enters decides which two notes sound together at each moment; the same tune can work at one distance and fail at another.'),
              t('判断的依据是对位里的音程分类：完全协和（同度、五度、八度）、不完全协和（三度、六度）、不协和（二度、七度、增减音程、和低音构成的纯四度）。拍上的不协和要特别注意。', '判断の基準は対位法の音程分類：完全協和（同度・5 度・8 度）、不完全協和（3 度・6 度）、不協和（2 度・7 度・増減音程・バスとの完全 4 度）。拍上の不協和に注意。', 'Judge with counterpoint’s interval classes: perfect consonances (unison, fifth, octave), imperfect (thirds, sixths), dissonances (seconds, sevenths, augmented/diminished intervals, a fourth against the bass). Watch dissonances on the beat.'),
            ] },
          { type: 'choice', ref: 'omt-intervals',
            prompt: t('两个声部在拍上构成大二度，这是？', '2 声部が拍上で長 2 度。これは？', 'The two voices form a major second on the beat. That is…'),
            options: [t('不协和', '不協和', 'a dissonance'), t('不完全协和', '不完全協和', 'an imperfect consonance'), t('完全协和', '完全協和', 'a perfect consonance')], answer: 0,
            hint: t('二度、七度都是不协和。', '2 度と 7 度は不協和。', 'Seconds and sevenths are dissonant.'),
            explain: t('二度是不协和音程；落在拍上就会很明显。', '2 度は不協和。拍上だと目立つ。', 'A second is dissonant, and on the beat it stands out.') },
          { type: 'choice', ref: 'wiki-canon',
            prompt: t('《两只老虎》晚两小节进入很好听，晚一拍进入就不行了。为什么？', '《フレール・ジャック》は 2 小節遅れだときれいだが 1 拍遅れはだめ。なぜ？', 'Frère Jacques works two bars apart but not one beat apart. Why?'),
            options: [t('距离改变了同时响的音 晚一拍会在拍上出现二度', '距離で同時の音が変わり、1 拍遅れだと拍上に 2 度', 'the distance changes which notes coincide — one beat apart puts seconds on the beat'), t('因为速度太快', 'テンポが速すぎる', 'the tempo is too fast'), t('因为调不对', '調が違う', 'the key is wrong')], answer: 0,
            hint: t('C D E C 和晚一拍的自己：D 对 C。', 'C D E C と 1 拍遅れの自分：D と C。', 'C D E C against itself one beat late: D against C.'),
            explain: t('晚一拍时，导句的 D 会和答句的 C 同时响（二度），一路都会撞；晚两小节时同时响的多是协和音程。', '1 拍遅れだと先行の D と後続の C が同時（2 度）でぶつかり続ける。2 小節遅れだと同時の音は協和が多い。', 'One beat apart, the leader’s D meets the follower’s C (a second), and clashes continue; two bars apart the coinciding notes are mostly consonant.') },
          { type: 'choice', ref: 'omt-intervals',
            prompt: t('下面哪个是不完全协和音程？', '不完全協和音程はどれ？', 'Which is an imperfect consonance?'),
            options: [t('大六度', '長 6 度', 'a major sixth'), t('纯五度', '完全 5 度', 'a perfect fifth'), t('小七度', '短 7 度', 'a minor seventh')], answer: 0,
            hint: t('三度和六度。', '3 度と 6 度。', 'Thirds and sixths.'),
            explain: t('三度、六度是不完全协和；同度、五度、八度是完全协和；七度不协和。', '3 度・6 度が不完全協和、同度・5 度・8 度が完全協和、7 度は不協和。', 'Thirds and sixths are imperfect; unison, fifth and octave are perfect; sevenths are dissonant.') },
        ],
      },
      {
        title: t('进入的音程：严格与自由', '入りの音程：厳格と自由', 'Entry interval: strict and free'),
        cards: [
          { type: 'guide', ref: 'wiki-canon',
            visual: { kind: 'blocks', rows: [
              { label: t('导句', '先行', 'leader'), cells: cells('B', 'C') },
              { label: t('严格（高五度）', '厳格（5 度上）', 'strict (fifth up)'), cells: cells({ text: 'F♯', lit: true }, 'G') },
              { label: t('自由（高五度）', '自由（5 度上）', 'free (fifth up)'), cells: cells({ text: 'F', lit: true }, 'G') },
            ] },
            tour: [
              m('row1', t('音程大小也照抄：出现调外音', '音程の大きさも写す：調外の音', 'exact interval quality: a chromatic note appears')),
              m('row2', t('只保留度数：留在调内', '度数だけ：調内にとどまる', 'interval number only: stays in key'), 'below'),
            ],
            title: t('照抄音程大小，还是只照抄度数？', '音程の大きさまで写すか、度数だけか', 'Copy the exact interval, or just its number?'),
            steps: [
              t('如果答句精确地照抄导句的音程性质（大三度还是大三度），叫严格卡农；如果只照抄度数、性质随音阶调整（大三度可能变成小三度），叫自由卡农。', '後続声部が音程の性質まで正確に写す（長 3 度は長 3 度）なら厳格カノン、度数だけ写し性質は音階に合わせる（長 3 度が短 3 度になる）なら自由カノン。', 'If the follower copies interval qualities exactly (a major third stays major) it is a strict canon; if it copies only the interval numbers, adjusting to the scale (a major third may become minor), it is a free canon.'),
              t('例：在 C 大调里高五度模仿 B–C，严格卡农是 F♯–G（出现调外音），自由卡农是 F–G（留在调内）。', '例：ハ長調で B–C を 5 度上で模倣すると、厳格は F♯–G（調外音）、自由は F–G（調内）。', 'Example: imitating B–C a fifth higher in C major gives F♯–G in a strict canon (a chromatic note) and F–G in a free one (in key).'),
            ] },
          { type: 'choice', ref: 'wiki-canon',
            prompt: t('答句只保留度数、性质跟着音阶走，叫？', '後続声部が度数だけ保ち性質は音階に従う。これは？', 'A follower that keeps interval numbers but adjusts qualities to the scale makes…'),
            options: [t('自由卡农', '自由カノン', 'a free canon'), t('严格卡农', '厳格カノン', 'a strict canon'), t('逆行卡农', '逆行カノン', 'a retrograde canon')], answer: 0,
            hint: t('不严格照抄性质。', '性質は厳密に写さない。', 'Qualities are not copied exactly.'),
            explain: t('只照抄度数（大三度可以变小三度）是自由卡农。', '度数だけ写す（長 3 度が短 3 度に）のが自由カノン。', 'Copying only numbers (a major third may become minor) is a free canon.') },
          { type: 'choice', ref: 'wiki-canon',
            prompt: t('C 大调里把 B–C 严格地高五度模仿，答句是？', 'ハ長調で B–C を厳格に 5 度上で模倣すると？', 'Strictly imitating B–C a fifth higher in C major gives…'),
            options: ['F♯–G', 'F–G', 'E–F'], answer: 0,
            hint: t('B 往上纯五度。', 'B から完全 5 度上。', 'A perfect fifth above B.'),
            explain: t('B 往上纯五度是 F♯；严格卡农照抄音程性质，于是出现调外音 F♯。', 'B の完全 5 度上は F♯。厳格カノンは性質まで写すので調外の F♯。', 'A perfect fifth above B is F♯; a strict canon copies quality, so F♯ appears.') },
          { type: 'choice', ref: 'wiki-canon',
            prompt: t('简单卡农（轮唱）在什么音程上模仿？', '単純カノン（輪唱）はどの音程で模倣？', 'A simple canon (round) imitates at which interval?'),
            options: [t('同度或八度', '同度か 8 度', 'the unison or octave'), t('五度', '5 度', 'the fifth'), t('三全音', '3 全音', 'the tritone')], answer: 0,
            hint: t('完全一样。', 'まったく同じ。', 'Exactly the same.'),
            explain: t('简单卡农在同度或八度上完全模仿导句。', '単純カノンは同度か 8 度で先行声部をそのまま模倣。', 'A simple canon imitates the leader exactly at the unison or octave.') },
        ],
      },
      {
        title: t('倒影、逆行与扩大卡农', '反行・逆行・拡大カノン', 'Inversion, retrograde and augmentation canons'),
        cards: [
          { type: 'guide', ref: 'wiki-canon',
            visual: { kind: 'blocks', rows: [
              { label: t('倒影', '反行', 'inversion'), cells: cells({ text: '↑ ↑ ↑' }, { text: '↓ ↓ ↓', lit: true }) },
              { label: t('逆行（蟹行）', '逆行（蟹）', 'retrograde (crab)'), cells: cells({ text: '1 2 3 4' }, { text: '4 3 2 1', lit: true }) },
              { label: t('扩大 / 缩小', '拡大 / 縮小', 'augmentation / diminution'), cells: cells({ text: '♩ ♩' }, { text: t('二分 二分', '2 分 2 分', 'half half'), lit: true }) },
            ] },
            tour: [
              m('row0', t('答句方向相反', '後続声部は方向が逆', 'the follower moves the other way')),
              [m('row1', t('答句倒着走', '後続声部は逆向き', 'the follower runs backwards')), m('row2', t('答句按比例变长或变短', '後続声部が比例して長く / 短く', 'the follower in proportion, longer or shorter'), 'below')],
            ],
            title: t('答句也可以变形', '後続声部も変形できる', 'The follower can transform too'),
            steps: [
              t('倒影卡农：答句和导句反向进行——导句往下几度，答句就往上几度。逆行卡农（蟹行卡农）：答句把导句倒过来进行。', '反行カノン：後続声部は先行声部と反対方向——先行が何度下がれば後続は同じだけ上がる。逆行カノン（蟹カノン）：後続声部が先行声部を逆向きに。', 'Inversion canon: the follower moves contrary to the leader — where the leader falls by an interval, the follower rises by it. Retrograde (crab) canon: the follower runs the leader backwards.'),
              t('定量卡农（比例卡农）：答句按某个节奏比例模仿，时值加倍是扩大卡农，减半是缩小卡农。逆行卡农和定量卡农的两个声部甚至可以同时开始。', '比例カノン：後続声部が一定のリズム比で模倣。音価 2 倍が拡大カノン、半分が縮小カノン。逆行と比例のカノンは同時に始まることもある。', 'Mensuration (proportional) canon: the follower imitates in a rhythmic proportion — doubled values make an augmentation canon, halved a diminution canon. Crab and mensuration canons may even start together.'),
            ] },
          { type: 'choice', ref: 'wiki-canon',
            prompt: t('导句往下三度时，倒影卡农的答句会？', '先行が 3 度下がる時、反行カノンの後続声部は？', 'When the leader falls a third, an inversion-canon follower…'),
            options: [t('往上三度', '3 度上がる', 'rises a third'), t('也往下三度', 'やはり 3 度下がる', 'also falls a third'), t('不动', '動かない', 'stays put')], answer: 0,
            hint: t('反向。', '反対方向。', 'Contrary.'),
            explain: t('倒影卡农的答句反向进行，同样的音程大小方向相反。', '反行カノンの後続声部は同じ音程で反対方向。', 'It moves the same interval in the opposite direction.') },
          { type: 'choice', ref: 'wiki-canon',
            prompt: t('"蟹行卡农"是哪一种？', '「蟹カノン」はどれ？', 'A "crab canon" is…'),
            options: [t('逆行卡农', '逆行カノン', 'a retrograde canon'), t('倒影卡农', '反行カノン', 'an inversion canon'), t('扩大卡农', '拡大カノン', 'an augmentation canon')], answer: 0,
            hint: t('名字来自拉丁文 cancer（蟹）。', 'ラテン語 cancer（蟹）から。', 'From Latin cancer, crab.'),
            explain: t('canon cancrizans：答句倒着走，所以叫蟹行。', 'canon cancrizans：後続声部が逆向きに進む。', 'Canon cancrizans: the follower goes backwards, like a crab.') },
          { type: 'choice', ref: 'wiki-canon',
            prompt: t('答句的时值是导句的两倍，叫？', '後続声部の音価が先行の 2 倍。これは？', 'A follower in doubled note values makes…'),
            options: [t('扩大卡农', '拡大カノン', 'an augmentation canon'), t('缩小卡农', '縮小カノン', 'a diminution canon'), t('轮唱', '輪唱', 'a round')], answer: 0,
            hint: t('时值变长。', '音価が長く。', 'Longer values.'),
            explain: t('时值加倍是扩大卡农（也是一种定量卡农）。', '音価 2 倍が拡大カノン（比例カノンの一種）。', 'Doubled values make an augmentation canon, a kind of mensuration canon.') },
        ],
      },
      {
        title: t('用检查器写一首卡农', 'チェッカーでカノンを書く', 'Writing a canon with the checker'),
        cards: [
          { type: 'guide', ref: ['omt-species1', 'wiki-canon'],
            visual: { kind: 'blocks', rows: [{ arrows: true, cells: cells({ text: t('写导句', '先行を書く', 'write the leader') }, { text: t('设距离与音程', '距離と音程', 'set distance and interval') }, { text: t('看检查结果', 'チェックを見る', 'read the check'), lit: true }, { text: t('改导句', '先行を直す', 'revise the leader') }) }] },
            tour: [
              m(['c0-0', 'c0-1'], t('先定材料与规则', 'まず素材と規則', 'material and rules first')),
              m(['c0-2', 'c0-3'], t('一边听一边改', '聴きながら直す', 'listen and revise'), 'below'),
            ],
            title: t('改一个音，两处都会变', '1 音直すと 2 か所が変わる', 'Change one note and two places change'),
            steps: [
              t('在对位面板的"模仿与卡农"里写一条导句，选择答句晚几拍、在什么音程上、严格 / 自由 / 倒影；检查器会列出每个起音点的音程，标出拍上的不协和与平行五八度。', '対位法パネルの「模倣とカノン」で先行声部を書き、後続の遅れ・音程・厳格 / 自由 / 反行を選ぶ。チェッカーが各打点の音程を並べ、拍上の不協和と平行 5 度 8 度を示す。', 'In the counterpoint panel’s "Imitation & canon", write a leader and choose the delay, interval and strict / free / inversion; the checker lists the interval at every onset and flags on-beat dissonances and parallel fifths or octaves.'),
              t('卡农难在：改导句的一个音，答句里同一个音也会跟着变，于是两个地方的音程都会改变。平行五八度的规则同样适用：同样大小的完全协和不能接连出现。', 'カノンの難しさ：先行の 1 音を直すと後続の同じ音も変わり、2 か所の音程が変わる。平行 5 度 8 度の規則も同じ：同じ大きさの完全協和を続けない。', 'The difficulty: changing one leader note also changes it in the follower, altering intervals in two places. The parallel rule still applies: never two perfect consonances of the same size in a row.'),
            ] },
          { type: 'choice', ref: 'omt-species1',
            prompt: t('检查器报告"平行五度"，意思是？', 'チェッカーが「平行 5 度」と報告。意味は？', 'The checker reports "parallel fifths". This means…'),
            options: [t('两个声部接连构成纯五度并且都在移动', '2 声部が続けて完全 5 度を作り、どちらも動いている', 'both voices move and form perfect fifths in succession'), t('两个声部同时开始', '同時に始まる', 'the voices start together'), t('答句太低', '後続声部が低すぎる', 'the follower is too low')], answer: 0,
            hint: t('同样大小的完全协和接连出现。', '同じ大きさの完全協和が続く。', 'Two perfect consonances of one size in a row.'),
            explain: t('两个声部都动、接连两次纯五度，就是平行五度，会让声部失去独立。', '両声部が動き、完全 5 度が 2 回続くと平行 5 度で、独立を失う。', 'Both voices moving through two perfect fifths in a row: parallel fifths, which cost the voices their independence.') },
          { type: 'choice', ref: 'wiki-canon',
            prompt: t('为什么改导句的一个音会影响两处音程？', 'なぜ先行の 1 音を直すと 2 か所の音程に影響する？', 'Why does changing one leader note affect two places?'),
            options: [t('答句也会在稍后唱同一个音', '後続声部も後でその音を歌う', 'the follower later sings the same note'), t('因为速度会变', 'テンポが変わる', 'the tempo changes'), t('因为调会变', '調が変わる', 'the key changes')], answer: 0,
            hint: t('答句是导句的模仿。', '後続声部は先行の模倣。', 'The follower copies the leader.'),
            explain: t('这个音先在导句里和答句碰一次，之后又出现在答句里和导句碰一次。', 'その音はまず先行で後続と、後で後続で先行と重なる。', 'The note meets the follower once in the leader, then meets the leader again when the follower sings it.') },
          { type: 'choice', ref: 'omt-intervals',
            prompt: t('检查器把一个拍外的二度标成"经过 / 辅助"，这表示？', 'チェッカーが拍外の 2 度を「経過 / 刺繍」と示す。意味は？', 'The checker labels an off-beat second "passing / neighbour". This means…'),
            options: [t('拍外的不协和可以当作装饰 只是提醒', '拍外の不協和は装飾として扱え、注意のみ', 'off-beat dissonance can be ornamental — just a note'), t('必须删除', '必ず削除', 'it must be deleted'), t('是平行五度', '平行 5 度', 'it is a parallel fifth')], answer: 0,
            hint: t('拍上与拍外的不协和处理不同。', '拍上と拍外で扱いが違う。', 'On-beat and off-beat dissonances differ.'),
            explain: t('拍外的不协和常是经过音或辅助音，检查器只提示；拍上的不协和才标成错误。', '拍外の不協和は経過音や刺繍音のことが多く、注意のみ。拍上の不協和が誤り。', 'Off-beat dissonances are often passing or neighbour tones, so they are only noted; on-beat ones count as errors.') },
        ],
      },
    ],
  },
];

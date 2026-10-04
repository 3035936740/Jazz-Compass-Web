// Side-B 第 1 章（入门：精确地听、写、数）的关卡内容。节点格式见 sideb_ui.js / SIDE_B_DESIGN.md §3–4。
// 出处（每条事实都在原文里核对过）：
//   半音 / 全音、E–F 与 B–C 是半音、升降号写在音符左边并对准线或间、重升重降、同音异名：ref:omt2e-half-whole
//   音高 vs 音级、每个八度从 C 开始编号、中央 C = C4、B♯3 与 C4 同音不同八度号（升降号不改变八度号）：ref:omt2e-aspn
//   符干方向（中线以上朝下、以下朝上）、二度里低音在左、加线不要多画：ref:omt2e-notation
//   四种谱号（高音谱号绕 G 线、低音谱号的点从 F 线开始、中音谱号以中线为 C、次中音谱号以上数第二线为 C）与常用乐器：ref:omt2e-clefs
//   单拍子 / 复拍子（每拍分二 / 分三；复拍子拍号上面的数是分拍数，6、9、12 对应二、三、四拍子；复拍子的拍是附点音符）、
//   强拍 / 弱拍、按拍连符尾（12 个十六分音符：单拍子四个一组，复拍子六个一组）：ref:omt2e-simple-meter ref:omt2e-compound-meter
//   三连音 / 二连音（"借来的"分法）、超小节节拍（hypermeter）：ref:omt2e-rhythm-more
//   音程的度数（数线和间 / 字母）与性质、纯音程与大小音程、增 / 减、复音程、转位度数相加为 9、大变小增变减、增四 = 减五（6 个半音）：ref:omt2e-intervals
//   半音数表示的音程（i4 = 4 个半音）、先数字母再数半音：ref:omt-intervals
//   大调 W-W-H-W-W-W-H、音级名称与来历（dominant 来自中世纪理论里主音上方五度的重要性；sub- = 在主音下方：下属音是属音的"倒影"）、
//   调号写在谱号之后、拍号之前，升号顺序 F C G D A E B、降号相反，最后一个升号在主音下方半音、倒数第二个降号就是主音、五度圈：ref:omt2e-major-scales
//   小调第三音比同名大调低半音、三种小调、小调调号按自然小调、关系调（关系小调主音在关系大调主音下方三个半音）与同主音调：ref:omt2e-minor
//   七种调式的明暗顺序（Lydian、Ionian、Mixolydian 含 mi；Dorian、Aeolian、Phrygian、Locrian 含 me）及各自的全音半音排列：ref:omt2e-modes
//   五声：五个音、没有半音、是自然音阶的子集、可以用五度来解释；五种转位互不相同，流行音乐最常用大调五声与小调五声；
//   摇滚里常把五声音阶当作和弦的根音，和弦性质不限，所以会出现 mi 和 me 同时出现的"音级冲突"：ref:omt2e-pentatonic-harmony
//   宫、商、角、徵、羽：ref:sccm-ethnic-modes
//   织体：单声部 / 支声 / 主调 / 复调，多数音乐在几种织体之间转换：ref:omt2e-texture；反向进行最能保持声部独立：ref:omt-species1
const t = (zh, ja, en) => ({ zh, ja, en });
const G = (id, gen, count, skills, params) => ({ id, type: 'gen', gen, count, skills, ...(params ? { params } : {}) });
const nn = (p) => ({ p, d: 'w', lit: true });
/** 同一列叠几个音（和弦 / 和声音程） */
const chordCol = (ps, col) => ps.map((p) => ({ p, d: 'w', col }));

// ===================== B1-1 音高、拼写与记谱的精确性 =====================
export const LEVEL_B1_1 = {
  minutes: 13,
  insight: t('同一个琴键可以有好几个名字，而八度编号跟着字母走。', '同じ鍵にいくつもの名前がある。オクターヴ番号は文字に従う。', 'One key can have several names — and the octave number follows the letter.'),
  sections: {
    discover: [
      {
        id: 'b11-d1', type: 'discover', ref: 'omt2e-aspn',
        prompt: t('先听 C4，再听 B♯3。它们是同一个琴键吗？为什么一个是 4、一个是 3？', 'まず C4、次に B♯3 を聴こう。同じ鍵？ なぜ 4 と 3？', 'Hear C4, then B♯3. Are they the same key? Why is one “4” and the other “3”?'),
        play: [{ label: 'C4', audio: { notes: [60], mode: 'melody' } }, { label: 'B♯3', audio: { notes: [60], mode: 'melody' } }],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [nn('C4'), nn('B#3')], cols: 2 },
        options: [t('同一个键；八度编号跟着字母 B 算在下面一个八度', '同じ鍵。オクターヴ番号は文字 B に従い、下のオクターヴに数える', 'The same key; the number follows the letter B, which belongs to the octave below'), t('不同的键', '違う鍵', 'Different keys'), t('同一个键，其中一个写错了', '同じ鍵で、どちらかが書き間違い', 'The same key; one of them is a typo')],
        answer: 0,
        insight: {
          title: t('编号跟着字母，不跟着琴键', '番号は鍵ではなく文字に従う', 'The number follows the letter, not the key'),
          text: t('ASPN 的每个八度从 C 开始编号，中央 C 是 C4。升降号不改变八度编号：B♯3 和 C4 同音，但 B♯ 仍然算在下面那个八度。同一个键可以有好几个名字（同音异名），写哪一个由音乐语境决定。', 'ASPN の各オクターヴは C から番号を振り、中央の C は C4。臨時記号は番号を変えない：B♯3 と C4 は同じ音だが、B♯ は下のオクターヴのまま。同じ鍵にいくつも名前があり（異名同音）、どれを書くかは文脈で決まる。', 'ASPN numbers each octave from C; middle C is C4. Accidentals do not change the octave number: B♯3 sounds the same as C4, but B♯ still belongs to the octave below. One key has several names (enharmonic equivalents); context decides which to write.'),
        },
      },
    ],
    explain: [
      {
        id: 'b11-e1', type: 'page', ref: 'omt2e-half-whole',
        title: t('半音、全音和升降号', '半音・全音・臨時記号', 'Half steps, whole steps and accidentals'),
        text: [
          t('半音是钢琴上紧挨着的两个键；全音是两个半音。E–F 和 B–C 之间没有黑键，因为它们本来就是半音。', '半音は鍵盤で隣り合う 2 つの鍵、全音は半音 2 つ。E–F と B–C の間に黒鍵がないのは、もともと半音だから。', 'A half step is two adjacent keys; a whole step is two half steps. E–F and B–C have no black key between them because they are already half steps.'),
          t('升号升高半音、降号降低半音、还原号取消前面的升降；重升、重降各改变一个全音。升降号总是写在音符左边，正好对准音符所在的线或间。', '♯ は半音上げ、♭ は半音下げ、♮ は前の臨時記号を取り消す。𝄪・𝄫 は全音分。臨時記号はいつも音符の左、音符と同じ線か間に書く。', 'A sharp raises a half step, a flat lowers a half step, a natural cancels; double sharps and flats move a whole step. Accidentals always go to the left of the note, right on its line or space.'),
        ],
        visual: { kind: 'piano', from: 60, to: 72, lit: [64, 65, 71, 72] },
      },
      {
        id: 'b11-e2', type: 'demo', ref: ['omt2e-half-whole', 'omt2e-aspn'],
        title: t('一个键，三个名字', '1 つの鍵に 3 つの名前', 'One key, three names'),
        steps: [
          { text: t('D、C𝄪、E𝄫 是同一个音高——同音异名。', 'D・C𝄪・E𝄫 は同じ高さ——異名同音。', 'D, C𝄪 and E𝄫 are the same pitch — enharmonic equivalents.'), visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [nn('D4'), nn('C##4'), nn('Ebb4')], cols: 3 }, audio: { notes: [62, 62, 62], mode: 'melody' } },
          { text: t('"音高"是具体的一个频率（如 C4）；"音级"把所有八度里的 C 和它的同音异名（B♯、D𝄫）算成一类。', '「音高」は具体的な 1 つの周波数（C4 など）。「ピッチクラス」はすべてのオクターヴの C とその異名同音（B♯・D𝄫）をまとめた 1 つの類。', 'A pitch is one specific frequency (like C4); a pitch class groups every C in every octave together with its enharmonic spellings (B♯, D𝄫).'), visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [nn('C4'), nn('C5'), nn('B#3'), nn('Dbb4')], cols: 4 } },
        ],
      },
      {
        id: 'b11-e3', type: 'discover', practice: true, ref: 'omt2e-clefs',
        prompt: t('中音谱号的"C"在哪里？', 'アルト記号の「C」はどこ？', 'Where is the “C” of the alto clef?'),
        visual: { kind: 'notation', staves: [{ clef: 'alto' }], notes: [nn('C4')], cols: 1 },
        options: [t('中间那条线', '真ん中の線', 'The middle line'), t('下数第二线', '下から 2 本目', 'The second line from the bottom'), t('上数第二线', '上から 2 本目', 'The second line from the top')],
        answer: 0,
        insight: { title: t('C 谱号指向中央 C', 'ハ音記号は中央の C を指す', 'C clefs point to middle C'), text: t('中音谱号的凹口对准中线（中提琴最常用）；次中音谱号对准上数第二线（大提琴、大管、长号有时用）。高音谱号绕着 G 线，低音谱号的点从 F 线开始。', 'アルト記号のくぼみは真ん中の線（ヴィオラでよく使う）。テノール記号は上から 2 本目（チェロ・ファゴット・トロンボーンで時々）。ト音記号は G の線を巻き、ヘ音記号の点は F の線から。', 'The alto clef centres on the middle line (the viola’s clef); the tenor clef on the second line from the top (sometimes cello, bassoon, trombone). The treble clef curls round the G line; the bass clef’s dot starts on the F line.') },
      },
      {
        id: 'b11-e4', type: 'page', ref: 'omt2e-notation',
        title: t('写得准：符干、二度、加线', '正確に書く：符尾・2 度・加線', 'Writing precisely: stems, seconds, ledger lines'),
        text: [
          t('中线以上的音符干朝下（写在左边），中线以下朝上（写在右边）；正好在中线上可以朝任一方向，看前后的音。', '真ん中の線より上は符尾を下に（左側）、下は上に（右側）。真ん中の線上は前後の音を見てどちらでもよい。', 'Notes above the middle line take down-stems (on the left), below it up-stems (on the right); on the middle line either way, depending on the neighbours.'),
          t('二度同时出现时，一个符头要错开到符干的另一边：低的那个音总在左边，不管符干朝哪。加线只画到音符为止，不要多画一条。', '2 度を同時に書くときは片方の符頭を符尾の反対側へずらす：低いほうがいつも左。加線は音符のところまでで、余計に引かない。', 'In a harmonic second one notehead sits on the other side of the stem: the lower note always goes on the left. Ledger lines stop at the note — never draw an extra one.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [nn('A5'), nn('C6')], cols: 2 },
      },
    ],
    experiment: [
      { id: 'b11-x1', type: 'experiment', toy: 'spell', ref: ['omt2e-half-whole', 'omt2e-aspn', 'omt2e-clefs'],
        prompt: t('点任意一个琴键，看它所有的写法，再换四种谱号看看画在哪里。找一找：哪些键的写法会跨到另一个八度编号？', '好きな鍵を押して、すべての書き方を見よう。4 つの音部記号でどこに書かれるかも。オクターヴ番号がまたがる鍵はどれ？', 'Tap any key to see all its spellings, then switch between the four clefs. Which keys have spellings that cross into another octave number?'),
        params: { start: 60 },
        breakthrough: { id: 'b11-spell', text: t('你亲眼看到了：同一个键，不同字母，就有不同的写法和八度编号。', '同じ鍵でも、文字が違えば書き方もオクターヴ番号も違う——自分の目で確かめた。', 'You saw it yourself: one key, different letters, different spellings and octave numbers.') } },
    ],
    challenge: [
      {
        id: 'b11-c1', type: 'choice', error: 'enharmonic', skills: ['spell'], ref: 'omt2e-half-whole',
        variants: [
          { prompt: t('下面哪个和 F♯4 同音？', 'F♯4 と同じ高さはどれ？', 'Which is the same pitch as F♯4?'), options: ['G♭4', 'G♭5', 'F4', 'E♯4'] },
          { prompt: t('下面哪个和 E4 同音？', 'E4 と同じ高さはどれ？', 'Which is the same pitch as E4?'), options: ['F♭4', 'F4', 'E♭4', 'D♯4'] },
          { prompt: t('下面哪个和 A4 同音？', 'A4 と同じ高さはどれ？', 'Which is the same pitch as A4?'), options: ['B𝄫4', 'B♭4', 'G♯4', 'A♯4'] },
        ],
        answer: 0,
        explain: t('同音异名：字母不同，音高相同。数半音：重降把音降低一个全音。', '異名同音：文字は違うが高さは同じ。半音を数える：𝄫 は全音下げる。', 'Enharmonic: different letter, same pitch. Count half steps — a double flat lowers a whole step.'),
      },
      {
        id: 'b11-c2', type: 'choice', error: 'octave', skills: ['spell'], ref: 'omt2e-aspn',
        variants: [
          { prompt: t('和 C5 同一个键、写成 B 的话，应该写作？', 'C5 と同じ鍵を B で書くと？', 'The key of C5 spelled with B is…'), options: ['B♯4', 'B♯5', 'B4', 'C♭5'] },
          { prompt: t('和 B3 同一个键、写成 C 的话，应该写作？', 'B3 と同じ鍵を C で書くと？', 'The key of B3 spelled with C is…'), options: ['C♭4', 'C♭3', 'C4', 'B♯3'] },
        ],
        answer: 0,
        explain: t('八度编号跟着字母：B 属于下面那个八度、C 开始新的八度，所以 B♯4 = C5、C♭4 = B3。', 'オクターヴ番号は文字に従う：B は下のオクターヴ、C から新しいオクターヴ。だから B♯4 = C5、C♭4 = B3。', 'The number follows the letter: B belongs to the octave below and C starts a new one, so B♯4 = C5 and C♭4 = B3.'),
      },
      {
        id: 'b11-c3', type: 'choice', error: 'wrong-note', skills: ['identify'], ref: 'omt2e-notation',
        variants: [
          { prompt: t('高音谱表上 A5 的符干应该朝哪边？', 'ト音譜表の A5 の符尾は？', 'Which way does the stem of A5 go on the treble staff?'), options: [t('朝下，写在左边', '下向き、左側', 'Down, on the left'), t('朝上，写在右边', '上向き、右側', 'Up, on the right'), t('朝上，写在左边', '上向き、左側', 'Up, on the left'), t('朝下，写在右边', '下向き、右側', 'Down, on the right')] },
          { prompt: t('高音谱表上 E4 的符干应该朝哪边？', 'ト音譜表の E4 の符尾は？', 'Which way does the stem of E4 go on the treble staff?'), options: [t('朝上，写在右边', '上向き、右側', 'Up, on the right'), t('朝下，写在左边', '下向き、左側', 'Down, on the left'), t('朝上，写在左边', '上向き、左側', 'Up, on the left'), t('朝下，写在右边', '下向き、右側', 'Down, on the right')] },
        ],
        answer: 0,
        explain: t('中线以上朝下、写在左边；中线以下朝上、写在右边（高音谱表的中线是 B4）。', '真ん中の線より上は下向きで左、下は上向きで右（ト音譜表の真ん中の線は B4）。', 'Above the middle line: down, on the left; below it: up, on the right (the treble staff’s middle line is B4).'),
      },
      G('b11-g1', 'staffRead', 2, ['identify'], { clefs: ['treble', 'bass', 'alto'] }),
      G('b11-g2', 'halfWhole', 2, ['spell']),
    ],
  },
  pool: [G('b11-p1', 'keyName', 3, ['identify']), G('b11-p2', 'staffRead', 3, ['identify', 'spell'], { clefs: ['treble', 'bass', 'alto'] }), G('b11-p3', 'halfWhole', 3, ['spell'])],
};

// ===================== B1-2 脉动、细分与节拍层级 =====================
export const LEVEL_B1_2 = {
  minutes: 15,
  insight: t('3/4 和 6/8 一小节都是六个八分音符，分组却完全不同。', '3/4 と 6/8 はどちらも 1 小節 8 分音符 6 つ。でも分け方がまったく違う。', '3/4 and 6/8 both hold six eighths per bar — grouped completely differently.'),
  sections: {
    discover: [
      {
        id: 'b12-d1', type: 'discover', ref: ['omt2e-simple-meter', 'omt2e-compound-meter'],
        prompt: t('两段都是一小节六个八分音符，只是重音的位置不同。哪一段让你想"一、二"地点头，哪一段想"一、二、三"？', 'どちらも 1 小節 8 分音符 6 つ。アクセントの位置だけが違う。「1・2」でうなずきたくなるのはどっち？', 'Both are six eighths per bar; only the accents differ. Which makes you nod “ONE-two”, which “ONE-two-three”?'),
        play: [
          { label: t('A（重音在 1、3、5）', 'A（アクセント 1・3・5）', 'A (accents on 1, 3, 5)'), audio: { rhythm: { bpm: 220, cycle: 6, repeats: 3, tracks: [{ beats: [0, 2, 4], midi: 81 }, { beats: [1, 3, 5], midi: 69 }] } } },
          { label: t('B（重音在 1、4）', 'B（アクセント 1・4）', 'B (accents on 1, 4)'), audio: { rhythm: { bpm: 220, cycle: 6, repeats: 3, tracks: [{ beats: [0, 3], midi: 81 }, { beats: [1, 2, 4, 5], midi: 69 }] } } },
        ],
        options: [t('A 是三拍、每拍分二（3/4）；B 是两拍、每拍分三（6/8）', 'A は 3 拍で 1 拍を 2 つに（3/4）、B は 2 拍で 1 拍を 3 つに（6/8）', 'A is three beats split in two (3/4); B is two beats split in three (6/8)'), t('两段一样，都是 6 拍', '同じ、どちらも 6 拍', 'The same — both six beats'), t('A 是 6/8，B 是 3/4', 'A が 6/8、B が 3/4', 'A is 6/8, B is 3/4')],
        answer: 0,
        insight: {
          title: t('拍号说的是"怎么分组"', '拍子記号は「まとめ方」を言っている', 'A meter is about grouping'),
          text: t('单拍子每拍分成两份，复拍子每拍分成三份。复拍子拍号上面的数是"分拍"的个数：6/8 = 六个八分音符分成两拍（附点四分音符为一拍），是复二拍子；3/4 是单三拍子。连符尾也按拍来连：同样十二个十六分音符，单拍子四个一组，复拍子六个一组。', '単純拍子は 1 拍を 2 つ、複合拍子は 3 つに分ける。複合拍子の上の数は「分割」の数：6/8 = 8 分音符 6 つを 2 拍に（付点 4 分が 1 拍）、複合 2 拍子。3/4 は単純 3 拍子。連桁も拍ごとに：同じ 16 分音符 12 個でも単純拍子は 4 つ、複合拍子は 6 つずつ。', 'Simple meters split each beat in two, compound meters in three. In compound meters the top number counts divisions: 6/8 = six eighths in two dotted-quarter beats (compound duple); 3/4 is simple triple. Beams follow the beat: twelve sixteenths go in fours in simple meter, in sixes in compound.'),
        },
      },
    ],
    explain: [
      {
        id: 'b12-e1', type: 'page', ref: ['omt2e-simple-meter', 'omt2e-compound-meter'],
        title: t('拍、分拍、细分', '拍・分割・細分', 'Beat, division, subdivision'),
        text: [
          t('拍是规律反复的脉动。单拍子：拍分成两份，再细分成四份；复拍子：拍分成三份，再细分成六份。', '拍は規則的にくり返す脈動。単純拍子は拍を 2 つ、さらに 4 つに。複合拍子は 3 つ、さらに 6 つに。', 'The beat is a regularly recurring pulse. Simple: the beat divides in two, then subdivides in four. Compound: in three, then six.'),
          t('单拍子拍号：上面是每小节的拍数，下面是拍的单位。复拍子拍号：上面是分拍数，下面是分拍的单位；6、9、12 除以 3 就是二、三、四拍子。每小节第一拍是强拍（指挥向下），最后一拍是弱拍（指挥向上，带着"预备"的感觉）。', '単純拍子：上は 1 小節の拍数、下は拍の単位。複合拍子：上は分割の数、下は分割の単位。6・9・12 を 3 で割ると 2・3・4 拍子。各小節の 1 拍目が強拍（指揮は下へ）、最後の拍がアップビート（指揮は上へ、予備の感じ）。', 'Simple time signatures: beats per bar over the beat unit. Compound: divisions per bar over the division unit; 6, 9, 12 divided by 3 give duple, triple, quadruple. Beat 1 is the downbeat (conducted downward); the last beat is the upbeat (conducted upward, anticipating).'),
        ],
        visual: { kind: 'beats', groups: [3, 3] },
      },
      {
        id: 'b12-e2', type: 'discover', practice: true, ref: 'omt2e-compound-meter',
        prompt: t('9/8 是几拍子？每拍是什么音符？', '9/8 は何拍子？ 1 拍は何の音符？', 'What kind of meter is 9/8, and what note gets the beat?'),
        options: [t('复三拍子，附点四分音符一拍', '複合 3 拍子、付点 4 分が 1 拍', 'Compound triple; the dotted quarter gets the beat'), t('单九拍子，八分音符一拍', '単純 9 拍子、8 分が 1 拍', 'Simple nine; the eighth gets the beat'), t('复九拍子，八分音符一拍', '複合 9 拍子、8 分が 1 拍', 'Compound nine; the eighth gets the beat')],
        answer: 0,
        insight: { title: t('9 ÷ 3 = 3', '9 ÷ 3 = 3', '9 ÷ 3 = 3'), text: t('复拍子的拍总是附点音符：下面是 8 时，一拍是附点四分音符（三个八分音符）。', '複合拍子の拍はいつも付点音符：下が 8 なら 1 拍は付点 4 分（8 分 3 つ）。', 'Compound beats are always dotted: with 8 on the bottom, one beat is a dotted quarter (three eighths).') },
      },
      {
        id: 'b12-e3', type: 'page', ref: 'omt2e-rhythm-more',
        title: t('借来的分法与小节以上的节拍', '借りた分割と小節より上の拍節', 'Borrowed divisions and meter beyond the bar'),
        text: [
          t('单拍子里把一拍分成三份叫三连音（像从复拍子"借来"的）；复拍子里把一拍分成两份叫二连音。', '単純拍子で 1 拍を 3 つに分けるのが 3 連符（複合拍子から「借りた」）。複合拍子で 2 つに分けるのが 2 連符。', 'Dividing a simple beat into three gives a triplet (as if borrowed from compound meter); dividing a compound beat into two gives a duplet.'),
          t('强弱的层级不止在小节里：几个小节也会形成强弱的规律，叫超小节节拍（hypermeter）。', '強弱の階層は小節の中だけではない：いくつかの小節がまとまって強弱の規則を作る。これをハイパーメーターという。', 'The strong–weak hierarchy goes beyond the bar: groups of bars form patterns of accent too — hypermeter.'),
        ],
      },
    ],
    experiment: [
      { id: 'b12-x1', type: 'experiment', toy: 'meter', ref: ['omt2e-simple-meter', 'omt2e-compound-meter'],
        prompt: t('在 3/4 和 6/8 之间切换，只打开"拍"、只打开"分拍"、再打开"细分"——同样的格子，听起来怎么不一样？', '3/4 と 6/8 を切り替え、「拍」だけ、「分割」だけ、「細分」も——同じマス目なのに聞こえ方はどう違う？', 'Switch between 3/4 and 6/8; turn on only the beat, only the division, then the subdivision — the same grid, how does it sound different?'),
        params: { meters: ['3/4', '6/8', '2/4', '9/8'], bpm: 72 },
        breakthrough: { id: 'b12-meter', text: t('你听到了：同样的六个八分音符，分组一变，拍子就变了。', '同じ 8 分音符 6 つでも、まとめ方が変われば拍子が変わる——聴き取れた。', 'You heard it: the same six eighths, regrouped, become a different meter.') } },
    ],
    challenge: [
      {
        id: 'b12-c1', type: 'choice', error: 'wrong-meter', skills: ['identify'], ref: ['omt2e-simple-meter', 'omt2e-compound-meter'],
        variants: [
          { prompt: t('6/8 是什么拍子？', '6/8 は何拍子？', 'What is 6/8?'), options: [t('复二拍子', '複合 2 拍子', 'Compound duple'), t('单六拍子', '単純 6 拍子', 'Simple six'), t('单三拍子', '単純 3 拍子', 'Simple triple'), t('复三拍子', '複合 3 拍子', 'Compound triple')] },
          { prompt: t('12/8 是什么拍子？', '12/8 は何拍子？', 'What is 12/8?'), options: [t('复四拍子', '複合 4 拍子', 'Compound quadruple'), t('单十二拍子', '単純 12 拍子', 'Simple twelve'), t('单四拍子', '単純 4 拍子', 'Simple quadruple'), t('复三拍子', '複合 3 拍子', 'Compound triple')] },
          { prompt: t('3/8 是什么拍子？', '3/8 は何拍子？', 'What is 3/8?'), options: [t('单三拍子', '単純 3 拍子', 'Simple triple'), t('复一拍子', '複合 1 拍子', 'Compound single'), t('复三拍子', '複合 3 拍子', 'Compound triple'), t('单二拍子', '単純 2 拍子', 'Simple duple')] },
        ],
        answer: 0,
        explain: t('复拍子上面的数是 3 的倍数且大于 3（6、9、12），除以 3 得拍数；3/8 的上面是 3，是单三拍子（八分音符一拍）。', '複合拍子の上の数は 3 より大きい 3 の倍数（6・9・12）で、3 で割ると拍数。3/8 は単純 3 拍子（8 分が 1 拍）。', 'Compound top numbers are multiples of three above three (6, 9, 12); divide by three for the beats. 3/8 is simple triple (the eighth gets the beat).'),
      },
      {
        id: 'b12-c2', type: 'listen', error: 'meter-grouping', skills: ['hearing'], ref: ['omt2e-simple-meter', 'omt2e-compound-meter'],
        prompt: t('听：这段六个八分音符的循环，是 3/4 还是 6/8？', '聴いて：8 分音符 6 つのくり返しは 3/4？ 6/8？', 'Listen: is this six-eighth loop 3/4 or 6/8?'),
        options: ['3/4', '6/8', '2/4', '4/4'],
        variants: [
          { play: [{ label: t('播放', '再生', 'Play'), audio: { rhythm: { bpm: 220, cycle: 6, repeats: 3, tracks: [{ beats: [0, 2, 4], midi: 81 }, { beats: [1, 3, 5], midi: 69 }] } } }], answer: 0 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: { rhythm: { bpm: 220, cycle: 6, repeats: 3, tracks: [{ beats: [0, 3], midi: 81 }, { beats: [1, 2, 4, 5], midi: 69 }] } } }], answer: 1 },
        ],
        explain: t('数重音之间的八分音符：每两个一组是 3/4（三拍各分二），每三个一组是 6/8（两拍各分三）。', 'アクセントの間の 8 分音符を数える：2 つずつなら 3/4、3 つずつなら 6/8。', 'Count eighths between accents: groups of two make 3/4 (three beats in two), groups of three make 6/8 (two beats in three).'),
        breakthrough: { id: 'b12-hear-68', text: t('你用耳朵分清了 3/4 和 6/8。', '3/4 と 6/8 を耳で聴き分けた。', 'You told 3/4 from 6/8 by ear.') },
      },
      {
        id: 'b12-c3', type: 'choice', error: 'meter-grouping', skills: ['apply'], ref: ['omt2e-simple-meter', 'omt2e-compound-meter'],
        variants: [
          { prompt: t('一小节十二个十六分音符，在 3/4 里应该怎样连符尾？', '1 小節に 16 分音符 12 個。3/4 ではどう連桁する？', 'Twelve sixteenths in a bar of 3/4: how are they beamed?'), options: [t('四个一组（按四分音符拍）', '4 つずつ（4 分の拍ごと）', 'In fours (by quarter-note beat)'), t('六个一组', '6 つずつ', 'In sixes'), t('三个一组', '3 つずつ', 'In threes'), t('十二个连在一起', '12 個まとめて', 'All twelve together')] },
          { prompt: t('一小节十二个十六分音符，在 6/8 里应该怎样连符尾？', '1 小節に 16 分音符 12 個。6/8 ではどう連桁する？', 'Twelve sixteenths in a bar of 6/8: how are they beamed?'), options: [t('六个一组（按附点四分音符拍）', '6 つずつ（付点 4 分の拍ごと）', 'In sixes (by dotted-quarter beat)'), t('四个一组', '4 つずつ', 'In fours'), t('三个一组', '3 つずつ', 'In threes'), t('十二个连在一起', '12 個まとめて', 'All twelve together')] },
        ],
        answer: 0,
        explain: t('符尾按拍连，让人一眼看出拍子：3/4 一拍是四分音符（四个十六分），6/8 一拍是附点四分音符（六个十六分）。', '連桁は拍ごとに、拍子がひと目で分かるように：3/4 の 1 拍は 4 分（16 分 4 つ）、6/8 の 1 拍は付点 4 分（16 分 6 つ）。', 'Beams follow the beat so the meter is visible: in 3/4 a beat is a quarter (four sixteenths), in 6/8 a dotted quarter (six sixteenths).'),
      },
      G('b12-g1', 'meterClass', 2, ['identify']),
      G('b12-g2', 'noteValue', 1, ['calc']),
    ],
    lab: [{ id: 'b12-lab', type: 'lab', lab: 'rhythm-68-2bars', mandatory: true, minutes: 4 }],
  },
  pool: [G('b12-p1', 'meterClass', 3, ['identify']), G('b12-p2', 'noteValue', 3, ['calc']), G('b12-p3', 'additiveMeter', 2, ['hearing', 'identify'])],
};

// ===================== B1-3 音程的计算与转位 =====================
export const LEVEL_B1_3 = {
  minutes: 13,
  insight: t('增四度和减五度听起来一模一样，名字却不同：音程名先看字母。', '増 4 度と減 5 度はまったく同じ響き。でも名前が違う：音程名はまず文字で決まる。', 'An augmented fourth and a diminished fifth sound identical but have different names: interval names start from the letters.'),
  sections: {
    discover: [
      {
        id: 'b13-d1', type: 'discover', ref: 'omt2e-intervals',
        prompt: t('听 C–F♯，再听 C–G♭。听起来一样吗？为什么它们的名字不一样？', 'C–F♯、次に C–G♭ を聴こう。同じ響き？ なぜ名前が違う？', 'Hear C–F♯, then C–G♭. Do they sound the same? Why are their names different?'),
        play: [{ label: 'C–F♯', audio: { notes: [60, 66], mode: 'harmonic' } }, { label: 'C–G♭', audio: { notes: [60, 66], mode: 'harmonic' } }],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...chordCol(['C4', 'F#4'], 0), ...chordCol(['C4', 'Gb4'], 1)], cols: 2 },
        options: [t('一样（都是 6 个半音）；C–F 数四个字母是四度，C–G 数五个字母是五度', '同じ（どちらも半音 6）。C–F は文字 4 つで 4 度、C–G は 5 つで 5 度', 'The same (six half steps); C–F spans four letters (a fourth), C–G five (a fifth)'), t('不一样，F♯ 更高', '違う、F♯ のほうが高い', 'Different — F♯ is higher'), t('一样，名字只是习惯', '同じ、名前は慣習だけ', 'The same; the names are just habit')],
        answer: 0,
        insight: {
          title: t('先数字母，再数半音', 'まず文字、次に半音', 'Letters first, then half steps'),
          text: t('音程的度数数的是线和间（也就是字母），和升降号无关；性质再看半音。所以 6 个半音可以是增四度（C–F♯），也可以是减五度（C–G♭）——同音异名的音程。', '度数は線と間（つまり文字）を数え、臨時記号は関係ない。性質は半音で決める。だから半音 6 つは増 4 度（C–F♯）にも減 5 度（C–G♭）にもなる——異名同音の音程。', 'Interval size counts lines and spaces — letters — regardless of accidentals; quality then comes from the half steps. Six half steps can be an augmented fourth (C–F♯) or a diminished fifth (C–G♭): enharmonic intervals.'),
        },
      },
    ],
    explain: [
      {
        id: 'b13-e1', type: 'page', ref: ['omt2e-intervals', 'omt-intervals'],
        title: t('两步法', '2 段階の方法', 'The two-step method'),
        text: [
          t('第一步，只看字母，把两个音都算进去：C 到 E 是 C、D、E 三个字母——三度。不管加了什么升降号，度数都不变。', '第 1 段階：文字だけを見て両端を数える。C から E は C・D・E の 3 つ——3 度。臨時記号が何でも度数は同じ。', 'Step one: letters only, counting both ends: C to E is C, D, E — a third, whatever the accidentals.'),
          t('第二步，数半音定性质：一、四、五、八度是纯音程；二、三、六、七度分大、小。增音程比纯或大音程大半音，减音程比纯或小音程小半音。只看半音的写法叫"半音音程"：C4–E4 = 4 个半音（i4）。', '第 2 段階：半音を数えて性質を決める。1・4・5・8 度は完全音程、2・3・6・7 度は長・短。増は完全・長より半音大きく、減は完全・短より半音小さい。半音だけで表すと C4–E4 = 半音 4 つ（i4）。', 'Step two: count half steps for the quality. Unisons, fourths, fifths and octaves are perfect; seconds, thirds, sixths and sevenths major or minor. Augmented is a half step larger than perfect or major; diminished a half step smaller than perfect or minor. Counting only half steps: C4–E4 is i4.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...chordCol(['C4', 'E4'], 0), ...chordCol(['C4', 'Eb4'], 1), ...chordCol(['C4', 'E#4'], 2)], cols: 3 },
      },
      {
        id: 'b13-e2', type: 'demo', ref: 'omt2e-intervals',
        title: t('转位：加起来等于 9', '転回：足すと 9', 'Inversion: sizes add up to 9'),
        steps: [
          { text: t('把下面的 C 移高八度：C–E（大三度）变成 E–C（小六度）。', '下の C を 1 オクターヴ上へ：C–E（長 3 度）が E–C（短 6 度）に。', 'Move the lower C up an octave: C–E (a major third) becomes E–C (a minor sixth).'), visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: [...chordCol(['C4', 'E4'], 0), ...chordCol(['E4', 'C5'], 1)], cols: 2 }, audio: { notes: [[60, 64], [64, 72]], mode: 'chords' } },
          { text: t('转位的两个度数加起来总是 9：三度 ↔ 六度、二度 ↔ 七度、四度 ↔ 五度。性质：纯还是纯，大变小、小变大，增变减、减变增。', '転回すると度数の和は必ず 9：3 度 ↔ 6 度、2 度 ↔ 7 度、4 度 ↔ 5 度。性質：完全は完全、長 ↔ 短、増 ↔ 減。', 'Inverted sizes always add to 9: thirds ↔ sixths, seconds ↔ sevenths, fourths ↔ fifths. Quality: perfect stays perfect, major ↔ minor, augmented ↔ diminished.') },
          { text: t('用处：底下的音是个难算的调时，先转位再算。例如大七度转位是小二度，增六度转位是减三度。', '使い道：下の音が難しい調の主音のときは、転回してから数える。長 7 度の転回は短 2 度、増 6 度の転回は減 3 度。', 'Why it helps: when the lower note is an awkward key, invert first. A major seventh inverts to a minor second; an augmented sixth to a diminished third.') },
        ],
      },
      {
        id: 'b13-e3', type: 'discover', practice: true, ref: 'omt2e-intervals',
        prompt: t('C4 到 E5 是几度？是纯音程还是大小音程？', 'C4 から E5 は何度？ 完全音程？ 長短音程？', 'C4 to E5 is what size? Perfect or major/minor?'),
        options: [t('大十度（复音程，像三度一样分大小）', '長 10 度（複音程、3 度と同じく長短）', 'A major tenth (compound; major/minor like a third)'), t('纯十度', '完全 10 度', 'A perfect tenth'), t('大三度', '長 3 度', 'A major third')],
        answer: 0,
        insight: { title: t('超过八度的是复音程', 'オクターヴを超えると複音程', 'Beyond the octave: compound'), text: t('八度、十一度、十二度和它们的单音程一样是纯音程；九度、十度、十三度分大小。', '8 度・11 度・12 度は単音程と同じく完全、9 度・10 度・13 度は長短。', 'Octaves, elevenths and twelfths are perfect like their simple versions; ninths, tenths and thirteenths are major or minor.') },
      },
    ],
    experiment: [
      { id: 'b13-x1', type: 'experiment', toy: 'interval', ref: ['omt-intervals', 'omt2e-intervals'],
        prompt: t('选两个音（字母、升降、八度），看度数、半音数和音程名怎样一步步算出来。试试 C–F♯ 和 C–G♭，再试试把下面的音移高一个八度看转位。', '2 つの音（文字・臨時記号・オクターヴ）を選び、度数・半音数・音程名が順に出てくるのを見よう。C–F♯ と C–G♭、そして下の音を 1 オクターヴ上げて転回も。', 'Pick two notes (letter, accidental, octave) and watch the size, half steps and name come out step by step. Try C–F♯ vs C–G♭, then move the lower note up an octave to see the inversion.'),
        params: { first: { letter: 'C', alter: 0, octave: 4 }, second: { letter: 'F', alter: 1, octave: 4 } } },
    ],
    challenge: [
      {
        id: 'b13-c1', type: 'choice', error: 'interval-quality', skills: ['calc'], ref: 'omt2e-intervals',
        variants: [
          { prompt: t('E–G♯ 是什么音程？', 'E–G♯ は何の音程？', 'What interval is E–G♯?'), options: [t('大三度', '長 3 度', 'Major third'), t('小三度', '短 3 度', 'Minor third'), t('减四度', '減 4 度', 'Diminished fourth'), t('增二度', '増 2 度', 'Augmented second')] },
          { prompt: t('D–F 是什么音程？', 'D–F は何の音程？', 'What interval is D–F?'), options: [t('小三度', '短 3 度', 'Minor third'), t('大三度', '長 3 度', 'Major third'), t('增二度', '増 2 度', 'Augmented second'), t('减三度', '減 3 度', 'Diminished third')] },
          { prompt: t('B–F 是什么音程？', 'B–F は何の音程？', 'What interval is B–F?'), options: [t('减五度', '減 5 度', 'Diminished fifth'), t('纯五度', '完全 5 度', 'Perfect fifth'), t('增四度', '増 4 度', 'Augmented fourth'), t('小五度', '短 5 度', 'Minor fifth')] },
        ],
        answer: 0,
        explain: t('先数字母定度数，再数半音定性质（大三度 4 个、小三度 3 个、纯五度 7 个、减五度 6 个半音）。没有"小五度"：五度只有纯、增、减。', 'まず文字で度数、次に半音で性質（長 3 度は半音 4、短 3 度は 3、完全 5 度は 7、減 5 度は 6）。「短 5 度」はない：5 度は完全・増・減だけ。', 'Letters for the size, then half steps for the quality (major third 4, minor third 3, perfect fifth 7, diminished fifth 6). There is no “minor fifth”: fifths are perfect, augmented or diminished.'),
      },
      {
        id: 'b13-c2', type: 'choice', error: 'interval-size', skills: ['calc'], ref: 'omt2e-intervals',
        variants: [
          { prompt: t('大六度转位后是？', '長 6 度を転回すると？', 'A major sixth inverts to…'), options: [t('小三度', '短 3 度', 'Minor third'), t('大三度', '長 3 度', 'Major third'), t('小四度', '短 4 度', 'Minor fourth'), t('大二度', '長 2 度', 'Major second')] },
          { prompt: t('增四度转位后是？', '増 4 度を転回すると？', 'An augmented fourth inverts to…'), options: [t('减五度', '減 5 度', 'Diminished fifth'), t('增五度', '増 5 度', 'Augmented fifth'), t('纯五度', '完全 5 度', 'Perfect fifth'), t('减四度', '減 4 度', 'Diminished fourth')] },
          { prompt: t('小二度转位后是？', '短 2 度を転回すると？', 'A minor second inverts to…'), options: [t('大七度', '長 7 度', 'Major seventh'), t('小七度', '短 7 度', 'Minor seventh'), t('大六度', '長 6 度', 'Major sixth'), t('纯八度', '完全 8 度', 'Perfect octave')] },
        ],
        answer: 0,
        explain: t('度数相加为 9；大 ↔ 小、增 ↔ 减、纯不变。', '度数の和は 9。長 ↔ 短、増 ↔ 減、完全はそのまま。', 'Sizes add to 9; major ↔ minor, augmented ↔ diminished, perfect stays.'),
      },
      {
        id: 'b13-c3', type: 'choice', error: 'enharmonic', skills: ['spell', 'calc'], ref: 'omt2e-intervals',
        variants: [
          { prompt: t('下面哪个和大二度同音异名（都是 2 个半音）？', '長 2 度と異名同音（どちらも半音 2）はどれ？', 'Which is enharmonic with a major second (both two half steps)?'), options: [t('减三度', '減 3 度', 'Diminished third'), t('小三度', '短 3 度', 'Minor third'), t('增二度', '増 2 度', 'Augmented second'), t('小二度', '短 2 度', 'Minor second')] },
          { prompt: t('下面哪个和纯五度同音异名（都是 7 个半音）？', '完全 5 度と異名同音（どちらも半音 7）はどれ？', 'Which is enharmonic with a perfect fifth (both seven half steps)?'), options: [t('减六度', '減 6 度', 'Diminished sixth'), t('增四度', '増 4 度', 'Augmented fourth'), t('小六度', '短 6 度', 'Minor sixth'), t('减五度', '減 5 度', 'Diminished fifth')] },
        ],
        answer: 0,
        explain: t('半音数相同、度数不同的音程是同音异名：大二度 = 减三度（2 个半音），纯五度 = 减六度（7 个半音），增四度 = 减五度（6 个半音）。', '半音数が同じで度数が違えば異名同音：長 2 度 = 減 3 度（半音 2）、完全 5 度 = 減 6 度（7）、増 4 度 = 減 5 度（6）。', 'Same half steps, different size: enharmonic intervals — M2 = d3 (2), P5 = d6 (7), A4 = d5 (6).'),
        breakthrough: { id: 'b13-enh', text: t('你分清了"听起来一样"和"名字一样"。', '「同じ響き」と「同じ名前」を区別できた。', 'You separated “sounds the same” from “has the same name”.') },
      },
      G('b13-g1', 'intervalName', 2, ['calc', 'spell']),
      G('b13-g2', 'intervalInvert', 1, ['calc']),
    ],
  },
  pool: [G('b13-p1', 'intervalName', 3, ['calc', 'spell']), G('b13-p2', 'intervalInvert', 3, ['calc']), G('b13-p3', 'intervalEar', 3, ['hearing'])],
};

// ===================== B1-4 调号、音阶与音级功能 =====================
export const LEVEL_B1_4 = {
  minutes: 14,
  insight: t('"下属音"不是属音下面那个音，而是主音下方的五度——属音的倒影。', '「下属音」は属音の下の音ではなく、主音の下の 5 度——属音の鏡像。', 'The subdominant is not “the note below the dominant” — it is the fifth below the tonic, the dominant’s mirror image.'),
  sections: {
    discover: [
      {
        id: 'b14-d1', type: 'discover', ref: 'omt2e-major-scales',
        prompt: t('C 大调：先听主音 C 和它上方五度的 G（属音），再听 C 和它下方五度的 F（下属音）。这两个音离 C 一样远吗？', 'ハ長調：主音 C と 5 度上の G（属音）、次に C と 5 度下の F（下属音）。C からの距離は同じ？', 'C major: hear C with the G a fifth above (dominant), then C with the F a fifth below (subdominant). Are they equally far from C?'),
        play: [{ label: t('C 与上方的 G', 'C と上の G', 'C and the G above'), audio: { notes: [[60], [67], [60, 67]], mode: 'chords' } }, { label: t('C 与下方的 F', 'C と下の F', 'C and the F below'), audio: { notes: [[60], [53], [53, 60]], mode: 'chords' } }],
        options: [t('一样远：一个在上方五度，一个在下方五度', '同じ距離：片方は 5 度上、片方は 5 度下', 'Equally far: one a fifth above, one a fifth below'), t('F 离 C 更近，所以叫"下"属音', 'F のほうが C に近いから「下」属音', 'F is closer to C, hence “sub”'), t('没有关系', '関係ない', 'Unrelated')],
        answer: 0,
        insight: {
          title: t('sub- 是"在主音下方"', 'sub- は「主音の下」', 'Sub- means “below the tonic”'),
          text: t('音级名称有来历：dominant（属音）来自中世纪理论，指主音上方五度的重要性；mediant（中音）在主音和属音中间；super- 是"上方"，上主音在主音上方二度；sub- 是"下方"：下主音、下中音、下属音分别是上主音、中音、属音在主音下方的倒影。（本书把主音下方半音的音叫导音。）', '音度の名前には由来がある：dominant（属音）は中世の理論で、主音の 5 度上の重要性から。mediant（中音）は主音と属音の真ん中。super- は「上」で上主音は主音の 2 度上。sub- は「下」：下中音・下属音などは中音・属音などの主音の下の鏡像。（主音の半音下の音はこの本では導音と呼ぶ。）', 'Scale-degree names have origins: “dominant” comes from medieval theory and the importance of the fifth above the tonic; the mediant lies midway between tonic and dominant; super- means above, so the supertonic is a second above; sub- means below: submediant and subdominant are the mirror images, below the tonic, of the mediant and dominant. (The text calls the note a half step below the tonic the leading tone.)'),
        },
      },
    ],
    explain: [
      {
        id: 'b14-e1', type: 'page', ref: 'omt2e-major-scales',
        title: t('调号怎么读', '調号の読み方', 'Reading key signatures'),
        text: [
          t('大调音阶的全音半音顺序是 W-W-H-W-W-W-H。调号写在谱号之后、拍号之前（谱号—调—拍子），对所有八度都有效。', '長音階は W-W-H-W-W-W-H。調号は音部記号のあと、拍子記号の前（音部記号・調・拍子）で、すべてのオクターヴに効く。', 'The major scale runs W-W-H-W-W-W-H. The key signature comes after the clef and before the time signature (clef, key, time) and applies in every octave.'),
          t('升号顺序：F C G D A E B；降号顺序正好相反：B E A D G C F。升号调：最后一个升号在主音下方半音；降号调：倒数第二个降号就是主音。', '♯ の順：F C G D A E B、♭ はその逆：B E A D G C F。♯ 系：最後の ♯ は主音の半音下。♭ 系：最後から 2 番目の ♭ が主音。', 'Sharps enter F C G D A E B; flats in reverse, B E A D G C F. Sharp keys: the last sharp is a half step below the tonic. Flat keys: the second-to-last flat is the tonic.'),
        ],
        visual: { kind: 'circle', highlight: ['G', 'D', 'F', 'B♭'] },
      },
      {
        id: 'b14-e2', type: 'discover', practice: true, ref: 'omt2e-major-scales',
        prompt: t('调号有三个降号（B♭ E♭ A♭）。是什么大调？', '♭ が 3 つ（B♭ E♭ A♭）。何長調？', 'Three flats (B♭ E♭ A♭). Which major key?'),
        options: ['E♭', 'A♭', 'B♭'],
        answer: 0,
        insight: { title: t('倒数第二个降号', '最後から 2 番目の ♭', 'The second-to-last flat'), text: t('B♭ E♭ A♭ 的倒数第二个是 E♭：E♭ 大调。只有一个降号的 F 大调要另外记。', 'B♭ E♭ A♭ の最後から 2 番目は E♭：変ホ長調。♭ 1 つのヘ長調は別に覚える。', 'The second-to-last of B♭ E♭ A♭ is E♭: E♭ major. F major, with a single flat, has to be memorised.') },
      },
      {
        id: 'b14-e3', type: 'page', ref: 'omt2e-minor',
        title: t('小调：三种形态，一个调号', '短調：3 つの形、1 つの調号', 'Minor: three forms, one key signature'),
        text: [
          t('小调音阶的第三音比同名大调低半音。三种小调：自然小调 W-H-W-W-H-W-W；和声小调把第七音升高（W-H-W-W-H-3H-H）；旋律小调上行升高第六、七音（W-H-W-W-W-W-H），下行用自然小调。', '短音階の第 3 音は同名の長音階より半音低い。自然短音階 W-H-W-W-H-W-W、和声的短音階は第 7 音を上げる（W-H-W-W-H-3H-H）、旋律的短音階は上行で第 6・7 音を上げ（W-H-W-W-W-W-H）、下行は自然短音階。', 'A minor scale’s third is a half step lower than the major scale on the same note. Natural minor W-H-W-W-H-W-W; harmonic minor raises the seventh (W-H-W-W-H-3H-H); melodic minor raises six and seven ascending (W-H-W-W-W-W-H) and uses natural minor descending.'),
          t('但"小调"只有一个：调号按自然小调定。关系调共用调号（关系小调的主音在关系大调主音下方三个半音）；同主音调共用主音。', 'でも「短調」は 1 つだけ：調号は自然短音階で決まる。平行調は調号を共有（平行短調の主音は長調の主音の半音 3 つ下）、同主調は主音を共有。', 'But a key is simply “minor”: the signature comes from natural minor. Relative keys share a signature (the relative minor’s tonic is three half steps below the major’s); parallel keys share a tonic.'),
        ],
      },
    ],
    experiment: [
      { id: 'b14-x1', type: 'experiment', toy: 'scale', ref: ['omt2e-major-scales', 'omt2e-minor'],
        prompt: t('换主音、换大调和三种小调，看全音半音的排列和调号怎么变。找一找：和声小调里那个"3H"在哪两个音之间？', '主音と、長調・3 つの短調を切り替えて、全音半音の並びと調号の変化を見よう。和声的短音階の「3H」はどの 2 音の間？', 'Change the tonic and switch between major and the three minors; watch the step pattern and key signature change. Where is the “3H” in harmonic minor?'),
        params: { sets: [
          { id: 'major', label: t('大调', '長調', 'Major'), steps: [0, 2, 4, 5, 7, 9, 11] },
          { id: 'natural', label: t('自然小调', '自然短音階', 'Natural minor'), steps: [0, 2, 3, 5, 7, 8, 10] },
          { id: 'harmonic', label: t('和声小调', '和声的短音階', 'Harmonic minor'), steps: [0, 2, 3, 5, 7, 8, 11], mark: 6, markNote: t('升高的第七音（导音）', '上げた第 7 音（導音）', 'the raised seventh (leading tone)'), noKey: true },
          { id: 'melodic', label: t('旋律小调（上行）', '旋律的短音階（上行）', 'Melodic minor (ascending)'), steps: [0, 2, 3, 5, 7, 9, 11], noKey: true },
        ] } },
    ],
    challenge: [
      {
        id: 'b14-c1', type: 'choice', error: 'scale-pattern', skills: ['identify'], ref: 'omt2e-major-scales',
        variants: [
          { prompt: t('调号有四个升号（F♯ C♯ G♯ D♯）。是什么大调？', '♯ が 4 つ（F♯ C♯ G♯ D♯）。何長調？', 'Four sharps (F♯ C♯ G♯ D♯). Which major key?'), options: ['E', 'D♯', 'A', 'B'] },
          { prompt: t('调号有两个降号（B♭ E♭）。是什么大调？', '♭ が 2 つ（B♭ E♭）。何長調？', 'Two flats (B♭ E♭). Which major key?'), options: ['B♭', 'E♭', 'F', 'A♭'] },
          { prompt: t('调号有五个降号（B♭ E♭ A♭ D♭ G♭）。是什么大调？', '♭ が 5 つ（B♭ E♭ A♭ D♭ G♭）。何長調？', 'Five flats (B♭ E♭ A♭ D♭ G♭). Which major key?'), options: ['D♭', 'G♭', 'A♭', 'C♭'] },
        ],
        answer: 0,
        explain: t('升号调：最后一个升号上方半音是主音（D♯ → E）；降号调：倒数第二个降号是主音。', '♯ 系：最後の ♯ の半音上が主音（D♯ → E）。♭ 系：最後から 2 番目の ♭ が主音。', 'Sharps: a half step above the last sharp (D♯ → E). Flats: the second-to-last flat.'),
      },
      {
        id: 'b14-c2', type: 'choice', error: 'scale-pattern', skills: ['identify', 'calc'], ref: 'omt2e-minor',
        variants: [
          { prompt: t('A 大调的关系小调是？', 'イ長調の平行短調は？', 'The relative minor of A major is…'), options: [t('升 F 小调', '嬰ヘ短調', 'F♯ minor'), t('A 小调', 'イ短調', 'A minor'), t('C♯ 小调', '嬰ハ短調', 'C♯ minor'), t('D 小调', 'ニ短調', 'D minor')] },
          { prompt: t('E♭ 大调的关系小调是？', '変ホ長調の平行短調は？', 'The relative minor of E♭ major is…'), options: [t('C 小调', 'ハ短調', 'C minor'), t('E♭ 小调', '変ホ短調', 'E♭ minor'), t('G 小调', 'ト短調', 'G minor'), t('F 小调', 'ヘ短調', 'F minor')] },
        ],
        answer: 0,
        explain: t('关系小调的主音在关系大调主音下方三个半音，两者共用调号；同名的（A 大调与 A 小调）是同主音调。', '平行短調の主音は長調の主音の半音 3 つ下で、調号を共有。同じ名前（イ長調とイ短調）は同主調。', 'The relative minor’s tonic is three half steps below the major’s, sharing its signature; same-named keys (A major/A minor) are parallel.'),
      },
      {
        id: 'b14-c3', type: 'choice', error: 'concept', skills: ['function'], ref: 'omt2e-major-scales',
        variants: [
          { prompt: t('G 大调的下属音是？', 'ト長調の下属音は？', 'The subdominant of G major is…'), options: ['C', 'D', 'F♯', 'E'] },
          { prompt: t('F 大调的属音是？', 'ヘ長調の属音は？', 'The dominant of F major is…'), options: ['C', 'B♭', 'E', 'G'] },
          { prompt: t('D 大调的下中音是？', 'ニ長調の下中音は？', 'The submediant of D major is…'), options: ['B', 'G', 'F♯', 'A'] },
        ],
        answer: 0,
        explain: t('属音 = 主音上方五度，下属音 = 主音下方五度（第四级），中音在主音和属音中间（第三级），下中音是主音下方三度（第六级）。', '属音 = 主音の 5 度上、下属音 = 主音の 5 度下（第 4 音）、中音は主音と属音の間（第 3 音）、下中音は主音の 3 度下（第 6 音）。', 'Dominant = fifth above the tonic; subdominant = fifth below (degree 4); mediant halfway to the dominant (degree 3); submediant a third below the tonic (degree 6).'),
        breakthrough: { id: 'b14-mirror', text: t('你看出了属音和下属音是一对镜像。', '属音と下属音が鏡像のペアだと分かった。', 'You saw that dominant and subdominant mirror each other.') },
      },
      G('b14-g1', 'keySignature', 2, ['identify']),
      G('b14-g2', 'minorScale', 1, ['spell']),
    ],
  },
  pool: [G('b14-p1', 'keySignature', 3, ['identify']), G('b14-p2', 'majorDegree', 3, ['function']), G('b14-p3', 'relativeParallel', 3, ['calc']), G('b14-p4', 'minorScale', 2, ['spell'])],
};

// ===================== B1-5 调式 =====================
const MODES = [
  { id: 'lydian', label: t('Lydian（利底亚）', 'リディア', 'Lydian'), steps: [0, 2, 4, 6, 7, 9, 11], mark: 3, markNote: t('升高的第四音', '上げた第 4 音', 'raised 4'), noKey: true },
  { id: 'ionian', label: t('Ionian（伊奥尼亚 = 大调）', 'イオニア（= 長調）', 'Ionian (= major)'), steps: [0, 2, 4, 5, 7, 9, 11], noKey: true },
  { id: 'mixolydian', label: t('Mixolydian（混合利底亚）', 'ミクソリディア', 'Mixolydian'), steps: [0, 2, 4, 5, 7, 9, 10], mark: 6, markNote: t('降低的第七音', '下げた第 7 音', 'lowered 7'), noKey: true },
  { id: 'dorian', label: t('Dorian（多利亚）', 'ドリア', 'Dorian'), steps: [0, 2, 3, 5, 7, 9, 10], mark: 5, markNote: t('比自然小调高的第六音', '自然短音階より高い第 6 音', '6 raised from natural minor'), noKey: true },
  { id: 'aeolian', label: t('Aeolian（爱奥利亚 = 自然小调）', 'エオリア（= 自然短音階）', 'Aeolian (= natural minor)'), steps: [0, 2, 3, 5, 7, 8, 10], noKey: true },
  { id: 'phrygian', label: t('Phrygian（弗里几亚）', 'フリギア', 'Phrygian'), steps: [0, 1, 3, 5, 7, 8, 10], mark: 1, markNote: t('降低的第二音', '下げた第 2 音', 'lowered 2'), noKey: true },
  { id: 'locrian', label: t('Locrian（洛克里亚）', 'ロクリア', 'Locrian'), steps: [0, 1, 3, 5, 6, 8, 10], mark: 4, markNote: t('降低的第五音', '下げた第 5 音', 'lowered 5'), noKey: true },
];
export const LEVEL_B1_5 = {
  minutes: 13,
  insight: t('从最亮的 Lydian 到最暗的 Locrian，每往暗走一步只降一个音。', '最も明るいリディアから最も暗いロクリアまで、1 段暗くなるごとに 1 音だけ下がる。', 'From brightest Lydian to darkest Locrian, each step darker lowers just one note.'),
  sections: {
    discover: [
      {
        id: 'b15-d1', type: 'discover', ref: 'omt2e-modes',
        prompt: t('都从 C 开始：先听 C Lydian，再听 C Ionian（大调），再听 C Mixolydian。每一段和前一段只差一个音——你听出是哪个音变了吗？', 'すべて C から：C リディア、C イオニア（長調）、C ミクソリディアを順に。前と 1 音だけ違う——どの音が変わった？', 'All on C: hear C Lydian, then C Ionian (major), then C Mixolydian. Each differs from the previous by one note — can you hear which?'),
        play: [
          { label: 'Lydian', audio: { notes: [60, 62, 64, 66, 67, 69, 71, 72], mode: 'melody' } },
          { label: 'Ionian', audio: { notes: [60, 62, 64, 65, 67, 69, 71, 72], mode: 'melody' } },
          { label: 'Mixolydian', audio: { notes: [60, 62, 64, 65, 67, 69, 70, 72], mode: 'melody' } },
        ],
        options: [t('Lydian → Ionian 降了第四音，Ionian → Mixolydian 降了第七音', 'リディア → イオニアで第 4 音が、イオニア → ミクソリディアで第 7 音が下がった', 'Lydian → Ionian lowers 4; Ionian → Mixolydian lowers 7'), t('三段完全一样', '3 つとも同じ', 'All three are identical'), t('每段都换了好几个音', 'どれも何音も変わった', 'Several notes change each time')],
        answer: 0,
        insight: {
          title: t('调式的明暗是一条链', '旋法の明暗は 1 本の鎖', 'Modal brightness is a chain'),
          text: t('把同一个主音上的七种调式按明暗排：Lydian（升四）→ Ionian → Mixolydian（降七）→ Dorian（再降三）→ Aeolian（再降六）→ Phrygian（再降二）→ Locrian（再降五）。对照各调式的全音半音排列，相邻两个只差一个音。含 mi 的三个比较亮，含 me 的四个比较暗。', '同じ主音の 7 つの旋法を明暗順に並べると：リディア（♯4）→ イオニア → ミクソリディア（♭7）→ ドリア（さらに ♭3）→ エオリア（さらに ♭6）→ フリギア（さらに ♭2）→ ロクリア（さらに ♭5）。全音半音の並びを比べると、隣どうしは 1 音しか違わない。mi を含む 3 つは明るく、me を含む 4 つは暗い。', 'Order the seven modes on one tonic by brightness: Lydian (♯4) → Ionian → Mixolydian (♭7) → Dorian (also ♭3) → Aeolian (also ♭6) → Phrygian (also ♭2) → Locrian (also ♭5). Compare their step patterns: neighbours differ by a single note. The three with mi are brighter, the four with me darker.'),
        },
      },
    ],
    explain: [
      {
        id: 'b15-e1', type: 'page', ref: 'omt2e-modes',
        title: t('七种调式与特征音', '7 つの旋法と特性音', 'Seven modes and their tell-tale notes'),
        text: [
          t('亮的三种：Lydian = 大调升高第四音；Ionian = 大调（W-W-H-W-W-W-H）；Mixolydian = 大调降低第七音（W-W-H-W-W-H-W）。', '明るい 3 つ：リディア = 長調の第 4 音を上げる。イオニア = 長調（W-W-H-W-W-W-H）。ミクソリディア = 長調の第 7 音を下げる（W-W-H-W-W-H-W）。', 'Bright three: Lydian = major with raised 4; Ionian = major (W-W-H-W-W-W-H); Mixolydian = major with lowered 7 (W-W-H-W-W-H-W).'),
          t('暗的四种：Dorian = 小调升高第六音（W-H-W-W-W-H-W）；Aeolian = 自然小调；Phrygian = 自然小调降低第二音（H-W-W-W-H-W-W）；Locrian = 再降低第五音（H-W-W-H-W-W-W）。任何音都可以当调式的起点，写的时候要特别注意升降号。', '暗い 4 つ：ドリア = 短調の第 6 音を上げる（W-H-W-W-W-H-W）。エオリア = 自然短音階。フリギア = 自然短音階の第 2 音を下げる（H-W-W-W-H-W-W）。ロクリア = さらに第 5 音も下げる（H-W-W-H-W-W-W）。どの音からでも始められるので、臨時記号に注意。', 'Dark four: Dorian = minor with raised 6 (W-H-W-W-W-H-W); Aeolian = natural minor; Phrygian = natural minor with lowered 2 (H-W-W-W-H-W-W); Locrian = also lowered 5 (H-W-W-H-W-W-W). Any note can start a mode — watch the accidentals.'),
        ],
      },
      {
        id: 'b15-e2', type: 'discover', practice: true, ref: 'omt2e-modes',
        prompt: t('D E F G A B C D（全是白键）是什么调式？', 'D E F G A B C D（白鍵だけ）は何の旋法？', 'D E F G A B C D (all white keys) is which mode?'),
        audio: { notes: [62, 64, 65, 67, 69, 71, 72, 74], mode: 'melody' },
        options: ['Dorian', 'Aeolian', 'Phrygian'],
        answer: 0,
        insight: { title: t('小调 + 升高的第六音', '短調 + 上げた第 6 音', 'Minor with a raised 6'), text: t('第三音 F 是小三度（暗的一边），第六音 B 比 D 自然小调的 B♭ 高半音：Dorian。', '第 3 音 F は短 3 度（暗い側）、第 6 音 B はニ自然短音階の B♭ より半音高い：ドリア。', 'The third, F, is minor (the dark side), and the sixth, B, is a half step above natural minor’s B♭: Dorian.') },
      },
    ],
    experiment: [
      { id: 'b15-x1', type: 'experiment', toy: 'scale', ref: 'omt2e-modes',
        prompt: t('保持主音不变，从 Lydian 一个个点到 Locrian，看金色的特征音，再换个主音试试（注意升降号怎么变）。', '主音はそのまま、リディアからロクリアまで順に押して金色の特性音を見よう。主音を変えても試して（臨時記号の変化に注意）。', 'Keep the tonic and step from Lydian to Locrian, watching the gold tell-tale note; then change the tonic (watch the accidentals).'),
        params: { sets: MODES },
        breakthrough: { id: 'b15-chain', text: t('你亲手走完了从最亮到最暗的调式链。', '最も明るい旋法から最も暗い旋法まで、自分の手でたどった。', 'You walked the whole chain from brightest to darkest yourself.') } },
    ],
    challenge: [
      {
        id: 'b15-c1', type: 'choice', error: 'mode-character', skills: ['identify'], ref: 'omt2e-modes',
        variants: [
          { prompt: t('大调降低第七音是哪个调式？', '長調の第 7 音を下げると何の旋法？', 'Major with a lowered 7 is which mode?'), options: ['Mixolydian', 'Lydian', 'Dorian', 'Aeolian'] },
          { prompt: t('自然小调降低第二音是哪个调式？', '自然短音階の第 2 音を下げると何の旋法？', 'Natural minor with a lowered 2 is which mode?'), options: ['Phrygian', 'Locrian', 'Dorian', 'Mixolydian'] },
          { prompt: t('大调升高第四音是哪个调式？', '長調の第 4 音を上げると何の旋法？', 'Major with a raised 4 is which mode?'), options: ['Lydian', 'Mixolydian', 'Ionian', 'Phrygian'] },
        ],
        answer: 0,
        explain: t('特征音：Lydian 升四、Mixolydian 降七、Dorian（小调）升六、Phrygian（小调）降二、Locrian 降二降五。', '特性音：リディア ♯4、ミクソリディア ♭7、ドリア（短調から）♯6、フリギア（短調から）♭2、ロクリア ♭2 ♭5。', 'Tell-tale notes: Lydian ♯4, Mixolydian ♭7, Dorian (from minor) ♯6, Phrygian (from minor) ♭2, Locrian ♭2 ♭5.'),
      },
      {
        id: 'b15-c2', type: 'choice', error: 'mode-character', skills: ['identify'], ref: 'omt2e-modes',
        variants: [
          { prompt: t('下面哪个调式比 Dorian 更暗、比 Phrygian 更亮？', 'ドリアより暗く、フリギアより明るい旋法は？', 'Which mode is darker than Dorian but brighter than Phrygian?'), options: ['Aeolian', 'Mixolydian', 'Locrian', 'Lydian'] },
          { prompt: t('下面哪个调式最暗？', '最も暗い旋法は？', 'Which mode is the darkest?'), options: ['Locrian', 'Phrygian', 'Aeolian', 'Dorian'] },
        ],
        answer: 0,
        explain: t('由亮到暗：Lydian、Ionian、Mixolydian、Dorian、Aeolian、Phrygian、Locrian。', '明るい順：リディア・イオニア・ミクソリディア・ドリア・エオリア・フリギア・ロクリア。', 'Bright to dark: Lydian, Ionian, Mixolydian, Dorian, Aeolian, Phrygian, Locrian.'),
      },
      {
        id: 'b15-c3', type: 'choice', error: 'scale-pattern', skills: ['spell'], ref: 'omt2e-modes',
        variants: [
          { prompt: t('G Mixolydian 的音是？', 'G ミクソリディアの音は？', 'The notes of G Mixolydian are…'), options: ['G A B C D E F', 'G A B C D E F♯', 'G A B♭ C D E F', 'G A B C♯ D E F♯'] },
          { prompt: t('E Phrygian 的音是？', 'E フリギアの音は？', 'The notes of E Phrygian are…'), options: ['E F G A B C D', 'E F♯ G A B C D', 'E F G A B♭ C D', 'E F♯ G♯ A B C♯ D♯'] },
          { prompt: t('F Lydian 的音是？', 'F リディアの音は？', 'The notes of F Lydian are…'), options: ['F G A B C D E', 'F G A B♭ C D E', 'F G A B C D E♭', 'F G A♭ B♭ C D E'] },
        ],
        answer: 0,
        explain: t('先写出同主音的大调或小调，再改特征音：G 大调 F♯ 降成 F；E 小调 F♯ 降成 F；F 大调 B♭ 升成 B。', 'まず同じ主音の長調か短調を書き、特性音を変える：ト長調の F♯ → F、ホ短調の F♯ → F、ヘ長調の B♭ → B。', 'Write the major or minor scale on the tonic, then alter the tell-tale note: G major’s F♯ → F; E minor’s F♯ → F; F major’s B♭ → B.'),
      },
      G('b15-g1', 'modeSpell', 2, ['spell']),
      G('b15-g2', 'modeEar', 1, ['hearing']),
    ],
  },
  pool: [G('b15-p1', 'modeSpell', 3, ['spell']), G('b15-p2', 'modeEar', 3, ['hearing']), G('b15-p3', 'modeBrightness', 3, ['identify'])],
};

// ===================== B1-6 五声与五声和声 =====================
const PENTA = [
  { id: 'major', label: t('大调五声（宫调式）', '長調ペンタトニック（宮調式）', 'Major pentatonic'), steps: [0, 2, 4, 7, 9], degrees: [0, 1, 2, 4, 5] },
  { id: 'r2', label: t('第二种转位（商）', '第 2 の転回（商）', 'Rotation 2 (shang)'), steps: [0, 2, 5, 7, 10], degrees: [0, 1, 3, 4, 6] },
  { id: 'r3', label: t('第三种转位（角）', '第 3 の転回（角）', 'Rotation 3 (jue)'), steps: [0, 3, 5, 8, 10], degrees: [0, 2, 3, 5, 6] },
  { id: 'r4', label: t('第四种转位（徵）', '第 4 の転回（徵）', 'Rotation 4 (zhi)'), steps: [0, 2, 5, 7, 9], degrees: [0, 1, 3, 4, 5] },
  { id: 'minor', label: t('小调五声（羽调式）', '短調ペンタトニック（羽調式）', 'Minor pentatonic'), steps: [0, 3, 5, 7, 10], degrees: [0, 2, 3, 4, 6] },
];
export const LEVEL_B1_6 = {
  minutes: 13,
  insight: t('从宫开始一路往上叠四个五度，就得到整个五声音阶。', '宮から 5 度を 4 つ積み上げると、ペンタトニック全体ができる。', 'Stack four fifths up from the tonic and you have the whole pentatonic scale.'),
  sections: {
    discover: [
      {
        id: 'b16-d1', type: 'discover', ref: ['omt2e-pentatonic-harmony', 'sccm-ethnic-modes'],
        prompt: t('先听 C、G、D、A、E——每次往上一个五度；再听 C D E G A。两段用的是同一组音吗？', 'まず C・G・D・A・E——毎回 5 度上へ。次に C D E G A。同じ音の組？', 'Hear C, G, D, A, E — each a fifth higher; then C D E G A. Same set of notes?'),
        play: [{ label: t('连续五度', '5 度の連なり', 'Chain of fifths'), audio: { notes: [48, 55, 62, 69, 76], mode: 'melody' } }, { label: 'C D E G A', audio: { notes: [60, 62, 64, 67, 69, 72], mode: 'melody' } }],
        options: [t('同一组音：五声可以用五度来解释', '同じ組：ペンタトニックは 5 度で説明できる', 'The same set: the pentatonic can be explained by fifths'), t('不同的音', '違う音', 'Different notes'), t('只有三个音相同', '3 音だけ同じ', 'Only three notes in common')],
        answer: 0,
        insight: {
          title: t('五个音、没有半音', '5 音、半音なし', 'Five notes, no half steps'),
          text: t('五声音阶是自然音阶的子集，只有五个音，相邻音之间没有半音，可以用连续的五度来解释。中国五声的五个音叫宫、商、角、徵、羽；以 C 为宫就是 C D E G A。', 'ペンタトニックは全音階の部分集合で、5 音だけ、隣り合う音の間に半音がなく、連続する 5 度で説明できる。中国の五声は宮・商・角・徵・羽。C を宮とすると C D E G A。', 'The pentatonic is a subset of the diatonic collection with only five notes and no half steps between neighbours, explainable as a chain of fifths. The five Chinese notes are gong, shang, jue, zhi, yu; with C as gong: C D E G A.'),
        },
      },
    ],
    explain: [
      {
        id: 'b16-e1', type: 'page', ref: 'omt2e-pentatonic-harmony',
        title: t('五种转位，两种最常用', '5 つの転回、よく使う 2 つ', 'Five rotations, two favourites'),
        text: [
          t('五声音阶有五种转位（从五个音分别开始），而且五种互不相同。流行音乐里最常用的是两种："大调五声"和"小调五声"。', 'ペンタトニックには 5 つの転回（5 音それぞれから始める）があり、すべて互いに違う。ポピュラー音楽でよく使うのは「長調ペンタトニック」と「短調ペンタトニック」。', 'The pentatonic has five rotations (starting on each of its notes), all different. Pop music mostly uses two: “major pentatonic” and “minor pentatonic”.'),
          t('它和布鲁斯音阶、自然音阶都有关系：是它们共同的子集，特点是只有五个音、没有半音。', 'ブルース・スケールとも全音階とも関係があり、その共通の部分集合。特徴は 5 音だけで半音がないこと。', 'It relates to both the blues scale and the diatonic scale — a subset of each — and is distinctive for having only five notes and no half steps.'),
        ],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }], notes: ['C4', 'D4', 'E4', 'G4', 'A4'].map(nn), cols: 5 },
      },
      {
        id: 'b16-e2', type: 'discover', practice: true, ref: 'omt2e-pentatonic-harmony',
        prompt: t('摇滚里常把五声音阶的音当作和弦的根音，和弦可以是大三、小三或强力和弦。这样一来，会发生什么？', 'ロックではペンタトニックの音を和音の根音にし、長三・短三・パワーコードなど何でも使う。すると何が起きる？', 'Rock often uses the pentatonic notes as chord roots — major, minor or power chords. What follows?'),
        options: [t('同一个音级会以两种形式出现（例如 mi 和 me）', '同じ音度が 2 つの形で現れる（mi と me など）', 'The same scale degree appears in two forms (e.g. mi and me)'), t('所有和弦都只能用五声里的音', 'すべての和音がペンタトニックの音だけになる', 'Every chord stays inside the pentatonic'), t('只能用强力和弦', 'パワーコードしか使えない', 'Only power chords are possible')],
        answer: 0,
        insight: { title: t('"音级冲突"', '「音度の衝突」', '“Scale-degree conflict”'), text: t('和弦性质不受五声限制，所以合起来的音往往不只是五声音阶里的音，同一个音级的两种形式（如 mi 与 me）可能一起出现。', '和音の性質はペンタトニックに縛られないので、合わせた音はペンタトニックだけにならず、同じ音度の 2 形（mi と me）が並ぶこともある。', 'Chord qualities are not limited by the pentatonic, so the total pitch collection often goes beyond it, and two forms of one degree (mi and me) can both appear.') },
      },
    ],
    experiment: [
      { id: 'b16-x1', type: 'experiment', toy: 'scale', ref: ['omt2e-pentatonic-harmony', 'sccm-ethnic-modes'],
        prompt: t('换主音、换五种转位，听每种的颜色。注意：不管从哪里开始，都找不到半音。', '主音と 5 つの転回を切り替えて、それぞれの色を聴こう。どこから始めても半音は見つからない。', 'Change the tonic and the rotation and hear each colour. Notice: wherever you start, there is no half step.'),
        params: { sets: PENTA },
        breakthrough: { id: 'b16-rot', text: t('你听过了五声的五种颜色。', 'ペンタトニックの 5 つの色を聴いた。', 'You have heard all five colours of the pentatonic.') } },
    ],
    challenge: [
      {
        id: 'b16-c1', type: 'choice', error: 'scale-pattern', skills: ['spell'], ref: ['omt2e-pentatonic-harmony', 'sccm-ethnic-modes'],
        variants: [
          { prompt: t('以 G 为宫的五声音阶是？', 'G を宮とするペンタトニックは？', 'The pentatonic with G as gong is…'), options: ['G A B D E', 'G A B C D', 'G B♭ C D F', 'G A C D F'] },
          { prompt: t('以 F 为宫的五声音阶是？', 'F を宮とするペンタトニックは？', 'The pentatonic with F as gong is…'), options: ['F G A C D', 'F G A B♭ C', 'F A♭ B♭ C E♭', 'F G B♭ C E♭'] },
          { prompt: t('以 D 为宫的五声音阶是？', 'D を宮とするペンタトニックは？', 'The pentatonic with D as gong is…'), options: ['D E F♯ A B', 'D E F A B', 'D F G A C', 'D E G A C'] },
        ],
        answer: 0,
        explain: t('宫商角徵羽 = 大调的第 1、2、3、5、6 级（以 C 为宫是 C D E G A），没有第 4、7 级，所以没有半音。', '宮商角徵羽 = 長調の第 1・2・3・5・6 音（C が宮なら C D E G A）。第 4・7 音がないので半音がない。', 'Gong–shang–jue–zhi–yu are degrees 1, 2, 3, 5, 6 of major (C D E G A on C); without 4 and 7 there are no half steps.'),
      },
      {
        id: 'b16-c2', type: 'choice', error: 'concept', skills: ['identify'], ref: 'omt2e-pentatonic-harmony',
        variants: [
          { prompt: t('五声音阶有几种转位？它们互相一样吗？', 'ペンタトニックの転回はいくつ？ 互いに同じ？', 'How many rotations does the pentatonic have, and are any alike?'), options: [t('五种，互不相同', '5 つ、すべて違う', 'Five, all different'), t('五种，其中两种相同', '5 つ、2 つは同じ', 'Five, two alike'), t('七种', '7 つ', 'Seven'), t('两种', '2 つ', 'Two')] },
          { prompt: t('下面哪一点是五声音阶的特点？', 'ペンタトニックの特徴は？', 'Which describes the pentatonic?'), options: [t('五个音，相邻音之间没有半音', '5 音、隣り合う音に半音なし', 'Five notes, no half steps between neighbours'), t('五个音，有两个半音', '5 音、半音が 2 つ', 'Five notes, two half steps'), t('六个音，全是全音', '6 音、すべて全音', 'Six notes, all whole steps'), t('七个音，有两个半音', '7 音、半音 2 つ', 'Seven notes, two half steps')] },
        ],
        answer: 0,
        explain: t('五个音的五种转位互不相同；五声是自然音阶的子集，没有半音。', '5 音の 5 つの転回はすべて違う。全音階の部分集合で半音がない。', 'Its five rotations all differ; it is a subset of the diatonic with no half steps.'),
      },
      {
        id: 'b16-c3', type: 'choice', error: 'scale-pattern', skills: ['calc'], ref: 'omt2e-pentatonic-harmony',
        variants: [
          { prompt: t('从 A 开始连续往上四个五度：A、E、?、?、?', 'A から 5 度を 4 つ上へ：A・E・?・?・?', 'Four fifths up from A: A, E, ?, ?, ?'), options: ['B、F♯、C♯', 'B、F、C', 'B♭、F、C', 'D、G、C'] },
          { prompt: t('从 F 开始连续往上四个五度：F、C、?、?、?', 'F から 5 度を 4 つ上へ：F・C・?・?・?', 'Four fifths up from F: F, C, ?, ?, ?'), options: ['G、D、A', 'G、D♭、A♭', 'B♭、E♭、A♭', 'G、D、B♭'] },
        ],
        answer: 0,
        explain: t('五度 = 七个半音：A–E–B–F♯–C♯ 排成音阶就是 A B C♯ E F♯（A 大调五声）。', '5 度 = 半音 7 つ：A–E–B–F♯–C♯ を並べると A B C♯ E F♯（イ長調ペンタトニック）。', 'A fifth is seven half steps: A–E–B–F♯–C♯ arranged as a scale is A B C♯ E F♯ (A major pentatonic).'),
        breakthrough: { id: 'b16-fifths', text: t('你用五度自己搭出了一个五声音阶。', '5 度を積んで自分でペンタトニックを作った。', 'You built a pentatonic scale out of fifths yourself.') },
      },
      G('b16-g1', 'circleStep', 2, ['calc']),
      G('b16-g2', 'majorDegree', 1, ['function']),
    ],
  },
  pool: [G('b16-p1', 'circleStep', 3, ['calc']), G('b16-p2', 'majorDegree', 3, ['function', 'identify']), G('b16-p3', 'halfWhole', 2, ['spell'])],
};

// ===================== B1-7 织体与声部独立 =====================
// 织体玩具用的小旋律（本课自编的示例材料）
const MELODY = [[0, 72], [1, 74], [2, 76], [3, 72], [4, 76], [5, 77], [6, 79]];
const TEXTURE = {
  bpm: 100, cycle: 8,
  layers: [
    { id: 'melody', label: t('旋律', '旋律', 'Melody'), notes: MELODY },
    { id: 'variant', label: t('同一旋律的变体', '同じ旋律の変奏', 'Variant of the melody'), notes: [[0, 72], [0.5, 71], [1, 74], [2, 76], [2.5, 74], [3, 72], [4, 76], [5, 77], [5.5, 76], [6, 79]] },
    { id: 'chords', label: t('同节奏的和声', '同じリズムの和声', 'Chords in the same rhythm'), notes: [[0, 60], [0, 64], [1, 59], [1, 65], [2, 60], [2, 67], [3, 57], [3, 64], [4, 60], [4, 67], [5, 57], [5, 65], [6, 55], [6, 64]] },
    { id: 'canon', label: t('晚两拍进来的同一旋律', '2 拍遅れて入る同じ旋律', 'The melody entering two beats later'), notes: MELODY.map(([b, m]) => [b + 2, m - 12]).filter(([b]) => b < 8) },
  ],
  presets: [
    { label: t('单声部', 'モノフォニー', 'Monophony'), layers: ['melody'], explain: t('只有一条没有伴奏的旋律。', '伴奏のない旋律 1 本だけ。', 'A single unaccompanied line.') },
    { label: t('支声', 'ヘテロフォニー', 'Heterophony'), layers: ['melody', 'variant'], explain: t('同一条旋律的几种变体同时进行。', '同じ旋律のいくつかの変奏が同時に進む。', 'Variants of one melody heard at once.') },
    { label: t('主调', 'ホモフォニー', 'Homophony'), layers: ['melody', 'chords'], explain: t('几个声部节奏一致，一起换和声。', '複数の声部が同じリズムで一緒に和声を変える。', 'Voices move together in the same rhythm, changing harmony together.') },
    { label: t('复调', 'ポリフォニー', 'Polyphony'), layers: ['melody', 'canon'], explain: t('几条各自独立的旋律，节奏也不一样。', '独立した旋律が何本も、リズムもそれぞれ。', 'Independent lines with their own rhythms.') },
  ],
};
export const LEVEL_B1_7 = {
  minutes: 12,
  insight: t('同一条旋律，换一种组合方式就是另一种织体：织体看的是声部之间怎么配合。', '同じ旋律でも組み合わせ方が変われば別のテクスチュア：見るのは声部どうしの関わり方。', 'The same melody becomes a different texture when combined differently: texture is about how the voices interact.'),
  sections: {
    discover: [
      {
        id: 'b17-d1', type: 'discover', ref: 'omt2e-texture',
        prompt: t('同一条小旋律，听两种配法：A 下面是一样节奏的和弦；B 是同一旋律晚两拍、低八度再进来一次。哪一种让你同时听到"两条旋律"？', '同じ小さな旋律を 2 通りで：A は下に同じリズムの和音、B は同じ旋律が 2 拍遅れて 1 オクターヴ下から。「2 本の旋律」が同時に聞こえるのは？', 'One little melody, two settings: A adds chords in the same rhythm underneath; B brings the same melody in again two beats later, an octave lower. Which lets you hear “two melodies” at once?'),
        play: [
          { label: 'A', audio: { rhythm: { bpm: 100, cycle: 8, repeats: 1, tracks: [TEXTURE.layers[0], TEXTURE.layers[2]].map((l) => ({ beats: l.notes.map((n) => n[0]), midis: l.notes.map((n) => n[1]) })) } } },
          { label: 'B', audio: { rhythm: { bpm: 100, cycle: 8, repeats: 1, tracks: [TEXTURE.layers[0], TEXTURE.layers[3]].map((l) => ({ beats: l.notes.map((n) => n[0]), midis: l.notes.map((n) => n[1]) })) } } },
        ],
        options: [t('B（复调）；A 是主调', 'B（ポリフォニー）。A はホモフォニー', 'B (polyphony); A is homophony'), t('A', 'A', 'A'), t('两种都一样', 'どちらも同じ', 'Both the same')],
        answer: 0,
        insight: {
          title: t('织体 = 声部之间的关系', 'テクスチュア = 声部どうしの関係', 'Texture is the relationship between voices'),
          text: t('织体说的是各声部的密度和相互关系：单声部（一条无伴奏旋律）、支声（同一旋律的几种变体同时进行）、主调（声部节奏一致、一起换和声）、复调（几条节奏各异的独立旋律）。大多数音乐会在几种织体之间转换。', 'テクスチュアは声部の密度と関わり方：モノフォニー（伴奏なしの旋律 1 本）、ヘテロフォニー（同じ旋律の変奏が同時に）、ホモフォニー（同じリズムで一緒に和声を変える）、ポリフォニー（リズムの違う独立した旋律）。多くの音楽はその間を行き来する。', 'Texture is the density and interaction of voices: monophony (one unaccompanied line), heterophony (variants of one melody at once), homophony (voices moving together in rhythm, changing harmony together), polyphony (independent lines with separate rhythms). Most music moves between them.'),
        },
      },
    ],
    explain: [
      {
        id: 'b17-e1', type: 'page', ref: 'omt2e-texture',
        title: t('四种织体', '4 つのテクスチュア', 'Four textures'),
        text: [
          t('单声部：一条没有伴奏的旋律，所有人齐奏或齐唱——最简单、也最"裸露"的织体。支声：几个声部奏同一条旋律的不同版本，可以是小装饰，也可以是较长的经过句。', 'モノフォニー：伴奏のない旋律 1 本、全員がユニゾン——最も単純で「むき出し」のテクスチュア。ヘテロフォニー：複数の声部が同じ旋律の違う版を奏で、小さな装飾から長いパッセージまで。', 'Monophony: one unaccompanied line, everyone in unison — the simplest, most exposed texture. Heterophony: several voices play versions of one melody, from small embellishments to longer runs.'),
          t('主调：几个声部节奏一致地一起移动、一起换和声。复调：几条各自独立的旋律，各有自己的节奏。', 'ホモフォニー：声部が同じリズムで一緒に動き、一緒に和声を変える。ポリフォニー：独立した旋律が何本も、それぞれのリズムで。', 'Homophony: voices move together at the same pace, changing harmony together. Polyphony: independent lines, each with its own rhythm.'),
        ],
      },
      {
        id: 'b17-e2', type: 'page', ref: 'omt-species1',
        title: t('怎样让两条线"各走各的"', '2 本の線を「別々に」歩かせるには', 'Keeping two lines independent'),
        text: [
          t('对位里有一条经验：反向进行最能保持声部独立；两个声部接连构成同样大小的纯音程（平行五度、八度）会让它们融成一条。复调写作里的许多规则，保护的正是这种独立。', '対位法の経験則：反行は声部の独立を最もよく保ち、同じ完全音程の連続（平行 5・8 度）は 2 本を 1 本に溶かす。ポリフォニーの規則の多くはこの独立を守るため。', 'A rule of thumb from counterpoint: contrary motion best preserves independence, while consecutive perfect intervals of the same size (parallel fifths and octaves) fuse two lines into one. Many polyphonic rules protect that independence.'),
        ],
      },
    ],
    experiment: [
      { id: 'b17-x1', type: 'experiment', toy: 'texture', ref: 'omt2e-texture',
        prompt: t('点上面的四种织体，或者自己打开、关掉每一层，听同一条旋律怎样变成不同的织体。', '上の 4 つのテクスチュアを押すか、各層をオン・オフして、同じ旋律が違うテクスチュアになるのを聴こう。', 'Tap the four textures, or switch layers on and off yourself, and hear one melody turn into different textures.'),
        params: TEXTURE,
        breakthrough: { id: 'b17-layers', text: t('你用同一条旋律搭出了四种织体。', '同じ旋律で 4 つのテクスチュアを作った。', 'You built four textures from one melody.') } },
    ],
    challenge: [
      {
        id: 'b17-c1', type: 'choice', error: 'texture-type', skills: ['identify'], ref: 'omt2e-texture',
        variants: [
          { prompt: t('几个乐器同时奏同一条旋律，但各自加了不同的装饰。这是什么织体？', '複数の楽器が同じ旋律を同時に、でもそれぞれ違う装飾をつけて。何のテクスチュア？', 'Several instruments play one melody at once, each with its own embellishments. Which texture?'), options: [t('支声', 'ヘテロフォニー', 'Heterophony'), t('复调', 'ポリフォニー', 'Polyphony'), t('主调', 'ホモフォニー', 'Homophony'), t('单声部', 'モノフォニー', 'Monophony')] },
          { prompt: t('一位大提琴手独奏一首没有伴奏的前奏曲。这是什么织体？', 'チェリストが伴奏なしの前奏曲を独奏。何のテクスチュア？', 'A cellist plays an unaccompanied prelude alone. Which texture?'), options: [t('单声部', 'モノフォニー', 'Monophony'), t('支声', 'ヘテロフォニー', 'Heterophony'), t('主调', 'ホモフォニー', 'Homophony'), t('复调', 'ポリフォニー', 'Polyphony')] },
          { prompt: t('合唱四个声部节奏一致，一起唱出一连串和弦。这是什么织体？', '合唱の 4 声部が同じリズムで一連の和音を歌う。何のテクスチュア？', 'A choir’s four parts sing a series of chords in the same rhythm. Which texture?'), options: [t('主调', 'ホモフォニー', 'Homophony'), t('复调', 'ポリフォニー', 'Polyphony'), t('支声', 'ヘテロフォニー', 'Heterophony'), t('单声部', 'モノフォニー', 'Monophony')] },
        ],
        answer: 0,
        explain: t('看声部之间的关系：同一旋律的变体 = 支声；一条无伴奏旋律 = 单声部；节奏一致的和声 = 主调；节奏各异的独立旋律 = 复调。', '声部の関係を見る：同じ旋律の変奏 = ヘテロフォニー、伴奏なしの旋律 1 本 = モノフォニー、同じリズムの和声 = ホモフォニー、リズムの違う独立した旋律 = ポリフォニー。', 'Look at the relationship: variants of one melody = heterophony; one unaccompanied line = monophony; chords in one rhythm = homophony; independent lines with different rhythms = polyphony.'),
      },
      {
        id: 'b17-c2', type: 'listen', error: 'texture-type', skills: ['hearing'], ref: 'omt2e-texture',
        prompt: t('听：这是什么织体？', '聴いて：何のテクスチュア？', 'Listen: which texture?'),
        options: [t('主调', 'ホモフォニー', 'Homophony'), t('复调', 'ポリフォニー', 'Polyphony'), t('单声部', 'モノフォニー', 'Monophony'), t('支声', 'ヘテロフォニー', 'Heterophony')],
        variants: [
          { play: [{ label: t('播放', '再生', 'Play'), audio: { rhythm: { bpm: 100, cycle: 8, repeats: 1, tracks: [TEXTURE.layers[0], TEXTURE.layers[2]].map((l) => ({ beats: l.notes.map((n) => n[0]), midis: l.notes.map((n) => n[1]) })) } } }], answer: 0 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: { rhythm: { bpm: 100, cycle: 8, repeats: 1, tracks: [TEXTURE.layers[0], TEXTURE.layers[3]].map((l) => ({ beats: l.notes.map((n) => n[0]), midis: l.notes.map((n) => n[1]) })) } } }], answer: 1 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: { rhythm: { bpm: 100, cycle: 8, repeats: 1, tracks: [TEXTURE.layers[0]].map((l) => ({ beats: l.notes.map((n) => n[0]), midis: l.notes.map((n) => n[1]) })) } } }], answer: 2 },
        ],
        explain: t('和弦和旋律同时换 = 主调；第二条旋律错开进来、节奏不同 = 复调；只有一条旋律 = 单声部。', '和音と旋律が一緒に変わる = ホモフォニー、2 本目の旋律がずれて入り、リズムが違う = ポリフォニー、旋律 1 本だけ = モノフォニー。', 'Chords changing with the melody = homophony; a second line entering offset with its own rhythm = polyphony; one line only = monophony.'),
      },
      {
        id: 'b17-c3', type: 'choice', error: 'concept', skills: ['voiceLeading'], ref: 'omt-species1',
        variants: [
          { prompt: t('想让两条旋律听起来更独立，最好多用哪种进行？', '2 本の旋律をより独立させたい。どの進行を多く使う？', 'To make two lines sound more independent, which motion should you favour?'), options: [t('反向进行', '反行', 'Contrary motion'), t('平行五度', '平行 5 度', 'Parallel fifths'), t('平行八度', '平行 8 度', 'Parallel octaves'), t('一直齐奏', 'ずっとユニゾン', 'Constant unison')] },
          { prompt: t('哪种写法最容易让两条线"融成一条"？', '2 本の線を「1 本に溶かし」やすい書き方は？', 'Which most easily fuses two lines into one?'), options: [t('接连的平行五度或八度', '連続する平行 5・8 度', 'Consecutive parallel fifths or octaves'), t('反向进行', '反行', 'Contrary motion'), t('斜向进行', '斜行', 'Oblique motion'), t('交替的三度和六度', '3 度と 6 度の交替', 'Alternating thirds and sixths')] },
        ],
        answer: 0,
        explain: t('反向进行最能保持独立；同样大小的纯音程接连出现会让融合压过独立。', '反行が独立を最もよく保ち、同じ完全音程の連続は融合を強める。', 'Contrary motion preserves independence best; consecutive perfect intervals of the same size let fusion win.'),
      },
      G('b17-g1', 'motion', 3, ['voiceLeading']),
    ],
  },
  pool: [G('b17-p1', 'motion', 3, ['voiceLeading', 'identify']), G('b17-p2', 'consonance', 3, ['identify'])],
};

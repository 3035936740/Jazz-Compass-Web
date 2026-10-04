// Side-B 第 4 章（节奏与爵士）的节奏关卡内容。节点格式见 sideb_ui.js / SIDE_B_DESIGN.md §3–4。
// 出处：
//   复节奏：两种以上不容易听成彼此派生、或同一拍子简单表现的节奏同时进行；贝多芬 Op. 18 No. 6 谐谑曲的 2 对 3 hemiola
//     "想让我们相信其实是 6/8"；"Carol of the Bells"的四音固定音型就是 2 对 3 hemiola 的复合节奏；莫扎特《唐璜》里两个乐队
//     同时演奏 3/4 和 2/4；"是复节奏不是复拍子"：3/4 + 6/8 的错觉仍在同一个拍子层级里：ref:wiki-polyrhythm
//   不对称拍子（5/8 的 3+2 或 2+3、13/8 的 3+3+3+2+2）、变拍子（没有规则限制，可以每小节都换，也可以在单、复拍子之间换）、
//   复拍子（两个以上拍子同时进行，例：巴托克《收获之歌》）、节拍调制（用旧速度里的细分或拍组去对上新速度里的时值，让速度变化
//   平滑；写成"音符 = 音符"；保持细分不变或保持拍子不变）：ref:omt2e-20c-rhythm
//   新速度 / 旧速度 = 新小节里的枢纽时值个数 / 旧小节里的个数；例：♩ = 84 时两个二分音符 = 三个二分音符 → ♩ = 126
//   （Carter《八首练习曲与一首幻想曲》）：ref:wiki-metric-modulation
//   复节奏工具与节拍调制工具用同一套公式：poly_meter.js
const t = (zh, ja, en) => ({ zh, ja, en });

/** a:b 复节奏的两条轨（一个循环 cycle 拍） */
const poly = (a, b, cycle, bpm, repeats = 2) => ({
  rhythm: { bpm, cycle, repeats, tracks: [{ beats: Array.from({ length: a }, (_, k) => (k * cycle) / a), midi: 79 }, { beats: Array.from({ length: b }, (_, k) => (k * cycle) / b), midi: 67 }] },
});
/** 不对称拍子：groups 例如 [3, 2]；每组第一个八分音符是重音 */
const grouped = (groups, bpm = 260, repeats = 3) => {
  const accents = []; const others = []; let at = 0;
  groups.forEach((g) => { accents.push(at); for (let k = 1; k < g; k += 1) others.push(at + k); at += g; });
  return { rhythm: { bpm, cycle: at, repeats, tracks: [{ beats: accents, midi: 81 }, { beats: others, midi: 69 }] } };
};
/** a:b 的复合节奏一共几个起音（格数 = 最小公倍数） */
const compositeCount = (a, b) => { const n = a * b; return new Set([...Array.from({ length: a }, (_, k) => (k * n) / a), ...Array.from({ length: b }, (_, k) => (k * n) / b)]).size; };

export const LEVEL_B4_10 = {
  minutes: 19,
  insight: t('3 对 2 合起来，是一个你早就听过的固定节奏。', '3 対 2 を合わせると、もう聴いたことのあるリズムになる。', 'Put 3 against 2 together and you get a rhythm you already know.'),
  sections: {
    discover: [
      {
        id: 'b410-d1', type: 'discover', ref: 'wiki-polyrhythm',
        prompt: t('先听 3 对 2：高音每个循环敲三下，低音敲两下。再听"Carol of the Bells"开头那四个音。这两段的节奏是什么关系？', 'まず 3 対 2：高い音は 1 周期に 3 回、低い音は 2 回。次に「キャロル・オブ・ザ・ベル」冒頭の 4 音。2 つのリズムの関係は？', 'First hear 3 against 2: the high sound plays three times per cycle, the low one twice. Then hear the four-note opening of “Carol of the Bells”. How are the two rhythms related?'),
        play: [
          { label: t('3 对 2', '3 対 2', '3 against 2'), audio: poly(3, 2, 3, 100) },
          { label: t('四音固定音型', '4 音のオスティナート', 'Four-note ostinato'), audio: { rhythm: { bpm: 100, cycle: 3, repeats: 2, tracks: [{ beats: [0, 1, 1.5, 2], midis: [70, 69, 70, 67] }] } } },
        ],
        options: [t('完全一样：四音音型就是两条线合起来的节奏', '同じ：4 音の型は 2 本の線を合わせたリズム', 'The same: the ostinato is the two lines combined'), t('毫无关系', 'まったく関係ない', 'Unrelated'), t('四音音型只和"三下"那条线一样', '「3 回」の線とだけ同じ', 'It matches only the three-beat line'), t('四音音型快了一倍', '4 音の型は 2 倍速い', 'The ostinato is twice as fast')],
        answer: 0,
        insight: {
          title: t('复节奏的"合成节奏"', 'ポリリズムの「合成リズム」', 'The composite rhythm'),
          text: t('把一个循环平均切成 6 格：三下落在第 1、3、5 格，两下落在第 1、4 格。合起来就是第 1、3、4、5 格——"长、短、短、长"。"Carol of the Bells"的四音固定音型正是 2 对 3 hemiola 的复合节奏。知道 3:2 是一回事；能听出、打出、写出它的合成节奏，才是会了。',
            '1 周期を 6 マスに分けると、3 回は 1・3・5 マス目、2 回は 1・4 マス目。合わせて 1・3・4・5——「長・短・短・長」。「キャロル・オブ・ザ・ベル」の 4 音オスティナートはまさに 2 対 3 のヘミオラの合成リズム。3:2 を知っているのと、その合成リズムを聴いて・叩いて・書けるのは別のこと。',
            'Cut one cycle into 6 cells: the threes land on cells 1, 3, 5 and the twos on 1 and 4. Together: 1, 3, 4, 5 — long, short, short, long. The four-note ostinato of “Carol of the Bells” is exactly the composite of a 2-against-3 hemiola. Knowing “3:2” is one thing; hearing, tapping and writing its composite is knowing it.'),
        },
      },
    ],
    explain: [
      {
        id: 'b410-e1', type: 'page', ref: 'wiki-polyrhythm',
        title: t('什么是复节奏', 'ポリリズムとは', 'What polyrhythm is'),
        text: [
          t('复节奏：两种以上的节奏同时进行，而且它们不容易被听成彼此派生、或者同一个拍子的简单表现。', 'ポリリズム：2 つ以上のリズムが同時に進み、互いの派生や同じ拍子の単純な表れとは聞こえにくいもの。', 'Polyrhythm: two or more rhythms at once that are not readily heard as derived from one another or as simple forms of the same meter.'),
          t('Hemiola 是最常见的 2 对 3：贝多芬弦乐四重奏 Op. 18 No. 6 的谐谑曲写在 3/4，但一个持续的交错节奏"想让我们相信其实是 6/8"。', 'ヘミオラは最もよくある 2 対 3：ベートーヴェン弦楽四重奏 Op. 18 No. 6 のスケルツォは 3/4 だが、続く交差リズムが「本当は 6/8 だと思わせようとする」。', 'Hemiola is the classic 2 against 3: the Scherzo of Beethoven’s String Quartet Op. 18 No. 6 is in 3/4, yet a persistent cross-rhythm “does its best to persuade us that it is really in 6/8”.'),
        ],
        visual: { kind: 'grid', rows: [[1, 0, 1, 0, 1, 0], [1, 0, 0, 1, 0, 0]], labels: ['3', '2'] },
      },
      {
        id: 'b410-e2', type: 'demo', ref: 'wiki-polyrhythm',
        title: t('一步一步数出 3:2', '3:2 を 1 歩ずつ数える', 'Counting 3:2 step by step'),
        steps: [
          { text: t('三和二的最小公倍数是 6：把一个循环切成 6 格。', '3 と 2 の最小公倍数は 6：1 周期を 6 マスに。', 'The lowest common multiple of 3 and 2 is 6: cut the cycle into 6 cells.'), visual: { kind: 'grid', rows: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]], labels: ['3', '2'] } },
          { text: t('"三下"每 2 格一下：第 1、3、5 格。', '「3 回」は 2 マスごと：1・3・5 マス目。', 'The threes come every 2 cells: 1, 3, 5.'), visual: { kind: 'grid', rows: [[1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0]], labels: ['3', '2'] }, audio: { rhythm: { bpm: 100, cycle: 3, repeats: 2, tracks: [{ beats: [0, 1, 2], midi: 79 }] } } },
          { text: t('"两下"每 3 格一下：第 1、4 格。', '「2 回」は 3 マスごと：1・4 マス目。', 'The twos come every 3 cells: 1 and 4.'), visual: { kind: 'grid', rows: [[1, 0, 1, 0, 1, 0], [1, 0, 0, 1, 0, 0]], labels: ['3', '2'] }, audio: poly(3, 2, 3, 100) },
          { text: t('合起来：第 1、3、4、5 格。念出来就是"1、2 和 3"——打的时候先找这个合成节奏，两只手就不打架了。', '合わせて 1・3・4・5 マス目。リズムに乗せて口で言ってから叩くと、両手がぶつからない。', 'Together: cells 1, 3, 4, 5. Say the composite first, then tap — the two hands stop fighting.'), visual: { kind: 'grid', rows: [[1, 0, 1, 0, 1, 0], [1, 0, 0, 1, 0, 0], [1, 0, 1, 1, 1, 0]], labels: ['3', '2', '3+2'] }, audio: { rhythm: { bpm: 100, cycle: 3, repeats: 2, tracks: [{ beats: [0, 1, 1.5, 2], midi: 74 }] } } },
        ],
      },
      {
        id: 'b410-e3', type: 'discover', practice: true, ref: ['wiki-polyrhythm', 'omt2e-20c-rhythm'],
        prompt: t('莫扎特《唐璜》的舞会场景：两个乐队同时演奏，一个 3/4、一个 2/4。这叫什么？', 'モーツァルト《ドン・ジョヴァンニ》の舞踏会：2 つの楽団が同時に、片方 3/4、片方 2/4。これは？', 'The ball scene in Mozart’s Don Giovanni: two bands play at once, one in 3/4 and one in 2/4. What is this?'),
        options: [t('复拍子（polymeter）', 'ポリメーター', 'Polymeter'), t('变拍子', '変拍子', 'Changing meter'), t('节拍调制', 'メトリック・モジュレーション', 'Metric modulation')],
        answer: 0,
        insight: { title: t('两个拍子同时存在', '2 つの拍子が同時に', 'Two meters at once'), text: t('复拍子是两个以上的拍子同时进行（可以明写，也可以只是暗示）。而 hemiola 那种"3/4 里听出 6/8"的感觉，仍然在同一个拍子层级里，所以叫复节奏而不是复拍子。', 'ポリメーターは 2 つ以上の拍子が同時に進むこと（明記も暗示もある）。一方ヘミオラの「3/4 の中に 6/8」は同じ拍子の階層の中なので、ポリメーターではなくポリリズム。', 'Polymeter is two or more meters at once (written or implied). Hemiola’s “6/8 inside 3/4” stays within one metric hierarchy, so it is polyrhythm, not polymeter.') },
      },
      {
        id: 'b410-e4', type: 'page', ref: 'omt2e-20c-rhythm',
        title: t('不对称拍子与变拍子', '不均等な拍子と変拍子', 'Asymmetrical and changing meters'),
        text: [
          t('不对称拍子的小节被分成不相等的拍组：5/8 可以是 3+2（一长一短），也可以是 2+3（一短一长）；13/8 可以分成 3+3+3+2+2。', '不均等な拍子は小節を等しくない拍のまとまりに分ける：5/8 は 3+2（長・短）にも 2+3（短・長）にもなる。13/8 は 3+3+3+2+2 にも。', 'Asymmetrical meters split the bar into unequal groups: 5/8 can be 3+2 (long–short) or 2+3 (short–long); 13/8 can be 3+3+3+2+2.'),
          t('变拍子：任何拍号的变化，没有规则限制，可以每小节都换，也可以在单拍子和复拍子之间换。', '変拍子：拍子の変化すべて。規則はなく、小節ごとに変えても、単純拍子と複合拍子の間で変えてもよい。', 'Changing meter: any change of meter — no rules; it can change every bar, even between simple and compound.'),
        ],
        visual: { kind: 'beats', groups: [3, 2] },
      },
      {
        id: 'b410-e5', type: 'discover', practice: true, ref: 'omt2e-20c-rhythm',
        prompt: t('听这段 5/8（重音在每组的第一个八分音符上）。它是怎么分组的？', 'この 5/8 を聴こう（各まとまりの最初の 8 分音符にアクセント）。まとまり方は？', 'Listen to this 5/8 (accent on the first eighth of each group). How is it grouped?'),
        play: [{ label: t('播放', '再生', 'Play'), audio: grouped([2, 3]) }],
        options: ['2+3', '3+2'],
        answer: 0,
        insight: { title: t('短—长', '短・長', 'Short–long'), text: t('先两个、再三个：一短一长。同样是 5/8，3+2 就是一长一短，听感完全不同。', '先に 2 つ、次に 3 つ：短・長。同じ 5/8 でも 3+2 なら長・短で、感じがまったく違う。', 'Two then three: short–long. The same 5/8 as 3+2 is long–short and feels completely different.') },
      },
      {
        id: 'b410-e6', type: 'page', ref: ['omt2e-20c-rhythm', 'wiki-metric-modulation'],
        title: t('节拍调制：用一个时值当"枢纽"', 'メトリック・モジュレーション：1 つの音価を「軸」に', 'Metric modulation: one note value as a pivot'),
        text: [
          t('节拍调制让突然的速度变化变得平滑：在旧速度里引入一种细分或拍组，让它正好等于新速度里的某个时值，写成"音符 = 音符"。听众往往事后才发觉速度变了。', 'メトリック・モジュレーションは急なテンポ変化を滑らかにする：旧テンポの中に細分や拍のまとまりを入れ、新テンポのある音価とちょうど等しくする。「音符 = 音符」と書く。聴き手は後から気づくことが多い。', 'Metric modulation smooths an abrupt tempo change: introduce a subdivision or beat group in the old tempo that equals a duration in the new one, written “note = note”. Listeners often notice only afterwards.'),
          t('两种常见做法：保持细分不变（八分音符一样快，拍子变了），或保持拍子不变（四分音符的拍变成附点四分音符的拍，细分变快了）。', 'よくある 2 つのやり方：細分を保つ（8 分音符の速さは同じで拍が変わる）、拍を保つ（4 分の拍が付点 4 分の拍になり、細分が速くなる）。', 'Two common ways: keep the subdivision (eighths stay the same, the beat changes), or keep the beat (the quarter beat becomes a dotted-quarter beat, so the subdivision speeds up).'),
          t('计算：新速度 ÷ 旧速度 = 新小节里枢纽时值的个数 ÷ 旧小节里的个数。', '計算：新テンポ ÷ 旧テンポ = 新しい小節の軸の音価の数 ÷ 旧い小節の数。', 'Calculation: new tempo ÷ old tempo = pivot values per new bar ÷ pivot values per old bar.'),
        ],
      },
      {
        id: 'b410-e7', type: 'demo', ref: 'wiki-metric-modulation',
        title: t('例：♩ = 84，两个二分音符 = 三个二分音符', '例：♩ = 84、2 分音符 2 つ = 2 分音符 3 つ', 'Example: ♩ = 84, two half notes = three half notes'),
        steps: [
          { text: t('旧速度 ♩ = 84。现在规定：旧小节里两个二分音符的时间，新小节里要放三个二分音符。', '旧テンポ ♩ = 84。旧い小節の 2 分音符 2 つの時間に、新しい小節では 2 分音符を 3 つ入れる。', 'Old tempo ♩ = 84. Now the time of two half notes in the old bar must hold three half notes in the new bar.'), audio: { rhythm: { bpm: 84, cycle: 4, repeats: 1, tracks: [{ beats: [0, 2], midi: 79 }, { beats: [0, 1, 2, 3], midi: 67 }] } } },
          { text: t('新速度 ÷ 84 = 3 ÷ 2，所以新速度 = 84 × 3 ÷ 2 = 126。', '新テンポ ÷ 84 = 3 ÷ 2、よって新テンポ = 84 × 3 ÷ 2 = 126。', 'New ÷ 84 = 3 ÷ 2, so the new tempo = 84 × 3 ÷ 2 = 126.'), audio: { rhythm: { bpm: 126, cycle: 6, repeats: 1, tracks: [{ beats: [0, 2, 4], midi: 79 }, { beats: [0, 1, 2, 3, 4, 5], midi: 67 }] } } },
          { text: t('换个角度：♩ = 126 正好等于附点四分音符 = 84——旧的四分音符变成了新的附点四分音符。（这是 Carter《八首练习曲与一首幻想曲》里的一处节拍调制。）', '別の見方：♩ = 126 は付点 4 分 = 84 と同じ——旧い 4 分音符が新しい付点 4 分音符になった（Carter《8 つの練習曲と幻想曲》の一例）。', 'Another view: ♩ = 126 equals dotted quarter = 84 — the old quarter has become the new dotted quarter. (From Carter’s Eight Etudes and a Fantasy.)') },
        ],
      },
    ],
    experiment: [
      {
        id: 'b410-x1', type: 'experiment', toy: 'poly', ref: 'wiki-polyrhythm',
        prompt: t('选一个比例，打开、关掉每一行，听它们在哪里重合；最下面一行是两行合起来的节奏。试试 4:3 合起来有几个起音。', '比を選び、各段をオン・オフして重なる所を聴こう。いちばん下は 2 段を合わせたリズム。4:3 を合わせると打点はいくつ？', 'Pick a ratio, switch each row on and off and hear where they meet; the bottom row is the two combined. How many attacks does 4:3 have together?'),
        params: { ratios: [[3, 2], [4, 3], [2, 3], [5, 4]], bpm: 90 },
      },
    ],
    challenge: [
      {
        id: 'b410-c1', type: 'tap', skills: ['hearing'], ref: 'wiki-polyrhythm', bpm: 60, cycle: 2, cycles: 2,
        variants: [
          { prompt: t('两只手打 3 对 2：右手（J 键或右边的按钮）每个循环三下，左手（F 键或左边的按钮）两下。先跟着预备拍听一遍，再打两个循环。', '両手で 3 対 2：右手（J キーか右のボタン）は 1 周期 3 回、左手（F キーか左のボタン）は 2 回。予備拍を聴いてから 2 周期叩こう。', 'Tap 3 against 2: right hand (J or the right pad) three per cycle, left hand (F or the left pad) two. Listen to the count-in, then tap two cycles.'), hands: { right: [0, 2 / 3, 4 / 3, 2, 8 / 3, 10 / 3], left: [0, 1, 2, 3] } },
          { prompt: t('两只手打 2 对 3：右手（J 键或右边的按钮）每个循环两下，左手（F 键或左边的按钮）三下。先跟着预备拍听一遍，再打两个循环。', '両手で 2 対 3：右手（J キーか右のボタン）は 1 周期 2 回、左手（F キーか左のボタン）は 3 回。予備拍を聴いてから 2 周期叩こう。', 'Tap 2 against 3: right hand (J or the right pad) two per cycle, left hand (F or the left pad) three. Listen to the count-in, then tap two cycles.'), hands: { right: [0, 1, 2, 3], left: [0, 2 / 3, 4 / 3, 2, 8 / 3, 10 / 3] } },
        ],
        breakthrough: { id: 'first-32-tap', text: t('你第一次真的用两只手打对了 3 对 2。', '初めて両手で 3 対 2 を正しく叩けた。', 'You really tapped 3 against 2 with two hands for the first time.') },
      },
      {
        id: 'b410-c2', type: 'derive', error: 'tempo-calculation', skills: ['calc'], ref: 'wiki-metric-modulation',
        variants: [
          { prompt: t('♩ = 84。旧小节里两个二分音符 = 新小节里三个二分音符。新的四分音符速度是多少？', '♩ = 84。旧い小節の 2 分音符 2 つ = 新しい小節の 2 分音符 3 つ。新しい 4 分音符のテンポは？', '♩ = 84. Two half notes in the old bar = three half notes in the new bar. What is the new quarter-note tempo?'), steps: [{ label: t('新 ÷ 旧 = ?（写成小数）', '新 ÷ 旧 = ?（小数で）', 'new ÷ old = ? (decimal)'), kind: 'number', answer: 1.5, tol: 0.01 }, { label: t('新速度 ♩ =', '新テンポ ♩ =', 'New tempo ♩ ='), kind: 'number', answer: 126, tol: 0.5 }] },
          { prompt: t('♩ = 80。旧小节里两个枢纽时值 = 新小节里三个。新速度是多少？', '♩ = 80。旧い小節の軸の音価 2 つ = 新しい小節の 3 つ。新テンポは？', '♩ = 80. Two pivot values in the old bar = three in the new bar. What is the new tempo?'), steps: [{ label: t('新 ÷ 旧 = ?（写成小数）', '新 ÷ 旧 = ?（小数で）', 'new ÷ old = ? (decimal)'), kind: 'number', answer: 1.5, tol: 0.01 }, { label: t('新速度 ♩ =', '新テンポ ♩ =', 'New tempo ♩ ='), kind: 'number', answer: 120, tol: 0.5 }] },
          { prompt: t('♩ = 90。旧小节里三个枢纽时值 = 新小节里两个。新速度是多少？', '♩ = 90。旧い小節の軸の音価 3 つ = 新しい小節の 2 つ。新テンポは？', '♩ = 90. Three pivot values in the old bar = two in the new bar. What is the new tempo?'), steps: [{ label: t('新 ÷ 旧 = ?（写成小数，保留两位）', '新 ÷ 旧 = ?（小数 2 桁）', 'new ÷ old = ? (two decimals)'), kind: 'number', answer: 2 / 3, tol: 0.01 }, { label: t('新速度 ♩ =', '新テンポ ♩ =', 'New tempo ♩ ='), kind: 'number', answer: 60, tol: 0.5 }] },
        ],
        explain: t('新速度 ÷ 旧速度 = 新小节里枢纽时值的个数 ÷ 旧小节里的个数。', '新テンポ ÷ 旧テンポ = 新しい小節の軸の数 ÷ 旧い小節の数。', 'New tempo ÷ old tempo = pivot values per new bar ÷ per old bar.'),
      },
      {
        id: 'b410-c3', type: 'choice', error: 'polymeter', skills: ['identify'], ref: ['wiki-polyrhythm', 'omt2e-20c-rhythm'],
        options: [t('复拍子（polymeter）', 'ポリメーター', 'Polymeter'), t('复节奏（polyrhythm）', 'ポリリズム', 'Polyrhythm'), t('变拍子', '変拍子', 'Changing meter'), t('节拍调制', 'メトリック・モジュレーション', 'Metric modulation')],
        variants: [
          { prompt: t('莫扎特《唐璜》：两个乐队同时演奏，一个 3/4、一个 2/4。', 'モーツァルト《ドン・ジョヴァンニ》：2 つの楽団が同時に 3/4 と 2/4。', 'Mozart, Don Giovanni: two bands at once, one in 3/4, one in 2/4.'), answer: 0 },
          { prompt: t('贝多芬 Op. 18 No. 6 谐谑曲：写在 3/4，一个持续的 2 对 3 交错节奏让人觉得是 6/8。', 'ベートーヴェン Op. 18 No. 6 のスケルツォ：3/4 だが、2 対 3 の交差リズムが 6/8 に聞こえさせる。', 'Beethoven, Op. 18 No. 6 Scherzo: in 3/4, but a persistent 2-against-3 cross-rhythm makes it feel like 6/8.'), answer: 1 },
          { prompt: t('巴托克《收获之歌》（两把小提琴）：从第 11 小节起，两个声部写着不同的拍号同时进行。', 'バルトーク《収穫の歌》（2 つのヴァイオリン）：11 小節目から 2 声が違う拍子記号で同時に進む。', 'Bartók, “Harvest Song” (two violins): from bar 11 the parts carry different time signatures at once.'), answer: 0 },
        ],
        explain: t('复拍子：两个以上的拍子同时进行；复节奏：同一个拍子层级里，几种不容易互相派生的节奏同时进行。', 'ポリメーター：2 つ以上の拍子が同時に。ポリリズム：同じ拍子の階層の中で、互いに派生しにくいリズムが同時に。', 'Polymeter: two or more meters at once; polyrhythm: rhythms not derivable from each other sounding together within one metric hierarchy.'),
      },
      {
        id: 'b410-c4', type: 'listen', error: 'meter-grouping', skills: ['hearing'], ref: 'omt2e-20c-rhythm',
        prompt: t('听这段 5/8（重音在每组的第一个八分音符上）。它是怎么分组的？', 'この 5/8 を聴こう（各まとまりの最初の 8 分音符にアクセント）。まとまり方は？', 'Listen to this 5/8 (accent on the first eighth of each group). How is it grouped?'),
        options: ['3+2', '2+3', '2+2+1', '5'],
        variants: [
          { play: [{ label: t('播放', '再生', 'Play'), audio: grouped([3, 2]) }], answer: 0 },
          { play: [{ label: t('播放', '再生', 'Play'), audio: grouped([2, 3]) }], answer: 1 },
        ],
        explain: t('数重音之间隔了几个八分音符：3+2 是一长一短，2+3 是一短一长。', 'アクセントの間の 8 分音符を数える：3+2 は長・短、2+3 は短・長。', 'Count the eighths between accents: 3+2 is long–short, 2+3 is short–long.'),
      },
      {
        id: 'b410-c5', type: 'choice', error: 'calc', skills: ['calc'], ref: 'wiki-polyrhythm',
        variants: [
          { prompt: t('4 对 3 的两条线合起来，一个循环里一共有几个起音？（同时落下的算一个）', '4 対 3 の 2 本を合わせると、1 周期の打点はいくつ？（同時は 1 つ）', 'Combine 4 against 3: how many attacks per cycle? (simultaneous ones count once)'), options: [String(compositeCount(4, 3)), '7', '12', '5'] },
          { prompt: t('3 对 2 的两条线合起来，一个循环里一共有几个起音？（同时落下的算一个）', '3 対 2 の 2 本を合わせると、1 周期の打点はいくつ？（同時は 1 つ）', 'Combine 3 against 2: how many attacks per cycle? (simultaneous ones count once)'), options: [String(compositeCount(3, 2)), '5', '6', '3'] },
          { prompt: t('5 对 4 的两条线合起来，一个循环里一共有几个起音？（同时落下的算一个）', '5 対 4 の 2 本を合わせると、1 周期の打点はいくつ？（同時は 1 つ）', 'Combine 5 against 4: how many attacks per cycle? (simultaneous ones count once)'), options: [String(compositeCount(5, 4)), '9', '20', '10'] },
        ],
        answer: 0,
        explain: t('格数取最小公倍数，分别标出两条线的起音，第一格两条线重合只算一个：a + b − 1。', 'マス数は最小公倍数。両方の打点を書き込み、1 マス目の重なりは 1 つ：a + b − 1。', 'Use the lowest common multiple as the grid, mark both lines; the shared first cell counts once: a + b − 1.'),
      },
      {
        id: 'b410-c6', type: 'choice', error: 'mm-type', skills: ['identify'], ref: 'omt2e-20c-rhythm',
        options: [t('保持细分不变', '細分を保つ', 'Keeping the subdivision'), t('保持拍子不变', '拍を保つ', 'Keeping the beat'), t('变拍子，不是节拍调制', '変拍子でありメトリック・モジュレーションではない', 'Changing meter, not metric modulation'), t('复拍子', 'ポリメーター', 'Polymeter')],
        variants: [
          { prompt: t('从 2/4 转到 6/8，标记是"八分音符 = 八分音符"。这是哪种节拍调制？', '2/4 から 6/8 へ、「8 分音符 = 8 分音符」。どのメトリック・モジュレーション？', 'From 2/4 to 6/8 marked “eighth = eighth”. Which kind of metric modulation?'), answer: 0 },
          { prompt: t('旧拍子的四分音符拍变成新拍子的附点四分音符拍，八分音符因此变快。这是哪种节拍调制？', '旧い 4 分の拍が新しい付点 4 分の拍になり、8 分音符が速くなる。どの種類？', 'The old quarter-note beat becomes the new dotted-quarter beat, so the eighths get faster. Which kind?'), answer: 1 },
        ],
        explain: t('看"等号"两边哪个时值不变：细分不变，拍子就变；拍子不变，细分就变。', '「=」の両側でどの音価が変わらないかを見る：細分が同じなら拍が変わり、拍が同じなら細分が変わる。', 'See which value stays fixed across the “=”: same subdivision → the beat changes; same beat → the subdivision changes.'),
      },
      {
        id: 'b410-c7', type: 'derive', error: 'tempo-calculation', skills: ['calc', 'apply'], ref: ['omt2e-20c-rhythm', 'wiki-metric-modulation'],
        variants: [
          { prompt: t('2/4、♩ = 96 转到 6/8，八分音符速度不变。新的附点四分音符速度是多少？', '2/4・♩ = 96 から 6/8 へ、8 分音符の速さは同じ。新しい付点 4 分のテンポは？', '2/4 at ♩ = 96 to 6/8, eighths unchanged. What is the new dotted-quarter tempo?'), steps: [{ label: t('八分音符每分钟几个？', '8 分音符は毎分いくつ？', 'Eighths per minute?'), kind: 'number', answer: 192 }, { label: t('附点四分音符 =', '付点 4 分 =', 'Dotted quarter ='), kind: 'number', answer: 64, tol: 0.5 }] },
          { prompt: t('2/4、♩ = 120 转到 6/8，八分音符速度不变。新的附点四分音符速度是多少？', '2/4・♩ = 120 から 6/8 へ、8 分音符の速さは同じ。新しい付点 4 分のテンポは？', '2/4 at ♩ = 120 to 6/8, eighths unchanged. What is the new dotted-quarter tempo?'), steps: [{ label: t('八分音符每分钟几个？', '8 分音符は毎分いくつ？', 'Eighths per minute?'), kind: 'number', answer: 240 }, { label: t('附点四分音符 =', '付点 4 分 =', 'Dotted quarter ='), kind: 'number', answer: 80, tol: 0.5 }] },
          { prompt: t('2/4、♩ = 72 转到 6/8，八分音符速度不变。新的附点四分音符速度是多少？', '2/4・♩ = 72 から 6/8 へ、8 分音符の速さは同じ。新しい付点 4 分のテンポは？', '2/4 at ♩ = 72 to 6/8, eighths unchanged. What is the new dotted-quarter tempo?'), steps: [{ label: t('八分音符每分钟几个？', '8 分音符は毎分いくつ？', 'Eighths per minute?'), kind: 'number', answer: 144 }, { label: t('附点四分音符 =', '付点 4 分 =', 'Dotted quarter ='), kind: 'number', answer: 48, tol: 0.5 }] },
        ],
        explain: t('四分音符 = 两个八分音符，附点四分音符 = 三个八分音符：先算出八分音符的速度，再除以 3。', '4 分音符 = 8 分音符 2 つ、付点 4 分 = 3 つ：8 分音符の速さを出して 3 で割る。', 'A quarter is two eighths, a dotted quarter three: find the eighth-note rate, then divide by 3.'),
      },
    ],
    lab: [
      { id: 'b410-lab', type: 'lab', lab: 'poly-32-mm', mandatory: true, minutes: 5 },
    ],
  },
  pool: [
    { id: 'b410-p1', type: 'gen', gen: 'additiveMeter', count: 3, skills: ['identify', 'hearing'] },
    { id: 'b410-p2', type: 'gen', gen: 'meterClass', count: 3, skills: ['identify'] },
    { id: 'b410-p3', type: 'gen', gen: 'noteValue', count: 3, skills: ['calc'] },
  ],
};

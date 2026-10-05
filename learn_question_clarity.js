// 判分所依赖的背景必须出现在题目本身，考试抽题后也能独立作答。
// 在补齐干扰项之后应用，保留原始题卡的干扰项键、答案和存档标识。
const t = (zh, ja, en) => ({ zh, ja, en });
const replacements = new Map([
  ['只弹白键：起点 ↔ 调式', t('只用白键，以指定音为主音（不只是起始音）：主音 ↔ 调式', '白鍵のみで、指定音を主音（単なる開始音ではなく）とする：主音 ↔ 旋法', 'Using white keys only, establish the specified note as tonic (not just the starting note): tonic ↔ mode')],
  ['女高音 E→F，男低音 C→A。这是哪种进行？', t('女高音 E4→F4 上行，男低音 C3→A2 下行。这是哪种进行？', 'ソプラノ E4→F4 は上行、バス C3→A2 は下行。どの進行？', 'Soprano E4→F4 rises while bass C3→A2 falls. Which kind of motion is this?')],
  ['C D E（以 C 为轴）的倒影是？', t('在 C 大调内，以 C 为轴做调内倒影（反转级进方向，不要求半音距离相等）：C D E 变成？', 'C メジャー内で C を軸に全音階的反行を行う（音度の向きを逆転し、半音数は保存しない）。C D E は？', 'In C major, invert C D E diatonically about C (reverse scale-step direction, without preserving exact semitone sizes). What results?')],
  ['哪个顺序符合规则？', t('按本课古典和声的乐句模型，IV、ii6、V 在走向属和弦时的先后顺序是？', 'この課の古典的和声のフレーズ模型で、ドミナントに向かう IV・ii6・V の順序は？', 'In this lesson’s classical harmonic phrase model, what is the order of IV, ii6 and V approaching the dominant?')],
  ['旋律音 A 在布鲁斯配法里最适合配哪个和弦？（C 调）', t('C 调布鲁斯中，希望旋律音 A 成为和弦的三音（不是九、十三等延伸音）。应配哪个和弦？', 'C のブルースで、旋律 A を 9・13 などのテンションではなく和音の 3 度にしたい。どのコード？', 'In a C blues, choose a chord whose third is melody note A, rather than using A as a ninth or thirteenth. Which chord?')],
  ['点格里"/ –"占两拍，对应的是？', t('以四分音符为一拍，点格里“/ –”表示一个音持续两拍。对应的是？', '4 分音符を 1 拍とし、点の格子の「/ –」は 1 音を 2 拍持続する。音価は？', 'With one quarter note per beat, “/ –” on the grid sustains a single note for two beats. Which note value is it?')],
  ['旋律用 C 宫的五个音，最后停在 A 上，这叫什么调式？', t('旋律用 C 宫的五个音，以 A 为主音，并在 A 上收束。这叫什么调式？', 'C 宮の 5 音を使い、A を主音として A に終止する旋律。何の旋法？', 'A tune uses the C-Gong notes, establishes A as tonic, and closes on A. Which mode is it?')],
  ['E4 G4 C5 呢？', t('由低到高的 E4 G4 C5 是紧密还是开放排列？是什么转位？', '低音から E4 G4 C5。密集・開離のどちらで、何転回形？', 'With E4 G4 C5 ordered low to high, is the voicing close or open, and which inversion is it?')],
  ['一个外音从下面跳上来，然后往下走一步，落在强拍上。最可能是？', t('和弦外音本身落在强拍：从下方和弦音跳进到它，再反向下行一步，在弱拍解决到和弦音。它是？', '非和声音そのものが強拍にあり、下の和声音から跳躍して入り、反対方向へ順次下行して弱拍の和声音に解決する。これは？', 'The non-chord tone itself is accented: leap up to it from a chord tone, then step down to a chord tone on a weaker beat. What is it?')],
  ['在 C 调里，这三个和弦是？', t('C 大调十二小节布鲁斯的 I、IV、V 三个三和弦分别是？', 'C メジャーの 12 小節ブルースで、I・IV・V の三和音は？', 'What are the I, IV and V triads in a twelve-bar blues in C major?')],
  ['VI 在这里的功能是？', t('C 大调的 I–VI–ii–V（C–A7–Dm7–G7）中，VI（A7）相对于 ii 的功能是？', 'C メジャーの I–VI–ii–V（C–A7–Dm7–G7）で、VI（A7）の ii に対する機能は？', 'In C major, I–VI–ii–V is C–A7–Dm7–G7. What is the function of VI (A7) relative to ii?')],
  ['旧速度 100：旧小节里 2 个枢纽时值，新小节里 3 个。新速度？', t('整小节时长保持相等：旧 2/4 拍改为新 3/4 拍，均用四分音符计速。旧速度 ♩ = 100，新速度 ♩ =？', '小節の長さを同じに保ち、2/4 から 3/4 へ。両方とも 4 分音符でテンポを数える。旧 ♩ = 100、新 ♩ =？', 'Keep the bar duration equal while changing 2/4 to 3/4, with quarter-note BPM in both meters. Old ♩ = 100; new ♩ = ?')],
  ['[3, 6, 8] 和 [11, 2, 4] 是什么关系？', t('按 mod 12，将 [11, 2, 4] 中每个音级移调到 [3, 6, 8]。使用哪个 Tn？', 'mod 12 で [11, 2, 4] の各音を [3, 6, 8] に移調する。どの Tn？', 'Working mod 12, transpose each pitch class of [11, 2, 4] to [3, 6, 8]. Which Tn does this?')],
  ['把三全音替代用在 C–Am–Dm–G 的 vi 和 V 上（先把它们变成属七），结果是？', t('先把 C–Am–Dm–G 的 vi、ii、V 都改成属七，得到 C–A7–D7–G7；再只对 A7、G7 做三全音替代。结果是？', 'まず C–Am–Dm–G の vi・ii・V を属七にして C–A7–D7–G7 とする。その後 A7 と G7 のみを三全音代理にすると？', 'First change vi, ii and V of C–Am–Dm–G to dominant sevenths, giving C–A7–D7–G7. Then apply tritone substitution only to A7 and G7. What results?')],
  ['200 Hz 和 300 Hz 一起响（纯五度）。听者还会感到一个"结合音"——它是多少赫兹？', t('200 Hz 和 300 Hz 同时发声。求一阶差音（高频减低频），频率是多少？', '200 Hz と 300 Hz が同時に鳴る。1 次の差音（高い周波数 − 低い周波数）は何 Hz？', '200 Hz and 300 Hz sound together. Calculate the first-order difference tone (higher minus lower frequency). What is its frequency?')],
]);

const notes = {
  interval: t('按所写字母拼写，取从第一个音向上到第二个音、一个八度以内的音程。', '書かれた文字に従い、最初の音から次の音へ上行する 1 オクターヴ以内の音程を答える。', 'Use the written letter spelling and the ascending interval from the first note to the second, within one octave.'),
  spelling: t('本题考音名拼写：按指定调性或音级使用字母，等音异名不能替代所要求的拼写。', '指定された調・音度に従って綴る問題。異名同音でも、要求された文字の代わりにはならない。', 'This tests note spelling: use the letters required by the given key or scale degree; enharmonic names do not replace the required spelling.'),
  compound: t('按通常复拍子解释，以附点四分音符为一拍，不把八分音符细分当作大拍。', '通常の複合拍子として、付点 4 分音符を 1 拍と数え、8 分音符の細分とは区別する。', 'Use the usual compound-meter reading: one dotted quarter is one beat, distinct from its eighth-note subdivisions.'),
  solfege: t('采用首调唱名；大调主音是 do，小调这里也以 do 为主音，用 me、le、te 表示降音级。', '移動ドを使う。長調もこの課の短調も主音は do、下げた音度は me・le・te。', 'Use movable do: major and the do-based minor used here both take do as tonic; me, le and te are lowered degrees.'),
  classicalMinor: t('这里指古典旋律小调；没有特别说明方向时，采用上行形式。', 'ここでは古典的な旋律短音階。方向が指定されていなければ上行形を使う。', 'Here melodic minor means the classical form; use its ascending form unless a direction is explicitly specified.'),
  jazzMinor: t('这里指爵士旋律小调，上、下行都使用同一组音。', 'ここではジャズの旋律短音階で、上行も下行も同じ音を使う。', 'Here melodic minor means jazz melodic minor, using the same pitches ascending and descending.'),
  satb: t('按本课的古典 SATB 四部写作规则判断。', 'この課の古典的 SATB 4 声体の規則で判断する。', 'Judge using the classical SATB part-writing conventions taught in this lesson.'),
  species: t('采用本课的两声部类别对位规则。', 'この課の 2 声の種別対位法の規則を使う。', 'Use the two-part species-counterpoint conventions taught here.'),
  brightness: t('比较同主音调式，按本课特征音升降所定义的明暗顺序判断。', '同じ主音の旋法を比べ、この課の特性音の上下による明暗の順序を使う。', 'Compare parallel modes with the same tonic, using the lesson’s brightness ordering by raised and lowered characteristic degrees.'),
  pentatonic: t('这里使用宫／大调五声体系，不泛指所有可能的五音音阶。', 'ここでは宮／メジャー・ペンタトニックを扱い、すべての 5 音音階の総称ではない。', 'Here use the gong/major pentatonic system, rather than every possible five-note scale.'),
  fifth: t('这里只考虑未变化的纯五音；♭5、♯5 等决定和弦性质的音不在此省略规则内。', '省略するのは変化していない完全 5 度。和音の性質を決める ♭5・♯5 はこの規則の対象外。', 'This omission rule concerns the unaltered perfect fifth; altered ♭5 or ♯5 defining chord quality are excluded.'),
  minimumLimit: t('求能包含该比值的最低极限；更高极限也可能包含它。', 'この比を含む最小のリミットを答える。より大きなリミットも含みうる。', 'Give the smallest limit containing this ratio; higher limits can also contain it.'),
  collection: t('在十二平均律中数不同音级集合；忽略八度、排列顺序及同一集合的调式起点。', '12 平均律の異なるピッチクラス集合を数え、オクターヴ・並び順・同じ集合の旋法的開始音は区別しない。', 'Count distinct pitch-class sets in 12-TET, ignoring octave, ordering and modal starting points within the same set.'),
  row: t('按无额外对称性的音列计算：12 个移调乘 4 种基本形式；此处不合并对称导致的重复。', '追加の対称性がない音列として、12 移調 × 4 基本形を数える。対称性による重複はここでは統合しない。', 'Count a row without additional symmetry: 12 transpositions times four basic forms; symmetry-related duplicates are not merged here.'),
  westernModel: t('仅在同主音的十二平均律音级模型中比较；不表示各传统的实际音律、装饰和行腔完全相同。', '同じ主音の 12 平均律の音度モデルのみを比較し、各伝統の音律・装飾・旋律運動が同じという意味ではない。', 'Compare same-tonic pitch-class models in 12-TET only; actual tuning, ornamentation and melodic practice may differ.'),
  pulse: t('起点同响；只数一个循环内的等分格，不把下一循环的起点重复计入。', '開始点は同時。1 周期内の等分の格を数え、次の周期の開始点は重複して数えない。', 'The parts start together. Count equal grid divisions within one cycle, without counting the next cycle’s starting point twice.'),
  pivot: t('此处整小节总时长保持相等，旧、新计速单位相同，所比较的时值在各自速度下等值。', '小節全体の長さとテンポの単位を同じに保つ。比較する音価は、それぞれのテンポ内で同じ値を持つ。', 'Keep the total bar duration and the BPM unit the same; the counted note values are equal within each respective tempo.'),
  fifths: t('从 C 顺时针逐次按上行纯五度拼写；这里区分 F♯ 与逆时针路线的 G♭。', 'C から時計回りに完全 5 度上へ綴る。F♯ と反時計回りの G♭ を区別する。', 'Spell successive ascending perfect fifths clockwise from C; distinguish F♯ from G♭ on the counterclockwise route.'),
  french: t('要求四个不同音组成的增六和弦；三音的意大利增六不在本题范围内。', '異なる 4 音の増 6 和音を求める。3 音のイタリアの増 6 は対象外。', 'Choose a four-note augmented-sixth chord; the three-note Italian sixth is outside the scope of this question.'),
  tertian: t('按音阶隔一个音取一个音，构成三度叠置的三和弦。', '音階の音を 1 つおきに取り、3 度を積んだ三和音を作る。', 'Build tertian triads by taking alternate notes of the scale.'),
  rest: t('按全音符对应的休止时值计算，不指可代表任意拍号整小节休止的记号。', '全音符に対応する休符の音価で計算し、拍子を問わず小節全体を休む記号とは区別する。', 'Use the rest duration corresponding to a whole note, rather than a whole-bar rest symbol that can cover any meter.'),
  partial: t('分音／谐音编号包含基音：基音是第 1 分音；泛音编号不包含基音。', '部分音／倍音の番号は基音を含む（基音 = 第 1 部分音）。上音の番号は基音を含まない。', 'Partial/harmonic numbering includes the fundamental as number 1; overtone numbering excludes the fundamental.'),
  tonic: t('所指定的起始音同时是主音；仅改变旋律开始或结束的音不足以确定调式。', '指定された開始音を主音として確立する。旋律の最初や最後の音だけでは旋法は決まらない。', 'Establish the specified starting note as tonic; a melody’s first or last note alone does not determine its mode.'),
  chordHeld: t('保持同一个 C 大三和弦；题中 D、F 作为和弦外音，按所述强弱拍与进入、离开方式分类。', '同じ C 長三和音を保つ。D・F を非和声音とし、指定された拍の強弱と入り方・離れ方で分類する。', 'Hold a C-major chord throughout; treat D and F as non-chord tones and classify them by the stated accent and approach/departure.'),
  related: t('采用本课的六调范围：ii、iii、IV、V、vi 上的调，加同主音小调；不同教材的近关系调定义可能更窄。', 'この課では ii・iii・IV・V・vi の調と同主短調の 6 調を含む。教材により近親調の範囲は狭いこともある。', 'Use this lesson’s six-key convention: keys on ii, iii, IV, V and vi plus parallel minor; other texts may use a narrower definition.'),
  blues: t('按本课给出的十二小节布鲁斯版本作答；其他版本可改变末小节或使用 quick change。', 'この課で示した 12 小節ブルースの形を使う。他の形では最終小節やクイック・チェンジが異なることもある。', 'Use the twelve-bar blues pattern shown in this lesson; other variants can change the last bar or use a quick change.'),
  centre: t('题设同时规定：旋律收束的音已经被确立为主音，而不只是偶然的末音。', 'この問題では終止音が主音として確立されており、単なる最後の音ではないとする。', 'The closing note is also given to be the established tonic, rather than merely the last note of the melody.'),
  inversion: t('使用 I0：每个音级 x 变为 −x，再按 mod 12 化简；这里不以首音为倒影轴。', 'I0 を使う：各ピッチクラス x を −x にし、mod 12 で簡約する。先頭音を軸にする操作ではない。', 'Use I0: map each pitch class x to −x and reduce mod 12; the first note is not used as the inversion axis.'),
  partialRange: t('仅比较本课表中第 2–16 分音：折合到一个八度后，取与最近十二平均律音级的偏差绝对值。', 'この課の表の第 2–16 部分音のみを比較し、1 オクターヴ内に移して最も近い 12 平均律の音からの偏差の絶対値を取る。', 'Compare only partials 2–16 in this lesson’s table, octave-reduced, by the absolute deviation from the nearest 12-TET pitch.'),
};

const append = (text, note) => {
  if (typeof text === 'string') return `${text} ${note.zh}`;
  return Object.fromEntries(['zh', 'ja', 'en'].map(lang => [lang, `${text?.[lang] ?? text?.en ?? ''} ${note[lang]}`]));
};
const zh = v => typeof v === 'string' ? v : v?.zh ?? '';
const notePc = value => {
  const m = /^([A-G])([♭♯b#𝄪𝄫]*)$/u.exec(zh(value));
  if (!m) return null;
  const pc = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]];
  return ([...m[2]].reduce((n, x) => n + ({ '♭': -1, b: -1, '♯': 1, '#': 1, '𝄪': 2, '𝄫': -2 }[x]), pc) + 24) % 12;
};

/** 单题补全背景；变体先继承原节点条件，再逐个处理。 */
export function clarifyQuestion(card, topic = '') {
  if (card.variants) {
    const { variants, ...base } = card;
    return { ...base, variants: variants.map(variant => clarifyQuestion({ ...base, ...variant }, topic)) };
  }
  if (!card.prompt || ['page', 'guide', 'demo', 'experiment', 'lab', 'gen'].includes(card.type)) return card;
  let prompt = replacements.get(zh(card.prompt)) || card.prompt;
  const p = zh(prompt), extra = [];
  const add = key => extra.push(notes[key]);
  if (/[A-G][♯♭#b𝄪𝄫]?\s*(?:到|–|—|→|至)\s*[A-G][♯♭#b𝄪𝄫]?/u.test(p)
      && /几度|音程|半音/.test(p) && !/[A-G][♯♭#b𝄪𝄫]?\d|上行|下行|转位|倒影|移调/.test(p)) add('interval');
  if (card.type === 'choice' && !/键盘|同音|声音|听：/.test(p)) {
    const pc = notePc(card.options?.[card.answer]);
    if (pc !== null && card.options.some((o, i) => i !== card.answer && notePc(o) === pc) && !/拼写|字母|写成二度/.test(p)) add('spelling');
  }
  if (/(?:6|9|12)\/8/.test(p) && /几拍|几个拍|多少拍|每小节有|主拍|大拍/.test(p) && !/附点|细分|八分/.test(p)) add('compound');
  if (/sol|me|le|te/.test(p) && /唱名|第几级|小调.*(?:六|七|三)|六.*七.*唱/.test(p)) add('solfege');
  if ((/旋律小调/.test(p) || card.type === 'match' && /^(?:minor|B1-4)/.test(topic) && /旋律小调/.test(JSON.stringify(card.pairs))) && !/爵士|古典|上行|下行/.test(p)) add(/jazz|B4-|bebop|chordscale/.test(topic) ? 'jazzMinor' : 'classicalMinor');
  if (/重复|间距|平行|交叉|音域|导音|排列/.test(p) && /^(?:voicing|voiceleading|fourpart|B2-4)/.test(topic)) add('satb');
  if (/协和|不协和|纯四度|平行|允许|禁止/.test(p) && /species|counterpoint|B3-4/.test(topic)) add('species');
  if (/明亮|最["“”]?亮|最["“”]?暗|明暗|亮到暗/.test(p) && /调式|Lydian|Locrian/.test(p)) add('brightness');
  if (/五声/.test(p) && /和声|半音|步长|2–2–3|2-2-3/.test(p) && !/宫|大调|无半音/.test(p)) add('pentatonic');
  if (/五音|五度/.test(p) && /省略|省掉|不弹|省去/.test(p) && !/纯五|未变化|♭5|♯5/.test(p)) add('fifth');
  if (/极限|limit/.test(p) && /\d+\s*[/:]\s*\d+/.test(p) && !/最低|最大质数|奇数部分/.test(p)) add('minimumLimit');
  if (/全音|八音|六音|减音阶/.test(p) && /几种|多少种|只有.*种|几个.*集合|多少.*移位/.test(p)) add('collection');
  if (/音列|十二音|序列/.test(p) && /多少种|多少.*形式|几种.*形式/.test(p)) add('row');
  if (/thaat|タート/.test(p) && /同音|调式|西方/.test(p)) add('westernModel');
  if (/3[:：]2|2[:：]3|4[:：]3|3[:：]4/.test(p) && /格|细分|循环/.test(p)) add('pulse');
  if (/枢纽时值/.test(p)) add('pivot');
  if (/五度圈/.test(p) && /从 C|从C/.test(p) && card.options?.some(o => zh(o) === 'F♯') && card.options.some(o => zh(o) === 'G♭')) add('fifths');
  if (/增六/.test(p) && /全音/.test(p)) add('french');
  if (/全音音阶/.test(p) && /搭三和弦|三和弦.*得到/.test(p)) add('tertian');
  if (/休止/.test(p) && card.type === 'match' && card.pairs?.some(pair => /全休止/.test(zh(pair[0])))) add('rest');
  if (/分音|第.*谐音/.test(p) && !/不算基|不计基/.test(p)) add('partial');
  if (/从.*开始|起点/.test(p) && /调式|Dorian|Mixolydian|Phrygian|Locrian/.test(JSON.stringify(card)) && /^(?:modes|B1-5)/.test(topic) && !/主音/.test(p)) add('tonic');
  if (/E.?F.?E|C.?D.?E|E.*C.*D/.test(p) && /经过音|邻音|装饰|和弦外音/.test(JSON.stringify(card)) && /nct|motif|B3-1/.test(topic) && !/和弦/.test(p)) add('chordHeld');
  if (/近关系调|近亲调/.test(p) && !/本课/.test(p)) add('related');
  if (/布鲁斯|blues/.test(p) && /第.*(?:小节|格)|末小节|最后.*和弦/.test(p)) add('blues');
  if (/最后|结束|收束|停在/.test(p) && /^(?:pentatonic|B1-6)/.test(topic) && /调式|羽调|商调|徵调/.test(JSON.stringify(card)) && !/主音/.test(p)) add('centre');
  if (/倒影/.test(p) && /\[\s*\d/.test(p) && /pitchclass|setclass|posttonal|B6/.test(topic) && !/I\d|轴|同一个音/.test(p)) add('inversion');
  if (/哪个泛音.*相差最大/.test(p)) add('partialRange');
  for (const note of extra) prompt = append(prompt, note);
  if (p === 'CTo7 和 vii°7 的区别是？') {
    const options = card.options.slice();
    options[card.answer] = t('可以等音同音，但功能不同：共同音减七装饰和弦，导音减七趋向目标主和弦', '異名同音になりうるが機能は異なる：共通音減 7 は和音を飾り、導音減 7 は目標の主和音へ向かう', 'They can be enharmonically identical, but differ in function: common-tone diminished sevenths embellish a chord; leading-tone diminished sevenths lead to a target tonic');
    return { ...card, prompt, options, explain: t('两者不一定有同一组音。要结合被装饰或被主音化的和弦判断，不能仅凭声音或和弦形状认定功能。', '必ず同じ音を持つわけではない。装飾される和音や主音化される和音を見て機能を判断する。', 'They do not necessarily contain the same pitches. Identify the embellished or tonicized chord to determine function; sound or chord shape alone is insufficient.') };
  }
  // 格式要求也属于题目条件；打印题和播放器使用同一份数据。
  const steps = card.steps?.map(step => {
    if (step.inputHint || !['note', 'roman'].includes(step.kind)) return step;
    const octave = [].concat(step.answer).some(a => /-?\d+$/.test(String(a)));
    const inputHint = step.kind === 'roman'
      ? t('保留罗马数字大小写、变化记号和转位数字。', 'ローマ数字の大文字小文字・変化記号・転回数字を保つ。', 'Keep Roman-numeral case, accidentals and inversion figures.')
      : octave
        ? t('按指定调性或音程拼写，并写八度编号，例如 C4。', '指定された調・音程で綴り、C4 のようにオクターヴ番号も書く。', 'Use the required key/interval spelling and include the octave number, e.g. C4.')
        : t('按指定调性或音程拼写，只写音名，不写八度编号。', '指定された調・音程で綴り、音名だけを書く（オクターヴ番号なし）。', 'Use the required key/interval spelling; give note names without octave numbers.');
    return { ...step, inputHint };
  });
  return prompt === card.prompt && !steps ? card : { ...card, prompt, ...(steps ? { steps } : {}) };
}

export function clarifyLevel(level, topic = level.id) {
  return { ...level,
    ...(level.sections ? { sections: Object.fromEntries(Object.entries(level.sections).map(([key, nodes]) => [key, nodes.map(n => clarifyQuestion(n, topic))])) } : {}),
    ...(level.pool ? { pool: level.pool.map(n => clarifyQuestion(n, topic)) } : {}),
  };
}

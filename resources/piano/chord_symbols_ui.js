// 和弦标记查询界面：输入任意写法 → 标准写法、其他写法、组成音（按音级拼写）、五线谱、作用说明；另有全部和弦一览
// 写法与组成见 chord_symbols.js：ref:wiki-chord-notation ref:omt2e-chord-symbols ref:omt-triads ref:soundquest-blk
// 各和弦"作用"的出处逐条标在 FUNCTIONS 中：ref:omt2e-vii6 ref:wiki-dominant-seventh ref:wiki-major-seventh ref:wiki-minor-seventh
//   ref:wiki-minor-major-seventh ref:wiki-half-diminished ref:wiki-diminished-seventh ref:wiki-augmented-triad ref:wiki-augmented-seventh
//   ref:wiki-altered-chord ref:wiki-suspended-chord ref:wiki-sixth-chord ref:wiki-added-tone ref:wiki-power-chord
//   ref:wiki-altered-scale ref:omt2e-jazz-voicings
import { QUALITIES, parseChordSymbol, buildChord, describeTones, qualityById } from './chord_symbols.js?v=20261002-alt3';
import { renderStaff, chooseClef } from './staff_svg.js?v=20261002-fix';
import { parsePitch } from './pitch_spelling.js';
import { el, button, field, language, midiToFrequency, sourcesFooter, cite, tabs, relatedLinks, crossLink } from './module_kit.js';
import { withIcon } from './ui_icons.js?v=20261003-i2';

const SOURCES = [
  'wiki-chord-notation', 'wiki-altered-scale', 'omt2e-jazz-voicings', 'omt2e-chord-symbols', 'omt-triads', 'omt2e-vii6', 'soundquest-blk',
  'wiki-dominant-seventh', 'wiki-major-seventh', 'wiki-minor-seventh', 'wiki-minor-major-seventh', 'wiki-half-diminished',
  'wiki-diminished-seventh', 'wiki-augmented-triad', 'wiki-augmented-seventh', 'wiki-altered-chord', 'wiki-suspended-chord',
  'wiki-sixth-chord', 'wiki-added-tone', 'wiki-power-chord',
];

const EXAMPLES = ['Cm', 'C-', 'C°', 'DΔ', 'E+', 'Em7b5', 'Eø7', 'Bdim7', 'C7(b9)', 'C5', 'G5', 'C/E', 'C/F#', 'C7omit3', 'Cadd11', 'G7alt', 'A#aug/C', 'Cblk'];

/** 和弦性质的名称 */
const NAMES = {
  major: ['大三和弦', '長三和音', 'Major triad'], minor: ['小三和弦', '短三和音', 'Minor triad'], dim: ['减三和弦', '減三和音', 'Diminished triad'],
  aug: ['增三和弦', '増三和音', 'Augmented triad'], sus4: ['挂四和弦', 'サスフォー', 'Suspended fourth'], sus2: ['挂二和弦', 'サスツー', 'Suspended second'],
  power: ['强力和弦（五度和弦）', 'パワーコード', 'Power chord'], six: ['大六和弦（加六）', 'シックス・コード', 'Major sixth'], minorSix: ['小六和弦', 'マイナー・シックス', 'Minor sixth'],
  sixNine: ['六九和弦', 'シックス・ナイン', 'Six-nine'], minorSixNine: ['小六九和弦', 'マイナー・シックス・ナイン', 'Minor six-nine'], add9: ['加九和弦', 'アド・ナインス', 'Added ninth'], minorAdd9: ['小三加九和弦', 'マイナー・アド・ナインス', 'Minor added ninth'],
  dom7: ['属七和弦', '属七の和音', 'Dominant seventh'], maj7: ['大七和弦', '長七の和音', 'Major seventh'], min7: ['小七和弦', '短七の和音', 'Minor seventh'],
  minMaj7: ['小大七和弦', 'マイナー・メジャー・セブンス', 'Minor-major seventh'], halfDim7: ['半减七和弦', '半減七の和音', 'Half-diminished seventh'],
  dim7: ['减七和弦', '減七の和音', 'Diminished seventh'], aug7: ['增七和弦（属七升五）', 'オーグメンテッド・セブンス', 'Augmented seventh'],
  augMaj7: ['增大七和弦', 'オーグメンテッド・メジャー・セブンス', 'Augmented major seventh'], dom7b5: ['属七降五和弦', 'セブンス・フラット・ファイブ', 'Dominant seventh flat five'],
  sus7: ['属七挂四和弦', 'セブン・サスフォー', 'Seventh suspended fourth'], dom9: ['属九和弦', '属九の和音', 'Dominant ninth'], maj9: ['大九和弦', 'メジャー・ナインス', 'Major ninth'],
  min9: ['小九和弦', 'マイナー・ナインス', 'Minor ninth'], dom7b9: ['属七降九和弦', 'セブンス・フラット・ナインス', 'Dominant minor ninth'], dom7s9: ['属七升九和弦', 'セブンス・シャープ・ナインス', 'Dominant seventh sharp nine'],
  dom7s11: ['属七升十一和弦', 'セブンス・シャープ・イレブンス', 'Dominant seventh sharp eleven'], dom9s11: ['属九升十一和弦', 'ナインス・シャープ・イレブンス', 'Ninth sharp eleven'],
  dom11: ['属十一和弦', '属十一の和音', 'Eleventh'], min11: ['小十一和弦', 'マイナー・イレブンス', 'Minor eleventh'], dom13: ['属十三和弦', '属十三の和音', 'Thirteenth'],
  maj13: ['大十三和弦', 'メジャー・サーティーンス', 'Major thirteenth'], min13: ['小十三和弦', 'マイナー・サーティーンス', 'Minor thirteenth'],
  alt: ['变化属和弦（alt）', 'オルタード・コード（alt）', 'Altered dominant (alt)'],
  blk: ['Blackadder 和弦', 'ブラックアダー・コード', 'Blackadder chord'],
};

/** 作用：[中文, 日文, 英文, 出处…] */
const FUNCTIONS = {
  major: ['大调中 I、IV、V 是大三和弦（主、下属、属），小调中 III、V、VI、VII 也是大三和弦。', '長調では I・IV・V が長三和音（主・下属・属）、短調では III・V・VI・VII も長三和音です。', 'In a major key I, IV and V are major (tonic, subdominant, dominant); in minor, III, V, VI and VII are major too.', 'omt-triads'],
  minor: ['大调中 ii、iii、vi 是小三和弦；小调中 i、iv 是小三和弦。', '長調では ii・iii・vi、短調では i・iv が短三和音です。', 'In major, ii, iii and vi are minor; in minor, i and iv are minor.', 'omt-triads'],
  dim: ['大小调中的 vii°（导音三和弦），小调中的 ii° 也是减三和弦；vii° 通常以第一转位 vii°6 出现，进行到主和弦。注意：有些爵士谱的 C° / Cdim 实际指减七和弦。', '長短調の vii°（導音上の三和音）、短調の ii° が減三和音です。vii° はふつう第一転回形 vii°6 で主和音へ進みます。ジャズの譜面では C° / Cdim が減七を意味することもあります。', 'vii° (the leading-tone triad) in major and minor, and ii° in minor; vii° usually appears in first inversion (vii°6) moving to the tonic. Some jazz charts mean the diminished seventh by C° / Cdim.', 'omt-triads', 'omt2e-vii6', 'wiki-diminished-seventh'],
  aug: ['常见于 I → I+ → IV 这样的经过性用法；V 上的增三和弦可再加小七度成为增七和弦；ii–V–I 中 III+ 也可作代理属和弦。', 'I → I+ → IV のような経過的な使い方が典型。V 上のオーグメントに短七度を加えることも、ii–V–I で III+ を代理ドミナントにすることもあります。', 'Typical in passing motion such as I → I+ → IV; on V it may add a minor seventh, and III+ can act as a substitute dominant in a ii–V–I.', 'soundquest-blk', 'wiki-augmented-triad'],
  sus4: ['来自对位中的挂留：四度原本要级进下行到三音；流行音乐中常不解决，没有三音而显得开放、含糊。', '対位法の掛留に由来し、4 度は 3 度へ下行解決するのが本来の形。ポップスでは解決しないことも多く、3 度がないため開放的で曖昧な響きです。', 'From suspensions in counterpoint: the fourth originally resolves down to the third. In pop it is often left unresolved; without a third it sounds open and ambiguous.', 'wiki-suspended-chord'],
  sus2: ['与挂四相同，用二度代替三音，常不解决，听感开放。', 'サスフォーと同様に 3 度の代わりに 2 度を置き、解決しないことも多い開放的な響き。', 'Like sus4 but with the second replacing the third; often unresolved and open-sounding.', 'wiki-suspended-chord'],
  power: ['只有根音与五度，严格说是音程而不是和弦（和弦通常指三个以上音级），因不大不小也叫中性和弦；常用倍根的三音排列（C–G–C）。摇滚、金属、朋克的核心，经过失真仍清晰有力。', 'ルートと 5 度だけで、厳密には和音ではなく音程です（和音はふつう 3 音以上）。長調でも短調でもないため中立的。ルートを重ねた 3 音（C–G–C）で弾くのが一般的。ロックやメタル、パンクの中核で、歪ませても濁りにくい。', 'Root and fifth only — strictly an interval rather than a chord (a chord usually has three or more pitch classes), neither major nor minor; usually voiced with a doubled root (C–G–C). Central to rock, metal and punk, and stays clear under distortion.', 'wiki-chord-notation', 'wiki-power-chord'],
  six: ['三和弦加大六度。拉莫称之为"加六和弦"，常见于终止前的下属和弦；它也可听成七和弦的第一转位（C6 = Am7/C），因此和声上有两种解读。', '三和音に長 6 度を加えたもの。ラモーの「付加六の和音」で、終止前の下属和音によく使われます。七の和音の第一転回（C6 = Am7/C）とも聞こえる二義的な響き。', 'A triad plus a major sixth — Rameau’s sixte ajoutée, common on the subdominant before a cadence; it can also be heard as a first-inversion seventh chord (C6 = Am7/C).', 'wiki-sixth-chord'],
  minorSix: ['小三和弦加大六度，同样有加六与七和弦转位两种解读。', '短三和音に長 6 度を加えたもの。付加六と七の和音の転回の二通りに解釈できます。', 'A minor triad plus a major sixth; likewise readable as an added sixth or an inverted seventh chord.', 'wiki-sixth-chord'],
  sixNine: ['三和弦同时加六度和九度，没有七度；是最常见的多加音和弦。', '三和音に 6 度と 9 度を加え、7 度は含みません。最もよく見る複数付加の和音です。', 'A triad with both sixth and ninth added and no seventh — the most common multi-added-tone chord.', 'wiki-chord-notation'],
  add9: ['三和弦加九度（不含七度）；写成 add2 时同一音级、只是排列在八度内。常被当作比普通三和弦更有张力的替代。', '三和音に 9 度を加える（7 度なし）。add2 は同じ音で配置が違うだけ。通常の三和音より緊張感のある代わりとして使われます。', 'A triad with an added ninth (no seventh); add2 is the same pitch class voiced within the octave. Often a more intense substitute for a plain triad.', 'wiki-added-tone', 'wiki-chord-notation'],
  minorSixNine: ['小三和弦同时加六度和九度，没有七度。', '短三和音に 6 度と 9 度を加え、7 度は含みません。', 'A minor triad with both sixth and ninth added and no seventh.', 'wiki-chord-notation'],
  minorAdd9: ['小三和弦加九度，用法同加九和弦。', '短三和音に 9 度を加える。用法はアド・ナインスと同じ。', 'A minor triad with an added ninth, used like add9.', 'wiki-added-tone'],
  dom7: ['最重要的七和弦：大调 V7 强烈地推向主和弦；三音与七音构成三全音，是不稳定感的来源。自然小调的 VII 上也有。', '最も重要な七の和音。V7 は主和音へ強く進もうとし、3 度と 7 度の三全音が不安定さの源です。自然短音階の VII にも現れます。', 'The most important seventh chord: V7 drives strongly to the tonic, its third and seventh forming the unstable tritone. It also occurs on VII of the natural minor.', 'wiki-dominant-seventh'],
  maj7: ['柔和的不协和色彩；Forte 以 IV7 为典型；萨蒂《裸体舞曲》第一首就在两个大七和弦之间交替。', '柔らかな不協和の色彩。フォルテは IV7 を典型例とし、サティ《ジムノペディ第 1 番》は二つの長七の和音を交互に鳴らします。', 'A soft dissonant colour; Forte cites IV7 as typical, and Satie’s first Gymnopédie alternates two major seventh chords.', 'wiki-major-seventh'],
  min7: ['大调 ii、iii、vi 与自然小调 i、iv、v 上的七和弦；ii–V–I 中的 ii 就是小七和弦。', '長調の ii・iii・vi、自然短音階の i・iv・v に現れ、ii–V–I の ii がこの和音です。', 'Found on ii, iii and vi in major and on i, iv and v in natural minor; the ii of a ii–V–I is a minor seventh chord.', 'wiki-minor-seventh'],
  minMaj7: ['和声小调主音上的七和弦；导音带来指向主音的牵引，多见于浪漫派晚期与爵士。', '和声的短音階の主音上の七の和音。導音が主音への引力を生み、後期ロマン派やジャズで多く使われます。', 'The tonic seventh chord of the harmonic minor; its leading tone pulls toward the tonic. More common in late Romantic music and jazz.', 'wiki-minor-major-seventh'],
  halfDim7: ['大调 vii 上的导七和弦、自然小调 ii 上的七和弦；被形容为"相当不稳定"，常用于情绪强烈的段落（如巴赫《马太受难曲》开头合唱）。', '長調 vii の導七、自然短音階 ii の七の和音。「かなり不安定」とされ、感情の高まる箇所（バッハ《マタイ受難曲》冒頭合唱など）で使われます。', 'The leading-tone seventh on vii in major and the seventh chord on ii in natural minor; described as having considerable instability, it often marks heightened emotion (e.g. the opening chorus of Bach’s St Matthew Passion).', 'wiki-half-diminished'],
  dim7: ['和声小调导音上的七和弦，具有属功能；两个三全音通常向内解决。由小三度叠成，各转位听起来相同。', '和声的短音階の導音上の七の和音で属機能をもち、二つの三全音はふつう内側へ解決します。短三度の積み重ねなので転回しても同じ響き。', 'The leading-tone seventh of harmonic minor with dominant function; its two tritones usually resolve inward. Built of minor thirds, its inversions sound alike.', 'wiki-diminished-seventh'],
  aug7: ['通常作属和弦，解决到下方五度的和弦；升高的五音成为主和弦三音的导音。', 'ふつう属和音として 5 度下の和音へ解決。上げた 5 度が主和音の 3 度への導音になります。', 'Usually acts as a dominant resolving down a fifth; the raised fifth leads to the third of the tonic.', 'wiki-augmented-seventh'],
  augMaj7: ['I 上的增三和弦可以包含大七度。', 'I 上のオーグメントは長七度を含むことがあります。', 'An augmented chord on I may contain the major seventh.', 'wiki-augmented-triad'],
  dom7b5: ['最常见的变化属和弦之一（降低五音）。', '最もよく使われる変化ドミナントの一つ（5 度を下げる）。', 'One of the most common altered dominants (lowered fifth).', 'wiki-altered-chord'],
  sus7: ['十一和弦省略三音与九音即成 7sus4。', '十一の和音から 3 度と 9 度を省くと 7sus4 になります。', 'An eleventh chord without its third and ninth reduces to 7sus4.', 'wiki-chord-notation'],
  dom9: ['属七和弦加大九度；排列时最常省略五音。', '属七に長 9 度を加えたもの。配置ではふつう 5 度を省きます。', 'A dominant seventh with a major ninth; voicings most often omit the fifth.', 'wiki-chord-notation'],
  maj9: ['大七和弦加大九度；排列时最常省略五音。', '長七に長 9 度を加えたもの。5 度を省くことが多い。', 'A major seventh with a major ninth; the fifth is the usual omission.', 'wiki-chord-notation'],
  min9: ['小七和弦加大九度。', '短七に長 9 度を加えたもの。', 'A minor seventh with a major ninth.', 'wiki-chord-notation'],
  dom7b9: ['属七和弦加小九度（属小九和弦），色彩更紧张的属和弦。', '属七に短 9 度を加えたもの。より緊張したドミナント。', 'A dominant seventh with a minor ninth — a tenser dominant.', 'wiki-chord-notation', 'wiki-altered-chord'],
  dom7s9: ['属七和弦加升九度；升九度与小三度同音，属变化属和弦。', '属七に増 9 度を加えたもの。増 9 度は短 3 度と異名同音で、変化ドミナントです。', 'A dominant seventh with a raised ninth, enharmonic to a minor third — an altered dominant.', 'omt2e-chord-symbols', 'wiki-altered-chord'],
  dom7s11: ['属七和弦加升十一度（增十一度，例如 C7(♯11) 含 F♯）。', '属七に増 11 度を加えたもの（C7(♯11) は F♯ を含む）。', 'A dominant seventh with an augmented eleventh (C7(♯11) contains F♯).', 'omt2e-chord-symbols'],
  dom9s11: ['属九和弦加升十一度；省略五音时听起来接近 9♭5。', '属九に増 11 度を加えたもの。5 度を省くと 9♭5 に近い響き。', 'A dominant ninth with a raised eleventh; without the fifth it sounds like a 9♭5.', 'wiki-chord-notation'],
  dom11: ['属九和弦再加十一度；省略三音即成 9sus4。', '属九にさらに 11 度を加えたもの。3 度を省くと 9sus4 になります。', 'A dominant ninth plus an eleventh; omitting the third reduces it to 9sus4.', 'wiki-chord-notation'],
  min11: ['小九和弦再加十一度。', '短九にさらに 11 度を加えたもの。', 'A minor ninth plus an eleventh.', 'wiki-chord-notation'],
  dom13: ['理论上包含音阶全部七个音；实际常只弹根音、三音、七音与十三音（钢琴常排成 C–B♭–E–A）。', '理論上は音階の 7 音すべてを含みますが、実際はルート・3 度・7 度・13 度だけで弾くことが多い（ピアノでは C–B♭–E–A など）。', 'In theory all seven scale notes; in practice often just root, third, seventh and thirteenth (on piano e.g. C–B♭–E–A).', 'wiki-chord-notation'],
  maj13: ['大七和弦延伸到十三度；同样常省略五音与十一度。', '長七を 13 度まで延ばしたもの。5 度と 11 度は省かれがち。', 'A major seventh extended to the thirteenth; the fifth and eleventh are commonly left out.', 'wiki-chord-notation'],
  min13: ['小七和弦延伸到十三度。', '短七を 13 度まで延ばしたもの。', 'A minor seventh extended to the thirteenth.', 'wiki-chord-notation'],
  alt: ['属和弦的极端张力形式：只保留根音、大三度、小七度三个必要音，其余全部变化（♭9／♯9、♭5／♯11、♯5／♭13），自然的 9、11、5、13 都不用。"7alt" 用来代替 C7♯5♭9♯9♯11 这类冗长写法；具体弹哪几个变化音、怎么排列由演奏者决定，所以和弦音不固定。旋律上常配变化音阶，为属和弦增加张力。', '属和音の緊張を極限まで高めた形。根音・長 3 度・短 7 度の 3 つの必須音だけを残し、他はすべて変化させます（♭9／♯9、♭5／♯11、♯5／♭13）。自然な 9・11・5・13 は使いません。「7alt」は C7♯5♭9♯9♯11 のような長い表記の代わりで、どの変化音をどう配置するかは奏者次第なので構成音は固定されません。オルタード・スケールと組み合わせます。', 'The most tense form of a dominant: only root, major third and minor seventh are kept and everything else is altered (♭9/♯9, ♭5/♯11, ♯5/♭13); the natural 9, 11, 5 and 13 are absent. “7alt” replaces long names like C7♯5♭9♯9♯11, and which altered tones to play and how to voice them is up to the player — so its tones are not fixed. It pairs with the altered scale over the dominant.', 'wiki-altered-scale'],
  blk: ['日本流行乐中发现并命名的和弦（Joshua Taipale，2017），音响张力极强、与全音音阶对应。按语境有几种作用：① 全音音阶段落中的和弦；② 分数和弦——半音进行中瞬间形成的偶成和弦，或演奏 aug 时只有低音作三全音翻转；③ 属九型——V、副属、代理属省略三音并降五/升十一，之后多解决到大七和弦；④ 半减型——之后接属和弦；⑤ 增六型——属和弦前的 ♭II（那不勒斯语境）。它是"总称"，具体写法依语境而定。', '日本のポップスで見つかり命名された和音（Joshua Taipale、2017）。ホールトーンに対応する強い緊張感。文脈により：① ホールトーンの場面、② スラッシュコード型（半音進行の途中に生じる偶成和音、aug を弾く中でベースだけが三全音反転）、③ 属九型（V・二次・代理ドミナントの 3 度を抜き -5／+11 にしたもの。後続はメジャー・セブンスなど）、④ ハーフディミニッシュ型（後にドミナントが続く）、⑤ 増六型（ドミナント前の ♭II、ナポリの文脈）。総称であり、具体的な表記は文脈で決まります。', 'A chord found and named in Japanese pop (Joshua Taipale, 2017), very tense and matching the whole-tone scale. By context: (1) inside whole-tone passages; (2) a slash chord — a passing sonority from chromatic lines, or only the bass flipping by a tritone under an aug chord; (3) dominant-ninth type — V, secondary or substitute dominants with the third omitted and ♭5/♯11, usually resolving to a major seventh; (4) half-diminished type, followed by a dominant; (5) augmented-sixth type — ♭II before the dominant (Neapolitan context). It is an umbrella term; the exact spelling depends on context.', 'soundquest-blk'],
};

const TEXT = {
  zh: {
    altNow: (name) => `本次实现：${name}`, altRefresh: '换一组和弦音', altNote: 'alt 没有固定的和弦音：每次随机选 2～3 个变化音，并随机决定三音在七音之下或之上。', slashTitle: '斜杠和弦', slashInv: (n, d) => `低音是和弦的${d}，即第 ${n} 转位。`, slashTension: (d) => `低音是和弦的${d}（延伸音作低音）。`, slashNon: '低音不是和弦音：这是"上方结构"式的斜杠和弦，低音另外叠在和弦之下。', modsTitle: '加音与省略', addMod: (label) => `add${label}：加入 ${label} 度`, omitMod: (d) => `omit${d}（也写作 no${d}）：省略${d === 3 ? '三音' : d === 5 ? '五音' : ` ${d} 度`}`,
    notationRows: [['斜杠和弦', 'C/E、C/F#', '斜杠后是低音：低音为和弦音时是转位（C/E 第一转位、C/G 第二转位），不是和弦音时是上方结构（低音另外叠在下面）。'], ['加音 add', 'Cadd9、Cadd11、C7add13', '在和弦上加入指定的音，不连带加入其间的延伸音；七度默认是小七度，其余为大/纯音程。'], ['省略 omit / no', 'C7omit3、C9no5', '省略指定的音，例如去掉三音得到不大不小的和弦。'], ['强力和弦', 'C5、G5', '只有根音与五度，严格说是音程。']],
    kicker: '参考', title: '和弦标记查询',
    intro: '输入任意写法的和弦标记（Cm、C-、C°、DΔ、E+、Em7b5、Eø7、Bdim7、A#aug/C、Cblk……），查看不带特殊符号的标准写法、其他写法、组成音、五线谱与作用。',
    tabs: { lookup: '查询', table: '全部和弦一览' },
    input: '和弦标记', look: '查询', examples: '示例', notFound: '无法识别这个写法。请确认根音为 A–G（可加 # 或 b），后面是和弦性质，例如 m7b5、maj7、dim7、sus4。',
    other: (n) => `其他写法（${n}）`, tones: '组成音', explain: (name, parts) => `${name} = ${parts}`, rootWord: '根音',
    roles: { root: '根音', second: '二度', third: '三音', fourth: '四度', fifth: '五音', sixth: '六音', seventh: '七音', ninth: '九音', eleventh: '十一音', thirteenth: '十三音' },
    q: { P: '纯', M: '大', m: '小', A: '增', d: '减', AA: '倍增', dd: '倍减' }, deg: (n) => `${n} 度`,
    function: '作用', playBlock: '► 柱式', playArp: '► 分解', openChord: (n) => `在和弦转换中查看 ${n}`,
    deltaNote: 'Δ 单独使用有歧义：有人把它当作 M（大三和弦），有人当作 M7。这里按 maj7 解释。',
    dimNote: '有些爵士谱中 C° / Cdim 实际指减七和弦（Cdim7）。',
    blkTitle: 'Blackadder 的几种读法（同一组音，拼写随语境不同）', blkReadings: { slash: 'aug 和弦 + 低音（分数和弦）', b5: '属九降五、省略三音', aug6: '增六 + 升十一、省略三音' },
    blkEnharmonic: (input, used) => `输入中的 ${input} 与 ${used} 同音；按"aug 根音在低音下方全音"的定义写作 ${used}。`,
    head: ['和弦', '标准写法（以 C 为例）', '其他写法', '组成（自根音）', '作用'],
  },
  ja: {
    altNow: (name) => `今回の構成：${name}`, altRefresh: '別の構成にする', altNote: 'alt の構成音は固定されていません。毎回 2～3 個の変化音を選び、3 度を 7 度の下に置くか上に置くかもランダムに決めます。', slashTitle: '分数コード', slashInv: (n, d) => `ベースはコードの${d}で、第 ${n} 転回形です。`, slashTension: (d) => `ベースはコードの${d}（テンションがベース）。`, slashNon: 'ベースはコード音ではありません。「アッパー・ストラクチャー」型の分数コードで、ベースを別に下に置きます。', modsTitle: '付加と省略', addMod: (label) => `add${label}：${label} 度を加える`, omitMod: (d) => `omit${d}（no${d} とも）：${d} 度を省く`,
    notationRows: [['分数コード', 'C/E、C/F#', 'スラッシュの後はベース。コード音なら転回形（C/E は第 1 転回、C/G は第 2 転回）、コード音でなければアッパー・ストラクチャー。'], ['付加 add', 'Cadd9、Cadd11、C7add13', '指定した音だけを加え、その間のテンションは含みません。7 度は短 7 度、その他は長／完全が既定。'], ['省略 omit / no', 'C7omit3、C9no5', '指定した音を省きます。3 度を抜くと長短の決まらない響きに。'], ['パワーコード', 'C5、G5', 'ルートと 5 度だけで、厳密には音程。']],
    kicker: '参照', title: 'コード表記の検索',
    intro: 'どんな書き方のコード表記でも（Cm、C-、C°、DΔ、E+、Em7b5、Eø7、Bdim7、A#aug/C、Cblk…）、記号を使わない標準表記、別表記、構成音、譜例、役割を表示します。',
    tabs: { lookup: '検索', table: 'コード一覧' },
    input: 'コード表記', look: '検索', examples: '例', notFound: 'この表記を認識できません。ルートは A–G（# か b 付き）、続けて m7b5・maj7・dim7・sus4 などの種類を書いてください。',
    other: (n) => `別の表記（${n}）`, tones: '構成音', explain: (name, parts) => `${name} = ${parts}`, rootWord: 'ルート',
    roles: { root: 'ルート', second: '2 度', third: '3 度', fourth: '4 度', fifth: '5 度', sixth: '6 度', seventh: '7 度', ninth: '9 度', eleventh: '11 度', thirteenth: '13 度' },
    q: { P: '完全', M: '長', m: '短', A: '増', d: '減', AA: '重増', dd: '重減' }, deg: (n) => `${n} 度`,
    function: '役割', playBlock: '► 和音', playArp: '► 分散', openChord: (n) => `コード変換で ${n} を見る`,
    deltaNote: 'Δ 単独は曖昧で、M（長三和音）とする人も M7 とする人もいます。ここでは maj7 と解釈します。',
    dimNote: 'ジャズの譜面では C° / Cdim が減七（Cdim7）を意味することもあります。',
    blkTitle: 'ブラックアダーの読み方（同じ音でも文脈で綴りが変わる）', blkReadings: { slash: 'aug + ベース（分数コード）', b5: '9(-5) 3 度省略', aug6: '+6(+11) 3 度省略' },
    blkEnharmonic: (input, used) => `入力の ${input} は ${used} と異名同音。「aug のルートはベースの全音下」という定義に従い ${used} と書きます。`,
    head: ['コード', '標準表記（C の例）', '別の表記', '構成（ルートから）', '役割'],
  },
  en: {
    altNow: (name) => `This realization: ${name}`, altRefresh: 'New set of tones', altNote: 'alt has no fixed tones: each time 2–3 altered tensions are chosen at random, and the third is placed below or above the seventh at random.', slashTitle: 'Slash chord', slashInv: (n, d) => `The bass is the chord’s ${d}: inversion ${n}.`, slashTension: (d) => `The bass is the chord’s ${d} (a tension in the bass).`, slashNon: 'The bass is not a chord tone: an upper-structure slash chord with the bass added underneath.', modsTitle: 'Added and omitted tones', addMod: (label) => `add${label}: adds the ${label}`, omitMod: (d) => `omit${d} (also no${d}): leaves out the ${d === 3 ? 'third' : d === 5 ? 'fifth' : d}`,
    notationRows: [['Slash chord', 'C/E, C/F#', 'The note after the slash is the bass: a chord tone gives an inversion (C/E first, C/G second); a non-chord tone gives an upper structure over that bass.'], ['Added tone (add)', 'Cadd9, Cadd11, C7add13', 'Adds just that tone without the extensions in between; a seventh defaults to minor, others to major/perfect.'], ['Omission (omit / no)', 'C7omit3, C9no5', 'Leaves out that tone — dropping the third gives a chord that is neither major nor minor.'], ['Power chord', 'C5, G5', 'Root and fifth only — strictly an interval.']],
    kicker: 'Reference', title: 'Chord symbol lookup',
    intro: 'Type a chord symbol in any notation (Cm, C-, C°, DΔ, E+, Em7b5, Eø7, Bdim7, A#aug/C, Cblk…) to see the plain canonical symbol, other notations, the spelled chord tones, the staff and what the chord does.',
    tabs: { lookup: 'Lookup', table: 'All chords' },
    input: 'Chord symbol', look: 'Look up', examples: 'Examples', notFound: 'Couldn’t read that symbol. Start with a root A–G (optionally # or b), then the quality such as m7b5, maj7, dim7 or sus4.',
    other: (n) => `Other notations (${n})`, tones: 'Chord tones', explain: (name, parts) => `${name} = ${parts}`, rootWord: 'root',
    roles: { root: 'root', second: 'second', third: 'third', fourth: 'fourth', fifth: 'fifth', sixth: 'sixth', seventh: 'seventh', ninth: 'ninth', eleventh: 'eleventh', thirteenth: 'thirteenth' },
    q: { P: 'perfect', M: 'major', m: 'minor', A: 'augmented', d: 'diminished', AA: 'doubly augmented', dd: 'doubly diminished' }, deg: (n) => `${n}${n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th'}`,
    function: 'What it does', playBlock: '► Block', playArp: '► Arpeggio', openChord: (n) => `Open ${n} in Chord Conversion`,
    deltaNote: 'A bare Δ is ambiguous: some use it for M (major triad), others for M7. It is read as maj7 here.',
    dimNote: 'Some jazz charts mean the diminished seventh (Cdim7) by C° / Cdim.',
    blkTitle: 'Readings of the Blackadder (same notes, spelling depends on context)', blkReadings: { slash: 'aug chord over a bass (slash chord)', b5: 'ninth flat five, no third', aug6: 'augmented sixth with ♯11, no third' },
    blkEnharmonic: (input, used) => `${input} in the input equals ${used}; by the definition (aug root a whole step below the bass) it is written ${used}.`,
    head: ['Chord', 'Canonical (on C)', 'Other notations', 'Tones (from the root)', 'What it does'],
  },
};

const LANG_INDEX = { zh: 0, ja: 1, en: 2 };
const ROLE_NAME = { 1: 'root', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth', 6: 'sixth', 7: 'seventh', 9: 'ninth', 11: 'eleventh', 13: 'thirteenth' };
const pretty = (name) => name.replace(/##/g, '𝄪').replace(/#/g, '♯').replace(/([A-G])bb(?!lk)/g, '$1𝄫').replace(/([A-G])b(?!lk)/g, '$1♭');

export function mountChordSymbols(target, { playChord, conv }) {
  const lang = language();
  const t = TEXT[lang];
  const li = LANG_INDEX[lang];
  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  target.addEventListener('toolbox-stop', stop);
  const intervalName = (interval) => {
    if (!interval) return t.rootWord;
    const quality = t.q[interval.quality] ?? interval.quality;
    return lang === 'en' ? `${quality} ${t.deg(interval.generic)} (${interval.name})` : `${quality} ${t.deg(interval.generic)}（${interval.name}）`;
  };
  const functionBlock = (qualityId) => {
    const entry = FUNCTIONS[qualityId];
    const p = el('p', 'mk-hint', entry[li]);
    entry.slice(3).forEach((ref) => p.appendChild(cite(SOURCES, ref)));
    return p;
  };

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));
  root.appendChild(head);
  const body = el('div', 'mk-section');
  const views = {};
  let pending = null;

  views.lookup = () => {
    const wrap = el('div', 'mk-section');
    const input = el('input');
    input.type = 'text';
    input.value = pending || 'Em7b5';
    pending = null;
    input.spellcheck = false;
    const controls = el('div', 'mk-controls');
    controls.append(field(t.input, input, 'mk-grow'), button('btn btn-primary btn-sm', t.look, () => paint()));
    const examples = el('div', 'mk-actions');
    examples.appendChild(el('span', 'mk-meta', t.examples));
    EXAMPLES.forEach((ex) => examples.appendChild(button('btn btn-ghost btn-sm', ex, () => { input.value = ex; paint(); })));
    const result = el('div', 'mk-section');
    wrap.append(controls, examples, result);

    function paint() {
      stop();
      result.replaceChildren();
      const chord = parseChordSymbol(input.value);
      if (!chord) { result.appendChild(el('p', 'mk-callout is-error', t.notFound)); return; }
      const card = el('div', 'mk-card chordsym-card');
      const top = el('div', 'chordsym-top');
      const name = el('div', 'chordsym-name', pretty(chord.canonical));
      top.append(name, el('span', 'mk-badge is-accent', NAMES[chord.quality][li]));
      card.appendChild(top);

      if (chord.aliases.length) {
        const details = el('details', 'chordsym-aliases');
        details.appendChild(el('summary', '', t.other(chord.aliases.length)));
        const list = el('div', 'mk-actions');
        chord.aliases.forEach((alias) => list.appendChild(button('chordsym-alias chordsym-alias-btn', alias, () => { input.value = alias; paint(); })));
        details.appendChild(list);
        card.appendChild(details);
      }
      if (chord.ambiguous === 'delta') card.appendChild(el('p', 'mk-callout', t.deltaNote)).appendChild(cite(SOURCES, 'wiki-chord-notation'));
      if (chord.ambiguous === 'dim') card.appendChild(el('p', 'mk-callout', t.dimNote)).appendChild(cite(SOURCES, 'wiki-diminished-seventh'));

      if (chord.realization) {
        const altBox = el('div', 'mk-actions');
        altBox.append(el('span', 'mk-badge is-brass', t.altNow(pretty(chord.realization).replace(/b(?=\d)/g, '♭'))), withIcon(button('btn btn-secondary btn-sm', '', () => paint()), 'refresh', t.altRefresh));
        const note = el('p', 'mk-hint', t.altNote);
        note.append(cite(SOURCES, 'wiki-altered-scale'), cite(SOURCES, 'omt2e-jazz-voicings'));
        card.append(altBox, note);
      }
      if (chord.slash) {
        const info = chord.slash;
        const text = info.kind === 'inversion' ? t.slashInv(info.inversion, t.roles[ROLE_NAME[info.degree]]) : info.kind === 'tension-bass' ? t.slashTension(t.roles[ROLE_NAME[info.degree]]) : t.slashNon;
        const p = el('p', 'mk-callout', `${t.slashTitle}：${text}`);
        p.appendChild(cite(SOURCES, 'wiki-chord-notation'));
        card.appendChild(p);
      }
      if (chord.modifiers?.length) {
        const p = el('p', 'mk-hint', `${t.modsTitle}：${chord.modifiers.map((m) => (m.kind === 'add' ? t.addMod(`${m.alter > 0 ? '♯' : m.alter < 0 ? '♭' : ''}${m.degree}`) : t.omitMod(m.degree))).join('；')}`);
        p.append(cite(SOURCES, 'wiki-chord-notation'), cite(SOURCES, 'omt2e-chord-symbols'));
        card.appendChild(p);
      }
      const tones = describeTones(chord);
      const row = el('div', 'mk-notes');
      tones.forEach((tone) => {
        const chip = el('div', `mk-note${tone.role === 'root' ? ' is-tonic' : ''}`);
        chip.append(el('span', 'mk-note-top', `${t.roles[tone.role]} · ${tone.label}`), el('strong', '', pretty(tone.name)), el('small', '', intervalName(tone.interval)));
        row.appendChild(chip);
      });
      card.append(el('h4', '', t.tones), row);
      const parts = tones.map((tone) => (tone.role === 'root' ? `${t.rootWord} ${pretty(tone.name)}` : `${intervalName(tone.interval)} ${pretty(tone.name)}`)).join(' + ');
      const explain = el('p', 'mk-hint', t.explain(pretty(chord.canonical), parts));
      explain.append(cite(SOURCES, 'omt-triads'), cite(SOURCES, 'omt2e-chord-symbols'));
      card.appendChild(explain);

      const staffBox = el('div', 'mk-staff-scroll');
      const frequencies = chord.pitches.map((p) => midiToFrequency(parsePitch(p).midi));
      staffBox.appendChild(renderStaff({
        staves: [{ clef: chooseClef(chord.pitches), bars: [[{ p: chord.pitches, d: 4 }]] }], beats: 4, top: 40, rowGap: 40,
        labels: [{ bar: 0, beat: 0, text: chord.canonical }], ariaLabel: `${chord.canonical}: ${chord.pitches.join(' ')}`,
        onNote: () => playChord(frequencies, 1.6),
      }));
      card.appendChild(staffBox);
      const actions = el('div', 'mk-actions');
      actions.append(
        button('btn btn-secondary btn-sm', t.playBlock, () => { stop(); playChord(frequencies, 1.8); }),
        button('btn btn-ghost btn-sm', t.playArp, () => { stop(); frequencies.forEach((hz, i) => timers.push(setTimeout(() => playChord([hz], 1.4, { interrupt: i === 0 }), i * 260))); }),
      );
      // 和弦转换面板能解析时才给出链接
      try { if (conv?.parseAndGetNotes(chord.canonical)) actions.appendChild(crossLink('chord', t.openChord(chord.canonical), chord.canonical)); } catch (_) { /* 主面板不支持的写法 */ }
      card.appendChild(actions);

      if (chord.blk) {
        const blk = el('div', 'mk-section');
        blk.appendChild(el('h4', '', t.blkTitle));
        chord.blk.readings.forEach((reading) => blk.appendChild(el('p', 'mk-hint', `${t.blkReadings[reading.kind]}${lang === 'en' ? ': ' : '：'}${reading.name} = ${reading.notes.map(pretty).join(' ')}`)));
        if (chord.blk.enharmonicInput) blk.appendChild(el('p', 'mk-hint', t.blkEnharmonic(pretty(chord.blk.enharmonicInput), pretty(chord.blk.aug))));
        blk.lastChild.appendChild(cite(SOURCES, 'soundquest-blk'));
        card.appendChild(blk);
      }
      card.append(el('h4', '', t.function), functionBlock(chord.quality));
      result.appendChild(card);
    }
    input.addEventListener('keydown', (event) => { if (event.key === 'Enter') paint(); });
    paint();
    return wrap;
  };

  views.table = () => {
    const wrap = el('div', 'mk-table-wrap');
    const table = el('table', 'mk-table chordsym-table');
    const thead = el('thead');
    const tr = el('tr');
    t.head.forEach((h) => tr.appendChild(el('th', '', h)));
    thead.appendChild(tr);
    const tbody = el('tbody');
    QUALITIES.forEach((quality) => {
      const chord = quality.id === 'blk' ? parseChordSymbol('Cblk') : buildChord('C', quality, null);
      const row = el('tr');
      const nameCell = el('td', 'mk-strong');
      nameCell.appendChild(button('btn btn-ghost btn-sm', NAMES[quality.id][li], () => { pending = chord.canonical; navigation.select('lookup'); }));
      const tones = quality.random
        ? `C(1) E(3) B♭(♭7) + ${lang === 'en' ? 'altered tones' : lang === 'ja' ? '変化音' : '变化音'} D♭(♭9) / D♯(♯9) / G♭(♭5) = F♯(♯11) / G♯(♯5) = A♭(♭13)`
        : describeTones(chord).map((tone) => `${pretty(tone.name)}(${tone.label})`).join(' ');
      const fn = el('td', 'chordsym-fn', FUNCTIONS[quality.id][li]);
      FUNCTIONS[quality.id].slice(3).forEach((ref) => fn.appendChild(cite(SOURCES, ref)));
      // 标准写法与其他写法都可以点击，切到"查询"页显示
      const canonicalCell = el('td', 'mk-strong');
      canonicalCell.appendChild(button('btn btn-ghost btn-sm', chord.canonical, () => { pending = chord.canonical; navigation.select('lookup'); }));
      const aliasCell = el('td', 'chordsym-alias-cell');
      chord.aliases.slice(0, 6).forEach((alias) => aliasCell.appendChild(button('chordsym-alias chordsym-alias-btn', alias, () => { pending = alias; navigation.select('lookup'); })));
      row.append(nameCell, canonicalCell, aliasCell, el('td', '', tones), fn);
      tbody.appendChild(row);
    });
    // 写法说明行：名称与每个示例都可点击，切到"查询"页并显示该示例
    const showInLookup = (symbol) => { pending = symbol; navigation.select('lookup'); };
    t.notationRows.forEach(([name, examples, explanation]) => {
      const row = el('tr');
      const list = examples.split(/[、,]\s*/).map((item) => item.trim()).filter(Boolean);
      const nameCell = el('td', 'mk-strong');
      nameCell.appendChild(button('btn btn-ghost btn-sm', name, () => showInLookup(list[0])));
      const exampleCell = el('td', 'mk-strong');
      list.forEach((symbol) => exampleCell.appendChild(button('btn btn-ghost btn-sm', symbol, () => showInLookup(symbol))));
      const fn = el('td', 'chordsym-fn', explanation);
      fn.appendChild(cite(SOURCES, 'wiki-chord-notation'));
      row.append(nameCell, exampleCell, el('td', '', '—'), el('td', '', '—'), fn);
      tbody.appendChild(row);
    });
    table.append(thead, tbody);
    wrap.appendChild(table);
    return wrap;
  };

  const navigation = tabs(root, Object.entries(t.tabs).map(([id, label]) => ({ id, label })), (id) => {
    stop();
    body.replaceChildren(views[id]());
  });
  root.append(body, relatedLinks(['chord', 'ear', 'cst']), sourcesFooter(SOURCES));
  target.appendChild(root);
  navigation.select('lookup');
  // 链接参数 / 全站搜索：#chordsymbols?q=Cm7b5
  target.addEventListener('toolbox-query', (event) => { if (event.detail) { pending = String(event.detail); navigation.select('lookup'); } });
}

export { NAMES as CHORD_QUALITY_NAMES, FUNCTIONS as CHORD_FUNCTIONS, qualityById };

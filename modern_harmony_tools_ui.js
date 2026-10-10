import { el, field, option, button, language, sourcesFooter, relatedLinks } from './module_kit.js';
import { removeSpectralComponent, addSpectralComponent, chordSymbolNotes, DEFAULTS, PRESETS, MODEL_OF, MODERN_TOOL_IDS, SCALES, createToolPlayer, noteLabel, hz, numberIn, ToolInputError } from './modern_harmony_tools.js?v=20261010-mh2';
import { playSinePartials } from './modern_harmony_audio.js';

// ref:omt2e-chord-symbols
// ref:wiki-parallel-harmony ref:wiki-chromatic-mediant ref:wiki-polytonality ref:wiki-petrushka-chord ref:wiki-octatonic ref:wiki-atonality ref:wiki-spectral-music ref:wiki-limit
// ref:rubin-nonfunctional ref:koozin-planing ref:arndt-tonality
// ref:omt2e-normal-order ref:omt2e-prime-form ref:omt2e-ic-vector
// ref:ircam-spectrum ref:ircam-spectral ref:gann-ji ref:gann-ji-reasons
export const TOOL_COPY = {
  nonfunctional: {
    extra: ['“连接”一栏逐个标出：等距平行（每个声部移动同样的半音数）、音阶内平行（同方向移动、两个和弦都在同一个自然音集里）、半音中音（根音相距三度、同为大三或小三、一个共同音）、双重半音中音（性质相反、没有共同音），以及共同音个数。平行移动削弱和声进行感；半音中音在浪漫派以后和印象派音乐里更常见。', '「連結」欄に、実平行（各声部が同じ半音数だけ動く）、音階内の平行（同方向に動き、両方の和音が同じ全音階に入る）、半音的中音（根音が 3 度離れ、同じ長・短、共通音一つ）、二重半音的中音（長短が逆で共通音なし）と共通音の数を示します。平行移動は和声進行感を弱め、半音的中音はロマン派以降と印象派で多く使われます。', 'The Connection column marks exact planing (every voice moves by the same number of semitones), diatonic planing (same direction, both chords within one diatonic collection), chromatic mediants (roots a third apart, same quality, one common tone), doubly chromatic mediants (opposite quality, no common tone) and the number of common tones. Planing weakens the sense of progression; chromatic mediants became more common from the Romantic period and in impressionism.'],
    title: ['非功能和声', '非機能和声', 'Nonfunctional harmony'],
    intro: ['把一个音响平行移动，或用共同音与持续低音连接不同和弦。观察每条声部的变化，再听整个过程。', '響きを平行移動したり、共通音と持続低音で和音を結んだりします。各声部の動きを見て全体を聴きます。', 'Move a sonority in parallel, or connect chords with common tones and a pedal. Follow each voice and hear the whole sequence.'],
    hint: ['等距平移按半音保留音程；音阶内平移按级数移动，音程可能改变。共同音只按音级比较；声部位移按输入顺序逐条比较，不自动重新配音。是否有功能或中心仍要结合上下文判断。', '実平行は半音で移動して音程を保ちます。音階内の平行では音程が変わり得ます。共通音は音級、声部の移動は入力順で比較し、自動配置はしません。機能や中心は文脈で判断します。', 'Exact planing preserves semitone intervals; diatonic planing moves by scale steps and may change them. Common tones compare pitch classes; voice movement follows input order without revoicing. Function and centricity require context.'],
    presets: [['等距平行', '実平行', 'Exact planing'], ['音阶内平行', '音階内の平行', 'Diatonic planing'], ['共同音与持续低音', '共通音と持続低音', 'Common tones & pedal'], ['半音中音与双重半音中音', '半音的中音と二重半音的中音', 'Chromatic & doubly chromatic mediants']],
    refs: ['rubin-nonfunctional', 'koozin-planing', 'arndt-tonality', 'wiki-parallel-harmony', 'wiki-chromatic-mediant', 'omt2e-chord-symbols'], links: ['progression', 'classical'],
  },
  polytonality: {
    extra: ['“纵向”一栏把两层的音合起来看：各层是否是三和弦、合起来的集合类、是否是相距三全音的两个大三和弦（彼得鲁什卡和弦），以及是否全部落在一个八声音集里——van den Toorn 用八声音集解释斯特拉文斯基的这种“对立”。两个和弦叠在一起只是复合和弦；双调性还需要重音、重复和各层的旋律来支持各自的中心。', '「縦の分析」で二層の音を合わせて見ます：各層が三和音か、合わせた集合のセット・クラス、三全音離れた二つの長三和音（ペトルーシュカ和音）か、すべて一つの八音音階に入るか。ファン・デン・トールンはストラヴィンスキーのこの「対立」を八音音階で説明しました。二つの和音を重ねただけではポリコードで、複調にはアクセント・反復・各層の旋律による中心の支えが要ります。', 'The Vertical analysis combines both layers: whether each layer is a triad, the set class of the union, whether it is two major triads a tritone apart (the Petrushka chord) and whether it lies in one octatonic collection — van den Toorn’s account of such Stravinskian “opposition”. Two stacked chords are only a polychord; bitonality also needs accents, repetition and melodic expression supporting each centre.'],
    title: ['多调性', '多調性', 'Polytonality'],
    intro: ['给两条旋律各自的中心、音阶、音区和节奏。分别试听，再让它们同时进行。', '二つの旋律に別々の中心、音階、音域、リズムを設定します。単独で聴いてから重ねます。', 'Give two melodies their own centers, scales, registers and rhythms. Hear each independently, then combine them.'],
    hint: ['旋律用音阶级数表示：1 是所填中心音，七声音阶的 8 是高八度，全音音阶用 7；1:2 表示第一级持续 2 拍，r:1 表示休止 1 拍。两层分别重复，不等待另一层结束。两个和弦的叠置本身不足以证明多调性；相同中心的不同音阶也不等于双调性。', '旋律は音階の度数です。1 は指定した中心音、7音音階の8（全音音階の7）は上のオクターブ。1:2 は第1音を2拍、r:1 は1拍の休符です。各層は独立して反復します。和音を重ねるだけで多調性とは断定できず、同じ中心の異なる音階も複調とは限りません。', 'Use scale degrees: 1 is the entered center, 8 the upper octave in seven-note scales (7 in whole-tone); 1:2 holds degree 1 for two beats, r:1 rests for one beat. Layers repeat independently. A polychord alone does not establish polytonality, and different scales with one center do not establish bitonality.'],
    presets: [['C 与 D', 'C と D', 'C and D'], ['C 与 F♯', 'C と F♯', 'C and F♯'], ['同中心对照', '同じ中心で比較', 'Same-center comparison'], ['彼得鲁什卡和弦（C 大三 + F♯ 大三）', 'ペトルーシュカ和音（C + F♯）', 'Petrushka chord (C + F♯ major)']],
    refs: ['arndt-tonality', 'wiki-polytonality', 'wiki-petrushka-chord', 'wiki-octatonic', 'omt2e-prime-form'], links: ['circle', 'counterpoint'],
  },
  atonality: {
    extra: ['填入第二个动机，可以看它和原动机是不是同一个音级集合的移位（Tn）或倒影（TnI）——自由无调性作品常用一个小“细胞”的各种变形来组织音乐。下方还逐条对照 Kostka 与 Payne 归纳的勋伯格四个做法：避免八度、避免大小三和弦、避免连续超过三个音来自同一个自然音阶、多用跳进。它只描述这条旋律，不判断整首曲子。', '二つ目の動機を入れると、元の動機の音級集合の移高（Tn）か反転（TnI）かが分かります。自由無調の作品は小さな「細胞」の変形で音楽を組み立てることが多いです。下ではコストカとペインがまとめたシェーンベルクの四つの手法（オクターヴを避ける、長短三和音を避ける、同じ全音階から 4 音以上続けない、跳躍を多く）と照合します。この旋律の記述であり、曲全体の判定ではありません。', 'Enter a second motif to see whether it is a transposition (Tn) or inversion (TnI) of the original pitch-class set — free atonal music often builds on transformations of a small cell. Below, the melody is compared with the four procedures in Schoenberg listed by Kostka and Payne: avoid octaves, avoid major and minor triads, avoid more than three successive notes from one diatonic scale, prefer leaps. It describes this melody, not the whole piece.'],
    title: ['无调性', '無調性', 'Atonality'],
    intro: ['用自选动机比较移调、倒影、逆行与逆行倒影，保留实际音区并查看音级集合。', '選んだ動機を移調・反転・逆行・逆行反転して比較します。実際の音域と音級集合を確認できます。', 'Compare transposition, inversion, retrograde and retrograde inversion of your motif, retaining register and inspecting its pitch-class set.'],
    hint: ['倒影围绕指定轴音：新音高 = 2 × 轴音 − 原音高；之后再加半音移调。移调也作用于逆行。音高、音级与音程方向分开显示。这些变形可用于多种音乐，工具不凭一个动机判定整曲无调性。', '反転は指定した軸音を中心に行います。新しい音高 = 2 × 軸音 − 元の音高、その後に半音移調を加えます。移調は逆行にも適用します。これらの操作だけで曲全体が無調性だとは判断できません。', 'Inversion uses the entered axis: new pitch = 2 × axis − original pitch, followed by the semitone transposition. Transposition also applies to retrograde. These operations work in many kinds of music; one motif cannot establish atonality for an entire piece.'],
    presets: [['移调动机', '動機の移調', 'Transpose motif'], ['围绕 E4 倒影', 'E4 を軸に反転', 'Invert about E4'], ['逆行倒影', '逆行反転', 'Retrograde inversion']],
    refs: ['arndt-tonality', 'wiki-atonality', 'omt2e-normal-order', 'omt2e-prime-form', 'omt2e-ic-vector'], links: ['posttonal', 'counterpoint'],
  },
  spectralharmony: {
    extra: ['“近似”一栏把每个成分放到最近的半音、四分之一音或六分之一音上——格里塞把频谱里的非平均律音高近似到最近的四分之一音或六分之一音，再交给乐器演奏（器乐加法合成：每件乐器演奏一个分音）。“差音”列出相邻成分之间的一阶差音，这是频谱音乐使用的心理声学现象之一。', '「近似」欄は各成分を最も近い半音・四分音・六分音に置きます。グリゼーはスペクトルの非平均律音高を四分音や六分音に近似して楽器に割り当てました（器楽的加算合成：各楽器が一つの部分音を担当）。「差音」は隣り合う成分の一次差音で、スペクトル音楽が用いる心理音響現象の一つです。', 'The Approximation column places each component on the nearest semitone, quarter-tone or sixth-tone — Grisey approximated non-tempered spectral pitches to the nearest quarter- or sixth-tone for instruments (additive instrumental synthesis: each instrument plays one partial). Difference tones lists the first-order difference between adjacent components, one of the psychoacoustic phenomena spectral music uses.'],
    title: ['频谱和声', 'スペクトル和声', 'Spectral harmony'],
    intro: ['从基频和分音构造音响，编辑振幅与音分偏移，比较精确频率和十二平均律的近似。', '基音と部分音から響きを作り、振幅とセント偏差を編集します。正確な周波数と12平均律の近似を比べます。', 'Construct a sonority from a fundamental and partials. Edit amplitudes and cent offsets, comparing exact frequencies with 12-EDO approximations.'],
    hint: ['格式：倍数或比例:振幅:目标音分偏移，如 5:0.8:25 或 3/2:0.5:0。省略振幅时为 min(1, 1/√倍数)，省略偏移时为 0。频率 = 基频 ×（倍数或比例）× 2^(偏移×形变比例/1200)。用纯正弦合成试听；图是自建分音模型，不是录音的频谱分析。', '形式：倍率・比率:振幅:目標セント偏差（例 5:0.8:25、3/2:0.5:0）。振幅の省略値はmin(1, 1/√倍率)、偏差は0。周波数 = 基音 ×（倍率・比率）× 2^(偏差×変形率/1200)。正弦波で再生します。図は設定したモデルであり、録音の分析ではありません。', 'Syntax: multiplier or ratio:amplitude:target-cent-offset, e.g. 5:0.8:25 or 3/2:0.5:0. Defaults are min(1, 1/√multiplier) and zero offset. Frequency = fundamental × (multiplier or ratio) × 2^(offset×morph/1200). Playback synthesizes sine waves; this is a constructed partial model, not a recording analysis.'],
    presets: [['谐波和声', '倍音の和声', 'Harmonic sonority'], ['非谐分音形变', '非整数倍の変形', 'Inharmonic morph'], ['高次分音', '高次部分音', 'Upper partials']],
    refs: ['ircam-spectrum', 'ircam-spectral', 'wiki-spectral-music', 'gann-ji'], links: ['micro', 'microtonalharmony'],
  },
  microtonalharmony: {
    extra: ['每个和弦下面列出相邻两音之间的音程比例、音分和质数极限（分子、分母里最大的质因数）。例如中立三和弦 1/1–11/9–3/2 里两个三度都是 11 限的中立三度附近：11/9 约 347 音分，27/22 约 355 音分。', '各和音の下に、隣り合う二音の音程比・セント・素数リミット（分子と分母の最大の素因数）を示します。例えば中立三和音 1/1–11/9–3/2 では二つの 3 度がどちらも 11 リミットの中立 3 度付近：11/9 は約 347 セント、27/22 は約 355 セント。', 'Under each chord, the interval between adjacent notes is listed with its ratio, cents and prime limit (the largest prime factor of numerator or denominator). In the neutral triad 1/1–11/9–3/2, both thirds are 11-limit neutral thirds: 11/9 ≈ 347 cents, 27/22 ≈ 355 cents.'],
    title: ['微分音和声', '微分音和声', 'Microtonal harmony'],
    intro: ['设计两个比例和弦，改变第二个根音，用同一参考频率比较纯律与 N 平均律。', '二つの比率和音を設計し、二つ目の根音を変えます。同じ基準周波数で純正律とN平均律を比較します。', 'Design two ratio chords and change the second root, comparing just intonation with N-EDO against one reference frequency.'],
    hint: ['比例是实际频率倍数，不自动折回八度。B 的比例相对于 B 根音；两和弦量化到以 A 根音为起点的同一 N-EDO 网格，B 根音也参与量化。误差 = 平均律音分 − 目标音分；共同音要求实际音高相同。正弦试听便于比较拍频，没有“最佳律制”评分。', '比率は実周波数の倍率で、オクターブ内に折り返しません。Bの比率はBの根音に対します。Bの根音も含め、両和音をAの根音に基づく同じN平均律へ量子化します。誤差 = 平均律のセント − 目標セント。共通音は実音高で判定し、優劣は採点しません。', 'Ratios are actual frequency multipliers, without octave folding. B ratios refer to B’s root. Both chords, including B’s root, are rounded to one N-EDO grid anchored at A’s root. Error = tempered cents − target cents; common tones require identical actual pitch. Sine playback exposes beating without ranking tuning systems.'],
    presets: [['三和弦连接', '三和音の連結', 'Triad connection'], ['七限和声', '7リミット和声', '7-limit harmony'], ['81/80 音差对照', '81/80コンマの比較', '81/80 comma comparison'], ['中立三和弦（11:9）', '中立三和音（11:9）', 'Neutral triads (11:9)']],
    refs: ['gann-ji', 'gann-ji-reasons', 'wiki-limit', 'wiki-neutral-third'], links: ['micro', 'spectralharmony', 'temperaments'],
  },
};
const SPECTRUM_EDIT = {
  help: ['点击图内空白处，按该处的频率和振幅添加成分；短按已有音柱试听，长按约 0.6 秒删除；键盘 Delete / Backspace 也可删除。逐个试听按实际频率从低到高播放全部当前有声成分（包含新添加的）。精确比例（如 3/2）可在下方输入。整数倍是谐波，其他比例也可作为频率成分。最多 16 项。', '図の空白をクリックして、その位置の周波数と振幅で成分を追加。既存の柱は短く押して試聴、約0.6秒長押しで削除。Delete / Backspace でも削除できます。順次再生は追加した成分も含め、現在の有音成分を周波数の低い順に再生。3/2 など正確な比率は下で入力。整数倍は倍音、ほかの比率も周波数成分として使えます。最大16項。', 'Click empty plot space to add a component at that frequency and amplitude; tap an existing stem to audition it, or hold for about 0.6 seconds to delete it. Delete / Backspace also removes it. Separate playback plays all current audible components, including additions, in ascending frequency order. Enter exact ratios such as 3/2 below. Integer multiples are harmonics; other ratios can also be frequency components. Up to 16 entries.'],
  ratio: ['相对基频的比例（如 3/2）', '基準周波数に対する比率（例 3/2）', 'Ratio to reference (e.g. 3/2)'],
  offset: ['目标音分偏移（¢）', '目標セント偏差（¢）', 'Target cent offset (¢)'],
  add: ['添加频率成分', '周波数成分を追加', 'Add frequency component'],
  added: ['已添加', '追加しました', 'Added'],
  removed: ['已删除', '削除しました', 'Removed'], undo: ['撤销删除', '削除を戻す', 'Undo removal'],
  empty: ['暂无有声成分，可在图中或下方添加。', '有音成分がありません。図または下の欄から追加できます。', 'No audible components. Add one on the plot or below.'],
  limit: ['已达到 16 项上限；可长按音柱删除，或在上方输入框修改。', '16項の上限です。柱を長押しで削除、または上の欄で編集できます。', '16-entry limit reached. Hold a stem to remove it, or edit the input above.'],
};
const WORDS = {
  connection: ['连接', '連結', 'Connection'], realPlaning: ['等距平行', '実平行', 'exact planing'], diatonicPlaning: ['音阶内平行', '音階内の平行', 'diatonic planing'],
  chromaticMediant: ['半音中音', '半音的中音', 'chromatic mediant'], doublyMediant: ['双重半音中音', '二重半音的中音', 'doubly chromatic mediant'], commonTones: ['共同音', '共通音', 'common tones'],
  vertical: ['纵向分析', '縦の分析', 'Vertical analysis'], layerTriad: ['层的三和弦', '層の三和音', 'triad'], noTriad: ['不是单一三和弦', '単一の三和音ではない', 'not a single triad'],
  setClass: ['集合类', 'セット・クラス', 'Set class'], petrushka: ['相距三全音的两个大三和弦：彼得鲁什卡和弦（斯特拉文斯基《彼得鲁什卡》，1911）', '三全音離れた二つの長三和音：ペトルーシュカ和音（ストラヴィンスキー《ペトルーシュカ》1911）', 'Two major triads a tritone apart: the Petrushka chord (Stravinsky, Petrushka, 1911)'],
  octatonicYes: ['全部落在一个八声音集里', 'すべて一つの八音音階に入る', 'All notes lie in one octatonic collection'], octatonicNo: ['不在任何一个八声音集里', 'どの八音音階にも収まらない', 'Not within any one octatonic collection'],
  polyNote: ['复合和弦 ≠ 多调性：还要看重音、重复和各层旋律是否支持两个中心。', 'ポリコード ≠ 多調：アクセント・反復・各層の旋律が二つの中心を支えるかを見ます。', 'Polychord ≠ polytonality: check whether accents, repetition and each layer’s melody support two centres.'],
  compare: ['第二个动机（可留空）', '二つ目の動機（空欄可）', 'Second motif (optional)'], relation: ['与第二个动机的关系', '二つ目の動機との関係', 'Relation to the second motif'],
  sameSet: ['同一集合类', '同じセット・クラス', 'same set class'], differentSet: ['不同集合类', '別のセット・クラス', 'different set class'], noRelation: ['不是 Tn 或 TnI', 'Tn でも TnI でもない', 'neither Tn nor TnI'],
  checks: ['对照 Kostka 与 Payne 归纳的四个做法（原动机）', 'コストカとペインの四つの手法との照合（元の動機）', 'Against the four procedures listed by Kostka and Payne (original motif)'],
  chkOctaves: ['避免八度 / 同音重复', 'オクターヴ・同音反復を避ける', 'Avoid octaves / repeated pitch classes'], chkTriads: ['避免相邻三个音构成大小三和弦', '隣接三音の長短三和音を避ける', 'Avoid major/minor triads in three adjacent notes'], chkDiatonic: ['避免连续超过三个音来自同一个自然音阶', '同じ全音階から 4 音以上続けない', 'Avoid more than three successive notes from one diatonic scale'], chkDisjunct: ['多用跳进', '跳躍を多く', 'Prefer leaps'],
  chkOk: ['做到了', '守られている', 'met'], chkAt: ['出现在', '位置', 'at'], stepsLeaps: ['级进 {s} · 跳进 {l}', '順次 {s}・跳躍 {l}', 'steps {s} · leaps {l}'],
  grid: ['近似网格', '近似の格子', 'Approximation grid'], semi: ['半音', '半音', 'Semitone'], quarter: ['四分之一音', '四分音', 'Quarter-tone'], sixth: ['六分之一音', '六分音', 'Sixth-tone'],
  approx: ['近似', '近似', 'Approximation'], approxDev: ['近似误差（¢）', '近似誤差（¢）', 'Approx. error (¢)'], diffTones: ['相邻成分的差音（Hz）', '隣接成分の差音（Hz）', 'Difference tones of adjacent components (Hz)'],
  intervalsOf: ['相邻音程', '隣接音程', 'Adjacent intervals'], limitCol: ['质数极限', '素数リミット', 'Prime limit'], interval: ['音程', '音程', 'Interval'],
  chordName: ['和弦名', 'コード名', 'Chord name'], otherNames: ['其他读法', '別の読み方', 'Other readings'], customSonority: ['自定义音响', '指定した響き', 'Custom sonority'],
  preset: ['示例', '例', 'Example'], reset: ['恢复默认', '初期値に戻す', 'Reset'], share: ['复制参数链接', '設定リンクをコピー', 'Copy settings link'], copied: ['链接已复制', 'リンクをコピーしました', 'Link copied'], copyError: ['复制失败，请重试', 'コピーできませんでした', 'Copy failed; try again'],
  bpm: ['速度（BPM）', 'テンポ（BPM）', 'Tempo (BPM)'], play: ['播放序列', '進行を再生', 'Play sequence'], stop: ['停止', '停止', 'Stop'], ready: ['准备试听', '再生できます', 'Ready to listen'], playing: ['正在播放', '再生中', 'Playing'],
  notes: ['音高（含八度）', '音高（オクターブ付き）', 'Pitches (with octaves)'], pitches: ['音高', '音高', 'Pitches'], index: ['位置', '位置', 'Position'], intervals: ['相对首音的半音数', '最初の音からの半音', 'Semitones from first note'], common: ['与前一和弦的共同音级', '前の和音との共通音級', 'Shared pitch classes'], movement: ['各声部位移（半音）', '各声部の移動（半音）', 'Voice movements (semitones)'], first: ['起点', '開始', 'Start'], differentVoices: ['声部数量不同', '声部数が異なります', 'Different voice counts'], none: ['无', 'なし', 'None'],
  mode: ['连接方法', '連結の方法', 'Connection method'], exact: ['等距平行（半音）', '実平行（半音）', 'Exact planing (semitones)'], diatonic: ['音阶内平行（级数）', '音階内の平行（度数）', 'Diatonic planing (scale steps)'], manual: ['自定义和弦连接', '和音を指定して連結', 'Custom chord sequence'], voicing: ['起始声部（按输入顺序）', '開始の声部（入力順）', 'Starting voices (input order)'], shifts: ['位移序列（从 0 开始）', '移動列（0から）', 'Shift sequence (starting at 0)'], root: ['音阶中心（含八度）', '音階の中心（オクターブ付き）', 'Scale center (with octave)'], scale: ['音阶', '音階', 'Scale'], chords: ['和弦序列（用 | 分隔）', '和音列（|で区切る）', 'Chords (separated by |)'], pedal: ['持续低音（可留空）', '持続低音（空欄も可）', 'Pedal pitch (optional)'],
  major: ['大调', '長音階', 'Major'], minor: ['自然小调', '自然短音階', 'Natural minor'], dorian: ['Dorian', 'Dorian', 'Dorian'], whole: ['全音音阶', '全音音階', 'Whole-tone'],
  rootA: ['A 层中心（含八度）', 'A層の中心（オクターブ付き）', 'Layer A center (with octave)'], rootB: ['B 层中心（含八度）', 'B層の中心（オクターブ付き）', 'Layer B center (with octave)'], scaleA: ['A 层音阶', 'A層の音階', 'Layer A scale'], scaleB: ['B 层音阶', 'B層の音階', 'Layer B scale'], patternA: ['A 层级数:拍数', 'A層の度数:拍数', 'Layer A degrees:beats'], patternB: ['B 层级数:拍数', 'B層の度数:拍数', 'Layer B degrees:beats'], repeats: ['各层重复次数', '各層の反復回数', 'Repeats per layer'], soloA: ['只听 A', 'Aのみ', 'Solo A'], soloB: ['只听 B', 'Bのみ', 'Solo B'], together: ['同时播放 A + B', 'A+Bを同時に再生', 'Play A + B'], union: ['两层音级并集', '二層の音級の和集合', 'Union of pitch classes'], sameCenter: ['两层中心相同：这是同中心对照。', '二層の中心は同じです。同じ中心の比較例です。', 'Both layers share one center: a same-center comparison.'], rest: ['休止', '休符', 'Rest'], beats: ['拍', '拍', 'beats'],
  motif: ['动机（含八度）', '動機（オクターブ付き）', 'Motif (with octaves)'], transform: ['变形', '変形', 'Transformation'], T: ['移调 T', '移調 T', 'Transpose T'], I: ['倒影 I', '反転 I', 'Inversion I'], R: ['逆行 R', '逆行 R', 'Retrograde R'], RI: ['逆行倒影 RI', '逆行反転 RI', 'Retrograde inversion RI'], transpose: ['最后移调（半音）', '最後の移調（半音）', 'Final transposition (semitones)'], pivot: ['倒影轴音（含八度）', '反転の軸音（オクターブ付き）', 'Inversion axis (with octave)'], original: ['原动机', '元の動機', 'Original motif'], transformed: ['变形后', '変形後', 'Transformed'], gaps: ['相邻音的有向半音数', '隣接音の有向半音数', 'Directed semitone gaps'], normal: ['标准序', '標準形', 'Normal order'], prime: ['原型（Rahn）', '素形（Rahn）', 'Prime form (Rahn)'], vector: ['音程向量（IC1–6）', '音程ベクトル（IC1–6）', 'Interval vector (IC1–6)'], pcs: ['音级集合', '音級集合', 'Pitch-class set'],
  fundamental: ['参考基频（Hz）', '基準周波数（Hz）', 'Reference frequency (Hz)'], partials: ['倍数或比例:振幅:目标音分偏移', '倍率・比率:振幅:目標セント偏差', 'Multiplier or ratio:amplitude:target-cent-offset'], morph: ['形变比例（%）', '変形率（%）', 'Morph (%)'], partial: ['频率倍数 / 比例', '周波数の倍率・比率', 'Frequency multiplier / ratio'], amplitude: ['振幅', '振幅', 'Amplitude'], frequency: ['频率（Hz）', '周波数（Hz）', 'Frequency (Hz)'], cents: ['参考基频以上的音分', '基準からのセント', 'Cents above reference'], nearest: ['最近的 12-EDO 音高', '最も近い12平均律の音高', 'Nearest 12-EDO pitch'], deviation: ['相对该音的偏差（¢）', 'その音からの偏差（¢）', 'Deviation from that pitch (¢)'], approximation: ['听 12-EDO 近似', '12平均律の近似を聴く', 'Hear 12-EDO approximation'], chordPlay: ['同时听分音', '部分音を同時に聴く', 'Hear partials together'], arp: ['逐个听分音', '部分音を順に聴く', 'Hear partials separately'], spectrum: ['构造的频谱（横轴为对数频率，纵轴为相对振幅）', '設定したスペクトル（横軸は対数周波数、縦軸は相対振幅）', 'Constructed spectrum (log-frequency x-axis, relative-amplitude y-axis)'],
  ratiosA: ['A 和弦的频率比例', 'A和音の周波数比', 'Chord A frequency ratios'], ratiosB: ['B 和弦相对 B 根音的比例', 'Bの根音に対するB和音の比率', 'Chord B ratios relative to B’s root'], rootRatio: ['B 根音 / A 根音', 'Bの根音 / Aの根音', 'B root / A root'], edo: ['每八度等分数（N）', '1オクターブの分割数（N）', 'Equal divisions per octave (N)'], ratio: ['比例', '比率', 'Ratio'], step: ['平均律步数', '平均律のステップ', 'EDO step'], temperedHz: ['平均律频率（Hz）', '平均律の周波数（Hz）', 'Tempered frequency (Hz)'], error: ['量化误差（¢）', '量子化誤差（¢）', 'Quantization error (¢)'], just: ['纯律', '純正律', 'Just intonation'], tempered: ['N 平均律', 'N平均律', 'N-EDO'], commonHz: ['纯律共同频率（Hz）', '純正律の共通周波数（Hz）', 'Common just frequencies (Hz)'], commonSteps: ['平均律共同步数', '平均律の共通ステップ', 'Common EDO steps'], chordA: ['A 和弦', 'A和音', 'Chord A'], chordB: ['B 和弦', 'B和音', 'Chord B'],
};
const EDIT = {
  title:['自由编辑与试听','自由編集と試聴','Edit and audition'],
  intro:['下方不是固定示例：可逐项改音名、八度和顺序，再单独听或播放整段。改音后按 Enter 或离开输入框应用。','下は固定例ではありません。音名・オクターブ・順序を編集し、単独または全体を試聴できます。Enter または入力欄を離れて適用。','These are editable sounds. Change notes, octaves and order, then audition one item or the whole passage. Press Enter or leave the field to apply.'],
  unlock:['把当前结果转为自由编辑','現在の結果を自由編集へ','Edit the current result freely'],
  add:['添加','追加','Add'],remove:['删除','削除','Remove'],copy:['复制','複製','Duplicate'],ear:['试听','試聴','Audition'],
  up:['前移','前へ','Move earlier'],down:['后移','後へ','Move later'],
  shiftUp:['全体升半音','全音を半音上げる','Raise all by a semitone'],shiftDown:['全体降半音','全音を半音下げる','Lower all by a semitone'],
  symbol:['和弦名生成音：如 Dm7、C/E','和音名から生成：Dm7、C/E など','Generate notes from a chord symbol, e.g. Dm7 or C/E'],
  symbolAdd:['添加这个和弦','この和音を追加','Add this chord'],
  note:['音名与八度','音名とオクターブ','Pitch and octave'],beats:['时值（拍）','長さ（拍）','Duration (beats)'],
};
const ERRORS = {
  chordSymbol:['请输入明确的和弦名，如 C、Dm7、Cmaj7/E；alt 需先选定实际音','C、Dm7、Cmaj7/E のように明確な和音名を入力。alt は実音を指定してください','Enter a definite chord symbol such as C, Dm7 or Cmaj7/E; specify actual notes for alt'],
  range: ['数值超出范围或不是有效数字', '数値が範囲外か無効です', 'Number is invalid or out of range'], count: ['输入项目数量不合适', '項目数が範囲外です', 'Invalid number of entries'], pitch: ['音名需要带八度，范围 C0–B8，例如 C4 或 Eb4', 'C0–B8の音名とオクターブを入力（例 C4、Eb4）', 'Enter a pitch with octave in C0–B8, e.g. C4 or Eb4'], outsideScale: ['起始声部含所选音阶之外的音', '開始の声部に音階外の音があります', 'A starting voice lies outside the selected scale'], pattern: ['用级数或音名:拍数，例如 1:2、C4:2 或休止 r:1', '度数または音名:拍数（例1:2、C4:2、休符r:1）', 'Use degree or pitch:beats, e.g. 1:2, C4:2, or rest r:1'], partial: ['格式应为倍数或比例:振幅:音分偏移，如 3/2:0.5:0', '倍率・比率:振幅:セント偏差（例 3/2:0.5:0）', 'Use multiplier or ratio:amplitude:cent-offset, e.g. 3/2:0.5:0'], ratio: ['比例应是 1–999 的正整数之比，例如 5/4', '比率は1–999の正整数（例5/4）', 'Use ratios of positive integers 1–999, e.g. 5/4'], silent: ['至少一个分音的振幅要大于 0', '一つ以上の部分音の振幅を0より大きくします', 'At least one partial must have positive amplitude'], scale: ['请选择有效音阶', '有効な音階を選択', 'Select a valid scale'], mode: ['请选择有效模式', '有効なモードを選択', 'Select a valid mode'], config: ['参数链接无效', '設定リンクが無効です', 'Invalid settings link'],
};

export function mountModernHarmony(target, { topic, playChord, stopAudio, onExperiment = () => {} }) {
  if (!MODERN_TOOL_IDS.includes(topic)) throw new Error('Unknown modern-harmony tool');
  const index = { zh: 0, ja: 1, en: 2 }[language()];
  const tr = (values) => values[index], w = (key) => tr(WORDS[key]);
  const copy = TOOL_COPY[topic], storageKey = `jc-modern-tool-${topic}-v1`;
  let saved;
  try { saved = JSON.parse(localStorage.getItem(storageKey)); } catch {}
  let state = { ...DEFAULTS[topic] };
  const accept = (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new ToolInputError('config');
    const next = { ...DEFAULTS[topic] };
    for (const key of Object.keys(next)) if (Object.hasOwn(data, key)) {
      if (!['string', 'number'].includes(typeof data[key]) || String(data[key]).length > 2000) throw new ToolInputError('config');
      next[key] = data[key];
    }
    return next;
  };
  if (saved) { try { state = accept(saved); } catch {} }
  target.replaceChildren();
  const root = el('div', 'mk mh-tool'), head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', tr(['创作实验', '作曲実験', 'Composition lab'])), el('h3', '', tr(copy.title)), el('p', '', tr(copy.intro)));
  const hint = el('p', 'mk-callout mh-hint', tr(copy.hint));
  const extra = copy.extra ? el('p', 'mk-callout mh-hint mh-extra', tr(copy.extra)) : null;
  const toolbar = el('div', 'mh-toolbar'), preset = el('select', 'mh-preset');
  preset.setAttribute('aria-label', w('preset'));
  preset.append(option('', tr(['自定义', 'カスタム', 'Custom'])));
  copy.presets.forEach((text, i) => preset.append(option(String(i), tr(text))));
  preset.value = saved ? '' : '0';
  const reset = button('btn btn-secondary btn-sm', w('reset'), () => apply(DEFAULTS[topic], '0'));
  const share = button('btn btn-ghost btn-sm', w('share'), async () => {
    try {
      if (!model) return;
      const url = new URL(window.location.href);
      url.hash = `${topic}?q=${encodeURIComponent(JSON.stringify(state))}`;
      await navigator.clipboard.writeText(url.href);
      status.textContent = w('copied');
    } catch { status.textContent = w('copyError'); }
  });
  toolbar.append(field(w('preset'), preset, 'mh-preset-field'), reset, share);
  const controls = el('div', 'mh-controls'), output = el('div', 'mh-output'), playback = el('div', 'mh-playback');
  const actions = el('div', 'mh-actions'), status = el('span', 'mh-status', w('ready'));
  status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
  playback.append(actions, status);
  const fields = new Map(), inputs = new Map(), playButtons = [];
  let model = null, pendingHold = null, suppressPointerClick = false;
  function cancelHold(suppress = false) {
    if (!pendingHold) return;
    if (suppress) suppressPointerClick = true;
    clearTimeout(pendingHold.timer); pendingHold.hit.classList.remove('is-holding'); pendingHold = null;
  }
  function moveHold(event) {
    if (pendingHold && event.pointerId === pendingHold.pointerId && Math.hypot(event.clientX-pendingHold.x,event.clientY-pendingHold.y)>8) {
      suppressPointerClick = true; cancelHold();
    }
  }
  root.addEventListener('pointerdown', () => { suppressPointerClick = false; }, true);
  // A removed SVG target may send its release click to an ancestor. Suppress that click before it adds or auditions anything.
  root.addEventListener('click', event => {
    if (suppressPointerClick && event.detail !== 0) { suppressPointerClick=false; event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
  const player = createToolPlayer({
    sound(item, seconds, first) {
      if (item.timbre === 'sine') return playSinePartials(item, seconds, first);
      playChord(item.frequencies, seconds, { interrupt: first });
    }, silence: stopAudio,
    onEvent(item) {
      root.classList.add('is-playing');
      status.textContent = item.caption || `${w('playing')} · ${item.layer || ''} ${item.index + 1}`;
      // Other layers keep their own active note until the next event in that layer.
      const layer = item.layer || '';
      root.querySelectorAll('[data-mh-event]').forEach((node) => {
        if ((node.dataset.mhLayer || '') === layer) node.classList.toggle('is-active', item.all || Number(node.dataset.mhEvent) === item.index);
      });
    }, onRelease(item) {
      root.querySelectorAll('[data-mh-event]').forEach((node) => {
        if ((node.dataset.mhLayer || '') === (item.layer || '') && (item.all || Number(node.dataset.mhEvent) === item.index)) node.classList.remove('is-active');
      });
    }, onEnd() {
      root.classList.remove('is-playing');
      root.querySelectorAll('.is-active').forEach((node) => node.classList.remove('is-active'));
      status.textContent = w('ready');
    },
  });
  function input(key, { type = 'text', min, max, step = 1, choices, wide = false } = {}) {
    const control = el(choices ? 'select' : 'input');
    if (choices) choices.forEach((id) => control.append(option(id, w(id))));
    else {
      control.type = type; control.spellcheck = false;
      if (type === 'text') control.maxLength = 2000;
      if (type === 'number') { control.min = min; control.max = max; control.step = step; }
    }
    control.name = key; control.value = state[key];
    const label = field(w(key), control, `mh-field${wide ? ' mh-wide' : ''}`);
    inputs.set(key, control); fields.set(key, label); controls.append(label);
    control.addEventListener(choices ? 'change' : 'input', () => {
      state[key] = control.value;
      preset.value = '';
      paint();
    });
    return control;
  }
  if (topic === 'nonfunctional') {
    input('mode', { choices: ['exact', 'diatonic', 'manual'] });
    input('voicing'); input('shifts'); input('root'); input('scale', { choices: Object.keys(SCALES) });
    input('chords', { wide: true }); input('pedal');
  } else if (topic === 'polytonality') {
    input('rootA'); input('scaleA', { choices: Object.keys(SCALES) }); input('patternA', { wide: true });
    input('rootB'); input('scaleB', { choices: Object.keys(SCALES) }); input('patternB', { wide: true });
    input('repeats', { type: 'number', min: 1, max: 4 });
  } else if (topic === 'atonality') {
    input('motif', { wide: true }); input('transform', { choices: ['T', 'I', 'R', 'RI'] });
    input('transpose', { type: 'number', min: -24, max: 24 }); input('pivot'); input('compare', { wide: true });
  } else if (topic === 'spectralharmony') {
    input('fundamental', { type: 'number', min: 20, max: 1000, step: .1 });
    input('morph', { type: 'number', min: 0, max: 100 }); input('grid', { choices: ['semi', 'quarter', 'sixth'] }); input('partials', { wide: true });
  } else {
    input('fundamental', { type: 'number', min: 20, max: 1000, step: .1 }); input('edo', { type: 'number', min: 5, max: 120 });
    input('ratiosA'); input('ratiosB'); input('rootRatio');
  }
  input('bpm', { type: 'number', min: 30, max: 240 });
  const editor = ['nonfunctional','polytonality','atonality'].includes(topic) ? el('section','mh-editor') : null;
  root.append(head, toolbar, hint, ...(extra ? [extra] : []), controls, ...(editor ? [editor] : []), playback, output, relatedLinks(copy.links), sourcesFooter(copy.refs));
  target.append(root);
  function playAction(label, getEvents, action) {
    const node = button('btn btn-secondary btn-sm', label, () => {
      if (model) { player.play(getEvents(), Number(state.bpm)); onExperiment({...state}, {action}); }
    });
    playButtons.push(node); actions.append(node);
  }
  if (topic === 'polytonality') {
    playAction(w('soloA'), () => model.eventsA, 'layerA'); playAction(w('soloB'), () => model.eventsB, 'layerB'); playAction(w('together'), () => model.events, 'together');
  } else if (topic === 'atonality') {
    playAction(w('original'), () => model.original.map((item) => ({ ...item, layer: 'original' })), 'original');
    playAction(w('transformed'), () => model.events.map((item) => ({ ...item, layer: 'transformed' })), 'transformed');
  } else if (topic === 'spectralharmony') {
    playAction(w('chordPlay'), () => model.chord, 'spectrum'); playAction(w('arp'), () => model.events.map(item => ({...item, caption: w('playing')+' · '+model.rows[item.index].label+' · '+fmt(item.frequencies[0],3)+' Hz'})), 'arpeggio'); playAction(w('approximation'), () => model.approximation, 'approximation');
  } else if (topic === 'microtonalharmony') {
    playAction(`${w('just')} · A → B`, () => model.just, 'just'); playAction(`${w('tempered')} · A → B`, () => model.tempered, 'tempered');
    playAction(`${w('chordA')} · JI ↔ EDO`, () => [model.just[0], { ...model.tempered[0], at: 3 }], 'compareA');
    playAction(`${w('chordB')} · JI ↔ EDO`, () => [{ ...model.just[1], at: 0 }, model.tempered[1]], 'compareB');
  } else playAction(w('play'), () => model.events, 'sequence');
  actions.append(button('btn btn-ghost btn-sm', w('stop'), player.stop));
  function visible(key, show) { fields.get(key).hidden = !show; inputs.get(key).disabled = !show; }
  function save() { try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {} }
  function apply(data, presetValue = '') {
    state = accept(data);
    inputs.forEach((control, key) => { control.value = state[key]; });
    preset.value = presetValue; paint();
  }
  function showError(error) {
    const node = el('p', 'mk-callout is-error mh-error', `${tr(ERRORS[error.code] || ERRORS.config)}${error.token ? ` · ${error.token}` : ''}`);
    node.setAttribute('role', 'alert'); output.replaceChildren(node);
    if (editor) editor.replaceChildren();
    playButtons.forEach((node) => { node.disabled = true; }); share.disabled = true;
  }
  function paint() {
    cancelHold(true); player.stop(); save();
    if (topic === 'nonfunctional') {
      visible('voicing', state.mode !== 'manual'); visible('shifts', state.mode !== 'manual');
      visible('root', state.mode === 'diatonic'); visible('scale', state.mode === 'diatonic'); visible('chords', state.mode === 'manual');
    }
    if (topic === 'atonality') visible('pivot', ['I', 'RI'].includes(state.transform));
    model = null;
    try { numberIn(state.bpm, 30, 240); model = MODEL_OF[topic](state); }
    catch (error) { showError(error); return; }
    playButtons.forEach((node) => { node.disabled = topic === 'spectralharmony' && model.events.length === 0; }); share.disabled = false;
    output.replaceChildren();
    renderResult();
    renderEditor();
  }
  const fmt = (n, digits = 2) => Number(n).toFixed(digits);
  const signed = (n, digits = 0) => `${n > 0 ? '+' : ''}${digits ? fmt(n, digits) : n}`;
  function mark(node, n, layer = '') { node.dataset.mhEvent = String(n); if (layer) node.dataset.mhLayer = layer; return node; }
  function table(headers, rows, { layer = '', indices = true } = {}) {
    const wrapper = el('div', 'mh-table-wrap'), tbl = el('table', 'mh-table'), thead = el('thead'), headrow = el('tr'), tbody = el('tbody');
    headers.forEach((header) => headrow.append(el('th', '', header))); thead.append(headrow);
    rows.forEach((cells, index) => { const row = el('tr'); if (indices) mark(row, index, layer); cells.forEach((cell) => row.append(el('td', '', cell))); tbody.append(row); });
    tbl.append(thead, tbody); wrapper.append(tbl); output.append(wrapper);
  }
  function summary(label, value) { const node = el('p', 'mh-summary'); node.append(el('strong', '', `${label} · `), document.createTextNode(String(value))); output.append(node); }
  function noteStrip(notes, layer) {
    const strip = el('div', 'mh-notes');
    notes.forEach((midi, i) => strip.append(mark(el('span', 'mh-note', noteLabel(midi)), i, layer)));
    output.append(strip);
  }
  function renderResult() {
    if (topic === 'nonfunctional') {
      const strip = el('div', 'mh-chords');
      model.rows.forEach((row) => {
        const name = row.chordNames[0] || w('customSonority');
        const label = tr(EDIT.ear) + ' · ' + (row.index + 1) + ' · ' + name + ' · ' + row.notes.map(noteLabel).join(' · ');
        const card = mark(button('mh-chord', '', () => {
          player.play([{ ...model.events[row.index], at: 0, duration: 1.5, caption: w('playing') + ' · ' + (row.index + 1) + ' · ' + name }], 60);
          onExperiment({ ...state }, {action:'card'});
        }), row.index);
        card.title = label; card.setAttribute('aria-label', label);
        card.append(el('small', '', `${row.index + 1}`), el('strong', 'mh-chord-name', row.chordNames[0] || w('customSonority')), el('span', 'mh-chord-pitches', row.notes.map(noteLabel).join(' · ')));
        if (row.chordNames.length > 1) card.append(el('small', 'mh-chord-alternatives', `${w('otherNames')} · ${row.chordNames.slice(1).join(' · ')}`));
        if (model.pedal !== null) card.append(el('small', '', `${w('pedal')} · ${noteLabel(model.pedal)}`));
        strip.append(card);
      });
      output.append(el('p', 'mh-chart-caption', tr(['点击和弦卡片可单独试听；键盘可用 Enter 或空格。', '和音カードをクリックして単独で試聴。キーボードでは Enter またはスペース。', 'Click a chord card to audition it; use Enter or Space on the keyboard.'])), strip);
      const connectionText = (c) => !c ? w('first') : [c.planing === 'real' ? w('realPlaning') : c.planing === 'diatonic' ? w('diatonicPlaning') : '', c.mediant === 'chromatic' ? w('chromaticMediant') : c.mediant === 'doubly' ? w('doublyMediant') : '', `${w('commonTones')} ${c.common}`].filter(Boolean).join(' · ');
      table([w('index'), w('chordName'), w('connection'), w('intervals'), w('common'), w('movement')], model.rows.map((row) => [row.index + 1, row.chordNames.join(' · ') || w('customSonority'), connectionText(row.connection), row.intervals.join(', '), row.index ? (row.common.map((n) => noteLabel(n + 60).replace(/4$/, '')).join(', ') || w('none')) : w('first'), row.index ? (row.movement?.map((n) => signed(n)).join(', ') || w('differentVoices')) : '—']));
    } else if (topic === 'polytonality') {
      const timeline = el('div', 'mh-timeline');
      const length = Math.max(model.a.length, model.b.length);
      for (const [layer, data] of [['A', model.a], ['B', model.b]]) {
        const track = el('div', `mh-track mh-layer-${layer}`), notes = el('div', 'mh-track-notes');
        notes.style.width = `${Math.max(560, length * 46)}px`;
        data.rows.forEach((row) => {
          const note = mark(el('span', 'mh-track-note', row.midi === null ? w('rest') : noteLabel(row.midi)), row.index, layer);
          if (row.midi === null) note.classList.add('is-rest');
          note.style.width = `${row.duration / length * 100}%`;
          note.title = `${row.at} → ${row.at + row.duration} ${w('beats')}`;
          notes.append(note);
        });
        track.append(el('strong', '', `${layer} · ${data.length} ${w('beats')}`), notes); timeline.append(track);
      }
      output.append(timeline);
      summary(w('union'), model.union.join(', '));
      summary('A · ' + w('pcs'), model.a.pcs.join(', ')); summary('B · ' + w('pcs'), model.b.pcs.join(', '));
      if (model.sameCenter) output.append(el('p', 'mk-callout', w('sameCenter')));
      const poly = model.poly, name = (t) => t ? noteLabel(t.root + 60).replace(/\d+$/, '') + (t.quality === 'minor' ? 'm' : '') : w('noTriad');
      output.append(el('h4', 'mh-result-title', w('vertical')));
      table(['', w('layerTriad')], [['A', name(poly.triadA)], ['B', name(poly.triadB)]], { indices: false });
      summary(w('setClass'), `${poly.info.forte || ''} (${poly.info.prime.join('')}) · [${poly.info.normal.join(', ')}]`);
      if (poly.petrushka) output.append(el('p', 'mk-callout', w('petrushka')));
      summary(tr(['八声音集', '八音音階', 'Octatonic'], ), poly.octatonic >= 0 ? `${w('octatonicYes')} · OCT${[ '0,1', '1,2', '2,3' ][poly.octatonic]}` : w('octatonicNo'));
      output.append(el('p', 'mh-chart-caption', w('polyNote')));
    } else if (topic === 'atonality') {
      summary(w('original'), model.source.map(noteLabel).join(' → ')); noteStrip(model.source, 'original');
      summary(w('transformed'), model.notes.map(noteLabel).join(' → ')); noteStrip(model.notes, 'transformed');
      table([w('index'), w('original'), w('transformed'), w('gaps')], model.notes.map((midi, i) => [i + 1, noteLabel(model.source[i]), noteLabel(midi), i ? signed(model.gaps[i - 1]) : '—']), { layer: 'transformed' });
      table(['', w('original'), w('transformed')], [['pcs', `[${model.sourceInfo.pcs}]`, `[${model.info.pcs}]`], [w('normal'), `[${model.sourceInfo.normal}]`, `[${model.info.normal}]`], [w('prime'), `[${model.sourceInfo.prime}]`, `[${model.info.prime}]`], [w('vector'), `<${model.sourceInfo.vector}>`, `<${model.info.vector}>`]], { indices: false });
      if (model.compare) {
        output.append(el('h4', 'mh-result-title', w('relation')));
        const same = model.compareInfo.prime.join() === model.sourceInfo.prime.join();
        const rel = [...model.relation.T.map((n) => `T${n}`), ...model.relation.I.map((n) => `T${n}I`)];
        summary(model.compare.map(noteLabel).join(' → '), `${same ? w('sameSet') : w('differentSet')} · ${rel.join(', ') || w('noRelation')} · (${model.compareInfo.prime.join('')})`);
      }
      const ck = model.checks, at = (list, fmtItem) => list.length ? `${w('chkAt')} ${list.map(fmtItem).join(', ')}` : w('chkOk');
      output.append(el('h4', 'mh-result-title', w('checks')));
      table(['', ''], [
        [w('chkOctaves'), at(ck.octaves, ([a, b]) => `${a + 1}–${b + 1}`)],
        [w('chkTriads'), at(ck.triads, (i) => `${i + 1}–${i + 3}`)],
        [w('chkDiatonic'), at(ck.diatonic, (i) => `${i + 1}–${i + 4}`)],
        [w('chkDisjunct'), (ck.disjunct ? w('chkOk') + ' · ' : '') + w('stepsLeaps').replace('{s}', ck.steps).replace('{l}', ck.leaps)],
      ], { indices: false });
    } else if (topic === 'spectralharmony') {
      spectrum();
      table([w('partial'), w('amplitude'), w('frequency'), w('cents'), w('nearest'), w('deviation'), `${w('approx')} · ${w(state.grid)}`, w('approxDev')], model.rows.map((row) => [row.label, fmt(row.amplitude), fmt(row.frequency, 3), fmt(row.cents), row.nearest.note, signed(row.nearest.deviation, 2), row.grid.note + (row.grid.offset ? ` ${signed(row.grid.offset)}¢` : ''), signed(row.grid.deviation, 1)]));
      if (model.differences.length) summary(w('diffTones'), model.differences.map((d) => `${fmt(d.high.frequency, 1)} − ${fmt(d.low.frequency, 1)} = ${fmt(d.frequency, 1)}`).join(' · '));
    } else {
      summary(w('commonHz'), model.commonHz.map((n) => fmt(n, 3)).join(', ') || w('none'));
      summary(w('commonSteps'), model.commonSteps.join(', ') || w('none'));
      for (const [layer, rows] of [['A', model.a], ['B', model.b]]) {
        output.append(mark(el('h4', 'mh-result-title', w(layer === 'A' ? 'chordA' : 'chordB')), layer === 'A' ? 0 : 1));
        table([w('ratio'), w('frequency'), w('cents'), w('step'), w('temperedHz'), w('error')], rows.map((row) => [row.ratio, fmt(row.frequency, 3), fmt(row.cents), row.step, fmt(row.temperedHz, 3), signed(row.error, 2)]), { indices: false });
        const intervals = layer === 'A' ? model.intervalsA : model.intervalsB;
        if (intervals.length) table([w('intervalsOf'), w('interval'), w('cents'), w('limitCol')], intervals.map((x) => [`${x.from} → ${x.to}`, x.ratio, fmt(x.cents), `${x.limit}-limit`]), { indices: false });
      }
    }
  }
  function renderEditor() {
    if (!editor || !model) return;
    const e = key => tr(EDIT[key]);
    editor.replaceChildren(el('h4','',e('title')),el('p','mh-edit-note',e('intro')));
    function commit(values) { apply({...state,...values}); }
    function rowEditor(values, index, label, onChange, audition) {
      const row = el('div','mh-editor-row'), input = el('input','mh-edit-pitch');
      input.value = values[index]; input.setAttribute('aria-label',label+' '+(index+1));
      const update = () => { const next=[...values];next[index]=input.value;onChange(next); };
      input.addEventListener('change',update);
      input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();update();}});
      const actions = el('div','mh-edit-actions');
      actions.append(button('btn btn-secondary btn-sm',e('ear'),()=>{audition();onExperiment({...state}, {action:'note'});}));
      const operation = (key,fn,disabled=false) => {const b=button('btn btn-ghost btn-sm',e(key),()=>{const next=[...values];fn(next);onChange(next);});b.disabled=disabled;actions.append(b);};
      operation('copy',list=>list.splice(index+1,0,values[index]),values.length>=16);
      operation('remove',list=>list.splice(index,1),values.length<=1);
      operation('up',list=>{[list[index-1],list[index]]=[list[index],list[index-1]];},index===0);
      operation('down',list=>{[list[index+1],list[index]]=[list[index],list[index+1]];},index===values.length-1);
      if (topic==='nonfunctional') {
        for (const [key,delta] of [['shiftDown',-1],['shiftUp',1]]) actions.append(button('btn btn-ghost btn-sm',e(key),()=>{
          const list=[...values];list[index]=model.rows[index].notes.map(n=>noteLabel(n+delta)).join(' ');onChange(list);
        }));
      }
      row.append(el('span','mh-editor-index',String(index+1)),input,actions);editor.append(row);
    }
    if (topic==='nonfunctional') {
      if (state.mode!=='manual') {
        editor.append(button('btn btn-secondary btn-sm',e('unlock'),()=>commit({mode:'manual',chords:model.rows.map(row=>row.notes.map(noteLabel).join(' ')).join(' | ')})));
        return;
      }
      const values=String(state.chords).split('|').map(s=>s.trim());
      const change=items=>commit({chords:items.join(' | ')});
      values.forEach((value,i)=>rowEditor(values,i,w('chordName'),change,()=>player.play([{...model.events[i],at:0}],Number(state.bpm))));
      const add = button('btn btn-secondary btn-sm',e('add'),()=>change([...values,'C4 E4 G4']));add.disabled=values.length>=16;editor.append(add);
      const box=el('div','mh-symbol-input'), symbol=el('input');symbol.placeholder='Dm7';symbol.setAttribute('aria-label',e('symbol'));
      const addSymbol=()=>{try{const notes=chordSymbolNotes(symbol.value);if(values.length>=16)throw new ToolInputError('count','1…16');change([...values,notes.map(noteLabel).join(' ')]);}catch(error){const message=el('p','mh-error',tr(ERRORS[error.code]||ERRORS.config));message.setAttribute('role','alert');box.querySelector('.mh-error')?.remove();box.append(message);}};
      symbol.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();addSymbol();}});
      box.append(field(e('symbol'),symbol,'mh-field'),button('btn btn-secondary btn-sm',e('symbolAdd'),addSymbol));editor.append(box);
    } else if (topic==='atonality') {
      const values=model.source.map(noteLabel),change=items=>commit({motif:items.join(' ')});
      values.forEach((value,i)=>rowEditor(values,i,e('note'),change,()=>player.play([{frequencies:[hz(model.source[i])],at:0,duration:1,index:i,layer:'original'}],60)));
      const add=button('btn btn-secondary btn-sm',e('add'),()=>change([...values,'C4']));add.disabled=values.length>=16;editor.append(add);
    } else {
      for(const lane of ['A','B']) {
        editor.append(el('h5','mh-editor-lane',lane+' · '+w(lane==='A'?'soloA':'soloB')));
        const key='pattern'+lane, values=String(state[key]).trim().split(/[\s,，;；]+/).filter(Boolean), data=model[lane==='A'?'a':'b'];
        const change=items=>commit({[key]:items.join(' ')});
        // Convert each scale degree to an explicit pitch while retaining its duration.
        const pitches=values.map((_,i)=>(data.rows[i].midi===null?'r':noteLabel(data.rows[i].midi))+':'+data.rows[i].duration);
        pitches.forEach((value,i)=>rowEditor(pitches,i,e('note')+' : '+e('beats'),change,()=>{const item=(lane==='A'?model.eventsA:model.eventsB).find(event=>event.index===i);if(item)player.play([{...item,at:0}],Number(state.bpm));}));
        const add=button('btn btn-secondary btn-sm',e('add')+' · '+lane,()=>change([...pitches,(lane==='A'?'C3':'D5')+':1']));add.disabled=pitches.length>=16;editor.append(add);
      }
    }
  }
  function spectrum() {
    const wrap = el('div', 'mh-spectrum'), caption = el('p', 'mh-chart-caption', w('spectrum'));
    const NS = 'http://www.w3.org/2000/svg', svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 700 250'); svg.setAttribute('role', 'group'); svg.setAttribute('aria-label', w('spectrum'));
    function node(tag, attrs, text) { const n = document.createElementNS(NS, tag); Object.entries(attrs).forEach(([key, value]) => n.setAttribute(key, value)); if (text) n.textContent = text; svg.append(n); return n; }
    const frequencies = model.rows.map(r => r.frequency);
    const min = Math.max(20, Math.min(Number(state.fundamental), ...frequencies) * .9), max = Math.min(12000, Math.max(Number(state.fundamental)*2, ...frequencies) * 1.1);
    const x = frequency => 48 + 600 * Math.log(frequency / min) / Math.log(max / min);
    const plot = node('rect', { x:48, y:40, width:600, height:170, fill:'transparent', class:'mh-spectrum-add-area' });
    [0, .5, 1].forEach(amp => { const y = 210 - amp * 170; node('line', { x1:48, x2:648, y1:y, y2:y, class:'mh-gridline' }); node('text', { x:34, y:y+4, 'text-anchor':'end' }, String(amp)); });
    const controls = el('form', 'mh-spectrum-editor'), feedback = el('p', 'mh-chart-caption mh-spectrum-feedback');
    feedback.setAttribute('role','status');
    const draft = {};
    for (const [key,label,type,value] of [['ratio',tr(SPECTRUM_EDIT.ratio),'text','3/2'],['amplitude',w('amplitude'),'number','0.5'],['offset',tr(SPECTRUM_EDIT.offset),'number','0']]) {
      const input = el('input'); input.type=type; input.value=value; input.name='spectrum-'+key; input.required=true;
      if (key==='amplitude') { input.min=0; input.max=1; input.step='0.05'; }
      if (key==='offset') { input.min=-600; input.max=600; input.step='any'; }
      input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();append();}});
      draft[key]=input; const f=field(label,input); f.classList.add('mh-field'); controls.append(f);
    }
    const add = button('btn btn-secondary btn-sm',tr(SPECTRUM_EDIT.add),()=>append());
    add.disabled=model.rows.length>=16;
    if(add.disabled) feedback.textContent=tr(SPECTRUM_EDIT.limit);
    else if(!model.events.length) feedback.textContent=tr(SPECTRUM_EDIT.empty);
    controls.append(add);
    function append(component = {ratio:draft.ratio.value,amplitude:draft.amplitude.value,offset:draft.offset.value}) {
      try {
        const next = addSpectralComponent(state,component);
        apply(next);
        const added = root.querySelector('.mh-spectrum-feedback');
        added.textContent=tr(SPECTRUM_EDIT.added)+' · '+component.ratio+' · '+fmt(model.rows.at(-1).frequency,3)+' Hz'+(model.rows.length===16?' · '+tr(SPECTRUM_EDIT.limit):'');
      } catch(error) {
        feedback.textContent=tr(ERRORS[error.code]||ERRORS.config)+(error.token?' · '+error.token:'');
        feedback.classList.add('is-error');
      }
    }
    controls.addEventListener('submit',event=>{event.preventDefault();append();});
    model.rows.forEach(row => {
      const y=210-row.amplitude*170, label=w('partial')+' '+row.label+' · '+fmt(row.frequency,3)+' Hz';
      mark(node('line',{x1:x(row.frequency),x2:x(row.frequency),y1:210,y2:y,class:'mh-stem'}),row.index);
      mark(node('circle',{cx:x(row.frequency),cy:y,r:4,class:'mh-dot'}),row.index);
      const hit=node('rect',{x:x(row.frequency)-10,y:Math.max(22,y-12),width:20,height:Math.max(12,210-Math.max(22,y-12)),fill:'transparent',class:'mh-partial-hit',role:'button',tabindex:0,'aria-label':label});
      const title=document.createElementNS(NS,'title');title.textContent=label;hit.append(title);
      const audition=()=>player.play([{frequencies:[row.frequency],amplitudes:[row.amplitude],timbre:'sine',at:0,duration:1.5,index:row.index,caption:w('playing')+' · '+label}],60);
      const remove = () => {
        const before={...state};
        apply(removeSpectralComponent(state,row.index));
        const notice=root.querySelector('.mh-spectrum-feedback');
        notice.replaceChildren(document.createTextNode(tr(SPECTRUM_EDIT.removed)+' · '+row.label+' · '+fmt(row.frequency,3)+' Hz '),button('btn btn-ghost btn-sm',tr(SPECTRUM_EDIT.undo),()=>apply(before)));
        const focus=root.querySelectorAll('.mh-partial-hit')[Math.min(row.index,model.rows.length-1)] || root.querySelector('[name=spectrum-ratio]');focus?.focus({preventScroll:true});
      };
      hit.addEventListener('pointerdown',event=>{
        if(event.button!==0 || !event.isPrimary)return;
        cancelHold();
        const hold={hit,pointerId:event.pointerId,x:event.clientX,y:event.clientY};
        hold.timer=setTimeout(()=>{
          if(pendingHold!==hold || !hit.isConnected)return;
          cancelHold();suppressPointerClick=true;remove();
        },600);
        pendingHold=hold;hit.classList.add('is-holding');
      });
      hit.addEventListener('contextmenu',event=>event.preventDefault());
      hit.addEventListener('click',event=>{event.stopPropagation();audition();});
      hit.addEventListener('keydown',event=>{
        if(['Enter',' '].includes(event.key)){event.preventDefault();audition();}
        else if(['Delete','Backspace'].includes(event.key)){event.preventDefault();cancelHold();remove();}
        else if(event.key==='Escape')cancelHold(true);
      });
    });
    // Convert from screen coordinates so touch, CSS sizing and SVG viewBox agree.
    svg.addEventListener('click',event=>{
      if(event.target.closest('.mh-partial-hit') || model.rows.length>=16) return;
      const matrix=svg.getScreenCTM();if(!matrix)return;
      const point=new DOMPoint(event.clientX,event.clientY).matrixTransform(matrix.inverse());
      if(point.x<48||point.x>648||point.y<40||point.y>210)return;
      const frequency=min*(max/min)**((point.x-48)/600);
      append({ratio:Number((frequency/Number(state.fundamental)).toFixed(8)),amplitude:Number(((210-point.y)/170).toFixed(4)),offset:0});
    });
    [0,.25,.5,.75,1].forEach(part=>{const f=min*(max/min)**part;node('text',{x:x(f),y:234,'text-anchor':'middle'},fmt(f,0)+' Hz');});
    wrap.append(svg,caption,el('p','mh-chart-caption',tr(SPECTRUM_EDIT.help)),controls,feedback); output.append(wrap);
  }
  preset.addEventListener('change', () => { if (preset.value !== '') apply(PRESETS[topic][Number(preset.value)], preset.value); });
  const stop = () => { cancelHold(true); player.stop(); };
  const query = (event) => {
    player.stop();
    try { const data = JSON.parse(String(event.detail)); apply(data); }
    catch (error) { model = null; showError(error); }
  };
  const visibility = () => { if (document.hidden) stop(); };
  const endHold = event => {
    // Only scrolling the plot's ancestors cancels its gesture; an unrelated navigation animation must not.
    if (event.type==='scroll' && pendingHold && event.target!==document && !event.target.contains?.(pendingHold.hit)) return;
    cancelHold(event.type !== 'pointerup');
  };
  target.addEventListener('toolbox-stop', stop); target.addEventListener('toolbox-query', query);
  document.addEventListener('visibilitychange', visibility);
  document.addEventListener('pointermove', moveHold);
  document.addEventListener('pointerup', endHold);
  document.addEventListener('pointercancel', endHold);
  document.addEventListener('scroll', endHold, true);
  window.addEventListener('blur', endHold);
  paint();
  return { stop, setState: data => apply(data), destroy() { stop(); target.removeEventListener('toolbox-stop', stop); target.removeEventListener('toolbox-query', query); document.removeEventListener('visibilitychange', visibility); document.removeEventListener('pointermove',moveHold); document.removeEventListener('pointerup',endHold); document.removeEventListener('pointercancel',endHold); document.removeEventListener('scroll',endHold,true); window.removeEventListener('blur',endHold); } };
}

// B 面考试综合任务：把同一材料用于计算、分析与改写，避免缩题后仍只剩识记题。
// ref:omt2e-intervals ref:omt2e-roman-numerals ref:wiki-transposing ref:omt2e-embellishing
// ref:omt2e-iivi ref:wiki-harmonic-series ref:omt2e-normal-order
// ref:omt2e-rhythm ref:omt2e-major-scales ref:omt2e-cadences ref:omt2e-sevenths
// ref:omt2e-substitutions ref:wiki-cent ref:omt2e-pitch-class
const t = (zh, ja, en) => ({ zh, ja, en });
const step = (label, kind, answer) => ({ label, kind, answer });
const task = (chapter, i, ref, prompt, steps, skills) => ({
  id: `task-${chapter}-${i}`, type: 'derive', ref, prompt, steps, skills, error: 'calc',
});

export const EXAM_TASKS = {
  basics: [
    ['C4', 'E4', 3, 4], ['D4', 'F4', 3, 3], ['E4', 'B4', 5, 7], ['F4', 'A4', 3, 4],
  ].map(([low, high, size, semitones], i) => task('basics', i, 'omt2e-intervals',
    t(`分析 ${low}–${high}，再把下方音升高八度，计算转位。`, `${low}–${high} を分析し、下の音を 1 オクターヴ上げて転回を計算。`, `Analyse ${low}–${high}, then raise the lower note an octave and calculate the inversion.`), [
      step(t('原音程度数（起点算 1）', '元の度数（出発点 = 1）', 'Original generic size (start = 1)'), 'number', size),
      step(t('原音程半音数', '元の半音数', 'Original half steps'), 'number', semitones),
      step(t('转位后度数', '転回後の度数', 'Inverted generic size'), 'number', 9 - size),
      step(t('转位后半音数', '転回後の半音数', 'Inverted half steps'), 'number', 12 - semitones),
    ], ['calc', 'identify'])),

  harmony: [
    ['C', 'C', 'E', 'G'], ['G', 'G', 'B', 'D'], ['F', 'F', 'A', 'C'], ['D', 'D', 'F#', 'A'],
  ].map(([key, root, third, fifth], i) => task('harmony', i, 'omt2e-roman-numerals',
    t(`${key} 大调：主三和弦是 ${root}–${third}–${fifth}。改为第一转位，并用罗马数字分析；再找属和弦根音。`, `${key} 長調の主三和音 ${root}–${third}–${fifth} を第 1 転回形にし、ローマ数字と属和音の根音を求める。`, `In ${key} major, the tonic triad is ${root}–${third}–${fifth}. Put it in first inversion, label it with Roman numerals, then find the dominant root.`), [
      step(t('主和弦根音', '主和音の根音', 'Tonic chord root'), 'note', root),
      step(t('第一转位低音', '第 1 転回形のバス', 'First-inversion bass'), 'note', third),
      step(t('转位后的罗马数字（用 6）', '転回後のローマ数字（6 を使う）', 'Inverted Roman numeral (use 6)'), 'roman', 'I6'),
      step(t('属和弦根音', '属和音の根音', 'Dominant chord root'), 'note', fifth),
    ], ['identify', 'spell', 'voiceLeading'])),

  melody: [
    ['C4', 'D4', 'E4', 'E4'], ['D4', 'E4', 'F#4', 'F#4'], ['F4', 'G4', 'A4', 'A4'], ['G4', 'A4', 'B4', 'B4'],
  ].map(([first, middle, last, written], i) => task('melody', i, ['omt2e-embellishing', 'wiki-transposing'],
    t(`旋律 ${first}–${middle}–${last} 级进上行，中间音在弱拍；和弦含首尾音而不含中间音。找出经过音，并为 B♭ 单簧管写出该音（记谱比实音高全音）。`, `旋律 ${first}–${middle}–${last} は順次上行し、中間音は弱拍。和音は両端を含み、中間音を含まない。経過音と B♭ クラリネットの記譜音（実音より全音上）を求める。`, `The melody ${first}–${middle}–${last} rises by step; the middle note is on a weak beat. The chord contains the endpoints but not the middle note. Identify the passing tone and write it for B♭ clarinet (a whole step above concert pitch).`), [
      step(t('经过音的实音（含八度）', '経過音の実音（オクターヴつき）', 'Concert passing tone (with octave)'), 'note', middle),
      step(t('单簧管记谱音（含八度）', 'クラリネットの記譜音', 'Written clarinet note (with octave)'), 'note', written),
      step(t('记谱与实音相差几个半音？', '記譜と実音の半音差', 'Half steps between written and concert pitch'), 'number', 2),
    ], ['identify', 'spell', 'calc'])),

  jazz: [
    ['C', 'D', 'G', 'C', 'F', 'E'], ['F', 'G', 'C', 'F', 'Bb', 'A'],
    ['G', 'A', 'D', 'G', 'C', 'B'], ['Bb', 'C', 'F', 'Bb', 'Eb', 'D'],
  ].map(([key, ii, v, tonic, shared, resolved], i) => task('jazz', i, 'omt2e-iivi',
    t(`在 ${key} 大调构建 ii7–V7–Imaj7，再追踪一条导向音线：ii 的三音 → V 的七音 → I 的三音。`, `${key} 長調で ii7–V7–Imaj7 を作り、ii の 3 音 → V の 7 音 → I の 3 音を追う。`, `Build ii7–V7–Imaj7 in ${key} major, then trace one guide-tone line: ii's third → V's seventh → I's third.`), [
      step(t('ii7 根音', 'ii7 の根音', 'ii7 root'), 'note', ii),
      step(t('V7 根音', 'V7 の根音', 'V7 root'), 'note', v),
      step(t('Imaj7 根音', 'Imaj7 の根音', 'Imaj7 root'), 'note', tonic),
      step(t('ii 三音与 V 七音的共同音', 'ii の 3 音と V の 7 音の共通音', 'Shared ii third / V seventh'), 'note', shared),
      step(t('最后落到 I 的三音', 'I の 3 音への到達音', 'Final I third'), 'note', resolved),
    ], ['identify', 'spell', 'voiceLeading'])),

  world: [100, 110, 120, 130].map((frequency, i) => task('world', i, 'wiki-harmonic-series',
    t(`基音 ${frequency} Hz。比较泛音列与八度等价：先算频率，再把第 4 泛音降低两个八度。`, `基音 ${frequency} Hz。倍音列とオクターヴ等価を比べ、周波数を計算して第 4 倍音を 2 オクターヴ下げる。`, `The fundamental is ${frequency} Hz. Compare the harmonic series with octave equivalence: calculate frequencies, then lower the fourth harmonic by two octaves.`), [
      step(t('第 2 泛音频率（Hz）', '第 2 倍音の周波数（Hz）', 'Second harmonic (Hz)'), 'number', frequency * 2),
      step(t('第 3 泛音频率（Hz）', '第 3 倍音の周波数（Hz）', 'Third harmonic (Hz)'), 'number', frequency * 3),
      step(t('第 4 泛音频率（Hz）', '第 4 倍音の周波数（Hz）', 'Fourth harmonic (Hz)'), 'number', frequency * 4),
      step(t('第 4 泛音降低两个八度后的频率（Hz）', '第 4 倍音を 2 オクターヴ下げた周波数', 'Fourth harmonic down two octaves (Hz)'), 'number', frequency),
    ], ['calc', 'identify'])),

  modern: [1, 2, 3, 5].map((n, i) => task('modern', i, 'omt2e-normal-order',
    t(`音级集合 {0,4,7}：先做 T${n}，再对移位结果做 I0（x → −x mod 12）。所有答案写 0–11。`, `音級集合 {0,4,7} に T${n}、次に I0（x → −x mod 12）を適用。答えは 0–11。`, `For pitch-class set {0,4,7}, apply T${n}, then apply I0 (x → −x mod 12) to the transposed result. Write answers from 0 to 11.`), [
      ...[0, 4, 7].map((pc) => step(t(`T${n} 后原音级 ${pc} 变为`, `T${n} 後の元の音級 ${pc}`, `Original pc ${pc} after T${n}`), 'number', (pc + n) % 12)),
      step(t('移位后的第一个音级再做 I0', '移高後の最初の音級に I0', 'I0 of the first transposed pitch class'), 'number', (12 - n) % 12),
    ], ['calc', 'identify'])),
};

// 每章再加入节拍、终止、旋律改写、和声拼写或体系比较，避免综合任务只考同一种计算。
EXAM_TASKS.basics.push(
  ...[[4, 4, 8, 2], [6, 8, 6, 1.5]].map(([top, bottom, eighths, quarters], i) => task('basics', i + 4, 'omt2e-rhythm',
    t(`${top}/${bottom} 拍的一小节：用八分音符填满，再将总时值对半分。`, `${top}/${bottom} の 1 小節を 8 分音符で埋め、全体の長さを半分に分ける。`, `Fill one bar of ${top}/${bottom} with eighth notes, then divide its duration in half.`), [
      step(t('整小节的八分音符数量', '1 小節の 8 分音符の数', 'Eighth notes in the whole bar'), 'number', eighths),
      step(t('半小节的八分音符数量', '半小節の 8 分音符の数', 'Eighth notes in half a bar'), 'number', eighths / 2),
      step(t('半小节相当于几个四分音符的时值？', '半小節は 4 分音符いくつ分？', 'Half-bar duration in quarter-note units'), 'number', quarters),
    ], ['calc'])),
  ...[['D', 'F#', 'C#', 'D'], ['A', 'C#', 'G#', 'A']].map(([key, third, leading, tonic], i) => task('basics', i + 6, 'omt2e-major-scales',
    t(`写出 ${key} 大调的三音、导音及导音向上解决的音，并计算最后一步。`, `${key} 長調の第 3 音・導音・上行解決音を書き、最後の音程を計算。`, `Spell the third, leading tone and upward resolution in ${key} major, then calculate the last step.`), [
      step(t('第 3 级音', '第 3 音', 'Third scale degree'), 'note', third),
      step(t('导音', '導音', 'Leading tone'), 'note', leading),
      step(t('向上解决的音', '上行解決音', 'Upward resolution'), 'note', tonic),
      step(t('解决步距（半音数）', '解決の半音数', 'Resolution distance (half steps)'), 'number', 1),
    ], ['spell', 'calc'])),
);

EXAM_TASKS.harmony.push(
  ...[['C', 'G', 'C'], ['G', 'D', 'G']].map(([key, dominant, tonic], i) => task('harmony', i + 4, 'omt2e-cadences',
    t(`${key} 大调乐句以原位 V–I 结束，最高声部落在主音。分析和弦根音与终止类别。`, `${key} 長調のフレーズが基本形 V–I で終わり、最高声部は主音。根音と終止を分析。`, `A phrase in ${key} major ends with root-position V–I and tonic in the highest voice. Analyse the roots and cadence.`), [
      step(t('V 根音', 'V の根音', 'V root'), 'note', dominant),
      step(t('I 根音', 'I の根音', 'I root'), 'note', tonic),
      step(t('末尾最高声部的音', '最後の最高声部の音', 'Final highest-voice note'), 'note', tonic),
      step(t('终止缩写（PAC / IAC / HC）', '終止の略称（PAC / IAC / HC）', 'Cadence abbreviation (PAC / IAC / HC)'), 'text', 'PAC'),
    ], ['identify', 'spell'])),
  ...[['F', 'C', 'E', 'G', 'Bb'], ['Bb', 'F', 'A', 'C', 'Eb']].map(([key, root, third, fifth, seventh], i) => task('harmony', i + 6, 'omt2e-sevenths',
    t(`为 ${key} 大调拼写属七和弦，再把七音放在低音。`, `${key} 長調の属 7 和音を綴り、7 音をバスに置く。`, `Spell the dominant seventh in ${key} major, then put its seventh in the bass.`), [
      ...[root, third, fifth, seventh].map((note, j) => step(t(`根音起第 ${j + 1} 个和弦音`, `根音から ${j + 1} 番目の和音構成音`, `Chord tone ${j + 1} from the root`), 'note', note)),
      step(t('转位后的低音', '転回後のバス', 'Inverted bass'), 'note', seventh),
      step(t('这是第几转位？', '何転回形？', 'Which inversion number?'), 'number', 3),
    ], ['spell', 'identify'])),
);

EXAM_TASKS.melody.push(
  ...[['C4', 'D4', 'E4', 'G4', 'A4', 'B4'], ['D4', 'E4', 'F4', 'A4', 'B4', 'C5']].map(([a, b, c, x, y, z], i) => task('melody', i + 4, 'wiki-transposing',
    t(`把 ${a}–${b}–${c} 的模仿声部提高纯五度，保留音程关系。`, `${a}–${b}–${c} の模倣声部を完全 5 度上げ、音程関係を保つ。`, `Move the imitating voice ${a}–${b}–${c} up a perfect fifth, preserving interval relationships.`), [
      ...[x, y, z].map((note, j) => step(t(`移调后的第 ${j + 1} 音（含八度）`, `移調後の第 ${j + 1} 音（オクターヴつき）`, `Transposed note ${j + 1} (with octave)`), 'note', note)),
      step(t('各音移动的半音数', '各音の移動半音数', 'Half steps each note moves'), 'number', 7),
    ], ['spell', 'calc'])),
  ...[['C4', 'F4', 'E4'], ['D4', 'G4', 'F#4']].map(([bass, held, resolution], i) => task('melody', i + 6, 'omt2e-embellishing',
    t(`低音换到 ${bass} 时，先前协和的 ${held} 延留在强拍形成四度，再下行级进到 ${resolution}。分析延留与解决。`, `バスが ${bass} に変わり、準備された ${held} が強拍で 4 度に掛留し、${resolution} に順次下行する。掛留と解決を分析。`, `As the bass changes to ${bass}, the prepared ${held} is held on the strong beat as a fourth, then descends by step to ${resolution}. Analyse the suspension and resolution.`), [
      step(t('延留音（含八度）', '掛留音（オクターヴつき）', 'Suspended note (with octave)'), 'note', held),
      step(t('解决音（含八度）', '解決音（オクターヴつき）', 'Resolution note (with octave)'), 'note', resolution),
      step(t('延留音与低音的度数', '掛留音とバスの度数', 'Generic interval above bass before resolution'), 'number', 4),
      step(t('解决后与低音的度数', '解決後とバスの度数', 'Generic interval above bass after resolution'), 'number', 3),
    ], ['identify', 'calc', 'voiceLeading'])),
);

EXAM_TASKS.jazz.push(
  ...[['C', 'Db', 'F', 'Cb'], ['F', 'Gb', 'Bb', 'Fb']].map(([tonic, root, third, seventh], i) => task('jazz', i + 4, 'omt2e-substitutions',
    t(`为解决到 ${tonic} 的 V7 构建三全音替代属七和弦；按替代和弦的字母拼写，并观察低音解决。`, `${tonic} に解決する V7 のトライトーン代理属 7 和音を綴り、バスの解決を観察。`, `Build the tritone-substitute dominant seventh resolving to ${tonic}. Use the substitute chord's letter spelling and trace the bass resolution.`), [
      step(t('替代和弦根音', '代理和音の根音', 'Substitute root'), 'note', root),
      step(t('替代和弦三音', '代理和音の 3 音', 'Substitute third'), 'note', third),
      step(t('替代和弦七音', '代理和音の 7 音', 'Substitute seventh'), 'note', seventh),
      step(t('低音下行到主音的半音数', 'バスが主音へ下行する半音数', 'Half steps the bass descends to tonic'), 'number', 1),
    ], ['spell', 'calc', 'voiceLeading'])),
  ...[['D', 'E', 'A', 'C#', 'G', 'D'], ['G', 'A', 'D', 'F#', 'C', 'G']].map(([key, ii, v, third, seventh, tonic], i) => task('jazz', i + 6, 'omt2e-iivi',
    t(`构建 ${key} 小调的 iiø7–V7–i，拼写 V7 的导向音并找到主和弦根音。`, `${key} 短調の iiø7–V7–i を作り、V7 のガイド・トーンと主和音の根音を綴る。`, `Build iiø7–V7–i in ${key} minor, spelling the V7 guide tones and tonic root.`), [
      step(t('iiø7 根音', 'iiø7 の根音', 'iiø7 root'), 'note', ii),
      step(t('V7 根音', 'V7 の根音', 'V7 root'), 'note', v),
      step(t('V7 三音', 'V7 の 3 音', 'V7 third'), 'note', third),
      step(t('V7 七音', 'V7 の 7 音', 'V7 seventh'), 'note', seventh),
      step(t('i 根音', 'i の根音', 'i root'), 'note', tonic),
    ], ['spell', 'voiceLeading'])),
);

EXAM_TASKS.world.push(
  ...[[200, 300], [220, 330]].map(([low, high], i) => task('world', i + 4, 'wiki-harmonic-series',
    t(`比较 ${low} Hz 与 ${high} Hz 的音程，并把上方音降低一个八度。`, `${low} Hz と ${high} Hz の音程を比べ、上の音を 1 オクターヴ下げる。`, `Compare the interval from ${low} Hz to ${high} Hz, then lower the upper note an octave.`), [
      step(t('频率比的分子（最简整数比）', '最簡整数比の分子', 'Numerator of the reduced integer ratio'), 'number', 3),
      step(t('频率比的分母', '周波数比の分母', 'Denominator of the frequency ratio'), 'number', 2),
      step(t('上方音降低八度后的 Hz', '上音を 1 オクターヴ下げた Hz', 'Upper frequency down an octave (Hz)'), 'number', high / 2),
      step(t('原下方音现在比降八度后的音高几度？', '元の下音は今何度上？', 'Generic interval from the lowered note to the original lower note'), 'number', 4),
    ], ['calc', 'identify'])),
  ...[[12, 7, 700], [24, 7, 350]].map(([edo, steps, cents], i) => task('world', i + 6, 'wiki-cent',
    t(`把八度均分成 ${edo} 份。计算一步与 ${steps} 步的音分，再比较 1200 音分的整八度。`, `オクターヴを ${edo} 等分し、1 ステップと ${steps} ステップのセント、1200 セントまでの残りを計算。`, `Divide an octave into ${edo} equal steps. Calculate one step, ${steps} steps, and the remainder to a 1200-cent octave.`), [
      step(t('一步的音分', '1 ステップのセント', 'Cents per step'), 'number', 1200 / edo),
      step(t(`${steps} 步的音分`, `${steps} ステップのセント`, `Cents in ${steps} steps`), 'number', cents),
      step(t('距整八度还差多少音分？', 'オクターヴまで残るセント', 'Cents remaining to an octave'), 'number', 1200 - cents),
    ], ['calc'])),
);

EXAM_TASKS.modern.push(
  ...[[0, 7, 7, 5], [3, 11, 8, 4]].map(([a, b, distance, ic], i) => task('modern', i + 4, 'omt2e-pitch-class',
    t(`比较音级 ${a} 与 ${b}：计算有方向距离、反向距离和最短音程级。`, `音級 ${a} と ${b} の有向距離、逆方向の距離、最短の音程クラスを計算。`, `Compare pitch classes ${a} and ${b}: calculate directed distance, reverse distance and the shortest interval class.`), [
      step(t('向上距离（mod 12）', '上行距離（mod 12）', 'Ascending distance (mod 12)'), 'number', distance),
      step(t('反向距离（mod 12）', '逆方向の距離（mod 12）', 'Reverse distance (mod 12)'), 'number', 12 - distance),
      step(t('音程级', '音程クラス', 'Interval class'), 'number', ic),
    ], ['calc', 'identify'])),
  ...[[5, [5, 3, 10]], [8, [8, 6, 1]]].map(([n, row], i) => task('modern', i + 6, 'omt2e-pitch-class',
    t(`音列开头为 [0,2,7]。用 I${n}：x → ${n} − x mod 12 改写，再检查前两个音的音程级。`, `音列の冒頭 [0,2,7] に I${n}：x → ${n} − x mod 12 を適用し、最初の 2 音の音程クラスを確認。`, `Transform the row opening [0,2,7] with I${n}: x → ${n} − x mod 12, then check the interval class of its first two notes.`), [
      ...row.map((pc, j) => step(t(`改写后的第 ${j + 1} 个音级`, `変換後の第 ${j + 1} 音級`, `Transformed pitch class ${j + 1}`), 'number', pc)),
      step(t('前两个音的音程级', '最初の 2 音の音程クラス', 'Interval class of the first two notes'), 'number', 2),
    ], ['calc', 'identify'])),
);

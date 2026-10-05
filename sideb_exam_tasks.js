// B 面考试综合任务：把同一材料用于计算、分析与改写，避免缩题后仍只剩识记题。
// ref:omt2e-intervals ref:omt2e-roman-numerals ref:wiki-transposing ref:omt2e-embellishing
// ref:omt2e-iivi ref:wiki-harmonic-series ref:omt2e-normal-order
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

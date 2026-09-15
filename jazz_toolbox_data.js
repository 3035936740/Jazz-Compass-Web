/** Original interactive reference based on the user's 17 linked SoundQuest/Aizcutei chapters. */
const chapterUrl = slug => `https://music-theory.aizcutei.com/post/%E5%92%8C%E5%BC%A6%E7%AF%87/${encodeURIComponent(slug)}`;

export const JAZZ_CHAPTERS = Object.freeze([
  { no: 2, title: '爵士理论的和弦基础', slug: '2-爵士理论的和弦基础', group: '和声骨架', summary: '七和弦与3、7度向导音；大、小、属、半减等性质和功能要分开听。', example: 'Dm7 → G7 → Cmaj7', tool: 'progressions' },
  { no: 3, title: '二五的应用', slug: '3-二五的应用', group: '和声骨架', summary: 'Related ii、连续属和弦与ii–V链可为局部目标制造强进行。', example: 'Em7 → A7 → Dmaj7', tool: 'progressions' },
  { no: 4, title: '三全音代理的扩展①', slug: '4-三全音代理的扩展①', group: '代理与走位', summary: '不只V7，其他有属七三全音的和弦也可尝试相隔六半音的代理。', example: 'G7 ↔ Db7', tool: 'progressions' },
  { no: 5, title: '调式互换', slug: '5-调式互换', group: '代理与走位', summary: '同主音音阶之间借和弦；这与以单个和弦根音为轴的调式交换不同。', example: 'C大调 ↔ C小调', tool: 'scales' },
  { no: 6, title: '属和弦的延伸音', slug: '6-属和弦的延伸音', group: '演奏与配器', summary: '目标是大还是小会影响9、13的首选；代理属的♯11可保留原属根音。', example: 'G7(9,13) / G7(♭9,♭13)', tool: 'voicings' },
  { no: 7, title: '爵士的Voicing', slug: '7-爵士Voicing的基础', group: '演奏与配器', summary: 'Shell、Drop2、Drop3与So What排列把冠音、向导音和声部连接放在前面。', example: 'G7 → Cmaj7', tool: 'voicings' },
  { no: 8, title: 'Side Stepping', slug: '8-Side-Stepping', group: '代理与走位', summary: '短暂把即兴音阶移开半音，再返回inside；这是有意的outside而非新的调内规则。', example: 'C Dorian → Db Dorian → C Dorian', tool: 'progressions' },
  { no: 9, title: '三全音代理的扩展②', slug: '9-三全音代理的扩展②', group: '代理与走位', summary: 'ii、V、甚至I可各自翻到三全音另一侧，形成八种ii–V–I落点选择。', example: 'Dm7 → Db7 → Cmaj7', tool: 'progressions' },
  { no: 10, title: 'Coltrane Changes', slug: '10-Coltrane-changes', group: '和声骨架', summary: '对称的大三度主音轴结合V–I或ii–V–I，构成多主音系统。', example: 'C / E / Ab', tool: 'progressions' },
  { no: 11, title: '和弦音阶理论', slug: '11-和弦音阶理论', group: '和弦音阶', summary: '和弦音、可用延伸音与和声回避音组成一个可即兴的和弦音阶包。', example: 'Cmaj7 ↔ C Ionian', tool: 'scales' },
  { no: 12, title: '大调的C.S.', slug: '12-大调的C.S.', group: '和弦音阶', summary: 'Ionian、Dorian、Phrygian、Lydian、Mixolydian、Aeolian、Locrian七种调式。', example: 'C Ionian / C Lydian', tool: 'scales' },
  { no: 13, title: '和弦音阶的应用', slug: '13-和弦音阶的应用', group: '和弦音阶', summary: '重属、Related ii、sus4和六和弦的音阶选择要同时看和弦性质与去向。', example: 'E7 → Am7', tool: 'scales' },
  { no: 14, title: '旋律小调的C.S.', slug: '14-旋律小调的C.S.', group: '和弦音阶', summary: '旋律小调派生七种新调式，包括Lydian Augmented、Lydian Dominant和Super Locrian。', example: 'C Melodic Minor / C Lydian Dominant', tool: 'scales' },
  { no: 15, title: '和声小调的C.S.', slug: '15-和声小调的C.S.', group: '和弦音阶', summary: '和声小调派生七种调式，Phrygian Dominant特别适合指向小和弦的属功能。', example: 'E7(♭9,♭13) → Am', tool: 'scales' },
  { no: 16, title: '属系音阶的C.S.（减系）', slug: '16-减系音阶的C.S.', group: '和弦音阶', summary: '半全属减与全半减是两套不同的八声音阶；调内减音阶则要靠具体上下文。', example: 'C7半全 / C°7全半', tool: 'scales' },
  { no: 17, title: '几个重要的C.S.', slug: '17-几个重要的C.S.', group: '和弦音阶', summary: '全音、Altered、和声大调与Double Harmonic Major扩展了属七及大七的色彩。', example: 'C Altered / C Harmonic Major', tool: 'scales' },
  { no: 19, title: '不依赖调的调式交换', slug: '19-不依赖调的调式交换', group: '演奏与配器', summary: '固定单个和弦根音，换另一种适配音阶；可以只改延伸音，也可以改变性质。', example: 'A Dorian → A Dorian ♭2', tool: 'scales' },
].map(chapter => Object.freeze({ ...chapter, url: chapterUrl(chapter.slug) })));

export const JAZZ_PARENT_FAMILIES = Object.freeze([
  { id: 'major', label: '大调', intervals: [0, 2, 4, 5, 7, 9, 11], modes: ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'] },
  { id: 'melodicMinor', label: '旋律小调', intervals: [0, 2, 3, 5, 7, 9, 11], modes: ['Melodic Minor', 'Dorian ♭2', 'Lydian Augmented', 'Lydian Dominant', 'Mixolydian ♭6', 'Aeolian ♭5 / Locrian ♮2', 'Super Locrian'] },
  { id: 'harmonicMinor', label: '和声小调', intervals: [0, 2, 3, 5, 7, 8, 11], modes: ['Harmonic Minor', 'Locrian ♮6', 'Ionian ♯5', 'Dorian ♯4', 'Phrygian Dominant', 'Lydian ♯2', 'Altered Super Locrian'] },
]);

export const JAZZ_SPECIAL_SCALES = Object.freeze([
  { id: 'dominantDiminished', name: 'Dominant Diminished · 半全', family: '对称 / 扩展', intervals: [0, 1, 3, 4, 6, 7, 9, 10], role: '属七与减七；半音从根音开始' },
  { id: 'diminished', name: 'Diminished · 全半', family: '对称 / 扩展', intervals: [0, 2, 3, 5, 6, 8, 9, 11], role: '减七；全音从根音开始' },
  { id: 'wholeTone', name: 'Whole Tone · 全音', family: '对称 / 扩展', intervals: [0, 2, 4, 6, 8, 10], role: '增属和弦；通常省略或改变完全五度' },
  { id: 'altered', name: 'Altered Dominant', family: '对称 / 扩展', intervals: [0, 1, 3, 4, 6, 8, 10], role: '属七♭9 / ♯9 / ♯11 / ♭13；通常省略完全五度' },
  { id: 'harmonicMajor', name: 'Harmonic Major · 和声大调', family: '对称 / 扩展', intervals: [0, 2, 4, 5, 7, 8, 11], role: '大七与♭13色彩' },
  { id: 'doubleHarmonicMajor', name: 'Double Harmonic Major · 双和声大调', family: '对称 / 扩展', intervals: [0, 1, 4, 5, 7, 8, 11], role: '大七、♭9和♭13；强烈增二度' },
]);

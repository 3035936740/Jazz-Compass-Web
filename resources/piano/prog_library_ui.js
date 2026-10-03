// 套路和弦进行速查（和弦进行播放器里的一个分页）：查询 筛选 紧凑列表 展开后看五线谱 和弦 功能 低音线 变形操作 旋律兼容 试听与 A/B 对照
// 逻辑见 prog_library.js，资料见 prog_library_data.js；五线谱沿用 learn_visuals.js 的谱例绘制，送到五线谱沿用 staff_handoff.js
// 依据见两个文件顶部；这里引用的说明：ref:omt-pb-4chord ref:omt-pb-substitutions ref:omt2e-roman-numerals ref:omt-pb-modal-schemas
import {
  prepareEntries, searchEntries, realizeAll, versionOf, functionsOf, voiceProgression, playbackEvents, OPERATIONS, melodyCheck,
  KEYS, rotations, romanOf, QUALITIES, spell,
} from './prog_library.js?v=20261003-p2';
import { ENTRIES, FEEL_TAGS, CATEGORIES, KINDS, SOURCES, FAMILIES } from './prog_library_data.js?v=20261003-p2';
import { el, button, option, field, language, midiToFrequency, cite, sourcesFooter } from './module_kit.js';
import { renderVisual } from './learn_visuals.js?v=20261003-r31';
import { sendToStaff, satbToVoices } from './staff_handoff.js?v=20261003-h1';
import { bassLine } from './prog_quiz.js';
import { worksheetHTML, openWorksheet } from './worksheet.js?v=20261003-w1';
import { referenceById } from './references.js';

const TEXT = {
  zh: {
    title: '套路和弦进行速查', kicker: '资料库',
    intro: '能查询 能试听 能比较变体的和弦进行资料库 收录用户指定的进行 三张参考图片里的进行和根据教材补充的常见套路 不代表列出了所有可能的进行',
    rules: '记号说明',
    ruleLines: [
      '纯数字按大调音阶内三和弦解释 1=I 2=ii 3=iii 4=IV 5=V 6=vi 7=vii°（C 大调 C Dm Em F G Am Bdim）',
      '改变性质要写出来 3m=iii 3大=III 6大=VI 4m=iv b7=♭VII #5dim7=♯v°7；带 b 的级数默认大三 带 # 的默认减三',
      '罗马数字区分大小写 大写=大三 小写=小三 °=减 ø7=半减七 °7=减七 (maj7)=小大七',
      '小调条目按平行大调参照写 C 小调的 Cm Ab Bb 写成 i ♭VI ♭VII（可切换成小调内部级数显示 两种体系不混用）',
      '/3 /5 /7 表示低音是和弦的三音 五音 七音（G/B 的根音仍是 G）；(add6) 是流行记号的加六度 Cm6 不是古典 i6 的转位',
      '听感标签只是常见倾向 速度 节奏 配器 音区 旋律 和声节奏 转位与力度都会改变听感',
    ],
    search: '查询', placeholder: '4361 / 4-3-6-1 / IV iii vi I / F Em Am C / 关键词',
    key: '主音', version: '版本', versions: { original: '原版', triad: '三和弦', seventh: '七和弦' }, voicing: '配置', voicings: { smooth: '流行 / 爵士平滑', classical: '严格古典四部' },
    meter: '拍子', tempo: '速度', beats: '每和弦拍数', texture: '织体', textures: { block: '柱式', pulse: '每拍', arpeggio: '琶音（从实际低音起）', root: '根音琶音（忽略转位）' },
    part: '声部', parts: { all: '全部', bass: '只听低音', upper: '只听和声' }, minorInternal: '小调内部级数',
    filters: '筛选', feels: '听感', family: '家族', allFamilies: '全部家族', source: '来源', any: '全部',
    count: (n, total) => `${n} / ${total} 条`, none: '没有找到 换个写法试试',
    printSheet: '打印速查表', printQuiz: '打印练习卷（含答案）', printHint: '打印的是当前筛选出来的条目（练习卷最多 20 题）',
    sheetTitle: (k) => `套路和弦进行速查（${k} 调）`, quizTitle: (k) => `套路和弦进行练习（${k} 调）`, sheetCols: ['数字', '罗马数字', '和弦', '低音', '类型', '说明', '出处'],
    qChords: (roman, k) => `把 ${roman} 写成 ${k} 调的和弦`, qBass: (roman) => `${roman} 的低音线（相对主音的级数）是哪一条？`,
    readDigits: (key) => `按 ${key} 大调音阶内和弦解释数字 7 = vii°`, readRoman: '按罗马数字读（大小写区分性质）',
    readSymbols: (list) => `和弦名反查 可能的调：${list}`, readText: '按文字搜索名称 别名 原文与标签',
    match: { exact: '完全相同', rotation: '循环旋转', contains: '包含这段', within: '是查询的一部分', text: '文字', all: '' },
    cols: ['数字', '级数', '例子', '类型', '标签'],
    original: '原图原文', originalFeel: '原图听感', scene: '原图场景', normalized: '规范化说明',
    suggested: '建议听感（不是图片原文 只是常见倾向）', theory: '理论解释', limits: '适用限制', status: { verified: '已核对', example: '示例', ambiguous: '有歧义' },
    chordTable: ['级数', '和弦', '功能', '和弦音', '低音'], bassLine: '低音线', inversion: ['原位', '第一转位', '第二转位', '第三转位'],
    play: '► 整段', loop: '循环', stop: '■ 停止', segment: '选中片段', from: '从', to: '到', playSeg: '► 片段', ab: 'A/B 对照', abHint: 'A=原版 B=当前变形 速度与音色相同',
    ops: '变形与代理', op: '操作', target: '目标和弦', opOption: '选项', apply: '应用', undo: '撤销', reset: '重置', history: '已做的变形', noOps: '还没有变形 每次只做一两种 看清楚变化发生在哪里',
    opNote: '相关变体不代表任何情况下都能互换',
    melody: '旋律兼容', melodyHint: '每个和弦一个旋律音 例如 C B E C', roles: { chord: '和弦音', tension: '延伸音', clash: '需要解决', bad: '读不懂' },
    melodyOrig: '原版', melodyNow: '当前',
    family2: '同一家族', rotations: '循环旋转（和弦相同 起点与主音感不同）', skeleton: '五度链骨架（根音一路下行五度 F→B 是减五度）',
    send: '送入和弦进行播放器', sendStaff: '送到五线谱', variantOf: (name, how) => `${how}（来自 ${name}）`,
    triadNote: '三和弦版说明', seventhNote: '七和弦的选择理由', fallback: (r) => `严格古典配置失败 已改用平滑配置：${r}`, noTriad: '不提供三和弦版',
    arpNote: '琶音里的 1 3 5 指和弦内音（根音 三音 五音）不是调内级数',
    aliases: '检索别名', perEntry: '按条目', playSettings: '试听设置（配置 拍子 速度 织体）', majorWord: '大调', minorWord: '小调', seventhOriginal: '原版含七和弦',
    sendForm: '送入曲式结构', sendFormHint: '曲式结构里的主要段落（A）会改用这条进行 对比段落照常生成',
  },
  ja: {
    title: '定番進行の早見表', kicker: '資料集',
    intro: '調べて・聴いて・変形を比べられるコード進行の資料集。ユーザー指定の進行、参考画像 3 枚の進行、教科書から補った定番の型を収録。あらゆる進行を網羅しているわけではない',
    rules: '表記の説明',
    ruleLines: [
      '数字だけの場合は長調の音階内の三和音：1=I 2=ii 3=iii 4=IV 5=V 6=vi 7=vii°（ハ長調で C Dm Em F G Am Bdim）',
      '性質を変える時は書く：3m=iii 3大=III 6大=VI 4m=iv b7=♭VII #5dim7=♯v°7。b 付きの度数は長三、# 付きは減三が既定',
      'ローマ数字は大文字小文字で区別：大文字=長三 小文字=短三 °=減 ø7=ハーフ・ディミニッシュ °7=減七 (maj7)=マイナー・メジャー',
      '短調の項目は同主長調基準：ハ短調の Cm A♭ B♭ は i ♭VI ♭VII（短調内部の度数表示に切り替え可能、2 つの体系は混ぜない）',
      '/3 /5 /7 はバスが和音の 3 音・5 音・7 音（G/B の根音は G）。(add6) はポップスの付加 6 度 Cm6 で、古典の i6 の転回形ではない',
      '聴感のタグは傾向にすぎない。テンポ・リズム・編成・音域・旋律・和声リズム・転回形・強弱で印象は変わる',
    ],
    search: '検索', placeholder: '4361 / 4-3-6-1 / IV iii vi I / F Em Am C / キーワード',
    key: '主音', version: '版', versions: { original: '元の版', triad: '三和音', seventh: '七の和音' }, voicing: '配置', voicings: { smooth: 'ポップス / ジャズのなめらかな配置', classical: '厳格な古典四声' },
    meter: '拍子', tempo: 'テンポ', beats: '1 和音の拍数', texture: '奏法', textures: { block: 'ブロック', pulse: '毎拍', arpeggio: 'アルペジオ（実際のバスから）', root: '根音アルペジオ（転回形を無視）' },
    part: '声部', parts: { all: 'すべて', bass: 'バスだけ', upper: '和声だけ' }, minorInternal: '短調内部の度数',
    filters: '絞り込み', feels: '聴感', family: 'ファミリー', allFamilies: 'すべてのファミリー', source: '出どころ', any: 'すべて',
    count: (n, total) => `${n} / ${total} 件`, none: '見つかりません。別の書き方で',
    printSheet: '早見表を印刷', printQuiz: '練習プリントを印刷（解答つき）', printHint: '今しぼり込まれている項目を印刷します（練習プリントは最大 20 問）',
    sheetTitle: (k) => `定番進行の早見表（${k}）`, quizTitle: (k) => `定番進行の練習（${k}）`, sheetCols: ['数字', 'ローマ数字', 'コード', 'バス', '種類', '説明', '出典'],
    qChords: (roman, k) => `${roman} を ${k} のコードで書くと？`, qBass: (roman) => `${roman} のバスライン（主音からの度数）はどれ？`,
    readDigits: (key) => `${key} 長調の音階内の和音として数字を読む。7 = vii°`, readRoman: 'ローマ数字として読む（大文字小文字で性質）',
    readSymbols: (list) => `コード名から逆引き、考えられる調：${list}`, readText: '名前・別名・原文・タグを文字で検索',
    match: { exact: '完全一致', rotation: 'ローテーション', contains: 'この部分を含む', within: '検索の一部', text: '文字', all: '' },
    cols: ['数字', '度数', '例', '種類', 'タグ'],
    original: '画像の原文', originalFeel: '画像の聴感', scene: '画像の場面', normalized: '正規化の説明',
    suggested: '補足の聴感（画像の原文ではなく傾向にすぎない）', theory: '理論の説明', limits: '適用の限界', status: { verified: '確認済み', example: '例', ambiguous: 'あいまい' },
    chordTable: ['度数', '和音', '働き', '構成音', 'バス'], bassLine: 'バスライン', inversion: ['基本形', '第 1 転回形', '第 2 転回形', '第 3 転回形'],
    play: '► 通して再生', loop: 'ループ', stop: '■ 停止', segment: '一部', from: 'から', to: 'まで', playSeg: '► 一部を再生', ab: 'A/B 比較', abHint: 'A=元の版 B=現在の変形、テンポと音色は同じ',
    ops: '変形と代理', op: '操作', target: '対象の和音', opOption: 'オプション', apply: '適用', undo: '元に戻す', reset: 'リセット', history: '行った変形', noOps: 'まだ変形していない。1 回に 1〜2 個、どこでなぜ変わるかを確かめて',
    opNote: '関連する変形でも、どんな場合でも入れ替えられるわけではない',
    melody: '旋律との相性', melodyHint: '和音ごとに旋律音を 1 つ、例 C B E C', roles: { chord: '和音の音', tension: '延長音', clash: '解決が必要', bad: '読めない' },
    melodyOrig: '元の版', melodyNow: '現在',
    family2: '同じファミリー', rotations: 'ローテーション（和音は同じ、始まりと主音感が違う）', skeleton: '5 度の連鎖の骨組み（根音が 5 度ずつ下行、F→B は減 5 度）',
    send: 'コード進行プレーヤーへ送る', sendStaff: '五線譜へ送る', variantOf: (name, how) => `${how}（${name} から）`,
    triadNote: '三和音版の説明', seventhNote: '七の和音の選び方', fallback: (r) => `厳格な古典配置ができなかったので、なめらかな配置にした：${r}`, noTriad: '三和音版はない',
    arpNote: 'アルペジオの 1 3 5 は和音の構成音（根音・3 音・5 音）で、調の度数ではない',
    aliases: '検索用の別名', perEntry: '項目どおり', playSettings: '試聴の設定（配置・拍子・テンポ・奏法）', majorWord: '長調', minorWord: '短調', seventhOriginal: '元の版は七の和音',
    sendForm: '楽式構造へ送る', sendFormHint: '楽式構造の主要部分（A）がこの進行になり、対照部分はいつも通り生成される',
  },
  en: {
    title: 'Progression library', kicker: 'Library',
    intro: 'Look up, hear and compare common chord progressions: the user’s list, the three reference images and schemas added from textbooks. Not every possible progression.',
    rules: 'Notation',
    ruleLines: [
      'Plain digits are diatonic triads in major: 1=I 2=ii 3=iii 4=IV 5=V 6=vi 7=vii° (C Dm Em F G Am Bdim in C)',
      'Mark other qualities: 3m=iii, 3大=III, 6大=VI, 4m=iv, b7=♭VII, #5dim7=♯v°7; b-degrees default to major, #-degrees to diminished',
      'Roman numerals are case-sensitive: upper=major, lower=minor, °=dim, ø7=half-dim, °7=dim7, (maj7)=minor-major',
      'Minor entries use the parallel-major reference: Cm Ab Bb in C minor = i ♭VI ♭VII (switchable to minor-internal numerals, never mixed)',
      '/3 /5 /7 put the chord’s third, fifth or seventh in the bass (G/B still has root G); (add6) is the pop added sixth (Cm6), not the classical i6 inversion',
      'Feel tags are tendencies: tempo, rhythm, scoring, register, melody, harmonic rhythm, inversions and dynamics all change the effect',
    ],
    search: 'Search', placeholder: '4361 / 4-3-6-1 / IV iii vi I / F Em Am C / keyword',
    key: 'Tonic', version: 'Version', versions: { original: 'original', triad: 'triads', seventh: 'sevenths' }, voicing: 'Voicing', voicings: { smooth: 'pop / jazz smooth', classical: 'strict classical SATB' },
    meter: 'Meter', tempo: 'Tempo', beats: 'Beats per chord', texture: 'Texture', textures: { block: 'block', pulse: 'on the beat', arpeggio: 'arpeggio (from the real bass)', root: 'root arpeggio (ignores inversion)' },
    part: 'Part', parts: { all: 'all', bass: 'bass only', upper: 'harmony only' }, minorInternal: 'minor-internal numerals',
    filters: 'Filters', feels: 'Feel', family: 'Family', allFamilies: 'all families', source: 'Source', any: 'any',
    count: (n, total) => `${n} / ${total}`, none: 'Nothing found — try another spelling',
    printSheet: 'Print the reference sheet', printQuiz: 'Print a worksheet (with answers)', printHint: 'Prints the entries currently filtered (the worksheet takes up to 20)',
    sheetTitle: (k) => `Progression library (key of ${k})`, quizTitle: (k) => `Progression worksheet (key of ${k})`, sheetCols: ['Digits', 'Roman', 'Chords', 'Bass', 'Type', 'Notes', 'Sources'],
    qChords: (roman, k) => `Write ${roman} as chords in ${k}`, qBass: (roman) => `Which bass line (degrees from the tonic) does ${roman} have?`,
    readDigits: (key) => `digits read as diatonic chords of ${key} major; 7 = vii°`, readRoman: 'read as Roman numerals (case = quality)',
    readSymbols: (list) => `chord names — possible keys: ${list}`, readText: 'text search in names, aliases, originals and tags',
    match: { exact: 'exact', rotation: 'rotation', contains: 'contains it', within: 'part of the query', text: 'text', all: '' },
    cols: ['Digits', 'Roman', 'Example', 'Type', 'Tags'],
    original: 'Original text', originalFeel: 'Feel in the image', scene: 'Use in the image', normalized: 'Normalisation',
    suggested: 'Suggested feel (not from the image — a tendency only)', theory: 'Theory', limits: 'Limits', status: { verified: 'checked', example: 'example', ambiguous: 'ambiguous' },
    chordTable: ['Roman', 'Chord', 'Function', 'Tones', 'Bass'], bassLine: 'Bass line', inversion: ['root', '1st inv.', '2nd inv.', '3rd inv.'],
    play: '► Play', loop: 'Loop', stop: '■ Stop', segment: 'Segment', from: 'from', to: 'to', playSeg: '► Segment', ab: 'A/B', abHint: 'A = original, B = current variant, same tempo and sound',
    ops: 'Variants & substitutions', op: 'Operation', target: 'Target chord', opOption: 'Option', apply: 'Apply', undo: 'Undo', reset: 'Reset', history: 'Applied', noOps: 'No changes yet — one or two at a time, so you can see where and why',
    opNote: 'Related variants are not interchangeable in every situation',
    melody: 'Melody check', melodyHint: 'one melody note per chord, e.g. C B E C', roles: { chord: 'chord tone', tension: 'tension', clash: 'needs resolution', bad: '?' },
    melodyOrig: 'original', melodyNow: 'current',
    family2: 'Same family', rotations: 'Rotations (same chords, different start and tonic feel)', skeleton: 'Circle-of-fifths skeleton (roots fall by fifths; F→B is a diminished fifth)',
    send: 'Send to the progression player', sendStaff: 'Send to staff', variantOf: (name, how) => `${how} (from ${name})`,
    triadNote: 'Triad version notes', seventhNote: 'Why these sevenths', fallback: (r) => `strict classical voicing failed, using smooth voicing: ${r}`, noTriad: 'no triad version',
    arpNote: 'In arpeggios, 1 3 5 are chord members (root, third, fifth), not scale degrees',
    aliases: 'search aliases', perEntry: 'per entry', playSettings: 'Listening settings (voicing, meter, tempo, texture)', majorWord: 'major', minorWord: 'minor', seventhOriginal: 'seventh original',
    sendForm: 'Send to form', sendFormHint: 'The form tool’s main sections (A) will use this progression; contrasting sections are generated as usual',
  },
};

const FEEL_KEYS = Object.keys(FEEL_TAGS);
const CAT_KEYS = Object.keys(CATEGORIES);

/** prettify 'Bb' → 'B♭' for display */
const pretty = (s) => String(s).replace(/([A-G])bb/g, '$1𝄫').replace(/([A-G])b/g, '$1♭').replace(/([A-G])#/g, '$1♯').replace(/m7b5/g, 'm7♭5').replace(/\(b9\)/g, '(♭9)');

export function mountProgressionLibrary(target, { playChord, onSendToPlayer = null } = {}) {
  const lang = language();
  const t = TEXT[lang] || TEXT.en;
  const tx = (v) => (v == null ? '' : typeof v === 'string' ? v : v[lang] ?? v.en ?? v.zh ?? '');
  const entries = prepareEntries(ENTRIES);
  const byId = new Map(entries.map((e) => [e.id, e]));
  const state = { q: '', key: 'C', version: 'original', voicing: 'smooth', meter: 4, tempo: 84, beats: null, texture: 'block', part: 'all', loop: false, minorInternal: false, cats: new Set(), feels: new Set(), family: '', source: '', open: null };
  let timers = [];
  let playing = false;
  const stop = () => {
    timers.forEach(clearTimeout); timers = [];
    if (playing) playChord([], 0.01);
    playing = false;
    target.querySelectorAll('.pl-chord.is-playing').forEach((n) => n.classList.remove('is-playing'));
  };
  target.addEventListener('toolbox-stop', stop);

  target.replaceChildren();
  const root = el('div', 'mk pl');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));
  const rules = el('details', 'pl-rules');
  rules.appendChild(el('summary', '', t.rules));
  const ul = el('ul');
  t.ruleLines.forEach((line) => ul.appendChild(el('li', '', line)));
  rules.appendChild(ul);

  // ---------- 查询与设置 ----------
  const input = el('input', 'pl-search');
  input.type = 'search'; input.placeholder = t.placeholder; input.setAttribute('aria-label', t.search);
  const select = (items, value, onChange) => { const s = el('select'); Object.entries(items).forEach(([id, label]) => s.appendChild(option(id, label))); s.value = String(value); s.addEventListener('change', () => onChange(s.value)); return s; };
  const keySelect = select(Object.fromEntries(KEYS.major.map((k) => [k, pretty(k)])), 'C', (v) => { state.key = v; paintList(); paintDetail(); });
  const versionSelect = select(t.versions, 'original', (v) => { state.version = v; resetWork(); paintDetail(); });
  const voicingSelect = select(t.voicings, 'smooth', (v) => { state.voicing = v; paintDetail(); });
  const meterSelect = select({ 4: '4/4', 3: '3/4' }, 4, (v) => { state.meter = Number(v); paintDetail(); });
  const tempo = el('input'); tempo.type = 'number'; tempo.min = '40'; tempo.max = '200'; tempo.value = '84';
  tempo.addEventListener('change', () => { state.tempo = Math.max(40, Math.min(200, Number(tempo.value) || 84)); });
  const beatsSelect = select({ '': t.perEntry, 1: '1', 2: '2', 3: '3', 4: '4', 6: '6', 8: '8' }, '', (v) => { state.beats = v ? Number(v) : null; });
  const textureSelect = select(t.textures, 'block', (v) => { state.texture = v; });
  const partSelect = select(t.parts, 'all', (v) => { state.part = v; });
  const loopBox = el('input'); loopBox.type = 'checkbox';
  loopBox.addEventListener('change', () => { state.loop = loopBox.checked; });
  const loopLabel = el('label', 'pl-check'); loopLabel.append(loopBox, document.createTextNode(` ${t.loop}`));
  const minorBox = el('input'); minorBox.type = 'checkbox';
  minorBox.addEventListener('change', () => { state.minorInternal = minorBox.checked; paintList(); paintDetail(); });
  const minorLabel = el('label', 'pl-check'); minorLabel.append(minorBox, document.createTextNode(` ${t.minorInternal}`));
  const searchRow = el('div', 'mk-controls');
  searchRow.append(field(t.search, input, 'mk-grow'), field(t.key, keySelect), field(t.version, versionSelect));
  const playRow = el('div', 'mk-controls pl-play-settings');
  playRow.append(field(t.voicing, voicingSelect), field(t.meter, meterSelect), field(t.tempo, tempo), field(t.beats, beatsSelect), field(t.texture, textureSelect), field(t.part, partSelect), loopLabel, minorLabel);
  const reading = el('p', 'mk-hint pl-reading');

  // ---------- 筛选 ----------
  const filters = el('details', 'pl-filters');
  filters.appendChild(el('summary', '', t.filters));
  const chipRow = (keys, labels, set) => {
    const row = el('div', 'pl-chips');
    keys.forEach((k) => {
      const chip = button('pl-chip', tx(labels[k]), () => { if (set.has(k)) set.delete(k); else set.add(k); chip.classList.toggle('is-on', set.has(k)); chip.setAttribute('aria-pressed', String(set.has(k))); paintList(); });
      chip.setAttribute('aria-pressed', 'false');
      row.appendChild(chip);
    });
    return row;
  };
  const familySelect = select({ '': t.allFamilies, ...Object.fromEntries(Object.entries(FAMILIES).map(([k, v]) => [k, tx(v)])) }, '', (v) => { state.family = v; paintList(); });
  const sourceSelect = select({ '': t.any, ...Object.fromEntries(Object.entries(SOURCES).map(([k, v]) => [k, tx(v)])) }, '', (v) => { state.source = v; paintList(); });
  const filterSelects = el('div', 'mk-controls');
  filterSelects.append(field(t.family, familySelect), field(t.source, sourceSelect));
  filters.append(chipRow(CAT_KEYS, CATEGORIES, state.cats), el('div', 'pl-chip-title', t.feels), chipRow(FEEL_KEYS, FEEL_TAGS, state.feels), filterSelects);

  const count = el('p', 'mk-meta pl-count');
  const list = el('div', 'pl-list');
  list.setAttribute('role', 'list');
  // 试听设置收在一个折叠块里（这是资料库自己的试听 不是播放器）
  const playWrap = el('details', 'pl-play-wrap');
  playWrap.append(el('summary', '', t.playSettings), playRow);
  // 打印：当前筛选结果的速查表 / 练习卷（新开一页，用浏览器打印，可存为 PDF）
  const printBar = el('div', 'mk-actions pl-print');
  printBar.append(button('btn btn-ghost btn-sm', t.printSheet, () => printReference()), button('btn btn-ghost btn-sm', t.printQuiz, () => printQuiz()), el('span', 'mk-meta', t.printHint));
  root.append(head, rules, searchRow, reading, filters, playWrap, count, printBar, list);
  target.appendChild(root);

  // ---------- 列表 ----------
  let results = [];
  const realizeFor = (entry, chords) => {
    const key = entry.mode === 'minor' ? (KEYS.minor[KEYS.major.indexOf(state.key)] || state.key) : state.key;
    return { key, real: realizeAll(chords, key) };
  };
  const romanText = (entry, chords) => chords.map((c) => romanOf(c, { minorInternal: state.minorInternal && entry.mode === 'minor' })).join(' ');

  const escHtml = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const chordsText = (entry) => realizeFor(entry, entry.chords).real.map((r) => pretty(r.symbol)).join(' ');
  function printReference() {
    const rows = results.map(({ entry }) => `<tr><td>${escHtml(entry.digits)}</td><td>${escHtml(romanText(entry, entry.chords))}</td><td>${escHtml(chordsText(entry))}</td><td>${escHtml(bassLine(entry.chords))}</td><td>${escHtml(tx(KINDS[entry.kind]))}</td><td>${escHtml(tx(entry.theory))}</td><td>${escHtml((entry.refs || []).map((id) => referenceById(id)?.title || id).join('；'))}</td></tr>`).join('');
    const title = t.sheetTitle(pretty(state.key));
    openWorksheet(title, `<h1>${escHtml(title)}</h1><table class="ws-table"><thead><tr>${t.sheetCols.map((c) => `<th>${escHtml(c)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`);
  }
  function printQuiz() {
    const pool = results.map((r) => r.entry).slice(0, 20);
    const cards = [];
    pool.forEach((entry, i) => {
      const others = results.map((r) => r.entry).filter((e) => e !== entry);
      const roman = romanText(entry, entry.chords);
      const distinct = (label) => { const out = []; for (const e of [...others.slice(i), ...others.slice(0, i)]) { const text = label(e); if (text !== label(entry) && !out.includes(text)) out.push(text); if (out.length >= 3) break; } return out; };
      const k = pretty(realizeFor(entry, entry.chords).key) + (entry.mode === 'minor' ? 'm' : '');
      if (i % 2 === 0) cards.push({ type: 'choice', ref: entry.refs?.[0], prompt: t.qChords(roman, k), options: [chordsText(entry), ...distinct(chordsText)], answer: 0, explain: entry.theory });
      else cards.push({ type: 'choice', ref: entry.refs?.[0], prompt: t.qBass(roman), options: [bassLine(entry.chords), ...distinct((e) => bassLine(e.chords))], answer: 0, explain: entry.theory });
    });
    const title = t.quizTitle(pretty(state.key));
    const { html } = worksheetHTML({ title, sections: [{ cards: cards.filter((c) => c.options.length >= 2) }], lang, seed: `${state.key}:${pool.map((e) => e.id).join()}` });
    openWorksheet(title, html);
  }

  function paintList() {
    const found = searchEntries(entries, state.q, { lang });
    const q = found.query;
    if (q.kind === 'digits') reading.textContent = t.readDigits(pretty(state.key));
    else if (q.kind === 'roman') reading.textContent = t.readRoman;
    else if (q.kind === 'symbols') reading.textContent = t.readSymbols(q.readings.map((r) => `${pretty(r.tonic)} ${r.mode === 'major' ? t.majorWord : t.minorWord} ${r.chords.map((c) => romanOf(c)).join(' ')}`).join(' · ') || '—');
    else if (q.kind === 'text') reading.textContent = t.readText;
    else reading.textContent = '';
    results = found.results.filter(({ entry }) =>
      [...state.cats].every((c) => entry.cats.includes(c)) && [...state.feels].every((f) => entry.tags.includes(f))
      && (!state.family || entry.family === state.family) && (!state.source || entry.source === state.source));
    count.textContent = t.count(results.length, entries.length);
    list.replaceChildren();
    if (!results.length) { list.appendChild(el('p', 'mk-hint', t.none)); return; }
    const headRow = el('div', 'pl-row pl-row-head');
    const headCols = el('div', 'pl-open');
    ['pl-digits', 'pl-roman', 'pl-example', 'pl-kind', 'pl-tags'].forEach((cls, i) => headCols.appendChild(el('span', cls, t.cols[i])));
    headRow.append(el('span', ''), headCols);
    list.appendChild(headRow);
    results.forEach(({ entry, match, reading: rd }) => {
      const row = el('div', `pl-row${state.open === entry.id ? ' is-open' : ''}`);
      row.setAttribute('role', 'listitem');
      row.dataset.id = entry.id;
      const { real } = realizeFor(entry, entry.chords);
      const playBtn = button('pl-mini', '►', (e) => { e.stopPropagation(); playEntry(entry, entry.chords); });
      playBtn.setAttribute('aria-label', `${t.play} ${entry.digits}`);
      const open = button('pl-open', '', () => { state.open = state.open === entry.id ? null : entry.id; resetWork(); paintList(); paintDetail(); });
      open.append(el('span', 'pl-digits', entry.digits), el('span', 'pl-roman', romanText(entry, entry.chords)), el('span', 'pl-example', real.map((r) => pretty(r.symbol)).join(' ')),
        el('span', 'pl-kind', `${tx(KINDS[entry.kind])}${match && t.match[match] ? ` · ${t.match[match]}` : ''}${rd?.tonic ? ` · ${pretty(rd.tonic)}` : ''}`),
        el('span', 'pl-tags', entry.tags.slice(0, 3).map((k) => tx(FEEL_TAGS[k])).join(' ')));
      open.setAttribute('aria-expanded', String(state.open === entry.id));
      row.append(playBtn, open);
      list.appendChild(row);
      if (state.open === entry.id) list.appendChild(detail);
    });
  }

  // ---------- 展开详情 ----------
  const detail = el('div', 'pl-detail');
  let work = null; // { history: [{ op, args, chords, changes }], chords }
  const resetWork = () => { work = null; };
  const currentEntry = () => byId.get(state.open);
  const baseChords = (entry) => {
    if (state.version === 'triad' && entry.noTriad) return { chords: entry.chords, notes: [{ at: -1, note: entry.noTriad }] };
    return versionOf(entry.chords, state.version, { style: entry.style, mode: entry.mode, loop: entry.kind === 'loop' });
  };
  const activeChords = (entry) => (work?.history.length ? work.history.at(-1).chords : baseChords(entry).chords);
  const durationsOf = (entry, chords) => chords.map((c) => (state.beats ?? entry.beats) * (c.half ? 0.5 : 1) * (c.scale || 1));

  function paintDetail() {
    detail.replaceChildren();
    const entry = currentEntry();
    if (!entry) return;
    if (!work) work = { history: [] };
    const base = baseChords(entry);
    const chords = activeChords(entry);
    const { key, real } = realizeFor(entry, chords);
    const funcs = functionsOf(chords, { loop: entry.kind === 'loop' });
    const refs = [...new Set(entry.refs)];

    // 头部
    const top = el('div', 'pl-detail-head');
    top.append(el('strong', '', `${entry.digits} · ${romanText(entry, entry.chords)}`));
    const badges = el('div', 'pl-badges');
    badges.append(el('span', 'mk-badge', tx(SOURCES[entry.source])), el('span', 'mk-badge', tx(KINDS[entry.kind])), el('span', `mk-badge${entry.status === 'verified' ? ' is-accent' : ''}`, t.status[entry.status]), el('span', 'mk-badge', tx(FAMILIES[entry.family])));
    if (entry.hasSeventh) badges.appendChild(el('span', 'mk-badge is-brass', t.seventhOriginal));
    top.appendChild(badges);
    if (entry.aliases.length) top.appendChild(el('p', 'mk-meta', `${t.aliases}：${entry.aliases.join(' · ')}`));
    detail.appendChild(top);

    // 三类说明
    const notes = el('div', 'pl-notes');
    if (entry.original) {
      const box = el('div', 'pl-note is-original');
      box.appendChild(el('span', 'pl-note-title', t.original));
      box.appendChild(el('p', 'pl-original-text', entry.original.text));
      if (entry.original.feel) box.appendChild(el('p', '', `${t.originalFeel}：${entry.original.feel}`));
      if (entry.original.scene) box.appendChild(el('p', '', `${t.scene}：${entry.original.scene}`));
      if (entry.original.note) box.appendChild(el('p', 'pl-normalized', `${t.normalized}：${tx(entry.original.note)}`));
      notes.appendChild(box);
    }
    if (entry.suggested) { const box = el('div', 'pl-note is-suggested'); box.append(el('span', 'pl-note-title', t.suggested), el('p', '', entry.suggested)); notes.appendChild(box); }
    const theory = el('div', 'pl-note is-theory');
    const tp = el('p', '', tx(entry.theory));
    refs.forEach((id) => { tp.append(' '); tp.appendChild(cite(refs, id)); });
    theory.append(el('span', 'pl-note-title', t.theory), tp);
    if (entry.limits) theory.appendChild(el('p', 'mk-meta', `${t.limits}：${tx(entry.limits)}`));
    if (entry.variantOf && byId.get(entry.variantOf.id)) {
      const v = byId.get(entry.variantOf.id);
      theory.appendChild(button('pl-link', t.variantOf(v.digits, tx(entry.variantOf.how)), () => { state.open = v.id; resetWork(); paintList(); paintDetail(); }));
    }
    notes.appendChild(theory);
    detail.appendChild(notes);

    // 版本说明
    if (base.notes.length && state.version !== 'original' && !work.history.length) {
      const box = el('details', 'pl-version-notes');
      box.appendChild(el('summary', '', state.version === 'triad' ? t.triadNote : t.seventhNote));
      base.notes.forEach((n) => box.appendChild(el('p', 'mk-meta', `${n.at >= 0 ? `${n.at + 1}. ` : ''}${tx(n.note)}${n.alts?.length ? ` | ${n.alts.map((a) => `${QUALITIES[a.quality].sym || a.quality}：${tx(a.reason)}`).join(' | ')}` : ''}`)));
      detail.appendChild(box);
    }

    // 和弦表（点一下试听单个和弦）
    const voiced = voiceProgression(chords, { key, style: state.voicing });
    if (voiced.fallbackReason) detail.appendChild(el('p', 'mk-hint is-error', t.fallback(voiced.fallbackReason)));
    const changed = new Set(work.history.length ? work.history.at(-1).changes.map((c) => c.at) : []);
    const table = el('div', 'pl-chords');
    real.forEach((r, i) => {
      const cell = button(`pl-chord${changed.has(i) ? ' is-changed' : ''}`, '', () => { stop(); playVoices([{ ...voiced.voices[i], index: i }], [state.beats ?? entry.beats]); });
      cell.dataset.index = String(i);
      cell.append(el('span', 'pl-chord-roman', romanOf(chords[i], { minorInternal: state.minorInternal && entry.mode === 'minor' })), el('strong', '', pretty(r.symbol)), el('span', 'pl-chord-fn', funcs[i].label),
        el('span', 'pl-chord-tones', r.tones.map((tone) => `${pretty(tone.name)}(${tone.member})`).join(' ')), el('span', 'pl-chord-bass', `${pretty(r.bassName)} · ${t.inversion[r.inversion] || ''}`));
      if (funcs[i].alts.length) cell.title = funcs[i].alts.map(tx).join(' / ');
      table.appendChild(cell);
    });
    detail.appendChild(table);
    detail.appendChild(el('p', 'mk-meta pl-bassline', `${t.bassLine}：${real.map((r) => pretty(r.bassName)).join(' – ')}`));
    const altNotes = funcs.map((f, i) => (f.alts.length ? `${i + 1}. ${f.alts.map(tx).join(' / ')}` : null)).filter(Boolean);
    if (altNotes.length) detail.appendChild(el('p', 'mk-meta', altNotes.join('  ')));

    // 五线谱：大谱表 低音写在下面一行 上方声部按音高分到两行
    detail.appendChild(staffFor(voiced.voices, chords, funcs, entry));

    // 试听
    const playBar = el('div', 'mk-actions pl-playbar');
    const fromSel = el('select'); const toSel = el('select');
    real.forEach((r, i) => { fromSel.appendChild(option(String(i), `${i + 1} ${pretty(r.symbol)}`)); toSel.appendChild(option(String(i), `${i + 1} ${pretty(r.symbol)}`)); });
    toSel.value = String(real.length - 1);
    playBar.append(
      button('btn btn-primary btn-sm', t.play, () => playEntry(entry, chords)),
      button('btn btn-secondary btn-sm', t.stop, stop),
      el('span', 'mk-meta', t.segment), fromSel, el('span', 'mk-meta', t.to), toSel,
      button('btn btn-ghost btn-sm', t.playSeg, () => { stop(); const a = Number(fromSel.value); const b = Math.max(a, Number(toSel.value)); playVoices(voiced.voices.slice(a, b + 1).map((v, k) => ({ ...v, index: a + k })), durationsOf(entry, chords).slice(a, b + 1)); }),
    );
    if (work.history.length) {
      const ab = button('btn btn-ghost btn-sm', t.ab, () => playAB(entry));
      ab.title = t.abHint;
      playBar.appendChild(ab);
    }
    detail.appendChild(playBar);
    if (state.texture === 'arpeggio' || state.texture === 'root') detail.appendChild(el('p', 'mk-meta', t.arpNote));

    // 家族 / 旋转 / 五度链骨架
    detail.appendChild(familyBox(entry));

    // 变形
    detail.appendChild(opsBox(entry, chords));

    // 旋律兼容
    detail.appendChild(melodyBox(entry, base.chords, chords, key));

    // 送出
    const sendRow = el('div', 'mk-actions');
    if (onSendToPlayer) sendRow.appendChild(button('btn btn-ghost btn-sm', t.send, () => onSendToPlayer(...playerText(real, durationsOf(entry, chords)))));
    const formBtn = button('btn btn-ghost btn-sm', t.sendForm, () => sendToForm(entry, chords, key, real));
    formBtn.title = t.sendFormHint;
    sendRow.appendChild(formBtn);
    sendRow.appendChild(button('btn btn-ghost btn-sm', t.sendStaff, () => {
      const v = voiceProgression(chords, { key, style: state.voicing });
      const four = v.voices.map((x) => fourParts(x.midi));
      sendToStaff({ clef: 'grand', key: 0, meter: [state.meter, 4], bpm: state.tempo, voices: satbToVoices(four, state.meter) });
    }));
    detail.appendChild(sendRow);
    detail.appendChild(sourcesFooter(refs));
  }

  /** 送到播放器：时值都一样就写成"每和弦 n 拍"；不一样就按拍子拼成小节（同一小节里的和弦平分） */
  function playerText(real, durations) {
    const opts = { bpm: state.tempo, meter: state.meter };
    if (durations.every((d) => d === durations[0])) return [real.map((r) => r.symbol).join(' '), { ...opts, chordBeats: durations[0] }];
    const bars = [];
    let bar = []; let sum = 0;
    real.forEach((r, i) => {
      let left = durations[i];
      while (left > 0) {
        const take = Math.min(left, state.meter - sum);
        bar.push(r.symbol); sum += take; left -= take;
        if (sum >= state.meter) { bars.push(bar.join(' ')); bar = []; sum = 0; }
      }
    });
    if (bar.length) bars.push(bar.join(' '));
    return [`| ${bars.join(' | ')} |`, opts];
  }
  /** 送入曲式结构：把这条进行（当前版本与变形）存进 localStorage，再跳到 #form?q=@import；曲式结构把它用在主要段落 */
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  function sendToForm(entry, chords, key, real) {
    const keyPc = parseKeyPc(key);
    const payload = {
      title: entry.digits, key: FLAT_NAMES[keyPc], mode: entry.mode === 'minor' ? 'minor' : 'major', meter: state.meter === 3 ? '3/4' : '4/4',
      chords: real.map((r, i) => {
        // 九和弦以上省略五音（和这里的平滑配置一样），保证低音音级留在里面
        let tones = r.tones;
        if (tones.length > 4) tones = tones.filter((x) => (x.member !== '5' && x.member !== '11') || x.pc === r.bassPc).slice(0, 4);
        // 字母相对主音的级数（与升降拼法无关），曲式结构按它在新调里拼写
        const deg = (name) => ('CDEFGAB'.indexOf(name[0]) - 'CDEFGAB'.indexOf(key[0]) + 7) % 7;
        return { pitches: tones.map((x) => x.pc), rootPc: r.rootPc, bassPc: r.bassPc, rootDeg: deg(r.root), bassDeg: deg(r.bassName), suffix: QUALITIES[r.quality].sym, roman: romanOf(chords[i]), symbol: r.symbol };
      }),
    };
    try { globalThis.localStorage?.setItem('jc-form-import', JSON.stringify(payload)); } catch (e) { return; }
    stop();
    globalThis.location.hash = `#form?q=%40import&t=${Date.now()}`;
  }
  const parseKeyPc = (name) => {
    const m = /^([A-G])([#b]?)/.exec(name) || ['C', 'C', ''];
    return ((({ C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 })[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0)) + 12) % 12;
  };

  /** 五线谱的四个声部：五个音时去掉和低音重复的音（没有就去掉中间的一个） */
  function fourParts(midi) {
    const m = [...midi];
    while (m.length < 4) m.splice(1, 0, m[1] - 12 > m[0] ? m[1] - 12 : m[1]);
    while (m.length > 4) {
      const dup = m.findIndex((x, i) => i > 0 && (x - m[0]) % 12 === 0);
      m.splice(dup > 0 ? dup : 2, 1);
    }
    return m;
  }

  /** 拼出带八度的音名给五线谱（Cb4 = MIDI 59） */
  const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  function nameWithOctave(midi, chordReal) {
    const tone = chordReal.tones.find((x) => x.pc === ((midi % 12) + 12) % 12);
    const name = tone ? tone.name : spell(Math.round(((midi % 12) / 12) * 7), midi);
    const letter = name[0];
    const alter = (name.slice(1).match(/#/g) || []).length + (name.includes('x') ? 2 : 0) - (name.slice(1).match(/b/g) || []).length;
    const octave = Math.floor((midi - alter - LETTER_PC[letter]) / 12) - 1;
    return `${letter}${name.slice(1).replace('x', '##')}${octave}`;
  }
  function staffFor(voices, chords, funcs, entry) {
    const notes = [];
    voices.forEach((v, col) => {
      v.midi.forEach((m, k) => notes.push({ p: nameWithOctave(m, v.chord), s: k === 0 || m < 60 ? 1 : 0, col, d: 'w', ...(k === 0 ? { label: [romanOf(chords[col], { minorInternal: state.minorInternal && entry.mode === 'minor' }), pretty(v.chord.symbol), funcs[col].label], labelAt: 'bottom' } : {}) }));
    });
    const wrap = el('div', 'pl-staff');
    const svg = renderVisual({ kind: 'notation', brace: true, staves: [{ clef: 'treble' }, { clef: 'bass' }], notes, cols: Math.max(4, voices.length), colWidth: 70 }, { play: (midis) => playChord(midis.map(midiToFrequency), 1.2) });
    wrap.appendChild(svg);
    return wrap;
  }

  function familyBox(entry) {
    const box = el('div', 'pl-family');
    const members = entries.filter((e) => e.family === entry.family && e.id !== entry.id && entry.family !== 'single');
    if (members.length) {
      box.appendChild(el('span', 'pl-note-title', `${t.family2} · ${tx(FAMILIES[entry.family])}`));
      const row = el('div', 'pl-chips');
      members.forEach((m) => row.appendChild(button('pl-chip', `${m.digits} ${romanText(m, m.chords)}`, () => { state.open = m.id; resetWork(); paintList(); paintDetail(); })));
      box.appendChild(row);
    }
    if (entry.kind === 'loop' && entry.chords.length >= 3 && entry.chords.length <= 4) {
      box.appendChild(el('span', 'pl-note-title', t.rotations));
      const row = el('div', 'pl-chips');
      rotations(entry.chords).forEach((rot, k) => {
        const match = entries.find((e) => e.chords.length === rot.length && e.chords.every((c, i) => romanOf(c) === romanOf(rot[i])));
        const label = `${rot.map((c) => `${c.alter < 0 ? 'b' : ''}${c.degree}`).join('')} ${rot.map((c) => romanOf(c)).join(' ')}`;
        row.appendChild(match && match.id !== entry.id ? button('pl-chip', label, () => { state.open = match.id; resetWork(); paintList(); paintDetail(); }) : el('span', `pl-chip is-static${k === 0 ? ' is-on' : ''}`, label));
      });
      box.appendChild(row);
    }
    if (entry.family === 'circle' && entry.mode !== 'minor') {
      // 五度链：I IV vii° iii vi ii V 循环 标出这一条的起点和终点
      const chain = ['I', 'IV', 'vii°', 'iii', 'vi', 'ii', 'V'];
      box.appendChild(el('span', 'pl-note-title', t.skeleton));
      const row = el('div', 'pl-chain');
      const first = chain.indexOf(romanOf(entry.chords[0]));
      const last = chain.indexOf(romanOf(entry.chords.at(-1)));
      chain.forEach((r, i) => row.appendChild(el('span', `pl-chain-node${i === first ? ' is-start' : ''}${i === last ? ' is-end' : ''}`, r)));
      box.appendChild(row);
    }
    return box;
  }

  function opsBox(entry, chords) {
    const box = el('div', 'pl-ops');
    box.appendChild(el('span', 'pl-note-title', t.ops));
    box.appendChild(el('p', 'mk-meta', t.opNote));
    const opSelect = el('select');
    Object.entries(OPERATIONS).forEach(([id, op]) => opSelect.appendChild(option(id, tx(op.label))));
    const targetSelect = el('select');
    chords.forEach((c, i) => targetSelect.appendChild(option(String(i), `${i + 1} ${romanOf(c)}`)));
    const optSelect = el('select');
    const targetField = field(t.target, targetSelect);
    const optField = field(t.opOption, optSelect);
    const sync = () => {
      const op = OPERATIONS[opSelect.value];
      targetField.hidden = !op.needsTarget;
      optField.hidden = !op.options;
      optSelect.replaceChildren();
      (op.options || []).forEach((o) => optSelect.appendChild(option(o, o)));
    };
    opSelect.addEventListener('change', sync);
    const message = el('p', 'mk-hint');
    const controls = el('div', 'mk-controls');
    controls.append(field(t.op, opSelect), targetField, optField,
      button('btn btn-primary btn-sm', t.apply, () => {
        const op = OPERATIONS[opSelect.value];
        const res = op.apply(chords, { key: state.key, loop: entry.kind === 'loop', mode: entry.mode, style: entry.style }, { at: Number(targetSelect.value), option: optSelect.value });
        if (res.refused || !res.changes.length) { message.textContent = tx(res.refused) || '—'; return; }
        work.history.push({ op: opSelect.value, chords: res.chords, changes: res.changes });
        paintDetail();
      }),
      button('btn btn-ghost btn-sm', t.undo, () => { work.history.pop(); paintDetail(); }),
      button('btn btn-ghost btn-sm', t.reset, () => { work.history = []; paintDetail(); }));
    sync();
    box.append(controls, message);
    if (!work.history.length) box.appendChild(el('p', 'mk-meta', t.noOps));
    else {
      const hist = el('ol', 'pl-history');
      const { key } = realizeFor(entry, chords);
      work.history.forEach((h) => {
        const li = el('li');
        li.append(el('strong', '', tx(OPERATIONS[h.op].label)), el('span', 'mk-meta', ` → ${realizeAll(h.chords, key).map((r) => pretty(r.symbol)).join(' ')}`));
        h.changes.forEach((c) => li.appendChild(el('p', 'mk-meta', `${c.at + 1}. ${tx(c.why)}`)));
        hist.appendChild(li);
      });
      box.append(el('span', 'pl-note-title', t.history), hist);
    }
    return box;
  }

  function melodyBox(entry, original, current, key) {
    const box = el('div', 'pl-melody');
    const inputM = el('input'); inputM.type = 'text'; inputM.placeholder = t.melodyHint; inputM.value = state.melody || '';
    const out = el('div', 'pl-melody-out');
    const paint = () => {
      state.melody = inputM.value;
      out.replaceChildren();
      if (!inputM.value.trim()) return;
      const rows = [[t.melodyOrig, melodyCheck(inputM.value, original, key)]];
      if (work.history.length) rows.push([t.melodyNow, melodyCheck(inputM.value, current, key)]);
      rows.forEach(([label, res]) => {
        const row = el('div', 'pl-melody-row');
        row.appendChild(el('span', 'mk-meta', label));
        res.forEach((r) => { if (!r) return; const chip = el('span', `pl-role is-${r.role}`, `${r.name} ${t.roles[r.role]}`); if (r.label) chip.title = tx(r.label); row.appendChild(chip); });
        out.appendChild(row);
      });
    };
    inputM.addEventListener('input', paint);
    box.append(el('span', 'pl-note-title', t.melody), field(t.melodyHint, inputM), out);
    paint();
    return box;
  }

  // ---------- 发声 ----------
  function playVoices(voices, durations, { offsetBeats = 0, highlight = true, onDone } = {}) {
    const beatMs = 60000 / state.tempo;
    const texture = state.texture === 'root' ? 'arpeggio' : state.texture;
    const { events, total } = playbackEvents(voices, { meter: state.meter, texture, part: state.part, arpMode: state.texture === 'root' ? 'root' : 'voiced', durations });
    playing = true;
    events.forEach((e) => timers.push(setTimeout(() => {
      playChord(e.midi.map(midiToFrequency), (e.beats * beatMs) / 1000 * 0.95, { interrupt: e.at === 0 || texture !== 'arpeggio' });
      if (highlight) {
        target.querySelectorAll('.pl-chord.is-playing').forEach((n) => n.classList.remove('is-playing'));
        target.querySelector(`.pl-chord[data-index="${voices[e.index]?.index ?? e.index}"]`)?.classList.add('is-playing');
      }
    }, (offsetBeats + e.at) * beatMs)));
    timers.push(setTimeout(() => { target.querySelectorAll('.pl-chord.is-playing').forEach((n) => n.classList.remove('is-playing')); onDone?.(); }, (offsetBeats + total) * beatMs));
    return total;
  }
  function playEntry(entry, chords) {
    stop();
    const { key } = realizeFor(entry, chords);
    const voiced = voiceProgression(chords, { key, style: state.voicing }).voices.map((v, index) => ({ ...v, index }));
    const durations = durationsOf(entry, chords);
    const once = () => playVoices(voiced, durations, { onDone: () => { if (state.loop && playing) once(); else stop(); } });
    once();
  }
  /** A/B：原版（当前版本设置）与最新变形依次播放 同速度同音色 */
  function playAB(entry) {
    stop();
    const base = baseChords(entry).chords;
    const now = activeChords(entry);
    const { key } = realizeFor(entry, base);
    const a = voiceProgression(base, { key, style: state.voicing }).voices;
    const b = voiceProgression(now, { key, style: state.voicing }).voices.map((v, index) => ({ ...v, index }));
    const lenA = playVoices(a, durationsOf(entry, base), { highlight: false });
    playVoices(b, durationsOf(entry, now), { offsetBeats: lenA + 1, onDone: stop });
  }

  input.addEventListener('input', () => { clearTimeout(input.debounce); input.debounce = setTimeout(() => { state.q = input.value; paintList(); }, 200); });
  /** 外部（站内搜索、链接 #progression?q=lib:4361）直接查询 */
  target.query = (q) => { input.value = q; state.q = q; paintList(); };
  paintList();
  return { query: target.query, stop };
}

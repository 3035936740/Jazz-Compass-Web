import { JAZZ_CHAPTERS } from './jazz_toolbox_data.js';
import { JAZZ_MODE_CATALOG, JAZZ_NOTES, jazzScaleMidi, jazzCompatibleModes, jazzInspectMode, jazzModalInterchange, jazzProgression, jazzVoicing, jazzMidiName } from './jazz_toolbox.js';
import { lccPitchClass } from './lcc_concept.js';

const TEXT = {
  zh: {
    title: '爵士工具箱', subtitle: '和弦音阶 · 进行代理 · 延伸音 · 配置 · 调式地图',
    tabs: { scales: '27种和弦音阶', progressions: '进行与代理', voicings: 'Voicing与延伸音', maps: '调式地图', chapters: '17节教程' },
    badChord: '请输入可识别的和弦，例如 Cmaj7、Dm7、G7。',
    matchCount: count => `完整包含当前和弦音的音阶：${count} / 27。没有唯一“正确”的音阶，去向和旋律语境会影响选择。`,
    showAll: '显示全部27种（包含需要改变和弦音的音阶）', family: '音阶家族', scale: '选择和弦音阶',
    fitting: '保留当前和弦音', incompatible: '不完整包含当前和弦音', missing: '缺少的和弦音',
    tones: '和弦音', tensions: '候选延伸音', cautions: '回避 / 半音碰撞提示',
    roleCaveat: '回避音会随和弦性质、配器和进行改变；此处是基础碰撞提示，不替代完整 Berklee 表。属七的♭9、♭13可在语境中主动使用。',
    scalePlay: '钢琴音阶试听', chordPlay: '和弦＋色彩试听', source: '相关教程',
    modalTitle: '同主音调式借用', modalHelp: '第5章：固定调的主音，从另一调式借来和弦；与第19章固定单个和弦根音更换适配音阶不同。上方音阶选择器就是后者。', donor: '借用音阶', changed: '相对大调改变的音', donorChords: '借用调式的七和弦', borrowed: '含借用色彩',
    key: '目标主音', kind: '技法', generate: '生成进行', count: '长度', step: 'ii–V链步长', axes: '对称主音数',
    flipIi: '翻转ii', flipV: '翻转V', flipI: '翻转I', direction: '半音方向',
    localTarget: '局部目标', subSecondary: '代理局部属和弦',
    progressionsNote: '代理、outside和多主音是可试听的构造模型，不意味着每个结果都能无条件替换原曲。着陆到三全音另一侧会造成转调。',
    play: '钢琴试听', voicingIntro: '3、7度是决定和弦性质的向导音；Shell省略5度，Drop排列以顶部音为参照。',
    dominantTarget: '属和弦解决目标', dominantExample: '示例属和弦', targetMajor: '解决到大和弦', targetMinor: '解决到小和弦',
    dominantHint: '大调目标常选9、13；小调目标常选♭9、♭13。这是常见方向，不是禁令。代理属的♯11常可听作原属根音。',
    mapHelp: '用滚轮所在区域或水平拖动查看细节；图像可在新标签页打开。', map: '调式地图', tree: '调式树', zoom: '缩放', fit: '适合窗口', open: '打开原图', mapCredit: '调式地图 / 调式树来源',
    chaptersHelp: '每节都给出本地可查的概念摘要、可试的例子和原教程入口；不复制教程全文。', search: '搜索教程、技法或例子', all: '全部', tryTool: '打开相关工具',
  },
  en: {
    title: 'Jazz Toolbox', subtitle: 'Chord scales · substitutions · tensions · voicings · mode maps',
    tabs: { scales: '27 chord scales', progressions: 'Progressions', voicings: 'Voicings & tensions', maps: 'Mode maps', chapters: '17 tutorials' },
    badChord: 'Enter a recognizable chord, such as Cmaj7, Dm7 or G7.',
    matchCount: count => `Scales retaining all current chord tones: ${count} / 27. Context and melodic intent still matter.`,
    showAll: 'Show all 27, including incompatible scales', family: 'Scale family', scale: 'Chord scale',
    fitting: 'Keeps chord tones', incompatible: 'Changes chord tones', missing: 'Missing chord tones',
    tones: 'Chord tones', tensions: 'Possible tensions', cautions: 'Avoid / semitone-collision hints',
    roleCaveat: 'Avoid notes depend on chord quality, voicing and context. These are basic collision hints, not a complete Berklee chart.',
    scalePlay: 'Piano scale', chordPlay: 'Chord + color', source: 'Related chapter',
    modalTitle: 'Same-tonic modal borrowing', modalHelp: 'Chapter 5 borrows harmony from another mode of the key center. Chapter 19 changes the scale on one chord root; use the selector above for that.', donor: 'Donor mode', changed: 'Degrees changed from major', donorChords: 'Donor seventh chords', borrowed: 'Borrowed color',
    key: 'Tonic center', kind: 'Technique', generate: 'Build progression', count: 'Length', step: 'ii–V chain step', axes: 'Symmetric tonic axes',
    flipIi: 'Flip ii', flipV: 'Flip V', flipI: 'Flip I', direction: 'Semitone direction',
    localTarget: 'Local target', subSecondary: 'Substitute local dominant',
    progressionsNote: 'These are audible construction models, not unconditional substitutions. A tritone landing changes the key center.',
    play: 'Piano preview', voicingIntro: '3rds and 7ths are guide tones. Shell omits the fifth; drop voicings are named from the top.',
    dominantTarget: 'Dominant resolves to', dominantExample: 'Example dominant', targetMajor: 'Major chord', targetMinor: 'Minor chord',
    dominantHint: 'Major targets often favor 9 and 13; minor targets often favor ♭9 and ♭13. This is guidance, not a ban.',
    mapHelp: 'Zoom and drag to inspect. Open the original image in a new tab.', map: 'Mode map', tree: 'Mode tree', zoom: 'Zoom', fit: 'Fit', open: 'Open original', mapCredit: 'Mode map / tree source',
    chaptersHelp: 'Each chapter has a local concept summary, example and source link; the full article is not duplicated.', search: 'Search chapters', all: 'All', tryTool: 'Open tool',
  },
  ja: {
    title: 'ジャズ・ツールボックス', subtitle: 'コードスケール · 代理 · テンション · ボイシング · モード地図',
    tabs: { scales: '27コードスケール', progressions: '進行と代理', voicings: 'ボイシング', maps: 'モード地図', chapters: '17章の教材' },
    badChord: 'Cmaj7、Dm7、G7 のようなコードを入力してください。',
    matchCount: count => `コードトーンを保つスケール：${count} / 27。文脈も重要です。`,
    showAll: '全27種類を表示', family: 'スケール群', scale: 'コードスケール',
    fitting: 'コードトーンを保持', incompatible: 'コードトーンの変更が必要', missing: '不足するコードトーン',
    tones: 'コードトーン', tensions: '候補テンション', cautions: 'アボイド / 半音衝突',
    roleCaveat: 'アボイドはコードと文脈で変わります。これは基本的な衝突表示です。',
    scalePlay: 'ピアノでスケール', chordPlay: 'コード＋カラー', source: '関連章',
    modalTitle: '同主音のモード借用', modalHelp: '第5章は調の主音を固定して和音を借ります。第19章は単一コードの根音を固定してスケールを交換します。', donor: '借用モード', changed: '長調から変わる音', donorChords: '借用モードの七和音', borrowed: '借用カラー',
    key: 'トニック', kind: '技法', generate: '進行を作成', count: '長さ', step: 'ii–Vステップ', axes: '対称トニック数',
    flipIi: 'iiを反転', flipV: 'Vを反転', flipI: 'Iを反転', direction: '半音方向',
    localTarget: '局所的な目標', subSecondary: '局所ドミナントを代理',
    progressionsNote: '代理やアウトサイドは試聴用モデルです。トライトーン着地は転調になります。',
    play: 'ピアノ試聴', voicingIntro: '3度と7度はガイドトーン。Shellは5度を省き、Dropは最上声から数えます。',
    dominantTarget: 'ドミナントの解決先', dominantExample: 'ドミナントの例', targetMajor: '長和音', targetMinor: '短和音',
    dominantHint: '長和音には9・13、短和音には♭9・♭13がよく使われます。絶対的な規則ではありません。',
    mapHelp: '拡大・ドラッグで詳細を確認できます。', map: 'モード地図', tree: 'モード・ツリー', zoom: '倍率', fit: '合わせる', open: '元画像を開く', mapCredit: 'モード地図 / ツリーの出典',
    chaptersHelp: '各章の要約・例・原文リンクを収録します。本文は複製しません。', search: '教材を検索', all: 'すべて', tryTool: 'ツールを開く',
  },
};

const e = (tag, className = '', value = '') => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value) node.textContent = value;
  return node;
};
const option = (value, label) => { const node = e('option', '', label); node.value = value; return node; };
const label = (caption, control, className = '') => { const node = e('label', className); node.append(e('span', '', caption), control); return node; };
const link = (text, url, className = '') => {
  const node = e('a', className, text);
  node.href = url;
  node.target = '_blank';
  node.rel = 'noopener noreferrer';
  return node;
};

function getLanguage() {
  const code = document.documentElement.lang.toLowerCase();
  return code.startsWith('ja') ? 'ja' : code.startsWith('zh') ? 'zh' : 'en';
}
function parseChord(conv, input) {
  try { return conv._ensureNotesAndRoot(input.trim()); } catch { return null; }
}
function sourceForMode(mode) {
  const number = mode.familyId === 'major' ? 12 : mode.familyId === 'melodicMinor' ? 14 : mode.familyId === 'harmonicMinor' ? 15
    : ['dominantDiminished', 'diminished'].includes(mode.id) ? 16 : 17;
  return JAZZ_CHAPTERS.find(chapter => chapter.no === number);
}
function midiFrequency(midi, semitoneToFreq) { return semitoneToFreq(midi % 12, Math.floor(midi / 12) - 1); }
function noteFrequency(pitch, semitoneToFreq, octave = 4) { return semitoneToFreq((pitch % 12 + 12) % 12, octave); }

export function mountJazzToolbox(target, input, { conv, playChord, semitoneToFreq }) {
  const t = TEXT[getLanguage()];
  target.replaceChildren();
  const header = e('div', 'jazz-head');
  header.append(e('div', 'jazz-kicker', 'JAZZ COMPASS / FIELD GUIDE'), e('h3', '', t.title), e('p', '', t.subtitle));
  target.appendChild(header);
  const tabs = e('div', 'jazz-tabs');
  tabs.setAttribute('role', 'tablist');
  const body = e('div', 'jazz-tab-body');
  target.append(tabs, body);
  let chapterFocus = null;
  const views = {
    scales: () => renderScales(body, input, t, { conv, playChord, semitoneToFreq }),
    progressions: () => renderProgressions(body, t, { conv, playChord, semitoneToFreq }, chapterFocus),
    voicings: () => renderVoicings(body, input, t, { conv, playChord, semitoneToFreq }),
    maps: () => renderMaps(body, t),
    chapters: () => renderChapters(body, t, activate),
  };
  function activate(name, chapterNumber = null) {
    const tab = views[name] ? name : 'scales';
    chapterFocus = chapterNumber;
    target.dataset.jazzTab = tab;
    tabs.querySelectorAll('button').forEach(button => {
      const active = button.dataset.jazzTab === tab;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    body.replaceChildren();
    views[tab]();
  }
  Object.entries(t.tabs).forEach(([name, caption]) => {
    const button = e('button', '', caption);
    button.type = 'button';
    button.dataset.jazzTab = name;
    button.setAttribute('role', 'tab');
    button.addEventListener('click', () => activate(name));
    tabs.appendChild(button);
  });
  activate(target.dataset.jazzTab || 'scales');
}

function renderScales(body, input, t, { conv, playChord, semitoneToFreq }) {
  const section = e('section', 'jazz-scales');
  body.appendChild(section);
  const notes = parseChord(conv, input);
  if (!notes?.length) { section.appendChild(e('p', 'input-error', t.badChord)); return; }
  const root = notes[0];
  const compatible = jazzCompatibleModes(notes);
  section.appendChild(e('p', 'jazz-intro', t.matchCount(compatible.length)));
  const chordRow = e('div', 'jazz-current-chord');
  chordRow.appendChild(e('strong', '', input.trim()));
  notes.forEach(note => chordRow.appendChild(e('span', 'jazz-note-chip is-chord', note)));
  section.appendChild(chordRow);
  const controls = e('div', 'jazz-controls');
  const family = e('select', 'jazz-family-select');
  [['all', t.all], ['major', '大调'], ['melodicMinor', '旋律小调'], ['harmonicMinor', '和声小调'], ['special', '对称 / 扩展']].forEach(([value, name]) => family.appendChild(option(value, name)));
  controls.appendChild(label(t.family, family));
  const modeSelect = e('select', 'jazz-mode-select');
  controls.appendChild(label(t.scale, modeSelect));
  const allLabel = e('label', 'jazz-check');
  const showAll = e('input');
  showAll.type = 'checkbox';
  allLabel.append(showAll, e('span', '', t.showAll));
  controls.appendChild(allLabel);
  section.appendChild(controls);
  const detail = e('div', 'jazz-scale-detail');
  section.appendChild(detail);
  function refresh(preferred = '') {
    const listed = JAZZ_MODE_CATALOG.filter(mode => (family.value === 'all' || mode.familyId === family.value || (family.value === 'special' && !mode.familyId))
      && (showAll.checked || compatible.some(candidate => candidate.id === mode.id)));
    modeSelect.replaceChildren();
    listed.forEach(mode => modeSelect.appendChild(option(mode.id, `${mode.name} · ${mode.family}${compatible.some(candidate => candidate.id === mode.id) ? ' ✓' : ''}`)));
    if (!listed.length) { detail.replaceChildren(e('p', 'jazz-empty', '—')); return; }
    modeSelect.value = listed.some(mode => mode.id === preferred) ? preferred : listed[0].id;
    paint(listed.find(mode => mode.id === modeSelect.value));
  }
  function paint(mode) {
    detail.replaceChildren();
    const names = conv.idxToNote || JAZZ_NOTES;
    const inspect = jazzInspectMode(root, mode, notes, names);
    const card = e('article', 'jazz-scale-card');
    const top = e('div', 'jazz-card-top');
    top.append(e('div', 'jazz-mode-name', mode.name), e('span', `jazz-fit ${inspect.compatible ? 'fits' : 'changes'}`, inspect.compatible ? t.fitting : t.incompatible));
    card.appendChild(top);
    card.appendChild(e('p', 'jazz-mode-origin', mode.role));
    const row = e('div', 'jazz-scale-notes');
    inspect.cells.forEach(cell => {
      const chip = e('div', `jazz-scale-note ${cell.role}`);
      chip.append(e('strong', '', cell.note), e('small', '', cell.label));
      chip.title = `${cell.note} · ${cell.label} · ${cell.role}`;
      row.appendChild(chip);
    });
    card.appendChild(row);
    if (!inspect.compatible) {
      const pitchSet = new Set(mode.intervals);
      const tonic = lccPitchClass(root);
      const missing = notes.filter(note => !pitchSet.has((lccPitchClass(note) - tonic + 12) % 12));
      card.appendChild(e('p', 'jazz-missing', `${t.missing}: ${missing.join(', ')}`));
    }
    const info = e('div', 'jazz-scale-info');
    [[t.tones, inspect.chordTones], [t.tensions, inspect.tensions], [t.cautions, inspect.cautions]].forEach(([caption, cells]) => {
      const line = e('p');
      line.append(e('strong', '', `${caption}: `), e('span', '', cells.length ? cells.map(cell => `${cell.note} (${cell.label})`).join(' · ') : '—'));
      info.appendChild(line);
    });
    card.appendChild(info);
    card.appendChild(e('p', 'jazz-caveat', t.roleCaveat));
    const actions = e('div', 'jazz-actions');
    const scalePlay = e('button', 'jazz-outline-btn', `♪ ${t.scalePlay}`);
    scalePlay.type = 'button';
    scalePlay.addEventListener('click', () => {
      jazzScaleMidi(root, mode).forEach((midi, index) => setTimeout(() => playChord([midiFrequency(midi, semitoneToFreq)], .3, { interrupt: index === 0 }), index * 330));
    });
    actions.appendChild(scalePlay);
    const chordPlay = e('button', 'jazz-outline-btn', `♪ ${t.chordPlay}`);
    chordPlay.type = 'button';
    chordPlay.disabled = !inspect.compatible;
    chordPlay.addEventListener('click', () => {
      const pitches = [...new Set([...notes.map(lccPitchClass), ...inspect.tensions.slice(0, 2).map(cell => lccPitchClass(cell.note))])];
      playChord(pitches.map(pitch => noteFrequency(pitch, semitoneToFreq)), 1.6);
    });
    actions.appendChild(chordPlay);
    const chapter = sourceForMode(mode);
    actions.appendChild(link(`${t.source}: ${chapter.title} ↗`, chapter.url, 'jazz-source-link'));
    card.appendChild(actions);
    detail.appendChild(card);
  }
  family.addEventListener('change', () => refresh(modeSelect.value));
  showAll.addEventListener('change', () => refresh(modeSelect.value));
  modeSelect.addEventListener('change', () => paint(JAZZ_MODE_CATALOG.find(mode => mode.id === modeSelect.value)));
  refresh();
  renderModalExchange(section, root, t, { conv, playChord, semitoneToFreq });
}

function renderModalExchange(section, currentRoot, t, { conv, playChord, semitoneToFreq }) {
  const block = e('section', 'jazz-modal-exchange');
  block.append(e('h4', '', t.modalTitle), e('p', 'jazz-intro', t.modalHelp));
  const controls = e('div', 'jazz-controls');
  const key = e('select', 'jazz-modal-key');
  const names = conv.idxToNote || JAZZ_NOTES;
  names.forEach((name, pitch) => key.appendChild(option(String(pitch), name)));
  key.value = String(lccPitchClass(currentRoot));
  const donor = e('select', 'jazz-modal-donor');
  JAZZ_MODE_CATALOG.filter(mode => mode.intervals.length === 7).forEach(mode => donor.appendChild(option(mode.id, `${mode.family} · ${mode.name}`)));
  donor.value = 'major-6';
  controls.append(label(t.key, key), label(t.donor, donor));
  block.appendChild(controls);
  const result = e('div', 'jazz-modal-result'); block.appendChild(result);
  function paint() {
    const comparison = jazzModalInterchange(names[Number(key.value)], donor.value, names);
    result.replaceChildren();
    const degrees = e('div', 'jazz-modal-degrees');
    degrees.appendChild(e('strong', '', `${t.changed}: `));
    comparison.changedDegrees.filter(degree => degree.changed).forEach(degree => degrees.appendChild(e('span', 'jazz-note-chip', `${degree.degree}: ${degree.pitch}`)));
    if (!degrees.querySelector('span')) degrees.appendChild(e('span', '', '—'));
    result.append(degrees, e('p', 'jazz-modal-caption', t.donorChords));
    const grid = e('div', 'jazz-modal-chords');
    comparison.chords.forEach(chord => {
      const card = e('article', `jazz-modal-chord${chord.borrowed ? ' borrowed' : ''}`);
      card.append(e('small', '', `${chord.degree} · ${chord.borrowed ? t.borrowed : ''}`), e('strong', '', chord.symbol), e('span', '', chord.pitches.join(' · ')));
      const play = e('button', 'jazz-mini-play', '♪'); play.type = 'button'; play.title = `${t.play}: ${chord.symbol}`;
      play.addEventListener('click', () => playChord(chord.pitches.map(note => noteFrequency(lccPitchClass(note), semitoneToFreq)), 1.2));
      card.appendChild(play); grid.appendChild(card);
    });
    result.appendChild(grid);
  }
  key.addEventListener('change', paint); donor.addEventListener('change', paint); paint();
  [5, 19].forEach(number => {
    const chapter = JAZZ_CHAPTERS.find(item => item.no === number);
    block.appendChild(link(`${t.source}: ${chapter.title} →`, chapter.url, 'jazz-source-link'));
  });
  section.appendChild(block);
}

const PROGRESSION_KINDS = [
  ['iiVI', 'ii–V–I'], ['minorIiVI', 'Minor ii–V–i'], ['tritone', '2×2×2 · Tritone Sub'],
  ['secondarySub', 'Secondary V / SubV'],
  ['extendedDominant', 'Extended Dominants'], ['iiVChain', 'ii–V Chains'], ['sideStep', 'Side Step / Contiguous ii–V'],
  ['multiTonic', 'Multi Tonic / Coltrane'],
];

function renderProgressions(body, t, { conv, playChord, semitoneToFreq }, chapterNumber = null) {
  const section = e('section', 'jazz-progressions');
  body.appendChild(section);
  section.appendChild(e('p', 'jazz-intro', t.progressionsNote));
  const controls = e('div', 'jazz-controls jazz-progression-controls');
  const key = e('select', 'jazz-key');
  (conv.idxToNote || JAZZ_NOTES).forEach((name, pitch) => key.appendChild(option(String(pitch), name)));
  key.value = '0';
  const kind = e('select', 'jazz-kind');
  PROGRESSION_KINDS.forEach(([id, name]) => kind.appendChild(option(id, name)));
  kind.value = ({ 2: 'iiVI', 3: 'iiVChain', 4: 'secondarySub', 8: 'sideStep', 9: 'tritone', 10: 'multiTonic' })[chapterNumber] || 'iiVI';
  controls.append(label(t.key, key), label(t.kind, kind));
  const options = e('div', 'jazz-progression-options');
  controls.appendChild(options);
  section.appendChild(controls);
  const result = e('div', 'jazz-progression-result');
  section.appendChild(result);
  function optionControls() {
    options.replaceChildren();
    if (kind.value === 'tritone') {
      [['flipIi', t.flipIi], ['flipV', t.flipV], ['flipI', t.flipI]].forEach(([id, caption]) => {
        const check = e('input'); check.type = 'checkbox'; check.dataset.jazzOption = id;
        const wrap = e('label', 'jazz-check'); wrap.append(check, e('span', '', caption)); options.appendChild(wrap);
      });
    }
    if (kind.value === 'secondarySub') {
      const target = e('select'); target.dataset.jazzOption = 'target';
      [[2, 'ii'], [5, 'IV'], [7, 'V'], [9, 'vi']].forEach(([value, name]) => target.appendChild(option(String(value), name)));
      options.appendChild(label(t.localTarget, target));
      const sub = e('input'); sub.type = 'checkbox'; sub.dataset.jazzOption = 'sub';
      const wrap = e('label', 'jazz-check'); wrap.append(sub, e('span', '', t.subSecondary)); options.appendChild(wrap);
    }
    if (kind.value === 'extendedDominant' || kind.value === 'iiVChain') {
      const count = e('input'); count.type = 'number'; count.min = '2'; count.max = kind.value === 'iiVChain' ? '6' : '8'; count.value = kind.value === 'iiVChain' ? '3' : '4'; count.dataset.jazzOption = 'count';
      options.appendChild(label(t.count, count));
    }
    if (kind.value === 'iiVChain') {
      const step = e('select'); step.dataset.jazzOption = 'step';
      [[1, '+m2'], [2, '+M2'], [4, '+M3'], [-1, '−m2'], [-2, '−M2'], [-4, '−M3']].forEach(([value, name]) => step.appendChild(option(String(value), name)));
      step.value = '2'; options.appendChild(label(t.step, step));
    }
    if (kind.value === 'sideStep') {
      const direction = e('select'); direction.dataset.jazzOption = 'direction';
      direction.append(option('1', '+1'), option('-1', '−1'));
      options.appendChild(label(t.direction, direction));
    }
    if (kind.value === 'multiTonic') {
      const axes = e('select'); axes.dataset.jazzOption = 'axes';
      [3, 4, 6].forEach(number => axes.appendChild(option(String(number), `${number}`)));
      options.appendChild(label(t.axes, axes));
    }
    options.querySelectorAll('input, select').forEach(control => control.addEventListener('change', build));
  }
  function build() {
    const settings = {};
    options.querySelectorAll('[data-jazz-option]').forEach(control => { settings[control.dataset.jazzOption] = control.type === 'checkbox' ? control.checked : control.value; });
    const names = conv.idxToNote || JAZZ_NOTES;
    const sequence = jazzProgression(names[Number(key.value)], kind.value, settings, names);
    result.replaceChildren();
    const flow = e('div', 'jazz-flow');
    sequence.forEach((item, index) => {
      const card = e('div', 'jazz-flow-chord');
      card.append(e('small', '', `${String(index + 1).padStart(2, '0')} · ${item.role}`), e('strong', '', item.symbol));
      const play = e('button', 'jazz-mini-play', '♪'); play.type = 'button'; play.title = `${t.play}: ${item.symbol}`;
      play.addEventListener('click', () => {
        const chordNotes = parseChord(conv, item.symbol);
        if (!chordNotes?.length) return;
        const root = lccPitchClass(chordNotes[0]);
        const frequencies = chordNotes.map(note => noteFrequency(lccPitchClass(note), semitoneToFreq, lccPitchClass(note) < root ? 5 : 4));
        playChord(frequencies, 1.2);
      });
      card.appendChild(play);
      flow.appendChild(card);
      if (index < sequence.length - 1) flow.appendChild(e('span', 'jazz-flow-arrow', '→'));
    });
    result.appendChild(flow);
    const guide = e('p', 'jazz-caveat');
    const notes = {
      iiVI: 'ii的向导音通常可平滑进入V，V的3度与7度再指向I。',
      minorIiVI: '小调iiø–V–i的V常选择♭9、♭13；最终色彩仍取决于目标小和弦。',
      tritone: 'V7与代理属的3、7度同音异名；ii或I的翻转不是同样强的无条件替代。',
      secondarySub: '先确定局部目标，再比较它的V7与SubV7；代理属相隔三全音，共用三度／七度的三全音。',
      extendedDominant: '每一步属七暂不解决，而把目标再次设置为下一个属七。',
      iiVChain: '每一对ii–V有自己的局部中心，不能用一套固定音阶覆盖整条链。',
      sideStep: '第一对ii–V在半音外侧，第二对回到inside；保持outside短暂且让落点清晰。',
      multiTonic: '轴按12音等分：三主音每隔大三度，四主音每隔小三度，六主音每隔大二度。',
    };
    guide.textContent = notes[kind.value] || t.progressionsNote;
    result.appendChild(guide);
    const sourceNumber = { iiVI: 2, minorIiVI: 2, tritone: 9, secondarySub: 4, extendedDominant: 3, iiVChain: 3, sideStep: 8, multiTonic: 10 }[kind.value];
    const chapter = JAZZ_CHAPTERS.find(item => item.no === sourceNumber);
    result.appendChild(link(`${t.source}: ${chapter.title} ↗`, chapter.url, 'jazz-source-link'));
  }
  kind.addEventListener('change', () => { optionControls(); build(); });
  key.addEventListener('change', build);
  optionControls(); build();
}

function renderVoicings(body, input, t, { conv, playChord, semitoneToFreq }) {
  const section = e('section', 'jazz-voicings'); body.appendChild(section);
  section.appendChild(e('p', 'jazz-intro', t.voicingIntro));
  const notes = parseChord(conv, input);
  if (!notes?.length) { section.appendChild(e('p', 'input-error', t.badChord)); return; }
  const names = conv.idxToNote || JAZZ_NOTES;
  const grid = e('div', 'jazz-voicing-grid');
  const types = [['guide', 'Guide Tones'], ['shell', 'Shell'], ['close', '4-Way Close'], ['drop2', 'Drop2'], ['drop3', 'Drop3'], ['drop2and4', 'Drop2 & 4']];
  const tonic = lccPitchClass(notes[0]);
  const isMinor = notes.some(note => (lccPitchClass(note) - tonic + 12) % 12 === 3);
  if (isMinor) types.push(['soWhat', 'So What / Quartal']);
  types.forEach(([id, title]) => {
    const midis = jazzVoicing(notes, id);
    if (!midis.length) return;
    const card = e('article', 'jazz-voicing-card');
    card.append(e('strong', '', title), e('p', '', midis.map(midi => jazzMidiName(midi, names)).join(' · ')));
    const play = e('button', 'jazz-outline-btn', `♪ ${t.play}`); play.type = 'button';
    play.addEventListener('click', () => playChord(midis.map(midi => midiFrequency(midi, semitoneToFreq)), 1.6));
    card.appendChild(play); grid.appendChild(card);
  });
  section.appendChild(grid);
  section.appendChild(link(`${t.source}: ${JAZZ_CHAPTERS.find(chapter => chapter.no === 7).title} ↗`, JAZZ_CHAPTERS.find(chapter => chapter.no === 7).url, 'jazz-source-link'));
  const tension = e('section', 'jazz-dominant-dial');
  tension.appendChild(e('h4', '', t.dominantTarget));
  const isDominant = notes.some(note => (lccPitchClass(note) - tonic + 12) % 12 === 4)
    && notes.some(note => (lccPitchClass(note) - tonic + 12) % 12 === 10);
  const dominantRoot = isDominant ? tonic : (tonic + 7) % 12;
  tension.appendChild(e('p', 'jazz-intro', `${t.dominantExample}: ${names[dominantRoot]}7`));
  const target = e('select', 'jazz-dominant-target'); target.append(option('major', t.targetMajor), option('minor', t.targetMinor));
  tension.appendChild(target);
  const toneRow = e('div', 'jazz-dominant-tone-row'); tension.appendChild(toneRow);
  tension.appendChild(e('p', 'jazz-caveat', t.dominantHint));
  tension.appendChild(link(`${t.source}: ${JAZZ_CHAPTERS.find(chapter => chapter.no === 6).title} ↗`, JAZZ_CHAPTERS.find(chapter => chapter.no === 6).url, 'jazz-source-link'));
  section.appendChild(tension);
  function updateTarget() {
    toneRow.replaceChildren();
    const intervals = target.value === 'major' ? [[2, '9'], [9, '13']] : [[1, '♭9'], [8, '♭13']];
    intervals.forEach(([interval, degree]) => {
      const chip = e('span', 'jazz-note-chip');
      chip.append(e('strong', '', names[(dominantRoot + interval) % 12]), e('small', '', degree));
      toneRow.appendChild(chip);
    });
  }
  target.addEventListener('change', updateTarget); updateTarget();
}

function renderMaps(body, t) {
  const section = e('section', 'jazz-maps'); body.appendChild(section);
  section.appendChild(e('p', 'jazz-intro', t.mapHelp));
  const credit = e('p', 'jazz-map-credit');
  credit.append(e('span', '', `${t.mapCredit}: `), link('music-theory.aizcutei.com', 'https://music-theory.aizcutei.com/', 'jazz-source-link'));
  section.appendChild(credit);
  const tools = e('div', 'jazz-map-tools');
  const choose = e('div', 'jazz-map-switch');
  const entries = [['map', t.map, './resources/modemap_cn.svg'], ['tree', t.tree, './resources/modetree_cn.svg']];
  const zoomLabel = e('label', 'jazz-zoom-label');
  const slider = e('input', 'jazz-map-zoom'); slider.type = 'range'; slider.min = '35'; slider.max = '250'; slider.value = '90';
  const zoomValue = e('span', 'jazz-zoom-value', '90%');
  zoomLabel.append(e('span', '', t.zoom), slider, zoomValue);
  const fit = e('button', 'jazz-outline-btn', t.fit); fit.type = 'button';
  const open = link(`${t.open} ↗`, entries[0][2], 'jazz-source-link');
  tools.append(choose, zoomLabel, fit, open); section.appendChild(tools);
  const viewport = e('div', 'jazz-map-viewport');
  viewport.tabIndex = 0; viewport.setAttribute('aria-label', t.map);
  const image = e('img', 'jazz-map-image'); image.alt = t.map;
  image.draggable = false; viewport.appendChild(image); section.appendChild(viewport);
  let current = entries[0];
  function applyZoom() {
    image.style.width = `${Math.round(1000 * Number(slider.value) / 100)}px`;
    zoomValue.textContent = `${slider.value}%`;
  }
  function selectMap(entry) {
    current = entry; image.src = entry[2]; image.alt = entry[1]; open.href = entry[2]; viewport.setAttribute('aria-label', entry[1]);
    choose.querySelectorAll('button').forEach(button => button.classList.toggle('active', button.dataset.map === entry[0]));
    viewport.scrollTop = 0; viewport.scrollLeft = 0;
  }
  entries.forEach(entry => { const button = e('button', '', entry[1]); button.type = 'button'; button.dataset.map = entry[0]; button.addEventListener('click', () => selectMap(entry)); choose.appendChild(button); });
  slider.addEventListener('input', applyZoom);
  fit.addEventListener('click', () => { slider.value = String(Math.max(35, Math.min(250, Math.round(viewport.clientWidth / 1000 * 100)))); applyZoom(); });
  let dragging = null;
  viewport.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    dragging = { x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('dragging');
  });
  viewport.addEventListener('pointermove', event => {
    if (!dragging) return;
    viewport.scrollLeft = dragging.left - (event.clientX - dragging.x);
    viewport.scrollTop = dragging.top - (event.clientY - dragging.y);
  });
  const stop = () => { dragging = null; viewport.classList.remove('dragging'); };
  viewport.addEventListener('pointerup', stop); viewport.addEventListener('pointercancel', stop);
  selectMap(current); applyZoom();
}

function renderChapters(body, t, activate) {
  const section = e('section', 'jazz-chapters'); body.appendChild(section);
  section.appendChild(e('p', 'jazz-intro', t.chaptersHelp));
  const filters = e('div', 'jazz-chapter-filters');
  const group = e('select', 'jazz-chapter-group');
  group.appendChild(option('all', t.all));
  [...new Set(JAZZ_CHAPTERS.map(item => item.group))].forEach(name => group.appendChild(option(name, name)));
  const search = e('input', 'jazz-chapter-search'); search.type = 'search'; search.placeholder = t.search;
  filters.append(label(t.family, group), label(t.search, search));
  section.appendChild(filters);
  const list = e('div', 'jazz-chapter-list'); section.appendChild(list);
  function refresh() {
    const query = search.value.trim().toLowerCase();
    list.replaceChildren();
    JAZZ_CHAPTERS.filter(item => (group.value === 'all' || item.group === group.value)
      && (!query || `${item.title} ${item.summary} ${item.example} ${item.group}`.toLowerCase().includes(query))).forEach(item => {
      const card = e('article', 'jazz-chapter-card');
      const top = e('div', 'jazz-chapter-top'); top.append(e('span', 'jazz-chapter-no', String(item.no).padStart(2, '0')), e('strong', '', item.title), e('small', '', item.group));
      card.append(top, e('p', '', item.summary), e('code', '', item.example));
      const actions = e('div', 'jazz-actions');
      actions.appendChild(link('阅读原教程 ↗', item.url, 'jazz-source-link'));
      const jump = e('button', 'jazz-outline-btn', t.tryTool); jump.type = 'button'; jump.addEventListener('click', () => activate(item.tool, item.no));
      actions.appendChild(jump); card.appendChild(actions); list.appendChild(card);
    });
  }
  group.addEventListener('change', refresh); search.addEventListener('input', refresh); refresh();
}

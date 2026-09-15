import { LCC_HORIZONTAL_SCALES, lccPitchClass, lccScaleNotes, lccAdaptChordToColor } from './lcc_concept.js';
import { mountLccProgression } from './lcc_progression_ui.js';
import { mountLccLab } from './lcc_lab_ui.js';

const COPY = {
  zh: {
    title: 'Lydian Chromatic Concept · 父本探索', candidates: '包含全部和弦音的候选',
    parent: 'Lydian Tonic / 父本', chordRoot: '和弦根音', mode: '父本中的调式', tonalRank: '根音音调顺序',
    noMode: '根音不在此音阶内', toneOrder: '12音的音调顺序',
    toneHelp: '顺序不是半音距离；左侧音先进入父本中心。高亮是当前和弦音。',
    family: '同一父本的七种主要色彩', familyHelp: '比较的是同一 Lydian Tonic 下的音阶，不是把和弦根音直接当作父本。',
    fits: '保留和弦音', changes: '需改变和弦音', added: '相对基础 Lydian 新增', removed: '移除',
    missing: '缺少和弦音', adaptation: '最近半音换色参考', extensions: '可探索的音', preview: '钢琴试听',
    horizontal: '也列出4种水平音阶候选', horizontalTitle: '四种水平音阶（参考）',
    horizontalHelp: '水平音阶与七种主要父本色彩分开列出；这里展示音集合，并非 Russell 完整的和弦调式表。',
    shortlist: '当前顺序只是“音阶能包含和弦音 + 色彩序号 + 根音音调序号”的教学排序；不适配卡片的试听用最近半音换色示例。两者都不是正式的 LCC 引力分数、和弦调式规定或唯一答案。',
    noResults: '没有完整包含这些和弦音的候选父本。', sources: '理论参考',
    levels: ['内向', '半内向', '半外向', '外向'],
  },
  en: {
    title: 'Lydian Chromatic Concept · Parent Explorer', candidates: 'Parents containing every chord tone',
    parent: 'Lydian Tonic / parent', chordRoot: 'Chord root', mode: 'Mode within the parent', tonalRank: 'Root tonal rank',
    noMode: 'Root outside this scale', toneOrder: '12-tone tonal order',
    toneHelp: 'This is not semitone distance. Earlier tones are closer to the parent center; highlighted tones belong to the chord.',
    family: 'Seven principal colors of one parent', familyHelp: 'Compare scales under one Lydian Tonic; the chord root is not automatically the parent.',
    fits: 'Keeps chord tones', changes: 'Changes chord tones', added: 'Added vs. prime Lydian', removed: 'Removed',
    missing: 'Missing chord tones', adaptation: 'Nearest-note color-change example', extensions: 'Available colors', preview: 'Piano preview',
    horizontal: 'Include four horizontal-scale candidates', horizontalTitle: 'Four horizontal scales (reference)',
    horizontalHelp: 'Horizontal scales are separate from the seven principal parent colors. Pitch collections shown here are not Russell’s full chordmode chart.',
    shortlist: 'The ordering is a teaching shortlist based on chord-tone inclusion, color number and root tonal rank; incompatible previews use nearest-note examples. Neither is a formal LCC tonal-gravity score, chordmode rule or unique answer.',
    noResults: 'No parent collection contains all chord tones.', sources: 'Theory references',
    levels: ['Ingoing', 'Semi-ingoing', 'Semi-outgoing', 'Outgoing'],
  },
  ja: {
    title: 'リディアン・クロマティック・コンセプト · 親スケール', candidates: '全コードトーンを含む候補',
    parent: 'リディアン・トニック / 親', chordRoot: 'コードのルート', mode: '親から見たモード', tonalRank: 'ルートの音調順位',
    noMode: 'ルートはスケール外', toneOrder: '12音のトーナル・オーダー',
    toneHelp: '半音距離の順番ではありません。左ほど親の中心に近く、強調音はコードトーンです。',
    family: '同じ親の7つの主要カラー', familyHelp: '同じリディアン・トニックの音階を比較します。コードのルートが親とは限りません。',
    fits: 'コードトーンを保持', changes: 'コードトーンの変更が必要', added: '基本リディアンから追加', removed: '除外',
    missing: '不足するコードトーン', adaptation: '近い音へのカラー変更例', extensions: '利用可能な音', preview: 'ピアノ試聴',
    horizontal: '4つの水平スケールも候補に含める', horizontalTitle: '4つの水平スケール（参考）',
    horizontalHelp: '水平スケールは7つの主要カラーとは別です。これは完全なコードモード表ではありません。',
    shortlist: 'この並びは学習用候補です。非適合カラーの試聴は近い音への変更例であり、正式な重力スコアやコードモード規則ではありません。',
    noResults: 'すべてのコードトーンを含む親スケールはありません。', sources: '理論資料',
    levels: ['内向', '半内向', '半外向', '外向'],
  },
};

const INTERVALS = {
  zh: ['纯一度', '小二度', '大二度', '小三度', '大三度', '纯四度', '增四度', '纯五度', '小六度', '大六度', '小七度', '大七度'],
  en: ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', 'A4', 'P5', 'm6', 'M6', 'm7', 'M7'],
  ja: ['完全1度', '短2度', '長2度', '短3度', '長3度', '完全4度', '増4度', '完全5度', '短6度', '長6度', '短7度', '長7度'],
};

function element(tag, className = '', content = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content) node.textContent = content;
  return node;
}

function notePills(notes, chordPitches, tonicPitch) {
  const row = element('div', 'lcc-note-row');
  notes.forEach(note => {
    const pill = element('span', 'lcc-note-pill', note);
    const pitch = lccPitchClass(note);
    if (chordPitches.has(pitch)) pill.classList.add('is-chord');
    if (pitch === tonicPitch) pill.classList.add('is-tonic');
    row.appendChild(pill);
  });
  return row;
}

function pianoVoicing(parent, chordNotes, extensions, semitoneToFreq) {
  const rootPitch = lccPitchClass(chordNotes[0]);
  const parentPitch = lccPitchClass(parent);
  const rootMidi = 48 + rootPitch;
  const parentMidi = rootMidi - ((rootPitch - parentPitch + 12) % 12);
  const midis = [parentMidi, ...[...new Set([...chordNotes, ...extensions.slice(0, 2)].map(lccPitchClass))]
    .map(pitch => rootMidi + ((pitch - rootPitch + 12) % 12))];
  return [...new Set(midis)].map(midi => semitoneToFreq(midi % 12, Math.floor(midi / 12) - 1));
}

export function mountLccExplorer(target, input, { brain, conv, playChord, semitoneToFreq }) {
  const language = document.documentElement.lang.toLowerCase().startsWith('ja') ? 'ja'
    : document.documentElement.lang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  const t = COPY[language];
  const view = target.dataset.lccView || 'parent';
  target.dataset.lccView = view;
  target.closest('#panel-lcc')?.querySelector('.panel-header')?.classList.toggle('lcc-chord-input-hidden', view === 'parent');
  target.replaceChildren();
  const views = element('div', 'lcc-view-tabs');
  [
    ['parent', { zh: '父本实验室 · 无需和弦', en: 'Parent lab · no chord needed', ja: '親スケール実験室 · コード不要' }[language]],
    ['chord', { zh: '和弦与进行', en: 'Chord & progression', ja: 'コードと進行' }[language]],
  ].forEach(([id, caption]) => {
    const button = element('button', id === view ? 'active' : '', caption);
    button.type = 'button'; button.dataset.lccView = id;
    button.setAttribute('aria-selected', String(id === view));
    button.addEventListener('click', () => {
      target.dataset.lccView = id;
      const currentInput = target.closest('#panel-lcc')?.querySelector('#lcc-input')?.value || input;
      mountLccExplorer(target, currentInput, { brain, conv, playChord, semitoneToFreq });
    });
    views.appendChild(button);
  });
  target.appendChild(views);
  if (view === 'parent') {
    mountLccLab(target, { playChord, semitoneToFreq });
    return;
  }
  let chordNotes = null;
  try { chordNotes = conv._ensureNotesAndRoot(input.trim()); } catch { /* invalid chord syntax */ }
  if (!chordNotes?.length) {
    target.appendChild(element('p', 'input-error', window.__('cannot_parse_chord')));
    return;
  }
  const chordPitches = new Set(chordNotes.map(lccPitchClass));
  const heading = element('div', 'lcc-explorer-head');
  const headingText = element('div');
  headingText.append(element('div', 'lcc-eyebrow', 'LCC / TONALITY'), element('h3', '', t.title));
  heading.appendChild(headingText);
  target.appendChild(heading);

  const controls = element('div', 'lcc-controls');
  const parentLabel = element('label', 'lcc-parent-label');
  parentLabel.appendChild(element('span', '', t.candidates));
  const parentSelect = element('select', 'lcc-parent-select');
  parentSelect.setAttribute('aria-label', t.candidates);
  parentLabel.appendChild(parentSelect);
  controls.appendChild(parentLabel);
  const horizontalLabel = element('label', 'lcc-horizontal-toggle');
  const horizontalInput = element('input');
  horizontalInput.type = 'checkbox';
  horizontalInput.checked = target.dataset.lccHorizontal === 'true';
  horizontalLabel.append(horizontalInput, element('span', '', t.horizontal));
  controls.appendChild(horizontalLabel);
  target.appendChild(controls);

  const content = element('div', 'lcc-content');
  target.appendChild(content);

  function renderCandidates(preferred = '') {
    const results = brain.lcc.analyzeLCC(chordNotes, { includeHorizontal: horizontalInput.checked });
    parentSelect.replaceChildren();
    if (!results.length) {
      content.replaceChildren(element('p', 'input-error', t.noResults));
      return;
    }
    results.forEach((result, index) => {
      const option = element('option', '', `${result.parent} · ${result.scale} · ${result.mode ? `mode ${result.mode.number}` : '—'}`);
      option.value = String(index);
      option.dataset.key = `${result.parent}:${result.scaleId}`;
      parentSelect.appendChild(option);
    });
    const preferredIndex = results.findIndex(result => `${result.parent}:${result.scaleId}` === preferred);
    parentSelect.value = String(preferredIndex < 0 ? 0 : preferredIndex);
    renderSelected(results[Number(parentSelect.value)]);
    parentSelect.onchange = () => renderSelected(results[Number(parentSelect.value)]);
  }

  function renderSelected(result) {
    content.replaceChildren();
    const parentPitch = lccPitchClass(result.parent);
    const summary = element('section', 'lcc-summary');
    const summaryTop = element('div', 'lcc-summary-top');
    summaryTop.append(element('div', 'lcc-summary-tonic', result.parent), element('div', 'lcc-summary-copy', `${t.parent} · ${result.scale}`));
    summary.appendChild(summaryTop);
    const forward = INTERVALS[language][result.tonicInterval];
    const backward = INTERVALS[language][(12 - result.tonicInterval) % 12];
    summary.appendChild(element('p', 'lcc-summary-meta', `${t.chordRoot}: ${chordNotes[0]} · ${t.mode}: ${result.mode ? `${result.mode.number} / ${result.mode.notes.join(' – ')}` : t.noMode} · L.T.I.: ${forward} / ${backward} · ${t.tonalRank}: ${result.rootToneOrder}/12`));
    summary.appendChild(notePills(result.scaleNotes, chordPitches, parentPitch));
    content.appendChild(summary);

    const orderSection = element('section', 'lcc-section');
    orderSection.append(element('h4', '', t.toneOrder), element('p', 'lcc-hint', t.toneHelp));
    const orderRow = element('div', 'lcc-tonal-order');
    brain.lcc.chromaticOrder(result.parent).forEach(item => {
      const chip = element('div', `lcc-order-chip ${item.level}`, item.note);
      if (chordPitches.has(lccPitchClass(item.note))) chip.classList.add('is-chord');
      chip.appendChild(element('small', '', String(item.rank)));
      orderRow.appendChild(chip);
    });
    orderSection.appendChild(orderRow);
    const legend = element('div', 'lcc-order-legend');
    ['ingoing', 'semi-ingoing', 'semi-outgoing', 'outgoing'].forEach((level, index) => legend.appendChild(element('span', level, t.levels[index])));
    orderSection.appendChild(legend);
    content.appendChild(orderSection);

    const familySection = element('section', 'lcc-section');
    familySection.append(element('h4', '', t.family), element('p', 'lcc-hint', t.familyHelp));
    const grid = element('div', 'lcc-color-grid');
    brain.lcc.colorFamily(result.parent, chordNotes).forEach(color => {
      const adapted = lccAdaptChordToColor(result.parent, chordNotes, color.id);
      const adaptedPitches = new Set(adapted.notes.map(lccPitchClass));
      const adaptedExtensions = color.notes.filter(note => !adaptedPitches.has(lccPitchClass(note)));
      const card = element('article', `lcc-color-card ${color.compatible ? 'is-compatible' : 'is-incompatible'}`);
      const title = element('div', 'lcc-color-title');
      title.append(element('span', 'lcc-color-number', String(color.colorOrder).padStart(2, '0')),
        element('strong', '', color.name));
      card.appendChild(title);
      card.appendChild(element('div', 'lcc-color-common', color.common));
      card.appendChild(element('div', `lcc-color-status ${color.compatible ? 'fits' : 'changes'}`, color.compatible ? t.fits : t.changes));
      card.appendChild(notePills(color.notes, chordPitches, parentPitch));
      if (color.mode) card.appendChild(element('p', 'lcc-card-detail', `${t.mode} ${color.mode.number} · ${color.mode.notes.join(' – ')}`));
      if (color.added.length || color.removed.length) card.appendChild(element('p', 'lcc-card-detail', `${t.added}: ${color.added.join(', ') || '—'} · ${t.removed}: ${color.removed.join(', ') || '—'}`));
      if (color.missingChordNotes.length) card.appendChild(element('p', 'lcc-card-detail lcc-warning', `${t.missing}: ${color.missingChordNotes.join(', ')}`));
      if (adapted.substitutions.length) card.appendChild(element('p', 'lcc-card-detail lcc-adaptation', `${t.adaptation}: ${adapted.substitutions.map(item => `${item.from} → ${item.to}`).join(', ')}`));
      if (color.compatible && color.extensions.length) card.appendChild(element('p', 'lcc-card-detail', `${t.extensions}: ${color.extensions.join(', ')}`));
      const play = element('button', 'lcc-preview', `♪ ${t.preview}`);
      play.type = 'button';
      play.title = `${color.name}: ${adapted.notes.join(' ')} + ${adaptedExtensions.slice(0, 2).join(' ')}`;
      play.addEventListener('click', () => playChord(pianoVoicing(result.parent, adapted.notes, adaptedExtensions, semitoneToFreq), 1.8));
      card.appendChild(play);
      grid.appendChild(card);
    });
    familySection.appendChild(grid);
    content.appendChild(familySection);

    const horizontalDetails = element('details', 'lcc-horizontal-reference');
    horizontalDetails.appendChild(element('summary', '', t.horizontalTitle));
    horizontalDetails.appendChild(element('p', 'lcc-hint', t.horizontalHelp));
    const horizontalGrid = element('div', 'lcc-horizontal-grid');
    LCC_HORIZONTAL_SCALES.forEach(scale => {
      const row = element('div', 'lcc-horizontal-row');
      row.appendChild(element('strong', '', scale.name));
      row.appendChild(element('small', 'lcc-horizontal-common', scale.common));
      row.appendChild(notePills(lccScaleNotes(result.parent, scale), chordPitches, parentPitch));
      horizontalGrid.appendChild(row);
    });
    horizontalDetails.appendChild(horizontalGrid);
    content.appendChild(horizontalDetails);

    content.appendChild(element('p', 'lcc-disclaimer', t.shortlist));
    const sourceRow = element('div', 'lcc-sources', `${t.sources}: `);
    const links = [
      ['George Russell', 'https://georgerussell.com/lydian-chromatic-concept'],
      ['LCC 介绍', 'https://music-theory.aizcutei.com/post/%E5%92%8C%E5%BC%A6%E7%AF%87/65-Lydian-Chromatic-Concept'],
    ];
    links.forEach(([label, href]) => {
      const link = element('a', '', label);
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      sourceRow.appendChild(link);
    });
    content.appendChild(sourceRow);
  }

  horizontalInput.addEventListener('change', () => {
    const selectedKey = parentSelect.selectedOptions[0]?.dataset.key || '';
    target.dataset.lccHorizontal = String(horizontalInput.checked);
    renderCandidates(selectedKey);
  });
  renderCandidates();
  mountLccProgression(target, { brain, conv, playChord, semitoneToFreq });
}

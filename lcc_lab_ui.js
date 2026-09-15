import { LCC_PRINCIPAL_SCALES, LCC_HORIZONTAL_SCALES, lccPitchClass, lccScaleNotes, lccChromaticOrder, lccColorFamily } from './lcc_concept.js';
import { LCC_LAB_NOTES, lccLabScale, lccChildCollections, lccTertianExamples, lccAscendingMidi } from './lcc_lab.js';

const TEXT = {
  zh: {
    title: 'LCC · 不依赖和弦的父本实验室', intro: '先选 Lydian Tonic，再观察音调顺序、主要色彩、水平音阶和父本派生的音集合。此处不需要输入和弦。',
    tonic: 'Lydian Tonic', scale: '父本音阶', principal: '七种主要色彩（垂直）', horizontal: '四种水平音阶',
    order: '12 音 Tonal Order', orderHint: '从左到右是与父本中心的音调关系顺序，不是半音阶，也不是可量化的引力分数。点音可试听。',
    selected: '当前父本', source: '资料来源', added: '相对底色新增', removed: '移除', prime: '底色',
    preview: '钢琴试听', hearScale: '从主音上行试听', choose: '切换到此色彩',
    modes: '从父本各音出发的相对音集合', modeHint: '旋转同一父本的音集合；根音与 Lydian Tonic 可以不同。这里展示音高结构，不冒充 Russell 的正式 Chordmode 命名。',
    child: '派生根音', root: '相对根音', interval: 'L.T.I.（父本 → 派生根音）', rank: '音调顺序位置',
    station: 'I／VI Tonic Stations · 七声父本示例', stationHint: '对七声父本每隔一个音抽取四个音（1·3·5·7），标记 I 和 VI 两个终止点。只是透明的三度叠置示例，不是 Russell 完整的 Chordmode／和弦分类表。',
    auxiliary: count => `该父本含 ${count} 个音，不套用七声三度叠置模板；仍可在上方探索每个相对根音。`,
    comparison: '同一音集合，三个不同中心', comparisonHint: '教程中 G7 → C 的例子：C Major（调中心）、G Mixolydian（和弦根音）、F Lydian（Lydian Tonic）可用相同的白键，却不是同一种理论定位。',
    levels: ['内向', '半内向', '半外向', '外向'], caveat: '此页按教程重建可计算的音集合和视听实验。教程本身只是 LCC 简介；正式的音调引力、Chordmode 表与水平／垂直判定远比这里复杂。',
  },
  en: {
    title: 'LCC · Chord-free parent lab', intro: 'Choose a Lydian Tonic first, then explore tonal order, principal colors, horizontal collections and modes derived from the parent. No chord input required.',
    tonic: 'Lydian Tonic', scale: 'Parent collection', principal: 'Seven principal colors (vertical)', horizontal: 'Four horizontal collections',
    order: '12-tone Tonal Order', orderHint: 'Left to right is tonal-order relationship, not chromatic order or a numeric gravity score. Click a tone to hear it.',
    selected: 'Selected parent', source: 'Sources', added: 'Added vs prime', removed: 'Removed', prime: 'Prime color',
    preview: 'Piano preview', hearScale: 'Play ascending scale', choose: 'Switch to color',
    modes: 'Relative collections from each parent tone', modeHint: 'Rotations of one parent collection; their roots can differ from the Lydian Tonic. Pitch structures, not Russell’s full chordmode nomenclature.',
    child: 'Derived root', root: 'Relative root', interval: 'L.T.I. (parent → root)', rank: 'Tonal-order rank',
    station: 'I / VI Tonic Stations · seven-tone examples', stationHint: 'For seven-tone parents, extract tones 1·3·5·7 and mark I / VI as tonic stations. Transparent tertian examples, not Russell’s complete chordmode chart.',
    auxiliary: count => `This parent has ${count} tones, so the seven-tone tertian template is not imposed. Explore its relative roots above.`,
    comparison: 'Same notes, three different centers', comparisonHint: 'For G7 → C: C Major (key center), G Mixolydian (chord root), and F Lydian (Lydian Tonic) can share the white keys, yet have different theoretical centers.',
    levels: ['Ingoing', 'Semi-ingoing', 'Semi-outgoing', 'Outgoing'], caveat: 'This page reconstructs computable pitch collections and audible experiments from an introductory article. Formal gravity and chordmode classifications are more complex.',
  },
  ja: {
    title: 'LCC · コード不要の親スケール実験室', intro: 'リディアン・トニックから始め、音調順序、主要カラー、水平スケール、親から派生する音集合を探索します。コード入力は不要です。',
    tonic: 'リディアン・トニック', scale: '親スケール', principal: '7つの主要カラー（垂直）', horizontal: '4つの水平スケール',
    order: '12音のトーナル・オーダー', orderHint: '半音階や数値的な重力得点ではありません。音をクリックして試聴できます。',
    selected: '選択中の親', source: '資料', added: '基本色から追加', removed: '除外', prime: '基本色',
    preview: 'ピアノで試聴', hearScale: '上行スケール', choose: 'このカラーに切り替え',
    modes: '親の各音から始まる相対音集合', modeHint: '親音集合の回転です。根音はリディアン・トニックと異なる場合があります。正式なコードモード表ではありません。',
    child: '派生根音', root: '相対根音', interval: 'L.T.I.（親 → 根音）', rank: '音調順位',
    station: 'I／VI トニック・ステーション', stationHint: '7声音階から1·3·5·7を抽出し I と VI を示します。完全なコードモード表ではありません。',
    auxiliary: count => `この親は${count}音なので、7音の三度堆積を当てはめません。`,
    comparison: '同じ音、異なる3つの中心', comparisonHint: 'G7 → C の例：C Major、G Mixolydian、F Lydian は同じ白鍵を使っても中心の意味が異なります。',
    levels: ['内向', '半内向', '半外向', '外向'], caveat: 'このページは入門記事を基にした音集合と試聴の実験です。正式な重力理論やコードモード表はさらに複雑です。',
  },
};

const e = (tag, className = '', value = '') => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value) node.textContent = value;
  return node;
};
const opt = (value, label) => { const node = e('option', '', label); node.value = value; return node; };
const language = () => document.documentElement.lang.toLowerCase().startsWith('ja') ? 'ja'
  : document.documentElement.lang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
const midiFrequency = (midi, semitoneToFreq) => semitoneToFreq(midi % 12, Math.floor(midi / 12) - 1);

function playAscending(midis, playChord, semitoneToFreq) {
  midis.forEach((midi, index) => setTimeout(() => playChord([midiFrequency(midi, semitoneToFreq)], .3, { interrupt: index === 0 }), index * 325));
}
function pitchRow(notes, selected = new Set()) {
  const row = e('div', 'lcc-note-row');
  notes.forEach(note => {
    const chip = e('span', 'lcc-note-pill', note);
    if (selected.has(lccPitchClass(note))) chip.classList.add('is-chord');
    row.appendChild(chip);
  });
  return row;
}
function sourceLink(label, href) {
  const link = e('a', '', label);
  link.href = href; link.target = '_blank'; link.rel = 'noopener noreferrer';
  return link;
}

export function mountLccLab(target, { playChord, semitoneToFreq }) {
  const t = TEXT[language()];
  const head = e('div', 'lcc-explorer-head');
  const title = e('div');
  title.append(e('div', 'lcc-eyebrow', 'LCC / PARENT LAB'), e('h3', '', t.title));
  head.appendChild(title); target.appendChild(head);
  target.appendChild(e('p', 'lcc-hint', t.intro));
  const controls = e('div', 'lcc-lab-controls');
  const tonicLabel = e('label'); tonicLabel.appendChild(e('span', '', t.tonic));
  const tonic = e('select', 'lcc-lab-tonic');
  LCC_LAB_NOTES.forEach(name => tonic.appendChild(opt(name, name)));
  tonic.value = target.dataset.lccLabParent || 'C'; tonicLabel.appendChild(tonic);
  const scaleLabel = e('label'); scaleLabel.appendChild(e('span', '', t.scale));
  const scale = e('select', 'lcc-lab-scale');
  [[t.principal, LCC_PRINCIPAL_SCALES], [t.horizontal, LCC_HORIZONTAL_SCALES]].forEach(([caption, items]) => {
    const group = e('optgroup'); group.label = caption;
    items.forEach(item => group.appendChild(opt(item.id, item.name)));
    scale.appendChild(group);
  });
  scale.value = target.dataset.lccLabScale || 'lydian'; scaleLabel.appendChild(scale);
  const preview = e('button', 'lcc-preview lcc-lab-primary-preview', `♪ ${t.hearScale}`); preview.type = 'button';
  preview.addEventListener('click', () => playAscending(lccAscendingMidi(tonic.value, scale.value), playChord, semitoneToFreq));
  controls.append(tonicLabel, scaleLabel, preview); target.appendChild(controls);
  const detail = e('div', 'lcc-lab-detail'); target.appendChild(detail);

  function paint() {
    const parent = tonic.value;
    const definition = lccLabScale(scale.value);
    target.dataset.lccLabParent = parent; target.dataset.lccLabScale = definition.id;
    detail.replaceChildren();
    const parentPitch = lccPitchClass(parent);
    const currentNotes = lccScaleNotes(parent, definition);
    const currentPitches = new Set(currentNotes.map(lccPitchClass));
    const selected = e('section', 'lcc-summary lcc-lab-summary');
    selected.append(e('div', 'lcc-summary-tonic', parent), e('div', 'lcc-summary-copy', `${t.selected}: ${definition.name}`));
    selected.appendChild(pitchRow(currentNotes, new Set([parentPitch])));
    detail.appendChild(selected);

    const order = e('section', 'lcc-section');
    order.append(e('h4', '', t.order), e('p', 'lcc-hint', t.orderHint));
    const orderGrid = e('div', 'lcc-tonal-order lcc-lab-order');
    lccChromaticOrder(parent).forEach(item => {
      const button = e('button', `lcc-order-chip ${item.level}${currentPitches.has(lccPitchClass(item.note)) ? ' is-chord' : ''}`, item.note);
      button.type = 'button'; button.title = `${item.rank}/12 · ${t.levels[['ingoing', 'semi-ingoing', 'semi-outgoing', 'outgoing'].indexOf(item.level)]}`;
      button.appendChild(e('small', '', String(item.rank)));
      button.addEventListener('click', () => playChord([midiFrequency(60 + parentPitch + item.interval, semitoneToFreq)], .7));
      orderGrid.appendChild(button);
    });
    order.appendChild(orderGrid); detail.appendChild(order);

    const palette = e('section', 'lcc-section');
    palette.append(e('h4', '', t.principal), e('p', 'lcc-hint', `${t.prime}: Lydian · ${t.added} / ${t.removed}`));
    const grid = e('div', 'lcc-color-grid lcc-lab-palette');
    lccColorFamily(parent).forEach(color => {
      const card = e('article', `lcc-color-card${color.id === definition.id ? ' is-compatible' : ''}`);
      const header = e('div', 'lcc-color-title');
      header.append(e('span', 'lcc-color-number', String(color.colorOrder).padStart(2, '0')), e('strong', '', color.name));
      card.append(header, e('div', 'lcc-color-common', color.common), pitchRow(color.notes, new Set([parentPitch])));
      card.appendChild(e('p', 'lcc-card-detail', `${t.added}: ${color.added.join(', ') || '—'} · ${t.removed}: ${color.removed.join(', ') || '—'}`));
      const actions = e('div', 'lcc-lab-actions');
      const choose = e('button', 'lcc-preview', t.choose); choose.type = 'button';
      choose.addEventListener('click', () => { scale.value = color.id; paint(); });
      const hear = e('button', 'lcc-preview', `♪ ${t.preview}`); hear.type = 'button';
      hear.addEventListener('click', () => playAscending(lccAscendingMidi(parent, color.id), playChord, semitoneToFreq));
      actions.append(choose, hear); card.appendChild(actions); grid.appendChild(card);
    });
    palette.appendChild(grid); detail.appendChild(palette);

    const horizontal = e('section', 'lcc-section');
    horizontal.append(e('h4', '', t.horizontal), e('p', 'lcc-hint', t.caveat));
    const horizontalGrid = e('div', 'lcc-horizontal-grid lcc-lab-horizontal');
    LCC_HORIZONTAL_SCALES.forEach(item => {
      const row = e('article', `lcc-horizontal-row${item.id === definition.id ? ' is-selected' : ''}`);
      row.append(e('strong', '', item.name), e('small', 'lcc-horizontal-common', item.common), pitchRow(lccScaleNotes(parent, item), new Set([parentPitch])));
      const choose = e('button', 'lcc-preview', t.choose); choose.type = 'button';
      choose.addEventListener('click', () => { scale.value = item.id; paint(); }); row.appendChild(choose);
      horizontalGrid.appendChild(row);
    });
    horizontal.appendChild(horizontalGrid); detail.appendChild(horizontal);

    const modes = e('section', 'lcc-section lcc-lab-modes');
    modes.append(e('h4', '', t.modes), e('p', 'lcc-hint', t.modeHint));
    const children = lccChildCollections(parent, definition.id);
    const modeSelect = e('select', 'lcc-lab-child');
    children.forEach(child => modeSelect.appendChild(opt(String(child.degree), `${String(child.degree).padStart(2, '0')} · ${child.root}`)));
    modes.appendChild(modeSelect);
    const modeDetail = e('div', 'lcc-lab-child-detail'); modes.appendChild(modeDetail);
    function paintMode() {
      const child = children[Number(modeSelect.value) - 1];
      modeDetail.replaceChildren();
      const summary = e('div', 'lcc-lab-child-summary');
      summary.append(e('strong', '', `${t.child}: ${child.root}`), e('span', '', `${t.interval}: ${child.tonicInterval}/12 · ${t.rank}: ${child.tonalRank}/12`));
      modeDetail.append(summary, pitchRow(child.notes, new Set([lccPitchClass(child.root)])));
      const hear = e('button', 'lcc-preview', `♪ ${t.preview}`); hear.type = 'button';
      hear.addEventListener('click', () => {
        const start = 60 + lccPitchClass(child.root);
        playAscending([...child.intervals.map(interval => start + interval), start + 12], playChord, semitoneToFreq);
      });
      modeDetail.appendChild(hear);
    }
    modeSelect.addEventListener('change', paintMode); paintMode(); detail.appendChild(modes);

    const stations = e('section', 'lcc-section lcc-lab-stations');
    stations.append(e('h4', '', t.station), e('p', 'lcc-hint', t.stationHint));
    const examples = lccTertianExamples(parent, definition.id);
    if (!examples.length) stations.appendChild(e('p', 'lcc-disclaimer', t.auxiliary(definition.intervals.length)));
    else {
      const stationGrid = e('div', 'lcc-lab-station-grid');
      examples.forEach(item => {
        const card = e('article', `lcc-lab-station${item.tonicStation ? ' tonic-station' : ''}`);
        card.append(e('small', '', `${item.degree}${item.tonicStation ? ' · TONIC STATION' : ''}`), e('strong', '', item.root), pitchRow(item.notes), e('p', '', item.intervals.join(' · ')));
        const hear = e('button', 'lcc-preview', `♪ ${t.preview}`); hear.type = 'button';
        hear.addEventListener('click', () => {
          const rootMidi = 48 + lccPitchClass(item.root);
          playChord(item.intervals.map(interval => midiFrequency(rootMidi + interval, semitoneToFreq)), 1.5);
        });
        card.appendChild(hear); stationGrid.appendChild(card);
      });
      stations.appendChild(stationGrid);
    }
    detail.appendChild(stations);

    const comparison = e('section', 'lcc-section lcc-lab-comparison');
    comparison.append(e('h4', '', t.comparison), e('p', 'lcc-hint', t.comparisonHint));
    const examplesRow = e('div', 'lcc-lab-center-grid');
    [['C Major', 'Key Tonic: C', 'C', 'major'], ['G Mixolydian', 'Modal Tonic: G', 'G', 'minorFlat7'], ['F Lydian', 'Lydian Tonic: F', 'F', 'lydian']].forEach(([name, center, root, id]) => {
      const card = e('article', 'lcc-lab-center-card');
      card.append(e('strong', '', name), e('small', '', center), pitchRow(lccScaleNotes(root, id)));
      examplesRow.appendChild(card);
    });
    comparison.appendChild(examplesRow); detail.appendChild(comparison);
    detail.appendChild(e('p', 'lcc-disclaimer', t.caveat));
    const source = e('div', 'lcc-sources', `${t.source}: `);
    source.append(sourceLink('LCC 介绍', 'https://music-theory.aizcutei.com/post/%E5%92%8C%E5%BC%A6%E7%AF%87/65-Lydian-Chromatic-Concept'),
      sourceLink('George Russell', 'https://georgerussell.com/lydian-chromatic-concept'));
    detail.appendChild(source);
  }
  tonic.addEventListener('change', paint); scale.addEventListener('change', paint); paint();
}

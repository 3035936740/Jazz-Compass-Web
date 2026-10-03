import { LCC_PRINCIPAL_SCALES, lccPitchClass, lccColorFamily, lccAdaptChordToColor } from './lcc_concept.js';

const COPY = {
  zh: { title: '和弦进行 · 同一色彩跨父本', help: '先为每个和弦找父本，再让它们共享一种主要色彩。文章的 ii–V–I–vi 示例会得到 F / F / C / C。每个父本都可以手动改选。', input: '和弦进行（用 | 分隔）', color: '统一的色彩', run: '分析进行', tonic: '父本', mode: '调式', unchanged: '保留原和弦', changed: '参考换色', extensions: '新增色彩音', preview: '钢琴试听', error: '请输入至少两个可识别的和弦，用 | 分隔。', parentCandidates: '可选父本' },
  en: { title: 'Progression · One color across parents', help: 'Find a parent for each chord, then apply the same principal color. The article’s ii–V–I–vi example yields F / F / C / C. Each parent can be changed.', input: 'Progression (separate with |)', color: 'Shared color', run: 'Analyze progression', tonic: 'Parent', mode: 'Mode', unchanged: 'Original chord kept', changed: 'Example color change', extensions: 'Added color tones', preview: 'Piano preview', error: 'Enter at least two recognizable chords separated by |.', parentCandidates: 'Possible parents' },
  ja: { title: 'コード進行 · 親をまたぐ同じカラー', help: '各コードの親を探してから、同じ主要カラーを適用します。ii–V–I–vi の例は F / F / C / C です。親は個別に変更できます。', input: 'コード進行（| で区切る）', color: '共通カラー', run: '進行を解析', tonic: '親', mode: 'モード', unchanged: '元のコードを保持', changed: 'カラー変更例', extensions: '追加カラー音', preview: 'ピアノ試聴', error: '認識できるコードを2つ以上 | で区切って入力してください。', parentCandidates: '親の候補' },
};

const el = (tag, className = '', value = '') => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value) node.textContent = value;
  return node;
};

function voicing(parent, chordNotes, colorTones, semitoneToFreq) {
  const root = lccPitchClass(chordNotes[0]);
  const tonic = lccPitchClass(parent);
  const rootMidi = 48 + root;
  const tonicMidi = rootMidi - ((root - tonic + 12) % 12);
  const pitches = [...new Set([...chordNotes, ...colorTones.slice(0, 2)].map(lccPitchClass))];
  const midis = [tonicMidi, ...pitches.map(pitch => rootMidi + ((pitch - root + 12) % 12))];
  return [...new Set(midis)].map(midi => semitoneToFreq(midi % 12, Math.floor(midi / 12) - 1));
}

export function mountLccProgression(target, { brain, conv, playChord, semitoneToFreq }) {
  const language = document.documentElement.lang.toLowerCase().startsWith('ja') ? 'ja'
    : document.documentElement.lang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  const t = COPY[language];
  const section = el('section', 'lcc-progression-section');
  section.append(el('h4', '', t.title), el('p', 'lcc-hint', t.help));
  const toolbar = el('div', 'lcc-progression-toolbar');
  const inputLabel = el('label', 'lcc-progression-input-label');
  inputLabel.appendChild(el('span', '', t.input));
  const progressionInput = el('input', 'lcc-progression-input');
  progressionInput.type = 'text';
  progressionInput.value = target.dataset.lccProgression || 'Dm7 | G7 | Cmaj7 | Am7';
  progressionInput.setAttribute('aria-label', t.input);
  inputLabel.appendChild(progressionInput);
  toolbar.appendChild(inputLabel);
  const colorLabel = el('label', 'lcc-progression-color-label');
  colorLabel.appendChild(el('span', '', t.color));
  const colorSelect = el('select', 'lcc-progression-color');
  colorSelect.setAttribute('aria-label', t.color);
  LCC_PRINCIPAL_SCALES.forEach(scale => {
    const option = el('option', '', scale.name);
    option.value = scale.id;
    colorSelect.appendChild(option);
  });
  colorSelect.value = target.dataset.lccProgressionColor || 'lydian';
  colorLabel.appendChild(colorSelect);
  toolbar.appendChild(colorLabel);
  const run = el('button', 'lcc-progression-run', t.run);
  run.type = 'button';
  toolbar.appendChild(run);
  section.appendChild(toolbar);
  const result = el('div', 'lcc-progression-results');
  section.appendChild(result);
  target.appendChild(section);

  let analysis = [];
  let chosenParents = [];
  function analyze() {
    target.dataset.lccProgression = progressionInput.value;
    const symbols = progressionInput.value.split(/[|→]/).map(symbol => symbol.trim()).filter(Boolean).slice(0, 12);
    if (symbols.length < 2) {
      result.replaceChildren(el('p', 'input-error', t.error));
      return;
    }
    const next = [];
    for (const symbol of symbols) {
      let notes = null;
      try { notes = conv._ensureNotesAndRoot(symbol); } catch { /* invalid chord syntax */ }
      if (!notes?.length) {
        result.replaceChildren(el('p', 'input-error', `${t.error} ${symbol}`));
        return;
      }
      const candidates = [...new Set(brain.lcc.analyzeLCC(notes).map(item => item.parent))];
      if (!candidates.length) {
        result.replaceChildren(el('p', 'input-error', `${t.error} ${symbol}`));
        return;
      }
      next.push({ symbol, notes, candidates });
    }
    const previous = new Map(analysis.map((item, index) => [`${index}:${item.symbol}`, chosenParents[index]]));
    analysis = next;
    chosenParents = analysis.map((item, index) => {
      const remembered = previous.get(`${index}:${item.symbol}`);
      return item.candidates.includes(remembered) ? remembered : item.candidates[0];
    });
    renderCards();
  }

  function renderCards() {
    target.dataset.lccProgressionColor = colorSelect.value;
    result.replaceChildren();
    analysis.forEach((item, index) => {
      const parent = chosenParents[index];
      const color = lccColorFamily(parent, item.notes).find(entry => entry.id === colorSelect.value);
      const adapted = lccAdaptChordToColor(parent, item.notes, colorSelect.value);
      const retained = new Set(adapted.notes.map(lccPitchClass));
      const extensions = color.notes.filter(note => !retained.has(lccPitchClass(note)));
      const card = el('article', 'lcc-progression-card');
      const top = el('div', 'lcc-progression-card-top');
      top.append(el('span', 'lcc-progression-index', String(index + 1).padStart(2, '0')),
        el('strong', 'lcc-progression-symbol', item.symbol), el('span', 'lcc-progression-arrow', '→'));
      const parentSelect = el('select', 'lcc-progression-parent');
      parentSelect.setAttribute('aria-label', `${item.symbol}: ${t.parentCandidates}`);
      item.candidates.forEach(candidate => {
        const option = el('option', '', candidate);
        option.value = candidate;
        parentSelect.appendChild(option);
      });
      parentSelect.value = parent;
      parentSelect.addEventListener('change', () => {
        chosenParents[index] = parentSelect.value;
        renderCards();
      });
      top.append(parentSelect, el('small', '', t.tonic));
      card.appendChild(top);
      card.appendChild(el('div', 'lcc-progression-mode', `${t.mode} ${color.mode?.number ?? '—'} · ${color.name}`));
      const noteRow = el('div', 'lcc-note-row');
      adapted.notes.forEach(note => noteRow.appendChild(el('span', 'lcc-note-pill', note)));
      card.appendChild(noteRow);
      card.appendChild(el('p', `lcc-progression-change ${adapted.substitutions.length ? 'changed' : 'unchanged'}`,
        adapted.substitutions.length ? `${t.changed}: ${adapted.substitutions.map(change => `${change.from} → ${change.to}`).join(', ')}` : t.unchanged));
      if (extensions.length) card.appendChild(el('p', 'lcc-card-detail', `${t.extensions}: ${extensions.join(', ')}`));
      const play = el('button', 'lcc-preview', `♪ ${t.preview}`);
      play.type = 'button';
      play.addEventListener('click', () => playChord(voicing(parent, adapted.notes, extensions, semitoneToFreq), 1.8));
      card.appendChild(play);
      result.appendChild(card);
    });
  }

  run.addEventListener('click', analyze);
  progressionInput.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); analyze(); } });
  colorSelect.addEventListener('change', () => { if (analysis.length) renderCards(); });
  analyze();
}

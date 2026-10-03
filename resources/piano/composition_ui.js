// 曲式结构（作曲）与节奏型两个面板的界面；生成逻辑见 composition.js，三语文字见 composition_i18n.js，谱面见 composition_score.js
import { FORMS, CADENCES, MODULATIONS, NOTES, RHYTHMS, buildComposition, rhythmEvents, keyLabel } from './composition.js?v=20261003-c3';
import { mountCompositionScore } from './composition_score.js';
import { COMPOSE_TEXT, formName, cadenceName, modulationName, rhythmName, rhythmDescription, translatePhrase } from './composition_i18n.js?v=20261003-c2';

const LANG = () => (['zh', 'ja', 'en'].includes(window.__lang) ? window.__lang : 'en');
const T = () => COMPOSE_TEXT[LANG()];

const el = (tag, cls = '', text = '') => {
  const n = document.createElement(tag);
  n.className = cls;
  n.textContent = text;
  return n;
};

/** 带文字标签的下拉菜单：items 是 { 值: 名字 }（名字也可以是 [名字, 说明]） */
function select(label, items, value) {
  const wrap = el('label', 'compose-field');
  const input = el('select');
  input.setAttribute('aria-label', label);
  wrap.append(el('span', '', label));
  Object.entries(items).forEach(([key, name]) => {
    const o = el('option', '', Array.isArray(name) ? name[0] : name);
    o.value = key;
    input.append(o);
  });
  input.value = value;
  wrap.append(input);
  return { wrap, input };
}

const button = (text, action, cls = '') => {
  const b = el('button', cls, text);
  b.type = 'button';
  b.onclick = action;
  return b;
};

const keyOptions = Object.fromEntries(NOTES.map((n) => [n, n]));

function saveFile(name, body, type = 'application/json') {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const a = el('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * 播放控制条：速度、播放、停止、状态
 * @param {() => { events, duration }} getData 当前要播放的事件
 * @param {(index: number) => void} paint 播放到第几小节 / 第几格时高亮（-1 = 清除）
 * @returns {Function} stop；stop.playData(data) 播放指定的数据（比如只放一段）
 */
function transport(host, audio, getData, paint = () => {}) {
  const row = el('div', 'compose-transport');
  const label = el('label', '', T().tempo);
  const tempo = el('input');
  tempo.type = 'number';
  tempo.min = '40';
  tempo.max = '240';
  tempo.value = '96';
  label.append(tempo);
  const status = el('span', 'compose-play-status', T().ready);
  status.setAttribute('role', 'status');
  let finish = null;
  const stop = () => {
    audio.stop();
    clearTimeout(finish);
    paint(-1);
    status.textContent = T().stopped;
  };
  const play = (data = getData()) => {
    stop();
    const bpm = Math.max(40, Math.min(240, Number(tempo.value) || 96));
    tempo.value = bpm;
    if (!data.events.length) {
      status.textContent = T().allRests;
      return;
    }
    audio.play(data.events, bpm, data.duration, (event) => paint(event.bar ?? event.step));
    status.textContent = T().playing;
    finish = setTimeout(() => {
      status.textContent = T().done;
      paint(-1);
    }, (data.duration * 60000) / bpm + 150);
  };
  row.append(label, button(T().play, () => play(), 'compose-primary'), button(T().stop, stop), status);
  host.append(row);
  host.addEventListener('toolbox-stop', stop);
  tempo.onchange = stop;
  stop.playData = play;
  return stop;
}

export function mountComposition(host, audio) {
  const cfg = {
    form: 'ternary', key: 'C', mode: 'major', meter: '4/4', bars: 8, bass: 'alternating', cadence: 'k64', modulation: 'pivot',
    phrase: 'period', sequence: false, intro: false, coda: false, harmonicRhythm: 1, sections: {},
  };
  const toolbar = el('div', 'compose-controls');
  host.append(toolbar);
  const t = T();
  const lang = LANG();
  const formItems = Object.fromEntries(Object.entries(FORMS).map(([id, v]) => [id, formName(id, v[0], lang)]));
  // 'custom'（导入的进行）不出现在全局的终止下拉菜单里，只给导入的段落用
  const cadenceItems = Object.fromEntries(Object.entries(CADENCES).filter(([id]) => id !== 'custom').map(([id, v]) => [id, cadenceName(id, v, lang)[0] ?? v[0]]));
  const modulationItems = Object.fromEntries(Object.entries(MODULATIONS).map(([id, v]) => [id, modulationName(id, v, lang)]));
  const modeItems = { major: t.major, minor: t.minor };
  const choices = [
    ['form', t.form, formItems],
    ['key', t.key, keyOptions],
    ['mode', t.mode, modeItems],
    ['meter', t.meter, { '4/4': '4/4', '3/4': '3/4' }],
    ['bars', t.bars, { 8: t.barsN(8), 16: t.barsN(16) }],
    ['bass', t.bass, { parallel: t.bassParallel, alternating: t.bassAlternating }],
    ['modulation', t.modulation, modulationItems],
    ['cadence', t.cadence, cadenceItems],
    ['phrase', t.phrase, { period: t.period, sentence: t.sentence }],
    ['harmonicRhythm', t.harmonicRhythm, { 1: t.hr1, 2: t.hr2 }],
  ];
  let stop = () => {};
  let model;
  let scoreCleanups = [];
  choices.forEach(([key, label, items]) => {
    const field = select(label, items, cfg[key]);
    toolbar.append(field.wrap);
    field.input.onchange = () => {
      cfg[key] = field.input.value;
      // 改了全局的曲式、调、调式、调性处理或终止，各段的单独设置作废
      if (['form', 'key', 'mode', 'modulation', 'cadence'].includes(key)) cfg.sections = {};
      render();
    };
  });
  const toggles = el('div', 'compose-toggles');
  [['sequence', t.sequence], ['intro', t.intro], ['coda', t.coda]].forEach(([key, text]) => {
    const label = el('label');
    const input = el('input');
    input.type = 'checkbox';
    label.append(input, document.createTextNode(text));
    toggles.append(label);
    input.onchange = () => {
      cfg[key] = input.checked;
      cfg.sections = {};
      render();
    };
  });
  toolbar.append(toggles);

  const result = el('div', 'compose-result');
  const tracks = { melody: true, harmony: true, bass: true };
  stop = transport(
    host,
    audio,
    () => ({ ...model, events: model.events.filter((e) => tracks[e.track]) }),
    (bar) => {
      result.querySelectorAll('[data-bar]').forEach((n) => n.classList.toggle('is-playing', Number(n.dataset.bar) === bar));
    },
  );
  const trackControls = el('div', 'compose-toggles compose-tracks');
  [['melody', t.trackMelody], ['harmony', t.trackHarmony], ['bass', t.trackBass]].forEach(([key, text]) => {
    const label = el('label');
    const check = el('input');
    check.type = 'checkbox';
    check.checked = true;
    label.append(check, document.createTextNode(text));
    trackControls.append(label);
    check.onchange = () => {
      stop();
      tracks[key] = check.checked;
    };
  });
  host.append(trackControls);
  host.append(result);

  const exportRow = el('div', 'compose-export');
  exportRow.append(button(t.exportJson, () => saveFile('form-study.json', JSON.stringify(model, null, 2))));
  host.append(exportRow);

  const notes = el('details', 'compose-guide');
  notes.append(el('summary', '', t.guide));
  // 分析提示的三语文字见 composition_i18n.js（COMPOSE_TEXT.*.terms）
  t.terms.forEach(([title, body]) => {
    const p = el('p');
    p.append(el('strong', '', `${title}  `), document.createTextNode(body));
    notes.append(p);
  });
  const sources = el('p');
  sources.append(document.createTextNode(t.sourcesLabel));
  // ref:omt-modulation ref:musictheory-net-cadences
  [['Open Music Theory', 'https://openmusictheory.github.io/Modulation.html'], [t.cadenceLink, 'https://www.musictheory.net/lessons/55']].forEach(([name, url]) => {
    const a = el('a', '', name);
    a.href = url;
    a.target = '_blank';
    a.rel = 'noreferrer';
    sources.append(a, document.createTextNode('  '));
  });
  notes.append(sources);
  host.append(notes);

  function render() {
    stop();
    scoreCleanups.forEach((fn) => fn());
    scoreCleanups = [];
    model = buildComposition(cfg);
    result.replaceChildren();

    const heading = el('div', 'compose-summary');
    heading.append(
      el('strong', '', model.sections.map((s) => s.label).join(' → ')),
      el('span', '', t.summary(model.bars.length, cfg.meter, keyLabel(cfg.key, cfg.mode), cfg.mode === 'major' ? t.major : t.minor)),
    );
    result.append(heading);
    result.append(el('p', 'compose-score-help', t.scoreHelp));
    model.warnings.forEach((w) => result.append(el('p', 'compose-warning', translatePhrase(w, lang))));
    if (cfg.custom) {
      const banner = el('div', 'compose-import');
      banner.append(
        el('span', '', t.imported(cfg.custom.title || '', cfg.custom.chords.map((c) => c.symbol || c.roman).join(' '))),
        button(t.clearImport, () => {
          delete cfg.custom;
          cfg.sections = {};
          render();
        }),
      );
      result.append(banner);
    }

    /** 只播放第 start 小节起的 length 个小节（从 0 数） */
    const playRange = (start, length) => stop.playData({
      duration: length * model.beats,
      events: model.events
        .filter((e) => e.bar >= start && e.bar < start + length && tracks[e.track])
        .map((e) => ({ ...e, beat: e.beat - start * model.beats })),
    });

    for (const section of model.sections) {
      const card = el('section', 'compose-section');
      card.dataset.section = section.id;
      const title = el('div', 'compose-section-title');
      const role = section.contrast ? t.contrast : section.varied ? t.varied : t.main;
      title.append(
        el('strong', 'compose-letter', section.label),
        el('span', '', t.sectionRange(section.start, section.start + section.length - 1, keyLabel(section.key, section.mode), section.mode === 'major' ? t.major : t.minor, role)),
        button(t.playSection, () => playRange(section.start - 1, section.length)),
      );
      card.append(title);

      // 每段单独的调、调式、终止
      const settings = el('details', 'compose-section-settings');
      settings.append(el('summary', '', t.adjust));
      const controls = el('div', 'compose-section-controls');
      const sectionCadenceItems = section.cadence === 'custom' ? { custom: cadenceName('custom', CADENCES.custom, lang)[0], ...cadenceItems } : cadenceItems;
      for (const [key, label, items] of [['key', t.sectionKey, keyOptions], ['mode', t.sectionMode, modeItems], ['cadence', t.sectionCadence, sectionCadenceItems]]) {
        const field = select(label, items, section[key]);
        field.input.setAttribute('aria-label', t.sectionAria(section.label, section.id + 1, label));
        controls.append(field.wrap);
        field.input.onchange = () => {
          cfg.sections[section.id] = { ...cfg.sections[section.id], [key]: field.input.value };
          render();
        };
      }
      settings.append(controls);
      card.append(settings, el('p', 'compose-section-note', `${translatePhrase(section.transition, lang)} / ${cadenceName(section.cadence, CADENCES[section.cadence], lang)[1]}`));

      const score = el('div', 'compose-score-host');
      card.append(score);
      result.append(card);
      scoreCleanups.push(mountCompositionScore(score, model, section, (index) => playRange(index, 1)));
      const annotations = model.bars
        .filter((b) => b.section === section.id)
        .flatMap((b) => b.chords.filter((c) => c.tag).map((c) => `${b.number} ${translatePhrase(c.tag, lang)}`));
      card.append(el('p', 'compose-section-note', [...new Set(annotations)].join(' / ')));
    }
  }

  // 从套路和弦进行速查送来的进行（localStorage jc-form-import → #form?q=@import）
  const applyImport = () => {
    let data = null;
    try {
      data = JSON.parse(globalThis.localStorage?.getItem('jc-form-import') || 'null');
    } catch (e) {
      data = null;
    }
    if (!data?.chords?.length) return;
    cfg.custom = data;
    cfg.key = NOTES.includes(data.key) ? data.key : 'C';
    cfg.mode = data.mode === 'minor' ? 'minor' : 'major';
    cfg.meter = data.meter === '3/4' ? '3/4' : '4/4';
    cfg.sections = {};
    // 让顶部的下拉菜单跟着变
    toolbar.querySelectorAll('select').forEach((sel) => {
      const k = choices.find(([, label]) => label === sel.getAttribute('aria-label'))?.[0];
      if (k && cfg[k] !== undefined) sel.value = String(cfg[k]);
    });
    render();
  };
  host.addEventListener('toolbox-query', (e) => {
    if (String(e.detail) === '@import') applyImport();
  });
  render();
  return stop;
}

export function mountRhythm(host, audio) {
  const t = T();
  const lang = LANG();
  let current = { ...RHYTHMS[0], cells: [...RHYTHMS[0].cells] };
  let swing = 0;
  let loops = 4;
  const controls = el('div', 'compose-controls');
  const meter = select(t.meterFilter, { all: t.allMeters, ...Object.fromEntries([...new Set(RHYTHMS.map((p) => p.meter))].map((m) => [m, m])) }, 'all');
  const groove = select(t.swing, { 0: t.straight, 0.33: t.swing21, 0.5: t.swing31 }, '0');
  const repeat = select(t.loops, { 1: '1', 2: '2', 4: '4', 8: '8', 16: '16' }, 4);
  controls.append(meter.wrap, groove.wrap, repeat.wrap);
  host.append(controls);
  const editor = el('section', 'rhythm-editor');
  host.append(editor);

  let stop = () => {};
  stop = transport(
    host,
    audio,
    () => {
      const one = rhythmEvents(current.cells, current.subdivision, swing);
      const duration = (current.cells.length * 4) / current.subdivision;
      return { duration: duration * loops, events: Array.from({ length: loops }, (_, i) => one.map((e) => ({ ...e, beat: e.beat + i * duration }))).flat() };
    },
    (step) => editor.querySelectorAll('[data-step]').forEach((n) => n.classList.toggle('is-playing', Number(n.dataset.step) === step)),
  );
  groove.input.onchange = () => {
    stop();
    swing = Number(groove.input.value);
  };
  repeat.input.onchange = () => {
    stop();
    loops = Number(repeat.input.value);
  };

  // 自己写一个节奏型：选拍号和格子大小，从全休止开始点
  const custom = el('div', 'rhythm-custom');
  const customMeter = select(t.sandboxMeter, { '2/4': '2/4', '3/4': '3/4', '4/4': '4/4', '5/4': '5/4', '6/4': '6/4', '3/8': '3/8', '5/8': '5/8', '6/8': '6/8', '7/8': '7/8', '9/8': '9/8', '11/8': '11/8', '12/8': '12/8' }, '7/8');
  const subdivision = select(t.cell, { 8: '1/8', 16: '1/16' }, 8);
  custom.append(
    customMeter.wrap,
    subdivision.wrap,
    button(t.newPattern, () => {
      stop();
      const [n, d] = customMeter.input.value.split('/').map(Number);
      const sub = Number(subdivision.input.value);
      current = { id: 'custom', name: t.customName, meter: customMeter.input.value, subdivision: sub, groups: [(n * sub) / d], cells: Array((n * sub) / d).fill('0'), description: t.customHint };
      renderEditor();
      renderPresets();
    }),
    button(t.clearCells, () => {
      stop();
      current.cells.fill('0');
      renderEditor();
    }),
    button(t.exportRhythm, () => saveFile('rhythm-pattern.json', JSON.stringify({ ...current, swing, loops }, null, 2))),
  );
  host.append(custom);
  const grid = el('div', 'rhythm-library');
  host.append(grid);
  meter.input.onchange = renderPresets;

  function renderEditor() {
    editor.replaceChildren();
    const heading = el('div', 'rhythm-heading');
    heading.append(el('div', '', `${current.meter} ${current.id === 'custom' ? current.name : rhythmName(current, lang)}`), el('span', '', t.perCell(current.subdivision)));
    editor.append(heading);
    editor.append(el('p', '', (current.id === 'custom' ? current.description : rhythmDescription(current, lang)) || t.groupHint));
    const steps = el('div', 'rhythm-grid');
    steps.style.setProperty('--steps', current.cells.length);
    // 每组的第一格加分组线
    const boundaries = new Set([0]);
    let sum = 0;
    current.groups.forEach((n) => {
      sum += n;
      boundaries.add(sum);
    });
    current.cells.forEach((value, i) => {
      // 点一下循环：休止 0 → 起音 x → 重音 X → 延长 -
      const b = button('', () => {
        stop();
        const symbols = ['0', 'x', 'X', '-'];
        current.cells[i] = symbols[(symbols.indexOf(current.cells[i]) + 1) % 4];
        renderEditor();
        editor.querySelector(`[data-step="${i}"]`)?.focus();
      });
      b.className = `rhythm-cell ${boundaries.has(i) ? 'group-start' : ''}`;
      b.dataset.step = i;
      b.dataset.value = value;
      b.setAttribute('aria-label', t.cellAria(i + 1, value === 'X' ? t.accent : value === 'x' ? t.onset : value === '-' ? t.tie : t.rest));
      // 格子上方的数拍：拍头写拍号，其余写 & 或 e & a
      const [numerator, denominator] = current.meter.split('/').map(Number);
      const beat = (i * denominator) / current.subdivision;
      const count = Number.isInteger(beat) ? String((beat % numerator) + 1) : current.subdivision / denominator === 2 ? '&' : ['e', '&', 'a'][(i % 4) - 1];
      b.append(el('small', '', count), el('strong', '', value));
      steps.append(b);
    });
    editor.append(steps);
    // 延长号前面没有音（第一格或跟在休止后面）
    const orphan = current.cells.some((c, i) => c === '-' && (i === 0 || current.cells[i - 1] === '0'));
    editor.append(el('p', 'rhythm-legend', t.legend));
    if (orphan) editor.append(el('p', 'compose-warning', t.orphan));
  }

  function renderPresets() {
    grid.replaceChildren();
    RHYTHMS.filter((p) => meter.input.value === 'all' || p.meter === meter.input.value).forEach((p) => {
      const card = button('', () => {
        stop();
        current = { ...p, cells: [...p.cells], groups: [...p.groups] };
        renderEditor();
        renderPresets();
      }, 'rhythm-preset');
      card.setAttribute('aria-pressed', String(current.id === p.id));
      card.append(el('small', '', `${p.meter} / 1/${p.subdivision}`), el('strong', '', rhythmName(p, lang)), el('code', '', p.cells.join(' ')));
      grid.append(card);
    });
  }

  renderEditor();
  renderPresets();
  return stop;
}

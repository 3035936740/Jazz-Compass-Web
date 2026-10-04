// 类别对位界面
// 规则见 counterpoint.js；定旋律与 Fux 解答来自 ref:gotham-species（数据）与 ref:omt2e-gradus（定旋律一览）
import { checkCounterpoint, checkCantus, parseCounterpointText, RULES } from './counterpoint.js';
import { FUX_TWO_VOICE } from './fux_species_data.js';
import { MESSAGES } from './counterpoint_messages.js?v=20261004-w1';
import { parsePitch } from './pitch_spelling.js';
import { renderStaff } from './staff_svg.js?v=20261002-fix';
import { el, button, option, field, language, midiToFrequency, sourcesFooter, tabs, relatedLinks, midiExportButton } from './module_kit.js';
import { REFERENCES } from './references.js';

const SOURCES = ['omt-intervals', 'omt-cantus', 'omt-species1', 'omt-species2', 'omt-species3', 'omt-species4', 'omt2e-intro', 'omt2e-fifth', 'omt2e-gradus', 'gotham-species'];

const TEXT = {
  zh: {
    kicker: 'Fux 体系 · 二声部', title: '类别对位',
    intro: '在定旋律上方或下方写一条对位声部，按第一至第五类的规则逐音检查。规则取自 Open Music Theory 教材，部分比 Fux 原书更严格；Fux 本人的 46 个解答可作为范例载入。',
    tabs: { check: '练习检查', fux: 'Fux 范例', rules: '规则表' },
    species: '类别', speciesNames: ['第一类 1:1', '第二类 2:1', '第三类 4:1', '第四类 切分挂留', '第五类 华彩'],
    cantus: '定旋律', custom: '自定义', position: '对位位置', above: '定旋律上方', below: '定旋律下方',
    cantusInput: '定旋律（空格分隔，带八度，如 D4 F4 E4）', cpInput: '对位声部',
    syntax: '小节用 | 分隔，音带八度（C5、F#4、Bb3）；r 为休止，~ 前缀表示与前一音相连（挂留），第五类用 :w :h :q :e 标时值。',
    check: '检查', play: '► 播放', stop: '■ 停止', loadFux: '载入 Fux 解答', noFux: '这一组合没有 Fux 解答',
    staffCp: '对位', staffCf: '定旋律',
    ok: '没有发现问题。', errors: (e, w) => `${e} 个错误，${w} 个提醒`,
    error: '错误', warning: '提醒', bar: (n) => `第 ${n} 小节`, whole: '全曲',
    cantusIssues: '定旋律本身', fig22: '此例第 6–10 小节在数据集中出现纯四度与大七度跳进（带标注版本亦同），可能是录入时的八度问题，请以原书为准。',
    fuxHead: ['图号', '类别', '终止音', '定旋律', ''], open: '打开',
    rulesHead: ['规则', '适用', '级别', '出处'],
    parseError: '无法解析：',
  },
  ja: {
    kicker: 'フックスの体系・二声', title: '類別対位法',
    intro: '定旋律の上または下に対旋律を書き、第一類から第五類の規則で一音ずつ検査します。規則は Open Music Theory に基づき、一部はフックスの原典より厳格です。フックス自身の 46 の解答を例として読み込めます。',
    tabs: { check: '課題の検査', fux: 'フックスの例', rules: '規則一覧' },
    species: '類', speciesNames: ['第一類 1:1', '第二類 2:1', '第三類 4:1', '第四類 掛留', '第五類 華麗'],
    cantus: '定旋律', custom: '自作', position: '対旋律の位置', above: '定旋律の上', below: '定旋律の下',
    cantusInput: '定旋律（空白区切り、オクターブ付き：D4 F4 E4）', cpInput: '対旋律',
    syntax: '小節は | で区切り、音はオクターブ付き（C5・F#4・Bb3）。r は休符、~ は前の音とのタイ（掛留）、第五類は :w :h :q :e で音価を指定。',
    check: '検査', play: '► 再生', stop: '■ 停止', loadFux: 'フックスの解答を読み込む', noFux: 'この組み合わせにはフックスの解答がありません',
    staffCp: '対旋律', staffCf: '定旋律',
    ok: '問題は見つかりませんでした。', errors: (e, w) => `誤り ${e} 件、注意 ${w} 件`,
    error: '誤り', warning: '注意', bar: (n) => `第 ${n} 小節`, whole: '全体',
    cantusIssues: '定旋律そのもの', fig22: 'この例の第 6–10 小節はデータセット上で完全四度と長七度の跳躍を含みます（注釈版も同じ）。入力時のオクターブの誤りの可能性があるため、原典を確認してください。',
    fuxHead: ['図番号', '類', '終止音', '定旋律', ''], open: '開く',
    rulesHead: ['規則', '適用', '程度', '出典'],
    parseError: '解析できません：',
  },
  en: {
    kicker: 'After Fux · two voices', title: 'Species counterpoint',
    intro: 'Write a line above or below a cantus firmus and check it note by note against the rules of the first to fifth species. Rules follow the Open Music Theory textbook, which is stricter than Fux in places; Fux’s own 46 solutions can be loaded as models.',
    tabs: { check: 'Check an exercise', fux: 'Fux’s models', rules: 'Rules' },
    species: 'Species', speciesNames: ['First 1:1', 'Second 2:1', 'Third 4:1', 'Fourth (syncopation)', 'Fifth (florid)'],
    cantus: 'Cantus firmus', custom: 'Custom', position: 'Counterpoint', above: 'Above the cantus', below: 'Below the cantus',
    cantusInput: 'Cantus firmus (space separated, with octaves, e.g. D4 F4 E4)', cpInput: 'Counterpoint',
    syntax: 'Separate bars with |, write pitches with octaves (C5, F#4, Bb3); r is a rest, a ~ prefix ties to the previous note (suspension), and fifth species takes :w :h :q :e durations.',
    check: 'Check', play: '► Play', stop: '■ Stop', loadFux: 'Load Fux’s solution', noFux: 'Fux has no solution for this combination',
    staffCp: 'Counterpoint', staffCf: 'Cantus',
    ok: 'No problems found.', errors: (e, w) => `${e} error(s), ${w} warning(s)`,
    error: 'Error', warning: 'Warning', bar: (n) => `Bar ${n}`, whole: 'Whole line',
    cantusIssues: 'The cantus firmus itself', fig22: 'Bars 6–10 of this figure contain a perfect fourth and a leap of a major seventh in the dataset (the annotated version agrees). This may be an octave error in transcription; check the printed edition.',
    fuxHead: ['Figure', 'Species', 'Final', 'Cantus', ''], open: 'Open',
    rulesHead: ['Rule', 'Applies to', 'Level', 'Source'],
    parseError: 'Could not parse: ',
  },
};


const VALUE_SUFFIX = { 4: 'w', 2: 'h', 1: 'q', 0.5: 'e' };
const DEFAULT_VALUE = { 1: 4, 2: 2, 3: 1, 4: 2, 5: 1 };

function barsToText(bars, species) {
  return bars.map((bar) => bar.map((n) => {
    const name = n.p || 'r';
    const implicit = bar.length === 1 ? 4 : DEFAULT_VALUE[species];
    const suffix = species === 5 || n.d !== implicit ? `:${VALUE_SUFFIX[n.d] ?? 'q'}` : '';
    return `${n.tieIn ? '~' : ''}${name}${suffix}`;
  }).join(' ')).join(' | ');
}

function format(template, params) {
  return template.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? '');
}

export function mountCounterpoint(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  const messages = MESSAGES[lang];
  const presets = [];
  for (const ex of FUX_TWO_VOICE) {
    const line = ex.bars.map((b) => b.cf).join(' ');
    if (!presets.some((p) => p.line === line)) presets.push({ id: `fux-${presets.length}`, final: ex.final, line, label: `${ex.final}（Fux）` });
  }
  const state = { species: 1, preset: presets[0].id, customCantus: presets[0].line, position: 'above', text: '', figure: null };
  let timers = [];
  const clearPlaying = () => target.querySelectorAll('.staff-note.is-playing').forEach((node) => node.classList.remove('is-playing'));
  const stop = () => { timers.forEach(clearTimeout); timers = []; clearPlaying(); };
  target.addEventListener('toolbox-stop', stop);

  const cantusLine = () => (state.preset === 'custom' ? state.customCantus : presets.find((p) => p.id === state.preset).line).trim().split(/\s+/).filter(Boolean);
  const fuxFor = () => FUX_TWO_VOICE.find((ex) => ex.species === state.species && ex.bars.map((b) => b.cf).join(' ') === cantusLine().join(' ') && (ex.cantus === 'lower') === (state.position === 'above'));
  const loadFux = () => {
    const ex = fuxFor();
    if (!ex) return false;
    state.text = barsToText(ex.bars.map((b) => b.cp), ex.species);
    state.figure = ex.figure;
    return true;
  };
  loadFux();

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));
  root.appendChild(head);
  const body = el('div', 'mk-section');
  const views = {};

  function refLink(id) {
    const reference = REFERENCES.find((r) => r.id === id);
    const link = el('a', 'mk-cite', `[${SOURCES.indexOf(id) + 1}]`);
    if (reference) { link.href = reference.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.title = reference.title; }
    return link;
  }

  function play(cantus, bars) {
    stop();
    const quarter = 0.42;
    const events = counterpointEvents(cantus, bars);
    const first = events[0]?.time ?? 0;
    const noteNode = (event) => target.querySelector(`.staff-note[data-staff="${event.staff}"][data-bar="${event.bar}"][data-index="${event.index}"]`);
    events.forEach((event, index) => {
      const start = (event.time - first) * quarter * 1000;
      timers.push(setTimeout(() => {
        playChord([midiToFrequency(event.midi)], event.d * quarter * 0.95, { interrupt: index === 0 });
        noteNode(event)?.classList.add('is-playing');
      }, start));
      timers.push(setTimeout(() => noteNode(event)?.classList.remove('is-playing'), start + event.d * quarter * 1000 - 30));
    });
  }

  /** 两条声部的发音事件（time / d 以四分音符为单位；连线的音合并时值） */
  function counterpointEvents(cantus, bars) {
    const events = [];
    // 谱面中两条声部所在的谱表序号（与 renderStaff 的 staves 顺序一致），用于播放时高亮
    const cantusStaff = state.position === 'above' ? 1 : 0;
    const cpStaff = 1 - cantusStaff;
    cantus.forEach((name, bar) => { const p = parsePitch(name); if (p) events.push({ time: bar * 4, d: 4, midi: p.midi, staff: cantusStaff, bar, index: 0 }); });
    bars.forEach((bar, barIndex) => {
      let onset = 0;
      bar.forEach((n, noteIndex) => {
        const p = n.p && parsePitch(n.p);
        if (p && !n.tieIn) {
          // 连线的音延续前一音的时值
          let d = n.d;
          let k = bar.indexOf(n) + 1;
          let b = barIndex;
          let next = bar[k];
          while (true) {
            if (!next) { b += 1; next = bars[b]?.[0]; k = 0; if (!next) break; }
            if (!next.tieIn) break;
            d += next.d; k += 1; next = bars[b][k];
          }
          events.push({ time: barIndex * 4 + onset, d, midi: p.midi, staff: cpStaff, bar: barIndex, index: noteIndex });
        }
        onset += n.d;
      });
    });
    events.sort((a, b) => a.time - b.time);
    return events;
  }

  // ---------- 练习检查 ----------
  views.check = () => {
    const wrap = el('div', 'mk-section');
    const species = el('select');
    t.speciesNames.forEach((name, i) => species.appendChild(option(String(i + 1), name)));
    species.value = String(state.species);
    const preset = el('select');
    presets.forEach((p) => preset.appendChild(option(p.id, p.label)));
    preset.appendChild(option('custom', t.custom));
    preset.value = state.preset;
    const position = el('select');
    position.append(option('above', t.above), option('below', t.below));
    position.value = state.position;
    const controls = el('div', 'mk-controls');
    controls.append(field(t.species, species), field(t.cantus, preset), field(t.position, position));
    const cantusInput = el('input');
    cantusInput.type = 'text';
    cantusInput.spellcheck = false;
    cantusInput.value = state.customCantus;
    const cantusField = field(t.cantusInput, cantusInput, 'mk-grow');
    const cantusRow = el('div', 'mk-controls');
    cantusRow.appendChild(cantusField);
    const cp = el('textarea', 'mk-code');
    cp.spellcheck = false;
    cp.value = state.text;
    const cpField = field(t.cpInput, cp, 'mk-grow');
    const cpRow = el('div', 'mk-controls');
    cpRow.appendChild(cpField);
    const syntax = el('p', 'mk-hint', t.syntax);
    const actions = el('div', 'mk-actions');
    const result = el('div', 'mk-section');
    const fuxButton = button('btn btn-secondary btn-sm', t.loadFux, () => {
      if (loadFux()) { cp.value = state.text; analyze(); }
    });
    actions.append(
      button('btn btn-primary btn-sm', t.check, () => { state.figure = null; analyze(); }),
      button('btn btn-secondary btn-sm', t.play, () => {
        // 先按当前输入重绘谱面，播放时的高亮才与谱面一致
        analyze();
        try { play(cantusLine(), parseCounterpointText(cp.value, state.species)); } catch { /* 解析错误在检查结果中显示 */ }
      }),
      button('btn btn-ghost btn-sm', t.stop, stop),
      midiExportButton(() => {
        let events;
        try { events = counterpointEvents(cantusLine(), parseCounterpointText(cp.value, state.species)); } catch { return null; }
        const cantusStaff = state.position === 'above' ? 1 : 0;
        return [['Cantus firmus', cantusStaff], ['Counterpoint', 1 - cantusStaff]].map(([name, staff]) => ({
          name, notes: events.filter((e) => e.staff === staff).map((e) => ({ beat: e.time, duration: e.d, midi: e.midi })),
        }));
      }, () => `counterpoint-species-${state.species}`, { bpm: 120, meter: [2, 2] }),
      fuxButton,
    );
    wrap.append(controls, cantusRow, cpRow, syntax, actions, result);

    const syncControls = () => {
      cantusRow.hidden = state.preset !== 'custom';
      const available = Boolean(fuxFor());
      fuxButton.disabled = !available;
      fuxButton.title = available ? '' : t.noFux;
    };

    function analyze() {
      Object.assign(state, { species: Number(species.value), preset: preset.value, position: position.value, customCantus: cantusInput.value, text: cp.value });
      syncControls();
      result.replaceChildren();
      const cantus = cantusLine();
      let analysis;
      let bars;
      try {
        bars = parseCounterpointText(cp.value, state.species);
        analysis = checkCounterpoint({ species: state.species, cantus, bars, position: state.position });
      } catch (error) {
        result.appendChild(el('p', 'mk-callout is-error', `${t.parseError}${error.message}`));
        return;
      }
      const cantusIssues = state.preset === 'custom' ? checkCantus(cantus) : [];
      const marks = new Map(analysis.annotations.map((a) => [`${a.bar}:${a.index}`, a]));
      const errorAt = new Set(analysis.issues.filter((i) => i.severity === 'error').map((i) => `${i.bar}:${i.index}`));
      const cpBars = bars.map((bar, barIndex) => bar.map((n, index) => {
        const a = marks.get(`${barIndex}:${index}`);
        return { ...n, mark: a?.interval, markClass: errorAt.has(`${barIndex}:${index}`) ? 'is-error' : a?.cls === 'dissonant' ? 'is-dissonant' : a?.cls === 'perfect' ? 'is-perfect' : '' };
      }));
      const cfBars = cantus.map((p) => [{ p, d: 4 }]);
      const staves = state.position === 'above'
        ? [{ label: t.staffCp, bars: cpBars }, { label: t.staffCf, bars: cfBars }]
        : [{ label: t.staffCf, bars: cfBars }, { label: t.staffCp, bars: cpBars }];
      const scroll = el('div', 'mk-staff-scroll');
      scroll.appendChild(renderStaff({ staves, beats: 4, meter: [2, 2], ariaLabel: t.title }));
      result.appendChild(scroll);
      if (state.figure === '22') result.appendChild(el('p', 'mk-callout', t.fig22));
      const all = [...cantusIssues.map((i) => ({ ...i, cantus: true })), ...analysis.issues];
      const errors = all.filter((i) => i.severity === 'error').length;
      const warnings = all.length - errors;
      result.appendChild(all.length ? el('p', 'mk-meta', t.errors(errors, warnings)) : el('p', 'mk-ok', t.ok));
      if (all.length) {
        const list = el('ul', 'mk-issues');
        all.forEach((issue) => {
          const item = el('li', `mk-issue is-${issue.severity}`);
          const where = issue.cantus ? `${t.cantusIssues} · ${t.bar(issue.bar + 1)}` : ['repetition', 'range', 'climax'].includes(issue.rule) && issue.bar === 0 ? t.whole : t.bar(issue.bar + 1);
          const text = el('span', '', format(messages[issue.rule] || issue.rule, issue.params || {}));
          text.appendChild(refLink(issue.ref));
          item.append(el('span', 'mk-issue-where', where), text, el('span', 'mk-issue-level', issue.severity === 'error' ? t.error : t.warning));
          list.appendChild(item);
        });
        result.appendChild(list);
      }
    }

    species.addEventListener('change', () => {
      state.species = Number(species.value);
      if (loadFux()) cp.value = state.text;
      analyze();
    });
    preset.addEventListener('change', () => {
      state.preset = preset.value;
      if (state.preset !== 'custom') { if (loadFux()) cp.value = state.text; }
      analyze();
    });
    position.addEventListener('change', () => {
      state.position = position.value;
      if (loadFux()) cp.value = state.text;
      analyze();
    });
    cantusInput.addEventListener('change', analyze);
    cp.addEventListener('keydown', (event) => { if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) analyze(); });
    syncControls();
    analyze();
    return wrap;
  };

  // ---------- Fux 范例 ----------
  views.fux = () => {
    const wrap = el('div', 'mk-section');
    const tableWrap = el('div', 'mk-table-wrap');
    const table = el('table', 'mk-table');
    const headRow = el('tr');
    t.fuxHead.forEach((text) => headRow.appendChild(el('th', '', text)));
    const thead = el('thead');
    thead.appendChild(headRow);
    const tbody = el('tbody');
    FUX_TWO_VOICE.forEach((ex) => {
      const row = el('tr');
      const open = button('btn btn-ghost btn-sm', t.open, () => {
        const line = ex.bars.map((b) => b.cf).join(' ');
        const presetMatch = presets.find((p) => p.line === line);
        Object.assign(state, { species: ex.species, preset: presetMatch ? presetMatch.id : 'custom', customCantus: line, position: ex.cantus === 'lower' ? 'above' : 'below', text: barsToText(ex.bars.map((b) => b.cp), ex.species), figure: ex.figure });
        navigation.select('check');
      });
      const action = el('td');
      action.appendChild(open);
      row.append(
        el('td', 'mk-strong', `Fig. ${ex.figure}`),
        el('td', '', t.speciesNames[ex.species - 1]),
        el('td', '', ex.final),
        el('td', '', `${t.staffCf} ${ex.cantus === 'lower' ? '↓' : '↑'}`),
        action,
      );
      tbody.appendChild(row);
    });
    table.append(thead, tbody);
    tableWrap.appendChild(table);
    const note = el('p', 'mk-hint', `Fux, Gradus ad Parnassum (1725) · Norton/Mann (1965)`);
    note.appendChild(refLink('gotham-species'));
    wrap.append(note, tableWrap);
    return wrap;
  };

  // ---------- 规则表 ----------
  views.rules = () => {
    const wrap = el('div', 'mk-section');
    const tableWrap = el('div', 'mk-table-wrap');
    const table = el('table', 'mk-table');
    const headRow = el('tr');
    t.rulesHead.forEach((text) => headRow.appendChild(el('th', '', text)));
    const thead = el('thead');
    thead.appendChild(headRow);
    const tbody = el('tbody');
    const scope = { 'omt-cantus': t.cantus, 'omt-intervals': '1–5', 'omt-species1': '1', 'omt-species2': '2', 'omt-species3': '3', 'omt-species4': '4', 'omt2e-intro': '1–5', 'omt2e-fifth': '5' };
    Object.entries(RULES).forEach(([code, rule]) => {
      const row = el('tr');
      const source = el('td');
      source.appendChild(refLink(rule.ref));
      row.append(el('td', '', format(messages[code] || code, { interval: '…', count: '…', span: '…', type: '…', value: '…' })), el('td', '', scope[rule.ref] || ''), el('td', '', rule.severity === 'error' ? t.error : t.warning), source);
      tbody.appendChild(row);
    });
    table.append(thead, tbody);
    tableWrap.appendChild(table);
    wrap.appendChild(tableWrap);
    return wrap;
  };

  const navigation = tabs(root, Object.entries(t.tabs).map(([id, label]) => ({ id, label })), (id) => {
    stop();
    body.replaceChildren(views[id]());
  });
  root.append(body, relatedLinks(['nonchord', 'harmonize', 'classical']), sourcesFooter(SOURCES));
  target.appendChild(root);
  navigation.select('check');
}

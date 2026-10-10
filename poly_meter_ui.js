// 节奏面板里的"复节奏与节拍调制"：两条轨（2:3、3:4 …）独立静音与重音、共同网格；节拍调制前后速度对照
// 逻辑与依据见 poly_meter.js（ref:wiki-polyrhythm ref:omt2e-20c-rhythm ref:wiki-metric-modulation）
import { polyrhythm, alignment, metricModulation, modulationEvents, PRESETS } from './poly_meter.js';
import { el, button, option, field, language } from './module_kit.js';

const TEXT = {
  zh: {
    title: '复节奏与节拍调制', intro: '两条节奏同时进行：同一个循环里一条平均分成 a 份 另一条分成 b 份；下面的网格是两者的最小公倍数 看清楚哪里一起响 哪里错开',
    ratio: '比例', cycle: '循环长度（拍）', tempo: '速度', repeats: '重复', play: '► 听', stop: '■ 停止', mute: '静音', accent: '点格子切换重音',
    trackA: (n) => `上轨 ${n} 下`, trackB: (n) => `下轨 ${n} 下`, grid: (n) => `共同网格 ${n} 格`, count: '数法', together: '一起', alone: '错开',
    mmTitle: '节拍调制', mmIntro: '旧速度里的某个时值 = 新速度里的某个时值；新速度 / 旧速度 = 新小节里的枢纽个数 / 旧小节里的枢纽个数',
    preset: '做法', presets: { keepSub: '细分不变（4/4 八分 = 6/8 八分）', keepBeat: '拍不变（四分 = 附点四分）', triplet: '三连音八分 = 八分', wiki: '三连音二分 = 二分' },
    oldTempo: '旧速度（每分钟拍数）', result: (o, n, ob, nb) => `旧 ${ob} = ${o} → 新 ${nb} = ${Math.round(n * 100) / 100}`, listen: '► 前后对照', pivot: '低音一直标出枢纽时值 它在前后长度一样',
    beatNames: { q: '四分音符', 'q.': '附点四分', h: '二分音符', e: '八分音符' },
  },
  en: {
    title: 'Polyrhythm & metric modulation', intro: 'Two rhythms at once: one cycle divided into a equal pulses on one track and b on the other; the grid below is their least common multiple, showing where they coincide and where they don’t.',
    ratio: 'Ratio', cycle: 'Cycle (beats)', tempo: 'Tempo', repeats: 'Repeats', play: '► Play', stop: '■ Stop', mute: 'mute', accent: 'click a cell to toggle its accent',
    trackA: (n) => `upper track: ${n}`, trackB: (n) => `lower track: ${n}`, grid: (n) => `common grid: ${n} cells`, count: 'count', together: 'together', alone: 'apart',
    mmTitle: 'Metric modulation', mmIntro: 'A duration in the old tempo equals one in the new; new tempo / old tempo = pivot values per new bar / pivot values per old bar.',
    preset: 'Technique', presets: { keepSub: 'keep the subdivision (4/4 eighth = 6/8 eighth)', keepBeat: 'keep the beat (quarter = dotted quarter)', triplet: 'triplet eighth = eighth', wiki: 'triplet half = half' },
    oldTempo: 'Old tempo (bpm)', result: (o, n, ob, nb) => `old ${ob} = ${o} → new ${nb} = ${Math.round(n * 100) / 100}`, listen: '► Before / after', pivot: 'the low note marks the pivot duration, the same length before and after',
    beatNames: { q: 'quarter', 'q.': 'dotted quarter', h: 'half', e: 'eighth' },
  },
};
TEXT.ja = {
    title: 'ポリリズムとメトリック・モジュレーション', intro: '2 つのリズムが同時に進む：同じ周期の中で一方を a 等分、もう一方を b 等分する。下のグリッドは両者の最小公倍数で、どこで重なり、どこでずれるかが分かる',
    ratio: '比', cycle: '周期の長さ（拍）', tempo: 'テンポ', repeats: '繰り返し', play: '► 聴く', stop: '■ 停止', mute: 'ミュート', accent: 'マスをクリックしてアクセントを切り替え',
    trackA: (n) => `上の段 ${n} 打`, trackB: (n) => `下の段 ${n} 打`, grid: (n) => `共通グリッド ${n} マス`, count: '数え方', together: '一緒', alone: 'ずれる',
    mmTitle: 'メトリック・モジュレーション', mmIntro: '古いテンポのある音価 = 新しいテンポのある音価。新テンポ ÷ 旧テンポ = 新しい小節の枢軸音価の数 ÷ 古い小節の枢軸音価の数',
    preset: 'やり方', presets: { keepSub: '細分を保つ（4/4 の 8 分 = 6/8 の 8 分）', keepBeat: '拍を保つ（4 分 = 付点 4 分）', triplet: '3 連符の 8 分 = 8 分', wiki: '3 連符の 2 分 = 2 分' },
    oldTempo: '旧テンポ（毎分の拍数）', result: (o, n, ob, nb) => `旧 ${ob} = ${o} → 新 ${nb} = ${Math.round(n * 100) / 100}`, listen: '► 前後を比べる', pivot: '低い音がずっと枢軸の音価を示し、前後で長さは同じ',
    beatNames: { q: '4 分音符', 'q.': '付点 4 分音符', h: '2 分音符', e: '8 分音符' },
  };

export function mountPolyMeter(host, audio) {
  const lang = language();
  const t = TEXT[lang] || TEXT.en;
  const section = el('section', 'mk pm');
  const head = el('div', 'mk-head');
  head.append(el('h3', '', t.title), el('p', '', t.intro));
  const ratio = el('select');
  [[3, 2], [2, 3], [3, 4], [4, 3], [5, 4], [5, 3]].forEach(([a, b]) => ratio.appendChild(option(`${a}:${b}`, `${a} : ${b}`)));
  const cycle = el('select'); [2, 3, 4, 6].forEach((n) => cycle.appendChild(option(String(n), String(n)))); cycle.value = '4';
  const tempo = el('input'); tempo.type = 'number'; tempo.min = '30'; tempo.max = '160'; tempo.value = '60';
  const repeats = el('select'); [2, 4, 8].forEach((n) => repeats.appendChild(option(String(n), String(n)))); repeats.value = '4';
  const controls = el('div', 'mk-controls');
  controls.append(field(t.ratio, ratio), field(t.cycle, cycle), field(t.tempo, tempo), field(t.repeats, repeats));
  const state = { muted: [false, false], accents: [new Set([0]), new Set([0])], polyPlayed: false, mmPlayed: false };
  const board = el('div', 'pm-board');
  const actions = el('div', 'mk-actions');
  actions.append(button('btn btn-primary btn-sm', t.play, () => playPoly()), button('btn btn-secondary btn-sm', t.stop, () => audio.stop()), el('span', 'mk-meta', t.accent));

  // 节拍调制
  const mm = el('div', 'pm-mm');
  const presetSel = el('select'); PRESETS.forEach((p) => presetSel.appendChild(option(p.id, t.presets[p.id])));
  const oldTempo = el('input'); oldTempo.type = 'number'; oldTempo.min = '40'; oldTempo.max = '200'; oldTempo.value = '96';
  const mmControls = el('div', 'mk-controls');
  mmControls.append(field(t.preset, presetSel), field(t.oldTempo, oldTempo), button('btn btn-primary btn-sm', t.listen, () => playMM()), button('btn btn-secondary btn-sm', t.stop, () => audio.stop()));
  const mmOut = el('p', 'pm-result');
  const mmTimeline = el('div', 'pm-timeline');
  mm.append(el('h4', '', t.mmTitle), el('p', 'mk-hint', t.mmIntro), mmControls, mmOut, mmTimeline, el('p', 'mk-meta', t.pivot));
  section.append(head, controls, board, actions, mm);
  host.appendChild(section);

  const ab = () => ratio.value.split(':').map(Number);
  function paintBoard() {
    const [a, b] = ab();
    const cells = alignment(a, b);
    board.replaceChildren();
    board.appendChild(el('p', 'mk-meta', t.grid(cells.length)));
    [[a, 'a', 0], [b, 'b', 1]].forEach(([n, key, track]) => {
      const row = el('div', 'pm-row');
      const mute = el('label', 'pl-check'); const box = el('input'); box.type = 'checkbox'; box.checked = state.muted[track];
      box.addEventListener('change', () => { state.muted[track] = box.checked; });
      mute.append(box, document.createTextNode(` ${t.mute}`));
      row.append(el('span', 'pm-label', track ? t.trackB(n) : t.trackA(n)), mute);
      const grid = el('div', 'pm-cells'); grid.style.setProperty('--n', String(cells.length));
      let pulse = 0;
      cells.forEach((c) => {
        if (c[key]) {
          const k = pulse++;
          const cell = button(`pm-cell is-on${state.accents[track].has(k) ? ' is-accent' : ''}`, String(k + 1), () => { if (state.accents[track].has(k)) state.accents[track].delete(k); else state.accents[track].add(k); paintBoard(); });
          cell.dataset.step = String(c.i);
          grid.appendChild(cell);
        } else grid.appendChild(el('span', 'pm-cell', ''));
      });
      row.appendChild(grid);
      board.appendChild(row);
    });
    const count = el('div', 'pm-cells pm-count'); count.style.setProperty('--n', String(cells.length));
    cells.forEach((c) => count.appendChild(el('span', `pm-cell${c.a && c.b ? ' is-both' : ''}`, c.a && c.b ? '●' : c.a || c.b ? '·' : '')));
    const row = el('div', 'pm-row'); row.append(el('span', 'pm-label', t.count), el('span', ''), count);
    board.appendChild(row);
  }
  function playPoly() {
    state.polyPlayed = true;
    const [a, b] = ab();
    const cyc = Number(cycle.value);
    const r = polyrhythm(a, b, { cycle: cyc, accents: state.accents.map((s) => [...s]), muted: state.muted, repeats: Number(repeats.value) });
    const grid = r.grid;
    audio.play(r.events, Number(tempo.value) || 60, r.duration, (e) => {
      board.querySelectorAll('.pm-cell.is-playing').forEach((n) => n.classList.remove('is-playing'));
      board.querySelectorAll(`.pm-cell[data-step="${e.step % grid}"]`).forEach((n) => n.classList.add('is-playing'));
    });
  }
  function currentMM() {
    const p = PRESETS.find((x) => x.id === presetSel.value);
    return { p, res: modulationEvents({ oldTempo: Number(oldTempo.value) || 96, ...p }) };
  }
  function paintMM() {
    const { p, res } = currentMM();
    const r = metricModulation({ oldTempo: Number(oldTempo.value) || 96, ...p });
    mmOut.textContent = t.result(Number(oldTempo.value) || 96, r.newTempo, t.beatNames[p.oldBeat] || p.oldBeat, t.beatNames[p.newBeat] || p.newBeat);
    mmTimeline.replaceChildren();
    const width = res.seconds;
    res.events.filter((e) => e.kind !== 'sub').forEach((e) => {
      const tick = el('span', `pm-tick is-${e.kind}${e.beat >= res.switchAt - 1e-6 ? ' is-new' : ''}`);
      tick.style.left = `${(e.beat / width) * 100}%`;
      mmTimeline.appendChild(tick);
    });
    const line = el('span', 'pm-switch'); line.style.left = `${(res.switchAt / width) * 100}%`; mmTimeline.appendChild(line);
  }
  function playMM() {
    state.mmPlayed = true;
    const { res } = currentMM();
    // 事件以秒计：bpm=60 时一拍就是一秒
    audio.play(res.events, 60, res.seconds, () => {});
  }
  [ratio, cycle].forEach((n) => n.addEventListener('change', () => { state.accents = [new Set([0]), new Set([0])]; paintBoard(); }));
  [presetSel, oldTempo].forEach((n) => n.addEventListener('change', paintMM));
  paintBoard();
  paintMM();
  host.addEventListener('toolbox-stop', () => audio.stop());
  // Side-B 实操：@lab:<id>——挂上任务条；提交时交出比例、节拍调制的设置，以及是否真的播放过
  host.addEventListener('toolbox-query', (event) => {
    const q = String(event.detail ?? '');
    if (!q.startsWith('@lab:')) return;
    state.polyPlayed = false; state.mmPlayed = false;
    import('./lab_banner.js?v=20261011-dual1').then(({ mountLabBanner }) => mountLabBanner(host, q.slice(5), {
      getSubmission: () => ({ ratio: ab(), polyPlayed: state.polyPlayed, mm: { preset: presetSel.value, oldTempo: Number(oldTempo.value), played: state.mmPlayed } }),
    }));
  });
  return { stop: () => audio.stop() };
}

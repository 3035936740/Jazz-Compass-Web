// Side-B 的"实验"与互动小部件（像玩具，不是作业）：四部和声调音台、复节奏网格、两只手打拍板，以及关卡里用到的两种图
// （大谱表四部和弦、节奏格子）。评分沿用 lab_checks.js / sideb_engine.js；乐理出处见那两个文件与关卡内容文件。
import { renderStaff } from './staff_svg.js';
import { checkFourPart } from './lab_checks.js?v=20261004-l3';
import { gradeTaps } from './sideb_engine.js?v=20261004-b3';

const lang = () => { const l = globalThis.window?.__lang || 'zh'; return ['zh', 'ja', 'en'].includes(l) ? l : 'en'; };
const tx = (v) => (v == null ? '' : typeof v === 'string' ? v : v[lang()] ?? v.en ?? '');
const el = (tag, cls = '', text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
const btn = (cls, text, on) => { const b = el('button', cls, text); b.type = 'button'; b.addEventListener('click', on); return b; };
const hz = (m) => 440 * 2 ** ((m - 69) / 12);
const now = () => globalThis.performance?.now?.() ?? Date.now();

const TEXT = {
  zh: { play: '播放', stop: '停止', score: '评分', parts: ['女高', '女中', '男高', '男低'], up: '升高一级', down: '降低一级', solved: '全部满分！', composite: '合起来', attacks: (n) => `合起来一个循环 ${n} 个起音`, listen: '先听一遍', practice: '试打（不计分）', real: '正式打', left: '左手 F', right: '右手 J', counting: '预备……', go: '开始打！', result: (h, n, m, x, p) => `命中 ${h}/${n}，漏 ${m}，多打 ${x}；时间精度 ${p}%`, latency: (ms) => `（已扣掉设备延迟约 ${ms} ms）`, mute: '静音', unmute: '打开' },
  ja: { play: '再生', stop: '停止', score: '採点', parts: ['ソプラノ', 'アルト', 'テノール', 'バス'], up: '1 音上げる', down: '1 音下げる', solved: '全項目満点！', composite: '合成', attacks: (n) => `合わせて 1 周期に打点 ${n} 個`, listen: 'まず聴く', practice: '練習（採点なし）', real: '本番', left: '左手 F', right: '右手 J', counting: '予備拍……', go: '叩いて！', result: (h, n, m, x, p) => `命中 ${h}/${n}・抜け ${m}・余分 ${x}／タイミング精度 ${p}%`, latency: (ms) => `（機器の遅れ約 ${ms} ms を差し引き）`, mute: 'ミュート', unmute: 'オン' },
  en: { play: 'Play', stop: 'Stop', score: 'Score', parts: ['Soprano', 'Alto', 'Tenor', 'Bass'], up: 'Up a step', down: 'Down a step', solved: 'Full marks!', composite: 'Combined', attacks: (n) => `${n} attacks per cycle combined`, listen: 'Listen first', practice: 'Practice (not scored)', real: 'For real', left: 'Left F', right: 'Right J', counting: 'Count-in…', go: 'Tap now!', result: (h, n, m, x, p) => `Hit ${h}/${n}, missed ${m}, extra ${x}; timing ${p}%`, latency: (ms) => `(device latency of about ${ms} ms removed)`, mute: 'Mute', unmute: 'On' },
};
const T = () => TEXT[lang()];

// ---------------- 音名 ----------------
const SPELL = [['C', 0], ['C', 1], ['D', 0], ['E', -1], ['E', 0], ['F', 0], ['F', 1], ['G', 0], ['A', -1], ['A', 0], ['B', -1], ['B', 0]];
/** MIDI → { letter, octave, alter }（C 大调的常用拼法：升 C、降 E、升 F、降 A、降 B） */
export function spellMidi(m) {
  const [letter, alter] = SPELL[((m % 12) + 12) % 12];
  return { letter, octave: Math.floor(m / 12) - 1, alter: alter || null };
}
const ACC = { 1: '#', '-1': 'b' };
export const midiName = (m) => { const s = spellMidi(m); return `${s.letter}${ACC[s.alter] || ''}${s.octave}`; };
const PRETTY = { '#': '♯', b: '♭' };
const prettyName = (m) => midiName(m).replace(/[#b]/, (c) => PRETTY[c]);

// ---------------- 图：大谱表四部和弦 ----------------
/** chords：[[男低, 男高, 女中, 女高]…]（MIDI），画成二分音符；labels：每个和弦上方的罗马数字 */
export function satbStaff({ chords = [], labels = [] }) {
  const n = Math.max(1, chords.length);
  const svg = renderStaff({
    staves: [
      { clef: 'treble', bars: [chords.map((c) => ({ p: [midiName(c[2]), midiName(c[3])], d: 2 }))] },
      { clef: 'bass', bars: [chords.map((c) => ({ p: [midiName(c[0]), midiName(c[1])], d: 2 }))] },
    ],
    beats: 2 * n, rowGap: 46, top: labels.length ? 52 : 30,
    labels: labels.map((text, i) => ({ bar: 0, beat: 2 * i, text })),
    ariaLabel: chords.map((c) => c.map(midiName).join(' ')).join(' | '),
  });
  const wrap = el('div', 'sideb-visual sideb-satb');
  wrap.appendChild(svg);
  return wrap;
}

// ---------------- 图：节奏格子 ----------------
/** rows：每行一串 0/1；labels：每行的名字（如 3、2、3+2） */
export function rhythmGrid({ rows = [], labels = [] }, { active = -1 } = {}) {
  const wrap = el('div', 'sideb-visual sideb-grid');
  const cells = Math.max(...rows.map((r) => r.length), 1);
  wrap.style.setProperty('--cells', cells);
  rows.forEach((row, r) => {
    const line = el('div', `sideb-grid-row${r === rows.length - 1 && rows.length > 2 ? ' is-sum' : ''}`);
    line.appendChild(el('span', 'sideb-grid-label', labels[r] ?? ''));
    row.forEach((on, i) => {
      const cell = el('span', `sideb-grid-cell${on ? ' is-on' : ''}${i === active ? ' is-now' : ''}`);
      cell.dataset.i = i;
      line.appendChild(cell);
    });
    wrap.appendChild(line);
  });
  return wrap;
}

// ---------------- 播放 ----------------
/**
 * 统一的播放：{ chords, gap } 依次弹和弦；{ notes, mode } 学习页的格式；{ rhythm: { bpm, cycle, repeats, tracks: [{ beats, midi|midis }] } } 节奏
 * 返回停止函数
 */
export function playAudio(audio, playChord) {
  const timers = [];
  const at = (ms, fn) => timers.push(setTimeout(fn, ms));
  const stop = () => timers.forEach(clearTimeout);
  if (!audio || !playChord) return stop;
  if (audio.chords) {
    const gap = audio.gap ?? 900;
    audio.chords.forEach((c, i) => at(i * gap, () => playChord(c.map(hz), (gap / 1000) * 0.95, { interrupt: i === 0 })));
  } else if (audio.rhythm) {
    const { bpm = 90, cycle = 4, repeats = 1, tracks = [] } = audio.rhythm;
    const beatMs = 60000 / bpm;
    const events = [];
    for (let r = 0; r < repeats; r += 1) tracks.forEach((track) => track.beats.forEach((b, k) => events.push([(r * cycle + b) * beatMs, track.midis ? track.midis[k] : track.midi])));
    events.sort((a, b) => a[0] - b[0]).forEach(([ms, midi], i) => at(ms, () => playChord([hz(midi)], 0.22, { interrupt: i === 0 })));
  } else if (audio.notes) {
    const mode = audio.mode || 'melody';
    if (mode === 'harmonic' || mode === 'chord') playChord(audio.notes.map(hz), 1.6);
    else if (mode === 'chords') audio.notes.forEach((c, i) => at(i * 900, () => playChord([].concat(c).map(hz), 0.85, { interrupt: i === 0 })));
    else audio.notes.forEach((m, i) => at(i * 330, () => playChord([hz(m)], 0.4, { interrupt: i === 0 })));
  }
  return stop;
}

// ---------------- 实验：四部和声调音台 ----------------
const MAJOR = [0, 2, 4, 5, 7, 9, 11];
const stepIn = (m, dir, tonic) => {
  let x = m + dir;
  while (!MAJOR.includes(((x - tonic) % 12 + 12) % 12)) x += dir;
  return x;
};
/** 四部和弦（MIDI）→ 五线谱编辑器的格式（给 lab_checks.checkFourPart 用） */
export function chordsToScore(chords) {
  const ev = (a, b) => ({ rest: false, duration: 'h', dots: 0, tie: false, notes: [spellMidi(a), spellMidi(b)].map((n) => ({ ...n, cents: 0 })) });
  return { key: 0, meter: [4, 4], clef: 'grand', voices: [chords.map((c) => ev(c[2], c[3])), chords.map((c) => ev(c[0], c[1]))] };
}
/**
 * params：{ keyName, tonic, romans, chords }。每个音可以按大调音阶一级一级上下移动，随时播放，评分（满分 100）实时更新
 * onSolved：第一次改到 100 分且没有硬性错误时调用
 */
export function satbToy(host, params, { playChord, onSolved } = {}) {
  const t = T();
  let chords = params.chords.map((c) => [...c]);
  let solved = false;
  let stopAudio = () => {};
  const box = el('div', 'sideb-toy sideb-toy-satb');
  const staff = el('div', 'sideb-toy-staff');
  const grid = el('div', 'sideb-toy-voices');
  const sheet = el('div', 'sideb-toy-sheet');
  sheet.setAttribute('aria-live', 'polite');
  const bar = el('div', 'sideb-toy-actions');
  bar.append(btn('learn-btn ghost', t.play, () => { stopAudio(); stopAudio = playAudio({ chords, gap: 900 }, playChord); }));
  const paint = () => {
    staff.replaceChildren(satbStaff({ chords, labels: params.romans }));
    grid.replaceChildren();
    grid.style.setProperty('--cols', chords.length);
    grid.appendChild(el('span', 'sideb-toy-corner'));
    params.romans.forEach((r) => grid.appendChild(el('span', 'sideb-toy-head', r)));
    [3, 2, 1, 0].forEach((v, row) => {
      grid.appendChild(el('span', 'sideb-toy-part', t.parts[row]));
      chords.forEach((c, i) => {
        const cell = el('span', 'sideb-toy-cell');
        const up = btn('sideb-toy-step', '▲', () => { chords[i][v] = stepIn(chords[i][v], 1, params.tonic ?? 0); paint(); });
        const down = btn('sideb-toy-step', '▼', () => { chords[i][v] = stepIn(chords[i][v], -1, params.tonic ?? 0); paint(); });
        up.setAttribute('aria-label', `${t.parts[row]} ${params.romans[i]} ${t.up}`);
        down.setAttribute('aria-label', `${t.parts[row]} ${params.romans[i]} ${t.down}`);
        cell.append(up, el('span', 'sideb-toy-note', prettyName(c[v])), down);
        grid.appendChild(cell);
      });
    });
    const result = checkFourPart(chordsToScore(chords), params);
    sheet.replaceChildren();
    const head = el('p', 'sideb-toy-score');
    head.append(el('span', '', t.score), el('strong', '', `${result.score}/100`));
    sheet.appendChild(head);
    const lines = [...result.hardFail.map((h) => ['hard', tx(h.text)]), ...result.items.flatMap((i) => i.deductions.filter((d) => d.points > 0).map((d) => ['minus', `−${Math.round(d.points * 10) / 10} ${tx(d.text)}`]))];
    const ul = el('ul', 'sideb-toy-issues');
    lines.slice(0, 6).forEach(([kind, text]) => ul.appendChild(el('li', `is-${kind}`, text)));
    if (!lines.length) ul.appendChild(el('li', 'is-good', t.solved));
    sheet.appendChild(ul);
    if (!solved && !result.hardFail.length && result.score === 100) { solved = true; onSolved?.(result); }
    box.dataset.score = result.score;
  };
  box.append(staff, grid, bar, sheet);
  host.appendChild(box);
  paint();
  return { box, get chords() { return chords; }, set: (next) => { chords = next.map((c) => [...c]); paint(); }, destroy: () => stopAudio() };
}

// ---------------- 实验：复节奏网格 ----------------
const lcm = (a, b) => { const g = (x, y) => (y ? g(y, x % y) : x); return (a * b) / g(a, b); };
/** params：{ ratios: [[3, 2], …], bpm }。两行加一行合成节奏，可以单独静音，循环播放并高亮当前格 */
export function polyToy(host, params, { playChord } = {}) {
  const t = T();
  let [a, b] = params.ratios[0];
  const muted = [false, false];
  let timer = null;
  let step = -1;
  const box = el('div', 'sideb-toy sideb-toy-poly');
  const picks = el('div', 'sideb-toy-ratios');
  const gridBox = el('div', 'sideb-toy-grid');
  const note = el('p', 'sideb-toy-note-line');
  const rows = () => {
    const n = lcm(a, b);
    const ra = Array.from({ length: n }, (_, i) => (i % (n / a) === 0 ? 1 : 0));
    const rb = Array.from({ length: n }, (_, i) => (i % (n / b) === 0 ? 1 : 0));
    const sum = ra.map((x, i) => (x || rb[i] ? 1 : 0));
    return { n, ra, rb, sum };
  };
  const paint = () => {
    const { ra, rb, sum } = rows();
    gridBox.replaceChildren(rhythmGrid({ rows: [ra, rb, sum], labels: [String(a), String(b), t.composite] }, { active: step }));
    note.textContent = t.attacks(sum.filter(Boolean).length);
    picks.querySelectorAll('button').forEach((x) => x.classList.toggle('is-on', x.dataset.ratio === `${a}:${b}`));
  };
  const stop = () => { clearInterval(timer); timer = null; step = -1; playBtn.textContent = t.play; paint(); };
  const start = () => {
    const { n } = rows();
    // 一个循环固定 3 拍：比例越复杂，格子越细
    const cellMs = Math.max(60, (3 * 60000) / (params.bpm || 90) / n);
    step = -1;
    timer = setInterval(() => {
      const { ra, rb } = rows();
      step = (step + 1) % n;
      const freqs = [];
      if (ra[step] && !muted[0]) freqs.push(hz(79));
      if (rb[step] && !muted[1]) freqs.push(hz(67));
      if (freqs.length) playChord?.(freqs, 0.2, { interrupt: false });
      paint();
    }, cellMs);
    playBtn.textContent = t.stop;
  };
  params.ratios.forEach(([x, y]) => {
    const p = btn('sideb-chip', `${x}:${y}`, () => { [a, b] = [x, y]; if (timer) { stop(); start(); } else paint(); });
    p.dataset.ratio = `${x}:${y}`;
    picks.appendChild(p);
  });
  const muteBtns = [0, 1].map((k) => btn('sideb-chip', '', () => { muted[k] = !muted[k]; muteBtns[k].classList.toggle('is-off', muted[k]); muteBtns[k].textContent = `${k ? b : a} · ${muted[k] ? t.unmute : t.mute}`; }));
  muteBtns.forEach((m, k) => { m.textContent = `${k ? b : a} · ${t.mute}`; });
  const playBtn = btn('learn-btn ghost', t.play, () => (timer ? stop() : start()));
  const actions = el('div', 'sideb-toy-actions');
  actions.append(playBtn, ...muteBtns);
  box.append(picks, gridBox, note, actions);
  host.appendChild(box);
  paint();
  return { box, destroy: stop };
}

// ---------------- 两只手打拍板（像音游一样） ----------------
/**
 * 两条轨道（左手 L、右手 R）上固定画出每个起音；播放、试打、正式打时一条光标从左往右扫过，
 * 扫到的音点会亮起；每敲一下就在轨道上留下一个标记，并立刻显示 Perfect / Great / Good / Miss（±40 / 80 / 120 ms）。
 * 试打可以放慢（×0.5 / ×0.75）、只练一只手；正式打用原速、两只手，结果交给 onResult（毫秒，相对第一拍）。
 * 判定会扣掉整体一致的设备延迟（前几下的中位数），所以"总是晚一点"不会被当成打错。
 * node：{ bpm, cycle, cycles, hands: { left, right } }（起音位置，单位拍）
 */
const TIERS = [[40, 'perfect'], [80, 'great'], [120, 'good']];
const JUDGE = {
  zh: { perfect: 'Perfect', great: 'Great', good: 'Good', miss: 'Miss', extra: '多打了' },
  ja: { perfect: 'Perfect', great: 'Great', good: 'Good', miss: 'Miss', extra: '余分' },
  en: { perfect: 'Perfect', great: 'Great', good: 'Good', miss: 'Miss', extra: 'Extra' },
};
const PAD_TEXT = {
  zh: { speed: '速度', hands: '练哪只手', both: '两只手', leftOnly: '只练左手', rightOnly: '只练右手', slowNote: '试打可以放慢、只练一只手；正式打是原速、两只手。' },
  ja: { speed: '速さ', hands: '練習する手', both: '両手', leftOnly: '左手だけ', rightOnly: '右手だけ', slowNote: '練習はゆっくり・片手だけでも OK。本番は原速・両手。' },
  en: { speed: 'Speed', hands: 'Hands', both: 'Both', leftOnly: 'Left only', rightOnly: 'Right only', slowNote: 'Practice can be slower or one hand at a time; the real try is full speed with both hands.' },
};
export function tapPad(host, node, { playChord, onResult } = {}) {
  const t = T();
  const pt = PAD_TEXT[lang()];
  const jt = JUDGE[lang()];
  const span = (node.cycle || 2) * (node.cycles || 1);
  const count = node.cycle || 2;
  const box = el('div', 'sideb-toy sideb-tap');
  // 轨道
  const lanes = el('div', 'sideb-lanes');
  const lane = (hand, label) => {
    const row = el('div', `sideb-lane is-${hand}`);
    const track = el('div', 'sideb-lane-track');
    // 拍线
    for (let b = 0; b <= span; b += 1) { const line = el('span', `sideb-beatline${b % count === 0 ? ' is-bar' : ''}`); line.style.left = `${(b / span) * 100}%`; track.appendChild(line); }
    const notes = node.hands[hand].map((beat) => { const n = el('span', 'sideb-note'); n.style.left = `${(beat / span) * 100}%`; n.dataset.beat = beat; track.appendChild(n); return n; });
    row.append(el('span', 'sideb-lane-label', label), track);
    lanes.appendChild(row);
    return { track, notes };
  };
  const L = lane('left', 'L');
  const R = lane('right', 'R');
  const head = el('span', 'sideb-playhead');
  lanes.appendChild(head);
  const judge = el('div', 'sideb-judge');
  judge.setAttribute('aria-live', 'polite');
  const status = el('p', 'sideb-tap-status');
  status.setAttribute('aria-live', 'polite');
  // 难度：速度、只练一只手（只影响试打）
  let speed = 1; let only = null;
  const opts = el('div', 'sideb-tap-opts');
  const chipRow = (label, items, pick) => {
    const row = el('span', 'sideb-tap-opt');
    row.appendChild(el('span', 'sideb-tap-opt-label', label));
    items.forEach(([text, value], i) => {
      const c = btn(`sideb-chip${i === 0 ? ' is-on' : ''}`, text, () => { row.querySelectorAll('.sideb-chip').forEach((x) => x.classList.toggle('is-on', x === c)); pick(value); });
      row.appendChild(c);
    });
    return row;
  };
  opts.append(chipRow(pt.speed, [['×1', 1], ['×0.75', 0.75], ['×0.5', 0.5]], (v) => { speed = v; }), chipRow(pt.hands, [[pt.both, null], [pt.leftOnly, 'left'], [pt.rightOnly, 'right']], (v) => { only = v; }));
  const pads = el('div', 'sideb-tap-pads');
  const padL = btn('sideb-tap-pad is-left', t.left, () => {});
  const padR = btn('sideb-tap-pad is-right', t.right, () => {});
  pads.append(padL, padR);
  let run = null; // 进行中的一次：{ start, beatMs, scored, hands, hit: { left: Set, right: Set }, taps: { left: [], right: [] }, offsets: [] }
  let raf = 0;
  const timers = [];
  const reset = () => {
    [...L.notes, ...R.notes].forEach((n) => n.classList.remove('is-due', 'is-hit', 'is-miss', 'is-off', 'perfect', 'great', 'good'));
    lanes.querySelectorAll('.sideb-tapmark').forEach((m) => m.remove());
    head.style.setProperty('--x', 0);
    head.classList.remove('is-moving');
  };
  const pop = (text, cls) => {
    const p = el('span', `sideb-judge-pop ${cls}`, text);
    judge.appendChild(p);
    setTimeout(() => p.remove(), 650);
  };
  const median = (list) => { const a = [...list].sort((x, y) => x - y); return a.length ? a[Math.floor(a.length / 2)] : 0; };
  const hit = (hand) => {
    const pad = hand === 'left' ? padL : padR;
    pad.classList.add('is-hit');
    setTimeout(() => pad.classList.remove('is-hit'), 90);
    playChord?.([hz(hand === 'left' ? 60 : 72)], 0.12, { interrupt: false });
    if (!run || !run.hands.includes(hand)) return;
    const time = now() - run.start;
    run.taps[hand].push(time / run.speedScale);
    const lat = run.offsets.length >= 2 && Math.abs(median(run.offsets)) <= 150 ? median(run.offsets) : 0;
    const lanesOf = hand === 'left' ? L : R;
    // 最近的、还没打过的起音
    let best = -1; let bestD = Infinity;
    node.hands[hand].forEach((beat, i) => { if (run.hit[hand].has(i)) return; const d = time - lat - beat * run.beatMs; if (Math.abs(d) < Math.abs(bestD)) { best = i; bestD = d; } });
    const tier = best >= 0 ? TIERS.find(([ms]) => Math.abs(bestD) <= ms) : null;
    const mark = el('span', `sideb-tapmark ${tier ? tier[1] : 'extra'}`);
    mark.style.left = `${Math.max(0, Math.min(100, (time / (span * run.beatMs)) * 100))}%`;
    lanesOf.track.appendChild(mark);
    if (tier) {
      run.hit[hand].add(best);
      run.offsets.push(time - node.hands[hand][best] * run.beatMs);
      lanesOf.notes[best].classList.add('is-hit', tier[1]);
      pop(jt[tier[1]], tier[1]);
    } else pop(jt.extra, 'extra');
  };
  padL.addEventListener('pointerdown', (e) => { e.preventDefault(); hit('left'); });
  padR.addEventListener('pointerdown', (e) => { e.preventDefault(); hit('right'); });
  const onKey = (e) => {
    if (e.repeat || !box.isConnected) return;
    const k = String(e.key || '').toLowerCase();
    if (k === 'f') hit('left');
    if (k === 'j') hit('right');
  };
  globalThis.document?.addEventListener('keydown', onKey);
  const stopRun = () => { timers.forEach(clearTimeout); timers.length = 0; if (raf) globalThis.cancelAnimationFrame?.(raf); raf = 0; };
  /** 一次播放 / 试打 / 正式打。mode：'listen' | 'practice' | 'real' */
  const start = (mode) => {
    stopRun();
    reset();
    const scaled = mode === 'practice' ? speed : 1;
    const beatMs = 60000 / ((node.bpm || 60) * scaled);
    const hands = mode === 'practice' && only ? [only] : ['left', 'right'];
    [L, R].forEach((x, i) => x.notes.forEach((n) => n.classList.toggle('is-off', !hands.includes(i ? 'right' : 'left'))));
    // 预备拍：每拍一下，光标停在起点；状态里倒数
    for (let k = 0; k < count; k += 1) timers.push(setTimeout(() => { playChord?.([hz(k === 0 ? 84 : 77)], 0.1, { interrupt: k === 0 }); status.textContent = `${t.counting} ${count - k}`; }, k * beatMs));
    const t0 = now() + count * beatMs;
    run = mode === 'listen' ? null : { start: t0, beatMs, speedScale: 1 / scaled, scored: mode === 'real', hands, hit: { left: new Set(), right: new Set() }, taps: { left: [], right: [] }, offsets: [] };
    // 拍点上的轻声节拍器，帮助对齐
    for (let b = 0; b < span; b += 1) timers.push(setTimeout(() => playChord?.([hz(b % count === 0 ? 91 : 86)], 0.05, { interrupt: false }), count * beatMs + b * beatMs));
    if (mode === 'listen') {
      hands.forEach((hand) => node.hands[hand].forEach((beat) => timers.push(setTimeout(() => playChord?.([hz(hand === 'left' ? 60 : 72)], 0.18, { interrupt: false }), count * beatMs + beat * beatMs))));
    }
    timers.push(setTimeout(() => { status.textContent = mode === 'listen' ? t.listen : t.go; head.classList.add('is-moving'); }, count * beatMs - 30));
    const frame = () => {
      const time = now() - t0;
      const x = Math.max(0, Math.min(1, time / (span * beatMs)));
      head.style.setProperty('--x', x);
      const lat = run && run.offsets.length >= 2 && Math.abs(median(run.offsets)) <= 150 ? median(run.offsets) : 0;
      [['left', L], ['right', R]].forEach(([hand, lanesOf]) => node.hands[hand].forEach((beat, i) => {
        const due = beat * beatMs;
        const n = lanesOf.notes[i];
        if (time >= due - 25) n.classList.add('is-due');
        if (run && hands.includes(hand) && !run.hit[hand].has(i) && !n.classList.contains('is-miss') && time - lat > due + 120) { n.classList.add('is-miss'); pop(jt.miss, 'miss'); }
      }));
      if (time < span * beatMs + beatMs * 0.6) raf = globalThis.requestAnimationFrame ? globalThis.requestAnimationFrame(frame) : setTimeout(frame, 16);
    };
    raf = globalThis.requestAnimationFrame ? globalThis.requestAnimationFrame(frame) : setTimeout(frame, 16);
    timers.push(setTimeout(() => {
      head.classList.remove('is-moving');
      if (!run) { status.textContent = ''; return; }
      const done = run; run = null;
      const grade = (hand) => gradeTaps(hands.includes(hand) ? node.hands[hand] : [], done.taps[hand], { bpm: node.bpm });
      const l = grade('left'); const r = grade('right');
      const total = hands.reduce((n, hand) => n + node.hands[hand].length, 0);
      const hits = l.hits + r.hits;
      const precision = Math.round(((l.precision * l.hits + r.precision * r.hits) / Math.max(1, hits)) * 100);
      const lat = Math.round((l.latency + r.latency) / 2);
      status.textContent = `${t.result(hits, total, l.missed + r.missed, l.extra + r.extra, precision)}${Math.abs(lat) >= 20 ? ` ${t.latency(lat)}` : ''}`;
      if (done.scored) onResult?.({ left: done.taps.left, right: done.taps.right });
    }, count * beatMs + span * beatMs + beatMs * 0.6));
  };
  const actions = el('div', 'sideb-toy-actions');
  const realBtn = btn('learn-btn primary', t.real, () => { realBtn.disabled = true; start('real'); });
  actions.append(btn('learn-btn ghost', t.listen, () => start('listen')), btn('learn-btn ghost', t.practice, () => start('practice')), realBtn);
  const stage = el('div', 'sideb-tap-stage');
  stage.append(lanes, judge);
  box.append(stage, pads, opts, el('p', 'sideb-tap-note', pt.slowNote), actions, status);
  host.appendChild(box);
  return { box, destroy: () => { stopRun(); globalThis.document?.removeEventListener('keydown', onKey); }, hit };
}

// ================= 第 1 章的实验 =================
const ACC_TEXT = { '-2': '𝄫', '-1': '♭', 0: '', 1: '♯', 2: '𝄪' };
const ACC_ASCII = { '-2': 'bb', '-1': 'b', 0: '', 1: '#', 2: '##' };
const LETTER_PCS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const midiOf = (letter, octave, alter) => 12 * (octave + 1) + LETTER_PCS[letter] + alter;
const TOY_TEXT = {
  zh: { spellings: '这个键的所有写法', octaveNote: '八度编号跟着字母走：同一个键，换了字母，编号可能就变了。', clef: '谱号', clefs: { treble: '高音', bass: '低音', alto: '中音', tenor: '次中音' }, meter: '拍号', levels: { beat: '拍', division: '分拍', subdivision: '细分' }, simple: '单拍子：每拍分成两份', compound: '复拍子：每拍分成三份', first: '第一个音', second: '第二个音', size: '度数（数字母）', semis: '半音数', name: '音程', inversion: '转位后', letters: (a, b, n) => `${a} → ${b}：数到 ${n} 个字母`, tonic: '主音', type: '类型', steps: '全音 / 半音', accidentals: (n, kind) => (n ? `调号：${n} 个${kind === 1 ? '升号' : '降号'}` : '调号：没有升降号'), mark: '特征音', layers: '声部', play: '播放', presets: '织体' },
  ja: { spellings: 'この鍵のすべての書き方', octaveNote: 'オクターヴ番号は文字に従う：同じ鍵でも文字が変われば番号が変わることがある。', clef: '音部記号', clefs: { treble: 'ト音', bass: 'ヘ音', alto: 'アルト', tenor: 'テノール' }, meter: '拍子', levels: { beat: '拍', division: '分割', subdivision: '細分' }, simple: '単純拍子：1 拍を 2 つに', compound: '複合拍子：1 拍を 3 つに', first: '1 つ目の音', second: '2 つ目の音', size: '度数（文字を数える）', semis: '半音の数', name: '音程', inversion: '転回すると', letters: (a, b, n) => `${a} → ${b}：文字を ${n} 個数える`, tonic: '主音', type: '種類', steps: '全音 / 半音', accidentals: (n, kind) => (n ? `調号：${kind === 1 ? '♯' : '♭'} ${n} 個` : '調号：なし'), mark: '特性音', layers: '声部', play: '再生', presets: 'テクスチュア' },
  en: { spellings: 'Every spelling of this key', octaveNote: 'The octave number follows the letter: the same key with a different letter can change its number.', clef: 'Clef', clefs: { treble: 'Treble', bass: 'Bass', alto: 'Alto', tenor: 'Tenor' }, meter: 'Meter', levels: { beat: 'Beat', division: 'Division', subdivision: 'Subdivision' }, simple: 'Simple: each beat splits in two', compound: 'Compound: each beat splits in three', first: 'First note', second: 'Second note', size: 'Size (count letters)', semis: 'Half steps', name: 'Interval', inversion: 'Inverted', letters: (a, b, n) => `${a} → ${b}: ${n} letters`, tonic: 'Tonic', type: 'Type', steps: 'Whole / half steps', accidentals: (n, kind) => (n ? `Key signature: ${n} ${kind === 1 ? 'sharp' : 'flat'}${n > 1 ? 's' : ''}` : 'Key signature: none'), mark: 'Characteristic tone', layers: 'Layers', play: 'Play', presets: 'Texture' },
};
const TT = () => TOY_TEXT[lang()];
const chips = (items, current, pick, cls = '') => {
  const row = el('div', `sideb-toy-ratios ${cls}`);
  items.forEach(([value, label]) => {
    const c = btn(`sideb-chip${value === current ? ' is-on' : ''}`, label, () => { row.querySelectorAll('.sideb-chip').forEach((x) => x.classList.toggle('is-on', x === c)); pick(value); });
    row.appendChild(c);
  });
  return row;
};

/** 同音异名：点一个琴键，列出它所有的写法（字母 + 升降 + 八度），在选定的谱号上画出来  ref:omt2e-half-whole ref:omt2e-aspn ref:omt2e-clefs */
export function spellToy(host, params = {}, { playChord, renderVisual } = {}) {
  const t = TT();
  let clef = params.clef || 'treble';
  let midi = params.start ?? 60;
  const box = el('div', 'sideb-toy sideb-toy-spell');
  const keys = el('div', 'sideb-toy-keys');
  const list = el('div', 'sideb-toy-spellings');
  const staff = el('div', 'sideb-toy-staff');
  const paint = () => {
    const spellings = [];
    Object.keys(LETTER_PCS).forEach((letter) => [-2, -1, 0, 1, 2].forEach((alter) => {
      for (let octave = 0; octave <= 8; octave += 1) if (midiOf(letter, octave, alter) === midi) spellings.push({ letter, alter, octave });
    }));
    spellings.sort((a, b) => Math.abs(a.alter) - Math.abs(b.alter));
    list.replaceChildren(el('p', 'sideb-toy-head-line', t.spellings));
    const row = el('div', 'sideb-toy-ratios');
    spellings.forEach((s) => row.appendChild(el('span', 'sideb-chip is-static', `${s.letter}${ACC_TEXT[s.alter]}${s.octave}`)));
    list.appendChild(row);
    if (new Set(spellings.map((s) => s.octave)).size > 1) list.appendChild(el('p', 'sideb-toy-note-line', t.octaveNote));
    const pic = renderVisual?.({ kind: 'notation', staves: [{ clef }], notes: spellings.map((s) => ({ p: `${s.letter}${ACC_ASCII[s.alter]}${s.octave}`, d: 'w', lit: true })), cols: spellings.length });
    staff.replaceChildren(...(pic ? [pic] : []));
    const kb = renderVisual?.({ kind: 'piano', from: 48, to: 84, lit: [midi], names: 'c' }, { play: ([m]) => { midi = m; playChord?.([hz(m)], 0.8); paint(); } });
    keys.replaceChildren(...(kb ? [kb] : []));
  };
  box.append(chips(['treble', 'bass', 'alto', 'tenor'].map((c) => [c, t.clefs[c]]), clef, (c) => { clef = c; paint(); }), keys, list, staff);
  host.appendChild(box);
  paint();
  return { box };
}

/** 拍子的层级：同样的格子，单拍子和复拍子分组不同；拍 / 分拍 / 细分三层可以分别打开听  ref:omt2e-simple-meter ref:omt2e-compound-meter */
export function meterToy(host, params = {}, { playChord } = {}) {
  const t = TT();
  const meters = params.meters || ['3/4', '6/8'];
  let meter = meters[0];
  const on = { beat: true, division: true, subdivision: false };
  let timer = null; let step = -1;
  const box = el('div', 'sideb-toy sideb-toy-meter');
  const grid = el('div', 'sideb-toy-grid');
  const kind = el('p', 'sideb-toy-note-line');
  const shape = () => {
    const [top, bottom] = meter.split('/').map(Number);
    const compound = top % 3 === 0 && top > 3 && bottom >= 8;
    const sixteenths = (top * 16) / bottom; // 一小节多少个十六分音符
    const beat = compound ? (3 * 16) / bottom : 16 / bottom;
    const division = compound ? beat / 3 : beat / 2;
    const rows = { beat: [], division: [], subdivision: [] };
    for (let i = 0; i < sixteenths; i += 1) {
      rows.beat.push(i % beat === 0 ? 1 : 0);
      rows.division.push(i % division === 0 ? 1 : 0);
      rows.subdivision.push(i % (division / 2) === 0 ? 1 : 0);
    }
    return { compound, sixteenths, rows };
  };
  const paint = () => {
    const { compound, rows } = shape();
    grid.replaceChildren(rhythmGrid({ rows: [rows.beat, rows.division, rows.subdivision], labels: [t.levels.beat, t.levels.division, t.levels.subdivision] }, { active: step }));
    kind.textContent = compound ? t.compound : t.simple;
  };
  const stop = () => { clearInterval(timer); timer = null; step = -1; playBtn.textContent = t.play; paint(); };
  const start = () => {
    const ms = 60000 / (params.bpm || 72) / 4; // 四分音符 = bpm，一格是十六分音符
    timer = setInterval(() => {
      const { sixteenths, rows } = shape();
      step = (step + 1) % sixteenths;
      if (on.beat && rows.beat[step]) playChord?.([hz(step === 0 ? 88 : 81)], 0.08, { interrupt: false });
      else if (on.division && rows.division[step]) playChord?.([hz(74)], 0.06, { interrupt: false });
      else if (on.subdivision && rows.subdivision[step]) playChord?.([hz(67)], 0.04, { interrupt: false });
      paint();
    }, ms);
    playBtn.textContent = TEXT[lang()].stop;
  };
  const playBtn = btn('learn-btn ghost', t.play, () => (timer ? stop() : start()));
  const layerRow = el('div', 'sideb-toy-ratios');
  ['beat', 'division', 'subdivision'].forEach((k) => {
    const c = btn(`sideb-chip${on[k] ? ' is-on' : ''}`, t.levels[k], () => { on[k] = !on[k]; c.classList.toggle('is-on', on[k]); });
    layerRow.appendChild(c);
  });
  const actions = el('div', 'sideb-toy-actions');
  actions.append(playBtn, layerRow);
  box.append(chips(meters.map((m) => [m, m]), meter, (m) => { meter = m; if (timer) { stop(); start(); } else paint(); }), grid, kind, actions);
  host.appendChild(box);
  paint();
  return { box, destroy: stop };
}

/** 音程：两步法——先数字母得到度数，再数半音得到性质；同时给出转位  ref:omt-intervals ref:omt2e-intervals */
export function intervalToy(host, params = {}, { playChord } = {}) {
  const t = TT();
  const notes = [{ ...(params.first || { letter: 'C', alter: 0, octave: 4 }) }, { ...(params.second || { letter: 'E', alter: 0, octave: 4 }) }];
  const box = el('div', 'sideb-toy sideb-toy-interval');
  const out = el('div', 'sideb-toy-sheet');
  const picker = (k) => {
    const row = el('div', 'sideb-toy-picker');
    row.appendChild(el('span', 'sideb-tap-opt-label', k ? t.second : t.first));
    row.appendChild(chips(Object.keys(LETTER_PCS).map((l) => [l, l]), notes[k].letter, (l) => { notes[k].letter = l; paint(); }));
    row.appendChild(chips([-2, -1, 0, 1, 2].map((a) => [a, ACC_TEXT[a] || '♮']), notes[k].alter, (a) => { notes[k].alter = a; paint(); }));
    row.appendChild(chips([3, 4, 5].map((o) => [o, String(o)]), notes[k].octave, (o) => { notes[k].octave = o; paint(); }));
    return row;
  };
  const paint = () => {
    const [a, b] = notes;
    const name = (n) => `${n.letter}${ACC_TEXT[n.alter]}${n.octave}`;
    const LETTERS_ALL = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const d = (n) => n.octave * 7 + LETTERS_ALL.indexOf(n.letter);
    const [low, high] = d(a) < d(b) || (d(a) === d(b) && midiOf(a.letter, a.octave, a.alter) <= midiOf(b.letter, b.octave, b.alter)) ? [a, b] : [b, a];
    const generic = d(high) - d(low) + 1;
    const semis = midiOf(high.letter, high.octave, high.alter) - midiOf(low.letter, low.octave, low.alter);
    const simple = ((generic - 1) % 7) + 1;
    const ref = { 1: 0, 4: 5, 5: 7, 2: 2, 3: 4, 6: 9, 7: 11 }[simple];
    const diff = semis - 12 * Math.floor((generic - 1) / 7) - ref;
    const perfect = [1, 4, 5].includes(simple);
    const q = perfect ? (diff === 0 ? 'P' : diff > 0 ? 'A'.repeat(diff) : 'd'.repeat(-diff)) : diff === 0 ? 'M' : diff === -1 ? 'm' : diff > 0 ? 'A'.repeat(diff) : 'd'.repeat(-diff - 1);
    const inv = { P: 'P', M: 'm', m: 'M' }[q] ?? (q[0] === 'A' ? q.replace(/A/g, 'd') : q.replace(/d/g, 'A'));
    out.replaceChildren(
      el('p', '', t.letters(name(low), name(high), generic)),
      el('p', '', `${t.size}：${generic} · ${t.semis}：${semis}`),
      el('p', 'sideb-toy-score', `${t.name}：${q}${generic}`),
      ...(generic <= 8 ? [el('p', '', `${t.inversion}：${inv}${9 - simple}（${simple} + ${9 - simple} = 9）`)] : []),
    );
  };
  const play = btn('learn-btn ghost', t.play, () => playAudio({ chords: notes.map((n) => [midiOf(n.letter, n.octave, n.alter)]).concat([notes.map((n) => midiOf(n.letter, n.octave, n.alter))]), gap: 650 }, playChord));
  box.append(picker(0), picker(1), out, play);
  host.appendChild(box);
  paint();
  return { box };
}

/**
 * 音阶 / 调式 / 五声：选主音和类型，按字母拼写（七声每个字母用一次），标出全音半音、调号、特征音
 * params.sets：[{ id, label, steps: 相对主音的半音数, mark?: 特征音的序号, order? }]  ref:omt2e-major-scales ref:omt2e-minor ref:omt2e-modes
 */
export function scaleToy(host, params = {}, { playChord } = {}) {
  const t = TT();
  const tonics = params.tonics || ['C', 'D', 'E', 'F', 'G', 'A', 'B♭', 'E♭', 'F♯'];
  let tonic = tonics[0];
  let set = params.sets[0];
  const box = el('div', 'sideb-toy sideb-toy-scale');
  const out = el('div', 'sideb-toy-sheet');
  const toAscii = (n) => n.replace('♯', '#').replace('♭', 'b');
  const spell = () => {
    const root = toAscii(tonic);
    const rootLetter = root[0];
    const rootAlter = root.length > 1 ? (root[1] === '#' ? 1 : -1) : 0;
    const L = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const start = L.indexOf(rootLetter);
    const rootPc = LETTER_PCS[rootLetter] + rootAlter;
    // 每个音用"相对主音的字母级数"拼写：七声用 0–6 级；五声用 steps 对应的级（params.degrees）
    const degrees = set.degrees || set.steps.map((_, i) => i);
    return set.steps.map((semi, i) => {
      const letter = L[(start + degrees[i]) % 7];
      let alter = (rootPc + semi - LETTER_PCS[letter]) % 12;
      if (alter > 6) alter -= 12;
      if (alter < -6) alter += 12;
      return { letter, alter, semi };
    });
  };
  const paint = () => {
    const notes = spell();
    const names = notes.map((n) => `${n.letter}${ACC_TEXT[n.alter] ?? '?'}`);
    const stepsText = notes.map((n, i) => { const next = i + 1 < notes.length ? notes[i + 1].semi : 12; const d = next - n.semi; return d === 1 ? 'H' : d === 2 ? 'W' : `${d}H`; }).join('–');
    const sharps = notes.filter((n) => n.alter > 0).reduce((s, n) => s + n.alter, 0);
    const flats = notes.filter((n) => n.alter < 0).reduce((s, n) => s - n.alter, 0);
    const row = el('div', 'sideb-toy-ratios');
    names.forEach((nm, i) => row.appendChild(el('span', `sideb-chip is-static${set.mark === i ? ' is-mark' : ''}`, nm)));
    out.replaceChildren(row, el('p', '', `${t.steps}：${stepsText}`));
    if (notes.length === 7 && !set.noKey) out.appendChild(el('p', '', t.accidentals(sharps || flats, sharps ? 1 : -1)));
    if (set.mark !== undefined) out.appendChild(el('p', 'sideb-toy-note-line', `${t.mark}：${names[set.mark]}${set.markNote ? ` — ${tx(set.markNote)}` : ''}`));
  };
  const play = btn('learn-btn ghost', t.play, () => {
    const base = 60 + ((LETTER_PCS[toAscii(tonic)[0]] + (toAscii(tonic).length > 1 ? (toAscii(tonic)[1] === '#' ? 1 : -1) : 0)) % 12 + 12) % 12;
    playAudio({ notes: [...set.steps.map((s) => base + s), base + 12], mode: 'melody' }, playChord);
  });
  box.append(
    el('span', 'sideb-tap-opt-label', t.tonic), chips(tonics.map((x) => [x, x]), tonic, (x) => { tonic = x; paint(); }),
    el('span', 'sideb-tap-opt-label', t.type), chips(params.sets.map((s) => [s.id, tx(s.label)]), set.id, (id) => { set = params.sets.find((s) => s.id === id); paint(); }),
    out, play,
  );
  host.appendChild(box);
  paint();
  return { box };
}

/** 织体：同一段小旋律，叠出单声部 / 支声 / 主调 / 复调  ref:omt2e-texture */
export function textureToy(host, params = {}, { playChord } = {}) {
  const t = TT();
  const active = new Set(params.presets[0].layers);
  let stopAudio = () => {};
  const box = el('div', 'sideb-toy sideb-toy-texture');
  const note = el('p', 'sideb-toy-note-line');
  const layerRow = el('div', 'sideb-toy-ratios');
  const paintLayers = () => layerRow.querySelectorAll('.sideb-chip').forEach((c) => c.classList.toggle('is-on', active.has(c.dataset.layer)));
  params.layers.forEach((layer) => {
    const c = btn('sideb-chip', tx(layer.label), () => { if (active.has(layer.id)) active.delete(layer.id); else active.add(layer.id); paintLayers(); note.textContent = ''; });
    c.dataset.layer = layer.id;
    layerRow.appendChild(c);
  });
  const presetRow = chips(params.presets.map((p, i) => [i, tx(p.label)]), 0, (i) => { const p = params.presets[i]; active.clear(); p.layers.forEach((l) => active.add(l)); paintLayers(); note.textContent = tx(p.explain); });
  const play = btn('learn-btn ghost', t.play, () => {
    stopAudio();
    const tracks = params.layers.filter((l) => active.has(l.id)).map((l) => ({ beats: l.notes.map((n) => n[0]), midis: l.notes.map((n) => n[1]) }));
    stopAudio = playAudio({ rhythm: { bpm: params.bpm || 96, cycle: params.cycle || 8, repeats: 1, tracks } }, playChord);
  });
  box.append(el('span', 'sideb-tap-opt-label', t.presets), presetRow, el('span', 'sideb-tap-opt-label', t.layers), layerRow, note, play);
  host.appendChild(box);
  paintLayers();
  note.textContent = tx(params.presets[0].explain);
  return { box, destroy: () => stopAudio() };
}

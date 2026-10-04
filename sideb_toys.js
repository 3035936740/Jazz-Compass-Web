// Side-B 的"实验"与互动小部件（像玩具，不是作业）：四部和声调音台、复节奏网格、两只手打拍板，以及关卡里用到的两种图
// （大谱表四部和弦、节奏格子）。评分沿用 lab_checks.js / sideb_engine.js；乐理出处见那两个文件与关卡内容文件。
import { renderStaff } from './staff_svg.js';
import { checkFourPart, checkSpecies } from './lab_checks.js?v=20261004-w1';
import { writtenToConcert, transpositionInterval, writtenKey } from './instruments.js';
import { cagedVoicing, CAGED_ORDER } from './fretboard.js';
import { buildCanon, checkCanon, canonEvents } from './canon.js';
import { keyInfo } from './motif_phrase.js';
import { buildChineseMode, rotateGong, luName, MODES as CN_MODES, SCALE_TYPES as CN_TYPES } from './chinese_modes.js';
import { THAATS, thaatSemitones, thaatAltered, buildMaqam, maqamSteps, stepLabel, noteLabel } from './world_modes.js';
import { TEMPERAMENTS, buildTemperament, majorThirds, frequencyOf } from './temperaments.js';
import { gradeTaps } from './sideb_engine.js?v=20261004-w5';

const lang = () => { const l = globalThis.window?.__lang || 'zh'; return ['zh', 'ja', 'en'].includes(l) ? l : 'en'; };
const tx = (v) => (v == null ? '' : typeof v === 'string' ? v : v[lang()] ?? v.en ?? '');
const t = (zh, ja, en) => ({ zh, ja, en });
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

// ================= 第 2 章的实验 =================
const CH2_TEXT = {
  zh: { root: '根音', quality: '性质', inversion: '转位', inversions: ['原位', '第一转位', '第二转位', '第三转位'], bass: '低音', figure: '数字低音', symbol: '和弦符号', key: '调', sevenths: '七和弦', triads: '三和弦', watch: '盯住一个和弦', inKey: (c, k, r) => `${c} 在 ${k} 是 ${r}`, notIn: (c, k) => `${c} 不在 ${k} 的自然和弦里`, playAll: '播放整句', moved: (from, to, d) => `${from} → ${to}（${d > 0 ? '上' : '下'}行 ${Math.abs(d)} 个半音）`, common: '保持不动', reset: '回到 C 大三', related: '近关系调', relNote: '近关系调：IV、V、ii、iii（各差一个升降号）、vi（同一个调号）、i（同一个主音）' },
  ja: { root: '根音', quality: '種類', inversion: '転回', inversions: ['基本形', '第 1 転回形', '第 2 転回形', '第 3 転回形'], bass: 'バス', figure: '数字付き低音', symbol: 'コード・シンボル', key: '調', sevenths: '七の和音', triads: '三和音', watch: '1 つの和音に注目', inKey: (c, k, r) => `${c} は ${k} で ${r}`, notIn: (c, k) => `${c} は ${k} の音階上の和音にない`, playAll: '全体を再生', moved: (from, to, d) => `${from} → ${to}（半音 ${Math.abs(d)} ${d > 0 ? '上' : '下'}）`, common: 'そのまま', reset: 'C 長三和音に戻す', related: '近親調', relNote: '近親調：IV・V・ii・iii（臨時記号 1 つ違い）、vi（同じ調号）、i（同じ主音）' },
  en: { root: 'Root', quality: 'Quality', inversion: 'Inversion', inversions: ['Root position', 'First inversion', 'Second inversion', 'Third inversion'], bass: 'Bass', figure: 'Figured bass', symbol: 'Chord symbol', key: 'Key', sevenths: 'Sevenths', triads: 'Triads', watch: 'Watch one chord', inKey: (c, k, r) => `${c} in ${k} is ${r}`, notIn: (c, k) => `${c} is not a diatonic chord of ${k}`, playAll: 'Play the phrase', moved: (from, to, d) => `${from} → ${to} (${d > 0 ? 'up' : 'down'} ${Math.abs(d)} half step${Math.abs(d) > 1 ? 's' : ''})`, common: 'stays', reset: 'Back to C major', related: 'Closely related keys', relNote: 'Closely related: IV, V, ii, iii (one accidental apart), vi (same signature), i (same tonic)' },
};
const C2 = () => CH2_TEXT[lang()];
const QUALITY_DEF = {
  maj: { label: t('大三', '長三', 'major'), semis: [0, 4, 7], sym: '' }, min: { label: t('小三', '短三', 'minor'), semis: [0, 3, 7], sym: 'm' },
  dim: { label: t('减三', '減三', 'diminished'), semis: [0, 3, 6], sym: '°' }, aug: { label: t('增三', '増三', 'augmented'), semis: [0, 4, 8], sym: '+' },
  maj7: { label: t('大七', '長七', 'major 7th'), semis: [0, 4, 7, 11], sym: 'maj7' }, dom7: { label: t('属七', '属七', 'dominant 7th'), semis: [0, 4, 7, 10], sym: '7' },
  min7: { label: t('小七', '短七', 'minor 7th'), semis: [0, 3, 7, 10], sym: 'm7' }, hdim7: { label: t('半减七', '半減七', 'half-diminished 7th'), semis: [0, 3, 6, 10], sym: 'ø7' },
  dim7: { label: t('减七', '減七', 'diminished 7th'), semis: [0, 3, 6, 9], sym: '°7' },
};
const L7 = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
/** 根音 + 性质 → 按字母拼写的和弦音（三度叠置：每隔一个字母） */
function spellChordNotes(rootLetter, rootAlter, semis) {
  const start = L7.indexOf(rootLetter);
  const rootPc = LETTER_PCS[rootLetter] + rootAlter;
  return semis.map((s, i) => {
    const letter = L7[(start + 2 * i) % 7];
    let alter = (rootPc + s - LETTER_PCS[letter]) % 12;
    if (alter > 6) alter -= 12; if (alter < -6) alter += 12;
    return { letter, alter };
  });
}
const nameOf = (n) => `${n.letter}${ACC_TEXT[n.alter] ?? '?'}`;
const asciiOf = (n) => `${n.letter}${ACC_ASCII[n.alter] ?? ''}`;

/** 和弦搭建：根音、性质、转位 → 拼写、低音、数字低音、和弦符号  ref:omt2e-triads ref:omt2e-sevenths ref:omt2e-figured-bass ref:omt2e-chord-symbols */
export function chordToy(host, params = {}, { playChord, renderVisual } = {}) {
  const t2 = C2();
  const state = { letter: 'C', alter: 0, quality: params.quality || 'maj', inversion: 0 };
  const box = el('div', 'sideb-toy sideb-toy-chord');
  const out = el('div', 'sideb-toy-sheet');
  const staff = el('div', 'sideb-toy-staff');
  const invRow = el('div');
  const paint = () => {
    const q = QUALITY_DEF[state.quality];
    const notes = spellChordNotes(state.letter, state.alter, q.semis);
    const seventh = notes.length === 4;
    if (state.inversion >= notes.length) state.inversion = 0;
    invRow.replaceChildren(chips(t2.inversions.slice(0, notes.length).map((x, i) => [i, x]), state.inversion, (i) => { state.inversion = i; paint(); }));
    const ordered = [...notes.slice(state.inversion), ...notes.slice(0, state.inversion)];
    const figures = seventh ? ['7', '6/5', '4/3', '4/2'] : ['5/3', '6', '6/4'];
    const symbol = `${nameOf(notes[0])}${q.sym}${state.inversion ? `/${nameOf(ordered[0])}` : ''}`;
    // 从低音开始往上排（每个音都比前一个高）
    let octave = 3; let prev = -1;
    const pitches = ordered.map((n) => { let m = 12 * (octave + 1) + LETTER_PCS[n.letter] + n.alter; while (m <= prev) { octave += 1; m = 12 * (octave + 1) + LETTER_PCS[n.letter] + n.alter; } prev = m; return { n, m, octave }; });
    out.replaceChildren(
      el('p', '', `${t2.root}：${nameOf(notes[0])} · ${notes.map(nameOf).join('–')}`),
      el('p', '', `${t2.bass}：${nameOf(ordered[0])} · ${t2.figure}：${figures[state.inversion]}`),
      el('p', 'sideb-toy-score', `${t2.symbol}：${symbol}`),
    );
    const pic = renderVisual?.({ kind: 'notation', staves: [{ clef: pitches[0].m < 57 ? 'bass' : 'treble' }], notes: pitches.map((p) => ({ p: `${asciiOf(p.n)}${p.octave}`, d: 'w', col: 0 })), cols: 1 });
    staff.replaceChildren(...(pic ? [pic] : []));
    box.dataset.midis = pitches.map((p) => p.m).join(',');
  };
  const play = btn('learn-btn ghost', TT().play, () => playChord?.(box.dataset.midis.split(',').map((m) => hz(Number(m))), 1.4));
  box.append(
    el('span', 'sideb-tap-opt-label', t2.root), chips(L7.map((l) => [l, l]), state.letter, (l) => { state.letter = l; paint(); }),
    chips([-1, 0, 1].map((a) => [a, ACC_TEXT[a] || '♮']), state.alter, (a) => { state.alter = a; paint(); }),
    el('span', 'sideb-tap-opt-label', t2.quality), chips(Object.entries(QUALITY_DEF).map(([k, v]) => [k, tx(v.label)]), state.quality, (k) => { state.quality = k; paint(); }),
    el('span', 'sideb-tap-opt-label', t2.inversion), invRow, out, staff, play,
  );
  host.appendChild(box);
  paint();
  return { box };
}

const KEYS_INFO = {
  major: { steps: [0, 2, 4, 5, 7, 9, 11], triads: ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim'], sevenths: ['maj7', 'min7', 'min7', 'maj7', 'dom7', 'min7', 'hdim7'], romans: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'], romans7: ['I7', 'ii7', 'iii7', 'IV7', 'V7', 'vi7', 'viiø7'] },
  // 小调：V 与 vii° 用升高的导音（ref:omt2e-roman-numerals ref:omt2e-minor）
  minor: { steps: [0, 2, 3, 5, 7, 8, 11], triads: ['min', 'dim', 'maj', 'min', 'maj', 'maj', 'dim'], sevenths: ['min7', 'hdim7', 'maj7', 'min7', 'dom7', 'maj7', 'dim7'], romans: ['i', 'ii°', 'III', 'iv', 'V', 'VI', 'vii°'], romans7: ['i7', 'iiø7', 'III7', 'iv7', 'V7', 'VI7', 'vii°7'], natural3: true },
};
/** 调内和弦表：一个调里每一级的和弦（符号 + 罗马数字），并可以"盯住"一个和弦看它在各调是几级  ref:omt2e-roman-numerals ref:omt2e-chord-symbols */
export function keyChordsToy(host, params = {}, { playChord } = {}) {
  const t2 = C2();
  const keys = params.keys || [['C', 'major'], ['G', 'major'], ['D', 'major'], ['F', 'major'], ['A', 'minor']];
  let current = 0; let sevenths = false; let watch = params.watch?.[0] ?? null;
  const box = el('div', 'sideb-toy sideb-toy-keychords');
  const grid = el('div', 'sideb-toy-cards');
  const note = el('p', 'sideb-toy-note-line');
  const keyLabel = ([tonic, mode]) => `${tonic}${mode === 'minor' ? (lang() === 'en' ? ' minor' : lang() === 'ja' ? ' 短調' : ' 小调') : (lang() === 'en' ? ' major' : lang() === 'ja' ? ' 長調' : ' 大调')}`;
  const chordsOf = ([tonic, mode]) => {
    const info = KEYS_INFO[mode];
    const letter = tonic[0]; const alter = tonic.includes('♭') ? -1 : tonic.includes('♯') ? 1 : 0;
    const rootPc = LETTER_PCS[letter] + alter;
    const start = L7.indexOf(letter);
    return info.steps.map((s, d) => {
      const rl = L7[(start + d) % 7];
      let ra = (rootPc + s - LETTER_PCS[rl]) % 12; if (ra > 6) ra -= 12; if (ra < -6) ra += 12;
      const quality = (sevenths ? info.sevenths : info.triads)[d];
      const notes = spellChordNotes(rl, ra, QUALITY_DEF[quality].semis);
      return { roman: (sevenths ? info.romans7 : info.romans)[d], symbol: `${nameOf(notes[0])}${QUALITY_DEF[quality].sym}`, notes, rootPc: LETTER_PCS[rl] + ra };
    });
  };
  const paint = () => {
    const list = chordsOf(keys[current]);
    grid.replaceChildren();
    list.forEach((c) => {
      const card = btn(`sideb-toy-card${watch && c.symbol === watch ? ' is-mark' : ''}`, '', () => {
        let m = 48 + ((c.rootPc % 12) + 12) % 12; let prev = 0;
        const mids = c.notes.map((n, i) => { let x = (i === 0 ? m : prev) ; const pc = ((LETTER_PCS[n.letter] + n.alter) % 12 + 12) % 12; x = Math.floor(x / 12) * 12 + pc; if (i > 0 && x <= prev) x += 12; prev = x; return x; });
        playChord?.(mids.map(hz), 1.2);
      });
      card.append(el('strong', '', c.roman), el('span', '', c.symbol), el('small', '', c.notes.map(nameOf).join(' ')));
      grid.appendChild(card);
    });
    if (watch) {
      const hit = list.find((c) => c.symbol === watch);
      note.textContent = hit ? t2.inKey(watch, keyLabel(keys[current]), hit.roman) : t2.notIn(watch, keyLabel(keys[current]));
    } else note.textContent = '';
  };
  box.append(
    el('span', 'sideb-tap-opt-label', t2.key), chips(keys.map((k, i) => [i, keyLabel(k)]), current, (i) => { current = i; paint(); }),
    chips([[false, t2.triads], [true, t2.sevenths]], sevenths, (v) => { sevenths = v; if (watch && !params.watch?.includes(watch)) watch = null; paint(); }),
    ...(params.watch ? [el('span', 'sideb-tap-opt-label', t2.watch), chips(params.watch.map((w) => [w, w]), watch, (w) => { watch = w; paint(); })] : []),
    grid, note,
  );
  host.appendChild(box);
  paint();
  return { box };
}

/**
 * 和声进行槽位：每个槽位标着功能（T / PD / D），有几个可选的和弦（四部 MIDI），可以整句播放；presets 一键套用
 * params：{ slots: [{ fn, options: [{ label, notes: [b, t, a, s] }] }], presets?: [{ label, picks, explain? }], gap? }
 */
export function progressionToy(host, params = {}, { playChord } = {}) {
  const t2 = C2();
  const picks = params.slots.map(() => 0);
  let stopAudio = () => {};
  const box = el('div', 'sideb-toy sideb-toy-prog');
  const row = el('div', 'sideb-toy-slots');
  const note = el('p', 'sideb-toy-note-line');
  const paint = () => {
    row.replaceChildren();
    params.slots.forEach((slot, i) => {
      const cell = el('div', `sideb-toy-slot fn-${slot.fn || 'x'}`);
      cell.appendChild(el('span', 'sideb-toy-fn', slot.fn ? tx(slot.fnLabel) || slot.fn : ''));
      slot.options.forEach((o, k) => {
        const b = btn(`sideb-chip${picks[i] === k ? ' is-on' : ''}`, tx(o.label), () => { picks[i] = k; note.textContent = tx(o.note) || ''; paint(); playChord?.(o.notes.map(hz), 1.0); });
        cell.appendChild(b);
      });
      row.appendChild(cell);
    });
  };
  const playAll = btn('learn-btn ghost', t2.playAll, () => { stopAudio(); stopAudio = playAudio({ chords: params.slots.map((s, i) => s.options[picks[i]].notes), gap: params.gap || 850 }, playChord); });
  box.append(...(params.presets ? [chips(params.presets.map((p, i) => [i, tx(p.label)]), -1, (i) => { params.presets[i].picks.forEach((k, j) => { picks[j] = k; }); note.textContent = tx(params.presets[i].explain) || ''; paint(); })] : []), row, playAll, note);
  host.appendChild(box);
  paint();
  return { box, destroy: () => stopAudio() };
}

/** 新黎曼变换：P / L / R 各动一个音、保留两个共同音；显示哪个音动了几个半音  ref:omt2e-neo-riemannian */
export function plrToy(host, params = {}, { playChord } = {}) {
  const t2 = C2();
  const PCN = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
  let chord = { root: 0, major: true };
  let voices = [60, 64, 67];
  const trail = [];
  const box = el('div', 'sideb-toy sideb-toy-plr');
  const now = el('p', 'sideb-toy-score');
  const moved = el('p', 'sideb-toy-note-line');
  const hist = el('p', 'sideb-toy-trail');
  const pcsOf = (c) => (c.major ? [0, 4, 7] : [0, 3, 7]).map((x) => (c.root + x) % 12);
  const label = (c) => `${PCN[c.root]}${c.major ? '' : 'm'}`;
  const apply = (op) => {
    const r = chord.root;
    const next = chord.major
      ? { P: { root: r, major: false }, R: { root: (r + 9) % 12, major: false }, L: { root: (r + 4) % 12, major: false } }[op]
      : { P: { root: r, major: true }, R: { root: (r + 3) % 12, major: true }, L: { root: (r + 8) % 12, major: true } }[op];
    const target = pcsOf(next);
    // 每个声部走到最近的新和弦音，共同音不动
    const used = new Set();
    const lines = [];
    voices = voices.map((v) => {
      const pc = v % 12;
      if (target.includes(pc) && !used.has(pc)) { used.add(pc); return v; }
      const free = target.filter((x) => !used.has(x) && !voices.some((w) => w % 12 === x));
      const best = free.map((x) => { let d = x - pc; if (d > 6) d -= 12; if (d < -6) d += 12; return [x, d]; }).sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0];
      used.add(best[0]);
      lines.push(t2.moved(PCN[pc], PCN[best[0]], best[1]));
      return v + best[1];
    });
    trail.push(`${op}`);
    chord = next;
    moved.textContent = `${op}：${lines.join('；')}`;
    paint();
    playChord?.(voices.map(hz), 1.1);
  };
  const paint = () => { now.textContent = label(chord); hist.textContent = trail.length ? `C → ${trail.join(' → ')}` : ''; };
  const ops = el('div', 'sideb-toy-actions');
  ['P', 'L', 'R'].forEach((op) => ops.appendChild(btn('learn-btn ghost', op, () => apply(op))));
  ops.appendChild(btn('sideb-chip', t2.reset, () => { chord = { root: 0, major: true }; voices = [60, 64, 67]; trail.length = 0; moved.textContent = ''; paint(); }));
  box.append(now, ops, moved, hist);
  host.appendChild(box);
  paint();
  return { box };
}

/** 近关系调：五度圈上标出一个大调的六个近关系调  ref:wiki-closely-related ref:wiki-circle-of-fifths */
export function keyRelToy(host, params = {}, { renderVisual } = {}) {
  const t2 = C2();
  const CIRCLE = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭', 'F'];
  const MINOR = ['A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'B♭', 'F', 'C', 'G', 'D'];
  let i = 0;
  const box = el('div', 'sideb-toy sideb-toy-keyrel');
  const pic = el('div');
  const list = el('p', 'sideb-toy-note-line');
  const paint = () => {
    const at = (k) => (k + 12) % 12;
    const majors = [CIRCLE[at(i - 1)], CIRCLE[at(i + 1)]];
    const minors = [MINOR[i], MINOR[at(i - 1)], MINOR[at(i + 1)]];
    const v = renderVisual?.({ kind: 'circle', highlight: [CIRCLE[i], ...majors], inner: minors });
    pic.replaceChildren(...(v ? [v] : []));
    list.textContent = `${CIRCLE[i]}：IV = ${majors[0]}，V = ${majors[1]}，vi = ${MINOR[i]}m，ii = ${MINOR[at(i - 1)]}m，iii = ${MINOR[at(i + 1)]}m，i = ${CIRCLE[i]}m`;
  };
  box.append(chips(CIRCLE.map((k, j) => [j, k]), i, (j) => { i = j; paint(); }), pic, list, el('p', 'sideb-toy-meta', t2.relNote));
  host.appendChild(box);
  paint();
  return { box };
}

// ================= 第 3 章的实验 =================
const CH3_TEXT = {
  zh: {
    instrument: '乐器', written: '谱面上写', concert: '实际发音', concertKey: '实音的调', writtenKeyIs: (k, n) => `谱面要写 ${k} 大调（${n}）`, sig: (n) => (n === 0 ? '没有升降号' : n > 0 ? `${n} 个升号` : `${-n} 个降号`),
    down: '低', up: '高', same: '不移调', interval: { M2: '大二度', M6: '大六度', P5: '纯五度', m3: '小三度', M9: '大九度', M13: '大十三度', P8: '八度', P1: '同度' },
    root: '和弦', shape: '形', all: '五个形', shift: (n) => (n ? `整体上移 ${n} 品` : '开放把位'), strings: '弦', fret: '品',
    approach: '怎么进来', leave: '怎么离开', moves: { up: '级进上行', down: '级进下行', leapUp: '跳进上行', leapDown: '跳进下行', same: '同音保持' },
    none: '这一组合不在常见非和弦音的表里（两头都要和弦音、中间是装饰）。',
    interval2: '与定旋律的音程', species: (n) => `第 ${['', '一', '二', '三', '四'][n]} 类`, cantus: '定旋律', counterpoint: '对位',
    canonInterval: '答句的音程', delay: '晚几拍进入', type: '模仿方式', types: { diatonic: '自由（按音阶）', strict: '严格（按半音）', inversion: '倒影' }, beats: (n) => `${n} 拍`,
    check: (d, p) => (d || p ? `拍上的不协和 ${d} 处 · 平行五 / 八度 ${p} 处` : '拍上全部协和，也没有平行五 / 八度'), leader: '导句', follower: '答句',
  },
  ja: {
    instrument: '楽器', written: '譜面の音', concert: '実音', concertKey: '実音の調', writtenKeyIs: (k, n) => `譜面は ${k} 長調（${n}）`, sig: (n) => (n === 0 ? '調号なし' : n > 0 ? `♯ ${n} つ` : `♭ ${-n} つ`),
    down: '下', up: '上', same: '移調なし', interval: { M2: '長 2 度', M6: '長 6 度', P5: '完全 5 度', m3: '短 3 度', M9: '長 9 度', M13: '長 13 度', P8: 'オクターヴ', P1: '同度' },
    root: '和音', shape: 'フォーム', all: '5 つのフォーム', shift: (n) => (n ? `${n} フレット上へ平行移動` : '開放ポジション'), strings: '弦', fret: 'フレット',
    approach: '入り方', leave: '出方', moves: { up: '順次上行', down: '順次下行', leapUp: '跳躍上行', leapDown: '跳躍下行', same: '同音保持' },
    none: 'この組み合わせはよくある非和声音の表にない（両端は和声音、真ん中が装飾）。',
    interval2: '定旋律との音程', species: (n) => `第 ${n} 類`, cantus: '定旋律', counterpoint: '対旋律',
    canonInterval: '後続声部の音程', delay: '何拍遅れて入るか', type: '模倣の仕方', types: { diatonic: '自由（音階どおり）', strict: '厳格（半音どおり）', inversion: '反行' }, beats: (n) => `${n} 拍`,
    check: (d, p) => (d || p ? `拍上の不協和 ${d} か所・平行 5／8 度 ${p} か所` : '拍上はすべて協和、平行 5／8 度もなし'), leader: '先行声部', follower: '後続声部',
  },
  en: {
    instrument: 'Instrument', written: 'Written', concert: 'Sounds', concertKey: 'Concert key', writtenKeyIs: (k, n) => `the part is written in ${k} major (${n})`, sig: (n) => (n === 0 ? 'no sharps or flats' : n > 0 ? `${n} sharp${n > 1 ? 's' : ''}` : `${-n} flat${n < -1 ? 's' : ''}`),
    down: 'down', up: 'up', same: 'non-transposing', interval: { M2: 'major 2nd', M6: 'major 6th', P5: 'perfect 5th', m3: 'minor 3rd', M9: 'major 9th', M13: 'major 13th', P8: 'octave', P1: 'unison' },
    root: 'Chord', shape: 'Shape', all: 'All five shapes', shift: (n) => (n ? `moved up ${n} fret${n > 1 ? 's' : ''}` : 'open position'), strings: 'string', fret: 'fret',
    approach: 'Approached by', leave: 'Left by', moves: { up: 'step up', down: 'step down', leapUp: 'leap up', leapDown: 'leap down', same: 'held note' },
    none: 'This combination is not one of the common embellishing tones (chord tones on both ends, decoration in the middle).',
    interval2: 'Interval with the cantus', species: (n) => `Species ${n}`, cantus: 'Cantus', counterpoint: 'Counterpoint',
    canonInterval: 'Follower’s interval', delay: 'Entry delay', type: 'Imitation', types: { diatonic: 'Free (diatonic)', strict: 'Strict (exact)', inversion: 'Inversion' }, beats: (n) => `${n} beat${n > 1 ? 's' : ''}`,
    check: (d, p) => (d || p ? `${d} dissonance(s) on the beat · ${p} parallel fifth(s)/octave(s)` : 'Consonant on every beat, no parallel fifths or octaves'), leader: 'Leader', follower: 'Follower',
  },
};
const C3 = () => CH3_TEXT[lang()];
const prettyAcc = (name) => String(name).replace(/#/g, '♯').replace(/b(?=\d|$)/g, '♭');
const asciiAcc = (name) => String(name).replace(/♯/g, '#').replace(/♭/g, 'b');

const INSTRUMENT_NAMES = {
  'clarinet-bb': t('单簧管（B♭）', 'クラリネット（B♭）', 'Clarinet in B♭'), 'trumpet-bb': t('小号（B♭）', 'トランペット（B♭）', 'Trumpet in B♭'),
  'sax-soprano': t('高音萨克斯', 'ソプラノ・サックス', 'Soprano sax'), 'sax-alto': t('中音萨克斯（E♭）', 'アルト・サックス（E♭）', 'Alto sax (E♭)'),
  'sax-tenor': t('次中音萨克斯（B♭）', 'テナー・サックス（B♭）', 'Tenor sax (B♭)'), 'sax-baritone': t('上低音萨克斯（E♭）', 'バリトン・サックス（E♭）', 'Baritone sax (E♭)'),
  horn: t('圆号（F）', 'ホルン（F）', 'Horn in F'), 'cor-anglais': t('英国管（F）', 'イングリッシュ・ホルン（F）', 'English horn (F)'), 'clarinet-eb': t('降 E 单簧管', 'E♭ クラリネット', 'E♭ clarinet'),
  guitar: t('吉他', 'ギター', 'Guitar'), 'double-bass': t('低音提琴', 'コントラバス', 'Double bass'), piccolo: t('短笛', 'ピッコロ', 'Piccolo'), glockenspiel: t('钟琴', 'グロッケンシュピール', 'Glockenspiel'), flute: t('长笛', 'フルート', 'Flute'),
};
/** 移调乐器：选乐器和谱面上的音，看实际发音；选实音的调，看谱面要写什么调  ref:ibmt-transposition ref:wiki-transposing */
export function transposeToy(host, params = {}, { playChord, renderVisual } = {}) {
  const t3 = C3();
  const ids = params.instruments || ['clarinet-bb', 'trumpet-bb', 'sax-alto', 'sax-tenor', 'horn', 'clarinet-eb', 'guitar', 'double-bass', 'piccolo'];
  const state = { id: ids[0], written: 'D', acc: 0, key: params.keys?.[0] || 'F' };
  const box = el('div', 'sideb-toy sideb-toy-transpose');
  const out = el('div', 'sideb-toy-sheet');
  const staff = el('div', 'sideb-toy-staff');
  const paint = () => {
    const written = `${state.written}${state.acc === 1 ? '#' : state.acc === -1 ? 'b' : ''}4`;
    const concert = writtenToConcert(state.id, written);
    const iv = transpositionInterval(state.id);
    const ivText = iv.direction === 'none' ? t3.same : `${iv.direction === 'down' ? t3.down : t3.up}${t3.interval[iv.name] || iv.name}`;
    const wk = writtenKey(state.id, state.key);
    out.replaceChildren(
      el('p', '', `${t3.written} ${prettyAcc(written)} → ${t3.concert} ${prettyAcc(concert.name)}（${ivText}）`),
      el('p', 'sideb-toy-score', `${t3.concertKey} ${prettyAcc(state.key)} → ${t3.writtenKeyIs(prettyAcc(wk.tonic), t3.sig(wk.fifths))}`),
    );
    const pic = renderVisual?.({ kind: 'notation', staves: [{ clef: concert.midi < 57 ? 'bass' : 'treble' }], notes: [{ p: asciiAcc(written), d: 'w', col: 0 }, { p: asciiAcc(concert.name), d: 'w', col: 1, lit: true }], cols: 2 });
    staff.replaceChildren(...(pic ? [pic] : []));
    box.dataset.concert = concert.midi;
    box.dataset.result = `${written}>${concert.name}|${state.key}>${wk.tonic}`;
  };
  const play = btn('learn-btn ghost', TT().play, () => playChord?.([hz(Number(box.dataset.concert))], 1.2));
  box.append(
    el('span', 'sideb-tap-opt-label', t3.instrument), chips(ids.map((id) => [id, tx(INSTRUMENT_NAMES[id]) || id]), state.id, (id) => { state.id = id; paint(); }),
    el('span', 'sideb-tap-opt-label', t3.written), chips(L7.map((l) => [l, l]), state.written, (l) => { state.written = l; paint(); }),
    chips([-1, 0, 1].map((a) => [a, ACC_TEXT[a] || '♮']), state.acc, (a) => { state.acc = a; paint(); }),
    el('span', 'sideb-tap-opt-label', t3.concertKey), chips((params.keys || ['F', 'C', 'Bb', 'Eb', 'G', 'D']).map((k) => [k, prettyAcc(k)]), state.key, (k) => { state.key = k; paint(); }),
    out, staff, play,
  );
  host.appendChild(box);
  paint();
  return { box };
}

/** CAGED：一个大三和弦在指板上的五个形，按 C→A→G→E→D 首尾相接  ref:agt-caged ref:wiki-standard-tuning */
export function fretToy(host, params = {}, { playChord } = {}) {
  const t3 = C3();
  const roots = params.roots || ['C', 'D', 'E', 'F', 'G', 'A'];
  const state = { root: roots[0], shape: 'all' };
  const box = el('div', 'sideb-toy sideb-toy-fret');
  const board = el('div', 'sideb-toy-board');
  const out = el('p', 'sideb-toy-note-line');
  const NS = 'http://www.w3.org/2000/svg';
  const svg = (tag, attrs) => { const n = document.createElementNS(NS, tag); Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v)); return n; };
  const FRETS = 15; const W = 24 + FRETS * 34; const gap = 16; const H = 6 * gap + 22;
  const xOf = (f) => (f === 0 ? 14 : 24 + (f - 0.5) * 34); const yOf = (s) => 10 + (5 - s) * gap;
  const paint = () => {
    const shapes = state.shape === 'all' ? CAGED_ORDER : [state.shape];
    const voicings = shapes.map((id) => { const v = cagedVoicing(state.root, id); return v.shift > 12 ? cagedVoicing(state.root, id, -1) : v; });
    const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'sideb-fret-svg', role: 'img', 'aria-label': `${state.root} CAGED` });
    for (let f = 0; f <= FRETS; f += 1) root.appendChild(svg('line', { x1: 24 + f * 34, x2: 24 + f * 34, y1: yOf(5), y2: yOf(0), class: f === 0 ? 'sideb-fret-nut' : 'sideb-fret-wire' }));
    [3, 5, 7, 9, 12, 15].forEach((f) => { const tx2 = svg('text', { x: xOf(f), y: H - 2, 'text-anchor': 'middle', class: 'sideb-fret-num' }); tx2.textContent = f; root.appendChild(tx2); });
    for (let st = 0; st < 6; st += 1) root.appendChild(svg('line', { x1: 24, x2: W - 2, y1: yOf(st), y2: yOf(st), class: 'sideb-fret-string' }));
    voicings.forEach((v) => v.notes.forEach((n) => {
      if (n.fret < 0 || n.fret > FRETS) return;
      const g = svg('g', { class: `sideb-fret-dot shape-${v.shape}${n.label === 'R' ? ' is-root' : ''}` });
      g.appendChild(svg('circle', { cx: xOf(n.fret), cy: yOf(n.string), r: 7 }));
      const lab = svg('text', { x: xOf(n.fret), y: yOf(n.string) + 3, 'text-anchor': 'middle' }); lab.textContent = n.label; g.appendChild(lab);
      root.appendChild(g);
    }));
    board.replaceChildren(root);
    out.textContent = voicings.map((v) => `${v.shape} ${t3.shape}：${t3.shift(v.shift)}`).join(' · ');
    box.dataset.voicings = voicings.map((v) => `${v.shape}:${v.shift}`).join(',');
    if (state.shape !== 'all') playChord?.(voicings[0].notes.map((n) => hz(n.midi)), 1.4);
  };
  box.append(
    el('span', 'sideb-tap-opt-label', t3.root), chips(roots.map((r) => [r, r]), state.root, (r) => { state.root = r; paint(); }),
    el('span', 'sideb-tap-opt-label', t3.shape), chips([['all', t3.all], ...CAGED_ORDER.map((id) => [id, id])], state.shape, (id) => { state.shape = id; paint(); }),
    board, out,
  );
  host.appendChild(box);
  paint();
  return { box };
}

/** 非和弦音：选"怎么进来、怎么离开"，看它是哪一种，并在 C 大三和弦上听  ref:omt2e-embellishing */
const NCT_TABLE = {
  'up|up': { name: t('经过音（PT）', '経過音（PT）', 'Passing tone (PT)'), notes: [64, 65, 67], chords: [[48, 55], [48, 55], [48, 55]] },
  'down|down': { name: t('经过音（PT）', '経過音（PT）', 'Passing tone (PT)'), notes: [67, 65, 64], chords: [[48, 55], [48, 55], [48, 55]] },
  'up|down': { name: t('上辅助音（NT，上邻音）', '上方刺繍音（NT）', 'Upper neighbour (NT)'), notes: [64, 65, 64], chords: [[48, 55], [48, 55], [48, 55]] },
  'down|up': { name: t('下辅助音（NT，下邻音）', '下方刺繍音（NT）', 'Lower neighbour (NT)'), notes: [64, 62, 64], chords: [[48, 55], [48, 55], [48, 55]] },
  'leapUp|down': { name: t('倚音（APP）：跳进进来、反向级进离开，通常在较强的位置', '倚音（APP）：跳躍で入り反対方向へ順次で出る、ふつう強い位置', 'Appoggiatura (APP): leap in, step out the other way, usually on the stronger beat'), notes: [60, 65, 64], chords: [[48, 55], [48, 55], [48, 55]] },
  'leapDown|up': { name: t('倚音（APP）：跳进进来、反向级进离开', '倚音（APP）：跳躍で入り反対方向へ順次で出る', 'Appoggiatura (APP): leap in, step out the other way'), notes: [67, 62, 64], chords: [[48, 55], [48, 55], [48, 55]] },
  'up|leapDown': { name: t('逃音（ET）：级进进来、反向跳进离开，通常在较弱的位置', '逸音（ET）：順次で入り反対方向へ跳躍で出る、ふつう弱い位置', 'Escape tone (ET): step in, leap out the other way, usually on the weaker beat'), notes: [64, 65, 60], chords: [[48, 55], [48, 55], [48, 55]] },
  'down|leapUp': { name: t('逃音（ET）：级进进来、反向跳进离开', '逸音（ET）：順次で入り反対方向へ跳躍で出る', 'Escape tone (ET): step in, leap out the other way'), notes: [64, 62, 67], chords: [[48, 55], [48, 55], [48, 55]] },
  'same|down': { name: t('延留音（SUS，挂留）：保持过来、级进下行解决，在较强的位置', '掛留音（SUS）：保持して入り、順次下行で解決、強い位置', 'Suspension (SUS): held over, resolved down by step, on the stronger beat'), notes: [65, 65, 64], chords: [[41, 57], [48, 55], [48, 55]] },
  'same|up': { name: t('上行延留音（RET）：保持过来、级进上行解决', 'リターデイション（RET）：保持して入り、順次上行で解決', 'Retardation (RET): held over, resolved up by step'), notes: [71, 71, 72], chords: [[43, 55], [48, 55], [48, 55]] },
};
export function nctToy(host, params = {}, { playChord } = {}) {
  const t3 = C3();
  const state = { in: 'up', out: 'up' };
  let timers = [];
  const box = el('div', 'sideb-toy sideb-toy-nct');
  const out = el('div', 'sideb-toy-sheet');
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  const play = () => {
    stop();
    const hit = NCT_TABLE[`${state.in}|${state.out}`];
    if (!hit) return;
    hit.notes.forEach((m, i) => timers.push(setTimeout(() => playChord?.([...hit.chords[i], m].map(hz), 0.6, { interrupt: i === 0 }), i * 620)));
  };
  const paint = () => {
    const hit = NCT_TABLE[`${state.in}|${state.out}`];
    out.replaceChildren(hit ? el('p', 'sideb-toy-score', tx(hit.name)) : el('p', '', t3.none), ...(hit ? [el('p', '', hit.notes.map(prettyName).join(' – '))] : []));
    box.dataset.nct = hit ? tx(hit.name).split(/[（(]/)[0] : '';
  };
  const moves = (list) => list.map((k) => [k, t3.moves[k]]);
  box.append(
    el('span', 'sideb-tap-opt-label', t3.approach), chips(moves(['up', 'down', 'leapUp', 'leapDown', 'same']), state.in, (k) => { state.in = k; paint(); play(); }),
    el('span', 'sideb-tap-opt-label', t3.leave), chips(moves(['up', 'down', 'leapUp', 'leapDown']), state.out, (k) => { state.out = k; paint(); play(); }),
    out, btn('learn-btn ghost', TT().play, play),
  );
  host.appendChild(box);
  paint();
  return { box, destroy: stop };
}

/**
 * 类别对位调音台：定旋律固定，对位的每个音可以按 C 大调音阶上下移动；评分沿用 lab_checks.checkSpecies（与实操同一套规则）
 * params：{ species: 1 | 4, cantus: ['C3', …], start: [...]（第一类：每小节一个音；第四类：每个弱拍的音，最后一小节固定为 C4） }
 */
export function speciesToy(host, params, { playChord, onSolved } = {}) {
  const t = T(); const t3 = C3();
  const species = params.species || 1;
  const cantus = params.cantus;
  let line = [...params.start];
  let solved = false; let stopAudio = () => {};
  const box = el('div', 'sideb-toy sideb-toy-species');
  const grid = el('div', 'sideb-toy-voices');
  const sheet = el('div', 'sideb-toy-sheet');
  sheet.setAttribute('aria-live', 'polite');
  const toMidi = (p) => 12 * (Number(p.slice(-1)) + 1) + LETTER_PCS[p[0]];
  const ev = (p, duration, tie = false) => (p ? { rest: false, duration, dots: 0, tie, notes: [{ ...spellMidi(toMidi(p)), cents: 0 }] } : { rest: true, duration, dots: 0, tie: false, notes: [] });
  const events = () => (species === 4
    ? [ev(null, 'h'), ev(line[0], 'h', true), ...line.slice(1).flatMap((y, i) => [ev(line[i], 'h'), ev(y, 'h', i < line.length - 2)]), ev('C4', 'w')]
    : line.map((p) => ev(p, 'w')));
  const submission = () => ({ key: 0, meter: [4, 4], clef: 'grand', voices: [events(), cantus.map((p) => ev(p, 'w'))] });
  const audio = () => {
    // 每半个小节一个时间点：定旋律每小节一个音，对位按类别
    const cp = species === 4 ? [null, line[0], ...line.slice(1).flatMap((y, i) => [line[i], y]), 'C4', 'C4'] : line.flatMap((p) => [p, p]);
    return { chords: cantus.flatMap((c, i) => [0, 1].map((h) => [toMidi(c), ...(cp[2 * i + h] ? [toMidi(cp[2 * i + h])] : [])])), gap: 480 };
  };
  const paint = () => {
    const result = checkSpecies(submission(), { species, cantus });
    grid.replaceChildren();
    grid.style.setProperty('--cols', line.length);
    grid.appendChild(el('span', 'sideb-toy-corner'));
    line.forEach((_, i) => grid.appendChild(el('span', 'sideb-toy-head', species === 4 ? `${i + 1}–${i + 2}` : `${i + 1}`)));
    grid.appendChild(el('span', 'sideb-toy-part', t3.counterpoint));
    line.forEach((p, i) => {
      const cell = el('span', 'sideb-toy-cell');
      const move = (dir) => { const m = stepIn(toMidi(line[i]), dir, 0); if (m < 55 || m > 79) return; line[i] = midiName(m); paint(); };
      const fixed = species === 4 && i >= line.length - 2;
      const up = btn('sideb-toy-step', '▲', () => move(1)); const down = btn('sideb-toy-step', '▼', () => move(-1));
      up.disabled = fixed; down.disabled = fixed;
      up.setAttribute('aria-label', `${t3.counterpoint} ${i + 1} ${t.up}`); down.setAttribute('aria-label', `${t3.counterpoint} ${i + 1} ${t.down}`);
      cell.append(up, el('span', 'sideb-toy-note', p), down);
      grid.appendChild(cell);
    });
    grid.appendChild(el('span', 'sideb-toy-part', t3.cantus));
    line.forEach((_, i) => grid.appendChild(el('span', 'sideb-toy-cell is-fixed', species === 4 ? cantus[i + 1] : cantus[i])));
    sheet.replaceChildren();
    const head = el('p', 'sideb-toy-score');
    head.append(el('span', '', t.score), el('strong', '', `${result.score}/100`));
    sheet.appendChild(head);
    const lines = result.items.flatMap((it) => it.deductions.filter((d) => d.points > 0).map((d) => `−${Math.round(d.points * 10) / 10} ${tx(d.text)}`));
    const ul = el('ul', 'sideb-toy-issues');
    lines.slice(0, 6).forEach((text) => ul.appendChild(el('li', 'is-minus', text)));
    if (!lines.length) ul.appendChild(el('li', 'is-good', t.solved));
    sheet.appendChild(ul);
    if (!solved && result.score === 100) { solved = true; onSolved?.(result); }
    box.dataset.score = result.score;
  };
  const bar = el('div', 'sideb-toy-actions');
  bar.append(btn('learn-btn ghost', t.play, () => { stopAudio(); stopAudio = playAudio(audio(), playChord); }));
  box.append(el('p', 'sideb-toy-note-line', t3.species(species)), grid, bar, sheet);
  host.appendChild(box);
  paint();
  return { box, get line() { return line; }, set: (next) => { line = [...next]; paint(); }, destroy: () => stopAudio() };
}

/** 卡农：同一条导句，换答句的音程、进入时间与模仿方式，听它们叠在一起，并数拍上的不协和与平行  ref:wiki-canon ref:omt-intervals */
export function canonToy(host, params = {}, { playChord } = {}) {
  const t3 = C3();
  const leader = params.leader.map(([midi, beats]) => (midi === null ? { rest: true, beats } : { midi, beats }));
  const state = { steps: params.steps?.[0] ?? 0, delay: params.delays?.[0] ?? 8, type: 'diatonic' };
  let timers = [];
  const box = el('div', 'sideb-toy sideb-toy-canon');
  const out = el('p', 'sideb-toy-score');
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  const make = () => buildCanon(leader, { key: keyInfo('C'), delay: state.delay, steps: state.steps, type: state.type, voices: params.voices || 2 });
  const paint = () => {
    const canon = make();
    const { issues } = checkCanon(canon);
    const d = issues.filter((i) => i.rule === 'dissonance').length;
    const p = issues.filter((i) => /parallel/.test(i.rule)).length;
    out.textContent = t3.check(d, p);
    box.dataset.issues = `${d},${p}`;
  };
  const play = () => {
    stop();
    const { events } = canonEvents(make());
    const beatMs = 60000 / (params.bpm || 120);
    events.forEach((e, i) => timers.push(setTimeout(() => playChord?.([hz(e.midi)], (e.duration * beatMs) / 1000, { interrupt: i === 0 }), e.beat * beatMs)));
  };
  const IV = { 0: t('同度', '同度', 'unison'), '-7': t('低八度', '8 度下', 'octave below'), 7: t('高八度', '8 度上', 'octave above'), 4: t('高五度', '5 度上', 'fifth above'), '-3': t('低四度', '4 度下', 'fourth below'), '-4': t('低五度', '5 度下', 'fifth below'), 2: t('高三度', '3 度上', 'third above') };
  box.append(
    el('span', 'sideb-tap-opt-label', t3.canonInterval), chips((params.steps || [0, -7, 4, -3]).map((k) => [k, tx(IV[k])]), state.steps, (k) => { state.steps = k; paint(); }),
    el('span', 'sideb-tap-opt-label', t3.delay), chips((params.delays || [8, 4, 2]).map((k) => [k, t3.beats(k)]), state.delay, (k) => { state.delay = k; paint(); }),
    el('span', 'sideb-tap-opt-label', t3.type), chips(Object.entries(t3.types).map(([k, v]) => [k, v]), state.type, (k) => { state.type = k; paint(); }),
    out, btn('learn-btn ghost', TT().play, play),
  );
  host.appendChild(box);
  paint();
  return { box, destroy: stop };
}

// ================= 第 4 章的实验 =================
const CH4_TEXT = {
  zh: {
    ratio: '长短比例', ratios: { '1:1': '直八分 1:1', '3:2': '轻摇摆 3:2', '2:1': '三连音摇摆 2:1', '3:1': '附点 3:1' }, backbeat: '反拍（2、4 拍）', on: '开', off: '关',
    swingNote: (r) => `每拍的第二个八分音符落在拍子的 ${r} 处`,
    form: '形式', forms: { basic: '基本', quick: '快四（第 2 小节 IV）', turn: '结尾转回 V', minor: '小调布鲁斯' }, phrase: (n) => `第 ${n} 句`, bar: '小节',
    scale: '音阶', blues: '布鲁斯音阶', major: '大调布鲁斯音阶',
    degree: '调里的和弦', mode: '调式', stack: '叠到十三音', same: '和这个调式的音完全一样',
    prog: '进行', layers: '声部', layerNames: { bass: '低音（根音）', guide: '三音与七音', top: '九音 / 十三音', fifth: '五音' }, low: '整体压低一个八度', upper: '上', lower: '下',
    motion: (n) => `上方声部一共移动 ${n} 个半音`, muddy: '低音区音靠得太近，听起来发浑',
    chordOf: '原和弦', negative: '负和声', axis: (k) => `${k} 调：以 C–G 之间的轴镜像（C↔G、D↔F、E↔E♭、A↔B♭、B↔A♭、F♯↔D♭）`,
  },
  ja: {
    ratio: '長短の比率', ratios: { '1:1': 'ストレート 1:1', '3:2': '軽いスウィング 3:2', '2:1': '3 連スウィング 2:1', '3:1': '付点 3:1' }, backbeat: 'バックビート（2・4 拍）', on: 'オン', off: 'オフ',
    swingNote: (r) => `各拍の 2 つ目の 8 分音符は拍の ${r} の位置`,
    form: '形式', forms: { basic: '基本', quick: 'クイック・チェンジ（2 小節目 IV）', turn: '最後に V へ', minor: 'マイナー・ブルース' }, phrase: (n) => `第 ${n} フレーズ`, bar: '小節',
    scale: '音階', blues: 'ブルース・スケール', major: 'メジャー・ブルース・スケール',
    degree: '調の和音', mode: '旋法', stack: '13th まで積む', same: 'この旋法の音とまったく同じ',
    prog: '進行', layers: '声部', layerNames: { bass: 'バス（ルート）', guide: '3 度と 7 度', top: '9th / 13th', fifth: '5 度' }, low: '全体を 1 オクターヴ下げる', upper: '上', lower: '下',
    motion: (n) => `上声の移動は合計 ${n} 半音`, muddy: '低音域で音が近すぎて濁る',
    chordOf: '元の和音', negative: 'ネガティブ', axis: (k) => `${k} 調：C と G の間の軸で反転（C↔G・D↔F・E↔E♭・A↔B♭・B↔A♭・F♯↔D♭）`,
  },
  en: {
    ratio: 'Long–short ratio', ratios: { '1:1': 'Straight 1:1', '3:2': 'Light swing 3:2', '2:1': 'Triplet swing 2:1', '3:1': 'Dotted 3:1' }, backbeat: 'Backbeat (beats 2 & 4)', on: 'On', off: 'Off',
    swingNote: (r) => `The second eighth of each beat lands ${r} of the way through the beat`,
    form: 'Form', forms: { basic: 'Basic', quick: 'Quick change (IV in bar 2)', turn: 'Turnaround to V', minor: 'Minor blues' }, phrase: (n) => `Phrase ${n}`, bar: 'bar',
    scale: 'Scale', blues: 'Blues scale', major: 'Major blues scale',
    degree: 'Chord in the key', mode: 'Mode', stack: 'Stacked to the 13th', same: 'exactly the notes of this mode',
    prog: 'Progression', layers: 'Voices', layerNames: { bass: 'Bass (root)', guide: '3rds & 7ths', top: '9ths / 13ths', fifth: 'Fifths' }, low: 'Drop everything an octave', upper: 'upper', lower: 'lower',
    motion: (n) => `Upper voices move ${n} half steps in total`, muddy: 'Notes packed close in the low register sound muddy',
    chordOf: 'Chord', negative: 'Negative', axis: (k) => `Key of ${k}: mirrored across the axis between C and G (C↔G, D↔F, E↔E♭, A↔B♭, B↔A♭, F♯↔D♭)`,
  },
};
const C4 = () => CH4_TEXT[lang()];
const PC_FLAT = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];

/** 摇摆：改变每拍两个八分音符的长短比例，打开 / 关闭 2、4 拍的反拍  ref:omt2e-swing */
export function swingToy(host, params = {}, { playChord } = {}) {
  const t4 = C4();
  const state = { ratio: params.ratio || '2:1', backbeat: true };
  let stopAudio = () => {};
  const box = el('div', 'sideb-toy sideb-toy-swing');
  const grid = el('div', 'sideb-toy-swing-grid');
  const note = el('p', 'sideb-toy-note-line');
  const offOf = () => { const [a, b] = state.ratio.split(':').map(Number); return a / (a + b); };
  const paint = () => {
    const off = offOf();
    grid.replaceChildren();
    for (let beat = 0; beat < 4; beat += 1) {
      const cell = el('span', `sideb-swing-beat${state.backbeat && beat % 2 === 1 ? ' is-back' : ''}`);
      const a = el('span', 'sideb-swing-long'); a.style.flexGrow = String(off);
      const b = el('span', 'sideb-swing-short'); b.style.flexGrow = String(1 - off);
      cell.append(a, b);
      grid.appendChild(cell);
    }
    note.textContent = t4.swingNote(`${Math.round(off * 100)}%`);
    box.dataset.off = off.toFixed(3);
  };
  const play = () => {
    stopAudio();
    const off = offOf();
    const ride = []; for (let beat = 0; beat < 8; beat += 1) ride.push(beat, beat + off);
    const tracks = [{ beats: ride, midi: 81 }, ...(state.backbeat ? [{ beats: [1, 3, 5, 7], midi: 50 }] : []), { beats: [0, 2, 4, 6], midi: 36 }];
    stopAudio = playAudio({ rhythm: { bpm: params.bpm || 120, cycle: 8, repeats: 1, tracks } }, playChord);
  };
  box.append(
    el('span', 'sideb-tap-opt-label', t4.ratio), chips(Object.entries(t4.ratios), state.ratio, (r) => { state.ratio = r; paint(); }),
    el('span', 'sideb-tap-opt-label', t4.backbeat), chips([[true, t4.on], [false, t4.off]], state.backbeat, (v) => { state.backbeat = v; paint(); }),
    grid, note, btn('learn-btn ghost', TT().play, play),
  );
  host.appendChild(box);
  paint();
  return { box, destroy: () => stopAudio() };
}

/** 一个和弦的组成（相对根音的半音）：三音、五音、七音，以及上方线条可用的两个延伸音（大七、属七用九音 / 十三音；小七用九音 / 十一音，避免调外的大十三度；半减七用十一音 / 降十三音）  ref:omt2e-jazz-voicings */
const JAZZ_Q = {
  maj7: { sym: 'maj7', t: 4, f: 7, s: 11, n: 2, th: 9 }, m7: { sym: 'm7', t: 3, f: 7, s: 10, n: 2, th: 5 }, 7: { sym: '7', t: 4, f: 7, s: 10, n: 2, th: 9 },
  m7b5: { sym: 'ø7', t: 3, f: 6, s: 10, n: 5, th: 8 }, dim7: { sym: '°7', t: 3, f: 6, s: 9, n: 2, th: 8 },
};
const near = (pc, target) => { let m = target - ((target - pc) % 12 + 12) % 12; if (target - m > 6) m += 12; return m; };
/** 导向音配置：低音弹根音，上方三音、七音一条线一条线地接（每个声部选最近的那个），再在上面加九音 / 十三音的线  ref:omt2e-jazz-voicings */
export function guideVoicing(chords, { low = false } = {}) {
  let a = null; let b = null; let top = null;
  return chords.map(({ root, q }) => {
    const Q = JAZZ_Q[q];
    const third = (root + Q.t) % 12; const seventh = (root + Q.s) % 12;
    if (a === null) { a = near(third, 64); b = near(seventh, a + 6); if (b <= a) b += 12; }
    else {
      const opts = [[third, seventh], [seventh, third]].map(([x, y]) => { const nx = near(x, a); const ny = near(y, b); return { nx, ny, cost: Math.abs(nx - a) + Math.abs(ny - b) }; }).filter((o) => o.nx < o.ny).sort((p, r) => p.cost - r.cost);
      const pick = opts[0] || { nx: near(third, a), ny: near(seventh, a + 6) };
      a = pick.nx; b = pick.ny;
    }
    const nine = (root + Q.n) % 12; const thirteen = (root + Q.th) % 12;
    const cands = [nine, thirteen].map((pc) => { let m = near(pc, top ?? b + 3); while (m <= b) m += 12; return m; });
    top = top === null ? cands[0] : cands.sort((p, r) => Math.abs(p - top) - Math.abs(r - top))[0];
    const shift = low ? -12 : 0;
    const bass = 36 + ((root + 12 - 4) % 12) + 4; // E2–D♯3
    return { bass, guide: [a + shift, b + shift], top: top + shift, fifth: near((root + Q.f) % 12, a - 3) + shift, symbol: `${PC_FLAT[root]}${Q.sym}` };
  });
}

/** 十二小节布鲁斯：几种常见的变化，播放时高亮正在响的小节；下面是布鲁斯音阶  ref:omt2e-blues-harmony ref:wiki-twelve-bar ref:omt2e-blues-scale */
export function bluesToy(host, params = {}, { playChord } = {}) {
  const t4 = C4();
  const key = params.key ?? 0;
  const FORMS = {
    basic: ['I', 'I', 'I', 'I', 'IV', 'IV', 'I', 'I', 'V', 'IV', 'I', 'I'],
    quick: ['I', 'IV', 'I', 'I', 'IV', 'IV', 'I', 'I', 'V', 'IV', 'I', 'I'],
    turn: ['I', 'I', 'I', 'I', 'IV', 'IV', 'I', 'I', 'V', 'IV', 'I', 'V'],
    minor: ['i', 'i', 'i', 'i', 'iv', 'iv', 'i', 'i', 'iiø', 'V', 'i', 'i'],
  };
  const CH = { I: [0, '7'], IV: [5, '7'], V: [7, '7'], i: [0, 'm7'], iv: [5, 'm7'], 'iiø': [2, 'm7b5'] };
  const state = { form: 'basic', scale: 'blues' };
  let timers = [];
  const box = el('div', 'sideb-toy sideb-toy-blues');
  const grid = el('div', 'sideb-toy-blues-grid');
  const scaleRow = el('div', 'sideb-toy-ratios');
  const stop = () => { timers.forEach(clearTimeout); timers = []; grid.querySelectorAll('.is-now').forEach((c) => c.classList.remove('is-now')); };
  const bars = () => FORMS[state.form].map((r) => ({ roman: r, root: (key + CH[r][0]) % 12, q: CH[r][1] }));
  const paint = () => {
    grid.replaceChildren();
    bars().forEach((b, i) => {
      const cell = el('span', `sideb-blues-bar fn-${b.roman.replace('ø', 'h')}`);
      cell.append(el('small', '', String(i + 1)), el('strong', '', `${PC_FLAT[b.root]}${JAZZ_Q[b.q].sym}`), el('span', '', b.roman.replace('iiø', 'iiø7')));
      grid.appendChild(cell);
    });
    const steps = state.scale === 'blues' ? [0, 3, 5, 6, 7, 10] : [0, 2, 3, 4, 7, 9];
    const names = state.scale === 'blues' ? ['do', 'me', 'fa', 'fi', 'sol', 'te'] : ['do', 're', 'ri', 'mi', 'sol', 'la'];
    scaleRow.replaceChildren(...steps.map((s, i) => el('span', `sideb-chip is-static${(state.scale === 'blues' ? i === 3 : i === 2) ? ' is-mark' : ''}`, `${PC_FLAT[(key + s) % 12]} · ${names[i]}`)));
    box.dataset.form = bars().map((b) => b.roman).join(' ');
  };
  const play = () => {
    stop();
    const vs = guideVoicing(bars());
    const ms = (params.bpm ? 60000 / params.bpm : 500) * 2; // 每小节两拍一个和弦，听起来更紧凑
    vs.forEach((v, i) => timers.push(setTimeout(() => {
      grid.querySelectorAll('.is-now').forEach((c) => c.classList.remove('is-now'));
      grid.children[i]?.classList.add('is-now');
      playChord?.([v.bass, ...v.guide, v.top].map(hz), (ms / 1000) * 0.9, { interrupt: i === 0 });
    }, i * ms)));
    timers.push(setTimeout(() => grid.querySelectorAll('.is-now').forEach((c) => c.classList.remove('is-now')), vs.length * ms));
  };
  const playScale = () => { stop(); const steps = state.scale === 'blues' ? [0, 3, 5, 6, 7, 10, 12] : [0, 2, 3, 4, 7, 9, 12]; playAudio({ notes: steps.map((s) => 60 + key + s), mode: 'melody' }, playChord); };
  box.append(
    el('span', 'sideb-tap-opt-label', t4.form), chips(Object.entries(t4.forms), state.form, (f) => { stop(); state.form = f; paint(); }),
    grid, btn('learn-btn ghost', TT().play, play),
    el('span', 'sideb-tap-opt-label', t4.scale), chips([['blues', t4.blues], ['major', t4.major]], state.scale, (s) => { state.scale = s; paint(); }), scaleRow, btn('learn-btn ghost', `${TT().play} · ${t4.scale}`, playScale),
  );
  host.appendChild(box);
  paint();
  return { box, destroy: stop };
}

/** 和弦—音阶：调里每一级的七和弦叠到十三音，正好是从这一级开始的调式  ref:omt2e-chord-scale */
export function chordScaleToy(host, params = {}, { playChord } = {}) {
  const t4 = C4();
  const MODES = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];
  const ROMANS = ['Imaj7', 'ii7', 'iii7', 'IVmaj7', 'V7', 'vi7', 'viiø7'];
  const QS = ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5'];
  const MAJ = [0, 2, 4, 5, 7, 9, 11];
  const L = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const state = { d: params.start ?? 1 };
  let stopAudio = () => {};
  const box = el('div', 'sideb-toy sideb-toy-cst');
  const out = el('div', 'sideb-toy-sheet');
  const notesOf = (d) => [0, 2, 4, 6, 8, 10, 12].map((k) => { const i = d + k; return { name: L[i % 7], midi: 48 + MAJ[i % 7] + 12 * Math.floor(i / 7) }; });
  const paint = () => {
    const stack = notesOf(state.d);
    const scale = [0, 1, 2, 3, 4, 5, 6].map((k) => L[(state.d + k) % 7]);
    out.replaceChildren(
      el('p', '', `${ROMANS[state.d]} = ${L[state.d]}${JAZZ_Q[QS[state.d]].sym}`),
      el('p', '', `${t4.stack}：${stack.map((n) => n.name).join(' ')}`),
      el('p', 'sideb-toy-score', `${t4.mode}：${L[state.d]} ${MODES[state.d]} — ${scale.join(' ')}（${t4.same}）`),
    );
    box.dataset.mode = MODES[state.d];
  };
  const play = () => { stopAudio(); const stack = notesOf(state.d); playChord?.(stack.slice(0, 4).map((n) => hz(n.midi)), 1.2); const scale = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => 60 + MAJ[(state.d + k) % 7] + 12 * Math.floor((state.d + k) / 7) - (state.d > 4 ? 12 : 0)); const timers = scale.map((m, i) => setTimeout(() => playChord?.([hz(m)], 0.35, { interrupt: false }), 1300 + i * 260)); stopAudio = () => timers.forEach(clearTimeout); };
  box.append(el('span', 'sideb-tap-opt-label', `${t4.degree}（C）`), chips(ROMANS.map((r, i) => [i, r]), state.d, (i) => { state.d = i; paint(); }), out, btn('learn-btn ghost', TT().play, play));
  host.appendChild(box);
  paint();
  return { box, destroy: () => stopAudio() };
}

/** 导向音与配置：选进行，打开 / 关闭各声部，听三音—七音一条线怎样连起来；压低八度听"发浑"  ref:omt2e-jazz-voicings */
export function guideToy(host, params = {}, { playChord } = {}) {
  const t4 = C4();
  const PROGS = params.progs || {
    'ii–V–I': [[2, 'm7'], [7, '7'], [0, 'maj7']],
    'iiø–V–i': [[2, 'm7b5'], [7, '7'], [0, 'm7']],
    'V–IV–I': [[7, '7'], [5, '7'], [0, '7']],
    'I–vi–ii–V': [[0, 'maj7'], [9, 'm7'], [2, 'm7'], [7, '7']],
  };
  const state = { prog: Object.keys(PROGS)[0], layers: new Set(params.layers || ['bass', 'guide']), low: false };
  let stopAudio = () => {};
  const box = el('div', 'sideb-toy sideb-toy-guide');
  const table = el('div', 'sideb-toy-voices');
  const out = el('p', 'sideb-toy-note-line');
  const voicings = () => guideVoicing(PROGS[state.prog].map(([root, q]) => ({ root, q })), { low: state.low });
  const notes = (v) => [...(state.layers.has('bass') ? [v.bass] : []), ...(state.layers.has('fifth') ? [v.fifth] : []), ...(state.layers.has('guide') ? v.guide : []), ...(state.layers.has('top') ? [v.top] : [])].sort((x, y) => x - y);
  const paint = () => {
    const vs = voicings();
    table.replaceChildren();
    table.style.setProperty('--cols', vs.length);
    table.appendChild(el('span', 'sideb-toy-corner'));
    vs.forEach((v) => table.appendChild(el('span', 'sideb-toy-head', v.symbol)));
    const rows = [['top', (v) => [v.top]], ['guide', (v) => [v.guide[1]]], ['guide', (v) => [v.guide[0]]], ['fifth', (v) => [v.fifth]], ['bass', (v) => [v.bass]]];
    rows.forEach(([layer, get], r) => {
      if (!state.layers.has(layer)) return;
      table.appendChild(el('span', 'sideb-toy-part', r === 1 || r === 2 ? `${t4.layerNames.guide} · ${r === 1 ? t4.upper : t4.lower}` : t4.layerNames[layer]));
      vs.forEach((v) => table.appendChild(el('span', 'sideb-toy-cell is-fixed', get(v).map(prettyName).join(' '))));
    });
    let motion = 0;
    for (let i = 1; i < vs.length; i += 1) { const a = notes(vs[i - 1]).filter((m) => m !== vs[i - 1].bass); const b = notes(vs[i]).filter((m) => m !== vs[i].bass); a.forEach((m, k) => { if (b[k] !== undefined) motion += Math.abs(b[k] - m); }); }
    const lowest = Math.min(...vs.flatMap((v) => notes(v).filter((m) => m !== v.bass)));
    out.textContent = `${t4.motion(motion)}${state.low && lowest < 52 ? ` · ${t4.muddy}` : ''}`;
    box.dataset.motion = motion;
  };
  const play = () => { stopAudio(); stopAudio = playAudio({ chords: voicings().map(notes), gap: params.gap || 1000 }, playChord); };
  const layerChips = el('div', 'sideb-toy-ratios');
  Object.entries(t4.layerNames).forEach(([k, label]) => {
    const c = btn(`sideb-chip${state.layers.has(k) ? ' is-on' : ''}`, label, () => { if (state.layers.has(k)) state.layers.delete(k); else state.layers.add(k); c.classList.toggle('is-on', state.layers.has(k)); paint(); });
    layerChips.appendChild(c);
  });
  box.append(
    el('span', 'sideb-tap-opt-label', t4.prog), chips(Object.keys(PROGS).map((k) => [k, k]), state.prog, (k) => { state.prog = k; paint(); }),
    el('span', 'sideb-tap-opt-label', t4.layers), layerChips,
    ...(params.lowOption ? [chips([[false, t4.off], [true, t4.low]], false, (v) => { state.low = v; paint(); })] : []),
    table, out, btn('learn-btn ghost', TT().play, play),
  );
  host.appendChild(box);
  paint();
  return { box, destroy: () => stopAudio() };
}

/** 负和声：在 C 大调里把和弦的每个音沿 C–G 之间的轴镜像（音级 p → 7 − p）  ref:wiki-negative-harmony */
export function negativeToy(host, params = {}, { playChord } = {}) {
  const t4 = C4();
  const CHORDS = params.chords || [['C', [0, 4, 7]], ['Dm', [2, 5, 9]], ['Em', [4, 7, 11]], ['F', [5, 9, 0]], ['G', [7, 11, 2]], ['G7', [7, 11, 2, 5]], ['Am', [9, 0, 4]], ['Bdim', [11, 2, 5]]];
  const state = { i: 5 };
  let stopAudio = () => {};
  const box = el('div', 'sideb-toy sideb-toy-negative');
  const out = el('div', 'sideb-toy-sheet');
  const reflect = (p) => ((7 - p) % 12 + 12) % 12;
  const voice = (pcs) => { let prev = 52; return pcs.map((pc) => { let m = 48 + pc; while (m <= prev) m += 12; prev = m; return m; }); };
  const paint = () => {
    const [name, pcs] = CHORDS[state.i];
    const neg = pcs.map(reflect);
    out.replaceChildren(
      el('p', '', `${t4.chordOf}：${name} — ${pcs.map((p) => PC_FLAT[p]).join(' ')}`),
      el('p', 'sideb-toy-score', `${t4.negative}：${neg.map((p) => PC_FLAT[p]).join(' ')}`),
      el('p', 'sideb-toy-note-line', t4.axis('C')),
    );
    box.dataset.neg = neg.join(',');
  };
  const play = () => { stopAudio(); const [, pcs] = CHORDS[state.i]; stopAudio = playAudio({ chords: [voice(pcs), voice(pcs.map(reflect)).reverse().sort((a, b) => a - b), [48, 64, 67, 72]], gap: 1100 }, playChord); };
  box.append(el('span', 'sideb-tap-opt-label', t4.chordOf), chips(CHORDS.map(([n], i) => [i, n]), state.i, (i) => { state.i = i; paint(); }), out, btn('learn-btn ghost', TT().play, play));
  host.appendChild(box);
  paint();
  return { box, destroy: () => stopAudio() };
}

// ================= 第 5 章的实验 =================
const CH5_TEXT = {
  zh: { gong: '宫音', mode: '调式', type: '音阶', rotate: '旋宫', up: '宫音上移纯五度', down: '宫音下移纯五度', lu: (n) => `宫音的律名：${n}`, sameGong: '同宫系统的五种调式', thaat: 'Thaat', maqam: '木卡姆（Maqam）', altered: (x) => (x.length ? `变化的音：${x.join(' ')}` : '全部是本位音'), western: '对应的西方调式', steps: '相邻音程（以全音为 1）', jins: (a) => `音组（jins）：${a}`, partials: '泛音', presets: { low: '基音 + 前 4 个', eight: '前 8 个', odd: '只有奇数泛音', all: '前 16 个' }, cents: (c) => (Math.abs(c) < 0.5 ? '与平均律一致' : `比平均律${c > 0 ? '高' : '低'} ${Math.abs(c).toFixed(0)} 音分`), temperament: '律制', names: { equal: '十二平均律', pythagorean: '五度相生律（毕达哥拉斯）', meantone: '四分之一音差中全音律', werckmeister3: 'Werckmeister III', vallotti: 'Vallotti' }, root: '大三和弦的根音', thirds: '各调大三度比纯律大三度（5:4）宽多少（音分）', wolf: (c) => `闭合的那个五度（G♯–E♭）：${c.toFixed(1)} 音分${Math.abs(c - 702) > 15 ? '——狼五度' : ''}` },
  ja: { gong: '宮音', mode: '旋法', type: '音階', rotate: '旋宮', up: '宮音を完全 5 度上へ', down: '宮音を完全 5 度下へ', lu: (n) => `宮音の律名：${n}`, sameGong: '同宮系統の 5 つの旋法', thaat: 'ターート', maqam: 'マカーム', altered: (x) => (x.length ? `変化音：${x.join(' ')}` : 'すべて本位音'), western: '対応する西洋の旋法', steps: '隣り合う音程（全音 = 1）', jins: (a) => `ジンス：${a}`, partials: '倍音', presets: { low: '基音 + 4 つ', eight: '8 つ', odd: '奇数倍音だけ', all: '16 個' }, cents: (c) => (Math.abs(c) < 0.5 ? '平均律と一致' : `平均律より ${Math.abs(c).toFixed(0)} セント${c > 0 ? '高い' : '低い'}`), temperament: '音律', names: { equal: '12 平均律', pythagorean: 'ピタゴラス音律', meantone: '1/4 コンマ・ミーントーン', werckmeister3: 'ヴェルクマイスター III', vallotti: 'ヴァロッティ' }, root: '長三和音の根音', thirds: '各調の長 3 度は純正長 3 度（5:4）より何セント広いか', wolf: (c) => `閉じる 5 度（G♯–E♭）：${c.toFixed(1)} セント${Math.abs(c - 702) > 15 ? '——ウルフ' : ''}` },
  en: { gong: 'Gong', mode: 'Mode', type: 'Scale', rotate: 'Rotate the gong', up: 'Gong up a fifth', down: 'Gong down a fifth', lu: (n) => `Pitch name of the gong: ${n}`, sameGong: 'The five modes of this gong system', thaat: 'Thaat', maqam: 'Maqam', altered: (x) => (x.length ? `Altered: ${x.join(' ')}` : 'All natural (shuddha)'), western: 'Western equivalent', steps: 'Steps (whole tone = 1)', jins: (a) => `Ajnas: ${a}`, partials: 'Partials', presets: { low: 'Fundamental + 4', eight: 'First 8', odd: 'Odd partials only', all: 'First 16' }, cents: (c) => (Math.abs(c) < 0.5 ? 'matches equal temperament' : `${Math.abs(c).toFixed(0)} cents ${c > 0 ? 'sharp' : 'flat'} of equal temperament`), temperament: 'Temperament', names: { equal: 'Equal temperament', pythagorean: 'Pythagorean', meantone: 'Quarter-comma meantone', werckmeister3: 'Werckmeister III', vallotti: 'Vallotti' }, root: 'Major-triad root', thirds: 'How much wider than a pure 5:4 third each major third is (cents)', wolf: (c) => `The closing fifth (G♯–E♭): ${c.toFixed(1)} cents${Math.abs(c - 702) > 15 ? ' — a wolf' : ''}` },
};
const C5 = () => CH5_TEXT[lang()];
const noteToMidi = (name, octave = 4) => { const m = /^([A-G])([#b♯♭]?)/.exec(String(name).replace('♯', '#').replace('♭', 'b')); return 12 * (octave + 1) + LETTER_PCS[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0); };

/** 中国七声调式与旋宫：选宫音、调式、音阶种类，看各音的阶名；宫音按五度旋转  ref:zhwiki-heptatonic ref:huain-xuangong */
export function xuangongToy(host, params = {}, { playChord } = {}) {
  const t5 = C5();
  const state = { gong: params.gong || 'C', mode: 'gong', type: params.type || 'qingyue' };
  let stopAudio = () => {};
  const box = el('div', 'sideb-toy sideb-toy-cn');
  const out = el('div', 'sideb-toy-sheet');
  const gongRow = el('div');
  const paint = () => {
    const m = buildChineseMode({ gong: state.gong, mode: state.mode, type: state.type });
    const row = el('div', 'sideb-toy-ratios');
    m.notes.forEach((n) => row.appendChild(el('span', `sideb-chip is-static${n.kind === 'pian' ? ' is-mark' : ''}`, `${prettyAcc(n.note)} · ${n.zh}`)));
    out.replaceChildren(el('p', 'sideb-toy-score', tx(m.name) || m.name), row, el('p', 'sideb-toy-note-line', `${t5.lu(luName(m.gong))}`));
    gongRow.replaceChildren(el('span', 'sideb-tap-opt-label', `${t5.gong}：${prettyAcc(state.gong)}`), btn('sideb-chip', `↓ ${t5.down}`, () => { state.gong = rotateGong(state.gong, -1); paint(); }), btn('sideb-chip', `↑ ${t5.up}`, () => { state.gong = rotateGong(state.gong, 1); paint(); }));
    box.dataset.notes = m.notes.map((n) => `${n.note}:${n.id}`).join(' ');
  };
  const play = () => { stopAudio(); const m = buildChineseMode({ gong: state.gong, mode: state.mode, type: state.type }); const base = noteToMidi(m.tonic, 4); stopAudio = playAudio({ notes: [...m.notes.map((n) => base + n.semitones), base + 12], mode: 'melody' }, playChord); };
  box.append(
    gongRow,
    el('span', 'sideb-tap-opt-label', t5.mode), chips(CN_MODES.map((m) => [m.id, m.zh]), state.mode, (k) => { state.mode = k; paint(); }),
    el('span', 'sideb-tap-opt-label', t5.type), chips(CN_TYPES.filter((x) => ['pentatonic', 'qingyue', 'yayue', 'yanyue'].includes(x.id)).map((x) => [x.id, tx(x)]), state.type, (k) => { state.type = k; paint(); }),
    out, btn('learn-btn ghost', TT().play, play),
  );
  host.appendChild(box);
  paint();
  return { box, destroy: () => stopAudio() };
}

/** thaat 与木卡姆：十个 thaat（以 C 为 Sa），以及按 MaqamWorld 频率播放的木卡姆（含四分之三音）  ref:wiki-thaat ref:maqamworld-jins ref:wiki-arabic-maqam */
export function worldToy(host, params = {}, { playChord } = {}) {
  const t5 = C5();
  const state = { tab: 'thaat', thaat: 'bilaval', maqam: 'rast' };
  let stopAudio = () => {};
  const box = el('div', 'sideb-toy sideb-toy-world');
  const body = el('div');
  const paint = () => {
    body.replaceChildren();
    if (state.tab === 'thaat') {
      const th = THAATS[state.thaat];
      const semis = thaatSemitones(state.thaat);
      const row = el('div', 'sideb-toy-ratios');
      th.svaras.forEach((sv, i) => row.appendChild(el('span', `sideb-chip is-static${['S', 'R', 'G', 'M', 'P', 'D', 'N'].includes(sv) ? '' : ' is-mark'}`, `${sv} · ${PC_FLAT[semis[i]]}`)));
      body.append(chips(Object.keys(THAATS).map((k) => [k, k[0].toUpperCase() + k.slice(1)]), state.thaat, (k) => { state.thaat = k; paint(); }), row,
        el('p', '', t5.altered(thaatAltered(state.thaat))), el('p', 'sideb-toy-note-line', `${t5.western}：${th.western} · raga ${th.raga}`));
      box.dataset.notes = semis.join(',');
    } else {
      const notes = buildMaqam(state.maqam);
      const steps = maqamSteps(notes);
      const row = el('div', 'sideb-toy-ratios');
      notes.forEach((n) => row.appendChild(el('span', `sideb-chip is-static${/hb/.test(n.token) ? ' is-mark' : ''}`, noteLabel(n.token))));
      body.append(chips(['rast', 'bayati', 'hijaz', 'saba', 'nahawand', 'kurd'].map((k) => [k, k[0].toUpperCase() + k.slice(1)]), state.maqam, (k) => { state.maqam = k; paint(); }), row,
        el('p', '', `${t5.steps}：${steps.map((x) => stepLabel(x.quarterTones)).join(' – ')}`), el('p', 'sideb-toy-note-line', t5.jins([...new Set(notes.map((n) => n.jins))].join(' + '))));
      box.dataset.notes = notes.map((n) => n.token).join(' ');
    }
  };
  const play = () => {
    stopAudio();
    const timers = [];
    if (state.tab === 'thaat') { const semis = [...thaatSemitones(state.thaat), 12]; semis.forEach((x, i) => timers.push(setTimeout(() => playChord?.([hz(60 + x)], 0.4, { interrupt: i === 0 }), i * 330))); }
    else buildMaqam(state.maqam).forEach((n, i) => timers.push(setTimeout(() => playChord?.([n.hz], 0.45, { interrupt: i === 0 }), i * 380)));
    stopAudio = () => timers.forEach(clearTimeout);
  };
  box.append(chips([['thaat', t5.thaat], ['maqam', t5.maqam]], state.tab, (k) => { state.tab = k; paint(); }), body, btn('learn-btn ghost', TT().play, play));
  host.appendChild(box);
  paint();
  return { box, destroy: () => stopAudio() };
}

/** 泛音列：基音的整数倍；打开 / 关闭各个泛音，看它和平均律差多少音分，听音色怎么变  ref:wiki-harmonic-series */
export function harmonicsToy(host, params = {}, { playChord } = {}) {
  const t5 = C5();
  const f0 = params.fundamental || 110;
  const on = new Set([1, 2, 3, 4, 5]);
  const box = el('div', 'sideb-toy sideb-toy-harm');
  const grid = el('div', 'sideb-toy-harm-grid');
  const NAMES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
  const info = (n) => { const midi = 69 + 12 * Math.log2((f0 * n) / 440); const near = Math.round(midi); return { name: `${NAMES[((near % 12) + 12) % 12]}${Math.floor(near / 12) - 1}`, cents: (midi - near) * 100 }; };
  const paint = () => {
    grid.replaceChildren();
    for (let n = 1; n <= 16; n += 1) {
      const i = info(n);
      const c = btn(`sideb-harm-cell${on.has(n) ? ' is-on' : ''}${Math.abs(i.cents) > 10 ? ' is-off-et' : ''}`, '', () => { if (on.has(n)) on.delete(n); else on.add(n); paint(); });
      c.append(el('strong', '', String(n)), el('span', '', i.name), el('small', '', `${Math.round(f0 * n)} Hz`));
      c.title = t5.cents(i.cents);
      grid.appendChild(c);
    }
    box.dataset.on = [...on].sort((a, b) => a - b).join(',');
  };
  const preset = (k) => { on.clear(); ({ low: [1, 2, 3, 4, 5], eight: [1, 2, 3, 4, 5, 6, 7, 8], odd: [1, 3, 5, 7, 9, 11, 13, 15], all: Array.from({ length: 16 }, (_, i) => i + 1) })[k].forEach((n) => on.add(n)); paint(); };
  const detail = el('p', 'sideb-toy-note-line', `7 → ${info(7).name}：${t5.cents(info(7).cents)} · 11 → ${info(11).name}：${t5.cents(info(11).cents)}`);
  box.append(
    el('span', 'sideb-tap-opt-label', t5.partials), chips(Object.entries(t5.presets), 'low', preset), grid, detail,
    btn('learn-btn ghost', TT().play, () => playChord?.([...on].sort((a, b) => a - b).map((n) => f0 * n), 2.2)),
  );
  host.appendChild(box);
  paint();
  return { box };
}

/** 律制：选律制，看十二个调的大三度离纯律多远、闭合的五度是不是狼五度，并在这个律制里听大三和弦  ref:wiki-pythagorean ref:wiki-meantone ref:wiki-werckmeister ref:wiki-vallotti */
export function temperToy(host, params = {}, { playChord } = {}) {
  const t5 = C5();
  const ids = params.temperaments || Object.keys(TEMPERAMENTS);
  const state = { id: ids[0], root: 0 };
  const box = el('div', 'sideb-toy sideb-toy-temper');
  const grid = el('div', 'sideb-toy-temper-grid');
  const out = el('p', 'sideb-toy-score');
  const paint = () => {
    const b = buildTemperament(state.id);
    const thirds = majorThirds(b.cents);
    grid.replaceChildren();
    thirds.forEach((th, pc) => {
      const v = th.fromPure;
      const cell = btn(`sideb-temper-cell${pc === state.root ? ' is-on' : ''}`, '', () => { state.root = pc; paint(); play(); });
      cell.style.setProperty('--w', Math.min(1, Math.abs(v) / 25).toFixed(2));
      cell.append(el('strong', '', PC_FLAT[pc]), el('span', '', `${v > 0 ? '+' : ''}${v.toFixed(1)}`));
      grid.appendChild(cell);
    });
    out.textContent = t5.wolf(b.fifths[11].size);
    box.dataset.thirds = thirds.map((x) => x.fromPure.toFixed(1)).join(',');
  };
  const play = () => { const b = buildTemperament(state.id); const r = state.root; playChord?.([0, 4, 7].map((k) => frequencyOf(b.cents, (r + k) % 12, 4 + Math.floor((r + k) / 12))), 1.6); };
  box.append(
    el('span', 'sideb-tap-opt-label', t5.temperament), chips(ids.map((k) => [k, t5.names[k] || k]), state.id, (k) => { state.id = k; paint(); }),
    el('span', 'sideb-tap-opt-label', `${t5.root} · ${t5.thirds}`), grid, out, btn('learn-btn ghost', TT().play, play),
  );
  host.appendChild(box);
  paint();
  return { box };
}

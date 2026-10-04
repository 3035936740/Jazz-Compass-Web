// 和弦进行播放器：输入和弦进行，按速度与拍数循环播放，可移调
// 和弦符号由 jazz_compass.js 的解析器读取；伴奏排列沿用 accompaniment_voicing.js（与布鲁斯、曲式模块相同）
import { parseProgression, progressionEvents, transposeProgression } from './progression.js';
import { parsedAccompaniment } from './accompaniment_voicing.js';
import { el, button, option, field, language, midiToFrequency, crossLink, relatedLinks, midiExportButton, tabs } from './module_kit.js';
import { mountProgressionLibrary } from './prog_library_ui.js?v=20261004-m5';
import { chordSymbolsToVoices, sendToStaff } from './staff_handoff.js?v=20261003-h1';

const EXAMPLES = [
  '| Dm7 G7 | Cmaj7 | % |',
  '| C | Am | F | G |',
  '| Cmaj7 A7 | Dm7 G7 | Em7 A7 | Dm7 G7 |',
  '| C7 | F7 | C7 | % | F7 | % | C7 | A7 | Dm7 | G7 | C7 | G7 |',
];

const TEXT = {
  zh: {
    kicker: '练习', title: '和弦进行播放器',
    intro: '用 | 分隔小节，小节内的和弦平分该小节，% 表示重复上一小节；不写 | 时每个和弦占"每和弦拍数"。可循环播放、移调，点击和弦可在"和弦转换"中查看。',
    progression: '和弦进行', bpm: '速度（BPM）', meter: '每小节拍数', chordBeats: '每和弦拍数（无小节线时）', style: '织体',
    styles: { block: '柱式和弦（每拍）', sustain: '每个和弦长音', arpeggio: '分解和弦（八分音符）', bass: '低音 + 和弦' },
    loop: '循环', play: '► 播放', stop: '■ 停止', up: '移调 +1', down: '移调 −1', examples: '示例',
    errors: (list) => `无法解析：${list.join('、')}`, empty: '请输入和弦进行。', bars: (n, beats) => `${n} 小节 · ${beats} 拍`,
    open: (symbol) => `在和弦转换中查看 ${symbol}`,
  },
  ja: {
    kicker: '練習', title: 'コード進行プレーヤー',
    intro: '| で小節を区切り、小節内のコードは小節を等分します。% は前の小節の繰り返し。| がない場合は各コードが「コードごとの拍数」を占めます。ループ再生と移調ができ、コードをクリックすると「コード変換」で確認できます。',
    progression: 'コード進行', bpm: 'テンポ（BPM）', meter: '1 小節の拍数', chordBeats: 'コードごとの拍数（小節線なし）', style: '伴奏',
    styles: { block: 'ブロック（毎拍）', sustain: 'コードごとに伸ばす', arpeggio: 'アルペジオ（8 分音符）', bass: 'ベース + コード' },
    loop: 'ループ', play: '► 再生', stop: '■ 停止', up: '移調 +1', down: '移調 −1', examples: '例',
    errors: (list) => `解析できません：${list.join('、')}`, empty: 'コード進行を入力してください。', bars: (n, beats) => `${n} 小節 · ${beats} 拍`,
    open: (symbol) => `コード変換で ${symbol} を見る`,
  },
  en: {
    kicker: 'Practice', title: 'Progression player',
    intro: 'Separate bars with |; chords inside a bar share it equally, and % repeats the previous bar. Without bar lines each chord lasts “beats per chord”. Loop, transpose, and click a chord to open it in Chord Conversion.',
    progression: 'Progression', bpm: 'Tempo (BPM)', meter: 'Beats per bar', chordBeats: 'Beats per chord (no bar lines)', style: 'Texture',
    styles: { block: 'Block chords (every beat)', sustain: 'Sustained chords', arpeggio: 'Arpeggio (eighths)', bass: 'Bass + chord' },
    loop: 'Loop', play: '► Play', stop: '■ Stop', up: 'Transpose +1', down: 'Transpose −1', examples: 'Examples',
    errors: (list) => `Could not parse: ${list.join(', ')}`, empty: 'Enter a progression.', bars: (n, beats) => `${n} bars · ${beats} beats`,
    open: (symbol) => `Open ${symbol} in Chord Conversion`,
  },
};

export function mountProgression(target, { playChord, conv }) {
  const lang = language();
  const t = TEXT[lang];
  let timers = [];
  let playing = false;
  const stop = () => {
    timers.forEach(clearTimeout);
    timers = [];
    if (playing) playChord([], 0.01);
    playing = false;
    target.querySelectorAll('.prog-chord.is-playing').forEach((node) => node.classList.remove('is-playing'));
    if (stopButton) stopButton.disabled = true;
  };
  target.addEventListener('toolbox-stop', () => { stop(); library?.stop(); });

  target.replaceChildren();
  // 两个分页：播放器 / 套路和弦进行速查（资料库送来的进行直接填进播放器）
  const modeTabs = tabs(target, [{ id: 'player', label: { zh: '播放器', ja: 'プレーヤー', en: 'Player' }[language()] }, { id: 'library', label: { zh: '套路和弦进行速查', ja: '定番進行の早見表', en: 'Progression library' }[language()] }], (id) => {
    stop();
    library?.stop();
    root.hidden = id !== 'player';
    if (id === 'library' && !library) {
      libraryBox.dataset.mounted = '1';
      library = mountProgressionLibrary(libraryBox, {
        playChord,
        onSendToPlayer: (text, opts = {}) => {
          input.value = text;
          if (opts.bpm) bpm.value = String(opts.bpm);
          if (opts.meter) meter.value = String(opts.meter);
          if (opts.chordBeats) chordBeats.value = String(opts.chordBeats);
          paint();
          modeTabs.select('player');
        },
      });
    }
    libraryBox.hidden = id !== 'library';
  });
  modeTabs.bar.classList.add('prog-mode-tabs');
  let library = null;
  const libraryBox = el('div', 'prog-library');
  libraryBox.hidden = true;
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));

  const input = el('textarea', 'prog-input');
  input.rows = 3;
  input.value = EXAMPLES[0];
  input.spellcheck = false;
  const number = (value, min, max) => { const node = el('input'); node.type = 'number'; node.min = String(min); node.max = String(max); node.value = String(value); return node; };
  const bpm = number(96, 40, 240);
  const meter = number(4, 2, 7);
  const chordBeats = number(4, 1, 8);
  const style = el('select');
  Object.entries(t.styles).forEach(([id, label]) => style.appendChild(option(id, label)));
  const loop = el('input');
  loop.type = 'checkbox';
  loop.checked = true;
  const loopLabel = el('label', 'prog-loop');
  loopLabel.append(loop, document.createTextNode(` ${t.loop}`));
  const controls = el('div', 'mk-controls');
  controls.append(field(t.bpm, bpm), field(t.meter, meter), field(t.chordBeats, chordBeats), field(t.style, style), loopLabel);

  const playButton = button('btn btn-primary btn-sm', t.play, () => play());
  const stopButton = button('btn btn-secondary btn-sm', t.stop, () => stop());
  stopButton.disabled = true;
  const actions = el('div', 'mk-actions');
  actions.append(
    playButton, stopButton,
    button('btn btn-ghost btn-sm', t.down, () => { input.value = transposeProgression(input.value, -1); paint(); }),
    button('btn btn-ghost btn-sm', t.up, () => { input.value = transposeProgression(input.value, 1); paint(); }),
    // 按当前织体导出：低音、和弦分两条音轨
    midiExportButton(() => {
      if (!plan || plan.bad.length) return null;
      const bass = [];
      const chords = [];
      plan.events.forEach((event) => strokes(event).forEach(([at, notes, length]) => notes.forEach((midi) => {
        (midi === event.midi[0] ? bass : chords).push({ beat: event.beat + at, duration: length, midi });
      })));
      return [{ name: 'Bass', notes: bass }, { name: 'Chords', notes: chords }];
    }, 'progression', () => ({ bpm: Number(bpm.value) || 96, meter: [Number(meter.value) || 4, 4] })),
    // 送到五线谱：每个和弦按它占的拍数写成音符
    button('btn btn-ghost btn-sm', ({ zh: '送到五线谱', ja: '五線譜へ送る', en: 'Send to staff' })[language()], () => {
      const current = buildPlan();
      if (!current.events.length || current.bad.length) return;
      sendToStaff({ clef: 'grand', key: 0, meter: [Number(meter.value) || 4, 4], bpm: Number(bpm.value) || 96, voices: chordSymbolsToVoices(current.events.map((e) => ({ symbol: e.symbol, beats: e.beats }))) });
    }),
  );
  const examples = el('div', 'mk-actions');
  examples.appendChild(el('span', 'mk-meta', t.examples));
  EXAMPLES.forEach((text) => examples.appendChild(button('btn btn-ghost btn-sm', text.replace(/\s*\|\s*/g, ' | ').trim(), () => { input.value = text; paint(); })));

  const summary = el('p', 'mk-hint');
  const chart = el('div', 'prog-chart');
  const links = el('div', 'mk-links');
  root.append(head, field(t.progression, input, 'prog-field'), controls, actions, examples, summary, chart, links, relatedLinks(['chord', 'classical', 'cst']));
  target.append(root, libraryBox);
  modeTabs.bar.querySelector('button')?.classList.add('active');
  // 链接参数：#progression?q=lib:4361 打开资料库并查询；其他文字直接填进播放器
  target.addEventListener('toolbox-query', (event) => {
    const q = String(event.detail ?? '');
    if (/^lib:/i.test(q)) { modeTabs.select('library'); library?.query(q.slice(4)); return; }
    if (q) { modeTabs.select('player'); input.value = q; paint(); }
  });

  let plan = null;
  /** 解析并给每个和弦排好伴奏（相邻和弦之间平稳连接） */
  function buildPlan() {
    const bars = parseProgression(input.value, { chordBeats: Number(chordBeats.value) || 4, beatsPerBar: Number(meter.value) || 4 });
    const { events, totalBeats } = progressionEvents(bars);
    const bad = [];
    let previous = null;
    events.forEach((event) => {
      try {
        const voiced = parsedAccompaniment(conv, event.symbol, previous);
        event.midi = voiced.midi;
        previous = voiced.midi;
      } catch (_) {
        event.midi = null;
        bad.push(event.symbol);
      }
    });
    return { bars, events, totalBeats, bad: [...new Set(bad)] };
  }

  function paint() {
    stop();
    plan = buildPlan();
    chart.replaceChildren();
    links.replaceChildren();
    if (!plan.events.length) { summary.textContent = t.empty; return; }
    summary.textContent = plan.bad.length ? t.errors(plan.bad) : t.bars(plan.bars.length, plan.totalBeats);
    summary.classList.toggle('is-error', plan.bad.length > 0);
    plan.bars.forEach((bar, barIndex) => {
      const cell = el('div', 'prog-bar');
      cell.appendChild(el('span', 'prog-bar-num', String(barIndex + 1)));
      plan.events.filter((event) => event.bar === barIndex).forEach((event) => {
        const chord = el('button', `prog-chord${event.midi ? '' : ' is-invalid'}`, event.symbol);
        chord.type = 'button';
        chord.dataset.beat = String(event.beat);
        chord.addEventListener('click', () => { if (event.midi) playChord(event.midi.map(midiToFrequency), 1.2); });
        event.node = chord;
        cell.appendChild(chord);
      });
      chart.appendChild(cell);
    });
    [...new Set(plan.events.filter((event) => event.midi).map((event) => event.symbol))].slice(0, 6)
      .forEach((symbol) => links.appendChild(crossLink('chord', t.open(symbol), symbol)));
  }

  /** 按织体排出一个和弦的发声：返回 [拍内偏移, 频率数组, 时值(拍), 是否打断] */
  function strokes(event) {
    const notes = event.midi;
    const kind = style.value;
    const out = [];
    if (kind === 'sustain') out.push([0, notes, event.beats, true]);
    else if (kind === 'block') for (let b = 0; b < event.beats; b += 1) out.push([b, notes, 0.9, true]);
    else if (kind === 'arpeggio') {
      const pattern = [...notes, ...notes.slice(1, -1).reverse()];
      for (let i = 0; i < event.beats * 2; i += 1) out.push([i / 2, [pattern[i % pattern.length]], 0.6, i === 0]);
    } else {
      for (let b = 0; b < event.beats; b += 1) {
        out.push([b, [notes[0]], 0.8, b === 0]);
        if (b % 2 === 1 || event.beats === 1) out.push([b + (event.beats === 1 ? 0.5 : 0), notes.slice(1), 0.7, false]);
      }
    }
    return out;
  }

  function play() {
    stop();
    if (!plan) paint();
    if (!plan.events.length || plan.bad.length) return;
    playing = true;
    stopButton.disabled = false;
    const beatMs = 60000 / Math.max(40, Math.min(240, Number(bpm.value) || 96));
    const scheduleCycle = (offsetMs) => {
      plan.events.forEach((event) => {
        timers.push(setTimeout(() => {
          target.querySelectorAll('.prog-chord.is-playing').forEach((node) => node.classList.remove('is-playing'));
          event.node?.classList.add('is-playing');
        }, offsetMs + event.beat * beatMs));
        strokes(event).forEach(([at, notes, length, interrupt]) => {
          timers.push(setTimeout(() => playChord(notes.map(midiToFrequency), (length * beatMs) / 1000, { interrupt }), offsetMs + (event.beat + at) * beatMs));
        });
      });
      const cycleMs = plan.totalBeats * beatMs;
      timers.push(setTimeout(() => {
        // 只保留下一轮的计时器，避免数组无限增长
        timers = [];
        if (loop.checked && playing) scheduleCycle(0);
        else stop();
      }, offsetMs + cycleMs));
    };
    scheduleCycle(0);
  }

  [meter, chordBeats].forEach((node) => node.addEventListener('change', paint));
  input.addEventListener('input', () => { clearTimeout(input.debounce); input.debounce = setTimeout(paint, 250); });
  bpm.addEventListener('change', () => { if (playing) play(); });
  paint();
}

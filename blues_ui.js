import { lccPitchClass } from './lcc_concept.js';
import { BLUES_NOTES, BLUES_SCALES, bluesForm, bluesScaleNotes, bluesScaleMidi, bluesBentFrequency, bluesPhrase } from './blues_lab.js';

const SOURCES = {
  blue: 'https://music-theory.aizcutei.com/post/%E6%97%8B%E5%BE%8B%E7%AF%87/24-%E8%93%9D%E8%B0%83',
  form: 'https://online.berklee.edu/courses/blues-guitar',
  harmony: 'https://online.berklee.edu/courses/reharmonization-techniques',
};
const TEXT = {
  zh: {
    title: '布鲁斯工具箱', subtitle: '12小节 · 大小调五声音阶 · Blue Note · 问答乐句 · 和弦配色',
    tabs: { form: '12小节进行', scales: '音阶与蓝调音', phrases: '问答与落点', chord: '和弦配色' },
    key: '主音', form: '形态', turnaround: '第12小节转折', groove: '练习节奏', tempo: '速度 BPM', play: '钢琴试听', stop: '停止',
    variants: { long: '传统 Long Change', quick: 'Quick Change', jazz: '爵士布鲁斯（教学模型）', minor: '小调布鲁斯（教学模型）' },
    turnarounds: { default: '形态默认', dominant: 'V → 下一轮', tonic: '停在 I', iiV: 'ii–V → 下一轮' },
    grooves: { straight: '均分八分', shuffle: '三连音 Shuffle' },
    formHelp: '三个四小节乐句组成一轮。Long Change 的第2小节仍是 I；Quick Change 改为 IV。爵士与小调是练习用变化，并非所有曲子的固定和弦表。',
    compHelp: '伴奏是钢琴和低音的节奏练习示意，不代替真人鼓、步行贝斯或某一张录音的律动。可点单个小节试听。',
    bar: '小节', phrase: '乐句', next: '下一轮',
    scale: '旋律音集合', scalesHelp: '先不输入和弦：同一主音比较大、小五声音阶及加入蓝调音的集合。标出的♭3、♯4/♭5、♭7只是十二平均律记法，真实蓝调音往往落在音高之间。',
    blue: '蓝调色彩音', hearScale: '上行音阶', noteHelp: '♭3常与3并置或滑向3；♯4/♭5常滑向5。演奏落点与时值比“可用音清单”更重要。',
    bend: 'Blue Note 音高实验', bendDegree: '下弯的原音', bendAmount: '向下偏移（音分）', bendPlay: '电子钢琴音高近似', pianoProxy: '钢琴邻音代理',
    bendHelp: '这里用合成钢琴音色改变频率，模拟原音向下不到一个半音；真实歌唱、吉他弯音、管乐音色与钢琴的表现并不等同。',
    phrase: '乐句模板', phrasesHelp: '蓝调不是连续扫音阶：试“呼叫—留白—回答”，再练♭3→3、♯4→5、♭7→1的落点。以下只是短练习模板。',
    phraseKinds: { callResponse: '呼叫 · 留白 · 回答', blueThird: '♭3 → 3', blueFifth: '♯4 → 5', blueSeventh: '♭7 → 1' }, rest: '休止',
    chordHelp: '保留原和弦推荐，但把和弦音与旋律色彩音分开标记；不要把“非和弦音数量”误当成客观辣度。', badChord: '请输入可识别的和弦，例如 C7、Cm7、F7。', basic: '标准配色', alternative: '其他五声音阶起点', chordTone: '和弦音', colorTone: '旋律色彩音',
    caution: '蓝调常用小调五声音阶叠在大调／属和弦上，造成有意的三度摩擦；这不是“每个和弦只能有一条正确音阶”。', source: '资料参考',
  },
  en: {
    title: 'Blues Toolbox', subtitle: '12-bar forms · pentatonics · blue notes · call and response · chord colors',
    tabs: { form: '12-bar form', scales: 'Scales & blue notes', phrases: 'Phrases & landing', chord: 'Chord colors' },
    key: 'Tonic', form: 'Form', turnaround: 'Bar 12 turnaround', groove: 'Practice groove', tempo: 'Tempo BPM', play: 'Piano preview', stop: 'Stop',
    variants: { long: 'Long change', quick: 'Quick change', jazz: 'Jazz blues (teaching model)', minor: 'Minor blues (teaching model)' },
    turnarounds: { default: 'Form default', dominant: 'V to next chorus', tonic: 'Stay on I', iiV: 'ii–V to next chorus' },
    grooves: { straight: 'Straight eighths', shuffle: 'Triplet shuffle' },
    formHelp: 'Three four-bar phrases form a chorus. Long change keeps I in bar 2; quick change moves to IV. Jazz and minor variants are practice models, not fixed charts for every tune.',
    compHelp: 'Piano and bass are a practice sketch, not live drums, walking bass or a recording’s groove. Click any bar to preview.',
    bar: 'Bar', phrase: 'Phrase', next: 'Next chorus',
    scale: 'Melodic collection', scalesHelp: 'No chord required: compare major/minor pentatonics and blue-note collections under one tonic. Tempered ♭3, ♯4/♭5 and ♭7 are shorthand; real blue notes can fall between pitches.',
    blue: 'Blue-color tone', hearScale: 'Ascending scale', noteHelp: '♭3 can rub against or slide into 3; ♯4/♭5 often leads into 5. Landing and duration matter more than a list of available notes.',
    bend: 'Blue-note pitch experiment', bendDegree: 'Tone to bend downward', bendAmount: 'Downward offset (cents)', bendPlay: 'Electronic-piano pitch approximation', pianoProxy: 'Piano-neighbor proxy',
    bendHelp: 'A synthesized piano tone changes frequency by less than a semitone. Voice, guitar bends and horns express this differently from an acoustic piano.',
    phrase: 'Phrase template', phrasesHelp: 'Blues is not nonstop scale runs: try call–space–response, then practice ♭3→3, ♯4→5 and ♭7→1 landings. These are short exercise patterns.',
    phraseKinds: { callResponse: 'Call · space · response', blueThird: '♭3 → 3', blueFifth: '♯4 → 5', blueSeventh: '♭7 → 1' }, rest: 'Rest',
    chordHelp: 'Retain chord recommendations, but separate chord tones and melodic color tones. Count of non-chord notes is not an objective spiciness score.', badChord: 'Enter a recognizable chord such as C7, Cm7 or F7.', basic: 'Core colors', alternative: 'Other pentatonic starts', chordTone: 'Chord tone', colorTone: 'Melodic color',
    caution: 'Minor pentatonic over major/dominant harmony creates intentional third friction; there is not one uniquely correct scale per chord.', source: 'Sources',
  },
  ja: {
    title: 'ブルース・ツールボックス', subtitle: '12小節 · ペンタトニック · ブルーノート · コール＆レスポンス · コードカラー',
    tabs: { form: '12小節の進行', scales: 'スケールとブルーノート', phrases: 'フレーズと着地', chord: 'コードカラー' },
    key: '主音', form: '形式', turnaround: '12小節目', groove: '練習のリズム', tempo: 'テンポ BPM', play: 'ピアノ試聴', stop: '停止',
    variants: { long: 'ロング・チェンジ', quick: 'クイック・チェンジ', jazz: 'ジャズ・ブルース（練習モデル）', minor: 'マイナー・ブルース（練習モデル）' },
    turnarounds: { default: '形式の標準', dominant: 'Vで次へ', tonic: 'Iで止める', iiV: 'ii–Vで次へ' },
    grooves: { straight: 'ストレート8分', shuffle: '三連シャッフル' },
    formHelp: '4小節のフレーズを3つ並べます。ロングでは2小節目がI、クイックではIVです。ジャズ／マイナーは練習用の変種です。',
    compHelp: 'ピアノと低音は練習用の模式図です。各小節をクリックして試聴できます。',
    bar: '小節', phrase: 'フレーズ', next: '次のコーラス',
    scale: '旋律の音集合', scalesHelp: 'コード不要で同主音のメジャー／マイナー・ペンタトニックとブルー音を比較します。実際のブルーノートは鍵盤の音高の間にもあります。',
    blue: 'ブルーの音', hearScale: '上行スケール', noteHelp: '♭3→3、♯4/♭5→5などの着地と長さを試してください。',
    bend: 'ブルーノート音高実験', bendDegree: '下げる元の音', bendAmount: '下げるセント', bendPlay: '電子ピアノ音高近似', pianoProxy: 'ピアノの隣接音',
    bendHelp: '合成ピアノの周波数を半音以内で変えます。声やギターのベンドとは異なります。',
    phrase: 'フレーズの型', phrasesHelp: '音階を走り続けず、コール・間・レスポンスと着地を練習します。これは短い練習用の型です。',
    phraseKinds: { callResponse: 'コール · 間 · レスポンス', blueThird: '♭3 → 3', blueFifth: '♯4 → 5', blueSeventh: '♭7 → 1' }, rest: '休符',
    chordHelp: 'コード音と旋律カラー音を分けます。非コード音の個数を客観的な「辛さ」にしません。', badChord: 'C7、Cm7、F7などのコードを入力してください。', basic: '基本カラー', alternative: '別のペンタトニック', chordTone: 'コード音', colorTone: '旋律カラー',
    caution: 'メジャー／ドミナント和音の上でマイナー・ペンタトニックを弾く摩擦は意図的な表現です。', source: '参考資料',
  },
};

const e = (tag, className = '', value = '') => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value) node.textContent = value;
  return node;
};
const option = (value, text) => { const node = e('option', '', text); node.value = value; return node; };
const label = (caption, control) => { const node = e('label'); node.append(e('span', '', caption), control); return node; };
const locale = () => document.documentElement.lang.toLowerCase().startsWith('ja') ? 'ja'
  : document.documentElement.lang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
const frequency = (midi, semitoneToFreq) => semitoneToFreq(midi % 12, Math.floor(midi / 12) - 1);
const link = (caption, href) => { const node = e('a', 'blues-source', caption); node.href = href; node.target = '_blank'; node.rel = 'noopener noreferrer'; return node; };
const namesFrom = conv => conv.idxToNote || BLUES_NOTES;
function chordNotes(conv, symbol) { try { return conv._ensureNotesAndRoot(symbol.trim()); } catch { return null; } }
function pianoChord(conv, symbol, semitoneToFreq) {
  const notes = chordNotes(conv, symbol);
  if (!notes?.length) return [];
  const root = lccPitchClass(notes[0]);
  return [...new Set(notes.map(note => 48 + root + (lccPitchClass(note) - root + 12) % 12))].map(midi => frequency(midi, semitoneToFreq));
}
function playScale(midis, playChord, semitoneToFreq) {
  return midis.map((midi, index) => setTimeout(() => playChord([frequency(midi, semitoneToFreq)], .28, { interrupt: index === 0 }), index * 320));
}
function noteRow(items, className = '') {
  const row = e('div', `blues-note-row ${className}`);
  items.forEach(item => {
    const note = typeof item === 'string' ? { note: item } : item;
    const chip = e('span', `blues-note-chip${note.blue ? ' blue' : ''}`, note.note);
    if (note.degree) chip.appendChild(e('small', '', note.degree));
    row.appendChild(chip);
  });
  return row;
}
function sourceRow(t, entries) {
  const row = e('div', 'blues-sources'); row.appendChild(e('span', '', `${t.source}: `));
  entries.forEach(([caption, href]) => row.appendChild(link(caption, href)));
  return row;
}

export function mountBluesToolbox(target, chordInput, { brain, conv, playChord, semitoneToFreq }) {
  const t = TEXT[locale()];
  target.replaceChildren();
  const head = e('div', 'blues-head');
  head.append(e('div', 'blues-kicker', 'JAZZ COMPASS / BLUES LAB'), e('h3', '', t.title), e('p', '', t.subtitle));
  target.appendChild(head);
  const tabs = e('div', 'blues-tabs'); tabs.setAttribute('role', 'tablist');
  const content = e('div', 'blues-tab-content'); target.append(tabs, content);
  let cleanup = () => {};
  const contexts = { brain, conv, playChord, semitoneToFreq };
  const views = {
    form: () => renderForm(content, t, target, contexts),
    scales: () => renderScales(content, t, target, contexts),
    phrases: () => renderPhrases(content, t, target, contexts),
    chord: () => renderChordColors(content, t, chordInput, contexts),
  };
  function activate(name) {
    cleanup();
    const view = views[name] ? name : 'form';
    target.dataset.bluesTab = view;
    target.closest('#panel-blues')?.querySelector('.panel-header')?.classList.toggle('blues-chord-input-hidden', view !== 'chord');
    tabs.querySelectorAll('button').forEach(button => {
      const selected = button.dataset.bluesTab === view;
      button.classList.toggle('active', selected); button.setAttribute('aria-selected', String(selected));
    });
    content.replaceChildren();
    cleanup = views[view]() || (() => {});
  }
  Object.entries(t.tabs).forEach(([id, caption]) => {
    const button = e('button', '', caption); button.type = 'button'; button.dataset.bluesTab = id; button.setAttribute('role', 'tab');
    button.addEventListener('click', () => activate(id)); tabs.appendChild(button);
  });
  activate(target.dataset.bluesTab || 'form');
}

function renderForm(content, t, target, { conv, playChord, semitoneToFreq }) {
  const section = e('section', 'blues-form'); content.appendChild(section);
  section.append(e('p', 'blues-intro', t.formHelp), e('p', 'blues-caveat', t.compHelp));
  const controls = e('div', 'blues-controls');
  const key = e('select', 'blues-form-key'); namesFrom(conv).forEach(name => key.appendChild(option(name, name)));
  key.value = target.dataset.bluesKey || 'C';
  const variant = e('select', 'blues-form-variant'); Object.entries(t.variants).forEach(([id, caption]) => variant.appendChild(option(id, caption)));
  variant.value = target.dataset.bluesVariant || 'long';
  const turnaround = e('select', 'blues-form-turnaround'); Object.entries(t.turnarounds).forEach(([id, caption]) => turnaround.appendChild(option(id, caption)));
  turnaround.value = target.dataset.bluesTurnaround || 'default';
  const groove = e('select', 'blues-form-groove'); Object.entries(t.grooves).forEach(([id, caption]) => groove.appendChild(option(id, caption)));
  groove.value = target.dataset.bluesGroove || 'shuffle';
  const tempo = e('input', 'blues-form-tempo'); tempo.type = 'number'; tempo.min = '50'; tempo.max = '220'; tempo.value = target.dataset.bluesTempo || '110';
  controls.append(label(t.key, key), label(t.form, variant), label(t.turnaround, turnaround), label(t.groove, groove), label(t.tempo, tempo));
  section.appendChild(controls);
  const actions = e('div', 'blues-actions');
  const start = e('button', 'blues-primary', `♪ ${t.play}`); start.type = 'button';
  const stop = e('button', 'blues-outline', t.stop); stop.type = 'button'; stop.disabled = true;
  const status = e('span', 'blues-play-status', ''); actions.append(start, stop, status); section.appendChild(actions);
  const chart = e('div', 'blues-chart'); section.appendChild(chart);
  section.appendChild(sourceRow(t, [['Berklee · Blues Guitar', SOURCES.form], ['Berklee · Reharmonization', SOURCES.harmony]]));
  let bars = [];
  let timers = [];
  function cancelPlayback(interrupt = true) {
    const wasPlaying = !stop.disabled;
    timers.forEach(clearTimeout); timers = [];
    chart.querySelectorAll('.blues-bar.current').forEach(card => card.classList.remove('current'));
    stop.disabled = true; status.textContent = '';
    if (interrupt && wasPlaying) playChord([], .01);
  }
  function update() {
    cancelPlayback();
    target.dataset.bluesKey = key.value; target.dataset.bluesVariant = variant.value;
    target.dataset.bluesTurnaround = turnaround.value; target.dataset.bluesGroove = groove.value;
    target.dataset.bluesTempo = tempo.value;
    bars = bluesForm(key.value, variant.value, turnaround.value, namesFrom(conv));
    chart.replaceChildren();
    bars.forEach(bar => {
      const card = e('article', 'blues-bar'); card.dataset.bar = String(bar.number);
      card.append(e('small', '', `${String(bar.number).padStart(2, '0')} · ${t.phrase} ${bar.phrase}`));
      const flow = e('div', 'blues-bar-chords');
      bar.segments.forEach(segment => {
        const row = e('div', 'blues-bar-chord');
        row.append(e('strong', '', segment.symbol), e('small', '', `${segment.role} · ${segment.beats} beat`));
        flow.appendChild(row);
      });
      card.appendChild(flow);
      const preview = e('button', 'blues-mini-play', '♪'); preview.type = 'button'; preview.title = `${t.bar} ${bar.number}: ${t.play}`;
      preview.addEventListener('click', () => playChord(pianoChord(conv, bar.segments[0].symbol, semitoneToFreq), 1));
      card.appendChild(preview); chart.appendChild(card);
    });
  }
  function playback() {
    cancelPlayback();
    const bpm = Math.max(50, Math.min(220, Number(tempo.value) || 110));
    tempo.value = String(bpm); target.dataset.bluesTempo = tempo.value;
    const beatMs = 60000 / bpm;
    stop.disabled = false;
    const chordMs = Math.min(1.35, beatMs / 1000 * 1.7);
    bars.forEach((bar, index) => {
      timers.push(setTimeout(() => {
        chart.querySelectorAll('.blues-bar.current').forEach(card => card.classList.remove('current'));
        chart.querySelector(`[data-bar="${bar.number}"]`)?.classList.add('current');
        status.textContent = `${t.bar} ${bar.number} / 12 · ${t.phrase} ${bar.phrase}`;
      }, index * 4 * beatMs));
      bar.segments.forEach((segment, segmentIndex) => {
        const startBeat = index * 4 + segmentIndex * segment.beats;
        const chordSound = pianoChord(conv, segment.symbol, semitoneToFreq);
        timers.push(setTimeout(() => playChord(chordSound, chordMs), startBeat * beatMs));
        const notes = chordNotes(conv, segment.symbol);
        if (!notes?.length) return;
        const root = lccPitchClass(notes[0]);
        for (let beat = 0; beat < segment.beats; beat += 1) {
          const bassInterval = [0, 7, 9, 7][beat % 4];
          const bassMidi = 36 + root + bassInterval;
          timers.push(setTimeout(() => playChord([frequency(bassMidi, semitoneToFreq)], .24, { interrupt: false }), (startBeat + beat + .07) * beatMs));
          const offbeat = groove.value === 'shuffle' ? .67 : .5;
          timers.push(setTimeout(() => {
            const guide = notes.slice(1, 3).map(note => 60 + root + (lccPitchClass(note) - root + 12) % 12);
            if (guide.length) playChord(guide.map(midi => frequency(midi, semitoneToFreq)), .18, { interrupt: false });
          }, (startBeat + beat + offbeat) * beatMs));
        }
      });
    });
    timers.push(setTimeout(() => cancelPlayback(false), bars.length * 4 * beatMs + 150));
  }
  [key, variant, turnaround, groove, tempo].forEach(control => control.addEventListener('change', update));
  start.addEventListener('click', playback); stop.addEventListener('click', () => cancelPlayback());
  update();
  return () => cancelPlayback();
}

function renderScales(content, t, target, { conv, playChord, semitoneToFreq }) {
  const section = e('section', 'blues-scales'); content.appendChild(section);
  section.append(e('p', 'blues-intro', t.scalesHelp), e('p', 'blues-caveat', t.noteHelp));
  const controls = e('div', 'blues-controls');
  const key = e('select', 'blues-scale-key'); namesFrom(conv).forEach(name => key.appendChild(option(name, name)));
  key.value = target.dataset.bluesKey || 'C';
  const scale = e('select', 'blues-scale-select'); BLUES_SCALES.forEach(item => scale.appendChild(option(item.id, item.name)));
  scale.value = target.dataset.bluesScale || 'minorBlues';
  const hear = e('button', 'blues-primary', `♪ ${t.hearScale}`); hear.type = 'button';
  let scaleTimers = [];
  function cancelScale() {
    const wasPlaying = scaleTimers.length > 0;
    scaleTimers.forEach(clearTimeout); scaleTimers = [];
    if (wasPlaying) playChord([], .01);
  }
  hear.addEventListener('click', () => {
    cancelScale();
    scaleTimers = playScale(bluesScaleMidi(key.value, scale.value), playChord, semitoneToFreq);
    scaleTimers.push(setTimeout(() => { scaleTimers = []; }, scaleTimers.length * 320 + 300));
  });
  controls.append(label(t.key, key), label(t.scale, scale), hear); section.appendChild(controls);
  const detail = e('div', 'blues-scale-detail'); section.appendChild(detail);
  function paint() {
    cancelScale();
    target.dataset.bluesKey = key.value; target.dataset.bluesScale = scale.value;
    detail.replaceChildren();
    const definition = BLUES_SCALES.find(item => item.id === scale.value);
    const card = e('article', 'blues-scale-card');
    card.append(e('strong', '', `${key.value} ${definition.name}`), noteRow(bluesScaleNotes(key.value, definition.id)), e('p', '', definition.hint));
    detail.appendChild(card);
    const compare = e('div', 'blues-compare-grid');
    [['majorPentatonic', 'majorBlues'], ['minorPentatonic', 'minorBlues']].forEach(pair => {
      const panel = e('article', 'blues-compare-card');
      pair.forEach(id => {
        const item = BLUES_SCALES.find(scale => scale.id === id);
        panel.append(e('strong', '', item.name), noteRow(bluesScaleNotes(key.value, id)));
      });
      compare.appendChild(panel);
    });
    detail.appendChild(compare);
  }
  key.addEventListener('change', paint); scale.addEventListener('change', paint); paint();
  const bend = e('section', 'blues-bend');
  bend.append(e('h4', '', t.bend), e('p', 'blues-intro', t.bendHelp));
  const bendControls = e('div', 'blues-controls');
  const degree = e('select', 'blues-bend-degree'); [[4, '3 / ♭3'], [7, '5 / ♭5'], [11, '7 / ♭7']].forEach(([id, caption]) => degree.appendChild(option(String(id), caption)));
  const slider = e('input', 'blues-bend-cents'); slider.type = 'range'; slider.min = '-100'; slider.max = '0'; slider.value = '-55';
  const amount = e('output', 'blues-bend-output');
  bendControls.append(label(t.bendDegree, degree), label(t.bendAmount, slider), amount); bend.appendChild(bendControls);
  const bendActions = e('div', 'blues-actions');
  const synthetic = e('button', 'blues-outline', `♪ ${t.bendPlay}`); synthetic.type = 'button';
  synthetic.addEventListener('click', () => playChord([bluesBentFrequency(key.value, Number(degree.value), Number(slider.value))], 1.1));
  const proxy = e('button', 'blues-outline', `♪ ${t.pianoProxy}`); proxy.type = 'button';
  proxy.addEventListener('click', () => {
    const start = 60 + lccPitchClass(key.value) + Number(degree.value);
    playChord([frequency(start - 1, semitoneToFreq), frequency(start, semitoneToFreq)], 1.1);
  });
  bendActions.append(synthetic, proxy); bend.appendChild(bendActions);
  function showCents() {
    const freq = bluesBentFrequency(key.value, Number(degree.value), Number(slider.value));
    amount.textContent = `${slider.value} ¢ · ${freq.toFixed(2)} Hz`;
  }
  slider.addEventListener('input', showCents); degree.addEventListener('change', showCents); key.addEventListener('change', showCents); showCents();
  section.append(bend, sourceRow(t, [['Aizcutei · 蓝调', SOURCES.blue], ['Berklee · Blues Guitar', SOURCES.form]]));
  return cancelScale;
}

function renderPhrases(content, t, target, { conv, playChord, semitoneToFreq }) {
  const section = e('section', 'blues-phrases'); content.appendChild(section);
  section.appendChild(e('p', 'blues-intro', t.phrasesHelp));
  const controls = e('div', 'blues-controls');
  const key = e('select', 'blues-phrase-key'); namesFrom(conv).forEach(name => key.appendChild(option(name, name)));
  key.value = target.dataset.bluesKey || 'C';
  const type = e('select', 'blues-phrase-type'); Object.entries(t.phraseKinds).forEach(([id, caption]) => type.appendChild(option(id, caption)));
  type.value = target.dataset.bluesPhrase || 'callResponse';
  const bpm = e('input', 'blues-phrase-tempo'); bpm.type = 'number'; bpm.min = '50'; bpm.max = '220'; bpm.value = target.dataset.bluesTempo || '110';
  controls.append(label(t.key, key), label(t.phrase, type), label(t.tempo, bpm)); section.appendChild(controls);
  const result = e('div', 'blues-phrase-result'); section.appendChild(result);
  const actions = e('div', 'blues-actions');
  const play = e('button', 'blues-primary', `♪ ${t.play}`); play.type = 'button';
  const stop = e('button', 'blues-outline', t.stop); stop.type = 'button'; stop.disabled = true;
  actions.append(play, stop); section.append(actions, sourceRow(t, [['Aizcutei · 蓝调', SOURCES.blue], ['Berklee · Blues Guitar', SOURCES.form]]));
  let timers = [];
  function cancel(interrupt = true) {
    const wasPlaying = !stop.disabled;
    timers.forEach(clearTimeout); timers = []; stop.disabled = true;
    result.querySelectorAll('.playing').forEach(node => node.classList.remove('playing'));
    if (interrupt && wasPlaying) playChord([], .01);
  }
  function paint() {
    cancel(); target.dataset.bluesKey = key.value; target.dataset.bluesPhrase = type.value; target.dataset.bluesTempo = bpm.value;
    result.replaceChildren();
    bluesPhrase(key.value, type.value).forEach((midi, index) => {
      const chip = e('span', `blues-phrase-chip${midi === null ? ' is-rest' : ''}`, midi === null ? t.rest : namesFrom(conv)[midi % 12]);
      chip.dataset.index = String(index); result.appendChild(chip);
    });
  }
  function preview() {
    cancel();
    const tempo = Math.max(50, Math.min(220, Number(bpm.value) || 110)); bpm.value = String(tempo);
    const beatMs = 60000 / tempo;
    const phrase = bluesPhrase(key.value, type.value);
    stop.disabled = false;
    phrase.forEach((midi, index) => timers.push(setTimeout(() => {
      result.querySelectorAll('.playing').forEach(node => node.classList.remove('playing'));
      result.querySelector(`[data-index="${index}"]`)?.classList.add('playing');
      if (midi !== null) playChord([frequency(midi, semitoneToFreq)], Math.min(.4, beatMs / 1000 * .8), { interrupt: index === 0 });
    }, index * beatMs)));
    timers.push(setTimeout(() => cancel(false), phrase.length * beatMs + 100));
  }
  [key, type, bpm].forEach(control => control.addEventListener('change', paint));
  play.addEventListener('click', preview); stop.addEventListener('click', () => cancel()); paint();
  return () => cancel();
}

function renderChordColors(content, t, input, { brain, conv, playChord, semitoneToFreq }) {
  const section = e('section', 'blues-chord-colors'); content.appendChild(section);
  section.append(e('p', 'blues-intro', t.chordHelp), e('p', 'blues-caveat', t.caution));
  const symbol = input.trim(); const notes = chordNotes(conv, symbol);
  if (!notes?.length) { section.appendChild(e('p', 'input-error', t.badChord)); return; }
  const chordSet = new Set(notes.map(lccPitchClass));
  const current = e('div', 'blues-current-chord'); current.append(e('strong', '', symbol), noteRow(notes)); section.appendChild(current);
  const basic = brain.blt.suggestForChord(symbol) || [];
  const basicNames = new Set(basic.map(item => item.name));
  const advanced = (brain.blt.suggestAdvanced(symbol) || []).filter(item => !basicNames.has(item.name));
  [[t.basic, basic], [t.alternative, advanced]].forEach(([caption, suggestions]) => {
    const group = e('section', 'blues-suggestion-group'); group.appendChild(e('h4', '', caption));
    const grid = e('div', 'blues-suggestion-grid');
    suggestions.forEach(item => {
      const card = e('article', 'blues-suggestion-card');
      card.append(e('strong', '', item.name), e('p', '', window.__(`reason_${item.reasonId}`) || item.reason));
      const row = e('div', 'blues-note-row');
      item.notes.forEach(note => {
        const chip = e('span', `blues-note-chip${chordSet.has(lccPitchClass(note)) ? ' is-chord' : ' blue'}`, note);
        chip.title = chordSet.has(lccPitchClass(note)) ? t.chordTone : t.colorTone;
        row.appendChild(chip);
      });
      card.appendChild(row);
      const preview = e('button', 'blues-outline', `♪ ${t.play}`); preview.type = 'button';
      preview.addEventListener('click', () => {
        const root = lccPitchClass(notes[0]);
        const pitches = [...new Set([...notes, ...item.notes.slice(0, 2)].map(lccPitchClass))];
        playChord(pitches.map(pitch => frequency(48 + root + (pitch - root + 12) % 12, semitoneToFreq)), 1.4);
      });
      card.appendChild(preview); grid.appendChild(card);
    });
    if (!suggestions.length) grid.appendChild(e('p', 'blues-intro', '—'));
    group.appendChild(grid); section.appendChild(group);
  });
  section.appendChild(sourceRow(t, [['Aizcutei · 蓝调', SOURCES.blue], ['Berklee · Blues Guitar', SOURCES.form]]));
}

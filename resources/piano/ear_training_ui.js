// 练耳界面：听音程 / 三和弦 / 七和弦，选择答案，记录正确率
// 题目构造与出处见 ear_training.js：ref:omt-intervals ref:omt-triads
import { INTERVALS, TRIADS, SEVENTHS, makeQuestion, grade, emptyStats } from './ear_training.js';
import { el, button, option, field, language, midiToFrequency, sourcesFooter, cite, tabs, relatedLinks } from './module_kit.js';

const SOURCES = ['omt-intervals', 'omt-triads'];
const STATS_KEY = 'jc-ear-stats';

const TEXT = {
  zh: {
    kicker: '练耳', title: '听辨练习',
    intro: '听一个音程或和弦，选出它的名称。可以只练选中的几项；正确率保存在本机浏览器中。',
    tabs: { interval: '音程', triad: '三和弦', seventh: '七和弦' },
    names: {
      m2: '小二度', M2: '大二度', m3: '小三度', M3: '大三度', P4: '纯四度', TT: '三全音（增四/减五）', P5: '纯五度',
      m6: '小六度', M6: '大六度', m7: '小七度', M7: '大七度', P8: '纯八度',
      major: '大三和弦', minor: '小三和弦', diminished: '减三和弦', augmented: '增三和弦',
      maj7: '大七和弦', dom7: '属七和弦', min7: '小七和弦', dim7: '减七和弦', hdim7: '半减七和弦',
    },
    playback: '播放方式', modes: { up: '上行', down: '下行', together: '同时' }, chordModes: { together: '柱式', up: '分解（上行）' },
    pool: '练习范围', next: '► 新题', replay: '↻ 重听', reveal: '显示答案',
    prompt: '点"新题"开始。', listen: '听完后选择答案：', right: (name, notes) => `正确：${name}（${notes}）`, wrong: (name, notes) => `答案是 ${name}（${notes}）`,
    stats: (s) => `正确 ${s.correct} / ${s.total}${s.total ? `（${Math.round((s.correct / s.total) * 100)}%）` : ''} · 连对 ${s.streak} · 最佳 ${s.best}`,
    reset: '清零', poolEmpty: '请至少选择两项。', hint: '和弦的性质由各音相对根音的音程决定；OMT 建议在识别和弦时亲手弹奏来训练耳朵。',
  },
  ja: {
    kicker: '聴音', title: '聴き取り練習',
    intro: '音程や和音を聴いて名前を選びます。選んだ項目だけを練習でき、正答率はこのブラウザに保存されます。',
    tabs: { interval: '音程', triad: '三和音', seventh: '七の和音' },
    names: {
      m2: '短 2 度', M2: '長 2 度', m3: '短 3 度', M3: '長 3 度', P4: '完全 4 度', TT: '三全音（増 4 / 減 5）', P5: '完全 5 度',
      m6: '短 6 度', M6: '長 6 度', m7: '短 7 度', M7: '長 7 度', P8: '完全 8 度',
      major: '長三和音', minor: '短三和音', diminished: '減三和音', augmented: '増三和音',
      maj7: '長七の和音', dom7: '属七の和音', min7: '短七の和音', dim7: '減七の和音', hdim7: '半減七の和音',
    },
    playback: '鳴らし方', modes: { up: '上行', down: '下行', together: '同時' }, chordModes: { together: '和音', up: '分散（上行）' },
    pool: '練習する項目', next: '► 次の問題', replay: '↻ もう一度', reveal: '答えを見る',
    prompt: '「次の問題」で開始します。', listen: '聴いて答えを選んでください：', right: (name, notes) => `正解：${name}（${notes}）`, wrong: (name, notes) => `正解は ${name}（${notes}）`,
    stats: (s) => `正解 ${s.correct} / ${s.total}${s.total ? `（${Math.round((s.correct / s.total) * 100)}%）` : ''} · 連続 ${s.streak} · 最高 ${s.best}`,
    reset: 'リセット', poolEmpty: '二つ以上選んでください。', hint: '和音の種類は根音からの音程で決まります。OMT は実際に弾いて耳を鍛えることを勧めています。',
  },
  en: {
    kicker: 'Ear training', title: 'Listening drills',
    intro: 'Hear an interval or chord and pick its name. Drill only the items you select; your score is kept in this browser.',
    tabs: { interval: 'Intervals', triad: 'Triads', seventh: 'Seventh chords' },
    names: {
      m2: 'minor 2nd', M2: 'major 2nd', m3: 'minor 3rd', M3: 'major 3rd', P4: 'perfect 4th', TT: 'tritone (A4/d5)', P5: 'perfect 5th',
      m6: 'minor 6th', M6: 'major 6th', m7: 'minor 7th', M7: 'major 7th', P8: 'octave',
      major: 'major', minor: 'minor', diminished: 'diminished', augmented: 'augmented',
      maj7: 'major seventh', dom7: 'dominant seventh', min7: 'minor seventh', dim7: 'diminished seventh', hdim7: 'half-diminished seventh',
    },
    playback: 'Playback', modes: { up: 'ascending', down: 'descending', together: 'harmonic' }, chordModes: { together: 'block', up: 'arpeggiated' },
    pool: 'Items to drill', next: '► New question', replay: '↻ Replay', reveal: 'Show answer',
    prompt: 'Press “New question” to start.', listen: 'Listen, then choose:', right: (name, notes) => `Correct: ${name} (${notes})`, wrong: (name, notes) => `It was ${name} (${notes})`,
    stats: (s) => `Correct ${s.correct} / ${s.total}${s.total ? ` (${Math.round((s.correct / s.total) * 100)}%)` : ''} · streak ${s.streak} · best ${s.best}`,
    reset: 'Reset', poolEmpty: 'Choose at least two items.', hint: 'A chord’s quality comes from the intervals above its root; OMT recommends playing chords yourself to train your ear.',
  },
};

const pretty = (note) => note.replace(/#/g, '♯').replace(/([A-G])b/g, '$1♭');

function loadStats() {
  try { return JSON.parse(localStorage.getItem(STATS_KEY)) ?? {}; } catch (_) { return {}; }
}
function saveStats(all) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(all)); } catch (_) { }
}

export function mountEarTraining(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  target.addEventListener('toolbox-stop', stop);
  const allStats = loadStats();

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));
  root.appendChild(head);
  const body = el('div', 'mk-section');

  const ITEMS = { interval: Object.keys(INTERVALS), triad: TRIADS, seventh: SEVENTHS };
  const DEFAULT_POOL = { interval: ['m3', 'M3', 'P4', 'P5', 'P8'], triad: TRIADS, seventh: SEVENTHS };

  const view = (kind) => {
    const wrap = el('div', 'mk-section');
    const playback = el('select');
    Object.entries(kind === 'interval' ? t.modes : t.chordModes).forEach(([id, label]) => playback.appendChild(option(id, label)));
    const controls = el('div', 'mk-controls');
    controls.appendChild(field(t.playback, playback));
    const poolBox = el('div', 'ear-pool');
    const poolChecks = ITEMS[kind].map((id) => {
      const label = el('label', 'ear-chip');
      const box = el('input');
      box.type = 'checkbox';
      box.value = id;
      box.checked = DEFAULT_POOL[kind].includes(id);
      label.append(box, document.createTextNode(t.names[id]));
      poolBox.appendChild(label);
      return box;
    });
    const poolField = el('div', 'mk-section');
    poolField.append(el('span', 'mk-meta', t.pool), poolBox);

    const status = el('p', 'mk-hint', t.prompt);
    const answers = el('div', 'ear-answers');
    const statsLine = el('p', 'mk-meta');
    let stats = { ...emptyStats(), ...(allStats[kind] ?? {}) };
    let question = null;
    let answered = false;

    const paintStats = () => { statsLine.textContent = t.stats(stats); };
    const play = () => {
      if (!question) return;
      stop();
      const freqs = question.midis.map(midiToFrequency);
      if (playback.value === 'together') { playChord(freqs, 1.8); return; }
      const order = playback.value === 'down' ? [...freqs].reverse() : freqs;
      order.forEach((hz, i) => timers.push(setTimeout(() => playChord([hz], 1.1, { interrupt: i === 0 }), i * 650)));
    };
    const ask = () => {
      const pool = poolChecks.filter((box) => box.checked).map((box) => box.value);
      if (pool.length < 2) { status.textContent = t.poolEmpty; return; }
      question = makeQuestion(kind, pool);
      answered = false;
      status.textContent = t.listen;
      status.classList.remove('mk-ok', 'is-error');
      answers.replaceChildren();
      pool.forEach((id) => {
        const choice = button('btn btn-secondary btn-sm ear-answer', t.names[id], () => respond(id, choice));
        choice.dataset.answer = id;
        answers.appendChild(choice);
      });
      play();
    };
    const respond = (id, node) => {
      if (!question || answered) return;
      answered = true;
      const result = grade(stats, question, id);
      stats = result.stats;
      allStats[kind] = stats;
      saveStats(allStats);
      const notes = question.notes.map(pretty).join(' – ');
      status.textContent = result.correct ? t.right(t.names[question.answer], notes) : t.wrong(t.names[question.answer], notes);
      status.classList.toggle('mk-ok', result.correct);
      status.classList.toggle('is-error', !result.correct);
      answers.querySelectorAll('.ear-answer').forEach((choice) => {
        choice.classList.toggle('is-correct', choice.dataset.answer === question.answer);
        choice.classList.toggle('is-wrong', choice === node && !result.correct);
      });
      paintStats();
    };

    const actions = el('div', 'mk-actions');
    actions.append(
      button('btn btn-primary btn-sm', t.next, ask),
      button('btn btn-secondary btn-sm', t.replay, play),
      button('btn btn-ghost btn-sm', t.reset, () => { stats = emptyStats(); allStats[kind] = stats; saveStats(allStats); paintStats(); }),
    );
    const hint = el('p', 'mk-hint', t.hint);
    hint.append(cite(SOURCES, 'omt-intervals'), cite(SOURCES, 'omt-triads'));
    wrap.append(controls, poolField, actions, status, answers, statsLine, hint);
    paintStats();
    return wrap;
  };

  const navigation = tabs(root, Object.entries(t.tabs).map(([id, label]) => ({ id, label })), (id) => {
    stop();
    body.replaceChildren(view(id));
  });
  root.append(body, relatedLinks(['chord', 'progression']), sourcesFooter(SOURCES));
  target.appendChild(root);
  navigation.select('interval');
}

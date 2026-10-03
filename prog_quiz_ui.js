// 练耳面板里的"套路听辨"：先响主和弦，再把一条套路进行循环两遍；选它是哪一条进行，或选它的低音线；
// 揭晓后可以去速查里看这一条的说明；答错的题放进学习页的错题本。逻辑见 prog_quiz.js（ref:omt-pb-4chord ref:omt-pb-classical-schemas）
import { quizQuestion, bassLine } from './prog_quiz.js';
import { FAMILIES } from './prog_library_data.js';
import { parseRoman, voiceProgression, playbackEvents } from './prog_library.js';
import { recordToolMistake, tri } from './tool_review.js';
import { el, button, option, field, language, cite } from './module_kit.js';

const TEXT = {
  zh: {
    title: '套路听辨', intro: '先响一下主和弦，再把一条常见的和弦进行循环两遍。听出它是哪一条，或者只听低音线。题目来自"套路和弦进行速查"。',
    kind: '听什么', kinds: { schema: '整条进行', bass: '低音线（级数）' }, level: '难度', levels: { 1: '1 · 四和弦循环', 2: '2 · 加上终止与长进行', 3: '3 · 加上七和弦与半音' }, tempo: '速度',
    newQ: '下一题', play: '► 再听一遍', stop: '■ 停止', right: '对了！', wrong: (x) => `不对，是 ${x}`, streak: (n, best) => `连对 ${n} · 最好 ${best}`,
    family: '类型', open: '在速查里看这一条', saved: '这道题已放进学习页的错题本。', keyNote: (k, minor) => `这次在 ${k} ${minor ? '小调' : '大调'}`,
    bassHint: '低音线写成相对主音的级数（小调也按同主音大调写：♭3 ♭6 ♭7）',
  },
  ja: {
    title: '定番進行の聴き取り', intro: '主和音のあと、よく使われるコード進行を 2 回ループします。どの進行か、またはバスラインだけを聴き分けます。問題は「定番進行の早見表」から出ます。',
    kind: '聴くもの', kinds: { schema: '進行全体', bass: 'バスライン（度数）' }, level: '難しさ', levels: { 1: '1 · 4 和音のループ', 2: '2 · 終止と長い進行も', 3: '3 · 七の和音と半音も' }, tempo: 'テンポ',
    newQ: '次の問題', play: '► もう一度聴く', stop: '■ 停止', right: '正解！', wrong: (x) => `残念、正解は ${x}`, streak: (n, best) => `連続正解 ${n} · 最高 ${best}`,
    family: '種類', open: '早見表でこの項目を見る', saved: 'この問題を学習ページの復習ノートに入れました。', keyNote: (k, minor) => `今回は ${k} ${minor ? '短調' : '長調'}`,
    bassHint: 'バスラインは主音からの度数（短調も同主長調を基準に ♭3 ♭6 ♭7 と書く）',
  },
  en: {
    title: 'Progression ID', intro: 'The tonic chord sounds, then a common progression loops twice. Name the progression, or just its bass line. Questions come from the progression library.',
    kind: 'Listen for', kinds: { schema: 'the whole progression', bass: 'the bass line (degrees)' }, level: 'Level', levels: { 1: '1 · four-chord loops', 2: '2 · plus cadences and longer progressions', 3: '3 · plus sevenths and chromatic chords' }, tempo: 'Tempo',
    newQ: 'Next', play: '► Hear it again', stop: '■ Stop', right: 'Right!', wrong: (x) => `No — it was ${x}`, streak: (n, best) => `streak ${n} · best ${best}`,
    family: 'Type', open: 'Open this entry in the library', saved: 'This question was added to the review box on the Learn page.', keyNote: (k, minor) => `This time in ${k} ${minor ? 'minor' : 'major'}`,
    bassHint: 'Bass lines are written as degrees from the tonic (minor uses the parallel major: ♭3 ♭6 ♭7)',
  },
};
const REFS = ['omt-pb-4chord', 'omt-pb-classical-schemas', 'omt2e-major-scales'];
const KEYS = ['C', 'D', 'F', 'G', 'A'];
const PROMPT = {
  schema: tri('套路听辨错题：这段循环是哪一条进行？', '定番進行の復習：このループはどの進行？', 'Progression ID review: which progression is this loop?'),
  bass: tri('套路听辨错题：这段循环的低音线是哪一条？', '定番進行の復習：このループのバスラインはどれ？', 'Progression ID review: which bass line does this loop have?'),
};

export function mountProgQuiz(host, audio) {
  const lang = language();
  const t = TEXT[lang] || TEXT.en;
  const section = el('section', 'mk pq');
  const head = el('div', 'mk-head');
  const intro = el('p', '', t.intro); intro.append(' ', cite(REFS, 'omt-pb-4chord'));
  head.append(el('h3', '', t.title), intro);
  const kind = el('select'); Object.entries(t.kinds).forEach(([k, v]) => kind.appendChild(option(k, v)));
  const level = el('select'); Object.entries(t.levels).forEach(([k, v]) => level.appendChild(option(k, v)));
  const tempo = el('input'); tempo.type = 'number'; tempo.min = '50'; tempo.max = '160'; tempo.value = '96';
  const controls = el('div', 'mk-controls');
  controls.append(field(t.kind, kind), field(t.level, level), field(t.tempo, tempo));
  const actions = el('div', 'mk-actions');
  const meta = el('p', 'mk-meta');
  const choices = el('div', 'pq-options');
  const reveal = el('div', 'pq-reveal');
  section.append(head, controls, actions, meta, choices, reveal);
  host.appendChild(section);

  let q = null; let key = 'C'; let answered = false; let streak = 0; let best = 0;
  const bpm = () => Math.max(50, Math.min(160, Number(tempo.value) || 96));
  const minor = () => q?.entry.mode === 'minor';
  /** 主和弦 + 循环两遍的声部（流行的平滑配置，与速查一致） */
  const voices = () => voiceProgression([parseRoman(minor() ? 'i' : 'I'), ...q.entry.chords, ...q.entry.chords], { key, style: 'smooth' }).voices;
  function play() {
    const list = voices();
    const durations = list.map((_, i) => (i === 0 ? 3 : 2));
    const { events, total } = playbackEvents(list, { durations, texture: 'block' });
    const out = [];
    events.forEach((e) => e.midi.forEach((midi, k) => out.push({ beat: e.at, midi, duration: (e.index === 0 ? 2 : e.beats) * 0.95, velocity: k === 0 ? (q.kind === 'bass' ? 0.95 : 0.75) : 0.5, step: e.index })));
    audio.play(out, bpm(), total, () => {});
  }
  function newQuestion({ autoplay = true } = {}) {
    q = quizQuestion({ level: Number(level.value), kind: kind.value });
    key = KEYS[Math.floor(Math.random() * KEYS.length)];
    answered = false;
    reveal.replaceChildren();
    actions.replaceChildren(button('btn btn-primary btn-sm', t.play, () => play()), button('btn btn-secondary btn-sm', t.stop, () => audio.stop()), button('btn btn-ghost btn-sm', t.newQ, () => newQuestion()));
    meta.textContent = `${t.keyNote(key, minor())}${q.kind === 'bass' ? ` · ${t.bassHint}` : ''} · ${t.streak(streak, best)}`;
    choices.replaceChildren();
    const order = q.options.map((_, i) => i).sort(() => Math.random() - 0.5);
    order.forEach((i) => {
      const b = button('pq-option', q.options[i], () => answer(i, b));
      b.dataset.index = String(i);
      choices.appendChild(b);
    });
    if (autoplay) play();
  }
  function answer(i, b) {
    if (answered) return;
    answered = true;
    const ok = i === q.answer;
    streak = ok ? streak + 1 : 0; best = Math.max(best, streak);
    choices.querySelectorAll('.pq-option').forEach((x) => {
      x.disabled = true;
      if (Number(x.dataset.index) === q.answer) x.classList.add('is-right');
    });
    if (!ok) b.classList.add('is-wrong');
    const e = q.entry;
    const fam = FAMILIES[e.family];
    const link = el('a', 'pq-link', t.open); link.href = `#progression?q=${encodeURIComponent(`lib:${e.roman}`)}`;
    reveal.replaceChildren(
      el('p', ok ? 'mk-hint' : 'mk-hint is-error', ok ? t.right : t.wrong(q.options[q.answer])),
      el('p', 'pq-detail', `${e.romanText}  ·  ${bassLine(e.chords)}${fam ? `  ·  ${t.family}：${fam[lang] || fam.en}` : ''}${e.aliases?.length ? `  ·  ${e.aliases.slice(0, 2).join(' / ')}` : ''}`),
      link,
    );
    meta.textContent = `${t.keyNote(key, minor())} · ${t.streak(streak, best)}`;
    if (!ok) {
      const card = { type: 'choice', ref: e.refs?.[0] || 'omt-pb-4chord', prompt: PROMPT[q.kind], options: q.options.slice(),
        audio: { mode: 'chords', notes: voices().slice(1, 1 + e.chords.length).map((v) => v.midi) }, tool: { feature: 'ear', q: '@sub:schema' } };
      if (recordToolMistake(card, 'library-quiz')) reveal.appendChild(el('p', 'mk-meta dc-saved', t.saved));
    }
  }
  kind.addEventListener('change', newQuestion);
  level.addEventListener('change', newQuestion);
  host.addEventListener('toolbox-stop', () => audio.stop());
  // 挂载时先出题但不自动播放（第一次出声要等用户点击）
  newQuestion({ autoplay: false });
  return { stop: () => audio.stop() };
}

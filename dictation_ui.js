// 练耳面板里的"听写"：节奏听写（点格 + 斜线）、旋律听写（节奏 + 音高，用琴键或 MIDI 键盘写）、低音线听写（点级数或琴键）、和弦进行听写（选级数）；
// 可以整段听 也可以只重听其中一段；交卷后逐个对照 错的标红并把正确答案画在旁边；答错的题放进学习页的错题本
// 逻辑与依据见 dictation.js（ref:omt-pb-dictation ref:omt2e-rhythm ref:omt2e-phrase-model ref:omt2e-cadences）
import { rhythmQuestion, melodyQuestion, bassQuestion, progressionQuestion, compare, compareRhythm, compareMelody, segment, dotGrid, VALUE_BEATS } from './dictation.js';
import { keyInfo, spellNote, stepOf } from './motif_phrase.js';
import { parseRoman, realize } from './prog_library.js';
import { melodyStaff } from './tool_staff.js';
import { renderVisual } from './learn_visuals.js?v=20261003-r31';
import { recordToolMistake, tri } from './tool_review.js';
import { el, button, option, field, language, cite } from './module_kit.js';

const TEXT = {
  zh: {
    title: '听写', intro: '听一段 写下来 再对答案。节奏先在点格上标出起音（斜线）、延长（横线）和休止（圆圈）；旋律先写节奏、再加音高；低音线先想轮廓（往上还是往下）；和弦进行先听最后停在哪里',
    mode: '类型', modes: { rhythm: '节奏', melody: '旋律', bass: '低音线', progression: '和弦进行' }, level: '难度', tempo: '速度',
    newQ: '出新题', play: '► 听整段', from: '从', to: '到', replay: '► 只听这一段', stop: '■ 停止', submit: '交卷', undo: '退一格', clear: '清空',
    answer: '你的答案', correct: '正确答案', score: (a, b) => `对了 ${a} / ${b}`, perfect: '全对', grid: '点格（每个点是一个十六分音符的位置 粗点是拍）',
    values: { w: '全', 'h.': '附点二分', h: '二分', 'q.': '附点四分', q: '四分', 'e.': '附点八分', e: '八分', s: '十六分' }, rest: '休止',
    degrees: ['do', 're', 'mi', 'fa', 'sol', 'la', 'ti'], octave: { up: '高八度', down: '低八度' }, missing: '少写的起音', extra: '多写的起音',
    hint: { rhythm: '起音落在第几拍的哪一半', melody: '先写节奏，再加音高：每个音往上、往下还是同音；跳进的地方记一下；用唱名想', bass: '从主音开始 也回到主音', progression: '第一个和弦是 I' },
    given: (key) => `已知：高音谱表 · 主音 ${key}（大调）· 4/4。播放时先响一下主和弦。`,
    value: '时值', piano: '点琴键写音，也可以弹 MIDI 键盘（在页面顶部连接）', bassPiano: '也可以直接点琴键（只收调内音）',
    pitchWrong: '音高不对', rhythmWrong: '时值不对', missingNote: '这个位置没写音', extraNotes: (n) => `多写了 ${n} 个音`, saved: '这道题已放进学习页的错题本。',
  },
  en: {
    title: 'Dictation', intro: 'Listen, write it down, then check. For rhythm, mark attacks (slashes), sustains (dashes) and rests (circles) on a dot grid first; for a melody write the rhythm first, then add pitches; for a bass line think of the contour; for a progression listen to where it ends.',
    mode: 'Type', modes: { rhythm: 'rhythm', melody: 'melody', bass: 'bass line', progression: 'progression' }, level: 'Level', tempo: 'Tempo',
    newQ: 'New question', play: '► Play all', from: 'from', to: 'to', replay: '► Replay this part', stop: '■ Stop', submit: 'Check', undo: 'Undo', clear: 'Clear',
    answer: 'Your answer', correct: 'Correct answer', score: (a, b) => `${a} / ${b} right`, perfect: 'all correct', grid: 'dot grid (each dot is a sixteenth position; big dots are beats)',
    values: { w: 'whole', 'h.': 'dotted half', h: 'half', 'q.': 'dotted quarter', q: 'quarter', 'e.': 'dotted eighth', e: 'eighth', s: 'sixteenth' }, rest: 'rest',
    degrees: ['do', 're', 'mi', 'fa', 'sol', 'la', 'ti'], octave: { up: 'octave up', down: 'octave down' }, missing: 'missed attacks', extra: 'extra attacks',
    hint: { rhythm: 'which half of which beat each attack falls on', melody: 'write the rhythm first, then the pitches: does each note go up, down or stay? mark the leaps; think in solfège', bass: 'it starts and ends on the tonic', progression: 'the first chord is I' },
    given: (key) => `Given: treble clef · tonic ${key} (major) · 4/4. The tonic chord sounds first.`,
    value: 'Duration', piano: 'Click the keys to write notes, or play a MIDI keyboard (connect it at the top of the page)', bassPiano: 'You can also click the keys (scale notes only)',
    pitchWrong: 'wrong pitch', rhythmWrong: 'wrong duration', missingNote: 'no note written here', extraNotes: (n) => `${n} extra notes`, saved: 'This question was added to the review box on the Learn page.',
  },
};
TEXT.ja = {
  title: '聴音', intro: '聴いて、書き取って、答え合わせ。リズムはまずドット・グリッドに打鍵（スラッシュ）・延ばし（横線）・休符（丸）を記入。旋律はまずリズム、次に音高。バスラインはまず輪郭（上か下か）を考える。和声進行はまずどこで止まるかを聴く',
  mode: '種類', modes: { rhythm: 'リズム', melody: '旋律', bass: 'バスライン', progression: '和声進行' }, level: '難しさ', tempo: 'テンポ',
  newQ: '新しい問題', play: '► 全部聴く', from: 'から', to: 'まで', replay: '► この部分だけ聴く', stop: '■ 停止', submit: '答え合わせ', undo: '1 つ戻す', clear: 'クリア',
  answer: 'あなたの答え', correct: '正解', score: (a, b) => `${a} / ${b} 正解`, perfect: '全問正解', grid: 'ドット・グリッド（各点が 16 分音符の位置、太い点が拍）',
  values: { w: '全', 'h.': '付点 2 分', h: '2 分', 'q.': '付点 4 分', q: '4 分', 'e.': '付点 8 分', e: '8 分', s: '16 分' }, rest: '休符',
  degrees: ['do', 're', 'mi', 'fa', 'sol', 'la', 'ti'], octave: { up: '8 度上', down: '8 度下' }, missing: '書き落とした打鍵', extra: '余分な打鍵',
  hint: { rhythm: '各打鍵がどの拍のどの半分に来るか', melody: 'まずリズム、次に音高。上がるか下がるか同じ音か、跳躍に印を付け、階名で考える', bass: '主音で始まり主音に戻る', progression: '最初の和音は I' },
  given: (key) => `既知：ト音譜表・主音 ${key}（長調）・4/4。最初に主和音が鳴ります。`,
  value: '音価', piano: '鍵盤をクリックして書く。MIDI キーボードでも弾けます（ページ上部で接続）', bassPiano: '鍵盤をクリックしても書けます（音階の音だけ）',
  pitchWrong: '音高が違う', rhythmWrong: '音価が違う', missingNote: 'ここに音がない', extraNotes: (n) => `余分な音 ${n} 個`, saved: 'この問題を学習ページの復習ノートに入れました。',
};
// 错题本里的题干（三种语言）
const REVIEW = {
  melody: (key) => tri(`听写错题：这段旋律（${key} 大调）的唱名是哪一个？`, `聴音の復習：この旋律（${key} 長調）の階名はどれ？`, `Dictation review: which solfège matches this melody (${key} major)?`),
  bass: tri('听写错题：这条低音线（C 大调）的唱名是哪一个？', '聴音の復習：このバスライン（ハ長調）の階名はどれ？', 'Dictation review: which solfège matches this bass line (C major)?'),
  rhythm: tri('听写错题：听到的是哪一个节奏？', '聴音の復習：聴こえたリズムはどれ？', 'Dictation review: which rhythm did you hear?'),
  progression: tri('听写错题：这个和弦进行（C 大调）是哪一个？', '聴音の復習：この和声進行（ハ長調）はどれ？', 'Dictation review: which progression is this (C major)?'),
};
const REFS = ['omt-pb-dictation', 'omt2e-rhythm', 'omt2e-phrase-model', 'omt2e-cadences'];
const ROMANS = ['I', 'ii', 'iii', 'IV', 'V', 'vi'];
const MELODY_KEYS = ['C', 'G', 'F', 'D'];
const LEAD_IN = 4; // 旋律题先响两拍主和弦、空两拍
const mod7 = (n) => ((n % 7) + 7) % 7;

export function mountDictation(host, audio) {
  const lang = language();
  const t = TEXT[lang] || TEXT.en;
  const cKey = keyInfo('C');
  const section = el('section', 'mk dc');
  const head = el('div', 'mk-head');
  const intro = el('p', '', t.intro); intro.append(' ', cite(REFS, 'omt-pb-dictation'));
  head.append(el('h3', '', t.title), intro);
  const mode = el('select'); Object.entries(t.modes).forEach(([k, v]) => mode.appendChild(option(k, v)));
  const level = el('select'); [1, 2, 3].forEach((n) => level.appendChild(option(String(n), String(n))));
  const tempo = el('input'); tempo.type = 'number'; tempo.min = '40'; tempo.max = '160'; tempo.value = '80';
  const controls = el('div', 'mk-controls');
  controls.append(field(t.mode, mode), field(t.level, level), field(t.tempo, tempo), button('btn btn-primary btn-sm', t.newQ, () => newQuestion()));
  const playRow = el('div', 'mk-actions');
  const fromSel = el('select'); const toSel = el('select');
  const hint = el('p', 'mk-meta');
  const work = el('div', 'dc-work');
  const result = el('div', 'dc-result');
  section.append(head, controls, playRow, hint, work, result);
  host.appendChild(section);

  let q = null; let answer = []; let value = 'q'; let graded = false;
  const key = () => q?.key || cKey;
  const bpm = () => Math.max(40, Math.min(160, Number(tempo.value) || 80));
  const items = () => (q.kind === 'rhythm' || q.kind === 'melody' ? q.notes : q.kind === 'bass' ? q.notes.map((n) => ({ ...n, beats: 1 })) : q.chords.map(() => ({ beats: 2 })));
  const chordMidis = (roman) => { const pcs = realize(parseRoman(roman), 'C').tones.map((x) => x.pc); return [36 + pcs[0], ...pcs.map((pc) => 60 + pc)]; };
  function eventsFor(from = 0, to = Infinity) {
    const events = []; let tt = 0;
    const count = q.kind === 'rhythm' || q.kind === 'melody' ? LEAD_IN : 0;
    // 节奏题先给一小节的拍子；旋律题先给主和弦（已知主音）
    if (q.kind === 'rhythm') for (let b = 0; b < count; b += 1) events.push({ beat: b, midi: b ? 79 : 84, duration: 0.1, velocity: 0.5, step: -1 });
    if (q.kind === 'melody') [0, 4, 7].forEach((iv, i) => events.push({ beat: 0, midi: 48 + key().pc + iv + (i ? 12 : 0), duration: 1.8, velocity: 0.55, step: -1 }));
    const { start, end } = segment(items(), Math.max(0, from), Math.min(items().length - 1, to));
    items().forEach((n, i) => {
      if (tt >= start - 1e-9 && tt < end - 1e-9) {
        const at = tt - start + count;
        if (q.kind === 'rhythm' && !n.rest) events.push({ beat: at, midi: 72, duration: n.beats * 0.9, velocity: 0.9, step: i });
        if (q.kind === 'melody' && !n.rest) events.push({ beat: at, midi: n.midi, duration: n.beats * 0.92, velocity: 0.9, step: i });
        if (q.kind === 'bass') events.push({ beat: at, midi: q.notes[i].midi, duration: 0.95, velocity: 0.9, step: i });
        if (q.kind === 'progression') {
          const [bass, ...upper] = chordMidis(q.chords[i]);
          events.push({ beat: at, midi: bass, duration: 1.9, velocity: 0.7, step: i });
          upper.forEach((midi) => events.push({ beat: at, midi, duration: 1.9, velocity: 0.5, step: i }));
        }
      }
      tt += n.beats;
    });
    return { events, duration: end - start + count };
  }
  const play = (from, to) => { const d = eventsFor(from, to); audio.play(d.events, bpm(), d.duration, () => {}); };

  function newQuestion() {
    const lv = Number(level.value);
    if (mode.value === 'rhythm') q = { kind: 'rhythm', notes: rhythmQuestion({ level: lv, bars: lv === 1 ? 1 : 2 }) };
    else if (mode.value === 'melody') { const k = keyInfo(MELODY_KEYS[Math.floor(Math.random() * MELODY_KEYS.length)]); q = { kind: 'melody', key: k, notes: melodyQuestion({ level: lv, key: k }) }; }
    else if (mode.value === 'bass') q = { kind: 'bass', notes: bassQuestion({ length: 4 + lv * 2, key: cKey }) };
    else q = { kind: 'progression', ...progressionQuestion({ length: 3 + lv }) };
    answer = []; graded = false;
    result.replaceChildren();
    paintPlayRow();
    paintWork();
  }
  function paintPlayRow() {
    playRow.replaceChildren(); fromSel.replaceChildren(); toSel.replaceChildren();
    items().forEach((_, i) => { fromSel.appendChild(option(String(i), String(i + 1))); toSel.appendChild(option(String(i), String(i + 1))); });
    toSel.value = String(items().length - 1);
    playRow.append(button('btn btn-primary btn-sm', t.play, () => play(0, Infinity)), el('span', 'mk-meta', t.from), fromSel, el('span', 'mk-meta', t.to), toSel,
      button('btn btn-ghost btn-sm', t.replay, () => play(Number(fromSel.value), Math.max(Number(fromSel.value), Number(toSel.value)))), button('btn btn-secondary btn-sm', t.stop, () => audio.stop()));
    hint.textContent = q.kind === 'melody' ? `${t.given(key().name)} ${t.hint.melody}` : t.hint[q.kind];
  }
  /** 低音线：琴键 → 相对主音（C3）的级数；调外音不收 */
  const bassStepOf = (midi) => { const s = stepOf(midi, cKey); return s.offset ? null : s.step - stepOf(48, cKey).step; };
  function addNote(midi) {
    if (graded) return;
    if (q.kind === 'melody') answer.push({ value, beats: VALUE_BEATS[value], midi });
    else if (q.kind === 'bass') { const step = bassStepOf(midi); if (step === null) return; answer.push({ step }); }
    else return;
    paintWork();
  }
  // 点琴键：先试听这个音（MIDI 键盘的声音由 app_shell.js 发出，这里不重复）
  const keyboard = (from, to, lit) => renderVisual({ kind: 'piano', from, to, lit, names: 'c' }, { play: ([midi]) => { if (graded) return; audio.play([{ beat: 0, midi, duration: 0.9, velocity: 0.8, step: -1 }], 60, 1, () => {}); addNote(midi); } });
  function paintWork() {
    work.replaceChildren();
    const pad = el('div', 'mk-actions dc-pad');
    if (q.kind === 'rhythm') {
      ['h', 'q.', 'q', 'e.', 'e', 's'].forEach((v) => pad.appendChild(button('btn btn-ghost btn-sm', t.values[v], () => { answer.push({ value: v, beats: VALUE_BEATS[v] }); paintWork(); })));
      ['q', 'e'].forEach((v) => pad.appendChild(button('btn btn-ghost btn-sm', `${t.rest} ${t.values[v]}`, () => { answer.push({ value: v, beats: VALUE_BEATS[v], rest: true }); paintWork(); })));
    } else if (q.kind === 'melody') {
      pad.appendChild(el('span', 'mk-meta', t.value));
      ['h.', 'h', 'q.', 'q', 'e.', 'e', 's'].forEach((v) => {
        const b = button(`btn btn-sm ${v === value ? 'btn-primary' : 'btn-ghost'}`, t.values[v], () => { value = v; paintWork(); });
        b.dataset.value = v; b.setAttribute('aria-pressed', String(v === value));
        pad.appendChild(b);
      });
      pad.appendChild(button('btn btn-ghost btn-sm', `${t.rest} ${t.values[value]}`, () => { answer.push({ value, beats: VALUE_BEATS[value], rest: true }); paintWork(); }));
    } else if (q.kind === 'bass') {
      t.degrees.forEach((d, k) => pad.appendChild(button('btn btn-ghost btn-sm', d, () => { const last = answer.at(-1); const near = last ? Math.round((last.step - k) / 7) * 7 + k : (k > 4 ? k - 7 : k); answer.push({ step: near }); paintWork(); })));
      pad.appendChild(button('btn btn-ghost btn-sm', t.octave.up, () => { if (answer.length) answer[answer.length - 1].step += 7; paintWork(); }));
      pad.appendChild(button('btn btn-ghost btn-sm', t.octave.down, () => { if (answer.length) answer[answer.length - 1].step -= 7; paintWork(); }));
    } else ROMANS.forEach((r) => pad.appendChild(button('btn btn-ghost btn-sm', r, () => { answer.push(r); paintWork(); })));
    pad.append(button('btn btn-ghost btn-sm', t.undo, () => { answer.pop(); paintWork(); }), button('btn btn-ghost btn-sm', t.clear, () => { answer = []; paintWork(); }), button('btn btn-primary btn-sm', t.submit, () => grade()));
    work.append(pad);
    if (q.kind === 'melody') {
      const keys = el('div', 'dc-keys');
      const pianoView = keyboard(55, 84, answer.filter((a) => !a.rest).slice(-1).map((a) => a.midi));
      if (pianoView) keys.appendChild(pianoView);
      work.append(el('p', 'mk-meta', t.piano), keys);
    }
    if (q.kind === 'bass') {
      const keys = el('div', 'dc-keys');
      const pianoView = keyboard(40, 64, answer.slice(-1).map((a) => midiOf(a.step)));
      if (pianoView) keys.appendChild(pianoView);
      work.append(el('p', 'mk-meta', t.bassPiano), keys);
    }
    work.append(el('strong', '', t.answer));
    if (q.kind === 'rhythm') {
      const total = q.notes.reduce((s, n) => s + n.beats, 0);
      work.appendChild(el('p', 'mk-meta', t.grid));
      work.appendChild(gridView(answer, total));
    } else if (q.kind === 'melody') {
      work.appendChild(answer.some((a) => !a.rest) ? melodyStaff(answer, { key: key() }) : el('p', 'mk-meta', '—'));
      if (answer.length) work.appendChild(el('p', 'mk-meta', answer.map((a) => (a.rest ? `${t.rest}${t.values[a.value]}` : `${spellNote(a.midi, key())} ${t.values[a.value]}`)).join(' · ')));
    } else if (q.kind === 'bass') {
      work.appendChild(answer.length ? melodyStaff(answer.map((a) => ({ midi: midiOf(a.step), beats: 1 })), { key: cKey, clef: 'bass' }) : el('p', 'mk-meta', '—'));
    } else work.appendChild(el('p', 'dc-romans', answer.join(' – ') || '—'));
  }
  const midiOf = (step) => q.notes[0].midi - 0 + (spellStep(step) - spellStep(0));
  const spellStep = (step) => { const oct = Math.floor(step / 7); return oct * 12 + cKey.scale[((step % 7) + 7) % 7]; };
  function gridView(notes, total, marks = null) {
    const cells = dotGrid(notes, { unit: 0.25 });
    const box = el('div', 'dc-grid');
    for (let i = 0; i < Math.round(total / 0.25); i += 1) {
      const c = cells[i];
      const at = i * 0.25;
      const cell = el('span', `dc-dot${Math.abs(at % 1) < 1e-9 ? ' is-beat' : ''}${marks?.missing.includes(+at.toFixed(4)) ? ' is-missing' : ''}${marks?.extra.includes(+at.toFixed(4)) ? ' is-extra' : ''}`, c ? c.mark : '·');
      box.appendChild(cell);
    }
    return box;
  }

  // ---------------- 错题本 ----------------
  /** 唱名串：低八度加 ,，高八度加 '；调外音标 ♯ */
  const solfa = (step, offset = 0) => `${t.degrees[mod7(step)]}${offset > 0 ? '♯' : offset < 0 ? '♭' : ''}${step < 0 ? ','.repeat(Math.ceil(-step / 7)) : step >= 7 ? "'".repeat(Math.floor(step / 7)) : ''}`;
  const tonicStep = (k) => stepOf(60 + k.pc, k).step;
  const melodySolfa = (notes, k) => notes.filter((n) => !n.rest).map((n) => { const s = stepOf(n.midi, k); return solfa(s.step - tonicStep(k), s.offset); }).join(' ');
  /** 改动一个音（不动最后一个）做干扰项 */
  const variants = (steps, count = 3) => {
    const out = new Set();
    for (let tries = 0; tries < 40 && out.size < count; tries += 1) {
      const copy = steps.slice();
      const i = Math.floor(Math.random() * Math.max(1, copy.length - 1));
      copy[i] += Math.random() < 0.5 ? -1 : 1;
      out.add(copy.map((s) => solfa(s)).join(' '));
    }
    return [...out];
  };
  const rhythmText = (notes) => tri(...['zh', 'ja', 'en'].map((l) => notes.map((n) => `${n.rest ? TEXT[l].rest : ''}${TEXT[l].values[n.value]}`).join(' · ')));
  const rhythmVariants = (notes) => {
    const out = [];
    for (let i = 0; i < notes.length - 1 && out.length < 3; i += 1) {
      const a = notes[i]; const b = notes[i + 1];
      if (a.beats !== b.beats) out.push(notes.map((n, k) => (k === i ? b : k === i + 1 ? a : n))); // 相邻两个时值对调，总拍数不变
    }
    return out;
  };
  function saveMistake(kind) {
    const tool = { feature: 'ear', q: '@sub:dictation' };
    let card = null;
    if (kind === 'melody') {
      const k = key();
      const right = melodySolfa(q.notes, k);
      const steps = q.notes.filter((n) => !n.rest).map((n) => n.step);
      card = { type: 'choice', ref: 'omt-pb-dictation', prompt: REVIEW.melody(k.name), options: [right, melodySolfa(answer, k), ...variants(steps)].filter(Boolean).slice(0, 4),
        audio: { mode: 'melody', notes: [null, ...q.notes.map((n) => (n.rest ? null : n.midi))], beats: [1, ...q.notes.map((n) => n.beats)], bpm: bpm() }, tool };
    } else if (kind === 'melody-rhythm' || kind === 'rhythm') {
      const notes = q.notes;
      card = { type: 'choice', ref: 'omt-pb-dictation', prompt: REVIEW.rhythm, options: [rhythmText(notes), ...(answer.length ? [rhythmText(answer)] : []), ...rhythmVariants(notes).map(rhythmText)].slice(0, 4),
        audio: { mode: 'melody', notes: notes.map((n) => (n.rest ? null : n.midi ?? 72)), beats: notes.map((n) => n.beats), bpm: bpm() }, tool };
    } else if (kind === 'bass') {
      const steps = q.notes.map((n) => n.step);
      card = { type: 'choice', ref: 'omt-pb-dictation', prompt: REVIEW.bass, options: [steps.map((s) => solfa(s)).join(' '), answer.map((a) => solfa(a.step)).join(' '), ...variants(steps)].slice(0, 4),
        audio: { mode: 'melody', notes: q.notes.map((n) => n.midi), beats: q.notes.map(() => 1), bpm: bpm() }, tool };
    } else if (kind === 'progression') {
      const swap = (i, r) => q.chords.map((c, k) => (k === i ? r : c)).join(' – ');
      const others = [];
      for (let i = 1; i < q.chords.length - 1 && others.length < 3; i += 1) ROMANS.filter((r) => r !== q.chords[i] && r !== 'I').slice(0, 2).forEach((r) => others.push(swap(i, r)));
      card = { type: 'choice', ref: 'omt2e-phrase-model', prompt: REVIEW.progression, options: [q.chords.join(' – '), answer.join(' – '), ...others].slice(0, 4),
        audio: { mode: 'chords', notes: q.chords.map(chordMidis) }, tool };
    }
    if (card && recordToolMistake(card, 'dictation')) result.appendChild(el('p', 'mk-meta dc-saved', t.saved));
  }

  function grade() {
    result.replaceChildren();
    graded = true;
    if (q.kind === 'rhythm') {
      const r = compareRhythm(answer, q.notes);
      const total = q.notes.reduce((s, n) => s + n.beats, 0);
      result.append(el('p', r.perfect ? 'mk-hint' : 'mk-hint is-error', r.perfect ? t.perfect : `${t.missing} ${r.missing.length} · ${t.extra} ${r.extra.length}`), el('strong', '', t.answer), gridView(answer, total, r), el('strong', '', t.correct), gridView(q.notes, total), el('p', 'mk-meta', q.notes.map((n) => (n.rest ? `${t.rest}${t.values[n.value]}` : t.values[n.value])).join(' ')));
      if (!r.perfect) saveMistake('rhythm');
    } else if (q.kind === 'melody') {
      const r = compareMelody(answer, q.notes);
      const wrong = r.marks.filter((m) => !(m.rhythmOk && m.pitchOk));
      const labelFor = (m) => (!m.answerMidi && !m.rhythmOk ? t.missingNote : !m.pitchOk ? t.pitchWrong : t.rhythmWrong);
      const k = key();
      result.append(el('p', r.perfect ? 'mk-hint' : 'mk-hint is-error', r.perfect ? t.perfect : `${t.score(r.right, r.total)}${r.extra.length ? ` · ${t.extraNotes(r.extra.length)}` : ''}`),
        el('strong', '', t.correct), melodyStaff(q.notes, { key: k, lit: wrong.map((m) => m.i), labels: q.notes.map((n, i) => (wrong.some((m) => m.i === i) ? t.degrees[mod7(n.step)] : '')) }),
        el('p', 'mk-meta', q.notes.map((n) => (n.rest ? `${t.rest}${t.values[n.value]}` : `${spellNote(n.midi, k)}（${t.degrees[mod7(n.step)]}）${t.values[n.value]}`)).join(' · ')));
      if (wrong.length) {
        const list = el('ul', 'dc-issues');
        wrong.forEach((m) => list.appendChild(el('li', '', `${spellNote(q.notes[m.i].midi, k)} @ ${m.onset + 1}: ${labelFor(m)}`)));
        result.appendChild(list);
      }
      if (!r.perfect) saveMistake(wrong.some((m) => !m.pitchOk && m.answerMidi !== null) || !wrong.length ? 'melody' : 'melody-rhythm');
    } else if (q.kind === 'bass') {
      const res = compare(answer.map((a) => a.step), q.notes.map((n) => n.step));
      const wrong = res.marks.filter((m) => !m.ok).map((m) => m.i);
      result.append(el('p', res.perfect ? 'mk-hint' : 'mk-hint is-error', res.perfect ? t.perfect : t.score(res.right, res.total)), el('strong', '', t.correct),
        melodyStaff(q.notes.map((n) => ({ midi: n.midi, beats: 1 })), { key: cKey, clef: 'bass', lit: wrong, labels: q.notes.map((n, i) => (wrong.includes(i) ? `${t.degrees[((n.step % 7) + 7) % 7]}` : '')) }),
        el('p', 'mk-meta', q.notes.map((n) => spellNote(n.midi, cKey)).join(' ')));
      if (!res.perfect) saveMistake('bass');
    } else {
      const res = compare(answer, q.chords);
      const row = el('div', 'dc-compare');
      res.marks.forEach((m) => row.appendChild(el('span', `dc-chip${m.ok ? ' is-ok' : ' is-wrong'}`, `${m.answer ?? '—'} / ${m.correct ?? '—'}`)));
      result.append(el('p', res.perfect ? 'mk-hint' : 'mk-hint is-error', res.perfect ? t.perfect : t.score(res.right, res.total)), el('strong', '', `${t.answer} / ${t.correct}`), row);
      if (!res.perfect) saveMistake('progression');
    }
  }

  // MIDI 键盘（app_shell.js 转发的 toolbox-midi；声音已经由它发出）：旋律题和低音线题直接写音
  const onMidi = (event) => {
    const { type, note } = event.detail || {};
    if (type !== 'noteOn' || !host.isConnected || host.closest('[hidden]') || !host.closest('.panel')?.classList.contains('active')) return;
    addNote(note);
  };
  (globalThis.window || globalThis).addEventListener?.('toolbox-midi', onMidi);

  mode.addEventListener('change', newQuestion);
  level.addEventListener('change', newQuestion);
  newQuestion();
  host.addEventListener('toolbox-stop', () => audio.stop());
  return { stop: () => audio.stop(), select: (kind) => { mode.value = kind; newQuestion(); } };
}

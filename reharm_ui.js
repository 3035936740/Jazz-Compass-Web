// 旋律配和声面板里的"固定旋律再和声"：同一条旋律的古典 / 爵士 / 布鲁斯三种配法并排；每个旋律音在和弦里的角色（和弦音 延伸音 需要解决）；
// 爵士配法逐条说明做了什么替换、为什么某处没有替换；可以分别试听
// 逻辑与依据见 reharm.js（ref:wiki-harmonization ref:omt-pb-substitutions ref:omt-pb-blues ref:omt2e-phrase-model）
import { reharmonize, MELODIES } from './reharm.js';
import { voiceProgression } from './prog_library.js';
import { el, button, field, language, cite, sourcesFooter } from './module_kit.js';
import { parsePitch } from './pitch_spelling.js';

const TEXT = {
  zh: {
    title: '固定旋律再和声', intro: '旋律不变 换掉下面的和弦。同一个旋律音在不同和弦里可以是根音 三音 也可以是九音之类的延伸音；和弦音成半音或小九度的地方要特别小心',
    melody: '旋律（每个和弦一个音）', presets: '示例', styles: { classical: '古典', jazz: '爵士', blues: '布鲁斯' }, play: '► 听', stop: '■ 停止',
    roles: { chord: '和弦音', tension: '延伸音', clash: '需要解决' }, bad: '读不懂旋律 写法如 E4 D4 C4 D4 E4', none: '古典配法没有找到合规的结果（每个旋律音都要是和弦音 并以 V–I 结束） 换几个音试试；布鲁斯配法照样给出',
    changes: '做了什么', melodyRow: '旋律',
  },
  en: {
    title: 'Reharmonizing a fixed melody', intro: 'Keep the melody, change the chords underneath. The same melody note can be a chord’s root, third or a tension such as a ninth; semitone or minor-ninth clashes need care.',
    melody: 'Melody (one note per chord)', presets: 'Examples', styles: { classical: 'classical', jazz: 'jazz', blues: 'blues' }, play: '► Play', stop: '■ Stop',
    roles: { chord: 'chord tone', tension: 'tension', clash: 'needs resolution' }, bad: 'Could not read the melody — e.g. E4 D4 C4 D4 E4', none: 'No valid classical harmonization (every melody note must be a chord tone, ending V–I) — try other notes; the blues version is still shown',
    changes: 'What changed', melodyRow: 'Melody',
  },
};
TEXT.ja = {
    title: '固定旋律のリハーモナイズ', intro: '旋律はそのままで下の和音を代える。同じ旋律音でも、和音によって根音にも 3 音にも 9 音のような延長音にもなる。和音の音と半音や短 9 度になる所は特に注意',
    melody: '旋律（和音ごとに 1 音）', presets: '例', styles: { classical: '古典', jazz: 'ジャズ', blues: 'ブルース' }, play: '► 聴く', stop: '■ 停止',
    roles: { chord: '和音の音', tension: '延長音', clash: '解決が必要' }, bad: '旋律が読めない。書き方の例 E4 D4 C4 D4 E4', none: '規則に合う古典の付け方が見つからない（旋律音はすべて和音の音で、V–I で終わる必要がある）。音を少し変えてみて。ブルースの付け方は表示する',
    changes: '何をしたか', melodyRow: '旋律',
  };
const REFS = ['wiki-harmonization', 'omt2e-phrase-model', 'omt-pb-substitutions', 'omt-pb-blues'];

export function mountReharm(host, audio) {
  const lang = language();
  const t = TEXT[lang] || TEXT.en;
  const tx = (v) => (typeof v === 'string' ? v : v[lang] ?? v.en);
  const section = el('section', 'mk rh');
  const head = el('div', 'mk-head');
  const intro = el('p', '', t.intro); intro.append(' ', cite(REFS, 'wiki-harmonization'));
  head.append(el('h3', '', t.title), intro);
  const input = el('input'); input.type = 'text'; input.value = MELODIES[1].notes.join(' '); input.spellcheck = false;
  const controls = el('div', 'mk-controls'); controls.append(field(t.melody, input, 'mk-grow'));
  const presets = el('div', 'mk-actions'); presets.appendChild(el('span', 'mk-meta', t.presets));
  MELODIES.forEach((m) => presets.appendChild(button('btn btn-ghost btn-sm', m.notes.join(' '), () => { input.value = m.notes.join(' '); paint(); })));
  const message = el('p', 'mk-hint');
  const grid = el('div', 'rh-grid');
  section.append(head, controls, presets, message, grid, sourcesFooter(REFS));
  host.appendChild(section);

  function playStyle(melody, chords) {
    const voiced = voiceProgression(chords, { key: 'C' }).voices;
    const events = [];
    voiced.forEach((v, i) => {
      events.push({ beat: i * 2, midi: parsePitch(melody[i]).midi + 12 * (parsePitch(melody[i]).midi < 64 ? 1 : 0), duration: 1.9, velocity: 0.95, step: i });
      v.midi.forEach((m) => events.push({ beat: i * 2, midi: Math.min(m, 60 + (m % 12)), duration: 1.9, velocity: 0.45, step: i }));
    });
    audio.play(events, 84, melody.length * 2, () => {});
  }
  function paint() {
    grid.replaceChildren();
    const melody = input.value.trim().split(/[\s,，\-|]+/).filter(Boolean);
    if (!melody.length || melody.some((n) => !parsePitch(n))) { message.textContent = t.bad; return; }
    let res;
    try { res = reharmonize({ melody }); } catch (e) { message.textContent = t.bad; return; }
    message.textContent = res.classical.ok ? '' : t.none;
    const table = el('div', 'rh-table');
    table.style.setProperty('--n', String(melody.length));
    const row = (label, cells, cls = '') => { const r = el('div', `rh-row ${cls}`); r.appendChild(el('span', 'rh-label', label)); cells.forEach((c) => r.appendChild(c)); table.appendChild(r); };
    row(t.melodyRow, melody.map((n) => el('span', 'rh-cell rh-melody', n)));
    ['classical', 'jazz', 'blues'].forEach((style) => {
      const s = res[style];
      if (!s.ok) return;
      const label = el('span', 'rh-label');
      label.append(el('strong', '', t.styles[style]), button('btn btn-ghost btn-sm', t.play, () => playStyle(melody, s.chords)));
      const r = el('div', 'rh-row'); r.appendChild(label);
      s.roles.forEach((role) => { const cell = el('span', `rh-cell is-${role.role}`); cell.append(el('strong', '', role.chord), el('span', '', role.roman), el('small', '', `${t.roles[role.role]}`)); cell.title = tx(role.label); r.appendChild(cell); });
      table.appendChild(r);
    });
    grid.appendChild(table);
    grid.appendChild(button('btn btn-secondary btn-sm', t.stop, () => audio.stop()));
    ['classical', 'jazz', 'blues'].forEach((style) => {
      const s = res[style];
      if (!s.ok || !s.changes.length) return;
      const box = el('div', 'rh-changes');
      box.appendChild(el('strong', '', `${t.styles[style]} · ${t.changes}`));
      s.changes.forEach((c) => box.appendChild(el('p', 'mk-meta', `${c.at >= 0 ? `${c.at + 1}. ` : ''}${tx(c.why)}`)));
      grid.appendChild(box);
    });
  }
  input.addEventListener('input', () => { clearTimeout(input.debounce); input.debounce = setTimeout(paint, 300); });
  paint();
  host.addEventListener('toolbox-stop', () => audio.stop());
  return { stop: () => audio.stop() };
}

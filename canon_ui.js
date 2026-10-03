// 对位面板里的"模仿与卡农"：写一条导句 → 设定答句进入的时间与音程（同度 八度 五度 四度…）、严格 / 自由 / 倒影 →
// 看两个声部的谱 检查每个起音点的音程（拍上不协和 平行五八度）→ 单独听某个声部或一起听
// 逻辑与依据见 canon.js（ref:wiki-canon ref:omt-intervals ref:omt-species1）
import { buildCanon, checkCanon, canonEvents, INTERVALS } from './canon.js';
import { keyInfo, parseMotif, spellNote } from './motif_phrase.js';
import { voicesStaff } from './tool_staff.js';
import { el, button, option, field, language, cite, sourcesFooter } from './module_kit.js';

const TEXT = {
  zh: {
    title: '模仿与卡农', intro: '先写导句（音名加时值） 答句在几拍之后用同样的旋律进入；同度或八度上完全一样就是轮唱；倒影卡农的答句方向相反。检查器标出每个起音点的音程',
    leader: '导句', delay: '答句晚几拍进入', interval: '音程', type: '类型', types: { diatonic: '自由（按音阶移）', strict: '严格（按半音移）', inversion: '倒影' }, voices: '声部数',
    play: '► 一起听', solo: (n) => `只听第 ${n} 声部`, stop: '■ 停止', bad: '读不懂导句 写法如 C4:q D4:q E4:h',
    presets: '示例', check: '音程检查', ok: '拍上没有不协和 也没有平行五度 八度', rules: { dissonance: '拍上不协和', passing: '拍外不协和（经过 / 辅助）', 'parallel-5': '平行五度', 'parallel-8': '平行八度 / 同度' },
    at: (b) => `第 ${b + 1} 拍`, classes: { perfect: '完全协和', imperfect: '不完全协和', dissonant: '不协和' },
  },
  en: {
    title: 'Imitation & canon', intro: 'Write a leader (note + duration); the follower enters some beats later with the same melody. Exact at the unison or octave it is a round; in an inversion canon the follower moves the other way. The checker labels the interval at every onset.',
    leader: 'Leader', delay: 'Follower enters after (beats)', interval: 'Interval', type: 'Type', types: { diatonic: 'free (by scale step)', strict: 'strict (by semitone)', inversion: 'inversion' }, voices: 'Voices',
    play: '► All voices', solo: (n) => `Voice ${n} only`, stop: '■ Stop', bad: 'Could not read the leader — e.g. C4:q D4:q E4:h',
    presets: 'Examples', check: 'Interval check', ok: 'No dissonance on the beat and no parallel fifths or octaves', rules: { dissonance: 'dissonance on the beat', passing: 'off-beat dissonance (passing / neighbour)', 'parallel-5': 'parallel fifths', 'parallel-8': 'parallel octaves / unisons' },
    at: (b) => `beat ${b + 1}`, classes: { perfect: 'perfect consonance', imperfect: 'imperfect consonance', dissonant: 'dissonance' },
  },
};
TEXT.ja = {
    title: '模倣とカノン', intro: 'まず先行声部（音名と音価）を書く。後続声部は数拍後に同じ旋律で入る。同度か 8 度でまったく同じなら輪唱、反行カノンでは後続声部が逆の方向へ進む。チェッカーが各打点の音程を示す',
    leader: '先行声部', delay: '後続声部が何拍遅れて入るか', interval: '音程', type: '種類', types: { diatonic: '自由（音階に沿って移す）', strict: '厳格（半音で移す）', inversion: '反行' }, voices: '声部数',
    play: '► 一緒に聴く', solo: (n) => `第 ${n} 声部だけ`, stop: '■ 停止', bad: '先行声部が読めない。書き方の例 C4:q D4:q E4:h',
    presets: '例', check: '音程のチェック', ok: '拍上の不協和も平行 5 度 8 度もない', rules: { dissonance: '拍上の不協和', passing: '拍外の不協和（経過 / 刺繍）', 'parallel-5': '平行 5 度', 'parallel-8': '平行 8 度 / 同度' },
    at: (b) => `${b + 1} 拍目`, classes: { perfect: '完全協和', imperfect: '不完全協和', dissonant: '不協和' },
  };
const REFS = ['wiki-canon', 'omt-intervals', 'omt-species1'];
const PRESETS = [
  { label: 'Frère Jacques', text: 'C4 D4 E4 C4 C4 D4 E4 C4 E4 F4 G4:h E4 F4 G4:h', delay: 8, interval: 'unison' },
  { label: 'C D E F G', text: 'C5:h D5:q E5:q F5:h E5:h D5:h C5:w', delay: 2, interval: 'octaveBelow' },
  { label: 'G E C', text: 'G4:q E4:q C4:h D4:q F4:q E4:h', delay: 2, interval: 'fifthBelow' },
];

export function mountCanon(host, audio) {
  const lang = language();
  const t = TEXT[lang] || TEXT.en;
  const section = el('section', 'mk cn');
  const head = el('div', 'mk-head');
  head.append(el('h3', '', t.title), el('p', '', t.intro));
  const input = el('input'); input.type = 'text'; input.value = PRESETS[0].text; input.spellcheck = false;
  const delay = el('select'); [1, 2, 3, 4, 6, 8].forEach((n) => delay.appendChild(option(String(n), String(n)))); delay.value = '8';
  const interval = el('select'); INTERVALS.forEach((iv) => interval.appendChild(option(iv.id, iv[lang] || iv.en)));
  const type = el('select'); Object.entries(t.types).forEach(([k, v]) => type.appendChild(option(k, v)));
  const voices = el('select'); [2, 3].forEach((n) => voices.appendChild(option(String(n), String(n))));
  const controls = el('div', 'mk-controls');
  controls.append(field(t.leader, input, 'mk-grow'), field(t.delay, delay), field(t.interval, interval), field(t.type, type), field(t.voices, voices));
  const presets = el('div', 'mk-actions');
  presets.appendChild(el('span', 'mk-meta', t.presets));
  PRESETS.forEach((p) => presets.appendChild(button('btn btn-ghost btn-sm', p.label, () => { input.value = p.text; delay.value = String(p.delay); interval.value = p.interval; paint(); })));
  const message = el('p', 'mk-hint');
  const staffBox = el('div', 'cn-staff');
  const actions = el('div', 'mk-actions');
  const report = el('div', 'cn-report');
  section.append(head, controls, presets, message, staffBox, actions, report, sourcesFooter(REFS));
  host.appendChild(section);

  let canon = null;
  const play = (muted) => audio.play(canonEvents(canon, { muted }).events, 96, canon.length, () => {});
  function paint() {
    const leader = parseMotif(input.value);
    message.textContent = leader ? '' : t.bad;
    staffBox.replaceChildren(); actions.replaceChildren(); report.replaceChildren();
    if (!leader) return;
    const key = keyInfo('C');
    const steps = INTERVALS.find((iv) => iv.id === interval.value).steps;
    canon = buildCanon(leader, { key, delay: Number(delay.value), steps, type: type.value, voices: Number(voices.value) });
    const clefs = canon.parts.map((p) => (Math.min(...p.notes.filter((n) => !n.rest).map((n) => n.midi)) < 55 ? 'bass' : 'treble'));
    staffBox.appendChild(voicesStaff(canon.parts, { key, clefs, length: canon.length }));
    actions.append(button('btn btn-primary btn-sm', t.play, () => play([])), ...canon.parts.map((_, v) => button('btn btn-ghost btn-sm', t.solo(v + 1), () => play(canon.parts.map((__, k) => k !== v)))), button('btn btn-secondary btn-sm', t.stop, () => audio.stop()));
    const res = checkCanon(canon);
    const title = el('div', 'mk-actions'); title.append(el('strong', '', t.check), cite(REFS, 'omt-intervals'));
    report.appendChild(title);
    const errors = res.issues.filter((i) => i.severity === 'error');
    report.appendChild(el('p', errors.length ? 'mk-hint is-error' : 'mk-hint', errors.length ? errors.map((i) => `${t.at(i.beat)} ${t.rules[i.rule]}`).join(' · ') : t.ok));
    const row = el('div', 'cn-points');
    res.points.forEach((p) => {
      const issue = res.issues.find((i) => i.beat === p.beat && i.severity === 'error');
      const chip = el('span', `cn-point is-${p.cls}${issue ? ' is-error' : ''}${p.strong ? ' is-strong' : ''}`, `${p.beat}: ${spellNote(p.lower, key)}–${spellNote(p.upper, key)} ${p.interval}`);
      chip.title = `${t.classes[p.cls]}${issue ? ` · ${t.rules[issue.rule]}` : ''}`;
      row.appendChild(chip);
    });
    report.appendChild(row);
  }
  [delay, interval, type, voices].forEach((n) => n.addEventListener('change', paint));
  input.addEventListener('input', () => { clearTimeout(input.debounce); input.debounce = setTimeout(paint, 250); });
  paint();
  host.addEventListener('toolbox-stop', () => audio.stop());
  return { stop: () => audio.stop() };
}

// 类别对位界面
// 规则见 counterpoint.js；定旋律与 Fux 解答来自 ref:gotham-species（数据）与 ref:omt2e-gradus（定旋律一览）
import { checkCounterpoint, checkCantus, parseCounterpointText, RULES } from './counterpoint.js';
import { FUX_TWO_VOICE } from './fux_species_data.js';
import { parsePitch } from './pitch_spelling.js';
import { renderStaff } from './staff_svg.js?v=20261002-fix';
import { el, button, option, field, language, midiToFrequency, sourcesFooter, tabs, relatedLinks, midiExportButton } from './module_kit.js';
import { REFERENCES } from './references.js';

const SOURCES = ['omt-intervals', 'omt-cantus', 'omt-species1', 'omt-species2', 'omt-species3', 'omt-species4', 'omt2e-intro', 'omt2e-fifth', 'omt2e-gradus', 'gotham-species'];

const TEXT = {
  zh: {
    kicker: 'Fux 体系 · 二声部', title: '类别对位',
    intro: '在定旋律上方或下方写一条对位声部，按第一至第五类的规则逐音检查。规则取自 Open Music Theory 教材，部分比 Fux 原书更严格；Fux 本人的 46 个解答可作为范例载入。',
    tabs: { check: '练习检查', fux: 'Fux 范例', rules: '规则表' },
    species: '类别', speciesNames: ['第一类 1:1', '第二类 2:1', '第三类 4:1', '第四类 切分挂留', '第五类 华彩'],
    cantus: '定旋律', custom: '自定义', position: '对位位置', above: '定旋律上方', below: '定旋律下方',
    cantusInput: '定旋律（空格分隔，带八度，如 D4 F4 E4）', cpInput: '对位声部',
    syntax: '小节用 | 分隔，音带八度（C5、F#4、Bb3）；r 为休止，~ 前缀表示与前一音相连（挂留），第五类用 :w :h :q :e 标时值。',
    check: '检查', play: '► 播放', stop: '■ 停止', loadFux: '载入 Fux 解答', noFux: '这一组合没有 Fux 解答',
    staffCp: '对位', staffCf: '定旋律',
    ok: '没有发现问题。', errors: (e, w) => `${e} 个错误，${w} 个提醒`,
    error: '错误', warning: '提醒', bar: (n) => `第 ${n} 小节`, whole: '全曲',
    cantusIssues: '定旋律本身', fig22: '此例第 6–10 小节在数据集中出现纯四度与大七度跳进（带标注版本亦同），可能是录入时的八度问题，请以原书为准。',
    fuxHead: ['图号', '类别', '终止音', '定旋律', ''], open: '打开',
    rulesHead: ['规则', '适用', '级别', '出处'],
    parseError: '无法解析：',
  },
  ja: {
    kicker: 'フックスの体系・二声', title: '類別対位法',
    intro: '定旋律の上または下に対旋律を書き、第一類から第五類の規則で一音ずつ検査します。規則は Open Music Theory に基づき、一部はフックスの原典より厳格です。フックス自身の 46 の解答を例として読み込めます。',
    tabs: { check: '課題の検査', fux: 'フックスの例', rules: '規則一覧' },
    species: '類', speciesNames: ['第一類 1:1', '第二類 2:1', '第三類 4:1', '第四類 掛留', '第五類 華麗'],
    cantus: '定旋律', custom: '自作', position: '対旋律の位置', above: '定旋律の上', below: '定旋律の下',
    cantusInput: '定旋律（空白区切り、オクターブ付き：D4 F4 E4）', cpInput: '対旋律',
    syntax: '小節は | で区切り、音はオクターブ付き（C5・F#4・Bb3）。r は休符、~ は前の音とのタイ（掛留）、第五類は :w :h :q :e で音価を指定。',
    check: '検査', play: '► 再生', stop: '■ 停止', loadFux: 'フックスの解答を読み込む', noFux: 'この組み合わせにはフックスの解答がありません',
    staffCp: '対旋律', staffCf: '定旋律',
    ok: '問題は見つかりませんでした。', errors: (e, w) => `誤り ${e} 件、注意 ${w} 件`,
    error: '誤り', warning: '注意', bar: (n) => `第 ${n} 小節`, whole: '全体',
    cantusIssues: '定旋律そのもの', fig22: 'この例の第 6–10 小節はデータセット上で完全四度と長七度の跳躍を含みます（注釈版も同じ）。入力時のオクターブの誤りの可能性があるため、原典を確認してください。',
    fuxHead: ['図番号', '類', '終止音', '定旋律', ''], open: '開く',
    rulesHead: ['規則', '適用', '程度', '出典'],
    parseError: '解析できません：',
  },
  en: {
    kicker: 'After Fux · two voices', title: 'Species counterpoint',
    intro: 'Write a line above or below a cantus firmus and check it note by note against the rules of the first to fifth species. Rules follow the Open Music Theory textbook, which is stricter than Fux in places; Fux’s own 46 solutions can be loaded as models.',
    tabs: { check: 'Check an exercise', fux: 'Fux’s models', rules: 'Rules' },
    species: 'Species', speciesNames: ['First 1:1', 'Second 2:1', 'Third 4:1', 'Fourth (syncopation)', 'Fifth (florid)'],
    cantus: 'Cantus firmus', custom: 'Custom', position: 'Counterpoint', above: 'Above the cantus', below: 'Below the cantus',
    cantusInput: 'Cantus firmus (space separated, with octaves, e.g. D4 F4 E4)', cpInput: 'Counterpoint',
    syntax: 'Separate bars with |, write pitches with octaves (C5, F#4, Bb3); r is a rest, a ~ prefix ties to the previous note (suspension), and fifth species takes :w :h :q :e durations.',
    check: 'Check', play: '► Play', stop: '■ Stop', loadFux: 'Load Fux’s solution', noFux: 'Fux has no solution for this combination',
    staffCp: 'Counterpoint', staffCf: 'Cantus',
    ok: 'No problems found.', errors: (e, w) => `${e} error(s), ${w} warning(s)`,
    error: 'Error', warning: 'Warning', bar: (n) => `Bar ${n}`, whole: 'Whole line',
    cantusIssues: 'The cantus firmus itself', fig22: 'Bars 6–10 of this figure contain a perfect fourth and a leap of a major seventh in the dataset (the annotated version agrees). This may be an octave error in transcription; check the printed edition.',
    fuxHead: ['Figure', 'Species', 'Final', 'Cantus', ''], open: 'Open',
    rulesHead: ['Rule', 'Applies to', 'Level', 'Source'],
    parseError: 'Could not parse: ',
  },
};

/** 规则说明（按代码），{x} 为参数 */
const MESSAGES = {
  zh: {
    'cf-length': '定旋律宜为 8–16 个音（现为 {count}）。', 'cf-ends': '定旋律应以 do 开始并结束。', 'cf-approach': '定旋律应级进到达最后的主音（re–do 或 ti–do）。',
    'cf-range': '定旋律音域不宜超过十度（现为 {span} 度）。', 'cf-climax': '定旋律的最高音应只出现一次。', 'cf-leap-recovery': '四度及以上的跳进之后应反向级进。',
    'cf-leap-run': '不要连续三次跳进。', 'cf-leap-direction': '不要同方向连续跳进。',
    'melodic-dissonance': '旋律中出现不协和音程 {interval}（增减音程、七度或超过八度）。',
    'start-interval': '开头音程为 {interval}：上方对位应从 do 或 sol（同度、五度、八度）开始，下方对位应从 do 开始。',
    'final-interval': '结尾音程为 {interval}，应为同度或八度（do）。', 'final-step': '应以级进到达最后的八度或同度。',
    'final-contrary': '最后的音程应以反向级进到达。', 'penultimate': '倒数第二个音程为 {interval}，宜为小三度或大六度。',
    'dissonance': '出现不协和音程 {interval}；第一类只能用协和音程。', 'unison-inner': '同度只用于开头和结尾。',
    'parallel-perfect': '连续两个相同的完全协和音程（{interval}）。', 'direct-perfect': '以同向进行进入完全协和音程 {interval}（直接五度/八度）。',
    'imperfect-run': '同一种不完全协和音程（{interval}）连续超过三次。', 'voice-crossing': '声部交叉。', 'voice-overlap': '声部超越（越过另一声部的前一个音）。',
    'range': '对位音域不宜超过十二度（现为 {span} 度）。', 'climax': '对位应只有一个最高点，且不与定旋律的最高点重合。',
    'repetition': '同音反复超过一次（{count} 次）。', 'similar-leap': '同向进行时不宜跳进。',
    'rhythm': '这一小节的节奏不符合该类别的写法。', 'downbeat-dissonance': '强拍出现不协和音程 {interval}。', 'downbeat-unison': '强拍宜避免同度。',
    'downbeat-parallel': '相邻两小节的强拍是相同的完全协和音程（{interval}）。', 'downbeat-outline': '相邻强拍之间勾勒出不协和的旋律音程。',
    'downbeat-imperfect-run': '连续超过三个小节的强拍是同一种不完全协和音程（{interval}）。', 'weak-not-passing': '弱拍的不协和音 {interval} 不是级进的经过音。',
    'downbeat-unison-3': '第三类的强拍不能是同度。', 'downbeat-parallel-3': '连续三个小节的强拍是相同的完全协和音程（{interval}）。',
    'weak-unexplained': '不协和音 {interval} 不是经过音、辅助音、双辅助音或换音。',
    'suspension-preparation': '强拍不协和音 {interval} 没有以连线的协和音预备。', 'suspension-resolution': '挂留音 {interval} 没有级进下行解决到协和音。',
    'suspension-type': '挂留 {type} 不在允许之列（上方：7–6、4–3、9–8；下方：2–3、5–6、4–5）。', 'suspension-repeat': '不要连续使用 {type} 挂留。',
    'weak-perfect-run': '相邻弱拍出现相同的完全协和音程（{interval}）。', 'cadence-suspension': '终止宜用上方 7–6 或下方 2–3 挂留（现为 {type}）。',
    'eighth-placement': '八分音符应成对出现在弱拍（第二或第四个四分音符）。', 'note-value': '时值 {value} 不在第五类可用的音符之内。',
  },
  ja: {
    'cf-length': '定旋律は 8–16 音が目安です（現在 {count}）。', 'cf-ends': '定旋律は do で始まり do で終わります。', 'cf-approach': '最後の主音へは順次進行（re–do または ti–do）で到達します。',
    'cf-range': '定旋律の音域は十度以内が目安です（現在 {span} 度）。', 'cf-climax': '定旋律の最高音は一度だけ現れるようにします。', 'cf-leap-recovery': '四度以上の跳躍の後は反対方向へ順次進行します。',
    'cf-leap-run': '跳躍を三回続けないでください。', 'cf-leap-direction': '同じ方向への跳躍を続けないでください。',
    'melodic-dissonance': '旋律に不協和な音程 {interval}（増減音程・七度・八度超）があります。',
    'start-interval': '開始音程は {interval}。上の対旋律は do か sol（一度・五度・八度）、下の対旋律は do で始めます。',
    'final-interval': '終止音程は {interval}。一度か八度（do）にします。', 'final-step': '最後の八度・一度へは順次進行で到達します。',
    'final-contrary': '最後の音程へは反行の順次進行で到達します。', 'penultimate': '最後から二番目の音程は {interval}。短三度か長六度が適切です。',
    'dissonance': '不協和音程 {interval} があります。第一類は協和音程のみです。', 'unison-inner': '一度は最初と最後だけに使います。',
    'parallel-perfect': '同じ完全協和音程（{interval}）が続いています。', 'direct-perfect': '並行して完全協和音程 {interval} に進んでいます（直行五度・八度）。',
    'imperfect-run': '同じ不完全協和音程（{interval}）が三回を超えて続いています。', 'voice-crossing': '声部が交差しています。', 'voice-overlap': '声部が相手の直前の音を越えています。',
    'range': '対旋律の音域は十二度以内が目安です（現在 {span} 度）。', 'climax': '対旋律の最高点は一つにし、定旋律の最高点と重ねないようにします。',
    'repetition': '同音の反復が一回を超えています（{count} 回）。', 'similar-leap': '並行進行での跳躍は避けます。',
    'rhythm': 'この小節のリズムはこの類の書き方に合っていません。', 'downbeat-dissonance': '強拍に不協和音程 {interval} があります。', 'downbeat-unison': '強拍の一度は避けます。',
    'downbeat-parallel': '隣り合う小節の強拍が同じ完全協和音程（{interval}）です。', 'downbeat-outline': '隣り合う強拍の間に不協和な旋律音程があります。',
    'downbeat-imperfect-run': '三小節を超えて強拍が同じ不完全協和音程（{interval}）です。', 'weak-not-passing': '弱拍の不協和音 {interval} が順次進行の経過音になっていません。',
    'downbeat-unison-3': '第三類の強拍は一度にできません。', 'downbeat-parallel-3': '三小節続けて強拍が同じ完全協和音程（{interval}）です。',
    'weak-unexplained': '不協和音 {interval} が経過音・刺繍音・二重刺繍音・カンビアータのいずれでもありません。',
    'suspension-preparation': '強拍の不協和音 {interval} がタイで結ばれた協和音で予備されていません。', 'suspension-resolution': '掛留音 {interval} が順次下行して協和音へ解決していません。',
    'suspension-type': '掛留 {type} は許されていません（上：7–6・4–3・9–8、下：2–3・5–6・4–5）。', 'suspension-repeat': '{type} の掛留を続けて使わないでください。',
    'weak-perfect-run': '隣り合う弱拍が同じ完全協和音程（{interval}）です。', 'cadence-suspension': '終止は上の 7–6 か下の 2–3 の掛留が適切です（現在 {type}）。',
    'eighth-placement': '八分音符は対にして弱拍（二つ目か四つ目の四分音符）に置きます。', 'note-value': '音価 {value} は第五類で使えません。',
  },
  en: {
    'cf-length': 'A cantus firmus is usually 8–16 notes long (now {count}).', 'cf-ends': 'The cantus should begin and end on do.', 'cf-approach': 'Approach the final tonic by step (re–do or ti–do).',
    'cf-range': 'Keep the cantus within a tenth (now a {span}th).', 'cf-climax': 'The highest note of the cantus should appear only once.', 'cf-leap-recovery': 'Follow a leap of a fourth or more with a step in the opposite direction.',
    'cf-leap-run': 'No more than two leaps in a row.', 'cf-leap-direction': 'No consecutive leaps in the same direction.',
    'melodic-dissonance': 'Dissonant melodic interval {interval} (augmented/diminished, seventh or wider than an octave).',
    'start-interval': 'Opening interval is {interval}: a line above starts on do or sol (unison, fifth, octave); a line below starts on do.',
    'final-interval': 'Final interval is {interval}; end on a unison or octave (do).', 'final-step': 'Arrive at the final octave or unison by step.',
    'final-contrary': 'Approach the final interval by contrary stepwise motion.', 'penultimate': 'The penultimate interval is {interval}; a minor third or major sixth is expected.',
    'dissonance': 'Dissonance {interval}: first species uses consonances only.', 'unison-inner': 'Use unisons only for the first and last intervals.',
    'parallel-perfect': 'Two of the same perfect interval in a row ({interval}).', 'direct-perfect': 'Similar motion into the perfect interval {interval} (direct fifth/octave).',
    'imperfect-run': 'More than three of the same imperfect consonance ({interval}) in a row.', 'voice-crossing': 'Voice crossing.', 'voice-overlap': 'Voice overlap (passing the other voice’s previous note).',
    'range': 'Keep the counterpoint within a twelfth (now a {span}th).', 'climax': 'Give the counterpoint a single climax that does not coincide with the cantus climax.',
    'repetition': 'More than one repeated note ({count}).', 'similar-leap': 'Avoid combining similar motion with leaps.',
    'rhythm': 'The rhythm of this bar does not fit the species.', 'downbeat-dissonance': 'Dissonance {interval} on a downbeat.', 'downbeat-unison': 'Avoid unisons on downbeats.',
    'downbeat-parallel': 'Two consecutive bars begin with the same perfect interval ({interval}).', 'downbeat-outline': 'Consecutive downbeats outline a dissonant melodic interval.',
    'downbeat-imperfect-run': 'More than three bars in a row begin with the same imperfect consonance ({interval}).', 'weak-not-passing': 'Weak-beat dissonance {interval} is not a stepwise passing tone.',
    'downbeat-unison-3': 'Third-species downbeats may not be unisons.', 'downbeat-parallel-3': 'Three consecutive bars begin with the same perfect interval ({interval}).',
    'weak-unexplained': 'Dissonance {interval} is not a passing, neighbour, double-neighbour or cambiata tone.',
    'suspension-preparation': 'Downbeat dissonance {interval} is not prepared by a tied consonance.', 'suspension-resolution': 'Suspension {interval} does not resolve down by step to a consonance.',
    'suspension-type': 'Suspension {type} is not permitted (above: 7–6, 4–3, 9–8; below: 2–3, 5–6, 4–5).', 'suspension-repeat': 'Do not use {type} suspensions twice in a row.',
    'weak-perfect-run': 'Consecutive weak beats form the same perfect interval ({interval}).', 'cadence-suspension': 'Cadence with a 7–6 above or 2–3 below (now {type}).',
    'eighth-placement': 'Eighth notes come in pairs on weak beats (second or fourth quarter).', 'note-value': 'Duration {value} is not a fifth-species note value.',
  },
};

const VALUE_SUFFIX = { 4: 'w', 2: 'h', 1: 'q', 0.5: 'e' };
const DEFAULT_VALUE = { 1: 4, 2: 2, 3: 1, 4: 2, 5: 1 };

function barsToText(bars, species) {
  return bars.map((bar) => bar.map((n) => {
    const name = n.p || 'r';
    const implicit = bar.length === 1 ? 4 : DEFAULT_VALUE[species];
    const suffix = species === 5 || n.d !== implicit ? `:${VALUE_SUFFIX[n.d] ?? 'q'}` : '';
    return `${n.tieIn ? '~' : ''}${name}${suffix}`;
  }).join(' ')).join(' | ');
}

function format(template, params) {
  return template.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? '');
}

export function mountCounterpoint(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  const messages = MESSAGES[lang];
  const presets = [];
  for (const ex of FUX_TWO_VOICE) {
    const line = ex.bars.map((b) => b.cf).join(' ');
    if (!presets.some((p) => p.line === line)) presets.push({ id: `fux-${presets.length}`, final: ex.final, line, label: `${ex.final}（Fux）` });
  }
  const state = { species: 1, preset: presets[0].id, customCantus: presets[0].line, position: 'above', text: '', figure: null };
  let timers = [];
  const clearPlaying = () => target.querySelectorAll('.staff-note.is-playing').forEach((node) => node.classList.remove('is-playing'));
  const stop = () => { timers.forEach(clearTimeout); timers = []; clearPlaying(); };
  target.addEventListener('toolbox-stop', stop);

  const cantusLine = () => (state.preset === 'custom' ? state.customCantus : presets.find((p) => p.id === state.preset).line).trim().split(/\s+/).filter(Boolean);
  const fuxFor = () => FUX_TWO_VOICE.find((ex) => ex.species === state.species && ex.bars.map((b) => b.cf).join(' ') === cantusLine().join(' ') && (ex.cantus === 'lower') === (state.position === 'above'));
  const loadFux = () => {
    const ex = fuxFor();
    if (!ex) return false;
    state.text = barsToText(ex.bars.map((b) => b.cp), ex.species);
    state.figure = ex.figure;
    return true;
  };
  loadFux();

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));
  root.appendChild(head);
  const body = el('div', 'mk-section');
  const views = {};

  function refLink(id) {
    const reference = REFERENCES.find((r) => r.id === id);
    const link = el('a', 'mk-cite', `[${SOURCES.indexOf(id) + 1}]`);
    if (reference) { link.href = reference.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.title = reference.title; }
    return link;
  }

  function play(cantus, bars) {
    stop();
    const quarter = 0.42;
    const events = counterpointEvents(cantus, bars);
    const first = events[0]?.time ?? 0;
    const noteNode = (event) => target.querySelector(`.staff-note[data-staff="${event.staff}"][data-bar="${event.bar}"][data-index="${event.index}"]`);
    events.forEach((event, index) => {
      const start = (event.time - first) * quarter * 1000;
      timers.push(setTimeout(() => {
        playChord([midiToFrequency(event.midi)], event.d * quarter * 0.95, { interrupt: index === 0 });
        noteNode(event)?.classList.add('is-playing');
      }, start));
      timers.push(setTimeout(() => noteNode(event)?.classList.remove('is-playing'), start + event.d * quarter * 1000 - 30));
    });
  }

  /** 两条声部的发音事件（time / d 以四分音符为单位；连线的音合并时值） */
  function counterpointEvents(cantus, bars) {
    const events = [];
    // 谱面中两条声部所在的谱表序号（与 renderStaff 的 staves 顺序一致），用于播放时高亮
    const cantusStaff = state.position === 'above' ? 1 : 0;
    const cpStaff = 1 - cantusStaff;
    cantus.forEach((name, bar) => { const p = parsePitch(name); if (p) events.push({ time: bar * 4, d: 4, midi: p.midi, staff: cantusStaff, bar, index: 0 }); });
    bars.forEach((bar, barIndex) => {
      let onset = 0;
      bar.forEach((n, noteIndex) => {
        const p = n.p && parsePitch(n.p);
        if (p && !n.tieIn) {
          // 连线的音延续前一音的时值
          let d = n.d;
          let k = bar.indexOf(n) + 1;
          let b = barIndex;
          let next = bar[k];
          while (true) {
            if (!next) { b += 1; next = bars[b]?.[0]; k = 0; if (!next) break; }
            if (!next.tieIn) break;
            d += next.d; k += 1; next = bars[b][k];
          }
          events.push({ time: barIndex * 4 + onset, d, midi: p.midi, staff: cpStaff, bar: barIndex, index: noteIndex });
        }
        onset += n.d;
      });
    });
    events.sort((a, b) => a.time - b.time);
    return events;
  }

  // ---------- 练习检查 ----------
  views.check = () => {
    const wrap = el('div', 'mk-section');
    const species = el('select');
    t.speciesNames.forEach((name, i) => species.appendChild(option(String(i + 1), name)));
    species.value = String(state.species);
    const preset = el('select');
    presets.forEach((p) => preset.appendChild(option(p.id, p.label)));
    preset.appendChild(option('custom', t.custom));
    preset.value = state.preset;
    const position = el('select');
    position.append(option('above', t.above), option('below', t.below));
    position.value = state.position;
    const controls = el('div', 'mk-controls');
    controls.append(field(t.species, species), field(t.cantus, preset), field(t.position, position));
    const cantusInput = el('input');
    cantusInput.type = 'text';
    cantusInput.spellcheck = false;
    cantusInput.value = state.customCantus;
    const cantusField = field(t.cantusInput, cantusInput, 'mk-grow');
    const cantusRow = el('div', 'mk-controls');
    cantusRow.appendChild(cantusField);
    const cp = el('textarea', 'mk-code');
    cp.spellcheck = false;
    cp.value = state.text;
    const cpField = field(t.cpInput, cp, 'mk-grow');
    const cpRow = el('div', 'mk-controls');
    cpRow.appendChild(cpField);
    const syntax = el('p', 'mk-hint', t.syntax);
    const actions = el('div', 'mk-actions');
    const result = el('div', 'mk-section');
    const fuxButton = button('btn btn-secondary btn-sm', t.loadFux, () => {
      if (loadFux()) { cp.value = state.text; analyze(); }
    });
    actions.append(
      button('btn btn-primary btn-sm', t.check, () => { state.figure = null; analyze(); }),
      button('btn btn-secondary btn-sm', t.play, () => {
        // 先按当前输入重绘谱面，播放时的高亮才与谱面一致
        analyze();
        try { play(cantusLine(), parseCounterpointText(cp.value, state.species)); } catch { /* 解析错误在检查结果中显示 */ }
      }),
      button('btn btn-ghost btn-sm', t.stop, stop),
      midiExportButton(() => {
        let events;
        try { events = counterpointEvents(cantusLine(), parseCounterpointText(cp.value, state.species)); } catch { return null; }
        const cantusStaff = state.position === 'above' ? 1 : 0;
        return [['Cantus firmus', cantusStaff], ['Counterpoint', 1 - cantusStaff]].map(([name, staff]) => ({
          name, notes: events.filter((e) => e.staff === staff).map((e) => ({ beat: e.time, duration: e.d, midi: e.midi })),
        }));
      }, () => `counterpoint-species-${state.species}`, { bpm: 120, meter: [2, 2] }),
      fuxButton,
    );
    wrap.append(controls, cantusRow, cpRow, syntax, actions, result);

    const syncControls = () => {
      cantusRow.hidden = state.preset !== 'custom';
      const available = Boolean(fuxFor());
      fuxButton.disabled = !available;
      fuxButton.title = available ? '' : t.noFux;
    };

    function analyze() {
      Object.assign(state, { species: Number(species.value), preset: preset.value, position: position.value, customCantus: cantusInput.value, text: cp.value });
      syncControls();
      result.replaceChildren();
      const cantus = cantusLine();
      let analysis;
      let bars;
      try {
        bars = parseCounterpointText(cp.value, state.species);
        analysis = checkCounterpoint({ species: state.species, cantus, bars, position: state.position });
      } catch (error) {
        result.appendChild(el('p', 'mk-callout is-error', `${t.parseError}${error.message}`));
        return;
      }
      const cantusIssues = state.preset === 'custom' ? checkCantus(cantus) : [];
      const marks = new Map(analysis.annotations.map((a) => [`${a.bar}:${a.index}`, a]));
      const errorAt = new Set(analysis.issues.filter((i) => i.severity === 'error').map((i) => `${i.bar}:${i.index}`));
      const cpBars = bars.map((bar, barIndex) => bar.map((n, index) => {
        const a = marks.get(`${barIndex}:${index}`);
        return { ...n, mark: a?.interval, markClass: errorAt.has(`${barIndex}:${index}`) ? 'is-error' : a?.cls === 'dissonant' ? 'is-dissonant' : a?.cls === 'perfect' ? 'is-perfect' : '' };
      }));
      const cfBars = cantus.map((p) => [{ p, d: 4 }]);
      const staves = state.position === 'above'
        ? [{ label: t.staffCp, bars: cpBars }, { label: t.staffCf, bars: cfBars }]
        : [{ label: t.staffCf, bars: cfBars }, { label: t.staffCp, bars: cpBars }];
      const scroll = el('div', 'mk-staff-scroll');
      scroll.appendChild(renderStaff({ staves, beats: 4, meter: [2, 2], ariaLabel: t.title }));
      result.appendChild(scroll);
      if (state.figure === '22') result.appendChild(el('p', 'mk-callout', t.fig22));
      const all = [...cantusIssues.map((i) => ({ ...i, cantus: true })), ...analysis.issues];
      const errors = all.filter((i) => i.severity === 'error').length;
      const warnings = all.length - errors;
      result.appendChild(all.length ? el('p', 'mk-meta', t.errors(errors, warnings)) : el('p', 'mk-ok', t.ok));
      if (all.length) {
        const list = el('ul', 'mk-issues');
        all.forEach((issue) => {
          const item = el('li', `mk-issue is-${issue.severity}`);
          const where = issue.cantus ? `${t.cantusIssues} · ${t.bar(issue.bar + 1)}` : ['repetition', 'range', 'climax'].includes(issue.rule) && issue.bar === 0 ? t.whole : t.bar(issue.bar + 1);
          const text = el('span', '', format(messages[issue.rule] || issue.rule, issue.params || {}));
          text.appendChild(refLink(issue.ref));
          item.append(el('span', 'mk-issue-where', where), text, el('span', 'mk-issue-level', issue.severity === 'error' ? t.error : t.warning));
          list.appendChild(item);
        });
        result.appendChild(list);
      }
    }

    species.addEventListener('change', () => {
      state.species = Number(species.value);
      if (loadFux()) cp.value = state.text;
      analyze();
    });
    preset.addEventListener('change', () => {
      state.preset = preset.value;
      if (state.preset !== 'custom') { if (loadFux()) cp.value = state.text; }
      analyze();
    });
    position.addEventListener('change', () => {
      state.position = position.value;
      if (loadFux()) cp.value = state.text;
      analyze();
    });
    cantusInput.addEventListener('change', analyze);
    cp.addEventListener('keydown', (event) => { if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) analyze(); });
    syncControls();
    analyze();
    return wrap;
  };

  // ---------- Fux 范例 ----------
  views.fux = () => {
    const wrap = el('div', 'mk-section');
    const tableWrap = el('div', 'mk-table-wrap');
    const table = el('table', 'mk-table');
    const headRow = el('tr');
    t.fuxHead.forEach((text) => headRow.appendChild(el('th', '', text)));
    const thead = el('thead');
    thead.appendChild(headRow);
    const tbody = el('tbody');
    FUX_TWO_VOICE.forEach((ex) => {
      const row = el('tr');
      const open = button('btn btn-ghost btn-sm', t.open, () => {
        const line = ex.bars.map((b) => b.cf).join(' ');
        const presetMatch = presets.find((p) => p.line === line);
        Object.assign(state, { species: ex.species, preset: presetMatch ? presetMatch.id : 'custom', customCantus: line, position: ex.cantus === 'lower' ? 'above' : 'below', text: barsToText(ex.bars.map((b) => b.cp), ex.species), figure: ex.figure });
        navigation.select('check');
      });
      const action = el('td');
      action.appendChild(open);
      row.append(
        el('td', 'mk-strong', `Fig. ${ex.figure}`),
        el('td', '', t.speciesNames[ex.species - 1]),
        el('td', '', ex.final),
        el('td', '', `${t.staffCf} ${ex.cantus === 'lower' ? '↓' : '↑'}`),
        action,
      );
      tbody.appendChild(row);
    });
    table.append(thead, tbody);
    tableWrap.appendChild(table);
    const note = el('p', 'mk-hint', `Fux, Gradus ad Parnassum (1725) · Norton/Mann (1965)`);
    note.appendChild(refLink('gotham-species'));
    wrap.append(note, tableWrap);
    return wrap;
  };

  // ---------- 规则表 ----------
  views.rules = () => {
    const wrap = el('div', 'mk-section');
    const tableWrap = el('div', 'mk-table-wrap');
    const table = el('table', 'mk-table');
    const headRow = el('tr');
    t.rulesHead.forEach((text) => headRow.appendChild(el('th', '', text)));
    const thead = el('thead');
    thead.appendChild(headRow);
    const tbody = el('tbody');
    const scope = { 'omt-cantus': t.cantus, 'omt-intervals': '1–5', 'omt-species1': '1', 'omt-species2': '2', 'omt-species3': '3', 'omt-species4': '4', 'omt2e-intro': '1–5', 'omt2e-fifth': '5' };
    Object.entries(RULES).forEach(([code, rule]) => {
      const row = el('tr');
      const source = el('td');
      source.appendChild(refLink(rule.ref));
      row.append(el('td', '', format(messages[code] || code, { interval: '…', count: '…', span: '…', type: '…', value: '…' })), el('td', '', scope[rule.ref] || ''), el('td', '', rule.severity === 'error' ? t.error : t.warning), source);
      tbody.appendChild(row);
    });
    table.append(thead, tbody);
    tableWrap.appendChild(table);
    wrap.appendChild(tableWrap);
    return wrap;
  };

  const navigation = tabs(root, Object.entries(t.tabs).map(([id, label]) => ({ id, label })), (id) => {
    stop();
    body.replaceChildren(views[id]());
  });
  root.append(body, relatedLinks(['nonchord', 'harmonize', 'classical']), sourcesFooter(SOURCES));
  target.appendChild(root);
  navigation.select('check');
}

// 历史律制界面：音分表、五度与狼五度、各调大三度，以及两种律制的对比试听
// 构造依据见 temperaments.js：ref:wiki-pythagorean ref:wiki-meantone ref:wiki-werckmeister ref:wiki-vallotti
import { TEMPERAMENTS, NOTE_NAMES, buildTemperament, majorThirds, frequencyOf, PURE_FIFTH, PURE_MAJOR_THIRD } from './temperaments.js';
import { el, button, option, field, language, sourcesFooter, cite, tabs, relatedLinks } from './module_kit.js';

const SOURCES = ['wiki-pythagorean', 'wiki-meantone', 'wiki-werckmeister', 'wiki-vallotti'];

const TEXT = {
  zh: {
    kicker: '律学', title: '历史律制',
    intro: '毕达哥拉斯律、四分之一音差中庸全音律、Werckmeister III 与 Vallotti 都由"五度链上每个五度的大小"决定。比较各音的音分、狼五度的位置和各调大三度的纯度，并对照平均律试听。',
    tabs: { table: '音分表', compare: '对比试听' },
    names: { equal: '十二平均律', pythagorean: '毕达哥拉斯律', meantone: '四分之一音差中庸全音律', werckmeister3: 'Werckmeister III', vallotti: 'Vallotti（今日通行版本）' },
    rules: {
      equal: '每个五度 700 音分，作为对照。',
      pythagorean: '全部为纯五度（3/2），取 E♭ 至 G# 的 12 个音，余下的一个五度为狼五度。',
      meantone: '每个五度缩窄 1/4 个音差（81/80），四个五度 C–G–D–A–E 得到纯大三度；狼五度在 G#–E♭。',
      werckmeister3: 'C–G、G–D、D–A、B–F# 各缩窄 1/4 毕达哥拉斯音差，其余为纯五度。',
      vallotti: 'F–C、C–G、G–D、D–A、A–E、E–B 各缩窄 1/6 毕达哥拉斯音差，其余六个为纯五度。',
    },
    temperament: '律制', head: ['音', '相对 C（音分）', '与平均律之差'], fifthsHead: ['五度', '大小（音分）', '与纯五度之差'],
    thirdsHead: ['大三度', '大小（音分）', '与纯大三度（5/4）之差'], fifths: '十二个五度', thirds: '各调的大三度', wolf: '狼五度',
    a: '律制 A', b: '律制 B', chord: '和弦', playA: '► A', playB: '► B', alternate: '► 交替', scale: '► 音阶',
    compareHint: '同一个和弦在两种律制中先后奏出（A4 = 440 Hz）。远关系调（如 F#、A♭）在中庸全音律中差异最明显。',
  },
  ja: {
    kicker: '音律', title: '歴史的音律',
    intro: 'ピタゴラス音律、1/4 コンマ・ミーントーン、ヴェルクマイスター III、ヴァロッティは、五度圏上の各五度の大きさで決まります。各音のセント値、ウルフの位置、各調の長三度の純正度を比べ、平均律と聴き比べます。',
    tabs: { table: 'セント表', compare: '聴き比べ' },
    names: { equal: '12 平均律', pythagorean: 'ピタゴラス音律', meantone: '1/4 コンマ・ミーントーン', werckmeister3: 'ヴェルクマイスター III', vallotti: 'ヴァロッティ（現在一般的な版）' },
    rules: {
      equal: '各五度 700 セント（比較用）。',
      pythagorean: 'すべて純正五度（3/2）。E♭ から G# の 12 音を取り、残る一つの五度がウルフ。',
      meantone: '各五度を 1/4 シントニック・コンマ狭め、C–G–D–A–E の四つの五度で純正長三度を得る。ウルフは G#–E♭。',
      werckmeister3: 'C–G、G–D、D–A、B–F# を 1/4 ピタゴラス・コンマずつ狭め、他は純正。',
      vallotti: 'F–C から E–B までの六つの五度を 1/6 ピタゴラス・コンマずつ狭め、残り六つは純正。',
    },
    temperament: '音律', head: ['音', 'C からのセント', '平均律との差'], fifthsHead: ['五度', '大きさ（セント）', '純正五度との差'],
    thirdsHead: ['長三度', '大きさ（セント）', '純正長三度（5/4）との差'], fifths: '12 の五度', thirds: '各調の長三度', wolf: 'ウルフ',
    a: '音律 A', b: '音律 B', chord: '和音', playA: '► A', playB: '► B', alternate: '► 交互', scale: '► 音階',
    compareHint: '同じ和音を二つの音律で続けて鳴らします（A4 = 440 Hz）。遠隔調（F#・A♭ など）でミーントーンの違いが最も目立ちます。',
  },
  en: {
    kicker: 'Tuning', title: 'Historical temperaments',
    intro: 'Pythagorean tuning, quarter-comma meantone, Werckmeister III and Vallotti are each defined by the size of every fifth in the chain. Compare cents, where the wolf falls and how pure each key’s major third is, and listen against equal temperament.',
    tabs: { table: 'Cents', compare: 'Listen' },
    names: { equal: '12-tone equal temperament', pythagorean: 'Pythagorean', meantone: 'Quarter-comma meantone', werckmeister3: 'Werckmeister III', vallotti: 'Vallotti (common modern version)' },
    rules: {
      equal: 'Every fifth is 700 cents (for comparison).',
      pythagorean: 'All fifths pure (3/2); the twelve notes from E♭ to G#, leaving one wolf fifth.',
      meantone: 'Each fifth narrowed by 1/4 syntonic comma, so four fifths C–G–D–A–E give a pure major third; the wolf falls at G#–E♭.',
      werckmeister3: 'C–G, G–D, D–A and B–F# narrowed by 1/4 Pythagorean comma; the rest pure.',
      vallotti: 'F–C, C–G, G–D, D–A, A–E, E–B narrowed by 1/6 Pythagorean comma; the other six pure.',
    },
    temperament: 'Temperament', head: ['Note', 'Cents above C', 'Difference from ET'], fifthsHead: ['Fifth', 'Size (cents)', 'Difference from pure'],
    thirdsHead: ['Major third', 'Size (cents)', 'Difference from pure 5/4'], fifths: 'The twelve fifths', thirds: 'Major third on each note', wolf: 'wolf',
    a: 'Temperament A', b: 'Temperament B', chord: 'Chord', playA: '► A', playB: '► B', alternate: '► Alternate', scale: '► Scale',
    compareHint: 'The same chord sounds in both temperaments (A4 = 440 Hz). Remote keys such as F# or A♭ show the biggest differences in meantone.',
  },
};

const fmt = (n) => (Math.round(n * 100) / 100).toFixed(2);
const signed = (n) => `${n >= 0 ? '+' : '−'}${fmt(Math.abs(n))}`;

export function mountTemperaments(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  target.addEventListener('toolbox-stop', stop);
  const temperamentSelect = (value) => {
    const select = el('select');
    Object.keys(TEMPERAMENTS).forEach((id) => select.appendChild(option(id, t.names[id])));
    select.value = value;
    return select;
  };
  const table = (heads, rows) => {
    const wrap = el('div', 'mk-table-wrap');
    const tbl = el('table', 'mk-table');
    const thead = el('thead');
    const tr = el('tr');
    heads.forEach((h) => tr.appendChild(el('th', '', h)));
    thead.appendChild(tr);
    const tbody = el('tbody');
    rows.forEach((cells) => { const row = el('tr'); cells.forEach((c) => row.appendChild(typeof c === 'string' ? el('td', '', c) : c)); tbody.appendChild(row); });
    tbl.append(thead, tbody);
    wrap.appendChild(tbl);
    return wrap;
  };

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));
  root.appendChild(head);
  const body = el('div', 'mk-section');
  const views = {};

  views.table = () => {
    const wrap = el('div', 'mk-section');
    const select = temperamentSelect('meantone');
    const controls = el('div', 'mk-controls');
    controls.appendChild(field(t.temperament, select));
    const result = el('div', 'mk-section');
    wrap.append(controls, result);
    function paint() {
      result.replaceChildren();
      const id = select.value;
      const built = buildTemperament(id);
      const rule = el('p', 'mk-hint', t.rules[id]);
      if (TEMPERAMENTS[id].ref) rule.appendChild(cite(SOURCES, TEMPERAMENTS[id].ref));
      result.appendChild(rule);
      result.appendChild(table(t.head, NOTE_NAMES.map((name, pc) => [el('td', 'mk-strong', name), fmt(built.cents[pc]), signed(built.cents[pc] - pc * 100)])));
      result.appendChild(el('h4', '', t.fifths));
      result.appendChild(table(t.fifthsHead, built.fifths.map((f) => {
        const wolf = Math.abs(f.size - PURE_FIFTH) > 25;
        return [el('td', 'mk-strong', `${f.from}–${f.to}${wolf ? ` · ${t.wolf}` : ''}`), fmt(f.size), signed(f.size - PURE_FIFTH)];
      })));
      result.appendChild(el('h4', '', t.thirds));
      result.appendChild(table(t.thirdsHead, majorThirds(built.cents).map((m) => {
        const label = el('td', 'mk-strong', `${m.root}–${NOTE_NAMES[(NOTE_NAMES.indexOf(m.root) + 4) % 12]}`);
        return [label, fmt(m.size), signed(m.size - PURE_MAJOR_THIRD)];
      })));
    }
    select.addEventListener('change', paint);
    paint();
    return wrap;
  };

  views.compare = () => {
    const wrap = el('div', 'mk-section');
    const a = temperamentSelect('equal');
    const b = temperamentSelect('meantone');
    const chordRoot = el('select');
    NOTE_NAMES.forEach((n, pc) => chordRoot.appendChild(option(String(pc), `${n}`)));
    const controls = el('div', 'mk-controls');
    controls.append(field(t.a, a), field(t.b, b), field(t.chord, chordRoot));
    const freqs = (id, rootPc) => {
      const cents = buildTemperament(id).cents;
      return [0, 4, 7, 12].map((offset) => {
        const pc = (rootPc + offset) % 12;
        const octave = 4 + Math.floor((rootPc + offset) / 12);
        return frequencyOf(cents, pc, octave);
      });
    };
    const play = (id) => { stop(); playChord(freqs(id, Number(chordRoot.value)), 2.2); };
    const actions = el('div', 'mk-actions');
    actions.append(
      button('btn btn-secondary btn-sm', t.playA, () => play(a.value)),
      button('btn btn-secondary btn-sm', t.playB, () => play(b.value)),
      button('btn btn-primary btn-sm', t.alternate, () => {
        stop();
        [a.value, b.value, a.value, b.value].forEach((id, i) => timers.push(setTimeout(() => playChord(freqs(id, Number(chordRoot.value)), 1.4, { interrupt: true }), i * 1500)));
      }),
      button('btn btn-ghost btn-sm', t.scale, () => {
        stop();
        const cents = buildTemperament(b.value).cents;
        [0, 2, 4, 5, 7, 9, 11, 12].forEach((step, i) => {
          const abs = Number(chordRoot.value) + step;
          timers.push(setTimeout(() => playChord([frequencyOf(cents, abs % 12, 4 + Math.floor(abs / 12))], 0.45, { interrupt: i === 0 }), i * 420));
        });
      }),
    );
    const hint = el('p', 'mk-hint', t.compareHint);
    hint.appendChild(cite(SOURCES, 'wiki-meantone'));
    wrap.append(controls, actions, hint);
    return wrap;
  };

  const navigation = tabs(root, Object.entries(t.tabs).map(([id, label]) => ({ id, label })), (id) => {
    stop();
    body.replaceChildren(views[id]());
  });
  root.append(body, relatedLinks(['micro', 'world', 'circle']), sourcesFooter(SOURCES));
  target.appendChild(root);
  navigation.select('table');
}

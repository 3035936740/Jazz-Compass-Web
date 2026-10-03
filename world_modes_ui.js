// 世界调式体系界面：阿拉伯木卡姆与 jins、印度斯坦 thaat、土耳其 53 koma 体系
// 数据与出处见 world_modes.js：ref:maqamworld-maqam ref:maqamworld-jins ref:wiki-arabic-maqam ref:wiki-thaat ref:wiki-turkish-makam
import {
  AJNAS, MAQAMAT, buildMaqam, maqamSteps, stepLabel, noteLabel, quarterToneFrequency, parseQuarterToneNote,
  SVARAS, THAATS, thaatSemitones, thaatAltered, VARIABLE_POSITIONS, findThaat,
  TURKISH_TONES, TURKISH_INTERVALS, TURKISH_MAKAMS, komaSteps, komaCents, turkishKoma, turkishFrequency,
} from './world_modes.js';
import { el, button, option, field, language, sourcesFooter, cite, tabs, midiToFrequency, relatedLinks } from './module_kit.js';

const SOURCES = ['maqamworld-maqam', 'maqamworld-jins', 'wiki-arabic-maqam', 'wiki-thaat', 'wiki-turkish-makam'];
const MAQAM_NAMES = { rast: 'Rast', bayati: 'Bayati', hijaz: 'Hijaz', saba: 'Saba', sikah: 'Sikah', nahawand: 'Nahawand', ajam: '‘Ajam', kurd: 'Kurd' };
const JINS_NAMES = { ...MAQAM_NAMES, nikriz: 'Nikriz', 'upper-rast': 'Upper Rast', 'upper-ajam': 'Upper ‘Ajam' };
const THAAT_NAMES = { bilaval: 'Bilaval', kalyan: 'Kalyan', khamaj: 'Khamaj', bhairav: 'Bhairav', kafi: 'Kafi', asavari: 'Asavari', bhairavi: 'Bhairavi', poorvi: 'Poorvi', marva: 'Marva', todi: 'Todi' };
const MAKAM_NAMES = { cargah: 'Çârgâh', rast: 'Rast', buselik: 'Bûselik' };
const PITCH_NAMES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];

const TEXT = {
  zh: {
    kicker: '世界音乐', title: '世界调式体系',
    intro: '阿拉伯木卡姆由若干 jins（三至五音的音组）拼接而成；印度斯坦音乐以 Bhatkhande 的十个 thaat 归类拉格；土耳其 makam 理论把八度分为 53 个 koma。这里列出各体系的音阶构造并可试听。',
    tabs: { maqam: '阿拉伯木卡姆', ajnas: 'Jins 音组', thaat: '印度 Thaat', makam: '土耳其 Makam' },
    maqam: '木卡姆', pitch: '音高', pitchSource: 'MaqamWorld 播放器的音高', pitchGrid: '24 平均记谱位置',
    segmentAt: (degree) => `第 ${degree} 级的音组`, family: '所属家族', noFamily: '不属于任何家族',
    ascend: '► 上行', descend: '► 下行', steps: '相邻音程（全音为 1）', cents: '音分',
    caveat: '½♭ 表示半降（降四分之一音）。24 平均的四分之一音只是记谱惯例，实际音高因地区和年代而异；"MaqamWorld 播放器的音高"取自该网站页面所用的频率，可以看到同一记谱音在不同音组中并不相同。',
    jinsHead: ['Jins', '音程（全音为 1）', '音数', 'MaqamWorld 记谱的主音'], ambiguous: '大小不定（主导音在第 3 或第 6 级）', play: '►',
    jinsHint: '同一个 jins 可以移到任何音上；木卡姆的名字通常来自它最下面的 jins。',
    sa: 'Sa（主音）', thaatHead: ['Thaat', '斯瓦拉', '在所选 Sa 上', '同名拉格', '卡纳提克 melakarta', '西方对应', '变化音'],
    thaatRule: 'R、G、D、N 可为本位或 komal（降，小写），M 可为本位或 tivra（升，记作 M\'），S 与 P 不变，因此共有 2⁵ = 32 种组合；Bhatkhande 从中选出十种。thaat 只是归类拉格的框架，没有上下行之分，也不直接演唱。',
    builder: '32 种组合', builderHint: '为五个可变音位各选一种形式：', isThaat: (name) => `= ${name} thaat`, notThaat: '不在 Bhatkhande 选出的十个 thaat 之中',
    toneHead: ['音名', 'koma（中央 C = 0）', '音分', '最近的十二平均音'], intervalHead: ['音程名称', 'koma', '符号'],
    makam: 'Makam', tonic: '主音（durak）', dominant: '属音（güçlü）', komaSteps: '相邻音程（koma）',
    descending: '► 下行形式', variant: '► 第二种形式',
    makamNotes: {
      cargah: '维基百科表中以粗体标出的 Çârgâh 音阶，全音 9 koma、半音 4 koma（bakiye）。',
      rast: 'Rast 五音音列加 Nevâ 上的 Rast 四音音列；下行时 Eviç 降 4 koma 为 Acem，上方换成 Bûselik 四音音列。三度 Segâh 距 Rast 17 koma（约 385 音分），接近纯大三度，而阿拉伯 Rast 的三度是中立三度。',
      buselik: '第一种形式为 Bûselik 五音音列加 Hüseynî 上的 Kürdî 四音音列（相当于 A 小调）；第二种以 Nim Şehnâz（G♯）为导音，加 Hicaz 四音音列（相当于 A 和声小调）。',
    },
    turkishHint: '八度分为 53 个 Holdrian koma，全音为 9 koma，实际只用其中 24 个音。下表为 Rast 至 Gerdâniye 一个八度的音；试听以中央 C（Kaba Çârgâh）= 261.63 Hz 为准。',
    compareRast: '► 对比两种 Rast 的三度', compareHint: '先奏阿拉伯 Rast 的 C–E½♭（24 平均，350 音分），再奏土耳其 Rast 的 Rast–Segâh（17 koma）。',
  },
  ja: {
    kicker: '世界の音楽', title: '世界の旋法体系',
    intro: 'アラブのマカームはいくつかのジンス（3〜5 音の音組）をつないで作られます。ヒンドゥスターニー音楽ではバートカンデーの 10 のタートでラーガを分類し、トルコのマカーム理論ではオクターヴを 53 コンマに分けます。各体系の音階構成を確認し、試聴できます。',
    tabs: { maqam: 'アラブのマカーム', ajnas: 'ジンス', thaat: 'インドのタート', makam: 'トルコのマカーム' },
    maqam: 'マカーム', pitch: '音高', pitchSource: 'MaqamWorld のプレーヤーの音高', pitchGrid: '24 平均律の記譜位置',
    segmentAt: (degree) => `第 ${degree} 音のジンス`, family: 'ファミリー', noFamily: 'どのファミリーにも属さない',
    ascend: '► 上行', descend: '► 下行', steps: '隣接音程（全音 = 1）', cents: 'セント',
    caveat: '½♭ は半フラット（四分音下げ）。24 平均の四分音は記譜上の慣習で、実際の音高は地域や時代で異なります。「MaqamWorld のプレーヤーの音高」は同サイトのページが使う周波数で、同じ記譜音でもジンスによって違うことがわかります。',
    jinsHead: ['ジンス', '音程（全音 = 1）', '音数', 'MaqamWorld の記譜での主音'], ambiguous: '大きさは一定しない（支配音は第 3 または第 6 音）', play: '►',
    jinsHint: 'ジンスはどの音にも移せます。マカームの名前はふつう最下部のジンスから取られます。',
    sa: 'サ（主音）', thaatHead: ['タート', 'スヴァラ', '選んだサの上で', '同名のラーガ', 'カルナータカのメーラカルタ', '西洋の対応', '変化音'],
    thaatRule: 'R・G・D・N は本位かコーマル（低い、小文字）、M は本位かティーヴラ（高い、M\'）、S と P は不変なので、組み合わせは 2⁵ = 32 通り。バートカンデーはそこから 10 を選びました。タートはラーガ分類の枠組みで、上行・下行の区別はなく、それ自体は歌われません。',
    builder: '32 の組み合わせ', builderHint: '五つの可変音それぞれの形を選びます：', isThaat: (name) => `= ${name} タート`, notThaat: 'バートカンデーが選んだ 10 のタートには含まれません',
    toneHead: ['音名', 'コンマ（中央 C = 0）', 'セント', '最も近い 12 平均律の音'], intervalHead: ['音程名', 'コンマ', '記号'],
    makam: 'マカーム', tonic: '主音（ドゥラク）', dominant: '支配音（ギュチリュ）', komaSteps: '隣接音程（コンマ）',
    descending: '► 下行形', variant: '► 第二の形',
    makamNotes: {
      cargah: 'ウィキペディアの表で太字の Çârgâh 音階。全音 9 コンマ、半音 4 コンマ（bakiye）。',
      rast: 'Rast の五音音列と Nevâ 上の Rast 四音音列。下行では Eviç が 4 コンマ下がって Acem となり、上部は Bûselik 四音音列になります。第三音 Segâh は Rast から 17 コンマ（約 385 セント）で純正長三度に近く、アラブの Rast の中立三度とは異なります。',
      buselik: '第一の形は Bûselik 五音音列と Hüseynî 上の Kürdî 四音音列（イ短調に相当）。第二の形は Nim Şehnâz（G♯）を導音とし Hicaz 四音音列を用います（イ和声的短音階に相当）。',
    },
    turkishHint: 'オクターヴを 53 のホルダー・コンマに分け、全音は 9 コンマ。実際に使うのはそのうち 24 音です。下表は Rast から Gerdâniye までの 1 オクターヴ。試聴は中央 C（Kaba Çârgâh）= 261.63 Hz を基準にします。',
    compareRast: '► 二つの Rast の三度を比較', compareHint: 'アラブの Rast の C–E½♭（24 平均で 350 セント）に続けて、トルコの Rast の Rast–Segâh（17 コンマ）を鳴らします。',
  },
  en: {
    kicker: 'World music', title: 'World modal systems',
    intro: 'An Arabic maqam is built by joining ajnas (three- to five-note groups); Hindustani music classifies ragas under Bhatkhande’s ten thaats; Turkish makam theory divides the octave into 53 commas. Explore how each system builds its scales and listen to them.',
    tabs: { maqam: 'Arabic maqam', ajnas: 'Ajnas', thaat: 'Hindustani thaat', makam: 'Turkish makam' },
    maqam: 'Maqam', pitch: 'Pitch', pitchSource: 'MaqamWorld player pitches', pitchGrid: '24-TET notated positions',
    segmentAt: (degree) => `Jins on degree ${degree}`, family: 'Family', noFamily: 'Not part of a family',
    ascend: '► Ascending', descend: '► Descending', steps: 'Steps (whole tone = 1)', cents: 'cents',
    caveat: '½♭ means half-flat (a quarter tone lower). The 24-TET quarter tone is only a notational convention; actual intonation varies by region and period. “MaqamWorld player pitches” are the frequencies its pages use — the same notated note differs between ajnas.',
    jinsHead: ['Jins', 'Steps (whole tone = 1)', 'Notes', 'Tonic as notated by MaqamWorld'], ambiguous: 'Ambiguous size (ghammaz on the 3rd or 6th degree)', play: '►',
    jinsHint: 'Any jins can be transposed to any note; a maqam is usually named after its lowest jins.',
    sa: 'Sa (tonic)', thaatHead: ['Thaat', 'Svaras', 'On the chosen Sa', 'Eponymous raga', 'Carnatic melakarta', 'Western equivalent', 'Altered notes'],
    thaatRule: 'R, G, D and N can be natural or komal (flat, lower case), M natural or tivra (sharp, written M\'), while S and P are fixed — 2⁵ = 32 combinations, of which Bhatkhande highlighted ten. A thaat is a framework for classifying ragas: it has no separate ascent and descent and is not itself sung.',
    builder: 'The 32 combinations', builderHint: 'Choose one form for each of the five variable notes:', isThaat: (name) => `= ${name} thaat`, notThaat: 'Not one of the ten thaats Bhatkhande chose',
    toneHead: ['Tone', 'Commas (middle C = 0)', 'Cents', 'Nearest 12-TET note'], intervalHead: ['Interval', 'Commas', 'Symbol'],
    makam: 'Makam', tonic: 'Tonic (durak)', dominant: 'Dominant (güçlü)', komaSteps: 'Steps (commas)',
    descending: '► Descending form', variant: '► Second form',
    makamNotes: {
      cargah: 'The Çârgâh scale shown in bold in Wikipedia’s table: whole tones of 9 commas, semitones of 4 (bakiye).',
      rast: 'A Rast pentachord plus a Rast tetrachord on Nevâ. Descending, Eviç is lowered 4 commas to Acem and a Bûselik tetrachord replaces the upper Rast tetrachord. The third, Segâh, lies 17 commas (≈385 cents) above Rast — close to a just major third, unlike the neutral third of Arabic Rast.',
      buselik: 'Form 1: a Bûselik pentachord plus a Kürdî tetrachord on Hüseynî (like A minor). Form 2 uses Nim Şehnâz (G♯) as leading tone with a Hicaz tetrachord (like A harmonic minor).',
    },
    turkishHint: 'The octave holds 53 Holdrian commas, a whole tone is 9, and only 24 of the 53 are used. The table lists one octave from Rast to Gerdâniye; playback takes middle C (Kaba Çârgâh) as 261.63 Hz.',
    compareRast: '► Compare the thirds of the two Rasts', compareHint: 'Plays the Arabic Rast C–E½♭ (24-TET, 350 cents), then the Turkish Rast–Segâh (17 commas).',
  },
};

const fmt = (n, digits = 0) => (Math.round(n * 10 ** digits) / 10 ** digits).toFixed(digits);

export function mountWorldModes(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  target.addEventListener('toolbox-stop', stop);

  /** 依次播放频率；chips 为可选的音符元素，用来高亮正在发声的音 */
  const playSequence = (frequencies, chips = [], gap = 420) => {
    stop();
    frequencies.forEach((hz, index) => timers.push(setTimeout(() => {
      playChord([hz], 0.5, { interrupt: index === 0 });
      chips.forEach((chip, i) => chip.classList.toggle('is-playing', i === index));
    }, index * gap)));
    timers.push(setTimeout(() => chips.forEach((chip) => chip.classList.remove('is-playing')), frequencies.length * gap + 200));
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
  const noteChip = (top, main, sub, className = '') => {
    const chip = el('div', `mk-note ${className}`.trim());
    chip.append(el('span', 'mk-note-top', top), el('strong', '', main), el('small', '', sub));
    return chip;
  };

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));
  root.appendChild(head);
  const body = el('div', 'mk-section');
  const views = {};

  views.maqam = () => {
    const wrap = el('div', 'mk-section');
    const maqamSelect = el('select');
    Object.keys(MAQAMAT).forEach((id) => maqamSelect.appendChild(option(id, MAQAM_NAMES[id])));
    const pitchSelect = el('select');
    pitchSelect.append(option('source', t.pitchSource), option('grid', t.pitchGrid));
    const controls = el('div', 'mk-controls');
    controls.append(field(t.maqam, maqamSelect), field(t.pitch, pitchSelect));
    const segmentControls = el('div', 'mk-controls');
    const result = el('div', 'mk-section');
    const caveat = el('p', 'mk-callout', t.caveat);
    caveat.append(cite(SOURCES, 'wiki-arabic-maqam'), cite(SOURCES, 'maqamworld-maqam'));
    wrap.append(controls, segmentControls, result, caveat);
    let segmentSelects = [];

    function buildSegmentControls() {
      segmentControls.replaceChildren();
      segmentSelects = MAQAMAT[maqamSelect.value].segments.map((segment) => {
        const select = el('select');
        segment.options.forEach((item, index) => select.appendChild(option(String(index), JINS_NAMES[item.jins])));
        select.disabled = segment.options.length === 1;
        select.addEventListener('change', paint);
        segmentControls.appendChild(field(t.segmentAt(segment.degree), select));
        return select;
      });
    }
    function paint() {
      stop();
      result.replaceChildren();
      const id = maqamSelect.value;
      const notes = buildMaqam(id, segmentSelects.map((select) => Number(select.value)));
      const useGrid = pitchSelect.value === 'grid';
      const hzOf = (note) => (useGrid ? quarterToneFrequency(note.token) : note.hz);
      const tonicHz = hzOf(notes[0]);
      const familyLine = el('p', 'mk-hint', `${t.family}: ${MAQAMAT[id].family ? MAQAM_NAMES[MAQAMAT[id].family] : t.noFamily}`);
      familyLine.appendChild(cite(SOURCES, 'maqamworld-maqam'));
      const row = el('div', 'mk-notes');
      const chips = notes.map((note, index) => {
        const chip = noteChip(String(note.degree), noteLabel(note.token), `${fmt(1200 * Math.log2(hzOf(note) / tonicHz))}¢ · ${fmt(hzOf(note), 1)} Hz`, index === 0 ? 'is-tonic' : '');
        chip.title = JINS_NAMES[note.jins];
        chip.tabIndex = 0;
        chip.addEventListener('click', () => playChord([hzOf(note)], 0.9));
        row.appendChild(chip);
        return chip;
      });
      const steps = maqamSteps(notes.map((note) => ({ ...note, hz: hzOf(note) })));
      const stepLine = el('p', 'mk-hint', `${t.steps}: ${steps.map((step) => `${stepLabel(step.quarterTones)} (${fmt(step.cents)}¢)`).join(' · ')}`);
      stepLine.appendChild(cite(SOURCES, 'maqamworld-jins'));
      const segmentsLine = el('div', 'mk-actions');
      MAQAMAT[id].segments.forEach((segment, index) => {
        const chosen = segment.options[Number(segmentSelects[index].value)];
        segmentsLine.appendChild(el('span', 'mk-badge is-accent', `${segment.degree}: ${JINS_NAMES[chosen.jins]} · ${chosen.notes.map(noteLabel).join(' ')}`));
      });
      const actions = el('div', 'mk-actions');
      const frequencies = notes.map(hzOf);
      actions.append(
        button('btn btn-primary btn-sm', t.ascend, () => playSequence(frequencies, chips)),
        button('btn btn-secondary btn-sm', t.descend, () => playSequence([...frequencies].reverse(), [...chips].reverse())),
      );
      result.append(familyLine, segmentsLine, row, stepLine, actions);
    }
    maqamSelect.addEventListener('change', () => { buildSegmentControls(); paint(); });
    pitchSelect.addEventListener('change', paint);
    buildSegmentControls();
    paint();
    return wrap;
  };

  views.ajnas = () => {
    const wrap = el('div', 'mk-section');
    const hint = el('p', 'mk-hint', t.jinsHint);
    hint.appendChild(cite(SOURCES, 'maqamworld-jins'));
    const rows = Object.entries(AJNAS).map(([id, jins]) => {
      const start = parseQuarterToneNote(jins.tonic).qt;
      const positions = [0];
      jins.steps.forEach((step) => positions.push(positions[positions.length - 1] + step));
      const play = el('td');
      play.appendChild(button('btn btn-ghost btn-sm', `${t.play} ${JINS_NAMES[id]}`, () => playSequence(positions.map((qt) => 440 * 2 ** ((start + qt - parseQuarterToneNote('A4').qt) / 24)))));
      const name = el('td', 'mk-strong', JINS_NAMES[id]);
      return [name, jins.steps.map(stepLabel).join(' · ') + (jins.ambiguous ? ` — ${t.ambiguous}` : ''), String(jins.steps.length + 1), noteLabel(jins.tonic), play];
    });
    wrap.append(hint, table([...t.jinsHead, ''], rows));
    return wrap;
  };

  views.thaat = () => {
    const wrap = el('div', 'mk-section');
    const saSelect = el('select');
    PITCH_NAMES.forEach((name, pc) => saSelect.appendChild(option(String(pc), name)));
    const controls = el('div', 'mk-controls');
    controls.appendChild(field(t.sa, saSelect));
    const rule = el('p', 'mk-hint', t.thaatRule);
    rule.appendChild(cite(SOURCES, 'wiki-thaat'));
    const result = el('div', 'mk-section');
    const builder = el('div', 'mk-card');
    wrap.append(controls, rule, result, builder);

    const playThaat = (id) => {
      const sa = 60 + Number(saSelect.value);
      playSequence([...thaatSemitones(id), 12].map((s) => midiToFrequency(sa + s)));
    };
    function paint() {
      stop();
      result.replaceChildren();
      const sa = Number(saSelect.value);
      const rows = Object.keys(THAATS).map((id) => {
        const thaat = THAATS[id];
        const name = el('td', 'mk-strong');
        name.appendChild(button('btn btn-ghost btn-sm', `► ${THAAT_NAMES[id]}`, () => playThaat(id)));
        return [
          name, thaat.svaras.join(' '), thaatSemitones(id).map((s) => PITCH_NAMES[(sa + s) % 12]).join(' '),
          thaat.raga, `${thaat.mela[0]} · ${thaat.mela[1]}`, thaat.western, thaatAltered(id).join(' ') || '—',
        ];
      });
      result.appendChild(table(t.thaatHead, rows));
    }
    builder.appendChild(el('div', 'mk-card-head')).appendChild(el('strong', '', t.builder));
    builder.appendChild(el('p', '', t.builderHint));
    const builderControls = el('div', 'mk-controls');
    const output = el('p', 'mk-hint');
    const selects = VARIABLE_POSITIONS.map((pair) => {
      const select = el('select');
      pair.forEach((svara) => select.appendChild(option(svara, svara)));
      select.value = pair[1] === "M'" ? 'M' : pair[1];
      select.addEventListener('change', update);
      builderControls.appendChild(select);
      return select;
    });
    function update() {
      const choices = selects.map((select) => select.value);
      const found = findThaat(choices);
      const sa = Number(saSelect.value);
      const svaras = ['S', choices[0], choices[1], choices[2], 'P', choices[3], choices[4]];
      output.textContent = `S ${choices.slice(0, 3).join(' ')} P ${choices.slice(3).join(' ')} → ${svaras.map((s) => PITCH_NAMES[(sa + SVARAS[s]) % 12]).join(' ')}  ${found ? t.isThaat(THAAT_NAMES[found]) : t.notThaat}`;
      output.classList.toggle('mk-ok', Boolean(found));
    }
    const builderActions = el('div', 'mk-actions');
    builderActions.appendChild(button('btn btn-secondary btn-sm', '►', () => {
      const choices = selects.map((select) => select.value);
      const sa = 60 + Number(saSelect.value);
      playSequence(['S', choices[0], choices[1], choices[2], 'P', choices[3], choices[4]].map((s) => midiToFrequency(sa + SVARAS[s])).concat(midiToFrequency(sa + 12)));
    }));
    builder.append(builderControls, output, builderActions);
    saSelect.addEventListener('change', () => { paint(); update(); });
    paint();
    update();
    return wrap;
  };

  views.makam = () => {
    const wrap = el('div', 'mk-section');
    const hint = el('p', 'mk-hint', t.turkishHint);
    hint.appendChild(cite(SOURCES, 'wiki-turkish-makam'));
    const makamSelect = el('select');
    Object.keys(TURKISH_MAKAMS).forEach((id) => makamSelect.appendChild(option(id, MAKAM_NAMES[id])));
    const controls = el('div', 'mk-controls');
    controls.appendChild(field(t.makam, makamSelect));
    const result = el('div', 'mk-section');

    function paint() {
      stop();
      result.replaceChildren();
      const id = makamSelect.value;
      const makam = TURKISH_MAKAMS[id];
      const base = turkishKoma(makam.tones[0]);
      const row = el('div', 'mk-notes');
      const chips = makam.tones.map((name) => {
        const marks = [name === makam.tonic ? t.tonic : '', name === makam.dominant ? t.dominant : ''].filter(Boolean).join(' · ');
        const chip = noteChip(marks || ' ', name, `${turkishKoma(name) - base} koma · ${fmt(komaCents(turkishKoma(name) - base))}¢`, name === (makam.tonic ?? makam.tones[0]) ? 'is-tonic' : '');
        chip.tabIndex = 0;
        chip.addEventListener('click', () => playChord([turkishFrequency(name)], 0.9));
        row.appendChild(chip);
        return chip;
      });
      const note = el('p', 'mk-hint', `${t.komaSteps}: ${komaSteps(makam.tones).join(' · ')}. ${t.makamNotes[id]}`);
      note.appendChild(cite(SOURCES, 'wiki-turkish-makam'));
      const actions = el('div', 'mk-actions');
      actions.appendChild(button('btn btn-primary btn-sm', t.ascend, () => playSequence(makam.tones.map((name) => turkishFrequency(name)), chips)));
      if (makam.descending) actions.appendChild(button('btn btn-secondary btn-sm', t.descending, () => playSequence(makam.descending.map((name) => turkishFrequency(name)))));
      if (makam.variant) actions.appendChild(button('btn btn-secondary btn-sm', t.variant, () => playSequence(makam.variant.map((name) => turkishFrequency(name)))));
      result.append(row, note, actions);
    }
    makamSelect.addEventListener('change', paint);

    const compare = el('div', 'mk-actions');
    compare.appendChild(button('btn btn-ghost btn-sm', t.compareRast, () => {
      stop();
      const arabic = [quarterToneFrequency('C4'), quarterToneFrequency('Ehb4')];
      // 把土耳其 Rast–Segâh 移到同一个 C4 上比较
      const third = komaCents(turkishKoma('Segâh') - turkishKoma('Rast'));
      const turkish = [arabic[0], arabic[0] * 2 ** (third / 1200)];
      timers.push(setTimeout(() => playChord(arabic, 1.6, { interrupt: true }), 0));
      timers.push(setTimeout(() => playChord(turkish, 1.6, { interrupt: true }), 1900));
    }));
    const compareHint = el('p', 'mk-hint', t.compareHint);

    const toneRows = TURKISH_TONES.map(([name, koma]) => {
      const cents = komaCents(koma);
      const cell = el('td', 'mk-strong');
      cell.appendChild(button('btn btn-ghost btn-sm', name, () => playChord([turkishFrequency(name)], 0.9)));
      return [cell, String(koma), fmt(cents), PITCH_NAMES[Math.round(cents / 100) % 12]];
    });
    const intervalRows = TURKISH_INTERVALS.map(([name, komas, symbol]) => [el('td', 'mk-strong', name), String(komas), symbol]);
    wrap.append(hint, controls, result, compare, compareHint, table(t.toneHead, toneRows), table(t.intervalHead, intervalRows));
    paint();
    return wrap;
  };

  const navigation = tabs(root, Object.entries(t.tabs).map(([id, label]) => ({ id, label })), (id) => {
    stop();
    body.replaceChildren(views[id]());
  });
  root.append(body, relatedLinks(['chinese', 'micro', 'temperaments']), sourcesFooter(SOURCES));
  target.appendChild(root);
  navigation.select('maqam');
}

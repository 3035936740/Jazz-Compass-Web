// 数字低音界面
// 数字规则：ref:omt2e-figured-bass；罗马数字：ref:omt2e-roman-numerals；四部写作：ref:sposobin（classical_voicing.js）
import { realizeFiguredBassLine, figuredVoicingEntries, spellFiguredVoice, FIGURED_PRESETS, FIGURED_KEYS, transposeFiguredLine, bassLeapProblems } from './figured_bass.js?v=20261002-fb2';
import { solveVoicings } from './classical_voicing.js?v=20261004-w7';
import { parseNote, intervalBetween } from './pitch_spelling.js';
import { renderStaff } from './staff_svg.js?v=20261002-fix';
import { el, button, option, field, language, midiToFrequency, sourcesFooter, cite, tabs, relatedLinks, midiExportButton } from './module_kit.js';

const SOURCES = ['omt2e-figured-bass', 'omt2e-roman-numerals', 'sposobin'];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const FIGURE_LABEL = { '53': '', '63': '6', '64': '6/4', '753': '7', '653': '6/5', '643': '4/3', '642': '4/2' };

const TEXT = {
  zh: {
    kicker: '和声写作', title: '数字低音',
    intro: '数字表示低音之上的音程。输入带数字的低音线，查看每个和弦的组成与罗马数字，再写成四部和声。',
    tabs: { realize: '写作', table: '数字速查' },
    key: '调', mode: '调式', major: '大调', minor: '小调', line: '低音与数字（音带八度，冒号后写数字：C3 D3:6 G3:7 E2:#）',
    realize: '写成四部', play: '► 试听', preset: '载入示例',
    head: ['低音', '数字', '和弦音', '根音', '罗马数字'], voices: ['女高音', '女低音', '男高音', '男低音'],
    fail: '四部写作失败：', leap: (n, from, to, interval, dir) => `第 ${n} 个低音：${from} → ${to} 是${dir}${interval}跳进，四部写作中低音不宜作七度、超过八度或上行三全音的跳进。可把其中一个音移一个八度。`, up: '上行', down: '下行', rule: '本工具的约定：数字以外的音按调号；♯ ♭ 在调号音的基础上升降半音，♮ 取消调号。',
    tableHead: ['位置', '完整数字', '简写'], positions: ['原位三和弦', '第一转位三和弦', '第二转位三和弦', '原位七和弦', '第一转位七和弦', '第二转位七和弦', '第三转位七和弦'],
    accidentals: '变音记号写在被改变的数字前；数字上的斜线或数字前的加号表示升高半音；单独的变音记号作用于低音上方三度。',
  },
  ja: {
    kicker: '和声の実施', title: '数字付き低音',
    intro: '数字は低音から上の音程を表します。数字付きの低音を入力し、各和音の構成音とローマ数字を確認して四声体にします。',
    tabs: { realize: '実施', table: '数字一覧' },
    key: '調', mode: '旋法', major: '長調', minor: '短調', line: '低音と数字（オクターブ付き、コロンの後に数字：C3 D3:6 G3:7 E2:#）',
    realize: '四声体にする', play: '► 試聴', preset: '例を読み込む',
    head: ['低音', '数字', '構成音', '根音', 'ローマ数字'], voices: ['ソプラノ', 'アルト', 'テノール', 'バス'],
    fail: '四声体の配置に失敗：', leap: (n, from, to, interval, dir) => `${n} 番目の低音：${from} → ${to} は${dir}${interval}の跳躍です。四声体ではバスの 7 度・オクターヴを超える跳躍・上行三全音は避けます。どちらかの音をオクターヴ移してください。`, up: '上行', down: '下行', rule: '本ツールの約束：数字以外の音は調号どおり。♯ ♭ は調号の音から半音上下、♮ は調号を取り消します。',
    tableHead: ['位置', '完全な数字', '省略形'], positions: ['基本形の三和音', '第一転回形の三和音', '第二転回形の三和音', '基本形の七の和音', '第一転回形の七の和音', '第二転回形の七の和音', '第三転回形の七の和音'],
    accidentals: '変化記号は変える数字の前に書きます。数字の斜線や前の + は半音上げを示し、単独の変化記号は低音から三度上の音に作用します。',
  },
  en: {
    kicker: 'Part writing', title: 'Figured bass',
    intro: 'Figures show intervals above the bass. Enter a figured bass line to see each chord’s notes and Roman numeral, then realise it in four parts.',
    tabs: { realize: 'Realise', table: 'Figures' },
    key: 'Key', mode: 'Mode', major: 'Major', minor: 'Minor', line: 'Bass and figures (pitches with octaves, figures after a colon: C3 D3:6 G3:7 E2:#)',
    realize: 'Realise in four parts', play: '► Play', preset: 'Load example',
    head: ['Bass', 'Figure', 'Chord tones', 'Root', 'Roman numeral'], voices: ['Soprano', 'Alto', 'Tenor', 'Bass'],
    fail: 'Four-part realisation failed: ', leap: (n, from, to, interval, dir) => `Bass note ${n}: ${from} → ${to} is a ${dir} ${interval} leap; in four-part writing the bass avoids sevenths, leaps beyond an octave and ascending tritones. Move one of the notes by an octave.`, up: 'ascending', down: 'descending', rule: 'Convention in this tool: notes without a figure follow the key signature; ♯ and ♭ raise or lower that note a half step, ♮ cancels the key signature.',
    tableHead: ['Position', 'Full figures', 'Abbreviation'], positions: ['Root-position triad', 'First-inversion triad', 'Second-inversion triad', 'Root-position seventh', 'First-inversion seventh', 'Second-inversion seventh', 'Third-inversion seventh'],
    accidentals: 'Accidentals go before the figure they alter; a slash through a figure or a plus before it raises it a half step; a lone accidental applies to the third above the bass.',
  },
};

/** 由根音与和弦音得出罗马数字（大写为大三，小写为小三，° 减，+ 增，ø 半减七） */
export function romanNumeral(chord, key) {
  const tonic = parseNote(key);
  const root = parseNote(chord.root);
  const degree = ((root.step - tonic.step) % 7 + 7) % 7;
  const pcs = chord.notes.map((n) => (parseNote(n).pc - root.pc + 12) % 12);
  const has = (s) => pcs.includes(s);
  let numeral = ROMAN[degree];
  let suffix = '';
  if (has(3) && has(6)) { numeral = numeral.toLowerCase(); suffix = chord.seventh && has(10) ? 'ø' : '°'; }
  else if (has(4) && has(8)) suffix = '+';
  else if (has(3)) numeral = numeral.toLowerCase();
  return `${numeral}${suffix}${FIGURE_LABEL[chord.shape] ?? ''}`;
}

export function mountFiguredBass(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  target.addEventListener('toolbox-stop', stop);

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  const intro = el('p', '', t.intro);
  intro.appendChild(cite(SOURCES, 'omt2e-figured-bass'));
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), intro);
  root.appendChild(head);
  const body = el('div', 'mk-section');
  const views = {};

  views.realize = () => {
    const wrap = el('div', 'mk-section');
    const mode = el('select');
    mode.append(option('major', t.major), option('minor', t.minor));
    const key = el('select');
    const fillKeys = () => {
      key.replaceChildren();
      FIGURED_KEYS[mode.value].forEach((k) => key.appendChild(option(k)));
    };
    fillKeys();
    const line = el('input');
    line.type = 'text';
    line.spellcheck = false;
    line.value = FIGURED_PRESETS.major.line;
    // 示例未被改动时，换调会把示例一起移到新调
    let presetLine = line.value;
    const loadPreset = (targetKey) => {
      const preset = FIGURED_PRESETS[mode.value];
      key.value = targetKey ?? preset.key;
      line.value = transposeFiguredLine(preset.line, preset.key, key.value, mode.value);
      presetLine = line.value;
    };
    const controls = el('div', 'mk-controls');
    controls.append(field(t.mode, mode), field(t.key, key), field(t.line, line, 'mk-grow'));
    const actions = el('div', 'mk-actions');
    const result = el('div', 'mk-section');
    let solvedVoices = null;
    actions.append(
      button('btn btn-primary btn-sm', t.realize, render),
      button('btn btn-secondary btn-sm', t.play, () => {
        if (!solvedVoices) return;
        stop();
        solvedVoices.forEach((chord, i) => timers.push(setTimeout(() => playChord(chord.map(midiToFrequency), 0.9, { interrupt: i === 0 }), i * 950)));
      }),
      midiExportButton(() => (solvedVoices ? ['Bass', 'Tenor', 'Alto', 'Soprano'].map((name, voice) => ({
        name, notes: solvedVoices.map((chord, i) => ({ beat: i * 2, duration: 2, midi: chord[voice] })),
      })) : null), () => `figured-bass-${key.value}-${mode.value}`, { bpm: 72 }),
      button('btn btn-ghost btn-sm', t.preset, () => {
        loadPreset(key.value);
        render();
      }),
    );
    const rule = el('p', 'mk-hint', t.rule);
    wrap.append(controls, actions, rule, result);

    function render() {
      result.replaceChildren();
      solvedVoices = null;
      let chords;
      try {
        chords = realizeFiguredBassLine(line.value, key.value, mode.value);
      } catch (error) {
        result.appendChild(el('p', 'mk-callout is-error', error.message));
        return;
      }
      const tableWrap = el('div', 'mk-table-wrap');
      const table = el('table', 'mk-table');
      const headRow = el('tr');
      t.head.forEach((text) => headRow.appendChild(el('th', '', text)));
      const thead = el('thead');
      thead.appendChild(headRow);
      const tbody = el('tbody');
      const numerals = chords.map((chord) => romanNumeral(chord, key.value));
      chords.forEach((chord, i) => {
        const row = el('tr');
        row.append(el('td', 'mk-strong', chord.bass), el('td', '', chord.figure || '—'), el('td', '', chord.notes.join(' ')), el('td', '', chord.root), el('td', 'mk-strong', numerals[i]));
        tbody.appendChild(row);
      });
      table.append(thead, tbody);
      tableWrap.appendChild(table);
      const solved = solveVoicings(figuredVoicingEntries(chords, key.value, mode.value));
      if (!solved.ok) {
        const bassOnly = el('div', 'mk-staff-scroll');
        bassOnly.appendChild(renderStaff({ staves: [{ clef: 'bass', bars: chords.map((c) => [{ p: c.bass, d: 4, mark: c.figure || '' }]) }], beats: 4 }));
        const leaps = bassLeapProblems(chords).map((p) => {
          const interval = intervalBetween(p.from, p.to);
          const quality = { zh: { P: '纯', M: '大', m: '小', A: '增', d: '减' }, ja: { P: '完全', M: '長', m: '短', A: '増', d: '減' }, en: { P: 'perfect', M: 'major', m: 'minor', A: 'augmented', d: 'diminished' } }[lang][interval.quality[0]] ?? interval.quality;
          const name = lang === 'en' ? `${quality} ${interval.generic}${[, 'st', 'nd', 'rd'][interval.generic % 10] && ![11, 12, 13].includes(interval.generic) ? [, 'st', 'nd', 'rd'][interval.generic % 10] : 'th'}` : `${quality} ${interval.generic} 度`;
          const message = el('p', 'mk-callout is-error', t.leap(p.index + 1, p.from, p.to, name, p.semitones > 0 ? t.up : t.down));
          message.appendChild(cite(SOURCES, 'sposobin'));
          return message;
        });
        result.append(bassOnly, tableWrap, ...(leaps.length ? leaps : [el('p', 'mk-callout is-error', `${t.fail}${solved.reason}`)]));
        return;
      }
      solvedVoices = solved.voices;
      const staves = [3, 2, 1, 0].map((voice, i) => ({
        label: t.voices[i],
        clef: voice >= 2 ? 'treble' : 'bass',
        bars: solved.voices.map((v, bar) => [{ p: spellFiguredVoice(chords[bar], v[voice]), d: 4, mark: voice === 0 ? (chords[bar].figure || '') : undefined }]),
      }));
      const scroll = el('div', 'mk-staff-scroll');
      scroll.appendChild(renderStaff({ staves, beats: 4, labels: numerals.map((text, bar) => ({ bar, beat: 0, text })) }));
      result.append(scroll, tableWrap);
    }
    mode.addEventListener('change', () => {
      fillKeys();
      loadPreset();
      render();
    });
    key.addEventListener('change', () => {
      if (line.value.trim() === presetLine) loadPreset(key.value);
      render();
    });
    line.addEventListener('keydown', (event) => { if (event.key === 'Enter') render(); });
    render();
    return wrap;
  };

  views.table = () => {
    const wrap = el('div', 'mk-section');
    const rows = [['5/3', '—'], ['6/3', '6'], ['6/4', '6/4'], ['7/5/3', '7'], ['6/5/3', '6/5'], ['6/4/3', '4/3'], ['6/4/2', '4/2']];
    const tableWrap = el('div', 'mk-table-wrap');
    const table = el('table', 'mk-table');
    const headRow = el('tr');
    t.tableHead.forEach((text) => headRow.appendChild(el('th', '', text)));
    const thead = el('thead');
    thead.appendChild(headRow);
    const tbody = el('tbody');
    rows.forEach(([full, short], i) => {
      const row = el('tr');
      row.append(el('td', '', t.positions[i]), el('td', 'mk-strong', full), el('td', 'mk-strong', short));
      tbody.appendChild(row);
    });
    table.append(thead, tbody);
    tableWrap.appendChild(table);
    const note = el('p', 'mk-hint', t.accidentals);
    note.appendChild(cite(SOURCES, 'omt2e-figured-bass'));
    wrap.append(tableWrap, note);
    return wrap;
  };

  const navigation = tabs(root, Object.entries(t.tabs).map(([id, label]) => ({ id, label })), (id) => {
    stop();
    body.replaceChildren(views[id]());
  });
  root.append(body, relatedLinks(['classical', 'harmonize']), sourcesFooter(SOURCES));
  target.appendChild(root);
  navigation.select('realize');
}

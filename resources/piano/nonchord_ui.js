// 和弦外音界面
// 定义：ref:omt2e-embellishing ref:omt-embellishing；中文译名：ref:zhwiki-nct；日文译名：ref:jawiki-nct
import { analyzeEmbellishingTones, findPedalPoints, EXAMPLES } from './nonchord.js';
import { parseNote, parsePitch } from './pitch_spelling.js';
import { renderStaff } from './staff_svg.js?v=20261002-fix';
import { el, button, field, language, midiToFrequency, sourcesFooter, cite, tabs, relatedLinks } from './module_kit.js';

const SOURCES = ['omt2e-embellishing', 'omt-embellishing', 'zhwiki-nct', 'jawiki-nct'];

const NAMES = {
  zh: { CT: '和弦音', PT: '经过音', NT: '辅助音（邻音）', DN: '环音（双辅助音）', APP: '倚音', INT: '够音（后部倚音）', ET: '逃音', SUS: '延留音', RET: '上行延留音', ANT: '先现音', PED: '持续音', unclassified: '未归类' },
  ja: { CT: '和音構成音', PT: '経過音', NT: '刺繍音', DN: '二重刺繍音', APP: '倚音', INT: '後部倚音', ET: '逸音', SUS: '掛留音', RET: 'リターデイション', ANT: '先取音', PED: '保続音', unclassified: '分類なし' },
  en: { CT: 'Chord tone', PT: 'Passing tone', NT: 'Neighbour tone', DN: 'Double neighbour', APP: 'Appoggiatura', INT: 'Incomplete neighbour', ET: 'Escape tone', SUS: 'Suspension', RET: 'Retardation', ANT: 'Anticipation', PED: 'Pedal tone', unclassified: 'Unclassified' },
};

const DEFINITIONS = {
  zh: {
    PT: ['级进进入，同方向级进离开。', 'omt2e-embellishing'], NT: ['级进进入，反方向级进离开；回到同一个音时为完全辅助音。', 'omt2e-embellishing'],
    DN: ['以同一稳定音开始和结束，中间依次是它上方与下方的级进音。', 'omt-embellishing'], APP: ['跳进进入，反方向级进离开，多在较强拍。', 'omt2e-embellishing'],
    INT: ['非重音，跳进进入，并级进到重音上的稳定音。', 'omt-embellishing'], ET: ['级进进入，反方向跳进离开，多在较弱拍。', 'omt2e-embellishing'],
    SUS: ['由前一和弦的同一音（静止音）进入，在较强拍上成为外音，再级进下行解决。', 'omt2e-embellishing'], RET: ['与延留音相同，但级进上行解决。', 'omt2e-embellishing'],
    ANT: ['后一和弦的和弦音提前出现，在前一和弦中成为外音。', 'omt2e-embellishing'], PED: ['低音保持同一个音，而上方和弦变化。', 'omt2e-embellishing'],
  },
  ja: {
    PT: ['順次進行で入り、同じ方向へ順次進行で離れる。', 'omt2e-embellishing'], NT: ['順次進行で入り、反対方向へ順次進行で離れる。同じ音に戻るものが完全な刺繍音。', 'omt2e-embellishing'],
    DN: ['同じ安定音で始まり終わり、その間に上と下の隣接音が入る。', 'omt-embellishing'], APP: ['跳躍で入り、反対方向へ順次進行で離れる。強い拍に多い。', 'omt2e-embellishing'],
    INT: ['弱拍で跳躍して入り、強拍の安定音へ順次進行する。', 'omt-embellishing'], ET: ['順次進行で入り、反対方向へ跳躍して離れる。弱い拍に多い。', 'omt2e-embellishing'],
    SUS: ['前の和音の同じ音を保ったまま強い拍で非和声音となり、順次下行して解決する。', 'omt2e-embellishing'], RET: ['掛留と同じだが順次上行して解決する。', 'omt2e-embellishing'],
    ANT: ['次の和音の構成音が先に現れ、前の和音では非和声音となる。', 'omt2e-embellishing'], PED: ['低音が同じ音を保ち、上の和音が変化する。', 'omt2e-embellishing'],
  },
  en: {
    PT: ['Approached by step and left by step in the same direction.', 'omt2e-embellishing'], NT: ['Approached by step and left by step in the opposite direction; complete when it returns to the same note.', 'omt2e-embellishing'],
    DN: ['Begins and ends on the same stable tone, with a step above and a step below in between.', 'omt-embellishing'], APP: ['Approached by leap and left by step in the opposite direction, usually on a stronger beat.', 'omt2e-embellishing'],
    INT: ['Unaccented, approached by leap, and moving by step to an accented stable tone.', 'omt-embellishing'], ET: ['Approached by step and left by leap in the opposite direction, usually on a weaker beat.', 'omt2e-embellishing'],
    SUS: ['Held over from the previous chord, dissonant on a stronger beat, then resolved down by step.', 'omt2e-embellishing'], RET: ['Like a suspension, but resolving up by step.', 'omt2e-embellishing'],
    ANT: ['A chord tone of the next chord heard early, as a non-chord tone of the current one.', 'omt2e-embellishing'], PED: ['A static bass note held under changing chords.', 'omt2e-embellishing'],
  },
};

const TEXT = {
  zh: {
    kicker: '旋律与和声', title: '和弦外音',
    intro: '输入和弦进行与旋律，按每个音如何进入、如何离开以及所在拍位，判断它是和弦音还是哪一种和弦外音。',
    tabs: { analyze: '分析旋律', gallery: '类型图鉴' },
    chords: '和弦进行（小节用 | 分隔，一小节四拍，同小节多个和弦平分）', melody: '旋律（音带八度；默认四分音符，:h :w :e 改时值，r 为休止）',
    analyze: '分析', play: '► 播放', accented: '强拍', weak: '弱拍', head: ['音', '拍位', '和弦', '类型', '说明'],
    beat: (bar, beat) => `${bar} 小节 第 ${beat} 拍`, error: '无法分析：', badChord: (c) => `无法识别和弦 ${c}`, pedal: (p) => `低音持续音 ${p}`,
  },
  ja: {
    kicker: '旋律と和声', title: '非和声音',
    intro: 'コード進行と旋律を入力すると、各音の入り方・離れ方・拍の位置から、和音構成音か、どの種類の非和声音かを判断します。',
    tabs: { analyze: '旋律を分析', gallery: '種類の一覧' },
    chords: 'コード進行（小節は |、一小節四拍、同じ小節の複数コードは等分）', melody: '旋律（オクターブ付き。既定は四分音符、:h :w :e で音価、r は休符）',
    analyze: '分析', play: '► 再生', accented: '強拍', weak: '弱拍', head: ['音', '拍', 'コード', '種類', '説明'],
    beat: (bar, beat) => `${bar} 小節 ${beat} 拍目`, error: '分析できません：', badChord: (c) => `コード ${c} を認識できません`, pedal: (p) => `低音の保続音 ${p}`,
  },
  en: {
    kicker: 'Melody & harmony', title: 'Embellishing tones',
    intro: 'Enter a chord progression and a melody. Each note is judged a chord tone or a type of embellishing tone from how it is approached, how it is left, and where it falls in the bar.',
    tabs: { analyze: 'Analyse a melody', gallery: 'Types' },
    chords: 'Chords (bars separated by |, four beats per bar, chords in one bar share it equally)', melody: 'Melody (pitches with octaves; quarter notes by default, :h :w :e change values, r is a rest)',
    analyze: 'Analyse', play: '► Play', accented: 'strong beat', weak: 'weak beat', head: ['Note', 'Beat', 'Chord', 'Type', 'Definition'],
    beat: (bar, beat) => `bar ${bar}, beat ${beat}`, error: 'Could not analyse: ', badChord: (c) => `Unknown chord ${c}`, pedal: (p) => `Bass pedal ${p}`,
  },
};

const VALUES = { w: 4, h: 2, q: 1, e: 0.5 };

export function parseMelody(text) {
  const bars = text.split('|').map((chunk) => chunk.trim()).filter(Boolean);
  const melody = [];
  bars.forEach((bar) => bar.split(/\s+/).filter(Boolean).forEach((token) => {
    const [, body, value] = token.match(/^([^:]+)(?::([whqe]))?$/) || [];
    if (!body) throw new Error(token);
    melody.push({ p: /^r$/i.test(body) ? null : body, d: VALUES[value] ?? 1 });
  }));
  return melody;
}

export function parseChordBars(text, toPcs) {
  const chords = [];
  text.split('|').map((chunk) => chunk.trim()).filter(Boolean).forEach((bar, barIndex) => {
    const symbols = bar.split(/\s+/).filter(Boolean);
    symbols.forEach((symbol, i) => {
      chords.push({ start: barIndex * 4 + (i * 4) / symbols.length, label: symbol, pcs: toPcs(symbol) });
    });
  });
  return chords;
}

function toBars(melody, beats = 4) {
  const bars = [[]];
  let used = 0;
  melody.forEach((note) => {
    if (used >= beats) { bars.push([]); used = 0; }
    bars[bars.length - 1].push(note);
    used += note.d;
  });
  return bars;
}

export function mountNonChordTones(target, { playChord, conv }) {
  const lang = language();
  const t = TEXT[lang];
  const names = NAMES[lang];
  const definitions = DEFINITIONS[lang];
  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  target.addEventListener('toolbox-stop', stop);

  const toPcs = (symbol) => {
    const data = conv?._ensureNotesAndRoot(symbol, true);
    const notes = data?.notes || [];
    const pcs = notes.map((name) => parseNote(name)?.pc).filter((pc) => pc != null);
    if (!pcs.length) throw new Error(t.badChord(symbol));
    return [...new Set(pcs)];
  };

  function playExample(melody, chords, bass) {
    stop();
    const quarter = 0.5;
    let time = 0;
    melody.forEach((note, i) => {
      const pitch = note.p && parsePitch(note.p);
      if (pitch && !note.tieIn) timers.push(setTimeout(() => playChord([midiToFrequency(pitch.midi)], note.d * quarter * 0.95, { interrupt: i === 0 }), time * quarter * 1000));
      time += note.d;
    });
    chords.forEach((chord, i) => {
      const end = chords[i + 1]?.start ?? time;
      const root = bass?.[i] ? parsePitch(bass[i]).midi : 48 + chord.pcs[0];
      const voices = [root, ...chord.pcs.map((pc) => 48 + ((pc - 48) % 12 + 12) % 12 + (pc < chord.pcs[0] ? 12 : 0))];
      timers.push(setTimeout(() => playChord(voices.map(midiToFrequency), (end - chord.start) * quarter * 0.9, { interrupt: false }), chord.start * quarter * 1000 + 5));
    });
  }

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));
  root.appendChild(head);
  const body = el('div', 'mk-section');
  const views = {};

  views.analyze = () => {
    const wrap = el('div', 'mk-section');
    const chordsInput = el('input');
    chordsInput.type = 'text';
    chordsInput.spellcheck = false;
    chordsInput.value = 'C | G7 | Am | F G | C';
    const melodyInput = el('textarea', 'mk-code');
    melodyInput.spellcheck = false;
    melodyInput.value = 'E4 F4 G4 E4 | D4:h F4 D4 | C4 B3 C4 E4 | A4 G4 B4 D5 | C5:w';
    const row1 = el('div', 'mk-controls');
    row1.appendChild(field(t.chords, chordsInput, 'mk-grow'));
    const row2 = el('div', 'mk-controls');
    row2.appendChild(field(t.melody, melodyInput, 'mk-grow'));
    const actions = el('div', 'mk-actions');
    const result = el('div', 'mk-section');
    let current = null;
    actions.append(button('btn btn-primary btn-sm', t.analyze, analyze), button('btn btn-secondary btn-sm', t.play, () => current && playExample(current.melody, current.chords)));
    wrap.append(row1, row2, actions, result);

    function analyze() {
      result.replaceChildren();
      try {
        const melody = parseMelody(melodyInput.value);
        const chords = parseChordBars(chordsInput.value, toPcs);
        const analysis = analyzeEmbellishingTones(melody, chords);
        current = { melody, chords };
        const byIndex = new Map(analysis.map((a) => [a.index, a]));
        const marked = melody.map((note, index) => {
          const a = byIndex.get(index);
          return a ? { ...note, mark: a.type === 'CT' ? '' : a.type === 'unclassified' ? '?' : a.type, markClass: a.type === 'CT' ? '' : 'is-dissonant' } : note;
        });
        const labels = chords.map((chord) => ({ bar: Math.floor(chord.start / 4), beat: chord.start % 4, text: chord.label }));
        const scroll = el('div', 'mk-staff-scroll');
        scroll.appendChild(renderStaff({ staves: [{ bars: toBars(marked) }], beats: 4, meter: [4, 4], labels }));
        result.appendChild(scroll);
        const tableWrap = el('div', 'mk-table-wrap');
        const table = el('table', 'mk-table');
        const headRow = el('tr');
        t.head.forEach((text) => headRow.appendChild(el('th', '', text)));
        const thead = el('thead');
        thead.appendChild(headRow);
        const tbody = el('tbody');
        analysis.filter((a) => a.type !== 'CT').forEach((a) => {
          const row = el('tr');
          const definition = definitions[a.type];
          const cell = el('td', '', definition ? definition[0] : '—');
          if (definition) cell.appendChild(cite(SOURCES, definition[1]));
          row.append(
            el('td', 'mk-strong', a.pitch),
            el('td', '', `${t.beat(Math.floor(a.onset / 4) + 1, (a.onset % 4) + 1)} · ${a.accented ? t.accented : t.weak}`),
            el('td', '', a.chord || '—'),
            el('td', 'mk-strong', names[a.type] || a.type),
            cell,
          );
          tbody.appendChild(row);
        });
        table.append(thead, tbody);
        tableWrap.appendChild(table);
        result.appendChild(tableWrap);
      } catch (error) {
        result.appendChild(el('p', 'mk-callout is-error', `${t.error}${error.message}`));
      }
    }
    analyze();
    return wrap;
  };

  views.gallery = () => {
    const grid = el('div', 'mk-grid mk-grid-wide');
    Object.entries(EXAMPLES).forEach(([type, example]) => {
      const card = el('div', 'mk-card');
      const cardHead = el('div', 'mk-card-head');
      cardHead.append(el('strong', '', names[type]), el('span', 'mk-badge', type));
      const definition = el('p', '', definitions[type][0]);
      definition.appendChild(cite(SOURCES, definitions[type][1]));
      const melody = example.melody.map((note, i) => ({ ...note, tieIn: example.tie && i === example.target, mark: i === example.target ? type : '' , markClass: i === example.target ? 'is-dissonant' : '' }));
      const staves = [{ bars: toBars(melody) }];
      if (example.bass) staves.push({ clef: 'bass', bars: toBars(example.bass.map((p) => ({ p, d: 2 }))) });
      if (type === 'PED') findPedalPoints(example.bass.map((p) => ({ p })), example.chords).forEach((pedal) => definition.appendChild(el('span', 'mk-meta', ` ${t.pedal(pedal.pitch)}`)));
      const scroll = el('div', 'mk-staff-scroll');
      scroll.appendChild(renderStaff({ staves, beats: 4, labels: example.chords.map((c) => ({ bar: Math.floor(c.start / 4), beat: c.start % 4, text: c.label })) }));
      card.append(cardHead, definition, scroll, button('btn btn-secondary btn-sm', t.play, () => playExample(melody, example.chords, example.bass)));
      grid.appendChild(card);
    });
    return grid;
  };

  const navigation = tabs(root, Object.entries(t.tabs).map(([id, label]) => ({ id, label })), (id) => {
    stop();
    body.replaceChildren(views[id]());
  });
  root.append(body, relatedLinks(['counterpoint', 'harmonize']), sourcesFooter(SOURCES));
  target.appendChild(root);
  navigation.select('analyze');
}

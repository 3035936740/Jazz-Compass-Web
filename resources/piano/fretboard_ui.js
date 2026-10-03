// 指板与 CAGED 界面：五个把位的大三和弦、各调弦法的指板音名
// 数据与出处见 fretboard.js：ref:wiki-standard-tuning ref:agt-caged
import { TUNINGS, midiAt, positionsOf, CAGED_ORDER, cagedVoicing, cagedPositions, majorTriad, LABEL_TO_INDEX } from './fretboard.js';
import { parseNote, simplestName } from './pitch_spelling.js';
import { el, button, option, field, language, sourcesFooter, cite, tabs, midiToFrequency, relatedLinks, crossLink } from './module_kit.js';

const SOURCES = ['agt-caged', 'wiki-standard-tuning'];
const ROOTS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const MAX_FRET = 15;
const SVG_NS = 'http://www.w3.org/2000/svg';

const TEXT = {
  zh: {
    kicker: '吉他', title: '指板与 CAGED',
    intro: 'CAGED 系统用 C、A、G、E、D 五个开放和弦形把指板分成五个相连的区域：每个形都能整体平移，五个形按 C→A→G→E→D 的顺序首尾相接，覆盖整个指板。',
    tabs: { caged: 'CAGED 五个把位', notes: '指板音名' },
    root: '和弦根音', shape: '形', all: '全部五个', labels: '标注', byInterval: '音程（R/3/5）', byName: '音名',
    play: '►', playAll: '► 依次弹奏五个把位', openChord: (name) => `在和弦转换中查看 ${name} 和弦`, shapeName: (id) => `${id} 形`, fret: (n) => (n === 0 ? '开放把位' : `平移 ${n} 品`),
    cagedHint: '同一和弦的相邻两个形共用若干音（例如 C 形第 5 弦上的根音也是 A 形的根音），因此五个形首尾相接。',
    tuning: '乐器 / 调弦', tunings: { guitar: '六弦吉他', bass: '四弦贝斯', mandolin: '曼陀林', ukulele: '尤克里里（高音）' },
    highlight: '标出音', none: '（不标）', notesHint: '点击任意品位试听。图中最上方为最高音弦；音高按实际发音标注（吉他记谱高八度）。',
  },
  ja: {
    kicker: 'ギター', title: '指板と CAGED',
    intro: 'CAGED システムは C・A・G・E・D の五つのオープン・コードの形で指板を五つの連続した領域に分けます。各形は平行移動でき、C→A→G→E→D の順につながって指板全体を覆います。',
    tabs: { caged: 'CAGED の五つのポジション', notes: '指板の音名' },
    root: 'コードのルート', shape: '形', all: '五つすべて', labels: '表示', byInterval: '音程（R/3/5）', byName: '音名',
    play: '►', playAll: '► 五つのポジションを順に', openChord: (name) => `コード変換で ${name} を見る`, shapeName: (id) => `${id} フォーム`, fret: (n) => (n === 0 ? 'オープン' : `${n} フレット移動`),
    cagedHint: '同じコードの隣り合う形はいくつかの音を共有します（たとえば C フォームの 5 弦のルートは A フォームのルートでもある）。そのため五つの形がつながります。',
    tuning: '楽器 / チューニング', tunings: { guitar: '6 弦ギター', bass: '4 弦ベース', mandolin: 'マンドリン', ukulele: 'ウクレレ（ソプラノ）' },
    highlight: '表示する音', none: '（なし）', notesHint: 'フレットをクリックすると試聴できます。図のいちばん上が最高音弦です。音高は実音で表示します（ギターの記譜は 1 オクターヴ上）。',
  },
  en: {
    kicker: 'Guitar', title: 'Fretboard & CAGED',
    intro: 'The CAGED system uses five open-chord shapes — C, A, G, E and D — to divide the fretboard into five connected areas: each shape is movable, and they join in the order C→A→G→E→D to cover the whole neck.',
    tabs: { caged: 'Five CAGED positions', notes: 'Fretboard notes' },
    root: 'Chord root', shape: 'Shape', all: 'All five', labels: 'Labels', byInterval: 'Intervals (R/3/5)', byName: 'Note names',
    play: '►', playAll: '► Play the five positions', openChord: (name) => `Open ${name} in Chord Conversion`, shapeName: (id) => `${id} form`, fret: (n) => (n === 0 ? 'open position' : `moved up ${n} frets`),
    cagedHint: 'Neighbouring shapes of the same chord share notes (the C form’s root on the 5th string is also the A form’s root), so the five shapes link up.',
    tuning: 'Instrument / tuning', tunings: { guitar: 'Six-string guitar', bass: 'Four-string bass', mandolin: 'Mandolin', ukulele: 'Ukulele (soprano)' },
    highlight: 'Highlight', none: '(none)', notesHint: 'Click any fret to hear it. The top line is the highest string; pitches are shown as they sound (guitar is notated an octave higher).',
  },
};

/** 画指板：strings 由低到高，画面上最高音弦在上 */
function drawFretboard(stringCount, dots, { onFret } = {}) {
  const fretW = 46;
  const left = 34;
  const top = 18;
  const gap = 24;
  const width = left + fretW * MAX_FRET + 16;
  const height = top * 2 + gap * (stringCount - 1) + 16;
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('class', 'fb-svg');
  svg.setAttribute('width', String(width));
  const make = (tag, attrs, text) => {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, String(v)));
    if (text !== undefined) node.textContent = text;
    svg.appendChild(node);
    return node;
  };
  const y = (string) => top + gap * (stringCount - 1 - string);
  const x = (fret) => (fret === 0 ? left - 14 : left + fretW * (fret - 0.5));
  [3, 5, 7, 9, 15].forEach((fret) => make('circle', { cx: x(fret), cy: top + gap * (stringCount - 1) / 2, r: 4, class: 'fb-inlay' }));
  [-1, 1].forEach((side) => make('circle', { cx: x(12), cy: top + gap * (stringCount - 1) / 2 + side * gap * 0.9, r: 4, class: 'fb-inlay' }));
  for (let fret = 0; fret <= MAX_FRET; fret += 1) {
    make('line', { x1: left + fretW * fret, x2: left + fretW * fret, y1: top, y2: y(0), class: fret === 0 ? 'fb-nut' : 'fb-fret' });
    if (fret > 0) make('text', { x: x(fret), y: height - 3, class: 'fb-num' }, String(fret));
  }
  for (let string = 0; string < stringCount; string += 1) make('line', { x1: left, x2: left + fretW * MAX_FRET, y1: y(string), y2: y(string), class: 'fb-string' });
  if (onFret) {
    for (let string = 0; string < stringCount; string += 1) {
      for (let fret = 0; fret <= MAX_FRET; fret += 1) {
        const hit = make('rect', { x: x(fret) - fretW / 2, y: y(string) - gap / 2, width: fretW, height: gap, class: 'fb-hit' });
        hit.addEventListener('click', () => onFret(string, fret));
      }
    }
  }
  dots.forEach((dot) => {
    const group = make('g', { class: `fb-dot ${dot.className ?? ''}`.trim() });
    group.append(make('circle', { cx: x(dot.fret), cy: y(dot.string), r: 10 }), make('text', { x: x(dot.fret), y: y(dot.string) + 4 }, dot.label));
    if (onFret) group.addEventListener('click', () => onFret(dot.string, dot.fret));
  });
  const scroll = el('div', 'mk-staff-scroll');
  scroll.appendChild(svg);
  return scroll;
}

export function mountFretboard(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  target.addEventListener('toolbox-stop', stop);
  const strum = (midis, at = 0) => midis.forEach((midi, index) => timers.push(setTimeout(() => playChord([midiToFrequency(midi)], 1.6, { interrupt: at === 0 && index === 0 }), at + index * 45)));

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));
  root.appendChild(head);
  const body = el('div', 'mk-section');
  const views = {};

  views.caged = () => {
    const wrap = el('div', 'mk-section');
    const rootSelect = el('select');
    ROOTS.forEach((name) => rootSelect.appendChild(option(name, name.replace('b', '♭').replace('#', '♯'))));
    const shapeSelect = el('select');
    shapeSelect.appendChild(option('all', t.all));
    CAGED_ORDER.forEach((id) => shapeSelect.appendChild(option(id, t.shapeName(id))));
    const labelSelect = el('select');
    labelSelect.append(option('interval', t.byInterval), option('name', t.byName));
    const controls = el('div', 'mk-controls');
    controls.append(field(t.root, rootSelect), field(t.shape, shapeSelect), field(t.labels, labelSelect));
    const result = el('div', 'mk-section');
    const hint = el('p', 'mk-hint', t.cagedHint);
    hint.appendChild(cite(SOURCES, 'agt-caged'));
    wrap.append(controls, result, hint);

    function paint() {
      stop();
      result.replaceChildren();
      const rootName = rootSelect.value;
      const triad = majorTriad(rootName);
      const positions = cagedPositions(rootName);
      const visible = shapeSelect.value === 'all' ? positions : positions.filter((p) => p.shape === shapeSelect.value);
      const dots = [];
      visible.forEach((position) => position.notes.forEach((note) => {
        if (note.fret > MAX_FRET || dots.some((dot) => dot.string === note.string && dot.fret === note.fret)) return;
        dots.push({
          string: note.string, fret: note.fret, className: `fb-shape-${position.shape}${note.label === 'R' ? ' is-root' : ''}`,
          label: labelSelect.value === 'interval' ? note.label : triad[LABEL_TO_INDEX[note.label]].replace('b', '♭').replace('#', '♯'),
        });
      }));
      result.appendChild(drawFretboard(6, dots, { onFret: (string, fret) => playChord([midiToFrequency(midiAt('guitar', string, fret))], 1) }));
      const cards = el('div', 'mk-grid');
      positions.forEach((position) => {
        const card = el('div', `mk-card fb-card fb-shape-${position.shape}`);
        const cardHead = el('div', 'mk-card-head');
        cardHead.append(el('strong', '', t.shapeName(position.shape)), el('span', 'mk-badge', t.fret(position.shift)));
        const frets = Array.from({ length: 6 }, (_, string) => position.notes.find((note) => note.string === string)?.fret ?? 'x');
        card.append(cardHead, el('p', '', `${frets.join(' ')}  (6 → 1)`));
        card.appendChild(button('btn btn-ghost btn-sm', t.play, () => { stop(); strum(position.notes.map((note) => note.midi)); }));
        cards.appendChild(card);
      });
      const actions = el('div', 'mk-actions');
      actions.appendChild(button('btn btn-primary btn-sm', t.playAll, () => {
        stop();
        positions.forEach((position, index) => strum(position.notes.map((note) => note.midi), index * 1300));
      }));
      actions.appendChild(crossLink('chord', t.openChord(rootName.replace('b', '♭').replace('#', '♯')), rootName));
      result.append(cards, actions);
    }
    [rootSelect, shapeSelect, labelSelect].forEach((node) => node.addEventListener('change', paint));
    paint();
    return wrap;
  };

  views.notes = () => {
    const wrap = el('div', 'mk-section');
    const tuningSelect = el('select');
    Object.keys(TUNINGS).forEach((id) => tuningSelect.appendChild(option(id, `${t.tunings[id]} · ${TUNINGS[id].join(' ')}`)));
    const noteSelect = el('select');
    noteSelect.appendChild(option('', t.none));
    ROOTS.filter((name) => !['Gb'].includes(name)).forEach((name) => noteSelect.appendChild(option(name, name.replace('b', '♭').replace('#', '♯'))));
    noteSelect.value = 'C';
    const controls = el('div', 'mk-controls');
    controls.append(field(t.tuning, tuningSelect), field(t.highlight, noteSelect));
    const result = el('div', 'mk-section');
    const hint = el('p', 'mk-hint', t.notesHint);
    hint.appendChild(cite(SOURCES, 'wiki-standard-tuning'));
    wrap.append(controls, result, hint);
    function paint() {
      result.replaceChildren();
      const tuning = tuningSelect.value;
      const strings = TUNINGS[tuning].length;
      const dots = [];
      if (noteSelect.value) {
        const pc = parseNote(noteSelect.value).pc;
        positionsOf(tuning, [pc], MAX_FRET).forEach((p) => dots.push({ string: p.string, fret: p.fret, className: 'is-root', label: noteSelect.value.replace('b', '♭').replace('#', '♯') }));
      }
      TUNINGS[tuning].forEach((_, string) => {
        if (!dots.some((dot) => dot.string === string && dot.fret === 0)) {
          dots.push({ string, fret: 0, className: 'is-open', label: simplestName(midiAt(tuning, string, 0) % 12, false) });
        }
      });
      result.appendChild(drawFretboard(strings, dots, { onFret: (string, fret) => playChord([midiToFrequency(midiAt(tuning, string, fret))], 1) }));
    }
    [tuningSelect, noteSelect].forEach((node) => node.addEventListener('change', paint));
    paint();
    return wrap;
  };

  const navigation = tabs(root, Object.entries(t.tabs).map(([id, label]) => ({ id, label })), (id) => {
    stop();
    body.replaceChildren(views[id]());
  });
  root.append(body, relatedLinks(['chord', 'instruments', 'cst']), sourcesFooter(SOURCES));
  target.appendChild(root);
  navigation.select('caged');
}

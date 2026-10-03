// 二十世纪技法界面
// 依据见 post_tonal.js：ref:omt2e-normal-order ref:omt2e-prime-form ref:omt2e-ic-vector ref:wiki-set-classes
//   ref:omt2e-collections ref:wiki-messiaen-modes ref:omt2e-row-naming ref:wiki-tone-rows
import {
  parsePcList, formatPc, formatSet, setClassInfo, transpose, invert, normalOrder, twelveToneMatrix,
  COLLECTIONS, collectionPcs, distinctTranspositions, distinctModes,
} from './post_tonal.js';
import { el, button, option, field, language, midiToFrequency, sourcesFooter, cite, tabs, relatedLinks } from './module_kit.js';

const SOURCES = ['omt2e-normal-order', 'omt2e-prime-form', 'omt2e-ic-vector', 'wiki-set-classes', 'omt2e-collections', 'wiki-messiaen-modes', 'omt2e-row-naming', 'wiki-tone-rows'];
const NAMES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
const WEBERN_OP24 = [0, 11, 3, 4, 8, 7, 9, 5, 6, 1, 2, 10];

const TEXT = {
  zh: {
    kicker: '二十世纪技法', title: '音级集合 · 十二音 · 对称音集',
    intro: '分析音级集合的标准序、原型、Forte 编号与音程级向量；由音列生成十二音矩阵；比较全音、八音、六音音集与梅西安有限移位调式。',
    tabs: { sets: '音级集合', rows: '十二音矩阵', collections: '对称音集' },
    input: '音级（0–11，t = 10，e = 11，或音名）', analyze: '分析', play: '► 和弦', arpeggio: '► 分解',
    normal: '标准序（normal order）', prime: '原型（prime form，Rahn 写法）', fortePrime: 'Forte 写法', forte: 'Forte 编号', vector: '音程级向量',
    z: 'Z 关系', complement: '补集', none: '—', tn: 'Tn', in: 'In', n: 'n',
    tnType: (t) => (t ? `（${t} 型）` : '（对称）'),
    row: '音列（12 个不同音级）', convention: '下标约定', fixed: '固定零：P0 从 C 开始', moveable: '移动零：P0 = 音列首音', names: '显示音名',
    matrixHint: 'P 从左往右读行，R 从右往左读行；I 从上往下读列，RI 从下往上读列。点击标签试听。',
    webern: 'Webern《九件乐器协奏曲》Op. 24 的音列（以首音为 0）', form: '行形式', show: '取出',
    collectionsHead: ['音集', '相邻音程', '音（从 C 起）', '不同移位', '调式数'],
    collectionNames: { 'whole-tone': '全音音集', 'octatonic-01': '八音音集（半–全）', 'octatonic-02': '八音音集（全–半）', hexatonic: '六音音集', pentatonic: '五声音集', acoustic: '原音音集', 'messiaen-1': '梅西安第 1 调式', 'messiaen-2': '梅西安第 2 调式', 'messiaen-3': '梅西安第 3 调式', 'messiaen-4': '梅西安第 4 调式', 'messiaen-5': '梅西安第 5 调式', 'messiaen-6': '梅西安第 6 调式', 'messiaen-7': '梅西安第 7 调式' },
    limitedNote: '有限移位：移位若干次后回到相同的音，不同移位的数目少于 12。下表的数目由本工具计算，与梅西安书中所列一致。',
    error: '无法分析：',
  },
  ja: {
    kicker: '20 世紀の技法', title: 'ピッチクラス・セット・12 音・対称的な音集合',
    intro: 'ピッチクラス・セットのノーマル・オーダー、プライム・フォーム、フォルテ番号、音程クラス・ベクトルを求め、音列から 12 音マトリクスを作り、全音・八音・六音の音集合とメシアンの移調の限られた旋法を比べます。',
    tabs: { sets: 'ピッチクラス・セット', rows: '12 音マトリクス', collections: '対称的な音集合' },
    input: 'ピッチクラス（0–11、t = 10、e = 11、または音名）', analyze: '分析', play: '► 和音', arpeggio: '► 分散',
    normal: 'ノーマル・オーダー', prime: 'プライム・フォーム（Rahn）', fortePrime: 'Forte の表記', forte: 'フォルテ番号', vector: '音程クラス・ベクトル',
    z: 'Z 関係', complement: '補集合', none: '—', tn: 'Tn', in: 'In', n: 'n',
    tnType: (t) => (t ? `（${t} 型）` : '（対称）'),
    row: '音列（12 の異なるピッチクラス）', convention: '添字の約束', fixed: '固定ゼロ：P0 は C から', moveable: '移動ゼロ：P0 = 音列の最初の音', names: '音名で表示',
    matrixHint: 'P は行を左から右、R は右から左、I は列を上から下、RI は下から上に読みます。ラベルをクリックで試聴。',
    webern: 'ヴェーベルン《9 楽器のための協奏曲》Op. 24 の音列（最初の音を 0）', form: '音列形', show: '取り出す',
    collectionsHead: ['音集合', '隣接音程', '音（C から）', '異なる移調', '旋法の数'],
    collectionNames: { 'whole-tone': '全音音階', 'octatonic-01': '八音音階（半音–全音）', 'octatonic-02': '八音音階（全音–半音）', hexatonic: '六音音階（ヘキサトニック）', pentatonic: '五音音階', acoustic: 'アコースティック・スケール', 'messiaen-1': 'メシアン第 1 旋法', 'messiaen-2': 'メシアン第 2 旋法', 'messiaen-3': 'メシアン第 3 旋法', 'messiaen-4': 'メシアン第 4 旋法', 'messiaen-5': 'メシアン第 5 旋法', 'messiaen-6': 'メシアン第 6 旋法', 'messiaen-7': 'メシアン第 7 旋法' },
    limitedNote: '移調が限られる：何度か移調すると同じ音に戻り、異なる移調は 12 より少ない。表の数は本ツールが計算したもので、メシアンの記述と一致します。',
    error: '分析できません：',
  },
  en: {
    kicker: 'Twentieth-century techniques', title: 'Pitch-class sets · twelve-tone rows · symmetric collections',
    intro: 'Find a set’s normal order, prime form, Forte number and interval-class vector; build a twelve-tone matrix from a row; compare whole-tone, octatonic and hexatonic collections with Messiaen’s modes of limited transposition.',
    tabs: { sets: 'Pitch-class sets', rows: 'Twelve-tone matrix', collections: 'Symmetric collections' },
    input: 'Pitch classes (0–11, t = 10, e = 11, or note names)', analyze: 'Analyse', play: '► Chord', arpeggio: '► Arpeggio',
    normal: 'Normal order', prime: 'Prime form (Rahn)', fortePrime: 'Forte’s spelling', forte: 'Forte number', vector: 'Interval-class vector',
    z: 'Z-relation', complement: 'Complement', none: '—', tn: 'Tn', in: 'In', n: 'n',
    tnType: (t) => (t ? ` (${t} form)` : ' (symmetric)'),
    row: 'Row (12 different pitch classes)', convention: 'Subscripts', fixed: 'Fixed zero: P0 starts on C', moveable: 'Moveable zero: P0 = first note of the row', names: 'Show note names',
    matrixHint: 'Read P along rows left to right, R right to left; I down the columns, RI bottom to top. Click a label to hear it.',
    webern: 'Row of Webern’s Concerto for Nine Instruments, Op. 24 (first note = 0)', form: 'Row form', show: 'Show',
    collectionsHead: ['Collection', 'Steps', 'Notes from C', 'Transpositions', 'Modes'],
    collectionNames: { 'whole-tone': 'Whole-tone', 'octatonic-01': 'Octatonic (half–whole)', 'octatonic-02': 'Octatonic (whole–half)', hexatonic: 'Hexatonic', pentatonic: 'Pentatonic', acoustic: 'Acoustic', 'messiaen-1': 'Messiaen mode 1', 'messiaen-2': 'Messiaen mode 2', 'messiaen-3': 'Messiaen mode 3', 'messiaen-4': 'Messiaen mode 4', 'messiaen-5': 'Messiaen mode 5', 'messiaen-6': 'Messiaen mode 6', 'messiaen-7': 'Messiaen mode 7' },
    limitedNote: 'Limited transposition: after a few transpositions the same notes return, so there are fewer than 12 distinct versions. The counts below are computed by this tool and agree with Messiaen’s.',
    error: 'Could not analyse: ',
  },
};

export function mountPostTonal(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  target.addEventListener('toolbox-stop', stop);
  const midis = (pcs, base = 60) => { let last = base - 1; return pcs.map((pc) => { let m = base + pc; while (m <= last) m += 12; last = m; return m; }); };
  const playArp = (pcs) => { stop(); midis(pcs).forEach((m, i) => timers.push(setTimeout(() => playChord([midiToFrequency(m)], 0.4, { interrupt: i === 0 }), i * 300))); };
  const playBlock = (pcs) => { stop(); playChord(midis(pcs).map(midiToFrequency), 1.6); };
  const hint = (text, ...refs) => { const p = el('p', 'mk-hint', text); refs.forEach((id) => p.appendChild(cite(SOURCES, id))); return p; };

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));
  root.appendChild(head);
  const body = el('div', 'mk-section');
  const views = {};

  views.sets = () => {
    const wrap = el('div', 'mk-section');
    const input = el('input');
    input.type = 'text';
    input.spellcheck = false;
    input.value = '0 1 4 6';
    const n = el('select');
    for (let i = 0; i < 12; i++) n.appendChild(option(String(i)));
    const controls = el('div', 'mk-controls');
    controls.append(field(t.input, input, 'mk-grow'), button('btn btn-primary btn-sm', t.analyze, paint), field(t.n, n));
    const result = el('div', 'mk-section');
    wrap.append(controls, result);
    function paint() {
      result.replaceChildren();
      let info;
      try {
        const pcs = parsePcList(input.value);
        if (pcs.length < 2) throw new Error('2+');
        info = setClassInfo(pcs);
      } catch (error) { result.appendChild(el('p', 'mk-callout is-error', `${t.error}${error.message}`)); return; }
      const table = el('div', 'mk-table-wrap');
      const tbl = el('table', 'mk-table');
      const tbody = el('tbody');
      const row = (label, value, ...refs) => {
        const tr = el('tr');
        const th = el('td', '', label);
        refs.forEach((id) => th.appendChild(cite(SOURCES, id)));
        tr.append(th, el('td', 'mk-strong', value));
        tbody.appendChild(tr);
      };
      row(t.normal, formatSet(info.normal), 'omt2e-normal-order');
      row(t.prime, `(${info.prime.map(formatPc).join('')})`, 'omt2e-prime-form', 'wiki-set-classes');
      if (info.fortePrime.join() !== info.prime.join()) row(t.fortePrime, `(${info.fortePrime.map(formatPc).join('')})`, 'wiki-set-classes');
      row(t.forte, info.forte ? `${info.forte}${t.tnType(info.tnType)}` : t.none, 'wiki-set-classes');
      row(t.vector, `<${info.vector.join('')}>`, 'omt2e-ic-vector');
      row(t.z, info.zPartner || t.none, 'wiki-set-classes');
      row(t.complement, info.complement || t.none, 'wiki-set-classes');
      const k = Number(n.value);
      row(`${t.tn.replace('n', k)}`, formatSet(normalOrder(transpose(info.pcs, k))), 'omt2e-normal-order');
      row(`${t.in.replace('n', k)}`, formatSet(normalOrder(invert(info.pcs, k))), 'omt2e-normal-order');
      tbl.appendChild(tbody);
      table.appendChild(tbl);
      const actions = el('div', 'mk-actions');
      actions.append(button('btn btn-secondary btn-sm', t.play, () => playBlock(info.normal)), button('btn btn-ghost btn-sm', t.arpeggio, () => playArp(info.normal)));
      const notes = el('div', 'mk-notes');
      info.normal.forEach((pc) => { const chip = el('div', 'mk-note'); chip.append(el('strong', '', NAMES[pc]), el('small', '', formatPc(pc))); notes.appendChild(chip); });
      result.append(notes, actions, table);
    }
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') paint(); });
    n.addEventListener('change', paint);
    paint();
    return wrap;
  };

  views.rows = () => {
    const wrap = el('div', 'mk-section');
    const input = el('input');
    input.type = 'text';
    input.spellcheck = false;
    input.value = WEBERN_OP24.map(formatPc).join(' ');
    const convention = el('select');
    convention.append(option('fixed', t.fixed), option('moveable', t.moveable));
    const names = el('input');
    names.type = 'checkbox';
    const namesLabel = el('label', 'jazz-check');
    namesLabel.append(names, el('span', '', t.names));
    const controls = el('div', 'mk-controls');
    controls.append(field(t.row, input, 'mk-grow'), field(t.convention, convention), namesLabel);
    const source = hint(t.webern, 'wiki-tone-rows');
    const result = el('div', 'mk-section');
    wrap.append(controls, source, hint(t.matrixHint, 'omt2e-row-naming'), result);
    function paint() {
      result.replaceChildren();
      let data;
      let row;
      try { row = parsePcList(input.value); data = twelveToneMatrix(row, convention.value); } catch (error) { result.appendChild(el('p', 'mk-callout is-error', `${t.error}${error.message}`)); return; }
      const show = (pc) => (names.checked ? NAMES[pc] : formatPc(pc));
      const tableWrap = el('div', 'mk-table-wrap');
      const table = el('table', 'mk-table');
      const thead = el('thead');
      const top = el('tr');
      top.appendChild(el('th', ''));
      data.columnLabels.forEach((label, c) => {
        const th = el('th', '');
        th.appendChild(button('btn btn-ghost btn-sm', label.i, () => playArp(data.matrix.map((r) => r[c]))));
        top.appendChild(th);
      });
      top.appendChild(el('th', ''));
      thead.appendChild(top);
      const tbody = el('tbody');
      data.matrix.forEach((line, r) => {
        const tr = el('tr');
        const left = el('td', '');
        left.appendChild(button('btn btn-ghost btn-sm', data.rowLabels[r].p, () => playArp(line)));
        tr.appendChild(left);
        line.forEach((pc) => tr.appendChild(el('td', 'mk-strong', show(pc))));
        const right = el('td', '');
        right.appendChild(button('btn btn-ghost btn-sm', data.rowLabels[r].r, () => playArp([...line].reverse())));
        tr.appendChild(right);
        tbody.appendChild(tr);
      });
      const bottom = el('tr');
      bottom.appendChild(el('td', ''));
      data.columnLabels.forEach((label, c) => {
        const td = el('td', '');
        td.appendChild(button('btn btn-ghost btn-sm', label.ri, () => playArp(data.matrix.map((rr) => rr[c]).reverse())));
        bottom.appendChild(td);
      });
      bottom.appendChild(el('td', ''));
      tbody.appendChild(bottom);
      table.append(thead, tbody);
      tableWrap.appendChild(table);
      result.appendChild(tableWrap);
    }
    [convention, names].forEach((c) => c.addEventListener('change', paint));
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') paint(); });
    input.addEventListener('change', paint);
    paint();
    return wrap;
  };

  views.collections = () => {
    const wrap = el('div', 'mk-section');
    wrap.appendChild(hint(t.limitedNote, 'wiki-messiaen-modes', 'omt2e-collections'));
    const tableWrap = el('div', 'mk-table-wrap');
    const table = el('table', 'mk-table');
    const headRow = el('tr');
    [...t.collectionsHead, ''].forEach((text) => headRow.appendChild(el('th', '', text)));
    const thead = el('thead');
    thead.appendChild(headRow);
    const tbody = el('tbody');
    COLLECTIONS.forEach((c) => {
      const pcs = collectionPcs(c.steps, 0);
      const tr = el('tr');
      const name = el('td', 'mk-strong', t.collectionNames[c.id]);
      name.appendChild(cite(SOURCES, c.ref));
      const action = el('td');
      action.appendChild(button('btn btn-ghost btn-sm', t.arpeggio, () => playArp([...pcs, 12])));
      tr.append(name, el('td', '', c.steps.join('-')), el('td', '', pcs.map((pc) => NAMES[pc]).join(' ')), el('td', '', String(distinctTranspositions(c.steps))), el('td', '', String(distinctModes(c.steps))), action);
      tbody.appendChild(tr);
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
  root.append(body, relatedLinks(['neo', 'micro']), sourcesFooter(SOURCES));
  target.appendChild(root);
  navigation.select('sets');
}

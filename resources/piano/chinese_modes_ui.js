// 中国民族调式界面
// 理论依据见 chinese_modes.js 顶部注释：ref:sccm-ethnic-modes ref:zhwiki-pentatonic ref:huain-xuangong ref:helvting-scales
import {
  JIE_MING, MODES, SCALE_TYPES, SHI_ER_LU,
  buildChineseMode, modeName, sameGongSystem, identifyChineseMode, rotateGong, luName, jieMingNote,
} from './chinese_modes.js';
import { parseNote, simplestName } from './pitch_spelling.js';
import { renderScaleStaff } from './staff_svg.js?v=20261002-fix';
import { el, button, option, field, language, playMidiSequence, sourcesFooter, cite, tabs, relatedLinks } from './module_kit.js';

const SOURCES = ['sccm-ethnic-modes', 'zhwiki-heptatonic', 'zhwiki-pentatonic', 'tcpc-biangong', 'dreampu-ethnic-modes', 'huain-xuangong', 'zhwiki-shierlu', 'helvting-scales'];

const TONICS = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
const DEGREE_LABEL = { 0: '1', 2: '2', 4: '3', 5: '4', 6: '♯4', 7: '5', 9: '6', 10: '♭7', 11: '7' };

const TEXT = {
  zh: {
    kicker: '五声性调式', title: '中国民族调式',
    intro: '以宫、商、角、徵、羽五个正音为基础，加入清角、变徵、闰、变宫等偏音，构成五声、六声与七声调式。选择主音与调式，查看音阶、宫系统与色彩。',
    tabs: { scale: '调式音阶', system: '同宫系统与旋宫', identify: '调式识别', names: '九声阶名' },
    tonic: '调式主音', mode: '调式', type: '音阶', play: '► 上行试听', playDown: '► 下行试听', gong: '宫音', lu: '律名',
    major: '大调色彩', minor: '小调色彩', trichords: '三音列', zheng: '正音', pian: '偏音',
    pianNote: '偏音只起辅助和色彩作用，不能作调式主音。',
    systemHint: '宫音相同的五种调式构成同宫系统：调号、音列相同，主音不同。',
    xuangong: '旋宫', fifthDown: '← 下五度', fifthUp: '上五度 →', useTonic: '查看此调式',
    xuangongQuote: '《礼记·礼运》："五声六律十二管旋相为宫。"十二律轮流作宫，即旋宫；宫音不变而换主音为同宫转调，宫音改变为异宫转调。',
    identifyHint: '输入旋律中出现的音（空格或逗号分隔），结束音视为调式主音。先找宫–角大三度和五个正音以确定宫系统，再看多出的偏音。',
    notes: '旋律音', final: '结束音', auto: '自动（最后一个音）', analyze: '识别',
    errors: {
      'too-few-notes': '至少输入三个不同的音。', 'bad-final': '无法识别结束音。', 'final-not-in-melody': '结束音不在输入的音里。',
      'no-gong-system': '找不到包含五个正音的宫系统，或多出的音不属于六声、七声调式的偏音组合。', 'final-is-pian': '结束音在每种读法里都是偏音，不能作调式主音。',
    },
    ambiguous: '这组音可以对应多个宫系统，需要结合旋律中骨干音的用法判断：',
    found: '识别结果', gongNote: '宫音', majorThird: '宫–角大三度',
    tableHeads: ['阶名', '别名', '类别', '首调音级', '相对宫音', 'C 宫中的音'],
    semitone: (n) => `${n} 个半音`,
    nameRule: '偏音比正音低半音称"变"，高半音称"清"；清角又称"和"，清羽后称"闰"。',
  },
  ja: {
    kicker: '五声性旋法', title: '中国の民族旋法',
    intro: '宮・商・角・徴・羽の五つの正音に、清角・変徴・閏・変宮などの偏音を加え、五声・六声・七声の旋法を作ります。主音と旋法を選び、音階・宮系統・色彩を確認します。',
    tabs: { scale: '旋法と音階', system: '同宮系統と旋宮', identify: '旋法の判別', names: '九声の階名' },
    tonic: '主音', mode: '旋法', type: '音階', play: '► 上行で試聴', playDown: '► 下行で試聴', gong: '宮音', lu: '律名',
    major: '長調的な色彩', minor: '短調的な色彩', trichords: '三音列', zheng: '正音', pian: '偏音',
    pianNote: '偏音は補助と色彩のための音で、旋法の主音にはなりません。',
    systemHint: '宮音が同じ五つの旋法が同宮系統です。調号と音列は同じで、主音が異なります。',
    xuangong: '旋宮', fifthDown: '← 五度下', fifthUp: '五度上 →', useTonic: 'この旋法を見る',
    xuangongQuote: '『礼記・礼運』「五声六律十二管旋相為宮」。十二律が順に宮となるのが旋宮。宮を保って主音を替えるのが同宮の転調、宮を替えるのが異宮の転調です。',
    identifyHint: '旋律に現れる音を入力し（空白またはカンマ区切り）、終止音を主音とみなします。宮–角の長三度と五つの正音から宮系統を求め、残りの偏音を確認します。',
    notes: '旋律の音', final: '終止音', auto: '自動（最後の音）', analyze: '判別',
    errors: {
      'too-few-notes': '異なる音を三つ以上入力してください。', 'bad-final': '終止音を認識できません。', 'final-not-in-melody': '終止音が入力した音に含まれていません。',
      'no-gong-system': '五つの正音を含む宮系統が見つからないか、余分な音が六声・七声の偏音の組み合わせに当てはまりません。', 'final-is-pian': '終止音はどの解釈でも偏音となり、主音になれません。',
    },
    ambiguous: 'この音の組み合わせは複数の宮系統に当てはまります。旋律の骨格音の使い方から判断してください：',
    found: '判別結果', gongNote: '宮音', majorThird: '宮–角の長三度',
    tableHeads: ['階名', '別名', '種類', '移動ド度数', '宮からの距離', 'C 宮での音'],
    semitone: (n) => `${n} 半音`,
    nameRule: '正音より半音低い偏音を「変」、半音高いものを「清」と呼びます。清角は「和」、清羽はのちに「閏」と呼ばれます。',
  },
  en: {
    kicker: 'Pentatonic-based modes', title: 'Chinese modes',
    intro: 'Five principal tones — Gong, Shang, Jue, Zhi, Yu — plus the auxiliary tones Qingjue, Bianzhi, Run and Biangong form pentatonic, hexatonic and heptatonic modes. Pick a tonic and mode to see the scale, its Gong system and its colour.',
    tabs: { scale: 'Mode & scale', system: 'Gong system & Xuangong', identify: 'Identify a mode', names: 'Nine degree names' },
    tonic: 'Tonic', mode: 'Mode', type: 'Scale', play: '► Play ascending', playDown: '► Play descending', gong: 'Gong', lu: 'Lü name',
    major: 'Major colour', minor: 'Minor colour', trichords: 'Trichords', zheng: 'Principal', pian: 'Auxiliary',
    pianNote: 'Auxiliary tones colour the melody but can never be the tonic of a mode.',
    systemHint: 'The five modes that share one Gong form a Gong system: same key signature and notes, different tonics.',
    xuangong: 'Xuangong', fifthDown: '← Fifth down', fifthUp: 'Fifth up →', useTonic: 'Open this mode',
    xuangongQuote: 'Book of Rites, "Li Yun": "the five tones, six lü and twelve pipes take turns as Gong." Letting each of the twelve lü serve as Gong is Xuangong; keeping Gong and changing the tonic modulates within the Gong system, changing Gong modulates across systems.',
    identifyHint: 'Enter the notes that occur in a melody (space or comma separated); the final note is taken as the tonic. The Gong system is found from the Gong–Jue major third and the five principal tones, then the extra auxiliary tones are checked.',
    notes: 'Melody notes', final: 'Final note', auto: 'Auto (last note)', analyze: 'Identify',
    errors: {
      'too-few-notes': 'Enter at least three different notes.', 'bad-final': 'The final note is not recognised.', 'final-not-in-melody': 'The final note is not among the notes entered.',
      'no-gong-system': 'No Gong system contains all five principal tones, or the extra notes do not match a hexatonic or heptatonic set.', 'final-is-pian': 'The final note is an auxiliary tone in every reading, so it cannot be the tonic.',
    },
    ambiguous: 'These notes fit more than one Gong system; decide from how the melody uses its structural tones:',
    found: 'Result', gongNote: 'Gong', majorThird: 'Gong–Jue major third',
    tableHeads: ['Degree', 'Other name', 'Kind', 'Movable-do degree', 'Above Gong', 'In C Gong'],
    semitone: (n) => `${n} semitones`,
    nameRule: 'An auxiliary tone a semitone below a principal tone is "bian", a semitone above is "qing"; Qingjue is also called "He", and Qingyu later became "Run".',
  },
};

/** 调式名称按界面语言（modeName 支持 zh / ja / en） */
function displayModeName(built, lang) {
  return built?.name ? modeName(built.tonic, built.mode.id, built.type.id, lang) : built?.name;
}

function noteMidi(name, base = 60) {
  const parsed = parseNote(name);
  return base + (parsed ? parsed.pc : 0);
}

function noteChip(item, { tonic = false, onClick } = {}) {
  const chip = onClick ? button('mk-note', '', onClick) : el('div', 'mk-note');
  if (tonic) chip.classList.add('is-tonic');
  if (item.kind === 'pian') chip.classList.add('is-aux');
  chip.append(el('span', 'mk-note-top', item.zh), el('strong', '', item.note), el('small', '', DEGREE_LABEL[item.gongSemitones] ?? ''));
  return chip;
}

export function mountChineseModes(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  const state = { tonic: 'D', mode: 'shang', type: 'pentatonic', gong: 'C' };
  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  target.addEventListener('toolbox-stop', stop);

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));
  root.appendChild(head);
  const body = el('div', 'mk-section');
  const views = {};

  /** 试听：上行或下行（下行从高八度的主音往下走回主音） */
  function playScale(mode, descending = false) {
    stop();
    const tonicMidi = noteMidi(mode.tonic);
    const midis = [...mode.notes.map((n) => tonicMidi + n.semitones), tonicMidi + 12];
    timers = playMidiSequence(playChord, descending ? midis.reverse() : midis);
  }

  function gongSemitones(gong, note) {
    return (parseNote(note).pc - parseNote(gong).pc + 12) % 12;
  }

  // ---------- 调式音阶 ----------
  views.scale = () => {
    const wrap = el('div', 'mk-section');
    const tonic = el('select');
    TONICS.forEach((name) => tonic.appendChild(option(name)));
    tonic.value = state.tonic;
    const mode = el('select');
    MODES.forEach((item) => mode.appendChild(option(item.id, lang === 'zh' ? `${item.zh}调式` : `${item.zh} ${item.pinyin}`)));
    mode.value = state.mode;
    const type = el('select');
    SCALE_TYPES.forEach((item) => type.appendChild(option(item.id, item[lang] || item.en)));
    type.value = state.type;
    const controls = el('div', 'mk-controls');
    const result = el('div', 'mk-section');
    controls.append(field(t.tonic, tonic), field(t.mode, mode), field(t.type, type));
    wrap.append(controls, result);

    const paint = () => {
      Object.assign(state, { tonic: tonic.value, mode: mode.value, type: type.value });
      const built = buildChineseMode({ tonic: state.tonic, mode: state.mode, type: state.type });
      state.gong = built.gong;
      result.replaceChildren();
      const summary = el('div', 'mk-summary');
      summary.append(el('strong', '', displayModeName(built, lang)));
      summary.appendChild(el('span', `mk-badge ${built.mode.color === 'major' ? 'is-accent' : 'is-brass'}`, t[built.mode.color]));
      summary.appendChild(el('span', 'mk-meta', `${t.gong} ${built.gong}（${luName(built.gong)}${lang === 'zh' ? '宫' : ''}）· ${t.trichords} ${built.mode.trichords}`));
      const notes = el('div', 'mk-notes');
      built.notes.forEach((item) => {
        const chipItem = { ...item, gongSemitones: gongSemitones(built.gong, item.note) };
        notes.appendChild(noteChip(chipItem, { tonic: item.id === built.mode.id, onClick: () => playChord([440 * 2 ** ((noteMidi(built.tonic) + item.semitones - 69) / 12)], 0.8) }));
      });
      // 五线谱：音名沿用按音级拼写的结果（例如 D 羽调式中的 F#、C#），末尾加高八度主音
      const tonicMidi = noteMidi(built.tonic);
      const scaleMidis = [...built.notes.map((item) => tonicMidi + item.semitones), tonicMidi + 12];
      const staff = el('div', 'mk-staff-scroll');
      staff.appendChild(renderScaleStaff([...built.notes.map((item) => item.note), built.notes[0].note], scaleMidis, {
        ariaLabel: displayModeName(built, lang),
        onNote: (index) => playChord([440 * 2 ** ((scaleMidis[index] - 69) / 12)], 0.8),
      }));
      const actions = el('div', 'mk-actions');
      actions.append(button('btn btn-primary btn-sm', t.play, () => playScale(built)), button('btn btn-secondary btn-sm', t.playDown, () => playScale(built, true)));
      const description = el('p', 'mk-hint', built.mode.note[lang] || built.mode.note.en);
      description.appendChild(cite(SOURCES, 'sccm-ethnic-modes'));
      result.append(summary, notes, staff, actions, description);
      if (built.type.count > 5) {
        const pian = el('p', 'mk-callout', t.pianNote);
        pian.appendChild(cite(SOURCES, 'sccm-ethnic-modes'));
        result.appendChild(pian);
      }
    };
    [tonic, mode, type].forEach((control) => control.addEventListener('change', paint));
    paint();
    return wrap;
  };

  // ---------- 同宫系统与旋宫 ----------
  views.system = () => {
    const wrap = el('div', 'mk-section');
    const gong = el('select');
    TONICS.forEach((name) => gong.appendChild(option(name, `${name}（${luName(name)}）`)));
    gong.value = TONICS.includes(state.gong) ? state.gong : simplestName(parseNote(state.gong).pc);
    const type = el('select');
    SCALE_TYPES.forEach((item) => type.appendChild(option(item.id, item[lang] || item.en)));
    type.value = state.type;
    const controls = el('div', 'mk-controls');
    const rotate = el('div', 'mk-actions');
    const result = el('div', 'mk-grid');
    const quote = el('p', 'mk-quote', t.xuangongQuote);
    quote.appendChild(cite(SOURCES, 'huain-xuangong'));
    const hint = el('p', 'mk-hint', t.systemHint);
    hint.appendChild(cite(SOURCES, 'dreampu-ethnic-modes'));
    controls.append(field(`${t.gong} · ${t.lu}`, gong), field(t.type, type), rotate);
    const step = (fifths) => {
      const next = rotateGong(gong.value, fifths);
      const pc = parseNote(next).pc;
      gong.value = TONICS.includes(next) ? next : simplestName(pc);
      paint();
    };
    rotate.append(button('btn btn-secondary btn-sm', t.fifthDown, () => step(-1)), button('btn btn-secondary btn-sm', t.fifthUp, () => step(1)));
    wrap.append(hint, controls, result, quote);

    function paint() {
      state.gong = gong.value;
      result.replaceChildren();
      sameGongSystem(gong.value, type.value).forEach((built) => {
        const card = el('div', 'mk-card');
        if (built.mode.id === state.mode && built.tonic === state.tonic) card.classList.add('is-current');
        const cardHead = el('div', 'mk-card-head');
        cardHead.append(el('strong', '', displayModeName(built, lang)), el('span', `mk-badge ${built.mode.color === 'major' ? 'is-accent' : 'is-brass'}`, t[built.mode.color]));
        const notes = el('div', 'mk-notes');
        built.notes.forEach((item) => notes.appendChild(el('span', `mk-badge${item.id === built.mode.id ? ' is-brass' : ''}`, `${item.note} ${item.zh}`)));
        const actions = el('div', 'mk-actions');
        actions.append(
          button('btn btn-secondary btn-sm', t.play, () => playScale(built)),
          button('btn btn-ghost btn-sm', t.playDown, () => playScale(built, true)),
          button('btn btn-ghost btn-sm', t.useTonic, () => {
            Object.assign(state, { tonic: TONICS.includes(built.tonic) ? built.tonic : simplestName(parseNote(built.tonic).pc), mode: built.mode.id, type: type.value });
            navigation.select('scale');
          }),
        );
        card.append(cardHead, notes, actions);
        result.appendChild(card);
      });
    }
    gong.addEventListener('change', paint);
    type.addEventListener('change', () => { state.type = type.value; paint(); });
    paint();
    return wrap;
  };

  // ---------- 调式识别 ----------
  views.identify = () => {
    const wrap = el('div', 'mk-section');
    const hint = el('p', 'mk-hint', t.identifyHint);
    hint.append(cite(SOURCES, 'sccm-ethnic-modes'), cite(SOURCES, 'helvting-scales'));
    const input = el('input');
    input.type = 'text';
    input.value = 'D E G A C D';
    input.spellcheck = false;
    const final = el('select');
    const result = el('div', 'mk-section');
    const controls = el('div', 'mk-controls');
    const run = button('btn btn-primary', t.analyze, analyze);
    controls.append(field(t.notes, input, 'mk-grow'), field(t.final, final), run);
    wrap.append(hint, controls, result);

    const tokens = () => input.value.split(/[\s,，、]+/).filter(Boolean);
    function refreshFinal() {
      const current = final.value;
      final.replaceChildren(option('', t.auto));
      [...new Set(tokens())].filter((name) => parseNote(name)).forEach((name) => final.appendChild(option(name)));
      if ([...final.options].some((item) => item.value === current)) final.value = current;
    }
    function describe(candidate) {
      const card = el('div', 'mk-card');
      const built = buildChineseMode({ gong: candidate.gong, mode: candidate.tonicJie, type: candidate.type });
      const cardHead = el('div', 'mk-card-head');
      cardHead.append(el('strong', '', displayModeName(built, lang)), el('span', 'mk-badge', `${t.gongNote} ${built.gong}`));
      const third = el('p', '', `${t.majorThird}: ${built.gong} – ${buildChineseMode({ gong: built.gong, mode: 'jue' }).tonic}`);
      const notes = el('div', 'mk-notes');
      built.notes.forEach((item) => notes.appendChild(el('span', `mk-badge${item.kind === 'pian' ? ' is-brass' : ''}`, `${item.note} ${item.zh}`)));
      const playRow = el('div', 'mk-actions');
      playRow.append(button('btn btn-secondary btn-sm', t.play, () => playScale(built)), button('btn btn-ghost btn-sm', t.playDown, () => playScale(built, true)));
      card.append(cardHead, third, notes, playRow);
      return card;
    }
    function analyze() {
      const names = tokens();
      const analysis = identifyChineseMode(names, final.value || names[names.length - 1]);
      result.replaceChildren();
      if (analysis.error) {
        result.appendChild(el('p', 'mk-callout is-error', t.errors[analysis.error]));
        return;
      }
      if (analysis.ambiguous) result.appendChild(el('p', 'mk-callout', t.ambiguous));
      const grid = el('div', 'mk-grid');
      (analysis.result ? [analysis.result] : analysis.candidates).forEach((candidate) => grid.appendChild(describe(candidate)));
      result.appendChild(grid);
    }
    input.addEventListener('input', refreshFinal);
    input.addEventListener('keydown', (event) => { if (event.key === 'Enter') analyze(); });
    refreshFinal();
    analyze();
    return wrap;
  };

  // ---------- 九声阶名 ----------
  views.names = () => {
    const wrap = el('div', 'mk-section');
    const rule = el('p', 'mk-hint', t.nameRule);
    rule.append(cite(SOURCES, 'sccm-ethnic-modes'), cite(SOURCES, 'tcpc-biangong'));
    const tableWrap = el('div', 'mk-table-wrap');
    const table = el('table', 'mk-table');
    const headRow = el('tr');
    t.tableHeads.forEach((text) => headRow.appendChild(el('th', '', text)));
    const thead = el('thead');
    thead.appendChild(headRow);
    const tbody = el('tbody');
    JIE_MING.forEach((item) => {
      const row = el('tr');
      const name = jieMingNote('C', item.id);
      row.append(
        el('td', 'mk-strong', item.zh),
        el('td', '', item.alias || '—'),
        el('td', '', item.kind === 'zheng' ? t.zheng : t.pian),
        el('td', '', DEGREE_LABEL[item.semitones]),
        el('td', '', t.semitone(item.semitones)),
        el('td', 'mk-strong', name),
      );
      row.tabIndex = 0;
      row.addEventListener('click', () => playChord([440 * 2 ** ((60 + item.semitones - 69) / 12)], 0.8));
      tbody.appendChild(row);
    });
    table.append(thead, tbody);
    tableWrap.appendChild(table);
    const lu = el('p', 'mk-hint', `${t.lu}: ${SHI_ER_LU.map((name, index) => `${name} ${simplestName(index, false)}`).join(' · ')}`);
    lu.appendChild(cite(SOURCES, 'zhwiki-shierlu'));
    wrap.append(rule, tableWrap, lu);
    return wrap;
  };

  const navigation = tabs(root, Object.entries(t.tabs).map(([id, label]) => ({ id, label })), (id) => {
    stop();
    body.replaceChildren(views[id]());
  });
  root.append(body, relatedLinks(['world', 'circle']), sourcesFooter(SOURCES));
  target.appendChild(root);
  navigation.select('scale');
}

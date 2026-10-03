// 移调乐器与音域界面：实音 ↔ 书写音换算、调号换算、乐器一览与音域检查
// 数据与出处见 instruments.js：ref:wiki-transposing-list ref:wiki-transposing ref:ibmt-transposition ref:wiki-pitch-ranges
// 延伸阅读（书写音域表，IBMT 12a 推荐）：ref:octatone-ranges
import {
  INSTRUMENTS, instrumentById, transpositionInterval, concertToWritten, writtenToConcert, writtenKey, enharmonicKey,
  soundingRange, writtenRange, instrumentsFor,
} from './instruments.js';
import { parsePitch, simplestName } from './pitch_spelling.js';
import { el, button, option, field, language, sourcesFooter, cite, tabs, midiToFrequency, relatedLinks } from './module_kit.js';

const SOURCES = ['wiki-transposing-list', 'wiki-transposing', 'ibmt-transposition', 'wiki-pitch-ranges', 'octatone-ranges'];

const NAMES = {
  piccolo: ['短笛', 'ピッコロ', 'Piccolo'], flute: ['长笛', 'フルート', 'Flute'], 'alto-flute': ['中音长笛', 'アルト・フルート', 'Alto flute'],
  'bass-flute': ['低音长笛', 'バス・フルート', 'Bass flute'], oboe: ['双簧管', 'オーボエ', 'Oboe'], 'oboe-damore': ['柔音双簧管', 'オーボエ・ダモーレ', 'Oboe d’amore'],
  'cor-anglais': ['英国管', 'イングリッシュ・ホルン', 'Cor anglais'], 'clarinet-eb': ['降 E 调单簧管', 'E♭ クラリネット', 'E♭ clarinet'],
  'clarinet-bb': ['降 B 调单簧管', 'B♭ クラリネット', 'B♭ clarinet'], 'clarinet-a': ['A 调单簧管', 'A クラリネット', 'A clarinet'],
  'bass-clarinet': ['低音单簧管', 'バス・クラリネット', 'Bass clarinet'], bassoon: ['大管', 'ファゴット', 'Bassoon'], contrabassoon: ['低音大管', 'コントラファゴット', 'Contrabassoon'],
  'sax-soprano': ['高音萨克斯', 'ソプラノ・サックス', 'Soprano saxophone'], 'sax-alto': ['中音萨克斯', 'アルト・サックス', 'Alto saxophone'],
  'sax-tenor': ['次中音萨克斯', 'テナー・サックス', 'Tenor saxophone'], 'sax-baritone': ['上低音萨克斯', 'バリトン・サックス', 'Baritone saxophone'],
  horn: ['圆号', 'ホルン', 'Horn'], 'trumpet-bb': ['降 B 调小号', 'B♭ トランペット', 'B♭ trumpet'], 'trumpet-d': ['D 调小号', 'D トランペット', 'D trumpet'],
  'trumpet-eb': ['降 E 调小号', 'E♭ トランペット', 'E♭ trumpet'], 'piccolo-trumpet': ['短小号', 'ピッコロ・トランペット', 'Piccolo trumpet'],
  cornet: ['短号', 'コルネット', 'Cornet'], flugelhorn: ['富鲁格号', 'フリューゲルホルン', 'Flugelhorn'], trombone: ['长号', 'トロンボーン', 'Trombone'],
  'bass-trombone': ['低音长号', 'バス・トロンボーン', 'Bass trombone'], euphonium: ['上低音号', 'ユーフォニアム', 'Euphonium'], tuba: ['大号', 'チューバ', 'Tuba'],
  violin: ['小提琴', 'ヴァイオリン', 'Violin'], viola: ['中提琴', 'ヴィオラ', 'Viola'], cello: ['大提琴', 'チェロ', 'Cello'],
  'double-bass': ['低音提琴', 'コントラバス', 'Double bass'], harp: ['竖琴', 'ハープ', 'Harp'], guitar: ['吉他', 'ギター', 'Guitar'],
  'bass-guitar': ['贝斯', 'ベース・ギター', 'Bass guitar'], piano: ['钢琴', 'ピアノ', 'Piano'], celesta: ['钢片琴', 'チェレスタ', 'Celesta'],
  xylophone: ['木琴', 'シロフォン', 'Xylophone'], glockenspiel: ['钟琴', 'グロッケンシュピール', 'Glockenspiel'],
  'voice-soprano': ['女高音', 'ソプラノ', 'Soprano'], 'voice-mezzo': ['女中音', 'メゾソプラノ', 'Mezzo-soprano'], 'voice-alto': ['女低音', 'アルト', 'Alto'],
  'voice-tenor': ['男高音', 'テノール', 'Tenor'], 'voice-baritone': ['男中音', 'バリトン', 'Baritone'], 'voice-bass': ['男低音', 'バス', 'Bass'],
};
const LANG_INDEX = { zh: 0, ja: 1, en: 2 };
const CONCERT_KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];

const TEXT = {
  zh: {
    kicker: '配器', title: '移调乐器与音域',
    intro: '移调乐器的乐谱不按实音书写：例如降 B 调单簧管奏出书写的 C 时，实际发出降 B。这里在实音与书写音之间换算（保持正确的音名拼写），换算调号，并查看各乐器的大致音域。',
    tabs: { convert: '移调换算', list: '乐器一览', check: '音域检查' },
    instrument: '乐器', direction: '方向', toWritten: '实音 → 书写音', toConcert: '书写音 → 实音', notes: '音（带八度，如 C4 E4 G4）',
    concertKey: '实音调（大调）', writtenKey: '书写调', sharps: (n) => (n > 0 ? `${n} 个升号` : n < 0 ? `${-n} 个降号` : '无升降号'),
    enharmonic: (name) => `超过 7 个升降号，可改用等音调 ${name}`, play: '► 试听实音', badNote: (n) => `无法识别：${n}`,
    outOfRange: '超出大致音域', writes: (w, s) => `书写 ${w} → 实音 ${s}`,
    rule: '实音换成书写音时，按同一音程反方向移调。',
    head: ['乐器', '书写 C4 实际发出', '移调音程', '实音大致音域', '书写大致音域', ''],
    families: { woodwind: '木管', saxophone: '萨克斯', brass: '铜管', strings: '弦乐与弹拨', keyboard: '键盘与打击', voice: '人声' },
    down: '↓', up: '↑', none: '不移调',
    rangeNote: '音域取自维基百科的音域图，只精确到自然音，并可能包含扩展音域；实际音域因乐器构造与演奏者而异。编写具体声部时请参考 BJ Brooks 的书写音域表并咨询演奏者。',
    notesById: {
      trombone: '长号以 B♭ 为基音，但按实音记谱；英式铜管乐队中次中音长号按 B♭ 移调记谱。',
      euphonium: '低音谱表按实音记谱；用高音谱表记谱时，书写 C4 实际发出 B♭2。',
    },
    checkHint: '输入一段旋律的实音，列出音域能覆盖它的乐器。', melody: '实音旋律', check: '检查', fits: (n) => `${n} 种乐器可以演奏这段音域：`, none: '没有乐器的大致音域能覆盖这段旋律。',
    span: (lo, hi) => `音域 ${lo} – ${hi}`,
  },
  ja: {
    kicker: '管弦楽法', title: '移調楽器と音域',
    intro: '移調楽器の楽譜は実音で書かれません。たとえば B♭ クラリネットが記譜上の C を吹くと実際には B♭ が鳴ります。実音と記譜音を（正しい綴りで）換算し、調号を換算し、各楽器のおおよその音域を確認します。',
    tabs: { convert: '移調換算', list: '楽器一覧', check: '音域チェック' },
    instrument: '楽器', direction: '方向', toWritten: '実音 → 記譜音', toConcert: '記譜音 → 実音', notes: '音（オクターヴ付き、例 C4 E4 G4）',
    concertKey: '実音の調（長調）', writtenKey: '記譜上の調', sharps: (n) => (n > 0 ? `シャープ ${n} 個` : n < 0 ? `フラット ${-n} 個` : '調号なし'),
    enharmonic: (name) => `調号が 7 個を超えるため、異名同音の ${name} も使えます`, play: '► 実音で試聴', badNote: (n) => `認識できません：${n}`,
    outOfRange: 'おおよその音域外', writes: (w, s) => `記譜 ${w} → 実音 ${s}`,
    rule: '実音から記譜音へは、同じ音程を逆方向に移します。',
    head: ['楽器', '記譜 C4 の実音', '移調音程', '実音のおおよその音域', '記譜上のおおよその音域', ''],
    families: { woodwind: '木管', saxophone: 'サクソフォーン', brass: '金管', strings: '弦・撥弦', keyboard: '鍵盤・打楽器', voice: '声' },
    down: '↓', up: '↑', none: '移調なし',
    rangeNote: '音域はウィキペディアの音域図によるもので、幹音単位の近似であり、拡張音域を含む場合があります。実際の音域は楽器の構造や奏者で異なります。パートを書くときは BJ Brooks の記譜音域表を参照し、奏者に相談してください。',
    notesById: {
      trombone: 'トロンボーンは B♭ 管ですが実音で記譜します。英国式ブラスバンドではテナー・トロンボーンを B♭ の移調楽器として扱います。',
      euphonium: 'ヘ音記号では実音記譜。ト音記号で書く場合、記譜 C4 は実音 B♭2 です。',
    },
    checkHint: '旋律を実音で入力すると、その音域をカバーできる楽器を挙げます。', melody: '実音の旋律', check: 'チェック', fits: (n) => `${n} 種類の楽器がこの音域を演奏できます：`, none: 'この旋律をカバーできる楽器はありません。',
    span: (lo, hi) => `音域 ${lo} – ${hi}`,
  },
  en: {
    kicker: 'Orchestration', title: 'Transposing instruments & ranges',
    intro: 'Parts for transposing instruments are not written at concert pitch: a written C on the B♭ clarinet sounds B♭. Convert between concert and written pitch with correct spelling, convert key signatures, and look up approximate ranges.',
    tabs: { convert: 'Transpose', list: 'Instruments', check: 'Range check' },
    instrument: 'Instrument', direction: 'Direction', toWritten: 'Concert → written', toConcert: 'Written → concert', notes: 'Notes with octave (e.g. C4 E4 G4)',
    concertKey: 'Concert key (major)', writtenKey: 'Written key', sharps: (n) => (n > 0 ? `${n} sharp${n > 1 ? 's' : ''}` : n < 0 ? `${-n} flat${n < -1 ? 's' : ''}` : 'no sharps or flats'),
    enharmonic: (name) => `More than 7 accidentals — the enharmonic key ${name} can be used`, play: '► Play concert pitch', badNote: (n) => `Not recognized: ${n}`,
    outOfRange: 'outside the approximate range', writes: (w, s) => `written ${w} → concert ${s}`,
    rule: 'To go from concert to written pitch, transpose by the same interval in the opposite direction.',
    head: ['Instrument', 'Written C4 sounds', 'Transposition', 'Approx. sounding range', 'Approx. written range', ''],
    families: { woodwind: 'Woodwinds', saxophone: 'Saxophones', brass: 'Brass', strings: 'Strings & plucked', keyboard: 'Keyboard & percussion', voice: 'Voices' },
    down: '↓', up: '↑', none: 'non-transposing',
    rangeNote: 'Ranges come from Wikipedia’s range chart, which resolves only to natural notes and may include extended ranges; real ranges vary with instrument and player. When writing parts, consult BJ Brooks’s written-range sheet and a performer.',
    notesById: {
      trombone: 'The trombone is pitched in B♭ but reads at concert pitch; British brass bands treat the tenor trombone as a B♭ transposing instrument.',
      euphonium: 'Concert pitch in bass clef; in treble clef a written C4 sounds B♭2.',
    },
    checkHint: 'Enter a melody at concert pitch to list the instruments whose range covers it.', melody: 'Concert-pitch melody', check: 'Check', fits: (n) => `${n} instruments cover this range:`, none: 'No instrument’s approximate range covers this melody.',
    span: (lo, hi) => `range ${lo} – ${hi}`,
  },
};

const midiName = (midi) => `${simplestName(midi % 12, false)}${Math.floor(midi / 12) - 1}`;
const pretty = (name) => name.replace(/#/g, '♯').replace(/b(?=-?\d|$)/g, '♭').replace(/([A-G])b/g, '$1♭');

export function mountInstruments(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  const nameOf = (id) => NAMES[id][LANG_INDEX[lang]];
  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  target.addEventListener('toolbox-stop', stop);
  const instrumentSelect = (value) => {
    const select = el('select');
    Object.keys(t.families).forEach((family) => {
      const group = el('optgroup');
      group.label = t.families[family];
      INSTRUMENTS.filter((item) => item.family === family).forEach((item) => group.appendChild(option(item.id, nameOf(item.id))));
      select.appendChild(group);
    });
    select.value = value;
    return select;
  };
  const intervalText = (id) => {
    const interval = transpositionInterval(id);
    return interval.direction === 'none' ? t.none : `${t[interval.direction]} ${interval.name}`;
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
  /** 在钢琴 88 键（A0–C8）上画出音域条 */
  const rangeBar = (range) => {
    const bar = el('div', 'inst-range');
    if (!range) return bar;
    const fill = el('span');
    fill.style.left = `${((range[0] - 21) / 87) * 100}%`;
    fill.style.width = `${((range[1] - range[0]) / 87) * 100}%`;
    bar.appendChild(fill);
    return bar;
  };

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));
  root.appendChild(head);
  const body = el('div', 'mk-section');
  const views = {};

  views.convert = () => {
    const wrap = el('div', 'mk-section');
    const instrument = instrumentSelect('clarinet-bb');
    const direction = el('select');
    direction.append(option('written', t.toWritten), option('concert', t.toConcert));
    const notes = el('input');
    notes.type = 'text';
    notes.value = 'C4 E4 G4 Bb4';
    const keySelect = el('select');
    CONCERT_KEYS.forEach((key) => keySelect.appendChild(option(key, pretty(key))));
    keySelect.value = 'Eb';
    const controls = el('div', 'mk-controls');
    controls.append(field(t.instrument, instrument), field(t.direction, direction), field(t.notes, notes), field(t.concertKey, keySelect));
    const result = el('div', 'mk-section');
    const rule = el('p', 'mk-hint', t.rule);
    rule.appendChild(cite(SOURCES, 'ibmt-transposition'));
    wrap.append(controls, result, rule);

    function paint() {
      stop();
      result.replaceChildren();
      const id = instrument.value;
      const summary = el('p', 'mk-hint', `${nameOf(id)} · ${t.writes('C4', pretty(instrumentById(id).sounds))} · ${intervalText(id)}`);
      summary.appendChild(cite(SOURCES, 'wiki-transposing-list'));
      if (t.notesById[id]) summary.append(` ${t.notesById[id]}`, cite(SOURCES, 'wiki-transposing'));
      result.appendChild(summary);

      const key = writtenKey(id, keySelect.value);
      const keyLine = el('div', 'mk-actions');
      keyLine.appendChild(el('span', 'mk-badge is-accent', `${t.concertKey}: ${pretty(keySelect.value)} → ${t.writtenKey}: ${pretty(key.tonic)} (${t.sharps(key.fifths)})`));
      const alternative = enharmonicKey(key.tonic);
      if (alternative) keyLine.appendChild(el('span', 'mk-badge is-brass', t.enharmonic(pretty(alternative))));
      result.appendChild(keyLine);

      const row = el('div', 'mk-notes');
      const concertMidis = [];
      const sounding = soundingRange(id);
      notes.value.split(/[\s,]+/).filter(Boolean).forEach((token) => {
        const input = parsePitch(token);
        const converted = input && (direction.value === 'written' ? concertToWritten(id, input) : writtenToConcert(id, input));
        if (!converted) { row.appendChild(el('p', 'mk-callout is-error', t.badNote(token))); return; }
        const concert = direction.value === 'written' ? input : converted;
        const written = direction.value === 'written' ? converted : input;
        concertMidis.push(concert.midi);
        const outside = sounding && (concert.midi < sounding[0] || concert.midi > sounding[1]);
        const chip = el('div', `mk-note${outside ? ' is-aux' : ''}`);
        chip.append(el('span', 'mk-note-top', pretty(input.name)), el('strong', '', pretty(converted.name)), el('small', '', outside ? t.outOfRange : t.writes(pretty(written.name), pretty(concert.name))));
        chip.tabIndex = 0;
        chip.addEventListener('click', () => playChord([midiToFrequency(concert.midi)], 0.9));
        row.appendChild(chip);
      });
      result.appendChild(row);
      const actions = el('div', 'mk-actions');
      actions.appendChild(button('btn btn-primary btn-sm', t.play, () => {
        stop();
        concertMidis.forEach((midi, index) => timers.push(setTimeout(() => playChord([midiToFrequency(midi)], 0.5, { interrupt: index === 0 }), index * 380)));
      }));
      result.appendChild(actions);
    }
    [instrument, direction, keySelect].forEach((node) => node.addEventListener('change', paint));
    notes.addEventListener('input', paint);
    paint();
    return wrap;
  };

  views.list = () => {
    const wrap = el('div', 'mk-section');
    const note = el('p', 'mk-callout', t.rangeNote);
    note.append(cite(SOURCES, 'wiki-pitch-ranges'), cite(SOURCES, 'octatone-ranges'));
    const rows = INSTRUMENTS.map((item) => {
      const sounding = soundingRange(item.id);
      const written = writtenRange(item.id);
      const name = el('td', 'mk-strong', nameOf(item.id));
      const bar = el('td');
      bar.appendChild(rangeBar(sounding));
      if (sounding) {
        bar.appendChild(button('btn btn-ghost btn-sm', '►', () => {
          stop();
          sounding.forEach((midi, index) => timers.push(setTimeout(() => playChord([midiToFrequency(midi)], 0.8, { interrupt: index === 0 }), index * 700)));
        }));
      }
      return [
        name, pretty(item.sounds), intervalText(item.id),
        sounding ? `≈ ${pretty(midiName(sounding[0]))} – ${pretty(midiName(sounding[1]))}` : '—',
        written ? `≈ ${pretty(midiName(written[0]))} – ${pretty(midiName(written[1]))}` : '—',
        bar,
      ];
    });
    const hint = el('p', 'mk-hint', t.rule);
    hint.append(cite(SOURCES, 'wiki-transposing-list'), cite(SOURCES, 'ibmt-transposition'));
    wrap.append(hint, table(t.head, rows), note);
    return wrap;
  };

  views.check = () => {
    const wrap = el('div', 'mk-section');
    const input = el('input');
    input.type = 'text';
    input.value = 'D4 F#4 A4 D5 E5';
    const controls = el('div', 'mk-controls');
    controls.appendChild(field(t.melody, input));
    const result = el('div', 'mk-section');
    const hint = el('p', 'mk-hint', t.checkHint);
    hint.appendChild(cite(SOURCES, 'wiki-pitch-ranges'));
    wrap.append(hint, controls, result);
    function paint() {
      result.replaceChildren();
      const pitches = input.value.split(/[\s,]+/).filter(Boolean).map((token) => [token, parsePitch(token)]);
      const bad = pitches.filter(([, pitch]) => !pitch).map(([token]) => token);
      if (bad.length) { result.appendChild(el('p', 'mk-callout is-error', t.badNote(bad.join(' ')))); return; }
      if (!pitches.length) return;
      const midis = pitches.map(([, pitch]) => pitch.midi);
      result.appendChild(el('p', 'mk-hint', t.span(pretty(midiName(Math.min(...midis))), pretty(midiName(Math.max(...midis))))));
      const ids = instrumentsFor(midis);
      if (!ids.length) { result.appendChild(el('p', 'mk-callout', t.none)); return; }
      result.appendChild(el('p', 'mk-hint', t.fits(ids.length)));
      const list = el('div', 'mk-actions');
      ids.forEach((id) => list.appendChild(el('span', 'mk-badge', nameOf(id))));
      result.appendChild(list);
    }
    input.addEventListener('input', paint);
    paint();
    return wrap;
  };

  const navigation = tabs(root, Object.entries(t.tabs).map(([id, label]) => ({ id, label })), (id) => {
    stop();
    body.replaceChildren(views[id]());
  });
  root.append(body, relatedLinks(['fretboard', 'harmonize', 'circle']), sourcesFooter(SOURCES));
  target.appendChild(root);
  navigation.select('convert');
}

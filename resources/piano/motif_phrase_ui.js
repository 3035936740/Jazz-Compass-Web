// 曲式结构面板里的"动机发展与乐句结构"：输入一个动机 → 模进 倒影 逆行 扩大 紧缩 节奏变化 加装饰 → A/B 对照 → 拼成乐句；
// 乐句型 / 乐段一键生成并标出 基本乐思 重复 碎片化 对比乐思 终止；扩充（重复 拉长 再来一次 后缀）前后对照
// 逻辑与依据见 motif_phrase.js（ref:omt2e-form-concepts ref:omt2e-phrase ref:omt2e-phrase-expansion）
import { keyInfo, parseMotif, TRANSFORMS, TRANSFORM_IDS, buildPhrase, expandPhrase, phraseBars, phraseEvents, totalBeats, spellNote } from './motif_phrase.js';
import { parseRoman, realize } from './prog_library.js';
import { melodyStaff } from './tool_staff.js';
import { el, button, option, field, language, midiToFrequency } from './module_kit.js';

const TEXT = {
  zh: {
    title: '动机发展与乐句结构', intro: '先写一个短小的动机（音名加时值 如 C4:q D4:e E4:e G4:h r:q） 用不同手法变化它 听前后对照 再把它们拼成乐句；也可以一键生成乐句型或乐段 看清楚每一段在做什么',
    motif: '动机', key: '调', presets: '示例', play: '► 听', ab: 'A/B 对照', stop: '■ 停止', bad: '读不懂这个动机 写法如 C4:q D4:e E4:e G4:h（w 全 h 二分 q 四分 e 八分 s 十六分 加 . 是附点 r 是休止）',
    transforms: { sequence: '模进（上移一级）', inversion: '倒影', retrograde: '逆行', augmentation: '扩大（时值加倍）', diminution: '紧缩（时值减半）', displacement: '移位（晚半拍）', intervals: '音程扩大', rhythm: '节奏变化（附点）', embellish: '加装饰音', fragment: '碎片化（取前一半）' },
    why: {
      sequence: '同一个动机整体沿音阶上移一级 轮廓不变', inversion: '以第一个音为轴 上行变下行 下行变上行', retrograde: '从最后一个音倒着唱回来', augmentation: '音高不变 时值全部加倍', diminution: '音高不变 时值全部减半',
      displacement: '整体晚半拍出现 重音落点改变', intervals: '方向不变 每个音程扩大一级', rhythm: '两个等长的音改成附点长短', embellish: '三度之间填经过音 同音之间加上邻音', fragment: '只留下前一半 常用在展开部分',
    },
    a: 'A 原动机', b: 'B 变化后', addA: '把 A 加进乐句', addB: '把 B 加进乐句', assembly: '自己拼的乐句', clear: '清空', empty: '还没有加入任何片段',
    phrase: '一键生成乐句', type: '类型', types: { sentence: '乐句型（呈示 + 展开）', period: '乐段（前句 + 后句）' }, expand: '扩充', expands: { none: '不扩充', repetition: '重复一个单位', stretch: '拉长终止乐思', omt: '再来一次（先回避终止）', suffix: '终止后加后缀' },
    build: '生成', bars: (n) => `${n} 小节`, compare: (a, b) => `${a} 对照 ${b}`, antecedent: '前句', consequent: '后句', original: '原样', expanded: '扩充后',
    cadence: { HC: '半终止', PAC: '完全正格终止', evaded: '终止被回避' }, harmony: '带和声',
    beatsWord: '拍', restWord: '休', majorWord: '大调', minorWord: '小调',
  },
  en: {
    title: 'Motif development & phrase structure', intro: 'Write a short motif (note + duration, e.g. C4:q D4:e E4:e G4:h r:q), transform it, compare before and after, then assemble a phrase — or generate a sentence or period and see what each part does.',
    motif: 'Motif', key: 'Key', presets: 'Examples', play: '► Play', ab: 'A/B', stop: '■ Stop', bad: 'Could not read the motif — write e.g. C4:q D4:e E4:e G4:h (w h q e s, a trailing . for dotted, r for a rest)',
    transforms: { sequence: 'sequence (up a step)', inversion: 'inversion', retrograde: 'retrograde', augmentation: 'augmentation (×2)', diminution: 'diminution (÷2)', displacement: 'displacement (½ beat later)', intervals: 'wider intervals', rhythm: 'rhythmic variation (dotted)', embellish: 'embellishment', fragment: 'fragment (first half)' },
    why: {
      sequence: 'the whole motif moves up one scale step; the contour stays', inversion: 'mirrored around the first note: up becomes down', retrograde: 'sung backwards from the last note', augmentation: 'same pitches, durations doubled', diminution: 'same pitches, durations halved',
      displacement: 'starts half a beat later, so the accents move', intervals: 'same directions, each interval one step wider', rhythm: 'pairs of equal notes become long-short', embellish: 'passing tones fill thirds, neighbours decorate repeated notes', fragment: 'only the first half — typical of a continuation',
    },
    a: 'A original', b: 'B transformed', addA: 'Add A to the phrase', addB: 'Add B to the phrase', assembly: 'Your phrase', clear: 'Clear', empty: 'Nothing added yet',
    phrase: 'Generate a phrase', type: 'Type', types: { sentence: 'sentence (presentation + continuation)', period: 'period (antecedent + consequent)' }, expand: 'Expansion', expands: { none: 'none', repetition: 'repeat a unit', stretch: 'stretch the cadential idea', omt: 'one more time (evade first)', suffix: 'post-cadential suffix' },
    build: 'Generate', bars: (n) => `${n} bars`, compare: (a, b) => `${a} vs ${b}`, antecedent: 'antecedent', consequent: 'consequent', original: 'original', expanded: 'expanded',
    cadence: { HC: 'half cadence', PAC: 'perfect authentic cadence', evaded: 'evaded cadence' }, harmony: 'with harmony',
    beatsWord: 'beats', restWord: 'rest', majorWord: 'major', minorWord: 'minor',
  },
};
TEXT.ja = {
    title: '動機の展開とフレーズ構造', intro: '短い動機（音名と音価、例 C4:q D4:e E4:e G4:h r:q）を書き、いろいろな方法で変化させ、前後を聴き比べてからフレーズに組み立てる。楽節型や楽段を一度に作り、それぞれの部分の役割を確かめることもできる',
    motif: '動機', key: '調', presets: '例', play: '► 聴く', ab: 'A/B 比較', stop: '■ 停止', bad: '動機が読めない。書き方の例 C4:q D4:e E4:e G4:h（w 全 h 2 分 q 4 分 e 8 分 s 16 分、. で付点、r は休符）',
    transforms: { sequence: '反復進行（1 度上へ）', inversion: '反行', retrograde: '逆行', augmentation: '拡大（音価 2 倍）', diminution: '縮小（音価半分）', displacement: '移動（半拍遅れ）', intervals: '音程を広げる', rhythm: 'リズムの変化（付点）', embellish: '装飾音を加える', fragment: '断片化（前半だけ）' },
    why: {
      sequence: '動機全体を音階に沿って 1 度上へ。輪郭は同じ', inversion: '最初の音を軸に、上行は下行に、下行は上行に', retrograde: '最後の音から逆に歌う', augmentation: '音高は同じで音価をすべて 2 倍に', diminution: '音高は同じで音価をすべて半分に',
      displacement: '全体が半拍遅れて現れ、アクセントの位置が変わる', intervals: '方向は同じで、各音程を 1 度ずつ広げる', rhythm: '同じ長さの 2 音を付点の長短に', embellish: '3 度の間に経過音、同音の間に上の隣接音', fragment: '前半だけを残す。展開部分でよく使う',
    },
    a: 'A 元の動機', b: 'B 変化後', addA: 'A をフレーズに加える', addB: 'B をフレーズに加える', assembly: '自分で組んだフレーズ', clear: 'クリア', empty: 'まだ何も加えていない',
    phrase: 'フレーズを一度に作る', type: '種類', types: { sentence: '楽節型（提示 + 展開）', period: '楽段（前楽節 + 後楽節）' }, expand: '拡大', expands: { none: '拡大しない', repetition: '単位を 1 つ繰り返す', stretch: '終止楽想を引き伸ばす', omt: 'ワンモアタイム（先に終止を回避）', suffix: '終止の後に接尾' },
    build: '作る', bars: (n) => `${n} 小節`, compare: (a, b) => `${a} 対照 ${b}`, antecedent: '前楽節', consequent: '後楽節', original: '元のまま', expanded: '拡大後',
    cadence: { HC: '半終止', PAC: '完全正格終止', evaded: '回避された終止' }, harmony: '和声つき',
    beatsWord: '拍', restWord: '休', majorWord: '長調', minorWord: '短調',
  };

const PRESETS = ['C4:q D4:q E4:q C4:q', 'E4:q G4:q E4:q C4:q', 'G4:e G4:e G4:e E4:h r:e', 'C4:h E4:q G4:q', 'A4:q B4:e C5:e E5:h'];

export function mountMotifPhrase(host, audio) {
  const lang = language();
  const t = TEXT[lang] || TEXT.en;
  const tx = (v) => (typeof v === 'string' ? v : v[lang] ?? v.en);
  const section = el('section', 'mk mp');
  const head = el('div', 'mk-head');
  head.append(el('h3', '', t.title), el('p', '', t.intro));
  const input = el('input'); input.type = 'text'; input.value = PRESETS[1]; input.spellcheck = false;
  const keySel = el('select');
  [['C', 'major'], ['G', 'major'], ['F', 'major'], ['D', 'major'], ['A', 'minor'], ['E', 'minor'], ['D', 'minor']].forEach(([k, m]) => keySel.appendChild(option(`${k}|${m}`, `${k} ${m === 'major' ? t.majorWord : t.minorWord}`)));
  const controls = el('div', 'mk-controls');
  controls.append(field(t.motif, input, 'mk-grow'), field(t.key, keySel));
  const presets = el('div', 'mk-actions');
  presets.appendChild(el('span', 'mk-meta', t.presets));
  PRESETS.forEach((p) => presets.appendChild(button('btn btn-ghost btn-sm', p, () => { input.value = p; paint(); })));
  const message = el('p', 'mk-hint');
  const tbar = el('div', 'mk-actions mp-transforms');
  const pair = el('div', 'mp-pair');
  const why = el('p', 'mk-meta');
  const assembly = el('div', 'mp-assembly');
  section.append(head, controls, presets, message, tbar, pair, why, assembly);

  // 乐句生成
  const phraseBox = el('div', 'mp-phrase');
  const typeSel = el('select'); Object.entries(t.types).forEach(([k, v]) => typeSel.appendChild(option(k, v)));
  const expSel = el('select'); Object.entries(t.expands).forEach(([k, v]) => expSel.appendChild(option(k, v)));
  const withHarmony = el('input'); withHarmony.type = 'checkbox'; withHarmony.checked = true;
  const harmLabel = el('label', 'pl-check'); harmLabel.append(withHarmony, document.createTextNode(` ${t.harmony}`));
  const pc = el('div', 'mk-controls');
  pc.append(field(t.type, typeSel), field(t.expand, expSel), harmLabel, button('btn btn-primary btn-sm', t.build, () => paintPhrase()));
  const phraseOut = el('div', 'mp-phrase-out');
  phraseBox.append(el('h4', '', t.phrase), pc, phraseOut);
  section.appendChild(phraseBox);
  host.appendChild(section);

  let key = keyInfo('C'); let motif = null; let current = 'sequence'; let parts = [];
  const realizeRoman = (roman, k) => { const c = parseRoman(roman); return c ? realize(c, k.name).tones.map((x) => x.pc) : null; };
  const playNotes = (notes, offset = 0) => {
    const events = []; let tt = offset;
    notes.forEach((n) => { if (!n.rest) events.push({ beat: tt, midi: n.midi, duration: n.beats * 0.95, velocity: 0.9, step: 0 }); tt += n.beats; });
    return { events, duration: tt };
  };
  const play = (data) => audio.play(data.events, 96, data.duration, () => {});
  const staff = (notes, labels) => melodyStaff(notes, { key, labels, play: (m) => audio.play(m.map((midi) => ({ beat: 0, midi, duration: 1, velocity: 0.9 })), 96, 1, () => {}) });

  TRANSFORM_IDS.forEach((id) => {
    const b = button('btn btn-ghost btn-sm', t.transforms[id], () => { current = id; tbar.querySelectorAll('button').forEach((x) => x.classList.toggle('is-active', x === b)); paintPair(); });
    b.dataset.id = id;
    tbar.appendChild(b);
  });

  function paint() {
    const [k, m] = keySel.value.split('|');
    key = keyInfo(k, m);
    motif = parseMotif(input.value);
    message.textContent = motif ? '' : t.bad;
    message.classList.toggle('is-error', !motif);
    tbar.querySelectorAll('button').forEach((x) => x.classList.toggle('is-active', x.dataset.id === current));
    paintPair();
    paintAssembly();
  }
  function paintPair() {
    pair.replaceChildren(); why.textContent = '';
    if (!motif) return;
    const b = TRANSFORMS[current](motif, key, 1);
    const box = (title, notes, add) => {
      const col = el('div', 'mp-col');
      const row = el('div', 'mk-actions');
      row.append(el('strong', '', title), el('span', 'mk-meta', `${totalBeats(notes)} ${t.beatsWord}`), button('btn btn-ghost btn-sm', t.play, () => play(playNotes(notes))), button('btn btn-ghost btn-sm', add.label, () => { parts.push({ label: add.name, notes }); paintAssembly(); }));
      col.append(row, staff(notes), el('p', 'mk-meta mp-names', notes.map((n) => (n.rest ? t.restWord : spellNote(n.midi, key))).join(' ')));
      return col;
    };
    pair.append(box(t.a, motif, { label: t.addA, name: 'A' }), box(t.b, b, { label: t.addB, name: t.transforms[current] }));
    const abRow = el('div', 'mk-actions');
    abRow.append(button('btn btn-primary btn-sm', t.ab, () => { const a = playNotes(motif); const bb = playNotes(b, a.duration + 1); play({ events: [...a.events, ...bb.events], duration: bb.duration }); }), button('btn btn-secondary btn-sm', t.stop, () => audio.stop()));
    pair.appendChild(abRow);
    why.textContent = t.why[current];
  }
  function paintAssembly() {
    assembly.replaceChildren();
    const row = el('div', 'mk-actions');
    row.append(el('strong', '', t.assembly), button('btn btn-ghost btn-sm', t.play, () => play(playNotes(parts.flatMap((p) => p.notes)))), button('btn btn-ghost btn-sm', t.clear, () => { parts = []; paintAssembly(); }));
    assembly.appendChild(row);
    if (!parts.length) { assembly.appendChild(el('p', 'mk-meta', t.empty)); return; }
    const labels = []; let k = 0;
    parts.forEach((p) => { labels[k] = p.label; k += p.notes.length; });
    assembly.appendChild(staff(parts.flatMap((p) => p.notes), labels));
  }

  let lastPhrase = null;
  function paintPhrase() {
    phraseOut.replaceChildren();
    if (!motif) return;
    const base = buildPhrase(motif, { type: typeSel.value, key });
    const phrase = expSel.value === 'none' ? base : expandPhrase(base, expSel.value);
    lastPhrase = phrase;
    const units = el('div', 'mp-units');
    phrase.units.forEach((u, i) => {
      const chip = button(`mp-unit${u.expanded ? ' is-expanded' : ''}`, '', () => play(phraseEvents(phrase, { harmony: withHarmony.checked, units: [u], realizeRoman })));
      chip.append(el('span', 'mk-meta', u.group ? (t[u.group] || u.group) : ''), el('strong', '', tx(u.label)), el('span', 'mk-meta', `${u.chords.map((c) => c.roman).join(' ')}${u.cadence ? ` · ${t.cadence[u.cadence]}` : ''}`));
      chip.dataset.index = String(i);
      units.appendChild(chip);
    });
    const labels = []; let k = 0;
    phrase.units.forEach((u) => { labels[k] = tx(u.label).split(' ')[0]; k += u.notes.length; });
    const actions = el('div', 'mk-actions');
    actions.append(el('span', 'mk-meta', t.bars(phraseBars(phrase))), button('btn btn-primary btn-sm', t.play, () => play(phraseEvents(phrase, { harmony: withHarmony.checked, realizeRoman }))), button('btn btn-secondary btn-sm', t.stop, () => audio.stop()));
    // A 与 A′：乐段比较前句与后句；有扩充时比较原样与扩充后
    if (phrase.type === 'period') {
      actions.appendChild(button('btn btn-ghost btn-sm', t.compare(t.antecedent, t.consequent), () => {
        const a = phraseEvents(phrase, { harmony: withHarmony.checked, units: phrase.units.filter((u) => u.group === 'antecedent'), realizeRoman });
        const b = phraseEvents(phrase, { harmony: withHarmony.checked, units: phrase.units.filter((u) => u.group === 'consequent'), realizeRoman });
        play({ events: [...a.events, ...b.events.map((e) => ({ ...e, beat: e.beat + a.duration + 1 }))], duration: a.duration + 1 + b.duration });
      }));
    }
    if (expSel.value !== 'none') {
      actions.appendChild(button('btn btn-ghost btn-sm', t.compare(t.original, t.expanded), () => {
        const a = phraseEvents(base, { harmony: withHarmony.checked, realizeRoman });
        const b = phraseEvents(phrase, { harmony: withHarmony.checked, realizeRoman });
        play({ events: [...a.events, ...b.events.map((e) => ({ ...e, beat: e.beat + a.duration + 2 }))], duration: a.duration + 2 + b.duration });
      }));
      actions.appendChild(el('span', 'mk-meta', `${t.bars(phraseBars(base))} → ${t.bars(phraseBars(phrase))}`));
    }
    phraseOut.append(units, staff(phrase.units.flatMap((u) => u.notes), labels), actions);
  }

  input.addEventListener('input', () => { clearTimeout(input.debounce); input.debounce = setTimeout(paint, 250); });
  keySel.addEventListener('change', paint);
  /** 外部（教程、链接）直接填入一个动机 */
  host.motifQuery = (q) => { input.value = q; paint(); paintPhrase(); };
  paint();
  paintPhrase();
  host.addEventListener('toolbox-stop', () => audio.stop());
  return { stop: () => audio.stop(), last: () => lastPhrase };
}

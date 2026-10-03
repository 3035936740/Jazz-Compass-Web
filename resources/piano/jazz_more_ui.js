// 爵士进阶界面：重配和声、和弦配置、bebop 语汇、曲式库
// 理论依据见 jazz_theory.js 顶部：ref:omt2e-substitutions ref:wiki-backdoor ref:wiki-coltrane ref:omt2e-jazz-voicings
//   ref:wiki-voicing ref:guitar-chord-drop ref:wiki-so-what ref:wiki-upper-structure ref:wiki-bebop-scale ref:jgl-sixth-dim
//   ref:larsen-enclosure ref:wiki-twelve-bar ref:wiki-blues-for-alice ref:wiki-rhythm-changes
import {
  parseChordSymbol, chordTones, reharmonize, sharedTritone, closePositions, dropVoicing, shellVoicings, soWhatVoicing,
  UPPER_STRUCTURES, upperStructure, BEBOP_SCALES, bebopDescent, chromaticEnclosures, sixthDiminishedHarmonization, FORMS, realizeForm, QUALITIES,
} from './jazz_theory.js';
import { parseNote, spellAbove } from './pitch_spelling.js';
import { renderStaff } from './staff_svg.js?v=20261002-fix';
import { el, button, option, field, language, midiToFrequency, sourcesFooter, cite, tabs, relatedLinks } from './module_kit.js';

const SOURCES = ['omt2e-substitutions', 'wiki-backdoor', 'wiki-coltrane', 'omt2e-jazz-voicings', 'wiki-voicing', 'guitar-chord-drop', 'wiki-so-what', 'wiki-upper-structure', 'wiki-bebop-scale', 'jgl-sixth-dim', 'larsen-enclosure', 'wiki-twelve-bar', 'wiki-blues-for-alice', 'wiki-rhythm-changes'];
const KEYS = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'G', 'D', 'A', 'E', 'B', 'F#'];
const ROOTS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

const TEXT = {
  zh: {
    kicker: '爵士进阶', title: '重配和声 · 配置 · 语汇 · 曲式',
    intro: '把一段和弦进行换成三全音替代、副属和弦、调式交替、后门进行或 Coltrane 和弦进行；查看七和弦的各种配置；练 bebop 音阶与包围音；浏览常用曲式的和弦表。',
    tabs: { reharm: '重配和声', voicing: '和弦配置', bebop: 'Bebop 语汇', forms: '曲式库' },
    key: '调（大调）', progression: '和弦进行（空格分隔）', technique: '技巧', original: '原进行', result: '重配后', play: '► 试听',
    techniques: { tritone: '三全音替代', applied: '副属替代（五度进行）', mixture: '调式交替', backdoor: '后门进行', coltrane: 'Coltrane 和弦进行' },
    notes: {
      tritone: ['任何属七和弦都可以换成相距三全音的属七，进行功能不变：两者共享同一个三全音。', 'omt2e-substitutions'],
      applied: ['按五度进行的两个和弦，可以把前一个换成同根音的属七和弦。', 'omt2e-substitutions'],
      mixture: ['从同主音小调借用：用 ii∅7 代替 ii7，给 V7 加上 ♭9。', 'omt2e-substitutions'],
      backdoor: ['把 V7–I 换成 iv7–♭VII7–I；相对于"正门" ii–V–I 而得名。', 'wiki-backdoor'],
      coltrane: ['ii–V–I 展开为相距大三度的三个调中心，每个调中心前加属七：如 C 调 Dm7 E♭7 A♭maj7 B7 Emaj7 G7 Cmaj7。', 'wiki-coltrane'],
    },
    noChange: '这一技巧在此进行中没有可替换的位置。', shared: (a, b) => `共享的三全音：原和弦 ${a.join('–')}，替代和弦 ${b.join('–')}（同音异名）`,
    chord: '和弦', closeTitle: '密集排列与 drop 2 / drop 3', close: '密集', drop2: 'drop 2', drop3: 'drop 3', inversion: ['根音在下', '三音在下', '五音在下', '七音在下'],
    shellTitle: '3–7 骨架', shellNote: ['低音为根音，上方两个声部为三音与七音，省略五音。', 'omt2e-jazz-voicings'],
    soWhatTitle: 'So What 和弦', soWhatNote: ['自下而上三个纯四度加一个大三度，作小十一和弦（1 4 ♭7 ♭3 5）。', 'wiki-so-what'],
    usTitle: '高结构三和弦', usNote: ['左手三音与七音（三全音），右手一个三和弦，构成带延伸音的属和弦。', 'wiki-upper-structure'],
    dropNote: ['drop 2 把从上往下数第二个音降低八度；drop 3 降低第三个音。', 'wiki-voicing', 'guitar-chord-drop'],
    onlyMinor: '（仅用于小七和弦）', onlyDominant: '（仅用于属七和弦）',
    scale: '音阶', root: '根音', scales: { dominant: 'Bebop 属音阶', major: 'Bebop 大调（大六度减）音阶', melodicMinor: 'Bebop 旋律小调（小六度减）音阶', harmonicMinor: 'Bebop 和声小调音阶' },
    bebopNote: ['在七声音阶中加一个经过音，使八分音符下行时和弦音落在正拍。', 'wiki-bebop-scale'], onBeat: '正拍', descent: '从根音下行的八分音符',
    enclosure: '半音包围', target: '目标音', enclosureNote: ['从上方和下方包围目标音；半音不一定要放在弱拍。', 'larsen-enclosure'],
    sixthDim: '六度减音阶的和声化', sixthDimNote: ['大六和弦与减七和弦交替（Barry Harris 的和声概念）。', 'jgl-sixth-dim'],
    form: '曲式', formNames: { 'blues-basic': '12 小节布鲁斯（基本）', 'blues-quick': '12 小节布鲁斯（quick change）', 'blues-bebop': 'Bebop 布鲁斯', 'blues-minor': '小调布鲁斯', 'blues-bird': 'Bird 布鲁斯（Blues for Alice）', 'rhythm-changes': 'Rhythm changes（AABA）' },
    playLoop: '► 播放', stop: '■ 停止', section: (s) => `${s} 段`,
  },
  ja: {
    kicker: 'ジャズ発展', title: 'リハーモナイズ・ヴォイシング・語法・フォーム',
    intro: '進行を裏コード、セカンダリー・ドミナント、モーダル・インターチェンジ、バックドア、コルトレーン・チェンジに置き換え、七の和音のヴォイシングを確かめ、ビバップ・スケールとエンクロージャーを練習し、定番フォームのコード表を見ます。',
    tabs: { reharm: 'リハーモナイズ', voicing: 'ヴォイシング', bebop: 'ビバップ語法', forms: 'フォーム' },
    key: '調（長調）', progression: 'コード進行（空白区切り）', technique: '技法', original: '元の進行', result: '置き換え後', play: '► 試聴',
    techniques: { tritone: '裏コード（トライトーン代理）', applied: 'セカンダリー・ドミナント', mixture: 'モーダル・インターチェンジ', backdoor: 'バックドア進行', coltrane: 'コルトレーン・チェンジ' },
    notes: {
      tritone: ['属七は三全音離れた属七に置き換えても機能が変わらない。両者は同じ三全音を共有する。', 'omt2e-substitutions'],
      applied: ['五度で進む二つの和音では、前の和音を同じ根音の属七に置き換えられる。', 'omt2e-substitutions'],
      mixture: ['同主短調から借用：ii7 の代わりに ii∅7、V7 に ♭9 を加える。', 'omt2e-substitutions'],
      backdoor: ['V7–I を iv7–♭VII7–I に置き換える。「正面玄関」の ii–V–I に対して名付けられた。', 'wiki-backdoor'],
      coltrane: ['ii–V–I を長三度ずつ離れた三つの調中心に広げ、それぞれの前に属七を置く（C：Dm7 E♭7 A♭maj7 B7 Emaj7 G7 Cmaj7）。', 'wiki-coltrane'],
    },
    noChange: 'この進行にはこの技法で置き換えられる箇所がありません。', shared: (a, b) => `共有する三全音：元 ${a.join('–')}、代理 ${b.join('–')}（異名同音）`,
    chord: 'コード', closeTitle: 'クローズと drop 2 / drop 3', close: 'クローズ', drop2: 'drop 2', drop3: 'drop 3', inversion: ['根音が最低音', '三度が最低音', '五度が最低音', '七度が最低音'],
    shellTitle: '3–7 シェル', shellNote: ['低音に根音、上の二声に三度と七度を置き、五度を省く。', 'omt2e-jazz-voicings'],
    soWhatTitle: 'ソー・ホワット・コード', soWhatNote: ['下から完全四度を三つ重ね、上に長三度：マイナー・イレブンス（1 4 ♭7 ♭3 5）。', 'wiki-so-what'],
    usTitle: 'アッパー・ストラクチャー・トライアド', usNote: ['左手に三度と七度（三全音）、右手に三和音を置き、テンション付きの属和音を作る。', 'wiki-upper-structure'],
    dropNote: ['drop 2 は上から二番目の音を、drop 3 は三番目の音を一オクターブ下げる。', 'wiki-voicing', 'guitar-chord-drop'],
    onlyMinor: '（マイナー・セブンスのみ）', onlyDominant: '（ドミナント・セブンスのみ）',
    scale: 'スケール', root: '根音', scales: { dominant: 'ビバップ・ドミナント', major: 'ビバップ・メジャー（メジャー6thディミニッシュ）', melodicMinor: 'ビバップ・メロディック・マイナー（マイナー6thディミニッシュ）', harmonicMinor: 'ビバップ・ハーモニック・マイナー' },
    bebopNote: ['七音音階に経過音を一つ加え、八分音符で下行したときコード音が表拍に来るようにする。', 'wiki-bebop-scale'], onBeat: '表拍', descent: '根音から下行する八分音符',
    enclosure: '半音エンクロージャー', target: '目標音', enclosureNote: ['目標音を上下から囲む。半音を裏拍に置く必要はない。', 'larsen-enclosure'],
    sixthDim: '6th ディミニッシュ・スケールの和声付け', sixthDimNote: ['メジャー6th とディミニッシュ7th を交互に置く（バリー・ハリスの和声概念）。', 'jgl-sixth-dim'],
    form: 'フォーム', formNames: { 'blues-basic': '12 小節ブルース（基本）', 'blues-quick': '12 小節ブルース（クイック・チェンジ）', 'blues-bebop': 'ビバップ・ブルース', 'blues-minor': 'マイナー・ブルース', 'blues-bird': 'バード・ブルース（Blues for Alice）', 'rhythm-changes': '循環（リズム・チェンジ AABA）' },
    playLoop: '► 再生', stop: '■ 停止', section: (s) => `${s} セクション`,
  },
  en: {
    kicker: 'Jazz, further', title: 'Reharmonization · voicings · vocabulary · forms',
    intro: 'Rework a progression with tritone substitutes, applied dominants, mode mixture, the backdoor progression or Coltrane changes; compare seventh-chord voicings; practise bebop scales and enclosures; browse common forms.',
    tabs: { reharm: 'Reharmonize', voicing: 'Voicings', bebop: 'Bebop vocabulary', forms: 'Forms' },
    key: 'Key (major)', progression: 'Progression (space separated)', technique: 'Technique', original: 'Original', result: 'Reharmonized', play: '► Play',
    techniques: { tritone: 'Tritone substitution', applied: 'Applied dominant (by fifth)', mixture: 'Mode mixture', backdoor: 'Backdoor progression', coltrane: 'Coltrane changes' },
    notes: {
      tritone: ['Any dominant seventh can be replaced by the dominant seventh a tritone away and still function the same way: the two share one tritone.', 'omt2e-substitutions'],
      applied: ['In a progression moving by fifth, the first chord can be replaced by the dominant seventh on the same root.', 'omt2e-substitutions'],
      mixture: ['Borrowing from the parallel minor: ii∅7 for ii7, and ♭9 added to V7.', 'omt2e-substitutions'],
      backdoor: ['V7–I becomes iv7–♭VII7–I, named against the "front door" ii–V–I.', 'wiki-backdoor'],
      coltrane: ['ii–V–I expands into three key centres a major third apart, each preceded by its dominant: in C, Dm7 E♭7 A♭maj7 B7 Emaj7 G7 Cmaj7.', 'wiki-coltrane'],
    },
    noChange: 'This technique finds nothing to replace in this progression.', shared: (a, b) => `Shared tritone: original ${a.join('–')}, substitute ${b.join('–')} (enharmonic)`,
    chord: 'Chord', closeTitle: 'Close position, drop 2 and drop 3', close: 'Close', drop2: 'Drop 2', drop3: 'Drop 3', inversion: ['Root in bass', 'Third in bass', 'Fifth in bass', 'Seventh in bass'],
    shellTitle: '3–7 shell', shellNote: ['Root in the bass, third and seventh above, fifth omitted.', 'omt2e-jazz-voicings'],
    soWhatTitle: 'So What chord', soWhatNote: ['Three perfect fourths and a major third from the bottom up, used as a minor eleventh (1 4 ♭7 ♭3 5).', 'wiki-so-what'],
    usTitle: 'Upper-structure triads', usNote: ['Third and seventh (a tritone) in the left hand, a triad in the right, giving an extended dominant.', 'wiki-upper-structure'],
    dropNote: ['Drop 2 lowers the second voice from the top by an octave; drop 3 lowers the third.', 'wiki-voicing', 'guitar-chord-drop'],
    onlyMinor: ' (minor sevenths only)', onlyDominant: ' (dominant sevenths only)',
    scale: 'Scale', root: 'Root', scales: { dominant: 'Bebop dominant', major: 'Bebop major (major sixth diminished)', melodicMinor: 'Bebop melodic minor (minor sixth diminished)', harmonicMinor: 'Bebop harmonic minor' },
    bebopNote: ['One passing tone is added to a seven-note scale so that chord tones fall on the beats in descending eighth notes.', 'wiki-bebop-scale'], onBeat: 'On the beat', descent: 'Eighth notes descending from the root',
    enclosure: 'Chromatic enclosure', target: 'Target', enclosureNote: ['Approach the target from above and below; the chromatic notes need not be on offbeats.', 'larsen-enclosure'],
    sixthDim: 'Harmonizing the sixth-diminished scale', sixthDimNote: ['Major sixth and diminished seventh chords alternate (Barry Harris’s harmonic concept).', 'jgl-sixth-dim'],
    form: 'Form', formNames: { 'blues-basic': '12-bar blues (basic)', 'blues-quick': '12-bar blues (quick change)', 'blues-bebop': 'Bebop blues', 'blues-minor': 'Minor blues', 'blues-bird': 'Bird blues (Blues for Alice)', 'rhythm-changes': 'Rhythm changes (AABA)' },
    playLoop: '► Play', stop: '■ Stop', section: (s) => `Section ${s}`,
  },
};

const noteMidi = (name, octave) => {
  const n = parseNote(name);
  return 12 * (octave + 1) + [0, 2, 4, 5, 7, 9, 11][n.step] + n.accidental;
};
const pitchName = (v) => {
  const n = parseNote(v.name);
  return `${v.name}${Math.round((v.midi - [0, 2, 4, 5, 7, 9, 11][n.step] - n.accidental) / 12) - 1}`;
};

/** 播放用的简单配置：根音在低音，其余和弦音在中音区 */
function chordMidis(symbol) {
  const chord = parseChordSymbol(symbol.replace('♭5', 'b5').replace('♭9', 'b9').replace('°7', 'dim7'));
  if (!chord) return [];
  const tones = chordTones(chord.root, chord.quality);
  const bass = noteMidi(tones[0], 2);
  let last = noteMidi(tones[0], 3);
  const upper = tones.slice(1).map((name) => { let m = noteMidi(name, 3); while (m <= last) m += 12; last = m; return m; });
  return [bass, ...upper];
}

function grandStaff(voicing) {
  const low = voicing.filter((v) => v.midi < 60).map(pitchName);
  const high = voicing.filter((v) => v.midi >= 60).map(pitchName);
  return renderStaff({ beats: 4, staves: [{ clef: 'treble', bars: [[high.length ? { p: high, d: 4 } : { p: null, d: 4 }]] }, { clef: 'bass', bars: [[low.length ? { p: low, d: 4 } : { p: null, d: 4 }]] }] });
}

export function mountJazzMore(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  target.addEventListener('toolbox-stop', stop);
  const note = ([text, ...refs]) => { const p = el('p', 'mk-hint', text); refs.forEach((id) => p.appendChild(cite(SOURCES, id))); return p; };
  const playSequence = (symbols, beat = 0.8) => {
    stop();
    symbols.forEach((symbol, i) => timers.push(setTimeout(() => playChord(chordMidis(symbol).map(midiToFrequency), beat * 0.95, { interrupt: i === 0 }), i * beat * 1000)));
  };
  const playVoicing = (voicing) => { stop(); playChord(voicing.map((v) => midiToFrequency(v.midi)), 1.6); };

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', '', t.intro));
  root.appendChild(head);
  const body = el('div', 'mk-section');
  const views = {};

  // ---------- 重配和声 ----------
  views.reharm = () => {
    const wrap = el('div', 'mk-section');
    const key = el('select');
    KEYS.forEach((k) => key.appendChild(option(k)));
    const progression = el('input');
    progression.type = 'text';
    progression.spellcheck = false;
    progression.value = 'Am7 Dm7 G7 Cmaj7';
    const technique = el('select');
    Object.entries(t.techniques).forEach(([id, label]) => technique.appendChild(option(id, label)));
    const controls = el('div', 'mk-controls');
    controls.append(field(t.key, key), field(t.progression, progression, 'mk-grow'), field(t.technique, technique));
    const result = el('div', 'mk-section');
    wrap.append(controls, result);
    const row = (label, chords, changed) => {
      const line = el('div', 'mk-card');
      const lineHead = el('div', 'mk-card-head');
      lineHead.append(el('strong', '', label), button('btn btn-secondary btn-sm', t.play, () => playSequence(chords)));
      const chips = el('div', 'mk-notes');
      chords.forEach((c, i) => chips.appendChild(el('span', `mk-badge${changed.has(i) ? ' is-brass' : ''}`, c)));
      line.append(lineHead, chips);
      return line;
    };
    function paint() {
      result.replaceChildren();
      const symbols = progression.value.split(/\s+/).filter(Boolean);
      let output;
      try { output = reharmonize(symbols, key.value, technique.value); } catch (error) { result.appendChild(el('p', 'mk-callout is-error', error.message)); return; }
      const changedIdx = new Set();
      let cursor = 0;
      output.changes.forEach((change) => { const start = change.at + (cursor); change.to.forEach((_, j) => changedIdx.add(start + j)); cursor += change.to.length - change.from.length; });
      result.append(row(t.original, symbols, new Set()), row(t.result, output.chords, changedIdx));
      result.appendChild(note(t.notes[technique.value]));
      if (!output.changes.length) result.appendChild(el('p', 'mk-callout', t.noChange));
      if (technique.value === 'tritone') {
        output.changes.forEach((change) => {
          const chord = parseChordSymbol(change.from[0].replace('♭9', 'b9'));
          if (chord) { const shared = sharedTritone(chord.root); result.appendChild(el('p', 'mk-meta', `${change.from[0]} → ${change.to[0]}：${t.shared(shared.original, shared.substitute)}`)); }
        });
      }
    }
    [key, technique].forEach((c) => c.addEventListener('change', paint));
    progression.addEventListener('keydown', (e) => { if (e.key === 'Enter') paint(); });
    progression.addEventListener('change', paint);
    paint();
    return wrap;
  };

  // ---------- 和弦配置 ----------
  views.voicing = () => {
    const wrap = el('div', 'mk-section');
    const chordInput = el('input');
    chordInput.type = 'text';
    chordInput.spellcheck = false;
    chordInput.value = 'G7';
    const controls = el('div', 'mk-controls');
    controls.append(field(t.chord, chordInput));
    ['Cmaj7', 'Dm7', 'G7', 'Bm7b5', 'C6'].forEach((s) => controls.appendChild(button('btn btn-ghost btn-sm', s, () => { chordInput.value = s; paint(); })));
    const result = el('div', 'mk-section');
    wrap.append(controls, result);
    const voicingCard = (title, voicing) => {
      const card = el('div', 'mk-card');
      const cardHead = el('div', 'mk-card-head');
      cardHead.append(el('strong', '', title), button('btn btn-secondary btn-sm', t.play, () => playVoicing(voicing)));
      const scroll = el('div', 'mk-staff-scroll');
      scroll.appendChild(grandStaff(voicing));
      card.append(cardHead, el('p', '', voicing.map((v) => v.name).join(' ')), scroll);
      return card;
    };
    function paint() {
      result.replaceChildren();
      const chord = parseChordSymbol(chordInput.value);
      if (!chord || !QUALITIES[chord.quality] || QUALITIES[chord.quality].tones.length < 4) { result.appendChild(el('p', 'mk-callout is-error', `${t.chord}: ${chordInput.value}`)); return; }
      result.append(el('h4', '', t.closeTitle), note(t.dropNote));
      const grid = el('div', 'mk-grid');
      closePositions(chord.root, chord.quality, 4).forEach((close, i) => {
        grid.appendChild(voicingCard(`${t.close} · ${t.inversion[i]}`, close));
        grid.appendChild(voicingCard(`${t.drop2} · ${t.inversion[i]}`, dropVoicing(close, 2)));
        grid.appendChild(voicingCard(`${t.drop3} · ${t.inversion[i]}`, dropVoicing(close, 3)));
      });
      result.appendChild(grid);
      result.append(el('h4', '', t.shellTitle), note(t.shellNote));
      const shells = el('div', 'mk-grid');
      shellVoicings(chord.root, chord.quality).forEach((v, i) => shells.appendChild(voicingCard(`${t.shellTitle} ${i + 1}`, v)));
      result.appendChild(shells);
      result.append(el('h4', '', `${t.soWhatTitle}${t.onlyMinor}`), note(t.soWhatNote));
      if (chord.quality === 'm7') { const g = el('div', 'mk-grid'); g.appendChild(voicingCard(`${chord.root}m11`, soWhatVoicing(chord.root, 3))); result.appendChild(g); }
      result.append(el('h4', '', `${t.usTitle}${t.onlyDominant}`), note(t.usNote));
      if (chord.quality === '7') {
        const g = el('div', 'mk-grid');
        UPPER_STRUCTURES.forEach((item) => {
          const us = upperStructure(chord.root, item);
          g.appendChild(voicingCard(`${item.label} · ${us.triadName} → ${us.symbol}`, [...us.left, ...us.triad]));
        });
        result.appendChild(g);
      }
    }
    chordInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') paint(); });
    chordInput.addEventListener('change', paint);
    paint();
    return wrap;
  };

  // ---------- Bebop 语汇 ----------
  views.bebop = () => {
    const wrap = el('div', 'mk-section');
    const rootSelect = el('select');
    ROOTS.forEach((r) => rootSelect.appendChild(option(r)));
    const kind = el('select');
    Object.keys(BEBOP_SCALES).forEach((id) => kind.appendChild(option(id, t.scales[id])));
    const controls = el('div', 'mk-controls');
    controls.append(field(t.root, rootSelect), field(t.scale, kind));
    const result = el('div', 'mk-section');
    wrap.append(controls, result);
    const QUALITY_FOR = { dominant: '7', major: '6', melodicMinor: 'm6', harmonicMinor: 'm7' };
    function paint() {
      result.replaceChildren();
      const r = rootSelect.value;
      const line = bebopDescent(r, kind.value, QUALITY_FOR[kind.value]);
      let octave = 5;
      let prev = null;
      const named = line.map((n) => {
        let midi = noteMidi(n.name, octave);
        if (prev !== null) { while (midi >= prev) midi -= 12; }
        prev = midi;
        return { ...n, midi };
      });
      result.appendChild(note(t.bebopNote));
      const chips = el('div', 'mk-notes');
      named.forEach((n) => {
        const chip = el('div', `mk-note${n.onBeat ? ' is-tonic' : ''}`);
        chip.append(el('strong', '', n.name), el('small', '', n.onBeat ? t.onBeat : ''));
        chips.appendChild(chip);
      });
      const scroll = el('div', 'mk-staff-scroll');
      scroll.appendChild(renderStaff({ beats: 4, staves: [{ bars: [named.slice(0, 8).map((n) => ({ p: pitchName(n), d: 0.5, mark: n.onBeat && n.chordTone ? '●' : '' })), [{ p: pitchName(named[8]), d: 4 }]] }] }));
      const play = button('btn btn-secondary btn-sm', t.play, () => {
        stop();
        named.forEach((n, i) => timers.push(setTimeout(() => playChord([midiToFrequency(n.midi)], 0.3, { interrupt: i === 0 }), i * 260)));
      });
      result.append(el('h4', '', t.descent), chips, scroll, play);
      // 包围音
      result.append(el('h4', '', t.enclosure), note(t.enclosureNote));
      const chordQuality = QUALITY_FOR[kind.value];
      const targets = el('div', 'mk-grid');
      chordTones(r, chordQuality).slice(0, 4).forEach((name) => {
        const midi = noteMidi(name, 4);
        const card = el('div', 'mk-card');
        card.appendChild(el('strong', '', `${t.target} ${name}`));
        chromaticEnclosures(midi).forEach((pattern) => {
          const names = pattern.midis.map((m, i) => (i === 2 ? name : m > midi ? spellAbove(name, 1, 1) : spellAbove(name, -1, -1)));
          const lineEl = el('div', 'mk-actions');
          lineEl.append(el('span', 'mk-meta', names.join(' → ')), button('btn btn-ghost btn-sm', t.play, () => {
            stop();
            pattern.midis.forEach((m, i) => timers.push(setTimeout(() => playChord([midiToFrequency(m)], 0.3, { interrupt: i === 0 }), i * 280)));
          }));
          card.appendChild(lineEl);
        });
        targets.appendChild(card);
      });
      result.appendChild(targets);
      if (kind.value === 'major') {
        result.append(el('h4', '', t.sixthDim), note(t.sixthDimNote));
        const chipsDim = el('div', 'mk-notes');
        sixthDiminishedHarmonization(r).forEach((n) => {
          const chip = el('div', `mk-note${n.chord === '6' ? '' : ' is-aux'}`);
          chip.append(el('strong', '', n.name), el('small', '', n.chord === '6' ? `${r}6` : '°7'));
          chipsDim.appendChild(chip);
        });
        result.appendChild(chipsDim);
      }
    }
    [rootSelect, kind].forEach((c) => c.addEventListener('change', paint));
    paint();
    return wrap;
  };

  // ---------- 曲式库 ----------
  views.forms = () => {
    const wrap = el('div', 'mk-section');
    const form = el('select');
    FORMS.forEach((f) => form.appendChild(option(f.id, t.formNames[f.id])));
    const key = el('select');
    KEYS.forEach((k) => key.appendChild(option(k)));
    const controls = el('div', 'mk-controls');
    const actions = el('div', 'mk-actions');
    controls.append(field(t.form, form), field(t.key, key), actions);
    const result = el('div', 'mk-section');
    wrap.append(controls, result);
    let current = [];
    /** 高亮正在播放的小节与和弦；barIndex 为 -1 时清除 */
    const highlight = (barIndex, chordIndex) => {
      result.querySelectorAll('.jz-bar.is-current').forEach((node) => node.classList.remove('is-current'));
      result.querySelectorAll('.jz-chord.is-playing').forEach((node) => node.classList.remove('is-playing'));
      if (barIndex < 0) return;
      const bar = result.querySelector(`.jz-bar[data-bar="${barIndex}"]`);
      bar?.classList.add('is-current');
      bar?.querySelector(`.jz-chord[data-chord="${chordIndex}"]`)?.classList.add('is-playing');
    };
    const stopForm = () => { stop(); highlight(-1); };
    target.addEventListener('toolbox-stop', () => highlight(-1));
    actions.append(
      button('btn btn-primary btn-sm', t.playLoop, () => {
        stopForm();
        const beat = 0.45;
        let time = 0;
        let first = true;
        current.forEach((bar, barIndex) => bar.forEach((symbol, chordIndex) => {
          const length = (4 / bar.length) * beat;
          const at = time;
          const isFirst = first;
          first = false;
          timers.push(setTimeout(() => {
            playChord(chordMidis(symbol).map(midiToFrequency), length * 0.95, { interrupt: isFirst });
            highlight(barIndex, chordIndex);
          }, at * 1000));
          time += length;
        }));
        timers.push(setTimeout(() => highlight(-1), time * 1000 + 200));
      }),
      button('btn btn-ghost btn-sm', t.stop, stopForm),
    );
    function paint() {
      stopForm();
      result.replaceChildren();
      const chosen = FORMS.find((f) => f.id === form.value);
      current = realizeForm(chosen, key.value);
      const grid = el('div', 'mk-section');
      const sections = chosen.sections || [null];
      const per = current.length / sections.length;
      sections.forEach((section, s) => {
        if (section) grid.appendChild(el('div', 'mk-meta', t.section(section)));
        const bars = el('div', 'mk-grid mk-bars');
        current.slice(s * per, (s + 1) * per).forEach((bar, i) => {
          const cell = el('div', 'mk-card jz-bar');
          cell.dataset.bar = String(s * per + i);
          const chords = el('div', 'jz-bar-chords');
          bar.forEach((symbol, c) => {
            const chip = el('strong', 'jz-chord', symbol);
            chip.dataset.chord = String(c);
            chords.appendChild(chip);
          });
          cell.append(el('small', 'mk-meta', String(s * per + i + 1)), chords);
          bars.appendChild(cell);
        });
        grid.appendChild(bars);
      });
      result.appendChild(grid);
      const src = el('p', 'mk-hint', '');
      src.appendChild(cite(SOURCES, chosen.ref));
      result.appendChild(src);
    }
    form.addEventListener('change', () => { key.value = FORMS.find((f) => f.id === form.value).key; paint(); });
    key.addEventListener('change', paint);
    key.value = FORMS[0].key;
    paint();
    return wrap;
  };

  const navigation = tabs(root, Object.entries(t.tabs).map(([id, label]) => ({ id, label })), (id) => {
    stop();
    body.replaceChildren(views[id]());
  });
  root.append(body, relatedLinks(['cst', 'blues', 'lcc']), sourcesFooter(SOURCES));
  target.appendChild(root);
  navigation.select('reharm');
}

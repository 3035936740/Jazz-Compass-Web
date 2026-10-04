// 旋律配和声界面
// 语法依据见 harmonize.js：ref:omt2e-phrase-model ref:omt2e-cadences ref:omt2e-predominants ref:omt2e-tonic-v6
//   ref:omt2e-vii6 ref:omt2e-la-bass ref:omt2e-mediant ref:omt2e-plagal；四部写作沿用 classical_voicing.js（ref:sposobin）
import { harmonizeMelody, voicingEntries, spellVoice } from './harmonize.js';
import { solveVoicings } from './classical_voicing.js?v=20261004-w7';
import { parsePitch } from './pitch_spelling.js';
import { renderStaff } from './staff_svg.js?v=20261002-fix';
import { el, button, option, field, language, midiToFrequency, sourcesFooter, cite, relatedLinks, midiExportButton } from './module_kit.js';

const SOURCES = ['omt2e-phrase-model', 'omt2e-cadences', 'omt2e-predominants', 'omt2e-tonic-v6', 'omt2e-vii6', 'omt2e-la-bass', 'omt2e-mediant', 'omt2e-plagal', 'sposobin'];
const KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'];

const TEXT = {
  zh: {
    kicker: '旋律与和声', title: '旋律配和声',
    intro: '为旋律的每个音配一个三和弦（含第一转位），和弦进行遵循乐句模型 Tb–PD–D–Te：主和弦开头，可用 V6、vii°6 或变格 IV 延长，经过下属到达属和弦，最后终止。',
    melody: '旋律（每个音配一个和弦，音带八度）', key: '调', mode: '调式', major: '大调', minor: '小调（和声小调的 V 与 vii°）',
    cadence: '终止', authentic: '正格终止（V–I）', half: '半终止（停在 V）', count: '结果数',
    run: '配和声', play: '► 试听', satb: '四部和声', noResult: '在这些规则下找不到配法：检查旋律最后的音能否构成所选终止，或换一个调。',
    satbFail: '四部写作失败：', ranking: '排序优先 PAC、终止前有强下属、和弦少重复；这只是本工具的启发式，不是教材规则。',
    fn: { T: '主', PD: '下属', D: '属' }, cadenceName: { PAC: '完全正格终止 PAC', IAC: '不完全正格终止 IAC', HC: '半终止 HC' },
    voices: ['女高音', '女低音', '男高音', '男低音'], raised: '旋律在原音区放不下四个声部，已移高八度写作。',
  },
  ja: {
    kicker: '旋律と和声', title: '旋律の和声付け',
    intro: '旋律の各音に三和音（第一転回形を含む）を付けます。進行はフレーズ・モデル Tb–PD–D–Te に従い、主和音で始め、V6・vii°6・変格の IV で主和音を延長し、下属和音を経て属和音に至り、終止します。',
    melody: '旋律（一音に一和音、オクターブ付き）', key: '調', mode: '旋法', major: '長調', minor: '短調（和声的短音階の V と vii°）',
    cadence: '終止', authentic: '全終止（V–I）', half: '半終止（V で終わる）', count: '件数',
    run: '和声付け', play: '► 試聴', satb: '四声体', noResult: 'この規則では和声付けが見つかりません。最後の音が選んだ終止を作れるか確認するか、調を変えてください。',
    satbFail: '四声体の配置に失敗：', ranking: '並び順は PAC、終止前の強い下属和音、和音の反復の少なさを優先します。これは本ツールの経験則で、教科書の規則ではありません。',
    fn: { T: 'T', PD: 'PD', D: 'D' }, cadenceName: { PAC: '完全全終止 PAC', IAC: '不完全全終止 IAC', HC: '半終止 HC' },
    voices: ['ソプラノ', 'アルト', 'テノール', 'バス'], raised: '元の音域では四声体を配置できないため、旋律を一オクターブ上げました。',
  },
  en: {
    kicker: 'Melody & harmony', title: 'Harmonize a melody',
    intro: 'Give each melody note a triad (root position or first inversion). Progressions follow the phrase model Tb–PD–D–Te: start on tonic, prolong it with V6, vii°6 or plagal IV, move through predominants to the dominant, and cadence.',
    melody: 'Melody (one chord per note, pitches with octaves)', key: 'Key', mode: 'Mode', major: 'Major', minor: 'Minor (harmonic-minor V and vii°)',
    cadence: 'Cadence', authentic: 'Authentic (V–I)', half: 'Half (ends on V)', count: 'Results',
    run: 'Harmonize', play: '► Play', satb: 'Four-part', noResult: 'No harmonization fits these rules: check that the last notes can form the chosen cadence, or try another key.',
    satbFail: 'Four-part realisation failed: ', ranking: 'Results favour a PAC, a strong predominant before the cadence and fewer repeated chords — a heuristic of this tool, not a textbook rule.',
    fn: { T: 'T', PD: 'PD', D: 'D' }, cadenceName: { PAC: 'Perfect authentic PAC', IAC: 'Imperfect authentic IAC', HC: 'Half cadence HC' },
    voices: ['Soprano', 'Alto', 'Tenor', 'Bass'], raised: 'The melody was too low for four voices, so it was raised an octave for the four-part version.',
  },
};

export function mountHarmonizer(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  target.addEventListener('toolbox-stop', stop);

  target.replaceChildren();
  const root = el('div', 'mk');
  const head = el('div', 'mk-head');
  const intro = el('p', '', t.intro);
  intro.append(cite(SOURCES, 'omt2e-phrase-model'), cite(SOURCES, 'omt2e-tonic-v6'), cite(SOURCES, 'omt2e-plagal'));
  head.append(el('div', 'mk-kicker', t.kicker), el('h3', '', t.title), intro);
  root.appendChild(head);

  const melody = el('input');
  melody.type = 'text';
  melody.spellcheck = false;
  melody.value = 'E5 D5 C5 D5 E5 F5 D5 C5';
  const key = el('select');
  KEYS.forEach((k) => key.appendChild(option(k)));
  const mode = el('select');
  mode.append(option('major', t.major), option('minor', t.minor));
  const cadence = el('select');
  cadence.append(option('authentic', t.authentic), option('half', t.half));
  const count = el('select');
  ['3', '6', '10'].forEach((n) => count.appendChild(option(n)));
  count.value = '6';
  const controls = el('div', 'mk-controls');
  controls.append(field(t.melody, melody, 'mk-grow'), field(t.key, key), field(t.mode, mode), field(t.cadence, cadence), field(t.count, count));
  const actions = el('div', 'mk-actions');
  const results = el('div', 'mk-section');
  actions.appendChild(button('btn btn-primary btn-sm', t.run, run));
  root.append(controls, actions, results, relatedLinks(['classical', 'figured', 'nonchord']), sourcesFooter(SOURCES));
  target.appendChild(root);

  function playVoices(voices) {
    stop();
    const beat = 0.75;
    voices.forEach((chord, i) => timers.push(setTimeout(() => playChord(chord.map(midiToFrequency), beat * 0.95, { interrupt: i === 0 }), i * beat * 1000)));
  }

  function run() {
    results.replaceChildren();
    const notes = melody.value.split(/[\s|,]+/).filter(Boolean);
    let output;
    try {
      output = harmonizeMelody({ melody: notes, key: key.value, mode: mode.value, cadence: cadence.value, limit: Number(count.value) });
    } catch (error) {
      results.appendChild(el('p', 'mk-callout is-error', error.message));
      return;
    }
    if (!output.results.length) { results.appendChild(el('p', 'mk-callout is-error', t.noResult)); return; }
    results.appendChild(el('p', 'mk-hint', t.ranking));
    const grid = el('div', 'mk-section');
    // 能写成合规四部和声的配法排在前面
    const solvable = (result) => {
      const entries = voicingEntries({ key: key.value, mode: mode.value, chords: result.chords, melody: notes });
      return solveVoicings(entries).ok;
    };
    const ordered = [...output.results].map((result) => ({ result, ok: solvable(result) })).sort((a, b) => Number(b.ok) - Number(a.ok)).map((item) => item.result);
    ordered.forEach((result, index) => {
      const card = el('div', `mk-card${index === 0 ? ' is-current' : ''}`);
      const cardHead = el('div', 'mk-card-head');
      const cadenceBadge = el('span', 'mk-badge is-accent', t.cadenceName[result.cadence]);
      cardHead.append(el('strong', '', result.names.join('  ')), cadenceBadge);
      const romans = el('div', 'mk-notes');
      result.chords.forEach((roman, i) => {
        const chip = el('div', 'mk-note');
        chip.append(el('span', 'mk-note-top', t.fn[result.functions[i]] || result.functions[i]), el('strong', '', roman), el('small', '', notes[i]));
        romans.appendChild(chip);
      });
      const entries = voicingEntries({ key: key.value, mode: mode.value, chords: result.chords, melody: notes });
      let solved = solveVoicings(entries);
      let raised = false;
      if (!solved.ok) {
        // 旋律太低时四个声部排不开：试着把旋律移高八度（界面会注明）
        const up = notes.map((n) => { const p = parsePitch(n); return p ? `${n.replace(/-?\d+$/, '')}${p.octave + 1}` : n; });
        const retry = solveVoicings(voicingEntries({ key: key.value, mode: mode.value, chords: result.chords, melody: up }));
        if (retry.ok) { solved = retry; raised = true; }
      }
      const satbHost = el('div');
      const playBtn = button('btn btn-secondary btn-sm', t.play, () => {
        if (solved.ok) playVoices(solved.voices);
        else playVoices(entries.map((e, i) => [48 + e.bassPc, parsePitch(notes[i]).midi]));
      });
      const satbBtn = button('btn btn-ghost btn-sm', t.satb, () => {
        satbHost.replaceChildren();
        if (!solved.ok) { satbHost.appendChild(el('p', 'mk-callout is-error', `${t.satbFail}${solved.reason}`)); return; }
        const staves = [3, 2, 1, 0].map((voice, i) => ({
          label: t.voices[i],
          clef: voice >= 2 ? 'treble' : 'bass',
          bars: solved.voices.map((v, bar) => [{ p: spellVoice(key.value, mode.value, result.chords[bar], v[voice]), d: 4 }]),
        }));
        const scroll = el('div', 'mk-staff-scroll');
        scroll.appendChild(renderStaff({ staves, beats: 4, labels: result.names.map((text, bar) => ({ bar, beat: 0, text })) }));
        if (raised) satbHost.appendChild(el('p', 'mk-hint', t.raised));
        satbHost.appendChild(scroll);
      });
      const cardActions = el('div', 'mk-actions');
      // 四部写作成功时导出四条声部；否则导出旋律与低音
      const exportBtn = midiExportButton(() => {
        const rows = solved.ok ? solved.voices : entries.map((e, i) => [48 + e.bassPc, parsePitch(notes[i]).midi]);
        const names = solved.ok ? ['Bass', 'Tenor', 'Alto', 'Soprano'] : ['Bass', 'Melody'];
        return names.map((name, voice) => ({ name, notes: rows.map((chord, i) => ({ beat: i * 2, duration: 2, midi: chord[voice] })) }));
      }, `harmonization-${key.value}-${result.names.join('_').replace(/[^A-Za-z0-9_#-]/g, '')}`, { bpm: 72 });
      cardActions.append(playBtn, satbBtn, exportBtn);
      card.append(cardHead, romans, cardActions, satbHost);
      grid.appendChild(card);
    });
    results.appendChild(grid);
  }

  [key, mode, cadence, count].forEach((control) => control.addEventListener('change', run));
  melody.addEventListener('keydown', (event) => { if (event.key === 'Enter') run(); });
  run();
}

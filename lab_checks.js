// Side-B 实操（Practical Lab）的评分器：工具把当前内容交上来（submission），按评分表打分。纯函数，可以在 Node 里测试。
//
// 不问"答案是否和标准答案完全一致"，而问"满足了多少音乐约束，有没有犯足以推翻整个答案的核心错误"：
//   约束评分 + 部分得分 + 少量硬性条件。满分 100，再折算进整关的分数（sideb_engine.js）。
//   评分层：核心目标 core / 技术正确 technical / 完成度 completeness / 质量 quality；硬性条件 hardFail 违反就不算通过。
//   小错误扣分（每条扣分写明扣了多少、错在哪里、在哪两个和弦之间），大错误阻止通过。
//   通过线由调用方决定（普通关 50%、章节测试 60%、B-EX 70%，见 sideb_engine.LAB_LINES）；这里的 passed 只表示"没有硬性失败"。
//
// 出处：
//   四部和声的规则沿用 satb_check.js（ref:omt2e-roman-numerals ref:omt-species1 ref:omt2e-v7 ref:omt2e-pd7）；
//   罗马数字与转位数字：ref:omt2e-roman-numerals ref:omt2e-figured-bass
//   爵士和弦配置：有低音手时上方声部可以省略根音、五音最常省略，七音和根音很少省略（根音由低音手负责时才省）；
//     13 音要放在七音上方，否则听起来像 6 音；低音区音靠得太近会浑浊；声部要"懒"——能保持就保持，其次级进，
//     三度跳进也容易，大跳要少用（ref:omt2e-jazz-voicings）；合奏里弹和弦的人常省略五音甚至根音（ref:wiki-jazz-chord）；
//     大三和弦上方的纯四度（11 音）在三音上方半音，与三音冲突，是 avoid note（ref:wiki-avoid-note）；
//     和弦性质与延伸音：ref:omt2e-chord-symbols
//   节奏：连音线只连同音高的音、不用在休止符上，被连的音不再重新奏出（ref:omt2e-rhythm）；
//     切分 = 弱位置上的节奏重音，可以由连音线、附点、休止或力度造成（ref:omt2e-rhythm-more）；
//     单拍子每拍一个四分音符（4/4 等）、复拍子每拍一个附点四分音符（6/8 等）（ref:omt2e-simple-meter ref:omt2e-compound-meter）
//   复节奏 / 节拍调制：ref:wiki-polyrhythm ref:wiki-metric-modulation
//   类别对位：沿用 counterpoint.js 的逐条规则（ref:omt-species1 ref:omt-species2 ref:omt-species3 ref:omt-species4 ref:omt2e-intro）
//   在谱上写集合类的成员（Tn / In 相关的同一集合类）：ref:omt2e-normal-order ref:omt2e-prime-form；写十二音行的行形式：ref:omt2e-twelve-tone ref:omt2e-row-naming
//   集合级运算：ref:omt2e-normal-order ref:omt2e-prime-form ref:omt2e-ic-vector（沿用 post_tonal.js）
import { checkSATB, identifyChord, PARTS, groupFourPart } from './satb_check.js?v=20261004-r32';
import { parseRoman, realize } from './prog_library.js?v=20261004-w8';
import { voiceMeasures } from './staff_edit.js?v=20261004-w6';
import { durationBeats, pitchMidi } from './staff_reading.js';
import { normalOrder, primeForm, intervalVector, rowForm } from './post_tonal.js';
import { metricModulation, PRESETS } from './poly_meter.js';
import { parseChordSymbol } from './chord_symbols.js';
import { parseNote } from './pitch_spelling.js';
import { checkCounterpoint } from './counterpoint.js';
import { MESSAGES as CP_MESSAGES } from './counterpoint_messages.js?v=20261004-w1';

const t = (zh, ja, en) => ({ zh, ja, en });
const mod = (n) => ((n % 12) + 12) % 12;
const EPS = 1e-6;
export const LAYERS = ['core', 'technical', 'completeness', 'quality'];

// ---------------- 评分表的基本件 ----------------
/** 一条扣分：points 扣几分，text 写明错在哪里（三种语言），error 是错误类型（sideb_errors.js，用来给建议与推荐练习） */
export const deduct = (points, text, error) => ({ points, text, error });
/**
 * 一个评分项：满分 max，按扣分算得分（最低 0）。同一项扣完以后，后面的扣分记为 0（仍然列出来，让玩家知道还有哪里要改）
 * info：不扣分的诊断（例如"三音 → 七音半音连接"做到了），给玩家看的正面反馈
 */
export function item(id, layer, max, label, deductions = [], info = []) {
  let left = max;
  const applied = deductions.map((d) => { const points = Math.min(left, d.points); left -= points; return { ...d, points: Math.round(points * 100) / 100, nominal: d.points }; });
  return { id, layer, max, label, points: Math.round(Math.max(0, left) * 100) / 100, deductions: applied, info, ok: !deductions.length };
}
/** 汇总成 100 分制：评分项满分加起来不是 100 时按比例换算 */
export function rubric(items, hardFail = []) {
  const total = items.reduce((sum, i) => sum + i.max, 0);
  const k = total ? 100 / total : 0;
  const scaled = items.map((i) => (Math.abs(k - 1) < EPS ? i : { ...i, max: round(i.max * k), points: round(i.points * k), deductions: i.deductions.map((d) => ({ ...d, points: round(d.points * k) })) }));
  const score = Math.round(scaled.reduce((sum, i) => sum + i.points, 0));
  return { score, max: 100, passed: !hardFail.length, hardFail, items: scaled };
}
const round = (x) => Math.round(x * 100) / 100;
/** 还没写完时，技术与质量项只按写了的部分给分：缺的比例从这一项里扣掉（没写的东西不能白拿"没有错误"的分） */
const coverageDeduction = (max, written, required) => (written >= required ? [] : [deduct(max * (1 - written / Math.max(1, required)), fill(t('还没写完：只有 {w}/{r} 个可以检查', 'まだ途中：確認できるのは {w}/{r} 個', 'Not finished: only {w} of {r} can be checked'), { w: written, r: required }), 'incomplete-work')]);
const fill = (tpl, values) => t(...['zh', 'ja', 'en'].map((l) => tpl[l].replace(/\{(\w+)\}/g, (_, k) => (values[k]?.[l] ?? values[k] ?? ''))));

// ---------------- 罗马数字 + 转位数字 ----------------
const FIGURES = [['6/5', 1, true], ['4/3', 2, true], ['4/2', 3, true], ['6/4', 2, false], ['6', 1, false], ['7', 0, true]];
const QUALITY_TO_SATB = { maj: 'maj', min: 'min', dim: 'dim', aug: 'aug', dom7: 'dom7', maj7: 'maj7', min7: 'min7', hdim7: 'hdim7', dim7: 'dim7', mM7: 'minmaj7' };
const SEVENTHS = ['dom7', 'maj7', 'min7', 'hdim7', 'dim7', 'minmaj7'];
/** 各性质的组成音（相对根音的半音数；顺序 = 根、三、五、七，下标就是转位） */
const QUALITY_SETS = { maj: [0, 4, 7], min: [0, 3, 7], dim: [0, 3, 6], aug: [0, 4, 8], dom7: [0, 4, 7, 10], maj7: [0, 4, 7, 11], min7: [0, 3, 7, 10], hdim7: [0, 3, 6, 10], dim7: [0, 3, 6, 9], minmaj7: [0, 3, 7, 11] };
const LETTER_NAMES = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
/**
 * 'ii6' 'V6/5' 'V7' 'I6/4' 'viiø7' → { rootPc, quality（satb_check 的名字）, position }
 * 副属和弦 'V/V' 'V6/5/V' 'vii°7/V'：先求出被离调的和弦的根音，再把斜杠前面的部分放到以它为主音的调里解读（ref:omt2e-tonicization）
 * 'N6' = ♭II6（那不勒斯六和弦，ref:omt2e-neapolitan）
 */
export function parseRomanFigure(text, keyName = 'C') {
  let base = String(text).trim();
  if (/^N6$/i.test(base)) base = 'bII6';
  const applied = /^(.+?)\/([b#♭♯]?(?:VII|VI|IV|V|III|II|I|vii|vi|iv|v|iii|ii|i)[°ø+]?)$/.exec(base);
  if (applied && !/^\d/.test(applied[2])) {
    const target = parseRomanFigure(applied[2], keyName);
    if (!target) return null;
    return parseRomanFigure(applied[1], LETTER_NAMES[target.rootPc]);
  }
  let position = 0;
  let seventh = false;
  for (const [fig, pos, isSeventh] of FIGURES) {
    if (base.endsWith(fig) && base.length > fig.length) {
      base = base.slice(0, -fig.length);
      position = pos;
      seventh = isSeventh;
      break;
    }
  }
  // 七和弦的转位数字里已经隐含"7"：V6/5 → V7 的第一转位；ø、° 后面补上 7
  const chord = parseRoman(seventh && !/7$/.test(base) ? `${base}7` : base);
  if (!chord) return null;
  const real = realize(chord, keyName);
  return { rootPc: real.rootPc, quality: QUALITY_TO_SATB[chord.quality] || chord.quality, position };
}

// ---------------- 五线谱 → 四部和弦 ----------------
/** 一行谱的每个事件加上开始的拍（四分音符 = 1） */
function timedEvents(events, meter, key) {
  let beat = 0;
  return voiceMeasures(events || [], meter, key).flat().map((e) => {
    const entry = { beat, e };
    beat += durationBeats(e.duration, e.dots);
    return entry;
  });
}
const noteMidi = (n) => pitchMidi(n.letter, n.octave, n.alter ?? 0);
/**
 * 大谱表 → 四部和弦 [男低, 男高, 女中, 女高]（MIDI）。同一时刻开始的音合在一起，正好 4 个就是一个和弦；
 * 上下两行怎么分配都可以（satb_check.groupFourPart）。升降按调号与临时记号解析（staff_edit.voiceMeasures）。
 * readFourPart 另外给出 problems（哪些拍上同时开始的音不是 4 个）
 */
export const scoreToChords = (submission) => readFourPart(submission).chords;
export function readFourPart({ voices, key = 0, meter = [4, 4] }) {
  const staff = (events) => {
    let prev = null;
    return timedEvents(events, meter, key).map(({ beat, e }) => {
      const midis = e.rest ? [] : e.notes.map(noteMidi);
      const tiedIn = Boolean(prev && prev.tie && !e.rest && midis.length && midis.every((m) => prev.midis.includes(m)));
      prev = { tie: !e.rest && e.tie, midis };
      return { beat, beats: durationBeats(e.duration, e.dots), midis, source: 0, tiedIn, rest: e.rest };
    });
  };
  const { chords, problems } = groupFourPart([staff(voices?.[0]), staff(voices?.[1])]);
  return { chords, problems };
}
/** 拍位的文字：第几小节第几拍 */
const beatText = (beat, meter = [4, 4]) => {
  const bar = (meter[0] * 4) / meter[1];
  const m = Math.floor(beat / bar + 1e-6);
  const b = Math.round(((beat - m * bar) / (4 / meter[1])) * 100) / 100 + 1;
  return t(`第 ${m + 1} 小节第 ${b} 拍`, `${m + 1} 小節目 ${b} 拍目`, `bar ${m + 1}, beat ${b}`);
};

const PART_NAME = {
  soprano: t('女高', 'ソプラノ', 'Soprano'), alto: t('女中', 'アルト', 'Alto'), tenor: t('男高', 'テノール', 'Tenor'), bass: t('男低', 'バス', 'Bass'),
};
// 上方声部写在前面：Alto/Tenor
const joinParts = (parts) => t(...['zh', 'ja', 'en'].map((l) => [...parts].sort((a, b) => PARTS.indexOf(b) - PARTS.indexOf(a)).map((p) => PART_NAME[p]?.[l] ?? p).join('/')));
const where = (labels, at, to) => (to !== undefined ? `${labels[at] ?? at + 1} → ${labels[to] ?? to + 1}` : `${labels[at] ?? at + 1}`);
const RULE_LABEL = {
  'parallel-5': t('平行五度', '平行 5 度', 'Parallel fifth'), 'parallel-8': t('平行八度', '平行 8 度', 'Parallel octave'),
  'leading-tone': t('导音没有解决到主音', '導音が主音へ解決していない', 'Leading tone not resolved'), seventh: t('七音没有级进下行', '第 7 音が順次下行していない', 'Seventh not resolved down by step'),
  crossing: t('声部交叉', '声部の交差', 'Voice crossing'), overlap: t('声部超越', '声部の超越', 'Voice overlap'),
  'doubled-leading': t('重复了导音', '導音の重複', 'Doubled leading tone'), 'doubled-seventh': t('重复了七音', '第 7 音の重複', 'Doubled seventh'),
  spacing: t('相邻声部距离太远', '隣の声部との間隔が広すぎる', 'Spacing too wide'), range: t('超出音域', '音域外', 'Out of range'),
};
const issueText = (issue, labels) => fill(t('{r}：{p}，{w}', '{r}：{p}、{w}', '{r}: {p}, {w}'), { r: RULE_LABEL[issue.rule], p: joinParts(issue.parts || []), w: where(labels, issue.at, issue.to) });

/**
 * 四部和声（满分 100，权重可以用 params.weights 改）：
 *   核心   和弦与低音正确 30（转位不对扣这个和弦的份额；根音或性质不对 = 功能写错 → 硬性失败；和弦数量不对 → 硬性失败）
 *   完成度 音符完整 10（三和弦要有根音和三音，七和弦还要有七音）
 *   技术   导音正确解决 15、七音正确解决 15、无平行五 / 八度 20、无交叉 / 超越 5
 *          （外声部的导音没解决扣满；内声部只是提醒，扣一半；导音、七音被重复记在对应的"解决"项里，扣一半）
 *   质量   声部运动 5：内声部（女中、男高）超过纯四度的跳进每次扣 1，间距、音域问题每次扣 2
 * 例：只出现一次平行五度 → 80/100，扣分写成"−20 平行五度：女中/男高，V7 → I"
 * @param {{ voices, key, meter }} submission 五线谱编辑器的内容
 * @param {{ keyName, tonic, minor?, romans, weights? }} params
 */
export function checkFourPart(submission, { keyName = 'C', tonic = 0, minor = false, romans = [], weights = {} }) {
  const W = { chords: 30, complete: 10, leading: 15, seventh: 15, parallels: 20, crossing: 5, quality: 5, ...weights };
  const { chords, problems } = readFourPart(submission);
  const hardFail = [];
  if (chords.length !== romans.length) {
    hardFail.push({ error: 'chord-count', text: fill(t('应该写 {n} 个和弦，现在认出 {m} 个（每个和弦 4 个音同时开始，上下两行怎么分都可以）', '和音は {n} 個のはずが {m} 個（各和音は 4 音が同時に始まる。上下 2 段への分け方は自由）', 'Expected {n} chords, found {m} (each chord = 4 notes starting together, split between the staves any way you like)'), { n: romans.length, m: chords.length }) });
    // 哪些拍上的音不是 4 个：直接指出来
    problems.slice(0, 3).forEach((p) => hardFail.push({ error: 'chord-count', text: fill(t('{w}：同时有 {c} 个音（四部和声要 4 个）', '{w}：同時に {c} 音（4 声体は 4 音）', '{w}: {c} notes start together (four-part harmony needs 4)'), { w: beatText(p.beat, submission.meter), c: p.count }) }));
  }
  const share = romans.length ? W.chords / romans.length : 0;
  const completeShare = romans.length ? W.complete / romans.length : 0;
  const chordDeductions = []; const completeDeductions = []; const chordInfo = [];
  romans.forEach((roman, i) => {
    const want = parseRomanFigure(roman, keyName);
    const chord = chords[i];
    if (!want) return;
    if (!chord) { // 数量不对已经是硬性失败；没写的和弦也不给这一份的分
      chordDeductions.push(deduct(share, fill(t('第 {i} 个和弦（{r}）还没写', '第 {i} 和音（{r}）がまだない', 'Chord {i} ({r}) is missing'), { i: i + 1, r: roman }), 'chord-count'));
      completeDeductions.push(deduct(completeShare, fill(t('第 {i} 个和弦还没写', '第 {i} 和音がまだない', 'Chord {i} is missing'), { i: i + 1 }), 'chord-count'));
      return;
    }
    let got = identifyChord(chord);
    // 认不出完整和弦、但所有音都属于要求的和弦且有根音（例如少了三音的 C–G）：算"不完整"，不算功能写错
    const members = QUALITY_SETS[want.quality]?.map((x) => mod(want.rootPc + x)) || [];
    if (!got && chord.every((m) => members.includes(mod(m))) && chord.some((m) => mod(m) === want.rootPc)) {
      const bassRel = mod(chord[0] - want.rootPc);
      got = { root: want.rootPc, quality: want.quality, position: Math.max(0, QUALITY_SETS[want.quality].indexOf(bassRel)), seventh: SEVENTHS.includes(want.quality) ? members[3] : null };
    }
    if (!got || got.root !== want.rootPc || got.quality !== want.quality) {
      const text = fill(t('第 {i} 个和弦不是 {r}（功能写错了）', '第 {i} 和音が {r} ではない（機能の誤り）', 'Chord {i} is not {r} (wrong function)'), { i: i + 1, r: roman });
      hardFail.push({ error: 'wrong-chord', text });
      chordDeductions.push(deduct(share, text, 'wrong-chord'));
      return;
    }
    if (got.position !== want.position) chordDeductions.push(deduct(share, fill(t('第 {i} 个和弦（{r}）低音不对：转位写错了', '第 {i} 和音（{r}）のバスが違う：転回形の誤り', 'Chord {i} ({r}): wrong bass note — wrong inversion'), { i: i + 1, r: roman }), 'wrong-inversion'));
    else chordInfo.push(fill(t('{r} 写对了', '{r} は正しい', '{r} is right'), { r: roman }));
    const pcs = new Set(chord.map(mod));
    const third = mod(want.rootPc + (['min', 'dim', 'min7', 'hdim7', 'dim7', 'minmaj7'].includes(want.quality) ? 3 : 4));
    const missing = [];
    if (!pcs.has(want.rootPc)) missing.push(t('根音', '根音', 'root'));
    if (!pcs.has(third)) missing.push(t('三音', '第 3 音', 'third'));
    if (SEVENTHS.includes(want.quality) && got.seventh !== null && !pcs.has(got.seventh)) missing.push(t('七音', '第 7 音', 'seventh'));
    if (missing.length) {
      completeDeductions.push(deduct(completeShare, fill(t('第 {i} 个和弦（{r}）缺少{m}', '第 {i} 和音（{r}）に{m}がない', 'Chord {i} ({r}) is missing its {m}'), {
        i: i + 1, r: roman, m: t(missing.map((m) => m.zh).join('、'), missing.map((m) => m.ja).join('・'), missing.map((m) => m.en).join(' and ')),
      }), 'incomplete-chord'));
    }
  });

  const { issues } = chords.length ? checkSATB(chords, { tonic, minor }) : { issues: [] };
  const of = (rules) => issues.filter((i) => rules.includes(i.rule));
  const leadingDeductions = [
    ...of(['leading-tone']).map((i) => deduct(i.severity === 'error' ? W.leading : Math.ceil(W.leading / 2), issueText(i, romans), 'unresolved-leading-tone')),
    ...of(['doubled-leading']).map((i) => deduct(Math.ceil(W.leading / 2), issueText(i, romans), 'bad-doubling')),
  ];
  const seventhDeductions = [
    ...of(['seventh']).map((i) => deduct(W.seventh, issueText(i, romans), 'unresolved-seventh')),
    ...of(['doubled-seventh']).map((i) => deduct(Math.ceil(W.seventh / 2), issueText(i, romans), 'bad-doubling')),
  ];
  const parallelDeductions = of(['parallel-5', 'parallel-8']).map((i) => deduct(W.parallels, issueText(i, romans), i.rule === 'parallel-5' ? 'parallel-fifths' : 'parallel-octaves'));
  const crossingDeductions = of(['crossing', 'overlap']).map((i) => deduct(W.crossing, issueText(i, romans), 'voice-crossing'));
  const qualityDeductions = [];
  for (let i = 0; i + 1 < chords.length; i += 1) {
    [1, 2].forEach((p) => {
      const leap = Math.abs(chords[i + 1][p] - chords[i][p]);
      if (leap > 5) qualityDeductions.push(deduct(1, fill(t('{p}跳了 {n} 个半音，{w}（内声部尽量保持或级进）', '{p}が半音 {n} 個の跳躍、{w}（内声はなるべく保留か順次進行）', '{p} leaps {n} half steps, {w} (keep inner voices still or stepwise)'), { p: PART_NAME[PARTS[p]], n: leap, w: where(romans, i, i + 1) }), 'rough-voice-leading'));
    });
  }
  of(['spacing', 'range']).forEach((i) => qualityDeductions.push(deduct(2, issueText(i, romans), i.rule)));

  const cover = (max) => coverageDeduction(max, Math.min(chords.length, romans.length), romans.length);
  const items = [
    item('chords', 'core', W.chords, t('和弦与低音正确', '和音とバスが正しい', 'Chords and bass correct'), chordDeductions, chordInfo),
    item('complete', 'completeness', W.complete, t('音符完整', '構成音がそろっている', 'Chord members complete'), completeDeductions),
    item('leading', 'technical', W.leading, t('导音正确解决', '導音の正しい解決', 'Leading tone resolved'), [...cover(W.leading), ...leadingDeductions]),
    item('seventh', 'technical', W.seventh, t('七音正确解决', '第 7 音の正しい解決', 'Seventh resolved'), [...cover(W.seventh), ...seventhDeductions]),
    item('parallels', 'technical', W.parallels, t('无平行五 / 八度', '平行 5・8 度なし', 'No parallel fifths/octaves'), [...cover(W.parallels), ...parallelDeductions]),
    item('crossing', 'technical', W.crossing, t('无交叉 / 超越', '交差・超越なし', 'No crossing/overlap'), [...cover(W.crossing), ...crossingDeductions]),
    item('quality', 'quality', W.quality, t('声部运动质量', '声部の動きの質', 'Quality of voice motion'), [...cover(W.quality), ...qualityDeductions]),
  ];
  return { ...rubric(items, hardFail), chords };
}

// ---------------- 爵士和弦配置（rootless voicing） ----------------
const DEGREE_NAME = { 1: t('根音', '根音', 'root'), 3: t('三音', '第 3 音', '3rd'), 5: t('五音', '第 5 音', '5th'), 7: t('七音', '第 7 音', '7th'), 9: t('9 音', '9th', '9th'), 11: t('11 音', '11th', '11th'), 13: t('13 音', '13th', '13th') };
/** 和弦标记 → { rootPc, byPc: 音级 → 度数, third, seventh, extensions（标记里写出来的最高延伸音，如 m9 的 9、13 的 13）, majorThird } */
export function chordTargets(symbol) {
  const chord = parseChordSymbol(symbol);
  if (!chord) return null;
  const rootPc = parseNote(chord.root).pc;
  const byPc = new Map();
  chord.tones.forEach((tone) => byPc.set(mod(rootPc + tone.semitones), tone.degree));
  const find = (deg) => chord.tones.find((x) => x.degree === deg);
  const top = Math.max(...chord.tones.map((x) => x.degree));
  const third = find(3) ? mod(rootPc + find(3).semitones) : null;
  return {
    symbol, rootPc, byPc, third, seventh: find(7) ? mod(rootPc + find(7).semitones) : null,
    majorThird: find(3)?.semitones === 4, extensions: top > 7 ? [{ degree: top, pc: mod(rootPc + find(top).semitones) }] : [],
  };
}
/** 两个和弦之间各声部的移动（半音）：声部数相同时按高低一一对应，不同时每个音找最近的音 */
export function voiceMotion(a, b) {
  const x = [...a].sort((p, q) => p - q); const y = [...b].sort((p, q) => p - q);
  if (x.length === y.length) return x.map((m, i) => Math.abs(y[i] - m));
  return x.map((m) => Math.min(...y.map((n) => Math.abs(n - m))));
}
/**
 * 爵士和弦配置（满分 100）：
 *   核心   和弦身份正确 30：三音、七音的性质不对（例如 Dm9 写成大三度）= 根本不是这个和弦 → 硬性失败；
 *          写了和弦标记以外的音 → 扣分
 *   完成度 必须音存在 20：标记里写出的延伸音（m9 / maj9 的 9 音、13 和弦的 13 音）；13 音要在七音上方，否则听起来是 6 音（扣一半）
 *   技术   禁止音不存在 10：大三和弦上的纯 11 音（三音上方半音的 avoid note）
 *          Guide tones 15：每个和弦都有三音和七音
 *          Rootless 10：上方声部不弹根音（根音交给低音）
 *   质量   声部进行 10（连续评分）：相邻和弦各声部平均移动 ≤ 1.5 个半音满分，≥ 5 个半音 0 分，中间按比例；
 *          只有前后两个和弦身份都对的连接才计分——"移动最少"不能盖过和弦写对这件事
 *          另外列出做到了的"三音 → 七音"半音 / 全音连接（不加分，作为正面反馈）
 *          音域合理 5：所有音在本实操设定的音域内（params.range，默认 D3–C6）；本实操设定的低音区（params.muddyBelow，默认 E3）以下
 *          相邻两音不能只差一个全音以内（低音区太密会浑浊）。音域与界线是本实操的设定，不是理论上的硬规定
 * @param {{ chords: number[][] } | { voices, key, meter }} submission 每个和弦的音（MIDI）；也可以直接交五线谱（取第一行谱表每个和弦）
 * @param {{ symbols: string[], rootless?: boolean, range?: [number, number], muddyBelow?: number }} params
 */
export function checkJazzVoicing(submission, { symbols = [], rootless = true, range = [50, 84], muddyBelow = 52 } = {}) {
  const stacks = submission.chords || stacksFromStaff(submission);
  const hardFail = [];
  if (stacks.length !== symbols.length) hardFail.push({ error: 'chord-count', text: fill(t('应该有 {n} 个和弦，现在是 {m} 个', '和音は {n} 個のはずが {m} 個', 'Expected {n} chords, found {m}'), { n: symbols.length, m: stacks.length }) });
  const n = Math.max(1, symbols.length);
  const ded = { identity: [], required: [], forbidden: [], guide: [], rootless: [], motion: [], range: [] };
  const info = { identity: [], motion: [] };
  const identityOk = [];
  symbols.forEach((symbol, i) => {
    const want = chordTargets(symbol);
    const notes = stacks[i];
    if (!want) { identityOk[i] = false; return; }
    if (!notes?.length) {
      identityOk[i] = false;
      const text = fill(t('第 {i} 个和弦（{s}）还没写', '第 {i} 和音（{s}）がまだない', 'Chord {i} ({s}) is missing'), { i: i + 1, s: symbol });
      ded.identity.push(deduct(30 / n, text, 'chord-count'));
      ded.required.push(deduct(20 / n, text, 'chord-count'));
      ded.guide.push(deduct(15 / n, text, 'chord-count'));
      return;
    }
    const pcs = new Set(notes.map(mod));
    const label = (k) => fill(t('{s}（第 {i} 个）', '{s}（第 {i} 和音）', '{s} (chord {i})'), { s: symbol, i: i + 1 })[k];
    const at = t(label('zh'), label('ja'), label('en'));
    // 三音 / 七音的性质：出现了"另一种"三音或七音（大三 ↔ 小三，大七 ↔ 小七）= 写成了别的和弦
    const wrongThird = want.third !== null && pcs.has(mod(want.rootPc + (want.majorThird ? 3 : 4))) && !pcs.has(want.third);
    const seventhSemis = want.seventh !== null ? mod(want.seventh - want.rootPc) : null;
    const wrongSeventh = seventhSemis !== null && pcs.has(mod(want.rootPc + (seventhSemis === 11 ? 10 : 11))) && !pcs.has(want.seventh);
    if (wrongThird || wrongSeventh) {
      const text = fill(t('{a}的{d}性质不对，已经不是这个和弦了', '{a} の{d}の種類が違い、別の和音になっている', '{a}: the {d} has the wrong quality — it is a different chord'), { a: at, d: wrongThird ? DEGREE_NAME[3] : DEGREE_NAME[7] });
      hardFail.push({ error: 'wrong-chord', text });
      ded.identity.push(deduct(30 / n, text, 'wrong-chord'));
      identityOk[i] = false;
    } else {
      identityOk[i] = true;
      const foreign = [...pcs].filter((pc) => !want.byPc.has(pc));
      // 纯 11 音（avoid note）单独记在"禁止音"里，这里不重复扣
      const avoid = want.majorThird ? mod(want.third + 1) : null;
      const others = foreign.filter((pc) => pc !== avoid);
      if (others.length) ded.identity.push(deduct(Math.min(30 / n, (30 / n / 2) * others.length), fill(t('{a}里有和弦标记以外的音', '{a} にコード・シンボルにない音がある', '{a} contains notes outside the chord symbol'), { a: at }), 'wrong-note'));
      else info.identity.push(fill(t('{s} 的音都对', '{s} の音はすべて正しい', '{s}: every note belongs'), { s: symbol }));
    }
    // 必须音：标记写出的延伸音；13 音要在七音上方
    want.extensions.forEach((ext) => {
      if (!pcs.has(ext.pc)) ded.required.push(deduct(20 / n, fill(t('{a}缺少 {d}', '{a} に {d} がない', '{a} is missing its {d}'), { a: at, d: DEGREE_NAME[ext.degree] }), 'incomplete-chord'));
      else if (ext.degree === 13 && want.seventh !== null) {
        const sevenths = notes.filter((m) => mod(m) === want.seventh);
        const thirteenths = notes.filter((m) => mod(m) === ext.pc);
        if (sevenths.length && Math.max(...thirteenths) < Math.min(...sevenths)) ded.required.push(deduct(10 / n, fill(t('{a}的 13 音在七音下面，听起来像 6 音', '{a} の 13th が第 7 音より下で 6th に聞こえる', '{a}: the 13th sits below the 7th, so it sounds like a 6th'), { a: at }), 'voicing-register'));
      }
    });
    // 禁止音：大三和弦上的纯 11 音
    if (want.majorThird && pcs.has(mod(want.third + 1))) ded.forbidden.push(deduct(10 / n, fill(t('{a}有纯 11 音：在三音上方半音，和三音冲突（avoid note）', '{a} に完全 11 度：第 3 音の半音上でぶつかる（アヴォイド・ノート）', '{a} has a natural 11th, a half step above the 3rd (avoid note)'), { a: at }), 'avoid-note'));
    // Guide tones：三音和七音
    const missingGuide = [[3, want.third], [7, want.seventh]].filter(([, pc]) => pc !== null && !pcs.has(pc)).map(([d]) => DEGREE_NAME[d]);
    if (missingGuide.length) ded.guide.push(deduct((15 / n) * (missingGuide.length / 2), fill(t('{a}少了{d}（三音和七音决定和弦性质）', '{a} に{d}がない（第 3・7 音が和音の種類を決める）', '{a} lacks its {d} (the 3rd and 7th define the quality)'), { a: at, d: t(missingGuide.map((d) => d.zh).join('、'), missingGuide.map((d) => d.ja).join('・'), missingGuide.map((d) => d.en).join(' and ')) }), 'missing-guide-tone'));
    if (rootless && pcs.has(want.rootPc)) ded.rootless.push(deduct(10 / n, fill(t('{a}弹了根音（这一题根音交给低音）', '{a} で根音を弾いている（根音はベースに任せる）', '{a} plays the root (leave it to the bass here)'), { a: at }), 'root-in-voicing'));
    // 音域
    const out = notes.filter((m) => m < range[0] || m > range[1]);
    if (out.length) ded.range.push(deduct(5 / n, fill(t('{a}有音超出本题的音域', '{a} にこの課題の音域外の音がある', '{a} has notes outside this lab’s range'), { a: at }), 'range'));
    const sorted = [...notes].sort((p, q) => p - q);
    if (sorted.some((m, k) => k > 0 && m < muddyBelow && m - sorted[k - 1] <= 2)) ded.range.push(deduct(5 / n, fill(t('{a}在低音区有两个音靠得太近，会浑浊', '{a} は低音域で 2 音が近すぎて濁る', '{a} has two notes too close together in the low register — muddy'), { a: at }), 'spacing'));
  });
  // 声部进行（连续评分）
  const pairs = Math.max(1, symbols.length - 1);
  let motionPoints = 0;
  for (let i = 0; i + 1 < symbols.length; i += 1) {
    const a = stacks[i]; const b = stacks[i + 1];
    if (!a?.length || !b?.length) {
      ded.motion.push(deduct(10 / pairs, fill(t('{w}：还没写完，这段连接没法听', '{w}：まだ途中で、このつながりは聴けない', '{w}: not finished, nothing to connect yet'), { w: `${symbols[i]} → ${symbols[i + 1]}` }), 'incomplete-work'));
      continue;
    }
    const moves = voiceMotion(a, b);
    const total = moves.reduce((s, x) => s + x, 0);
    const avg = total / moves.length;
    const pairLabel = `${symbols[i]} → ${symbols[i + 1]}`;
    if (!identityOk[i] || !identityOk[i + 1]) {
      ded.motion.push(deduct(10 / pairs, fill(t('{w}：和弦没写对，这段连接不计声部进行分', '{w}：和音が違うので声部進行の点は数えない', '{w}: a chord is wrong, so this connection earns no voice-leading credit'), { w: pairLabel }), 'wrong-chord'));
      continue;
    }
    const fraction = Math.max(0, Math.min(1, (5 - avg) / (5 - 1.5)));
    motionPoints += fraction;
    if (fraction < 1) ded.motion.push(deduct(round((10 / pairs) * (1 - fraction)), fill(t('{w}：各声部一共移动 {s} 个半音（平均 {a}），还可以更"懒"——能保持就保持，其次走半音或全音', '{w}：各声部の移動は合計半音 {s} 個（平均 {a}）。共通音を保ち、次に半音・全音で', '{w}: voices move {s} half steps in total ({a} each) — keep common tones, then move by half or whole step'), { w: pairLabel, s: total, a: round(avg) }), 'rough-voice-leading'));
    else info.motion.push(fill(t('{w}：各声部一共只移动 {s} 个半音，非常顺', '{w}：各声部の移動は合計半音 {s} 個だけ。とても滑らか', '{w}: only {s} half steps of motion in total — very smooth'), { w: pairLabel, s: total }));
    // 三音 → 七音的连接（正面反馈）
    const ta = chordTargets(symbols[i]); const tb = chordTargets(symbols[i + 1]);
    const link = (fromPc, toPc) => a.some((m) => mod(m) === fromPc && b.some((x) => mod(x) === toPc && Math.abs(x - m) <= 2));
    if (ta && tb && (link(ta.third, tb.seventh) || link(ta.seventh, tb.third))) info.motion.push(fill(t('{w}：三音和七音之间是级进连接（guide-tone line）', '{w}：第 3 音と第 7 音が順次進行でつながっている（ガイド・トーン・ライン）', '{w}: 3rd and 7th connect by step (a guide-tone line)'), { w: pairLabel }));
  }
  const written = Math.min(stacks.filter((x) => x?.length).length, symbols.length);
  ded.forbidden.unshift(...coverageDeduction(10, written, symbols.length));
  ded.rootless.unshift(...coverageDeduction(10, written, symbols.length));
  ded.range.unshift(...coverageDeduction(5, written, symbols.length));
  const items = [
    item('identity', 'core', 30, t('和弦身份正确', '和音が正しい', 'Chord identity'), ded.identity, info.identity),
    item('required', 'completeness', 20, t('必须音存在', '必要な音がある', 'Required tones present'), ded.required),
    item('forbidden', 'technical', 10, t('禁止音不存在', '避けるべき音がない', 'No avoid notes'), ded.forbidden),
    item('guide', 'technical', 15, t('Guide tones（三音与七音）', 'ガイド・トーン（第 3・7 音）', 'Guide tones (3rd and 7th)'), ded.guide),
    ...(rootless ? [item('rootless', 'technical', 10, t('Rootless（不弹根音）', 'ルートレス（根音なし）', 'Rootless'), ded.rootless)] : []),
    item('motion', 'quality', 10, t('声部进行', '声部進行', 'Voice leading'), ded.motion, info.motion),
    item('range', 'quality', 5, t('音域合理', '音域が適切', 'Sensible register'), ded.range),
  ];
  return { ...rubric(items, hardFail), stacks };
}
/** 五线谱的第一行（大谱表时也加上第二行同时开始的音）里，每个同时开始的音组成一个和弦 */
function stacksFromStaff({ voices, key = 0, meter = [4, 4] }) {
  const up = timedEvents(voices?.[0], meter, key);
  const low = timedEvents(voices?.[1], meter, key);
  return up.filter((u) => !u.e.rest && !u.e.tiedIn).map((u) => {
    const l = low.find((x) => Math.abs(x.beat - u.beat) < EPS && !x.e.rest);
    return [...(l ? l.e.notes : []), ...u.e.notes].map(noteMidi).sort((a, b) => a - b);
  });
}

// ---------------- 节奏（按事件判定） ----------------
/** 拍号 → 每小节多少四分音符、每拍多少四分音符（复拍子 6/8、9/8、12/8 一拍 = 附点四分） */
export function meterInfo(meter) {
  const [top, bottom] = Array.isArray(meter) ? meter.map(Number) : String(meter).split('/').map(Number);
  const compound = top % 3 === 0 && top > 3 && bottom >= 8;
  return { top, bottom, bar: (top * 4) / bottom, beat: compound ? (3 * 4) / bottom : 4 / bottom, text: `${top}/${bottom}` };
}
/**
 * 五线谱的一行 → 节奏事件 [{ start, dur, rest, tiedSegments, pitch }]（四分音符 = 1）；连音线连起来的音合成一个事件
 * 同时找出"不合法"的写法：连音线连到休止符或不同音高的音（连音线只连同音高的音）
 */
export function staffRhythm({ voices, meter = [4, 4] }) {
  const events = voices?.[0] || [];
  const out = []; const illegal = [];
  let beat = 0; let open = null;
  events.forEach((e, idx) => {
    const dur = durationBeats(e.duration, e.dots);
    const pitch = e.rest ? null : e.notes.map((nn) => `${nn.letter}${nn.alter ?? 0}${nn.octave}`).sort().join(',');
    if (open) {
      if (e.rest || pitch !== open.pitch) {
        illegal.push({ at: open.start, kind: e.rest ? 'tie-to-rest' : 'tie-pitch' });
        open = null;
      } else {
        open.dur += dur; open.tiedSegments += 1;
        if (!e.tie) open = null;
        beat += dur;
        return;
      }
    }
    const ev = { start: beat, dur, rest: Boolean(e.rest), tiedSegments: 1, pitch, index: idx };
    if (e.rest && e.tie) illegal.push({ at: beat, kind: 'tie-on-rest' });
    out.push(ev);
    if (!e.rest && e.tie) open = ev;
    beat += dur;
  });
  if (open) illegal.push({ at: open.start, kind: 'tie-dangling' });
  return { events: out, illegal, total: beat, meter: meterInfo(meter) };
}
/** 节奏型网格（'0' 休止、'x'/'X' 起音、'-' 延长前一个音）→ 节奏事件；延长过拍点等同于连音线 */
export function gridRhythm({ cells = [], meter = '4/4', subdivision = 8 }) {
  const cell = 4 / Number(subdivision);
  const out = []; const illegal = [];
  cells.forEach((c, i) => {
    const start = i * cell;
    if (c === 'x' || c === 'X') out.push({ start, dur: cell, rest: false, tiedSegments: 1, pitch: 'x' });
    else if (c === '-') {
      const last = out[out.length - 1];
      if (!last || last.rest) { illegal.push({ at: start, kind: 'tie-to-rest' }); out.push({ start, dur: cell, rest: true, tiedSegments: 1 }); return; }
      last.dur += cell; last.tiedSegments += 1;
    } else out.push({ start, dur: cell, rest: true, tiedSegments: 1 });
  });
  return { events: out, illegal, total: cells.length * cell, meter: meterInfo(meter) };
}
/** 节奏分析：反拍起音、跨拍连音（或延长）、切分 */
export function analyzeRhythm({ events, meter }) {
  const onBeat = (x) => Math.abs(x / meter.beat - Math.round(x / meter.beat)) < EPS;
  const nextBeat = (x) => (Math.floor(x / meter.beat + EPS) + 1) * meter.beat;
  const attacks = events.filter((e) => !e.rest);
  const offbeats = attacks.filter((e) => !onBeat(e.start));
  // 跨拍连音：连音线（或网格里的延长）连起来的音，中间跨过一个拍点
  const tiesAcross = attacks.filter((e) => e.tiedSegments > 1 && nextBeat(e.start) < e.start + e.dur - EPS);
  // 切分：反拍起音并延长过下一个拍点（连音线、附点），或者拍点上是休止、紧接着反拍起音
  const syncopations = offbeats.filter((e) => {
    if (nextBeat(e.start) < e.start + e.dur - EPS) return true;
    const beatStart = Math.floor(e.start / meter.beat + EPS) * meter.beat;
    return events.some((r) => r.rest && Math.abs(r.start - beatStart) < EPS && r.start + r.dur <= e.start + EPS);
  });
  return { attacks, offbeats, tiesAcross, syncopations, onBeat };
}
const positionText = (start, meter) => {
  const bar = Math.floor(start / meter.bar + EPS);
  const inBar = start - bar * meter.bar;
  const beat = Math.floor(inBar / meter.beat + EPS) + 1;
  const off = inBar - (beat - 1) * meter.beat;
  return off < EPS ? t(`第 ${bar + 1} 小节第 ${beat} 拍`, `${bar + 1} 小節目 ${beat} 拍`, `bar ${bar + 1}, beat ${beat}`) : t(`第 ${bar + 1} 小节第 ${beat} 拍后半`, `${bar + 1} 小節目 ${beat} 拍の裏`, `bar ${bar + 1}, after beat ${beat}`);
};
/**
 * 节奏实操（按事件判定，满分 100）。例：写两小节 4/4，至少三个反拍起音、一个跨拍连音、一个切分。
 *   完成度 拍号 / 总时值正确 20（拍号不对 → 硬性失败；总时值不对扣 10）
 *   核心   反拍起音 25（部分得分：做到 2/3 → 约 17 分）、形成切分 20
 *   技术   跨拍连音 20、无非法时值 10（连音线连到休止或不同音高、每格少于设定的最短时值）
 *   质量   节奏结构 5（本实操的设定：每小节第一拍要有起音或休止开头的明确拍点——至少一个起音落在拍点上，让拍号仍然听得出来）
 * @param submission 五线谱 { voices, meter } 或节奏型网格 { cells, meter, subdivision }
 * @param {{ meter, measures?, offbeats?, tiesAcross?, syncopations?, minDur? }} params
 */
export function checkRhythm(submission, params = {}) {
  const parsed = submission.cells ? gridRhythm(submission) : staffRhythm(submission);
  const { meter } = parsed;
  const want = params.meter ? meterInfo(params.meter) : meter;
  const hardFail = [];
  if (params.meter && want.text !== meter.text) hardFail.push({ error: 'wrong-meter', text: fill(t('拍号应该是 {m}，现在是 {g}', '拍子は {m} のはず（今は {g}）', 'The meter should be {m}, not {g}'), { m: want.text, g: meter.text }) });
  const setting = [];
  if (params.measures && Math.abs(parsed.total - params.measures * want.bar) > EPS) setting.push(deduct(10, fill(t('总时值应该是 {n} 小节（{b} 拍），现在是 {g} 拍', '全体で {n} 小節（{b} 拍）のはずが {g} 拍', 'Total should be {n} bars ({b} beats), found {g}'), { n: params.measures, b: params.measures * want.bar, g: round(parsed.total) }), 'wrong-length'));
  if (params.subdivision && submission.subdivision && Number(submission.subdivision) !== params.subdivision) setting.push(deduct(10, fill(t('每格应该是 1/{s}', '1 マスは 1/{s}', 'Each cell should be 1/{s}'), { s: params.subdivision }), 'wrong-meter'));
  const a = analyzeRhythm(parsed);
  const partial = (found, need, max, error, tplMissing, tplOk) => {
    if (!need) return { max: 0 };
    const got = Math.min(found.length, need);
    return {
      max, deductions: got < need ? [deduct((max * (need - got)) / need, fill(tplMissing, { n: need, g: found.length }), error)] : [],
      info: got >= need ? [fill(tplOk, { n: found.length, w: t(...['zh', 'ja', 'en'].map((l) => found.slice(0, 4).map((e) => positionText(e.start, meter)[l]).join(l === 'en' ? '; ' : '；'))) })] : [],
    };
  };
  const off = partial(a.offbeats, params.offbeats, 25, 'misplaced-onset', t('反拍起音需要 {n} 个，现在 {g} 个', '裏拍の打点が {n} 個必要、今 {g} 個', 'Need {n} off-beat attacks, found {g}'), t('反拍起音 {n} 个：{w}', '裏拍の打点 {n} 個：{w}', '{n} off-beat attacks: {w}'));
  const ties = partial(a.tiesAcross, params.tiesAcross, 20, 'missing-tie', t('跨拍连音需要 {n} 个，现在 {g} 个（连音线连起来的音要跨过一个拍点）', '拍をまたぐタイが {n} 個必要、今 {g} 個', 'Need {n} tie(s) across a beat, found {g}'), t('跨拍连音：{w}', '拍をまたぐタイ：{w}', 'Tie across the beat: {w}'));
  const sync = partial(a.syncopations, params.syncopations, 20, 'missing-syncopation', t('切分需要 {n} 处，现在 {g} 处（反拍起音并延长过下一个拍点，或拍点上休止再反拍起音）', 'シンコペーションが {n} 必要、今 {g}', 'Need {n} syncopation(s), found {g} (an off-beat attack held over the next beat, or a rest on the beat)'), t('切分：{w}', 'シンコペーション：{w}', 'Syncopation: {w}'));
  const illegal = parsed.illegal.map((x) => deduct(5, fill({
    'tie-to-rest': t('{w}：连音线连到了休止符（连音线不用在休止符上）', '{w}：タイが休符につながっている', '{w}: a tie runs into a rest (rests are never tied)'),
    'tie-on-rest': t('{w}：休止符上不能有连音线', '{w}：休符にタイは付けない', '{w}: rests cannot carry ties'),
    'tie-pitch': t('{w}：连音线连到了不同音高的音（连音线只连同音高）', '{w}：タイが違う高さの音につながっている', '{w}: a tie joins two different pitches'),
    'tie-dangling': t('{w}：连音线后面没有音', '{w}：タイの先に音がない', '{w}: a tie leads nowhere'),
  }[x.kind], { w: positionText(x.at, meter) }), 'illegal-duration'));
  if (params.minDur) parsed.events.filter((e) => e.dur < params.minDur - EPS && e.tiedSegments === 1).forEach((e) => illegal.push(deduct(5, fill(t('{w}：时值比本题允许的最短时值还短', '{w}：この課題の最短音価より短い', '{w}: shorter than the shortest value allowed here'), { w: positionText(e.start, meter) }), 'illegal-duration')));
  if (!a.attacks.length) {
    illegal.unshift(deduct(10, t('还没有写任何音', 'まだ音がない', 'Nothing written yet'), 'incomplete-work'));
    setting.push(deduct(20, t('还没有写任何音', 'まだ音がない', 'Nothing written yet'), 'incomplete-work'));
  }
  const bars = Math.max(1, Math.round(parsed.total / meter.bar));
  const structure = [];
  for (let b = 0; b < bars; b += 1) {
    const inBar = a.attacks.filter((e) => e.start >= b * meter.bar - EPS && e.start < (b + 1) * meter.bar - EPS);
    if (inBar.length && !inBar.some((e) => a.onBeat(e.start))) structure.push(deduct(2.5, fill(t('第 {b} 小节没有任何起音落在拍点上，拍子听不出来了', '{b} 小節目は拍の頭に打点がなく、拍子が聞こえない', 'Bar {b} has no attack on any beat — the meter disappears'), { b: b + 1 }), 'lost-pulse'));
  }
  if (!a.attacks.length) structure.push(deduct(5, t('还没有写任何音', 'まだ音がない', 'Nothing written yet'), 'incomplete-work'));
  const items = [
    item('meter', 'completeness', 20, t('拍号 / 总时值', '拍子・全体の長さ', 'Meter and total length'), setting),
    ...(off.max ? [item('offbeats', 'core', off.max, t('反拍起音', '裏拍の打点', 'Off-beat attacks'), off.deductions, off.info)] : []),
    ...(ties.max ? [item('ties', 'technical', ties.max, t('跨拍连音', '拍をまたぐタイ', 'Tie across the beat'), ties.deductions, ties.info)] : []),
    ...(sync.max ? [item('syncopation', 'core', sync.max, t('切分', 'シンコペーション', 'Syncopation'), sync.deductions, sync.info)] : []),
    item('legal', 'technical', 10, t('无非法时值', '不正な音価なし', 'No illegal durations'), illegal),
    item('structure', 'quality', 5, t('节奏结构合理', 'リズムの構造', 'Rhythmic structure'), structure),
  ];
  return { ...rubric(items, hardFail), analysis: { offbeats: a.offbeats.length, tiesAcross: a.tiesAcross.length, syncopations: a.syncopations.length } };
}
/** 旧名字：节奏型网格的检查（和 checkRhythm 相同） */
export const checkRhythmGrid = (submission, params) => checkRhythm(submission, params);

// ---------------- 复节奏网格 ----------------
/** a:b 复节奏的标准网格：a × b 格，a 那一行每 b 格一个起音，b 那一行每 a 格一个起音 */
export function polyGrid(a, b) {
  const n = a * b;
  return [Array.from({ length: n }, (_, i) => i % b === 0), Array.from({ length: n }, (_, i) => i % a === 0)];
}
/**
 * 复节奏网格：逐个起音比较。正确 +1、漏掉不得分、多打 −1，最后换算成百分比
 * 例：3:2 一共 5 个起音（3 + 2；第一格两行都有）
 * @param {{ rows: boolean[][] }} submission 两行格子（true = 起音）
 * @param {{ ratio: [number, number] }} params
 */
export function checkPolyGrid(submission, { ratio = [3, 2] } = {}) {
  const want = polyGrid(ratio[0], ratio[1]);
  const rows = submission.rows || [];
  const name = [t(`${ratio[0]} 的一行`, `${ratio[0]} の段`, `The ${ratio[0]} row`), t(`${ratio[1]} 的一行`, `${ratio[1]} の段`, `The ${ratio[1]} row`)];
  const items = want.map((row, r) => {
    const expected = row.filter(Boolean).length;
    const got = rows[r] || [];
    const hits = row.filter((x, i) => x && got[i]).length;
    const extra = got.filter((x, i) => x && !row[i]).length;
    const missedCells = row.map((x, i) => (x && !got[i] ? i + 1 : null)).filter(Boolean);
    const extraCells = got.map((x, i) => (x && !row[i] ? i + 1 : null)).filter(Boolean);
    const per = 50 / expected;
    const deductions = [
      ...(missedCells.length ? [deduct(per * missedCells.length, fill(t('{r}漏了第 {c} 格', '{r}の {c} マス目が抜けている', '{r} misses cell(s) {c}'), { r: name[r], c: missedCells.join(', ') }), 'tap-missed')] : []),
      ...(extraCells.length ? [deduct(per * extraCells.length, fill(t('{r}多了第 {c} 格', '{r}の {c} マス目が余分', '{r} has extra cell(s) {c}'), { r: name[r], c: extraCells.join(', ') }), 'tap-extra')] : []),
    ];
    return item(`row${r}`, 'core', 50, name[r], deductions, hits === expected && !extra ? [fill(t('{r}全对', '{r}は全部正しい', '{r} is exact'), { r: name[r] })] : []);
  });
  return rubric(items);
}

// ---------------- 复节奏与节拍调制 ----------------
/** 节拍调制的新速度（与复节奏工具同一个公式：poly_meter.js 的 metricModulation） */
export function metricModulationTempo(oldTempo, presetId) {
  const preset = PRESETS.find((p) => p.id === presetId);
  return preset ? metricModulation({ oldTempo, ...preset }).newTempo : NaN;
}
/**
 * submission：复节奏工具的状态 { ratio: [a, b], polyPlayed, mm: { preset, oldTempo, played } }，以及玩家自己算出的 answer（新速度）
 * 评分：复节奏比例 25、新速度计算 35、工具里的设置 20、实际试听 20（只用到其中几项时按比例换算成 100）
 */
export function checkTempoLab(submission, params = {}) {
  const items = [];
  if (params.ratio) {
    const [a, b] = submission.ratio || [];
    const ok = (a === params.ratio[0] && b === params.ratio[1]) || (a === params.ratio[1] && b === params.ratio[0]);
    items.push(item('ratio', 'core', 25, t('复节奏比例', 'ポリリズムの比', 'Polyrhythm ratio'), ok ? [] : [deduct(25, fill(t('比例应该是 {w}，现在是 {g}', '比は {w}（今は {g}）', 'Ratio should be {w}, found {g}'), { w: params.ratio.join(':'), g: (submission.ratio || []).join(':') || '—' }), 'wrong-ratio')]));
  }
  if (params.mm) {
    const expected = metricModulationTempo(params.mm.oldTempo, params.mm.preset);
    const answerOk = Math.abs(Number(submission.answer) - expected) <= 0.5 && submission.answer !== null && submission.answer !== undefined;
    items.push(item('answer', 'core', 35, t('新速度的计算', '新テンポの計算', 'New tempo calculation'), answerOk ? [] : [deduct(35, fill(t('新速度算得不对：填的是 {g}', '新テンポが違う：入力は {g}', 'The new tempo is off: you entered {g}'), { g: submission.answer ?? '—' }), 'tempo-calculation')], answerOk ? [fill(t('自己算出了新速度 {v}', '新テンポ {v} を自分で計算できた', 'You worked out the new tempo, {v}'), { v: round(expected) })] : []));
    const mm = submission.mm || {};
    const setting = [];
    if (Number(mm.oldTempo) !== params.mm.oldTempo) setting.push(deduct(10, fill(t('旧速度应该设成 {v}', '旧テンポは {v}', 'Old tempo should be {v}'), { v: params.mm.oldTempo }), 'tool-setting'));
    if (mm.preset !== params.mm.preset) setting.push(deduct(10, t('节拍调制的做法没有选对', 'メトリック・モジュレーションのやり方が違う', 'Wrong metric-modulation type selected'), 'tool-setting'));
    items.push(item('setting', 'completeness', 20, t('工具里的设置', 'ツールの設定', 'Tool settings'), setting));
  }
  if (params.mustPlay) {
    const missing = [];
    if (params.ratio && !submission.polyPlayed) missing.push(deduct(10, t('还没有播放复节奏', 'ポリリズムをまだ再生していない', 'Polyrhythm not played yet'), 'not-auditioned'));
    if (params.mm && !submission.mm?.played) missing.push(deduct(10, t('还没有试听节拍调制的前后对比', 'メトリック・モジュレーションの前後をまだ聴いていない', 'Metric-modulation before/after not played yet'), 'not-auditioned'));
    items.push(item('played', 'quality', 20, t('实际试听', '試聴', 'Auditioned'), missing));
  }
  return rubric(items);
}

// ---------------- 集合级 ----------------
const samePcs = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((x, i) => Number(x) === b[i]);
/** 一步步填的答案 { normal, prime, vector }：标准顺序 30、原型 40、音程级向量 30 */
export function checkSetClass(submission, { pcs }) {
  const want = { normal: normalOrder(pcs), prime: primeForm(pcs), vector: intervalVector(pcs) };
  const step = (id, layer, max, label, error) => {
    const ok = samePcs(submission[id], want[id]);
    return item(id, layer, max, label, ok ? [] : [deduct(max, fill(t('{l}应该是 [{w}]', '{l}は [{w}]', '{l} should be [{w}]'), { l: label, w: want[id].join(', ') }), error)], ok ? [fill(t('{l}算对了', '{l}は正しい', '{l} is right'), { l: label })] : []);
  };
  return rubric([
    step('normal', 'technical', 30, t('标准顺序', '正規順序', 'Normal order'), 'normal-order'),
    step('prime', 'core', 40, t('原型', 'プライム・フォーム', 'Prime form'), 'prime-form'),
    step('vector', 'technical', 30, t('音程级向量', '音程クラス・ベクトル', 'Interval vector'), 'interval-vector'),
  ]);
}

// ---------------- 谱上的集合类与十二音行 ----------------
/** 两行谱上同一时刻开始的音合成一组（被连音线连过来的不算新起音），按时间排好 */
function onsetGroups(submission) {
  const meter = submission.meter || [4, 4];
  const groups = new Map();
  (submission.voices || []).forEach((events) => {
    let prev = null;
    timedEvents(events || [], meter, submission.key || 0).forEach(({ beat, e }) => {
      const midis = e.rest ? [] : e.notes.map(noteMidi);
      const tiedIn = Boolean(prev && prev.tie && midis.length && midis.every((m) => prev.midis.includes(m)));
      prev = { tie: !e.rest && e.tie, midis };
      if (!midis.length || tiedIn) return;
      const k = Math.round(beat * 1000);
      groups.set(k, [...(groups.get(k) || []), ...midis]);
    });
  });
  return [...groups.entries()].sort((a, b) => a[0] - b[0]).map(([, midis]) => midis);
}
const pcsOf = (midis) => [...new Set(midis.map(mod))].sort((a, b) => a - b);
const zeroed = (pcs) => { const n = normalOrder(pcs); return n.map((x) => mod(x - n[0])).join(','); };
/**
 * 写出同一集合类的几个成员（如三个 (014) 三和弦）：满分 100
 *   核心   成员正确 50（每个和弦一份；音级集合的原型不是要求的那个就不给这一份）
 *   技术   彼此不同 20（标准顺序不重复）；Tn 与 In 两种关系都要出现 30（各 15：移位相关 = 标准顺序移到 0 相同；倒影相关 = 不同但原型相同）
 * @param {{ prime: number[], count: number }} params
 */
export function checkSetWrite(submission, { prime = [0, 1, 4], count = 3 } = {}) {
  const want = prime.join(',');
  const chords = onsetGroups(submission).filter((m) => m.length >= 2).map(pcsOf);
  const share = 50 / count;
  const members = []; const memberDed = []; const info = [];
  for (let i = 0; i < count; i += 1) {
    const pcs = chords[i];
    if (!pcs) { memberDed.push(deduct(share, fill(t('第 {i} 个和弦还没写', '第 {i} 和音がまだない', 'Chord {i} is missing'), { i: i + 1 }), 'incomplete-work')); continue; }
    const got = primeForm(pcs).join(',');
    if (got === want) { members.push(pcs); info.push(fill(t('第 {i} 个 [{p}] 属于 ({w})', '第 {i} [{p}] は ({w})', 'Chord {i} [{p}] belongs to ({w})'), { i: i + 1, p: normalOrder(pcs).join(','), w: prime.join('') })); }
    else memberDed.push(deduct(share, fill(t('第 {i} 个和弦 [{p}] 的原型是 ({g})，不是 ({w})', '第 {i} 和音 [{p}] のプライム・フォームは ({g})、({w}) ではない', 'Chord {i} [{p}] has prime form ({g}), not ({w})'), { i: i + 1, p: normalOrder(pcs).join(','), g: got.replace(/,/g, ''), w: prime.join('') }), 'prime-form'));
  }
  const normals = members.map((pcs) => normalOrder(pcs).join(','));
  const dupes = normals.length - new Set(normals).size;
  const distinctDed = [...coverageDeduction(20, members.length, count), ...(dupes ? [deduct(10 * dupes, t('有重复的和弦：每个成员的音级集合要不一样', '同じ和音がある：成員ごとに違う音集合に', 'Repeated chords: each member should be a different pitch-class set'), 'set-relation')] : [])];
  let tn = false; let inv = false;
  for (let a = 0; a < members.length; a += 1) for (let b = a + 1; b < members.length; b += 1) {
    if (normals[a] === normals[b]) continue;
    if (zeroed(members[a]) === zeroed(members[b])) tn = true; else inv = true;
  }
  const relDed = [...(tn ? [] : [deduct(15, t('还没有一对移位（Tn）相关的成员', '移高（Tn）関係のペアがまだない', 'No pair related by transposition (Tn) yet'), 'set-relation')]), ...(inv ? [] : [deduct(15, t('还没有一对倒影（In）相关的成员', '反転（In）関係のペアがまだない', 'No pair related by inversion (In) yet'), 'set-relation')])];
  return rubric([
    item('members', 'core', 50, t('成员正确', '成員が正しい', 'Members of the set class'), memberDed, info),
    item('distinct', 'technical', 20, t('彼此不同', '互いに違う', 'All different'), distinctDed),
    item('relations', 'technical', 30, t('Tn 与 In 关系', 'Tn と In の関係', 'Tn and In relations'), relDed),
  ]);
}

/**
 * 十二音行的行形式（如在低音谱表写出 P0 的 I0）：满分 100
 *   核心   顺序正确 60（每个位置 5 分）；技术 十二个音级都出现 20；完成度 正好 12 个音 20
 *   硬性条件：上面给出的行被改动
 * @param {{ row: number[], form: string, givenStaff?: number, answerStaff?: number }} params
 */
export function checkRowForm(submission, { row = [], form = 'I0', givenStaff = 0, answerStaff = 1 } = {}) {
  const seq = (events) => { let prev = null; const out = []; timedEvents(events || [], submission.meter || [4, 4], submission.key || 0).forEach(({ e }) => { const midis = e.rest ? [] : e.notes.map(noteMidi); const tiedIn = Boolean(prev && prev.tie && midis.length && midis.every((m) => prev.midis.includes(m))); prev = { tie: !e.rest && e.tie, midis }; if (midis.length && !tiedIn) out.push(mod(midis[0])); }); return out; };
  const given = seq(submission.voices?.[givenStaff]);
  const hardFail = given.join(',') === row.map(mod).join(',') ? [] : [{ error: 'row-changed', text: fill(t('上面给出的音列被改动了：应该是 {r}', '与えられた音列が変わっている：正しくは {r}', 'The given row was changed: it should be {r}'), { r: row.join('–') }) }];
  const answer = seq(submission.voices?.[answerStaff]);
  const want = rowForm(row, form);
  const orderDed = want.map((pc, i) => (answer[i] === pc ? null : deduct(5, answer[i] === undefined ? fill(t('第 {i} 个音还没写（应为 {w}）', '第 {i} 音がまだない（{w} のはず）', 'Note {i} is missing (should be {w})'), { i: i + 1, w: pc }) : fill(t('第 {i} 个音是 {g}，应为 {w}', '第 {i} 音は {g}、正しくは {w}', 'Note {i} is {g}; it should be {w}'), { i: i + 1, g: answer[i], w: pc }), 'row-form'))).filter(Boolean);
  const missing = [...Array(12).keys()].filter((pc) => !answer.includes(pc));
  const aggDed = missing.length ? [deduct(Math.min(20, missing.length * 2), fill(t('缺少音级 {m}（十二个音级都要出现）', '音級 {m} がない（12 音すべて必要）', 'Missing pitch classes {m} (all twelve must appear)'), { m: missing.join(', ') }), 'row-form')] : [];
  const countDed = answer.length === 12 ? [] : [deduct(answer.length > 12 ? 10 : 20 * (1 - Math.min(12, answer.length) / 12), fill(t('写了 {n} 个音，应该正好 12 个', '{n} 音書いた、ちょうど 12 音のはず', '{n} notes written; there should be exactly 12'), { n: answer.length }), 'incomplete-work')];
  return { ...rubric([
    item('order', 'core', 60, fill(t('{f} 的顺序', '{f} の順序', 'Order of {f}'), { f: form }), orderDed),
    item('aggregate', 'technical', 20, t('十二个音级都出现', '12 音級がそろう', 'All twelve pitch classes'), aggDed),
    item('count', 'completeness', 20, t('正好 12 个音', 'ちょうど 12 音', 'Exactly twelve notes'), countDed),
  ], hardFail), want };
}

// ---------------- 统一入口 ----------------
// ---------------- 类别对位（定旋律预先写在一行谱上，玩家在另一行写对位） ----------------
/** 规则代码 → 评分项与扣分（error 规则扣得多、warning 只扣一点）；错误类型给 sideb_errors 用 */
const SPECIES_GROUPS = {
  frame: ['start-interval', 'final-interval', 'final-step', 'final-contrary', 'penultimate', 'cadence-suspension'],
  consonance: ['dissonance', 'downbeat-dissonance', 'weak-not-passing', 'weak-unexplained', 'suspension-preparation', 'suspension-resolution', 'suspension-type'],
  parallels: ['parallel-perfect', 'direct-perfect', 'downbeat-parallel', 'downbeat-parallel-3', 'weak-perfect-run', 'suspension-repeat'],
  rhythm: ['rhythm', 'note-value', 'eighth-placement'],
};
const speciesGroup = (rule) => Object.keys(SPECIES_GROUPS).find((g) => SPECIES_GROUPS[g].includes(rule)) || 'line';
const speciesError = (issue) => {
  if (issue.rule === 'parallel-perfect' || issue.rule.startsWith('downbeat-parallel') || issue.rule === 'weak-perfect-run') return /5|12/.test(issue.params?.interval || '') ? 'parallel-fifths' : 'parallel-octaves';
  if (issue.rule === 'direct-perfect') return 'direct-fifths';
  if (issue.rule.startsWith('suspension')) return 'suspension';
  if (issue.rule === 'voice-crossing' || issue.rule === 'voice-overlap') return 'voice-crossing';
  return { frame: 'cp-frame', consonance: 'cp-dissonance', rhythm: 'cp-rhythm', line: 'cp-line' }[speciesGroup(issue.rule)] || 'cp-line';
};
const SPECIES_POINTS = { frame: 10, consonance: 8, parallels: 12.5, rhythm: 5, line: 5 };
const pitchName = (n) => `${n.letter}${({ 1: '#', 2: 'x', '-1': 'b', '-2': 'bb' })[n.alter ?? 0] || ''}${n.octave}`;
/** 一行谱 → 按小节分好的 [{ p, d, tieIn }]（跨小节线的音拆成两段，后一段 tieIn），以及写了几个音 */
function staffBars(events, meter, key, barBeats) {
  const bars = [];
  let prev = null;
  timedEvents(events, meter, key).forEach(({ beat, e }) => {
    const beats = durationBeats(e.duration, e.dots);
    const p = e.rest || !e.notes?.length ? null : pitchName(e.notes[0]);
    const tieIn = Boolean(p && prev && prev.tie && prev.p === p);
    let at = beat; let left = beats; let first = true;
    while (left > EPS) {
      const bar = Math.floor(at / barBeats + EPS);
      const room = (bar + 1) * barBeats - at;
      const d = Math.min(left, room);
      (bars[bar] ||= []).push({ p, d: round(d), ...(p && (tieIn || !first) ? { tieIn: true } : {}) });
      at += d; left -= d; first = false;
    }
    prev = { p, tie: !e.rest && e.tie };
  });
  return bars;
}
/**
 * 类别对位（满分 100，权重可以用 params.weights 改）：
 *   核心   开头与终止 20（do / sol 开始、级进反向到 do、倒数第二个音程是小三度或大六度）
 *          协和与不协和 25（第一类全协和；第二类弱拍只有经过音；第三类经过音 / 辅助音 / 双辅助音 / 换音；第四类挂留的预备与级进下行解决）
 *   技术   无平行 / 直接完全协和 25
 *   完成度 节奏与小节 15（每类该有的时值；没写完的小节按比例扣）
 *   质量   旋律线条 15（旋律不协和音程、高点、音域、反复、交叉 / 超越等）
 *   硬性条件：定旋律被改动
 * @param {{ voices, key, meter }} submission 五线谱编辑器的内容（定旋律在 cantusStaff 那一行）
 * @param {{ species, cantus: string[], position?, cantusStaff?, weights? }} params
 */
export function checkSpecies(submission, { species = 1, cantus = [], position = 'above', cantusStaff, weights = {} }) {
  const W = { frame: 20, consonance: 25, parallels: 25, rhythm: 15, line: 15, ...weights };
  const meter = submission.meter || [4, 4];
  const barBeats = (meter[0] * 4) / meter[1];
  const cfStaff = cantusStaff ?? (position === 'above' ? 1 : 0);
  const cfBars = staffBars(submission.voices?.[cfStaff], meter, submission.key || 0, barBeats);
  const cfNotes = cfBars.flat().filter((n) => n.p && !n.tieIn).map((n) => n.p);
  const hardFail = [];
  const same = cfNotes.length === cantus.length && cfNotes.every((p, i) => p === cantus[i]);
  if (!same) hardFail.push({ error: 'cantus-changed', text: fill(t('定旋律被改动了：应该是 {c}', '定旋律が変わっている：正しくは {c}', 'The cantus firmus was changed: it should be {c}'), { c: cantus.join(' ') }) });
  const raw = staffBars(submission.voices?.[1 - cfStaff], meter, submission.key || 0, barBeats).slice(0, cantus.length);
  const written = raw.filter((bar) => bar?.some((n) => n.p)).length;
  const bars = cantus.map((_, i) => (raw[i]?.length ? raw[i] : [{ p: null, d: barBeats }]));
  let issues = []; let annotations = [];
  if (written) {
    try { ({ issues, annotations } = checkCounterpoint({ species, cantus, bars, position })); } catch (err) { issues = [{ rule: 'rhythm', bar: 0, severity: 'error', params: {} }]; }
  }
  const msg = (issue) => {
    const where = issue.bar !== undefined ? fill(t('第 {n} 小节：', '第 {n} 小節：', 'Bar {n}: '), { n: issue.bar + 1 }) : t('', '', '');
    return t(...['zh', 'ja', 'en'].map((l) => where[l] + (CP_MESSAGES[l]?.[issue.rule] || issue.rule).replace(/\{(\w+)\}/g, (_, k) => issue.params?.[k] ?? '')));
  };
  // 没写的小节：节奏项按比例扣，其他项只按写了的部分给分；空小节本身引出的"节奏不对"不再重复扣
  const emptyBars = new Set(bars.map((b, i) => (b.every((n) => !n.p) ? i : -1)).filter((i) => i >= 0));
  const ENDING = ['final-interval', 'final-step', 'final-contrary', 'penultimate', 'cadence-suspension'];
  const unfinished = emptyBars.has(bars.length - 1);
  const real = issues.filter((i) => !(emptyBars.has(i.bar) && i.rule === 'rhythm') && !(unfinished && ENDING.includes(i.rule)));
  const by = (group) => real.filter((i) => speciesGroup(i.rule) === group).map((i) => deduct(i.severity === 'error' ? SPECIES_POINTS[group] : 3, msg(i), speciesError(i)));
  // 第四类：弱拍的音要用连音线连进下一个强拍（同音高重新奏出不算挂留，ref:omt-species4）
  const untied = species === 4 ? bars.slice(1).map((bar, i) => (bar[0]?.p && !bar[0].tieIn && bar[0].p === bars[i].at(-1)?.p ? i + 1 : -1)).filter((i) => i >= 0) : [];
  const dissonantAt = (bar) => annotations.some((a) => a.bar === bar && a.index === 0 && a.cls === 'dissonant');
  const tieText = (i) => fill(t('第 {n} 小节：强拍的 {p} 应该用连音线从上一小节连过来（不要重新奏出）', '第 {n} 小節：強拍の {p} は前の小節からタイでつなぐ（弾き直さない）', 'Bar {n}: tie the downbeat {p} over from the previous bar (don’t re-strike it)'), { n: i + 1, p: bars[i][0].p });
  // 不协和的强拍重新奏出 = 挂留没有成立（扣在"协和与不协和"）；协和的只扣节奏
  const tieDeductions = untied.filter((i) => !dissonantAt(i)).map((i) => deduct(3, tieText(i), 'missing-tie'));
  const strikeDeductions = untied.filter(dissonantAt).map((i) => deduct(SPECIES_POINTS.consonance, tieText(i), 'suspension'));
  const cover = (max) => coverageDeduction(max, written, cantus.length);
  const items = [
    item('frame', 'core', W.frame, t('开头与终止', '開始と終止', 'Opening and cadence'), [...cover(W.frame), ...by('frame')]),
    item('consonance', 'core', W.consonance, t('协和与不协和的处理', '協和・不協和の扱い', 'Consonance and dissonance'), [...cover(W.consonance), ...by('consonance'), ...strikeDeductions]),
    item('parallels', 'technical', W.parallels, t('无平行 / 直接完全协和', '平行・並達の完全協和なし', 'No parallel or direct perfect intervals'), [...cover(W.parallels), ...by('parallels')]),
    item('rhythm', 'completeness', W.rhythm, t('节奏与小节', 'リズムと小節', 'Rhythm and bars'), [...cover(W.rhythm), ...by('rhythm'), ...tieDeductions]),
    item('line', 'quality', W.line, t('旋律线条', '旋律線', 'Melodic line'), [...cover(W.line), ...by('line')]),
  ];
  return { ...rubric(items, hardFail), bars };
}

export const CHECKERS = { fourPart: checkFourPart, jazzVoicing: checkJazzVoicing, rhythm: checkRhythm, rhythmGrid: checkRhythm, polyGrid: checkPolyGrid, tempo: checkTempoLab, setClass: checkSetClass, species: checkSpecies, setWrite: checkSetWrite, rowForm: checkRowForm };
/** 按实操说明（spec.check + spec.params）给一次提交打分：{ score 0–100, max, passed（没有硬性失败）, hardFail, items } */
export function evaluateLab(spec, submission) {
  const checker = CHECKERS[spec?.check];
  if (!checker) return { score: 0, max: 100, passed: false, hardFail: [{ error: 'unknown-lab', text: t('找不到这个实操任务', '実習が見つからない', 'Unknown lab') }], items: [] };
  return checker(submission || {}, spec.params || {});
}
/** 一次评分里出现的所有错误类型（硬性失败 + 扣分），给技能统计和推荐用 */
export const labErrors = (result) => [...new Set([...(result.hardFail || []).map((h) => h.error), ...(result.items || []).flatMap((i) => i.deductions.map((d) => d.error))].filter(Boolean))];
/** 按评分层汇总（核心 / 技术 / 完成度 / 质量各拿了多少） */
export function layerSummary(result) {
  return Object.fromEntries(LAYERS.map((layer) => {
    const list = (result.items || []).filter((i) => i.layer === layer);
    return [layer, { points: round(list.reduce((s, i) => s + i.points, 0)), max: round(list.reduce((s, i) => s + i.max, 0)) }];
  }).filter(([, v]) => v.max > 0));
}

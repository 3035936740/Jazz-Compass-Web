import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRomanFigure, scoreToChords, checkFourPart, checkJazzVoicing, checkRhythm, checkPolyGrid, polyGrid, checkTempoLab, metricModulationTempo, checkSetClass, evaluateLab, labErrors, layerSummary, item, deduct } from './lab_checks.js';
import { LABS, parseLabRef, labHref } from './sideb_labs.js';
import { ERRORS } from './sideb_errors.js';

const n = (letter, octave, alter = null) => ({ letter, octave, alter, cents: 0 });
const ev = (notes, duration = 'h') => ({ rest: false, duration, dots: 0, tie: false, notes });
/** 大谱表：上行 [女中, 女高]，下行 [男低, 男高] */
const score = (chords, key = 0) => ({ key, meter: [4, 4], clef: 'grand', voices: [chords.map(([b, t, a, s]) => ev([a, s])), chords.map(([b, t]) => ev([b, t]))] });
const ii6 = [n('F', 3), n('D', 4), n('A', 4), n('D', 5)];
const V7 = [n('G', 3), n('F', 4), n('B', 4), n('D', 5)];
const I = [n('C', 3), n('E', 4), n('C', 5), n('C', 5)];
const params = { keyName: 'C', tonic: 0, romans: ['ii6', 'V7', 'I'] };
const ded = (result) => result.items.flatMap((i) => i.deductions.map((d) => [i.id, d.points, d.text.en]));

test('roman numerals with figures', () => {
  assert.deepEqual(parseRomanFigure('ii6', 'C'), { rootPc: 2, quality: 'min', position: 1 });
  assert.deepEqual(parseRomanFigure('V6/5', 'C'), { rootPc: 7, quality: 'dom7', position: 1 });
  assert.deepEqual(parseRomanFigure('V7', 'C'), { rootPc: 7, quality: 'dom7', position: 0 });
  assert.deepEqual(parseRomanFigure('I6/4', 'G'), { rootPc: 7, quality: 'maj', position: 2 });
  assert.deepEqual(parseRomanFigure('viiø7', 'C'), { rootPc: 11, quality: 'hdim7', position: 0 });
});

test('rubric basics: items cap their own deductions; the total is scaled to 100', () => {
  const i = item('p', 'technical', 20, {}, [deduct(20, 'a', 'x'), deduct(20, 'b', 'x')]);
  assert.deepEqual([i.points, i.deductions.map((d) => d.points)], [0, [20, 0]], 'a second instance is still listed, but the item cannot go below 0');
});

test('SATB rubric: a correct ii6–V7–I is 100; one parallel fifth is 80/100 with a named deduction, not a fail', () => {
  const good = score([ii6, V7, I]);
  assert.deepEqual(scoreToChords(good), [[53, 62, 69, 74], [55, 65, 71, 74], [48, 64, 72, 72]]);
  const ok = checkFourPart(good, params);
  assert.deepEqual([ok.score, ok.passed, ok.hardFail], [100, true, []]);
  assert.equal(ok.items.reduce((s, x) => s + x.max, 0), 100);
  // 用户的权重：和弦与低音 30、音符完整 10、导音 15、七音 15、平行 20、交叉 5、声部运动 5
  assert.deepEqual(ok.items.map((x) => [x.id, x.max]), [['chords', 30], ['complete', 10], ['leading', 15], ['seventh', 15], ['parallels', 20], ['crossing', 5], ['quality', 5]]);
  // 只有一处平行五度（女高 D5→G4、男低 G3→C3）
  const one = checkFourPart(score([ii6, [n('G', 3), n('B', 3), n('F', 4), n('D', 5)], [n('C', 3), n('G', 3), n('E', 4), n('G', 4)]]), params);
  assert.deepEqual([one.score, one.passed], [80, true]);
  assert.deepEqual(ded(one), [['parallels', 20, 'Parallel fifth: Soprano/Bass, V7 → I']]);
  assert.equal(ded(one)[0][1], 20);
  assert.equal(one.items.find((x) => x.id === 'parallels').deductions[0].text.zh, '平行五度：女高/男低，V7 → I');
});

test('SATB rubric: small errors cost points, a wrong function blocks the pass', () => {
  // 七音往上走 + 平行五度：扣分，但不是硬性失败
  const bad = checkFourPart(score([ii6, V7, [n('C', 3), n('G', 4), n('C', 5), n('G', 5)]]), params);
  assert.equal(bad.passed, true, 'no fatal error — just deductions');
  assert.ok(bad.score < 80 && bad.score > 0, String(bad.score));
  assert.ok(labErrors(bad).includes('unresolved-seventh') && labErrors(bad).includes('parallel-fifths'));
  // 转位写错：扣这个和弦的份额（30 / 3 = 10）
  const inv = checkFourPart(score([[n('D', 3), n('F', 4), n('A', 4), n('D', 5)], V7, I]), params);
  assert.equal(inv.items.find((x) => x.id === 'chords').points, 20);
  assert.ok(inv.passed);
  // 第一个和弦写成 IV（功能错了）→ 硬性失败
  const wrong = checkFourPart(score([[n('F', 3), n('C', 4), n('A', 4), n('F', 5)], V7, I]), params);
  assert.equal(wrong.passed, false);
  assert.deepEqual(wrong.hardFail.map((h) => h.error), ['wrong-chord']);
  assert.ok(wrong.score > 50, 'the rest of the work still earns points');
  assert.deepEqual(checkFourPart(score([]), params).hardFail.map((h) => h.error), ['chord-count']);
  // 只写了两个和弦：技术与质量项只按写了的 2/3 给分
  const half = checkFourPart(score([ii6, V7]), params);
  assert.ok(Math.abs(half.items.find((x) => x.id === 'parallels').points - 40 / 3) < 0.01);
  assert.equal(half.items.find((x) => x.id === 'chords').points, 20);
});

const symbols = ['Dm9', 'G13', 'Cmaj9'];
test('jazz voicing rubric: smooth rootless voicings score 100; clumsy voice leading only loses the voice-leading points (90/100)', () => {
  const smooth = checkJazzVoicing({ chords: [[53, 57, 60, 64], [53, 57, 59, 64], [52, 55, 59, 62]] }, { symbols });
  assert.deepEqual([smooth.score, smooth.passed], [100, true]);
  assert.deepEqual(smooth.items.map((x) => [x.id, x.max]), [['identity', 30], ['required', 20], ['forbidden', 10], ['guide', 15], ['rootless', 10], ['motion', 10], ['range', 5]]);
  assert.ok(smooth.items.find((x) => x.id === 'motion').info.some((x) => /guide-tone/.test(x.en)), 'positive feedback names the guide-tone line');
  const clumsy = checkJazzVoicing({ chords: [[53, 57, 60, 64], [65, 69, 71, 76], [52, 55, 59, 62]] }, { symbols });
  assert.deepEqual([clumsy.score, clumsy.passed], [90, true]);
  assert.deepEqual(clumsy.items.filter((x) => !x.ok).map((x) => x.id), ['motion']);
});

test('jazz voicing rubric: avoid notes, roots and a low 13th cost points; a wrong 3rd/7th is a fatal error', () => {
  const r = checkJazzVoicing({ chords: [[50, 53, 57, 60, 64], [53, 57, 59, 60, 64], [52, 55, 59, 62]] }, { symbols });
  assert.equal(r.passed, true);
  assert.deepEqual(labErrors(r).sort(), ['avoid-note', 'root-in-voicing', 'rough-voice-leading'].sort());
  // 13 音（E）在七音（F）下面
  const low13 = checkJazzVoicing({ chords: [[53, 57, 60, 64], [52, 57, 59, 65], [52, 55, 59, 62]] }, { symbols });
  assert.ok(labErrors(low13).includes('voicing-register'));
  // Dm9 写成 D 大三度（F♯）：已经不是这个和弦 → 硬性失败；那一段连接不计声部进行分（"最小移动"不能盖过和弦写对）
  const dmaj = checkJazzVoicing({ chords: [[54, 57, 60, 64], [53, 57, 59, 64], [52, 55, 59, 62]] }, { symbols });
  assert.equal(dmaj.passed, false);
  assert.deepEqual(dmaj.hardFail.map((h) => h.error), ['wrong-chord']);
  assert.equal(dmaj.items.find((x) => x.id === 'motion').points, 5);
});

// 节奏：两小节 4/4，至少三个反拍起音、一个跨拍连音、一处切分
const note = (duration, extra = {}) => ({ rest: false, duration, dots: 0, tie: false, notes: [n('C', 5)], ...extra });
const rhythmParams = { meter: [4, 4], measures: 2, offbeats: 3, tiesAcross: 1, syncopations: 1 };
test('rhythm is judged by events, with partial credit (2 of 3 off-beats ≈ 17 of 25)', () => {
  const good = [note('q'), note('e'), note('e', { tie: true }), note('e'), note('e'), note('q'), note('e'), note('q'), note('e'), note('q'), note('q')];
  const r = checkRhythm({ voices: [good], meter: [4, 4] }, rhythmParams);
  assert.deepEqual([r.score, r.passed], [100, true]);
  assert.deepEqual(r.items.map((x) => [x.id, x.max]), [['meter', 20], ['offbeats', 25], ['ties', 20], ['syncopation', 20], ['legal', 10], ['structure', 5]]);
  const two = [note('q'), note('e'), note('e'), note('q'), note('q'), note('q'), note('e'), note('e'), note('h')];
  const p = checkRhythm({ voices: [two], meter: [4, 4] }, rhythmParams);
  const off = p.items.find((x) => x.id === 'offbeats');
  assert.ok(Math.abs(off.points - 25 * 2 / 3) < 0.01, String(off.points));
  assert.equal(p.passed, true, 'missing parts cost points but are not fatal');
  // 拍号不对 = 硬性失败；连音线连到休止 = 非法时值
  assert.deepEqual(checkRhythm({ voices: [good], meter: [3, 4] }, rhythmParams).hardFail.map((h) => h.error), ['wrong-meter']);
  const tieRest = checkRhythm({ voices: [[note('h', { tie: true }), { rest: true, duration: 'h', dots: 0, tie: false, notes: [] }]], meter: [4, 4] }, { meter: [4, 4] });
  assert.ok(labErrors(tieRest).includes('illegal-duration'));
  // 网格：反拍起音延长过拍点 = 切分；6/8 一拍是附点四分
  assert.equal(checkRhythm({ cells: ['x', 'x', '-', '-', 'x', '0', 'x', '0'], meter: '4/4', subdivision: 8 }, { meter: '4/4', syncopations: 1 }).score, 100);
  assert.equal(checkRhythm({ cells: ['x', 'x', '-', '-', '0', '0'], meter: '6/8', subdivision: 8 }, { syncopations: 1 }).items.find((x) => x.id === 'syncopation').ok, true);
  assert.equal(checkRhythm({ cells: ['x', '0', 'x', '0', 'x', '0', 'x', '0'], meter: '4/4', subdivision: 8 }, { syncopations: 1 }).items.find((x) => x.id === 'syncopation').ok, false);
});

test('polyrhythm grid: every onset compared — +1 right, −1 extra', () => {
  assert.deepEqual(polyGrid(3, 2).map((r) => r.map((x) => (x ? 'X' : '.')).join(' ')), ['X . X . X .', 'X . . X . .']);
  const exact = checkPolyGrid({ rows: polyGrid(3, 2) }, { ratio: [3, 2] });
  assert.equal(exact.score, 100);
  // 3 的一行漏 1 个（−1/3 × 50），2 的一行多 1 个（−1/2 × 50）
  const rows = [[1, 0, 1, 0, 0, 0], [1, 0, 0, 1, 0, 1]].map((r) => r.map(Boolean));
  assert.equal(checkPolyGrid({ rows }, { ratio: [3, 2] }).score, 58);
});

test('tempo lab and set-class lab give partial credit', () => {
  assert.equal(metricModulationTempo(96, 'keepSub'), 64);
  const p = { ratio: [3, 2], mm: { oldTempo: 96, preset: 'keepSub' }, mustPlay: true };
  assert.equal(checkTempoLab({ ratio: [2, 3], polyPlayed: true, answer: 64, mm: { oldTempo: 96, preset: 'keepSub', played: true } }, p).score, 100);
  // 算对了，但还没试听复节奏：只扣试听的一半
  const unplayed = checkTempoLab({ ratio: [3, 2], polyPlayed: false, answer: 64, mm: { oldTempo: 96, preset: 'keepSub', played: true } }, p);
  assert.equal(unplayed.score, 90);
  const wrong = checkTempoLab({ ratio: [4, 3], polyPlayed: false, answer: 144, mm: { oldTempo: 90, preset: 'triplet' } }, p);
  assert.deepEqual(labErrors(wrong), ['wrong-ratio', 'tempo-calculation', 'tool-setting', 'not-auditioned']);
  assert.equal(wrong.score, 0);
  assert.equal(checkSetClass({ normal: [0, 4, 7], prime: [0, 3, 7], vector: [0, 0, 1, 1, 1, 0] }, { pcs: [7, 0, 4] }).score, 100);
  const half = checkSetClass({ normal: [0, 4, 7], prime: [0, 4, 7], vector: [0, 0, 1, 1, 1, 0] }, { pcs: [7, 0, 4] });
  assert.deepEqual([half.score, labErrors(half)], [60, ['prime-form']]);
  assert.deepEqual(layerSummary(half), { core: { points: 0, max: 40 }, technical: { points: 60, max: 60 } });
});

test('registered labs: every lab scores an empty attempt without crashing, and every error type has advice', () => {
  for (const [id, lab] of Object.entries(LABS)) {
    const r = evaluateLab(lab, lab.tool === 'staff' ? { voices: [[], []], key: 0, meter: lab.setup?.meter || [4, 4] } : {});
    assert.equal(r.max, 100, id);
    assert.equal(r.score, 0, `${id}: an empty attempt earns nothing — no free points for errors that cannot happen yet`);
    labErrors(r).forEach((e) => assert.ok(ERRORS[e], `${id}: ${e} has no advice`));
    assert.ok(lab.breakthrough?.id, `${id} has a breakthrough moment`);
  }
  assert.deepEqual(parseLabRef('vl-ii6-V7-I@ex'), { id: 'vl-ii6-V7-I', mode: 'ex' });
  assert.deepEqual(parseLabRef('vl-ii6-V7-I'), { id: 'vl-ii6-V7-I', mode: 'level' });
  assert.equal(labHref(LABS['vl-ii6-V7-I'], 'chapter'), '#staff?q=%40lab%3Avl-ii6-V7-I%40chapter');
  assert.deepEqual(evaluateLab({ check: 'nope' }, {}).hardFail.map((h) => h.error), ['unknown-lab']);
});

test('four-part input is flexible: any split between the staves, tied-over notes ignored, wrong counts reported', async () => {
  const { groupFourPart } = await import('./satb_check.js');
  const e = (beat, midis, extra = {}) => ({ beat, beats: 2, midis, source: 0, ...extra });
  // 3 + 1、2 + 2、4 + 0 都认得
  const r = groupFourPart([[e(0, [62, 69, 74]), e(2, [65, 71]), e(4, [48, 64, 72, 79])], [e(0, [53]), e(2, [55, 74])]]);
  assert.deepEqual(r.chords, [[53, 62, 69, 74], [55, 65, 71, 74], [48, 64, 72, 79]]);
  assert.deepEqual(r.refs[0].parts.map((p) => p.staff), [1, 0, 0, 0]);
  // 连音线延续的音不算新和弦；3 个音的拍报出来
  const tied = groupFourPart([[e(0, [62, 69, 74]), e(2, [62, 69, 74], { tiedIn: true }), e(4, [64, 72])], [e(0, [53]), e(4, [48])]]);
  assert.equal(tied.chords.length, 1);
  assert.deepEqual(tied.problems, [{ beat: 4, count: 3 }]);
  // 评分器用同一套：3 + 1 的正确 ii6–V7–I 得 100；少一个音时指出是哪一拍
  const ev2 = (notes) => ({ rest: false, duration: 'h', dots: 0, tie: false, notes });
  const sub = { key: 0, meter: [4, 4], clef: 'grand', voices: [[ev2([n('D', 4), n('A', 4), n('D', 5)]), ev2([n('F', 4), n('B', 4), n('D', 5)]), ev2([n('E', 4), n('C', 5), n('G', 5)])], [ev2([n('F', 3)]), ev2([n('G', 3)]), ev2([n('C', 3)])]] };
  assert.equal(checkFourPart(sub, params).hardFail.length, 0);
  sub.voices[0][2] = ev2([n('E', 4), n('C', 5)]);
  const missing = checkFourPart(sub, params);
  assert.ok(missing.hardFail.some((h) => /第 2 小节第 1 拍：同时有 3 个音/.test(h.text.zh)), JSON.stringify(missing.hardFail.map((h) => h.text.zh)));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { completeBLevel, chapterAverage, overallAverage, sidebChapterExUnlocked, sidebFinalExUnlocked, CHAPTER_EX_LINE, FINAL_EX_LINE, sidebUnlocked, sidebLevelUnlocked, bKey, normalizeNote, gradeSpelling, normalizeRoman, gradeTaps, gradeNode, createBSession, recordAnswer, completeSection, summarizeB, retrySession, mergeMastery, overallMastery, PASS_LINE, LAB_LINES, LAB_MODES, levelSections, levelForAttempt, buildRecovery, startRecovery, recordRecovery, recoveryResult, summarizeExam, breakthroughFor, validateLevel, estimateMinutes, saveLabResult, bestLabResults, loadBreakthroughs, saveBreakthrough } from './sideb_engine.js';
import { emptyProgress, setLevelStars } from './learn_engine.js';
import { ERRORS, SKILLS, recommend } from './sideb_errors.js';

test('Side-B unlocks after the EX final; levels open one by one', () => {
  const levels = [{ id: 'B1-1' }, { id: 'B1-2' }];
  let p = emptyProgress();
  assert.equal(sidebUnlocked(p), false);
  assert.equal(sidebLevelUnlocked(levels, 0, p), false);
  p = setLevelStars(p, ['final-ex'], 1);
  assert.equal(sidebUnlocked(p), true);
  assert.equal(sidebLevelUnlocked(levels, 0, p), true);
  assert.equal(sidebLevelUnlocked(levels, 1, p), false);
  p = setLevelStars(p, [bKey('B1-1')], 2);
  assert.equal(sidebLevelUnlocked(levels, 1, p), true);
});

test('spelling is strict: enharmonic and octave mistakes are named', () => {
  assert.equal(normalizeNote('f♯4'), 'F#4');
  assert.equal(gradeSpelling('F#4', 'F♯4').ok, true);
  assert.equal(gradeSpelling('F#4', 'Gb4').error, 'enharmonic');
  assert.equal(gradeSpelling('F#4', 'F#5').error, 'octave');
  assert.equal(gradeSpelling('F#', 'G').error, 'wrong-note');
  assert.equal(gradeSpelling('B#3', 'C4').error, 'enharmonic', 'octave number follows the letter');
  assert.equal(normalizeRoman('vii o7'), 'vii°7');
  const node = { type: 'spell', answer: ['C#', 'E#', 'G#'] };
  assert.deepEqual(gradeNode(node, ['C#', 'F', 'G#']), { ok: false, score: 2 / 3, errors: ['enharmonic'] });
});

test('derive, analyze and lab nodes are graded step by step', () => {
  const derive = { type: 'derive', steps: [{ kind: 'number', answer: 135 }, { kind: 'note', answer: 'D#' }, { kind: 'roman', answer: ['V6/5'] }] };
  const r = gradeNode(derive, ['135', 'Eb', 'V6/5']);
  assert.equal(r.ok, false); assert.equal(r.score, 2 / 3); assert.deepEqual(r.errors, ['enharmonic']);
  const analyze = { type: 'analyze', slots: [{ answer: 'I' }, { answer: ['ii6', 'ii6/3'] }, { answer: 'V7' }] };
  assert.equal(gradeNode(analyze, ['I', 'ii6', 'v7']).score, 2 / 3, 'case matters: v7 ≠ V7');
  // 实操：评分单的 80/100 → 0.8，扣分的错误类型进入统计；有硬性失败就不算过关（分数照算）
  const sheet = { score: 80, hardFail: [], items: [{ id: 'parallels', deductions: [{ points: 20, error: 'parallel-fifths' }] }] };
  const lab = gradeNode({ type: 'lab' }, sheet);
  assert.deepEqual([lab.ok, lab.score, lab.errors], [true, 0.8, ['parallel-fifths']]);
  const fatal = gradeNode({ type: 'lab' }, { ...sheet, score: 70, hardFail: [{ error: 'wrong-chord' }] });
  assert.deepEqual([fatal.ok, fatal.score, fatal.errors], [false, 0.7, ['wrong-chord', 'parallel-fifths']]);
  assert.equal(gradeNode({ type: 'lab', line: LAB_LINES.ex }, { ...sheet, score: 65 }).ok, false, 'B-EX needs 70%');
  // 发现节点不计分
  assert.deepEqual(gradeNode({ type: 'discover', answer: 1 }, 0), { ok: false, score: 1, errors: [], ungraded: true });
});

test('tapping: onsets decide the score (+1 hit, −1 extra); timing tiers are feedback only; device latency is absorbed', () => {
  const bpm = 60;
  const exact = gradeTaps([0, 2 / 3, 4 / 3], [5, 670, 1320], { bpm });
  assert.equal(exact.ok, true); assert.equal(exact.score, 1); assert.ok(exact.precision > 0.99);
  // 漏一个、多一个：(2 − 1) / 3
  const late = gradeTaps([0, 2 / 3, 4 / 3], [0, 900, 1333], { bpm });
  assert.deepEqual([late.ok, late.missed, late.extra], [false, 1, 1]);
  assert.equal(late.score, 1 / 3);
  // 全部晚 100 ms（设备延迟）：照样全对
  const lagged = gradeTaps([0, 1, 2, 3], [100, 1100, 2100, 3100], { bpm });
  assert.equal(lagged.ok, true); assert.equal(lagged.latency, 100);
  // 时间精度分档：±40 ms 100%、±80 ms 80%、±120 ms 60%
  const loose = gradeTaps([0, 1, 2], [0, 1070, 2000], { bpm, latencyMs: 0 });
  assert.equal(loose.ok, true, '70 ms still counts as a hit');
  assert.ok(Math.abs(loose.precision - (1 + 0.8 + 1) / 3) < 1e-9);
  const node = { type: 'tap', bpm, hands: { right: [0, 2 / 3, 4 / 3], left: [0, 1] } };
  assert.equal(gradeNode(node, { right: [0, 667, 1333], left: [10, 990] }).ok, true);
  assert.deepEqual(gradeNode(node, { right: [0, 667, 1333], left: [10] }).errors, ['tap-missed']);
});

const choice = (id, answer, skills, extra = {}) => ({ id, type: 'choice', answer, skills, variants: [{ answer }, { answer }], ...extra });
const level = {
  id: 'BX', core: true, // 有必做实操的关键技能关：最多 20 分钟
  sections: {
    discover: [{ id: 'd1', type: 'discover', insight: { zh: '原来如此' }, answer: 0 }, { id: 'hear', type: 'demo' }],
    explain: [{ id: 'p1', type: 'page' }, { id: 'p2', type: 'page' }, { id: 'demo1', type: 'demo' }, { id: 'p3', type: 'page' }],
    experiment: [{ id: 'x1', type: 'experiment' }],
    challenge: [
      choice('c1', 0, ['identify']), choice('c2', 0, ['identify']), choice('c3', 0, ['calc']),
      { id: 'g1', type: 'gen', gen: 'halfWhole', count: 2, skills: ['voiceLeading'] }, choice('c4', 0, ['voiceLeading']), choice('c5', 0, ['function'], { breakthrough: { id: 'bx-first', text: 'yes' } }),
    ],
    lab: [{ id: 'L', type: 'lab', lab: 'vl-ii6-V7-I', mandatory: true, minutes: 5 }],
  },
  pool: [choice('r1', 0, ['voiceLeading']), { id: 'g2', type: 'gen', gen: 'halfWhole', count: 3, skills: ['voiceLeading'] }],
};
const play = (session, lvl, answers) => {
  let s = session;
  for (const node of lvl.sections.challenge) s = recordAnswer(s, node, gradeNode(node, answers[node.id] ?? answers[node.id.split(/[~#]/)[0]] ?? 0));
  return s;
};

test('a level: discover → explain → experiment → challenge (6–8, partial credit) → lab; design guardrails pass', () => {
  assert.deepEqual(levelSections(level), ['discover', 'explain', 'experiment', 'challenge', 'lab']);
  assert.deepEqual(validateLevel(level), []);
  assert.ok(estimateMinutes(level) <= 20, `${estimateMinutes(level)} minutes`);
  assert.ok(validateLevel({ ...level, core: false }).includes('too-long'), 'a normal level must stay within ~15 minutes');
  // 设计自检会拦住"受苦模式"：连续 3 页阅读、没有"原来如此"、题量 > 8、没有实验就上实操、全是固定题
  const boring = { id: 'BAD', sections: { explain: [{ type: 'page' }, { type: 'page' }, { type: 'page' }], challenge: Array.from({ length: 12 }, (_, i) => ({ id: `q${i}`, type: 'choice', answer: 0 })), lab: [{ type: 'lab', lab: 'x' }] } };
  assert.deepEqual(validateLevel(boring).sort(), ['challenge-size', 'lab-without-experiment', 'missing-skills', 'no-breakthrough', 'no-insight', 'reading-run', 'retry-memorizable', 'too-long'].sort());
});

test('level score = challenge 60% + mandatory lab 40%; pass needs total ≥ 60% AND lab ≥ 50%', () => {
  assert.equal(PASS_LINE, 0.6);
  assert.deepEqual(LAB_LINES, { level: 0.5, chapter: 0.6, ex: 0.7 });
  const lvl = levelForAttempt(level, 0);
  assert.equal(lvl.sections.challenge.length, 7, 'the generator expands into 2 questions');
  // 挑战全对、实操 0 分：总分刚好 60%，但实操没到 50% → 不通过，回去改实操
  let s = play(createBSession(lvl), lvl, {});
  let sum = summarizeB(s, lvl, { 'vl-ii6-V7-I': { score: 0, hardFail: [] } });
  assert.ok(Math.abs(sum.score - 0.6) < 1e-9);
  assert.deepEqual([sum.passed, sum.next], [false, 'revise-lab']);
  // 用户的例子：普通题 42/60、实操 28/40 → 70/100 通过
  s = play(createBSession(lvl), lvl, { c1: 1, c2: 1 });
  sum = summarizeB(s, lvl, { 'vl-ii6-V7-I': { score: 70, hardFail: [] } });
  assert.ok(Math.abs(sum.challenge - 5 / 7) < 1e-9);
  assert.ok(Math.abs(sum.score - (0.6 * 5 / 7 + 0.4 * 0.7)) < 1e-9);
  assert.deepEqual([sum.passed, sum.stars, sum.next], [true, 1, 'clear']);
  // 实操有硬性失败：分数照算，但不通过
  sum = summarizeB(s, lvl, { 'vl-ii6-V7-I': { score: 90, hardFail: [{ error: 'wrong-chord' }] } });
  assert.deepEqual([sum.passed, sum.next], [false, 'revise-lab']);
  // 章节测试的实操门槛 60%
  assert.equal(summarizeB(s, lvl, { 'vl-ii6-V7-I': { score: 55, hardFail: [] } }, { context: 'chapter' }).passed, false);
});

test('below 60%: no restart — a short recovery challenge on the weak skill clears the level', () => {
  const lvl = levelForAttempt(level, 0);
  const genIds = lvl.sections.challenge.filter((n) => n.id.startsWith('g1#')).map((n) => n.id);
  const wrong = Object.fromEntries(['c3', 'c4', 'c5', ...genIds].map((id) => [id, 3]));
  let s = play(createBSession(lvl), lvl, wrong);
  const sum = summarizeB(s, lvl, { 'vl-ii6-V7-I': { score: 80, hardFail: [] } });
  assert.equal(sum.passed, false); assert.equal(sum.next, 'recovery');
  assert.deepEqual(sum.weak, ['voiceLeading', 'calc'], 'lowest first; ties go to the skill with more evidence');
  const recovery = buildRecovery(level, sum, { attempt: 1 });
  assert.ok(recovery.nodes.length >= 3 && recovery.nodes.length <= 5, String(recovery.nodes.length));
  assert.ok(recovery.nodes.every((n) => n.skills.some((k) => sum.weak.includes(k))), 'only weak skills');
  assert.ok(recovery.nodes.every((n) => !lvl.sections.challenge.some((c) => c.id === n.id)), 'new questions, not the same ones');
  s = startRecovery(s, recovery);
  recovery.nodes.forEach((n, i) => { s = recordRecovery(s, n, gradeNode(n, i === 0 ? 3 : n.answer)); });
  const r = recoveryResult(s);
  assert.equal(r.passed, true); assert.equal(r.done, true);
  let p = completeBLevel(setLevelStars(emptyProgress(), ['final-ex'], 1), 'BX', sum, { recovered: true, seen: ['discover', 'explain', 'experiment'] });
  assert.deepEqual(p.units['b:BX'], { best: 0.6, done: true, stars: 1, seen: ['discover', 'explain', 'experiment'] });
});

test('checkpoints keep finished sections; a retry for more stars starts at the challenge with new questions', () => {
  let s = createBSession(level);
  s = completeSection(s, level); s = completeSection(s, level); s = completeSection(s, level);
  assert.deepEqual(s.seen, ['discover', 'explain', 'experiment']);
  assert.equal(levelSections(level)[s.checkpoint], 'challenge');
  const retry = retrySession(level, s);
  assert.equal(levelSections(level)[retry.section], 'challenge', 'no re-reading');
  assert.equal(retry.attempt, 1);
  const a = levelForAttempt(level, 0).sections.challenge; const b = levelForAttempt(level, 1).sections.challenge;
  assert.notDeepEqual(a.map((n) => n.id), b.map((n) => n.id), 'variants rotate and generators reseed');
  assert.notDeepEqual(a.filter((n) => n.id.startsWith('g1')).map((n) => n.prompt), b.filter((n) => n.id.startsWith('g1')).map((n) => n.prompt));
  assert.deepEqual(levelForAttempt(level, 1).sections.challenge.map((n) => n.prompt), b.map((n) => n.prompt), 'same attempt → same questions');
});

test('chapter test / B-EX: only failed parts are retried; lab lines 60% / 70%; lab modes', () => {
  const ch = summarizeExam({ analysis: 0.8, spelling: 0.55, hearing: 0.7 }, [{ id: 'L', score: 0.62 }], { context: 'chapter' });
  assert.deepEqual([ch.passed, ch.retry], [false, { parts: ['spelling'], labs: [] }]);
  const ex = summarizeExam({ analysis: 0.8 }, [{ id: 'L', score: 0.65 }], { context: 'ex' });
  assert.deepEqual(ex.retry.labs, ['L']);
  assert.equal(LAB_MODES.level.advice, true);
  assert.deepEqual([LAB_MODES.ex.checks, LAB_MODES.ex.submissions, LAB_MODES.ex.advice], [0, 1, false]);
});

test('breakthrough moments fire once, the first time the player really does it', () => {
  const node = { id: 'c5', type: 'choice', breakthrough: { id: 'bx-first', text: 'yes' } };
  assert.equal(breakthroughFor(node, { ok: false }, []), null);
  assert.equal(breakthroughFor(node, { ok: true }, []).id, 'bx-first');
  assert.equal(breakthroughFor(node, { ok: true }, ['bx-first']), null);
  const lab = { type: 'lab', breakthrough: { id: 'smooth', when: ['motion'] } };
  assert.equal(breakthroughFor(lab, { score: 90, hardFail: [], items: [{ id: 'motion', points: 10, max: 10 }] }, []).id, 'smooth');
  assert.equal(breakthroughFor(lab, { score: 95, hardFail: [], items: [{ id: 'motion', points: 9, max: 10 }] }, []), null);
  assert.equal(breakthroughFor(lab, { score: 90, hardFail: [{}], items: [{ id: 'motion', points: 10, max: 10 }] }, []), null);
});

test('lab results keep the best submission and the latest draft; breakthroughs are remembered', () => {
  const store = new Map();
  const storage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v), removeItem: (k) => store.delete(k) };
  const sheet = (score, hard = []) => ({ score, hardFail: hard, items: [{ id: 'a', layer: 'core', label: {}, points: score, max: 100, deductions: [], info: [] }] });
  saveLabResult('L', sheet(70), storage);
  saveLabResult('L', sheet(95, [{ error: 'wrong-chord', text: {} }]), storage);
  saveLabResult('L', sheet(60), storage);
  const best = bestLabResults(storage).L;
  assert.equal(best.score, 70, 'a fatal error never counts as the best');
  saveBreakthrough('x', storage); saveBreakthrough('x', storage);
  assert.deepEqual(loadBreakthroughs(storage), ['x']);
});

test('mastery keeps each level’s best per skill; errors map to skills and advice', () => {
  let store = mergeMastery({}, 'B1', { calc: { got: 1, total: 2 }, spell: { got: 0, total: 0 } });
  store = mergeMastery(store, 'B1', { calc: { got: 2, total: 2 } });
  store = mergeMastery(store, 'B2', { calc: { got: 0, total: 1 } });
  assert.deepEqual(store.B1, { calc: 1 });
  assert.equal(overallMastery(store).calc, 0.5);
  assert.equal(overallMastery(store).spell, null);
  for (const [type, e] of Object.entries(ERRORS)) {
    assert.ok(SKILLS.includes(e.skill), type);
    for (const k of ['label', 'advice']) assert.ok(e[k].zh && e[k].ja && e[k].en, `${type}.${k}`);
  }
  assert.deepEqual(recommend({ enharmonic: 1, 'parallel-fifths': 3, nope: 2 }).map((r) => r.type), ['parallel-fifths', 'enharmonic']);
});

test('best scores, chapter averages and the Side-B EX unlock lines (70% / 75%)', () => {
  assert.deepEqual([CHAPTER_EX_LINE, FINAL_EX_LINE], [0.7, 0.75]);
  let p = setLevelStars(emptyProgress(), ['final-ex'], 1);
  p = completeBLevel(p, 'A1', { accuracy: 0.5, passed: false, stars: 0 });
  assert.deepEqual(p.units['b:A1'], { best: 0.5, done: false, stars: 0 }, 'below 60%: not cleared');
  p = completeBLevel(p, 'A1', { accuracy: 0.8, passed: true, stars: 2 });
  p = completeBLevel(p, 'A1', { accuracy: 0.65, passed: true, stars: 1 });
  assert.deepEqual(p.units['b:A1'], { best: 0.8, done: true, stars: 2 }, 'best and stars keep the highest');
  const ch1 = [{ id: 'A1' }, { id: 'A2' }];
  assert.equal(chapterAverage(ch1, p), 0.4, 'unplayed levels count as 0');
  assert.equal(sidebChapterExUnlocked(ch1, p), false);
  p = completeBLevel(p, 'A2', { accuracy: 0.6, passed: true, stars: 1 });
  assert.equal(chapterAverage(ch1, p), 0.7);
  assert.equal(sidebChapterExUnlocked(ch1, p), true, 'exactly 70% unlocks');
  const ch2 = [{ id: 'C1' }];
  p = completeBLevel(p, 'C1', { accuracy: 0.79, passed: true, stars: 2 });
  assert.ok(Math.abs(overallAverage([ch1, ch2], p) - 0.745) < 1e-9);
  assert.equal(sidebFinalExUnlocked([ch1, ch2], p), false, '74.5% < 75%');
  p = completeBLevel(p, 'C1', { accuracy: 0.8, passed: true, stars: 2 });
  assert.equal(sidebFinalExUnlocked([ch1, ch2], p), true);
});

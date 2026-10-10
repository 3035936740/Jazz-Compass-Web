import test from 'node:test';
import assert from 'node:assert/strict';
import { B_CHAPTERS, B_LEVELS, levelById, isPlayable } from './sideb_content.js';
import { validateLevel, levelForAttempt, levelSections, buildRecovery, gradeNode, estimateMinutes } from './sideb_engine.js';
import { GENERATORS } from './learn_generators.js';
import { referenceById } from './references.js';
import { LABS } from './sideb_labs.js';
import { ERRORS } from './sideb_errors.js';
import { UNITS, SIDES } from './learn_content.js';
import { checkSATB } from './satb_check.js';

const playable = B_LEVELS.filter(isPlayable);
const LANGS = ['zh', 'ja', 'en'];
/** 遍历一个对象里所有的 { zh, ja, en } 文本 */
function texts(value, path = '', out = []) {
  if (Array.isArray(value)) value.forEach((v, i) => texts(v, `${path}[${i}]`, out));
  else if (value && typeof value === 'object') {
    if (typeof value.zh === 'string' || typeof value.en === 'string') out.push([path, value]);
    else Object.entries(value).forEach(([k, v]) => texts(v, `${path}.${k}`, out));
  }
  return out;
}
const allNodes = (level) => [...Object.values(level.sections).flat(), ...(level.pool || [])];

test('the Side-B map: 6 chapters, 48 levels, every A-side link exists', () => {
  assert.equal(B_CHAPTERS.length, 6);
  assert.equal(B_LEVELS.length, 48);
  assert.equal(new Set(B_LEVELS.map((l) => l.id)).size, 48);
  const ids = new Set([...UNITS.map((u) => u.id), ...SIDES.map((s) => s.id)]);
  B_LEVELS.forEach((l) => {
    assert.ok(B_CHAPTERS.some((c) => c.id === l.chapter), l.id);
    l.a.forEach((a) => assert.ok(ids.has(a), `${l.id} → ${a}`));
    LANGS.forEach((k) => assert.ok(l.title[k], `${l.id} title.${k}`));
  });
  assert.ok(playable.length >= 2 && ['B2-4', 'B4-10'].every((id) => playable.some((l) => l.id === id)));
});

test('playable levels pass the design guardrails (insight, ≤2 pages in a row, 6–8 challenge questions, retries change, time, breakthrough)', () => {
  playable.forEach((level) => {
    assert.deepEqual(validateLevel(level), [], level.id);
    assert.ok(estimateMinutes(level) <= (level.core ? 20 : 15), `${level.id}: ${estimateMinutes(level)} min`);
    // 五段顺序固定；实操只出现在地图上标了实操的关卡
    assert.deepEqual(levelSections(level), ['discover', 'explain', 'experiment', 'challenge', ...(level.lab ? ['lab'] : [])], level.id);
    assert.ok(level.insight, `${level.id} insight`);
  });
});

test('every text has zh / ja / en; every ref is registered; labs and generators exist', () => {
  playable.forEach((level) => {
    texts(level).forEach(([path, v]) => LANGS.forEach((k) => assert.ok(typeof v[k] === 'string' && v[k].length, `${level.id}${path}.${k}`)));
    allNodes(level).forEach((node) => {
      [].concat(node.ref ?? []).forEach((id) => assert.ok(referenceById(id), `${level.id} ${node.id}: ref ${id}`));
      if (node.type === 'lab') assert.ok(LABS[node.lab], `${node.id}: lab ${node.lab}`);
      if (node.type === 'gen') assert.ok(GENERATORS[node.gen], `${node.id}: generator ${node.gen}`);
      if (node.error) assert.ok(ERRORS[node.error], `${node.id}: error type ${node.error} has advice`);
      if (level.sections.challenge.includes(node) && ['choice', 'listen', 'derive'].includes(node.type)) assert.ok(node.error, `${node.id}: a specific error type for recommendations`);
      if (!['page', 'demo', 'experiment', 'lab', 'discover', 'gen'].includes(node.type) && !node.practice) assert.ok((node.skills || []).length, `${node.id} skills`);
    });
  });
});

test('every attempt materializes valid questions: the right answer is among the options and grading works', () => {
  playable.forEach((level) => {
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const lvl = levelForAttempt(level, attempt);
      Object.values(lvl.sections).flat().forEach((node) => {
        if (node.options) {
          assert.ok(Number.isInteger(node.answer) && node.answer >= 0 && node.answer < node.options.length, `${node.id}: answer ${node.answer}`);
          const labels = node.options.map((o) => (typeof o === 'string' ? o : o.zh));
          assert.equal(new Set(labels).size, labels.length, `${node.id}: duplicate options`);
          if (!['discover'].includes(node.type)) assert.equal(gradeNode(node, node.answer).ok, true, node.id);
        }
        if (node.type === 'derive') assert.equal(gradeNode(node, node.steps.map((s) => String([].concat(s.answer)[0]))).ok, true, node.id);
        if (node.type === 'tap') assert.equal(gradeNode(node, { left: node.hands.left.map((b) => (b * 60000) / node.bpm), right: node.hands.right.map((b) => (b * 60000) / node.bpm) }).ok, true, node.id);
      });
      assert.ok(lvl.sections.challenge.length >= 6 && lvl.sections.challenge.length <= 8, `${level.id} attempt ${attempt}`);
    }
  });
});

test('audio stays in a playable range; teaching chords are what the text says', () => {
  const midis = [];
  // 只看真正要播放的音频（audio 对象）：{ chords }、{ notes }、{ rhythm: { tracks: [{ midi | midis }] } }
  const fromAudio = (a) => {
    if (!a) return;
    if (a.chords) midis.push(...a.chords.flat());
    if (a.notes) midis.push(...a.notes.flat(2).filter(Number.isFinite));
    (a.rhythm?.tracks || []).forEach((tr) => midis.push(...(tr.midis || [tr.midi])));
  };
  const walk = (v) => { if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => { if (k === 'audio') fromAudio(x); else walk(x); }); };
  playable.forEach((level) => walk(level.sections));
  assert.ok(midis.length > 20);
  midis.forEach((m) => assert.ok(m >= 36 && m <= 96, String(m)));
  // B2-4：示范与题目里的四部和弦，检查器给出的问题和文字一致
  const b24 = levelById('B2-4');
  const issues = (chords) => checkSATB(chords, { tonic: 0 }).issues.filter((i) => i.severity === 'error').map((i) => i.rule).sort();
  const demo = b24.sections.explain.find((n) => n.id === 'b24-e4');
  assert.ok(issues(demo.steps[1].visual.chords).includes('parallel-8'), 'doubling the leading tone → parallel octaves');
  const three = b24.sections.explain.find((n) => n.id === 'b24-e6');
  three.steps.forEach((s) => assert.deepEqual(issues(s.visual.chords), [], 'both alternative resolutions are clean'));
  const c3 = b24.sections.challenge.find((n) => n.id === 'b24-c3');
  assert.deepEqual(issues(c3.variants[0].visual.chords), ['parallel-5']);
  assert.deepEqual(issues(c3.variants[1].visual.chords), ['parallel-5', 'parallel-8']);
  const c7 = b24.sections.challenge.find((n) => n.id === 'b24-c7');
  c7.variants.forEach((v) => v.play.forEach((p, i) => assert.equal(issues(p.audio.chords).length > 0, i === v.answer, 'the answer is the version with parallels')));
  const x1 = b24.sections.experiment[0];
  assert.ok(issues(x1.params.chords).length > 0, 'the experiment starts with something to fix');
});

test('recovery challenges can always be built from the pool for every weak skill', () => {
  playable.forEach((level) => {
    const skills = new Set(allNodes(level).flatMap((n) => n.skills || []));
    skills.forEach((skill) => {
      const r = buildRecovery(level, { weak: [skill] }, { attempt: 1 });
      assert.ok(r && r.nodes.length >= 3 && r.nodes.length <= 5, `${level.id} ${skill}`);
    });
  });
});

test('exams: question mix (B main / B extension / A side), labs last, fresh draw per attempt, unlock rules', async () => {
  const { examById, chapterLevels, isPlayable } = await import('./sideb_content.js');
  const E = await import('./sideb_engine.js');
  const t = examById('T-harmony'); const tx = examById('TX-harmony');
  assert.ok(t && tx && examById('FIN') && examById('FINX'));
  assert.equal(t.passLine, 0.6); assert.equal(tx.passLine, 0.6); assert.equal(examById("FINX").passLine, 0.6);
  // 每场 16 个挑战任务；章节最多 2 个不同实操，Final 3 个不同章节的实操。
  assert.equal(t.sections.challenge.length, 16); assert.equal(tx.sections.challenge.length, 16);
  assert.equal(examById('FIN').sections.challenge.length, 16); assert.equal(examById('FINX').sections.challenge.length, 16);
  assert.equal(t.sections.lab.length, 2); assert.equal(examById('FIN').sections.lab.length, 3); assert.equal(examById('FINX').sections.lab.length, 3);
  assert.equal(new Set(t.sections.lab.map((n) => n.lab)).size, 2);
  assert.deepEqual(t.weights, { challenge: 0.4, labs: 0.6 });
  assert.ok(t.sections.lab.every((n) => n.mode === 'chapter') && tx.sections.lab.every((n) => n.mode === 'ex'));
  // 普通章节测试：2 道 A 面题，其余都来自本章 B 面
  const aCount = (lv) => lv.sections.challenge.filter((n) => /\.A-/.test(n.id)).length;
  assert.equal(aCount(t), 2); assert.equal(aCount(tx), 2); assert.equal(aCount(examById('FIN')), 2);
  const { extLevelById } = await import('./sideb_content.js');
  const harmonyLevels = chapterLevels('harmony');
  const { EXAM_TASKS } = await import('./sideb_exam_tasks.js');
  const extIds = new Set([...harmonyLevels.map((l) => extLevelById(`${l.id}x`)).filter(Boolean).flatMap((l) => [...(l.sections?.challenge || []), ...(l.pool || [])].map((n) => n.id)), ...EXAM_TASKS.harmony.map((n) => `x-${n.id}`)]);
  const ids = new Set([...harmonyLevels.flatMap((l) => [...(l.sections?.challenge || []), ...(l.pool || [])].map((n) => n.id)), ...extIds, ...EXAM_TASKS.harmony.map((n) => n.id)]);
  const rawOf = (n) => n.id.split('.').slice(2).join('.').replace(/~[mxf]\d+$/, '');
  // 第 2 章已有扩展关：普通章节测试里正好 2 道来自扩展关
  if (extIds.size) assert.equal(t.sections.challenge.filter((n) => extIds.has(rawOf(n))).length, 2);
  assert.ok(t.sections.challenge.filter((n) => !/\.A-/.test(n.id)).every((n) => ids.has(rawOf(n))));
  // 每次开考重新抽题
  const a0 = E.levelForAttempt(t, 0); const a1 = E.levelForAttempt(t, 1);
  assert.notDeepEqual(a0.sections.challenge.map((n) => n.id), a1.sections.challenge.map((n) => n.id));
  const levels = chapterLevels('basics').filter(isPlayable);
  const p = { units: {}, unlockAll: false };
  p.units['final-ex'] = { done: true };
  assert.equal(E.chapterTestOpen(levels, p), false);
  levels.forEach((l) => { p.units[E.bKey(l.id)] = { done: true, best: 0.65 }; });
  assert.equal(E.chapterTestOpen(levels, p), true, 'all regular levels cleared → chapter test opens');
  // EX：本章平均（含扩展关）≥ 60%，与章节测试过没过无关
  const hasExt = () => true;
  assert.equal(E.chapterExOpen(levels, p, hasExt), false, 'extensions not played yet pull the average down');
  levels.forEach((l) => { p.units[E.extKey(l.id)] = { done: true, best: 0.6 }; });
  assert.equal(E.chapterExOpen(levels, p, hasExt), true);
  p.units[E.extKey(levels[0].id)] = { done: false, best: 1 };
  assert.equal(E.chapterExOpen(levels, p, hasExt), false, 'even a 100% best score cannot replace Clear');
  p.units[E.extKey(levels[0].id)] = { done: true, best: 0.6 };
  const highMain = structuredClone(p);
  levels.forEach((l) => { highMain.units[E.bKey(l.id)].best = 1; });
  delete highMain.units[E.extKey(levels[0].id)];
  assert.ok(E.chapterAverageWithExt(levels, highMain, hasExt) > 0.6);
  assert.equal(E.chapterExOpen(levels, highMain, hasExt), false, 'high regular scores cannot offset one unplayed extension');
  // Final 要全部章节测试；EX Final 还要全部 EX 章节测试
  assert.equal(E.finalOpen(['basics'], p), false);
  p.units.final = { done: true };
  p.units[E.bKey('T-basics')] = { done: true, best: 0.7 };
  assert.equal(E.finalOpen(['basics'], p), true);
  assert.equal(E.finalExOpen(['basics'], p), false);
  p.units[E.bKey('TX-basics')] = { done: true, best: 0.8 };
  assert.equal(E.finalExOpen(['basics'], p), true);
  // 考试里的实操按 id@mode 取成绩、按模式设门槛：普通关的成绩不算
  const lvl = E.levelForAttempt(t, 0);
  const session = E.createBSession(lvl);
  const lab = t.sections.lab[0].lab;
  const plain = E.summarizeB(session, lvl, { [lab]: { score: 100, hardFail: [] } });
  assert.equal(plain.labs[0].done, false);
  const exam = E.summarizeB(session, lvl, { [`${lab}@chapter`]: { score: 59, hardFail: [] } });
  assert.equal(exam.labs[0].ok, false, 'chapter-test lab line is 60%');
});

test('extension previews point to later lessons and explain the preview in all languages', async () => {
  const { extLevelById } = await import('./sideb_content.js');
  for (const base of B_LEVELS) {
    const ext = extLevelById(`${base.id}x`);
    if (!ext?.previewOf?.length) continue;
    assert.deepEqual(validateLevel(ext), [], ext.id);
    ext.previewOf.forEach((id) => assert.ok(B_LEVELS.findIndex((l) => l.id === id) > B_LEVELS.indexOf(base)));
    const page = ext.sections.explain.find((n) => n.type === 'page');
    LANGS.forEach((lang) => ext.previewOf.forEach((id) => assert.ok(page.text[0][lang].includes(levelById(id).code || id), `${ext.id}: ${lang} mentions ${id}`)));
  }
});

test('all exam draws are bounded, prioritize multi-step tasks, and use distinct labs', async () => {
  const { examById } = await import('./sideb_content.js');
  for (const id of [...B_CHAPTERS.flatMap((c) => [`T-${c.id}`, `TX-${c.id}`]), 'FIN', 'FINX']) {
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const lvl = levelForAttempt(examById(id), attempt);
      assert.equal(lvl.sections.challenge.length, 16, `${id}: ${attempt}`);
      const labs = lvl.sections.lab || [];
      assert.equal(new Set(labs.map((n) => n.lab)).size, labs.length);
      const composite = lvl.sections.challenge.filter((n) => ['derive', 'analyze', 'spell', 'tap'].includes(n.type));
      assert.ok(composite.length >= 8, `${id}: ${attempt} has at least half integrated tasks`);
      const tasks = lvl.sections.challenge.filter((n) => /task-/.test(n.id));
      const taskKeys = tasks.map((n) => n.taskKey || n.id.split('.').slice(2).join('.'));
      assert.equal(new Set(taskKeys).size, tasks.length, 'same integrated scenario appears once per exam');
      assert.ok(lvl.sections.challenge.filter((n) => n.ratingOnly).length <= 2);
    }
  }
});

test('integrated exam tasks are cited, multilingual, and grade complete and partial work', async () => {
  const { EXAM_TASKS } = await import('./sideb_exam_tasks.js');
  const { SKILLS } = await import('./sideb_errors.js');
  for (const nodes of Object.values(EXAM_TASKS)) {
    assert.ok(nodes.length >= 8, 'each chapter supports eight distinct integrated scenarios');
    for (const n of nodes) {
    [].concat(n.ref).forEach((id) => assert.ok(referenceById(id), `${n.id}: ${id}`));
    texts(n).forEach(([path, v]) => LANGS.forEach((l) => assert.ok(v[l], `${n.id}${path}.${l}`)));
    n.skills.forEach((s) => assert.ok(SKILLS.includes(s), s));
    const responses = n.steps.map((s) => String(s.answer));
    assert.equal(gradeNode(n, responses).score, 1);
    responses[0] = '';
    assert.equal(gradeNode(n, responses).score, (n.steps.length - 1) / n.steps.length);
    }
  }
});

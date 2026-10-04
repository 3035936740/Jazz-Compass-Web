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

test('the Side-B map: 6 chapters, 43 levels, every A-side link exists', () => {
  assert.equal(B_CHAPTERS.length, 6);
  assert.equal(B_LEVELS.length, 43);
  assert.equal(new Set(B_LEVELS.map((l) => l.id)).size, 43);
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

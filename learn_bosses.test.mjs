// Boss 战：16 个节点的数据完整性、出题、解锁、道中 Boss 挡关、15 题不重来、立绘文件、两道新写题卡的答案。
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { UNITS, SIDES } from './learn_content.js';
import { BOSSES, CAST, MODE_LABEL, bossCards, bossOpen, bossScope, bossKey, parseBossKey, exOf, baseOf, gateBossFor, askState, reactState, endingState, statesUsed, endingSet, leakLine, LEAK_AFTER } from './learn_bosses.js';
import { BOSS_GATES } from './learn_boss_gates.js';
import { CAST_LINES, BOSS_LINES } from './learn_boss_lines.js';
import { BOSS_STATES } from './boss_sprite.js';
import { spriteFile } from './boss_sprite.js';
import { createSession, answer, advance, isFinished, isUnlocked, starsFor, gradeCard } from './learn_engine.js';
import { referenceById } from './references.js';

const LANGS = ['zh', 'ja', 'en'];
const full = (v) => v && LANGS.every((l) => typeof v[l] === 'string' && v[l].trim());
const progressWith = (keys) => ({ units: Object.fromEntries(keys.map((k) => [k, { done: true, stars: 2 }])), unlockAll: false });

test('16 boss nodes: six characters, each fight exactly 15 questions with Q10 as the turning point', () => {
  assert.equal(BOSSES.length, 16);
  assert.deepEqual(Object.keys(CAST), ['mimi', 'sever', 'noa', 'jaz', 'araya', 'zero']);
  assert.equal(new Set(BOSSES.map((b) => b.id)).size, 16);
  BOSSES.forEach((b) => {
    assert.equal(b.questions.length, 15, b.id);
    assert.deepEqual(b.questions.map((q, i) => (q.phase ? i : -1)).filter((i) => i >= 0), [9], `${b.id}: Q10 is the only phase-two turn`);
    assert.ok(b.questions.every((q) => MODE_LABEL[q.mode]), `${b.id}: every question names how it is bound to the story`);
  });
  // 关卡节奏：每章普通 + EX，第二章、第四章另有道中 Boss 与道中 EX
  const per = (s) => BOSSES.filter((b) => b.section === s).length;
  assert.deepEqual(['basics', 'harmony', 'melody', 'jazz', 'world', 'modern'].map(per), [2, 4, 2, 4, 2, 2]);
  assert.deepEqual(BOSSES.filter((b) => b.after).map((b) => `${b.id}@${b.after}`), ['sever-mid@voicing', 'sever-mid-ex@voicing', 'jaz-mid@chordscale', 'jaz-mid-ex@chordscale']);
});

test('every line, theme, lesson and ending is written in zh, ja and en; one to three star endings exist', () => {
  BOSSES.forEach((b) => {
    [b.theme, b.lesson, b.firstClear, b.upgrade, ...b.intro, ...b.questions.map((q) => q.line), ...b.questions.flatMap((q) => [q.right, q.wrong].filter(Boolean))].forEach((v, i) => assert.ok(full(v), `${b.id} text #${i}`));
    [1, 2, 3].forEach((n) => { assert.ok(b.endings[n]?.length, `${b.id} ${n}-star ending`); b.endings[n].forEach((v) => assert.ok(full(v), `${b.id} ending ${n}`)); });
    Object.values(b.memo || {}).forEach((v) => [].concat(v).forEach((x) => assert.ok(full(x), `${b.id} memo`)));
  });
  Object.entries(CAST).forEach(([id, c]) => {
    ['right', 'wrong', 'streak', 'wrong2', 'comeback', 'rematch'].forEach((pool) => {
      assert.ok(c.lines[pool].length >= 3, `${id} ${pool}`);
      c.lines[pool].forEach((v) => assert.ok(full(v), `${id} ${pool}`));
    });
  });
});

test('character voice limits: nobody says “small fry”, Zero never shouts, right-answer reactions never act surprised', () => {
  const all = JSON.stringify({ CAST_LINES, BOSS_LINES });
  assert.ok(!all.includes('杂鱼') && !all.includes('ざこ') && !/small fry/i.test(all), 'no “small fry” anywhere');
  const zero = JSON.stringify([CAST_LINES.zero, BOSS_LINES.zero, BOSS_LINES['zero-ex']]);
  assert.ok(!/[!！]/.test(zero), 'Zero never uses exclamation marks');
  // 不强调打斗、不写"你居然答对了"之类的受击文案
  Object.entries(CAST_LINES).forEach(([id, c]) => ['right', 'streak', 'comeback'].forEach((pool) => c[pool].forEach((v) => {
    assert.ok(!/居然|怎么可能|能不能错|不可能|偷偷练|运气|故意错/.test(v.zh), `${id} ${pool}: ${v.zh}`);
  })));
});

test('every line has several versions: intros, each question, endings per star (with valid expressions), upgrades, poke and leak lines', () => {
  Object.entries(BOSS_LINES).forEach(([id, d]) => {
    assert.ok(d.intro.length >= 2, `${id}: intro sets`);
    d.intro.flat().forEach((v) => assert.ok(full(v), `${id} intro`));
    [1, 2, 3].forEach((n) => {
      assert.ok(d.end[n].length >= 2, `${id}: ${n}-star ending sets`);
      d.end[n].forEach((set) => set.forEach(([state, line]) => { assert.ok(BOSS_STATES.includes(state), `${id}: state ${state}`); assert.ok(state !== 'hurt', `${id}: no hit sprite`); assert.ok(full(line), `${id} ending`); }));
      assert.ok(BOSS_STATES.slice(15, 18).includes(d.end[n][0][0][0]), `${id}: ${n}-star ending opens on an ending sprite`);
    });
    assert.ok(full(d.first) && d.upgrade.length >= 2 && d.upgrade.every(full), `${id}: first/upgrade`);
    Object.values(d.memo || {}).forEach((pool) => pool.forEach((v) => assert.ok(full(v), `${id} memo`)));
    Object.values(d.special || {}).forEach((sp) => Object.values(sp).forEach((pool) => pool.forEach((v) => assert.ok(full(v), `${id} special`))));
  });
  Object.entries(CAST_LINES).forEach(([id, c]) => {
    ['right', 'wrong', 'streak', 'wrong2', 'comeback', 'rematch', 'click', 'leak', 'shush', 'leakedRight', 'leakNote'].forEach((pool) => {
      assert.ok(c[pool].length >= 2, `${id} ${pool}`);
      c[pool].forEach((v) => assert.ok(full(v), `${id} ${pool}`));
    });
    c.leak.forEach((v) => LANGS.forEach((l) => assert.ok(v[l].includes('{answer}'), `${id} leak ${l}`)));
    c.leakNote.forEach((v) => LANGS.forEach((l) => assert.ok(v[l].includes('{n}'), `${id} leakNote ${l}`)));
    [1, 2].forEach((n) => { assert.ok(c.greet[n].length >= 2, `${id} greet ${n}`); c.greet[n].forEach((v) => assert.ok(full(v))); });
    ['done', 'test', 'mistake', 'final', 'review'].forEach((ctx) => { assert.ok(c.cameo[ctx]?.length, `${id} cameo ${ctx}`); c.cameo[ctx].forEach((v) => assert.ok(full(v), `${id} cameo ${ctx}`)); });
  });
  const leak = leakLine('mimi', 'C4');
  LANGS.forEach((l) => assert.ok(leak[l].includes('C4') && !leak[l].includes('{answer}')));
  assert.ok(LEAK_AFTER >= 5, 'leaking takes many pokes, not an accidental click');
  // 结局随机：两套都会出现
  const seen = new Set([0, .99].map((x) => JSON.stringify(endingSet(BOSSES[0], 3, () => x))));
  assert.equal(seen.size, 2);
});

test('every boss question is a newly designed card around the fight’s belief: graded, trilingual, sourced, several story lines each', async () => {
  const { BOSS_QUESTIONS } = await import('./learn_boss_questions.js');
  assert.deepEqual(Object.keys(BOSS_QUESTIONS).sort(), BOSSES.map((b) => b.id).sort());
  const prompts = new Set();
  BOSSES.forEach((b) => {
    assert.ok(full(b.claim), `${b.id}: the belief this fight takes apart`);
    assert.equal(Boolean(b.playerBelief), Boolean(b.ex) || b.cast === 'araya', `${b.id}: EX fights and Araya target the player’s own belief; regular bosses hold the belief themselves`);
    const cards = bossCards(b, UNITS, SIDES);
    assert.equal(cards.length, 15);
    cards.forEach((c, i) => {
      const at = `${b.id} Q${i + 1}`;
      assert.ok(b.questions[i].custom, `${at}: a new card, not a reused level card`);
      assert.ok(['choice', 'fill', 'match'].includes(c.type), `${at} type ${c.type}`);
      assert.equal(c.boss.index, i);
      assert.ok(full(c.prompt) && full(c.hint) && full(c.explain), `${at}: prompt / hint / explain in zh, ja, en`);
      [].concat(c.ref ?? []).forEach((id) => assert.ok(referenceById(id), `${at}: source ${id} registered`));
      assert.ok([].concat(c.ref ?? []).length, `${at} has a source`);
      if (c.type === 'choice') {
        assert.equal(c.options.length, 4, `${at}: four options`);
        assert.ok(Number.isInteger(c.answer) && c.answer >= 0 && c.answer < 4, `${at}: answer index`);
        const texts = c.options.map((o) => (typeof o === 'string' ? o : o.zh));
        assert.equal(new Set(texts).size, 4, `${at}: options differ`);
        c.options.forEach((o) => assert.ok(typeof o === 'string' || full(o), `${at}: option text`));
      }
      assert.ok(!prompts.has(c.prompt.zh), `${at}: prompt repeats another boss question`);
      prompts.add(c.prompt.zh);
      assert.ok(c.boss.lines.length >= 2, `${at}: several story lines`);
      c.boss.lines.forEach((v) => assert.ok(full(v), `${at}: line`));
      if (c.audio) assert.ok(c.audio.notes || c.audio.events, `${at}: playable audio`);
    });
  });
  const zeroText = JSON.stringify([BOSS_QUESTIONS.zero, BOSS_QUESTIONS['zero-ex']].map((x) => x.questions.flatMap((q) => [...q.lines, ...(q.right || [])])));
  assert.ok(!/[!！]/.test(zeroText), 'Zero never shouts in question lines');
});

test('turning-point cards check out: Zero’s {0,1,4} rule and whole-tone rule, Mimi’s two flats, Sever’s six-four voicing', () => {
  const q10 = (id) => bossCards(BOSSES.find((b) => b.id === id), UNITS, SIDES)[9];
  const tn = (set) => Array.from({ length: 12 }, (_, n) => set.map((x) => (x + n) % 12).sort((a, b) => a - b).join(','));
  const parse = (o) => (typeof o === 'string' ? o : o.zh).replace(/[{}\s]/g, '').split(',').map(Number).sort((a, b) => a - b).join(',');
  const zero = q10('zero');
  const transpositions = new Set(tn([0, 1, 4]));
  assert.deepEqual(zero.options.map((o, i) => (transpositions.has(parse(o)) ? i : -1)).filter((i) => i >= 0), [zero.answer]);
  assert.ok(new Set(tn([0, 11, 8])).has(parse('{6, 9, 10}')), '{6, 9, 10} is the inversion form of (014)');
  const zeroEx = q10('zero-ex');
  assert.equal(zeroEx.answer, 0);
  assert.ok(![0, 2, 4, 6, 8, 10].includes(7) && [0, 4, 8].every((x) => [0, 2, 4, 6, 8, 10].includes(x)));
  // 米米：两个降号的大调（倒数第二个降号）
  const mimi = q10('mimi');
  assert.equal(mimi.options[mimi.answer].zh, 'B♭ 大调');
  // 塞维尔道中：正确选项满足音域、间距、不交叉
  const range = { S: [60, 79], A: [55, 74], T: [48, 67], B: [41, 62] };
  const ok = ([S, A, T, B]) => S >= range.S[0] && S <= range.S[1] && A >= range.A[0] && A <= range.A[1] && T >= range.T[0] && T <= range.T[1] && B >= range.B[0] && B <= range.B[1] && S >= A && A >= T && T >= B && S - A <= 12 && A - T <= 12 && T - B <= 19;
  assert.ok(ok([60, 55, 52, 48]), 'S C4, A G3, T E3, B C3 is legal');
  assert.ok(ok([72, 64, 55, 48]), 'Sever’s own voicing is legal too');
  assert.ok(!ok([79, 64, 60, 48]) && !ok([60, 67, 52, 48]), 'the wrong options break spacing or crossing');
});

test('unlocking: regular boss after its stretch, EX after the boss plus every advanced level and side quest in the stretch', () => {
  const mimi = BOSSES.find((b) => b.id === 'mimi');
  const mimiEx = exOf(mimi);
  assert.equal(baseOf(mimiEx), mimi);
  const basics = UNITS.filter((u) => u.section === 'basics');
  assert.ok(!bossOpen(mimi, UNITS, SIDES, progressWith(basics.slice(0, -1).map((u) => u.id))));
  const mains = basics.map((u) => u.id);
  assert.ok(bossOpen(mimi, UNITS, SIDES, progressWith(mains)));
  assert.ok(!bossOpen(mimiEx, UNITS, SIDES, progressWith([...mains, bossKey('mimi')])), 'EX needs the advanced levels');
  const branches = mains.flatMap((id) => [1, 2, 3, 4, 5].map((s) => `${id}:${s}`));
  const sides = SIDES.filter((s) => mains.includes(s.parent)).flatMap((s) => [s.id, ...[1, 2, 3, 4, 5].map((k) => `${s.id}:${k}`)]);
  assert.ok(!bossOpen(mimiEx, UNITS, SIDES, progressWith([...mains, ...branches, ...sides])), 'EX needs the regular boss');
  assert.ok(bossOpen(mimiEx, UNITS, SIDES, progressWith([...mains, ...branches, ...sides, bossKey('mimi')])));
  // 章节测试 / EX 章节测试不在条件里
  assert.ok(!sides.includes('chapter@basics'));
  // 道中 Boss 只看第 1–8 节
  const sever = BOSSES.find((b) => b.id === 'sever-mid');
  const firstEight = UNITS.filter((u) => u.section === 'harmony').slice(0, 8).map((u) => u.id);
  assert.equal(firstEight.at(-1), 'voicing');
  assert.ok(bossOpen(sever, UNITS, SIDES, progressWith(firstEight)));
});

test('midpoint bosses block the next level: chapter 2 §9 and chapter 4 §9 open only after the boss', () => {
  assert.deepEqual(BOSS_GATES, { cadences: 'boss@sever-mid', melodicminor: 'boss@jaz-mid' });
  ['cadences', 'melodicminor'].forEach((id) => {
    const i = UNITS.findIndex((u) => u.id === id);
    const before = UNITS[i - 1].id;
    assert.equal(BOSSES.find((b) => b.id === gateBossFor(id)).after, before);
    assert.equal(UNITS[i].gate, BOSS_GATES[id]);
    assert.ok(!isUnlocked(UNITS, i, progressWith([before])), `${id} stays locked without the boss`);
    assert.ok(isUnlocked(UNITS, i, progressWith([before, BOSS_GATES[id]])));
    assert.ok(isUnlocked(UNITS, i, progressWith([id])), 'an already-cleared level stays open');
  });
  assert.equal(parseBossKey('boss@jaz-mid'), 'jaz-mid');
  assert.equal(parseBossKey('boss@nobody'), null);
});

test('a boss fight has exactly 15 questions: misses show the explanation but are not re-queued', () => {
  const b = BOSSES.find((x) => x.id === 'noa');
  const cards = bossCards(b, UNITS, SIDES).filter((c) => c.type !== 'gen');
  const session = createSession({ id: bossKey(b.id), cards }, { shuffleQuestions: false });
  session.noRetry = true;
  while (!isFinished(session)) { answer(session, -1); advance(session); }
  assert.equal(session.queue.length, cards.length);
  assert.equal(starsFor(session), 1, 'finishing always earns at least one star');
  assert.equal(endingState(1), 'one_star');
  assert.equal(endingState(3), 'three_star');
  assert.ok(gradeCard(cards[0], cards[0].answer));
});

test('sprite states: every state a fight can show exists as a file for that character', () => {
  BOSSES.forEach((b) => {
    const dir = CAST[b.cast].dir;
    statesUsed(b).forEach((s) => assert.ok(existsSync(new URL(spriteFile(dir, s), import.meta.url)), `${b.id}: ${spriteFile(dir, s)}`));
  });
  // 初次见面 / 再次见面只有塞维尔和爵有
  assert.deepEqual([...new Set(BOSSES.filter((b) => ['first_meeting', 'return_meeting'].includes(b.sprite)).map((b) => b.cast))], ['sever', 'jaz']);
  assert.equal(askState({ phase: true, mode: 'probe' }, 9), 'phase2');
  assert.equal(reactState(true, { streak: 3, wrongs: 0, answered: 3 }, 'mimi').state, 'streak');
  // 答对时不用受击 / 震惊表情（不强调打斗）
  for (let n = 1; n <= 15; n++) assert.ok(!['hurt', 'shocked'].includes(reactState(true, { streak: n, wrongs: 0, answered: n }, 'jaz').state));
  assert.equal(reactState(false, { wrongStreak: 2, answered: 4 }, 'mimi').state, 'angry');
});

test('no flip when the picture does not change: identical sprite files share one path; same-picture switches skip the animation', async () => {
  const { createHash } = await import('node:crypto');
  const { readFileSync } = await import('node:fs');
  const { SAME_PICTURE, BOSS_STATES: STATES } = await import('./boss_sprite.js');
  const md5 = (path) => createHash('md5').update(readFileSync(new URL(path, import.meta.url))).digest('hex');
  for (const { dir } of Object.values(CAST)) {
    const raw = (state) => `resources/boss/${dir}/${{ idle: 'poses', first_meeting: 'boss' }[state] || 'expressions'}/${state}.webp`;
    // 别名必须真的是同一张图
    for (const [alias, base] of Object.entries(SAME_PICTURE)) {
      if (!existsSync(new URL(raw(alias), import.meta.url))) continue;
      assert.equal(md5(raw(alias)), md5(spriteFile(dir, base)), `${dir}: ${alias} = ${base}`);
      assert.equal(spriteFile(dir, alias), spriteFile(dir, base));
    }
    // 其余状态都是不同的图（换过去要翻转）
    const files = STATES.filter((s) => !SAME_PICTURE[s]).map((s) => spriteFile(dir, s)).filter((f) => existsSync(new URL(f, import.meta.url)));
    assert.equal(new Set(files.map(md5)).size, files.length, `${dir}: unexpected duplicate pictures`);
  }
});

test('relationship, EX form and cameos: greeting level follows progress, EX starts in phase two, cameos only from beaten bosses and respect the chance', async () => {
  const { relationLevel, pickCameo, CAMEO_CHANCE } = await import('./learn_bosses.js');
  assert.equal(CAMEO_CHANCE, 0.05);
  assert.equal(relationLevel('mimi', { units: {} }), 0);
  assert.equal(relationLevel('mimi', { units: { 'boss@mimi': { done: true, stars: 2 } } }), 1);
  assert.equal(relationLevel('mimi', { units: { 'boss@mimi': { done: true, stars: 3 } } }), 2);
  assert.equal(relationLevel('mimi', { units: { 'boss@mimi-ex': { done: true, stars: 1 } } }), 2);
  assert.equal(relationLevel('mimi', { units: { 'boss@mimi': { done: true, stars: 3 } } }, { exclude: 'mimi' }), 0);
  BOSSES.filter((b) => b.ex).forEach((b) => assert.equal(b.sprite, 'phase2', `${b.id}: EX opens in phase two`));
  assert.equal(askState({ mode: 'probe' }, 2, true), 'serious');
  assert.equal(askState({ mode: 'probe' }, 2, false), 'default');
  const beaten = { units: { 'boss@mimi': { done: true, stars: 2 }, 'boss@noa': { done: true, stars: 2 } } };
  assert.equal(pickCameo(beaten, { chance: 0 }), null);
  assert.equal(pickCameo({ units: {} }, { chance: 1 }), null, 'nobody beaten, nobody visits');
  const seen = new Set();
  for (let i = 0; i < 40; i++) {
    const hit = pickCameo(beaten, { chance: 1, context: 'mistake' });
    seen.add(hit.castId);
    assert.ok(CAST[hit.castId].lines.cameo.mistake.includes(hit.line));
  }
  assert.deepEqual([...seen].sort(), ['mimi', 'noa'], 'every beaten boss can cameo, including the current chapter’s');
  for (let i = 0; i < 20; i++) assert.equal(pickCameo(beaten, { chance: 1, avoid: 'mimi' }).castId, 'noa', 'the one who just appeared gives way');
  assert.equal(pickCameo({ units: { 'boss@noa': { done: true } } }, { chance: 1, avoid: 'noa' }).castId, 'noa', 'with only one beaten boss, it may repeat');
  let r = 0; const seq = [0.049, 0.051];
  assert.ok(pickCameo(beaten, { rng: () => seq[r++ % 2] }));
  r = 1; assert.equal(pickCameo(beaten, { rng: () => seq[r++ % 2] }), null);
});

test('level cameos: every level (main, advanced 1–4, mixed test) gives each character 3 lines about that level; the 6 levels of a unit never repeat a line', async () => {
  const { levelCameoLines, SPECIAL_TIPS } = await import('./learn_boss_cameo_gen.js');
  const { CAMEO_TIPS } = await import('./learn_boss_cameo_tips.js');
  const { LEVEL_CAMEOS } = await import('./learn_boss_cameos.js');
  const { pickCameo } = await import('./learn_bosses.js');
  const casts = Object.keys(CAST);
  const full = (v) => v && ['zh', 'ja', 'en'].every((l) => typeof v[l] === 'string' && v[l].trim().length > 4 && !/\{\w+\}/.test(v[l]));
  // 每个关卡都有自己的要点（第一章主关是整句手写），每条要点三语齐全，同一关 3 条互不相同
  for (const u of [...UNITS, ...SIDES]) {
    [u.id, ...u.branch.map((_, i) => `${u.id}:${i + 1}`)].forEach((k) => {
      if (LEVEL_CAMEOS[k]) return;
      const tips = CAMEO_TIPS[k];
      assert.equal(tips?.length, 3, `${k}: 3 tips`);
      tips.forEach((t) => assert.ok(full(t), `${k}: tip in zh/ja/en`));
      assert.equal(new Set(tips.map((t) => t.zh)).size, 3, `${k}: tips differ`);
    });
    const seen = new Set();
    [u.id, 1, 2, 3, 4, 5].map((s) => (s === u.id ? s : `${u.id}:${s}`)).forEach((k) => casts.forEach((c) => {
      const lines = levelCameoLines(k, c);
      assert.equal(lines?.length, 3, `${k}/${c}: 3 lines`);
      lines.forEach((v) => {
        assert.ok(full(v), `${k}/${c}: line in zh/ja/en`);
        assert.ok(!seen.has(`${c}|${v.zh}`), `${k}/${c}: line repeats inside unit ${u.id}`);
        seen.add(`${c}|${v.zh}`);
        assert.ok(!/杂鱼|雑魚|small fry/i.test(v.zh + v.ja + v.en));
        if (c === 'zero') assert.ok(!/[!！]/.test(v.zh + v.ja + v.en), `${k}: Zero never shouts`);
      });
    }));
  }
  ['basics', 'harmony', 'melody', 'jazz', 'world', 'modern'].forEach((s) => assert.equal(SPECIAL_TIPS[`test:${s}`]?.length, 3, `chapter test ${s}`));
  ['chapter@harmony', 'chapter-ex@modern', 'final', 'final-ex'].forEach((k) => casts.forEach((c) => assert.equal(levelCameoLines(k, c)?.length, 3, `${k}/${c}`)));
  // pickCameo 用这一关的台词；复习仍用通用台词
  const beaten = { units: { 'boss@noa': { done: true, stars: 2 } } };
  const hit = pickCameo(beaten, { chance: 1, section: 'basics', context: 'done', levelKey: 'keys:3' });
  assert.ok(levelCameoLines('keys:3', 'noa').some((v) => v.zh === hit.line.zh));
  const rev = pickCameo(beaten, { chance: 1, context: 'review', levelKey: 'keys:3' });
  assert.ok(CAST.noa.lines.cameo.review.includes(rev.line));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { questionOrder, gradeCard, createSession, currentItem, answer, advance, isFinished, starsFor, completeUnit, emptyProgress, isUnlocked, nextUnitIndex, shuffle } from './learn_engine.js';

const unit = {
  id: 'u1',
  cards: [
    { type: 'guide' },
    { type: 'choice', answer: 1 },
    { type: 'fill', answer: ['H', 'H'] },
    { type: 'match', pairs: [['a', '1'], ['b', '2']] },
  ],
};

test('grading for each card type', () => {
  assert.equal(gradeCard(unit.cards[1], 1), true);
  assert.equal(gradeCard(unit.cards[1], 0), false);
  assert.equal(gradeCard(unit.cards[2], ['H', 'H']), true);
  assert.equal(gradeCard(unit.cards[2], ['H', 'W']), false);
  assert.equal(gradeCard(unit.cards[3], { 0: 0, 1: 1 }), true);
  assert.equal(gradeCard(unit.cards[3], { 0: 1, 1: 0 }), false);
});

test('a wrong answer comes back once at the end; stars count first tries', () => {
  const session = createSession(unit, { shuffleQuestions: false });
  const play = (response) => { answer(session, response); advance(session); };
  play(null);          // guide
  play(0);             // choice wrong → requeued
  play(['H', 'H']);    // fill right
  play({ 0: 0, 1: 1 }); // match right
  assert.equal(currentItem(session).retry, true);
  play(1);             // retry right
  assert.ok(isFinished(session));
  assert.equal(session.firstTry, 2);
  assert.equal(starsFor(session), 2);
});

test('progress: completion, best stars, streak and unlocking', () => {
  const units = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  let progress = emptyProgress();
  assert.ok(isUnlocked(units, 0, progress));
  assert.ok(!isUnlocked(units, 1, progress));
  const session = { questions: 4, firstTry: 4 };
  progress = completeUnit(progress, 'a', session, new Date('2026-10-01T10:00:00Z'));
  assert.equal(progress.units.a.stars, 3);
  assert.equal(progress.xp, 50);
  assert.equal(progress.streak, 1);
  assert.ok(isUnlocked(units, 1, progress));
  assert.equal(nextUnitIndex(units, progress), 1);
  progress = completeUnit(progress, 'b', { questions: 4, firstTry: 1 }, new Date('2026-10-02T09:00:00Z'));
  assert.equal(progress.streak, 2);
  progress = completeUnit(progress, 'a', { questions: 4, firstTry: 0 }, new Date('2026-10-05T09:00:00Z'));
  assert.equal(progress.units.a.stars, 3, 'keeps best stars');
  assert.equal(progress.streak, 1, 'streak resets after a gap');
  assert.ok(isUnlocked(units, 2, { ...emptyProgress(), unlockAll: true }));
});

test('shuffle keeps every item', () => {
  let x = 7;
  const rng = () => { x = (x * 16807) % 2147483647; return x / 2147483647; };
  assert.deepEqual(shuffle([1, 2, 3, 4, 5], rng).sort(), [1, 2, 3, 4, 5]);
});

test('question order: guides stay put, questions shuffle within their block', () => {
  const cards = [{ type: 'guide' }, { type: 'choice' }, { type: 'fill' }, { type: 'match' }, { type: 'guide' }, { type: 'choice' }, { type: 'choice' }];
  const seen = new Set();
  for (let seed = 1; seed < 30; seed += 1) {
    let x = seed;
    const rng = () => { x = (x * 16807) % 2147483647; return x / 2147483647; };
    const order = questionOrder(cards, rng);
    assert.equal(order[0], 0);
    assert.equal(order[4], 4);
    assert.deepEqual(order.slice(1, 4).sort(), [1, 2, 3]);
    assert.deepEqual(order.slice(5).sort(), [5, 6]);
    seen.add(order.join());
  }
  assert.ok(seen.size > 2, 'order changes between plays');
});

test('branch levels unlock in order; mixed and final pools', async () => {
  const { isLevelUnlocked, levelKey, buildMixedCards, buildFinalCards, finalUnlocked, finalExUnlocked, branchDone, saveResume, loadResume, clearResume, parseLevelKey } = await import('./learn_engine.js');
  const mk = (id) => ({ id, cards: [{ type: 'guide' }, { type: 'choice', answer: 0, tag: id }], branch: [1, 2, 3, 4].map((k) => ({ cards: [{ type: 'guide' }, { type: 'choice', answer: 0, tag: `${id}${k}` }] })) });
  const units = [mk('a'), mk('b')];
  let progress = emptyProgress();
  assert.ok(!isLevelUnlocked(units, 0, 1, progress), 'advanced needs the main level');
  progress = completeUnit(progress, 'a', { questions: 1, firstTry: 1 });
  assert.ok(isLevelUnlocked(units, 0, 1, progress));
  assert.ok(!isLevelUnlocked(units, 0, 2, progress));
  progress = completeUnit(progress, levelKey('a', 1), { questions: 1, firstTry: 1 });
  assert.ok(isLevelUnlocked(units, 0, 2, progress));
  assert.deepEqual(parseLevelKey('a:3'), { unitId: 'a', slot: 3 });
  const mix = buildMixedCards(units[0], { total: 4, fromMain: 1 });
  assert.equal(mix.length, 4);
  assert.ok(mix.every((c) => c.type !== 'guide'));
  assert.equal(mix.filter((c) => c.tag === 'a').length, 1, 'only one main-level question');
  assert.equal(buildFinalCards(units).length, 10, 'small pools: everything fits');
  assert.equal(buildFinalCards(units, { total: 5 }).length, 5);
  // 每个主关两道题，主关题库够 44 道
  const mk2 = (id) => ({ ...mk(id), cards: [{ type: 'guide' }, { type: 'choice', answer: 0, tag: id, prompt: 1 }, { type: 'choice', answer: 0, tag: id, prompt: 2 }] });
  const many = Array.from({ length: 30 }, (_, i) => mk2(`u${i}`));
  const final = buildFinalCards(many);
  assert.equal(final.length, 50);
  const isAdvanced = (card) => many.some((u) => u.branch.some((l) => l.cards.includes(card)));
  assert.equal(final.filter(isAdvanced).length, 6, 'final: 44 main + 6 advanced');
  assert.equal(new Set(final.filter((c) => !isAdvanced(c)).map((c) => c.tag)).size, 30, 'main questions spread over every level first');
  const exam = buildFinalCards(many, { ex: true });
  assert.equal(exam.length, 50);
  assert.equal(exam.filter(isAdvanced).length, 45, 'EX: 45 advanced + 5 main');
  const genUnit = { id: 'g', cards: [{ type: 'choice', tag: 'm' }], branch: [{ cards: [{ type: 'guide' }, { type: 'gen', gen: 'plr', count: 6 }] }] };
  assert.equal(buildMixedCards(genUnit, { total: 5, fromMain: 1 }).filter((c) => c.type === 'gen').length, 4, 'generated questions are split');
  // 默认 12 题：进阶 10 + 主关 2；主关的"出 5 道"生成卡也拆开，不会把题数撑大
  const mixUnit = { id: 'x', cards: [{ type: 'gen', gen: 'plr', count: 5, tag: 'm' }, { type: 'choice', tag: 'm' }], branch: [1, 2, 3, 4].map(() => ({ cards: [{ type: 'gen', gen: 'plr', count: 4, tag: 'a' }] })) };
  const mixed = buildMixedCards(mixUnit);
  assert.equal(mixed.reduce((n, c) => n + (c.type === 'gen' ? c.count ?? 1 : 1), 0), 12, 'mixed test: 12 questions');
  assert.equal(mixed.filter((c) => c.tag === 'm').length, 2, 'mixed test: 2 main + 10 advanced');
  assert.ok(!finalUnlocked(units, progress));
  progress = completeUnit(progress, 'b', { questions: 1, firstTry: 1 });
  assert.ok(finalUnlocked(units, progress));
  progress = completeUnit(progress, 'final', { questions: 1, firstTry: 1 });
  assert.ok(!finalExUnlocked(units, progress));
  for (const id of ['a', 'b']) for (let s = 1; s <= 5; s += 1) progress = completeUnit(progress, levelKey(id, s), { questions: 1, firstTry: 1 });
  assert.ok(branchDone(progress, 'a') && finalExUnlocked(units, progress));
  const store = new Map(); const storage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v), removeItem: (k) => store.delete(k) };
  saveResume({ key: 'a:2', position: 3 }, storage);
  assert.deepEqual(loadResume(storage), { key: 'a:2', position: 3 });
  clearResume(storage);
  assert.equal(loadResume(storage), null);
});

test('review box: mistakes come back after 1, 3, 7, 14 days and leave after four right answers', async () => {
  const { recordMistake, recordReviewAnswer, dueReview, cardId } = await import('./learn_engine.js');
  const card = { type: 'choice', prompt: 'q', options: ['a', 'b'], answer: 0 };
  const day = (s) => new Date(`${s}T12:00:00Z`);
  let list = recordMistake([], card, 'keys', day('2026-10-01'));
  assert.equal(list.length, 1);
  assert.equal(list[0].due, '2026-10-02');
  assert.equal(dueReview(list, day('2026-10-01')).length, 0);
  assert.equal(dueReview(list, day('2026-10-02')).length, 1);
  list = recordMistake(list, card, 'keys', day('2026-10-01'));
  assert.equal(list.length, 1, 'same card is not added twice');
  assert.equal(list[0].wrong, 2);
  const id = cardId(card);
  list = recordReviewAnswer(list, id, true, day('2026-10-02')); assert.equal(list[0].box, 2); assert.equal(list[0].due, '2026-10-05');
  list = recordReviewAnswer(list, id, false, day('2026-10-05')); assert.equal(list[0].box, 1); assert.equal(list[0].due, '2026-10-06');
  [1, 2, 3, 4].forEach(() => { list = recordReviewAnswer(list, id, true, day('2026-10-06')); });
  assert.equal(list.length, 0, 'four right answers in a row clear it');
  assert.deepEqual(recordMistake([], { type: 'guide' }, 'keys'), []);
});

test('progress export and import round-trip; foreign files are refused', async () => {
  const { exportProgress, importProgress } = await import('./learn_engine.js');
  const store = new Map([['jc-learn-progress', JSON.stringify({ units: { keys: { stars: 3, done: true } }, xp: 40 })], ['jc-learn-review', '[]']]);
  const storage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v), removeItem: (k) => store.delete(k) };
  const file = JSON.stringify(exportProgress(storage));
  store.clear();
  assert.ok(importProgress(file, storage));
  assert.equal(JSON.parse(store.get('jc-learn-progress')).units.keys.stars, 3);
  assert.equal(importProgress('{"app":"other","data":{}}', storage), false);
  assert.equal(importProgress('not json', storage), false);
});

test('future-topic branches and side quests require every prerequisite, preserve completed records and debug access', async () => {
  const { isLevelUnlocked, isSideLevelUnlocked, unitLevelKeys, setLevelStars, MIX_SLOT } = await import('./learn_engine.js');
  const { UNITS, SIDES } = await import('./learn_content.js');
  for (const id of ['dictation', 'pentaharm']) {
    const side = SIDES.find((s) => s.id === id);
    let p = setLevelStars(emptyProgress(), unitLevelKeys(side.parent), 1);
    assert.equal(isSideLevelUnlocked(side, 0, p), false, `${id}: parent alone insufficient`);
    for (const prereq of side.prerequisites.slice(0, -1)) p = setLevelStars(p, [prereq], 1);
    assert.equal(isSideLevelUnlocked(side, 0, p), false, 'one missing prerequisite still blocks');
    p = setLevelStars(p, side.prerequisites, 1);
    assert.equal(isSideLevelUnlocked(side, 0, p), true);
    assert.equal(isSideLevelUnlocked(side, 1, p), false, 'branch still needs side main');
    p = setLevelStars(p, [side.id], 1);
    assert.equal(isSideLevelUnlocked(side, 1, p), true);
    assert.equal(isSideLevelUnlocked(side, 0, setLevelStars(emptyProgress(), [side.id], 1)), true, 'completed side remains replayable');
  }
  const index = UNITS.findIndex((u) => u.id === 'guidetone');
  let p = setLevelStars(emptyProgress(), ['guidetone', 'guidetone:1', 'guidetone:2', 'guidetone:3'], 1);
  assert.equal(isLevelUnlocked(UNITS, index, 4, p), false);
  p = setLevelStars(p, ['substitutions', 'chordscale', 'lcc'], 1);
  assert.equal(isLevelUnlocked(UNITS, index, 4, p), true);
  p = setLevelStars(p, ['guidetone:4', 'jazzvoicing'], 1);
  assert.equal(isLevelUnlocked(UNITS, index, MIX_SLOT, p), true);
  assert.equal(isLevelUnlocked(UNITS, index, 4, { ...emptyProgress(), unlockAll: true }), true);
});

test('normal A chapter tests do not draw advanced topics requiring later chapters', async () => {
  const { buildChapterCards } = await import('./learn_engine.js');
  const q = (tag) => ({ type: 'choice', tag });
  const units = [{ id: 'current', cards: Array.from({ length: 18 }, () => q('main')), branch: [
    { cards: [q('taught1'), q('taught2')] },
    { prerequisites: ['future'], cards: [q('future1'), q('future2')] },
  ] }];
  for (const rng of [() => 0, () => 0.5, () => 0.99]) {
    const cards = buildChapterCards(units, {}, rng);
    assert.equal(cards.length, 20);
    assert.ok(cards.every((c) => !c.tag.startsWith('future')));
  }
});

test('side quests: unlock after the whole parent unit, feed only the EX final, and gate the EX final', async () => {
  const { isSideLevelUnlocked, unitFullyDone, finalExUnlocked, buildFinalCards, setLevelStars, unitLevelKeys, emptyProgress, levelKey } = await import('./learn_engine.js');
  const side = { id: 's', parent: 'a', cards: [{ type: 'choice', tag: 'side' }], branch: [1, 2, 3, 4].map((k) => ({ cards: [{ type: 'choice', tag: `side${k}` }] })) };
  const units = [{ id: 'a', cards: [{ type: 'choice', tag: 'a' }], branch: [1, 2, 3, 4].map((k) => ({ cards: [{ type: 'choice', tag: `a${k}` }] })) }];
  let progress = setLevelStars(emptyProgress(), ['a', 'a:1', 'a:2', 'a:3', 'a:4'], 3);
  assert.ok(!isSideLevelUnlocked(side, 0, progress), 'needs the mixed test too');
  progress = setLevelStars(progress, ['a:5'], 3);
  assert.ok(unitFullyDone(progress, 'a') && isSideLevelUnlocked(side, 0, progress));
  assert.ok(!isSideLevelUnlocked(side, 1, progress));
  progress = setLevelStars(progress, ['final'], 3);
  assert.ok(!finalExUnlocked(units, progress, [side]), 'EX waits for the side quest');
  progress = setLevelStars(progress, unitLevelKeys('s'), 3);
  assert.ok(finalExUnlocked(units, progress, [side]));
  const normal = buildFinalCards(units, { total: 10, sides: [side] });
  assert.ok(!normal.some((c) => String(c.tag).startsWith('side')), 'the normal final never uses side quests');
  const ex = buildFinalCards(units, { ex: true, total: 10, sides: [side] });
  assert.ok(ex.some((c) => String(c.tag).startsWith('side')), 'the EX final includes side quests');
  assert.equal(levelKey('s', 2), 's:2');
});

test('fill answers compare by label, so identical chips are interchangeable', async () => {
  const { gradeCard: isCorrect } = await import('./learn_engine.js');
  const card = { type: 'fill', bank: [{ id: 'a', label: '半音' }, { id: 'b', label: '半音' }, { id: 'c', label: '全音' }], answer: ['a', 'b'] };
  assert.ok(isCorrect(card, ['b', 'a']));
  assert.ok(!isCorrect(card, ['a', 'c']));
});

test('chapter tests: 18 main + 2 advanced without side quests; EX 25 advanced incl. the chapter side quests + 5 main', async () => {
  const { buildChapterCards, chapterUnlocked, chapterExUnlocked, chapterKey, parseChapterKey, CHAPTER_COUNTS, setLevelStars, unitLevelKeys, levelKey, emptyProgress } = await import('./learn_engine.js');
  // 每关主关 4 题、每个进阶关 3 题，题目带来源标记
  const q = (tag, n) => Array.from({ length: n }, (_, k) => ({ type: 'choice', answer: 0, tag, prompt: `${tag}-${k}` }));
  const mk = (id) => ({ id, cards: [{ type: 'guide' }, ...q(`${id}:main`, 4)], branch: [1, 2, 3, 4].map((k) => ({ cards: q(`${id}:adv`, 3) })) });
  const units = ['a', 'b', 'c', 'd', 'e', 'f'].map(mk);
  const sides = [{ id: 's1', parent: 'a', cards: q('s1:side', 4), branch: [1, 2, 3, 4].map(() => ({ cards: q('s1:side', 3) })) }];
  const kind = (card) => card.tag.split(':')[1];
  for (let run = 0; run < 20; run += 1) {
    const normal = buildChapterCards(units, { sides });
    assert.equal(normal.length, CHAPTER_COUNTS.normal.main + CHAPTER_COUNTS.normal.advanced);
    assert.equal(normal.filter((c) => kind(c) === 'main').length, 18);
    assert.equal(normal.filter((c) => kind(c) === 'adv').length, 2);
    assert.ok(!normal.some((c) => kind(c) === 'side'), 'no side-quest questions in the normal chapter test');
    const ex = buildChapterCards(units, { ex: true, sides });
    assert.equal(ex.length, 30);
    assert.equal(ex.filter((c) => kind(c) === 'main').length, 5);
    assert.equal(ex.filter((c) => kind(c) !== 'main').length, 25);
    assert.equal(new Set(ex).size, 30, 'no repeats');
  }
  // 题库里能抽到支线的题
  assert.ok(Array.from({ length: 30 }, () => buildChapterCards(units, { ex: true, sides })).some((cards) => cards.some((c) => kind(c) === 'side')));
  // 解锁
  assert.deepEqual(parseChapterKey(chapterKey('basics', true)), { sectionId: 'basics', ex: true });
  assert.equal(parseChapterKey('basics'), null);
  let progress = emptyProgress();
  assert.equal(chapterUnlocked(units, progress), false);
  progress = setLevelStars(progress, units.map((u) => levelKey(u.id)), 3);
  assert.equal(chapterUnlocked(units, progress), true, 'main levels are enough for the normal test');
  assert.equal(chapterExUnlocked('x', units, progress, sides), false);
  progress = setLevelStars(progress, units.flatMap((u) => unitLevelKeys(u.id)), 3);
  assert.equal(chapterExUnlocked('x', units, progress, sides), false, 'the normal chapter test is still missing');
  progress = setLevelStars(progress, [chapterKey('x')], 2);
  assert.equal(chapterExUnlocked('x', units, progress, sides), false, 'the side quest is still missing');
  progress = setLevelStars(progress, unitLevelKeys('s1'), 1);
  assert.equal(chapterExUnlocked('x', units, progress, sides), true);
});

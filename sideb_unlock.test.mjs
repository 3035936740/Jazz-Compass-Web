// Side-B 渐进开放（真实课程数据）：A 面第一章章节测试通过后出现；每关按 A 面已经学过的主关开放，章内按顺序；
// 扩展关还要 A 面的进阶关；Side-B Final / EX Final 还要 A 面结业挑战 / EX 结业挑战。旧存档保持原来的开放状态。
import test from 'node:test';
import assert from 'node:assert/strict';
import { UNITS, SIDES } from './learn_content.js';
import { B_CHAPTERS, B_LEVELS, chapterLevels, isPlayable, hasExtLevel } from './sideb_content.js';
import { bLevelOpen, extOpen, aPrereqs, sidebUnlocked, SIDEB_OPEN_KEY, bKey } from './sideb_engine.js';
import { chapterKey, emptyProgress, setLevelStars } from './learn_engine.js';

const ctx = { units: UNITS, sides: SIDES };
const playable = B_LEVELS.filter(isPlayable);
const listOf = (lv) => chapterLevels(lv.chapter).filter(isPlayable);
const openIds = (p) => playable.filter((lv) => bLevelOpen(lv, listOf(lv), p, ctx)).map((lv) => lv.id);
const mainsOf = (section) => UNITS.filter((u) => u.section === section).map((u) => u.id);

test('the Side-A key that opens Side-B matches the engine', () => {
  assert.equal(chapterKey('basics'), SIDEB_OPEN_KEY);
});

test('every Side-B level names real Side-A prerequisites; only synthesis levels have none, and never as a chapter’s first level', () => {
  const mains = new Set(UNITS.map((u) => u.id));
  playable.forEach((lv) => {
    const pre = aPrereqs(lv, UNITS, SIDES);
    pre.forEach((id) => assert.ok(mains.has(id), `${lv.id}: ${id}`));
    if (!pre.length) assert.notEqual(listOf(lv)[0].id, lv.id, `${lv.id}: a chapter cannot start with a level that has no Side-A prerequisite`);
  });
});

test('a fresh player: nothing until the chapter-1 test, then only what chapter 1 has taught', () => {
  let p = emptyProgress();
  assert.equal(sidebUnlocked(p), false);
  assert.deepEqual(openIds(p), []);
  p = setLevelStars(p, [...mainsOf('basics'), SIDEB_OPEN_KEY], 2);
  assert.equal(sidebUnlocked(p), true);
  assert.deepEqual(openIds(p), [chapterLevels('basics').filter(isPlayable)[0].id], 'only the first B1 level — the rest of chapter 1 follows in order');
  // 学到第二章：B2 的第一关跟着开，不必先做完 B1
  p = setLevelStars(p, mainsOf('harmony'), 2);
  const b2first = chapterLevels('harmony').filter(isPlayable)[0];
  assert.ok(openIds(p).includes(b2first.id));
  // 第三章（旋律）还没学：B3 一关都不开
  assert.ok(!openIds(p).some((id) => id.startsWith('B3-')));
});

test('B-side progress inside a chapter follows the original teaching order', () => {
  let p = setLevelStars(emptyProgress(), [...UNITS.map((u) => u.id), SIDEB_OPEN_KEY], 3);
  B_CHAPTERS.forEach((c) => assert.ok(openIds(p).includes(chapterLevels(c.id).filter(isPlayable)[0].id), `${c.id}: first level open once Side A is learned`));
  const b1 = chapterLevels('basics').filter(isPlayable);
  assert.ok(!openIds(p).includes(b1[1].id));
  p = setLevelStars(p, [bKey(b1[0].id)], 2);
  assert.ok(openIds(p).includes(b1[1].id));
});

test('old saves: a player who already cleared the EX final keeps everything open that the old linear rule opened', () => {
  // 旧规则：EX 结业挑战通关 → 全部 B 关按地图顺序（跨章）一关一关开放。旧存档里 EX 结业挑战通关意味着 A 面主关、进阶关、支线都已通关。
  const aAll = [...UNITS.flatMap((u) => [u.id, ...[1, 2, 3, 4, 5].map((s) => `${u.id}:${s}`)]), ...SIDES.map((s) => s.id), 'final', 'final-ex'];
  let p = setLevelStars(emptyProgress(), aAll, 3);
  const done = playable.slice(0, 20);
  p = setLevelStars(p, done.map((lv) => bKey(lv.id)), 2);
  const oldOpen = playable.filter((lv, i) => i === 0 || p.units[bKey(playable[i - 1].id)]?.done || p.units[bKey(lv.id)]?.done).map((lv) => lv.id);
  const nowOpen = new Set(openIds(p));
  oldOpen.forEach((id) => assert.ok(nowOpen.has(id), `${id} was open before and must stay open`));
  done.filter(hasExtLevel).forEach((lv) => assert.ok(extOpen(lv, p, ctx), `${lv.id}x stays open`));
});

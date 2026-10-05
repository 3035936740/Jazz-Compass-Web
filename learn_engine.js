// 乐理闯关的规则：判分、关卡队列（答错的题在本关末尾再出现一次）、解锁、星级、经验值与连续天数
// 纯逻辑，可在 Node 中测试；界面见 learn_ui.js，题目见 learn_content.js

/** 判分：choice 比较选项序号；fill 按空格顺序比较；match 比较配对（左项序号 → 右项序号） */
export function gradeCard(card, response) {
  if (card.type === 'choice') return response === card.answer;
  if (card.type === 'fill') {
    // 按填进去的文字比较：两个写着同样文字的词块可以互换（例如两个空都填"半音"）
    const label = (id) => JSON.stringify(card.bank?.find((b) => b.id === id)?.label ?? id);
    return Array.isArray(response) && response.length === card.answer.length && response.every((value, i) => value === card.answer[i] || label(value) === label(card.answer[i]));
  }
  if (card.type === 'match') {
    // 右边文字完全相同的两项可以互换（例如两个"从上数第二线"）：连到任何一个都算对
    const right = (j) => JSON.stringify(card.pairs[j]?.[1]);
    return card.pairs.every((_, i) => response?.[i] === i || (response?.[i] !== undefined && right(response[i]) === right(i)));
  }
  return true;
}

/** Fisher–Yates 洗牌（rng 可注入以便测试） */
export function shuffle(items, rng = Math.random) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** 题目顺序：引导卡位置不动，每张引导卡之后的那一段题目在段内打乱（每次游玩都不同） */
export function questionOrder(cards, rng = Math.random) {
  const order = [];
  let run = [];
  const flush = () => { order.push(...shuffle(run, rng)); run = []; };
  cards.forEach((card, index) => {
    if (card.type === 'guide') { flush(); order.push(index); } else run.push(index);
  });
  flush();
  return order;
}

/** 一局关卡：出卡（默认段内打乱），答错的题目移到队尾再练一次（每题最多重来一次） */
export function createSession(unit, { shuffleQuestions = true, rng = Math.random } = {}) {
  const order = shuffleQuestions ? questionOrder(unit.cards, rng) : unit.cards.map((_, i) => i);
  const queue = order.map((index) => ({ card: unit.cards[index], index, retry: false }));
  return { unitId: unit.id, queue, position: 0, answered: 0, firstTry: 0, questions: unit.cards.filter((c) => c.type !== 'guide').length, mistakes: [] };
}

export const currentItem = (session) => session.queue[session.position] ?? null;
export const isFinished = (session) => session.position >= session.queue.length;
export const progressRatio = (session) => (session.queue.length ? session.position / session.queue.length : 1);

/** 记录作答并前进；返回 { correct } */
export function answer(session, response) {
  const item = currentItem(session);
  if (!item) return { correct: false };
  const correct = gradeCard(item.card, response);
  if (item.card.type !== 'guide') {
    session.answered += 1;
    if (correct && !item.retry) session.firstTry += 1;
    if (!correct && !item.retry) {
      session.mistakes.push(item.index);
      session.queue.push({ ...item, retry: true });
    }
  }
  return { correct };
}

export function advance(session) {
  session.position += 1;
}

/** 星级：一次答对的比例 ≥ 90% 三星，≥ 60% 两星，其余一星（完成即至少一星） */
export function starsFor(session) {
  if (!session.questions) return 3;
  const ratio = session.firstTry / session.questions;
  return ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1;
}

// ---------- 进度 ----------
const STORAGE_KEY = 'jc-learn-progress';
export const emptyProgress = () => ({ units: {}, xp: 0, streak: 0, lastDay: null, unlockAll: false });

export function loadProgress(storage = globalThis.localStorage) {
  try { return { ...emptyProgress(), ...(JSON.parse(storage.getItem(STORAGE_KEY)) || {}) }; } catch (_) { return emptyProgress(); }
}
export function saveProgress(progress, storage = globalThis.localStorage) {
  try { storage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (_) { /* 无痕模式等 */ }
}

const dayKey = (date) => date.toISOString().slice(0, 10);
const dayDiff = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

/** 完成一关：记录最好星级、经验值（每题 10，满星加 10）与连续天数 */
export function completeUnit(progress, unitId, session, now = new Date()) {
  const stars = starsFor(session);
  const previous = progress.units[unitId]?.stars ?? 0;
  const xp = session.questions * 10 + (stars === 3 ? 10 : 0);
  const today = dayKey(now);
  let streak = progress.streak;
  if (progress.lastDay !== today) streak = progress.lastDay && dayDiff(progress.lastDay, today) === 1 ? streak + 1 : 1;
  return {
    ...progress,
    units: { ...progress.units, [unitId]: { stars: Math.max(previous, stars), done: true } },
    xp: progress.xp + xp,
    streak,
    lastDay: today,
    earned: { stars, xp },
  };
}

/** 解锁：第一关总是开放；完成上一关后开放下一关；也可以全部解锁 */
export function isUnlocked(units, index, progress) {
  if (progress.unlockAll || index === 0) return true;
  return Boolean(progress.units[units[index - 1].id]?.done) || Boolean(progress.units[units[index].id]?.done);
}

/** 下一关：第一个未完成且已解锁的关卡 */
export function nextUnitIndex(units, progress) {
  const index = units.findIndex((unit, i) => !progress.units[unit.id]?.done && isUnlocked(units, i, progress));
  return index < 0 ? units.length - 1 : index;
}

// ---------- 分支关卡：主关 + 进阶 1–4 + 综合测验 ----------
export const BRANCH_SIZE = 4;            // 进阶关数量（不含综合测验）
export const MIX_SLOT = BRANCH_SIZE + 1; // 第 5 个进阶位：综合测验
export const levelKey = (unitId, slot = 0) => (slot ? `${unitId}:${slot}` : unitId);
export function parseLevelKey(key) {
  const [unitId, slot] = String(key).split(':');
  return { unitId, slot: slot ? Number(slot) : 0 };
}
export const isDone = (progress, key) => Boolean(progress.units[key]?.done);

/** 分支里的某一关是否开放：主关按原规则；进阶关要先过主关，再按顺序一关一关开放 */
export function isLevelUnlocked(units, unitIndex, slot, progress) {
  if (slot === 0) return isUnlocked(units, unitIndex, progress);
  if (progress.unlockAll) return true;
  const id = units[unitIndex].id;
  if (isDone(progress, levelKey(id, slot))) return true;
  return isDone(progress, levelKey(id, slot - 1)) && levelPrerequisites(units[unitIndex], slot).every((key) => isDone(progress, key));
}

/** 跨主题的进阶关等基础主关学完再开放；综合测验继承所有进阶前置。 */
export const levelPrerequisites = (unit, slot) => slot === MIX_SLOT
  ? [...new Set((unit.branch || []).flatMap((b) => b.prerequisites || []))]
  : unit.branch?.[slot - 1]?.prerequisites || [];

/** 一个关卡分支是否全部完成（进阶 1–4 与综合测验） */
export const branchDone = (progress, unitId) => Array.from({ length: MIX_SLOT }, (_, i) => i + 1).every((slot) => isDone(progress, levelKey(unitId, slot)));

const questionCards = (cards) => cards.filter((card) => card.type !== 'guide');

/** 生成器占位按数量拆成单题占位，方便抽题 */
const splitGenerated = (cards) => cards.flatMap((card) => (card.type === 'gen' ? Array.from({ length: card.count ?? 1 }, () => ({ ...card, count: 1 })) : [card]));

/** 综合测验：每次随机 12 题——这一关 4 个进阶关里的 10 题 + 主关 2 题；生成题拆开抽 */
export function buildMixedCards(unit, { total = 12, fromMain = 2 } = {}, rng = Math.random) {
  // 主关的生成题也拆成单题，免得一张"出 5 道"的生成卡把题数撑过 total
  const mainPool = shuffle(splitGenerated(questionCards(unit.cards)), rng);
  const main = mainPool.slice(0, fromMain);
  const advanced = shuffle(splitGenerated((unit.branch || []).flatMap((level) => questionCards(level.cards))), rng);
  const picked = [...main, ...advanced.slice(0, total - main.length)];
  // 进阶题不够时再补主关题
  if (picked.length < total) picked.push(...mainPool.slice(fromMain, fromMain + total - picked.length));
  return shuffle(picked, rng);
}

/** 从若干组里轮流各抽一道（组的顺序随机），尽量让题目分散到不同的关卡 */
function pickSpread(groups, count, rng) {
  const pools = shuffle(groups.map((group) => shuffle(group, rng)).filter((group) => group.length), rng);
  const picked = [];
  while (picked.length < count && pools.some((pool) => pool.length)) {
    for (const pool of pools) {
      if (picked.length >= count) break;
      if (pool.length) picked.push(pool.pop());
    }
  }
  return picked;
}

/** 从主关题、进阶题两边按数量抽题：每道生成题只算一道，同一关尽量只出一道；某一边不够时用另一边剩下的补满 */
function buildExamCards({ mainGroups, advancedGroups, total, advancedCount }, rng) {
  const advanced = pickSpread(advancedGroups, advancedCount, rng);
  const main = pickSpread(mainGroups, total - advanced.length, rng);
  const chosen = new Set([...main, ...advanced]);
  const rest = pickSpread([...advancedGroups, ...mainGroups].map((group) => group.filter((card) => !chosen.has(card))), total - chosen.size, rng);
  return shuffle([...main, ...advanced, ...rest], rng);
}
const mainGroupsOf = (units) => units.map((unit) => splitGenerated(questionCards(unit.cards)));
const advancedGroupsOf = (units, { taughtOnly = false } = {}) => {
  const taught = new Set(units.map((u) => u.id));
  return units.flatMap((unit) => (unit.branch || []).filter((level) => !taughtOnly || (level.prerequisites || []).every((id) => taught.has(id)))
    .map((level) => splitGenerated(questionCards(level.cards))));
};
/** 支线大关卡的主关和进阶关都算"进阶题"的题库 */
const sideGroupsOf = (sides) => sides.flatMap((side) => [side.cards, ...(side.branch || []).map((level) => level.cards)].map((cards) => splitGenerated(questionCards(cards))));

/**
 * 结业挑战：随机抽 total 道（默认 50）。
 *   普通版：44 道主关题 + 6 道进阶题（不含支线大关卡）
 *   EX 版：45 道进阶题 + 5 道主关题；进阶题的题库包含所有支线大关卡（主关和进阶）
 */
export function buildFinalCards(units, { ex = false, total = 50, sides = [] } = {}, rng = Math.random) {
  return buildExamCards({
    mainGroups: mainGroupsOf(units),
    advancedGroups: [...advancedGroupsOf(units), ...(ex ? sideGroupsOf(sides) : [])],
    total,
    advancedCount: Math.round(total * (ex ? 0.9 : 0.12)),
  }, rng);
}

// ---------- 章节测试：每个大章节结束时一个普通版、一个 EX 版 ----------
/** 普通版 18 道主关题 + 2 道进阶题（不含支线）；EX 版 25 道进阶题（含本章的支线大关卡）+ 5 道主关题 */
export const CHAPTER_COUNTS = { normal: { main: 18, advanced: 2 }, ex: { main: 5, advanced: 25 } };
export const chapterKey = (sectionId, ex = false) => `${ex ? 'chapter-ex' : 'chapter'}@${sectionId}`;
export function parseChapterKey(key) {
  const m = /^(chapter|chapter-ex)@(.+)$/.exec(String(key));
  return m ? { sectionId: m[2], ex: m[1] === 'chapter-ex' } : null;
}
/**
 * @param {object[]} units 这一章的主线关卡
 * @param {{ ex?: boolean, sides?: object[] }} options sides：挂在这一章关卡旁边的支线大关卡（只有 EX 版用）
 */
export function buildChapterCards(units, { ex = false, sides = [] } = {}, rng = Math.random) {
  const counts = CHAPTER_COUNTS[ex ? 'ex' : 'normal'];
  return buildExamCards({
    mainGroups: mainGroupsOf(units),
    advancedGroups: [...advancedGroupsOf(units, { taughtOnly: !ex }), ...(ex ? sideGroupsOf(sides) : [])],
    total: counts.main + counts.advanced,
    advancedCount: counts.advanced,
  }, rng);
}
/** 普通章节测试：这一章的主关都通关后开放 */
export const chapterUnlocked = (units, progress) => progress.unlockAll || units.every((unit) => isDone(progress, unit.id));
/** EX 章节测试：这一章的所有关卡（主关、进阶 1–4、综合测验、本章的支线大关卡）和普通章节测试都通关后开放 */
export const chapterExUnlocked = (sectionId, units, progress, sides = []) => progress.unlockAll || (isDone(progress, chapterKey(sectionId))
  && units.every((unit) => isDone(progress, unit.id) && branchDone(progress, unit.id)) && sides.every((side) => unitFullyDone(progress, side.id)));

export const FINAL_KEY = 'final';
export const FINAL_EX_KEY = 'final-ex';
export const finalUnlocked = (units, progress) => progress.unlockAll || units.every((unit) => isDone(progress, unit.id));
export const finalExUnlocked = (units, progress, sides = []) => isDone(progress, FINAL_KEY) && units.every((unit) => branchDone(progress, unit.id)) && sides.every((side) => unitFullyDone(progress, side.id));

// ---------- 学习记录：去工具里看一眼后，回到同一关的同一题 ----------
const RESUME_KEY = 'jc-learn-resume';
export function saveResume(record, storage = globalThis.localStorage) {
  try { storage.setItem(RESUME_KEY, JSON.stringify(record)); } catch (_) { /* 无痕模式等 */ }
}
export function loadResume(storage = globalThis.localStorage) {
  try { return JSON.parse(storage.getItem(RESUME_KEY)) || null; } catch (_) { return null; }
}
export function clearResume(storage = globalThis.localStorage) {
  try { storage.removeItem(RESUME_KEY); } catch (_) { /* ignore */ }
}

// ---------- 调试（控制台 class_debug(true) 打开）：直接改写星级 ----------
/** 某一关所有的关卡键：主关、进阶 1–4、综合测验 */
export const unitLevelKeys = (unitId) => [levelKey(unitId), ...Array.from({ length: MIX_SLOT }, (_, i) => levelKey(unitId, i + 1))];

/** 把若干关卡直接记为通关，星级正好是 stars（不取最好成绩，方便反复测试） */
export function setLevelStars(progress, keys, stars) {
  const units = { ...progress.units };
  keys.forEach((key) => { units[key] = { stars, done: true }; });
  return { ...progress, units };
}

// ---------- 错题本：答错的题记下来，按间隔复习（Leitner 盒子：1、3、7、14 天后再出；答对升一盒，答错回第一盒） ----------
const REVIEW_KEY = 'jc-learn-review';
export const REVIEW_INTERVALS = [1, 3, 7, 14];
export const REVIEW_LIMIT = 300;
/** 本地日期（不是 UTC：凌晨复习时"明天"要按自己所在时区算） */
const localDay = (date) => { const d = new Date(date); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const addDays = (date, days) => { const d = new Date(date); d.setDate(d.getDate() + days); return localDay(d); };

/** 一道题的指纹：题型、题干、选项和答案相同就算同一道（生成题每次内容不同，各算各的） */
export function cardId(card) {
  const core = JSON.stringify([card.type, card.prompt, card.options, card.answer, card.bank, card.pairs]);
  let h = 5381;
  for (let i = 0; i < core.length; i += 1) h = ((h * 33) ^ core.charCodeAt(i)) >>> 0;
  return `c${h.toString(16)}`;
}
export function loadReview(storage = globalThis.localStorage) {
  try { const list = JSON.parse(storage.getItem(REVIEW_KEY)); return Array.isArray(list) ? list : []; } catch (_) { return []; }
}
export function saveReview(list, storage = globalThis.localStorage) {
  try { storage.setItem(REVIEW_KEY, JSON.stringify(list)); } catch (_) { /* 无痕模式等 */ }
}
/** 答错一道（第一次作答时）：新题放进第一盒、明天到期；已有的题退回第一盒 */
export function recordMistake(list, card, levelKeyValue, now = new Date()) {
  if (!card || card.type === 'guide') return list;
  const id = card.reviewId || cardId(card);
  const due = addDays(now, REVIEW_INTERVALS[0]);
  const existing = list.find((item) => item.id === id);
  if (existing) return list.map((item) => (item.id === id ? { ...item, box: 1, due, wrong: item.wrong + 1 } : item));
  const { reviewId, ...plain } = card;
  const next = [...list, { id, card: plain, levelKey: levelKeyValue, box: 1, due, wrong: 1, added: localDay(now) }];
  return next.length > REVIEW_LIMIT ? next.slice(next.length - REVIEW_LIMIT) : next;
}
/** 复习时作答：答对升一盒（第四盒再答对就移出错题本），答错回第一盒 */
export function recordReviewAnswer(list, id, correct, now = new Date()) {
  return list.flatMap((item) => {
    if (item.id !== id) return [item];
    if (!correct) return [{ ...item, box: 1, due: addDays(now, REVIEW_INTERVALS[0]), wrong: item.wrong + 1 }];
    const box = item.box + 1;
    if (box > REVIEW_INTERVALS.length) return [];
    return [{ ...item, box, due: addDays(now, REVIEW_INTERVALS[box - 1]) }];
  });
}
export const dueReview = (list, now = new Date()) => list.filter((item) => item.due <= localDay(now));

// ---------- 导出 / 导入学习进度（换设备或清缓存时用） ----------
export const PROGRESS_KEYS = ['jc-learn-progress', 'jc-learn-review', 'jc-learn-resume', 'jc-learn-sfx'];
export function exportProgress(storage = globalThis.localStorage, now = new Date()) {
  const data = {};
  PROGRESS_KEYS.forEach((key) => { try { const raw = storage.getItem(key); if (raw !== null) data[key] = raw; } catch (_) { /* ignore */ } });
  return { app: 'jc-theory-quest', version: 1, exported: now.toISOString(), data };
}
/** 导入：只接受本工具导出的文件，只写入认识的键；成功返回 true */
export function importProgress(json, storage = globalThis.localStorage) {
  let parsed = json;
  try { if (typeof json === 'string') parsed = JSON.parse(json); } catch (_) { return false; }
  if (!parsed || parsed.app !== 'jc-theory-quest' || typeof parsed.data !== 'object') return false;
  const progress = parsed.data['jc-learn-progress'];
  try { if (progress && typeof JSON.parse(progress).units !== 'object') return false; } catch (_) { return false; }
  PROGRESS_KEYS.forEach((key) => {
    try { if (typeof parsed.data[key] === 'string') storage.setItem(key, parsed.data[key]); else storage.removeItem(key); } catch (_) { /* ignore */ }
  });
  return true;
}

// ---------- 支线大关卡：挂在某个主关旁边，主关的全部内容（主关、进阶 1–4、综合测验）都通关后才开放；不影响主线 ----------
export const unitFullyDone = (progress, unitId) => unitLevelKeys(unitId).every((key) => isDone(progress, key));
export function isSideLevelUnlocked(side, slot, progress) {
  if (progress.unlockAll) return true;
  if (isDone(progress, levelKey(side.id, slot))) return true;
  const ready = (side.prerequisites || []).every((key) => isDone(progress, key));
  if (slot === 0) return ready && unitFullyDone(progress, side.parent);
  return ready && isDone(progress, levelKey(side.id, slot - 1)) && levelPrerequisites(side, slot).every((key) => isDone(progress, key));
}

// Side-B（翻面课程）的规则：解锁、分段与检查点、各种节点的判分（含打拍）、整关分（挑战 + 实操）、补弱挑战、换题重试、
// 突破时刻、技能统计与 mastery，以及关卡设计的自检（validateLevel）。纯函数，可在 Node 里测试；设计见 SIDE_B_DESIGN.md。
//
// 原则：音乐优先于分数，发现优先于背诵，成就感优先于惩罚感。任何增加难度的设计，都要同时增加反馈、理解感或成就感——
// 所以 60% 是"掌握门槛"而不是"惩罚门槛"：没过时讲解、实验、实操的进度全部保留，只补弱项（补弱挑战），不用整关重来。
import { gradeCard, isDone } from './learn_engine.js?v=20261010-boss1';
import { SKILLS } from './sideb_errors.js?v=20261004-z9';
import { GENERATORS } from './learn_generators.js?v=20261010-talk1';

/** 一关的五段：发现 → 解释 → 实验 → 挑战 → 实操（只有关键技能关才有实操） */
export const SECTION_ORDER = ['discover', 'explain', 'experiment', 'challenge', 'lab'];
/** 不判分的节点：讲解、示范、发现（先听 / 看 / 操作，答了也只给反馈）、实验（自由改变量，看结果） */
export const TEACHING_TYPES = ['page', 'demo', 'guide', 'discover', 'experiment'];
/** 整关的及格线：总分 ≥ 60% 才算 Clear */
export const PASS_LINE = 0.6;
/** 必做实操的门槛：普通关 50%、章节测试 60%、B-EX 70%（避免"选择题全对、实操 0 分也刚好及格"） */
export const LAB_LINES = { level: 0.5, chapter: 0.6, ex: 0.7 };
/**
 * 实操的三种模式：
 *   level   普通关：评分 + 诊断 + 修改——可以反复"检查一下"，每条扣分都写明位置和改法，提交取最好的一次
 *   chapter 章节测试：最多检查 3 次，只写明哪里扣分，不给改法
 *   ex      B-EX：评分 + 少提示 + 独立完成——没有"检查一下"，只能提交一次；提交后才看到完整的评分单
 */
export const LAB_MODES = {
  level: { checks: Infinity, advice: true, where: true, submissions: Infinity },
  chapter: { checks: 3, advice: false, where: true, submissions: Infinity },
  ex: { checks: 0, advice: false, where: false, submissions: 1 },
};

/**
 * Side-B 什么时候出现：A 面第一章的章节测试通过（入门的基础都具备，也见过了第一位 Boss）。
 * 之后 B 面不是"全部打开"，而是 A 面学到哪里、B 面就开放到哪里（见 bLevelMissing）。
 * 旧存档：EX 结业挑战已经通关的，照旧算已开放（A 面全部内容都已通关，B 面的前提自然全部满足）。
 */
export const SIDEB_OPEN_KEY = 'chapter@basics';
export const sidebUnlocked = (progress) => Boolean(progress.unlockAll) || isDone(progress, SIDEB_OPEN_KEY) || isDone(progress, 'final-ex');
/** 进度键：普通关 / 考试 b:<id>；扩展关的 id 是 <关卡>x（如 B1-1x），存在 bx:<关卡> */
/** 评级（Side-B 不用星级）：A+ ≥ 95%、A ≥ 85%、B ≥ 75%、C ≥ 60%（过关线）、D ≥ 50%、E < 50%；没通过（例如实操没到门槛）最多 D */
export const GRADES = [['A+', 0.95], ['A', 0.85], ['B', 0.75], ['C', 0.6], ['D', 0.5], ['E', 0]];
export function gradeOf(score, passed = true) {
  const g = GRADES.find(([, line]) => (score ?? 0) >= line - 1e-9)[0];
  return passed || ['D', 'E'].includes(g) ? g : 'D';
}
export const bKey = (id) => (/^B\d+-\d+x$/.test(id) ? `bx:${id.slice(0, -1)}` : `b:${id}`);

// ---------------- 知识前提：B 面关卡按玩家在 A 面已经学过的内容开放 ----------------
/**
 * 一个 B 面关卡在 A 面的知识前提：level.a 里列出的主关；列的是支线时，用支线所挂的主关
 * （支线是选修，不拿它挡 B 面；B 面关卡本身会把支线的内容讲到）。综合关（a 为空）没有 A 面前提。
 */
export function aPrereqs(level, units = [], sides = []) {
  const mains = new Set(units.map((u) => u.id));
  const out = [];
  (level?.a || []).forEach((id) => {
    if (mains.has(id)) out.push(id);
    else { const parent = sides.find((side) => side.id === id)?.parent; if (mains.has(parent)) out.push(parent); }
  });
  return [...new Set(out)];
}
/** 扩展关重讲的是 A 面的进阶关：要求这些主关的进阶 1–4 和综合测验都已通关 */
export const aAdvancedKeys = (ids) => ids.flatMap((id) => [1, 2, 3, 4, 5].map((slot) => `${id}:${slot}`));
/**
 * 一个 B 面普通关还差什么才开放（两项都空 = 开放）：
 *   a    —— 还没通关的 A 面主关（知识前提）；
 *   prev —— 同一章里上一关还没 Clear（章内保留原来的教学递进；不同的章可以并行）。
 * 已经 Clear 的关、调试模式（unlockAll）永远开放。chapterList：这一章能玩的关卡（地图顺序）。
 */
export function bLevelMissing(level, chapterList, progress, { units = [], sides = [] } = {}) {
  if (progress.unlockAll || isDone(progress, bKey(level.id))) return { a: [], prev: null };
  const a = aPrereqs(level, units, sides).filter((id) => !isDone(progress, id));
  const i = chapterList.findIndex((x) => x.id === level.id);
  const prev = i > 0 && !isDone(progress, bKey(chapterList[i - 1].id)) ? chapterList[i - 1].id : null;
  return { a, prev };
}
export const bLevelOpen = (level, chapterList, progress, ctx) => {
  if (!sidebUnlocked(progress)) return false;
  const { a, prev } = bLevelMissing(level, chapterList, progress, ctx);
  return !a.length && !prev;
};
/**
 * 扩展关还差什么：base —— 所属普通关还没 Clear；a —— 对应 A 面主关里还没通关的进阶关 / 综合测验（关卡键 'unit:slot'）。
 * 已经 Clear 的扩展关、调试模式永远开放。
 */
export function extMissing(base, progress, { units = [], sides = [] } = {}) {
  if (progress.unlockAll || isDone(progress, extKey(base.id))) return { base: false, a: [] };
  return { base: !isDone(progress, bKey(base.id)), a: aAdvancedKeys(aPrereqs(base, units, sides)).filter((key) => !isDone(progress, key)) };
}
export const extOpen = (base, progress, ctx) => {
  if (!sidebUnlocked(progress)) return false;
  const m = extMissing(base, progress, ctx);
  return !m.base && !m.a.length;
};

// ---------------- 判分 ----------------
const NOTE_ALIASES = [[/♯/g, '#'], [/♭/g, 'b'], [/𝄪/g, '##'], [/𝄫/g, 'bb'], [/x/g, '##']];
/** 'F♯4' 'f#' 'Bb3' → 规范写法 'F#4' 'F#' 'Bb3' */
export function normalizeNote(text) {
  let s = String(text ?? '').trim();
  NOTE_ALIASES.forEach(([re, to]) => { s = s.replace(re, to); });
  const m = /^([A-Ga-g])([#b]*)(-?\d+)?$/.exec(s);
  return m ? `${m[1].toUpperCase()}${m[2]}${m[3] ?? ''}` : s;
}
const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const notePitch = (note) => {
  const m = /^([A-G])([#b]*)(-?\d+)?$/.exec(note);
  if (!m) return null;
  const alter = [...m[2]].reduce((sum, c) => sum + (c === '#' ? 1 : -1), 0);
  const pc = ((LETTER_PC[m[1]] + alter) % 12 + 12) % 12;
  return { pc, midi: m[3] === undefined ? null : (Number(m[3]) + 1) * 12 + LETTER_PC[m[1]] + alter };
};
/** 拼写一个音：严格比较字母与升降；音高对但拼法不对记"同音异名"，音名对但八度不对记"八度" */
export function gradeSpelling(expected, given, {acceptEnharmonic=false}={}) {
  const want = normalizeNote(expected); const got = normalizeNote(given);
  if (want === got) return { ok: true, error: null };
  const a = notePitch(want); const b = notePitch(got);
  if (!a || !b) return { ok: false, error: 'wrong-note' };
  const sameLetters = want.replace(/-?\d+$/, '') === got.replace(/-?\d+$/, '');
  if (sameLetters) return { ok: false, error: 'octave' };
  const samePitch = a.midi !== null && b.midi !== null ? a.midi === b.midi : a.pc === b.pc;
  return samePitch && acceptEnharmonic && (a.midi === null || b.midi !== null) ? {ok:true,error:null} : { ok: false, error: samePitch ? 'enharmonic' : 'wrong-note' };
}

/** 罗马数字比较：大小写有意义（ii ≠ II）；°/o、ø/Ø 视为同一个；空格忽略 */
export const normalizeRoman = (text) => String(text ?? '').replace(/\s+/g, '').replace(/o(?=\d|$)/g, '°').replace(/Ø/g, 'ø').replace(/♭/g, 'b').replace(/♯/g, '#');
const acceptedList = (answer) => (Array.isArray(answer) ? answer : [answer]);

/**
 * 打拍判定。expected：起音位置（拍）；taps：相对开始时刻的毫秒数（已扣掉预备拍）。
 * 计分只看"打没打对起音"：每个期望起音配最近的、没用过的一次敲击，误差 ≤ 120 ms 算命中；正确 +1、漏掉不得分、多打 −1，换算成百分比。
 * 时间精度另外报告（±40 ms 100%、±80 ms 80%、±120 ms 60%），只用来给反馈和突破时刻，不用来判及格——
 * 设备有延迟，理论课不拿毫秒级判定卡人。整体一致的提前 / 落后（150 ms 以内）当作设备延迟扣掉。
 */
export const TAP_TIERS = [[40, 1], [80, 0.8], [120, 0.6]];
export function gradeTaps(expected, taps, { bpm = 80, latencyMs } = {}) {
  const beatMs = 60000 / bpm;
  const targets = expected.map((beat) => beat * beatMs);
  const nearest = targets.map((target) => taps.reduce((best, tap) => (Math.abs(tap - target) < Math.abs(best - target) ? tap : best), Infinity) - target).filter(Number.isFinite);
  const sorted = [...nearest].filter((d) => Math.abs(d) <= 250).sort((a, b) => a - b);
  const median = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
  const shift = latencyMs ?? (Math.abs(median) <= 150 ? median : 0);
  const adjusted = taps.map((tap) => tap - shift);
  const used = new Set();
  const offsets = [];
  targets.forEach((target) => {
    let best = -1; let bestDiff = Infinity;
    adjusted.forEach((tap, i) => { const diff = Math.abs(tap - target); if (!used.has(i) && diff < bestDiff) { best = i; bestDiff = diff; } });
    if (best >= 0 && bestDiff <= TAP_TIERS[TAP_TIERS.length - 1][0]) { used.add(best); offsets.push(adjusted[best] - target); }
  });
  const hits = offsets.length;
  const missed = targets.length - hits;
  const extra = adjusted.length - used.size;
  const precision = hits ? offsets.reduce((sum, d) => sum + (TAP_TIERS.find(([ms]) => Math.abs(d) <= ms)?.[1] ?? 0), 0) / hits : 0;
  const errors = [...(missed ? ['tap-missed'] : []), ...(extra ? ['tap-extra'] : [])];
  return {
    ok: !missed && !extra, score: targets.length ? Math.max(0, hits - extra) / targets.length : 1, errors, hits, missed, extra, precision, latency: shift,
    meanOffset: offsets.length ? offsets.reduce((a, b) => a + b, 0) / offsets.length : 0,
  };
}

/**
 * 判一个节点：返回 { ok, score（0–1）, errors: [错误类型] }
 * response 的格式随节点类型：choice/listen → 选项序号；spell → 音名数组；derive / analyze → 每一步 / 每个位置的答案数组；
 * tap → 毫秒数组（或两手 { left, right }）；lab → evaluateLab 的结果
 */
export function gradeNode(node, response) {
  switch (node.type) {
    case 'page': case 'demo': case 'guide': case 'experiment':
      return { ok: true, score: 1, errors: [] };
    case 'discover':
      // 发现：先让耳朵 / 眼睛找答案；答了只给反馈（揭晓发现），不计分
      return { ok: node.answer === undefined || response === node.answer, score: 1, errors: [], ungraded: true };
    case 'choice': case 'listen': {
      const ok = response === node.answer;
      return { ok, score: ok ? 1 : 0, errors: ok ? [] : [node.error || 'concept'] };
    }
    case 'fill': case 'match': {
      const ok = gradeCard(node, response);
      return { ok, score: ok ? 1 : 0, errors: ok ? [] : [node.error || 'concept'] };
    }
    case 'spell': {
      const answers = node.answer;
      const results = answers.map((want, i) => gradeSpelling(want, response?.[i],node));
      const right = results.filter((r) => r.ok).length;
      return { ok: right === answers.length && (response?.length ?? 0) === answers.length, score: right / answers.length, errors: [...new Set(results.filter((r) => !r.ok).map((r) => r.error))] };
    }
    case 'derive': {
      const results = node.steps.map((step, i) => {
        const given = response?.[i];
        const ok = acceptedList(step.answer).some((want) => {
          if (step.kind === 'number') return given !== null && given !== undefined && String(given).trim() !== '' && Number.isFinite(Number(given)) && Math.abs(Number(given) - Number(want)) <= (step.tol ?? 1e-9);
          if (step.kind === 'note') return gradeSpelling(want, given).ok;
          if (step.kind === 'roman') return normalizeRoman(given) === normalizeRoman(want);
          return String(given ?? '').trim().toLowerCase() === String(want).trim().toLowerCase();
        });
        const error = ok ? null : step.kind === 'note' && acceptedList(step.answer).every((want) => gradeSpelling(want, given).error === 'enharmonic') ? 'enharmonic' : step.error || node.error || 'calc';
        return { ok, error };
      });
      const right = results.filter((r) => r.ok).length;
      return { ok: right === results.length, score: right / results.length, errors: [...new Set(results.filter((r) => !r.ok).map((r) => r.error))] };
    }
    case 'analyze': {
      const results = node.slots.map((slot, i) => acceptedList(slot.answer).some((want) => normalizeRoman(want) === normalizeRoman(response?.[i])));
      const right = results.filter(Boolean).length;
      return { ok: right === results.length, score: right / results.length, errors: right === results.length ? [] : [node.error || 'wrong-function'] };
    }
    case 'tap': {
      if (node.hands) {
        const l = gradeTaps(node.hands.left, response?.left || [], node);
        const r = gradeTaps(node.hands.right, response?.right || [], node);
        return { ok: l.ok && r.ok, score: (l.score + r.score) / 2, errors: [...new Set([...l.errors, ...r.errors])], detail: { left: l, right: r } };
      }
      const g = gradeTaps(node.pattern, response || [], node);
      return { ok: g.ok, score: g.score, errors: g.errors, detail: g };
    }
    case 'lab': {
      // 实操：评分单（lab_checks.js）的 0–100 分直接折算；没有硬性失败且达到门槛才算这个实操过关
      const score = Math.max(0, Math.min(1, (response?.score ?? 0) / 100));
      const line = node.line ?? LAB_LINES.level;
      const errors = [...new Set([...(response?.hardFail || []).map((h) => h.error), ...(response?.items || []).flatMap((i) => i.deductions.map((d) => d.error))].filter(Boolean))];
      return { ok: !(response?.hardFail || []).length && score >= line, score, errors, hardFail: (response?.hardFail || []).length > 0 };
    }
    default:
      return { ok: false, score: 0, errors: ['concept'] };
  }
}

// ---------------- 关卡结构与设计自检 ----------------
/** 关卡里按顺序排好的段（跳过空段） */
export const levelSections = (level) => SECTION_ORDER.filter((s) => (level.sections?.[s] || []).length);
export const isAssessed = (node) => !TEACHING_TYPES.includes(node.type);
const LAB_TYPES = ['lab'];
/** 估计用时（分钟）：读一页 0.6、示范 / 发现 / 听 0.75、实验 1.5、一道题 1、实操按任务说明（默认 5） */
const MINUTES = { page: 0.6, guide: 0.6, demo: 0.75, discover: 0.75, listen: 0.75, experiment: 1.5 };
export function estimateMinutes(level) {
  return levelSections(level).reduce((sum, s) => sum + level.sections[s].reduce((m, node) => m + (node.type === 'lab' ? (node.minutes ?? 5) : node.type === 'gen' ? (node.count ?? 1) : MINUTES[node.type] ?? 1), 0), 0);
}
const challengeCount = (level) => (level.sections?.challenge || []).reduce((n, node) => n + (node.type === 'gen' ? (node.count ?? 1) : isAssessed(node) ? 1 : 0), 0);
/**
 * 关卡设计自检：把"B 面更深但不更闷"的原则写成可以测试的规则。返回问题列表（空 = 合格）
 *   - 至少一个"发现"节点，并写明这一关的发现（insight）——先听 / 看 / 操作，再解释
 *   - 讲解不能连续超过 2 页：讲 2～3 个点就要有互动、试听或操作
 *   - 挑战 6～8 题；每题标技能；至少一半的题会换题（生成器或多个变体），重试测的是掌握不是记答案
 *   - 有实操就必须先有实验（先玩再考）
 *   - 普通关约 10～15 分钟，核心关（core）最多 20 分钟
 *   - 至少一个"胜利瞬间"（breakthrough）：玩家第一次真的做到某件事时立刻给视觉和声音反馈
 */
export function validateLevel(level) {
  const problems = [];
  const all = levelSections(level).flatMap((s) => level.sections[s]);
  if (!(level.sections?.discover || []).some((n) => n.type === 'discover' && n.insight)) problems.push('no-insight');
  let run = 0;
  ['discover', 'explain', 'experiment'].forEach((s) => (level.sections?.[s] || []).forEach((n) => { run = n.type === 'page' ? run + 1 : 0; if (run > 2) problems.push('reading-run'); }));
  const count = challengeCount(level);
  // 扩展关（把 A 面 4 个进阶关 + 综合测验重新讲一遍）讲解更长：挑战 6–10 题、最多约 25 分钟
  if (count < 6 || count > (level.ext ? 10 : 8)) problems.push('challenge-size');
  const challenge = level.sections?.challenge || [];
  if (challenge.some((n) => isAssessed(n) && !(n.skills || []).length)) problems.push('missing-skills');
  const varied = challenge.reduce((n, node) => n + (node.type === 'gen' ? (node.count ?? 1) : node.variants?.length > 1 ? 1 : 0), 0);
  if (varied * 2 < count) problems.push('retry-memorizable');
  if ((level.sections?.lab || []).length && !(level.sections?.experiment || []).some((n) => n.type === 'experiment')) problems.push('lab-without-experiment');
  if (estimateMinutes(level) > (level.ext ? 25 : level.core ? 20 : 15)) problems.push('too-long');
  if (!all.some((n) => n.breakthrough) && !(level.sections?.lab || []).some((n) => n.breakthrough)) problems.push('no-breakthrough');
  return [...new Set(problems)];
}

// ---------------- 换题：每次挑战（attempt）用不同的种子 ----------------
/** 由字符串得到 32 位种子（djb2） */
export function seedOf(text) {
  let h = 5381;
  for (let i = 0; i < text.length; i += 1) h = ((h * 33) ^ text.charCodeAt(i)) >>> 0;
  return h;
}
/** 可复现的随机数（mulberry32） */
export function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let x = a;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
/**
 * 把一组节点变成这一次要做的具体题：生成器节点（type 'gen'）按种子出新题（换调、换音、换进行），
 * 有 variants 的节点按第几次挑战轮换变体；其余照原样。生成的题继承 skills / section / id 前缀
 */
export function materialize(nodes, { seed = 1, attempt = 0 } = {}) {
  const rng = seeded(seed + attempt * 7919);
  return nodes.flatMap((node) => {
    if (node.type === 'gen') {
      const gen = GENERATORS[node.gen];
      if (!gen) throw new Error(`unknown generator ${node.gen}`);
      return Array.from({ length: node.count ?? 1 }, (_, k) => ({ ...gen.make(rng, node.params || {}), id: `${node.id}#${attempt}.${k}`, skills: node.skills || [], section: node.section, breakthrough: node.breakthrough, ratingOnly: Boolean(node.ratingOnly) }));
    }
    if (node.variants?.length) return [{ ...node, ...node.variants[attempt % node.variants.length], id: `${node.id}~${attempt % node.variants.length}`, variants: undefined }];
    return [node];
  });
}
/** 这一关这一次的具体内容（讲解不变，挑战换题） */
export function levelForAttempt(level, attempt = 0) {
  const seed = seedOf(level.id);
  // 考试（level.draw）每次开考重新抽一套题
  const source = typeof level.draw === 'function' ? level.draw(attempt) : level.sections || {};
  const sections = Object.fromEntries(Object.entries(source).map(([s, nodes]) => [s, materialize(nodes.map((n) => ({ ...n, section: s })), { seed, attempt })]));
  return { ...level, sections, attempt };
}

// ---------------- 关卡进度：检查点、作答、结算 ----------------
/**
 * 新的关卡进度。startSection：从第几段开始（检查点续玩；讲解已经看过的直接从挑战开始）
 * seen：已经完成的段（不判分的段完成一次就永远保留）
 */
export function createBSession(level, { startSection = 0, attempt = 0, seen = [] } = {}) {
  return { levelId: level.id, attempt, section: startSection, node: 0, attempts: {}, records: [], checkpoint: startSection, seen: [...seen], recovery: null };
}
/** 完成一段：记检查点（下次从下一段开始），不判分的段记为"已看过" */
export function completeSection(session, level) {
  const sections = levelSections(level);
  const name = sections[session.section];
  const seen = name && !['challenge', 'lab'].includes(name) && !session.seen.includes(name) ? [...session.seen, name] : session.seen;
  return { ...session, section: session.section + 1, node: 0, checkpoint: session.section + 1, seen };
}

/**
 * 记录一次作答。first：这一节点第一次作答（计分与技能统计只看第一次）；
 * 挑战题答错会立刻看到解释，可以再答一次（不改分数）——错了也有收获
 */
export function recordAnswer(session, node, result) {
  const tries = (session.attempts[node.id] || 0) + 1;
  const record = { id: node.id, section: node.section, type: node.type, skills: node.skills || [], ok: result.ok, score: result.score, errors: result.errors || [], first: tries === 1, ungraded: Boolean(result.ungraded), ratingOnly: Boolean(node.ratingOnly) };
  return { ...session, attempts: { ...session.attempts, [node.id]: tries }, records: [...session.records, record] };
}

/** 必做实操：关卡里 mandatory 的实操节点（实操结果以 labId 记在 jc-sideb-labs 里，取最好的一次） */
export const mandatoryLabs = (level) => (level.sections?.lab || []).filter((n) => n.type === 'lab' && n.mandatory !== false);
/** 整关分的权重：有必做实操时挑战 60%、实操 40%（可用 level.weights 改），没有实操时挑战 100% */
export function levelWeights(level) {
  if (!mandatoryLabs(level).length) return { challenge: 1, labs: 0 };
  return { challenge: 0.6, labs: 0.4, ...(level.weights || {}) };
}

/**
 * 结算。context：'level' | 'chapter' | 'ex'（决定实操门槛）
 * labResults：{ [labId]: { score（0–100）, hardFail } }（取最好的一次）
 * 通过 = 总分 ≥ 60% 且每个必做实操 ≥ 门槛、没有硬性失败
 * next：'clear' 通过；'revise-lab' 实操没到门槛（回到工具接着改，之前的内容和评分单都还在）；'recovery' 补弱挑战
 * 星级（通过之后）：≥ 90% 三星，≥ 75% 两星，其余一星
 */
export function summarizeB(session, level, labResults = {}, { context = 'level' } = {}) {
  const graded = session.records.filter((r) => r.first && !r.ungraded && !TEACHING_TYPES.includes(r.type) && r.type !== 'lab');
  const rawChallenge = graded.length ? graded.reduce((sum, r) => sum + r.score, 0) / graded.length : (challengeCount(level) ? 0 : 1);
  // 普通考试的少量扩展题用于冲评级。基础已达标时，扩展答错不会拉低到及格线以下。
  const core = graded.filter((r) => !r.ratingOnly);
  const coreChallenge = core.length ? core.reduce((sum, r) => sum + r.score, 0) / core.length : 0;
  const challenge = graded.some((r) => r.ratingOnly)
    ? Math.max(rawChallenge, Math.min(coreChallenge, level.passLine ?? PASS_LINE)) : rawChallenge;
  const labs = mandatoryLabs(level).map((n) => {
    // 章节测试 / EX 的实操成绩单独存（id@chapter、id@ex），门槛也按节点自己的模式
    const mode = n.mode || 'level';
    const res = labResults[mode !== 'level' ? `${n.lab}@${mode}` : n.lab];
    const line = LAB_LINES[n.mode || context] ?? LAB_LINES.level;
    const score = res ? Math.max(0, Math.min(1, (res.score ?? 0) / 100)) : 0;
    const hard = Boolean(res?.hardFail?.length);
    return { id: n.lab, mode, score, line, ok: Boolean(res) && !hard && score >= line, hardFail: hard, done: Boolean(res) };
  });
  const w = levelWeights(level);
  const labScore = labs.length ? labs.reduce((s, l) => s + l.score, 0) / labs.length : 0;
  const score = w.challenge * challenge + w.labs * labScore;
  const labsOk = labs.every((l) => l.ok);
  // 考试可以有自己的过关线（所有考试都是 60%）
  const passed = score >= (level.passLine ?? PASS_LINE) - 1e-9 && labsOk;
  const grade = gradeOf(score, passed);
  const skills = Object.fromEntries(SKILLS.map((s) => [s, { got: 0, total: 0 }]));
  graded.forEach((r) => r.skills.forEach((s) => { if (skills[s]) { skills[s].got += r.score; skills[s].total += 1; } }));
  const errors = {};
  session.records.forEach((r) => r.errors.forEach((e) => { errors[e] = (errors[e] || 0) + 1; }));
  const weak = weakSkills(skills);
  const next = passed ? 'clear' : !labsOk ? 'revise-lab' : 'recovery';
  return { score, accuracy: score, challenge, rawChallenge, coreChallenge, labs, passed, grade, skills, errors, weak, next };
}
/** 弱项：做过的技能里得分率最低的（低于 60% 的全部列出，最多 2 个；都不低于 60% 时取最低的一个） */
export function weakSkills(skills) {
  // 得分率低的在前；一样低时，做得多的在前（证据更充分）
  const rated = Object.entries(skills).filter(([, v]) => v.total).map(([s, v]) => [s, v.got / v.total, v.total]).sort((a, b) => a[1] - b[1] || b[2] - a[2]);
  const below = rated.filter(([, r]) => r < PASS_LINE).slice(0, 2).map(([s]) => s);
  return below.length ? below : rated.slice(0, 1).map(([s]) => s);
}

// ---------------- 补弱挑战（Recovery Challenge） ----------------
/**
 * 没到 60% 时不用整关重来：讲解、实验、实操的进度都保留，只针对弱项出 3～5 道新题。
 * 题从这一关挑战段和 level.pool 里找带这些技能标签的节点：生成器换种子出新题，有变体的换下一个变体；
 * 都没有时才用没做过的普通题。补弱挑战 ≥ 60% 即 Clear。
 */
export function buildRecovery(level, summary, { attempt = 1 } = {}) {
  const skills = summary.weak?.length ? summary.weak : [];
  const candidates = [...(level.sections?.challenge || []), ...(level.pool || [])].filter((n) => isAssessed(n) || n.type === 'gen');
  const fits = (n) => !skills.length || (n.skills || []).some((s) => skills.includes(s));
  const fresh = candidates.filter((n) => fits(n) && (n.type === 'gen' || n.variants?.length > 1));
  const plain = (level.pool || []).filter((n) => fits(n) && n.type !== 'gen' && !n.variants);
  const others = candidates.filter((n) => !fits(n) && (n.type === 'gen' || n.variants?.length > 1));
  const picked = [];
  const total = () => picked.reduce((sum, n) => sum + (n.type === 'gen' ? n.count ?? 1 : 1), 0);
  for (const list of [fresh, plain, others]) for (const n of list) { if (total() >= 5) break; picked.push(n.type === 'gen' ? { ...n, count: Math.min(n.count ?? 1, 5 - total()) } : n); }
  const seed = seedOf(`${level.id}:recovery`);
  const nodes = materialize(picked.map((n) => ({ ...n, section: 'recovery' })), { seed, attempt: attempt + 100 }).slice(0, 5);
  return nodes.length >= 3 ? { skills, nodes } : null;
}
export function startRecovery(session, recovery) {
  return { ...session, recovery: { ...recovery, records: [], node: 0 } };
}
export function recordRecovery(session, node, result) {
  const r = session.recovery;
  if (r.records.some((x) => x.id === node.id)) return session;
  return { ...session, recovery: { ...r, node: r.node + 1, records: [...r.records, { id: node.id, skills: node.skills || [], score: result.score, ok: result.ok, errors: result.errors || [] }] } };
}
/** 补弱挑战的结果：平均 ≥ 60% → 通过（整关 Clear，一星，记分按 60% 起算） */
export function recoveryResult(session) {
  const recs = session.recovery?.records || [];
  const score = recs.length ? recs.reduce((s, r) => s + r.score, 0) / recs.length : 0;
  return { score, passed: recs.length > 0 && score >= PASS_LINE - 1e-9, done: recs.length >= (session.recovery?.nodes.length ?? Infinity) };
}

/**
 * 想拿更多星时重新挑战：讲解与实验不用再看，从挑战段开始，题目换新（attempt + 1）；之前的实操成绩保留
 */
export function retrySession(level, previous = {}) {
  const sections = levelSections(level);
  const first = sections.indexOf('challenge');
  return createBSession(level, { startSection: Math.max(0, first), attempt: (previous.attempt ?? 0) + 1, seen: previous.seen || sections.filter((s) => !['challenge', 'lab'].includes(s)) });
}

// ---------------- 章节测试 / B-EX：只重做没过的部分 ----------------
/**
 * parts：{ [partId]: 0–1 }，labs：[{ id, score 0–1, hardFail }]
 * 每部分 ≥ 60%、每个实操 ≥ 门槛（章节测试 60%、B-EX 70%）才通过；没过时只重做没过的部分，过了的部分保留
 */
export function summarizeExam(parts, labs = [], { context = 'chapter' } = {}) {
  const line = LAB_LINES[context] ?? LAB_LINES.chapter;
  const failedParts = Object.entries(parts).filter(([, v]) => v < PASS_LINE - 1e-9).map(([k]) => k);
  const failedLabs = labs.filter((l) => l.hardFail || l.score < line - 1e-9).map((l) => l.id);
  const values = [...Object.values(parts), ...labs.map((l) => l.score)];
  const score = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  return { score, passed: !failedParts.length && !failedLabs.length, retry: { parts: failedParts, labs: failedLabs }, labLine: line };
}

// ---------------- 突破时刻 ----------------
/**
 * 每关的"胜利瞬间"：节点或实操写了 breakthrough: { id, text, when? } 时，玩家第一次真的做到就立刻放视觉和声音反馈。
 * 节点：第一次答对（打拍：命中全部起音）；实操：没有硬性失败，且 when 里列的评分项全部满分（例如 motion = 声部进行顺滑）
 * achieved：已经出现过的突破 id（同一个突破只庆祝一次）
 */
export function breakthroughFor(node, result, achieved = []) {
  const b = node.breakthrough;
  if (!b || achieved.includes(b.id)) return null;
  if (node.type === 'lab') {
    if (result?.hardFail?.length) return null;
    const items = result?.items || [];
    const ok = (b.when || []).every((id) => { const i = items.find((x) => x.id === id); return i && i.points >= i.max - 1e-9; });
    return ok && (result?.score ?? 0) >= (b.min ?? 0) ? b : null;
  }
  return result?.ok ? b : null;
}

// ---------------- 技能 mastery ----------------
/**
 * 技能 mastery：每关每个技能取最好的一次（0–1），整体 = 各关的平均
 * store：{ [levelId]: { [skill]: 0–1 } }
 */
export function mergeMastery(store, levelId, skills) {
  const prev = store[levelId] || {};
  const next = { ...prev };
  Object.entries(skills).forEach(([s, { got, total }]) => { if (total) next[s] = Math.max(prev[s] ?? 0, got / total); });
  return { ...store, [levelId]: next };
}
export function overallMastery(store) {
  const sums = Object.fromEntries(SKILLS.map((s) => [s, { sum: 0, n: 0 }]));
  Object.values(store).forEach((level) => Object.entries(level).forEach(([s, v]) => { if (sums[s]) { sums[s].sum += v; sums[s].n += 1; } }));
  return Object.fromEntries(SKILLS.map((s) => [s, sums[s].n ? sums[s].sum / sums[s].n : null]));
}

// ---------------- 通关记录、章节平均与 EX 解锁 ----------------
/**
 * Side-B 的考试（都是可选的，不挡下一章）：
 *   章节测试：本章普通关全部 Clear 后开放；少量扩展题用于冲评级，基础达标时保留及格分；过关线 60%，实操 ≥ 60%
 *   EX 章节测试：本章普通关和扩展关全部 Clear 且平均 ≥ 60% 开放，不看章节测试过没过；过关线 60%，实操 ≥ 70%
 *   Final：所有章节测试都通过（≥ 60%）才开放；EX Final：所有章节测试和 EX 章节测试都通过才开放
 */
export const CHAPTER_EX_OPEN = 0.6;
export const CHAPTER_EX_LINE = 0.6;
export const FINAL_EX_LINE = 0.6;

/**
 * 记一次结算：best 取最好的一次总分；通过才算 Clear（done），评级取通过的那几次里最好的；seen 记下已经看过的段（失败后不用重看）
 * 补弱挑战通过（recovered）：Clear、评级 C，best 至少记 60%
 */
export function completeBLevel(progress, levelId, summary, { recovered = false, seen } = {}) {
  const key = bKey(levelId);
  const prev = progress.units[key] || {};
  const best = Math.max(prev.best ?? 0, summary.score ?? summary.accuracy ?? 0, recovered ? PASS_LINE : 0);
  const done = Boolean(prev.done) || summary.passed || recovered;
  const rank = (g) => (g ? GRADES.length - GRADES.findIndex(([x]) => x === g) : 0);
  const now = summary.passed ? summary.grade || gradeOf(summary.score ?? summary.accuracy ?? 0) : recovered ? 'C' : null;
  const grade = rank(now) > rank(prev.grade) ? now : prev.grade;
  const { stars: _old, ...rest } = prev;
  const entry = { ...rest, best, done, ...(grade ? { grade } : {}), ...(seen ? { seen: [...new Set([...(prev.seen || []), ...seen])] } : {}) };
  return { ...progress, units: { ...progress.units, [key]: entry } };
}
/** 一章的平均分：每关取最好的一次，没玩过的算 0 */
export function chapterAverage(levels, progress) {
  if (!levels.length) return 0;
  return levels.reduce((sum, level) => sum + (progress.units[bKey(level.id)]?.best ?? 0), 0) / levels.length;
}
/** 扩展关的进度键（A 面播放器里玩，结果存在同一份 progress 里） */
export const extKey = (id) => bKey(`${id}x`);
/** 本章平均（含扩展关）：每个普通关算一项，有扩展关的关卡再多一项扩展关的最好成绩 */
export function chapterAverageWithExt(levels, progress, hasExt = () => false) {
  const items = levels.flatMap((level) => [progress.units[bKey(level.id)]?.best ?? 0, ...(hasExt(level) ? [progress.units[extKey(level.id)]?.best ?? 0] : [])]);
  return items.length ? items.reduce((a, b) => a + b, 0) / items.length : 0;
}
const examDone = (progress, id) => Boolean(progress.units[bKey(id)]?.done);
export const chapterTestOpen = (levels, progress) => Boolean(progress.unlockAll) || (sidebUnlocked(progress) && levels.length > 0 && levels.every((l) => isDone(progress, bKey(l.id))));
export const chapterExOpen = (levels, progress, hasExt = () => false) => Boolean(progress.unlockAll) || (chapterTestOpen(levels, progress)
  && levels.filter(hasExt).every((l) => isDone(progress, extKey(l.id)))
  && chapterAverageWithExt(levels, progress, hasExt) >= CHAPTER_EX_OPEN - 1e-9);
/** 双轨的汇合点：Side-B Final 还要 A 面的结业挑战，Side-B EX Final 还要 A 面的 EX 结业挑战 */
export const A_FINAL_KEY = 'final';
export const A_FINAL_EX_KEY = 'final-ex';
export const finalOpen = (chapterIds, progress) => Boolean(progress.unlockAll) || (sidebUnlocked(progress) && isDone(progress, A_FINAL_KEY) && chapterIds.every((c) => examDone(progress, `T-${c}`)));
export const finalExOpen = (chapterIds, progress) => Boolean(progress.unlockAll) || (sidebUnlocked(progress) && isDone(progress, A_FINAL_EX_KEY) && chapterIds.every((c) => examDone(progress, `T-${c}`) && examDone(progress, `TX-${c}`)));
/** 所有章节的平均：各章平均分再取平均 */
export function overallAverage(chapters, progress) {
  const list = chapters.filter((levels) => levels.length);
  return list.length ? list.reduce((sum, levels) => sum + chapterAverage(levels, progress), 0) / list.length : 0;
}

// ---------------- 存储 ----------------
const KEYS = { resume: 'jc-sideb-resume', labs: 'jc-sideb-labs', mastery: 'jc-sideb-skills', side: 'jc-learn-side', breakthroughs: 'jc-sideb-breakthroughs' };
const read = (key, fallback, storage = globalThis.localStorage) => { try { return JSON.parse(storage.getItem(key)) ?? fallback; } catch (_) { return fallback; } };
const write = (key, value, storage = globalThis.localStorage) => { try { storage.setItem(key, JSON.stringify(value)); } catch (_) { /* 无痕模式等 */ } };
export const loadBResume = (storage) => read(KEYS.resume, null, storage);
export const saveBResume = (record, storage) => write(KEYS.resume, record, storage);
export const clearBResume = (storage = globalThis.localStorage) => { try { storage.removeItem(KEYS.resume); } catch (_) { /* ignore */ } };
export const loadLabResults = (storage) => read(KEYS.labs, {}, storage);
/**
 * 记一次实操提交：best 保留最好的一次（普通关可以反复修改，越改越好），last 是最近一次（回到工具时接着改），attempt 次数
 * 评分单整份存下（结果页要列出每条扣分和做到的地方）
 */
export function saveLabResult(labId, result, storage) {
  const all = loadLabResults(storage);
  const prev = all[labId] || {};
  const slim = {
    score: result.score ?? 0, hardFail: (result.hardFail || []).map((h) => ({ error: h.error, text: h.text })),
    items: (result.items || []).map((i) => ({ id: i.id, layer: i.layer, label: i.label, points: i.points, max: i.max, deductions: i.deductions.map((d) => ({ points: d.points, text: d.text, error: d.error })), info: i.info || [] })),
    at: Date.now(),
  };
  // 先比有没有硬性失败，再比分数
  const rank = (r) => (r.hardFail?.length ? 0 : 1000) + (r.score ?? 0);
  const better = !prev.best || rank(slim) > rank(prev.best);
  const entry = { best: better ? slim : prev.best, last: slim, attempt: (prev.attempt || 0) + 1 };
  write(KEYS.labs, { ...all, [labId]: entry }, storage);
  return entry;
}
/** 结算用：{ [labId]: 最好的一次 } */
export const bestLabResults = (storage) => Object.fromEntries(Object.entries(loadLabResults(storage)).map(([id, v]) => [id, v.best || v]));
export const loadBreakthroughs = (storage) => read(KEYS.breakthroughs, [], storage);
export function saveBreakthrough(id, storage) {
  const list = loadBreakthroughs(storage);
  if (!list.includes(id)) write(KEYS.breakthroughs, [...list, id], storage);
}
export const loadMastery = (storage) => read(KEYS.mastery, {}, storage);
export const saveMastery = (store, storage) => write(KEYS.mastery, store, storage);
export const loadSide = (storage) => (read(KEYS.side, 'a', storage) === 'b' ? 'b' : 'a');
export const saveSide = (side, storage) => write(KEYS.side, side === 'b' ? 'b' : 'a', storage);
export const SIDEB_STORAGE_KEYS = Object.values(KEYS);

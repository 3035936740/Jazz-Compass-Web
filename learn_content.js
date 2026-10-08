// 乐理闯关的关卡内容：从简到难，每个工具面板里的概念都有对应的关卡
// 主关题卡按分区写在 learn_units_<分区>.js，进阶关写在 learn_branches_<分区>.js；每个文件顶部列出它引用的全部资料（ref:<id>，见 references.js）
// 修改题卡后运行 node scripts/annotate-learn.mjs 更新引用汇总与 references.js 的 usedIn
import { UNITS as BASICS } from './learn_units_basics.js?v=20261006-clarity1';
import { UNITS as HARMONY } from './learn_units_harmony.js?v=20261006-clarity1';
import { UNITS as MELODY } from './learn_units_melody.js?v=20261002-r20';
import { UNITS as JAZZ } from './learn_units_jazz.js?v=20261002-r20';
import { UNITS as WORLD } from './learn_units_world.js?v=20261006-clarity1';
import { UNITS as MODERN } from './learn_units_modern.js?v=20261008-spectrum-side1';
import { UNITS as SIDE_HARMONY_A } from './learn_units_side.js?v=20261004-w6';
import { UNITS as SIDE_BASICS } from './learn_units_sidebasics.js?v=20261007-listen-icon4';
import { UNITS as SIDE_HARMONY } from './learn_units_sideharmony.js?v=20261004-w6';
import { UNITS as SIDE_MELODY } from './learn_units_sidemelody.js?v=20261003-s4';
import { UNITS as SIDE_JAZZ } from './learn_units_sidejazz.js?v=20261003-s3';
// 每个支线记下它来自哪个文件（内容测试按文件核对引用汇总）
import { MODERN_SIDES } from './modern_harmony_course.js?v=20261008-spectrum-side1';
const SIDE_UNITS = [
  ...MODERN_SIDES.map(u => ({ ...u, sourceFile: 'modern_harmony_course.js' })),
  ...SIDE_BASICS.map((u) => ({ ...u, sourceFile: 'learn_units_sidebasics.js' })),
  ...SIDE_HARMONY_A.map((u) => ({ ...u, sourceFile: 'learn_units_side.js' })),
  ...SIDE_HARMONY.map((u) => ({ ...u, sourceFile: 'learn_units_sideharmony.js' })),
  ...SIDE_MELODY.map((u) => ({ ...u, sourceFile: 'learn_units_sidemelody.js' })),
  ...SIDE_JAZZ.map((u) => ({ ...u, sourceFile: 'learn_units_sidejazz.js' })),
];

const t = (zh, ja, en) => ({ zh, ja, en });

export const SECTIONS = [
  { id: 'basics', color: 'mint', short: t('入门', '入門', 'Basics'), title: t('入门：音、节奏、音阶与调式', '入門：音・リズム・音階・旋法', 'Basics: notes, rhythm, scales & modes') },
  { id: 'harmony', color: 'sky', short: t('和声', '和声', 'Harmony'), title: t('和弦与和声', 'コードと和声', 'Chords & harmony') },
  { id: 'melody', color: 'peach', short: t('旋律与声部', '旋律と声部', 'Melody & voices'), title: t('旋律与声部', '旋律と声部', 'Melody & voices') },
  { id: 'jazz', color: 'lilac', short: t('爵士', 'ジャズ', 'Jazz'), title: t('节奏、布鲁斯与爵士', 'リズム・ブルース・ジャズ', 'Rhythm, blues & jazz') },
  { id: 'world', color: 'sand', short: t('世界', '世界', 'World'), title: t('世界音乐与律学', '世界の音楽と音律', 'World music & tuning') },
  { id: 'modern', color: 'rose', short: t('现代', '現代', 'Modern'), title: t('二十世纪与微分音', '20 世紀と微分音', '20th century & microtones') },
];

import { BRANCHES as B_BASICS } from './learn_branches_basics.js?v=20261002-r20';
import { BRANCHES as B_HARMONY } from './learn_branches_harmony.js?v=20261002-r20';
import { BRANCHES as B_MELODY } from './learn_branches_melody.js?v=20261002-r20';
import { BRANCHES as B_JAZZ } from './learn_branches_jazz.js?v=20261005-j2';
import { BRANCHES as B_WORLD } from './learn_branches_world.js?v=20261006-clarity1';
import { BRANCHES as B_MODERN } from './learn_branches_modern.js?v=20261008-beginner2';
import { TOURS } from './learn_tours.js?v=20261002-r19';
import { MORE_TOURS } from './learn_tours_more.js?v=20261005-j2';
import { withStepDemos } from './learn_guide_demos.js?v=20261007-piano-sync1';
import { withDecoys } from './learn_decoys.js?v=20261006-clarity1';
import { clarifyQuestion } from './learn_question_clarity.js?v=20261006-clarity1';

const BRANCHES = { ...B_BASICS, ...B_HARMONY, ...B_MELODY, ...B_JAZZ, ...B_WORLD, ...B_MODERN };

// 这些进阶关跨入后续主关：保留内容与存档键，学过对应基础后作为回访分支开放。
const ADVANCED_PREREQUISITES = {
  'rhythm:3': ['meter'],
  'intervals:1': ['intervalqual'], 'intervals:2': ['intervalqual'], 'intervals:4': ['intervalqual'],
  'minor:4': ['triads', 'roman'],
  'modes:2': ['sevenths'], 'modes:4': ['sevenths', 'symbols'],
  'pentatonic:3': ['heptatonic'],
  'triads:3': ['roman'], 'triads:4': ['sevenths', 'inversions', 'roman'],
  'sevenths:3': ['roman'],
  'nctmore:3': ['species'],
  'blues:3': ['jazz'],
  'jazz:4': ['chordscale'],
  'guidetone:3': ['jazzvoicing'], 'guidetone:4': ['substitutions', 'chordscale', 'lcc'],
  'circle:4': ['substitutions'],
  'posttonal:2': ['setclass'], 'posttonal:4': ['pitchclass'],
  'collections:4': ['setclass'],
  'micro:2': ['microharmony'],
};

/** 每个主关后面接 4 个进阶关（第 5 个"综合测验"在开局时从主关与进阶关里抽题） */
/** 主关第一张引导卡配上"圈出来讲"的图（learn_tours.js）；dropKeys 表示图已经是键盘，不再另外显示小键盘 */
function withTour(unit) {
  const tour = TOURS[unit.id];
  if (!tour) return unit;
  const index = unit.cards.findIndex((card) => card.type === 'guide');
  const cards = unit.cards.map((card, i) => {
    if (i !== index) return card;
    const demo = card.demo && tour.dropKeys ? (({ keys, ...rest }) => rest)(card.demo) : card.demo;
    return { ...card, visual: tour.visual || card.visual, tour: tour.tour, ...(demo ? { demo } : {}) };
  });
  return { ...unit, cards };
}

/** 其余引导卡（learn_tours_more.js，键为 `关卡键#卡片序号`）也配上图和标注 */
function applyMore(levelKey, cards) {
  return cards.map((card, i) => {
    const extra = MORE_TOURS[`${levelKey}#${i}`];
    // 三个选项的选择题补成四个、不到四对的连线题补成四对（learn_decoys.js）
    if (card.type !== 'guide') return clarifyQuestion(withDecoys(card), levelKey.split(':')[0]);
    if (!extra) return withStepDemos(card, `${levelKey}#${i}`);
    const demo = card.demo && extra.dropKeys ? (({ keys, ...rest }) => rest)(card.demo) : card.demo;
    return withStepDemos({ ...card, visual: extra.visual || card.visual, tour: extra.tour, ...(demo ? { demo } : {}) }, `${levelKey}#${i}`);
  });
}

export const UNITS = [...BASICS, ...HARMONY, ...MELODY, ...JAZZ, ...WORLD, ...MODERN].map((unit) => {
  const toured = withTour(unit);
  return {
    ...toured,
    cards: applyMore(unit.id, toured.cards),
    branch: (BRANCHES[unit.id] || []).map((level, k) => ({ ...level, prerequisites: ADVANCED_PREREQUISITES[`${unit.id}:${k + 1}`] || [], cards: applyMore(`${unit.id}:${k + 1}`, level.cards) })),
  };
});

/** 支线大关卡（额外大分支）：挂在 parent 主关旁边；主关全部通关后开放，不影响主线，EX 结业挑战需要全部通关 */
export const SIDES = SIDE_UNITS.map((side) => ({ ...side, cards: applyMore(side.id, side.cards), branch: side.branch.map((level, k) => ({ ...level, cards: applyMore(`${side.id}:${k + 1}`, level.cards) })) }));

/** 每个工具面板对应的入口关卡（工具顶部的"看不懂？玩教程"按钮） */
export { FEATURE_UNIT } from './learn_feature_unit.js';

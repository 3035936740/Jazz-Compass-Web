import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { UNITS, SECTIONS, FEATURE_UNIT, SIDES } from './learn_content.js';
import { REFERENCES } from './references.js';
import { GENERATORS } from './learn_generators.js';
import { TOURS } from './learn_tours.js';
import { MORE_TOURS } from './learn_tours_more.js';

// 图示部件校验需要一个最小的 DOM（只用到创建元素、设属性、挂子节点）
function fakeElement(tag) {
  return {
    tag, attrs: {}, children: [], style: {}, classList: { add() {}, remove() {}, toggle() {} },
    setAttribute(key, value) { this.attrs[key] = String(value); }, getAttribute(key) { return this.attrs[key] ?? null; },
    appendChild(child) { this.children.push(child); return child; }, append(...list) { this.children.push(...list); },
    addEventListener() {}, replaceChildren() { this.children = []; }, textContent: '',
  };
}
globalThis.document ??= { createElementNS: (_, tag) => fakeElement(tag), createElement: fakeElement };
const { VISUAL_KINDS, visualParts } = await import('./learn_visuals.js');
const zh = (value) => {
  if (Array.isArray(value)) return value.map(zh);
  if (value && typeof value === 'object') return typeof value.zh === 'string' && typeof value.en === 'string' ? value.zh : Object.fromEntries(Object.entries(value).map(([k, v]) => [k, zh(v)]));
  return value;
};

const LANGS = ['zh', 'ja', 'en'];
const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const features = new Set([...html.matchAll(/data-feature="([a-z]+)"/g)].map((m) => m[1]));
const refIds = new Set(REFERENCES.map((r) => r.id));
const isText = (v) => typeof v === 'string' ? v.length > 0 : LANGS.every((l) => typeof v?.[l] === 'string' && v[l].length > 0);
const refsOf = (card) => [].concat(card.ref ?? []);
const sectionText = (section) => readFileSync(new URL(`./learn_units_${section}.js`, import.meta.url), 'utf8');
const branchText = (section) => readFileSync(new URL(`./learn_branches_${section}.js`, import.meta.url), 'utf8');

test('curriculum prerequisites precede dependent main lessons and cluster related subjects', () => {
  const ids = UNITS.map((u) => u.id);
  for (const [before, after] of [['intervals', 'pentatonic'], ['intervalqual', 'pentatonic'], ['modes', 'pentatonic'], ['roman', 'functions'], ['inversions', 'figured'], ['cadences', 'functions']]) {
    assert.ok(ids.indexOf(before) < ids.indexOf(after), `${before} before ${after}`);
  }
  assert.equal(ids.indexOf('intervalqual'), ids.indexOf('intervals') + 1);
  assert.equal(ids.indexOf('meter'), ids.indexOf('rhythm') + 1);
  for (const u of [...UNITS, ...SIDES]) {
    for (const prerequisite of [...(u.prerequisites || []), ...(u.branch || []).flatMap((b) => b.prerequisites || [])]) {
      assert.ok(ids.includes(prerequisite), `${u.id}: valid prerequisite ${prerequisite}`);
      assert.notEqual(prerequisite, u.id, 'no dependency on its own unit');
    }
  }
});

test('units are well formed and ordered by section', () => {
  const ids = new Set();
  const sectionOrder = SECTIONS.map((s) => s.id);
  let last = 0;
  UNITS.forEach((unit) => {
    assert.ok(!ids.has(unit.id), `duplicate ${unit.id}`);
    ids.add(unit.id);
    assert.ok(features.has(unit.feature), `${unit.id}: feature ${unit.feature} not in index.html`);
    const idx = sectionOrder.indexOf(unit.section);
    assert.ok(idx >= last, `${unit.id}: sections must go from easy to hard`);
    last = idx;
    assert.ok(isText(unit.title) && isText(unit.blurb), `${unit.id}: title/blurb in three languages`);
    assert.ok(unit.cards.some((c) => c.type === 'guide'), `${unit.id}: has a guide card`);
    assert.ok(unit.cards.filter((c) => c.type !== 'guide').length >= 3, `${unit.id}: at least 3 questions`);
  });
});

function checkCard(card, where, fileText, fileName) {
  if (card.type === 'gen') {
    assert.ok(GENERATORS[card.gen], `${where}: unknown generator ${card.gen}`);
    assert.ok(Number.isInteger(card.count ?? 1) && (card.count ?? 1) >= 1, `${where}: gen count`);
    return;
  }
  refsOf(card).forEach((ref) => {
    assert.ok(refIds.has(ref), `${where}: unknown ref ${ref}`);
    assert.ok(fileText.includes(`ref:${ref}`), `${where}: ref:${ref} missing from the annotation list of ${fileName}`);
  });
  assert.ok(refsOf(card).length, `${where}: needs a ref`);
  if (card.tool) assert.ok(features.has(card.tool.feature), `${where}: tool feature ${card.tool.feature}`);
  if (card.visual) assert.ok(VISUAL_KINDS.includes(card.visual.kind), `${where}: visual kind`);
  if (card.type === 'guide') {
    assert.ok(isText(card.title) && card.steps.length && card.steps.every(isText), `${where}: guide text`);
    return;
  }
  assert.ok(isText(card.prompt) && isText(card.hint) && isText(card.explain), `${where}: prompt/hint/explain`);
  if (card.type === 'choice') {
    assert.ok(card.options.length >= 2 && card.options.every(isText), `${where}: options`);
    assert.ok(Number.isInteger(card.answer) && card.answer >= 0 && card.answer < card.options.length, `${where}: answer index`);
    const keys = card.options.map((o) => JSON.stringify(o));
    assert.equal(new Set(keys).size, keys.length, `${where}: duplicate options`);
  } else if (card.type === 'fill') {
    const bankIds = card.bank.map((b) => b.id);
    card.answer.forEach((a) => assert.ok(bankIds.includes(a), `${where}: answer ${a} not in bank`));
    LANGS.forEach((l) => assert.equal(card.prompt[l].split('___').length - 1, card.answer.length, `${where}: blanks in ${l}`));
    card.bank.forEach((b) => assert.ok(isText(b.label), `${where}: bank label`));
  } else if (card.type === 'match') {
    assert.ok(card.pairs.length >= 2, `${where}: pairs`);
    card.pairs.forEach(([a, b]) => assert.ok(isText(a) && isText(b), `${where}: pair text`));
    // 右边允许完全相同的答案（判分时可以互换），但左边必须各不相同，右边至少要有两种不同的答案
    assert.equal(new Set(card.pairs.map(([a]) => JSON.stringify(a))).size, card.pairs.length, `${where}: left-hand items must be distinct`);
    assert.ok(new Set(card.pairs.map(([, b]) => JSON.stringify(b))).size >= 2, `${where}: right-hand items all the same`);
  } else {
    assert.fail(`${where}: unknown type ${card.type}`);
  }
}
const questionCount = (cards) => cards.reduce((n, c) => n + (c.type === 'guide' ? 0 : c.type === 'gen' ? (c.count ?? 1) : 1), 0);

test('every card is answerable, explained and cited', () => {
  UNITS.forEach((unit) => unit.cards.forEach((card, i) => checkCard(card, `${unit.id}#${i}`, sectionText(unit.section), `learn_units_${unit.section}.js`)));
});

test('every unit has 4 advanced levels with a guide and at least 3 questions', () => {
  UNITS.forEach((unit) => {
    assert.equal(unit.branch.length, 4, `${unit.id}: needs 4 advanced levels`);
    unit.branch.forEach((level, k) => {
      const where = `${unit.id}:${k + 1}`;
      assert.ok(isText(level.title), `${where}: title`);
      assert.ok(level.cards.some((c) => c.type === 'guide'), `${where}: guide`);
      assert.ok(questionCount(level.cards) >= 3, `${where}: at least 3 questions`);
      level.cards.forEach((card, i) => checkCard(card, `${where}#${i}`, branchText(unit.section), `learn_branches_${unit.section}.js`));
    });
  });
});

test('every tool panel links to a tutorial unit', () => {
  const unitIds = new Set([...UNITS, ...SIDES].map((u) => u.id));
  Object.entries(FEATURE_UNIT).forEach(([feature, unit]) => {
    assert.ok(features.has(feature), `unknown feature ${feature}`);
    assert.ok(unitIds.has(unit), `unknown unit ${unit}`);
  });
  [...features].filter((f) => !['about', 'learn'].includes(f)).forEach((f) => assert.ok(FEATURE_UNIT[f], `${f} has no tutorial unit`));
});

test('the tutorial text uses no emoji', () => {
  const emoji = /[\u{1F000}-\u{1FAFF}\u2B50\u25B6\u2328\u26A1\u2705\u274C\u2728]/u;
  UNITS.forEach((unit) => assert.ok(!emoji.test(JSON.stringify(unit)), `${unit.id} contains emoji`));
});

test('every main level opens with a guide that circles what each step talks about', () => {
  const unitIds = new Set(UNITS.map((u) => u.id));
  Object.keys(TOURS).forEach((id) => assert.ok(unitIds.has(id), `tour for unknown unit ${id}`));
  UNITS.forEach((unit) => {
    const guide = unit.cards.find((c) => c.type === 'guide');
    const where = `${unit.id} opening guide`;
    assert.ok(guide.tour, `${where}: needs a tour`);
    assert.ok(guide.visual && !['keys', 'staff'].includes(guide.visual.kind), `${where}: needs an annotatable visual`);
    assert.equal(guide.tour.length, guide.steps.length, `${where}: one tour entry per step`);
    const parts = visualParts(zh(guide.visual));
    assert.ok(parts.size, `${where}: visual has no parts`);
    const marks = guide.tour.flatMap((entry) => [].concat(entry ?? []));
    assert.ok(marks.length, `${where}: marks nothing`);
    assert.ok(guide.tour[0] || guide.tour[1], `${where}: the first steps should point at something`);
    marks.forEach((mark) => {
      assert.ok(mark.at.length, `${where}: empty mark`);
      mark.at.forEach((id) => assert.ok(parts.has(id), `${where}: no part ${id} in ${guide.visual.kind}`));
      if (mark.label !== undefined) assert.ok(isText(mark.label), `${where}: label text`);
    });
  });
});

test('every guide with a tour circles real parts of its picture', () => {
  const guides = UNITS.flatMap((unit) => [[unit.id, unit.cards], ...unit.branch.map((l, k) => [`${unit.id}:${k + 1}`, l.cards])]
    .flatMap(([key, cards]) => cards.map((card, i) => [`${key}#${i}`, card]).filter(([, c]) => c.type === 'guide')));
  const keys = new Set(guides.map(([key]) => key));
  Object.keys(MORE_TOURS).forEach((key) => assert.ok(keys.has(key), `extra tour for unknown guide ${key}`));
  guides.forEach(([where, guide]) => assert.ok(guide.tour, `${where}: every guide needs a picture with step-by-step pointers`));
  guides.filter(([, c]) => c.tour).forEach(([where, guide]) => {
    assert.ok(guide.visual && !['keys', 'staff'].includes(guide.visual.kind), `${where}: needs an annotatable visual`);
    assert.equal(guide.tour.length, guide.steps.length, `${where}: one tour entry per step`);
    const parts = visualParts(zh(guide.visual));
    const marks = guide.tour.flatMap((entry) => [].concat(entry ?? []));
    assert.ok(marks.length, `${where}: marks nothing`);
    marks.forEach((mark) => {
      mark.at.forEach((id) => assert.ok(parts.has(id), `${where}: no part ${id} in ${guide.visual.kind}`));
      if (mark.label !== undefined) assert.ok(isText(mark.label), `${where}: label text`);
    });
  });
});

test('side quests hang off a main unit, are fully cited and every guide circles its picture', () => {
  const ids = new Set(UNITS.map((u) => u.id));
  const emoji = /[\u{1F000}-\u{1FAFF}\u2B50\u25B6\u2328\u26A1\u2705\u274C\u2728]/u;
  assert.ok(SIDES.length, 'at least one side quest');
  SIDES.forEach((side) => {
    assert.ok(!ids.has(side.id), `${side.id}: id clashes with another level`);
    ids.add(side.id);
    const parent = UNITS.find((u) => u.id === side.parent);
    assert.ok(parent, `${side.id}: unknown parent ${side.parent}`);
    assert.equal(side.section, parent.section, `${side.id}: same section as its parent`);
    assert.ok(features.has(side.feature), `${side.id}: feature`);
    assert.ok(isText(side.title) && isText(side.blurb), `${side.id}: title/blurb`);
    assert.ok(!emoji.test(JSON.stringify(side)), `${side.id} contains emoji`);
    assert.equal(side.branch.length, 4, `${side.id}: 4 advanced levels`);
    const levels = [[side.id, side.cards], ...side.branch.map((l, k) => [`${side.id}:${k + 1}`, l.cards])];
    side.branch.forEach((l, k) => assert.ok(isText(l.title), `${side.id}:${k + 1}: title`));
    levels.forEach(([key, cards]) => {
      assert.ok(cards.some((c) => c.type === 'guide'), `${key}: guide`);
      assert.ok(questionCount(cards) >= 3, `${key}: at least 3 questions`);
      cards.forEach((card, i) => {
        const where = `${key}#${i}`;
        checkCard(card, where, readFileSync(new URL(`./${side.sourceFile}`, import.meta.url), 'utf8'), side.sourceFile);
        if (card.type !== 'guide') return;
        assert.ok(card.tour && card.visual && !['keys', 'staff'].includes(card.visual.kind), `${where}: picture with pointers`);
        assert.equal(card.tour.length, card.steps.length, `${where}: one tour entry per step`);
        const parts = visualParts(zh(card.visual));
        const marks = card.tour.flatMap((entry) => [].concat(entry ?? []));
        assert.ok(marks.length, `${where}: marks nothing`);
        marks.forEach((mark) => {
          mark.at.forEach((id) => assert.ok(parts.has(id), `${where}: no part ${id} in ${card.visual.kind}`));
          if (mark.label !== undefined) assert.ok(isText(mark.label), `${where}: label text`);
        });
      });
    });
  });
});

test('choice questions have four options and matching questions four pairs (learn_decoys.js)', async () => {
  const { UNITS, SIDES } = await import('./learn_content.js');
  const { EXTRA_OPTIONS, EXTRA_PAIRS, decoyKey } = await import('./learn_decoys.js');
  const zh = (v) => (typeof v === 'string' ? v : v?.zh);
  const all = [...UNITS, ...SIDES].flatMap((u) => [u.cards, ...(u.branch || []).map((b) => b.cards)]).flat();
  for (const card of all) {
    if (card.type === 'choice') {
      assert.notEqual(card.options.length, 3, `3 options: ${zh(card.prompt)}`);
      assert.equal(new Set(card.options.map(zh)).size, card.options.length, `duplicate option: ${zh(card.prompt)}`);
      for (const o of card.options) if (typeof o !== 'string') assert.ok(o.zh && o.ja && o.en, `option missing a language: ${zh(card.prompt)}`);
    }
    if (card.type === 'match') {
      assert.ok(card.pairs.length >= 4, `fewer than 4 pairs: ${zh(card.prompt)}`);
      assert.equal(new Set(card.pairs.map(([a]) => zh(a))).size, card.pairs.length, `duplicate left item: ${zh(card.prompt)}`);
      // 右边可以有完全相同的答案（三种语言都一样）：判分时这两项可以互换；只是中文相同、别的语言不同就不行
      const rights = new Map();
      card.pairs.forEach(([, b]) => { const k = zh(b); const full = JSON.stringify(b); assert.ok(!rights.has(k) || rights.get(k) === full, `right items share a Chinese label but differ elsewhere: ${zh(card.prompt)}`); rights.set(k, full); });
    }
  }
  // 干扰项绑定原始题卡；最终题干还会补上独立作答所需的背景条件。
  const allKeys = new Set();
  const sourceFiles = readdirSync(new URL('.', import.meta.url)).filter(f => /^learn_(units|branches)_.+\.js$/.test(f));
  const visit = value => {
    if (!value || typeof value !== 'object') return;
    if (value.type === 'choice' && value.options.length === 3) allKeys.add(decoyKey(value));
    else Object.values(value).forEach(visit);
  };
  for (const file of sourceFiles) visit(await import(`./${file}`));
  const stale = [...Object.keys(EXTRA_OPTIONS)].filter((k) => !allKeys.has(k));
  assert.deepEqual(stale, [], 'extra options whose question no longer exists');
  assert.ok(Object.keys(EXTRA_PAIRS).length >= 55);
});

test('matching: identical right-hand answers are interchangeable (e.g. two clefs on the second line from the top)', async () => {
  const { gradeCard } = await import('./learn_engine.js');
  const card = UNITS.find((u) => u.id === 'staff').cards.find((c) => c.type === 'match' && zh(c.prompt).includes('谱号'));
  const same = card.pairs.map((p, i) => i).filter((i) => zh(card.pairs[i][1]) === '从上数第二线');
  assert.equal(same.length, 2);
  const straight = Object.fromEntries(card.pairs.map((_, i) => [i, i]));
  const swapped = { ...straight, [same[0]]: same[1], [same[1]]: same[0] };
  assert.equal(gradeCard(card, straight), true);
  assert.equal(gradeCard(card, swapped), true, 'swapping the two identical answers is still correct');
  const wrong = { ...straight, 0: same[0], [same[0]]: 0 };
  assert.equal(gradeCard(card, wrong), false);
});


import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { GENERATORS, expandCards, PLR, nameChord, SCALE_LIBRARY } from './learn_generators.js';
import { REFERENCES } from './references.js';

const LANGS = ['zh', 'ja', 'en'];
const refIds = new Set(REFERENCES.map((r) => r.id));
const isText = (v) => typeof v === 'string' ? v.length > 0 : LANGS.every((l) => typeof v?.[l] === 'string' && v[l].length > 0 && !/undefined|NaN|\{\w+\}/.test(v[l]));
const source = readFileSync(new URL('./learn_generators.js', import.meta.url), 'utf8');
const seeded = (seed) => { let x = seed; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };

test('every generator produces valid, answerable cards', () => {
  for (const [name, gen] of Object.entries(GENERATORS)) {
    for (let seed = 1; seed <= 80; seed += 1) {
      const card = gen.make(seeded(seed * 7919 + name.length), {});
      const where = `${name}#${seed}`;
      [].concat(card.ref).forEach((r) => { assert.ok(refIds.has(r), `${where}: unknown ref ${r}`); assert.ok(source.includes(`ref:${r}`), `${where}: ref:${r} not annotated`); });
      assert.ok(isText(card.prompt) && isText(card.hint) && isText(card.explain), `${where}: text ${JSON.stringify(card.prompt)}`);
      if (card.type === 'choice') {
        assert.ok(card.options.length >= 2, `${where}: options`);
        const keys = card.options.map((o) => JSON.stringify(o));
        assert.equal(new Set(keys).size, keys.length, `${where}: duplicate options ${keys}`);
        card.options.forEach((o) => assert.ok(isText(o), `${where}: option text ${JSON.stringify(o)}`));
        assert.equal(card.answer, 0);
      } else if (card.type === 'fill') {
        LANGS.forEach((l) => assert.equal((typeof card.prompt === 'string' ? card.prompt : card.prompt[l]).split('___').length - 1, card.answer.length, `${where}: blanks`));
        card.answer.forEach((a) => assert.ok(card.bank.some((b) => b.id === a), `${where}: answer in bank`));
        assert.equal(new Set(card.bank.map((b) => JSON.stringify(b.label))).size, card.bank.length, `${where}: bank duplicates`);
      } else assert.fail(`${where}: unexpected type ${card.type}`);
      assert.ok(!/[\u{1F000}-\u{1FAFF}]/u.test(JSON.stringify(card)), `${where}: emoji`);
    }
  }
});

test('placeholders expand into the requested number of cards', () => {
  const cards = expandCards([{ type: 'guide' }, { type: 'gen', gen: 'plr', count: 3 }], seeded(3));
  assert.equal(cards.length, 4);
  assert.ok(cards.slice(1).every((c) => c.type === 'choice'));
  assert.throws(() => expandCards([{ type: 'gen', gen: 'nope' }]));
});

// ref:omt2e-neo-riemannian 循环长度与 H 变换
test('neo-Riemannian cycles close: PL after 6, RP after 8; H(C) = A♭m', () => {
  const run = (ops, n) => { let c = { root: 0, major: true }; for (let i = 0; i < n; i += 1) c = PLR[ops[i % 2]](c); return c; };
  assert.deepEqual(run(['P', 'L'], 6), { root: 0, major: true });
  assert.deepEqual(run(['R', 'P'], 8), { root: 0, major: true });
  assert.deepEqual(PLR.H({ root: 0, major: true }), { root: 8, major: false });
  assert.deepEqual(PLR.L({ root: 0, major: true }), { root: 4, major: false });
});

// ref:wiki-negative-harmony C 调：G7 的负和声是 Dm7♭5（音为 D F A♭ C）
test('negative harmony and chord naming', () => {
  const reflect = (pc) => (7 - pc + 12) % 12;
  assert.equal(nameChord([0, 4, 7].map(reflect)), 'Cm');
  assert.equal(nameChord([7, 11, 2, 5].map(reflect)), 'Dm7♭5');
});

test('scale library matches the chord-scale reference', async () => {
  const { MusicScale } = await import('./jazz_compass.js?v=20261002-no');
  const tool = new MusicScale().scaleMode;
  SCALE_LIBRARY.forEach((s) => {
    const match = tool.find((m) => m.id === s.id || (s.id === 'mixolydian' && m.id === 'mixlydian') || (s.id === 'aeolian' && m.id === 'aeolian'));
    if (match) assert.deepEqual(s.iv, match.intervals, s.id);
  });
});

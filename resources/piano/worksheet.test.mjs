import test from 'node:test';
import assert from 'node:assert/strict';
import { worksheetHTML, printable } from './worksheet.js';
import { UNITS, SIDES } from './learn_content.js';
import { expandCards } from './learn_generators.js';

const seeded = (n) => () => { n = (n * 1103515245 + 12345) >>> 0; return n / 4294967296; };

test('every unit and side prints a worksheet whose answer key matches the printed options', () => {
  let total = 0;
  for (const unit of [...UNITS, ...SIDES]) {
    const rng = seeded(unit.id.length + 7);
    const sections = [{ heading: 'main', cards: expandCards(unit.cards, rng) }, ...(unit.branch || []).map((l) => ({ heading: 'b', cards: expandCards(l.cards, rng) }))];
    const cards = sections.flatMap((s) => s.cards).filter(printable);
    const { html, count } = worksheetHTML({ title: unit.id, sections, lang: 'zh', seed: unit.id });
    assert.equal(count, cards.length, unit.id);
    total += count;
    if (!count) continue;
    const questions = html.split('<section class="ws-answers">')[0];
    const key = html.split('<section class="ws-answers">')[1];
    assert.equal((key.match(/<li><b>\d+\.<\/b>/g) || []).length, count, `${unit.id} one answer per question`);
    // 选择题：答案页的字母指向的选项文字 = 正确选项
    const blocks = questions.split('<div class="ws-q">').slice(1);
    let n = 0;
    cards.forEach((card, i) => {
      if (card.type !== 'choice') return;
      const block = blocks[i];
      const answerLine = key.match(new RegExp(`<li><b>${i + 1}\\.</b> ([A-J])　`))?.[1];
      assert.ok(answerLine, `${unit.id} q${i + 1} has a letter`);
      const printed = block.match(new RegExp(`<li><b>${answerLine}</b> ([^<]*)</li>`))?.[1];
      const want = typeof card.options[card.answer] === 'string' ? card.options[card.answer] : card.options[card.answer].zh;
      assert.equal(printed, String(want).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'), `${unit.id} q${i + 1}`);
      n += 1;
    });
  }
  assert.ok(total > 1200, `printable questions: ${total}`);
});

test('listening-only questions are skipped and counted', () => {
  const { html, count, skipped } = worksheetHTML({ title: 'x', lang: 'en', sections: [{ cards: [
    { type: 'choice', prompt: 'Which?', options: ['a', 'b'], answer: 0, audio: { notes: [60] } },
    { type: 'fill', prompt: 'C ___ E ___', bank: [{ id: 'd', label: 'D' }, { id: 'f', label: 'F' }], answer: ['d', 'f'] },
    { type: 'match', pairs: [['I', 'tonic'], ['V', 'dominant']] },
    { type: 'guide', title: 'g' },
  ] }] });
  assert.equal(count, 2); assert.equal(skipped, 1);
  assert.match(html, /1 listening questions/);
  assert.match(html, /（1）D　（2）F/);
  assert.match(html, /1–[ab]　2–[ab]/);
});

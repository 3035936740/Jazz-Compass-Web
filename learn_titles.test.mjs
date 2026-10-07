import test from 'node:test';
import assert from 'node:assert/strict';
import { learnLevelTitle } from './learn_ui.js';
import { UNITS, SIDES, SECTIONS } from './learn_content.js';

test('resume titles are rebuilt from the level ID in all three languages, including old Chinese saves', () => {
  for (const lang of ['zh', 'ja', 'en']) {
    for (const unit of [...UNITS, ...SIDES]) {
      assert.equal(learnLevelTitle(unit.id, lang), unit.title[lang]);
      unit.branch.forEach((branch, index) => {
        const title = learnLevelTitle(`${unit.id}:${index + 1}`, lang, '旧存档中文标题');
        assert.ok(title.includes(unit.title[lang]) && title.includes(branch.title[lang]), `${unit.id} ${lang}`);
      });
    }
    for (const section of SECTIONS) {
      assert.ok(learnLevelTitle(`chapter@${section.id}`, lang).includes(section.title[lang]));
      assert.ok(learnLevelTitle(`chapter-ex@${section.id}`, lang).includes(section.title[lang]));
    }
  }
  assert.match(learnLevelTitle('microharmony:4', 'en', '旧存档中文标题'), /Advanced 4/);
  assert.match(learnLevelTitle('keys:5', 'en'), /Mixed test/);
  assert.equal(learnLevelTitle('review', 'en'), 'Review mistakes');
  assert.equal(learnLevelTitle('final', 'en'), 'Final challenge');
  assert.equal(learnLevelTitle('final-ex', 'en'), 'EX final challenge');
  assert.equal(learnLevelTitle('removed-unit', 'en', { zh: '旧标题', en: 'Old title' }), 'Old title');
});

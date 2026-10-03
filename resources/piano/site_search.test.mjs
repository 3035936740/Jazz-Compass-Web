import test from 'node:test';
import assert from 'node:assert/strict';
import { buildIndex, search, normalize } from './site_search.js';
import { UNITS } from './learn_content.js';

const tools = [
  { id: 'chinese', name: '中国民族调式', intro: '宫商角徵羽', allNames: '中国民族调式 中国の民族旋法 Chinese Modes' },
  { id: 'staff', name: '五线谱', intro: '记谱编辑器', allNames: '五线谱 五線譜 Staff' },
];

test('search finds tools by any language and tutorial levels by their card text', () => {
  const index = buildIndex({ tools, units: UNITS, lang: 'zh' });
  assert.equal(search(index, '五线谱')[0].href, '#staff');
  assert.equal(search(index, 'chinese modes')[0].href, '#chinese');
  assert.ok(search(index, '那不勒斯').some((r) => r.href.startsWith('#learn?q=chromatic')), 'Neapolitan → chromatic level');
  assert.ok(search(index, '旋宫').some((r) => r.href.startsWith('#learn?q=heptatonic')), 'xuangong → heptatonic level');
  assert.equal(search(index, '   ').length, 0);
  assert.equal(normalize('C♯ m7♭5'), 'c#m7b5');
});

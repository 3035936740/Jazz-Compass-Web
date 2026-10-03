// 生成 README 致谢区块：node scripts/sync-references.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { REFERENCES, REFERENCE_TOPICS } from '../references.js';

export const START = '<!-- references:start -->';
export const END = '<!-- references:end -->';

export function renderReferencesMarkdown() {
  const lines = [START, ''];
  for (const topic of REFERENCE_TOPICS) {
    const items = REFERENCES.filter((reference) => reference.topic === topic.id);
    if (!items.length) continue;
    lines.push(`**${topic.en} / ${topic.zh}**`, '');
    for (const r of items) {
      const license = r.license ? ` — ${r.license}` : '';
      lines.push(`- [${r.title}](${r.url}) — ${r.author}${license}. ${r.usedFor.en}（${r.usedFor.zh}）. Accessed ${r.accessed}.`);
    }
    lines.push('');
  }
  lines.push(END);
  return lines.join('\n');
}

export function syncReadme(text) {
  const block = renderReferencesMarkdown();
  const start = text.indexOf(START);
  const end = text.indexOf(END);
  if (start === -1 || end === -1) throw new Error('README is missing the references markers');
  return text.slice(0, start) + block + text.slice(end + END.length);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const path = new URL('../README.md', import.meta.url);
  writeFileSync(path, syncReadme(readFileSync(path, 'utf8')));
  console.log('README references updated');
}

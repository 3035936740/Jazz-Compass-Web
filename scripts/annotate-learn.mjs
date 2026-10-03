// 乐理闯关：根据题卡的 ref 重新生成 learn_units_*.js / learn_branches_*.js 顶部的"依据汇总"，
// 并按这些文件（以及 learn_generators.js）里实际出现的 ref:<id> 同步 references.js 的 usedIn
// 用法：node scripts/annotate-learn.mjs（之后再跑 node scripts/sync-references.mjs 更新 README）
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentFiles = readdirSync(root).filter((f) => /^learn_(units|branches)_[a-z]+\.js$/.test(f)).sort();
const managed = [...contentFiles, 'learn_generators.js'];
const cardsOf = (mod) => (mod.UNITS ? mod.UNITS.flatMap((u) => [u.cards, ...(u.branch || []).map((level) => level.cards)].flat()) : Object.values(mod.BRANCHES || {}).flat().flatMap((level) => level.cards));

for (const file of contentFiles) {
  const path = join(root, file);
  const mod = await import(`${pathToFileURL(path).href}?t=${Date.now()}`);
  const refs = [...new Set(cardsOf(mod).flatMap((c) => [].concat(c.ref ?? [])))];
  const lines = [];
  let line = '//  ';
  refs.forEach((id) => {
    const piece = ` ref:${id}`;
    if (line.length + piece.length > 118) { lines.push(line); line = '//  '; }
    line += piece;
  });
  if (line.trim() !== '//') lines.push(line);
  const text = readFileSync(path, 'utf8');
  const start = text.indexOf('\n', text.indexOf('// 依据汇总')) + 1;
  const end = text.indexOf('// @refs-end');
  if (start <= 0 || end < 0) throw new Error(`${file}: missing annotation markers`);
  writeFileSync(path, text.slice(0, start) + (lines.length ? `${lines.join('\n')}\n` : '') + text.slice(end));
}

const refsByFile = Object.fromEntries(managed.map((file) => [file, new Set([...readFileSync(join(root, file), 'utf8').matchAll(/ref:([a-z0-9-]+)/g)].map((m) => m[1]))]));

// references.js：受管文件按实际引用增删；不再含 ref:<id> 的 learn_content.js 移除
const refPath = join(root, 'references.js');
let refText = readFileSync(refPath, 'utf8');
const contentText = readFileSync(join(root, 'learn_content.js'), 'utf8');
refText = refText.replace(/id: '([a-z0-9.-]+)',([\s\S]*?)usedIn: \[([^\]]*)\]/g, (whole, id, middle, list) => {
  let used = [...list.matchAll(/'([^']+)'/g)].map((m) => m[1]);
  used = used.filter((f) => !managed.includes(f) && !(f === 'learn_content.js' && !contentText.includes(`ref:${id}`)));
  managed.forEach((f) => { if (refsByFile[f].has(id)) used.push(f); });
  return `id: '${id}',${middle}usedIn: [${used.map((f) => `'${f}'`).join(', ')}]`;
});
writeFileSync(refPath, refText);
console.log(managed.map((f) => `${f}: ${refsByFile[f].size} refs`).join('\n'));

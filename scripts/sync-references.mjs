// 生成 README 致谢区块：node scripts/sync-references.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { REFERENCES, REFERENCE_TOPICS } from '../references.js';

export const START = '<!-- references:start -->';
export const END = '<!-- references:end -->';

// 只有明确的许可声明才对应许可文件；引用事实或版权声明不是再利用许可。
export function referenceLicense(reference) {
  if (reference.id === 'sposobin') return {
    label: 'MIT', file: 'Sposobin-MIT.txt',
    note: '上游 README 声明 MIT；未提供独立 LICENSE 或版权署名行，详情见许可目录',
  };
  if (reference.id === 'gotham-species') return {
    label: 'MIT (code) / CC0 (rendered scores)', file: 'MarkGotham-species-MIT.txt',
    note: '上游区分代码与渲染乐谱；CC0 原文及本项目数据转换说明见许可目录',
  };
  if (reference.license === 'CC BY-SA 4.0') return {
    label: reference.license, file: 'CC-BY-SA-4.0.txt',
  };
  if (reference.license === 'CC BY 3.0') return {
    label: reference.license, file: 'CC-BY-3.0.txt',
  };
  if (reference.license === 'CC BY 4.0') return {
    label: reference.license, file: 'CC-BY-4.0.txt',
    note: '仅课程文字与静态图片；上游播放器、源码、数据文件与音频另有规定',
  };
  if (reference.id === 'w3c-musicxml') return {
    label: reference.license, file: 'W3C-Community-FSA.txt',
    note: '规范的许可；本项目依据规范自行实现 MusicXML 导出',
  };
  return {
    label: '**未登记明确再利用许可（待核实）**',
    note: reference.licenseNote || (reference.license ? `原登记说明：${reference.license}；此说明不作为开放许可` : undefined),
  };
}

export function renderReferencesMarkdown() {
  const lines = [START, ''];
  for (const topic of REFERENCE_TOPICS) {
    const items = REFERENCES.filter((reference) => reference.topic === topic.id);
    if (!items.length) continue;
    lines.push(`**${topic.en} / ${topic.zh}**`, '');
    for (const r of items) {
      const info = referenceLicense(r);
      const license = ` — ${info.file ? `[${info.label}](Licenses/${info.file})` : info.label}${info.note ? `（${info.note}）` : ''}`;
      lines.push(`- [${r.title}](${r.url}) — ${r.author}${license}. ${r.usedFor.en}（${r.usedFor.zh}）. Accessed ${r.accessed}.`);
    }
    lines.push('');
  }
  lines.push(END);
  return lines.join('\n');
}

export function renderLicenseInventory() {
  const lines = [
    '# 引用许可清单', '',
    '由 `node scripts/sync-references.mjs` 从根目录 `references.js` 生成。包含 `resources/piano` 内仍在使用的额外引用。', '',
    '作者、原文链接、使用范围与关联文件一起保留；未登记明确许可的来源仅标记待核实，不补写许可证。许可适用范围、改编说明和核对证据见 [README](README.md)。', '',
    '| 来源 / 作者 | 许可 | 使用范围 | 关联文件 |',
    '| --- | --- | --- | --- |',
  ];
  const cell = (value) => value.replaceAll('|', '\\|').replaceAll('\n', ' ');
  for (const r of REFERENCES) {
    const info = referenceLicense(r);
    const license = info.file ? `[${info.label}](${info.file})` : info.label;
    const files = r.usedIn.map((file) => `[${file}](../${file})`).join(', ');
    lines.push(`| [${cell(r.title)}](${r.url}) — ${cell(r.author)} | ${cell(license)}${info.note ? `<br>${cell(info.note)}` : ''} | ${cell(r.usedFor.zh)} | ${files} |`);
  }
  return lines.join('\n') + '\n';
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
  writeFileSync(new URL('../Licenses/REFERENCES.md', import.meta.url), renderLicenseInventory());
  console.log('README references and license inventory updated');
}

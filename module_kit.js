// 各乐理模块共用的界面小工具
import { REFERENCES } from './references.js';

export function language() {
  const lang = window.__lang || 'zh';
  return ['zh', 'ja', 'en'].includes(lang) ? lang : 'en';
}

/** el('div', 'class', 'text') 或 el('div', { class, text, attrs }) */
export function el(tag, className = '', text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

export function button(className, text, onClick) {
  const node = el('button', className, text);
  node.type = 'button';
  if (onClick) node.addEventListener('click', onClick);
  return node;
}

export function option(value, text) {
  const node = document.createElement('option');
  node.value = value;
  node.textContent = text ?? value;
  return node;
}

export function field(labelText, control, className = '') {
  const label = el('label', className);
  label.append(el('span', '', labelText), control);
  return label;
}

export const midiToFrequency = (midi) => 440 * 2 ** ((midi - 69) / 12);

/** 依次播放若干个 MIDI 音（单音），返回可取消的计时器列表 */
export function playMidiSequence(playChord, midis, { gap = 340, length = 0.38, onNote } = {}) {
  return midis.map((midi, index) => setTimeout(() => {
    playChord([midiToFrequency(midi)], length, { interrupt: index === 0 });
    onNote?.(index);
  }, index * gap));
}

export function playMidiChord(playChord, midis, length = 1.4) {
  playChord(midis.map(midiToFrequency), length);
}

/** 文末出处：只列出本模块实际引用的登记条目 */
export function sourcesFooter(ids, caption) {
  const lang = language();
  const footer = el('div', 'mk-sources');
  footer.appendChild(el('span', '', caption ?? { zh: '资料来源', ja: '出典', en: 'Sources' }[lang]));
  ids.forEach((id, index) => {
    const reference = REFERENCES.find((item) => item.id === id);
    if (!reference) return;
    const link = el('a', '', `[${index + 1}] ${reference.title}`);
    link.href = reference.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.title = `${reference.author} · ${reference.usedFor[lang] || reference.usedFor.en}`;
    footer.appendChild(link);
  });
  return footer;
}

/** 行内引用标记，编号与 sourcesFooter 中的顺序一致 */
export function cite(ids, id) {
  const reference = REFERENCES.find((item) => item.id === id);
  const index = ids.indexOf(id);
  const link = el('a', 'mk-cite', `[${index + 1}]`);
  if (reference) {
    link.href = reference.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.title = reference.title;
  }
  return link;
}

export function tabs(container, items, onChange, initial = items[0]?.id) {
  const bar = el('div', 'mk-tabs');
  bar.setAttribute('role', 'tablist');
  const buttons = new Map();
  const select = (id) => {
    buttons.forEach((node, key) => {
      node.classList.toggle('active', key === id);
      node.setAttribute('aria-selected', String(key === id));
    });
    onChange(id);
  };
  items.forEach((item) => {
    const node = button('', item.label, () => select(item.id));
    node.setAttribute('role', 'tab');
    buttons.set(item.id, node);
    bar.appendChild(node);
  });
  container.appendChild(bar);
  return { select, bar, initial };
}

/** 跨模块链接：#feature 或 #feature?q=…，由 script.js 的 hashchange 处理（打开面板并填入输入框） */
export function crossLink(feature, label, query) {
  const link = el('a', 'mk-crosslink', `→ ${label}`);
  link.href = `#${feature}${query ? `?q=${encodeURIComponent(query)}` : ''}`;
  return link;
}

/** 文末"相关工具"：链接到其他面板，名称取自 lang.js 的 nav_* */
export function relatedLinks(features) {
  const lang = language();
  const row = el('div', 'mk-links');
  row.appendChild(el('span', 'mk-meta', { zh: '相关工具', ja: '関連ツール', en: 'Related tools' }[lang]));
  features.forEach((feature) => row.appendChild(crossLink(feature, globalThis.window?.__?.(`nav_${feature}`) || feature)));
  return row;
}

/** "导出 MIDI"按钮：getTracks 返回 buildMidiFile 的音轨数组（为空时不导出） */
export function midiExportButton(getTracks, fileName, options = {}) {
  const lang = language();
  return button('btn btn-ghost btn-sm', { zh: '⤓ 导出 MIDI', ja: '⤓ MIDI 書き出し', en: '⤓ Export MIDI' }[lang], async () => {
    const tracks = getTracks();
    if (!tracks?.length || !tracks.some((track) => track.notes.length)) return;
    const { downloadMidi } = await import('./midi_export.js');
    downloadMidi(typeof fileName === 'function' ? fileName() : fileName, tracks, typeof options === 'function' ? options() : options);
  });
}

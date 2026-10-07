// 界面小图标（内联 SVG，跟随文字颜色）：代替 emoji，避免不同系统上的彩色 emoji 让界面显得突兀
const stroke = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

const PATHS = {
  headphones: `<path d="M4 13v-2a8 8 0 0 1 16 0v2" ${stroke}/><rect x="3" y="12" width="4" height="8" rx="2" ${stroke}/><rect x="17" y="12" width="4" height="8" rx="2" ${stroke}/>`,
  speaker: `<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" ${stroke}/>`,
  'speaker-off': `<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor"/><path d="M15.5 9.5l5 5M20.5 9.5l-5 5" ${stroke}/>`,
  play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
  replay: `<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4" ${stroke}/>`,
  flame: '<path d="M12 2.5c.8 3 4.8 5 4.8 9.8a4.8 4.8 0 0 1-9.6 0c0-2 .9-3.6 2.2-4.8.2 1.5 1 2.6 2.1 3.1-.4-2.6 0-5.2.5-8.1z" fill="currentColor"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" fill="currentColor"/>',
  bolt: '<path d="M13.5 2.5 5 13.5h6l-1 8 8.5-11h-6z" fill="currentColor"/>',
  bulb: `<path d="M9.5 18h5M10.5 21h3M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z" ${stroke}/>`,
  book: `<path d="M12 6.5C10.5 5 8 4.5 4 4.5v13c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-13c-4 0-6.5.5-8 2zM12 6.5v13" ${stroke}/>`,
  lock: `<rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" ${stroke}/>`,
  sparkle: '<path d="M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7z" fill="currentColor"/>',
  refresh: `<path d="M19.5 12a7.5 7.5 0 0 1-13 5.1M4.5 12a7.5 7.5 0 0 1 13-5.1M17.5 3v4h-4M6.5 21v-4h4" ${stroke}/>`,
  piano: `<rect x="3" y="5.5" width="18" height="13" rx="2" ${stroke}/><path d="M8 5.5v8M12 5.5v8M16 5.5v8" ${stroke}/>`,
  keyboard: `<rect x="2.5" y="6" width="19" height="12" rx="2" ${stroke}/><path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M7.5 14h9" ${stroke}/>`,
  map: `<path d="M9 4.5 3.5 6.5v13L9 17.5l6 2 5.5-2v-13L15 6.5zM9 4.5v13M15 6.5v13" ${stroke}/>`,
  summit: `<path d="M2.5 20 9.5 8l3.3 5.6 2.4-3.6L21.5 20z" fill="currentColor"/><path d="M9.5 8V3.2" ${stroke}/><path d="M9.5 3.2h4.3l-1.2 1.5 1.2 1.5H9.5z" fill="currentColor"/>`,
  flag: `<path d="M5.5 21V4" ${stroke}/><path d="M5.5 4.5h11.5l-2.6 4 2.6 4H5.5z" fill="currentColor"/>`,
  trophy: `<path d="M7.5 3.5h9v5a4.5 4.5 0 0 1-9 0z" fill="currentColor"/><path d="M7.5 5.5H4.5a3 3 0 0 0 3 4M16.5 5.5h3a3 3 0 0 1-3 4M12 13v4M8.5 20.5h7M9.5 17h5v3.5h-5z" ${stroke}/>`,
  crown: '<path d="M3.5 8.5 8 12l4-7 4 7 4.5-3.5-2 10.5h-13z" fill="currentColor"/><path d="M5.5 21h13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
};

/** SVG 字符串（用于模板字符串拼接的 innerHTML） */
export function iconSvg(name, className = 'ui-icon') {
  return `<svg class="${className}" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">${PATHS[name] ?? ''}</svg>`;
}

/** SVG 元素 */
export function icon(name, className) {
  const holder = document.createElement('span');
  holder.innerHTML = iconSvg(name, className);
  return holder.firstChild;
}

/** 带图标的按钮内容：图标 + 文字 */
export function withIcon(target, name, text) {
  target.replaceChildren(icon(name), document.createTextNode(text ? ` ${text}` : ''));
  return target;
}

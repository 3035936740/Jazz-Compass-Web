// 面板子页面：一个面板里放两个工具时，用顶部的分页切换（和弦进行播放器 / 套路和弦进行速查 一样的做法）
// 每个子页面是独立的容器；面板收到的 toolbox-stop 转发给所有子页面，toolbox-query 交给能处理它的子页面并切过去
// 不从 module_kit.js 引入：它会顺带载入整份出处表（references.js），首屏用不到
const language = () => { const lang = globalThis.window?.__lang || 'zh'; return ['zh', 'ja', 'en'].includes(lang) ? lang : 'en'; };
const el = (tag, className = '') => { const node = document.createElement(tag); if (className) node.className = className; return node; };
const button = (className, text, onClick) => { const node = el('button', className); node.type = 'button'; node.textContent = text; node.addEventListener('click', onClick); return node; };

/**
 * @param {HTMLElement} panel 面板（或面板的 body）
 * @param {Array<{ id, label: {zh,ja,en}, mount(container), padded?: boolean, accepts?(q): boolean }>} pages
 * @param {{ padded?: boolean }} options padded：面板本身没有内边距时，给标签栏留出左右边距
 */
export function mountSubPages(panel, pages, { padded = false } = {}) {
  const lang = language();
  const bar = el('div', `mk-tabs sub-pages-tabs${padded ? ' is-padded' : ''}`);
  bar.setAttribute('role', 'tablist');
  const containers = pages.map((page) => {
    const box = el('div', `sub-page${page.padded ? ' is-padded' : ''}`);
    box.dataset.page = page.id;
    box.setAttribute('role', 'tabpanel');
    return box;
  });
  // 子页面的 mount 可以是异步的（按需载入模块）：记下每个子页面挂载完成的 Promise，转发查询要等它
  const mounted = new Map();
  const buttons = pages.map((page, i) => {
    const b = button('', page.label[lang] || page.label.en, () => select(page.id));
    b.setAttribute('role', 'tab');
    b.dataset.page = page.id;
    return b;
  });
  bar.append(...buttons);
  panel.append(bar, ...containers);

  function select(id) {
    const index = Math.max(0, pages.findIndex((p) => p.id === id));
    containers.forEach((box) => box.dispatchEvent(new Event('toolbox-stop')));
    pages.forEach((page, i) => {
      const on = i === index;
      buttons[i].classList.toggle('active', on);
      buttons[i].setAttribute('aria-selected', String(on));
      containers[i].hidden = !on;
    });
    // 第一次打开才挂载，省内存
    if (!mounted.has(index)) mounted.set(index, Promise.resolve(pages[index].mount(containers[index])));
    return containers[index];
  }
  panel.addEventListener('toolbox-stop', () => containers.forEach((box) => box.dispatchEvent(new Event('toolbox-stop'))));
  panel.addEventListener('toolbox-query', (event) => {
    const q = String(event.detail ?? '');
    const sub = /^@sub:([\w-]+)$/.exec(q);
    if (sub) { select(sub[1]); return; }
    const index = pages.findIndex((p) => p.accepts?.(q));
    if (index < 0) return;
    const box = select(pages[index].id);
    mounted.get(index).then(() => box.dispatchEvent(new CustomEvent('toolbox-query', { detail: q })));
  });
  select(pages[0].id);
  return { select };
}

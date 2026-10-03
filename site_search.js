// 全站搜索：Ctrl+K（或右上角按钮）打开。搜工具（名字、介绍）、乐理闯关的关卡与进阶关（标题、简介、卡片里的文字）；
// 输入的是和弦标记时，另外给出"在和弦转换 / 和弦标记查询里打开"。三种语言的文字都能搜到，结果按当前语言显示。
import { parseChordSymbol } from './chord_symbols.js?v=20261002-alt3';

const TEXT = {
  zh: { button: '搜索', placeholder: '搜索工具、乐理概念、和弦……（如：那不勒斯、Cm7b5、旋宫）', tool: '工具', level: '闯关', branch: '进阶关', side: '支线', chord: '和弦', openChord: (c) => `在和弦转换里看 ${c}`, openLib: (q) => `在套路和弦进行速查里查 ${q}`, lib: '进行', lookup: (c) => `在和弦标记查询里看 ${c}`, empty: '没有找到，换个说法试试', hint: '↑↓ 选择 · Enter 打开 · Esc 关闭' },
  ja: { button: '検索', placeholder: 'ツール・用語・コードを検索（例：ナポリ、Cm7b5、旋宮）', tool: 'ツール', level: 'チャレンジ', branch: '発展', side: '支線', chord: 'コード', openChord: (c) => `コード変換で ${c} を見る`, openLib: (q) => `定番進行の早見表で ${q} を探す`, lib: '進行', lookup: (c) => `コード表記の検索で ${c} を見る`, empty: '見つかりません。別の言い方で', hint: '↑↓ 選択 · Enter 開く · Esc 閉じる' },
  en: { button: 'Search', placeholder: 'Search tools, concepts, chords… (e.g. Neapolitan, Cm7b5, mode)', tool: 'Tool', level: 'Level', branch: 'Advanced', side: 'Side quest', chord: 'Chord', openChord: (c) => `Open ${c} in Chord Converter`, openLib: (q) => `Look up ${q} in the progression library`, lib: 'Progression', lookup: (c) => `Look up ${c} in Chord Symbols`, empty: 'Nothing found — try other words', hint: '↑↓ choose · Enter open · Esc close' },
};

/** 统一写法再比较：小写、去空格、♯♭ 换成 # b */
export const normalize = (text) => String(text ?? '').toLowerCase().replace(/♯/g, '#').replace(/♭/g, 'b').replace(/[\s·・,，、:：()（）"“”'‘’]/g, '');
const allText = (value) => (value && typeof value === 'object' ? Object.values(value).filter((v) => typeof v === 'string').join(' ') : String(value ?? ''));

/**
 * 建索引：tools = [{ id, name, intro, group }]；units 来自 learn_content.js（主关 UNITS 加支线 SIDES，支线带 parent）
 * 每条：{ kind, title, sub, href, keys: 名字（权重高）, body: 正文（权重低） }
 */
export function buildIndex({ tools = [], units = [], lang = 'zh' }) {
  const tx = (v) => (typeof v === 'string' ? v : v?.[lang] ?? v?.en ?? '');
  const t = TEXT[lang] || TEXT.zh;
  const cardText = (cards) => cards.map((card) => [card.title, card.prompt, card.explain, card.hint, ...(card.steps || []), ...(card.options || [])].map(allText).join(' ')).join(' ');
  const entries = tools.map((tool) => ({ kind: t.tool, title: tool.name, sub: tool.intro, href: `#${tool.id}`, keys: normalize(`${tool.name} ${tool.allNames || ''} ${tool.id}`), body: normalize(`${tool.intro} ${tool.group || ''}`) }));
  units.forEach((unit) => {
    entries.push({ kind: unit.parent ? t.side : t.level, title: tx(unit.title), sub: tx(unit.blurb), href: `#learn?q=${unit.id}`, keys: normalize(allText(unit.title)), body: normalize(`${allText(unit.blurb)} ${cardText(unit.cards)}`) });
    (unit.branch || []).forEach((level, k) => {
      entries.push({ kind: t.branch, title: `${tx(unit.title)} · ${tx(level.title)}`, sub: '', href: `#learn?q=${unit.id}:${k + 1}`, keys: normalize(allText(level.title)), body: normalize(cardText(level.cards)) });
    });
  });
  return entries;
}

/** 打分：名字开头 > 名字包含 > 介绍 / 正文包含；多个词时每个词都要出现 */
export function search(entries, query, limit = 12) {
  const words = String(query).trim().split(/\s+/).map(normalize).filter(Boolean);
  if (!words.length) return [];
  const scored = [];
  entries.forEach((entry) => {
    let score = 0;
    for (const word of words) {
      if (entry.keys.startsWith(word)) score += 100;
      else if (entry.keys.includes(word)) score += 60;
      else if (entry.body.includes(word)) score += 12;
      else return;
    }
    scored.push({ entry, score: score - entry.title.length * 0.05 });
  });
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.entry);
}

export function mountSiteSearch({ tools, units, lang = 'zh', anchor, onGo = (href) => { globalThis.location.hash = href; } }) {
  const t = TEXT[lang] || TEXT.zh;
  let entries = null;
  // units 可以是数组，也可以是返回 Promise 的函数（关卡数据很大：第一次打开搜索时才载入，载入后刷新结果）
  let unitList = Array.isArray(units) ? units : null;
  let loading = null;
  let refresh = null;
  const ensureUnits = () => {
    if (unitList || loading || typeof units !== 'function') return;
    loading = Promise.resolve(units()).then((list) => { unitList = list || []; entries = null; refresh?.(); }).catch(() => { unitList = []; });
  };
  const index = () => (entries ||= buildIndex({ tools: tools(), units: unitList || [], lang }));
  const doc = globalThis.document;
  const trigger = doc.createElement('button');
  trigger.type = 'button';
  trigger.className = 'share-btn site-search-btn';
  trigger.innerHTML = `<svg class="ui-icon" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 16l4.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span>${t.button}</span><kbd>Ctrl K</kbd>`;
  trigger.title = `${t.button} (Ctrl+K)`;
  anchor?.parentNode?.insertBefore(trigger, anchor);

  let layer = null;
  function close() { layer?.remove(); layer = null; refresh = null; }
  function open() {
    if (layer) return;
    ensureUnits();
    layer = doc.createElement('div');
    layer.className = 'site-search-layer';
    const box = doc.createElement('div');
    box.className = 'site-search';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', t.button);
    const input = doc.createElement('input');
    input.type = 'search';
    input.className = 'site-search-input';
    input.placeholder = t.placeholder;
    input.setAttribute('aria-label', t.button);
    const list = doc.createElement('ul');
    list.className = 'site-search-results';
    list.setAttribute('role', 'listbox');
    const foot = doc.createElement('div');
    foot.className = 'site-search-hint';
    foot.textContent = t.hint;
    box.append(input, list, foot);
    layer.appendChild(box);
    layer.addEventListener('pointerdown', (e) => { if (e.target === layer) close(); });
    doc.body.appendChild(layer);
    let results = [];
    let active = 0;
    const go = (item) => { if (!item) return; close(); onGo(item.href); };
    const paint = () => {
      list.replaceChildren();
      if (input.value.trim() && !results.length) { const li = doc.createElement('li'); li.className = 'site-search-empty'; li.textContent = t.empty; list.appendChild(li); return; }
      results.forEach((item, i) => {
        const li = doc.createElement('li');
        li.className = `site-search-item${i === active ? ' is-active' : ''}`;
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', String(i === active));
        const kind = doc.createElement('span'); kind.className = 'site-search-kind'; kind.textContent = item.kind;
        const title = doc.createElement('span'); title.className = 'site-search-title'; title.textContent = item.title;
        li.append(kind, title);
        if (item.sub) { const sub = doc.createElement('span'); sub.className = 'site-search-sub'; sub.textContent = item.sub; li.appendChild(sub); }
        li.addEventListener('pointerenter', () => { active = i; [...list.children].forEach((c, k) => c.classList.toggle('is-active', k === i)); });
        li.addEventListener('click', () => go(item));
        list.appendChild(li);
      });
    };
    const update = () => {
      const q = input.value.trim();
      results = search(index(), q);
      // 和弦标记：直接给出两个打开方式
      const chord = q && /^[A-Ga-g]/.test(q) ? parseChordSymbol(q) : null;
      if (chord) {
        const symbol = chord.canonical || q;
        results = [{ kind: t.chord, title: t.openChord(symbol), href: `#chord?q=${encodeURIComponent(q)}` }, { kind: t.chord, title: t.lookup(symbol), href: `#chordsymbols?q=${encodeURIComponent(q)}` }, ...results].slice(0, 12);
      }
      // 数字（4361、4-3-6-1）或一串罗马数字（IV iii vi I）：在套路和弦进行速查里查
      if (q && (/^[b#♭♯]?[1-7]([\s\-,]*[b#♭♯]?[1-7](m|大|dim7?)?)+$/.test(q) || /^([b#♭♯]?(VII|VI|V|IV|III|II|I|vii|vi|v|iv|iii|ii|i)[°ø+]?\S*[\s\-]+)+[b#♭♯]?(VII|VI|V|IV|III|II|I|vii|vi|v|iv|iii|ii|i)\S*$/.test(q))) {
        results = [{ kind: t.lib, title: t.openLib(q), href: `#progression?q=${encodeURIComponent(`lib:${q}`)}` }, ...results].slice(0, 12);
      }
      active = 0;
      paint();
    };
    input.addEventListener('input', update);
    refresh = () => { if (layer && input.value.trim()) update(); };
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(results.length - 1, active + 1); paint(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(0, active - 1); paint(); }
      else if (e.key === 'Enter') { e.preventDefault(); go(results[active]); }
      else if (e.key === 'Escape') { e.preventDefault(); close(); }
    });
    input.focus();
  }
  trigger.addEventListener('click', open);
  doc.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); if (layer) close(); else open(); }
  });
  return { open, close };
}

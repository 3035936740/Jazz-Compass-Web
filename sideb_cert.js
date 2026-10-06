// Side-B 毕业证书：通过 Side-B Final 发"毕业证书"，通过 Side-B EX Final 发"优秀毕业证书"（附一句：更广阔的音乐世界，自己去探索吧）。
// 证书记录（第一次通过的日期、最好成绩与评级）存在本机 localStorage；名字也只存在本机，可以不填。
// 证书可以打印或另存为 PDF（只打印证书本身，见 learn.css 的 @media print）。

const t = (zh, ja, en) => ({ zh, ja, en });
const CERT_KEY = 'jc-sideb-cert';
const NAME_KEY = 'jc-sideb-cert-name';

const TEXT = {
  title: { final: t('毕业证书', '修了証書', 'Certificate of Graduation'), 'final-ex': t('优秀毕业证书', '優秀修了証書', 'Certificate of Graduation with Distinction') },
  course: t('乐理工具箱 · Side-B（翻面课程）', 'Music Theory Toolbox・Side-B（裏面コース）', 'Music Theory Toolbox · Side-B'),
  holder: t('本证书持有人', '本証書の所持者', 'The holder of this certificate'),
  body: {
    final: t('完成 Side-B 全部六章，并通过 Side-B Final，准予毕业。', 'Side-B の全 6 章を修了し、Side-B ファイナルに合格したので、修了を認める。', 'has completed all six chapters of Side-B and passed the Side-B Final, and is hereby awarded graduation.'),
    'final-ex': t('完成 Side-B 全部六章与全部 EX 章节测试，并通过 Side-B EX Final，准予优秀毕业。', 'Side-B の全 6 章とすべての EX 章末テストを修了し、Side-B EX ファイナルに合格したので、優秀修了を認める。', 'has completed all six chapters and every EX chapter test of Side-B and passed the Side-B EX Final, and is hereby awarded graduation with distinction.'),
  },
  score: (s, g) => t(`成绩 ${s}% · 评级 ${g}`, `得点 ${s}%・評価 ${g}`, `Score ${s}% · Grade ${g}`),
  date: (d) => t(`颁发日期 ${d}`, `授与日 ${d}`, `Awarded ${d}`),
  farewell: t('更广阔的音乐世界，自己去探索吧。', 'もっと広い音楽の世界は、自分で探検しよう。', 'The wider world of music is yours to explore.'),
  name: t('写上你的名字（只存在这台设备上，可以不填）', '名前を書こう（この端末だけに保存。空欄でも OK）', 'Your name (kept on this device only; optional)'),
  print: t('打印 / 另存为 PDF', '印刷 / PDF に保存', 'Print / save as PDF'),
  seal: t('翻面', '裏面', 'SIDE B'),
};

const store = () => { try { return globalThis.localStorage || null; } catch (_) { return null; } };
const readJSON = (key, fallback) => { try { return JSON.parse(store()?.getItem(key) || 'null') ?? fallback; } catch (_) { return fallback; } };
const writeJSON = (key, value) => { try { store()?.setItem(key, JSON.stringify(value)); } catch (_) { /* 无痕模式等：不保存也能显示 */ } };

/** 证书记录：{ final?: { date, score, grade }, 'final-ex'?: {...} } */
export const loadCerts = () => readJSON(CERT_KEY, {});
/** 通过 Final / EX Final 时记一次：日期保留第一次通过的那天，成绩与评级取最好的一次 */
export function awardCert(kind, { score, grade }, today = new Date()) {
  const all = loadCerts();
  const prev = all[kind];
  const date = prev?.date || today.toISOString().slice(0, 10);
  const better = !prev || score > prev.score;
  all[kind] = { date, score: better ? score : prev.score, grade: better ? grade : prev.grade };
  writeJSON(CERT_KEY, all);
  return all[kind];
}
export const loadCertName = () => { try { return store()?.getItem(NAME_KEY) || ''; } catch (_) { return ''; } };
const saveCertName = (name) => { try { store()?.setItem(NAME_KEY, name); } catch (_) { /* 不保存也能显示 */ } };

const el = (tag, cls = '', text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
const SVG = 'http://www.w3.org/2000/svg';

/** 印章：两圈细线 + 中间的字（纯 SVG） */
function seal(label) {
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('class', 'sideb-cert-seal');
  svg.setAttribute('aria-hidden', 'true');
  [46, 39].forEach((r, i) => { const c = document.createElementNS(SVG, 'circle'); c.setAttribute('cx', '50'); c.setAttribute('cy', '50'); c.setAttribute('r', String(r)); c.setAttribute('fill', 'none'); c.setAttribute('stroke', 'currentColor'); c.setAttribute('stroke-width', i ? '1.5' : '3'); svg.appendChild(c); });
  const text = document.createElementNS(SVG, 'text');
  text.setAttribute('x', '50'); text.setAttribute('y', '57'); text.setAttribute('text-anchor', 'middle'); text.setAttribute('font-size', label.length > 3 ? '16' : '24'); text.setAttribute('font-weight', '900'); text.setAttribute('fill', 'currentColor');
  text.textContent = label;
  svg.appendChild(text);
  return svg;
}

/**
 * 证书本体。record：{ date, score, grade }；chapters：[{ code, title }]（已本地化）；lang：'zh' | 'ja' | 'en'
 * 返回一个元素：证书 + 名字输入框 + 打印按钮（+ EX 的结束语）
 */
export function certificate(kind, record, { chapters = [], lang = 'zh' } = {}) {
  const tx = (v) => v?.[lang] ?? v?.zh ?? '';
  const wrap = el('section', `sideb-cert-wrap is-${kind}`);
  const card = el('div', `sideb-cert is-${kind}`);
  card.setAttribute('role', 'img');
  const head = el('div', 'sideb-cert-head');
  head.append(el('p', 'sideb-cert-course', tx(TEXT.course)), el('h3', 'sideb-cert-title', tx(TEXT.title[kind])));
  const nameLine = el('p', 'sideb-cert-name', loadCertName() || tx(TEXT.holder));
  const body = el('p', 'sideb-cert-body', tx(TEXT.body[kind]));
  const list = el('ol', 'sideb-cert-chapters');
  chapters.forEach((c) => { const li = el('li'); li.append(el('b', '', c.code), el('span', '', c.title)); list.appendChild(li); });
  const foot = el('div', 'sideb-cert-foot');
  const facts = el('div', 'sideb-cert-facts');
  facts.append(el('p', '', tx(TEXT.score(Math.round((record?.score ?? 0) * 100), record?.grade || '—'))), el('p', '', tx(TEXT.date(record?.date || ''))));
  foot.append(facts, seal(tx(TEXT.seal)));
  card.append(head, nameLine, body, list, foot);
  card.setAttribute('aria-label', `${tx(TEXT.title[kind])} · ${nameLine.textContent}`);
  wrap.appendChild(card);
  if (kind === 'final-ex') wrap.appendChild(el('p', 'sideb-cert-farewell', tx(TEXT.farewell)));
  const tools = el('div', 'sideb-cert-tools');
  const label = el('label', 'sideb-cert-label');
  const input = el('input', 'sideb-cert-input');
  input.type = 'text'; input.maxLength = 40; input.value = loadCertName(); input.placeholder = tx(TEXT.name);
  input.setAttribute('aria-label', tx(TEXT.name));
  input.addEventListener('input', () => { const v = input.value.trim(); saveCertName(v); nameLine.textContent = v || tx(TEXT.holder); card.setAttribute('aria-label', `${tx(TEXT.title[kind])} · ${nameLine.textContent}`); });
  label.appendChild(input);
  const print = el('button', 'learn-btn ghost', tx(TEXT.print));
  print.type = 'button';
  print.addEventListener('click', () => {
    const body2 = document.body;
    card.classList.add('is-printing');
    body2.classList.add('is-printing-cert');
    const done = () => { body2.classList.remove('is-printing-cert'); card.classList.remove('is-printing'); globalThis.removeEventListener?.('afterprint', done); };
    globalThis.addEventListener?.('afterprint', done);
    try { globalThis.print?.(); } finally { setTimeout(done, 1000); }
  });
  tools.append(label, print);
  wrap.appendChild(tools);
  return wrap;
}

// ---------------- 毕业动画 ----------------
// Final：唱片转起来 → "毕业"逐字落下 → 盖章 → 彩纸 + 号角琶音（约 6 秒）。
// EX Final：金色光芒 + 唱片翻面 → "优秀毕业"逐字放大 → 三轮烟花 + 两波彩纸 → 盖章 → I–IV–V–I 号角与上行琶音 → 结束语（约 11 秒）。
// 点"收下证书"、按 Esc 或点任意处都可以跳过；减少动态效果时不放粒子，只显示静态画面。
const SHOW = {
  word: { final: t('毕业', '修了', 'GRADUATED'), 'final-ex': t('优秀毕业', '優秀修了', 'WITH DISTINCTION') },
  sub: { final: t('通过 Side-B Final', 'Side-B ファイナル合格', 'Side-B Final passed'), 'final-ex': t('通过 Side-B EX Final', 'Side-B EX ファイナル合格', 'Side-B EX Final passed') },
  grade: (g) => t(`评级 ${g}`, `評価 ${g}`, `Grade ${g}`),
  go: t('收下证书', '証書を受け取る', 'Receive the certificate'),
};
const hz = (m) => 440 * 2 ** ((m - 69) / 12);
function fanfare(kind) {
  import('./audio_engine.js?v=20261006-guide-audio1').then(({ playChord }) => {
    const at = (ms, notes, dur, first = false) => setTimeout(() => playChord(notes.map(hz), dur, { interrupt: first }), ms);
    if (kind === 'final-ex') {
      at(0, [60, 64, 67], 0.5, true); at(480, [65, 69, 72], 0.5); at(960, [67, 71, 74], 0.6);
      [72, 76, 79, 84].forEach((m, i) => at(1500 + i * 100, [m], 0.5));
      at(2000, [48, 60, 67, 72, 76, 79, 84], 2.6);
      [79, 84, 88, 91].forEach((m, i) => at(5200 + i * 90, [m], 0.45));
      at(5650, [55, 67, 72, 76, 84], 2.2);
    } else {
      [60, 64, 67, 72].forEach((m, i) => at(i * 110, [m], 0.5, i === 0));
      at(560, [48, 60, 64, 67, 72], 1.8);
      at(2600, [72, 76, 79], 1.2);
    }
  }).catch(() => {});
}
const reducedMotion = () => Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

/** 彩纸：n 片，从 delay 开始落 */
function confetti(layer, n, delay) {
  for (let i = 0; i < n; i += 1) {
    const p = el('span', `sideb-grad-confetti c${i % 5}`);
    p.style.setProperty('--x', `${Math.round(Math.random() * 100)}vw`);
    p.style.setProperty('--drift', `${Math.round((Math.random() - 0.5) * 30)}vw`);
    p.style.setProperty('--spin', `${Math.round(360 + Math.random() * 720)}deg`);
    p.style.animationDelay = `${delay + Math.random() * 900}ms`;
    p.style.animationDuration = `${2600 + Math.random() * 1800}ms`;
    layer.appendChild(p);
  }
}
/** 烟花：在 (x, y)（百分比）炸开 n 个光点 */
function firework(layer, x, y, delay, n = 18) {
  const burst = el('span', 'sideb-grad-burst');
  burst.style.left = `${x}%`; burst.style.top = `${y}%`;
  for (let i = 0; i < n; i += 1) {
    const s = el('span', `sideb-grad-spark c${i % 5}`);
    s.style.setProperty('--a', `${Math.round((360 / n) * i)}deg`);
    s.style.setProperty('--r', `${90 + Math.round(Math.random() * 60)}px`);
    s.style.animationDelay = `${delay}ms`;
    burst.appendChild(s);
  }
  layer.appendChild(burst);
}

/**
 * 全屏毕业动画。record：{ score, grade }；结束（自动或跳过）后调用 onDone
 * @returns {{ close: () => void, node: HTMLElement }}
 */
export function graduationShow(kind, record, { lang = 'zh', onDone, sound = true } = {}) {
  const tx = (v) => v?.[lang] ?? v?.zh ?? '';
  const ex = kind === 'final-ex';
  const still = reducedMotion();
  const overlay = el('div', `sideb-grad is-${kind}${still ? ' is-still' : ''}`);
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `${tx(SHOW.word[kind])} · ${tx(SHOW.sub[kind])}`);
  if (ex) overlay.appendChild(el('span', 'sideb-grad-rays'));
  const fx = el('div', 'sideb-grad-fx');
  const stage = el('div', 'sideb-grad-stage');
  const disc = el('div', 'sideb-grad-disc');
  disc.appendChild(el('span', 'sideb-grad-label', 'B'));
  const word = el('h2', 'sideb-grad-word');
  [...tx(SHOW.word[kind])].forEach((ch, i) => { const s = el('span', '', ch); s.style.setProperty('--i', String(i)); word.appendChild(s); });
  const sub = el('p', 'sideb-grad-sub', `${tx(SHOW.sub[kind])} · ${Math.round((record?.score ?? 0) * 100)}% · ${tx(SHOW.grade(record?.grade || '—'))}`);
  const stamp = seal(tx(TEXT.seal));
  stamp.classList.add('sideb-grad-seal');
  stage.append(disc, word, sub, stamp);
  if (ex) stage.appendChild(el('p', 'sideb-grad-farewell', tx(TEXT.farewell)));
  const go = el('button', 'learn-btn primary sideb-grad-go', tx(SHOW.go));
  go.type = 'button';
  stage.appendChild(go);
  overlay.append(fx, stage);
  if (!still) {
    if (ex) {
      firework(fx, 22, 30, 1900); firework(fx, 78, 26, 2400); firework(fx, 50, 18, 3000, 24);
      firework(fx, 30, 40, 5300); firework(fx, 70, 38, 5600, 24);
      confetti(fx, 70, 2000); confetti(fx, 60, 5300);
    } else confetti(fx, 45, 500);
  }
  let closed = false;
  let timer = null;
  const close = () => {
    if (closed) return;
    closed = true;
    clearTimeout(timer);
    globalThis.removeEventListener?.('keydown', onKey);
    overlay.classList.add('is-leaving');
    setTimeout(() => overlay.remove(), still ? 0 : 450);
    onDone?.();
  };
  const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Enter') close(); };
  go.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  overlay.addEventListener('click', close);
  globalThis.addEventListener?.('keydown', onKey);
  document.body.appendChild(overlay);
  go.focus?.({ preventScroll: true });
  if (sound) fanfare(kind);
  if (!still) timer = setTimeout(close, ex ? 11500 : 6500);
  return { close, node: overlay };
}

// 可打印的练习卷：把题目（学习页的选择 / 填空 / 连线题，或速查生成的题）排成纸面，后面另起一页放答案和解析、最后列出处
// 听力题（带 audio、没有谱例的）纸上做不了，跳过并在卷首注明
import { referenceById } from './references.js';

const LETTERS = 'ABCDEFGHIJ';
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const TEXT = {
  zh: { name: '姓名', date: '日期', answers: '答案与解析', skipped: (n) => `另有 ${n} 道听力题需要声音，没有列入。`, bank: '词库', sources: '出处', match: '把左右两列配对（在括号里写字母）', print: '打印 / 存为 PDF', none: '这里没有能打印的题目。' },
  ja: { name: '名前', date: '日付', answers: '解答と解説', skipped: (n) => `音が必要な聴き取り問題 ${n} 問は含めていません。`, bank: '語群', sources: '出典', match: '左右を組み合わせる（かっこに記号を書く）', print: '印刷 / PDF 保存', none: '印刷できる問題がありません。' },
  en: { name: 'Name', date: 'Date', answers: 'Answers and explanations', skipped: (n) => `${n} listening questions need sound and are left out.`, bank: 'Word bank', sources: 'Sources', match: 'Match the columns (write the letter in the brackets)', print: 'Print / save PDF', none: 'No printable questions here.' },
};

/** 固定种子的打乱：同一张卷子每次打印顺序一样，答案字母也对得上 */
function seeded(seed) {
  let s = 0; for (const ch of String(seed)) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
  return () => { s = (s * 1103515245 + 12345) >>> 0; return s / 4294967296; };
}
const shuffled = (list, rng) => { const a = list.slice(); for (let i = a.length - 1; i > 0; i -= 1) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/** 能印在纸上的题：选择、填空、连线；有声音但没有谱例的不要 */
export const printable = (card) => ['choice', 'fill', 'match'].includes(card?.type) && !(card.audio && !card.visual);

/**
 * 生成练习卷的 HTML 片段
 * @param {{ title: string, sections: Array<{ heading?: string, cards: object[] }>, lang?: string, visualSvg?: (card) => string, seed?: string }} sheet
 * @returns {{ html: string, count: number, skipped: number }}
 */
export function worksheetHTML({ title, sections, lang = 'zh', visualSvg = () => '', seed = title }) {
  const t = TEXT[lang] || TEXT.en;
  const tx = (v) => (v == null ? '' : typeof v === 'string' ? v : v[lang] ?? v.en ?? v.zh ?? '');
  const rng = seeded(seed);
  const questions = []; const answers = []; const refs = new Set();
  let number = 0; let skipped = 0;
  sections.forEach((section) => {
    const items = section.cards.filter((card) => { if (printable(card)) return true; if (card?.type && card.type !== 'guide') skipped += 1; return false; });
    if (!items.length) return;
    if (section.heading) questions.push(`<h2>${esc(section.heading)}</h2>`);
    items.forEach((card) => {
      number += 1;
      if (card.ref) refs.add(card.ref);
      const svg = card.visual ? visualSvg(card) : '';
      const figure = svg ? `<div class="ws-figure">${svg}</div>` : '';
      if (card.type === 'choice') {
        const order = shuffled(card.options.map((_, i) => i), rng);
        const letter = LETTERS[order.indexOf(card.answer)];
        questions.push(`<div class="ws-q"><p><b>${number}.</b> ${esc(tx(card.prompt))}</p>${figure}<ol class="ws-options">${order.map((i, k) => `<li><b>${LETTERS[k]}</b> ${esc(tx(card.options[i]))}</li>`).join('')}</ol></div>`);
        answers.push(`<li><b>${number}.</b> ${letter}　${esc(tx(card.options[card.answer]))}${card.explain ? `<br><span>${esc(tx(card.explain))}</span>` : ''}</li>`);
      } else if (card.type === 'fill') {
        let blank = 0;
        const prompt = esc(tx(card.prompt)).split('___').map((part, i, parts) => (i < parts.length - 1 ? `${part}<span class="ws-blank">（${(blank += 1)}）</span>` : part)).join('');
        const bank = shuffled(card.bank || [], rng).map((b) => esc(tx(b.label)));
        const filled = card.answer.map((id, i) => `（${i + 1}）${esc(tx(card.bank?.find((b) => b.id === id)?.label ?? id))}`).join('　');
        questions.push(`<div class="ws-q"><p><b>${number}.</b> ${prompt}</p>${figure}${bank.length ? `<p class="ws-bank">${t.bank}：${bank.join(' / ')}</p>` : ''}</div>`);
        answers.push(`<li><b>${number}.</b> ${filled}${card.explain ? `<br><span>${esc(tx(card.explain))}</span>` : ''}</li>`);
      } else {
        const rights = shuffled(card.pairs.map((_, i) => i), rng);
        const rows = card.pairs.map(([a], i) => `<tr><td>${i + 1}. ${esc(tx(a))}　（　）</td><td><b>${LETTERS[i].toLowerCase()}</b>. ${esc(tx(card.pairs[rights[i]][1]))}</td></tr>`).join('');
        const key = card.pairs.map((_, i) => `${i + 1}–${LETTERS[rights.indexOf(i)].toLowerCase()}`).join('　');
        questions.push(`<div class="ws-q"><p><b>${number}.</b> ${esc(tx(card.prompt) || t.match)}</p>${figure}<table class="ws-match">${rows}</table></div>`);
        answers.push(`<li><b>${number}.</b> ${key}${card.explain ? `<br><span>${esc(tx(card.explain))}</span>` : ''}</li>`);
      }
    });
  });
  if (!number) return { html: `<h1>${esc(title)}</h1><p>${t.none}</p>`, count: 0, skipped };
  const sources = [...refs].map(referenceById).filter(Boolean).map((r) => `<li>${esc(r.title)}${r.author ? ` — ${esc(r.author)}` : ''}${r.url ? ` · ${esc(r.url)}` : ''}${r.license ? ` · ${esc(r.license)}` : ''}</li>`);
  const html = `<header class="ws-head"><h1>${esc(title)}</h1><p>${t.name}：________________　${t.date}：____________</p>${skipped ? `<p class="ws-note">${t.skipped(skipped)}</p>` : ''}</header>
${questions.join('\n')}
<section class="ws-answers"><h1>${esc(title)} · ${t.answers}</h1><ol class="ws-key">${answers.join('')}</ol>${sources.length ? `<h2>${t.sources}</h2><ol class="ws-sources">${sources.join('')}</ol>` : ''}</section>`;
  return { html, count: number, skipped };
}

const STYLE = `body{margin:0;padding:14mm;background:#fff;color:#111;font:14px/1.55 system-ui,"PingFang SC","Hiragino Sans","Noto Sans CJK SC",sans-serif}
h1{font-size:20px;margin:0 0 6px}h2{font-size:16px;margin:18px 0 6px;border-bottom:1px solid #999}
.ws-head{margin-bottom:14px}.ws-note{color:#555;font-size:12px}.ws-q{break-inside:avoid;margin:0 0 14px}.ws-q p{margin:0 0 6px}
.ws-options{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 18px}
.ws-blank{display:inline-block;min-width:4.5em;border-bottom:1px solid #111;text-align:center}.ws-bank{font-size:13px;color:#333}
.ws-match{border-collapse:collapse}.ws-match td{padding:3px 18px 3px 0;vertical-align:top}
.ws-figure svg{max-width:100%;height:auto;max-height:160px}.ws-answers{break-before:page}.ws-key li{margin-bottom:6px}.ws-key span,.ws-sources{color:#444;font-size:12px}
.lv-key-label,.lv-label{font-size:11px}
.ws-table{width:100%;border-collapse:collapse;font-size:11.5px}.ws-table th,.ws-table td{border:1px solid #bbb;padding:4px 6px;vertical-align:top;text-align:left}.ws-table th{background:#f2f2f2}.ws-table tr{break-inside:avoid}
@page{size:A4;margin:10mm}
@media print{.ws-table{font-size:10.5px}}`;

/** 新开一页打印（和五线谱的"打印 / 存为 PDF"一样：浏览器打印对话框里可以另存为 PDF） */
export function openWorksheet(title, html) {
  const win = globalThis.open?.('', '_blank');
  if (!win) return false;
  const base = globalThis.location.href.replace(/[#?].*$/, '').replace(/[^/]*$/, '');
  win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title><link rel="stylesheet" href="${base}app.css"><link rel="stylesheet" href="${base}learn.css"><style>${STYLE}</style></head><body>${html}<script>window.onload=()=>setTimeout(()=>window.print(),300)<\/script></body></html>`);
  win.document.close();
  return true;
}

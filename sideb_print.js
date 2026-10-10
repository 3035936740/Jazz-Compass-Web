// Side-B 的打印练习卷：把一关（普通关 / 扩展关）或一场考试的题排成纸面，后面另起一页放答案、解析和出处（排版用 worksheet.js）。
// 能印的：选择题（含讲解里的小练习、所有变体）、填空题、推导题（几步写答案）；生成器题按固定种子出几道；
// 听辨题（只有声音没有谱例）、打拍题、实操纸上做不了，跳过并在卷首注明听力题的数量。
import { worksheetHTML, openWorksheet } from './worksheet.js?v=20261004-y1';
import { materialize, seedOf } from './sideb_engine.js?v=20261010-talk1';

const t = (zh, ja, en) => ({ zh, ja, en });
const HEAD = {
  practice: t('讲解里的小练习', '解説のミニ練習', 'Practice from the lessons'),
  challenge: t('挑战', 'チャレンジ', 'Challenge'),
  pool: t('加练', '追加練習', 'Extra practice'),
  exam: t('试题', '問題', 'Questions'),
  labs: t('实操（在工具里完成，不在纸上）', '実習（ツールで行う。紙には載せない）', 'Labs (done in the tools, not on paper)'),
};

/** 一个节点 → 0 到多张能印的题卡（worksheet.js 的格式） */
function toCards(node) {
  const base = { ref: node.ref, explain: node.explain || node.insight?.text, visual: node.visual };
  const audioOnly = Boolean((node.play || node.audio) && !node.visual);
  if ((node.type === 'choice' || node.type === 'discover' || node.type === 'listen') && Array.isArray(node.options) && Number.isInteger(node.answer)) {
    return audioOnly ? [{ type: 'choice', audio: true }] : [{ ...base, type: 'choice', prompt: node.prompt, options: node.options, answer: node.answer }];
  }
  if (node.type === 'fill' && node.bank && node.answer) return [{ ...base, type: 'fill', prompt: node.prompt, bank: node.bank, answer: node.answer, ...(audioOnly ? { audio: true } : {}) }];
  if (node.type === 'derive' && node.steps?.length) {
    return [{ ...base, type: 'write', prompt: node.prompt, steps: node.steps.map((s) => ({ label: s.inputHint ? { zh: `${s.label.zh ?? s.label} ${s.inputHint.zh}`, ja: `${s.label.ja ?? s.label} ${s.inputHint.ja}`, en: `${s.label.en ?? s.label} ${s.inputHint.en}` } : s.label, answer: s.answerText ?? s.answer })) }];
  }
  return node.type === 'listen' ? [{ type: 'choice', audio: true }] : [];
}
/** 一个节点的所有变体都印出来（纸上多练几道）；生成器题按固定种子出 count 道（至少 2 道） */
function expand(node, seed) {
  if (node.type === 'gen') return materialize([{ ...node, count: Math.max(2, node.count ?? 1) }], { seed }).flatMap(toCards);
  if (node.variants?.length) return node.variants.flatMap((v, i) => toCards({ ...node, ...v, id: `${node.id}~${i}`, variants: undefined }));
  return toCards(node);
}

/**
 * 关卡或考试的练习卷 HTML
 * @param level 关卡对象（lookupLevel 的结果，含 sections / pool；考试只有 challenge 与 lab）
 * @param {{ lang?: string, title: string, visualSvg?: (card) => string, labTitle?: (id) => string }} options
 */
export function sidebWorksheet(level, { lang = 'zh', title, visualSvg = () => '', labTitle = (id) => id }) {
  const tx = (v) => (v == null ? '' : typeof v === 'string' ? v : v[lang] ?? v.en ?? v.zh ?? '');
  const seed = seedOf(level.id);
  const sec = level.sections || {};
  const sections = level.exam
    // 考试：和游玩时一样，每题取一个变体（题数一致）
    ? [{ heading: tx(HEAD.exam), cards: materialize(sec.challenge || [], { seed }).flatMap(toCards) }]
    : [
      { heading: tx(HEAD.practice), cards: [...(sec.discover || []), ...(sec.explain || [])].filter((n) => n.practice || n.type === 'discover').flatMap((n) => expand(n, seed)) },
      { heading: tx(HEAD.challenge), cards: (sec.challenge || []).flatMap((n) => expand(n, seed)) },
      { heading: tx(HEAD.pool), cards: (level.pool || []).flatMap((n) => expand(n, seed + 17)) },
    ];
  const result = worksheetHTML({ title, sections, lang, visualSvg, seed: level.id });
  const labs = (sec.lab || []).map((n) => labTitle(n.lab)).filter(Boolean);
  if (labs.length && result.count) result.html = result.html.replace('<section class="ws-answers">', `<h2>${tx(HEAD.labs)}</h2><ul>${labs.map((l) => `<li>${String(l).replace(/</g, '&lt;')}</li>`).join('')}</ul>\n<section class="ws-answers">`);
  return result;
}
export { openWorksheet };

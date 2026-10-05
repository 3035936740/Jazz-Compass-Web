// 工具里的错题进错题本：听写、四部和声检查、套路听辨答错时，生成一道选择题放进学习页的复习（和关卡里答错的题一样按间隔复习）
// 卡片格式同 learn_engine.js：{ type: 'choice', prompt, options, answer: 0, audio?, visual?, explain?, tool: { feature, q } }
import { loadReview, saveReview, recordMistake } from './learn_engine.js?v=20261006-clarity1';

/**
 * @param {object} card 选择题（正确项放第一个，界面会打乱）
 * @param {string} source 来自哪个工具（dictation / satb / library-quiz），写进 levelKey 方便以后区分
 * @returns {boolean} 是否写入
 */
export function recordToolMistake(card, source) {
  if (!card?.options?.length || card.options.length < 2) return false;
  // 同一题的选项不能重复（例如答错的答案碰巧和干扰项一样）
  const seen = new Set();
  const options = card.options.filter((o) => { const k = JSON.stringify(o); if (seen.has(k)) return false; seen.add(k); return true; });
  if (options.length < 2) return false;
  saveReview(recordMistake(loadReview(), { ...card, options, answer: 0 }, `tool:${source}`));
  (globalThis.window || globalThis).dispatchEvent?.(new Event('jc-review-changed'));
  return true;
}

/** 三种语言的文字 */
export const tri = (zh, ja, en) => ({ zh, ja, en });

// Side-B 实操的任务条：工具收到 @lab:<id>（或 @lab:<id>@chapter、@lab:<id>@ex）时挂在工具顶部。
// 显示任务、评分单（满分 100：每项得分、每条扣分写明位置，做到的地方也说出来）、"检查一下"、"提交给课程"、"回到课程"。
// 评分交给 lab_checks.js；三种模式（sideb_engine.LAB_MODES）：
//   level   普通关：评分 + 诊断 + 修改——随时检查、扣分附改法，提交取最好的一次
//   chapter 章节测试：最多检查 3 次，只写哪里扣分，不给改法
//   ex      B-EX：评分 + 少提示 + 独立完成——不能检查，只能提交一次，提交后才看到完整评分单
// 结果写进 localStorage（sideb_engine.saveLabResult），再回到课程 #learn?q=@lab-return:<id>。
import { LABS, parseLabRef } from './sideb_labs.js?v=20261004-w5';
import { evaluateLab } from './lab_checks.js?v=20261004-w1';
import { saveLabResult, loadLabResults, LAB_MODES, LAB_LINES, breakthroughFor, loadBreakthroughs, saveBreakthrough } from './sideb_engine.js?v=20261004-w5';
import { ERRORS } from './sideb_errors.js?v=20261004-w5';
import { celebrate as flashBreakthrough } from './sideb_fx.js?v=20261004-f1';

const TEXT = {
  zh: {
    kicker: 'Side-B 实操', modes: { level: '练习', chapter: '章节测试', ex: 'B-EX · 独立完成' },
    check: '检查一下', checksLeft: (n) => `检查一下（还剩 ${n} 次）`, submit: '提交并回到 Side-B', submitOnce: '提交（只有一次）', back: '回到 Side-B 关卡（不提交）',
    score: '得分', line: (p) => `过关线 ${p}%，没有硬性错误`, hard: '这些问题会让实操不通过：', passed: '已经过关，可以提交；也可以接着改，拿更高的分。', below: '还没到过关线，看看下面扣分最多的地方。',
    hardHint: '先修好上面的硬性问题，其他扣分都只是小错。', submitted: '已提交，正在回到课程…', missing: '找不到这个实操任务。',
    exBrief: '这一关独立完成：没有检查按钮，提交后才看到评分单。', confirmEx: '只能提交一次，确定提交吗？', nice: '做到了',
    previous: (s) => `上次提交 ${s}/100，内容还在，接着改就好。`,
  },
  ja: {
    kicker: 'Side-B 実習', modes: { level: '練習', chapter: '章末テスト', ex: 'B-EX・自力で' },
    check: 'チェック', checksLeft: (n) => `チェック（残り ${n} 回）`, submit: '提出して Side-B へ戻る', submitOnce: '提出（1 回のみ）', back: 'Side-B のステージへ戻る（提出しない）',
    score: '得点', line: (p) => `合格ライン ${p}%、致命的な誤りなし`, hard: 'この問題があると実習は不合格：', passed: '合格ライン到達。提出できます。さらに直して点を上げても OK。', below: 'まだ合格ラインに届いていません。減点の大きい所から見てみよう。',
    hardHint: 'まず上の致命的な問題を直そう。ほかの減点は小さなミス。', submitted: '提出しました。コースへ戻ります…', missing: 'この実習が見つかりません。',
    exBrief: 'この課題は自力で：チェックはなく、提出後に採点表が出ます。', confirmEx: '提出は 1 回だけ。提出しますか？', nice: 'できた',
    previous: (s) => `前回の提出 ${s}/100。内容は残っているので続きから直そう。`,
  },
  en: {
    kicker: 'Side-B lab', modes: { level: 'Practice', chapter: 'Chapter test', ex: 'B-EX · on your own' },
    check: 'Check', checksLeft: (n) => `Check (${n} left)`, submit: 'Submit and return to Side-B', submitOnce: 'Submit (one try)', back: 'Back to the Side-B level (no submit)',
    score: 'Score', line: (p) => `Pass line ${p}%, no fatal errors`, hard: 'These make the lab fail:', passed: 'Over the line — ready to submit, or keep polishing for a higher score.', below: 'Not over the line yet — start with the biggest deductions below.',
    hardHint: 'Fix the fatal problems above first; everything else is a small deduction.', submitted: 'Submitted — returning to the course…', missing: 'Lab not found.',
    exBrief: 'On your own: no checks; the score sheet appears after you submit.', confirmEx: 'You can submit only once. Submit now?', nice: 'Nailed',
    previous: (s) => `Last submission ${s}/100 — your work is still here, keep improving it.`,
  },
};
const lang = () => { const l = globalThis.window?.__lang || 'zh'; return ['zh', 'ja', 'en'].includes(l) ? l : 'en'; };
const tx = (v) => (v == null ? '' : typeof v === 'string' ? v : v[lang()] ?? v.en ?? '');
const el = (tag, cls = '', text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
const btn = (cls, text, on) => { const b = el('button', cls, text); b.type = 'button'; b.addEventListener('click', on); return b; };
const fmt = (x) => String(Math.round(x * 10) / 10);

/** 第一次打开这个实操（还没有提交过）——工具据此决定要不要清空成初始内容 */
export const isFirstVisit = (ref) => !loadLabResults()[parseLabRef(ref).id];

/**
 * @param {HTMLElement} host 工具的容器（任务条插在最前面）
 * @param {string} ref 'vl-ii6-V7-I' 或 'vl-ii6-V7-I@ex'
 * @param {{ getSubmission: () => object, onReturn?: (href) => void, confirm?: (msg) => boolean }} options getSubmission 读工具当前内容
 * @returns {{ spec, mode, remove, run }|null}
 */
export function mountLabBanner(host, ref, { getSubmission, onReturn = (href) => { globalThis.location.hash = href; }, confirm = (msg) => globalThis.confirm?.(msg) ?? true }) {
  const t = TEXT[lang()];
  const { id: labId, mode } = parseLabRef(ref);
  const rules = LAB_MODES[mode];
  const line = LAB_LINES[mode] ?? LAB_LINES.level;
  host.querySelector(':scope > .lab-banner')?.remove();
  const spec = LABS[labId];
  const bar = el('section', 'lab-banner');
  bar.setAttribute('role', 'region');
  if (!spec) { bar.append(el('p', 'lab-banner-kicker', t.kicker), el('p', '', t.missing)); host.prepend(bar); return null; }
  bar.dataset.lab = labId;
  bar.dataset.mode = mode;
  bar.setAttribute('aria-label', tx(spec.title));
  const head = el('div', 'lab-banner-head');
  head.append(el('span', 'lab-banner-kicker', `${t.kicker} · ${t.modes[mode]}`), el('strong', 'lab-banner-title', tx(spec.title)));
  const brief = el('p', 'lab-banner-brief', tx(spec.brief));
  const meta = el('p', 'lab-banner-line', mode === 'ex' ? `${t.exBrief} ${t.line(Math.round(line * 100))}` : t.line(Math.round(line * 100)));
  const previous = loadLabResults()[labId];
  const prevNote = previous?.last && mode === 'level' ? el('p', 'lab-banner-previous', t.previous(Math.round(previous.last.score))) : null;

  let answer = null;
  const fields = el('div', 'lab-banner-fields');
  if (spec.answer) {
    const label = el('label', 'lab-answer');
    answer = el('input'); answer.type = 'number'; answer.step = 'any';
    label.append(el('span', '', tx(spec.answer.label)), answer);
    fields.appendChild(label);
  }
  const sheet = el('div', 'lab-sheet');
  sheet.setAttribute('aria-live', 'polite');
  const status = el('p', 'lab-banner-status');
  status.setAttribute('aria-live', 'polite');
  const submission = () => ({ ...getSubmission(), ...(answer ? { answer: answer.value === '' ? null : Number(answer.value) } : {}) });

  /** 评分单：总分条、硬性问题、每项得分与扣分（按模式决定写不写位置、改法） */
  function paint(result, { full = rules.where } = {}) {
    sheet.replaceChildren();
    const total = el('div', 'lab-score');
    const meter = el('div', 'lab-score-bar');
    const fillBar = el('span', 'lab-score-fill');
    fillBar.style.width = `${Math.max(0, Math.min(100, result.score))}%`;
    const mark = el('span', 'lab-score-mark');
    mark.style.left = `${line * 100}%`;
    meter.append(fillBar, mark);
    total.append(el('span', 'lab-score-label', t.score), el('strong', 'lab-score-num', `${result.score}/100`), meter);
    sheet.appendChild(total);
    if (result.hardFail.length) {
      const box = el('div', 'lab-hard');
      box.append(el('p', 'lab-hard-title', t.hard));
      const ul = el('ul');
      result.hardFail.forEach((h) => ul.appendChild(el('li', '', tx(h.text))));
      box.append(ul, el('p', 'lab-hard-hint', t.hardHint));
      sheet.appendChild(box);
    }
    const list = el('ul', 'lab-items');
    result.items.forEach((i) => {
      const li = el('li', `lab-item ${i.ok ? 'is-ok' : i.points > 0 ? 'is-partial' : 'is-fail'}`);
      li.dataset.item = i.id;
      const row = el('div', 'lab-item-row');
      row.append(el('span', 'lab-item-label', tx(i.label)), el('span', 'lab-item-points', `${fmt(i.points)}/${fmt(i.max)}`));
      li.appendChild(row);
      if (full) {
        const seen = new Set();
        i.deductions.forEach((d) => {
          const p = el('p', 'lab-deduction');
          p.append(el('span', 'lab-deduction-points', d.points > 0 ? `−${fmt(d.points)}` : '·'), el('span', '', ` ${tx(d.text)}`));
          li.appendChild(p);
          if (rules.advice && d.error && ERRORS[d.error] && !seen.has(d.error)) { seen.add(d.error); li.appendChild(el('p', 'lab-advice', tx(ERRORS[d.error].advice))); }
        });
        (i.info || []).forEach((x) => li.appendChild(el('p', 'lab-good', `${t.nice}：${tx(x)}`)));
      }
      list.appendChild(li);
    });
    sheet.appendChild(list);
    const ok = !result.hardFail.length && result.score >= line * 100;
    status.textContent = ok ? t.passed : t.below;
    status.classList.toggle('is-ok', ok);
  }
  /** 胜利瞬间：第一次真的做到时，立刻放视觉和声音反馈（同一个突破只庆祝一次） */
  function celebrate(result) {
    const b = breakthroughFor({ type: 'lab', breakthrough: spec.breakthrough }, result, loadBreakthroughs());
    if (!b) return;
    saveBreakthrough(b.id);
    flashBreakthrough(bar, b.text);
  }
  let checksUsed = 0;
  let submissions = 0;
  const run = () => {
    const result = evaluateLab(spec, submission());
    paint(result);
    celebrate(result);
    return result;
  };
  const actions = el('div', 'lab-banner-actions');
  const checkBtn = rules.checks > 0 ? btn('btn btn-secondary btn-sm lab-check', Number.isFinite(rules.checks) ? t.checksLeft(rules.checks) : t.check, () => {
    if (checksUsed >= rules.checks) return;
    checksUsed += 1;
    run();
    if (Number.isFinite(rules.checks)) {
      checkBtn.textContent = t.checksLeft(rules.checks - checksUsed);
      checkBtn.disabled = checksUsed >= rules.checks;
    }
  }) : null;
  const submitBtn = btn('btn btn-primary btn-sm lab-submit', rules.submissions === 1 ? t.submitOnce : t.submit, () => {
    if (submissions >= rules.submissions) return;
    if (rules.submissions === 1 && !confirm(t.confirmEx)) return;
    submissions += 1;
    const result = evaluateLab(spec, submission());
    paint(result, { full: true });
    celebrate(result);
    saveLabResult(labId, result);
    status.textContent = t.submitted;
    if (rules.submissions === 1) { submitBtn.disabled = true; if (checkBtn) checkBtn.disabled = true; }
    onReturn(`#learn?q=${encodeURIComponent(`@lab-return:${labId}`)}`);
  });
  actions.append(...[checkBtn, submitBtn, btn('btn btn-ghost btn-sm lab-back', t.back, () => onReturn('#learn?q=%40sideb-resume'))].filter(Boolean));
  bar.append(head, brief, meta, ...(prevNote ? [prevNote] : []), fields, actions, status, sheet);
  host.prepend(bar);
  return { spec, mode, remove: () => bar.remove(), run };
}

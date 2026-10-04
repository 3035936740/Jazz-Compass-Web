// Side-B（翻面课程）界面：翻面地图、关卡卡片、关卡播放器（发现 / 解释 / 实验 / 挑战 / 实操）、结算页、补弱挑战。
// 规则在 sideb_engine.js，评分在 lab_checks.js，内容在 sideb_content.js / sideb_units_*.js；设计见 SIDE_B_DESIGN.md。
// 原则：音乐优先于分数，发现优先于背诵，成就感优先于惩罚感——失败只补弱项，每关有一个"发现"（insight）和胜利瞬间。
import { B_CHAPTERS, B_LEVELS, levelById, lookupLevel, chapterLevels, isPlayable, extLevelById, hasExtLevel } from './sideb_content.js?v=20261005-p3';
import {
  bKey, levelSections, levelForAttempt, createBSession, completeSection, recordAnswer, gradeNode, summarizeB, retrySession,
  buildRecovery, startRecovery, recordRecovery, recoveryResult, completeBLevel, chapterAverage, overallAverage, sidebUnlocked,
  mergeMastery, overallMastery, loadMastery, saveMastery, loadBResume, saveBResume, clearBResume, bestLabResults, saveLabResult, LAB_LINES,
  breakthroughFor, loadBreakthroughs, saveBreakthrough, estimateMinutes, PASS_LINE, isAssessed,
  extKey, gradeOf, chapterAverageWithExt, chapterTestOpen, chapterExOpen, finalOpen, finalExOpen, CHAPTER_EX_OPEN,
} from './sideb_engine.js?v=20261005-q1';
import { SKILLS, SKILL_NAMES, recommend } from './sideb_errors.js?v=20261004-z9';
import { LABS, labHref, labResultKey } from './sideb_labs.js?v=20261004-x1';
import { loadProgress, saveProgress, isDone } from './learn_engine.js?v=20261005-q1';
import { renderVisual } from './learn_visuals.js?v=20261004-m5';
import { satbStaff, rhythmGrid, playAudio, satbToy, polyToy, tapPad, spellToy, meterToy, intervalToy, scaleToy, textureToy, chordToy, keyChordsToy, progressionToy, plrToy, keyRelToy, transposeToy, fretToy, nctToy, speciesToy, canonToy, swingToy, bluesToy, chordScaleToy, guideToy, negativeToy, xuangongToy, worldToy, harmonicsToy, temperToy, pcToy, collectionToy, setToy, matrixToy, jiToy } from './sideb_toys.js?v=20261005-p4';
import { celebrate } from './sideb_fx.js?v=20261004-f1';
import { sidebWorksheet, openWorksheet } from './sideb_print.js?v=20261005-q1';
import { certificate, awardCert, loadCerts, graduationShow } from './sideb_cert.js?v=20261004-y1';
import { referenceById } from './references.js';

const TEXT = {
  zh: {
    examT: '章节测试', examTX: 'EX 章节测试', examFIN: 'Side-B Final', examFINX: 'Side-B EX Final',
    ruleT: '本章普通关全部通过后开放（可选，不挡下一章；不含扩展关）', ruleTX: (p) => `本章平均（含扩展关）≥ ${Math.round(CHAPTER_EX_OPEN * 100)}% 开放（现在 ${p}%）`,
    ruleFIN: (d, n) => `所有章节测试都通过（≥ 60%）才开放（${d}/${n}）`, ruleFINX: (d, n) => `所有章节测试和 EX 章节测试都通过才开放（${d}/${n}）`,
    examPass: (p) => `过关线 ${p}%`, examBest: (p) => `最好 ${p}%`, examDone: '已通过', examGo: '开始考试', examMix: (m, labs) => `B 面普通关 ${m.main} 道 · B 面扩展关 ${m.ext} 道 · A 面 ${m.a} 道，打乱混在一起${labs ? ` · 最后 ${labs} 个实操` : ''}；每次开考重新抽题`, printSheet: '打印练习卷（含答案）', certView: (k) => (k === 'final-ex' ? '查看优秀毕业证书' : '查看毕业证书'), examLockedNote: '还没开放', examRetry: '换一套题再考', examNoContent: '这一章还没有可以出的题',
    ext: '扩展关', extDesc: (m) => `把对应 A 面关卡（含挂在上面的支线关卡）的进阶关和综合测验重新、更细地讲一遍：节奏和普通关一样（发现 → 讲解 → 实验 → 挑战），讲解更长 · 约 ${m} 分钟`, extLocked: '通过本关后解锁扩展关', extGo: '开始扩展关', extBest: (g) => `扩展关 ${g}`, grade: (g) => `评级 ${g}`,
    title: 'Side-B', subtitle: 'Deep Mode · 原来好玩的东西还能这么深', back: '翻回 A 面', resume: (c, s) => `继续 ${c} · ${s}`,
    cleared: (n, m) => `已通关 ${n} / ${m}`, average: (p) => `平均 ${p}%`, mastery: '累计能力', noMastery: '还没有数据',
    chapterAvg: (p) => `本章平均 ${p}%`, soon: '制作中', locked: '先通关上一关', best: (p) => `最好 ${p}%`,
    minutes: (n) => `约 ${n} 分钟`, aLinks: '对应 A 面', tools: '相关工具', toolGo: (n) => `去工具：${n}`, toolPlay: (n) => `打开「${n}」接着玩`, toolLook: (n) => `打开「${n}」看看`, start: '开始', cont: '继续上次', fromChallenge: '直接去挑战（讲解已看过）', rewatch: '从头再看一遍', labTag: '含实操', coreTag: '核心关',
    sections: { discover: '发现', explain: '解释', experiment: '实验', challenge: '挑战', lab: '实操', recovery: '补弱' },
    exit: '回到地图', next: '继续', check: '确定', retry: '再试一次', correct: '答对了', wrong: '还差一点', answerWas: (a) => `答案：${a}`, practice: '小练习 · 不计分',
    insight: ['发现', '关键在这里', '换个角度', '听出来了', '这就是原因', '小结', '记一笔', '背后的道理', '你注意到了'], prev: '上一步', nextStep: '下一步', play: '播放', stepOf: (i, n) => `${i} / ${n}`,
    labOpen: '打开工具开始', labAgain: '回到工具接着改', labBest: (s) => `目前最好 ${s}/100`, labNone: '还没有提交', labLine: (p) => `过关线 ${p}%，没有硬性错误`, labDone: '实操完成，看结算',
    clear: 'CLEAR', notYet: '还差一点', score: '整关分', challenge: '挑战', lab: '实操',
    skillsTitle: '这一关的能力', masteryTitle: 'Side-B 累计', breakthroughs: '这一关的突破', errorsTitle: '可以再练练', go: '去看看',
    nextLevel: (s) => `下一关 · ${s}`, retryStars: '再挑战提高评级（换新题）', backBase: (s) => `回到 ${s}`, backMap: '回到地图', reviseLab: '回到工具接着改实操', recoveryBtn: (n) => `补弱挑战（${n} 题）`,
    weakLine: (s) => `弱项：${s}。讲解、实验和实操都保留，只补这一块。`, labLineFail: (p) => `实操还没到 ${p}%：回到工具接着改，之前写的内容和评分单都还在。`,
    recoveryTitle: '补弱挑战', recoveryPassed: '补弱通过，这一关 Clear！', recoveryFailed: '还差一点。再来一组新题？', again: '再来一组新题', recoveredTag: '补弱通过',
    passLine: (p) => `过关线 ${p}%`, firstClear: '第一次通关', chapters: 'Side-B 章节书签', goal: 'Final', contents: '目录',
  },
  ja: {
    examT: '章末テスト', examTX: 'EX 章末テスト', examFIN: 'Side-B ファイナル', examFINX: 'Side-B EX ファイナル',
    ruleT: '章の通常ステージをすべてクリアすると開放（任意。次の章は止めない。拡張ステージは含まない）', ruleTX: (p) => `章平均（拡張ステージを含む）${Math.round(CHAPTER_EX_OPEN * 100)}% 以上で開放（今 ${p}%）`,
    ruleFIN: (d, n) => `すべての章末テストに合格（60% 以上）で開放（${d}/${n}）`, ruleFINX: (d, n) => `すべての章末テストと EX 章末テストに合格で開放（${d}/${n}）`,
    examPass: (p) => `合格ライン ${p}%`, examBest: (p) => `最高 ${p}%`, examDone: '合格済み', examGo: 'テストを始める', examMix: (m, labs) => `B 面通常 ${m.main} 問・B 面拡張 ${m.ext} 問・A 面 ${m.a} 問をシャッフル${labs ? `・最後に実習 ${labs} つ` : ''}。受けるたびに出題し直し`, printSheet: '練習プリントを印刷（解答つき）', certView: (k) => (k === 'final-ex' ? '優秀修了証書を見る' : '修了証書を見る'), examLockedNote: 'まだ開放されていない', examRetry: '別の問題で再挑戦', examNoContent: 'この章にはまだ出題できる問題がない',
    ext: '拡張ステージ', extDesc: (m) => `対応する A 面ステージ（ぶら下がる支線ステージも含む）の発展ステージと総合テストを、もう一度もっと詳しく：流れは通常ステージと同じ（発見 → 解説 → 実験 → チャレンジ）、解説が長め・約 ${m} 分`, extLocked: 'このステージをクリアすると拡張ステージが開放', extGo: '拡張ステージを始める', extBest: (g) => `拡張 ${g}`, grade: (g) => `評価 ${g}`,
    title: 'Side-B', subtitle: 'Deep Mode · 楽しいものは、こんなに深い', back: 'A 面へ戻る', resume: (c, s) => `続き ${c} · ${s}`,
    cleared: (n, m) => `クリア ${n} / ${m}`, average: (p) => `平均 ${p}%`, mastery: '累計の力', noMastery: 'まだデータなし',
    chapterAvg: (p) => `章平均 ${p}%`, soon: '制作中', locked: '前のステージをクリアしよう', best: (p) => `ベスト ${p}%`,
    minutes: (n) => `約 ${n} 分`, aLinks: 'A 面の対応', tools: '関連ツール', toolGo: (n) => `ツールへ：${n}`, toolPlay: (n) => `「${n}」を開いて続ける`, toolLook: (n) => `「${n}」を開いてみる`, start: 'はじめる', cont: '続きから', fromChallenge: 'チャレンジへ（解説は見た）', rewatch: '最初から見る', labTag: '実習あり', coreTag: '重点',
    sections: { discover: '発見', explain: '解説', experiment: '実験', challenge: 'チャレンジ', lab: '実習', recovery: '補強' },
    exit: 'マップへ', next: '次へ', check: '決定', retry: 'もう一度', correct: '正解', wrong: 'あと少し', answerWas: (a) => `答え：${a}`, practice: 'ミニ練習・採点なし',
    insight: ['発見', 'ここがポイント', '見方を変えると', '聴き取れた', 'これが理由', 'まとめ', 'メモ', 'しくみ', '気づいたこと'], prev: '前へ', nextStep: '次へ', play: '再生', stepOf: (i, n) => `${i} / ${n}`,
    labOpen: 'ツールを開いて始める', labAgain: 'ツールに戻って直す', labBest: (s) => `現在のベスト ${s}/100`, labNone: 'まだ提出なし', labLine: (p) => `合格ライン ${p}%・致命的な誤りなし`, labDone: '実習完了、結果へ',
    clear: 'CLEAR', notYet: 'あと少し', score: 'ステージ得点', challenge: 'チャレンジ', lab: '実習',
    skillsTitle: 'このステージの力', masteryTitle: 'Side-B 累計', breakthroughs: 'このステージのブレイクスルー', errorsTitle: 'もう少し練習', go: '見てみる',
    nextLevel: (s) => `次のステージ · ${s}`, retryStars: '評価を上げに再挑戦（新しい問題）', backBase: (s) => `${s} に戻る`, backMap: 'マップへ', reviseLab: 'ツールに戻って実習を直す', recoveryBtn: (n) => `補強チャレンジ（${n} 問）`,
    weakLine: (s) => `弱点：${s}。解説・実験・実習はそのまま、この部分だけ補強。`, labLineFail: (p) => `実習がまだ ${p}% に届かない：ツールに戻って続きから。書いた内容と採点表は残っている。`,
    recoveryTitle: '補強チャレンジ', recoveryPassed: '補強クリア、このステージは CLEAR！', recoveryFailed: 'あと少し。新しい問題でもう一度？', again: '新しい問題で', recoveredTag: '補強クリア',
    passLine: (p) => `合格ライン ${p}%`, firstClear: '初クリア', chapters: 'Side-B の章のしおり', goal: 'Final', contents: '目次',
  },
  en: {
    examT: 'Chapter test', examTX: 'EX chapter test', examFIN: 'Side-B Final', examFINX: 'Side-B EX Final',
    ruleT: 'Opens when every regular level of the chapter is cleared (optional — it never blocks the next chapter; no extension levels)', ruleTX: (p) => `Opens at a chapter average (extensions included) ≥ ${Math.round(CHAPTER_EX_OPEN * 100)}% (now ${p}%)`,
    ruleFIN: (d, n) => `Opens when every chapter test is passed (≥ 60%) (${d}/${n})`, ruleFINX: (d, n) => `Opens when every chapter test and EX chapter test is passed (${d}/${n})`,
    examPass: (p) => `Pass line ${p}%`, examBest: (p) => `Best ${p}%`, examDone: 'Passed', examGo: 'Start the test', examMix: (m, labs) => `${m.main} Side-B regular + ${m.ext} Side-B extension + ${m.a} Side-A questions, shuffled${labs ? `; ${labs} lab${labs > 1 ? 's' : ''} at the end` : ''}; a fresh draw every time`, printSheet: 'Print a worksheet (with answers)', certView: (k) => (k === 'final-ex' ? 'View the certificate with distinction' : 'View the certificate'), examLockedNote: 'Not open yet', examRetry: 'Retake with new questions', examNoContent: 'No questions available for this chapter yet',
    ext: 'Extension level', extDesc: (m) => `The matching Side-A levels’ advanced levels and mixed tests (side quests included), taught again in more depth: same flow as a regular level (discover → explain → experiment → challenge), longer lessons · about ${m} min`, extLocked: 'Clear this level to unlock its extension level', extGo: 'Start the extension level', extBest: (g) => `Extension ${g}`, grade: (g) => `Grade ${g}`,
    title: 'Side-B', subtitle: 'Deep Mode · the fun stuff goes this deep', back: 'Back to side A', resume: (c, s) => `Continue ${c} · ${s}`,
    cleared: (n, m) => `Cleared ${n} / ${m}`, average: (p) => `Average ${p}%`, mastery: 'Mastery so far', noMastery: 'No data yet',
    chapterAvg: (p) => `Chapter average ${p}%`, soon: 'In the works', locked: 'Clear the previous level first', best: (p) => `Best ${p}%`,
    minutes: (n) => `about ${n} min`, aLinks: 'Side A', tools: 'Related tools', toolGo: (n) => `Open tool: ${n}`, toolPlay: (n) => `Keep playing in “${n}”`, toolLook: (n) => `Open “${n}” to check`, start: 'Start', cont: 'Continue', fromChallenge: 'Go to the challenge (seen the lessons)', rewatch: 'Watch from the start', labTag: 'Lab', coreTag: 'Core',
    sections: { discover: 'Discover', explain: 'Explain', experiment: 'Experiment', challenge: 'Challenge', lab: 'Lab', recovery: 'Recovery' },
    exit: 'Back to the map', next: 'Next', check: 'Check', retry: 'Try again', correct: 'Correct', wrong: 'Not quite', answerWas: (a) => `Answer: ${a}`, practice: 'Quick practice · not scored',
    insight: ['Discovery', 'The key point', 'Another angle', 'You heard it', 'Here’s why', 'In short', 'Worth noting', 'Under the hood', 'What you noticed'], prev: 'Back', nextStep: 'Next', play: 'Play', stepOf: (i, n) => `${i} / ${n}`,
    labOpen: 'Open the tool and start', labAgain: 'Back to the tool to improve', labBest: (s) => `Best so far ${s}/100`, labNone: 'Not submitted yet', labLine: (p) => `Pass line ${p}%, no fatal errors`, labDone: 'Lab done — see results',
    clear: 'CLEAR', notYet: 'Almost', score: 'Level score', challenge: 'Challenge', lab: 'Lab',
    skillsTitle: 'This level', masteryTitle: 'Side-B overall', breakthroughs: 'Breakthroughs here', errorsTitle: 'Worth another look', go: 'Go',
    nextLevel: (s) => `Next · ${s}`, retryStars: 'Replay for a better grade (new questions)', backBase: (s) => `Back to ${s}`, backMap: 'Back to the map', reviseLab: 'Back to the tool to improve the lab', recoveryBtn: (n) => `Recovery challenge (${n} questions)`,
    weakLine: (s) => `Weak spot: ${s}. Lessons, experiments and the lab stay done — just shore up this part.`, labLineFail: (p) => `The lab is not at ${p}% yet: go back to the tool — your work and score sheet are still there.`,
    recoveryTitle: 'Recovery challenge', recoveryPassed: 'Recovery passed — level CLEAR!', recoveryFailed: 'Almost. Another set of new questions?', again: 'New questions', recoveredTag: 'Recovered',
    passLine: (p) => `Pass line ${p}%`, firstClear: 'First clear', chapters: 'Side-B chapter bookmarks', goal: 'Final', contents: 'Contents',
  },
};
/** 三种语言的段名（存进学习记录，顶栏按钮按当前语言显示） */
const TEXT_ALL = {
  sections: Object.fromEntries(['discover', 'explain', 'experiment', 'challenge', 'lab'].map((k) => [k, { zh: TEXT.zh.sections[k], ja: TEXT.ja.sections[k], en: TEXT.en.sections[k] }])),
  recovery: { zh: TEXT.zh.sections.recovery, ja: TEXT.ja.sections.recovery, en: TEXT.en.sections.recovery },
  result: { zh: '结算', ja: '結果', en: 'Results' },
};
/** 调试模式（和 A 面同一个开关：控制台 class_debug(true)，存在 localStorage jc-learn-debug） */
const debugOn = () => { try { return globalThis.localStorage?.getItem('jc-learn-debug') === '1'; } catch (_) { return false; } };
const DEBUG_TEXT = {
  zh: { title: 'Side-B 调试', note: '控制台输入 class_debug(false) 关闭', chapter: (c, g) => `${c} 全部评级 ${g}`, all3: 'Side-B 全部 A+', clear: '清空 Side-B 记录', clearBreaks: '清空突破记录（可以重新触发）', off: '关闭调试', confirmClear: '确定清空 Side-B 的关卡、实操、技能和突破记录？', cleared: '已清空',
    skip: '跳过', right: '直接做对', wrong: '直接做错', lab100: '实操记 100 分', lab40: '实操记 40 分（不到门槛）', labFatal: '实操记硬性失败', finish: '直接结算', label: '调试' },
  ja: { title: 'Side-B デバッグ', note: 'コンソールで class_debug(false) で終了', chapter: (c, g) => `${c} をすべて評価 ${g}`, all3: 'Side-B をすべて A+', clear: 'Side-B の記録を消去', clearBreaks: 'ブレイクスルーの記録を消去（再発生できる）', off: 'デバッグ終了', confirmClear: 'Side-B のステージ・実習・スキル・ブレイクスルーの記録を消去しますか？', cleared: '消去しました',
    skip: 'スキップ', right: '正解にする', wrong: '不正解にする', lab100: '実習を 100 点に', lab40: '実習を 40 点に（合格ライン未満）', labFatal: '実習を致命的な誤りに', finish: 'すぐ結果へ', label: 'デバッグ' },
  en: { title: 'Side-B debug', note: 'Run class_debug(false) in the console to leave', chapter: (c, g) => `${c}: all grade ${g}`, all3: 'All Side-B levels A+', clear: 'Erase Side-B records', clearBreaks: 'Erase breakthroughs (so they fire again)', off: 'Leave debug', confirmClear: 'Erase Side-B level, lab, skill and breakthrough records?', cleared: 'Erased',
    skip: 'Skip', right: 'Answer correctly', wrong: 'Answer wrongly', lab100: 'Lab = 100', lab40: 'Lab = 40 (below the line)', labFatal: 'Lab = fatal error', finish: 'Go to results', label: 'Debug' },
};
const lang = () => { const l = globalThis.window?.__lang || 'zh'; return ['zh', 'ja', 'en'].includes(l) ? l : 'en'; };
const tx = (v) => (v == null ? '' : typeof v === 'string' ? v : v[lang()] ?? v.en ?? '');
const el = (tag, cls = '', text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
const btn = (cls, text, on) => { const b = el('button', cls, text); b.type = 'button'; b.addEventListener('click', on); return b; };
const pct = (x) => Math.round((x || 0) * 100);
const shuffled = (n, seed) => {
  const order = Array.from({ length: n }, (_, i) => i);
  let s = seed >>> 0;
  for (let i = n - 1; i > 0; i -= 1) { s = (s * 1664525 + 1013904223) >>> 0; const j = s % (i + 1); [order[i], order[j]] = [order[j], order[i]]; }
  return order;
};
const hashOf = (text) => [...String(text)].reduce((h, c) => ((h * 33) ^ c.charCodeAt(0)) >>> 0, 5381);

/**
 * @param {HTMLElement} root 学习页的内容区（和 A 面共用）
 * @param {{ playChord, onFlipBack: () => void, openA: (unitId) => void, aTitle: (unitId) => string, progressView: () => object, toolsFor?: (unitIds) => Array<{ feature, q }>, toolName?: (feature) => string, openTool?: (feature, query) => void }} options
 */
export function mountSideB(root, { playChord, onFlipBack, openA, aTitle = (id) => id, progressView = () => loadProgress(), toolsFor = () => [], toolName = (f) => f, openTool }) {
  const t = TEXT[lang()];
  let stops = [];
  const stopAll = () => { stops.forEach((f) => { try { f(); } catch (_) { /* ignore */ } }); stops = []; };
  const sound = (audio) => { stopAll(); stops.push(playAudio(audio, playChord)); };
  let level = null; // 当前关卡的原始内容
  let lvl = null; // 这一次挑战的具体内容（levelForAttempt）
  let session = null;
  let redraw = () => renderMap(); // 当前画面（切换调试模式时原地刷新）

  const playable = () => B_LEVELS.filter(isPlayable);
  const levelOpen = (lv) => {
    const view = progressView();
    if (!sidebUnlocked(view) || !isPlayable(lv)) return false;
    if (lv.exam) return examOpenFor(lv);
    if (lv.ext) return Boolean(view.unlockAll) || isDone(view, bKey(lv.base));
    if (view.unlockAll) return true;
    const list = playable();
    const i = list.findIndex((x) => x.id === lv.id);
    return i <= 0 || isDone(view, bKey(list[i - 1].id)) || isDone(view, bKey(lv.id));
  };
  const chapterOf = (id) => B_CHAPTERS.find((c) => c.id === id);
  const toneOf = (chapterId) => `tone-${['mint', 'sky', 'peach', 'lilac', 'sand', 'rose'][B_CHAPTERS.findIndex((c) => c.id === chapterId)] || 'sand'}`;
  /** 这一关有没有扩展关（B 面写好了扩展关内容） */
  const hasExt = (lv) => hasExtLevel(lv);
  /** 评级：存下来的评级；旧存档（只有星级）按最好成绩换算 */
  const gradeFor = (state) => state?.grade || (state?.done ? gradeOf(state.best ?? 0.6) : null);
  /** 地图 / 播放器上显示的编号：扩展关显示所属关卡的编号 */
  const codeOf = (lv) => lv?.base || lv?.id;
  const examOpenFor = (lv) => {
    const view = progressView();
    if (lv.exam === 'chapter') return chapterTestOpen(chapterLevels(lv.chapter).filter(isPlayable), view);
    if (lv.exam === 'chapter-ex') return chapterExOpen(chapterLevels(lv.chapter).filter(isPlayable), view, hasExt);
    const ids = B_CHAPTERS.filter((c) => chapterLevels(c.id).some(isPlayable)).map((c) => c.id);
    return lv.exam === 'final-ex' ? finalExOpen(ids, view) : finalOpen(ids, view);
  };

  // ---------------- 地图：一本乐谱书 ----------------
  // 第一页是封面与目录，然后每章一页，最后一页是 Final；右边伸出书签，点书签、页底的上一页 / 下一页、方向键都会翻页。
  // 翻页是上下翻（像谱架上的谱本）：下一页 = 这一页往上翻过装订线，上一页 = 上一页从上面翻落回来。
  const PAGES = ['cover', ...B_CHAPTERS.map((c) => c.id), 'goal'];
  const PAGE_KEY = 'jc-sideb-page';
  const readPage = () => { try { const i = PAGES.indexOf(JSON.parse(globalThis.localStorage?.getItem(PAGE_KEY) || 'null')); return i; } catch (_) { return -1; } };
  const writePage = (i) => { try { globalThis.localStorage?.setItem(PAGE_KEY, JSON.stringify(PAGES[i])); } catch (_) { /* 无痕模式等 */ } };
  const reducedMotion = () => Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  let pageIndex = -1;

  function renderMap() {
    redraw = renderMap;
    stopAll();
    level = null; session = null;
    root.replaceChildren();
    const progress = progressView();
    const shell = el('div', 'sideb');
    if (debugOn()) shell.appendChild(debugPanel());
    // 默认翻到：上次看的那页；没有记录时，有没做完的关卡就翻到那一章，否则封面
    if (pageIndex < 0) {
      const saved = readPage();
      const record = loadBResume();
      pageIndex = saved >= 0 ? saved : record?.levelId && lookupLevel(record.levelId) ? Math.max(0, PAGES.indexOf(lookupLevel(record.levelId).chapter || 'goal')) : 0;
    }
    const book = el('div', 'sideb-book');
    book.setAttribute('role', 'region');
    book.setAttribute('aria-label', t.title);
    const binding = el('div', 'sideb-binding');
    binding.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 9; i += 1) binding.appendChild(el('span', 'sideb-ring'));
    const tabs = el('div', 'sideb-tabs');
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', t.chapters);
    const stage = el('div', 'sideb-stage');
    PAGES.forEach((id, i) => {
      const chapter = chapterOf(id);
      const label = id === 'cover' ? t.contents : id === 'goal' ? t.goal : chapter.code;
      const tab = btn(`sideb-tab ${id === 'cover' ? 'tone-cover' : id === 'goal' ? 'tone-sand' : toneOf(id)}`, '', () => turnTo(i));
      tab.setAttribute('role', 'tab');
      tab.dataset.page = id;
      tab.title = id === 'cover' ? t.contents : id === 'goal' ? t.goal : `${chapter.code} ${tx(chapter.title)}`;
      tab.append(el('span', 'sideb-tab-code', label));
      if (chapter) tab.append(el('span', 'sideb-tab-name', tx(chapter.short)));
      tabs.appendChild(tab);
    });
    // 书签上按方向键也能翻页
    tabs.addEventListener('keydown', (e) => {
      const step = { ArrowDown: 1, ArrowRight: 1, PageDown: 1, ArrowUp: -1, ArrowLeft: -1, PageUp: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      turnTo(Math.max(0, Math.min(PAGES.length - 1, pageIndex + step)), { focusTab: true });
    });
    stage.appendChild(binding);
    const tabCol = el('div', 'sideb-tab-col');
    tabCol.append(tabs);
    book.append(stage, tabCol);
    // 书的上方：随时可以翻回 A 面；有没打完的关卡时也能直接继续
    const top = el('div', 'sideb-book-top');
    top.appendChild(btn('sideb-turn sideb-to-a', `◀ ${t.back}`, () => { stopAll(); onFlipBack?.(); }));
    const record = loadBResume();
    if (record?.levelId && lookupLevel(record.levelId)) top.appendChild(btn('sideb-turn sideb-top-resume', `${t.resume(codeOf(lookupLevel(record.levelId)), tx(lookupLevel(record.levelId).title))} ▶`, () => resume()));
    shell.append(top, book);
    root.appendChild(shell);
    stage.appendChild(buildPage(pageIndex, progress));
    markTabs(tabs);

    function markTabs(list) {
      list.querySelectorAll('.sideb-tab').forEach((tab, i) => {
        tab.classList.toggle('is-current', i === pageIndex);
        tab.setAttribute('aria-selected', String(i === pageIndex));
        tab.tabIndex = i === pageIndex ? 0 : -1;
      });
    }
    function turnTo(i, { focusTab = false } = {}) {
      if (i === pageIndex || i < 0 || i >= PAGES.length) return;
      const dir = i > pageIndex ? 1 : -1;
      const old = stage.querySelector('.sideb-page:not(.is-leaving)');
      pageIndex = i;
      writePage(i);
      markTabs(tabs);
      if (focusTab) tabs.querySelectorAll('.sideb-tab')[i]?.focus?.();
      const next = buildPage(i, progressView());
      if (!old || reducedMotion()) { old?.remove(); stage.appendChild(next); return; }
      stage.querySelectorAll('.is-leaving').forEach((n) => n.remove());
      if (dir > 0) {
        // 下一页：旧的一页往上翻起，新的一页在下面露出来
        stage.insertBefore(next, old);
        old.classList.add('is-leaving', 'flip-up');
        setTimeout(() => old.remove(), 560);
      } else {
        // 上一页：新的一页从上面翻落，盖住旧的一页
        stage.appendChild(next);
        next.classList.add('flip-down');
        old.classList.add('is-leaving');
        setTimeout(() => { old.remove(); next.classList.remove('flip-down'); }, 560);
      }
      const top = book.getBoundingClientRect?.().top;
      if (Number.isFinite(top) && top < 0) book.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
    }
    function buildPage(i, view) {
      const id = PAGES[i];
      const page = el('article', `sideb-page${id === 'cover' ? ' is-cover' : ''}`);
      page.setAttribute('role', 'tabpanel');
      page.dataset.page = id;
      if (id === 'cover') page.appendChild(coverPage(view, turnTo));
      else if (id === 'goal') {
        const goal = el('section', 'sideb-chapter sideb-goal');
        goal.append(el('header', 'sideb-chapter-head'));
        goal.firstChild.append(el('span', 'sideb-chapter-code', 'FIN'), el('h4', '', t.goal));
        const ids = B_CHAPTERS.filter((c) => chapterLevels(c.id).some(isPlayable)).map((c) => c.id);
        const passed = (eid) => isDone(view, bKey(eid));
        const exams = el('div', 'sideb-exams is-final');
        exams.append(
          examCard('FIN', t.ruleFIN(ids.filter((c) => passed(`T-${c}`)).length, ids.length), view),
          examCard('FINX', t.ruleFINX(ids.filter((c) => passed(`T-${c}`) && passed(`TX-${c}`)).length, ids.length), view),
        );
        goal.appendChild(exams);
        page.appendChild(goal);
      } else page.appendChild(chapterBlock(chapterOf(id), view));
      // 页底：上一页 / 页码 / 下一页
      const foot = el('footer', 'sideb-page-foot');
      const prev = i > 0 ? btn('sideb-turn is-prev', `▲ ${pageName(i - 1)}`, () => turnTo(i - 1)) : el('span');
      // 最后一页（Final）：页底的"下一页"换成翻回 A 面——这本书翻到底，唱片翻回 A 面
      const next = i < PAGES.length - 1 ? btn('sideb-turn is-next', `${pageName(i + 1)} ▼`, () => turnTo(i + 1)) : btn('sideb-turn is-next sideb-to-a', `${t.back} ▶`, () => { stopAll(); onFlipBack?.(); });
      foot.append(prev, el('span', 'sideb-folio', `— ${i + 1} —`), next);
      page.appendChild(foot);
      return page;
    }
  }
  const pageName = (i) => { const id = PAGES[i]; return id === 'cover' ? t.contents : id === 'goal' ? t.goal : `${chapterOf(id).code} ${tx(chapterOf(id).short)}`; };
  /** 封面与目录：标题、统计、累计能力、继续、翻回 A 面；目录里每章一行（点了翻到那一页） */
  function coverPage(progress, turnTo) {
    const box = el('div', 'sideb-cover');
    const title = el('div', 'sideb-cover-title');
    title.append(el('span', 'sideb-kicker', 'SIDE B · DEEP MODE'), el('h3', '', t.title), el('p', '', t.subtitle));
    const cleared = B_LEVELS.filter((lv) => isDone(progress, bKey(lv.id))).length;
    const avg = overallAverage(B_CHAPTERS.map((c) => chapterLevels(c.id)), progress);
    const stats = el('div', 'sideb-stats');
    stats.append(el('span', 'sideb-stat', t.cleared(cleared, B_LEVELS.length)), el('span', 'sideb-stat', t.average(pct(avg))));
    const actions = el('div', 'sideb-hero-actions');
    const record = loadBResume();
    if (record?.levelId && lookupLevel(record.levelId)) actions.appendChild(btn('learn-btn resume wide', t.resume(codeOf(lookupLevel(record.levelId)), tx(lookupLevel(record.levelId).title)), () => resume()));
    actions.appendChild(btn('learn-btn ghost sideb-flip-back', t.back, () => { stopAll(); onFlipBack?.(); }));
    const toc = el('ol', 'sideb-toc');
    B_CHAPTERS.forEach((chapter) => {
      const levels = chapterLevels(chapter.id);
      const li = el('li', `sideb-toc-row ${toneOf(chapter.id)}`);
      const go = btn('sideb-toc-link', '', () => turnTo(PAGES.indexOf(chapter.id)));
      go.append(el('span', 'sideb-toc-code', chapter.code), el('span', 'sideb-toc-title', tx(chapter.title)), el('span', 'sideb-toc-dots'), el('span', 'sideb-toc-count', `${levels.filter((lv) => isDone(progress, bKey(lv.id))).length}/${levels.length}`));
      li.appendChild(go);
      toc.appendChild(li);
    });
    box.append(title, stats, el('p', 'sideb-toc-head', t.contents), toc, masteryBars(overallMastery(loadMastery()), t.mastery), actions);
    return box;
  }
  function chapterBlock(chapter, progress) {
    const levels = chapterLevels(chapter.id);
    const section = el('section', `sideb-chapter ${toneOf(chapter.id)}`);
    section.id = `sideb-sec-${chapter.id}`;
    const head = el('header', 'sideb-chapter-head');
    head.append(el('span', 'sideb-chapter-code', chapter.code), el('h4', '', tx(chapter.title)), el('span', 'sideb-chapter-avg', t.chapterAvg(pct(chapterAverageWithExt(levels.filter(isPlayable), progress, hasExt)))));
    section.appendChild(head);
    const list = el('ol', 'sideb-tracks');
    levels.forEach((lv) => list.appendChild(levelNode(lv, progress)));
    section.appendChild(list);
    const exams = el('div', 'sideb-exams');
    const playableLevels = levels.filter(isPlayable);
    exams.append(examCard(`T-${chapter.id}`, t.ruleT, progress), examCard(`TX-${chapter.id}`, t.ruleTX(pct(chapterAverageWithExt(playableLevels, progress, hasExt))), progress));
    section.appendChild(exams);
    return section;
  }
  /** 考试卡：标题、开放条件、最好成绩、开始按钮（没开放时写明还差什么） */
  function examCard(id, rule, progress) {
    const exam = lookupLevel(id);
    const kind = id.startsWith('TX-') ? 'TX' : id.startsWith('T-') ? 'T' : id;
    const card = el('div', `sideb-exam is-${kind.toLowerCase()}`);
    const state = progress.units[bKey(id)];
    card.append(el('strong', 'sideb-exam-title', t[`exam${kind}`]), el('p', 'sideb-rule', rule));
    if (!exam) { card.appendChild(el('p', 'sideb-rule', t.examNoContent)); card.classList.add('is-locked'); return card; }
    const open = levelOpen(exam);
    card.classList.toggle('is-locked', !open);
    card.classList.toggle('is-done', Boolean(state?.done));
    const meta = el('p', 'sideb-exam-meta', [t.examPass(pct(exam.passLine ?? PASS_LINE)), t.minutes(exam.minutes), ...(state?.best ? [t.examBest(pct(state.best))] : []), ...(state?.done ? [t.examDone, t.grade(gradeFor(state))] : [])].join(' · '));
    card.appendChild(meta);
    if (exam.mix) card.appendChild(el('p', 'sideb-rule', t.examMix(exam.mix, exam.sections.lab?.length || 0)));
    const certKind = id === 'FIN' ? 'final' : id === 'FINX' ? 'final-ex' : null;
    if (certKind && state?.done && loadCerts()[certKind]) card.appendChild(btn('learn-btn ghost', t.certView(certKind), () => renderCert(certKind)));
    if (open) card.append(btn('learn-btn primary', t.examGo, () => startLevel(id)), printLink(exam));
    else card.appendChild(el('span', 'sideb-exam-lock', t.examLockedNote));
    return card;
  }
  function levelNode(lv, progress) {
    const item = el('li', 'sideb-track');
    const state = progress.units[bKey(lv.id)];
    const ready = isPlayable(lv);
    const open = levelOpen(lv);
    item.classList.toggle('is-soon', !ready);
    item.classList.toggle('is-locked', ready && !open);
    item.classList.toggle('is-done', Boolean(state?.done));
    // 没打完的关卡夹一条书签丝带
    if (loadBResume()?.levelId === lv.id) { item.classList.add('has-bookmark'); item.appendChild(el('span', 'sideb-ribbon')); }
    const main = btn('sideb-track-main', '', () => toggleSheet(item, lv));
    main.setAttribute('aria-expanded', 'false');
    const disc = el('span', 'sideb-disc');
    disc.append(el('span', 'sideb-disc-code', lv.id));
    if (state?.best) disc.style.setProperty('--fill', `${pct(state.best)}%`);
    const text = el('span', 'sideb-track-text');
    text.append(el('span', 'sideb-track-title', tx(lv.title)));
    const meta = el('span', 'sideb-track-meta');
    if (lv.lab) meta.appendChild(el('span', 'sideb-tag', t.labTag));
    if (lv.core) meta.appendChild(el('span', 'sideb-tag is-core', t.coreTag));
    const extState = progress.units[extKey(lv.id)];
    if (hasExt(lv) && extState?.done) meta.appendChild(el('span', 'sideb-tag is-ext', t.extBest(gradeFor(extState))));
    meta.appendChild(el('span', 'sideb-track-state', !ready ? t.soon : !open ? t.locked : state?.done ? `${t.grade(gradeFor(state))} · ${t.best(pct(state.best))}` : state?.best ? t.best(pct(state.best)) : ''));
    text.appendChild(meta);
    main.append(disc, text);
    item.appendChild(main);
    return item;
  }
  function toggleSheet(item, lv) {
    const existing = item.querySelector('.sideb-sheet');
    root.querySelectorAll('.sideb-sheet').forEach((s) => { s.previousSibling?.setAttribute?.('aria-expanded', 'false'); s.remove(); });
    if (existing) return;
    const sheet = el('div', 'sideb-sheet');
    const progress = progressView();
    if (lv.a?.length) {
      const links = el('p', 'sideb-alinks');
      links.appendChild(el('span', '', `${t.aLinks}：`));
      lv.a.forEach((id) => links.appendChild(btn('sideb-chip', aTitle(id), () => openA?.(id))));
      sheet.appendChild(links);
    }
    const tools = levelTools(lv);
    if (tools.length && openTool) {
      const links = el('p', 'sideb-alinks sideb-toollinks');
      links.appendChild(el('span', '', `${t.tools}：`));
      tools.forEach((tool) => links.appendChild(toolChip(tool, toolName(tool.feature))));
      sheet.appendChild(links);
    }
    if (!isPlayable(lv)) { sheet.appendChild(el('p', 'sideb-sheet-note', t.soon)); }
    else if (!levelOpen(lv)) { sheet.appendChild(el('p', 'sideb-sheet-note', t.locked)); }
    else {
      sheet.appendChild(el('p', 'sideb-sheet-note', `${t.minutes(Math.round(lv.minutes || estimateMinutes(lv)))} · ${levelSections(lv).map((s) => t.sections[s]).join(' → ')}`));
      if (lv.insight) sheet.appendChild(el('p', 'sideb-sheet-teaser', tx(lv.insight)));
      const row = el('div', 'sideb-sheet-actions');
      const record = loadBResume();
      const seen = progress.units[bKey(lv.id)]?.seen || [];
      if (record?.levelId === lv.id) row.appendChild(btn('learn-btn primary', t.cont, () => resume()));
      if (seen.includes('explain')) {
        row.appendChild(btn(`learn-btn ${record?.levelId === lv.id ? 'ghost' : 'primary'}`, t.fromChallenge, () => startLevel(lv.id, { fromChallenge: true })));
        row.appendChild(btn('learn-btn ghost', t.rewatch, () => startLevel(lv.id)));
      } else if (record?.levelId !== lv.id) row.appendChild(btn('learn-btn primary', t.start, () => startLevel(lv.id)));
      else row.appendChild(btn('learn-btn ghost', t.rewatch, () => startLevel(lv.id)));
      sheet.appendChild(row);
      sheet.appendChild(printLink(lv));
      // 扩展关：通过本关后解锁，和普通关一样在 B 面播放器里玩（把对应 A 面关卡的进阶关重新、更细地讲一遍）
      if (hasExt(lv)) {
        const ext = el('div', 'sideb-ext');
        const extState = progress.units[extKey(lv.id)];
        const x = extLevelById(`${lv.id}x`);
        ext.append(el('strong', '', t.ext), el('p', 'sideb-sheet-note', t.extDesc(estimateMinutes(x))));
        if (progress.units[bKey(lv.id)]?.done || progress.unlockAll) ext.append(btn('learn-btn ghost', extState?.done ? `${t.extGo} · ${t.grade(gradeFor(extState))}` : t.extGo, () => { stopAll(); startLevel(x.id); }), printLink(x));
        else ext.appendChild(el('p', 'sideb-sheet-note is-locked', t.extLocked));
        sheet.appendChild(ext);
      }
    }
    item.querySelector('.sideb-track-main').setAttribute('aria-expanded', 'true');
    item.appendChild(sheet);
  }
  /** 地图上的调试面板：按章设评级（C = 65%、B = 80%、A+ = 100%，方便测 EX 章节测试 60%（含扩展关）的开放线）、全部 A+、清空记录 */
  function debugPanel() {
    const dt = DEBUG_TEXT[lang()];
    const panel = el('div', 'learn-debug-panel sideb-debug');
    const head = el('div', 'learn-debug-head');
    head.append(el('span', 'learn-debug-tag', 'DEBUG'), el('strong', '', dt.title), el('span', 'learn-muted', dt.note));
    panel.appendChild(head);
    const BEST = { C: 0.65, B: 0.8, 'A+': 1 };
    const apply = (levels, grade) => {
      const p = loadProgress();
      levels.forEach((lv) => { const key = bKey(lv.id); p.units[key] = { ...(p.units[key] || {}), best: BEST[grade], done: true, grade, seen: ['discover', 'explain', 'experiment'] }; });
      saveProgress(p);
      renderMap();
    };
    B_CHAPTERS.forEach((chapter) => {
      const row = el('div', `learn-debug-row ${toneOf(chapter.id)}`);
      row.appendChild(el('span', 'learn-debug-label', chapter.code));
      ['C', 'B', 'A+'].forEach((g) => { const b = btn('learn-debug-btn', g, () => apply(chapterLevels(chapter.id), g)); b.title = dt.chapter(tx(chapter.title), g); row.appendChild(b); });
      panel.appendChild(row);
    });
    const actions = el('div', 'learn-debug-row');
    actions.append(
      btn('learn-debug-btn strong', dt.all3, () => apply(B_LEVELS, 'A+')),
      btn('learn-debug-btn danger', dt.clear, () => {
        if (typeof globalThis.confirm === 'function' && !globalThis.confirm(dt.confirmClear)) return;
        const p = loadProgress();
        Object.keys(p.units).filter((k) => k.startsWith('b:')).forEach((k) => delete p.units[k]);
        saveProgress(p);
        ['jc-sideb-labs', 'jc-sideb-skills', 'jc-sideb-breakthroughs'].forEach((k) => { try { globalThis.localStorage?.removeItem(k); } catch (_) { /* ignore */ } });
        forget();
        renderMap();
      }),
      btn('learn-debug-btn', dt.clearBreaks, () => { try { globalThis.localStorage?.removeItem('jc-sideb-breakthroughs'); } catch (_) { /* ignore */ } renderMap(); }),
      btn('learn-debug-btn', dt.off, () => globalThis.window?.class_debug?.(false)),
    );
    panel.appendChild(actions);
    return panel;
  }
  /** 关卡里的调试条：跳过 / 直接做对 / 直接做错（打拍也可以）/ 实操直接记分 / 直接结算 */
  function debugBar(node, { skip, answerNow, recovering }) {
    const dt = DEBUG_TEXT[lang()];
    const bar = el('div', 'learn-debug-bar sideb-debug-bar');
    bar.appendChild(el('span', 'learn-debug-tag', 'DEBUG'));
    bar.appendChild(btn('learn-debug-btn', dt.skip, skip));
    if (answerNow) {
      bar.appendChild(btn('learn-debug-btn strong', dt.right, () => answerNow(true)));
      bar.appendChild(btn('learn-debug-btn danger', dt.wrong, () => answerNow(false)));
    }
    if (node.type === 'lab') {
      const sheet = (score, fatal) => ({
        score, hardFail: fatal ? [{ error: 'wrong-chord', text: { zh: '调试：硬性失败', ja: 'デバッグ：致命的な誤り', en: 'Debug: fatal error' } }] : [],
        items: [{ id: 'debug', layer: 'core', label: { zh: dt.label, ja: DEBUG_TEXT.ja.label, en: DEBUG_TEXT.en.label }, points: score, max: 100, deductions: [], info: [] }],
      });
      [[dt.lab100, 100, false], [dt.lab40, 40, false], [dt.labFatal, 70, true]].forEach(([label, score, fatal]) => bar.appendChild(btn('learn-debug-btn', label, () => { saveLabResult(labResultKey(node.lab, node.mode || 'level'), sheet(score, fatal)); renderNode(); })));
    }
    if (!recovering) bar.appendChild(btn('learn-debug-btn', dt.finish, () => finishLevel()));
    return bar;
  }
  function masteryBars(values, title) {
    const box = el('div', 'sideb-mastery');
    box.appendChild(el('p', 'sideb-mastery-title', title));
    const any = SKILLS.some((s) => values[s] != null);
    if (!any) { box.appendChild(el('p', 'sideb-mastery-empty', t.noMastery)); return box; }
    SKILLS.forEach((s) => {
      const row = el('div', 'sideb-skill');
      const barEl = el('span', 'sideb-skill-bar');
      const fill = el('span', 'sideb-skill-fill');
      fill.style.width = `${pct(values[s] ?? 0)}%`;
      barEl.appendChild(fill);
      row.append(el('span', 'sideb-skill-name', tx(SKILL_NAMES[s])), barEl, el('span', 'sideb-skill-num', values[s] == null ? '—' : `${pct(values[s])}%`));
      box.appendChild(row);
    });
    return box;
  }

  // ---------------- 进入关卡 ----------------
  function startLevel(id, { fromChallenge = false, attempt = 0 } = {}) {
    level = lookupLevel(id);
    if (!isPlayable(level)) { renderMap(); return; }
    lvl = levelForAttempt(level, attempt);
    const sections = levelSections(lvl);
    const seen = progressView().units[bKey(id)]?.seen || [];
    session = createBSession(lvl, { attempt, seen, startSection: fromChallenge ? Math.max(0, sections.indexOf('challenge')) : 0 });
    session.breakthroughs = [];
    persist();
    renderNode();
  }
  /** 打印练习卷（关卡 / 扩展关 / 考试）：题和答案页，听辨和实操纸上做不了 */
  function printLevel(lv) {
    const title = `${codeOf(lv)} · ${tx(lv.title)}`;
    const visualSvg = (card) => visualOf(card.visual)?.querySelector?.('svg')?.outerHTML || '';
    const { html } = sidebWorksheet(lv, { lang: lang(), title, visualSvg, labTitle: (id) => tx(LABS[id]?.title) });
    openWorksheet(title, html);
  }
  const printLink = (lv) => btn('learn-link sideb-print', t.printSheet, () => printLevel(lv));
  /** 这一关相关的工具：关卡自己写的 tools + 对应 A 面关卡的工具（learn_ui 给出，含五度圈这类 extraTools） */
  function levelTools(lv) {
    const list = [...(lv?.tools || []), ...toolsFor(lv?.a || [])];
    return list.filter((x, i) => list.findIndex((y) => y.feature === x.feature && (y.q || '') === (x.q || '')) === i);
  }
  /** 去工具：关卡进行中先记下进度（顶栏会出现"回到 Side-B"），再跳过去 */
  function goTool(tool) {
    if (!tool?.feature || !openTool) return;
    if (level && session && !session.result) persist();
    openTool(tool.feature, tool.q || null);
  }
  const toolChip = (tool, label = t.toolGo(toolName(tool.feature)), cls = 'sideb-chip sideb-tool') => { const b = btn(cls, label, () => goTool(tool)); b.dataset.feature = tool.feature; return b; };
  /** 通知顶栏的"回到 Side-B"按钮更新（script.js 监听 learn-resume-change） */
  const notify = () => globalThis.window?.dispatchEvent?.(new globalThis.window.CustomEvent('learn-resume-change'));
  /** 记下这一关的进度：顶栏按钮的提示要写出是哪一关、停在哪一段（实操 / 挑战 / 结算……） */
  function persist() {
    if (!level || !session) return;
    const sections = lvl ? levelSections(lvl) : [];
    const part = session.result ? TEXT_ALL.result : session.recovery ? TEXT_ALL.recovery : TEXT_ALL.sections[sections[session.section]] || TEXT_ALL.sections.challenge;
    saveBResume({ levelId: level.id, title: level.title, part, session });
    notify();
  }
  const forget = () => { clearBResume(); notify(); };
  function resume() {
    const record = loadBResume();
    if (!record?.levelId || !lookupLevel(record.levelId) || !isPlayable(lookupLevel(record.levelId))) { forget(); renderMap(); return false; }
    level = lookupLevel(record.levelId);
    session = record.session;
    session.breakthroughs ||= [];
    lvl = levelForAttempt(level, session.attempt || 0);
    if (session.result) { renderResults(session.result); return true; }
    if (session.recovery) { renderRecovery(); return true; }
    renderNode();
    return true;
  }
  /** 从工具回来（提交了实操）：回到这一关的实操节点，显示最新成绩 */
  function labReturn(labId) {
    const record = loadBResume();
    if (record?.levelId) {
      resume();
      if (!session) return;
      const sections = levelSections(lvl);
      const li = sections.indexOf('lab');
      const nodes = lvl.sections.lab || [];
      const ni = nodes.findIndex((n) => n.lab === labId);
      if (li >= 0 && ni >= 0 && !session.result) { session = { ...session, section: li, node: ni }; persist(); renderNode(); }
      return;
    }
    const owner = B_LEVELS.find((lv) => isPlayable(lv) && (lv.sections.lab || []).some((n) => n.lab === labId));
    if (owner) { startLevel(owner.id, { fromChallenge: true }); const li = levelSections(lvl).indexOf('lab'); if (li >= 0) { session = { ...session, section: li, node: 0 }; persist(); renderNode(); } }
    else renderMap();
  }

  // ---------------- 播放器外壳 ----------------
  function frame({ sectionName, index, total }) {
    stopAll();
    root.replaceChildren();
    const shell = el('div', `sideb-player ${toneOf(level.chapter)}`);
    const top = el('div', 'sideb-player-top');
    top.append(btn('learn-btn ghost sideb-exit', t.exit, () => { persist(); renderMap(); }), el('span', 'sideb-player-code', codeOf(level)), el('span', 'sideb-player-title', tx(level.title)));
    const tools = levelTools(level);
    if (tools.length && openTool) { const box = el('span', 'sideb-player-tools'); tools.slice(0, 3).forEach((tool) => box.appendChild(toolChip(tool, toolName(tool.feature)))); box.setAttribute('aria-label', t.tools); top.appendChild(box); }
    const strip = el('ol', 'sideb-strip');
    const sections = levelSections(lvl);
    sections.forEach((s, i) => {
      const li = el('li', `sideb-strip-seg${i < session.section ? ' is-done' : ''}${i === session.section && sectionName !== 'recovery' ? ' is-now' : ''}`);
      li.append(el('span', 'sideb-strip-name', t.sections[s]));
      if (i === session.section && sectionName !== 'recovery') {
        const fill = el('span', 'sideb-strip-fill');
        fill.style.width = `${Math.round(((index) / Math.max(1, total)) * 100)}%`;
        li.appendChild(fill);
      }
      strip.appendChild(li);
    });
    if (sectionName === 'recovery') strip.appendChild(el('li', 'sideb-strip-seg is-now is-recovery', t.sections.recovery));
    const body = el('div', 'sideb-node');
    if (!reducedMotion()) body.classList.add('flip-in');
    const footer = el('div', 'sideb-footer');
    shell.append(top, strip, body, footer);
    root.appendChild(shell);
    return { shell, body, footer };
  }
  const current = () => {
    const sections = levelSections(lvl);
    const name = sections[session.section];
    const nodes = name ? lvl.sections[name] : [];
    return { sections, name, nodes, node: nodes?.[session.node] };
  };
  function advance() {
    const { nodes } = current();
    if (session.node + 1 < nodes.length) session = { ...session, node: session.node + 1 };
    else session = completeSection(session, lvl);
    persist();
    if (session.section >= levelSections(lvl).length) finishLevel();
    else renderNode();
  }

  // ---------------- 节点 ----------------
  function renderNode() {
    redraw = renderNode;
    const { name, nodes, node } = current();
    if (!node) { finishLevel(); return; }
    const { shell, body, footer } = frame({ sectionName: name, index: session.node, total: nodes.length });
    const nextBtn = btn('learn-btn primary', t.next, () => advance());
    const done = () => { footer.replaceChildren(nextBtn); nextBtn.focus?.(); };
    let answered = false;
    let answerNow = null;
    renderBody(node, body, footer, shell, {
      done,
      record: (result) => { answered = true; session = recordAnswer(session, node, result); persist(); },
      registerDebug: (fn) => { answerNow = fn; },
    });
    toolHelp(node, body);
    if (debugOn()) body.before(debugBar(node, { skip: () => advance(), answerNow: answerNow && ((ok) => { if (!answered) answerNow(ok); }) }));
  }
  /** 题目和讲解下方的"去工具"：题目自己写的 tool 优先，再加本关的相关工具（最多 3 个）；跳过去之前记下进度，回来接着这一题。
   *  发现、讲解页、演示也有（实验另有"接着玩"，实操有自己的工具）；讲解页已经单独放了 node.tool 的链接，这里就不再重复它 */
  function toolHelp(node, body) {
    if (!openTool || node.type === 'lab' || node.type === 'experiment') return;
    if (!isAssessed(node) && !['discover', 'page', 'demo'].includes(node.type)) return;
    const own = node.tool && node.type !== 'page' ? [node.tool] : [];
    const shown = node.type === 'page' && node.tool ? node.tool : null;
    const list = [...own, ...levelTools(level)].filter((x) => !shown || x.feature !== shown.feature || (x.q || '') !== (shown.q || ''));
    const tools = list.filter((x, i) => list.findIndex((y) => y.feature === x.feature && (y.q || '') === (x.q || '')) === i).slice(0, 3);
    if (!tools.length) return;
    const row = el('div', 'sideb-help');
    tools.forEach((tool) => row.appendChild(toolChip(tool, t.toolLook(toolName(tool.feature)), 'learn-link sideb-tool-link')));
    body.appendChild(row);
  }
  function title(body, text) { if (text) body.appendChild(el('h4', 'sideb-node-title', tx(text))); }
  function paragraphs(body, text) { [].concat(text ?? []).forEach((p) => body.appendChild(el('p', 'sideb-text', tx(p)))); }
  /** 图里的文字（标签、格子）可以写成三语对象：画之前换成当前语言 */
  const isText = (v) => v && typeof v === 'object' && !Array.isArray(v) && 'zh' in v && 'en' in v && Object.keys(v).every((k) => ['zh', 'ja', 'en'].includes(k));
  const localize = (v) => (isText(v) ? tx(v) : Array.isArray(v) ? v.map(localize) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, localize(x)])) : v);
  function visualOf(raw) {
    if (!raw) return null;
    const visual = localize(raw);
    if (visual.kind === 'satb') return satbStaff(visual);
    if (visual.kind === 'grid') return rhythmGrid(visual);
    return renderVisual(visual);
  }
  function playRow(body, list) {
    if (!list?.length) return;
    const row = el('div', 'sideb-play-row');
    list.forEach((p) => row.appendChild(btn('learn-btn ghost sideb-play', tx(p.label) || t.play, () => sound(p.audio))));
    body.appendChild(row);
  }
  /** 出处：每个 ref 显示成可点击的标题，新标签页打开原文（鼠标停留显示 ref id 和作者）；找不到登记的就只显示 id */
  function refLine(body, ref) {
    const ids = [].concat(ref ?? []);
    if (!ids.length) return;
    const line = el('p', 'sideb-ref');
    ids.forEach((id, i) => {
      if (i) line.appendChild(document.createTextNode(' · '));
      const r = referenceById(id);
      if (!r?.url) { line.appendChild(document.createTextNode(id)); return; }
      const a = el('a', 'sideb-ref-link', r.title || id);
      a.href = r.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.title = [id, r.author].filter(Boolean).join(' · ');
      line.appendChild(a);
    });
    body.appendChild(line);
  }

  function renderBody(node, body, footer, shell, { done, record, registerDebug = () => {} }) {
    if (node.practice) body.appendChild(el('span', 'sideb-badge', t.practice));
    switch (node.type) {
      case 'page': {
        title(body, node.title);
        paragraphs(body, node.text);
        const v = visualOf(node.visual); if (v) body.appendChild(v);
        if (node.audio) playRow(body, [{ label: t.play, audio: node.audio }]);
        playRow(body, node.play);
        if (node.tool && openTool) body.appendChild(toolChip(node.tool, t.toolGo(toolName(node.tool.feature)), 'learn-link sideb-tool-link'));
        refLine(body, node.ref);
        done();
        return;
      }
      case 'demo': return renderDemo(node, body, footer, done);
      case 'discover': return renderDiscover(node, body, footer, shell, { done, record, registerDebug });
      case 'experiment': return renderExperiment(node, body, shell, done);
      case 'lab': return renderLab(node, body, footer);
      case 'tap': return renderTap(node, body, footer, shell, { done, record, registerDebug });
      case 'derive': return renderDerive(node, body, footer, shell, { done, record, registerDebug });
      case 'fill': return renderFill(node, body, footer, shell, { done, record, registerDebug });
      default: return renderChoice(node, body, footer, shell, { done, record, registerDebug });
    }
  }
  function renderDemo(node, body, footer, done) {
    title(body, node.title);
    const stage = el('div', 'sideb-demo');
    body.appendChild(stage);
    refLine(body, node.ref);
    let i = 0;
    const show = () => {
      stage.replaceChildren();
      const step = node.steps[i];
      stage.appendChild(el('span', 'sideb-step-count', t.stepOf(i + 1, node.steps.length)));
      stage.appendChild(el('p', 'sideb-text', tx(step.text)));
      const v = visualOf(step.visual); if (v) stage.appendChild(v);
      if (step.audio) { playRow(stage, [{ label: t.play, audio: step.audio }]); sound(step.audio); }
      footer.replaceChildren();
      if (i > 0) footer.appendChild(btn('learn-btn ghost', t.prev, () => { i -= 1; show(); }));
      if (i + 1 < node.steps.length) footer.appendChild(btn('learn-btn primary', t.nextStep, () => { i += 1; show(); }));
      else { const prev = footer.firstChild; done(); if (prev && i > 0) footer.prepend(prev); }
    };
    show();
  }
  /** 揭晓发现：卡片 + 一个柔和的大三和弦。卡片上的小标题从 9 个词里随机取一个（按节点与第几次尝试取种子，重试时会换），避免每页都是同一句感叹 */
  function revealInsight(body, insight, seed = '') {
    if (!insight) return;
    const card = el('div', 'sideb-insight');
    const kicker = t.insight[hashOf(`${seed}:${session.attempt || 0}`) % t.insight.length];
    card.append(el('span', 'sideb-insight-kicker', kicker), el('strong', '', tx(insight.title)), el('p', '', tx(insight.text)));
    body.appendChild(card);
    playChord?.([523.25, 659.25, 783.99], 1.2, { interrupt: false });
  }
  function optionButtons(node, body, onPick) {
    const options = node.options || [];
    const order = shuffled(options.length, hashOf(`${node.id}:${session.attempt || 0}`));
    const list = el('div', 'sideb-options');
    order.forEach((k) => {
      const b = btn('sideb-option', tx(options[k]), () => onPick(k, b, list));
      b.dataset.k = k;
      list.appendChild(b);
    });
    body.appendChild(list);
    return list;
  }
  function markOptions(list, picked, answer) {
    list.querySelectorAll('.sideb-option').forEach((b) => {
      const k = Number(b.dataset.k);
      b.disabled = true;
      if (k === answer) b.classList.add('is-right');
      if (k === picked && k !== answer) b.classList.add('is-wrong');
    });
  }
  /** 调试：点正确（或一个错误）选项 */
  const pickOption = (body, node, ok) => body.querySelector(`.sideb-option[data-k="${ok ? node.answer : (node.answer + 1) % node.options.length}"]`)?.dispatchEvent(new globalThis.window.Event('click', { bubbles: true }));
  function renderDiscover(node, body, footer, shell, { done, record, registerDebug }) {
    paragraphs(body, node.prompt);
    const v = visualOf(node.visual); if (v) body.appendChild(v);
    if (node.audio) playRow(body, [{ label: t.play, audio: node.audio }]);
    playRow(body, node.play);
    if (node.play?.[0]) sound(node.play[0].audio);
    if (!node.options) { revealInsight(body, node.insight, node.id); done(); return; }
    registerDebug((ok) => pickOption(body, node, ok));
    const list = optionButtons(node, body, (k) => {
      markOptions(list, k, node.answer);
      record(gradeNode(node, k));
      revealInsight(body, node.insight, node.id);
      refLine(body, node.ref);
      done();
    });
  }
  function feedback(node, body, footer, shell, result, { retry, done, answerText }) {
    const box = el('div', `sideb-feedback ${result.ok ? 'is-ok' : 'is-no'}`);
    box.append(el('strong', '', result.ok ? t.correct : t.wrong));
    if (!result.ok && answerText) box.append(el('p', 'sideb-answer', t.answerWas(answerText)));
    if (node.explain) box.append(el('p', '', tx(node.explain)));
    body.appendChild(box);
    refLine(body, node.ref);
    // 胜利瞬间
    const achieved = loadBreakthroughs();
    const b = breakthroughFor(node, result, achieved);
    if (b) { saveBreakthrough(b.id); session.breakthroughs = [...new Set([...(session.breakthroughs || []), b.id])]; persist(); celebrate(shell, b.text); }
    done();
    if (!result.ok && retry) footer.prepend(btn('learn-btn ghost', t.retry, retry));
  }
  const grade = (node, response) => {
    const result = gradeNode(node, response);
    return node.practice ? { ...result, ungraded: true } : result;
  };
  function renderChoice(node, body, footer, shell, ctx) {
    paragraphs(body, node.prompt);
    const v = visualOf(node.visual); if (v) body.appendChild(v);
    if (node.audio) playRow(body, [{ label: t.play, audio: node.audio }]);
    playRow(body, node.play);
    if (node.type === 'listen' && node.play?.[0]) sound(node.play[0].audio);
    ctx.registerDebug((ok) => pickOption(body, node, ok));
    const list = optionButtons(node, body, (k) => {
      markOptions(list, k, node.answer);
      const result = grade(node, k);
      ctx.record(result);
      feedback(node, body, footer, shell, result, { ...ctx, answerText: tx(node.options[node.answer]), retry: () => renderNode() });
    });
  }
  function renderFill(node, body, footer, shell, ctx) {
    paragraphs(body, node.prompt);
    const picked = [];
    const slots = el('p', 'sideb-fill-slots');
    const bank = el('div', 'sideb-options');
    const paint = () => { slots.textContent = node.answer.map((_, i) => tx(node.bank.find((b) => b.id === picked[i])?.label) || '＿').join('  '); };
    node.bank.forEach((chip) => bank.appendChild(btn('sideb-option', tx(chip.label), () => { if (picked.length < node.answer.length) { picked.push(chip.id); paint(); } })));
    body.append(slots, bank);
    paint();
    ctx.registerDebug((ok) => { picked.length = 0; if (ok) picked.push(...node.answer); paint(); footer.querySelector('.learn-btn.primary')?.dispatchEvent(new globalThis.window.Event('click', { bubbles: true })); });
    footer.replaceChildren(btn('learn-btn ghost', '⌫', () => { picked.pop(); paint(); }), btn('learn-btn primary', t.check, () => {
      const result = grade(node, picked);
      ctx.record(result);
      bank.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      feedback(node, body, footer, shell, result, { ...ctx, answerText: node.answer.map((id) => tx(node.bank.find((b) => b.id === id)?.label)).join(' '), retry: () => renderNode() });
    }));
  }
  function renderDerive(node, body, footer, shell, ctx) {
    paragraphs(body, node.prompt);
    const inputs = node.steps.map((step) => {
      const row = el('label', 'sideb-derive-step');
      const input = el('input');
      input.type = step.kind === 'number' ? 'number' : 'text';
      input.step = 'any';
      row.append(el('span', '', tx(step.label)), input);
      body.appendChild(row);
      return input;
    });
    ctx.registerDebug((ok) => {
      inputs.forEach((input, i) => { input.value = ok ? String([].concat(node.steps[i].answer)[0]) : ''; });
      footer.querySelector('.learn-btn.primary')?.dispatchEvent(new globalThis.window.Event('click', { bubbles: true }));
    });
    footer.replaceChildren(btn('learn-btn primary', t.check, () => {
      const result = grade(node, inputs.map((i) => i.value));
      inputs.forEach((i) => { i.disabled = true; });
      ctx.record(result);
      const answerText = node.steps.map((s) => `${tx(s.label)} ${[].concat(s.answer).map((a) => (typeof a === 'number' ? Math.round(a * 100) / 100 : a)).join(' / ')}`).join('；');
      feedback(node, body, footer, shell, result, { ...ctx, answerText, retry: () => renderNode() });
    }));
  }
  function renderTap(node, body, footer, shell, ctx) {
    paragraphs(body, node.prompt);
    footer.replaceChildren();
    const finish = (response) => {
      const result = grade(node, response);
      ctx.record(result);
      feedback(node, body, footer, shell, result, { ...ctx, retry: null });
    };
    const pad = tapPad(body, node, { playChord, onResult: finish });
    stops.push(pad.destroy);
    // 调试：正好打在每个起音上，或者一下都不打
    const ms = (beats) => beats.map((b) => (b * 60000) / (node.bpm || 60));
    ctx.registerDebug((ok) => { pad.destroy(); finish(ok ? { left: ms(node.hands.left), right: ms(node.hands.right) } : { left: [], right: [] }); });
  }
  function renderExperiment(node, body, shell, done) {
    paragraphs(body, node.prompt);
    const solved = () => {
      const b = node.breakthrough && !loadBreakthroughs().includes(node.breakthrough.id) ? node.breakthrough : null;
      if (b) { saveBreakthrough(b.id); session.breakthroughs = [...new Set([...(session.breakthroughs || []), b.id])]; persist(); celebrate(shell, b.text); }
    };
    let toy = null;
    const TOYS = { spell: spellToy, meter: meterToy, interval: intervalToy, scale: scaleToy, texture: textureToy, poly: polyToy, chord: chordToy, keyChords: keyChordsToy, progression: progressionToy, plr: plrToy, keyRel: keyRelToy, transpose: transposeToy, fret: fretToy, nct: nctToy, species: speciesToy, canon: canonToy, swing: swingToy, blues: bluesToy, chordScale: chordScaleToy, guide: guideToy, negative: negativeToy, xuangong: xuangongToy, world: worldToy, harmonics: harmonicsToy, temper: temperToy, pc: pcToy, collection: collectionToy, set: setToy, matrix: matrixToy, ji: jiToy };
    if (node.toy === 'satb') toy = satbToy(body, node.params, { playChord, onSolved: solved });
    else if (TOYS[node.toy]) toy = TOYS[node.toy](body, node.params, { playChord, renderVisual, onSolved: solved });
    if (toy?.destroy) stops.push(toy.destroy);
    const tool = node.tool || levelTools(level)[0];
    if (tool && openTool) body.appendChild(toolChip(tool, t.toolPlay(toolName(tool.feature)), 'learn-link sideb-tool-link'));
    refLine(body, node.ref);
    done();
  }
  function renderLab(node, body, footer) {
    const spec = LABS[node.lab];
    title(body, spec?.title);
    paragraphs(body, spec?.brief);
    // 考试里的实操按自己的模式（章节测试 / EX）单独计成绩、单独设门槛
    const mode = node.mode || 'level';
    const best = bestLabResults()[labResultKey(node.lab, mode)];
    const line = LAB_LINES[mode] ?? LAB_LINES.level;
    body.appendChild(el('p', 'sideb-lab-line', t.labLine(pct(line))));
    const status = el('div', 'sideb-lab-status');
    if (best) {
      const meter = el('div', 'lab-score');
      const barEl = el('div', 'lab-score-bar');
      const fill = el('span', 'lab-score-fill');
      fill.style.width = `${best.score}%`;
      const mark = el('span', 'lab-score-mark');
      mark.style.left = `${line * 100}%`;
      barEl.append(fill, mark);
      meter.append(el('span', 'lab-score-label', t.labBest(Math.round(best.score))), barEl);
      status.appendChild(meter);
      const items = el('ul', 'lab-items');
      (best.items || []).forEach((i) => {
        const li = el('li', `lab-item ${i.points >= i.max - 1e-9 ? 'is-ok' : i.points > 0 ? 'is-partial' : 'is-fail'}`);
        const row = el('div', 'lab-item-row');
        row.append(el('span', 'lab-item-label', tx(i.label)), el('span', 'lab-item-points', `${Math.round(i.points * 10) / 10}/${Math.round(i.max * 10) / 10}`));
        li.appendChild(row);
        items.appendChild(li);
      });
      status.appendChild(items);
    } else status.appendChild(el('p', 'sideb-lab-none', t.labNone));
    body.appendChild(status);
    const go = () => { persist(); globalThis.location.hash = labHref(spec, mode); };
    footer.replaceChildren(btn(`learn-btn ${best ? 'ghost' : 'primary'}`, best ? t.labAgain : t.labOpen, go));
    if (best) footer.appendChild(btn('learn-btn primary', t.labDone, () => advance()));
  }

  // ---------------- 结算 ----------------
  function finishLevel() {
    const summary = summarizeB(session, lvl, bestLabResults(), { context: 'level' });
    const before = progressView().units[bKey(level.id)]?.done;
    // 通过 Side-B Final 发毕业证书，通过 EX Final 发优秀毕业证书
    if (summary.passed && (level.exam === 'final' || level.exam === 'final-ex')) awardCert(level.exam, { score: summary.score, grade: summary.grade });
    saveProgress(completeBLevel(loadProgress(), level.id, summary, { seen: session.seen }));
    saveMastery(mergeMastery(loadMastery(), level.id, summary.skills));
    const result = { summary, firstClear: summary.passed && !before };
    session = { ...session, result };
    if (summary.passed) forget(); else persist();
    renderResults(result);
    // 两个 Final 通过：全屏毕业动画（EX 更华丽），结束后留在结算页（下面就是证书）
    if (summary.passed && isFinal(level)) graduationShow(level.exam, loadCerts()[level.exam], { lang: lang(), onDone: () => root.querySelector('.sideb-cert-wrap')?.scrollIntoView?.({ behavior: 'smooth', block: 'start' }) });
  }
  const isFinal = (lv) => lv?.exam === 'final' || lv?.exam === 'final-ex';
  const certChapters = () => B_CHAPTERS.map((c) => ({ code: c.code, title: tx(c.title) }));
  /** 从 Final 页打开证书（单独一页，带返回） */
  function renderCert(kind) {
    redraw = () => renderCert(kind);
    stopAll();
    root.replaceChildren();
    const shell = el('div', 'sideb-results sideb-cert-page is-clear');
    shell.appendChild(certificate(kind, loadCerts()[kind], { chapters: certChapters(), lang: lang() }));
    const actions = el('div', 'sideb-results-actions');
    actions.appendChild(btn('learn-btn ghost', t.backMap, () => renderMap()));
    shell.appendChild(actions);
    root.appendChild(shell);
  }
  function renderResults({ summary, firstClear, recovered = false }) {
    redraw = () => renderResults({ summary, firstClear, recovered });
    stopAll();
    root.replaceChildren();
    const shell = el('div', `sideb-results ${toneOf(level.chapter)}${summary.passed || recovered ? ' is-clear' : ''}`);
    const head = el('div', 'sideb-results-head');
    head.append(el('span', 'sideb-kicker', `${codeOf(level)} · ${tx(level.title)}`), el('h3', 'sideb-results-title', summary.passed || recovered ? t.clear : t.notYet));
    if (recovered) head.appendChild(el('span', 'sideb-tag', t.recoveredTag));
    if (firstClear) head.appendChild(el('span', 'sideb-tag is-core', t.firstClear));
    const ring = el('div', 'sideb-score-ring');
    ring.style.setProperty('--p', pct(summary.score));
    ring.append(el('strong', '', `${pct(summary.score)}%`), el('span', '', t.score));
    head.appendChild(ring);
    head.appendChild(el('p', `sideb-grade is-${(summary.grade || gradeOf(summary.score, summary.passed)).replace('+', 'plus')}`, summary.grade || gradeOf(summary.score, summary.passed)));
    head.appendChild(el('p', 'sideb-passline', t.passLine(pct(PASS_LINE))));
    shell.appendChild(head);
    const parts = el('div', 'sideb-parts');
    const part = (label, value, line) => {
      const row = el('div', 'sideb-part');
      const barEl = el('span', 'sideb-skill-bar');
      const fill = el('span', 'sideb-skill-fill');
      fill.style.width = `${pct(value)}%`;
      barEl.appendChild(fill);
      if (line) { const mark = el('span', 'sideb-skill-mark'); mark.style.left = `${line * 100}%`; barEl.appendChild(mark); }
      row.append(el('span', 'sideb-skill-name', label), barEl, el('span', 'sideb-skill-num', `${pct(value)}%`));
      return row;
    };
    parts.appendChild(part(t.challenge, summary.challenge));
    summary.labs.forEach((l) => parts.appendChild(part(`${t.lab} · ${tx(LABS[l.id]?.title)}`, l.score, l.line)));
    shell.appendChild(parts);
    const grid = el('div', 'sideb-results-grid');
    const skills = Object.fromEntries(Object.entries(summary.skills).filter(([, v]) => v.total).map(([s, v]) => [s, v.got / v.total]));
    grid.append(masteryBars(skills, t.skillsTitle), masteryBars(overallMastery(loadMastery()), t.masteryTitle));
    shell.appendChild(grid);
    if (session.breakthroughs?.length) {
      const box = el('div', 'sideb-breaks');
      box.appendChild(el('p', 'sideb-mastery-title', t.breakthroughs));
      const all = [...Object.values(lvl.sections).flat(), ...summary.labs.map((l) => ({ breakthrough: LABS[l.id]?.breakthrough }))];
      session.breakthroughs.forEach((id) => { const b = all.find((n) => n.breakthrough?.id === id)?.breakthrough; if (b) box.appendChild(el('p', 'sideb-break', tx(b.text))); });
      shell.appendChild(box);
    }
    if (summary.passed && (level.exam === 'final' || level.exam === 'final-ex') && loadCerts()[level.exam]) shell.appendChild(certificate(level.exam, loadCerts()[level.exam], { chapters: certChapters(), lang: lang() }));
    const recs = recommend(summary.errors).slice(0, 4);
    if (recs.length) {
      const box = el('div', 'sideb-recs');
      box.appendChild(el('p', 'sideb-mastery-title', t.errorsTitle));
      recs.forEach((r) => {
        const row = el('div', 'sideb-rec');
        row.append(el('strong', '', `${tx(r.label)} ×${r.count}`), el('span', '', tx(r.advice)));
        if (r.go?.a) row.appendChild(btn('sideb-chip', `A · ${aTitle(r.go.a)}`, () => openA?.(r.go.a)));
        if (r.go?.tool?.feature && openTool) row.appendChild(toolChip(r.go.tool, toolName(r.go.tool.feature)));
        if (r.go?.b && levelById(r.go.b) && isPlayable(levelById(r.go.b)) && r.go.b !== level.id) row.appendChild(btn('sideb-chip', r.go.b, () => startLevel(r.go.b)));
        box.appendChild(row);
      });
      shell.appendChild(box);
    }
    const actions = el('div', 'sideb-results-actions');
    if (level.exam) {
      // 考试：没过就换一套题重考（实操成绩保留，没过线的实操回去改）；过了回地图
      if (!summary.passed) {
        const lab = summary.labs.find((l) => !l.ok);
        if (lab) actions.appendChild(btn('learn-btn primary', t.reviseLab, () => { const li = levelSections(lvl).indexOf('lab'); session = { ...session, result: null, section: li, node: Math.max(0, (lvl.sections.lab || []).findIndex((n) => n.lab === lab.id)) }; persist(); globalThis.location.hash = labHref(LABS[lab.id], lab.mode || 'chapter'); }));
        actions.appendChild(btn(`learn-btn ${lab ? 'ghost' : 'primary'}`, t.examRetry, () => { const prev = session; level = lookupLevel(level.id); lvl = levelForAttempt(level, (prev.attempt || 0) + 1); session = retrySession(lvl, prev); session.breakthroughs = []; persist(); renderNode(); }));
      } else actions.appendChild(btn('learn-btn ghost', t.examRetry, () => { const prev = session; level = lookupLevel(level.id); lvl = levelForAttempt(level, (prev.attempt || 0) + 1); session = retrySession(lvl, prev); session.breakthroughs = []; persist(); renderNode(); }));
    } else if (summary.passed || recovered) {
      const list = playable();
      const next = list[list.findIndex((x) => x.id === (level.base || level.id)) + 1];
      // 普通关通过后：扩展关已开放就给入口；扩展关通过后：可以回到所属的关卡
      if (next) actions.appendChild(btn('learn-btn primary', t.nextLevel(`${next.id} ${tx(next.title)}`), () => startLevel(next.id)));
      const x = !level.ext && extLevelById(`${level.id}x`);
      if (x) actions.appendChild(btn('learn-btn ghost', `${t.ext} · ${level.id}`, () => startLevel(x.id)));
      actions.appendChild(btn('learn-btn ghost', t.retryStars, () => { const prev = session; level = lookupLevel(level.id); lvl = levelForAttempt(level, (prev.attempt || 0) + 1); session = retrySession(lvl, prev); session.breakthroughs = []; persist(); renderNode(); }));
    } else if (summary.next === 'revise-lab') {
      shell.appendChild(el('p', 'sideb-weak', t.labLineFail(pct(LAB_LINES.level))));
      const lab = summary.labs.find((l) => !l.ok);
      actions.appendChild(btn('learn-btn primary', t.reviseLab, () => { const li = levelSections(lvl).indexOf('lab'); session = { ...session, result: null, section: li, node: Math.max(0, (lvl.sections.lab || []).findIndex((n) => n.lab === lab?.id)) }; persist(); globalThis.location.hash = labHref(LABS[lab.id], 'level'); }));
    } else {
      const recovery = buildRecovery(level, summary, { attempt: (session.recoveryAttempt || 0) + 1 });
      shell.appendChild(el('p', 'sideb-weak', t.weakLine(summary.weak.map((s) => tx(SKILL_NAMES[s])).join(lang() === 'en' ? ', ' : '、'))));
      if (recovery) actions.appendChild(btn('learn-btn primary', t.recoveryBtn(recovery.nodes.length), () => { session = { ...startRecovery({ ...session, result: null, summary }, recovery), recoveryAttempt: (session.recoveryAttempt || 0) + 1 }; persist(); renderRecovery(); }));
      else actions.appendChild(btn('learn-btn primary', t.retryStars, () => { const prev = session; lvl = levelForAttempt(level, (prev.attempt || 0) + 1); session = retrySession(lvl, prev); session.breakthroughs = []; persist(); renderNode(); }));
    }
    actions.appendChild(btn('learn-btn ghost', t.backMap, () => renderMap()));
    shell.appendChild(actions);
    root.appendChild(shell);
    if ((summary.passed || recovered) && !isFinal(level)) celebrateClear(shell);
    else if (summary.passed) shell.classList.add('is-celebrating');
  }
  function celebrateClear(shell) {
    shell.classList.add('is-celebrating');
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => setTimeout(() => playChord?.([f], 0.6, { interrupt: i === 0 }), i * 120));
  }

  // ---------------- 补弱挑战 ----------------
  function renderRecovery() {
    redraw = renderRecovery;
    const r = session.recovery;
    const node = r.nodes[r.node];
    if (!node) { finishRecovery(); return; }
    const { shell, body, footer } = frame({ sectionName: 'recovery', index: r.node, total: r.nodes.length });
    body.appendChild(el('p', 'sideb-recovery-head', `${t.recoveryTitle} · ${t.stepOf(r.node + 1, r.nodes.length)}`));
    const nextBtn = btn('learn-btn primary', t.next, () => renderRecovery());
    let answered = false;
    let answerNow = null;
    renderBody(node, body, footer, shell, {
      done: () => footer.replaceChildren(nextBtn),
      record: (result) => { answered = true; session = recordRecovery(session, node, result); persist(); },
      registerDebug: (fn) => { answerNow = fn; },
    });
    toolHelp(node, body);
    if (debugOn()) {
      const skip = () => { session = { ...session, recovery: { ...session.recovery, node: session.recovery.node + 1 } }; persist(); renderRecovery(); };
      body.before(debugBar(node, { skip, recovering: true, answerNow: answerNow && ((ok) => { if (!answered) answerNow(ok); }) }));
    }
  }
  function finishRecovery() {
    const res = recoveryResult(session);
    const summary = session.summary;
    if (res.passed) {
      saveProgress(completeBLevel(loadProgress(), level.id, summary, { recovered: true, seen: session.seen }));
      forget();
      session = { ...session, recovery: null };
      renderResults({ summary, recovered: true });
      return;
    }
    stopAll();
    root.replaceChildren();
    const shell = el('div', `sideb-results ${toneOf(level.chapter)}`);
    shell.append(el('h3', 'sideb-results-title', t.notYet), el('p', 'sideb-weak', t.recoveryFailed));
    const actions = el('div', 'sideb-results-actions');
    const again = buildRecovery(level, summary, { attempt: (session.recoveryAttempt || 0) + 1 });
    if (again) actions.appendChild(btn('learn-btn primary', t.again, () => { session = { ...startRecovery(session, again), recoveryAttempt: (session.recoveryAttempt || 0) + 1 }; persist(); renderRecovery(); }));
    actions.appendChild(btn('learn-btn ghost', t.backMap, () => { persist(); renderMap(); }));
    shell.appendChild(actions);
    root.appendChild(shell);
  }

  renderMap();
  return { renderMap, refresh: () => redraw(), openLevel: (id) => (lookupLevel(id) && levelOpen(lookupLevel(id)) ? startLevel(id) : renderMap()), resume, labReturn, stop: stopAll, get session() { return session; } };
}

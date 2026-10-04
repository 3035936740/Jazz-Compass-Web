// 乐理闯关界面：关卡地图（主关 + 进阶分支 + 综合测验 + 结业挑战）、关卡播放器（引导卡 / 选择 / 填空 / 连线）、
// 图示、提示与解析、去工具里看看（带学习记录，回来时还是同一题）、结算
// 题目与依据见 learn_content.js / learn_units_*.js / learn_branches_*.js；生成题见 learn_generators.js；规则见 learn_engine.js
import { UNITS, SECTIONS, SIDES } from './learn_content.js?v=20261005-p3';
import {
  createSession, currentItem, answer, advance, isFinished, progressRatio, loadProgress, saveProgress, completeUnit, isUnlocked, nextUnitIndex, shuffle,
  levelKey, parseLevelKey, isLevelUnlocked, isDone, MIX_SLOT, buildMixedCards, buildFinalCards, FINAL_KEY, FINAL_EX_KEY, finalUnlocked, finalExUnlocked,
  buildChapterCards, chapterKey, parseChapterKey, chapterUnlocked, chapterExUnlocked,
  saveResume, loadResume, clearResume, unitLevelKeys, setLevelStars, emptyProgress,
  loadReview, saveReview, recordMistake, recordReviewAnswer, dueReview, exportProgress, importProgress, starsFor, isSideLevelUnlocked, unitFullyDone,
} from './learn_engine.js?v=20261005-q1';
import { expandCards } from './learn_generators.js?v=20261005-q1';
import { worksheetHTML, openWorksheet, printable } from './worksheet.js?v=20261004-y1';
import { renderVisual } from './learn_visuals.js?v=20261004-m5';
import { el, button, language, midiToFrequency, cite } from './module_kit.js';
import { icon, withIcon } from './ui_icons.js?v=20261003-i2';
import { playFeedbackSound, sfxEnabled, setSfxEnabled } from './learn_sfx.js?v=20261003-x3';

// ---------- 调试模式：在浏览器控制台输入 class_debug(true) 打开，class_debug(false) 关闭（记在 localStorage） ----------
const DEBUG_KEY = 'jc-learn-debug';
const debugListeners = new Set();
export function debugEnabled() {
  try { return globalThis.localStorage?.getItem(DEBUG_KEY) === '1'; } catch (_) { return false; }
}
if (globalThis.window) {
  globalThis.window.class_debug = (on = true) => {
    try { if (on) globalThis.localStorage.setItem(DEBUG_KEY, '1'); else globalThis.localStorage.removeItem(DEBUG_KEY); } catch (_) { /* ignore */ }
    debugListeners.forEach((listener) => listener());
    return on ? 'Theory Quest debug: ON' : 'Theory Quest debug: OFF';
  };
}
const DEBUG_TEXT = {
  zh: { title: '调试模式', note: '控制台输入 class_debug(false) 关闭', chapter: (name, n) => `${name} 全部 ${n} 星`, all3: '一键通关所有（全部 3 星）', clear: '一键清空所有记录', off: '关闭调试', skip: '跳过这题', right: '直接做对', wrong: '直接做错', cleared: '已清空', confirmClear: '确定清空所有闯关记录？' },
  ja: { title: 'デバッグモード', note: 'コンソールで class_debug(false) で終了', chapter: (name, n) => `${name} をすべて星 ${n}`, all3: 'すべてクリア（全部星 3）', clear: '記録をすべて消去', off: 'デバッグ終了', skip: 'この問題をスキップ', right: '正解にする', wrong: '不正解にする', cleared: '消去しました', confirmClear: 'すべての記録を消去しますか？' },
  en: { title: 'Debug mode', note: 'Run class_debug(false) in the console to leave', chapter: (name, n) => `${name}: all ${n}★`, all3: 'Clear everything (all 3★)', clear: 'Erase all records', off: 'Leave debug', skip: 'Skip this card', right: 'Answer correctly', wrong: 'Answer wrongly', cleared: 'Erased', confirmClear: 'Erase every Theory Quest record?' },
};

const TEXT = {
  zh: {
    title: '乐理闯关', subtitle: '一关只要几分钟。每个关卡下面还有 4 个进阶关和 1 个综合测验；看不懂工具时，来这里玩一关就明白了。',
    streak: (n) => `连续 ${n} 天`, stars: (n) => `${n} 颗星`, xp: (n) => `${n} 经验`, done: (a, b) => `主关已完成 ${a} / ${b}`, branchDone: (a, b) => `进阶 ${a} / ${b}`,
    sideB: '翻面 · Side-B',
    continue: '继续闯关', start: '开始', replay: '再玩一次', locked: '先完成前一关就能解锁', unlockAll: '我有基础，全部解锁', relock: '恢复按顺序解锁',
    tool: (name) => `去工具：${name}`, openTool: (name) => `打开「${name}」看看`, close: '退出', sfxOn: '答题音效：开（点一下关闭）', sfxOff: '答题音效：关（点一下打开）', check: '检查', next: '继续', more: '嗯，然后呢？', gotIt: '明白了，继续',
    hint: '提示', explain: '看解析', right: ['答对了！', '漂亮！', '没错！', '很棒！'], wrong: '差一点——答案是：', why: '为什么？',
    play: '听一听', tapToPair: '先点左边，再点右边，把它们连起来。', tapToFill: '点下面的词填进空格，点空格可以撤回。',
    retryTitle: '再练一次', finishTitle: '过关！', earned: (stars, xp) => `获得 ${'★'.repeat(stars)}${'☆'.repeat(3 - stars)} · ${xp} 经验`,
    nextUnit: '下一关', backToMap: '回到地图', source: '依据', tryTool: '去工具里试试', allDone: '主关全部通关！进阶分支和结业挑战还在等你。',
    main: '主关', adv: (n) => `进阶 ${n}`, mix: '综合测验', mixBlurb: '12 题：从 4 个进阶关里随机抽 10 题，再加 2 道主关题，每次都重新抽。', branchLocked: '先完成主关，再按顺序解锁进阶关',
    chapterTest: '章节测试', chapterTestEx: 'EX 章节测试', chapterBlurb: (name) => `${name}的章节测试：随机抽 20 道，18 道主关题、2 道进阶题，不含支线。每次都不一样，中途离开会自动保存进度。`, chapterLocked: '通关本章全部主关后开放',
    chapterExBlurb: (name) => `${name}的 EX 章节测试：随机抽 30 道，25 道进阶题（包括本章的支线大关卡）、5 道主关题，覆盖本章全部内容。`, chapterExLocked: '通关本章所有关卡（主关、进阶 1–4、综合测验、本章的支线）和章节测试后开放',
    goal: '终点', final: '结业挑战', finalBlurb: '从所有主线关卡里随机抽 50 道：44 道主关题、6 道进阶题，不含支线，每次都不一样。中途离开会自动保存进度。', finalLocked: '完成全部主关后开放',
    finalEx: 'EX 结业挑战', finalExBlurb: '随机抽 50 道：45 道进阶题（包括所有支线大关卡）、5 道主关题。通关全部进阶分支、全部支线和结业挑战后开放。', finalExLocked: '通关全部进阶分支、全部支线与结业挑战后开放',
    side: '支线', sideDone: (a, b) => `支线 ${a} / ${b}`, sideLocked: (parent) => `把「${parent}」的主关、进阶 1–4 和综合测验全部通关后开放`, sideNote: '支线大关卡：不影响主线和普通结业挑战，EX 结业挑战需要全部支线通关。',
    printSheet: '打印练习卷（含答案）', reviewTitle: '复习错题', reviewButton: (due, all) => (due ? `复习错题 · ${due} 道到期` : `复习错题 · 共 ${all} 道`), reviewHint: (all, due) => `错题本里有 ${all} 道题，${due} 道今天该复习了。答对四次就会移出。`, reviewDone: '复习完成', reviewLeft: (n) => (n ? `错题本里还有 ${n} 道` : '错题本清空了！'),
    exportProgress: '导出进度', importProgress: '导入进度', imported: '进度已导入', importFailed: '这个文件不是乐理闯关的进度文件',
    celebrateFinal: '结业！', celebrateFinalSub: (n) => `${n} 个主关的知识，你都走过了一遍。`, celebrateClose: '继续',
    exLines: ['EX 结业挑战 · 通关', '从五线谱、音程，到和声、对位、爵士、世界音乐和二十世纪……', '这张地图，你已经走完了。', '但是——'], exFinale: '乐理远不止于此', exClose: '继续探索',
    question: (a, b) => `第 ${a} / ${b} 题`, chapters: '章节', resumeLabel: (title, a, b) => `继续没做完的：${title}（第 ${a} / ${b} 题）`, toolNote: '看完工具后，点页面上方的「回到教程」就会回到这一题。',
  },
  ja: {
    title: '音楽理論チャレンジ', subtitle: '1 ステージ数分。各ステージには 4 つの発展ステージと総合テストがあります。ツールがわからないときは、ここで 1 つ遊べばすぐわかります。',
    streak: (n) => `${n} 日連続`, stars: (n) => `星 ${n}`, xp: (n) => `${n} XP`, done: (a, b) => `メイン ${a} / ${b} クリア`, branchDone: (a, b) => `発展 ${a} / ${b}`,
    sideB: '裏返す · Side-B',
    continue: '続きから', start: 'スタート', replay: 'もう一度', locked: '前のステージをクリアすると解放', unlockAll: '経験者なのですべて解放', relock: '順番どおりに戻す',
    tool: (name) => `ツールへ：${name}`, openTool: (name) => `「${name}」を開いてみる`, close: '終了', sfxOn: '効果音：オン（クリックでオフ）', sfxOff: '効果音：オフ（クリックでオン）', check: 'チェック', next: '次へ', more: 'うん、それで？', gotIt: 'わかった、次へ',
    hint: 'ヒント', explain: '解説を見る', right: ['正解！', 'すばらしい！', 'その通り！', 'お見事！'], wrong: 'おしい——正解は：', why: 'どうして？',
    play: '聴いてみる', tapToPair: '左をタップしてから右をタップしてつなげよう。', tapToFill: '下の言葉をタップして空欄へ。空欄をタップで戻せます。',
    retryTitle: 'もう一度練習', finishTitle: 'クリア！', earned: (stars, xp) => `${'★'.repeat(stars)}${'☆'.repeat(3 - stars)} · ${xp} XP 獲得`,
    nextUnit: '次のステージ', backToMap: 'マップへ', source: '出典', tryTool: 'ツールで試す', allDone: 'メインを全クリア！発展ステージと修了チャレンジが待っています。',
    main: 'メイン', adv: (n) => `発展 ${n}`, mix: '総合テスト', mixBlurb: '12 問：4 つの発展ステージからランダムに 10 問、メインから 2 問。毎回抽選し直します。', branchLocked: 'メインをクリアすると順に解放',
    chapterTest: '章末テスト', chapterTestEx: 'EX 章末テスト', chapterBlurb: (name) => `${name}の章末テスト：ランダムに 20 問、メイン 18 問・発展 2 問（支線は含まない）。毎回変わり、途中でやめても保存されます。`, chapterLocked: 'この章のメインを全クリアすると解放',
    chapterExBlurb: (name) => `${name}の EX 章末テスト：ランダムに 30 問、発展 25 問（この章の支線を含む）・メイン 5 問。この章の内容をすべて含みます。`, chapterExLocked: 'この章のすべてのステージ（メイン・発展 1–4・総合テスト・支線）と章末テストをクリアすると解放',
    goal: 'ゴール', final: '修了チャレンジ', finalBlurb: 'メインルートの全ステージからランダムに 50 問：メイン 44 問・発展 6 問（支線は含まない）。毎回変わります。途中でやめても進み具合は保存されます。', finalLocked: 'メインを全クリアすると解放',
    finalEx: 'EX 修了チャレンジ', finalExBlurb: 'ランダムに 50 問：発展 45 問（すべての支線を含む）・メイン 5 問。発展・支線・修了チャレンジを全クリアすると解放。', finalExLocked: '発展・すべての支線・修了チャレンジを全クリアすると解放',
    side: '支線', sideDone: (a, b) => `支線 ${a} / ${b}`, sideLocked: (parent) => `「${parent}」のメイン・発展 1–4・総合テストを全クリアすると解放`, sideNote: '支線ステージ：メインルートと通常の修了チャレンジには影響しません。EX 修了チャレンジにはすべての支線のクリアが必要です。',
    printSheet: '練習プリントを印刷（解答つき）', reviewTitle: 'まちがえた問題の復習', reviewButton: (due, all) => (due ? `復習 · 今日 ${due} 問` : `復習 · 全 ${all} 問`), reviewHint: (all, due) => `復習ノートに ${all} 問、今日の分は ${due} 問。4 回正解すると外れます。`, reviewDone: '復習おわり', reviewLeft: (n) => (n ? `復習ノートの残り ${n} 問` : '復習ノートが空になりました！'),
    exportProgress: '進み具合を書き出す', importProgress: '進み具合を読み込む', imported: '進み具合を読み込みました', importFailed: 'このファイルは音楽理論チャレンジの進み具合ではありません',
    celebrateFinal: '修了！', celebrateFinalSub: (n) => `${n} のメインステージをすべて歩き切りました。`, celebrateClose: '続ける',
    exLines: ['EX 修了チャレンジ · クリア', '五線譜と音程から、和声・対位法・ジャズ・世界の音楽・20 世紀まで……', 'この地図は、もう最後まで歩きました。', 'でも——'], exFinale: '音楽理論は、これだけではない', exClose: 'さらに探検する',
    question: (a, b) => `${a} / ${b} 問目`, chapters: '章', resumeLabel: (title, a, b) => `途中から再開：${title}（${a} / ${b} 問目）`, toolNote: 'ツールを見たら、ページ上部の「チュートリアルに戻る」でこの問題に戻れます。',
  },
  en: {
    title: 'Theory Quest', subtitle: 'Each level takes a few minutes, and each has 4 advanced levels plus a mixed test. Stuck on a tool? Play a level here and it will click.',
    streak: (n) => `${n}-day streak`, stars: (n) => `${n} stars`, xp: (n) => `${n} XP`, done: (a, b) => `${a} / ${b} main levels`, branchDone: (a, b) => `Advanced ${a} / ${b}`,
    sideB: 'Flip to Side-B',
    continue: 'Continue', start: 'Start', replay: 'Play again', locked: 'Finish the previous level to unlock', unlockAll: 'I know the basics — unlock all', relock: 'Back to step-by-step',
    tool: (name) => `Open tool: ${name}`, openTool: (name) => `Open “${name}” to see it`, close: 'Quit', sfxOn: 'Answer sounds: on (click to mute)', sfxOff: 'Answer sounds: off (click to turn on)', check: 'Check', next: 'Continue', more: 'And then?', gotIt: 'Got it, continue',
    hint: 'Hint', explain: 'Explanation', right: ['Correct!', 'Nice!', 'Exactly!', 'Great!'], wrong: 'Almost — the answer is:', why: 'Why?',
    play: 'Listen', tapToPair: 'Tap a left tile, then a right tile, to connect them.', tapToFill: 'Tap a word to fill the next blank; tap a blank to undo.',
    retryTitle: 'One more try', finishTitle: 'Level complete!', earned: (stars, xp) => `Earned ${'★'.repeat(stars)}${'☆'.repeat(3 - stars)} · ${xp} XP`,
    nextUnit: 'Next level', backToMap: 'Back to map', source: 'Source', tryTool: 'Try it in the tool', allDone: 'All main levels cleared! The advanced branches and the final challenge await.',
    main: 'Main', adv: (n) => `Advanced ${n}`, mix: 'Mixed test', mixBlurb: '12 questions: 10 drawn at random from the 4 advanced levels plus 2 from the main level, redrawn every time.', branchLocked: 'Clear the main level, then unlock these in order',
    chapterTest: 'Chapter test', chapterTestEx: 'EX chapter test', chapterBlurb: (name) => `Chapter test for ${name}: 20 random questions, 18 main and 2 advanced, no side quests. Different each time; leaving midway saves your place.`, chapterLocked: 'Opens after every main level in this chapter',
    chapterExBlurb: (name) => `EX chapter test for ${name}: 30 random questions, 25 advanced (this chapter's side quests included) and 5 main, covering the whole chapter.`, chapterExLocked: 'Opens after every level in this chapter (main, advanced 1–4, mixed tests, side quests) and the chapter test',
    goal: 'Finish line', final: 'Final challenge', finalBlurb: '50 random questions from the main route — 44 main, 6 advanced, no side quests, different each time. Leaving midway saves your place.', finalLocked: 'Opens after every main level',
    finalEx: 'EX final challenge', finalExBlurb: '50 random questions: 45 advanced (side quests included) and 5 main. Opens after every branch, every side quest and the final challenge.', finalExLocked: 'Opens after every branch, every side quest and the final challenge',
    side: 'Side quest', sideDone: (a, b) => `Side quests ${a} / ${b}`, sideLocked: (parent) => `Opens after clearing all of “${parent}”: main level, advanced 1–4 and the mixed test`, sideNote: 'Side quest: it does not affect the main route or the normal final; the EX final needs every side quest.',
    printSheet: 'Print a worksheet (with answers)', reviewTitle: 'Review mistakes', reviewButton: (due, all) => (due ? `Review · ${due} due` : `Review · ${all} saved`), reviewHint: (all, due) => `${all} questions in your review box, ${due} due today. Answer one right four times and it leaves.`, reviewDone: 'Review finished', reviewLeft: (n) => (n ? `${n} left in the review box` : 'Review box is empty!'),
    exportProgress: 'Export progress', importProgress: 'Import progress', imported: 'Progress imported', importFailed: 'This is not a Theory Quest progress file',
    celebrateFinal: 'Graduated!', celebrateFinalSub: (n) => `You have walked through all ${n} main levels.`, celebrateClose: 'Continue',
    exLines: ['EX final challenge · cleared', 'From the staff and intervals to harmony, counterpoint, jazz, world music and the twentieth century…', 'You have walked this whole map.', 'But —'], exFinale: 'Music theory goes far beyond this', exClose: 'Keep exploring',
    question: (a, b) => `Question ${a} / ${b}`, chapters: 'Chapters', resumeLabel: (title, a, b) => `Resume: ${title} (question ${a} / ${b})`, toolNote: 'After looking at the tool, press “Back to tutorial” at the top of the page to return to this question.',
  },
};

/** 本模块引用的全部资料（用于脚注编号；生成题的资料在第一次出现时追加） */
const SOURCES = [...new Set(UNITS.flatMap((u) => [u.cards, ...(u.branch || []).map((l) => l.cards)].flat().flatMap((c) => [].concat(c.ref ?? []))))];
const sourceList = (id) => { if (!SOURCES.includes(id)) SOURCES.push(id); return SOURCES; };

const PAIR_COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6', '#ef4444'];
const WHITE = [0, 2, 4, 5, 7, 9, 11];
const MELODY_STEP = 300;
const CHORD_STEP = 820;

export function mountLearn(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  const tx = (v) => (typeof v === 'string' ? v : v?.[lang] ?? v?.en ?? '');
  let progress = loadProgress();
  let review = loadReview();
  const REVIEW_KEY_LEVEL = 'review';
  let timers = [];
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  // 离开学习页（切到别的面板）：停止声音，并关掉挂在 body 上的选关卡片（否则"开始"按钮会留在别的页面上）
  target.addEventListener('toolbox-stop', () => { stop(); closeSheets(); });
  const toolName = (feature) => globalThis.window?.__?.(`nav_${feature}`) || feature;
  const refLinks = (card) => [].concat(card.ref ?? []).map((id) => cite(sourceList(id), id));
  const notifyResume = () => globalThis.window?.dispatchEvent?.(new globalThis.window.CustomEvent('learn-resume-change'));

  /** 播放：melody 依次（较快）、harmonic/chord 同时、chords 依次播放和弦；chord 字段在旋律之后补一个和弦 */
  function playAudio(audio) {
    stop();
    if (!audio) return;
    const freqs = (list) => list.map(midiToFrequency);
    if (audio.mode === 'harmonic' || audio.mode === 'chord') { playChord(freqs(audio.notes), 1.6); return; }
    const isChords = audio.mode === 'chords';
    const steps = isChords ? audio.notes : audio.notes.map((n) => [n]);
    const gap = isChords ? CHORD_STEP : MELODY_STEP;
    // 带节奏的旋律（工具送来的听写错题）：beats 是每个音的拍数，null 的音是休止
    if (Array.isArray(audio.beats)) {
      const beat = 60000 / (audio.bpm || 90);
      let at = 0;
      steps.forEach((notes, i) => {
        const length = audio.beats[i] ?? 1;
        if (notes.length && notes[0] !== null) timers.push(setTimeout(() => playChord(freqs(notes), Math.max(0.15, (length * beat * 0.9) / 1000), { interrupt: i === 0 }), at));
        at += length * beat;
      });
      return;
    }
    steps.forEach((notes, i) => timers.push(setTimeout(() => playChord(freqs(notes), isChords ? 1.1 : 0.42, { interrupt: i === 0 }), i * gap)));
    if (audio.chord) timers.push(setTimeout(() => playChord(freqs(audio.chord), 1.8, { interrupt: false }), steps.length * gap + 120));
  }
  /** 引导卡示范：全是单音时按旋律速度播放 */
  const playDemo = (demo) => {
    const single = demo.play.every((step) => step.length === 1);
    playAudio(single ? { mode: 'melody', notes: demo.play.map((s) => s[0]), chord: demo.chord } : { mode: 'chords', notes: demo.play, chord: demo.chord });
  };

  /** 打乱顺序；若结果仍"太像答案"（如与答案顺序相同）就重洗几次 */
  function shuffleAway(items, tooEasy) {
    let out = shuffle(items);
    for (let tries = 0; tries < 8 && items.length > 1 && tooEasy(out); tries += 1) out = shuffle(items);
    return out;
  }

  /** 小键盘：覆盖 highlight 所在的八度，点击发声 */
  function miniKeyboard(highlight = []) {
    const low = Math.min(...highlight, 60);
    const start = low - (low % 12);
    const octaves = Math.max(...highlight, 71) - start >= 12 ? 2 : 1;
    const wrap = el('div', 'learn-keys');
    for (let o = 0; o < octaves; o += 1) {
      WHITE.forEach((pc) => {
        const midi = start + o * 12 + pc;
        const key = el('button', `learn-key white${highlight.includes(midi) ? ' is-lit' : ''}`);
        key.type = 'button';
        key.setAttribute('aria-label', String(midi));
        key.addEventListener('click', () => playChord([midiToFrequency(midi)], 0.8));
        if ([0, 2, 5, 7, 9].includes(pc)) {
          const black = el('button', `learn-key black${highlight.includes(midi + 1) ? ' is-lit' : ''}`);
          black.type = 'button';
          black.setAttribute('aria-label', String(midi + 1));
          black.addEventListener('click', (e) => { e.stopPropagation(); playChord([midiToFrequency(midi + 1)], 0.8); });
          key.appendChild(black);
        }
        wrap.appendChild(key);
      });
    }
    return wrap;
  }
  /** 题卡上的图：keys 用小键盘，其他交给 learn_visuals.js */
  function visualFor(card, { annotate = false } = {}) {
    const v = card.visual;
    if (!v) return null;
    if (v.kind === 'keys') return miniKeyboard(v.keys);
    return renderVisual(localize(v), { annotate, play: (midis) => playChord(midis.map(midiToFrequency), midis.length > 1 ? 1.2 : 0.8) });
  }
  /** 图示里的文字（方块、标注等）可以写成 { zh, ja, en }，这里统一换成当前语言 */
  function localize(value) {
    if (Array.isArray(value)) return value.map(localize);
    if (value && typeof value === 'object') {
      if (typeof value.zh === 'string' && typeof value.en === 'string') return tx(value);
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item)]));
    }
    return value;
  }

  target.replaceChildren();
  const root = el('div', 'learn');
  const dt = DEBUG_TEXT[lang];
  /** 解锁判断用的进度：调试模式下全部开放（包括 EX 结业挑战） */
  const unlockView = () => (debugEnabled() ? { ...progress, unlockAll: true } : progress);
  const SIDE_KEY = 'jc-learn-side';
  let sideB = null;
  /** Side-B 开放：只有 EX 结业挑战通关，或者调试模式（class_debug(true)）；A 面的"全部解锁"不开放 Side-B */
  const sideBOpen = () => debugEnabled() || isDone(progress, FINAL_EX_KEY);
  /** 给 Side-B 用的进度：只有调试模式才全部开放（A 面的"全部解锁"只管 A 面） */
  const sideBView = () => ({ ...progress, unlockAll: debugEnabled() });
  debugListeners.add(() => { if (!root.isConnected && root.parentNode !== target) return; if (sideB) { if (sideBOpen()) sideB.refresh(); else flipBack(); return; } if (session && !isFinished(session)) renderCard(); else renderMap(); });
  target.appendChild(root);

  // ---------------- 关卡数据 ----------------
  const unitIndex = (id) => UNITS.findIndex((u) => u.id === id);
  const sectionOf = (unit) => SECTIONS.find((s) => s.id === unit?.section);
  /** 一章的主线关卡，以及挂在这些关卡旁边的支线大关卡 */
  const chapterUnits = (sectionId) => UNITS.filter((u) => u.section === sectionId);
  const chapterSides = (sectionId) => SIDES.filter((side) => UNITS.find((u) => u.id === side.parent)?.section === sectionId);
  function levelInfo(key) {
    if (key === REVIEW_KEY_LEVEL) return { key, title: t.reviewTitle, tone: 'peach', feature: null };
    if (key === FINAL_KEY) return { key, title: t.final, tone: 'rose', feature: null };
    if (key === FINAL_EX_KEY) return { key, title: t.finalEx, tone: 'rose', feature: null };
    const chapter = parseChapterKey(key);
    if (chapter) { const section = SECTIONS.find((s) => s.id === chapter.sectionId); return { key, chapter, title: `${tx(section?.title)} · ${chapter.ex ? t.chapterTestEx : t.chapterTest}`, tone: section?.color || 'mint', feature: null }; }
    const { unitId, slot } = parseLevelKey(key);
    const unit = UNITS.find((u) => u.id === unitId) || SIDES.find((u) => u.id === unitId) || UNITS[0];
    const branchLevel = slot > 0 && slot < MIX_SLOT ? unit.branch?.[slot - 1] : null;
    const title = slot === 0 ? tx(unit.title) : `${tx(unit.title)} · ${slot === MIX_SLOT ? t.mix : `${t.adv(slot)}：${tx(branchLevel?.title)}`}`;
    return { key, unit, slot, title, tone: sectionOf(unit)?.color || 'mint', feature: unit.feature };
  }
  function cardsFor(key) {
    // 复习：先出今天到期的；没有到期的就把错题本里的题都拿出来练（最多 20 道）
    if (key === REVIEW_KEY_LEVEL) {
      const due = dueReview(review);
      return shuffle(due.length ? due : review).slice(0, 20).map((item) => ({ ...item.card, reviewId: item.id }));
    }
    if (key === FINAL_KEY) return expandCards(buildFinalCards(UNITS));
    if (key === FINAL_EX_KEY) return expandCards(buildFinalCards(UNITS, { ex: true, sides: SIDES }));
    const chapter = parseChapterKey(key);
    if (chapter) return expandCards(buildChapterCards(chapterUnits(chapter.sectionId), { ex: chapter.ex, sides: chapterSides(chapter.sectionId) }));
    const { unit, slot } = levelInfo(key);
    if (slot === 0) return expandCards(unit.cards);
    if (slot === MIX_SLOT) return expandCards(buildMixedCards(unit));
    return expandCards(unit.branch[slot - 1].cards);
  }
  const branchCount = (unit) => Array.from({ length: MIX_SLOT }, (_, i) => i + 1).filter((s) => isDone(progress, levelKey(unit.id, s))).length;
  const starText = (state) => (state?.done ? `${'★'.repeat(state.stars)}${'☆'.repeat(3 - state.stars)}` : '');

  // ---------------- 地图 ----------------
  function renderMap() {
    stop();
    root.replaceChildren();
    const totalStars = Object.values(progress.units).reduce((n, u) => n + (u.stars || 0), 0);
    const doneCount = UNITS.filter((u) => progress.units[u.id]?.done).length;
    const branchTotal = UNITS.reduce((n, u) => n + branchCount(u), 0);
    const hero = el('div', 'learn-hero');
    const heroText = el('div', 'learn-hero-text');
    heroText.append(el('h3', '', t.title), el('p', '', t.subtitle));
    const stats = el('div', 'learn-stats');
    stats.append(
      withIcon(el('span', 'learn-stat is-streak'), 'flame', t.streak(progress.streak || 0)),
      withIcon(el('span', 'learn-stat is-stars'), 'star', t.stars(totalStars)),
      withIcon(el('span', 'learn-stat is-xp'), 'bolt', t.xp(progress.xp || 0)),
    );
    const bar = el('div', 'learn-overall');
    const fill = el('span');
    fill.style.width = `${(doneCount / UNITS.length) * 100}%`;
    bar.appendChild(fill);
    const next = nextUnitIndex(UNITS, progress);
    const actions = el('div', 'learn-hero-actions');
    actions.append(
      button('learn-btn primary', doneCount === UNITS.length ? t.replay : `${t.continue} · ${tx(UNITS[next].title)}`, () => startLevel(UNITS[next].id)),
      button('learn-link', progress.unlockAll ? t.relock : t.unlockAll, () => { progress = { ...progress, unlockAll: !progress.unlockAll }; saveProgress(progress); renderMap(); }),
    );
    // 翻面 · Side-B：默认隐藏，EX 结业挑战通关后（或调试模式下）才出现
    if (sideBOpen()) actions.appendChild(withIcon(button('learn-btn sideb-entry', '', () => showSideB()), 'sparkle', t.sideB));
    const record = loadResume();
    if (record?.session) {
      const resume = withIcon(button('learn-btn resume wide', '', () => target.resume()), 'replay', t.resumeLabel(record.title, (record.position ?? 0) + 1, record.total ?? '?'));
      actions.prepend(resume);
    }
    if (review.length) {
      const due = dueReview(review).length;
      const reviewBtn = withIcon(button(`learn-btn review${due ? ' is-due' : ''}`, '', () => startLevel(REVIEW_KEY_LEVEL)), 'refresh', t.reviewButton(due, review.length));
      reviewBtn.title = t.reviewHint(review.length, due);
      actions.appendChild(reviewBtn);
    }
    const dataLinks = el('div', 'learn-data-links');
    dataLinks.append(button('learn-link', t.exportProgress, downloadProgress), button('learn-link', t.importProgress, uploadProgress));
    const sideDone = SIDES.filter((side) => unitFullyDone(progress, side.id)).length;
    hero.append(heroText, stats, el('div', 'learn-progress-label', `${t.done(doneCount, UNITS.length)} · ${t.branchDone(branchTotal, UNITS.length * MIX_SLOT)}${SIDES.length ? ` · ${t.sideDone(sideDone, SIDES.length)}` : ''}`), bar, actions, dataLinks);
    if (doneCount === UNITS.length) hero.appendChild(el('p', 'learn-alldone', t.allDone));
    root.appendChild(hero);
    if (debugEnabled()) root.appendChild(debugPanel());

    // 章节导航：一键跳到任意分区（含终点），显示每个分区的主关进度；滚动时吸顶并高亮当前分区
    const chapterBar = el('nav', 'learn-chapters');
    chapterBar.setAttribute('aria-label', t.chapters);
    const chapterButtons = [];
    const addChapter = (id, color, label, count, full) => {
      const chip = button(`learn-chapter tone-${color}`, '', () => {
        root.querySelector(`#learn-sec-${id}`)?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
        chapterButtons.forEach((b) => b.classList.toggle('is-current', b === chip));
      });
      chip.dataset.section = id;
      chip.title = full || label;
      chip.append(el('span', 'learn-chapter-dot'), el('span', 'learn-chapter-label', label));
      if (count) chip.appendChild(el('span', 'learn-chapter-count', count));
      chapterButtons.push(chip);
      chapterBar.appendChild(chip);
    };
    SECTIONS.forEach((section) => {
      const units = UNITS.filter((u) => u.section === section.id);
      if (units.length) addChapter(section.id, section.color, tx(section.short || section.title), `${units.filter((u) => progress.units[u.id]?.done).length}/${units.length}`, tx(section.title));
    });
    addChapter('goal', 'rose', t.goal, '');
    root.appendChild(chapterBar);
    placeChapterBar();

    SECTIONS.forEach((section) => {
      const units = UNITS.map((u, i) => ({ u, i })).filter(({ u }) => u.section === section.id);
      if (!units.length) return;
      const block = el('section', `learn-section tone-${section.color}`);
      block.id = `learn-sec-${section.id}`;
      block.appendChild(sectionDeco(SECTIONS.indexOf(section)));
      block.appendChild(el('h4', 'learn-section-title', tx(section.title)));
      block.appendChild(el('p', 'learn-section-count', `${units.filter(({ u }) => progress.units[u.id]?.done).length} / ${units.length}`));
      const path = el('div', 'learn-path');
      path.appendChild(trailSvg());
      units.forEach(({ u, i }, k) => {
        const unlocked = isUnlocked(UNITS, i, unlockView());
        const state = progress.units[u.id];
        const node = el('div', `learn-node offset-${k % 4}${unlocked ? '' : ' is-locked'}${state?.done ? ' is-done' : ''}${i === next ? ' is-next' : ''}`);
        node.style.setProperty('--i', String(k));
        const bubble = button('learn-bubble', unlocked ? u.icon : '', () => toggleSheet(node, () => unitSheet(u, i, unlocked)));
        if (!unlocked) bubble.appendChild(icon('lock'));
        // 图标文字较长（如 Dm13、(037)）时缩小字号，避免撑出圆形按钮
        const iconLength = [...u.icon].length;
        if (unlocked && iconLength >= 3) bubble.style.fontSize = `${iconLength >= 5 ? 15 : iconLength === 4 ? 18 : 21}px`;
        bubble.setAttribute('aria-label', `${tx(u.title)}${unlocked ? '' : ` · ${t.locked}`}`);
        const pips = el('div', 'learn-pips');
        pips.setAttribute('aria-label', t.branchDone(branchCount(u), MIX_SLOT));
        for (let s = 1; s <= MIX_SLOT; s += 1) pips.appendChild(el('span', `learn-pip${isDone(progress, levelKey(u.id, s)) ? ' is-done' : ''}${s === MIX_SLOT ? ' is-mix' : ''}`));
        node.append(bubble, el('div', 'learn-node-title', tx(u.title)), el('div', 'learn-node-stars', starText(state)), pips);
        if (i === next) node.appendChild(el('span', 'learn-node-flag', t.start));
        SIDES.filter((side) => side.parent === u.id).forEach((side) => { node.classList.add('has-side'); node.appendChild(sideNode(side, u, k)); });
        path.appendChild(node);
      });
      // 章末：章节测试与 EX 章节测试（接在这一章的小路后面）
      const ids = units.map(({ u }) => u);
      const sides = chapterSides(section.id);
      // EX 章节测试是章节测试的分支：挂在章节测试旁边（像支线一样），不在主路上；主路从章节测试接到下一章的第一关
      const chapterNode = examNode({ key: chapterKey(section.id), kind: 'chapter', title: t.chapterTest, blurb: t.chapterBlurb(tx(section.title)), lockText: t.chapterLocked, open: chapterUnlocked(ids, unlockView()), index: units.length });
      chapterNode.classList.add('has-side');
      chapterNode.appendChild(examNode({ key: chapterKey(section.id, true), kind: 'chapter-ex', title: t.chapterTestEx, blurb: t.chapterExBlurb(tx(section.title)), lockText: t.chapterExLocked, open: chapterExUnlocked(section.id, ids, unlockView(), sides), index: units.length, branch: true }));
      path.appendChild(chapterNode);
      block.appendChild(path);
      root.appendChild(block);
    });

    // 终点：结业挑战与 EX
    const goal = el('section', 'learn-section tone-rose learn-goal');
    goal.id = 'learn-sec-goal';
    goal.appendChild(sectionDeco(SECTIONS.length, true));
    goal.appendChild(el('h4', 'learn-section-title', t.goal));
    const goalPath = el('div', 'learn-path');
    goalPath.appendChild(trailSvg());
    goalPath.appendChild(examNode({ key: FINAL_KEY, kind: 'final', title: t.final, blurb: t.finalBlurb, lockText: t.finalLocked, open: finalUnlocked(UNITS, unlockView()), index: 0 }));
    goalPath.appendChild(examNode({ key: FINAL_EX_KEY, kind: 'final-ex', title: t.finalEx, blurb: t.finalExBlurb, lockText: t.finalExLocked, open: finalExUnlocked(UNITS, progress, SIDES) || debugEnabled(), index: 1 }));
    goal.appendChild(goalPath);
    root.appendChild(goal);
    watchChapters(chapterButtons);
    revealSections();
    drawTrails();
  }

  /**
   * 测验节点：章节测试（旗帜、方圆形、虚线外圈）、EX 章节测试（插旗的山峰、颜色加深、白色内圈 + 实线外圈 + 静止的奖章齿边）、
   * 结业挑战（奖杯、金色大圆）、EX 结业挑战（王冠、更深的金色、同样的内外圈与齿边）——EX 低调但看得出更难
   */
  const EXAM_ICON = { chapter: 'flag', 'chapter-ex': 'summit', final: 'trophy', 'final-ex': 'crown' };
  function examNode({ key, kind, title, blurb, lockText, open, index, branch = false }) {
    const state = progress.units[key];
    const ex = kind.endsWith('-ex');
    // branch：作为分支挂在主路节点旁边（主路节点往右偏时放左边，和支线一样）
    const node = branch
      ? el('div', `learn-side learn-exam-side learn-exam is-${kind}${ex ? ' is-ex' : ''}${index % 4 === 1 ? ' is-left' : ''}${open ? '' : ' is-locked'}${state?.done ? ' is-done' : ''}`)
      : el('div', `learn-node learn-exam is-${kind}${ex ? ' is-ex' : ''} offset-${index % 4}${open ? '' : ' is-locked'}${state?.done ? ' is-done' : ''}`);
    if (!branch) node.style.setProperty('--i', String(index));
    if (branch) node.appendChild(el('span', 'learn-side-link'));
    const badge = el('div', 'learn-exam-badge');
    if (ex) badge.appendChild(el('span', 'learn-exam-aura'));
    const bubble = button('learn-bubble', '', (event) => { event?.stopPropagation?.(); toggleSheet(node, () => {
      const sheet = el('div', `learn-sheet learn-exam-sheet is-${kind}`);
      const heading = el('div', 'learn-exam-sheet-head');
      heading.append(icon(EXAM_ICON[kind]), el('strong', '', title));
      sheet.append(heading, el('p', '', blurb));
      if (open) sheet.append(button('learn-btn primary', state?.done ? t.replay : t.start, () => startLevel(key)), withIcon(button('learn-link learn-print', '', () => printExam(key)), 'book', t.printSheet));
      else sheet.appendChild(el('p', 'learn-muted', lockText));
      return sheet;
    }); });
    bubble.appendChild(icon(open ? EXAM_ICON[kind] : 'lock'));
    bubble.setAttribute('aria-label', `${title}${open ? '' : ` · ${t.locked}`}`);
    badge.appendChild(bubble);
    if (ex) badge.appendChild(el('span', 'learn-exam-tag', 'EX'));
    node.append(badge, el('div', branch ? 'learn-side-title' : 'learn-node-title', title), el('div', 'learn-node-stars', starText(state)));
    return node;
  }

  // ---------- 地图的装饰：漂浮的音符、蜿蜒的小路、进入视野时依次弹出 ----------
  const DECO_GLYPHS = ['♪', '♩', '♫', '♬', '♭', '♯', '♮'];
  /** 每个分区背景上几枚慢慢漂浮的音乐符号（位置由分区序号决定，每次打开都一样） */
  function sectionDeco(index, goal = false) {
    const layer = el('div', `learn-deco${goal ? ' is-goal' : ''}`);
    layer.setAttribute('aria-hidden', 'true');
    let seed = index * 9301 + 49297;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let k = 0; k < 8; k += 1) {
      const glyph = el('span', '', goal ? '★' : DECO_GLYPHS[(index + k) % DECO_GLYPHS.length]);
      glyph.style.left = `${4 + rand() * 88}%`;
      glyph.style.top = `${6 + rand() * 84}%`;
      glyph.style.fontSize = `${20 + Math.round(rand() * 26)}px`;
      glyph.style.animationDelay = `${-rand() * 9}s`;
      glyph.style.animationDuration = `${7 + rand() * 6}s`;
      layer.appendChild(glyph);
    }
    return layer;
  }
  function trailSvg() {
    const svg = globalThis.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'learn-trail');
    svg.setAttribute('aria-hidden', 'true');
    return svg;
  }
  /** 把同一分区里相邻的关卡圆钮用一条弯弯的小路连起来；已经走过的一段是实线 */
  function drawTrails() {
    const raf = globalThis.requestAnimationFrame || ((f) => setTimeout(f, 0));
    raf(() => root.querySelectorAll('.learn-path').forEach((path) => {
      const svg = path.querySelector('.learn-trail');
      const box = path.getBoundingClientRect?.();
      if (!svg || !box || !box.width) return;
      const nodes = [...path.querySelectorAll('.learn-node')];
      const points = nodes.map((node) => {
        const r = node.querySelector('.learn-bubble').getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2, done: node.classList.contains('is-done') };
      });
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      svg.replaceChildren();
      for (let i = 1; i < points.length; i += 1) {
        const a = points[i - 1]; const b = points[i];
        const midY = (a.y + b.y) / 2;
        const seg = globalThis.document.createElementNS('http://www.w3.org/2000/svg', 'path');
        seg.setAttribute('d', `M ${a.x} ${a.y} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`);
        seg.setAttribute('class', `learn-trail-seg${a.done && b.done ? ' is-done' : ''}`);
        svg.appendChild(seg);
      }
    }));
    raf(() => linkChapters());
  }
  /**
   * 章与章之间的小路：从这一章最后的主路节点（章节测试）接到下一章的第一关（最后一章接到结业挑战）。
   * 整条曲线画在前一章里（落进下一章的部分被下一章的背景盖住）；下一章再画同一条曲线、只露出下一章范围里的那一段，
   * 这样曲线从下一章的标题后面穿过去，颜色也跟着换成下一章的
   */
  function linkChapters() {
    const sections = [...root.querySelectorAll('.learn-section')];
    const mainNodes = (path) => [...path.children].filter((n) => n.classList?.contains('learn-node'));
    const centerOf = (node) => { const r = node.querySelector('.learn-bubble').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, done: node.classList.contains('is-done') }; };
    const curve = (svg, a, b, box, done, clipTop = null, id = '') => {
      const ns = 'http://www.w3.org/2000/svg';
      const ax = a.x - box.left; const ay = a.y - box.top; const bx = b.x - box.left; const by = b.y - box.top;
      const midY = (ay + by) / 2;
      const seg = globalThis.document.createElementNS(ns, 'path');
      seg.setAttribute('d', `M ${ax} ${ay} C ${ax} ${midY}, ${bx} ${midY}, ${bx} ${by}`);
      seg.setAttribute('class', `learn-trail-seg is-link${done ? ' is-done' : ''}`);
      if (clipTop !== null) {
        const defs = globalThis.document.createElementNS(ns, 'defs');
        const clip = globalThis.document.createElementNS(ns, 'clipPath');
        clip.setAttribute('id', id);
        const rect = globalThis.document.createElementNS(ns, 'rect');
        Object.entries({ x: -4000, y: clipTop, width: 8000, height: 8000 }).forEach(([k, v]) => rect.setAttribute(k, String(v)));
        clip.appendChild(rect); defs.appendChild(clip); svg.appendChild(defs);
        seg.setAttribute('clip-path', `url(#${id})`);
      }
      svg.appendChild(seg);
    };
    for (let i = 0; i + 1 < sections.length; i += 1) {
      const fromPath = sections[i].querySelector('.learn-path'); const toPath = sections[i + 1].querySelector('.learn-path');
      const from = fromPath && mainNodes(fromPath).at(-1); const to = toPath && mainNodes(toPath)[0];
      const fromSvg = fromPath?.querySelector('.learn-trail'); const toSvg = toPath?.querySelector('.learn-trail');
      if (!from || !to || !fromSvg || !toSvg) continue;
      const fromBox = fromPath.getBoundingClientRect(); const toBox = toPath.getBoundingClientRect();
      if (!fromBox.width || !toBox.width) continue;
      const a = centerOf(from); const b = centerOf(to);
      const done = a.done && b.done;
      curve(fromSvg, a, b, fromBox, done);
      curve(toSvg, a, b, toBox, done, sections[i + 1].getBoundingClientRect().top - toBox.top, `learn-link-clip-${i}`);
    }
  }
  let trailResize = null;
  if (typeof globalThis.ResizeObserver === 'function') {
    trailResize = new globalThis.ResizeObserver(() => { if (!session) drawTrails(); });
    trailResize.observe(root);
  }
  /** 分区进入视野时，里面的关卡依次弹出（没有 IntersectionObserver 时直接显示） */
  let revealObserver = null;
  function revealSections() {
    revealObserver?.disconnect?.();
    const sections = root.querySelectorAll('.learn-section');
    if (typeof IntersectionObserver !== 'function' || reducedMotionMap()) { sections.forEach((sec) => sec.classList.add('is-visible')); return; }
    revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }), { rootMargin: '0px 0px -10% 0px' });
    sections.forEach((sec) => revealObserver.observe(sec));
  }
  const reducedMotionMap = () => Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);

  /** 滚动时高亮当前所在的分区（浏览器里才有 IntersectionObserver） */
  let chapterObserver = null;
  /**
   * 手机上顶部的功能导航是吸顶的：章节栏紧贴在它下面吸顶（按导航实际的高度，不写死；向下取整，宁可被导航压住半个像素也不留缝）
   * 桌面上导航在侧栏里、不吸顶，章节栏贴着页面顶部
   */
  function placeChapterBar() {
    const nav = globalThis.document?.querySelector('.feature-nav');
    if (!nav || typeof globalThis.getComputedStyle !== 'function') return;
    const style = globalThis.getComputedStyle(nav);
    const height = nav.getBoundingClientRect?.().height || 0;
    const top = style.position === 'sticky' ? Math.max(0, Math.floor(height + (parseFloat(style.top) || 0))) : 0;
    root.style.setProperty('--learn-sticky-top', `${top}px`);
  }
  (globalThis.window || globalThis).addEventListener?.('resize', () => { if (root.isConnected) placeChapterBar(); });
  // 字体载入后导航高度可能变化，再量一次
  globalThis.document?.fonts?.ready?.then?.(() => { if (root.isConnected) placeChapterBar(); });
  function watchChapters(buttons) {
    chapterObserver?.disconnect?.();
    if (typeof IntersectionObserver !== 'function') return;
    chapterObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      const id = visible.target.id.replace('learn-sec-', '');
      buttons.forEach((b) => b.classList.toggle('is-current', b.dataset.section === id));
    }, { rootMargin: '-80px 0px -60% 0px' });
    root.querySelectorAll('.learn-section').forEach((sec) => chapterObserver.observe(sec));
  }

  /** 关卡卡片：在一张卡片里选关——主关、进阶 1–4、综合测验排成一条小路线，点选后下方显示详情和开始按钮 */
  function unitSheet(unit, index, unlocked, isOpen = (slot) => isLevelUnlocked(UNITS, index, slot, unlockView()), lockedText = t.locked) {
    const sheet = el('div', 'learn-sheet learn-level-card');
    const head = el('div', 'learn-card-head');
    head.append(el('span', 'learn-card-icon', unit.icon), el('div', 'learn-card-heading'));
    head.lastChild.append(el('strong', '', tx(unit.title)), el('p', '', tx(unit.blurb)));
    sheet.appendChild(head);
    if (!unlocked) { sheet.appendChild(el('p', 'learn-muted', lockedText)); return sheet; }
    const levels = [
      { slot: 0, label: t.main, short: '★', title: tx(unit.title), desc: tx(unit.blurb) },
      ...(unit.branch || []).map((lvl, k) => ({ slot: k + 1, label: t.adv(k + 1), short: String(k + 1), title: tx(lvl.title), desc: tx(lvl.title) })),
      { slot: MIX_SLOT, label: t.mix, short: '∑', title: t.mix, desc: t.mixBlurb },
    ].map((lvl) => ({ ...lvl, key: levelKey(unit.id, lvl.slot), open: isOpen(lvl.slot), state: progress.units[levelKey(unit.id, lvl.slot)] }));
    const track = el('div', 'learn-track');
    const detail = el('div', 'learn-track-detail');
    let selected = levels.find((l) => l.open && !l.state?.done) || levels[0];
    const tiles = levels.map((lvl) => {
      const tile = button(`learn-track-tile${lvl.slot === 0 ? ' is-main' : ''}${lvl.slot === MIX_SLOT ? ' is-mix' : ''}${lvl.state?.done ? ' is-done' : ''}${lvl.open ? '' : ' is-locked'}`, '', () => { selected = lvl; paint(); });
      if (lvl.open) tile.appendChild(el('span', 'learn-track-mark', lvl.state?.done ? '✓' : lvl.short));
      else tile.appendChild(icon('lock'));
      tile.setAttribute('aria-label', `${lvl.label}${lvl.open ? '' : ` · ${t.branchLocked}`}`);
      track.appendChild(tile);
      return tile;
    });
    function paint() {
      tiles.forEach((tile, i) => tile.classList.toggle('is-selected', levels[i] === selected));
      detail.replaceChildren();
      const lvl = selected;
      detail.append(el('span', 'learn-track-label', lvl.label), el('strong', 'learn-track-title', lvl.title));
      if (lvl.slot === MIX_SLOT || lvl.slot === 0) detail.appendChild(el('p', 'learn-muted', lvl.desc));
      detail.appendChild(el('div', 'learn-node-stars', starText(lvl.state)));
      if (lvl.open) detail.appendChild(button('learn-btn primary wide', lvl.state?.done ? t.replay : t.start, () => startLevel(lvl.key)));
      else detail.appendChild(el('p', 'learn-muted', t.branchLocked));
    }
    paint();
    sheet.append(track, detail, ...unitTools(unit).map((tool) => toolButton(tool.feature, tool.q, t.tool(toolName(tool.feature)), 'learn-link')),
      withIcon(button('learn-link learn-print', '', () => printUnit(unit)), 'book', t.printSheet));
    return sheet;
  }

  /** 打印这一关（主关 + 各进阶关）的练习卷：生成题用固定种子，答案页对得上 */
  // 小键盘（kind: 'keys'）在页面上是按钮拼的，打印时换成同一范围的 SVG 琴键
  const printVisual = (v) => {
    if (v.kind !== 'keys') return localize(v);
    const keys = v.keys || [];
    const start = Math.min(...keys, 60) - (Math.min(...keys, 60) % 12);
    return { kind: 'piano', from: start, to: Math.max(...keys, start + 11), lit: keys, names: 'c' };
  };
  const visualSvg = (card) => renderVisual(printVisual(card.visual))?.querySelector('svg')?.outerHTML || '';
  function printUnit(unit) {
    let seed = 0; for (const ch of unit.id) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    const rng = () => { seed = (seed * 1103515245 + 12345) >>> 0; return seed / 4294967296; };
    const sections = [
      { heading: `${t.main} · ${tx(unit.title)}`, cards: expandCards(unit.cards, rng) },
      ...(unit.branch || []).map((lvl, k) => ({ heading: `${t.adv(k + 1)} · ${tx(lvl.title)}`, cards: expandCards(lvl.cards, rng) })),
    ];
    const { html } = worksheetHTML({ title: tx(unit.title), sections, lang, visualSvg, seed: unit.id });
    openWorksheet(tx(unit.title), html);
  }
  /**
   * 打印章节测试 / 结业挑战（含 EX）：和开始游玩一样按规则随机抽一套题（20 / 30 / 50 道）。
   * 抽到的听力题纸上做不了，就再抽几次补满同样的题数（不重复），所以卷子上的题数和游玩时一样
   */
  function printExam(key) {
    const first = cardsFor(key);
    const target = first.length;
    const seen = new Set();
    const cards = [];
    const take = (list) => list.forEach((card) => {
      const id = JSON.stringify(card);
      if (cards.length < target && printable(card) && !seen.has(id)) { seen.add(id); cards.push(card); }
    });
    take(first);
    for (let tries = 0; tries < 8 && cards.length < target; tries += 1) take(cardsFor(key));
    const title = levelInfo(key).title;
    const { html } = worksheetHTML({ title, sections: [{ cards }], lang, visualSvg, seed: `${key}:${Date.now()}` });
    openWorksheet(title, html);
  }


  /** 支线大关卡：从主关圆钮旁边岔出去的小圆钮（主关往右偏时放左边，免得窄屏放不下） */
  function sideNode(side, parent, k) {
    const open = isSideLevelUnlocked(side, 0, unlockView());
    const done = unitFullyDone(progress, side.id);
    const wrap = el('div', `learn-side${k % 4 === 1 ? ' is-left' : ''}${open ? '' : ' is-locked'}${done ? ' is-done' : ''}${isDone(progress, side.id) ? ' is-started' : ''}`);
    const lockedText = t.sideLocked(tx(parent.title));
    const bubble = button('learn-bubble learn-side-bubble', open ? side.icon : '', (event) => {
      event?.stopPropagation?.();
      toggleSheet(wrap, () => {
        const sheet = unitSheet(side, -1, open, (slot) => isSideLevelUnlocked(side, slot, unlockView()), lockedText);
        sheet.insertBefore(el('p', 'learn-side-note', t.sideNote), sheet.children[1] || null);
        return sheet;
      });
    });
    if (!open) bubble.appendChild(icon('lock'));
    bubble.setAttribute('aria-label', `${t.side} · ${tx(side.title)}${open ? '' : ` · ${lockedText}`}`);
    bubble.title = open ? tx(side.title) : lockedText;
    const pips = el('div', 'learn-pips');
    for (let s = 1; s <= MIX_SLOT; s += 1) pips.appendChild(el('span', `learn-pip${isDone(progress, levelKey(side.id, s)) ? ' is-done' : ''}${s === MIX_SLOT ? ' is-mix' : ''}`));
    wrap.append(el('span', 'learn-side-link'), el('span', 'learn-side-tag', t.side), bubble, el('div', 'learn-side-title', tx(side.title)), el('div', 'learn-node-stars', starText(progress.units[side.id])), pips);
    return wrap;
  }

  /** 选关卡片：置顶的浮层（不挤开地图上的关卡）；点遮罩、按 Esc、点关闭或再点同一个关卡都会收起 */
  let openNode = null;
  function closeSheets() {
    document.querySelectorAll('.learn-sheet-layer').forEach((layer) => layer.remove());
    root.querySelectorAll('.learn-node.has-sheet').forEach((n) => n.classList.remove('has-sheet'));
    openNode = null;
  }
  function toggleSheet(node, build) {
    const wasOpen = openNode === node;
    closeSheets();
    if (wasOpen) return;
    const tone = [...(node.closest('.learn-section')?.classList || [])].find((c) => c.startsWith('tone-')) || 'tone-mint';
    const layer = el('div', `learn-sheet-layer ${tone}`);
    layer.setAttribute('role', 'dialog');
    layer.setAttribute('aria-modal', 'true');
    const sheet = build();
    const close = button('learn-sheet-close', '✕', closeSheets);
    close.setAttribute('aria-label', t.close);
    sheet.prepend(close);
    layer.appendChild(sheet);
    layer.addEventListener('click', (event) => { if (event.target === layer) closeSheets(); });
    document.body.appendChild(layer);
    node.classList.add('has-sheet');
    openNode = node;
    sheet.querySelector('.learn-btn.primary')?.focus?.();
  }
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeSheets(); });

  // ---------------- 关卡 ----------------
  let session = null;
  // 工具（听写、四部和声检查、套路听辨）把错题写进了错题本：重新读一遍，地图页上的复习按钮跟着更新
  (globalThis.window || globalThis).addEventListener?.('jc-review-changed', () => {
    review = loadReview();
    if (!session && root.querySelector('.learn-hero')) renderMap();
  });
  let level = null;

  /** 学习记录：当前关卡、整局状态与题号；页面上方的"回到教程"据此回到同一题 */
  /** fromTool：只有从题卡"去工具里看看"跳走时才为 true——页面上方的"回到教程"只认这种记录；平时的自动保存不会让它出现 */
  function persist(fromTool = false) {
    if (!session || !level || isFinished(session)) return;
    saveResume({ key: level.key, title: level.title, session, position: session.position, total: session.queue.length, fromTool });
    notifyResume();
  }
  function forget() {
    const record = loadResume();
    if (record && (!level || record.key === level.key)) { clearResume(); notifyResume(); }
  }

  /** 跳到工具：先保存学习记录，之后可从工具页的"回到教程"回到同一题 */
  function goToTool(feature, query) {
    closeSheets();
    persist(true);
    if (globalThis.location) globalThis.location.hash = `#${feature}${query ? `?q=${encodeURIComponent(query)}` : ''}`;
  }
  /** 一个关卡相关的工具：主工具（unit.feature）+ extraTools（例如功能与罗马数字关卡也能用五度圈标出各级和弦），去重 */
  function unitTools(unit) {
    const list = [{ feature: unit.feature, q: unit.toolQuery || null }, ...(unit.extraTools || []).map((x) => ({ feature: x.feature, q: x.q || null }))];
    return list.filter((x, i) => x.feature && list.findIndex((y) => y.feature === x.feature && y.q === x.q) === i);
  }
  /** 题卡 / 引导卡下方的工具：卡上写的工具优先，再加上本关的工具（含 extraTools，例如罗马数字关卡的五度圈）；考试等没有单一关卡时用本关的主工具 */
  function cardTools(card, level) {
    const toolUnit = level.unit;
    const list = [...(card.tool ? [{ feature: card.tool.feature, q: card.tool.q || null }] : []), ...(toolUnit ? unitTools(toolUnit) : level.feature ? [{ feature: level.feature, q: null }] : [])];
    return list.filter((x, i) => x.feature && list.findIndex((y) => y.feature === x.feature && (y.q || null) === (x.q || null)) === i);
  }
  function toolButton(feature, query, label, className = 'learn-btn ghost') {
    const b = button(className, label, () => goToTool(feature, query));
    b.classList.add('learn-tool-jump');
    b.dataset.feature = feature;
    return b;
  }

  function startLevel(key) {
    closeSheets();
    const record = loadResume();
    if (record && record.key !== key) { clearResume(); notifyResume(); }
    level = levelInfo(key);
    const long = key === FINAL_KEY || key === FINAL_EX_KEY || Boolean(parseChapterKey(key));
    session = createSession({ id: key, cards: cardsFor(key) }, { shuffleQuestions: !long });
    renderCard();
  }

  function renderCard() {
    stop();
    chapterObserver?.disconnect?.();
    root.replaceChildren();
    if (isFinished(session)) { renderFinish(); return; }
    persist();
    const item = currentItem(session);
    const card = item.card;
    const shell = el('div', `learn-player tone-${level.tone}`);
    const top = el('div', 'learn-top');
    const bar = el('div', 'learn-bar');
    const fill = el('span');
    fill.style.width = `${Math.max(4, progressRatio(session) * 100)}%`;
    bar.appendChild(fill);
    const sfx = button('learn-sfx', '', () => { setSfxEnabled(!sfxEnabled()); paintSfx(); });
    const paintSfx = () => {
      const on = sfxEnabled();
      sfx.replaceChildren(icon(on ? 'speaker' : 'speaker-off'));
      sfx.classList.toggle('is-off', !on);
      sfx.title = on ? t.sfxOn : t.sfxOff;
      sfx.setAttribute('aria-label', sfx.title);
      sfx.setAttribute('aria-pressed', String(on));
    };
    paintSfx();
    top.append(button('learn-close', '✕', () => { forget(); session = null; level = null; renderMap(); }), bar, sfx);
    bar.setAttribute('aria-label', 'progress');
    top.firstChild.setAttribute('aria-label', t.close);
    shell.appendChild(top);
    shell.appendChild(el('div', 'learn-level-title', `${level.title} · ${t.question(session.position + 1, session.queue.length)}`));
    if (item.retry) shell.appendChild(el('div', 'learn-retry', t.retryTitle));
    const body = el('div', 'learn-card');
    const footer = el('div', 'learn-footer');
    shell.append(body, footer);
    if (debugEnabled()) shell.appendChild(debugBar(card));
    root.appendChild(shell);
    ({ guide: renderGuide, choice: renderChoice, fill: renderFill, match: renderMatch })[card.type](card, body, footer);
  }

  /** 引导卡：一步一步显示（弱引导），图示、示范音、小键盘、相关工具 */
  function renderGuide(card, body, footer) {
    body.appendChild(el('div', 'learn-guide-badge')).appendChild(icon('sparkle'));
    body.appendChild(el('h3', 'learn-guide-title', tx(card.title)));
    const list = el('div', 'learn-steps');
    // 有 tour 的引导卡：图放在讲解上面，每讲一步就把那一步说的东西圈出来、贴上名字
    const tour = card.tour ? localize(card.tour) : null;
    const pic = visualFor(card, { annotate: Boolean(tour) });
    if (tour && pic) { pic.classList.add('is-tour'); body.appendChild(pic); }
    body.appendChild(list);
    if (pic && !tour) body.appendChild(pic);
    if (card.demo?.keys) body.appendChild(miniKeyboard(card.demo.keys));
    if (card.demo?.play) body.appendChild(withIcon(button('learn-btn ghost', '', () => playDemo(card.demo)), 'play', t.play));
    // 每张引导卡都能一键去相关的工具看看（题卡没写就用本关对应的工具）
    const tools = cardTools(card, level);
    if (tools.length) {
      const row = el('div', 'learn-tool-row');
      row.append(...tools.map((tool) => toolButton(tool.feature, tool.q, t.openTool(toolName(tool.feature)))), el('p', 'learn-muted', t.toolNote));
      body.appendChild(row);
    }
    const src = el('p', 'learn-source', `${t.source} `);
    refLinks(card).forEach((a) => src.appendChild(a));
    body.appendChild(src);
    let shown = 0;
    const action = button('learn-btn primary wide', t.more, () => {
      if (shown < card.steps.length) { reveal(); return; }
      answer(session, null);
      advance(session);
      renderCard();
    });
    function reveal() {
      list.appendChild(el('p', 'learn-step', tx(card.steps[shown])));
      if (tour && pic?.setMarks) pic.setMarks(tour[shown]);
      shown += 1;
      action.textContent = shown >= card.steps.length ? t.gotIt : t.more;
    }
    reveal();
    footer.appendChild(action);
  }

  /** 题目通用：图示、声音、提示、解析、相关工具、检查与反馈 */
  let currentFrame = null;
  /** 记进错题本：普通关卡第一次答错就记下；复习关里答对升一盒、答错回第一盒 */
  function noteAnswer(card, correct, firstTry) {
    if (level?.key === REVIEW_KEY_LEVEL) review = recordReviewAnswer(review, card.reviewId, correct);
    else if (!correct && firstTry) review = recordMistake(review, card, level?.key);
    else return;
    saveReview(review);
  }
  function questionFrame(card, body, footer, { getResponse, showSolution, prompt = true }) {
    currentFrame = { card, footer, showSolution };
    if (prompt) body.appendChild(el('h3', 'learn-prompt', tx(card.prompt)));
    const pic = visualFor(card);
    if (pic) body.appendChild(pic);
    if (card.audio) {
      const audioRow = el('div', 'learn-audio');
      const big = button('learn-speaker', '', () => playAudio(card.audio));
      big.appendChild(icon('speaker'));
      big.setAttribute('aria-label', t.play);
      audioRow.append(big, el('span', 'learn-muted', t.play));
      body.appendChild(audioRow);
      timers.push(setTimeout(() => playAudio(card.audio), 250));
    }
    const help = el('div', 'learn-help');
    const hintBox = el('p', 'learn-hint');
    help.append(
      withIcon(button('learn-link', '', () => { hintBox.textContent = tx(card.hint); hintBox.classList.add('is-open'); }), 'bulb', t.hint),
      withIcon(button('learn-link', '', () => { hintBox.textContent = tx(card.explain); hintBox.classList.add('is-open'); }), 'book', t.explain),
    );
    cardTools(card, level).forEach((tool) => help.appendChild(toolButton(tool.feature, tool.q, t.openTool(toolName(tool.feature)), 'learn-link')));
    const check = button('learn-btn primary wide', t.check, () => {
      const firstTry = !currentItem(session)?.retry;
      const result = answer(session, getResponse());
      noteAnswer(card, result.correct, firstTry);
      showFeedback(card, footer, result.correct, showSolution);
    });
    check.disabled = true;
    footer.append(help, hintBox, check);
    return { setReady: (value) => { check.disabled = !value; } };
  }

  function showFeedback(card, footer, correct, showSolution) {
    persist();
    footer.replaceChildren();
    footer.classList.add(correct ? 'is-right' : 'is-wrong');
    playFeedbackSound(correct);
    const head = el('div', 'learn-feedback-head', correct ? t.right[Math.floor(Math.random() * t.right.length)] : t.wrong);
    footer.appendChild(head);
    if (!correct) footer.appendChild(el('div', 'learn-solution', showSolution()));
    const why = el('p', 'learn-explain', `${correct ? `${t.why} ` : ''}${tx(card.explain)}`);
    refLinks(card).forEach((a) => why.appendChild(a));
    footer.appendChild(why);
    const row = el('div', 'learn-feedback-actions');
    const feature = card.tool?.feature || level.feature;
    // 支线可以指定打开面板里的哪个子页面（toolQuery，如 '@sub:canon'）
    if (feature) row.appendChild(toolButton(feature, card.tool?.q ?? (card.tool ? null : level.unit?.toolQuery), t.tryTool, 'learn-link'));
    row.appendChild(button('learn-btn primary', t.next, () => { advance(session); renderCard(); }));
    footer.appendChild(row);
    root.querySelectorAll('.learn-card button').forEach((b) => { if (!b.classList.contains('learn-speaker') && !b.classList.contains('learn-key') && !b.classList.contains('learn-tool-jump')) b.disabled = true; });
  }

  function renderChoice(card, body, footer) {
    let picked = null;
    const order = shuffle(card.options.map((_, i) => i));
    const grid = el('div', 'learn-options');
    const frame = questionFrame(card, body, footer, {
      getResponse: () => picked,
      showSolution: () => tx(card.options[card.answer]),
    });
    order.forEach((index) => {
      const btn = button('learn-option', tx(card.options[index]), () => {
        picked = index;
        grid.querySelectorAll('.learn-option').forEach((b) => b.classList.toggle('is-picked', b === btn));
        frame.setReady(true);
      });
      grid.appendChild(btn);
    });
    body.appendChild(grid);
  }

  function renderFill(card, body, footer) {
    const blanks = card.answer.map(() => null);
    const sentence = el('h3', 'learn-prompt learn-sentence');
    const bank = el('div', 'learn-bank');
    const bankItems = shuffleAway(card.bank, (items) => items.every((b, i) => b.id === card.answer[i]));
    body.append(sentence);
    const frame = questionFrame(card, body, footer, {
      prompt: false,
      getResponse: () => blanks,
      showSolution: () => card.answer.map((id) => tx(card.bank.find((b) => b.id === id).label)).join(' · '),
    });
    body.append(el('p', 'learn-muted', t.tapToFill), bank);
    function paint() {
      sentence.replaceChildren();
      tx(card.prompt).split('___').forEach((part, i, parts) => {
        sentence.appendChild(document.createTextNode(part));
        if (i < parts.length - 1) {
          const slot = button(`learn-slot${blanks[i] ? ' is-filled' : ''}`, blanks[i] ? tx(card.bank.find((b) => b.id === blanks[i]).label) : '　', () => { blanks[i] = null; paint(); });
          sentence.appendChild(slot);
        }
      });
      bank.replaceChildren();
      bankItems.forEach((item) => {
        const used = blanks.filter((b) => b === item.id).length >= card.answer.filter((a) => a === item.id).length && blanks.includes(item.id);
        const chip = button(`learn-chip${used ? ' is-used' : ''}`, tx(item.label), () => {
          const empty = blanks.indexOf(null);
          if (empty < 0) return;
          blanks[empty] = item.id;
          paint();
        });
        bank.appendChild(chip);
      });
      frame.setReady(blanks.every(Boolean));
    }
    paint();
  }

  function renderMatch(card, body, footer) {
    const pairs = {};       // 左项序号 → 右项序号
    let selectedLeft = null;
    // 两列都打乱，并且保证不会正好一一对齐
    const lefts = shuffle(card.pairs.map((_, i) => i));
    const rights = shuffleAway(card.pairs.map((_, i) => i), (order) => order.every((j, k) => j === lefts[k]));
    const board = el('div', 'learn-match');
    const leftCol = el('div', 'learn-col is-left');
    const rightCol = el('div', 'learn-col is-right');
    const lines = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    lines.setAttribute('class', 'learn-lines');
    board.append(leftCol, lines, rightCol);
    const frame = questionFrame(card, body, footer, {
      getResponse: () => pairs,
      showSolution: () => card.pairs.map(([a, b]) => `${tx(a)} — ${tx(b)}`).join('；'),
    });
    body.append(el('p', 'learn-muted', t.tapToPair), board);
    const colorOf = (leftIndex) => PAIR_COLORS[Object.keys(pairs).map(Number).sort((a, b) => a - b).indexOf(leftIndex) % PAIR_COLORS.length];
    function paint() {
      leftCol.replaceChildren();
      rightCol.replaceChildren();
      lefts.forEach((i) => {
        const [a] = card.pairs[i];
        const tile = button(`learn-tile${selectedLeft === i ? ' is-selected' : ''}${pairs[i] !== undefined ? ' is-paired' : ''}`, tx(a), () => {
          if (pairs[i] !== undefined) { delete pairs[i]; selectedLeft = null; } else selectedLeft = selectedLeft === i ? null : i;
          paint();
        });
        tile.dataset.left = String(i);
        if (pairs[i] !== undefined) tile.style.setProperty('--pair', colorOf(i));
        leftCol.appendChild(tile);
      });
      rights.forEach((j) => {
        const owner = Object.keys(pairs).map(Number).find((k) => pairs[k] === j);
        const tile = button(`learn-tile${owner !== undefined ? ' is-paired' : ''}`, tx(card.pairs[j][1]), () => {
          if (owner !== undefined) { delete pairs[owner]; paint(); return; }
          if (selectedLeft === null) return;
          pairs[selectedLeft] = j;
          selectedLeft = null;
          paint();
        });
        tile.dataset.right = String(j);
        if (owner !== undefined) tile.style.setProperty('--pair', colorOf(owner));
        rightCol.appendChild(tile);
      });
      drawLines();
      frame.setReady(Object.keys(pairs).length === card.pairs.length);
    }
    /** 在两列之间画连线（浏览器里才有布局信息） */
    function drawLines() {
      lines.replaceChildren();
      if (typeof board.getBoundingClientRect !== 'function') return;
      requestAnimationFrame?.(() => {
        const box = board.getBoundingClientRect?.();
        if (!box || !box.width) return;
        lines.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
        Object.entries(pairs).forEach(([i, j]) => {
          const a = leftCol.querySelector(`[data-left="${i}"]`)?.getBoundingClientRect();
          const b = rightCol.querySelector(`[data-right="${j}"]`)?.getBoundingClientRect();
          if (!a || !b) return;
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          const x1 = a.right - box.left; const y1 = a.top + a.height / 2 - box.top;
          const x2 = b.left - box.left; const y2 = b.top + b.height / 2 - box.top;
          path.setAttribute('d', `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`);
          path.setAttribute('stroke', colorOf(Number(i)));
          lines.appendChild(path);
        });
      });
    }
    paint();
  }

  /** 复习结束：不算关卡成绩，只给一点经验值，告诉你错题本还剩多少 */
  function renderReviewFinish() {
    const stars = starsFor(session);
    const xp = session.questions * 5;
    progress = { ...progress, xp: (progress.xp || 0) + xp };
    saveProgress(progress);
    forget();
    root.replaceChildren();
    const shell = el('div', 'learn-finish tone-peach');
    const starRow = el('div', 'learn-finish-stars');
    [0, 1, 2].forEach((i) => { const s = el('span', i < stars ? 'is-on' : '', '★'); s.style.animationDelay = `${i * 0.18}s`; starRow.appendChild(s); });
    shell.append(starRow, el('h3', '', t.reviewDone), el('p', 'learn-earned', t.earned(stars, xp)), el('p', 'learn-finish-unit', t.reviewLeft(review.length)));
    const row = el('div', 'learn-feedback-actions');
    if (review.length) row.appendChild(button('learn-btn primary', t.reviewButton(dueReview(review).length, review.length), () => startLevel(REVIEW_KEY_LEVEL)));
    row.appendChild(button('learn-btn ghost', t.backToMap, () => renderMap()));
    shell.appendChild(row);
    root.appendChild(shell);
    session = null;
  }

  /** 导出 / 导入进度（文件） */
  function downloadProgress() {
    const blob = new Blob([JSON.stringify(exportProgress(), null, 2)], { type: 'application/json' });
    const a = el('a');
    a.href = URL.createObjectURL(blob);
    a.download = `theory-quest-progress-${new Date().toISOString().slice(0, 10)}.json`;
    globalThis.document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  function uploadProgress() {
    const input = el('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file) return;
      const ok = importProgress(await file.text());
      if (ok) { progress = loadProgress(); review = loadReview(); notifyResume(); }
      renderMap();
      root.querySelector('.learn-hero')?.appendChild(el('p', `learn-note ${ok ? 'is-ok' : 'is-bad'}`, ok ? t.imported : t.importFailed));
    });
    input.click();
  }

  // ---------- 调试 ----------
  /** 一道题的标准答案（直接做对）和一个错误答案（直接做错） */
  function debugResponse(card, correct) {
    if (card.type === 'choice') return correct ? card.answer : (card.answer + 1) % card.options.length;
    if (card.type === 'fill') return correct ? [...card.answer] : [];
    if (card.type === 'match') return correct ? card.pairs.map((_, i) => i) : [];
    return null;
  }
  function debugBar(card) {
    const bar = el('div', 'learn-debug-bar');
    bar.appendChild(el('span', 'learn-debug-tag', 'DEBUG'));
    const answered = () => currentFrame?.footer.classList.contains('is-right') || currentFrame?.footer.classList.contains('is-wrong');
    bar.appendChild(button('learn-debug-btn', dt.skip, () => { advance(session); renderCard(); }));
    if (card.type !== 'guide') {
      [[true, dt.right], [false, dt.wrong]].forEach(([correct, label]) => bar.appendChild(button('learn-debug-btn', label, () => {
        if (answered() || currentFrame?.card !== card) return;
        const firstTry = !currentItem(session)?.retry;
        const result = answer(session, debugResponse(card, correct));
        noteAnswer(card, result.correct, firstTry);
        showFeedback(card, currentFrame.footer, result.correct, currentFrame.showSolution);
      })));
    }
    return bar;
  }
  function debugPanel() {
    const panel = el('div', 'learn-debug-panel');
    const head = el('div', 'learn-debug-head');
    head.append(el('span', 'learn-debug-tag', 'DEBUG'), el('strong', '', dt.title), el('span', 'learn-muted', dt.note));
    panel.appendChild(head);
    const apply = (keys, stars) => { progress = setLevelStars(progress, keys, stars); saveProgress(progress); renderMap(); };
    SECTIONS.forEach((section) => {
      const keys = [...[...UNITS, ...SIDES].filter((u) => u.section === section.id).flatMap((u) => unitLevelKeys(u.id)), chapterKey(section.id), chapterKey(section.id, true)];
      if (!keys.length) return;
      const row = el('div', `learn-debug-row tone-${section.color}`);
      row.appendChild(el('span', 'learn-debug-label', tx(section.short || section.title)));
      [1, 2, 3].forEach((n) => row.appendChild(button('learn-debug-btn', '★'.repeat(n), () => apply(keys, n))));
      row.lastChild.title = dt.chapter(tx(section.title), 3);
      panel.appendChild(row);
    });
    const actions = el('div', 'learn-debug-row');
    actions.append(
      button('learn-debug-btn strong', dt.all3, () => apply([...[...UNITS, ...SIDES].flatMap((u) => unitLevelKeys(u.id)), ...SECTIONS.flatMap((section) => [chapterKey(section.id), chapterKey(section.id, true)]), FINAL_KEY, FINAL_EX_KEY], 3)),
      button('learn-debug-btn danger', dt.clear, () => {
        if (typeof globalThis.confirm === 'function' && !globalThis.confirm(dt.confirmClear)) return;
        progress = emptyProgress(); saveProgress(progress); review = []; saveReview(review); forget(); renderMap();
      }),
      button('learn-debug-btn', dt.off, () => globalThis.window?.class_debug?.(false)),
    );
    panel.appendChild(actions);
    return panel;
  }

  // ---------- 通关动画：结业挑战彩带；EX 结业挑战全屏烟花，最后一句"乐理远不止于此" ----------
  const reducedMotion = () => Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  const CONFETTI = ['#f6c344', '#ef5b7b', '#4f7cff', '#18b37e', '#a66cff', '#ff8a3d'];
  function confetti(layer, count) {
    if (reducedMotion()) return;
    for (let i = 0; i < count; i += 1) {
      const piece = el('span', 'learn-confetti');
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = CONFETTI[i % CONFETTI.length];
      piece.style.animationDelay = `${Math.random() * 0.9}s`;
      piece.style.animationDuration = `${2.4 + Math.random() * 1.8}s`;
      piece.style.setProperty('--spin', `${Math.random() > 0.5 ? '' : '-'}${360 + Math.floor(Math.random() * 540)}deg`);
      piece.style.setProperty('--drift', `${Math.round((Math.random() - 0.5) * 160)}px`);
      layer.appendChild(piece);
    }
  }
  function fireworks(layer, bursts) {
    if (reducedMotion()) return;
    for (let b = 0; b < bursts; b += 1) {
      const burst = el('span', 'learn-burst');
      burst.style.left = `${10 + Math.random() * 80}%`;
      burst.style.top = `${10 + Math.random() * 50}%`;
      burst.style.animationDelay = `${b * 0.55 + Math.random() * 0.3}s`;
      const color = CONFETTI[b % CONFETTI.length];
      for (let k = 0; k < 14; k += 1) {
        const spark = el('i', 'learn-spark');
        spark.style.background = color;
        spark.style.setProperty('--angle', `${(k / 14) * 360}deg`);
        burst.appendChild(spark);
      }
      layer.appendChild(burst);
    }
  }
  /** 一小段号角：琶音上行，再落到一个大七（EX 版更长，最后停在 Lydian 色彩的和弦上） */
  function fanfare(ex) {
    const steps = ex ? [[60], [64], [67], [71], [74], [78], [79], [60, 64, 67, 71, 74, 78]] : [[60], [64], [67], [72], [60, 64, 67, 72]];
    steps.forEach((notes, i) => timers.push(setTimeout(() => playChord(notes.map(midiToFrequency), i === steps.length - 1 ? 2.4 : 0.5, { interrupt: i === 0 }), i * (ex ? 260 : 200))));
  }
  function celebrateFinal(shell) {
    const layer = el('div', 'learn-celebrate');
    confetti(layer, 70);
    const card = el('div', 'learn-celebrate-card');
    card.append(el('div', 'learn-celebrate-title', t.celebrateFinal), el('p', '', t.celebrateFinalSub(UNITS.length)));
    layer.appendChild(card);
    shell.prepend(layer);
    fanfare(false);
  }
  function celebrateEx() {
    const overlay = el('div', 'learn-ex-show');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', t.exFinale);
    const sky = el('div', 'learn-ex-sky');
    for (let i = 0; i < 60; i += 1) {
      const star = el('i', 'learn-ex-star');
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      sky.appendChild(star);
    }
    fireworks(sky, 9);
    confetti(sky, 90);
    const stage = el('div', 'learn-ex-stage');
    t.exLines.forEach((line, i) => {
      const p = el('p', `learn-ex-line${i === 0 ? ' is-head' : ''}`, line);
      p.style.animationDelay = `${0.4 + i * 1.3}s`;
      stage.appendChild(p);
    });
    const finale = el('p', 'learn-ex-finale', t.exFinale);
    finale.style.animationDelay = `${0.4 + t.exLines.length * 1.3 + 0.4}s`;
    const close = button('learn-btn primary learn-ex-close', t.exClose, () => { overlay.classList.add('is-leaving'); setTimeout(() => overlay.remove(), 400); });
    close.style.animationDelay = `${0.4 + t.exLines.length * 1.3 + 1.6}s`;
    stage.append(finale, close);
    overlay.append(sky, stage);
    const onKey = (event) => { if (event.key === 'Escape') { close.click(); globalThis.document?.removeEventListener('keydown', onKey); } };
    globalThis.document?.addEventListener('keydown', onKey);
    (globalThis.document?.body || root).appendChild(overlay);
    fanfare(true);
  }

  function renderFinish() {
    const key = level.key;
    if (key === REVIEW_KEY_LEVEL) { renderReviewFinish(); return; }
    const before = progress.units[key]?.done;
    progress = completeUnit(progress, key, session);
    saveProgress(progress);
    forget();
    const { stars, xp } = progress.earned;
    root.replaceChildren();
    const shell = el('div', `learn-finish tone-${level.tone}`);
    const starRow = el('div', 'learn-finish-stars');
    [0, 1, 2].forEach((i) => { const s = el('span', i < stars ? 'is-on' : '', '★'); s.style.animationDelay = `${i * 0.18}s`; starRow.appendChild(s); });
    shell.append(starRow, el('h3', '', t.finishTitle), el('p', 'learn-finish-unit', level.title), el('p', 'learn-earned', t.earned(stars, xp)), withIcon(el('p', 'learn-stat is-streak'), 'flame', t.streak(progress.streak)));
    const row = el('div', 'learn-feedback-actions');
    // 普通章节测试通关后，如果 EX 章节测试已经开放，直接给入口
    if (level.chapter && !level.chapter.ex && chapterExUnlocked(level.chapter.sectionId, chapterUnits(level.chapter.sectionId), unlockView(), chapterSides(level.chapter.sectionId))) {
      row.appendChild(button('learn-btn primary', t.chapterTestEx, () => startLevel(chapterKey(level.chapter.sectionId, true))));
    }
    if (level.unit) {
      const index = unitIndex(level.unit.id);
      const { slot, unit } = level;
      if (slot < MIX_SLOT) {
        const nextTitle = slot + 1 === MIX_SLOT ? t.mix : `${t.adv(slot + 1)} · ${tx(unit.branch?.[slot]?.title)}`;
        row.appendChild(button('learn-btn primary', nextTitle, () => startLevel(levelKey(unit.id, slot + 1))));
      }
      if (slot === 0 && index >= 0 && index < UNITS.length - 1) row.appendChild(button('learn-btn ghost', `${t.nextUnit} · ${tx(UNITS[index + 1].title)}`, () => startLevel(UNITS[index + 1].id)));
      unitTools(unit).forEach((tool) => row.appendChild(toolButton(tool.feature, tool.q, t.tool(toolName(tool.feature)), 'learn-link')));
    }
    row.appendChild(button('learn-btn ghost', t.backToMap, () => renderMap()));
    shell.appendChild(row);
    if (!before) shell.classList.add('is-first');
    root.appendChild(shell);
    if (key === FINAL_KEY) celebrateFinal(shell);
    if (key === FINAL_EX_KEY) { celebrateFinal(shell); celebrateEx(); }
    if (level.chapter?.ex) celebrateFinal(shell);
    session = null;
  }

  /** 供外部（工具面板的"看不懂？玩教程"按钮、链接）直接打开某一关；从工具跳来时即使没解锁也可以玩 */
  target.openUnit = (id) => {
    // Side-B 的链接：#learn?q=@sideb、@sideb-resume（从工具回到课程）、@lab-return:<id>（提交了实操）、b:<关卡>
    if (id === '@sideb') { showSideB(); return; }
    if (id === '@sideb-resume') { showSideB((b) => b.resume()); return; }
    if (String(id).startsWith('@lab-return:')) { showSideB((b) => b.labReturn(String(id).slice(12))); return; }
    if (/^b:/.test(id)) { showSideB((b) => b.openLevel(id.slice(2))); return; }
    if (sideB) flipBack(false);
    if (id === FINAL_KEY || id === FINAL_EX_KEY || parseChapterKey(id)) { startLevel(id); return; }
    const { unitId } = parseLevelKey(id);
    if (unitIndex(unitId) < 0 && !SIDES.some((side) => side.id === unitId)) { renderMap(); return; }
    startLevel(id);
  };
  /** 回到学习记录里的那一关、那一题 */
  /** 当前题卡（只读；测试脚本用来自动作答） */
  target.currentCard = () => (session && !isFinished(session) ? currentItem(session).card : null);
  /** Side-B 当前的关卡进度（只读；测试脚本用） */
  target.sideBSession = () => sideB?.session ?? null;
  target.resume = () => {
    if (sideB) flipBack(false);
    const record = loadResume();
    if (!record?.session) { renderMap(); return false; }
    level = levelInfo(record.key);
    session = record.session;
    renderCard();
    return true;
  };
  // ---------------- 翻面：Side-B ----------------
  /** 上次停在哪一面（和 sideb_engine.loadSide 同一个键） */
  const readSide = () => { try { return JSON.parse(globalThis.localStorage?.getItem(SIDE_KEY) || '"a"') === 'b' ? 'b' : 'a'; } catch (_) { return 'a'; } };
  const writeSide = (side) => { try { globalThis.localStorage?.setItem(SIDE_KEY, JSON.stringify(side)); } catch (_) { /* 无痕模式等 */ } };
  /** 整张地图翻过去：先转到侧面，换成另一面的内容，再转回来（减少动态效果时直接切换） */
  function flipTo(render) {
    const animate = !reducedMotion() && root.isConnected;
    if (!animate) { render(); return Promise.resolve(); }
    root.classList.add('flip-out');
    return new Promise((done) => setTimeout(() => {
      Promise.resolve(render()).then(() => {
        root.classList.remove('flip-out');
        root.classList.add('flip-in');
        // 翻面动画进行时页面是转着的，量出来的位置不对（小路会变成一条直线）：翻完再重画一次
        setTimeout(() => { root.classList.remove('flip-in'); if (!sideB && !session) drawTrails(); done(); }, 320);
      });
    }, 220));
  }
  function showSideB(then, { animate = true } = {}) {
    if (!sideBOpen()) { renderMap(); return; }
    stop(); closeSheets();
    const mount = () => import('./sideb_ui.js?v=20261005-p6').then(({ mountSideB }) => {
      writeSide('b');
      root.classList.add('is-side-b');
      sideB = mountSideB(root, {
        playChord,
        onFlipBack: () => flipTo(() => flipBack()),
        openA: (id) => { flipBack(false); target.openUnit(id); },
        aTitle: (id) => tx((UNITS.find((u) => u.id === id) || SIDES.find((side) => side.id === id))?.title) || id,
        // 去工具：B 面关卡对应的 A 面关卡用到的工具（含 extraTools），以及节点上单独写的工具
        toolsFor: (ids) => { const seen = new Set(); return ids.flatMap((id) => { const u = UNITS.find((x) => x.id === id) || SIDES.find((x) => x.id === id); return u ? unitTools(u) : []; }).filter((x) => { const k = `${x.feature}|${x.q || ''}`; if (seen.has(k)) return false; seen.add(k); return true; }); },
        toolName,
        openTool: (feature, query) => goToTool(feature, query),
        progressView: () => { progress = loadProgress(); return sideBView(); },
      });
      then?.(sideB);
    });
    if (sideB || !animate) { mount(); return; }
    flipTo(mount);
  }
  function flipBack(render = true) {
    sideB?.stop?.();
    sideB = null;
    writeSide('a');
    root.classList.remove('is-side-b');
    progress = loadProgress();
    if (render) renderMap();
  }
  // 上次停在 B 面：直接打开 B 面（不播翻面动画）
  if (readSide() === 'b' && sideBOpen()) showSideB(null, { animate: false }); else renderMap();
}

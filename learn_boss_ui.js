// 乐理闯关 Boss 战的界面：立绘舞台（纸片翻转换图、果冻起伏）、名牌、15 格"认可"条、对话气泡、题目绑定方式标签；
// 开场与结局画面。规则与台词在 learn_bosses.js / learn_boss_lines.js，题目渲染沿用 learn_ui.js 的题卡播放器。
// 不强调打斗：答对时不用受击表情、不闪光，认可条一格一格亮起来；Boss 只是点头、评论或嘴硬。
// 点 Boss 会说话；同一道题点太多次（LEAK_AFTER），Boss 会不小心说漏答案，之后再点只会装傻。
// 无障碍：气泡文字用 aria-live 播报，认可条有文字"认可 n / 15"，题目绑定方式写成文字标签。
import { CAST, MODE_LABEL, askState, reactState, pickLine, statesUsed, endingSet, leakLine, LEAK_AFTER } from './learn_bosses.js?v=20261011-jz1';
import { createBossSprite, preloadStates } from './boss_sprite.js?v=20261010-cameo1';
import { randomRegister, hzToMidi } from './learn_sfx.js?v=20261011-snd2';
/** 答对时的音效名（随机高度） */
const RIGHT_SOUNDS = ['hit', 'streak'];

const STATE_LABEL = {
  default: { zh: '默认', ja: '通常', en: 'default' }, proud: { zh: '得意', ja: '得意げ', en: 'proud' }, mocking: { zh: '调侃', ja: 'からかい', en: 'teasing' },
  confused: { zh: '疑惑', ja: '困惑', en: 'puzzled' }, shocked: { zh: '吃惊', ja: '驚き', en: 'surprised' }, angry: { zh: '生气', ja: '怒り', en: 'cross' },
  serious: { zh: '认真', ja: '真剣', en: 'serious' }, hurt: { zh: '吃痛', ja: '痛がる', en: 'wincing' }, defiant: { zh: '嘴硬', ja: '強がり', en: 'stubborn' },
  concede: { zh: '认输', ja: '降参', en: 'conceding' }, idle: { zh: '待机', ja: '待機', en: 'idle' }, speaking: { zh: '讲话', ja: '話す', en: 'speaking' },
  correct: { zh: '答对反应', ja: '正解への反応', en: 'reacting to a right answer' }, incorrect: { zh: '答错反应', ja: '不正解への反応', en: 'reacting to a wrong answer' },
  streak: { zh: '连续答对反应', ja: '連続正解への反応', en: 'reacting to a streak' }, one_star: { zh: '1 星结局', ja: '星 1 の結末', en: 'one-star ending' },
  two_star: { zh: '2 星结局', ja: '星 2 の結末', en: 'two-star ending' }, three_star: { zh: '3 星结局', ja: '星 3 の結末', en: 'three-star ending' },
  phase2: { zh: '第二阶段', ja: '第 2 形態', en: 'phase two' }, first_meeting: { zh: '初次见面', ja: '初対面', en: 'first meeting' }, return_meeting: { zh: '再次见面', ja: '再会', en: 'second meeting' },
};
const TEXT = {
  zh: { meter: (n, m) => `认可 ${n} / ${m}`, phase: '第二阶段', last: '最后一题', fight: '开始', skip: '跳过对话', next: '继续', ex: 'EX', boss: 'BOSS', mid: '道中', q: (i, n) => `第 ${i} / ${n} 题`, tap: '点一下角色，会弹一下、说句话', leaked: '答案被说漏了' },
  ja: { meter: (n, m) => `認め ${n} / ${m}`, phase: '第 2 形態', last: 'ラスト一問', fight: 'はじめる', skip: '会話をとばす', next: '次へ', ex: 'EX', boss: 'BOSS', mid: '道中', q: (i, n) => `${i} / ${n} 問目`, tap: 'キャラをクリックすると跳ねて話す', leaked: '答えがもれた' },
  en: { meter: (n, m) => `Recognition ${n} / ${m}`, phase: 'Phase two', last: 'Final question', fight: 'Start', skip: 'Skip dialogue', next: 'Next', ex: 'EX', boss: 'BOSS', mid: 'Midpoint', q: (i, n) => `Question ${i} / ${n}`, tap: 'Click the character to make them bounce and talk', leaked: 'Answer leaked' },
};

/**
 * 一场 Boss 战的舞台。opts：{ boss, lang, playChord, midiToFrequency, sfxOn, rng }
 * 返回 { el, ask(card), react(correct, card, stats), restore(stats), say(line, state), setAnswer(text, answered), leaveQuestion(), ... }
 * el 在每道题之间保持同一个节点（重新挂到新的题卡上方），立绘才能从上一个状态翻转过来。
 */
export function createBossBattle({ boss, lang = 'zh', playChord, midiToFrequency = (m) => 440 * 2 ** ((m - 69) / 12), sfxOn = () => true, rng = Math.random }) {
  const cast = CAST[boss.cast];
  const T = TEXT[lang] || TEXT.en;
  const tx = (v) => (v == null ? '' : typeof v === 'string' ? v : v[lang] ?? v.en ?? '');
  const doc = globalThis.document;
  const el = (tag, cls, text) => { const n = doc.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
  const total = boss.questions.length;

  const stage = el('section', `learn-boss-stage cast-${boss.cast}${boss.ex ? ' is-ex' : ''}`);
  stage.setAttribute('aria-label', `${tx(cast.name)} · ${tx(boss.theme)}`);
  const sprite = createBossSprite({ dir: cast.dir, name: tx(cast.name), motion: cast.motion, state: boss.sprite || 'speaking', label: (s) => tx(STATE_LABEL[s]) });
  sprite.el.title = T.tap;
  const side = el('div', 'learn-boss-side');
  const plate = el('div', 'learn-boss-plate');
  plate.append(el('span', 'learn-boss-tag', boss.ex ? T.ex : boss.after ? T.mid : T.boss), el('strong', 'learn-boss-name', `${cast.code} · ${tx(cast.name)}`), el('span', 'learn-boss-title', tx(cast.title)));
  const meter = el('div', 'learn-boss-meter');
  meter.setAttribute('role', 'meter');
  meter.setAttribute('aria-valuemin', '0');
  meter.setAttribute('aria-valuemax', String(total));
  const cells = Array.from({ length: total }, () => meter.appendChild(el('span', 'learn-boss-cell')));
  const meterText = el('span', 'learn-boss-meter-text');
  const chips = el('div', 'learn-boss-chips');
  const bubble = el('p', 'learn-boss-bubble');
  bubble.setAttribute('aria-live', 'polite');
  side.append(plate, meter, meterText, chips, bubble);
  stage.append(sprite.el, side);
  preloadStates(cast.dir, statesUsed(boss));

  let earned = 0;
  const paintMeter = () => {
    cells.forEach((c, i) => c.classList.toggle('is-on', i < earned));
    meter.setAttribute('aria-valuenow', String(earned));
    meterText.textContent = T.meter(earned, total);
  };
  paintMeter();
  /** 与本章知识有关的音效（音效开关关掉时不响） */
  function sfx(name) {
    if (!playChord || !sfxOn()) return;
    const steps = (cast.sfx[name] || []).map((step) => (Array.isArray(step) ? step : step.hz.map(hzToMidi)));
    // 答对的声音（hit / streak）每次在 C4–C6 之间随机找一个高度；整体移调，和声关系不变
    const played = RIGHT_SOUNDS.includes(name) && steps.length ? randomRegister(steps, { rng }) : steps;
    played.forEach((midis, i) => setTimeout(() => {
      playChord(midis.map(midiToFrequency), i === (played.length - 1) ? 1.1 : 0.32, { interrupt: i === 0 });
    }, i * 170));
  }
  function say(line, state) {
    bubble.textContent = tx(line);
    bubble.classList.remove('is-pop');
    void bubble.offsetWidth; // 重新播放弹出动画
    bubble.classList.add('is-pop');
    if (state) sprite.show(state);
  }
  const questionsBeforePhase = () => { const k = boss.questions.findIndex((q) => q.phase); return k < 0 ? total : k; };
  function setChips(q) {
    chips.replaceChildren(el('span', `learn-boss-chip mode-${q.mode}`, tx(MODE_LABEL[q.mode])), el('span', 'learn-boss-chip', T.q(q.index + 1, total)));
    if (q.phase) chips.appendChild(el('span', 'learn-boss-chip is-phase', T.phase));
    if (q.index === total - 1) chips.appendChild(el('span', 'learn-boss-chip is-last', T.last));
  }

  // ---- 点 Boss：说话；同一道题点太多次会说漏答案 ----
  let pokes = 0, leaked = false, answerText = '', inQuestion = false, isAnswered = false;
  function poke() {
    pokes += 1;
    if (inQuestion && !isAnswered && answerText) {
      if (leaked) { say(pickLine(cast.lines.shush, rng), 'defiant'); return; }
      if (pokes >= LEAK_AFTER) {
        leaked = true;
        say(leakLine(boss.cast, answerText, rng), 'confused');
        chips.appendChild(el('span', 'learn-boss-chip is-leak', T.leaked));
        return;
      }
    }
    const calm = boss.cast === 'zero' || boss.cast === 'sever' || boss.cast === 'araya';
    const mood = calm ? (pokes >= 3 ? 'serious' : 'default') : pokes >= 4 ? 'angry' : pokes >= 2 ? 'mocking' : 'speaking';
    say(pickLine(cast.lines.click, rng), mood);
  }
  sprite.el.addEventListener('click', poke);
  sprite.el.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) poke(); });

  /** 新的一题：立绘按题目绑定方式换，气泡随机说这一题的一句；转折题换第二阶段并响转阶段音 */
  function ask(card) {
    const q = card.boss;
    pokes = 0; leaked = false; inQuestion = true; isAnswered = false;
    stage.classList.toggle('is-phase2', q.index >= questionsBeforePhase());
    setChips(q);
    sprite.resync();
    say(pickLine(q.lines, rng), askState(q, q.index, boss.ex));
    if (q.phase) { sfx('phase'); stage.classList.add('is-turn'); setTimeout(() => stage.classList.remove('is-turn'), 900); }
  }
  /** 这一题的答案（泄露用）；answered：已经作答过（续玩时恢复） */
  function setAnswer(text, answered = false) { answerText = text || ''; isAnswered = answered; inQuestion = true; }
  /** 作答以后：答对点亮一格认可（不闪光、不受击），连对换表情；答错 Boss 只说一句并提醒看解析 */
  function react(correct, card, stats) {
    const q = card.boss;
    isAnswered = true;
    // 说漏答案的题：答对也不亮认可、不算星，Boss 说一句"不算你的"
    if (leaked && correct) { say(pickLine(cast.lines.leakedRight, rng), 'defiant'); return; }
    const { state, pool } = reactState(correct, stats, boss.cast);
    if (correct) { earned += 1; paintMeter(); sfx(pool === 'right' ? 'hit' : 'streak'); }
    const special = correct ? q.right : q.wrong;
    say(pickLine(special, rng) || pickLine(cast.lines[pool], rng), state);
  }
  /** 续玩：按已经答对的题数恢复认可条 */
  function restore({ hits = 0 } = {}) { earned = hits; paintMeter(); }
  /** 开场和结局时不在答题：点 Boss 只说闲话 */
  function leaveQuestion() { inQuestion = false; answerText = ''; }
  /** 这一题是否被说漏了答案 */
  const wasLeaked = () => leaked;
  return { el: stage, ask, react, restore, say, sfx, sprite, cast, tx, T, setAnswer, leaveQuestion, wasLeaked, ex: Boolean(boss.ex) };
}

/**
 * 开场：一句一句说开场白（点"继续"往下），最后"开始"。
 * lines：要说的台词（随机一套开场；二次见面时按上一次星级接一句；重战时先说一句重战台词）
 */
export function bossIntro(battle, root, { lines, onFight, onExit, title, theme, exitLabel, claim = null, claimLabel = '' }) {
  const doc = globalThis.document;
  const el = (tag, cls, text) => { const n = doc.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
  const btn = (cls, text, on) => { const b = el('button', cls, text); b.type = 'button'; b.addEventListener('click', on); return b; };
  const { T, tx } = battle;
  battle.leaveQuestion();
  const shell = el('div', 'learn-boss-intro');
  const head = el('div', 'learn-boss-intro-head');
  head.append(btn('learn-close', '✕', onExit), el('strong', 'learn-boss-intro-title', title), el('span', 'learn-boss-intro-theme', tx(theme)));
  head.firstChild.setAttribute('aria-label', exitLabel);
  // 这一战要打破的错误观点（阿拉娅那两场是玩家自己的默认想法）
  if (claim) { const c = el('p', 'learn-boss-intro-claim'); c.append(el('span', 'learn-boss-intro-claim-label', claimLabel), el('span', '', tx(claim))); head.appendChild(c); }
  const footer = el('div', 'learn-footer learn-boss-intro-foot');
  shell.append(head, battle.el, footer);
  root.replaceChildren(shell);
  battle.sfx('enter');
  let i = 0;
  const fight = btn('learn-btn primary wide', T.fight, onFight);
  const next = btn('learn-btn primary wide', T.next, () => { i += 1; show(); });
  const skip = btn('learn-link', T.skip, () => { i = lines.length - 1; show(); });
  function show() {
    // EX 从头到尾都是认真起来的第二阶段立绘；普通 Boss 开场时在讲话 / 默认之间换
    battle.say(lines[i], i === 0 || battle.ex ? null : (i % 2 ? 'speaking' : 'default'));
    footer.replaceChildren(...(i < lines.length - 1 ? [skip, next] : [fight]));
    (i < lines.length - 1 ? next : fight).focus?.();
  }
  show();
}

/**
 * 结局：随机一套结局台词，每句带表情——一句一句说，每说一句就翻转到对应的立绘。
 * 返回 { lines, play, stop, step }：lines 是全部 [表情, 台词]（结算页列出来），play 开始逐句播放。
 * extra：第一次通关 / 升星的特别台词（不带表情时用"讲话"）。爵三星时停止所有夸张动作。
 */
export function bossEnding(battle, { boss, stars, extra = [], rng = Math.random, gap = 1700, onLine = () => {} }) {
  battle.leaveQuestion();
  const set = [...endingSet(boss, stars, rng), ...extra.filter(Boolean).map((x) => (Array.isArray(x) ? x : ['speaking', x]))];
  if (battle.cast.motion === 'wild' && stars === 3) battle.sprite.still(true);
  battle.sfx(stars === 3 ? 'end' : 'hit');
  let k = 0, timer = null;
  const step = () => {
    if (k >= set.length) return false;
    const [state, line] = set[k];
    battle.say(line, state);
    onLine(line, state, k);
    k += 1;
    return k < set.length;
  };
  let gapMs = gap;
  const loop = () => { clearTimeout(timer); if (k >= set.length) return; if (gapMs <= 0) { while (step()); return; } timer = setTimeout(() => { if (step()) loop(); }, gapMs); };
  const play = () => { if (gapMs <= 0) { while (step()); return; } step(); loop(); };
  const stop = () => clearTimeout(timer);
  /** 改变台词速度（毫秒，0 = 立刻全部显示）；正在播放时接着按新速度 */
  const setGap = (ms) => { gapMs = ms; if (k > 0) loop(); };
  return { lines: set, play, stop, step, setGap };
}

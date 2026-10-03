// 二声部类别对位检查
// 规则逐条依据以下资料，规则代码后注明出处：
//   ref:omt-intervals   Open Music Theory「Intervals」：和声协和（完全：P1 P5 P8；不完全：3 6）、
//                       和声不协和（二度、七度、增减音程、纯四度）、旋律协和与旋律不协和（增减音程、七度）
//   ref:omt-cantus      Open Music Theory「Composing a cantus firmus」：定旋律的长度、起止、音域、高点、跳进规则
//   ref:omt-species1    Open Music Theory「First species」
//   ref:omt-species2    Open Music Theory「Second species」
//   ref:omt-species3    Open Music Theory「Third species」（经过音、辅助音、双辅助音、换音 nota cambiata）
//   ref:omt-species4    Open Music Theory「Fourth species」（挂留的预备、解决与允许的类型）
//   ref:omt2e-intro     Open Music Theory 2e「Introduction to species counterpoint」（以级进到达最后的八度或同度）
//   ref:omt2e-fifth     Open Music Theory 2e「Fifth species」（各类混合；八分音符成对出现在弱拍；挂留可加装饰）
// 时值单位为四分音符；定旋律每小节一个全音符（4）。
import { parsePitch, intervalBetween } from './pitch_spelling.js';

const PERFECT_SIMPLE = new Set([1, 5]);
const IMPERFECT_SIMPLE = new Set([3, 6]);

/** 和声音程分类（ref:omt-intervals） */
export function harmonicClass(interval) {
  if (!interval) return 'none';
  if (PERFECT_SIMPLE.has(interval.simple) && interval.quality === 'P') return 'perfect';
  if (IMPERFECT_SIMPLE.has(interval.simple) && (interval.quality === 'M' || interval.quality === 'm')) return 'imperfect';
  return 'dissonant';
}

/** 旋律音程是否协和（ref:omt-intervals：P4 P5 P8、二度、三度、六度；增减音程与七度不协和） */
export function isMelodicConsonance(interval) {
  if (!interval) return true;
  if (interval.generic === 1) return interval.quality === 'P';
  if (interval.generic > 8) return false;
  if (interval.quality.startsWith('A') || interval.quality.startsWith('d')) return false;
  return interval.generic !== 7;
}

// 挂留标记用的度数：大于九度的复音程化简（10→3、11→4、14→7、15→8），九度保留
const suspensionNumber = (interval) => (interval.generic > 9 ? ((interval.generic - 2) % 7) + 2 : interval.generic);
const suspensionType = (from, to) => `${suspensionNumber(from.interval)}-${suspensionNumber(to.interval)}`;

const isStep = (a, b) => a && b && Math.abs(b.diatonic - a.diatonic) === 1;
const direction = (a, b) => Math.sign(b.midi - a.midi);

/** 规则表：代码 → 出处与严重程度。界面按代码取文案。 */
export const RULES = {
  'cf-length': { ref: 'omt-cantus', severity: 'warning' },
  'cf-ends': { ref: 'omt-cantus', severity: 'error' },
  'cf-approach': { ref: 'omt-cantus', severity: 'error' },
  'cf-range': { ref: 'omt-cantus', severity: 'warning' },
  'cf-climax': { ref: 'omt-cantus', severity: 'warning' },
  'cf-leap-recovery': { ref: 'omt-cantus', severity: 'warning' },
  'cf-leap-run': { ref: 'omt-cantus', severity: 'warning' },
  'cf-leap-direction': { ref: 'omt-cantus', severity: 'warning' },
  'melodic-dissonance': { ref: 'omt-intervals', severity: 'error' },
  'start-interval': { ref: 'omt-species1', severity: 'error' },
  'final-interval': { ref: 'omt-species1', severity: 'error' },
  'final-step': { ref: 'omt2e-intro', severity: 'error' },
  'final-contrary': { ref: 'omt-species1', severity: 'error' },
  'penultimate': { ref: 'omt-species1', severity: 'warning' },
  'dissonance': { ref: 'omt-species1', severity: 'error' },
  'unison-inner': { ref: 'omt-species1', severity: 'error' },
  'parallel-perfect': { ref: 'omt-species1', severity: 'error' },
  'direct-perfect': { ref: 'omt-species1', severity: 'error' },
  'imperfect-run': { ref: 'omt-species1', severity: 'warning' },
  'voice-crossing': { ref: 'omt-species1', severity: 'warning' },
  'voice-overlap': { ref: 'omt-species1', severity: 'warning' },
  'range': { ref: 'omt-species1', severity: 'warning' },
  'climax': { ref: 'omt-species1', severity: 'warning' },
  'repetition': { ref: 'omt-species1', severity: 'warning' },
  'similar-leap': { ref: 'omt-species1', severity: 'warning' },
  'rhythm': { ref: 'omt-species2', severity: 'error' },
  'downbeat-dissonance': { ref: 'omt-species2', severity: 'error' },
  'downbeat-unison': { ref: 'omt-species2', severity: 'warning' },
  'downbeat-parallel': { ref: 'omt-species2', severity: 'error' },
  'downbeat-outline': { ref: 'omt-species2', severity: 'error' },
  'downbeat-imperfect-run': { ref: 'omt-species2', severity: 'warning' },
  'weak-not-passing': { ref: 'omt-species2', severity: 'error' },
  'downbeat-unison-3': { ref: 'omt-species3', severity: 'error' },
  'downbeat-parallel-3': { ref: 'omt-species3', severity: 'error' },
  'weak-unexplained': { ref: 'omt-species3', severity: 'error' },
  'suspension-preparation': { ref: 'omt-species4', severity: 'error' },
  'suspension-resolution': { ref: 'omt-species4', severity: 'error' },
  'suspension-type': { ref: 'omt-species4', severity: 'error' },
  'suspension-repeat': { ref: 'omt-species4', severity: 'warning' },
  'weak-perfect-run': { ref: 'omt-species4', severity: 'warning' },
  'cadence-suspension': { ref: 'omt-species4', severity: 'warning' },
  'eighth-placement': { ref: 'omt2e-fifth', severity: 'error' },
  'note-value': { ref: 'omt2e-fifth', severity: 'error' },
};

/** 将输入的小节（[{ p, d, tieIn }]）整理成带时间位置的音符序列 */
function timeline(bars) {
  const notes = [];
  bars.forEach((bar, barIndex) => {
    let onset = 0;
    bar.forEach((item, index) => {
      const pitch = item.p ? parsePitch(item.p) : null;
      if (item.p && !pitch) throw new Error(`无法识别的音: ${item.p}`);
      notes.push({ bar: barIndex, index, onset, duration: item.d, pitch, tieIn: Boolean(item.tieIn), rest: !item.p });
      onset += item.d;
    });
  });
  return notes;
}

/**
 * 检查定旋律本身（ref:omt-cantus）
 * @param {string[]} cantus 音高数组，如 ['D4','F4',…]
 */
export function checkCantus(cantus) {
  const issues = [];
  const add = (rule, bar, params = {}) => issues.push({ rule, bar, ...RULES[rule], params });
  const pitches = cantus.map(parsePitch);
  if (pitches.some((p) => !p)) throw new Error('定旋律中有无法识别的音');
  if (pitches.length < 8 || pitches.length > 16) add('cf-length', 0, { count: pitches.length });
  const first = pitches[0];
  const last = pitches[pitches.length - 1];
  if (first.pc !== last.pc) add('cf-ends', pitches.length - 1);
  if (pitches.length > 1 && !isStep(pitches[pitches.length - 2], last)) add('cf-approach', pitches.length - 1);
  const low = Math.min(...pitches.map((p) => p.diatonic));
  const high = Math.max(...pitches.map((p) => p.diatonic));
  if (high - low + 1 > 10) add('cf-range', 0, { span: high - low + 1 });
  const highest = Math.max(...pitches.map((p) => p.midi));
  if (pitches.filter((p) => p.midi === highest).length > 1) add('cf-climax', pitches.findIndex((p) => p.midi === highest));
  let leapRun = 0;
  for (let i = 1; i < pitches.length; i++) {
    const interval = intervalBetween(pitches[i - 1], pitches[i]);
    if (!isMelodicConsonance(interval)) add('melodic-dissonance', i, { interval: interval.name });
    const leap = interval.generic > 2;
    leapRun = leap ? leapRun + 1 : 0;
    if (leapRun > 2) add('cf-leap-run', i);
    if (leap && i >= 2 && intervalBetween(pitches[i - 2], pitches[i - 1]).generic > 2 && direction(pitches[i - 2], pitches[i - 1]) === direction(pitches[i - 1], pitches[i])) add('cf-leap-direction', i);
    if (interval.generic >= 4 && i + 1 < pitches.length) {
      const next = pitches[i + 1];
      if (!(isStep(pitches[i], next) && direction(pitches[i], next) === -direction(pitches[i - 1], pitches[i]))) add('cf-leap-recovery', i + 1);
    }
  }
  return issues;
}

/**
 * 检查对位声部。
 * @param {{ species: 1|2|3|4|5, cantus: string[], bars: Array<Array<{p: string|null, d: number, tieIn?: boolean}>>, position: 'above'|'below' }} input
 * @returns {{ issues: Array, annotations: Array<{ bar, index, interval, cls }> }}
 */
export function checkCounterpoint({ species, cantus, bars, position = 'above' }) {
  const issues = [];
  const annotations = [];
  const add = (rule, bar, index = 0, params = {}) => issues.push({ rule, bar, index, ...RULES[rule], params });
  const cf = cantus.map(parsePitch);
  if (cf.some((p) => !p)) throw new Error('定旋律中有无法识别的音');
  if (bars.length !== cf.length) throw new Error(`对位有 ${bars.length} 小节，定旋律有 ${cf.length} 个音`);
  const notes = timeline(bars);
  const sounding = notes.filter((n) => !n.rest);
  const above = position === 'above';

  // 每个音与当时定旋律的音程
  for (const note of sounding) {
    const interval = intervalBetween(cf[note.bar], note.pitch);
    note.interval = interval;
    note.cls = harmonicClass(interval);
    note.crossed = above ? note.pitch.midi < cf[note.bar].midi : note.pitch.midi > cf[note.bar].midi;
    annotations.push({ bar: note.bar, index: note.index, interval: interval.name, cls: note.cls });
  }
  if (!sounding.length) return { issues, annotations };

  // ---- 通用：开始、结束、旋律音程 ----
  const first = sounding[0];
  const last = sounding[sounding.length - 1];
  const startOk = above ? [1, 5].includes(first.interval.simple) && first.interval.quality === 'P' : first.interval.simple === 1 && first.interval.quality === 'P';
  if (!startOk) add('start-interval', first.bar, first.index, { interval: first.interval.name });
  if (!(last.interval.simple === 1 && last.interval.quality === 'P')) add('final-interval', last.bar, last.index, { interval: last.interval.name });
  const beforeLast = sounding[sounding.length - 2];
  if (beforeLast && !isStep(beforeLast.pitch, last.pitch)) add('final-step', last.bar, last.index);
  for (let i = 1; i < sounding.length; i++) {
    const prev = sounding[i - 1];
    const cur = sounding[i];
    if (cur.tieIn) continue;
    const interval = intervalBetween(prev.pitch, cur.pitch);
    if (!isMelodicConsonance(interval)) add('melodic-dissonance', cur.bar, cur.index, { interval: interval.name });
  }

  const downbeats = cf.map((_, bar) => sounding.find((n) => n.bar === bar && n.onset === 0) || null);
  const barStarts = cf.map((_, bar) => sounding.find((n) => n.bar === bar) || null);

  if (species === 1) checkFirst();
  if (species === 2) checkSecond();
  if (species === 3) checkThird();
  if (species === 4) checkFourth();
  if (species === 5) checkFifth();

  // ---- 第一类 ----
  function checkFirst() {
    // ref:omt-species1
    const bad = bars.findIndex((bar) => bar.length !== 1 || bar[0].d !== 4 || !bar[0].p);
    if (bad >= 0) add('rhythm', bad);
    let imperfectRun = 1;
    let repeats = 0;
    sounding.forEach((note, i) => {
      if (note.cls === 'dissonant') add('dissonance', note.bar, note.index, { interval: note.interval.name });
      if (note.interval.generic === 1 && i > 0 && i < sounding.length - 1) add('unison-inner', note.bar, note.index);
      if (note.crossed) add('voice-crossing', note.bar, note.index);
      if (i === 0) return;
      const prev = sounding[i - 1];
      const cfPrev = cf[prev.bar];
      const cfCur = cf[note.bar];
      const cpDir = direction(prev.pitch, note.pitch);
      const cfDir = direction(cfPrev, cfCur);
      if (prev.cls === 'perfect' && note.cls === 'perfect' && prev.interval.simple === note.interval.simple) add('parallel-perfect', note.bar, note.index, { interval: note.interval.name });
      else if (note.cls === 'perfect' && cpDir !== 0 && cpDir === cfDir) add('direct-perfect', note.bar, note.index, { interval: note.interval.name });
      if (note.cls === 'imperfect' && prev.cls === 'imperfect' && note.interval.simple === prev.interval.simple) {
        imperfectRun += 1;
        if (imperfectRun === 4) add('imperfect-run', note.bar, note.index, { interval: note.interval.simpleName });
      } else imperfectRun = 1;
      if (cpDir === 0) repeats += 1;
      if (cpDir !== 0 && cpDir === cfDir && intervalBetween(prev.pitch, note.pitch).generic > 2) add('similar-leap', note.bar, note.index);
      const overlap = above ? note.pitch.midi < cfPrev.midi : note.pitch.midi > cfPrev.midi;
      if (!note.crossed && overlap) add('voice-overlap', note.bar, note.index);
    });
    if (repeats > 1) add('repetition', 0, 0, { count: repeats });
    if (beforeLast) {
      if (!['M6', 'm3'].includes(beforeLast.interval.simpleName)) add('penultimate', beforeLast.bar, beforeLast.index, { interval: beforeLast.interval.name });
      const cpDir = direction(beforeLast.pitch, last.pitch);
      const cfDir = direction(cf[beforeLast.bar], cf[last.bar]);
      if (!(cpDir !== 0 && cpDir === -cfDir && isStep(beforeLast.pitch, last.pitch))) add('final-contrary', last.bar, last.index);
    }
    const midis = sounding.map((n) => n.pitch.diatonic);
    if (Math.max(...midis) - Math.min(...midis) + 1 > 12) add('range', 0, 0, { span: Math.max(...midis) - Math.min(...midis) + 1 });
    const highest = Math.max(...sounding.map((n) => n.pitch.midi));
    const peaks = sounding.filter((n) => n.pitch.midi === highest);
    const cfHighest = Math.max(...cf.map((p) => p.midi));
    if (peaks.length > 1 || peaks.some((n) => cf[n.bar].midi === cfHighest)) add('climax', peaks[0].bar, peaks[0].index);
  }

  // ---- 第二类（ref:omt-species2） ----
  function checkSecond() {
    bars.forEach((bar, index) => {
      const durations = bar.map((n) => n.d).join(',');
      const isLast = index === bars.length - 1;
      const isPenult = index === bars.length - 2;
      const okFirst = index === 0 && (durations === '2,2') && bar.every((n) => n.p || n === bar[0]);
      const ok = isLast ? durations === '4' && bar[0].p : isPenult ? durations === '4' || durations === '2,2' : index === 0 ? okFirst : durations === '2,2' && bar.every((n) => n.p);
      if (!ok) add('rhythm', index);
    });
    downbeatChecks({ unisonRule: 'downbeat-unison', parallelRun: 2, parallelRule: 'downbeat-parallel' });
    for (let i = 1; i < downbeats.length; i++) {
      const a = barStarts[i - 1];
      const b = downbeats[i];
      if (a && b && !isMelodicConsonance(intervalBetween(a.pitch, b.pitch))) add('downbeat-outline', b.bar, b.index);
    }
    sounding.forEach((note, i) => {
      if (note.onset === 0 || note.cls !== 'dissonant') return;
      if (!isPassing(sounding[i - 1], note, sounding[i + 1])) add('weak-not-passing', note.bar, note.index, { interval: note.interval.name });
    });
  }

  // ---- 第三类（ref:omt-species3） ----
  function checkThird() {
    bars.forEach((bar, index) => {
      const isLast = index === bars.length - 1;
      const durations = bar.map((n) => n.d).join(',');
      const ok = isLast ? durations === '4' && bar[0].p : durations === '1,1,1,1';
      if (!ok) add('rhythm', index);
    });
    downbeatChecks({ unisonRule: 'downbeat-unison-3', parallelRun: 3, parallelRule: 'downbeat-parallel-3' });
    sounding.forEach((note, i) => {
      if (note.onset === 0 || note.cls !== 'dissonant') return;
      const prev = sounding[i - 1];
      const next = sounding[i + 1];
      if (isPassing(prev, note, next) || isNeighbor(prev, note, next) || isDoubleNeighbor(i) || isCambiata(i)) return;
      add('weak-unexplained', note.bar, note.index, { interval: note.interval.name });
    });
  }

  // ---- 第四类（ref:omt-species4） ----
  function checkFourth() {
    bars.forEach((bar, index) => {
      const isLast = index === bars.length - 1;
      const durations = bar.map((n) => n.d).join(',');
      const ok = isLast ? durations === '4' || durations === '2,2' : durations === '2,2';
      if (!ok) add('rhythm', index);
    });
    let lastSuspension = null;
    let weakPerfectPrev = null;
    sounding.forEach((note, i) => {
      if (note.onset === 0 && note.cls === 'dissonant') {
        const prep = sounding[i - 1];
        const res = sounding[i + 1];
        const tied = prep && prep.bar === note.bar - 1 && prep.pitch.midi === note.pitch.midi;
        if (!tied || prep.cls === 'dissonant') add('suspension-preparation', note.bar, note.index, { interval: note.interval.name });
        const resolves = res && res.bar === note.bar && isStep(note.pitch, res.pitch) && res.pitch.midi < note.pitch.midi && res.cls !== 'dissonant';
        if (!resolves) add('suspension-resolution', note.bar, note.index, { interval: note.interval.name });
        const type = res ? suspensionType(note, res) : '';
        // 上方：7–6、4–3、9–8（同度上的 2–1 即 9–8）；下方：2–3、5–6、4–5（ref:omt-species4）
        // 按此刻的实际上下位置判断（声部交叉时对位可能暂时在定旋律另一侧）
        const actuallyAbove = note.pitch.midi > cf[note.bar].midi || (note.pitch.midi === cf[note.bar].midi ? above : false);
        const allowed = actuallyAbove ? ['7-6', '4-3', '9-8', '2-1'] : ['2-3', '5-6', '4-5', '9-10'];
        if (resolves && !allowed.includes(type)) add('suspension-type', note.bar, note.index, { type });
        if (resolves && (type === '9-8' || type === '4-5') && lastSuspension?.type === type && lastSuspension.bar === note.bar - 1) add('suspension-repeat', note.bar, note.index, { type });
        lastSuspension = { type, bar: note.bar };
      } else if (note.onset === 0 && note.cls !== 'dissonant') {
        const res = sounding[i + 1];
        const tied = sounding[i - 1] && sounding[i - 1].pitch.midi === note.pitch.midi && note.tieIn;
        const type = tied && res && res.bar === note.bar ? suspensionType(note, res) : null;
        if (type === '6-5' && lastSuspension?.type === '6-5' && lastSuspension.bar === note.bar - 1) add('suspension-repeat', note.bar, note.index, { type });
        lastSuspension = type ? { type, bar: note.bar } : null;
      }
      if (note.onset === 2) {
        if (note.cls === 'dissonant' && !isPassing(sounding[i - 1], note, sounding[i + 1])) add('weak-not-passing', note.bar, note.index, { interval: note.interval.name });
        if (note.cls === 'perfect' && weakPerfectPrev && weakPerfectPrev.bar === note.bar - 1 && weakPerfectPrev.interval.simple === note.interval.simple) add('weak-perfect-run', note.bar, note.index, { interval: note.interval.name });
        weakPerfectPrev = note;
      }
    });
    const cadence = downbeats[downbeats.length - 2];
    if (cadence) {
      const res = sounding[sounding.indexOf(cadence) + 1];
      const type = res ? suspensionType(cadence, res) : '';
      if (!(above ? ['7-6'] : ['2-3', '9-10']).includes(type)) add('cadence-suspension', cadence.bar, cadence.index, { type });
    }
  }

  // ---- 第五类（ref:omt2e-fifth：各类混合；八分音符成对出现在弱拍） ----
  function checkFifth() {
    bars.forEach((bar, index) => {
      let onset = 0;
      bar.forEach((n, i) => {
        if (![4, 2, 1, 0.5].includes(n.d)) add('note-value', index, i, { value: n.d });
        if (n.d === 0.5) {
          const pair = bar[i + 1]?.d === 0.5 || bar[i - 1]?.d === 0.5;
          const weak = Math.floor(onset) === 1 || Math.floor(onset) === 3;
          if (!pair || !weak) add('eighth-placement', index, i);
        }
        onset += n.d;
      });
      if (onset !== 4) add('rhythm', index);
    });
    sounding.forEach((note, i) => {
      if (note.cls !== 'dissonant') return;
      const prev = sounding[i - 1];
      const next = sounding[i + 1];
      if (note.onset === 0 || (note.tieIn && note.onset === 2)) {
        const tied = note.tieIn && prev && prev.pitch.midi === note.pitch.midi && prev.cls !== 'dissonant';
        if (!tied) { add('suspension-preparation', note.bar, note.index, { interval: note.interval.name }); return; }
        // 第五类中挂留可加装饰：解决音可以紧接着出现，也可以落在同一小节后半拍（ref:omt2e-fifth）
        const halfBar = sounding.find((n) => n.bar === note.bar && n.onset === note.onset + 2);
        const resolvesTo = (target) => target && isStep(note.pitch, target.pitch) && target.pitch.midi < note.pitch.midi && target.cls !== 'dissonant';
        if (!resolvesTo(next) && !resolvesTo(halfBar)) add('suspension-resolution', note.bar, note.index, { interval: note.interval.name });
        return;
      }
      if (isPassing(prev, note, next) || isNeighbor(prev, note, next) || isDoubleNeighbor(i) || isCambiata(i)) return;
      add('weak-unexplained', note.bar, note.index, { interval: note.interval.name });
    });
  }

  function downbeatChecks({ unisonRule, parallelRun, parallelRule }) {
    let run = 1;
    let imperfectRun = 1;
    for (let bar = 0; bar < cf.length; bar++) {
      const note = downbeats[bar];
      if (!note) { run = 1; imperfectRun = 1; continue; }
      if (note.cls === 'dissonant') add('downbeat-dissonance', bar, note.index, { interval: note.interval.name });
      if (note.interval.generic === 1 && bar > 0 && bar < cf.length - 1) add(unisonRule, bar, note.index);
      const prev = downbeats[bar - 1];
      if (prev && note.cls === 'perfect' && prev.cls === 'perfect' && prev.interval.simple === note.interval.simple) {
        run += 1;
        if (run === parallelRun) add(parallelRule, bar, note.index, { interval: note.interval.name });
      } else run = 1;
      if (prev && note.cls === 'imperfect' && prev.cls === 'imperfect' && prev.interval.simple === note.interval.simple) {
        imperfectRun += 1;
        if (imperfectRun === 4) add('downbeat-imperfect-run', bar, note.index, { interval: note.interval.simpleName });
      } else imperfectRun = 1;
    }
  }

  // 经过音：级进进入、级进离开且方向相同，前后音协和
  function isPassing(prev, note, next) {
    return Boolean(prev && next && isStep(prev.pitch, note.pitch) && isStep(note.pitch, next.pitch)
      && direction(prev.pitch, note.pitch) === direction(note.pitch, next.pitch) && prev.cls !== 'dissonant' && next.cls !== 'dissonant');
  }
  // 辅助音：级进离开再级进回到原音
  function isNeighbor(prev, note, next) {
    return Boolean(prev && next && isStep(prev.pitch, note.pitch) && prev.pitch.midi === next.pitch.midi && prev.cls !== 'dissonant');
  }
  // 双辅助音：第 1、4 拍同音，第 2、3 拍为其上方与下方的级进音
  function isDoubleNeighbor(i) {
    const note = sounding[i];
    const start = sounding.findIndex((n) => n.bar === note.bar && n.onset === 0);
    if (start < 0 || note.onset === 0) return false;
    const [a, b, c, d] = sounding.slice(start, start + 4);
    if (!d || d.bar !== note.bar || a.pitch.midi !== d.pitch.midi) return false;
    return isStep(a.pitch, b.pitch) && isStep(a.pitch, c.pitch) && direction(a.pitch, b.pitch) === -direction(a.pitch, c.pitch) && (note === b || note === c);
  }
  // 换音：五音型，第 2 音不协和并以三度跳进到第 3 音；第 1、3、5 音协和
  function isCambiata(i) {
    for (let start = i - 1; start >= Math.max(0, i - 1); start--) {
      const [n1, n2, n3, n4, n5] = sounding.slice(start, start + 5);
      if (!n5 || n2 !== sounding[i]) continue;
      const d12 = direction(n1.pitch, n2.pitch);
      const shapeDown = d12 < 0 && isStep(n1.pitch, n2.pitch) && intervalBetween(n2.pitch, n3.pitch).generic === 3 && direction(n2.pitch, n3.pitch) < 0
        && isStep(n3.pitch, n4.pitch) && direction(n3.pitch, n4.pitch) > 0 && isStep(n4.pitch, n5.pitch) && direction(n4.pitch, n5.pitch) > 0;
      const shapeUp = d12 > 0 && isStep(n1.pitch, n2.pitch) && intervalBetween(n2.pitch, n3.pitch).generic === 3 && direction(n2.pitch, n3.pitch) > 0
        && isStep(n3.pitch, n4.pitch) && direction(n3.pitch, n4.pitch) < 0 && isStep(n4.pitch, n5.pitch) && direction(n4.pitch, n5.pitch) < 0;
      if ((shapeDown || shapeUp) && n1.cls !== 'dissonant' && n3.cls !== 'dissonant' && n5.cls !== 'dissonant') return true;
    }
    return false;
  }

  issues.sort((a, b) => a.bar - b.bar || a.index - b.index);
  return { issues, annotations };
}

/**
 * 解析文本输入：小节用 "|" 分隔，音用空格分隔。
 *   "r" 表示休止，前缀 "~" 表示与前一音相连（第四类挂留），后缀 ":w :h :q :e" 指定时值（第五类）。
 * 第一至第四类未写时值时按类别推断。
 */
export function parseCounterpointText(text, species) {
  const DEFAULT = { 1: 4, 2: 2, 3: 1, 4: 2, 5: 1 };
  const VALUE = { w: 4, h: 2, q: 1, e: 0.5 };
  return text.split('|').map((chunk) => chunk.trim()).filter(Boolean).map((chunk) => {
    const tokens = chunk.split(/\s+/).filter(Boolean);
    return tokens.map((token) => {
      const match = token.match(/^(~)?([^:]+?)(?::([whqe]))?$/);
      if (!match) throw new Error(`无法识别: ${token}`);
      const [, tie, body, value] = match;
      let d = value ? VALUE[value] : DEFAULT[species];
      if (!value && tokens.length === 1 && species !== 5) d = 4;
      if (!value && species === 5 && tokens.length === 1) d = 4;
      const item = { p: /^r$/i.test(body) ? null : body, d };
      if (tie) item.tieIn = true;
      return item;
    });
  });
}

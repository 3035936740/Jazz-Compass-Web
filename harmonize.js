// 旋律配和声（古典功能和声，三和弦及其第一转位）
// 和声语法依据 Open Music Theory 2e：
//   ref:omt2e-cadences     主功能只有 I（小调 i）；属功能为 V 与 vii°（小调相同）；
//                          PAC：最后的主和弦上旋律为 do，且 V 与 I 都是原位；IAC：仍为 V–I 但不满足上述条件；HC：乐句结束在 V
//   ref:omt2e-predominants ii6 与 IV 是强下属，都在低音上配 fa；ii 在 IV 之后、从不在 IV 之前；下属预示属和弦将至
//   ref:omt2e-phrase-model 乐句模型 Tb–PD–D–Te，乐句以终止式结束（半终止或正格终止）
//   ref:omt2e-tonic-v6     乐句开头以 V6 或转位 V7 延长主和弦（I–V6–I 等），本章未用原位 V 作延长
//   ref:omt2e-vii6         vii° 三和弦总是用第一转位 vii°6；它可代替相应低音的 V 转位
//   ref:omt2e-la-bass      vi 连接主和弦区域与强下属；V(7)–vi 为阻碍进行（作者不称之为终止）
//   ref:omt2e-mediant      iii 是弱下属，通常经由强下属走向 V（教材亦有 iii 直接到 V 的例子），多为原位
//   ref:omt2e-plagal       IV–I 在乐句开头或正格终止之后延长主和弦，作者不称其为终止
//   ref:sposobin           外声部（旋律与低音）不得构成连续八度或连续五度（四部写作规则）
// 排序方式（优先 PAC、优先在终止前出现强下属、减少同一和弦的重复）是本工具的启发式，不是教材规则。
import { parsePitch, spellAbove, parseNote } from './pitch_spelling.js';

/**
 * 和弦词汇：degrees 为相对主音的半音，bass 为低音所用的和弦音序号（0 根音、1 三音），
 * step 为根音的音级（0 = 主音），role：T 主、PDs 强下属、PDw 弱下属、D 属
 */
const VOCAB = {
  major: {
    I: { degrees: [0, 4, 7], step: 0, bass: 0, role: 'T' },
    I6: { degrees: [0, 4, 7], step: 0, bass: 1, role: 'T' },
    ii: { degrees: [2, 5, 9], step: 1, bass: 0, role: 'PDs' },
    ii6: { degrees: [2, 5, 9], step: 1, bass: 1, role: 'PDs' },
    iii: { degrees: [4, 7, 11], step: 2, bass: 0, role: 'PDw' },
    IV: { degrees: [5, 9, 0], step: 3, bass: 0, role: 'PDs' },
    V: { degrees: [7, 11, 2], step: 4, bass: 0, role: 'D' },
    V6: { degrees: [7, 11, 2], step: 4, bass: 1, role: 'D' },
    vi: { degrees: [9, 0, 4], step: 5, bass: 0, role: 'PDw' },
    'vii°6': { degrees: [11, 2, 5], step: 6, bass: 1, role: 'D' },
  },
  minor: {
    // 小调：V、V6、vii°6 用升高的导音（ref:omt2e-cadences：属功能"小调相同"）；III 用自然七级
    i: { degrees: [0, 3, 7], step: 0, bass: 0, role: 'T' },
    i6: { degrees: [0, 3, 7], step: 0, bass: 1, role: 'T' },
    'ii°6': { degrees: [2, 5, 8], step: 1, bass: 1, role: 'PDs' },
    III: { degrees: [3, 7, 10], step: 2, bass: 0, role: 'PDw' },
    iv: { degrees: [5, 8, 0], step: 3, bass: 0, role: 'PDs' },
    V: { degrees: [7, 11, 2], step: 4, bass: 0, role: 'D' },
    V6: { degrees: [7, 11, 2], step: 4, bass: 1, role: 'D' },
    VI: { degrees: [8, 0, 3], step: 5, bass: 0, role: 'PDw' },
    'vii°6': { degrees: [11, 2, 5], step: 6, bass: 1, role: 'D' },
  },
};

export function vocabulary(mode) {
  return VOCAB[mode === 'minor' ? 'minor' : 'major'];
}

const base = (name) => name.replace(/6$/, '');
const isTonic = (c) => ['I', 'i'].includes(base(c));
const isIV = (c) => ['IV', 'iv'].includes(c);
const isii = (c) => ['ii', 'ii°'].includes(base(c));
const isvi = (c) => ['vi', 'VI'].includes(c);
const isiii = (c) => ['iii', 'III'].includes(c);

/**
 * 乐句状态机。phase：Tb 开头主和弦区、Td 开头的延长性属和弦（V6、vii°6，须回到主和弦）、
 * Tp 开头的变格 IV（须回到主和弦）、PD 下属、D 终止属和弦（原位 V）、Te 终止主和弦、Tc 正格终止后的变格 IV
 */
function nextStates(state, names) {
  const out = [];
  const add = (chord, phase) => { if (chord && names.includes(chord)) out.push({ chord, phase }); };
  const pick = (test) => names.filter(test);
  const tonics = pick(isTonic);
  const strongPd = pick((c) => isii(c) || isIV(c));
  const { chord, phase } = state;
  switch (phase) {
    case 'Tb':
      tonics.forEach((c) => add(c, 'Tb'));
      add(pick(isIV)[0], 'Tp'); // ref:omt2e-plagal
      ['V6', 'vii°6'].forEach((c) => add(c, 'Td')); // ref:omt2e-tonic-v6 ref:omt2e-vii6
      [...strongPd, ...pick(isvi), ...pick(isiii)].forEach((c) => add(c, 'PD'));
      add('V', 'D');
      break;
    case 'Td':
      // ref:omt2e-tonic-v6：三和弦一组，首尾为 I 或 I6，中间和弦按终止时的原则解决。
      // 由此推出：V6 低音是导音 ti，须上行到 do，只接 I；vii°6 代替低音为 re 的 V4/3（ref:omt2e-vii6），re 可到 do 或 mi，接 I 或 I6
      if (chord === 'V6') add(tonics.find((c) => !c.endsWith('6')), 'Tb');
      else tonics.forEach((c) => add(c, 'Tb'));
      break;
    case 'Tp':
      tonics.forEach((c) => add(c, 'Tb'));
      break;
    case 'PD':
      add(chord, 'PD');
      if (isii(chord)) pick(isii).forEach((c) => add(c, 'PD')); // ii ↔ ii6 换位
      if (isvi(chord)) strongPd.forEach((c) => add(c, 'PD')); // ref:omt2e-la-bass
      if (isiii(chord)) { strongPd.forEach((c) => add(c, 'PD')); add('V', 'D'); } // ref:omt2e-mediant
      if (isIV(chord)) { pick(isii).forEach((c) => add(c, 'PD')); add('V', 'D'); } // ii 在 IV 之后（ref:omt2e-predominants）
      if (isii(chord)) add('V', 'D'); // ii 不回到 IV
      break;
    case 'D':
      add('V', 'D');
      add(tonics.find((c) => !c.endsWith('6')), 'Te');
      add(pick(isvi)[0], 'PD'); // 阻碍进行 V–vi（ref:omt2e-la-bass）
      break;
    case 'Te':
      add(tonics.find((c) => !c.endsWith('6')), 'Te');
      add(pick(isIV)[0], 'Tc'); // ref:omt2e-plagal
      break;
    case 'Tc':
      add(tonics.find((c) => !c.endsWith('6')), 'Te');
      break;
    default:
  }
  return out;
}

/**
 * 为旋律配和声。
 * @param {{ melody: string[], key: string, mode?: 'major'|'minor', cadence?: 'authentic'|'half', limit?: number }} options
 *   melody 为每个和声单位上的旋律音（带八度），一音一个和弦
 * @returns {{ results: Array<{ chords: string[], names: string[], functions: string[], cadence: string, score: number }>, key, mode }}
 */
export function harmonizeMelody({ melody, key = 'C', mode = 'major', cadence = 'authentic', limit = 6 }) {
  const vocab = vocabulary(mode);
  const names = Object.keys(vocab);
  const tonic = parseNote(key);
  if (!tonic) throw new Error(`无法识别的调: ${key}`);
  const pitches = melody.map(parsePitch);
  if (!pitches.length || pitches.some((p) => !p)) throw new Error('旋律中有无法识别的音');
  const degreeOf = (pitch) => (pitch.pc - tonic.pc + 12) % 12;
  const fits = (chord, pitch) => vocab[chord].degrees.includes(degreeOf(pitch));

  const KEEP = 16;
  const stateKey = (s) => `${s.chord}|${s.phase}`;
  let layer = new Map();
  const start = { chord: names.find((c) => isTonic(c) && !c.endsWith('6')), phase: 'Tb' };
  if (fits(start.chord, pitches[0])) layer.set(stateKey(start), [{ state: start, path: [start], cost: 0 }]);
  for (let i = 1; i < pitches.length; i++) {
    const next = new Map();
    for (const paths of layer.values()) {
      for (const item of paths) {
        for (const state of nextStates(item.state, names)) {
          if (!fits(state.chord, pitches[i])) continue;
          const repeat = state.chord === item.state.chord ? 1 : 0;
          const entry = { state, path: [...item.path, state], cost: item.cost + repeat };
          const k = stateKey(state);
          const bucket = next.get(k) || [];
          bucket.push(entry);
          bucket.sort((a, b) => a.cost - b.cost);
          if (bucket.length > KEEP) bucket.length = KEEP;
          next.set(k, bucket);
        }
      }
    }
    layer = next;
  }

  const finals = [];
  for (const paths of layer.values()) {
    for (const item of paths) {
      const last = item.state;
      const ok = cadence === 'half' ? last.phase === 'D' : last.phase === 'Te';
      if (!ok) continue;
      if (outerParallels(item.path.map((s) => s.chord), pitches, vocab, tonic.pc)) continue;
      // 终止式类型（ref:omt2e-cadences）：此处终止的 V 与 I 都是原位，旋律为 do 即 PAC
      let type = 'HC';
      let dIndex = item.path.findIndex((s) => s.phase === 'D');
      if (cadence !== 'half') {
        const cadenceIndex = item.path.findIndex((s, idx) => s.phase === 'Te' && item.path[idx - 1]?.phase === 'D');
        type = degreeOf(pitches[cadenceIndex]) === 0 ? 'PAC' : 'IAC';
        dIndex = cadenceIndex - 1;
        while (dIndex > 0 && item.path[dIndex - 1].phase === 'D') dIndex -= 1;
      }
      const strongPd = item.path.slice(0, dIndex).some((s) => s.phase === 'PD' && vocab[s.chord].role === 'PDs');
      const score = (type === 'PAC' ? 0 : 3) + (strongPd ? 0 : 2) + item.cost;
      finals.push({ chords: item.path.map((s) => s.chord), type, score, phases: item.path.map((s) => s.phase) });
    }
  }
  finals.sort((a, b) => a.score - b.score);
  const seen = new Set();
  const results = [];
  for (const item of finals) {
    const signature = item.chords.join(' ');
    if (seen.has(signature)) continue;
    seen.add(signature);
    results.push({
      chords: item.chords,
      names: item.chords.map((roman) => chordName(key, roman, mode)),
      functions: item.phases.map((phase, i) => functionLabel(phase, vocab[item.chords[i]].role)),
      cadence: item.type,
      score: item.score,
    });
    if (results.length >= limit) break;
  }
  return { results, key, mode };
}

/** 旋律与低音在相邻两个和弦上构成相同的八度/同度或纯五度，且两者都移动了：连续八度或五度（ref:sposobin） */
function outerParallels(chords, pitches, vocab, tonicPc) {
  const bassPc = (roman) => (tonicPc + vocab[roman].degrees[vocab[roman].bass]) % 12;
  for (let i = 1; i < chords.length; i++) {
    const before = (pitches[i - 1].pc - bassPc(chords[i - 1]) + 12) % 12;
    const after = (pitches[i].pc - bassPc(chords[i]) + 12) % 12;
    const moved = pitches[i - 1].pc !== pitches[i].pc && bassPc(chords[i - 1]) !== bassPc(chords[i]);
    if (moved && before === after && (before === 0 || before === 7)) return true;
  }
  return false;
}

function functionLabel(phase, role) {
  if (phase === 'Tb' || phase === 'Te') return 'T';
  if (phase === 'Td' || phase === 'Tp' || phase === 'Tc') return 'T';
  return role === 'D' ? 'D' : 'PD';
}

/** 和弦名（根音按调内音级拼写，转位写成斜线低音），如 C 大调 vii°6 → B°/D */
export function chordName(key, roman, mode = 'major') {
  const chord = vocabulary(mode)[roman];
  const root = spellAbove(key, chord.step, chord.degrees[0]);
  const [r, t, f] = chord.degrees;
  const third = (t - r + 12) % 12;
  const fifth = (f - r + 12) % 12;
  const quality = third === 3 && fifth === 6 ? '°' : third === 4 && fifth === 8 ? '+' : third === 3 ? 'm' : '';
  if (chord.bass === 0) return `${root}${quality}`;
  const bass = spellAbove(root, 2, (t - r + 12) % 12);
  return `${root}${quality}/${bass}`;
}

/** 生成供 classical_voicing.solveVoicings 使用的条目（导音不重复 ref:omt2e-roman-numerals；高音声部固定为旋律音） */
export function voicingEntries({ key, mode, chords, melody }) {
  const vocab = vocabulary(mode);
  const tonicPc = parseNote(key).pc;
  const leadingPc = (tonicPc + 11) % 12;
  return chords.map((roman, i) => {
    const chord = vocab[roman];
    const pcs = chord.degrees.map((d) => (tonicPc + d) % 12);
    const maxCounts = Object.fromEntries(pcs.map((pc) => [pc, pc === leadingPc ? 1 : 2]));
    return {
      symbol: roman,
      pitchClasses: pcs,
      bassPc: pcs[chord.bass],
      maxCounts,
      sopranoMidi: parsePitch(melody[i]).midi,
      leadingPc: pcs.includes(leadingPc) ? leadingPc : null,
      seventhPc: null,
      tonicPc,
    };
  });
}

/** 按和弦音级拼写某个声部的音（带八度），如 A 小调 V 的导音写作 G#4 而不是 Ab4 */
export function spellVoice(key, mode, roman, midi) {
  const chord = vocabulary(mode)[roman];
  const tonicPc = parseNote(key).pc;
  const root = spellAbove(key, chord.step, chord.degrees[0]);
  const member = chord.degrees.findIndex((d) => (tonicPc + d) % 12 === ((midi % 12) + 12) % 12);
  const name = member < 0 ? null : spellAbove(root, member * 2, (chord.degrees[member] - chord.degrees[0] + 12) % 12);
  const parsed = name && parseNote(name);
  if (!parsed) return null;
  const natural = [0, 2, 4, 5, 7, 9, 11][parsed.step];
  const octave = Math.round((midi - natural - parsed.accidental) / 12) - 1;
  return `${name}${octave}`;
}

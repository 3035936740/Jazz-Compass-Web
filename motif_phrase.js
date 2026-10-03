// 旋律动机发展与乐句结构（纯逻辑，可在 Node 里测试）
// 依据：
//   动机是比"乐思"还小的、会反复出现的单位；常见变化：扩大（时值变长）、紧缩（时值变短）、倒影（方向相反）、
//   移位（换拍位）、逆行（倒过来）、音程变化、加装饰音：ref:omt2e-form-concepts
//   模进（同一单位移到别的音高上重复）：ref:wiki-sequence ref:omt2e-phrase；动机的定义：ref:wiki-motif
//   乐句：乐句是朝向终止的相对完整的乐思；乐句型（sentence）= 呈示（基本乐思 + 它的重复）+ 展开（碎片化、节奏加密、模进、和声节奏加快）走向终止；
//   乐段（period）= 前句（基本乐思 + 对比乐思 → 较弱的终止 多为半终止）+ 后句（基本乐思 + 对比乐思 → 较强的终止 多为完全正格终止）：ref:omt2e-phrase
//   扩充：内部扩充（重复、拉长、再来一次 one-more-time、另辟路径）与外部扩充（前缀、后缀：终止后的补充、尾声）：ref:omt2e-phrase-expansion
//   终止：PAC 原位 V–I 且旋律落在 do；HC 停在 V：ref:omt2e-cadences
export const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const NATURAL = [0, 2, 4, 5, 7, 9, 11];
const MAJOR = [0, 2, 4, 5, 7, 9, 11];
const MINOR = [0, 2, 3, 5, 7, 8, 10];
const DUR = { w: 4, h: 2, q: 1, e: 0.5, s: 0.25 };
const mod = (n, m = 12) => ((n % m) + m) % m;

/** 调：主音字母 + 音级 + 音阶 */
export function keyInfo(name = 'C', mode = 'major') {
  const m = /^([A-G])([#b]?)$/.exec(name) || ['C', 'C', ''];
  const letter = LETTERS.indexOf(m[1]);
  const pc = mod(NATURAL[letter] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0));
  return { name, mode, letter, pc, scale: mode === 'minor' ? MINOR : MAJOR };
}

/** 'C4:q D4:e. r:q' → [{ midi, beats, rest }]；时值 w h q e s，后面加 . 是附点；默认四分音符 */
export function parseMotif(text) {
  const tokens = String(text).replace(/\|/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return null;
  const out = [];
  for (const tok of tokens) {
    const m = /^(?:([A-G])([#b]{0,2})(-?\d)|(r))(?::([whqes])(\.?))?$/.exec(tok);
    if (!m) return null;
    const beats = (DUR[m[5] || 'q']) * (m[6] ? 1.5 : 1);
    if (m[4]) { out.push({ rest: true, beats }); continue; }
    const alter = (m[2].match(/#/g) || []).length - (m[2].match(/b/g) || []).length;
    out.push({ midi: (Number(m[3]) + 1) * 12 + NATURAL[LETTERS.indexOf(m[1])] + alter, beats });
  }
  return out;
}
export const totalBeats = (notes) => notes.reduce((s, n) => s + n.beats, 0);

// ---------------- 音级运算 ----------------
/** MIDI → 音阶步数（八度 × 7 + 级数）与半音偏移（调外音） */
export function stepOf(midi, key) {
  const rel = midi - key.pc;
  const octave = Math.floor(rel / 12);
  const pc = mod(rel);
  let degree = 6;
  for (let d = 0; d < 7; d += 1) if (key.scale[d] <= pc) degree = d;
  return { step: octave * 7 + degree, offset: pc - key.scale[degree] };
}
export function fromStep(step, offset, key) {
  const octave = Math.floor(step / 7);
  return key.pc + octave * 12 + key.scale[mod(step, 7)] + offset;
}
/** 按调拼写：调内音用调的字母，调外音按升高的级数写 */
export function spellNote(midi, key) {
  const { step, offset } = stepOf(midi, key);
  const letter = mod(key.letter + step, 7);
  const alter = mod(midi - NATURAL[letter] + 6) - 6;
  const acc = alter > 0 ? '#'.repeat(alter) : 'b'.repeat(-alter);
  const octave = Math.floor((midi - alter - NATURAL[letter]) / 12) - 1;
  return `${LETTERS[letter]}${acc}${octave}`;
}

// ---------------- 动机变化 ----------------
const copy = (notes) => notes.map((n) => ({ ...n }));
export const TRANSFORMS = {
  /** 模进：整体沿音阶移动 k 级 */
  sequence: (notes, key, k = 1) => notes.map((n) => (n.rest ? { ...n } : (() => { const s = stepOf(n.midi, key); return { ...n, midi: fromStep(s.step + k, s.offset, key) }; })())),
  /** 倒影：以第一个音为轴，音阶上的方向反过来 */
  inversion: (notes, key) => {
    const first = notes.find((n) => !n.rest);
    if (!first) return copy(notes);
    const axis = stepOf(first.midi, key).step;
    return notes.map((n) => (n.rest ? { ...n } : (() => { const s = stepOf(n.midi, key); return { ...n, midi: fromStep(2 * axis - s.step, -s.offset, key) }; })()));
  },
  /** 逆行：从最后一个音倒着唱 */
  retrograde: (notes) => copy(notes).reverse(),
  /** 扩大：时值加倍 */
  augmentation: (notes) => notes.map((n) => ({ ...n, beats: n.beats * 2 })),
  /** 紧缩：时值减半 */
  diminution: (notes) => notes.map((n) => ({ ...n, beats: n.beats / 2 })),
  /** 移位：晚半拍开始（前面加休止） */
  displacement: (notes, key, beats = 0.5) => [{ rest: true, beats }, ...copy(notes)],
  /** 音程变化：每个音程（同音除外）在原方向上再扩大一级 */
  intervals: (notes, key) => {
    const out = []; let prevOrig = null; let prevNew = null;
    notes.forEach((n) => {
      if (n.rest) { out.push({ ...n }); return; }
      if (prevOrig == null) { out.push({ ...n }); prevOrig = stepOf(n.midi, key).step; prevNew = prevOrig; return; }
      const s = stepOf(n.midi, key);
      const d = s.step - prevOrig;
      const nd = d === 0 ? 0 : d + Math.sign(d);
      out.push({ ...n, midi: fromStep(prevNew + nd, s.offset, key) });
      prevOrig = s.step; prevNew += nd;
    });
    return out;
  },
  /** 节奏变化：两个等长的音改成附点长短 */
  rhythm: (notes) => {
    const out = [];
    for (let i = 0; i < notes.length; i += 1) {
      const a = notes[i]; const b = notes[i + 1];
      if (b && !a.rest && !b.rest && a.beats === b.beats && a.beats >= 0.5) { out.push({ ...a, beats: a.beats * 1.5 }, { ...b, beats: b.beats * 0.5 }); i += 1; }
      else out.push({ ...a });
    }
    return out;
  },
  /** 加装饰音：三度之间填经过音，重复音之间加上邻音（从前一个音里分出时值） */
  embellish: (notes, key) => {
    const out = [];
    notes.forEach((n, i) => {
      const next = notes[i + 1];
      if (!n.rest && next && !next.rest && n.beats >= 0.5) {
        const a = stepOf(n.midi, key); const b = stepOf(next.midi, key);
        const d = b.step - a.step;
        if (Math.abs(d) === 2) { out.push({ ...n, beats: n.beats / 2 }, { midi: fromStep(a.step + Math.sign(d), 0, key), beats: n.beats / 2, added: 'passing' }); return; }
        if (d === 0) { out.push({ ...n, beats: n.beats / 2 }, { midi: fromStep(a.step + 1, 0, key), beats: n.beats / 2, added: 'neighbor' }); return; }
      }
      out.push({ ...n });
    });
    return out;
  },
  /** 碎片化：只取前一半（按时值） */
  fragment: (notes) => {
    const half = totalBeats(notes) / 2;
    const out = []; let sum = 0;
    for (const n of notes) { if (sum >= half) break; out.push({ ...n, beats: Math.min(n.beats, half - sum) }); sum += n.beats; }
    return out;
  },
};
export const TRANSFORM_IDS = Object.keys(TRANSFORMS);

// ---------------- 乐句 ----------------
/** 把一个单位补齐到整小节（最后一个音延长） */
function fill(notes, meter) {
  const total = totalBeats(notes);
  const bars = Math.max(1, Math.ceil(total / meter - 1e-9));
  const missing = bars * meter - total;
  if (missing > 1e-9 && notes.length) notes = [...notes.slice(0, -1), { ...notes.at(-1), beats: notes.at(-1).beats + missing }];
  return notes;
}
const L = (zh, en, ja = en) => ({ zh, ja, en });
export const UNIT_LABELS = {
  bi: L('基本乐思 b.i.', 'basic idea (b.i.)', '基本楽想 b.i.'),
  rep: L('重复 / 变化重复', 'repetition', '反復 / 変化した反復'),
  frag: L('碎片化', 'fragmentation', '断片化'),
  cad: L('终止乐思', 'cadential idea', '終止楽想'),
  ci: L('对比乐思 c.i.', 'contrasting idea (c.i.)', '対照楽想 c.i.'),
  ext: L('扩充', 'expansion', '拡大'),
  evaded: L('终止被回避', 'evaded cadence', '回避された終止'),
  suffix: L('后缀（终止后的补充）', 'suffix (post-cadential)', '接尾（終止後の補足）'),
};

/**
 * 由动机生成乐句：type = 'sentence'（乐句型）或 'period'（乐段）
 * 返回 { units: [{ id, label, notes, chords: [{ roman, beats }], group }], meter, key, cadence }
 */
export function buildPhrase(motif, { type = 'sentence', key = keyInfo('C'), meter = 4 } = {}) {
  const bi = fill(motif.filter((n) => n.beats > 0), meter);
  const barBeats = totalBeats(bi);
  const lastNote = [...bi].reverse().find((n) => !n.rest) || { midi: key.pc + 60 };
  const T = key.mode === 'minor' ? 'i' : 'I';
  if (type === 'period') {
    // 对比乐思：前句 la–fa–re 落在 V 上（半终止），后句 fa–re–do 落在 I 上（完全正格终止）；八度靠近基本乐思的最后一个音
    const oct = Math.floor((stepOf(lastNote.midi, key).step + 3) / 7);
    const at = (degree) => fromStep(oct * 7 + degree, 0, key);
    const q = barBeats / 4;
    const ciHC = fill([{ midi: at(5), beats: q }, { midi: at(3), beats: q }, { midi: at(1), beats: 2 * q }], meter);
    const ciPAC = fill([{ midi: at(3), beats: q }, { midi: at(1), beats: q }, { midi: at(0), beats: 2 * q }], meter);
    const PD = key.mode === 'minor' ? 'iv' : 'IV';
    return {
      meter, key, type,
      units: [
        { id: 'bi', group: 'antecedent', label: UNIT_LABELS.bi, notes: bi, chords: [{ roman: T, beats: barBeats }] },
        { id: 'ci', group: 'antecedent', label: UNIT_LABELS.ci, notes: ciHC, chords: [{ roman: PD, beats: barBeats / 2 }, { roman: 'V', beats: barBeats / 2 }], cadence: 'HC' },
        { id: 'bi', group: 'consequent', label: UNIT_LABELS.bi, notes: copy(bi), chords: [{ roman: T, beats: barBeats }] },
        { id: 'ci', group: 'consequent', label: UNIT_LABELS.ci, notes: ciPAC, chords: [{ roman: key.mode === 'minor' ? 'ii°' : 'ii', beats: barBeats / 4 }, { roman: 'V', beats: barBeats / 4 }, { roman: T, beats: barBeats / 2 }], cadence: 'PAC' },
      ],
    };
  }
  // 乐句型：呈示（b.i. + 上移一级的重复，主 → 属）+ 展开（碎片化的模进）+ 终止乐思（3–2–1 落在 do）
  const rep = TRANSFORMS.sequence(bi, key, 1);
  const frag = TRANSFORMS.fragment(bi);
  const frag2 = TRANSFORMS.sequence(frag, key, -1);
  const cadStart = stepOf(lastNote.midi, key).step;
  const cadOct = Math.floor(cadStart / 7);
  const cad = fill([
    { midi: fromStep(cadOct * 7 + 2, 0, key), beats: barBeats / 4 },
    { midi: fromStep(cadOct * 7 + 1, 0, key), beats: barBeats / 4 },
    { midi: fromStep(cadOct * 7, 0, key), beats: barBeats / 2 },
  ], meter);
  return {
    meter, key, type,
    units: [
      { id: 'bi', group: 'presentation', label: UNIT_LABELS.bi, notes: bi, chords: [{ roman: T, beats: barBeats }] },
      { id: 'rep', group: 'presentation', label: UNIT_LABELS.rep, notes: rep, chords: [{ roman: 'V7', beats: barBeats }] },
      { id: 'frag', group: 'continuation', label: UNIT_LABELS.frag, notes: fill([...frag, ...frag2], meter), chords: [{ roman: T, beats: barBeats / 2 }, { roman: key.mode === 'minor' ? 'iv' : 'ii', beats: barBeats / 2 }] },
      { id: 'cad', group: 'continuation', label: UNIT_LABELS.cad, notes: cad, chords: [{ roman: key.mode === 'minor' ? 'ii°' : 'ii', beats: barBeats / 4 }, { roman: 'V', beats: barBeats / 4 }, { roman: T, beats: barBeats / 2 }], cadence: 'PAC' },
    ],
  };
}

/** 扩充（OMT 3.4）：repetition 重复一个单位、stretch 终止乐思拉长一倍、omt 先回避终止再来一次、suffix 终止后补一个后缀 */
export function expandPhrase(phrase, technique) {
  const units = phrase.units.map((u) => ({ ...u, notes: copy(u.notes), chords: u.chords.map((c) => ({ ...c })) }));
  const lastIndex = units.length - 1;
  const last = units[lastIndex];
  const T = phrase.key.mode === 'minor' ? 'i' : 'I';
  if (technique === 'repetition') {
    const k = units.length - 2;
    units.splice(k + 1, 0, { ...units[k], label: UNIT_LABELS.ext, notes: TRANSFORMS.sequence(units[k].notes, phrase.key, -1), chords: units[k].chords.map((c) => ({ ...c })), expanded: 'repetition' });
  } else if (technique === 'stretch') {
    units[lastIndex] = { ...last, label: UNIT_LABELS.ext, notes: TRANSFORMS.augmentation(last.notes), chords: last.chords.map((c) => ({ ...c, beats: c.beats * 2 })), expanded: 'stretch' };
  } else if (technique === 'omt') {
    // 再来一次：第一次 V 之后走到 vi（终止被回避），然后重唱终止乐思
    const evaded = { ...last, label: UNIT_LABELS.evaded, notes: last.notes.map((n, i, arr) => (i === arr.length - 1 && !n.rest ? { ...n, midi: fromStep(stepOf(n.midi, phrase.key).step - 2, 0, phrase.key) } : { ...n })), chords: last.chords.map((c) => ({ ...c, roman: c.roman === T ? (phrase.key.mode === 'minor' ? '♭VI' : 'vi') : c.roman })), cadence: 'evaded', expanded: 'omt' };
    units.splice(lastIndex, 0, evaded);
  } else if (technique === 'suffix') {
    const tonic = [...last.notes].reverse().find((n) => !n.rest);
    const bar = phrase.meter;
    units.push({ id: 'suffix', group: 'suffix', label: UNIT_LABELS.suffix, notes: [{ midi: fromStep(stepOf(tonic.midi, phrase.key).step + 2, 0, phrase.key), beats: bar / 4 }, { midi: fromStep(stepOf(tonic.midi, phrase.key).step + 1, 0, phrase.key), beats: bar / 4 }, { midi: tonic.midi, beats: bar / 2 }], chords: [{ roman: 'V7', beats: bar / 2 }, { roman: T, beats: bar / 2 }], expanded: 'suffix' });
  }
  return { ...phrase, units, expandedBy: technique };
}
export const phraseBars = (phrase) => phrase.units.reduce((s, u) => s + totalBeats(u.notes), 0) / phrase.meter;

/** 播放事件（给 compositionAudio）：旋律 + 低音 + 和弦（和弦用简单的根音位置配置） */
export function phraseEvents(phrase, { harmony = true, units = null, realizeRoman } = {}) {
  const events = [];
  let beat = 0;
  (units || phrase.units).forEach((u, index) => {
    let t = beat;
    u.notes.forEach((n) => { if (!n.rest) events.push({ beat: t, midi: n.midi, duration: n.beats * 0.95, velocity: 0.9, bar: index }); t += n.beats; });
    if (harmony && realizeRoman) {
      let c = beat;
      u.chords.forEach((ch) => {
        const pcs = realizeRoman(ch.roman, phrase.key);
        if (pcs) {
          events.push({ beat: c, midi: 36 + mod(pcs[0] - 0), duration: ch.beats * 0.95, velocity: 0.55, bar: index });
          pcs.slice(0, 4).forEach((pc, k) => { if (k) events.push({ beat: c, midi: 48 + mod(pc) + (mod(pc) < 5 ? 12 : 0), duration: ch.beats * 0.95, velocity: 0.35, bar: index }); });
        }
        c += ch.beats;
      });
    }
    beat += totalBeats(u.notes);
  });
  return { events, duration: beat };
}

/** 动机的音程轮廓（用来说明变化保持了什么）：相邻两音的音阶步数差 */
export function contour(notes, key) {
  const pitched = notes.filter((n) => !n.rest);
  return pitched.slice(1).map((n, i) => stepOf(n.midi, key).step - stepOf(pitched[i].midi, key).step);
}

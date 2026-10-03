// 套路和弦进行速查：记号解析、和弦生成、三和弦 / 七和弦版本、变形操作、声部配置、琶音与检索（纯逻辑，可在 Node 里测试）
// 约定与依据：
//   罗马数字区分大小写（大写大三、小写小三、° 减、ø7 半减七、°7 减七、(maj7) 小大七）：ref:omt2e-roman-numerals ref:omt2e-sevenths
//   小调条目一律按"平行大调参照"写变音记号（C 小调的 Cm Ab Bb 写成 i ♭VI ♭VII），与 OMT 流行音乐章节的写法一致：ref:omt-pb-modal-schemas
//   转位用 /3 /5 /7 表示低音是和弦的三音 / 五音 / 七音，不用数字低音记号，避免和流行和弦符号里的 6（加六度）混淆：ref:omt2e-figured-bass ref:wiki-sixth-chord
//   七和弦版：音阶内按 Imaj7 ii7 iii7 IVmaj7 V7 vi7 viiø7；副属用属七；借用和弦按同主音小调里的性质：ref:omt2e-sevenths ref:omt2e-tonicization ref:omt2e-mixture
//   布鲁斯 I7 IV7 V7（全部是属七）：ref:omt-pb-blues
//   三全音替代、副属替代、调式混合替代：ref:omt-pb-substitutions；后门进行 iv7–♭VII7–I：ref:wiki-backdoor
//   插入 ii–V：ref:omt2e-iivi；减七和弦可以把任意一个音当根音重新拼写，解决到四个不同的目标：ref:omt2e-dim7-reinterpret
//   平滑配置沿用 accompaniment_voicing.js（与曲式、布鲁斯模块相同），严格古典沿用 classical_voicing.js：ref:omt2e-jazz-voicings ref:sposobin
//   同一旋律音在不同和弦里的角色、半音 / 小九度摩擦：ref:wiki-harmonization
//   旋律兼容：和弦音 / 延伸音（9 11 13，变化延伸音写在属七上）/ 与和弦音成小二度、需要解决的和弦外音：ref:omt2e-chord-symbols ref:omt2e-embellishing
import { accompanimentVoicing } from './accompaniment_voicing.js';
import { solveVoicings } from './classical_voicing.js';

export const MAJOR = [0, 2, 4, 5, 7, 9, 11];
const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const NATURAL = [0, 2, 4, 5, 7, 9, 11];
const mod = (n, m = 12) => ((n % m) + m) % m;
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

/** 和弦性质：音程（半音）、字母步数（按三度叠置拼写）、和弦符号后缀、罗马数字写法 */
export const QUALITIES = {
  maj: { iv: [0, 4, 7], st: [0, 2, 4], sym: '', up: true, mark: '', ext: '', triad: 'maj' },
  min: { iv: [0, 3, 7], st: [0, 2, 4], sym: 'm', up: false, mark: '', ext: '', triad: 'min' },
  dim: { iv: [0, 3, 6], st: [0, 2, 4], sym: 'dim', up: false, mark: '°', ext: '', triad: 'dim' },
  aug: { iv: [0, 4, 8], st: [0, 2, 4], sym: 'aug', up: true, mark: '+', ext: '', triad: 'aug' },
  maj7: { iv: [0, 4, 7, 11], st: [0, 2, 4, 6], sym: 'maj7', up: true, mark: '', ext: 'maj7', triad: 'maj', seventh: true },
  dom7: { iv: [0, 4, 7, 10], st: [0, 2, 4, 6], sym: '7', up: true, mark: '', ext: '7', triad: 'maj', seventh: true },
  min7: { iv: [0, 3, 7, 10], st: [0, 2, 4, 6], sym: 'm7', up: false, mark: '', ext: '7', triad: 'min', seventh: true },
  mM7: { iv: [0, 3, 7, 11], st: [0, 2, 4, 6], sym: 'm(maj7)', up: false, mark: '', ext: '(maj7)', triad: 'min', seventh: true },
  hdim7: { iv: [0, 3, 6, 10], st: [0, 2, 4, 6], sym: 'm7b5', up: false, mark: 'ø', ext: '7', triad: 'dim', seventh: true },
  dim7: { iv: [0, 3, 6, 9], st: [0, 2, 4, 6], sym: 'dim7', up: false, mark: '°', ext: '7', triad: 'dim', seventh: true },
  maj6: { iv: [0, 4, 7, 9], st: [0, 2, 4, 5], sym: '6', up: true, mark: '', ext: '(add6)', triad: 'maj', color: true },
  min6: { iv: [0, 3, 7, 9], st: [0, 2, 4, 5], sym: 'm6', up: false, mark: '', ext: '(add6)', triad: 'min', color: true },
  sus2: { iv: [0, 2, 7], st: [0, 1, 4], sym: 'sus2', up: true, mark: '', ext: 'sus2', triad: 'maj', color: true },
  sus4: { iv: [0, 5, 7], st: [0, 3, 4], sym: 'sus4', up: true, mark: '', ext: 'sus4', triad: 'maj', color: true },
  add9: { iv: [0, 4, 7, 14], st: [0, 2, 4, 8], sym: 'add9', up: true, mark: '', ext: '(add9)', triad: 'maj', color: true },
  madd9: { iv: [0, 3, 7, 14], st: [0, 2, 4, 8], sym: 'm(add9)', up: false, mark: '', ext: '(add9)', triad: 'min', color: true },
  maj9: { iv: [0, 4, 7, 11, 14], st: [0, 2, 4, 6, 8], sym: 'maj9', up: true, mark: '', ext: 'maj9', triad: 'maj', seventh: true, color: true },
  dom9: { iv: [0, 4, 7, 10, 14], st: [0, 2, 4, 6, 8], sym: '9', up: true, mark: '', ext: '9', triad: 'maj', seventh: true, color: true },
  min9: { iv: [0, 3, 7, 10, 14], st: [0, 2, 4, 6, 8], sym: 'm9', up: false, mark: '', ext: '9', triad: 'min', seventh: true, color: true },
  min11: { iv: [0, 3, 7, 10, 14, 17], st: [0, 2, 4, 6, 8, 10], sym: 'm11', up: false, mark: '', ext: '11', triad: 'min', seventh: true, color: true },
  dom13: { iv: [0, 4, 7, 10, 14, 21], st: [0, 2, 4, 6, 8, 12], sym: '13', up: true, mark: '', ext: '13', triad: 'maj', seventh: true, color: true },
  dom7b9: { iv: [0, 4, 7, 10, 13], st: [0, 2, 4, 6, 8], sym: '7(b9)', up: true, mark: '', ext: '7(♭9)', triad: 'maj', seventh: true, color: true },
};
const MEMBER_NAMES = ['1', '3', '5', '7', '9', '11', '13'];

// ---------------- 拼写 ----------------
const ACC = { '-2': 'bb', '-1': 'b', 0: '', 1: '#', 2: 'x' };
export function spell(letter, pc) {
  const alter = mod(pc - NATURAL[mod(letter, 7)] + 6) - 6;
  return `${LETTERS[mod(letter, 7)]}${ACC[alter] ?? (alter > 0 ? '#'.repeat(alter) : 'b'.repeat(-alter))}`;
}
const pretty = (name) => name.replace(/bb$/, '𝄫').replace(/(?<=[A-G])b/g, '♭').replace(/#/g, '♯').replace(/(?<=[A-G])x/, '𝄪');

/** 调：主音字母 + 音级。大调与小调条目分别用常见的拼法 */
export const KEYS = {
  major: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'],
  minor: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'],
};
export function parseKey(name) {
  const m = /^([A-G])([#b]?)$/.exec(String(name).trim());
  if (!m) return null;
  const letter = LETTERS.indexOf(m[1]);
  return { name: m[0], letter, pc: mod(NATURAL[letter] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0)) };
}

// ---------------- 罗马数字 ----------------
const NUMERALS = ['VII', 'VI', 'V', 'IV', 'III', 'II', 'I'];
const ROMAN_RE = /^([b#♭♯]?)(VII|VI|V|IV|III|II|I|vii|vi|v|iv|iii|ii|i)(°|ø|\+)?(maj9|maj7|\(maj7\)|7\(♭9\)|7\(b9\)|7|9|11|13|\(add6\)|\(add9\)|sus2|sus4)?(?:\/([357]))?$/;

/** 'IV' 'iv(maj7)' '♭VII7' 'viiø7' '♯v°7' 'V/3' → { degree, alter, quality, bass } */
export function parseRoman(token) {
  const m = ROMAN_RE.exec(String(token).trim());
  if (!m) return null;
  const [, acc, numeral, mark = '', ext = '', bass] = m;
  const upper = numeral === numeral.toUpperCase();
  const degree = ROMAN.indexOf(numeral.toUpperCase()) + 1;
  const alter = /[b♭]/.test(acc) ? -1 : /[#♯]/.test(acc) ? 1 : 0;
  let quality = null;
  if (mark === 'ø') quality = ext === '7' ? 'hdim7' : null;
  else if (mark === '°') quality = ext === '7' ? 'dim7' : !ext ? 'dim' : null;
  else if (mark === '+') quality = !ext ? 'aug' : null;
  else if (upper) quality = { '': 'maj', 7: 'dom7', maj7: 'maj7', '(add6)': 'maj6', '(add9)': 'add9', sus2: 'sus2', sus4: 'sus4', 9: 'dom9', maj9: 'maj9', 13: 'dom13', '7(♭9)': 'dom7b9', '7(b9)': 'dom7b9' }[ext] ?? null;
  else quality = { '': 'min', 7: 'min7', '(maj7)': 'mM7', '(add6)': 'min6', '(add9)': 'madd9', 9: 'min9', 11: 'min11' }[ext] ?? null;
  if (!quality) return null;
  return { degree, alter, quality, bass: bass ? { 3: 1, 5: 2, 7: 3 }[bass] : 0 };
}

/** 和弦 → 罗马数字（平行大调参照） */
export function romanOf(chord, { minorInternal = false } = {}) {
  const q = QUALITIES[chord.quality];
  // 小调内部级数（可选显示）：以自然小调为参照，3 6 7 级本来就是降的
  const alter = minorInternal ? chord.alter - ([3, 6, 7].includes(chord.degree) ? -1 : 0) : chord.alter;
  const acc = alter < 0 ? '♭'.repeat(-alter) : '♯'.repeat(alter);
  const numeral = q.up ? ROMAN[chord.degree - 1] : ROMAN[chord.degree - 1].toLowerCase();
  const bass = chord.bass ? `/${MEMBER_NAMES[chord.bass]}` : '';
  return `${acc}${numeral}${q.mark}${q.ext}${bass}`;
}

// ---------------- 数字记法 ----------------
const DIGIT_QUALITY = { 1: 'maj', 2: 'min', 3: 'min', 4: 'maj', 5: 'maj', 6: 'min', 7: 'dim' };
const DIGIT_MARK = { m: 'min', 大: 'maj', M: 'maj', dim: 'dim', dim7: 'dim7', ø: 'hdim7', ø7: 'hdim7', maj7: 'maj7', aug: 'aug', '+': 'aug' };
/**
 * 纯数字默认按大调音阶内三和弦：1=I 2=ii 3=iii 4=IV 5=V 6=vi 7=vii°
 * 改变性质要明确标记：3m（= iii）、3大（= III）、4m（= iv）、b7（= ♭VII）、#5dim7（= ♯v°7）
 * 带 b 的级数默认大三和弦（♭III ♭VI ♭VII 等借用和弦），带 # 的默认减三和弦（经过减和弦），需要别的性质请写出来
 */
export function parseDigits(text) {
  const source = String(text).trim();
  if (!/^[\s\-,，|·b#♭♯1-7m大Mdimø7aug+]+$/.test(source) || !/[1-7]/.test(source)) return null;
  const compact = source.replace(/[\s\-,，|·]+/g, ' ');
  const re = /([b#♭♯]?)([1-7])(dim7|dim|ø7|ø|maj7|aug|m|大|M|\+)?/g;
  const chords = [];
  let m;
  let consumed = '';
  while ((m = re.exec(compact))) {
    const [, acc, d, mark] = m;
    const degree = Number(d);
    const alter = /[b♭]/.test(acc) ? -1 : /[#♯]/.test(acc) ? 1 : 0;
    const quality = mark ? DIGIT_MARK[mark] : alter < 0 ? 'maj' : alter > 0 ? 'dim' : DIGIT_QUALITY[degree];
    chords.push({ degree, alter, quality, bass: 0 });
    consumed += m[0];
  }
  if (consumed.replace(/\s/g, '') !== compact.replace(/\s/g, '')) return null;
  return chords.length ? chords : null;
}
export const digitsOf = (chords) => chords.map((c) => `${c.alter < 0 ? 'b' : c.alter > 0 ? '#' : ''}${c.degree}`).join(chords.some((c) => c.alter) ? ' ' : '');

// ---------------- 和弦符号（反查用） ----------------
const SUFFIX = Object.fromEntries(Object.entries(QUALITIES).map(([id, q]) => [q.sym, id]));
Object.assign(SUFFIX, { M: 'maj', min: 'min', '-': 'min', M7: 'maj7', Δ7: 'maj7', Δ: 'maj7', ma7: 'maj7', mi7: 'min7', '-7': 'min7', 'mM7': 'mM7', 'mmaj7': 'mM7', 'mΔ7': 'mM7', 'ø': 'hdim7', 'ø7': 'hdim7', 'm7(b5)': 'hdim7', '°': 'dim', '°7': 'dim7', o: 'dim', o7: 'dim7', '+': 'aug', dom7: 'dom7' });
export function parseSymbol(text) {
  const m = /^([A-G])([#b♯♭]?)(.*?)(?:\/([A-G])([#b♯♭]?))?$/.exec(String(text).trim());
  if (!m) return null;
  const quality = SUFFIX[m[3].replace(/♭/g, 'b').replace(/♯/g, '#')];
  if (!quality) return null;
  const acc = (s) => (/[#♯]/.test(s) ? 1 : /[b♭]/.test(s) ? -1 : 0);
  const letter = LETTERS.indexOf(m[1]);
  const rootPc = mod(NATURAL[letter] + acc(m[2]));
  const bassPc = m[4] ? mod(NATURAL[LETTERS.indexOf(m[4])] + acc(m[5])) : null;
  return { letter, rootPc, quality, bassPc, bassLetter: m[4] ? LETTERS.indexOf(m[4]) : null };
}

// ---------------- 在调里生成具体和弦 ----------------
/** chord（级数）+ key → 具体和弦：根音、各和弦音（拼写）、低音、转位、和弦符号 */
export function realize(chord, keyName = 'C') {
  const key = parseKey(keyName) || parseKey('C');
  const q = QUALITIES[chord.quality];
  const rootLetter = key.letter + chord.degree - 1;
  const rootPc = mod(key.pc + MAJOR[chord.degree - 1] + chord.alter);
  const tones = q.iv.map((iv, i) => ({ pc: mod(rootPc + iv), name: spell(rootLetter + q.st[i], rootPc + iv), member: MEMBER_NAMES[[0, 2, 4, 6, 8, 10, 12].indexOf(q.st[i] % 14)] ?? String(q.st[i] + 1), interval: iv }));
  // 六和弦与 sus 和弦的成员名
  if (chord.quality === 'maj6' || chord.quality === 'min6') tones[3].member = '6';
  if (chord.quality === 'sus2') tones[1].member = '2';
  if (chord.quality === 'sus4') tones[1].member = '4';
  if (chord.quality === 'add9' || chord.quality === 'madd9') tones[3].member = '9';
  const bassIndex = Math.min(chord.bass || 0, tones.length - 1);
  const root = tones[0].name;
  const bass = tones[bassIndex];
  const symbol = `${root}${q.sym}${bassIndex ? `/${bass.name}` : ''}`;
  return { ...chord, roman: romanOf(chord), rootPc, root, tones, bassPc: bass.pc, bassName: bass.name, inversion: bassIndex, symbol, pretty: pretty(root) + q.sym.replace(/b5/, '♭5').replace(/\(b9\)/, '(♭9)') + (bassIndex ? `/${pretty(bass.name)}` : '') };
}
export const realizeAll = (chords, key) => chords.map((c) => realize(c, key));

// ---------------- 版本：三和弦 / 七和弦 ----------------
const NOTE = (zh, en, ja = en) => ({ zh, ja, en });
/** 去掉七音和色彩音，返回三和弦与说明 */
export function simplify(chord) {
  const triad = QUALITIES[chord.quality].triad;
  let note = null;
  if (chord.quality === 'hdim7') note = NOTE('半减七和弦去掉七音后成为减三和弦', 'a half-diminished seventh without its seventh becomes a diminished triad', 'ハーフ・ディミニッシュから第 7 音を除くと減三和音になる');
  else if (chord.quality === 'mM7') note = NOTE('小大七和弦去掉七音后成为小三和弦', 'a minor-major seventh without its seventh becomes a minor triad', 'マイナー・メジャー・セブンスから第 7 音を除くと短三和音になる');
  else if (chord.quality === 'dim7') note = NOTE('减七和弦去掉七音后成为减三和弦', 'a diminished seventh without its seventh becomes a diminished triad', '減七から第 7 音を除くと減三和音になる');
  else if (chord.quality !== triad) note = NOTE('去掉七音或色彩音', 'seventh or colour tone removed', '第 7 音や色彩音を除いた');
  return { chord: { ...chord, quality: triad, bass: chord.bass > 2 ? 0 : chord.bass }, note };
}

/** 一个三和弦在上下文里加七音：返回首选性质、理由与其他可选色彩 */
export function seventhFor(chords, i, { style = 'pop', mode = 'major', loop = false } = {}) {
  const c = chords[i];
  const q = QUALITIES[c.quality];
  if (q.seventh || q.color) return { quality: c.quality, reason: NOTE('原版已经带七音或色彩音 保留', 'already has a seventh or colour tone — kept', '元の版にすでに第 7 音や色彩音があるのでそのまま') };
  const next = chords[i + 1] ?? (loop ? chords[0] : null);
  const rootRel = mod(MAJOR[c.degree - 1] + c.alter);
  const nextRel = next ? mod(MAJOR[next.degree - 1] + next.alter) : null;
  const fifthDown = next && mod(rootRel - nextRel) === 7;
  const diatonic = c.alter === 0;
  if (c.quality === 'aug') return { quality: 'aug', reason: NOTE('增三和弦保持三和弦 色彩来自半音移动的五音', 'the augmented triad stays a triad — its colour is the moving fifth', '増三和音は三和音のまま。色は半音で動く第 5 音から') };
  if (c.quality === 'dim') {
    if (diatonic && c.degree === 7 && mode === 'major') return { quality: 'hdim7', reason: NOTE('大调音阶内的 vii° 加七音是半减七 viiø7', 'in major the diatonic vii° becomes half-diminished viiø7', '長調の音階内の vii° に 7 を加えるとハーフ・ディミニッシュ viiø7') };
    if (diatonic && c.degree === 2 && mode === 'minor') return { quality: 'hdim7', reason: NOTE('小调的 ii° 加七音是半减七 iiø7', 'in minor ii° becomes half-diminished iiø7', '短調の ii° に 7 を加えるとハーフ・ディミニッシュ iiø7') };
    if (diatonic && c.degree === 7 && mode === 'minor') return { quality: 'dim7', reason: NOTE('小调用升高的导音 vii° 加七音是减七 vii°7', 'with the raised leading tone in minor vii° becomes fully diminished vii°7', '短調では上がった導音を使い、vii° に 7 を加えると減七 vii°7') };
    return { quality: 'dim7', reason: NOTE('半音经过或副导的减和弦 常用减七', 'a chromatic passing or applied diminished chord usually takes a diminished seventh', '半音の経過や副導の減和音はふつう減七') };
  }
  if (style === 'blues' && c.quality === 'maj') return { quality: 'dom7', reason: NOTE('布鲁斯里大三和弦都用属七 I7 IV7 V7 不用 maj7', 'in the blues every major chord is a dominant seventh: I7 IV7 V7, not maj7', 'ブルースでは長三和音はすべて属七 I7 IV7 V7、maj7 にはしない') };
  if (c.quality === 'maj') {
    if (diatonic && c.degree === 5) return { quality: 'dom7', reason: mode === 'minor' ? NOTE('V 加七音是属七 小调里保留升高的导音', 'V takes a dominant seventh — in minor it keeps the raised leading tone', 'V に 7 を加えると属七。短調では上がった導音を保つ') : NOTE('音阶内 V 加七音是属七', 'diatonic V takes a dominant seventh', '音階内の V に 7 を加えると属七') };
    if (diatonic && (c.degree === 1 || c.degree === 4)) return { quality: 'maj7', reason: NOTE('音阶内 I 与 IV 加七音是大七', 'diatonic I and IV take major sevenths', '音階内の I と IV に 7 を加えるとメジャー・セブンス'), alts: fifthDown && c.degree === 1 ? [{ quality: 'dom7', reason: NOTE('若要把 I 当作 V/IV 可用属七', 'as V/IV it could take a dominant seventh', 'I を V/IV として扱うなら属七にできる') }] : [] };
    if (c.alter === -1 && c.degree === 7) return { quality: 'dom7', reason: NOTE('♭VII 来自同主音小调 在那里本来就是属七 后门进行就用 ♭VII7', '♭VII comes from the parallel minor where it is a dominant seventh — the backdoor uses ♭VII7', '♭VII は同主短調から来て、そこではもともと属七。裏口進行は ♭VII7 を使う') };
    if (c.alter === -1 && (c.degree === 3 || c.degree === 6)) return { quality: 'maj7', reason: NOTE('♭III ♭VI 在同主音小调里是大七和弦', '♭III and ♭VI are major sevenths in the parallel minor', '♭III と ♭VI は同主短調ではメジャー・セブンス') };
    if (c.alter === -1 && c.degree === 2) return nextRel === 0 ? { quality: 'dom7', reason: NOTE('♭II 半音下行到 I 是三全音替代 用属七', '♭II falling a semitone to I is a tritone substitute — dominant seventh', '♭II が半音下の I へ進むのはトライトーン代理なので属七') } : { quality: 'maj7', reason: NOTE('♭II 不作三全音替代时用大七', 'when ♭II is not a tritone substitute it takes a major seventh', '♭II がトライトーン代理でない時はメジャー・セブンス') };
    if (fifthDown) return { quality: 'dom7', reason: NOTE('根音下行五度进入下一个和弦 作副属 V/x 用属七', 'its root falls a fifth to the next chord — an applied V/x takes a dominant seventh', '根音が 5 度下の次の和音へ進むので副属 V/x として属七') };
    return { quality: 'dom7', reason: NOTE('调外大三和弦加七音时 通常保留调内音作七音（如 C 调 D 大三加 C 成 D7） 功能要看后面接什么', 'a chromatic major triad usually keeps the diatonic note as its seventh (D + C = D7 in C) — its function depends on what follows', '調外の長三和音に 7 を加える時は、ふつう調内の音を第 7 音にする（ハ調で D の長三に C で D7）。働きは次に何が来るか次第'), alts: [{ quality: 'maj7', reason: NOTE('大七色彩 会引入调外音', 'major-seventh colour, adds a chromatic note', 'メジャー・セブンスの色、調外の音が入る') }] };
  }
  if (c.quality === 'min') {
    if (c.degree === 1 && mode !== 'major') return { quality: 'min7', reason: NOTE('小调主和弦可加 ♭7 成 m7', 'a minor tonic can add ♭7 for m7', '短調の主和音に ♭7 を加えて m7 にできる'), alts: [{ quality: 'mM7', reason: NOTE('或加导音成 m(maj7) 色彩更紧张 两者不等价', 'or the leading tone for m(maj7), a more tense colour — not equivalent', 'または導音を加えて m(maj7)。より緊張した色で、2 つは同じではない') }] };
    if (diatonic && c.degree === 4) return { quality: 'min7', reason: NOTE('借用的 iv 常用 m7', 'borrowed iv usually takes m7', '借用した iv はふつう m7'), alts: [{ quality: 'mM7', reason: NOTE('也可用 m(maj7) 保留大调的 mi 色彩不同', 'or m(maj7), which keeps mi — a different colour', 'm(maj7) にもできる。長調の mi を保ち、色が違う') }] };
    return { quality: 'min7', reason: diatonic && [2, 3, 6].includes(c.degree) ? NOTE('音阶内 ii iii vi 加七音是小七', 'diatonic ii iii vi take minor sevenths', '音階内の ii iii vi に 7 を加えるとマイナー・セブンス') : NOTE('小三和弦加七音一般用小七', 'a minor triad normally takes a minor seventh', '短三和音に 7 を加える時はふつうマイナー・セブンス') };
  }
  return { quality: c.quality, reason: NOTE('保持', 'kept', 'そのまま') };
}

/** 版本：original 原版；triad 去七音；seventh 按上下文加七音（原版已有的七音保留） */
export function versionOf(chords, version, ctx = {}) {
  if (version === 'triad') {
    const notes = [];
    const out = chords.map((c, i) => { const s = simplify(c); if (s.note) notes.push({ at: i, note: s.note }); return s.chord; });
    return { chords: out, notes };
  }
  if (version === 'seventh') {
    const notes = [];
    const out = chords.map((c, i) => {
      const s = seventhFor(chords, i, ctx);
      notes.push({ at: i, note: s.reason, alts: s.alts || [] });
      return { ...c, quality: s.quality };
    });
    return { chords: out, notes };
  }
  return { chords: chords.map((c) => ({ ...c })), notes: [] };
}
export const hasSeventh = (chords) => chords.some((c) => QUALITIES[c.quality].seventh || QUALITIES[c.quality].color);

// ---------------- 功能 ----------------
/** 每个和弦的功能标记（T / PD / D、V/x、vii°/x、subV）与可能的其他解释；不凭单个和弦宣布转调 */
export function functionsOf(chords, { loop = false } = {}) {
  const r = (c) => mod(MAJOR[c.degree - 1] + c.alter);
  const diatonicRoman = (degree) => romanOf({ degree, alter: 0, quality: DIGIT_QUALITY[degree], bass: 0 });
  return chords.map((c, i) => {
    const next = chords[i + 1] ?? (loop ? chords[0] : null);
    const tri = QUALITIES[c.quality].triad;
    const target = next ? romanOf({ ...next, quality: QUALITIES[next.quality].triad, bass: 0 }) : null;
    const out = { label: '', alts: [] };
    const fifthDown = next && mod(r(c) - r(next)) === 7;
    const diatonic = c.alter === 0;
    if (tri === 'maj' && diatonic && c.degree === 5) out.label = 'D';
    else if (tri === 'maj' && fifthDown && !(diatonic && (c.degree === 1 || c.degree === 4))) out.label = `V/${target}`;
    else if (tri === 'dim' && next && mod(r(next) - r(c)) === 1) out.label = diatonic && c.degree === 7 ? 'D' : `vii°/${target}`;
    else if (diatonic && tri === DIGIT_QUALITY[c.degree]) {
      out.label = { 1: 'T', 2: 'PD', 3: 'T', 4: 'PD', 5: 'D', 6: 'T', 7: 'D' }[c.degree];
      if (c.degree === 3) out.alts.push(NOTE('iii 多作主功能的延长 有时代替 V', 'iii usually prolongs tonic, sometimes stands in for V', 'iii は主の働きの延長が多く、V の代わりになることもある'));
      if (c.degree === 6) out.alts.push(NOTE('vi 也常作通向下属的连接', 'vi also often leads into the predominant', 'vi は下属へのつなぎにもなる'));
    } else if (diatonic && c.degree === 1) out.label = 'T';
    else if (diatonic && c.degree === 4 && tri === 'min') { out.label = 'PD'; out.alts.push(NOTE('借用自同主音小调的 iv', 'iv borrowed from the parallel minor', '同主短調から借りた iv')); }
    else if (diatonic && c.degree === 2 && tri === 'dim') out.label = 'PD';
    else if (diatonic && c.degree === 5 && tri === 'min') { out.label = 'D?'; out.alts.push(NOTE('小属 v 没有导音 属的牵引弱', 'minor v has no leading tone — a weak dominant', '短い v には導音がなく、属の引力が弱い')); }
    else if (c.alter === -1 && c.degree === 2) out.label = next && r(next) === 0 ? 'subV' : 'PD';
    else if (c.alter === -1 && c.degree === 6) out.label = 'PD';
    else if (c.alter === -1 && c.degree === 7) { out.label = 'D?'; out.alts.push(NOTE('♭VII 在调式进行里常起属的作用 也可看作 IV 的 IV（双重变格）', '♭VII often acts as a dominant in modal progressions, or as IV of IV (double plagal)', '♭VII は旋法的な進行で属の働きをすることが多い。IV の IV（ダブル・プラガル）とも見られる')); }
    else if (c.alter === -1 && c.degree === 3) { out.label = 'T?'; out.alts.push(NOTE('借用的 ♭III 是色彩和弦 功能要看上下文', 'borrowed ♭III is a colour chord — its function depends on context', '借用した ♭III は色彩の和音で、働きは文脈次第')); }
    else out.label = '?';
    // 调外大三 / 属七但后面没有接到下方五度的目标：只保留可能
    if (tri === 'maj' && diatonic && [2, 3, 6, 7].includes(c.degree) && !fifthDown) {
      out.label = '?';
      out.alts.push(NOTE(`可能是 V/${diatonicRoman(((c.degree + 2) % 7) + 1)} 但后面没有接到目标 只保留这种可能`, `could be V/${diatonicRoman(((c.degree + 2) % 7) + 1)}, but the target does not follow — only a possibility`, `V/${diatonicRoman(((c.degree + 2) % 7) + 1)} の可能性があるが、目標が続かないので可能性にとどめる`));
    }
    return out;
  });
}

// ---------------- 变形操作 A–O ----------------
/** 每次只做一种操作；返回新的和弦列表与变化记录 { at, before, after, why } */
const rel = (c) => mod(MAJOR[c.degree - 1] + c.alter);
const fromRel = (r, quality, preferFlat = true) => {
  for (let d = 0; d < 7; d += 1) if (MAJOR[d] === mod(r)) return { degree: d + 1, alter: 0, quality, bass: 0 };
  for (let d = 0; d < 7; d += 1) if (MAJOR[d] === mod(r + (preferFlat ? 1 : -1))) return { degree: d + 1, alter: preferFlat ? -1 : 1, quality, bass: 0 };
  for (let d = 0; d < 7; d += 1) if (MAJOR[d] === mod(r - (preferFlat ? 1 : -1))) return { degree: d + 1, alter: preferFlat ? 1 : -1, quality, bass: 0 };
  return null;
};
const sameChord = (a, b) => a.degree === b.degree && a.alter === b.alter && a.quality === b.quality && (a.bass || 0) === (b.bass || 0);

export const OPERATIONS = {
  // A 加七音
  sevenths: { label: NOTE('A 加七音', 'A Add sevenths', 'A 七の和音にする'), apply(chords, ctx) {
    const v = versionOf(chords, 'seventh', ctx);
    return { chords: v.chords, changes: v.chords.map((c, i) => (c.quality !== chords[i].quality ? { at: i, why: v.notes[i].note } : null)).filter(Boolean) };
  } },
  // B 色彩：add9 / sus2 / sus4 / 6 / 9 / 11 / 13（只对选中的一个和弦）
  color: { label: NOTE('B 色彩音', 'B Colour tones', 'B 色彩音'), needsTarget: true, options: ['add9', 'sus2', 'sus4', '6', '9', '11', '13'], apply(chords, ctx, { at = 0, option = 'add9' } = {}) {
    const c = chords[at];
    const tri = QUALITIES[c.quality].triad;
    const map = {
      add9: { maj: 'add9', min: 'madd9' }, sus2: { maj: 'sus2', min: 'sus2' }, sus4: { maj: 'sus4', min: 'sus4' }, 6: { maj: 'maj6', min: 'min6' },
      9: { maj: c.quality === 'dom7' ? 'dom9' : 'maj9', min: 'min9' }, 11: { min: 'min11' }, 13: { maj: c.quality === 'dom7' || c.quality === 'dom9' ? 'dom13' : null },
    };
    const quality = map[option]?.[tri];
    if (!quality) return { chords, changes: [], refused: NOTE(option === '11' ? '大三或属和弦上的纯十一度会和三音成小九度 这里只在小和弦上加 11' : option === '13' ? '13 只加在属七上（13 要放在七音之上）' : '这个和弦不适合这种色彩', option === '11' ? 'a natural 11 clashes with the major third — 11 is only added to minor chords here' : option === '13' ? '13 is only added to dominant sevenths (voiced above the seventh)' : 'this colour does not suit the chord', option === '11' ? '長三や属の和音の完全 11 度は 3 音と短 9 度になるので、ここでは短い和音だけに 11 を加える' : option === '13' ? '13 は属七だけに加える（13 は第 7 音より上に置く）' : 'この和音にはこの色は合わない') };
    const out = chords.map((x, i) => (i === at ? { ...x, quality, bass: 0 } : x));
    return { chords: out, changes: [{ at, why: NOTE(`加 ${option}：不改变功能 只改变色彩`, `add ${option}: colour only, same function`, `${option} を加える：働きは同じで色だけ変わる`) }] };
  } },
  // C 转位与斜杠和弦（选中的一个和弦换下一个转位）
  invert: { label: NOTE('C 转位与斜杠和弦', 'C Inversion / slash chord', 'C 転回形とスラッシュ・コード'), needsTarget: true, apply(chords, ctx, { at = 0 } = {}) {
    const c = chords[at];
    const size = QUALITIES[c.quality].iv.length >= 4 && QUALITIES[c.quality].seventh ? 4 : 3;
    const bass = ((c.bass || 0) + 1) % size;
    return { chords: chords.map((x, i) => (i === at ? { ...x, bass } : x)), changes: [{ at, why: NOTE(['回到原位', '第一转位 低音是三音', '第二转位 低音是五音', '第三转位 低音是七音'][bass], ['back to root position', 'first inversion — third in the bass', 'second inversion — fifth in the bass', 'third inversion — seventh in the bass'][bass], ['基本形に戻す', '第 1 転回形：バスが 3 音', '第 2 転回形：バスが 5 音', '第 3 転回形：バスが 7 音'][bass]) }] };
  } },
  // D 同功能代理：ii↔IV、I↔vi、V↔vii°；小调里 V 可代替 ♭VII
  substitute: { label: NOTE('D 同功能代理', 'D Same-function substitute', 'D 同じ働きの代理'), apply(chords) {
    const changes = [];
    const out = chords.map((c, i) => {
      const r = rel(c); const tri = QUALITIES[c.quality].triad;
      let to = null; let why = null;
      if (r === 5 && tri === 'maj' && c.alter === 0) { to = { degree: 2, alter: 0, quality: 'min', bass: 0 }; why = NOTE('IV → ii：两者同属下属功能（doo-wop 型常见的替换）', 'IV → ii: both predominant (a common doo-wop substitution)', 'IV → ii：どちらも下属の働き（doo-wop 型によくある代理）'); }
      else if (r === 2 && tri === 'min') { to = { degree: 4, alter: 0, quality: 'maj', bass: 0 }; why = NOTE('ii → IV：同属下属功能', 'ii → IV: both predominant', 'ii → IV：どちらも下属の働き'); }
      else if (r === 10 && c.alter === -1 && tri === 'maj') { to = { degree: 5, alter: 0, quality: 'maj', bass: 0 }; why = NOTE('♭VII → V：同为属方向 V 带导音 ti ♭VII 用 te 色彩差别明显', '♭VII → V: same dominant side — V uses ti, ♭VII uses te, a clear colour change', '♭VII → V：どちらも属の側。V は導音 ti、♭VII は te で色がはっきり違う'); }
      if (to && i > 0 && i < chords.length && !changes.length) { changes.push({ at: i, why }); return to; }
      return c;
    });
    return { chords: out, changes };
  } },
  // E 副属和弦：选中的和弦如果根音下行五度进入下一个和弦，同根音改成属七（V7/x）
  applied: { label: NOTE('E 副属和弦', 'E Applied dominant', 'E 副属和音'), needsTarget: true, apply(chords, ctx, { at = 0 } = {}) {
    const c = chords[at];
    const next = chords[at + 1] ?? (ctx.loop ? chords[0] : null);
    if (!next || mod(rel(c) - rel(next)) !== 7 || QUALITIES[next.quality].triad === 'dim') return { chords, changes: [], refused: NOTE('这个和弦的根音没有下行五度进入下一个和弦 不能同根音改成副属', 'its root does not fall a fifth to the next chord — no same-root applied dominant', 'この和音の根音は 5 度下の次の和音へ進まないので、同じ根音の副属にはできない') };
    if (c.quality === 'dom7') return { chords, changes: [], refused: NOTE('已经是属七', 'already a dominant seventh', 'すでに属七') };
    const quality = QUALITIES[c.quality].seventh || QUALITIES[c.quality].triad !== 'maj' || hasSeventh(chords) ? 'dom7' : 'maj';
    const after = { ...c, quality, bass: c.bass > 2 ? 0 : c.bass };
    return { chords: chords.map((x, i) => (i === at ? after : x)), changes: [{ at, why: NOTE(`同根音改成${quality === 'dom7' ? '属七' : '大三'} 变成下一个和弦的副属（${romanOf(after)} = V/${romanOf({ ...next, quality: QUALITIES[next.quality].triad, bass: 0 })}） 三音升高 制造指向下一个和弦的导音`, `same root, now ${quality === 'dom7' ? 'a dominant seventh' : 'major'}: the applied V of the next chord — its raised third is a leading tone to the next root`, `同じ根音で${quality === 'dom7' ? '属七' : '長三'}に。次の和音の副属（${romanOf(after)} = V/${romanOf({ ...next, quality: QUALITIES[next.quality].triad, bass: 0 })}）。上がった 3 音が次の根音への導音になる`) }] };
  } },
  // E′ 副导和弦：在目标和弦前插入它下方半音的减七
  leading: { label: NOTE('E′ 副导和弦', 'E′ Applied leading-tone chord', 'E′ 副導和音'), needsTarget: true, apply(chords, ctx, { at = 1 } = {}) {
    if (at <= 0) return { chords, changes: [], refused: NOTE('选第二个以后的和弦作目标', 'pick a later chord as the target', '2 つ目以降の和音を目標に選ぶ') };
    const target = chords[at];
    const dim = fromRel(rel(target) - 1, 'dim7', false);
    const out = [...chords.slice(0, at), { ...dim, half: true }, ...chords.slice(at)];
    out[at - 1] = { ...out[at - 1], half: true };
    return { chords: out, changes: [{ at, why: NOTE('在目标前插入它下方半音的减七（vii°7/x） 前一个和弦让出一半时值', 'a diminished seventh a semitone below the target (vii°7/x) — the previous chord gives up half its length', '目標の前に半音下の減七（vii°7/x）を挿入、前の和音が半分の長さを譲る') }] };
  } },
  // F 三全音替代：属七 → 三全音外的属七（最适合正在解决到下方五度的 V7）
  tritone: { label: NOTE('F 三全音替代', 'F Tritone substitution', 'F トライトーン代理'), apply(chords, ctx) {
    const changes = [];
    const out = chords.map((c, i) => {
      const next = chords[i + 1] ?? (ctx.loop ? chords[0] : null);
      if (c.quality !== 'dom7' || !next || mod(rel(c) - rel(next)) !== 7) return c;
      const sub = fromRel(rel(c) + 6, 'dom7', true);
      changes.push({ at: i, why: NOTE('换成三全音外的属七：两个和弦共享同一个三全音（三音与七音互换） 根音改成半音下行进入下一个和弦', 'swap for the dominant a tritone away: both share the same tritone (third and seventh trade places) and the root now falls by semitone', '3 全音離れた属七に代える：2 つの和音は同じ 3 全音を共有（3 音と第 7 音が入れ替わる）。根音は半音下行で次の和音へ') });
      return { ...sub, bass: 0 };
    });
    return { chords: out, changes };
  } },
  // G 插入 ii–V：在目标和弦前插入它的 ii7–V7（目标是小和弦时用 iiø7–V7）
  iiV: { label: NOTE('G 插入 ii–V', 'G Insert ii–V', 'G ii–V を挿入'), needsTarget: true, apply(chords, ctx, { at = 0 } = {}) {
    const target = chords[at];
    const minorTarget = QUALITIES[target.quality].triad === 'min';
    const two = fromRel(rel(target) + 2, minorTarget ? 'hdim7' : 'min7', true);
    const five = fromRel(rel(target) + 7, 'dom7', true);
    const before = at > 0 ? at - 1 : chords.length - 1;
    const out = [...chords];
    const ins = [{ ...two, half: true }, { ...five, half: true }];
    if (at > 0) { out[before] = { ...out[before], half: true }; out.splice(at, 0, ...ins); } else out.push(...ins);
    return { chords: out, changes: [{ at: at > 0 ? at : chords.length, why: NOTE(`在 ${romanOf({ ...target, bass: 0 })} 前插入它的 ${minorTarget ? 'iiø7–V7' : 'ii7–V7'} 前一个和弦让出时值`, `insert its ${minorTarget ? 'iiø7–V7' : 'ii7–V7'} before the target; the previous chord gives up time`, `${romanOf({ ...target, bass: 0 })} の前にその ${minorTarget ? 'iiø7–V7' : 'ii7–V7'} を挿入、前の和音が長さを譲る`) }] };
  } },
  // H 后门进行：iv 之后、I 之前插入 ♭VII7；或把 V7–I 的 V7 换成 iv7–♭VII7
  backdoor: { label: NOTE('H 后门进行', 'H Backdoor', 'H 裏口進行'), apply(chords, ctx) {
    for (let i = 0; i < chords.length; i += 1) {
      const c = chords[i]; const next = chords[i + 1];
      if (!next || !(next.degree === 1 && next.alter === 0)) continue;
      if (c.degree === 4 && c.alter === 0 && QUALITIES[c.quality].triad === 'min') {
        const out = [...chords.slice(0, i), { ...c, quality: 'min7', half: true }, { degree: 7, alter: -1, quality: 'dom7', bass: 0, half: true }, ...chords.slice(i + 1)];
        return { chords: out, changes: [{ at: i + 1, why: NOTE('在 iv 与 I 之间插入 ♭VII7 形成 iv7–♭VII7–I（后门进行） 不只是给原和弦加七音', 'insert ♭VII7 between iv and I: iv7–♭VII7–I, the backdoor — more than adding sevenths', 'iv と I の間に ♭VII7 を挿入して iv7–♭VII7–I（裏口進行）。元の和音に 7 を加えるだけではない') }] };
      }
      if (c.degree === 5 && c.alter === 0) {
        const out = [...chords.slice(0, i), { degree: 4, alter: 0, quality: 'min7', bass: 0, half: true }, { degree: 7, alter: -1, quality: 'dom7', bass: 0, half: true }, ...chords.slice(i + 1)];
        return { chords: out, changes: [{ at: i, why: NOTE('把 V–I 换成 iv7–♭VII7–I（从后门回到主和弦） ♭VII7 与 G7 有两个共同音', 'replace V–I with iv7–♭VII7–I; ♭VII7 shares two notes with G7', 'V–I を iv7–♭VII7–I に（裏口から主和音へ）。♭VII7 と G7 は共通音が 2 つ') }] };
      }
    }
    return { chords, changes: [], refused: NOTE('需要一个 iv–I 或 V–I', 'needs iv–I or V–I', 'iv–I か V–I が必要') };
  } },
  // I 同主音借用：IV→iv、ii→iiø7、vi→♭VI、V7→V7(♭9)（都是 la → le）
  mixture: { label: NOTE('I 同主音借用', 'I Modal mixture', 'I 同主調からの借用'), apply(chords) {
    for (let i = 0; i < chords.length; i += 1) {
      const c = chords[i]; const tri = QUALITIES[c.quality].triad;
      let to = null; let why = null;
      if (c.degree === 4 && c.alter === 0 && tri === 'maj') { to = { ...c, quality: QUALITIES[c.quality].seventh ? 'min7' : 'min' }; why = NOTE('IV → iv：A 换成 A♭（la → le） 功能不变 颜色变暗', 'IV → iv: A becomes A♭ (la → le), same function, darker colour', 'IV → iv：A が A♭ に（la → le）。働きは同じで色が暗くなる'); }
      else if (c.degree === 2 && c.alter === 0 && tri === 'min') { to = { ...c, quality: 'hdim7' }; why = NOTE('ii → iiø7：加入 le', 'ii → iiø7: adds le', 'ii → iiø7：le を加える'); }
      else if (c.degree === 6 && c.alter === 0 && tri === 'min') { to = { ...c, alter: -1, quality: QUALITIES[c.quality].seventh ? 'maj7' : 'maj' }; why = NOTE('vi → ♭VI：根音换成 le', 'vi → ♭VI: the root becomes le', 'vi → ♭VI：根音が le に'); }
      else if (c.degree === 5 && c.alter === 0 && c.quality === 'dom7') { to = { ...c, quality: 'dom7b9' }; why = NOTE('V7 → V7(♭9)：♭9 就是 le', 'V7 → V7(♭9): the ♭9 is le', 'V7 → V7(♭9)：♭9 が le'); }
      if (to) return { chords: chords.map((x, k) => (k === i ? to : x)), changes: [{ at: i, why }] };
    }
    return { chords, changes: [], refused: NOTE('没有可以从 la 换成 le 的和弦', 'no chord where la can become le', 'la を le に代えられる和音がない') };
  } },
  // J 半音经过减和弦：根音上行全音的两个和弦之间插入经过的减七
  passingDim: { label: NOTE('J 半音经过减和弦', 'J Passing diminished', 'J 半音の経過減和音'), apply(chords) {
    for (let i = 0; i + 1 < chords.length; i += 1) {
      if (mod(rel(chords[i + 1]) - rel(chords[i])) !== 2) continue;
      const dim = fromRel(rel(chords[i]) + 1, 'dim7', false);
      const out = [...chords.slice(0, i), { ...chords[i], half: true }, { ...dim, half: true }, ...chords.slice(i + 1)];
      return { chords: out, changes: [{ at: i + 1, why: NOTE('根音相隔全音的两个和弦之间插入减七 低音半音上行（减七半音终止）', 'a diminished seventh between chords a whole step apart, the bass rising by semitones', '根音が全音離れた 2 つの和音の間に減七を挿入、バスが半音で上行（減七の半音終止）') }] };
    }
    return { chords, changes: [], refused: NOTE('没有根音上行全音的相邻和弦', 'no adjacent chords a whole step apart', '根音が全音上行する隣り合う和音がない') };
  } },
  // K 低音线连接：选转位让低音尽量级进
  bassline: { label: NOTE('K 低音线连接', 'K Bass-line connection', 'K バスラインをつなぐ'), apply(chords, ctx) {
    const changes = [];
    const key = ctx.key || 'C';
    const out = [chords[0]];
    let prevBass = realize(chords[0], key).bassPc;
    for (let i = 1; i < chords.length; i += 1) {
      const c = chords[i];
      const size = QUALITIES[c.quality].seventh ? 4 : 3;
      const opts = Array.from({ length: size }, (_, b) => ({ b, pc: realize({ ...c, bass: b }, key).bassPc }));
      const dist = (pc) => Math.min(mod(pc - prevBass), mod(prevBass - pc));
      // 原位能级进就用原位；否则找能级进的转位（不用第二转位）；都不行就保持原位
      const step = opts.filter((o) => [1, 2].includes(dist(o.pc)) && o.b !== 2).sort((a, b) => (a.b ? 1 : 0) - (b.b ? 1 : 0) || dist(a.pc) - dist(b.pc))[0];
      const choice = step || opts[0];
      if (choice.b !== (c.bass || 0)) changes.push({ at: i, why: NOTE(`改用转位 让低音级进（${['原位', '低音三音', '低音五音', '低音七音'][choice.b]}）`, `inversion chosen so the bass moves by step`, `バスが順次進行になるよう転回形にする（${['基本形', 'バスが 3 音', 'バスが 5 音', 'バスが 7 音'][choice.b]}）`) });
      out.push({ ...c, bass: choice.b });
      prevBass = choice.pc;
    }
    return { chords: out, changes };
  } },
  // L 循环起点旋转
  rotate: { label: NOTE('L 循环起点旋转', 'L Rotate the loop', 'L ループの始まりを回す'), apply(chords) {
    const out = [...chords.slice(1), chords[0]];
    return { chords: out, changes: [{ at: chords.length - 1, why: NOTE('从下一个和弦开始循环 和弦集合相同 但开头 结尾和主音感可能不同', 'start the loop one chord later — same chords, but the start, the ending and the sense of tonic may change', '次の和音からループを始める。和音は同じでも、始まり・終わり・主音感は変わりうる') }] };
  } },
  // M 和声节奏：每个和弦时值减半（一小节两个和弦）或加倍
  rhythm: { label: NOTE('M 和声节奏', 'M Harmonic rhythm', 'M 和声リズム'), options: ['half', 'double'], apply(chords, ctx, { option = 'half' } = {}) {
    const out = chords.map((c) => ({ ...c, scale: (c.scale || 1) * (option === 'half' ? 0.5 : 2) }));
    return { chords: out, changes: [{ at: 0, why: option === 'half' ? NOTE('每个和弦时值减半 和弦换得更快', 'every chord lasts half as long', '各和音の長さを半分に、和音の交代が速くなる') : NOTE('每个和弦时值加倍 和弦换得更慢', 'every chord lasts twice as long', '各和音の長さを 2 倍に、和音の交代が遅くなる') }] };
  } },
  // N 减七和弦同音异名重释：把减七换个根音拼写 解决到另一个目标
  dimRespell: { label: NOTE('N 减七重释', 'N Reinterpret a dim7', 'N 減七の読み替え'), options: ['1', '2', '3'], apply(chords, ctx, { option = '1' } = {}) {
    const i = chords.findIndex((c) => c.quality === 'dim7');
    if (i < 0) return { chords, changes: [], refused: NOTE('进行里没有减七和弦（可先用 E′ 或 J 插入一个）', 'no diminished seventh here (insert one with E′ or J first)', '進行に減七がない（先に E′ か J で挿入できる）') };
    const shift = 3 * Number(option);
    const respelled = fromRel(rel(chords[i]) + shift, 'dim7', false);
    const target = fromRel(rel(chords[i]) + shift + 1, chords[i + 1] ? QUALITIES[chords[i + 1].quality].triad === 'min' ? 'min' : 'maj' : 'maj', true);
    const out = [...chords];
    out[i] = { ...respelled, half: chords[i].half };
    if (out[i + 1]) out[i + 1] = { ...target, half: chords[i + 1].half };
    return { chords: out, changes: [{ at: i, why: NOTE('同一个减七和弦换一个音当根音重新拼写 它的导音指向新的目标和弦（四个音轮流当根音就有四个目标）', 'the same diminished seventh respelled with another note as root — its leading tone now points to a new target (four roots, four targets)', '同じ減七を別の音を根音にして綴り直すと、導音が新しい目標の和音を指す（4 音それぞれが根音になれば目標は 4 つ）') }] };
  } },
  // O 改变性质的再和声：小 → 大（属七，变成副属）或大 → 小
  requality: { label: NOTE('O 改变和弦性质', 'O Change chord quality', 'O 和音の性質を変える'), needsTarget: true, apply(chords, ctx, { at = 0 } = {}) {
    const c = chords[at];
    const tri = QUALITIES[c.quality].triad;
    let to = null; let why = null;
    if (tri === 'min') { to = { ...c, quality: QUALITIES[c.quality].seventh ? 'dom7' : 'maj' }; why = NOTE('小和弦改成大和弦或属七：三音升高半音 常变成副属（例如 Em7 → E7 引入 G♯ 指向 Am） 这不是只加七音', 'minor to major / dominant: the third rises a semitone, often making an applied dominant (Em7 → E7 brings G♯, pointing to Am) — not just adding a seventh', '短い和音を長三か属七に：3 音が半音上がり、副属になることが多い（例：Em7 → E7 で G♯ が入り Am を指す）。7 を加えるだけではない'); }
    else if (tri === 'maj') { to = { ...c, quality: QUALITIES[c.quality].seventh ? 'min7' : 'min' }; why = NOTE('大和弦改成小和弦：三音降低半音', 'major to minor: the third falls a semitone', '長い和音を短い和音に：3 音が半音下がる'); }
    if (!to) return { chords, changes: [], refused: NOTE('这个和弦不做性质替换', 'no quality change for this chord', 'この和音は性質を変えない') };
    return { chords: chords.map((x, i) => (i === at ? to : x)), changes: [{ at, why }] };
  } },
};

// ---------------- 声部配置与发声 ----------------
/** smooth：流行 / 爵士的平滑配置（沿用 accompaniment_voicing.js）；classical：严格四部（classical_voicing.js） */
export function voiceProgression(chords, { key = 'C', style = 'smooth' } = {}) {
  const real = realizeAll(chords, key);
  if (style === 'classical') {
    const entries = real.map((r) => {
      const pcs = [...new Set(r.tones.map((t) => t.pc))].slice(0, 4);
      return { pitchClasses: pcs, bassPc: r.bassPc, symbol: r.symbol, seventhPc: QUALITIES[r.quality].seventh ? r.tones[3]?.pc : null, maxCounts: Object.fromEntries(pcs.map((p) => [p, p === r.bassPc || p === r.rootPc ? 2 : 1])) };
    });
    const solved = solveVoicings(entries);
    if (solved.ok) return { ok: true, style, voices: solved.voices.map((v, i) => ({ midi: v, bass: v[0], chord: real[i] })) };
    const fallback = voiceProgression(chords, { key, style: 'smooth' });
    return { ...fallback, fallbackReason: solved.reason };
  }
  let previous = null;
  const voices = real.map((r) => {
    // 九和弦以上省略五音（OMT：省略五音几乎总是可以）
    let pcs = r.tones.map((t) => t.pc);
    if (pcs.length > 4) pcs = r.tones.filter((t) => t.member !== '5' && t.member !== '11' || r.quality === 'min11' && t.member === '11').map((t) => t.pc).slice(0, 4);
    const midi = accompanimentVoicing({ pitches: [...new Set(pcs)], bassPc: r.bassPc, rootPc: r.rootPc }, previous);
    previous = midi;
    return { midi, bass: midi[0], chord: r };
  });
  return { ok: true, style, voices };
}

/** 琶音音序：从实际低音开始按和弦音往上（C/G → G C E G C E）；root 模式明确叫"根音琶音"，忽略转位 */
export function arpeggioOrder(voice, { meter = 4, mode = 'voiced' } = {}) {
  const chord = voice.chord;
  const pcs = chord.tones.map((t) => t.pc).slice(0, QUALITIES[chord.quality].seventh ? 4 : 3);
  const start = mode === 'root' ? chord.rootPc : chord.bassPc;
  const ordered = [];
  const startIndex = pcs.indexOf(start);
  for (let i = 0; i < pcs.length; i += 1) ordered.push(pcs[(startIndex + i) % pcs.length]);
  // 从低音开始逐个往上找下一个和弦音
  let base = mode === 'root' ? voice.bass - mod(voice.bass - chord.rootPc) + (mod(voice.bass - chord.rootPc) ? 12 : 0) : voice.bass;
  // 起点太低会糊在一起（低音区音要拉开）：整串上移八度，起点仍是同一个低音音级
  while (base < 45) base += 12;
  const chain = [base];
  let k = 1;
  while (chain.length < 9) {
    const pc = ordered[k % ordered.length];
    let n = chain.at(-1) + 1;
    while (mod(n) !== pc) n += 1;
    chain.push(n);
    k += 1;
  }
  const size = ordered.length;
  if (meter === 3) return chain.slice(0, 6); // 六个八分音符：三和弦 1-3-5-1-3-5（转位从实际低音开始）
  // 4/4 的八个八分音符：上行到高八度再回落
  const up = chain.slice(0, size + 2);
  const down = chain.slice(1, size + 1).reverse();
  return [...up, ...down].slice(0, 8);
}

/** 播放事件：{ at（拍）, beats, midi[], kind: 'chord'|'bass'|'upper'|'arp', index } */
export function playbackEvents(voices, { beats = 4, meter = 4, texture = 'block', part = 'all', arpMode = 'voiced', durations = null } = {}) {
  const events = [];
  let at = 0;
  voices.forEach((v, index) => {
    const len = durations?.[index] ?? beats;
    const notes = part === 'bass' ? [v.bass] : part === 'upper' ? v.midi.slice(1) : v.midi;
    if (texture === 'arpeggio' && part !== 'bass') {
      const order = arpeggioOrder(v, { meter, mode: arpMode });
      const steps = Math.round(len * 2);
      for (let s = 0; s < steps; s += 1) {
        const n = order[s % order.length];
        if (part === 'upper' && n === v.bass) continue;
        events.push({ at: at + s / 2, beats: 0.5, midi: [n], index });
      }
    } else if (texture === 'pulse') {
      for (let b = 0; b < len; b += 1) events.push({ at: at + b, beats: 0.9, midi: notes, index });
    } else events.push({ at, beats: len, midi: notes, index });
    at += len;
  });
  return { events, total: at };
}

// ---------------- 旋律兼容 ----------------
/** 旋律音相对和弦的角色：chord 和弦音 / tension 延伸音 / clash 与和弦音成小二度 需要解决 */
export function melodyRole(melodyPc, chordReal) {
  const pcs = chordReal.tones.map((t) => t.pc);
  const i = mod(melodyPc - chordReal.rootPc);
  const tone = chordReal.tones.find((t) => t.pc === mod(melodyPc));
  if (tone) return { role: 'chord', label: NOTE(`和弦音（${tone.member}）`, `chord tone (${tone.member})`, `和音の音（${tone.member}）`) };
  const dominant = ['dom7', 'dom9', 'dom13', 'dom7b9'].includes(chordReal.quality);
  if (dominant && [1, 3, 8].includes(i)) return { role: 'tension', label: NOTE(`变化延伸音（${{ 1: '♭9', 3: '♯9', 8: '♭13' }[i]}） 属七上可用`, `altered tension (${{ 1: '♭9', 3: '♯9', 8: '♭13' }[i]}) on a dominant`, `変化した延長音（${{ 1: '♭9', 3: '♯9', 8: '♭13' }[i]}）、属七で使える`) };
  const clashWith = chordReal.tones.find((t) => mod(melodyPc - t.pc) === 1);
  if (clashWith) return { role: 'clash', label: NOTE(`与和弦音 ${clashWith.name} 成小二度（小九度） 当作需要级进解决的和弦外音`, `a minor second (ninth) above ${clashWith.name} — treat as a non-chord tone that resolves by step`, `和音の音 ${clashWith.name} と短 2 度（短 9 度）。順次で解決する和音外音として扱う`) };
  if (i === 2) return { role: 'tension', label: NOTE('延伸音 9', 'tension 9', '延長音 9') };
  if (i === 5) return { role: 'tension', label: NOTE('延伸音 11', 'tension 11', '延長音 11') };
  if (i === 9) return { role: 'tension', label: NOTE('延伸音 13（6）', 'tension 13 (6)', '延長音 13（6）') };
  if (i === 6) return { role: 'tension', label: NOTE('♯11 色彩 小和弦上要小心（与五音成减五度）', '♯11 colour — careful on minor chords', '♯11 の色。短い和音では注意（第 5 音と減 5 度）') };
  if (i === 10 || i === 11) return { role: 'tension', label: NOTE(i === 10 ? '加入 ♭7 色彩' : '加入大七色彩', i === 10 ? 'adds a ♭7 colour' : 'adds a major-seventh colour', i === 10 ? '♭7 の色を加える' : '長 7 度の色を加える') };
  return { role: 'clash', label: NOTE('不属于和弦 需要解决', 'not in the chord — needs resolution', '和音外の音、解決が必要') };
}

/** 一串旋律音（每个和弦一个，如 'A G E C'）对照两个版本 */
export function melodyCheck(melodyText, chords, key = 'C') {
  const notes = String(melodyText).trim().split(/[\s,，\-|]+/).filter(Boolean);
  const real = realizeAll(chords, key);
  return real.map((r, i) => {
    const name = notes[i];
    if (!name) return null;
    const m = /^([A-G])([#b♯♭]?)$/.exec(name);
    if (!m) return { name, role: 'bad' };
    const pc = mod(NATURAL[LETTERS.indexOf(m[1])] + (/[#♯]/.test(m[2]) ? 1 : /[b♭]/.test(m[2]) ? -1 : 0));
    return { name, pc, ...melodyRole(pc, r) };
  });
}

// ---------------- 检索 ----------------
/** 只看三和弦骨架的检索键：'b7maj' '6min' … */
export const keyOf = (c) => `${c.alter < 0 ? 'b' : c.alter > 0 ? '#' : ''}${c.degree}${QUALITIES[c.quality].triad}`;
const keysOf = (chords) => chords.map(keyOf);
const isRotation = (a, b) => a.length === b.length && a.length > 1 && Array.from({ length: a.length }, (_, k) => k).some((k) => a.every((x, i) => x === b[(i + k) % b.length]));
const contains = (big, small) => small.length >= 2 && big.length > small.length && Array.from({ length: big.length - small.length + 1 }, (_, s) => s).some((s) => small.every((x, i) => big[s + i] === x));

/** 和弦符号反查：返回可能的主音与调式（大调读法 / 平行大调参照的小调读法），不只给一个答案 */
export function reverseLookup(symbols) {
  const parsed = symbols.map(parseSymbol);
  if (!parsed.length || parsed.some((p) => !p)) return [];
  const minorQ = { 1: 'min', 2: 'dim', 3: 'maj', 4: 'min', 5: 'min', 6: 'maj', 7: 'maj' };
  const minorAlter = { 3: -1, 6: -1, 7: -1 };
  const out = [];
  const spellings = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'];
  spellings.forEach((name) => {
    const key = parseKey(name);
    const chords = parsed.map((p) => {
      const degree = mod(p.letter - key.letter, 7) + 1;
      const alter = mod(p.rootPc - key.pc - MAJOR[degree - 1] + 6) - 6;
      const bass = p.bassPc == null ? 0 : (() => { const r = realize({ degree, alter, quality: p.quality, bass: 0 }, name); const idx = r.tones.findIndex((t) => t.pc === p.bassPc); return idx > 0 ? idx : 0; })();
      return { degree, alter, quality: p.quality, bass };
    });
    if (chords.some((c) => Math.abs(c.alter) > 1)) return;
    const tri = (c) => QUALITIES[c.quality].triad;
    const majorFit = chords.filter((c) => c.alter === 0 && tri(c) === DIGIT_QUALITY[c.degree]).length;
    const minorFit = chords.filter((c) => c.alter === (minorAlter[c.degree] || 0) && tri(c) === minorQ[c.degree] || (c.degree === 5 && c.alter === 0 && tri(c) === 'maj') || (c.degree === 7 && c.alter === 0 && tri(c) === 'dim')).length;
    out.push({ tonic: name, mode: 'major', chords, fit: majorFit, romans: chords.map((c) => romanOf(c)) });
    out.push({ tonic: name, mode: 'minor', chords, fit: minorFit, romans: chords.map((c) => romanOf(c)) });
  });
  const seen = new Set();
  return out.filter((c) => c.fit >= Math.max(1, parsed.length - 1)).sort((a, b) => b.fit - a.fit || (a.mode === 'major' ? -1 : 1))
    .filter((c) => { const id = `${parseKey(c.tonic).pc}-${c.mode}`; if (seen.has(id)) return false; seen.add(id); return true; })
    .slice(0, 6);
}

/** 把查询文字读成和弦序列：数字 / 罗马数字 / 和弦符号（和弦符号返回多个调的读法） */
export function readQuery(text) {
  const q = String(text).trim();
  if (!q) return { kind: 'empty' };
  const digits = parseDigits(q);
  if (digits) return { kind: 'digits', readings: [{ chords: digits }] };
  const tokens = q.split(/[\s\-–—,，|]+/).filter(Boolean);
  const romans = tokens.map(parseRoman);
  if (romans.length && romans.every(Boolean)) return { kind: 'roman', readings: [{ chords: romans }] };
  const symbols = tokens.map(parseSymbol);
  if (symbols.length && symbols.every(Boolean)) {
    const keys = reverseLookup(tokens);
    return { kind: 'symbols', readings: keys.map((k) => ({ chords: k.chords, tonic: k.tonic, mode: k.mode, fit: k.fit })) };
  }
  return { kind: 'text' };
}

/** 检索条目：精确 > 循环旋转 > 包含（片段） > 文字 */
export function searchEntries(entries, text, { lang = 'zh' } = {}) {
  const query = readQuery(text);
  if (query.kind === 'empty') return { query, results: entries.map((entry) => ({ entry, match: 'all' })) };
  if (query.kind === 'text') {
    const n = String(text).toLowerCase().replace(/\s+/g, '');
    const results = entries.filter((e) => JSON.stringify([e.name, e.aliases, e.original, e.tags, e.feel, e.digits]).toLowerCase().replace(/\s+/g, '').includes(n)).map((entry) => ({ entry, match: 'text' }));
    return { query, results };
  }
  const results = [];
  const rank = { exact: 0, rotation: 1, contains: 2, within: 3 };
  entries.forEach((entry) => {
    const ek = keysOf(entry.chords);
    let best = null;
    query.readings.forEach((reading) => {
      if (reading.mode && entry.mode !== 'any' && reading.mode !== (entry.mode === 'major' ? 'major' : entry.mode === 'minor' ? 'minor' : reading.mode)) return;
      const qk = keysOf(reading.chords);
      let match = null;
      if (qk.join() === ek.join()) match = 'exact';
      else if (entry.kind === 'loop' && isRotation(qk, ek)) match = 'rotation';
      else if (contains(ek, qk)) match = 'contains';
      else if (contains(qk, ek)) match = 'within';
      if (match && (!best || rank[match] < rank[best.match])) best = { entry, match, reading };
    });
    if (best) results.push(best);
  });
  results.sort((a, b) => rank[a.match] - rank[b.match]);
  return { query, results };
}

/** 同一骨架的循环旋转：1564 → 5641 6415 4156 */
export function rotations(chords) {
  return chords.map((_, k) => [...chords.slice(k), ...chords.slice(0, k)]);
}

// ---------------- 资料库条目 ----------------
/** 解析条目里的罗马数字 生成和弦、数字写法与默认版本（原版带七音的默认显示原版） */
export function prepareEntries(entries) {
  return entries.map((entry) => {
    const tokens = entry.roman.split(/\s+/);
    const chords = tokens.map(parseRoman);
    const bad = tokens.filter((_, i) => !chords[i]);
    if (bad.length) throw new Error(`${entry.id}: cannot parse ${bad.join(' ')}`);
    const seventh = hasSeventh(chords);
    const cats = [...new Set([...entry.cats, entry.mode === 'minor' ? 'minor' : entry.mode === 'major' ? 'major' : null, entry.kind === 'loop' ? 'loop' : entry.kind === 'cadence' ? 'cadence' : 'link', seventh ? 'seventh' : 'triad'].filter(Boolean))];
    return { ...entry, chords, cats, digits: entry.digits || digitsOf(chords), hasSeventh: seventh, romanText: chords.map((c) => romanOf(c)).join('–') };
  });
}

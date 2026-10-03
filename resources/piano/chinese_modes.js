// 中国民族调式（五声性调式）
// 依据：
//   ref:sccm-ethnic-modes  四川音乐学院乐理课件《中国民族调式——五声性调式》：
//     五声正音由宫音五度相生；四个偏音（变宫、变徵、清角、闰）由宫音下方与角音上方两次五度相生；
//     "比正音低半音叫变，高半音叫清"；"清角又称和，清羽后称闰"；偏音不能成为调式主音；
//     宫角之间唯一的大三度是辨别宫系统的主要依据；五种调式的三音列结构与大小调色彩。
//   ref:zhwiki-heptatonic  维基百科「七声调式」：清乐加清角、变宫；雅乐加变徵、变宫；燕乐加清角、闰（清羽）。
//   ref:tcpc-biangong      中国传统文化促进会：变宫 si、变徵 升fa、清角 fa、闰 降si。
//   ref:dreampu-ethnic-modes 梦谱五线谱网《中国民族调式》：调式命名如 "C 宫调式" "D 商调式"；
//     六声调式共十种（加清角、加变宫各五种）；七声调式共十五种（雅乐、清乐、燕乐各五种）。
//   ref:huain-xuangong     陈畅（华音网）：《礼记·礼运》"五声六律十二管旋相为宫"；旋宫转调可同宫亦可异宫。
//   ref:zhwiki-shierlu     维基百科「十二律」：黄钟至应钟十二律名，以黄钟为 C 的对照。
//   ref:helvting-scales    贺绿汀《中国音阶及民族调式问题》：以旋律的活动中心与结束音判断调式。
import { parseNote, spellAbove, formatNote } from './pitch_spelling.js';

/** 九声阶名：相对宫音的首调音级（1–7）与半音数 */
export const JIE_MING = [
  { id: 'gong', zh: '宫', pinyin: 'Gong', degree: 1, semitones: 0, kind: 'zheng' },
  { id: 'shang', zh: '商', pinyin: 'Shang', degree: 2, semitones: 2, kind: 'zheng' },
  { id: 'jue', zh: '角', pinyin: 'Jue', degree: 3, semitones: 4, kind: 'zheng' },
  { id: 'qingjue', zh: '清角', alias: '和', pinyin: 'Qingjue', degree: 4, semitones: 5, kind: 'pian' },
  { id: 'bianzhi', zh: '变徵', pinyin: 'Bianzhi', degree: 4, semitones: 6, kind: 'pian' },
  { id: 'zhi', zh: '徵', pinyin: 'Zhi', degree: 5, semitones: 7, kind: 'zheng' },
  { id: 'yu', zh: '羽', pinyin: 'Yu', degree: 6, semitones: 9, kind: 'zheng' },
  { id: 'run', zh: '闰', alias: '清羽', pinyin: 'Run', degree: 7, semitones: 10, kind: 'pian' },
  { id: 'biangong', zh: '变宫', pinyin: 'Biangong', degree: 7, semitones: 11, kind: 'pian' },
];
const JIE = Object.fromEntries(JIE_MING.map((item) => [item.id, item]));
export const ZHENG_YIN = ['gong', 'shang', 'jue', 'zhi', 'yu'];

/** 音阶种类：五声、六声（两种）、七声（三种） */
export const SCALE_TYPES = [
  { id: 'pentatonic', count: 5, zh: '五声', ja: '五声', en: 'Pentatonic', added: [] },
  { id: 'hexa-qingjue', count: 6, zh: '六声（加清角）', ja: '六声（清角を加える）', en: 'Hexatonic (+ Qingjue)', added: ['qingjue'] },
  { id: 'hexa-biangong', count: 6, zh: '六声（加变宫）', ja: '六声（変宮を加える）', en: 'Hexatonic (+ Biangong)', added: ['biangong'] },
  { id: 'qingyue', count: 7, zh: '清乐', ja: '清楽', en: 'Qingyue', aliases: '新音阶、下徵音阶', added: ['qingjue', 'biangong'] },
  { id: 'yayue', count: 7, zh: '雅乐', ja: '雅楽', en: 'Yayue', aliases: '古音阶、正声音阶', added: ['bianzhi', 'biangong'] },
  { id: 'yanyue', count: 7, zh: '燕乐', ja: '燕楽', en: 'Yanyue', aliases: '俗乐音阶、清商音阶', added: ['qingjue', 'run'] },
];

/**
 * 五种调式。三音列：a 大二度+大二度，b 大二度+小三度，c 小三度+大二度。
 * color 与 notes 依据 ref:sccm-ethnic-modes 对各调式的说明。
 */
export const MODES = [
  { id: 'gong', zh: '宫', pinyin: 'Gong', trichords: 'a + b', color: 'major',
    note: { zh: '宫–角大三度、宫–羽大六度，大调色彩；缺下属音，较西洋大调平和流畅。', ja: '宮–角の長三度と宮–羽の長六度で長調的な色彩。下属音を欠き、西洋の長調より穏やか。', en: 'Major third Gong–Jue and major sixth Gong–Yu give a major colour; with no subdominant it sounds calmer than a Western major key.' } },
  { id: 'shang', zh: '商', pinyin: 'Shang', trichords: 'b + c', color: 'minor',
    note: { zh: '商–宫小七度，小调色彩；缺三度、六度音，但三个正音级完整。', ja: '商–宮の短七度で短調的な色彩。三度と六度を欠くが、三つの正音級はそろう。', en: 'Minor seventh Shang–Gong gives a minor colour; the third and sixth are missing but tonic, subdominant and dominant are all present.' } },
  { id: 'jue', zh: '角', pinyin: 'Jue', trichords: 'c + a', color: 'minor',
    note: { zh: '角–徵小三度、角–宫小六度、角–商小七度，小调色彩；缺属音支持，调性不易明确，乐曲较少见。', ja: '角–徴の短三度、角–宮の短六度、角–商の短七度で短調的。属音の支えがなく、用例は少ない。', en: 'Minor third, minor sixth and minor seventh above Jue give a minor colour; without a dominant the key is less clear, so pieces in Jue are rarer.' } },
  { id: 'zhi', zh: '徵', pinyin: 'Zhi', trichords: 'b + b', color: 'major',
    note: { zh: '徵–角大六度，大调色彩；缺三度音，但三个正音级都起支柱作用，是常用调式。', ja: '徴–角の長六度で長調的な色彩。三度を欠くが三つの正音級が支えとなり、よく使われる。', en: 'Major sixth Zhi–Jue gives a major colour; the third is missing but the three principal degrees support it, so it is widely used.' } },
  { id: 'yu', zh: '羽', pinyin: 'Yu', trichords: 'c + c', color: 'minor',
    note: { zh: '羽–宫小三度、羽–徵小七度，小调色彩；主音、属音、下属音俱全，功能上最接近西洋小调。', ja: '羽–宮の短三度、羽–徴の短七度で短調的。主音・属音・下属音がそろい、機能的に西洋の短調に最も近い。', en: 'Minor third Yu–Gong and minor seventh Yu–Zhi give a minor colour; with tonic, dominant and subdominant it is functionally closest to the Western minor.' } },
];
const MODE = Object.fromEntries(MODES.map((mode) => [mode.id, mode]));

/** 十二律名，按维基百科对照以黄钟为 C（ref:zhwiki-shierlu） */
export const SHI_ER_LU = ['黄钟', '大吕', '太簇', '夹钟', '姑洗', '仲吕', '蕤宾', '林钟', '夷则', '南吕', '无射', '应钟'];

export function scaleType(id) {
  const type = SCALE_TYPES.find((item) => item.id === id);
  if (!type) throw new Error(`未知音阶种类: ${id}`);
  return type;
}

/** 某音阶种类包含的阶名（按宫起始的高低顺序） */
export function scaleJieMing(typeId) {
  const members = new Set([...ZHENG_YIN, ...scaleType(typeId).added]);
  return JIE_MING.filter((item) => members.has(item.id));
}

/** 阶名在给定宫音下的音名（按首调音级拼写，如 C 宫的变徵为 F#、闰为 Bb） */
export function jieMingNote(gong, jieId) {
  const item = JIE[jieId];
  return spellAbove(gong, item.degree - 1, item.semitones);
}

/** 由调式主音与调式求宫音，例如 D 商 → C 宫、E 羽 → G 宫 */
export function gongForTonic(tonic, modeId) {
  const item = JIE[modeId];
  if (!item || item.kind !== 'zheng') throw new Error('调式主音必须是五个正音之一');
  const parsed = parseNote(tonic);
  if (!parsed) throw new Error(`无法识别的音名: ${tonic}`);
  const step = parsed.step - (item.degree - 1);
  const pc = parsed.pc - item.semitones;
  const naturalPc = [0, 2, 4, 5, 7, 9, 11][((step % 7) + 7) % 7];
  let accidental = (((pc - naturalPc) % 12) + 12) % 12;
  if (accidental > 6) accidental -= 12;
  return formatNote(step, accidental);
}

/** 调式名称，例如 "D 商调式" "D 商清乐调式" "D 商六声调式（加清角）" */
export function modeName(tonic, modeId, typeId = 'pentatonic', lang = 'zh') {
  const mode = MODE[modeId];
  const type = scaleType(typeId);
  if (lang !== 'zh') {
    const suffix = typeId === 'pentatonic' ? '' : ` · ${type[lang] || type.en}`;
    return `${tonic} ${mode.pinyin}${suffix}`;
  }
  if (typeId === 'pentatonic') return `${tonic} ${mode.zh}调式`;
  if (type.count === 6) return `${tonic} ${mode.zh}六声调式（加${JIE[type.added[0]].zh}）`;
  return `${tonic} ${mode.zh}${type.zh}调式`;
}

/**
 * 构建调式音阶：从调式主音起，列出各音的阶名、音名、相对主音的半音数。
 * @returns {{ gong, tonic, mode, type, name, notes: Array<{ id, zh, note, semitones, kind }> }}
 */
export function buildChineseMode({ gong, tonic, mode = 'gong', type = 'pentatonic' }) {
  const modeInfo = MODE[mode];
  if (!modeInfo) throw new Error(`未知调式: ${mode}`);
  const gongNote = gong || gongForTonic(tonic, mode);
  const tonicNote = jieMingNote(gongNote, mode);
  const members = scaleJieMing(type);
  const start = JIE[mode].semitones;
  const notes = members
    .map((item) => ({
      id: item.id,
      zh: item.zh,
      pinyin: item.pinyin,
      kind: item.kind,
      note: jieMingNote(gongNote, item.id),
      semitones: (item.semitones - start + 12) % 12,
    }))
    .sort((a, b) => a.semitones - b.semitones);
  return { gong: gongNote, tonic: tonicNote, mode: modeInfo, type: scaleType(type), name: modeName(tonicNote, mode, type), notes };
}

/** 同宫系统各调：宫音相同的五种调式（例如 C 宫系统：C 宫、D 商、E 角、G 徵、A 羽） */
export function sameGongSystem(gong, type = 'pentatonic') {
  return ZHENG_YIN.map((mode) => buildChineseMode({ gong, mode, type }));
}

/** 宫音的十二律名（黄钟 = C） */
export function luName(gong) {
  const parsed = parseNote(gong);
  return parsed ? SHI_ER_LU[parsed.pc] : '';
}

/** 旋宫：宫音按纯五度上行（fifths > 0）或下行移动，返回新的宫音 */
export function rotateGong(gong, fifths) {
  let current = gong;
  const steps = Math.abs(fifths);
  for (let i = 0; i < steps; i++) current = fifths > 0 ? spellAbove(current, 4, 7) : spellAbove(current, -4, -7);
  return current;
}

/**
 * 识别调式：给出旋律中出现的音与结束音（视为主音）。
 * 先以宫–角大三度和五个正音确定宫系统，再根据多出的偏音判断音阶种类。
 * 偏音不能作调式主音，此时返回 error；多种解释并存时 ambiguous 为 true。
 */
export function identifyChineseMode(noteNames, finalNote) {
  const parsed = noteNames.map(parseNote).filter(Boolean);
  if (parsed.length < 3) return { error: 'too-few-notes', candidates: [] };
  const pcs = new Set(parsed.map((note) => note.pc));
  const final = parseNote(finalNote ?? noteNames[noteNames.length - 1]);
  if (!final) return { error: 'bad-final', candidates: [] };
  if (!pcs.has(final.pc)) return { error: 'final-not-in-melody', candidates: [] };
  const candidates = [];
  for (let gongPc = 0; gongPc < 12; gongPc++) {
    const has = (semitones) => pcs.has((gongPc + semitones) % 12);
    if (!ZHENG_YIN.every((id) => has(JIE[id].semitones))) continue;
    const extras = [...pcs].map((pc) => (pc - gongPc + 12) % 12).filter((s) => ![0, 2, 4, 7, 9].includes(s)).sort((a, b) => a - b);
    const type = SCALE_TYPES.find((item) => {
      const added = item.added.map((id) => JIE[id].semitones).sort((a, b) => a - b);
      return added.length === extras.length && added.every((value, index) => value === extras[index]);
    });
    if (!type) continue;
    const finalOffset = (final.pc - gongPc + 12) % 12;
    const tonicJie = JIE_MING.find((item) => item.semitones === finalOffset);
    // 宫音拼写：由结束音按其阶名反推，保证字母关系正确
    const gong = tonicJie && tonicJie.kind === 'zheng'
      ? gongForTonic(formatNote(final.step, final.accidental), tonicJie.id)
      : spellAbove(formatNote(final.step, final.accidental), 0, -finalOffset);
    candidates.push({
      gong,
      type: type.id,
      tonicJie: tonicJie?.id || null,
      valid: Boolean(tonicJie && tonicJie.kind === 'zheng'),
      name: tonicJie && tonicJie.kind === 'zheng' ? modeName(formatNote(final.step, final.accidental), tonicJie.id, type.id) : null,
    });
  }
  if (!candidates.length) return { error: 'no-gong-system', candidates };
  const valid = candidates.filter((item) => item.valid);
  if (!valid.length) return { error: 'final-is-pian', candidates };
  // 七声音列可能同时符合多个宫系统（如 C 清乐 = F 雅乐 = G 燕乐 的音列），此时全部列出
  return { result: valid.length === 1 ? valid[0] : null, ambiguous: valid.length > 1, candidates: valid };
}

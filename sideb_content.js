// Side-B（翻面课程）的地图：6 章 43 关的元数据（编号、标题、对应 A 面关卡、有没有实操、是否核心关）。
// 关卡内容（五段节点）在 sideb_units_<章>.js，按 id 挂进 LEVELS[...].content；还没做好的关卡在地图上显示"制作中"。
// 设计见 SIDE_B_DESIGN.md。
import { LEVEL_B2_4 } from './sideb_units_harmony.js?v=20261004-u2';
import { LEVEL_B4_10 } from './sideb_units_rhythm.js?v=20261004-u2';
import { LEVEL_B2_1, LEVEL_B2_2, LEVEL_B2_3, LEVEL_B2_5, LEVEL_B2_6, LEVEL_B2_7, LEVEL_B2_8, LEVEL_B2_9, LEVEL_B2_10, LEVEL_B2_11, LEVEL_B2_12 } from './sideb_units_harmony2.js?v=20261004-w1';
import { LEVEL_B3_1, LEVEL_B3_2, LEVEL_B3_3, LEVEL_B3_4, LEVEL_B3_5 } from './sideb_units_melody.js?v=20261004-w1';
import { LEVEL_B4_1, LEVEL_B4_2, LEVEL_B4_3, LEVEL_B4_4, LEVEL_B4_5, LEVEL_B4_6, LEVEL_B4_7, LEVEL_B4_8, LEVEL_B4_9 } from './sideb_units_jazz.js?v=20261004-w5';
import { LEVEL_B1_1, LEVEL_B1_2, LEVEL_B1_3, LEVEL_B1_4, LEVEL_B1_5, LEVEL_B1_6, LEVEL_B1_7 } from './sideb_units_basics.js?v=20261004-u2';

const t = (zh, ja, en) => ({ zh, ja, en });

/** 六章：沿用 A 面的分区 id 与颜色（地图上和 A 面一一对应） */
export const B_CHAPTERS = [
  { id: 'basics', code: 'B1', short: t('入门', '入門', 'Basics'), title: t('入门：精确地听、写、数', '入門：正確に聴く・書く・数える', 'Basics: hear, write and count precisely') },
  { id: 'harmony', code: 'B2', short: t('和声', '和声', 'Harmony'), title: t('和声：从分析到写作', '和声：分析から作曲へ', 'Harmony: from analysis to writing') },
  { id: 'melody', code: 'B3', short: t('旋律', '旋律', 'Melody'), title: t('旋律、对位与乐器：线条的逻辑', '旋律・対位法・楽器：線の論理', 'Melody, counterpoint & instruments: the logic of lines') },
  { id: 'jazz', code: 'B4', short: t('节奏与爵士', 'リズムとジャズ', 'Rhythm & jazz'), title: t('节奏与爵士：能听、能打、能弹', 'リズムとジャズ：聴ける・叩ける・弾ける', 'Rhythm & jazz: hear it, tap it, play it') },
  { id: 'world', code: 'B5', short: t('世界', '世界', 'World'), title: t('世界音乐与律学：体系的比较与计算', '世界の音楽と音律：体系の比較と計算', 'World music & tuning: compare and calculate') },
  { id: 'modern', code: 'B6', short: t('现代', '現代', 'Modern'), title: t('二十世纪与微分音：从计算到分析', '20 世紀と微分音：計算から分析へ', '20th century & microtones: from calculation to analysis') },
];

/**
 * 43 关。a：对应的 A 面关卡（主关或支线的 id）；lab：关卡里有工具实操（🔬，只放在真正适合的关）；core：核心重点关（最多约 20 分钟）
 */
const L = (id, chapter, title, a, { lab = false, core = false } = {}) => ({ id, chapter, title, a, lab, core });
export const B_LEVELS = [
  L('B1-1', 'basics', t('音高、拼写与记谱的精确性', '音高・綴り・記譜の正確さ', 'Pitch, spelling and notation, precisely'), ['keys', 'staff']),
  L('B1-2', 'basics', t('脉动、细分与节拍层级', '拍・細分・拍節の階層', 'Pulse, subdivision and metric levels'), ['rhythm', 'meter', 'meter2'], { lab: true }),
  L('B1-3', 'basics', t('音程的计算与转位', '音程の計算と転回', 'Calculating and inverting intervals'), ['intervals', 'intervalqual']),
  L('B1-4', 'basics', t('调号、音阶与音级功能', '調号・音階・音度の機能', 'Key signatures, scales and scale-degree function'), ['major', 'minor']),
  L('B1-5', 'basics', t('调式：特征音、识别与调式和声', '旋法：特性音・識別・旋法和声', 'Modes: characteristic tones, identification, modal harmony'), ['modes', 'modes2']),
  L('B1-6', 'basics', t('五声与五声和声', '五音音階と五音の和声', 'Pentatonic scales and pentatonic harmony'), ['pentatonic', 'pentaharm']),
  L('B1-7', 'basics', t('织体与声部独立', 'テクスチュアと声部の独立', 'Texture and independent voices'), ['texture']),
  L('B2-1', 'harmony', t('和弦的构成、拼写与转位', '和音の構成・綴り・転回', 'Building, spelling and inverting chords'), ['triads', 'sevenths', 'inversions']),
  L('B2-2', 'harmony', t('和弦符号 ⇄ 罗马数字', 'コード・シンボル ⇄ ローマ数字', 'Chord symbols ⇄ Roman numerals'), ['symbols', 'chordplus', 'roman', 'symbols2']),
  L('B2-3', 'harmony', t('数字低音与八度法则', '数字付き低音とオクターヴの規則', 'Figured bass and the Rule of the Octave'), ['figured', 'ruleoctave'], { lab: true }),
  L('B2-4', 'harmony', t('四部写作 I：排列、重复、声部进行', '4 声体 I：配置・重複・声部進行', 'Four-part writing I: spacing, doubling, voice leading'), ['voicing', 'voiceleading'], { lab: true, core: true }),
  L('B2-5', 'harmony', t('和声功能与乐句模型', '和声機能とフレーズ・モデル', 'Harmonic function and the phrase model'), ['functions', 'schemas']),
  L('B2-6', 'harmony', t('终止式与四六和弦', '終止形と四六の和音', 'Cadences and six-four chords'), ['cadences', 'sixfour', 'cadences2']),
  L('B2-7', 'harmony', t('乐句、乐段与曲式分析', 'フレーズ・楽節・楽式分析', 'Phrases, periods and form'), ['form', 'forms', 'motif', 'phrase2']),
  L('B2-8', 'harmony', t('离调与转调', '一時的転調と転調', 'Tonicization and modulation'), ['tonicization', 'modulation2'], { lab: true, core: true }),
  L('B2-9', 'harmony', t('半音化和声：混合、那不勒斯、增六', '半音階的和声：借用・ナポリ・増六', 'Chromatic harmony: mixture, Neapolitan, augmented sixths'), ['chromatic', 'schemas2'], { lab: true }),
  L('B2-10', 'harmony', t('五度圈与调关系', '五度圏と調の関係', 'The circle of fifths and key relations'), ['circle']),
  L('B2-11', 'harmony', t('新黎曼变换', 'ネオ・リーマン変換', 'Neo-Riemannian transformations'), ['neoriemann']),
  L('B2-12', 'harmony', t('和声综合：从分析到写作', '和声の総合：分析から作曲へ', 'Harmony synthesis: from analysis to writing'), [], { lab: true, core: true }),
  L('B3-1', 'melody', t('移调乐器与总谱阅读', '移調楽器と総譜の読み方', 'Transposing instruments and score reading'), ['instruments']),
  L('B3-2', 'melody', t('指板上的和声', '指板の上の和声', 'Harmony on the fretboard'), ['fretboard']),
  L('B3-3', 'melody', t('非和弦音分析', '非和声音の分析', 'Analysing embellishing tones'), ['nonchord', 'nctmore']),
  L('B3-4', 'melody', t('类别对位 I–II', '類別対位法 I–II', 'Species counterpoint I–II'), ['counterpoint', 'species'], { lab: true, core: true }),
  L('B3-5', 'melody', t('类别对位 III–IV 与模仿', '類別対位法 III–IV と模倣', 'Species counterpoint III–IV and imitation'), ['species', 'canon'], { lab: true, core: true }),
  L('B4-1', 'jazz', t('节奏 II：连音、切分、摇摆与反拍', 'リズム II：連符・シンコペーション・スウィング・裏拍', 'Rhythm II: tuplets, syncopation, swing, off-beats'), ['swing', 'dictation'], { lab: true }),
  L('B4-2', 'jazz', t('布鲁斯：形式、音阶与和声', 'ブルース：形式・音階・和声', 'Blues: form, scale and harmony'), ['blues', 'bluesscale', 'blues2']),
  L('B4-3', 'jazz', t('ii–V–I 与和弦—音阶', 'ii–V–I とコード・スケール', 'ii–V–I and chord–scale theory'), ['jazz', 'chordscale']),
  L('B4-4', 'jazz', t('导向音、调性中心与进行分析', 'ガイド・トーン・調性の中心・進行分析', 'Guide tones, key centres and progression analysis'), ['guidetone', 'keycenter', 'turnarounds']),
  L('B4-5', 'jazz', t('爵士配置', 'ジャズ・ヴォイシング', 'Jazz voicings'), ['jazzvoicing'], { lab: true, core: true }),
  L('B4-6', 'jazz', t('旋律小调与和声小调的调式体系', '旋律的短音階と和声的短音階の旋法体系', 'Modes of melodic and harmonic minor'), ['melodicminor', 'harmonicminor']),
  L('B4-7', 'jazz', t('对称音阶与 bebop 音阶', '対称音階とビバップ・スケール', 'Symmetric and bebop scales'), ['symmetric', 'morescales']),
  L('B4-8', 'jazz', t('和弦替代与再和声', 'コード代理とリハーモナイズ', 'Substitution and reharmonization'), ['substitutions', 'color', 'reharm'], { lab: true, core: true }),
  L('B4-9', 'jazz', t('负和声与 LCC：两种"镜像 / 引力"理论', 'ネガティブ・ハーモニーと LCC：「鏡像 / 引力」の 2 つの理論', 'Negative harmony and the LCC: two “mirror / gravity” theories'), ['negharmony', 'lcc']),
  L('B4-10', 'jazz', t('节奏 III：复节奏、复拍、变拍子与节拍调制', 'リズム III：ポリリズム・ポリメーター・変拍子・メトリック・モジュレーション', 'Rhythm III: polyrhythm, polymeter, changing meter, metric modulation'), ['meter2', 'swing'], { lab: true, core: true }),
  L('B5-1', 'world', t('中国七声调式与旋宫', '中国の七声調式と旋宮', 'Chinese heptatonic modes and modulation by rotation'), ['heptatonic']),
  L('B5-2', 'world', t('thaat 与木卡姆：两种音阶体系的比较', 'ターートとマカーム：2 つの音階体系の比較', 'Thaat and maqam: comparing two scale systems'), ['thaat', 'world']),
  L('B5-3', 'world', t('泛音列与音色', '倍音列と音色', 'The harmonic series and timbre'), ['harmonics']),
  L('B5-4', 'world', t('律制的计算', '音律の計算', 'Calculating temperaments'), ['temperaments', 'welltemper']),
  L('B6-1', 'modern', t('音级与整数音程', 'ピッチクラスと整数音程', 'Pitch classes and integer intervals'), ['posttonal', 'pitchclass']),
  L('B6-2', 'modern', t('音集与对称', '音の集合と対称性', 'Collections and symmetry'), ['collections']),
  L('B6-3', 'modern', t('集合级分析', 'セット・クラス分析', 'Set-class analysis'), ['setclass'], { lab: true, core: true }),
  L('B6-4', 'modern', t('十二音矩阵与音列分析', '十二音マトリクスと音列分析', 'Twelve-tone matrices and row analysis'), ['twelvetone'], { lab: true }),
  L('B6-5', 'modern', t('微分音与扩展纯律', '微分音と拡張純正律', 'Microtones and extended just intonation'), ['micro', 'microharmony']),
];

/** 已经做好的关卡内容（其余显示"制作中"） */
const CONTENT = {
  'B1-1': LEVEL_B1_1, 'B1-2': LEVEL_B1_2, 'B1-3': LEVEL_B1_3, 'B1-4': LEVEL_B1_4, 'B1-5': LEVEL_B1_5, 'B1-6': LEVEL_B1_6, 'B1-7': LEVEL_B1_7,
  'B2-1': LEVEL_B2_1, 'B2-2': LEVEL_B2_2, 'B2-3': LEVEL_B2_3, 'B2-4': LEVEL_B2_4, 'B2-5': LEVEL_B2_5, 'B2-6': LEVEL_B2_6,
  'B2-7': LEVEL_B2_7, 'B2-8': LEVEL_B2_8, 'B2-9': LEVEL_B2_9, 'B2-10': LEVEL_B2_10, 'B2-11': LEVEL_B2_11, 'B2-12': LEVEL_B2_12,
  'B3-1': LEVEL_B3_1, 'B3-2': LEVEL_B3_2, 'B3-3': LEVEL_B3_3, 'B3-4': LEVEL_B3_4, 'B3-5': LEVEL_B3_5,
  'B4-1': LEVEL_B4_1, 'B4-2': LEVEL_B4_2, 'B4-3': LEVEL_B4_3, 'B4-4': LEVEL_B4_4, 'B4-5': LEVEL_B4_5, 'B4-6': LEVEL_B4_6, 'B4-7': LEVEL_B4_7, 'B4-8': LEVEL_B4_8, 'B4-9': LEVEL_B4_9,
  'B4-10': LEVEL_B4_10,
};
B_LEVELS.forEach((level) => { if (CONTENT[level.id]) Object.assign(level, CONTENT[level.id], { id: level.id, chapter: level.chapter, title: level.title, a: level.a }); });

export const levelById = (id) => B_LEVELS.find((level) => level.id === id) || null;
export const chapterLevels = (chapterId) => B_LEVELS.filter((level) => level.chapter === chapterId);
/** 地图上能玩的关卡：有内容（sections）的 */
export const isPlayable = (level) => Boolean(level?.sections);

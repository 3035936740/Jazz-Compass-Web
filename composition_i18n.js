// 曲式与节奏模块的界面翻译：composition.js 的数据与生成的说明文字保持中文，这里提供日文 / 英文
// （术语与 composition.js 中引用的资料一致：ref:omt-rondo ref:omt-modulation ref:musictheory-net-cadences）
import { MODULATIONS } from './composition.js?v=20261003-c3';

export const COMPOSE_TEXT = {
  zh: {
    tempo: '速度 ♩ BPM', ready: '就绪', stopped: '已停止', allRests: '当前全部休止', playing: '播放中', done: '播放完成', play: '播放', stop: '停止',
    form: '曲式', key: '主调', mode: '调式', major: '大调', minor: '小调', meter: '拍号', bars: '每段小节数', barsN: (n) => `${n} 小节`,
    bass: '低音伴奏', bassParallel: '同步低音', bassAlternating: '交替低音', modulation: '调性处理', cadence: '主段终止',
    phrase: '乐句组织', period: '平行乐段 先开放 后收束', sentence: '乐句 2 + 2 + 4', harmonicRhythm: '和声节奏', hr1: '每小节一个和弦', hr2: '每小节两个和弦',
    sequence: '加入五度模进', intro: '引子', coda: '尾声', trackMelody: '琶音旋律', trackHarmony: '和声', trackBass: '低音',
    exportJson: '导出样例 JSON', guide: '曲式与分析提示', sourcesLabel: '理论参考 ', cadenceLink: '乐句与终止',
    summary: (bars, meter, key, mode) => `${bars} 小节 / ${meter} / ${key} ${mode}`,
    scoreHelp: '点击任意小节试听旋律与伴奏 / 和弦名称与功能位于谱表上方',
    imported: (title, chords) => `主要段落（A）使用从套路和弦进行速查送来的进行 ${title}：${chords}；对比段落照常生成`, clearImport: '恢复自动生成',
    sectionRange: (from, to, key, mode, role) => `${from}–${to} 小节 / ${key} ${mode} / ${role}`,
    contrast: '对比乐段', varied: '变化再现', main: '主要材料', playSection: '试听本段', adjust: '调整本段调性与结尾',
    sectionKey: '本段调性', sectionMode: '本段调式', sectionCadence: '本段结尾', sectionAria: (label, n, field) => `${label} 第 ${n} 段 ${field}`,
    terms: [
      ['A / A\' / B / C', 'A 是主要材料 A\' 保留身份并改变配置 B 和 C 使用对比和声与琶音方向'],
      ['乐段与复乐段', 'A 示例分为前后两句 A A\' 是两个相关乐段的教学布局 字母本身不能单独证明乐段结构'],
      ['二部与三部', 'A B 建立两个区域 A B A 强调再现 A B A\' 在再现中变化'],
      ['回旋与变奏', '回旋反复返回 A 变奏持续改写 A 两者有不同的材料组织方式'],
      ['终止与淡出', 'PAC 需要根位属到主 且旋律落主音 IAC 本例落三音 Fade Out 是音量处理 不等同于和声终止'],
      ['离调与转调', '副属短暂强调另一和弦 转调需要新调的建立 共同和弦标注前后两种功能'],
      ['调式交替', '借用同主音调式的和弦 不自动构成转调 关系大小调则改变主音中心'],
      ['模进与连接', '五度模进推进和声 引子可建立属功能 尾声强化结束 重新出现的 A 回到主调'],
      ['进一步分析', '可比较乐句长度 对称性 重复与变化 调性闭合 和声节奏 织体 密度 高潮位置 与再现后的终止强度'],
      ['样例边界', '这里生成结构与伴奏示意 琶音代替完整旋律 不将自动模板视为作品的唯一曲式分析'],
    ],
    meterFilter: '拍号筛选', allMeters: '所有拍号', swing: '时值摆动', straight: '直拍', swing21: 'Swing 约 2:1', swing31: '重 Swing 3:1', loops: '循环次数',
    sandboxMeter: '沙盒拍号', cell: '每格时值', newPattern: '新建空白节奏', clearCells: '清空格子', exportRhythm: '导出节奏 JSON',
    customName: '自定义沙盒', customHint: '点击任意格子开始', perCell: (n) => `每格 1/${n}`, groupHint: '按分组边界感受不对称节拍',
    cellAria: (i, v) => `第 ${i} 格 ${v}`, accent: '重音', onset: '起音', tie: '延音', rest: '休止',
    legend: 'X 重音 / x 起音 / - 延续前音 / 0 休止 / 点击循环切换', orphan: '休止后或首格的延音没有前音可连接 播放时作为休止',
    staffAria: (label, from, to) => `${label} 第 ${from} 到 ${to} 小节`, barAria: (n, chords) => `试听第 ${n} 小节 ${chords} 含旋律和伴奏`,
    tracks: { melody: '旋律', harmony: '和声', bass: '低音' },
  },
  ja: {
    tempo: 'テンポ ♩ BPM', ready: '準備完了', stopped: '停止しました', allRests: 'すべて休符です', playing: '再生中', done: '再生終了', play: '再生', stop: '停止',
    form: '楽式', key: '主調', mode: '旋法', major: '長調', minor: '短調', meter: '拍子', bars: '各部分の小節数', barsN: (n) => `${n} 小節`,
    bass: 'ベース伴奏', bassParallel: '和音と同時のベース', bassAlternating: '交互のベース', modulation: '調の扱い', cadence: '主部の終止',
    phrase: 'フレーズ構成', period: '楽節（開いて閉じる）', sentence: '楽文 2 + 2 + 4', harmonicRhythm: '和声リズム', hr1: '1 小節に 1 和音', hr2: '1 小節に 2 和音',
    sequence: '五度の反復進行を加える', intro: '序奏', coda: 'コーダ', trackMelody: 'アルペジオの旋律', trackHarmony: '和声', trackBass: 'ベース',
    exportJson: '例を JSON で書き出し', guide: '楽式と分析のヒント', sourcesLabel: '参考資料 ', cadenceLink: 'フレーズと終止',
    summary: (bars, meter, key, mode) => `${bars} 小節 / ${meter} / ${key} ${mode}`,
    scoreHelp: '小節をクリックすると旋律と伴奏を試聴できます / コード名と機能は譜表の上',
    imported: (title, chords) => `主要部分（A）は定番進行の早見表から送られた進行 ${title}：${chords}。対照部分はいつも通り生成`, clearImport: '自動生成に戻す',
    sectionRange: (from, to, key, mode, role) => `${from}–${to} 小節 / ${key} ${mode} / ${role}`,
    contrast: '対照部分', varied: '変化した再現', main: '主要素材', playSection: 'この部分を試聴', adjust: 'この部分の調と終止を変更',
    sectionKey: 'この部分の調', sectionMode: 'この部分の旋法', sectionCadence: 'この部分の終止', sectionAria: (label, n, field) => `${label} 第 ${n} 部分 ${field}`,
    terms: [
      ['A / A\' / B / C', 'A は主要素材、A\' は同一性を保ちつつ配置を変え、B と C は対照的な和声とアルペジオの方向を使います'],
      ['楽節と複楽節', 'A の例は前後二つのフレーズに分かれます。A A\' は関連する二つの楽節の教材用配置で、記号だけで楽節構造は証明できません'],
      ['二部と三部', 'A B は二つの領域を作り、A B A は再現を強調し、A B A\' は再現で変化します'],
      ['ロンドと変奏', 'ロンドは繰り返し A に戻り、変奏は A を書き換え続けます。素材の組み立て方が異なります'],
      ['終止とフェードアウト', 'PAC は基本形の属から主へ進み旋律が主音に着く必要があります。この例の IAC は第 3 音に着地。フェードアウトは音量処理で和声的終止ではありません'],
      ['一時的転調と転調', '副属和音は別の和音を一時的に強調し、転調には新しい調の確立が必要です。共通和音は前後二つの機能で表記します'],
      ['同主調の借用', '同主調の和音を借りても自動的には転調になりません。平行調への転調は主音の中心を変えます'],
      ['反復進行と接続', '五度の反復進行が和声を推進し、序奏は属機能を作り、コーダは終わりを強め、再び現れる A は主調に戻ります'],
      ['さらに分析するには', 'フレーズの長さ、対称性、反復と変化、調の閉じ方、和声リズム、テクスチュア、密度、クライマックスの位置、再現後の終止の強さを比べられます'],
      ['例の限界', 'ここで作るのは構造と伴奏の見本で、アルペジオが完全な旋律の代わりです。自動テンプレートを作品の唯一の楽式分析とみなさないでください'],
    ],
    meterFilter: '拍子で絞り込み', allMeters: 'すべての拍子', swing: 'スウィング', straight: 'イーブン', swing21: 'スウィング 約 2:1', swing31: '強いスウィング 3:1', loops: '繰り返し回数',
    sandboxMeter: '自由作成の拍子', cell: '1 マスの音価', newPattern: '空のリズムを作成', clearCells: 'マスをクリア', exportRhythm: 'リズムを JSON で書き出し',
    customName: '自由作成', customHint: 'マスをクリックして始めます', perCell: (n) => `1 マス = 1/${n}`, groupHint: 'グループの境目で不規則な拍子を感じ取ります',
    cellAria: (i, v) => `${i} マス目 ${v}`, accent: 'アクセント', onset: '発音', tie: '延長', rest: '休符',
    legend: 'X アクセント / x 発音 / - 前の音を延長 / 0 休符 / クリックで切り替え', orphan: '休符の後や最初のマスの延長はつなぐ音がないため、休符として再生されます',
    staffAria: (label, from, to) => `${label} 第 ${from}–${to} 小節`, barAria: (n, chords) => `第 ${n} 小節 ${chords} を旋律と伴奏で試聴`,
    tracks: { melody: '旋律', harmony: '和声', bass: 'ベース' },
  },
  en: {
    tempo: 'Tempo ♩ BPM', ready: 'Ready', stopped: 'Stopped', allRests: 'Everything is a rest', playing: 'Playing', done: 'Finished', play: 'Play', stop: 'Stop',
    form: 'Form', key: 'Key', mode: 'Mode', major: 'major', minor: 'minor', meter: 'Meter', bars: 'Bars per section', barsN: (n) => `${n} bars`,
    bass: 'Bass accompaniment', bassParallel: 'Bass with the chords', bassAlternating: 'Alternating bass', modulation: 'Key plan', cadence: 'Main cadence',
    phrase: 'Phrase design', period: 'Period (open, then closed)', sentence: 'Sentence 2 + 2 + 4', harmonicRhythm: 'Harmonic rhythm', hr1: 'One chord per bar', hr2: 'Two chords per bar',
    sequence: 'Add a fifths sequence', intro: 'Introduction', coda: 'Coda', trackMelody: 'Arpeggiated melody', trackHarmony: 'Harmony', trackBass: 'Bass',
    exportJson: 'Export example as JSON', guide: 'Form and analysis notes', sourcesLabel: 'Theory sources ', cadenceLink: 'Phrases and cadences',
    summary: (bars, meter, key, mode) => `${bars} bars / ${meter} / ${key} ${mode}`,
    scoreHelp: 'Click any bar to hear melody and accompaniment / chord names and functions sit above the staff',
    imported: (title, chords) => `Main sections (A) use the progression sent from the progression library, ${title}: ${chords}; contrasting sections are generated as usual`, clearImport: 'Back to automatic',
    sectionRange: (from, to, key, mode, role) => `bars ${from}–${to} / ${key} ${mode} / ${role}`,
    contrast: 'contrasting section', varied: 'varied return', main: 'main material', playSection: 'Play this section', adjust: 'Change this section’s key and ending',
    sectionKey: 'Section key', sectionMode: 'Section mode', sectionCadence: 'Section ending', sectionAria: (label, n, field) => `${label}, section ${n}: ${field}`,
    terms: [
      ['A / A\' / B / C', 'A is the main material; A\' keeps its identity in a new setting; B and C use contrasting harmony and arpeggio direction.'],
      ['Period and double period', 'The A example splits into two phrases; A A\' is a teaching layout of two related periods — letters alone cannot prove period structure.'],
      ['Binary and ternary', 'A B sets up two areas; A B A stresses return; A B A\' varies the return.'],
      ['Rondo and variation', 'A rondo keeps returning to A; variations keep rewriting A — two different ways of organising material.'],
      ['Cadences and fade-outs', 'A PAC needs root-position V to I with the melody on the tonic; the IAC here ends on the third. A fade-out is a volume treatment, not a harmonic cadence.'],
      ['Tonicization and modulation', 'A secondary dominant briefly stresses another chord; modulation needs the new key to be established. Pivot chords are labelled with both functions.'],
      ['Modal mixture', 'Borrowing chords from the parallel mode does not by itself modulate; moving to the relative key changes the tonal centre.'],
      ['Sequences and links', 'A fifths sequence drives the harmony; an introduction can set up dominant function; a coda reinforces the ending; a returning A comes back in the home key.'],
      ['Further analysis', 'Compare phrase lengths, symmetry, repetition and variation, tonal closure, harmonic rhythm, texture, density, climax and the strength of the final cadence.'],
      ['Limits of the example', 'This generates a sketch of structure and accompaniment, with arpeggios in place of a full melody; don’t treat an automatic template as the only formal analysis of a piece.'],
    ],
    meterFilter: 'Filter by meter', allMeters: 'All meters', swing: 'Swing', straight: 'Straight', swing21: 'Swing ≈ 2:1', swing31: 'Hard swing 3:1', loops: 'Loops',
    sandboxMeter: 'Sandbox meter', cell: 'Cell value', newPattern: 'New blank pattern', clearCells: 'Clear cells', exportRhythm: 'Export rhythm as JSON',
    customName: 'Custom sandbox', customHint: 'Click any cell to begin', perCell: (n) => `each cell 1/${n}`, groupHint: 'Feel the uneven meter through the group boundaries',
    cellAria: (i, v) => `cell ${i}: ${v}`, accent: 'accent', onset: 'onset', tie: 'held', rest: 'rest',
    legend: 'X accent / x onset / - hold previous / 0 rest / click to cycle', orphan: 'A hold after a rest or in the first cell has nothing to continue and plays as a rest',
    staffAria: (label, from, to) => `${label}, bars ${from}–${to}`, barAria: (n, chords) => `Play bar ${n} (${chords}) with melody and accompaniment`,
    tracks: { melody: 'Melody', harmony: 'Harmony', bass: 'Bass' },
  },
};

const FORM_NAMES = {
  ja: { single: '一部形式 A', doublePeriod: "一部形式 A A'", binary: '二部形式 A B', ternary: '三部形式 A B A', variedTernary: "三部形式 A B A'", rondo: 'ロンド形式 A B A C A', largeRondo: '7 部ロンド A B A C A B A', variation: "変奏 A A' A''", song: '歌謡形式 A A B A', verseChorus: 'ヴァース・コーラス A B A B C B' },
  en: { single: 'One-part form A', doublePeriod: "One-part form A A'", binary: 'Binary form A B', ternary: 'Ternary form A B A', variedTernary: "Ternary form A B A'", rondo: 'Rondo A B A C A', largeRondo: 'Seven-part rondo A B A C A B A', variation: "Variations A A' A''", song: 'Song form A A B A', verseChorus: 'Verse–chorus A B A B C B' },
};
const CADENCE_NAMES = {
  ja: {
    pac: ['完全全終止', 'V → I / i 基本形、旋律は主音で終わる'], iac: ['不完全全終止', 'V → I / i、旋律は第 3 音で終わる'],
    k64: ['終止の四六を伴う全終止', 'I6/4 → V → I、属音のバスを保ち倚音が下行'], deceptive: ['偽終止', 'V → vi / VI、期待される主和音を避ける'],
    half: ['半終止／開いた終わり', 'V で止まり、続く展開への緊張を保つ'], plagal: ['変格終止', 'IV / iv → I / i'],
    phrygian: ['フリギア半終止', '短調の iv6 → V、バスは ♭6 から属音へ下行'], open: ['ループする開いた終わり', '前属和音で止まり、次の周回へつなぐ'],
    fade: ['フェードアウト', '最後のループを繰り返しながら音量を下げる。和声的な終止ではなく制作上の手法'],
    picardy: ['ピカルディ終止（ピカルディの 3 度）', '短調の部分を V → 長三和音の I で閉じる'], accented: ['アクセントのある終止（旧称：男性終止）', 'V → I、最後の主和音が強拍に来る'],
    unaccented: ['アクセントのない終止（旧称：女性終止）', 'V → I、最後の主和音が半小節遅れて弱拍に来る'], andalusian: ['アンダルシア進行で終わる', 'i → ♭VII → ♭VI → V、長調では同主短調から借用'],
    pathetic: ['悲愴終止（ナポリの六＋正格終止）', '♭II6 → V → I / i。古い呼び名'], jazz251: ['ジャズの ii–V–I', 'ii7 → V7 → Imaj7（短調は iiø7 → V7 → i7）。標準用語ではない呼び名'],
    jazzHalf: ['ii–V で V に止まる', 'ii7 → V7。定義上は半終止。標準用語ではない呼び名'], custom: ['取り込んだ進行', '取り込んだ進行のもとの終わり方のまま、終止形を加えない'],
  },
  en: {
    pac: ['Perfect authentic cadence', 'V → I / i in root position, melody ends on the tonic'], iac: ['Imperfect authentic cadence', 'V → I / i, melody ends on the third'],
    k64: ['Authentic cadence with cadential 6/4', 'I6/4 → V → I over a held dominant bass, appoggiaturas fall'], deceptive: ['Deceptive cadence', 'V → vi / VI avoids the expected tonic'],
    half: ['Half cadence / open ending', 'Stops on V, keeping tension for what follows'], plagal: ['Plagal cadence', 'IV / iv → I / i'],
    phrygian: ['Phrygian half cadence', 'Minor-key iv6 → V, the bass falling from ♭6 to the dominant'], open: ['Open looping ending', 'Stops on the predominant and rolls into the next loop'],
    fade: ['Fade-out', 'Repeat the last loop while lowering the volume — a production technique, not a harmonic cadence'],
    picardy: ['Picardy cadence (Picardy third)', 'A minor section ends V → major I'], accented: ['Metrically accented cadence (formerly “masculine”)', 'V → I with the final tonic on the downbeat'],
    unaccented: ['Metrically unaccented cadence (formerly “feminine”)', 'V → I with the final tonic half a bar late, on a weak beat'], andalusian: ['Andalusian ending', 'i → ♭VII → ♭VI → V; in major the chords are borrowed from the parallel minor'],
    pathetic: ['“Pathetic” cadence (Neapolitan + authentic)', '♭II6 → V → I / i — an outdated name'], jazz251: ['Jazz ii–V–I (“full jazz cadence”)', 'ii7 → V7 → Imaj7 (minor iiø7 → V7 → i7) — not a standard term'],
    jazzHalf: ['Jazz ii–V stopping on V (“jazz half cadence”)', 'ii7 → V7, a half cadence by definition — not a standard term'], custom: ['Imported progression', 'Keeps the imported progression’s own ending; no cadence is added'],
  },
};
const MODULATION_NAMES = {
  ja: { none: '主調にとどまる', tonicize: '一時的転調／副属和音', pivot: '共通和音による転調', direct: '直接転調', relative: '平行調への転調', parallel: '同主調への転調', mixture: '同主調の和音の借用', sequence: '反復進行による転調' },
  en: { none: 'Stay in the home key', tonicize: 'Tonicization / secondary dominants', pivot: 'Pivot-chord modulation', direct: 'Direct modulation', relative: 'Modulation to the relative key', parallel: 'Modulation to the parallel key', mixture: 'Modal mixture', sequence: 'Sequential modulation' },
};
const RHYTHM_NAMES = {
  ja: {
    quarters: ['均等な 4 拍', '各拍で発音、1 拍目が強く 3 拍目がやや強い'], 'long-third': ['3 拍目を延長', '3 拍目を 4 拍目の前半まで延ばす'], waltz: ['3 拍子', '強 弱 弱'],
    sync: ['シンコペーション', '弱部で発音し強拍を越えて延ばす'], eighths: ['均等な 8 分音符'], backbeat: ['バックビート'], offbeat: ['裏拍の発音'], dotted: ['付点リズム'],
    sixteenth: ['16 分のグルーヴ', '1 マス = 16 分音符'], six: ['複合 2 拍子'], 'six-sparse': ['6/8 疎密の交替'], nine: ['複合 3 拍子'], twelve: ['複合 4 拍子'],
    two: ['行進曲'], 'three-eight': ['速い 3 拍子'], 'five-eight': ['非対称 2 + 3'], hemiola: ['3/4 ヘミオラ', '3 拍子の中に付点 4 分の脈が二つできる'],
    clave32: ['ソン・クラーベ 3-2（2 小節）', '2 小節で一巡'], clave23: ['ソン・クラーベ 2-3（2 小節）', '2 小節で一巡'],
  },
  en: {
    quarters: ['Even quarters', 'An onset on every beat; beat 1 strongest, beat 3 next'], 'long-third': ['Held third beat', 'Beat 3 is held into the first half of beat 4'], waltz: ['Triple meter', 'strong – weak – weak'],
    sync: ['Syncopation', 'Onsets on weak positions held across the strong beat'], eighths: ['Even eighths'], backbeat: ['Backbeat'], offbeat: ['Offbeat onsets'], dotted: ['Dotted rhythm'],
    sixteenth: ['Sixteenth groove', 'each cell is a sixteenth note'], six: ['Compound duple'], 'six-sparse': ['6/8 sparse–dense'], nine: ['Compound triple'], twelve: ['Compound quadruple'],
    two: ['March'], 'three-eight': ['Fast triple'], 'five-eight': ['Asymmetric 2 + 3'], hemiola: ['3/4 hemiola', 'Two dotted-quarter pulses inside triple meter'],
    clave32: ['Son clave 3-2 (two bars)', 'one cycle every two bars'], clave23: ['Son clave 2-3 (two bars)', 'one cycle every two bars'],
  },
};

export const formName = (id, fallback, lang) => FORM_NAMES[lang]?.[id] ?? fallback;
export const cadenceName = (id, fallback, lang) => CADENCE_NAMES[lang]?.[id] ?? fallback;
export const modulationName = (id, fallback, lang) => MODULATION_NAMES[lang]?.[id] ?? fallback;
export const rhythmName = (pattern, lang) => RHYTHM_NAMES[lang]?.[pattern.id]?.[0] ?? pattern.name;
export const rhythmDescription = (pattern, lang) => RHYTHM_NAMES[lang]?.[pattern.id]?.[1] ?? pattern.description;

/** 生成的和弦标注、转调说明与警告（composition.js 中的中文短语） */
const PHRASES = {
  ja: [
    [/^借用同主音小调 iv$/, '同主短調から借用した iv'], [/^共同和弦 (\S+) (\S+) = (\S+) (\S+)$/, '共通和音 $1 $2 = $3 $4'],
    [/^属低音上的终止四六$/, '属音バス上の終止の四六'], [/^(.+) 的弗里几亚半终止只用于小调 已改为半终止$/, '$1：フリギア半終止は短調専用のため半終止に変更しました'],
    [/^下行五度和声模进$/, '五度下行の反復進行'], [/^副属和弦 离调到 V$/, 'V への副属和音（一時的転調）'], [/^保持调性$/, '調はそのまま'],
    [/^新调属和弦$/, '新しい調の属和音'], [/^新调主和弦确认$/, '新しい調の主和音で確定'], [/^(.+ )?无共同三和弦 改用直接转调$/, '$1共通三和音がないため直接転調に変更'],
    [/^皮卡迪三度 小调结束在大三主和弦$/, 'ピカルディの 3 度：短調を長三和音で閉じる'], [/^借自同主音小调$/, '同主短調から借用'], [/^那不勒斯六和弦$/, 'ナポリの六の和音'], [/^(.+) 的皮卡迪三度只用于小调 已改为完满正格终止$/, '$1：ピカルディの 3 度は短調専用のため完全全終止に変更しました'],
    [/^使用来自套路和弦进行速查的进行$/, '定番進行の早見表から取り込んだ進行'],
    [/^新调五度模进$/, '新しい調での五度進行'], [/^通过五度模进确认新调$/, '五度進行で新しい調を確定'], [/^直接回到主调 再现主要材料$/, '直接主調に戻り主要素材を再現'],
  ],
  en: [
    [/^借用同主音小调 iv$/, 'iv borrowed from the parallel minor'], [/^共同和弦 (\S+) (\S+) = (\S+) (\S+)$/, 'Pivot chord $1 $2 = $3 $4'],
    [/^属低音上的终止四六$/, 'Cadential 6/4 over the dominant bass'], [/^(.+) 的弗里几亚半终止只用于小调 已改为半终止$/, '$1: the Phrygian half cadence is for minor keys only — changed to a half cadence'],
    [/^下行五度和声模进$/, 'Descending-fifths sequence'], [/^副属和弦 离调到 V$/, 'Secondary dominant tonicizing V'], [/^保持调性$/, 'Key unchanged'],
    [/^新调属和弦$/, 'Dominant of the new key'], [/^新调主和弦确认$/, 'New tonic confirmed'], [/^(.+ )?无共同三和弦 改用直接转调$/, '$1No common triad — direct modulation used instead'],
    [/^皮卡迪三度 小调结束在大三主和弦$/, 'Picardy third: minor ends on a major tonic'], [/^借自同主音小调$/, 'borrowed from the parallel minor'], [/^那不勒斯六和弦$/, 'Neapolitan sixth'], [/^(.+) 的皮卡迪三度只用于小调 已改为完满正格终止$/, '$1: the Picardy third is for minor keys only — changed to a perfect authentic cadence'],
    [/^使用来自套路和弦进行速查的进行$/, 'Progression imported from the progression library'],
    [/^新调五度模进$/, 'Fifths sequence in the new key'], [/^通过五度模进确认新调$/, 'New key confirmed by a fifths sequence'], [/^直接回到主调 再现主要材料$/, 'Straight back to the home key; main material returns'],
  ],
};
export function translatePhrase(text, lang) {
  if (lang === 'zh' || !text) return text;
  const modulationId = Object.keys(MODULATIONS).find((id) => MODULATIONS[id] === text);
  if (modulationId) return modulationName(modulationId, text, lang);
  for (const [pattern, replacement] of PHRASES[lang] || []) if (pattern.test(text)) return text.replace(pattern, replacement);
  return text;
}

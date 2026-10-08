// 五线谱工具：一个小小的记谱编辑器 + 读谱学习
//  · 大谱表（默认）或单行的四种谱号；调号、拍号、速度（BPM）
//  · 全 / 二分 / 四分 / 八分 / 十六分音符、附点、休止符、连音线、和弦（同一时值叠几个音）、临时记号（含重升重降）、音分偏移
//  · 超出小节的时值自动拆开并用连音线连起来；八分、十六分按拍连符杠；临时记号作用到小节结束
//  · 播放（带光标）、撤销、删除、导出 MIDI；同一个音在四种谱号里；口诀；读谱练习
// 规则与出处见 staff_reading.js：ref:omt2e-notation ref:omt2e-clefs ref:wiki-clef ref:omt2e-keyboard ref:omt2e-aspn
//   ref:omt2e-major-scales ref:omt2e-minor ref:wiki-key-signature ref:wiki-accidental ref:omt2e-rhythm ref:omt2e-simple-meter ref:omt2e-compound-meter ref:wiki-cent
import {
  CLEFS, CLEF_ORDER, MNEMONICS, positionToPitch, pitchToPosition, describePosition, lineLetters, spaceLetters, pitchMidi, pitchLabel, LETTERS,
  keySignatureLayout, KEY_NAMES, durationBeats, measureBeats, beamGroupBeats, layoutMeasures, resolveMeasure, spellInKey, centsFrequency, keyAlterations, decompose,
} from './staff_reading.js';
import { checkSATB, groupFourPart } from './satb_check.js?v=20261004-r32';
import { issueList, drawIssueMarks, RULES as SATB_RULES, PART_NAMES as SATB_PARTS } from './satb_marks.js?v=20261003-r31';
import { recordToolMistake, tri } from './tool_review.js';
import {
  GAP, svgNode, positionY, drawLines, drawClef, drawBrace, drawChordEvent, drawRest, drawBeams, drawTie, drawKeySignature, drawTimeSignature,
} from './staff_diagram.js?v=20261002-r19';
import { renderVisual } from './learn_visuals.js?v=20261008-beginner2';
import { playFeedbackSound } from './learn_sfx.js?v=20261009-audio1';
import { el, button, language, midiToFrequency, sourcesFooter, cite, relatedLinks, midiExportButton } from './module_kit.js';
import { scoreToMusicXML } from './staff_musicxml.js?v=20261003-x1';
import { musicXMLToScore, unzipMusicXML, transposeScore, copyMeasures, pasteMeasures, deleteMeasures, measureCount, INTERVALS } from './staff_edit.js?v=20261004-w6';

const SATB_SOURCES = ['omt2e-roman-numerals', 'omt-species1', 'omt2e-v7', 'omt2e-pd7'];
const SOURCES = ['omt2e-notation', 'omt2e-clefs', 'wiki-clef', 'omt2e-keyboard', 'omt2e-aspn', 'omt2e-major-scales', 'wiki-key-signature', 'wiki-accidental', 'omt2e-rhythm', 'omt2e-simple-meter', 'omt2e-compound-meter', 'wiki-cent'];
const STORE_KEY = 'jc-staff-score';
const METERS = [[2, 4], [3, 4], [4, 4], [5, 4], [3, 8], [6, 8], [8, 8], [9, 8], [12, 8], [16, 16]];
const SYSTEM_WIDTH = 760;
const SLOT = { w: 46, h: 38, q: 32, e: 27, s: 23 };

const TEXT = {
  zh: {
    satbTitle: '四部和声检查', satbHint: '在大谱表上写四部和声：每个和弦 4 个音同时开始，上下两行怎么分都可以（常见的是上行女中、女高，下行男低、男高）。检查平行五八度、声部交叉、间距、超越、音域、导音与七音的解决，并在谱上标出来。', satbNeedGrand: '先把谱表切换成大谱表。', satbKey: '按哪个调检查', satbMajor: '大调', satbMinor: '小调', satbRun: '检查', satbSolo: '单独试听', satbParts: ['男低', '男高', '女中', '女高'], satbAll: '四部一起', satbEmpty: '还没有找到 4 个音同时开始的和弦。', satbCount: (w, c) => `${w}：同时有 ${c} 个音（四部和声要 4 个），这一拍没有检查。`, satbBeat: (m, b) => `第 ${m} 小节第 ${b} 拍`, satbFigures: (f) => `转位（数字低音）：${f}`, satbSaved: (n) => `其中 ${n} 个问题已放进学习页的错题本。`,
    kicker: '读谱与记谱', title: '五线谱',
    intro: '在谱表上点线或间写音，或者按下面的琴键。选好时值再写；打开"和弦"后，再点的音会叠到选中的那个音符上。写满一小节会自动加小节线，写不下的部分会拆开并用连音线连起来。',
    clefs: { treble: '高音谱号', bass: '低音谱号', alto: '中音谱号', tenor: '次中音谱号', grand: '大谱表' },
    groupWhole: '整谱', importXml: '导入 MusicXML', importHint: '能读 .musicxml、.xml 和压缩的 .mxl（MuseScore、Sibelius、Dorico 都能导出）。钢琴谱读第一个声部的两行谱表，合唱等多声部谱读前两个声部；每行谱表只取第一声部。',
    importDone: (w) => `已导入。${w.voices ? `跳过了 ${w.voices} 处其他声部的音；` : ''}${w.grace ? `跳过 ${w.grace} 个倚音；` : ''}${w.quantized ? `${w.quantized} 处时值（连音符等）对齐到十六分音符；` : ''}${w.meter ? '拍号换成了小节长度相同的拍号；' : ''}${w.truncated ? '只读了前 200 小节；' : ''}`.replace(/；$/, '。'),
    importFail: '读不了这个文件：它不是 MusicXML（score-partwise），或者是这个浏览器解不开的压缩包（可以在打谱软件里导出未压缩的 .musicxml）。',
    transpose: '整谱移调', up: '上移', down: '下移', intervals: { m2: '小二度', M2: '大二度', m3: '小三度', M3: '大三度', P4: '纯四度', P5: '纯五度', m6: '小六度', M6: '大六度', m7: '小七度', M7: '大七度', P8: '纯八度' },
    transposeHint: '调号一起改；音名按音程的字母级数走（C→D 是大二度，E→F♯ 也是），超过 6 个升降号时换成等音调。',
    measures: '小节', measureFrom: '从第', measureTo: '到第', copy: '复制', pasteBefore: '插在起始小节前', pasteEnd: '粘贴到末尾', deleteMeasures: '删除这些小节',
    copied: (a, b) => `已复制第 ${a}${b > a ? `–${b}` : ''} 小节。`, pasteMeter: '剪贴板里的小节拍号不同，不能粘贴。', nothingCopied: '还没有复制小节。',
    midiInput: 'MIDI 键盘：在页面顶部连接 MIDI 后直接弹就能写音，同时按住的几个键会写成一个和弦；屏幕下方的琴键也能点（手机上可以左右滑动）。',
    exportXml: '导出 MusicXML', print: '打印 / 存为 PDF', groupScore: '谱面设置', groupInput: '输入', groupPitch: '音高', hintTitle: '快捷键与说明',
    toClassical: '去古典和声连接', toChord: '去和弦转换', appended: (x) => `已接在谱的最后：${x}`, clef: '谱表', key: '调号', meter: '拍号', bpm: '速度 ♩ =', keyName: (n, [major, minor]) => `${major} 大调 / ${minor} 小调${n ? `（${Math.abs(n)} 个${n > 0 ? '升' : '降'}号）` : ''}`,
    duration: '时值', durations: { w: '全音符', h: '二分音符', q: '四分音符', e: '八分音符', s: '十六分音符' }, dot: '附点', rest: '休止符', tie: '连音线', chord: '和弦',
    accidental: '临时记号', accAuto: '按调号', accNames: { '-2': '重降', '-1': '降', 0: '还原', 1: '升', 2: '重升' },
    cents: '音分偏移', centsHint: '给接下来写的音加上音分偏移（一个八度 1200 音分；±50 就是四分之一音），谱上会在符头旁标出。',
    restOn: '休止符写在', upper: '上谱表', lower: '下谱表',
    play: '► 播放', undo: '撤销', remove: '删除选中', clear: '清空', names: '在线和间旁标出音名',
    hint: '快捷键：1–5 选时值，. 附点，R 休止符，T 连音线，C 和弦，P 播放，Delete 删除，Ctrl+Z 撤销。点谱上的音符可以选中它，再改时值、附点或连音线。长按谱上的某个音、或亮着的琴键，可以把这个音从和弦里取消。大谱表上同一拍的上下两行算一个和弦：一起选中、一起改时值、一起删除；和弦模式下加的音会按音高自动放进上行或下行的同一拍。', removedNote: (n) => `已取消 ${n}`, cantAlign: '另一行这一拍在一个长音的中间，没法合成同一个和弦，已写在那一行的末尾。',
    empty: '还没有写音——点谱表或琴键试试。',
    selected: '选中', restLabel: '休止', tied: '连到下一个音',
    position: (d) => (d.number ? `第 ${d.number} ${d.onLine ? '线' : '间'}` : d.below ? (d.onLine ? `下方第 ${d.ledgers} 条加线上` : d.ledgers ? `下方第 ${d.ledgers} 条加线的下面` : '第一线下面的间') : (d.onLine ? `上方第 ${d.ledgers} 条加线上` : d.ledgers ? `上方第 ${d.ledgers} 条加线的上面` : '第五线上面的间')),
    middleC: '中央 C', frequency: (hz) => `约 ${hz} Hz`, midiNote: 'MIDI 文件里不含音分偏移。',
    sameTitle: '同一个音，四种谱号', sameHint: '同一个音高，在不同谱号里落在不同的线或间上（取选中的音，没有就用中央 C）。',
    lines: '线（从下往上）', spaces: '间（从下往上）', mnemonic: '口诀（OMT 原文）',
    factsTitle: '记谱规则',
    facts: [
      ['五线谱有五条等距的横线，每个音写在与它音高对应的线或间上；写不下的音用短短的加线往上或往下延伸。', 'omt2e-notation'],
      ['高音谱号绕着第二线 G（G4），低音谱号的点从第四线 F（F3）开始；中音谱号的中心对准第三线、次中音谱号对准第四线，两者标的都是中央 C。中音谱号主要用于中提琴，次中音谱号有时用于大提琴、大管和长号。', 'omt2e-clefs', 'wiki-clef'],
      ['钢琴用大谱表：高音谱表在上、低音谱表在下，左边用竖线和花括号连起来；两行之间那条加线上的音就是中央 C（C4）。', 'omt2e-keyboard', 'omt2e-aspn'],
      ['调号写在谱号之后、拍号之前，对所有八度都有效。升号顺序是 F C G D A E B，降号相反。升号调的最后一个升号比主音低半音；降号调的倒数第二个降号就是主音。', 'omt2e-major-scales', 'wiki-key-signature'],
      ['临时记号写在音符左边，作用到这一小节结束；过了小节线就失效，除非是用连音线连过去的音。', 'omt2e-rhythm', 'wiki-accidental'],
      ['附点让时值增加一半；连音线把同音高的音连起来，后一个不再重新奏出（休止符不用连音线）。全休止符挂在线下，二分休止符坐在线上。', 'omt2e-rhythm'],
      ['单拍子每拍分成两份，复拍子（如 6/8）每拍分成三份、一拍是附点四分音符。', 'omt2e-simple-meter', 'omt2e-compound-meter'],
      ['音分：一个八度 1200 音分，十二平均律的半音是 100 音分；频率乘以 2 的（音分 ÷ 1200）次方。', 'wiki-cent'],
    ],
    quizTitle: '读谱练习', quizHint: '看谱表上的音，点它的音名。', quizStart: '开始练习', quizNext: '下一题', right: '对了！', wrong: (name) => `是 ${name}`,
    streak: (n, best) => `连对 ${n} 题 · 最好 ${best}`, quizClef: '练习用的谱号', ledger: '包含加线',
  },
  ja: {
    satbTitle: '4 声体チェック', satbHint: '大譜表に 4 声体を書きます。各和音は 4 音が同時に始まり、上下 2 段への分け方は自由（よくあるのはト音譜表にアルトとソプラノ、ヘ音譜表にバスとテノール）。連続 5・8 度、交差、間隔、超越、音域、導音と第 7 音の解決を調べ、譜面に印を付けます。', satbNeedGrand: 'まず大譜表に切り替えてください。', satbKey: '調', satbMajor: '長調', satbMinor: '短調', satbRun: 'チェック', satbSolo: '声部ごとに試聴', satbParts: ['バス', 'テノール', 'アルト', 'ソプラノ'], satbAll: '4 声いっしょに', satbEmpty: '4 音が同時に始まる和音がまだ見つかりません。', satbCount: (w, c) => `${w}：同時に ${c} 音（4 声体は 4 音）。この拍はチェックしていません。`, satbBeat: (m, b) => `${m} 小節目 ${b} 拍目`, satbFigures: (f) => `転回（数字）：${f}`, satbSaved: (n) => `うち ${n} 件を学習ページの復習ノートに入れました。`,
    kicker: '読譜と記譜', title: '五線譜',
    intro: '譜表の線や間をクリックするか、下の鍵盤を押して音を書きます。先に音価を選び、「和音」をオンにすると、選んだ音符に音を重ねられます。1 小節が埋まると小節線が入り、収まらない分は分けてタイでつなぎます。',
    clefs: { treble: 'ト音記号', bass: 'ヘ音記号', alto: 'アルト記号', tenor: 'テノール記号', grand: '大譜表' },
    groupWhole: '譜面全体', importXml: 'MusicXML 読み込み', importHint: '.musicxml・.xml・圧縮された .mxl を読めます（MuseScore・Sibelius・Dorico で書き出せます）。ピアノ譜は最初のパートの 2 段、合唱などは最初の 2 パートを読み、各段の第 1 声部だけを取ります。',
    importDone: (w) => `読み込みました。${w.voices ? `他の声部の音 ${w.voices} か所を省略、` : ''}${w.grace ? `装飾音 ${w.grace} 個を省略、` : ''}${w.quantized ? `連符など ${w.quantized} か所を 16 分音符にそろえました、` : ''}${w.meter ? '拍子を同じ小節の長さのものに置き換えました、' : ''}${w.truncated ? '最初の 200 小節だけ読みました、' : ''}`.replace(/、$/, '。'),
    importFail: 'このファイルは読めません。MusicXML（score-partwise）ではないか、このブラウザーで展開できない圧縮ファイルです（浄書ソフトで非圧縮の .musicxml を書き出してください）。',
    transpose: '移調', up: '上へ', down: '下へ', intervals: { m2: '短 2 度', M2: '長 2 度', m3: '短 3 度', M3: '長 3 度', P4: '完全 4 度', P5: '完全 5 度', m6: '短 6 度', M6: '長 6 度', m7: '短 7 度', M7: '長 7 度', P8: '完全 8 度' },
    transposeHint: '調号も変わります。音名は音程の文字の度数どおりに動き（C→D も E→F♯ も長 2 度）、調号が 6 個を超えるときは異名同音の調にします。',
    measures: '小節', measureFrom: '第', measureTo: '〜第', copy: 'コピー', pasteBefore: '最初の小節の前に挿入', pasteEnd: '末尾に貼り付け', deleteMeasures: 'この小節を削除',
    copied: (a, b) => `第 ${a}${b > a ? `〜${b}` : ''} 小節をコピーしました。`, pasteMeter: 'コピーした小節は拍子が違うので貼り付けられません。', nothingCopied: 'まだ小節をコピーしていません。',
    midiInput: 'MIDI キーボード：ページ上部で MIDI をつなぐと、弾いた音がそのまま書かれます。同時に押さえた鍵は和音になります。画面下の鍵盤もタップできます（スマホでは左右にスクロール）。',
    exportXml: 'MusicXML 書き出し', print: '印刷 / PDF 保存', groupScore: '譜面の設定', groupInput: '入力', groupPitch: '音の高さ', hintTitle: 'ショートカットと説明',
    toClassical: '古典和声の連結へ', toChord: '和音の変換へ', appended: (x) => `譜の最後に追加：${x}`, clef: '譜表', key: '調号', meter: '拍子記号', bpm: 'テンポ ♩ =', keyName: (n, [major, minor]) => `${major} 長調 / ${minor} 短調${n ? `（${n > 0 ? '♯' : '♭'} ${Math.abs(n)} 個）` : ''}`,
    duration: '音価', durations: { w: '全音符', h: '2 分音符', q: '4 分音符', e: '8 分音符', s: '16 分音符' }, dot: '付点', rest: '休符', tie: 'タイ', chord: '和音',
    accidental: '臨時記号', accAuto: '調号どおり', accNames: { '-2': 'ダブルフラット', '-1': 'フラット', 0: 'ナチュラル', 1: 'シャープ', 2: 'ダブルシャープ' },
    cents: 'セント', centsHint: 'これから書く音にセントのずれを加えます（1 オクターヴ = 1200 セント、±50 で 4 分音）。符頭の横に表示されます。',
    restOn: '休符を書く段', upper: '上段', lower: '下段',
    play: '► 再生', undo: '元に戻す', remove: '選択を削除', clear: 'クリア', names: '線と間の横に音名を表示',
    hint: 'ショートカット：1–5 音価、. 付点、R 休符、T タイ、C 和音、P 再生、Delete 削除、Ctrl+Z 元に戻す。譜面の音符をクリックすると選択でき、音価・付点・タイを変えられます。譜面の音や光っている鍵盤を長押しすると、その音を和音から取り消せます。大譜表では同じ拍の上下 2 段を 1 つの和音として扱い、いっしょに選択・音価変更・削除します。和音モードで加えた音は音高に応じて上段か下段の同じ拍に入ります。', removedNote: (n) => `${n} を取り消しました`, cantAlign: 'もう一方の段のこの拍は長い音の途中なので、同じ和音にできません。その段の末尾に書きました。',
    empty: 'まだ音がありません。譜表か鍵盤をクリックしてみましょう。',
    selected: '選択中', restLabel: '休符', tied: '次の音へタイ',
    position: (d) => (d.number ? `第 ${d.number} ${d.onLine ? '線' : '間'}` : d.below ? (d.onLine ? `下の第 ${d.ledgers} 加線上` : d.ledgers ? `下の第 ${d.ledgers} 加線の下` : '第 1 線の下の間') : (d.onLine ? `上の第 ${d.ledgers} 加線上` : d.ledgers ? `上の第 ${d.ledgers} 加線の上` : '第 5 線の上の間')),
    middleC: '中央の C', frequency: (hz) => `約 ${hz} Hz`, midiNote: 'MIDI ファイルにはセントのずれは含まれません。',
    sameTitle: '同じ音を 4 つの音部記号で', sameHint: '同じ音高でも、音部記号によって違う線・間に置かれます（選択中の音、なければ中央の C）。',
    lines: '線（下から）', spaces: '間（下から）', mnemonic: '覚え方（OMT 原文）',
    factsTitle: '記譜のきまり',
    facts: [
      ['五線譜は等間隔の 5 本の横線で、各音はその高さに対応する線か間に書きます。収まらない音は短い加線で上下に延ばします。', 'omt2e-notation'],
      ['ト音記号は第 2 線の G（G4）に巻きつき、ヘ音記号の点は第 4 線の F（F3）から始まります。アルト記号は第 3 線、テノール記号は第 4 線を中心にし、どちらも中央の C を示します。アルト記号は主にヴィオラ、テノール記号はチェロ・ファゴット・トロンボーンで使われることがあります。', 'omt2e-clefs', 'wiki-clef'],
      ['ピアノは大譜表：ト音譜表が上、ヘ音譜表が下で、左端を縦線と括弧でつなぎます。2 段の間の加線上の音が中央の C（C4）です。', 'omt2e-keyboard', 'omt2e-aspn'],
      ['調号は音部記号の後、拍子記号の前に書き、すべてのオクターヴに効きます。シャープの順は F C G D A E B、フラットはその逆。シャープ系では最後のシャープが主音の半音下、フラット系では最後から 2 番目のフラットが主音です。', 'omt2e-major-scales', 'wiki-key-signature'],
      ['臨時記号は音符の左に書き、その小節の終わりまで有効です。小節線を越えると消えますが、タイでつながった音には続きます。', 'omt2e-rhythm', 'wiki-accidental'],
      ['付点は長さを半分足します。タイは同じ高さの音をつなぎ、後ろの音は弾き直しません（休符にはタイを使いません）。全休符は線から下がり、2 分休符は線の上に乗ります。', 'omt2e-rhythm'],
      ['単純拍子は 1 拍を 2 つに、複合拍子（6/8 など）は 1 拍を 3 つに分け、1 拍は付点 4 分音符です。', 'omt2e-simple-meter', 'omt2e-compound-meter'],
      ['セント：1 オクターヴ = 1200 セント、12 平均律の半音 = 100 セント。周波数に 2 の（セント ÷ 1200）乗を掛けます。', 'wiki-cent'],
    ],
    quizTitle: '読譜練習', quizHint: '譜表の音を見て、その音名をクリック。', quizStart: '練習を始める', quizNext: '次へ', right: '正解！', wrong: (name) => `正解は ${name}`,
    streak: (n, best) => `連続 ${n} 問 · 最高 ${best}`, quizClef: '練習する音部記号', ledger: '加線も出す',
  },
  en: {
    satbTitle: 'Four-part checker', satbHint: 'Write four-part harmony on the grand staff: each chord is 4 notes starting together, split between the staves any way you like (usually alto and soprano on the treble staff, bass and tenor on the bass staff). Checks parallel fifths and octaves, crossing, spacing, overlap, range and the resolution of leading tones and sevenths, and marks problems on the staff.', satbNeedGrand: 'Switch to the grand staff first.', satbKey: 'Key', satbMajor: 'major', satbMinor: 'minor', satbRun: 'Check', satbSolo: 'Hear one voice', satbParts: ['bass', 'tenor', 'alto', 'soprano'], satbAll: 'All four', satbEmpty: 'No chords with 4 notes starting together yet.', satbCount: (w, c) => `${w}: ${c} notes start together (four-part harmony needs 4); not checked.`, satbBeat: (m, b) => `bar ${m}, beat ${b}`, satbFigures: (f) => `Inversions (figures): ${f}`, satbSaved: (n) => `${n} of these went into the review box on the Learn page.`,
    kicker: 'Reading & writing', title: 'Staff',
    intro: 'Click a line or space (or a key below) to write a note. Pick a duration first; with “Chord” on, the next notes stack onto the selected note. Barlines appear as bars fill up, and anything that does not fit is split and tied.',
    clefs: { treble: 'Treble clef', bass: 'Bass clef', alto: 'Alto clef', tenor: 'Tenor clef', grand: 'Grand staff' },
    groupWhole: 'Whole score', importXml: 'Import MusicXML', importHint: 'Reads .musicxml, .xml and compressed .mxl (MuseScore, Sibelius and Dorico can export these). A piano score uses the two staves of the first part; choir and other multi-part scores use the first two parts. Only the first voice on each staff is read.',
    importDone: (w) => `Imported. ${w.voices ? `Skipped ${w.voices} notes from other voices; ` : ''}${w.grace ? `skipped ${w.grace} grace notes; ` : ''}${w.quantized ? `${w.quantized} durations (tuplets etc.) snapped to sixteenths; ` : ''}${w.meter ? 'the meter was replaced by one with the same bar length; ' : ''}${w.truncated ? 'only the first 200 bars were read; ' : ''}`.trim().replace(/;$/, '.'),
    importFail: 'Cannot read this file: it is not MusicXML (score-partwise), or it is a compressed file this browser cannot unpack (export an uncompressed .musicxml from your notation program).',
    transpose: 'Transpose', up: 'Up', down: 'Down', intervals: { m2: 'minor 2nd', M2: 'major 2nd', m3: 'minor 3rd', M3: 'major 3rd', P4: 'perfect 4th', P5: 'perfect 5th', m6: 'minor 6th', M6: 'major 6th', m7: 'minor 7th', M7: 'major 7th', P8: 'octave' },
    transposeHint: 'The key signature changes too. Letters move by the interval\'s number (C→D and E→F♯ are both major 2nds); keys past six sharps or flats switch to the enharmonic key.',
    measures: 'Bars', measureFrom: 'from', measureTo: 'to', copy: 'Copy', pasteBefore: 'Insert before the first bar', pasteEnd: 'Paste at the end', deleteMeasures: 'Delete these bars',
    copied: (a, b) => `Copied bar${b > a ? `s ${a}–${b}` : ` ${a}`}.`, pasteMeter: 'The copied bars are in a different meter and cannot be pasted.', nothingCopied: 'No bars copied yet.',
    midiInput: 'MIDI keyboard: connect MIDI at the top of the page and play to write notes; keys held together become a chord. The on-screen keys work too (swipe sideways on a phone).',
    exportXml: 'Export MusicXML', print: 'Print / save PDF', groupScore: 'Score settings', groupInput: 'Input', groupPitch: 'Pitch', hintTitle: 'Shortcuts & notes',
    toClassical: 'Classical harmony connection', toChord: 'Chord conversion', appended: (x) => `Added at the end: ${x}`, clef: 'Staff', key: 'Key signature', meter: 'Time signature', bpm: 'Tempo ♩ =', keyName: (n, [major, minor]) => `${major} major / ${minor} minor${n ? ` (${Math.abs(n)} ${n > 0 ? 'sharp' : 'flat'}${Math.abs(n) > 1 ? 's' : ''})` : ''}`,
    duration: 'Duration', durations: { w: 'Whole', h: 'Half', q: 'Quarter', e: 'Eighth', s: 'Sixteenth' }, dot: 'Dot', rest: 'Rest', tie: 'Tie', chord: 'Chord',
    accidental: 'Accidental', accAuto: 'Follow key', accNames: { '-2': 'Double flat', '-1': 'Flat', 0: 'Natural', 1: 'Sharp', 2: 'Double sharp' },
    cents: 'Cents', centsHint: 'Offset the next notes by some cents (1200 cents to the octave; ±50 is a quarter tone). The offset is printed beside the notehead.',
    restOn: 'Rests go on', upper: 'Upper staff', lower: 'Lower staff',
    play: '► Play', undo: 'Undo', remove: 'Delete selected', clear: 'Clear', names: 'Show note names beside lines and spaces',
    hint: 'Shortcuts: 1–5 durations, . dot, R rest, T tie, C chord, P play, Delete delete, Ctrl+Z undo. Click a note on the staff to select it and change its duration, dot or tie. Long-press a note on the staff, or a lit key, to remove that note from the chord. On the grand staff both staves at the same beat count as one chord: selected, re-timed and deleted together; in chord mode a new note goes to the upper or lower staff at that beat by pitch.', removedNote: (n) => `Removed ${n}`, cantAlign: 'That beat falls in the middle of a long note on the other staff, so it cannot join this chord; the note went to the end of that staff.',
    empty: 'No notes yet — click the staff or a key.',
    selected: 'Selected', restLabel: 'rest', tied: 'tied to the next note',
    position: (d) => (d.number ? `${d.onLine ? 'line' : 'space'} ${d.number}` : d.below ? (d.onLine ? `ledger line ${d.ledgers} below` : d.ledgers ? `under ledger line ${d.ledgers} below` : 'the space below line 1') : (d.onLine ? `ledger line ${d.ledgers} above` : d.ledgers ? `over ledger line ${d.ledgers} above` : 'the space above line 5')),
    middleC: 'middle C', frequency: (hz) => `about ${hz} Hz`, midiNote: 'MIDI files do not carry the cent offsets.',
    sameTitle: 'One note, four clefs', sameHint: 'The same pitch sits on a different line or space in each clef (the selected note, or middle C).',
    lines: 'Lines (bottom up)', spaces: 'Spaces (bottom up)', mnemonic: 'Mnemonic (as given by OMT)',
    factsTitle: 'Notation rules',
    facts: [
      ['A staff is five evenly spaced lines; each note goes on the line or space for its pitch, and notes that do not fit get short ledger lines above or below.', 'omt2e-notation'],
      ['The treble clef wraps around the G line (G4), the bass clef’s dot starts on the F line (F3); the alto and tenor clefs centre on the third and fourth lines, both marking middle C. The alto clef is mainly for viola; the tenor clef is sometimes used for cello, bassoon and trombone.', 'omt2e-clefs', 'wiki-clef'],
      ['Piano music uses the grand staff: treble above, bass below, joined by a line and a brace. The note on the ledger line between them is middle C (C4).', 'omt2e-keyboard', 'omt2e-aspn'],
      ['The key signature comes after the clef and before the time signature, and applies in every octave. Sharps go F C G D A E B, flats the reverse. In sharp keys the last sharp is a half step below the tonic; in flat keys the second-to-last flat is the tonic.', 'omt2e-major-scales', 'wiki-key-signature'],
      ['Accidentals go to the left of the note and last until the end of the bar; a barline cancels them, except for a note tied across it.', 'omt2e-rhythm', 'wiki-accidental'],
      ['A dot adds half the value; a tie joins notes of the same pitch and the second is not re-struck (rests are never tied). A whole rest hangs from a line, a half rest sits on one.', 'omt2e-rhythm'],
      ['Simple meters divide the beat in two; compound meters (such as 6/8) divide it in three, the beat being a dotted quarter.', 'omt2e-simple-meter', 'omt2e-compound-meter'],
      ['Cents: 1200 to the octave, 100 to an equal-tempered semitone; multiply the frequency by 2^(cents / 1200).', 'wiki-cent'],
    ],
    quizTitle: 'Reading drill', quizHint: 'Look at the note and click its letter name.', quizStart: 'Start', quizNext: 'Next', right: 'Correct!', wrong: (name) => `It was ${name}`,
    streak: (n, best) => `Streak ${n} · best ${best}`, quizClef: 'Clef to practise', ledger: 'Include ledger lines',
  },
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const samePitch = (a, b) => a.letter === b.letter && a.octave === b.octave;

export function mountStaffReading(target, { playChord }) {
  const lang = language();
  const t = TEXT[lang];
  const playPitch = (midi, cents = 0, length = 0.9) => playChord([centsFrequency(midi, cents)], length);
  const state = {
    clef: 'grand', key: 0, meter: [4, 4], bpm: 90,
    duration: 'q', dots: 0, accidental: null, cents: 0, chord: false, restStaff: 0,
    voices: [[], []], selected: null, picked: false, names: false, settingsOpen: true,
    quizClef: 'treble', quizLedger: false, quiz: null, streak: 0, best: 0,
    interval: 'M2', range: [1, 1], clip: null, status: '',
  };
  const history = [];
  let timers = [];
  try {
    const saved = JSON.parse(globalThis.localStorage?.getItem(STORE_KEY) || 'null');
    if (saved?.voices) Object.assign(state, { clef: saved.clef || 'grand', key: saved.key || 0, meter: saved.meter || [4, 4], bpm: saved.bpm || 90, voices: saved.voices });
  } catch (_) { /* ignore */ }
  const save = () => { try { globalThis.localStorage?.setItem(STORE_KEY, JSON.stringify({ clef: state.clef, key: state.key, meter: state.meter, bpm: state.bpm, voices: state.voices })); } catch (_) { /* ignore */ } };
  const clefList = () => (state.clef === 'grand' ? ['treble', 'bass'] : [state.clef]);
  const snapshot = () => { history.push(clone({ voices: state.voices, selected: state.selected, key: state.key, meter: state.meter, clef: state.clef })); if (history.length > 80) history.shift(); state.satbResult = null; };
  const selectedEvent = () => (state.selected ? state.voices[state.selected.voice]?.[state.selected.index] : null);
  /** 只有用鼠标点选过的音符，才会被时值、附点、连音线按钮修改；刚写下的音只是"当前位置"（用来叠和弦） */
  const pickedEvent = () => (state.picked ? selectedEvent() : null);
  // ---------- 大谱表：上下两行同一拍开始的音合成一个和弦一起编辑 ----------
  const lengthOf = (e) => durationBeats(e.duration, e.dots);
  /** 一个事件在自己那一行的起拍（四分音符 = 1） */
  const onsetOf = (voice, index) => state.voices[voice].slice(0, index).reduce((sum, e) => sum + lengthOf(e), 0);
  const voiceLength = (voice) => state.voices[voice].reduce((sum, e) => sum + lengthOf(e), 0);
  /** 这一行里正好在 beat 开始的事件（没有就 -1） */
  function eventAtBeat(voice, beat) {
    let at = 0;
    const list = state.voices[voice];
    for (let i = 0; i < list.length; i += 1) {
      if (Math.abs(at - beat) < 1e-6) return i;
      at += lengthOf(list[i]);
      if (at > beat + 1e-6) return -1;
    }
    return -1;
  }
  /** 和 sel 同一拍开始的另一行事件（只在大谱表上） */
  function partnerOf(sel = state.selected) {
    if (state.clef !== 'grand' || !sel || !state.voices[sel.voice]?.[sel.index]) return null;
    const other = 1 - sel.voice;
    const index = eventAtBeat(other, onsetOf(sel.voice, sel.index));
    return index >= 0 ? { voice: other, index } : null;
  }
  /** 选中的"和弦"：选中的事件 + 另一行同一拍的事件 */
  const selectedGroup = () => [state.selected, partnerOf()].filter(Boolean);
  // ---------- 长按：把一个音从和弦里取消 ----------
  let longPressed = false; // 长按之后紧跟着的那次 click 不再当成点击
  function onLongPress(node, fire, ms = 550) {
    let timer = null; let start = null;
    const cancel = () => { clearTimeout(timer); timer = null; node.classList.remove('is-pressing'); };
    node.addEventListener('pointerdown', (e) => {
      if (e.button > 0) return;
      start = { x: e.clientX, y: e.clientY };
      node.classList.add('is-pressing');
      // 按下的那一刻就记住按在哪里（计时结束时事件对象里的 target 可能已经被清掉）
      const at = { target: e.target, clientX: e.clientX, clientY: e.clientY };
      timer = setTimeout(() => {
        timer = null;
        node.classList.remove('is-pressing');
        longPressed = true;
        setTimeout(() => { longPressed = false; }, 900); // 没有跟着来的 click 时，别吞掉下一次正常点击
        fire(at);
      }, ms);
    });
    node.addEventListener('pointermove', (e) => { if (timer && start && Math.hypot((e.clientX ?? 0) - start.x, (e.clientY ?? 0) - start.y) > 8) cancel(); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => node.addEventListener(type, cancel));
    // 手机上长按会弹出系统菜单：拦掉
    node.addEventListener('contextmenu', (e) => { if (timer || longPressed) e.preventDefault(); });
  }
  const noteName = (n) => `${n.letter}${(n.alter ?? 0) > 0 ? '♯'.repeat(n.alter) : (n.alter ?? 0) < 0 ? '♭'.repeat(-n.alter) : ''}${n.octave}`;
  /** 从 voice / index 的事件里去掉第 k 个音；去光了：另一行同一拍还有音就补成同样时值的休止符（保持两行对齐），否则删掉这个事件 */
  function removeNoteAt(voice, index, k) {
    const event = state.voices[voice]?.[index];
    if (!event || event.rest || !event.notes[k]) return;
    const partner = partnerOf({ voice, index });
    snapshot();
    const [gone] = event.notes.splice(k, 1);
    if (!event.notes.length) {
      const keepAligned = partner && state.voices[partner.voice][partner.index] && !state.voices[partner.voice][partner.index].rest;
      if (keepAligned) {
        state.voices[voice][index] = { rest: true, duration: event.duration, dots: event.dots, tie: false, notes: [] };
        state.selected = partner;
        state.picked = true;
      } else {
        state.voices[voice].splice(index, 1);
        state.selected = partner;
        state.picked = Boolean(partner);
      }
    } else {
      state.selected = { voice, index };
      state.picked = true;
    }
    state.status = t.removedNote(noteName(gone));
    save();
    renderAll();
    if (state.selected) playEventAt(state.selected.voice, state.selected.index);
  }
  /** 长按亮着的琴键：在选中的和弦（两行）里找到这个音高并去掉 */
  function removeMidiFromSelection(midi) {
    for (const sel of selectedGroup()) {
      const event = state.voices[sel.voice]?.[sel.index];
      if (!event || event.rest) continue;
      const k = event.notes.findIndex((n) => pitchMidi(n.letter, n.octave, n.alter ?? keyAlterations(state.key)[n.letter]) === midi || pitchMidi(n.letter, n.octave, n.alter ?? 0) === midi);
      if (k >= 0) { removeNoteAt(sel.voice, sel.index, k); return; }
    }
  }
  const stop = () => { timers.forEach(clearTimeout); timers = []; target.querySelectorAll('.is-playing').forEach((n) => n.classList.remove('is-playing')); };
  target.addEventListener('toolbox-stop', stop);

  target.replaceChildren();
  const root = el('div', 'staff-tool');
  target.appendChild(root);
  const head = el('div', 'mk-head');
  head.append(el('p', 'mk-kicker', t.kicker), el('h3', '', t.title), el('p', 'mk-intro', t.intro));
  root.appendChild(head);

  // ---------------- 控件 ----------------
  /** 时值按钮上的小音符图标 */
  const durationIcon = (duration, rest = false) => {
    const svg = svgNode(null, 'svg', { viewBox: rest ? '-10 -2 24 46' : '-10 -26 26 60', class: 'staff-chip-icon', 'aria-hidden': 'true' });
    if (rest) drawRest(svg, { x: 0, top: 0, duration });
    else drawChordEvent(svg, { x: 0, top: 0, notes: [{ position: 2 }], duration });
    return svg;
  };

  function renderControls() {
    toolbar.replaceChildren();
    settingsBox.replaceChildren();
    const field = (label, control) => { const wrap = el('label', 'staff-field'); wrap.append(el('span', 'staff-field-label', label), control); return wrap; };
    const selectBox = (options, value, onChange) => {
      const input = el('select');
      options.forEach(([v, text]) => { const o = el('option', '', text); o.value = String(v); if (String(v) === String(value)) o.selected = true; input.appendChild(o); });
      input.addEventListener('change', () => onChange(input.value));
      return input;
    };
    /** 分段按钮：一排连在一起的选项 */
    const segmented = (items, isActive, onPick, extra = '', label = '') => {
      const row = el('div', `staff-seg ${extra}`);
      if (label) row.setAttribute('aria-label', label);
      items.forEach((item) => {
        const b = button(`staff-seg-btn${isActive(item.value) ? ' active' : ''}`, '', () => { onPick(item.value); renderControls(); });
        if (item.icon) b.appendChild(item.icon);
        if (item.text) b.appendChild(el('span', '', item.text));
        b.title = item.title || item.text || '';
        b.dataset.value = String(item.value);
        b.setAttribute('aria-pressed', String(isActive(item.value)));
        row.appendChild(b);
      });
      return row;
    };
    const pill = (label, active, onClick, key, icon) => {
      const b = button(`staff-pill${active ? ' active' : ''}`, '', () => { onClick(); renderControls(); });
      if (icon) b.appendChild(icon);
      b.appendChild(el('span', '', label));
      b.dataset.toggle = key;
      b.setAttribute('aria-pressed', String(active));
      return b;
    };

    // ---- 吸顶输入栏：写音时最常用的都在这里 ----
    const durations = segmented(['w', 'h', 'q', 'e', 's'].map((d) => ({ value: d, icon: durationIcon(d), title: t.durations[d] })), (v) => v === state.duration, (d) => setDuration(d), 'staff-durations', t.duration);
    const modifiers = el('div', 'staff-pills');
    modifiers.append(
      pill(`${t.dot}${state.dots === 2 ? ' ×2' : ''}`, state.dots > 0, () => setDots((state.dots + 1) % 3), 'dot'),
      pill(t.tie, Boolean(selectedEvent()?.tie), () => toggleTie(), 'tie'),
      pill(t.chord, state.chord, () => { state.chord = !state.chord; }, 'chord'),
      pill(t.rest, false, () => addRest(), 'rest', durationIcon(state.duration, true)),
    );
    if (state.clef === 'grand') modifiers.appendChild(segmented([[0, t.upper], [1, t.lower]].map(([value, text]) => ({ value, text, title: t.restOn })), (v) => state.restStaff === v, (v) => { state.restStaff = v; }, 'staff-seg-small staff-rest-where', t.restOn));
    const accidentals = segmented([{ value: 'auto', text: t.accAuto }, ...[-2, -1, 0, 1, 2].map((a) => ({ value: a, text: { '-2': '♭♭', '-1': '♭', 0: '♮', 1: '♯', 2: '×' }[a], title: t.accNames[a] }))], (v) => (v === 'auto' ? state.accidental === null : state.accidental === v), (v) => { state.accidental = v === 'auto' ? null : v; }, 'staff-accidentals', t.accidental);
    const actions = el('div', 'staff-actions');
    actions.append(
      button('mk-btn', t.play, () => playScore()),
      button('mk-btn ghost', t.undo, () => undo()),
      button('mk-btn ghost', t.remove, () => removeSelected()),
      // 快速去别的工具：古典和声的和声连接写好后"送到五线谱"会回到这里；和弦转换的"送到五线谱"会接在谱的最后
      button('mk-btn ghost staff-jump', t.toClassical, () => { save(); if (globalThis.location) globalThis.location.hash = '#classical'; }),
      button('mk-btn ghost staff-jump', t.toChord, () => { save(); if (globalThis.location) globalThis.location.hash = '#chord'; }),
    );
    toolbar.append(durations, modifiers, accidentals, actions);

    // ---- 谱面设置（可折叠，默认展开在谱表正上方） ----
    settingsBox.open = state.settingsOpen;
    settingsBox.addEventListener('toggle', () => { state.settingsOpen = settingsBox.open; });
    const summary = el('summary', 'staff-settings-summary');
    summary.append(el('span', 'staff-settings-title', t.groupScore), el('span', 'staff-settings-brief', `${t.clefs[state.clef]} · ${KEY_NAMES[state.key][0]} · ${state.meter.join('/')} · ♩ = ${state.bpm}${state.cents ? ` · ${state.cents > 0 ? '+' : '−'}${Math.abs(state.cents)}¢` : ''}`));
    const bpm = el('input'); bpm.type = 'number'; bpm.min = '30'; bpm.max = '1200'; bpm.value = String(state.bpm);
    bpm.addEventListener('change', () => { state.bpm = Math.max(30, Math.min(1200, Number(bpm.value) || 90)); bpm.value = String(state.bpm); save(); renderControls(); });
    const centsInput = el('input'); centsInput.type = 'number'; centsInput.min = '-100'; centsInput.max = '100'; centsInput.value = String(state.cents); centsInput.className = 'staff-cents-input';
    centsInput.setAttribute('aria-label', t.cents);
    centsInput.addEventListener('change', () => { state.cents = Math.max(-100, Math.min(100, Math.round(Number(centsInput.value) || 0))); renderControls(); });
    const centsRow = el('div', 'staff-cents-row');
    centsRow.append(segmented([-50, -25, 0, 25, 50].map((c) => ({ value: c, text: c === 0 ? '0' : `${c > 0 ? '+' : '−'}${Math.abs(c)}¢` })), (v) => state.cents === v, (v) => { state.cents = v; }, 'staff-seg-small'), centsInput);
    const fields = el('div', 'staff-fields');
    fields.append(
      field(t.clef, selectBox([...['grand'], ...CLEF_ORDER].map((id) => [id, t.clefs[id]]), state.clef, (v) => { snapshot(); changeClef(v); })),
      field(t.key, selectBox(Array.from({ length: 15 }, (_, i) => i - 7).map((n) => [n, t.keyName(n, KEY_NAMES[n])]), state.key, (v) => { state.key = Number(v); save(); renderAll(); })),
      field(t.meter, selectBox(METERS.map((m) => [m.join('/'), m.join('/')]), state.meter.join('/'), (v) => { state.meter = v.split('/').map(Number); save(); renderAll(); })),
      field(t.bpm, bpm),
    );
    const extra = el('div', 'staff-settings-extra');
    const namesToggle = el('label', 'staff-toggle');
    const namesBox = el('input'); namesBox.type = 'checkbox'; namesBox.checked = state.names;
    namesBox.addEventListener('change', () => { state.names = namesBox.checked; renderScore(); });
    namesToggle.append(namesBox, document.createTextNode(` ${t.names}`));
    extra.append(
      button('mk-btn ghost', t.clear, () => { snapshot(); state.voices = [[], []]; state.selected = null; save(); renderAll(); }),
      midiExportButton(() => midiTracks(), 'staff.mid', () => ({ bpm: state.bpm, meter: state.meter })),
      button('mk-btn ghost', t.exportXml, () => exportMusicXML()),
      button('mk-btn ghost', t.print, () => printScore()),
      namesToggle,
    );
    // ---- 整谱：导入、移调、按小节复制 / 粘贴 / 删除 ----
    const whole = el('div', 'staff-whole');
    const file = el('input'); file.type = 'file'; file.hidden = true;
    file.accept = '.musicxml,.xml,.mxl,application/vnd.recordare.musicxml+xml,application/vnd.recordare.musicxml';
    file.addEventListener('change', () => { if (file.files?.[0]) importFile(file.files[0]); });
    const importRow = el('div', 'staff-whole-row');
    importRow.append(button('mk-btn ghost', t.importXml, () => file.click()), file);
    const transposeRow = el('div', 'staff-whole-row');
    transposeRow.append(el('span', 'staff-field-label', t.transpose), selectBox(INTERVALS.map((i) => [i.id, t.intervals[i.id]]), state.interval, (v) => { state.interval = v; }),
      button('mk-btn ghost', t.up, () => transposeBy(1)), button('mk-btn ghost', t.down, () => transposeBy(-1)));
    const total = measureCount(currentScore());
    const numberBox = (index) => {
      const input = el('input'); input.type = 'number'; input.min = '1'; input.max = String(Math.max(1, total + 1)); input.value = String(state.range[index]); input.className = 'staff-measure-input';
      input.setAttribute('aria-label', index ? t.measureTo : t.measureFrom);
      input.addEventListener('change', () => { state.range[index] = Math.max(1, Math.round(Number(input.value) || 1)); input.value = String(state.range[index]); });
      return input;
    };
    const measureRow = el('div', 'staff-whole-row');
    measureRow.append(el('span', 'staff-field-label', t.measures), el('span', '', t.measureFrom), numberBox(0), el('span', '', t.measureTo), numberBox(1),
      button('mk-btn ghost', t.copy, () => copyRange()), button('mk-btn ghost', t.pasteBefore, () => pasteAt(Math.min(...state.range))),
      button('mk-btn ghost', t.pasteEnd, () => pasteAt(null)), button('mk-btn ghost', t.deleteMeasures, () => deleteRange()));
    whole.append(el('p', 'staff-whole-title', t.groupWhole), importRow, el('p', 'staff-group-note', t.importHint), transposeRow, el('p', 'staff-group-note', t.transposeHint), measureRow);
    if (state.status) whole.appendChild(el('p', 'staff-whole-status', state.status));
    settingsBox.append(summary, fields, field(t.cents, centsRow), el('p', 'staff-group-note', t.centsHint), extra, whole);
  }
  const paintControls = () => renderControls();

  // 一张卡片里放下全部：吸顶的输入栏 → 可折叠的谱面设置 → 谱表 → 读数 → 琴键（不用在设置和谱面之间来回滚动）
  const board = el('div', 'staff-board');
  const toolbar = el('div', 'staff-dock');
  const settingsBox = el('details', 'staff-settings-box');
  const scoreHolder = el('div', 'staff-canvas');
  const readout = el('div', 'staff-readout');
  const keysHolder = el('div', 'staff-keys');
  // 长按琴键之后紧跟着的 click 不再写音（在捕获阶段拦下，琴键自己的 click 收不到）
  keysHolder.addEventListener('click', (e) => { if (longPressed) { longPressed = false; e.stopPropagation(); e.preventDefault(); } }, true);
  const hints = el('details', 'staff-hints');
  hints.append(el('summary', '', t.hintTitle), el('p', 'mk-meta staff-hint', t.hint), el('p', 'mk-meta staff-hint', t.midiInput), el('p', 'mk-meta staff-hint', t.midiNote));
  board.append(toolbar, settingsBox, scoreHolder, readout, keysHolder, hints);
  root.append(board);
  const clefInfo = el('div', 'staff-clef-info');
  const same = el('section', 'staff-section');
  const quiz = el('section', 'staff-section staff-quiz');
  const facts = el('section', 'staff-section');
  facts.appendChild(el('h4', '', t.factsTitle));
  const list = el('ul', 'staff-facts');
  t.facts.forEach(([text, ...refs]) => { const item = el('li', '', text); refs.forEach((id) => item.appendChild(cite(SOURCES, id))); list.appendChild(item); });
  facts.appendChild(list);
  const satbBox = el('section', 'staff-section satb-panel');
  root.append(satbBox, clefInfo, same, quiz, facts, relatedLinks(['chord', 'classical', 'ear', 'instruments', 'circle', 'micro']), sourcesFooter(SOURCES));

  // ---------------- 编辑 ----------------
  function changeClef(clef) {
    // 单行 ↔ 大谱表：把音按中央 C 分到上下两行，或合并成一行
    if (clef === 'grand' && state.clef !== 'grand') {
      const [upper, lower] = [[], []];
      state.voices[0].forEach((event) => {
        if (event.rest) { upper.push(event); return; }
        const midi = pitchMidi(event.notes[0].letter, event.notes[0].octave);
        (midi < 60 ? lower : upper).push(event);
      });
      state.voices = [upper, lower];
    } else if (clef !== 'grand' && state.clef === 'grand') {
      state.voices = [[...state.voices[0], ...state.voices[1]], []];
    }
    state.clef = clef;
    state.selected = null;
    save();
    renderAll();
  }
  function writeNote(voice, note, { chord = state.chord, silent = false } = {}) {
    snapshot();
    const current = selectedEvent();
    if (chord && current && !current.rest && state.selected.voice === voice) {
      const existing = current.notes.find((n) => samePitch(n, note));
      if (existing) Object.assign(existing, note); else current.notes.push(note);
    } else if (chord && current && !current.rest && state.clef === 'grand') {
      // 大谱表的和弦模式：音落在另一行时，写进那一行的同一拍（没有就补休止符对齐后再写），两行合成一个和弦
      const beat = onsetOf(state.selected.voice, state.selected.index);
      const list = state.voices[voice];
      const at = eventAtBeat(voice, beat);
      if (at >= 0 && !list[at].rest) {
        const existing = list[at].notes.find((n) => samePitch(n, note));
        if (existing) Object.assign(existing, note); else list[at].notes.push(note);
      } else if (at >= 0) {
        list[at] = { rest: false, duration: list[at].duration, dots: list[at].dots, tie: false, notes: [note] };
      } else if (voiceLength(voice) <= beat + 1e-6) {
        decompose(beat - voiceLength(voice)).forEach((part) => list.push({ rest: true, duration: part.duration, dots: part.dots, tie: false, notes: [] }));
        list.push({ rest: false, duration: current.duration, dots: current.dots, tie: false, notes: [note] });
      } else {
        // 这一拍在另一行一个长音的中间：没法对齐，照常写在那一行的末尾
        state.status = t.cantAlign;
        list.push({ rest: false, duration: state.duration, dots: state.dots, tie: false, notes: [note] });
        state.selected = { voice, index: list.length - 1 };
        state.picked = false;
      }
    } else {
      state.voices[voice].push({ rest: false, duration: state.duration, dots: state.dots, tie: false, notes: [note] });
      state.selected = { voice, index: state.voices[voice].length - 1 };
      state.picked = false;
    }
    save();
    renderAll();
    if (!silent) playEventAt(state.selected.voice, state.selected.index);
  }
  function writeFromStaff(staffIndex, position) {
    const clef = clefList()[staffIndex];
    const pitch = positionToPitch(clef, position);
    writeNote(state.clef === 'grand' ? staffIndex : 0, { letter: pitch.letter, octave: pitch.octave, alter: state.accidental, cents: state.cents });
  }
  function writeFromKey(midi, options) {
    const spelled = spellInKey(midi, state.key);
    writeNote(state.clef === 'grand' && midi < 60 ? 1 : 0, { ...spelled, cents: state.cents }, options);
  }
  // ---------------- 整谱操作 ----------------
  const currentScore = () => ({ clef: state.clef, key: state.key, meter: state.meter, voices: state.voices });
  const afterWhole = (status = '') => { state.selected = null; state.picked = false; state.status = status; save(); renderAll(); };
  async function importFile(file) {
    try {
      const head = new Uint8Array(await file.slice(0, 2).arrayBuffer());
      const text = head[0] === 0x50 && head[1] === 0x4b ? await unzipMusicXML(await file.arrayBuffer()) : await file.text();
      const incoming = musicXMLToScore(text);
      snapshot();
      Object.assign(state, { clef: incoming.clef, key: incoming.key, meter: incoming.meter, bpm: incoming.bpm, voices: incoming.voices, range: [1, 1] });
      afterWhole(t.importDone(incoming.warnings));
    } catch (_) {
      state.status = t.importFail;
      renderControls();
    }
  }
  function transposeBy(direction) {
    const interval = INTERVALS.find((i) => i.id === state.interval) || INTERVALS[1];
    if (!state.voices.some((v) => v.length)) return;
    snapshot();
    const moved = transposeScore(currentScore(), { steps: direction * interval.steps, semis: direction * interval.semis });
    state.voices = moved.voices; state.key = moved.key;
    afterWhole();
  }
  function copyRange() {
    const [a, b] = state.range;
    state.clip = copyMeasures(currentScore(), a, b);
    const total = measureCount(currentScore());
    state.status = state.clip ? t.copied(Math.min(a, b), Math.min(total, Math.max(a, b))) : '';
    renderControls();
  }
  function pasteAt(at) {
    if (!state.clip) { state.status = t.nothingCopied; renderControls(); return; }
    const voices = pasteMeasures(currentScore(), state.clip, at);
    if (!voices) { state.status = t.pasteMeter; renderControls(); return; }
    snapshot(); state.voices = voices; afterWhole();
  }
  function deleteRange() {
    if (!measureCount(currentScore())) return;
    snapshot(); state.voices = deleteMeasures(currentScore(), ...state.range); afterWhole();
  }
  function addRest() {
    snapshot();
    const voice = state.clef === 'grand' ? state.restStaff : 0;
    state.voices[voice].push({ rest: true, duration: state.duration, dots: state.dots, tie: false, notes: [] });
    state.selected = { voice, index: state.voices[voice].length - 1 };
    state.picked = false;
    save();
    renderAll();
  }
  /** 选中的和弦里时值相同的事件（两行一起改，保持对齐） */
  function pickedGroup() {
    const event = pickedEvent();
    if (!event) return [];
    const partner = partnerOf();
    const other = partner ? state.voices[partner.voice][partner.index] : null;
    return other && lengthOf(other) === lengthOf(event) ? [event, other] : [event];
  }
  function setDuration(duration) {
    state.duration = duration;
    const group = pickedGroup();
    if (group.length) { snapshot(); group.forEach((e) => { e.duration = duration; }); save(); renderAll(); }
  }
  function setDots(dots) {
    state.dots = dots;
    const group = pickedGroup();
    if (group.length) { snapshot(); group.forEach((e) => { e.dots = dots; }); save(); renderAll(); }
  }
  function toggleTie() {
    const event = selectedEvent();
    if (!event || event.rest) return;
    snapshot();
    const tie = !event.tie;
    event.tie = tie;
    // 另一行同一拍的音一起连
    const partner = partnerOf();
    const other = partner ? state.voices[partner.voice][partner.index] : null;
    if (other && !other.rest && lengthOf(other) === lengthOf(event)) other.tie = tie;
    save(); renderAll();
  }
  function removeSelected() {
    let { selected } = state;
    if (!selected) {
      const voice = state.voices[1].length && !state.voices[0].length ? 1 : 0;
      if (!state.voices[voice].length) return;
      selected = { voice, index: state.voices[voice].length - 1 };
    }
    snapshot();
    // 大谱表：另一行同一拍、同样时值的事件一起删掉（两行保持对齐）
    const partner = partnerOf(selected);
    if (partner && lengthOf(state.voices[partner.voice][partner.index]) === lengthOf(state.voices[selected.voice][selected.index])) state.voices[partner.voice].splice(partner.index, 1);
    state.voices[selected.voice].splice(selected.index, 1);
    const left = state.voices[selected.voice].length;
    state.selected = left ? { voice: selected.voice, index: Math.min(selected.index, left - 1) } : null;
    state.picked = false;
    save();
    renderAll();
  }
  function undo() {
    const last = history.pop();
    if (!last) return;
    state.voices = last.voices; state.selected = last.selected; state.picked = false;
    if (last.clef) Object.assign(state, { key: last.key, meter: last.meter, clef: last.clef });
    save();
    renderAll();
  }

  // ---------------- 排版 ----------------
  /** 每个声部排进小节，并算出每个音实际的升降、要不要画临时记号 */
  function layoutVoices() {
    const clefs = clefList();
    return clefs.map((clef, voice) => {
      const measures = layoutMeasures(state.voices[voice] || [], state.meter);
      let lastAlters = {};
      measures.forEach((measure) => {
        measure.events.forEach((e) => { if (e.tiedIn) e.tiedAlters = lastAlters[e.source] || {}; });
        const resolved = resolveMeasure(measure.events, state.key);
        measure.events.forEach((e, i) => {
          e.resolved = resolved[i];
          if (!e.rest) lastAlters[e.source] = Object.fromEntries(e.notes.map((n, k) => [`${n.letter}${n.octave}`, resolved[i][k].alter]));
        });
      });
      return { clef, measures };
    });
  }

  function renderScore() {
    const partnerSel = state.picked ? partnerOf() : null;
    stop();
    const voices = layoutVoices();
    const clefs = voices.map((v) => v.clef);
    const measureCount = Math.max(1, ...voices.map((v) => (v.measures.length === 1 && !v.measures[0].events.length ? 0 : v.measures.length)));
    // 每个小节的时间点（两行一起对齐）与宽度
    const measures = Array.from({ length: measureCount }, (_, m) => {
      const onsets = new Map();
      voices.forEach((v) => (v.measures[m]?.events || []).forEach((e) => {
        const slot = onsets.get(e.onset) || { width: 0 };
        const accidentals = e.rest ? 0 : e.resolved.filter((r) => r.show).length;
        const cents = !e.rest && e.notes.some((n) => n.cents);
        slot.width = Math.max(slot.width, SLOT[e.duration] + (accidentals ? 9 + Math.min(accidentals, 3) * 6 : 0) + (e.dots ? 6 * e.dots : 0) + (cents ? 18 : 0) + (!e.rest && e.notes.length > 1 ? 10 : 0));
        onsets.set(e.onset, slot);
      }));
      const ordered = [...onsets.entries()].sort((a, b) => a[0] - b[0]);
      const natural = ordered.length ? ordered.reduce((sum, [, s]) => sum + s.width, 0) + 16 : 70;
      return { index: m, onsets: ordered, natural };
    });
    const keyWidth = Math.abs(state.key) * 9 + 6;
    const headerWidth = (first) => (clefs.length > 1 ? 24 : 6) + 40 + keyWidth + (first ? 26 : 0);
    // 分行
    const systems = [];
    let current = { measures: [], width: headerWidth(true) };
    measures.forEach((m) => {
      if (current.measures.length && current.width + m.natural > SYSTEM_WIDTH) { systems.push(current); current = { measures: [], width: headerWidth(false) }; }
      current.measures.push(m);
      current.width += m.natural;
    });
    systems.push(current);
    const stackGap = 74;
    const staffBlock = clefs.length * 4 * GAP + (clefs.length - 1) * stackGap;
    const systemHeight = staffBlock + 96;
    const height = systems.length * systemHeight + 10;
    const svg = svgNode(null, 'svg', { viewBox: `0 0 ${SYSTEM_WIDTH + 10} ${height}`, class: 'staff-svg-tool staff-score', role: 'img', 'aria-label': t.title });
    const zonesLayer = svgNode(svg, 'g', { class: 'staff-zones' });
    const drawn = new Map(); // `${voice}:${source}` → [{ heads, x, system, up }]
    const eventPositions = []; // 播放光标用
    systems.forEach((system, sIndex) => {
      const top0 = 48 + sIndex * systemHeight;
      const tops = clefs.map((_, k) => top0 + k * (4 * GAP + stackGap));
      const left = clefs.length > 1 ? 24 : 6;
      const header = headerWidth(sIndex === 0);
      const last = sIndex === systems.length - 1;
      const stretch = last && system.width < SYSTEM_WIDTH * 0.7 ? 1 : (SYSTEM_WIDTH - header) / Math.max(1, system.width - header);
      // 每一行谱表都画满整行宽度（最后一行音符不拉伸，但线照样画满）
      const right = SYSTEM_WIDTH;
      clefs.forEach((clef, k) => {
        drawLines(svg, { x: left, width: right - left, top: tops[k] });
        drawClef(svg, clef, { x: left + 6, top: tops[k] });
        drawKeySignature(svg, { x: left + 36, top: tops[k], layout: keySignatureLayout(clef, state.key) });
        if (sIndex === 0) drawTimeSignature(svg, { x: left + 36 + keyWidth + 10, top: tops[k], meter: state.meter });
        if (state.names) {
          for (let p = 0; p <= 8; p += 1) svgNode(svg, 'text', { x: p % 2 ? right + 8 : right + 1, y: positionY(tops[k], p) + 3, class: `staff-pos-name${p % 2 ? ' is-space' : ''}` }, positionToPitch(clef, p).letter);
        }
        // 写音的横带
        const range = clefs.length > 1 ? (k === 0 ? [-5, 14] : [-6, 13]) : [-6, 14];
        for (let p = range[0]; p <= range[1]; p += 1) {
          const zone = svgNode(zonesLayer, 'rect', { x: left + 30, y: positionY(tops[k], p) - GAP / 4, width: right - left - 30, height: GAP / 2, class: 'staff-zone' });
          zone.dataset.staff = String(k); zone.dataset.position = String(p);
          zone.addEventListener('click', () => writeFromStaff(k, p));
          zone.addEventListener('pointermove', (event) => showGhost(svg, k, p, tops[k], event));
        }
      });
      const bottom = tops[tops.length - 1] + 4 * GAP;
      if (clefs.length > 1) drawBrace(svg, { x: 4, top: tops[0], bottom });
      svgNode(svg, 'line', { x1: left, x2: left, y1: tops[0], y2: bottom, class: 'sd-line sd-system' });
      let x = header;
      system.measures.forEach((m, mi) => {
        const width = m.natural * stretch;
        // 时间点的横坐标
        const slotX = new Map();
        let cursor = x + 10;
        m.onsets.forEach(([onset, slot]) => { slotX.set(onset, cursor + Math.min(slot.width * stretch, slot.width + 40) * 0.42); cursor += slot.width * stretch; });
        voices.forEach((v, voice) => {
          const events = v.measures[m.index]?.events || [];
          const top = tops[voice];
          if (!events.length && v.measures.length > 0 && measureCount > 0 && (state.voices[voice] || []).length === 0 && clefs.length > 1) {
            // 空的那一行：画一个整小节休止
            drawRest(svg, { x: x + width / 2, top, duration: 'w', className: 'is-ghost-rest' });
          }
          // 符杠分组
          const groupBeats = beamGroupBeats(state.meter);
          const groups = [];
          let run = [];
          const flush = () => { if (run.length > 1) groups.push(run); run = []; };
          events.forEach((e, i) => {
            const beamable = !e.rest && (e.duration === 'e' || e.duration === 's');
            const group = Math.floor((e.onset + 1e-6) / groupBeats);
            if (!beamable) { flush(); return; }
            if (run.length && Math.floor((events[run[run.length - 1]].onset + 1e-6) / groupBeats) !== group) flush();
            run.push(i);
          });
          flush();
          const beamOf = new Map();
          groups.forEach((g) => {
            const positions = g.flatMap((i) => events[i].notes.map((n) => pitchToPosition(v.clef, n.letter, n.octave)));
            const up = positions.reduce((a, b) => a + b, 0) / positions.length < 4;
            const ys = positions.map((p) => positionY(top, p));
            const y = up ? Math.min(...ys) - 30 : Math.max(...ys) + 30;
            g.forEach((i) => beamOf.set(i, { group: g, up, y }));
          });
          const stemsByGroup = new Map();
          events.forEach((e, i) => {
            const ex = slotX.get(e.onset);
            const isSelected = state.picked && ((state.selected && state.selected.voice === voice && state.selected.index === e.source) || (partnerSel && partnerSel.voice === voice && partnerSel.index === e.source));
            const cls = `${isSelected ? 'is-selected' : ''}`;
            let result;
            if (e.rest) {
              result = drawRest(svg, { x: ex, top, duration: e.duration, dots: e.dots, className: cls });
            } else {
              const beam = beamOf.get(i);
              // 连过来的那一段不再重复标临时记号和音分
              const notes = e.notes.map((n, k) => ({ position: pitchToPosition(v.clef, n.letter, n.octave), alter: e.resolved[k].show ? e.resolved[k].alter : undefined, cents: e.tiedIn ? 0 : n.cents }));
              result = drawChordEvent(svg, { x: ex, top, notes, duration: e.duration, dots: e.dots, stem: beam ? (beam.up ? 'up' : 'down') : undefined, stemEnd: beam?.y, className: cls });
              if (beam) { const list = stemsByGroup.get(beam.group) || []; list.push({ i, x: result.stemX, duration: e.duration }); stemsByGroup.set(beam.group, list); }
              const key = `${voice}:${e.source}`;
              const pieces = drawn.get(key) || [];
              pieces.push({ heads: result.heads, notes: e.notes, system: sIndex, up: result.up, tieOut: e.tieOut, right });
              drawn.set(key, pieces);
            }
            result.el.dataset.voice = String(voice);
            result.el.dataset.source = String(e.source);
            // 长按某个音：把它从和弦里取消
            if (!e.rest) {
              const clefId = v.clef;
              onLongPress(result.el, (ev) => {
                const heads = [...result.el.querySelectorAll('ellipse')];
                let h = heads.indexOf(ev.target);
                if (h < 0 && heads.length > 1 && typeof heads[0].getBoundingClientRect === 'function') {
                  const dist = heads.map((x) => { const r = x.getBoundingClientRect(); return Math.abs(r.top + r.height / 2 - (ev.clientY ?? 0)); });
                  h = dist.indexOf(Math.min(...dist));
                }
                if (h < 0) h = heads.length - 1;
                // 符头按音位从低到高画：第 h 个符头对应音位排第 h 的那个音
                const order = e.notes.map((n, k) => ({ k, pos: pitchToPosition(clefId, n.letter, n.octave) })).sort((a, b) => a.pos - b.pos);
                const pressed = e.notes[order[Math.min(h, order.length - 1)].k];
                const source = state.voices[voice][e.source];
                const k = source?.notes.findIndex((n) => n.letter === pressed.letter && n.octave === pressed.octave && (n.alter ?? null) === (pressed.alter ?? null));
                removeNoteAt(voice, e.source, k >= 0 ? k : source.notes.findIndex((n) => n.letter === pressed.letter && n.octave === pressed.octave));
              });
            }
            result.el.addEventListener('click', (event) => {
              event.stopPropagation();
              if (longPressed) { longPressed = false; return; }
              const same = state.picked && state.selected?.voice === voice && state.selected?.index === e.source;
              // 再点一次已选中的音符就取消选择
              state.selected = same ? null : { voice, index: e.source };
              state.picked = !same;
              if (!same) state.range = [m.index + 1, m.index + 1]; // 小节复制 / 删除默认用点中的这一小节
              renderAll();
              if (!same) playEventAt(voice, e.source);
            });
            eventPositions.push({ voice, source: e.source });
          });
          stemsByGroup.forEach((stems, group) => {
            const { up, y } = beamOf.get(group[0]);
            const secondary = [];
            stems.forEach((s, k) => {
              if (s.duration !== 's') return;
              if (stems[k + 1]?.duration === 's') secondary.push([k, k + 1]);
              else if (stems[k - 1]?.duration !== 's') secondary.push([k, null]);
            });
            drawBeams(svg, { stems: stems.map((s) => s.x), up, y, secondary });
          });
        });
        x += width;
        const isEnd = sIndex === systems.length - 1 && mi === system.measures.length - 1;
        // 写到哪里都画普通小节线；终止线（细 + 粗）总在整行的最右边，谱表线一直画满
        svgNode(svg, 'line', { x1: x, x2: x, y1: tops[0], y2: bottom, class: `sd-line sd-system${isEnd && x < right - 12 ? ' is-open' : ''}` });
        if (isEnd) {
          svgNode(svg, 'line', { x1: right - 5, x2: right - 5, y1: tops[0], y2: bottom, class: 'sd-line sd-system' });
          svgNode(svg, 'rect', { x: right - 2, y: tops[0], width: 3.4, height: bottom - tops[0], class: 'sd-final' });
        }
      });
    });
    // 连音线：同一个声部里，连到下一段（拆开的或用户加的）中同音高的音
    voices.forEach((v, voice) => {
      const pieces = [];
      [...drawn.entries()].filter(([key]) => key.startsWith(`${voice}:`)).sort((a, b) => Number(a[0].split(':')[1]) - Number(b[0].split(':')[1])).forEach(([, list]) => pieces.push(...list));
      pieces.forEach((piece, i) => {
        if (!piece.tieOut) return;
        const next = pieces[i + 1];
        piece.notes.forEach((note, k) => {
          const head = piece.heads.find((h) => h.position === pitchToPosition(v.clef, note.letter, note.octave)) || piece.heads[k];
          const nextIndex = next ? next.notes.findIndex((n) => samePitch(n, note)) : -1;
          if (next && nextIndex >= 0 && next.system === piece.system) {
            const target = next.heads.find((h) => h.position === head.position);
            drawTie(svg, { x1: head.hx, x2: target.hx, y: head.y, below: piece.up });
          } else {
            drawTie(svg, { x1: head.hx, x2: Math.min(piece.right, head.hx + 26), y: head.y, below: piece.up });
          }
        });
      });
    });
    svg.addEventListener('pointerleave', () => svg.querySelector('.staff-ghost')?.remove());
    scoreHolder.replaceChildren(svg);
    drawSatbMarks();
  }

  /** 鼠标在谱表上移动时显示一个淡色的音符（以及会写成哪个音） */
  function showGhost(svg, staffIndex, position, top, event) {
    let ghost = svg.querySelector('.staff-ghost');
    if (!ghost) ghost = svgNode(svg, 'g', { class: 'staff-ghost' });
    ghost.replaceChildren();
    let x = SYSTEM_WIDTH - 40;
    try {
      const matrix = svg.getScreenCTM?.();
      if (matrix && event?.clientX !== undefined) {
        const point = svg.createSVGPoint(); point.x = event.clientX; point.y = event.clientY;
        x = point.matrixTransform(matrix.inverse()).x;
      }
    } catch (_) { /* 没有布局信息时放在右侧 */ }
    const clef = clefList()[staffIndex];
    const pitch = positionToPitch(clef, position);
    drawChordEvent(ghost, { x, top, notes: [{ position, alter: state.accidental ?? undefined, cents: state.cents }], duration: state.duration, dots: state.dots });
    const sign = state.accidental === null ? '' : { '-2': '♭♭', '-1': '♭', 0: '♮', 1: '♯', 2: '×' }[state.accidental];
    svgNode(ghost, 'text', { x: x + 14, y: positionY(top, position) - 10, class: 'staff-ghost-name' }, `${pitch.letter}${sign}${pitch.octave}`);
  }

  // ---------------- 播放 ----------------
  /** 按小节排好的音：[{ beat, beats, notes: [{ midi, cents }], voice, source }]，连音线连起来的音合成一个长音 */
  function timeline() {
    const voices = layoutVoices();
    const capacity = measureBeats(state.meter);
    const items = [];
    voices.forEach((v, voice) => {
      const open = new Map(); // 音高 → 正在延长的条目
      v.measures.forEach((measure, m) => measure.events.forEach((e) => {
        const beat = m * capacity + e.onset;
        if (e.rest) { open.clear(); items.push({ beat, beats: e.beats, notes: [], voice, source: e.source }); return; }
        const fresh = [];
        e.notes.forEach((n, k) => {
          const alter = e.resolved[k].alter;
          const midi = pitchMidi(n.letter, n.octave, alter);
          const id = `${midi}:${n.cents || 0}`;
          if (e.tiedIn && open.has(id)) open.get(id).beats += e.beats;
          else fresh.push({ midi, cents: n.cents || 0, beats: e.beats, id });
        });
        const item = { beat, beats: e.beats, notes: fresh, voice, source: e.source };
        items.push(item);
        const keep = new Map();
        if (e.tieOut) [...open.entries(), ...fresh.map((f) => [f.id, f])].forEach(([id, entry]) => keep.set(id, entry));
        open.clear();
        keep.forEach((entry, id) => open.set(id, entry));
      }));
    });
    return items.sort((a, b) => a.beat - b.beat);
  }
  function playScore() {
    stop();
    const secondsPerBeat = 60 / state.bpm;
    let first = true;
    timeline().forEach((item) => {
      timers.push(setTimeout(() => {
        target.querySelectorAll(`.staff-score [data-voice="${item.voice}"].is-playing`).forEach((n) => n.classList.remove('is-playing'));
        target.querySelectorAll(`.staff-score [data-voice="${item.voice}"][data-source="${item.source}"]`).forEach((n) => n.classList.add('is-playing'));
        if (item.notes.length) {
          // 同一时刻长度不同的音分开发声
          const byLength = new Map();
          item.notes.forEach((n) => { const list = byLength.get(n.beats) || []; list.push(n); byLength.set(n.beats, list); });
          byLength.forEach((notes, beats) => playChord(notes.map((n) => centsFrequency(n.midi, n.cents)), Math.max(0.2, beats * secondsPerBeat * 0.95), { interrupt: first }));
          first = false;
        }
      }, item.beat * secondsPerBeat * 1000));
    });
    const total = timeline().reduce((end, item) => Math.max(end, item.beat + item.beats), 0);
    timers.push(setTimeout(() => target.querySelectorAll('.is-playing').forEach((n) => n.classList.remove('is-playing')), total * secondsPerBeat * 1000 + 200));
  }
  /** 写音或点选时试听这一个时值（和弦就一起响） */
  function playEventAt(voice, index) {
    const event = state.voices[voice]?.[index];
    if (!event) return;
    const items = timeline();
    const partner = partnerOf({ voice, index });
    // 大谱表：同一拍的两行一起响
    const notes = [{ voice, index }, partner].filter(Boolean).flatMap((sel) => items.find((i) => i.voice === sel.voice && i.source === sel.index && i.notes.length)?.notes || []);
    if (notes.length) playChord(notes.map((n) => centsFrequency(n.midi, n.cents)), 0.9);
  }
  function midiTracks() {
    return clefList().map((clef, voice) => ({
      name: t.clefs[clef],
      notes: timeline().filter((i) => i.voice === voice).flatMap((i) => i.notes.map((n) => ({ beat: i.beat, duration: n.beats, midi: n.midi }))),
    }));
  }

  // ---------------- 读数 ----------------
  function renderReadout() {
    const event = selectedEvent();
    if (!event) { readout.replaceChildren(el('p', 'mk-meta', state.voices.some((v) => v.length) ? '' : t.empty)); return; }
    const item = timeline().find((i) => i.voice === state.selected.voice && i.source === state.selected.index);
    const big = el('div', 'staff-big', event.rest ? t.restLabel : (item?.notes.length ? item.notes : event.notes.map((n) => ({ midi: pitchMidi(n.letter, n.octave, n.alter ?? 0), cents: n.cents || 0 }))).map((n, k) => {
      const written = event.notes[k] || event.notes[0];
      const alter = n.midi - pitchMidi(written.letter, written.octave, 0);
      return `${pitchLabel({ letter: written.letter, accidental: alter, octave: written.octave })}${n.cents ? `${n.cents > 0 ? '+' : '−'}${Math.abs(n.cents)}¢` : ''}`;
    }).join(' '));
    const detail = el('div', 'staff-detail');
    detail.appendChild(el('span', 'staff-badge', `${t.selected} · ${t.durations[event.duration]}${event.dots ? ` · ${t.dot}${event.dots > 1 ? ' ×2' : ''}` : ''}${event.tie ? ` · ${t.tied}` : ''}`));
    if (!event.rest) {
      const clef = clefList()[state.selected.voice] || clefList()[0];
      const n = event.notes[event.notes.length - 1];
      detail.appendChild(el('span', '', `${t.position(describePosition(pitchToPosition(clef, n.letter, n.octave)))}（${t.clefs[clef]}）`));
      const playing = item?.notes[item.notes.length - 1];
      if (playing) detail.appendChild(el('span', '', t.frequency(Math.round(centsFrequency(playing.midi, playing.cents) * 10) / 10)));
      if (playing?.midi === 60 && n.letter === 'C' && !playing.cents) detail.appendChild(el('span', 'staff-badge', `${t.middleC} = C4`));
    }
    readout.replaceChildren(big, detail);
  }

  function renderKeys() {
    // 大谱表：上下两行同一拍的音一起亮
    const sig = keyAlterations(state.key);
    const lit = selectedGroup().flatMap((sel) => state.voices[sel.voice]?.[sel.index]?.notes || []).map((n) => pitchMidi(n.letter, n.octave, n.alter ?? sig[n.letter] ?? 0));
    // 长按之后琴键会重画，紧跟着的 click 可能落在已经换掉的琴键上：在写音这里统一拦下
    const keyboard = renderVisual({ kind: 'piano', from: 36, to: 84, lit, names: 'c' }, { play: ([midi]) => { if (longPressed) { longPressed = false; return; } writeFromKey(midi); } });
    if (!keyboard) return;
    // 长按亮着的琴键：把这个音从选中的和弦里取消
    // 琴键按顺序画：白键是 36–84 里的白键，黑键是其中的黑键（和 learn_visuals 的画法一致）
    const isBlack = (m) => [1, 3, 6, 8, 10].includes(m % 12);
    const range = Array.from({ length: 84 - 36 + 1 }, (_, i) => 36 + i);
    const midiOfKey = new Map();
    keyboard.querySelectorAll('.lv-key.white').forEach((key, i) => midiOfKey.set(key, range.filter((m) => !isBlack(m))[i]));
    keyboard.querySelectorAll('.lv-key.black').forEach((key, i) => midiOfKey.set(key, range.filter(isBlack)[i]));
    keyboard.querySelectorAll('.lv-key.is-lit').forEach((key) => onLongPress(key, () => removeMidiFromSelection(midiOfKey.get(key))));
    keysHolder.replaceChildren(keyboard);
  }

  function renderClefInfo() {
    clefInfo.replaceChildren();
    clefList().forEach((clefId) => {
      const card = el('div', 'staff-info-card');
      card.appendChild(el('h4', '', t.clefs[clefId]));
      const rows = el('dl', 'staff-dl');
      rows.append(el('dt', '', t.lines), el('dd', '', lineLetters(clefId).join(' ')), el('dt', '', t.spaces), el('dd', '', spaceLetters(clefId).join(' ')));
      const mn = el('dd', '', `${MNEMONICS[clefId].lines} / ${MNEMONICS[clefId].spaces}`);
      mn.appendChild(cite(SOURCES, 'omt2e-clefs'));
      rows.append(el('dt', '', t.mnemonic), mn);
      card.appendChild(rows);
      clefInfo.appendChild(card);
    });
  }

  function renderSame() {
    same.replaceChildren(el('h4', '', t.sameTitle), el('p', 'mk-meta', t.sameHint));
    const event = selectedEvent();
    const note = event && !event.rest ? event.notes[event.notes.length - 1] : { letter: 'C', octave: 4, alter: 0 };
    const alter = note.alter ?? 0;
    const midi = pitchMidi(note.letter, note.octave, alter);
    const row = el('div', 'staff-same');
    CLEF_ORDER.forEach((clefId) => {
      const cell = el('figure', 'staff-same-cell');
      const pic = renderVisual({ kind: 'notation', staves: [{ clef: clefId }], notes: [{ p: `${note.letter}${alter > 0 ? '#'.repeat(alter) : alter < 0 ? 'b'.repeat(-alter) : ''}${note.octave}`, d: 'w', lit: true }], cols: 1 }, { play: () => playPitch(midi) });
      if (pic) cell.appendChild(pic);
      cell.appendChild(el('figcaption', '', `${t.clefs[clefId]} · ${t.position(describePosition(pitchToPosition(clefId, note.letter, note.octave)))}`));
      row.appendChild(cell);
    });
    same.appendChild(row);
  }

  // ---------------- 读谱练习 ----------------
  function newQuestion() {
    const [low, high] = state.quizLedger ? [-4, 12] : [-1, 9];
    let position;
    do position = low + Math.floor(Math.random() * (high - low + 1)); while (state.quiz && position === state.quiz.position);
    state.quiz = { position, ...positionToPitch(state.quizClef, position), answered: false };
    renderQuiz();
  }
  function renderQuiz() {
    quiz.replaceChildren(el('h4', '', t.quizTitle), el('p', 'mk-meta', t.quizHint));
    const options = el('div', 'staff-chips');
    options.appendChild(el('span', 'mk-meta', t.quizClef));
    CLEF_ORDER.forEach((clefId) => options.appendChild(button(`staff-chip${clefId === state.quizClef ? ' active' : ''}`, t.clefs[clefId], () => { state.quizClef = clefId; state.streak = 0; newQuestion(); })));
    const ledgerToggle = el('label', 'staff-toggle');
    const box = el('input'); box.type = 'checkbox'; box.checked = state.quizLedger;
    box.addEventListener('change', () => { state.quizLedger = box.checked; newQuestion(); });
    ledgerToggle.append(box, document.createTextNode(` ${t.ledger}`));
    quiz.append(options, ledgerToggle);
    if (!state.quiz) { quiz.appendChild(button('mk-btn', t.quizStart, newQuestion)); return; }
    const q = state.quiz;
    const pic = renderVisual({ kind: 'notation', staves: [{ clef: state.quizClef }], notes: [{ p: q.name, d: 'w' }], cols: 1 }, { play: () => playPitch(pitchMidi(q.letter, q.octave)) });
    if (pic) { pic.classList.add('staff-quiz-pic'); quiz.appendChild(pic); }
    const answers = el('div', 'staff-answers');
    const feedback = el('p', 'staff-feedback');
    const streak = el('p', 'mk-meta staff-streak', t.streak(state.streak, state.best));
    const next = button('mk-btn', t.quizNext, newQuestion);
    next.hidden = true;
    LETTERS.forEach((letter) => answers.appendChild(button('staff-answer', letter, (event) => {
      if (q.answered) return;
      q.answered = true;
      const correct = letter === q.letter;
      state.streak = correct ? state.streak + 1 : 0;
      state.best = Math.max(state.best, state.streak);
      playFeedbackSound(correct);
      setTimeout(() => playPitch(pitchMidi(q.letter, q.octave)), 260);
      event.currentTarget.classList.add(correct ? 'is-right' : 'is-wrong');
      answers.querySelectorAll('.staff-answer').forEach((b) => { if (b.textContent === q.letter) b.classList.add('is-right'); });
      feedback.textContent = correct ? `${t.right} ${q.name}` : t.wrong(q.name);
      feedback.className = `staff-feedback ${correct ? 'is-right' : 'is-wrong'}`;
      streak.textContent = t.streak(state.streak, state.best);
      next.hidden = false;
    })));
    quiz.append(answers, feedback, streak, next);
  }

  // ---------------- 四部和声检查 ----------------
  /**
   * 从大谱表里读出四部和声：同一时刻开始的音合在一起，正好 4 个就是一个和弦（从低到高 = 男低、男高、女中、女高）；
   * 上下两行怎么分配都可以（2 + 2、3 + 1、全写在一行），被连音线连过来的音不算新的起音（satb_check.groupFourPart）
   */
  function satbChords() {
    if (state.clef !== 'grand') return { chords: [], refs: [], problems: [] };
    const sig = keyAlterations(state.key);
    const midiOf = (n) => pitchMidi(n.letter, n.octave, n.alter ?? sig[n.letter]);
    const staff = (events) => {
      let beat = 0; let prev = null;
      return events.map((e, index) => {
        const midis = e.rest ? [] : e.notes.map(midiOf);
        const item = { beat, beats: durationBeats(e.duration, e.dots), midis, source: index, rest: e.rest, tiedIn: Boolean(prev?.tie && midis.length && midis.every((m) => prev.midis.includes(m))) };
        prev = { tie: !e.rest && e.tie, midis };
        beat += item.beats;
        return item;
      });
    };
    return groupFourPart([staff(state.voices[0] || []), staff(state.voices[1] || [])]);
  }
  /** 拍位：第几小节第几拍 */
  const beatLabel = (beat) => {
    const bar = (state.meter[0] * 4) / state.meter[1];
    const m = Math.floor(beat / bar + 1e-6);
    return t.satbBeat(m + 1, Math.round(((beat - m * bar) / (4 / state.meter[1])) * 100) / 100 + 1);
  };
  const satbTonic = () => ((7 * state.key) % 12 + 12 + (state.satbMinor ? 9 : 0)) % 12;
  function drawSatbMarks() {
    const svg = scoreHolder.querySelector('svg');
    if (!svg) return;
    if (!state.satbResult) { svg.querySelector('.satb-marks')?.remove(); return; }
    const { issues, refs } = state.satbResult;
    drawIssueMarks(svg, issues, (index, part) => {
      const where = refs[index]?.parts?.[part];
      if (!where) return null;
      const group = svg.querySelector(`.sd-event[data-voice="${where.staff}"][data-source="${where.source}"]`);
      // 符头按纵坐标从下往上排：第 rank 个（从低往高）就是这个声部
      const heads = [...(group?.querySelectorAll('ellipse') || [])].map((e) => ({ x: Number(e.getAttribute('cx')), y: Number(e.getAttribute('cy')) })).sort((a, b) => b.y - a.y);
      return heads[Math.min(where.rank, heads.length - 1)] || null;
    });
  }
  function playSatbVoice(part) {
    stop();
    const { chords, refs, problems } = satbChords();
    // 没认出和弦时不要默默没声音：显示原因（哪一拍上的音不是 4 个）
    if (!chords.length) { state.satbResult = { issues: [], refs: [], empty: true, problems }; renderSatb(); return; }
    const secondsPerBeat = 60 / state.bpm;
    let at = 0;
    chords.forEach((chord, i) => {
      const notes = part === 'all' ? chord : [chord[part]];
      const length = refs[i].beats * secondsPerBeat;
      timers.push(setTimeout(() => playChord(notes.map((m) => midiToFrequency(m)), Math.max(0.3, length * 0.95), { interrupt: i === 0 }), at * 1000));
      at += length;
    });
  }
  /**
   * 四部和声检查发现的错误（最多两条）做成选择题放进错题本：谱面上画出涉及的和弦、能试听，问"出了什么问题"
   * 干扰项固定取同一组规则里的前几个，同一个错误再检查一次只会把它退回第一盒，不会重复加题
   */
  function saveSatbMistakes(issues, chords) {
    const pool = ['parallel-5', 'parallel-8', 'crossing', 'spacing', 'doubled-leading', 'leading-tone', 'seventh', 'direct', 'overlap'];
    const ruleName = (rule) => tri(SATB_RULES.zh[rule] || rule, SATB_RULES.ja[rule] || rule, SATB_RULES.en[rule] || rule);
    const parts = (list) => tri(...['zh', 'ja', 'en'].map((l) => list.map((p) => SATB_PARTS[l][p]).join(l === 'en' ? ' & ' : '、')));
    const spell = (midi) => { const s = spellInKey(midi, state.key); const alter = s.alter ?? keyAlterations(state.key)[s.letter]; return `${s.letter}${alter > 0 ? '#'.repeat(alter) : 'b'.repeat(-alter)}${s.octave}`; };
    const picked = issues.filter((i) => i.severity === 'error' && SATB_RULES.zh[i.rule]).filter((i, k, list) => list.findIndex((x) => x.rule === i.rule) === k).slice(0, 2);
    let saved = 0;
    picked.forEach((issue) => {
      const span = issue.to !== undefined ? [issue.at, issue.to] : [issue.at];
      const notes = span.flatMap((c, col) => chords[c].map((midi, part) => ({ p: spell(midi), s: part < 2 ? 1 : 0, d: 'h', col, lit: issue.parts.includes(['bass', 'tenor', 'alto', 'soprano'][part]) })));
      const where = span.length > 1 ? tri(`第 ${span[0] + 1}→${span[1] + 1} 个和弦`, `第 ${span[0] + 1}→${span[1] + 1} 和音`, `chords ${span[0] + 1}→${span[1] + 1}`) : tri(`第 ${span[0] + 1} 个和弦`, `第 ${span[0] + 1} 和音`, `chord ${span[0] + 1}`);
      const card = {
        type: 'choice', ref: issue.ref,
        prompt: tri(`四部和声错题：这里（${where.zh}，标亮的是${parts(issue.parts).zh}）有什么问题？`, `4 声体の復習：ここ（${where.ja}、${parts(issue.parts).ja}が強調）の問題は？`, `Four-part review: what is wrong here (${where.en}; ${parts(issue.parts).en} highlighted)?`),
        options: [ruleName(issue.rule), ...pool.filter((r) => r !== issue.rule).slice(0, 3).map(ruleName)],
        visual: { kind: 'notation', staves: [{ clef: 'treble' }, { clef: 'bass' }], brace: true, notes, cols: Math.max(2, span.length) },
        audio: { mode: 'chords', notes: span.map((c) => chords[c]) },
        tool: { feature: 'staff', q: 'grand' },
      };
      if (recordToolMistake(card, 'satb')) saved += 1;
    });
    return saved;
  }
  function renderSatb() {
    satbBox.replaceChildren(el('h4', '', t.satbTitle), el('p', 'mk-meta', t.satbHint));
    if (state.clef !== 'grand') { satbBox.appendChild(el('p', 'mk-meta', t.satbNeedGrand)); return; }
    const controls = el('div', 'satb-controls');
    const mode = el('select');
    [[false, `${KEY_NAMES[state.key][0]} ${t.satbMajor}`], [true, `${KEY_NAMES[state.key][1]} ${t.satbMinor}`]].forEach(([v, text]) => { const o = el('option', '', text); o.value = v ? '1' : '0'; if (Boolean(state.satbMinor) === v) o.selected = true; mode.appendChild(o); });
    mode.addEventListener('change', () => { state.satbMinor = mode.value === '1'; state.satbResult = null; renderSatb(); drawSatbMarks(); });
    controls.append(el('span', 'mk-meta', t.satbKey), mode, button('mk-btn', t.satbRun, () => {
      const { chords, refs, problems } = satbChords();
      state.satbResult = chords.length ? { ...checkSATB(chords, { tonic: satbTonic(), minor: state.satbMinor }), refs, problems } : { issues: [], refs: [], empty: true, problems };
      if (chords.length) state.satbResult.saved = saveSatbMistakes(state.satbResult.issues, chords);
      renderSatb();
      drawSatbMarks();
    }));
    const solo = el('div', 'satb-controls');
    solo.appendChild(el('span', 'mk-meta', t.satbSolo));
    [[3, t.satbParts[3]], [2, t.satbParts[2]], [1, t.satbParts[1]], [0, t.satbParts[0]], ['all', t.satbAll]].forEach(([part, label]) => solo.appendChild(button('mk-btn ghost', label, () => playSatbVoice(part))));
    satbBox.append(controls, solo);
    if (state.satbResult?.empty) satbBox.appendChild(el('p', 'mk-meta', t.satbEmpty));
    else if (state.satbResult) {
      satbBox.appendChild(el('p', 'mk-meta', t.satbFigures(state.satbResult.chords.map((c) => c?.figure || '?').join('  '))));
      satbBox.appendChild(issueList(state.satbResult.issues, lang, (id) => cite(SATB_SOURCES, id)));
      if (state.satbResult.saved) satbBox.appendChild(el('p', 'mk-meta satb-saved', t.satbSaved(state.satbResult.saved)));
    }
    // 哪些拍上同时开始的音不是 4 个（这些拍没有算进检查）
    (state.satbResult?.problems || []).slice(0, 4).forEach((p) => satbBox.appendChild(el('p', 'mk-meta satb-problem', t.satbCount(beatLabel(p.beat), p.count))));
  }

  function renderAll() {
    renderSatb();
    renderControls();
    renderScore();
    renderReadout();
    renderKeys();
    renderClefInfo();
    renderSame();
  }

  // 快捷键（只在五线谱面板打开、焦点不在输入框时生效）
  const onKey = (event) => {
    if (!target.isConnected || !target.closest('.panel')?.classList.contains('active')) return;
    if (/^(INPUT|SELECT|TEXTAREA)$/.test(event.target?.tagName || '') || event.altKey || event.metaKey) return;
    const key = event.key;
    if (event.ctrlKey && key.toLowerCase() === 'z') { event.preventDefault(); undo(); return; }
    if (event.ctrlKey) return;
    const durations = { 1: 'w', 2: 'h', 3: 'q', 4: 'e', 5: 's' };
    if (durations[key]) { setDuration(durations[key]); renderControls(); }
    else if (key === '.') { setDots((state.dots + 1) % 3); renderControls(); }
    else if (key.toLowerCase() === 'r') addRest();
    else if (key.toLowerCase() === 't') { toggleTie(); renderControls(); }
    else if (key.toLowerCase() === 'c') { state.chord = !state.chord; renderControls(); }
    else if (key.toLowerCase() === 'p') playScore();
    else if (key === 'Delete' || key === 'Backspace') { event.preventDefault(); removeSelected(); }
    else return;
    event.preventDefault();
  };
  globalThis.document?.addEventListener('keydown', onKey);

  // MIDI 键盘（app_shell.js 把收到的音转发成 toolbox-midi 事件，并且已经发了声）：弹一个音写一个；按住一个键时再按的键叠成和弦
  const heldKeys = new Set();
  const onMidi = (event) => {
    if (!target.isConnected || !target.closest('.panel')?.classList.contains('active') || target.closest('[hidden]')) return;
    const { type, note } = event.detail || {};
    if (type === 'noteOff') { heldKeys.delete(note); return; }
    if (type !== 'noteOn' || !Number.isFinite(note)) return;
    const stack = heldKeys.size > 0 && Boolean(selectedEvent()) && !selectedEvent().rest;
    heldKeys.add(note);
    writeFromKey(note, { chord: stack || state.chord, silent: true });
  };
  (globalThis.window || globalThis).addEventListener?.('toolbox-midi', onMidi);

  /** 导出 MusicXML（MuseScore、Sibelius、Dorico 都能打开；音分偏移写成小数 alter） */
  function exportMusicXML() {
    const xml = scoreToMusicXML({ clefs: clefList(), voices: state.voices, key: state.key, meter: state.meter, bpm: state.bpm, title: t.title });
    const blob = new Blob([xml], { type: 'application/vnd.recordare.musicxml+xml' });
    const a = el('a'); a.href = URL.createObjectURL(blob); a.download = 'staff.musicxml';
    globalThis.document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1500);
  }
  /** 打印 / 存为 PDF：新开一页只放谱面，用浏览器的打印（可以选"另存为 PDF"） */
  function printScore() {
    const svg = scoreHolder.querySelector('svg');
    const win = globalThis.open?.('', '_blank');
    if (!svg || !win) return;
    const clone = svg.cloneNode(true);
    clone.querySelectorAll('.staff-zone, .staff-ghost').forEach((n) => n.remove());
    clone.removeAttribute('style');
    const base = globalThis.location.href.replace(/[#?].*$/, '').replace(/[^/]*$/, '');
    win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${t.title}</title><link rel="stylesheet" href="${base}app.css"><link rel="stylesheet" href="${base}learn.css"><style>body{margin:16mm;background:#fff}svg{width:100%;height:auto}.staff-zone,.staff-ghost{display:none}@page{size:A4 landscape;margin:10mm}</style></head><body>${clone.outerHTML}<script>window.onload=()=>setTimeout(()=>window.print(),300)<\/script></body></html>`);
    win.document.close();
  }

  /** 链接参数：#staff?q=bass、#staff?q=alto:C4、#staff?q=grand；#staff?q=@import 从其他工具送来的谱 */
  function applyQuery(q) {
    if (!q) return;
    // Side-B 实操：#staff?q=@lab:<id>[@chapter|@ex]——第一次打开时按任务准备谱表（setup.prefill 预先写好的音，例如对位的定旋律；之后保留玩家写到一半的内容，回来接着改），
    // 挂上任务条（检查 / 提交时把当前的谱交给评分器）
    if (String(q).startsWith('@lab:')) {
      const ref = String(q).slice(5);
      import('./lab_banner.js?v=20261009-audio1').then(({ mountLabBanner, isFirstVisit }) => import('./sideb_labs.js?v=20261004-x1').then(({ LABS, parseLabRef }) => {
        const setup = LABS[parseLabRef(ref).id]?.setup;
        if (setup) {
          snapshot();
          const fresh = setup.clear && isFirstVisit(ref);
          Object.assign(state, { clef: setup.clef || state.clef, key: setup.key ?? state.key, meter: setup.meter || state.meter, selected: null, picked: false, ...(fresh ? { voices: setup.prefill ? clone(setup.prefill) : [[], []] } : {}) });
          save();
          renderAll();
        }
        mountLabBanner(target, ref, { getSubmission: () => ({ voices: clone(state.voices), key: state.key, meter: state.meter, clef: state.clef }) });
      }));
      return;
    }
    // 从和弦转换送来的一个和弦：不清空，接在最后，用当前选中的时值（大谱表按中央 C 分到上下两行，短的一行先补休止符对齐）
    if (q === '@append') {
      let incoming = null;
      try { incoming = JSON.parse(globalThis.localStorage?.getItem('jc-staff-append') || 'null'); globalThis.localStorage?.removeItem('jc-staff-append'); } catch (_) { incoming = null; }
      const notes = (incoming?.pitches || []).map((name) => { const m = /^([A-G])(##|bb|#|b|♯|♭)?(-?\d)$/.exec(String(name).trim()); return m ? { letter: m[1], octave: Number(m[3]), alter: { '': 0, '#': 1, '##': 2, '♯': 1, b: -1, bb: -2, '♭': -1 }[m[2] || ''], cents: 0 } : null; }).filter(Boolean);
      if (notes.length) {
        snapshot();
        const ev = (list) => ({ rest: !list.length, duration: state.duration, dots: state.dots, tie: false, notes: list });
        if (state.clef === 'grand') {
          const total = (list) => list.reduce((sum, e) => sum + durationBeats(e.duration, e.dots), 0);
          const pad = (list, beats) => decompose(beats).forEach((part) => list.push({ rest: true, duration: part.duration, dots: part.dots, tie: false, notes: [] }));
          const [up, low] = state.voices;
          const gap = total(up) - total(low);
          if (gap > 1e-6) pad(low, gap); else if (gap < -1e-6) pad(up, -gap);
          const midi = (n) => pitchMidi(n.letter, n.octave, n.alter);
          up.push(ev(notes.filter((n) => midi(n) >= 60)));
          low.push(ev(notes.filter((n) => midi(n) < 60)));
        } else state.voices[0].push(ev(notes));
        state.selected = null;
        state.status = t.appended(incoming.symbol || notes.map((n) => `${n.letter}${n.octave}`).join(' '));
        save();
      }
      renderAll();
      return;
    }
    if (q === '@import') {
      let incoming = null;
      try { incoming = JSON.parse(globalThis.localStorage?.getItem('jc-staff-import') || 'null'); globalThis.localStorage?.removeItem('jc-staff-import'); } catch (_) { incoming = null; }
      if (incoming?.voices) {
        snapshot();
        Object.assign(state, {
          clef: incoming.clef || 'grand', key: Number(incoming.key) || 0, meter: incoming.meter || [4, 4], bpm: incoming.bpm || state.bpm,
          voices: [incoming.voices[0] || [], incoming.voices[1] || []], selected: null, picked: false,
        });
        save();
      }
      renderAll();
      return;
    }
    const [clef, note] = String(q).split(':');
    if (CLEFS[clef] || clef === 'grand') changeClef(clef);
    const match = /^([A-G])([#b]?)(-?\d)$/.exec(note || '');
    if (match) {
      const alter = match[2] === '#' ? 1 : match[2] === 'b' ? -1 : 0;
      const midi = pitchMidi(match[1], Number(match[3]), alter);
      const voice = state.clef === 'grand' && midi < 60 ? 1 : 0;
      snapshot();
      state.voices = [[], []];
      state.voices[voice] = [{ rest: false, duration: 'w', dots: 0, tie: false, notes: [{ letter: match[1], octave: Number(match[3]), alter: alter || null, cents: 0 }] }];
      state.selected = { voice, index: 0 }; state.picked = true;
      save();
    }
    renderAll();
  }
  target.addEventListener('toolbox-query', (event) => applyQuery(event.detail));

  renderAll();
  renderQuiz();
  return { applyQuery };
}

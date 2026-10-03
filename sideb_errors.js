// Side-B 的错误类型：每类对应一个技能标签、一句说明，以及推荐回去看的地方（A 面关卡 / Side-B 关卡 / 工具）。
// 结果页按这里把错误归类，并给出针对性练习。
const t = (zh, ja, en) => ({ zh, ja, en });

/** 七个技能标签 */
export const SKILLS = ['identify', 'spell', 'calc', 'function', 'voiceLeading', 'hearing', 'apply'];
export const SKILL_NAMES = {
  identify: t('识别', '識別', 'Identification'),
  spell: t('拼写', '綴り', 'Spelling'),
  calc: t('计算', '計算', 'Calculation'),
  function: t('功能分析', '機能分析', 'Functional analysis'),
  voiceLeading: t('声部进行', '声部進行', 'Voice leading'),
  hearing: t('听觉与节奏', '聴覚とリズム', 'Hearing & rhythm'),
  apply: t('应用', '応用', 'Application'),
};

/**
 * 错误类型：skill 技能；label 名称；advice 怎么改；go 推荐去处（a: A 面关卡键，b: Side-B 关卡编号，tool: { feature, q }）
 */
export const ERRORS = {
  enharmonic: { skill: 'spell', label: t('同音异名拼错', '異名同音の綴り違い', 'Enharmonic misspelling'), advice: t('先数字母（度数），再数半音：字母决定拼法，半音只决定升降。', 'まず文字（度数）を数え、次に半音を数える。文字が綴りを決め、半音は臨時記号だけを決める。', 'Count letters (the interval number) first, then half steps: letters fix the spelling, half steps only the accidental.'), go: { a: 'intervalqual' } },
  'wrong-note': { skill: 'spell', label: t('音写错了', '音が違う', 'Wrong note'), advice: t('对照调号和临时记号，一个音一个音核对。', '調号と臨時記号を見ながら 1 音ずつ確認。', 'Check each note against the key signature and accidentals.'), go: { a: 'major' } },
  octave: { skill: 'spell', label: t('八度写错', 'オクターヴの違い', 'Wrong octave'), advice: t('中央 C = C4；每个八度从 C 开始数。', '中央の C = C4。各オクターヴは C から数える。', 'Middle C is C4; each octave number starts on C.'), go: { a: 'staff' } },
  'wrong-chord': { skill: 'identify', label: t('和弦不对', '和音が違う', 'Wrong chord'), advice: t('先在调里找到这个罗马数字的根音，再按性质叠三度。', '調の中でローマ数字の根音を見つけ、性質どおりに 3 度を重ねる。', 'Find the numeral’s root in the key, then stack thirds of the right quality.'), go: { a: 'roman' } },
  'wrong-inversion': { skill: 'identify', label: t('转位不对', '転回形が違う', 'Wrong inversion'), advice: t('数字只看低音：6 是三音在低音，6/4 是五音，6/5、4/3、4/2 是七和弦的三种转位。', '数字はバスだけを見る：6 は 3 音、6/4 は 5 音、6/5・4/3・4/2 は七の和音の転回形。', 'Figures describe the bass: 6 = third in the bass, 6/4 = fifth; 6/5, 4/3, 4/2 are the seventh-chord inversions.'), go: { a: 'figured' } },
  'chord-count': { skill: 'apply', label: t('和弦数量不对', '和音の数が違う', 'Wrong number of chords'), advice: t('每个和弦要上下两行同时开始、各写两个音。', '各和音は上下 2 段で同時に始め、それぞれ 2 音書く。', 'Each chord needs two notes on each staff, starting together.'), go: { tool: { feature: 'staff', q: 'grand' } } },
  'parallel-fifths': { skill: 'voiceLeading', label: t('平行五度', '平行 5 度', 'Parallel fifths'), advice: t('两个声部接连构成纯五度并且都在移动：让其中一个声部反向或保持。', '2 声部が続けて完全 5 度を作り両方動いている：どちらかを反行させるか保つ。', 'Two voices move in perfect fifths: move one in contrary motion or keep it still.'), go: { a: 'voicing', b: 'B2-4' } },
  'parallel-octaves': { skill: 'voiceLeading', label: t('平行八度', '平行 8 度', 'Parallel octaves'), advice: t('两个声部接连八度（或同度）：通常是重复了导音或七音，换一个重复音。', '2 声部が続けて 8 度：多くは導音や第 7 音の重複。重複する音を変える。', 'Consecutive octaves usually come from doubling a tendency tone: double another note.'), go: { a: 'voicing', b: 'B2-4' } },
  'direct-fifths': { skill: 'voiceLeading', label: t('直接五八度', '並達 5・8 度', 'Direct fifths / octaves'), advice: t('外声部同向进入完全音程时，女高音要级进。', '外声が同方向で完全音程に入るとき、ソプラノは順次進行に。', 'When the outer voices approach a perfect interval in similar motion, the soprano should move by step.'), go: { b: 'B2-4' } },
  'unresolved-leading-tone': { skill: 'voiceLeading', label: t('导音没有解决', '導音が未解決', 'Unresolved leading tone'), advice: t('外声部的导音要上行到主音；内声部可以下行到属音。', '外声の導音は主音へ上行。内声なら属音へ下がってもよい。', 'In an outer voice the leading tone rises to the tonic; in an inner voice it may fall to the dominant.'), go: { a: 'voicing', b: 'B2-4' } },
  'unresolved-seventh': { skill: 'voiceLeading', label: t('七音没有下行解决', '第 7 音が下行解決していない', 'Chordal seventh not resolved down'), advice: t('和弦七音级进下行一步解决。', '和音の第 7 音は 1 歩下行して解決。', 'A chordal seventh resolves down by step.'), go: { a: 'sevenths', b: 'B2-4' } },
  'voice-crossing': { skill: 'voiceLeading', label: t('声部交叉 / 超越', '声部の交差・超越', 'Voice crossing / overlap'), advice: t('每个声部都要待在相邻声部之间，也不要越过相邻声部上一个音的位置。', '各声部は隣の声部の間にとどめ、隣の直前の音も越えない。', 'Keep each voice between its neighbours and don’t pass a neighbour’s previous note.'), go: { b: 'B2-4' } },
  spacing: { skill: 'voiceLeading', label: t('间距太大', '間隔が広すぎる', 'Spacing too wide'), advice: t('女高–女中、女中–男高不超过八度；男高–男低可以到十二度。', 'S–A・A–T は 8 度以内、T–B は 12 度まで。', 'S–A and A–T within an octave; T–B up to a twelfth.'), go: { b: 'B2-4' } },
  range: { skill: 'voiceLeading', label: t('超出音域', '音域外', 'Out of range'), advice: t('核对四个声部的常用音域。', '4 声部の音域を確認。', 'Check each voice’s usual range.'), go: { b: 'B2-4' } },
  'bad-doubling': { skill: 'voiceLeading', label: t('重复了不该重复的音', '重複してはいけない音を重複', 'Faulty doubling'), advice: t('导音和和弦七音都不重复。', '導音と第 7 音は重複しない。', 'Never double the leading tone or the chordal seventh.'), go: { b: 'B2-4' } },
  'wrong-function': { skill: 'function', label: t('功能 / 罗马数字判断错', '機能・ローマ数字の誤り', 'Functional label wrong'), advice: t('先定调，再看低音与和弦性质，最后看它在乐句里的位置。', 'まず調、次にバスと和音の性質、最後にフレーズ内の位置。', 'Fix the key, then the bass and quality, then the chord’s place in the phrase.'), go: { a: 'functions' } },
  calc: { skill: 'calc', label: t('计算错误', '計算の誤り', 'Calculation error'), advice: t('把推导一步步写出来，每步检查单位（字母、半音、拍、音分）。', '推論を 1 歩ずつ書き、単位（文字・半音・拍・セント）を確かめる。', 'Write the derivation step by step and check the unit at each step (letters, half steps, beats, cents).'), go: {} },
  concept: { skill: 'identify', label: t('概念混淆', '概念の混同', 'Concept mix-up'), advice: t('回到讲解页对照定义和反例。', '講義ページで定義と反例を見直す。', 'Revisit the lecture pages: compare the definition with the counter-examples.'), go: {} },
  'misplaced-onset': { skill: 'hearing', label: t('起音位置不对', '打点の位置が違う', 'Attack in the wrong place'), advice: t('先在点格上数出拍点和细分，再标起音。', 'まずドット・グリッドで拍と細分を数え、打点を記入。', 'Count beats and subdivisions on a dot grid first, then mark attacks.'), go: { a: 'rhythm', tool: { feature: 'rhythm', q: '' } } },
  'missing-syncopation': { skill: 'hearing', label: t('没有构成切分', 'シンコペーションになっていない', 'No syncopation'), advice: t('切分：在弱位置起音，并延长过下一个拍点（或在拍点上休止）。', '弱い位置で打ち、次の拍頭をまたいで伸ばす（または拍頭で休む）。', 'Syncopation: attack on a weak position and hold through the next beat (or rest on the beat).'), go: { a: 'swing', b: 'B4-1' } },
  'wrong-meter': { skill: 'hearing', label: t('拍号设置不对', '拍子の設定が違う', 'Wrong meter setting'), advice: t('先确认拍号与每格的时值。', '拍子とマスの音価を確認。', 'Check the time signature and the cell value.'), go: { a: 'meter' } },
  'wrong-length': { skill: 'hearing', label: t('小节长度不对', '小節の長さが違う', 'Wrong bar length'), advice: t('格子数 = 每小节拍数 × 每拍格数。', 'マス数 = 1 小節の拍数 × 1 拍のマス数。', 'Cells = beats per bar × cells per beat.'), go: { a: 'meter' } },
  'wrong-ratio': { skill: 'hearing', label: t('复节奏比例不对', 'ポリリズムの比が違う', 'Wrong polyrhythm ratio'), advice: t('3:2 是同一段时间里一条打 3 下、另一条打 2 下。', '3:2 は同じ時間に片方 3 打、もう片方 2 打。', '3:2 means three attacks against two in the same span.'), go: { b: 'B4-10', tool: { feature: 'rhythm', q: '@sub:poly' } } },
  'tempo-calculation': { skill: 'calc', label: t('速度换算错', 'テンポ換算の誤り', 'Tempo calculation error'), advice: t('新速度 = 旧速度 × 新小节里枢纽时值的个数 ÷ 旧小节里的个数。', '新テンポ = 旧テンポ × 新しい小節の枢軸音価の数 ÷ 旧い小節の数。', 'New tempo = old tempo × pivot values per new unit ÷ pivot values per old unit.'), go: { b: 'B4-10', tool: { feature: 'rhythm', q: '@sub:poly' } } },
  'tool-setting': { skill: 'apply', label: t('工具里的设置不对', 'ツールの設定が違う', 'Tool not set as required'), advice: t('按任务条上的要求设置工具，再提交。', 'タスクバーの指示どおりに設定してから提出。', 'Set the tool as the task bar asks, then submit.'), go: {} },
  'not-auditioned': { skill: 'apply', label: t('没有试听', '試聴していない', 'Not auditioned'), advice: t('提交前先在工具里播放一遍，用耳朵确认。', '提出前にツールで再生して耳で確かめる。', 'Play it in the tool before submitting and check by ear.'), go: {} },
  'normal-order': { skill: 'calc', label: t('标准顺序算错', '正規順序の誤り', 'Normal order wrong'), advice: t('排成升序后找最紧凑的旋转（首尾距离最小）。', '昇順に並べ、最も詰まった回転（端から端が最小）を探す。', 'Sort ascending and pick the most compact rotation (smallest span).'), go: { a: 'setclass' } },
  'prime-form': { skill: 'calc', label: t('原型算错', 'プライム・フォームの誤り', 'Prime form wrong'), advice: t('标准顺序和它的倒影都移到 0 开头，取更靠左紧凑的那个。', '正規順序とその反行を 0 始まりに移し、より左に詰まった方を取る。', 'Transpose the normal order and its inversion to start on 0 and keep the one packed more to the left.'), go: { a: 'setclass' } },
  'interval-vector': { skill: 'calc', label: t('音程级向量算错', '音程クラス・ベクトルの誤り', 'Interval vector wrong'), advice: t('把每一对音的音程级都数一遍，按 1–6 分别计数。', 'すべての音の対の音程クラスを数え、1〜6 ごとに集計。', 'Count the interval class of every pair, tallying 1 to 6.'), go: { a: 'setclass' } },
  'tap-missed': { skill: 'hearing', label: t('漏打', '打ち漏れ', 'Missed attacks'), advice: t('先放慢速度，跟着节拍器数拍，再一边数一边打。', 'テンポを落とし、メトロノームで数えながら打つ。', 'Slow down, count along with the click, then tap while counting.'), go: { b: 'B4-10' } },
  'tap-extra': { skill: 'hearing', label: t('多打', '余分な打点', 'Extra taps'), advice: t('只在起音的位置打，延长的音不要再打。', '打点の位置だけ打ち、伸ばす音は打たない。', 'Tap only on attacks — not on sustained notes.'), go: { b: 'B4-10' } },
  'incomplete-chord': { skill: 'spell', label: t('和弦音不完整', '構成音が足りない', 'Incomplete chord'), advice: t('先列出这个和弦该有的音（根、三、七，以及标记写出的延伸音），再逐个打勾。', 'まずこの和音に必要な音（根音・3 度・7 度・記号にある拡張音）を書き出し、1 つずつ確認。', 'List the tones the chord needs (root, 3rd, 7th and any named extension) and tick them off.'), go: { a: 'sevenths', b: 'B2-1' } },
  'rough-voice-leading': { skill: 'voiceLeading', label: t('声部移动太多', '声部の動きが大きい', 'Too much voice motion'), advice: t('声部要"懒"：共同音先保持，其次走半音或全音，跳进留给真正需要的地方。', '声部は「怠け者」に：共通音を保ち、次に半音・全音、跳躍は必要な所だけ。', 'Keep voices lazy: hold common tones, then move by half or whole step; save leaps for when you need them.'), go: { a: 'jazzvoicing', b: 'B4-5' } },
  'missing-guide-tone': { skill: 'voiceLeading', label: t('少了三音或七音', '第 3・7 音が足りない', 'Missing 3rd or 7th'), advice: t('三音和七音决定和弦性质，五音可以省，这两个不能省。', '第 3 音と第 7 音が和音の種類を決める。5 度は省けてもこの 2 つは省かない。', 'The 3rd and 7th define the quality; drop the 5th, never these.'), go: { a: 'jazzvoicing', b: 'B4-5' } },
  'root-in-voicing': { skill: 'apply', label: t('上方声部弹了根音', '上声で根音を弾いた', 'Root in the voicing'), advice: t('有低音时根音交给低音，上方声部留给三音、七音和延伸音。', 'ベースがいる時は根音を任せ、上声は 3 度・7 度・拡張音に。', 'With a bassist, leave the root to them; give the hands the 3rd, 7th and extensions.'), go: { a: 'jazzvoicing', b: 'B4-5' } },
  'avoid-note': { skill: 'apply', label: t('用了 avoid note', 'アヴォイド・ノート', 'Avoid note'), advice: t('大三和弦上的纯 11 音在三音上方半音，和三音冲突；改成 ♯11 或去掉。', '長三和音上の完全 11 度は第 3 音の半音上でぶつかる。♯11 にするか省く。', 'A natural 11th over a major-third chord sits a half step above the 3rd; raise it to ♯11 or drop it.'), go: { a: 'jazzvoicing', b: 'B4-5' } },
  'voicing-register': { skill: 'apply', label: t('延伸音放得太低', '拡張音の位置が低い', 'Extension voiced too low'), advice: t('13 音放在七音上方，否则听起来就是 6 音。', '13th は第 7 音より上に。下だと 6th に聞こえる。', 'Put the 13th above the 7th, or it sounds like a 6th.'), go: { a: 'jazzvoicing', b: 'B4-5' } },
  'missing-tie': { skill: 'hearing', label: t('没有跨拍连音', '拍をまたぐタイがない', 'No tie across the beat'), advice: t('把一个音用连音线连过下一个拍点：第二个音不再重新奏出。', '1 つの音をタイで次の拍の頭までつなぐ。2 つ目は弾き直さない。', 'Tie a note over the next beat; the tied-to note is not re-struck.'), go: { a: 'rhythm', b: 'B4-1' } },
  'illegal-duration': { skill: 'hearing', label: t('时值写法不合法', '音価の書き方の誤り', 'Illegal duration'), advice: t('连音线只连同一个音高的音，休止符不用连音线。', 'タイは同じ高さの音どうしだけ。休符にタイは付けない。', 'Ties join notes of the same pitch only; rests are never tied.'), go: { a: 'rhythm' } },
  'lost-pulse': { skill: 'hearing', label: t('拍子听不出来', '拍子が聞こえない', 'Meter lost'), advice: t('切分要有拍子当参照：每小节至少留一个落在拍点上的音。', 'シンコペーションには拍の基準が要る。各小節に拍の頭の音を 1 つは残す。', 'Syncopation needs a pulse to push against: keep at least one attack on a beat in each bar.'), go: { a: 'meter', b: 'B1-2' } },
  'incomplete-work': { skill: 'apply', label: t('还没写完', 'まだ途中', 'Not finished'), advice: t('先把要求的部分都写出来，评分会按写了的部分算。', 'まず求められた部分をすべて書こう。採点は書いた分で数える。', 'Write every required part first; scoring counts what is there.'), go: {} },
  polymeter: { skill: 'identify', label: t('复节奏 / 复拍子分不清', 'ポリリズムとポリメーターの混同', 'Polyrhythm vs polymeter'), advice: t('问自己：是两个拍号同时存在（复拍子），还是同一个拍子里几种节奏交错（复节奏）？', '2 つの拍子が同時にある（ポリメーター）か、1 つの拍子の中でリズムが交差する（ポリリズム）か。', 'Ask: are two meters running at once (polymeter), or are rhythms crossing inside one meter (polyrhythm)?'), go: { b: 'B4-10', tool: { feature: 'rhythm', q: '@sub:poly' } } },
  'meter-grouping': { skill: 'hearing', label: t('拍组听错', '拍のまとまりの聞き違い', 'Wrong beat grouping'), advice: t('跟着重音数八分音符：3+2 是一长一短，2+3 是一短一长。', 'アクセントに合わせて 8 分音符を数える：3+2 は長・短、2+3 は短・長。', 'Count eighths from accent to accent: 3+2 is long–short, 2+3 short–long.'), go: { a: 'meter2', b: 'B4-10' } },
  'mm-type': { skill: 'identify', label: t('节拍调制的类型认错', 'メトリック・モジュレーションの種類の誤り', 'Wrong kind of metric modulation'), advice: t('看"等号"两边哪个时值不变：细分不变还是拍子不变。', '「=」の両側で変わらない音価を見る：細分か拍か。', 'See which value stays fixed across the “=”: the subdivision or the beat.'), go: { b: 'B4-10', tool: { feature: 'rhythm', q: '@sub:poly' } } },
  'unknown-lab': { skill: 'apply', label: t('实操任务不存在', '実習が見つからない', 'Unknown lab'), advice: t('回到课程重新打开这个任务。', 'コースに戻ってもう一度開く。', 'Go back to the course and reopen the task.'), go: {} },
};

/** 结果页用：把错误次数汇总成按技能分组的推荐 */
export function recommend(errorCounts) {
  return Object.entries(errorCounts)
    .filter(([type]) => ERRORS[type])
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({ type, count, ...ERRORS[type] }));
}

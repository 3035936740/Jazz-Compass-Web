// ref:koozin-planing
// Original questions checked against the definitions and calculations in these sources.
// ref:rubin-nonfunctional ref:arndt-tonality ref:ircam-spectral ref:ircam-spectrum ref:gann-ji ref:gann-ji-reasons
import { t, cents, TOPICS } from './modern_harmony_course.js?v=20261010-talk1';
const pick = (rng, xs) => xs[Math.floor(rng() * xs.length)];
const names = ['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];
export const note = (n) => names[((n % 12) + 12) % 12];
export const pitch = (n) => `${note(n)}${Math.floor(n / 12) - 1}`;
const show = (ns) => ns.map(pitch).join(' – ');
const fmt = (n) => Number(n.toFixed(2)).toString();
const refs = (id) => TOPICS.find((x) => x.id === id).ref;
function Q(ref, prompt, correct, wrong, explain, hint, audio) {
  const options = [correct, ...wrong];
  if (new Set(options.map((x) => JSON.stringify(x))).size !== options.length) throw new Error('Duplicate modern harmony options');
  return { type: 'choice', ref, prompt, options, answer: 0, explain, hint, ...(audio ? { audio } : {}) };
}
const contextHint = t('按题目给出的规则和证据判断，不凭和弦名字猜。', '指定された規則と証拠で判断し、和音名だけで推測しない。', 'Use the stated rule and evidence, not just a chord name.');
export const MODERN_GENERATORS = {
  modernPlaning: { ref: refs('nonfunctional'), make(rng, { stage = 0 } = {}) {
    const ref = refs('nonfunctional');
    const r = pick(rng, [48,50,53,55,57]), shift = pick(rng,[1,2,3,5]);
    const ns = [r,r+4,r+7];
    if (stage < 2) return Q(ref,
      t(`按实际键位把 ${show(ns)} 各升 ${shift} 个半音，严格保持内部距离。结果是？`, `${show(ns)} の各音を半音 ${shift} つ上げ内部距離を厳密に保つ。結果は？`, `Raise every pitch of ${show(ns)} by ${shift} semitones, preserving exact internal gaps. Result?`),
      show(ns.map((n)=>n+shift)), [show([r+shift,r+shift+3,r+shift+7]),show([r+shift,r+shift+4,r+shift+8]),show(ns)],
      t('三个声部移动量相同，内部距离保持 4、3 个半音。音名仅表示这里的键位。', '3 声部を同量移動し内部距離は半音 4、3 のまま。ここでの音名は鍵の位置を表す。', 'All three voices move equally, preserving internal gaps of 4 and 3 semitones. Note labels here identify keyboard positions.'), contextHint,
      { notes: ns, mode:'melody', chord: ns, label:t('听原和弦：先逐音，再一起','元の和音：各音の後に同時に聴く','Hear the original: individual notes, then together') });
    if (stage === 2) {
      const cases = [[t('C 大调','C 長調','C major'),'C4 E4 G4','D4 F4 A4',t('小三和弦', '短三和音', 'Minor triad')],[t('G 大调','G 長調','G major'),'G3 B3 D4','A3 C4 E4',t('小三和弦','短三和音','Minor triad')],[t('C 大调','C 長調','C major'),'D4 F4 A4','E4 G4 B4',t('小三和弦','短三和音','Minor triad')],[t('C 大调','C 長調','C major'),'E4 G4 B4','F4 A4 C5',t('大三和弦','長三和音','Major triad')]];
      const [key, start, end, answer] = pick(rng,cases);
      const other = answer.zh === '小三和弦' ? t('大三和弦','長三和音','Major triad') : t('小三和弦','短三和音','Minor triad');
      return Q(ref,t(`限定 ${key.zh} 的音阶音，${start} 各升一个音阶位置得到 ${end}。结果的性质是？`, `${key.ja} の音に限定し ${start} を各 1 音階位置上げると ${end}。結果の種類は？`, `Within ${key.en}, move ${start} up one scale position in each voice to get ${end}. Resulting quality?`),answer,[other,t('增三和弦','増三和音','Augmented triad'),t('减三和弦','減三和音','Diminished triad')],t('调内平行遵守音阶位置，内部半音距离可以变化；根据题中结果辨认性质。','音階内の平行移動では内部の半音距離が変わりうる。指定された結果の種類を判定する。','Diatonic planing follows scale positions and may change semitone gaps. Identify the quality of the given result.'),contextHint);
    }
    if (stage === 3) return Q(ref,t(`${show(ns)} 与 ${show([r-3,r,r+4])} 共有哪两个音高？`, `${show(ns)} と ${show([r-3,r,r+4])} が共有する 2 音高は？`, `Which two pitches do ${show(ns)} and ${show([r-3,r,r+4])} share?`),show([r,r+4]),[show([r,r+7]),show([r-3,r+4]),show([r+4,r+7])],t('取两组实际音高的交集；共同音本身不能证明功能或转调。','2 組の実音高の共通部分を取る。共通音だけで機能や転調は証明できない。','Intersect the two pitch lists. Common tones alone do not establish function or modulation.'),contextHint);
    return Q(ref,t(`一段反复保留低音 ${pitch(r)}，上方三和弦同形移动，未给出属—主终止。最有证据的描述是？`, `低音 ${pitch(r)} を反復・保持し上の三和音が同形移動、属—主終止は示されない。証拠に合う記述は？`, `A passage repeats and sustains bass ${pitch(r)} while upper triads plane, with no dominant-to-tonic cadence supplied. Best-supported description?`),
      t('有中心线索，上方以平行移动连接','中心の手がかりがあり上は平行移動でつながる','Evidence of a centre; upper chords connect by planing'),[t('没有终止，所以整首必定无调性','終止がないから全曲は必ず無調','No cadence, so the whole piece must be atonal'),t('所有和弦必定都是属功能','全和音が必ず属機能','Every chord must be dominant-function'),t('已经证明两个调同时存在','2 調の同時存在が証明された','Two simultaneous keys have been proved')],t('持续和强调的低音是中心线索；结论限于本段，中心与功能分别判断。','持続・強調低音は中心の手がかり。結論はこの部分に限定し中心と機能を分ける。','A sustained, emphasized bass suggests a centre. Restrict the conclusion to this passage and separate centre from function.'),contextHint);
  } },
  modernLayers: { ref: refs('polytonality'), make(rng, { stage = 0 } = {}) {
    const ref = refs('polytonality');
    const [a,b] = pick(rng,[[0,2],[0,6],[0,7],[0,5],[2,8]]);
    const pair = `${note(a)} / ${note(b)}`;
    if (stage < 2) return Q(ref,t(`两条同时活动的声部各自反复强调 ${pair}，各自音阶、乐句也支持不同中心。这里最具体的描述是？`, `同時に動く 2 声部が ${pair} を各々反復・強調し、音階とフレーズも別中心を支える。最も具体的な記述は？`, `Two simultaneous layers repeatedly emphasize ${pair}; their scales and phrases also support distinct centres. Most specific description?`),t('双调性','複調性','Bitonality'),[t('只有先后转调','時間的な転調だけ','Successive modulation only'),t('必定只有一个中心','必ず中心は 1 つだけ','Necessarily only one centre'),t('仅凭一个复合和弦作判断','複和音 1 つだけで判定','A verdict based only on one polychord')],t('同时、两个不同中心、各层支持证据都已给出；这比仅有叠置和弦的证据强。','同時性、異なる 2 中心、各層の証拠が指定されており、和音の重なりだけより強い証拠。','Simultaneity, distinct centres and evidence in each layer are all supplied, exceeding the evidence of a stacked chord alone.'),contextHint);
    if (stage === 2) {
      const all = [...new Set([a,(a+4)%12,(a+7)%12,b,(b+4)%12,(b+7)%12])];
      return Q(ref,t(`${note(a)} 大三与 ${note(b)} 大三叠置，按键位、不计八度和重复，有几个不同音级？`, `${note(a)} 長三と ${note(b)} 長三を重ね、鍵の位置でオクターヴと重複を除くと何音級？`, `Stack ${note(a)}-major and ${note(b)}-major triads. Counting keyboard pitch classes without octaves or duplicates, how many distinct pcs?`),String(all.length),[3,4,5,6,7].filter((n)=>n!==all.length).slice(0,3).map(String),t(`去重后：${all.map(note).join(', ')}。这只是纵向集合，尚不能证明双调性。`, `重複を除くと ${all.map(note).join(', ')}。縦の集合だけでは複調性の証明にはならない。`, `After removing duplicates: ${all.map(note).join(', ')}. This vertical collection alone does not prove bitonality.`),contextHint);
    }
    if (stage === 3) return Q(ref,t(`想让 ${pair} 两个不同中心的同时声部更容易分辨，哪种安排直接保留各层归属？`, `${pair} の別中心の同時声部を聴き分けやすくするには、どの配置が層の所属を保つ？`, `To distinguish simultaneous ${pair} layers with different centres, which arrangement preserves each layer’s identity?`),t('分别安排音区与节奏，保留各层的中心强调','音域とリズムを分け、各中心の強調を保つ','Separate registers and rhythms; retain each centre’s emphasis'),[t('删除声部标记，只保留合并音集','声部ラベルを消し統合集合だけ残す','Delete layer labels and keep only a merged collection'),t('只提高总音量就能证明多调性','全体を大きくすれば多調性が証明される','Higher overall volume proves polytonality'),t('把所有声部改成同一条旋律','全声部を同じ旋律にする','Replace every voice with one melody')],t('分层提高可辨性，中心证据仍需保留。音区与节奏差异本身不等于多调性。','層の分離は識別を助けるが中心の証拠も要る。音域とリズム差だけでは多調性にならない。','Layer separation aids clarity, while centre evidence remains necessary. Register and rhythm differences alone do not imply polytonality.'),contextHint);
    const cases = [
      [t(`${note(a)} 调完整片段结束后才开始 ${note(b)} 调片段，没有重叠。`, `${note(a)} 調の部分終了後に ${note(b)} 調が始まり、重なりはない。`, `A ${note(a)}-key passage ends before the ${note(b)}-key passage begins; no overlap.`),t('先后的调性变化','時間的な調の変化','Successive tonal change')],
      [t(`只给 ${pair} 三和弦的一次叠置，没有各层后续材料。`, `${pair} 三和音を 1 度重ねただけで、各層の続きはない。`, `Only one stacked pair of ${pair} triads is supplied, with no continuing layer material.`),t('双调性证据不足','複調性の証拠が不足','Insufficient evidence of bitonality')],
      [t(`${note(a)} 大调与同主音小调材料混用，仍持续强调同一个 ${note(a)} 中心。`, `${note(a)} 長調と同主短調の素材を混ぜ、同じ ${note(a)} 中心を持続・強調。`, `Major and parallel-minor material on ${note(a)} is mixed while maintaining one ${note(a)} centre.`),t('同一中心的调式混合','同一中心の旋法混合','Modal mixture around one centre')],
    ];
    const [scenario,correct] = pick(rng,cases);
    return Q(ref,t(`${scenario.zh} 最合适的描述是？`, `${scenario.ja} 最適な記述は？`, `${scenario.en} Best description?`),correct,[...cases.map((x)=>x[1]).filter((x)=>x!==correct),t('已经证实双调性','複調性が証明された','Established bitonality')],t('分别检查是否同时、是否有不同中心、是否有持续支持；仅叠置不能代替这些证据。','同時性、別中心、持続的証拠を別々に確認する。重ねただけでは代わりにならない。','Check simultaneity, distinct centres and sustained support separately; stacking alone cannot replace those conditions.'),contextHint);
  } },
  modernMotive: { ref: refs('atonality'), make(rng, { stage = 0 } = {}) {
    const ref = refs('atonality');
    const r=pick(rng,[60,62,65,67]), a=pick(rng,[1,2,3]), b=pick(rng,[4,5,6]), ns=[r,r+a,r+a+b];
    if (stage === 0 || stage === 4) return Q(ref,t(`只给三音动机 ${show(ns)} 及其整体移高版本。能确认哪件事？`, `3 音動機 ${show(ns)} とその全体の移高形だけが示される。何を確認できる？`, `Only ${show(ns)} and a transposed copy of this three-note motive are supplied. What can be established?`),
      t('两次的相邻距离关系相同','2 回の隣接距離関係は同じ','The adjacent-gap pattern is preserved'),[t('整首作品必定无调性','全曲は必ず無調','The whole work must be atonal'),t('已经构成完整十二音列','完全な十二音列ができた','A complete twelve-tone row has been formed'),t('已经证明新调的属—主终止','新調の属—主終止が証明された','A dominant-to-tonic cadence in a new key is proved')],t('完整分析需要更多上下文。这里能验证的是局部距离和移位操作；无调性也可以有清楚组织。','全体の分析には文脈が必要。確認できるのは局所の距離と移高で、無調にも明確な組織はありうる。','A whole-piece analysis needs context. This establishes local gaps and transposition; atonal music can still have clear organisation.'),contextHint,{notes:ns,mode:'melody'});
    if(stage===1) return Q(ref,t(`${show(ns)} 按所列实际音高依次演奏，相邻有向半音距离是？`, `${show(ns)} を実際の音高で順に演奏。隣接する有向半音距離は？`, `Play ${show(ns)} in the stated register and order. Directed adjacent semitone gaps?`),`+${a}, +${b}`,[`+${b}, +${a}`,`−${a}, −${b}`,`+${a}, +${a+b}`],t('逐对计算后一音减前一音，顺序、方向和八度都保留。','各対で後の音高から前を引き、順序・方向・オクターヴを保つ。','Subtract each preceding pitch from the next, retaining order, direction and octave.'),t('分别算第二音−第一音、第三音−第二音。','第 2−第 1、第 3−第 2 を別々に計算。','Compute second minus first, then third minus second.'));
    if(stage===2) {
      const k=pick(rng,[2,3,4,5]);
      return Q(ref,t(`将 ${show(ns)} 每个音都升 ${k} 个半音。哪组完整保留动机结构？`, `${show(ns)} の全音を半音 ${k} つ上げる。動機構造を保つ組は？`, `Raise every note of ${show(ns)} by ${k} semitones. Which preserves the whole motive?`),show(ns.map(n=>n+k)),[show([r+k,r+a+k+1,r+a+b+k]),show(ns),show(ns.map(n=>n-k))],t('整体同量移动保留每对音的差值；它不自动证明调性转调。','全体を同量移動すると差は不変であり、自動的に転調を証明しない。','Equal movement of all pitches preserves differences; it does not automatically establish modulation.'),contextHint);
    }
    return Q(ref,t(`原动机 ${show(ns)} 的距离是 +${a}、+${b}。只倒着读音的顺序，距离变成？`, `原動機 ${show(ns)} の距離は +${a}、+${b}。音の順だけ逆に読むと？`, `The original ${show(ns)} has gaps +${a}, +${b}. Reverse only the note order. New gaps?`),`−${b}, −${a}`,[`−${a}, −${b}`,`+${b}, +${a}`,`+${a}, +${b}`],t('倒着读同时倒转距离顺序与方向；保持起音只反方向是另一种操作。','逆順は距離の順序と方向を両方変える。起音を保ち方向だけ変える操作とは異なる。','Reversing note order reverses both gap order and direction, unlike retaining the start and reversing directions alone.'),contextHint);
  } },
  spectralPartial: { ref: refs('spectralharmony'), make(rng, { stage = 0 } = {}) {
    const ref = refs('spectralharmony');
    const root=pick(rng,[80,100,110,125]), n=pick(rng,[3,4,5,6,7]);
    if(stage<2) return Q(ref,t(`理想谐波模型，基频 ${root} Hz 记为第 1 分音。第 ${n} 分音频率是多少 Hz？`, `理想調和モデルで基周波数 ${root} Hz が第 1 部分音。第 ${n} 部分音は何 Hz？`, `In an ideal harmonic model, fundamental ${root} Hz is partial 1. Frequency in Hz of partial ${n}?`),String(root*n),[String(root*(n-1)),String(root*(n+1)),String(root+n)],t('理想谐波模型中 fₙ=n×f₀。分音编号不是音程度数，基频也计入编号。','理想調和モデルでは fₙ=n×f₀。番号は音程の度数ではなく、基音も番号に含む。','In this ideal model fₙ=n×f₀. A partial number is not an interval number; the fundamental is counted.'),t('用编号乘基频。','番号×基周波数。','Multiply the partial number by the fundamental.'));
    if(stage===2) {
      const ratio=pick(rng,[5/4,7/4,3/2,11/8]), label=({1.25:'5/4',1.75:'7/4',1.5:'3/2',1.375:'11/8'})[ratio], original=cents(ratio), approx=Math.round(original/100)*100, err=approx-original;
      return Q(ref,t(`比例 ${label} 约 ${fmt(original)} 音分；按最近的十二平均律半音取 ${approx} 音分。误差“近似−原值”约是多少音分？`, `比 ${label} は約 ${fmt(original)} セント。最近の 12 平均律半音 ${approx} に近似。誤差「近似−元」は約何セント？`, `Ratio ${label} is about ${fmt(original)} cents. Round to the nearest 12-EDO semitone, ${approx} cents. Approximate error “approximation minus original” in cents?`),fmt(err),[fmt(-err),fmt(err+100),fmt(err-100)],t('先用未舍入的 1200×log₂(比例)，再用近似值减原值；正号表示近似音更高。','丸め前の 1200×log₂(比) を求め、近似から引く。正なら近似音が高い。','Use unrounded 1200×log₂(ratio), then subtract it from the approximation. Positive means the approximation is sharper.'),t('注意减法顺序；选项按两位小数显示。','引き算の順序に注意。選択肢は小数 2 桁表示。','Mind subtraction order; choices show two decimal places.'));
    }
    if(stage===3) {
      const offset=pick(rng,[3,5,7]);
      return Q(ref,t(`明确给定基频 ${root} Hz。频率 ${root}、${2*root}、${3*root+offset} Hz 全部是该基频的整数倍吗？`, `基周波数を ${root} Hz と指定。${root}、${2*root}、${3*root+offset} Hz は全部その整数倍？`, `Given fundamental ${root} Hz, are ${root}, ${2*root} and ${3*root+offset} Hz all integer multiples of that fundamental?`),t('不是，第三项不是整数倍','違う、第 3 項は整数倍ではない','No; the third frequency is not an integer multiple'),[t('是，只要频率一直升高就行','はい、上昇していればよい','Yes; increasing frequencies suffice'),t('可以自行换基频来算作正确','基周波数を勝手に替えれば正解','Changing the given fundamental makes “yes” correct'),t('整数倍意味着频率相同','整数倍とは同じ周波数','Integer multiples mean identical frequencies')],t('各频率除以指定基频；第三项不整除。判断只针对这个明确模型。','各周波数を指定基周波数で割る。第 3 は整数にならず、このモデルについての判定。','Divide by the given fundamental: the third quotient is not an integer. This verdict is specific to the stated model.'),contextHint);
    }
    return Q(ref,t(`同一组 ${4*root}、${5*root}、${6*root} Hz，从同时发声改成依次进入；哪项直接改变？`, `同じ ${4*root}、${5*root}、${6*root} Hz を同時発音から順次進入へ変える。直接変わるのは？`, `Keep frequencies ${4*root}, ${5*root}, ${6*root} Hz but change simultaneous entries to successive ones. What directly changes?`),t('时间组织','時間の組織','Temporal organisation'),[t('频率比例必定改变','周波数比が必ず変わる','Frequency ratios necessarily change'),t('全部变成十二平均律','すべて 12 平均律になる','All pitches become 12-EDO'),t('已经复原真实乐器完整频谱','実楽器の全スペクトルが復元された','A real instrument’s full spectrum has been recreated')],t('频率集合和比例可以保持，时间关系改变。合成频率演示不等于真实音色复原。','周波数集合と比は保てるが時間関係は変わる。合成例は実音色の復元ではない。','The frequency set and ratios can remain fixed while timing changes. Synthesised pitches do not recreate actual timbre.'),contextHint);
  } },
  microChord: { ref: refs('microtonalharmony'), make(rng, { stage = 0 } = {}) {
    const ref = refs('microtonalharmony');
    const r=pick(rng,[160,200,220,240]);
    if(stage<2) return Q(ref,t(`基准 ${r} Hz，和弦比例 1:5/4:3/2。三个频率依次是（Hz）？`, `基準 ${r} Hz、和音の比 1:5/4:3/2。3 周波数を順に Hz で示すと？`, `Reference ${r} Hz, chord ratios 1:5/4:3/2. The three frequencies in order, in Hz?`),`${r}, ${r*5/4}, ${r*3/2}`,[`${r}, ${r*6/5}, ${r*3/2}`,`${r}, ${r*5/4}, ${r*2}`,`${r}, ${r+5/4}, ${r+3/2}`],t('每个比例乘同一基准。内侧音程另用 (3/2)/(5/4)=6/5，不把比例相加。','各比を同じ基準に掛ける。内側音程は (3/2)/(5/4)=6/5 で、比を足さない。','Multiply each ratio by the same reference. The upper interval is (3/2)/(5/4)=6/5, not a sum of ratios.'),t('频率＝基准×比例。','周波数＝基準×比。','Frequency = reference × ratio.'));
    if(stage===2) {
      const N=pick(rng,[19,24,31,53]), ratio=pick(rng,[5/4,3/2,7/4]), label=ratio===1.25?'5/4':ratio===1.5?'3/2':'7/4', k=Math.round(N*Math.log2(ratio));
      return Q(ref,t(`把 ${label} 用 ${N} EDO 的最近步数近似。每步 1200/${N} 音分，k=round(${N}×log₂(${label}))。k 是？`, `${label} を ${N} EDO の最近段数で近似。1 段 1200/${N} セント、k=round(${N}×log₂(${label}))。k は？`, `Approximate ${label} by the nearest step in ${N}-EDO: one step is 1200/${N} cents, k=round(${N}×log₂(${label})). Find k.`),String(k),[String(k-1),String(k+1),String(N)],t(`k=${k}，近似 ${fmt(k*1200/N)} 音分，误差 ${fmt(k*1200/N-cents(ratio))} 音分（近似−原值）。EDO 步不等于十二平均律半音。`, `k=${k}、近似 ${fmt(k*1200/N)} セント、誤差 ${fmt(k*1200/N-cents(ratio))}（近似−元）。EDO の段は 12 平均律半音とは限らない。`, `k=${k}: ${fmt(k*1200/N)} cents, error ${fmt(k*1200/N-cents(ratio))} cents (approximation minus original). An EDO step is not necessarily a 12-EDO semitone.`),t('先算目标在这一律制里占多少步，再四舍五入。','まず目標の段数を求めてから丸める。','Find the target’s step count in this tuning, then round.'));
    }
    if(stage===3) {
      const old=r*5/4, next=r*10/11;
      return Q(ref,t(`旧基准 ${r} Hz，5/4 音=${old} Hz。新基准设为 ${fmt(next)} Hz（精确值为 ${r}×10/11）。要保留原频率，新比例应是？`, `旧基準 ${r} Hz の 5/4 音は ${old} Hz。新基準は ${fmt(next)} Hz（正確には ${r}×10/11）。元周波数を保つ新比は？`, `The 5/4 tone above ${r} Hz is ${old} Hz. New reference: ${fmt(next)} Hz (exactly ${r}×10/11). Which new ratio retains the original frequency?`),'11/8',['5/4','3/2','1/1'],t('共同音频率÷新基准=(5/4)/(10/11)=11/8；同一比例换了基准会换频率。','共通音周波数÷新基準=(5/4)/(10/11)=11/8。同じ比でも基準変更で周波数は変わる。','Retained frequency divided by new reference gives (5/4)/(10/11)=11/8. Reusing a ratio at a new reference retunes the pitch.'),contextHint);
    }
    return Q(ref,t(`要让别人复现以 ${r} Hz 为基准的微分音和声方案，哪份记录最完整？`, `${r} Hz を基準とする微分音和声案を再現するには、どの記録が最も完全？`, `Which record best lets another player reproduce a microtonal harmony design referenced to ${r} Hz?`),t('基准、比例或步数、Hz、进入时间与近似误差','基準・比か段数・Hz・進入時刻・近似誤差','Reference, ratios or steps, Hz, entry times and approximation errors'),[t('只写普通音名，不注明律制','普通の音名だけで音律は省く','Ordinary note names with no tuning'),t('只写“比钢琴好听”','「ピアノより良い響き」とだけ書く','Only “better sounding than piano”'),t('只写有多少个音','音の数だけを書く','Only the number of notes')],t('把可计算条件、时间关系和近似规则写清；美感判断不能替代演奏参数。','計算条件、時間関係、近似規則を明示する。好みは演奏パラメータの代わりにならない。','Specify calculable conditions, timing and approximation rules. Taste judgments do not replace performance parameters.'),contextHint);
  } },
};

// Scene data is independent of rendering and evaluation. Text follows the project's {zh,ja,en} convention.
export const t = (zh, en, ja = zh) => ({zh, en, ja});
export const CLAIM = 'MORE NOTES = BETTER JAZZ';
export const score = (bass, notes) => ({bass, voices:notes.map((midi,i)=>({id:`v${i+1}`,midi})), continuation:null});
const opening = [{symbol:'Dm7',bass:38,notes:[53,57,60],melody:69},{symbol:'G7',bass:43,notes:[59,62,65],melody:68}];
export const SCENARIOS = [
 {id:'prediction',phase:1,title:t('终止式，是习惯还是选择？','Cadence: habit or choice?','終止は習慣、それとも選択？'),kicker:'01 / THE PREDICTION',key:'C major',history:opening,previous:score(43,[59,62,65]),melody:67,
  goal:t('旋律 A → A♭ → G。让最后一拍有清楚的和声方向；可以落在主功能，也可以延后落地，但延后必须写出下一拍。','Melody A → A♭ → G. Give the last beat a clear harmonic direction. Resolve, or delay and write the following beat.','旋律 A → A♭ → G。主機能に着地するか、次の拍を書いて着地を遅らせる。'),
  families:['tonic','deceptive','delay','substitute'],requiredColors:[],usefulColors:[2,9],space:'open',reward:10,
  intent:t('我在猜你会落到 I。每次猜中充能 +1；第 4 回合后，我的独奏会完成充能。','I predict tonic. Each correct prediction adds 1 charge. After turn 4, my solo finishes charging.','I への着地を予測。的中で充電 +1。第4ターン後は独奏で充電を完成。'),
  line:t('来。你不是会 ii–V–I 吗？','Come on. You know your ii–V–I, right?','さあ。ii–V–I は知っているだろう？')},
 {id:'dark-color',phase:2,title:t('这里，少一个音反而不够。','Here, one less note is not enough.','ここでは、音を減らすだけでは足りない。'),kicker:'02 / NECESSARY TENSION',key:'C major',history:[{symbol:'Dm7',bass:38,notes:[53,57,60],melody:69}],previous:score(43,[59,62,65]),melody:76,
  goal:t('保持 G 的属功能。上方旋律 E 要保留；伴奏要出现暗色的半音张力（♭9），并维持清楚的 3rd / 7th。色彩是这句音乐的要求。','Keep dominant function on G and melody E. The accompaniment needs dark semitone tension (♭9) and clear third/seventh. This phrase needs that colour.','G の属機能と旋律 E を保持。伴奏に暗い半音の緊張（♭9）と明確な3度・7度が必要。'),
  families:['dominant'],requiredColors:[8],usefulColors:[8,4],space:'open',reward:18,
  intent:t('你若把这句也当成“下一个一定是 I”，我就继续充能。这个回合是属功能的延长。','Treat this as another automatic tonic and I charge again. This turn prolongs dominant function.','また機械的に I に進むなら充電。今回は属機能の延長だ。'),line:t('只留骨架？好啊。那我要的暗色，谁来弹？','Just the skeleton? Fine. Who will play the dark colour I need?','骨組みだけ？なら、必要な暗い色は誰が弾く？')},
 {id:'bright-color',phase:2,title:t('复杂，也可以有充分的理由。','Complexity can have a reason.','複雑さにも、理由はある。'),kicker:'03 / PURPOSEFUL COLOUR',key:'C major',history:[{symbol:'G7(♭9)',bass:43,notes:[59,65,68],melody:76}],previous:score(43,[59,65,68]),melody:81,
  goal:t('回到 C 的主功能。旋律 A 在高处展开；编配需要明亮悬浮的 ♯11 与 9。连接已有声部，新增色彩声部可以入场，不必把所有音塞进同一个八度。','Return to tonic C. High melody A opens up; the arrangement needs floating ♯11 and 9. Connect existing voices; new colour voices may enter in a wider register.','C の主機能へ。高い旋律 A に、浮遊感のある ♯11 と9を加える。既存声部は連結し、新しい色彩声部は広い音域で入れる。'),
  families:['tonic'],requiredColors:[6,2],usefulColors:[6,2,9],space:'open',reward:18,
  intent:t('主功能的落地仍在我的预判里。你会盲目少弹，还是把必要的色彩放回来？','Tonic is still in my prediction. Will you play less by habit, or restore the needed colour?','主機能への着地は予測内。習慣で減らすか、必要な色を戻すか？'),line:t('9！♯11！13！这回你不加，又拿什么完成这句？','9! ♯11! 13! This time, how will the phrase work if you add nothing?','9！♯11！13！今回は、足さずにどうやって音楽を完成させる？')},
 {id:'hold-bait',phase:2,title:t('这一次，他等着你继续叠。','This time, he wants you to keep adding.','今度は、さらに積むのを待っている。'),kicker:'04 / THE BAIT',key:'C major',history:[{symbol:'C / current',bass:48,notes:[59,64,66,74],melody:81}],previous:score(48,[59,64,66,74]),melody:74,
  goal:t('延续上一回合的 C 主功能与明亮色彩（9 / ♯11）。旋律移到 D；没有新的和声或色彩需求。可以保持，也可以重新编配，但新加的音必须有音乐作用。','Continue the previous C tonic with 9/♯11. Melody moves to D; there is no new harmonic or colour demand. Hold or rearrange, but new notes need a purpose.','前の C 主機能と9/♯11を持続。旋律は D。新しい和声・色彩の要求はない。維持か再編か、追加音には役割が必要。'),
  families:['tonic'],requiredColors:[6,2],usefulColors:[6,2,9],space:'open',reward:18,carry:true,
  intent:t('继续落在主功能会被预测。大炮尚未发射时，本段独奏将把充能补至 3/3。','A tonic continuation is predictable. If the cannon has not fired, this solo fills it to 3/3.','主機能の持続は予測内。未発射なら、この独奏で3/3まで充電する。'),line:t('已经不错了。但你不会觉得，还能再加几个吗？','Not bad. But surely you could add a few more?','悪くない。でも、まだ何音か足せるだろう？')}
];
export const FINAL = {id:'final',phase:3,title:t('每一个音，都需要理由。','Every note needs a reason.','すべての音に、理由を。'),kicker:'FINAL / YOUR ARRANGEMENT',key:'C major',history:[{symbol:'G7(♭9,13)',bass:43,notes:[59,65,68],melody:76}],previous:score(43,[59,65,68]),melody:86,
 goal:t('最终落在 C 的主功能，旋律 D 留在高音区。保留必要功能音，让声部平滑落地；这句需要 ♯11 的明亮悬浮与 13 的温暖。9 可由旋律承担。自由决定密度、八度和转位。','Land on tonic C with high melody D. Preserve function and smooth motion; this phrase needs floating ♯11 and warm 13. Melody may supply the ninth. Choose density, octaves and inversion freely.','高い旋律 D とともに C の主機能へ。機能と滑らかな連結、♯11 の浮遊感と13の温かさが必要。9は旋律で担える。密度・八度・転回は自由。'),
 families:['tonic'],requiredColors:[6,9],usefulColors:[6,9,2],space:'open',reward:35,intent:t('最后一次。把每个音的作用，直接弹出来。','One last time. Play the purpose of every note.','最後だ。各音の役割を、音楽で示せ。'),line:t('我会的，比这些还多。……可你为什么，选这些？','I know more than this. …But why did you choose these notes?','技術なら、もっとある。……でも、なぜこの音を選んだ？')};
export const CANNON = {id:'cannon',phase:2,title:t('大炮装填完毕。轮到你思考。','Cannon loaded. Time to think.','充電完了。考える番だ。'),kicker:'DEFENSE / II–V–I CANNON',key:'C major',melody:67,history:[...opening,{symbol:'Cmaj7',bass:48,notes:[59,64,67],melody:67}],
 goal:t('大炮堆满了 extensions。为 Dm7 → G7 → Cmaj7 编写两条持续的防御声部：每个和弦的功能必须可辨，连接必须平滑。没有倒计时；构造好再 GUARD。','The cannon is packed with extensions. Write two continuous defensive voices for Dm7 → G7 → Cmaj7. Each chord must remain identifiable and each voice move smoothly. No timer: build, then guard.','延伸音で満たされた砲撃。Dm7 → G7 → Cmaj7 に2つの持続する防御声部を作る。各和音の機能と滑らかな連結を保つ。時間制限なし。'),
 intent:t('我将发射 ii–V–I。你可以从完整音符结构中观察功能；单纯举盾只挡住一点点。','I will fire ii–V–I. Read its function from the note structure. Merely bracing blocks very little.','ii–V–I を発射する。音の構造から機能を読め。ただ構えるだけでは少ししか防げない。'),line:t('II！V！I——！<br>来，挡住我的全部技术！','II! V! I—!<br>Block every technique I have!','II！V！I——！<br>俺の技術を全部受けてみろ！')};
export const profiles = [
 {symbol:'Cmaj7',family:'tonic',root:0,core:[4,11],allowed:[0,2,4,6,7,9,11],guideTargets:[4,11]},
 {symbol:'C6',family:'tonic',root:0,core:[4,9],allowed:[0,2,4,6,7,9],guideTargets:[4,9]},
 {symbol:'Am7',family:'deceptive',root:9,core:[0,7],allowed:[9,0,4,7,11,2],guideTargets:[7,0]},
 {symbol:'G7',family:'dominant',root:7,core:[11,5],allowed:[7,11,2,5,8,9,1,3,4,10],guideTargets:[5,11]},
 {symbol:'G7',family:'delay',root:7,core:[11,5],allowed:[7,11,2,5,8,9,1,3,4,10],guideTargets:[5,11]},
 {symbol:'Db7',family:'substitute',root:1,core:[5,11],allowed:[1,5,8,11,3,7,10],guideTargets:[5,11]}
];
export const initialGuard = () => [[57,62],[62,67],[67,72]];
export const cloneScore = value => structuredClone(value);

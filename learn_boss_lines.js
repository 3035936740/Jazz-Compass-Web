// 乐理闯关 Boss 的全部台词（覆盖 learn_bosses.js 里的初稿台词）：每句都有多个版本，每次随机取一句，重玩时感觉不同。
// 中文按各角色的口吻写成口语（不逐字翻译日文 / 英文，三种语言各自自然）；人物设定见 jcchar/设定文案.txt。
// 禁用：网络梗（塞维尔）、大喊大叫和感叹号（零）、恶意羞辱（阿拉娅）；任何角色都不说"杂鱼"。
// 结局台词带表情：每一句切换一次立绘（boss_sprite.js 的纸片翻转）。
// 点 Boss 会说话；同一道题点太多次，Boss 会不小心说漏答案（{answer} 换成当前题的答案）。
const L = (zh, ja, en) => ({ zh, ja, en });
/** 结局一句：[表情, 台词] */
const S = (state, zh, ja, en) => [state, L(zh, ja, en)];

/** 角色共用的台词池 */
export const CAST_LINES = {
  mimi: {
    right: [L('嗯，对。', 'うん、正解。', 'Yep, right.'), L('就是这样，看清楚了。', 'そう、ちゃんと見えてる。', 'That’s it — you looked properly.'), L('对。下一题。', '正解。次。', 'Right. Next.'), L('数得清清楚楚。', 'ちゃんと数えられてる。', 'Counted cleanly.'), L('嗯，这才是认真看的样子。', 'うん、それがちゃんと見るってこと。', 'Mm, that’s what looking carefully looks like.'), L('好，这个记牢了。', 'よし、これは覚えておいて。', 'Good. Keep that one.')],
    wrong: [L('你数了没啊？', 'ちゃんと数えた？', 'Did you even count?'), L('别瞎蒙啊！', '当てずっぽうはやめて！', 'Stop guessing!'), L('这都能错？', 'これを間違える？', 'You missed THAT?'), L('看一眼？你那是瞄了一下吧。', '一目見た？チラ見でしょ。', 'A glance? That was a squint.'), L('先看解析，别急着往下点。', 'まず解説読んで。先に進まない。', 'Read the explanation first. Don’t rush.'), L('啧……再仔细点。', 'ちっ……もっとよく見て。', 'Tch… look closer.')],
    streak: [L('连着几题都稳稳的。', '何問も続けて安定してる。', 'Several in a row, nice and steady.'), L('嗯，你是一个一个数过来的。', 'うん、一つずつ数えてきたのね。', 'Mm, you’ve been counting each one.'), L('照这个节奏来。', 'その調子でいって。', 'Keep this pace.'), L('……行，我出难一点的。', '……いいよ、ちょっと難しくするね。', '…Okay, I’ll make it harder.')],
    wrong2: [L('停停停，慢一点，一个一个数。', 'ストップ。ゆっくり、一つずつ数えて。', 'Stop. Slow down. Count one by one.'), L('想错了不要紧，瞎蒙才不行。', '考えて間違えるのはいいの。当てずっぽうがダメ。', 'Getting it wrong is fine. Guessing isn’t.'), L('解析里那一步你漏了，回去看。', '解説のその一歩を飛ばしてる。戻って見て。', 'You skipped a step in the explanation. Go back.'), L('……我刚学的时候也会错啦。好吧，其实不会。但你可以练嘛。', '……私だって最初は間違え……いや、間違えなかったけど。あなたは練習すればいいの。', '…I used to get these wrong too. Okay, I didn’t. But you can practise.')],
    comeback: [L('嗯，后面稳下来了。', 'うん、後半は落ち着いてきた。', 'Mm, you’ve steadied.'), L('慢下来以后，就都对了吧？', 'ゆっくりやったら、全部合ってるでしょ？', 'Slow down and it all comes right, see?'), L('这样才对嘛。', 'そうそう、それでいいの。', 'That’s more like it.')],
    rematch: [L('又来啦？这回给我好好看。', 'また来たの？今度はちゃんと見て。', 'Back again? Look properly this time.'), L('题还是那些题。这回别靠记答案，一个一个数。', '問題は同じ。今度は答えを覚えてるからじゃなく、一つずつ数えて。', 'Same questions. This time don’t go from memory — count each one.'), L('行，再来就再来。', 'いいよ、もう一回ね。', 'Fine. Again.')],
    click: [L('干嘛戳我？', 'なに、つつかないで。', 'Why are you poking me?'), L('专心做题！', '問題に集中して！', 'Focus on the question!'), L('别戳了，很痒的。', 'やめて、くすぐったい。', 'Quit it, that tickles.'), L('我脸上又没有答案。', '私の顔に答えは書いてないよ。', 'The answer isn’t on my face.'), L('……你是不是不会？', '……分からないんでしょ？', '…You don’t know it, do you?'), L('再戳我就出更难的题。', 'もう一回つついたら、もっと難しい問題にするから。', 'Poke me again and I’ll make it harder.'), L('喂！手放下！', 'ちょっと！手をどけて！', 'Hey! Hands off!'), L('哼，看我也没用。', 'ふん、私を見ても無駄。', 'Hmph. Staring at me won’t help.')],
    leak: [L('啊烦死了别戳了！是「{answer}」啦！……我什么都没说！', 'もう、しつこい！「{answer}」だってば！……今のなし！', 'Ugh, stop it! It’s “{answer}”! …I didn’t say anything!'), L('好好好，「{answer}」！满意了吧！……这题不算你的。', 'はいはい、「{answer}」！これで満足？……この問題はノーカンね。', 'Fine, fine — “{answer}”! Happy now? …That one doesn’t count.')],
    leakedRight: [L('……那是我说漏的，不算你的。', '……それ、私がもらしたやつ。あなたの分じゃないから。', '…That was my slip. It doesn’t count for you.'), L('哼，答案都告诉你了，对了也不算！', 'ふん、答え教えちゃったんだから、正解でもノーカン！', 'Hmph, I told you the answer — doesn’t count!')],
    leakNote: [L('还有，有 {n} 题是我说漏的，那几题不算。……下次别戳我了。', 'それと、{n} 問は私がもらしたから、ノーカンね。……次はつつかないで。', 'Also, I leaked {n} — those don’t count. …Stop poking me next time.'), L('对了，{n} 题是我嘴快说出来的，没算进星星里。', 'あと、{n} 問は私が口をすべらせたから、星には入れてないよ。', 'Oh, and {n} I blurted out myself — not counted in your stars.')],
    greet: {
      1: [L('又是你啊。上次没输够？', 'またあなた？この前で懲りなかった？', 'You again? Didn’t learn last time?'), L('哦，是你。这回我可记住你了。', 'あ、あなたね。今度は顔、覚えたから。', 'Oh, it’s you. I remember you now.')],
      2: [L('……对手来了。', '……ライバルが来た。', '…My rival’s here.'), L('哼，你来了。这回我是认真的，对手。', 'ふん、来たね。今回は本気だよ、ライバル。', 'Hmph, you came. I’m serious this time, rival.')],
    },
    cameo: {
      done: [L('（米米探出头）嗯，这关还行。别骄傲啊。', '（ミミが顔を出す）うん、このステージはまあまあ。調子に乗らないでね。', '(Mimi peeks in) Mm, not bad for this level. Don’t get cocky.'), L('（米米）基础没丢吧？我盯着呢。', '（ミミ）基礎、忘れてないよね？見てるからね。', '(Mimi) Still got your basics? I’m watching.'), L('（米米）数清楚了没？……好吧，这次算你认真。', '（ミミ）ちゃんと数えた？……まあ、今回は真面目だったね。', '(Mimi) Did you count properly? …Fine, you were careful this time.')],
      test: [L('（米米）章节测试？别在最简单的地方翻车啊。', '（ミミ）章末テスト？一番簡単なところでコケないでよ。', '(Mimi) Chapter test? Don’t trip on the easy stuff.'), L('（米米）考完了？我就知道你不会栽在基础上。', '（ミミ）終わった？基礎でつまずかないって思ってたよ。', '(Mimi) Done? Knew you wouldn’t fall on the basics.')],
      mistake: [L('（米米）喂，这题慢一点就不会错了。', '（ミミ）ちょっと、ゆっくりやれば間違えないのに。', '(Mimi) Hey, slow down and you’d get that.'), L('（米米）……你刚才是不是没数？', '（ミミ）……今、数えなかったでしょ？', '(Mimi) …You didn’t count just now, did you?')],
      final: [L('（米米）结业了？……还记得第一章吗？我可记得你。', '（ミミ）修了？……第一章、覚えてる？私は覚えてるよ。', '(Mimi) Graduating? …Remember chapter one? I remember you.')],
      review: [L('（米米）复习？嗯，这才对。基础就是要反复练的。', '（ミミ）復習？うん、それでいいの。基礎は繰り返すものだから。', '(Mimi) Reviewing? Good. Basics need repetition.')],
    },
    shush: [L('不说了，自己想！', 'もう言わない、自分で考えて！', 'I’m not saying anything else!'), L('刚才那句你没听见。', 'さっきのは聞かなかったことにして。', 'You didn’t hear that.'), L('哼，不理你了。', 'ふん、知らない。', 'Hmph. Not talking to you.')],
  },
  sever: {
    right: [L('对。', '正しい。', 'Correct.'), L('可以。', 'よろしい。', 'Acceptable.'), L('依据充分。', '根拠は十分だ。', 'Well grounded.'), L('这个分析站得住。', 'その分析は成り立つ。', 'That analysis holds.'), L('继续。', '続けよ。', 'Continue.')],
    wrong: [L('错。', '誤りだ。', 'Wrong.'), L('名字对了，理解错了。', '名前は合っている。理解が違う。', 'Right name. Wrong understanding.'), L('你看见了和弦，没看见功能。', '和音は見えている。機能が見えていない。', 'You see the chord, not its function.'), L('再听一遍。', 'もう一度聴け。', 'Listen again.'), L('依据？', '根拠は？', 'On what grounds?'), L('先读解析。', 'まず解説を読め。', 'Read the explanation first.')],
    streak: [L('你在听关系，不是在背名字。', '名前ではなく関係を聴いているな。', 'You hear relations, not names.'), L('……继续保持。', '……その調子で。', '…Maintain this.'), L('（他的领口松开了一点。）', '（襟元が少し緩む。）', '(His collar loosens a little.)'), L('秩序清楚了。', '秩序が見えてきたな。', 'The order is becoming clear to you.')],
    wrong2: [L('停。先看解析，再看它要往哪儿走。', '止まれ。解説を読み、行き先を見よ。', 'Stop. Read the explanation, then see where it goes.'), L('规则不是拿来背的，是拿来解释连接的。', '規則は暗記するものではない。連結を説明するものだ。', 'Rules aren’t for memorising. They explain connections.'), L('从低音看起。永远从低音看起。', 'バスから見よ。常にバスからだ。', 'Start from the bass. Always the bass.'), L('不急。秩序需要时间。', '急ぐな。秩序には時間がかかる。', 'No hurry. Order takes time.')],
    comeback: [L('修正了。', '修正したな。', 'Corrected.'), L('错了之后怎么判断，才看得出水平。', '誤りの後の判断にこそ力量が出る。', 'Judgement after an error shows real skill.'), L('合理。', '合理的だ。', 'Reasonable.')],
    rematch: [L('再审一次。', 'もう一度審理する。', 'A retrial.'), L('上次的问题，想清楚了吗。', '前回の問い、考えはまとまったか。', 'Have you thought through last time’s questions?'), L('问题相同。这一次，说出你的依据。', '問いは同じだ。今度は根拠を述べよ。', 'The same questions. This time, state your grounds.')],
    click: [L('请勿触碰。', '触れるな。', 'Do not touch.'), L('考试期间，安静。', '審理中だ。静かに。', 'Silence during the examination.'), L('……有事？', '……何か用か。', '…Yes?'), L('我脸上没有乐谱。', '私の顔に楽譜はない。', 'There is no score on my face.'), L('请把注意力放回题目上。', '注意を問題に戻せ。', 'Return your attention to the question.'), L('这不在规则之内。', 'それは規則の範囲外だ。', 'That is outside the rules.'), L('（他整了整领口。）', '（彼は襟を正した。）', '(He straightens his collar.)')],
    leak: [L('……够了。答案是「{answer}」。这题不计入你的成绩——在我心里。', '……もういい。答えは「{answer}」だ。この問題は君の成績に入れない——私の中では。', '…Enough. The answer is “{answer}”. It will not count — in my judgement.'), L('你在干扰审判。……「{answer}」。我什么都没有说过。', '審理の妨害だ。……「{answer}」。私は何も言っていない。', 'You are obstructing the trial. …“{answer}”. I said nothing.')],
    leakedRight: [L('那一题，答案出自我口。不计。', 'その問題の答えは私の口から出た。数えない。', 'That answer came from my mouth. It does not count.'), L('正确。但依据不是你的。不计。', '正しい。だが根拠は君のものではない。数えない。', 'Correct. But the grounds were not yours. Not counted.')],
    leakNote: [L('另：{n} 题的答案是我说出的，未计入成绩。', 'なお、{n} 問は私が答えを言った。成績には入れていない。', 'Note: I gave away {n} answers. They were not counted.'), L('{n} 题，因我的失误而不计。下不为例。', '{n} 問は私の失態ゆえ数えない。二度目はない。', '{n} questions are void due to my lapse. It will not happen again.')],
    greet: {
      1: [L('又见面了。我记得你上一次的答卷。', 'また会ったな。前回の答案は覚えている。', 'We meet again. I remember your last paper.'), L('你。上次的审查，我还没忘。', '君か。前回の審査は忘れていない。', 'You. I have not forgotten the last review.')],
      2: [L('……是你。这次，我把你当作对手。', '……君か。今回は、君を対等な相手と見なす。', '…You. This time I regard you as an equal.'), L('对手到了。开始吧。', '相手が来た。始めよう。', 'My opponent has arrived. Let us begin.')],
    },
    cameo: {
      done: [L('（塞维尔）这一关的连接，站得住。', '（セヴェール）このステージの連結は、成り立つ。', '(Sever) The connections in this level hold.'), L('（塞维尔）……可以。继续。', '（セヴェール）……よろしい。続けよ。', '(Sever) …Acceptable. Continue.'), L('（塞维尔）依据都写清楚了吗？', '（セヴェール）根拠はすべて明記したか。', '(Sever) Have you stated all your grounds?')],
      test: [L('（塞维尔）测验。每一个答案，都要有依据。', '（セヴェール）試験だ。答えにはすべて根拠を。', '(Sever) An examination. Every answer needs grounds.'), L('（塞维尔）合格。秩序在你那边。', '（セヴェール）合格。秩序は君の側にある。', '(Sever) Passed. Order is on your side.')],
      mistake: [L('（塞维尔）错。先看低音。', '（セヴェール）誤りだ。まずバスを見よ。', '(Sever) Wrong. Look at the bass first.'), L('（塞维尔）名字对了吗？功能呢？', '（セヴェール）名前は合っているか。機能は？', '(Sever) Is the name right? And the function?')],
      final: [L('（塞维尔）结业。……你让我重新想了规则的意义。', '（セヴェール）修了か。……君は私に規則の意味を考え直させた。', '(Sever) Graduation. …You made me rethink what rules mean.')],
      review: [L('（塞维尔）复习是秩序的一部分。很好。', '（セヴェール）復習は秩序の一部だ。よろしい。', '(Sever) Review is part of order. Good.')],
    },
    shush: [L('不再回答。', 'これ以上は答えない。', 'No further answers.'), L('刚才是失误。', 'さっきのは失態だ。', 'That was a lapse.'), L('……请自重。', '……慎みたまえ。', '…Restrain yourself.')],
  },
  noa: {
    right: [L('嗯，就是这样。', 'うん、それ。', 'Yeah, like that.'), L('听出来了吧？', '聴こえたでしょ？', 'You heard it, right?'), L('这条线挺顺的。', 'この線、いい流れ。', 'That line flows nicely.'), L('嗯，走得挺稳。', 'うん、いい歩き方。', 'Mm, steady steps.'), L('对，慢慢就顺了。', 'そう、だんだん流れてくる。', 'Right — it starts to flow.')],
    wrong: [L('别急着找名字。', '名前を急がないで。', 'Don’t rush to the name.'), L('先听它往哪儿走。', 'まず、どこへ行くか聴いて。', 'First hear where it goes.'), L('两个声部撞上啦。', '二つの声部がぶつかったね。', 'The two voices bumped.'), L('嗯……再走一遍？', 'うーん……もう一回歩く？', 'Hmm… walk it again?'), L('没事没事，看看解析。', '大丈夫、解説見てみよ。', 'It’s fine. Check the explanation.')],
    streak: [L('开始会看线条了嘛。', '線が見えてきたね。', 'You’re starting to see lines.'), L('你已经不只是盯着和弦看了。', 'もう和音だけ見てないね。', 'You’re not just staring at chords anymore.'), L('嗯，一起走得挺合拍。', 'うん、いい感じで一緒に歩けてる。', 'Mm, we’re walking in step.'), L('……（他轻轻哼了一句。）', '……（彼は小さく口ずさむ。）', '…(He hums a little phrase.)')],
    wrong2: [L('歇一下，把这条线哼一遍。', 'ちょっと休んで、線を口ずさんでみて。', 'Take a breath. Hum the line.'), L('别只盯着一个瞬间，音乐是往前走的。', '一瞬だけ見ないで。音楽は前に進むんだ。', 'Don’t stare at one instant. Music moves on.'), L('解析里那一步，用耳朵试试。', '解説のその一歩、耳で試して。', 'Try that step from the explanation by ear.'), L('乱是乱了点，不过你没停下来。这挺重要。', 'ちょっとごちゃっとしてるけど、止まらなかった。それ大事。', 'A bit messy, but you kept going. That matters.')],
    comeback: [L('哦，绕回来了。', 'お、戻ってきた。', 'Oh, you found your way back.'), L('迷过路的人，路记得最清楚。', '迷った人ほど道を覚えるんだよ。', 'People who get lost remember the road best.'), L('嗯，顺起来了。', 'うん、流れてきた。', 'Mm, it’s flowing now.')],
    rematch: [L('又碰上了。走走？', 'また会ったね。歩く？', 'Ran into you again. Walk with me?'), L('上次那段路，这次换个方向走。', '前の道、今度は逆から行こう。', 'Same road as last time, other direction.'), L('不急。', '急がないよ。', 'No hurry.')],
    click: [L('嗯？', 'ん？', 'Hm?'), L('别戳啦，我在发呆。', 'つつかないで、ぼーっとしてるんだから。', 'Don’t poke me, I’m daydreaming.'), L('题在下面哦。', '問題は下だよ。', 'The question’s down there.'), L('……你要听我弹一段？', '……一曲弾いてほしいの？', '…Want me to play something?'), L('痒。', 'くすぐったい。', 'That tickles.'), L('我这儿没有答案，只有旋律。', 'ここに答えはないよ。旋律ならあるけど。', 'No answers here. Just melodies.'), L('慢慢想，我又不赶时间。', 'ゆっくり考えて。急いでないから。', 'Take your time. I’m not in a rush.')],
    leak: [L('这么想知道啊……是「{answer}」吧。嘘，别告诉塞维尔。', 'そんなに知りたいの……「{answer}」かな。しーっ、セヴェールには内緒。', 'You really want to know… it’s “{answer}”, I think. Shh, don’t tell Sever.'), L('嗯……「{answer}」。不过你自己听一遍会更有意思。', 'うーん……「{answer}」。でも自分で聴いたほうが面白いよ。', 'Mm… “{answer}”. But it’s more fun if you hear it yourself.')],
    leakedRight: [L('嗯……这题是我说的，就不算啦。', 'うーん……これは僕が言ったから、ノーカンね。', 'Mm… I told you that one, so it doesn’t count.'), L('对是对了，不过路是我指的。', '正解だけど、道を教えたのは僕だからね。', 'Right, but I was the one who pointed the way.')],
    leakNote: [L('哦对了，有 {n} 题是我顺嘴说的，没算。', 'あ、そうだ。{n} 問は僕がうっかり言ったから、数えてないよ。', 'Oh right, {n} I let slip — didn’t count those.'), L('那 {n} 题，下次自己听出来吧。', 'その {n} 問は、次は自分で聴いてみて。', 'Those {n} — hear them yourself next time.')],
    greet: {
      1: [L('哦，又碰上你了。', 'お、また会ったね。', 'Oh, ran into you again.'), L('是你啊。走走？', '君か。歩く？', 'It’s you. Walk with me?')],
      2: [L('嗯……你来了。这回我不偷懒了。', 'うん……来たね。今回はサボらないよ。', 'Mm… you’re here. No slacking this time.'), L('老朋友。这次认真合奏一回吧。', '久しぶり。今回は本気で合わせよう。', 'Old friend. Let’s really play together this time.')],
    },
    cameo: {
      done: [L('（诺亚路过）嗯，这条线挺顺的。', '（ノアが通りかかる）うん、この線いい流れ。', '(Noa passing by) Mm, that line flowed.'), L('（诺亚）慢慢来，不着急。', '（ノア）ゆっくりでいいよ。', '(Noa) Take your time.'), L('（诺亚）刚才那段，你是听出来的吧？', '（ノア）さっきの、聴いてわかったでしょ？', '(Noa) You heard that last one, didn’t you?')],
      test: [L('（诺亚）考试啊……先听，再答。', '（ノア）テストか……まず聴いて、それから。', '(Noa) A test… listen first, then answer.'), L('（诺亚）走完了？挺好。', '（ノア）歩ききった？いいね。', '(Noa) Made it through? Nice.')],
      mistake: [L('（诺亚）别急着找名字，先听它往哪儿走。', '（ノア）名前を急がないで。どこへ行くか聴いて。', '(Noa) Don’t rush to the name. Hear where it goes.'), L('（诺亚）两个声部撞上啦。', '（ノア）声部がぶつかったね。', '(Noa) The voices bumped.')],
      final: [L('（诺亚）要走啦？以后别只看一个瞬间哦。', '（ノア）行っちゃうの？これからは一瞬だけ見ないでね。', '(Noa) Leaving? Remember — don’t look at just one moment.')],
      review: [L('（诺亚）回头再走一遍老路，挺好的。', '（ノア）昔の道をもう一回歩くの、いいね。', '(Noa) Walking an old road again — nice.')],
    },
    shush: [L('说过啦，不说第二遍。', 'もう言ったよ。二回は言わない。', 'Already told you. Not saying it twice.'), L('嘘——', 'しーっ。', 'Shh—'), L('我要继续发呆了。', 'ぼーっとするの再開。', 'Back to daydreaming.')],
  },
  jaz: {
    right: [L('Yeah！就是这个味儿！', 'Yeah！その感じ！', 'Yeah! That’s the feel!'), L('漂亮！下一个来点更花的！', 'いいね！次はもっと派手にいくぞ！', 'Nice! Next one’s fancier!'), L('嗯哼，这个音放得对。', 'うんうん、その音の置き方いいね。', 'Mm-hm, right note in the right place.'), L('好耳朵！', 'いい耳！', 'Great ears!'), L('swing 起来了！', 'スウィングしてる！', 'Now you’re swinging!')],
    wrong: [L('哈哈！就知道你会这么选！', 'ハハ！そう来ると思った！', 'Ha! Knew you’d pick that!'), L('背答案的吧？', '暗記でしょ？', 'You memorised that, didn’t you?'), L('来来来，看解析，我帮你翻开了。', 'ほらほら、解説。開いといたよ。', 'Here, the explanation — I opened it for you.'), L('差一点点！', '惜しい！', 'So close!'), L('没事，爵士里没有错音——只有还没解决的音！', '大丈夫、ジャズに間違った音はない——まだ解決してない音があるだけ！', 'Relax — in jazz there are no wrong notes, only unresolved ones!')],
    streak: [L('等、等一下！我下一段还没想好！', '待っ、待って！次のフレーズまだ考えてない！', 'W-wait! I haven’t worked out my next phrase!'), L('慢点慢点！你这一串，把我的谱子全打乱了！', 'ゆっくりゆっくり！その連続で、僕の譜面がぐちゃぐちゃ！', 'Slow down! That run just scrambled my whole chart!'), L('喂喂，这不是我排练好的剧本啊！', 'おいおい、これはリハーサルした台本じゃないって！', 'Hey hey, this isn’t the script I rehearsed!'), L('呃……我得换一套更难的和弦了，让我想想……', 'えっと……もっと難しいコードに替えなきゃ、ちょっと待って……', 'Uh… I need a harder set of changes — give me a sec…'), L('哇哇，别接得这么快啊，我的 solo 才吹到一半！', 'わわっ、そんなに早く受け止めないで、ソロがまだ途中！', 'Whoa, don’t catch it that fast — my solo’s only half done!')],
    wrong2: [L('嘿，先别急，抓住三音和七音。', 'ちょっと落ち着いて。まず 3 度と 7 度。', 'Hey, easy. Grab the third and seventh first.'), L('听低音！低音不会骗人！', 'ベースを聴け！ベースは嘘つかない！', 'Listen to the bass! The bass never lies!'), L('解析那一行——对，就那行。', '解説のその行——そう、そこ。', 'That line in the explanation — yep, that one.'), L('我第一次也错过。……就一次而已。', '僕も最初は間違えた。……一回だけね。', 'I got that wrong once too. …Just once.')],
    comeback: [L('漂亮的回勾！好的 solo 就该这样！', 'いい戻し！いいソロってこうでなきゃ！', 'Nice recovery! That’s how a solo goes!'), L('刚才那段是留白，现在接上了！', 'さっきのは間、今つながった！', 'That was space — and now you’ve picked it up!'), L('行啊你，回来了！', 'やるね、戻ってきた！', 'Nice — you’re back!')],
    rematch: [L('哟，再来一轮？', 'よっ、もうワンコーラス？', 'Yo, another chorus?'), L('上次那几个音，我回去练过了！', 'この前の音、練習してきたから！', 'I practised those notes since last time!'), L('这次每个音，我都想好理由了！', '今度はどの音にも理由を考えてきた！', 'This time I’ve got a reason for every note!')],
    click: [L('嘿！别打断我的 solo！', 'おい！ソロの邪魔しないで！', 'Hey! Don’t interrupt my solo!'), L('想要签名？排队！', 'サイン？並んで！', 'Want an autograph? Get in line!'), L('哈哈，痒！', 'ハハ、くすぐったい！', 'Haha, that tickles!'), L('戳我也不会多给你一个音。', 'つついても音は増えないよ。', 'Poking me won’t get you an extra note.'), L('专心！十三和弦来啦！', '集中！13 の和音が来るぞ！', 'Focus! Here comes a thirteenth chord!'), L('你是不是在给我打节拍？二、四拍才对！', 'リズム取ってる？2 拍と 4 拍だよ！', 'Are you keeping time on me? It’s 2 and 4!'), L('再戳我就转调了啊！', 'もう一回つついたら転調するぞ！', 'Poke me again and I’ll modulate!')],
    leak: [L('哎哟别挠了别挠了！「{answer}」！行了吧！……等等，我刚刚说了啥？', 'わかったわかった、くすぐらないで！「{answer}」！これでいい？……待って、今なんて言った？', 'Okay, okay, stop! “{answer}”! Happy? …Wait, what did I just say?'), L('好啦好啦，「{answer}」——这个算即兴失误，不算数！', 'はいはい、「{answer}」——今のはアドリブのミス、ノーカン！', 'Fine — “{answer}” — that was an improv slip, doesn’t count!')],
    leakedRight: [L('喂喂，那是我说漏的！不算不算！', 'おいおい、それ僕がもらしたやつ！ノーカン！', 'Hey hey, that was my slip! Doesn’t count!'), L('答案是我喊出来的，这分归我！', '答えを叫んだのは僕だから、この点は僕の！', 'I shouted the answer — that point’s mine!')],
    leakNote: [L('还有 {n} 题是我嘴快！那几分我收回了！', 'あと {n} 問は僕の口がすべった！その分は没収！', 'And {n} were me running my mouth — I’m taking those back!'), L('{n} 题是即兴失误，不算你的哦！', '{n} 問はアドリブのミス、君の点じゃないよ！', '{n} were improv slips — not your points!')],
    greet: {
      1: [L('哟！又是你！上次那几个音我可记着呢！', 'よっ！また君か！この前の音、覚えてるからね！', 'Yo! You again! I remember those notes!'), L('嘿，老熟人！来一段？', 'おっ、顔なじみ！一曲やる？', 'Hey, familiar face! Jam?')],
      2: [L('……来了啊，对手。这次我不废话了。', '……来たね、ライバル。今回は無駄口なし。', '…You’re here, rival. No small talk this time.'), L('对手！今天我把压箱底的都拿出来！', 'ライバル！今日は奥の手まで全部出すぞ！', 'Rival! Today I’m pulling out everything I’ve got!')],
    },
    cameo: {
      done: [L('（爵冒出来）嘿！这关你 swing 得不错！', '（ジャズが顔を出す）おっ！このステージ、いいスウィング！', '(Jaz pops up) Hey! Nice swing on that level!'), L('（爵）要不要再加个十三音？……开玩笑的。', '（ジャズ）13 度、足しとく？……冗談だよ。', '(Jaz) Want to add a thirteenth? …Kidding.'), L('（爵）好！下一关我给你伴奏！', '（ジャズ）よし！次のステージは僕が伴奏する！', '(Jaz) Great! I’ll comp for you next level!')],
      test: [L('（爵）章节测试？来来来，当成 jam session！', '（ジャズ）章末テスト？ほらほら、セッションだと思って！', '(Jaz) Chapter test? Come on, treat it like a jam session!'), L('（爵）考完啦？这个 chorus 漂亮！', '（ジャズ）終わった？いいコーラスだった！', '(Jaz) Done? Lovely chorus!')],
      mistake: [L('（爵）没事！爵士里没有错音，只有还没解决的音！', '（ジャズ）大丈夫！ジャズに間違った音はない、まだ解決してない音だけ！', '(Jaz) No worries! No wrong notes in jazz, only unresolved ones!'), L('（爵）先抓三音和七音！', '（ジャズ）まず 3 度と 7 度！', '(Jaz) Grab the third and seventh first!')],
      final: [L('（爵）结业了！……会少弹几个音的人，最危险。你就是。', '（ジャズ）修了だ！……音を減らせる奴が一番手ごわい。君のことだよ。', '(Jaz) Graduation! …The one who can play fewer notes is most dangerous. That’s you.')],
      review: [L('（爵）复习？好习惯！我也天天练 ii–V–I！', '（ジャズ）復習？いい習慣！僕も毎日 ii–V–I を練習してる！', '(Jaz) Reviewing? Good habit! I practise ii–V–I every day too!')],
    },
    shush: [L('不说了不说了，嘴已经拉上拉链了。', 'もう言わない、口にチャックした。', 'Nope, my lips are zipped.'), L('刚才那个是伴奏声太大你听错了！', 'さっきのは伴奏がうるさくて聞き間違えたんだよ！', 'The band was too loud — you misheard!'), L('嘘！', 'しーっ！', 'Shh!')],
  },
  araya: {
    right: [L('很好。', 'いいわね。', 'Good.'), L('你开始听得见差别了。', '違いが聴こえてきたわね。', 'You’re beginning to hear the difference.'), L('就是这样。', 'そう、それ。', 'Just so.'), L('你没去问钢琴。很好。', 'ピアノに聞かなかったのね。いいわ。', 'You didn’t ask the piano. Good.'), L('嗯，这张地图你读对了。', 'ええ、この地図を正しく読めたわ。', 'Yes, you read this map correctly.')],
    wrong: [L('再听一次。', 'もう一度聴いて。', 'Listen once more.'), L('别问钢琴，问声音。', 'ピアノではなく、音に聞いて。', 'Don’t ask the piano. Ask the sound.'), L('这是十二平均律告诉你的，不是声音告诉你的。', 'それは十二平均律が言ったこと。音が言ったことではないわ。', 'That’s what equal temperament told you, not the sound.'), L('不要紧。换了一张地图，迷路很正常。', '大丈夫。地図が変われば、迷うのは自然なこと。', 'It’s all right. New map — getting lost is natural.'), L('读读解析，那是这个体系自己的说法。', '解説を読んで。この体系自身の言葉よ。', 'Read the explanation — it’s this system speaking for itself.')],
    streak: [L('你已经走得很远了。', 'ずいぶん遠くまで来たわね。', 'You’ve come a long way.'), L('（她微微一笑。）', '（彼女は少し微笑む。）', '(She smiles slightly.)'), L('你在用这张地图自己的规则读它。', 'この地図を、それ自身の規則で読んでいる。', 'You’re reading this map by its own rules.'), L('我们可以走得更远一点了。', 'もう少し遠くまで行けそうね。', 'We can go a little further now.')],
    wrong2: [L('停一停。我们离家已经很远了，慢一点没关系。', '少し休みましょう。家から遠くまで来たもの。ゆっくりでいい。', 'Let’s pause. We’re far from home; slow is fine.'), L('先把熟悉的那一套放下，再看一次。', '慣れた体系をいったん置いて、もう一度見て。', 'Set aside what you know and look again.'), L('问题不在你，在“理所当然”。', '問題はあなたじゃなく、「当たり前」の方。', 'The problem isn’t you. It’s the “obvious”.'), L('一个八度有几个音？……先别急着回答。', '一オクターヴに音はいくつ？……急いで答えなくていいの。', 'How many notes in an octave? …No need to answer quickly.')],
    comeback: [L('你找到方向了。', '方角が見つかったのね。', 'You found your bearings.'), L('你看，地图外面也能走路。', 'ほら、地図の外でも歩けるでしょう。', 'See? You can walk beyond the map.'), L('很好，我们继续。', 'いいわ。続けましょう。', 'Good. Let’s go on.')],
    rematch: [L('又见面了。这次走另一条路吧。', 'また会えたわね。今度は別の道を。', 'We meet again. Let’s take another road.'), L('一个八度有几个音？', '一オクターヴに、音はいくつ？', 'How many notes in an octave?'), L('上次那个问题，还在你心里吗？', '前の問い、まだ心に残ってる？', 'Is last time’s question still with you?')],
    click: [L('嗯？你在听什么？', 'ん？何を聴いているの？', 'Hm? What are you listening to?'), L('我身上的圆环？那是泛音哦。', 'この輪？倍音よ。', 'These rings? Overtones.'), L('好奇是好事。', '好奇心はいいことよ。', 'Curiosity is good.'), L('题目还在等你。', '問題が待ってるわ。', 'The question is waiting.'), L('这件乐器很旧了，轻一点。', 'この楽器は古いの。そっとね。', 'This instrument is old. Gently.'), L('你想问我什么？', '何か聞きたいの？', 'Is there something you want to ask?')],
    leak: [L('你这么想知道……是「{answer}」。不过，你为什么这么想要答案呢？', 'そんなに知りたいのね……「{answer}」よ。でも、どうしてそんなに答えが欲しいの？', 'You want it that much… it’s “{answer}”. But why do you want the answer so badly?'), L('……「{answer}」。地图我给你了，路还得你自己走。', '……「{answer}」。地図は渡したわ。歩くのはあなたよ。', '…“{answer}”. I’ve handed you the map; the walking is yours.')],
    leakedRight: [L('那一题，是我替你走的路。不算你的。', 'その問題は、私が代わりに歩いた道。あなたの分ではないわ。', 'I walked that one for you. It isn’t yours.'), L('答案对了。可那是我给的地图。', '答えは正しい。でもそれは私が渡した地図。', 'The answer is right. But it was my map.')],
    leakNote: [L('有 {n} 题是我告诉你的，没有算进去。下次自己听听看。', '{n} 問は私が教えたから、数えていないわ。次は自分で聴いてみて。', 'I told you {n} of them — they weren’t counted. Listen for yourself next time.'), L('那 {n} 题，留到下次你自己走吧。', 'その {n} 問は、次にあなた自身で歩いて。', 'Leave those {n} for you to walk yourself next time.')],
    greet: {
      1: [L('又见面了。你走过的路，我记得。', 'また会えたわね。あなたの歩いた道、覚えているわ。', 'We meet again. I remember the road you walked.'), L('欢迎回来。这次走哪条路呢？', 'おかえりなさい。今度はどの道を行く？', 'Welcome back. Which road this time?')],
      2: [L('……你已经是一个旅人了。我们平等地走吧。', '……あなたはもう旅人ね。対等に歩きましょう。', '…You’re a traveller now. Let us walk as equals.'), L('同路人，你好。', 'こんにちは、旅の仲間。', 'Hello, fellow traveller.')],
    },
    cameo: {
      done: [L('（阿拉娅轻声说）很好。你听见差别了。', '（アラヤが静かに）いいわね。違いが聴こえたのね。', '(Araya, softly) Good. You heard the difference.'), L('（阿拉娅）这张地图，你读得很仔细。', '（アラヤ）この地図、丁寧に読めたわね。', '(Araya) You read this map carefully.'), L('（阿拉娅）一个八度有几个音？……开玩笑的。', '（アラヤ）一オクターヴに音はいくつ？……冗談よ。', '(Araya) How many notes in an octave? …Just teasing.')],
      test: [L('（阿拉娅）测验也是一段旅程。慢慢走。', '（アラヤ）試験も一つの旅。ゆっくり歩いて。', '(Araya) A test is a journey too. Walk slowly.'), L('（阿拉娅）走完了。辛苦了。', '（アラヤ）歩ききったわね。お疲れさま。', '(Araya) You made it. Well done.')],
      mistake: [L('（阿拉娅）别问钢琴，问声音。', '（アラヤ）ピアノではなく、音に聞いて。', '(Araya) Don’t ask the piano. Ask the sound.'), L('（阿拉娅）再听一次就好。', '（アラヤ）もう一度聴けば大丈夫。', '(Araya) Just listen once more.')],
      final: [L('（阿拉娅）地图之外，还有地图。继续走吧。', '（アラヤ）地図の外にも、地図がある。歩き続けて。', '(Araya) Beyond the map, more maps. Keep walking.')],
      review: [L('（阿拉娅）回到熟悉的地方，也会看见新的东西。', '（アラヤ）慣れた場所に戻っても、新しいものが見える。', '(Araya) Return to familiar places and you still see something new.')],
    },
    shush: [L('剩下的，交给你的耳朵吧。', 'あとは、あなたの耳に任せるわ。', 'The rest is up to your ears.'), L('我已经说得太多了。', 'もう話しすぎたわね。', 'I’ve said too much already.'), L('嘘。', 'しっ。', 'Shh.')],
  },
  zero: {
    right: [L('成立。', '成立。', 'Valid.'), L('继续。', '続けて。', 'Continue.'), L('关系对了。', '関係は正しい。', 'The relation holds.'), L('好。', 'いい。', 'Good.'), L('……嗯。', '……ええ。', '…Mm.')],
    wrong: [L('你又在找熟悉的规则。', 'また見慣れた規則を探している。', 'You’re looking for familiar rules again.'), L('这里没有。', 'ここには、ない。', 'There are none here.'), L('不是没有规则，只是没有你熟悉的。', '規則がないのではない。見慣れた規則がないだけ。', 'Not no rules. Just none you know.'), L('看解析。看关系，别看名字。', '解説を。名前ではなく、関係を見て。', 'Read the explanation. Relations, not names.'), L('……再想一次。', '……もう一度考えて。', '…Think again.')],
    streak: [L('……有意思。', '……面白い。', '…Interesting.'), L('（他停顿了一下。）', '（少し間がある。）', '(A brief pause.)'), L('你找的不是答案，是结构。', '答えではなく、構造を探しているのね。', 'You’re not looking for answers. You’re looking for structure.'), L('继续这样听。', 'そのまま聴き続けて。', 'Keep listening like this.')],
    wrong2: [L('停下来。先找到规则在哪里。', '止まって。まず規則がどこにあるか見つけて。', 'Stop. First find where the rule is.'), L('数字只是名字，关系才是东西。', '数字は名前にすぎない。関係こそが実体。', 'Numbers are only names. Relations are the thing.'), L('解析里那一步，就是这个系统自己的规则。', '解説のその一歩が、この体系自身の規則。', 'That step in the explanation is this system’s own rule.'), L('不急。这里没有时间。', '急がないで。ここに時間はない。', 'No hurry. There is no time here.')],
    comeback: [L('……你回来了。', '……戻ってきた。', '…You came back.'), L('错误也是一种结构。你读懂了它。', '誤りも一つの構造。あなたはそれを読んだ。', 'An error is a structure too. You read it.'), L('继续。', '続けて。', 'Continue.')],
    rematch: [L('又是你。', 'また、あなた。', 'You again.'), L('上一次的答案，你现在还相信吗。', '前回の答え、今も信じている？', 'Do you still believe last time’s answers.'), L('开始吧。', '始めましょう。', 'Let us begin.')],
    click: [L('……', '……', '…'), L('触碰也是一种输入。没有输出。', '触れるのも入力の一つ。出力はない。', 'Touch is also an input. There is no output.'), L('你在测试我的规则。', '私の規則を試しているのね。', 'You are testing my rules.'), L('题目在下面。', '問題は下。', 'The question is below.'), L('我不会因此改变。', 'それで私は変わらない。', 'This will not change me.'), L('……第几次了。', '……何回目。', '…How many times now.')],
    leak: [L('……「{answer}」。这是你想要的规则吗。', '……「{answer}」。これがあなたの望む規則？', '…“{answer}”. Is this the rule you wanted.'), L('如果你一定要一个答案，那就是「{answer}」。但它不是你的。', 'どうしても答えが欲しいなら、「{answer}」。でもそれはあなたのものではない。', 'If you must have an answer, it is “{answer}”. But it is not yours.')],
    leakedRight: [L('那是我的答案。不计。', 'それは私の答え。数えない。', 'That was my answer. Not counted.'), L('正确。但不是你选的。', '正しい。でもあなたが選んだものではない。', 'Correct. But not chosen by you.')],
    leakNote: [L('{n} 题的答案出自我。不计入。', '{n} 問の答えは私から出た。数えない。', '{n} answers came from me. Not counted.'), L('其中 {n} 题，不是你的规则。', 'そのうち {n} 問は、あなたの規則ではない。', '{n} of them were not your rules.')],
    greet: {
      1: [L('又是你。', 'また、あなた。', 'You again.'), L('你回来了。', '戻ってきた。', 'You came back.')],
      2: [L('……你。我把你当作同等的研究者。', '……あなた。対等な研究者として扱う。', '…You. I regard you as an equal researcher.'), L('开始吧。这一次，我们站在同一边。', '始めましょう。今回は、同じ側に立って。', 'Let us begin. This time, from the same side.')],
    },
    cameo: {
      done: [L('（零）……成立。', '（ゼロ）……成立。', '(Zero) …Valid.'), L('（零）规则清楚。继续。', '（ゼロ）規則は明確。続けて。', '(Zero) The rule is clear. Continue.'), L('（零）你选了这些规则。很好。', '（ゼロ）あなたはこの規則を選んだ。いい。', '(Zero) You chose these rules. Good.')],
      test: [L('（零）测验。看关系，别看名字。', '（ゼロ）試験。名前ではなく、関係を見て。', '(Zero) A test. Relations, not names.'), L('（零）结束了。结构是对的。', '（ゼロ）終わった。構造は正しい。', '(Zero) It is over. The structure holds.')],
      mistake: [L('（零）你又在找熟悉的规则。', '（ゼロ）また見慣れた規則を探している。', '(Zero) You are looking for familiar rules again.'), L('（零）……再想一次。', '（ゼロ）……もう一度考えて。', '(Zero) …Think again.')],
      final: [L('（零）你知道自己为什么选择这些规则。……这就够了。', '（ゼロ）自分がなぜこの規則を選ぶか、知っている。……それで十分。', '(Zero) You know why you choose your rules. …That is enough.')],
      review: [L('（零）重复也是一种结构。', '（ゼロ）反復も一つの構造。', '(Zero) Repetition is a structure too.')],
    },
    shush: [L('……', '……', '…'), L('我已经说过一次。', 'もう一度言った。', 'I have said it once.'), L('接下来由你决定。', 'ここからはあなたが決める。', 'From here, you decide.')],
  },
};

/**
 * 每个 Boss 节点：intro 开场（多套，随机一套；每题的出题台词在 learn_boss_questions.js）、
 * end 1–3 星结局（每个星级多套，每句带表情）、first 第一次通关、upgrade 重打升星（多句）、memo 二次见面按上次星级接的话（多句）。
 */
export const BOSS_LINES = {
  mimi: {
    intro: [
      [L('嗯？', 'ん？', 'Hm?'), L('你找 Boss？这儿没有啊。', 'ボスを探してる？ここにはいないよ。', 'Looking for a boss? Nobody here.'), L('……非要打的话，陪我走一段？', '……どうしてもって言うなら、ちょっと一緒に歩く？', '…If you insist, walk with me a while?'), L('先说好，好听就行。我不讲道理。', '先に言っとくけど、いい音ならそれでいい。理屈は言わないよ。', 'Just so you know: if it sounds good, that’s enough. I don’t do theory.')],
      [L('哦，你来啦。', 'あ、来たんだ。', 'Oh, you came.'), L('我刚在想一条旋律。为什么好听？……不知道，也不用知道。', '今、旋律を考えてた。なんでいいのか？……知らないし、知る必要もない。', 'I was just thinking of a tune. Why is it nice? …Don’t know. Don’t need to.'), L('一起走走？感觉就是感觉，讲不出道理的。', '一緒に歩く？感覚は感覚、理屈じゃないよ。', 'Walk with me? A feeling is a feeling — no reasoning behind it.')],
      [L('别那么紧张嘛。', 'そんなに緊張しないで。', 'Don’t be so tense.'), L('理论什么的，我不太感兴趣。好听不就够了？', '理論とか、あんまり興味ない。いい音ならそれで十分でしょ？', 'Theory doesn’t interest me much. Isn’t sounding good enough?'), L('……好吧，我会问几个问题。就当随便聊聊。', '……まあ、いくつか聞くよ。雑談だと思って。', '…Fine, I’ll ask a few things. Think of it as chatting.')],
    ],
    end: {
      1: [
        [S('one_star', '哈？这样也算过？', 'は？これで合格？', 'Huh? That counts as a pass?'), S('mocking', '一半都在蒙吧你。', '半分は当てずっぽうでしょ。', 'Half of those were guesses.'), S('defiant', '……规矩就是规矩，过去吧。下次给我认真点。', '……ルールはルール、通っていいよ。次はちゃんとやって。', '…Rules are rules. Go on. Be serious next time.')],
        [S('one_star', '就这？', 'これだけ？', 'That’s it?'), S('angry', '好几题明明看一眼就会的！', '何問かは見ればすぐわかるのに！', 'Some of those you could get at a glance!'), S('defiant', '哼，算你过。回去把键盘多看几遍。', 'ふん、通してあげる。帰って鍵盤をよく見ておいて。', 'Hmph, you pass. Go stare at a keyboard for a while.')],
      ],
      2: [
        [S('two_star', '还不错嘛。', 'まあまあね。', 'Not bad.'), S('proud', '至少以后不会把六八拍数成六大拍了。', '少なくとも、もう 6/8 を大きく 6 拍って数えないでしょ。', 'At least you won’t count 6/8 as six big beats anymore.')],
        [S('two_star', '嗯……还行。', 'うん……悪くない。', 'Hmm… okay.'), S('serious', '错的那几题，回去自己数一遍。', '間違えたところは、帰って自分で数え直して。', 'The ones you missed — go recount them yourself.'), S('proud', '数清楚了，你就是我承认的人了。……一点点。', 'ちゃんと数えられたら、認めてあげる。……ちょっとだけ。', 'Count them right and I’ll acknowledge you. …A little.')],
      ],
      3: [
        [S('three_star', '……好吧。', '……わかった。', '…Okay.'), S('serious', '每一题都是数过的，我看得出来。', 'どの問題もちゃんと数えてた。見ればわかる。', 'You counted every one. I could tell.'), S('concede', '我认输。……别到处说啊。', '私の負け。……言いふらさないでよ。', 'I give up. …Don’t go telling everyone.')],
        [S('three_star', '……嗯。', '……うん。', '…Mm.'), S('serious', '你是认真看了、认真听了、认真数了。', 'ちゃんと見て、ちゃんと聴いて、ちゃんと数えたんだ。', 'You looked, listened and counted.'), S('concede', '行，算你厉害。我认输。', 'いいよ、すごいね。私の負け。', 'Fine, you’re good. I give up.')],
      ],
    },
    first: L('第一次就过了？……下一章那个家伙超无聊的，你别睡着啊。', '一回目で通過？……次の章のあいつ、超つまんないから寝ないでね。', 'First try? …The guy in the next chapter is super boring. Don’t fall asleep.'),
    upgrade: [L('……比上次多一颗星。你真的回去练了。', '……前より星が一つ多い。本当に練習してきたんだ。', '…One more star than last time. You really did practise.'), L('又多了一颗星？哼，进步还挺快。', 'また星が増えた？ふん、上達は早いじゃない。', 'Another star? Hmph, you improve fast.')],
  },
  'mimi-ex': {
    intro: [
      [L('你说你已经会了。', 'もうできるって言ったよね。', 'You say you’ve got it.'), L('那我把题换个样子呢？', 'じゃあ、見た目を変えたら？', 'So what if I change how it looks?'), L('这回不叫你新来的了。', '今度は新人なんて呼ばないから。', 'I won’t call you “the new one” this time.')],
      [L('熟悉的题型谁都会做。', '見慣れた問題なら誰でも解ける。', 'Anyone can do the familiar ones.'), L('换个谱号、换个写法，你还认得吗？', '音部記号や書き方を変えても、わかる？', 'Change the clef or the spelling — still recognise it?'), L('来，让我看看你是真会，还是只是见过。', 'さあ、本当にできるのか、見たことがあるだけか、見せて。', 'Come on. Show me if you really know it, or just recognise it.')],
    ],
    end: {
      1: [
        [S('one_star', '哈？就这样？', 'は？これだけ？', 'Huh? That’s it?'), S('mocking', '换个样子你就认不出来了。', '見た目を変えたら気づかないのね。', 'Change the look and you’re lost.'), S('defiant', '……不过过了就是过了。', '……でも合格は合格。', '…But a pass is a pass.')],
        [S('one_star', '勉强吧。', 'ぎりぎりね。', 'Barely.'), S('serious', '熟悉不等于会。你再好好想想。', '慣れてるのと、できるのは違うの。よく考えて。', 'Familiar isn’t the same as knowing. Think about it.')],
      ],
      2: [
        [S('two_star', '还行。', 'まあね。', 'Not bad.'), S('proud', '至少你不是只认得熟悉的题型。', '少なくとも、見慣れた形しかわからないわけじゃない。', 'At least you don’t only recognise familiar formats.')],
        [S('two_star', '嗯，换了样子你也认出来了。', 'うん、見た目が変わってもわかったね。', 'Mm, you saw through the disguise.'), S('serious', '错的那几道，就是你“以为会了”的地方。', '間違えたところが、「できると思ってた」ところ。', 'The ones you missed are where you “thought you knew”.')],
      ],
      3: [
        [S('three_star', '……好吧。', '……わかった。', '…Okay.'), S('serious', '这才叫真的会。', 'それが本当にできるってこと。', 'That’s what really knowing looks like.'), S('concede', '我认输。下次教教我你是怎么练的。', '私の負け。今度どうやって練習したか教えて。', 'I give up. Teach me how you practised sometime.')],
        [S('three_star', '换了样子你也认得出来。', '見た目を変えても、ちゃんとわかってた。', 'You recognised everything in every disguise.'), S('concede', '……算了，我认输。', '……もういい、私の負け。', '…Fine. I give up.'), S('proud', '不过下次我会出更刁的！', 'でも次はもっと意地悪な問題にするから！', 'But next time I’ll make them nastier!')],
      ],
    },
    first: L('……阿拉娅肯定会问你：为什么一个八度是十二个音？先把答案想好。', '……アラヤならきっと聞くよ。なんで一オクターヴは十二音なの？って。答えを考えておいて。', '…Araya will definitely ask you why an octave has twelve notes. Have an answer ready.'),
    upgrade: [L('又多一颗星。……你比我想的认真。', 'また星が一つ増えた。……思ってたより真面目ね。', 'Another star. …You’re more serious than I thought.'), L('哼，这回换了样子你也认出来了。', 'ふん、今回は見た目を変えてもわかってたね。', 'Hmph. You saw through every disguise this time.')],
  },
  'sever-mid': {
    intro: [
      [L('名称，你已经记了不少。', '名称はずいぶん覚えたようだ。', 'You have memorised a good many names.'), L('很好。名称连成系统，规则就能推出一切。', 'よろしい。名称が体系になれば、規則がすべてを導く。', 'Good. Join the names into a system and the rules derive everything.'), L('判断？不需要。', '判断？要らない。', 'Judgement? Unnecessary.'), L('把标签贴对。开始。', 'ラベルを正しく貼れ。始めよ。', 'Label correctly. Begin.')],
      [L('认识和弦，不等于懂和声。', '和音を知っていることは、和声がわかることではない。', 'Knowing chords is not understanding harmony.'), L('性质、转位、级数、数字低音——它们组成一套严密的秩序。', '種類・転回・度数・数字付き低音——それらは厳密な秩序をなす。', 'Quality, inversion, degree, figured bass — they form a strict order.'), L('秩序之内，答案只有一个。证明你看得见它。', '秩序の内では、答えは一つ。それが見えると証明せよ。', 'Within that order there is one answer. Prove you can see it.')],
    ],
    end: {
      1: [
        [S('one_star', '通过。', '通過。', 'Passed.'), S('serious', '名称你记住了。关系，还没有。', '名前は覚えた。関係はまだだ。', 'The names, yes. The relations, not yet.')],
        [S('one_star', '……合格线，刚好。', '……合格ライン、ぎりぎりだ。', '…Exactly the pass line.'), S('default', '下一段路，不会更简单。', '次の道は、もっと簡単にはならない。', 'The road ahead will not be easier.')],
      ],
      2: [
        [S('two_star', '合格。', '合格。', 'Satisfactory.'), S('serious', '你开始把名称连成系统了。', '名前を体系につなぎ始めている。', 'You are starting to join names into a system.')],
        [S('two_star', '可以。', 'よろしい。', 'Acceptable.'), S('proud', '秩序最稳定的那一部分，你已经掌握了。', '秩序のもっとも安定した部分は、身についた。', 'You hold the most stable part of the order.')],
      ],
      3: [
        [S('three_star', '合格。', '合格。', 'Satisfactory.'), S('serious', '不过，你现在懂的，只是秩序最稳定的那一部分。', 'だが今わかっているのは、秩序のもっとも安定した部分だけだ。', 'But what you understand is only the most stable part of the order.'), S('default', '继续走吧。', '進め。', 'Go on.'), S('defiant', '后面的和声……可不会这么听话。', 'この先の和声は……これほど従順ではない。', 'The harmony ahead… will not be so obedient.')],
        [S('three_star', '……无可挑剔。', '……非の打ちどころがない。', '…Flawless.'), S('serious', '但别以为规则就是全部。', 'だが、規則がすべてだと思うな。', 'But don’t assume the rules are everything.'), S('defiant', '章节测试之前，我们再见。', '章末試験の前に、また会おう。', 'We will meet again before the chapter test.')],
      ],
    },
    first: L('米米说我无聊？……基本功尚可，纪律性不足。替我转告她。', 'ミミが私を退屈だと？……基礎はまずまず、規律が足りない。そう伝えておけ。', 'Mimi calls me boring? …Fundamentals adequate, discipline lacking. Tell her that.'),
    upgrade: [L('比上一次更接近秩序。', '前回より秩序に近い。', 'Closer to order than last time.'), L('改进了。记录在案。', '改善を認める。記録しておく。', 'Improvement noted.')],
  },
  'sever-mid-ex': {
    intro: [
      [L('你通过了上一次审查。', '前回の審査は通った。', 'You passed the last review.'), L('名称已经连成了系统。于是你大概会想：每个和弦都有一个固定、唯一的名字。', '名称は体系になった。そこで君はこう考えるだろう——どの和音にも、固定した唯一の名前がある、と。', 'The names now form a system. So you probably think: every chord has one fixed, unique name.'), L('……是吗？', '……そうか？', '…Does it?')],
      [L('同一个声音，可以有几个名字？', '同じ響きに、名前はいくつありうる？', 'How many names can one sound have?'), L('你也许会答：一个。标签就是对象本身。', '君は答えるかもしれない：一つ、ラベルこそが対象そのものだ、と。', 'You may answer: one — the label is the object itself.'), L('那就让我们检查这个答案。', 'ではその答えを検査しよう。', 'Then let us examine that answer.')],
    ],
    end: {
      1: [
        [S('one_star', '通过。', '通過。', 'Passed.'), S('serious', '描述不同，对象相同——这一点你还没真正看见。', '記述は違っても対象は同じ——まだ本当には見えていない。', 'Different descriptions, same object — you haven’t truly seen that yet.')],
        [S('one_star', '勉强。', 'かろうじて。', 'Barely.'), S('default', '名字背得越多，越要知道它们描述的是什么。', '名前を覚えるほど、それが何を記述しているか知る必要がある。', 'The more names you learn, the more you must know what they describe.')],
      ],
      2: [
        [S('two_star', '……站得住。', '……成り立つ。', '…It holds.'), S('serious', '同一个声音，可以不止一个名字。我记下了。', '同じ響きに、名前は一つとは限らない。記録しておく。', 'One sound may have more than one name. Noted.')],
        [S('two_star', '可以。', 'よろしい。', 'Acceptable.'), S('confused', '……描述和对象，看来确实是两回事。', '……記述と対象は、確かに別物らしい。', '…Description and object do seem to be two different things.')],
      ],
      3: [
        [S('three_star', '……等等。', '……待て。', '…Wait.'), S('serious', '音乐对象，并不总是和一个标签一一对应。', '音楽の対象は、いつも一つのラベルと一対一に対応するわけではない。', 'A musical object does not always map one-to-one onto a label.'), S('speaking', '你看见了。……我也看见了。', '君は見た。……私も見た。', 'You saw it. …So did I.'), S('concede', '章节测试之前，我们再见。', '章末テストの前に、また会おう。', 'We meet again before the chapter test.')],
        [S('three_star', '……你没有说错一个。', '……一つも誤りがなかった。', '…Not one error.'), S('confused', '同一个声音，你给了它几个都站得住的名字。', '同じ響きに、どれも成り立つ名前をいくつも与えた。', 'You gave one sound several names, all of them valid.'), S('defiant', '标签是描述对象的方法。这一点，我也会写进我的秩序里。', 'ラベルは対象を記述する方法だ。このことは、私の秩序にも書き加えておく。', 'A label is a way of describing an object. I will write that into my order as well.')],
      ],
    },
    first: L('如果第四章那个人告诉你平行五度无所谓，别听他的。', '第四章のあの男が平行五度など構わないと言っても、耳を貸すな。', 'If the man in chapter four says parallel fifths don’t matter, don’t listen.'),
    upgrade: [L('描述更完整了。', '記述がより完全になった。', 'Your descriptions are more complete.'), L('比上次更准确。', '前回より正確だ。', 'More precise than last time.')],
  },
  sever: {
    intro: [
      [L('又见面了。', 'また会ったな。', 'We meet again.'), L('上一次，我要你证明规则。', '前回は、規則を証明せよと言った。', 'Last time, I asked you to prove the rules.'), L('这一次——', '今回は——', 'This time —'), L('证明你知道什么时候不能只看规则。', '規則だけを見てはならない時を、知っていると証明せよ。', 'prove you know when the rules alone aren’t enough.')],
      [L('后半章的和声，不再那么听话了。', '後半の和声は、もう従順ではない。', 'The harmony of the later chapter is no longer obedient.'), L('四六和弦、离调、半音化、和弦变换。', '四六の和音、一時的転調、半音階、和音の変換。', 'Six-fours, tonicization, chromaticism, chord transformations.'), L('同一个和弦，换了位置，意思就不同。……开始吧。', '同じ和音でも、場所が変われば意味が変わる。……始めよう。', 'The same chord means something else in another place. …Let us begin.')],
    ],
    memo: {
      1: [L('上一次，一颗星。我没有忘记。', '前回は星一つ。忘れてはいない。', 'Last time, one star. I haven’t forgotten.'), L('上次你只是勉强通过。这次看你的了。', '前回はぎりぎりの通過だった。今回はどうだ。', 'Last time you barely passed. Show me now.')],
      2: [L('上一次，两颗星。秩序你懂了一半。', '前回は星二つ。秩序の半分はわかっている。', 'Last time, two stars. You understood half the order.'), L('上次你已经能把名称连起来了。今天再往前一步。', '前回は名前をつなげられた。今日はもう一歩先だ。', 'Last time you could connect the names. Today, one step further.')],
      3: [L('上一次，三颗星。……所以这一次，我不会只考规则。', '前回は星三つ。……だから今回は、規則だけを問いはしない。', 'Last time, three stars. …So this time, I won’t test the rules alone.'), L('上次你无可挑剔。所以今天，我要考规则管不到的地方。', '前回は完璧だった。だから今日は、規則の届かない所を問う。', 'Last time you were flawless. So today I test where the rules don’t reach.')],
    },
    end: {
      1: [
        [S('one_star', '你通过了。', '通過した。', 'You passed.'), S('serious', '仅此而已。', 'それだけだ。', 'Nothing more.'), S('default', '别把侥幸当成掌握。', '偶然を習得と取り違えるな。', 'Don’t mistake luck for mastery.')],
        [S('one_star', '过线了。', '線は越えた。', 'Over the line.'), S('serious', '上下文那几题，你还在看标签。', '文脈の問題では、まだラベルを見ていた。', 'On the context questions, you were still reading labels.')],
      ],
      2: [
        [S('two_star', '很好。', 'よろしい。', 'Very good.'), S('serious', '你已经开始理解规则背后的理由了。', '規則の背後の理由を、理解し始めている。', 'You’re beginning to understand the reasons behind the rules.')],
        [S('two_star', '不错。', '悪くない。', 'Not bad.'), S('proud', '同一个和弦在不同位置做不同的事——你看见了。', '同じ和音が場所によって違う仕事をする——見えたな。', 'The same chord doing different jobs in different places — you saw it.')],
      ],
      3: [
        [S('three_star', '……', '……', '…'), S('concede', '我输了。', '私の負けだ。', 'I have lost.'), S('serious', '规则不是答案。', '規則は答えではない。', 'The rules are not the answer.'), S('default', '规则只是让我们听见关系的方法。', '規則は、関係を聴くための方法にすぎない。', 'They are only a way to hear relations.'), S('concede', '……这一点，是你教我的。', '……それを教えたのは、君だ。', '…You taught me that.')],
        [S('three_star', '（他第一次没有站得笔直。）', '（彼は初めて、まっすぐには立っていない。）', '(For the first time, he isn’t standing perfectly straight.)'), S('concede', '……你赢了。', '……君の勝ちだ。', '…You win.'), S('serious', '上下文，比标签更重要。我会记住。', '文脈はラベルより重い。覚えておこう。', 'Context outweighs the label. I will remember.')],
      ],
    },
    first: L('下一章那个旅行乐手不会跟你讲规则。……这不代表他没有规则。', '次の章の旅の楽士は規則を語らない。……規則がないという意味ではない。', 'The wanderer in the next chapter won’t talk about rules. …That doesn’t mean he has none.'),
    upgrade: [L('……站得住。比上一次更站得住。', '……成り立つ。前回よりも、なお。', '…It holds. Better than last time.'), L('进步了。我承认。', '上達した。認めよう。', 'You’ve improved. I acknowledge it.')],
  },
  'sever-ex': {
    intro: [
      [L('你赢了我。', '君は私に勝った。', 'You beat me.'), L('于是你得出一个新结论：分析没有标准，怎么说都行。', 'そして新しい結論を得た。分析に基準はない、何でもいい、と。', 'And you reached a new conclusion: analysis has no standard; anything goes.'), L('……依据？', '……根拠は？', '…On what grounds?')],
      [L('没有唯一答案。', '唯一の答えはない。', 'There is no single answer.'), L('这句话，我花了很久才承认。', 'それを認めるのに、私は長くかかった。', 'It took me a long time to admit that.'), L('但没有唯一答案，不代表没有错误答案。来。', 'だが唯一の答えがないことは、誤答がないことではない。来たまえ。', 'But no single answer doesn’t mean no wrong answers. Come.')],
    ],
    end: {
      1: [
        [S('one_star', '通过。', '通過。', 'Passed.'), S('serious', '有几个分析，你拿不出依据。记住它们。', '根拠を示せなかった分析がある。覚えておけ。', 'Some analyses you couldn’t support. Remember them.')],
        [S('one_star', '勉强。', 'かろうじて。', 'Barely.'), S('default', '没有唯一答案的时候，更要拿出依据。', '唯一の答えがない時こそ、根拠を示せ。', 'When there’s no single answer, grounds matter even more.')],
      ],
      2: [
        [S('two_star', '很好。', 'よろしい。', 'Very good.'), S('serious', 'A 成立，B 也成立，C 没有证据。你分得清。', 'A も B も成り立つ。C には証拠がない。君には区別がつく。', 'A holds, B holds, C has no evidence. You can tell them apart.')],
        [S('two_star', '可以。', 'よろしい。', 'Acceptable.'), S('proud', '你没有因为“怎么说都行”就随便说。', '「何でもいい」と開き直らなかったな。', 'You didn’t fall back on “anything goes”.')],
      ],
      3: [
        [S('three_star', '（他第一次放松了肩膀。）', '（彼は初めて肩の力を抜いた。）', '(For the first time, his shoulders relax.)'), S('serious', '规则重要。规则不是唯一答案。', '規則は重要だ。規則は唯一の答えではない。', 'Rules matter. Rules are not the only answer.'), S('default', '没有唯一答案，也不代表可以没有依据。', '唯一の答えがなくとも、根拠なしでよいわけではない。', 'No single answer doesn’t mean no grounds.'), S('concede', '……你可以走了。我很满意。', '……行ってよい。満足だ。', '…You may go. I am satisfied.')],
        [S('three_star', '每一个分析，你都给了依据。', 'どの分析にも根拠を示した。', 'You gave grounds for every analysis.'), S('concede', '我没什么可以再教你的了。', 'もう教えることはない。', 'I have nothing more to teach you.'), S('proud', '……这是夸奖。', '……褒めている。', '…That was a compliment.')],
      ],
    },
    first: L('阿拉娅说我的规则很漂亮，只是没有我以为的那么普遍。……她说得对。别告诉她。', 'アラヤは私の規則を美しいが、私が思うほど普遍ではないと言う。……正しい。本人には言うな。', 'Araya says my rules are beautiful, just not as universal as I think. …She’s right. Don’t tell her.'),
    upgrade: [L('依据更充分了。', '根拠がより確かになった。', 'Your grounds are firmer.'), L('比上次更有说服力。', '前回より説得力がある。', 'More convincing than last time.')],
  },
  noa: {
    intro: [
      [L('嗯？', 'ん？', 'Hm?'), L('你找 Boss？', 'ボスを探してるの？', 'Looking for a boss?'), L('这儿没有啊。', 'ここにはいないよ。', 'There isn’t one here.'), L('……', '……', '…'), L('非要打的话，陪我走一段？', 'どうしてもって言うなら、少し一緒に歩く？', 'If you insist, walk with me a while?')],
      [L('哦，你来啦。', 'あ、来たんだ。', 'Oh, you’re here.'), L('我刚在想一条旋律，走到一半卡住了。', 'ちょうど旋律を考えてて、途中で詰まってたんだ。', 'I was working on a melody and got stuck halfway.'), L('一起走走？顺便帮我听听。', '一緒に歩く？ついでに聴いてみて。', 'Walk with me? Have a listen while we’re at it.')],
      [L('别那么紧张嘛。', 'そんなに緊張しないで。', 'Don’t be so tense.'), L('这儿没人考你。', 'ここで試験する人はいないよ。', 'Nobody’s testing you here.'), L('……好吧，我会问几个问题。就当随便聊聊。', '……まあ、いくつか聞くけど。雑談だと思って。', '…Okay, I’ll ask a few things. Just think of it as chatting.')],
    ],
    end: {
      1: [
        [S('one_star', '挺乱的。', 'ごちゃごちゃだね。', 'Pretty messy.'), S('default', '不过你没停下来。', 'でも止まらなかった。', 'But you didn’t stop.'), S('speaking', '这也挺重要的。', 'それも大事だよ。', 'That matters too.')],
        [S('one_star', '嗯……走完了。', 'うん……歩ききったね。', 'Mm… we made it.'), S('confused', '有几段你走岔了。', '何か所か道を外れてたけど。', 'You wandered off a few times.'), S('default', '没关系，下次换条路再走一遍。', 'いいよ、次は別の道でもう一回。', 'That’s fine. Next time we’ll take another path.')],
      ],
      2: [
        [S('two_star', '不错嘛。', 'いいね。', 'Nice.'), S('speaking', '你已经不只是盯着和弦看了。', 'もう和音だけ見てないね。', 'You’re not just staring at chords anymore.')],
        [S('two_star', '嗯，走得挺好。', 'うん、いい歩き方だった。', 'Mm, you walked well.'), S('proud', '那几条线，你是听出来的，不是算出来的。', 'あの線は、計算じゃなくて聴いてわかったんだね。', 'You heard those lines — you didn’t just calculate them.')],
      ],
      3: [
        [S('three_star', '我输了？', '僕の負け？', 'I lost?'), S('confused', '……行吧。', '……そっか。', '…Alright.'), S('speaking', '那送你一句。', 'じゃあ一つだけ。', 'Then here’s something for you.'), S('serious', '以后别只看一个瞬间。', 'これからは、一瞬だけを見ないで。', 'From now on, don’t look at just one moment.'), S('default', '音乐是往前走的。', '音楽は前に進むんだよ。', 'Music moves forward.')],
        [S('three_star', '……（他的眼睛睁大了一点。）', '……（彼の目が少しだけ大きくなる。）', '…(His eyes widen a little.)'), S('speaking', '原来你一直在听。', 'ずっと聴いてたんだね。', 'You were listening the whole time.'), S('concede', '嗯，你赢啦。下次我们合奏吧。', 'うん、君の勝ち。今度一緒に弾こう。', 'Yeah, you win. Let’s play together next time.')],
      ],
    },
    first: L('下一章那个人太吵了。……不过你大概会喜欢他。', '次の章のあいつはうるさいよ。……でもたぶん気に入ると思う。', 'The one in the next chapter is way too loud. …You’ll probably like him, though.'),
    upgrade: [L('嗯，这次走得更稳了。', 'うん、今回はもっと安定してた。', 'Mm, steadier this time.'), L('比上次顺多了。', '前よりずっと流れてる。', 'Much smoother than last time.')],
  },
  'noa-ex': {
    intro: [
      [L('理论能解释感觉了，对吧。', '理論で感覚を説明できるようになったね。', 'So theory can explain feeling now, right?'), L('那知道名字，就等于听得出来吗？', 'じゃあ名前を知ってれば、聴こえるってこと？', 'Then does knowing the name mean you can hear it?'), L('这次我不告诉你名字。先听。', '今回は名前を言わないよ。まず聴いて。', 'This time I won’t give you names. Listen first.')],
      [L('塞维尔和爵？', 'セヴェールとジャズ？', 'Sever and Jaz?'), L('他们两个都太吵了。', 'あの二人はどっちもうるさすぎ。', 'They’re both too loud.'), L('我们安静点。先用耳朵，名字以后再说。', '僕らは静かにいこう。まず耳で、名前はその後。', 'Let’s keep it quiet. Ears first, names later.')],
    ],
    end: {
      1: [
        [S('one_star', '名字你记了不少。', '名前はずいぶん覚えたね。', 'You know plenty of names.'), S('default', '耳朵再跟上一点就好了。', 'あとは耳がもう少し追いつけば。', 'Now let your ears catch up a bit.')],
        [S('one_star', '嗯，过了。', 'うん、通過。', 'Mm, you passed.'), S('speaking', '下次先闭上眼睛听一遍，再看题。', '次は目を閉じて一回聴いてから問題を見て。', 'Next time, close your eyes and listen once before reading.')],
      ],
      2: [
        [S('two_star', '嗯，你是先听的。', 'うん、ちゃんと先に聴いてた。', 'Mm, you listened first.'), S('speaking', '名字是后来的事。', '名前はその後でいい。', 'Names come later.')],
        [S('two_star', '不错。', 'いいね。', 'Nice.'), S('proud', '你知道这些名字是在描述什么声音了。', '名前がどんな音を指してるか、わかってきたね。', 'You know what sounds those names describe now.')],
      ],
      3: [
        [S('three_star', '……（他的眼睛睁大了一点。）', '……（彼は少しだけ目を見開いた。）', '…(His eyes widen a little.)'), S('serious', '感觉不等于没有规则。', '感覚は、規則がないことじゃない。', 'Feeling doesn’t mean no rules.'), S('default', '规则也不等于不需要感觉。', '規則は、感覚がいらないことでもない。', 'And rules don’t mean you don’t need feeling.'), S('speaking', '……走吧。前面那个吵死人的在等你。', '……行こう。先でうるさいのが待ってる。', '…Go on. The loud one up ahead is waiting.')],
        [S('three_star', '嗯。', 'うん。', 'Mm.'), S('speaking', '你先听，再说名字，再讲理由。顺序全对。', 'まず聴いて、次に名前、それから理由。順番が完璧。', 'Listen, then name, then explain. Perfect order.'), S('concede', '我没什么可以教你的了。……那我们合奏吧。', 'もう教えることはないや。……じゃあ一緒に弾こう。', 'Nothing left to teach you. …So let’s play together.')],
      ],
    },
    first: L('爵问我一天能不能多弹几个音。……能啊。没必要。', 'ジャズに、一日にもっと音を弾けないのかって聞かれた。……弾けるよ。必要ないけど。', 'Jaz asked if I could play more notes in a day. …I can. No need.'),
    upgrade: [L('耳朵比上次快了。', '前より耳が速いね。', 'Your ears are quicker than last time.'), L('嗯，这次你几乎都是先听出来的。', 'うん、今回はほとんど聴いてわかってた。', 'Mm, this time you heard almost everything first.')],
  },
  'jaz-mid': {
    intro: [
      [L('哟。', 'よっ。', 'Yo.'), L('会 ii–V–I 吗？', 'ii–V–I できる？', 'Know your ii–V–I?'), L('不会？那你来这儿干嘛？', 'できない？じゃあ何しに来たの？', 'No? Then what are you doing here?'), L('会？那更好。', 'できる？なおいい。', 'You do? Even better.'), L('让我看看你是真会，还是背答案。', '本当にできるのか、暗記なのか、見せてもらおう。', 'Let’s see if you really know it or just memorised it.')],
      [L('欢迎来到我的舞台！', '僕のステージへようこそ！', 'Welcome to my stage!'), L('即兴之王、Altered 的化身、十三和弦终结者——都是我！', '即興の王、オルタードの化身、13 の和音の破壊者——全部僕！', 'King of Improv, avatar of the Altered, Thirteenth-Chord Terminator — all me!'), L('来吧，看你接不接得住我的和弦！', 'さあ、僕の和音を受け止められるかな！', 'Come on, let’s see if you can handle my chords!')],
      [L('swing、布鲁斯、导向音、调性中心、配置——', 'スウィング、ブルース、ガイド・トーン、調性の中心、ヴォイシング——', 'Swing, blues, guide tones, key centres, voicings —'), L('这些可都是我的地盘。', '全部僕の縄張りだよ。', 'that’s all my turf.'), L('音多才好听，对吧？……对吧？', '音は多いほうがいいでしょ？……ね？', 'More notes sound better, right? …Right?')],
    ],
    end: {
      1: [
        [S('one_star', '哈，看到没？音多就是厉害！', 'ハハ、見た？音が多いほうが強いんだって！', 'Ha, see? More notes win!'), S('defiant', '……虽然你过了。', '……まあ、通過はしたけど。', '…Though you did pass.')],
        [S('one_star', '嗯……勉强算你过。', 'うーん……ぎりぎり通過ね。', 'Hmm… barely a pass.'), S('mocking', '下次多抓几个导向音再来！', '次はガイド・トーンをもっとつかんでおいで！', 'Grab more guide tones next time!')],
      ],
      2: [
        [S('two_star', '嗯……你抓得住骨架。', 'うーん……骨組みはつかめてる。', 'Hmm… you can grab the skeleton.'), S('confused', '那我那些漂亮的延伸音呢？', 'じゃあ僕のきれいなテンションは？', 'But what about my beautiful extensions?')],
        [S('two_star', '还行还行！', 'まあまあだね！', 'Not bad, not bad!'), S('proud', '至少你知道和弦里哪几个音最要紧。', '少なくとも、和音の中でどの音が大事かわかってる。', 'At least you know which notes matter most.')],
      ],
      3: [
        [S('three_star', '运气。', '運だね。', 'Luck.'), S('defiant', '绝对是运气。', '絶対に運。', 'Totally luck.'), S('angry', '下一次我认真了！', '次は本気出すから！', 'Next time I’m getting serious!')],
        [S('three_star', '……两个音就够了？', '……二音で十分？', '…Two notes are enough?'), S('confused', '我练了那么多十三和弦……', 'あんなに 13 の和音を練習したのに……', 'All those thirteenth chords I practised…'), S('defiant', '哼，章节测试前，我带全部武器来！', 'ふん、章末テストの前に、全部の武器を持ってくる！', 'Hmph. Before the chapter test, I’m bringing every weapon!')],
      ],
    },
    first: L('诺亚？那家伙一天能不能多弹几个音啊？', 'ノア？あいつ、一日にもう少し音を弾けないの？', 'Noa? Can that guy play a few more notes a day?'),
    upgrade: [L('又多一颗星？……我回去多练几个配置。', 'また星が増えた？……帰ってヴォイシング練習しよ。', 'Another star? …I’m off to practise more voicings.'), L('嗯哼，比上次 swing 多了！', 'うんうん、前よりスウィングしてる！', 'Mm-hm, more swing than last time!')],
  },
  'jaz-mid-ex': {
    intro: [
      [L('上次你用两个音就接住了我。', 'この前は二音で受け止められたね。', 'Last time you answered me with just two notes.'), L('所以现在你觉得，别的音都是多余的？', 'で、今はほかの音は全部いらないって思ってる？', 'So now you think every other note is useless?'), L('哈！那这一场，我们来点颜色！', 'ハハ！じゃあ今回は、色を足していこう！', 'Ha! Then this round, let’s add some colour!')],
      [L('骨架很重要，我认了。', '骨組みが大事なのは認める。', 'The skeleton matters, I admit it.'), L('可是光有骨架，音乐会冷冰冰的。', 'でも骨だけじゃ、音楽は冷たいよ。', 'But a skeleton alone makes music cold.'), L('这场看你知不知道什么时候该加颜色！', '今回は、いつ色を足すべきかわかってるか見せて！', 'This round, show me when the colour belongs!')],
    ],
    end: {
      1: [
        [S('one_star', '骨架是有了。', '骨組みはある。', 'You’ve got the skeleton.'), S('mocking', '可人总不能只剩骨头吧！', 'でも人間、骨だけじゃ生きられないでしょ！', 'But nobody walks around as just bones!')],
        [S('one_star', '过是过了……', '通過はしたけど……', 'You passed, but…'), S('confused', '颜色那几题你是不是一直在省音？', '色の問題、ずっと音を削ってなかった？', 'On the colour questions, were you just cutting notes?')],
      ],
      2: [
        [S('two_star', '行，你知道什么时候该加。', 'よし、いつ足すべきかわかってる。', 'Okay, you know when to add.'), S('proud', '……也知道什么时候不加。', '……いつ足さないかも。', '…And when not to.')],
        [S('two_star', '不错！', 'いいね！', 'Nice!'), S('speaking', '骨架和颜色，你都放对地方了。', '骨組みも色も、ちゃんと置けてる。', 'Skeleton and colour, both in the right place.')],
      ],
      3: [
        [S('three_star', '哈！对吧！颜色也很重要吧！', 'ハハ！でしょ！色も大事でしょ！', 'Ha! Right? Colour matters too!'), S('confused', '……等等，你赢了。', '……待って、君の勝ちか。', '…Wait, you won.'), S('defiant', '章节测试前，我把全部武器都带来！', '章末テストの前に、全部の武器を持ってくる！', 'Before the chapter test, I’m bringing every weapon!')],
        [S('three_star', '该加的加，该省的省。', '足すべきは足し、削るべきは削る。', 'Add what belongs, cut what doesn’t.'), S('speaking', '……这不就是我想说的嘛！', '……それ、僕が言いたかったことじゃん！', '…That’s exactly what I was trying to say!'), S('defiant', '下次见面，你可要小心了！', '次に会うときは、気をつけてよ！', 'Next time we meet, watch out!')],
      ],
    },
    first: L('塞维尔又在说平行五度了？那个古典老头还在抓平五？哈哈哈哈！', 'セヴェールがまた平行五度の話？あのクラシックじいさん、まだ取り締まってるの？ハハハ！', 'Sever on about parallel fifths again? That classical old man is still policing them? Hahaha!'),
    upgrade: [L('颜色更准了！……可不是我教的。', '色がもっと正確に！……僕が教えたんじゃないけど。', 'Your colours are sharper! …Not that I taught you.'), L('嗯哼，这回加得刚刚好！', 'うんうん、今回はちょうどいい足し方！', 'Mm-hm, just the right amount this time!')],
  },
  jaz: {
    intro: [
      [L('来了？', '来たね？', 'You came?'), L('很好。', 'いいね。', 'Good.'), L('上次那两个音的事——', 'この前の二音の件——', 'About those two notes last time —'), L('今天彻底做个了断。', '今日きっちりケリをつけよう。', 'we settle it today.')],
      [L('Altered！Lydian Dominant！Tritone Sub！负和声！LCC！', 'オルタード！リディアン・ドミナント！裏コード！ネガティブ・ハーモニー！LCC！', 'Altered! Lydian Dominant! Tritone sub! Negative harmony! LCC!'), L('这些全是我的武器！', '全部僕の武器だ！', 'All my weapons!'), L('看你怎么一个一个挡回来！', '一つずつどう受け止めるか見せて！', 'Let’s see you parry them one by one!')],
    ],
    memo: {
      1: [L('上次你才一颗星。今天那两个音可救不了你！', 'この前は星一つ。今日はあの二音じゃ助からないよ！', 'You only got one star last time. Those two notes won’t save you today!'), L('一颗星？今天给你看看真本事！', '星一つ？今日は本気を見せてあげる！', 'One star? Today you see the real me!')],
      2: [L('两颗星？哼，今天我加倍复杂！', '星二つ？ふん、今日は二倍複雑にしてやる！', 'Two stars? Hmph, today I double the complexity!'), L('上次两颗星。今天看你能不能拿满！', '前回は星二つ。今日は満点取れるかな！', 'Two stars last time. Let’s see if you can max it today!')],
      3: [L('三颗星……我回去练了好几个月。今天，全部武器！', '星三つ……あれから何か月も練習した。今日は全部の武器だ！', 'Three stars… I practised for months. Today: every weapon!'), L('上次被你拿了满星。这次我可是认真的！', 'この前は満点取られた。今回は本気だから！', 'You maxed me last time. This time I’m serious!')],
    },
    end: {
      1: [
        [S('one_star', '你管这个叫赢？', 'それを勝ちって言う？', 'You call that winning?'), S('mocking', '一半的武器你都没接住啊。', '武器の半分は受け止められてないよ。', 'You missed half my weapons.'), S('default', '……算了，过去吧。', '……まあいいや、行きな。', '…Forget it. Go on.')],
        [S('one_star', '勉强过了。', 'ぎりぎりね。', 'Barely.'), S('defiant', '下次我还要加更多音！', '次はもっと音を足すから！', 'Next time I’m adding even more notes!')],
      ],
      2: [
        [S('two_star', '行。', 'まあね。', 'Fine.'), S('speaking', '你确实不是只会背音阶名字。', '確かに、スケール名を暗記してるだけじゃない。', 'You really don’t just memorise scale names.')],
        [S('two_star', '还不错嘛。', 'なかなかやるじゃん。', 'Not bad at all.'), S('confused', '有几招你没用，可是……好像也不需要用？', '使わなかった技もあるけど……使う必要もなかった？', 'You skipped some moves, but… maybe you didn’t need them?')],
      ],
      3: [
        [S('three_star', '（所有夸张的动作都停了。他第一次站直。）', '（大げさな動きがすべて止まる。初めてまっすぐ立つ。）', '(Every exaggerated movement stops. For the first time, he stands straight.)'), S('serious', '……行。', '……わかった。', '…Okay.'), S('serious', '会少弹几个音的人——', '音を減らせる奴は——', 'Someone who can play fewer notes —'), S('concede', '比只会多弹几个音的人危险。我输了。', '音を足すしかできない奴より手ごわい。僕の負けだ。', 'is more dangerous than someone who can only play more. I lost.')],
        [S('three_star', '（他没再说一句俏皮话。）', '（もう軽口は出てこない。）', '(He doesn’t crack a single joke.)'), S('serious', '每个音，你都知道为什么放在那儿。', 'どの音も、なぜそこに置くかわかってた。', 'You knew why every note was where it was.'), S('concede', '……我输了。真心的。', '……僕の負け。本気で。', '…I lost. For real.')],
      ],
    },
    first: L('下一章那位学者会问你：为什么是十二个音？……我也答不上来。', '次の章の学者に聞かれるよ。なんで十二音なの？って。……僕も答えられない。', 'The scholar in the next chapter will ask why it’s twelve notes. …I can’t answer that either.'),
    upgrade: [L('又多一颗！……我服了。暂时的。', 'また一つ！……参った。今だけね。', 'Another one! …I give. For now.'), L('又进步了？我回去得把武器再磨一磨。', 'また上達？帰って武器を磨き直さなきゃ。', 'Improved again? I need to sharpen my weapons.')],
  },
  'jaz-ex': {
    intro: [
      [L('嘿。', 'よう。', 'Hey.'), L('打败我以后，你是不是觉得“越简单越高级”？', '僕に勝ってから、「単純なほど上級」って思ってない？', 'Since you beat me, have you started thinking “simpler is better”?'), L('那也是一种偷懒。', 'それも一種の手抜きだよ。', 'That’s just another kind of lazy.'), L('这一场我只问一件事：每一个音，都有理由吗？', '今回聞くのは一つだけ。すべての音に理由はある？', 'This round I ask one thing: does every note have a reason?')],
      [L('这次我不炫技了。', '今回は見せびらかさない。', 'No showing off this time.'), L('有时候三个音就够，有时候一个完整的 altered 和弦才对。', '三音で十分な時もあれば、フルのオルタードが正しい時もある。', 'Sometimes three notes are enough; sometimes a full altered chord is right.'), L('分得清吗？来。', '見分けられる？さあ。', 'Can you tell which is which? Come on.')],
    ],
    end: {
      1: [
        [S('one_star', '你还在数音的多少。', 'まだ音の数を数えてるね。', 'You’re still counting how many notes.'), S('serious', '数音是数不出音乐的。……下次再来。', '音を数えても音楽にはならない。……また来な。', 'Counting notes won’t give you music. …Come back.')],
        [S('one_star', '嗯，过了。', 'うん、通過。', 'Mm, you passed.'), S('speaking', '每个音都问一句“为什么”，你会走得更远。', 'どの音にも「なぜ」を聞けば、もっと先へ行ける。', 'Ask “why” of every note and you’ll go further.')],
      ],
      2: [
        [S('two_star', '嗯。你开始问“为什么”了。', 'うん。「なぜ」を問い始めたね。', 'Mm. You’ve started asking “why”.'), S('proud', '这比会一百个音阶有用。', 'それは百のスケールより役に立つ。', 'That beats knowing a hundred scales.')],
        [S('two_star', '不错。', 'いいね。', 'Nice.'), S('serious', '简单的时候你没多加，复杂的时候你没退缩。', '単純な時に足さず、複雑な時にひるまなかった。', 'You didn’t pad the simple ones or shy from the complex ones.')],
      ],
      3: [
        [S('three_star', '（他安静了很久。）', '（彼は長いこと黙っていた。）', '(He is quiet for a long time.)'), S('serious', '简单不是高级，复杂也不是。', '単純が上級なんじゃない。複雑でもない。', 'Simple isn’t it. Complex isn’t either.'), S('speaking', '知道为什么——才是。', 'なぜかを知っていること——それが上級だ。', 'Knowing why — that’s it.'), S('concede', '……走吧，“即兴之王”这个称号，先借你用。', '……行きな。「即興の王」の称号、しばらく貸してあげる。', '…Go on. You can borrow “King of Improv” for a while.')],
        [S('three_star', '每一个音，都有理由。', 'どの音にも理由があった。', 'Every note had a reason.'), S('concede', '……我输了。', '……僕の負け。', '…I lost.'), S('proud', '不过下次合奏，独奏还是我先！', 'でも次のセッション、ソロは僕が先ね！', 'But next jam, I take the first solo!')],
      ],
    },
    first: L('我给自己想了个新称号：“少即是锋芒”。……开玩笑的。大概。', '新しい称号を考えた。「少なさこそ切っ先」。……冗談だよ。たぶん。', 'I came up with a new title: “Less is the cutting edge.” …Kidding. Probably.'),
    upgrade: [L('又一颗。每个音都更有理由了。', 'また一つ。どの音にも、もっと理由がある。', 'Another one. Every note has more reason now.'), L('嗯，这次连我都挑不出毛病。', 'うん、今回は僕でも文句のつけようがない。', 'Mm, even I can’t find fault this time.')],
  },
  araya: {
    intro: [
      [L('一个八度有几个音？', '一オクターヴに、音はいくつ？', 'How many notes are in an octave?'), L('……十二个？', '……十二？', '…Twelve?'), L('为什么呢？', 'どうして？', 'Why?')],
      [L('欢迎。走了这么远，累了吧。', 'ようこそ。遠くまで来て、疲れたでしょう。', 'Welcome. You’ve come far — you must be tired.'), L('前面四章，你学的是一套非常强大的体系。', 'これまでの四章で学んだのは、とても強力な一つの体系。', 'The last four chapters taught you one very powerful system.'), L('今天我们去看看，它的边界在哪里。', '今日は、その境界を見に行きましょう。', 'Today, let’s go and see where its edges are.')],
    ],
    end: {
      1: [
        [S('one_star', '你已经走出熟悉的地图了。', '慣れた地図の外へ出たわね。', 'You’ve stepped off the familiar map.'), S('default', '虽然只走了一小步。', 'ほんの一歩だけど。', 'If only by a step.')],
        [S('one_star', '嗯，我们回来了。', 'ええ、戻ってきたわね。', 'Mm, we’re back.'), S('speaking', '有几个地方，你还是问了钢琴。下次试着问声音。', '何か所か、まだピアノに聞いていたわ。次は音に聞いてみて。', 'A few times you still asked the piano. Next time, ask the sound.')],
      ],
      2: [
        [S('two_star', '很好。', 'いいわね。', 'Good.'), S('speaking', '你开始知道，“正确的音高”这句话需要条件。', '「正しい音高」という言葉に条件が要ると、わかり始めたのね。', 'You’re starting to see that “correct pitch” needs conditions.')],
        [S('two_star', '你走得很稳。', 'しっかり歩けたわ。', 'You walked steadily.'), S('proud', '前面四章的体系，你现在知道它的边在哪里了。', 'これまでの体系の境界が、今は見えているわね。', 'You can see the edges of the old system now.')],
      ],
      3: [
        [S('three_star', '（她微微一笑。）', '（彼女は微笑む。）', '(She smiles.)'), S('concede', '我认输。', '私の負け。', 'I concede.'), S('speaking', '或者——这里本来就没有什么需要赢的。', 'それとも——ここには、勝つべきものなんて最初からなかったのかも。', 'Or perhaps — there was never anything here to win.'), S('default', '继续走吧。地图之外，还有地图。', '歩き続けて。地図の外にも、地図がある。', 'Keep walking. Beyond the map, there are more maps.')],
        [S('three_star', '每一张地图，你都用它自己的方式读了。', 'どの地図も、それ自身のやり方で読めたわね。', 'You read every map in its own way.'), S('speaking', '一个八度有几个音？', '一オクターヴに、音はいくつ？', 'How many notes in an octave?'), S('concede', '……现在，你可以自己回答了。', '……今なら、自分で答えられるわね。', '…Now you can answer that yourself.')],
      ],
    },
    first: L('米米每次都会问我：为什么这里不是十二个音？……我很喜欢她。', 'ミミはいつも聞くの。どうしてここは十二音じゃないの？って。……あの子が好きよ。', 'Mimi always asks me: why isn’t it twelve notes here? …I’m very fond of her.'),
    upgrade: [L('你又走远了一点。', 'また少し遠くまで来たわね。', 'You’ve gone a little further.'), L('这次，你几乎没有去问钢琴。', '今回は、ほとんどピアノに聞かなかったわね。', 'This time you hardly asked the piano at all.')],
  },
  'araya-ex': {
    intro: [
      [L('你已经知道，体系不止一个。', '体系が一つではないことは、もう知っているわね。', 'You already know there’s more than one system.'), L('那么，是不是所有东西都一样，都没有标准？', 'では、どれも同じで、基準なんてないのかしら？', 'So is everything the same, with no standards at all?'), L('……塞维尔的规则很漂亮。只是没有他以为的那么普遍。', '……セヴェールの規則はとても美しい。ただ、本人が思うほど普遍ではないだけ。', '…Sever’s rules are beautiful. Just not as universal as he thinks.'), L('可它们依然是规则。', 'それでも、規則は規則。', 'Yet they are still rules.')],
      [L('这一次，我们走进别人的地图。', '今回は、別の人の地図の中に入りましょう。', 'This time, we step inside someone else’s map.'), L('别急着把它翻译成你熟悉的东西。', '慣れたものに訳そうと急がないで。', 'Don’t rush to translate it into what you know.'), L('用它自己的语言，读它。', 'その地図自身の言葉で、読んで。', 'Read it in its own language.')],
    ],
    end: {
      1: [
        [S('one_star', '你走进了另一张地图。', '別の地図に入ったわね。', 'You entered another map.'), S('default', '但你还在用自己的图例读它。', 'でも、まだ自分の凡例で読んでいる。', 'But you’re still reading it with your own legend.')],
        [S('one_star', '嗯，走完了。', 'ええ、歩ききったわ。', 'Mm, we made it through.'), S('speaking', '有几处，你把别人的地图画成了自己的。', '何か所か、別の地図を自分の地図に描き直していたわね。', 'A few times you redrew their map as your own.')],
      ],
      2: [
        [S('two_star', '很好。', 'いいわね。', 'Good.'), S('speaking', '你开始用它自己的语言说话了。', 'その地図自身の言葉で話し始めたわね。', 'You’re beginning to speak its own language.')],
        [S('two_star', '你很少把它们硬翻译过来。', '無理に訳すことは、ほとんどなかったわね。', 'You rarely forced a translation.'), S('proud', '这比记住名字更难。', 'それは名前を覚えるより難しいこと。', 'That’s harder than learning the names.')],
      ],
      3: [
        [S('three_star', '……', '……', '…'), S('speaking', '体系很多，标准也很多。', '体系はたくさん、基準もたくさん。', 'Many systems, many standards.'), S('serious', '但每一个都有自己的标准。', 'でも、それぞれに自分の基準がある。', 'But each has its own.'), S('serious', '最后那位研究者，会把这件事推得更远。……小心他。', '最後の研究者は、これをもっと先まで押し進める。……気をつけて。', 'The last researcher will push this much further. …Be careful of him.')],
        [S('three_star', '你没有把任何一张地图画成自己的。', 'どの地図も、自分の地図に描き直さなかったわね。', 'You never redrew anyone’s map as your own.'), S('concede', '我没有什么可以再考你的了。', 'もう試すことはないわ。', 'There’s nothing more I can test you on.'), S('serious', '……下一章，规则会被拿走。你要自己找到它们。', '……次の章では、規則が取り去られる。自分で見つけてね。', '…In the next chapter, the rules are taken away. You’ll have to find them yourself.')],
      ],
    },
    first: L('下一章的那个人，是从我这里出发的。……他走得太远了。', '次の章のあの人は、私のところから出発したの。……遠くへ行きすぎたわ。', 'The one in the next chapter set out from where I stand. …He went too far.'),
    upgrade: [L('你读地图的方式更准确了。', '地図の読み方が、もっと正確になったわね。', 'You read the maps more accurately now.'), L('这次你几乎没有硬翻译。', '今回は、ほとんど無理に訳さなかったわね。', 'This time you hardly forced a translation.')],
  },
  zero: {
    intro: [
      [L('你已经见过他们了。', 'もう、彼らに会ってきたのね。', 'You have met them all.'), L('基础。秩序。线条。自由。体系。', '基礎。秩序。線。自由。体系。', 'Basics. Order. Line. Freedom. System.'), L('他们每个人都教了你一些东西。也都只说对了一部分。', '誰もが何かを教えた。そして、誰もが一部だけ正しかった。', 'Each of them taught you something. Each was only partly right.'), L('现在告诉我。哪一个是真的。', '教えて。どれが本当なの。', 'Now tell me. Which one is true.')],
      [L('调性是一套体系。', '調性は一つの体系。', 'Tonality is a system.'), L('十二平均律是一套体系。', '十二平均律も一つの体系。', 'Equal temperament is a system.'), L('如果所有规则都可以换掉，规则本身还有意义吗。', 'すべての規則を取り替えられるなら、規則そのものに意味はあるの。', 'If every rule can be replaced, do rules mean anything at all.'), L('开始吧。', '始めましょう。', 'Let us begin.')],
    ],
    end: {
      1: [
        [S('one_star', '你通过了。', '通過した。', 'You passed.'), S('default', '但你仍然在寻找答案。', 'でも、まだ答えを探している。', 'But you are still looking for answers.')],
        [S('one_star', '……足够了。', '……十分。', '…Enough.'), S('serious', '你还在用熟悉的规则看陌生的东西。', 'まだ見慣れた規則で、見慣れないものを見ている。', 'You still read the unfamiliar with familiar rules.')],
      ],
      2: [
        [S('two_star', '你已经不再依赖唯一的答案。', 'もう唯一の答えには頼っていない。', 'You no longer depend on a single answer.'), S('default', '很好。', 'いいわ。', 'Good.')],
        [S('two_star', '大多数时候，你看见了关系。', 'ほとんどの場合、関係が見えていた。', 'Most of the time, you saw the relations.'), S('serious', '剩下的，也只是还没看见。', '残りも、まだ見えていないだけ。', 'The rest are only not yet seen.')],
      ],
      3: [
        [S('three_star', '（长时间的沉默。）', '（長い沈黙。）', '(A long silence.)'), S('serious', '你不是在寻找正确的规则。', 'あなたは正しい規則を探していたのではない。', 'You were not searching for the right rules.'), S('default', '你在听规则之间的关系。', '規則と規則の関係を聴いていた。', 'You were listening to the relations between rules.'), S('concede', '（零闭上眼。）我输了。', '（ゼロは目を閉じる。）私の負け。', '(Zero closes his eyes.) I have lost.')],
        [S('three_star', '调性、音名、十二音、平均律——都拿掉了。', '調性、音名、十二音、平均律——すべて取り去った。', 'Tonality, names, twelve tones, temperament — all removed.'), S('serious', '你还站着。', 'それでも、あなたは立っている。', 'And you are still standing.'), S('concede', '……我输了。', '……私の負け。', '…I have lost.')],
      ],
    },
    first: L('还剩一个问题。规则可以由你来选。那你会怎么选。', 'まだ一つ問いが残っている。規則はあなたが選べる。では、どう選ぶの。', 'One question remains. You may choose the rules. How will you choose.'),
    upgrade: [L('……你比上一次听得更清楚。', '……前回より、はっきり聴こえている。', '…You hear more clearly than last time.'), L('更接近了。', 'より近づいた。', 'Closer.')],
  },
  'zero-ex': {
    intro: [
      [L('规则可以选择。你证明了。', '規則は選べる。あなたが証明した。', 'Rules can be chosen. You proved it.'), L('那么，你会想怎么定就怎么定吗。', 'では、好きなように決めるの。', 'So will you set them however you like.'), L('我不评价你的审美。', 'あなたの美意識は評価しない。', 'I will not judge your taste.'), L('我只看你的规则和你做的事，是不是一致。', '規則と、あなたのすることが一致しているか。それだけを見る。', 'I will only see whether your rules and your actions agree.')],
      [L('最后一次。', '最後よ。', 'One last time.'), L('这一次，规则由你来定。', '今度は、規則をあなたが決める。', 'This time, you set the rules.'), L('定下了，就要承担它带来的一切。', '決めたなら、それがもたらすすべてを引き受けて。', 'Once set, you bear everything they bring.')],
    ],
    end: {
      1: [
        [S('one_star', '你定了规则。', '規則は決めた。', 'You set rules.'), S('default', '有几次，你自己没有遵守。', '何度か、自分で守らなかった。', 'A few times, you didn’t keep them yourself.')],
        [S('one_star', '……通过。', '……通過。', '…Passed.'), S('serious', '规则写下来以后，就不只是你的心情了。', '規則は書いた時点で、もうあなたの気分だけではない。', 'Once written, a rule is no longer just your mood.')],
      ],
      2: [
        [S('two_star', '你的规则，大多和你的选择一致。', 'あなたの規則は、ほとんど選択と一致していた。', 'Your rules mostly agreed with your choices.'), S('default', '剩下的，也是你的。', '残りも、あなたのもの。', 'The rest is yours too.')],
        [S('two_star', '你很少自相矛盾。', '自己矛盾はほとんどなかった。', 'You rarely contradicted yourself.'), S('serious', '这比遵守别人的规则更难。', 'それは他人の規則を守るより難しい。', 'That is harder than keeping someone else’s rules.')],
      ],
      3: [
        [S('three_star', '……', '……', '…'), S('serious', '不是遵守传统。不是打破传统。甚至也不是创造规则。', '伝統を守ることでも、壊すことでもない。規則を作ることでさえない。', 'Not keeping tradition. Not breaking it. Not even creating rules.'), S('default', '而是知道自己为什么选择这些规则。', '自分がなぜその規則を選ぶのか、知っていること。', 'But knowing why you choose the rules you choose.'), S('concede', '……你可以走了。地图之外，还有地图。', '……行っていい。地図の外にも、地図がある。', '…You may go. Beyond the map, there are more maps.')],
        [S('three_star', '你定的每一条规则，你都遵守了。', 'あなたが決めた規則は、すべて守られた。', 'Every rule you set, you kept.'), S('serious', '改规则的时候，你也说清楚了为什么。', '規則を変えるときも、理由をはっきり言った。', 'When you changed one, you said why.'), S('concede', '……我没有可以再问的了。', '……もう問うことはない。', '…I have nothing left to ask.')],
      ],
    },
    first: L('我们六个人，你都见过了。……谢谢你，陪我们走到最后。', '六人全員に会ったのね。……最後まで付き合ってくれて、ありがとう。', 'You have met all six of us. …Thank you for walking with us to the end.'),
    upgrade: [L('更一致了。', 'さらに一貫した。', 'More consistent.'), L('你的规则，更清楚了。', 'あなたの規則が、より明確になった。', 'Your rules are clearer now.')],
  },
};

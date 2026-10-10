// 乐理闯关的 Boss 战：6 名角色、16 个节点（普通 / EX、两个道中 Boss），每场 15 题。
// 角色、台词、教育主题、出场位置与解锁条件依据作者的设计文档（jcchar/设定文案.txt、关卡设计.txt、关卡节奏.txt、补充.txt）；
// 立绘在 resources/boss（800 × 800，切换方式见 boss_sprite.js）。
//
// 题目（learn_boss_questions.js）：每一场围绕一个"错误音乐观"重新设计 15 题——Boss 用自己的错误观点出题，题目本身就是反例，
// 玩家一题一题答对，把这个观点拆掉（EX 与第五章阿拉娅：错误观点在玩家身上，由 Boss 追问）。题目只用 A 面关卡讲过的乐理，每题标出 ref。
//
// 15 题剧情曲线（补充.txt）：Q1–4 试探、Q5–9 交锋、Q10 转折（Boss 第二阶段）、Q11–14 高潮、Q15 Finisher。
// mode：probe 试探 / alter 角色主动修改音乐 / listen 听辨角色演奏 / fix 修复角色故意制造的问题。
// 普通 Boss 纠正一个错误音乐观；EX 防止玩家把正确结论过度简化成另一个错误音乐观（关卡设计.txt）。
import { BOSS_GATES } from './learn_boss_gates.js?v=20261010-boss1';
import { CAST_LINES, BOSS_LINES } from './learn_boss_lines.js?v=20261011-fix3';
import { levelCameoLines } from './learn_boss_cameo_gen.js?v=20261010-bq1';
import { BOSS_QUESTIONS } from './learn_boss_questions.js?v=20261010-bq2';

const t = (zh, ja, en) => ({ zh, ja, en });

/** 题目绑定方式的小标签（无障碍：不只靠表情和颜色，文字也说清这一题是什么） */
export const MODE_LABEL = {
  probe: t('试探', '小手調べ', 'Probe'),
  alter: t('她 / 他改了音乐', '音楽を書き換えた', 'Rewritten music'),
  listen: t('听角色演奏', '演奏を聴く', 'Listen to the boss'),
  fix: t('修好故意的错误', 'わざとのミスを直す', 'Fix the planted mistake'),
};

/**
 * 六名角色：dir 立绘目录、motion 动画语言（补充.txt：避免六个人用同一套动画）、sfx 与本章知识有关的音效（MIDI 音或 Hz）、
 * lines 碎碎念池（答对 / 答错 / 连对 3 题 / 连错 2 题 / 翻盘 / 重战）。
 * 说话习惯与禁用语气按设定文案：塞维尔不讲网络梗、零不大喊大叫（不用感叹号）、阿拉娅不恶意羞辱；"杂鱼"只给米米的一星结局。
 */
export const CAST = {
  mimi: {
    dir: '01_mimi', motion: 'spring', code: 'MIMI',
    name: t('米米', 'ミミ', 'Mimi'), title: t('基础乐理守门人', '基礎楽理の門番', 'Gatekeeper of the basics'),
    sfx: { enter: [[72], [76], [79], [84]], hit: [[76, 79]], streak: [[72, 84]], phase: [[72, 78]], end: [[72, 79, 84]] },
    lines: {
      right: [t('嗯。', 'ふん。', 'Mm.'), t('至少不是乱猜。', '少なくとも当てずっぽうじゃない。', 'At least that wasn’t a guess.'), t('这种程度当然应该答对。', 'これくらい、正解して当然。', 'Obviously you should get that one.'), t('……还行。', '……まあね。', '…Fine.'), t('看清楚了嘛。', 'ちゃんと見てるじゃない。', 'So you did look.')],
      wrong: [t('你真的数了吗？', 'ちゃんと数えた？', 'Did you actually count?'), t('不要靠感觉乱点！', '感覚で押さないで！', 'Don’t just click on a hunch!'), t('这你也能错？', 'これを間違える？', 'You got *that* wrong?'), t('看一眼？你看了半眼吧。', '一目見た？半目でしょ。', 'You looked? You half-looked.'), t('先看解析。别急着下一题。', 'まず解説を読んで。次に急がない。', 'Read the explanation first. Don’t rush on.')],
      streak: [t('……等等。', '……ちょっと待って。', '…Wait.'), t('你是不是偷偷练过？', 'こっそり練習してきた？', 'Have you been practising in secret?'), t('哼，运气不错嘛。……才不是运气？', 'ふん、運がいいじゃない。……運じゃない？', 'Hmph, lucky. …Not luck?'), t('别得意。下一题。', '調子に乗らないで。次。', 'Don’t get cocky. Next.')],
      wrong2: [t('停。慢一点。认真数，一个一个来。', 'ストップ。ゆっくり。一つずつ数えて。', 'Stop. Slow down. Count them one at a time.'), t('想错了没关系。乱猜才不行。', '考えて間違えるのはいい。当てずっぽうがダメなの。', 'Thinking and missing is fine. Guessing isn’t.'), t('看解析里的那一步。就差那一步。', '解説のその一歩を見て。そこだけ。', 'Look at that one step in the explanation. That’s all you missed.'), t('……我也不是一开始就会的。好吧，我是。但你可以练。', '……私だって最初から……いや、できたけど。あなたは練習すればいい。', '…I wasn’t born knowing— okay, I was. But you can practise.')],
      comeback: [t('哈？追上来了？', 'は？追いついてきた？', 'Huh? You’re catching up?'), t('前面那几题是故意的吧？', 'さっきのミスはわざと？', 'Were those early misses on purpose?'), t('……认真起来了嘛。', '……本気になったじゃない。', '…Now you’re serious.')],
      rematch: [t('又来了？这次给我认真看。', 'また来たの？今度はちゃんと見て。', 'Back again? Look properly this time.'), t('上次的题我换过了。别想背答案。', '前の問題は変えた。答えを覚えても無駄。', 'I changed the questions. Memorising won’t help.'), t('好吧。重来就重来。', 'いいよ。もう一回ね。', 'Fine. Again it is.')],
    },
  },
  sever: {
    dir: '02_sever', motion: 'still', code: 'SEVER',
    name: t('塞维尔', 'セヴェール', 'Sever'), title: t('和声审判官', '和声の審判官', 'The Harmony Judge'),
    sfx: { enter: [[55, 59, 62, 65], [48, 52, 55, 60]], hit: [[48, 55, 64]], streak: [[55, 59, 62, 65]], phase: [[56, 60, 63, 66]], end: [[53, 57, 60], [48, 52, 55, 60]] },
    lines: {
      right: [t('成立。', '成立。', 'Valid.'), t('正确。', '正解。', 'Correct.'), t('依据充分。', '根拠は十分。', 'Well supported.'), t('……可以。', '……よし。', '…Acceptable.'), t('继续。', '続けよ。', 'Continue.')],
      wrong: [t('错误。', '誤り。', 'Incorrect.'), t('标签正确，理解错误。', 'ラベルは正しい。理解が誤り。', 'Right label. Wrong understanding.'), t('你只看见了和弦，没有看见功能。', '和音は見えている。機能が見えていない。', 'You saw the chord. Not its function.'), t('重新听。', '聴き直せ。', 'Listen again.'), t('依据？', '根拠は？', 'On what basis?')],
      streak: [t('有趣。', '興味深い。', 'Interesting.'), t('……继续。', '……続けよ。', '…Continue.'), t('你在听关系，不只是名称。', '名称ではなく、関係を聴いている。', 'You are hearing relations, not just names.'), t('（领口松了一点。）', '（襟元が少し緩む。）', '(His collar loosens slightly.)')],
      wrong2: [t('停。先读解析，再看它要去哪里。', '止まれ。解説を読み、行き先を見よ。', 'Stop. Read the explanation, then see where it goes.'), t('规则不是用来背的。它解释连接。', '規則は暗記するものではない。連結を説明するものだ。', 'Rules are not for memorising. They explain connections.'), t('从低音开始。总是从低音开始。', 'バスから始めよ。常にバスから。', 'Start from the bass. Always the bass.'), t('慢一点。秩序需要时间。', 'ゆっくりでいい。秩序には時間がかかる。', 'Slowly. Order takes time.')],
      comeback: [t('……修正得很快。', '……修正が速い。', '…A swift correction.'), t('错误之后的判断，才看得出水平。', '誤りの後の判断にこそ、力量が出る。', 'Judgement after an error shows real ability.'), t('合理。', '合理的だ。', 'Reasonable.')],
      rematch: [t('再审一次。', 'もう一度審理する。', 'A retrial, then.'), t('上次的问题，你想清楚了？', '前回の問題、考えはまとまったか。', 'Have you thought through last time’s questions?'), t('题目换了。依据不会换。', '問題は変えた。根拠は変わらない。', 'The questions changed. The grounds did not.')],
    },
  },
  noa: {
    dir: '03_noa', motion: 'drift', code: 'NOA',
    name: t('诺亚', 'ノア', 'Noa'), title: t('旅行乐手', '旅の楽士', 'The wandering musician'),
    sfx: { enter: [[55, 62]], hit: [[62, 67]], streak: [[67, 71]], phase: [[60, 65], [60, 64]], end: [[57, 64], [57, 62]] },
    lines: {
      right: [t('嗯，就是这样。', 'うん、それ。', 'Yeah, like that.'), t('听到了吧？', '聴こえたでしょ？', 'You heard it, right?'), t('这条线挺顺。', 'この線、いい流れ。', 'That line flows.'), t('不错。', '悪くない。', 'Not bad.'), t('哦。', 'へえ。', 'Oh.')],
      wrong: [t('别急着看名字。', '名前を急がないで。', 'Don’t rush to the name.'), t('先听它往哪走。', 'まず、どこへ行くか聴いて。', 'First hear where it’s going.'), t('两个声部撞上了。', '二つの声部がぶつかった。', 'The two voices bumped.'), t('嗯……再走一遍？', 'うーん……もう一回歩く？', 'Hmm… walk it once more?'), t('没事。看看解析，慢慢来。', '大丈夫。解説見て、ゆっくりね。', 'It’s fine. Check the explanation, take your time.')],
      streak: [t('哦。', 'おお。', 'Oh.'), t('开始会看线条了。', '線が見えてきたね。', 'You’re starting to see lines.'), t('……（眼睛睁大了一点。）', '……（目が少しだけ大きくなる。）', '…(His eyes open a little wider.)'), t('你不只是在看和弦了。', 'もう和音だけ見てないね。', 'You’re not just looking at chords anymore.')],
      wrong2: [t('停一下。哼一哼这条线。', 'ちょっと止まって。線を口ずさんで。', 'Pause. Hum the line.'), t('别只看一个瞬间。音乐是往前走的。', '一瞬だけ見ないで。音楽は前に進む。', 'Don’t look at one instant. Music moves forward.'), t('解析里说的那一步，你用耳朵试试。', '解説のその一歩、耳で試してみて。', 'Try that step from the explanation with your ears.'), t('挺乱。不过没停下来，这也挺重要。', 'ごちゃっとしてる。でも止まってない、それ大事。', 'Messy. But you didn’t stop. That matters.')],
      comeback: [t('哦，回来了。', 'お、戻ってきた。', 'Oh, you’re back.'), t('迷路的人走出来，路就记住了。', '迷った人が抜け出すと、道を覚える。', 'Get lost and find your way out, and you remember the road.'), t('嗯。慢慢就顺了。', 'うん。だんだん流れてきた。', 'Mm. It’s flowing now.')],
      rematch: [t('又碰见了。走走？', 'また会ったね。歩く？', 'Ran into you again. Walk with me?'), t('上次那段路，换个方向走。', '前の道、別の方向から行こう。', 'Same road as last time, different direction.'), t('不急。', '急がないよ。', 'No hurry.')],
    },
  },
  jaz: {
    dir: '04_jaz', motion: 'wild', code: 'JAZ',
    name: t('爵', 'ジャズ', 'Jaz'), title: t('即兴之王（自称）', '即興の王（自称）', 'King of Improv (self-titled)'),
    sfx: { enter: [[48, 52, 58, 62, 69]], hit: [[52, 58]], streak: [[55, 59, 65, 68]], phase: [[55, 59, 65, 68, 70]], end: [[52, 59]] },
    lines: {
      right: [t('哈？居然对了？', 'は？当たり？', 'Huh? You got it?'), t('行吧，这个算你的。', 'まあ、それは君のだ。', 'Fine, that one’s yours.'), t('嗯哼，有点意思！', 'ふーん、面白いじゃん！', 'Mm-hm, interesting!'), t('不错不错——下一个更难！', 'いいね——次はもっと難しいぞ！', 'Nice, nice — the next one’s harder!'), t('好耳朵！……我是说，还行。', 'いい耳！……いや、まあまあ。', 'Good ears! …I mean, okay.')],
      wrong: [t('哈哈！我就知道！', 'ハハ！やっぱりね！', 'Ha! Knew it!'), t('你那是背的吧？', 'それ暗記でしょ？', 'You memorised that, didn’t you?'), t('来，看解析——我先帮你翻开。', 'ほら、解説——開いといてあげる。', 'Here, the explanation — I opened it for you.'), t('差一点点！', '惜しい！', 'So close!'), t('没关系，爵士没有错音——只有没解决的音！', '大丈夫、ジャズに間違いの音はない——解決してない音だけ！', 'No worries — in jazz there are no wrong notes, only unresolved ones!')],
      streak: [t('？', '？', '?'), t('等等。这不对吧。', '待って。おかしくない？', 'Wait. That’s not right.'), t('你能不能错一道？', '一問くらい間違えてくれない？', 'Could you miss one, please?'), t('喂喂喂，这不是我的剧本！', 'おいおい、これ僕の台本じゃない！', 'Hey hey hey, this isn’t my script!')],
      wrong2: [t('嘿，慢下来。先抓住三音和七音。', 'おい、落ち着いて。まず 3 度と 7 度。', 'Hey, slow down. Grab the third and seventh first.'), t('听低音！低音不会骗你！', 'ベースを聴け！ベースは嘘つかない！', 'Listen to the bass! The bass doesn’t lie!'), t('看解析那行——对，就那行。', '解説のその行——そう、そこ。', 'That line in the explanation — yeah, that one.'), t('我第一次也错过。……就一次。', '僕も最初は間違えた。……一回だけね。', 'I missed that once too. …Just once.')],
      comeback: [t('哇哦，逆转！好的独奏就该这样！', 'うわ、逆転！いいソロってこうでなきゃ！', 'Whoa, a comeback! That’s how a good solo goes!'), t('刚才是故意留空当吧？', 'さっきのは、わざと間を空けたの？', 'Were you leaving space on purpose back there?'), t('行啊你，会回来了！', 'やるね、戻ってこれる！', 'Not bad — you know how to come back!')],
      rematch: [t('哟，再来一轮 chorus？', 'よっ、もうワンコーラス？', 'Yo, another chorus?'), t('上次那几个音我练过了！', 'この前の音、練習してきたから！', 'I practised those notes since last time!'), t('这次我加更多音！', '今度はもっと音を足すぞ！', 'This time I’m adding more notes!')],
    },
  },
  araya: {
    dir: '05_araya', motion: 'calm', code: 'ARAYA',
    name: t('阿拉娅', 'アラヤ', 'Araya'), title: t('旅行学者', '旅する学者', 'The travelling scholar'),
    sfx: { enter: [{ hz: [110] }, { hz: [110, 220] }, { hz: [110, 220, 330] }, { hz: [110, 220, 330, 440, 550, 660] }], hit: [{ hz: [220, 330] }], streak: [{ hz: [220, 275, 330] }], phase: [{ hz: [261.63, 265.18] }], end: [{ hz: [220, 275, 330] }] },
    lines: {
      right: [t('很好。', 'いいわね。', 'Good.'), t('你开始听见差异了。', '違いが聴こえ始めたわね。', 'You’re beginning to hear the difference.'), t('嗯。这一点，很多人要走很久。', 'ええ。ここまで来るのに、長くかかる人も多い。', 'Yes. Many people take a long road to that.'), t('就是这样。', 'そう、それ。', 'Just so.'), t('你没有问钢琴。很好。', 'ピアノに聞かなかったのね。いいわ。', 'You didn’t ask the piano. Good.')],
      wrong: [t('再听一次。', 'もう一度聴いて。', 'Listen once more.'), t('不要问钢琴。问声音。', 'ピアノに聞かないで。音に聞いて。', 'Don’t ask the piano. Ask the sound.'), t('这是十二平均律告诉你的。不是自然告诉你的。', 'それは十二平均律が言ったこと。自然が言ったことではない。', 'That’s what equal temperament told you. Not nature.'), t('没关系。地图换了，迷路很正常。', '大丈夫。地図が変われば、迷うのは自然なこと。', 'It’s all right. New map, of course you get lost.'), t('读一读解析。它写的是这个体系自己的话。', '解説を読んで。この体系自身の言葉で書いてある。', 'Read the explanation. It speaks in this system’s own words.')],
      streak: [t('……你走得很远了。', '……ずいぶん遠くまで来たわね。', '…You have travelled far.'), t('（她微笑了一下。）', '（彼女が少し微笑む。）', '(She smiles slightly.)'), t('你在用这张地图自己的规则读它。', 'この地図を、それ自身の規則で読んでいる。', 'You are reading this map by its own rules.'), t('很少有人这么快。', 'こんなに早い人は少ないわ。', 'Few people get here so quickly.')],
      wrong2: [t('先停一停。我们离家已经很远了，慢一点没关系。', '少し休みましょう。家から遠くまで来たもの、ゆっくりでいい。', 'Let’s pause. We are far from home; slowness is fine.'), t('把你熟悉的那套先放下，再看一次。', '慣れた体系をいったん置いて、もう一度見て。', 'Set aside the system you know, and look again.'), t('问题不在你，在“默认”。', '問題はあなたではなく、「当たり前」の方。', 'The problem isn’t you. It’s the defaults.'), t('一个八度有几个音？……先不急着回答。', '一オクターヴにいくつ音がある？……急いで答えなくていい。', 'How many notes in an octave? …No need to answer quickly.')],
      comeback: [t('你找到方向了。', '方角が見つかったのね。', 'You found your bearings.'), t('看，地图之外也能走路。', 'ほら、地図の外でも歩ける。', 'See — you can walk beyond the map.'), t('很好。继续。', 'いいわ。続けましょう。', 'Good. Let’s go on.')],
      rematch: [t('又见面了。这次走另一条路。', 'また会えたわね。今度は別の道を。', 'We meet again. Another road this time.'), t('一个八度有几个音？', '一オクターヴにいくつ音がある？', 'How many notes in an octave?'), t('上次的问题，还在你心里吗？', '前の問い、まだ心に残っている？', 'Is last time’s question still with you?')],
    },
  },
  zero: {
    dir: '06_zero', motion: 'zero', code: 'ZERO',
    name: t('零', 'ゼロ', 'Zero'), title: t('最终研究者', '最後の研究者', 'The final researcher'),
    sfx: { enter: [[60, 61, 64]], hit: [[61]], streak: [[60, 66]], phase: [[60, 62, 64, 66]], end: [{ hz: [200, 244.44, 300] }] },
    lines: {
      right: [t('成立。', '成立。', 'Valid.'), t('继续。', '続けて。', 'Continue.'), t('……嗯。', '……ええ。', '…Mm.'), t('关系是对的。', '関係は正しい。', 'The relation holds.'), t('好。', 'いい。', 'Good.')],
      wrong: [t('你又在寻找熟悉的规则。', 'また見慣れた規則を探している。', 'You are looking for familiar rules again.'), t('这里没有。', 'ここには、ない。', 'There are none here.'), t('不是没有规则。只是没有你熟悉的规则。', '規則がないのではない。見慣れた規則がないだけ。', 'It is not that there are no rules. Only none you know.'), t('看解析。看关系，不看名字。', '解説を。名前ではなく、関係を見て。', 'Read the explanation. Relations, not names.'), t('……再想一次。', '……もう一度考えて。', '…Think again.')],
      streak: [t('……', '……', '…'), t('有意思。', '面白い。', 'Interesting.'), t('（第一次出现明显的停顿。）', '（初めて、はっきりとした間がある。）', '(For the first time, a clear pause.)'), t('你没有在找答案。你在找结构。', '答えではなく、構造を探しているのね。', 'You are not looking for answers. You are looking for structure.')],
      wrong2: [t('停下来。规则在哪里，先找出来。', '止まって。規則がどこにあるか、まず見つけて。', 'Stop. First find where the rule is.'), t('数字只是名字。关系才是东西。', '数字は名前にすぎない。関係こそが実体。', 'Numbers are only names. Relations are the thing.'), t('解析里那一步，是这个系统自己的规则。', '解説のその一歩が、この体系自身の規則。', 'That step in the explanation is this system’s own rule.'), t('不急。这里没有时间。', '急がないで。ここに時間はない。', 'No hurry. There is no time here.')],
      comeback: [t('……你回来了。', '……戻ってきた。', '…You came back.'), t('错误也是一种结构。你读懂了它。', '誤りも一つの構造。あなたはそれを読んだ。', 'An error is a structure too. You read it.'), t('继续。', '続けて。', 'Continue.')],
      rematch: [t('又是你。', 'また、あなた。', 'You again.'), t('上一次的答案，你现在还相信吗。', '前回の答え、今も信じている？', 'Do you still believe last time’s answers.'), t('开始。', '始めましょう。', 'Begin.')],
    },
  },
};

/**
 * 16 个节点。section：所在章；after：道中 Boss 跟在哪一关后面（null = 章末、章节测试前面）；pool：main 主关题 / advanced 进阶与支线题；
 * intro 开场台词（sprite：开场立绘）；memo 二次见面时按上一次的星级接一句（只有塞维尔、爵的章末战）；
 * endings 1–3 星结局台词；firstClear 第一次通关、upgrade 重打升星的特别台词；
 * 题目里的 right / wrong 只覆盖这一题的反应台词（例如爵的"只用了两个音？"）。
 */
export const BOSSES = [
  // ---------------- 第一章 · 米米 ----------------
  {
    id: 'mimi', cast: 'mimi', section: 'basics', after: null, pool: 'main',
    theme: t('你真的看了吗？', 'ちゃんと見た？', 'Did you actually look?'),
    lesson: t('基础简单，不代表可以随便：可靠的基础来自认真看、认真听、认真数。', '基礎が簡単でも、適当でいいわけじゃない。確かな基礎は、よく見て、よく聴いて、よく数えることから。', 'Simple basics don’t mean careless basics: reliable fundamentals come from looking, listening and counting carefully.'),
    intro: [t('终于来了？', 'やっと来た？', 'Finally here?'), t('先说好，我不会因为你是新人就故意出简单题。', '先に言っておくけど、新人だからって簡単な問題にはしないから。', 'Just so you know, I’m not going easy on you because you’re new.'), t('……虽然本来就很简单。', '……まあ、もともと簡単だけど。', '…Not that any of it is hard.')],
    endings: {
      1: [t('哈？这样也算赢？', 'は？これで勝ち？', 'Huh? You call that winning?'), t('杂鱼。', 'ざこ。', 'Small fry.'), t('……规则就是规则，过去吧。', '……ルールはルール。通っていいよ。', '…Rules are rules. Go on through.')],
      2: [t('还不错。', 'まあまあね。', 'Not bad.'), t('至少以后不会把六八拍数成六个大拍了。', '少なくとも、もう 6/8 を 6 拍って数えないでしょ。', 'At least you won’t count 6/8 as six big beats anymore.')],
      3: [t('……好吧。', '……わかった。', '…Fine.'), t('不是蒙的。', '当てずっぽうじゃない。', 'That wasn’t guessing.'), t('我认输。', '私の負け。', 'I give up.')],
    },
    firstClear: t('第一次就过了？……下一章那个家伙超级无聊的，你小心别睡着。', '一回目で通過？……次の章のあいつ、超つまんないから寝ないでね。', 'First try? …The guy in the next chapter is super boring. Try not to fall asleep.'),
    upgrade: t('……比上次多了一颗星。你是真的回去练了。', '……前より星が一つ多い。本当に練習してきたんだ。', '…One more star than last time. You really did go and practise.'),
  },
  {
    id: 'mimi-ex', cast: 'mimi', ex: true, section: 'basics', after: null, pool: 'advanced',
    theme: t('你是真的会，还是只是见过？', '本当にできる？それとも見たことがあるだけ？', 'Do you really know it, or have you just seen it?'),
    lesson: t('熟悉 ≠ 掌握：换了谱号、换了写法、换了样子以后，你仍然知道自己为什么是对的。', '慣れている ≠ 身についている：音部記号や書き方、見た目が変わっても、なぜ正しいのか分かっていること。', 'Familiar ≠ mastered: change the clef, the spelling or the look, and you still know why you are right.'),
    intro: [t('你说你已经会了。', 'もうできるって言ったよね。', 'You say you’ve got it.'), t('那么——换个样子以后呢？', 'じゃあ——見た目を変えたら？', 'So — what if it looks different?'), t('这次我不会叫你新人了。', '今度は新人なんて呼ばない。', 'I won’t call you “newbie” this time.')],
    endings: {
      1: [t('哈？就这样？', 'は？これだけ？', 'Huh? That’s it?'), t('换个样子你就认不出来了。……不过过了就是过了。', '見た目を変えたら気づかないのね。……でも合格は合格。', 'Change the look and you can’t tell. …But a pass is a pass.')],
      2: [t('还行。', 'まあね。', 'Not bad.'), t('至少你不是只会认熟悉的题型。', '少なくとも、見慣れた形しか分からないわけじゃない。', 'At least you don’t only recognise familiar question types.')],
      3: [t('……好吧。', '……わかった。', '…Okay.'), t('你是真的会。', '本当にできるのね。', 'You really know it.'), t('……我认输。下次教我你是怎么练的。', '……私の負け。今度、どうやって練習したか教えて。', '…I give up. Next time, tell me how you practised.')],
    },
    firstClear: t('……阿拉娅一定会问你：为什么一个八度是十二个音？先想好答案。', '……アラヤならきっと聞くよ。なんで一オクターヴは十二音なの？って。答えを考えておいて。', '…Araya will definitely ask you why an octave has twelve notes. Have an answer ready.'),
    upgrade: t('又多一颗星。……你比我想的认真。', 'また星が一つ増えた。……思ってたより真面目ね。', 'Another star. …You’re more serious than I thought.'),
  },
  // ---------------- 第二章 · 塞维尔（道中：第 8 节之后；章末：章节测试前） ----------------
  {
    id: 'sever-mid', cast: 'sever', section: 'harmony', after: 'voicing', pool: 'main', sprite: 'first_meeting',
    theme: t('名称不是理解。', '名前は理解ではない。', 'A name is not understanding.'),
    lesson: t('会认单个和弦 ≠ 理解和声：性质、转位、罗马数字、数字低音、排列要连成一个系统。这一次，塞维尔基本是对的。', '和音を一つずつ言える ≠ 和声がわかる：種類・転回・ローマ数字・数字付き低音・配置をひとつの体系につなぐ。今回はセヴェールがほぼ正しい。', 'Naming single chords ≠ understanding harmony: quality, inversion, Roman numerals, figured bass and voicing must form one system. This time Sever is mostly right.'),
    intro: [t('你已经记住了不少名称。', '名称はずいぶん覚えたようだ。', 'You have memorised a good many names.'), t('很好。', 'よろしい。', 'Good.'), t('现在把名称全部放下。', 'では、名称をすべて置け。', 'Now set every name aside.'), t('告诉我——它们为什么这样连接。', '答えよ——なぜそのようにつながるのか。', 'Tell me — why do they connect as they do.')],
    endings: {
      1: [t('通过。', '通過。', 'Passed.'), t('名称你记住了。关系，还没有。', '名称は覚えた。関係はまだだ。', 'The names, you have. The relations, not yet.')],
      2: [t('合格。', '合格。', 'Satisfactory.'), t('你开始把标签连成系统。', 'ラベルを体系につなぎ始めている。', 'You are beginning to join labels into a system.')],
      3: [t('合格。', '合格。', 'Satisfactory.'), t('但你现在所理解的，只是秩序最稳定的部分。', 'だが今の理解は、秩序のもっとも安定した部分にすぎない。', 'But what you understand now is only the most stable part of the order.'), t('继续走。', '進め。', 'Go on.'), t('后面的和声……不会这么听话。', 'この先の和声は……これほど従順ではない。', 'The harmony ahead… will not be so obedient.')],
    },
    firstClear: t('米米说我无聊？……基本功尚可，纪律性不足。转告她。', 'ミミが私を退屈だと？……基礎はまずまず、規律が足りない。そう伝えよ。', 'Mimi calls me boring? …Fundamentals adequate, discipline lacking. Tell her that.'),
    upgrade: t('比上一次更接近秩序。', '前回より秩序に近い。', 'Closer to order than last time.'),
  },
  {
    id: 'sever-mid-ex', cast: 'sever', ex: true, section: 'harmony', after: 'voicing', pool: 'advanced', sprite: 'first_meeting',
    theme: t('标签是对象本身吗？', 'ラベルは対象そのものか？', 'Is the label the object itself?'),
    lesson: t('标签依赖观察角度：低音、调性、记法和排列改变我们描述它的方式，但声音本身没有变。', 'ラベルは見る角度による：バス・調・記法・配置が変われば記述も変わるが、音そのものは同じ。', 'Labels depend on the point of view: bass, key, notation and spacing change how we describe it, while the sound itself stays the same.'),
    intro: [t('你通过了上一次审查。', '前回の審査は通過した。', 'You passed the last review.'), t('那么，一个对象应当只有一个正确的描述。', 'ならば、一つの対象には正しい記述が一つだけあるはずだ。', 'Then one object should have exactly one correct description.'), t('……证明给我看，它不是。', '……そうでないと、証明してみせよ。', '…Prove to me that it does not.')],
    endings: {
      1: [t('通过。', '通過。', 'Passed.'), t('描述不同，对象相同——你还没有真正看见这一点。', '記述は違っても対象は同じ——まだ本当には見えていない。', 'Different descriptions, same object — you have not truly seen it yet.')],
      2: [t('……成立。', '……成立。', '…Valid.'), t('同一个声音，可以有不止一个名字。我记下了。', '同じ響きに、名前は一つとは限らない。記録しておく。', 'One sound may have more than one name. Noted.')],
      3: [t('……等等。', '……待て。', '…Wait.'), t('音乐对象并不总是和一个标签一一对应。', '音楽の対象は、必ずしもラベルと一対一ではない。', 'A musical object does not always map one-to-one onto a label.'), t('那只是因为你的描述条件还不够完整。', 'それは記述の条件がまだ不完全だからにすぎない。', 'That is only because your descriptive conditions are not yet complete.'), t('……章节测试前，我们再见。', '……章末試験の前に、また会おう。', '…We will meet again before the chapter test.')],
    },
    firstClear: t('如果第四章那个人告诉你平行五度无所谓，不要听。', '第四章のあの男が平行五度など構わないと言っても、耳を貸すな。', 'If the man in chapter four tells you parallel fifths don’t matter, do not listen.'),
    upgrade: t('描述更完整了。', '記述がより完全になった。', 'Your description is more complete.'),
  },
  {
    id: 'sever', cast: 'sever', section: 'harmony', after: null, pool: 'main', sprite: 'return_meeting', previous: 'sever-mid',
    theme: t('规则不是音乐本身。', '規則は音楽そのものではない。', 'The rules are not the music itself.'),
    lesson: t('规则帮助解释关系，但上下文可以改变一个和弦的意义：同一个和弦，在不同位置做不同的事。', '規則は関係を説明する助けになるが、文脈が和音の意味を変えることもある。同じ和音でも、場所が違えば働きも違う。', 'Rules help explain relations, but context can change what a chord means: the same chord does different jobs in different places.'),
    intro: [t('又见面了。', 'また会ったな。', 'We meet again.'), t('上一次，我要求你证明规则。', '前回は、規則を証明せよと求めた。', 'Last time, I asked you to prove the rules.'), t('这一次——', '今回は——', 'This time —'), t('证明你知道什么时候不能只看规则。', '規則だけを見てはならない時を、知っていると証明せよ。', 'prove you know when the rules alone are not enough.')],
    memo: {
      1: t('上一次，一颗星。我没有忘记。', '前回は星一つ。忘れてはいない。', 'Last time, one star. I have not forgotten.'),
      2: t('上一次，两颗星。秩序你已经懂了一半。', '前回は星二つ。秩序の半分は理解している。', 'Last time, two stars. You understood half the order.'),
      3: t('上一次，三颗星。……所以这一次，我不会再只考规则。', '前回は星三つ。……だから今回は、規則だけを問いはしない。', 'Last time, three stars. …So this time, I will not test the rules alone.'),
    },
    endings: {
      1: [t('你通过了。', '通過した。', 'You passed.'), t('仅此而已。', 'それだけだ。', 'Nothing more.'), t('不要把侥幸理解成掌握。', '偶然を習得と取り違えるな。', 'Do not mistake luck for mastery.')],
      2: [t('很好。', 'よろしい。', 'Very good.'), t('你已经开始理解规则背后的理由。', '規則の背後にある理由を、理解し始めている。', 'You have begun to understand the reasons behind the rules.')],
      3: [t('……', '……', '…'), t('我输了。', '私の負けだ。', 'I have lost.'), t('规则不是答案。', '規則は答えではない。', 'The rules are not the answer.'), t('规则只是让我们听见关系的方法。', '規則は、関係を聴くための方法にすぎない。', 'The rules are only a way for us to hear relations.'), t('……这一点，是你教我的。', '……それを教えたのは、君だ。', '…You are the one who taught me that.')],
    },
    firstClear: t('下一章那个旅行乐手不会对你讲规则。……那并不代表他没有规则。', '次の章の旅の楽士は規則を語らない。……規則がないという意味ではない。', 'The wanderer in the next chapter will not speak of rules. …That does not mean he has none.'),
    upgrade: t('……成立。比上一次更成立。', '……成立。前回よりも、なお成立している。', '…Valid. More valid than last time.'),
  },
  {
    id: 'sever-ex', cast: 'sever', ex: true, section: 'harmony', after: null, pool: 'advanced', sprite: 'return_meeting',
    theme: t('依据？', '根拠は？', 'On what basis?'),
    lesson: t('没有唯一答案 ≠ 怎样解释都行：不同分析可以都成立，但每一种都要有音乐事实做依据。', '唯一の答えがない ≠ どう解釈してもいい：複数の分析が成り立っても、どれも音楽の事実に支えられていなければならない。', 'No single answer ≠ anything goes: several analyses may hold, but each must rest on musical evidence.'),
    intro: [t('你打败了我。', '君は私を破った。', 'You defeated me.'), t('于是你得出了一个新结论：分析没有标准，怎样都可以。', 'そして新しい結論を得た。分析に基準はなく、何でもよい、と。', 'And you reached a new conclusion: analysis has no standard; anything goes.'), t('……依据？', '……根拠は？', '…On what basis?')],
    endings: {
      1: [t('通过。', '通過。', 'Passed.'), t('有些分析，你给不出依据。记住它们。', '根拠を示せなかった分析がある。覚えておけ。', 'Some analyses you could not support. Remember them.')],
      2: [t('很好。', 'よろしい。', 'Very good.'), t('A 成立，B 也成立。C 没有证据。你分得清。', 'A も B も成立する。C には証拠がない。君には区別がつく。', 'A holds. B holds too. C has no evidence. You can tell them apart.')],
      3: [t('（他第一次放松了肩膀。）', '（彼は初めて肩の力を抜いた。）', '(For the first time, his shoulders relax.)'), t('规则重要。规则不是唯一答案。', '規則は重要だ。規則は唯一の答えではない。', 'Rules matter. Rules are not the only answer.'), t('没有唯一答案，也不代表可以没有依据。', '唯一の答えがなくとも、根拠なしでよいわけではない。', 'And having no single answer does not mean having no grounds.'), t('……你可以走了。我很满意。', '……行ってよい。満足だ。', '…You may go. I am satisfied.')],
    },
    firstClear: t('阿拉娅说我的规则很漂亮，只是没有我以为的那么普遍。……她说得对。不要告诉她。', 'アラヤは私の規則を美しいが、私が思うほど普遍ではないと言う。……正しい。本人には言うな。', 'Araya says my rules are beautiful, only not as universal as I think. …She is right. Do not tell her.'),
    upgrade: t('依据更充分了。', '根拠がより確かになった。', 'Your grounds are firmer.'),
  },
  // ---------------- 第三章 · 诺亚 ----------------
  {
    id: 'noa', cast: 'noa', section: 'melody', after: null, pool: 'main',
    theme: t('为什么它听起来顺？', 'どうして自然に聴こえる？', 'Why does it sound smooth?'),
    lesson: t('感觉不是规则的反面：经过音为什么顺、挂留为什么要解决、两条线为什么要各自独立——直觉里本来就有可以理解的运动关系。', '感覚は規則の反対ではない。経過音がなぜ滑らかか、掛留がなぜ解決するか、二つの線がなぜ独立すべきか——直感にはもともと理解できる動きがある。', 'Feeling isn’t the opposite of rules: why passing tones flow, why suspensions resolve, why two lines stay independent — intuition already contains motion you can understand.'),
    intro: [t('嗯？', 'ん？', 'Hm?'), t('你找 Boss？', 'ボスを探してる？', 'Looking for a boss?'), t('这里没有。', 'ここにはいないよ。', 'There isn’t one here.'), t('……', '……', '…'), t('非要打的话，陪我走一段？', 'どうしてもって言うなら、少し一緒に歩く？', 'If you insist, walk with me a while?')],
    endings: {
      1: [t('挺乱。', 'ごちゃごちゃ。', 'Pretty messy.'), t('不过没停下来。', 'でも止まらなかった。', 'But you didn’t stop.'), t('这也挺重要。', 'それも大事。', 'That matters too.')],
      2: [t('不错。', 'いいね。', 'Nice.'), t('你已经不只是在看和弦了。', 'もう和音だけを見てないね。', 'You’re not just looking at chords anymore.')],
      3: [t('我输了？', '僕の負け？', 'I lost?'), t('……行吧。', '……そっか。', '…Alright.'), t('那送你一句。', 'じゃあ一つだけ。', 'Then here’s something for you.'), t('以后别只看一个瞬间。', 'これからは、一瞬だけを見ないで。', 'From now on, don’t look at just one moment.'), t('音乐是往前走的。', '音楽は前に進むものだから。', 'Music moves forward.')],
    },
    firstClear: t('下一章那个人太吵了。……不过你会喜欢他的。大概。', '次の章のあいつはうるさい。……でも気に入ると思う。たぶん。', 'The one in the next chapter is way too loud. …You’ll probably like him, though.'),
    upgrade: t('嗯。这次走得更稳。', 'うん。今回はもっと安定してた。', 'Mm. Steadier this time.'),
  },
  {
    id: 'noa-ex', cast: 'noa', ex: true, section: 'melody', after: null, pool: 'advanced',
    theme: t('别先告诉我它叫什么。', '名前を先に言わないで。', 'Don’t tell me its name first.'),
    lesson: t('理论不能代替耳朵：名字是在描述你听到的运动。先听哪条线更自然，再说它叫什么。', '理論は耳の代わりにはならない。名前は聴こえた動きの説明だ。どの線が自然か先に聴き、それから名前を言う。', 'Theory can’t replace the ear: names describe the motion you hear. Hear which line is more natural first, then name it.'),
    intro: [t('理论能解释感觉了，对吧。', '理論で感覚を説明できるようになったね。', 'So theory can explain feeling now, right.'), t('那知道名字，就等于会听了？', 'じゃあ名前を知ってれば、聴けるってこと？', 'Then knowing the name means you can hear it?'), t('这次我不给你名字。先听。', '今回は名前をあげない。まず聴いて。', 'This time I won’t give you names. Listen first.'), t('……塞维尔和爵？他们两个都太吵。', '……セヴェールとジャズ？二人ともうるさすぎ。', '…Sever and Jaz? They’re both too loud.')],
    endings: {
      1: [t('名字记了不少。', '名前はずいぶん覚えたね。', 'You know plenty of names.'), t('耳朵再跟上一点就好。', 'あとは耳がもう少し追いつけば。', 'Now let your ears catch up a little.')],
      2: [t('嗯，你是先听的。', 'うん、ちゃんと先に聴いてた。', 'Mm, you listened first.'), t('名字是后来的事。', '名前はその後でいい。', 'Names come later.')],
      3: [t('……（他睁大了一点眼睛。）', '……（彼は少しだけ目を見開いた。）', '…(His eyes widen a little.)'), t('感觉不等于没有规则。', '感覚は、規則がないことじゃない。', 'Feeling doesn’t mean no rules.'), t('规则也不等于不需要感觉。', '規則は、感覚がいらないことでもない。', 'And rules don’t mean you don’t need feeling.'), t('……走吧。前面那个吵死人的在等你。', '……行こう。先でうるさいのが待ってる。', '…Go on. The loud one up ahead is waiting.')],
    },
    firstClear: t('爵问我一天能不能多弹几个音。……能。没必要。', 'ジャズに、一日にもっと音を弾けないのかって聞かれた。……弾ける。必要ない。', 'Jaz asked if I could play more notes in a day. …I can. No need.'),
    upgrade: t('耳朵比上次快了。', '前より耳が速いね。', 'Your ears are quicker than last time.'),
  },
  // ---------------- 第四章 · 爵（道中：第 8 节之后；章末：章节测试前） ----------------
  {
    id: 'jaz-mid', cast: 'jaz', section: 'jazz', after: 'chordscale', pool: 'main', sprite: 'first_meeting',
    theme: t('这么多音，真正重要的是哪几个？', 'こんなに音があって、本当に大事なのはどれ？', 'So many notes — which ones actually matter?'),
    lesson: t('复杂的声音也有骨架：先抓住决定功能的三音、七音和它们的连接，十个音的表面复杂，不代表十个音同样重要。', '複雑な響きにも骨組みがある。まず機能を決める 3 度・7 度とそのつながりをつかむ。十音の見かけの複雑さは、十音すべてが同じだけ重要という意味ではない。', 'Complex sounds have a skeleton: grab the thirds, sevenths and their connections that decide function first. Ten notes on the surface doesn’t mean ten equally important notes.'),
    intro: [t('哟。', 'よっ。', 'Yo.'), t('会 ii–V–I 吗？', 'ii–V–I できる？', 'Know your ii–V–I?'), t('不会？那你来这里干嘛？', 'できない？じゃあ何しに来たの？', 'No? Then what are you doing here?'), t('会？更好。', 'できる？なおいい。', 'You do? Even better.'), t('让我看看你会不会只是背答案。', '答えを暗記してるだけか、見せてもらおう。', 'Let’s see if you just memorised the answers.')],
    endings: {
      1: [t('哈！看到没？复杂就是赢！', 'ハハ！見た？複雑なほうが勝つんだって！', 'Ha! See? Complexity wins!'), t('……虽然你过了。', '……まあ、通過はしたけど。', '…Though you did pass.')],
      2: [t('嗯……你抓得住骨架。', 'うーん……骨組みはつかめてる。', 'Hmm… you can grab the skeleton.'), t('不过我那些漂亮的延伸音呢？', 'でも、僕のきれいなテンションは？', 'But what about my beautiful extensions?')],
      3: [t('运气。', '運だね。', 'Luck.'), t('绝对是运气。', '絶対に運。', 'Totally luck.'), t('下一次我认真。', '次は本気出すから。', 'Next time I’m getting serious.')],
    },
    firstClear: t('诺亚？那家伙一天能不能多弹几个音？', 'ノア？あいつ、一日にもう少し音を弾けないの？', 'Noa? Can that guy play a few more notes a day?'),
    upgrade: t('又多一颗星？……我回去多练几个 voicing。', 'また星が増えた？……帰ってヴォイシング練習しよ。', 'Another star? …I’m going to go practise more voicings.'),
  },
  {
    id: 'jaz-mid-ex', cast: 'jaz', ex: true, section: 'jazz', after: 'chordscale', pool: 'advanced', sprite: 'first_meeting',
    theme: t('少，不代表完整。', '少ない ≠ 完全。', 'Less is not the same as complete.'),
    lesson: t('骨架重要，颜色也有意义：有时两个导向音就够了，有时删掉 9、13 或旋律音，想要的颜色就没了。先知道什么是必要，再知道什么是选择。', '骨組みは大事。でも色彩にも意味がある。導音二つで十分な時もあれば、9 や 13、旋律音を消すと欲しい色が消える時もある。何が必要か、何が選択かを見分ける。', 'The skeleton matters, but colour has meaning too: sometimes two guide tones are enough; sometimes cutting the 9, 13 or melody note kills the colour you need. Know what is necessary before you know what is a choice.'),
    intro: [t('你上次用两个音赢了我。', 'この前、二音で僕に勝ったよね。', 'Last time you beat me with two notes.'), t('所以你现在觉得，其他音都是垃圾？', 'で、今はほかの音は全部ゴミだと思ってる？', 'So now you think every other note is junk?'), t('哈！那这一场，我们来点颜色！', 'ハハ！じゃあこの勝負、色を足していこう！', 'Ha! Then this round, let’s add some colour!')],
    endings: {
      1: [t('骨架是有了。', '骨組みはある。', 'You’ve got the skeleton.'), t('可人不能只有骨架啊！', 'でも人間は骨だけじゃ生きられない！', 'But nobody walks around as just a skeleton!')],
      2: [t('行，你知道什么时候加。', 'よし、いつ足すかはわかってる。', 'Okay, you know when to add.'), t('……也知道什么时候不加。', '……いつ足さないかも。', '…And when not to.')],
      3: [t('哈！对吧！颜色也很重要吧！', 'ハハ！でしょ！色も大事でしょ！', 'Ha! Right? Colour matters too!'), t('……等等，你赢了。', '……待って、君の勝ちか。', '…Wait, you won.'), t('下次章节测试前，我带全部武器来。', '次の章末テストの前に、全部の武器を持ってくる。', 'Before the chapter test, I’m bringing every weapon I’ve got.')],
    },
    firstClear: t('塞维尔又在说平行五度了？那个古典老头还在抓平五？哈哈哈哈哈！', 'セヴェールがまた平行五度の話？あのクラシックじいさん、まだ平行五度を取り締まってるの？ハハハハ！', 'Sever on about parallel fifths again? That classical old man is still policing them? Hahahaha!'),
    upgrade: t('颜色更准了！……不是我教的。', '色がもっと正確に！……僕が教えたんじゃないけど。', 'Your colours are sharper! …Not that I taught you.'),
  },
  {
    id: 'jaz', cast: 'jaz', section: 'jazz', after: null, pool: 'main', sprite: 'return_meeting', previous: 'jaz-mid',
    theme: t('复杂不是高级，选择才是。', '複雑さは上級じゃない。選択こそ上級。', 'Complexity isn’t sophistication. Choice is.'),
    lesson: t('复杂本身没有价值：Altered、Lydian dominant、三全音替代、负和声都是工具。真正高级的，是知道为什么加、为什么不加。', '複雑さそのものに価値はない。オルタード、リディアン・ドミナント、裏コード、ネガティブ・ハーモニーは道具。本当に上級なのは、なぜ足すか、なぜ足さないかを知ること。', 'Complexity has no value in itself: altered, Lydian dominant, tritone subs and negative harmony are tools. The real skill is knowing why you add — and why you don’t.'),
    intro: [t('来了？', '来たね？', 'You came?'), t('很好。', 'いいね。', 'Good.'), t('上次那两个音的事情——', 'この前の二音の件——', 'About those two notes last time —'), t('我们今天彻底解决。', '今日きっちりケリをつけよう。', 'we settle it today.')],
    memo: {
      1: t('上次你才拿一颗星。今天别想再用那两个音！', 'この前は星一つだったよね。今日はあの二音は通用しないぞ！', 'You only got one star last time. Those two notes won’t save you today!'),
      2: t('两颗星？哼，今天我加倍复杂！', '星二つ？ふん、今日は二倍複雑にしてやる！', 'Two stars? Hmph, today I’m doubling the complexity!'),
      3: t('三颗星……我回去练了好几个月。今天，全部武器！', '星三つ……あれから何か月も練習した。今日は全部の武器だ！', 'Three stars… I practised for months after that. Today: every weapon!'),
    },
    endings: {
      1: [t('赢？', '勝ち？', 'Won?'), t('你管这个叫赢？', 'それを勝ちって言う？', 'You call that winning?'), t('杂——', 'ざ——', 'Small fr—'), t('……算了，走吧。', '……いいや、行きな。', '…Forget it. Go on.')],
      2: [t('行。', 'まあね。', 'Fine.'), t('你确实不是只会背 scale name。', '確かに、スケール名を暗記してるだけじゃない。', 'You really don’t just memorise scale names.')],
      3: [t('（所有夸张动作全部停止。他第一次站直。）', '（大げさな動きがすべて止まる。初めてまっすぐ立つ。）', '(Every exaggerated movement stops. For the first time, he stands up straight.)'), t('……行。', '……わかった。', '…Okay.'), t('会少弹几个音的人——', '音を減らせる奴は——', 'Someone who can play fewer notes —'), t('比只会多弹几个音的人危险。', '音を増やすしか能がない奴より、手ごわい。', 'is more dangerous than someone who can only play more.'), t('我输了。', '僕の負けだ。', 'I lost.')],
    },
    firstClear: t('下一章那位学者会问你：为什么是十二个音？……我也答不上来。', '次の章の学者に聞かれるよ。なんで十二音なの？って。……僕も答えられない。', 'The scholar in the next chapter will ask why it’s twelve notes. …I can’t answer that either.'),
    upgrade: t('又多一颗！……我服了。暂时。', 'また一つ！……参った。今だけね。', 'Another one! …I give. For now.'),
  },
  {
    id: 'jaz-ex', cast: 'jaz', ex: true, section: 'jazz', after: null, pool: 'advanced', sprite: 'return_meeting',
    theme: t('每一个音，都有理由吗？', 'すべての音に、理由はある？', 'Does every note have a reason?'),
    lesson: t('简单不是高级，复杂也不是高级：这一题的答案可能只有三个音，下一题可能是一个完整的 altered dominant——因为它在那里有明确的目的。有意识的选择才是。', '単純さも複雑さも上級の基準ではない。ある問題の答えは三音だけかもしれないし、次はフルのオルタード・ドミナントかもしれない——そこではっきりした目的があるから。意識的な選択こそが上級。', 'Simple isn’t sophisticated, and neither is complex: one answer may be three notes, the next a full altered dominant — because there it has a clear purpose. Conscious choice is what counts.'),
    intro: [t('嘿。', 'よう。', 'Hey.'), t('你打败我以后，是不是觉得“越简单越高级”？', '僕に勝ってから、「単純なほど上級」って思ってない？', 'Since you beat me, have you started thinking “simpler is better”?'), t('那也是一种偷懒。', 'それも一種の手抜きだよ。', 'That’s just another kind of lazy.'), t('这一场，我只问一件事：每一个音，都有理由吗？', 'この勝負で聞くのは一つだけ。すべての音に理由はある？', 'This round, I’m only asking one thing: does every note have a reason?')],
    endings: {
      1: [t('你还在数音的多少。', 'まだ音の数を数えてるね。', 'You’re still counting how many notes.'), t('数音是数不出音乐的。……下次再来。', '音を数えても音楽にはならない。……また来な。', 'You can’t count your way to music. …Come back.')],
      2: [t('嗯。你开始问“为什么”了。', 'うん。「なぜ」を問い始めたね。', 'Mm. You’ve started asking “why”.'), t('这比会一百个音阶有用。', 'それは百個のスケールより役に立つ。', 'That’s worth more than a hundred scales.')],
      3: [t('（他安静了很久。）', '（彼は長いこと黙っていた。）', '(He is quiet for a long time.)'), t('简单不是高级。复杂也不是。', '単純が上級なんじゃない。複雑でもない。', 'Simple isn’t it. Complex isn’t either.'), t('知道为什么——才是。', 'なぜかを知っていること——それが上級だ。', 'Knowing why — that’s it.'), t('……走吧，“即兴之王”这个称号，先借你用。', '……行きな。「即興の王」の称号、しばらく貸してあげる。', '…Go on. You can borrow the “King of Improv” title for a while.')],
    },
    firstClear: t('我给自己想了个新称号：“少即是锋芒”。……开玩笑的。大概。', '新しい称号を考えた。「少なさこそ切っ先」。……冗談だよ。たぶん。', 'I came up with a new title for myself: “Less is the cutting edge.” …Just kidding. Probably.'),
    upgrade: t('又一颗。每个音都更有理由了。', 'また一つ。どの音にも、もっと理由がある。', 'Another one. Every note has more reason now.'),
  },
  // ---------------- 第五章 · 阿拉娅 ----------------
  {
    id: 'araya', cast: 'araya', section: 'world', after: null, pool: 'main',
    theme: t('为什么你认为这是正确的？', 'どうしてそれが正しいと思うの？', 'Why do you believe that is correct?'),
    lesson: t('你熟悉的体系只是一个体系：十二平均律、大小调和钢琴音高都很强大，但“是真的”不等于“是唯一可能的”。', '慣れた体系は一つの体系にすぎない。十二平均律も長短調もピアノの音高も強力だが、「本当」は「唯一」と同じではない。', 'The system you know is one system: equal temperament, major/minor and piano pitch are powerful, but “true” is not the same as “the only possibility”.'),
    intro: [t('一个八度有几个音？', '一オクターヴに、音はいくつある？', 'How many notes are in an octave?'), t('……十二？', '……十二？', '…Twelve?'), t('为什么？', 'どうして？', 'Why?')],
    endings: {
      1: [t('你已经走出了熟悉的地图。', '慣れた地図の外へ出たわね。', 'You have stepped off the familiar map.'), t('虽然只走了一点。', 'ほんの少しだけど。', 'If only a little.')],
      2: [t('很好。', 'いいわね。', 'Good.'), t('你开始知道“正确音高”这句话需要条件。', '「正しい音高」という言葉に条件が要ると、わかり始めた。', 'You are beginning to see that “correct pitch” needs conditions.')],
      3: [t('（她微笑。）', '（彼女は微笑む。）', '(She smiles.)'), t('我认输。', '私の負け。', 'I concede.'), t('或者——这里本来就没有什么需要赢的。', 'それとも——ここには、勝つべきものなんて最初からなかったのかも。', 'Or perhaps — there was never anything here to win.'), t('继续走吧。', '歩き続けて。', 'Keep walking.'), t('地图之外，还有地图。', '地図の外にも、地図がある。', 'Beyond the map, there are more maps.')],
    },
    firstClear: t('米米每次都会问我：为什么这里不是十二个音？……我很喜欢她。', 'ミミはいつも聞くの。どうしてここは十二音じゃないの？って。……あの子が好きよ。', 'Mimi always asks me: why isn’t it twelve notes here? …I’m very fond of her.'),
    upgrade: t('你又走远了一点。', 'また少し遠くまで来たわね。', 'You have gone a little further.'),
  },
  {
    id: 'araya-ex', cast: 'araya', ex: true, section: 'world', after: null, pool: 'advanced',
    theme: t('不要把另一张地图画成你的地图。', '別の地図を、自分の地図に描き直さないで。', 'Don’t redraw another map as your own.'),
    lesson: t('体系不唯一 ≠ 没有标准：木卡姆、thaat、律制各有自己的内部逻辑，要用它自己的规则理解它，而不是硬翻译成你熟悉的东西。', '体系が一つではない ≠ 基準がない。マカームもターートも音律も、それぞれ内部の論理を持つ。慣れたものに無理に訳さず、その規則で理解する。', 'Many systems ≠ no standards: maqam, thaat and temperaments each have their own internal logic. Understand them by their own rules instead of forcing them into the one you know.'),
    intro: [t('你已经知道，体系不止一个。', '体系が一つではないことは、もう知っているわね。', 'You already know there is more than one system.'), t('那么，是不是所有东西都一样，都没有标准？', 'では、どれも同じで、基準なんてないのかしら？', 'So is everything the same, with no standards at all?'), t('……塞维尔的规则非常漂亮。只是没有他自己以为的那么普遍。', '……セヴェールの規則はとても美しい。ただ、本人が思うほど普遍ではないだけ。', '…Sever’s rules are very beautiful. Only not as universal as he believes.'), t('可它们依然是规则。', 'それでも、規則は規則。', 'Yet they are still rules.')],
    endings: {
      1: [t('你走进了另一张地图。', '別の地図に入ったわね。', 'You entered another map.'), t('但你还在用自己的图例读它。', 'でも、まだ自分の凡例で読んでいる。', 'But you are still reading it with your own legend.')],
      2: [t('很好。', 'いいわね。', 'Good.'), t('你开始用它自己的语言说话了。', 'その地図自身の言葉で話し始めた。', 'You are beginning to speak its own language.')],
      3: [t('……', '……', '…'), t('体系很多，标准也很多。', '体系はたくさん、基準もたくさん。', 'Many systems, and many standards.'), t('但每一个都有自己的标准。', 'でも、それぞれに自分の基準がある。', 'But each has its own.'), t('最后一位研究者，会把这件事推得更远。……小心他。', '最後の研究者は、これをもっと先まで押し進める。……気をつけて。', 'The last researcher will push this much further. …Be careful of him.')],
    },
    firstClear: t('下一章的那个人，从我这里出发，走得太远了。', '次の章のあの人は、私のところから出発して、遠くへ行きすぎた。', 'The one in the next chapter set out from where I stand — and went too far.'),
    upgrade: t('你读地图的方式更准确了。', '地図の読み方が、もっと正確になった。', 'You read the maps more accurately now.'),
  },
  // ---------------- 第六章 · 零（最终 Boss） ----------------
  {
    id: 'zero', cast: 'zero', section: 'modern', after: null, pool: 'main',
    theme: t('不是没有规则，只是不是你熟悉的规则。', '規則がないのではない。見慣れた規則ではないだけ。', 'It isn’t that there are no rules — only not the ones you know.'),
    lesson: t('规则可以选择，但系统一旦建立，关系和后果仍然真实存在：拆掉调性、音名、十二音乃至十二平均律之后，剩下的是关系、结构和意图。', '規則は選べる。だが体系がいったん立てば、関係と帰結は現実に存在する。調性・音名・十二音・十二平均律を取り去っても、関係と構造と意図が残る。', 'Rules can be chosen, but once a system is set, its relations and consequences are real: strip away tonality, note names, twelve tones and even equal temperament, and relation, structure and intention remain.'),
    intro: [t('你已经见过他们了。', 'もう、彼らに会ってきたのね。', 'You have met them all.'), t('基础。秩序。线条。自由。体系。', '基礎。秩序。線。自由。体系。', 'Basics. Order. Line. Freedom. System.'), t('他们每个人都教给了你一些东西。也都只说对了一部分。', '誰もが何かを教えた。そして、誰もが一部だけ正しかった。', 'Each of them taught you something. Each was only partly right.'), t('现在告诉我。', '教えて。', 'Now tell me.'), t('哪一个是真的。', 'どれが本当なの。', 'Which one is true.')],
    endings: {
      1: [t('你通过了。', '通過した。', 'You passed.'), t('但你仍然在寻找答案。', 'でも、まだ答えを探している。', 'But you are still looking for answers.')],
      2: [t('你已经不再依赖唯一答案。', 'もう唯一の答えには頼っていない。', 'You no longer depend on a single answer.'), t('很好。', 'いいわ。', 'Good.')],
      3: [t('（长时间沉默。）', '（長い沈黙。）', '(A long silence.)'), t('……原来如此。', '……そういうことか。', '…I see.'), t('你不是在寻找正确的规则。', 'あなたは正しい規則を探していたのではない。', 'You were not searching for the right rules.'), t('你在听规则之间的关系。', '規則と規則の関係を聴いていた。', 'You were listening to the relations between rules.'), t('（零闭上眼。）我输了。', '（ゼロは目を閉じる。）私の負け。', '(Zero closes his eyes.) I have lost.')],
    },
    firstClear: t('还剩一个问题。规则可以由你选。那你会怎么选。', 'まだ一つ問いが残っている。規則はあなたが選べる。では、どう選ぶの。', 'One question remains. You may choose the rules. So how will you choose.'),
    upgrade: t('……你比上一次听得更清楚。', '……前回より、はっきり聴こえている。', '…You hear more clearly than last time.'),
  },
  {
    id: 'zero-ex', cast: 'zero', ex: true, section: 'modern', after: null, pool: 'advanced',
    theme: t('现在，由你决定什么是真的。', '今度は、何が本当かをあなたが決める。', 'Now you decide what is true.'),
    lesson: t('自由不是任意：自己选择规则，就要知道为什么选择，并承担它带来的结果。零不攻击你的审美，只指出你的自相矛盾。', '自由は恣意ではない。規則を自分で選ぶなら、なぜ選ぶのかを知り、その結果を引き受ける。ゼロは美意識ではなく、自己矛盾だけを指摘する。', 'Freedom isn’t arbitrariness: if you choose your rules, know why you chose them and accept their consequences. Zero doesn’t attack your taste — only your contradictions.'),
    intro: [t('规则可以选择。你证明了。', '規則は選べる。あなたが証明した。', 'Rules can be chosen. You proved it.'), t('那么，你会想怎么定，就怎么定吗。', 'では、好きなように決めるの。', 'So will you set them however you like.'), t('我不评价你的审美。', 'あなたの美意識は評価しない。', 'I will not judge your taste.'), t('我只看你的规则，和你做的事，是否一致。', '規則と、あなたのすることが一致しているか。それだけを見る。', 'I will only see whether your rules and your actions agree.')],
    endings: {
      1: [t('你定了规则。', '規則は決めた。', 'You set rules.'), t('有几次，你自己没有遵守。', '何度か、自分で守らなかった。', 'A few times, you did not keep them yourself.')],
      2: [t('你的规则，大多和你的选择一致。', 'あなたの規則は、ほとんど選択と一致していた。', 'Your rules mostly agreed with your choices.'), t('剩下的，也是你的。', '残りも、あなたのもの。', 'The rest is yours too.')],
      3: [t('……', '……', '…'), t('不是遵守传统。不是打破传统。甚至也不是创造规则。', '伝統を守ることでも、壊すことでもない。規則を作ることでさえない。', 'Not keeping tradition. Not breaking it. Not even creating rules.'), t('而是知道自己为什么选择这些规则。', '自分がなぜその規則を選ぶのか、知っていること。', 'But knowing why you choose the rules you choose.'), t('……你可以走了。地图之外，还有地图。', '……行っていい。地図の外にも、地図がある。', '…You may go. Beyond the map, there are more maps.')],
    },
    firstClear: t('他们六个人，你都见过了。……谢谢你，陪我们走完。', '六人全員に会ったのね。……最後まで付き合ってくれて、ありがとう。', 'You have met all six of us. …Thank you for walking all the way with us.'),
    upgrade: t('更一致了。', 'さらに一貫した。', 'More consistent.'),
  },
];

// ---------------- 规则：进度键、范围、解锁、出题 ----------------
/** 进度键 boss@<id>（不含 ":"，不会被当成进阶关） */
export const bossKey = (id) => `boss@${id}`;
export const parseBossKey = (key) => { const m = /^boss@([a-z-]+)$/.exec(String(key)); return m && BOSSES.some((b) => b.id === m[1]) ? m[1] : null; };
export const bossById = (id) => BOSSES.find((b) => b.id === id) || null;
/** 一章里的 Boss（地图顺序：道中在前，章末在后；普通在前，EX 在后） */
export const bossesOf = (sectionId) => BOSSES.filter((b) => b.section === sectionId);
/** 普通 Boss 对应的 EX（EX 是普通 Boss 的分支） */
export const exOf = (boss) => BOSSES.find((b) => b.ex && b.section === boss.section && b.after === boss.after) || null;
export const baseOf = (boss) => (boss.ex ? BOSSES.find((b) => !b.ex && b.section === boss.section && b.after === boss.after) : boss);
/** 挡住某一关的道中 Boss（learn_boss_gates.js） */
export const gateBossFor = (unitId) => parseBossKey(BOSS_GATES[unitId]);

/** Boss 考的范围：本章的主关（道中只到 after 那一关为止），以及挂在这些主关旁边的支线 */
export function bossScope(boss, units, sides = []) {
  const chapter = units.filter((u) => u.section === boss.section);
  const end = boss.after ? chapter.findIndex((u) => u.id === boss.after) : chapter.length - 1;
  const scope = chapter.slice(0, end + 1);
  return { units: scope, sides: sides.filter((s) => scope.some((u) => u.id === s.parent)) };
}
const done = (progress, key) => Boolean(progress.units?.[key]?.done);
const branchAll = (progress, id) => [1, 2, 3, 4, 5].every((slot) => done(progress, `${id}:${slot}`));
const sideAll = (progress, id) => done(progress, id) && branchAll(progress, id);
/**
 * 开放条件（关卡节奏.txt）：
 *   普通 Boss —— 范围内的主关全部通关；
 *   EX —— 普通 Boss 已打败，且范围内所有进阶关（进阶 1–4 与综合测验）和支线大关卡全部通关（不包含章节测试 / EX 章节测试）
 */
export function bossOpen(boss, units, sides, progress) {
  if (progress.unlockAll) return true;
  const scope = bossScope(boss, units, sides);
  if (!scope.units.every((u) => done(progress, u.id))) return false;
  if (!boss.ex) return true;
  return done(progress, bossKey(baseOf(boss).id)) && scope.units.every((u) => branchAll(progress, u.id)) && scope.sides.every((s) => sideAll(progress, s.id));
}
/** 还没满足的条件（地图上显示），返回 { main, branch, sides, base } 里缺的个数 */
export function bossMissing(boss, units, sides, progress) {
  const scope = bossScope(boss, units, sides);
  return {
    main: scope.units.filter((u) => !done(progress, u.id)).length,
    branch: boss.ex ? scope.units.filter((u) => !branchAll(progress, u.id)).length : 0,
    sides: boss.ex ? scope.sides.filter((s) => !sideAll(progress, s.id)).length : 0,
    base: boss.ex && !done(progress, bossKey(baseOf(boss).id)) ? 1 : 0,
  };
}

const zhOf = (v) => (typeof v === 'string' ? v : v?.zh ?? '');
/** 题卡键 'unit:slot#index' → 那张题卡（找不到或不是题目时返回 null） */
export function cardAt(ref, units, sides = []) {
  const m = /^([a-z0-9]+)(?::(\d))?#(\d+)$/i.exec(ref);
  if (!m) return null;
  const unit = [...units, ...sides].find((u) => u.id === m[1]);
  const group = !unit ? null : m[2] ? unit.branch?.[Number(m[2]) - 1] : unit;
  const card = group?.cards?.[Number(m[3])];
  return card && card.type !== 'guide' ? card : null;
}
/**
 * 这一场的 15 张题卡（固定顺序，不打乱：剧情曲线靠顺序）。生成题只出 1 道。
 * 每张卡带上 boss: { index, mode, line, phase, right, wrong }，界面据此换立绘和台词。
 */
export function bossCards(boss, units, sides = []) {
  return boss.questions.map((q, index) => {
    const source = q.custom || cardAt(q.card, units, sides);
    if (!source) throw new Error(`boss ${boss.id} Q${index + 1}: card ${q.card} not found`);
    if (q.expect && !zhOf(source.prompt).includes(q.expect)) throw new Error(`boss ${boss.id} Q${index + 1}: card ${q.card} no longer matches "${q.expect}"`);
    const card = source.type === 'gen' ? { ...source, count: 1 } : source;
    const special = boss.special?.[index] || {};
    return { ...card, boss: { index, mode: q.mode, lines: boss.lines?.[index] || [q.line], line: (boss.lines?.[index] || [q.line])[0], phase: Boolean(q.phase),
      right: special.right || (q.right ? [q.right] : null), wrong: special.wrong || (q.wrong ? [q.wrong] : null) } };
  });
}
/** 星级：和普通关卡一样（一次答对 ≥ 90% 三星、≥ 60% 两星，打完至少一星）；结局台词按星级 */
export const endingState = (stars) => ['one_star', 'two_star', 'three_star'][Math.max(1, Math.min(3, stars)) - 1];

/** 从台词池里取一句：按种子取，同一局里不会每次都是同一句 */
/** 从台词池里随机取一句（传入 rng 可复现，测试用） */
export const pickLine = (pool, rng = Math.random) => (pool?.length ? pool[Math.floor(rng() * pool.length) % pool.length] : null);
/** 题目开始时的立绘：转折题换第二阶段，其余按题目绑定方式 */
export function askState(q, index, ex = false) {
  if (q.phase) return 'phase2';
  if (index >= 14) return 'serious';
  const state = { alter: 'proud', fix: 'mocking', listen: 'speaking' }[q.mode] || (index >= 10 ? 'serious' : 'default');
  // EX：角色认真起来，平时的默认表情换成认真
  return ex && state === 'default' ? 'serious' : state;
}
/**
 * 答题后的反应：{ state 立绘, pool 台词池名 }
 * stats：{ streak 连对, wrongStreak 连错, wrongs 已错题数, answered 已答题数 }
 */
export function reactState(correct, stats, castId) {
  // 不强调打斗：答对时 Boss 点头认可（答对反应 / 讲话），连对换"连续答对反应"，不用受击表情
  if (correct) {
    if (stats.streak === 3 && stats.wrongs >= 3) return { state: 'speaking', pool: 'comeback' };
    if (stats.streak >= 3 && stats.streak % 3 === 0) return { state: 'streak', pool: 'streak' };
    return { state: stats.answered % 2 ? 'correct' : 'speaking', pool: 'right' };
  }
  if (stats.wrongStreak >= 2) return { state: castId === 'mimi' ? 'angry' : 'serious', pool: 'wrong2' };
  return { state: stats.answered % 2 ? 'incorrect' : 'mocking', pool: 'wrong' };
}
/** 这场 Boss 战用到的所有立绘（开战前预先解码） */
export function statesUsed(boss) {
  const ending = Object.values(boss.endingSets || {}).flat(3).filter((x) => typeof x === 'string');
  return [...new Set([boss.sprite || 'speaking', 'default', 'proud', 'mocking', 'speaking', 'serious', 'phase2', 'correct', 'incorrect', 'streak', 'confused', 'angry', ...ending])];
}

// ---------------- 台词覆盖：learn_boss_lines.js（口语化、多版本、结局带表情） ----------------
Object.entries(CAST_LINES).forEach(([id, lines]) => { CAST[id].lines = lines; });
BOSSES.forEach((b) => {
  const d = BOSS_LINES[b.id];
  if (!d) return;
  b.intros = d.intro;
  b.intro = d.intro[0];
  b.lines = d.q;
  b.special = d.special || {};
  b.endingSets = d.end;
  b.endings = Object.fromEntries([1, 2, 3].map((n) => [n, d.end[n][0].map(([, line]) => line)]));
  b.firstClear = d.first;
  b.upgrades = d.upgrade;
  b.upgrade = d.upgrade[0];
  if (d.memo) b.memo = d.memo;
});
// ---------------- 题目：learn_boss_questions.js（每场围绕一个错误音乐观重新设计的 15 题） ----------------
BOSSES.forEach((b) => {
  const set = BOSS_QUESTIONS[b.id];
  if (!set) return;
  b.claim = set.claim;
  b.playerBelief = Boolean(set.playerBelief);
  b.questions = set.questions.map((q) => ({ custom: q.card, mode: q.mode, phase: Boolean(q.phase), line: q.lines[0] }));
  b.lines = set.questions.map((q) => q.lines);
  b.special = Object.fromEntries(set.questions.map((q, i) => [i, { ...(q.right ? { right: q.right } : {}), ...(q.wrong ? { wrong: q.wrong } : {}) }]).filter(([, sp]) => sp.right || sp.wrong));
});
/** 结局：随机取一套 [表情, 台词] */
export const endingSet = (boss, stars, rng = Math.random) => pickLine(boss.endingSets?.[stars], rng) || (boss.endings[stars] || []).map((line) => [endingState(stars), line]);
/** 泄露答案的台词：{answer} 换成当前题答案 */
export const leakLine = (castId, answer, rng = Math.random) => {
  const line = pickLine(CAST[castId].lines.leak, rng);
  return Object.fromEntries(Object.entries(line).map(([k, v]) => [k, v.replace('{answer}', answer)]));
};
/** 点同一道题多少次会说漏答案 */
export const LEAK_AFTER = 6;

// EX 形态：开场就是第二阶段立绘（地图上的卡片也用它），舞台换成更深的底色（learn.css .is-ex）
BOSSES.filter((b) => b.ex).forEach((b) => { b.sprite = 'phase2'; });

/** 和某个角色的关系：0 没打败过、1 打败过（任何一场）、2 打败过 EX 或拿过三星——开场时称呼和态度跟着变 */
export function relationLevel(castId, progress, { exclude = null } = {}) {
  const nodes = BOSSES.filter((b) => b.cast === castId && b.id !== exclude);
  const unit = (b) => progress.units?.[bossKey(b.id)];
  if (nodes.some((b) => (b.ex && unit(b)?.done) || unit(b)?.stars === 3)) return 2;
  return nodes.some((b) => unit(b)?.done) ? 1 : 0;
}

/** 跨章节客串：默认 5% 的概率（调试模式可调 0–100%）；打败过的角色都可能出现（包括本章的），刚出现过的角色下一次让给别人 */
export const CAMEO_CHANCE = 0.05;
export function pickCameo(progress, { context = 'done', chance = CAMEO_CHANCE, rng = Math.random, levelKey = null, avoid = null } = {}) {
  if (!(rng() < chance)) return null;
  const met = Object.keys(CAST).filter((id) => BOSSES.some((b) => b.cast === id && progress.units?.[bossKey(b.id)]?.done));
  if (!met.length) return null;
  const others = met.filter((id) => id !== avoid);
  const pool = others.length ? others : met;
  const castId = pool[Math.floor(rng() * pool.length) % pool.length];
  // 有关卡时用这一关自己的台词（和关卡主题有关，每关每个角色 3 句）；复习等没有关卡的场合用通用台词
  const own = context === 'review' ? null : levelCameoLines(levelKey, castId);
  const line = pickLine(own || CAST[castId].lines.cameo[context] || CAST[castId].lines.cameo.done, rng);
  return line ? { castId, line } : null;
}

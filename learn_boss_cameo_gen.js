// Boss 跨章节客串：按关卡给台词。每个关卡、每个角色 3 句，都和这一关的主题有关。
// 第一章的主关是逐句手写的整句台词（learn_boss_cameos.js）；其余关卡用手写的"一句话要点"（learn_boss_cameo_tips.js，每关 3 条），
// 由各角色用自己的口吻说出来（下面的 FRAMES：每个角色一大池说法，按关卡挑，不提关卡名）。同一关里每个角色的 3 句都不一样，
// 同一单元的 6 个关卡（主关、进阶 1–4、综合测验）台词也都不同。
import { CAMEO_TIPS } from './learn_boss_cameo_tips.js?v=20261010-cameo3';
import { LEVEL_CAMEOS } from './learn_boss_cameos.js?v=20261010-cameo3';

const LANGS = ['zh', 'ja', 'en'];
const F = (zh, ja, en) => ({ zh, ja, en });
const T = F;
const fill = (template, values) => Object.fromEntries(LANGS.map((l) => [l, template[l].replace(/\{(\w+)\}/g, (_, k) => {
  const v = values[k];
  return typeof v === 'string' ? v : v?.[l] ?? '';
})]));

/**
 * 主关、进阶关与综合测验：每个角色一大池说法（开头的一句、结尾的一句，或只说要点），{tip} 是这一关讲过的一句话。
 * 台词里不提关卡名（玩家看得到）；每一关从池子里挑 3 个不同的说法，挑法随关卡变，所以不会每次都是同一个开头。
 */
export const CAMEO_FRAMES = {
  mimi: [
    F('喂。{tip}', 'ねえ。{tip}', 'Hey. {tip}'), F('{tip}别说我没提醒你。', '{tip}言わなかったとは言わせないから。', '{tip} Don’t say I didn’t warn you.'),
    F('我只说一遍。{tip}', '一回しか言わないよ。{tip}', 'I’ll say this once. {tip}'), F('{tip}看清楚再答。', '{tip}よく見てから答えて。', '{tip} Look before you answer.'),
    F('哼。{tip}', 'ふん。{tip}', 'Hmph. {tip}'), F('{tip}这种地方最容易栽跟头。', '{tip}こういうところで一番つまずくの。', '{tip} That’s exactly where people trip.'),
    F('别急着点。{tip}', '慌てて押さないで。{tip}', 'Don’t rush to click. {tip}'), F('{tip}……我第一次就会了。你呢？', '{tip}……私は一回で覚えたけど。あなたは？', '{tip} …I got it first try. You?'),
    F('提醒你一句：{tip}', '一応言っとく：{tip}', 'Just a reminder: {tip}'), F('{tip}简单吧？可别大意。', '{tip}簡単でしょ？油断しないでね。', '{tip} Easy, right? Don’t get careless.'),
    F('你不会还不知道吧？{tip}', 'まさか知らないとか？{tip}', 'Don’t tell me you didn’t know. {tip}'), F('{tip}数一数就知道了。', '{tip}数えればわかる。', '{tip} Count and you’ll see.'),
    F('……算了，告诉你。{tip}', '……しょうがない、教えてあげる。{tip}', '…Fine, I’ll tell you. {tip}'), F('{tip}记不住就回去多看几遍。', '{tip}覚えられないなら、何回も見直して。', '{tip} Can’t remember? Go over it again.'),
    F('这可是基础。{tip}', 'これ基礎だからね。{tip}', 'This is basic stuff. {tip}'), F('{tip}嗯，就这样。', '{tip}うん、それだけ。', '{tip} Yep, that’s it.'),
  ],
  sever: [
    F('{tip}', '{tip}', '{tip}'), F('记录：{tip}', '記録：{tip}', 'For the record: {tip}'),
    F('{tip}这一点，不容含糊。', '{tip}ここは曖昧にするな。', '{tip} No vagueness on this point.'), F('依据如下。{tip}', '根拠は次のとおり。{tip}', 'The grounds are as follows. {tip}'),
    F('{tip}牢记。', '{tip}覚えておけ。', '{tip} Commit it to memory.'), F('注意。{tip}', '注意せよ。{tip}', 'Note. {tip}'),
    F('{tip}这是定义，不是建议。', '{tip}これは定義だ。提案ではない。', '{tip} That is a definition, not a suggestion.'), F('先确认一件事：{tip}', 'まず一つ確認する：{tip}', 'First, confirm one thing: {tip}'),
    F('{tip}复述一遍。', '{tip}復唱せよ。', '{tip} Repeat it back.'), F('要点只有一个。{tip}', '要点は一つだけだ。{tip}', 'There is one point. {tip}'),
    F('{tip}……此处常被忽略。', '{tip}……ここはよく見落とされる。', '{tip} …This is often overlooked.'), F('我只说结论：{tip}', '結論だけ言う：{tip}', 'Conclusion only: {tip}'),
    F('{tip}有疑问，查依据。', '{tip}疑問があれば根拠を確かめよ。', '{tip} If in doubt, check the source.'), F('不要凭印象。{tip}', '印象で判断するな。{tip}', 'Do not go by impression. {tip}'),
    F('{tip}这也是秩序的一部分。', '{tip}これも秩序の一部だ。', '{tip} This too is part of the order.'), F('补充一条。{tip}', '一つ補足する。{tip}', 'One addendum. {tip}'),
  ],
  noa: [
    F('嗯……{tip}', 'うーん……{tip}', 'Mm… {tip}'), F('{tip}慢慢来就好。', '{tip}ゆっくりでいいよ。', '{tip} No rush.'),
    F('我路上想到的：{tip}', '道で思いついたこと：{tip}', 'Something I thought of on the road: {tip}'), F('{tip}……好像是这样。', '{tip}……たしか、そう。', '{tip} …I think that’s how it goes.'),
    F('哼一下就知道了。{tip}', '口ずさめばわかるよ。{tip}', 'Hum it and you’ll know. {tip}'), F('{tip}不用急着记住。', '{tip}急いで覚えなくていい。', '{tip} No need to memorise it right away.'),
    F('休息一下。{tip}', 'ひと休み。{tip}', 'Take a breather. {tip}'), F('{tip}嗯，挺好的。', '{tip}うん、いい感じ。', '{tip} Mm, nice.'),
    F('你听过吗？{tip}', '聴いたことある？{tip}', 'Ever heard this? {tip}'), F('{tip}我也是后来才知道的。', '{tip}僕も後から知ったんだ。', '{tip} I only found out later myself.'),
    F('……对了。{tip}', '……そうだ。{tip}', '…Oh, right. {tip}'), F('{tip}耳朵会记住的。', '{tip}耳が覚えてくれる。', '{tip} Your ears will remember.'),
    F('随便说说。{tip}', 'なんとなく。{tip}', 'Just saying. {tip}'), F('{tip}走着走着就顺了。', '{tip}歩いてるうちに慣れるよ。', '{tip} It gets smoother as you go.'),
    F('我挺喜欢这一点：{tip}', 'ここ、好きなんだ：{tip}', 'I like this bit: {tip}'), F('{tip}……就这样。', '{tip}……それだけ。', '{tip} …That’s all.'),
  ],
  jaz: [
    F('嘿！{tip}', 'へい！{tip}', 'Hey! {tip}'), F('{tip}酷吧？', '{tip}クールでしょ？', '{tip} Cool, right?'),
    F('这个我在台上用过！{tip}', 'これ、ステージで使ったことある！{tip}', 'I’ve used this on stage! {tip}'), F('{tip}下次 jam 的时候试试！', '{tip}次のジャムで試してみな！', '{tip} Try it at the next jam!'),
    F('哈，你肯定没注意到——{tip}', 'はは、気づいてなかったでしょ——{tip}', 'Ha, bet you missed this — {tip}'), F('{tip}简单吧？我当年可是练了一礼拜！', '{tip}簡単でしょ？僕は一週間練習したけどね！', '{tip} Easy, right? Took me a week back then!'),
    F('等等等等！{tip}', '待って待って！{tip}', 'Wait wait wait! {tip}'), F('{tip}记下来，别让我说第二遍！', '{tip}メモって、二回は言わないよ！', '{tip} Write it down — I’m not saying it twice!'),
    F('偷偷告诉你：{tip}', 'こっそり教えるよ：{tip}', 'Between you and me: {tip}'), F('{tip}耶！', '{tip}イェイ！', '{tip} Yeah!'),
    F('我刚想到一个！{tip}', '今ひらめいた！{tip}', 'Just thought of one! {tip}'), F('{tip}这个我能讲一整晚！', '{tip}この話なら一晩中できる！', '{tip} I could talk about this all night!'),
    F('来来来！{tip}', 'ほらほら！{tip}', 'C’mon, c’mon! {tip}'), F('{tip}不信？弹弹看！', '{tip}信じない？弾いてみな！', '{tip} Don’t believe me? Play it!'),
    F('乐手都知道这个：{tip}', 'ミュージシャンならみんな知ってる：{tip}', 'Every player knows this one: {tip}'), F('{tip}嗯哼！', '{tip}ふふん！', '{tip} Mm-hm!'),
  ],
  araya: [
    F('旅途中记下的一笔：{tip}', '旅の途中で書き留めたこと：{tip}', 'A note from my travels: {tip}'), F('{tip}慢慢看就好。', '{tip}ゆっくり見ればいいわ。', '{tip} Take your time with it.'),
    F('你知道吗？{tip}', '知っていた？{tip}', 'Did you know? {tip}'), F('{tip}这一点，值得多停一会儿。', '{tip}ここは少し立ち止まる価値がある。', '{tip} This is worth lingering on.'),
    F('再听一次吧。{tip}', 'もう一度聴きましょう。{tip}', 'Let’s listen once more. {tip}'), F('{tip}很多人走了很久才发现。', '{tip}長い道のりの末に気づく人も多い。', '{tip} Many walk a long way before noticing.'),
    F('我在笔记里写过：{tip}', 'ノートに書いたことがある：{tip}', 'I wrote this in my notebook: {tip}'), F('{tip}问问声音，而不是问习惯。', '{tip}習慣ではなく、音に聞いて。', '{tip} Ask the sound, not the habit.'),
    F('很好。顺便一提：{tip}', 'いいわね。ついでに：{tip}', 'Good. By the way: {tip}'), F('{tip}你会用得上的。', '{tip}きっと役に立つわ。', '{tip} You’ll find it useful.'),
    F('一个小小的发现。{tip}', '小さな発見よ。{tip}', 'A small discovery. {tip}'), F('{tip}记在你的地图上吧。', '{tip}あなたの地図に書き込んでおいて。', '{tip} Mark it on your map.'),
    F('停一停。{tip}', '少し止まって。{tip}', 'Pause a moment. {tip}'), F('{tip}不急，慢慢走。', '{tip}急がず、ゆっくり行きましょう。', '{tip} No hurry; walk slowly.'),
    F('有一件事想告诉你。{tip}', '伝えたいことがあるの。{tip}', 'There’s something I want to tell you. {tip}'), F('{tip}……是不是很有意思？', '{tip}……面白いでしょう？', '{tip} …Isn’t that interesting?'),
  ],
  zero: [
    F('{tip}', '{tip}', '{tip}'), F('观察：{tip}', '観察：{tip}', 'Observation: {tip}'),
    F('{tip}……关系就在这里。', '{tip}……関係はここにある。', '{tip} …The relation is here.'), F('一个事实。{tip}', '一つの事実。{tip}', 'A fact. {tip}'),
    F('{tip}这是结构的一部分。', '{tip}これも構造の一部。', '{tip} This is part of the structure.'), F('你注意到了吗。{tip}', '気づいていた？{tip}', 'Did you notice. {tip}'),
    F('{tip}规则，就在这一句里。', '{tip}規則は、この一文の中にある。', '{tip} The rule is in this sentence.'), F('……{tip}', '……{tip}', '…{tip}'),
    F('{tip}不是随意的。', '{tip}恣意的ではない。', '{tip} It is not arbitrary.'), F('记下来。{tip}', '記録して。{tip}', 'Record this. {tip}'),
    F('{tip}……安静地想一想。', '{tip}……静かに考えて。', '{tip} …Think about it quietly.'), F('变量很少。{tip}', '変数は少ない。{tip}', 'Few variables. {tip}'),
    F('{tip}名字可以换，关系不变。', '{tip}名前は替えられる。関係は変わらない。', '{tip} Names can change; the relation does not.'), F('只有一句。{tip}', '一文だけ。{tip}', 'Just one line. {tip}'),
    F('{tip}这就够了。', '{tip}それで十分。', '{tip} That is enough.'), F('顺序是这样的。{tip}', '順序はこう。{tip}', 'The order is this. {tip}'),
  ],
};
/** 章节测试：整章的内容 */
export const TEST_FRAMES = {
  mimi: [F('章节测试？一整章的东西，最容易错的反而是这个：{tip}', '章末テスト？一章分の中で、一番間違えやすいのは実はこれ：{tip}', 'Chapter test? Out of the whole chapter, the easiest slip is this: {tip}'), F('考完了就回头确认一下：{tip}', '終わったら確認してね：{tip}', 'Now that it’s over, double-check this: {tip}'), F('这一章你要带走的一句：{tip}', 'この章で持って帰る一言：{tip}', 'One line to take from this chapter: {tip}')],
  sever: [F('一章的内容，归结起来：{tip}', '一章の内容をまとめれば：{tip}', 'The whole chapter, in summary: {tip}'), F('测试只是检查。真正要掌握的是：{tip}', 'テストは確認にすぎない。身につけるべきは：{tip}', 'A test only checks. What you must hold onto: {tip}'), F('这一章的骨架：{tip}', 'この章の骨組み：{tip}', 'The frame of this chapter: {tip}')],
  noa: [F('一章走完了。我最喜欢的一段是：{tip}', '一章歩ききったね。僕の好きなところは：{tip}', 'A whole chapter walked. My favourite part: {tip}'), F('考完再听一遍也好。{tip}', '終わってからもう一回聴くのもいいよ。{tip}', 'Worth a listen again after the test. {tip}'), F('别急着往前跑，这一章有一件事：{tip}', '先を急がないで。この章には一つ大事なことがある：{tip}', 'Don’t rush ahead — this chapter had one thing: {tip}')],
  jaz: [F('整章测试！我把重点再弹一遍：{tip}', '章末テスト！ポイントをもう一回弾くよ：{tip}', 'Chapter test! Let me play the key point once more: {tip}'), F('考完了？那这一句你肯定没问题！{tip}', '終わった？じゃあこれは大丈夫だよね！{tip}', 'Done? Then you’ve definitely got this one! {tip}'), F('一章的料，浓缩成一句！{tip}', '一章分を一言に凝縮！{tip}', 'A whole chapter boiled down to one line! {tip}')],
  araya: [F('一章的旅程，留下一个记号：{tip}', '一章の旅に、一つ目印を：{tip}', 'A chapter-long journey leaves one marker: {tip}'), F('这一章是地图上的一大块。{tip}', 'この章は地図の大きな一区画。{tip}', 'This chapter is a big piece of the map. {tip}'), F('回头看这一章，最重要的是：{tip}', 'この章を振り返ると、一番大事なのは：{tip}', 'Looking back on this chapter, what matters most: {tip}')],
  zero: [F('一章，一个系统。{tip}', '一章、一つの体系。{tip}', 'One chapter, one system. {tip}'), F('这一章的公理：{tip}', 'この章の公理：{tip}', 'This chapter’s axiom: {tip}'), F('{tip}……这一章建立在这上面。', '{tip}……この章はその上に立っている。', '{tip} …This chapter stands on that.')],
};
/** 结业挑战：全部六章 */
export const FINAL_FRAMES = {
  mimi: [F('结业了？……还记得第一章吗？{tip}', '修了？……第一章、覚えてる？{tip}', 'Graduating? …Remember chapter one? {tip}'), F('走了这么远，最开始的一句还是对的：{tip}', 'ここまで来ても、最初の一言は正しいまま：{tip}', 'All this way, and the first lesson still holds: {tip}'), F('我可记得你。也记得这句：{tip}', 'あなたのこと、覚えてるよ。これもね：{tip}', 'I remember you. And this: {tip}')],
  sever: [F('全部走完了。最后确认一次：{tip}', 'すべて終えたな。最後に一度確認する：{tip}', 'All of it, done. One final check: {tip}'), F('六章的内容，有一条线贯穿：{tip}', '六章の内容を一本の線が貫いている：{tip}', 'One thread runs through all six chapters: {tip}'), F('结业不是终点。依据要一直带着：{tip}', '修了は終点ではない。根拠は持ち続けよ：{tip}', 'Graduating isn’t the end. Keep your grounds with you: {tip}')],
  noa: [F('一路走过来，耳朵变了很多吧。{tip}', 'ここまで来て、耳もずいぶん変わったでしょ。{tip}', 'All this way — your ears have changed a lot. {tip}'), F('最后，送你一句：{tip}', '最後に、一言だけ：{tip}', 'Lastly, one line for you: {tip}'), F('以后也慢慢听。{tip}', 'これからも、ゆっくり聴いて。{tip}', 'Keep listening slowly. {tip}')],
  jaz: [F('结业！这是最后一个和弦！{tip}', '修了！これが最後のコード！{tip}', 'Graduation! Here’s the final chord! {tip}'), F('从这里开始，就是你自己的 solo 了！{tip}', 'ここからは君自身のソロだ！{tip}', 'From here on it’s your own solo! {tip}'), F('全部学完了，那记住这一句！{tip}', '全部学んだなら、これを覚えておいて！{tip}', 'You’ve learned it all — so remember this! {tip}')],
  araya: [F('旅程的终点，也是另一张地图的起点。{tip}', '旅の終わりは、別の地図の始まり。{tip}', 'The journey’s end is another map’s start. {tip}'), F('走遍六章以后，再看这一句：{tip}', '六章を歩いた後で、もう一度これを：{tip}', 'After all six chapters, look at this again: {tip}'), F('你带走的地图上，写着：{tip}', 'あなたが持ち帰る地図には、こう書いてある：{tip}', 'On the map you take with you, it says: {tip}')],
  zero: [F('六个系统。最后一个问题。{tip}', '六つの体系。最後の問い。{tip}', 'Six systems. One last question. {tip}'), F('结束，也是一种结构。{tip}', '終わりも、一つの構造。{tip}', 'An ending is also a structure. {tip}'), F('{tip}……现在，你知道为什么了。', '{tip}……今なら、理由がわかるはず。', '{tip} …Now you know why.')],
};

/** 章节测试与结业挑战的要点（各章的核心内容，都在该章的关卡里讲过） */
export const SPECIAL_TIPS = {
  'test:basics': [T('E–F、B–C 之间没有黑键，只差半音。', 'E–F、B–C の間に黒鍵はなく、半音だけ。', 'E–F and B–C have no black key between them — just a half step.'), T('度数数字母，性质数半音。', '度数は文字で、種類は半音で数える。', 'Letters give the number, half steps the quality.'), T('大调台阶是全全半全全全半。', '長音階の階段は全全半全全全半。', 'The major scale steps W W H W W W H.')],
  'test:harmony': [T('主是家，下属是准备，属最想回家。', '主は家、下属は準備、属は一番帰りたがる。', 'Tonic is home, predominant prepares, dominant wants home most.'), T('最低的音决定转位。', '一番低い音が転回形を決める。', 'The lowest note decides the inversion.'), T('在新调上出现终止式，才算确立了新调。', '新しい調で終止形が出て、はじめてその調が確立する。', 'A new key is confirmed only by a cadence in it.')],
  'test:melody': [T('认装饰音看三点：怎么来、往哪儿去、落在什么拍位。', '非和声音は三点で見分ける：どう来て、どこへ行き、どの拍か。', 'Name a non-chord tone by approach, departure and beat.'), T('反向进行最能保持声部独立。', '反行は声部の独立を最もよく保つ。', 'Contrary motion best keeps voices independent.'), T('降 B 调乐器写 C，实际响 B♭。', 'B♭ 管は C と書いて B♭ が鳴る。', 'A B♭ instrument’s written C sounds B♭.')],
  'test:jazz': [T('三音和七音是导向音，决定和弦的性质。', '第 3 音と第 7 音はガイドトーンで、和音の種類を決める。', 'Thirds and sevenths are guide tones — they define the chord.'), T('ii–V–I：Dm7 → G7 → Cmaj7。', 'ii–V–I：Dm7 → G7 → Cmaj7。', 'ii–V–I: Dm7 → G7 → Cmaj7.'), T('调式只是给和弦上色，不代表转调。', '旋法は和音に色を付けるだけで、転調ではない。', 'A mode colours a chord; it doesn’t mean a key change.')],
  'test:world': [T('十二平均律每个五度是 700 音分，比纯五度窄约 2 音分。', '十二平均律の 5 度は 700 セントで、純正より約 2 セント狭い。', 'An equal-tempered fifth is 700 cents, about 2 cents narrow of pure.'), T('记谱上的四分之一音只是惯例，实际音高因地区和年代而异。', '記譜上の四分音は慣例で、実際の高さは地域や時代で違う。', 'Notated quarter tones are a convention; real pitches vary by region and era.'), T('thaat 主要是给拉格分类，不是拿来作曲的。', 'タートは主にラーガの分類のためで、作曲のためではない。', 'Thaats classify ragas rather than serve as recipes for composing.')],
  'test:modern': [T('音级把所有八度关系和同音异名的音归成一组。', '音級はオクターヴ関係と異名同音の音を一つにまとめる。', 'A pitch class groups all octave-related and enharmonic notes.'), T('彼此能通过移位或倒影得到的集合，属于同一个集合类。', '移高か反転で互いに得られる集合は同じ集合クラス。', 'Sets related by transposition or inversion share a set class.'), T('只把两个和弦叠在一起，还不足以证明双调性。', '和音を二つ重ねるだけでは、複調の証拠にならない。', 'Stacking two chords alone doesn’t prove bitonality.')],
  final: [T('半音就是隔壁那个键，黑键也算。', '半音は隣の鍵。黒鍵も数える。', 'A half step is the very next key, black keys included.'), T('同一个和弦在不同的调里，罗马数字不同。', '同じ和音でも調が違えばローマ数字が違う。', 'The same chord gets a different Roman numeral in a different key.'), T('十二平均律是一套很有用的体系，但不是唯一的体系。', '十二平均律はとても有用な体系だが、唯一の体系ではない。', 'Equal temperament is a very useful system, but not the only one.')],
};

const CASTS = Object.keys(CAMEO_FRAMES);
/** 字符串哈希（同一关、同一角色每次挑到的说法相同，不同关卡挑到的不同） */
const hash = (str) => { let h = 5381; for (let i = 0; i < str.length; i += 1) h = ((h * 33) ^ str.charCodeAt(i)) >>> 0; return h; };
/** 这一关、这个角色的 3 个说法：普通关卡从大池子里按关卡挑 3 个不同的；章节测试、结业挑战用各自的 3 个 */
function pickFrames(k, castId) {
  if (k === 'final') return FINAL_FRAMES[castId];
  if (k.startsWith('test:')) return TEST_FRAMES[castId];
  const pool = CAMEO_FRAMES[castId];
  const h = hash(`${k}|${castId}`);
  const step = [1, 3, 5, 7][h % 4]; // 与 16 互质，3 个下标一定不同
  return [0, 1, 2].map((n) => pool[(h + n * step) % pool.length]);
}
/** 综合测验的要点取自进阶关：如果挑到和进阶关同一句，就换一个说法 */
function avoidRepeats(k, castId, lines, tips, c) {
  const unit = k.slice(0, -2);
  const taken = new Set([1, 2, 3, 4].flatMap((n) => (levelCameoLines(`${unit}:${n}`, castId) || []).map((v) => v.zh)));
  const pool = CAMEO_FRAMES[castId];
  const used = new Set();
  return lines.map((line, n) => {
    const tip = tips[(n + c) % 3];
    const start = pool.findIndex((f) => fill(f, { tip }).zh === line.zh);
    let out = line;
    for (let shift = 1; shift <= pool.length && (taken.has(out.zh) || used.has(out.zh)); shift += 1) out = fill(pool[(start + shift) % pool.length], { tip });
    used.add(out.zh);
    return out;
  });
}
const noShout = (v) => Object.fromEntries(Object.entries(v).map(([k, s]) => [k, s.replace(/！/g, '。').replace(/!/g, '.')]));
const tipsKey = (key) => key.replace(/^chapter(-ex)?@/, 'test:').replace(/^final-ex$/, 'final');

/** 综合测验没有单独写要点时，从四个进阶关的要点里轮流取（不同角色取不同的） */
function mixTips(unitId, c) {
  const out = [];
  for (let k = 0; out.length < 3 && k < 12; k += 1) {
    const branch = CAMEO_TIPS[`${unitId}:${((k + c) % 4) + 1}`];
    const tip = branch?.[(c + k) % 3];
    if (tip && !out.some((x) => x.zh === tip.zh)) out.push(tip);
  }
  return out;
}

/**
 * 某个关卡、某个角色的 3 句客串台词（没有就返回 null，退回通用台词）。
 * key：关卡键（'keys'、'keys:2'、'keys:5'、'chapter@basics'、'chapter-ex@jazz'、'final'、'final-ex'）
 */
export function levelCameoLines(key, castId) {
  if (!key || !CAST_SET.has(castId)) return null;
  if (LEVEL_CAMEOS[key]?.[castId]) return LEVEL_CAMEOS[key][castId];
  const c = CASTS.indexOf(castId);
  const k = tipsKey(key);
  const isMix = /:5$/.test(k);
  const special = SPECIAL_TIPS[k];
  let tips = special || CAMEO_TIPS[k];
  if (!tips && isMix) tips = mixTips(k.slice(0, -2), c);
  if (!tips || tips.length < 3) return null;
  let lines = pickFrames(k, castId).map((frame, n) => fill(frame, { tip: tips[(n + c) % 3] }));
  if (isMix && !CAMEO_TIPS[k]) lines = avoidRepeats(k, castId, lines, tips, c);
  return castId === 'zero' ? lines.map(noShout) : lines;
}
const CAST_SET = new Set(CASTS);

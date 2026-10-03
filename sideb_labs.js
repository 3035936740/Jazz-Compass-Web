// Side-B 实操任务（Practical Lab）登记表：工具收到 #<工具>?q=@lab:<id>[@chapter|@ex] 时按这里显示任务条、准备初始内容、交给 lab_checks.js 评分。
// 只放任务说明、参数与"胜利瞬间"；评分规则与出处在 lab_checks.js。
// 任务说明里的乐理：终止四六的 6→5、4→3：ref:omt2e-cad64；复节奏与节拍调制：ref:wiki-polyrhythm ref:wiki-metric-modulation；
// 爵士配置的 3–7 骨架、9→13 的上声部线条、省略根音与五音：ref:omt2e-jazz-voicings ref:wiki-jazz-chord；切分与连音线：ref:omt2e-rhythm-more ref:omt2e-rhythm
const t = (zh, ja, en) => ({ zh, ja, en });

export const LABS = {
  'vl-ii6-V7-I': {
    id: 'vl-ii6-V7-I', tool: 'staff', check: 'fourPart', minutes: 5,
    title: t('四部写作：C 大调 ii6–V7–I', '4 声体：ハ長調 ii6–V7–I', 'Four-part writing: ii6–V7–I in C major'),
    brief: t('在大谱表上写三个和弦，每个和弦 4 个音同时开始（常见写法：上行谱表女中、女高，下行谱表男低、男高；3 + 1 也可以）。随时点"检查一下"看评分单，边听边改。', '大譜表に 3 つの和音を書く。各和音は 4 音が同時に始まる（よくあるのはト音譜表にアルトとソプラノ、ヘ音譜表にバスとテノール。3 + 1 でもよい）。いつでも「チェック」で採点表を見て、聴きながら直そう。', 'Write three chords on the grand staff, each with 4 notes starting together (usually alto and soprano on the treble staff, bass and tenor on the bass staff; 3 + 1 works too). Check any time to see the score sheet; listen and revise.'),
    params: { keyName: 'C', tonic: 0, romans: ['ii6', 'V7', 'I'] },
    setup: { clef: 'grand', key: 0, meter: [4, 4], clear: true },
    breakthrough: { id: 'clean-ii-V-I', when: ['chords', 'leading', 'seventh', 'parallels'], text: t('第一次写出导音、七音都正确解决、没有平行五八度的 ii6–V7–I。', '導音も第 7 音も正しく解決し、平行 5・8 度のない ii6–V7–I が初めて書けた。', 'Your first ii6–V7–I with the leading tone and seventh resolved and no parallels.') },
  },
  'vl-cad64': {
    id: 'vl-cad64', tool: 'staff', check: 'fourPart', minutes: 6,
    title: t('四部写作：G 大调 IV–I6/4–V7–I（终止四六）', '4 声体：ト長調 IV–I6/4–V7–I（終止の四六）', 'Four-part writing: IV–I6/4–V7–I in G major (cadential 6/4)'),
    brief: t('写四个和弦：终止四六的低音保持属音，上方的六度、四度级进下行到 V7 的五度、三度。', '4 つの和音を書く：終止の四六はバスが属音のまま、上の 6 度と 4 度が V7 の 5 度・3 度へ順次下行。', 'Write four chords: the cadential 6/4 keeps the dominant in the bass while its sixth and fourth step down to the fifth and third of V7.'),
    params: { keyName: 'G', tonic: 7, romans: ['IV', 'I6/4', 'V7', 'I'] },
    setup: { clef: 'grand', key: 1, meter: [4, 4], clear: true },
    breakthrough: { id: 'cad64', when: ['chords', 'parallels'], text: t('终止四六写对了：低音不动，上方两个声部滑进属七。', '終止の四六ができた：バスはそのまま、上の 2 声が属七へ滑り込む。', 'Cadential 6/4 done: the bass holds while two upper voices slide into V7.') },
  },
  'jazz-ii-V-I-rootless': {
    id: 'jazz-ii-V-I-rootless', tool: 'staff', check: 'jazzVoicing', minutes: 6,
    title: t('爵士配置：Dm9–G13–Cmaj9（不弹根音）', 'ジャズ・ヴォイシング：Dm9–G13–Cmaj9（ルートレス）', 'Jazz voicing: Dm9–G13–Cmaj9 (rootless)'),
    brief: t('在上行谱表写三个和弦（每个四个音、二分音符），根音交给低音不弹。先让三音和七音彼此半音、全音地接起来，再把 9 音、13 音放在上面。每次检查都能听到并看到各声部一共动了几个半音。', 'ト音譜表に 3 つの和音（各 4 音、2 分音符）。根音はベースに任せて弾かない。まず第 3 音と第 7 音を半音・全音でつなぎ、その上に 9th・13th を。チェックのたびに各声部の移動量が分かる。', 'Write three chords on the treble staff (four notes each, half notes) and leave the root to the bass. First link the 3rds and 7ths by half or whole step, then add the 9th and 13th on top. Each check shows how many half steps the voices moved.'),
    params: { symbols: ['Dm9', 'G13', 'Cmaj9'], rootless: true },
    setup: { clef: 'treble', key: 0, meter: [4, 4], clear: true },
    breakthrough: { id: 'smooth-rootless', when: ['identity', 'guide', 'motion'], text: t('三个和弦几乎不用动手就连起来了——这就是 guide tone 的力量。', '3 つの和音がほとんど手を動かさずにつながった——これがガイド・トーンの力。', 'Three chords linked with almost no motion — that is the power of guide tones.') },
  },
  'rhythm-sync-2bars': {
    id: 'rhythm-sync-2bars', tool: 'staff', check: 'rhythm', minutes: 4,
    title: t('节奏：两小节 4/4 的切分', 'リズム：4/4 の 2 小節でシンコペーション', 'Rhythm: two bars of 4/4 syncopation'),
    brief: t('用同一个音写两小节 4/4：至少三个反拍起音、一个跨拍的连音线、一处切分。写完播放，听听重音怎样"推"着拍子走。', '同じ音で 4/4 を 2 小節：裏拍の打点 3 つ以上、拍をまたぐタイ 1 つ、シンコペーション 1 つ。再生して、アクセントが拍を「押す」感じを聴こう。', 'On one pitch, write two bars of 4/4 with at least three off-beat attacks, one tie across a beat and one syncopation. Play it back and hear the accents push against the beat.'),
    params: { meter: [4, 4], measures: 2, offbeats: 3, tiesAcross: 1, syncopations: 1 },
    setup: { clef: 'treble', key: 0, meter: [4, 4], clear: true },
    breakthrough: { id: 'first-syncopation', when: ['offbeats', 'ties', 'syncopation'], text: t('你自己写出了切分：重音落在拍子之间。', '自分でシンコペーションが書けた：アクセントが拍と拍の間に。', 'You wrote your own syncopation: the accent lands between the beats.') },
  },
  'poly-32-mm': {
    id: 'poly-32-mm', tool: 'rhythm', sub: 'poly', check: 'tempo', minutes: 5,
    title: t('复节奏 3:2 与节拍调制', 'ポリリズム 3:2 とメトリック・モジュレーション', 'Polyrhythm 3:2 and metric modulation'),
    brief: t('① 把复节奏设成 3:2 并播放，听两条线在哪里重合；② 节拍调制选"细分不变（八分 = 八分）"、旧速度 ♩ = 96，先自己算出新的附点四分音符速度填进下面，再在工具里播放听一遍前后对比。', '① ポリリズムを 3:2 にして再生し、2 本の線が重なる所を聴く。② メトリック・モジュレーションは「細分を保つ（8 分 = 8 分）」、旧テンポ ♩ = 96。新しい付点 4 分のテンポを先に自分で計算して下に入力し、ツールで前後を聴き比べる。', '① Set the polyrhythm to 3:2 and play it — listen for where the lines coincide. ② For metric modulation choose “keep the subdivision (eighth = eighth)” with ♩ = 96; work out the new dotted-quarter tempo yourself, enter it below, then play the before/after in the tool.'),
    params: { ratio: [3, 2], mm: { oldTempo: 96, preset: 'keepSub' }, mustPlay: true },
    answer: { label: t('新速度（附点四分音符 = ?）', '新テンポ（付点 4 分 = ?）', 'New tempo (dotted quarter = ?)') },
    breakthrough: { id: 'metric-modulation', when: ['answer'], text: t('你自己算出了节拍调制后的新速度，再亲耳听到它。', 'メトリック・モジュレーション後の新テンポを自分で計算し、耳で確かめた。', 'You calculated the new tempo yourself — and then heard it.') },
  },
};

const MODES = ['level', 'chapter', 'ex'];
/** 'vl-ii6-V7-I@ex' → { id, mode }（没写模式 = 普通关） */
export function parseLabRef(ref) {
  const [id, mode] = String(ref).split('@');
  return { id, mode: MODES.includes(mode) ? mode : 'level' };
}
/** 打开任务的链接：#staff?q=@lab:<id>[@mode]；复节奏工具的任务开在节奏工具里 */
export const labHref = (lab, mode = 'level') => `#${lab.tool}?q=${encodeURIComponent(`@lab:${lab.id}${mode === 'level' ? '' : `@${mode}`}`)}`;

// Side-B 第 2 章（和声）的关卡内容。节点格式见 sideb_ui.js / SIDE_B_DESIGN.md §3–4。
// 出处：
//   SATB 的六条规则（符干、和弦构成、音域、间距、交叉、重复）、四个声部的音域、间距（相邻上方声部 ≤ 八度、男高–男低 ≤ 十二度；
//     最常出错在女中–男高，因为它们写在不同的谱表上）、交叉（最常出现在女中–男高）、重复（三和弦通常重复低音；导音和七音等倾向音
//     从不重复；七和弦四个音各一个）：ref:omt2e-roman-numerals
//   平行五 / 八度让融合压过声部独立，连续的稳定音程让音乐失去变化和动力；直接八度把注意力引到本来就突出的音程上；
//     交叉和超越削弱声部独立、让声部难以分辨；反向进行最能保持声部独立：ref:omt-species1
//   V7：七音增加不协和，加强 V 指向 I 的力量；默认解决得到三个根音、一个三音、没有五音的 I（完全正常，根音决定和弦名、三音决定性质，
//     五音可以省）；不完整的 V7 只能重复根音，因为重复 ti 或 fa 会在两个声部按倾向解决时形成平行八度；
//     导音下跳：只在女中或男高，ti 跳到 sol（不跳到 mi）：ref:omt2e-v7
//   和弦七音级进下行解决：ref:omt2e-pd7
const t = (zh, ja, en) => ({ zh, ja, en });

// 四部和弦 [男低, 男高, 女中, 女高]（MIDI）
const C = {
  ii6: [53, 62, 69, 74], V7: [55, 65, 71, 74], I: [48, 64, 72, 72],
  badI: [48, 67, 72, 79], // 七音 F4 → G4 没解决、和外声部的平行五度、少了三音
};

export const LEVEL_B2_4 = {
  minutes: 18,
  insight: t('规则不是随便定的：平行五度会让两条线"融成一条"。', '規則は気まぐれではない：平行 5 度は 2 本の線を「1 本に溶かす」。', 'The rules are not arbitrary: parallel fifths melt two lines into one.'),
  sections: {
    discover: [
      {
        id: 'b24-d1', type: 'discover', ref: 'omt-species1',
        prompt: t('同一个低音线配两种高声部。哪一个版本，你更能听出"两条各自独立的线"？', '同じバスに 2 通りの上声。「2 本の独立した線」がよく聞こえるのはどちら？', 'One bass line, two upper lines. In which version can you hear two independent lines better?'),
        play: [
          { label: t('版本 A', 'バージョン A', 'Version A'), audio: { chords: [[48, 67], [50, 69], [52, 71], [53, 72]], gap: 620 } },
          { label: t('版本 B', 'バージョン B', 'Version B'), audio: { chords: [[48, 76], [50, 74], [52, 72], [53, 69]], gap: 620 } },
        ],
        options: [t('版本 B', 'バージョン B', 'Version B'), t('版本 A', 'バージョン A', 'Version A'), t('听不出区别', '違いが分からない', 'No difference')],
        answer: 0,
        insight: {
          title: t('平行五度让两条线融在一起', '平行 5 度は 2 本の線を溶け合わせる', 'Parallel fifths fuse the lines'),
          text: t('版本 A 的两个声部一直保持纯五度（加八度）同向移动，听起来像一条加厚的线；版本 B 反向进行，两条线各走各的。OMT 的解释：平行五度、八度让"融合"压过"声部独立"，连续的稳定音程还会让音乐失去变化和动力；反向进行最能保持声部独立。四部写作的规则，保护的就是"听得见几条线"。',
            'A の 2 声は完全 5 度（＋オクターヴ）のまま同じ向きに動き、1 本の太い線に聞こえる。B は反行で、2 本がそれぞれの道を行く。OMT によれば、平行 5・8 度は「融合」を「声部の独立」より強め、安定した音程の連続は変化と推進力を止める。反行は独立を最もよく保つ。4 声体の規則が守っているのは「何本の線が聞こえるか」なのだ。',
            'In A the voices move together a perfect fifth (plus octaves) apart and sound like one thickened line; in B they move in contrary motion and each goes its own way. OMT: parallel fifths and octaves promote fusion over independence, and consecutive stable intervals stall variety and motion; contrary motion best preserves independence. The part-writing rules protect how many lines you can hear.'),
        },
      },
    ],
    explain: [
      {
        id: 'b24-e1', type: 'page', ref: 'omt2e-roman-numerals',
        title: t('SATB 的六条规则', 'SATB の 6 つの規則', 'Six SATB rules'),
        text: [
          t('写四部和弦时有六件事要检查：符干方向、和弦构成、音域、间距、声部交叉、重复。', '4 声の和音で確かめる 6 つのこと：符尾の向き・和音の構成・音域・間隔・声部の交差・重複。', 'Six things to check in a four-part chord: stem direction, chord construction, range, spacing, voice crossing and doubling.'),
          t('音域：女高 C4–G5、女中 G3–D5、男高 C3–G4、男低 F2–D4。间距：相邻的上方声部（女高–女中、女中–男高）不超过八度，男高–男低不超过十二度。', '音域：ソプラノ C4–G5、アルト G3–D5、テノール C3–G4、バス F2–D4。間隔：隣り合う上声（S–A、A–T）は 8 度以内、T–B は 12 度以内。', 'Ranges: soprano C4–G5, alto G3–D5, tenor C3–G4, bass F2–D4. Spacing: adjacent upper voices (S–A, A–T) within an octave, tenor–bass within a twelfth.'),
          t('重复：三和弦通常重复低音；导音、和弦七音这些倾向音从不重复；七和弦四个音正好一个声部一个。', '重複：三和音はふつうバスを重複。導音や第 7 音などの傾向音は決して重複しない。七の和音は 4 音が各声部に 1 つずつ。', 'Doubling: a triad usually doubles the bass; tendency tones such as the leading tone and chordal seventh are never doubled; a seventh chord has one note per voice.'),
        ],
        visual: { kind: 'satb', chords: [C.I], labels: ['I'] },
        audio: { chords: [C.I] },
      },
      {
        id: 'b24-e2', type: 'discover', practice: true, ref: 'omt2e-roman-numerals',
        prompt: t('猜一猜：间距错误最常出现在哪两个声部之间？', '予想しよう：間隔の誤りが一番多いのはどの 2 声の間？', 'Guess: where do spacing errors happen most?'),
        options: [t('女中与男高', 'アルトとテノール', 'Alto and tenor'), t('女高与女中', 'ソプラノとアルト', 'Soprano and alto'), t('男高与男低', 'テノールとバス', 'Tenor and bass')],
        answer: 0,
        insight: { title: t('因为它们写在不同的谱表上', '別々の譜表に書くから', 'Because they sit on different staves'), text: t('女中写在高音谱表、男高写在低音谱表，眼睛很容易忽略它们之间的距离。声部交叉也最常出现在这两个声部之间。', 'アルトはト音譜表、テノールはヘ音譜表。目が 2 つの距離を見落としやすい。声部の交差もこの 2 声で一番多い。', 'The alto is on the treble staff and the tenor on the bass staff, so the eye misses the gap between them. Voice crossing is also most common between these two.') },
      },
      {
        id: 'b24-e3', type: 'page', ref: 'omt-species1',
        title: t('每条规则保护的是什么', 'それぞれの規則が守るもの', 'What each rule protects'),
        text: [
          t('平行五度、八度：同样大小的完全协和音程接连出现，融合压过声部独立，稳定音程的连续也让音乐停下来。', '平行 5・8 度：同じ完全協和音程が続くと融合が独立に勝ち、安定した響きの連続が音楽を止める。', 'Parallel fifths and octaves: the same perfect consonance twice in a row lets fusion win over independence, and the run of stable sounds stalls the music.'),
          t('直接八度（同向进入八度）：把注意力引到一个本来就很突出的音程上。', '並達 8 度（並行で 8 度に入る）：もともと目立つ音程にさらに注意を集めてしまう。', 'Direct octaves (similar motion into an octave): draw attention to an interval that already stands out.'),
          t('声部交叉、超越：削弱声部独立，让耳朵分不清哪条线是哪条。', '声部の交差・超越：独立を弱め、どの線がどれか耳で分からなくする。', 'Crossing and overlap: weaken independence and make the lines hard to tell apart by ear.'),
          t('反向进行最能保持声部独立。', '反行が独立を最もよく保つ。', 'Contrary motion preserves independence best.'),
        ],
      },
      {
        id: 'b24-e4', type: 'demo', ref: ['omt2e-v7', 'omt2e-roman-numerals'],
        title: t('重复导音会发生什么', '導音を重複するとどうなる', 'What happens if you double the leading tone'),
        steps: [
          { text: t('C 大调的 V 和弦。故意让男高和女高都唱导音 B。', 'ハ長調の V。わざとテノールとソプラノの両方に導音 B を。', 'V in C major. Deliberately give both tenor and soprano the leading tone B.'), visual: { kind: 'satb', chords: [[43, 59, 67, 71]], labels: ['V'] }, audio: { chords: [[43, 59, 67, 71]] } },
          { text: t('导音想往上走到主音。两个 B 都按倾向上行到 C……', '導音は主音へ上がりたい。2 つの B がどちらも C へ……', 'The leading tone wants to rise to the tonic. Both Bs rise to C…'), visual: { kind: 'satb', chords: [[43, 59, 67, 71], [48, 60, 64, 72]], labels: ['V', 'I'] }, audio: { chords: [[43, 59, 67, 71], [48, 60, 64, 72]] } },
          { text: t('结果：两个声部从八度走到八度——平行八度。"导音不重复"其实是在提前避免平行八度；V7 里重复 ti 或 fa 也是同样的道理。', '結果：2 声が 8 度から 8 度へ——平行 8 度。「導音を重複しない」は平行 8 度の予防。V7 で ti や fa を重複しないのも同じ理由。', 'Result: the two voices go from an octave to an octave — parallel octaves. “Never double the leading tone” is really prevention; doubling ti or fa in V7 fails for the same reason.'), visual: { kind: 'satb', chords: [[43, 59, 67, 71], [48, 60, 64, 72]], labels: ['V', 'I'] } },
        ],
      },
      {
        id: 'b24-e5', type: 'page', ref: ['omt2e-v7', 'omt2e-pd7'],
        title: t('V7：多一个音，更想回家', 'V7：1 音増えて、もっと帰りたくなる', 'V7: one more note, a stronger pull home'),
        text: [
          t('在 V 上加七音（fa），多出的不协和让 V 更想回到 I。先听 V–I，再听 V7–I。', 'V に第 7 音（fa）を足すと、増えた不協和で V が I へもっと向かう。V–I と V7–I を聴き比べよう。', 'Adding the seventh (fa) to V adds dissonance and strengthens its pull to I. Hear V–I, then V7–I.'),
          t('默认解决：七音级进下行（fa → mi），导音上行（ti → do）。完整的 V7 这样解决，得到的 I 有三个根音、一个三音、没有五音——这完全正常：根音决定和弦名，三音决定性质，五音可以省。', '基本の解決：第 7 音は順次下行（fa → mi）、導音は上行（ti → do）。完全な V7 をこう解決すると、I は根音 3 つ・第 3 音 1 つ・第 5 音なし——これは普通のこと。根音が名前を、第 3 音が性質を決め、第 5 音は省ける。', 'Default resolution: the seventh steps down (fa → mi) and the leading tone rises (ti → do). From a complete V7 this gives a I with three roots, one third and no fifth — perfectly normal: the root names the chord, the third gives its quality, the fifth can go.'),
        ],
        visual: { kind: 'satb', chords: [C.V7, C.I], labels: ['V7', 'I'] },
        play: [
          { label: t('V–I', 'V–I', 'V–I'), audio: { chords: [[43, 62, 71, 79], [48, 64, 72, 79]] } },
          { label: t('V7–I', 'V7–I', 'V7–I'), audio: { chords: [C.V7, C.I] } },
        ],
      },
      {
        id: 'b24-e6', type: 'demo', ref: 'omt2e-v7',
        title: t('想要完整的 I？两个办法', '完全な I がほしい？ 2 つの方法', 'Want a complete I? Two ways'),
        steps: [
          { text: t('不完整的 V7：省掉五音，重复根音（只能重复根音——重复 ti 或 fa 会在解决时形成平行八度）。', '不完全な V7：第 5 音を省き根音を重複（根音だけ。ti や fa を重複すると解決で平行 8 度）。', 'Incomplete V7: omit the fifth and double the root (only the root — doubling ti or fa makes parallel octaves on resolution).'), visual: { kind: 'satb', chords: [[55, 65, 71, 79], [48, 64, 72, 79]], labels: ['V7', 'I'] }, audio: { chords: [[55, 65, 71, 79], [48, 64, 72, 79]] } },
          { text: t('导音下跳：完整的 V7 里，内声部的导音不上行，而是跳下去到 sol，I 就有了五音。只在女中或男高这样做，而且只跳到 sol，不跳到更远的 mi。', '導音の下行跳躍：完全な V7 で内声の導音が上がらず sol へ跳び、I に第 5 音ができる。アルトかテノールだけで、跳ぶのは sol まで（遠い mi へは跳ばない）。', 'Leading-tone drop: in a complete V7, an inner-voice leading tone leaps down to sol, so I gets its fifth. Only in the alto or tenor, and only to sol, never further to mi.'), visual: { kind: 'satb', chords: [[43, 59, 65, 74], [48, 55, 64, 72]], labels: ['V7', 'I'] }, audio: { chords: [[43, 59, 65, 74], [48, 55, 64, 72]] } },
        ],
      },
    ],
    experiment: [
      {
        id: 'b24-x1', type: 'experiment', toy: 'satb', ref: ['omt2e-roman-numerals', 'omt-species1', 'omt2e-v7', 'omt2e-pd7'],
        prompt: t('这一段 ii6–V7–I 有毛病。用每个音旁边的上下箭头一级一级地移动它，随时播放，看评分怎么变。能把它改到 100 分吗？', 'この ii6–V7–I には問題がある。各音の上下矢印で 1 音ずつ動かし、いつでも再生して採点の変化を見よう。100 点にできる？', 'This ii6–V7–I has problems. Move notes step by step with the arrows, play it any time and watch the score change. Can you get it to 100?'),
        params: { keyName: 'C', tonic: 0, romans: ['ii6', 'V7', 'I'], chords: [C.ii6, C.V7, C.badI] },
        breakthrough: { id: 'b24-fixed', text: t('你亲手修好了一个平行五度和一个没解决的七音。', '平行 5 度と未解決の第 7 音を自分の手で直した。', 'You fixed a parallel fifth and an unresolved seventh with your own hands.') },
      },
    ],
    challenge: [
      {
        id: 'b24-c1', type: 'choice', error: 'bad-doubling', skills: ['spell', 'voiceLeading'], ref: ['omt2e-roman-numerals', 'omt2e-v7'],
        variants: [
          { prompt: t('C 大调的 V 和弦（G–B–D）里，哪个音不能重复？', 'ハ長調の V（G–B–D）で重複してはいけない音は？', 'In C major, which note of V (G–B–D) must not be doubled?'), options: ['B', 'G', 'D', t('都可以重复', 'どれでもよい', 'Any of them')] },
          { prompt: t('G 大调的 V 和弦（D–F♯–A）里，哪个音不能重复？', 'ト長調の V（D–F♯–A）で重複してはいけない音は？', 'In G major, which note of V (D–F♯–A) must not be doubled?'), options: ['F♯', 'D', 'A', t('都可以重复', 'どれでもよい', 'Any of them')] },
          { prompt: t('F 大调的 V 和弦（C–E–G）里，哪个音不能重复？', 'ヘ長調の V（C–E–G）で重複してはいけない音は？', 'In F major, which note of V (C–E–G) must not be doubled?'), options: ['E', 'C', 'G', t('都可以重复', 'どれでもよい', 'Any of them')] },
        ],
        answer: 0,
        explain: t('导音是倾向音，从不重复：两个导音都上行到主音就成了平行八度。', '導音は傾向音で重複しない：2 つとも主音へ上がると平行 8 度になる。', 'The leading tone is a tendency tone and is never doubled: both copies rising to the tonic make parallel octaves.'),
      },
      {
        id: 'b24-c2', type: 'choice', error: 'spacing', skills: ['identify'], ref: 'omt2e-roman-numerals',
        options: [t('女中–男高超过八度', 'A–T が 8 度を超える', 'Alto–tenor wider than an octave'), t('男高–男低超过十二度', 'T–B が 12 度を超える', 'Tenor–bass wider than a twelfth'), t('女高超出音域', 'ソプラノが音域外', 'Soprano out of range'), t('没有问题', '問題なし', 'No problem')],
        variants: [
          { prompt: t('这个和弦哪里有问题？女高 G5 · 女中 B4 · 男高 D3 · 男低 G2', 'この和音の問題は？ S G5・A B4・T D3・B G2', 'What is wrong with this chord? S G5 · A B4 · T D3 · B G2'), visual: { kind: 'satb', chords: [[43, 50, 71, 79]] }, answer: 0 },
          { prompt: t('这个和弦哪里有问题？女高 D5 · 女中 B4 · 男高 G4 · 男低 G2', 'この和音の問題は？ S D5・A B4・T G4・B G2', 'What is wrong with this chord? S D5 · A B4 · T G4 · B G2'), visual: { kind: 'satb', chords: [[43, 67, 71, 74]] }, answer: 1 },
          { prompt: t('这个和弦哪里有问题？女高 A5 · 女中 C5 · 男高 E4 · 男低 A2', 'この和音の問題は？ S A5・A C5・T E4・B A2', 'What is wrong with this chord? S A5 · A C5 · T E4 · B A2'), visual: { kind: 'satb', chords: [[45, 64, 72, 81]] }, answer: 2 },
        ],
        explain: t('相邻上方声部不超过八度、男高–男低不超过十二度；女高的音域是 C4–G5。', '隣り合う上声は 8 度以内、T–B は 12 度以内。ソプラノの音域は C4–G5。', 'Adjacent upper voices within an octave, tenor–bass within a twelfth; the soprano range is C4–G5.'),
      },
      {
        id: 'b24-c3', type: 'choice', error: 'parallel-fifths', skills: ['voiceLeading'], ref: 'omt-species1',
        variants: [
          {
            prompt: t('C 大调 V → I：男低 G2→C3、男高 D4→E4、女中 B4→C5、女高 D5→G5。哪里有问题？', 'ハ長調 V → I：B G2→C3、T D4→E4、A B4→C5、S D5→G5。問題はどこ？', 'C major V → I: bass G2→C3, tenor D4→E4, alto B4→C5, soprano D5→G5. What is wrong?'),
            visual: { kind: 'satb', chords: [[43, 62, 71, 74], [48, 64, 72, 79]], labels: ['V', 'I'] }, audio: { chords: [[43, 62, 71, 74], [48, 64, 72, 79]] },
            options: [t('女高与男低平行五度', 'S と B の平行 5 度', 'Parallel fifths, soprano and bass'), t('女中与男高平行八度', 'A と T の平行 8 度', 'Parallel octaves, alto and tenor'), t('男高与男低平行五度', 'T と B の平行 5 度', 'Parallel fifths, tenor and bass'), t('没有问题', '問題なし', 'No problem')],
          },
          {
            prompt: t('G 大调 IV → V：男低 C3→D3、男高 G3→A3、女中 E4→F♯4、女高 C5→D5（四个声部一起上行一级）。哪里有问题？', 'ト長調 IV → V：B C3→D3、T G3→A3、A E4→F♯4、S C5→D5（4 声とも 1 音上行）。問題は？', 'G major IV → V: bass C3→D3, tenor G3→A3, alto E4→F♯4, soprano C5→D5 (all four step up). What is wrong?'),
            visual: { kind: 'satb', chords: [[48, 55, 64, 72], [50, 57, 66, 74]], labels: ['IV', 'V'] }, audio: { chords: [[48, 55, 64, 72], [50, 57, 66, 74]] },
            options: [t('男低与男高平行五度、男低与女高平行八度', 'B と T の平行 5 度、B と S の平行 8 度', 'Parallel fifths (bass–tenor) and octaves (bass–soprano)'), t('只有女中与女高平行三度，没有问题', 'A と S の平行 3 度だけで問題なし', 'Only parallel thirds (alto–soprano) — fine'), t('只有男低与女高平行八度', 'B と S の平行 8 度だけ', 'Only parallel octaves (bass–soprano)'), t('没有问题', '問題なし', 'No problem')],
          },
        ],
        answer: 0,
        explain: t('两个声部前后都是同样大小的纯五度或纯八度（含复音程），而且都在移动——平行。改用反向进行能同时救好几对声部。', '2 声が前後とも同じ完全 5 度・8 度（複音程を含む）で、どちらも動いている——平行。反行にすると何組も同時に直せる。', 'Two voices make the same perfect fifth or octave (compound included) twice while both move — parallels. Contrary motion fixes several pairs at once.'),
      },
      {
        id: 'b24-c4', type: 'choice', error: 'incomplete-chord', skills: ['function', 'voiceLeading'], ref: 'omt2e-v7',
        variants: [
          { prompt: t('C 大调：完整的 V7（G–B–D–F）按默认方式解决（F→E、B→C）。得到的 I 和弦是什么样？', 'ハ長調：完全な V7（G–B–D–F）を基本の解決（F→E、B→C）。できる I は？', 'C major: a complete V7 (G–B–D–F) resolves the default way (F→E, B→C). What does the I look like?') },
          { prompt: t('G 大调：完整的 V7（D–F♯–A–C）按默认方式解决（C→B、F♯→G）。得到的 I 和弦是什么样？', 'ト長調：完全な V7（D–F♯–A–C）を基本の解決（C→B、F♯→G）。できる I は？', 'G major: a complete V7 (D–F♯–A–C) resolves the default way (C→B, F♯→G). What does the I look like?') },
        ],
        options: [t('三个根音、一个三音、没有五音——完全正常', '根音 3・第 3 音 1・第 5 音なし——普通のこと', 'Three roots, one third, no fifth — perfectly normal'), t('缺了五音，是错的，必须改', '第 5 音がないので誤り、直すべき', 'Missing its fifth — wrong, must be fixed'), t('两个根音、两个三音', '根音 2・第 3 音 2', 'Two roots and two thirds'), t('根音、三音、五音各一个，再加一个七音', '根音・3 度・5 度が 1 つずつ、さらに第 7 音', 'One root, third and fifth, plus a seventh')],
        answer: 0,
        explain: t('根音决定和弦名、三音决定性质，五音可以省，所以三根一三的 I 是正常、常见的结果。', '根音が名前、第 3 音が性質を決め、第 5 音は省ける。だから根音 3・第 3 音 1 の I は普通でよくある。', 'The root names the chord and the third sets its quality; the fifth can go, so a I with three roots and a third is normal and common.'),
      },
      {
        id: 'b24-c5', type: 'choice', error: 'bad-doubling', skills: ['voiceLeading', 'apply'], ref: 'omt2e-v7',
        variants: [
          { prompt: t('C 大调：想让 I 完整，把 V7 写成不完整的（省掉五音 D）。这时 V7 应该重复哪个音？', 'ハ長調：I を完全にするため V7 を不完全に（第 5 音 D を省く）。何を重複する？', 'C major: to get a complete I you write an incomplete V7 (no fifth, D). Which note do you double?'), options: [t('根音 G', '根音 G', 'The root, G'), t('导音 B', '導音 B', 'The leading tone, B'), t('七音 F', '第 7 音 F', 'The seventh, F'), t('哪个都行', 'どれでもよい', 'Any of them')] },
          { prompt: t('F 大调：想让 I 完整，把 V7 写成不完整的（省掉五音 G）。这时 V7 应该重复哪个音？', 'ヘ長調：I を完全にするため V7 を不完全に（第 5 音 G を省く）。何を重複する？', 'F major: to get a complete I you write an incomplete V7 (no fifth, G). Which note do you double?'), options: [t('根音 C', '根音 C', 'The root, C'), t('导音 E', '導音 E', 'The leading tone, E'), t('七音 B♭', '第 7 音 B♭', 'The seventh, B♭'), t('哪个都行', 'どれでもよい', 'Any of them')] },
        ],
        answer: 0,
        explain: t('只能重复根音：重复 ti 或 fa，两个声部按倾向解决时会形成平行八度。', '重複できるのは根音だけ：ti や fa を重複すると、傾向どおりに解決したとき平行 8 度になる。', 'Only the root: doubling ti or fa produces parallel octaves when both copies resolve by tendency.'),
      },
      {
        id: 'b24-c6', type: 'choice', error: 'unresolved-leading-tone', skills: ['apply', 'spell'], ref: 'omt2e-v7',
        variants: [
          { prompt: t('C 大调 V7 → I：内声部的导音 B 不上行而是跳下去，好让 I 完整。它应该跳到哪个音？', 'ハ長調 V7 → I：内声の導音 B が上がらず下へ跳んで I を完全にする。行き先は？', 'C major V7 → I: an inner-voice leading tone B leaps down instead of rising, to complete the I. Where does it go?'), options: ['G', 'E', 'D', 'C'] },
          { prompt: t('F 大调 V7 → I：内声部的导音 E 不上行而是跳下去，好让 I 完整。它应该跳到哪个音？', 'ヘ長調 V7 → I：内声の導音 E が下へ跳んで I を完全にする。行き先は？', 'F major V7 → I: an inner-voice leading tone E leaps down to complete the I. Where does it go?'), options: ['C', 'A', 'G', 'F'] },
          { prompt: t('D 大调 V7 → I：内声部的导音 C♯ 不上行而是跳下去，好让 I 完整。它应该跳到哪个音？', 'ニ長調 V7 → I：内声の導音 C♯ が下へ跳んで I を完全にする。行き先は？', 'D major V7 → I: an inner-voice leading tone C♯ leaps down to complete the I. Where does it go?'), options: ['A', 'F♯', 'E', 'D'] },
        ],
        answer: 0,
        explain: t('导音下跳只在女中或男高，而且只跳到最近的 sol（主和弦的五音），不跳到更远的 mi。', '導音の下行跳躍はアルトかテノールだけで、近い sol（主和音の第 5 音）へ。遠い mi へは行かない。', 'The leading-tone drop happens only in the alto or tenor, and only to the nearer sol (the tonic chord’s fifth), never to mi.'),
      },
      {
        id: 'b24-c7', type: 'listen', error: 'parallel-octaves', skills: ['hearing'], ref: 'omt-species1',
        prompt: t('听两个版本的 I → ii。哪一个版本有平行八度和平行五度？', 'I → ii を 2 通り聴こう。平行 8 度・5 度があるのはどちら？', 'Hear two versions of I → ii. Which one has parallel octaves and fifths?'),
        options: [t('版本 1', 'バージョン 1', 'Version 1'), t('版本 2', 'バージョン 2', 'Version 2'), t('两个都有', '両方', 'Both'), t('两个都没有', 'どちらもない', 'Neither')],
        variants: [
          { play: [{ label: t('版本 1', 'バージョン 1', 'Version 1'), audio: { chords: [[48, 55, 64, 72], [50, 57, 65, 74]] } }, { label: t('版本 2', 'バージョン 2', 'Version 2'), audio: { chords: [[48, 55, 64, 72], [50, 53, 65, 69]] } }], answer: 0 },
          { play: [{ label: t('版本 1', 'バージョン 1', 'Version 1'), audio: { chords: [[48, 55, 64, 72], [50, 53, 65, 69]] } }, { label: t('版本 2', 'バージョン 2', 'Version 2'), audio: { chords: [[48, 55, 64, 72], [50, 57, 65, 74]] } }], answer: 1 },
        ],
        explain: t('四个声部一起上行一级时，所有音程原样平移：男低–女高的八度、男低–男高的五度都变成平行。另一个版本女高、男高往下走，避开了。', '4 声が一緒に 1 音上がると音程がそのまま平行移動：B–S の 8 度、B–T の 5 度が平行に。もう一方は S と T が下がって避けている。', 'When all four voices step up together every interval slides along: bass–soprano octaves and bass–tenor fifths become parallel. The other version moves soprano and tenor down to avoid them.'),
      },
    ],
    lab: [
      { id: 'b24-lab', type: 'lab', lab: 'vl-ii6-V7-I', mandatory: true, minutes: 5 },
    ],
  },
  // 补弱挑战的题库（按技能挑选；生成器每次出新题）
  pool: [
    { id: 'b24-p1', type: 'gen', gen: 'motion', count: 3, skills: ['voiceLeading'] },
    { id: 'b24-p2', type: 'gen', gen: 'seventhSpell', count: 3, skills: ['spell'] },
    { id: 'b24-p3', type: 'gen', gen: 'romanChord', count: 3, skills: ['function', 'identify'] },
    { id: 'b24-p4', type: 'gen', gen: 'triadEar', count: 3, skills: ['hearing'] },
    { id: 'b24-p5', type: 'gen', gen: 'inversionBass', count: 2, skills: ['apply', 'identify'] },
  ],
};

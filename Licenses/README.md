# 许可证与第三方声明

核对日期：2026-10-08。许可证原文统一放在本目录；完整作者、来源、使用范围和关联文件见自动生成的 [REFERENCES.md](REFERENCES.md)，根目录 [README](../README.md) 同步显示许可状态。分发相关材料时应一并保留这些声明、来源署名和适用的许可原文。

## 项目原创代码

[Project-MIT.txt](Project-MIT.txt) 是原根目录 `LICENSE` 的原文，保留 `Copyright (c) 2026 Bing(3035936740)`。原 `resources/piano/LICENSE` 与此文件内容相同，统一合并到此处。该 MIT 授权适用于本项目自行编写的程序代码；第三方材料和依其许可发布的教学改编内容按下列范围适用各自许可。

## 现代和声课程的本次引用

- [Justin Rubin — Nonfunctional Tonality](https://open.lib.umn.edu/musiccomposition/chapter/nonfunctional-tonality/) 页脚明确标注 ©2024 Justin Rubin、[CC BY 4.0](CC-BY-4.0.txt)。参照平行移动与共同音概念，独立编写中日英教学、图示与频率示例；未复制原谱例、图片或音频。
- University of Iowa 的 Tonality 页面明确标注 All Rights Reserved；University of Houston、IRCAM 与 Kyle Gann 的引用页面未确认开放再利用许可。这里只引用概念 / 技术事实，文字、题目、图示与合成示例自行编写，没有替这些来源添加开放许可证。逐项状态见 [REFERENCES.md](REFERENCES.md)。

## 第三方代码与数据

### Huaishu61/Sposobin

- 作者：Huaishu61；来源：[Huaishu61/Sposobin](https://github.com/Huaishu61/Sposobin)。
- 上游 [README 的 License 段落](https://github.com/Huaishu61/Sposobin/blob/main/README.md) 明确声明采用 MIT。核对时仓库文件树中没有独立 LICENSE，也没有提供可沿用的 MIT 版权署名行。
- [Sposobin-MIT.txt](Sposobin-MIT.txt) 保存来源、上述声明和标准 MIT 条款；注明条款文本是补充保存的标准文本。未编造上游版权年份或把本项目作者署名套用给上游。
- 使用范围：`sposobin_data.js` 中的功能和声连接数据、`jazz_compass.js` 中的数据解析与功能和声逻辑，以及 `classical_voicing.js` 等四部和声规则实现。项目将 Python 数据整理为 JavaScript，独立实现声部搜索、解析与界面；具体关联文件见引用清单。`resources/piano/` 中相应文件同样适用。

### MarkGotham/species 与 Fux 练习

- 作者：Mark Gotham；上游感谢 Jay Wilson 的初始转录。来源：[MarkGotham/species](https://github.com/MarkGotham/species)。
- 原文：[MarkGotham-species-MIT.txt](MarkGotham-species-MIT.txt)，逐字保存上游 [LICENSE](https://github.com/MarkGotham/species/blob/main/LICENSE)，包含 `Copyright (c) 2026 Mark Gotham`。
- 上游 [README](https://github.com/MarkGotham/species#acknowledgements-contribution-and-licence) 区分：代码为 MIT，渲染乐谱为 CC0（Mark Gotham 与 FourScoreAndMore.org 放弃相应权利）。[CC0-1.0.txt](CC0-1.0.txt) 保存 CC0 原文。此 CC0 声明的范围是上游指定的渲染乐谱。
- 本项目从上游 Part I 的 MusicXML 和练习索引转换出 `fux_species_data.js`，将音高、时值、休止及连音整理为 JSON，并由自己的界面渲染；保留图号与上游转录署名。转换脚本为 `scripts/build-fux-data.py`。数据来源中的 MIT 声明与上游版权声明随分发保留。

## 教材、教学文字与数据改编

原文：[CC-BY-SA-4.0.txt](CC-BY-SA-4.0.txt)；官方许可：[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)。来源及作者如下。

| 来源 | 作者 / 署名 | 许可核对依据 |
| --- | --- | --- |
| [Open Music Theory 第一版](https://openmusictheory.github.io/) | Kris Shaffer、Bryn Hughes、Brian Moseley；编辑 Kris Shaffer、Robin Wharton；Hybrid Pedagogy Publishing（页脚 © 2022） | 首页页脚明确链接 CC BY-SA 4.0 |
| [Open Music Theory 2e](https://viva.pressbooks.pub/openmusictheory/)，含 LibreTexts 镜像 | Mark Gotham、Kyle Gullings、Chelsey Hamm、Bryn Hughes、Brian Jarvis、Megan Lavengood、John Peterson；各章节作者仍以引用条目与原页面为准 | [LibreTexts 的引用章节](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.12%3A_Major_Scales_Scale_Degrees_and_Key_Signatures) 标注 CC BY-SA 4.0 与作者；Pressbooks 原站本次访问受限 |
| [Inquiry-Based Music Theory 2017–18](https://smbutterfield.github.io/ibmt17-18/) | Sean Butterfield、Evan Williamson，2017 | 网站页脚的 CC BY-SA 链接指向 4.0，故补齐原登记缺失的版本 |
| Wikipedia（英文、中文、日文） | 各条目贡献者；条目名和原页面在引用清单中保留 | [Wikipedia:Copyrights](https://en.wikipedia.org/wiki/Wikipedia:Copyrights)；文本适用 CC BY-SA 4.0，页面内另行标注许可的图片、乐谱等需按其单独声明处理 |

使用与改动：本项目依据这些资料整理音阶、和弦、音程、声部连接、乐器音域与其他乐理内容，重写为交互数据与题目，并进行中文、日文、英文翻译、节选、归纳及教学改编。具体使用范围、原作链接、作者和关联文件见 [REFERENCES.md](REFERENCES.md)。源自上述 CC BY-SA 4.0 材料的翻译、摘编与教学内容改编部分，以及本项目对这些改编的贡献，继续按 CC BY-SA 4.0 提供；保留署名、许可链接与改动说明。项目没有因列出教材总许可而替其中另行署名的第三方素材推定授权。

## 钢琴采样

- 作品：Salamander Grand Piano V3（Yamaha C5）；作者与录音：Alexander Holm。
- 原始来源：[FreePats](https://freepats.zenvoid.org/Piano/acoustic-grand-piano.html)、[Internet Archive](https://archive.org/details/SalamanderGrandPianoV3)。本仓库 MP3 下载自 [Tone.js 托管的 Salamander 音色目录](https://tonejs.github.io/audio/salamander/)。
- 许可：[CC-BY-3.0.txt](CC-BY-3.0.txt)，逐字保存 [sfzinstruments/SalamanderGrandPiano 的 LICENSE](https://github.com/sfzinstruments/SalamanderGrandPiano/blob/master/LICENSE)，即 CC BY 3.0 Unported。该仓库的 SFZ 重映射作者为 kinwie；本项目引用它的许可和录音说明，没有使用其 SFZ 映射文件。
- 范围：`resources/piano/*.mp3`。原 MP3 文件未修改；运行时音频引擎裁剪起始静音、截取音长，并用 `playbackRate` 移调。这里的音色许可不因下载自 Tone.js 而变成 Tone.js 程序代码的许可。

## musictheory.net 课程

- 作者：musictheory.net, LLC；来源：[Cadences](https://www.musictheory.net/lessons/55)，courtesy of [musictheory.net](https://www.musictheory.net)。
- [官方 Legal / Lessons Policy](https://www.musictheory.net/legal) 明确将课程文字与静态图片置于 CC BY 4.0；原文保存在 [CC-BY-4.0.txt](CC-BY-4.0.txt)。
- 使用范围：终止式知识的归纳、翻译与教学说明，具体文件见引用清单。原站交互播放器、课程数据文件、JSON、源码和音频不属于这一 CC BY 4.0 授权范围，本项目的实现为自行编写。

## MusicXML 规范

- [MusicXML 4.0](https://www.w3.org/2021/06/musicxml40/)：Copyright © 2004–2021 the Contributors to the MusicXML Specification，发布方为 W3C Music Notation Community Group。
- 规范声明适用 [W3C Community Final Specification Agreement](https://www.w3.org/community/about/process/final/)，全文保存在 [W3C-Community-FSA.txt](W3C-Community-FSA.txt)，从官方 HTML 提取正文并保留文内链接。
- 本项目依据规范自行实现 `musicxml_export.js`；本声明记录所引用规范的许可范围。

## 未登记明确再利用许可的来源

根目录 README 和 [REFERENCES.md](REFERENCES.md) 中以 **未登记明确再利用许可（待核实）** 标记的条目，尚无已登记且可用于本项目相应材料的明确许可；此状态不等于断言原作者从未授权。包括讲义、商业教学网站、个人理论页面、论文及没有明确许可记录的代码仓库等。它们保留作者与原始链接，不生成虚构的许可证。

`Cited for facts only` 是原项目的引用范围备注；`MTO (copyright the author)` 是版权备注，两者均不当作开放许可证。GitHub 仓库没有 LICENSE 文件时也继续检查 README 的许可声明，Sposobin 即属于这种情况。对于 `MrZ626/shasavistic-chord-diagram-editor` 和 `Rtt398/nafchanaphata`，本次未在仓库文件树找到许可文件，仍标记待核实。

补充核对记录见 [SOURCE_CHECKS.md](SOURCE_CHECKS.md)。[SoundQuest 游客条款第 5 条](https://soundquest.jp/terms-for-guests/) 对复制、翻译和转载要求权利人授权；中文版自由派音乐理论页脚署名为 SoundQuest / Aizcutei。[MTO 论文版权段落](https://mtosmt.org/issues/mto.17.23.1/mto.17.23.1.mcclimon.html) 对研究交流与再发表作了不同规定，再发表需作者书面许可及通知编辑；[arXiv:1805.11087](https://arxiv.org/abs/1805.11087) 链接的许可是授予 arXiv 的非独占分发许可。这些均未当作本项目可自由再发布的开放许可证。

## 许可原文的保存来源

许可条款正文不做改写。MIT 源项目许可与 Salamander CC BY 3.0 原文来自上述各上游仓库；通用 CC BY-SA 4.0 与 CC0 原文使用 [SPDX license-list-data](https://github.com/spdx/license-list-data) 收录的法律文本，官方版本链接分别为 [CC BY-SA 4.0 legal code](https://creativecommons.org/licenses/by-sa/4.0/legalcode.en) 与 [CC0 1.0 legal code](https://creativecommons.org/publicdomain/zero/1.0/legalcode.en)。这些通用许可文本不替代各作品的作者署名与具体授权范围。

| 本地文件 | 获取位置 / Git blob SHA |
| --- | --- |
| MarkGotham-species-MIT.txt | MarkGotham/species `LICENSE` — `7151cf4800e2948ce288c612fcdd84333c1e0e9a` |
| CC-BY-3.0.txt | sfzinstruments/SalamanderGrandPiano `LICENSE` — `1a16e05564d2aaa880bbe9e506a0a0226d8742cc` |
| CC-BY-SA-4.0.txt | spdx/license-list-data `text/CC-BY-SA-4.0.txt` — `835a6836b385fa068fdd625685548845cda60c2f` |
| CC0-1.0.txt | spdx/license-list-data `text/CC0-1.0.txt` — `0e259d42c996742e9e3cba14c677129b2c1b6311` |
| CC-BY-4.0.txt | spdx/license-list-data `text/CC-BY-4.0.txt` — `13ca539f377dc705af32b8d2ce89262298ea2f06` |

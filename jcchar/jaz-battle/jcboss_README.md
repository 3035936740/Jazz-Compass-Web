# JAZ Boss — JRPG Theory Combat / Vertical Slice

当前入口：`char/jcboss.html`。

预览：`http://127.0.0.1:8765/char/jcboss.html?revision=jrpg3`。使用本地 HTTP 服务运行；ES modules 和根目录的音频 / 乐理依赖需要通过 HTTP 加载。页面的 `<base href="../">` 保持主项目的 `resources/piano/` 采样路径正确。无需安装框架、无需构建。所有新增 / 修改文件均位于 `char`。

## 这一版是什么

一个可完整游玩的回合制 JAZ Boss 遭遇，4 个普通回合、1 次 II–V–I CANNON 防御、1 个自由配音终局。

JAZ 的数值为执念（100%），玩家为 HP（100）。玩家只有在音乐功能、旋律、实际声部连接或给定色彩目标失败时失去 HP。有效音乐如果中了预判，会充能而不扣 HP。有效且每音有作用的编配降低执念；只有音乐有效、却缺乏反驳证据时，战斗也可能以“音乐成立，执念未破”结束。

四个命令：

- ANALYZE：不消耗回合，查看已知和弦的组成与度数、调性中心、低音、当前旋律和已有声部。没有下一和弦推荐，没有实时草稿判分。
- ARRANGE：直接编辑低音与最多 6 条伴奏声部的真实 MIDI 音高、八度、增减声部、转位；可以构造下一拍，使延后 / 替代获得实际后续解决。
- GUARD：构造贯穿 Dm7 → G7 → Cmaj7 的两条持续声部。判定和弦性质与真实音域内的级进。已建立的防御可保留到大炮阶段；提前准备消耗当前行动，也给 JAZ 的独奏充能，不降低执念。大炮阶段成功防御完全消解冲击并动摇执念。
- HOLD：原样保持当前伴奏。第二 / 三回合缺功能或色彩时不能过关，第四回合已有配音可成立时则是有效选择。

编辑不发声、不判分。每回合 1 次草稿试听、1 次已有片段试听。切命令、ANALYZE、错误后的重编不会刷新预算。普通错误 Commit 扣 25 HP，不推进当前音乐目标；只有 4 次错误的生命预算。大炮防御失败扣 21 HP（缺少结构的普通防御仅抵消部分冲击），炮击只结算一次。没有倒计时、动作碰撞、弹幕玩法、QTE 或节拍命中要求。

## 音乐判定的范围

这是有明确语境的可玩原型，不是通用 Jazz 审美裁判。

指标分别为 FUNCTION / MELODY / VOICE LEADING / COLOR / REDUNDANCY。基于原项目和弦音名与度数工具，在可读的和声语法中判断主功能、欺骗终止、属延长与三全音替代；涉及延后 / 替代时还评估玩家实际写出的下一拍。不是与一个 MIDI 答案数组比较。

第三、最终回合确实需要更多色彩音；满足目标的密集 voicing 与精简 voicing 使用同样的规则。少音缺少目标色彩会失败，多音只要实际承担作用就能获认可。过近的未经要求半音 / 小九度冲突与超出当前原型支持语境的音会失败。冗余本身不扣 HP，只影响 Claim。不同八度、配音排序、转位、主六和弦版本、合理欺骗 / 延后 / 替代均有测试覆盖。

## 代码分层

- `jaz-battle/scenarios.js`：MusicScenario、固定 Claim、音乐目标与场景数据，文本沿用 `{zh, ja, en}`。
- `jaz-battle/battle-state.js`：BattleState、BossIntent、PlayerAction、充能、行动预算、HP / 执念、回合与结束条件。
- `jaz-battle/music-evaluation.js`：MusicEvaluation、声部路径与多指标音乐规则；没有 DOM / 演出副作用。
- `jaz-battle/boss-reaction.js`：BossReaction 与角色表现；消费结果而不修改判定。
- `jaz-battle/battle-audio.js`：复用 `audio_engine.js`、`module_kit.js` 的钢琴采样、总线、频率与中断接口。
- `jaz-battle/main.js`：页面、真实配音编辑、命令、Commit、日志和本地化。
- `jaz-battle/battle.css`：复用 `app.css` 的 UI / display / mono 字体、午夜蓝、黄铜、圆角和主题 token；复用完整角色素材。

状态流程：INTRO → PLANNING → RESOLVING → RESULT → 下一音乐回合 / DEFENSE / FINAL → VICTORY 或 DEFEAT。Commit 原子化，连续点击不能重复扣血或奖励。

旧版本保留：`jcboss-action.html` 是原实时动作版；`jcboss-lab.html` 是最初三位角色的实验室。主项目学习页面、课程与音频源码未修改。现阶段没有接入学习进度存档。

## 已验证与自检

`node --test char/jaz-battle/music-evaluation.test.mjs`：17 项行为测试，包含：

- 普通 Cmaj7 音乐有效、被预判、Charge 1→2、HP 不变。
- Tonic shell 仍被预判，但 Conviction −10。
- 延后 + 下一拍、三全音替代 + 下一拍、合理欺骗终止可成立；随便避开 I 不成立。
- 简单 shell 在需要色彩的回合失败；多个密集终局 voicing、主六版本与转位可成立。
- Guard 的结构与真实连接；提前防御持续保存。
- 一次试听预算、不以错误刷证据、4 次错误耗尽 HP、原子 Commit。
- 完整 4 回合 + 1 炮击 + BREAK + 自由终局。
- 有效音乐仍可能没打破执念，HP 不会因此扣除。
- 固定随机种子生成的 5000 份盲目终局配音，没有优秀解；配合有限生命与无实时判分，不提供实际乱点通关路径。这不意味着数学上不存在偶然猜中，而是排除了无限无成本尝试。

`char/jaz-battle/browser.verify.cjs`：真实浏览器检查指定示范回合、错误色彩 / HP、复杂配音、炮击防御、HOLD、终局胜利、shell、延后避开预判、试听预算、zh / ja / en、390px 手机布局和本地音频资源，无脚本错误或缺失资源。依赖路径指向本机已有 Playwright，可按环境调整。

`preview-*.png` 为浏览器验证截图。

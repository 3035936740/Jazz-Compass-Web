// 乐理闯关的道中 Boss（章节中场）挡在哪一关前面：打败这个 Boss 才能开放这一关。
// learn_content.js 据此给关卡加上 gate（learn_engine.isUnlocked 检查），learn_bosses.js 据此把 Boss 放在地图上的同一位置。
// 位置按 jcchar/关卡节奏.txt 与 补充.txt：第二章第 8 节「紧密排列与开放排列」之后、第 9 节「终止式」之前；第四章第 8 节「和弦—音阶」之后、第 9 节「旋律小调的七个调式」之前。
export const BOSS_GATES = { cadences: 'boss@sever-mid', melodicminor: 'boss@jaz-mid' };

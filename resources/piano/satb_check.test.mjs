import test from 'node:test';
import assert from 'node:assert/strict';
import { checkSATB, identifyChord } from './satb_check.js';

const rules = (result) => result.issues.map((i) => `${i.rule}@${i.at}:${i.parts.join('-')}`);

test('identifies chords and inversion figures', () => {
  assert.deepEqual((({ root, quality, figure }) => ({ root, quality, figure }))(identifyChord([48, 55, 64, 72])), { root: 0, quality: 'maj', figure: '5/3' });
  assert.equal(identifyChord([52, 55, 60, 67]).figure, '6');
  assert.equal(identifyChord([43, 53, 59, 67]).quality, 'dom7');
  assert.equal(identifyChord([43, 53, 59, 67]).seventh, 5);
  assert.equal(identifyChord([47, 55, 62, 65]).figure, '6/5');
  assert.equal(identifyChord([43, 55, 59, 65]).incomplete, true, 'V7 without the fifth');
});

test('a clean I–V7–I passes', () => {
  // C: C3 G3 E4 C5 → G2 F3 D4 B4 → C3 E3 E4 C5 (ti→do, fa→mi)
  const r = checkSATB([[48, 55, 64, 72], [43, 53, 62, 71], [48, 52, 64, 72]], { tonic: 0 });
  assert.deepEqual(rules(r).filter((x) => !x.startsWith('direct')), []);
});

test('finds parallels, crossing, spacing, doubled leading tone, unresolved tendency tones', () => {
  // 平行五度：男低 C3→D3，女中 G4→A4（都上行大二度）
  const p5 = checkSATB([[48, 60, 67, 76], [50, 62, 69, 77]], { tonic: 0 });
  assert.ok(rules(p5).some((x) => x.startsWith('parallel-5@0:bass-alto')), rules(p5).join(' '));
  // 平行八度：男低 C3→D3，女高 C5→D5
  assert.ok(rules(checkSATB([[48, 55, 64, 72], [50, 57, 65, 74]], { tonic: 0 })).some((x) => x.startsWith('parallel-8@0:bass-soprano')));
  // 交叉：男高高于女中
  assert.ok(rules(checkSATB([[48, 67, 64, 72]], { tonic: 0 })).some((x) => x.startsWith('crossing@0:tenor-alto')));
  // 间距：女高与女中超过八度
  assert.ok(rules(checkSATB([[48, 55, 60, 76]], { tonic: 0 })).some((x) => x.startsWith('spacing@0:soprano-alto')));
  // 导音重复：G 大三和弦里两个 B
  assert.ok(rules(checkSATB([[43, 59, 62, 71]], { tonic: 0 })).some((x) => x.startsWith('doubled-leading@0')));
  // 女高的导音没有上行到主音
  assert.ok(rules(checkSATB([[43, 55, 62, 71], [48, 55, 64, 67]], { tonic: 0 })).some((x) => x.startsWith('leading-tone@0:soprano')));
  // 内声部导音往下跳到 sol 是允许的
  // V7（G2 B3 F4 G4）→ I（C3 G3 E4 E5）：男高的 B3 往下跳到 G3，女中的七音 F4 落到 E4
  const drop = rules(checkSATB([[43, 59, 65, 67], [48, 55, 64, 76]], { tonic: 0 }));
  assert.ok(!drop.some((x) => x.startsWith('leading-tone') || x.startsWith('seventh')), drop.join(' '));
  assert.ok(rules(checkSATB([[43, 53, 62, 71], [48, 55, 64, 72]], { tonic: 0 })).some((x) => x.startsWith('seventh@0:tenor')), 'F3 → G3 goes up');
  // 音域
  assert.ok(rules(checkSATB([[36, 55, 64, 72]], { tonic: 0 })).some((x) => x.startsWith('range@0:bass')));
});

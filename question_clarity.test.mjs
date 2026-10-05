import test from 'node:test';
import assert from 'node:assert/strict';
import { UNITS, SIDES } from './learn_content.js';
import { UNITS as PIANO_UNITS, SIDES as PIANO_SIDES } from './resources/piano/learn_content.js';
import { GENERATORS } from './learn_generators.js';
import { GENERATORS as PIANO_GENERATORS } from './resources/piano/learn_generators.js';
import { levelById, extLevelById, examById } from './sideb_content.js';
import { EXAM_TASKS } from './sideb_exam_tasks.js';
import { gradeNode as grade } from './sideb_engine.js';
import { parsePitch, parseNote } from './pitch_spelling.js';
import { clarifyQuestion } from './learn_question_clarity.js';

const zh = value => typeof value === 'string' ? value : value?.zh ?? '';
const cards = units => units.flatMap(u => [u.cards, ...u.branch.map(b => b.cards)]).flat();
const aCards = cards([...UNITS, ...SIDES]);
const pianoCards = cards([...PIANO_UNITS, ...PIANO_SIDES]);
const allB = level => [...Object.values(level.sections).flat(), ...(level.pool || [])]
  .flatMap(n => n.variants?.map(v => ({ ...n, ...v, variants: undefined })) || [n]);
const seeded = seed => () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };

test('A and piano questions state the missing musical context without changing answers', () => {
  for (const pool of [aCards, pianoCards]) {
    const find = text => pool.find(c => zh(c.prompt).includes(text));
    assert.match(zh(find('旋律用 C 宫').prompt), /以 A 为主音/);
    assert.match(zh(find('C D E 变成').prompt), /C 大调.*调内倒影.*不要求半音/);
    assert.equal(zh(find('C D E 变成').options[0]), 'C B A');
    assert.match(zh(find('女高音 E4').prompt), /C3→A2 下行/);
    assert.match(zh(find('和弦外音本身').prompt), /本身落在强拍.*弱拍解决/);
    assert.match(zh(find('希望旋律音 A').prompt), /三音.*不是九、十三/);
    assert.equal(zh(find('希望旋律音 A').options[0]), 'F7');
    const french = find('哪一种增六和弦');
    assert.match(zh(french.prompt), /四个不同音/);
    const interval = find('C 到 G♯');
    assert.match(zh(interval.prompt), /向上.*一个八度/);
    assert.match(zh(find('七种调式里最').prompt), /同主音调式/);
    const ct = find('CTo7 和 vii°7');
    assert.match(zh(ct.options[ct.answer]), /可以等音同音/);
    assert.match(zh(ct.explain), /不一定有同一组音/);
  }
});

test('pure interval hearing has one answer per sounding interval, including tritones', () => {
  for (const generators of [GENERATORS, PIANO_GENERATORS]) {
    let tritones = 0;
    for (let seed = 1; seed <= 100; seed++) {
      const card = generators.intervalEar.make(seeded(seed * 7919), { codes: ['A4', 'd5', 'm2', 'P5', 'M3'] });
      assert.equal(new Set(card.options.map(zh)).size, card.options.length);
      const six = card.audio.notes[1] - card.audio.notes[0] === 6;
      assert.equal(zh(card.options[card.answer]).includes('三全音'), six);
      assert.equal(card.options.filter(o => /三全音/.test(zh(o))).length, 1);
      if (six) tritones++;
    }
    assert.ok(tritones > 0);
    const octave = generators.intervalName.make(seeded(12), { codes: ['P8'] });
    assert.equal(octave.audio.notes[1] - octave.audio.notes[0], 12);
    octave.visual.notes.forEach(n => assert.ok(octave.prompt.zh.includes(n)));
    const blues = generators.bluesScale.make(seeded(8));
    assert.match(blues.prompt.zh, /按升四级 fi 拼写/);
    if (generators.primeLimit) assert.match(generators.primeLimit.make(seeded(7)).prompt.zh, /最低极限/);
  }
});

test('B inversion and parallel-fifths examples contain the notes asserted by their answers', () => {
  const inversion = allB(extLevelById('B2-1x')).find(n => zh(n.prompt).startsWith('低音是 F，上面'));
  const upper = inversion.prompt.en.match(/with (.*?) above/)[1].split(', ');
  assert.deepEqual(['F', ...upper].map(n => parseNote(n).pc).sort((a,b) => a-b), [2, 5, 7, 11]);
  assert.equal(grade(inversion, inversion.answer).score, 1);
  const parallel = allB(extLevelById('B2-4x')).find(n => zh(n.prompt).startsWith('两个声部：C3–G4'));
  const [low1, high1, low2, high2] = parallel.prompt.en.match(/[A-G][0-9]/g).map(n => parsePitch(n).midi);
  assert.ok(low2 > low1 && high2 > high1);
  assert.equal((high1 - low1) % 12, 7);
  assert.equal((high2 - low2) % 12, 7);
  assert.equal(grade(parallel, parallel.answer).score, 1);
});

test('B variants and exam copies retain explicit spelling, tonic and input-format conditions', () => {
  const modes = allB(extLevelById('B1-5x')).filter(n => /第六个音|第五个音/.test(zh(n.prompt)) && n.options);
  assert.ok(modes.some(n => /等音异名不能替代/.test(zh(n.prompt))));
  const pent = allB(extLevelById('B1-6x')).filter(n => /旋律停在/.test(zh(n.prompt)));
  assert.equal(pent.length, 3);
  pent.forEach(n => assert.match(zh(n.prompt), /确立为主音/));
  const task = EXAM_TASKS.melody[0];
  task.steps.filter(s => s.kind === 'note').forEach(s => assert.match(s.inputHint.zh, /八度编号/));
  const bNotes = Object.values(EXAM_TASKS).flat().flatMap(n => n.steps || []).filter(s => s.kind === 'note');
  assert.ok(bNotes.length);
  bNotes.forEach(s => assert.ok(s.inputHint));
  const exam = examById('T-melody');
  for (let attempt = 0; attempt < 10; attempt++) for (const n of exam.draw(attempt).challenge) {
    for (const s of n.steps || []) if (['note', 'roman'].includes(s.kind)) assert.ok(s.inputHint);
  }
});

test('harmonic and overtone indexing are distinguished across A, B and exam tasks', () => {
  for (const pool of [aCards, pianoCards]) {
    const card = pool.find(c => zh(c.prompt).startsWith('第 2 分音'));
    assert.match(card.prompt.zh, /基音是第 1 分音/);
  }
  const partial = allB(levelById('B5-3')).find(n => zh(n.prompt).startsWith('基音是 100 Hz'));
  assert.equal(zh(partial.options[partial.answer]), '300 Hz');
  assert.match(partial.prompt.zh, /第 3 分音/);
  const overtone = allB(extLevelById('B5-3x')).find(n => zh(n.prompt).includes('第三泛音是多少'));
  assert.equal(zh(overtone.options[overtone.answer]), '400 Hz');
  EXAM_TASKS.world.slice(0, 4).forEach(n => {
    assert.match(n.prompt.zh, /第 4 分音/);
    assert.match(n.prompt.zh, /基音是第 1 分音/);
  });
});

test('clarification preserves fill slots and does not reinterpret keyboard enharmonics as spelling', () => {
  const keyboard = { type: 'choice', prompt: { zh: '在键盘上 F♯ 和哪个音同音？', ja: '鍵盤上の異名同音は？', en: 'Which note sounds the same on the keyboard?' }, options: ['G♭', 'F♯', 'G', 'A'], answer: 0 };
  assert.strictEqual(clarifyQuestion(keyboard), keyboard);
  const fill = UNITS.find(u => u.id === 'harmonics').cards.find(c => c.type === 'fill');
  for (const lang of ['zh', 'ja', 'en']) assert.equal(fill.prompt[lang].split('___').length - 1, fill.answer.length);
});

test('octatonic explanations distinguish major/minor tonic motion from other fifth-related chords', () => {
  const oct = new Set([0, 1, 3, 4, 6, 7, 9, 10]);
  const contains = (root, shape) => shape.every(i => oct.has((root + i) % 12));
  const roots = [...oct];
  assert.equal(roots.filter(r => contains(r, [0, 3, 6])).length, 8);
  const dim7 = new Set(roots.filter(r => contains(r, [0, 3, 6, 9]))
    .map(r => [0, 3, 6, 9].map(i => (r + i) % 12).sort((a,b) => a-b).join(',')));
  assert.equal(dim7.size, 2);
  // 相距五度的其他和弦确实可以存在：C 大三和弦与 G 减三和弦。
  assert.ok(contains(0, [0, 4, 7]) && contains(7, [0, 3, 6]));
  for (const tonic of roots) for (const shape of [[0, 4, 7], [0, 3, 7]]) {
    assert.equal(contains(tonic, shape) && contains((tonic + 7) % 12, [0, 4, 7]), false);
  }
  const node = allB(extLevelById('B6-2x')).find(n => zh(n.prompt).includes('完整 V–I'));
  assert.match(zh(node.options[node.answer]), /不能同时完整包含/);
});

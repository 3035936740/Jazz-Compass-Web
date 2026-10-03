import test from 'node:test';
import assert from 'node:assert/strict';
import { INTERVALS, CHORDS, makeQuestion, grade, emptyStats } from './ear_training.js';
import { intervalBetween } from './pitch_spelling.js';

const sequence = (values) => { let i = 0; return () => values[i++ % values.length]; };

// ref:omt-intervals 生成的音程与名称一致（三全音拼作增四度）
test('interval questions are spelled as the named interval', () => {
  Object.keys(INTERVALS).forEach((name) => {
    const keys = Object.keys(INTERVALS);
    for (let root = 0; root < 12; root += 1) {
      const question = makeQuestion('interval', [name], sequence([0, root / 12 + 0.01, 0.2]));
      const interval = intervalBetween(question.notes[0], question.notes[1]);
      assert.equal(interval.name, name === 'TT' ? 'A4' : name, `${name} from ${question.notes[0]}`);
      assert.equal(question.midis[1] - question.midis[0], INTERVALS[name][1]);
    }
    assert.ok(keys.includes(name));
  });
});

// ref:omt-triads 和弦各音相对根音的音程
test('chord questions match the OMT interval recipes', () => {
  const recipe = {
    major: ['M3', 'P5'], minor: ['m3', 'P5'], diminished: ['m3', 'd5'], augmented: ['M3', 'A5'],
    maj7: ['M3', 'P5', 'M7'], dom7: ['M3', 'P5', 'm7'], min7: ['m3', 'P5', 'm7'], dim7: ['m3', 'd5', 'd7'], hdim7: ['m3', 'd5', 'm7'],
  };
  Object.keys(CHORDS).forEach((name) => {
    for (let root = 0; root < 12; root += 1) {
      const question = makeQuestion(name.includes('7') ? 'seventh' : 'triad', [name], sequence([0, root / 12 + 0.01, 0.7]));
      const names = question.notes.slice(1).map((note) => intervalBetween(question.notes[0], note).name);
      assert.deepEqual(names, recipe[name], `${name} on ${question.notes[0]}`);
    }
  });
});

test('grading keeps score and streak', () => {
  let stats = emptyStats();
  const q = { answer: 'M3' };
  ({ stats } = grade(stats, q, 'M3'));
  ({ stats } = grade(stats, q, 'M3'));
  const result = grade(stats, q, 'P4');
  assert.equal(result.correct, false);
  assert.deepEqual(result.stats, { total: 3, correct: 2, streak: 0, best: 2 });
});

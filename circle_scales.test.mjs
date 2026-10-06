import test from 'node:test';
import assert from 'node:assert/strict';
import { melodicCircleScale } from './circle_scales.js';
import { spellHeptatonic } from './pitch_spelling.js';
import { relatedLearnTools } from './learn_feature_unit.js';

test('melodic scales distinguish direction and derive the correct diatonic triads', () => {
  const majorDown = melodicCircleScale('major', 'descending');
  assert.deepEqual(spellHeptatonic('C', majorDown.intervals), ['C', 'D', 'E', 'F', 'G', 'Ab', 'Bb']);
  assert.deepEqual(majorDown.degreeNums, ['I', 'ii°', 'iii°', 'iv', 'v', 'VI+', 'VII']);
  assert.deepEqual(melodicCircleScale('major', 'ascending').degreeNums, ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°']);
  const minorUp = melodicCircleScale('minor', 'ascending');
  assert.deepEqual(spellHeptatonic('A', minorUp.intervals), ['A', 'B', 'C', 'D', 'E', 'F#', 'G#']);
  assert.deepEqual(minorUp.degreeNums, ['i', 'ii', 'III+', 'IV', 'V', 'vi°', 'vii°']);
  assert.deepEqual(melodicCircleScale('minor', 'descending').degreeNums, ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII']);
  assert.deepEqual(spellHeptatonic('F#', majorDown.intervals), ['F#', 'G#', 'A#', 'B', 'C#', 'D', 'E']);
});

test('every classical tool list also offers circle without duplicating existing links', () => {
  const tools = [{ feature: 'form' }, { feature: 'classical', q: 'G' }];
  assert.deepEqual(relatedLearnTools(tools), [...tools, { feature: 'circle', q: null }]);
  assert.equal(tools.length, 2);
  assert.equal(relatedLearnTools([...tools, { feature: 'circle', q: 'D' }, { feature: 'circle', q: 'D' }]).filter(t => t.feature === 'circle').length, 1);
  assert.deepEqual(relatedLearnTools([{ feature: 'ear' }]), [{ feature: 'ear' }]);
});

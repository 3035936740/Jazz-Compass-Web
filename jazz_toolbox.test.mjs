import test from 'node:test';
import assert from 'node:assert/strict';
import { JAZZ_CHAPTERS } from './jazz_toolbox_data.js';
import { JAZZ_MODE_CATALOG, jazzScaleMidi, jazzCompatibleModes, jazzInspectMode, jazzModalInterchange, jazzProgression, jazzVoicing, jazzMidiName } from './jazz_toolbox.js';

test('all 17 supplied tutorial chapters and 27 chapter scales are represented', () => {
  assert.deepEqual(JAZZ_CHAPTERS.map(item => item.no), [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19]);
  assert.equal(new Set(JAZZ_CHAPTERS.map(item => item.url)).size, 17);
  assert.equal(JAZZ_MODE_CATALOG.length, 27);
  assert.equal(JAZZ_MODE_CATALOG.filter(mode => mode.familyId === 'major').length, 7);
  assert.equal(JAZZ_MODE_CATALOG.filter(mode => mode.familyId === 'melodicMinor').length, 7);
  assert.equal(JAZZ_MODE_CATALOG.filter(mode => mode.familyId === 'harmonicMinor').length, 7);
});

test('parent-derived modal interval structures have characteristic colors', () => {
  const byId = id => JAZZ_MODE_CATALOG.find(mode => mode.id === id).intervals;
  assert.deepEqual(byId('major-2'), [0, 2, 3, 5, 7, 9, 10]);
  assert.deepEqual(byId('major-4'), [0, 2, 4, 6, 7, 9, 11]);
  assert.deepEqual(byId('melodicMinor-4'), [0, 2, 4, 6, 7, 9, 10]);
  assert.deepEqual(byId('harmonicMinor-5'), [0, 1, 4, 5, 7, 8, 10]);
  assert.notDeepEqual(byId('dominantDiminished'), byId('diminished'));
  assert.deepEqual(jazzScaleMidi('B', JAZZ_MODE_CATALOG.find(mode => mode.id === 'major-1')), [71, 73, 75, 76, 78, 80, 82]);
});

test('CST labels chord tones, tensions and collisions without conflating equal pitch sets', () => {
  const ionian = JAZZ_MODE_CATALOG.find(mode => mode.id === 'major-1');
  const lydian = JAZZ_MODE_CATALOG.find(mode => mode.id === 'major-4');
  const matches = jazzCompatibleModes(['C', 'E', 'G', 'B']);
  assert.ok(matches.some(mode => mode.id === ionian.id));
  assert.ok(matches.some(mode => mode.id === lydian.id));
  const info = jazzInspectMode('C', ionian, ['C', 'E', 'G', 'B']);
  assert.deepEqual(info.chordTones.map(cell => cell.note), ['C', 'E', 'G', 'B']);
  assert.deepEqual(info.cautions.map(cell => cell.note), ['F']);
  assert.equal(jazzInspectMode('C', lydian, ['C', 'E', 'G', 'B']).cautions.length, 0);
  assert.equal(jazzInspectMode('C', lydian).cells.find(cell => cell.interval === 6).note, 'F#');
  assert.equal(jazzInspectMode('C', JAZZ_MODE_CATALOG.find(mode => mode.id === 'major-2')).cells.find(cell => cell.interval === 3).label, '♭3');
  assert.equal(jazzCompatibleModes(['C', 'E', 'G', 'B'], { familyId: 'special' }).some(mode => mode.id === 'harmonicMajor'), true);
  const altered = JAZZ_MODE_CATALOG.find(mode => mode.id === 'altered');
  const superLocrian = JAZZ_MODE_CATALOG.find(mode => mode.id === 'melodicMinor-7');
  assert.deepEqual(altered.intervals, superLocrian.intervals);
  assert.equal(jazzInspectMode('C', altered).cells.find(cell => cell.interval === 3).label, '♯9');
  assert.equal(jazzInspectMode('C', superLocrian).cells.find(cell => cell.interval === 3).label, '♭3');
});

test('ii–V, tritone options, extended dominants and multi-tonic systems are exact', () => {
  assert.deepEqual(jazzProgression('C', 'iiVI').map(item => item.symbol), ['Dm7', 'G7', 'Cmaj7']);
  assert.deepEqual(jazzProgression('C', 'tritone', { flipIi: true, flipV: true, flipI: true }).map(item => item.symbol), ['Abm7', 'Db7', 'Gbmaj7']);
  assert.deepEqual(jazzProgression('C', 'secondarySub', { target: 2, sub: true }).map(item => item.symbol), ['Eb7', 'Dm7', 'G7', 'Cmaj7']);
  assert.deepEqual(jazzProgression('C', 'extendedDominant', { count: 4 }).map(item => item.symbol), ['E7', 'A7', 'D7', 'G7', 'Cmaj7']);
  assert.deepEqual(jazzProgression('C', 'multiTonic', { axes: 3 }).filter(item => item.role.startsWith('I')).map(item => item.symbol), ['Cmaj7', 'Emaj7', 'Abmaj7']);
  assert.deepEqual(jazzProgression('C', 'sideStep', { direction: 1 }).map(item => item.symbol), ['Ebm7', 'Ab7', 'Dm7', 'G7', 'Cmaj7']);
});

test('guide tones and drop voicings preserve exact MIDI registers', () => {
  assert.deepEqual(jazzVoicing(['C', 'E', 'G', 'B'], 'shell'), [48, 52, 59]);
  assert.deepEqual(jazzVoicing(['C', 'E', 'G', 'B'], 'drop2'), [43, 48, 52, 59]);
  assert.deepEqual(jazzVoicing(['C', 'E', 'G', 'B'], 'drop3'), [40, 48, 55, 59]);
  assert.deepEqual(jazzVoicing(['C', 'D', 'E', 'G', 'B'], 'close'), [48, 52, 55, 59]);
  assert.deepEqual(jazzVoicing(['D', 'F', 'A', 'C'], 'soWhat').map(midi => jazzMidiName(midi)), ['D3', 'E3', 'A3', 'D4', 'G4', 'B4']);
});

test('same-tonic modal borrowing keeps diatonic chord quality and marks donor colors', () => {
  const borrowed = jazzModalInterchange('C', 'major-6');
  assert.deepEqual(borrowed.changedDegrees.filter(degree => degree.changed).map(degree => degree.pitch), ['Eb', 'Ab', 'Bb']);
  assert.deepEqual(borrowed.chords.map(chord => chord.symbol), ['Cm7', 'Dm7b5', 'Ebmaj7', 'Fm7', 'Gm7', 'Abmaj7', 'Bb7']);
  assert.equal(jazzModalInterchange('C', 'major-1').chords[0].borrowed, false);
});

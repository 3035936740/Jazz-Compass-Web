import test from 'node:test';
import assert from 'node:assert/strict';
import {EnhancedChordConverter} from './jazz_compass.js';
import {parsedAccompaniment} from './accompaniment_voicing.js';
import {scorePitch,scoreTrack} from './composition_score.js';
import {buildComposition} from './composition.js';
const conv=new EnhancedChordConverter();
test('slash bass is physically lowest including non-chord bass and seventh inversions',()=>{
  for(const [symbol,bass] of [['C',0],['C/G',7],['C/E',4],['C7/Bb',10],['D7/F#',6],['C/D',2]]) {
    const result=parsedAccompaniment(conv,symbol);
    assert.equal(result.midi[0]%12,bass,symbol);
    assert.ok(result.midi.slice(1).every(n=>n>result.midi[0]));
    assert.ok(result.pitches.every(pc=>result.midi.some(n=>n%12===pc)));
  }
  assert.deepEqual(parsedAccompaniment(conv,'C').midi,[36,55,60,64]);
  assert.deepEqual(parsedAccompaniment(conv,'C/G').midi,[43,55,60,64]);
});
test('adjacent voicings keep independent upper voices instead of resetting root stacks',()=>{
  let previous=null;
  for(const symbol of ['C7','F7','C7','G7','C7']) {
    const current=parsedAccompaniment(conv,symbol,previous).midi;
    if(previous) assert.ok(current.slice(1).every((n,i)=>Math.abs(n-previous[i+1])<=5),symbol);
    previous=current;
  }
});
test('score contains rests and durations covering each complete bar on all three staves',()=>{
  for(const meter of ['3/4','4/4']) for(const bass of ['parallel','alternating']) {
    const m=buildComposition({meter,bass,form:'single'});
    for(const bar of m.bars) for(const track of ['melody','harmony','bass']) {
      const groups=scoreTrack(m.events,bar.number-1,track,m.beats);
      assert.equal(groups.reduce((n,g)=>n+g.duration,0),m.beats);
    }
  }
  assert.equal(scorePitch(66,'G').name,'F#4');
  assert.equal(scorePitch(63,'C','minor').name,'Eb4');
  assert.equal(scorePitch(36).step,14);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {ClassicalHarmonyConnector} from './jazz_compass.js';
import {solveVoicings,transitionIssues,voicingCandidates} from './classical_voicing.js';
const c=new ClassicalHarmonyConnector();
test('transposed inversions preserve the required bass and four independent voices',()=>{
  for(const key of ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B']) {
    const p=c.getPalette(key,'major');
    for(const symbol of ['T','T₆','T₆₄','D','D₆','D₇','D₅₆','D₃₄','D₂','K₆₄']) {
      const e=p.find(x=>x.symbol===symbol);
      assert.equal(e.midiVoicing.length,4,`${key} ${symbol}`);
      for(const v of voicingCandidates(e)) {
        assert.equal(v[0]%12,e.bassPc);
        assert.deepEqual([...new Set(v.map(n=>n%12))].sort(),[...e.pitchClasses].sort());
        for(const [pc,count] of Object.entries(e.maxCounts)) assert.ok(v.filter(n=>n%12===+pc).length<=count);
      }
    }
  }
});
test('global progression resolves K64 and dominant seventh inversions without parallel perfect intervals',()=>{
  for(const key of ['C','F','G','Db']) {
    const p=c.getPalette(key,'major');
    for(const names of [['T','S','K₆₄','D','T'],['T','T₆','S','D₇','T不完全'],['D₂','T₆'],['D₅₆','T']]) {
      const entries=names.map(n=>p.find(e=>e.symbol===n)), result=solveVoicings(entries);
      assert.equal(result.ok,true,`${key} ${names} ${result.reason}`);
      result.voices.slice(1).forEach((v,i)=>assert.deepEqual(transitionIssues(result.voices[i],v,entries[i],entries[i+1]),[]));
      if(names[0]==='D₂') assert.ok([1,2].includes(result.voices[0][0]-result.voices[1][0]));
    }
  }
});
test('illegal parallel motion and unresolved seventh are rejected',()=>{
  assert.ok(transitionIssues([48,55,64,72],[50,57,66,74]).includes('连续五度'));
  assert.ok(transitionIssues([43,59,62,65],[48,60,64,67],{seventhPc:5}).includes('七音未下行级进解决'));
  assert.ok(transitionIssues([43,55,60,64],[45,57,59,62],{symbol:'K₆₄',tonicPc:0}).includes('终止四六低音未保持'));
});
test('natural minor retains functional dominant leading tone',()=>{
  const p=c.getPalette('C','minor'),d=p.find(e=>e.symbol==='D');
  assert.ok(d.pitchClasses.includes(11));assert.ok(!d.pitchClasses.includes(10));
  assert.equal(p.find(e=>e.symbol==='D₂').figuredBass,'4/2');
});
test('modulation routes support minor targets and same-tonic mode changes',()=>{
  const toMinor=c.suggestModulations('D','Eb','all-generic','E','minor',6);
  assert.ok(toMinor.length>0);
  assert.ok(toMinor.every(route=>route.targetMode==='minor'));
  assert.ok(toMinor.every(route=>route.targetSymbols.at(-1)==='t'));
  assert.ok(toMinor.every(route=>route.voiceLeadingOk));
  const parallelMinor=c.suggestModulations('T','C','major','C','minor',6);
  assert.ok(parallelMinor.length>0);
  assert.ok(parallelMinor.every(route=>route.targetSymbols.at(-1)==='t'));
});
test('all six concrete target modes produce voice-led modulation routes',()=>{
  const modes=['major','harmonic-major','melodic-major','minor','harmonic-minor','melodic-minor'];
  for(const targetMode of modes){
    const routes=c.suggestModulations('D','Eb','all-generic','E',targetMode,6);
    assert.ok(routes.length>0,targetMode);
    assert.ok(routes.every(route=>route.targetMode===targetMode));
    assert.ok(routes.every(route=>route.targetSymbols.at(-1)===(targetMode.includes('minor')?'t':'T')));
  }
});
test('unconnectable sequence reports failure instead of silently playing root stacks',()=>{
  const result=solveVoicings([{pitchClasses:[0],bassPc:0,maxCounts:{0:1},symbol:'invalid'}]);
  assert.equal(result.ok,false);
});

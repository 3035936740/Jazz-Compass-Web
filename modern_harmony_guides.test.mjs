import test from 'node:test';
import assert from 'node:assert/strict';
import { TOPICS, stageGuide } from './modern_harmony_course.js';
import { guideDemoEvents, createGuidePlayback } from './learn_guide_audio.js';
import { DEFAULTS, chordSymbolNotes, polytonalityModel } from './modern_harmony_tools.js';
const hz = n => 440*2**((n-69)/12);
const approx = (a,b) => assert.ok(Math.abs(a-b)<1e-8);

test('all 25 redesigned guides explain one step at a time, with localized diagrams and scene-specific audio',()=>{
  let count=0;
  for(const topic of TOPICS) for(const [index,stage] of topic.stages.entries()) {
    const card=stageGuide(topic,index);count++;
    assert.ok(card.beginner);assert.ok(card.steps.length >= (index===0?4:3));
    assert.equal(card.steps.length,stage.labels.length);assert.equal(card.steps.length,card.stepDemos.length);
    for(const [i,text] of stage.steps.entries()) {
      for(const lang of ['zh','ja','en']) {
        assert.ok(text[lang]);assert.ok(stage.labels[i][lang]);assert.ok(stage.sounds[i].caption[lang]);
        if(lang!=='en')assert.doesNotMatch(stage.labels[i][lang],/same shape|pedal|low:|high:|overlap|centres|partial|cents|error|reference|reverse|shared:/i);
      }
      const events=guideDemoEvents(stage.sounds[i]);assert.ok(events.length);
      for(const event of events) {
        assert.ok(event.targets.length);
        for(const target of event.targets) assert.ok(/^c\d+-0$/.test(target)&&Number(target.match(/\d+/)[0])<=i,'only already taught scenes appear');
        for(const lang of ['zh','ja','en'])assert.ok(event.caption[lang]);
      }
    }
  }
  assert.equal(count,25);
});

test('nonfunctional introduction actually separates cadence, exact planing and a fixed pedal',()=>{
  const sounds=TOPICS[0].stages[0].sounds;
  assert.deepEqual(sounds[2].events.map(e=>e.notes),[[60,64,67],[62,66,69],[64,68,71]]);
  assert.ok(sounds[2].events.every(e=>!e.notes.includes(48)));
  assert.ok(sounds[3].events.every(e=>e.notes.includes(48)));
  assert.deepEqual([...new Set(sounds[4].events.flatMap(e=>e.targets))],['c0-0','c2-0','c3-0']);
});

test('polytonality first teaches isolated lines, then real simultaneous layers, then all comparisons',()=>{
  const sounds=TOPICS[1].stages[0].sounds;
  assert.ok(sounds[0].events.every(e=>e.notes[0]<60));
  assert.ok(sounds[1].events.every(e=>e.notes[0]>72));
  assert.equal(sounds[2].events.filter(e=>e.at===0).length,2);
  assert.deepEqual([...new Set(sounds[3].events.flatMap(e=>e.targets))],['c0-0','c1-0','c2-0']);
  const shared=TOPICS[4].stages[3].sounds;
  approx(hz(shared[1].events[0].notes[1]),275);
  approx(hz(shared[2].events[0].notes[1]),250);
});

test('scene markers switch during comparisons, preserve overlapping layers, and clear when cancelled',()=>{
  let id=0,now=0;const timers=new Map(),frames=[];
  const clock={setTimer(fn,delay){timers.set(++id,{fn,at:now+delay});return id;},clearTimer(k){timers.delete(k);}};
  const tick=ms=>{const end=now+ms;while(true){const next=[...timers].filter(([,v])=>v.at<=end).sort((a,b)=>a[1].at-b[1].at||a[0]-b[0])[0];if(!next)break;now=next[1].at;timers.delete(next[0]);next[1].fn();}now=end;};
  const player=createGuidePlayback({...clock,playChord(){},stopAudio(){},onTargetsChange:(targets,info)=>frames.push({targets,...info})});
  player.setDemo({bpm:60,events:[{at:0,notes:[48],beats:2,targets:['c0-0'],caption:{zh:'低层',ja:'低層',en:'Low'}},{at:.5,notes:[78],beats:.5,targets:['c1-0'],caption:{zh:'高层',ja:'高層',en:'High'}},{at:3,notes:[60],beats:1,targets:['c2-0']}]});
  player.play();tick(0);assert.deepEqual(frames.at(-1).targets,['c0-0']);
  tick(500);assert.deepEqual(frames.at(-1).targets,['c0-0','c1-0']);
  tick(470);assert.deepEqual(frames.at(-1).targets,['c0-0']);
  player.stop();tick(5000);assert.deepEqual(frames.at(-1).targets,[]);assert.equal(frames.at(-1).playing,false);assert.equal(timers.size,0);
});

test('free composition accepts chord symbols and arbitrary registered polytonal melodies without flattening timing',()=>{
  const notes=chordSymbolNotes('Cmaj7/E');assert.equal(Math.min(...notes)%12,4);assert.deepEqual([...new Set(notes.map(n=>n%12))].sort((a,b)=>a-b),[0,4,7,11]);
  assert.throws(()=>chordSymbolNotes('not a chord'));assert.throws(()=>chordSymbolNotes('Calt'));
  const model=polytonalityModel({...DEFAULTS.polytonality,patternA:'C3:2 Eb3:1 r:1 F#3:1',patternB:'D5:1 Bb5:2 A4:1',repeats:1});
  assert.deepEqual(model.a.rows.map(r=>r.midi),[48,51,null,54]);
  assert.deepEqual(model.b.rows.map(r=>r.midi),[74,82,69]);
  assert.deepEqual(model.a.rows.map(r=>r.at),[0,2,3,4]);assert.equal(model.a.length,5);
});

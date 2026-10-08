import test from 'node:test';
import assert from 'node:assert/strict';
import {lessonAudioEvents,createLessonPlayback} from './lesson_audio.js';
import {GENERATORS,expandCards} from './learn_generators.js';
import {UNITS,SIDES} from './learn_content.js';
import {B_LEVELS,extLevelById,isPlayable} from './sideb_content.js';
import {levelForAttempt} from './sideb_engine.js';
const rng=seed=>()=>{seed=(1664525*seed+1013904223)>>>0;return seed/2**32;};
test('planing auditions the stated source pitches rather than supplying the shifted answer',()=>{
 for(let seed=1;seed<=80;seed++)for(const stage of [0,1]){
  const card=GENERATORS.modernPlaning.make(rng(seed),{stage});
  const pitches=card.prompt.en.match(/[A-G][♯♭#b]?\d/g),midi=n=>{const m=n.match(/^([A-G])([♯♭]?)+(\d)$/)||n.match(/^([A-G])()(\d)$/);return (Number(m[3])+1)*12+{C:0,D:2,E:4,F:5,G:7,A:9,B:11}[m[1]]+(m[2]==='♯'?1:m[2]==='♭'?-1:0);};
  assert.deepEqual(card.audio.notes,pitches.map(midi));
  assert.deepEqual(lessonAudioEvents(card.audio).map(e=>e.notes),[...card.audio.notes.map(n=>[n]),card.audio.notes]);
 }
});
test('one timeline retains all notes, simultaneous layers, leading rests, velocities and the chord after a rhythmic melody',()=>{
 const audio={notes:[60,null,64,67],mode:'melody',beats:[1,2,.5,1],bpm:120,chord:[60,64,67]};
 const events=lessonAudioEvents(audio);assert.deepEqual(events.map(e=>e.at),[0,1500,1750,2370]);assert.deepEqual(events.map(e=>e.notes),[[60],[64],[67],[60,64,67]]);
 assert.deepEqual(lessonAudioEvents({notes:[60,64,67],mode:'harmonic'}).map(e=>e.notes),[[60,64,67]]);
 assert.deepEqual(lessonAudioEvents({notes:[[60,64,67],[62,65,69]],mode:'chords'}).map(e=>e.notes),[[60,64,67],[62,65,69]]);
 assert.deepEqual(lessonAudioEvents({notes:[[60,64,67],[62,65,69]],mode:'sequence'}).map(e=>e.notes),[[60,64,67],[62,65,69]]);
 const layers={bpm:120,events:[{at:1,notes:[74.5],beats:2,velocity:.7},{at:0,notes:[48,52,55],beats:2},{at:0,notes:[72,76,79],beats:1}]};
 assert.deepEqual(lessonAudioEvents(layers).map(e=>[e.at,e.notes]),[[0,[48,52,55]],[0,[72,76,79]],[500,[74.5]]]);assert.equal(lessonAudioEvents(layers)[2].velocity,.7);
 assert.deepEqual(lessonAudioEvents({rhythm:{bpm:120,cycle:2,repeats:2,tracks:[{beats:[0,1],midis:[60,62]},{beats:[0],midi:48}]}}).map(e=>e.notes),[[60],[48],[62],[60],[48],[62]]);
});
test('playback unlocks immediately, cancels previous callbacks on replay/stop, and does not cut simultaneous voices',()=>{
 let next=0;const timers=new Map(),calls=[],player=createLessonPlayback({playChord:(...args)=>calls.push(args),setTimer:(fn,ms)=>{timers.set(++next,{fn,ms});return next;},clearTimer:id=>timers.delete(id)});
 const audio={bpm:120,events:[{at:0,notes:[60,64,67],beats:2},{at:0,notes:[72,76,79],beats:2},{at:1,notes:[62],beats:1}]};
 player.play(audio);assert.equal(calls.length,1);const stale=[...timers.values()];
 player.play(audio);const newTasks=[...timers.values()];stale.forEach(t=>t.fn());assert.equal(calls.length,2,'cancelled tasks stay silent even if called');
 newTasks.filter(t=>t.ms===0).forEach(t=>t.fn());assert.equal(calls.length,3);assert.equal(calls[2][2].interrupt,false);
 player.stop();newTasks.forEach(t=>t.fn());assert.equal(calls.length,3);assert.equal(timers.size,0);
 player.play({notes:[null,60],beats:[1,1],bpm:120,mode:'melody'});assert.deepEqual(calls.at(-1)[0],[],'leading rest still unlocks audio in the click gesture');
});
test('all registered A/B question audio and generated variants are supported without dropping a voiced pitch',()=>{
 let count=0;
 const check=(audio,path)=>{
  let events;try{events=lessonAudioEvents(audio);}catch(error){throw Error(path+' '+JSON.stringify(audio)+' '+error.message);}assert.ok(events.length,path+' audible');
  const expected=audio.events?audio.events.flatMap(e=>e.notes):audio.chords?audio.chords.flat():audio.rhythm?null:[...audio.notes.flat(),...(audio.chord||[])];
  if(expected)assert.deepEqual(events.flatMap(e=>e.notes).sort((a,b)=>a-b),expected.filter(n=>n!==null).sort((a,b)=>a-b),path+' voices');
  count++;
 };
 const scan=(node,path)=>{if(!node||typeof node!=='object')return;if(node.audio)check(node.audio,path);for(const [key,value]of Object.entries(node))if(key!=='audio'&&value&&typeof value==='object')scan(value,path+'/'+key);};
 for(const [id,gen]of Object.entries(GENERATORS))for(let seed=1;seed<=12;seed++)scan(gen.make(rng(seed)),id+'/'+seed);
 for(const unit of [...UNITS,...SIDES])for(const block of [unit,...unit.branch])scan(expandCards(block.cards,rng(25)),unit.id);
 for(const level of B_LEVELS.filter(isPlayable))for(const lv of [level,extLevelById(level.id+'x')].filter(Boolean))for(let attempt=0;attempt<4;attempt++)scan(levelForAttempt(lv,attempt).sections,lv.id+'/'+attempt);
 assert.ok(count>500,'audited '+count+' audio instances');
});

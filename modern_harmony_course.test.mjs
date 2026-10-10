import test from 'node:test';
import assert from 'node:assert/strict';
import { UNITS, SIDES } from './learn_content.js';
import { B_LEVELS, chapterLevels, levelById, extLevelById, examById } from './sideb_content.js';
import { bKey, extKey, gradeNode, validateLevel, levelForAttempt, chapterExOpen, completeBLevel } from './sideb_engine.js';
import { GENERATORS, expandCards } from './learn_generators.js';
import { TOPICS, A_MODERN_ORDER, B_MODERN_ORDER, cents, generatorOf } from './modern_harmony_course.js';
import { guideDemoEvents, createGuidePlayback } from './learn_guide_audio.js';
import { toyModel } from './sideb_modern_harmony_toys.js';
import { playAudio } from './sideb_toys.js';
const close = (a,b,eps=1e-8) => assert.ok(Math.abs(a-b)<eps, `${a} ≠ ${b}`);
const hz = n => 440*2**((n-69)/12);
function rng(seed) { return () => {seed=(1664525*seed+1013904223)>>>0; return seed/2**32;}; }

test('chapter 6 has a progressive route and preserves all old save identities', () => {
  assert.deepEqual(UNITS.filter(u=>u.section==='modern').map(u=>u.id), A_MODERN_ORDER);
  assert.deepEqual(chapterLevels('modern').map(l=>l.id), B_MODERN_ORDER);
  B_MODERN_ORDER.forEach((id,i)=>assert.equal(levelById(id).code,`B6-${i+1}`));
  ['B6-1','B6-2','B6-3','B6-4','B6-5'].forEach(id=>{
    assert.equal(bKey(id),`b:${id}`); assert.equal(extKey(id),`bx:${id}`);
    assert.equal(extLevelById(`${id}x`).code,levelById(id).code);
    const saved={units:{[bKey(id)]:{done:true,best:.85,grade:'A'}}};
    const p=completeBLevel(saved,TOPICS[0].b,{passed:true,score:.6,grade:'C'});
    assert.deepEqual(p.units[bKey(id)],saved.units[bKey(id)]);
  });
});

test('each new A topic has four branches and B extensions teach and assess all four', () => {
  for(const topic of TOPICS) {
    const a=[...UNITS,...SIDES].find(u=>u.id===topic.id),b=levelById(topic.b),x=extLevelById(`${topic.b}x`);
    assert.equal(a.branch.length,4);
    // 每个进阶关：生成题 4 道 + 背景与概念题（modern_harmony_concepts.js）
    a.branch.forEach(branch=>{const qs=expandCards(branch.cards,rng(17)).filter(c=>c.type!=='guide');assert.ok(qs.length>=6,`${topic.id}: ${qs.length}`);assert.ok(branch.cards.filter(c=>c.type==='choice').length>=2);});
    assert.deepEqual(x.coveredBranches,a.branch.map(branch=>branch.title));
    assert.deepEqual(x.sections.explain.filter(n=>n.type==='guide').map(n=>n.title),x.coveredBranches);
    assert.deepEqual(x.sections.challenge.filter(n=>n.type==='gen').map(n=>n.params.stage),[1,2,3,4]);
    assert.deepEqual(x.sections.challenge.filter(n=>n.sceneStage).map(n=>n.sceneStage),[1,2,3,4]);
    assert.deepEqual(validateLevel(b),[]);assert.deepEqual(validateLevel(x),[]);
    for(let attempt=0;attempt<8;attempt++)for(const level of [b,x]){
      const actual=levelForAttempt(level,attempt);
      actual.sections.challenge.forEach(n=>{
        const response=n.steps?n.steps.map(s=>s.answer):n.slots?n.slots.map(s=>s.answer):n.answer;
        assert.equal(gradeNode(n,response).ok,true,`${n.id} correct`);
        if(n.steps){assert.equal(gradeNode(n,n.steps.map(()=>'' )).score,0);assert.equal(gradeNode(n,n.steps.map(()=>Infinity)).score,0);}
      });
    }
  }
});

test('all new generator stages have distinct multilingual options across 100 seeds', () => {
  for(const topic of TOPICS)for(let stage=0;stage<=4;stage++)for(let seed=1;seed<=100;seed++) {
    const q=GENERATORS[generatorOf(topic)].make(rng(seed*0x9e3779b1),{stage});
    for(const lang of ['zh','ja','en']){
      const labels=q.options.map(o=>typeof o==='string'?o:o[lang]);
      assert.equal(new Set(labels).size,labels.length,`${topic.id}/${stage}/${seed}/${lang}`);
      assert.ok(q.prompt[lang]&&q.hint[lang]&&q.explain[lang]);
    }
    assert.equal(gradeNode(q,q.answer).ok,true);
  }
});

test('frequency examples retain exact ratios and tuning errors instead of rounding to piano keys', () => {
  const ji=toyModel('microtonalharmony','ji',220).audio.events[0].notes.map(hz);
  ji.forEach((n,i)=>close(n,[220,275,330][i]));
  const edo=toyModel('microtonalharmony','19',220).audio.events[0].notes.map(hz);
  close(edo[1],220*2**(6/19));close(cents(edo[1]/220)-cents(5/4),-7.366345443,.000001);
  const spectral=toyModel('spectralharmony','harmonic',110).audio.events[0].notes.map(hz);
  spectral.forEach((n,i)=>close(n,[440,550,660][i]));
  const seventh=toyModel('spectralharmony','seventh',220).audio.events[0].notes.map(hz);close(seventh[1],385);
  const offset=toyModel('spectralharmony','offset',100).audio.events[0].notes.map(hz);close(offset[2],305);
  const reversed=toyModel('atonality','reverse',4).audio.events.map(e=>e.notes[0]);assert.deepEqual(reversed,[67,61,60]);
});

test('every A guide has step-specific playback and cancels the old sequence on step changes', () => {
  for(const topic of TOPICS) {
    const unit=[...UNITS,...SIDES].find(u=>u.id===topic.id);
    for(const cards of [unit.cards,...unit.branch.map(b=>b.cards)]){
      const g=cards.find(c=>c.type==='guide');assert.equal(g.steps.length,g.stepDemos.length);
      assert.notDeepEqual(g.stepDemos[0],g.stepDemos[1]);
      g.stepDemos.forEach(d=>guideDemoEvents(d).forEach(e=>{assert.ok(e.duration>0);e.notes.forEach(n=>assert.ok(n>=0&&n<128));}));
    }
  }
  const calls=[],timers=new Map();let id=0,stops=0;
  const playback=createGuidePlayback({playChord:(...args)=>calls.push(args),stopAudio:()=>stops++,setTimer:(fn,ms)=>{timers.set(++id,{fn,ms});return id;},clearTimer:id=>timers.delete(id)});
  const stages=TOPICS[1].stages[0].sounds;
  playback.setDemo(stages[0]);playback.play();const oldIds=[...timers.keys()];
  playback.setDemo(stages[2]);assert.ok(oldIds.every(k=>!timers.has(k)));assert.ok(stops>=2);
  [...timers.values()].filter(x=>x.ms===0).forEach(x=>x.fn());
  assert.equal(calls.length,2,'both layers enter at beat 0');assert.equal(calls[0][2].interrupt,true);assert.equal(calls[1][2].interrupt,false);
  playback.stop();assert.equal(timers.size,0);
});

test('B event playback schedules simultaneous layers and cancels pending notes', () => {
  const originalSet=globalThis.setTimeout,originalClear=globalThis.clearTimeout;
  const timers=new Map(),calls=[];let id=0;
  globalThis.setTimeout=(fn,ms)=>{timers.set(++id,{fn,ms});return id;};globalThis.clearTimeout=k=>timers.delete(k);
  try{
    const audio=toyModel('polytonality','both',2).audio;
    const stop=playAudio(audio,(...args)=>calls.push(args));
    [...timers.values()].filter(x=>x.ms===0).forEach(x=>x.fn());
    assert.equal(calls.length,2);close(calls[0][0][0],hz(48));close(calls[1][0][0],hz(74));
    assert.equal(calls[0][2].interrupt,true);assert.equal(calls[1][2].interrupt,false);
    stop();assert.equal(timers.size,0);
  }finally{globalThis.setTimeout=originalSet;globalThis.clearTimeout=originalClear;}
});

test('new pools enter chapter and final exams while EX still requires every extension clear', () => {
  const origins=new Set();
  for(let attempt=0;attempt<20;attempt++){
    const exam=levelForAttempt(examById('TX-modern'),attempt);
    assert.equal(exam.sections.challenge.length,16);
    exam.sections.challenge.forEach(n=>TOPICS.forEach(t=>{if(n.id.includes(`.${t.b}-x-`))origins.add(t.b);}));
  }
  TOPICS.forEach(t=>assert.ok(origins.has(t.b),t.b));
  for(const examId of ['FIN','FINX'])assert.equal(levelForAttempt(examById(examId),2).sections.challenge.length,16);
  const levels=chapterLevels('modern'),units=Object.fromEntries(levels.flatMap(l=>[[bKey(l.id),{done:true,best:1}],[extKey(l.id),{done:true,best:1}]]));
  units['final-ex']={done:true,best:1};
  assert.equal(chapterExOpen(levels,{units},()=>true),true);delete units[extKey(TOPICS[0].b)];assert.equal(chapterExOpen(levels,{units},()=>true),false);
});


test('duplicated introductions become A side quests without blocking the normal chapter or losing saved slots', async () => {
  const {buildChapterCards,isSideLevelUnlocked,unitLevelKeys,setLevelStars,emptyProgress,chapterUnlocked} = await import('./learn_engine.js');
  const parents={atonality:'pitchclass',spectralharmony:'micro',microtonalharmony:'microharmony'};
  const modern=UNITS.filter(u=>u.section==='modern'),sides=SIDES.filter(s=>Object.hasOwn(parents,s.id));
  assert.equal(sides.length,3);
  for(const side of sides){
    assert.ok(!modern.some(u=>u.id===side.id)); assert.equal(side.parent,parents[side.id]);
    assert.equal(side.branch.length,4); assert.equal(unitLevelKeys(side.id).length,6);
    let progress=emptyProgress(); assert.equal(isSideLevelUnlocked(side,0,progress),false);
    progress=setLevelStars(progress,[...unitLevelKeys(side.parent),...side.prerequisites],2);
    assert.equal(isSideLevelUnlocked(side,0,progress),true);
    const saved=setLevelStars(emptyProgress(),[side.id,side.id+':1'],3);
    assert.equal(isSideLevelUnlocked(side,0,saved),true); assert.equal(isSideLevelUnlocked(side,1,saved),true);
  }
  const p=setLevelStars(emptyProgress(),modern.map(u=>u.id),2);
  assert.equal(chapterUnlocked(modern,p),true);
  const sideGenerators=new Set(sides.map(s=>s.cards.find(c=>c.type==='gen').gen));
  for(let i=0;i<12;i++) for(const card of buildChapterCards(modern,{sides})) assert.ok(!sideGenerators.has(card.gen),'ordinary chapter excludes side quests');
  for(const [id,stage] of [['B6-8',4],['B6-9',4],['B6-10',3]]){
    const b=levelById(id);assert.ok(b.sections.challenge.filter(n=>n.type==='gen').every(n=>n.params.stage===stage));
    assert.equal(b.sections.explain.filter(n=>n.type==='guide').at(-1).title.zh,TOPICS.find(t=>t.b===id).stages[stage].title.zh);
  }
});

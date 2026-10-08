import test from 'node:test';
import assert from 'node:assert/strict';
import {modernGoalMet,DEFAULTS} from './sideb_modern_harmony_goals.js';
import {MODERN_MISSIONS,modernBScene} from './sideb_modern_harmony_scenes.js';
import {TOPICS} from './modern_harmony_course.js';
import {gradeNode,gradeSpelling} from './sideb_engine.js';
import {SKILLS} from './sideb_errors.js';
const cases={
 nonfunctional:{first:{},second:{pedal:'C3'},actions:['sequence','sequence'],bad:{shifts:'0 0 0'}},
 polytonality:{first:{},second:{patternB:'1:1 3:1 r:1 5:1 1:1'},actions:['together','together'],bad:{rootB:'C3'}},
 atonality:{first:{transform:'R',transpose:0},second:{transform:'I'},actions:['transformed','transformed'],bad:{transform:'T'}},
 spectralharmony:{first:{},second:{partials:'4:1:0 5:0.8:25 6:0.7:0',morph:100},actions:['spectrum','spectrum'],bad:{partials:'4:1:0 5:0:0'}},
 microtonalharmony:{first:{edo:19},second:{rootRatio:'5/4',ratiosB:'1/1 6/5 8/5'},actions:['compareA','just'],bad:{edo:12}},
};
test('all five studios require relevant audition and two valid distinct designs; edits alone do not award completion',()=>{
 for(const [topic,c]of Object.entries(cases)){
  const first={...DEFAULTS[topic],...c.first},second={...first,...c.second};
  assert.equal(modernGoalMet(topic,0,first,null,c.actions[0]),true,topic+' first');
  assert.equal(modernGoalMet(topic,1,second,first,c.actions[1]),true,topic+' second');
  assert.equal(modernGoalMet(topic,0,first,null,'card'),false,topic+' wrong playback');
  assert.equal(modernGoalMet(topic,0,first,null),false,topic+' no audition');
  assert.equal(modernGoalMet(topic,0,{...first,...c.bad},null,c.actions[0]),false,topic+' invalid brief');
  assert.equal(modernGoalMet(topic,1,first,first,c.actions[1]),false,topic+' unchanged');
  for(const lang of ['zh','ja','en'])assert.ok(MODERN_MISSIONS[topic][lang]);
 }
});
test('scene tasks cover listening, repairs and analysis; blanks and partial work grade correctly across all variants',()=>{
 const types=new Set();
 for(const topic of TOPICS)for(let stage=1;stage<=4;stage++)for(let variant=0;variant<4;variant++){
  const n=modernBScene(topic,stage,variant);types.add(n.type);
  const correct=n.steps?n.steps.map(s=>s.answer):n.slots?n.slots.map(s=>s.answer):n.answer;
  assert.equal(gradeNode(n,correct).ok,true,topic.id+'/'+stage+'/'+variant);
  if(['spell','derive','analyze'].includes(n.type)){
   assert.equal(gradeNode(n,[]).ok,false);
   assert.equal(gradeNode(n,correct.map(()=>'' )).score,0);
   const partial=[...correct];partial[0]='';assert.ok(gradeNode(n,partial).score>0&&gradeNode(n,partial).score<1);
  }
  n.skills.forEach(s=>assert.ok(SKILLS.includes(s),s));
  for(const lang of ['zh','ja','en'])assert.ok(n.prompt[lang]&&n.explain[lang]);
 }
 assert.deepEqual([...types].sort(),['analyze','choice','derive','listen','spell']);
});
test('atonal pitch completion accepts enharmonic pitches but still checks octave; tonal spelling stays strict',()=>{
 const topic=TOPICS.find(t=>t.id==='atonality'),n=modernBScene(topic,2,0);
 const flat=[...n.answer];flat[1]='Eb4';
 assert.equal(gradeNode(n,flat).ok,true);
 flat[1]='Eb5';assert.equal(gradeNode(n,flat).ok,false);
 flat[1]='Eb';assert.equal(gradeNode(n,flat).ok,false);
 assert.equal(gradeSpelling('D#4','Eb4').ok,false);
});

test('a rest outside the other sounding layer does not solve the continuation brief',()=>{
 const state={...DEFAULTS.polytonality,patternA:'1:1',patternB:'1:1 r:1',repeats:1};
 assert.equal(modernGoalMet('polytonality',0,state,null,'together'),true);
 assert.equal(modernGoalMet('polytonality',1,state,DEFAULTS.polytonality,'together'),false);
});

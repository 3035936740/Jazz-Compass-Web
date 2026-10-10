import { SCENARIOS, FINAL, CANNON, initialGuard, cloneScore, t } from './scenarios.js';
import { evaluateMusic, evaluateGuard } from './music-evaluation.js';
export const BattleState = Object.freeze({INTRO:'intro',PLANNING:'planning',RESOLVING:'resolving',RESULT:'result',VICTORY:'victory',DEFEAT:'defeat'});
export const PlayerAction = Object.freeze({ARRANGE:'arrange',GUARD:'guard',HOLD:'hold'});
export class BossIntent {
 constructor(){this.charge=1;this.fired=false;}
 predict(evaluation){if(evaluation.predicted&&!this.fired)this.charge=Math.min(3,this.charge+1);}
 get armed(){return this.charge===3&&!this.fired;}
 fire(){this.fired=true;this.charge=0;}
}
export class Battle {
 constructor(){this.status=BattleState.INTRO;this.intent=new BossIntent();this.hp=100;this.conviction=100;this.round=0;this.defense=false;this.final=false;this.breakOccurred=false;this.errors=0;this.log=[];this.lastArrangement=null;this.pendingRound=null;this.guardReady=false;this.guardStored=null;this.guarded=false;this.openRound();this.status=BattleState.INTRO;}
 get scenario(){if(this.defense)return CANNON;if(this.final)return FINAL;const s=SCENARIOS[this.round];if(s.carry&&this.lastArrangement)return {...s,previous:cloneScore(this.lastArrangement),history:[{symbol:'C / your arrangement',bass:this.lastArrangement.bass,notes:this.lastArrangement.voices.map(v=>v.midi),melody:81}]};return s;}
 get canEdit(){return this.status===BattleState.PLANNING;}
 start(){this.status=BattleState.PLANNING;}
 openRound(){this.command=this.defense?'guard':'analyze';this.action=this.defense?PlayerAction.GUARD:null;this.draft=cloneScore(this.scenario.previous??SCENARIOS[0].previous);this.guardPaths=this.guardReady&&this.guardStored?structuredClone(this.guardStored):initialGuard();this.previewsLeft=1;this.contextListened=false;this.result=null;this.status=BattleState.PLANNING;}
 choose(command){if(!this.canEdit)return false;this.command=command;this.action=command==='analyze'?null:command;if(this.defense&&['arrange','hold'].includes(command)){this.action=null;}return true;}
 preview(){if(!this.canEdit||!this.previewsLeft||!this.action)return false;this.previewsLeft--;return true;}
 commit(){
  if(!this.canEdit||!this.action)return null;
  this.status=BattleState.RESOLVING;
  const before={hp:this.hp,conviction:this.conviction,charge:this.intent.charge};let evaluation;
  if(this.action===PlayerAction.GUARD){evaluation=evaluateGuard(this.guardPaths);if(!this.defense)evaluation={...evaluation,convictionDamage:0,damage:evaluation.valid?0:25};}
  else evaluation=evaluateMusic(this.scenario,this.action===PlayerAction.HOLD?this.scenario.previous:this.draft,this.action);
  if(!evaluation.valid){this.hp=Math.max(0,this.hp-evaluation.damage);this.errors++;}
  else {
   this.conviction=Math.max(0,Math.min(100,this.conviction-evaluation.convictionDamage+ (evaluation.claimStrength??0)));
   if(this.action===PlayerAction.GUARD&&!this.defense){this.guardReady=true;this.guardStored=structuredClone(this.guardPaths);this.intent.charge=this.intent.fired?0:Math.min(3,this.intent.charge+1);}
   else if(!this.defense)this.intent.predict(evaluation);
   if(this.action!==PlayerAction.GUARD)this.lastArrangement=cloneScore(this.action===PlayerAction.HOLD?this.scenario.previous:this.draft);
  }
  const isCannon=this.defense;
  if(isCannon){this.intent.fire();this.guarded=evaluation.valid;}
  // A structural counter or accumulated musical evidence causes exactly one BREAK.
  const broken=!this.breakOccurred&&evaluation.valid&&(isCannon||this.conviction<=75);
  if(broken)this.breakOccurred=true;
  this.result={...evaluation,before,after:{hp:this.hp,conviction:this.conviction,charge:this.intent.charge},broken,isCannon,action:this.action,scenario:this.scenario.id};
  this.log.push(this.result);
  return this.result;
 }
 showResult(){if(this.status===BattleState.RESOLVING)this.status=BattleState.RESULT;}
 next(){
  if(this.status!==BattleState.RESULT)return;
  if(this.hp===0){this.status=BattleState.DEFEAT;return;}
  if(this.final&&this.result.valid){this.status=this.conviction===0?BattleState.VICTORY:BattleState.DEFEAT;return;}
  if(!this.result.valid&&!this.defense){this.status=BattleState.PLANNING;this.result=null;return;}
  if(this.defense){this.defense=false;this.round=this.pendingRound;this.pendingRound=null;}
  else this.round++;
  if(this.round>=SCENARIOS.length&&!this.intent.fired){this.intent.charge=3;}
  if(this.intent.armed){this.pendingRound=this.round;this.defense=true;}
  this.final=!this.defense&&this.round>=SCENARIOS.length;
  this.openRound();
 }
 get ending(){return this.conviction===0&&this.hp>0?'victory':this.hp===0?'health':'claim';}
 get stars(){return this.errors===0&&this.guarded?3:this.errors<=2?2:1;}
}

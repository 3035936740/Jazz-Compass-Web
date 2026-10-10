import { getAudioContext, playChord, interruptIfActive, suppressQueued, connectOutput } from '../../audio_engine.js';
import { midiToFrequency } from '../../module_kit.js';
import { allNotes } from './music-evaluation.js';
// The page's base URL is the project root, so the existing Salamander sample path remains correct.
export class BattleAudio {
 constructor(){this.muted=false;this.jobs=new Set();}
 unlock(){getAudioContext();}
 stop(){this.jobs.forEach(clearTimeout);this.jobs.clear();suppressQueued();interruptIfActive();}
 schedule(fn,ms){const job=setTimeout(()=>{this.jobs.delete(job);if(!this.muted)fn();},ms);this.jobs.add(job);}
 play(notes,length=.85,interrupt=true){if(!this.muted)playChord(notes.map(midiToFrequency),length,{interrupt,velocity:.62});}
 context(scenario){this.stop();(scenario.history??[]).forEach((chord,i)=>this.schedule(()=>this.play([chord.bass,...chord.notes,chord.melody],.75,i===0),i*580));}
 draft(scenario,arr){this.stop();this.play([...allNotes(arr),scenario.melody],1.1);if(arr.continuation)this.schedule(()=>this.play([...allNotes(arr.continuation),scenario.melody],1),750);}
 guard(paths){this.stop();[38,43,48].forEach((bass,i)=>this.schedule(()=>this.play([bass,...paths[i]],.65,i===0),i*400));}
 resolution(scenario,result,arr,paths){
  this.stop();
  if(result.isCannon){
   const barrage=[[38,53,57,60,64,67],[43,59,62,65,68,76],[48,59,64,66,69,74]];
   barrage.forEach((notes,i)=>this.schedule(()=>this.play(result.valid?[notes[0],...paths[i]]:notes,.7,i===0),i*240));
   this.schedule(()=>this.impact(result.valid),150);return;
  }
  if(result.action==='guard'){this.guard(paths);return;}
  (scenario.history??[]).forEach((chord,i)=>this.schedule(()=>this.play([chord.bass,...chord.notes,chord.melody],.5,i===0),i*210));
  const at=(scenario.history?.length??0)*210;
  this.schedule(()=>{this.play([...allNotes(arr),scenario.melody],1.15);this.impact(result.excellent);},at);
  if(arr.continuation)this.schedule(()=>this.play([...allNotes(arr.continuation),scenario.melody],1),at+550);
 }
 impact(success){if(this.muted)return;const ctx=getAudioContext(),o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(success?130:80,ctx.currentTime);o.frequency.exponentialRampToValueAtTime(38,ctx.currentTime+.15);g.gain.setValueAtTime(.18,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.18);o.connect(g);connectOutput(g,{wet:false});o.start();o.stop(ctx.currentTime+.2);o.onended=()=>{o.disconnect();g.disconnect();};}
 ending(){this.stop();[[38,53,60],[43,53,59],[48,59,64,66,69]].forEach((notes,i)=>this.schedule(()=>this.play(notes,i===2?2:.8,i===0),i*600));}
 toggle(){this.muted=!this.muted;this.stop();return this.muted;}
}

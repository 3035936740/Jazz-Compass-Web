import { parsePitch } from '../../pitch_spelling.js';
import { parseChordSymbol } from '../../chord_symbols.js';
import { chordDegree, degreeLabel } from '../../chord_spelling.js';
import { profiles, t } from './scenarios.js';
export const pc = n => ((n%12)+12)%12;
const names=['C','D♭','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];
export const noteName = midi => names[pc(midi)]+(Math.floor(midi/12)-1);
export function readPitch(text){return parsePitch(text.replaceAll('♭','b').replaceAll('♯','#'))?.midi ?? null;}
export const allNotes = arrangement => [arrangement.bass,...arrangement.voices.map(v=>v.midi)];
const corePcs = symbol => parseChordSymbol(symbol).tones.map(tone=>parsePitch(tone.name+'4').pc);
export function chordFacts(symbol){const c=parseChordSymbol(symbol);return c?c.tones.map(tone=>({note:tone.name,degree:degreeLabel(tone.degree,tone.semitones-({1:0,3:4,5:7,7:11,9:14,11:17,13:21}[tone.degree]??tone.semitones))})):[];}
function criterion(name,pass,detail){return {name,pass,detail};}
function closeVoice(from,notes,targetPc){return Math.min(...notes.filter(n=>pc(n)===targetPc).map(n=>Math.abs(n-from)));}
function identify(arr,scenario){const notes=[...allNotes(arr),scenario.melody],set=new Set(notes.map(pc));
 return profiles.filter(p=>scenario.families.includes(p.family)).find(p=>set.has(p.root)&&p.core.every(n=>set.has(n))&&[p.root,...p.core,pc(p.root+7)].includes(pc(arr.bass)))??null;
}
export function evaluateMusic(scenario,arr,action='arrange'){
 const notes=allNotes(arr),voices=arr.voices.map(v=>v.midi),pcs=new Set(notes.map(pc)),profile=identify(arr,scenario);
 const problems=[],metrics=[];
 const safe=notes.every(n=>Number.isInteger(n)&&n>=36&&n<=84)&&arr.voices.length>=1&&arr.voices.length<=6;
 const functionOk=safe&&!!profile;
 metrics.push(criterion('FUNCTION',functionOk,functionOk?t(`${profile.symbol} 的${profile.family==='tonic'?'主':profile.family==='deceptive'?'欺骗终止':profile.family==='dominant'?'属':'延后'}功能成立；低音 ${noteName(arr.bass)}。`,`${profile.symbol}: ${profile.family} function established; bass ${noteName(arr.bass)}.`):t('低音与必要功能音未能组成当前允许的和声方向。','Bass and defining tones do not establish a permitted harmonic direction.')));
 if(!functionOk)problems.push('FUNCTION LOST');
 const foreign=profile?notes.filter(n=>!profile.allowed.includes(pc(n))):[];
 const collision=notes.some(n=>Math.abs(n-scenario.melody)===1||scenario.melody-n===13)||voices.some((n,i)=>voices.slice(i+1).some(m=>Math.abs(m-n)===13));
 const melodyOk=functionOk&&!foreign.length&&!collision;
 metrics.push(criterion('MELODY',melodyOk,melodyOk?t(`旋律 ${noteName(scenario.melody)} 可保留，未产生目标外的冲突。`,`Melody ${noteName(scenario.melody)} is supported without an unintended clash.`):t(foreign.length?`出现不属于当前配音语境的音：${foreign.map(noteName).join('、')}。`:'旋律或内声部出现未经要求的近距离半音 / 小九度冲突。',foreign.length?`Outside the supported context: ${foreign.map(noteName).join(', ')}.`:'Unrequested close semitone or minor-ninth collision.')));
 if(functionOk&&!melodyOk)problems.push('MELODY CLASH');
 const previous=allNotes(scenario.previous),previousProfile=profiles.find(p=>p.core.every(c=>previous.some(n=>pc(n)===c))&&previous.some(n=>pc(n)===p.root));
 let motionOk=false,moves=[];
 if(profile&&previousProfile){
  // Guide-tone paths are matched by function, then actual register — not sorted-note equality.
  const fromTargets=previousProfile.guideTargets;
  moves=fromTargets.map((fromPc,i)=>{const from=previous.filter(n=>pc(n)===fromPc).sort((a,b)=>b-a)[0];const target=profile.guideTargets[i];return {from,target,distance:closeVoice(from,[...notes,scenario.melody],target)};});
  motionOk=moves.every(m=>m.distance<=2)&&Math.abs(arr.bass-scenario.previous.bass)<=12;
 } else if(profile&&scenario.carry){motionOk=true;}
 metrics.push(criterion('VOICE LEADING',motionOk,motionOk?t('核心声部保持或级进，低音没有突然跳出当前音域。','Guide voices hold or move by step; bass remains in register.'):t('至少一条核心声部失去连接，或低音跳跃超过一个八度。可移动八度，但需要保住实际声部的连续性。','A guide voice loses continuity, or bass leaps beyond an octave. Octave changes still need continuous voices.')));
 if(functionOk&&!motionOk)problems.push('VOICE LEADING BROKEN');
 const present=new Set([...pcs,pc(scenario.melody)]),missing=scenario.requiredColors.filter(c=>!present.has(c));
 const colorOk=functionOk&&missing.length===0;
 metrics.push(criterion('COLOR',colorOk,colorOk?t('所需色彩已出现；这里的复杂程度来自音乐目标。','Required colours are present; density serves the musical goal.'):t(`所需色彩缺少 ${missing.map(c=>names[c]).join('、')}；减少音符没有完成这句的目标。`,`Missing required colour: ${missing.map(c=>names[c]).join(', ')}. Fewer notes do not fulfil the phrase.`)));
 if(functionOk&&!colorOk)problems.push('TARGET COLOR NOT ACHIEVED');
 let continuationResult=null;
 if(profile&&['delay','substitute'].includes(profile.family)){
  if(!arr.continuation) {problems.push('DIRECTION UNFINISHED');metrics[0].pass=false;metrics[0].detail=t('延后 / 替代并非错误，但你没有写出下一拍，方向尚未完成。','Delay/substitution is possible, but the following beat is missing.');}
  else{
   const next={...scenario,previous:arr,families:['tonic'],requiredColors:[],melody:scenario.melody,carry:false};
   continuationResult=evaluateMusic(next,arr.continuation,'continuation');
   if(!continuationResult.valid){problems.push('DIRECTION UNFINISHED');metrics[0].pass=false;metrics[0].detail=t('下一拍尚未建立主功能或平滑连接；延后需要真实的落地。','The next beat lacks tonic function or smooth connection; delay needs a real landing.');}
  }
 }
 const seen=new Set();const purposes=notes.map((n,i)=>{
  const p=pc(n);let role='UNUSED';
  if(profile){if(i===0&&[profile.root,...profile.core].includes(p))role='FUNCTION';else if(profile.core.includes(p))role='FUNCTION';else if(scenario.requiredColors.includes(p)||(scenario.usefulColors.includes(p)&&[1,2,3,5,6,8,9].includes(pc(p-profile.root))))role='COLOR';else if(p===pc(scenario.melody))role='REDUNDANT';}
  if(seen.has(p))role='REDUNDANT';seen.add(p);
  return {midi:n,role,degree:profile?degreeLabel(...chordDegree(pc(n-profile.root),notes.map(x=>pc(x-profile.root)))):'—'};
 });
 const unused=purposes.filter(p=>['UNUSED','REDUNDANT'].includes(p.role));
 const redundancyOk=unused.length===0;
 metrics.push(criterion('REDUNDANCY',redundancyOk,redundancyOk?t('每个伴奏音都承担功能、旋律或目标色彩，不以数量加分。','Each accompaniment note serves function, melody or target colour. No points for note count.'):t(`${unused.map(p=>noteName(p.midi)).join('、')} 没有新增作用。音乐可以成立，但这些音支持不了你的反驳。`,`${unused.map(p=>noteName(p.midi)).join(', ')} adds no new purpose. The music may be valid, but these notes do not support your argument.`)));
 const valid=problems.length===0,excellent=valid&&redundancyOk;
 return {valid,excellent,metrics,problems,purposes,profile:profile?.symbol??null,family:profile?.family??null,predicted:valid&&profile?.family==='tonic',damage:valid?0:25,convictionDamage:excellent?scenario.reward:0,claimStrength:valid&&!excellent?3:0,continuationResult,action};
}
export function evaluateGuard(paths){
 const chords=['Dm7','G7','Cmaj7'],required=chords.map(symbol=>{const c=parseChordSymbol(symbol);return c.tones.filter(n=>n.degree===3||n.degree===7).map(n=>parsePitch(n.name+'4').pc);});
 const shape=Array.isArray(paths)&&paths.length===3&&paths.every(p=>Array.isArray(p)&&p.length===2&&p.every(n=>Number.isInteger(n)&&n>=48&&n<=84));
 const functions=shape&&paths.every((notes,i)=>required[i].every(c=>notes.some(n=>pc(n)===c)));
 const motion=shape&&[0,1].every(row=>Math.abs(paths[1][row]-paths[0][row])<=2&&Math.abs(paths[2][row]-paths[1][row])<=2);
 const valid=functions&&motion;
 return {valid,excellent:valid,damage:valid?0:21,convictionDamage:valid?22:0,problems:[...(!functions?['FUNCTION LOST']:[]),...(!motion?['VOICE LEADING BROKEN']:[])],metrics:[criterion('FUNCTION',functions,t('每一拍需要维持各自和弦的性质；根音由大炮低音给出。','Each beat must preserve its chord quality; the cannon bass supplies roots.')),criterion('VOICE LEADING',motion,t('两条持续声部不能只换标签；实际移动必须保持或级进。','Two continuing voices must physically hold or move by step.'))],purposes:[]};
}

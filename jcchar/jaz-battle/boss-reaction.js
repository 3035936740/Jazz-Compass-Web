import { t } from './scenarios.js';
// Boss performance consumes an evaluation; it never changes musical validity or battle state.
export function BossReaction(result){
 if(!result.valid)return {pose:'expressions/mocking',kind:'counter',title:result.problems[0],line:t('技术当然有用。可你这句，功能、连接或目标已经丢了。听听它发生了什么。','Technique matters. But this phrase lost function, continuity or its goal. Listen to what happened.','技術は役に立つ。でもこの音楽は機能、連結、目標を失った。何が起きたか聴け。')};
 if(result.isCannon)return {pose:'expressions/shocked',kind:'break',title:'GUIDE TONE COUNTER',line:t('……等等。那些延伸音，全散了？<br>你挡住的是骨架，不是音符的数量。','…Wait. All my extensions fell away?<br>You stopped the structure, not the note count.','……待て。延伸音が全部崩れた？<br>音の数ではなく、骨組みを止めたのか。')};
 if(result.action==='guard')return {pose:'expressions/serious',kind:'guard',title:'STRUCTURE READ',line:t('盾做好了。可我在独奏，你还没用自己的音乐反驳我。','Your shield is built. But I am soloing; you have not answered my claim with your own music.','盾はできた。でも俺は独奏中。自分の音楽で主張を反駁してはいない。')};
 if(result.excellent)return {pose:result.broken?'expressions/shocked':'expressions/confused',kind:result.broken?'break':'hit',title:result.broken?'BREAK':'CLAIM BROKEN',line:result.predicted?t('主功能，我猜中了。<br>……可你用的每一个音，居然都有理由？','I predicted tonic.<br>…But every note you chose actually has a purpose?','主機能は予測通り。<br>……でも選んだ音には、全部理由がある？'):t('你没有落进我的预判。<br>而且……这条路，真的成立。','You escaped my prediction.<br>And…this direction really works.','予測から外れた。<br>しかも……この方向は成立している。')};
 return {pose:'expressions/proud',kind:'prediction',title:'MUSIC VALID',line:result.predicted?t('哈哈！就是这样！<br>看到 ii–V，你就往 I 跑。音乐当然成立——可我猜中了。','Ha! There it is!<br>You see ii–V and run to I. The music is valid—and I predicted you.','はは！そう来る！<br>ii–V を見て I に走る。音楽は成立——でも予測通りだ。'):t('音乐成立。可这些音，没有新增作用。<br>你还是在用复杂程度证明自己。','The music is valid. But those notes add no purpose.<br>You are still proving yourself through complexity.','音楽は成立。でも増えた音に新しい役割はない。<br>まだ複雑さで自分を証明している。')};
}
export class BossPerformance {
 constructor(stage,sprite,motion,impact){Object.assign(this,{stage,sprite,motion,impact});this.jobs=[];this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;this.token=0;}
 clear(){this.token++;this.jobs.forEach(clearTimeout);this.jobs=[];this.stage.classList.remove('hit','counter','break','firing');this.impact.textContent='';this.motion.classList.remove('hitstop');}
 pose(path){const token=++this.token,img=new Image();img.src='char/04_jaz/'+path+'.png';img.onload=()=>{if(token===this.token)this.sprite.src=img.src;};}
 react(result,tx){this.clear();const reaction=BossReaction(result);this.pose(reaction.pose);this.impact.textContent=reaction.title;
  const cls=result.isCannon?'firing':reaction.kind==='break'?'break':reaction.kind==='counter'?'counter':'hit';this.stage.classList.add(cls);
  if(reaction.kind==='break'){this.stage.classList.add('quiet-jaz');}
  if(!this.reduced)this.motion.classList.add('hitstop');
  this.jobs.push(setTimeout(()=>this.motion.classList.remove('hitstop'),result.broken?230:90));
  this.jobs.push(setTimeout(()=>{this.stage.classList.remove('hit','counter','break','firing');this.impact.textContent='';},1100));
  return tx(reaction.line);
 }
}

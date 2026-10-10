/* JC Boss v0.2 — realtime music-theory RPG. All gameplay runs in one simulation clock.
 * Input never opens a turn menu: movement, weapon selection, music, attacks and hazards coexist.
 * Original character textures are kept at the same complete 800×800 framing.
 */
(() => {
'use strict';
const $=id=>document.getElementById(id), canvas=$('battle'), ctx=canvas.getContext('2d');
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n)), rand=(a,b)=>a+Math.random()*(b-a), distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const noteNames=['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];
const pc=n=>noteNames[((n%12)+12)%12];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced)document.body.classList.add('reduced');
const tools=[{name:'导音锁链',cost:4,cooldown:.21,color:'#ffc369',hint:'锁住三音与七音：鼠标瞄准音符，点击 / 空格发射；Tab 切换目标。'},{name:'静音斩',cost:18,cooldown:.43,color:'#ed6488',hint:'点击密集弹幕切出静音圆；金色核心音不可删除。清除弹幕也能保护自己。'},{name:'半音声部',cost:6,cooldown:.24,color:'#a78cf5',hint:'击中需解决的声部，让它下行半音。公共音不需要改变。'},{name:'终止式',cost:10,cooldown:.35,color:'#7bf0cf',hint:'瞄准 I 和弦；金色强拍出现时发射，完成 V → I。'}];
const skills=[
 {name:'噪声倾泻',short:'NOTE FLOOD',duration:18,objective:'G7 正在轰炸。用「导音锁链」命中三音 B、七音 F，建立骨架。',line:'9！11！13！<br>你能听见里面的骨架吗？',tool:0},
 {name:'半音围城',short:'SEMITONE CAGE',duration:17,objective:'Dm7 → G7：保持 F，把声部 C 下行半音到 B。使用「半音声部」。',line:'和弦要变了！<br>这条声部，你接得住吗？',tool:2},
 {name:'禁奏之雨',short:'TENSION RAIN',duration:19,objective:'用「静音斩」消除 8 个扩展音弹幕，保住金色核心音 B / F。',line:'那就把舞台塞满！<br>但别把骨头一起拆掉！',tool:1},
 {name:'终止陷阱',short:'CADENCE TRAP',duration:19,objective:'完成正格终止 G7 → I。在金色强拍，用「终止式」命中 Cmaj7。',line:'来，给这段音乐一个结尾。<br>你确定，这就是终点？',tool:3}
];
let W=960,H=350,s=null,keys=new Set(),pointer={x:480,y:120,active:false},last=0,imageToken=0;
let audio=null,bus=null,sources=new Set(),noiseBuffer=null,muted=false,heldFire=false,dragSoul=false;
function initialize(){
 stopSound();keys.clear();heldFire=false;dragSoul=false;imageToken++;
 s={mode:'intro',paused:false,time:0,visualTime:0,phase:1,bossHp:420,maxBossHp:420,hp:64,maxHp:64,mp:100,tool:0,round:-1,skillId:0,skillTime:0,telegraph:0,stun:0,bullets:[],shots:[],targets:[],particles:[],rings:[],texts:[],beams:[],hitstop:0,shake:0,shakeKind:'boss',hurt:0,cooldown:0,spawn:0,spawnStep:0,beatTime:0,beatIndex:-1,combo:0,break:0,wins:0,hits:0,wrong:0,mutedCount:0,selectedTarget:0,keyboardAim:true,spriteUntil:0,statusUntil:0,resultWait:0,flash:0,score:0,player:{x:W*.5,y:H*.78,r:9,trail:[]}};
 $('intro').hidden=false;$('result').hidden=true;$('pause-overlay').hidden=true;$('pause').disabled=true;
 document.body.classList.remove('phase2','won','freeze');$('hit-banner').classList.remove('active');$('sprite-motion').classList.remove('hit','break');
 $('phase-label').textContent='PHASE 01';$('skill-name').textContent='音符风暴，正在酝酿。';$('skill-number').textContent='SKILL 00';$('skill-clock').textContent='—';$('objective').textContent='躲避弹幕，用乐理工具完成每一个实时反击。';$('cast-title').textContent='等待开战';$('cast-fill').style.width='0%';
 say('听好了！<br>我的每一个音，都比你厉害。');pose('poses/idle');selectTool(0);updateHud();draw();
}
function bootAudio(){if(!audio){const C=window.AudioContext||window.webkitAudioContext;if(!C)return;audio=new C();bus=audio.createGain();bus.gain.value=muted?0:.30;const c=audio.createDynamicsCompressor();c.threshold.value=-22;c.ratio.value=7;bus.connect(c);c.connect(audio.destination);noiseBuffer=audio.createBuffer(1,audio.sampleRate*.25,audio.sampleRate);const out=noiseBuffer.getChannelData(0);for(let i=0;i<out.length;i++)out[i]=Math.random()*2-1;}audio.resume().catch(()=>{});}
function stopSound(){if(!audio)return;for(const source of sources){try{source.stop(audio.currentTime+.02);}catch{}}sources.clear();}
function tone(midi,duration=.35,volume=.2,offset=0,type='triangle'){if(!audio||muted)return;const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime+offset;o.type=type;o.frequency.value=440*2**((midi-69)/12);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(volume,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(bus);sources.add(o);o.start(t);o.stop(t+duration+.02);o.onended=()=>{sources.delete(o);o.disconnect();g.disconnect();};}
function chord(notes,duration=.6,offset=0){notes.forEach((n,i)=>tone(n,duration,.30/Math.sqrt(notes.length),offset+i*.009));}
function noise(duration=.12,volume=.25){if(!audio||muted)return;const n=audio.createBufferSource(),g=audio.createGain(),t=audio.currentTime;n.buffer=noiseBuffer;g.gain.setValueAtTime(volume,t);g.gain.exponentialRampToValueAtTime(.0001,t+duration);n.connect(g);g.connect(bus);sources.add(n);n.start(t);n.stop(t+duration);n.onended=()=>{sources.delete(n);n.disconnect();g.disconnect();};}
function thump(strength=1){if(!audio||muted)return;const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime;o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(38,t+.18);g.gain.setValueAtTime(.6*strength,t);g.gain.exponentialRampToValueAtTime(.0001,t+.22);o.connect(g);g.connect(bus);sources.add(o);o.start();o.stop(t+.24);o.onended=()=>{sources.delete(o);o.disconnect();g.disconnect();};}
function musicBeat(){s.beatIndex++;const beat=s.beatIndex%4;soundsOnBeat(beat);document.querySelectorAll('.beat-display i').forEach((n,i)=>n.classList.toggle('on',i===beat));}
function soundsOnBeat(beat){if(s.mode==='victory'||s.mode==='defeat')return;const roots=[43,43,43,48],root=roots[s.skillId];tone(root,beat===0?.48:.25,.26);if(beat===0){if(s.skillId===0&&s.targets.filter(t=>t.collected).length)chord([53,59],.8);else chord(s.phase===2?[53,59,64,69,73]:[53,59,64],.55);}if(beat===1||beat===3){noise(.06,.12);tone(74+(s.beatIndex%3),.11,.045);}if(beat===2)tone(root+12,.23,.20);}
function beatLength(){return 60/(s.phase===2?120:104);}
function isStrong(){return Math.floor(s.beatTime/beatLength())%4===0 && (s.beatTime%beatLength())/beatLength()<.32;}
function say(text){$('dialogue').innerHTML=text;}
function pose(path){const token=++imageToken,img=new Image();img.src='04_jaz/'+path+'.png';img.onload=()=>{if(token===imageToken)$('sprite').src=img.src;};}
function restartClass(el,name){el.classList.remove(name);void el.offsetWidth;el.classList.add(name);}
function banner(word,subtitle){$('hit-banner').innerHTML=word+'<small>'+subtitle+'</small>';restartClass($('hit-banner'),'active');}
function status(text,duration=2.4){$('status-line').textContent=text;s.statusUntil=s.time+duration;}
function selectTool(n){s.tool=n;document.querySelectorAll('[data-tool]').forEach(b=>{const on=+b.dataset.tool===n;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',String(on));});$('tool-hint').innerHTML='<b>'+tools[n].name+'</b>：'+tools[n].hint;if(s.mode!=='intro')tone(77+n,.09,.08);}
function begin(){bootAudio();$('intro').hidden=true;$('pause').disabled=false;canvas.focus({preventScroll:true});nextSkill();}
function target(x,y,label,midi,extra={}){return {x,y,baseX:x,baseY:y,r:22,label,midi,collected:false,phase:rand(0,6.28),...extra};}
function nextSkill(){
 s.round++;s.skillId=s.round%4;s.mode='telegraph';s.telegraph=s.phase===2?1.35:2.15;s.skillTime=0;s.spawn=0;s.spawnStep=0;s.targets=[];s.shots=[];s.bullets=[];s.mutedCount=0;s.selectedTarget=0;s.cooldown=0;s.keyboardAim=true;s.hurt=Math.max(s.hurt,.7);
 const type=skills[s.skillId];$('skill-name').textContent=type.name;$('skill-number').textContent='SKILL '+String(s.round+1).padStart(2,'0');$('objective').textContent=type.objective;$('cast-title').textContent='正在蓄力 / '+type.short;$('cast-fill').style.width='0%';
 say(type.line);pose(s.phase===2?'boss/phase2':'poses/speaking');
 if(s.skillId===0){s.targets=[target(W*.18,H*.32,'A',69,{core:false}),target(W*.40,H*.24,'B',59,{core:true,role:'3rd'}),target(W*.61,H*.35,'F',65,{core:true,role:'7th'}),target(W*.82,H*.26,'E',76,{core:false})];}
 if(s.skillId===1){const second=s.round>=4;s.targets=[target(W*.34,H*.30,second?'F':'C',second?65:60,{editable:true,expected:second?64:59}),target(W*.68,H*.38,second?'B':'F',second?59:65,{editable:false})];if(second){$('objective').textContent='G7 → Cmaj7：保持 B，把声部 F 下行半音到 E。使用「半音声部」。';}}
 if(s.skillId===2){s.targets=[target(W*.15,H*.18,'B',59,{core:true}),target(W*.85,H*.18,'F',65,{core:true})];}
 if(s.skillId===3){s.targets=[target(W*.32,H*.30,'Cmaj7',60,{correct:true,r:37}),target(W*.72,H*.36,'Am7',57,{correct:false,r:37})];}
 s.player.x=clamp(s.player.x,28,W-28);s.player.y=clamp(s.player.y,35,H-25);status('预警：'+type.name+' · 选择工具，准备反击。',s.telegraph);
}
function emit(x,y,vx,vy,label='♪',midi=69,core=false){if(s.bullets.length>140)return;s.bullets.push({x,y,vx,vy,r:core?10:8,label,midi,core,age:0,phase:rand(0,6),graze:false});}
function aimBullet(x,y,speed,spread=0,label='9',core=false){const a=Math.atan2(s.player.y-y,s.player.x-x)+spread;emit(x,y,Math.cos(a)*speed,Math.sin(a)*speed,label,69,core);}
function spawnPattern(){
 const phase=s.phase===2,mobile=W<700,speed=(phase?145:115)*(mobile?.8:1),n=s.spawnStep++;
 if(s.skillId===0){const x=W*.5;for(let i=-2;i<=2;i++)aimBullet(x,-10,speed,i*.25,['9','11','13','♯11','9'][i+2]);if(phase&&n%2===0)aimBullet(n%4===0?-10:W+10,H*.38,speed*.8,0,'13');}
 if(s.skillId===1){const left=n%2===0,x=left?-12:W+12;for(let i=0;i<4;i++){const yy=H*.22+i*H*.18;emit(x,yy,(left?1:-1)*speed*1.5,Math.sin(n+i)*15,pc(60+i));}if(phase)aimBullet(W*.5,-10,speed,0,'♯');}
 if(s.skillId===2){for(let i=0;i<6;i++){const x=(i+.5)*W/6+Math.sin(n*.8+i)*17;emit(x,-18,speed*.10*Math.sin(n+i),speed*1.3,['9','11','13'][i%3],69+i,false);}if(n%3===0){emit(W*.1,-15,20,speed*.9,'B',59,true);emit(W*.9,-15,-20,speed*.9,'F',65,true);}}
 if(s.skillId===3){const gap=(Math.sin(n*.7)*.25+.5)*W;for(let i=0;i<8;i++){const x=(i+.5)*W/8;if(Math.abs(x-gap)<W*.17)continue;emit(x,-12,Math.sin(n)*16,speed*1.15,'♪',67);}if(phase&&n%2===0)aimBullet(n%4===0?0:W,H*.5,speed,0,'Ⅴ');}
}
function addParticles(x,y,color,count=12,power=150){for(let i=0;i<count;i++){const a=rand(0,Math.PI*2),v=rand(power*.25,power);s.particles.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:rand(.25,.7),max:.7,color,size:rand(2,5)});}}
function ring(x,y,color,r=80){s.rings.push({x,y,color,r:4,max:r,life:.38});}
function text(x,y,label,color='#ffc369',size=19){s.texts.push({x,y,label,color,size,life:.95});}
function counter(message,damage=false){s.wrong++;s.combo=0;s.break=Math.max(0,s.break-12);status(message,3);say(message);pose('expressions/mocking');s.spriteUntil=s.time+1.4;noise(.13,.22);chord([48,61,66],.33);for(let i=-2;i<=2;i++)aimBullet(W/2,0,150,i*.17,'!');if(damage)hurtPlayer(4);updateHud();}
function capturePointer(el,id){ if(el.isConnected){try{el.setPointerCapture(id);}catch(_){/* A released/cancelled pointer needs no capture. */}} }
function fire(){
 if(s.paused||s.mode!=='combat'||s.cooldown>0)return;
 const weapon=tools[s.tool];if(s.mp<weapon.cost){status('MP 不足。移动躲避，等待恢复。');return;}
 s.mp-=weapon.cost;s.cooldown=weapon.cooldown;
 let aim=pointer;if(s.keyboardAim){const available=s.targets.filter(t=>!t.collected);aim=available[s.selectedTarget%Math.max(1,available.length)]||{x:s.player.x,y:s.player.y-H*.4};}
 if(s.tool===1){
  if(s.keyboardAim){
   const radius=W<700?78:105;
   const candidates=s.bullets.filter(b=>!b.core && !s.targets.some(t=>t.core && distance(b,t)<radius*.85) && !s.bullets.some(t=>t.core && distance(b,t)<radius));
   let best=null,bestCount=0;
   for(const candidate of candidates){const count=candidates.filter(b=>distance(candidate,b)<radius*.9).length;if(count>bestCount){best=candidate;bestCount=count;}}
   aim=best||s.player;
  }
  castMute(aim.x,aim.y);return;
 }
 const a=Math.atan2(aim.y-s.player.y,aim.x-s.player.x),color=weapon.color;
 s.shots.push({x:s.player.x,y:s.player.y,vx:Math.cos(a)*760,vy:Math.sin(a)*760,age:0,tool:s.tool,color,strong:isStrong(),target:s.targets.find(t=>!t.collected&&distance(t,aim)<t.r+20)||null,trail:[]});
 ring(s.player.x,s.player.y,color,19);tone([83,70,77,79][s.tool],.09,.11,0,'sine');
}
function castMute(x,y){
 const radius=W<700?78:105;ring(x,y,'#ed6488',radius*1.3);noise(.14,.4);thump(.35);s.beams.push({x1:x-radius,y1:y+radius*.5,x2:x+radius,y2:y-radius*.5,color:'#ed6488',life:.22});
 let removed=0,coreHit=false;
 s.bullets=s.bullets.filter(b=>{if(Math.hypot(b.x-x,b.y-y)<radius){if(b.core){coreHit=true;return true;}removed++;addParticles(b.x,b.y,'#ed6488',6,90);return false;}return true;});
 if(s.targets.some(t=>t.core&&!t.collected&&Math.hypot(t.x-x,t.y-y)<radius*.8))coreHit=true;
 if(coreHit){counter('骨架不能删。金色 B / F 是核心音。');text(x,y,'CORE PROTECTED','#ed6488',15);return;}
 if(removed){s.mp=Math.min(100,s.mp+removed*1.5);s.score+=removed*10;text(x,y,'MUTE ×'+removed,'#ed6488');status('静音斩：清除 '+removed+' 个扩展音。');}
 if(s.skillId===2){s.mutedCount+=removed;$('objective').textContent='静音斩：'+s.mutedCount+' / 8 个扩展音已清除。保住金色 B / F。';if(s.mutedCount>=8)success('你删掉的是噪声，不是骨架。',66);}
}
function hitTarget(shot,t){
 if(t.collected)return;
 if(shot.tool===0&&s.skillId===0){
  if(!t.core){counter(t.label+' 不是 G7 的三音 / 七音。听听 B 和 F。');text(t.x,t.y,'TENSION','#ed6488',15);return;}
  t.collected=true;addParticles(t.x,t.y,'#ffc369',18);ring(t.x,t.y,'#ffc369',55);tone(t.midi,.6,.3);text(t.x,t.y-20,t.role.toUpperCase(),'#ffc369');
  const cores=s.targets.filter(n=>n.core);if(cores.every(n=>n.collected)){s.beams.push({x1:cores[0].x,y1:cores[0].y,x2:cores[1].x,y2:cores[1].y,color:'#ffc369',life:.8});success('两个音。和弦的功能，居然还在。',64);}else status('已锁住 '+t.label+' / '+t.role+'。继续连接另一个核心音。');return;
 }
 if(shot.tool===2&&s.skillId===1){
  if(!t.editable){counter('这是公共音 '+t.label+'，保持它。需要移动的是另一条声部。');return;}
  t.midi--;t.label=pc(t.midi);t.collected=true;ring(t.x,t.y,'#a78cf5',60);addParticles(t.x,t.y,'#a78cf5',18);tone(t.midi,.8,.35);success('下行半音。你让声部真正接上了。',70);return;
 }
 if(shot.tool===3&&s.skillId===3){
  if(!t.correct){counter('Am7 是 vi，形成欺骗终止。当前目标是正格终止 V → I。');return;}
  if(!shot.strong){status('和弦选对了；等金色强拍，再发射终止式。',3);text(t.x,t.y,'WAIT FOR DOWNBEAT','#a78cf5',13);tone(67,.3,.15);return;}
  t.collected=true;success('V → I。每一个紧张音，都有了去处。',78,true);return;
 }
 status('当前技能需要「'+tools[skills[s.skillId].tool].name+'」。工具可实时切换。',3);text(t.x,t.y,'CHANGE TOOL','#a78cf5',14);tone(62,.12,.1);
}
function success(line,damage,perfect=false){
 if(s.mode!=='combat')return;
 s.wins++;s.combo++;s.break=Math.min(100,s.break+35+(perfect?12:0));s.score+=damage*10+s.combo*25;
 const broke=s.break>=100;if(broke){damage+=35;s.break=0;}
 s.bossHp=Math.max(0,s.bossHp-damage);s.mode='stun';s.stun=broke?2.1:1.05;s.hitstop=reduced?0:(broke?.15:.085);s.shake=reduced?0:(broke?15:8);s.flash=broke?.6:.35;
 s.bullets.forEach(b=>addParticles(b.x,b.y,b.core?'#ffc369':'#ed6488',3,140));s.bullets=[];s.shots=[];
 s.beams.push({x1:s.player.x,y1:s.player.y,x2:W/2,y2:-40,color:perfect?'#7bf0cf':'#ffc369',life:.55});
 addParticles(W/2,20,'#ffc369',broke?50:30,260);text(W/2,H*.40,broke?'BREAK +35':perfect?'PERFECT CADENCE':'COUNTERATTACK','#ffc369',W<700?23:25);
 $('boss-damage').textContent='−'+damage;restartClass($('boss-damage'),'pop');restartClass($('sprite-motion'),broke?'break':'hit');restartClass($('combat-panel'),'boss-hit');
 pose(broke?'expressions/shocked':'expressions/hurt');s.spriteUntil=s.time+.9;say(line);status(broke?'BREAK！弹幕被击碎，额外伤害 +35。':'反击命中 −'+damage+' · '+s.combo+' 连击',3);thump(broke?1:.7);noise(.09,.4);chord([48,52,59],broke?1.2:.7);
 if(broke){s.hp=Math.min(64,s.hp+6);banner('BREAK','弹幕崩解 · +35 伤害 · 恢复 6 HP');}
 else if(perfect)banner('PERFECT','强拍终止 · 音乐完成解决。');
 updateHud();if(s.bossHp<=0)win();else if(s.bossHp<=210&&s.phase===1)phaseTwo();
}
function phaseTwo(){s.phase=2;s.mode='transition';s.stun=2.7;s.bullets=[];s.shots=[];s.hitstop=reduced?0:.15;s.shake=reduced?0:13;document.body.classList.add('phase2');$('phase-label').textContent='PHASE 02 / DOUBLE TIME';banner('PHASE II','120 BPM · 他开始认真了。');restartClass($('enemy-stage'),'phase-burst');pose('boss/phase2');s.spriteUntil=0;say('好。那就认真一点。<br>这次，别想站着慢慢选。');chord([43,53,59,73],1.5);}
function hurtPlayer(amount=6){if(s.hurt>0||s.mode!=='combat')return;s.hp=Math.max(0,s.hp-amount);s.hits++;s.hurt=.9;s.combo=0;s.break=Math.max(0,s.break-8);s.hitstop=reduced?0:.045;s.shake=reduced?0:6;s.shakeKind='player';addParticles(s.player.x,s.player.y,'#ed6488',16);text(s.player.x,s.player.y-20,'−'+amount,'#ed6488',19);restartClass($('combat-panel'),'player-hit');noise(.16,.45);tone(38,.22,.3);status('受到 '+amount+' 点伤害。继续移动，别停在弹幕路径上。');updateHud();if(s.hp<=0)lose();}
function win(){s.mode='victory';s.resultWait=2.2;s.bullets=[];s.shots=[];s.hitstop=reduced?0:.17;s.shake=reduced?0:18;s.flash=1;document.body.classList.add('won');banner('FINISHER','所有噪声，止于这两个音。');pose(s.hits<=2?'endings/three_star':s.hits<=7?'endings/two_star':'endings/one_star');say('……行。<br>你知道什么时候，该少弹。');$('cast-title').textContent='执念瓦解';$('cast-fill').style.width='100%';$('skill-clock').textContent='FINISH';stopSound();chord([38,53,60],.9);chord([43,53,59],.9,.7);chord([48,52,59],1.8,1.4);for(let i=0;i<6;i++)ring(W/2,H/2,i%2?'#ffc369':'#7bf0cf',120+i*75);$('pause').disabled=true;updateHud();}
function lose(){s.mode='defeat';s.resultWait=.65;s.bullets=[];s.shots=[];pose('expressions/proud');say('还要再来一次吗？<br>先听清楚，再出手。');stopSound();[60,59,56,48].forEach((n,i)=>tone(n,.5,.3,i*.25));$('pause').disabled=true;}
function showResult(){const won=s.mode==='victory';$('result').hidden=false;$('result-label').textContent=won?'CONVICTION SHATTERED':'YOUR MUSIC CAN CONTINUE';$('result-title').textContent=won?'……行。你赢了。':'灵魂暂时失去了节拍。';const stars=s.hits<=2?3:s.hits<=7?2:1;$('result-stars').textContent=won?Array.from({length:3},(_,i)=>i<stars?'✦':'·').join(' '):'♥';$('result-copy').innerHTML=won?s.wins+' 次乐理反击 · '+s.hits+' 次受伤 · '+s.score+' 分<br>用音乐，击碎了他的执念。':'成功反击 '+s.wins+' 次。试着边移动，边选择对应工具。<br>静音斩可以清弹幕，别忘了保护自己。';}
function updateHud(){
 $('boss-hp').textContent=s.bossHp+' / 420';$('boss-hp-fill').style.width=s.bossHp/420*100+'%';$('hp-lag').style.width=s.bossHp/420*100+'%';$('break-value').textContent=Math.round(s.break)+'%';$('break-fill').style.width=s.break+'%';$('player-hp').textContent=s.hp+' / 64';$('player-hp-fill').style.width=s.hp/64*100+'%';$('mp').textContent=Math.floor(s.mp);$('mp-fill').style.width=s.mp+'%';$('combo').textContent=s.combo+' CHAIN';
}
function update(dt){
 s.visualTime+=dt;
 if(s.paused||s.mode==='intro')return;
 if(s.hitstop>0){s.hitstop-=dt;document.body.classList.add('freeze');return;}document.body.classList.remove('freeze');
 s.time+=dt;s.cooldown=Math.max(0,s.cooldown-dt);s.hurt=Math.max(0,s.hurt-dt);s.shake=Math.max(0,s.shake-dt*28);s.flash=Math.max(0,s.flash-dt*2);s.mp=Math.min(100,s.mp+dt*14);
 if(s.spriteUntil&&s.time>=s.spriteUntil){s.spriteUntil=0;pose(s.phase===2?'boss/phase2':'poses/idle');$('sprite-motion').classList.remove('hit','break');}
 if(s.statusUntil&&s.time>s.statusUntil){s.statusUntil=0;$('status-line').textContent='移动、躲避、工具攻击：同时发生。';}
 for(const p of s.particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=170*dt;p.life-=dt;}s.particles=s.particles.filter(p=>p.life>0);
 for(const r of s.rings){r.r+=r.max*dt*3;r.life-=dt;}s.rings=s.rings.filter(r=>r.life>0);
 for(const t of s.texts){t.y-=dt*37;t.life-=dt;}s.texts=s.texts.filter(t=>t.life>0);
 for(const b of s.beams)b.life-=dt;s.beams=s.beams.filter(b=>b.life>0);
 if(s.mode==='victory'||s.mode==='defeat'){if(s.resultWait>0){s.resultWait-=dt;if(s.resultWait<=0)showResult();}updateHud();return;}
 s.beatTime+=dt;const beat=Math.floor(s.beatTime/beatLength());if(beat!==s.beatIndex){s.beatIndex=beat-1;musicBeat();}
 movePlayer(dt);
 for(const t of s.targets){t.x=t.baseX+Math.sin(s.time*(s.phase===2?1.1:.7)+t.phase)*(W<700?16:34);t.y=t.baseY+Math.cos(s.time*.9+t.phase)*12;}
 if(s.mode==='telegraph'){
  s.telegraph-=dt;$('cast-fill').style.width=(1-s.telegraph/(s.phase===2?1.35:2.15))*100+'%';$('skill-clock').textContent='IN '+Math.max(0,s.telegraph).toFixed(1);
  if(s.telegraph<=0){s.mode='combat';s.spawn=.35;$('cast-title').textContent='技能释放 / '+skills[s.skillId].short;status('技能已释放。边躲弹幕，边完成反击！');}
 }else if(s.mode==='stun'||s.mode==='transition'){
  s.stun-=dt;$('skill-clock').textContent=s.mode==='transition'?'PHASE II':'STAGGER';if(s.stun<=0)nextSkill();
 }else if(s.mode==='combat'){
  s.skillTime+=dt;s.spawn-=dt;$('skill-clock').textContent=Math.max(0,skills[s.skillId].duration-s.skillTime).toFixed(1)+'s';
  if(s.spawn<=0){spawnPattern();s.spawn=s.phase===2?.67:.88;}
  if(heldFire||keys.has('Space'))fire();
  updateShots(dt);updateBullets(dt);
  if(s.mode==='combat'&&s.skillTime>=skills[s.skillId].duration){s.wrong++;s.combo=0;s.break=Math.max(0,s.break-15);hurtPlayer(8);if(s.mode==='combat'){say('这轮没接住？<br>那就试试下一招。');s.mode='stun';s.stun=1.0;s.bullets=[];s.shots=[];status('这一轮未完成。下一招即将开始。',2);}}
 }
 updateHud();
}
function movePlayer(dt){let dx=0,dy=0;if(keys.has('KeyA')||keys.has('ArrowLeft')||keys.has('left'))dx--;if(keys.has('KeyD')||keys.has('ArrowRight')||keys.has('right'))dx++;if(keys.has('KeyW')||keys.has('ArrowUp')||keys.has('up'))dy--;if(keys.has('KeyS')||keys.has('ArrowDown')||keys.has('down'))dy++;const length=Math.hypot(dx,dy);if(length){const speed=keys.has('ShiftLeft')?125:W<700?205:245;s.player.x+=dx/length*speed*dt;s.player.y+=dy/length*speed*dt;}s.player.x=clamp(s.player.x,18,W-18);s.player.y=clamp(s.player.y,22,H-19);s.player.trail.unshift({x:s.player.x,y:s.player.y});if(s.player.trail.length>10)s.player.trail.pop();}
function updateShots(dt){
 for(const shot of [...s.shots]){if(s.mode!=='combat')break;shot.trail.unshift({x:shot.x,y:shot.y});if(shot.trail.length>7)shot.trail.pop();if(shot.target&&!shot.target.collected){const a=Math.atan2(shot.target.y-shot.y,shot.target.x-shot.x);shot.vx=Math.cos(a)*760;shot.vy=Math.sin(a)*760;}shot.x+=shot.vx*dt;shot.y+=shot.vy*dt;shot.age+=dt;
  for(const t of s.targets){if(!t.collected&&distance(shot,t)<t.r+8){shot.age=10;hitTarget(shot,t);break;}}
 }
 s.shots=s.shots.filter(b=>b.age<2&&b.x> -30&&b.x<W+30&&b.y> -40&&b.y<H+30);
}
function updateBullets(dt){
 for(const b of s.bullets){b.age+=dt;b.x+=b.vx*dt;b.y+=b.vy*dt;const d=distance(b,s.player);if(d<b.r+s.player.r-2)hurtPlayer(6);else if(d<28&&!b.graze){b.graze=true;s.mp=Math.min(100,s.mp+2);s.score+=5;}}
 s.bullets=s.bullets.filter(b=>b.x> -45&&b.x<W+45&&b.y> -50&&b.y<H+45&&b.age<10);
}
function drawHeart(x,y,size,color){ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(x,y+size);ctx.bezierCurveTo(x-size*1.8,y-size*.15,x-size,y-size*1.6,x,y-size*.55);ctx.bezierCurveTo(x+size,y-size*1.6,x+size*1.8,y-size*.15,x,y+size);ctx.fill();}
function draw(){
 const cw=canvas.clientWidth,ch=canvas.clientHeight,dpr=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(cw*dpr)||canvas.height!==Math.round(ch*dpr)){canvas.width=Math.round(cw*dpr);canvas.height=Math.round(ch*dpr);}
 ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);ctx.clearRect(0,0,W,H);ctx.save();
 if(s.shake&&!reduced)ctx.translate(rand(-s.shake,s.shake),rand(-s.shake*.6,s.shake*.6));
 ctx.fillStyle='#070810';ctx.fillRect(-20,-20,W+40,H+40);
 // A quiet staff/grid becomes a moving field once the attack starts.
 ctx.strokeStyle='#242030';ctx.lineWidth=.6;for(let y=H*.16;y<H;y+=H*.145){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
 for(let i=0;i<32;i++){const x=(i*139.3)%W,y=(i*87.7+s.visualTime*(s.mode==='combat'?9:2))%H;ctx.fillStyle=i%3?'#52415b55':'#bda1cf55';ctx.fillRect(x,y,1.5,1.5);}
 if(s.mode==='telegraph'){const alpha=.13+.06*Math.sin(s.visualTime*8);ctx.fillStyle='rgba(237,100,136,'+alpha+')';ctx.fillRect(W*.42,0,W*.16,H);ctx.setLineDash([6,8]);ctx.strokeStyle='#ed648845';ctx.strokeRect(W*.42,4,W*.16,H-8);ctx.setLineDash([]);ctx.fillStyle='#ed6488';ctx.font=(W<700?'18':'14')+'px Consolas';ctx.textAlign='center';ctx.fillText('!! INCOMING !!',W*.5,H*.60);}
 if(s.skillId===3&&s.mode==='combat'){const strong=isStrong();ctx.fillStyle=strong?'#ffc36918':'#7bf0cf05';ctx.fillRect(0,H-35,W,35);ctx.fillStyle=strong?'#ffc369':'#655b72';ctx.textAlign='center';ctx.font=(W<700?'17':'12')+'px Consolas';ctx.fillText(strong?'DOWNBEAT · FIRE NOW':'WAIT FOR GOLD DOWNBEAT',W/2,H-13);}
 for(const t of s.targets){
  const selected=s.keyboardAim&&s.targets.filter(n=>!n.collected)[s.selectedTarget%Math.max(1,s.targets.filter(n=>!n.collected).length)]===t;
  const color=t.collected?'#7bf0cf':s.skillId===0||s.skillId===2?'#ffc369':s.skillId===1?'#a78cf5':'#7bf0cf';
  ctx.strokeStyle=color;ctx.lineWidth=selected?2.2:1.3;ctx.fillStyle=t.collected?'#18382b':'#171120';ctx.beginPath();ctx.arc(t.x,t.y,t.r,0,Math.PI*2);ctx.fill();ctx.stroke();
  if(selected){ctx.strokeStyle=color+'65';ctx.setLineDash([4,5]);ctx.beginPath();ctx.arc(t.x,t.y,t.r+7,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);}
  ctx.textAlign='center';ctx.fillStyle=color;ctx.font=(t.label.length>2?W<700?'16':'15':W<700?'25':'22')+'px Consolas';ctx.fillText(t.label,t.x,t.y+7);
  ctx.fillStyle='#958399';ctx.font=(W<700?'13':'10')+'px Consolas';const sub=t.collected?'LOCKED':s.skillId===0?'G7':s.skillId===1?(t.editable?'VOICE':'HOLD'):s.skillId===2?'CORE':t.correct?'I / TONIC':'vi';ctx.fillText(sub,t.x,t.y+t.r+17);
 }
 for(const b of s.bullets){ctx.save();ctx.translate(b.x,b.y);ctx.rotate(Math.sin(b.age*4+b.phase)*.16);ctx.shadowBlur=reduced?0:8;ctx.shadowColor=b.core?'#ffc369':'#ed6488';ctx.fillStyle=b.core?'#ffc369':'#ed6488';ctx.textAlign='center';ctx.font=(b.core?19:W<700?18:16)+'px Consolas';ctx.fillText(b.label,0,5);ctx.restore();}
 for(const shot of s.shots){ctx.strokeStyle=shot.color+'80';ctx.lineWidth=2;ctx.beginPath();shot.trail.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.lineTo(shot.x,shot.y);ctx.stroke();ctx.shadowBlur=12;ctx.shadowColor=shot.color;ctx.fillStyle=shot.color;ctx.beginPath();ctx.arc(shot.x,shot.y,shot.tool===3?6:4,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}
 for(const b of s.beams){ctx.globalAlpha=Math.min(1,b.life*3);ctx.lineWidth=b.life>.3?8:3;ctx.strokeStyle=b.color;ctx.shadowColor=b.color;ctx.shadowBlur=reduced?0:20;ctx.beginPath();ctx.moveTo(b.x1,b.y1);ctx.lineTo(b.x2,b.y2);ctx.stroke();ctx.shadowBlur=0;ctx.globalAlpha=1;}
 for(const r of s.rings){ctx.globalAlpha=Math.min(1,r.life*2);ctx.strokeStyle=r.color;ctx.lineWidth=2;ctx.beginPath();ctx.arc(r.x,r.y,r.r,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1;}
 for(const p of s.particles){ctx.globalAlpha=Math.min(1,p.life*2);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,p.size,p.size);ctx.globalAlpha=1;}
 if(s.mode!=='defeat'){
  if(!reduced)for(let i=s.player.trail.length-1;i>=0;i--){const p=s.player.trail[i];drawHeart(p.x,p.y,6,'rgba(123,240,207,'+(.13*(1-i/10))+')');}
  if(s.hurt===0||Math.floor(s.hurt*18)%2===0){ctx.shadowColor='#7bf0cf';ctx.shadowBlur=reduced?0:15;drawHeart(s.player.x,s.player.y,s.player.r,'#7bf0cf');ctx.shadowBlur=0;}
 }
 if(!s.keyboardAim&&s.mode==='combat'){ctx.strokeStyle=tools[s.tool].color+'99';ctx.lineWidth=1;const x=pointer.x,y=pointer.y;ctx.beginPath();ctx.moveTo(x-10,y);ctx.lineTo(x-4,y);ctx.moveTo(x+4,y);ctx.lineTo(x+10,y);ctx.moveTo(x,y-10);ctx.lineTo(x,y-4);ctx.moveTo(x,y+4);ctx.lineTo(x,y+10);ctx.stroke();}
 for(const t of s.texts){ctx.globalAlpha=Math.min(1,t.life*2);ctx.fillStyle=t.color;ctx.textAlign='center';ctx.font='bold '+t.size+'px Consolas';ctx.strokeStyle='#070810';ctx.lineWidth=4;ctx.strokeText(t.label,t.x,t.y);ctx.fillText(t.label,t.x,t.y);ctx.globalAlpha=1;}
 if(s.flash>0){ctx.fillStyle='rgba(255,230,175,'+s.flash*.28+')';ctx.fillRect(0,0,W,H);}ctx.restore();
}
function frame(now){const dt=last?Math.min((now-last)/1000,.034):0;last=now;if(s){update(dt);draw();}requestAnimationFrame(frame);}
function resizeWorld(){const nextW=canvas.clientWidth<650?520:960,nextH=Math.round(nextW*canvas.clientHeight/canvas.clientWidth);if(s&&(nextW!==W||nextH!==H)){const rx=nextW/W,ry=nextH/H;for(const arr of [s.targets,s.shots,s.bullets,s.particles])for(const o of arr){o.x*=rx;o.y*=ry;if(o.baseX!==undefined){o.baseX*=rx;o.baseY*=ry;}}s.player.x*=rx;s.player.y*=ry;s.player.trail=[];pointer.x*=rx;pointer.y*=ry;}W=nextW;H=nextH;draw();}
function pointerWorld(e){const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.x)/r.width*W,y:(e.clientY-r.y)/r.height*H};}
function pause(value=!s.paused){if(['intro','victory','defeat'].includes(s.mode))return;s.paused=value;keys.clear();heldFire=false;dragSoul=false;$('pause-overlay').hidden=!value;$('pause').textContent=value?'▶':'Ⅱ';if(value)stopSound();else bootAudio();}
canvas.addEventListener('pointermove',e=>{const p=pointerWorld(e);pointer={...p,active:true};if(e.pointerType!=='touch')s.keyboardAim=false;if(dragSoul&&!s.paused){s.player.x=clamp(p.x,18,W-18);s.player.y=clamp(p.y,22,H-19);}});
canvas.addEventListener('pointerdown',e=>{if(s.paused)return;e.preventDefault();canvas.focus({preventScroll:true});pointer={...pointerWorld(e),active:true};s.keyboardAim=false;if(e.pointerType==='touch'&&distance(pointer,s.player)<45){dragSoul=true;capturePointer(canvas,e.pointerId);}else{heldFire=e.pointerType!=='touch';fire();}});
canvas.addEventListener('pointerup',()=>{heldFire=false;dragSoul=false;});canvas.addEventListener('pointercancel',()=>{heldFire=false;dragSoul=false;});window.addEventListener('pointerup',()=>{heldFire=false;dragSoul=false;});
window.addEventListener('keydown',e=>{if($('guide').open||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','Tab'].includes(e.code)&&s.mode!=='intro')e.preventDefault();if(e.code==='KeyP'||e.code==='Escape'){if(!e.repeat)pause();return;}if(/^Digit[1-4]$/.test(e.code)){selectTool(Number(e.code.slice(-1))-1);return;}if(e.code==='Tab'&&s.mode!=='intro'){s.keyboardAim=true;s.selectedTarget++;return;}if(e.code==='Space'&&s.mode==='intro'&&!e.repeat){begin();return;}if(e.code==='Space'&&!e.repeat)fire();keys.add(e.code);});
window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>{keys.clear();heldFire=false;if(s&&s.mode!=='intro')pause(true);});
for(const b of document.querySelectorAll('[data-tool]'))b.onclick=()=>{selectTool(+b.dataset.tool);canvas.focus({preventScroll:true});};
for(const b of document.querySelectorAll('[data-move]')){b.onpointerdown=e=>{e.preventDefault();capturePointer(b,e.pointerId);keys.add(b.dataset.move);};b.onpointerup=()=>keys.delete(b.dataset.move);b.onpointercancel=()=>keys.delete(b.dataset.move);}
$('mobile-fire').onpointerdown=e=>{e.preventDefault();capturePointer($('mobile-fire'),e.pointerId);s.keyboardAim=true;heldFire=true;fire();};$('mobile-fire').onpointerup=()=>heldFire=false;$('mobile-fire').onpointercancel=()=>heldFire=false;
$('start').onclick=begin;$('pause').onclick=()=>pause();$('resume').onclick=()=>pause(false);$('retry').onclick=()=>{initialize();begin();};$('restart').onclick=()=>{initialize();begin();};
$('sound').onclick=()=>{bootAudio();muted=!muted;if(bus)bus.gain.setTargetAtTime(muted?0:.30,audio.currentTime,.02);$('sound').setAttribute('aria-pressed',String(!muted));$('sound').textContent=muted?'♪ 静音':'♫ 声音';};
let wasPlaying=false;$('help').onclick=()=>{wasPlaying=!s.paused&&s.mode!=='intro';pause(true);$('guide').showModal();};$('close-help').onclick=()=>$('guide').close();$('close-help-bottom').onclick=()=>$('guide').close();$('guide').addEventListener('close',()=>{if(wasPlaying)pause(false);wasPlaying=false;});
window.addEventListener('resize',resizeWorld);
// Read-only telemetry for reproducible browser checks and future tuning; no mutation API.
window.JCBossRPG=Object.freeze({snapshot:()=>({mode:s.mode,paused:s.paused,phase:s.phase,bossHp:s.bossHp,hp:s.hp,mp:s.mp,tool:s.tool,round:s.round,skillId:s.skillId,skillTime:s.skillTime,bulletCount:s.bullets.length,shots:s.shots.length,player:{x:s.player.x,y:s.player.y},wins:s.wins,hits:s.hits,wrong:s.wrong,break:s.break,strongBeat:isStrong(),width:W,height:H,targets:s.targets.map(t=>({x:t.x,y:t.y,label:t.label,core:t.core,editable:t.editable,correct:t.correct,collected:t.collected})),bullets:s.bullets.map(b=>({x:b.x,y:b.y,core:b.core,label:b.label}))})});
initialize();resizeWorld();requestAnimationFrame(frame);
})();

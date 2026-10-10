/* JC Boss Lab — standalone prototype. No build step, no external dependency.
 * Character textures are reused from the existing char library at their full 800×800 size.
 * Web Audio envelopes follow the project's audio_engine.js approach; this isolated demo
 * uses local synthesis so it also runs when opened directly with file://.
 */
(() => {
'use strict';
const $ = id => document.getElementById(id);
const mod = n => ((n % 12) + 12) % 12;
const names = ['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];
const pitchName = midi => names[mod(midi)] + (Math.floor(midi / 12) - 1);
const data = {
  jaz: {id:'04_jaz', number:'04', name:'JAZ', cn:'爵', tag:'即兴之王', chapter:'CHAPTER 04 / THE JAZZ CLUB', title:'少，即是锋芒', mode:'STRIP / 剥离战', kicker:'GUIDE TONE ARENA', arena:'留下骨架，让和声继续。', opening:'9！11！13！<br>再来个 ♯11！这才叫爵士！', question:'音符越多，就越厉害？', encounter:'爵士俱乐部 · 道中遭遇', belief:'“复杂，才是高级。”', story:'他用密集的音符占满舞台。你要做的，是让他亲耳听到：<br>即使只剩两个音，音乐依然成立。', bottom:'MUTE THE NOISE. KEEP THE SOUL.', bpm:96, result:'两个音，也能撑起整个世界。', ending:'……等等。<br>你刚刚，只用了两个音？', final:'让 ii – V – I 只用低音与两个核心音，完整解决。', help:[['剥离','点击外围音符，或按住鼠标 / 手指划过它们。每删一个音，下一拍的和弦就少一个音。'],['保住核心','绿色音符是当前 3rd 和 7th。误删会让和声失去骨架；点击虚线音符可恢复。'],['第二阶段','沿 ii – V – I 连接核心声部。点击绿色音符，或把它向上 / 下拖一格，让 C → B、F → E。']]},
  mimi: {id:'01_mimi', number:'01', name:'MIMI', cn:'米米', tag:'基础守门人', chapter:'CHAPTER 01 / PRECISION MATTERS', title:'认真，才是答案', mode:'FIX / 实时修谱', kicker:'LIVE SCORE ARENA', arena:'把音乐，修回原来的样子。', opening:'这么简单。<br>看一眼，就应该会了吧？', question:'基础简单，就能随便？', encounter:'基础守门人 · 精确战', belief:'“基础这么简单，看一眼就该会。”', story:'她把正在播放的短谱悄悄打乱。<br>你慢慢数、仔细听，亲手让每一个音回到正确的位置。', bottom:'TAKE YOUR TIME. MAKE IT RIGHT.', bpm:88, result:'认真确认，也是一种力量。', ending:'……你真的一个一个数了？<br>好吧。不是蒙的。我认输。', final:'完整演奏你修复的旋律，把“认真”变成证据。', help:[['先听原句','点击「听原句」对照旋律，半透明音符是原句的位置。'],['修正谱面','上下拖动音符改变音高；点击选中后也可用方向键或底部按钮微调。第二阶段还要拖音符右侧的时值手柄。'],['专注不扣分','按住 F 或「专注」减慢音乐，显示更清楚的参照位置。所有音高与时值恢复时，会自动形成音乐证据。']]},
  zero: {id:'06_zero', number:'06', name:'ZERO', cn:'零', tag:'结构研究者', chapter:'CHAPTER 06 / BEYOND TONALITY', title:'关系，即是秩序', mode:'PARRY / 动机反制', kicker:'PITCH CLASS ARENA', arena:'用他的规则，接住这段动机。', opening:'音名可以消失。<br>关系，依然存在。', question:'当音名消失，你还能听见关系吗？', encounter:'终极实验室 · 结构战', belief:'“你理解的是标签，还是结构？”', story:'他把动机写成一条攻击轨迹。<br>移调、镜像、反转时间，让你的音乐与他的结构锁合。', bottom:'FIND THE RELATION. RETURN THE MOTIF.', bpm:80, result:'音名消失了，结构依然成立。', ending:'成立。<br>你听到的，是关系。', final:'让最后一次变换得到的动机与目标完整重合。', help:[['观察与听','绿色虚线和上方「目标」是 ZERO 的动机；实线是你的动机。可随时听目标作对照。'],['变换结构','T 滑杆移调；I 镜像每个音级，R 反转音符顺序。可组合操作，变换顺序固定为 I → R → T。'],['反制','当两个动机的音级与顺序完全相同时，点击 PARRY。第二阶段移除 C、D 等音名，仍可依据节点关系操作。']]}
};
const state = {boss:'jaz', started:false, playing:false, muted:false, evidence:0, errors:0, streak:0, phase:1, locked:false, won:false, focus:false, beat:0, nextAt:0, sceneTime:0, last:0, freezeUntil:0, selected:0};
let game = {}, audio = null, master = null, voices = new Set(), timers = new Set(), imageToken = 0, tracing = false, lastPoint = null;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
function later(fn, ms) { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); return t; }
function clearTimers() { for (const t of timers) clearTimeout(t); timers.clear(); }
function canAct() { return state.started && !state.locked && !state.won; }
function bootAudio() {
  if (!audio) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audio = new Ctx(); master = audio.createGain(); master.gain.value = state.muted ? 0 : .24;
    const compressor = audio.createDynamicsCompressor(); compressor.threshold.value = -24; compressor.ratio.value = 5;
    master.connect(compressor); compressor.connect(audio.destination);
  }
  audio.resume().catch(() => {});
}
function stopSound() {
  if (!audio) return;
  for (const voice of voices) { try { voice.stop(audio.currentTime + .015); } catch (_) {} }
  voices.clear();
}
function tone(midi, duration = .45, volume = .25, offset = 0, type = 'piano') {
  if (!audio || state.muted) return;
  const start = audio.currentTime + offset, freq = 440 * 2 ** ((midi - 69) / 12);
  // Bounded harmonic voices and a shared compressor keep dense JAZ voicings comfortable.
  const harmonics = type === 'piano' ? [[1,1],[2,.24],[3,.10]] : [[1,1]];
  for (const [partial, amp] of harmonics) {
    const osc = audio.createOscillator(), gain = audio.createGain(); osc.type = 'sine'; osc.frequency.value = freq * partial;
    gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(volume * amp, start + .008);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    osc.connect(gain); gain.connect(master); voices.add(osc); osc.start(start); osc.stop(start + duration + .04);
    osc.onended = () => { voices.delete(osc); osc.disconnect(); gain.disconnect(); };
  }
}
function chord(notes, duration = .7, offset = 0) { notes.forEach((n,i) => tone(n,duration,.4 / Math.sqrt(notes.length),offset + i * .012)); }
function previewSequence(notes, speed = .24) { stopSound(); notes.forEach((n,i) => tone(n,.45,.36,i * speed)); }
function say(text) { $('dialogue').innerHTML = text; }
function sprite(path) {
  const c = data[state.boss], token = ++imageToken, img = new Image(); img.src = c.id + '/' + path + '.png';
  img.onload = () => { if (token === imageToken) { $('character').src = img.src; $('character').alt = c.cn + ' · ' + path.split('/').pop(); } };
}
function animateClass(el, name, duration) { el.classList.remove(name); void el.offsetWidth; el.classList.add(name); later(() => el.classList.remove(name), duration); }
function impact(word, sub = '') {
  $('impact').innerHTML = word + (sub ? '<small>' + sub + '</small>' : ''); animateClass($('impact'),'show',1000);
  animateClass($('arena'),'flash',500); state.freezeUntil = performance.now() + (reduceMotion ? 0 : 80);
}
function updateMeters() {
  const value = state.won ? 0 : Math.max(10,100 - state.evidence * 14);
  $('conviction-value').innerHTML = value + '<small>%</small>'; $('conviction-fill').style.width = value + '%';
  $('evidence-count').textContent = '音乐证据 ' + String(state.evidence).padStart(2,'0') + ' / 06';
  const amount = state.won || state.evidence === 6 ? 3 : state.streak;
  $('break-value').textContent = amount + ' / 3';
  document.querySelectorAll('.break-segments i').forEach((x,i) => x.classList.toggle('active',i < amount));
  $('phase-pill').innerHTML = 'PHASE <b>' + String(state.phase).padStart(2,'0') + '</b> / 02';
}
function evidence(message) {
  if (!canAct()) return;
  state.locked = true; state.evidence++; state.streak = Math.min(3,state.streak + 1);
  const phaseBreak = state.evidence === 3; const isBreak = phaseBreak || state.streak === 3;
  impact(isBreak ? 'BREAK' : 'RESONANCE',isBreak ? '你的音乐，让执念出现裂缝。' : '音乐证据 +' + 1);
  sprite(isBreak ? 'expressions/shocked' : 'expressions/hurt'); animateClass($('character-motion'),'hit',700);
  say(message); updateMeters(); stopSound();
  if (state.boss === 'jaz') chord([48,...game.core.filter(x=>!x.removed).map(x=>x.midi)],1);
  else if (state.boss === 'mimi') previewSequence(game.target.map(x=>scale[x.pitch]),.14);
  else previewSequence(game.target.map(x=>60+x),.16);
  $('instruction').textContent = state.evidence === 6 ? data[state.boss].final : (phaseBreak ? '破防。对手开始认真了；进入第二阶段，继续用音乐证明。' : '这一段音乐已经成立。继续争夺下一段。');
  const buttonText = state.evidence === 6 ? 'FINISHER · 最后一击 ↗' : phaseBreak ? '进入第二阶段 →' : '继续下一段 →';
  $('game-controls').innerHTML = '<span class="control-caption">' + (state.evidence===6 ? '执念即将瓦解 · 让音乐自己说话' : '证据已成立 · 你可以先听完这一句') + '</span><div class="control-group"><button class="action '+(state.evidence===6?'finisher-ready':'')+'" id="continue">'+buttonText+'</button></div>';
  $('continue').onclick = () => {
    if (state.evidence === 6) { finish(); return; }
    clearTimers(); stopSound(); $('impact').classList.remove('show'); $('character-motion').classList.remove('hit'); $('arena').classList.remove('flash','counter');
    if (phaseBreak) {state.phase = 2; state.streak=0; sprite('boss/phase2'); say(state.boss==='jaz'?'好啊。那就让和弦继续走。<br>别把骨架也拆了。':state.boss==='mimi'?'那就连时值一起数。<br>看你这次还会不会这么认真。':'音名，取消。<br>现在，只看关系。');} else sprite(state.phase===2?'boss/phase2':'poses/idle');
    state.locked = false; game = {}; buildRound(); updateMeters(); state.nextAt = performance.now() + 100;
  };
}
function counter(message) {
  if (!canAct()) return;
  state.errors++; state.streak=0; say(message); updateMeters(); sprite('expressions/mocking');
  animateClass($('arena'),'counter',450); chord([48,61,66],.45);
}
function finish() {
  if (state.won || state.evidence !== 6) return;
  clearTimers(); stopSound(); state.won = true; state.playing=false; state.locked=true; document.body.classList.add('won');
  sprite('endings/' + (state.errors===0?'three_star':state.errors<=3?'two_star':'one_star')); say(data[state.boss].ending); updateMeters();
  impact('FINISH', '用音乐，击碎执念。');
  if (state.boss==='jaz') { chord([38,53,60],.9); chord([43,53,59],.9,.8); chord([48,52,59],1.8,1.6); }
  else if (state.boss==='mimi') previewSequence(game.target.map(x=>scale[x.pitch]),.28);
  else previewSequence(game.target.map(x=>60+x),.35);
  $('transport-label').textContent='演出结束'; $('play').disabled=true; $('play').textContent='▶';
  $('game-controls').innerHTML='<span class="control-caption">音乐已经替你说完了。</span>';
  const stars = state.errors===0?3:state.errors<=3?2:1;
  $('stars').textContent=Array.from({length:3},(_,i)=>i<stars?'✦':'·').join(' ');
  $('result-title').textContent=data[state.boss].result;
  $('result-description').innerHTML='6 段音乐证据 · '+state.errors+' 次反击<br>'+(state.errors===0?'完美演出。每一步选择，都有理由。':'你让音乐重新成立。再试一次，听见每一步的理由。');
  $('break-caption').textContent='执念瓦解。音乐继续。'; later(()=>{$('result').hidden=false;},1800);
}
function setFocus(on) {
  state.focus = on && state.boss==='mimi' && canAct(); document.body.classList.toggle('focus-on',state.focus);
  const b=$('focus'); if(b) b.classList.toggle('active',state.focus);
  if(state.boss==='mimi') { const badge=document.querySelector('.focus-badge'); if(badge) badge.textContent=state.focus?'FOCUS / 慢慢数，不扣分':'LIVE SCORE / 拖动音符'; }
}
function reset(boss = state.boss) {
  clearTimers(); stopSound(); imageToken++; tracing=false; lastPoint=null;
  Object.assign(state,{boss,started:false,playing:false,evidence:0,errors:0,streak:0,phase:1,locked:false,won:false,focus:false,beat:0,sceneTime:0,freezeUntil:0,selected:0}); game={};
  document.body.dataset.boss=boss; document.body.classList.remove('won','paused','focus-on');
  $('result').hidden=true; $('start-overlay').hidden=false; $('play').disabled=true; $('play').textContent='Ⅱ';
  $('impact').classList.remove('show'); $('arena').classList.remove('flash','counter'); $('character-motion').classList.remove('hit'); $('fx').innerHTML='';
  const c=data[boss];
  const texts={chapter:c.chapter,'mode-label':c.mode,'arena-kicker':c.kicker,'arena-title':c.arena,'boss-tag':c.tag,'ghost-name':c.name,'dialogue-name':'— '+c.name,'understory-number':c.number,belief:c.belief,'bottom-hint':c.bottom,tempo:c.bpm+' BPM'};
  for(const [id,text] of Object.entries(texts)) $(id).textContent=text;
  $('title').innerHTML=c.title+'<span>。</span>'; $('boss-name').innerHTML=c.name+'<span>'+c.cn+'</span>'; $('story').innerHTML=c.story;
  $('key-label').textContent=boss==='zero'?'SYSTEM / 12 PITCH CLASSES':'KEY / C MAJOR';
  document.querySelector('.start-number').textContent=c.number; document.querySelector('#start-overlay>p').textContent=c.encounter; document.querySelector('#start-overlay>h3').textContent=c.question;
  $('break-caption').textContent='连续制造音乐证据，动摇他的确信。'; $('transport-label').textContent='等待入场';
  document.querySelectorAll('[data-select]').forEach(b=>{b.classList.toggle('active',b.dataset.select===boss);b.setAttribute('aria-pressed',String(b.dataset.select===boss));});
  $('help-content').innerHTML=c.help.map(([title,text],i)=>'<div class="guide-step"><b>0'+(i+1)+'</b><p><strong>'+title+'</strong>'+text+'</p></div>').join('');
  const next={jaz:'zero',zero:'mimi',mimi:'jaz'}[boss]; $('next-boss').textContent='下一场 · '+data[next].name+' →'; $('next-boss').onclick=()=>reset(next);
  say(c.opening); sprite('poses/idle'); buildRound(); updateMeters();
  if(location.hash!== '#'+boss) history.replaceState(null,'','#'+boss);
}
function start() { bootAudio(); state.started=true; state.playing=true; state.nextAt=performance.now(); $('start-overlay').hidden=true; $('play').disabled=false; $('transport-label').textContent='音乐正在发生'; }
function buildRound() { setFocus(false); if(state.boss==='jaz') buildJaz(); else if(state.boss==='mimi') buildMimi(); else buildZero(); }

// JAZ: remove ornament notes; preserve and connect actual guide tones through ii–V–I.
const changes=[{name:'Dm7',bass:38,notes:[53,60],roles:['3rd','7th'],extras:[[64,'9'],[67,'11'],[71,'13'],[74,'9'],[57,'5'],[62,'R']]},{name:'G7',bass:43,notes:[53,59],roles:['7th','3rd'],extras:[[64,'13'],[69,'9'],[73,'♯11'],[76,'13'],[62,'5'],[67,'R']]},{name:'Cmaj7',bass:48,notes:[52,59],roles:['3rd','7th'],extras:[[62,'9'],[66,'♯11'],[69,'13'],[74,'9'],[55,'5'],[60,'R']]}];
function buildJaz() {
  const r=state.evidence%3, c=changes[r], prev=r===0?c:changes[r-1];
  game={chord:r, extras:c.extras.map(([midi,role],i)=>({midi,role,active:true,angle:-Math.PI/2+i*Math.PI/3})), core:c.notes.map((midi,i)=>({midi:state.phase===2?prev.notes[i]:midi,target:midi,role:c.roles[i],removed:false})), progress:0};
  $('instruction').textContent=state.phase===1?'按住并划过外围音符，或逐个点击剥离；保留绿色的 3rd 与 7th。':r===0?'再听一次骨架：剥离外围音符，然后让它沿 ii – V – I 继续。':'剥离装饰音；把虚线核心音向下拖一格，或点击它，让声部平滑解决。';
  renderJaz();
  $('game-controls').innerHTML='<div class="progression">'+changes.map((x,i)=>'<span class="'+(i===r?'active':'')+'">'+x.name+'</span>'+(i<2?'<i>→</i>':'')).join('')+'</div><div class="control-group"><button id="audition" class="action">♫ 听当前和弦</button></div>';
  $('audition').onclick=()=>{if(!state.started)start();stopSound();chord(jazNotes(),1.4);};
}
function jazNotes() { return [changes[game.chord].bass,...game.core.filter(x=>!x.removed).map(x=>x.midi),...game.extras.filter(x=>x.active).map(x=>x.midi)]; }
function renderJaz() {
  const c=changes[game.chord];
  $('game-content').innerHTML='<div class="orbital"></div><div class="orbital outer"></div><div class="chord-core"><small>CURRENT HARMONY</small><strong>'+c.name+'</strong><span>'+game.extras.filter(x=>x.active).length+' 装饰音 / 2 核心音</span></div>'+game.extras.map((x,i)=>x.active?'<button class="note-orb extra" data-extra="'+i+'" aria-label="剥离 '+pitchName(x.midi)+' '+x.role+'"><b>'+names[mod(x.midi)]+'</b><small>'+x.role+'</small></button>':'').join('')+game.core.map((x,i)=>'<button class="note-orb core '+(x.removed||x.midi!==x.target?'pending':'')+'" data-core="'+i+'" style="left:'+(i===0?40:60)+'%;top:'+(i===0?34:66)+'%" aria-label="'+(x.removed?'恢复':x.midi!==x.target?'连接':'保留')+'核心音 '+pitchName(x.midi)+'"><b>'+(x.removed?'+':names[mod(x.midi)])+'</b><small>'+x.role+(x.midi!==x.target?' ↓':'')+'</small></button>').join('')+'<span class="arena-caption">MUTE / 划过音符</span><span class="arena-caption right">3rd + 7th / 骨架</span>';
  positionOrbs();
  document.querySelectorAll('[data-extra]').forEach(b=>{b.onpointerdown=e=>{if(!canAct())return;e.preventDefault();tracing=true;lastPoint={x:e.clientX,y:e.clientY};muteExtra(Number(b.dataset.extra));};b.onclick=()=>muteExtra(Number(b.dataset.extra));});
  document.querySelectorAll('[data-core]').forEach(b=>{
    const i=Number(b.dataset.core);let sy=null;
    b.onpointerdown=e=>{if(!canAct())return;sy=e.clientY;b.setPointerCapture(e.pointerId);e.stopPropagation();};
    b.onpointerup=e=>{if(!canAct()||sy===null)return;const x=game.core[i],delta=e.clientY-sy;sy=null;
      if(x.removed){x.removed=false;tone(x.midi);renderJaz();say('嗯。骨架回来了。');checkJaz();return;}
      if(x.midi!==x.target){if(delta>-8){x.midi=x.target;tone(x.midi);renderJaz();checkJaz();}else{counter('声部该向下解决。<br>先听它想去哪里。');}return;}
      x.removed=true;renderJaz();counter('哈哈！你连骨头都拆了！<br>听听看，功能感还在吗？');stopSound();chord(jazNotes(),1.2);
    };
    b.onpointercancel=()=>{sy=null;};
    b.onclick=e=>{if(e.detail===0&&canAct()){const x=game.core[i];if(x.removed){x.removed=false;}else if(x.midi!==x.target){x.midi=x.target;}else{x.removed=true;counter('你把和声的骨架拆掉了。<br>点击虚线音符，先把它恢复。');}renderJaz();checkJaz();}};
  });
}
function positionOrbs() {
  if(state.boss!=='jaz'||!game.extras)return;
  const w=$('arena').clientWidth,h=$('arena').clientHeight,rx=Math.min(w*.37,215),ry=Math.min(h*.36,140);
  document.querySelectorAll('[data-extra]').forEach(b=>{const x=game.extras[Number(b.dataset.extra)],a=x.angle+(reduceMotion?0:state.sceneTime*.10);b.style.left=(w/2+Math.cos(a)*rx)+'px';b.style.top=(h/2+Math.sin(a)*ry)+'px';});
}
function muteExtra(i) {
  if(!canAct()||!game.extras[i].active)return;
  const b=document.querySelector('[data-extra="'+i+'"]');if(b){const r=b.getBoundingClientRect();burst(r.x+r.width/2,r.y+r.height/2);}
  game.extras[i].active=false;stopSound();chord(jazNotes(),.55);renderJaz();checkJaz();
}
function checkJaz() {
  if(game.extras.some(x=>x.active)||game.core.some(x=>x.removed||x.midi!==x.target))return;
  evidence(['……只是把音删掉而已。<br>下一段呢？','等一下。<br>属和弦，居然还这么清楚？','你刚刚——<br>只用了两个音？','好，那就让它们继续走。','C 到 B。<br>你连半音的连接都留下了。','……行。<br>最后，把它完整弹给我听。'][state.evidence]);
}

// MIMI: real staff positions in C major, direct pitch and duration editing.
const scale=[60,62,64,65,67,69,71,72,74,76,77];
const melodies=[[0,2,4,5,4,2,1,0],[0,1,2,4,3,2,1,0],[4,5,6,7,6,5,4,2],[0,2,4,7,5,4,2,0],[2,3,4,5,4,3,2,0],[0,4,2,5,3,6,7,0]];
function buildMimi() {
  const r=state.evidence, pitches=melodies[r], durations=[1,1,1,1,1,1,1,1];
  game={target:pitches.map((pitch,i)=>({pitch,duration:durations[i]})),notes:pitches.map((pitch,i)=>({pitch,duration:durations[i]}))};
  const bad=[2,4,6,3,5,1][r];game.notes[bad].pitch=Math.min(10,game.notes[bad].pitch+1); if(state.phase===2)game.notes[(bad+2)%8].duration=.5;
  state.selected=bad;
  $('instruction').textContent=state.phase===1?'先听原句；上下拖动音符修正音高。按住 F 专注，慢慢数，不扣分。':'音高和时值都被改过：上下拖音符、左右拖右侧手柄，修复原句。';
  renderMimi();
  $('game-controls').innerHTML='<span class="control-caption">选中音符后 ↑ ↓ 改音高'+(state.phase===2?' · ← → 改时值':'')+'</span><div class="control-group"><button id="pitch-up" title="音高上移">↑</button><button id="pitch-down" title="音高下移">↓</button>'+(state.phase===2?'<button id="duration" title="切换半拍或一拍">½ / 1</button>':'')+'<button id="reference">♫ 听原句</button><button id="focus" class="action">按住 F · 专注</button></div>';
  $('pitch-up').onclick=()=>editPitch(1);$('pitch-down').onclick=()=>editPitch(-1);if($('duration'))$('duration').onclick=()=>editDuration();
  $('reference').onclick=()=>{if(!state.started)start();game.referenceUntil=performance.now()+2400;previewSequence(game.target.map(x=>scale[x.pitch]),state.focus?.4:.25);};
  $('focus').onpointerdown=e=>{e.preventDefault();$('focus').setPointerCapture(e.pointerId);setFocus(true);};$('focus').onpointerup=()=>setFocus(false);$('focus').onpointercancel=()=>setFocus(false);
}
function noteY(pitch) { return 78-pitch*5; }
function renderMimi() {
  let svg='<svg class="staff-svg" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">';
  for(let i=0;i<5;i++)svg+='<line x1="65" x2="950" y1="'+(112+i*40)+'" y2="'+(112+i*40)+'"/>';
  svg+='<text x="25" y="205" style="font-size:48px;fill:var(--accent)">𝄞</text><text x="73" y="232" style="font-size:18px">4</text><text x="73" y="253" style="font-size:18px">4</text><line x1="535" x2="535" y1="112" y2="272"/><line x1="940" x2="940" y1="112" y2="272"/>';
  for(let i=0;i<8;i++){const x=14+i*10.2;svg+='<line class="focus-line" x1="'+(x*10)+'" x2="'+(x*10)+'" y1="95" y2="320"/>';if(game.notes[i].pitch===0)svg+='<line x1="'+(x*10-19)+'" x2="'+(x*10+19)+'" y1="312" y2="312"/>';}
  svg+='</svg>';
  const notes=(list,target)=>list.map((n,i)=>'<'+(target?'div':'button')+' class="staff-note '+(target?'target':i===state.selected?'selected':'')+(n.duration===.5?' short':'')+'" '+(target?'':'data-note="'+i+'" aria-label="音符 '+(i+1)+' '+pitchName(scale[n.pitch])+' '+n.duration+' 拍"')+' style="left:'+(14+i*10.2)+'%;top:calc('+noteY(n.pitch)+'% - 12px)">'+(!target&&n.duration===.5?'<span class="eighth-flag" aria-hidden="true"></span>':'')+(target?'':'<span class="pitch">'+pitchName(scale[n.pitch])+' · '+n.duration+'</span>')+(!target&&state.phase===2?'<span class="duration-handle" data-duration="'+i+'">'+n.duration+'</span>':'')+'</'+(target?'div':'button')+'>').join('');
  $('game-content').innerHTML=svg+notes(game.target,true)+notes(game.notes,false)+'<div class="staff-cursor" id="staff-cursor"></div><span class="focus-badge">'+(state.focus?'FOCUS / 慢慢数，不扣分':'LIVE SCORE / 拖动音符')+'</span><span class="score-label">C MAJOR · 4/4</span><span class="arena-caption">半透明音符 / 原句参照</span><span class="arena-caption right">REPAIR / 修正</span>';
  document.querySelectorAll('[data-note]').forEach(b=>{
    const index=Number(b.dataset.note);let drag=null;
    b.onpointerdown=e=>{if(!canAct())return;e.preventDefault();state.selected=index;const n=game.notes[index];drag={x:e.clientX,y:e.clientY,pitch:n.pitch,duration:n.duration,handle:e.target.hasAttribute('data-duration')};b.setPointerCapture(e.pointerId);document.querySelectorAll('[data-note]').forEach(n=>n.classList.toggle('selected',n===b));};
    b.onpointermove=e=>{if(!drag||!canAct())return;const n=game.notes[index];
      if(drag.handle){n.duration=e.clientX-drag.x>10?1:e.clientX-drag.x< -10?.5:drag.duration;b.classList.toggle('short',n.duration===.5);b.querySelector('.duration-handle').textContent=n.duration;}
      else{const unit=$('arena').clientHeight*.05;n.pitch=Math.max(0,Math.min(10,drag.pitch-Math.round((e.clientY-drag.y)/unit)));b.style.top='calc('+noteY(n.pitch)+'% - 12px)';}
      b.querySelector('.pitch').textContent=pitchName(scale[n.pitch])+' · '+n.duration;
    };
    b.onpointerup=()=>{if(!drag)return;const prev=drag;drag=null;const n=game.notes[index];if(n.pitch!==prev.pitch||n.duration!==prev.duration){tone(scale[n.pitch]);renderMimi();checkMimi();}};
    b.onpointercancel=()=>{if(drag){game.notes[index].pitch=drag.pitch;game.notes[index].duration=drag.duration;drag=null;renderMimi();}};
    b.onclick=e=>{if(e.detail===0){state.selected=index;renderMimi();}};
  });
}
function editPitch(delta) { if(!canAct())return;const n=game.notes[state.selected];n.pitch=Math.max(0,Math.min(10,n.pitch+delta));tone(scale[n.pitch]);renderMimi();checkMimi(); }
function editDuration(value) { if(!canAct()||state.phase!==2)return;const n=game.notes[state.selected];n.duration=value??(n.duration===1?.5:1);renderMimi();checkMimi(); }
function checkMimi() {
  if(game.notes.every((n,i)=>n.pitch===game.target[i].pitch&&n.duration===game.target[i].duration)){setFocus(false);evidence(['嗯。至少不是乱猜。','……你真有在听。','你真的一个一个数了？','连时值也确认了。','……原来慢慢来也能这么准。','好吧。<br>基础简单，不代表可以随便。'][state.evidence]);}
  else if(game.notes.some((n,i)=>Math.abs(n.pitch-game.target[i].pitch)>1||n.duration!==game.target[i].duration&&state.phase===1))counter('再听一遍。<br>音乐会告诉你，它想回到哪里。');
}

// ZERO: exact ordered pitch-class transforms. I/R/T are composable, not answer labels.
const baseMotif=[0,2,5,1], zeroChallenges=[{t:3,i:false,r:false},{t:0,i:true,r:false},{t:0,i:false,r:true},{t:5,i:true,r:false},{t:2,i:false,r:true},{t:7,i:true,r:true}];
function transformMotif(motif,t=0,invert=false,reverse=false){let out=motif.map(x=>mod((invert?-x:x)+t));return reverse?out.reverse():out;}
function currentMotif(){return transformMotif(baseMotif,game.t,game.invert,game.reverse);}
function buildZero() {
  const target=zeroChallenges[state.evidence];game={t:0,invert:false,reverse:false,target:transformMotif(baseMotif,target.t,target.i,target.r)};
  $('instruction').textContent=state.phase===1?'绿色虚线是目标，实线是你的动机。移调、镜像、反转，让音级与顺序完全重合。':'音名已被移除。用移调、镜像与时间反转，保持动机的关系和顺序。';
  renderZero();
  $('game-controls').innerHTML='<label class="transform-slider" for="transpose">T <input id="transpose" type="range" min="0" max="11" value="0" aria-label="移调半音数"><b id="t-value">0</b></label><div class="control-group"><button id="inversion" aria-pressed="false">I 镜像</button><button id="retrograde" aria-pressed="false">R 反转</button><button id="target-audio">♫ 目标</button><button id="parry" class="action">PARRY ↗</button></div>';
  $('transpose').oninput=()=>{if(!canAct())return;game.t=Number($('transpose').value);$('t-value').textContent=game.t;renderZero();previewSequence(currentMotif().map(x=>60+x),.12);game.referenceUntil=performance.now()+800;};
  $('inversion').onclick=()=>{if(!canAct())return;game.invert=!game.invert;syncZero();};$('retrograde').onclick=()=>{if(!canAct())return;game.reverse=!game.reverse;syncZero();};
  $('target-audio').onclick=()=>{if(!state.started)start();game.referenceUntil=performance.now()+1400;previewSequence(game.target.map(x=>60+x),.28);};
  $('parry').onclick=()=>{if(!canAct())return;const yours=currentMotif();if(yours.every((x,i)=>x===game.target[i]))evidence(state.evidence===5?'成立。<br>最后，把关系完整地还给我。':['移调。关系保持。','镜像。距离对称。','时间反转。结构仍在。','音名取消，关系依然保持。','顺序也是结构的一部分。'][state.evidence]);else counter('没有锁合。<br>比较每个节点，也比较先后顺序。');};
}
function syncZero(){ $('inversion').classList.toggle('active',game.invert);$('retrograde').classList.toggle('active',game.reverse);$('inversion').setAttribute('aria-pressed',String(game.invert));$('retrograde').setAttribute('aria-pressed',String(game.reverse));renderZero();previewSequence(currentMotif().map(x=>60+x),.17);game.referenceUntil=performance.now()+1000; }
function renderZero(){
  const yours=currentMotif(),point=(pc,r=125)=>{const a=pc*Math.PI/6-Math.PI/2;return [400+Math.cos(a)*r,200+Math.sin(a)*r];};
  const path=list=>list.map((x,i)=>{const [px,py]=point(x);return (i?'L':'M')+px.toFixed(2)+','+py.toFixed(2);}).join(' ');
  const label=pc=>state.phase===1?names[pc]:String(pc);
  let svg='<svg class="zero-ring" viewBox="0 0 800 400" aria-hidden="true"><circle class="ring" cx="400" cy="200" r="158"/><circle class="ring" cx="400" cy="200" r="125"/><path class="target-path" d="'+path(game.target)+'"/><path class="motif-path" d="'+path(yours)+'"/>';
  for(let pc=0;pc<12;pc++){const [x,y]=point(pc),[tx,ty]=point(pc,148);svg+='<circle class="node '+(yours.includes(pc)?'lit':'')+'" cx="'+x+'" cy="'+y+'" r="7"/><text x="'+tx+'" y="'+ty+'">'+label(pc)+'</text>';}
  svg+='<text class="ring-center" x="400" y="194">'+(game.invert?'I':'T')+game.t+(game.reverse?' · R':'')+'</text><text class="ring-caption" x="400" y="219">YOUR TRANSFORM</text></svg>';
  $('game-content').innerHTML=svg+'<div class="motif-sequences"><div>目标 <span class="target">'+game.target.map(label).join(' → ')+'</span></div><div>你的 <b>'+yours.map(label).join(' → ')+'</b></div></div><span class="arena-caption">PITCH CLASS / 12 节点</span><span class="arena-caption right">I → R → T / 可组合</span>';
}

// Music and animation follow the same transport; gameplay remains editable while paused.
function onBeat() {
  state.beat++;document.querySelectorAll('.beat-lights i').forEach((x,i)=>x.classList.toggle('active',i===state.beat%4));
  if(state.locked||!state.started||state.won||performance.now()<(game.referenceUntil||0))return;
  const pace=60/data[state.boss].bpm*(state.focus?1.8:1);
  if(state.boss==='jaz') {if(state.beat%2===0)chord(jazNotes(),pace*1.75);else tone(changes[game.chord].bass+12,pace*.65,.15);}
  else if(state.boss==='mimi'){const i=(state.beat-1)%8,n=game.notes[i];tone(scale[n.pitch],pace*n.duration*.85,.36);}
  else{const seq=currentMotif();tone(60+seq[(state.beat-1)%4],pace*.8,.32);}
}
function frame(now) {
  const dt=state.last?Math.min(.1,(now-state.last)/1000):0;state.last=now;
  if(state.started&&state.playing&&!state.won&&now>state.freezeUntil){state.sceneTime+=dt*(state.focus?.42:1);if(now>=state.nextAt){onBeat();state.nextAt=now+60000/data[state.boss].bpm*(state.focus?1.8:1);}}
  if(state.boss==='jaz')positionOrbs();
  if(state.boss==='mimi'&&$('staff-cursor')){$('staff-cursor').style.left=(12+(state.sceneTime/(60/data.mimi.bpm*8)%1)*76)+'%';$('staff-cursor').style.opacity=state.started?'.55':'0';}
  requestAnimationFrame(frame);
}
function burst(clientX,clientY){
  if(reduceMotion)return;const r=$('arena').getBoundingClientRect(),x=(clientX-r.x)/r.width*800,y=(clientY-r.y)/r.height*400,ns='http://www.w3.org/2000/svg';
  const g=document.createElementNS(ns,'g');for(let i=0;i<7;i++){const a=i*Math.PI*2/7,l=document.createElementNS(ns,'line');l.setAttribute('x1',x);l.setAttribute('y1',y);l.setAttribute('x2',x+Math.cos(a)*22);l.setAttribute('y2',y+Math.sin(a)*22);l.setAttribute('stroke','var(--accent)');l.setAttribute('stroke-width','1.5');g.append(l);} $('fx').append(g);g.animate([{opacity:1},{opacity:0}],{duration:400});later(()=>g.remove(),420);
}
function segmentDistance(point,a,b){const dx=b.x-a.x,dy=b.y-a.y,l=dx*dx+dy*dy,t=l?Math.max(0,Math.min(1,((point.x-a.x)*dx+(point.y-a.y)*dy)/l)):0;return Math.hypot(point.x-a.x-t*dx,point.y-a.y-t*dy);}
$('arena').addEventListener('pointerdown',e=>{if(state.boss==='jaz'&&canAct()&&!e.target.closest('[data-core]')){tracing=true;lastPoint={x:e.clientX,y:e.clientY};}});
window.addEventListener('pointermove',e=>{if(!tracing||state.boss!=='jaz'||!canAct())return;const current={x:e.clientX,y:e.clientY};const hit=[];document.querySelectorAll('[data-extra]').forEach(b=>{const r=b.getBoundingClientRect();if(segmentDistance({x:r.x+r.width/2,y:r.y+r.height/2},lastPoint||current,current)<r.width/2)hit.push(Number(b.dataset.extra));});hit.forEach(muteExtra);lastPoint=current;});
window.addEventListener('pointerup',()=>{tracing=false;lastPoint=null;setFocus(false);});window.addEventListener('pointercancel',()=>{tracing=false;lastPoint=null;setFocus(false);});
window.addEventListener('blur',()=>{tracing=false;setFocus(false);if(state.playing)togglePlayback();});
function togglePlayback(){if(!state.started){start();return;}if(state.won)return;state.playing=!state.playing;document.body.classList.toggle('paused',!state.playing);$('play').textContent=state.playing?'Ⅱ':'▶';$('play').setAttribute('aria-label',state.playing?'暂停播放':'继续播放');$('transport-label').textContent=state.playing?'音乐正在发生':'暂停 · 可以继续编辑';if(!state.playing)stopSound();else state.nextAt=performance.now();}
window.addEventListener('keydown',e=>{
  if($('guide').open||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
  if(e.code==='Space'&&e.target.tagName!=='BUTTON'){e.preventDefault();if(!e.repeat)togglePlayback();}
  if(state.boss==='mimi'&&canAct()){
    if(e.code==='KeyF'){e.preventDefault();setFocus(true);}
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();if(e.key==='ArrowUp')editPitch(1);if(e.key==='ArrowDown')editPitch(-1);if(e.key==='ArrowLeft')editDuration(.5);if(e.key==='ArrowRight')editDuration(1);}
  }
});window.addEventListener('keyup',e=>{if(e.code==='KeyF')setFocus(false);});
$('sound').onclick=()=>{bootAudio();state.muted=!state.muted;if(master)master.gain.setTargetAtTime(state.muted?0:.24,audio.currentTime,.02);$('sound').setAttribute('aria-pressed',String(!state.muted));$('sound').innerHTML=(state.muted?'♪':'♫')+' <span>'+(state.muted?'声音关闭':'声音开启')+'</span>';};
$('start').onclick=start;$('play').onclick=togglePlayback;$('restart').onclick=()=>{reset();start();};$('again').onclick=()=>{reset();start();};
for(const b of document.querySelectorAll('[data-select]'))b.onclick=()=>reset(b.dataset.select);
let resumeAfterHelp=false;
$('help').onclick=()=>{resumeAfterHelp=state.playing;if(state.playing)togglePlayback();$('guide').showModal();$('help').setAttribute('aria-expanded','true');};
function closeHelp(){$('guide').close();}
$('close-help').onclick=closeHelp;$('close-help-bottom').onclick=closeHelp;$('guide').addEventListener('close',()=>{$('help').setAttribute('aria-expanded','false');if(resumeAfterHelp&&!state.playing&&!state.won)togglePlayback();resumeAfterHelp=false;});
window.addEventListener('hashchange',()=>{const boss=location.hash.slice(1);if(data[boss]&&boss!==state.boss)reset(boss);});
window.addEventListener('resize',positionOrbs);
reset(data[location.hash.slice(1)]?location.hash.slice(1):'jaz');requestAnimationFrame(frame);
})();

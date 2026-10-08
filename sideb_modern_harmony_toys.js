// ref:koozin-planing
// Interactive original examples; ref:rubin-nonfunctional ref:arndt-tonality ref:ircam-spectral ref:ircam-spectrum ref:gann-ji ref:gann-ji-reasons
import { mountModernHarmony } from './modern_harmony_tools_ui.js?v=20261008-b-workshop1';
import { TOPICS, t, cents, midiForHz, chord, chain, frequencies, layers } from './modern_harmony_course.js?v=20261008-spectrum-side1';
import { pitch } from './modern_harmony_generators.js?v=20261008-modern2';
import { playAudio } from './sideb_toys.js?v=20261008-b-workshop1';
const tx = (value) => typeof value === 'string' ? value : value[globalThis.window?.__lang || 'zh'] || value.en;
const el = (tag, cls, text) => {const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=tx(text);return n;};
export function toyModel(topic, mode, value) {
  if(topic==='nonfunctional') {
    const base=[60,64,67],next=mode==='diatonic'?[62,65,69]:base.map(n=>n+value),pedal=mode==='pedal';
    return {audio:chain(pedal?[48,...base]:base,pedal?[48,...next]:next),text:`${base.map(pitch).join(' – ')} → ${next.map(pitch).join(' – ')} / ${next.map((n,i)=>`+${n-base[i]}`).join(', ')}${pedal?' / '+tx(t('C3 持续低音','C3 持続低音','C3 pedal tone')):''}`};
  }
  if(topic==='polytonality') {
    const low=[48,52,55,48],high=[72+value,76+value,79+value,72+value,76+value,79+value,72+value,72+value];
    return {audio:mode==='low'?chain(...low):mode==='high'?chain(...high):layers(low,high),text:`${low.map(pitch).join(' – ')} / ${high.slice(0,4).map(pitch).join(' – ')} / ${tx({low:t('低层单独','低層のみ','Low layer alone'),high:t('高层单独','高層のみ','High layer alone'),both:t('两层同时','両層同時','Both layers together')}[mode])}`};
  }
  if(topic==='atonality') {
    const original=[60,61,67],ns=mode==='reverse'?[...original].reverse():mode==='invert'?[60,59,53]:mode==='transpose'?original.map(n=>n+value):original;
    return {audio:chain(...ns),text:`${ns.map(pitch).join(' → ')} / ${ns.slice(1).map((n,i)=>`${n-ns[i]>=0?'+':''}${n-ns[i]}`).join(', ')}`};
  }
  if(topic==='spectralharmony') {
    const hz=mode==='offset'?[value,2*value,3*value+5]:mode==='seventh'?[value,value*7/4]:[4*value,5*value,6*value];
    return {audio:mode==='successive'?chain(...hz.map(midiForHz)):frequencies(...hz),text:`f₀=${value} Hz / ${hz.map(f=>f.toFixed(2)).join(', ')} Hz / ${hz.map(f=>(f/value).toFixed(3)).join(':')}`};
  }
  const N=Number(mode),just=[1,5/4,3/2],steps=N?just.map(r=>Math.round(N*Math.log2(r))):null;
  const ratios=N?steps.map(k=>2**(k/N)):just,hz=ratios.map(r=>r*value);
  const errors=ratios.map((r,i)=>cents(r)-cents(just[i]));
  return {audio:frequencies(...hz),text:`1/1=${value} Hz / ${hz.map(f=>f.toFixed(2)).join(', ')} Hz${steps?` / k=${steps.join(', ')} / ${tx(t('误差（音分）','誤差（セント）','Error (cents)'))}=${errors.map(x=>x.toFixed(2)).join(', ')}`:' / 1:5/4:3/2'}`};
}
import {DEFAULTS,MODERN_GOALS,modernGoalMet} from './sideb_modern_harmony_goals.js?v=20261008-b-workshop1';
import {MODERN_MISSIONS} from './sideb_modern_harmony_scenes.js?v=20261008-b-workshop1';
export function modernHarmonyToy(host,params={}, {playChord, stopAudio = () => {}, onSolved}={}) {
  const topic=TOPICS.find(x=>x.id===params.topic);if(!topic)return {};
  const wrap=el('div','sideb-toy sideb-modern-toy'), target=el('div'), board=el('section','mh-mission-board');
  let completed=0,previous=null,notified=false,tool;
  const status=el('p','mh-mission-status');status.setAttribute('role','status');
  const goalNames=MODERN_GOALS[topic.id];
  const tx=v=>v[globalThis.window?.__lang||'zh']||v.en;
  function paint(message=''){
    board.replaceChildren(el('h4','',tx(MODERN_MISSIONS[topic.id])));
    goalNames.forEach((goal,index)=>{
      const row=el('p','mh-mission-goal'+(index<completed?' is-complete':index===completed?' is-current':''));
      row.append(el('strong','',index<completed?'✓ '+(index+1):String(index+1)),el('span','',tx(goal)));board.append(row);
    });
    status.textContent=message||tx(t('先完成当前任务并试听。系统核对实际方案，喜欢哪种音色不计分。','現在の課題を作って試聴。実際の設定を確認し、音色の好みは採点しません。','Build and audition the current brief. We check the actual design, not your taste in timbre.'));board.append(status);
    const reset=el('button','btn btn-secondary btn-sm',tx(t('载入任务起点','課題の開始案を読み込む','Load starting draft')));reset.type='button';
    reset.addEventListener('click',()=>{completed=0;previous=null;tool.setState(DEFAULTS[topic.id]);paint();});board.append(reset);
  }
  wrap.append(board,target);host.append(wrap);paint();
  tool=mountModernHarmony(target,{topic:topic.id,playChord,stopAudio,onExperiment:(state,{action}={})=>{
    if(completed>=goalNames.length)return;
    if(modernGoalMet(topic.id,completed,state,previous,action)){
      previous={...state};completed++;paint(tx(t('已完成','完了','Completed'))+' '+completed+' / '+goalNames.length);
      if(completed===goalNames.length&&!notified){notified=true;onSolved?.();}
    }else paint(tx(t('已经试听。再对照高亮任务，检查中心、声部或频率设置。','試聴済み。強調された課題と中心・声部・周波数を再確認。','Auditioned. Compare the highlighted brief with your centres, voices or frequency settings.')));
  }});
  return {destroy:()=>tool.destroy()};
}

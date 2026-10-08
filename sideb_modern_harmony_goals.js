// ref:rubin-nonfunctional ref:koozin-planing ref:arndt-tonality ref:ircam-spectrum ref:ircam-spectral ref:gann-ji ref:gann-ji-reasons
﻿// Original two-step studio briefs, validated from the same live models used by the tools.
import {DEFAULTS,MODEL_OF} from './modern_harmony_tools.js?v=20261008-spectrum-delete1';
import {t} from './modern_harmony_course.js?v=20261008-spectrum-side1';
export {DEFAULTS};
export const MODERN_GOALS={
 nonfunctional:[t('试听一段同形平移：至少三个和弦，每个内部距离相同。可用默认起点，也可自己选音。','3和音以上の実平行を試聴。内部の距離を保とう。初期値でも自分の音でも可。','Audition exact planing across at least three chords, preserving their internal gaps. Use the starting draft or choose your own notes.'),t('加一个持续低音（例如C3），让上方和弦继续移动，再试听对比。','C3などの持続低音を加え、上の和音は動かして再び試聴。','Add a pedal, such as C3, while the upper chords move; audition the contrast.')],
 polytonality:[t('设置不同中心，点击“两层同时”听叠加；两层都必须实际发声。','別の中心を設定し「両層同時」で重なりを聴こう。両層を鳴らす。','Set distinct centres and use Both layers together to hear the overlap. Both layers must sound.'),t('给一层加一个休止r:1，让另一层在空隙里继续，再试听。中心仍保持不同。','片方に休符r:1を追加。隙間でも他方を続け、別中心を保って試聴。','Add a rest, r:1, to one layer while the other continues. Retain distinct centres and audition.')],
 atonality:[t('把变形选成逆行R，移位设为0，试听熟悉动机倒着读的样子。','変形を逆行R、移高を0にし、動機の順番を逆にして試聴。','Choose retrograde R with transposition 0 and hear the familiar motif read backwards.'),t('再选倒影I，保留同一动机；上下翻转与倒着读有什么不同？改完试听。','同じ動機で反転Iへ。上下反転と逆読みを試聴して比べよう。','Choose inversion I with the same motif. Audition how flipping direction differs from reversing order.')],
 spectralharmony:[t('做出至少三个有声整数倍分音，试听整体。可从默认谐波模型开始。','3つ以上の整数倍の有音成分を作り全体を試聴。初期モデルも使える。','Create at least three audible integer harmonics and audition them. The starting harmonic model works.'),t('让一根音柱离开整数倍位置：例如把其目标音分偏移改为25（形变比例保持100%），再试听。其余可自己调，但别删到少于三个有声成分。','一項を整数倍からずらそう。例：目標セント偏差25、変形率100%。有音成分を3つ以上残して試聴。','Move a stem away from an integer multiple, for example with a target cent offset of 25 at 100% morph, retaining at least three audible components, and audition the changed spectrum.')],
 microtonalharmony:[t('选一个非12的等分数（如19），点击和弦A或B的“JI ↔ EDO”比较按钮。看至少一个不为0的量化误差。','12以外（例19）の等分数で和音AかBの「JI ↔ EDO」比較ボタンを押す。0でない誤差を探す。','Choose an EDO other than 12, such as 19. Use a chord’s JI ↔ EDO comparison button and find a nonzero quantization error.'),t('改变B根音，保留至少一个实际共同Hz。可试B根音5/4，B比例1/1、6/5、8/5，再听连接。','Bの根音を変え、実際の共通Hzを一つ以上保持。B根音5/4、B比1/1・6/5・8/5を試して連結を聴こう。','Change B’s root while retaining an actual shared Hz. Try B root 5/4 with B ratios 1/1,6/5,8/5, then audition the connection.')],
};
export function modernGoalMet(topic,step,state,previous,action){
 try{
  const model=MODEL_OF[topic](state);
  const required={nonfunctional:['sequence'],polytonality:['together'],atonality:['transformed'],spectralharmony:['spectrum','arpeggio'],microtonalharmony:step===0?['compareA','compareB']:['just']};
  if(!required[topic]?.includes(action))return false;
  if(previous&&JSON.stringify(state)===JSON.stringify(previous))return false;
  if(topic==='nonfunctional')return step===0?state.mode==='exact'&&model.rows.length>=3&&model.rows.some(r=>r.movement?.some(n=>n!==0)):model.pedal!==null&&model.rows.length>=2&&model.rows.some(r=>r.movement?.some(n=>n!==0));
  if(topic==='polytonality'){
   const overlap=(a,b)=>Math.min(a.at+a.duration,b.at+b.duration)>Math.max(a.at,b.at);
   const simultaneous=model.eventsA.some(a=>model.eventsB.some(b=>overlap(a,b)));
   const restWithOtherSound=[[model.a,model.eventsB],[model.b,model.eventsA]].some(([layer,other])=>layer.rows.some(r=>r.midi===null&&other.some(e=>overlap(r,e))));
   return !model.sameCenter&&simultaneous&&(step===0||restWithOtherSound);
  }
  if(topic==='atonality')return Number(state.transpose)===0&&model.source.length>=3&&(step===0?state.transform==='R':state.transform==='I'&&state.motif===previous?.motif);
  if(topic==='spectralharmony'){const audible=model.rows.filter(r=>r.amplitude>0);return audible.length>=3&&(step===0?audible.every(r=>Math.abs(r.ratio-Math.round(r.ratio))<1e-9):audible.some(r=>Math.abs(r.ratio-Math.round(r.ratio))>1e-6));}
  if(topic==='microtonalharmony')return step===0?model.edo!==12&&[...model.a,...model.b].some(r=>Math.abs(r.error)>.01):model.commonHz.length>0&&Math.abs(model.a[0].frequency-model.b[0].frequency)>.01;
  return false;
 }catch{return false;}
}

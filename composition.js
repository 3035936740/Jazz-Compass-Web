import { accompanimentVoicing } from './accompaniment_voicing.js';
export const NOTES = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
export const FORMS = {
  single: ['一部曲式 A',['A']], doublePeriod: ["一部曲式 A A'",['A',"A'"]],
  binary: ['二部曲式 A B',['A','B']], ternary: ['三部曲式 A B A',['A','B','A']],
  variedTernary: ["三部曲式 A B A'",['A','B',"A'"]], rondo: ['回旋曲式 A B A C A',['A','B','A','C','A']],
  largeRondo: ['七部回旋 A B A C A B A',['A','B','A','C','A','B','A']],
  variation: ["变奏 A A' A''",['A',"A'","A''"]], song: ['歌曲 A A B A',['A','A','B','A']],
  verseChorus: ['主歌副歌 A B A B C B',['A','B','A','B','C','B']]
};
export const CADENCES = {
  pac: ['完满正格终止','V → I / i 根位结束 旋律落主音'],
  iac: ['不完满正格终止','V → I / i 旋律落三音'],
  k64: ['K64 装饰正格终止','I6/4 → V → I 属低音保持 倚音下行'],
  deceptive: ['阻碍终止','V → vi / VI 避开预期主和弦'],
  half: ['半终止 / 开放结尾','停留在 V 保留继续发展的张力'],
  plagal: ['变格终止','IV / iv → I / i'],
  phrygian: ['弗里几亚半终止','小调 iv6 → V 低音降六级下行到属音'],
  open: ['开放式循环结尾','停在前属和弦 接续下一轮'],
  fade: ['Fade Out 淡出','重复末尾循环并逐步衰减音量 属于制作手法而非和声终止类型']
};
export const MODULATIONS = {
  none:'保持主调', tonicize:'离调 / 副属和弦', pivot:'共同和弦转调', direct:'直接转调',
  relative:'关系大小调转调', parallel:'同主音大小调转调', mixture:'调式交替', sequence:'模进转调'
};
const mod = n => (n%12+12)%12;
const scales = {major:[0,2,4,5,7,9,11],minor:[0,2,3,5,7,8,10]};
export function arpeggioMidi(chord, contour) {
  const count=chord.pitches.length;
  const inversion=mod(chord.inversion||0)%count;
  const bassPc=chord.pitches[inversion];
  let bassMidi=60+bassPc;
  while(bassMidi<67) bassMidi+=12;
  return contour.map(step=>{
    const pitch=chord.pitches[mod(step+inversion)%count];
    return bassMidi+mod(pitch-bassPc);
  });
}
export function chordAt(key, mode, degree, inversion=0, options={}) {
  const scale=scales[mode], root=NOTES.indexOf(key);
  const pitches=[0,2,4].map(n=>mod(root+scale[(degree+n)%7]));
  if(mode==='minor' && degree===4) pitches[1]=mod(root+11);
  if(options.borrow) { pitches[0]=mod(root+5); pitches[1]=mod(root+8); pitches[2]=mod(root); }
  const intervals=pitches.map(n=>mod(n-pitches[0]));
  const quality=intervals[1]===3?(intervals[2]===6?'dim':'m'):'';
  const bassPc=pitches[inversion], third=intervals[1];
  const romanBase=['I','II','III','IV','V','VI','VII'][degree];
  const roman=(third===3?romanBase.toLowerCase():romanBase)+(quality==='dim'?'°':'')+(inversion===1?'6':inversion===2?'6/4':'');
  return {key,mode,degree,pitches,bassPc,rootPc:pitches[0],inversion,
    name:NOTES[pitches[0]]+quality+(inversion?'/'+NOTES[bassPc]:''),roman:options.borrow?'iv':roman,tag:options.borrow?'借用同主音小调 iv':''};
}
function targetKey(key,mode,method,ordinal) {
  const root=NOTES.indexOf(key);
  if(['none','tonicize','mixture'].includes(method)) return {key,mode};
  if(method==='relative') return {key:NOTES[mod(root+(mode==='major'?9:3))],mode:mode==='major'?'minor':'major'};
  if(method==='parallel') return {key,mode:mode==='major'?'minor':'major'};
  return {key:NOTES[mod(root+(ordinal>1?5:7))],mode};
}
export function findPivot(from,to) {
  for(const degree of [1,3,5,0,2,4,6]) {
    const a=chordAt(from.key,from.mode,degree);
    for(let d=0;d<7;d++) {
      const b=chordAt(to.key,to.mode,d);
      if(a.pitches.every(n=>b.pitches.includes(n))) return {...b,tag:`共同和弦 ${from.key} ${a.roman} = ${to.key} ${b.roman}`};
    }
  }
  return null;
}
function cadenceChords(key,mode,type) {
  const c=(d,inv=0)=>chordAt(key,mode,d,inv);
  switch(type) {
    case 'k64':return [{...c(0,2),roman:'K64',tag:'属低音上的终止四六'},c(4),c(0)];
    case 'deceptive':return [c(4),c(5)];
    case 'half':return [c(1,1),c(4)];
    case 'plagal':return [c(3),c(0)];
    case 'phrygian':return [chordAt(key,'minor',3,1),c(4)];
    case 'open':return [c(0),c(3)];
    case 'fade':return [c(0),c(5),c(3),c(4)];
    default:return [c(4),c(0)];
  }
}
export function buildComposition(settings={}) {
  const cfg={form:'ternary',key:'C',mode:'major',meter:'4/4',bars:8,bass:'alternating',cadence:'k64',modulation:'pivot',phrase:'period',sequence:false,harmonicRhythm:1,intro:false,coda:false,...settings};
  cfg.bars=Math.max(8,Math.min(16,Number(cfg.bars)||8));
  cfg.harmonicRhythm=Number(cfg.harmonicRhythm)===2?2:1;
  const beats=cfg.meter==='3/4'?3:4, labels=FORMS[cfg.form]?.[1]||FORMS.ternary[1];
  const sections=[], bars=[], warnings=[];
  const home={key:cfg.key,mode:cfg.mode};
  let previous=home;
  const allLabels=[...(cfg.intro?['Intro']:[]),...labels,...(cfg.coda?['Coda']:[])];
  for(let s=0;s<allLabels.length;s++) {
    const label=allLabels[s], contrast=/^[BC]/.test(label), varied=label.includes("'");
    const original=contrast?targetKey(cfg.key,cfg.mode,cfg.modulation,label==='C'?2:1):home;
    const override=cfg.sections?.[s] || {};
    const local={key:override.key||original.key,mode:override.mode||original.mode};
    let cadence=override.cadence || (label==='Intro'?'half':contrast?'half':cfg.cadence);
    if(cadence==='phrygian' && local.mode!=='minor') {cadence='half';warnings.push(`${label} 的弗里几亚半终止只用于小调 已改为半终止`);}
    const count=label==='Intro'||label==='Coda'?4:cfg.bars;
    const base=label==='C'?[3,1,5,4,2,3,1,4]:contrast?[5,1,3,4,2,5,1,4]:[0,3,1,4,0,5,3,4];
    let progression=Array.from({length:count},(_,i)=>chordAt(local.key,local.mode,base[i%8],varied && i%4===1?1:0));
    if(cfg.phrase==='sentence' && count>=8) {progression[2]={...progression[0]};progression[3]={...progression[1]};}
    if(cfg.sequence && count>=8) [5,1,4,0].forEach((d,i)=>progression[i+2]={...chordAt(local.key,local.mode,d),tag:'下行五度和声模进'});
    if(cfg.modulation==='mixture' && local.mode==='major') progression[1]=chordAt(local.key,local.mode,3,0,{borrow:true});
    if(cfg.modulation==='tonicize') {
      const domKey=NOTES[mod(NOTES.indexOf(local.key)+7)];
      progression[2]={...chordAt(domKey,'major',4),roman:'V/V',tag:'副属和弦 离调到 V'};
      progression[3]=chordAt(local.key,local.mode,4);
    }
    const changed=previous.key!==local.key || previous.mode!==local.mode;
    let transition=changed?'直接转调':'保持调性';
    if(changed && cfg.modulation==='pivot' && contrast) {
      const pivot=findPivot(previous,local);
      if(pivot) {progression[0]=pivot;progression[1]={...chordAt(local.key,local.mode,4),tag:'新调属和弦'};progression[2]={...chordAt(local.key,local.mode,0),tag:'新调主和弦确认'};transition=pivot.tag;}
      else {transition='无共同三和弦 改用直接转调';warnings.push(`${label} ${transition}`);}
    } else if(changed && cfg.modulation==='sequence' && contrast) {
      [5,1,4,0].forEach((d,i)=>progression[i]={...chordAt(local.key,local.mode,d),tag:'新调五度模进'});transition='通过五度模进确认新调';
    } else if(changed) transition=!contrast?'直接回到主调 再现主要材料':MODULATIONS[cfg.modulation]||'直接转调';
    // The antecedent closes on V before the consequent returns to tonic
    if(count>=8 && cfg.phrase==='period') {progression[count/2-1]=chordAt(local.key,local.mode,4);progression[count/2]=chordAt(local.key,local.mode,0);}
    const ending=cadenceChords(local.key,local.mode,cadence);
    progression.splice(count-ending.length,ending.length,...ending);
    if(cadence==='fade') progression.push(...ending.map(c=>({...c})),...ending.map(c=>({...c})));
    const section={id:s,label,...local,cadence,contrast,varied,transition,start:bars.length+1,length:progression.length,phrase:cfg.phrase};
    sections.push(section);
    progression.forEach((chord,i)=>{
      const isLast=i===progression.length-1;
      let chords=[{...chord,beat:0,duration:beats}];
      if(cfg.harmonicRhythm===2 && i<count-ending.length) chords=[{...chord,beat:0,duration:beats/2},{...chordAt(local.key,local.mode,(chord.degree+3)%7),beat:beats/2,duration:beats/2}];
      bars.push({number:bars.length+1,section:s,label,local,cadence:isLast?cadence:null,chords,contrast,varied,
        fade:cadence==='fade' && i>=count-4?Math.max(.025,1-(i-(count-4))/(progression.length-(count-4)-.7)):1});
    });
    previous=local;
  }
  const events=[];
  let previousHarmony=null, previousChord=null, previousVoicing=null;
  bars.forEach((bar,index)=>{
    for(const chord of bar.chords) {
      const start=index*beats+chord.beat, duration=chord.duration;
      const voicing=accompanimentVoicing(chord,previousVoicing);
      let bass=voicing[0],harmony=voicing.slice(1);
      if(chord.roman==='K64') {const tonic=60+chord.rootPc;harmony=[tonic-5,tonic,tonic+(chord.mode==='minor'?3:4)];}
      else if(previousChord?.roman==='K64' && chord.degree===4 && previousChord.key===chord.key) {bass=previousVoicing[0];harmony=[previousHarmony[0],previousHarmony[1]-1,previousHarmony[2]-(previousChord.mode==='minor'?1:2)];}
      while(bass>=Math.min(...harmony)) bass-=12;
      chord.midiVoicing=[bass,...harmony];
      previousVoicing=chord.midiVoicing;
      previousHarmony=harmony;previousChord=chord;
      for(let t=0;t<duration;t++) {
        const alternate=cfg.bass==='alternating';
        const fifth=36+chord.pitches[2];
        const alternateBass=fifth>=bass?fifth-12:fifth;
        const bassNote=alternate && t%2===1?alternateBass:bass;
        const at=start+t;
        events.push({beat:at,duration:Math.min(.8,duration-t),midi:bassNote,velocity:.65*bar.fade,track:'bass',bar:index});
        const offset=alternate?.5:0;
        if(t+offset<duration) harmony.forEach(midi=>events.push({beat:at+offset,duration:Math.min(.42,duration-t-offset),midi,velocity:.27*bar.fade,track:'harmony',bar:index}));
      }
      const isFinal=bar.cadence && chord===bar.chords.at(-1);
      if(isFinal && ['pac','iac','k64','plagal'].includes(bar.cadence)) {
        const finalPc=bar.cadence==='iac'?chord.pitches[1]:chord.rootPc;
        events.push({beat:start,duration:duration*.95,midi:72+finalPc,velocity:.62*bar.fade,track:'melody',bar:index});
      } else {
        const contour=bar.label==='C'?[1,0,2,0]:bar.contrast?[2,1,0,1]:bar.varied?[0,2,1,2]:[0,1,2,1];
        const arp=beats===3?contour.slice(0,3):contour;
        const notes=arpeggioMidi(chord,arp);
        for(let t=0;t<duration;t+=.5) events.push({beat:start+t,duration:Math.min(.44,duration-t),midi:notes[Math.round(t*2)%notes.length],velocity:.45*bar.fade,track:'melody',bar:index});
      }
    }
  });
  return {settings:cfg,beats,sections,bars,events,duration:bars.length*beats,warnings};
}

const pattern=(id,name,meter,cells,groups,description='',subdivision=8)=>({id,name,meter,cells:cells.split(''),groups,description,subdivision});
export const RHYTHMS = [
  pattern('quarters','均匀四拍','4/4','X0x0x0x0',[2,2,2,2],'每拍起音 第一拍较强 第三拍次强'),
  pattern('long-third','第三拍延长','4/4','X0x0x--0',[2,2,2,2],'第三拍延长到第四拍前半'),
  pattern('waltz','三拍','3/4','X0x0x0',[2,2,2],'强 弱 弱'),
  pattern('five23','2 + 3','5/4','X0x0X0x0x0',[4,6]),
  pattern('five32','3 + 2','5/4','X0x0x0X0x0',[6,4]),
  pattern('sync','切分','4/4','X00x-x00',[2,2,2,2],'弱位起音 延续越过强拍'),
  pattern('seven223','2 + 2 + 3','7/8','XxXxXxx',[2,2,3]),
  pattern('seven232','2 + 3 + 2','7/8','XxXxxXx',[2,3,2]),
  pattern('seven322','3 + 2 + 2','7/8','XxxXxXx',[3,2,2]),
  pattern('eighths','均匀八分','4/4','XxxxXxxx',[2,2,2,2]),
  pattern('backbeat','反拍重音','4/4','x0X0x0X0',[2,2,2,2]),
  pattern('offbeat','弱位起音','4/4','0x0x0x0x',[2,2,2,2]),
  pattern('tresillo','Tresillo 3 + 3 + 2','4/4','X00x00x0',[3,3,2]),
  pattern('habanera','Habanera','4/4','X00xx0x0',[4,4]),
  pattern('dotted','附点节奏','4/4','X--xX--x',[4,4]),
  pattern('sixteenth','十六分律动','4/4','X0xx00x0X0xx00x0',[4,4,4,4],'每格十六分音符',16),
  pattern('six','复二拍','6/8','XxxXxx',[3,3]),
  pattern('six-sparse','6/8 疏密交替','6/8','X--Xxx',[3,3]),
  pattern('nine','复三拍','9/8','XxxXxxXxx',[3,3,3]),
  pattern('twelve','复四拍','12/8','XxxXxxXxxXxx',[3,3,3,3]),
  pattern('two','进行曲','2/4','X0x0',[2,2]),
  pattern('three-eight','快速三拍','3/8','Xxx',[3]),
  pattern('five-eight','不对称 2 + 3','5/8','XxXxx',[2,3]),
  pattern('eleven','3 + 3 + 3 + 2','11/8','XxxXxxXxxXx',[3,3,3,2]),
  pattern('hemiola','3/4 赫米奥拉','3/4','X--X--',[3,3],'三拍中形成两个附点四分脉冲'),
  pattern('clave32','Son Clave 3-2 两小节','4/4','X00x00x000x0x000',[8,8],'两小节一循环'),
  pattern('clave23','Son Clave 2-3 两小节','4/4','00x0x000X00x00x0',[8,8],'两小节一循环')
];
export function rhythmEvents(cells,subdivision=8,swing=0) {
  const step=4/subdivision,events=[];
  cells.forEach((cell,i)=>{
    if(cell!=='x' && cell!=='X') return;
    let end=i+1;
    while(cells[end]==='-') end++;
    const shift=i%2?swing*step:0;
    const endShift=end<cells.length && end%2?swing*step:0;
    events.push({beat:i*step+shift,duration:Math.max(.04,(end-i)*step+endShift-shift-.025),midi:cell==='X'?76:72,velocity:cell==='X'?.75:.38,track:'rhythm',step:i});
  });
  return events;
}

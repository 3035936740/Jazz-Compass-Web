const NS='http://www.w3.org/2000/svg';
const node=(tag,attrs={},text='')=>{const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v)));e.textContent=text;return e;};
export function scorePitch(midi,key='C',mode='major',chord=null) {
  const pc=(midi%12+12)%12;
  const sharpKeys=mode==='minor'?['E','B','Gb','Db','Ab']:['G','D','A','E','B'];
  const names=sharpKeys.includes(key)?['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']:['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
  let name=names[pc],octave=Math.floor(midi/12)-1;
  const index=chord?.pitches.indexOf(pc) ?? -1;
  if(index>=0) {
    const rootLetter=chord.name?.[0],letterIndex='CDEFGAB'.indexOf(rootLetter);
    if(letterIndex>=0) {
      const letter='CDEFGAB'[(letterIndex+index*2)%7],natural=[0,2,4,5,7,9,11][(letterIndex+index*2)%7];
      let difference=(pc-natural+12)%12;if(difference>6)difference-=12;
      if(Math.abs(difference)<=2) {name=letter+(difference>0?'#'.repeat(difference):'b'.repeat(-difference));octave=Math.floor((midi-difference)/12)-1;}
    }
  }
  return {letter:name[0],accidental:name.slice(1),octave,step:octave*7+'CDEFGAB'.indexOf(name[0]),name:name+octave};
}
export function scoreTrack(events,bar,track,beats) {
  const groups=new Map();
  for(const e of events.filter(e=>e.bar===bar&&e.track===track)) {
    const time=e.beat-bar*beats;
    if(!groups.has(time)) groups.set(time,{beat:time,duration:Math.max(.5,Math.round(e.duration*2)/2),notes:[]});
    groups.get(time).notes.push(e.midi);
  }
  const result=[];let cursor=0;
  for(const g of [...groups.values()].sort((a,b)=>a.beat-b.beat)) {
    if(g.beat>cursor) result.push({beat:cursor,duration:g.beat-cursor,notes:[]});
    result.push(g);cursor=g.beat+g.duration;
  }
  if(cursor<beats) result.push({beat:cursor,duration:beats-cursor,notes:[]});
  return result;
}
export function mountCompositionScore(host,model,section,onPlayBar) {
  const bars=model.bars.filter(b=>b.section===section.id);
  let previousColumns=0;
  const draw=()=>{
    const columns=host.clientWidth>=740?4:2;
    if(previousColumns===columns)return;previousColumns=columns;host.replaceChildren();
    for(let start=0;start<bars.length;start+=columns) {
      const row=bars.slice(start,start+columns),prefix=62,measure=250,width=prefix+measure*row.length+10;
      const wrap=document.createElement('div');wrap.className='compose-score-scroll';
      const svg=node('svg',{viewBox:`0 0 ${width} 335`,class:'compose-score','aria-label':`${section.label} 第 ${row[0].number} 到 ${row.at(-1).number} 小节`});
      wrap.append(svg);host.append(wrap);
      const tracks=[['melody','旋律',82,30,'𝄞'],['harmony','和声',174,18,'𝄢'],['bass','低音',266,18,'𝄢']];
      tracks.forEach(([track,label,y,bottom,clef])=>{
        svg.append(node('text',{x:4,y:y-23,class:'score-part'},label));
        for(let line=0;line<5;line++)svg.append(node('line',{x1:4,y1:y+line*8,x2:width-4,y2:y+line*8,class:'score-staff'}));
        svg.append(node('text',{x:7,y:y+27,class:'score-clef'},clef));
        const [n,d]=model.settings.meter.split('/');svg.append(node('text',{x:42,y:y+13,class:'score-meter'},n),node('text',{x:42,y:y+29,class:'score-meter'},d));
      });
      row.forEach((bar,idx)=>{
        const left=prefix+idx*measure,right=left+measure;
        const group=node('g',{'data-bar':bar.number-1,role:'button',tabindex:0,'aria-label':`试听第 ${bar.number} 小节 ${bar.chords.map(c=>c.name).join(' ')} 含旋律和伴奏`,class:'score-measure'});
        group.append(node('rect',{x:left+1,y:10,width:measure-2,height:308,rx:3,class:'score-hit'}));
        group.append(node('text',{x:left+8,y:16,class:'score-bar-number'},bar.number));
        bar.chords.forEach(c=>{
          const x=left+28+c.beat/model.beats*(measure-36);
          group.append(node('text',{x,y:39,class:'score-chord'},c.name),node('text',{x,y:56,class:'score-function'},c.roman));
        });
        for(const [track,,y,bottom] of tracks) {
          const groups=scoreTrack(model.events,bar.number-1,track,model.beats),accidentals=new Map();
          const point=beat=>left+32+beat/model.beats*(measure-42);
          groups.forEach((event,i)=>{
            const x=point(event.beat);
            if(!event.notes.length) {
              group.append(node('text',{x:x-4,y:y+23,class:'score-rest'},event.duration===.5?'𝄾':event.duration>=4?'𝄻':event.duration>=2?'𝄼':'𝄽'));return;
            }
            const activeChord=bar.chords.find(c=>event.beat>=c.beat&&event.beat<c.beat+c.duration);
            const pitches=event.notes.map(midi=>scorePitch(midi,bar.local.key,bar.local.mode,activeChord));
            const ys=pitches.map(p=>y+32-(p.step-bottom)*4);
            pitches.forEach((pitch,j)=>{
              const ny=ys[j];let nx=x;
              if(j>0&&Math.abs(ny-ys[j-1])===4)nx+=8;
              const accKey=pitch.letter+pitch.octave,previous=accidentals.get(accKey)||'';
              if(previous!==pitch.accidental) {
                group.append(node('text',{x:nx-17,y:ny+4,class:'score-accidental'},pitch.accidental?pitch.accidental.replaceAll('#','♯').replaceAll('b','♭'):'♮'));accidentals.set(accKey,pitch.accidental);
              }
              // Ledger lines follow diatonic staff positions independently of MIDI distance
              if(ny>y+32)for(let ly=y+40;ly<=ny;ly+=8)group.append(node('line',{x1:nx-10,x2:nx+10,y1:ly,y2:ly,class:'score-ledger'}));
              if(ny<y)for(let ly=y-8;ly>=ny;ly-=8)group.append(node('line',{x1:nx-10,x2:nx+10,y1:ly,y2:ly,class:'score-ledger'}));
              const note=node('ellipse',{cx:nx,cy:ny,rx:5.5,ry:3.8,transform:`rotate(-18 ${nx} ${ny})`,class:event.duration>=2?'score-note hollow':'score-note'});
              note.append(node('title',{},pitch.name));group.append(note);
              if(event.duration===1.5||event.duration===3)group.append(node('circle',{cx:nx+12,cy:ny-1,r:1.7,class:'score-note'}));
            });
            if(event.duration<4) {
              const pairStart=event.beat%1===0?i:i-1;
              const first=groups[pairStart],second=groups[pairStart+1];
              const beamed=track==='melody'&&event.duration===.5&&first?.duration===.5&&second?.duration===.5&&first.notes.length===1&&second.notes.length===1&&second.beat-first.beat===.5;
              const peer=beamed?(i===pairStart?second:first):null;
              const peerY=peer?y+32-(scorePitch(peer.notes[0],bar.local.key,bar.local.mode,activeChord).step-bottom)*4:null;
              const top=Math.min(...ys),bottomY=Math.max(...ys),down=(peer?ys[0]+peerY:ys.reduce((a,b)=>a+b,0))/(peer?2:ys.length)<y+16;
              const stemX=x+(down?-5:5),stemEnd=down?bottomY+24:top-24;
              group.append(node('line',{x1:stemX,x2:stemX,y1:down?top:bottomY,y2:stemEnd,class:'score-stem'}));
              if(beamed && i===pairStart) group.append(node('line',{x1:stemX,x2:point(second.beat)+(down?-5:5),y1:stemEnd,y2:peerY+(down?24:-24),class:'score-beam'}));
              else if(event.duration===.5&&!beamed) group.append(node('path',{d:down?`M${stemX},${stemEnd} q15,-6 6,-18 q4,10 -6,12`:`M${stemX},${stemEnd} q15,6 6,18 q4,-10 -6,-12`,class:'score-note'}));
            }
          });
          group.append(node('line',{x1:right,x2:right,y1:y,y2:y+32,class:'score-barline'}));
        }
        const play=()=>onPlayBar(bar.number-1);
        group.addEventListener('click',play);group.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();play();}});
        svg.append(group);
      });
    }
  };
  const observer=new ResizeObserver(draw);observer.observe(host);draw();return ()=>observer.disconnect();
}

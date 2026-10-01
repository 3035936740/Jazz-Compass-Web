// Register-aware accompaniment for form examples and blues
// Unlike strict SATB this keeps stylistic parallel motion possible but costly
const pc=n=>(n%12+12)%12;
const candidatesCache=new Map();
function upperCandidates(pitches,low) {
  const id=JSON.stringify([pitches,low]);
  if(candidatesCache.has(id)) return candidatesCache.get(id);
  const notes=Array.from({length:77-low},(_,i)=>i+low).filter(n=>pitches.includes(pc(n))),out=[];
  function visit(v,used,start) {
    if(v.length===pitches.length) {out.push(v);return;}
    for(let i=start;i<notes.length;i++) {
      const n=notes[i];if(used.includes(pc(n)) || (v.length&&n-v.at(-1)>12)) continue;
      visit([...v,n],[...used,pc(n)],i+1);
    }
  }
  visit([],[],0);candidatesCache.set(id,out);return out;
}
export function accompanimentVoicing(chord,previous=null) {
  const pitches=[...new Set(chord.pitches)];
  if(!pitches.length || pitches.some(n=>!Number.isFinite(n))) throw new Error('Invalid chord pitches');
  // Seventh chords keep all four chord tones including the fixed bass
  const upperPcs=pitches.length>=4 && pitches.includes(chord.bassPc)?pitches.filter(n=>n!==chord.bassPc):pitches;
  const bassChoices=[36+chord.bassPc,48+chord.bassPc].filter(n=>n<=55);
  let best=null,bestCost=Infinity;
  for(const bass of bassChoices) for(const upper of upperCandidates(upperPcs,Math.max(48,bass+5))) {
    const v=[bass,...upper];
    let cost=Math.abs(bass-42)*.1+upper.reduce((s,n,i)=>s+Math.abs(n-(55+i*5))*.2,0);
    if(previous) {
      cost+=Math.abs(bass-previous[0])*.7;
      for(let i=1;i<v.length;i++) cost+=Math.abs(v[i]-(previous[i]??previous.at(-1)))*1.6;
      for(let i=0;i<Math.min(v.length,previous.length);i++) for(let j=i+1;j<Math.min(v.length,previous.length);j++) {
        const a=pc(previous[j]-previous[i]),b=pc(v[j]-v[i]);
        if([0,7].includes(a)&&a===b&&(v[i]-previous[i])*(v[j]-previous[j])>0) cost+=18;
      }
      for(let i=0;i<Math.min(v.length,previous.length)-1;i++) if(v[i]>previous[i+1]||v[i+1]<previous[i]) cost+=24;
    }
    if(cost<bestCost) {bestCost=cost;best=v;}
  }
  if(!best) throw new Error('No playable accompaniment voicing');
  return best;
}
export function parsedAccompaniment(conv,symbol,previous=null) {
  const parsed=conv._ensureNotesAndRoot(symbol,true);
  if(!parsed?.notes?.length) throw new Error('Cannot parse chord');
  const pitches=parsed.notes.map(n=>conv.noteToIdx[n]);
  const bassPc=conv.noteToIdx[parsed.bass||parsed.root||parsed.notes[0]];
  const rootPc=conv.noteToIdx[parsed.root||parsed.notes[0]];
  const chord={pitches,bassPc,rootPc,symbol};
  return {...chord,midi:accompanimentVoicing(chord,previous)};
}

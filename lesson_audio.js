// Shared question/experiment audio timeline. MIDI values retain fractional pitches.
export function lessonAudioEvents(audio, {melodyGap=300,chordGap=820,melodyDuration=.42,chordDuration=1.1}={}) {
  if(!audio)return [];
  const events=[],beat=60000/(audio.bpm||90);
  function add(notes,at,duration,extra={}){
    const sounding=[].concat(notes).filter(n=>n!==null);
    if(!sounding.length)return;
    if(sounding.some(n=>!Number.isFinite(n))||!Number.isFinite(at)||at<0||!Number.isFinite(duration)||duration<=0)throw Error('Invalid lesson audio event');
    events.push({notes:sounding,at,duration,...extra});
  }
  if(audio.events){
    audio.events.forEach(e=>add(e.notes,e.at*beat,e.beats*beat/1000,e.velocity===undefined?{}:{velocity:e.velocity}));
  }else if(audio.chords){
    const gap=audio.gap??900;audio.chords.forEach((notes,i)=>add(notes,i*gap,gap/1000*.95));
  }else if(audio.rhythm){
    const {bpm=90,cycle=4,repeats=1,tracks=[]}=audio.rhythm;
    for(let pass=0;pass<repeats;pass++)tracks.forEach(track=>track.beats.forEach((b,i)=>add(track.midis?track.midis[i]:track.midi,(pass*cycle+b)*60000/bpm,.22)));
  }else if(audio.notes){
    const mode=audio.mode||'melody';
    if(mode==='harmonic'||mode==='chord')add(audio.notes,0,1.6);
    else {
      if(!['melody','chords','sequence'].includes(mode))throw Error('Unknown lesson audio mode: '+mode);
      const chords=mode==='chords'||(mode==='sequence'&&audio.notes.some(n=>Array.isArray(n)&&n.length>1)),steps=audio.notes.map(n=>[].concat(n)),gap=chords?chordGap:melodyGap;
      let at=0;
      steps.forEach((notes,i)=>{
        const length=audio.beats?(audio.beats[i]??1)*beat:gap;
        add(notes,at,audio.beats?Math.max(.15,length*.9/1000):chords?chordDuration:melodyDuration);
        at+=length;
      });
      if(audio.chord)add(audio.chord,at+120,1.8);
    }
  }
  return events.sort((a,b)=>a.at-b.at);
}
export function createLessonPlayback({playChord,stopAudio=()=>{},setTimer=setTimeout,clearTimer=clearTimeout,...timing}){
  let timers=[],generation=0;
  function stop(){generation++;timers.forEach(clearTimer);timers=[];stopAudio();}
  function play(audio){
    stop();const events=lessonAudioEvents(audio,timing);if(!events.length)return;
    const current=generation,unlock=events[0].at>0;
    if(unlock)playChord([],0,{interrupt:true});
    events.forEach((event,i)=>{
      const fire=()=>{if(current!==generation)return;playChord(event.notes.map(n=>440*2**((n-69)/12)),event.duration,{interrupt:i===0&&!unlock,...(event.velocity===undefined?{}:{velocity:event.velocity})});};
      if(i===0&&event.at===0)fire();else timers.push(setTimer(fire,event.at));
    });
  }
  return {play,stop};
}

// 引导卡音频：音高、时值和多声部起点都在同一条时间线上。
// 独立于 DOM，便于检查实际播放内容和切换时的取消行为。
export function guideDemoEvents(demo) {
  if (!demo) return [];
  const beat = 60000 / (demo.bpm || 100);
  if (demo.events) return demo.events.map(({ at, notes, beats, velocity }) => ({
    at: at * beat, notes, duration: beats * beat / 1000 * 0.94, ...(velocity ? { velocity } : {}),
  })).sort((a, b) => a.at - b.at);
  const single = demo.play.every((notes) => notes.length <= 1);
  const gap = single ? 300 : 820;
  let at = 0;
  const events = [];
  demo.play.forEach((notes, i) => {
    const length = demo.beats ? (demo.beats[i] ?? 1) * beat : gap;
    if (notes.length && notes[0] !== null) events.push({ at, notes, duration: demo.beats ? length / 1000 * 0.94 : single ? 0.28 : 0.76 });
    at += length;
  });
  if (demo.chord) events.push({ at: at + 120, notes: demo.chord, duration: 1.8 });
  return events;
}

/** 更换讲解步骤：正在播放时立即改播新示例，否则只更新下次播放内容。 */
export function createGuidePlayback({ playChord, stopAudio, setTimer = setTimeout, clearTimer = clearTimeout }) {
  let demo = null;
  let running = false;
  let generation = 0;
  let timers = [];
  function stop() {
    generation += 1;
    timers.forEach(clearTimer);
    timers = [];
    running = false;
    stopAudio();
  }
  function play() {
    stop();
    const events = guideDemoEvents(demo);
    if (!events.length) return;
    running = true;
    const token = generation;
    events.forEach((event, i) => timers.push(setTimer(() => {
      if (token !== generation) return;
      playChord(event.notes.map((n) => 440 * 2 ** ((n - 69) / 12)), event.duration, { interrupt: i === 0, ...(event.velocity ? { velocity: event.velocity } : {}) });
    }, event.at)));
    const end = Math.max(...events.map((event) => event.at + event.duration * 1000));
    timers.push(setTimer(() => { if (token === generation) running = false; }, end));
  }
  return {
    play, stop,
    setDemo(next, { resume = true } = {}) {
      const restart = running && resume;
      stop();
      demo = next;
      if (restart) play();
    },
  };
}

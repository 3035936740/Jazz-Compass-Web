import { getAudioContext, connectOutput, interruptIfActive } from './audio_engine.js?v=20261006-guide-audio1';

/** Sine partials preserve Hz and amplitude; the shared master bus still controls volume and Esc. */
export function playSinePartials(event, seconds, interrupt) {
  const ctx = getAudioContext();
  if (interrupt) interruptIfActive();
  const amplitudes = event.amplitudes || event.frequencies.map(() => 1);
  const total = Math.max(1, amplitudes.reduce((sum, n) => sum + n, 0));
  const voices = [];
  event.frequencies.forEach((frequency, index) => {
    if (amplitudes[index] <= 0) return;
    const source = ctx.createOscillator(), gain = ctx.createGain();
    const start = ctx.currentTime, end = start + seconds;
    source.type = 'sine'; source.frequency.value = frequency;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(.7 * amplitudes[index] / total, start + Math.min(.02, seconds / 4));
    gain.gain.setValueAtTime(.7 * amplitudes[index] / total, Math.max(start + .02, end - .05));
    gain.gain.linearRampToValueAtTime(0, end);
    source.connect(gain); connectOutput(gain, { wet: false });
    source.onended = () => { source.disconnect(); gain.disconnect(); };
    source.start(start); source.stop(end + .01);
    voices.push(source);
  });
  return { stop() { for (const source of voices) { try { source.stop(); } catch {} } } };
}

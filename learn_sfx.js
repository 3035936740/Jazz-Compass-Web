// 乐理闯关的答题音效：答对是上行的两声"叮"，答错是下行的两声闷音（Web Audio 合成，不用音频文件）
// 走全局音频总线（跟随音量滑块；不打断正在播放的题目声音）；开关存在 localStorage
import { getAudioContext, connectOutput } from './audio_engine.js?v=20261003-a2';

const STORAGE_KEY = 'jc-learn-sfx';

export function sfxEnabled() {
  try { return localStorage.getItem(STORAGE_KEY) !== 'off'; } catch (_) { return true; }
}

export function setSfxEnabled(on) {
  try { localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off'); } catch (_) { }
}

/** 音色：答对用正弦 + 高八度泛音（亮），答错用经过低通的方波（闷） */
const SOUNDS = {
  right: { notes: [[880, 0], [1318.5, 0.09]], wave: 'sine', overtone: 2, length: 0.32, gain: 0.16, cutoff: 0 },
  wrong: { notes: [[220, 0], [174.6, 0.13]], wave: 'square', overtone: 0, length: 0.26, gain: 0.07, cutoff: 900 },
};

/** 播放答题音效；关闭音效或没有 Web Audio 时什么也不做 */
export function playFeedbackSound(correct) {
  if (!sfxEnabled()) return;
  let ctx;
  try { ctx = getAudioContext(); } catch (_) { return; }
  if (!ctx?.createOscillator) return;
  const sound = SOUNDS[correct ? 'right' : 'wrong'];
  const start = ctx.currentTime + 0.01;
  const out = ctx.createGain();
  out.gain.value = 1;
  let last = out;
  if (sound.cutoff) {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = sound.cutoff;
    out.connect(filter);
    last = filter;
  }
  connectOutput(last, { wet: false });
  sound.notes.forEach(([freq, offset]) => {
    const t = start + offset;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(sound.gain, t + 0.008);
    env.gain.exponentialRampToValueAtTime(0.0001, t + sound.length);
    env.connect(out);
    const partials = sound.overtone ? [[freq, 1], [freq * sound.overtone, 0.25]] : [[freq, 1]];
    partials.forEach(([f, level]) => {
      const osc = ctx.createOscillator();
      osc.type = sound.wave;
      osc.frequency.setValueAtTime(f, t);
      const amp = ctx.createGain();
      amp.gain.value = level;
      osc.connect(amp).connect(env);
      osc.start(t);
      osc.stop(t + sound.length + 0.05);
    });
  });
  const end = start + Math.max(...sound.notes.map(([, o]) => o)) + sound.length + 0.2;
  setTimeout(() => { try { last.disconnect(); } catch (_) { } }, (end - ctx.currentTime) * 1000);
}

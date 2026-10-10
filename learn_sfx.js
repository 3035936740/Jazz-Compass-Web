// 乐理闯关的答题音效：答对是钢琴的大三和弦（原位，每次在 C4–C6 之间随机找一个高度），答错是下行的两声闷音（Web Audio 合成）
// 走全局音频总线（跟随音量滑块；不打断正在播放的题目声音）；开关存在 localStorage
import { getAudioContext, connectOutput, createPianoTone } from './audio_engine.js?v=20261009-audio1';

const STORAGE_KEY = 'jc-learn-sfx';

export function sfxEnabled() {
  try { return localStorage.getItem(STORAGE_KEY) !== 'off'; } catch (_) { return true; }
}

export function setSfxEnabled(on) {
  try { localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off'); } catch (_) { }
}

/** 答对的声音（单音或和弦）随机落在 C4（MIDI 60）到 C6（MIDI 84）之间 */
export const RIGHT_LOW = 60;
export const RIGHT_HIGH = 84;
const toHz = (m) => 440 * 2 ** ((m - 69) / 12);
export const hzToMidi = (f) => 69 + 12 * Math.log2(f / 440);
/**
 * 把一串音（每一步是一组 MIDI 音，可带小数的微分音）整体移调到 [lo, hi] 之间的随机位置：
 * 按整数半音移动，音与音之间的关系（包括纯律的频率比）完全不变；最低音不低于 lo、最高音不高于 hi。
 */
export function randomRegister(steps, { lo = RIGHT_LOW, hi = RIGHT_HIGH, rng = Math.random } = {}) {
  const all = steps.flat();
  const kMin = Math.ceil(lo - Math.min(...all) - 1e-9);
  const kMax = Math.floor(hi - Math.max(...all) + 1e-9);
  const k = kMax < kMin ? kMin : kMin + Math.floor(rng() * (kMax - kMin + 1)) % (kMax - kMin + 1);
  return steps.map((step) => step.map((m) => m + k));
}
/** 答对的声音：大三和弦原位（根音、大三度、纯五度），根音随机，三个音都在 C4–C6 之内 */
export const rightSoundNotes = (rng = Math.random) => randomRegister([[0, 4, 7]], { rng })[0];

/** 答错的音色：经过低通的方波（闷） */
const SOUNDS = {
  wrong: { notes: [[220, 0], [174.6, 0.13]], wave: 'square', overtone: 0, length: 0.26, gain: 0.07, cutoff: 900 },
};

/** 播放答题音效；关闭音效或没有 Web Audio 时什么也不做 */
export function playFeedbackSound(correct) {
  if (!sfxEnabled()) return;
  let ctx;
  try { ctx = getAudioContext(); } catch (_) { return; }
  if (!ctx?.createOscillator) return;
  // 答对：钢琴的大三和弦。直接接到输出总线：不打断正在播放的题目声音，也不受全局"停止"之后的排队抑制影响
  if (correct) {
    const now = ctx.currentTime + 0.01;
    try { rightSoundNotes().forEach((m, i) => connectOutput(createPianoTone(ctx, toHz(m), now + i * 0.012, 1.2, 0.72))); } catch (_) { }
    return;
  }
  const sound = SOUNDS.wrong;
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

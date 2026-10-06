// 音频引擎：Web Audio 总线、Salamander 钢琴采样与合成音备份、全局音量与"停止"
// 从 script.js 拆出；script.js 与各模块通过 playChord / createHeldPianoVoice 等接口发声。
let audioCtx = null;
let audioMaster = null;
let audioDryBus = null;
let audioWetBus = null;
let audioReverb = null;
/** 当前会话中的振荡器，再次播放时 stop() 立即静音 */
let activeSources = [];
/** 全局音量（0–1），保存在 localStorage；总线基准增益为 0.2 */
const VOLUME_STORAGE_KEY = "jc-volume";
const MASTER_BASE_GAIN = 0.2;
let masterVolume = (() => {
  try {
    const saved = Number(localStorage.getItem(VOLUME_STORAGE_KEY));
    return Number.isFinite(saved) && localStorage.getItem(VOLUME_STORAGE_KEY) !== null ? Math.max(0, Math.min(1, saved)) : 0.8;
  } catch (_) { return 0.8; }
})();
/** 按下"停止"后，丢弃已排队的后续音（interrupt: false），直到下一次新的播放开始 */
let suppressQueuedNotes = false;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    setupAudioBus(audioCtx);
    warmPianoSamples(audioCtx);
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => { });
  }
  return audioCtx;
}

/** 全局音频总线（只连一次 destination，避免多次播放叠加爆音） */
function setupAudioBus(ctx) {
  if (audioMaster) return;

  audioMaster = ctx.createGain();
  audioMaster.gain.value = MASTER_BASE_GAIN * masterVolume;

  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-22, ctx.currentTime);
  compressor.knee.setValueAtTime(8, ctx.currentTime);
  compressor.ratio.setValueAtTime(6, ctx.currentTime);
  compressor.attack.setValueAtTime(0.003, ctx.currentTime);
  compressor.release.setValueAtTime(0.2, ctx.currentTime);

  audioReverb = createReverb(ctx, 1.2);
  audioReverb.connect(audioMaster);
  audioMaster.connect(compressor);
  compressor.connect(ctx.destination);

  audioDryBus = ctx.createGain();
  audioWetBus = ctx.createGain();
  audioDryBus.gain.value = 1;
  audioWetBus.gain.value = 0.1;
  audioDryBus.connect(audioMaster);
  audioWetBus.connect(audioReverb);
}

function trackSource(node) {
  if (node && typeof node.stop === "function") {
    activeSources.push(node);
  }
}

/** 立即打断上一轮：旧总线 6ms 淡出后断开（避免咔哒声），并重建干/湿输入 */
function interruptPlayback(ctx) {
  const t = ctx.currentTime;
  pianoGeneration += 1;
  activeSources.forEach((src) => {
    try {
      src.stop(t + 0.05);
    } catch (_) { }
  });
  activeSources = [];

  [audioDryBus, audioWetBus].forEach((bus) => {
    if (!bus) return;
    try {
      bus.gain.cancelScheduledValues(t);
      bus.gain.setValueAtTime(bus.gain.value, t);
      bus.gain.setTargetAtTime(0, t, 0.006);
      setTimeout(() => { try { bus.disconnect(); } catch (_) { } }, 90);
    } catch (_) { }
  });

  audioDryBus = ctx.createGain();
  audioWetBus = ctx.createGain();
  audioDryBus.gain.value = 1;
  audioWetBus.gain.value = 0.1;
  audioDryBus.connect(audioMaster);
  audioWetBus.connect(audioReverb);
}

// ===================== 钢琴音色 =====================  ref:salamander-piano
// Salamander Grand Piano 采样（Alexander Holm，CC BY 3.0），A0–C8 每小三度一个。
// 每个音取最近的采样，用 playbackRate 移调（最多 ±1.5 个半音），微分音频率同样适用。
// 采样按需加载并裁剪；文件不可用时（如 file:// 打开）退回到加法合成的钢琴音。
const PIANO_SAMPLE_DIR = "./resources/piano/";
const PIANO_LOWEST = 21;   // A0
const PIANO_HIGHEST = 108; // C8
const PIANO_SAMPLE_GAIN = 0.85;
const PIANO_LATE_LIMIT = 1; // 采样晚于计划时间超过 1 秒就放弃这个音
const pianoBytes = new Map();   // 采样 MIDI -> Promise<ArrayBuffer>
const pianoLoads = new Map();   // 采样 MIDI -> Promise<AudioBuffer|null>
const pianoBuffers = new Map(); // 采样 MIDI -> 裁剪后的 AudioBuffer
let pianoGeneration = 0;

const midiToHz = (midi) => 440 * 2 ** ((midi - 69) / 12);
const hzToMidi = (hz) => 69 + 12 * Math.log2(hz / 440);

function nearestPianoSample(midi) {
  const clamped = Math.max(PIANO_LOWEST, Math.min(PIANO_HIGHEST, midi));
  return PIANO_LOWEST + Math.round((clamped - PIANO_LOWEST) / 3) * 3;
}

function pianoSampleUrl(sampleMidi) {
  const name = { 0: "C", 3: "Ds", 6: "Fs", 9: "A" }[sampleMidi % 12];
  return `${PIANO_SAMPLE_DIR}${name}${Math.floor(sampleMidi / 12) - 1}.mp3`;
}

function fetchPianoBytes(sampleMidi) {
  if (!pianoBytes.has(sampleMidi)) {
    pianoBytes.set(sampleMidi, fetch(pianoSampleUrl(sampleMidi)).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.arrayBuffer();
    }));
  }
  return pianoBytes.get(sampleMidi);
}

/** 去掉起音前的静音，按音区保留 4–7 秒并在结尾淡出，控制解码后的内存占用 */
function trimPianoBuffer(ctx, buffer, sampleMidi) {
  const rate = buffer.sampleRate;
  const first = buffer.getChannelData(0);
  let onset = 0;
  while (onset < first.length && Math.abs(first[onset]) < 0.002) onset++;
  if (onset >= first.length - 1) onset = 0;
  onset = Math.max(0, onset - Math.round(rate * 0.002));
  const keepSeconds = sampleMidi <= 48 ? 7 : sampleMidi <= 72 ? 5.5 : 4;
  const length = Math.min(buffer.length - onset, Math.round(rate * keepSeconds));
  const fade = Math.min(length, Math.round(rate * 0.6));
  const trimmed = ctx.createBuffer(buffer.numberOfChannels, length, rate);
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const target = trimmed.getChannelData(channel);
    target.set(buffer.getChannelData(channel).subarray(onset, onset + length));
    for (let i = length - fade; i < length; i++) target[i] *= (length - i) / fade;
  }
  return trimmed;
}

function loadPianoSample(ctx, sampleMidi) {
  if (pianoBuffers.has(sampleMidi)) return Promise.resolve(pianoBuffers.get(sampleMidi));
  if (!pianoLoads.has(sampleMidi)) {
    pianoLoads.set(sampleMidi, fetchPianoBytes(sampleMidi)
      // 新浏览器在传回调时也返回 Promise，失败时要一并接住，避免未处理的 rejection
      .then((data) => new Promise((resolve, reject) => { ctx.decodeAudioData(data, resolve, reject)?.catch?.(reject); }))
      .then((decoded) => {
        const trimmed = trimPianoBuffer(ctx, decoded, sampleMidi);
        pianoBuffers.set(sampleMidi, trimmed);
        pianoBytes.delete(sampleMidi);
        return trimmed;
      })
      .catch((error) => {
        console.warn(`Piano sample ${pianoSampleUrl(sampleMidi)} unavailable, using synthesized piano`, error);
        return null;
      }));
  }
  return pianoLoads.get(sampleMidi);
}

// 常用音区 C2–C6：页面空闲时先下载，创建 AudioContext 后立即解码
const PIANO_CORE_SAMPLES = [];
for (let midi = 36; midi <= 84; midi += 3) PIANO_CORE_SAMPLES.push(midi);
function warmPianoSamples(ctx) {
  PIANO_CORE_SAMPLES.forEach((sampleMidi) => loadPianoSample(ctx, sampleMidi));
}
// 全局初始化钢琴：常用音区的采样（约 2 MB）在加载动画画出来之后就开始下载（手机也一样；只有开了省流量时不预载），
// 解码要等第一次发声创建 AudioContext 时才做（浏览器要求用户先操作）。
{
  const saveData = Boolean(globalThis.navigator?.connection?.saveData);
  const raf = globalThis.requestAnimationFrame || ((f) => setTimeout(f, 16));
  // 两帧之后 = 加载动画已经画到屏幕上了
  if (!saveData) raf(() => raf(() => PIANO_CORE_SAMPLES.forEach((sampleMidi) => fetchPianoBytes(sampleMidi).catch(() => { }))));
}

/** 采样音：保持 duration 后制音器落下（约 0.1 秒的释放） */
function startSampledNote(ctx, output, buffer, sampleMidi, freq, time, duration, velocity) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.playbackRate.setValueAtTime(freq / midiToHz(sampleMidi), time);
  // 力度越小音色越暗
  const brightness = ctx.createBiquadFilter();
  brightness.type = "lowpass";
  brightness.Q.value = 0.5;
  brightness.frequency.setValueAtTime(1600 + velocity * velocity * 15000, time);
  const envelope = ctx.createGain();
  const level = PIANO_SAMPLE_GAIN * (0.3 + 0.7 * velocity);
  const releaseAt = time + Math.max(0.06, duration);
  envelope.gain.setValueAtTime(level, time);
  envelope.gain.setValueAtTime(level, releaseAt);
  envelope.gain.setTargetAtTime(0, releaseAt, 0.1);
  source.connect(brightness);
  brightness.connect(envelope);
  envelope.connect(output);
  source.onended = () => { source.disconnect(); brightness.disconnect(); envelope.disconnect(); };
  trackSource(source);
  source.start(time);
  source.stop(releaseAt + 0.75);
}

/**
 * 合成钢琴音（采样不可用时的后备）：
 * 略带非谐性的分音、高分音衰减更快、两根弦微失谐产生拍音，加一小段琴槌击弦噪声。
 * 返回可改频率、可在任意时刻释放的声部。
 */
function createSynthPianoVoice(ctx, output, freq, time, velocity, interruptible = true) {
  const voice = ctx.createGain();
  voice.gain.value = 0.55 * (0.3 + 0.7 * velocity);
  voice.connect(output);
  const pitchDecay = Math.max(0.5, Math.min(3.2, 1.8 * (261.6 / freq) ** 0.45));
  const inharmonicity = 0.00012 * (freq / 261.6) ** 0.7;
  const partials = [];
  for (let n = 1; n <= 7; n++) {
    const ratio = n * Math.sqrt(1 + inharmonicity * n * n);
    if (freq * ratio > 12000) break;
    const amp = (velocity * 0.5 + 0.5) ** (n - 1) / n ** 1.15;
    const tau = pitchDecay / n ** 0.75;
    [-1, 1].forEach((side) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const detune = side * (n === 1 ? 0.9 : 1.6);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * ratio, time);
      osc.detune.setValueAtTime(detune, time);
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(amp * 0.5, time + 0.004);
      gain.gain.setTargetAtTime(amp * 0.5 * 0.35, time + 0.004, tau * 0.18);
      gain.gain.setTargetAtTime(0, time + 0.004 + tau * 0.5, tau);
      osc.connect(gain);
      gain.connect(voice);
      osc.onended = () => { osc.disconnect(); gain.disconnect(); };
      if (interruptible) trackSource(osc);
      osc.start(time);
      partials.push({ osc, ratio });
    });
  }
  // 琴槌击弦：40ms 带通噪声
  const hammerLength = Math.round(ctx.sampleRate * 0.04);
  const hammerBuffer = ctx.createBuffer(1, hammerLength, ctx.sampleRate);
  const samples = hammerBuffer.getChannelData(0);
  for (let i = 0; i < hammerLength; i++) samples[i] = (Math.random() * 2 - 1) * (1 - i / hammerLength) ** 2;
  const hammer = ctx.createBufferSource();
  const hammerFilter = ctx.createBiquadFilter();
  const hammerGain = ctx.createGain();
  hammer.buffer = hammerBuffer;
  hammerFilter.type = "bandpass";
  hammerFilter.frequency.setValueAtTime(Math.min(5000, freq * 6), time);
  hammerFilter.Q.value = 0.8;
  hammerGain.gain.setValueAtTime(0.05 * velocity, time);
  hammer.connect(hammerFilter);
  hammerFilter.connect(hammerGain);
  hammerGain.connect(voice);
  hammer.onended = () => { hammer.disconnect(); hammerFilter.disconnect(); hammerGain.disconnect(); };
  hammer.start(time);
  let released = false;
  return {
    setFrequency(next, at) {
      partials.forEach(({ osc, ratio }) => osc.frequency.setTargetAtTime(next * ratio, at, 0.012));
    },
    release(at) {
      if (released) return;
      released = true;
      voice.gain.cancelScheduledValues(at);
      voice.gain.setValueAtTime(voice.gain.value, at);
      voice.gain.setTargetAtTime(0, at, 0.1);
      partials.forEach(({ osc }) => osc.stop(at + 0.75));
      setTimeout(() => { try { voice.disconnect(); } catch (_) { } }, Math.max(0, (at - ctx.currentTime + 0.9) * 1000));
    },
  };
}

/**
 * 单个钢琴音。返回的 GainNode 立即可连接到总线；
 * 采样尚未解码时稍后再起音（被打断则不再发声），加载失败用合成音。
 */
function createPianoTone(ctx, freq, time, duration, velocity = 0.72) {
  const output = ctx.createGain();
  const sampleMidi = nearestPianoSample(hzToMidi(freq));
  const buffer = pianoBuffers.get(sampleMidi);
  if (buffer) {
    startSampledNote(ctx, output, buffer, sampleMidi, freq, time, duration, velocity);
    return output;
  }
  const generation = pianoGeneration;
  loadPianoSample(ctx, sampleMidi).then((loaded) => {
    const late = ctx.currentTime - time;
    if (generation !== pianoGeneration || late > PIANO_LATE_LIMIT) return;
    const start = Math.max(time, ctx.currentTime + 0.005);
    const remaining = Math.max(0.06, duration - Math.max(0, late));
    if (loaded) {
      startSampledNote(ctx, output, loaded, sampleMidi, freq, start, remaining, velocity);
    } else {
      createSynthPianoVoice(ctx, output, freq, start, velocity).release(start + remaining);
    }
  });
  return output;
}

/** 音阶等快速连播：与和弦同一钢琴音色，力度稍轻 */
function createSimpleTone(ctx, freq, time, duration, peakGain = 0.12) {
  const velocity = Math.max(0.35, Math.min(0.9, (peakGain / 0.12) * 0.62));
  return createPianoTone(ctx, freq, time, duration, velocity);
}

/**
 * 简单的混响效果
 */
function createReverb(ctx, duration) {
  const convolver = ctx.createConvolver();

  // 创建脉冲响应
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * 1.5);
  const impulse = ctx.createBuffer(2, length, sampleRate);

  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) *
        Math.exp(-i / (sampleRate * 0.3)) *
        (1 - i / length);
    }
  }

  convolver.buffer = impulse;
  return convolver;
}

/**
 * 播放和弦声音 - 钢琴音色（音与音之间约 12ms 的自然错开）
 */
function playChord(frequencies, duration = 1.2, options = {}) {
  if (options.interrupt === false && suppressQueuedNotes) return;
  if (options.interrupt !== false) suppressQueuedNotes = false;
  try {
    const ctx = getAudioContext();
    if (options.interrupt !== false) interruptPlayback(ctx);
    const now = ctx.currentTime;
    // 88-key/MIDI chord input may contain more than eight held notes.
    const uniqueFreqs = [...new Set(frequencies)].slice(0, 16);
    // 音越多每个音越轻，避免厚和弦过响
    const velocity = Number.isFinite(options.velocity)
      ? Math.max(0.08, Math.min(1, options.velocity))
      : uniqueFreqs.length > 4 ? 0.62 : 0.72;

    uniqueFreqs.forEach((freq, index) => {
      const noteTime = now + index * 0.012;
      const tone = createPianoTone(ctx, freq, noteTime, duration, velocity);
      tone.connect(audioDryBus);
      tone.connect(audioWetBus);
    });
  } catch (e) {
    console.warn("playChord failure:", e);
  }
}

/** Independent piano voices for held MIDI notes and the 88-key chord latch. */
function createHeldPianoVoice(frequency, velocity = 100) {
  const ctx = getAudioContext();
  const level = Math.max(0.08, Math.min(1, velocity / 127));
  const output = ctx.createGain();
  const send = ctx.createGain();
  send.gain.value = 0.1;
  output.connect(audioMaster);
  output.connect(send);
  send.connect(audioReverb);
  const sampleMidi = nearestPianoSample(hzToMidi(frequency));
  let currentFrequency = frequency;
  let source = null;
  let synth = null;
  let stopped = false;

  const begin = (buffer) => {
    if (stopped) return;
    const start = ctx.currentTime + 0.003;
    if (!buffer) {
      synth = createSynthPianoVoice(ctx, output, currentFrequency, start, level, false);
      return;
    }
    source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.setValueAtTime(currentFrequency / midiToHz(sampleMidi), start);
    const brightness = ctx.createBiquadFilter();
    brightness.type = "lowpass";
    brightness.Q.value = 0.5;
    brightness.frequency.setValueAtTime(1600 + level * level * 15000, start);
    const gain = ctx.createGain();
    gain.gain.value = PIANO_SAMPLE_GAIN * (0.3 + 0.7 * level);
    source.connect(brightness);
    brightness.connect(gain);
    gain.connect(output);
    source.onended = () => {
      source.disconnect(); brightness.disconnect(); gain.disconnect();
      if (stopped) { output.disconnect(); send.disconnect(); }
    };
    source.start(start);
  };

  const cached = pianoBuffers.get(sampleMidi);
  if (cached) begin(cached);
  else loadPianoSample(ctx, sampleMidi).then(begin);

  return {
    setFrequency(nextFrequency) {
      if (stopped || !Number.isFinite(nextFrequency) || nextFrequency <= 0) return;
      currentFrequency = nextFrequency;
      const now = ctx.currentTime;
      source?.playbackRate.setTargetAtTime(nextFrequency / midiToHz(sampleMidi), now, 0.012);
      synth?.setFrequency(nextFrequency, now);
    },
    stop() {
      if (stopped) return;
      stopped = true;
      const now = ctx.currentTime;
      output.gain.cancelScheduledValues(now);
      output.gain.setValueAtTime(output.gain.value, now);
      output.gain.setTargetAtTime(0, now, 0.08);
      if (source) source.stop(now + 0.6);
      else if (synth) synth.release(now);
      else setTimeout(() => { output.disconnect(); send.disconnect(); }, 100);
    },
  };
}

/** 正在发声时立即打断（没有创建过 AudioContext 时什么也不做） */
export function interruptIfActive() {
  if (audioCtx) interruptPlayback(audioCtx);
}

/** 把一个音源接到当前的干声（和可选的混响）总线；总线在每次打断后重建，所以要在发声时取用 */
export function connectOutput(node, { wet = true } = {}) {
  node.connect(audioDryBus);
  if (wet) node.connect(audioWetBus);
}

/** 按下全局"停止"后调用：丢弃已经排进计时器、尚未发声的后续音 */
export function suppressQueued() {
  suppressQueuedNotes = true;
}

export function setMasterVolume(value) {
  masterVolume = Math.max(0, Math.min(1, value));
  try { localStorage.setItem(VOLUME_STORAGE_KEY, String(masterVolume)); } catch (_) { }
  if (audioMaster && audioCtx) audioMaster.gain.setTargetAtTime(MASTER_BASE_GAIN * masterVolume, audioCtx.currentTime, 0.02);
}

export const getMasterVolume = () => masterVolume;

export { getAudioContext, interruptPlayback, playChord, createHeldPianoVoice, createPianoTone, createSimpleTone };

// Side-B 的"胜利瞬间"：玩家第一次真的做到某件事时，立刻给视觉和声音反馈（任务条、关卡播放器共用）。
// 声音用 audio_engine 的钢琴（必须和其他模块用同一个 import 写法，否则会多建一个 AudioContext）。
const lang = () => { const l = globalThis.window?.__lang || 'zh'; return ['zh', 'ja', 'en'].includes(l) ? l : 'en'; };
const tx = (v) => (v == null ? '' : typeof v === 'string' ? v : v[lang()] ?? v.en ?? '');
const TITLE = { zh: '突破！', ja: 'ブレイクスルー！', en: 'Breakthrough!' };

/** 上行琶音 C5–E5–G5–C6 */
export function chime() {
  import('./audio_engine.js?v=20261009-audio1').then(({ playChord }) => {
    const hz = (m) => 440 * 2 ** ((m - 69) / 12);
    [72, 76, 79, 84].forEach((m, i) => setTimeout(() => playChord([hz(m)], 0.5, { interrupt: i === 0 }), i * 110));
  }).catch(() => {});
}

/**
 * 在 host 里弹出"突破！"+ 一句话，并响一下；几秒后淡出
 * @returns {HTMLElement} 弹出的元素
 */
export function celebrate(host, text, { sound = true } = {}) {
  const flash = document.createElement('div');
  flash.className = 'lab-breakthrough';
  flash.setAttribute('role', 'status');
  const title = document.createElement('strong');
  title.textContent = TITLE[lang()];
  const line = document.createElement('span');
  line.textContent = tx(text);
  flash.append(title, line);
  host.appendChild(flash);
  if (sound) chime();
  setTimeout(() => flash.classList.add('is-leaving'), 3200);
  setTimeout(() => flash.remove(), 3800);
  return flash;
}

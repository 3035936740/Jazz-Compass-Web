// 乐理闯关 Boss 立绘：完整正方形画布（素材 800 × 800，网页用 600 × 600 WebP）、锚点 (0.5, 0.95)，不裁切、不按内容缩放（见 resources/boss 与 jcchar/README）。
// 切换状态时像纸片一样沿左右方向转 360°：0 → 90° 时缩成一条线，此时替换贴图，再 90° → 360°（共约 0.72 秒）；
// 快速切换以最后一次为准。默认每 2.4 秒轻微果冻起伏，点击（或 Enter / 空格）触发约 0.82 秒的大弹跳，弹跳与翻转可同时播放。
// 动画实现沿用素材包 index.html 的做法；系统设置"减少动态效果"时直接换图、不起伏不弹跳。

const CATEGORY = {
  default: 'expressions', proud: 'expressions', mocking: 'expressions', confused: 'expressions', shocked: 'expressions',
  angry: 'expressions', serious: 'expressions', hurt: 'expressions', defiant: 'expressions', concede: 'expressions',
  idle: 'poses', speaking: 'poses', correct: 'poses', incorrect: 'poses', streak: 'poses',
  one_star: 'endings', two_star: 'endings', three_star: 'endings',
  phase2: 'boss', first_meeting: 'boss', return_meeting: 'boss',
};
export const BOSS_STATES = Object.keys(CATEGORY);
/** 某个角色某个状态的贴图路径（dir 如 01_mimi） */
/**
 * 素材包里内容完全相同的贴图（逐字节比较过；素材 README：默认、待机和初次见面复用同一张基础立绘）。
 * 换到同一张图时不需要翻转：直接换状态，画面不动。
 */
export const SAME_PICTURE = { idle: 'default', first_meeting: 'default' };
const pictureState = (state) => SAME_PICTURE[state] || state;
// 立绘用压缩过的 WebP（由素材包 800 × 800 PNG 等比缩成 600 × 600，完整画布、锚点比例不变，透明通道保留）；
// 地图和关卡卡片上的小头像用 192 × 192 的缩略图（.thumb.webp），避免手机加载整张大图。原始 PNG 在素材包 jcchar 里。
const pathOf = (dir, state, ext) => { const s = CATEGORY[state] ? pictureState(state) : 'default'; return `resources/boss/${dir}/${CATEGORY[s]}/${s}${ext}`; };
export const spriteFile = (dir, state) => pathOf(dir, state, '.webp');
export const thumbFile = (dir, state) => pathOf(dir, state, '.thumb.webp');

const decoded = new Map();
function preload(file) {
  if (!decoded.has(file)) {
    const ImageCtor = globalThis.Image;
    if (!ImageCtor) return Promise.resolve();
    const image = new ImageCtor();
    image.src = file;
    decoded.set(file, (image.decode ? image.decode() : Promise.resolve()).catch((error) => { decoded.delete(file); throw error; }));
  }
  return decoded.get(file);
}
/** 预先解码一组状态，翻转时不会卡在空白 */
export const preloadStates = (dir, states) => states.forEach((s) => preload(spriteFile(dir, s)).catch(() => {}));

const reducedMotion = () => Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
const nextFrame = () => new Promise((resolve) => (globalThis.requestAnimationFrame ? globalThis.requestAnimationFrame(() => resolve()) : setTimeout(resolve, 16)));

/**
 * 一个 Boss 舞台：{ el, show(state), bounce(), still(on), state() }
 * motion：角色的动画语言（spring 米米 / still 塞维尔 / drift 诺亚 / wild 爵 / calm 阿拉娅 / zero 零），只改起伏幅度和速度
 */
export function createBossSprite({ dir, name, motion = 'spring', state = 'default', label = () => '' }) {
  const doc = globalThis.document;
  const box = doc.createElement('div');
  box.className = `boss-sprite motion-${motion}`;
  const hit = doc.createElement('div');
  hit.className = 'boss-hit';
  hit.setAttribute('role', 'button');
  hit.tabIndex = 0;
  const idle = doc.createElement('div');
  idle.className = 'boss-idle';
  const click = doc.createElement('div');
  click.className = 'boss-click';
  const img = doc.createElement('img');
  img.className = 'boss-img';
  img.width = 600; img.height = 600;
  img.decoding = 'async';
  click.appendChild(img);
  idle.appendChild(click);
  hit.appendChild(idle);
  box.appendChild(hit);

  let current = null; // 已显示的状态
  let pending = null;
  let busy = false;
  const commit = (s) => {
    current = s;
    img.src = spriteFile(dir, s);
    img.alt = `${name} · ${label(s) || s}`;
    img.dataset.state = s;
    hit.setAttribute('aria-label', img.alt);
  };
  async function rotate(from, to, duration, easing) {
    if (!img.animate) { img.style.transform = `rotateY(${to}deg)`; return; }
    const animation = img.animate([{ transform: `rotateY(${from}deg)` }, { transform: `rotateY(${to}deg)` }], { duration, easing, fill: 'forwards' });
    await animation.finished;
    img.style.transform = `rotateY(${to}deg)`;
    animation.cancel();
  }
  async function drain() {
    if (busy) return;
    busy = true;
    try {
      while (pending) {
        const next = pending; pending = null;
        try { await preload(spriteFile(dir, next)); } catch (_) { if (!pending) commit(next); continue; }
        if (pending) continue;
        // 同一张图（同一状态，或内容相同的别名状态）不翻转，直接换；减少动态效果时也直接换
        if (!current || spriteFile(dir, current) === spriteFile(dir, next) || reducedMotion() || !img.isConnected) { commit(next); continue; }
        // 完整的 0 → 360°：正好侧面朝前（90°）时换贴图
        img.dataset.flipping = 'true';
        await rotate(0, 90, 180, 'ease-in');
        commit(next);
        await nextFrame();
        await rotate(90, 360, 540, 'ease-out');
        img.style.transform = '';
        img.dataset.flipping = 'false';
      }
    } finally {
      busy = false;
      img.dataset.flipping = 'false';
      img.style.transform = '';
      if (pending) drain();
    }
  }
  /** 换状态（纸片翻转）；连续调用以最后一次为准 */
  const show = (s) => {
    if (!CATEGORY[s]) return;
    if (!current) { commit(s); return; }
    // 没在翻转、图也一样：只更新状态名，不动画面
    if (!busy && !pending && spriteFile(dir, current) === spriteFile(dir, s)) { if (current !== s) commit(s); return; }
    pending = s; drain();
  };

  let jelly = null;
  /** 大果冻弹跳：从当前形变重新开始，连点也连贯 */
  function bounce() {
    if (reducedMotion() || !click.animate) return;
    const start = globalThis.getComputedStyle?.(click)?.transform;
    if (jelly) jelly.cancel();
    const frames = [
      { offset: 0, transform: !start || start === 'none' ? 'translateY(0) scale(1,1)' : start },
      { offset: 0.16, transform: 'translateY(.75%) scale(1.035,.88)' },
      { offset: 0.40, transform: 'translateY(-1%) scale(.982,1.026)' },
      { offset: 0.62, transform: 'translateY(.25%) scale(1.018,.957)' },
      { offset: 0.80, transform: 'translateY(-.375%) scale(.992,1.012)' },
      { offset: 1, transform: 'translateY(0) scale(1,1)' },
    ].map((f) => ({ ...f, easing: 'cubic-bezier(.22,.7,.3,1)' }));
    const animation = click.animate(frames, { duration: 820, easing: 'linear' });
    jelly = animation;
    animation.onfinish = () => { if (jelly === animation) jelly = null; };
  }
  hit.addEventListener('click', bounce);
  hit.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!e.repeat) bounce(); } });
  /** 停止起伏（爵三星投降时第一次完全静止） */
  const still = (on = true) => box.classList.toggle('is-still', on);
  /** 换到新的页面上时接着原来的起伏相位，不会每题从头弹一下 */
  const resync = () => { idle.style.animationDelay = `-${((globalThis.performance?.now?.() ?? Date.now()) % 2400) / 1000}s`; };
  commit(state);
  resync();
  return { el: box, show, bounce, still, resync, state: () => pending || current };
}

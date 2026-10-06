// 应用外壳：全局音量与停止按钮、全局 MIDI 输入、PWA 注册、五线谱导出、键盘快捷键
// 从 script.js 拆出；需要的面板状态由 initAppShell 的参数传入。
import { getMasterVolume, setMasterVolume, createHeldPianoVoice } from './audio_engine.js?v=20261006-guide-audio1';
import { decodeMidiMessage } from './microtonal.js?v=20261004-m1';

/**
 * @param {{ stopAllPlayback: () => void, navButtons: HTMLElement[], noteName: (pc: number) => string, reverseFormulas: () => Record<string, string> }} deps
 */
export function initAppShell({ stopAllPlayback, navButtons, noteName, reverseFormulas }) {
  // 移动端导航使用整条轨道拖动 轻点仍然打开工具 横向拖动则只移动轨道
  {
    const nav = document.querySelector('.feature-nav');
    const mobileNav = window.matchMedia('(max-width: 900px)');
    if (nav) {
      let drag = null;
      let momentumFrame = 0;
      let suppressClickUntil = 0;

      const stopMomentum = () => {
        if (momentumFrame) cancelAnimationFrame(momentumFrame);
        momentumFrame = 0;
      };
      const startMomentum = (velocity) => {
        if (Math.abs(velocity) < 0.02) return;
        let lastTime = performance.now();
        const step = (now) => {
          const elapsed = Math.min(32, now - lastTime);
          lastTime = now;
          const previous = nav.scrollLeft;
          nav.scrollLeft += velocity * elapsed;
          velocity *= Math.pow(0.92, elapsed / 16);
          if (Math.abs(velocity) > 0.02 && nav.scrollLeft !== previous) momentumFrame = requestAnimationFrame(step);
          else momentumFrame = 0;
        };
        momentumFrame = requestAnimationFrame(step);
      };
      const finishDrag = (event) => {
        if (!drag || event.pointerId !== drag.pointerId) return;
        const { moved, velocity } = drag;
        drag = null;
        nav.classList.remove('is-dragging');
        try { nav.releasePointerCapture(event.pointerId); } catch (_) { }
        if (moved) {
          suppressClickUntil = performance.now() + 350;
          startMomentum(velocity);
        }
      };

      nav.dataset.dragScroll = 'true';
      nav.addEventListener('pointerdown', (event) => {
        if (!mobileNav.matches || event.pointerType === 'mouse') return;
        stopMomentum();
        drag = {
          pointerId: event.pointerId,
          startX: event.clientX,
          lastX: event.clientX,
          lastTime: performance.now(),
          velocity: 0,
          moved: false,
        };
        nav.setPointerCapture?.(event.pointerId);
      });
      nav.addEventListener('pointermove', (event) => {
        if (!drag || event.pointerId !== drag.pointerId) return;
        const distance = event.clientX - drag.startX;
        if (!drag.moved && Math.abs(distance) < 5) return;
        drag.moved = true;
        nav.classList.add('is-dragging');
        event.preventDefault();
        const now = performance.now();
        const elapsed = Math.max(1, now - drag.lastTime);
        const scrollDelta = drag.lastX - event.clientX;
        nav.scrollLeft += scrollDelta;
        drag.velocity = drag.velocity * 0.35 + (scrollDelta / elapsed) * 0.65;
        drag.lastX = event.clientX;
        drag.lastTime = now;
      });
      nav.addEventListener('pointerup', finishDrag);
      nav.addEventListener('pointercancel', finishDrag);
      nav.addEventListener('click', (event) => {
        if (performance.now() > suppressClickUntil) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        suppressClickUntil = 0;
      }, true);
      nav.addEventListener('dragstart', (event) => event.preventDefault());
      nav.addEventListener('wheel', stopMomentum, { passive: true });
    }
  }

  {
    const volumeInput = document.getElementById('global-volume');
    if (volumeInput) {
      volumeInput.value = String(Math.round(getMasterVolume() * 100));
      volumeInput.addEventListener('input', () => setMasterVolume(Number(volumeInput.value) / 100));
    }
    document.getElementById('global-stop')?.addEventListener('click', stopAllPlayback);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !event.defaultPrevented) stopAllPlayback();
    });
  }

  // ===================== 全局 MIDI 输入 =====================
  // 在任何面板中用 MIDI 键盘弹奏钢琴音；按住的音显示在侧栏并识别和弦（可跳到"和弦转换"）。
  // 微分音面板有自己的 MIDI 处理（含弯音），在该面板时这里不发声，避免重复。
  {
    const midiButton = document.getElementById('global-midi');
    const midiLabel = document.getElementById('midi_connect');
    const midiReadout = document.getElementById('midi-readout');
    const held = new Map();       // MIDI 音 -> 钢琴声部
    const sustained = new Set();  // 踏板保持中的音
    let sustainPedal = false;
    let access = null;
    const activeFeature = () => document.querySelector('.feature-btn.active')?.dataset.feature;
    const releaseVoice = (note) => { held.get(note)?.stop(); held.delete(note); sustained.delete(note); };

    /** 以每个音作根尝试精确匹配和弦公式，优先以低音为根；否则写成斜杠和弦 */
    function nameHeldChord(notes) {
      if (notes.length < 3) return null;
      const sorted = [...notes].sort((a, b) => a - b);
      const pcs = [...new Set(sorted.map((n) => n % 12))];
      const bassPc = sorted[0] % 12;
      const roots = [bassPc, ...pcs.filter((pc) => pc !== bassPc)];
      for (const rootPc of roots) {
        const key = [...new Set(pcs.map((pc) => (pc - rootPc + 12) % 12))].sort((a, b) => a - b).join(',');
        const quality = reverseFormulas()?.[key];
        if (quality === undefined) continue;
        const name = `${noteName(rootPc)}${quality === 'maj' ? '' : quality}`;
        return rootPc === bassPc ? name : `${name}/${noteName(bassPc)}`;
      }
      return null;
    }

    function paintReadout() {
      const notes = [...held.keys()].sort((a, b) => a - b);
      midiReadout.replaceChildren();
      if (!notes.length) return;
      midiReadout.appendChild(document.createTextNode(notes.map((n) => `${noteName(n % 12)}${Math.floor(n / 12) - 1}`).join(' ')));
      const chord = nameHeldChord(notes);
      if (chord) {
        const link = document.createElement('a');
        link.href = `#chord?q=${encodeURIComponent(chord)}`;
        link.textContent = ` → ${chord}`;
        midiReadout.appendChild(link);
      }
    }

    function handleGlobalMidi(event) {
      const [status = 0, data1 = 0, data2 = 0] = event.data || [];
      if ((status & 0xf0) === 0xb0 && data1 === 64) {
        sustainPedal = data2 >= 64;
        if (!sustainPedal) [...sustained].forEach(releaseVoice);
        paintReadout();
        return;
      }
      const message = decodeMidiMessage(event.data);
      if (!message || (message.type !== 'noteOn' && message.type !== 'noteOff')) return;
      window.dispatchEvent(new CustomEvent('toolbox-midi', { detail: message }));
      if (activeFeature() === 'micro') { midiReadout.textContent = window.__('midi_micro'); return; }
      if (message.type === 'noteOn') {
        releaseVoice(message.note);
        held.set(message.note, createHeldPianoVoice(440 * 2 ** ((message.note - 69) / 12), message.velocity));
      } else if (sustainPedal) {
        sustained.add(message.note);
        return;
      } else {
        releaseVoice(message.note);
      }
      paintReadout();
    }

    function attachInputs() {
      if (!access) return;
      for (const input of access.inputs.values()) {
        input.removeEventListener('midimessage', handleGlobalMidi);
        input.addEventListener('midimessage', handleGlobalMidi);
      }
      const ready = access.inputs.size > 0;
      midiLabel.textContent = window.__(ready ? 'midi_ready' : 'midi_connect');
      midiButton.classList.toggle('active', ready);
      if (!ready) { midiReadout.textContent = window.__('midi_waiting'); [...held.keys()].forEach(releaseVoice); }
      else if (!held.size) midiReadout.textContent = '';
    }

    midiButton?.addEventListener('click', async () => {
      if (!navigator.requestMIDIAccess) { midiReadout.textContent = window.__('midi_unavailable'); return; }
      try {
        access = access || await navigator.requestMIDIAccess({ sysex: false });
        access.onstatechange = attachInputs;
        attachInputs();
      } catch (_) {
        midiReadout.textContent = window.__('midi_denied');
      }
    });
  }

  // ===================== PWA：离线缓存 =====================
  // Service worker 只能在安全上下文（https 或 localhost）注册；通过局域网 IP 或 file:// 打开时自动跳过
  if ("serviceWorker" in navigator && window.isSecureContext && location.protocol !== "file:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch((error) => console.warn("Service worker registration failed", error));
    });
  }

  // ===================== 五线谱导出（PNG / SVG） =====================
  // 每个谱例容器下方自动加一行导出按钮；谱面变化后（重新渲染）仍然有效，因为导出时才读取当前的 <svg>
  {
    const STAFF_HOSTS = ".mk-staff-scroll, .compose-score-scroll";
    const fileBase = () => `${document.querySelector(".feature-btn.active")?.dataset.feature || "score"}-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}`;
    function decorate(host) {
      if (host.dataset.exportReady || !host.querySelector("svg")) return;
      host.dataset.exportReady = "1";
      const bar = document.createElement("div");
      bar.className = "staff-export";
      [["PNG", "png"], ["SVG", "svg"]].forEach(([label, format]) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "staff-export-btn";
        btn.textContent = `⤓ ${label}`;
        btn.title = window.__("staff_export_hint");
        btn.addEventListener("click", async () => {
          const svg = host.querySelector("svg");
          if (!svg) return;
          const { downloadPng, downloadSvg } = await import("./midi_export.js?v=20261002-ex");
          if (format === "svg") downloadSvg(fileBase(), svg);
          else if (!(await downloadPng(fileBase(), svg))) downloadSvg(fileBase(), svg);
        });
        bar.appendChild(btn);
      });
      host.after(bar);
    }
    let scanQueued = false;
    const scan = () => { scanQueued = false; document.querySelectorAll(STAFF_HOSTS).forEach(decorate); };
    const panelsRoot = document.querySelector(".panels");
    if (panelsRoot && typeof MutationObserver !== "undefined") {
      new MutationObserver(() => { if (!scanQueued) { scanQueued = true; setTimeout(scan, 0); } }).observe(panelsRoot, { childList: true, subtree: true });
    }
    scan();
  }

  // ===================== 键盘快捷键 =====================
  // Esc 停止；/ 聚焦当前面板的第一个输入框；[ ] 切换面板；M 静音；? 快捷键说明
  {
    const isTyping = (target) => target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
    let volumeBeforeMute = null;
    const helpDialog = document.getElementById('shortcut-help');
    document.addEventListener('keydown', (event) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || isTyping(event.target)) return;
      const active = document.querySelector('.feature-btn.active');
      if (event.key === '/') {
        const panel = document.getElementById(`panel-${active?.dataset.feature}`);
        const field = panel?.querySelector('input[type="text"], input:not([type]), textarea, select');
        if (field) { event.preventDefault(); field.focus(); }
      } else if (event.key === '[' || event.key === ']') {
        const index = navButtons.indexOf(active);
        const next = navButtons[(index + (event.key === ']' ? 1 : -1) + navButtons.length) % navButtons.length];
        event.preventDefault();
        next.click();
        next.focus();
      } else if (event.key === 'm' || event.key === 'M') {
        const input = document.getElementById('global-volume');
        if (volumeBeforeMute === null) { volumeBeforeMute = getMasterVolume(); setMasterVolume(0); }
        else { setMasterVolume(volumeBeforeMute || 0.8); volumeBeforeMute = null; }
        if (input) input.value = String(Math.round(getMasterVolume() * 100));
      } else if (event.key === '?' && helpDialog) {
        event.preventDefault();
        if (helpDialog.open) helpDialog.close(); else helpDialog.showModal?.();
      }
    });
    document.getElementById('shortcut-help-close')?.addEventListener('click', () => helpDialog?.close());
    document.getElementById('shortcut-open')?.addEventListener('click', () => helpDialog?.showModal?.());
  }
}

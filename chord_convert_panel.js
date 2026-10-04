// 和弦转换面板的结果（从 script.js 拆出）：和弦符号 → 音名、音级、按调号拼写的五线谱、频率与试听
// 和弦符号的解析见 chord_symbols.js；拼写见 chord_spelling.js；谱面见 staff_svg.js
import { chordNotesToFrequencies, semitoneToFreq } from "./note_frequency.js?v=20261002-split";
import { playChord } from "./audio_engine.js?v=20261003-a3";
import { spellChord, voiceSpelledChord } from "./chord_spelling.js?v=20261002-sp";
import { parseChordSymbol, describeTones } from "./chord_symbols.js?v=20261002-alt3";
import { renderStaff, chooseClef } from "./staff_svg.js?v=20261002-fix";
import { parsePitch } from "./pitch_spelling.js";

/**
 * @param {object} conv jazz_compass.js 的 EnhancedChordConverter
 * @param {HTMLElement} targetEl 输出区域
 * @param {string} inputValue 输入的和弦符号
 */
export function renderChordConversion(conv, targetEl, inputValue) {
  const v = inputValue.trim();
  const data = conv._ensureNotesAndRoot(v, true);
  const notes = data.notes;
  const displayNotes = data.voicing?.length ? data.voicing : notes;
  const chord = data.chord;

  if (notes && Array.isArray(notes) && notes.length > 0) {
    const offsets = displayNotes.map((n) => conv.noteToIdx[n]);
    // 美化输出：根 / 链接 和 列表 + 偏移 + 小键盘视图
    const root = data.root || notes[0];
    const isSlash = v.includes("/");
    const bass = data.bass;
    const bassIdx = bass ? conv.noteToIdx[bass] : null;
    const htmlParts = [];
    htmlParts.push(`<div class="chord-result-heading"><div><span class="result-eyebrow">${window.__("identified_chord")}</span><h3 class="chord-symbol">${chord}</h3></div><div class="chord-staff-inline" id="chord-staff"></div><span class="chord-note-count">${displayNotes.length} ${window.__("note_count_unit")}</span></div>`);
    /*
    htmlParts.push(
      `<p><strong>${window.__("root_label")}：</strong>${root} <strong style="margin-left:12px">${window.__("slash_label")}：</strong>${isSlash}</p>`,
    );
  */
    // 按音级拼写和弦音（E 大三和弦是 E G# B），音程标签取自拼写结果  ref:omt2e-chord-symbols
    const typedRoot = v.match(/^([A-G](?:#|b)?)/)?.[1] || root;
    const typedBass = isSlash ? v.slice(v.lastIndexOf("/") + 1).trim().match(/^([A-G](?:#|b)?)/)?.[1] : null;
    // 能按和弦标记的定义解析时（含 Blackadder），用定义拼写与标签；否则按音级集合推断  ref:soundquest-blk
    const symbolic = parseChordSymbol(v);
    const spelled = symbolic ? null : spellChord(typedRoot, notes.map((n) => conv.noteToIdx[n]));
    const prettyName = (name) => name.replace(/##/g, "𝄪").replace(/#/g, "♯").replace(/([A-G])bb/g, "$1𝄫").replace(/([A-G])b/g, "$1♭");
    const cells = symbolic
      ? describeTones(symbolic).map((tone) => ({ name: tone.name, label: tone.label, pc: parsePitch(`${tone.name}4`).pc }))
      : spelled ? spelled.map((tone) => ({ name: tone.name, label: tone.label, pc: parsePitch(`${tone.name}4`).pc })) : [];
    if (symbolic?.quality === "blk" && symbolic.canonical !== v) {
      htmlParts.push(`<p class="small-muted chord-alias-note">= ${symbolic.canonical}（${window.__("blk_name")}）</p>`);
    }
    if (typedBass && !cells.some((cell) => cell.pc === bassIdx)) cells.unshift({ name: typedBass, label: window.__("bass_tone"), pc: bassIdx });
    else if (typedBass) cells.sort((a, b) => (a.pc === bassIdx ? -1 : b.pc === bassIdx ? 1 : 0));
    htmlParts.push('<div class="note-grid">');
    cells.forEach((cell) => {
      const classes = ["note-cell"];
      if (bass && cell.pc === bassIdx) classes.push("bass-note");
      if (cell.pc === conv.noteToIdx[root]) classes.push("root-note");
      htmlParts.push(`<div class="${classes.join(" ")}"><div class="note">${prettyName(cell.name)}</div><span class="note-interval">${cell.label}</span></div>`);
    });
    htmlParts.push("</div>");

    const rootIdx = conv.noteToIdx[root];
    const activeSet = new Set(symbolic ? [...symbolic.tones.map((tone) => parsePitch(`${tone.name}4`).pc), ...(symbolic.bass ? [parsePitch(`${symbolic.bass}4`).pc] : [])] : offsets);
    const whitePcs = [0, 2, 4, 5, 7, 9, 11, 0, 2, 4, 5, 7, 9, 11];
    const blackAfter = new Set([0, 2, 5, 7, 9]);
    const blackPc = { 0: 1, 2: 3, 5: 6, 7: 8, 9: 10 };
    const keys = whitePcs.map((pc, index) => {
      const octave = index < 7 ? 4 : 5;
      const white = `<button type="button" class="piano-key piano-white-key${activeSet.has(pc) ? " is-active" : ""}${rootIdx === pc ? " is-root" : ""}${bassIdx === pc ? " is-bass" : ""}" data-piano-pc="${pc}" data-piano-octave="${octave}" aria-label="${conv.idxToNote[pc]}${octave}"><span class="piano-key-label">${conv.idxToNote[pc]}</span></button>`;
      let black = "";
      if (blackAfter.has(pc)) {
        const accidentalPc = blackPc[pc];
        black = `<button type="button" class="piano-key piano-black-key${activeSet.has(accidentalPc) ? " is-active" : ""}${rootIdx === accidentalPc ? " is-root" : ""}${bassIdx === accidentalPc ? " is-bass" : ""}" data-piano-pc="${accidentalPc}" data-piano-octave="${octave}" aria-label="${conv.idxToNote[accidentalPc]}${octave}"><span class="piano-key-label">${conv.idxToNote[accidentalPc]}</span></button>`;
      }
      return `<div class="piano-white-wrap">${white}${black}</div>`;
    }).join("");
    htmlParts.push(`<section class="piano-section"><div class="piano-section-head"><div><strong>${window.__("piano_title")}</strong><span class="piano-caption">${window.__("piano_hint")}</span></div><button type="button" class="chord-play-button" id="chord-play-result"><span aria-hidden="true">►</span> ${window.__("play_chord")}</button><button type="button" class="chord-play-button ghost" id="chord-to-staff">${window.__("chord_to_staff")}</button></div><div class="mini-keyboard piano-keyboard">${keys}</div><div class="piano-legend"><span><i class="legend-root"></i>${window.__("root_label")}</span><span><i class="legend-bass"></i>${window.__("bass_tone")}</span><span><i class="legend-tone"></i>${window.__("chord_tone")}</span><span class="piano-range">C4 — B5</span></div></section>`);

    targetEl.innerHTML = htmlParts.join("");
    let staffPitches = symbolic ? symbolic.pitches : null;
    if (symbolic) {
      const staff = renderStaff({
        staves: [{ clef: chooseClef(symbolic.pitches), bars: [[{ p: symbolic.pitches, d: 4 }]] }],
        beats: 4, top: 34, rowGap: 34, ariaLabel: `${symbolic.canonical}: ${symbolic.pitches.join(" ")}`,
        onNote: () => playChord(symbolic.pitches.map((name) => 440 * 2 ** ((parsePitch(name).midi - 69) / 12))),
      });
      targetEl.querySelector("#chord-staff")?.appendChild(staff);
    } else if (spelled) {
      try {
        // 根音高于 E4 或音数较多（延伸音和弦）时从第 3 八度起排，避免谱面过高
        const rootOctave = spelled.length >= 5 || parsePitch(`${typedRoot}4`).midi > 64 ? 3 : 4;
        const pitches = voiceSpelledChord(typedRoot, spelled, { rootOctave, bass: typedBass && typedBass !== typedRoot ? typedBass : null });
        staffPitches = pitches;
        const staff = renderStaff({
          staves: [{ clef: chooseClef(pitches), bars: [[{ p: pitches, d: 4 }]] }],
          beats: 4,
          top: 34,
          rowGap: 34,
          ariaLabel: `${chord}: ${pitches.join(" ")}`,
          onNote: () => playChord(pitches.map((name) => 440 * 2 ** ((parsePitch(name).midi - 69) / 12))),
        });
        targetEl.querySelector("#chord-staff")?.appendChild(staff);
      } catch (error) {
        targetEl.querySelector("#chord-staff")?.remove();
      }
    } else {
      targetEl.querySelector("#chord-staff")?.remove();
    }
    // 送到五线谱：不清空谱面，接在最后，按五线谱当前选中的时值成为下一个和弦（#staff?q=@append）
    const toStaff = targetEl.querySelector("#chord-to-staff");
    if (toStaff && !staffPitches?.length) toStaff.remove();
    toStaff?.addEventListener("click", () => {
      try { globalThis.localStorage?.setItem("jc-staff-append", JSON.stringify({ pitches: staffPitches, symbol: chord })); } catch (_) { /* ignore */ }
      if (globalThis.location) globalThis.location.hash = "#staff?q=@append";
    });
    targetEl.querySelector("#chord-play-result")?.addEventListener("click", () => {
      // 按定义解析得到的排列（alt 每次不同）与谱面一致时，直接播放谱面上的音
      if (symbolic) { playChord(symbolic.pitches.map((name) => 440 * 2 ** ((parsePitch(name).midi - 69) / 12))); return; }
      const { freqs } = chordNotesToFrequencies(displayNotes, isSlash ? 3 : 4, false, null);
      playChord(freqs);
    });
    if (symbolic?.realization) {
      targetEl.querySelector(".chord-result-heading")?.insertAdjacentHTML("afterend", `<p class="small-muted chord-alias-note">= ${symbolic.realization}（${window.__("alt_random_note")}）</p>`);
    }
    targetEl.querySelectorAll("[data-piano-pc]").forEach((key) => {
      key.addEventListener("click", () => {
        playChord([semitoneToFreq(Number(key.dataset.pianoPc), Number(key.dataset.pianoOctave))], 0.7);
      });
    });
    return;
  }

  // 退回到 parse（只显示 chord 与 notes，忽略 offsets）
  try {
    const data = conv.parseAndGetNotes(v);
    const display = {
      chord: data.chord,
      notes: data.notes,
      voicing: data.voicing,
      isSlash: data.isSlash,
    };
    targetEl.innerHTML = `<h3>${window.__f("chord_parse_heading", { input: v })}</h3><pre>${JSON.stringify(display, null, 2)}</pre>`;
  } catch (e) {
    targetEl.innerHTML = `<h3>${window.__("chord_parse_error")}</h3><pre>${e.message}</pre>`;
  }
}

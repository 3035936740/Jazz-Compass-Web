// 古典和声面板的"连续和声连接"大谱表：四部声部、每个和弦下的五行标注、|Key=…|、点列试听、点标注退回、四部和声检查标记
// 从 script.js 拆出来；面板状态通过 ctx 传进来：{ classical, segments, settings, modeLabel, localize, text, lang }
// 返回 { drawn, satb }：drawn 表示谱表画出来了（上面那排和弦卡片就不用再显示），satb 是拼写好的四部和声（"送到五线谱"用）
import { renderVisual as renderStaffVisual } from "./learn_visuals.js?v=20261004-m5";
import { keyFifths } from "./staff_musicxml.js?v=20261003-x1";
import { checkSATB } from "./satb_check.js?v=20261004-r32";
import { issueList, drawIssueMarks } from "./satb_marks.js?v=20261003-r31";

export function drawClassicalStaff(ctx, container, displaySymbol = (x) => x, after = null, { onPlay, onPick } = {}) {
  const { classical, segments: classicalSegments, settings, modeLabel: classicalModeLabel, localize: localizeClassicalText, text: clt, lang = 'zh' } = ctx;
  let classicalLastSatb = null;
  const entries = [];
  classicalSegments.forEach((segment, segmentIndex) => {
    const palette = new Map(classical.getPalette(segment.key, segment.mode).map((entry) => [entry.symbol, entry]));
    segment.symbols.forEach((symbol, chainIndex) => {
      const entry = palette.get(symbol);
      if (entry) entries.push({ entry, segmentIndex, chainIndex, segment, firstOfSegment: !entries.some((e) => e.segmentIndex === segmentIndex) });
    });
  });
  if (!entries.length) return { drawn: false, satb: classicalLastSatb };
  const card = document.createElement("div");
  card.className = "classical-chain-staff";
  const place = () => (after?.parentNode === container ? after.after(card) : container.appendChild(card));
  const solved = classical.voiceSequence(entries.map((e) => e.entry));
  if (!solved.ok && !solved.voices) {
    const note = document.createElement("p");
    note.className = "small-muted";
    note.textContent = solved.reason;
    card.appendChild(note);
    place();
    return { drawn: false, satb: classicalLastSatb };
  }
  // 没有合法声部连接：照样画出（用违反规则最少的配置），上面写明这种写法不对；仍然可以播放、送入五线谱
  if (solved.fallback) {
    const note = document.createElement("p");
    note.className = "classical-voicing-warning";
    note.setAttribute("role", "status");
    note.textContent = clt("cl_voicing_fallback", { reason: solved.reason, issues: [...new Set((solved.problems || []).flatMap((p) => p.issues))].map(localizeClassicalText).join("、") || "—" });
    card.appendChild(note);
  }
  const LETTER = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const parseName = (name) => {
    const m = /^([A-G])([#b♯♭x]*)$/.exec(String(name).trim());
    if (!m) return null;
    const acc = [...m[2]].reduce((sum, ch) => sum + (ch === "#" || ch === "♯" ? 1 : ch === "x" ? 2 : -1), 0);
    return { letter: m[1], acc };
  };
  // 用这个和弦自己的音名拼写每个声部的 MIDI 音
  const spell = (midi, names) => {
    const pc = ((midi % 12) + 12) % 12;
    const found = names.map(parseName).filter(Boolean).find((n) => (((LETTER[n.letter] + n.acc) % 12) + 12) % 12 === pc);
    const n = found || parseName(["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"][pc]);
    const octave = Math.round((midi - LETTER[n.letter] - n.acc) / 12) - 1;
    const sign = n.acc > 0 ? "#".repeat(n.acc) : "b".repeat(-n.acc);
    return `${n.letter}${sign}${octave}`;
  };
  const pretty = (text) => String(text).replace(/b/g, "♭").replace(/#/g, "♯");
  const arpeggio = settings.mode === "arpeggio";
  const [meterTop, meterBottom] = String(settings.meter || "4/4").split("/").map(Number);
  const beats = Math.max(1, meterTop || 4);
  const arpDuration = meterBottom >= 16 ? "s" : meterBottom >= 8 ? "e" : "q";
  const labelAt = Math.floor((beats - 1) / 2);
  // 记下这次的四部和声（拼写好的音名），"送到五线谱"用
  classicalLastSatb = {
    chords: solved.voices.map((voice, col) => voice.map((midi) => spell(midi, entries[col].entry.notes || []))),
    key: keyFifths(entries[0].segment.key, String(entries[0].segment.mode).includes('minor')),
  };
  const notes = [];
  solved.voices.forEach((voice, col) => {
    const { entry } = entries[col];
    const names = entry.notes || [];
    // 和弦音从根音开始排（Dm7 → D F A C）
    const rootName = /^[A-G][#b♯♭]?/.exec(entry.chord || "")?.[0];
    const start = names.indexOf(rootName);
    const tones = start > 0 ? [...names.slice(start), ...names.slice(0, start)] : names;
    const label = [displaySymbol(entry.symbol), entry.roman, entry.chord, tones.map(pretty).join(" "), localizeClassicalText(entry.category || "")].filter(Boolean);
    // voice = [男低, 男高, 女中, 女高]
    if (arpeggio) {
      // 琶音模式：和播放一样，每拍一个音，从男低往上轮流（拍数取自拍号）
      for (let k = 0; k < beats; k += 1) {
        const part = k % voice.length;
        notes.push({ p: spell(voice[part], names), s: part < 2 ? 1 : 0, col: col * beats + k, group: col, d: arpDuration, ...(k === labelAt ? { label, labelAt: "bottom" } : {}) });
      }
    } else {
      voice.forEach((midi, part) => notes.push({ p: spell(midi, names), s: part < 2 ? 1 : 0, col, part, d: "w", ...(part === 0 ? { label, labelAt: "bottom" } : {}) }));
    }
  });
  const columns = arpeggio ? Math.max(8, entries.length) * beats : Math.max(8, entries.length);
  const pic = renderStaffVisual({ kind: "notation", brace: true, staves: [{ clef: "treble" }, { clef: "bass" }], notes, cols: columns, colWidth: arpeggio ? Math.max(24, Math.round(88 / beats)) : 82, stackGap: 56 }, {});
  if (!pic) return { drawn: false, satb: classicalLastSatb };
  // 只要谱表本身：不套外层的图示框（它会自己滚动、还会把超出的左半边裁掉）
  const svg = pic.querySelector("svg");
  svg.classList.add("classical-staff-svg");
  const [vx, vy, vw, vh] = (svg.getAttribute("viewBox") || "0 0 600 200").split(" ").map(Number);
  // 宽度：8 个和弦以内铺满卡片；更多时按同样的比例画，让外层出现滚动条，不把谱表压小
  if (entries.length > 8) { svg.style.width = `${Math.round(vw * 1.3)}px`; svg.style.maxWidth = "none"; svg.style.minWidth = `${Math.round(vw * 1.3)}px`; }
  else { svg.style.width = "100%"; svg.style.maxWidth = `${Math.round(vw * 1.3)}px`; svg.style.minWidth = "0"; }
  const SVG_NS = "http://www.w3.org/2000/svg";
  const make = (tag, attrs, text) => { const el = document.createElementNS(SVG_NS, tag); Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v))); if (text !== undefined) el.textContent = text; return el; };
  const colXs = (col) => [...svg.querySelectorAll(`.sd-note[data-col="${col}"] ellipse`)].map((e) => Number(e.getAttribute("cx")));
  const colX = (col) => Math.min(...colXs(col));
  const staffTop = Number(svg.querySelector(".sd-line")?.getAttribute("y1") || 26);
  const bassBottom = Math.max(...[...svg.querySelectorAll(".sd-line")].map((l) => Number(l.getAttribute("y1"))));
  // 谱表上方留一行写 |Key=…|（放在谱号上面，不和谱号重叠）
  const keyY = Math.min(vy, staffTop - 30) - 6;
  svg.setAttribute("viewBox", `${vx} ${keyY - 14} ${vw} ${vh + (vy - (keyY - 14))}`);
  entries.forEach((item, col) => {
    const x = colX(col);
    // 每段开头：|Key=…|
    if (item.firstOfSegment) {
      svg.appendChild(make("text", { x: x - 30, y: keyY, class: "cl-staff-key" }, `|Key=${item.segment.key} ${classicalModeLabel(item.segment.mode)}|`));
    }
    // 点这一列试听
    const xs = colXs(col);
    const span = Math.max(...xs) - Math.min(...xs);
    const hit = make("rect", { x: x - 34, y: staffTop - 6, width: span + 68, height: bassBottom - staffTop + 12, rx: 10, fill: "transparent", class: "cl-staff-col", "data-col": col, tabindex: 0, role: "button" });
    hit.appendChild(make("title", {}, `${clt("cl_play_this_chord")} · ${item.entry.chord}`));
    const play = () => onPlay?.(col, item.segmentIndex, item.chainIndex);
    hit.addEventListener("click", play);
    hit.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } });
    svg.insertBefore(hit, svg.firstChild);
  });
  // 点标注：和弦链退回到这个和弦
  svg.querySelectorAll(".lv-note-label[data-col]").forEach((label) => {
    const item = entries[Number(label.getAttribute("data-col"))];
    if (!item) return;
    label.classList.add("cl-staff-pick");
    label.addEventListener("click", () => onPick?.(item.segmentIndex, item.chainIndex, item.entry.symbol));
  });
  const scroller = document.createElement("div");
  scroller.className = "classical-staff-scroll";
  scroller.appendChild(svg);
  card.appendChild(scroller);
  // 四部和声检查：在谱上标出问题（柱式和弦时）；下面列出结果
  const tonicPc = ((LETTER[entries[0].segment.key?.[0]] ?? 0) + (/#/.test(entries[0].segment.key) ? 1 : /b/.test(entries[0].segment.key?.slice(1) || "") ? -1 : 0) + 12) % 12;
  const satb = checkSATB(solved.voices, { tonic: tonicPc, minor: String(entries[0].segment.mode).includes("minor") });
  if (!arpeggio) {
    drawIssueMarks(svg, satb.issues, (index, part) => {
      const head = svg.querySelector(`.sd-note[data-col="${index}"][data-part="${part}"] ellipse`);
      return head ? { x: Number(head.getAttribute("cx")), y: Number(head.getAttribute("cy")) } : null;
    });
  }
  card.appendChild(issueList(satb.issues, lang, (id) => {
    const a = document.createElement("a"); a.className = "mk-cite"; a.textContent = "↗"; a.target = "_blank"; a.rel = "noopener noreferrer";
    a.href = ({ "omt2e-roman-numerals": "https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.19%3A_Roman_Numerals_and_SATB_Chord_Construction", "omt-species1": "https://openmusictheory.github.io/firstSpecies.html", "omt2e-v7": "https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.02%3A_Strengthening_Endings_with_V7", "omt2e-pd7": "https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.13%3A_Predominant_Seventh_Chords" })[id] || "#about";
    return a;
  }));
  const hint = document.createElement("p");
  hint.className = "small-muted";
  hint.textContent = clt("cl_staff_hint");
  card.appendChild(hint);
  place();
  // 链很长时，自动滚到最新的那个和弦（等布局完成再滚）
  if (entries.length > 8) {
    const toEnd = () => { scroller.scrollLeft = scroller.scrollWidth; };
    toEnd();
    requestAnimationFrame(() => { toEnd(); requestAnimationFrame(toEnd); });
  }
  return { drawn: true, satb: classicalLastSatb };
}

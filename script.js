import { EnhancedChordConverter, JazzBrain } from "./jazz_compass.js";
import * as lang from "./lang.js";

document.addEventListener("DOMContentLoaded", () => {
  const navButtons = Array.from(document.querySelectorAll(".feature-btn"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  const conv = new EnhancedChordConverter();
  const brain = new JazzBrain();
  // state for "other" panel mode
  let currentOtherMode = "report";

  // 本地化负和声轴标签
  const axisLabelEl = document.getElementById("label_other_axis");
  if (axisLabelEl && window.__) {
    axisLabelEl.textContent = window.__("neg_axis");
  }

  function showOnlyFeature(feature) {
    navButtons.forEach((b) =>
      b.classList.toggle("active", b.dataset.feature === feature),
    );
    panels.forEach((p) => {
      const f = p.dataset.feature;
      if (f === feature) {
        p.style.display = "block";
        p.setAttribute("aria-hidden", "false");
      } else {
        p.style.display = "none";
        p.setAttribute("aria-hidden", "true");
      }
    });
    // special handling for about panel
    if (feature === "about") {
      showAbout();
    }
  }

  function showAbout() {
    const aboutBody = document.getElementById("panel-about-body");
    if (!aboutBody) return;
    
    const html = `
      <h3>${window.__("about_title")}</h3>
      <p>${window.__("about_desc")}</p>
      
      <h4 style="margin-top:20px">${window.__("about_features")}</h4>
      <ul style="margin-left:20px">
        <li>${window.__("about_feature_chord")}</li>
        <li>${window.__("about_feature_blues")}</li>
        <li>${window.__("about_feature_lcc")}</li>
        <li>${window.__("about_feature_cst")}</li>
      </ul>
      
      <h4 style="margin-top:20px">${window.__("about_github")}</h4>
      <div style="margin: 12px 0;">
        <p>
          <a href="https://github.com/3035936740/Jazz-Compass-Web" target="_blank" style="color:#0066cc">
            ${window.__("about_github_web")}
          </a>
        </p>
        <p>
          <a href="https://github.com/3035936740/JazzCompassPy" target="_blank" style="color:#0066cc">
            ${window.__("about_github_py")}
          </a>
        </p>
      </div>
      
      <hr style="margin-top:30px">
      <p style="font-size:0.9em; color:#999">${window.__("about_footer")}</p>
    `;
    
    aboutBody.innerHTML = html;
  }

  function prettyChordRender(targetEl, inputValue) {
    const v = inputValue.trim();
    const data = conv._ensureNotesAndRoot(v, true);
    const notes = data.notes
    const chord = data.chord

    if (notes && Array.isArray(notes) && notes.length > 0) {
      const offsets = notes.map((n) => conv.noteToIdx[n]);
      // 美化输出：根 / 链接 和 列表 + 偏移 + 小键盘视图
      const root = notes[0];
      const isSlash = v.includes("/");
      const htmlParts = [];
      // 更紧凑的标题间距
      htmlParts.push(
        `<h2 style="margin: -4px 0 2px; font-size: 1.25rem;">${window.__f("chord_label")}: ${chord}</h2>`,
      );
      htmlParts.push(
        `<h3 style="margin: 0 0 8px; font-size: 1rem; font-weight: 500; color: var(--muted);">${window.__f(
          "chord_parse_heading",
          { input: v },
        )}</h3>`,
      );
	  /*
      htmlParts.push(
        `<p><strong>${window.__("root_label")}：</strong>${root} <strong style="margin-left:12px">${window.__("slash_label")}：</strong>${isSlash}</p>`,
      );
	  */
      htmlParts.push('<div class="note-grid">');
      for (let i = 0; i < notes.length; i++) {
        htmlParts.push(
          `<div class="note-cell"><div class="note">${notes[i]}</div></div>`,
        );
      }
      htmlParts.push("</div>");

      // 小键盘视觉（12键，仅标注选中）
      const keys = conv.idxToNote
        .map((n, idx) => {
          const active = offsets.includes(idx) ? "active-key" : "";
          return `<div class="key ${active}">${n}</div>`;
        })
        .join("");
      htmlParts.push(`<div class="mini-keyboard">${keys}</div>`);

      targetEl.innerHTML = htmlParts.join("");
      return;
    }

    // 退回到 parse（只显示 chord 与 notes，忽略 offsets）
    try {
      const data = conv.parseAndGetNotes(v);
      const display = {
        chord: data.chord,
        notes: data.notes,
        isSlash: data.isSlash,
      };
      targetEl.innerHTML = `<h3>${window.__f("chord_parse_heading", { input: v })}</h3><pre>${JSON.stringify(display, null, 2)}</pre>`;
    } catch (e) {
      targetEl.innerHTML = `<h3>${window.__("chord_parse_error")}</h3><pre>${e.message}</pre>`;
    }
  }

  // helper: create a card element for a scale suggestion (name,reason,notes)
  function createScaleCard(scale) {
    const card = document.createElement("div");
    card.className = "result-card";
    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = scale.name;
    card.appendChild(title);
    if (scale.reasonId != null) {
      const reason = document.createElement("div");
      reason.className = "small-muted";
      reason.textContent = window.__("reason_" + scale.reasonId);
      card.appendChild(reason);
    }
    if (scale.notes && scale.notes.length) {
      // grid view
      const noteRow = document.createElement("div");
      noteRow.className = "note-grid";
      scale.notes.forEach((n) => {
        const nc = document.createElement("div");
        nc.className = "note-cell";
        nc.innerHTML = `<div class="note">${n}</div>`;
        noteRow.appendChild(nc);
      });
      card.appendChild(noteRow);
    }
    return card;
  }

  // helper: render a full report object into nicely formatted HTML
  function renderReport(report) {
    if (!report) return document.createTextNode("");
    const cont = document.createElement("div");
    cont.className = "full-report";
    // chord name
    const h = document.createElement("h3");
    h.textContent = report.chordName || "";
    cont.appendChild(h);
    // notes grid
    if (report.notes && report.notes.length) {
      const notesDiv = document.createElement("div");
      notesDiv.className = "note-grid";
      report.notes.forEach((n) => {
        const nc = document.createElement("div");
        nc.className = "note-cell";
        nc.innerHTML = `<div class="note">${n}</div>`;
        notesDiv.appendChild(nc);
      });
      cont.appendChild(notesDiv);
    }
    // voicings
    if (report.voicings) {
      const vsec = document.createElement("div");
      vsec.className = "report-section";
      const vt = document.createElement("div");
      vt.className = "section-title";
      vt.textContent = window.__("voicings_label") || "Voicings";
      vsec.appendChild(vt);
      ["shell", "drop2"].forEach((k) => {
        if (report.voicings[k]) {
          const row = document.createElement("div");
          row.className = "note-grid";
          report.voicings[k].forEach((n) => {
            const nc = document.createElement("div");
            nc.className = "note-cell";
            nc.innerHTML = `<div class="note">${n}</div>`;
            row.appendChild(nc);
          });
          const label = document.createElement("div");
          label.className = "small-muted";
          label.textContent = window.__("voicings_" + k) || k;
          vsec.appendChild(label);
          vsec.appendChild(row);
        }
      });

      cont.appendChild(vsec);
    }
    // substitutions
    if (report.substitutions && report.substitutions.length) {
      const ssec = document.createElement("div");
      ssec.className = "report-section";
      const st = document.createElement("h3");
      st.className = "section-title";
      st.textContent = window.__("substitutions_label") || "Substitutions";
      ssec.appendChild(st);
      report.substitutions.forEach((sub) => {
        const card = createScaleCard({
          name: sub.name,
          reason: window.__("sub_type_name_" + sub.descriptionId) || sub.type,
          notes: [],
        });
        const desc = document.createElement("div");
        desc.className = "small-muted";
        desc.textContent = window.__("sub_type_desc_" + sub.descriptionId) || sub.description;
        card.appendChild(desc);
        ssec.appendChild(card);
      });
      cont.appendChild(ssec);
    }
    return cont;
  }

  function updateBlues(targetEl, inputValue) {
    const v = inputValue.trim();
    // render interactive UI: three action buttons + result area
    const container = document.createElement("div");
    container.className = "blues-panel";

    const btnRow = document.createElement("div");
    btnRow.style.display = "flex";
    btnRow.style.gap = "8px";

    const btnBasic = document.createElement("button");
    btnBasic.textContent = window.__("blues_basic");
    const btnAdv = document.createElement("button");
    btnAdv.textContent = window.__("blues_advanced");
    const btnFeel = document.createElement("button");
    btnFeel.textContent = window.__("blues_feel");

    [btnBasic, btnAdv, btnFeel].forEach((b) => {
      b.className = "panel-action";
      b.setAttribute("aria-pressed", "false");
      b.style.padding = "8px 12px";
      b.style.borderRadius = "8px";
      b.style.border = "none";
      b.style.cursor = "pointer";
      b.style.background =
        "linear-gradient(90deg,var(--accent),var(--accent-2))";
      b.style.color = "#fff";
    });

    // helper to show which action is active
    function setActiveAction(button) {
      [btnBasic, btnAdv, btnFeel].forEach((b) => {
        const active = b === button;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }

    btnRow.appendChild(btnBasic);
    btnRow.appendChild(btnAdv);
    btnRow.appendChild(btnFeel);

    const results = document.createElement("div");
    results.className = "blues-results";
    results.style.marginTop = "12px";

    container.appendChild(btnRow);
    container.appendChild(results);
    targetEl.innerHTML = "";
    targetEl.appendChild(container);

    // helper: parse chord notes
    function getNotesSafe(val) {
      try {
        return conv._ensureNotesAndRoot(val) || [];
      } catch (e) {
        return [];
      }
    }

    // Basic suggestions
    btnBasic.addEventListener("click", () => {
      setActiveAction(btnBasic);
      const notes = getNotesSafe(v);
      if (!notes || notes.length === 0) {
        results.innerHTML = `<div class="result-card">${window.__("cannot_parse_input")}</div>`;
        return;
      }
      // try library method first
      let suggestions = [];
      try {
        suggestions = brain.blt.suggestForChord(v);
      } catch (e) {
		console.error("Error getting basic suggestions:", e);
      }

      // normalize suggestions to array
      if (!Array.isArray(suggestions)) {
        if (suggestions == null) suggestions = [];
        else suggestions = [suggestions];
      }

      // render
      results.innerHTML = "";
      const header = document.createElement("div");
      header.className = "small-muted";
      header.textContent = window.__f("header_basic", {
        count: suggestions.length,
      });
      results.appendChild(header);
      suggestions.forEach((s) => {
        const card = document.createElement("div");
        card.className = "result-card";
        // spiciness-based soft gradient background for Improv Feel
        try {
          const sp = Number(feel.spiciness_level || 0);
          let hue = 200,
            sat = 20,
            top = 30,
            bot = 26;
          if (sp <= 1) {
            hue = 200;
            sat = 18;
            top = 30;
            bot = 26;
          } else if (sp <= 3) {
            hue = 38;
            sat = 20;
            top = 32;
            bot = 26;
          } else if (sp <= 5) {
            hue = 18;
            sat = 24;
            top = 34;
            bot = 28;
          } else {
            hue = 300;
            sat = 20;
            top = 34;
            bot = 26;
          }
          card.style.background = `linear-gradient(135deg, hsl(${hue}, ${sat}%, ${top}%), hsl(${hue}, ${Math.max(sat - 4, 8)}%, ${bot}%))`;
        } catch (e) {}

        const title = document.createElement("div");
        title.className = "card-title";
        title.textContent = s.name;
        const reason = document.createElement("div");
        reason.className = "small-muted";
        reason.textContent = window.__("reason_" + s.reasonId) || "";
        const noteRow = document.createElement("div");
        noteRow.className = "note-grid";
        (s.notes || []).forEach((n) => {
          const nc = document.createElement("div");
          nc.className = "note-cell";
          nc.innerHTML = `<div class="note">${n}</div>`;
          noteRow.appendChild(nc);
        });
        card.appendChild(title);
        card.appendChild(reason);
        card.appendChild(noteRow);
        results.appendChild(card);
      });
    });

    // Advanced suggestions
    btnAdv.addEventListener("click", () => {
      setActiveAction(btnAdv);
      const notes = getNotesSafe(v);
      if (!notes || notes.length === 0) {
        results.innerHTML = `<div class="result-card">${window.__("cannot_parse_input")}</div>`;
        return;
      }
      let adv = [];
      try {
        adv = brain.blt.suggestAdvanced(v);
      } catch (e) {
		console.error("Error getting advanced suggestions:", e);
      }

      if (!Array.isArray(adv)) {
        if (adv == null) adv = [];
        else adv = [adv];
      }

      results.innerHTML = "";
      const headerAdv = document.createElement("div");
      headerAdv.className = "small-muted";
      headerAdv.textContent = window.__f("header_advanced", {
        count: adv.length,
      });
      results.appendChild(headerAdv);
      adv.forEach((s) => {
        const card = createScaleCard(s);
        results.appendChild(card);
      });
    });

    // Improv Feel
    btnFeel.addEventListener("click", () => {
      setActiveAction(btnFeel);
      const chordNotes = getNotesSafe(v);
      if (!chordNotes || chordNotes.length === 0) {
        results.innerHTML = `<div class="result-card">${window.__("cannot_parse_input")}</div>`;
        return;
      }
      // candidate scales to analyze: Major Pentatonic, Minor Blues, Lydian Dominant
      const root = chordNotes[0];
      const candidates = Object.keys(brain.blt.scaleMetadata);
      results.innerHTML = "";
      const headerFeel = document.createElement("div");
      headerFeel.className = "small-muted";
      headerFeel.textContent = window.__f("header_improv", {
        count: candidates.length,
      });
      results.appendChild(headerFeel);
      candidates.forEach((name) => {
        const sNotes = brain.blt._calculateScaleNotes(root, name);
        const feel = brain.blt.analyzeImprovFeel(sNotes, chordNotes);
        const card = document.createElement("div");
        card.className = "result-card";
        const title = document.createElement("div");
        title.className = "card-title";
        title.textContent = `${root} ${name}`;
        const noteRow = document.createElement("div");
        noteRow.className = "note-grid";
        const tensionSet = new Set(feel.tension_notes || []);
        (sNotes || []).forEach((n) => {
          const nc = document.createElement("div");
          const isTension = tensionSet.has(n);
          nc.className = "note-cell" + (isTension ? " tension-note" : "");
          nc.innerHTML = `<div class="note">${n}</div>`;
          noteRow.appendChild(nc);
        });
        const body = document.createElement("div");
        body.className = "card-body";
        const descId =
          feel.description_id || feel.descriptionId || feel.descriptionId === 0
            ? feel.description_id || feel.descriptionId
            : null;
        const feelNameKey = descId ? `improv_feel_name_${descId}` : null;
        const feelDescKey = descId ? `improv_feel_desc_${descId}` : null;
        const feelName = feelNameKey
          ? window.__(feelNameKey)
          : feel.feeling || "";
        const feelDesc = feelDescKey
          ? window.__(feelDescKey)
          : feel.description || "";
        body.innerHTML = `<div><strong>${window.__("feel_label")} :</strong> ${feelName} (${window.__("spiciness_label")}: ${feel.spiciness_level})</div>
								  <div class="small-muted">${window.__("tensions_label")} : ${feelDesc}</div>
								  <div class="small-muted">${window.__("tension_source_label")}: ${JSON.stringify(feel.tension_notes)}</div>`;
        // add small spiciness badge to title
        const spiceBadge = document.createElement("span");
        spiceBadge.className = "spice-badge";
        spiceBadge.textContent = `${window.__("spiciness_label")}: ${feel.spiciness_level}`;
        try {
          const spVal = Number(feel.spiciness_level || 0);
          let hue = 200,
            sat = 18,
            light = 28;
          if (spVal <= 1) {
            hue = 200;
            sat = 16;
            light = 28;
          } else if (spVal <= 3) {
            hue = 38;
            sat = 20;
            light = 30;
          } else if (spVal <= 5) {
            hue = 18;
            sat = 22;
            light = 32;
          } else {
            hue = 300;
            sat = 20;
            light = 32;
          }
          spiceBadge.style.background = `hsl(${hue}, ${sat}%, ${light}%)`;
          spiceBadge.style.color = "#fff";
          spiceBadge.style.border = "1px solid rgba(255,255,255,0.06)";
        } catch (e) {}
        title.appendChild(spiceBadge);
        card.appendChild(title);
        card.appendChild(noteRow);
        card.appendChild(body);
        results.appendChild(card);
      });
    });
  }

  function updateCST(targetEl, inputValue) {
    const v = inputValue.trim();
    const notes = conv._ensureNotesAndRoot(v);
    if (!notes) {
      targetEl.innerHTML = `<p>${window.__("cannot_parse_chord")}</p>`;
      return;
    }
    const root = notes[0];
    const scaleMatches = brain.cst.analyzeCST(notes);
    targetEl.innerHTML = "";
    const headerCST = document.createElement("div");
    headerCST.className = "small-muted";
    headerCST.textContent = window.__f("header_cst", {
      count: scaleMatches.length,
    });
    targetEl.appendChild(headerCST);

    scaleMatches.forEach((scaleStr) => {
      // Parse "C Mixolydian" -> scaleName
      const parts = scaleStr.split(" ");
      const scaleRoot = parts[0];
      const scaleName = parts.slice(1).join(" ");

      try {
        const scaleNotes = brain.cst.scaleNotes(scaleStr);
        const brightness = brain.cst.calculateBrightness(scaleRoot, scaleNotes);
        const tensions = brain.cst.analyzeTensions(notes, scaleStr);

        // Create card with brightness-based background gradient
        const card = document.createElement("div");
        card.className = "result-card cst-card";

        // apply brightness-based background (low saturation, higher brightness for comfort)

        let hue = 0,
          sat = 0;
        if (Math.abs(brightness) > 0.1) {
          hue = brightness < 0 ? 210 : brightness > 0 ? 165 : 0; // 165是薄荷绿
          sat = Math.abs(brightness) > 2 ? 30 : 24; // 过于刺耳的亮度降低饱和度
        }
        const bright = 0 + Math.abs(brightness) * 1.5;
        card.style.background = `linear-gradient(135deg, hsl(${hue}, ${sat}%, ${Math.min(bright, 40)}%), hsl(${hue}, ${sat}%, ${Math.max(bright - 4, 24)}%))`;

        const title = document.createElement("div");
        title.className = "card-title";
        title.innerHTML = `<span>${scaleRoot} ${scaleName}</span> <span class="brightness-label">${window.__("brightness_label")}: ${brightness}</span>`;

        const noteRow = document.createElement("div");
        noteRow.className = "note-grid";
        const tensionSet = new Set(tensions.tensions || []);
        const avoidSet = new Set(tensions.avoid || []);

        [...scaleNotes].forEach((n) => {
          const nc = document.createElement("div");
          const classes = ["note-cell"];
          if (tensionSet.has(n)) classes.push("tension-note");
          else if (avoidSet.has(n)) classes.push("avoid-note");
          nc.className = classes.join(" ");
          nc.innerHTML = `<div class="note">${n}</div>`;
          noteRow.appendChild(nc);
        });

        const infoDiv = document.createElement("div");
        infoDiv.className = "cst-info";
        infoDiv.innerHTML = `<div class="small-muted">${window.__("tensions_label")}: ${JSON.stringify(tensions.tensions || [])}</div>
                                      <div class="small-muted">${window.__("avoid_label")}: ${JSON.stringify(tensions.avoid || [])}</div>`;

        card.appendChild(title);
        card.appendChild(noteRow);
        card.appendChild(infoDiv);
        targetEl.appendChild(card);
      } catch (e) {
        // skip on error
      }
    });
  }

  function updateLCC(targetEl, inputValue) {
    const v = inputValue.trim();
    const notes = conv._ensureNotesAndRoot(v);
    if (!notes) {
      targetEl.innerHTML = `<p>${window.__("cannot_parse_chord")}</p>`;
      return;
    }
    const res = brain.lcc.analyzeLCC(notes);
    targetEl.innerHTML = "";
    const headerLCC = document.createElement("div");
    headerLCC.className = "small-muted";
    headerLCC.textContent = window.__f("header_lcc", { count: res.length });
    targetEl.appendChild(headerLCC);

    res.forEach((item) => {
      const { parent, scale, degree_from_parent, gravity } = item;

      try {
        const scaleNotes = brain.lcc.scaleNotes(parent, scale);

        // Create card with gravity-based background (越小越稳定蓝绿，越大越有张力橙红)
        const card = document.createElement("div");
        card.className = "result-card lcc-card";

        // gravity from 0-12, map to hue: 0=green/cyan(~180), 6=yellow(~60), 12=red(~0), low saturation
        const gravityHue = Math.max(0, 180 - gravity * 15);
        const gravitySat = 25 + gravity * 2;
        card.style.background = `linear-gradient(135deg, hsl(${gravityHue}, ${gravitySat}%, 12%), hsl(${gravityHue}, ${gravitySat}%, 5%))`;

        const title = document.createElement("div");
        title.className = "card-title";
        title.innerHTML = `<span>${window.__("lcc_parent_prefix")} ${parent} ${scale}</span><br><span class="lcc-meta">${window.__("lcc_position_prefix")} ${degree_from_parent} ${window.__("semitones_label")} | ${window.__("lcc_gravity_prefix")} ${gravity}</span>`;

        const noteRow = document.createElement("div");
        noteRow.className = "note-grid";
        scaleNotes.forEach((n) => {
          const nc = document.createElement("div");
          nc.className = "note-cell";
          nc.innerHTML = `<div class="note">${n}</div>`;
          noteRow.appendChild(nc);
        });

        card.appendChild(title);
        card.appendChild(noteRow);
        targetEl.appendChild(card);
      } catch (e) {
        // skip on error
      }
    });
  }

  function updateRec(targetEl, inputValue) {
    const v = inputValue.trim();
    if (!v) {
      targetEl.innerHTML = `<div class="result-card">${window.__("cannot_parse_input") || "无法解析输入，请输入有效和弦（如 C7、Am9）"}</div>`;
      return;
    }

    // 调用 JazzBrain 的和弦推荐方法
    let recommendations = [];
    try {
      recommendations = brain.getChordRecommendations(v);
    } catch (e) {
      console.error("获取和弦衔接推荐失败：", e);
      targetEl.innerHTML = `<div class="result-card">${window.__("parse_error") || "解析失败："}${e.message}</div>`;
      return;
    }

    // 清空目标容器并渲染结果
    targetEl.innerHTML = "";
    
    // 结果头部统计
    const headerRec = document.createElement("div");
    headerRec.className = "small-muted";
    headerRec.textContent = window.__f("header_rec", {
      count: recommendations.length,
      input: v
    }) || window.__f("rec_count", {
        input1: v,
        input2: recommendations.length
      });
    targetEl.appendChild(headerRec);

    // 遍历推荐结果渲染卡片
    recommendations.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "result-card rec-card";
      
      // 按评分线性渐变（从高分蓝绿 → 低分浅红，连续过渡）
      // 按评分线性渐变（高分：深青绿 → 低分：暗赤红，高级暗调风格）
      const scoreNorm = item.score / 15; // 归一化到 0-1

      // 1. 色相（Hue）线性过渡：175(深青绿) → 25(暗赤红)（更贴合参考界面的色调）
      const hueMin = 25;     // 低分：暗赤红（替代原浅红，更暗更高级）
      const hueMax = 175;    // 高分：深青绿（匹配参考界面的主色调）
      const hue = hueMin + (hueMax - hueMin) * scoreNorm;

      // 2. 饱和度（Saturation）：整体低饱和（高级感核心），高分略低、低分略高
      const satStartMin = 28;  // 低分起始饱和度（低饱和）
      const satStartMax = 22;  // 高分起始饱和度（更低饱和）
      const satStart = satStartMin + (satStartMax - satStartMin) * scoreNorm;

      const satEndMin = 18;    // 低分结束饱和度
      const satEndMax = 12;    // 高分结束饱和度
      const satEnd = satEndMin + (satEndMax - satEndMin) * scoreNorm;

      // 3. 亮度（Lightness）：极致暗调，整体下调到 15-22 区间（核心暗调调整）
      const lightStartMin = 10;  // 低分起始亮度（暗）
      const lightStartMax = 6;  // 高分起始亮度（更暗，匹配参考界面）
      const lightStart = lightStartMin + (lightStartMax - lightStartMin) * scoreNorm;

      const lightMidMin = 18;    // 低分中间亮度
      const lightMidMax = 16;    // 高分中间亮度
      const lightMid = lightMidMin + (lightMidMax - lightMidMin) * scoreNorm;

      const lightEndMin = 15;    // 低分结束亮度（极暗）
      const lightEndMax = 13;    // 高分结束亮度（极致暗）
      const lightEnd = lightEndMin + (lightEndMax - lightEndMin) * scoreNorm;
      // 多色阶线性渐变（从左上到右下，3个色阶过渡，渐变更自然）
      card.style.background = `linear-gradient(135deg, 
        hsl(${hue}, ${satStart}%, ${lightStart}%), 
        hsl(${hue + 5}, ${(satStart + satEnd)/2}%, ${lightMid}%) 50%, 
        hsl(${hue + 8}, ${satEnd}%, ${lightEnd}%)
      )`;

      // 卡片标题（和弦名 + 综合评分）
      const title = document.createElement("div");
      title.className = "card-title";
      title.innerHTML = `${item.chord} 
        <span class="score-badge">${window.__("sort_score") || "Score"}: ${item.score}</span>`;
      card.appendChild(title);

      // 核心指标行
      const metricsRow = document.createElement("div");
      metricsRow.style.display = "flex";
      metricsRow.style.gap = "12px";
      metricsRow.style.margin = "8px 0";
      metricsRow.style.fontSize = "0.9em";
      
      // 稳定性
      const stabilitySpan = document.createElement("span");
      stabilitySpan.textContent = `${window.__("sort_stability") || "Stability"}: ${item.stability.toFixed(1)}`;
      // 紧张度
      const tensionSpan = document.createElement("span");
      tensionSpan.textContent = `${window.__("sort_tension") || "Tension"}: ${item.tension.toFixed(1)}`;
      // 明亮度
      const brightnessSpan = document.createElement("span");
      brightnessSpan.textContent = `${window.__("brightness_label") || "Brightness"}: ${item.brightness.toFixed(1)}`;
      
      metricsRow.appendChild(stabilitySpan);
      metricsRow.appendChild(tensionSpan);
      metricsRow.appendChild(brightnessSpan);
      card.appendChild(metricsRow);

      // 来源标注（Formula/Creative）
      const sourceSpan = document.createElement("div");
      sourceSpan.className = "small-muted";
      sourceSpan.textContent = `${window.__("source_label") || "来源"}: ${item.source}`;
      card.appendChild(sourceSpan);

      // 和弦音符网格（复用现有 note-grid 样式）
      const noteRow = document.createElement("div");
      noteRow.className = "note-grid";
      item.notes.forEach((n) => {
        const nc = document.createElement("div");
        nc.className = "note-cell";
        nc.innerHTML = `<div class="note">${n}</div>`;
        noteRow.appendChild(nc);
      });
      card.appendChild(noteRow);

      targetEl.appendChild(card);
    });
  }

  // generic processor for the other-panel actions
  function processOther(targetEl, inputValue) {
    const v = inputValue.trim();
    targetEl.innerHTML = "";
    try {
      switch (currentOtherMode) {
        case "key_center": {
          // 1. 获取输入并分析
          const arr = parseChordList(v);
          const results = brain.findKeyCenterPro(arr, true);

          if (Array.isArray(results) && results.length) {
            const top = results[0]; // 获取匹配度最高的调性
            const parts = top.name.split(" ");
            const root = parts[0];
            const sysName = parts.slice(1).join(" ").trim();

            let notes = [];
            try {
              notes = brain.cst.scaleNotes(root, sysName);
            } catch (e) {
              notes = [];
            }

            // 2. 创建卡片容器
            const card = document.createElement("div");
            card.className = "result-card";

            try {
              const sp = Number(feel.spiciness_level || 0);
              let hue = 200,
                sat = 20,
                top = 30,
                bot = 26;
              if (sp <= 1) {
                hue = 200;
                sat = 18;
                top = 30;
                bot = 26;
              } else if (sp <= 3) {
                hue = 38;
                sat = 20;
                top = 32;
                bot = 26;
              } else if (sp <= 5) {
                hue = 18;
                sat = 24;
                top = 34;
                bot = 28;
              } else {
                hue = 300;
                sat = 20;
                top = 34;
                bot = 26;
              }
              card.style.background = `linear-gradient(135deg, hsl(${hue}, ${sat}%, ${top}%), hsl(${hue}, ${Math.max(sat - 4, 8)}%, ${bot}%))`;
            } catch (e) {}

            // 4. 构建标题和评分
            const title = document.createElement("div");
            title.className = "card-title";
            title.innerHTML = `<span>${top.name}</span> <span class="spice-badge" style="margin-left:8px; font-size:0.8em; opacity:0.8;">${window.__("key_center_match_score") || "Score"}: ${Math.round(top.score)}</span>`;

            const noteRow = document.createElement("div");
            noteRow.className = "note-grid";
            (notes || []).forEach((n) => {
              const nc = document.createElement("div");
              nc.className = "note-cell";
              nc.innerHTML = `<div class="note">${n}</div>`;
              noteRow.appendChild(nc);
            });

            // 6. 组合元素
            card.appendChild(title);

            // 如果有原因/描述，也可以加上
            const reason = document.createElement("div");
            reason.className = "small-muted";
            reason.style.marginBottom = "8px";
            reason.textContent = `${window.__("key_center_detected") || "Detected Key Center"}`;
            card.appendChild(reason);

            card.appendChild(noteRow);

            targetEl.innerHTML = "";
            targetEl.appendChild(card);
          } else {
            targetEl.innerHTML = `<div class="small-muted">${window.__("no_key_recommended") || "no key recommended"}</div>`;
          }
          break;
        }
        case "report": {
          const card = document.createElement("div");
          card.className = "result-card";

          try {
            const sp = Number(feel.spiciness_level || 0);
            let hue = 200,
              sat = 20,
              top = 30,
              bot = 26;
            if (sp <= 1) {
              hue = 200;
              sat = 18;
              top = 30;
              bot = 26;
            } else if (sp <= 3) {
              hue = 38;
              sat = 20;
              top = 32;
              bot = 26;
            } else if (sp <= 5) {
              hue = 18;
              sat = 24;
              top = 34;
              bot = 28;
            } else {
              hue = 300;
              sat = 20;
              top = 34;
              bot = 26;
            }
            card.style.background = `linear-gradient(135deg, hsl(${hue}, ${sat}%, ${top}%), hsl(${hue}, ${Math.max(sat - 4, 8)}%, ${bot}%))`;
          } catch (e) {}


          // 1. 获取完整的分析报告数据
          const report = brain.getFullReport(v);

          // 3. 添加标题
          const header = document.createElement("h3");
          header.textContent =
            window.__("other_report") || "Chord Analysis Report";
		  card.appendChild(header);

          // 4. 调用你定义的 renderReport 函数进行美化渲染
          if (report) {
            const reportElement = renderReport(report);
            card.appendChild(reportElement);
          } else {
            const noData = document.createElement("div");
            noData.className = "small-muted";
            noData.textContent = window.__("no_data_available") || "No analysis data found.";
            card.appendChild(noData);
          }
          targetEl.appendChild(card);
          break;
        }
		case 'progression': {
			const prog = parseChordList(v);
			const analysis = brain.analyzeProgression(prog); // 假设返回的是字符串数组
			
			targetEl.innerHTML = ''; // 清空容器
			const container = document.createElement('div');
			container.className = 'progression-stepper';
			container.style.display = 'flex';
			container.style.flexDirection = 'column';
			container.style.gap = '12px';

			if (Array.isArray(analysis) && analysis.length > 0) {
				analysis.forEach((step, index) => {
					const row = document.createElement('div');
					row.className = 'result-card';
					row.style.margin = '0';
					row.style.borderLeft = '4px solid var(--accent)'; // 左侧色条增加专业感
					
					// 提取 "Cmaj7 -> Fmaj7" 这种核心部分加粗
					const parts = step.split(':');
					const flow = parts[0] || '';
					const desc = parts[1] || '';

					row.innerHTML = `
						<div style="display:flex; align-items:center; gap:10px;">
							<div class="step-badge" style="background:var(--accent); color:#fff; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;">${index + 1}</div>
							<div style="font-weight:bold; color:var(--accent-2); font-size:1.1em;">${flow}</div>
						</div>
						<div class="small-muted" style="margin-top:8px; padding-left:34px;">${window.__("motion_dominant_label") || desc.trim()}</div>
					`;
					container.appendChild(row);
				});
				targetEl.appendChild(container);
			} else {
				targetEl.innerHTML = `<div class="small-muted">Could not analyze this progression.</div>`;
			}
			break;
		}
		case 'negative': {
			// 负和声：使用两个输入框，一个是和弦 (other-input)，一个是轴 (other-axis-input)
			const chord = v;
			const axisInput = document.getElementById('other-axis-input');
			const axisRaw = axisInput ? axisInput.value : '';
			const axis = (axisRaw && axisRaw.trim()) || 'C';
			
			// 1. 数据准备
			const chord_keys = brain.converter._ensureNotesAndRoot(chord);
			const negResult = brain.toNegative(chord, axis); 
			// 注意：假设 negResult 返回的是 ['F', 'D', 'Bb', 'G'] 或包含 notes 属性的对象
			const neg_notes = Array.isArray(negResult) ? negResult : (negResult.notes || []);
			const neg_name = negResult.negative || 'Negative Chord';

			targetEl.innerHTML = '';

			// 2. 创建主卡片
			const card = document.createElement('div');
			card.className = 'result-card';
			// 使用深蓝色到深紫色的渐变，营造一种“镜像”或“深夜”的乐理氛围
			card.style.background = 'linear-gradient(135deg, hsl(230, 25%, 15%), hsl(260, 20%, 12%))';
			card.style.border = '1px solid rgba(255,255,255,0.1)';

			// 3. 头部信息
			const header = document.createElement('div');
			header.style.textAlign = 'center';
			header.style.marginBottom = '20px';
			header.innerHTML = `
				<div class="small-muted" style="letter-spacing: 2px; text-transform: uppercase; font-size: 0.75rem;">${window.__("neg_harmony_title")}</div>
				<div style="font-size: 0.9rem; color: var(--accent-2); margin-top: 4px;">${window.__('neg_axis') || 'Axis'}: <span style="font-weight: bold; color: #fff;">${axis} / ${brain.converter.idxToNote[(brain.converter.noteToIdx[axis] + 7) % 12]}</span></div>
			`;
			card.appendChild(header);

			// 4. 镜像对比区域
			const comparison = document.createElement('div');
			comparison.style.display = 'flex';
			comparison.style.alignItems = 'center';
			comparison.style.justifyContent = 'space-between';
			comparison.style.gap = '10px';

			// 创建左右音符列的函数
			const createNoteColumn = (title, chordName, notes, isNegative = false) => {
				const col = document.createElement('div');
				col.style.flex = '1';
				col.style.textAlign = 'center';
				
				const label = document.createElement('div');
				label.className = 'small-muted';
				label.textContent = title;
				col.appendChild(label);

				const name = document.createElement('div');
				name.style.fontSize = '1.4rem';
				name.style.fontWeight = 'bold';
				name.style.margin = '5px 0 15px 0';
				name.style.color = isNegative ? 'var(--accent-2)' : '#fff';
				name.textContent = chordName;
				col.appendChild(name);

				const grid = document.createElement('div');
				grid.className = 'note-grid';
				grid.style.justifyContent = 'center';
				notes.forEach(n => {
					const cell = document.createElement('div');
					cell.className = 'note-cell';
					if (isNegative) cell.style.borderColor = 'var(--accent-2)';
					cell.innerHTML = `<div class="note">${n}</div>`;
					grid.appendChild(cell);
				});
				col.appendChild(grid);
				return col;
			};

			// 原和声列
			comparison.appendChild(createNoteColumn(window.__('neg_original') || 'Original', chord, chord_keys));

			// 中间箭头
			const arrow = document.createElement('div');
			arrow.style.fontSize = '1.5rem';
			arrow.style.color = 'var(--accent)';
			arrow.style.opacity = '0.6';
			arrow.innerHTML = '⇄';
			comparison.appendChild(arrow);

			// 负和声列
			comparison.appendChild(createNoteColumn(window.__('neg_negative') || 'Negative', neg_name, neg_notes, true));

			card.appendChild(comparison);
			targetEl.appendChild(card);
			break;
		}
		case "guide": {
		const prog = parseChordList(v);
		const path = brain.getGuideTonePath(prog); // 假设返回 [[3, 7], [3, 7]...]

		targetEl.innerHTML = '';
		const container = document.createElement('div');
		container.className = 'guide-tone-path';
		container.style.display = 'flex';
		container.style.flexDirection = 'column';
		container.style.gap = '15px';
		container.style.padding = '10px';

		path.forEach((tones, index) => {
			const chordName = prog[index] || `Chord ${index + 1}`;
			const row = document.createElement('div');
			row.className = 'result-card';
			row.style.margin = '0';
			row.style.display = 'flex';
			row.style.alignItems = 'center';
			row.style.background = 'linear-gradient(90deg, #1a1a2e, #16213e)';

			// 左侧：和弦名称
			const nameLabel = document.createElement('div');
			nameLabel.style.width = '80px';
			nameLabel.style.fontWeight = 'bold';
			nameLabel.style.color = 'var(--accent-2)';
			nameLabel.textContent = chordName;

			// 中间：导音对 (通常是 3音 和 7音)
			const tonesGrid = document.createElement('div');
			tonesGrid.style.display = 'flex';
			tonesGrid.style.gap = '10px';
			tonesGrid.style.flex = '1';
			tonesGrid.style.justifyContent = 'center';

			tones.forEach((note, i) => {
			const cell = document.createElement('div');
			cell.className = 'note-cell';
			// 给 3音和 7音上点不同的色（假设顺序是 3, 7）
			if (i === 0) cell.style.borderColor = 'var(--accent)'; 
			cell.innerHTML = `<div class="note">${note}</div><small style="font-size:9px; opacity:0.5; display:block; margin-top:2px;">${i === 0 ? '3rd' : '7th'}</small>`;
			tonesGrid.appendChild(cell);
			});

			row.appendChild(nameLabel);
			row.appendChild(tonesGrid);

			// 右侧：连接箭头 (除了最后一个)
			if (index < path.length - 1) {
			const arrow = document.createElement('div');
			arrow.style.textAlign = 'center';
			arrow.style.color = 'var(--accent)';
			arrow.style.padding = '5px';
			arrow.innerHTML = `↓ <span style="font-size:0.7em; opacity:0.6;">${window.__('voice_leading_label') || 'Voice Leading'}</span>`;
			
			container.appendChild(row);
			container.appendChild(arrow);
			} else {
			container.appendChild(row);
			}
		});

		targetEl.appendChild(container);
		break;
		}
      }
    } catch (e) {
      targetEl.innerHTML = `<h3>${window.__("other_error")}</h3><pre>${e.message}</pre>`;
    }
  }

  // helper: parse comma-separated or JSON list of chords/objects
  function parseChordList(input) {
    const t = input.trim();
    if (t.startsWith("[")) {
      try {
        return JSON.parse(t);
      } catch (e) {}
    }
    return t
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s);
  }

  // helpers for key-center dynamic inputs
  function createKeyCenterEntry(value = "") {
    const div = document.createElement("div");
    div.className = "kc-chord-entry";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.marginBottom = "4px";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "kc-chord";
    input.value = value;
    input.style.flex = "1";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "-";
    btn.title = "移除和弦";
    btn.style.marginLeft = "6px";
    btn.addEventListener("click", () => {
      div.remove();
    });

    div.appendChild(input);
    div.appendChild(btn);
    return div;
  }

  function setKeyCenterChords(arr) {
    const container = document.getElementById("keycenter-inputs");
    // remove existing entries (but keep the add button as last child)
    Array.from(container.querySelectorAll(".kc-chord-entry")).forEach((e) => e.remove());
    arr.forEach((v) => {
      const entry = createKeyCenterEntry(v);
      container.insertBefore(entry, document.getElementById("add-keycenter-chord"));
    });
  }

  function getKeyCenterValue() {
    const container = document.getElementById("keycenter-inputs");
    const chords = Array.from(container.querySelectorAll(".kc-chord"))
      .map((i) => i.value.trim())
      .filter((s) => s);

    return chords.join(";");
  }

  // Navigation binding: show only selected feature
  navButtons.forEach((b) =>
    b.addEventListener("click", () => showOnlyFeature(b.dataset.feature)),
  );
  // initialize other panel mode buttons
  initOtherControls();

  // setup additional controls for "other" panel
  function initOtherControls() {
    const modes = ["key_center", "report", "progression", "negative", "guide"];
    const row = document.getElementById("other-action-row");
    const buttons = {};
    modes.forEach((mode) => {
      const btn = document.createElement("button");
      btn.className = "panel-action";
      btn.textContent = window.__(`other_mode_${mode}`);
      btn.addEventListener("click", () => setOtherMode(mode));
      row.appendChild(btn);
      buttons[mode] = btn;
    });

    // default examples for each mode
    const sampleInputs = {
      key_center: "Cmaj7,Ebdim7,Dm7,G7",
      report: "C7",
      progression: "Cmaj7,Fmaj7,G7,Cmaj7",
      // 负和声：和弦与轴拆成两个输入框，这里只保留和弦示例
      negative: "Dm7 add b13 omit 5/C",
      guide: "Dm7,G7,Cmaj7",
    };

    function setOtherMode(mode) {
      currentOtherMode = mode;
      modes.forEach((m) => buttons[m].classList.toggle("active", m === mode));
      const labelEl = document.getElementById("label_other_example");
      const newText =
        window.__(`label_other_example_${mode}`) ||
        window.__("label_other_example");
      labelEl.textContent = newText;

      const inputEl = document.getElementById("other-input");
      const kcContainer = document.getElementById("keycenter-inputs");
      const axisRow = document.getElementById("negative-axis-row");
      const axisInput = document.getElementById("other-axis-input");

      // key_center / progression / guide 三种模式用“可增删”的和弦列表排版
      const useChordList =
        mode === "key_center" || mode === "progression" || mode === "guide";

      // 负和声模式：使用两个输入框（和弦 + 轴）
      if (mode === "negative") {
        inputEl.style.display = "";
        kcContainer.style.display = "none";
        if (axisRow) axisRow.style.display = "block";
        if (sampleInputs[mode] !== undefined) inputEl.value = sampleInputs[mode];
        if (axisInput && !axisInput.value) axisInput.value = "C";
      } else {
        if (axisRow) axisRow.style.display = "none";
        if (useChordList) {
          // 显示可增删列表，隐藏单行输入
          inputEl.style.display = "none";
          kcContainer.style.display = "block";
          const example = sampleInputs[mode] || "";
          const arr = example
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s);
          setKeyCenterChords(arr);
        } else {
          inputEl.style.display = "";
          kcContainer.style.display = "none";
          if (sampleInputs[mode] !== undefined)
            inputEl.value = sampleInputs[mode];
        }
      }
    }

    setOtherMode(currentOtherMode);
  }

  // Bind run buttons and inputs per-panel
  document.getElementById("chord-run").addEventListener("click", () => {
    const target = document.getElementById("panel-chord-body");
    const val = document.getElementById("chord-input").value;
    prettyChordRender(target, val);
  });
  document.getElementById("blues-run").addEventListener("click", () => {
    const target = document.getElementById("panel-blues-body");
    const val = document.getElementById("blues-input").value;
    updateBlues(target, val);
  });
  document.getElementById("lcc-run").addEventListener("click", () => {
    const target = document.getElementById("panel-lcc-body");
    const val = document.getElementById("lcc-input").value;
    updateLCC(target, val);
  });
  document.getElementById("cst-run").addEventListener("click", () => {
    const target = document.getElementById("panel-cst-body");
    const val = document.getElementById("cst-input").value;
    updateCST(target, val);
  });
  // add/remove behavior for key center chord inputs
  document.getElementById("add-keycenter-chord").addEventListener("click", () => {
    const container = document.getElementById("keycenter-inputs");
    const entry = createKeyCenterEntry("");
    container.insertBefore(entry, document.getElementById("add-keycenter-chord"));
  });

  document.getElementById("other-run").addEventListener("click", () => {
    const target = document.getElementById("panel-other-body");
    let val;
    if (
      currentOtherMode === "key_center" ||
      currentOtherMode === "progression" ||
      currentOtherMode === "guide"
    ) {
      // 这三种模式都从“可增删”列表收集和弦
      val = getKeyCenterValue();
    } else {
      val = document.getElementById("other-input").value;
    }
    processOther(target, val);
  });

  // 和弦衔接推荐面板 - 按钮事件绑定
const recRunBtn = document.getElementById("rec-run");
const recInput = document.getElementById("rec-input");
const recPanelBody = document.getElementById("panel-rec-body");

if (recRunBtn && recInput && recPanelBody) {
  recRunBtn.addEventListener("click", () => {
    const inputVal = recInput.value.trim();
    updateRec(recPanelBody, inputVal);
  });

  // 支持回车触发
  recInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      recRunBtn.click();
    }
  });
}

// 初始化默认显示第一个面板（保持原有逻辑）
const defaultFeature = navButtons.length > 0 ? navButtons[0].dataset.feature : "chord";
showOnlyFeature(defaultFeature);

  showOnlyFeature("chord");
});

// 五度圈面板（从 script.js 拆出）：五度圈与关系调、调内和弦表、轴心系统配色、多调式五度圈与功能环
// 由 script.js 在初始化时调用 createCirclePanel(ctx)；ctx 传入画布、表格容器、音名换算与五度圈数据，live 里是会变的值（升降号记法、音名表、异步载入的 JSON）
import { EnhancedChordConverter } from "./jazz_compass.js?v=20261004-w7";
import { playChord } from "./audio_engine.js?v=20261006-guide-audio1";
import { iconSvg } from "./ui_icons.js?v=20261003-i2";
import { parsePitch, spellHeptatonic } from "./pitch_spelling.js";
import { melodicCircleScale } from "./circle_scales.js?v=20261006-circle1";
import { circleDegreeChord, resizeCircleVoicing } from './circle_chords.js?v=20261006-register1';

export function createCirclePanel(ctx) {
  const {
    canvas, tableContainer, resetBtn, conv, resizeCanvas, canvasPalette, noteToSemitone, semitoneToNote, noteToIdx, circleData,
    majorScaleIntervals, minorScaleIntervals, harmonicMajorIntervals, harmonicMinorIntervals,
    majorDegreeNums, minorDegreeNums, harmonicMajorDegreeNums, harmonicMinorDegreeNums,
    live,
  } = ctx;
  let circleCurrentKey = null; // 当前选中的调性

  let majorMode = "natural"; // "natural" | "harmonic" | "melodic"
  let minorMode = "natural";
  let majorDirection = "descending";
  let minorDirection = "ascending";
  const degreeTableStates = new Map();

  // 获取音阶音符（使用半音索引，避免等音名匹配失败）
  function getScaleNotes(root, intervals) {
    const rootIdx = noteToSemitone(root);
    if (rootIdx === undefined) {
      console.error("Unknown root:", root);
      return intervals.map(() => "?");
    }
    // 七声音阶按音级拼写（E 大调是 E F# G# A B C# D#）  ref:omt-intervals ref:omt2e-major-scales
    const spelled = spellHeptatonic(String(root).replace(/m$/, "").trim(), intervals);
    if (spelled) return spelled;
    const preferSharps = /[#♯]/.test(root);
    return intervals.map((i) => semitoneToNote((rootIdx + i) % 12, live.notationMode === "sharps" || preferSharps));
  }

  const axisColorMap = {
    T: {
      major: "rgba(66,128,226,0.22)",
      minor: "rgba(66,128,226,0.14)",
      highlight: "rgba(66,128,226,0.42)",
    },
    D: {
      major: "rgba(222,138,40,0.24)",
      minor: "rgba(222,138,40,0.15)",
      highlight: "rgba(222,138,40,0.44)",
    },
    S: {
      major: "rgba(56,160,102,0.22)",
      minor: "rgba(56,160,102,0.14)",
      highlight: "rgba(56,160,102,0.42)",
    },
    default: {
      major: null,
      minor: null,
      highlight: null,
    },
  };

  function getAxisRoot(highlightMajor, highlightMinor) {
    if (highlightMajor) return highlightMajor;
    const found = circleData.find(
      (item) =>
        item.minor === highlightMinor ||
        item.major === highlightMinor ||
        item.enharmonic === highlightMinor,
    );
    return found ? found.major : null;
  }

  function getAxisGroup(itemMajor, axisRoot) {
    if (!axisRoot) return null;
    const rootIndex = circleData.findIndex(
      (item) =>
        item.major === axisRoot ||
        item.enharmonic === axisRoot ||
        item.minor === axisRoot,
    );
    const itemIndex = circleData.findIndex(
      (item) =>
        item.major === itemMajor ||
        item.enharmonic === itemMajor ||
        item.minor === itemMajor,
    );
    if (rootIndex < 0 || itemIndex < 0) return null;
    const offset = (itemIndex - rootIndex + 12) % 12;
    if (offset % 3 === 0) return "T";
    if (offset % 3 === 1) return "D";
    return "S";
  }

  // 绘制五度圈
  function drawCircle(highlightMajor, highlightMinor) {
    const { size, ctx } = resizeCanvas();
    const cx = size / 2;
    const cy = size / 2;
    const outerR = size * 0.42;
    const innerR = size * 0.28;
    const centerR = size * 0.12;

    ctx.clearRect(0, 0, size, size);

    // 背景
    const palette = canvasPalette();
    ctx.fillStyle = palette.disc;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR + 20, 0, Math.PI * 2);
    ctx.fill();

    const axisRoot = getAxisRoot(highlightMajor, highlightMinor);
    circleData.forEach((item, i) => {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const nextAngle = ((i + 1) / 12) * Math.PI * 2 - Math.PI / 2;
      const axisGroup = getAxisGroup(item.major, axisRoot);

      // 外环（大调）
      const isHighlightedOuter = highlightMajor === item.major;
      drawArcSegment(
        ctx,
        cx,
        cy,
        innerR,
        outerR,
        angle,
        nextAngle,
        item.major,
        item.sharps,
        item.flats,
        isHighlightedOuter,
        "major",
        axisGroup,
      );

      // 内环（小调）
      const isHighlightedInner = highlightMinor === item.minor;
      drawArcSegment(
        ctx,
        cx,
        cy,
        centerR,
        innerR,
        angle,
        nextAngle,
        item.minor,
        item.sharps,
        item.flats,
        isHighlightedInner,
        "minor",
        axisGroup,
      );

      // 扇区分隔线
      ctx.beginPath();
      ctx.moveTo(
        cx + Math.cos(angle) * centerR,
        cy + Math.sin(angle) * centerR,
      );
      ctx.lineTo(
        cx + Math.cos(angle) * outerR,
        cy + Math.sin(angle) * outerR,
      );
      ctx.strokeStyle = palette.line;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // 中心标签
    ctx.fillStyle = palette.text;
    ctx.font = `700 13px ${palette.display}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(window.__("nav_circle"), cx, cy - 6);
    ctx.font = `10px ${palette.font}`;
    ctx.fillStyle = palette.textDim;
    ctx.fillText("Circle of 5ths", cx, cy + 10);
  }
  // 多调性模式相关变量
  let multiModeActive = false;
  let currentMultiMode = null;       // 当前选中的模式对象
  let currentRoot = null;            // 主音（点击五度圈后设定）

  // 辅助函数：半音差转音级索引（0-11）
  function getSemitoneDistance(fromNote, toNote) {
    const idxFrom = noteToIdx[fromNote];
    const idxTo = noteToIdx[toNote];
    return (idxTo - idxFrom + 12) % 12;
  }

  /** 在音阶顺序上取该级的三音、五音（按半音 3/4 与 6/7/8，非简单 +2/+4 音级） */
  function getScaleTriadAtDegree(intervals, degIndex) {
    const n = intervals.length;
    const root = intervals[degIndex];
    let thirdOff = null;
    let thirdDist = null;
    let fifthOff = null;
    let fifthDist = null;

    for (let step = 1; step < n; step++) {
      const off = intervals[(degIndex + step) % n];
      const d = (off - root + 12) % 12;
      if (thirdOff == null && (d === 3 || d === 4)) {
        thirdOff = off;
        thirdDist = d;
      }
    }

    if (thirdOff != null) {
      for (const want of [7, 6, 8]) {
        for (let step = 1; step < n; step++) {
          const off = intervals[(degIndex + step) % n];
          const d = (off - root + 12) % 12;
          if (d === want) {
            fifthOff = off;
            fifthDist = d;
            break;
          }
        }
        if (fifthOff != null) break;
      }
    }

    if (thirdOff == null) {
      for (let step = 1; step < n; step++) {
        const off = intervals[(degIndex + step) % n];
        const d = (off - root + 12) % 12;
        if (d === 2) {
          thirdOff = off;
          thirdDist = 2;
          break;
        }
        if (d === 5) {
          thirdOff = off;
          thirdDist = 5;
          break;
        }
      }
      if (thirdOff != null) {
        for (const want of [7, 6, 8]) {
          for (let step = 1; step < n; step++) {
            const off = intervals[(degIndex + step) % n];
            const d = (off - root + 12) % 12;
            if (d === want) {
              fifthOff = off;
              fifthDist = d;
              break;
            }
          }
          if (fifthOff != null) break;
        }
      }
    }

    return { thirdOff, fifthOff, thirdDist, fifthDist };
  }

  let _multiModeChordConverter = null;

  function getMultiModeChordConverter() {
    if (!_multiModeChordConverter) {
      _multiModeChordConverter = new EnhancedChordConverter();
    }
    return _multiModeChordConverter;
  }

  /** 从 identifyChord 的 quality 提取基础和弦类型 */
  function extractBaseChordQuality(quality) {
    if (quality == null || quality === "") return "maj";
    const q = String(quality).trim().split(/\s+/)[0];
    if (q === "maj" || q === "major" || q === "M") return "maj";
    if (q === "min" || q === "m" || q === "minor") return "min";
    if (q === "dim") return "dim";
    if (q === "aug") return "aug";
    if (q === "sus2") return "sus2";
    if (q === "sus4") return "sus4";
    return "unknown";
  }
function extractBaseChordQuality(quality) {
    if (!quality) return "maj";
    const q = String(quality).trim().toLowerCase();
    
    // 标准类型列表
    const standardTypes = ["maj", "min", "dim", "aug", "sus2", "sus4", "5"];
    
    for (const type of standardTypes) {
        if (q === type || q.startsWith(type + " ") || q.startsWith(type + "\n")) {
            return type;
        }
    }
    
    // 处理空字符串（大三和弦）
    if (q === "" || q === "maj") return "maj";
    if (q === "m" || q === "min") return "min";
    
    return "unknown";
}
  /**
   * 音阶级数 → 和弦：取调内三音后用 EnhancedChordConverter.identifyChord 识别
   * （与 jazz_compass.js _ensureNotesAndRoot 音名列表逻辑一致）
   */
function buildTriadChordAtDegree(root, intervals, degIndex, converter, preferredType = null) {
    const conv = converter || getMultiModeChordConverter();
    const rootIdx = conv.noteToIdx[root];
    const rootOff = intervals[degIndex];
    const rootNote = conv.idxToNote[(rootIdx + rootOff) % 12];

    // 获取三音和五音（按音阶级进，隔一个取一个）
    const n = intervals.length;
    let thirdOff = null;
    let fifthOff = null;
    
    // 找到第三个音（跳过1个）
    let thirdIdx = (degIndex + 2) % n;
    thirdOff = intervals[thirdIdx];
    
    // 找到第五个音（跳过3个，即 +4 索引）
    let fifthIdx = (degIndex + 4) % n;
    fifthOff = intervals[fifthIdx];
    
    // 构建音符列表
    const noteNames = [rootNote];
    if (thirdOff != null) {
        noteNames.push(conv.idxToNote[(rootIdx + thirdOff) % 12]);
    }
    if (fifthOff != null) {
        noteNames.push(conv.idxToNote[(rootIdx + fifthOff) % 12]);
    }
    
    // 使用 EnhancedChordConverter 识别和弦
    let chordLabel = rootNote;
    let chordType = "unknown";
    let notes = noteNames.join(", ");
    let finalNotes = noteNames;

    // 优先：基于调内音在整调上尝试匹配标准三和弦（不再严格限制为同一格子）
    function findTriadFromScaleNotes(scaleRoot, chordRoot, scaleIntervals, conv, preferred) {
        const scaleRootIdx = conv.noteToIdx[scaleRoot];
        const scaleSet = new Set(
            scaleIntervals.map(i => (scaleRootIdx + i) % 12)
        );
        const rootIdxLocal = conv.noteToIdx[chordRoot];

        const triadSpecs = [
            { type: 'maj', ints: [4,7] },
            { type: 'min', ints: [3,7] },
            { type: 'dim', ints: [3,6] },
            { type: 'aug', ints: [4,8] },
            { type: 'sus2', ints: [2,7] },
            { type: 'sus4', ints: [5,7] },
        ];

        // 按优先级分组： maj/min > dim/aug > sus2/sus4
        const priorityGroups = [
            ['maj','min'],
            ['dim','aug'],
            ['sus2','sus4']
        ];

        // 先检测完全匹配（三音都在调内）
        const matches = [];
        for (const spec of triadSpecs) {
            const ok = spec.ints.every(i => scaleSet.has((rootIdxLocal + i) % 12));
            if (ok) {
                const notesArr = [
                    conv.idxToNote[rootIdxLocal % 12],
                    conv.idxToNote[(rootIdxLocal + spec.ints[0]) % 12],
                    conv.idxToNote[(rootIdxLocal + spec.ints[1]) % 12]
                ];
                matches.push({ type: spec.type, notes: notesArr });
            }
        }

        if (matches.length) {
            // 如果有优先类型且能找到，直接返回
            if (preferred && (preferred === 'maj' || preferred === 'min')) {
                const found = matches.find(m => m.type === preferred);
                if (found) return found;
            }
            
            // 选择最高优先级匹配
            for (const group of priorityGroups) {
                const found = matches.find(m => group.includes(m.type));
                if (found) return found;
            }
            return matches[0];
        }

        // 如果没有完全三音匹配，尝试弱匹配（任意两个音在调内）
        const weakMatches = [];
        for (const spec of triadSpecs) {
            const have = spec.ints.filter(i => scaleSet.has((rootIdxLocal + i) % 12)).length;
            if (have >= 2) {
                const notesArr = [
                    conv.idxToNote[rootIdxLocal % 12],
                    conv.idxToNote[(rootIdxLocal + spec.ints[0]) % 12],
                    conv.idxToNote[(rootIdxLocal + spec.ints[1]) % 12]
                ];
                weakMatches.push({ type: spec.type, notes: notesArr, have });
            }
        }
        if (weakMatches.length) {
            // 按 have(desc) + priority
            weakMatches.sort((a,b) => b.have - a.have);
            
            // 如果有优先类型且能找到，直接返回
            if (preferred && (preferred === 'maj' || preferred === 'min')) {
                const found = weakMatches.find(m => m.type === preferred);
                if (found) return found;
            }
            
            for (const group of priorityGroups) {
                const found = weakMatches.find(m => group.includes(m.type));
                if (found) return found;
            }
            return weakMatches[0];
        }

        return null;
    }

    // 先尝试基于整调的triad匹配
    try {
        const scaleBased = findTriadFromScaleNotes(root, rootNote, intervals, conv, preferredType);
      if (scaleBased) {
        chordType = scaleBased.type === 'min' ? 'min' : (scaleBased.type === 'maj' ? 'maj' : scaleBased.type);
        chordLabel = formatChordName(rootNote, chordType);
        finalNotes = scaleBased.notes;
        notes = finalNotes.join(', ');
        return {
          dist: rootOff,
          degreeLabel: formatRomanDegreeLabel(degIndex, chordType),
          chordLabel: chordLabel,
          notes: notes,
          chordType: chordType,
          notesArray: finalNotes
        };
      }
    } catch (e) {
      console.warn('scale-based triad detection failed', e);
    }

    // 回退到原有的识别逻辑
    if (noteNames.length >= 2) {
      try {
        // 直接使用 identifyChord 方法
        const identified = conv.identifyChord(
          noteNames.map(n => conv.noteToIdx[n])
        );

        if (identified && identified.chord) {
          chordLabel = identified.chord;
          // 提取基础和弦类型
          const quality = identified.quality || "";
          const baseQuality = quality.split(/\s+/)[0];

          // 确定和弦类型
          if (baseQuality === "" || baseQuality === "maj") {
            chordType = "maj";
          } else if (baseQuality === "min" || baseQuality === "m") {
            chordType = "min";
          } else if (baseQuality === "dim") {
            chordType = "dim";
          } else if (baseQuality === "aug") {
            chordType = "aug";
          } else if (baseQuality === "sus2") {
            chordType = "sus2";
          } else if (baseQuality === "sus4") {
            chordType = "sus4";
          } else {
            chordType = baseQuality;
          }

          // 获取识别出的音符
          if (identified.quality && identified.quality !== quality) {
            // 尝试解析出音符
            const parsedNotes = conv._ensureNotesAndRoot(chordLabel);
            if (parsedNotes && parsedNotes.length) {
              finalNotes = parsedNotes;
              notes = finalNotes.join(", ");
            }
          }
        }
      } catch (e) {
        console.warn(`识别和弦失败 ${rootNote}${rootOff}:`, e);
        // 保持原始标签
      }
    }
    
    return {
        dist: rootOff,
        degreeLabel: formatRomanDegreeLabel(degIndex, chordType),
        chordLabel: chordLabel,
        notes: notes,
        chordType: chordType,
        notesArray: finalNotes
    };
}

// 新增：强制匹配最接近的标准三和弦
function forceToStandardTriad(notes, converter) {
    if (!notes || notes.length < 3) return null;
    
    const root = notes[0];
    const rootIdx = converter.noteToIdx[root];
    
    // 计算相对于根音的音程
    const intervals = notes.map(n => {
        const idx = converter.noteToIdx[n];
        return (idx - rootIdx + 12) % 12;
    }).sort((a, b) => a - b);
    
    // 标准三和弦的音程模式
    const standardTriads = [
        { intervals: [0, 4, 7], type: "maj", chord: root, label: root },
        { intervals: [0, 3, 7], type: "min", chord: `${root}m`, label: `${root}m` },
        { intervals: [0, 4, 8], type: "aug", chord: `${root}+`, label: `${root}+` },
        { intervals: [0, 3, 6], type: "dim", chord: `${root}°`, label: `${root}°` },
        { intervals: [0, 2, 7], type: "sus2", chord: `${root}sus2`, label: `${root}sus2` },
        { intervals: [0, 5, 7], type: "sus4", chord: `${root}sus4`, label: `${root}sus4` },
    ];
    
    // 找匹配度最高的
    let bestMatch = null;
    let bestScore = -1;
    
    for (const triad of standardTriads) {
        let score = 0;
        for (const interval of triad.intervals) {
            if (intervals.includes(interval)) score++;
        }
        // 也检查是否有冲突音（不应该有的音）
        for (const interval of intervals) {
            if (!triad.intervals.includes(interval) && interval !== 0) {
                score -= 0.5;
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = triad;
        }
    }
    
    if (bestMatch && bestScore >= 2) {
        // 构建标准音符
        const standardNotes = bestMatch.intervals.map(i => 
            converter.idxToNote[(rootIdx + i) % 12]
        );
        return {
            chord: bestMatch.chord,
            chordType: bestMatch.type,
            notes: standardNotes
        };
    }
    
    return null;
}

  function formatChordName(rootNote, chordType) {
    if (chordType === "min") return `${rootNote}m`;
    if (chordType === "dim") return `${rootNote}°`;
    if (chordType === "aug") return `${rootNote}+`;
    if (chordType === "sus2") return `${rootNote}sus2`;
    if (chordType === "sus4") return `${rootNote}sus4`;
    return rootNote;
  }

  function getChordTypeForNote(root, targetNote, intervals) {
    const dist = getSemitoneDistance(root, targetNote);
    const degree = intervals.indexOf(dist);
    if (degree === -1) return null;
    return buildTriadChordAtDegree(root, intervals, degree).chordType;
  }

  // 更新五度圈显示（多调性模式）
  function updateCircleMultiMode() {
    if (!multiModeActive || !currentMultiMode) {
      // 恢复原始五度圈
      if (circleCurrentKey) {
        drawCircle(circleCurrentKey.major, circleCurrentKey.minor);
        renderKeyTable(circleCurrentKey.major, circleCurrentKey.minor, circleCurrentKey.primary);
      } else {
        drawCircle(null, null);
        const tableContainer = document.getElementById("circle-table-container");
        if (tableContainer) tableContainer.innerHTML = "";
      }
      return;
    }

    const includeSet = new Set(currentMultiMode.includeNoteIdx);
    const root = currentRoot;

    drawMultiCircle(root, includeSet, currentMultiMode);

    const tableContainer = document.getElementById("circle-table-container");
    if (root && noteToIdx[root] != null) {
      renderMultiModeTable(root, currentMultiMode);
    } else if (tableContainer) {
      tableContainer.innerHTML = "";
    }
  }

  // 解析内圈功能组标签片段，如 "3D(6s)" → [{text:"3D"}, {text:"6s", inParens:true}]
  function parseFuncRingLabelSegments(label) {
    const m = String(label).match(/^([^(]+)(?:\(([^)]+)\))?$/);
    if (!m) return [{ text: label, inParens: false }];
    const segments = [{ text: m[1], inParens: false }];
    if (m[2]) segments.push({ text: m[2], inParens: true });
    return segments;
  }

  // 与内圈主音环一致：按扇区标签定位功能替代（不用 funcGroup 半音索引）
  function findSectorForFuncReplaceGroup(innerLabels, replaceGroup) {
    if (!replaceGroup || !innerLabels?.length) return null;
    for (let i = 0; i < innerLabels.length; i++) {
      const label = innerLabels[i];
      if (!label) continue;
      const hit = parseFuncRingLabelSegments(label).some((s) => s.text === replaceGroup);
      if (hit) return i;
    }
    return null;
  }

  // 主音环：沿五度圈顺时针 12 格（与画布内圈一致）
  const FUNC_RING_BASE = [
    { main: "t" },
    { main: "d" },
    { main: "S" },
    { main: "T" },
    { main: "D" },
    { main: "DD" },
    { main: "3D", overlap: "6s" },
    { main: "4D", overlap: "5s" },
    { main: "5D", overlap: "4s" },
    { main: "6D", overlap: "3s" },
    { main: "ss" },
    { main: "s" },
  ];

  function getFuncGroupIndexForMode(key, mode) {
    if (!live.funcGroupData || !mode) return null;
    const idx = live.funcGroupData[key];
    if (idx == null) return null;
    if (!Array.isArray(idx)) return idx;
    if (key === "tIdx") return mode.tonicGroup === "t" ? idx[0] : idx[1] ?? idx[0];
    if (key === "TIdx") return mode.tonicGroup === "T" ? idx[0] : idx[1] ?? idx[0];
    return idx[0];
  }

  function findCircleSectorForDist(root, dist) {
    for (let i = 0; i < circleData.length; i++) {
      if (getSemitoneDistance(root, circleData[i].major) === dist) return i;
    }
    return 0;
  }

  function formatFuncRingEntry(entry) {
    return entry.overlap ? `${entry.main}(${entry.overlap})` : entry.main;
  }

  /** 内圈功能标签：从 t/T 锚点起沿五度圈顺转一圈 */
  // 在 script.js 中，找到 buildInnerFuncRingLabels 函数并替换

  function buildInnerFuncRingLabels(root, mode) {
    const startChar = mode.tonicGroup === "t" ? "t" : "T";
    const startIdx = FUNC_RING_BASE.findIndex((e) => e.main === startChar);
    const ringSpec = startIdx <= 0
      ? FUNC_RING_BASE
      : [...FUNC_RING_BASE.slice(startIdx), ...FUNC_RING_BASE.slice(0, startIdx)];

    const anchorKey = mode.tonicGroup === "t" ? "tIdx" : "TIdx";
    const anchorDist = getFuncGroupIndexForMode(anchorKey, mode);
    const anchorSector = anchorDist != null ? findCircleSectorForDist(root, anchorDist) : 0;

    // 获取各扇区对应的和弦类型
    const converter = getMultiModeChordConverter();
    const rootIdx = converter.noteToIdx[root];
    const intervals = mode.includeNoteIdx || [];
    const degreePreferredType = buildDegreePreferredTypeMap(mode);

    // 构建每个扇区（距离）对应的和弦类型
    const chordTypeByDist = {};
    const chordLabelByDist = {};
    for (let i = 0; i < intervals.length; i++) {
      const dist = intervals[i];
      const preferred = degreePreferredType[i];
      const triad = buildTriadChordAtDegree(root, intervals, i, converter, preferred);
      chordTypeByDist[dist] = triad.chordType;
      chordLabelByDist[dist] = triad.chordLabel;
    }

    const perSector = Array(12).fill("");
    for (let step = 0; step < 12; step++) {
      const sector = (anchorSector + step) % 12;
      let label = formatFuncRingEntry(ringSpec[step]);

      // 获取该扇区对应的音符和和弦类型
      const sectorNote = circleData[sector].major;
      const dist = getSemitoneDistance(root, sectorNote);
      const chordType = chordTypeByDist[dist];
      const chordLabel = chordLabelByDist[dist];
      console.log(`Sector ${sector}: ${sectorNote} (dist ${dist}) -> ${label}, chord: ${chordLabel} (${chordType})`);
      // 根据和弦类型调整功能标签的大小写
      label = adjustFuncLabelByChordType(label, chordType);
      // console.log(`Sector ${sector}: ${sectorNote} (dist ${dist}) -> ${label}, chord: ${chordLabel} (${chordType})`);
      perSector[sector] = label;
    }
    return perSector;
  }

  // 新增辅助函数：根据和弦类型调整功能标签
  function adjustFuncLabelByChordType(label, chordType) {
      if (!label || !chordType) return label;
      
      const upperToLowerMap = { 'T': 't', 'D': 'd', 'S': 's', 'DD': 'dd' };
      const lowerToUpperMap = { 't': 'T', 'd': 'D', 's': 'S', 'dd': 'DD' };
      
      let adjusted = label;
      
      // 只有 min 转换小写，maj 转换大写
      // dim、aug 保持原样
      if (chordType === 'min') {
          for (const [upper, lower] of Object.entries(upperToLowerMap)) {
              adjusted = adjusted.replace(new RegExp(upper, 'g'), lower);
          }
      } else if (chordType === 'maj') {
          for (const [lower, upper] of Object.entries(lowerToUpperMap)) {
              adjusted = adjusted.replace(new RegExp(lower, 'g'), upper);
          }
      }
      // dim、aug、sus2、sus4 → 不转换
      
      return adjusted;
  }

  function buildFuncNameToSectorMap(innerLabels) {
    const map = {};
    for (let i = 0; i < innerLabels.length; i++) {
      const label = innerLabels[i];
      if (!label) continue;
      for (const seg of parseFuncRingLabelSegments(label)) {
        map[seg.text] = i;
      }
    }
    return map;
  }

  // 替换 drawFuncRingLabel 函数

function drawFuncRingLabel(ctx, centerX, centerY, label, replaceGroup, chordType = null) {
    const segments = parseFuncRingLabelSegments(label);
    const palette = canvasPalette();
    const normalColor = palette.textDim;
    const replaceColor = palette.brass;
    const fontNormal = `9.5px ${palette.font}`;
    const fontReplace = `700 10.5px ${palette.font}`;
    const fontParen = `9.5px ${palette.font}`;

    // 只有 min 强调括号内，其他情况（maj/dim/aug/null）都强调括号外
    let emphasizeOuter = true;
    let emphasizeInner = false;
    
    if (chordType === 'min') {
        emphasizeOuter = false;
        emphasizeInner = true;
    }
    // dim、aug、maj、null → 保持 emphasizeOuter = true

    const pieces = [];
    let totalW = 0;
    
    for (const seg of segments) {
        const isRep = replaceGroup && seg.text === replaceGroup;
        
        let shouldEmphasize = false;
        if (seg.inParens) {
            shouldEmphasize = emphasizeInner;
        } else {
            shouldEmphasize = emphasizeOuter;
        }
        
        if (isRep) {
            shouldEmphasize = true;
        }
        
        const font = shouldEmphasize ? fontReplace : fontNormal;
        if (seg.inParens) {
            ctx.font = fontParen;
            const wOpen = ctx.measureText("(").width;
            ctx.font = font;
            const wInner = ctx.measureText(seg.text).width;
            ctx.font = fontParen;
            const wClose = ctx.measureText(")").width;
            pieces.push({ text: "(", font: fontParen, isRep: false, shouldEmphasize: false, w: wOpen });
            pieces.push({ text: seg.text, font, isRep, shouldEmphasize, w: wInner });
            pieces.push({ text: ")", font: fontParen, isRep: false, shouldEmphasize: false, w: wClose });
            totalW += wOpen + wInner + wClose;
        } else {
            ctx.font = font;
            const w = ctx.measureText(seg.text).width;
            pieces.push({ text: seg.text, font, isRep, shouldEmphasize, w });
            totalW += w;
        }
    }

    let x = centerX - totalW / 2;
    const prevAlign = ctx.textAlign;
    const prevBaseline = ctx.textBaseline;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    for (const p of pieces) {
        ctx.font = p.font;
        ctx.shadowBlur = 0;
        
        if (p.isRep) {
            ctx.fillStyle = replaceColor;
        } else if (p.shouldEmphasize) {
            ctx.fillStyle = palette.text;
        } else {
            ctx.fillStyle = normalColor;
        }
        ctx.fillText(p.text, x, centerY);
        x += p.w;
    }

    ctx.shadowBlur = 0;
    ctx.textAlign = prevAlign;
    ctx.textBaseline = prevBaseline;
}

  // 绘制多调性五度圈
  function drawMultiCircle(root, includeSet, mode) {
    const { size, ctx } = resizeCanvas();
    const cx = size / 2;
    const cy = size / 2;
    const outerR = size * 0.42;
    const innerR = size * 0.28;
    const centerR = size * 0.12;

    ctx.clearRect(0, 0, size, size);
    const palette = canvasPalette();
    ctx.fillStyle = palette.disc;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR + 20, 0, Math.PI * 2);
    ctx.fill();

    const hasRoot = root != null && noteToIdx[root] != null;

    // 准备每个扇区的和弦标签
    const degreePreferredType = buildDegreePreferredTypeMap(mode);
    const chordLabels = [];
    for (let i = 0; i < circleData.length; i++) {
      const sectorNote = circleData[i].major; // 扇区代表的音（外环）
      const dist = hasRoot ? getSemitoneDistance(root, sectorNote) : -1;
      let label = sectorNote;
      let isInside = hasRoot && includeSet.has(dist);
      let chordType = null;
      if (isInside) {
        const distIdx = getSemitoneDistance(root, sectorNote);
        const deg = mode.includeNoteIdx.indexOf(distIdx);
        if (deg >= 0) {
          const preferred = degreePreferredType[deg];
          const triad = buildTriadChordAtDegree(root, mode.includeNoteIdx, deg, null, preferred);
          chordType = triad.chordType;
          label = triad.chordLabel;
        }
      }
      chordLabels.push({ label, isInside, chordType });
    }

    const categoryColors = {
      // 非特征类使用更浅的颜色
      tonic: palette.accent,
      tonicChar: palette.accent,
      // 特性组和对照组使用明显不同且醒目的颜色
      featureChar: "#6a71cb", // 更深的天蓝
      contrastChar: "#f17f7f", // 更深的橙红
      // 保留高低极显著色
      // highPole: "#ff80b3",
      // lowPole: "#7c4dff",
    };

    function hexToRgba(hex, alpha) {
      const clean = hex.replace("#", "");
      const r = parseInt(clean.slice(0, 2), 16);
      const g = parseInt(clean.slice(2, 4), 16);
      const b = parseInt(clean.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function getCircleNoteCategory(dist) {
      if (!mode) return null;
      if (dist === mode.tonicGroupNoteIdx) return "tonic";
      if (dist === mode.featureGroupCharNoteIdx) return "featureChar";
      if (dist === mode.tonicGroupCharNoteIdx) return "tonicChar";
      if (dist === mode.contrastGroupCharNoteIdx) return "contrastChar";
      // if (dist === mode.highPoleNoteIdx) return "highPole";
      // if (dist === mode.lowPoleNoteIdx) return "lowPole";
      return null;
    }

    const innerFuncLabels = hasRoot ? buildInnerFuncRingLabels(root, mode) : Array(12).fill("");

    const funcReplaceSector = hasRoot && mode?.funcReplaceGroup
      ? findSectorForFuncReplaceGroup(innerFuncLabels, mode.funcReplaceGroup)
      : null;
    const funcReplaceColor = "#ffb74d";
    const funcReplaceGlow = "rgba(255, 183, 77, 0.95)";

    // 绘制扇区
    for (let i = 0; i < circleData.length; i++) {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const nextAngle = ((i + 1) / 12) * Math.PI * 2 - Math.PI / 2;
      const { label, isInside } = chordLabels[i];
      const sectorNote = circleData[i].major;
      const dist = hasRoot ? getSemitoneDistance(root, sectorNote) : -1;
      const noteCategory = hasRoot ? getCircleNoteCategory(dist) : null;
      const isFuncReplace = funcReplaceSector != null && i === funcReplaceSector;

      // 填充（调内和弦高亮背景 + 特殊类别底色）
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, angle, nextAngle);
      ctx.arc(cx, cy, innerR, nextAngle, angle, true);
      ctx.closePath();
      if (noteCategory/* && noteCategory !== "highPole" && noteCategory !== "lowPole"*/) {
        ctx.fillStyle = hexToRgba(categoryColors[noteCategory], 0.2);
      } else if (isInside) {
        ctx.fillStyle = hexToRgba(palette.accent, 0.12);
      } else {
        ctx.fillStyle = palette.fillSoft;
      }
      ctx.fill();

      // 不在此处绘制边框，避免邻接扇区重复描边导致叠加。边框将在全部扇区填充后统一绘制。

      // 标签
      const midAngle = (angle + nextAngle) / 2;
      const midR = (innerR + outerR) / 2;
      const textX = cx + Math.cos(midAngle) * midR;
      const textY = cy + Math.sin(midAngle) * midR;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 0;
      ctx.fillStyle = isInside ? palette.text : palette.textDim;
      ctx.font = isInside ? `700 13.5px ${palette.display}` : `12px ${palette.display}`;
      /*
      if (isFuncReplace) {
        ctx.shadowColor = funcReplaceGlow;
        ctx.shadowBlur = 12;
        // ctx.fillStyle = funcReplaceColor;
        ctx.font = "bold 14px sans-serif";
      } else {
      }
        */
      ctx.fillText(label, textX, textY);
      ctx.shadowBlur = 0;
    }

    // 绘制基础分割线和环边界，避免重复扇区描边重叠
    ctx.beginPath();
    for (let i = 0; i < 12; i++) {
      const edgeAngle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const x1 = cx + Math.cos(edgeAngle) * innerR;
      const y1 = cy + Math.sin(edgeAngle) * innerR;
      const x2 = cx + Math.cos(edgeAngle) * outerR;
      const y2 = cy + Math.sin(edgeAngle) * outerR;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    // 绘制高低极与主音特殊边界
    for (let i = 0; i < circleData.length; i++) {
      const sectorNote = circleData[i].major;
      const dist = hasRoot ? getSemitoneDistance(root, sectorNote) : -1;
      const noteCategory = hasRoot ? getCircleNoteCategory(dist) : null;
      if (!noteCategory || noteCategory === "featureChar" || noteCategory === "contrastChar" || noteCategory === "tonicChar") continue;

      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const nextAngle = ((i + 1) / 12) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, angle, nextAngle);
      ctx.arc(cx, cy, innerR, nextAngle, angle, true);
      ctx.closePath();
      if (noteCategory === "tonic") {
        ctx.strokeStyle = palette.text;
        ctx.lineWidth = 3;
      } else {
        ctx.strokeStyle = hexToRgba(categoryColors[noteCategory], 0.95);
        ctx.lineWidth = 3;
      }
      ctx.stroke();
    }

    // 在五度圈上方绘制图例（圆点染色 + 音名）
    (function drawLegend() {
      const legendItems = [
        { key: 'tonic', label: '主音', idxKey: 'tonicGroupNoteIdx' },
        { key: 'tonicChar', label: '主组特征音', idxKey: 'tonicGroupCharNoteIdx' },
        { key: 'featureChar', label: '特性组特征音', idxKey: 'featureGroupCharNoteIdx' },
        { key: 'contrastChar', label: '对照组特性音', idxKey: 'contrastGroupCharNoteIdx' }
      ];
      const itemW = 120;
      const totalW = legendItems.length * itemW;
      let startX = cx - totalW / 2;
      const y = cy - outerR - 18;
      ctx.font = `12px ${palette.font}`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      // 先过滤出有效项（必须有 root 且 mode 对应 idx 为 number）
      if (!(root in noteToIdx) || typeof noteToIdx[root] !== 'number') return;
      const rootIdx = noteToIdx[root];
      const validItems = legendItems.filter(it => typeof mode[it.idxKey] === 'number');
      if (!validItems.length) return; // 无有效项则不绘制图例

      for (let i = 0; i < validItems.length; i++) {
        const it = validItems[i];
        const x = startX + i * itemW;
        const distIdx = mode[it.idxKey];
        const noteIdx = (rootIdx + distIdx + 12) % 12;
        const noteName = live.idxToNote[noteIdx] || '-';

        // 圆点
        ctx.beginPath();
        ctx.arc(x + 6, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(categoryColors[it.key], 1);
        ctx.fill();
        // 文本
        ctx.fillStyle = palette.textSoft;
        ctx.fillText(` ${it.label}: ${noteName}`, x + 18, y);
      }
    })();

    // 中心标签（显示模式名称）
    ctx.fillStyle = palette.text;
    ctx.font = `700 11px ${palette.font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(mode.modeName || "多调性", cx, cy - 4);
    ctx.font = `9px ${palette.font}`;
    ctx.fillStyle = palette.textDim;
    ctx.fillText(`张力:${mode.tensionLevel} 温度:${mode.spaceTemp}`, cx, cy + 12);

    // 内圈功能组标注（需已选主音）
    if (!hasRoot) {
      ctx.beginPath();
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
      ctx.strokeStyle = palette.line;
      ctx.lineWidth = 1;
      ctx.stroke();
      return;
    }

    const innerLabelR = (centerR + innerR) / 2;
    const replaceGroup = mode.funcReplaceGroup || null;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < circleData.length; i++) {
      const label = innerFuncLabels[i];
      if (!label) continue;
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const nextAngle = ((i + 1) / 12) * Math.PI * 2 - Math.PI / 2;
      const midAngle = (angle + nextAngle) / 2;
      const textX = cx + Math.cos(midAngle) * innerLabelR;
      const textY = cy + Math.sin(midAngle) * innerLabelR;
      // 修改为：
      const sectorNote = circleData[i].major;
      const dist = getSemitoneDistance(root, sectorNote);
      let chordTypeForLabel = null;
      if (hasRoot) {
        const chordTypeByDist = {}; // 需要提前构建
        // 或者从已有的 chordLabels 中获取
        const chordData = chordLabels[i];
        if (chordData && chordData.chordType) {
          chordTypeForLabel = chordData.chordType;
        }
      }
      drawFuncRingLabel(ctx, textX, textY, label, replaceGroup, chordTypeForLabel);
    }

    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function escapeMultiModeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

function formatRomanDegreeLabel(degIndex, chordType) {
    const romanUpper = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    const romanLower = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii"];
    const upper = romanUpper[degIndex] || `${degIndex + 1}`;
    const lower = romanLower[degIndex] || `${degIndex + 1}`;
    
    switch (chordType) {
        case "min":
            return lower;
        case "dim":
            return `${lower}°`;
        case "aug":
            return `${upper}+`;
        case "sus2":
            return `${upper}sus2`;
        case "sus4":
            return `${upper}sus4`;
        case "maj":
            return upper;
        default:
            return `${upper}?`;
    }
}

  function buildModeScaleChordData(root, mode) {
    // 默认使用 mode 中定义的音级（多数模式在 modes.json 中已预设）
    let intervals = Array.isArray(mode.includeNoteIdx) ? mode.includeNoteIdx : [];

    // 如果这是小调家族且用户选择了和声小调开关，则使用全局的和声小调音级
    if (mode && mode.tonicGroup === "t" && minorMode === "harmonic") {
      intervals = harmonicMinorIntervals;
    }

    const converter = getMultiModeChordConverter();
    const degreePreferredType = buildDegreePreferredTypeMap(mode);
    
    // 生成行数据，考虑功能序列的优先类型
    const rows = intervals.map((_, i) => {
      const preferred = degreePreferredType[i];
      return buildTriadChordAtDegree(root, intervals, i, converter, preferred);
    });
    // 七声调式按音级重新拼写音名（E 大调写 G#，不是 Ab）  ref:omt-intervals ref:omt2e-major-scales
    const spellMap = modeSpellingMap(root, intervals);
    if (spellMap) {
      rows.forEach((row) => {
        if (typeof row.notes === "string") row.notes = row.notes.split(",").map((n) => respellNote(n.trim(), spellMap)).join(", ");
        if (typeof row.chordLabel === "string") row.chordLabel = row.chordLabel.replace(/^[A-G](?:#|b)?/, (name) => respellNote(name, spellMap));
      });
    }
    const chordTypes = rows.map((r) => r.chordType);
    return { intervals, rootIdx: noteToIdx[root], chordTypes, rows };
  }

  /** 七声调式：音级 → 按音级拼写的音名；不是七声时返回 null（沿用原来的拼写） */
  function modeSpellingMap(root, intervals) {
    const names = spellHeptatonic(root, intervals);
    if (!names) return null;
    return new Map(names.map((name) => [parsePitch(`${name}4`).pc, name]));
  }
  function respellNote(name, spellMap) {
    const pc = parsePitch(`${name}4`)?.pc;
    return pc !== undefined && spellMap.has(pc) ? spellMap.get(pc) : name;
  }

  function getDesiredChordQualityFromFuncName(funcName) {
    if (!funcName) return null;
    const letters = String(funcName).replace(/[^A-Za-z]/g, "");
    if (!letters) return null;
    const hasLower = /[a-z]/.test(letters);
    const hasUpper = /[A-Z]/.test(letters);
    if (hasLower && !hasUpper) return "min";
    if (hasUpper && !hasLower) return "maj";
    return null;
  }

  function buildDegreePreferredTypeMap(mode) {
    const degreePreferredType = {};
    const funcSeq = Array.isArray(mode.fullFuncSeq) ? mode.fullFuncSeq : [];
    
    funcSeq.forEach(fn => {
      const desiredQuality = getDesiredChordQualityFromFuncName(fn);
      const baseFunc = fn.replace(/\([^)]*\)/g, '').toLowerCase();
      const funcToDegreeMap = {
        't': 0, 'T': 0,
        'd': 4, 'D': 4,
        's': 3, 'S': 3,
        'dd': 1, 'DD': 1,
        'ss': 6,
        '3d': 2, '3D': 2,
        '4d': 5, '4D': 5,
        '5d': 1, '5D': 1,
        '6d': 3, '6D': 3,
      };
      const degIndex = funcToDegreeMap[baseFunc];
      if (degIndex !== undefined && desiredQuality) {
        degreePreferredType[degIndex] = desiredQuality;
      }
    });
    
    return degreePreferredType;
  }

  function applyFuncNameCase(funcName, desiredQuality) {
    if (!funcName || !desiredQuality) return funcName;
    return String(funcName).replace(/[A-Za-z]+/g, (match) =>
      desiredQuality === "maj" ? match.toUpperCase() : match.toLowerCase(),
    );
  }

  function buildTriadChordAtDegreeWithQuality(root, intervals, degIndex, desiredQuality, converter) {
    const triad = buildTriadChordAtDegree(root, intervals, degIndex, converter);
    if (!desiredQuality || (desiredQuality !== "maj" && desiredQuality !== "min")) {
      return triad;
    }

    const conv = converter || getMultiModeChordConverter();
    const rootIdx = conv.noteToIdx[root];
    const rootOff = intervals[degIndex];
    const rootNote = conv.idxToNote[(rootIdx + rootOff) % 12];
    const scaleSet = new Set(intervals.map((off) => (rootIdx + off) % 12));

    const qualityIntervals = desiredQuality === "maj" ? [4, 7] : [3, 7];
    const candidateNotes = qualityIntervals.map((interval) =>
      conv.idxToNote[(rootIdx + rootOff + interval) % 12],
    );
    const candidateIdxs = qualityIntervals.map((interval) =>
      (rootIdx + rootOff + interval) % 12,
    );

    const validCandidate = candidateIdxs.every((idx) => scaleSet.has(idx));
    if (validCandidate) {
      const notes = [rootNote, ...candidateNotes];
      return {
        dist: rootOff,
        degreeLabel: formatRomanDegreeLabel(degIndex, desiredQuality),
        chordLabel: formatChordName(rootNote, desiredQuality),
        notes: notes.join(", "),
        chordType: desiredQuality,
        notesArray: notes,
      };
    }

    return triad;
  }

  /** 按五度圈内圈功能名 → 扇区 → 调内和弦（与画布一致，如 T–S–D–T → C–F–G–C） */
function resolveFuncGroupChord(funcName, root, mode, scaleData, innerLabels) {
    // 1. 解析功能名，获取需要匹配的主功能
    let targetFunc = funcName;
    
    // 获取所有调内和弦的音级映射
    const degreeMap = {};
    scaleData.rows.forEach((row, idx) => {
        degreeMap[row.degreeLabel] = row;
        degreeMap[idx] = row;
        // 也按音级索引映射
        degreeMap[`deg${idx}`] = row;
    });
    
    // 标准功能到音级的映射（音级索引）
    const funcToDegreeIndex = {
        't': 0,   // i 级
        'T': 0,   // I 级
        'd': 4,   // v 级
        'D': 4,   // V 级
        's': 3,   // iv 级
        'S': 3,   // IV 级
        'dd': 1,  // ii 级
        'DD': 1,  // II 级
        'ss': 6,  // bVII 级 / VII 级
        '3D': 2,  // III 级
        '4D': 5,  // VI 级？根据五度圈位置调整
        '5D': 1,  // bII 级
        '6D': 3,  // bIII 级
    };
    
    // 获取原始功能名（去掉大小写和括号）
    let baseFunc = funcName.replace(/\([^)]*\)/g, '').toLowerCase();
    if (baseFunc === 't') baseFunc = 't';
    if (baseFunc === 'd') baseFunc = 'd';
    if (baseFunc === 's') baseFunc = 's';
    if (baseFunc === 'dd') baseFunc = 'dd';
    if (baseFunc === 'ss') baseFunc = 'ss';
    
    // 处理数字前缀功能如 "3D", "6D"
    const numberedMatch = baseFunc.match(/^(\d+)([A-Za-z]+)$/);
    let numberedPrefix = null;
    let numberedMain = null;
    if (numberedMatch) {
        numberedPrefix = parseInt(numberedMatch[1]);
        numberedMain = numberedMatch[2].toLowerCase();
        baseFunc = numberedMain;
    }
    
    // 获取该功能对应的音级索引
    let targetDegreeIndex = funcToDegreeIndex[baseFunc];
    if (targetDegreeIndex === undefined) {
        targetDegreeIndex = funcToDegreeIndex[baseFunc.toLowerCase()];
    }
    
    // 特殊处理：ss 功能对应 VII 级（索引 6）
    if (baseFunc === 'ss') {
        targetDegreeIndex = 6;
    }
    
    // 如果找到了音级索引，尝试获取调内该音级的和弦
    if (targetDegreeIndex !== undefined && scaleData.rows[targetDegreeIndex]) {
        const matchedRow = scaleData.rows[targetDegreeIndex];
        const desiredQuality = getDesiredChordQualityFromFuncName(funcName);
        const finalRow = (desiredQuality === 'maj' || desiredQuality === 'min')
            ? buildTriadChordAtDegreeWithQuality(root, scaleData.intervals, targetDegreeIndex, desiredQuality, getMultiModeChordConverter())
            : matchedRow;
        const isMinorChord = finalRow.chordType === 'min';

        // 确定最终的功能名（大小写根据和弦类型）
        let finalFuncName = funcName;
        if (baseFunc === 't' || baseFunc === 'T') {
            finalFuncName = isMinorChord ? 't' : 'T';
        } else if (baseFunc === 'd' || baseFunc === 'D') {
            finalFuncName = isMinorChord ? 'd' : 'D';
        } else if (baseFunc === 's' || baseFunc === 'S') {
            finalFuncName = isMinorChord ? 's' : 'S';
        } else if (baseFunc === 'dd' || baseFunc === 'DD') {
            finalFuncName = isMinorChord ? 'dd' : 'DD';
        } else {
            finalFuncName = funcName;
        }
        finalFuncName = applyFuncNameCase(finalFuncName, desiredQuality);
        
        // 如果是数字前缀功能，保留原格式、括号片段
        if (numberedPrefix !== null) {
            const base = finalFuncName.replace(/^\d+/, '');
            finalFuncName = `${numberedPrefix}${base}`;
            if (funcName.includes('(')) {
                const parenMatch = funcName.match(/\(([^)]+)\)/);
                if (parenMatch) {
                    finalFuncName += `(${parenMatch[1]})`;
                }
            }
        }
        
        return {
            funcName: finalFuncName,
            degreeLabel: finalRow.degreeLabel,
            chordLabel: finalRow.chordLabel,
            notes: finalRow.notes,
            dist: finalRow.dist,
            isOutOfScale: false
        };
    }
    
    // 如果找不到调内和弦，只返回功能名，不返回和弦信息
    // 这是调外功能的情况（如 C 旋律小调中的 ss 对应 Bb）
    return {
        funcName: funcName,
        degreeLabel: "—",
        chordLabel: "—",
        notes: "—",
        isOutOfScale: true  // 标记为调外
    };
}

  function parseMultiModeNotes(notesStr) {
    if (!notesStr || notesStr === "—") return [];
    return String(notesStr)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function getModeScaleNoteNames(root, intervals) {
    const conv = getMultiModeChordConverter();
    const rootIdx = conv.noteToIdx[root];
    if (rootIdx === undefined) return [];
    return spellHeptatonic(root, intervals) || intervals.map((off) => conv.idxToNote[(rootIdx + off) % 12]);
  }

  function buildScalePitchListHtml(root, intervals) {
    const rootIdx = noteToIdx[root];
    const spelled = spellHeptatonic(root, intervals);
    return intervals
      .map((off, i) => {
        const note = spelled ? spelled[i] : live.idxToNote[(rootIdx + off) % 12];
        return `<span class="scale-pitch-chip" data-multi-play="scale-note" data-note="${escapeMultiModeHtml(note)}" title="点击播放 ${escapeMultiModeHtml(note)} · includeNoteIdx[${i}]=${off}">
        <span class="scale-pitch-idx">${i + 1}</span>
        <span class="scale-pitch-note">${escapeMultiModeHtml(note)}</span>
        <span class="scale-pitch-off">+${off}</span>
      </span>`;
      })
      .join("");
  }

function renderMultiModeTable(root, mode) {
    const tableContainer = document.getElementById("circle-table-container");
    if (!tableContainer) return;

    let intervals = mode.includeNoteIdx || [];

    const scalePitchHtml = buildScalePitchListHtml(root, intervals);
    const scaleData = buildModeScaleChordData(root, mode);
    const innerLabels = buildInnerFuncRingLabels(root, mode);
    const replaceGroup = mode.funcReplaceGroup || null;
    const temp = mode.spaceTemp ?? 0;
    const tempHue = 210 + ((Math.max(-8, Math.min(8, temp)) + 8) / 16) * (12 - 210);

    // 构建功能序列 - 只使用调内和弦
    const funcSeq = Array.isArray(mode.fullFuncSeq) ? mode.fullFuncSeq : [];

const funcSteps = funcSeq.map((fn) => {
    const chord = resolveFuncGroupChord(fn, root, mode, scaleData, innerLabels);
    return {
        ...chord,
        isReplace: replaceGroup && fn === replaceGroup,
    };
    // 不再过滤调外的，保留它们以显示功能标签
});

// 修改 seqFlowHtml 的渲染，区分调内调外
const seqFlowHtml = funcSteps.length
    ? funcSteps
          .map((step, i) => {
              // 调外和弦的样式不同
              const isOutClass = step.isOutOfScale ? " func-out-of-scale" : "";
              const node = `
          <div class="func-seq-node${step.isReplace ? " is-func-replace" : ""}${isOutClass}" data-multi-play="func-node" data-func-index="${i}" role="button" tabindex="0" title="${window.__("circle_multi_play_func_seq") || "播放序列"} ${escapeMultiModeHtml(step.chordLabel !== "—" ? step.chordLabel : step.funcName)}">
            <div class="func-seq-func">${escapeMultiModeHtml(step.funcName)}</div>
            <div class="func-seq-degree">${escapeMultiModeHtml(step.degreeLabel)}</div>
            <div class="func-seq-chord">${step.chordLabel !== "—" ? escapeMultiModeHtml(step.chordLabel) : '<span class="out-of-scale">(调外)</span>'} ${step.chordLabel !== "—" ? `<span class="multi-mode-play-hint" aria-hidden="true">${iconSvg("speaker")}</span>` : ''}</div>
            <div class="func-seq-notes">${escapeMultiModeHtml(step.notes)}</div>
          </div>`;
              const arrow =
                  i < funcSteps.length - 1
                      ? '<div class="func-seq-arrow" aria-hidden="true">→</div>'
                      : funcSteps.length > 1
                        ? `<div class="func-seq-arrow func-seq-arrow-return" aria-hidden="true" title="${window.__("circle_multi_back_to_start") || "回到起点"}">↺</div>`
                        : "";
              return node + arrow;
          })
          .join("")
    : `<p class="multi-mode-empty">${window.__("circle_multi_empty_seq") || "暂无功能序列"}</p>`;

    const scaleRowsHtml = scaleData.rows
      .map(
        (row, idx) => `
      <tr class="multi-mode-degree-row" data-multi-play="degree" data-degree-index="${idx}" role="button" tabindex="0" title="${window.__("circle_multi_play_scale") || "播放音阶"} ${escapeMultiModeHtml(row.chordLabel)}">
        <td class="col-degree"><span class="roman-badge">${escapeMultiModeHtml(row.degreeLabel)}</span></td>
        <td class="col-chord"><strong>${escapeMultiModeHtml(row.chordLabel)}</strong> <span class="multi-mode-play-hint" aria-hidden="true">${iconSvg("speaker")}</span></td>
        <td class="col-notes">${escapeMultiModeHtml(row.notes)}</td>
      </tr>`,
      )
      .join("");

    const antiTag = mode.isAntiFunc
      ? `<span class="meta-chip meta-anti">${window.__("circle_multi_anti") || "反功能"}</span>`
      : "";

    tableContainer.innerHTML = `
    <div class="multi-mode-display">
      <header class="multi-mode-header">
        <div class="multi-mode-title-row">
          <span class="root-badge">${escapeMultiModeHtml(root)}</span>
          <h3 class="multi-mode-title">${escapeMultiModeHtml(mode.modeName || window.__("circle_multi_mode_label") || "调式")}</h3>
        </div>
        <div class="multi-mode-meta">
          <span class="meta-chip">${window.__("circle_multi_sort_tension")?.replace("{val}", escapeMultiModeHtml(mode.tensionLevel)) || `张力 ${escapeMultiModeHtml(mode.tensionLevel)}`}</span>
          <span class="meta-chip meta-temp" style="--temp-hue:${tempHue}">${window.__("circle_multi_sort_temp")?.replace("{val}", escapeMultiModeHtml(mode.spaceTemp)) || `温度 ${escapeMultiModeHtml(mode.spaceTemp)}`}</span>
          ${mode.funcReplaceGroup ? `<span class="meta-chip meta-replace">${window.__("circle_multi_replace") || "功能替代"} ${escapeMultiModeHtml(mode.funcReplaceGroup)}</span>` : ""}
          ${antiTag}
        </div>
      </header>

      <section class="multi-mode-section scale-pitch-section">
        <div class="multi-mode-section-head">
          <h4 class="section-label">${window.__("circle_multi_mode_label") || "调式音阶"}</h4>
          <button type="button" class="multi-mode-play-btn" data-multi-play="scale" title="${window.__("circle_multi_play_scale") || "顺序播放调式音阶"}">${iconSvg("speaker")} ${window.__("circle_multi_play_scale") || "播放音阶"}</button>
        </div>
        <div class="scale-pitch-list">${scalePitchHtml}</div>
      </section>

      <section class="multi-mode-section full-func-seq-section">
        <div class="multi-mode-section-head">
          <h4 class="section-label">${window.__("circle_multi_play_func_seq") || "完全功能序列"}</h4>
          <button type="button" class="multi-mode-play-btn" data-multi-play="func-seq" title="${window.__("circle_multi_play_func_seq") || "按序列播放各功能和弦"}" ${funcSteps.length ? "" : "disabled"}>${iconSvg("speaker")} ${window.__("circle_multi_play_func_seq") || "播放序列"}</button>
        </div>
        <p class="section-hint">${window.__("circle_multi_func_seq_hint") || "功能名按五度圈内圈定位 · 点击节点可单独播放 · T–S–D–T → I–IV–V–I"}</p>
        <div class="full-func-seq-flow">${seqFlowHtml}</div>
      </section>

      <section class="multi-mode-section scale-table-section">
        <div class="multi-mode-section-head">
          <h4 class="section-label">${window.__("circle_multi_mode_label") || "调内音级"}</h4>
          <span class="section-hint-inline">${window.__("circle_multi_table_hint") || "点击行播放和弦"}</span>
        </div>
        <div class="multi-mode-table-wrap">
          <table class="multi-mode-degree-table degree-table">
            <thead>
              <tr><th>${window.__("circle_col_degree") || "音级"}</th><th>${window.__("circle_col_chord") || "和弦"}</th><th>${window.__("circle_col_notes") || "音符"}</th></tr>
            </thead>
            <tbody>${scaleRowsHtml}</tbody>
          </table>
        </div>
      </section>

      <footer class="multi-mode-footer">
        <!-- ref:color-harmony-studio -->
        <small>${window.__("ack_color_harmony_studio") || "特别感谢色彩和声工作室提供的特性进行数据"}</small>
      </footer>
    </div>`;

    const display = tableContainer.querySelector(".multi-mode-display");
    if (display && window.jazzCompassAudio) {
      window.jazzCompassAudio.wireDisplay(display, {
        scaleNoteNames: getModeScaleNoteNames(root, intervals),
        degreeRows: scaleData.rows,
        funcSteps,
      });
    }
  }

  // 初始化多调性控制面板
  function initMultiModeCircle() {
    const toggleBtn = document.getElementById("circle-multi-toggle");
    const panel = document.getElementById("circle-multi-panel");
    const modeList = document.getElementById("circle-mode-list");
    const modeDropdown = document.getElementById("circle-mode-dropdown");
    const modeSearch = document.getElementById("circle-mode-search");
    const modeToggleBtn = document.getElementById("circle-mode-toggle");
    const applyBtn = document.getElementById("circle-apply-mode");
    const filterNormal = document.getElementById("filter-normal-only");
    const filterNatural = document.getElementById("filter-natural-only");
    const sortType = document.getElementById("circle-sort-type");
    const sortOrder = document.getElementById("circle-sort-order");

    if (!toggleBtn || !modeToggleBtn) return;

    // 颜色映射：空间温度 -> 色相（冷蓝到暖红），空间张力 -> 叠加变暗
    // 色条：空间温度 -> 色相（冷蓝到暖红），空间张力 -> 明度（越紧张越暗）
    function modeColor(temp, tension) {
      const t = Math.max(-8, Math.min(8, temp));
      const hue = 210 + ((t + 8) / 16) * (12 - 210);
      const tense = (Math.max(1, Math.min(10, tension)) - 1) / 9;
      return `hsl(${hue.toFixed(0)} 62% ${(64 - tense * 36).toFixed(0)}%)`;
    }

    let selectedModeIdx = null;

    function clearSelectionVisual() {
      Array.from(modeList.children).forEach(child => child.classList.remove("is-selected"));
    }

    function updateModeToggleLabel() {
      if (currentMultiMode && currentMultiMode.modeName) {
        modeToggleBtn.textContent = `${window.__("circle_multi_mode_chip") || "调式"}: ${currentMultiMode.modeName}`;
      } else {
        modeToggleBtn.textContent = window.__("circle_multi_expand") || '展开调式';
      }
    }

    // 刷新模式卡片列表（以卡片替代 select）
    function refreshModeList() {
      if (!live.modesData) return;
      let filtered = [...live.modesData];
      if (filterNormal.checked) filtered = filtered.filter(m => m.isNormalMode === true);
      if (filterNatural.checked) filtered = filtered.filter(m => m.isNaturalScale === true);

      const keyword = modeSearch?.value.trim().toLowerCase();
      if (keyword) {
        filtered = filtered.filter(m => (m.modeName || '').toLowerCase().includes(keyword));
      }

      const sortKey = sortType.value === "tension" ? "tensionLevel" : "spaceTemp";
      const order = sortOrder.value === "asc" ? 1 : -1;
      filtered.sort((a, b) => order * (a[sortKey] - b[sortKey]));

      modeList.innerHTML = "";
      if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'mode-list-empty';
        empty.textContent = window.__("circle_multi_no_match") || '没有匹配的调式';
        modeList.appendChild(empty);
        return;
      }

      filtered.forEach(m => {
        const card = document.createElement('div');
        card.className = 'mode-card';
        card.dataset.idx = m.idx;
        card.style.setProperty('--mode-color', modeColor(m.spaceTemp, m.tensionLevel));

        const title = document.createElement('div');
        title.className = 'mode-card-title';
        title.textContent = m.modeName || (`mode ${m.idx}`);

        const meta = document.createElement('div');
        meta.className = 'mode-card-meta';
        meta.textContent = `${window.__("circle_multi_sort_tension")?.replace("{val}", m.tensionLevel) || `张力:${m.tensionLevel}`} ${window.__("circle_multi_sort_temp")?.replace("{val}", m.spaceTemp) || `温度:${m.spaceTemp}`}`;

        card.appendChild(title);
        card.appendChild(meta);

        if (selectedModeIdx === m.idx) {
          card.classList.add('is-selected');
        }

        card.addEventListener('click', () => {
          selectedModeIdx = m.idx;
          clearSelectionVisual();
          card.classList.add('is-selected');
          currentMultiMode = m;
          currentRoot = null;
          updateModeToggleLabel();
          updateCircleMultiMode();
        });

        modeList.appendChild(card);
      });
    }

    // helper: 在 checkbox 状态变化时为包裹的 label 添加/移除活动类
    function setFilterLabelState(checkbox) {
      if (!checkbox) return;
      const lbl = checkbox.closest('label') || document.querySelector(`label[for="${checkbox.id}"]`);
      if (!lbl) return;
      if (checkbox.checked) lbl.classList.add('is-active');
      else lbl.classList.remove('is-active');
    }

    // 初始化状态并绑定事件，使 UI 有视觉反馈
    setFilterLabelState(filterNormal);
    setFilterLabelState(filterNatural);
    filterNormal.addEventListener('change', (e) => { setFilterLabelState(e.target); refreshModeList(); });
    filterNatural.addEventListener('change', (e) => { setFilterLabelState(e.target); refreshModeList(); });
    sortType.addEventListener('change', refreshModeList);
    sortOrder.addEventListener('change', refreshModeList);
    modeSearch.addEventListener('input', refreshModeList);

    modeToggleBtn.addEventListener('click', () => {
      if (!modeDropdown) return;
      const isOpen = modeDropdown.style.display === 'flex';
      modeDropdown.style.display = isOpen ? 'none' : 'flex';
      modeToggleBtn.textContent = isOpen
        ? (currentMultiMode?.modeName ? `${window.__("circle_multi_mode_chip") || "调式"}: ${currentMultiMode.modeName}` : window.__("circle_multi_expand") || '展开调式')
        : window.__("circle_multi_collapse") || '收起调式';
      if (!isOpen) {
        refreshModeList();
      }
    });

    toggleBtn.addEventListener('click', () => {
      multiModeActive = !multiModeActive;
      panel.style.display = multiModeActive ? 'flex' : 'none';
      if (multiModeActive) {
        currentRoot = null;
        refreshModeList();
      } else {
        currentRoot = null;
        circleCurrentKey = null;
        drawCircle(null, null);
        const tableContainer = document.getElementById('circle-table-container');
        tableContainer.innerHTML = '';
      }
      toggleBtn.textContent = window.__("circle_multi_mode") || '多调性模式';
      toggleBtn.classList.toggle('active', multiModeActive);
      toggleBtn.setAttribute('aria-pressed', String(multiModeActive));
    });

    applyBtn.addEventListener('click', () => {
      if (!multiModeActive) return;
      if (!currentMultiMode) return;
      updateCircleMultiMode();
    });

    // 搜索框 placeholder 本地化
    if (modeSearch) {
      modeSearch.placeholder = window.__("circle_multi_search_placeholder") || "搜索调式";
    }

    // 筛选文字和排序选项由 markup 的 data-i18n 统一本地化。

    // 排序顺序 label 本地化
    if (sortOrder) {
      for (const opt of sortOrder.options) {
        if (opt.value === "asc") opt.textContent = window.__("sort_asc") || "升序";
        if (opt.value === "desc") opt.textContent = window.__("sort_desc") || "降序";
      }
    }

    // 初始隐藏面板与下拉列表
    panel.style.display = 'none';
    if (modeDropdown) modeDropdown.style.display = 'none';
  }


  function drawArcSegment(
    ctx,
    cx,
    cy,
    innerR,
    outerR,
    startAngle,
    endAngle,
    label,
    sharps,
    flats,
    isHighlighted,
    type,
    axisGroup,
  ) {
    const midAngle = (startAngle + endAngle) / 2;
    const midR = (innerR + outerR) / 2;

    // 填充
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, endAngle);
    ctx.arc(cx, cy, innerR, endAngle, startAngle, true);
    ctx.closePath();

    const palette = canvasPalette();
    const axisColor =
      axisGroup && axisColorMap[axisGroup]
        ? axisColorMap[axisGroup][type]
        : type === "major" ? palette.fill : palette.fillSoft;
    const highlightColor =
      axisGroup && axisColorMap[axisGroup]
        ? axisColorMap[axisGroup].highlight
        : palette.fill;
    if (isHighlighted) {
      const grad = ctx.createLinearGradient(
        cx + Math.cos(midAngle) * innerR,
        cy + Math.sin(midAngle) * innerR,
        cx + Math.cos(midAngle) * outerR,
        cy + Math.sin(midAngle) * outerR,
      );
      grad.addColorStop(0, highlightColor);
      grad.addColorStop(1, palette.fill);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = axisColor;
    }
    ctx.fill();

    // 边框
    ctx.strokeStyle = isHighlighted
      ? type === "major" ? palette.accent : palette.brass
      : palette.line;
    ctx.lineWidth = isHighlighted ? 2 : 1;
    ctx.stroke();

    // 标签
    const textX = cx + Math.cos(midAngle) * midR;
    const textY = cy + Math.sin(midAngle) * midR;

    ctx.fillStyle = isHighlighted ? palette.text : palette.textSoft;
    ctx.font = isHighlighted ? `700 14px ${palette.display}` : `600 12.5px ${palette.display}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, textX, textY);

    // 升号/降号数量小标
    if (sharps > 0 || flats > 0) {
      const subLabel = sharps > 0 ? `${sharps}♯` : `${flats}♭`;
      ctx.fillStyle = palette.textDim;
      ctx.font = `9px ${palette.font}`;
      ctx.fillText(subLabel, textX, textY + (type === "major" ? 14 : -14));
    }
  }
  function createModeButton(label, isActive, onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `panel-action${isActive ? " active" : ""}`;
    btn.setAttribute("aria-pressed", String(isActive));
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
  }

  // 生成调性对照表
  function appendMelodicDirections(section, quality, majorKey, minorKey) {
    const row = document.createElement('div');
    row.className = 'key-mode-row';
    for (const direction of ['ascending', 'descending']) {
      const active = quality === 'major' ? majorDirection : minorDirection;
      const btn = createModeButton(window.__(`circle_${direction}`), active === direction, () => {
        if (quality === 'major') majorDirection = direction; else minorDirection = direction;
        renderKeyTable(majorKey, minorKey, circleCurrentKey?.primary || 'major');
      });
      btn.dataset.scaleQuality = quality;
      btn.dataset.scaleDirection = direction;
      row.appendChild(btn);
    }
    const note = document.createElement('p');
    note.className = 'learn-muted';
    note.textContent = window.__(`circle_melodic_${quality}_note`);
    section.append(row, note);
  }

  function renderKeyTable(majorKey, minorKey, primarySection = "major") {
    tableContainer.innerHTML = "";

    // --- 大调切换按钮 ---
    const majorToggleRow = document.createElement("div");
    majorToggleRow.className = "key-mode-row";

    const naturalMajorLabel =
      window.__("circle_major_natural") || "Natural Major";
    const harmonicMajorLabel =
      window.__("circle_major_harmonic") || "Harmonic Major";

    const btnMajorNatural = createModeButton(
      `${naturalMajorLabel} (${majorKey})`,
      majorMode === "natural",
      () => {
        majorMode = "natural";
        renderKeyTable(majorKey, minorKey, circleCurrentKey?.primary || "major");
      },
    );
    const btnMajorHarmonic = createModeButton(
      `${harmonicMajorLabel} (${majorKey})`,
      majorMode === "harmonic",
      () => {
        majorMode = "harmonic";
        renderKeyTable(majorKey, minorKey, circleCurrentKey?.primary || "major");
      },
    );
    majorToggleRow.appendChild(btnMajorNatural);
    majorToggleRow.appendChild(btnMajorHarmonic);
    majorToggleRow.appendChild(createModeButton(`${window.__("circle_major_melodic")} (${majorKey})`, majorMode === 'melodic', () => {
      majorMode = 'melodic';
      renderKeyTable(majorKey, minorKey, circleCurrentKey?.primary || 'major');
    }));

    // --- 大调表 ---
    const majorSec = document.createElement("div");
    majorSec.className = "key-table-section";

    const melodicMajor = melodicCircleScale('major', majorDirection);
    const intervals = majorMode === 'melodic' ? melodicMajor.intervals :
      majorMode === "harmonic" ? harmonicMajorIntervals : majorScaleIntervals;
    const degreeNums = majorMode === 'melodic' ? melodicMajor.degreeNums :
      majorMode === "harmonic" ? harmonicMajorDegreeNums : majorDegreeNums;
    const funcs =
      majorMode === "harmonic"
        ? buildHarmonicMajorFuncs()
        : buildMajorFuncs();
    if (majorMode === 'melodic' && majorDirection === 'descending') funcs[6] = getFuncNames().subtonic;
    const modeLabel = majorMode === 'melodic' ? window.__("circle_major_melodic") :
      majorMode === "harmonic"
        ? window.__("circle_major_harmonic") || "Harmonic Major"
        : window.__("circle_major_natural") || "Natural Major";

    const majorNotes = getScaleNotes(majorKey, intervals);

    const majorTitle = document.createElement("h4");
    majorTitle.className = "key-table-title";
    majorTitle.textContent = `${majorKey} ${modeLabel}`;
    majorSec.appendChild(majorTitle);
    if (majorMode === 'melodic') appendMelodicDirections(majorSec, 'major', majorKey, minorKey);
    majorSec.appendChild(
      buildDegreeTable(majorNotes, degreeNums, funcs, majorKey),
    );

    // --- 分隔线 ---
    const divider = document.createElement("hr");
    divider.className = "key-table-divider";

    // --- 小调切换按钮 ---
    const minorToggleRow = document.createElement("div");
    minorToggleRow.className = "key-mode-row";
    const naturalMinorLabel =
      window.__("circle_minor_natural") || "Natural Minor";
    const harmonicMinorLabel =
      window.__("circle_minor_harmonic") || "Harmonic Minor";

    const btnMinorNatural = createModeButton(
      `${naturalMinorLabel} (${minorKey})`,
      minorMode === "natural",
      () => {
        minorMode = "natural";
        renderKeyTable(majorKey, minorKey, circleCurrentKey?.primary || "major");
      },
    );
    const btnMinorHarmonic = createModeButton(
      `${harmonicMinorLabel} (${minorKey})`,
      minorMode === "harmonic",
      () => {
        minorMode = "harmonic";
        renderKeyTable(majorKey, minorKey, circleCurrentKey?.primary || "major");
      },
    );
    minorToggleRow.appendChild(btnMinorNatural);
    minorToggleRow.appendChild(btnMinorHarmonic);
    minorToggleRow.appendChild(createModeButton(`${window.__("circle_minor_melodic")} (${minorKey})`, minorMode === 'melodic', () => {
      minorMode = 'melodic';
      renderKeyTable(majorKey, minorKey, circleCurrentKey?.primary || 'major');
    }));

    // --- 小调表 ---
    const minorSec = document.createElement("div");
    minorSec.className = "key-table-section";

    const melodicMinor = melodicCircleScale('minor', minorDirection);
    const mIntervals = minorMode === 'melodic' ? melodicMinor.intervals :
      minorMode === "harmonic" ? harmonicMinorIntervals : minorScaleIntervals;
    const mDegreeNums = minorMode === 'melodic' ? melodicMinor.degreeNums :
      minorMode === "harmonic" ? harmonicMinorDegreeNums : minorDegreeNums;
    const mFuncs =
      minorMode === "harmonic"
        ? buildHarmonicMinorFuncs()
        : buildMinorFuncs();
    if (minorMode === 'melodic' && minorDirection === 'ascending') mFuncs[6] = getFuncNames().leading;
    const mModeLabel = minorMode === 'melodic' ? window.__("circle_minor_melodic") :
      minorMode === "harmonic"
        ? window.__("circle_minor_harmonic") || "Harmonic Minor"
        : window.__("circle_minor_natural") || "Natural Minor";

    const minorNotes = getScaleNotes(minorKey, mIntervals);

    const minorTitle = document.createElement("h4");
    minorTitle.className = "key-table-title";
    minorTitle.textContent = `${minorKey} ${mModeLabel}`;
    minorSec.appendChild(minorTitle);
    if (minorMode === 'melodic') appendMelodicDirections(minorSec, 'minor', majorKey, minorKey);
    minorSec.appendChild(
      buildDegreeTable(
        minorNotes,
        mDegreeNums,
        mFuncs,
        minorKey,
      ),
    );

    if (primarySection === "major") {
      tableContainer.appendChild(majorToggleRow);
      tableContainer.appendChild(majorSec);
      tableContainer.appendChild(divider);
      tableContainer.appendChild(minorToggleRow);
      tableContainer.appendChild(minorSec);
    } else {
      tableContainer.appendChild(minorToggleRow);
      tableContainer.appendChild(minorSec);
      tableContainer.appendChild(divider);
      tableContainer.appendChild(majorToggleRow);
      tableContainer.appendChild(majorSec);
    }
  }

  function buildDegreeTable(notes, degreeNums, funcs, keyRoot) {
    const stateKey = `${keyRoot}|${notes.join(',')}`;
    if (!degreeTableStates.has(stateKey)) degreeTableStates.set(stateKey, { seventh: false, steps: Array(8).fill(0) });
    const state = degreeTableStates.get(stateKey);
    const panel = document.createElement('div');
    panel.className = 'circle-degree-panel';
    const tools = document.createElement('div');
    tools.className = 'circle-chord-tools';
    const label = document.createElement('label');
    label.className = 'circle-seventh-option';
    const seventh = document.createElement('input');
    seventh.type = 'checkbox';
    seventh.checked = state.seventh;
    label.append(seventh, document.createTextNode(window.__('circle_add_seventh')));
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'panel-action';
    reset.textContent = window.__('circle_restore_triads');
    tools.append(label, reset);
    const wrap = document.createElement("div");
    wrap.className = "degree-table-wrap";
    const table = document.createElement("table");
    table.className = "degree-table clickable";

    // 表头
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    [
      window.__("circle_col_degree") || "Degree",
      window.__("circle_col_chord") || "Chord",
      window.__("circle_col_function") || "Function",
      window.__("circle_col_notes") || "Notes",
    ].forEach((h) => {
      const th = document.createElement("th");
      th.textContent = h;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 表体：主 / 下属 / 属 / 导音级用功能色标出
    const tbody = document.createElement("tbody");
    const degreeClasses = ["deg-tonic", "", "", "deg-sub", "deg-dom", "", "deg-lead"];
    const updateRows = [];
    // VII 之后再列高八度 I，各行转位独立保存。
    for (let i = 0; i < 8; i += 1) {
      const row = document.createElement("tr");
      row.dataset.degree = i;
      const degStr = degreeNums[i % 7] || "";
      const isAug = degStr.includes("+");
      const rowClass = isAug ? "deg-aug" : degreeClasses[i % 7];
      if (rowClass) row.className = rowClass;
      row.tabIndex = 0;

      const degCell = document.createElement("td");
      degCell.className = "deg-cell";
      const degreeLine = document.createElement('div');
      degreeLine.className = 'circle-degree-line';
      const roman = document.createElement('span');
      roman.className = 'circle-roman';
      const controls = document.createElement('span');
      controls.className = 'circle-invert-controls';
      const down = document.createElement('button');
      const up = document.createElement('button');
      const context = degStr + (i === 7 ? ` (${window.__('circle_upper_tonic')})` : '');
      [[down, '−', 'down'], [up, '+', 'up']].forEach(([b, text, direction]) => {
        b.type = 'button';
        b.className = `circle-invert-${direction}`;
        b.textContent = text;
        b.setAttribute('aria-label', `${context} · ${window.__(`circle_invert_${direction}`)}`);
        b.title = window.__(`circle_invert_${direction}`);
        b.addEventListener('click', (event) => {
          event.stopPropagation();
          state.steps[i] += direction === 'up' ? 1 : -1;
          update();
        });
        b.addEventListener('keydown', event => event.stopPropagation());
      });
      controls.append(down, up);
      degreeLine.append(roman, controls);
      degCell.appendChild(degreeLine);
      const register = document.createElement('small');
      register.className = 'circle-register-label';
      degCell.appendChild(register);
      if (i === 7) {
        const octave = document.createElement('small');
        octave.className = 'circle-octave-label';
        octave.textContent = window.__('circle_upper_tonic');
        degCell.appendChild(octave);
      }
      row.appendChild(degCell);

      const chordCell = document.createElement("td");
      chordCell.className = "chord-cell";
      row.appendChild(chordCell);

      const funcCell = document.createElement("td");
      funcCell.className = "fn-cell";
      funcCell.textContent = funcs[i % 7] || "";
      row.appendChild(funcCell);

      const notesCell = document.createElement("td");
      notesCell.className = "notes-cell";

      row.appendChild(notesCell);

      const audioIndicator = document.createElement("span");
      audioIndicator.className = "audio-hint";
      audioIndicator.setAttribute("aria-hidden", "true");
      audioIndicator.innerHTML = iconSvg("speaker");
      let chord;
      const chordAt = steps => circleDegreeChord(notes, i, degStr, { seventh: state.seventh, steps });
      const inRange = value => value.tones[0].midi >= 36 && value.tones.at(-1).midi <= 108;
      function update() {
        chord = chordAt(state.steps[i]);
        register.textContent = chord.octaves === 0 ? window.__('circle_default_octave') :
          `${chord.octaves > 0 ? '↑' : '↓'} ${Math.abs(chord.octaves)} ${window.__('circle_octave_unit')}`;
        roman.replaceChildren(document.createTextNode(chord.numeral));
        roman.setAttribute('aria-label', chord.roman);
        if (chord.figure) {
          const figure = document.createElement('span');
          figure.className = `circle-figure${chord.figure.includes('/') ? '' : ' is-single'}`;
          chord.figure.split('/').forEach(number => {
            const digit = document.createElement('span');
            digit.textContent = number;
            figure.appendChild(digit);
          });
          roman.appendChild(figure);
        }
        chordCell.replaceChildren(document.createTextNode(chord.name), audioIndicator);
        notesCell.replaceChildren();
        chord.tones.forEach(tone => {
          const span = document.createElement('span');
          span.className = 'mini-note';
          span.textContent = tone.pitch;
          notesCell.appendChild(span);
        });
        down.disabled = !inRange(chordAt(state.steps[i] - 1));
        up.disabled = !inRange(chordAt(state.steps[i] + 1));
      }
      updateRows.push(update);
      update();
      row.addEventListener("click", () => playChord(chord.frequencies));
      row.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        playChord(chord.frequencies);
      });

      tbody.appendChild(row);
    }
    table.appendChild(tbody);
    wrap.appendChild(table);

    seventh.addEventListener('change', () => {
      state.steps = state.steps.map(step => resizeCircleVoicing(step, state.seventh, seventh.checked));
      state.seventh = seventh.checked;
      updateRows.forEach(update => update());
    });
    reset.addEventListener('click', () => {
      state.seventh = false;
      state.steps.fill(0);
      seventh.checked = false;
      updateRows.forEach(update => update());
    });
    panel.append(tools, wrap);
    return panel;
  }

  // Canvas 点击事件
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const size = rect.width;
    const scaleX = size / rect.width;
    const scaleY = size / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const cx = size / 2;
    const cy = size / 2;
    const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    const outerR = size * 0.42;
    const innerR = size * 0.28;
    const centerR = size * 0.12;

    if (dist < centerR || dist > outerR) return;

    let angle = Math.atan2(y - cy, x - cx) + Math.PI / 2;
    if (angle < 0) angle += Math.PI * 2;
    const sectorIndex = Math.floor((angle / (Math.PI * 2)) * 12) % 12;
    const item = circleData[sectorIndex];

    if (multiModeActive && currentMultiMode) {
      if (dist >= innerR && dist <= outerR) {
        currentRoot = item.major;
      } else if (dist >= centerR && dist < innerR) {
        currentRoot = item.minor;
      }
      updateCircleMultiMode();
      return;
    }

    if (dist >= innerR && dist <= outerR) {
      // 点击外环 — 大调
      circleCurrentKey = {
        major: item.major,
        minor: item.minor,
        primary: "major",
      };
      drawCircle(item.major, null);
      renderKeyTable(item.major, item.minor, "major");
    } else if (dist >= centerR && dist < innerR) {
      // 点击内环 — 小调
      circleCurrentKey = {
        major: item.major,
        minor: item.minor,
        primary: "minor",
      };
      drawCircle(null, item.minor);
      renderKeyTable(item.major, item.minor, "minor");
    }
  });

  // 重置按钮
  resetBtn.addEventListener("click", () => {
    circleCurrentKey = null;
    drawCircle(null, null);
    tableContainer.innerHTML = "";
  });

  // 窗口大小变化重绘
  window.addEventListener("resize", () => {
    if (document.getElementById("panel-circle").style.display !== "none") {
      if (multiModeActive && currentMultiMode) {
        updateCircleMultiMode();
      } else if (circleCurrentKey) {
        drawCircle(
          circleCurrentKey.primary === "major"
            ? circleCurrentKey.major
            : null,
          circleCurrentKey.primary === "minor"
            ? circleCurrentKey.minor
            : null,
        );
        renderKeyTable(
          circleCurrentKey.major,
          circleCurrentKey.minor,
          circleCurrentKey.primary,
        );
      } else {
        drawCircle(null, null);
      }
    }
  });

  // 初始绘制
  drawCircle(null, null);

  // ==================== 五度圈面板 ====================

  // 功能名称 — 通过 i18n 动态获取
  function getFuncNames() {
    return {
      tonic: window.__("circle_func_tonic") || "Tonic",
      supertonic: window.__("circle_func_supertonic") || "Supertonic",
      mediant: window.__("circle_func_mediant") || "Mediant",
      subdom: window.__("circle_func_subdominant") || "Subdominant",
      dominant: window.__("circle_func_dominant") || "Dominant",
      submed: window.__("circle_func_submediant") || "Submediant",
      leading: window.__("circle_func_leading") || "Leading Tone",
      subtonic: window.__("circle_func_subtonic") || "Subtonic",
    };
  }

  function buildMajorFuncs() {
    const f = getFuncNames();
    return [
      f.tonic,
      f.supertonic,
      f.mediant,
      f.subdom,
      f.dominant,
      f.submed,
      f.leading,
    ];
  }

  function buildMinorFuncs() {
    const f = getFuncNames();
    return [
      f.tonic,
      f.supertonic,
      f.mediant,
      f.subdom,
      f.dominant,
      f.submed,
      f.subtonic,
    ];
  }

  function buildHarmonicMajorFuncs() {
    const f = getFuncNames();
    return [
      f.tonic,
      f.supertonic,
      f.mediant,
      f.subdom,
      f.dominant,
      f.submed,
      f.leading,
    ];
  }

  function buildHarmonicMinorFuncs() {
    const f = getFuncNames();
    return [
      f.tonic,
      f.supertonic,
      f.mediant,
      f.subdom,
      f.dominant,
      f.submed,
      f.leading,
    ];
  }

  return {
    drawCircle,
    initMultiModeCircle,
    parseMultiModeNotes,
    multiModeConverter: () => _multiModeChordConverter,
    /** 按当前选中的调重画（切换主题、记法时用） */
    redraw: () => drawCircle(circleCurrentKey?.primary === "major" ? circleCurrentKey.major : null, circleCurrentKey?.primary === "minor" ? circleCurrentKey.minor : null),
  };
}

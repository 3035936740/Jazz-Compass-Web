// 新里曼面板（从 script.js 拆出）：树状图 / 音网图 / 八音塔 / 和弦连接网 / 五线谱，以及两个和弦之间的最短变换路径
// 变换的定义与出处见 neo_views.js、harmony_connections.js；画布见 neo_canvas.js
import { mountNeoCanvas } from "./neo_canvas.js?v=20261001-ui";
import { mountHarmonyWheel } from "./harmony_connections_ui.js?v=20260915-2";
import { renderTonnetz, renderTower, renderChordStaff, neoViewText } from "./neo_views.js?v=20261004-m5";
import { harmonyNeighborhood, mergeConnectionGraphs } from "./harmony_connections.js?v=20260915-2";

/**
 * 绑定新里曼面板的"运行"和"找路径"按钮
 * @param {{ brain: object }} deps jazz_compass.js 的 JazzBrain（和弦解析、PLR 图）
 * @returns {{ updateNeo(target, input), updateNeoPath(target, from, to, maxSteps) }}
 */
export function initNeoPanel({ brain }) {
  let neoCanvasCleanup = null;
  let neoCurrentView = 'tonnetz';
  // 三和弦视图：树状图 / 音网图（PLR）/ 音网图（S、N、H）；七和弦视图：树状图 / 八音塔
  let neoTonnetzMode = 'plr';
  let neoTowerMode = 'tower';
  let neoCurrentDepth = 1;
  let neoCurrentInput = "";
  let neoLayerSpacing = 100;      // 层间垂直间距
  let neoNodeSize = 22;           // 节点半径
  let neoCanvasState = { offsetX: 0, offsetY: 0, scale: 1 };
  let neoNodeOffsets = {};        // 手动偏移 { nodeId: {x, y} }
  let neoHarmonyViewState = { zoom: 1, panX: 0, panY: 0 };

  // 基本操作集
  const PRIMARY_OPS = new Set(["P", "L", "R", "S", "N", "D1"]);

  function updateNeo(targetEl, inputValue) {
    neoCanvasCleanup?.();
    neoCanvasCleanup = null;
    const v = inputValue.trim();
    if (!v) {
      targetEl.innerHTML = `<div class="result-card">${window.__("cannot_parse_input")}</div>`;
      return;
    }

    neoCurrentInput = v;
    neoCanvasState = { offsetX: 0, offsetY: 0, scale: 1 };
    neoNodeOffsets = {};

    let geometric = {};
    if (neoCurrentView !== 'harmony') {
      try {
        geometric = brain.nrt.getGeometricNeighbors(v);
      } catch (e) {
        if (neoCurrentView !== 'all') {
          targetEl.innerHTML = `<div class="result-card">${window.__("chord_parse_error")}: ${e.message}</div>`;
          return;
        }
      }
    }

    targetEl.innerHTML = "";

    // ---------- 可视化切换按钮 ----------
    const vizRow = document.createElement('div');
    vizRow.className = 'neo-view-switch';
    const neoGroup = document.createElement('div'); neoGroup.className = 'neo-view-group';
    const neoGroupLabel = document.createElement('span'); neoGroupLabel.textContent = window.__('neo_sublevel');
    neoGroup.appendChild(neoGroupLabel);
    const viewButtons = new Map();
    for (const [view, label, parent] of [
      ['tonnetz', window.__('neo_triad_title'), neoGroup],
      ['octatonic', window.__('neo_octatonic_title'), neoGroup],
      ['harmony', window.__('neo_harmony_title'), vizRow],
      ['all', window.__('neo_all_title'), vizRow],
    ]) {
      const button = document.createElement('button'); button.type = 'button';
      button.className = 'panel-action'; button.dataset.view = view; button.textContent = label;
      viewButtons.set(view, button); parent.appendChild(button);
    }
    // Keep the nested Neo-Riemannian controls first in the reading order.
    vizRow.prepend(neoGroup);
    targetEl.appendChild(vizRow);

    // 第二排切换：树状图 / 音网图 / 八音塔
    const subRow = document.createElement('div');
    subRow.className = 'neo-view-switch neo-subview';
    targetEl.appendChild(subRow);

    // 可视化容器
    const canvasContainer = document.createElement("div");
    canvasContainer.id = "neo-canvas-container";
    targetEl.appendChild(canvasContainer);

    // 图例/详情区
    const detailArea = document.createElement("div");
    detailArea.id = "neo-detail-area";
    detailArea.className = "neo-detail-area";
    targetEl.appendChild(detailArea);

    // 绑定控件
    const depthInput = document.getElementById("neo-depth-input");
    const spacingInput = document.getElementById("neo-spacing-input");
    const nodeSizeInput = document.getElementById("neo-node-size-input");
    const nodeSizeVal = document.getElementById("neo-node-size-val");
    const applyBtn = document.getElementById("neo-depth-apply");

    if (depthInput) depthInput.value = neoCurrentDepth;
    if (spacingInput) spacingInput.value = neoLayerSpacing;
    if (nodeSizeInput) {
      nodeSizeInput.value = neoNodeSize;
      if (nodeSizeVal) nodeSizeVal.textContent = neoNodeSize;
      nodeSizeInput.oninput = () => {
        neoNodeSize = parseInt(nodeSizeInput.value) || 22;
        if (nodeSizeVal) nodeSizeVal.textContent = neoNodeSize;
        renderCurrent();
      };
    }

    const applyDepthAndRender = () => {
      if (depthInput) {
        neoCurrentDepth = Math.max(1, Math.min(10, parseInt(depthInput.value) || 1));
        depthInput.value = neoCurrentDepth;
      }
      if (spacingInput) {
        neoLayerSpacing = Math.max(50, Math.min(250, parseInt(spacingInput.value) || 100));
        spacingInput.value = neoLayerSpacing;
      }
      neoCanvasState = { offsetX: 0, offsetY: 0, scale: 1 };
      neoNodeOffsets = {};
      renderCurrent();
    };

    if (applyBtn) applyBtn.onclick = applyDepthAndRender;
    if (depthInput) depthInput.onkeydown = e => { if (e.key === "Enter") applyDepthAndRender(); };
    if (spacingInput) spacingInput.onkeydown = e => { if (e.key === "Enter") applyDepthAndRender(); };

    // 重置视图
    document.getElementById("neo-reset-view").onclick = () => {
      neoCanvasState = { offsetX: 0, offsetY: 0, scale: 1 };
      neoNodeOffsets = {};
      renderCurrent();
    };

    // 重置节点位置
    document.getElementById("neo-reset-positions").onclick = () => {
      neoNodeOffsets = {};
      renderCurrent();
    };

    // ---------- 渲染函数 ----------
    let currentView = neoCurrentView;

    function renderTonnetzMulti() {
      canvasContainer.innerHTML = "";
      detailArea.innerHTML = "";

      const multiGraph = buildTreeGraph(v, neoCurrentDepth, "tonnetz");
      if (!multiGraph || !multiGraph.nodes.length) {
        canvasContainer.innerHTML = `<div class="small-muted">${window.__("neo_no_transform")}</div>`;
        return;
      }

      drawTreeCanvas(canvasContainer, multiGraph, "tonnetz");

      const uniqueChords = [...new Set(multiGraph.nodes.map(n => n.chord))];
      const listTitle = document.createElement("h4");
      listTitle.className = "section-title";
      listTitle.textContent = `${window.__("neo_triad_title")} (${window.__f("neo_list_count", { depth: neoCurrentDepth, n: uniqueChords.length })})`;
      detailArea.appendChild(listTitle);
      detailArea.appendChild(createChordCard(v, true));

      const byDepth = {};
      multiGraph.nodes.forEach(n => {
        if (n.depth > 0) {
          if (!byDepth[n.depth]) byDepth[n.depth] = [];
          byDepth[n.depth].push(n);
        }
      });

      Object.keys(byDepth).sort((a, b) => a - b).forEach(depth => {
        const depthLabel = document.createElement("div");
        depthLabel.className = "neo-depth-label";
        depthLabel.textContent = window.__f("neo_level", { depth });
        detailArea.appendChild(depthLabel);

        const depthGrid = document.createElement("div");
        depthGrid.className = "neo-card-grid";

        byDepth[depth].forEach(node => {
          const chordCard = createChordCard(node.chord, false);
          if (node.operation) {
            const opLabel = document.createElement("div");
            const isPrimary = PRIMARY_OPS.has(node.operation);
            opLabel.className = `neo-op-label${isPrimary ? "" : " is-extended"}`;
            opLabel.textContent = `← ${node.operation}${isPrimary ? '' : window.__("neo_extended")}`;
            chordCard.insertBefore(opLabel, chordCard.firstChild);
          }
          depthGrid.appendChild(chordCard);
        });
        detailArea.appendChild(depthGrid);
      });
    }

    function renderOctatonicMulti() {
      canvasContainer.innerHTML = "";
      detailArea.innerHTML = "";

      const multiGraph = buildTreeGraph(v, neoCurrentDepth, "octatonic");
      if (!multiGraph || !multiGraph.nodes || multiGraph.nodes.length === 0) {
        canvasContainer.innerHTML = `<div class="small-muted">${window.__("neo_no_octatonic")}</div>`;
        return;
      }

      drawTreeCanvas(canvasContainer, multiGraph, "octatonic");

      const uniqueChords = [...new Set(multiGraph.nodes.map(n => n.chord))];
      const listTitle = document.createElement("h4");
      listTitle.className = "section-title";
      listTitle.textContent = `${window.__("neo_octatonic_neighbors")} (${window.__f("neo_chord_depth_heading", {
        depth: neoCurrentDepth,
        chords_count: uniqueChords.length
      })}`;
      detailArea.appendChild(listTitle);

      // ===== 添加原始和弦卡片（修复：八度音阶塔现在也显示原始和弦）=====
      const originalCard = createChordCard(v, true);
      detailArea.appendChild(originalCard);

      const byDepth = {};
      multiGraph.nodes.forEach(n => {
        if (n.depth > 0) {
          if (!byDepth[n.depth]) byDepth[n.depth] = [];
          byDepth[n.depth].push(n);
        }
      });

      Object.keys(byDepth).sort((a, b) => a - b).forEach(depth => {
        const depthLabel = document.createElement("div");
        depthLabel.className = "neo-depth-label";
        depthLabel.textContent = window.__f("neo_chord_depth_heading", {
          depth: depth
        });
        detailArea.appendChild(depthLabel);
        const depthGrid = document.createElement("div");
        depthGrid.className = "neo-card-grid";
        byDepth[depth].forEach(node => depthGrid.appendChild(createChordCard(node.chord, false)));
        detailArea.appendChild(depthGrid);
      });
    }

    function createChordCard(chordName, isOriginal) {
      const card = document.createElement("div");
      card.className = `result-card neo-chord-card${isOriginal ? " is-origin" : ""}`;
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); card.click(); }
      });
      card.addEventListener("click", () => {
        const neoInput = document.getElementById("neo-input");
        if (neoInput) neoInput.value = chordName;
        neoCanvasState = { offsetX: 0, offsetY: 0, scale: 1 };
        neoNodeOffsets = {};
        updateNeo(canvasContainer.parentElement, chordName);
      });
      const title = document.createElement("div");
      title.className = "card-title";
      title.textContent = chordName;
      card.appendChild(title);
      try {
        const parsed = brain.converter._ensureNotesAndRoot(chordName, true);
        if (parsed?.notes?.length) {
          const noteRow = document.createElement("div");
          noteRow.className = "note-grid";
          parsed.notes.slice(0, 6).forEach(n => {
            const nc = document.createElement("div");
            nc.className = "note-cell";
            nc.innerHTML = `<div class="note">${n}</div>`;
            noteRow.appendChild(nc);
          });
          card.appendChild(noteRow);
        }
      } catch (e) { }
      return card;
    }

    function renderHarmony() {
      neoCanvasCleanup?.(); neoCanvasCleanup = null;
      detailArea.replaceChildren();
      neoCanvasCleanup = mountHarmonyWheel(canvasContainer, v, chord => {
        document.getElementById('neo-input').value = chord;
        updateNeo(targetEl, chord);
      }, key => window.__(key), chord => createChordCard(chord, false), neoHarmonyViewState);
    }

    function renderAll() {
      canvasContainer.replaceChildren(); detailArea.replaceChildren();
      const sources = [];
      for (const family of ['tonnetz', 'octatonic']) {
        try { sources.push({ family, graph: buildTreeGraph(v, neoCurrentDepth, family) }); }
        catch { sources.push({ family, graph: null }); }
      }
      sources.push({ family: 'harmony', graph: harmonyNeighborhood(v, neoCurrentDepth) });
      const combined = mergeConnectionGraphs(v, sources);
      drawTreeCanvas(canvasContainer, combined, 'all');
      const heading = document.createElement('h4'); heading.className = 'section-title';
      heading.textContent = `${window.__('neo_all_title')} · ${combined.nodes.length} ${window.__('neo_all_chords')}`;
      detailArea.append(heading, createChordCard(v, true));
      for (const { family, graph } of sources) {
        const section = document.createElement('section'); section.className = `neo-all-family family-${family}`;
        const title = document.createElement('h5');
        title.textContent = `${window.__({ tonnetz: 'neo_triad_title', octatonic: 'neo_octatonic_title', harmony: 'neo_harmony_title' }[family])} · ${Math.max(0, (graph?.nodes?.length || 1) - 1)}`;
        section.appendChild(title);
        const grid = document.createElement('div'); grid.className = 'neo-all-family-cards';
        graph?.nodes?.filter(node => node.depth === 1).forEach(node => grid.appendChild(createChordCard(node.chord, false)));
        if (!grid.childElementCount) grid.appendChild(document.createTextNode(window.__('neo_all_no_neighbors')));
        section.appendChild(grid); detailArea.appendChild(section);
      }
    }

    /** 点音网图的三角形 / 八音塔里的和弦：换到那个和弦 */
    const pickChord = (name) => {
      const neoInput = document.getElementById("neo-input");
      if (neoInput) neoInput.value = name;
      updateNeo(targetEl, name);
    };
    function renderSubSwitch(items, active, onPick) {
      subRow.replaceChildren();
      items.forEach(([id, label]) => {
        const b = document.createElement('button'); b.type = 'button';
        b.className = `panel-action${id === active ? ' active' : ''}`; b.textContent = label;
        b.setAttribute('aria-pressed', String(id === active));
        b.addEventListener('click', () => { onPick(id); renderCurrent(); });
        subRow.appendChild(b);
      });
    }
    function renderTonnetzLattice() {
      neoCanvasCleanup?.(); neoCanvasCleanup = null;
      detailArea.innerHTML = "";
      const result = renderTonnetz(canvasContainer, v, { mode: neoTonnetzMode, onPick: pickChord });
      const names = [v, ...result.neighbours.map((n) => n.name)];
      renderChordStaff(detailArea, names, `${neoViewText().staff} · ${[v, ...result.neighbours.map((n) => `${n.op} → ${n.name}`)].join('  ')}`);
    }
    function renderTowerView() {
      neoCanvasCleanup?.(); neoCanvasCleanup = null;
      detailArea.innerHTML = "";
      renderTower(canvasContainer, v, { onPick: pickChord });
      renderChordStaff(detailArea, [v], neoViewText().staff);
    }
    function renderCurrent() {
      viewButtons.forEach((button, view) => {
        const active = currentView === view;
        button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
      });
      canvasContainer.classList.toggle('is-harmony-wheel', currentView === 'harmony');
      canvasContainer.classList.toggle('is-lattice', (currentView === 'tonnetz' && neoTonnetzMode !== 'tree') || (currentView === 'octatonic' && neoTowerMode === 'tower'));
      subRow.replaceChildren();
      const tree = window.__('neo_tree_view') || neoViewText().tree || '树状图';
      if (currentView === 'tonnetz') {
        renderSubSwitch([['tree', tree], ['plr', `${window.__('neo_tonnetz_view') || '音网图'} · ${neoViewText().plr}`], ['snh', `${window.__('neo_tonnetz_view') || '音网图'} · ${neoViewText().snh}`]], neoTonnetzMode, (id) => { neoTonnetzMode = id; });
        if (neoTonnetzMode === 'tree') renderTonnetzMulti(); else renderTonnetzLattice();
      } else if (currentView === 'octatonic') {
        renderSubSwitch([['tree', tree], ['tower', neoViewText().tower]], neoTowerMode, (id) => { neoTowerMode = id; });
        if (neoTowerMode === 'tower') renderTowerView(); else renderOctatonicMulti();
      } else if (currentView === 'harmony') renderHarmony();
      else renderAll();
      if ((currentView === 'tonnetz' && neoTonnetzMode === 'tree') || (currentView === 'octatonic' && neoTowerMode !== 'tower')) {
        const staff = renderChordStaff(detailArea, [v], neoViewText().staff);
        if (staff) detailArea.prepend(staff);
      }
    }
    viewButtons.forEach((button, view) => button.addEventListener('click', () => {
      currentView = neoCurrentView = view;
      neoCanvasState = { offsetX: 0, offsetY: 0, scale: 1 };
      neoNodeOffsets = {};
      renderCurrent();
    }));
    if (currentView === 'tonnetz' && !(geometric.Tonnetz_PLRSND && Object.keys(geometric.Tonnetz_PLRSND).length)) {
      currentView = neoCurrentView = 'octatonic';
    }
    renderCurrent();
  }

  /**
   * 树型布局：根节点顶部，子节点向下展开
   * 类似二叉树/族谱结构，每层水平分布
   */
  function buildTreeGraph(rootChord, maxDepth, type) {
    const visited = new Set();
    const nodes = [];
    const edges = [];

    const normalize = (chord) => {
      try {
        const notes = brain.converter._ensureNotesAndRoot(chord);
        if (notes?.length) return [...notes].sort().join(',');
      } catch (e) { }
      return chord;
    };

    const rootNorm = normalize(rootChord);
    visited.add(rootNorm);

    const centerInfo = brain.converter._ensureNotesAndRoot(rootChord, true);
    nodes.push({
      id: 0,
      chord: rootChord,
      notes: centerInfo?.notes || [],
      label: rootChord.length > 8 ? rootChord.slice(0, 7) + ".." : rootChord,
      x: 0,
      y: 0,
      group: "center",
      depth: 0
    });

    let nodeId = 1;
    // BFS: 队列元素 { chord, depth, parentId, operation, childIndex, totalSiblings }
    const queue = [{ chord: rootChord, depth: 0, parentId: null, operation: null }];

    while (queue.length > 0) {
      const { chord, depth, parentId } = queue.shift();
      if (depth >= maxDepth) continue;

      let neighbors = {};
      const geo = brain.nrt.getGeometricNeighbors(chord);

      if (type === "tonnetz" && geo.Tonnetz_PLRSND) {
        // 优先排列基本操作，再排扩展操作
        const primary = [];
        const secondary = [];
        Object.entries(geo.Tonnetz_PLRSND).forEach(([op, result]) => {
          if (result.chord) {
            if (PRIMARY_OPS.has(op)) primary.push([op, result.chord]);
            else secondary.push([op, result.chord]);
          }
        });
        // 基本操作按固定顺序：P, L, R, S, N, D1
        const order = ["P", "L", "R", "S", "N", "D1"];
        primary.sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
        const allNeighbors = [...primary, ...secondary];
        allNeighbors.forEach(([op, chord]) => { neighbors[op] = chord; });
      } else if (type === "octatonic" && geo.Octatonic_Tower) {
        geo.Octatonic_Tower.forEach((neighbor, i) => {
          if (neighbor) neighbors[`O${i + 1}`] = neighbor;
        });
      }

      const neighborEntries = Object.entries(neighbors);
      const totalSiblings = neighborEntries.length;
      const parentNode = nodes.find(n => n.id === parentId);
      const parentX = parentNode ? parentNode.x : 0;
      const parentY = parentNode ? parentNode.y : 0;

      // 树的水平展开宽度随深度动态调整
      const levelWidth = neoLayerSpacing * 2 + (depth + 1) * neoLayerSpacing * 0.8;
      const startX = parentX - levelWidth / 2 + levelWidth / (totalSiblings + 1);

      neighborEntries.forEach(([op, neighborChord], idx) => {
        const normNeighbor = normalize(neighborChord);

        // 计算树型位置
        const childX = startX + (idx + 1) * (levelWidth / (totalSiblings + 1));
        const childY = parentY + neoLayerSpacing;

        if (!visited.has(normNeighbor)) {
          visited.add(normNeighbor);

          let notes = [];
          try {
            const parsed = brain.converter._ensureNotesAndRoot(neighborChord, true);
            notes = parsed?.notes || [];
          } catch (e) { }

          const isPrimary = PRIMARY_OPS.has(op);
          const newNode = {
            id: nodeId,
            chord: neighborChord,
            notes: notes,
            label: op,
            operation: op,
            isPrimary: isPrimary,
            x: Math.round(childX),
            y: Math.round(childY),
            group: isPrimary ? "transform" : "secondary",
            depth: depth + 1
          };

          nodes.push(newNode);
          edges.push({
            source: parentId !== null ? parentId : 0,
            target: nodeId,
            label: op,
            depth: depth + 1,
            isPrimary: isPrimary
          });

          queue.push({
            chord: neighborChord,
            depth: depth + 1,
            parentId: nodeId,
            operation: op
          });

          nodeId++;
        } else {
          // 连接到已访问节点
          const existingNode = nodes.find(
            n => normalize(n.chord) === normNeighbor && n.id !== parentId
          );
          if (existingNode && !edges.some(
            e => (e.source === parentId && e.target === existingNode.id) ||
              (e.source === existingNode.id && e.target === parentId)
          )) {
            edges.push({
              source: parentId !== null ? parentId : 0,
              target: existingNode.id,
              label: op,
              depth: Math.max(depth + 1, existingNode.depth),
              isPrimary: PRIMARY_OPS.has(op)
            });
          }
        }
      });
    }

    return { nodes, edges, center: rootChord };
  }

  function drawTreeCanvas(container, graphData, type) {
    neoCanvasCleanup?.();
    neoCanvasCleanup = mountNeoCanvas(container, graphData, {
      size: neoNodeSize,
      spacing: neoLayerSpacing,
      family: type,
      state: neoCanvasState,
      offsets: neoNodeOffsets,
      onSelect(chord) {
        document.getElementById('neo-input').value = chord;
        updateNeo(container.parentElement, chord);
      },
    });
  }

  function updateNeoPath(targetEl, chordA, chordB, maxSteps = 8) {
    let paths;
    try {
      paths = brain.nrt.findPath(chordA, chordB, maxSteps);
    } catch (e) {
      targetEl.innerHTML = `<div class="result-card">${e.message}</div>`;
      return;
    }

    targetEl.innerHTML = "";

    if (!paths || paths.length === 0) {
      const noPath = document.createElement("div");
      noPath.className = "result-card path-empty";
      noPath.innerHTML = `
      <div class="path-empty-mark" aria-hidden="true">✕</div>
      <div class="small-muted">${window.__("neo_path_no_path") || "No connection path found"}</div>
      <div class="path-empty-route">${chordA}<span aria-hidden="true">→</span>${chordB}</div>
      <div class="small-muted">(${window.__("neo_path_steps") || "max"}: ${maxSteps} ${window.__("neo_path_steps") || "steps"})</div>
    `;
      targetEl.appendChild(noPath);
      return;
    }

    // 最优路径
    const optimalPath = paths[0];
    renderPathCard(targetEl, optimalPath, chordA, chordB, true);
    // 路径上的和弦写在五线谱上
    const pathChords = optimalPath.path.length ? [optimalPath.path[0].from, ...optimalPath.path.map((step) => step.to)] : [chordA];
    renderChordStaff(targetEl, pathChords, neoViewText().staffPath);

    // 其他路径
    if (paths.length > 1) {
      const altTitle = document.createElement("h4");
      altTitle.className = "section-title";
      altTitle.textContent = window.__("neo_path_alternative") || "Alternative Paths";
      targetEl.appendChild(altTitle);

      paths.slice(1, Math.min(6, paths.length)).forEach((p) => {
        renderPathCard(targetEl, p, chordA, chordB, false);
      });
    }
  }

  function renderPathCard(container, pathData, chordA, chordB, isOptimal) {
    const card = document.createElement("div");
    card.className = `result-card path-card${isOptimal ? " is-optimal" : ""}`;

    // 头部：标题 + 步数徽章
    const header = document.createElement("div");
    header.className = "path-card-head";

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = isOptimal
      ? `${window.__("neo_path_optimal") || "Optimal Path"}`
      : `${window.__("neo_path_alternative") || "Path"}`;

    const stepsBadge = document.createElement("span");
    stepsBadge.className = `step-pill${isOptimal ? " is-best" : ""}`;
    stepsBadge.textContent = `${pathData.steps} ${window.__("neo_path_steps") || "steps"}`;

    header.appendChild(title);
    header.appendChild(stepsBadge);
    card.appendChild(header);

    // 路径流程图
    const flowContainer = document.createElement("div");
    flowContainer.className = "path-flow";

    pathData.path.forEach((step, i) => {
      // 和弦块
      const chordEl = document.createElement("div");
      chordEl.className = "path-chord";
      chordEl.textContent = step.from;
      flowContainer.appendChild(chordEl);

      // 变换操作箭头
      const arrowEl = document.createElement("div");
      arrowEl.className = "path-op";
      arrowEl.innerHTML = `<span aria-hidden="true">→</span><span>${step.operation}</span>`;
      flowContainer.appendChild(arrowEl);

      // 最后一步显示目标和弦（高亮）
      if (i === pathData.path.length - 1) {
        const targetEl = document.createElement("div");
        targetEl.className = "path-chord is-target";
        targetEl.textContent = step.to;
        flowContainer.appendChild(targetEl);
      }
    });

    card.appendChild(flowContainer);

    // 每步和弦的音符展示
    const notesRow = document.createElement("div");
    notesRow.className = "path-notes";

    pathData.chords.forEach((chordName) => {
      try {
        const info = brain.converter._ensureNotesAndRoot(chordName);
        if (info && info.length >= 3) {
          const block = document.createElement("div");
          block.className = "path-notes-block";

          const nameDiv = document.createElement("div");
          nameDiv.textContent = chordName;
          block.appendChild(nameDiv);

          const noteRow = document.createElement("div");
          info.slice(0, 4).forEach((n) => {
            const nc = document.createElement("span");
            nc.className = "mini-note";
            nc.textContent = n;
            noteRow.appendChild(nc);
          });
          block.appendChild(noteRow);

          // 箭头分隔（最后一个不显示）
          if (chordName !== pathData.chords[pathData.chords.length - 1]) {
            const wrapper = document.createElement("div");
            wrapper.className = "path-notes-item";
            wrapper.appendChild(block);

            const sep = document.createElement("span");
            sep.className = "path-notes-sep";
            sep.setAttribute("aria-hidden", "true");
            sep.textContent = "→";
            wrapper.appendChild(sep);

            notesRow.appendChild(wrapper);
          } else {
            notesRow.appendChild(block);
          }
        }
      } catch (e) { }
    });

    card.appendChild(notesRow);
    container.appendChild(card);
  }

  // 绑定新里曼运行按钮
  document.getElementById("neo-run").addEventListener("click", () => {
    const target = document.getElementById("panel-neo-body");
    const val = document.getElementById("neo-input").value;
    updateNeo(target, val);
  });

  // 路径查找按钮事件
  const neoPathRunBtn = document.getElementById("neo-path-run");
  if (neoPathRunBtn) {
    neoPathRunBtn.addEventListener("click", () => {
      const target = document.getElementById("panel-neo-body");
      const fromChord = document.getElementById("neo-path-from").value.trim();
      const toChord = document.getElementById("neo-path-to").value.trim();
      const maxSteps = parseInt(document.getElementById("neo-max-steps").value) || 8;

      if (!fromChord || !toChord) {
        target.innerHTML = `<div class="small-muted">${window.__("cannot_parse_input")}</div>`;
        return;
      }

      updateNeoPath(target, fromChord, toChord, maxSteps);
    });

    // 支持回车触发
    document.getElementById("neo-path-to").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        neoPathRunBtn.click();
      }
    });
  }

  return { updateNeo, updateNeoPath };
}

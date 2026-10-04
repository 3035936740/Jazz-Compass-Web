// 关于页面：工具列表（按导航分组，名字与介绍取自界面文字）、使用提示、作者碎碎念、致谢与全部参考资料（按主题分组，来自 references.js）
// 从 script.js 拆出来；只依赖 window.__（lang.js）与 references.js
import { REFERENCES, REFERENCE_TOPICS } from './references.js?v=20261004-x1';

function renderAboutReferences() {
  const lang = window.__lang || "zh";
  const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  return REFERENCE_TOPICS.map((topic) => {
    const items = REFERENCES.filter((reference) => reference.topic === topic.id);
    if (!items.length) return "";
    const rows = items.map((r) => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)}</a>
        <span class="about-ref-meta">${esc(r.author)}${r.license ? ` · ${esc(r.license)}` : ""}</span>
        <span class="about-ref-use">${esc(r.usedFor[lang] || r.usedFor.en)}</span></li>`).join("");
    return `<section class="about-ref-group"><h5>${esc(topic[lang] || topic.en)}</h5><ul class="about-ref-list">${rows}</ul></section>`;
  }).join("");
}

export function showAbout() {
  const aboutBody = document.getElementById("panel-about-body");
  if (!aboutBody) return;

  const escapeText = (text) => String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const list = (key) => [].concat(window.__(key) || []).map((item) => `<li>${escapeText(item)}</li>`).join("");
  // "都有些什么"：按导航栏的分组列出每个工具和它的一句话介绍（名字与介绍都取自界面文字，永远和实际一致）
  const groups = [...document.querySelectorAll(".feature-nav .nav-group")].map((group) => {
    const label = group.querySelector(".nav-group-label")?.textContent?.trim();
    const tools = [...group.querySelectorAll(".feature-btn[data-feature]")].map((b) => b.dataset.feature).filter((f) => f !== "about");
    return { label, tools };
  }).filter((g) => g.tools.length);
  const toolsHtml = groups.map((g) => `
      <div class="about-group">
        ${g.label ? `<h5>${escapeText(g.label)}</h5>` : ""}
        <ul>${g.tools.map((f) => `<li><a href="#${f}"><strong>${escapeText(window.__(`nav_${f}`) || f)}</strong></a><span>${escapeText(window.__(`intro_${f}`) || "")}</span></li>`).join("")}</ul>
      </div>`).join("");
  const html = `
    <h3>${window.__("about_title")}</h3>
    <p class="about-lead">${escapeText(window.__("about_desc"))}</p>
    <p>${escapeText(window.__("about_more"))}</p>

    <h4>${window.__("about_tools_title")}</h4>
    <div class="about-groups">${toolsHtml}</div>

    <h4>${window.__("about_tips_title")}</h4>
    <ul class="about-tips">${list("about_tips")}</ul>

    <h4>${window.__("about_ramble_title")}</h4>
    <div class="about-ramble">${[].concat(window.__("about_ramble") || []).map((p) => `<p>${escapeText(p)}</p>`).join("")}</div>

    <h4>${window.__("about_credits_title")}</h4>
    <p class="about-ack">${window.__("about_acknowledgement")}</p>
    <p class="about-credit">${window.__("about_sposobin")}</p>
    <p class="about-credit">${window.__("about_piano_samples")}</p>

    <h4>${window.__("about_links_title")}</h4>
    <div class="about-links">
      <p><a href="https://github.com/3035936740/Jazz-Compass-Web" target="_blank" rel="noopener noreferrer">${window.__("about_github_web")}</a></p>
      <p><a href="https://github.com/3035936740/JazzCompassPy" target="_blank" rel="noopener noreferrer">${window.__("about_github_py")}</a></p>
    </div>

    <h4>${window.__("about_references")}</h4>
    <p>${window.__("about_references_intro")}</p>
    ${renderAboutReferences()}

    <p class="about-footer">${window.__("about_footer")}</p>
  `;

  aboutBody.innerHTML = html;
}

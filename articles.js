/* ============================================================
   文章相關頁面（articles.html / article.html）的渲染邏輯
   一般不需要修改這個檔案，改內容請到 data.js 的 articles 陣列
   ============================================================ */

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* ---------- articles.html：文章清單（按鈕） ---------- */
function renderArticleList() {
  const cat = getQueryParam("cat") || "";
  const list = (SITE_DATA.articles || []).filter(a => a.category === cat);
  const wrap = document.getElementById("article-list");
  const backLink = document.getElementById("back-link");

  if (backLink && cat) {
    backLink.href = "gallery-" + (cat === "推" ? "tui" : cat) + ".html";
  }

  if (!list.length) {
    wrap.appendChild(el("p", "about-plain", "還沒有文章"));
    return;
  }

  list.forEach(a => {
    const link = el("a", "works-link", `
      ${a.title}
      <span class="works-link-arrow">→</span>
    `);
    link.href = "article.html?id=" + encodeURIComponent(a.id);
    wrap.appendChild(link);
  });
}

/* ---------- article.html：單篇文章內容 ---------- */
function renderArticle() {
  const id = getQueryParam("id");
  const article = (SITE_DATA.articles || []).find(a => a.id === id);
  const titleEl = document.getElementById("article-title");
  const bodyEl = document.getElementById("article-body");
  const backLink = document.getElementById("back-link");

  if (!article) {
    titleEl.textContent = "找不到這篇文章";
    bodyEl.textContent = "";
    return;
  }

  titleEl.textContent = article.title;
  bodyEl.textContent = article.content || "";
  if (backLink) {
    backLink.href = "articles.html?cat=" + encodeURIComponent(article.category);
  }
}

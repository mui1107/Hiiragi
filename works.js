/* ============================================================
   圖片集頁面 (works.html) 的渲染邏輯
   一般不需要修改這個檔案，改內容請到 data.js
   ============================================================ */

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

/* ---------- 一般向 Gallery（跟首頁同一套邏輯） ---------- */
function renderGallery(items) {
  const grid = document.getElementById("gallery-grid");
  const filterBar = document.getElementById("gallery-filters");
  if (!items || !items.length) {
    grid.appendChild(el("div", "gallery-empty", "還沒有圖片"));
    return;
  }

  const tags = ["全部", ...Array.from(new Set(items.map(i => i.tag).filter(Boolean)))];
  let active = "全部";

  function draw() {
    grid.innerHTML = "";
    const shown = active === "全部" ? items : items.filter(i => i.tag === active);
    shown.forEach(item => {
      const card = el("div", "gallery-item");
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="gallery-caption">
          <span class="g-title">${item.title}</span>
          ${item.tag ? `<span class="g-tag">${item.tag}</span>` : ""}
        </div>`;
      card.addEventListener("click", () => openLightbox(item.image, item.title, item.tag, item.desc, item.artist, item.artistUrl));
      grid.appendChild(card);
    });
  }

  tags.forEach(tag => {
    const btn = el("button", "filter-btn" + (tag === active ? " active" : ""), tag);
    btn.addEventListener("click", () => {
      active = tag;
      filterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      draw();
    });
    filterBar.appendChild(btn);
  });

  draw();
}

/* ---------- R-18 文字連結（點確認鈕才顯示） ---------- */
function renderNsfw(list) {
  const section = document.getElementById("nsfw-section");
  const gate = document.getElementById("nsfw-gate");
  const gateBtn = document.getElementById("nsfw-gate-btn");
  const listWrap = document.getElementById("nsfw-list");

  if (!list || !list.length) {
    section.remove();
    return;
  }

  list.forEach(item => {
    const hasUrl = !!item.url;
    const row = document.createElement(hasUrl ? "a" : "div");
    row.className = "nsfw-row" + (hasUrl ? "" : " no-link");
    if (hasUrl) {
      row.href = item.url;
      row.target = "_blank";
      row.rel = "noopener noreferrer nofollow";
    }
    row.innerHTML = `
      <span class="nsfw-title">${item.title}</span>
      ${item.tag ? `<span class="nsfw-tag">${item.tag}</span>` : ""}
      ${item.desc ? `<span class="nsfw-desc">${item.desc}</span>` : ""}
      ${item.artist ? `<span class="nsfw-artist">繪師：${item.artist}</span>` : ""}
    `;
    listWrap.appendChild(row);
  });

  function reveal() {
    gate.hidden = true;
    listWrap.hidden = false;
  }

  // 同一個瀏覽器分頁裡按過一次，重新整理就不用再按
  if (sessionStorage.getItem("nsfw-confirmed") === "1") {
    reveal();
  }

  gateBtn.addEventListener("click", () => {
    sessionStorage.setItem("nsfw-confirmed", "1");
    reveal();
  });
}

/* ---------- Lightbox（跟首頁同一套邏輯） ---------- */
function openLightbox(src, title, tag, desc, artist, artistUrl) {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  img.src = src;
  img.alt = title || "";

  const hasTitle = !!title;
  const hasTag = !!tag;
  const hasDesc = !!desc;
  const hasArtist = !!artist;

  if (hasTitle || hasTag || hasDesc || hasArtist) {
    caption.hidden = false;
    caption.innerHTML = `
      ${hasTitle || hasTag ? `
        <div class="lightbox-caption-head">
          ${hasTitle ? `<span class="lightbox-caption-title">${title}</span>` : ""}
          ${hasTag ? `<span class="lightbox-caption-tag">${tag}</span>` : ""}
        </div>` : ""}
      ${hasDesc ? `<p class="lightbox-caption-desc">${desc}</p>` : ""}
      ${hasArtist ? `<p class="lightbox-caption-artist">繪師：${artistUrl ? `<a href="${artistUrl}" target="_blank" rel="noopener noreferrer">${artist}</a>` : artist}</p>` : ""}
    `;
  } else {
    caption.hidden = true;
    caption.innerHTML = "";
  }

  box.hidden = false;
}
function closeLightbox() {
  document.getElementById("lightbox").hidden = true;
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderGallery(SITE_DATA.gallery);
  renderNsfw(SITE_DATA.nsfw);

  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});

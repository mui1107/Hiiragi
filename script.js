/* ============================================================
   渲染引擎 — 讀取 data.js 的 SITE_DATA 並畫出頁面
   一般不需要修改這個檔案，改內容請到 data.js
   ============================================================ */

const ICONS = {
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.3c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.9 1.42-3.9 4.02V10.5H8v3h2.36V21h3.14z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/></svg>',
  discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 6.4a15.3 15.3 0 0 0-3.6-1.1l-.2.4c1.3.3 2 .8 2.7 1.4-1.2-.6-2.4-1-3.8-1.2-.9-.1-1.8-.1-2.7 0-1.4.2-2.6.6-3.8 1.2.7-.6 1.5-1.1 2.7-1.4l-.2-.4c-1.2.3-2.4.6-3.6 1.1C3.4 9.4 2.6 12.3 3 15.2c1.6 1.2 3.2 1.9 4.7 2.3l.6-1c-.8-.3-1.6-.7-2.3-1.2.2.1.4.3.6.4 2.6 1.2 5.5 1.2 8 0 .2-.1.4-.3.6-.4-.7.5-1.5.9-2.3 1.2l.6 1c1.5-.4 3.1-1.1 4.7-2.3.5-3.3-.4-6.1-2.3-8.8zM9.7 13.6c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.3.7 1.3 1.5-.6 1.5-1.3 1.5zm4.6 0c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.3.7 1.3 1.5-.6 1.5-1.3 1.5z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.2" cy="6.8" r="1"/></svg>',
};

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

/* ---------- Hero ---------- */
function renderHero(data) {
  const hero = document.getElementById("hero");
  const frame = el("div", "hero-frame", `<img src="${data.avatar}" alt="${data.displayName} 的頭像" />`);
  const name = el("h1", "hero-name", `<span class="emoji">${data.emoji || ""}</span>${data.displayName}`);
  const rule = el("div", "hero-rule");
  const tags = el("div", "tag-row");
  (data.tags || []).forEach(t => tags.appendChild(el("span", "tag", t)));
  hero.append(frame, name, rule, tags);
  if (data.avatarArtist) {
    const credit = el("p", "avatar-credit", `繪師：${data.avatarArtistUrl ? `<a href="${data.avatarArtistUrl}" target="_blank" rel="noopener noreferrer">${data.avatarArtist}</a>` : data.avatarArtist}`);
    hero.append(credit);
  }
}

/* ---------- About / games ---------- */
function chipBlock(label, items, opts = {}) {
  const block = el("div", "about-block");
  block.appendChild(el("h3", "about-label", label));
  const cloud = el("div", "chip-cloud");
  (items || []).forEach(item => cloud.appendChild(el("span", opts.dim ? "chip dim" : "chip", item)));
  block.appendChild(cloud);
  if (opts.note) block.appendChild(el("p", "about-note", opts.note));
  return block;
}

function plainBlock(label, text, note) {
  const block = el("div", "about-block");
  block.appendChild(el("h3", "about-label", label));
  block.appendChild(el("p", "about-plain", text));
  if (note) block.appendChild(el("p", "about-note", note));
  return block;
}

function renderAbout(data) {
  const wrap = document.getElementById("about");
  if (data.intro) {
    const introBlock = plainBlock("自我介紹", data.intro);
    introBlock.classList.add("intro-block");
    wrap.appendChild(introBlock);
  }
  if (data.games) {
    wrap.appendChild(chipBlock("在玩", data.games.playing));
    wrap.appendChild(chipBlock("玩過，現在沒玩了", data.games.stopped, { dim: true }));
  }
  if (data.novelComic) {
    wrap.appendChild(chipBlock("小說 / 漫畫", data.novelComic.items, { note: data.novelComic.note }));
  }
  if (data.music) {
    wrap.appendChild(chipBlock("喜歡聽的音樂", data.music.items, { note: data.music.note }));
  }
  if (data.notes) {
    if (data.notes.unknown) wrap.appendChild(plainBlock("閒聊", data.notes.unknown, data.notes.unknownNote));
    if (data.notes.dislike && data.notes.dislike.length) {
      wrap.appendChild(chipBlock(data.notes.dislikeTitle || "不喜歡", data.notes.dislike, { dim: true }));
    }
  }
}

/* ---------- Gallery ---------- */
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

/* ---------- Friends ---------- */
function renderFriends(list) {
  const wrap = document.getElementById("friends-list");
  (list || []).forEach(f => {
    const row = el("div", "friend-row");
    row.innerHTML = `
      <div class="friend-info">
        <div class="friend-game">${f.game}</div>
        <div class="friend-id">${f.id || ""}</div>
      </div>
      ${f.image ? `<div class="friend-thumb"><img src="${f.image}" alt="${f.game} 個人檔案截圖" /></div>` : ""}
    `;
    if (f.image) {
      row.querySelector(".friend-thumb").addEventListener("click", () => openLightbox(f.image, f.game));
    }
    wrap.appendChild(row);
  });
}

/* ---------- Social ---------- */
function renderSocial(list) {
  const wrap = document.getElementById("social-list");
  (list || []).forEach(s => {
    const hasLink = !!s.url;
    const row = document.createElement(hasLink ? "a" : "div");
    row.className = "social-row" + (hasLink ? "" : " no-link");
    if (hasLink) {
      row.href = s.url;
      if (!s.url.startsWith("mailto:")) row.target = "_blank";
      row.rel = "noopener";
    }
    row.innerHTML = `
      <span class="social-icon">${ICONS[s.icon] || ""}</span>
      <span>
        <div class="social-label">${s.label}</div>
        <div class="social-value">${s.value}</div>
      </span>
    `;
    wrap.appendChild(row);
  });
}

/* ---------- Lightbox ---------- */
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
  renderHero(SITE_DATA.profile);
  renderAbout(SITE_DATA);
  if (document.getElementById("gallery-grid")) {
    renderGallery(SITE_DATA.gallery);
  }
  renderFriends(SITE_DATA.friends);
  renderSocial(SITE_DATA.social);

  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});

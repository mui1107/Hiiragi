/* ============================================================
   內容資料檔 — 你唯一需要修改的檔案
   ------------------------------------------------------------
   要改文字、換圖片、加/刪一筆資料，都在這裡改就好，
   不用碰 index.html / style.css / script.js。
   改完存檔，回瀏覽器重新整理（F5）就會看到最新結果。

   小提醒：
   - 每一組 { ... } 之間要用逗號 , 隔開
   - 文字外面要用雙引號 "..." 包起來
   - image 欄位沒有圖的話留空字串 "" 即可
   ============================================================ */

const SITE_DATA = {

  // ---------- 個人檔案（最上面那一區）----------
  profile: {
    avatar: "images/avatar.png",
    // 頭像立繪的繪師標註，沒有就留空 ""
    avatarArtist: "",
    avatarArtistUrl: "",
    displayName: "慕伊",
    emoji: "",
    tags: ["男的", "INTP-T"],
  },

  // ---------- 自我介紹（顯示在「在玩」清單上面）----------
  // 留空字串 "" 就不會顯示這一區，想換行的話用 \n
  intro: "你好 我是慕伊，一個念資工系的普通大學生。\n 平常喜歡打打遊戲、聊天之類的，通常不會主動私訊，有時會在各個dc群組出現但是因為沒辦法顧及太多，所以通常都是在固定幾個群組出現。我不喜歡吵架，所以看我不順眼的自己把我刪了就好。至於我看過或了解的東西並不僅止於下方所列，所以或許會在一些話題出現。",

  // ---------- 遊戲清單 ----------
  games: {
    playing: [
      "FGO", "Limbus Company", "LoL宇宙 瓦（AR戰棋）", "符文大地傳說",
      "明日方舟", "終末地", "劍遠：啟程", "貓戰", "忘卻前夜",
      "影之詩2", "怪物彈珠", "VRChat", "星塔", "嘟嘟臉",
    ],
    stopped: [
      "BA", "Master Dual", "鳴潮", "第七史詩", "妮姬",
      "百聞牌", "雀魂（有人找才會打）", "神魔", "世界計畫", "Mhy（含崩三，可聊第一部劇情）",
    ],
  },

  // ---------- 小說 / 漫畫 ----------
  novelComic: {
    items: [
      "烙印勇士", "達爾文遊戲", "實教", "暗影大人", "遊戲人生", "加速世界", "我買下了與她的每周密會",
      "處刑賢者", "咒術", "鏈鋸", "換裝娃娃", "神使繪卷、織女", "RE 0", "無職", "JOJO",
    ],
    note: "等等（看得偏老，新的很多都沒看過）",
  },

  // ---------- 喜歡聽的音樂 ----------
  // items 放歌名、歌手或曲風都可以，note 是下面的小字補充說明（不需要就留空 ""）
  music: {
    items: [
      "任然", "蘭音", "銀臨", "三無", "黃詩扶", "司南", "KB", "祖婭納惜",
      "Mili", "不才", "哦漏", "周深", "坂本真綾", "排骨教主", "茶二娘",
    ],
    note: "",
  },

  // ---------- 閒聊 / 不喜歡 ----------
  // unknownNote 是「閒聊」文字下方的小字說明，留空字串 "" 就不會顯示
  notes: {
    unknown: "都來聊聊天",
    unknownNote: "有低概率發女裝",
    dislikeTitle: "不喜歡",
    dislike: ["抖音", "邏輯爆炸", "米遊過激"],
  },

  // ---------- 圖片集 ----------
  // desc 是點進去放大後、圖片下方顯示的說明文字，留空字串 "" 就不會顯示
  // artist 是繪師名字，artistUrl 是繪師的帳號連結（沒有的話留空 "" 就不會顯示）
  gallery: [
    { title: "寄情書", tag: "推", image: "images/gallery/qingshu.jpg", desc: "", artist: "", artistUrl: "" },
    { title: "立繪", tag: "oc", image: "images/gallery/lihui.png", desc: "", artist: "", artistUrl: "" },
    { title: "餵食", tag: "推", image: "images/gallery/weishi.jpg", desc: "", artist: "", artistUrl: "" },
    { title: "裙子", tag: "oc", image: "images/gallery/IMG_0247.jpg", desc: "", artist: "", artistUrl: "" },
  ],

  // ---------- R-18 / 限制級圖片（只放文字連結，圖檔請放在外部平台）----------
  // 只會顯示在 works.html 的「18+」區塊裡，點過確認鈕才會看到
  // url 貼外部連結（例如 Pixiv 圖片網址）；url 留空 "" 的話會顯示成純文字（不能點）
  // artist 是繪師名字，artistUrl 是繪師的帳號連結（沒有的話留空 "" 就不會顯示）
  nsfw: [
    { title: "圖片名稱", tag: "R18", url: "", desc: "", artist: "", artistUrl: "" },
  ],

  // ---------- 遊戲好友 / 好友代碼 ----------
  friends: [
    { game: "忘卻前夜", id: "100789288", image: "images/friends/wangquenye.jpg" },
    { game: "明日方舟", id: "慕伊#9479", image: "images/friends/fangzhou.jpg" },
    { game: "終末地", id: "慕伊#0174", image: "" },
    { game: "FGO 日服", id: "359209647", image: "" },
    { game: "SV WB", id: "324999671026", image: "" },
    { game: "Limbus Company", id: "", image: "" },
  ],

  // ---------- 社交連結 ----------
  // icon 支援：facebook / mail / discord / instagram
  // url 留空字串 "" 代表不能點擊，純顯示文字（例如 Discord 帳號）
  social: [
    { icon: "facebook", label: "臉書", value: "慕伊", url: "https://www.facebook.com/chenen.yu.7?locale=zh_TW" },
    { icon: "mail", label: "電子郵件", value: "q7w43tnrl@gmail.com", url: "mailto:q7w43tnrl@gmail.com" },
    { icon: "discord", label: "Discord", value: ".mui_7439", url: "" },
    { icon: "instagram", label: "IG", value: "mizuki_7439", url: "https://www.instagram.com/mizuki_7439" },
  ],
};

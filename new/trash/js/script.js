/**
 * ═════════════════════════════════════════════════════════════════════════════
 *  ROYAL PICHWAI WEDDING INVITATION — JAVASCRIPT ENGINE
 * ═════════════════════════════════════════════════════════════════════════════
 *  Wedding celebration of Mukund Mittal & Yashi Agrawal (#SHIfoUNDlove)
 */

(function () {
  "use strict";

  // ── 1. ASSET DEFINITIONS & CONSTANTS ─────────────────────────────────────────
  const ASSETS = {
    darkBg: "assets/hero/pn-hro-bg-courtyard-dark-m-v03.webp",
    litBg: "assets/hero/pn-hro-bg-courtyard-lit-m-v03.webp",
    darkBgDesktop: "assets/hero/pn-hro-bg-courtyard-dark-D-v03.webp",
    litBgDesktop: "assets/hero/pn-hro-bg-courtyard-lit-d-v03.webp",
    rope: "assets/hero/pn-hro-el-rope-hemp-pull-x-v01.webp",
    lotusClosed: "assets/hero/pn-rvl-btn-lotus-closed-x-v01.webp",
    lotusOpen: "assets/hero/pn-rvl-btn-lotus-open-x-v01.webp",
    lotusGlow: "assets/hero/pn-fx-ovl-lotus-glow-burst-x-v01.webp",
    jhoomer: "assets/shared/pn-shr-mot-jhoomer-hanging-x-v01.webp",
    floralBush: "assets/hero/pn-shr-mot-floral-bush-cluster-x-v01.webp",
    diya: "assets/hero/pn-shr-mot-diya-glow-x-v01.webp",
    petal: "assets/invite/petal.webp"
  };

  const GAL_FRAMES = {
    landscape: "assets/gallery/pn-gal-fr-hanging-landscape-x-v01.webp",
    portrait: "assets/gallery/pn-gal-fr-hanging-portrait-x-v01.webp",
    hero: "assets/gallery/pn-gal-fr-hanging-hero-arch-x-v01.webp"
  };

  const rmq = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

  // ── 2. WEB AUDIO SYNTHESIZER (CEREMONIAL SOUNDS) ─────────────────────────────
  const Sound = {
    _ctx: null,
    get ctx() {
      if (!this._ctx) {
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) this._ctx = new AudioContextClass();
        } catch (e) {
          console.warn("[Audio] Context unavailable:", e);
        }
      }
      return this._ctx;
    },
    _play(fn) {
      if (rmq) return;
      try {
        const c = this.ctx;
        if (!c) return;
        if (c.state === "suspended") {
          c.resume().then(fn).catch(() => {});
        } else {
          fn();
        }
      } catch (e) {}
    },
    bell() {
      this._play(() => {
        const c = this.ctx;
        if (!c) return;
        const now = c.currentTime;
        [[528, 0.3, 2], [1056, 0.14, 1.4], [792, 0.1, 1.7]].forEach(([freq, gainVal, dur]) => {
          const osc = c.createOscillator();
          const gain = c.createGain();
          osc.connect(gain);
          gain.connect(c.destination);
          osc.type = "sine";
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(gainVal, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
          osc.start(now);
          osc.stop(now + dur + 0.05);
        });
      });
    },
    ambient() {
      this._play(() => {
        const c = this.ctx;
        if (!c) return;
        const now = c.currentTime;
        [[220, 0.055, 4], [330, 0.04, 3.5], [440, 0.048, 4.8], [660, 0.028, 3.2]].forEach(([freq, gainVal, dur], idx) => {
          const osc = c.createOscillator();
          const gain = c.createGain();
          osc.connect(gain);
          gain.connect(c.destination);
          osc.type = "sine";
          osc.frequency.value = freq;
          const startT = now + idx * 0.18;
          gain.gain.setValueAtTime(0, startT);
          gain.gain.linearRampToValueAtTime(gainVal, startT + 0.55);
          gain.gain.exponentialRampToValueAtTime(0.0001, startT + dur);
          osc.start(startT);
          osc.stop(startT + dur + 0.1);
        });
      });
    },
    lotus() {
      this._play(() => {
        const c = this.ctx;
        if (!c) return;
        const now = c.currentTime;
        [[396, 0.2, 1.6], [528, 0.15, 1.4], [792, 0.09, 1.1]].forEach(([freq, gainVal, dur], idx) => {
          const osc = c.createOscillator();
          const gain = c.createGain();
          osc.connect(gain);
          gain.connect(c.destination);
          osc.type = "sine";
          const startT = now + idx * 0.1;
          osc.frequency.setValueAtTime(freq * 0.88, startT);
          osc.frequency.exponentialRampToValueAtTime(freq, startT + 0.28);
          gain.gain.setValueAtTime(0, startT);
          gain.gain.linearRampToValueAtTime(gainVal, startT + 0.18);
          gain.gain.exponentialRampToValueAtTime(0.0001, startT + dur);
          osc.start(startT);
          osc.stop(startT + dur + 0.1);
        });
      });
    }
  };

  // ── 3. DATA & CONFIGURATION SYNCHRONIZATION ─────────────────────────────────
  let config = window.__WEDDING_CONFIG__ || {};

  function applyConfigToPage() {
    config = window.__WEDDING_CONFIG__ || {};
    const couple = config.couple || {};
    const invite = config.invite || {};
    const story = config.story || {};
    const rsvp = config.rsvp || {};
    const music = config.music || {};
    const closing = config.closing || {};

    // Page Title
    if (couple.groom && couple.bride) {
      document.title = `${couple.groom} & ${couple.bride}'s Wedding | ${couple.hashtag || "#SHIfoUNDlove"}`;
    }

    // Intro Background images responsive update
    const isDesk = isDesktop();
    const darkBgEl = document.getElementById("introBgDark");
    const litBgEl = document.getElementById("introBgLit");
    if (darkBgEl) darkBgEl.src = isDesk ? ASSETS.darkBgDesktop : ASSETS.darkBg;
    if (litBgEl) litBgEl.src = isDesk ? ASSETS.litBgDesktop : ASSETS.litBg;

    // Intro Names
    const introNames = document.getElementById("introNames");
    if (introNames && couple.groom && couple.bride) {
      introNames.innerHTML = `<span class="word">${couple.groom}</span> <span class="word amp-wrap"><span class="amp">&amp;</span></span><br><span class="word">${couple.bride}</span>`;
    }

    // Intro Date & Venue
    const introDate = document.getElementById("introDate");
    if (introDate && (couple.displayDate || couple.date)) {
      introDate.textContent = couple.displayDate || couple.date;
    }
    const introVenue = document.getElementById("introVenue");
    if (introVenue && couple.venue) {
      introVenue.textContent = couple.venue;
    }

    // Formal Invite Names
    const invNames = document.querySelector(".inv-names");
    if (invNames && couple.groom && couple.bride) {
      invNames.innerHTML = `${couple.groom} <span class="inv-amp">&amp;</span> ${couple.bride}`;
    }

    // Families Quote (Blessings)
    const invBlessingAlt = document.querySelector(".inv-blessing-alt-line1");
    if (invBlessingAlt && (invite.familiesQuote || invite.generalBlessing)) {
      invBlessingAlt.textContent = `“${invite.familiesQuote || invite.generalBlessing}”`;
    }

    // Family Details (Bride & Groom, Parents, Siblings - 3 distinct lines)
    const invParents = document.getElementById("invParents");
    if (invParents && (invite.brideParents || invite.groomParents)) {
      invParents.innerHTML = `
        <div class="inv-parent-block">
          <span class="inv-parent-name">${couple.brideFull || couple.bride}</span>
          <span class="inv-parent-parents">${invite.brideParents || ""}</span>
          <span class="inv-parent-sibling">${invite.brideSibling || ""}</span>
        </div>
        <div class="inv-parent-block">
          <span class="inv-parent-name">${couple.groomFull || couple.groom}</span>
          <span class="inv-parent-parents">${invite.groomParents || ""}</span>
          <span class="inv-parent-sibling">${invite.groomSibling || ""}</span>
        </div>
      `;
    }

    // Formal Invite Date & Venue
    const invDate = document.querySelector(".inv-date");
    if (invDate && (couple.displayDate || couple.date)) {
      invDate.textContent = couple.displayDate || couple.date;
    }
    const invVenue = document.querySelector(".inv-venue");
    if (invVenue && couple.venue) {
      invVenue.textContent = couple.venue;
    }

    // Meet the Couple Story
    const cplStoryBody = document.querySelector(".cpl-story-body");
    if (cplStoryBody && story.body) {
      cplStoryBody.textContent = story.body;
    }
    const cplTags = document.getElementById("cplTags");
    if (cplTags && story.tags && story.tags.length > 0) {
      cplTags.innerHTML = story.tags.map(t => `<span class="cpl-tag-chip">${t}</span>`).join("");
      cplTags.setAttribute("aria-hidden", "false");
    }
    const cplHashtag = document.getElementById("cplHashtag");
    if (cplHashtag && couple.hashtag) {
      cplHashtag.textContent = couple.hashtag;
      cplHashtag.removeAttribute("hidden");
    }

    // RSVP Section Deadline
    const rsvpDeadline = document.getElementById("rsvpDeadline");
    if (rsvpDeadline && rsvp.deadline) {
      rsvpDeadline.textContent = rsvp.deadline;
    }

    // WhatsApp RSVP Button
    const rsvpWhatsappBtn = document.getElementById("rsvpWhatsappBtn");
    if (rsvpWhatsappBtn && couple.whatsapp) {
      const cleanPhone = couple.whatsapp.replace(/\D/g, "");
      const msg = encodeURIComponent(rsvp.whatsappMessage || `Hello ${couple.groom} & ${couple.bride}, I am delighted to attend your wedding.`);
      rsvpWhatsappBtn.href = `https://wa.me/${cleanPhone}?text=${msg}`;
      const btnInner = rsvpWhatsappBtn.querySelector(".rsvp-btn-inner");
      if (btnInner && rsvp.btnText) btnInner.textContent = rsvp.btnText;
    }

    // Google Calendar Link
    const rsvpGcalBtn = document.getElementById("rsvpGcalBtn");
    if (rsvpGcalBtn && rsvp.calendarEvent) {
      const cal = rsvp.calendarEvent;
      const calTitle = encodeURIComponent(cal.title || `${couple.groom} & ${couple.bride}'s Wedding`);
      const calDates = `${cal.startDate || "20270126"}/${cal.endDate || "20270129"}`;
      const calLoc = encodeURIComponent(cal.location || couple.venue || "");
      const calDetails = encodeURIComponent(cal.details || "");
      rsvpGcalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=${calDates}&location=${calLoc}&details=${calDetails}`;
    }

    // Closing Names, Quote & Hashtag
    const closingNames = document.querySelector(".closing-names");
    if (closingNames && couple.groom && couple.bride) {
      closingNames.textContent = `${couple.groom} & ${couple.bride}`;
    }
    const closingQuote = document.getElementById("closingQuote");
    if (closingQuote && (closing.quote || closing.line)) {
      closingQuote.textContent = `“${closing.quote || closing.line}”`;
    }
    const closingDate = document.querySelector(".closing-date");
    if (closingDate && (couple.displayDate || couple.date)) {
      closingDate.textContent = couple.displayDate || couple.date;
    }
    const closingHashtag = document.getElementById("closingHashtag");
    if (closingHashtag && couple.hashtag) {
      closingHashtag.textContent = couple.hashtag;
    }

    // Background Audio Track
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic && music.src) {
      bgMusic.src = music.src;
    }

    // Start Live Countdown
    initCountdown();
  }

  // ── 4. LIVE ROYAL COUNTDOWN TIMER ENGINE ────────────────────────────────────
  function initCountdown() {
    const cdWrap = document.getElementById("rsvpCountdown");
    if (!cdWrap) return;

    const countdownData = config.countdown || {};
    const targetDateStr = countdownData.targetDate || "2027-01-27T19:00:00+05:30";
    const targetTime = new Date(targetDateStr).getTime();

    const cdDays = document.getElementById("cdDays");
    const cdHours = document.getElementById("cdHours");
    const cdMins = document.getElementById("cdMins");
    const cdSecs = document.getElementById("cdSecs");
    const cdTarget = document.getElementById("rsvpCdTarget");
    const cdLabel = document.getElementById("rsvpCdLabel");

    if (cdTarget && countdownData.displayTarget) {
      cdTarget.textContent = countdownData.displayTarget;
    }
    if (cdLabel && countdownData.targetName) {
      cdLabel.textContent = `COUNTDOWN TO ${countdownData.targetName.toUpperCase()}`;
    }

    function updateTimer() {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        if (cdDays) cdDays.textContent = "00";
        if (cdHours) cdHours.textContent = "00";
        if (cdMins) cdMins.textContent = "00";
        if (cdSecs) cdSecs.textContent = "00";
        if (cdLabel) cdLabel.textContent = "CELEBRATIONS HAVE BEGUN!";
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((difference % (1000 * 60)) / 1000);

      if (cdDays) cdDays.textContent = days < 10 ? `0${days}` : days;
      if (cdHours) cdHours.textContent = hours < 10 ? `0${hours}` : hours;
      if (cdMins) cdMins.textContent = mins < 10 ? `0${mins}` : mins;
      if (cdSecs) cdSecs.textContent = secs < 10 ? `0${secs}` : secs;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // ── 5. CELEBRATION EVENTS RENDERING & SMOOTH FARMAN UNROLL ──────────────────
  function renderEvents() {
    const container = document.getElementById("evtStops");
    if (!container) return;
    container.innerHTML = "";

    const eventsList = (config.events && config.events.length > 0) ? config.events : [];
    if (!eventsList.length) return;

    const lotusIndex = Math.floor((eventsList.length - 1) / 2);

    const goldDividerSvg = `
      <svg width="88" height="18" viewBox="0 0 88 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="fgl" x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="rgba(216,169,87,0)"/>
            <stop offset="100%" stop-color="rgba(216,169,87,.48)"/>
          </linearGradient>
          <linearGradient id="fgr" x1="56" y1="0" x2="88" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="rgba(216,169,87,.48)"/>
            <stop offset="100%" stop-color="rgba(216,169,87,0)"/>
          </linearGradient>
        </defs>
        <line x1="0" y1="9" x2="32" y2="9" stroke="url(#fgl)" stroke-width="1"/>
        <circle cx="37" cy="9" r="1.8" fill="rgba(216,169,87,.38)"/>
        <circle cx="44" cy="9" r="3.2" fill="rgba(216,169,87,.58)"/>
        <circle cx="51" cy="9" r="1.8" fill="rgba(216,169,87,.38)"/>
        <line x1="56" y1="9" x2="88" y2="9" stroke="url(#fgr)" stroke-width="1"/>
      </svg>
    `;

    const mapPinSvg = `
      <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:inline-block;vertical-align:middle;margin-right:4px">
        <path d="M5.5 0C2.46 0 0 2.46 0 5.5c0 4.12 5.5 8.5 5.5 8.5S11 9.62 11 5.5C11 2.46 8.54 0 5.5 0Z" fill="currentColor" opacity=".72"/>
        <circle cx="5.5" cy="5.5" r="2" fill="#fff" opacity=".88"/>
      </svg>
    `;

    eventsList.forEach((evt, idx) => {
      const article = document.createElement("article");
      const isLeft = idx % 2 === 0;
      const isMain = evt.id === "baraat-reception" || evt.id === "phere" || evt.id === "ring-sangeet";
      article.className = `farman-stop ${isLeft ? "farman-left" : "farman-right"}${isMain ? " farman-stop--main" : ""}`;
      article.setAttribute("role", "listitem");
      article.setAttribute("data-event", evt.id);
      article.setAttribute("data-farman-index", idx);

      const noteHtml = evt.note ? `<p class="farman-note">${evt.note}</p>` : "";
      const mapHtml = evt.map ? `<a class="farman-map" href="${evt.map}" target="_blank" rel="noopener noreferrer">${mapPinSvg}Open in Maps</a><div class="farman-map-rule" aria-hidden="true"></div>` : "";

      article.innerHTML = `
        <div class="farman-rolled-wrap" aria-hidden="true">
          <img class="farman-rolled-img" src="assets/event/pn-evt-farman-rolled-x-v01.webp" alt="" draggable="false" decoding="async">
        </div>
        <div class="farman-open-wrap">
          <img class="farman-parchment-img" src="assets/event/pn-evt-farman-open-x-v01.webp" alt="" aria-hidden="true" draggable="false" decoding="async">
          <div class="farman-dust-layer" aria-hidden="true"></div>
          <div class="farman-content" aria-label="${evt.name} details">
            <img class="farman-motif" src="${evt.icon}" alt="${evt.name} motif" decoding="async">
            <h3 class="farman-name">${evt.name}</h3>
            <div class="farman-rule" aria-hidden="true"></div>
            <p class="farman-datetime">${evt.date}${evt.time ? ` &middot; ${evt.time}` : ""}</p>
            <p class="farman-venue">${evt.venue}</p>
            ${noteHtml}
            ${mapHtml}
          </div>
        </div>
      `.trim();

      container.appendChild(article);
      farmanObserver.observe(article);

      if (idx < eventsList.length - 1) {
        const divider = document.createElement("div");
        if (idx === lotusIndex) {
          divider.className = "farman-inter farman-inter--lotus";
          divider.setAttribute("aria-hidden", "true");
          divider.innerHTML = `<img src="assets/invite/pn-inv-div-lotus-divider-x-v01.webp" alt="" decoding="async" loading="lazy">`;
        } else {
          divider.className = "farman-inter";
          divider.setAttribute("aria-hidden", "true");
          divider.innerHTML = goldDividerSvg;
        }
        container.appendChild(divider);
        generalObserver.observe(divider);
      }
    });
  }

  // Slower, smoother, and delayed unrolling observer for events
  const farmanObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      farmanObserver.unobserve(el);

      // 1. Show rolled scroll smoothly first
      el.classList.add("is-entering");

      // 2. Start unrolling later and deliberately (650ms delay)
      setTimeout(() => {
        el.classList.add("is-unrolling");
      }, 650);

      // 3. Mark as fully open after slow animation completes
      setTimeout(() => {
        el.classList.add("is-open");
      }, 2300);
    });
  }, { threshold: 0.28, rootMargin: "0px 0px -8% 0px" });

  // ── 6. GALLERY WALL & LIGHTBOX ───────────────────────────────────────────────
  let lbPhotos = [];
  let lbIndex = 0;

  function renderGallery() {
    const galWall = document.getElementById("galWall");
    if (!galWall) return;
    galWall.innerHTML = "";

    const photos = (config.gallery && config.gallery.photos) ? config.gallery.photos : [];
    if (!photos.length) return;

    lbPhotos = photos;

    photos.forEach((photo, idx) => {
      const slot = document.createElement("div");
      const orient = photo.orient || "portrait";
      slot.className = `gal-frame-slot gal-slot-${orient}`;
      slot.setAttribute("role", "listitem");
      slot.style.transitionDelay = `${idx * 120}ms`;

      const frameImgSrc = GAL_FRAMES[orient] || GAL_FRAMES.portrait;

      slot.innerHTML = `
        <div class="gal-frame-inner">
          <div class="gal-frame-dust"></div>
          <div class="gal-photo-wrap">
            <img class="gal-photo" src="${photo.src}" alt="${photo.caption || ""}" decoding="async" loading="lazy">
          </div>
          <img class="gal-frame-img" src="${frameImgSrc}" alt="" aria-hidden="true" decoding="async" draggable="false">
        </div>
      `;

      const wrap = slot.querySelector(".gal-photo-wrap");
      if (wrap) {
        wrap.addEventListener("click", () => openLightbox(idx));
      }

      galWall.appendChild(slot);
      generalObserver.observe(slot);
    });

    // Lightbox Controls
    const galLbClose = document.getElementById("galLbClose");
    const galLbPrev = document.getElementById("galLbPrev");
    const galLbNext = document.getElementById("galLbNext");
    const galLightbox = document.getElementById("galLightbox");

    if (galLbClose) galLbClose.onclick = closeLightbox;
    if (galLbPrev) galLbPrev.onclick = () => navLightbox(-1);
    if (galLbNext) galLbNext.onclick = () => navLightbox(1);
    if (galLightbox) {
      galLightbox.onclick = (e) => {
        if (e.target === galLightbox) closeLightbox();
      };
    }
  }

  function openLightbox(idx) {
    lbIndex = idx;
    const lightbox = document.getElementById("galLightbox");
    if (!lightbox || !lbPhotos[lbIndex]) return;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    updateLightbox();
  }

  function closeLightbox() {
    const lightbox = document.getElementById("galLightbox");
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  function navLightbox(dir) {
    if (!lbPhotos.length) return;
    lbIndex = (lbIndex + dir + lbPhotos.length) % lbPhotos.length;
    updateLightbox();
  }

  function updateLightbox() {
    const photo = lbPhotos[lbIndex];
    const img = document.getElementById("galLbImg");
    const cap = document.getElementById("galLbCaption");
    if (!photo || !img) return;
    img.src = photo.src;
    img.alt = photo.caption || "";
    if (cap) cap.textContent = photo.caption || "";
  }

  // ── 7. THINGS TO KNOW (GUEST ESSENTIALS) ────────────────────────────────────
  function renderTTK() {
    const grid = document.getElementById("ttkGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const items = (config.thingsToKnow && config.thingsToKnow.length > 0)
      ? config.thingsToKnow.filter(i => i.enabled !== false)
      : [];

    if (!items.length) {
      const section = document.getElementById("things");
      if (section) section.style.display = "none";
      return;
    }

    items.forEach((item, idx) => {
      const card = document.createElement("article");
      card.className = "ttk-card";
      card.setAttribute("role", "listitem");
      card.style.transitionDelay = `${idx * 80}ms`;

      card.innerHTML = `
        <div class="ttk-card-icon-wrap">
          <img class="ttk-card-icon" src="${item.icon}" alt="" aria-hidden="true" decoding="async" loading="lazy">
        </div>
        <div class="ttk-card-rule" aria-hidden="true"></div>
        <h3 class="ttk-card-title">${item.title}</h3>
        <p class="ttk-card-body">${item.description}</p>
      `;

      grid.appendChild(card);
      generalObserver.observe(card);
    });
  }

  // ── 8. INTRO & ROPE PULL HERO INTERACTION ───────────────────────────────────
  let isDragging = false;
  let dragStartY = 0;
  let triggered = false;
  const PULL_THRESHOLD = 75;

  function initIntro() {
    const introEl = document.getElementById("intro");
    const ropeBtn = document.getElementById("ropeButton");
    const ropeImg = document.getElementById("ropeImg");
    const lotusBtn = document.getElementById("lotusButton");
    const skipBtn = document.getElementById("skipIntro");
    const introInstruction = document.getElementById("introInstruction");

    if (!introEl || !ropeBtn) return;

    // Build intro ambient particles
    buildIntroDust();
    buildIntroPetals();

    // Rope Interaction Handlers
    function triggerIntro() {
      if (triggered) return;
      triggered = true;

      Sound.bell();
      playBackgroundMusic();

      // Immediately fade out and hide "Pull to light us up" instruction
      if (introInstruction) {
        introInstruction.classList.add("is-hidden");
        introInstruction.style.opacity = "0";
        introInstruction.style.visibility = "hidden";
      }

      if (introEl) {
        introEl.classList.remove("is-waiting");
      }

      if (ropeBtn) {
        ropeBtn.classList.remove("rope-idle", "is-pulling");
        ropeBtn.style.transform = "translateX(-50%) rotate(5deg) translateY(20px)";
      }

      setTimeout(() => {
        if (introEl) introEl.classList.add("is-lit");
        Sound.ambient();
      }, 200);

      setTimeout(() => {
        if (introEl) introEl.classList.add("show-names");
      }, 1000);

      setTimeout(() => {
        if (introEl) introEl.classList.add("show-date");
      }, 1900);

      setTimeout(() => {
        if (introEl) introEl.classList.add("show-venue");
      }, 2300);

      setTimeout(() => {
        if (introEl) introEl.classList.add("show-lotus");
      }, 2800);
    }

            // Immediate audio startup engine for mobile and touch devices
    function startMusicImmediate() {
      const bgMusic = document.getElementById("bgMusic");
      const musicToggle = document.getElementById("musicToggle");
      if (bgMusic) {
        bgMusic.volume = 0.8;
        const p = bgMusic.play();
        if (p !== undefined) {
          p.then(() => {
            if (musicToggle) musicToggle.classList.add("is-playing");
          }).catch((err) => {
            console.log("[Audio] Attempt:", err);
          });
        }
      }
      if (Sound && Sound.ctx && Sound.ctx.state === "suspended") {
        Sound.ctx.resume().catch(() => {});
      }
    }

    // Touch & Pointer Events with instant audio playback on rope touch
    ropeBtn.addEventListener("touchstart", (e) => {
      startMusicImmediate();
    }, { passive: true });

    ropeBtn.addEventListener("pointerdown", (e) => {
      startMusicImmediate();
      if (triggered) return;
      isDragging = true;
      dragStartY = e.clientY;
      ropeBtn.classList.add("is-pulling");
      ropeBtn.style.transition = "none";
      if (ropeImg) ropeImg.style.transition = "none";
      if (ropeBtn.setPointerCapture) {
        try { ropeBtn.setPointerCapture(e.pointerId); } catch (_) {}
      }
    });

    const handleDragMove = (clientY) => {
      if (!isDragging || triggered) return;
      const deltaY = Math.max(0, clientY - dragStartY);
      const stretch = 1 + Math.min(0.4, deltaY / 200);
      ropeBtn.style.transition = "none";
      if (ropeImg) ropeImg.style.transition = "none";
      ropeBtn.style.transform = `translateX(-50%) translateY(${deltaY * 0.5}px)`;
      if (ropeImg) ropeImg.style.transform = `scaleY(${stretch})`;

      if (deltaY >= PULL_THRESHOLD) {
        isDragging = false;
        triggerIntro();
        startMusicImmediate();
      }
    };

    ropeBtn.addEventListener("pointermove", (e) => {
      handleDragMove(e.clientY);
    });

    ropeBtn.addEventListener("touchmove", (e) => {
      if (!isDragging || triggered) return;
      if (e.cancelable) e.preventDefault();
      const touch = e.touches && e.touches[0];
      if (touch) handleDragMove(touch.clientY);
    }, { passive: false });

    const stopDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      if (!triggered && ropeBtn) {
        ropeBtn.classList.remove("is-pulling");
        ropeBtn.style.transition = "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)";
        ropeBtn.style.transform = "translateX(-50%)";
        if (ropeImg) {
          ropeImg.style.transition = "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)";
          ropeImg.style.transform = "scaleY(1)";
        }
        setTimeout(() => {
          if (ropeBtn) ropeBtn.style.transition = "";
          if (ropeImg) ropeImg.style.transition = "";
        }, 350);
      }
    };

    ropeBtn.addEventListener("pointerup", stopDrag);
    ropeBtn.addEventListener("pointercancel", stopDrag);
    ropeBtn.addEventListener("touchend", (e) => {
      startMusicImmediate();
      if (!triggered && isDragging) {
        const touch = e.changedTouches && e.changedTouches[0];
        if (touch && (touch.clientY - dragStartY >= PULL_THRESHOLD)) {
          isDragging = false;
          triggerIntro();
        } else {
          stopDrag();
        }
      }
    });

    // Simple click without dragging gives an interactive spring tug hint and does NOT open website
    ropeBtn.addEventListener("click", (e) => {
      startMusicImmediate();
      if (!triggered && !isDragging) {
        // Physical tug & release animation to guide the user to pull down
        ropeBtn.style.transition = "transform 0.18s cubic-bezier(0.25, 1, 0.5, 1)";
        ropeBtn.style.transform = "translateX(-50%) translateY(16px)";
        if (ropeImg) {
          ropeImg.style.transition = "transform 0.18s cubic-bezier(0.25, 1, 0.5, 1)";
          ropeImg.style.transform = "scaleY(1.05)";
        }
        setTimeout(() => {
          if (!triggered && !isDragging) {
            ropeBtn.style.transition = "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)";
            ropeBtn.style.transform = "translateX(-50%)";
            if (ropeImg) {
              ropeImg.style.transition = "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)";
              ropeImg.style.transform = "scaleY(1)";
            }
            setTimeout(() => {
              if (ropeBtn) ropeBtn.style.transition = "";
              if (ropeImg) ropeImg.style.transition = "";
            }, 350);
          }
        }, 180);
      }
    });

    // Lotus Button Action (Enter Site)
    if (lotusBtn) {
      const handleLotusTap = () => {
        startMusicImmediate();
        Sound.lotus();
        lotusBtn.classList.add("is-open");
        setTimeout(revealMainSite, 800);
      };
      lotusBtn.addEventListener("touchstart", () => { startMusicImmediate(); }, { passive: true });
      lotusBtn.addEventListener("pointerdown", () => { startMusicImmediate(); }, { passive: true });
      lotusBtn.addEventListener("click", handleLotusTap);
    }

    // Skip Intro Button Action (Instant Music & Site Reveal)
    if (skipBtn) {
      const handleSkipTap = () => {
        startMusicImmediate();
        playBackgroundMusic();
        revealMainSite();
      };
      skipBtn.addEventListener("touchstart", () => { startMusicImmediate(); }, { passive: true });
      skipBtn.addEventListener("pointerdown", () => { startMusicImmediate(); }, { passive: true });
      skipBtn.addEventListener("click", handleSkipTap);
    }

    // Waiting cue timeout
    setTimeout(() => {
      if (!triggered && introEl && !introInstruction.classList.contains("is-hidden")) {
        introEl.classList.add("is-waiting");
      }
    }, 1200);
  }

  function revealMainSite() {
    const introEl = document.getElementById("intro");
    const floatingMenu = document.getElementById("floatingMenu");
    const inviteSection = document.getElementById("invite");

    playBackgroundMusic();

    if (introEl) introEl.classList.add("is-complete");
    document.body.classList.remove("intro-active");
    if (floatingMenu) floatingMenu.classList.add("is-visible");
    if (inviteSection) {
      setTimeout(() => inviteSection.classList.add("invite-active"), 200);
    }

    // Start rose petal shower
    startRosePetalShower();
  }

  function buildIntroDust() {
    const container = document.getElementById("introDust");
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const dot = document.createElement("div");
      dot.className = "dust-particle";
      const sz = 1.5 + Math.random() * 2.5;
      dot.style.cssText = `
        width: ${sz}px;
        height: ${sz}px;
        left: ${15 + Math.random() * 70}%;
        bottom: ${10 + Math.random() * 60}%;
        animation-duration: ${6 + Math.random() * 8}s;
        animation-delay: ${Math.random() * 5}s;
      `;
      container.appendChild(dot);
    }
  }

  function buildIntroPetals() {
    const container = document.getElementById("introPetals");
    if (!container) return;
    for (let i = 0; i < 16; i++) {
      const petal = document.createElement("div");
      petal.className = "petal";
      const w = 6 + Math.random() * 8;
      petal.style.cssText = `
        left: ${10 + Math.random() * 80}%;
        bottom: ${Math.random() * 20}%;
        width: ${w}px;
        height: ${w * 0.65}px;
        animation-duration: ${8 + Math.random() * 10}s;
        animation-delay: ${Math.random() * 6}s;
      `;
      container.appendChild(petal);
    }
  }

  // ── 9. CANVASES: ROSE PETALS & STARFIELD & HIGH-DENSITY ROYAL FIREWORKS ──────
  function startRosePetalShower() {
    const canvas = document.getElementById("invitePetals");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }, { passive: true });

    const petalImg = new Image();
    petalImg.src = ASSETS.petal;

    const petals = [];
    for (let i = 0; i < 18; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        size: 16 + Math.random() * 16,
        vy: 1 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.8,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.04
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach((p) => {
        p.y += p.vy;
        p.x += Math.sin(p.y * 0.02) + p.vx;
        p.rot += p.vRot;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (petalImg.complete && petalImg.naturalWidth) {
          ctx.drawImage(petalImg, -p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.fillStyle = "rgba(223, 162, 168, 0.6)";
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size / 2, p.size / 3, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  function initStarfield() {
    const canvas = document.getElementById("evtStars");
    const section = document.getElementById("events");
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = section.offsetWidth);
    let h = (canvas.height = section.offsetHeight);

    window.addEventListener("resize", () => {
      w = canvas.width = section.offsetWidth;
      h = canvas.height = section.offsetHeight;
    }, { passive: true });

    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.5 + Math.random() * 1.5,
      alpha: 0.2 + Math.random() * 0.6,
      spd: 0.01 + Math.random() * 0.02
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      stars.forEach((s) => {
        s.alpha += Math.sin(Date.now() * s.spd) * 0.008;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 238, 205, ${Math.max(0.1, Math.min(0.8, s.alpha))})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  // High-Density Royal Fireworks Engine (Lag-Free with Visibility Change & Max Particle Cap)
  function initFireworks() {
    const canvas = document.getElementById("rsvpFireworksCanvas");
    if (!canvas || rmq) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    window.addEventListener("resize", () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }, { passive: true });

    const particles = [];
    const MAX_PARTICLES = 350;
    const colorThemes = [
      ["rgba(240, 200, 106,", "rgba(255, 230, 140,", "rgba(216, 169, 87,"], // Royal Gold
      ["rgba(235, 90, 120,", "rgba(255, 140, 165,", "rgba(180, 50, 80,"],   // Pichwai Crimson Rose
      ["rgba(255, 250, 235,", "rgba(245, 225, 180,", "rgba(255, 255, 255,"],// Champagne Sparkle
      ["rgba(156, 217, 181,", "rgba(120, 195, 150,", "rgba(200, 245, 220,"],// Emerald Mint
      ["rgba(195, 165, 250,", "rgba(220, 190, 255,", "rgba(160, 120, 230,"] // Royal Violet
    ];

    let fireworkTimer = null;
    let pendingBurstTimers = [];

    function clearAllTimers() {
      if (fireworkTimer) {
        clearTimeout(fireworkTimer);
        fireworkTimer = null;
      }
      pendingBurstTimers.forEach(id => clearTimeout(id));
      pendingBurstTimers = [];
    }

    function createSingleBurst(customX, customY, type = "peony") {
      if (document.hidden) return; // Never spawn particles when tab is in background

      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - (MAX_PARTICLES - 80));
      }

      const cx = customX !== undefined ? customX : w * (0.12 + Math.random() * 0.76);
      const cy = customY !== undefined ? customY : h * (0.08 + Math.random() * 0.38);
      const theme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
      const count = type === "grand" ? 120 : (70 + Math.floor(Math.random() * 40));

      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES + 60) break;
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
        const spd = (type === "grand" ? 1.8 : 1.2) + Math.random() * (type === "grand" ? 3.6 : 2.8);
        const col = theme[Math.floor(Math.random() * theme.length)];
        const isGlitter = Math.random() > 0.65;

        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          life: 1,
          decay: (0.009 + Math.random() * 0.009) * (type === "willow" ? 0.7 : 1),
          col: col,
          size: 1.2 + Math.random() * 2.2,
          gravity: type === "willow" ? 0.038 : 0.024,
          drag: 0.976,
          isGlitter: isGlitter
        });
      }
    }

    // Volley of multiple fireworks across sky
    function launchVolley() {
      if (document.hidden) return;
      createSingleBurst(w * 0.22, h * 0.18, "peony");
      const t1 = setTimeout(() => { if (!document.hidden && isRsvpActive) createSingleBurst(w * 0.78, h * 0.15, "peony"); }, 180);
      const t2 = setTimeout(() => { if (!document.hidden && isRsvpActive) createSingleBurst(w * 0.50, h * 0.24, "grand"); }, 420);
      const t3 = setTimeout(() => { if (!document.hidden && isRsvpActive) createSingleBurst(w * 0.35, h * 0.12, "willow"); }, 700);
      const t4 = setTimeout(() => { if (!document.hidden && isRsvpActive) createSingleBurst(w * 0.65, h * 0.28, "peony"); }, 950);
      pendingBurstTimers.push(t1, t2, t3, t4);
    }

    // Rapid, continuous celebratory launches
    function scheduleNextBurst() {
      if (document.hidden || !isRsvpActive) return;

      createSingleBurst();
      if (Math.random() > 0.65) {
        const tExtra = setTimeout(() => {
          if (!document.hidden && isRsvpActive) createSingleBurst();
        }, 140);
        pendingBurstTimers.push(tExtra);
      }
      const nextDelay = 450 + Math.random() * 700;
      fireworkTimer = setTimeout(scheduleNextBurst, nextDelay);
    }

    // Trigger on RSVP intersection
    const rsvpSec = document.getElementById("rsvp");
    let isRsvpActive = false;

    if (rsvpSec) {
      new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !isRsvpActive) {
            isRsvpActive = true;
            if (!document.hidden) {
              launchVolley();
              scheduleNextBurst();
            }
          } else if (!e.isIntersecting && isRsvpActive) {
            isRsvpActive = false;
            clearAllTimers();
            particles.length = 0;
          }
        });
      }, { threshold: 0.08 }).observe(rsvpSec);
    }

    // Tab / Screen visibility change handler: prevent backlog when switching tabs or apps
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearAllTimers();
        particles.length = 0;
      } else {
        particles.length = 0;
        if (isRsvpActive) {
          launchVolley();
          scheduleNextBurst();
        }
      }
    });

    function animate() {
      if (document.hidden) {
        requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      if (particles.length === 0) {
        requestAnimationFrame(animate);
        return;
      }

      ctx.globalCompositeOperation = "lighter";

      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = p.isGlitter ? (Math.random() > 0.3 ? p.life : p.life * 0.3) : p.life;
        const radius = Math.max(0.5, p.size * p.life);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.col}${alpha.toFixed(3)})`;
        ctx.fill();

        if (p.life > 0.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.col}${(alpha * 0.25).toFixed(3)})`;
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  // ── 10. SCROLL REVEALS & SECRET GARDEN TREE CURTAIN (SIGNIFICANTLY DELAYED & SLOW) ─
  const generalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        generalObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  function initTreeCurtain() {
    const coupleSec = document.getElementById("couple");
    const treeL = document.getElementById("cplTreeLeft");
    const treeR = document.getElementById("cplTreeRight");
    if (!coupleSec || !treeL || !treeR || rmq) return;

    treeL.style.transition = "transform 0.85s cubic-bezier(0.12, 0.9, 0.25, 1)";
    treeR.style.transition = "transform 0.85s cubic-bezier(0.12, 0.9, 0.25, 1)";

    function updateTrees() {
      const rect = coupleSec.getBoundingClientRect();
      const winH = window.innerHeight;

      // Keep trees 100% closed until section is scrolled well into the upper half of screen (top <= 40% of winH)
      const startThreshold = winH * 0.40;
      const endThreshold = -winH * 0.20;

      let progress = 0;
      if (rect.top <= startThreshold) {
        progress = Math.max(0, Math.min(1, (startThreshold - rect.top) / (startThreshold - endThreshold)));
      }

      const eased = Math.sin((progress * Math.PI) / 2);
      const maxOffset = isDesktop() ? 120 : 110;
      const offset = (eased * maxOffset).toFixed(2);

      treeL.style.transform = `translateX(-${offset}%)`;
      treeR.style.transform = `translateX(${offset}%)`;
    }

    window.addEventListener("scroll", updateTrees, { passive: true });
    window.addEventListener("resize", updateTrees, { passive: true });
    updateTrees();
  }

  // ── 11. BACKGROUND MUSIC & NAVIGATION COMPASS ───────────────────────────────
  function playBackgroundMusic() {
    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");
    if (!bgMusic) return;

    bgMusic.volume = 0.8;
    if (bgMusic.paused) {
      const playPromise = bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (musicToggle) musicToggle.classList.add("is-playing");
        }).catch(() => {
          // If browser policy deferred it, attach one-time resume on next touch
          const resumeOnTouch = () => {
            bgMusic.play().then(() => {
              if (musicToggle) musicToggle.classList.add("is-playing");
            }).catch(() => {});
            window.removeEventListener("touchstart", resumeOnTouch);
            window.removeEventListener("pointerdown", resumeOnTouch);
          };
          window.addEventListener("touchstart", resumeOnTouch, { passive: true });
          window.addEventListener("pointerdown", resumeOnTouch, { passive: true });
        });
      }
    } else {
      if (musicToggle) musicToggle.classList.add("is-playing");
    }
  }

  function initMusicAndMenu() {
    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");
    const menuToggle = document.getElementById("menuToggle");
    const floatingMenu = document.getElementById("floatingMenu");

    if (musicToggle && bgMusic) {
      musicToggle.addEventListener("click", () => {
        if (bgMusic.paused) {
          bgMusic.play().then(() => musicToggle.classList.add("is-playing")).catch(() => {});
        } else {
          bgMusic.pause();
          musicToggle.classList.remove("is-playing");
        }
      });
    }

    if (menuToggle && floatingMenu) {
      menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        floatingMenu.classList.toggle("is-open");
      });

      document.addEventListener("click", (e) => {
        if (!floatingMenu.contains(e.target)) {
          floatingMenu.classList.remove("is-open");
        }
      });
    }
  }

  // ── 12. BOOTSTRAP INITIALIZATION ───────────────────────────────────────────
  function init() {
    applyConfigToPage();
    initIntro();
    renderEvents();
    renderGallery();
    renderTTK();
    initTreeCurtain();
    initStarfield();
    initFireworks();
    initMusicAndMenu();

    document.querySelectorAll(".reveal-item").forEach(el => generalObserver.observe(el));
    const rsvpSec = document.getElementById("rsvp");
    if (rsvpSec) {
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting) rsvpSec.classList.add("rsvp-alive");
      }, { threshold: 0.1 }).observe(rsvpSec);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/*!
 * Save the Date — plain vanilla JavaScript
 * -----------------------------------------------------------------------
 * This is a framework-free rewrite of the original bundled/minified
 * app.js (which shipped Preact + hooks + your component code compiled
 * together via esbuild). It reproduces the same DOM structure and CSS
 * class names as before, so the existing css/styles.css needs no changes.
 *
 * Behavior:
 *  1. INTRO: a full-screen video with a "Tap to Begin" prompt. On the
 *     first tap/click/keypress it tries to play the muted video; once it
 *     ends (or stalls, or fails, or 12s pass) it transitions to the card.
 *  2. CARD: couple name, date (parsed into day / month / year), venue,
 *     location, all sitting inside a "jharoka" arch illustration.
 *  3. PETAL REVEAL: the date is hidden under a field of floating petal
 *     images. Tapping them scatters the petals outward along the arch's
 *     silhouette, revealing the date underneath, and the CTA buttons
 *     ("Save to Google Calendar" / WhatsApp "Send a Note") fade in.
 *
 * window.__STD_CONFIG__ supplies the couple's details (see index.html).
 * window.__STD_GALLERY_MODE__, if set, skips the intro video entirely
 * and starts directly on the card (used for template preview galleries).
 * -----------------------------------------------------------------------
 */
(function () {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  /* ----------------------------------------------------------------- *
   * Small DOM-building helpers (a tiny stand-in for the old l()/h())
   * ----------------------------------------------------------------- */

  // Build an HTML element. `props` may include className, style (object),
  // ref (callback), event handlers (onClick, onKeydown, ...), and plain
  // attributes. `children` may be strings, numbers, nodes, or falsy
  // values (falsy values are skipped, mirroring conditional JSX children).
  function el(tag, props) {
    var node = document.createElement(tag);
    props = props || {};

    Object.keys(props).forEach(function (key) {
      var value = props[key];
      if (value == null || value === false) return;

      if (key === 'className') {
        node.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(node.style, value);
      } else if (key === 'ref' && typeof value === 'function') {
        value(node);
      } else if (key.indexOf('on') === 0 && typeof value === 'function') {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (value === true) {
        node.setAttribute(key, '');
      } else {
        node.setAttribute(key, value);
      }
    });

    for (var i = 2; i < arguments.length; i++) {
      appendChild(node, arguments[i]);
    }
    return node;
  }

  function appendChild(node, child) {
    if (child == null || child === false) return;
    if (Array.isArray(child)) {
      child.forEach(function (c) { appendChild(node, c); });
      return;
    }
    if (typeof child === 'string' || typeof child === 'number') {
      node.appendChild(document.createTextNode(String(child)));
    } else {
      node.appendChild(child);
    }
  }

  // Build an SVG element (createElement doesn't work for SVG tags).
  function svgEl(tag, attrs) {
    var node = document.createElementNS(SVG_NS, tag);
    Object.keys(attrs || {}).forEach(function (key) {
      node.setAttribute(key, attrs[key]);
    });
    return node;
  }

  /* ----------------------------------------------------------------- *
   * Config
   * ----------------------------------------------------------------- */

  var DEFAULTS = {
    title: 'Save the Date',
    coupleName: 'Chitra & Prateek',
    date: '14 June 2026',
    venue: 'The Westin Sohna',
    location: 'Gurgaon, Haryana',
    calendarUrl: '',
    ctaText: 'Save to Google Calendar',
    footerNote: 'Scroll for Invitation',
    showVenue: true,
    showCity: true,
    showCta: true,
    whatsapp: '',
    showSendNote: false,
    sendNoteText: 'Send a Note'
  };

  function buildConfig() {
    var raw = window.__STD_CONFIG__ || {};
    return {
      title: raw.title || DEFAULTS.title,
      coupleName: raw.coupleName || DEFAULTS.coupleName,
      date: raw.date || DEFAULTS.date,
      venue: raw.venue || DEFAULTS.venue,
      location: raw.location || DEFAULTS.location,
      calendarUrl: raw.calendarUrl || DEFAULTS.calendarUrl,
      ctaText: raw.ctaText || DEFAULTS.ctaText,
      footerNote: raw.footerNote != null ? raw.footerNote : DEFAULTS.footerNote,
      showVenue: raw.showVenue !== false,
      showCity: raw.showCity !== false,
      showCta: raw.showCta !== false,
      whatsapp: raw.whatsapp || DEFAULTS.whatsapp,
      showSendNote: raw.showSendNote === true,
      sendNoteText: raw.sendNoteText || DEFAULTS.sendNoteText
    };
  }

  function parseDate(dateStr) {
    var match = /^(\d+)\s+(\w+)\s+(\d{4})$/.exec(String(dateStr).trim());
    if (match) {
      return { day: match[1].padStart(2, '0'), month: match[2], year: match[3] };
    }
    return { day: dateStr, month: '', year: '' };
  }

  function parseCoupleName(name) {
    var match = /^(.+?)\s*&\s*(.+)$/.exec(name);
    if (match) return { a: match[1].trim(), b: match[2].trim() };
    return { a: name, b: '' };
  }

  /* ----------------------------------------------------------------- *
   * Icons
   * ----------------------------------------------------------------- */

  function googleCalendarIcon() {
    var svg = svgEl('svg', { class: 'gicon', viewBox: '0 0 24 24', 'aria-hidden': 'true' });
    svg.appendChild(svgEl('path', {
      fill: '#fbf4e8',
      d: 'M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z'
    }));
    svg.appendChild(svgEl('circle', { cx: '12', cy: '15', r: '2.4', fill: '#d4ad6a' }));
    return svg;
  }

  function whatsappIcon() {
    var svg = svgEl('svg', { class: 'gicon', viewBox: '0 0 24 24', 'aria-hidden': 'true' });
    svg.appendChild(svgEl('path', {
      fill: '#fbf4e8',
      d: 'M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.087zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z'
    }));
    return svg;
  }

  /* ----------------------------------------------------------------- *
   * Petal reveal layer
   *
   * A field of petal images sits over the date. While idle they drift
   * gently (sinusoidal float). On the first pointerdown they scatter
   * outward toward the silhouette of the jharoka arch (two Bezier arcs
   * across the top, columns down each side, a row along the bottom),
   * each petal moving with its own delay/duration/spin/oscillation, and
   * the layer calls back once every petal has finished moving.
   * ----------------------------------------------------------------- */

  function createFeatherLayer(onRevealed) {
    var state = 'idle'; // 'idle' -> 'animating' -> 'done'
    var idleRafId = null;
    var scatterRafId = null;
    var petalNodes = [];
    var idleStart = performance.now();
    var prefersReducedMotion = !!(
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    var petals = generatePetalField();

    var layer = el('div', {
      className: 'feather-layer',
      style: { touchAction: 'none', cursor: 'pointer' }
    });

    petals.forEach(function (petal, index) {
      var petalWrap = el('div', {
        style: {
          position: 'absolute',
          left: petal.lp + '%',
          top: petal.tp + '%',
          width: petal.sz + '%',
          zIndex: String(petal.z),
          opacity: '1',
          transform: 'translate(-50%, -50%) rotate(' + petal.rot + 'deg)',
          pointerEvents: 'none'
        }
      }, el('img', {
        src: 'assets/petal_shaadi.webp',
        alt: '',
        draggable: 'false',
        style: {
          display: 'block',
          width: '100%',
          height: 'auto',
          userSelect: 'none',
          WebkitUserDrag: 'none',
          pointerEvents: 'none'
        }
      }));
      petalNodes[index] = petalWrap;
      layer.appendChild(petalWrap);
    });

    // Deterministic pseudo-random field (same seed every load, so the
    // petal layout is stable rather than reshuffling on every visit).
    function generatePetalField() {
      var seed = 1337;
      function rand() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      }

      var cols = 5, rows = 7, list = [], id = 0;

      function makePetal(id, lp, tp, z, rand) {
        return {
          id: id,
          lp: lp,
          tp: tp,
          sz: 34 + rand() * 22,
          rot: rand() * 180 - 90,
          z: z,
          fAmp: 1.8 + rand() * 2.8,
          fT: 2800 + rand() * 2600,
          fPh: rand() * Math.PI * 2,
          spin: (rand() < 0.5 ? 1 : -1) * (110 + rand() * 220),
          oscA: 5 + rand() * 10,
          oscF: 1.1 + rand() * 1.4
        };
      }

      // Main grid: 5 columns x 7 rows, jittered, covering the arch panel.
      for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
          var leftPct = 8 + (col + 0.5) * (84 / cols) + (rand() - 0.5) * 12;
          var topPct = 5 + (row + 0.5) * (90 / rows) + (rand() - 0.5) * 10;
          list.push(makePetal(id, leftPct, topPct, 11 + id, rand));
          id++;
        }
      }

      // A handful of extra petals scattered anywhere, drawn above the grid.
      for (var i = 0; i < 8; i++) {
        var sLeft = 3 + rand() * 94;
        var sTop = 3 + rand() * 94;
        list.push(makePetal(id, sLeft, sTop, 70 + i, rand));
        id++;
      }

      return list;
    }

    /* ---- idle drift animation ---- */

    function idleTick(now) {
      if (state !== 'idle') { idleRafId = null; return; }
      var elapsed = now - idleStart;
      petals.forEach(function (petal, index) {
        var node = petalNodes[index];
        if (!node) return;
        var floatY = Math.sin(elapsed / petal.fT * Math.PI * 2 + petal.fPh) * petal.fAmp;
        var floatX = Math.cos(elapsed / (petal.fT * 1.35) * Math.PI * 2 + petal.fPh + 1.1) * petal.fAmp * 0.45;
        node.style.transform =
          'translate(calc(-50% + ' + floatX + 'px), calc(-50% + ' + floatY + 'px)) rotate(' + petal.rot + 'deg)';
      });
      idleRafId = requestAnimationFrame(idleTick);
    }

    function startIdleIfNeeded() {
      if (!prefersReducedMotion && state === 'idle' && idleRafId == null) {
        idleRafId = requestAnimationFrame(idleTick);
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        if (idleRafId != null) { cancelAnimationFrame(idleRafId); idleRafId = null; }
      } else {
        startIdleIfNeeded();
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);
    startIdleIfNeeded();

    /* ---- scatter-to-reveal animation ---- */

    function quadraticBezier(t, p0, p1, p2) {
      return (1 - t) * (1 - t) * p0 + 2 * t * (1 - t) * p1 + t * t * p2;
    }

    function buildEdgeTargets(containerLeft, containerTop, containerWidth, containerHeight, total) {
      var archCount = Math.round(total * 0.34);
      var leftCount = Math.round(total * 0.17);
      var rightCount = Math.round(total * 0.17);
      var bottomCount = total - archCount - leftCount - rightCount;
      var targets = [];

      // Top arch: two quadratic Beziers meeting at the arch's peak.
      var archLeftHalf = Math.ceil(archCount / 2);
      var archRightHalf = archCount - archLeftHalf;
      var pStart = { x: containerWidth * 0.26, y: containerHeight * 0.2 };
      var pLeftCtrl = { x: containerWidth * 0.36, y: containerHeight * 0.04 };
      var pPeak = { x: containerWidth * 0.5, y: containerHeight * 0.08 };
      var pRightCtrl = { x: containerWidth * 0.64, y: containerHeight * 0.04 };
      var pEnd = { x: containerWidth * 0.74, y: containerHeight * 0.2 };

      for (var i = 0; i < archLeftHalf; i++) {
        var t = i / Math.max(1, archLeftHalf - 1);
        targets.push({
          x: containerLeft + quadraticBezier(t, pStart.x, pLeftCtrl.x, pPeak.x) + Math.sin(i * 19.3) * 9,
          y: containerTop + quadraticBezier(t, pStart.y, pLeftCtrl.y, pPeak.y) + Math.cos(i * 19.3) * 6
        });
      }
      for (var j = 0; j < archRightHalf; j++) {
        var t2 = j / Math.max(1, archRightHalf - 1);
        targets.push({
          x: containerLeft + quadraticBezier(t2, pPeak.x, pRightCtrl.x, pEnd.x) + Math.sin(j * 23.1 + 1.4) * 9,
          y: containerTop + quadraticBezier(t2, pPeak.y, pRightCtrl.y, pEnd.y) + Math.cos(j * 23.1 + 1.4) * 6
        });
      }

      // Left column.
      for (var k = 0; k < leftCount; k++) {
        var tk = k / leftCount;
        targets.push({
          x: containerLeft + containerWidth * 0.11 + Math.sin(k * 17.7) * 9,
          y: containerTop + containerHeight * (0.06 + tk * 0.8)
        });
      }

      // Right column.
      for (var m = 0; m < rightCount; m++) {
        var tm = m / rightCount;
        targets.push({
          x: containerLeft + containerWidth * 0.89 + Math.sin(m * 13.9 + 2.2) * 9,
          y: containerTop + containerHeight * (0.06 + tm * 0.8)
        });
      }

      // Bottom row.
      for (var n = 0; n < bottomCount; n++) {
        var tn = n / Math.max(1, bottomCount - 1);
        targets.push({
          x: containerLeft + containerWidth * (0.07 + tn * 0.86),
          y: containerTop + containerHeight * 0.9 + Math.sin(n * 11.3 + 3.1) * 8
        });
      }

      // Deterministic shuffle so petals don't fly to the nearest edge
      // point in a visibly ordered sweep.
      for (var d = targets.length - 1; d > 0; d--) {
        var h = Math.floor(((Math.sin(d * 127.1 + 3.14) + 1) / 2) * (d + 1));
        var tmp = targets[d];
        targets[d] = targets[h];
        targets[h] = tmp;
      }

      return targets;
    }

    function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }
    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    function startScatter(pointerEvent) {
      if (state !== 'idle') return;
      state = 'animating';
      if (idleRafId != null) { cancelAnimationFrame(idleRafId); idleRafId = null; }

      var pointerX = pointerEvent.clientX;
      var pointerY = pointerEvent.clientY;

      var parentRect = layer.parentElement.getBoundingClientRect();
      var layerRect = layer.getBoundingClientRect();
      var containerWidth = parentRect.width;
      var containerHeight = parentRect.height;
      var containerLeft = parentRect.left;
      var containerTop = parentRect.top;
      var diagonal = Math.sqrt(containerWidth * containerWidth + containerHeight * containerHeight);

      var targets = buildEdgeTargets(containerLeft, containerTop, containerWidth, containerHeight, petals.length);

      var flight = petals.map(function (petal, index) {
        var target = targets[index % targets.length];
        var currentX = layerRect.left + (petal.lp / 100) * layerRect.width;
        var currentY = layerRect.top + (petal.tp / 100) * layerRect.height;
        var dx = target.x - currentX;
        var dy = target.y - currentY;
        var dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
        var distFromPointer = Math.sqrt(Math.pow(currentX - pointerX, 2) + Math.pow(currentY - pointerY, 2));
        var delay = (distFromPointer / diagonal) * 350 + ((Math.sin(index * 53.1 + 2.1) + 1) / 2) * 60;
        return { dx: dx, dy: dy, delay: delay, oscX: -dy / dist, oscY: dx / dist };
      });

      var baseDuration = 1800;
      var durations = petals.map(function (petal) {
        return baseDuration + Math.sin(petal.id * 37.9 + 1.1) * 300;
      });

      var animStart = performance.now();
      var finished = false;

      function scatterTick(now) {
        var elapsed = now - animStart;
        var allDone = true;

        petals.forEach(function (petal, index) {
          var node = petalNodes[index];
          if (!node) return;

          var localElapsed = elapsed - flight[index].delay;
          if (localElapsed < 0) { allDone = false; return; }

          var progress = Math.min(1, localElapsed / durations[index]);
          if (progress < 1) allDone = false;

          var posEase = easeOutQuint(progress);
          var moveX = flight[index].dx * posEase;
          var moveY = flight[index].dy * posEase;

          var oscEnvelope = Math.sin(progress * Math.PI * petal.oscF * 2) * petal.oscA * Math.sin(progress * Math.PI);
          var oscX = flight[index].oscX * oscEnvelope;
          var oscY = flight[index].oscY * oscEnvelope;

          var arcLift = Math.sin(progress * Math.PI) * -28; // rises then settles
          var rotation = petal.rot + petal.spin * easeOutCubic(progress);
          var scale = 1 + 0.18 * Math.sin(progress * Math.PI);

          node.style.transform =
            'translate(calc(-50% + ' + (moveX + oscX) + 'px), calc(-50% + ' + (moveY + oscY + arcLift) + 'px)) ' +
            'rotate(' + rotation + 'deg) scale(' + scale + ')';
        });

        if (!finished && allDone) {
          finished = true;
          state = 'done';
          setTimeout(function () { if (onRevealed) onRevealed(); }, 350);
          return;
        }
        if (!finished) scatterRafId = requestAnimationFrame(scatterTick);
      }

      scatterRafId = requestAnimationFrame(scatterTick);
    }

    function preventDefault(e) { e.preventDefault(); }

    layer.addEventListener('pointerdown', startScatter);
    layer.addEventListener('touchstart', preventDefault, { passive: false });
    layer.addEventListener('touchmove', preventDefault, { passive: false });

    // Called from the App once the date has been revealed, to fade the
    // (now empty) petal layer out of the way.
    function setRevealedVisualState(isRevealed) {
      layer.style.cursor = isRevealed ? 'default' : 'pointer';
      layer.style.opacity = isRevealed ? '0' : '1';
      layer.style.transition = isRevealed ? 'opacity 3000ms ease 600ms' : '';
      layer.style.pointerEvents = isRevealed ? 'none' : '';
    }
    setRevealedVisualState(false);

    function destroy() {
      if (idleRafId != null) cancelAnimationFrame(idleRafId);
      if (scatterRafId != null) cancelAnimationFrame(scatterRafId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      layer.removeEventListener('pointerdown', startScatter);
      layer.removeEventListener('touchstart', preventDefault);
      layer.removeEventListener('touchmove', preventDefault);
    }

    return { element: layer, setRevealedVisualState: setRevealedVisualState, destroy: destroy };
  }

  /* ----------------------------------------------------------------- *
   * App
   * ----------------------------------------------------------------- */

  function createApp(config, galleryMode) {
    var parsedDate = parseDate(config.date);
    var coupleNames = parseCoupleName(config.coupleName);

    var videoEl = null;
    var introEl = null;
    var cardEl = null;
    var ctaLink = null;
    var sendNoteLink = null;

    var hasStartedPlayback = false;
    var hasAdvancedToCard = false;
    var autoAdvanceTimer = null;

    var stageEl = el('div', { className: 'stage' });

    /* ---- advancing from intro to card ---- */

    function advanceToCard() {
      if (hasAdvancedToCard) return;
      hasAdvancedToCard = true;

      if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
      if (videoEl) { try { videoEl.pause(); } catch (e) { /* ignore */ } }

      if (introEl) introEl.classList.add('fade-out');

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          cardEl.classList.add('in');
        });
      });

      setTimeout(function () {
        if (introEl && introEl.parentNode) introEl.parentNode.removeChild(introEl);
      }, 1100);
    }

    // If the video stalls (buffering) for 6s without finishing, bail
    // straight to the card rather than leaving the guest waiting.
    function attachStallWatcher() {
      if (!videoEl) return;
      var stallTimer = null;
      function onWaiting() {
        if (hasAdvancedToCard) return;
        stallTimer = setTimeout(function () {
          if (!hasAdvancedToCard) advanceToCard();
        }, 6000);
      }
      function onPlaying() {
        if (stallTimer) { clearTimeout(stallTimer); stallTimer = null; }
      }
      videoEl.addEventListener('waiting', onWaiting);
      videoEl.addEventListener('playing', onPlaying);
    }

    /* ---- intro (video + tap-to-begin) ---- */

    function buildIntro() {
      var veil = el('div', { className: 'intro-veil' });

      var prompt = el('div', { className: 'tap-prompt' },
        el('div', { className: 'flourish' },
          el('span', { className: 'line' }),
          el('span', { className: 'glyph' }, '\u2726'),
          el('span', { className: 'line' })
        ),
        el('div', { className: 'prompt-label' }, 'Tap to Begin'),
        el('div', { className: 'prompt-sub' }, 'a wedding invitation')
      );

      var video = el('video', {
        ref: function (node) { videoEl = node; },
        src: 'assets/intro.mp4',
        poster: 'assets/poster.webp',
        playsinline: true,
        preload: 'metadata',
        muted: true
      });

      var wrap = el('div', { className: 'intro' }, video, veil, prompt);

      // Load the video and show its very first frame (rather than a
      // blank/black frame) as soon as it's available.
      try { videoEl.load(); } catch (e) { /* ignore */ }
      function showFirstFrame() {
        try { videoEl.currentTime = 0.001; } catch (e) { /* ignore */ }
      }
      if (videoEl.readyState >= 2) {
        showFirstFrame();
      } else {
        videoEl.addEventListener('loadeddata', showFirstFrame, { once: true });
      }
      videoEl.addEventListener('error', function () {
        if (!hasAdvancedToCard) setTimeout(advanceToCard, 800);
      });

      // First user interaction attempts (muted, inline) playback.
      function onPlaybackStarted() {
        autoAdvanceTimer = setTimeout(advanceToCard, 12000);
        videoEl.addEventListener('ended', advanceToCard, { once: true });
        attachStallWatcher();
      }

      function beginPlayback() {
        if (hasStartedPlayback) return;
        hasStartedPlayback = true;

        veil.classList.add('hidden');
        prompt.classList.add('hidden');

        videoEl.muted = true;
        videoEl.playsInline = true;
        videoEl.defaultMuted = true;

        var playAttempt;
        try {
          playAttempt = videoEl.play();
        } catch (e) {
          setTimeout(advanceToCard, 400);
          return;
        }

        if (playAttempt && typeof playAttempt.then === 'function') {
          playAttempt.then(onPlaybackStarted).catch(function () {
            // Some browsers need a second attempt right after the first
            // gesture; retry once shortly after before giving up.
            setTimeout(function () {
              var retry;
              try { retry = videoEl.play(); } catch (e) { retry = null; }
              if (retry && typeof retry.then === 'function') {
                retry.then(onPlaybackStarted).catch(function () { setTimeout(advanceToCard, 400); });
              } else if (retry !== null) {
                onPlaybackStarted();
              } else {
                setTimeout(advanceToCard, 400);
              }
            }, 60);
          });
        } else {
          onPlaybackStarted();
        }
      }

      // On touch devices, 'touchstart'/'pointerdown' fire before 'click';
      // suppress the trailing click so a single tap doesn't try to start
      // playback twice.
      var suppressNextClick = false;
      function onPointerStart() { suppressNextClick = true; beginPlayback(); }
      function onClick() {
        if (suppressNextClick) { suppressNextClick = false; return; }
        beginPlayback();
      }
      function onKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); beginPlayback(); }
      }

      wrap.addEventListener('touchstart', onPointerStart, { passive: true });
      wrap.addEventListener('pointerdown', onPointerStart, { passive: true });
      wrap.addEventListener('click', onClick);
      wrap.addEventListener('keydown', onKeydown);

      return wrap;
    }

    /* ---- card (couple name, date, venue, CTAs) ---- */

    function buildCard() {
      var eyebrow = el('div', { className: 'eyebrow' },
        el('span', { className: 'rule' }),
        el('span', { className: 'diamond' }),
        el('span', { className: 'rule' })
      );

      var titleEl = el('h1', { className: 'title' }, config.title);

      var coupleEl = el('div', { className: 'couple' },
        el('span', { className: 'name' }, coupleNames.a),
        el('span', { className: 'amp' }, '&'),
        el('span', { className: 'name' }, coupleNames.b)
      );

      var header = el('header', { className: 'card-header' }, eyebrow, titleEl, coupleEl);

      var dateBlockEl = el('div', { className: 'date-block', 'aria-hidden': 'true' },
        el('div', { className: 'glow' }),
        el('div', { className: 'preamble' }, '\u2014 join us on \u2014'),
        el('div', { className: 'day-row' }, el('span', { className: 'day' }, parsedDate.day)),
        el('div', { className: 'month-row' },
          el('span', { className: 'bar' }),
          el('span', { className: 'month' }, parsedDate.month),
          el('span', { className: 'bar' })
        ),
        el('div', { className: 'year' }, parsedDate.year),
        el('div', { className: 'sep', 'aria-hidden': 'true' },
          el('span', { className: 'dot' }), el('span', { className: 'dot' }), el('span', { className: 'dot' })
        ),
        config.showVenue ? el('div', { className: 'venue' }, config.venue) : null,
        config.showCity ? el('div', { className: 'loc' }, config.location) : null
      );

      var revealHintEl = el('div', { className: 'reveal-hint' }, el('span', null, 'tap to reveal'));

      var featherLayer = createFeatherLayer(function onRevealed() {
        cardEl.classList.add('revealed');
        dateBlockEl.setAttribute('aria-hidden', 'false');
        featherLayer.setRevealedVisualState(true);
        if (ctaLink) {
          ctaLink.classList.add('show');
          ctaLink.setAttribute('aria-hidden', 'false');
          ctaLink.setAttribute('tabindex', '0');
        }
        if (sendNoteLink) {
          sendNoteLink.classList.add('show');
          sendNoteLink.setAttribute('aria-hidden', 'false');
          sendNoteLink.setAttribute('tabindex', '0');
        }
        // .reveal-hint runs its own infinite "breathe" keyframe animation,
        // which keeps overriding the CSS transition-based opacity:0 rule
        // for .card.revealed .reveal-hint — so it never actually settles
        // at invisible. Remove it outright instead, matching the original
        // behavior of unmounting the hint as soon as the date is revealed.
        if (revealHintEl.parentNode) revealHintEl.parentNode.removeChild(revealHintEl);
      });

      // Note: feather-layer and reveal-hint are siblings of jharoka-inner
      // (both positioned directly against jharoka-wrap), NOT nested inside
      // jharoka-inner — their CSS (left:25%; top:22%; width:50%; height:65%)
      // is written to match jharoka-inner's own coordinates, so nesting them
      // inside it would shrink/offset them relative to the wrong box.
      var jharokaInner = el('div', { className: 'jharoka-inner' }, dateBlockEl);

      var jharokaWrap = el('div', { className: 'jharoka-wrap' },
        el('img', { className: 'jharoka-img', src: 'assets/Jharoka.webp', alt: '', draggable: 'false' }),
        jharokaInner,
        featherLayer.element,
        revealHintEl
      );

      var footer = config.footerNote ? el('footer', { className: 'card-footer' },
        el('div', { className: 'formal' },
          el('span', { className: 'ornament' }, '\u2740'),
          el('span', null, config.footerNote),
          el('span', { className: 'ornament' }, '\u2740')
        )
      ) : null;

      var ctaWrap = null;
      if (config.showCta) {
        ctaLink = el('a', {
          className: 'cta',
          href: config.calendarUrl,
          target: '_blank',
          rel: 'noopener noreferrer',
          'aria-hidden': 'true',
          tabindex: '-1'
        }, googleCalendarIcon(), el('span', null, config.ctaText));
        ctaWrap = el('div', { className: 'cta-wrap' }, ctaLink);
      }

      var sendNoteWrap = null;
      if (config.showSendNote && config.whatsapp) {
        sendNoteLink = el('a', {
          className: 'cta',
          href: 'https://wa.me/' + config.whatsapp,
          target: '_blank',
          rel: 'noopener noreferrer',
          'aria-hidden': 'true',
          tabindex: '-1'
        }, whatsappIcon(), el('span', null, config.sendNoteText || 'Send a Note'));
        sendNoteWrap = el('div', { className: 'cta-wrap', style: { marginTop: '12px' } }, sendNoteLink);
      }

      return el('div', { className: 'card' },
        el('div', { className: 'card-bg' }),
        header,
        jharokaWrap,
        footer,
        ctaWrap,
        sendNoteWrap
      );
    }

    /* ---- assemble ---- */

    if (!galleryMode) {
      introEl = buildIntro();
      stageEl.appendChild(introEl);
    }

    cardEl = buildCard();
    stageEl.appendChild(cardEl);
    if (galleryMode) cardEl.classList.add('in');

    return stageEl;
  }

  /* ----------------------------------------------------------------- *
   * Boot
   * ----------------------------------------------------------------- */

  var root = document.getElementById('root');
  var config = buildConfig();
  var galleryMode = !!window.__STD_GALLERY_MODE__;
  root.appendChild(createApp(config, galleryMode));
})();

const intro = document.querySelector(".invitation-sequence");
const stage = document.getElementById("introStage");
const label = document.getElementById("stageLabel");
const flowerFall = document.getElementById("flowerFall");
const musicToggle = document.getElementById("musicToggle");
const musicText = document.getElementById("musicText");

const stages = [
  [0.00, "Scroll to Open ↓"],
  [0.10, "The Journey Begins"],
  [0.24, "One Fold at a Time"],
  [0.36, "Love Unfolds"],
  [0.48, "Just a Few More Scrolls..."],
  [0.60, "Your Invitation Awaits"],
  [0.69, "Lift the Invitation"],
  [0.76, "Step Into Our Story"],
  [0.84, "Welcome to Our Celebration"],
  [0.93, "Yashi ♥ Mukund"],
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function segment(progress, start, length) {
  return clamp((progress - start) / length, 0, 1);
}

function updateIntro() {
  if (!intro || !stage) return;
  const rect = intro.getBoundingClientRect();
  const scrollable = intro.offsetHeight - window.innerHeight;
  const progress = clamp(-rect.top / scrollable, 0, 1);
  const sealDrop = segment(progress, 0.1, 0.14);
  const sealFade = segment(progress, 0.18, 0.09);
  const topOpen = segment(progress, 0.24, 0.12);
  const rightOpen = segment(progress, 0.36, 0.12);
  const leftOpen = segment(progress, 0.48, 0.12);
  const bottomOpen = segment(progress, 0.6, 0.12);
  const cardRise = segment(progress, 0.69, 0.15);
  const cardShow = segment(progress, 0.61, 0.12);
  const scrollShow = segment(progress, 0.75, 0.08);
  const sceneExit = segment(progress, 0.84, 0.16);
  const sceneFade = segment(progress, 0.9, 0.1);

  stage.style.setProperty("--progress", progress.toFixed(4));
  stage.style.setProperty("--backdrop-scale", (1.08 - progress * 0.04).toFixed(4));
  stage.style.setProperty("--scene-y", `${(-58 * sceneExit).toFixed(2)}vh`);
  stage.style.setProperty("--scene-scale", (1 - sceneExit * 0.16).toFixed(4));
  stage.style.setProperty("--scene-opacity", (1 - sceneFade).toFixed(4));
  stage.style.setProperty("--seal-y", `${(70 * sealDrop).toFixed(2)}vh`);
  stage.style.setProperty("--seal-rotate", `${(68 * progress).toFixed(2)}deg`);
  stage.style.setProperty("--seal-opacity", (1 - sealFade).toFixed(4));
  stage.style.setProperty("--top-rotation", `${(180 * topOpen).toFixed(2)}deg`);
  stage.style.setProperty("--left-rotation", `${(-150 * leftOpen).toFixed(2)}deg`);
  stage.style.setProperty("--right-rotation", `${(150 * rightOpen).toFixed(2)}deg`);
  stage.style.setProperty("--bottom-rotation", `${(-128 * bottomOpen).toFixed(2)}deg`);
  stage.style.setProperty("--card-y", `${(115 - cardRise * 128).toFixed(2)}%`);
  stage.style.setProperty("--card-opacity", cardShow.toFixed(4));
  stage.style.setProperty("--scroll-opacity", scrollShow.toFixed(4));

  if (label) {
    let current = stages[0][1];
    for (const [point, text] of stages) {
      if (progress >= point) current = text;
    }
    label.textContent = current;
  }
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const target = new Date("2027-01-26T18:00:00+05:30").getTime();
  const remaining = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent = String(days).padStart(3, "0");
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
}

function toCalendarDate(isoString) {
  return new Date(isoString).toISOString().replace(/[-:]/g, "").replace(".000", "");
}

function googleCalendarUrl(event) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.title} | Yashi Weds Mukund`,
    dates: `${toCalendarDate(event.start)}/${toCalendarDate(event.end)}`,
    details: "Wedding celebration of Yashi Agrawal and Mukund Mittal. Hashtag: #SHIfoUNDlove",
    location: "Jashn Wellness Resort, Malihabad",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function icsContent(event) {
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(".000", "");
  const description = "Wedding celebration of Yashi Agrawal and Mukund Mittal. Hashtag: #SHIfoUNDlove";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Yashi Weds Mukund//Wedding Website//EN",
    "BEGIN:VEVENT",
    `UID:${event.title.toLowerCase().replace(/\s+/g, "-")}@yashi-mukund-wedding`,
    `DTSTAMP:${now}`,
    `DTSTART:${toCalendarDate(event.start)}`,
    `DTEND:${toCalendarDate(event.end)}`,
    `SUMMARY:${event.title} | Yashi Weds Mukund`,
    `DESCRIPTION:${description}`,
    "LOCATION:Jashn Wellness Resort, Malihabad",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function appleCalendarUrl(event) {
  const file = new Blob([icsContent(event)], { type: "text/calendar;charset=utf-8" });
  return URL.createObjectURL(file);
}

function buildCalendarActions() {
  document.querySelectorAll(".event-item").forEach((item) => {
    const event = {
      title: item.dataset.title,
      start: item.dataset.start,
      end: item.dataset.end,
    };
    const actions = item.querySelector(".calendar-actions");
    if (!actions) return;

    const google = document.createElement("a");
    google.href = googleCalendarUrl(event);
    google.target = "_blank";
    google.rel = "noreferrer";
    google.textContent = "Google";

    const apple = document.createElement("a");
    apple.href = appleCalendarUrl(event);
    apple.download = `${event.title.toLowerCase().replace(/\s+/g, "-")}-yashi-mukund.ics`;
    apple.textContent = "Apple";

    actions.append(google, apple);
  });
}

function buildFallingFlowers() {
  if (!flowerFall || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const flowerCount = window.innerWidth < 780 ? 18 : 30;
  const variants = ["", "is-variant-2", "is-variant-3", "is-variant-4", "is-variant-5"];
  flowerFall.textContent = "";

  for (let index = 0; index < flowerCount; index += 1) {
    const flower = document.createElement("span");
    const variant = variants[Math.floor(Math.random() * variants.length)];
    flower.className = variant ? `falling-flower ${variant}` : "falling-flower";
    flower.style.setProperty("--fall-left", `${Math.random() * 100}%`);
    flower.style.setProperty("--fall-size", `${24 + Math.random() * 34}px`);
    flower.style.setProperty("--fall-duration", `${9 + Math.random() * 10}s`);
    flower.style.setProperty("--fall-delay", `${Math.random() * -18}s`);
    flower.style.setProperty("--fall-sway", `${-90 + Math.random() * 180}px`);
    flower.style.setProperty("--fall-opacity", `${0.48 + Math.random() * 0.34}`);
    flowerFall.appendChild(flower);
  }
}

const bgMusic = document.getElementById("bgMusic");
const startGate = document.getElementById("startGate");
let userPausedMusic = false;

function setMusicButtonState(isOn) {
  if (!musicToggle || !musicText) return;
  musicToggle.classList.toggle("is-on", isOn);
  musicToggle.setAttribute("aria-pressed", String(isOn));
  musicToggle.setAttribute("aria-label", isOn ? "Turn music off" : "Turn music on");
  musicText.textContent = isOn ? "Music On" : "Music Off";
}

function tryPlayMusic() {
  if (!bgMusic || userPausedMusic) return;
  bgMusic.volume = 0.5;
  bgMusic.play().catch(() => {
    /* blocked until user interacts; resumeEvents below will retry */
  });
}

function dismissStartGate() {
  if (!startGate || startGate.classList.contains("is-hidden")) return;
  tryPlayMusic();
  startGate.classList.add("is-hidden");
  window.setTimeout(() => startGate.remove(), 650);
}

function setupStartGate() {
  if (!startGate) return;
  startGate.addEventListener("click", dismissStartGate);
  startGate.addEventListener("touchend", dismissStartGate, { passive: true });
  startGate.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") dismissStartGate();
  });
}

function setupMusic() {
  if (!musicToggle || !bgMusic) return;

  setMusicButtonState(false);
  bgMusic.addEventListener("play", () => setMusicButtonState(true));
  bgMusic.addEventListener("pause", () => setMusicButtonState(false));

  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      userPausedMusic = false;
      tryPlayMusic();
    } else {
      userPausedMusic = true;
      bgMusic.pause();
    }
  });

  tryPlayMusic();

  // Real click/key/tap gestures reliably unlock audio per browser policy.
  // Wheel/scroll don't officially count, but we retry on them too in case
  // a browser allows it - they're harmless no-ops otherwise.
  const resumeEvents = ["pointerdown", "keydown", "touchstart", "wheel", "scroll"];
  const onFirstInteraction = () => {
    tryPlayMusic();
    resumeEvents.forEach((evt) => window.removeEventListener(evt, onFirstInteraction));
  };
  resumeEvents.forEach((evt) =>
    window.addEventListener(evt, onFirstInteraction, { once: true, passive: true })

  );
}

window.addEventListener("scroll", updateIntro, { passive: true });
window.addEventListener("resize", updateIntro);

buildFallingFlowers();
setupStartGate();
setupMusic();
buildCalendarActions();
updateIntro();
updateCountdown();
setInterval(updateCountdown, 1000);

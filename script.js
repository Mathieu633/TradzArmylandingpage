import { createClient } from "@supabase/supabase-js";

// Config vidéo : Bunny.net (prioritaire) OU YouTube
const YOUTUBE_VIDEO_ID = "vxUEtYmB6og"; // ID YouTube (fallback)
const BUNNY_EMBED_URL = "https://iframe.mediadelivery.net/embed/595631/7fefa285-c04d-422b-aa57-6b7028ac5835"; // Bunny.net

function getSupabase() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key || !url.startsWith("http")) return null;
  try {
    return createClient(url, key);
  } catch {
    return null;
  }
}

function showSupabaseToast(message, type) {
  const el = document.getElementById("supabase-toast");
  if (!el) return;
  el.textContent = message;
  el.className = "supabase-toast visible " + (type || "error");
  el.setAttribute("aria-live", "polite");
  setTimeout(() => el.classList.remove("visible"), 8000);
}

// ========== DÉBLOCAGE LANDING PAGE ==========
const STORAGE_KEY = "landing_video_unlocked";

function restoreUnlockState() {
  if (localStorage.getItem(STORAGE_KEY) === "true") {
    document.body.classList.add("landing-unlocked");
    const container = document.getElementById("video-container");
    const overlay = document.getElementById("lock-overlay");
    const videoCta = document.getElementById("video-cta-unlocked");
    const unlockCta = document.getElementById("video-unlock-cta");
    if (container) container.classList.remove("video-locked");
    if (overlay) {
      overlay.dataset.unlocked = "true";
      overlay.style.display = "none";
    }
    if (unlockCta) unlockCta.style.display = "none";
    if (videoCta) videoCta.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (BUNNY_EMBED_URL) {
    const embed = document.getElementById("video-embed");
    if (embed && !embed.innerHTML) {
      const iframe = document.createElement("iframe");
      iframe.src = `${BUNNY_EMBED_URL}?preload=true`;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.title = "Vidéo Tradz Army";
      embed.appendChild(iframe);
    }
  }
  if (import.meta.env.DEV) {
    const ok = !!getSupabase();
    console.log("[Supabase]", ok ? "Config OK" : "CONFIG MANQUANTE - Vérifiez .env.local (ou Netlify si déployé)");
  }
  restoreUnlockState();
  if (document.body.classList.contains("landing-unlocked")) initScrollAnimations();

  // Exposer les fonctions pour les handlers inline (onclick) - requis avec type="module"
  window.openUnlockModal = openUnlockModal;
  window.handleVideoOverlayClick = handleVideoOverlayClick;
  window.closeUnlockModal = closeUnlockModal;
  window.closeModal = closeModal;
  window.openLegalModal = openLegalModal;
  window.toggleFaq = toggleFaq;
  window.unlockVideo = unlockVideo;

  // Bouton ACCÉDER À LA VIDÉO - délégation d'événement (plus fiable)
  document.body.addEventListener("click", function (e) {
    if (e.target.closest("#btn-unlock-submit")) {
      e.preventDefault();
      e.stopPropagation();
      try {
        unlockVideo(e);
      } catch (err) {
        console.error("Erreur unlockVideo:", err);
      }
    }
  });
});

// ========== MODAL DÉBLOCAGE VIDÉO ==========
function openUnlockModal() {
  document.getElementById("unlock-modal").classList.add("active");
}

function closeUnlockModal() {
  document.getElementById("unlock-modal").classList.remove("active");
}

function openLegalModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add("active");
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove("active");
}

async function unlockVideo(event) {
  if (event) event.preventDefault();

  const firstname = document.getElementById("firstname").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!firstname || !email) return;

  const supabaseClient = getSupabase();
  if (supabaseClient) {
    const { data, error } = await supabaseClient
      .from("quiz_responses")
      .insert([{ firstname, email }])
      .select();
    if (error) {
      console.error("Erreur Supabase:", error.message, error);
      showSupabaseToast("Erreur enregistrement: " + error.message, "error");
    }
  } else {
    console.warn("Supabase non configuré (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY manquants ?)");
    showSupabaseToast(
      "Supabase non configuré. Ajoute VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans Netlify → Site configuration → Environment variables, puis redéploie.",
      "warning"
    );
  }

  // Sauvegarder et afficher tout le contenu
  localStorage.setItem(STORAGE_KEY, "true");
  document.body.classList.add("landing-unlocked");

  const container = document.getElementById("video-container");
  const overlay = document.getElementById("lock-overlay");
  const videoCta = document.getElementById("video-cta-unlocked");
  const unlockCta = document.getElementById("video-unlock-cta");

  container.classList.remove("video-locked");
  overlay.dataset.unlocked = "true";
  overlay.style.display = "none";
  if (unlockCta) unlockCta.style.display = "none";
  if (videoCta) videoCta.style.display = "block";

  closeUnlockModal();
  initScrollAnimations();
}

// Animations au défilement (uniquement quand la vidéo est débloquée)
function initScrollAnimations() {
  const content = document.getElementById("landing-unlocked-content");
  if (!content || !document.body.classList.contains("landing-unlocked")) return;

  const sections = content.querySelectorAll(".section");
  const ctaBlock = content.querySelector(".video-cta-unlocked");
  const revenueDisclaimer = document.querySelector(".revenue-disclaimer");
  const footer = document.getElementById("main-footer");
  const elements = [
    ...sections,
    ...(ctaBlock ? [ctaBlock] : []),
    ...(revenueDisclaimer ? [revenueDisclaimer] : []),
    ...(footer ? [footer] : []),
  ];

  elements.forEach((el) => el.classList.add("scroll-animate"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

// Clic sur l'overlay : verrouillé = ouvrir modal
function handleVideoOverlayClick() {
  const overlay = document.getElementById("lock-overlay");
  if (overlay.dataset.unlocked === "true") return;
  openUnlockModal();
}

function toggleFullscreen() {
  const container = document.getElementById("video-container");
  if (!document.fullscreenElement) {
    container.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

// YouTube : pas d'événements pause/play natifs nécessaires

// Fermer modal avec Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach((m) => m.classList.remove("active"));
  }
});

// ========== FORMULAIRE TÉLÉPHONE ==========
function updatePhonePlaceholder() {
  const select = document.getElementById("country-code");
  const input = document.getElementById("phone-input");
  const opt = select.options[select.selectedIndex];
  const placeholder = opt ? opt.dataset.placeholder : "06 12 34 56 78";
  input.placeholder = placeholder;
}

function submitPhone() {
  const input = document.getElementById("phone-input");
  const countrySelect = document.getElementById("country-code");
  if (!input || !countrySelect) return;
  const countryCode = countrySelect.value;
  const phone = input.value.trim();
  if (!phone) return;
  const fullPhone = countryCode + " " + phone.replace(/\s/g, "");
  input.value = "";
  input.placeholder = "Merci ! Ton numéro a été enregistré.";
}

async function submitPhoneForm(event) {
  event.preventDefault();
  const input = document.getElementById("phone-input");
  const error = document.getElementById("phone-error");
  const countrySelect = document.getElementById("country-code");
  const countryCode = countrySelect.value;
  const phone = input.value.trim();

  if (!phone) {
    error.style.display = "flex";
    return;
  }

  error.style.display = "none";

  const fullPhone = countryCode + " " + phone.replace(/\s/g, "");

  input.value = "";
  input.placeholder = "Merci ! Ton numéro a été enregistré.";
}

// ========== FAQ ACCORDÉON ==========
function toggleFaq(el) {
  const item = el.closest(".faq-item");
  const wasOpen = item.classList.contains("open");
  document.querySelectorAll(".faq-item").forEach((i) => {
    i.classList.remove("open");
    const chev = i.querySelector(".faq-chevron");
    if (chev) chev.textContent = "+";
  });
  if (!wasOpen) {
    item.classList.add("open");
    const chev = item.querySelector(".faq-chevron");
    if (chev) chev.textContent = "−";
  }
}

// ========== CARROUSEL FEATURES ==========
let currentSlide = 0;
const totalSlides = 3;

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

function updateCarousel() {
  const cards = document.querySelectorAll(".feature-card");
  const dots = document.querySelectorAll(".carousel-dots .dot");
  cards.forEach((c, i) => c.classList.toggle("active", i === currentSlide));
  dots.forEach((d, i) => d.classList.toggle("active", i === currentSlide));
}

// ========== CARROUSEL RÉSULTATS / CERTIFICATS (défilement infini) ==========
(function initResultatsCarousel() {
  const track = document.querySelector(".resultats-carousel-track");
  const dotsContainer = document.querySelector(".resultats-carousel-dots");
  const prevBtn = document.querySelector(".resultats-carousel .carousel-prev");
  const nextBtn = document.querySelector(".resultats-carousel .carousel-next");

  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll(".resultat-slide");
  const originalCount = slides.length;

  if (slides.length < originalCount) return;

  for (let i = originalCount - 1; i >= originalCount - 3 && i >= 0; i--) {
    track.insertBefore(slides[i].cloneNode(true), track.firstChild);
  }
  for (let i = 0; i < 3; i++) {
    track.appendChild(slides[i].cloneNode(true));
  }

  const totalSlides = track.querySelectorAll(".resultat-slide").length;
  const startOffset = 3;
  let trackIndex = startOffset;
  let logicalIndex = 0;
  let autoInterval;

  function getSlideOffset() {
    const slide = track.querySelector(".resultat-slide");
    if (!slide) return 150;
    const gap = 16;
    const rect = slide.getBoundingClientRect();
    return rect.width + gap;
  }

  function getVisibleCount() {
    const offset = getSlideOffset();
    if (offset <= 0) return 1;
    const wrap = track.parentElement;
    const wrapWidth = wrap ? wrap.offsetWidth : 9999;
    return Math.min(originalCount, Math.max(1, Math.floor((wrapWidth + 16) / offset)));
  }

  function getLogicalMax() {
    return Math.max(0, originalCount - getVisibleCount());
  }

  function applyTransform(noTransition) {
    const offset = getSlideOffset();
    if (noTransition) track.style.transition = "none";
    track.style.transform = `translateX(-${trackIndex * offset}px)`;
    if (noTransition) {
      track.offsetHeight;
      track.style.transition = "";
    }
    dotsContainer.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === logicalIndex));
  }

  function goToLogical(index) {
    logicalIndex = Math.max(0, Math.min(index, getLogicalMax()));
    trackIndex = startOffset + logicalIndex;
    applyTransform(false);
  }

  function prevSimple() {
    const max = getLogicalMax();
    trackIndex--;
    if (trackIndex < startOffset) {
      trackIndex = startOffset + max;
      logicalIndex = max;
      applyTransform(true);
    } else {
      logicalIndex = trackIndex - startOffset;
      applyTransform(false);
    }
  }

  function nextSimple() {
    const max = getLogicalMax();
    trackIndex++;
    if (trackIndex >= startOffset + originalCount) {
      trackIndex = startOffset;
      logicalIndex = 0;
      applyTransform(true);
    } else {
      logicalIndex = Math.min(trackIndex - startOffset, max);
      applyTransform(false);
    }
  }

  function renderDots() {
    dotsContainer.innerHTML = "";
    const max = getLogicalMax();
    for (let i = 0; i <= max; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot" + (i === logicalIndex ? " active" : "");
      dot.setAttribute("aria-label", "Position " + (i + 1));
      dot.addEventListener("click", () => goToLogical(i));
      dotsContainer.appendChild(dot);
    }
  }

  function startAuto() {
    autoInterval = setInterval(nextSimple, 4000);
  }
  function stopAuto() {
    clearInterval(autoInterval);
  }

  prevBtn?.addEventListener("click", () => { stopAuto(); prevSimple(); startAuto(); });
  nextBtn?.addEventListener("click", () => { stopAuto(); nextSimple(); startAuto(); });

  window.addEventListener("resize", () => {
    logicalIndex = Math.min(logicalIndex, getLogicalMax());
    trackIndex = startOffset + logicalIndex;
    renderDots();
    applyTransform(false);
  });

  renderDots();
  logicalIndex = 0;
  trackIndex = startOffset;
  applyTransform(false);
  startAuto();
})();

// ========== CARROUSEL BESOIN (3 bulles) ==========
(function initBesoinCarousel() {
  const track = document.querySelector(".besoin-carousel-track");
  const dotsContainer = document.querySelector(".besoin-carousel-dots");
  const prevBtn = document.querySelector(".besoin-carousel-prev");
  const nextBtn = document.querySelector(".besoin-carousel-next");

  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll(".besoin-slide");
  const total = slides.length;
  let currentIndex = 0;

  function getSlideOffset() {
    const slide = track.querySelector(".besoin-slide");
    if (!slide) return 300;
    const gap = 24;
    const rect = slide.getBoundingClientRect();
    return rect.width + gap;
  }

  function getVisibleCount() {
    const offset = getSlideOffset();
    if (offset <= 0) return 1;
    const wrap = track.parentElement;
    const wrapWidth = wrap ? wrap.offsetWidth : 9999;
    return Math.min(total, Math.min(3, Math.max(1, Math.floor((wrapWidth + 24) / offset))));
  }

  function getMaxIndex() {
    return Math.max(0, total - getVisibleCount());
  }

  function goTo(index) {
    const max = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, max));
    const offset = getSlideOffset();
    track.style.transform = `translateX(-${currentIndex * offset}px)`;
    dotsContainer.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  }

  function prev() {
    const max = getMaxIndex();
    goTo(currentIndex === 0 ? max : currentIndex - 1);
  }

  function next() {
    const max = getMaxIndex();
    goTo(currentIndex >= max ? 0 : currentIndex + 1);
  }

  function renderDots() {
    dotsContainer.innerHTML = "";
    const max = getMaxIndex();
    for (let i = 0; i <= max; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot" + (i === currentIndex ? " active" : "");
      dot.setAttribute("aria-label", "Position " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  let autoInterval;
  function startAuto() {
    autoInterval = setInterval(next, 5000);
  }
  function stopAuto() {
    clearInterval(autoInterval);
  }

  prevBtn?.addEventListener("click", () => { stopAuto(); prev(); startAuto(); });
  nextBtn?.addEventListener("click", () => { stopAuto(); next(); startAuto(); });

  window.addEventListener("resize", () => {
    renderDots();
    goTo(Math.min(currentIndex, getMaxIndex()));
  });

  renderDots();
  goTo(0);
  startAuto();
})();

// ========== CARROUSEL MEMBRES ==========
(function initMembresCarousel() {
  const track = document.querySelector(".membres-carousel-track");
  const dotsContainer = document.querySelector(".membres-carousel-dots");
  const prevBtn = document.querySelector(".membres-carousel-prev");
  const nextBtn = document.querySelector(".membres-carousel-next");

  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll(".membre-slide");
  const total = slides.length;
  let currentIndex = 0;

  function getSlideOffset() {
    const slide = track.querySelector(".membre-slide");
    if (!slide) return 280;
    const gap = 20;
    const rect = slide.getBoundingClientRect();
    return rect.width + gap;
  }

  function getVisibleCount() {
    const offset = getSlideOffset();
    if (offset <= 0) return 1;
    const wrap = track.parentElement;
    const wrapWidth = wrap ? wrap.offsetWidth : 9999;
    return Math.min(total, Math.max(1, Math.floor((wrapWidth + 20) / offset)));
  }

  function getMaxIndex() {
    return Math.max(0, total - getVisibleCount());
  }

  function goTo(index) {
    const max = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, max));
    const offset = getSlideOffset();
    track.style.transform = `translateX(-${currentIndex * offset}px)`;
    dotsContainer.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  }

  function prev() {
    const max = getMaxIndex();
    goTo(currentIndex === 0 ? max : currentIndex - 1);
  }

  function next() {
    const max = getMaxIndex();
    goTo(currentIndex >= max ? 0 : currentIndex + 1);
  }

  function renderDots() {
    dotsContainer.innerHTML = "";
    const max = getMaxIndex();
    for (let i = 0; i <= max; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot" + (i === currentIndex ? " active" : "");
      dot.setAttribute("aria-label", "Position " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  let autoInterval;
  function startAuto() {
    autoInterval = setInterval(next, 5000);
  }
  function stopAuto() {
    clearInterval(autoInterval);
  }

  prevBtn?.addEventListener("click", () => { stopAuto(); prev(); startAuto(); });
  nextBtn?.addEventListener("click", () => { stopAuto(); next(); startAuto(); });

  window.addEventListener("resize", () => {
    renderDots();
    goTo(Math.min(currentIndex, getMaxIndex()));
  });

  renderDots();
  goTo(0);
  startAuto();
})();

// ========== CARROUSEL MODULES ==========
(function initModulesCarousel() {
  const track = document.querySelector(".modules-carousel-track");
  const dotsContainer = document.querySelector(".modules-carousel-dots");
  const prevBtn = document.querySelector(".modules-carousel-prev");
  const nextBtn = document.querySelector(".modules-carousel-next");

  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll(".module-slide");
  const total = slides.length;
  let currentIndex = 0;
  const gap = 20;

  function getSlideOffset() {
    const slide = track.querySelector(".module-slide");
    if (!slide) return 200;
    const rect = slide.getBoundingClientRect();
    return rect.width + gap;
  }

  function getVisibleCount() {
    const offset = getSlideOffset();
    if (offset <= 0) return 1;
    const wrap = track.parentElement;
    const wrapWidth = wrap ? wrap.offsetWidth : 9999;
    return Math.min(total, Math.min(3, Math.max(1, Math.floor((wrapWidth + gap) / offset))));
  }

  function getMaxIndex() {
    return Math.max(0, total - getVisibleCount());
  }

  function goTo(index) {
    const max = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, max));
    const offset = getSlideOffset();
    track.style.transform = `translateX(-${currentIndex * offset}px)`;
    dotsContainer.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  }

  function prev() {
    const max = getMaxIndex();
    goTo(currentIndex === 0 ? max : currentIndex - 1);
  }

  function next() {
    const max = getMaxIndex();
    goTo(currentIndex >= max ? 0 : currentIndex + 1);
  }

  function renderDots() {
    dotsContainer.innerHTML = "";
    const max = getMaxIndex();
    for (let i = 0; i <= max; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot" + (i === currentIndex ? " active" : "");
      dot.setAttribute("aria-label", "Position " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  prevBtn?.addEventListener("click", prev);
  nextBtn?.addEventListener("click", next);

  window.addEventListener("resize", () => {
    renderDots();
    goTo(Math.min(currentIndex, getMaxIndex()));
  });

  renderDots();
  goTo(0);
})();

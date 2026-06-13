/* ============================================================
   AskSQL — interactions
   Lightweight, dependency-free. Respects reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky nav shadow ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // gentle stagger for siblings revealed together
            const delay = Math.min(i * 70, 210);
            setTimeout(() => entry.target.classList.add("is-in"), delay);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Count-up stats ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const runCount = (el) => {
    const target = parseFloat(el.dataset.count);
    if (reduceMotion) { el.textContent = target; return; }
    const dur = 1400;
    let start = null;
    const tick = (ts) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { runCount(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = el.dataset.count));
  }

  /* ---------- Hero typing animation ---------- */
  const typeTarget = document.getElementById("typed-question");
  const answer = document.querySelector("#answer-block .answer");
  const question = "What were our top 5 products by revenue last quarter?";

  const revealAnswer = () => {
    if (typeTarget) typeTarget.classList.add("is-done");
    if (answer) requestAnimationFrame(() => answer.classList.add("is-shown"));
  };

  if (typeTarget) {
    if (reduceMotion) {
      typeTarget.textContent = question;
      revealAnswer();
    } else {
      let i = 0;
      const startTyping = () => {
        const type = () => {
          if (i <= question.length) {
            typeTarget.textContent = question.slice(0, i);
            i++;
            // natural rhythm: slight variation, pause on spaces
            const jitter = 26 + Math.floor(((i * 53) % 7)) * 6;
            setTimeout(type, question[i - 1] === " " ? jitter + 30 : jitter);
          } else {
            setTimeout(revealAnswer, 360);
          }
        };
        type();
      };
      // begin shortly after load so it's visible
      setTimeout(startTyping, 750);
    }
  }

  /* ---------- Mobile menu toggle ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      links.style.display = open ? "flex" : "";
    });
  }

  /* ---------- Demo tab switcher (decorative) ---------- */
  const tabs = document.querySelectorAll(".answer__tabs .tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
    });
  });
})();

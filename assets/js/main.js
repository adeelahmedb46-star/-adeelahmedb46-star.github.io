/* =========================================================================
   PAGE BEHAVIOUR
   Navigation, active-section tracking, scroll reveals, certificate viewer
   and the contact form. Runs after render.js has built the content.
   ========================================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const cfg = (window.PORTFOLIO && window.PORTFOLIO.config) || {};

  /* ---------- header: compact state on scroll ---------- */
  const header = document.getElementById("site-header");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const scrim = document.getElementById("nav-scrim");
  const mobileQuery = window.matchMedia("(max-width: 900px)");
  const toggleLabel = toggle.querySelector(".visually-hidden");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggleLabel.textContent = open ? "Close menu" : "Open menu";
    header.classList.toggle("menu-open", open);
    document.body.classList.toggle("no-scroll", open);
    scrim.hidden = !open;
    if (open) {
      const first = menu.querySelector(".nav__link");
      if (first) first.focus();
    }
  }

  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  scrim.addEventListener("click", () => setMenu(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("menu-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  // keep keyboard focus inside the open mobile menu
  header.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || !header.classList.contains("menu-open")) return;
    const items = [toggle, ...menu.querySelectorAll(".nav__link")];
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  menu.addEventListener("click", (e) => {
    if (e.target.closest(".nav__link") && mobileQuery.matches) setMenu(false);
  });

  mobileQuery.addEventListener("change", (e) => { if (!e.matches) setMenu(false); });

  /* ---------- active section + sliding indicator ---------- */
  const links = [...document.querySelectorAll(".nav__link")];
  const indicator = document.querySelector(".nav__indicator");
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  function moveIndicator(link) {
    if (!link || mobileQuery.matches) return;
    const menuBox = menu.getBoundingClientRect();
    const box = link.getBoundingClientRect();
    indicator.style.transform = `translateX(${box.left - menuBox.left}px) scaleX(${box.width / 100})`;
    indicator.classList.add("is-ready");
  }

  function setActive(id) {
    let activeLink = null;
    links.forEach((l) => {
      const on = l.getAttribute("href") === `#${id}`;
      l.classList.toggle("is-active", on);
      if (on) { l.setAttribute("aria-current", "true"); activeLink = l; }
      else l.removeAttribute("aria-current");
    });
    moveIndicator(activeLink);
  }

  const spy = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  // the last section may be too short to reach the middle of the screen
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) setActive("contact");
  }, { passive: true });

  window.addEventListener("resize", () => moveIndicator(document.querySelector(".nav__link.is-active")));
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => moveIndicator(document.querySelector(".nav__link.is-active")));
  }

  /* ---------- scroll reveals ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealer = new IntersectionObserver(
      (entries, obs) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-visible");
        obs.unobserve(en.target);
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => revealer.observe(el));
  }

  // Timelines draw their line once they enter the viewport
  document.querySelectorAll(".timeline").forEach((tl) => {
    if (reduceMotion.matches) { tl.classList.add("is-drawn"); return; }
    new IntersectionObserver(([en], obs) => {
      if (en.isIntersecting) { tl.classList.add("is-drawn"); obs.disconnect(); }
    }, { threshold: 0.15 }).observe(tl);
  });

  /* ---------- certificate filters + "show all" ---------- */
  const certGrid = document.getElementById("certs-grid");
  const moreBtn = document.getElementById("certs-more");
  const filterBar = document.getElementById("cert-filters");
  const INITIAL = 6;
  let activeFilter = "all";
  let expanded = false;

  function applyCertView(animate) {
    if (!certGrid) return;
    const cards = [...certGrid.children];
    const matching = cards.filter((c) => activeFilter === "all" || c.dataset.category === activeFilter);
    const limit = activeFilter === "all" && !expanded ? INITIAL : Infinity;
    let shown = 0;
    cards.forEach((card) => {
      const show = matching.includes(card) && shown < limit;
      if (show) {
        card.hidden = false;
        if (animate && !reduceMotion.matches) {
          card.style.setProperty("--i", shown % 6);
          card.classList.remove("is-in");
          void card.offsetWidth;          // restart the entrance animation
          card.classList.add("is-in");
        }
        shown++;
      } else {
        card.hidden = true;
      }
    });
    const hiddenCount = matching.length - shown;
    if (moreBtn) {
      moreBtn.hidden = activeFilter !== "all" || matching.length <= INITIAL;
      moreBtn.textContent = expanded ? "Show fewer" : `Show all ${matching.length} certifications`;
      moreBtn.setAttribute("aria-expanded", String(expanded));
      if (hiddenCount < 0) moreBtn.hidden = true;
    }
  }

  if (filterBar) {
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      activeFilter = btn.dataset.filter;
      filterBar.querySelectorAll("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      applyCertView(true);
    });
  }
  if (moreBtn) {
    moreBtn.addEventListener("click", () => {
      expanded = !expanded;
      applyCertView(true);
      if (!expanded) document.getElementById("certifications").scrollIntoView({ block: "start" });
    });
  }
  applyCertView(false);

  /* ---------- certificate / document viewer ---------- */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbTitle = document.getElementById("lightbox-title");
  const lbMeta = document.getElementById("lightbox-meta");
  const lbVerify = document.getElementById("lightbox-verify");
  const lbOpen = document.getElementById("lightbox-open");
  let lastTrigger = null;

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-cert-image]");
    if (!trigger || !lightbox.showModal) return;
    const d = trigger.dataset;
    lastTrigger = trigger;
    lbTitle.textContent = d.certName;
    lbMeta.textContent = d.certMeta || "";
    lbImg.src = d.certImage;
    lbImg.alt = d.certName;
    lbOpen.href = d.certImage;
    if (d.certVerify) { lbVerify.href = d.certVerify; lbVerify.hidden = false; }
    else lbVerify.hidden = true;
    lightbox.showModal();
    document.body.classList.add("no-scroll");
  });

  lightbox.addEventListener("click", (e) => {
    // close on the close button or a click on the backdrop
    if (e.target.closest("[data-close]") || e.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("close", () => {
    lbImg.removeAttribute("src");
    document.body.classList.remove("no-scroll");
    if (lastTrigger) lastTrigger.focus();
  });

  /* ---------- contact form ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const submitBtn = form.querySelector('[type="submit"]');
  const submitLabel = submitBtn.querySelector(".btn__label");

  const rules = {
    name: (v) => (v.trim() ? "" : "Enter your name."),
    email: (v) =>
      !v.trim() ? "Enter your email address." :
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Enter an email address like name@example.com.",
    message: (v) => (v.trim().length >= 10 ? "" : "Write a message of at least 10 characters.")
  };

  function validateField(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const msg = rule(input.value);
    const err = document.getElementById(`${input.id}-err`);
    err.textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg) input.setAttribute("aria-describedby", err.id);
    else input.removeAttribute("aria-describedby");
    return !msg;
  }

  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("blur", () => { if (input.value) validateField(input); });
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") validateField(input);
    });
  });

  function setStatus(text, kind) {
    status.textContent = text;
    status.dataset.kind = kind || "";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll("[required]")];
    const results = fields.map(validateField);
    const firstBad = fields[results.indexOf(false)];
    if (firstBad) { firstBad.focus(); setStatus("Check the highlighted fields.", "error"); return; }

    const payload = Object.fromEntries(new FormData(form).entries());

    // 1) A form service is configured: send it there.
    if (cfg.formEndpoint) {
      submitBtn.disabled = true;
      submitLabel.textContent = "Sending…";
      setStatus("", "");
      try {
        const res = await fetch(cfg.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus("Message sent. I'll reply by email.", "success");
      } catch (err) {
        setStatus(`The message couldn't be sent. Please email me directly${cfg.email ? ` at ${cfg.email}` : ""}.`, "error");
      } finally {
        submitBtn.disabled = false;
        submitLabel.textContent = "Send message";
      }
      return;
    }

    // 2) Only an email address is configured: hand off to the visitor's email app.
    if (cfg.email) {
      const subject = payload.subject || `Portfolio message from ${payload.name}`;
      const body = `${payload.message}\n\n${payload.name}\n${payload.email}`;
      window.location.href = `mailto:${cfg.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("Your email app should open with this message ready to send.", "success");
      return;
    }

    // 3) Nothing configured yet.
    setStatus("This form isn't connected yet. Add an email address or form endpoint in assets/js/data.js.", "error");
  });

  /* ---------- footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

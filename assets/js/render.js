/* =========================================================================
   RENDERING
   Turns window.PORTFOLIO (data.js) into markup. Pure templating: no
   event handling lives here (see main.js).
   ========================================================================= */
(function () {
  "use strict";

  const data = window.PORTFOLIO;
  if (!data) return;
  const cfg = data.config;

  /* ---------- helpers ---------- */
  const esc = (value) =>
    String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const icon = (name, cls = "icon") =>
    `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  const placeholder = (label) =>
    cfg.showPlaceholders ? `<span class="placeholder">[${esc(label)}]</span>` : "";

  const tags = (list, cls = "tag") =>
    `<ul class="tags" role="list">${list.map((t) => `<li class="${cls}">${esc(t)}</li>`).join("")}</ul>`;

  const isExternal = (url) => /^https?:\/\//i.test(url);

  const linkButton = (url, label, iconName, variant = "btn--secondary") =>
    `<a class="btn ${variant} btn--sm" href="${esc(url)}"${isExternal(url) ? ' target="_blank" rel="noopener noreferrer"' : ""}>
      ${icon(iconName)}${esc(label)}${isExternal(url) ? '<span class="visually-hidden"> (opens in a new tab)</span>' : ""}
    </a>`;

  const mount = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  /* ---------- education ---------- */
  mount(
    "education-list",
    data.education
      .map(
        (e, i) => `
      <li class="timeline__item reveal" style="--i:${i}">
        <span class="timeline__node${e.current ? " is-current" : ""}" aria-hidden="true"></span>
        <div class="timeline__card">
          <div class="timeline__top">
            <h3 class="timeline__title">${esc(e.degree)}</h3>
            ${e.period ? `<p class="timeline__period">${esc(e.period)}</p>` : ""}
          </div>
          <p class="timeline__org">${esc(e.school)}</p>
          ${e.details.length ? tags(e.details, "tag tag--soft") : ""}
        </div>
      </li>`
      )
      .join("")
  );

  /* ---------- skills ---------- */
  mount(
    "skills-grid",
    data.skills
      .map(
        (s, i) => `
      <article class="skill reveal" style="--i:${i % 2}">
        <div class="skill__head">
          <span class="skill__icon">${icon(s.icon)}</span>
          <h3 class="skill__title">${esc(s.title)}</h3>
        </div>
        ${tags(s.items)}
        ${s.usedIn ? `<p class="skill__used">${esc(s.usedIn)}</p>` : ""}
      </article>`
      )
      .join("")
  );

  /* ---------- featured project ---------- */
  (function renderFeatured() {
    const p = data.featured;
    const links = [
      p.links.demo && linkButton(p.links.demo, "View demo", "external", "btn--primary"),
      p.links.caseStudy && linkButton(p.links.caseStudy, "Read case study", "file"),
      p.links.repo && linkButton(p.links.repo, "Source code", "github")
    ].filter(Boolean);

    mount(
      "featured-project",
      `
      <article class="feature reveal" aria-labelledby="feature-title">
        <span class="vf vf--tl" aria-hidden="true"></span>
        <span class="vf vf--tr" aria-hidden="true"></span>
        <span class="vf vf--bl" aria-hidden="true"></span>
        <span class="vf vf--br" aria-hidden="true"></span>

        <div class="feature__head">
          <p class="feature__status"><span class="hero__dot" aria-hidden="true"></span>${esc(p.status)}</p>
          <h3 class="feature__name" id="feature-title">${esc(p.name)}</h3>
          <p class="feature__title">${esc(p.title)}</p>
        </div>

        <div class="feature__body">
          <div class="feature__story">
            <div class="feature__block">
              <h4>The problem</h4>
              <p>${esc(p.problem)}</p>
            </div>
            <div class="feature__block">
              <h4>The solution</h4>
              <p>${esc(p.solution)}</p>
            </div>
            <div class="feature__block">
              <h4>My role</h4>
              <p>${p.role ? esc(p.role) : placeholder("DESCRIBE YOUR ROLE") || "Final year project, BS Computer Science."}</p>
            </div>
          </div>

          <div class="feature__side">
            <div class="feature__block">
              <h4 id="pipeline-title">How verification works</h4>
              <ol class="pipeline" role="list" aria-labelledby="pipeline-title">
                ${p.pipeline.map((step, i) => `<li class="pipeline__step" style="--i:${i}"><span class="pipeline__num">${i + 1}</span>${esc(step)}</li>`).join("")}
              </ol>
            </div>
          </div>
        </div>

        <div class="feature__foot">
          <div class="feature__block">
            <h4>Key features</h4>
            <ul class="checklist" role="list">
              ${p.features.map((f) => `<li>${icon("check")}${esc(f)}</li>`).join("")}
            </ul>
          </div>
          <div class="feature__block">
            <h4>Built with</h4>
            ${tags(p.tech)}
            <div class="feature__links">
              ${links.length ? links.join("") : placeholder("ADD REPO / DEMO / CASE STUDY LINK")}
            </div>
          </div>
        </div>
      </article>`
    );
  })();

  /* ---------- other projects ---------- */
  mount(
    "projects-grid",
    data.projects
      .map((p, i) => {
        const links = [
          p.links.demo && `<a class="card-link" href="${esc(p.links.demo)}" target="_blank" rel="noopener noreferrer">Live site ${icon("arrow-up-right")}<span class="visually-hidden"> for ${esc(p.name)} (opens in a new tab)</span></a>`,
          p.links.repo && `<a class="card-link" href="${esc(p.links.repo)}" target="_blank" rel="noopener noreferrer">Code ${icon("arrow-up-right")}<span class="visually-hidden"> for ${esc(p.name)} (opens in a new tab)</span></a>`
        ].filter(Boolean);
        return `
      <article class="project reveal" style="--i:${i % 2}">
        <div class="project__top">
          <span class="project__icon">${icon(p.icon)}</span>
          <p class="project__kind">${esc(p.kind)}</p>
        </div>
        <h4 class="project__name">${esc(p.name)}</h4>
        <p class="project__desc">${esc(p.description)}</p>
        ${tags(p.tech)}
        <div class="project__links">${links.length ? links.join("") : placeholder("ADD LINK")}</div>
      </article>`;
      })
      .join("")
  );

  /* ---------- certificate viewer trigger (shared) ---------- */
  const viewerAttrs = (d) =>
    `data-cert-image="${esc(d.image)}" data-cert-name="${esc(d.title)}"` +
    (d.meta ? ` data-cert-meta="${esc(d.meta)}"` : "") +
    (d.verify ? ` data-cert-verify="${esc(d.verify)}"` : "");

  /* ---------- experience ---------- */
  mount(
    "experience-list",
    data.experience
      .map((x, i) => {
        const docs = (x.documents || []).map(
          (d) => `<button class="doc-btn" type="button" ${viewerAttrs({ image: d.image, title: d.title, meta: `${x.org} · ${x.period}`, verify: x.verify })}>
              ${icon("file")}${esc(d.label)}</button>`
        );
        if (x.verify) {
          docs.push(`<a class="doc-btn doc-btn--link" href="${esc(x.verify)}" target="_blank" rel="noopener noreferrer">${icon("external")}Verify<span class="visually-hidden"> ${esc(x.role)} (opens in a new tab)</span></a>`);
        }
        return `
      <li class="timeline__item reveal" style="--i:${i}">
        <span class="timeline__node" aria-hidden="true"></span>
        <div class="timeline__card">
          <div class="timeline__top">
            <h3 class="timeline__title">${esc(x.role)}</h3>
            ${x.period ? `<p class="timeline__period">${esc(x.period)}</p>` : ""}
          </div>
          <p class="timeline__org">${esc(x.org)}</p>
          <p class="timeline__text">${esc(x.summary)}</p>
          ${x.points.length ? `<ul class="timeline__points" role="list">${x.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>` : ""}
          ${x.quote ? `<figure class="quote"><blockquote>${esc(x.quote)}</blockquote><figcaption>${esc(x.quoteSource)}</figcaption></figure>` : ""}
          ${tags(x.tags, "tag tag--soft")}
          ${docs.length ? `<div class="timeline__docs">${docs.join("")}</div>` : ""}
        </div>
      </li>`;
      })
      .join("")
  );

  /* ---------- honours ---------- */
  mount(
    "honours-list",
    (data.honours || [])
      .map(
        (h) => `
      <li class="honour">
        <span class="honour__icon${h.kind === "award" ? " is-award" : ""}">${icon(h.kind === "award" ? "trophy" : "calendar")}</span>
        <div class="honour__body">
          <p class="honour__title">${esc(h.title)}</p>
          <p class="honour__detail">${esc(h.detail)}</p>
        </div>
        ${h.date ? `<p class="honour__date">${esc(h.date)}</p>` : ""}
      </li>`
      )
      .join("")
  );

  /* ---------- certifications ---------- */
  const certs = data.certifications;
  const cats = data.certificationCategories || [];
  const count = document.getElementById("cert-count");
  if (count) count.textContent = certs.length;

  mount(
    "cert-filters",
    [["all", "All", certs.length], ...cats.map((c) => [c, c, certs.filter((x) => x.category === c).length])]
      .map(([value, label, n], i) =>
        `<button class="filter" type="button" data-filter="${esc(value)}" aria-pressed="${i === 0}">${esc(label)}<span class="filter__n">${n}</span></button>`)
      .join("")
  );

  mount(
    "certs-grid",
    certs
      .map((c) => {
        const meta = [c.issuer, c.date].filter(Boolean).join(" · ");
        const extra = [c.note, c.credential && `ID ${c.credential}`].filter(Boolean).join(" · ");
        const thumb = c.image ? c.image.replace(/\.(jpe?g|png|webp)$/i, "-thumb.$1") : "";
        const viewer = c.image ? viewerAttrs({ image: c.image, title: c.name, meta: meta + (extra ? ` · ${extra}` : ""), verify: c.link }) : "";
        return `
      <li class="cert" data-category="${esc(c.category)}">
        ${c.image
          ? `<button class="cert__thumb" type="button" ${viewer}>
               <img src="${esc(thumb)}" alt="" width="560" height="420" loading="lazy" decoding="async">
               <span class="cert__zoom">${icon("image")}View<span class="visually-hidden"> certificate: ${esc(c.name)}</span></span>
             </button>`
          : `<div class="cert__thumb cert__thumb--empty" aria-hidden="true">${icon("award")}</div>`}
        <div class="cert__body">
          <p class="cert__cat">${esc(c.category)}</p>
          <h3 class="cert__name">${esc(c.name)}</h3>
          <p class="cert__meta">${esc(meta)}</p>
          ${extra ? `<p class="cert__extra">${esc(extra)}</p>` : ""}
          ${c.link ? `<a class="card-link cert__verify" href="${esc(c.link)}" target="_blank" rel="noopener noreferrer">Verify ${icon("arrow-up-right")}<span class="visually-hidden"> ${esc(c.name)} (opens in a new tab)</span></a>` : ""}
        </div>
      </li>`;
      })
      .join("")
  );

  /* ---------- contact + footer links ---------- */
  const channels = [
    { key: "email", label: "Email", icon: "mail", href: cfg.email && `mailto:${cfg.email}`, text: cfg.email, ph: "YOUR EMAIL" },
    { key: "linkedin", label: "LinkedIn", icon: "linkedin", href: cfg.linkedin, text: cfg.linkedin.replace(/^https?:\/\/(www\.)?/, ""), ph: "YOUR LINKEDIN" },
    { key: "github", label: "GitHub", icon: "github", href: cfg.github, text: cfg.github.replace(/^https?:\/\/(www\.)?/, ""), ph: "YOUR GITHUB" },
    { key: "cv", label: "CV", icon: "file", href: cfg.cv, text: "Download PDF", ph: "YOUR CV" }
  ];

  mount(
    "contact-links",
    channels
      .map((c) => {
        if (!c.href) {
          return cfg.showPlaceholders
            ? `<li class="channel is-empty"><span class="channel__icon">${icon(c.icon)}</span><span class="channel__text"><span class="channel__label">${c.label}</span>${placeholder(c.ph)}</span></li>`
            : "";
        }
        const ext = isExternal(c.href);
        const dl = c.key === "cv" ? " download" : "";
        return `<li class="channel"><a class="channel__link" href="${esc(c.href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}${dl}>
            <span class="channel__icon">${icon(c.icon)}</span>
            <span class="channel__text"><span class="channel__label">${c.label}</span><span class="channel__value">${esc(c.text)}</span></span>
            ${icon("arrow-up-right", "icon channel__arrow")}
          </a></li>`;
      })
      .join("")
  );

  mount(
    "footer-links",
    channels
      .filter((c) => c.href)
      .map((c) => {
        const ext = isExternal(c.href);
        return `<li><a class="footer__link" href="${esc(c.href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}${c.key === "cv" ? " download" : ""}>${icon(c.icon)}<span>${c.label}</span></a></li>`;
      })
      .join("")
  );

  /* ---------- CV buttons elsewhere on the page ---------- */
  document.querySelectorAll('[data-link="cv"]').forEach((el) => {
    if (cfg.cv) {
      el.href = cfg.cv;
      el.setAttribute("download", "");
    } else if (cfg.showPlaceholders) {
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
      el.classList.add("is-pending");
      el.title = "Add your CV path in assets/js/data.js";
      el.insertAdjacentHTML("beforeend", '<span class="visually-hidden"> (not added yet)</span>');
    } else {
      el.remove();
    }
  });

  /* ---------- profile photo ---------- */
  if (cfg.photo) {
    const box = document.getElementById("about-photo");
    if (box) {
      box.innerHTML = `<img src="${esc(cfg.photo)}" alt="Portrait of Adeel Ahmed" width="640" height="800" loading="lazy" decoding="async">`;
      box.classList.add("has-photo");
    }
  }
})();

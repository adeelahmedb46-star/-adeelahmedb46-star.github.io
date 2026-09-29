/* =========================================================================
   HERO FIGURE: "embedding space"
   Points drift in identity clusters; a viewfinder moves between clusters,
   echoing how CARE-Safe matches a face to an enrolled guardian.
   - Pauses when off-screen or when the tab is hidden.
   - Draws a single still frame for prefers-reduced-motion.
   ========================================================================= */
(function () {
  "use strict";

  const canvas = document.getElementById("hero-canvas");
  if (!canvas || !canvas.getContext) return;

  const wrap = canvas.parentElement;
  const ctx = canvas.getContext("2d");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const brackets = wrap.querySelectorAll(".vf");

  // Seeded random so the layout is the same on every visit.
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5;

  const CENTERS = [
    [0.25, 0.27], [0.72, 0.24], [0.5, 0.55], [0.24, 0.78], [0.78, 0.76]
  ];
  const PER_CLUSTER = 20;

  const clusters = CENTERS.map(([cx, cy], k) => ({
    cx, cy,
    phase: rand() * Math.PI * 2,
    points: Array.from({ length: PER_CLUSTER }, () => ({
      ox: gauss() * 0.16,
      oy: gauss() * 0.16,
      a: rand() * Math.PI * 2,
      s: 0.25 + rand() * 0.5
    })),
    k
  }));

  let width = 0, height = 0, dpr = 1;
  let colors = {};
  let target = 2;               // cluster currently framed
  let box = null;               // eased viewfinder rectangle
  let lastSwitch = 0;
  let running = false;
  let visible = true;
  let rafId = 0;

  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    colors = {
      dot: cs.getPropertyValue("--ink-2").trim() || "#4A5570",
      hit: cs.getPropertyValue("--accent").trim() || "#2D4BD1",
      line: cs.getPropertyValue("--line-strong").trim() || "#C5CBD8"
    };
  }

  function resize() {
    const rect = wrap.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!running) draw(performance.now());
  }

  function positions(t) {
    const time = t / 1000;
    return clusters.map((c) => {
      const cx = c.cx + Math.sin(time * 0.12 + c.phase) * 0.015;
      const cy = c.cy + Math.cos(time * 0.1 + c.phase) * 0.015;
      return c.points.map((p) => ({
        x: (cx + p.ox + Math.sin(time * p.s + p.a) * 0.01) * width,
        y: (cy + p.oy + Math.cos(time * p.s * 0.9 + p.a) * 0.01) * height
      }));
    });
  }

  function bounds(pts) {
    let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
    pts.forEach((p) => {
      x1 = Math.min(x1, p.x); y1 = Math.min(y1, p.y);
      x2 = Math.max(x2, p.x); y2 = Math.max(y2, p.y);
    });
    const pad = 14;
    return { x: x1 - pad, y: y1 - pad, w: x2 - x1 + pad * 2, h: y2 - y1 + pad * 2 };
  }

  function draw(t) {
    ctx.clearRect(0, 0, width, height);
    const all = positions(t);
    const linkDist = Math.min(width, height) * 0.12;

    all.forEach((pts, k) => {
      const hit = k === target;

      // neighbour links inside a cluster
      ctx.lineWidth = 1;
      ctx.strokeStyle = hit ? colors.hit : colors.line;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            ctx.globalAlpha = (1 - d / linkDist) * (hit ? 0.45 : 0.55);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // points
      ctx.globalAlpha = hit ? 1 : 0.55;
      ctx.fillStyle = hit ? colors.hit : colors.dot;
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, hit ? 3 : 2.3, 0, Math.PI * 2);
        ctx.fill();
      });
    });
    ctx.globalAlpha = 1;

    // ease the viewfinder toward the target cluster
    const goal = bounds(all[target]);
    if (!box) box = { ...goal };
    const ease = running ? 0.06 : 1;
    box.x += (goal.x - box.x) * ease;
    box.y += (goal.y - box.y) * ease;
    box.w += (goal.w - box.w) * ease;
    box.h += (goal.h - box.h) * ease;
    placeBrackets();
  }

  // Brackets are DOM elements (crisp at any DPR, styled from CSS).
  function placeBrackets() {
    const size = 14;
    const spots = [
      [box.x, box.y], [box.x + box.w - size, box.y],
      [box.x, box.y + box.h - size], [box.x + box.w - size, box.y + box.h - size]
    ];
    brackets.forEach((el, i) => {
      el.style.transform = `translate(${spots[i][0].toFixed(1)}px, ${spots[i][1].toFixed(1)}px)`;
    });
  }

  function loop(t) {
    if (!running) return;
    if (t - lastSwitch > 3400) {
      lastSwitch = t;
      let next = target;
      while (next === target) next = Math.floor(Math.random() * clusters.length);
      target = next;
    }
    draw(t);
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (running || motionQuery.matches || !visible || document.hidden) return;
    running = true;
    lastSwitch = performance.now();
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  readColors();
  resize();

  new ResizeObserver(resize).observe(wrap);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? start() : stop();
  }).observe(wrap);

  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  motionQuery.addEventListener("change", () => {
    if (motionQuery.matches) { stop(); draw(0); } else start();
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    readColors();
    if (!running) draw(0);
  });

  start();
})();

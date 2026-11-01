/* Animated neural-network background that reacts to the cursor */
(() => {
  const cv = document.getElementById("bg"), cx = cv.getContext("2d");
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W, H, pts = [], m = {x: -999, y: -999};
  function init() {
    const d = devicePixelRatio || 1; W = innerWidth; H = innerHeight;
    cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0);
    pts = Array.from({length: Math.min(90, Math.round(W * H / 16000))}, () => ({x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35}));
  }
  function frame() {
    cx.clearRect(0, 0, W, H);
    const c = getComputedStyle(document.documentElement).getPropertyValue("--net").trim();
    for (const p of pts) {
      if (!calm) { p.x += p.vx; p.y += p.vy; }
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      cx.fillStyle = `rgba(${c},.55)`; cx.beginPath(); cx.arc(p.x, p.y, 1.8, 0, 7); cx.fill();
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j <= pts.length; j++) {
        const a = pts[i], b = j === pts.length ? m : pts[j], d = Math.hypot(a.x - b.x, a.y - b.y), max = j === pts.length ? 180 : 120;
        if (d < max) { cx.strokeStyle = `rgba(${c},${(1 - d / max) * (j === pts.length ? .6 : .25)})`; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke(); }
      }
    }
    if (!calm) requestAnimationFrame(frame);
  }
  addEventListener("pointermove", e => { m.x = e.clientX; m.y = e.clientY; if (calm) frame(); });
  addEventListener("resize", () => { init(); frame(); });
  init(); frame();
})();

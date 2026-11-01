/* ===== EDIT YOUR CONTENT HERE ===== */
const EMAIL = "shreshtprasad17@gmail.com";
const LINKS = {linkedin: "#", github: "#", paper: "#"}; // paste your real URLs
const SKILLS = ["Python","PyTorch","TensorFlow","Deep Q-Learning","LLM fine-tuning","Hugging Face","JavaScript","React","Node.js","AWS","Docker","PostgreSQL","Figma","Tableau","Git"];
const JOBS = [
 {r:"AI DevOps Engineer", c:"Profile as a Service GmbH", w:"Oct 2025 – Present · Köln", open:true, b:[
  "Map business workflows end to end to find inefficiencies and build automation.",
  "Design internal and customer-facing dashboards for operational visibility.",
  "Integrate a new CRM and build API connections that automate data exchange."]},
 {r:"AI Development Intern", c:"Thomas Cook", w:"Aug 2025 – Feb 2026 · Mumbai", b:[
  "Worked on four AI products: travel chatbot, AI IVR voice bot, QC call-audit bot and live Agent Assist.",
  "Found 70+ issues through QA and scenario testing; helped resolve 40+ bugs.",
  "Improved conversation flows, speech recognition and intent detection.",
  "Built KPI dashboards for five enterprise solutions and presented to the weekly steering committee."]},
 {r:"Earlier internships", c:"Clone Futura · Graphinet", w:"2018 – 2020", b:[
  "Content Development Intern: course videos and quizzes for MS Office, Photoshop, HTML and CSS.",
  "UI/UX and Design Intern: responsive web page layouts."]}
];
const PROJECTS = [
 {t:"Forex Event Notification Bot", k:"SaaS", d:"Cloud-hosted Discord bot with real-time alerts for high and medium impact economic events. Serves 90,000+ users.", s:"Discord · Cloud"},
 {t:"VitaMed AI", k:"Full-stack", d:"Medical insights chat app powered by Google Gemini, with secure login and real-time answers.", s:"React · Vite · Node · Firebase · Render"},
 {t:"Medical LLM Chatbot", k:"AI / ML", d:"Fine-tunes a 4-bit quantized LLM into a medical assistant with LoRA and experiment tracking.", s:"PEFT · Hugging Face · W&B"},
 {t:"Deep Q-Learning Lunar Landing", k:"AI / ML", d:"An agent that learns to descend and land safely through trial and error. Basis of my published paper.", s:"PyTorch · Gymnasium · DQN"}
];
/* Photos: put files in /images with these names (or change the names) */
const PHOTOS = [
 {f:"karate.jpg", t:"Karate: black belt", k:"Sport"}, {f:"football.jpg", t:"Football", k:"Sport"},
 {f:"mun.jpg", t:"Model United Nations", k:"Stage"}, {f:"guitar.jpg", t:"Lead guitar on stage", k:"Stage"},
 {f:"pc-build.jpg", t:"Building PCs", k:"Making"}, {f:"teardown.jpg", t:"Laptop teardown and repair", k:"Making"},
 {f:"animals.jpg", t:"Animal welfare", k:"Life"}, {f:"roadtrip.jpg", t:"Road trips", k:"Life"}, {f:"cooking.jpg", t:"Cooking", k:"Life"}
];
/* ================================== */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = {get(k){try{return localStorage.getItem(k)}catch(e){return null}}, set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const root = document.documentElement;
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; };
let tt; const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 1800); };

$("#yr").textContent = new Date().getFullYear();
$("#mail").textContent = EMAIL; $("#mailto").href = "mailto:" + EMAIL;
$("#li").href = LINKS.linkedin; $("#gh").href = LINKS.github; $("#paper").href = LINKS.paper;

/* theme */
const setTheme = m => { root.dataset.theme = m; $("#theme").textContent = m === "dark" ? "Light" : "Dark"; store.set("theme", m); };
setTheme(store.get("theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
$("#theme").onclick = () => setTheme(root.dataset.theme === "dark" ? "light" : "dark");

/* skills marquee (doubled for a seamless loop) */
$("#mq").innerHTML = [...SKILLS, ...SKILLS].map(s => `<span>${s}</span>`).join("");

/* experience */
JOBS.forEach(j => {
  const d = el("details", "card"); d.open = !!j.open;
  const s = el("summary"), l = el("div"), h = el("h3", "", j.r);
  l.append(h, el("span", "co", j.c)); s.append(l, el("span", "when", j.w));
  const u = el("ul"); j.b.forEach(x => u.append(el("li", "", x))); d.append(s, u); $("#jobs").append(d);
});

/* projects */
PROJECTS.forEach(p => {
  const c = el("div", "card proj tilt");
  c.append(el("span", "tag", p.k), el("h3", "", p.t), el("p", "", p.d), el("small", "", p.s)); $("#grid").append(c);
});

/* gallery + filter + lightbox */
["All", ...new Set(PHOTOS.map(p => p.k))].forEach((k, i) => {
  const b = el("button", "chip", k); b.setAttribute("aria-pressed", i === 0);
  b.onclick = () => { $$(".chip").forEach(x => x.setAttribute("aria-pressed", x === b)); $$(".shot").forEach(s => s.classList.toggle("hide", k !== "All" && s.dataset.k !== k)); };
  $("#chips").append(b);
});
PHOTOS.forEach(p => {
  const f = el("figure", "shot tilt"); f.dataset.k = p.k; f.dataset.file = "images/" + p.f; f.tabIndex = 0;
  const i = new Image(); i.src = "images/" + p.f; i.alt = p.t; i.loading = "lazy";
  f.append(i, el("figcaption", "", p.t)); $("#gallery").append(f);
});
const lb = $("#lb");
let cur = [], idx = 0;
function show(n) { const f = cur[(n + cur.length) % cur.length]; idx = cur.indexOf(f); $("img", lb).src = $("img", f).src; $("img", lb).alt = $("img", f).alt; $("p", lb).textContent = $("img", f).alt; }
function open(f) { if (f.classList.contains("missing")) return; cur = $$(".shot").filter(s => !s.classList.contains("hide") && !s.classList.contains("missing")); show(cur.indexOf(f)); lb.showModal(); }
$("#gallery").addEventListener("click", e => { const f = e.target.closest(".shot"); if (f) open(f); });
$("#gallery").addEventListener("keydown", e => { if (e.key === "Enter") { const f = e.target.closest(".shot"); if (f) open(f); } });
$("button", lb).onclick = () => lb.close();
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
lb.addEventListener("keydown", e => { if (e.key === "ArrowRight") show(idx + 1); if (e.key === "ArrowLeft") show(idx - 1); });

/* missing photos get a friendly placeholder */
const check = () => $$("figure img").forEach(i => { if (i.complete && !i.naturalWidth) i.parentElement.classList.add("missing"); });
addEventListener("error", e => { if (e.target.tagName === "IMG") e.target.parentElement.classList.add("missing"); }, true);
addEventListener("load", check); check();

/* 3D tilt toward the pointer */
if (!calm && matchMedia("(hover: hover)").matches) $$(".tilt").forEach(t => {
  t.addEventListener("pointermove", e => { const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; t.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`; });
  t.addEventListener("pointerleave", () => t.style.transform = "");
});

/* count-up numbers */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; io.unobserve(e.target);
  const n = +e.target.dataset.n, s = e.target.dataset.s || "", t0 = performance.now();
  const step = t => { const k = calm ? 1 : Math.min(1, (t - t0) / 1400); e.target.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))).toLocaleString("en") + s; if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}), {threshold: .6});
$$("[data-n]").forEach(n => io.observe(n));

/* copy email */
$("#copy").onclick = async () => { try { await navigator.clipboard.writeText(EMAIL); toast("Email copied"); } catch (e) { toast("Copy failed. Select the address and copy it."); } };

/* Jetson Remote Access Guide — interactions (vanilla JS) */

/* ---------- 1. Copy buttons on every code block ---------- */
function initCopy() {
  document.querySelectorAll(".code").forEach((block) => {
    const btn = block.querySelector(".copy");
    const pre = block.querySelector("pre");
    if (!btn || !pre) return;
    btn.addEventListener("click", async () => {
      const text = pre.innerText.replace(/\u00a0/g, " ");
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      btn.textContent = "Copied";
      btn.classList.add("done");
      toast("Copied to clipboard");
      setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("done");
      }, 1600);
    });
  });
}

/* ---------- 2. Toast ---------- */
let toastTimer;
function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 1500);
}

/* ---------- 3. OS tabs (Windows / macOS / Ubuntu) ---------- */
function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((group) => {
    const tabs = group.querySelectorAll(".tab");
    const panels = group.querySelectorAll(".tabpanel");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.target;
        tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
        panels.forEach((p) => (p.hidden = p.dataset.panel !== target));
        // keep every OS group in sync so the reader never mixes platforms
        document.querySelectorAll("[data-tabs]").forEach((other) => {
          if (other === group) return;
          const ot = other.querySelector(`.tab[data-target="${target}"]`);
          if (!ot) return;
          other.querySelectorAll(".tab").forEach((t) => t.setAttribute("aria-selected", String(t === ot)));
          other.querySelectorAll(".tabpanel").forEach((p) => (p.hidden = p.dataset.panel !== target));
        });
        localStorage.setItem("guide-os", target);
      });
    });
  });
  const saved = localStorage.getItem("guide-os");
  if (saved) {
    const first = document.querySelector(`[data-tabs] .tab[data-target="${saved}"]`);
    if (first) first.click();
  }
}

/* ---------- 4. Persistent checklist ---------- */
function initChecklist() {
  const boxes = document.querySelectorAll(".check input[type=checkbox]");
  const saved = JSON.parse(localStorage.getItem("guide-checks") || "{}");
  boxes.forEach((box) => {
    if (saved[box.id]) {
      box.checked = true;
      box.closest("li").classList.add("done");
    }
    box.addEventListener("change", () => {
      box.closest("li").classList.toggle("done", box.checked);
      const state = JSON.parse(localStorage.getItem("guide-checks") || "{}");
      state[box.id] = box.checked;
      localStorage.setItem("guide-checks", JSON.stringify(state));
    });
  });
}

/* ---------- 5. Scroll progress ---------- */
function initProgress() {
  const bar = document.getElementById("progress");
  const onScroll = () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + "%";
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- 6. Reveal on scroll ---------- */
function initReveal() {
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = "none";
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll(".step, .card, .photo, details.tr").forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(18px)";
    el.style.transition = "opacity .5s ease, transform .5s ease";
    io.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCopy();
  initTabs();
  initChecklist();
  initProgress();
  initReveal();
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});

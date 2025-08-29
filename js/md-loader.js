(function () {
  let markedReady;

  function ensureMarked() {
    if (!markedReady) {
      markedReady = new Promise((resolve) => {
        if (window.marked) return resolve();
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        s.onload = resolve;
        document.head.appendChild(s);
      });
    }
    return markedReady;
  }

  async function renderMarkdownContainers(root = document) {
    await ensureMarked();
    const nodes = root.querySelectorAll('[data-md-src]');
    await Promise.all(Array.from(nodes).map(async (el) => {
      const src = el.getAttribute('data-md-src');
      try {
        const resp = await fetch(src, { cache: 'no-store' });
        if (!resp.ok) throw new Error(`HTTP ${resp.status} - ${src}`);
        const md = await resp.text();
        el.innerHTML = window.marked.parse(md);
      } catch (e) {
        el.innerHTML = `<div style="color:#b91c1c">Falha ao carregar: ${src} (${e.message})</div>`;
      }
    }));
  }

  window.renderMarkdownContainers = renderMarkdownContainers;
})();

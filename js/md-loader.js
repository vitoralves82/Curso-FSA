// md-loader.js
(async function () {
  // Carrega marked (CDN)
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
  document.head.appendChild(s);
  await new Promise(r => s.onload = r);

  async function loadOne(el) {
    const src = el.getAttribute('data-md-src');
    try {
      const resp = await fetch(src, { cache: 'no-store' });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const md = await resp.text();
      el.innerHTML = marked.parse(md);

      // cria âncoras em h2/h3 para navegação
      el.querySelectorAll('h2,h3').forEach(h => {
        const id = h.textContent.trim().toLowerCase().replace(/[^\w]+/g, '-');
        h.id = id;
      });
    } catch (e) {
      el.innerHTML = `<div class="text-red-700">Falha ao carregar: ${src} (${e.message})</div>`;
    }
  }

  const containers = document.querySelectorAll('[data-md-src]');
  for (const el of containers) await loadOne(el);
})();

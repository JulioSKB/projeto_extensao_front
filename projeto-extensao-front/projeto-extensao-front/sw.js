const CACHE_NAME = 'escola-solidaria-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './imagens/img-192.png',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/vue@3/dist/vue.global.prod.js',
];

// Instala e armazena arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

// Atualiza o SW e remove versões antigas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
});

// Retorna cache offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).catch(() =>
        new Response('Você está offline 😢', { headers: { 'Content-Type': 'text/plain' } })
      )
    )
  );
});

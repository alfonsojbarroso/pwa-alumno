const CACHE_NAME = 'pwa-clientes-v1';
const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './js/app.js',
    './js/api.js',
    './js/ui.js'
];

// 1. Instalación: Guardar recursos estáticos en caché
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Guardando archivos estáticos en caché');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// 2. Activación: Limpiar cachés antiguas si actualizas la versión
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[Service Worker] Eliminando caché antigua:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 3. Interceptar peticiones (Fetch)
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Estrategia especial para la API de clientes: Network First
    if (url.pathname.includes('/api/v1/customer')) {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    // Si la red responde, clonamos la respuesta y la guardamos en caché
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return networkResponse;
                })
                .catch(() => {
                    // Si falla la red (offline), devolvemos lo último que esté en caché
                    console.log('[Service Worker] Sin red, buscando clientes en caché...');
                    return caches.match(event.request);
                })
        );
        return;
    }

    // Para el resto de archivos estáticos: Cache First (con actualización de red de fondo)
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Devolvemos la caché pero actualizamos en segundo plano si hay red
                fetch(event.request).then((networkResponse) => {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse);
                    });
                }).catch(() => {/* Ignorar si no hay red */ });

                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});
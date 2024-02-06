const staticCacheName = 'ipsos-pwa-static-cache-v1'; 
const assets = [
  '/',
  '/index.html',
  '/general-styles.css',
  '/script.js',
  '/favicon.ico',
  '/images/ipsos-pwa.png'
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('Caching shell assets');
            return cache.addAll(assets);
        })
    );
    console.log('Service worker has been installed');
});

self.addEventListener('activate', evt => {
    // Clean up old caches
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                // Clone the response to add CORS headers
                const clonedResponse = fetchRes.clone();
                if (clonedResponse.ok) {
                    const responseHeaders = new Headers(clonedResponse.headers);
                    responseHeaders.append('Access-Control-Allow-Origin', '*');
                    return new Response(clonedResponse.body, {
                        status: clonedResponse.status,
                        statusText: clonedResponse.statusText,
                        headers: responseHeaders
                    });
                } else {
                    // Return the original response if it's not OK
                    return fetchRes;
                }
            });
        })
    );
});

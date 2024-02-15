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



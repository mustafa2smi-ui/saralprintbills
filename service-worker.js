const CACHE_NAME = 'Billing-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/notepad.html',
  '/keypad.html',
  '/about.html',
  '/manifest.json',
  '/saral.jpg',
  '/keypad.jpg',
  '/notepad.png',
  '/contact.html',
  'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js'
];

// Install event
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  // Remove old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

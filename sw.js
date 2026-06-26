const CACHE_NAME = "akhor-ghor-v2";
const ASSETS = [
  "/",
  "/index.html",
  "/learning.html",
  "/swara.html",
  "/vyanjan.html",
  "/numbers.html",
  "/lesson.html",
  "/profile.html",
  "/offline.html",
  "/css/theme.css",
  "/css/style.css",
  "/css/dashboard.css",
  "/css/lesson.css",
  "/css/profile.css",
  "/js/dashboard.js",
  "/js/lesson.js",
  "/js/profile.js",
  "/data/swara.json",
  "/data/vyanjan.json",
  "/data/number.json"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).catch(() => caches.match("/offline.html")))
  );
});

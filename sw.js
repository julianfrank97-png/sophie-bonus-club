// Offline app-shell cache; do not cache Supabase replies, authentication or user data.
const CACHE='sbc-shell-v6';
const ASSETS=['./','./index.html','./styles.css','./app.js','./api.js','./logic.js','./config.js','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./assets/apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 // Network-first to pick up newly deployed JS, CSS and config automatically.
 const cacheKey=event.request.mode==='navigate'?'./index.html':event.request;
 event.respondWith(fetch(event.request).then(response=>{
   if(response.ok){const clone=response.clone();caches.open(CACHE).then(cache=>cache.put(cacheKey,clone)).catch(()=>{});}
   return response;
 }).catch(()=>caches.match(cacheKey)));
});

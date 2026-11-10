const V='ozk-v2';
const F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
const X=['https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js','https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F).then(()=>Promise.all(X.map(u=>c.add(u).catch(()=>{}))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Önce internetten dener (güncellemeler hemen gelir), internet yoksa kayıtlı kopyayı açar.
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith('http'))return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c)).catch(()=>{});return r})
    .catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html'))));
});

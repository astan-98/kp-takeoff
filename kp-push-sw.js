/* KP Takeoff push-only service worker (no fetch handler: never touches caching or version.json updates). */
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("push",e=>{e.waitUntil((async()=>{let m={title:"Chafin WOs",body:"Open KP Takeoff"};
  try{m=await (await fetch("https://kpi-ops.pages.dev/api/latest?who=asher",{cache:"no-store"})).json();}catch(x){}
  await self.registration.showNotification(m.title||"Chafin WOs",{body:m.body||"",tag:"kpt-chafin",renotify:true,data:{url:"./?tab=chafin"}});})());});
self.addEventListener("notificationclick",e=>{e.notification.close();const url=new URL("./?tab=chafin",self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{const c=cs.find(w=>{const p=new URL(w.url).pathname;return p===new URL(self.registration.scope).pathname||/\/index\.html$/.test(p)&&!/\/(lance|sky|choice)\//.test(p);})||null;
    if(c){c.postMessage({kp:"tab",tab:"chafin"});return c.focus();}return self.clients.openWindow(url);}));});

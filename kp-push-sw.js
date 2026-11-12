/* Field Notes update: alerts now come from the new version. */
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("push",e=>{e.waitUntil(self.registration.showNotification("Field Notes update",{body:"Open the new version and turn alerts back on.",tag:"kpt-moved",data:{url:"https://fieldnotes.s98tools.com/?tab=chafin"}}));});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(self.clients.openWindow("https://fieldnotes.s98tools.com/?tab=chafin"));});

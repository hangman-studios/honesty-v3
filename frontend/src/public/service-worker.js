self.addEventListener("push", (event) => {
  let data = event.data.json();
  console.log("got push notifcation", data);
  // const image = 'https://cdn.glitch.com/614286c9-b4fc-4303-a6a9-a4cef0601b74%2Flogo.png?v=1605150951230';
  const options = {
    body: data.options.body,
    tag: data.tag,
    requireInteraction: true,
    badge: "https://nuxt.app.localhost/icon.png",
    icon: "https://nuxt.app.localhost/icon.png",
    renotify: true,
  };
  self.registration.showNotification(data.title, options);
});

self.addEventListener("notificationclick", (event) => {
  console.log("was clicked", event);
  event.notification.close();
  //   event.waitUntil(self.clients.openWindow("https://nuxt.app.localhost"));
});

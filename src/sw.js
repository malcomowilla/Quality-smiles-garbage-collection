import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, Route, registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst, NetworkOnly } from "workbox-strategies";
import { BackgroundSyncPlugin } from "workbox-background-sync";

cleanupOutdatedCaches();
self.skipWaiting();
precacheAndRoute(self.__WB_MANIFEST);



const imageRoute = new Route(
    ({ request, sameOrigin }) => {
      return sameOrigin && request.destination === "image";
    },
    new CacheFirst({
      cacheName: "images",
    })
  );
  registerRoute(imageRoute);


//   const fetchTasksRoute = new Route(
//     ({ request }) => {
//       return request.url === "api/signin";
//     },
//     new NetworkFirst({
//       cacheName: "api/signin",
//     })
//   );
//   registerRoute(fetchTasksRoute);


  const bgSyncPlugin = new BackgroundSyncPlugin("backgroundSyncQueue", {
    maxRetentionTime: 24 * 60,
  });



  const navigationRoute = new NavigationRoute(
    new NetworkFirst({
      cacheName: "navigation",
      networkTimeoutSeconds: 3,
    })
  );
  registerRoute(navigationRoute);
  

  const signinTask = new Route(
    ({ request }) => {
      return request.url.includes("api/login-admin");
    },
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    "POST"
  );

  registerRoute(signinTask );

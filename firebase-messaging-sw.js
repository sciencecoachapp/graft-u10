// firebase-messaging-sw.js
// This file MUST be deployed at the root of your site
// alongside index.html on Netlify

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Your Firebase config — must match the app
firebase.initializeApp({
  apiKey: "AIzaSyAdEVa4H0GbPCpX6EPYk_5yDS_AY0jsQF8",
  authDomain: "youth-coaching-app.firebaseapp.com",
  projectId: "youth-coaching-app",
  storageBucket: "youth-coaching-app.firebasestorage.app",
  messagingSenderId: "464594485534",
  appId: "1:464594485534:web:f59f415a925274861bc90f"
});

const messaging = firebase.messaging();

// Handle background messages (app is closed or minimised)
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  const notificationTitle = payload.notification?.title || 'Graft';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    tag: payload.data?.type || 'general',
    data: payload.data,
    actions: [
      {
        action: 'open',
        title: 'Open Graft'
      }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // Open the app when notification is clicked
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // If app is already open, focus it
        for(const client of clientList) {
          if(client.url && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise open a new window
        if(clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});

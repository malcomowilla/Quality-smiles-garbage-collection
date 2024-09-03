// firebase-messaging-sw.js

// Import the Firebase libraries from the CDN
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCK9SjRH9BvsIbeyaQKpVqPMj7xrmKGL5g",
  authDomain: "quality-smiles.firebaseapp.com",
  projectId: "quality-smiles",
  storageBucket: "quality-smiles.appspot.com",
  messagingSenderId: "273733149863",
  appId: "1:273733149863:web:180d5789bdafec3a86e782"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(' Received background message ', payload);
  const audio = new Audio('/751326__robinhood76__13129-mystery-cash-bonus.wav')
  audio.play()
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
    
  // apiKey: "AIzaSyCK9SjRH9BvsIbeyaQKpVqPMj7xrmKGL5g",
  // authDomain: "quality-smiles.firebaseapp.com",
  // projectId: "quality-smiles",
  // storageBucket: "quality-smiles.appspot.com",
  // messagingSenderId: "273733149863",
  // appId: "1:273733149863:web:180d5789bdafec3a86e782"





  apiKey: "AIzaSyCK9SjRH9BvsIbeyaQKpVqPMj7xrmKGL5g",
  authDomain: "quality-smiles.firebaseapp.com",
  projectId: "quality-smiles",
  storageBucket: "quality-smiles.appspot.com",
  messagingSenderId: "273733149863",
  appId: "1:273733149863:web:180d5789bdafec3a86e782"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
// autocomplete=”webauthn”
export { messaging, getToken, onMessage };




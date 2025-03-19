// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-entegraam.firebaseapp.com",
  projectId: "mern-auth-entegraam",
  storageBucket: "mern-auth-entegraam.firebasestorage.app",
  messagingSenderId: "1046066757580",
  appId: "1:1046066757580:web:f8d571ed4e11d428a16769"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
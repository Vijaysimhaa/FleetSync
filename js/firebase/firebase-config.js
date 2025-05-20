// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdpQz_HS52qkYF3tRMnNLnvbK5u2Ssug8",
    authDomain: "fleetsync-1127.firebaseapp.com",
    projectId: "fleetsync-1127",
    storageBucket: "fleetsync-1127.firebasestorage.app",
    messagingSenderId: "329236279873",
    appId: "1:329236279873:web:1d01929377f6a370574cc0",
    measurementId: "G-073H96LD75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db, analytics };
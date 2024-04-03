// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "scheduler-afba3.firebaseapp.com",
    projectId: "scheduler-afba3",
    storageBucket: "scheduler-afba3.appspot.com",
    messagingSenderId: "587267923740",
    appId: "1:587267923740:web:78d1f71fe25c14c16fa4d9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
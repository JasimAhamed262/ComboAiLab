// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.Next_PUBLIC_FIREBASE_API_KEY,
  authDomain: "aicom-89d2b.firebaseapp.com",
  projectId: "aicom-89d2b",
  storageBucket: "aicom-89d2b.firebasestorage.app",
  messagingSenderId: "336370866285",
  appId: "1:336370866285:web:d0c53634cd6782eced0764",
  measurementId: "G-99Q34HQXJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
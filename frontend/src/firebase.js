// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC-2E3qMowf_FhGT5H1-N-qPvvvdMdijM",
  authDomain: "port-208eb.firebaseapp.com",
  projectId: "port-208eb",
  storageBucket: "port-208eb.firebasestorage.app",
  messagingSenderId: "380565071343",
  appId: "1:380565071343:web:a4b7d6d1d8bc926350421a",
  measurementId: "G-TZHE5DJ21B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
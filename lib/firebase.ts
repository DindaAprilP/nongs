// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDxNc96WQeYkpnZKUvLn-RMTUHUrAgh-Bw",
  authDomain: "nongska26.firebaseapp.com",
  databaseURL: "https://nongska26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nongska26",
  storageBucket: "nongska26.appspot.com",
  messagingSenderId: "95734642465",
  appId: "1:95734642465:web:a093e13c133af006273060",
  measurementId: "G-13SP65RCWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore DB (INI YANG KURANG)
export const db = getFirestore(app);

// Analytics (hanya jalan di browser)
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
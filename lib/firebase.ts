// Import fungsi-fungsi yang diperlukan dari SDK Firebase
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 1. Ambil data konfigurasi ini dari Firebase Console (Project Settings > General)
const firebaseConfig = {
  apiKey: "AIzaSyDxNc96WQeYkpnZKUvLn-RMTUHUrAgh-Bw", // Ganti dengan API Key milikmu
  authDomain: "nongkrong-solo.firebaseapp.com",
  projectId: "nongkrong-solo",
  storageBucket: "nongkrong-solo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};

// 2. Inisialisasi Firebase
// Kode ini memastikan agar Firebase tidak di-inisialisasi ulang setiap kali kamu save file (hot-reload)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 3. EXPORT variabel db agar bisa dipanggil di file page.tsx
// Tanpa kata 'export', file lain tidak akan bisa menemukan 'db'
export const db = getFirestore(app); 
export const auth = getAuth(app);
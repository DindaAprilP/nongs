'use client'

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

// Definisi tipe data agar tidak error (TypeScript)
interface TempatNongkrong {
  id: string;
  nama: string;
  lokasi: string;
  rating: string | number;
}

export default function Home() {
  const [places, setPlaces] = useState<TempatNongkrong[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "places"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TempatNongkrong[];
        
        setPlaces(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-zinc-900">
      <header className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          Nongkrong di Solo
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Rekomendasi tempat santai terbaik di sekitar Surakarta
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        {loading ? (
          <p className="text-center text-zinc-500">Memuat data...</p>
        ) : places.length === 0 ? (
          <p className="text-center text-zinc-500">Belum ada data tempat nongkrong.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {places.map((place) => (
              <div 
                key={place.id} 
                className="p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {place.nama}
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                   📍 {place.lokasi}
                </p>
                <div className="mt-4 flex items-center">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ {place.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
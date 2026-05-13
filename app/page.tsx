'use client'

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";

interface TempatNongkrong {
  id: string;
  nama: string;
  lokasi: string;
  rating: string | number;
}

export default function Home() {
  const [places, setPlaces] = useState<TempatNongkrong[]>([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [form, setForm] = useState({
    nama: "",
    lokasi: "",
    rating: ""
  });

  const [editId, setEditId] = useState<string | null>(null);

  // FETCH DATA
  const fetchPlaces = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "places"));
      const data = querySnapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          nama: d.nama ?? "",
          lokasi: d.lokasi ?? "",
          rating: d.rating ?? 0,
        };
      });

      setPlaces(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  // CREATE
  const handleAdd = async () => {
    try {
      await addDoc(collection(db, "places"), {
        nama: form.nama,
        lokasi: form.lokasi,
        rating: form.rating,
      });

      setForm({ nama: "", lokasi: "", rating: "" });
      fetchPlaces();
    } catch (err) {
      console.error("Gagal tambah data:", err);
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "places", id));
      fetchPlaces();
    } catch (err) {
      console.error("Gagal hapus data:", err);
    }
  };

  // EDIT MODE
  const handleEdit = (place: TempatNongkrong) => {
    setEditId(place.id);
    setForm({
      nama: place.nama,
      lokasi: place.lokasi,
      rating: String(place.rating),
    });
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editId) return;

    try {
      await updateDoc(doc(db, "places", editId), {
        nama: form.nama,
        lokasi: form.lokasi,
        rating: form.rating,
      });

      setEditId(null);
      setForm({ nama: "", lokasi: "", rating: "" });
      fetchPlaces();
    } catch (err) {
      console.error("Gagal update data:", err);
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-100 px-4 py-10">
    {/* HEADER */}
    <header className="max-w-5xl mx-auto text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-pink">
        Nongkrong di Solo ☕
      </h1>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">
        List tempat nonkrong yang ada di Solo
      </p>
    </header>

<div className="max-w-5xl mx-auto mb-10 bg-white/70 dark:bg-zinc-800/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 shadow-lg">

  <div className="flex flex-col md:flex-row gap-3">

    {/* Nama */}
    <input
      className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Nama tempat"
      value={form.nama}
      onChange={(e) => setForm({ ...form, nama: e.target.value })}
    />

    {/* Lokasi */}
    <input
      className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Lokasi"
      value={form.lokasi}
      onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
    />

    {/* Rating */}
    <input
      className="w-full md:w-32 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Rating"
      value={form.rating}
      onChange={(e) => setForm({ ...form, rating: e.target.value })}
    />

    {/* Button */}
    <button
      onClick={editId ? handleUpdate : handleAdd}
      className={`px-6 py-3 rounded-xl font-medium transition ${
        editId
          ? "bg-yellow-500 hover:bg-yellow-600 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {editId ? "Update" : "Tambah"}
    </button>

  </div>
</div>

<main className="max-w-5xl mx-auto">
  {loading ? (
    <p className="text-center text-zinc-500">Memuat data...</p>
  ) : places.length === 0 ? (
    <p className="text-center text-zinc-500">
      Belum ada data tempat nongkrong.
    </p>
  ) : (
    <div className="overflow-x-auto bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-lg">

      {/* HEADER */}
      <div className="min-w-[700px] grid grid-cols-4 bg-zinc-100 dark:bg-zinc-700 p-4 font-semibold text-sm text-zinc-700 dark:text-zinc-200">
        <div>Nama</div>
        <div>Lokasi</div>
        <div>Rating</div>
        <div>Aksi</div>
      </div>

      {/* ROWS */}
      {places.map((place) => (
        <div
          key={place.id}
          className="min-w-[700px] grid grid-cols-4 p-4 border-t border-zinc-200 dark:border-zinc-700 items-center hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
        >
          <div className="font-medium text-zinc-900 dark:text-white">
            {place.nama}
          </div>

          <div className="text-sm text-zinc-500">
            📍 {place.lokasi}
          </div>

          <div>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
              ⭐ {place.rating}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(place)}
              className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(place.id)}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}

    </div>
  )}
</main>
  </div>
);
}
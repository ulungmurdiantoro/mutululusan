"use client";

import { useState } from "react";

const jenisOptions = ["Perguruan Tinggi", "Industri & Laboratorium"] as const;

export function PenawaranForm() {
  const [jenis, setJenis] = useState<(typeof jenisOptions)[number]>("Perguruan Tinggi");
  const [institution, setInstitution] = useState("");
  const [picName, setPicName] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [kebutuhan, setKebutuhan] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ fallbackWaLink: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/penawaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jenis, institution, picName, jabatan, email, whatsapp, kebutuhan }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Gagal mengirim permintaan.");
        return;
      }
      setDone(data);
    } catch {
      setError("Tidak dapat terhubung ke server. Coba lagi atau hubungi admin via WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mt-8 rounded-2xl border border-sky-200 bg-sky-50 p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900">Permintaan Anda telah kami terima</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Tim kami akan menghubungi Anda melalui email atau WhatsApp paling lambat 1×24 jam
          kerja. Butuh respons lebih cepat?
        </p>
        <a
          href={done.fallbackWaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa mt-5"
        >
          Hubungi via WhatsApp Sekarang
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <fieldset className="rounded-2xl border border-slate-200 bg-white p-6">
        <legend className="px-2 font-bold text-slate-900">Jenis Institusi</legend>
        <div className="flex flex-wrap gap-3">
          {jenisOptions.map((opt) => (
            <label
              key={opt}
              className={`cursor-pointer rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                jenis === opt
                  ? "border-sky-600 bg-sky-50 text-sky-700"
                  : "border-slate-300 text-slate-600 hover:border-sky-400"
              }`}
            >
              <input
                type="radio"
                name="jenis"
                value={opt}
                checked={jenis === opt}
                onChange={() => setJenis(opt)}
                className="sr-only"
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-slate-200 bg-white p-6">
        <legend className="px-2 font-bold text-slate-900">Data Instansi & PIC</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Nama instansi *</span>
            <input
              type="text"
              required
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Universitas / PT / Lembaga"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Nama PIC *</span>
            <input
              type="text"
              required
              value={picName}
              onChange={(e) => setPicName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Jabatan (opsional)</span>
            <input
              type="text"
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              placeholder="mis. Wakil Dekan, HR Manager"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email PIC *</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">No. WhatsApp PIC *</span>
            <input
              type="tel"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Kebutuhan *</span>
            <textarea
              required
              rows={4}
              value={kebutuhan}
              onChange={(e) => setKebutuhan(e.target.value)}
              placeholder="Program yang diminati, perkiraan jumlah peserta, skema (in-house/kemitraan), target waktu pelaksanaan, dll."
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
            />
          </label>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
        )}

        <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full disabled:opacity-60">
          {submitting ? "Mengirim…" : "Kirim Permintaan Penawaran"}
        </button>
      </fieldset>
    </form>
  );
}

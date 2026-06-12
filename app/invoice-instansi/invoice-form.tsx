"use client";

import { useState } from "react";
import { formatDateRange, formatRupiah } from "@/lib/format";
import { site, waLink } from "@/lib/site";

interface FormBatch {
  id: string;
  startDate: string;
  endDate: string;
  mode: string;
  location: string | null;
}

interface FormProgram {
  slug: string;
  title: string;
  basePrice: number | null;
  tieredPrices: { label: string; price: number }[] | null;
  batches: FormBatch[];
}

interface InvoiceResult {
  invoiceNumber: string;
  program: string;
  batch: string;
  qty: number;
  unitPrice: number;
  total: number;
  bank: { bankName: string; accountNumber: string; accountHolder: string };
}

export function InvoiceForm({ programs }: { programs: FormProgram[] }) {
  const [slug, setSlug] = useState(programs[0]?.slug ?? "");
  const program = programs.find((p) => p.slug === slug) ?? programs[0];

  const [batchId, setBatchId] = useState(program?.batches[0]?.id ?? "");
  const [tier, setTier] = useState(program?.tieredPrices?.[0]?.label ?? "");
  const [institution, setInstitution] = useState("");
  const [picName, setPicName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [npwp, setNpwp] = useState("");
  const [address, setAddress] = useState("");
  const [qty, setQty] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvoiceResult | null>(null);

  function onProgramChange(nextSlug: string) {
    setSlug(nextSlug);
    const next = programs.find((p) => p.slug === nextSlug);
    setBatchId(next?.batches[0]?.id ?? "");
    setTier(next?.tieredPrices?.[0]?.label ?? "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          batchId,
          tier: tier || undefined,
          institution,
          picName,
          email,
          whatsapp,
          npwp,
          address,
          qty,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Gagal membuat invoice.");
        return;
      }
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Tidak dapat terhubung ke server. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="mt-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 print:border-0 print:shadow-none" id="invoice">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-lg font-bold text-sky-700">
                {site.name}
              </p>
              <p className="text-sm text-slate-500">Proforma Invoice</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-bold text-slate-900">{result.invoiceNumber}</p>
              <p className="text-sm text-slate-500">
                {new Date().toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Ditagihkan kepada</p>
              <p className="mt-1 font-semibold text-slate-900">{institution}</p>
              <p className="text-sm text-slate-600">u.p. {picName}</p>
              {npwp && <p className="text-sm text-slate-600">NPWP: {npwp}</p>}
              {address && <p className="text-sm text-slate-600">{address}</p>}
              <p className="text-sm text-slate-600">{email} · {whatsapp}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs uppercase tracking-wide text-slate-400">Pembayaran ke</p>
              <p className="mt-1 font-semibold text-slate-900">{result.bank.bankName}</p>
              <p className="text-sm text-slate-600">{result.bank.accountNumber}</p>
              <p className="text-sm text-slate-600">a.n. {result.bank.accountHolder}</p>
            </div>
          </div>

          <table className="mt-6 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-2">Deskripsi</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Harga</th>
                <th className="py-2 text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3">
                  <p className="font-semibold text-slate-900">{result.program}</p>
                  <p className="text-slate-500">Batch {result.batch}{tier ? ` · ${tier}` : ""}</p>
                </td>
                <td className="py-3 text-center">{result.qty}</td>
                <td className="py-3 text-right">{formatRupiah(result.unitPrice)}</td>
                <td className="py-3 text-right">{formatRupiah(result.total)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="py-3 text-right font-bold text-slate-900">Total</td>
                <td className="py-3 text-right text-base font-bold text-sky-700">
                  {formatRupiah(result.total)}
                </td>
              </tr>
            </tfoot>
          </table>

          <p className="mt-6 text-xs text-slate-500">
            Proforma invoice ini berlaku sebagai dasar pengadaan. Kursi peserta
            terkonfirmasi setelah pembayaran diterima. Konfirmasi pembayaran ke
            admin dengan menyertakan nomor invoice di atas.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row print:hidden">
          <button type="button" onClick={() => window.print()} className="btn-primary">
            Cetak / Simpan PDF
          </button>
          <a
            href={waLink(`Halo admin, saya sudah membuat invoice instansi ${result.invoiceNumber} untuk ${result.program}. Mohon ditindaklanjuti.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa"
          >
            Konfirmasi ke Admin
          </a>
        </div>
        <p className="mt-3 text-sm text-slate-500 print:hidden">
          Salinan invoice juga telah dikirim ke {email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <fieldset className="rounded-2xl border border-slate-200 bg-white p-6">
        <legend className="px-2 font-bold text-slate-900">Program & Batch</legend>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Program</span>
          <select
            value={slug}
            onChange={(e) => onProgramChange(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
          >
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>{p.title}</option>
            ))}
          </select>
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-semibold text-slate-700">Batch</span>
          <select
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
          >
            {program?.batches.map((b) => (
              <option key={b.id} value={b.id}>
                {formatDateRange(b.startDate, b.endDate)} · {b.mode}
                {b.location ? ` · ${b.location}` : ""}
              </option>
            ))}
          </select>
        </label>
        {program?.tieredPrices && (
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-700">Kategori</span>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
            >
              {program.tieredPrices.map((t) => (
                <option key={t.label} value={t.label}>
                  {t.label} — {formatRupiah(t.price)}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="mt-4 block">
          <span className="text-sm font-semibold text-slate-700">Jumlah peserta</span>
          <input
            type="number"
            min={1}
            max={200}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
          />
        </label>
      </fieldset>

      <fieldset className="rounded-2xl border border-slate-200 bg-white p-6">
        <legend className="px-2 font-bold text-slate-900">Data Instansi</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Nama instansi *</span>
            <input type="text" required value={institution} onChange={(e) => setInstitution(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
              placeholder="PT / Lembaga / Universitas" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Nama PIC *</span>
            <input type="text" required value={picName} onChange={(e) => setPicName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
              placeholder="Penanggung jawab" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">NPWP (opsional)</span>
            <input type="text" value={npwp} onChange={(e) => setNpwp(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email PIC *</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
              placeholder="pic@instansi.co.id" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">No. WhatsApp PIC *</span>
            <input type="tel" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
              placeholder="08xxxxxxxxxx" />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Alamat instansi (opsional)</span>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none" />
          </label>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
        )}

        <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full disabled:opacity-60">
          {submitting ? "Membuat invoice…" : "Buat Proforma Invoice"}
        </button>
      </fieldset>
    </form>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getAllPrograms } from "@/lib/programs";
import { InvoiceForm } from "./invoice-form";

export const metadata: Metadata = {
  title: "Daftar via Invoice Instansi",
  description:
    "Daftarkan tim Anda dengan invoice resmi atas nama instansi dan pembayaran transfer korporat. Buat proforma invoice pelatihan dalam hitungan menit.",
  alternates: { canonical: "/invoice-instansi" },
};

export default function InvoiceInstansiPage() {
  const programs = getAllPrograms()
    .filter((p) => p.basePrice !== null || (p.tieredPrices?.length ?? 0) > 0)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      basePrice: p.basePrice,
      tieredPrices: p.tieredPrices ?? null,
      batches: p.batches.map((b) => ({
        id: b.id,
        startDate: b.startDate,
        endDate: b.endDate,
        mode: b.mode,
        location: b.location ?? null,
      })),
    }));

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sky-700">Beranda</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Invoice Instansi</span>
        </nav>

        <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          Daftar via Invoice Instansi
        </h1>
        <p className="mt-3 text-slate-600">
          Banyak peserta dibayari kantor? Buat proforma invoice resmi atas nama
          instansi Anda untuk proses pengadaan, lalu bayar via transfer korporat.
          Invoice juga dikirim ke email PIC.
        </p>

        <InvoiceForm programs={programs} />

        <p className="mt-6 text-sm text-slate-500">
          Butuh pelatihan dengan materi & jadwal khusus untuk tim?{" "}
          <Link href="/in-house-training" className="font-semibold text-sky-700 hover:underline">
            Lihat In-House Training
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

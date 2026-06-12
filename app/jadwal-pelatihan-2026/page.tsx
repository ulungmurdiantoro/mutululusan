import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { formatDateRange } from "@/lib/format";
import { priceLabel, upcomingAcrossPrograms, getAllPrograms } from "@/lib/programs";
import { site, waLink } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Jadwal Pelatihan Laboratorium 2026 — Kalender Lengkap",
  description:
    "Kalender lengkap jadwal pelatihan laboratorium 2026: K3 lab, GLP, QC/QA, ISO 9001, sensori pangan. Pilih tanggal, daftar & bayar online!",
  alternates: { canonical: "/jadwal-pelatihan-2026" },
};

const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export default function JadwalPage() {
  const allEntries = getAllPrograms()
    .flatMap((program) => program.batches.map((batch) => ({ program, batch })))
    .sort((a, b) => a.batch.startDate.localeCompare(b.batch.startDate));
  const upcoming = new Set(upcomingAcrossPrograms().map((e) => e.batch.id));

  const byMonth = new Map<string, typeof allEntries>();
  for (const entry of allEntries) {
    const month = entry.batch.startDate.slice(0, 7);
    byMonth.set(month, [...(byMonth.get(month) ?? []), entry]);
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Jadwal Pelatihan 2026",
        item: `${site.url}/jadwal-pelatihan-2026`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sky-700">Beranda</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">Jadwal 2026</span>
          </nav>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Jadwal Pelatihan Laboratorium 2026
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Kalender lengkap seluruh batch pelatihan & sertifikasi kompetensi
            laboratorium sepanjang 2026. Klik program untuk detail silabus, atau
            langsung daftar dan bayar online.
          </p>
          <a
            href={waLink("Halo admin, tolong kirimkan file jadwal lengkap pelatihan 2026.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa mt-5 px-5 py-2.5 text-sm"
          >
            Minta Jadwal Lengkap via WhatsApp
          </a>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          {[...byMonth.entries()].map(([month, entries]) => {
            const monthIndex = Number(month.slice(5)) - 1;
            return (
              <div key={month} className="mb-10">
                <h2 className="text-xl font-bold text-slate-900">
                  {MONTH_NAMES[monthIndex]} 2026
                </h2>
                <div className="mt-4 space-y-3">
                  {entries.map(({ program, batch }) => {
                    const isUpcoming = upcoming.has(batch.id);
                    return (
                      <div
                        key={batch.id}
                        className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
                          isUpcoming
                            ? "border-slate-200 bg-white"
                            : "border-slate-100 bg-slate-50 opacity-60"
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-sky-700">
                            {formatDateRange(batch.startDate, batch.endDate)}
                            {batch.needsConfirmation ? " *" : ""} · {batch.mode}
                            {batch.location ? ` · ${batch.location}` : ""}
                          </p>
                          <Link
                            href={`/pelatihan/${program.slug}`}
                            className="mt-0.5 block font-bold text-slate-900 hover:text-sky-700"
                          >
                            {program.title}
                          </Link>
                          <p className="text-sm text-slate-500">{program.subtitle}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-4">
                          <p className="font-bold text-sky-700">{priceLabel(program)}</p>
                          {isUpcoming ? (
                            <Link
                              href={`/pelatihan/${program.slug}`}
                              className="btn-primary px-4 py-2 text-sm"
                            >
                              Daftar
                            </Link>
                          ) : (
                            <span className="text-sm font-medium text-slate-400">Selesai</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <p className="text-xs text-slate-500">
            * Tanggal menunggu konfirmasi final penyelenggara. Peserta terdaftar
            akan dihubungi jika ada penyesuaian.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Butuh jadwal khusus untuk tim Anda?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Kami menyelenggarakan in-house training dengan jadwal dan materi yang
            disesuaikan kebutuhan instansi.
          </p>
          <Link href="/in-house-training" className="btn-outline mt-5">
            Pelajari In-House Training
          </Link>
        </div>
      </section>
    </>
  );
}

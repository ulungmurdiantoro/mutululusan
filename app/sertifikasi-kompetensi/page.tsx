import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { getAllPrograms } from "@/lib/programs";
import { ProgramCard } from "@/components/program-card";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sertifikasi Kompetensi Laboratorium — Jalur & Syarat",
  description:
    "Pahami jalur sertifikasi kompetensi laboratorium: syarat, tahapan asesmen, dan program pelatihan 24 JP sebagai pintu masuknya. Mulai di sini!",
  alternates: { canonical: "/sertifikasi-kompetensi" },
};

const steps = [
  {
    title: "1. Ikuti pelatihan 24 JP",
    desc: "Pilih program pelatihan sesuai bidang Anda. Sertifikat pelatihan 24 JP menjadi syarat masuk jalur sertifikasi kompetensi.",
  },
  {
    title: "2. Daftar skema sertifikasi",
    desc: "Admin membantu memilihkan skema kompetensi yang sesuai dengan pengalaman dan jenjang karier Anda.",
  },
  {
    title: "3. Lengkapi portofolio",
    desc: "Siapkan bukti pendukung: sertifikat pelatihan, riwayat pekerjaan, dan dokumen kompetensi lain sesuai skema.",
  },
  {
    title: "4. Ikuti asesmen",
    desc: "Asesmen dilakukan oleh asesor kompeten melalui uji tulis, wawancara, dan/atau observasi sesuai skema.",
  },
  {
    title: "5. Terima sertifikat kompetensi",
    desc: "Peserta yang dinyatakan kompeten menerima sertifikat kompetensi sebagai pengakuan formal keahlian Anda.",
  },
];

export default function SertifikasiPage() {
  const hybridPrograms = getAllPrograms().filter((p) => p.type === "hybrid");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sertifikasi Kompetensi",
        item: `${site.url}/sertifikasi-kompetensi`,
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
            <span className="text-slate-900">Sertifikasi Kompetensi</span>
          </nav>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Sertifikasi Kompetensi Laboratorium
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Sertifikat pelatihan membuktikan Anda telah belajar; sertifikat
            kompetensi membuktikan Anda <em>bisa</em>. Pelajari jalur lengkapnya
            di sini — dimulai dari pelatihan 24 JP.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Mengapa Sertifikasi Kompetensi Penting?
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Pengakuan formal",
                desc: "Kompetensi Anda diakui melalui asesmen oleh asesor, bukan sekadar kehadiran di kelas.",
              },
              {
                title: "Daya saing karier",
                desc: "Banyak instansi dan industri memprioritaskan kandidat dan karyawan yang tersertifikasi kompetensinya.",
              },
              {
                title: "Pemenuhan persyaratan",
                desc: "Standar seperti ISO/IEC 17025 menuntut personel laboratorium yang terbukti kompeten.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 p-5">
                <p className="font-bold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold text-slate-900">
            Jalur Menuju Sertifikat Kompetensi
          </h2>
          <ol className="mt-6 space-y-4">
            {steps.map((step) => (
              <li key={step.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-bold text-sky-700">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-sky-100 bg-sky-50 p-7 text-center text-slate-900">
            <h2 className="text-xl font-bold">Mulai dari pelatihan 24 JP</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
              Pilih program pelatihan sesuai bidang Anda — sertifikatnya menjadi
              tiket masuk jalur sertifikasi kompetensi.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/pelatihan" className="btn-primary">
                Pilih Program Pelatihan
              </Link>
              <a
                href={waLink("Halo admin, saya ingin konsultasi jalur sertifikasi kompetensi laboratorium.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                Konsultasi Skema via WA
              </a>
            </div>
          </div>
        </div>
      </section>

      {hybridPrograms.length > 0 && (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Paket Pelatihan + Sertifikasi Sekaligus
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Program berikut sudah memaketkan pelatihan dan asesmen sertifikasi
              kompetensi dalam satu rangkaian:
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hybridPrograms.map((p) => (
                <ProgramCard key={p.slug} program={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

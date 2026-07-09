import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { getAllPrograms } from "@/lib/programs";
import { ProgramCard } from "@/components/program-card";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sertifikasi Kompetensi Laboratorium — Mitra LSP Edukia",
  description:
    "mutululusan.id menyelenggarakan pelatihan; uji & sertifikasi kompetensi laboratorium diselenggarakan mitra resmi kami, LSP Edukia. Pahami jalurnya di sini.",
  alternates: { canonical: "/sertifikasi-kompetensi" },
};

const steps = [
  {
    title: "1. Ikuti pelatihan 24 JP",
    desc: "Pilih program pelatihan sesuai bidang Anda di mutululusan.id. Anda mendapatkan e-sertifikat pelatihan 24 JP sebagai bekal awal.",
  },
  {
    title: "2. Daftar skema sertifikasi (LSP Edukia)",
    desc: "Admin kami menghubungkan Anda dengan mitra resmi, LSP Edukia, untuk memilih skema kompetensi yang sesuai dengan pengalaman dan jenjang karier Anda.",
  },
  {
    title: "3. Lengkapi portofolio",
    desc: "Siapkan bukti pendukung: sertifikat pelatihan, riwayat pekerjaan, dan dokumen kompetensi lain sesuai persyaratan skema LSP.",
  },
  {
    title: "4. Ikuti asesmen oleh LSP Edukia",
    desc: "Asesmen dilakukan oleh asesor kompeten dari LSP Edukia melalui uji tulis, wawancara, dan/atau observasi sesuai skema.",
  },
  {
    title: "5. Terima sertifikat kompetensi",
    desc: "Peserta yang dinyatakan kompeten menerima sertifikat kompetensi yang diterbitkan LSP Edukia sebagai pengakuan formal keahlian Anda.",
  },
];

export default async function SertifikasiPage() {
  // Program yang sudah memaketkan asesmen sertifikasi kompetensi (workshop offline).
  const allPrograms = await getAllPrograms();
  const packagedPrograms = allPrograms.filter((p) => p.type === "offline");

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
            <strong>mutululusan.id berfokus pada pelatihan.</strong> Untuk uji
            dan sertifikasi kompetensi, kami telah bekerja sama dengan mitra
            resmi <strong>LSP Edukia</strong> — Lembaga Sertifikasi Profesi yang
            menyelenggarakan asesmen dan menerbitkan sertifikat kompetensi.
          </p>
          <a
            href={site.partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mt-5 px-5 py-2.5 text-sm"
          >
            Kunjungi {site.partner.name} ({site.partner.domain}) →
          </a>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Bagaimana kemitraan ini bekerja?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Anda mengikuti pelatihan bersertifikat di mutululusan.id, lalu
              melanjutkan ke uji kompetensi yang diselenggarakan LSP Edukia.
              Sertifikat <em>pelatihan</em> kami menjadi bekal; sertifikat
              <em> kompetensi</em> diterbitkan oleh LSP Edukia setelah Anda lulus
              asesmen. Untuk <strong>workshop sensori pangan</strong>, asesmen
              kompetensi LSP Edukia bahkan sudah dipaketkan langsung dalam
              program.
            </p>
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Mengapa Sertifikasi Kompetensi Penting?
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Pengakuan formal",
                desc: "Kompetensi Anda diakui melalui asesmen oleh asesor LSP, bukan sekadar kehadiran di kelas.",
              },
              {
                title: "Daya saing karier",
                desc: "Banyak instansi dan industri memprioritaskan kandidat dan karyawan yang tersertifikasi kompetensinya.",
              },
              {
                title: "Pemenuhan persyaratan",
                desc: "Banyak standar mutu menuntut personel laboratorium yang terbukti kompeten.",
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

          <div className="mt-10 rounded-2xl bg-sky-900 p-7 text-center text-white">
            <h2 className="text-xl font-bold">Mulai dari pelatihan 24 JP</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-sky-100">
              Pilih program pelatihan sesuai bidang Anda — sertifikatnya menjadi
              bekal mengikuti sertifikasi kompetensi bersama LSP Edukia.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/pelatihan" className="btn-primary">
                Pilih Program Pelatihan
              </Link>
              <a
                href={waLink("Halo admin, saya ingin konsultasi jalur sertifikasi kompetensi laboratorium (LSP Edukia).")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Konsultasi Skema via WA
              </a>
            </div>
          </div>
        </div>
      </section>

      {packagedPrograms.length > 0 && (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Paket Pelatihan + Sertifikasi (LSP Edukia)
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Program berikut sudah memaketkan pelatihan dan asesmen sertifikasi
              kompetensi oleh LSP Edukia dalam satu rangkaian:
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {packagedPrograms.map((p) => (
                <ProgramCard key={p.slug} program={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

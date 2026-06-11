import Link from "next/link";
import type { Metadata } from "next";
import { Countdown } from "@/components/countdown";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { ProgramCard } from "@/components/program-card";
import { formatDateRange } from "@/lib/format";
import {
  getAllPrograms,
  priceLabel,
  typeLabel,
  upcomingAcrossPrograms,
} from "@/lib/programs";
import { paymentMicrocopy, site, waLink } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Pelatihan Laboratorium 2026 — Sertifikat 24 JP | mutululusan.id",
  description:
    "Pelatihan dan sertifikasi laboratorium online & offline 2026: ISO 17025, K3 lab, GLP, QC/QA. e-Sertifikat 24 JP, bayar langsung via QRIS/VA.",
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    question: "Bagaimana cara mendaftar pelatihan di mutululusan.id?",
    answer:
      "Pilih program di halaman pelatihan, klik Daftar & Bayar Sekarang, pilih batch, isi data peserta, lalu bayar langsung via QRIS, virtual account, e-wallet, atau kartu. Seluruh proses kurang dari 2 menit.",
  },
  {
    question: "Apakah saya mendapatkan sertifikat setelah pelatihan?",
    answer:
      "Ya. Peserta pelatihan online mendapatkan e-sertifikat 24 JP (jam pelajaran) yang dikirim setelah pelatihan selesai, beserta soft copy materi dan rekaman.",
  },
  {
    question: "Bagaimana jika saya berhalangan hadir saat pelatihan?",
    answer:
      "Seluruh sesi direkam. Anda tetap mendapatkan rekaman lengkap, materi, dan e-sertifikat selama terdaftar sebagai peserta.",
  },
  {
    question: "Apakah bisa didaftarkan dan dibayari oleh kantor/instansi?",
    answer:
      "Bisa. Kami melayani pendaftaran instansi dengan invoice resmi dan pembayaran transfer korporat. Hubungi admin via WhatsApp atau gunakan halaman In-House Training untuk penawaran.",
  },
  {
    question: "Apa itu sertifikasi kompetensi dan bagaimana jalurnya?",
    answer:
      "Sertifikasi kompetensi adalah pengakuan formal atas kompetensi kerja Anda melalui asesmen. Sertifikat pelatihan 24 JP dari program kami menjadi syarat untuk melanjutkan ke jalur sertifikasi kompetensi.",
  },
];

const trustItems = [
  { label: "e-Sertifikat 24 JP", detail: "diakui untuk pengembangan profesi" },
  { label: "Rekaman & Materi", detail: "akses ulang kapan saja" },
  { label: "18 Program 2026", detail: "online, hybrid & offline" },
  { label: "QRIS · VA · e-Wallet · Kartu", detail: "pembayaran aman & instan" },
];

export default function HomePage() {
  const programs = getAllPrograms();
  const nextBatches = upcomingAcrossPrograms(3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

      {/* Hero */}
      <section className="border-b border-slate-200 bg-linear-to-br from-white via-sky-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-sm font-medium text-sky-700">
              Jadwal pelatihan 2026 telah dibuka
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Pelatihan Laboratorium & Sertifikasi Kompetensi 2026
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {site.tagline} ISO/IEC 17025, K3 laboratorium, GLP, QC/QA, hingga
              uji sensori pangan — dibimbing praktisi berpengalaman.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/jadwal-pelatihan-2026" className="btn-primary">
                Lihat Jadwal & Daftar
              </Link>
              <a
                href={waLink("Halo admin, saya ingin konsultasi memilih pelatihan laboratorium.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                Konsultasi via WhatsApp
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-500">{paymentMicrocopy}</p>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.label}>
              <p className="font-bold text-slate-900">{item.label}</p>
              <p className="text-sm text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Batch terdekat */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Batch Terdekat
              </h2>
              <p className="mt-2 text-slate-600">
                Amankan kursi Anda sebelum batch dimulai.
              </p>
            </div>
            <Link
              href="/jadwal-pelatihan-2026"
              className="hidden text-sm font-semibold text-sky-700 hover:text-sky-800 sm:block"
            >
              Lihat semua jadwal →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {nextBatches.map(({ program, batch }) => (
              <article
                key={batch.id}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                  {typeLabel[program.type]}
                  {batch.location ? ` · ${batch.location}` : ""}
                </p>
                <h3 className="mt-2 font-bold leading-snug text-slate-900">
                  {program.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {formatDateRange(batch.startDate, batch.endDate)} · 09.00–16.00 WIB
                </p>
                <div className="mt-4">
                  <Countdown targetDate={batch.startDate} />
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <p className="font-bold text-sky-700">{priceLabel(program)}</p>
                  <Link
                    href={`/checkout/${program.slug}?batch=${batch.id}`}
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    Daftar & Bayar
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Katalog ringkas */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Katalog Pelatihan 2026
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            18 program pelatihan dan sertifikasi kompetensi bidang laboratorium —
            dari sistem mutu hingga keamanan pangan.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Kenapa kami */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Kenapa Belajar di mutululusan.id?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Daftar & bayar dalam 2 menit",
                desc: "Tanpa formulir berbelit. Pilih batch, isi data, bayar via QRIS/VA — kursi langsung terkonfirmasi.",
              },
              {
                title: "Rekaman & materi selamanya",
                desc: "Berhalangan hadir? Semua sesi direkam dan materi lengkap dikirim ke email Anda.",
              },
              {
                title: "Jalur sertifikasi kompetensi",
                desc: "Sertifikat pelatihan 24 JP menjadi syarat lanjut ke sertifikasi kompetensi — karier naik kelas.",
              },
              {
                title: "Dibimbing praktisi",
                desc: "Fasilitator berpengalaman di laboratorium pengujian, kalibrasi, dan industri.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-bold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ singkat */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="mt-8">
            <FaqList faqs={homeFaqs} />
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">
            Pertanyaan lain?{" "}
            <Link href="/faq" className="font-semibold text-sky-700 hover:underline">
              Lihat FAQ lengkap
            </Link>{" "}
            atau{" "}
            <a
              href={waLink("Halo admin, saya punya pertanyaan tentang pelatihan.")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sky-700 hover:underline"
            >
              tanya admin via WA
            </a>
            .
          </p>
        </div>
      </section>

      {/* CTA penutup */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="rounded-2xl border border-sky-100 bg-sky-50 px-6 py-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Siap Naik Kelas di Karier Laboratorium Anda?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Lihat kalender lengkap 18 program pelatihan 2026 dan amankan kursi
              Anda hari ini.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/jadwal-pelatihan-2026" className="btn-primary">
                Lihat Jadwal 2026
              </Link>
              <a
                href={waLink("Halo admin, tolong kirimkan jadwal lengkap pelatihan 2026.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                Minta Jadwal via WhatsApp
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-500">{paymentMicrocopy}</p>
          </div>
        </div>
      </section>
    </>
  );
}

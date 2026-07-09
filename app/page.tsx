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
import { Testimonials } from "@/components/testimonials";
import { getTestimonials } from "@/lib/testimonials";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Pelatihan Laboratorium 2026 — Sertifikat 24 JP | mutululusan.id",
  description:
    "Pelatihan kompetensi laboratorium online & offline 2026: K3 lab, GLP, QC/QA, ISO 9001. e-Sertifikat 24 JP, bayar langsung via QRIS/VA.",
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
      "Sertifikasi kompetensi adalah pengakuan formal atas kompetensi kerja Anda melalui asesmen. Kami berfokus pada pelatihan; uji dan sertifikasi kompetensinya diselenggarakan oleh mitra resmi kami, LSP Edukia. Sertifikat pelatihan 24 JP dari program kami dapat menjadi bekal untuk mengikuti jalur tersebut.",
  },
];

const trustItems = [
  { label: "e-Sertifikat 24 JP", detail: "diakui untuk pengembangan profesi" },
  { label: "Rekaman & Materi", detail: "akses ulang kapan saja" },
  { label: "16 Program 2026", detail: "online & offline" },
  { label: "QRIS · VA · e-Wallet · Kartu", detail: "pembayaran aman & instan" },
];

/* ── Ikon (path data dipakai ulang lintas seksi) ───────────────── */
const icon = {
  book: "M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
  flask: "M9 3h6M10 3v6.5L4.5 19a1.5 1.5 0 001.3 2.2h12.4a1.5 1.5 0 001.3-2.2L14 9.5V3",
  people:
    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 108 0 4 4 0 00-8 0z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  chart: "M3 3v18h18 M7 14l4-4 4 4 5-6",
  file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6M9 13h6M9 17h6M9 9h1",
  coin: "M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  target: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  check: "M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  briefcase: "M20 7h-3V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2H4a1 1 0 00-1 1v10a2 2 0 002 2h14a2 2 0 002-2V8a1 1 0 00-1-1z M9 7V5h6v2",
  cert: "M12 15a4 4 0 100-8 4 4 0 000 8z M8.5 14 7 22l5-3 5 3-1.5-8",
  mic: "M22 10v6M2 10l10-5 10 5-10 5-10-5z M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5M12 15V3",
  leaf: "M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 11 13 12 11",
  gear: "M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  mentor:
    "M12 12a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 005 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09A1.65 1.65 0 0015 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
};

function IconGlyph({ d, className = "text-sky-700" }: { d: string; className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

/* ── Ekosistem PT Padma Global Nusatama ────────────────────────── */
const ecosystemCards = [
  {
    tag: "mutuperguruantinggi.id",
    title: "Tata kelola perguruan tinggi",
    desc: "Penjaminan mutu, akreditasi, dan tata kelola institusi pendidikan tinggi.",
    href: "https://mutuperguruantinggi.id",
    external: true,
    iconD: icon.file,
    accent: "bg-sky-700",
  },
  {
    tag: "labnesia.id",
    title: "Tata kelola laboratorium",
    desc: "Standardisasi dan kompetensi laboratorium berbasis ISO/IEC 17025.",
    href: "https://labnesia.id",
    external: true,
    iconD: icon.flask,
    accent: "bg-emerald-700",
  },
  {
    tag: "mutululusan.id — Anda di sini",
    title: "Mahasiswa dan lulusan",
    desc: "Persiapan karier menuju profesional bagi mahasiswa, dosen, dan tendik.",
    href: null,
    external: false,
    iconD: icon.people,
    accent: "bg-orange-500",
  },
];

/* ── Untuk institusi (IKU / SKPI) ──────────────────────────────── */
const demandCards = [
  {
    tag: "IKU 2 & IKU 3",
    title: "Mendukung capaian Indikator Kinerja Utama",
    desc: "Persiapan karier yang terstruktur dapat mendukung capaian lulusan bekerja lebih cepat dan layak (IKU 2). Program mentoring dan studi kasus juga berpotensi diajukan sebagai pengalaman luar program studi yang diakui satuan kredit semester (IKU 3), sesuai kebijakan masing-masing perguruan tinggi.",
    iconD: icon.chart,
  },
  {
    tag: "SKPI",
    title: "Bukti pendukung Surat Keterangan Pendamping Ijazah",
    desc: "e-Sertifikat pelatihan dan kegiatan kompetensi yang diikuti mahasiswa dapat dicatat sebagai bagian dari rekam jejak Surat Keterangan Pendamping Ijazah (SKPI) — dokumen resmi pendamping ijazah yang wajib diterbitkan perguruan tinggi sesuai ketentuan yang berlaku.",
    iconD: icon.file,
  },
  {
    tag: "IKU 9",
    title: "Peluang pendapatan non-akademik institusi",
    desc: "Indikator Kinerja Utama mengakui jasa konsultasi dan pelatihan/sertifikasi profesi sebagai sumber pendapatan non-akademik (IKU 9). Skema kemitraan membuka peluang kampus turut menyelenggarakan dan memperoleh manfaat dari program kompetensi ini.",
    iconD: icon.coin,
  },
];

/* ── Skema kerja sama ──────────────────────────────────────────── */
const tierCards = [
  {
    title: "Individual / Satuan",
    sub: "Untuk mahasiswa, fresh graduate, atau profesional yang ingin mendaftar mandiri",
    points: [
      "Pendaftaran terbuka per peserta",
      "Pilih satu atau beberapa skema kompetensi",
      "Jadwal mengikuti batch terjadwal",
      "e-Sertifikat dan materi pelatihan",
    ],
    for: "perorangan yang ingin mulai dari satu program",
    iconD: icon.people,
    featured: false,
  },
  {
    title: "In-House / Private",
    sub: "Untuk satu fakultas, prodi, atau kelompok kerja dengan kebutuhan spesifik",
    points: [
      "Jadwal dan lokasi menyesuaikan kebutuhan",
      "Materi dapat disesuaikan dengan konteks institusi",
      "Kuota peserta tertutup, satu grup",
      "Laporan hasil pelatihan untuk internal",
    ],
    for: "satu unit/fakultas dengan kebutuhan tertentu",
    iconD: icon.file,
    featured: false,
  },
  {
    title: "Kemitraan / Partnership",
    sub: "Kerja sama jangka panjang antar institusi yang mencakup seluruh ekosistem",
    points: [
      "Skema tahunan, mencakup banyak program kompetensi",
      "Dapat digabung dengan skema mutuperguruantinggi.id dan labnesia.id",
      "Co-branding dan pelaporan berkala ke pimpinan institusi",
      "Pendampingan berkelanjutan dan jejaring praktisi",
    ],
    for: "perguruan tinggi yang ingin membangun ekosistem kompetensi menyeluruh",
    iconD: icon.people,
    featured: true,
  },
];

/* ── Coba gratis ────────────────────────────────────────────────── */
const giveValueCards = [
  {
    title: "Bootcamp pengenalan 1 hari",
    desc: "Sesi singkat berisi silabus, awareness, dan manfaat program kompetensi — cocok untuk perkenalan awal sebelum institusi memutuskan kemitraan.",
    tag: "Gratis",
    cta: "Lihat jadwal →",
    href: "/jadwal-pelatihan-2026",
    iconD: icon.file,
  },
  {
    title: "Asesmen kebutuhan kompetensi",
    desc: "Sesi pemetaan singkat untuk memahami kebutuhan kompetensi mahasiswa, dosen, atau tendik di institusi Anda — hasilnya berupa rekomendasi awal program yang relevan.",
    tag: "Gratis untuk institusi",
    cta: "Jadwalkan asesmen →",
    href: waLink("Halo admin, kami ingin menjadwalkan asesmen kebutuhan kompetensi untuk institusi kami."),
    iconD: icon.check,
  },
  {
    title: "Kuliah praktisi",
    desc: "Kami hadir ke kampus Anda — sesi tatap muka untuk mahasiswa tingkat akhir dan fresh graduate tentang persiapan karier menuju profesional.",
    tag: "Gratis untuk kampus mitra",
    cta: "Undang ke kampus →",
    href: waLink("Halo admin, kami ingin mengundang mutululusan.id untuk sesi kuliah praktisi di kampus kami."),
    iconD: icon.mic,
  },
  {
    title: "Silabus & panduan program",
    desc: "Unduh outline silabus lengkap, daftar skema kompetensi, dan panduan kemitraan tanpa perlu mendaftar terlebih dahulu.",
    tag: "Unduh gratis",
    cta: "Unduh silabus →",
    href: waLink("Halo admin, mohon dikirimkan silabus & panduan program mutululusan.id."),
    iconD: icon.download,
  },
];

/* ── Pilih bidang kariermu ─────────────────────────────────────── */
const careerCategories = [
  {
    key: "mgmt",
    name: "Management & Governance",
    desc: "Sistem manajemen, tata kelola, dan kepatuhan organisasi",
    iconD: icon.check,
    color: "sky",
    schemes: [
      { title: "Quality Management System (ISO 9001) Officer", slug: "iso-9001-officer" },
      { title: "Food Safety Management Officer", alias: "Petugas Sistem Keamanan Pangan", slug: "food-safety-management" },
      { title: "Regulatory Affairs Officer", slug: "regulatory-affairs-officer" },
      { title: "Quality Assurance Officer", slug: "quality-assurance-officer" },
      { title: "Corporate Legal Officer", slug: "corporate-legal-officer" },
    ],
  },
  {
    key: "sus",
    name: "Sustainability & ESG",
    desc: "Keberlanjutan lingkungan, sosial, dan tata kelola organisasi",
    iconD: icon.leaf,
    color: "emerald",
    schemes: [
      { title: "Environmental Management System (ISO 14001) Officer", slug: "iso-14001-officer" },
      { title: "ESG Officer", slug: "esg-officer" },
      { title: "Sustainability Officer", slug: "sustainability-officer" },
    ],
  },
  {
    key: "lab",
    name: "Laboratory & Testing",
    desc: "Sistem mutu, operasional, dan pengujian laboratorium",
    iconD: icon.flask,
    color: "teal",
    schemes: [
      { title: "Laboratory Quality System Officer", alias: "Petugas Sistem Mutu Laboratorium ISO/IEC 17025", slug: "iso-17025-quality-system-officer" },
      { title: "Panelis Terlatih Pengujian Sensori Pangan", slug: "uji-sensori-pangan" },
      { title: "GLP Laboratory Technician", alias: "Teknisi Laboratorium Berbasis GLP", slug: "glp-laboratory-technician" },
      { title: "Laboratory HSE Officer", alias: "Petugas K3L Laboratorium", slug: "laboratory-hse-officer-k3l" },
      { title: "Laboratory Operations Officer", alias: "Pranata Laboratorium", slug: "pranata-laboratorium" },
      { title: "QC Laboratory Analyst", alias: "Analis QC Laboratorium", slug: "qc-laboratory-analyst" },
      { title: "Research and Development Officer", slug: "research-development-officer" },
      { title: "Jaminan Mutu Hasil Pengujian", slug: "jaminan-mutu" },
      { title: "Ketidakpastian Pengukuran", alias: "Estimasi Measurement Uncertainty", slug: "ketidakpastian-pengukuran" },
    ],
  },
  {
    key: "eng",
    name: "Industrial Engineering & Lifting",
    desc: "Rekayasa teknik dan operasional lifting industri",
    iconD: icon.gear,
    color: "amber",
    schemes: [
      { title: "Lifting Engineer for Medium Lifting", slug: "lifting-engineer-medium" },
      { title: "Lifting Engineer for Heavy & Critical Lifting", slug: "lifting-engineer-heavy-critical" },
      { title: "2D Lifting Designer", slug: "lifting-designer-2d" },
      { title: "3D Lifting Designer", slug: "lifting-designer-3d" },
    ],
  },
] as const;

const categoryStyle: Record<string, { iconBg: string; iconText: string; tabBorder: string }> = {
  sky: { iconBg: "bg-sky-100", iconText: "text-sky-700", tabBorder: "border-sky-300 text-sky-700" },
  emerald: { iconBg: "bg-emerald-100", iconText: "text-emerald-700", tabBorder: "border-emerald-300 text-emerald-700" },
  teal: { iconBg: "bg-teal-100", iconText: "text-teal-700", tabBorder: "border-teal-300 text-teal-700" },
  amber: { iconBg: "bg-amber-100", iconText: "text-amber-800", tabBorder: "border-amber-300 text-amber-800" },
};

/* ── Alur program ──────────────────────────────────────────────── */
const programFlow = [
  { label: "Training", desc: "Pembelajaran terstruktur dasar hingga mahir", iconD: icon.book },
  { label: "Workshop", desc: "Praktik langsung bersama praktisi", iconD: icon.people },
  { label: "Mini project", desc: "Studi kasus nyata berbasis industri", iconD: icon.check },
  { label: "Mentoring", desc: "Bimbingan 1-on-1 dari mentor ahli", iconD: icon.mentor },
  { label: "Persiapan uji kompetensi", desc: "Pemenuhan persyaratan administrasi skema LSP", iconD: icon.check },
];

/* ── Untuk siapa platform ini ──────────────────────────────────── */
const audienceCards = [
  {
    title: "Mahasiswa",
    href: "/pelatihan",
    points: ["Persiapan sebelum lulus", "Bootcamp dan workshop", "Pelatihan kompetensi", "Career coaching", "Portfolio dan project"],
    bg: "bg-sky-700",
  },
  {
    title: "Fresh graduate",
    href: "/pelatihan",
    points: ["Upgrade CV", "Mock interview", "Kompetensi industri", "Career roadmap", "Persiapan uji kompetensi"],
    bg: "bg-orange-500",
  },
  {
    title: "Dosen dan tendik",
    href: "/pelatihan",
    points: ["Persiapan karier menuju profesional", "Pelatihan pendukung Tridarma", "Pengembangan kompetensi", "Karier lebih cepat", "Jejaring profesional"],
    bg: "bg-amber-500",
  },
  {
    title: "Industri dan perusahaan",
    href: "/in-house-training",
    points: ["Recruit SDM kompeten", "Corporate training", "Pengembangan kompetensi tim", "Talent pool", "Employer branding"],
    bg: "bg-teal-700",
  },
];

/* ── Kontak ────────────────────────────────────────────────────── */
const contactPeople = [
  { name: "Rossi", phone: "+62 812-8656-3234" },
  { name: "Althaaf", phone: "+62 889-5213-007" },
  { name: "Endang", phone: "+62 821-7222-1567" },
  { name: "Berryl", phone: "+62 851-8500-0367" },
  { name: "Kintan", phone: "+62 811-399-523" },
];

function waHrefFromPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "").replace(/^0/, "62");
  return waLink("Halo, saya ingin bertanya tentang program mutululusan.id.").replace(site.whatsapp, digits);
}

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
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
                Bangun ekosistem kompetensi kampus Anda.{" "}
                <span className="text-orange-600">Bukan sekadar pelatihan individu.</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                mutululusan.id membantu perguruan tinggi mempersiapkan mahasiswa, dosen,
                dan tendik menuju karier profesional — selaras dengan capaian IKU,
                kebutuhan SKPI, dan target daya saing lulusan institusi Anda.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink("Halo admin, kami ingin menjadwalkan diskusi kemitraan dengan mutululusan.id.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Jadwalkan Diskusi Kemitraan
                </a>
                <Link href="/pelatihan" className="btn-outline">
                  Coba Program Gratis
                </Link>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <IconGlyph d={icon.book} className="shrink-0 text-sky-600" />
                  Materi disusun bersama praktisi industri
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <IconGlyph d={icon.target} className="shrink-0 text-sky-600" />
                  Selaras dengan kerangka IKU terbaru
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <IconGlyph d={icon.briefcase} className="shrink-0 text-sky-600" />
                  Persiapan karier menuju profesional
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-500">{paymentMicrocopy}</p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
              <h2 className="text-center text-xs font-bold uppercase tracking-wide text-orange-600">
                Mulai Perjalanan Kariermu Sekarang
              </h2>
              <div className="mt-5 flex items-start justify-between">
                {programFlow.slice(0, 4).map((step, i, arr) => (
                  <div key={step.label} className="flex items-start">
                    <div className="flex flex-1 flex-col items-center text-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-200 bg-sky-50">
                        <IconGlyph d={step.iconD} className="text-sky-700" />
                      </div>
                      <span className="mt-2 text-[11px] font-medium leading-tight text-slate-600">
                        {step.label}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="mt-3 px-0.5 text-orange-500" aria-hidden>
                        ›
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian dari ekosistem PT Padma Global Nusatama */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Bagian dari ekosistem kompetensi perguruan tinggi
            </h2>
            <p className="mt-2 text-slate-600">
              Satu ekosistem PT Padma Global Nusatama untuk membangun kualitas institusi,
              laboratorium, hingga lulusan siap kerja
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {ecosystemCards.map((c) => (
              <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.accent}`}>
                  <IconGlyph d={c.iconD} className="text-white" />
                </div>
                <h3 className="mt-4 font-bold text-slate-900">{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                <span className={`mt-3 inline-block rounded-md px-3 py-1 text-xs font-bold text-white ${c.accent}`}>
                  {c.tag}
                </span>
                {c.href && (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-sm font-semibold text-sky-700 hover:underline"
                  >
                    Lihat skema selengkapnya →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Untuk pimpinan perguruan tinggi */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
              Untuk pimpinan perguruan tinggi
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Mengapa ini strategis bagi institusi Anda
            </h2>
            <p className="mt-2 text-slate-600">
              Bukan sekadar pelatihan tambahan — program ini dirancang agar selaras dengan
              kerangka kebijakan dan kebutuhan administratif perguruan tinggi
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {demandCards.map((c) => (
              <div key={c.tag} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50">
                  <IconGlyph d={c.iconD} className="text-sky-700" />
                </div>
                <span className="mt-3 inline-block rounded-md bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-700">
                  {c.tag}
                </span>
                <h3 className="mt-2 font-bold leading-snug text-slate-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-6 max-w-3xl rounded-r-lg border-l-4 border-orange-400 bg-slate-50 px-5 py-4">
            <p className="text-xs leading-relaxed text-slate-600">
              Catatan: pengakuan satuan kredit semester (SKS), pemenuhan IKU, dan pencatatan
              dalam SKPI sepenuhnya merupakan kewenangan dan kebijakan masing-masing perguruan
              tinggi sesuai ketentuan internal yang berlaku. mutululusan.id menyediakan program
              dan dokumentasi pendukung yang dapat digunakan institusi dalam proses tersebut.
            </p>
          </div>
        </div>
      </section>

      {/* Tiga cara bekerja sama */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
              Pilihan skema layanan
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Tiga cara bekerja sama dengan kami
            </h2>
            <p className="mt-2 text-slate-600">
              Dari kebutuhan individu hingga kemitraan jangka panjang antar institusi
            </p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {tierCards.map((t) => (
              <div
                key={t.title}
                className={`relative flex flex-col rounded-2xl border bg-white p-6 ${
                  t.featured ? "border-2 border-orange-400" : "border-slate-200"
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-orange-500 px-3.5 py-1 text-[11px] font-bold text-white">
                    Direkomendasikan untuk institusi
                  </span>
                )}
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    t.featured ? "bg-orange-50" : "bg-sky-50"
                  }`}
                >
                  <IconGlyph d={t.iconD} className={t.featured ? "text-orange-600" : "text-sky-700"} />
                </div>
                <h3 className="mt-4 font-bold text-slate-900">{t.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{t.sub}</p>
                <ul className="mt-4 flex-1 space-y-1.5">
                  {t.points.map((p) => (
                    <li key={p} className="pl-4 text-sm text-slate-600 relative before:absolute before:left-0 before:font-bold before:text-orange-500 before:content-['›']">
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                  Cocok untuk: <strong className="text-slate-900">{t.for}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coba dulu, gratis */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
              Coba dulu, gratis
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Rasakan manfaatnya sebelum memutuskan kemitraan
            </h2>
            <p className="mt-2 text-slate-600">
              Kami percaya institusi yang sudah merasakan nilai nyata akan tahu sendiri
              langkah selanjutnya — beberapa hal berikut tersedia tanpa biaya
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {giveValueCards.map((g) => (
              <a
                key={g.title}
                href={g.href}
                target={g.href.startsWith("http") ? "_blank" : undefined}
                rel={g.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex flex-col rounded-xl border border-slate-200 bg-white transition hover:border-orange-300 hover:shadow-md"
              >
                <div className="relative border-b border-slate-100 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50">
                    <IconGlyph d={g.iconD} className="text-sky-700" />
                  </div>
                  <span className="absolute right-3 top-3 rounded bg-orange-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-orange-700">
                    {g.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h4 className="font-bold leading-snug text-slate-900">{g.title}</h4>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-600">{g.desc}</p>
                  <span className="mt-3 text-xs font-bold text-orange-600">{g.cta}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pilih bidang kariermu */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Pilih bidang kariermu
            </h2>
            <p className="mt-2 text-slate-600">
              Jalur kompetensi yang relevan dengan kebutuhan industri terkini, dikelompokkan
              dalam empat bidang utama
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {careerCategories.map((c) => (
              <span
                key={c.key}
                className={`rounded-lg border px-4 py-2 text-xs font-semibold ${categoryStyle[c.color].tabBorder}`}
              >
                {c.name}
              </span>
            ))}
          </div>

          <div className="mt-10 space-y-9">
            {careerCategories.map((cat) => (
              <div key={cat.key}>
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${categoryStyle[cat.color].iconBg}`}>
                    <IconGlyph d={cat.iconD} className={categoryStyle[cat.color].iconText} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{cat.name}</h3>
                    <p className="text-xs text-slate-500">{cat.desc}</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.schemes.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/pelatihan/${s.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-sky-300 hover:shadow-sm"
                    >
                      <div>
                        <h4 className="text-sm font-bold leading-snug text-slate-900">{s.title}</h4>
                        {"alias" in s && s.alias && (
                          <p className="mt-0.5 text-[11px] italic text-slate-400">{s.alias}</p>
                        )}
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-orange-600">Detail →</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 text-center">
            <Link href="/pelatihan" className="btn-outline">
              Lihat Semua Career Path
            </Link>
          </div>
        </div>
      </section>

      {/* Program unggulan — career accelerator */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Program unggulan — career accelerator
            </h2>
            <p className="mt-2 text-slate-600">
              Program komprehensif untuk mempercepat kompetensi dan persiapan karier menuju
              profesional
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-r-lg border-l-4 border-orange-400 bg-slate-50 px-5 py-4">
            <h5 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <IconGlyph d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="text-orange-500" />
              Informasi penting
            </h5>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Program pelatihan ini dapat digunakan sebagai salah satu bentuk pemenuhan
              persyaratan administrasi untuk mengikuti uji kompetensi pada skema terkait di
              mitra resmi kami, LSP Edukia, sesuai dengan persyaratan dan ketentuan yang
              berlaku. Keikutsertaan dalam pelatihan ini tidak menjamin kemudahan proses uji
              atau menjamin kelulusan sertifikasi kompetensi.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Pendaftaran uji kompetensi dilakukan secara mandiri oleh peserta langsung kepada
              LSP Edukia, dan jadwal resmi uji kompetensi dipublikasikan melalui media LSP
              Edukia secara terpisah. mutululusan.id dan LSP Edukia merupakan dua entitas yang
              independen dengan peran berbeda: mutululusan.id menyelenggarakan pelatihan untuk
              meningkatkan kompetensi peserta, sedangkan keputusan sertifikasi sepenuhnya
              menjadi kewenangan LSP Edukia berdasarkan hasil asesmen yang objektif dan
              independen.
            </p>
          </div>

          <div className="mt-8 flex items-stretch gap-0 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-6">
            {programFlow.map((step, i) => (
              <div key={step.label} className="flex items-stretch">
                <div className="min-w-[120px] flex-1 px-2.5 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-sky-200 bg-sky-50">
                    <IconGlyph d={step.iconD} className="text-sky-700" />
                  </div>
                  <h5 className="mt-2.5 text-sm font-bold text-slate-900">{step.label}</h5>
                  <p className="mt-1 text-xs leading-tight text-slate-500">{step.desc}</p>
                </div>
                <span className="flex items-center px-1 text-lg text-orange-500" aria-hidden>
                  ›
                </span>
              </div>
            ))}
            <div className="flex min-w-[130px] flex-col items-center justify-center rounded-xl border border-orange-200 bg-orange-50 p-3.5">
              <h5 className="text-sm font-bold text-slate-900">Job ready</h5>
              <p className="text-[11px] text-orange-700">Siap kerja dan berdaya saing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Untuk siapa platform ini */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Untuk siapa platform ini?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audienceCards.map((a) => (
              <div key={a.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-md">
                <div className="border-b border-slate-100 px-4 py-3.5">
                  <h5 className="font-bold text-slate-900">{a.title}</h5>
                </div>
                <div className="p-4">
                  <ul className="space-y-1">
                    {a.points.map((p) => (
                      <li key={p} className="pl-3 text-xs text-slate-600 relative before:absolute before:left-0 before:text-orange-500 before:content-['·']">
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link href={a.href} className="mt-3 inline-block text-xs font-semibold text-sky-700 hover:underline">
                    Pelajari lebih lanjut →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hubungi kami */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
              Hubungi kami
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Diskusikan kebutuhan institusi Anda
            </h2>
            <p className="mt-2 text-slate-600">
              Tim kami siap membantu menjadwalkan diskusi, asesmen kebutuhan, atau audiensi
              kemitraan
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {contactPeople.map((p) => (
              <a
                key={p.name}
                href={waHrefFromPhone(p.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 bg-white p-4 text-center transition hover:border-sky-300 hover:shadow-sm"
              >
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                  {p.name[0]}
                </span>
                <h6 className="mt-2 text-xs font-bold text-slate-900">{p.name}</h6>
                <span className="text-[11px] text-slate-500">{p.phone}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-slate-200 bg-white">
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
            {programs.length} program pelatihan kompetensi — dari sistem mutu
            dan laboratorium hingga rekayasa teknik industri.
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
                desc: "Bekal sertifikasi kompetensi bersama mitra resmi kami, LSP Edukia — karier naik kelas.",
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

      {/* Testimoni (tampil hanya bila ada data asli) */}
      <Testimonials items={getTestimonials()} />

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
              Lihat kalender lengkap {programs.length} program pelatihan 2026 dan amankan kursi
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

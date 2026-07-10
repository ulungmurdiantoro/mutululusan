import Link from "next/link";
import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { getAllPrograms } from "@/lib/programs";
import { paymentMicrocopy, site, waLink } from "@/lib/site";
import { Testimonials } from "@/components/testimonials";
import { getTestimonials } from "@/lib/testimonials";
import { TrustBar } from "@/components/trust-bar";
import { careerCategories, type CareerCategoryIcon } from "@/lib/career-categories";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { GradientMeshBackground } from "@/components/motion/GradientMeshBackground";
import { NetworkVisualization } from "@/components/motion/NetworkVisualization";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Pelatihan & Sertifikasi Kompetensi Laboratorium untuk Institusi | mutululusan.id",
  description:
    "Solusi pelatihan & sertifikasi kompetensi laboratorium untuk perguruan tinggi dan industri: dukung IKU 2/3/9, SKPI, dan kepatuhan ISO/IEC 17025. Ajukan penawaran kemitraan.",
  alternates: { canonical: "/" },
};

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
  chat: "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z",
};

function IconGlyph({ d, className = "text-sky-700" }: { d: string; className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

/** Ikon "Job ready" — persis mutululusan_website.html (rect tas + tali). */
function JobReadyIcon({ className = "text-sky-700" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

/* ── "Mulai Perjalanan Kariermu Sekarang" — persis mutululusan_website.html ── */
const heroJourney = [
  { label: "Belajar", iconD: icon.book },
  { label: "Workshop", iconD: icon.mentor },
  { label: "Project", iconD: icon.check },
  { label: "Mentoring", iconD: icon.chat },
  { label: "Job ready", jobReady: true },
] as const;

/* ── Trust bar (fakta terverifikasi, bukan logo/angka fiktif) ─────── */
const trustBadges = [
  { label: "PT Padma Global Nusatama", detail: "badan hukum resmi penyelenggara" },
  { label: "Mitra resmi LSP Edukia", detail: "jalur sertifikasi kompetensi" },
  { label: "21 Program Kompetensi", detail: "management, sustainability, lab, engineering" },
  { label: "Online & Offline", detail: "in-house training menyesuaikan kebutuhan institusi" },
];

/* ── Solusi berdasarkan kebutuhan (dua jalur) ──────────────────── */
const solutionPaths = [
  {
    title: "Untuk Perguruan Tinggi",
    desc: "Bangun kompetensi mahasiswa, dosen, dan tendik yang selaras dengan target institusi.",
    points: [
      "Pemenuhan IKU 2, IKU 3, dan IKU 9",
      "Bukti pendukung SKPI mahasiswa",
      "Sertifikasi kompetensi dosen & tendik",
      "Dukungan dokumentasi untuk akreditasi program studi",
    ],
    cta: "Lihat Program untuk Kampus",
    href: "/pelatihan",
    iconD: icon.book,
  },
  {
    title: "Untuk Industri & Laboratorium",
    desc: "Pastikan tim Anda kompeten dan laboratorium siap menghadapi audit eksternal.",
    points: [
      "Kepatuhan ISO/IEC 17025",
      "Sertifikasi personel laboratorium",
      "Kesiapan audit & asesmen eksternal",
      "Upskilling tim QA/QC secara terjadwal",
    ],
    cta: "Lihat Program untuk Perusahaan",
    href: "/in-house-training",
    iconD: icon.flask,
  },
];

/* ── Kenapa bermitra dengan kami (B2B) ─────────────────────────── */
const partnerReasons = [
  {
    title: "Mitra resmi LSP Edukia",
    desc: "Jalur uji & sertifikasi kompetensi diselenggarakan mitra resmi kami sesuai skema ISO/IEC 17024.",
  },
  {
    title: "Selaras dengan IKU & ISO 17025",
    desc: "Program dirancang mengacu pada indikator kinerja institusi dan standar mutu laboratorium.",
  },
  {
    title: "Fleksibel: online, offline, in-house",
    desc: "Jadwal dan mode pelatihan menyesuaikan kebutuhan institusi atau perusahaan Anda.",
  },
  {
    title: "Pendampingan end-to-end",
    desc: "Dari pengajuan kebutuhan, pelaksanaan, hingga penerbitan sertifikat — tim kami mendampingi.",
  },
];

/* ── FAQ untuk institusi (B2B) ─────────────────────────────────── */
const b2bFaqs = [
  {
    question: "Apakah bisa dibuatkan penawaran resmi/proposal untuk pengadaan?",
    answer:
      "Bisa. Isi form \"Ajukan Penawaran untuk Institusi\", sebutkan kebutuhan Anda, dan tim kami akan mengirimkan penawaran/proposal tertulis.",
  },
  {
    question: "Apakah tersedia skema harga rombongan/institusi?",
    answer:
      "Skema harga institusi disesuaikan dengan jumlah peserta dan kebutuhan spesifik — ajukan kebutuhan Anda lewat form \"Ajukan Penawaran\" dan tim kami akan memberikan penawaran yang sesuai.",
  },
  {
    question: "Apakah bisa kerja sama MOU/PKS jangka panjang?",
    answer:
      "Bisa, tersedia skema Kemitraan/Partnership dengan MOU/PKS untuk kerja sama tahunan — termasuk untuk instansi pemerintah dan kampus negeri yang memerlukan proses pengadaan formal.",
  },
  {
    question: "Bagaimana proses penagihan/invoice untuk instansi?",
    answer:
      "Kami menerbitkan invoice resmi dengan pembayaran transfer korporat. Anda bisa membuat proforma invoice sendiri di halaman Invoice Instansi, atau melalui tim kami setelah penawaran disepakati.",
  },
  {
    question: "Apakah sertifikat dan JP diakui untuk kebutuhan akreditasi/kum dosen?",
    answer:
      "e-Sertifikat 24 JP yang kami terbitkan adalah satuan jam pelatihan dari penyelenggara kami. Pengakuannya untuk kum dosen atau akreditasi prodi sepenuhnya bergantung pada kebijakan internal masing-masing institusi — kami menyediakan dokumentasi pendukung yang dapat digunakan dalam proses tersebut.",
  },
];

/* ── Ekosistem PT Padma Global Nusatama ────────────────────────── */
const ecosystemCards = [
  {
    tag: "mutuperguruantinggi.id",
    title: "Tata kelola perguruan tinggi",
    desc: "Penjaminan mutu, akreditasi, dan tata kelola institusi pendidikan tinggi.",
    href: "https://mutuperguruantinggi.id",
    external: true,
    logo: "/logo/ekosistem/LOGO-MUTU-PT-EDITED.png",
    accent: "bg-sky-700",
  },
  {
    tag: "labnesia.id",
    title: "Tata kelola laboratorium",
    desc: "Standardisasi dan kompetensi laboratorium berbasis ISO/IEC 17025.",
    href: "https://labnesia.id",
    external: true,
    logo: "/logo/ekosistem/LOGO-LABNESIA-005.gif",
    accent: "bg-emerald-700",
  },
  {
    tag: "mutululusan.id — Anda di sini",
    title: "Mahasiswa dan lulusan",
    desc: "Persiapan karier menuju profesional bagi mahasiswa, dosen, dan tendik.",
    href: null,
    external: false,
    logo: "/logo/ekosistem/MUTULULUSAN-LOGO-3.gif",
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
      "Kerja sama formal MOU/PKS — tersedia untuk instansi pemerintah & kampus negeri",
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
    cta: "Lihat jadwal",
    href: "/jadwal-pelatihan-2026",
    iconD: icon.file,
  },
  {
    title: "Asesmen kebutuhan kompetensi",
    desc: "Sesi pemetaan singkat untuk memahami kebutuhan kompetensi mahasiswa, dosen, atau tendik di institusi Anda — hasilnya berupa rekomendasi awal program yang relevan.",
    tag: "Gratis untuk institusi",
    cta: "Jadwalkan asesmen",
    href: waLink("Halo admin, kami ingin menjadwalkan asesmen kebutuhan kompetensi untuk institusi kami."),
    iconD: icon.check,
  },
  {
    title: "Kuliah praktisi",
    desc: "Kami hadir ke kampus Anda — sesi tatap muka untuk mahasiswa tingkat akhir dan fresh graduate tentang persiapan karier menuju profesional.",
    tag: "Gratis untuk kampus mitra",
    cta: "Undang ke kampus",
    href: waLink("Halo admin, kami ingin mengundang mutululusan.id untuk sesi kuliah praktisi di kampus kami."),
    iconD: icon.mic,
  },
  {
    title: "Silabus & panduan program",
    desc: "Unduh outline silabus lengkap, daftar skema kompetensi, dan panduan kemitraan tanpa perlu mendaftar terlebih dahulu.",
    tag: "Unduh gratis",
    cta: "Unduh silabus",
    href: waLink("Halo admin, mohon dikirimkan silabus & panduan program mutululusan.id."),
    iconD: icon.download,
  },
];

/* ── Pilih bidang kariermu ─────────────────────────────────────── */
const categoryIconD: Record<CareerCategoryIcon, string> = {
  check: icon.check,
  leaf: icon.leaf,
  flask: icon.flask,
  gear: icon.gear,
};

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

export default async function HomePage() {
  const programs = await getAllPrograms();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: b2bFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: site.url },
    ],
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-linear-to-br from-white via-sky-50 to-white">
        <GradientMeshBackground />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <NetworkVisualization />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <ScrollReveal>
              <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
                Solusi Pelatihan &amp; Sertifikasi Kompetensi Laboratorium{" "}
                <span className="text-orange-600">untuk Perguruan Tinggi dan Industri</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Membantu perguruan tinggi memenuhi capaian IKU 2/3/9, kebutuhan SKPI, dan
                akreditasi program studi — serta membantu industri &amp; laboratorium
                memenuhi kepatuhan ISO/IEC 17025 dan kesiapan audit, lewat program
                pelatihan &amp; jalur sertifikasi kompetensi yang terstruktur.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/ajukan-penawaran" className="btn-primary">
                  Ajukan Penawaran untuk Institusi
                </Link>
                <a
                  href={waLink("Halo admin, kami ingin menjadwalkan konsultasi dengan tim mutululusan.id.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Jadwalkan Konsultasi
                </a>
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
            </ScrollReveal>

            <ScrollReveal
              delay={0.15}
              className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm"
            >
              <h2 className="text-center text-xs font-bold uppercase tracking-wide text-orange-600">
                Mulai Perjalanan Kariermu Sekarang
              </h2>
              <div className="mt-5 flex items-start justify-between">
                {heroJourney.map((step, i, arr) => (
                  <div key={step.label} className="flex items-start">
                    <div className="flex flex-1 flex-col items-center text-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-200 bg-sky-50">
                        {"jobReady" in step ? (
                          <JobReadyIcon className="text-sky-700" />
                        ) : (
                          <IconGlyph d={step.iconD} className="text-sky-700" />
                        )}
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
            </ScrollReveal>
          </div>
        </div>
      </section>

      <TrustBar badges={trustBadges} />

      {/* Solusi berdasarkan kebutuhan Anda */}
      <section id="solusi-institusi" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
              Solusi berdasarkan kebutuhan Anda
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Dua jalur, satu mitra pengembangan kompetensi
            </h2>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {solutionPaths.map((s) => (
              <div key={s.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50">
                  <IconGlyph d={s.iconD} className="text-sky-700" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                <ul className="mt-4 flex-1 space-y-1.5">
                  {s.points.map((p) => (
                    <li key={p} className="pl-4 text-sm text-slate-600 relative before:absolute before:left-0 before:font-bold before:text-orange-500 before:content-['›']">
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={s.href} className="btn-outline mt-5">
                  {s.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kenapa bermitra dengan kami */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Kenapa Bermitra dengan Kami
          </h2>
          <StaggerGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerReasons.map((r) => (
              <StaggerItem key={r.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-bold text-slate-900">{r.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{r.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Bagian dari ekosistem PT Padma Global Nusatama */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <ScrollReveal>
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
                  <div className="flex h-12 items-center rounded-xl bg-slate-50 px-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.logo} alt={c.tag} className="h-9 w-auto object-contain" />
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
                      Lihat skema selengkapnya <span aria-hidden>→</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Untuk pimpinan perguruan tinggi */}
      <section className="bg-slate-50">
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
          <StaggerGroup className="mt-8 grid gap-5 sm:grid-cols-3">
            {demandCards.map((c) => (
              <StaggerItem key={c.tag} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50">
                  <IconGlyph d={c.iconD} className="text-sky-700" />
                </div>
                <span className="mt-3 inline-block rounded-md bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-700">
                  {c.tag}
                </span>
                <h3 className="mt-2 font-bold leading-snug text-slate-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
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
      <section className="bg-white">
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
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-slate-500">
            Untuk keperluan pengadaan/procurement, dokumen legalitas penyedia (nama badan
            hukum <strong className="text-slate-700">PT Padma Global Nusatama</strong>, kontak
            resmi) dapat kami lampirkan bersama penawaran — ajukan lewat{" "}
            <Link href="/ajukan-penawaran" className="font-semibold text-sky-700 hover:underline">
              form Ajukan Penawaran
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Coba dulu, gratis */}
      <section className="bg-slate-50">
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
                  <span className="mt-3 text-xs font-bold text-orange-600">
                    {g.cta} <span aria-hidden>→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pilih bidang kariermu */}
      <section className="bg-white">
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
            {careerCategories.map((cat) => {
              const preview = cat.schemes.slice(0, 2);
              const remaining = cat.schemes.length - preview.length;
              return (
                <div key={cat.key}>
                  <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${categoryStyle[cat.color].iconBg}`}>
                      <IconGlyph d={categoryIconD[cat.iconKey]} className={categoryStyle[cat.color].iconText} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{cat.name}</h3>
                      <p className="text-xs text-slate-500">{cat.desc}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {preview.map((s) => (
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
                        <span className="shrink-0 text-xs font-semibold text-orange-600">
                          Detail <span aria-hidden>→</span>
                        </span>
                      </Link>
                    ))}
                    {remaining > 0 && (
                      <Link
                        href={`/pelatihan?kategori=${cat.key}`}
                        className={`flex items-center justify-center rounded-xl border border-dashed p-4 text-center text-sm font-semibold transition hover:opacity-80 ${categoryStyle[cat.color].iconText} border-slate-300`}
                      >
                        +{remaining} program lainnya <span aria-hidden className="ml-1">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-9 text-center">
            <Link href="/pelatihan" className="btn-outline">
              Lihat Semua Career Path
            </Link>
          </div>
        </div>
      </section>

      {/* Program unggulan — career accelerator */}
      <section className="bg-slate-50">
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
      <section className="bg-white">
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
                    Pelajari lebih lanjut <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
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

      {/* Testimoni (tampil hanya bila ada data asli) */}
      <Testimonials items={getTestimonials()} />

      {/* FAQ untuk institusi */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <ScrollReveal>
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            FAQ untuk Institusi
          </h2>
          <div className="mt-8">
            <FaqList faqs={b2bFaqs} />
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
          </ScrollReveal>
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

            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
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
            <p className="mt-4 text-sm text-slate-500">{paymentMicrocopy}</p>
          </div>
        </div>
      </section>
    </>
  );
}

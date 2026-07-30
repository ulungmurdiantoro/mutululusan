import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { GradientMeshBackground } from "@/components/motion/GradientMeshBackground";

export const metadata: Metadata = {
  title: "Online On-the-Job Training — Siap Kerja, Sebelum Bekerja | mutululusan.id",
  description:
    "Career Development Platform berbasis Online On-the-Job Training untuk mengembangkan kompetensi pada berbagai peran di bidang mutu, kepatuhan, laboratorium, dan keberlanjutan.",
  alternates: { canonical: "/" },
};

/* ── Problems: mengapa lulusan tetap sulit dapat kerja ─────────────── */
const problems = [
  {
    title: "Belum pernah mengerjakan pekerjaannya",
    desc: "Lulusan ditolak bukan karena nilai kurang baik — tapi karena belum pernah benar-benar mengerjakan tugas dari peran yang mereka lamar. Pengetahuan ada. Pengalaman kerja belum.",
    icon: (
      <path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    ),
  },
  {
    title: "Sertifikat membuktikan hadir, bukan bisa bekerja",
    desc: "Sertifikat pelatihan bisa didapat hanya dengan menonton video. Tidak ada tugas nyata, tidak ada mentor yang menilai hasil kerja Anda — padahal itu yang dicari perusahaan.",
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </>
    ),
  },
  {
    title: "Training biasa berhenti di teori",
    desc: "Tonton materi → kuis → sertifikat → selesai. Tidak ada yang meniru kondisi kerja sungguhan, sehingga peserta tetap tidak siap saat masuk dunia kerja sebenarnya.",
    icon: <polygon points="6,4 20,12 6,20" />,
  },
];

/* ── Alur metode Online OJT ─────────────────────────────────────────── */
const ojtFlow = [
  {
    label: "Studi Kasus",
    desc: "Dari kondisi kerja nyata di industri",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </>
    ),
  },
  {
    label: "Applied Project",
    desc: "Mengerjakan dokumen kerja sungguhan",
    icon: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />,
  },
  {
    label: "Mentoring",
    desc: "Dibimbing seperti oleh senior di kantor",
    icon: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87" />,
  },
  {
    label: "Review",
    desc: "Hasil kerja dinilai, bukan kehadiran",
    icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />,
  },
  {
    label: "Portfolio & Assessment",
    desc: "Bukti akhir kompetensi Anda",
    icon: <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6" />,
  },
];

/* ── Cara kerja metode (method rows) ───────────────────────────────── */
const methodRows = [
  {
    title: "Minggu pertama = hari pertama kerja",
    desc: "Onboarding ke peran, bukan “modul 1”. Anda langsung memegang konteks pekerjaan nyata.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
  },
  {
    title: "Mentor berperan sebagai supervisor",
    desc: "Memberi tugas, mengawasi, dan me-review hasil kerja Anda — seperti senior di kantor.",
    icon: <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />,
  },
  {
    title: "Tugas mingguan = dokumen kerja sungguhan",
    desc: "SOP, checklist, laporan — bukan kuis pilihan ganda.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
        <path d="M9 13h6M9 17h6" />
      </>
    ),
  },
  {
    title: "Simulasi satu hari kerja penuh",
    desc: "Merasakan pekerjaan aktual dari peran yang Anda tuju — dari pagi sampai tutup hari.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
  },
];

/* ── Career tracks per klaster ──────────────────────────────────────── */
const trackClusters = [
  {
    label: "Management & Governance",
    tracks: [
      { title: "Program QA Officer", desc: "Menjaga sistem mutu berjalan sesuai standar" },
      { title: "Program QMS (ISO 9001) Officer", desc: "Membangun & mengelola sistem ISO 9001" },
      { title: "Program Regulatory Affairs Officer", desc: "Mengurus izin & kepatuhan regulasi produk" },
      { title: "Program Food Safety Management Officer", desc: "Mengelola sistem keamanan pangan" },
      { title: "Program Corporate Legal Officer", desc: "Mengelola aspek legal & kepatuhan perusahaan" },
    ],
  },
  {
    label: "Sustainability & ESG",
    tracks: [
      { title: "Program ESG Officer", desc: "Mengelola pelaporan & kinerja ESG" },
      { title: "Program Sustainability Officer", desc: "Menjalankan agenda keberlanjutan organisasi" },
      { title: "Program EMS (ISO 14001) Officer", desc: "Mengelola sistem manajemen lingkungan" },
    ],
  },
  {
    label: "Laboratory & Testing",
    tracks: [
      { title: "Program QC Laboratory Analyst", desc: "Melakukan analisis mutu di laboratorium" },
      { title: "Program Laboratory Quality System Officer", desc: "Mengelola sistem mutu laboratorium" },
      { title: "Program GLP Laboratory Technician", desc: "Bekerja sesuai Good Laboratory Practice" },
      { title: "Program Laboratory HSE Officer", desc: "Mengelola K3 & keselamatan laboratorium" },
      { title: "Program Laboratory Operations Officer", desc: "Mengelola operasional harian laboratorium" },
      { title: "Program R&D Officer", desc: "Mengembangkan produk & metode baru" },
      { title: "Program Panelis Sensori Pangan", desc: "Menjadi panelis uji sensori terstandar" },
    ],
  },
];

/* ── Perjalanan peserta ─────────────────────────────────────────────── */
const journeySteps = [
  {
    n: "1",
    title: "Kenali Online OJT",
    desc: "Pahami mengapa belajar dengan mengerjakan pekerjaan nyata berbeda dari semua training yang pernah Anda ikuti.",
  },
  {
    n: "2",
    title: "Pilih Career Track",
    desc: "Tentukan peran yang ingin Anda jalankan — QA Officer, ESG Officer, QC Laboratory Analyst, atau peran lain di dunia mutu, kepatuhan & keberlanjutan.",
  },
  {
    n: "3",
    title: "Mulai: Applied Mini Project",
    desc: "7 hari pertama Anda merasakan bekerja seperti profesional — dan pulang membawa satu dokumen kerja pertama yang direview mentor.",
    chips: ["7 hari", "Rp175.000"],
  },
  {
    n: "4",
    title: "Jalani: Program Online OJT",
    desc: "30 hari pengalaman kerja nyata — studi kasus, applied project, mentoring, dan review — sampai Anda benar-benar bisa mengerjakan pekerjaan dari peran yang Anda tuju.",
    chips: ["30 hari", "Rp1.750.000", "Beasiswa via seleksi tersedia"],
    byline: "Professional Development Program · diselenggarakan oleh PT Padma Nusa Akademi",
    core: true,
  },
  {
    n: "5",
    title: "Portfolio & Recommendation",
    desc: "Portfolio dokumen kerja dan surat rekomendasi mentor — yang Anda bawa ke wawancara kerja.",
  },
  {
    n: "6",
    title: "Sertifikasi Kompetensi (Opsional)",
    desc: "Uji kompetensi resmi melalui LSP (Lembaga Sertifikasi Person) yang independen.",
    quote: "Kami tidak menilai peserta kami sendiri. Itulah mengapa hasilnya dipercaya.",
  },
  {
    n: "✓",
    title: "Career Ready",
    desc: "Melamar dengan bukti, bukan sekadar ijazah.",
  },
];

/* ── Testimoni contoh (statis, sesuai draf desain) ──────────────────── */
const testimonials = [
  {
    quote:
      "Saya masuk tanpa tahu apa itu ISO 9001. Saya keluar dengan SOP yang benar-benar saya buat sendiri — dan itu yang saya tunjukkan saat interview.",
    name: "Peserta Program QA Officer",
    role: "Fresh Graduate",
    initial: "A",
  },
  {
    quote:
      "Rasanya seperti sudah bekerja. Ada tugas, ada deadline, ada mentor yang me-review. Saat wawancara, saya bercerita tentang pekerjaan — bukan tentang mata kuliah.",
    name: "Peserta Program QC Lab Analyst",
    role: "Career Switcher",
    initial: "R",
  },
  {
    quote:
      "Surat rekomendasi dari mentor jadi pembeda di lamaran saya. HR langsung bertanya tentang project yang saya kerjakan.",
    name: "Peserta Program Regulatory Affairs",
    role: "Mahasiswa Tingkat Akhir",
    initial: "D",
  },
];

const faqs = [
  {
    question: "Apa itu Online OJT di Mutululusan?",
    answer:
      "Metode belajar yang meniru pengalaman kerja nyata — studi kasus, applied project, mentoring, dan review — secara online, sebelum Anda diterima kerja. Anda diperlakukan seperti staf baru yang sedang onboarding, bukan seperti mahasiswa yang menonton video.",
  },
  {
    question: "Apa bedanya dengan bootcamp atau webinar biasa?",
    answer:
      "Bootcamp dan webinar menjual materi dan durasi. Mutululusan memberi Anda pengalaman kerja nyata yang menghasilkan bukti kompetensi: dokumen kerja, portfolio, dan penilaian mentor yang bisa dibawa ke dunia kerja.",
  },
  {
    question: "Apa itu Program Online OJT (misalnya Program QA Officer)?",
    answer:
      "Program inti Mutululusan selama 30 hari — pengalaman kerja nyata berbasis Online OJT untuk satu peran kerja, yang menghasilkan portfolio, penilaian mentor, dan surat rekomendasi. Secara formal tercatat sebagai Professional Development Program, diselenggarakan oleh PT Padma Nusa Akademi.",
  },
  {
    question: "Saya belum punya pengalaman kerja sama sekali. Cocok?",
    answer:
      "Justru untuk itu Online OJT dirancang — mengganti pengalaman kerja yang belum Anda miliki dengan bukti kerja nyata yang bisa Anda tunjukkan ke perusahaan.",
  },
  {
    question: "Mulai dari mana?",
    answer:
      "Applied Mini Project — 7 hari pertama Anda merasakan metode Online OJT dan pulang membawa satu dokumen profesional. Setelah itu, lanjutkan ke Program Online OJT pilihan Anda.",
  },
  {
    question: "Apakah sertifikasinya resmi?",
    answer:
      "Sertifikasi kompetensi dilakukan oleh LSP (Lembaga Sertifikasi Person) yang independen. Kami tidak menilai peserta kami sendiri sehingga proses sertifikasi dilakukan secara objektif dan dapat dipercaya. Sertifikasi bersifat opsional setelah program selesai.",
  },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-0.5 shrink-0 text-sky-600" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Beranda", item: site.url }],
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-linear-to-br from-white via-sky-50 to-white">
        <GradientMeshBackground />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
            <ScrollReveal>
              <span className="text-xs font-bold uppercase tracking-wide text-orange-600">
                Karier di Dunia Mutu, ESG &amp; Laboratorium
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
                Online On-the-Job Training.{" "}
                <mark className="rounded bg-orange-200 px-1 text-slate-900">Siap kerja</mark>, sebelum bekerja.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
                Kampus mengajarkan teori. Perusahaan butuh orang yang sudah pernah mengerjakan
                pekerjaan sungguhan. Mutululusan menghadirkan pengalaman itu — perjalanan
                pengembangan karier yang menghasilkan bukti nyata.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#tracks" className="btn-primary">
                  Explore Career Tracks
                </a>
                <a href="#ojt" className="btn-outline">
                  Pelajari Online OJT
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Mulai dari 7 hari · Dibimbing mentor praktisi industri
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="relative min-h-[380px] sm:min-h-[440px]">
                <div className="absolute left-[110px] top-[60px] w-[260px] rotate-[6deg] rounded-xl border border-slate-200 bg-white p-6 opacity-55 shadow-xl sm:w-[300px]">
                  <div className="mb-2 h-2 w-4/5 rounded bg-slate-100" />
                  <div className="mb-2 h-2 w-3/5 rounded bg-slate-100" />
                  <div className="mb-2 h-2 w-11/12 rounded bg-slate-100" />
                  <div className="mb-2 h-2 w-[70%] rounded bg-slate-100" />
                  <div className="h-2 w-4/5 rounded bg-slate-100" />
                </div>
                <div className="absolute left-[36px] top-[34px] w-[260px] -rotate-[4deg] rounded-xl border border-slate-200 bg-white p-6 opacity-80 shadow-xl sm:w-[300px]">
                  <div className="mb-2 h-2 w-[70%] rounded bg-slate-100" />
                  <div className="mb-2 h-2 w-11/12 rounded bg-slate-100" />
                  <div className="mb-2 h-2 w-3/5 rounded bg-slate-100" />
                  <div className="mb-2 h-2 w-4/5 rounded bg-slate-100" />
                  <div className="h-2 w-[70%] rounded bg-slate-100" />
                </div>
                <div className="absolute left-[16px] top-0 w-[260px] rotate-[1.5deg] rounded-xl border border-slate-200 bg-white p-6 shadow-2xl sm:left-[70px] sm:w-[300px]">
                  <span className="mb-3 inline-block rounded border border-sky-600 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-sky-700">
                    Dokumen Kerja
                  </span>
                  <div className="mb-3 text-sm font-bold text-slate-900">SOP Pengendalian Mutu — QA Officer</div>
                  <div className="mb-2 h-2 w-11/12 rounded bg-slate-100" />
                  <div className="mb-2 h-2 w-4/5 rounded bg-slate-100" />
                  <div className="mb-2 h-2 w-3/5 rounded bg-slate-100" />
                  <div className="mb-2 h-2 w-11/12 rounded bg-slate-100" />
                  <div className="mb-2 h-2 w-[70%] rounded bg-slate-100" />
                  <div className="mb-2 h-2 w-4/5 rounded bg-slate-100" />
                  <div className="mb-2 h-2 w-3/5 rounded bg-slate-100" />
                  <div className="h-2 w-11/12 rounded bg-slate-100" />
                  <span className="absolute bottom-5 right-4 -rotate-[9deg] rounded-lg border-2 border-sky-600 bg-sky-50/80 px-3 py-1 text-[11px] font-extrabold tracking-wide text-sky-700">
                    DIREVIEW MENTOR ✓
                  </span>
                </div>
                <div className="absolute -left-3 bottom-16 hidden max-w-[210px] -rotate-2 rounded-lg bg-orange-200 px-3 py-2 text-xs font-semibold text-slate-900 shadow-lg sm:block">
                  ✍️ “Struktur sudah sesuai standar industri — siap masuk portfolio.”
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Authority chain */}
      <section className="border-b border-slate-200 bg-white">
        <ScrollReveal>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-4 py-6 text-center text-sm text-slate-600">
            <span>
              Belajar di <b className="font-semibold text-slate-900">Mutululusan</b>
            </span>
            <span className="text-orange-500">→</span>
            <span>
              Dibimbing <b className="font-semibold text-slate-900">praktisi industri</b>
            </span>
            <span className="text-orange-500">→</span>
            <span>
              Diselenggarakan <b className="font-semibold text-slate-900">PT Padma Nusa Akademi</b>
            </span>
            <span className="text-orange-500">→</span>
            <span className="flex flex-wrap items-center justify-center gap-2">
              Divalidasi <b className="font-semibold text-slate-900">sertifikasi LSP independen</b>
              <span className="inline-flex items-center gap-1 rounded-full border border-sky-600 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
                ✓ Uji kompetensi terpisah
              </span>
            </span>
          </div>
        </ScrollReveal>
      </section>

      {/* Problems */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-orange-600">Masalahnya Bukan Kecerdasan</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                Mengapa banyak lulusan tetap sulit mendapat pekerjaan?
              </h2>
            </div>
          </ScrollReveal>
          <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-3">
            {problems.map((p) => (
              <StaggerItem key={p.title} className="rounded-2xl border border-slate-200 bg-white p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-sky-700" aria-hidden>
                    {p.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Manifesto */}
      <section className="bg-sky-900">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-wide text-orange-300">Keyakinan Kami</span>
            <div className="mx-auto mt-7 grid max-w-2xl gap-7">
              <p className="text-lg font-semibold leading-relaxed text-sky-100 sm:text-xl">
                Tidak ada orang yang menjadi siap kerja karena menonton video.
                <br />
                Tidak ada perusahaan yang mempekerjakan selembar sertifikat.
              </p>
              <p className="text-lg font-semibold leading-relaxed text-sky-100 sm:text-xl">
                Kompetensi lahir dari <b className="font-extrabold text-white">mengerjakan</b>.
                <br />
                Kepercayaan lahir dari <b className="font-extrabold text-white">bukti</b>.
              </p>
              <p className="text-lg font-semibold leading-relaxed text-sky-100 sm:text-xl">
                Kami percaya setiap orang berhak atas satu hal yang selama ini hanya dimiliki mereka
                yang sudah bekerja:
                <br />
                <b className="font-extrabold text-white">kesempatan untuk membuktikan dirinya.</b>
              </p>
              <p className="text-xl font-extrabold leading-relaxed text-white sm:text-2xl">
                Karena itu kami tidak menjual materi.
                <br />
                Kami memberi Anda{" "}
                <mark className="rounded bg-orange-300 px-1 text-slate-900">pengalaman kerja pertama</mark> Anda —
                <br />
                sebelum Anda diterima kerja.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* OJT big reveal */}
      <section className="bg-slate-900" id="ojt">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-wide text-orange-300">Metode Kami</span>
            <h2 className="mt-2 max-w-[22ch] text-2xl font-bold text-white sm:text-3xl">
              Online On-the-Job Training (OJT) — metode belajar terbaik untuk menjadi siap kerja.
            </h2>
            <div className="mt-7 grid max-w-3xl gap-4 text-base text-slate-300">
              <p>
                Di dunia kerja, cara tercepat untuk benar-benar kompeten adalah{" "}
                <strong className="text-white">On-the-Job Training</strong> — belajar langsung
                mengerjakan pekerjaan nyata dengan bimbingan senior.
              </p>
              <p>
                Masalahnya: pengalaman ini biasanya baru didapat <strong className="text-white">setelah</strong>{" "}
                seseorang diterima bekerja.
              </p>
              <p>
                Karena itu Mutululusan.id menghadirkan program berbasis{" "}
                <mark className="rounded bg-orange-300 px-1 text-slate-900">
                  <strong>Online OJT</strong>
                </mark>{" "}
                — sehingga mahasiswa, fresh graduate, dan career switcher bisa merasakan pengalaman
                kerja nyata <strong className="text-white">sebelum</strong> melamar kerja, dan
                membangun bukti kompetensi yang bisa ditunjukkan ke dunia kerja.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative mt-16 grid gap-8 sm:grid-cols-5 sm:gap-2">
            <div
              className="pointer-events-none absolute left-[10%] right-[10%] top-[27px] hidden h-px bg-linear-to-r from-transparent via-orange-400/50 to-transparent sm:block"
              aria-hidden
            />
            {ojtFlow.map((step) => (
              <div key={step.label} className="relative grid grid-cols-[54px_1fr] items-center gap-4 text-left sm:flex sm:flex-col sm:items-center sm:gap-0 sm:text-center sm:px-2">
                <div className="relative z-10 flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border border-orange-300/40 bg-slate-800 text-orange-300 sm:mb-3.5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    {step.icon}
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{step.label}</h4>
                  <p className="mt-1 text-xs text-slate-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method rows */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-wide text-orange-600">Cara Kerjanya</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Belajar seperti bekerja. Bukan sekadar mengikuti kelas.
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Peserta tidak “mengikuti kelas”. Peserta onboarding ke sebuah peran kerja — lengkap
              dengan tugas, supervisor, dan pekerjaan nyata yang harus diselesaikan.
            </p>
          </ScrollReveal>
          <div className="mt-9 border-t border-slate-200">
            {methodRows.map((row) => (
              <div key={row.title} className="flex flex-col gap-4 border-b border-slate-200 py-6 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-sky-700" aria-hidden>
                    {row.icon}
                  </svg>
                </div>
                <h4 className="font-bold text-slate-900 sm:w-56 sm:shrink-0">{row.title}</h4>
                <p className="text-sm text-slate-600 sm:flex-1">{row.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career tracks */}
      <section className="border-y border-slate-200 bg-slate-50" id="tracks">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-wide text-orange-600">Career Tracks</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Pilih peran yang ingin Anda kuasai.</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Anda tidak sedang memilih “kursus ISO” atau “kursus QA”. Anda sedang memilih{" "}
              <b className="text-slate-900">peran yang ingin Anda jalankan</b> — setiap Career
              Track memiliki satu Program Online OJT yang dirancang secara utuh.
            </p>
          </ScrollReveal>

          <div className="mt-10 space-y-9">
            {trackClusters.map((cluster) => (
              <div key={cluster.label}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{cluster.label}</span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cluster.tracks.map((t) => (
                    <StaggerItem key={t.title}>
                      <a
                        href="#journey"
                        className="group flex h-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                      >
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900">{t.title}</h4>
                          <p className="mt-1 text-xs text-slate-500">{t.desc}</p>
                        </div>
                        <span className="shrink-0 text-sky-600 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
                          →
                        </span>
                      </a>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof sections */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid items-center gap-10 py-8 md:grid-cols-2">
            <ScrollReveal>
              <span className="text-xs font-bold uppercase tracking-wide text-orange-600">Pekerjaan Nyata</span>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">Pekerjaan sungguhan, Bukan Penugasan Biasa.</h3>
              <p className="mt-3 max-w-md text-slate-600">
                Setiap program berpuncak pada dokumen kerja nyata yang benar-benar dipakai di
                industri — menyusun SOP yang benar-benar bisa diterapkan, laporan audit yang
                benar-benar bisa dipresentasikan.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="flex min-h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="w-full max-w-[320px] rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
                <span className="mb-3 inline-block rounded border border-sky-600 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-sky-700">
                  Applied Project
                </span>
                <div className="mb-3 text-sm font-bold text-slate-900">Audit Checklist — Internal Audit ISO 9001</div>
                <div className="mb-2 h-2 w-11/12 rounded bg-slate-100" />
                <div className="mb-2 h-2 w-[70%] rounded bg-slate-100" />
                <div className="mb-2 h-2 w-4/5 rounded bg-slate-100" />
                <div className="h-2 w-3/5 rounded bg-slate-100" />
              </div>
            </ScrollReveal>
          </div>

          <div className="grid items-center gap-10 border-t border-slate-200 py-8 md:grid-cols-2">
            <ScrollReveal className="order-2 flex min-h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8 md:order-1">
              <div className="w-full max-w-[320px] rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
                <span className="mb-3 inline-block rounded border border-sky-600 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-sky-700">
                  Portfolio
                </span>
                <div className="mb-3 text-sm font-bold text-slate-900">Kumpulan Bukti Kerja Anda</div>
                <ul className="grid gap-2.5">
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckIcon /> SOP &amp; Manual
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckIcon /> Risk Register
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckIcon /> ESG Matrix / Validation Report
                  </li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="order-1 md:order-2">
              <span className="text-xs font-bold uppercase tracking-wide text-orange-600">Portfolio</span>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">Bukan daftar sertifikat. Bukti kerja nyata.</h3>
              <p className="mt-3 max-w-md text-slate-600">
                Dokumen yang bisa langsung Anda tunjukkan saat wawancara: bukan lagi “saya pernah
                belajar”, tapi <b className="text-slate-900">“ini yang sudah saya kerjakan.”</b>
              </p>
            </ScrollReveal>
          </div>

          <div className="grid items-center gap-10 border-t border-slate-200 py-8 md:grid-cols-2">
            <ScrollReveal>
              <span className="text-xs font-bold uppercase tracking-wide text-orange-600">Surat Rekomendasi</span>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">Dinilai. Direkomendasikan.</h3>
              <p className="mt-3 max-w-md text-slate-600">
                Mentor yang mengawasi pekerjaan Anda memberi penilaian nyata dalam bentuk surat
                rekomendasi yang bisa dilampirkan saat melamar kerja. Bukan template otomatis —
                penilaian dari orang yang benar-benar melihat cara Anda bekerja.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="flex min-h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="w-full max-w-[320px] rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
                <span className="mb-3 inline-block rounded border border-sky-600 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-sky-700">
                  Recommendation
                </span>
                <div className="mb-3 text-sm font-bold text-slate-900">Surat Rekomendasi Mentor</div>
                <div className="mb-2 h-2 w-11/12 rounded bg-slate-100" />
                <div className="mb-2 h-2 w-4/5 rounded bg-slate-100" />
                <div className="mb-2 h-2 w-3/5 rounded bg-slate-100" />
                <div className="mb-3 h-2 w-[70%] rounded bg-slate-100" />
                <span className="inline-block rotate-[-9deg] rounded-lg border-2 border-sky-600 bg-sky-50/80 px-3 py-1 text-[11px] font-extrabold tracking-wide text-sky-700">
                  DIREKOMENDASIKAN
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-slate-200 bg-slate-50" id="journey">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-wide text-orange-600">Perjalanan Anda</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Satu perjalanan menuju siap kerja.</h2>
            <p className="mt-3 text-slate-600">
              Anda tidak sedang membeli pelatihan. Anda sedang memasuki perjalanan pengembangan
              karier — dari mencoba metode Online OJT selama 7 hari, sampai memegang bukti
              kompetensi yang diakui dunia kerja.
            </p>
          </ScrollReveal>

          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="absolute bottom-4 left-6 top-4 w-px bg-slate-200" aria-hidden />
            {journeySteps.map((step) => (
              <ScrollReveal key={step.n} className="relative flex gap-5 py-5">
                <div
                  className={`z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-bold ${
                    step.core
                      ? "border-sky-600 bg-sky-600 text-white"
                      : "border-slate-200 bg-white text-sky-700"
                  }`}
                >
                  {step.n}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{step.title}</h4>
                  <p className="mt-1 max-w-lg text-sm text-slate-600">{step.desc}</p>
                  {step.chips && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {step.chips.map((c) => (
                        <span
                          key={c}
                          className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
                            c.startsWith("Rp")
                              ? "border-sky-600 bg-sky-50 text-sky-800"
                              : "border-slate-200 bg-white text-slate-700"
                          }`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                  {step.byline && <p className="mt-2 text-xs text-slate-500">{step.byline}</p>}
                  {step.quote && (
                    <p className="mt-3 border-l-2 border-sky-300 pl-4 text-sm italic text-slate-600">{step.quote}</p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="#faq" className="btn-primary">
              Mulai Perjalanan Anda
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-wide text-orange-600">Cerita Peserta</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Dari “belum tahu mulai dari mana” jadi siap ditawarkan pekerjaan.
            </h2>
          </ScrollReveal>
          <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-sm text-slate-700">“{t.quote}”</p>
                <div className="mt-auto flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 font-bold text-sky-700">
                    {t.initial}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-slate-50" id="faq">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <ScrollReveal>
            <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
              Pertanyaan yang sering diajukan
            </h2>
            <div className="mt-8">
              <FaqList faqs={faqs} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <ScrollReveal>
            <div className="rounded-2xl bg-sky-600 px-6 py-16 text-center text-white sm:px-10">
              <h2 className="mx-auto max-w-[24ch] text-2xl font-bold sm:text-3xl">
                Pengalaman kerja pertama Anda dimulai di sini.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sky-50">
                Perjalanan menuju siap kerja dimulai dari satu langkah kecil — 7 hari pertama Anda
                bekerja seperti profesional.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#journey"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-sky-700 shadow-sm transition hover:bg-orange-100"
                >
                  Mulai Perjalanan Karier
                </a>
                <a
                  href="#tracks"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/60 px-6 py-3 font-semibold text-white transition hover:border-white"
                >
                  Lihat Career Tracks
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

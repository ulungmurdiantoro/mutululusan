import type { Faq, Program } from "./programs";

const ONLINE_BENEFITS = [
  "e-Sertifikat pelatihan 24 JP",
  "Soft copy materi pelatihan lengkap",
  "Rekaman pelatihan — bisa diputar ulang kapan saja",
  "Pelaksanaan via Zoom, pukul 09.00–16.00 WIB",
  "Sertifikat pelatihan menjadi syarat lanjut ke Sertifikasi Kompetensi",
];

const OFFLINE_BENEFITS = [
  "Sertifikat pelatihan + bonus sertifikasi kompetensi",
  "Training kit & souvenir",
  "Coffee break & makan siang",
  "Praktik langsung dengan sampel nyata",
  "Konsultasi pasca pelatihan",
];

function standardFaqs(name: string, priceText: string): Faq[] {
  return [
    {
      question: `Kapan dan bagaimana pelatihan ${name} dilaksanakan?`,
      answer:
        "Pelatihan dilaksanakan secara online via Zoom selama 2 hari, pukul 09.00–16.00 WIB. Link Zoom dan grup peserta dikirimkan setelah pembayaran terkonfirmasi.",
    },
    {
      question: "Bagaimana jika saya berhalangan hadir di salah satu sesi?",
      answer:
        "Seluruh sesi direkam. Peserta yang berhalangan tetap mendapatkan rekaman lengkap, soft copy materi, dan e-sertifikat selama terdaftar sebagai peserta.",
    },
    {
      question: "Berapa biaya pelatihan dan bagaimana cara membayarnya?",
      answer: `Biaya pelatihan ${priceText} per peserta. Pembayaran dapat dilakukan langsung di website via QRIS, virtual account semua bank, e-wallet (GoPay/OVO/DANA), kartu kredit, atau transfer manual dengan konfirmasi admin.`,
    },
    {
      question: "Apakah saya mendapatkan sertifikat?",
      answer:
        "Ya. Peserta mendapatkan e-sertifikat pelatihan 24 JP (jam pelajaran) yang dikirim setelah pelatihan selesai. Sertifikat ini juga menjadi syarat untuk melanjutkan ke jalur sertifikasi kompetensi.",
    },
  ];
}

export const programs: Program[] = [
  {
    slug: "iso-17025-quality-system-officer",
    title: "Laboratory Quality System Officer ISO/IEC 17025",
    subtitle: "Petugas Sistem Mutu Laboratorium",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: 1_750_000,
    priority: true,
    excerpt:
      "Kuasai persyaratan ISO/IEC 17025:2017 dan praktik penerapan sistem manajemen mutu laboratorium dari dokumentasi hingga kesiapan akreditasi.",
    description: [
      "ISO/IEC 17025 adalah standar internasional yang menjadi acuan kompetensi laboratorium pengujian dan kalibrasi di seluruh dunia. Laboratorium yang ingin diakui kompetensinya — baik oleh regulator, pelanggan, maupun badan akreditasi — wajib memahami dan menerapkan persyaratan standar ini secara konsisten.",
      "Pelatihan Laboratory Quality System Officer ISO/IEC 17025 membekali Anda dengan pemahaman menyeluruh atas klausul-klausul ISO/IEC 17025:2017: persyaratan umum, persyaratan struktural, sumber daya, proses, hingga sistem manajemen. Anda akan belajar menerjemahkan persyaratan standar menjadi dokumen mutu yang aplikatif — panduan mutu, prosedur, instruksi kerja, dan formulir — serta memahami bagaimana mempersiapkan laboratorium menghadapi asesmen.",
      "Materi disampaikan oleh praktisi berpengalaman dengan studi kasus nyata dari laboratorium pengujian dan kalibrasi di Indonesia, sehingga Anda tidak hanya paham teori tetapi juga siap menerapkannya di tempat kerja.",
    ],
    careerNote:
      "Kompetensi ISO/IEC 17025 adalah salah satu kualifikasi paling dicari di dunia laboratorium. Posisi quality system officer, document controller, hingga manajer mutu laboratorium mensyaratkan pemahaman standar ini — dan sertifikat pelatihan 24 JP menjadi bukti pengembangan profesional yang diakui dalam berkas kepegawaian maupun lamaran kerja.",
    audience: [
      "Kepala / Manajer Laboratorium",
      "Manajer & Staf Mutu",
      "Pranata Laboratorium",
      "Analis & Teknisi Laboratorium",
      "QA/QC Officer",
      "Mahasiswa & Fresh Graduate MIPA",
    ],
    syllabus: [
      {
        title: "Hari 1 — Memahami Standar ISO/IEC 17025:2017",
        points: [
          "Pengenalan akreditasi laboratorium & peran ISO/IEC 17025",
          "Persyaratan umum: imparsialitas & kerahasiaan",
          "Persyaratan struktural organisasi laboratorium",
          "Persyaratan sumber daya: personel, fasilitas, peralatan, ketertelusuran metrologi",
          "Diskusi & studi kasus penerapan",
        ],
      },
      {
        title: "Hari 2 — Penerapan Sistem Manajemen Mutu",
        points: [
          "Persyaratan proses: kaji ulang permintaan, metode, penanganan barang uji, jaminan mutu hasil",
          "Pelaporan hasil & pengendalian data",
          "Opsi A vs Opsi B sistem manajemen",
          "Dokumentasi mutu: panduan, prosedur, instruksi kerja, formulir",
          "Persiapan menghadapi asesmen & simulasi temuan",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Apakah pelatihan ini cocok untuk pemula yang belum pernah mengenal ISO 17025?",
        answer:
          "Cocok. Materi disusun dari konsep dasar hingga penerapan, sehingga dapat diikuti pemula maupun praktisi yang ingin menyegarkan pemahaman terhadap versi 2017.",
      },
      {
        question: "Apa bedanya pelatihan ini dengan Lead Implementer ISO 17025?",
        answer:
          "Pelatihan ini fokus pada pemahaman persyaratan dan operasional sistem mutu sehari-hari (level officer). Lead Implementer membahas perancangan dan kepemimpinan implementasi sistem secara menyeluruh hingga sertifikasi kompetensi, dengan durasi 3 hari.",
      },
      ...standardFaqs("ISO/IEC 17025", "Rp 1.750.000"),
    ],
    keywords: [
      "pelatihan ISO 17025",
      "training ISO/IEC 17025",
      "petugas sistem mutu laboratorium",
    ],
    seoTitle: "Pelatihan ISO 17025 2026 — e-Sertifikat 24 JP",
    seoDescription:
      "Daftar pelatihan ISO/IEC 17025 online. Rp 1.750.000, sertifikat 24 JP, rekaman & materi. Bayar langsung via QRIS/VA. Kuota terbatas!",
    related: ["lead-implementer-iso-17025", "auditor-internal-iso-17025", "jaminan-mutu"],
    batches: [
      { id: "lqso-2026-06", startDate: "2026-06-22", endDate: "2026-06-23", mode: "Online" },
    ],
  },
  {
    slug: "lead-implementer-iso-17025",
    title: "Lead Implementer Standar Laboratorium ISO 17025",
    subtitle: "Pelatihan & Sertifikasi Kompetensi",
    type: "hybrid",
    jp: null,
    durationDays: 3,
    basePrice: null,
    excerpt:
      "Jalur lengkap pelatihan plus sertifikasi kompetensi untuk memimpin implementasi ISO/IEC 17025 di laboratorium Anda — dari perancangan sistem hingga kesiapan akreditasi.",
    description: [
      "Lead Implementer adalah orang yang bertanggung jawab merancang, membangun, dan memimpin penerapan sistem manajemen ISO/IEC 17025 di laboratorium. Peran ini menuntut kemampuan menerjemahkan persyaratan standar ke dalam struktur organisasi, proses, dan dokumentasi yang berjalan secara nyata — bukan sekadar memahami klausul.",
      "Program 3 hari ini menggabungkan pelatihan intensif dengan asesmen sertifikasi kompetensi. Anda akan mempelajari perencanaan implementasi, gap analysis, penyusunan dokumentasi terintegrasi, manajemen risiko dan peluang, hingga strategi menghadapi asesmen akreditasi. Program diselenggarakan secara hybrid sehingga dapat diikuti dari mana saja maupun tatap muka.",
    ],
    careerNote:
      "Sertifikasi kompetensi lead implementer memperkuat posisi Anda sebagai penanggung jawab sistem mutu — kualifikasi yang relevan untuk manajer mutu, konsultan laboratorium, dan profesional yang menargetkan jenjang karier manajerial.",
    audience: [
      "Manajer Mutu & Manajer Teknis",
      "Kepala Laboratorium",
      "Konsultan Sistem Manajemen",
      "Personel yang ditugaskan membangun sistem ISO 17025",
    ],
    syllabus: [
      {
        title: "Hari 1 — Fondasi & Perencanaan Implementasi",
        points: [
          "Interpretasi mendalam klausul ISO/IEC 17025:2017",
          "Gap analysis kondisi laboratorium",
          "Perencanaan proyek implementasi & peran lead implementer",
        ],
      },
      {
        title: "Hari 2 — Membangun Sistem",
        points: [
          "Penyusunan dokumentasi sistem manajemen terintegrasi",
          "Manajemen risiko & peluang laboratorium",
          "Validasi/verifikasi metode, ketertelusuran & jaminan mutu hasil",
        ],
      },
      {
        title: "Hari 3 — Evaluasi & Asesmen Sertifikasi Kompetensi",
        points: [
          "Audit internal & kaji ulang manajemen sebagai alat perbaikan",
          "Strategi menghadapi asesmen akreditasi",
          "Asesmen sertifikasi kompetensi peserta",
        ],
      },
    ],
    benefits: [
      "Pelatihan 3 hari + asesmen sertifikasi kompetensi",
      "Soft copy materi & template dokumen implementasi",
      "Pelaksanaan hybrid — pilih online atau tatap muka",
      "Konsultasi penerapan pasca pelatihan",
    ],
    faqs: [
      {
        question: "Apa perbedaan program ini dengan pelatihan ISO 17025 biasa?",
        answer:
          "Program ini lebih dalam dan lebih lama (3 hari), berfokus pada kemampuan memimpin implementasi sistem secara menyeluruh, dan diakhiri asesmen sertifikasi kompetensi — bukan hanya sertifikat pelatihan.",
      },
      {
        question: "Apakah ada prasyarat untuk mengikuti sertifikasi ini?",
        answer:
          "Disarankan telah memahami dasar ISO/IEC 17025 atau pernah mengikuti pelatihan pemahaman standar. Hubungi admin untuk konsultasi kesesuaian latar belakang Anda.",
      },
      {
        question: "Berapa biaya program Lead Implementer?",
        answer:
          "Biaya program dan skema sertifikasi diinformasikan melalui admin karena mencakup komponen asesmen. Silakan hubungi admin via WhatsApp untuk penawaran resmi.",
      },
      {
        question: "Bagaimana format hybrid dijalankan?",
        answer:
          "Peserta dapat memilih mengikuti secara online via Zoom atau hadir tatap muka di lokasi penyelenggaraan. Materi, fasilitator, dan asesmen sama untuk kedua jalur.",
      },
    ],
    keywords: [
      "sertifikasi lead implementer ISO 17025",
      "pelatihan lead implementer laboratorium",
    ],
    seoTitle: "Sertifikasi Lead Implementer ISO 17025 2026",
    seoDescription:
      "Pelatihan & sertifikasi kompetensi Lead Implementer ISO/IEC 17025, 3 hari hybrid. 6 batch sepanjang 2026. Daftar online sekarang!",
    related: ["iso-17025-quality-system-officer", "auditor-internal-iso-17025", "ketidakpastian-pengukuran"],
    batches: [
      { id: "li-2026-06", startDate: "2026-06-24", endDate: "2026-06-26", mode: "Hybrid" },
      { id: "li-2026-07", startDate: "2026-07-15", endDate: "2026-07-17", mode: "Hybrid" },
      { id: "li-2026-08", startDate: "2026-08-26", endDate: "2026-08-28", mode: "Hybrid" },
      { id: "li-2026-09", startDate: "2026-09-23", endDate: "2026-09-25", mode: "Hybrid" },
      { id: "li-2026-11", startDate: "2026-11-23", endDate: "2026-11-25", mode: "Hybrid" },
      { id: "li-2026-12", startDate: "2026-12-09", endDate: "2026-12-11", mode: "Hybrid" },
    ],
  },
  {
    slug: "laboratory-hse-officer-k3l",
    title: "Laboratory HSE Officer",
    subtitle: "Petugas K3L Laboratorium",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: 1_750_000,
    priority: true,
    excerpt:
      "Pelajari HIRADC, pengelolaan bahan kimia & limbah B3, tanggap darurat, dan inspeksi K3 untuk menciptakan laboratorium yang aman dan patuh regulasi.",
    description: [
      "Laboratorium adalah lingkungan kerja dengan risiko tinggi: bahan kimia berbahaya, peralatan bertekanan, sumber panas, hingga limbah B3. Tanpa pengelolaan keselamatan dan kesehatan kerja (K3) yang sistematis, risiko kecelakaan, paparan bahan berbahaya, dan pelanggaran regulasi selalu mengintai.",
      "Pelatihan Laboratory HSE Officer membekali Anda dengan kompetensi inti petugas K3L laboratorium: identifikasi bahaya dan penilaian risiko (HIRADC), pengelolaan bahan kimia sesuai GHS, penanganan limbah B3, perencanaan tanggap darurat, hingga pelaksanaan inspeksi K3 berkala. Seluruh materi dikaitkan dengan regulasi K3 yang berlaku di Indonesia.",
      "Setelah pelatihan, Anda mampu menyusun dokumen HIRADC untuk laboratorium Anda sendiri, mengaudit kondisi keselamatan secara mandiri, dan menjadi penggerak budaya K3 di tempat kerja.",
    ],
    careerNote:
      "Regulasi mewajibkan tempat kerja mengelola K3 secara sistematis, dan laboratorium termasuk area prioritas. Kompetensi HSE laboratorium membuka peluang sebagai HSE officer, safety coordinator, atau penanggung jawab K3 laboratorium di industri, rumah sakit, kampus, dan lembaga penelitian.",
    audience: [
      "HSE / K3 Officer",
      "Kepala & Penanggung Jawab Laboratorium",
      "Analis & Teknisi Laboratorium",
      "Pranata Laboratorium Pendidikan",
      "Mahasiswa & Fresh Graduate",
    ],
    syllabus: [
      {
        title: "Hari 1 — Dasar K3 Laboratorium & Manajemen Risiko",
        points: [
          "Regulasi K3 laboratorium di Indonesia",
          "HIRADC: identifikasi bahaya, penilaian & pengendalian risiko",
          "Hirarki pengendalian & alat pelindung diri (APD)",
          "Pengelolaan bahan kimia: GHS, SDS, penyimpanan & kompatibilitas",
        ],
      },
      {
        title: "Hari 2 — Operasional K3L & Kesiapsiagaan",
        points: [
          "Pengelolaan limbah B3 laboratorium",
          "Perencanaan & simulasi tanggap darurat",
          "Inspeksi K3 & investigasi insiden",
          "Membangun budaya K3 & program perbaikan berkelanjutan",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Apakah pelatihan ini sama dengan sertifikasi Ahli K3 Umum?",
        answer:
          "Berbeda. Ahli K3 Umum adalah program penunjukan oleh Kemnaker dengan cakupan industri umum. Pelatihan ini berfokus spesifik pada keselamatan kerja di lingkungan laboratorium — HIRADC lab, bahan kimia, dan limbah B3 — dan menghasilkan e-sertifikat pelatihan 24 JP.",
      },
      {
        question: "Apakah materi HIRADC disertai praktik?",
        answer:
          "Ya. Peserta mengerjakan latihan menyusun HIRADC untuk skenario laboratorium nyata dan mendapatkan template yang bisa langsung dipakai di tempat kerja.",
      },
      ...standardFaqs("Laboratory HSE Officer", "Rp 1.750.000"),
    ],
    keywords: [
      "pelatihan K3 laboratorium",
      "K3L laboratorium",
      "HSE laboratorium",
      "HIRADC",
    ],
    seoTitle: "Pelatihan K3 Laboratorium 2026 — e-Sertifikat 24 JP",
    seoDescription:
      "Daftar pelatihan K3L laboratorium (HSE Officer) online. Rp 1.750.000, sertifikat 24 JP, materi HIRADC & limbah B3. Bayar via QRIS/VA!",
    related: ["glp-laboratory-technician", "iso-14001-officer", "pranata-laboratorium"],
    batches: [
      // Poster detail menulis 3–4 Jul; jadwal master menulis 2–3 Jul — konfirmasi sebelum publish final.
      {
        id: "hse-2026-07",
        startDate: "2026-07-03",
        endDate: "2026-07-04",
        mode: "Online",
        needsConfirmation: true,
      },
      { id: "hse-2026-12", startDate: "2026-12-02", endDate: "2026-12-03", mode: "Online" },
    ],
  },
  {
    slug: "glp-laboratory-technician",
    title: "GLP Laboratory Technician",
    subtitle: "Teknisi Laboratorium Good Laboratory Practice",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: 1_750_000,
    priority: true,
    excerpt:
      "Terapkan prinsip Good Laboratory Practice: integritas data ALCOA, dokumentasi, penanganan sampel, dan operasional laboratorium yang baik dan tertelusur.",
    description: [
      "Good Laboratory Practice (GLP) adalah kerangka kerja yang memastikan data laboratorium dihasilkan secara konsisten, andal, dan dapat ditelusuri. Bagi teknisi laboratorium, GLP bukan sekadar aturan — ia adalah standar profesional yang menentukan apakah hasil kerja Anda dipercaya.",
      "Pelatihan ini membahas prinsip-prinsip GLP secara aplikatif: peran dan tanggung jawab personel, penanganan sampel dari penerimaan hingga disposisi, pengoperasian dan pemeliharaan peralatan, pencatatan data sesuai prinsip ALCOA (Attributable, Legible, Contemporaneous, Original, Accurate), serta dokumentasi dan pengarsipan yang benar.",
      "Dengan studi kasus penyimpangan data yang sering terjadi di laboratorium, Anda akan belajar mengenali praktik berisiko dan membangun kebiasaan kerja yang menjaga integritas hasil pengujian.",
    ],
    careerNote:
      "GLP menjadi kualifikasi standar bagi teknisi di laboratorium farmasi, pangan, lingkungan, dan riset. Sertifikat pelatihan GLP 24 JP memperkuat profil Anda untuk posisi teknisi, analis junior, hingga koordinator laboratorium.",
    audience: [
      "Teknisi & Operator Laboratorium",
      "Analis Laboratorium",
      "Staf R&D",
      "Pranata Laboratorium Pendidikan",
      "Mahasiswa & Fresh Graduate",
    ],
    syllabus: [
      {
        title: "Hari 1 — Prinsip & Organisasi GLP",
        points: [
          "Konsep dan ruang lingkup Good Laboratory Practice",
          "Peran & tanggung jawab personel laboratorium",
          "Fasilitas, peralatan, dan bahan: kualifikasi & pemeliharaan",
          "Penanganan sampel: penerimaan, identifikasi, penyimpanan, disposisi",
        ],
      },
      {
        title: "Hari 2 — Integritas Data & Dokumentasi",
        points: [
          "Prinsip ALCOA / ALCOA+ dalam pencatatan data",
          "Good Documentation Practice: logbook, formulir, koreksi data",
          "Penyimpangan, OOS, dan tindakan perbaikan",
          "Pengarsipan & ketertelusuran rekaman",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Apa bedanya GLP dengan ISO/IEC 17025?",
        answer:
          "GLP adalah praktik kerja baik yang menjadi fondasi operasional harian laboratorium, sedangkan ISO/IEC 17025 adalah standar sistem manajemen untuk akreditasi kompetensi laboratorium. Keduanya saling melengkapi — GLP yang kuat memudahkan pemenuhan ISO 17025.",
      },
      {
        question: "Apakah pelatihan ini relevan untuk laboratorium pendidikan?",
        answer:
          "Sangat relevan. Prinsip penanganan sampel, dokumentasi, dan integritas data berlaku untuk semua jenis laboratorium, termasuk laboratorium kampus dan sekolah.",
      },
      ...standardFaqs("GLP", "Rp 1.750.000"),
    ],
    keywords: ["pelatihan GLP", "good laboratory practice", "teknisi laboratorium GLP"],
    seoTitle: "Pelatihan GLP 2026 — e-Sertifikat 24 JP",
    seoDescription:
      "Daftar pelatihan Good Laboratory Practice online. Rp 1.750.000, sertifikat 24 JP, materi ALCOA & dokumentasi. Bayar via QRIS/VA!",
    related: ["qc-laboratory-analyst", "laboratory-hse-officer-k3l", "pranata-laboratorium"],
    batches: [
      { id: "glp-2026-07", startDate: "2026-07-23", endDate: "2026-07-24", mode: "Online" },
      { id: "glp-2026-09", startDate: "2026-09-16", endDate: "2026-09-17", mode: "Online" },
    ],
  },
  {
    slug: "jaminan-mutu",
    title: "Jaminan Mutu Hasil Pengujian",
    subtitle: "Quality Assurance Hasil Laboratorium",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: null,
    excerpt:
      "Pahami teknik pemastian keabsahan hasil pengujian: kontrol mutu internal, uji profisiensi, control chart, dan evaluasi tren data laboratorium.",
    description: [
      "Hasil pengujian laboratorium hanya bernilai jika keabsahannya dapat dijamin. Klausul jaminan mutu hasil dalam ISO/IEC 17025 menuntut laboratorium memantau validitas hasil secara terencana — bukan sekadar mengandalkan kompetensi analis.",
      "Pelatihan ini membahas perangkat jaminan mutu hasil pengujian secara praktis: pemilihan dan penggunaan bahan acuan, kontrol mutu internal (duplikat, spike, blanko), pembuatan dan interpretasi control chart, partisipasi uji profisiensi dan uji banding antar laboratorium, hingga evaluasi tren dan tindakan saat hasil keluar dari kriteria.",
    ],
    careerNote:
      "Kemampuan merancang program jaminan mutu adalah kompetensi pembeda bagi analis senior dan penyelia laboratorium — peran kunci dalam mempertahankan status akreditasi laboratorium.",
    audience: [
      "Penyelia & Analis Senior Laboratorium",
      "Manajer Mutu & Manajer Teknis",
      "Personel penanggung jawab QC internal",
    ],
    syllabus: [
      {
        title: "Hari 1 — Konsep & Perangkat Jaminan Mutu",
        points: [
          "Persyaratan pemastian keabsahan hasil dalam ISO/IEC 17025",
          "Bahan acuan & bahan kontrol: pemilihan dan penggunaan",
          "Kontrol mutu internal: blanko, duplikat, spike, CRM",
        ],
      },
      {
        title: "Hari 2 — Pemantauan & Evaluasi",
        points: [
          "Control chart: pembuatan, batas kendali, interpretasi",
          "Uji profisiensi & uji banding antar laboratorium",
          "Evaluasi tren data dan tindakan atas hasil di luar kriteria",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Berapa biaya pelatihan Jaminan Mutu?",
        answer:
          "Biaya batch terbaru diinformasikan melalui admin. Hubungi admin via WhatsApp untuk mendapatkan penawaran dan ketersediaan kursi.",
      },
      {
        question: "Apakah pelatihan ini membahas statistik?",
        answer:
          "Ya, dalam porsi aplikatif: perhitungan batas kendali control chart dan evaluasi z-score uji profisiensi, disertai latihan menggunakan spreadsheet.",
      },
      {
        question: "Bagaimana jika saya berhalangan hadir di salah satu sesi?",
        answer:
          "Seluruh sesi direkam. Peserta yang berhalangan tetap mendapatkan rekaman lengkap, soft copy materi, dan e-sertifikat.",
      },
      {
        question: "Apakah saya mendapatkan sertifikat?",
        answer:
          "Ya, peserta mendapatkan e-sertifikat pelatihan 24 JP yang juga menjadi syarat lanjut ke sertifikasi kompetensi.",
      },
    ],
    keywords: ["pelatihan jaminan mutu laboratorium", "quality assurance hasil pengujian"],
    seoTitle: "Pelatihan Jaminan Mutu Laboratorium 2026",
    seoDescription:
      "Pelatihan jaminan mutu hasil pengujian: control chart, uji profisiensi, QC internal. Online 2 hari, sertifikat 24 JP. Daftar sekarang!",
    related: ["iso-17025-quality-system-officer", "qc-laboratory-analyst", "ketidakpastian-pengukuran"],
    batches: [
      { id: "jm-2026-07", startDate: "2026-07-30", endDate: "2026-07-31", mode: "Online" },
    ],
  },
  {
    slug: "qc-laboratory-analyst",
    title: "QC Laboratory Analyst",
    subtitle: "Analis Laboratorium Quality Control",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: 1_750_000,
    priority: true,
    excerpt:
      "Tingkatkan kompetensi analis QC: teknik analisis, verifikasi metode, kontrol mutu pengujian, dan pelaporan hasil yang andal untuk industri.",
    description: [
      "Analis Quality Control adalah garda terdepan mutu produk. Setiap keputusan rilis batch produksi bergantung pada keandalan data yang dihasilkan analis QC — sehingga kompetensi teknis dan kedisiplinan sistem kerja analis menentukan reputasi perusahaan.",
      "Pelatihan QC Laboratory Analyst membekali Anda dengan kompetensi kerja analis QC modern: alur kerja pengujian dari penerimaan sampel hingga pelaporan, dasar verifikasi dan validasi metode, kontrol mutu internal dalam rutinitas pengujian, penanganan hasil di luar spesifikasi (OOS), serta praktik dokumentasi yang memenuhi audit.",
      "Materi dirancang lintas industri — farmasi, pangan, kimia, dan lingkungan — dengan studi kasus nyata sehingga langsung relevan dengan pekerjaan Anda sehari-hari.",
    ],
    careerNote:
      "Analis QC bersertifikat pelatihan memiliki daya saing lebih tinggi di industri manufaktur, farmasi, dan pangan. Sertifikat 24 JP menjadi bukti pengembangan kompetensi untuk kenaikan jenjang analis junior menuju analis senior atau penyelia QC.",
    audience: [
      "Analis QC Industri",
      "Teknisi Laboratorium Pengujian",
      "Staf QA yang ingin memahami operasional QC",
      "Mahasiswa & Fresh Graduate Kimia/Farmasi/Teknologi Pangan",
    ],
    syllabus: [
      {
        title: "Hari 1 — Fondasi Kerja Analis QC",
        points: [
          "Peran QC dalam sistem mutu industri",
          "Alur pengujian: sampling, preparasi, analisis, pelaporan",
          "Dasar verifikasi & validasi metode analisis",
          "Kalibrasi & pengecekan antara peralatan",
        ],
      },
      {
        title: "Hari 2 — Kontrol Mutu & Pelaporan",
        points: [
          "QC internal dalam rutinitas pengujian",
          "Penanganan out-of-specification (OOS) & out-of-trend (OOT)",
          "Dokumentasi & integritas data pengujian",
          "Studi kasus lintas industri & diskusi",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Apakah pelatihan ini spesifik untuk industri tertentu?",
        answer:
          "Tidak. Materi disusun lintas industri (farmasi, pangan, kimia, lingkungan) dengan prinsip yang sama, lalu diperdalam lewat studi kasus dari berbagai sektor.",
      },
      {
        question: "Saya fresh graduate, apakah pelatihan ini membantu melamar kerja sebagai analis?",
        answer:
          "Ya. Pelatihan ini memberi gambaran nyata alur kerja analis QC di industri plus e-sertifikat 24 JP yang memperkuat CV Anda.",
      },
      ...standardFaqs("QC Laboratory Analyst", "Rp 1.750.000"),
    ],
    keywords: ["pelatihan analis laboratorium", "training QC laboratorium", "analis quality control"],
    seoTitle: "Pelatihan Analis QC Laboratorium 2026 — 24 JP",
    seoDescription:
      "Daftar pelatihan QC Laboratory Analyst online. Rp 1.750.000, sertifikat 24 JP, rekaman & materi. Bayar langsung via QRIS/VA!",
    related: ["glp-laboratory-technician", "quality-assurance-officer", "jaminan-mutu"],
    batches: [
      { id: "qc-2026-08", startDate: "2026-08-05", endDate: "2026-08-06", mode: "Online" },
    ],
  },
  {
    slug: "pranata-laboratorium",
    title: "Laboratory Operations Officer",
    subtitle: "Pranata Laboratorium",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: 1_750_000,
    excerpt:
      "Kelola operasional laboratorium secara profesional: perencanaan layanan, pengelolaan alat & bahan, administrasi, dan keselamatan kerja laboratorium.",
    description: [
      "Pranata laboratorium adalah tulang punggung operasional laboratorium — memastikan alat siap pakai, bahan tersedia, layanan berjalan, dan administrasi tertib. Peran ini menuntut kombinasi keterampilan teknis, manajerial, dan administratif yang jarang diajarkan secara terstruktur.",
      "Pelatihan ini membahas pengelolaan operasional laboratorium dari hulu ke hilir: perencanaan kegiatan dan layanan laboratorium, pengelolaan peralatan (inventarisasi, perawatan, kalibrasi), pengelolaan bahan termasuk bahan berbahaya, administrasi dan pelaporan, hingga penerapan K3 dalam operasional harian. Relevan untuk pranata laboratorium pendidikan maupun pengelola laboratorium industri dan lembaga.",
    ],
    careerNote:
      "Bagi pranata laboratorium pendidikan (PLP) dan pengelola laboratorium, sertifikat pelatihan 24 JP mendukung pengembangan profesi berkelanjutan dan menjadi nilai tambah dalam jenjang fungsional.",
    audience: [
      "Pranata Laboratorium Pendidikan (PLP)",
      "Pengelola & Koordinator Laboratorium",
      "Teknisi Laboratorium Senior",
      "Kepala Laboratorium Sekolah/Kampus",
    ],
    syllabus: [
      {
        title: "Hari 1 — Manajemen Operasional Laboratorium",
        points: [
          "Peran & kompetensi pranata laboratorium",
          "Perencanaan kegiatan dan layanan laboratorium",
          "Pengelolaan peralatan: inventarisasi, perawatan, kalibrasi",
          "Pengelolaan bahan & bahan berbahaya",
        ],
      },
      {
        title: "Hari 2 — Administrasi, Mutu & Keselamatan",
        points: [
          "Administrasi laboratorium & sistem pencatatan",
          "Standar layanan dan kepuasan pengguna laboratorium",
          "K3 dalam operasional harian laboratorium",
          "Evaluasi kinerja & pengembangan laboratorium",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Apakah pelatihan ini sesuai untuk PLP di perguruan tinggi?",
        answer:
          "Ya. Materi disusun mencakup kebutuhan pranata laboratorium pendidikan, termasuk pengelolaan layanan praktikum dan administrasi laboratorium kampus.",
      },
      ...standardFaqs("Laboratory Operations Officer", "Rp 1.750.000"),
    ],
    keywords: ["pelatihan pranata laboratorium", "laboratory operations officer"],
    seoTitle: "Pelatihan Pranata Laboratorium 2026 — 24 JP",
    seoDescription:
      "Daftar pelatihan pranata laboratorium online. Rp 1.750.000, sertifikat 24 JP, rekaman & materi. Bayar langsung via QRIS/VA!",
    related: ["glp-laboratory-technician", "laboratory-hse-officer-k3l", "iso-17025-quality-system-officer"],
    batches: [
      { id: "plp-2026-08", startDate: "2026-08-12", endDate: "2026-08-13", mode: "Online" },
    ],
  },
  {
    slug: "research-development-officer",
    title: "Research and Development Officer",
    subtitle: "Petugas Riset & Pengembangan",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: 1_750_000,
    excerpt:
      "Bangun kompetensi R&D: perancangan eksperimen, pengembangan produk & metode, dokumentasi riset, dan transisi dari skala lab ke produksi.",
    description: [
      "Departemen R&D adalah mesin inovasi perusahaan — tempat produk baru dirancang, formula diperbaiki, dan metode dikembangkan. Bekerja di R&D menuntut cara berpikir sistematis: dari merumuskan masalah, merancang eksperimen, menganalisis data, hingga mendokumentasikan hasil agar dapat direproduksi.",
      "Pelatihan ini membekali Anda dengan kerangka kerja R&D yang terstruktur: siklus pengembangan produk, dasar design of experiment (DoE), pengembangan dan optimasi metode, dokumentasi riset yang baik, hingga aspek scale-up dan transfer teknologi ke produksi. Cocok untuk staf R&D baru maupun analis yang bertransisi ke peran pengembangan.",
    ],
    careerNote:
      "Kompetensi R&D yang terstruktur membuka jalur karier sebagai R&D officer, formulator, hingga product development specialist di industri pangan, farmasi, kosmetik, dan kimia.",
    audience: [
      "Staf & Calon Staf R&D",
      "Analis Laboratorium yang bertransisi ke R&D",
      "Supervisor Produk & Formulasi",
      "Mahasiswa & Fresh Graduate",
    ],
    syllabus: [
      {
        title: "Hari 1 — Kerangka Kerja R&D",
        points: [
          "Peran R&D dalam strategi perusahaan",
          "Siklus pengembangan produk: ide hingga peluncuran",
          "Dasar perancangan eksperimen (DoE)",
          "Pengembangan & optimasi metode",
        ],
      },
      {
        title: "Hari 2 — Eksekusi & Dokumentasi Riset",
        points: [
          "Analisis & interpretasi data riset",
          "Dokumentasi riset dan kekayaan intelektual dasar",
          "Scale-up & transfer teknologi ke produksi",
          "Studi kasus pengembangan produk",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Apakah pelatihan ini membahas industri tertentu?",
        answer:
          "Kerangka materi berlaku lintas industri, dengan contoh kasus dari industri pangan, farmasi, dan kimia yang dapat diadaptasi ke bidang Anda.",
      },
      ...standardFaqs("R&D Officer", "Rp 1.750.000"),
    ],
    keywords: ["pelatihan R&D", "research and development officer"],
    seoTitle: "Pelatihan R&D Officer 2026 — e-Sertifikat 24 JP",
    seoDescription:
      "Daftar pelatihan Research & Development Officer online. Rp 1.750.000, sertifikat 24 JP, rekaman & materi. Bayar via QRIS/VA!",
    related: ["qc-laboratory-analyst", "regulatory-affairs-officer", "food-safety-management"],
    batches: [
      { id: "rnd-2026-08", startDate: "2026-08-19", endDate: "2026-08-20", mode: "Online" },
    ],
  },
  {
    slug: "quality-assurance-officer",
    title: "Quality Assurance Officer",
    subtitle: "Petugas Pemastian Mutu",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: 1_750_000,
    excerpt:
      "Kuasai peran QA: perancangan sistem mutu, pengendalian dokumen, audit & CAPA, serta pemastian kepatuhan proses dari hulu ke hilir.",
    description: [
      "Jika QC memeriksa produk, QA memastikan sistemnya benar sejak awal. Quality Assurance bekerja pada level proses dan sistem: merancang prosedur, mengendalikan dokumen, mengelola penyimpangan dan CAPA, serta memastikan seluruh operasi patuh terhadap standar dan regulasi.",
      "Pelatihan Quality Assurance Officer membekali Anda dengan kompetensi inti QA modern: prinsip manajemen mutu, pengendalian dokumen dan rekaman, manajemen perubahan dan penyimpangan, tindakan korektif-preventif (CAPA), audit mutu internal, hingga pelaporan kinerja mutu kepada manajemen. Disampaikan dengan studi kasus dari industri manufaktur dan laboratorium.",
    ],
    careerNote:
      "QA adalah salah satu fungsi dengan permintaan paling stabil di industri. Sertifikat pelatihan QA 24 JP memperkuat kualifikasi Anda untuk peran QA officer, QA supervisor, hingga document controller.",
    audience: [
      "Staf & Calon Staf QA",
      "Personel QC yang bertransisi ke QA",
      "Document Controller",
      "Supervisor Produksi & Mutu",
    ],
    syllabus: [
      {
        title: "Hari 1 — Sistem Pemastian Mutu",
        points: [
          "QA vs QC: peran dalam sistem mutu perusahaan",
          "Prinsip manajemen mutu & pendekatan proses",
          "Pengendalian dokumen & rekaman",
          "Manajemen perubahan (change control)",
        ],
      },
      {
        title: "Hari 2 — Pengendalian & Perbaikan",
        points: [
          "Manajemen penyimpangan & investigasi akar masalah",
          "CAPA: tindakan korektif & preventif yang efektif",
          "Audit mutu internal",
          "Indikator kinerja mutu & pelaporan manajemen",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Apa perbedaan pelatihan ini dengan QC Laboratory Analyst?",
        answer:
          "QC Laboratory Analyst berfokus pada kompetensi teknis pengujian di laboratorium, sedangkan pelatihan QA berfokus pada sistem mutu: dokumen, penyimpangan, CAPA, dan audit. Banyak peserta mengambil keduanya untuk karier mutu yang lengkap.",
      },
      ...standardFaqs("Quality Assurance Officer", "Rp 1.750.000"),
    ],
    keywords: ["pelatihan quality assurance", "petugas QA laboratorium"],
    seoTitle: "Pelatihan QA Officer 2026 — e-Sertifikat 24 JP",
    seoDescription:
      "Daftar pelatihan Quality Assurance Officer online. Rp 1.750.000, sertifikat 24 JP, materi CAPA & audit. Bayar via QRIS/VA!",
    related: ["qc-laboratory-analyst", "iso-9001-officer", "jaminan-mutu"],
    batches: [
      { id: "qa-2026-09", startDate: "2026-09-02", endDate: "2026-09-03", mode: "Online" },
    ],
  },
  {
    slug: "iso-9001-officer",
    title: "Quality Management System (ISO 9001) Officer",
    subtitle: "Petugas Sistem Manajemen Mutu ISO 9001",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: 1_750_000,
    excerpt:
      "Pahami persyaratan ISO 9001:2015 dan cara menerapkannya: konteks organisasi, manajemen risiko, dokumentasi, hingga audit internal.",
    description: [
      "ISO 9001 adalah standar sistem manajemen mutu paling banyak diadopsi di dunia — fondasi tata kelola mutu bagi organisasi dari berbagai sektor, termasuk laboratorium dan lembaga layanan. Memahami ISO 9001 berarti memahami bahasa mutu yang dipakai lintas industri.",
      "Pelatihan ini membahas persyaratan ISO 9001:2015 klausul demi klausul dengan pendekatan praktis: konteks organisasi dan pihak berkepentingan, kepemimpinan, perencanaan berbasis risiko, dukungan dan operasi, evaluasi kinerja, hingga perbaikan berkelanjutan. Peserta berlatih memetakan proses organisasinya sendiri ke dalam kerangka standar.",
    ],
    careerNote:
      "Kompetensi ISO 9001 dibutuhkan hampir semua organisasi tersertifikasi — membuka peran sebagai QMS officer, management representative support, hingga auditor internal mutu.",
    audience: [
      "Staf Mutu & QMS Officer",
      "Management Representative & Tim ISO",
      "Supervisor lintas departemen",
      "Personel laboratorium yang organisasinya menerapkan ISO 9001",
    ],
    syllabus: [
      {
        title: "Hari 1 — Memahami ISO 9001:2015",
        points: [
          "Prinsip manajemen mutu & struktur High Level Structure",
          "Konteks organisasi & pihak berkepentingan",
          "Kepemimpinan, kebijakan & sasaran mutu",
          "Perencanaan: risiko & peluang",
        ],
      },
      {
        title: "Hari 2 — Penerapan & Evaluasi",
        points: [
          "Dukungan: sumber daya, kompetensi, informasi terdokumentasi",
          "Operasi & pengendalian proses",
          "Evaluasi kinerja, audit internal & tinjauan manajemen",
          "Ketidaksesuaian & perbaikan berkelanjutan",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Apakah pelatihan ini cukup untuk menjadi auditor internal ISO 9001?",
        answer:
          "Pelatihan ini berfokus pada pemahaman dan penerapan persyaratan. Untuk teknik audit, kombinasikan dengan pelatihan auditor internal — pemahaman standar dari kelas ini menjadi fondasinya.",
      },
      ...standardFaqs("ISO 9001", "Rp 1.750.000"),
    ],
    keywords: ["pelatihan ISO 9001", "quality management system officer"],
    seoTitle: "Pelatihan ISO 9001 2026 — e-Sertifikat 24 JP",
    seoDescription:
      "Daftar pelatihan ISO 9001:2015 online. Rp 1.750.000, sertifikat 24 JP, rekaman & materi. Bayar langsung via QRIS/VA!",
    related: ["quality-assurance-officer", "iso-14001-officer", "iso-17025-quality-system-officer"],
    batches: [
      { id: "qms-2026-09", startDate: "2026-09-09", endDate: "2026-09-10", mode: "Online" },
    ],
  },
  {
    slug: "regulatory-affairs-officer",
    title: "Regulatory Affairs Officer",
    subtitle: "Petugas Urusan Regulasi",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: 1_750_000,
    excerpt:
      "Navigasi regulasi produk di Indonesia: registrasi produk, persyaratan BPOM & kementerian terkait, dokumen teknis, dan kepatuhan pasca-pemasaran.",
    description: [
      "Setiap produk pangan, obat, kosmetik, dan alat kesehatan yang beredar di Indonesia harus melewati pintu regulasi. Regulatory Affairs (RA) adalah profesi yang memastikan produk memenuhi persyaratan sejak pengembangan hingga pasca-pemasaran — peran strategis yang menjembatani perusahaan dengan regulator.",
      "Pelatihan ini memperkenalkan peta regulasi produk di Indonesia dan kompetensi inti RA officer: kerangka regulasi BPOM dan kementerian terkait, proses registrasi dan notifikasi produk, penyusunan dokumen teknis (dossier), labeling dan klaim, hingga kewajiban pasca-pemasaran seperti pelaporan dan penanganan ketidaksesuaian.",
    ],
    careerNote:
      "Regulatory affairs termasuk profesi dengan permintaan tinggi dan pasokan talenta terbatas di industri pangan, farmasi, dan kosmetik — menjadikannya jalur karier bernilai bagi lulusan sains.",
    audience: [
      "Staf & Calon Staf Regulatory Affairs",
      "Staf R&D dan QA yang menangani registrasi",
      "Pelaku usaha pangan/kosmetik",
      "Mahasiswa & Fresh Graduate Farmasi/Pangan",
    ],
    syllabus: [
      {
        title: "Hari 1 — Peta Regulasi & Registrasi Produk",
        points: [
          "Peran regulatory affairs dalam siklus hidup produk",
          "Kerangka regulasi BPOM & kementerian terkait",
          "Klasifikasi produk & jalur registrasi/notifikasi",
          "Penyusunan dokumen teknis (dossier)",
        ],
      },
      {
        title: "Hari 2 — Kepatuhan & Pasca-Pemasaran",
        points: [
          "Labeling, iklan & klaim produk",
          "Variasi, perpanjangan & manajemen perubahan registrasi",
          "Kewajiban pasca-pemasaran & penanganan temuan",
          "Studi kasus registrasi produk",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Produk apa saja yang dibahas dalam pelatihan ini?",
        answer:
          "Fokus utama pada produk pangan olahan, kosmetik, dan suplemen dengan kerangka yang juga relevan untuk kategori lain. Studi kasus dipilih dari pertanyaan peserta.",
      },
      ...standardFaqs("Regulatory Affairs", "Rp 1.750.000"),
    ],
    keywords: ["pelatihan regulatory affairs", "petugas regulasi", "registrasi produk"],
    seoTitle: "Pelatihan Regulatory Affairs 2026 — 24 JP",
    seoDescription:
      "Daftar pelatihan Regulatory Affairs Officer online. Rp 1.750.000, sertifikat 24 JP, materi registrasi BPOM. Bayar via QRIS/VA!",
    related: ["food-safety-management", "research-development-officer", "quality-assurance-officer"],
    batches: [
      { id: "ra-2026-10", startDate: "2026-10-07", endDate: "2026-10-08", mode: "Online" },
    ],
  },
  {
    slug: "iso-14001-officer",
    title: "Environmental Management System (ISO 14001) Officer",
    subtitle: "Petugas Sistem Manajemen Lingkungan",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: 1_750_000,
    excerpt:
      "Terapkan ISO 14001:2015: identifikasi aspek-dampak lingkungan, kepatuhan regulasi, pengendalian operasional, dan kesiapsiagaan tanggap darurat.",
    description: [
      "Tekanan terhadap kinerja lingkungan organisasi terus meningkat — dari regulasi pemerintah, tuntutan pelanggan, hingga komitmen keberlanjutan global. ISO 14001 memberikan kerangka sistematis untuk mengelola aspek lingkungan organisasi secara terencana dan terukur.",
      "Pelatihan ini membahas persyaratan ISO 14001:2015 dan langkah penerapannya: identifikasi aspek dan dampak lingkungan, evaluasi kewajiban kepatuhan, penetapan sasaran lingkungan, pengendalian operasional termasuk pengelolaan limbah, kesiapsiagaan tanggap darurat, hingga evaluasi kinerja dan audit internal lingkungan.",
    ],
    careerNote:
      "Kompetensi sistem manajemen lingkungan dibutuhkan industri manufaktur, pertambangan, dan jasa — relevan untuk peran EMS officer, environmental officer, dan tim sertifikasi ISO 14001.",
    audience: [
      "Staf Lingkungan & HSE",
      "Tim ISO 14001 perusahaan",
      "Pengelola limbah & utilitas",
      "Personel laboratorium lingkungan",
    ],
    syllabus: [
      {
        title: "Hari 1 — Memahami ISO 14001:2015",
        points: [
          "Isu lingkungan & konteks organisasi",
          "Aspek & dampak lingkungan: identifikasi dan evaluasi",
          "Kewajiban kepatuhan & evaluasi pemenuhan",
          "Kebijakan & sasaran lingkungan",
        ],
      },
      {
        title: "Hari 2 — Penerapan & Evaluasi",
        points: [
          "Pengendalian operasional & pengelolaan limbah",
          "Kesiapsiagaan & tanggap darurat lingkungan",
          "Pemantauan, pengukuran & evaluasi kinerja lingkungan",
          "Audit internal & tinjauan manajemen",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Apakah pelatihan ini membahas regulasi lingkungan Indonesia?",
        answer:
          "Ya. Pembahasan kewajiban kepatuhan dikaitkan dengan regulasi lingkungan yang berlaku di Indonesia, termasuk pengelolaan limbah B3.",
      },
      ...standardFaqs("ISO 14001", "Rp 1.750.000"),
    ],
    keywords: ["pelatihan ISO 14001", "environmental management system"],
    seoTitle: "Pelatihan ISO 14001 2026 — e-Sertifikat 24 JP",
    seoDescription:
      "Daftar pelatihan ISO 14001:2015 online. Rp 1.750.000, sertifikat 24 JP, rekaman & materi. Bayar langsung via QRIS/VA!",
    related: ["laboratory-hse-officer-k3l", "sustainability-officer", "iso-9001-officer"],
    batches: [
      { id: "ems-2026-10", startDate: "2026-10-14", endDate: "2026-10-15", mode: "Online" },
    ],
  },
  {
    slug: "auditor-internal-iso-17025",
    title: "Auditor Internal Standar Laboratorium ISO 17025",
    subtitle: "Pelatihan & Sertifikasi Kompetensi",
    type: "hybrid",
    jp: null,
    durationDays: 3,
    basePrice: null,
    excerpt:
      "Jadilah auditor internal laboratorium yang kompeten: teknik audit, penyusunan checklist, pelaporan temuan, plus asesmen sertifikasi kompetensi.",
    description: [
      "Audit internal adalah persyaratan wajib ISO/IEC 17025 sekaligus alat perbaikan paling efektif yang dimiliki laboratorium. Namun audit yang baik menuntut lebih dari sekadar memahami standar — dibutuhkan teknik bertanya, kemampuan menggali bukti objektif, dan keterampilan menuliskan temuan yang mendorong perbaikan.",
      "Program 3 hari ini memadukan pelatihan teknik audit dengan asesmen sertifikasi kompetensi. Anda akan berlatih menyusun program dan checklist audit, melakukan simulasi audit (role-play auditor–auditee), mengklasifikasikan temuan, menulis laporan ketidaksesuaian, dan memverifikasi tindakan perbaikan — diakhiri asesmen kompetensi auditor internal.",
    ],
    careerNote:
      "Laboratorium terakreditasi wajib memiliki auditor internal yang kompeten. Sertifikasi kompetensi auditor internal menjadikan Anda aset bernilai bagi laboratorium dan membuka peluang peran lintas fungsi mutu.",
    audience: [
      "Calon & Auditor Internal Laboratorium",
      "Manajer Mutu & Personel Inti Laboratorium",
      "Personel yang ditugaskan dalam program audit internal",
    ],
    syllabus: [
      {
        title: "Hari 1 — Fondasi Audit & Standar",
        points: [
          "Tinjauan persyaratan ISO/IEC 17025:2017 dari kacamata auditor",
          "Prinsip audit berdasarkan ISO 19011",
          "Perencanaan program & jadwal audit internal",
        ],
      },
      {
        title: "Hari 2 — Teknik & Simulasi Audit",
        points: [
          "Penyusunan checklist audit berbasis risiko",
          "Teknik wawancara, observasi & pengumpulan bukti objektif",
          "Simulasi audit: role-play auditor dan auditee",
        ],
      },
      {
        title: "Hari 3 — Pelaporan & Asesmen Kompetensi",
        points: [
          "Klasifikasi temuan & penulisan laporan ketidaksesuaian",
          "Verifikasi tindakan perbaikan & tindak lanjut audit",
          "Asesmen sertifikasi kompetensi auditor internal",
        ],
      },
    ],
    benefits: [
      "Pelatihan 3 hari + asesmen sertifikasi kompetensi",
      "Template program, checklist & laporan audit",
      "Pelaksanaan hybrid — pilih online atau tatap muka",
      "Simulasi audit dengan umpan balik fasilitator",
    ],
    faqs: [
      {
        question: "Apakah saya harus sudah paham ISO 17025 sebelum ikut?",
        answer:
          "Sangat disarankan. Hari pertama memuat tinjauan standar, tetapi pemahaman dasar sebelumnya akan membuat latihan audit jauh lebih efektif. Jika belum, ikuti dulu pelatihan ISO 17025 Quality System Officer.",
      },
      {
        question: "Berapa biaya program Auditor Internal?",
        answer:
          "Biaya program dan skema sertifikasi diinformasikan melalui admin karena mencakup komponen asesmen. Hubungi admin via WhatsApp untuk penawaran resmi.",
      },
      {
        question: "Apa hasil akhir dari program ini?",
        answer:
          "Peserta yang menyelesaikan pelatihan dan lulus asesmen mendapatkan sertifikat kompetensi auditor internal, di samping sertifikat pelatihan.",
      },
      {
        question: "Bagaimana format hybrid dijalankan?",
        answer:
          "Peserta dapat memilih mengikuti via Zoom atau hadir di lokasi. Simulasi audit dirancang agar tetap interaktif untuk kedua jalur.",
      },
    ],
    keywords: ["pelatihan auditor internal ISO 17025", "audit internal laboratorium"],
    seoTitle: "Pelatihan Auditor Internal ISO 17025 2026",
    seoDescription:
      "Pelatihan & sertifikasi kompetensi Auditor Internal ISO/IEC 17025, 3 hari hybrid, 21–23 Okt 2026. Daftar online sekarang!",
    related: ["iso-17025-quality-system-officer", "lead-implementer-iso-17025", "jaminan-mutu"],
    batches: [
      { id: "ai-2026-10", startDate: "2026-10-21", endDate: "2026-10-23", mode: "Hybrid" },
    ],
  },
  {
    slug: "sustainability-officer",
    title: "Sustainability Officer",
    subtitle: "Petugas Keberlanjutan",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: 1_750_000,
    excerpt:
      "Pahami kerangka keberlanjutan untuk organisasi: SDGs, pengukuran jejak karbon dasar, program efisiensi sumber daya, dan pelaporan keberlanjutan.",
    description: [
      "Keberlanjutan telah bergeser dari wacana menjadi tuntutan operasional: pelanggan menanyakan jejak karbon, investor meminta laporan keberlanjutan, dan regulasi mengarah pada kewajiban pengungkapan. Organisasi membutuhkan personel yang memahami cara menerjemahkan agenda besar ini menjadi program kerja nyata.",
      "Pelatihan Sustainability Officer membekali Anda dengan kerangka kerja keberlanjutan yang aplikatif: pemetaan isu material dan pemangku kepentingan, keterkaitan dengan SDGs, dasar pengukuran jejak karbon organisasi, perancangan program efisiensi energi-air-limbah, hingga dasar pelaporan keberlanjutan yang kredibel.",
    ],
    careerNote:
      "Sustainability officer adalah profesi yang tumbuh cepat seiring kewajiban pelaporan keberlanjutan meluas — peluang bagi profesional HSE, lingkungan, dan laboratorium untuk naik ke peran strategis.",
    audience: [
      "Staf HSE & Lingkungan",
      "Tim CSR & Sustainability",
      "Manajemen fasilitas & operasional",
      "Profesional yang beralih ke bidang keberlanjutan",
    ],
    syllabus: [
      {
        title: "Hari 1 — Kerangka Keberlanjutan",
        points: [
          "Konsep keberlanjutan & tren global-nasional",
          "SDGs dan relevansinya bagi organisasi",
          "Pemetaan isu material & pemangku kepentingan",
          "Dasar pengukuran jejak karbon organisasi",
        ],
      },
      {
        title: "Hari 2 — Program & Pelaporan",
        points: [
          "Program efisiensi energi, air & pengelolaan limbah",
          "Integrasi keberlanjutan dengan sistem manajemen yang ada",
          "Dasar pelaporan keberlanjutan",
          "Menyusun roadmap keberlanjutan organisasi",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Apa bedanya pelatihan ini dengan ESG Officer?",
        answer:
          "Pelatihan Sustainability berfokus pada program operasional keberlanjutan (lingkungan, sumber daya, pelaporan), sedangkan ESG Officer menekankan kerangka penilaian Environmental-Social-Governance dari sisi investor dan kepatuhan. Keduanya saling melengkapi.",
      },
      ...standardFaqs("Sustainability Officer", "Rp 1.750.000"),
    ],
    keywords: ["pelatihan sustainability officer", "petugas keberlanjutan"],
    seoTitle: "Pelatihan Sustainability Officer 2026 — 24 JP",
    seoDescription:
      "Daftar pelatihan Sustainability Officer online. Rp 1.750.000, sertifikat 24 JP, rekaman & materi. Bayar langsung via QRIS/VA!",
    related: ["esg-officer", "iso-14001-officer", "laboratory-hse-officer-k3l"],
    batches: [
      { id: "sus-2026-10", startDate: "2026-10-28", endDate: "2026-10-29", mode: "Online" },
    ],
  },
  {
    slug: "esg-officer",
    title: "ESG Officer",
    subtitle: "Petugas Environmental, Social & Governance",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: 1_750_000,
    excerpt:
      "Kuasai kerangka ESG: pilar lingkungan-sosial-tata kelola, manajemen risiko ESG, rating & disclosure, serta penyusunan inisiatif ESG organisasi.",
    description: [
      "ESG (Environmental, Social, Governance) kini menjadi bahasa standar penilaian keberlanjutan perusahaan oleh investor, perbankan, dan rantai pasok global. Perusahaan yang tidak mampu menunjukkan kinerja ESG berisiko kehilangan akses pembiayaan dan pasar.",
      "Pelatihan ESG Officer memperkenalkan kerangka ESG secara menyeluruh: tiga pilar dan indikatornya, lanskap regulasi dan standar pengungkapan, manajemen risiko ESG, mekanisme rating ESG, hingga langkah praktis menyusun inisiatif dan data ESG di organisasi Anda. Disampaikan dengan studi kasus perusahaan di Indonesia.",
    ],
    careerNote:
      "Permintaan talenta ESG tumbuh pesat di sektor keuangan, manufaktur, dan energi — sementara pasokan profesional yang memahami kerangka kerjanya masih terbatas. Ini saat tepat membangun kompetensi ESG.",
    audience: [
      "Profesional Sustainability & HSE",
      "Tim Corporate Secretary & Investor Relations",
      "Manajemen risiko & kepatuhan",
      "Profesional yang beralih ke bidang ESG",
    ],
    syllabus: [
      {
        title: "Hari 1 — Memahami Kerangka ESG",
        points: [
          "Evolusi ESG & dorongan pasar-regulasi",
          "Pilar E, S, G dan indikator kuncinya",
          "Lanskap standar pengungkapan & regulasi di Indonesia",
          "Manajemen risiko ESG",
        ],
      },
      {
        title: "Hari 2 — Implementasi ESG",
        points: [
          "Rating ESG & cara kerjanya",
          "Pengumpulan & pengelolaan data ESG",
          "Menyusun inisiatif ESG prioritas",
          "Komunikasi & pelaporan ESG",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Apakah pelatihan ini cocok untuk yang belum punya latar belakang keuangan?",
        answer:
          "Cocok. Materi dirancang untuk profesional lintas latar belakang — konsep keuangan dan tata kelola dijelaskan dari dasar dengan contoh konkret.",
      },
      ...standardFaqs("ESG Officer", "Rp 1.750.000"),
    ],
    keywords: ["pelatihan ESG", "ESG officer Indonesia"],
    seoTitle: "Pelatihan ESG Officer 2026 — e-Sertifikat 24 JP",
    seoDescription:
      "Daftar pelatihan ESG Officer online. Rp 1.750.000, sertifikat 24 JP, rekaman & materi. Bayar langsung via QRIS/VA. Kuota terbatas!",
    related: ["sustainability-officer", "iso-14001-officer", "quality-assurance-officer"],
    batches: [
      // Poster detail menulis 4–5 Nov; jadwal master menulis 5–6 Nov — konfirmasi sebelum publish final.
      {
        id: "esg-2026-11",
        startDate: "2026-11-04",
        endDate: "2026-11-05",
        mode: "Online",
        needsConfirmation: true,
      },
    ],
  },
  {
    slug: "food-safety-management",
    title: "Food Safety Management Officer",
    subtitle: "Petugas Manajemen Keamanan Pangan",
    type: "online",
    jp: 24,
    durationDays: 2,
    basePrice: 1_750_000,
    excerpt:
      "Kelola keamanan pangan secara sistematis: prasyarat dasar (GMP/SSOP), HACCP, kerangka ISO 22000, dan kepatuhan regulasi keamanan pangan.",
    description: [
      "Keamanan pangan adalah harga mati bagi industri makanan dan minuman — satu insiden kontaminasi dapat menghancurkan merek yang dibangun bertahun-tahun. Pengelolaannya menuntut sistem yang berlapis: dari program prasyarat dasar hingga analisis bahaya yang sistematis.",
      "Pelatihan ini membekali Anda dengan kerangka manajemen keamanan pangan modern: program prasyarat (GMP, SSOP), prinsip-prinsip HACCP dan penyusunan rencana HACCP, pengantar ISO 22000/FSSC 22000, regulasi keamanan pangan di Indonesia, hingga budaya keamanan pangan di organisasi.",
    ],
    careerNote:
      "Industri pangan wajib memiliki personel yang memahami keamanan pangan. Kompetensi ini relevan untuk peran QA/QC pangan, supervisor produksi, hingga tim sertifikasi HACCP/ISO 22000.",
    audience: [
      "Staf QA/QC Industri Pangan",
      "Supervisor Produksi Pangan",
      "Tim HACCP & ISO 22000",
      "Pelaku usaha pangan & UMKM naik kelas",
    ],
    syllabus: [
      {
        title: "Hari 1 — Fondasi Keamanan Pangan",
        points: [
          "Bahaya keamanan pangan: biologis, kimia, fisik, alergen",
          "Program prasyarat: GMP & SSOP",
          "Regulasi keamanan pangan di Indonesia",
          "Budaya keamanan pangan",
        ],
      },
      {
        title: "Hari 2 — HACCP & Sistem Manajemen",
        points: [
          "12 langkah & 7 prinsip HACCP",
          "Latihan menyusun analisis bahaya & CCP",
          "Pengantar ISO 22000 / FSSC 22000",
          "Verifikasi, validasi & perbaikan sistem",
        ],
      },
    ],
    benefits: ONLINE_BENEFITS,
    faqs: [
      {
        question: "Apakah pelatihan ini setara dengan sertifikasi HACCP?",
        answer:
          "Pelatihan ini memberikan pemahaman menyeluruh termasuk HACCP dengan e-sertifikat pelatihan 24 JP. Untuk sertifikasi kompetensi, sertifikat pelatihan ini menjadi syarat jalur lanjutannya.",
      },
      ...standardFaqs("Food Safety", "Rp 1.750.000"),
    ],
    keywords: ["pelatihan keamanan pangan", "food safety management officer", "HACCP"],
    seoTitle: "Pelatihan Keamanan Pangan 2026 — 24 JP",
    seoDescription:
      "Daftar pelatihan Food Safety Management online. Rp 1.750.000, sertifikat 24 JP, materi HACCP & GMP. Bayar via QRIS/VA!",
    related: ["uji-sensori-pangan", "regulatory-affairs-officer", "qc-laboratory-analyst"],
    batches: [
      { id: "fsm-2026-11", startDate: "2026-11-19", endDate: "2026-11-20", mode: "Online" },
    ],
  },
  {
    slug: "ketidakpastian-pengukuran",
    title: "Ketidakpastian Pengukuran",
    subtitle: "Estimasi Measurement Uncertainty untuk Laboratorium",
    type: "online",
    jp: null,
    durationDays: 3,
    basePrice: null,
    excerpt:
      "Kuasai estimasi ketidakpastian pengukuran langkah demi langkah: identifikasi sumber, budget ketidakpastian, hingga pelaporan sesuai ISO/IEC 17025.",
    description: [
      "Setiap hasil pengukuran memiliki keraguan — dan ISO/IEC 17025 mewajibkan laboratorium mengevaluasi serta melaporkannya secara ilmiah. Estimasi ketidakpastian pengukuran sering menjadi momok karena melibatkan statistik, padahal dengan kerangka yang benar ia dapat dikerjakan secara sistematis oleh setiap analis.",
      "Pelatihan intensif 3 hari ini membimbing Anda langkah demi langkah: konsep dasar dan terminologi, identifikasi sumber ketidakpastian dengan diagram tulang ikan, evaluasi tipe A dan tipe B, penyusunan budget ketidakpastian, ketidakpastian gabungan dan bentangan, hingga pelaporan pada sertifikat hasil uji. Dilengkapi latihan perhitungan kasus nyata dari laboratorium pengujian dan kalibrasi.",
    ],
    careerNote:
      "Kemampuan menyusun estimasi ketidakpastian adalah kompetensi teknis bernilai tinggi yang membedakan analis senior — dan selalu menjadi sorotan saat asesmen akreditasi.",
    audience: [
      "Analis & Penyelia Laboratorium Pengujian",
      "Personel Laboratorium Kalibrasi",
      "Manajer Teknis",
    ],
    syllabus: [
      {
        title: "Hari 1 — Konsep Dasar",
        points: [
          "Terminologi: kesalahan, presisi, akurasi, ketidakpastian",
          "Persyaratan ketidakpastian dalam ISO/IEC 17025",
          "Identifikasi sumber ketidakpastian (diagram tulang ikan)",
        ],
      },
      {
        title: "Hari 2 — Evaluasi & Perhitungan",
        points: [
          "Evaluasi tipe A: statistik pengukuran berulang",
          "Evaluasi tipe B: sertifikat, spesifikasi, resolusi",
          "Menyusun budget ketidakpastian",
        ],
      },
      {
        title: "Hari 3 — Penggabungan & Pelaporan",
        points: [
          "Ketidakpastian gabungan & faktor cakupan",
          "Latihan kasus laboratorium pengujian dan kalibrasi",
          "Pelaporan ketidakpastian pada sertifikat hasil",
        ],
      },
    ],
    benefits: [
      "Pelatihan intensif 3 hari via Zoom",
      "Template spreadsheet budget ketidakpastian",
      "Soft copy materi & rekaman pelatihan",
      "e-Sertifikat pelatihan",
    ],
    faqs: [
      {
        question: "Berapa biaya pelatihan Ketidakpastian Pengukuran?",
        answer:
          "Biaya batch terbaru diinformasikan melalui admin. Hubungi admin via WhatsApp untuk penawaran dan ketersediaan kursi.",
      },
      {
        question: "Apakah perlu kemampuan statistik tingkat lanjut?",
        answer:
          "Tidak. Statistik yang dibutuhkan diajarkan dari dasar dan seluruh perhitungan dilatihkan menggunakan spreadsheet dengan template yang disediakan.",
      },
      {
        question: "Bagaimana jika saya berhalangan hadir di salah satu sesi?",
        answer:
          "Seluruh sesi direkam. Peserta yang berhalangan tetap mendapatkan rekaman lengkap, soft copy materi, dan e-sertifikat.",
      },
      {
        question: "Apakah contoh kasusnya mencakup laboratorium kalibrasi?",
        answer:
          "Ya. Latihan mencakup kasus laboratorium pengujian (kimia/mikrobiologi) dan laboratorium kalibrasi.",
      },
    ],
    keywords: ["pelatihan ketidakpastian pengukuran", "measurement uncertainty"],
    seoTitle: "Pelatihan Ketidakpastian Pengukuran 2026",
    seoDescription:
      "Pelatihan estimasi ketidakpastian pengukuran 3 hari online, 26–28 Nov 2026. Template budget ketidakpastian & rekaman. Daftar sekarang!",
    related: ["iso-17025-quality-system-officer", "jaminan-mutu", "qc-laboratory-analyst"],
    batches: [
      { id: "mu-2026-11", startDate: "2026-11-26", endDate: "2026-11-28", mode: "Online" },
    ],
  },
  {
    slug: "uji-sensori-pangan",
    title: "Panelis Terlatih Pengujian Sensori Pangan",
    subtitle: "Workshop Offline dengan Praktik Langsung",
    type: "offline",
    jp: null,
    durationDays: 2,
    basePrice: null,
    tieredPrices: [
      { label: "Mahasiswa", price: 1_300_000 },
      { label: "Umum", price: 1_500_000 },
    ],
    priority: true,
    excerpt:
      "Workshop tatap muka di Semarang: jadilah panelis terlatih pengujian sensori pangan dengan praktik uji diskriminatif, deskriptif, dan afektif — bonus sertifikasi kompetensi.",
    description: [
      "Pengujian sensori adalah metode evaluasi mutu pangan menggunakan indra manusia — dan keandalannya bergantung sepenuhnya pada kualitas panelisnya. Panelis terlatih dibutuhkan industri pangan untuk pengembangan produk, kontrol mutu, dan riset preferensi konsumen.",
      "Workshop offline ini dirancang dengan porsi praktik besar: Anda akan langsung melakukan uji ambang rangsangan, uji diskriminatif (segitiga, duo-trio), uji deskriptif, dan uji afektif menggunakan sampel nyata di laboratorium sensori. Fasilitator membimbing teknik penyajian sampel, pengendalian bias, hingga analisis data hasil uji.",
      "Sebagai paket lengkap, peserta mendapatkan bonus sertifikasi kompetensi, training kit, konsumsi, dan konsultasi pasca pelatihan — menjadikannya investasi paling efisien untuk membangun kompetensi sensori.",
    ],
    careerNote:
      "Panelis terlatih bersertifikat dibutuhkan industri pangan, lembaga riset, dan laboratorium pengujian sensori — kompetensi praktis yang langsung dapat dipakai di tempat kerja maupun penelitian.",
    audience: [
      "Staf QC/R&D Industri Pangan",
      "Mahasiswa Teknologi Pangan & Gizi",
      "Dosen & Peneliti",
      "Pelaku usaha kuliner & UMKM pangan",
    ],
    syllabus: [
      {
        title: "Hari 1 — Dasar Sensori & Uji Diskriminatif",
        points: [
          "Prinsip evaluasi sensori & fisiologi indra",
          "Persyaratan panelis & pengendalian bias",
          "Praktik uji ambang rangsangan",
          "Praktik uji diskriminatif: segitiga & duo-trio",
        ],
      },
      {
        title: "Hari 2 — Uji Deskriptif, Afektif & Analisis Data",
        points: [
          "Praktik uji deskriptif & pembentukan atribut",
          "Praktik uji afektif (hedonik)",
          "Analisis data hasil uji sensori",
          "Asesmen & sertifikasi kompetensi panelis",
        ],
      },
    ],
    benefits: OFFLINE_BENEFITS,
    faqs: [
      {
        question: "Di mana lokasi pelaksanaan workshop?",
        answer:
          "Workshop dilaksanakan tatap muka di Semarang. Detail venue dikirimkan ke peserta terdaftar sebelum hari pelaksanaan.",
      },
      {
        question: "Mengapa harga mahasiswa berbeda?",
        answer:
          "Kami menyediakan harga khusus mahasiswa (Rp 1.300.000, dengan bukti kartu mahasiswa aktif) untuk mendukung pengembangan kompetensi sejak bangku kuliah. Harga umum Rp 1.500.000.",
      },
      {
        question: "Apa yang membedakan workshop ini dari pelatihan online?",
        answer:
          "Pengujian sensori menuntut praktik langsung dengan sampel nyata — sesuatu yang tidak tergantikan secara online. Workshop ini juga sudah termasuk bonus sertifikasi kompetensi, training kit, dan konsumsi.",
      },
      {
        question: "Apakah saya mendapatkan sertifikat?",
        answer:
          "Ya. Peserta mendapatkan sertifikat pelatihan dan bonus sertifikasi kompetensi panelis setelah menyelesaikan seluruh rangkaian workshop dan asesmen.",
      },
      {
        question: "Bagaimana cara membayar biaya workshop?",
        answer:
          "Pembayaran dilakukan langsung di website via QRIS, virtual account, e-wallet, atau kartu — pilih kategori harga (mahasiswa/umum) saat checkout.",
      },
    ],
    keywords: [
      "pelatihan uji sensori pangan",
      "panelis terlatih",
      "pengujian sensori Semarang",
    ],
    seoTitle: "Pelatihan Uji Sensori Pangan Semarang 2026",
    seoDescription:
      "Workshop panelis terlatih uji sensori pangan di Semarang. Mahasiswa Rp 1.300.000, umum Rp 1.500.000, bonus sertifikasi kompetensi!",
    related: ["food-safety-management", "qc-laboratory-analyst", "research-development-officer"],
    batches: [
      {
        id: "sens-2026-11",
        startDate: "2026-11-18",
        endDate: "2026-11-19",
        mode: "Offline",
        location: "Semarang",
      },
      {
        id: "sens-2026-12",
        startDate: "2026-12-16",
        endDate: "2026-12-17",
        mode: "Offline",
        location: "Semarang",
      },
    ],
  },
];

# 🏗️ BLUEPRINT — mutululusan.id
### Planning & Architecture: Platform Penjualan Pelatihan & Sertifikasi Kompetensi Laboratorium

> Versi 1.0 — 11 Juni 2026
> Fokus utama: **Konversi pembayaran (CTA-driven)** + **SEO maksimal**
> Sumber data produk: 16 poster Pelatihan Labnesia 2026

---

## 1. Ringkasan Proyek

| Item | Detail |
|---|---|
| Nama domain | `mutululusan.id` |
| Model bisnis | Menjual pelatihan & sertifikasi kompetensi bidang laboratorium (online via Zoom, hybrid, dan offline) |
| Target market | Kepala/Manajer Lab, Pranata Lab, QA/QC, Teknisi & Analis Lab, Staf R&D, HSE Officer, Mahasiswa & Fresh Graduate |
| Harga produk | Mayoritas Rp 1.750.000 (pelatihan online 2 hari, 24 JP) |
| Tujuan website | (1) Pengunjung dari Google → (2) halaman program → (3) bayar langsung di website |
| North-star metric | Jumlah transaksi pembayaran sukses per bulan |

**Value proposition (untuk copywriting):**
"Pelatihan & sertifikasi kompetensi laboratorium bersertifikat 24 JP — daftar online, bayar langsung, langsung dapat akses."

---

## 2. Katalog Produk (Hasil Ekstraksi 16 Poster)

### 2.1 Daftar Program & Jadwal 2026

| # | Program | Jadwal 2026 | Format | Harga |
|---|---|---|---|---|
| 1 | Laboratory Quality System Officer ISO/IEC 17025 | 22–23 Jun | Online | Rp 1.750.000 |
| 2 | Lead Implementer Standar Laboratorium ISO 17025 *(Pelatihan & Sertifikasi)* | 24–26 Jun · 15–17 Jul · 26–28 Agu · 23–25 Sep · 23–25 Nov · 9–11 Des | Hybrid | *konfirmasi* |
| 3 | Laboratory HSE Officer (Petugas K3L Laboratorium) | 3–4 Jul* · 2–3 Des | Online | Rp 1.750.000 |
| 4 | GLP Laboratory Technician | 23–24 Jul · 16–17 Sep | Online | Rp 1.750.000 |
| 5 | Jaminan Mutu | 30–31 Jul | Online | *konfirmasi* |
| 6 | QC Laboratory Analyst | 5–6 Agu | Online | Rp 1.750.000 |
| 7 | Laboratory Operations Officer (Pranata Laboratorium) | 12–13 Agu | Online | Rp 1.750.000 |
| 8 | Research and Development Officer | 19–20 Agu | Online | Rp 1.750.000 |
| 9 | Quality Assurance Officer | 2–3 Sep | Online | Rp 1.750.000 |
| 10 | Quality Management System (ISO 9001) Officer | 9–10 Sep | Online | Rp 1.750.000 |
| 11 | Regulatory Affairs Officer | 7–8 Okt | Online | Rp 1.750.000 |
| 12 | Environmental Management System (ISO 14001) Officer | 14–15 Okt | Online | Rp 1.750.000 |
| 13 | Auditor Internal Standar Laboratorium ISO 17025 *(Pelatihan & Sertifikasi)* | 21–23 Okt | Hybrid | *konfirmasi* |
| 14 | Sustainability Officer | 28–29 Okt | Online | Rp 1.750.000 |
| 15 | ESG Officer | 4–5 Nov* | Online | Rp 1.750.000 |
| 16 | Food Safety Management Officer | 19–20 Nov | Online | Rp 1.750.000 |
| 17 | Ketidakpastian Pengukuran | 26–28 Nov | Online | *konfirmasi* |
| 18 | Panelis Terlatih Pengujian Sensori Pangan | 18–19 Nov (Semarang) · 16–17 Des | Offline | Mahasiswa Rp 1.300.000 / Umum Rp 1.500.000 |

> *⚠️ Ditemukan selisih tanggal antar-poster: HSE Juli tertulis "3–4 Jul" di poster detail tetapi "2–3 Jul" di jadwal master; ESG tertulis "4–5 Nov" di poster detail tetapi "5–6 Nov" di jadwal master. **Konfirmasi tanggal final sebelum publish.** Harga Lead Implementer, Auditor Internal, Jaminan Mutu & Ketidakpastian Pengukuran tidak tercantum di poster — wajib konfirmasi.*

### 2.2 Atribut Standar Semua Pelatihan Online

- Waktu: 09.00–16.00 WIB, via Zoom
- Benefit: **e-Sertifikat pelatihan 24 JP**, soft copy materi, rekaman pelatihan
- Sertifikat pelatihan menjadi syarat lanjut ke **Sertifikasi Kompetensi** → ini adalah hook upsell utama
- Workshop offline (sensori) tambah: training kit, souvenir, coffee break & makan siang, konsultasi pasca pelatihan, bonus sertifikasi kompetensi

### 2.3 Tipe Produk (untuk struktur database & checkout)

1. **Pelatihan Online** — 2 hari, harga tunggal
2. **Pelatihan & Sertifikasi Hybrid** — 3 hari, harga premium (upsell tier)
3. **Workshop Offline** — harga bertingkat (mahasiswa vs umum), ada lokasi fisik & kuota kursi

---

## 3. Arsitektur Informasi & Sitemap

```
mutululusan.id/
│
├── /                                  → Homepage (landing konversi)
├── /pelatihan/                        → Katalog semua program (filterable)
│   ├── /pelatihan/laboratory-hse-officer-k3l/
│   ├── /pelatihan/iso-17025-quality-system-officer/
│   ├── /pelatihan/lead-implementer-iso-17025/
│   ├── /pelatihan/glp-laboratory-technician/
│   ├── /pelatihan/qc-laboratory-analyst/
│   ├── /pelatihan/pranata-laboratorium/
│   ├── /pelatihan/research-development-officer/
│   ├── /pelatihan/quality-assurance-officer/
│   ├── /pelatihan/iso-9001-officer/
│   ├── /pelatihan/regulatory-affairs-officer/
│   ├── /pelatihan/iso-14001-officer/
│   ├── /pelatihan/auditor-internal-iso-17025/
│   ├── /pelatihan/sustainability-officer/
│   ├── /pelatihan/esg-officer/
│   ├── /pelatihan/food-safety-management/
│   ├── /pelatihan/ketidakpastian-pengukuran/
│   ├── /pelatihan/jaminan-mutu/
│   └── /pelatihan/uji-sensori-pangan/
│
├── /jadwal-pelatihan-2026/            → Kalender lengkap (SEO magnet + lead magnet PDF)
├── /sertifikasi-kompetensi/           → Penjelasan jalur sertifikasi (upsell page)
├── /in-house-training/                → Layanan B2B untuk instansi (form penawaran)
├── /blog/
│   └── /blog/[slug]/                  → Artikel SEO (content cluster)
├── /tentang-kami/
├── /faq/
├── /kontak/
│
├── /checkout/[orderId]/               → noindex
├── /pembayaran/sukses/                → noindex (halaman terima kasih + tracking purchase)
├── /pembayaran/pending/               → noindex
├── /konfirmasi-pembayaran/            → fallback transfer manual
│
├── /kebijakan-privasi/  /syarat-ketentuan/  /kebijakan-refund/
├── sitemap.xml  robots.txt
```

**Aturan URL (SEO):** lowercase, pakai tanda hubung, mengandung keyword, tanpa tanggal di slug program (agar URL evergreen — tanggal batch dikelola di dalam halaman, bukan di URL).

---

## 4. Anatomi Halaman & Strategi CTA Pembayaran

Prinsip: **setiap halaman publik harus punya jalur ≤ 3 klik menuju pembayaran.**

### 4.1 Homepage (urutan section)

1. **Hero** — H1 keyword utama + subheadline value prop + CTA primer `[Lihat Jadwal & Daftar]` + CTA sekunder `[Konsultasi via WhatsApp]`
2. **Trust bar** — jumlah alumni, instansi klien, "e-Sertifikat 24 JP", logo metode pembayaran
3. **Batch terdekat** — 3 kartu jadwal terdekat + countdown timer + tombol `[Daftar & Bayar]` langsung ke checkout
4. **Katalog ringkas** — grid 18 program (judul, tanggal, harga, CTA)
5. **Kenapa kami** — benefit (rekaman, materi, jalur sertifikasi kompetensi)
6. **Testimoni** (asli) + foto/screenshot
7. **FAQ singkat** (5 pertanyaan, accordion, ber-schema)
8. **CTA penutup** full-width + form lead magnet "Download Jadwal 2026 (PDF)"

### 4.2 Halaman Detail Program (template konversi — paling penting!)

**Above the fold (tanpa scroll):**
- H1: `Pelatihan {Nama Program} — {Subjudul Indonesia}`
- Badge: `Online via Zoom` · `e-Sertifikat 24 JP` · `Batch terdekat: {tanggal}`
- **Harga besar & jelas**: Rp 1.750.000
- **CTA primer**: `[Daftar & Bayar Sekarang]` (warna kontras, satu-satunya tombol solid di viewport)
- CTA sekunder: `[Tanya Admin via WA]` (outline)

**Body:**
- Pilihan batch (radio/selector: tanggal + sisa kursi)
- Silabus (accordion, dari poster)
- "Direkomendasikan untuk" (chip/badge target peserta)
- Benefit & contoh sertifikat
- Banner upsell: "Lanjutkan ke Sertifikasi Kompetensi" → link
- Testimoni terkait
- FAQ program (schema FAQPage)
- Program terkait (internal linking SEO)

**Elemen konversi wajib:**
- **Sticky CTA**: desktop = kartu harga melayang di sisi kanan; mobile = bottom bar tetap `[Daftar — Rp 1.750.000]` + ikon WA
- **Urgency jujur**: countdown ke tanggal batch, indikator "sisa X kursi" (dari data kuota asli — jangan dipalsukan)
- **Risk reversal**: jaminan rekaman jika berhalangan hadir, kebijakan reschedule
- Floating WhatsApp button di seluruh situs

### 4.3 Aturan CTA Global

| Aturan | Implementasi |
|---|---|
| 1 CTA primer per viewport | Tombol solid hanya satu; sisanya outline/teks |
| CTA muncul 3× per halaman | Atas (hero), tengah (setelah silabus), bawah (penutup) |
| Mobile-first | Bottom sticky bar di semua halaman program |
| Exit intent (desktop) | Popup lead magnet jadwal PDF → tangkap email/WA |
| Microcopy di bawah tombol | "Pembayaran aman via QRIS, VA, e-wallet & kartu" |

---

## 5. Arsitektur Pembayaran (Payment-First)

### 5.1 Funnel Checkout (target: < 2 menit selesai)

```
[Halaman Program]
   │  klik "Daftar & Bayar Sekarang"
   ▼
[Step 1 — Pilih Batch]      tanggal + sisa kursi
   ▼
[Step 2 — Data Peserta]     nama, email, no. WA, instansi,
   │                        jumlah peserta, kode promo (opsional)
   ▼
[Step 3 — Ringkasan]        total + pilih metode bayar
   ▼
[Midtrans Snap popup]       QRIS / VA semua bank / GoPay·OVO·Dana /
   │                        kartu kredit / paylater
   ├─ sukses → webhook → status PAID
   │           → /pembayaran/sukses + e-receipt email
   │           → WA otomatis: invoice + link grup peserta + info Zoom
   │           → reminder otomatis H-3 dan H-1
   └─ pending/expired → reminder WA + link bayar ulang (recovery)
```

### 5.2 Pilihan Payment Gateway (Indonesia)

| Gateway | Kelebihan | Catatan |
|---|---|---|
| **Midtrans Snap** ⭐ rekomendasi | Semua metode populer (QRIS, VA, e-wallet, kartu, paylater), Snap popup = integrasi cepat & PCI-compliant, dipercaya pasar | Fee per metode (cek midtrans.com — kisaran QRIS ±0,7%, kartu ±2,9%+Rp2.000; verifikasi terbaru) |
| Xendit | Invoice API bagus, recurring | Setara Midtrans |
| Tripay / Duitku | Fee lebih murah untuk UMKM | Brand awareness lebih rendah |
| Mayar.id | Khusus produk digital/kelas, ada landing page bawaan | Cocok jika ingin super cepat tanpa coding |

**Wajib ada juga (realita pasar B2B Indonesia):**
- **Transfer manual** + upload bukti + verifikasi admin (halaman `/konfirmasi-pembayaran/`)
- **Opsi "Daftar via Invoice Instansi"** — banyak peserta dibayari kantor; sediakan form yang menghasilkan invoice PDF + menunggu pembayaran VA/transfer korporat

### 5.3 Status Order

`pending` → `paid` → `confirmed` (masuk grup/Zoom) → `completed` | `expired` | `cancelled` | `refunded`

---

## 6. Strategi SEO (Maksimal)

### 6.1 Pemetaan Keyword → Halaman

| Halaman | Keyword utama | Keyword pendukung |
|---|---|---|
| Homepage | pelatihan laboratorium | pelatihan dan sertifikasi laboratorium, training laboratorium 2026 |
| ISO 17025 Officer | pelatihan ISO 17025 | training ISO/IEC 17025, petugas sistem mutu laboratorium |
| Lead Implementer | sertifikasi lead implementer ISO 17025 | pelatihan lead implementer laboratorium |
| HSE Officer | pelatihan K3 laboratorium | K3L laboratorium, HSE laboratorium, HIRADC |
| GLP Technician | pelatihan GLP | good laboratory practice, teknisi laboratorium GLP |
| QC Analyst | pelatihan analis laboratorium | training QC laboratorium, analis quality control |
| Pranata Lab | pelatihan pranata laboratorium | laboratory operations officer |
| R&D Officer | pelatihan R&D | research and development officer |
| QA Officer | pelatihan quality assurance | petugas QA laboratorium |
| ISO 9001 | pelatihan ISO 9001 | quality management system officer |
| Regulatory Affairs | pelatihan regulatory affairs | petugas regulasi, registrasi produk |
| ISO 14001 | pelatihan ISO 14001 | environmental management system |
| Auditor Internal | pelatihan auditor internal ISO 17025 | audit internal laboratorium |
| Sustainability | pelatihan sustainability officer | petugas keberlanjutan |
| ESG | pelatihan ESG | ESG officer Indonesia |
| Food Safety | pelatihan keamanan pangan | food safety management officer |
| Ketidakpastian | pelatihan ketidakpastian pengukuran | measurement uncertainty |
| Sensori | pelatihan uji sensori pangan | panelis terlatih, pengujian sensori Semarang |
| Jadwal | jadwal pelatihan laboratorium 2026 | kalender training laboratorium |
| Sertifikasi | sertifikasi kompetensi laboratorium | — |

### 6.2 On-Page SEO (checklist per halaman)

- [ ] 1 H1 = keyword utama; hierarki H2/H3 rapi
- [ ] Title tag ≤ 60 karakter, pola: `Pelatihan {Program} 2026 — e-Sertifikat 24 JP | mutululusan.id`
- [ ] Meta description ≤ 155 karakter, mengandung harga + CTA: `Daftar pelatihan {program} online. Rp 1.750.000, sertifikat 24 JP, rekaman & materi. Bayar langsung via QRIS/VA. Kuota terbatas!`
- [ ] Alt text semua gambar (deskriptif + keyword natural)
- [ ] Internal linking: setiap halaman program → 3 program terkait + halaman jadwal + halaman sertifikasi
- [ ] Konten unik ≥ 800 kata per halaman program (silabus + penjelasan manfaat karier + FAQ) — **jangan hanya menyalin teks poster**, tulis ulang dan perkaya
- [ ] FAQ 5–8 pertanyaan per program

### 6.3 Technical SEO

- **Rendering**: SSG/ISR (Next.js) — HTML penuh terindeks, bukan client-side render
- **Core Web Vitals**: LCP < 2,5 dtk · INP < 200 ms · CLS < 0,1 (gambar WebP/AVIF + lazy load, font lokal `next/font`)
- Mobile-first, HTTPS, canonical tag
- `noindex` untuk /checkout, /pembayaran/*, halaman pencarian internal
- `sitemap.xml` otomatis + submit Google Search Console
- Breadcrumb (UI + schema)

### 6.4 Structured Data (JSON-LD) — pembeda di SERP

Pasang per halaman program: `Course` + `CourseInstance` (per batch), `FAQPage`, `BreadcrumbList`. Tambahan: `Organization` (sitewide), `Event` untuk workshop offline Semarang, `AggregateRating` hanya jika ulasan asli.

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Pelatihan Laboratory HSE Officer (Petugas K3L Laboratorium)",
  "description": "Pelatihan online 2 hari: HIRADC, pengelolaan bahan kimia, limbah B3, tanggap darurat, dan inspeksi K3 laboratorium. e-Sertifikat 24 JP.",
  "provider": { "@type": "Organization", "name": "mutululusan.id", "url": "https://mutululusan.id" },
  "offers": {
    "@type": "Offer",
    "price": "1750000",
    "priceCurrency": "IDR",
    "availability": "https://schema.org/InStock",
    "url": "https://mutululusan.id/pelatihan/laboratory-hse-officer-k3l/"
  },
  "hasCourseInstance": [{
    "@type": "CourseInstance",
    "courseMode": "Online",
    "startDate": "2026-12-02",
    "endDate": "2026-12-03",
    "location": { "@type": "VirtualLocation", "url": "https://mutululusan.id/pelatihan/laboratory-hse-officer-k3l/" }
  }]
}
```

### 6.5 Content Strategy (Blog — mesin trafik organik)

**Pillar page:** "Panduan Lengkap Sertifikasi Kompetensi Laboratorium di Indonesia"

**Cluster artikel (2–4 artikel/bulan), tiap artikel ber-CTA ke halaman jual terkait:**
1. Apa Itu ISO/IEC 17025 dan Mengapa Laboratorium Wajib Memahaminya
2. Perbedaan ISO 9001, ISO 14001, dan ISO 17025
3. HIRADC: Cara Identifikasi Bahaya & Penilaian Risiko di Laboratorium
4. Panduan Pengelolaan Limbah B3 Laboratorium
5. Prinsip ALCOA dalam Pencatatan Data Laboratorium (GLP)
6. Cara Menjadi Analis Laboratorium Bersertifikat
7. Apa Itu JP (Jam Pelajaran) dalam Sertifikat Pelatihan?
8. Ketidakpastian Pengukuran: Konsep Dasar untuk Analis
9. Karier QA vs QC di Laboratorium: Apa Bedanya?
10. Uji Sensori Pangan: Jenis Pengujian & Cara Menjadi Panelis Terlatih
11. ESG & Sustainability Officer: Profesi yang Naik Daun
12. Checklist Persiapan Audit Internal ISO 17025

### 6.6 Off-Page & Pengukuran

- Google Business Profile (lokasi Semarang untuk workshop offline → SEO lokal "pelatihan sensori pangan Semarang")
- Backlink: kerja sama kampus (MIPA/farmasi/teknologi pangan), asosiasi laboratorium, direktori pelatihan
- **Tracking**: GA4 (ecommerce events: `view_item`, `begin_checkout`, `add_payment_info`, `purchase`), Meta Pixel, event klik WA, Google Search Console

---

## 7. Rekomendasi Tech Stack

### Opsi A — Performa & SEO Maksimal ⭐ (rekomendasi, cocok dikerjakan via Claude Code)

| Layer | Pilihan |
|---|---|
| Framework | **Next.js 15** (App Router, SSG/ISR) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Konten | MDX/file-based dulu (18 program) → CMS (Payload/Sanity) saat butuh admin non-teknis |
| Database | PostgreSQL (Supabase / Neon) + Prisma |
| Pembayaran | Midtrans Snap + webhook handler |
| Notifikasi | Resend (email) + Fonnte/Wablas (WhatsApp API) |
| Hosting | Vercel + Cloudflare DNS |
| Analytics | GA4 + Search Console + Meta Pixel |

### Opsi B — Rilis Tercepat (low-code)

WordPress + WooCommerce + plugin Midtrans + Rank Math SEO. Kelebihan: live dalam hitungan hari, admin mudah. Kekurangan: performa & Core Web Vitals lebih sulit dioptimalkan, maintenance plugin.

---

## 8. Skema Data (ringkas)

```
programs      (id, slug, title, subtitle, description, syllabus_json,
               audience_json, base_price, type[online|hybrid|offline],
               jp, seo_title, seo_description, og_image)

batches       (id, program_id, start_date, end_date, mode, location,
               quota, seats_taken, price_override, status[open|closed|done])

orders        (id, order_number, batch_id, buyer_name, email, whatsapp,
               institution, qty, subtotal, discount, total,
               status[pending|paid|confirmed|completed|expired|cancelled|refunded],
               payment_channel, gateway_token, created_at)

participants  (id, order_id, name, email, whatsapp, job_title)

payments      (id, order_id, gateway, gateway_ref, amount, status,
               paid_at, raw_webhook_json)

coupons       (id, code, type[percent|fixed], value, valid_until,
               max_use, used_count)

leads         (id, name, whatsapp, email, source, program_interest, created_at)

posts         (id, slug, title, excerpt, content_mdx, category,
               seo_title, seo_description, published_at)
```

---

## 9. Roadmap Implementasi

| Fase | Durasi | Deliverable |
|---|---|---|
| **1 — MVP Konversi** | Minggu 1–2 | Homepage, 5 halaman program prioritas (ISO 17025, HSE, GLP, QC Analyst, Sensori), checkout Midtrans (sandbox→production), WA CTA, halaman jadwal |
| **2 — SEO Foundation** | Minggu 3–4 | Semua 18 halaman program, schema JSON-LD, sitemap, submit GSC, halaman sertifikasi & in-house, GA4 ecommerce |
| **3 — Otomasi & Recovery** | Minggu 5–6 | Email/WA otomatis (invoice, reminder H-3/H-1, recovery pending payment), kupon early bird, dashboard admin sederhana, invoice instansi |
| **4 — Growth (berkelanjutan)** | Bulan 2+ | 2–4 artikel blog/bulan, A/B test CTA & harga anchor, retargeting ads, testimoni & rating |

---

## 10. KPI & Target

| Metrik | Target awal |
|---|---|
| Conversion rate (kunjungan → bayar) | 2–5% |
| Checkout abandonment | < 60% (recovery via WA) |
| Trafik organik | +30% MoM setelah bulan ke-3 |
| Halaman program di top-10 Google | ≥ 8 keyword dalam 6 bulan |
| Waktu checkout | < 2 menit |

---

## 11. ⚠️ Catatan Legal & Brand (penting sebelum live)

1. **Hak jual produk**: Poster bersumber dari **Labnesia / Padma Global Nusatama**. Pastikan ada perjanjian kemitraan, reseller, atau afiliasi resmi sebelum menjual program mereka di mutululusan.id — atau bangun program serupa atas nama sendiri.
2. **Klaim akreditasi**: "Terakreditasi KAN ISO/IEC 17025" adalah klaim milik penyelenggara asal. Jangan dicantumkan di mutululusan.id kecuali secara hukum berlaku untuk entitas Anda — salah klaim akreditasi berisiko hukum & reputasi.
3. **Aset visual**: Jangan unggah ulang poster mentah; buat desain & copywriting sendiri sesuai brand mutululusan.id.
4. **Wajib ada**: Syarat & Ketentuan, Kebijakan Privasi, Kebijakan Refund/Reschedule yang jelas (juga meningkatkan trust → konversi).
5. **Urgency jujur**: countdown & sisa kursi harus dari data nyata.

---

*Blueprint ini siap dipakai sebagai spesifikasi awal di Claude Code: mulai dari Fase 1 (scaffold Next.js + 5 halaman prioritas + integrasi Midtrans sandbox).*

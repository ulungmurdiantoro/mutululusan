# Blueprint Redesign — mutululusan.id (Homepage & Katalog Program)

> Dokumen ini adalah spesifikasi teknis untuk dieksekusi via Claude Code.
> Referensi: review UI/UX mutululusan.id, Juli 2026.
> Scope: struktur halaman, komponen, state, dan prioritas implementasi — bukan visual design final.

---

## 1. Tujuan

Menyederhanakan homepage yang saat ini terlalu padat (10+ section berurutan, 21 kartu program penuh di landing page), merapikan jalur CTA/WhatsApp yang bercabang ke 5+ nomor, dan menambahkan filter katalog — tanpa mengubah identitas konten/copy yang sudah ada.

## 2. Non-Goals

- Tidak mengubah copywriting/isi konten kecuali disebutkan eksplisit.
- Tidak mengubah skema pembayaran/checkout.
- Tidak mengganti brand/warna kecuali disebutkan.

---

## 3. Struktur Informasi (Sitemap Baru)

```
/                       → Homepage RINGKAS (ringkasan tiap section + link "Lihat semua")
/pelatihan              → Katalog penuh 21 program + FILTER
/pelatihan/[slug]       → Detail program (sudah ada, tidak diubah di blueprint ini)
/tentang-kami           → (sudah ada)
/kemitraan              → BARU (opsional) — detail skema In-House & Partnership, terpisah dari homepage
/faq                    → BARU (opsional) — pindahkan FAQ panjang ke sini, homepage cukup 3-4 pertanyaan teratas
```

**Perubahan utama:** homepage TIDAK lagi menampung seluruh 21 kartu program. Homepage hanya menampilkan 4-6 program unggulan (1-2 per kategori) + CTA "Lihat semua program →" menuju `/pelatihan`.

---

## 4. Struktur Komponen Homepage (Urutan Baru)

Urutan section dipertahankan, tapi setiap section wajib punya varian "ringkas":

1. `<HeroSection>` — headline + 4 value props (tidak berubah)
2. `<EcosystemStrip>` — 3 ekosistem, versi ringkas 1 baris/kartu (bukan paragraf penuh)
3. `<InstitutionalValueProps>` — IKU 2/3, SKPI, IKU 9 → tampilkan sebagai 3 kartu ringkas + link "Pelajari lebih lanjut" ke `/kemitraan`
4. `<ServiceSchemeTabs>` — 3 skema layanan (Individual / In-House / Partnership) sebagai TAB, bukan 3 blok vertikal panjang
5. `<FeaturedPrograms>` — MAX 6 kartu program (bukan 21), tombol "Lihat Semua 21 Program →" ke `/pelatihan`
6. `<WhyUs>` — gabungkan dengan bagian "career accelerator" yang sebelumnya redundan menjadi SATU section (hapus duplikasi klaim mentoring/praktisi/sertifikasi)
7. `<FAQPreview>` — tampilkan 4 pertanyaan teratas saja + link "Lihat semua FAQ →" ke `/faq`
8. `<FinalCTA>` — satu CTA utama (lihat §6)

---

## 5. Komponen Katalog (`/pelatihan`)

### 5.1 Filter Bar (BARU)
```
<CatalogFilterBar>
  - kategori: chip multi-select
      [ Semua ] [ Management & Governance ] [ Sustainability & ESG ]
      [ Laboratory & Testing ] [ Industrial Engineering & Lifting ]
  - format: toggle
      [ Semua ] [ Online ] [ Offline ]
  - harga: toggle
      [ Semua ] [ Ada harga tetap ] [ Custom pricing ]
  - search box: cari nama program (client-side filter, debounce 300ms)
</CatalogFilterBar>
```
State: simpan filter aktif di URL query params (`?kategori=laboratory&format=online`) agar shareable/bookmarkable.

### 5.2 Kartu Program — perbaikan badge harga
```
<ProgramCard>
  - badge format: Online | Offline
  - badge JP: "24 JP"
  - price:
      IF harga tetap → tampilkan "Rp 1.750.000" (style normal, bold)
      IF custom → tampilkan badge "Custom Pricing" dengan style AKSEN
        (background warna brand, bukan teks abu-abu polos — supaya tidak terkesan "data kosong")
  - CTA: "Daftar & Bayar" atau "Hubungi Admin" (label CTA menyesuaikan tipe harga)
</ProgramCard>
```

### 5.3 Loading & Empty State
- Skeleton card (bukan spinner tunggal) saat data batch/jadwal dimuat.
- Empty state jika filter tidak menghasilkan program: tampilkan pesan + tombol "Reset filter".

---

## 6. Konsolidasi CTA / WhatsApp

**Masalah saat ini:** 5 nomor staf + 1 nomor umum tersebar di banyak section tanpa routing jelas.

**Solusi:**
```
<ContactRouter>
  Trigger utama: SATU tombol "Hubungi Kami" di navbar + FinalCTA
  → Membuka modal/drawer kecil dengan 3-4 pilihan kategori kebutuhan:
      [ Pelatihan Individual ]
      [ In-House / Fakultas ]
      [ Kemitraan Institusi ]
      [ Lainnya ]
  → Tiap pilihan baru mengarahkan ke nomor WA staf yang sesuai,
    dengan pesan pre-filled kontekstual (pertahankan copy pre-filled yang sudah ada).
</ContactRouter>
```
Section-section lain (per program, per skema layanan) tetap boleh punya CTA WA langsung, TAPI hanya ke satu nomor default per kategori — bukan mengekspos semua 5 nomor staf sekaligus di homepage.

---

## 7. Perbaikan Teknis Aset

| Item | Saat ini | Target |
|---|---|---|
| Logo | `.gif` | Konversi ke `.svg` (vector, ringan, tajam di semua resolusi) |
| Ikon panah CTA (`›`, `→`) | unicode dalam teks link | Ganti ke icon SVG/aria-hidden + `aria-label` deskriptif pada elemen link |
| Gambar konten | (cek alt text) | Tambahkan `alt` deskriptif pada semua `<img>` |
| Breadcrumb | tidak ada | Tambahkan komponen `<Breadcrumb>` di semua halaman non-homepage: `Beranda > Pelatihan > [Nama Program]` |

---

## 8. Aksesibilitas & Mobile

- Tap target minimum 44x44px untuk semua tombol CTA (khususnya "Daftar & Bayar" di kartu program pada mobile).
- Cek kontras warna badge "Custom Pricing" vs background (WCAG AA minimum 4.5:1).
- Uji screen reader pada CTA yang mengandung simbol panah — pastikan tidak dibacakan sebagai karakter mentah.
- Breakpoint mobile: hero 4 bullet points berubah dari horizontal → stacked vertikal di bawah 640px.

---

## 9. Prioritas Implementasi (Urutan Pengerjaan)

1. **P0 — Quick wins (low effort, high impact)**
   - Ganti logo GIF → SVG
   - Perbaiki badge "Custom Pricing" pada kartu program
   - Tambahkan `alt` text pada gambar utama
2. **P1 — Struktural**
   - Pisahkan katalog 21 program dari homepage → `/pelatihan`
   - Tambahkan `<FeaturedPrograms>` (6 kartu) di homepage
   - Tambahkan `<CatalogFilterBar>` di `/pelatihan`
3. **P2 — CTA & Navigasi**
   - Bangun `<ContactRouter>` modal untuk konsolidasi WA
   - Tambahkan `<Breadcrumb>` di semua halaman detail
4. **P3 — Polish**
   - Hilangkan duplikasi konten `<WhyUs>` vs career accelerator
   - Pindahkan FAQ panjang ke `/faq`, sisakan preview 4 item di homepage
   - Tambahkan skeleton loading state untuk data batch/jadwal dinamis

---

## 10. Catatan untuk Claude Code

- Framework tidak diasumsikan — sesuaikan dengan stack yang sudah dipakai situs saat ini (cek dulu apakah Next.js/WordPress/lainnya sebelum implementasi).
- Semua perubahan struktural (§4, §5, §6) sebaiknya dikerjakan sebagai komponen terpisah agar mudah di-review satu per satu, bukan satu PR besar.
- Pertahankan seluruh copy/teks yang sudah ada kecuali disebutkan berubah — blueprint ini soal struktur & UX, bukan rewrite konten.
- Setelah P0 dan P1 selesai, disarankan re-audit kecepatan load homepage (karena mengurangi jumlah section akan berdampak langsung ke performa).

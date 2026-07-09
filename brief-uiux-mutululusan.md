# Brief Redesign UI/UX — mutululusan.id (Halaman Utama & /pelatihan)

## Konteks Proyek
Website `mutululusan.id` adalah platform pelatihan & sertifikasi kompetensi laboratorium (ISO 17025, K3L, GLP, QC/QA, dll), menyasar mahasiswa, dosen/tendik, fresh graduate, dan institusi perguruan tinggi. Ada 21 program pelatihan dengan harga seragam (~Rp 1.750.000), sebagian besar online via Zoom dengan sertifikat 24 JP.

Tujuan redesign: meningkatkan **kredibilitas/trust**, **kejelasan informasi**, dan **konversi pendaftaran**, tanpa mengubah struktur konten inti.

---

## 1. Temuan Utama (Prioritas Tinggi)

### a. Trust & Kredibilitas
- Klaim "24 JP" ditampilkan sebagai badge di **setiap kartu program**, tapi tidak ada penjelasan siapa yang mengakui/menerbitkan pengakuan JP tersebut. Ini rawan disalahpahami calon peserta (terutama dosen yang butuh JP untuk kum).
- Tidak ada bukti sosial di halaman katalog: tidak ada testimoni, jumlah alumni, logo institusi mitra, atau rating.
- Badge "24 JP" tampil tidak konsisten — sebagian program punya badge ini, sebagian tidak (Ketidakpastian Pengukuran, Corporate Legal Officer, Lifting Engineer, dll tidak ada badge). Perlu direview apakah ini disengaja atau bug data.

### b. Konsistensi Harga & Informasi
- Sebagian besar program: Rp 1.750.000 flat.
- Sebagian lain: "Hubungi admin" (Jaminan Mutu, Ketidakpastian Pengukuran, Corporate Legal Officer, semua program Lifting).
- Harga seragam untuk program yang sangat berbeda kompleksitas (mis. ISO 17025 vs Regulatory Affairs Officer) bisa menimbulkan kesan "template pricing" yang menurunkan kepercayaan. Pertimbangkan diferensiasi harga atau penjelasan value per tingkat program.

### c. Struktur Informasi Kartu Program
Saat ini tiap kartu hanya memuat: mode (online/offline), badge JP, judul EN, subjudul ID, tanggal batch (kadang kosong), harga, CTA.
- Tidak ada indikator level (basic/intermediate/advanced), durasi jam pelatihan aktual, atau jumlah kursi tersisa — elemen ini biasa dipakai platform pelatihan untuk mendorong urgensi.
- Tidak ada filter/sorting selain tab Semua/Online/Offline. Dengan 21 program, pengguna butuh filter kategori (Management, Sustainability/ESG, Laboratory & Testing, Industrial Engineering).

---

## 2. Saran Perbaikan Per Halaman

### Halaman Utama (`/`)
1. **Hero section**: pastikan value proposition utama (siapa targetnya, apa hasil akhirnya — sertifikat + kompetensi terverifikasi) tampil dalam 3 detik pertama. Tambahkan CTA ganda: "Lihat Katalog Pelatihan" (primer) dan "Konsultasi via WhatsApp" (sekunder).
2. **Tambahkan bagian "Kenapa mutululusan.id"** dengan 3-4 poin diferensiasi konkret (uji kompetensi via LSP terakreditasi KAN, akses ke rekaman & materi seumur akses, harga transparan, dsb) — hindari klaim generik.
3. **Bagian trust signal**: logo institusi mitra (jika ada), jumlah alumni/peserta, atau badge akreditasi LSP Edukia dengan tautan verifikasi ke direktori KAN.
4. **Section kategori program** sebagai jembatan ke katalog — card besar per kategori (Management & Governance, Sustainability & ESG, Laboratory & Testing, Industrial Engineering) alih-alih daftar flat.
5. **FAQ ringkas di homepage** (3-4 pertanyaan paling umum) dengan link "Lihat FAQ lengkap".

### Halaman Katalog (`/pelatihan`)
1. **Filter kategori** sebagai tambahan dari filter mode (Online/Offline) yang sudah ada — dropdown atau chip: Management & Governance / Sustainability & ESG / Laboratory & Testing / Industrial Engineering.
2. **Search bar** sederhana di atas grid — dengan 21 program, pencarian nama program mempercepat navigasi.
3. **Standarisasi kartu program**:
   - Badge JP konsisten atau dihapus jika tidak berlaku untuk semua program, dengan tooltip/link kecil "Apa itu 24 JP?" yang menjelaskan dasar pengakuannya.
   - Tampilkan durasi (jam/hari) dan level program secara eksplisit.
   - Untuk yang "Hubungi admin", ganti label jadi lebih actionable, misal "Dapatkan Penawaran" dengan ikon WhatsApp langsung di kartu.
4. **Empty state untuk hasil filter kosong** — perlu didesain (pesan + CTA konsultasi).
5. **Sticky filter bar** saat scroll agar tetap mudah diakses di list panjang.
6. **Loading state / skeleton** untuk grid saat data dimuat (baik dari CMS/API).

---

## 3. Sistem Desain (Umum)

- **Tipografi**: pastikan hierarki jelas antara judul program (EN) dan subjudul (ID) — saat ini keduanya berpotensi bersaing secara visual. Pertimbangkan subjudul ID sebagai judul utama (lebih familiar untuk target lokal), dengan judul EN sebagai label sekunder/badge kecil.
- **Warna & badge**: badge "24 JP" dan mode (Online via Zoom/Offline) sebaiknya punya sistem warna berbeda agar mudah dipindai (scan) mata secara cepat saat membandingkan banyak kartu.
- **Konsistensi CTA**: "Lihat & Daftar" dipakai di semua kartu — pertimbangkan variasi CTA berdasarkan status (harga tersedia → "Daftar Sekarang", harga hubungi admin → "Tanya Harga").
- **Mobile-first**: dengan grid 21 kartu, pastikan breakpoint mobile menampilkan 1 kolom dengan card yang tidak terlalu tinggi (info penting di atas fold kartu).
- **Footer**: sudah cukup lengkap (legal, kontak, program populer) — pertahankan, tapi pastikan kontras teks footer memadai untuk aksesibilitas.

---

## 4. Rekomendasi Non-Visual (Perlu Diputuskan Sebelum Desain)

- Klarifikasi dan cantumkan sumber pengakuan resmi untuk sertifikat 24 JP (atau ganti narasi jika belum ada pengakuan formal).
- Cantumkan ruang lingkup akreditasi KAN untuk LSP Edukia secara spesifik (skema ISO/IEC 17024 apa saja yang tercakup), dengan link ke direktori KAN.
- Pertimbangkan menambahkan halaman/section testimoni setelah ada data peserta nyata.

---

## 5. Prompt Siap Pakai untuk Claude Code

```
Saya ingin redesign UI/UX untuk dua halaman di project ini: halaman utama (/)
dan halaman katalog pelatihan (/pelatihan). Tolong terapkan perubahan berikut
tanpa mengubah struktur data/konten inti (tetap 21 program pelatihan):

HALAMAN UTAMA:
1. Perkuat hero section dengan value proposition jelas + CTA ganda
   (Lihat Katalog Pelatihan / Konsultasi WhatsApp)
2. Tambahkan section "Kenapa mutululusan.id" berisi diferensiasi konkret
3. Tambahkan section trust signal (badge akreditasi, jumlah alumni jika ada)
4. Ubah daftar program jadi navigasi berbasis kategori (card besar per kategori)
5. Tambahkan FAQ ringkas (3-4 item) di homepage

HALAMAN /pelatihan:
1. Tambahkan filter kategori (Management & Governance, Sustainability & ESG,
   Laboratory & Testing, Industrial Engineering) di samping filter mode yang
   sudah ada (Semua/Online/Offline)
2. Tambahkan search bar untuk mencari program by nama
3. Standarisasi kartu program: badge konsisten, tampilkan durasi & level,
   ganti CTA untuk program "Hubungi admin" jadi tombol WhatsApp langsung
4. Buat empty state untuk hasil filter kosong
5. Buat filter bar sticky saat scroll
6. Tambahkan skeleton loading state untuk grid program

DESAIN SISTEM:
- Jadikan subjudul bahasa Indonesia sebagai judul utama kartu (lebih besar),
  judul bahasa Inggris jadi label sekunder kecil
- Beri sistem warna berbeda untuk badge JP vs badge mode (online/offline)
- Pastikan mobile-first: 1 kolom di mobile, info penting di atas fold
- Pertahankan struktur footer yang sudah ada

Gunakan [framework/library sesuai stack project ini] dan pertahankan skema
warna brand yang sudah ada kecuali disebutkan perlu diubah.
```

> Catatan: sesuaikan baris terakhir prompt di atas dengan stack teknis aktual project (React/Next.js/Vue/dll) sebelum dikirim ke Claude Code.

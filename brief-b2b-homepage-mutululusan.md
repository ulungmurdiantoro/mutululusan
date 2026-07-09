# Brief Redesign Homepage B2B — mutululusan.id

## Konteks
Homepage saat ini ditulis untuk audiens individu (peserta yang langsung daftar & bayar). Arah baru: reposisi homepage untuk audiens **B2B** — pengambil keputusan di perguruan tinggi (LLDIKTI, prodi, LPM), dan industri/lab korporat (HR/L&D, QA/QC manager) yang mengadakan pelatihan untuk tim/institusi mereka.

Target audiens B2B:
- **Perguruan tinggi**: Wakil Rektor/Dekan bidang akademik, Ketua Program Studi, unit LPM/penjaminan mutu, dosen koordinator
- **Industri/Lab korporat**: HR/L&D manager, QA/QC manager, kepala laboratorium

Perilaku audiens ini beda dari individu: mereka tidak self-checkout, butuh proses approval/procurement, butuh proposal tertulis, dan mengutamakan kredibilitas institusi penyedia sebelum harga.

---

## 1. Struktur Homepage yang Disarankan

### Hero Section
- **Headline** berorientasi hasil institusi, bukan sertifikat individu. Contoh arah: *"Solusi Pelatihan & Sertifikasi Kompetensi Laboratorium untuk Perguruan Tinggi dan Industri"*
- **Subheadline** yang mengaitkan langsung ke KPI institusi: IKU 2/3/9, akreditasi program studi, kepatuhan ISO 17025, kesiapan audit.
- **CTA ganda**:
  - Primer: "Ajukan Penawaran untuk Institusi" → form kebutuhan (bukan form pendaftaran)
  - Sekunder: "Jadwalkan Konsultasi dengan Tim Kami" → booking call / WA Business Development

### Section "Dipercaya Oleh" (Trust Bar)
- Logo institusi/perusahaan mitra (jika sudah ada kerja sama nyata — jangan pakai logo tanpa izin/tanpa kerja sama aktual)
- Angka agregat: jumlah institusi mitra, jumlah peserta terlatih, jumlah program tersertifikasi
- Jika belum ada data kuat, ganti sementara dengan badge kredibilitas: akreditasi LSP Edukia (KAN), legalitas PT Padma Global Nusatama

### Section "Solusi Berdasarkan Kebutuhan Anda" (2 jalur)
Pisahkan jadi dua kartu besar/tab:
1. **Untuk Perguruan Tinggi**
   - Poin: pemenuhan IKU 2/3/9, SKPI mahasiswa, sertifikasi kompetensi dosen/tendik, dukungan akreditasi prodi
   - CTA: "Lihat Program untuk Kampus"
2. **Untuk Industri & Laboratorium**
   - Poin: kepatuhan ISO/IEC 17025, sertifikasi personel lab, kesiapan audit eksternal, upskilling tim QA/QC
   - CTA: "Lihat Program untuk Perusahaan"

### Section "Skema Kerja Sama"
Jelaskan opsi yang biasanya dibutuhkan institusi:
- Pelatihan batch/rombongan dengan skema harga khusus institusi
- In-house training / jadwal custom (bukan hanya batch terjadwal publik)
- Kerja sama formal (MOU/PKS) — penting untuk instansi pemerintah & kampus negeri yang butuh proses pengadaan
- Sertakan info legal untuk keperluan procurement: nama badan hukum, kontak resmi, kemungkinan NPWP/NIB bila relevan

### Section "Kenapa Bermitra dengan Kami" (diferensiasi B2B, bukan generik)
Contoh poin (isi dengan klaim yang bisa dipertanggungjawabkan):
- Uji kompetensi melalui LSP Edukia (akreditasi KAN, skema ISO/IEC 17024)
- Program dirancang selaras dengan indikator kinerja institusi (IKU) dan standar mutu lab (ISO 17025)
- Fleksibilitas jadwal dan mode (online/offline/in-house)
- Pendampingan dari pengajuan hingga penerbitan sertifikat

### Section FAQ B2B (bukan FAQ individu)
Ganti/lengkapi dengan pertanyaan khas institusi:
- "Apakah bisa dibuatkan penawaran resmi/proposal untuk pengadaan?"
- "Apakah tersedia skema harga rombongan/institusi?"
- "Apakah bisa kerja sama MOU jangka panjang?"
- "Bagaimana proses penagihan/invoice untuk instansi?"
- "Apakah sertifikat dan JP diakui untuk kebutuhan akreditasi/kum dosen?" (jawab jujur sesuai status pengakuan aktual)

### Footer / Kontak
- Tambahkan kontak terpisah: **Business Development / Kerja Sama Institusi** (nama, email, no. telepon/WA khusus) — dipisah dari CS pendaftaran individu.

---

## 2. Perubahan Navigasi Utama
Pertimbangkan menambah/mengubah menu navigasi homepage:
- `Beranda`
- `Untuk Institusi` (baru — landing page B2B, isi section-section di atas)
- `Untuk Individu` (opsional — arahkan ke katalog /pelatihan versi individu seperti sekarang)
- `Program Pelatihan`
- `Tentang Kami`
- `Kontak`

Tujuannya: audiens B2B tidak "tersasar" ke alur checkout individu, dan audiens individu tetap punya jalur cepat daftar sendiri tanpa terganggu materi B2B.

---

## 3. Hal yang Perlu Dipastikan Sebelum Desain Dieksekusi
- Apakah memang sudah ada institusi mitra nyata yang bisa dicantumkan logonya (perlu izin)? Jika belum, hindari klaim/logo palsu — pakai badge akreditasi & legalitas sebagai pengganti sementara.
- Apakah skema harga rombongan/institusi sudah ditetapkan secara internal? Jika belum, homepage cukup arahkan ke "Ajukan Penawaran" tanpa menampilkan angka.
- Apakah tim punya kapasitas menangani proses MOU/PKS dan invoice institusi? Ini janji yang perlu bisa dipenuhi operasional sebelum ditampilkan di homepage.

---

## 4. Prompt Siap Pakai untuk Claude Code

```
Saya ingin reposisi homepage (/) project ini ke arah B2B, menyasar
perguruan tinggi dan industri/lab korporat sebagai pengambil keputusan
(bukan individu pendaftar langsung). Tolong terapkan perubahan berikut:

1. Ubah hero section: headline berorientasi hasil institusi (contoh:
   "Solusi Pelatihan & Sertifikasi Kompetensi Laboratorium untuk
   Perguruan Tinggi dan Industri"), subheadline mengaitkan ke IKU 2/3/9
   dan ISO 17025. CTA ganda: "Ajukan Penawaran untuk Institusi" (primer,
   arahkan ke form kebutuhan institusi) dan "Jadwalkan Konsultasi"
   (sekunder, arahkan ke WhatsApp Business Development)

2. Tambahkan section "Dipercaya Oleh" berisi placeholder untuk logo
   institusi mitra + angka agregat (jumlah institusi, jumlah peserta
   terlatih) — buat komponen reusable agar mudah diisi datanya nanti

3. Tambahkan section dua-jalur "Solusi Berdasarkan Kebutuhan Anda":
   kartu "Untuk Perguruan Tinggi" dan kartu "Untuk Industri & Laboratorium",
   masing-masing dengan 3-4 poin manfaat dan CTA ke halaman program terkait

4. Tambahkan section "Skema Kerja Sama" menjelaskan: pelatihan batch/
   rombongan, in-house training, kerja sama MOU/PKS, info legalitas
   badan hukum penyedia

5. Tambahkan/ubah FAQ homepage jadi FAQ B2B (proposal pengadaan, skema
   harga rombongan, kerja sama MOU, proses invoice, pengakuan
   sertifikat/JP)

6. Tambahkan kontak "Business Development / Kerja Sama Institusi" yang
   terpisah dari kontak CS individu, baik di homepage maupun footer

7. Tambahkan item navigasi baru "Untuk Institusi" yang mengarah ke
   homepage B2B ini; pertahankan alur individu yang sudah ada di
   /pelatihan agar tidak terganggu

Gunakan [framework/library sesuai stack project ini], pertahankan skema
warna brand yang ada, dan buat semua section di atas sebagai komponen
terpisah agar mudah diedit kontennya nanti.
```

> Catatan: sesuaikan baris terakhir prompt dengan stack teknis aktual project (React/Next.js/Vue/dll), dan pastikan poin-poin di bagian "Hal yang Perlu Dipastikan" (§3) sudah punya jawaban internal sebelum konten ditampilkan ke publik.

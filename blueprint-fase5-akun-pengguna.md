# 🧩 BLUEPRINT — Fase 5 & 6: Akun Pengguna, Login Google & Dashboard Pembelajaran

> Versi 1.0 — 12 Juni 2026
> Lanjutan dari `blueprint-mutululusan-id.md` (Fase 1–4 sudah selesai).
> Fokus: **akun pengguna**, **login wajib sebelum bayar (+ Google)**, dan **dashboard peserta** berisi rekaman Zoom (Google Drive), sertifikat, materi & dokumentasi.

---

## 1. Ringkasan & Tujuan

| Item permintaan | Ringkasan solusi |
|---|---|
| **(1)** Login dulu sebelum payment + login Google | Sistem akun pengguna penuh dengan **Auth.js v5** (Google OAuth + email). Checkout di-*gate*: harus login. |
| **(2)** Dashboard peserta: pelatihan yang diikuti; jika selesai → link rekaman Zoom (Google Drive), sertifikat, materi, dokumentasi | Halaman `/akun` yang menampilkan *enrollment* per pengguna + aset per batch/peserta, dikelola admin. |
| **(3)** Saran dari saya | Bagian §10 — termasuk rekomendasi arsitektur, keamanan aset, mitigasi friksi konversi, dan fitur tambahan. |

**Konsekuensi arsitektur terpenting:** ketiga fitur ini menuntut **database sungguhan**. Order store saat ini (`lib/orders.ts` → file JSON `.data/orders.json`) bersifat ephemeral di serverless dan tidak bisa menampung relasi user ↔ enrollment ↔ aset. **Ini saat yang tepat memperkenalkan database** (sudah disebut sebagai rencana di blueprint awal: PostgreSQL + Prisma).

---

## 2. Dampak ke Arsitektur Saat Ini

### 2.1 Yang BERUBAH
- **Database baru**: **PostgreSQL 16 di-self-host pada VPS Anda** (via Docker) + **Prisma ORM**. (Lihat §2.4 untuk alasan & implikasi karena Anda sudah punya VPS.)
- **`lib/orders.ts`** ditulis ulang memakai Prisma. Antarmuka fungsi (`createOrder`, `getOrder`, `updateOrder`, `listOrders`) **dipertahankan** agar checkout, webhook, cron, dan admin tidak perlu diubah besar — hanya implementasinya yang ganti.
- **Checkout** kini memerlukan sesi login; `order.userId` diisi.
- **Admin auth** (token cookie saat ini) **dikonsolidasikan** ke sistem akun berbasis peran (`role: admin`). Token lama bisa dipertahankan sebagai jalur transisi.

### 2.2 Yang TETAP
- **Konten** (program di `lib/programs-data.ts`, blog di `lib/blog-data.ts`) tetap **file-based** — tidak perlu DB. Hanya data transaksional (user, order, enrollment, aset) yang masuk DB.
- Midtrans, notifikasi (Resend/Fonnte), kupon, sitemap, SEO — tetap.
- Brand sky + orange, komponen UI yang ada.

### 2.4 Keputusan database & deployment (Anda punya VPS)
**Rekomendasi terbaik: self-host PostgreSQL di VPS Anda** — bukan layanan managed (Neon/Supabase).
- **Alasan**: Anda sudah membayar VPS → **tanpa biaya tambahan**, kontrol penuh, data di infrastruktur sendiri, tanpa batas baris/koneksi vendor.
- **Cara**: jalankan via **Docker Compose** (`postgres:16` + aplikasi Next.js) di belakang **Nginx** (reverse proxy + HTTPS via Let's Encrypt). Backup harian dengan `pg_dump` (cron).
- **Implikasi penting karena app pindah dari serverless ke VPS:**
  1. **Cron**: `vercel.json` hanya berlaku di Vercel. Di VPS, jadwalkan reminder lewat **systemd timer / crontab** yang memanggil `curl -H "Authorization: Bearer $CRON_SECRET" https://mutululusan.id/api/cron/reminders` (mis. 08.00 WIB harian). Endpoint-nya sudah siap.
  2. **Order store file-JSON sebenarnya PERSISTEN di VPS** (filesystem nyata, proses long-running) — jadi tidak ada kehilangan data seperti di serverless. Namun kita **tetap migrasi ke Postgres** karena butuh relasi user ↔ enrollment ↔ aset.
  3. **Jalankan app** dengan `next start` di belakang Nginx, dikelola **PM2 / systemd / Docker**. Aktifkan `output: "standalone"` di `next.config.ts` agar image Docker ramping.
- *Alternatif managed* (Neon/Supabase) tetap mungkin bila nanti ingin lepas tangan dari ops DB — Prisma membuat perpindahan mudah (cukup ganti `DATABASE_URL`).

### 2.3 Catatan Next.js 16 (wajib saat implementasi)
- Proteksi rute pakai **pengecekan sesi di Server Component/Layout** (mis. di `app/akun/layout.tsx` dan `app/checkout/[slug]/page.tsx`), **bukan** `middleware`. Alasan: Next 16 mendeprekasi `middleware` → `proxy`, dan `proxy` tidak mendukung edge runtime yang dipakai middleware Auth.js. Pendekatan server-component lebih bersih & aman.
- `cookies()`, `params`, `searchParams` semuanya **async** (`await`).
- Auth.js v5 (`next-auth@5`) kompatibel App Router; handler di `app/api/auth/[...nextauth]/route.ts`.

---

## 3. Fitur 1 — Autentikasi & Gating Pembayaran

### 3.1 Metode login (rekomendasi)
1. **Google OAuth** ⭐ (diminta) — paling mulus, 1–2 klik.
2. **Email magic link** (via Resend yang sudah terpasang) — *passwordless*, tanpa beban kelola password, cocok untuk peserta B2B.
3. *(Opsional, nanti)* WhatsApp OTP — sangat populer di Indonesia, tapi butuh provider OTP; tunda ke iterasi berikutnya.

> Rekomendasi: **Google + Email magic link** dulu. Tidak pakai password agar tidak ada beban reset password & kebocoran kredensial.

### 3.2 Alur "login sebelum bayar"
```
Halaman Program → klik "Daftar & Bayar"
   │
   ├─ Sudah login? ── ya ──► Checkout (nama/email terisi dari akun) → Midtrans Snap
   │
   └─ Belum login ──► /masuk?callbackUrl=/checkout/[slug]?batch=...
                         │  Login Google / magic link (1 langkah)
                         ▼
                      Kembali otomatis ke Checkout → bayar
```
- Checkout **prefill** nama & email dari sesi (kurangi friksi).
- `order.userId` = id sesi saat order dibuat.
- **WA fallback tetap ada** untuk yang tak mau login (diarahkan ke admin), agar tidak kehilangan lead.
- Saat pertama login, **order lama yang email-nya cocok otomatis di-link** ke akun (migrasi mulus).

### 3.3 Halaman & endpoint
| Rute | Isi |
|---|---|
| `/masuk` | Tombol "Lanjут dengan Google" + form email magic link. `callbackUrl` didukung. `noindex`. |
| `/api/auth/[...nextauth]` | Handler Auth.js (login, callback, signout, session). |
| `app/akun/layout.tsx` | Guard: belum login → redirect `/masuk`. |
| Header | Tampil "Masuk" (tamu) atau avatar + menu "Akun / Keluar" (login). |

### 3.4 Konsolidasi admin
- Tambah kolom `role` di tabel `User` (`user` | `admin`).
- `/admin` & API admin mengecek `session.user.role === 'admin'` (gantikan/legacy: token lama dipertahankan sementara).
- Admin pertama ditetapkan via env `ADMIN_EMAILS` (daftar email yang otomatis di-promote saat login).

---

## 4. Fitur 2 — Dashboard Peserta & Aset Pembelajaran

### 4.1 Struktur dashboard
```
/akun                         → ringkasan (nama, jumlah pelatihan, sertifikat)
/akun/pelatihan               → daftar enrollment: "Akan datang" & "Selesai"
/akun/pelatihan/[orderId]     → detail 1 pelatihan + semua aset
/akun/sertifikat              → kumpulan sertifikat (unduh / verifikasi)
/akun/profil                  → ubah nama (penting utk nama sertifikat), email, no. WA
```

### 4.2 Status & ketersediaan aset
- **Akan datang** (`batch.startDate ≥ hari ini`): tampil tanggal, info Zoom (jika sudah ada), tombol "Lanjutkan pembayaran" bila order masih `pending`.
- **Selesai** (`batch.endDate < hari ini`): tampil blok aset bila admin sudah mengunggahnya:
  - 🎥 **Rekaman Zoom** (tautan Google Drive)
  - 📜 **e-Sertifikat** (per peserta — unik)
  - 📚 **Materi** (soft copy)
  - 🗂️ **Dokumentasi** (foto/berkas tambahan)
- Jika aset belum tersedia: tampil status "Sedang disiapkan oleh admin".

### 4.3 Model aset (penting: per-batch vs per-peserta)
- **Per batch** (sama untuk semua peserta batch itu): rekaman Zoom, materi, dokumentasi → tabel `BatchAsset`.
- **Per peserta** (unik): sertifikat → tabel `Certificate` (terikat ke enrollment/order + nama peserta + nomor sertifikat).

### 4.4 Sisi admin (pengelolaan aset)
Perluasan `/admin`:
- Daftar batch → form tempel **link Drive** untuk rekaman/materi/dokumentasi per batch.
- Daftar peserta per batch → unggah/tempel **sertifikat** + nomor sertifikat per peserta; tombol "Terbitkan" → memicu notifikasi (email + WA) "Sertifikat & rekaman Anda sudah tersedia".

---

## 5. Skema Data (Prisma — sketsa)

```prisma
model User {
  id            String       @id @default(cuid())
  name          String?
  email         String       @unique
  emailVerified DateTime?
  image         String?
  whatsapp      String?
  role          Role         @default(USER)
  accounts      Account[]
  sessions      Session[]
  orders        Order[]
  certificates  Certificate[]
  createdAt     DateTime     @default(now())
}
enum Role { USER ADMIN }

// Tabel standar Auth.js: Account, Session, VerificationToken
model Account { /* provider, providerAccountId, tokens, userId … */ }
model Session { /* sessionToken, userId, expires … */ }
model VerificationToken { /* identifier, token, expires … */ }

model Order {
  id            String       @id            // = orderId (MTL-…)
  userId        String?
  user          User?        @relation(fields: [userId], references: [id])
  programSlug   String
  programTitle  String
  batchId       String
  batchStartDate String
  batchEndDate  String
  buyerName     String
  email         String
  whatsapp      String
  institution   String?
  qty           Int
  tier          String?
  subtotal      Int
  discount      Int
  couponCode    String?
  total         Int
  status        String       // pending|paid|confirmed|completed|expired|cancelled|refunded
  paymentChannel String?
  gatewayToken  String?
  notified      Json
  certificates  Certificate[]
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}

model BatchAsset {
  batchId        String   @id            // 1 baris per batch
  programSlug    String
  recordingUrl   String?                 // tautan Google Drive
  materialsUrl   String?
  documentationUrl String?
  zoomInfo       String?                 // link/grup sebelum acara
  updatedAt      DateTime @updatedAt
}

model Certificate {
  id            String   @id @default(cuid())
  number        String   @unique         // utk halaman verifikasi publik
  orderId       String
  order         Order    @relation(fields: [orderId], references: [id])
  userId        String?
  user          User?    @relation(fields: [userId], references: [id])
  participantName String
  programTitle  String
  fileUrl       String                   // PDF (Drive/penyimpanan)
  issuedAt      DateTime @default(now())
}
```

> `Order.notified` & field lain dipertahankan agar webhook/cron yang ada tetap jalan tanpa perubahan logika.

---

## 6. Keamanan Akses Aset (kritis)

Tautan Google Drive **tidak boleh** bocor ke publik. Tiga tingkat (pilih sesuai effort):

| Level | Cara | Keamanan | Effort |
|---|---|---|---|
| **A (MVP)** | Drive "anyone with link – view", tautan **hanya dirender di dashboard ber-login** setelah cek kepemilikan (user punya enrollment `paid` untuk batch itu). | Sedang (tautan bisa diteruskan manual) | Rendah |
| **B (disarankan)** | Endpoint proxy `/api/aset/[orderId]/[jenis]` → verifikasi sesi + kepemilikan → **302 redirect** ke Drive. Tautan asli tak pernah tampil di HTML. | Lebih baik | Sedang |
| **C (maksimal)** | Google Drive API + service account → buat **tautan/akses berdurasi pendek** per permintaan, atau streaming via server. | Tinggi | Tinggi |

> **Keputusan Anda**: sertifikat & aset diunggah ke **Google Drive** dan peserta mengaksesnya langsung di sana. Maka kita pakai **Level A** untuk MVP: link Drive **hanya dirender di dashboard ber-login** setelah cek kepemilikan (peserta punya enrollment `paid`/`completed` untuk batch itu). **Level B (proxy)** disiapkan sebagai peningkatan satu langkah bila nanti ingin menyembunyikan link asli. Halaman **verifikasi publik** (§10.5) hanya menampilkan metadata (nama, program, status valid), bukan file.

---

## 7. Integrasi Google (dua hal berbeda)

1. **Google OAuth (login)** — Google Cloud Console → OAuth Consent Screen + Credentials → `Client ID` & `Client Secret`. Redirect URI: `https://mutululusan.id/api/auth/callback/google` (+ `http://localhost:3000/...` untuk dev).
2. **Google Drive (penyimpanan aset)** — untuk MVP cukup **tempel link manual** dari Drive (admin yang kelola). Integrasi Drive API (service account) opsional di Level C.

---

## 8. Variabel Environment Baru

```bash
# Database
DATABASE_URL=postgresql://...

# Auth.js
AUTH_SECRET=                 # openssl rand -base64 32
AUTH_URL=https://mutululusan.id
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Email magic link memakai RESEND_API_KEY yang sudah ada
# Admin awal (otomatis dipromosikan saat login)
ADMIN_EMAILS=digiplan.integrasi@gmail.com
```

---

## 9. Halaman & Rute Baru (ringkas)

| Publik / Privat | Rute |
|---|---|
| Publik | `/masuk`, `/verifikasi/[nomor]` (cek sertifikat) |
| Privat (user) | `/akun`, `/akun/pelatihan`, `/akun/pelatihan/[orderId]`, `/akun/sertifikat`, `/akun/profil` |
| Privat (admin) | perluasan `/admin`: kelola aset batch & sertifikat |
| API | `/api/auth/[...nextauth]`, `/api/aset/[orderId]/[jenis]`, `/api/admin/aset`, `/api/admin/sertifikat` |

---

## 10. 💡 Saran Saya (item 3)

1. **Perkenalkan database sekarang** (Neon/Supabase + Prisma). Tanpa ini, ketiga fitur tidak bisa berjalan andal di produksi. Sekaligus memindahkan order store dari file JSON → DB (menyelesaikan utang teknis dari Fase 3).
2. **Passwordless (Google + magic link)**, bukan password. Lebih aman, lebih sedikit dukungan pelanggan, UX lebih cepat.
3. **Satukan admin ke sistem akun** (`role`). Hilangkan token admin terpisah agar tidak ada dua sistem auth.
4. **Amankan aset via proxy berbasis kepemilikan (Level B)** + Drive non-publik. Jangan render link Drive mentah.
5. **Halaman verifikasi sertifikat publik** `/verifikasi/[nomor]` — pemberi kepercayaan (HRD bisa cek keaslian) **dan** magnet SEO ("cek sertifikat pelatihan"). Tampilkan hanya nama, program, tanggal, status valid.
6. **Auto-link order lama by email** saat pengguna pertama login — peserta langsung melihat riwayatnya tanpa migrasi manual.
7. **"Lanjutkan pembayaran" di dashboard** untuk order `pending` — melengkapi recovery WA, menaikkan konversi pemulihan.
8. **Profil & akurasi nama sertifikat**: wajibkan konfirmasi ejaan nama sebelum sertifikat diterbitkan (hindari cetak ulang).
9. **Kepatuhan data (UU PDP)**: sediakan hapus akun & ekspor data; perbarui Kebijakan Privasi (login Google = data dari Google).
10. **Mitigasi friksi konversi (penting!)** — blueprint awal bertema *payment-first, minim friksi*. Mewajibkan login menambah langkah. Mitigasi: (a) tombol **Google one-tap** yang sangat cepat; (b) letakkan gate **selambat mungkin** (tepat sebelum Snap); (c) pertahankan **jalur WA** untuk yang menolak login; (d) ukur dampak konversi via GA4 (event `login`, `begin_checkout`).
11. *(Nanti)* **WhatsApp OTP login** — sangat relevan di pasar Indonesia; jadikan iterasi lanjutan.
12. *(Nanti)* **Email "aset siap"** otomatis saat admin menerbitkan rekaman/sertifikat — pakai infrastruktur notifikasi yang sudah ada.

---

## 11. Roadmap Implementasi

| Fase | Fokus | Deliverable |
|---|---|---|
| **5A — Fondasi & Auth** | DB + login | Prisma + Postgres, migrasi `lib/orders.ts` ke DB, Auth.js (Google + magic link), header login/avatar, halaman `/masuk`, guard `/akun`, gating checkout, auto-link order by email, konsolidasi admin `role`. |
| **5B — Dashboard inti** | Riwayat | `/akun`, `/akun/pelatihan`, `/akun/pelatihan/[orderId]` (status akan datang/selesai), `/akun/profil`, "lanjutkan pembayaran". |
| **6A — Aset & sertifikat** | Pengiriman | `BatchAsset` + `Certificate`, proxy aset (Level B), admin kelola aset/sertifikat, `/akun/sertifikat`, notifikasi "aset siap". |
| **6B — Verifikasi & polish** | Kepercayaan | `/verifikasi/[nomor]`, update Kebijakan Privasi, hapus/ekspor akun, pengukuran konversi GA4. |

---

## 12. Keputusan (SUDAH DIPUTUSKAN — 12 Jun 2026)

| # | Keputusan | Pilihan final |
|---|---|---|
| 1 | **Database & hosting** | **Self-host PostgreSQL 16 di VPS** (Docker) + Prisma. App Next.js juga di VPS (Nginx + PM2/Docker, `output: standalone`). Cron via systemd/crontab. |
| 2 | **Metode login** | **Google OAuth + Email magic link** (passwordless, via Resend). |
| 3 | **Sertifikat & aset** | **Diunggah admin ke Google Drive**; peserta mengakses lewat link di dashboard ber-login (keamanan **Level A**, upgrade ke proxy Level B opsional). Tidak ada generate PDF otomatis di MVP. |
| 4 | **Gating pembayaran** | **Wajib login** untuk bayar online; **jalur WhatsApp tetap dibuka** sebagai alternatif tanpa-login. |

### Yang perlu Anda siapkan (kredensial — hanya Anda yang bisa)
1. **VPS**: pasang Docker + Docker Compose, siapkan domain mengarah ke VPS, Nginx + sertifikat HTTPS.
2. **PostgreSQL**: jalankan kontainer Postgres → dapatkan `DATABASE_URL`.
3. **Google OAuth**: di Google Cloud Console buat OAuth Client → `AUTH_GOOGLE_ID` & `AUTH_GOOGLE_SECRET`; redirect URI `https://mutululusan.id/api/auth/callback/google` (+ localhost untuk dev).
4. **`AUTH_SECRET`**: `openssl rand -base64 32`.
5. **`ADMIN_EMAILS`**: email Anda agar otomatis jadi admin.

> Selama kredensial di atas belum siap, saya tetap bisa membangun **seluruh kode** (skema Prisma, Auth.js, halaman, migrasi store) dengan *graceful fallback* — fitur akun nonaktif rapi bila `DATABASE_URL`/OAuth kosong, situs lama tetap jalan. Begitu Anda isi env, fitur langsung hidup.
```

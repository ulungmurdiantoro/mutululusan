# 🚀 Deploy mutululusan.id ke VPS (Debian 13)

Panduan men-deploy aplikasi (Next.js 16 + Prisma + PostgreSQL) ke VPS Debian 13
memakai **Docker Compose** (Postgres + app) di belakang **Nginx + HTTPS**.

Estimasi waktu: 20–30 menit.

---

## 0. Prasyarat
- VPS Debian 13 dengan akses `root`/sudo.
- Domain `mutululusan.id` (dan `www`) sudah diarahkan **A record** ke IP VPS.
- Kredensial yang sudah Anda siapkan: Google OAuth, Midtrans, (opsional) Resend/Fonnte.

---

## 1. Pasang Docker Engine + Compose plugin
```bash
sudo apt update && sudo apt install -y ca-certificates curl git
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
```

## 2. Firewall
```bash
sudo apt install -y ufw
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## 3. Ambil kode
```bash
sudo mkdir -p /opt/mutululusan && sudo chown $USER:$USER /opt/mutululusan
git clone <URL-REPO-ANDA> /opt/mutululusan
cd /opt/mutululusan
```
> Jika belum pakai git remote, upload folder proyek ke `/opt/mutululusan` (mis. via `scp`/`rsync`), tanpa `node_modules` dan `.next`.

## 4. Konfigurasi environment
```bash
cp .env.example .env
nano .env
```
Isi minimal:
- `NEXT_PUBLIC_SITE_URL=https://mutululusan.id`
- `AUTH_URL=https://mutululusan.id`
- `AUTH_SECRET=` (sudah ada; atau `openssl rand -base64 32`)
- `AUTH_GOOGLE_ID=` / `AUTH_GOOGLE_SECRET=`
- `ADMIN_EMAILS=` (email Anda)
- `POSTGRES_PASSWORD=` (acak & kuat — dipakai Compose)
- `CRON_SECRET=` (acak — untuk endpoint reminder)
- `MIDTRANS_SERVER_KEY=` / `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=` / `NEXT_PUBLIC_MIDTRANS_PRODUCTION=true` (saat siap live)
- `NEXT_PUBLIC_WHATSAPP=`, `NEXT_PUBLIC_CONTACT_EMAIL=`, (opsional) `RESEND_API_KEY`, `FONNTE_TOKEN`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`

> `DATABASE_URL` di `.env` tidak perlu diubah untuk app — Compose mengisinya
> otomatis ke service `db`. Variabel `NEXT_PUBLIC_*` dibaca saat build, jadi
> pastikan terisi **sebelum** langkah 5.

## 5. Build & jalankan
```bash
docker compose up -d --build
```
Saat start, container app otomatis menjalankan `prisma migrate deploy`
(membuat seluruh tabel), lalu menjalankan server di `127.0.0.1:3000`.

Pantau:
```bash
docker compose logs -f app
```
Cek migrasi sukses & server siap (`Ready in ...`). Hentikan log dengan `Ctrl+C`.

## 6. Nginx + HTTPS
```bash
sudo apt install -y nginx
sudo cp deploy/nginx/mutululusan.id.conf /etc/nginx/sites-available/mutululusan.id
sudo ln -s /etc/nginx/sites-available/mutululusan.id /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# Sertifikat HTTPS (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d mutululusan.id -d www.mutululusan.id
```
Certbot menambah blok HTTPS dan redirect 80→443 otomatis.

## 7. Update Google OAuth
Di Google Cloud Console, pastikan **Authorized redirect URI** memuat:
```
https://mutululusan.id/api/auth/callback/google
```
dan **JavaScript origins**: `https://mutululusan.id`.

## 8. Cron reminder (H-3/H-1 & recovery)
Jalankan endpoint reminder tiap hari 08.00 WIB (01.00 UTC):
```bash
sudo crontab -e
```
Tambahkan (ganti `CRON_SECRET` dengan nilai di `.env`):
```
0 1 * * * curl -fsS -H "Authorization: Bearer CRON_SECRET_ANDA" https://mutululusan.id/api/cron/reminders >/dev/null 2>&1
```

---

## Operasional

**Update aplikasi (deploy versi baru):**
```bash
cd /opt/mutululusan
git pull
docker compose up -d --build
```

**Migrasi baru** (setelah ubah `prisma/schema.prisma`): buat file migration di
lokal dev (`npm run db:migrate -- --name <nama>`), commit, lalu `git pull` +
`docker compose up -d --build` di server (entrypoint menerapkannya otomatis).

**Backup database harian** (contoh, simpan ke /opt/backups):
```bash
mkdir -p /opt/backups
( crontab -l 2>/dev/null; echo '30 18 * * * docker exec $(docker compose -f /opt/mutululusan/docker-compose.yml ps -q db) pg_dump -U mutululusan mutululusan | gzip > /opt/backups/mutululusan-$(date +\%F).sql.gz' ) | crontab -
```

**Akses psql:**
```bash
docker compose exec db psql -U mutululusan -d mutululusan
```

**Lihat data via Prisma Studio (opsional, lewat SSH tunnel):**
```bash
docker compose exec app npx prisma studio
# lalu: ssh -L 5555:localhost:5555 user@vps   → buka http://localhost:5555
```

---

## Catatan
- App di-bind ke `127.0.0.1` (tidak terekspos langsung ke internet) — hanya
  Nginx yang publik. Postgres juga hanya di jaringan internal Compose +
  `127.0.0.1:5432` untuk backup.
- `.env` berisi rahasia — pastikan permission ketat (`chmod 600 .env`) dan
  jangan commit (sudah di-`.gitignore`).
- Pastikan VPS punya RAM cukup untuk `next build` (disarankan ≥ 2 GB, atau
  aktifkan swap) — bila build OOM, tambah swap.

# syntax=docker/dockerfile:1
# Image produksi untuk mutululusan.id (Next.js 16 + Prisma + PostgreSQL).
FROM node:22-bookworm-slim

# Prisma membutuhkan openssl pada Debian.
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# 1) Dependencies — skema disalin dulu agar postinstall `prisma generate` jalan.
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# 2) Build — `next build` membaca .env untuk variabel NEXT_PUBLIC_*.
COPY . .
RUN npm run build

EXPOSE 3000

# 3) Saat container start: terapkan migrasi DB lalu jalankan server.
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start -- -H 0.0.0.0"]

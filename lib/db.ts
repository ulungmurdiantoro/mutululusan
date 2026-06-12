import { PrismaClient } from "@prisma/client";

/**
 * Singleton PrismaClient agar tidak membuat koneksi berlebih saat hot-reload
 * di development. Instansiasi bersifat lazy — koneksi baru terbuka saat query
 * pertama, jadi aman meski DATABASE_URL belum mengarah ke DB yang hidup.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Database dianggap aktif bila DATABASE_URL diset dan bukan nilai placeholder
 * dari `.env.example`. Saat belum aktif, lapisan order memakai file store lokal
 * (lihat lib/orders.ts) sehingga situs tetap berjalan tanpa database.
 */
export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  return Boolean(url) && !url!.includes("ubah_password_ini");
}

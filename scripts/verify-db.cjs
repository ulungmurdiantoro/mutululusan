// Verifikasi koneksi & keberadaan tabel di database (Prisma).
// Jalankan: node scripts/verify-db.cjs  (DATABASE_URL harus tersedia di env)
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async () => {
  try {
    const [users, orders, certificates, batchAssets] = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      prisma.certificate.count(),
      prisma.batchAsset.count(),
    ]);
    console.log("✅ Connected. Tabel tersedia:");
    console.log(`   User=${users}  Order=${orders}  Certificate=${certificates}  BatchAsset=${batchAssets}`);
  } catch (e) {
    console.error("❌ Gagal: " + e.message);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
})();

import { getAllPrograms, typeLabel } from "@/lib/programs";
import { careerCategories } from "@/lib/career-categories";
import { site } from "@/lib/site";

export const revalidate = 86400;

export async function GET() {
  const programs = await getAllPrograms();

  const categorySections = careerCategories
    .map((cat) => {
      const items = cat.schemes
        .map((s) => {
          const program = programs.find((p) => p.slug === s.slug);
          if (!program) return null;
          return `- [${program.title}](${site.url}/pelatihan/${program.slug}): ${program.excerpt}`;
        })
        .filter(Boolean)
        .join("\n");
      return `### ${cat.name}\n${cat.desc}\n\n${items}`;
    })
    .join("\n\n");

  const uncategorizedSlugs = new Set(
    careerCategories.flatMap((c) => c.schemes.map((s) => s.slug)),
  );
  const uncategorized = programs.filter((p) => !uncategorizedSlugs.has(p.slug));
  const uncategorizedSection = uncategorized.length
    ? `### Program lainnya\n\n${uncategorized
        .map((p) => `- [${p.title}](${site.url}/pelatihan/${p.slug}): ${p.excerpt}`)
        .join("\n")}`
    : "";

  const body = `# ${site.name}

> ${site.tagline}

${site.description}

mutululusan.id adalah platform pelatihan & sertifikasi kompetensi bidang laboratorium di
Indonesia, melayani dua audiens:
- **Individu** (mahasiswa, fresh graduate, dosen/tendik, profesional): daftar & bayar online,
  lihat [katalog untuk individu](${site.url}/individu).
- **Institusi** (perguruan tinggi, industri, laboratorium korporat): kemitraan, in-house
  training, dan penawaran khusus, lihat [solusi untuk institusi](${site.url}).

Setiap pelatihan online dilengkapi e-Sertifikat 24 JP (jam pelajaran), rekaman sesi, dan materi
yang dapat diakses ulang. Uji dan sertifikasi kompetensi (bukan sekadar sertifikat pelatihan)
diselenggarakan oleh mitra resmi kami, **${site.partner.name}** (${site.partner.url}), sesuai
skema ISO/IEC 17024 — mutululusan.id dan ${site.partner.name} adalah dua entitas independen.

## Halaman penting

- [Katalog pelatihan (individu)](${site.url}/individu)
- [Solusi untuk institusi](${site.url})
- [Daftar semua program](${site.url}/pelatihan)
- [Jadwal batch 2026](${site.url}/jadwal-pelatihan-2026)
- [In-house training untuk instansi](${site.url}/in-house-training)
- [Ajukan penawaran institusi](${site.url}/ajukan-penawaran)
- [Sertifikasi kompetensi (mitra ${site.partner.name})](${site.url}/sertifikasi-kompetensi)
- [FAQ](${site.url}/faq)
- [Kontak](${site.url}/kontak)

## Program pelatihan (${programs.length} program)

${categorySections}${uncategorizedSection ? `\n\n${uncategorizedSection}` : ""}

## Fakta ringkas

- Mode pelatihan: ${Object.values(typeLabel).join(", ")}
- e-Sertifikat 24 JP diterbitkan mutululusan.id (bukan klaim akreditasi eksternal)
- Pembayaran: QRIS, virtual account, e-wallet, kartu, transfer korporat (invoice instansi)
- Kontak resmi: ${site.email}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

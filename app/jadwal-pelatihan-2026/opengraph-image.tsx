import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Jadwal Pelatihan Laboratorium 2026 — mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "Jadwal Pelatihan Laboratorium 2026",
    subtitle: "Kalender lengkap seluruh batch pelatihan & sertifikasi kompetensi laboratorium.",
  });
}

import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Pelatihan Kompetensi Laboratorium 2026 — mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "Pelatihan Kompetensi Laboratorium 2026",
    subtitle:
      "K3 lab, GLP, QC/QA, ISO 9001 — e-Sertifikat 24 JP, bayar langsung via QRIS/VA.",
  });
}

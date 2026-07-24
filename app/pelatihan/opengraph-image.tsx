import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Katalog Pelatihan Laboratorium 2026 — mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "Katalog Pelatihan Laboratorium 2026",
    subtitle: "ISO 17025, K3 lab, GLP, QC/QA, sensori pangan — e-Sertifikat 24 JP.",
  });
}

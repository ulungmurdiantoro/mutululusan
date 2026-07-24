import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Sertifikasi Kompetensi Laboratorium — Mitra LSP Edukia";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "Sertifikasi Kompetensi Laboratorium",
    subtitle: "Uji & sertifikasi kompetensi diselenggarakan mitra resmi kami, LSP Edukia.",
  });
}

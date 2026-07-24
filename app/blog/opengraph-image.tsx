import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Blog — Wawasan Laboratorium, Mutu & Sertifikasi";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "Wawasan Laboratorium, Mutu & Sertifikasi",
    subtitle: "Panduan praktis seputar K3 laboratorium, GLP, mutu, dan sertifikasi kompetensi.",
  });
}

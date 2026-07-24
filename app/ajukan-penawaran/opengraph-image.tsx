import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Ajukan Penawaran Pelatihan untuk Institusi — mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "Ajukan Penawaran untuk Institusi",
    subtitle:
      "Ceritakan kebutuhan pelatihan/sertifikasi institusi Anda — kami kirimkan proposal tertulis.",
  });
}

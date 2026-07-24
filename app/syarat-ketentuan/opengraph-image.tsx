import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Syarat & Ketentuan — mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "Syarat & Ketentuan",
    subtitle: "Ketentuan penggunaan layanan pelatihan dan sertifikasi kompetensi.",
  });
}

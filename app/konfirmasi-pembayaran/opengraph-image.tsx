import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Konfirmasi Pembayaran Manual — mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "Konfirmasi Pembayaran Manual",
    subtitle: "Kirim bukti transfer manual agar kursi pelatihan Anda segera terkonfirmasi.",
  });
}

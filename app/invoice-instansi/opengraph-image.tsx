import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Daftar via Invoice Instansi — mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "Daftar via Invoice Instansi",
    subtitle: "Invoice resmi atas nama instansi dan pembayaran transfer korporat.",
  });
}

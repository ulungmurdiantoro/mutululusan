import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Hubungi Kami — mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "Hubungi Kami",
    subtitle: "WhatsApp admin, email, pendaftaran instansi — respons cepat di jam kerja.",
  });
}

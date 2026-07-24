import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Tentang mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "Tentang mutululusan.id",
    subtitle:
      "Meningkatkan mutu sumber daya laboratorium Indonesia, satu peserta pelatihan dalam satu waktu.",
  });
}

import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "In-House Training Laboratorium untuk Instansi — mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "In-House Training Laboratorium untuk Instansi",
    subtitle: "Materi disesuaikan kebutuhan, jadwal fleksibel, online atau di lokasi.",
  });
}

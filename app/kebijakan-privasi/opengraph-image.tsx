import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Kebijakan Privasi — mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "Kebijakan Privasi",
    subtitle: "Data apa yang kami kumpulkan, bagaimana digunakan, dan hak Anda.",
  });
}

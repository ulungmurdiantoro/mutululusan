import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Kebijakan Refund & Reschedule — mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "Kebijakan Refund & Reschedule",
    subtitle: "Ketentuan pembatalan, pengembalian dana, dan pemindahan jadwal pelatihan.",
  });
}

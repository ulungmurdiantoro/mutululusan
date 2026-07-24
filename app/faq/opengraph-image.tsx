import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "FAQ — Pertanyaan Seputar Pelatihan & Pembayaran";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    title: "FAQ — Pertanyaan Seputar Pelatihan & Pembayaran",
    subtitle:
      "Jawaban seputar pendaftaran, pembayaran, sertifikat, rekaman, dan reschedule.",
  });
}

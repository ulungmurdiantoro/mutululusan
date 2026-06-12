export const site = {
  name: "mutululusan.id",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mutululusan.id",
  tagline:
    "Pelatihan & sertifikasi kompetensi laboratorium bersertifikat 24 JP — daftar online, bayar langsung, langsung dapat akses.",
  description:
    "Platform pelatihan dan sertifikasi kompetensi bidang laboratorium: ISO/IEC 17025, K3 laboratorium, GLP, QC/QA, dan lainnya. e-Sertifikat 24 JP, rekaman & materi, bayar langsung via QRIS/VA.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mutululusan.id@gmail.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "6282172221567",
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const paymentMicrocopy = "Pembayaran aman via QRIS, VA, e-wallet & kartu";

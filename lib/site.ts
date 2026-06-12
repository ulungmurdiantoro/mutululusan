export const site = {
  name: "mutululusan.id",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mutululusan.id",
  tagline:
    "Pelatihan kompetensi laboratorium bersertifikat 24 JP — daftar online, bayar langsung, langsung dapat akses.",
  description:
    "Platform pelatihan kompetensi bidang laboratorium: K3 laboratorium, GLP, QC/QA, ISO 9001, jaminan mutu, dan lainnya. e-Sertifikat pelatihan 24 JP, rekaman & materi, bayar langsung via QRIS/VA. Jalur sertifikasi kompetensi bersama mitra resmi kami, LSP Edukia.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mutululusan.id@gmail.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "6282172221567",
  /** Mitra resmi penyelenggara uji & sertifikasi kompetensi. */
  partner: {
    name: "LSP Edukia",
    url: "https://lspedukia.id",
    domain: "lspedukia.id",
  },
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const paymentMicrocopy = "Pembayaran aman via QRIS, VA, e-wallet & kartu";

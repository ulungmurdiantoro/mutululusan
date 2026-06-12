export interface Testimonial {
  name: string;
  role: string;
  /** Slug program terkait, jika ada. */
  programSlug?: string;
  /** Skala 1–5; isi hanya jika rating asli dari peserta. */
  rating?: number;
  quote: string;
  /** YYYY-MM-DD */
  date: string;
}

/**
 * PENTING: isi HANYA dengan testimoni asli dari peserta (lihat catatan legal
 * blueprint §11 — urgency & ulasan harus jujur). Jangan pernah memalsukan
 * testimoni atau rating. Saat array ini kosong, komponen testimoni dan schema
 * AggregateRating tidak dirender sama sekali.
 *
 * Contoh format (hapus tanda komentar saat menambahkan data ASLI):
 * {
 *   name: "Nama Peserta",
 *   role: "Analis QC, PT Contoh",
 *   programSlug: "qc-laboratory-analyst",
 *   rating: 5,
 *   quote: "Materinya aplikatif dan langsung bisa dipakai di lab kami.",
 *   date: "2026-08-10",
 * },
 */
export const testimonials: Testimonial[] = [];

export function getTestimonials(programSlug?: string): Testimonial[] {
  if (!programSlug) return testimonials;
  return testimonials.filter((t) => t.programSlug === programSlug);
}

export interface AggregateRating {
  ratingValue: number;
  reviewCount: number;
}

/** Kembalikan AggregateRating hanya bila ada rating asli. */
export function getAggregateRating(programSlug?: string): AggregateRating | null {
  const rated = getTestimonials(programSlug).filter(
    (t): t is Testimonial & { rating: number } => typeof t.rating === "number",
  );
  if (rated.length === 0) return null;
  const sum = rated.reduce((total, t) => total + t.rating, 0);
  return {
    ratingValue: Math.round((sum / rated.length) * 10) / 10,
    reviewCount: rated.length,
  };
}

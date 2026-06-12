export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
  /** Berlaku sampai (inklusif), format YYYY-MM-DD. */
  validUntil: string;
  /** Batasi ke program tertentu; kosong = berlaku semua program. */
  programSlugs?: string[];
  minQty?: number;
  description: string;
}

/**
 * Daftar kupon early-bird. File-based agar mudah dikelola tanpa DB.
 * Penghitungan kuota pemakaian (max_use/used_count) memerlukan database —
 * untuk sekarang validitas berbasis tanggal & cakupan program.
 */
export const coupons: Coupon[] = [
  {
    code: "EARLYBIRD2026",
    type: "percent",
    value: 10,
    validUntil: "2026-12-31",
    minQty: 1,
    description: "Diskon early bird 10% untuk seluruh pelatihan online 2026.",
  },
  {
    code: "ROMBONGAN3",
    type: "percent",
    value: 15,
    validUntil: "2026-12-31",
    minQty: 3,
    description: "Diskon 15% untuk pendaftaran 3 peserta atau lebih.",
  },
];

export interface CouponValidationInput {
  code: string;
  programSlug: string;
  qty: number;
  today?: string;
}

export type CouponResult =
  | { valid: true; coupon: Coupon }
  | { valid: false; reason: string };

export function validateCoupon({
  code,
  programSlug,
  qty,
  today = new Date().toISOString().slice(0, 10),
}: CouponValidationInput): CouponResult {
  const normalized = code.trim().toUpperCase();
  const coupon = coupons.find((c) => c.code === normalized);
  if (!coupon) {
    return { valid: false, reason: "Kode kupon tidak ditemukan." };
  }
  if (today > coupon.validUntil) {
    return { valid: false, reason: "Kode kupon sudah kedaluwarsa." };
  }
  if (coupon.programSlugs && !coupon.programSlugs.includes(programSlug)) {
    return { valid: false, reason: "Kupon tidak berlaku untuk program ini." };
  }
  if (coupon.minQty && qty < coupon.minQty) {
    return {
      valid: false,
      reason: `Kupon berlaku untuk minimal ${coupon.minQty} peserta.`,
    };
  }
  return { valid: true, coupon };
}

export function applyCoupon(subtotal: number, coupon: Coupon): number {
  const discount =
    coupon.type === "percent"
      ? Math.round((subtotal * coupon.value) / 100)
      : coupon.value;
  return Math.min(discount, subtotal);
}

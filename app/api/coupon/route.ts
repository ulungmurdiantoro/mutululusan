import { NextResponse } from "next/server";
import { applyCoupon, validateCoupon } from "@/lib/coupons";
import { getProgram, lowestPrice } from "@/lib/programs";

interface CouponBody {
  code?: string;
  slug?: string;
  qty?: number;
  tier?: string;
}

export async function POST(request: Request) {
  let body: CouponBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ valid: false, reason: "Body tidak valid" }, { status: 400 });
  }

  const { code, slug, tier } = body;
  const qty = Number(body.qty) || 1;
  if (!code || !slug) {
    return NextResponse.json(
      { valid: false, reason: "Kode kupon dan program wajib diisi." },
      { status: 400 },
    );
  }

  const program = getProgram(slug);
  if (!program) {
    return NextResponse.json({ valid: false, reason: "Program tidak ditemukan." }, { status: 404 });
  }

  const result = validateCoupon({ code, programSlug: slug, qty });
  if (!result.valid) {
    return NextResponse.json(result, { status: 200 });
  }

  const unitPrice =
    program.tieredPrices?.find((t) => t.label === tier)?.price ??
    lowestPrice(program) ??
    0;
  const subtotal = unitPrice * qty;
  const discount = applyCoupon(subtotal, result.coupon);

  return NextResponse.json({
    valid: true,
    code: result.coupon.code,
    description: result.coupon.description,
    discount,
    total: subtotal - discount,
  });
}

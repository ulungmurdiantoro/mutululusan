import { NextResponse } from "next/server";
import {
  createSnapTransaction,
  generateOrderId,
  isMidtransConfigured,
} from "@/lib/midtrans";
import { getProgram } from "@/lib/programs";
import { applyCoupon, validateCoupon } from "@/lib/coupons";
import { createOrder } from "@/lib/orders";

interface CheckoutBody {
  slug?: string;
  batchId?: string;
  tier?: string;
  name?: string;
  email?: string;
  whatsapp?: string;
  institution?: string;
  qty?: number;
  couponCode?: string;
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid" }, { status: 400 });
  }

  const { slug, batchId, tier, name, email, whatsapp, institution, couponCode } = body;
  const qty = Number(body.qty) || 1;

  if (!slug || !batchId || !name || !email || !whatsapp) {
    return NextResponse.json(
      { error: "Data pendaftaran belum lengkap" },
      { status: 400 },
    );
  }
  if (qty < 1 || qty > 50) {
    return NextResponse.json(
      { error: "Jumlah peserta harus antara 1 dan 50" },
      { status: 400 },
    );
  }

  const program = getProgram(slug);
  if (!program) {
    return NextResponse.json({ error: "Program tidak ditemukan" }, { status: 404 });
  }

  const batch = program.batches.find((b) => b.id === batchId);
  if (!batch) {
    return NextResponse.json({ error: "Batch tidak ditemukan" }, { status: 404 });
  }

  // Harga selalu dihitung di server dari data program — jangan pernah dari client.
  let unitPrice: number | null = program.basePrice;
  let tierLabel = "";
  let tierName = "";
  if (program.tieredPrices?.length) {
    const selected =
      program.tieredPrices.find((t) => t.label === tier) ?? program.tieredPrices[0];
    unitPrice = selected.price;
    tierLabel = ` (${selected.label})`;
    tierName = selected.label;
  }
  if (unitPrice === null) {
    return NextResponse.json(
      { error: "Program ini didaftarkan melalui admin. Silakan hubungi WhatsApp kami." },
      { status: 422 },
    );
  }

  const subtotal = unitPrice * qty;

  // Validasi & terapkan kupon di server — jangan percaya nominal dari client.
  let discount = 0;
  let appliedCoupon: string | null = null;
  if (couponCode) {
    const result = validateCoupon({ code: couponCode, programSlug: slug, qty });
    if (result.valid) {
      discount = applyCoupon(subtotal, result.coupon);
      appliedCoupon = result.coupon.code;
    }
  }
  const grossAmount = subtotal - discount;

  if (!isMidtransConfigured()) {
    return NextResponse.json(
      {
        error:
          "Pembayaran online sedang tidak tersedia. Silakan daftar melalui WhatsApp admin.",
        code: "GATEWAY_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  const orderId = generateOrderId();

  try {
    const snap = await createSnapTransaction({
      transaction_details: { order_id: orderId, gross_amount: grossAmount },
      item_details: [
        {
          id: `${program.slug}:${batch.id}`,
          price: unitPrice,
          quantity: qty,
          name: `${program.title}${tierLabel}`.slice(0, 50),
        },
        ...(discount > 0
          ? [
              {
                id: `discount:${appliedCoupon}`,
                price: -discount,
                quantity: 1,
                name: `Diskon ${appliedCoupon}`.slice(0, 50),
              },
            ]
          : []),
      ],
      customer_details: {
        first_name: name.slice(0, 50),
        email,
        phone: whatsapp,
      },
      expiry: { unit: "hours", duration: 24 },
    });

    // Simpan order (best-effort). Kegagalan store tidak menggagalkan checkout.
    await createOrder({
      orderId,
      programSlug: program.slug,
      programTitle: program.title,
      batchId: batch.id,
      batchStartDate: batch.startDate,
      batchEndDate: batch.endDate,
      buyerName: name,
      email,
      whatsapp,
      institution: institution ?? "",
      qty,
      tier: tierName,
      subtotal,
      discount,
      couponCode: appliedCoupon,
      total: grossAmount,
      paymentChannel: null,
      gatewayToken: snap.token,
    });

    return NextResponse.json({
      orderId,
      token: snap.token,
      redirectUrl: snap.redirect_url,
      grossAmount,
      discount,
    });
  } catch (error) {
    console.error("[checkout] gagal membuat transaksi Snap:", error);
    return NextResponse.json(
      { error: "Gagal membuat transaksi pembayaran. Coba lagi atau hubungi admin." },
      { status: 502 },
    );
  }
}

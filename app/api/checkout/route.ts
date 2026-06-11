import { NextResponse } from "next/server";
import {
  createSnapTransaction,
  generateOrderId,
  isMidtransConfigured,
} from "@/lib/midtrans";
import { getProgram } from "@/lib/programs";

interface CheckoutBody {
  slug?: string;
  batchId?: string;
  tier?: string;
  name?: string;
  email?: string;
  whatsapp?: string;
  institution?: string;
  qty?: number;
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid" }, { status: 400 });
  }

  const { slug, batchId, tier, name, email, whatsapp } = body;
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
  if (program.tieredPrices?.length) {
    const selected =
      program.tieredPrices.find((t) => t.label === tier) ?? program.tieredPrices[0];
    unitPrice = selected.price;
    tierLabel = ` (${selected.label})`;
  }
  if (unitPrice === null) {
    return NextResponse.json(
      { error: "Program ini didaftarkan melalui admin. Silakan hubungi WhatsApp kami." },
      { status: 422 },
    );
  }

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
  const grossAmount = unitPrice * qty;

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
      ],
      customer_details: {
        first_name: name.slice(0, 50),
        email,
        phone: whatsapp,
      },
      expiry: { unit: "hours", duration: 24 },
    });

    return NextResponse.json({
      orderId,
      token: snap.token,
      redirectUrl: snap.redirect_url,
      grossAmount,
    });
  } catch (error) {
    console.error("[checkout] gagal membuat transaksi Snap:", error);
    return NextResponse.json(
      { error: "Gagal membuat transaksi pembayaran. Coba lagi atau hubungi admin." },
      { status: 502 },
    );
  }
}

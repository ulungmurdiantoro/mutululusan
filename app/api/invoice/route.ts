import { NextResponse } from "next/server";
import { getProgram } from "@/lib/programs";
import { createOrder } from "@/lib/orders";
import { sendEmail, sendWhatsApp } from "@/lib/notifications";
import { formatDateRange, formatRupiah } from "@/lib/format";
import { site } from "@/lib/site";

interface InvoiceBody {
  slug?: string;
  batchId?: string;
  tier?: string;
  institution?: string;
  picName?: string;
  email?: string;
  whatsapp?: string;
  npwp?: string;
  address?: string;
  qty?: number;
}

function invoiceNumber(): string {
  const d = new Date();
  const ym = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `INV/${ym}/${rand}`;
}

export function bankDetails() {
  return {
    bankName: process.env.BANK_NAME ?? "BCA",
    accountNumber: process.env.BANK_ACCOUNT ?? "—",
    accountHolder: process.env.BANK_HOLDER ?? site.name,
  };
}

export async function POST(request: Request) {
  let body: InvoiceBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid" }, { status: 400 });
  }

  const { slug, batchId, tier, institution, picName, email, whatsapp } = body;
  const qty = Number(body.qty) || 1;

  if (!slug || !batchId || !institution || !picName || !email || !whatsapp) {
    return NextResponse.json({ error: "Data belum lengkap" }, { status: 400 });
  }
  if (qty < 1 || qty > 200) {
    return NextResponse.json({ error: "Jumlah peserta tidak valid" }, { status: 400 });
  }

  const program = getProgram(slug);
  if (!program) {
    return NextResponse.json({ error: "Program tidak ditemukan" }, { status: 404 });
  }
  const batch = program.batches.find((b) => b.id === batchId);
  if (!batch) {
    return NextResponse.json({ error: "Batch tidak ditemukan" }, { status: 404 });
  }

  let unitPrice: number | null = program.basePrice;
  let tierName = "";
  if (program.tieredPrices?.length) {
    const selected =
      program.tieredPrices.find((t) => t.label === tier) ?? program.tieredPrices[0];
    unitPrice = selected.price;
    tierName = selected.label;
  }
  if (unitPrice === null) {
    return NextResponse.json(
      { error: "Harga program ini belum tersedia. Silakan hubungi admin." },
      { status: 422 },
    );
  }

  const total = unitPrice * qty;
  const number = invoiceNumber();
  const bank = bankDetails();

  await createOrder({
    orderId: number,
    userId: null,
    programSlug: program.slug,
    programTitle: program.title,
    batchId: batch.id,
    batchStartDate: batch.startDate,
    batchEndDate: batch.endDate,
    buyerName: picName,
    email,
    whatsapp,
    institution,
    qty,
    tier: tierName,
    subtotal: total,
    discount: 0,
    couponCode: null,
    total,
    paymentChannel: "invoice_instansi",
    gatewayToken: null,
  });

  const detail = `${program.title} — ${formatDateRange(batch.startDate, batch.endDate)} · ${qty} peserta · ${formatRupiah(total)}`;

  // Kirim invoice ke PIC + notifikasi ke admin (best-effort).
  await Promise.all([
    sendEmail({
      to: email,
      subject: `Invoice ${number} — ${program.title}`,
      html: `<div style="font-family:Arial,sans-serif"><h2>Invoice ${number}</h2><p>Kepada ${institution} (u.p. ${picName}),</p><p>${detail}</p><p>Pembayaran ke ${bank.bankName} ${bank.accountNumber} a.n. ${bank.accountHolder}. Konfirmasi setelah transfer melalui WhatsApp admin.</p></div>`,
    }),
    process.env.ADMIN_WHATSAPP
      ? sendWhatsApp({
          to: process.env.ADMIN_WHATSAPP,
          message: `🧾 Invoice instansi baru: ${number}\n${institution} (${picName})\n${detail}`,
        })
      : Promise.resolve(false),
  ]);

  return NextResponse.json({
    invoiceNumber: number,
    program: program.title,
    batch: formatDateRange(batch.startDate, batch.endDate),
    qty,
    unitPrice,
    total,
    bank,
  });
}

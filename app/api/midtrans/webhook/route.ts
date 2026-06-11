import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/midtrans";

type OrderStatus = "paid" | "pending" | "expired" | "cancelled" | "refunded" | "unknown";

function mapTransactionStatus(
  transactionStatus: string,
  fraudStatus?: string,
): OrderStatus {
  switch (transactionStatus) {
    case "capture":
      return fraudStatus === "accept" ? "paid" : "pending";
    case "settlement":
      return "paid";
    case "pending":
      return "pending";
    case "expire":
      return "expired";
    case "deny":
    case "cancel":
      return "cancelled";
    case "refund":
    case "partial_refund":
      return "refunded";
    default:
      return "unknown";
  }
}

export async function POST(request: Request) {
  let notification: Record<string, string>;
  try {
    notification = await request.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid" }, { status: 400 });
  }

  const { order_id, status_code, gross_amount, signature_key } = notification;
  if (!order_id || !status_code || !gross_amount || !signature_key) {
    return NextResponse.json({ error: "Field notifikasi tidak lengkap" }, { status: 400 });
  }

  const valid = await verifyWebhookSignature({
    order_id,
    status_code,
    gross_amount,
    signature_key,
  });
  if (!valid) {
    return NextResponse.json({ error: "Signature tidak valid" }, { status: 403 });
  }

  const status = mapTransactionStatus(
    notification.transaction_status,
    notification.fraud_status,
  );

  // Fase 3 blueprint: simpan order ke database, kirim e-receipt email,
  // dan notifikasi WhatsApp otomatis dari sini.
  console.log(
    `[midtrans-webhook] order=${order_id} status=${status} channel=${notification.payment_type ?? "-"} amount=${gross_amount}`,
  );

  return NextResponse.json({ ok: true });
}

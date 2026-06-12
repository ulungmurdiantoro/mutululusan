import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/midtrans";
import { getOrder, updateOrder, type OrderStatus } from "@/lib/orders";
import {
  receiptEmailHtml,
  receiptWhatsAppMessage,
  sendEmail,
  sendWhatsApp,
} from "@/lib/notifications";

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
      return "pending";
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
  const paymentChannel = notification.payment_type ?? null;

  const order = await getOrder(order_id);
  if (order) {
    const justPaid = status === "paid" && order.status !== "paid";
    await updateOrder(order_id, { status, paymentChannel });

    // Kirim e-receipt (email + WA) tepat sekali saat pertama menjadi PAID.
    if (justPaid && !order.notified.receipt) {
      await Promise.all([
        sendEmail({
          to: order.email,
          subject: `Pembayaran Berhasil — ${order.programTitle}`,
          html: receiptEmailHtml({ ...order, status, paymentChannel }),
        }),
        sendWhatsApp({
          to: order.whatsapp,
          message: receiptWhatsAppMessage({ ...order, status, paymentChannel }),
        }),
      ]);
      await updateOrder(order_id, { notified: { ...order.notified, receipt: true } });
    }
  }

  console.log(
    `[midtrans-webhook] order=${order_id} status=${status} channel=${paymentChannel ?? "-"} amount=${gross_amount}`,
  );

  return NextResponse.json({ ok: true });
}

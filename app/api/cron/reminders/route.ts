import { NextResponse } from "next/server";
import { listOrders, updateOrder } from "@/lib/orders";
import {
  reminderWhatsAppMessage,
  recoveryWhatsAppMessage,
  sendWhatsApp,
} from "@/lib/notifications";

/**
 * Endpoint cron untuk reminder H-3/H-1 dan recovery pembayaran pending.
 * Lindungi dengan header `Authorization: Bearer <CRON_SECRET>` (atau query
 * `?secret=`). Jadwalkan via Vercel Cron, GitHub Actions, atau cron eksternal,
 * mis. setiap hari pukul 08.00 WIB.
 */

function daysUntil(dateISO: string, today = new Date()): number {
  const start = new Date(`${dateISO}T00:00:00+07:00`).getTime();
  const ref = new Date(today.toISOString().slice(0, 10) + "T00:00:00+07:00").getTime();
  return Math.round((start - ref) / 86_400_000);
}

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization");
  if (header === `Bearer ${secret}`) return true;
  const url = new URL(request.url);
  return url.searchParams.get("secret") === secret;
}

async function run() {
  const orders = await listOrders();
  const summary = { reminderH3: 0, reminderH1: 0, recovery: 0, skipped: 0 };

  for (const order of orders) {
    const days = daysUntil(order.batchStartDate);

    // Reminder untuk peserta yang sudah bayar/terkonfirmasi.
    if (order.status === "paid" || order.status === "confirmed") {
      if (days === 3 && !order.notified.reminderH3) {
        const ok = await sendWhatsApp({
          to: order.whatsapp,
          message: reminderWhatsAppMessage(order, 3),
        });
        if (ok) {
          await updateOrder(order.orderId, {
            notified: { ...order.notified, reminderH3: true },
          });
          summary.reminderH3++;
        }
      } else if (days === 1 && !order.notified.reminderH1) {
        const ok = await sendWhatsApp({
          to: order.whatsapp,
          message: reminderWhatsAppMessage(order, 1),
        });
        if (ok) {
          await updateOrder(order.orderId, {
            notified: { ...order.notified, reminderH1: true },
          });
          summary.reminderH1++;
        }
      } else {
        summary.skipped++;
      }
      continue;
    }

    // Recovery untuk order pending yang batch-nya belum lewat.
    if (order.status === "pending" && days >= 0 && !order.notified.recovery) {
      const ok = await sendWhatsApp({
        to: order.whatsapp,
        message: recoveryWhatsAppMessage(order),
      });
      if (ok) {
        await updateOrder(order.orderId, {
          notified: { ...order.notified, recovery: true },
        });
        summary.recovery++;
      }
      continue;
    }

    summary.skipped++;
  }

  return summary;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }
  const summary = await run();
  return NextResponse.json({ ok: true, ...summary });
}

export async function POST(request: Request) {
  return GET(request);
}

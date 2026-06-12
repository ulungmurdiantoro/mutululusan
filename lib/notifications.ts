import { formatDateRange, formatRupiah } from "./format";
import type { Order } from "./orders";
import { site } from "./site";

/**
 * Lapisan notifikasi: email (Resend) & WhatsApp (Fonnte).
 * Keduanya degrade dengan baik — jika kunci API tidak diset, fungsi hanya
 * mencatat ke log dan mengembalikan false, tanpa melempar error. Ini menjaga
 * webhook & cron tetap berjalan meski integrasi belum dikonfigurasi.
 */

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export function isWhatsAppConfigured(): boolean {
  return Boolean(process.env.FONNTE_TOKEN);
}

/** Normalkan nomor ke format 62xxxx untuk Fonnte. */
function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
}

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? `mutululusan.id <noreply@${new URL(site.url).hostname}>`;
  if (!apiKey) {
    console.log(`[email] (tidak terkirim, RESEND_API_KEY kosong) → ${params.to}: ${params.subject}`);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: params.to, subject: params.subject, html: params.html }),
    });
    if (!res.ok) {
      console.error(`[email] Resend error ${res.status}: ${await res.text()}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[email] gagal mengirim:", error);
    return false;
  }
}

export async function sendWhatsApp(params: {
  to: string;
  message: string;
}): Promise<boolean> {
  const token = process.env.FONNTE_TOKEN;
  if (!token) {
    console.log(`[wa] (tidak terkirim, FONNTE_TOKEN kosong) → ${params.to}`);
    return false;
  }
  try {
    const res = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ target: normalizePhone(params.to), message: params.message }),
    });
    if (!res.ok) {
      console.error(`[wa] Fonnte error ${res.status}: ${await res.text()}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[wa] gagal mengirim:", error);
    return false;
  }
}

/* ── Template pesan ───────────────────────────────────────────── */

export function receiptEmailHtml(order: Order): string {
  return `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
    <h2 style="color:#286aa6">Pembayaran Berhasil — Selamat Bergabung!</h2>
    <p>Halo ${order.buyerName},</p>
    <p>Terima kasih, pembayaran Anda untuk pelatihan berikut telah kami terima:</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:6px 0;color:#64748b">Program</td><td style="text-align:right;font-weight:bold">${order.programTitle}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b">Batch</td><td style="text-align:right">${formatDateRange(order.batchStartDate, order.batchEndDate)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b">Jumlah peserta</td><td style="text-align:right">${order.qty}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b">Nomor order</td><td style="text-align:right">${order.orderId}</td></tr>
      <tr><td style="padding:8px 0;border-top:1px solid #e2e8f0;font-weight:bold">Total dibayar</td><td style="text-align:right;border-top:1px solid #e2e8f0;font-weight:bold;color:#286aa6">${formatRupiah(order.total)}</td></tr>
    </table>
    <p>Admin kami akan menghubungi WhatsApp Anda (${order.whatsapp}) dengan tautan grup peserta dan informasi Zoom paling lambat 1×24 jam kerja.</p>
    <p style="color:#64748b;font-size:12px">${site.name} — ${site.url}</p>
  </div>`;
}

export function receiptWhatsAppMessage(order: Order): string {
  return [
    `*Pembayaran Berhasil — ${site.name}* ✅`,
    "",
    `Halo ${order.buyerName}, terima kasih!`,
    `Pendaftaran Anda terkonfirmasi:`,
    "",
    `📚 ${order.programTitle}`,
    `📅 ${formatDateRange(order.batchStartDate, order.batchEndDate)}`,
    `👥 ${order.qty} peserta`,
    `🧾 Order: ${order.orderId}`,
    `💳 Total: ${formatRupiah(order.total)}`,
    "",
    "Tautan grup peserta & info Zoom akan kami kirimkan menjelang pelaksanaan. Sampai jumpa di kelas! 🎓",
  ].join("\n");
}

export function reminderWhatsAppMessage(order: Order, daysBefore: number): string {
  return [
    `*Pengingat Pelatihan H-${daysBefore}* ⏰`,
    "",
    `Halo ${order.buyerName}, pelatihan Anda akan segera dimulai:`,
    "",
    `📚 ${order.programTitle}`,
    `📅 ${formatDateRange(order.batchStartDate, order.batchEndDate)}`,
    `🕘 09.00–16.00 WIB`,
    "",
    "Pastikan koneksi internet & perangkat Anda siap. Tautan Zoom ada di grup peserta. Sampai jumpa! 🎓",
  ].join("\n");
}

export function recoveryWhatsAppMessage(order: Order): string {
  return [
    `*Selesaikan Pendaftaran Anda* 🪑`,
    "",
    `Halo ${order.buyerName}, kursi Anda untuk *${order.programTitle}* (${formatDateRange(order.batchStartDate, order.batchEndDate)}) masih menunggu pembayaran.`,
    "",
    `🧾 Order: ${order.orderId}`,
    `💳 Total: ${formatRupiah(order.total)}`,
    "",
    `Selesaikan sebelum batas waktu agar kursi tidak hangus. Butuh bantuan? Balas pesan ini.`,
  ].join("\n");
}

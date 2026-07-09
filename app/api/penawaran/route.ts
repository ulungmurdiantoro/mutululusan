import { NextResponse } from "next/server";
import { sendEmail, sendWhatsApp } from "@/lib/notifications";
import { site, waLink } from "@/lib/site";

interface PenawaranBody {
  jenis?: "Perguruan Tinggi" | "Industri & Laboratorium";
  institution?: string;
  picName?: string;
  jabatan?: string;
  email?: string;
  whatsapp?: string;
  kebutuhan?: string;
}

export async function POST(request: Request) {
  let body: PenawaranBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid" }, { status: 400 });
  }

  const { jenis, institution, picName, jabatan, email, whatsapp, kebutuhan } = body;

  if (!jenis || !institution || !picName || !email || !whatsapp || !kebutuhan) {
    return NextResponse.json(
      { error: "Mohon lengkapi seluruh data yang wajib diisi" },
      { status: 400 },
    );
  }

  const summary = [
    `🏢 Permintaan penawaran baru (${jenis})`,
    `Instansi: ${institution}`,
    `PIC: ${picName}${jabatan ? ` (${jabatan})` : ""}`,
    `Email: ${email}`,
    `WhatsApp: ${whatsapp}`,
    "",
    `Kebutuhan:`,
    kebutuhan,
  ].join("\n");

  await Promise.all([
    process.env.ADMIN_WHATSAPP
      ? sendWhatsApp({ to: process.env.ADMIN_WHATSAPP, message: summary })
      : Promise.resolve(false),
    sendEmail({
      to: site.email,
      subject: `Permintaan penawaran institusi — ${institution}`,
      html: `<pre style="font-family:Arial,sans-serif;white-space:pre-wrap">${summary}</pre>`,
    }),
    sendEmail({
      to: email,
      subject: `Permintaan Anda telah kami terima — ${site.name}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
        <h2 style="color:#286aa6">Permintaan Penawaran Diterima</h2>
        <p>Halo ${picName},</p>
        <p>Terima kasih, permintaan penawaran untuk <strong>${institution}</strong> sudah kami terima. Tim kami akan menghubungi Anda melalui email atau WhatsApp (${whatsapp}) paling lambat 1×24 jam kerja.</p>
        <p style="color:#64748b;font-size:12px">${site.name} — ${site.url}</p>
      </div>`,
    }),
  ]);

  return NextResponse.json({
    ok: true,
    fallbackWaLink: waLink(
      `Halo admin, kami dari ${institution} baru saja mengajukan penawaran (${jenis}) via website. Mohon ditindaklanjuti.`,
    ),
  });
}

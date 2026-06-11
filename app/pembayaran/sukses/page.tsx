import type { Metadata } from "next";
import Link from "next/link";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pembayaran Berhasil",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ order_id?: string }>;
}

export default async function SuksesPage({ searchParams }: PageProps) {
  const { order_id } = await searchParams;

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 13l4 4L19 7" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
          Pembayaran Berhasil — Selamat Bergabung! 🎉
        </h1>
        {order_id && (
          <p className="mt-2 text-sm text-slate-500">
            Nomor order: <span className="font-mono font-semibold">{order_id}</span>
          </p>
        )}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-left">
          <p className="font-bold text-slate-900">Langkah selanjutnya:</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
            <li>E-receipt dikirim ke email Anda secara otomatis.</li>
            <li>
              Admin akan menghubungi WhatsApp Anda dengan link grup peserta dan
              informasi Zoom (maksimal 1×24 jam kerja).
            </li>
            <li>Reminder otomatis dikirim H-3 dan H-1 sebelum pelatihan.</li>
          </ol>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={waLink(
              `Halo admin, saya sudah menyelesaikan pembayaran${order_id ? ` (order ${order_id})` : ""}. Mohon info grup peserta.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa px-5 py-2.5 text-sm"
          >
            Konfirmasi ke Admin
          </a>
          <Link href="/pelatihan" className="btn-outline px-5 py-2.5 text-sm">
            Lihat Program Lain
          </Link>
        </div>
      </div>
    </div>
  );
}

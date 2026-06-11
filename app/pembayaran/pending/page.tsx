import type { Metadata } from "next";
import Link from "next/link";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menunggu Pembayaran",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ order_id?: string }>;
}

export default async function PendingPage({ searchParams }: PageProps) {
  const { order_id } = await searchParams;

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="#b45309" strokeWidth="2" />
            <path d="M12 7v5l3 3" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
          Menunggu Pembayaran
        </h1>
        {order_id && (
          <p className="mt-2 text-sm text-slate-500">
            Nomor order: <span className="font-mono font-semibold">{order_id}</span>
          </p>
        )}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-left">
          <p className="text-sm leading-relaxed text-slate-600">
            Selesaikan pembayaran sesuai instruksi metode yang Anda pilih
            (instruksi juga dikirim ke email). Kursi Anda akan otomatis
            terkonfirmasi setelah pembayaran diterima —{" "}
            <strong className="text-slate-900">
              batas waktu pembayaran 24 jam
            </strong>
            .
          </p>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={waLink(
              `Halo admin, saya butuh bantuan menyelesaikan pembayaran${order_id ? ` (order ${order_id})` : ""}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa px-5 py-2.5 text-sm"
          >
            Butuh Bantuan? Chat Admin
          </a>
          <Link href="/konfirmasi-pembayaran" className="btn-outline px-5 py-2.5 text-sm">
            Konfirmasi Transfer Manual
          </Link>
        </div>
      </div>
    </div>
  );
}

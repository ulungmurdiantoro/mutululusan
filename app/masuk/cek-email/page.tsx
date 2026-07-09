import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cek Email Anda",
  robots: { index: false, follow: false },
};

export default function CekEmailPage() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Cek email Anda</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Kami sudah mengirim link masuk ke email Anda. Buka email tersebut
            dan klik link-nya untuk lanjut masuk. Link berlaku beberapa saat
            saja — bila kadaluwarsa, ulangi proses masuk.
          </p>
          <p className="mt-4 text-xs text-slate-400">
            Tidak menerima email? Cek folder spam, atau coba masuk dengan
            Google.
          </p>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Konfirmasi Pembayaran Manual",
  description:
    "Sudah transfer manual untuk pelatihan di mutululusan.id? Kirim bukti pembayaran Anda di sini agar kursi segera terkonfirmasi.",
  alternates: { canonical: "/konfirmasi-pembayaran" },
};

export default function KonfirmasiPage() {
  const waMessage =
    "Halo admin, saya ingin konfirmasi pembayaran manual.\n\nNama: \nProgram: \nBatch: \nNominal transfer: \nBank pengirim: \nTanggal transfer: \n\n(Bukti transfer saya lampirkan di chat ini.)";

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Konfirmasi Pembayaran Manual
        </h1>
        <p className="mt-3 text-slate-600">
          Halaman ini untuk peserta yang membayar melalui transfer manual (di
          luar pembayaran online otomatis). Kirimkan bukti transfer Anda agar
          kursi segera terkonfirmasi.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-slate-900">Cara konfirmasi:</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
            <li>Siapkan bukti transfer (screenshot/foto struk).</li>
            <li>
              Klik tombol di bawah — template pesan sudah disiapkan, lengkapi
              datanya.
            </li>
            <li>Lampirkan bukti transfer di chat WhatsApp.</li>
            <li>
              Tim kami memverifikasi maksimal 1×24 jam pada hari kerja dan
              mengirimkan konfirmasi kursi Anda.
            </li>
          </ol>
          <a
            href={waLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 w-full"
          >
            Kirim Konfirmasi via WhatsApp
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Lebih praktis: gunakan pembayaran online (QRIS/VA/e-wallet) saat
          checkout — kursi terkonfirmasi otomatis tanpa perlu konfirmasi manual.
        </p>
      </div>
    </div>
  );
}

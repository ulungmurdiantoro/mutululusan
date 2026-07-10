import Link from "next/link";
import { site, waLink } from "@/lib/site";
import { getAllPrograms } from "@/lib/programs";

export async function Footer() {
  const allPrograms = await getAllPrograms();
  const popular = allPrograms.filter((p) => p.priority).slice(0, 5);

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/MUTULULUSAN-LOGO-5.gif"
              alt="mutululusan.id"
              className="h-9 w-auto"
            />
            <span className="text-lg font-bold">
              <span className="text-sky-500">mutu</span>
              <span className="text-orange-500">lulusan.id</span>
            </span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed">
            Pelatihan & sertifikasi kompetensi laboratorium. Daftar online,
            bayar langsung, langsung dapat akses.
          </p>
          <a
            href={waLink("Halo admin mutululusan.id, saya ingin bertanya tentang pelatihan.")}
            className="mt-4 inline-block text-sm font-semibold text-green-600 hover:text-green-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Konsultasi via WhatsApp <span aria-hidden>→</span>
          </a>
        </div>

        <div>
          <p className="font-semibold text-slate-900">Program Populer</p>
          <ul className="mt-3 space-y-2 text-sm">
            {popular.map((p) => (
              <li key={p.slug}>
                <Link href={`/pelatihan/${p.slug}`} className="hover:text-sky-700">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">Jelajahi</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/pelatihan" className="hover:text-sky-700">Semua Pelatihan</Link></li>
            <li><Link href="/jadwal-pelatihan-2026" className="hover:text-sky-700">Jadwal 2026</Link></li>
            <li><Link href="/in-house-training" className="hover:text-sky-700">In-House Training</Link></li>
            <li><Link href="/blog" className="hover:text-sky-700">Blog</Link></li>
            <li><Link href="/tentang-kami" className="hover:text-sky-700">Tentang Kami</Link></li>
            <li><Link href="/faq" className="hover:text-sky-700">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">Bantuan & Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/kontak" className="hover:text-sky-700">Kontak</Link></li>
            <li><Link href="/invoice-instansi" className="hover:text-sky-700">Invoice Instansi</Link></li>
            <li><Link href="/konfirmasi-pembayaran" className="hover:text-sky-700">Konfirmasi Pembayaran</Link></li>
            <li><Link href="/syarat-ketentuan" className="hover:text-sky-700">Syarat & Ketentuan</Link></li>
            <li><Link href="/kebijakan-privasi" className="hover:text-sky-700">Kebijakan Privasi</Link></li>
            <li><Link href="/kebijakan-refund" className="hover:text-sky-700">Kebijakan Refund</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Hak cipta dilindungi.</p>
          <p>Pembayaran aman via QRIS, VA semua bank, e-wallet & kartu.</p>
        </div>
      </div>
    </footer>
  );
}

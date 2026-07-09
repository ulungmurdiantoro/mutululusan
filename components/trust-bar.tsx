interface TrustBadge {
  label: string;
  detail: string;
}

/**
 * Trust bar B2B. Hanya menampilkan fakta yang bisa diverifikasi (legalitas,
 * mitra resmi, jumlah program riil) — bukan logo institusi atau angka
 * alumni/peserta, karena belum ada data mitra nyata yang bisa dicantumkan.
 * Ganti `badges` dengan logo/angka riil begitu tersedia & sudah ada izin.
 */
export function TrustBar({ badges }: { badges: TrustBadge[] }) {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-center text-xs font-bold uppercase tracking-wide text-slate-400">
          Dipercaya oleh institusi &amp; industri
        </p>
        <div className="mt-5 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {badges.map((b) => (
            <div key={b.label} className="text-center">
              <p className="font-bold text-slate-900">{b.label}</p>
              <p className="text-sm text-slate-500">{b.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

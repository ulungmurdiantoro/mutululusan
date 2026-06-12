import type { Testimonial } from "@/lib/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating ${rating} dari 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-orange-400" : "text-slate-300"} aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

/**
 * Merender bagian testimoni hanya bila ada data asli. Saat kosong, komponen
 * mengembalikan null sehingga tidak ada placeholder/ulasan palsu yang tampil.
 */
export function Testimonials({
  items,
  heading = "Apa Kata Peserta",
}: {
  items: Testimonial[];
  heading?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{heading}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure
              key={`${t.name}-${t.date}`}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              {typeof t.rating === "number" && <Stars rating={t.rating} />}
              <blockquote className="mt-3 flex-1 text-slate-700">“{t.quote}”</blockquote>
              <figcaption className="mt-4 border-t border-slate-100 pt-3">
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

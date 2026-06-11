import Link from "next/link";
import type { Program } from "@/lib/programs";
import { nearestBatch, priceLabel, typeLabel } from "@/lib/programs";
import { formatDateRange } from "@/lib/format";

const typeBadgeColor: Record<Program["type"], string> = {
  online: "bg-sky-50 text-sky-700",
  hybrid: "bg-violet-50 text-violet-700",
  offline: "bg-orange-50 text-orange-700",
};

export function ProgramCard({ program }: { program: Program }) {
  const batch = nearestBatch(program);

  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-md">
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeBadgeColor[program.type]}`}
        >
          {typeLabel[program.type]}
        </span>
        {program.jp && (
          <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700">
            {program.jp} JP
          </span>
        )}
      </div>

      <h3 className="mt-3 font-bold leading-snug text-slate-900">
        <Link href={`/pelatihan/${program.slug}`} className="hover:text-sky-700">
          {program.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-slate-500">{program.subtitle}</p>

      {batch && (
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-medium text-slate-900">Batch terdekat:</span>{" "}
          {formatDateRange(batch.startDate, batch.endDate)}
          {batch.location ? ` · ${batch.location}` : ""}
        </p>
      )}

      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
        <p className="text-lg font-bold text-sky-700">{priceLabel(program)}</p>
        <Link
          href={`/pelatihan/${program.slug}`}
          className="btn-outline px-4 py-2 text-sm"
        >
          Lihat & Daftar
        </Link>
      </div>
    </article>
  );
}

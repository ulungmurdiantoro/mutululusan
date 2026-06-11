"use client";

import { useState, type ReactNode } from "react";
import type { ProgramType } from "@/lib/programs";

interface CatalogItem {
  key: string;
  type: ProgramType;
  card: ReactNode;
}

const filters: { value: ProgramType | "all"; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "online", label: "Online" },
  { value: "hybrid", label: "Hybrid" },
  { value: "offline", label: "Offline" },
];

export function CatalogFilter({ items }: { items: CatalogItem[] }) {
  const [active, setActive] = useState<ProgramType | "all">("all");
  const visible = items.filter((item) => active === "all" || item.type === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter format pelatihan">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setActive(f.value)}
            aria-pressed={active === f.value}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              active === f.value
                ? "bg-sky-700 text-white"
                : "border border-slate-300 text-slate-600 hover:border-sky-700 hover:text-sky-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <div key={item.key}>{item.card}</div>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          Tidak ada program untuk filter ini.
        </p>
      )}
    </div>
  );
}

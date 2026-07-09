"use client";

import { useState, type ReactNode } from "react";
import type { ProgramType } from "@/lib/programs";
import { careerCategories } from "@/lib/career-categories";

interface CatalogItem {
  key: string;
  type: ProgramType;
  category?: string;
  card: ReactNode;
}

const modeFilters: { value: ProgramType | "all"; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
];

const categoryFilters = [
  { value: "all" as const, label: "Semua Bidang" },
  ...careerCategories.map((c) => ({ value: c.key, label: c.name })),
];

const categoryTabStyle: Record<string, string> = {
  mgmt: "border-sky-300 text-sky-700",
  sus: "border-emerald-300 text-emerald-700",
  lab: "border-teal-300 text-teal-700",
  eng: "border-amber-300 text-amber-800",
};

export function CatalogFilter({ items }: { items: CatalogItem[] }) {
  const [mode, setMode] = useState<ProgramType | "all">("all");
  const [category, setCategory] = useState<string>("all");

  const visible = items.filter(
    (item) =>
      (mode === "all" || item.type === mode) &&
      (category === "all" || item.category === category),
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter format pelatihan">
        {modeFilters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setMode(f.value)}
            aria-pressed={mode === f.value}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === f.value
                ? "bg-sky-700 text-white"
                : "border border-slate-300 text-slate-600 hover:border-sky-700 hover:text-sky-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter bidang karier">
        {categoryFilters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setCategory(f.value)}
            aria-pressed={category === f.value}
            className={`rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition ${
              category === f.value
                ? "border-transparent bg-slate-900 text-white"
                : `${categoryTabStyle[f.value] ?? "border-slate-300 text-slate-600"} hover:opacity-80`
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

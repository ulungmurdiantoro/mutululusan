"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { ProgramType } from "@/lib/programs";
import { careerCategories } from "@/lib/career-categories";

interface CatalogItem {
  key: string;
  title: string;
  type: ProgramType;
  category?: string;
  hasFixedPrice: boolean;
  card: ReactNode;
}

type PriceFilter = "all" | "fixed" | "custom";

const modeFilters: { value: ProgramType | "all"; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
];

const categoryFilters = [
  { value: "all" as const, label: "Semua Bidang" },
  ...careerCategories.map((c) => ({ value: c.key, label: c.name })),
];

const priceFilters: { value: PriceFilter; label: string }[] = [
  { value: "all", label: "Semua Harga" },
  { value: "fixed", label: "Ada Harga Tetap" },
  { value: "custom", label: "Custom Pricing" },
];

const categoryTabStyle: Record<string, string> = {
  mgmt: "border-sky-300 text-sky-700",
  sus: "border-emerald-300 text-emerald-700",
  lab: "border-teal-300 text-teal-700",
  eng: "border-amber-300 text-amber-800",
};

export function CatalogFilter({ items }: { items: CatalogItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<ProgramType | "all">(
    (searchParams.get("format") as ProgramType | "all") || "all",
  );
  const [category, setCategory] = useState<string>(searchParams.get("kategori") || "all");
  const [price, setPrice] = useState<PriceFilter>(
    (searchParams.get("harga") as PriceFilter) || "all",
  );
  const [search, setSearch] = useState(searchParams.get("cari") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce search 300ms sebelum dipakai untuk filter & URL.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Sinkronkan filter aktif ke URL query params agar shareable/bookmarkable.
  useEffect(() => {
    const params = new URLSearchParams();
    if (mode !== "all") params.set("format", mode);
    if (category !== "all") params.set("kategori", category);
    if (price !== "all") params.set("harga", price);
    if (debouncedSearch) params.set("cari", debouncedSearch);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, category, price, debouncedSearch, pathname]);

  const visible = items.filter(
    (item) =>
      (mode === "all" || item.type === mode) &&
      (category === "all" || item.category === category) &&
      (price === "all" || (price === "fixed" ? item.hasFixedPrice : !item.hasFixedPrice)) &&
      (debouncedSearch.trim() === "" ||
        item.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase())),
  );

  function resetFilters() {
    setMode("all");
    setCategory("all");
    setPrice("all");
    setSearch("");
  }

  return (
    <div>
      <label className="block">
        <span className="sr-only">Cari program</span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama program..."
          className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:outline-none"
        />
      </label>

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

      {/* Filter tipe harga disembunyikan sementara — lihat priceFilters di atas untuk restore. */}

      <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item) => (
            <motion.div
              key={item.key}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              {item.card}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-slate-500">Tidak ada program untuk filter ini.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="btn-outline mt-4 min-h-11 px-5 py-2.5 text-sm"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}

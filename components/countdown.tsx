"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

function computeLeft(targetISO: string): TimeLeft | null {
  // Batch dimulai pukul 09.00 WIB (UTC+7).
  const target = new Date(`${targetISO}T09:00:00+07:00`).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
  };
}

export function Countdown({ targetDate }: { targetDate: string }) {
  const [left, setLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLeft(computeLeft(targetDate));
    const interval = setInterval(() => setLeft(computeLeft(targetDate)), 60_000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted || !left) return null;

  const units = [
    { value: left.days, label: "hari" },
    { value: left.hours, label: "jam" },
    { value: left.minutes, label: "menit" },
  ];

  return (
    <div className="flex items-center gap-2" aria-label="Hitung mundur menuju batch">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex min-w-12 flex-col items-center rounded-lg bg-slate-900/5 px-2 py-1.5"
        >
          <span className="text-base font-bold tabular-nums text-slate-900">{u.value}</span>
          <span className="text-[10px] uppercase tracking-wide text-slate-500">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

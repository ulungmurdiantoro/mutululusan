"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/pelatihan", label: "Pelatihan" },
  { href: "/jadwal-pelatihan-2026", label: "Jadwal 2026" },
  { href: "/sertifikasi-kompetensi", label: "Sertifikasi" },
  { href: "/in-house-training", label: "In-House" },
  { href: "/blog", label: "Blog" },
  { href: "/kontak", label: "Kontak" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
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

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-sky-700"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/pelatihan" className="btn-primary px-4 py-2 text-sm">
            Daftar Pelatihan
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 lg:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 pb-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block border-b border-slate-100 py-3 text-sm font-medium text-slate-700"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/pelatihan"
            className="btn-primary mt-4 w-full"
            onClick={() => setOpen(false)}
          >
            Daftar Pelatihan
          </Link>
        </nav>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ContactPickerModal } from "./contact-picker";

const navLinks = [
  { href: "/individu", label: "Untuk Individu" },
  { href: "/pelatihan", label: "Pelatihan" },
  { href: "/jadwal-pelatihan-2026", label: "Jadwal 2026" },
  { href: "/in-house-training", label: "In-House" },
  { href: "/blog", label: "Blog" },
  { href: "/kontak", label: "Kontak" },
];

function initial(name?: string | null, email?: string | null) {
  return (name?.trim()?.[0] ?? email?.trim()?.[0] ?? "U").toUpperCase();
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0];

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

          {status === "authenticated" && user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/akun"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-sky-700"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                  {initial(user.name, user.email)}
                </span>
                <span className="max-w-32 truncate">{firstName ?? "Akun"}</span>
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm font-medium text-slate-500 hover:text-sky-700"
              >
                Keluar
              </button>
            </div>
          ) : (
            <Link
              href="/masuk"
              className="text-sm font-semibold text-sky-700 hover:text-sky-800"
            >
              Masuk
            </Link>
          )}

          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="text-sm font-medium text-slate-600 hover:text-sky-700"
          >
            Hubungi Kami
          </button>

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

          {status === "authenticated" && user ? (
            <>
              <Link
                href="/akun"
                className="flex items-center gap-2 border-b border-slate-100 py-3 text-sm font-medium text-slate-700"
                onClick={() => setOpen(false)}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                  {initial(user.name, user.email)}
                </span>
                Akun saya
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="block w-full border-b border-slate-100 py-3 text-left text-sm font-medium text-slate-500"
              >
                Keluar
              </button>
            </>
          ) : (
            <Link
              href="/masuk"
              className="block border-b border-slate-100 py-3 text-sm font-semibold text-sky-700"
              onClick={() => setOpen(false)}
            >
              Masuk
            </Link>
          )}

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setContactOpen(true);
            }}
            className="block w-full border-b border-slate-100 py-3 text-left text-sm font-medium text-slate-700"
          >
            Hubungi Kami
          </button>

          <Link
            href="/pelatihan"
            className="btn-primary mt-4 w-full"
            onClick={() => setOpen(false)}
          >
            Daftar Pelatihan
          </Link>
        </nav>
      )}

      <ContactPickerModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </header>
  );
}

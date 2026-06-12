"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Membungkus aplikasi dengan SessionProvider tanpa prop `session`, sehingga
 * status login diambil di sisi klien (`/api/auth/session`). Dengan begitu
 * halaman konten tetap statis/ISR untuk SEO — hanya status auth yang hidrasi
 * di klien.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

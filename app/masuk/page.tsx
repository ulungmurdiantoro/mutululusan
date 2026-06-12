import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { paymentMicrocopy } from "@/lib/site";
import { LoginButtons } from "./login-buttons";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun mutululusan.id untuk mendaftar pelatihan dan mengakses dashboard peserta.",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

// Hanya izinkan callback internal (cegah open-redirect).
function safeCallback(raw?: string): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/akun";
}

export default async function MasukPage({ searchParams }: PageProps) {
  const { callbackUrl } = await searchParams;
  const target = safeCallback(callbackUrl);

  const session = await auth();
  if (session?.user) redirect(target);

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Masuk ke mutululusan.id</h1>
          <p className="mt-2 text-sm text-slate-600">
            Masuk untuk mendaftar pelatihan dan mengakses dashboard peserta —
            rekaman, sertifikat, dan materi Anda dalam satu tempat.
          </p>

          <div className="mt-6">
            <LoginButtons callbackUrl={target} />
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            Login email tanpa password akan segera tersedia.
          </p>

          <p className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-500">
            Dengan masuk, Anda menyetujui{" "}
            <Link href="/syarat-ketentuan" className="font-semibold text-sky-700 hover:underline">
              Syarat &amp; Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="/kebijakan-privasi" className="font-semibold text-sky-700 hover:underline">
              Kebijakan Privasi
            </Link>
            .
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">{paymentMicrocopy}</p>
      </div>
    </div>
  );
}

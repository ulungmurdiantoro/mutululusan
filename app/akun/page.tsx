import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
  title: "Akun Saya",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AkunPage() {
  const session = await auth();
  if (!session?.user) redirect("/masuk?callbackUrl=/akun");

  const user = session.user;

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Akun Saya</h1>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit" className="text-sm font-semibold text-sky-700 hover:underline">
              Keluar
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Masuk sebagai</p>
          <p className="mt-1 font-semibold text-slate-900">{user.name ?? "Peserta"}</p>
          <p className="text-sm text-slate-600">{user.email}</p>
          {user.role === "admin" && (
            <Link
              href="/admin"
              className="mt-4 inline-block rounded-lg bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100"
            >
              Buka Dashboard Admin →
            </Link>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-6">
          <h2 className="font-bold text-slate-900">Pelatihan Saya</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Dashboard riwayat pelatihan — beserta rekaman Zoom, e-sertifikat,
            materi, dan dokumentasi — sedang kami siapkan. Untuk sementara,
            riwayat pendaftaran &amp; pembayaran Anda dikirim ke email dan
            WhatsApp setelah checkout.
          </p>
          <Link href="/pelatihan" className="btn-primary mt-4">
            Jelajahi Pelatihan
          </Link>
        </div>
      </div>
    </div>
  );
}

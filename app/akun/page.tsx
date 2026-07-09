import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { listOrdersForUser } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Akun Saya",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AkunPage() {
  const session = await auth();
  if (!session?.user) redirect("/masuk?callbackUrl=/akun");

  const user = session.user;
  const orders = await listOrdersForUser(user.id, user.email ?? "");
  const trainingCount = orders.filter((o) =>
    ["paid", "confirmed", "completed"].includes(o.status),
  ).length;

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

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-slate-900">Pelatihan Saya</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {trainingCount > 0
              ? `Anda punya ${trainingCount} pelatihan lunas/terkonfirmasi — rekaman Zoom, materi, dokumentasi, dan e-sertifikat tersedia di dashboard.`
              : "Belum ada pelatihan yang lunas/terkonfirmasi pada akun ini."}
          </p>
          <Link href="/akun/pelatihan" className="btn-primary mt-4">
            Buka Dashboard Pelatihan →
          </Link>
        </div>
      </div>
    </div>
  );
}

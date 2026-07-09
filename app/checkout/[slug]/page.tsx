import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { getProgram, upcomingBatches } from "@/lib/programs";
import { waLink } from "@/lib/site";
import { auth } from "@/auth";
import { CheckoutForm } from "./checkout-form";

// Checkout bersifat per-pengguna (wajib login) → render dinamis, bukan statis.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ batch?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);
  return {
    title: program ? `Checkout — ${program.title}` : "Checkout",
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { batch: batchParam } = await searchParams;
  const program = await getProgram(slug);
  if (!program) notFound();

  // Wajib login sebelum pembayaran online (jalur WhatsApp tetap terbuka di
  // halaman program). Kembalikan ke checkout ini setelah login.
  const session = await auth();
  if (!session?.user) {
    const callback = `/checkout/${slug}${batchParam ? `?batch=${batchParam}` : ""}`;
    redirect(`/masuk?callbackUrl=${encodeURIComponent(callback)}`);
  }

  const batches = upcomingBatches(program);
  const registerViaAdmin =
    program.basePrice === null && !program.tieredPrices?.length;

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href={`/pelatihan/${program.slug}`} className="hover:text-sky-700">
            ← Kembali ke halaman program
          </Link>
        </nav>

        <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
          Pendaftaran {program.title}
        </h1>
        <p className="mt-2 text-slate-600">{program.subtitle}</p>

        {registerViaAdmin || batches.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-semibold text-slate-900">
              {batches.length === 0
                ? "Belum ada batch yang dibuka untuk program ini."
                : "Pendaftaran program ini dilayani langsung oleh admin."}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Hubungi admin via WhatsApp — respons cepat di jam kerja.
            </p>
            <a
              href={waLink(`Halo admin, saya ingin mendaftar ${program.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-5"
            >
              Daftar via WhatsApp
            </a>
          </div>
        ) : (
          <Suspense fallback={null}>
            <CheckoutForm
              program={{
                slug: program.slug,
                title: program.title,
                basePrice: program.basePrice,
                tieredPrices: program.tieredPrices ?? null,
                batches: batches.map((b) => ({
                  id: b.id,
                  startDate: b.startDate,
                  endDate: b.endDate,
                  mode: b.mode,
                  location: b.location ?? null,
                })),
              }}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

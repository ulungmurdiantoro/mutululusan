import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { site, waLink } from "@/lib/site";
import { GradientMeshBackground } from "@/components/motion/GradientMeshBackground";
import { NetworkVisualization } from "@/components/motion/NetworkVisualization";

export const metadata: Metadata = {
  title: "Kontak Kami — WhatsApp, Email & Pendaftaran Instansi",
  description:
    "Hubungi tim mutululusan.id: WhatsApp admin, email, pendaftaran instansi, dan bantuan pembayaran. Respons cepat di jam kerja.",
  alternates: { canonical: "/kontak" },
};

export default function KontakPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
        <GradientMeshBackground />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <NetworkVisualization />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-12">
          <Breadcrumb items={[{ label: "Kontak" }]} />
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Hubungi Kami</h1>
          <p className="mt-3 text-slate-600">
            Tim kami siap membantu pertanyaan seputar program, pendaftaran, dan
            pembayaran — Senin–Jumat, 08.00–17.00 WIB.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="grid gap-5 sm:grid-cols-2">
            <a
              href={waLink("Halo admin mutululusan.id, saya ingin bertanya.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-200 p-6 transition hover:border-green-400 hover:shadow-md"
            >
              <p className="font-bold text-slate-900">WhatsApp Admin</p>
              <p className="mt-1 text-sm text-slate-600">
                Jalur tercepat untuk pendaftaran, konsultasi program, dan bantuan
                pembayaran.
              </p>
              <p className="mt-3 text-sm font-semibold text-green-600">
                Chat sekarang <span aria-hidden>→</span>
              </p>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="rounded-xl border border-slate-200 p-6 transition hover:border-sky-400 hover:shadow-md"
            >
              <p className="font-bold text-slate-900">Email</p>
              <p className="mt-1 text-sm text-slate-600">
                Untuk penawaran instansi, kerja sama, dan dokumen resmi.
              </p>
              <p className="mt-3 text-sm font-semibold text-sky-700">{site.email}</p>
            </a>

            <Link
              href="/konfirmasi-pembayaran"
              className="rounded-xl border border-slate-200 p-6 transition hover:border-sky-400 hover:shadow-md"
            >
              <p className="font-bold text-slate-900">Konfirmasi Pembayaran</p>
              <p className="mt-1 text-sm text-slate-600">
                Sudah transfer manual? Kirim bukti pembayaran Anda di sini.
              </p>
              <p className="mt-3 text-sm font-semibold text-sky-700">
                Konfirmasi <span aria-hidden>→</span>
              </p>
            </Link>

            <Link
              href="/in-house-training"
              className="rounded-xl border border-slate-200 p-6 transition hover:border-sky-400 hover:shadow-md"
            >
              <p className="font-bold text-slate-900">Pendaftaran Instansi</p>
              <p className="mt-1 text-sm text-slate-600">
                Butuh invoice resmi atau pelatihan khusus untuk tim? Kami siap
                membantu.
              </p>
              <p className="mt-3 text-sm font-semibold text-sky-700">
                Pelajari <span aria-hidden>→</span>
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

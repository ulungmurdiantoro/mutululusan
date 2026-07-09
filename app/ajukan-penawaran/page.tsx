import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { site, waLink } from "@/lib/site";
import { PenawaranForm } from "./penawaran-form";

export const metadata: Metadata = {
  title: "Ajukan Penawaran Pelatihan untuk Institusi",
  description:
    "Ajukan permintaan penawaran pelatihan & sertifikasi kompetensi untuk perguruan tinggi atau industri/laboratorium Anda. Tim kami kirimkan proposal tertulis.",
  alternates: { canonical: "/ajukan-penawaran" },
};

export default function AjukanPenawaranPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ajukan Penawaran",
        item: `${site.url}/ajukan-penawaran`,
      },
    ],
  };

  return (
    <div className="bg-slate-50">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sky-700">
            ← Beranda
          </Link>
        </nav>

        <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
          Ajukan Penawaran untuk Institusi
        </h1>
        <p className="mt-2 text-slate-600">
          Ceritakan kebutuhan pelatihan atau sertifikasi kompetensi institusi/perusahaan
          Anda — tim kami akan mengirimkan penawaran atau proposal tertulis.
        </p>

        <PenawaranForm />

        <p className="mt-6 text-center text-sm text-slate-500">
          Butuh respons lebih cepat?{" "}
          <a
            href={waLink("Halo admin, kami ingin bertanya tentang kerja sama institusi dengan mutululusan.id.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sky-700 hover:underline"
          >
            Hubungi via WhatsApp
          </a>
          .
        </p>
      </div>
    </div>
  );
}

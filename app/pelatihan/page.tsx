import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ProgramCard } from "@/components/program-card";
import { getAllPrograms } from "@/lib/programs";
import { site, waLink } from "@/lib/site";
import { CatalogFilter } from "./catalog-filter";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Katalog Pelatihan Laboratorium 2026 — 16 Program",
  description:
    "Pilih dari 16 program pelatihan laboratorium 2026: ISO 17025, K3 lab, GLP, QC/QA, sensori pangan. Sertifikat 24 JP, daftar & bayar online!",
  alternates: { canonical: "/pelatihan" },
};

export default function CatalogPage() {
  const programs = getAllPrograms();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: site.url },
      { "@type": "ListItem", position: 2, name: "Pelatihan", item: `${site.url}/pelatihan` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sky-700">Beranda</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">Pelatihan</span>
          </nav>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Katalog Pelatihan Laboratorium 2026
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            {programs.length} program pelatihan kompetensi bidang laboratorium.
            Semua kelas online dilengkapi e-sertifikat 24 JP, rekaman, dan
            materi — daftar dan bayar langsung di website.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <CatalogFilter
            items={programs.map((program) => ({
              key: program.slug,
              type: program.type,
              card: <ProgramCard program={program} />,
            }))}
          />
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Bingung memilih program yang tepat?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Ceritakan latar belakang dan tujuan karier Anda — admin kami akan
            merekomendasikan program yang paling sesuai.
          </p>
          <a
            href={waLink("Halo admin, tolong bantu saya memilih program pelatihan yang sesuai.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa mt-5"
          >
            Konsultasi Gratis via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

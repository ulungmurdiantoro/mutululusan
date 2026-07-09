import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Kami — Platform Pelatihan Kompetensi Laboratorium",
  description:
    "mutululusan.id adalah platform pelatihan kompetensi bidang laboratorium — daftar online, bayar langsung, langsung dapat akses. Sertifikasi kompetensi bersama mitra resmi kami, LSP Edukia.",
  alternates: { canonical: "/tentang-kami" },
};

export default function TentangPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: site.url },
      { "@type": "ListItem", position: 2, name: "Tentang Kami", item: `${site.url}/tentang-kami` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Tentang mutululusan.id
          </h1>
          <p className="mt-3 text-slate-600">
            Meningkatkan mutu sumber daya laboratorium Indonesia, satu peserta
            pelatihan dalam satu waktu.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-12 leading-relaxed text-slate-600">
          <p>
            <strong className="text-slate-900">mutululusan.id</strong> adalah
            platform penjualan pelatihan kompetensi bidang
            laboratorium. Kami percaya bahwa peningkatan kompetensi tidak boleh
            dipersulit oleh proses pendaftaran yang berbelit — karena itu seluruh
            program kami dapat didaftar dan dibayar langsung secara online dalam
            hitungan menit.
          </p>
          <p>
            Program kami mencakup bidang-bidang inti dunia laboratorium:
            keselamatan dan kesehatan kerja laboratorium, Good Laboratory
            Practice, quality control dan quality assurance, jaminan mutu,
            hingga pengujian sensori pangan. Seluruh kelas online
            dilengkapi e-sertifikat 24 JP, rekaman, dan materi yang dapat diakses
            ulang.
          </p>
          <p>
            Bagi peserta yang ingin melangkah lebih jauh, sertifikat pelatihan
            kami menjadi bekal untuk mengikuti{" "}
            <Link href="/sertifikasi-kompetensi" className="font-semibold text-sky-700 hover:underline">
              sertifikasi kompetensi
            </Link>{" "}
            yang diselenggarakan mitra resmi kami, LSP Edukia — pengakuan formal
            atas keahlian melalui asesmen.
          </p>
          <p>
            Kami juga melayani kebutuhan instansi melalui{" "}
            <Link href="/in-house-training" className="font-semibold text-sky-700 hover:underline">
              in-house training
            </Link>{" "}
            dengan materi dan jadwal yang disesuaikan, serta pendaftaran kelas
            publik dengan invoice resmi.
          </p>

          <div className="rounded-2xl bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">Hubungi Kami</h2>
            <p className="mt-2 text-sm">
              Email: <a href={`mailto:${site.email}`} className="font-semibold text-sky-700">{site.email}</a>
              <br />
              WhatsApp:{" "}
              <a
                href={waLink("Halo admin mutululusan.id!")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sky-700"
              >
                chat admin
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

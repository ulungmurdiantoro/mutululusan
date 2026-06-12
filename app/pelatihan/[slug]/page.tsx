import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Countdown } from "@/components/countdown";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { ProgramCard } from "@/components/program-card";
import { formatDateRange } from "@/lib/format";
import {
  getAllPrograms,
  getProgram,
  getRelatedPrograms,
  lowestPrice,
  nearestBatch,
  priceLabel,
  typeLabel,
  upcomingBatches,
} from "@/lib/programs";
import { paymentMicrocopy, site, waLink } from "@/lib/site";
import { Testimonials } from "@/components/testimonials";
import { getAggregateRating, getTestimonials } from "@/lib/testimonials";

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPrograms().map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};
  return {
    title: program.seoTitle,
    description: program.seoDescription,
    keywords: program.keywords,
    alternates: { canonical: `/pelatihan/${program.slug}` },
    openGraph: {
      title: program.seoTitle,
      description: program.seoDescription,
      url: `${site.url}/pelatihan/${program.slug}`,
      type: "website",
    },
  };
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const batches = upcomingBatches(program);
  const batch = nearestBatch(program);
  const price = lowestPrice(program);
  const related = getRelatedPrograms(program);
  const hasConfirmationNote = batches.some((b) => b.needsConfirmation);

  const waMessage = `Halo admin, saya ingin mendaftar pelatihan ${program.title}${
    batch ? ` batch ${formatDateRange(batch.startDate, batch.endDate)}` : ""
  }. Mohon informasinya.`;

  const checkoutHref = batch ? `/checkout/${program.slug}?batch=${batch.id}` : null;
  const canCheckout = price !== null && checkoutHref !== null;
  const primaryHref = canCheckout ? checkoutHref! : waLink(waMessage);
  const primaryLabel = canCheckout ? "Daftar & Bayar Sekarang" : "Tanya Admin & Daftar";

  const programTestimonials = getTestimonials(program.slug);
  const aggregateRating = getAggregateRating(program.slug);

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Pelatihan ${program.title} (${program.subtitle})`,
    description: program.seoDescription,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    // AggregateRating hanya jika ada ulasan asli (lihat blueprint §11).
    ...(aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(aggregateRating.ratingValue),
        reviewCount: String(aggregateRating.reviewCount),
      },
    }),
    ...(price !== null && {
      offers: {
        "@type": "Offer",
        price: String(price),
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        url: `${site.url}/pelatihan/${program.slug}`,
      },
    }),
    hasCourseInstance: batches.map((b) => ({
      "@type": "CourseInstance",
      courseMode: b.mode,
      startDate: b.startDate,
      endDate: b.endDate,
      location: b.location
        ? { "@type": "Place", name: b.location, address: b.location }
        : { "@type": "VirtualLocation", url: `${site.url}/pelatihan/${program.slug}` },
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: program.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: site.url },
      { "@type": "ListItem", position: 2, name: "Pelatihan", item: `${site.url}/pelatihan` },
      {
        "@type": "ListItem",
        position: 3,
        name: program.title,
        item: `${site.url}/pelatihan/${program.slug}`,
      },
    ],
  };

  return (
    <div className="pb-20 md:pb-0">
      <JsonLd data={courseJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Above the fold */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sky-700">Beranda</Link>
            <span className="mx-2">/</span>
            <Link href="/pelatihan" className="hover:text-sky-700">Pelatihan</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">{program.title}</span>
          </nav>

          <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-sky-700 px-3 py-1 text-xs font-semibold text-white">
                  {typeLabel[program.type]}
                </span>
                {program.jp && (
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800">
                    e-Sertifikat {program.jp} JP
                  </span>
                )}
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                  {program.durationDays} hari
                </span>
                {batch && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                    Batch terdekat: {formatDateRange(batch.startDate, batch.endDate)}
                  </span>
                )}
              </div>

              <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                Pelatihan {program.title} — {program.subtitle}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                {program.excerpt}
              </p>

              {batch && (
                <div className="mt-6 flex items-center gap-4">
                  <p className="text-sm font-medium text-slate-600">Batch dimulai dalam:</p>
                  <Countdown targetDate={batch.startDate} />
                </div>
              )}
            </div>

            {/* Kartu harga — sticky di desktop */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
                <p className="text-sm text-slate-500">Investasi pelatihan</p>
                {program.tieredPrices ? (
                  <div className="mt-1 space-y-1">
                    {program.tieredPrices.map((t) => (
                      <p key={t.label} className="text-slate-900">
                        <span className="text-2xl font-bold text-sky-700">
                          Rp {t.price.toLocaleString("id-ID")}
                        </span>{" "}
                        <span className="text-sm text-slate-500">/ {t.label.toLowerCase()}</span>
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-1 text-3xl font-bold text-sky-700">
                    {priceLabel(program)}
                  </p>
                )}
                <p className="mt-1 text-sm text-slate-500">per peserta</p>

                <Link href={primaryHref} className="btn-primary mt-5 w-full">
                  {primaryLabel}
                </Link>
                <a
                  href={waLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa mt-3 w-full"
                >
                  Tanya Admin via WA
                </a>
                <p className="mt-3 text-center text-xs text-slate-500">{paymentMicrocopy}</p>

                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  {program.benefits.slice(0, 4).map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-sky-600" aria-hidden>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0 py-12">
            {/* Pilihan batch */}
            <section aria-labelledby="batch-heading">
              <h2 id="batch-heading" className="text-2xl font-bold text-slate-900">
                Pilihan Batch
              </h2>
              {batches.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {batches.map((b) => (
                    <div
                      key={b.id}
                      className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {formatDateRange(b.startDate, b.endDate)}
                        </p>
                        <p className="text-sm text-slate-500">
                          {b.mode}
                          {b.location ? ` · ${b.location}` : " · 09.00–16.00 WIB via Zoom"}
                          {b.needsConfirmation ? " · tanggal menunggu konfirmasi final" : ""}
                        </p>
                      </div>
                      {price !== null ? (
                        <Link
                          href={`/checkout/${program.slug}?batch=${b.id}`}
                          className="btn-outline px-5 py-2 text-sm"
                        >
                          Pilih Batch Ini
                        </Link>
                      ) : (
                        <a
                          href={waLink(
                            `Halo admin, saya ingin mendaftar ${program.title} batch ${formatDateRange(b.startDate, b.endDate)}.`,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline px-5 py-2 text-sm"
                        >
                          Daftar via Admin
                        </a>
                      )}
                    </div>
                  ))}
                  {hasConfirmationNote && (
                    <p className="text-xs text-slate-500">
                      * Tanggal batch bertanda akan dikonfirmasi final oleh penyelenggara.
                      Peserta terdaftar akan dihubungi jika ada penyesuaian.
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 text-slate-600">
                  Jadwal batch berikutnya segera diumumkan.{" "}
                  <a
                    href={waLink(`Halo admin, kapan batch berikutnya ${program.title}?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sky-700 hover:underline"
                  >
                    Tanyakan ke admin
                  </a>{" "}
                  untuk masuk daftar tunggu.
                </p>
              )}
            </section>

            {/* Tentang program */}
            <section className="mt-12" aria-labelledby="about-heading">
              <h2 id="about-heading" className="text-2xl font-bold text-slate-900">
                Tentang Pelatihan Ini
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-slate-600">
                {program.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Direkomendasikan untuk */}
            <section className="mt-12" aria-labelledby="audience-heading">
              <h2 id="audience-heading" className="text-2xl font-bold text-slate-900">
                Direkomendasikan Untuk
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {program.audience.map((a) => (
                  <span
                    key={a}
                    className="rounded-full bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-800"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </section>

            {/* Silabus */}
            <section className="mt-12" aria-labelledby="syllabus-heading">
              <h2 id="syllabus-heading" className="text-2xl font-bold text-slate-900">
                Silabus & Materi
              </h2>
              <div className="mt-5 space-y-3">
                {program.syllabus.map((section) => (
                  <details
                    key={section.title}
                    className="group rounded-xl border border-slate-200 bg-white px-5 py-4"
                    open
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
                      {section.title}
                      <span className="text-sky-700 transition group-open:rotate-45" aria-hidden>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                      {section.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="text-sky-600" aria-hidden>•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA tengah */}
            <section className="mt-12 rounded-2xl border border-sky-100 bg-sky-50 p-7 text-center text-slate-900">
              <h2 className="text-xl font-bold">
                Kursi terbatas — amankan tempat Anda di batch terdekat
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {batch
                  ? `Batch ${formatDateRange(batch.startDate, batch.endDate)} segera dimulai.`
                  : "Hubungi admin untuk jadwal batch berikutnya."}
              </p>
              <Link href={primaryHref} className="btn-primary mt-5">
                {primaryLabel}
              </Link>
              <p className="mt-3 text-xs text-slate-500">{paymentMicrocopy}</p>
            </section>

            {/* Benefit */}
            <section className="mt-12" aria-labelledby="benefit-heading">
              <h2 id="benefit-heading" className="text-2xl font-bold text-slate-900">
                Yang Anda Dapatkan
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {program.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700"
                  >
                    <span className="text-sky-600" aria-hidden>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
                <strong className="text-slate-900">Manfaat karier:</strong>{" "}
                {program.careerNote}
              </p>
            </section>

            {/* Upsell sertifikasi */}
            <section className="mt-12 rounded-2xl border border-orange-200 bg-orange-50 p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Lanjutkan ke Sertifikasi Kompetensi
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Sertifikat pelatihan dari program ini menjadi syarat untuk
                melanjutkan ke jalur sertifikasi kompetensi — pengakuan formal
                atas keahlian Anda.
              </p>
              <Link
                href="/sertifikasi-kompetensi"
                className="mt-3 inline-block text-sm font-semibold text-sky-700 hover:underline"
              >
                Pelajari jalur sertifikasi kompetensi →
              </Link>
            </section>

            {/* Jaminan */}
            <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900">Jaminan Peserta</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="text-sky-600" aria-hidden>✓</span>
                  Berhalangan hadir? Anda tetap mendapatkan rekaman lengkap, materi, dan sertifikat.
                </li>
                <li className="flex gap-2">
                  <span className="text-sky-600" aria-hidden>✓</span>
                  Bisa reschedule ke batch berikutnya sesuai{" "}
                  <Link href="/kebijakan-refund" className="font-semibold text-sky-700 hover:underline">
                    kebijakan refund & reschedule
                  </Link>.
                </li>
              </ul>
            </section>

            {/* FAQ program */}
            <section className="mt-12" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl font-bold text-slate-900">
                FAQ {program.title}
              </h2>
              <div className="mt-5">
                <FaqList faqs={program.faqs} />
              </div>
            </section>
          </div>

          <div className="hidden lg:block" aria-hidden />
        </div>
      </div>

      {/* Testimoni program (tampil hanya bila ada data asli) */}
      <Testimonials items={programTestimonials} heading="Apa Kata Alumni Program Ini" />

      {/* Program terkait */}
      {related.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-bold text-slate-900">Program Terkait</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProgramCard key={p.slug} program={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky CTA mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] md:hidden">
        <div className="flex items-center gap-3">
          <a
            href={waLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tanya admin via WhatsApp"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-green-500 text-green-600"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35M12.04 21.78h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.82 9.82 0 0 1 7 2.9 9.82 9.82 0 0 1 2.89 7c0 5.45-4.44 9.88-9.9 9.88M20.46 3.6A11.8 11.8 0 0 0 12.04 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.54 0 11.88-5.33 11.88-11.89 0-3.18-1.24-6.16-3.47-8.41" />
            </svg>
          </a>
          <Link href={primaryHref} className="btn-primary h-12 flex-1 text-sm">
            {canCheckout ? `Daftar — ${priceLabel(program)}` : "Daftar via Admin"}
          </Link>
        </div>
      </div>
    </div>
  );
}

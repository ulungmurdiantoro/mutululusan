import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { getAllPosts } from "@/lib/blog";
import { formatDateFull } from "@/lib/format";
import { site } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Blog — Wawasan Laboratorium, Mutu & Sertifikasi",
  description:
    "Artikel seputar ISO 17025, K3 laboratorium, GLP, mutu, dan sertifikasi kompetensi. Panduan praktis untuk profesional laboratorium Indonesia.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const pillar = posts.find((p) => p.pillar);
  const rest = posts.filter((p) => !p.pillar);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog ${site.name}`,
    url: `${site.url}/blog`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${site.url}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sky-700">Beranda</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">Blog</span>
          </nav>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Wawasan Laboratorium, Mutu & Sertifikasi
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Panduan praktis dan penjelasan mendalam seputar dunia laboratorium —
            untuk membantu Anda bekerja lebih baik dan berkembang dalam karier.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          {pillar && (
            <Link
              href={`/blog/${pillar.slug}`}
              className="block rounded-2xl border border-sky-200 bg-sky-50 p-6 transition hover:border-sky-300 hover:shadow-md sm:p-8"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                Artikel Pilar · {pillar.category}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">{pillar.title}</h2>
              <p className="mt-2 max-w-3xl text-slate-600">{pillar.excerpt}</p>
              <p className="mt-3 text-sm text-slate-500">
                {formatDateFull(pillar.publishedAt)} · {pillar.readingMinutes} menit baca
              </p>
            </Link>
          )}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:border-sky-300 hover:shadow-md"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                  {post.category}
                </span>
                <h2 className="mt-2 font-bold leading-snug text-slate-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-sky-700">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                <p className="mt-auto pt-4 text-xs text-slate-500">
                  {formatDateFull(post.publishedAt)} · {post.readingMinutes} menit baca
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

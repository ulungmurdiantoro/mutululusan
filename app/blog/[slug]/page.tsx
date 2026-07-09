import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogContent } from "@/components/blog-content";
import { JsonLd } from "@/components/json-ld";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { getProgram } from "@/lib/programs";
import { formatDateFull } from "@/lib/format";
import { site, waLink } from "@/lib/site";

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const relatedProgram = post.relatedProgram ? await getProgram(post.relatedProgram) : undefined;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${post.slug}` },
    keywords: post.keywords.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${site.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <article>
        <header className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-3xl px-4 py-10">
            <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-sky-700">Beranda</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-sky-700">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900">{post.category}</span>
            </nav>
            <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-wide text-sky-700">
              {post.category}
            </span>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-slate-500">
              Oleh {post.author} · {formatDateFull(post.publishedAt)} · {post.readingMinutes} menit baca
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-12">
          <BlogContent blocks={post.body} />

          {relatedProgram && (
            <div className="mt-10 rounded-2xl bg-sky-900 p-7 text-center text-white">
              <h2 className="text-xl font-bold">Siap mempraktikkannya?</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-sky-100">
                Tingkatkan kompetensi Anda lewat pelatihan {relatedProgram.title} —
                e-sertifikat 24 JP, rekaman, dan materi.
              </p>
              <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href={`/pelatihan/${relatedProgram.slug}`} className="btn-primary">
                  Lihat Pelatihan
                </Link>
                <a
                  href={waLink(`Halo admin, saya membaca artikel "${post.title}" dan tertarik dengan pelatihannya.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Tanya via WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>

        {related.length > 0 && (
          <section className="border-t border-slate-200 bg-slate-50">
            <div className="mx-auto max-w-3xl px-4 py-10">
              <h2 className="text-xl font-bold text-slate-900">Artikel Terkait</h2>
              <div className="mt-5 space-y-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-sky-300"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                      {p.category}
                    </span>
                    <p className="mt-1 font-bold text-slate-900">{p.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}

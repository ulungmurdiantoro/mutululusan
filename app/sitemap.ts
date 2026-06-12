import type { MetadataRoute } from "next";
import { getAllPrograms } from "@/lib/programs";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/pelatihan`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/jadwal-pelatihan-2026`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/sertifikasi-kompetensi`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/in-house-training`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/invoice-instansi`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/tentang-kami`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${site.url}/faq`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}/kontak`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${site.url}/konfirmasi-pembayaran`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/syarat-ketentuan`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/kebijakan-privasi`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/kebijakan-refund`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const programPages: MetadataRoute.Sitemap = getAllPrograms().map((program) => ({
    url: `${site.url}/pelatihan/${program.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...programPages, ...blogPages];
}

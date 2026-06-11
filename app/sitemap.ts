import type { MetadataRoute } from "next";
import { getAllPrograms } from "@/lib/programs";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/pelatihan`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/jadwal-pelatihan-2026`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/sertifikasi-kompetensi`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/in-house-training`, lastModified, changeFrequency: "monthly", priority: 0.7 },
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

  return [...staticPages, ...programPages];
}

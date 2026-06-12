import { posts } from "./blog-data";

export type BlogBlock =
  | { type: "p"; text: string; lead?: boolean }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "cta"; title: string; text: string; href: string; label: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** YYYY-MM-DD */
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  author: string;
  pillar?: boolean;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  body: BlogBlock[];
  /** Slug program terkait untuk internal linking & CTA. */
  relatedProgram?: string;
  relatedPosts: string[];
}

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return post.relatedPosts
    .map((slug) => getPost(slug))
    .filter((p): p is BlogPost => Boolean(p));
}

export function getCategories(): string[] {
  return [...new Set(posts.map((p) => p.category))];
}

import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";
import { getPost } from "@/lib/blog";

export const alt = "Artikel Blog — mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return renderOgImage({ title: "Blog mutululusan.id" });
  }

  return renderOgImage({
    title: post.title,
    subtitle: post.excerpt,
    tag: post.category,
  });
}

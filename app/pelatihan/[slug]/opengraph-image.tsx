import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";
import { getProgram, typeLabel } from "@/lib/programs";

export const alt = "Program Pelatihan — mutululusan.id";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    return renderOgImage({ title: "Program Pelatihan mutululusan.id" });
  }

  return renderOgImage({
    title: program.title,
    subtitle: program.subtitle,
    tag: typeLabel[program.type],
  });
}

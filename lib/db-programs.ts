import type { Prisma, Program as PrismaProgram } from "@prisma/client";
import { isDatabaseConfigured, prisma } from "./db";
import type { Faq, Program, SyllabusSection } from "./programs-types";

export interface DbProgramInput {
  slug: string;
  title: string;
  subtitle: string;
  type: "online" | "hybrid" | "offline";
  jp: number | null;
  durationDays: number;
  basePrice: number | null;
  excerpt: string;
  description: string[];
  careerNote?: string;
  audience?: string[];
  benefits?: string[];
  keywords?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

const PLACEHOLDER_SYLLABUS: SyllabusSection[] = [
  { title: "Kurikulum sedang disusun", points: ["Detail silabus akan diumumkan menyusul."] },
];

function placeholderFaqs(title: string): Faq[] {
  return [
    {
      question: `Kapan konten lengkap ${title} tersedia?`,
      answer:
        "Sedang disiapkan. Hubungi admin via WhatsApp untuk informasi terbaru dan estimasi jadwal batch pertama.",
    },
  ];
}

function mapRow(row: PrismaProgram): Program {
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    type: row.type as Program["type"],
    jp: row.jp,
    durationDays: row.durationDays,
    basePrice: row.basePrice,
    excerpt: row.excerpt,
    description: (row.description as unknown as string[]) ?? [],
    careerNote: row.careerNote,
    audience: (row.audience as unknown as string[]) ?? [],
    syllabus: ((row.syllabus as unknown as SyllabusSection[]) ?? []).length
      ? (row.syllabus as unknown as SyllabusSection[])
      : PLACEHOLDER_SYLLABUS,
    benefits: (row.benefits as unknown as string[]) ?? [],
    faqs: ((row.faqs as unknown as Faq[]) ?? []).length
      ? (row.faqs as unknown as Faq[])
      : placeholderFaqs(row.title),
    keywords: (row.keywords as unknown as string[]) ?? [],
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    related: (row.related as unknown as string[]) ?? [],
    batches: [],
    fromDb: true,
  };
}

/** Program yang ditambahkan admin lewat UI — murni DB, tanpa fallback file. */
export async function listDbPrograms(): Promise<Program[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    const rows = await prisma.program.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map(mapRow);
  } catch (error) {
    console.error("[db-programs] gagal list program:", error);
    return [];
  }
}

export async function getDbProgram(slug: string): Promise<Program | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const row = await prisma.program.findUnique({ where: { slug } });
    return row ? mapRow(row) : null;
  } catch (error) {
    console.error("[db-programs] gagal ambil program:", error);
    return null;
  }
}

export async function createDbProgram(input: DbProgramInput): Promise<Program | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const row = await prisma.program.create({
      data: {
        slug: input.slug,
        title: input.title,
        subtitle: input.subtitle,
        type: input.type,
        jp: input.jp,
        durationDays: input.durationDays,
        basePrice: input.basePrice,
        excerpt: input.excerpt,
        description: input.description,
        careerNote: input.careerNote ?? "",
        audience: input.audience ?? [],
        syllabus: PLACEHOLDER_SYLLABUS as unknown as Prisma.InputJsonValue,
        benefits: input.benefits ?? [],
        faqs: placeholderFaqs(input.title) as unknown as Prisma.InputJsonValue,
        keywords: input.keywords ?? [],
        seoTitle: input.seoTitle || `${input.title} — mutululusan.id`,
        seoDescription: input.seoDescription || input.excerpt,
        related: [],
      },
    });
    return mapRow(row);
  } catch (error) {
    console.error("[db-programs] gagal buat program:", error);
    return null;
  }
}

export async function updateDbProgram(
  slug: string,
  patch: Partial<DbProgramInput>,
): Promise<Program | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const data: Record<string, unknown> = {};
    if (patch.title !== undefined) data.title = patch.title;
    if (patch.subtitle !== undefined) data.subtitle = patch.subtitle;
    if (patch.type !== undefined) data.type = patch.type;
    if (patch.jp !== undefined) data.jp = patch.jp;
    if (patch.durationDays !== undefined) data.durationDays = patch.durationDays;
    if (patch.basePrice !== undefined) data.basePrice = patch.basePrice;
    if (patch.excerpt !== undefined) data.excerpt = patch.excerpt;
    if (patch.description !== undefined) data.description = patch.description;
    if (patch.careerNote !== undefined) data.careerNote = patch.careerNote;
    if (patch.audience !== undefined) data.audience = patch.audience;
    if (patch.benefits !== undefined) data.benefits = patch.benefits;
    if (patch.keywords !== undefined) data.keywords = patch.keywords;
    if (patch.seoTitle !== undefined) data.seoTitle = patch.seoTitle;
    if (patch.seoDescription !== undefined) data.seoDescription = patch.seoDescription;
    const row = await prisma.program.update({ where: { slug }, data });
    return mapRow(row);
  } catch (error) {
    console.error("[db-programs] gagal update program:", error);
    return null;
  }
}

export async function deleteDbProgram(slug: string): Promise<boolean> {
  if (!isDatabaseConfigured()) return false;
  try {
    await prisma.program.delete({ where: { slug } });
    return true;
  } catch (error) {
    console.error("[db-programs] gagal hapus program:", error);
    return false;
  }
}

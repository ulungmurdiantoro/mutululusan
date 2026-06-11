import { programs } from "./programs-data";

export type ProgramType = "online" | "hybrid" | "offline";

export interface Batch {
  id: string;
  startDate: string;
  endDate: string;
  mode: "Online" | "Hybrid" | "Offline";
  location?: string;
  /** Tanggal berbeda antar-poster sumber; tampilkan disclaimer sampai dikonfirmasi penyelenggara. */
  needsConfirmation?: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface SyllabusSection {
  title: string;
  points: string[];
}

export interface TieredPrice {
  label: string;
  price: number;
}

export interface Program {
  slug: string;
  title: string;
  subtitle: string;
  type: ProgramType;
  jp: number | null;
  durationDays: number;
  /** null = harga belum dipublikasikan; arahkan ke WhatsApp admin. */
  basePrice: number | null;
  tieredPrices?: TieredPrice[];
  priority?: boolean;
  excerpt: string;
  description: string[];
  careerNote: string;
  audience: string[];
  syllabus: SyllabusSection[];
  benefits: string[];
  faqs: Faq[];
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  related: string[];
  batches: Batch[];
}

export function getAllPrograms(): Program[] {
  return programs;
}

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function getRelatedPrograms(program: Program): Program[] {
  return program.related
    .map((slug) => getProgram(slug))
    .filter((p): p is Program => Boolean(p));
}

export function upcomingBatches(program: Program, from = new Date()): Batch[] {
  const today = from.toISOString().slice(0, 10);
  return program.batches.filter((b) => b.startDate >= today);
}

export function nearestBatch(program: Program, from = new Date()): Batch | undefined {
  return upcomingBatches(program, from)[0];
}

export interface UpcomingEntry {
  program: Program;
  batch: Batch;
}

export function upcomingAcrossPrograms(limit?: number, from = new Date()): UpcomingEntry[] {
  const entries = programs
    .flatMap((program) =>
      upcomingBatches(program, from).map((batch) => ({ program, batch })),
    )
    .sort((a, b) => a.batch.startDate.localeCompare(b.batch.startDate));
  return limit ? entries.slice(0, limit) : entries;
}

export function lowestPrice(program: Program): number | null {
  if (program.basePrice !== null) return program.basePrice;
  if (program.tieredPrices?.length) {
    return Math.min(...program.tieredPrices.map((t) => t.price));
  }
  return null;
}

export function priceLabel(program: Program): string {
  if (program.basePrice !== null) {
    return `Rp ${program.basePrice.toLocaleString("id-ID")}`;
  }
  if (program.tieredPrices?.length) {
    const min = Math.min(...program.tieredPrices.map((t) => t.price));
    return `Mulai Rp ${min.toLocaleString("id-ID")}`;
  }
  return "Hubungi admin";
}

export const typeLabel: Record<ProgramType, string> = {
  online: "Online via Zoom",
  hybrid: "Hybrid",
  offline: "Offline",
};

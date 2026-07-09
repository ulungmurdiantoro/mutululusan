import { programs } from "./programs-data";
import { listBatchesForSlug } from "./batches";
import { listDbPrograms, getDbProgram } from "./db-programs";
import type { Batch, Program, ProgramType } from "./programs-types";

export type {
  ProgramType,
  Batch,
  Faq,
  SyllabusSection,
  TieredPrice,
  Program,
} from "./programs-types";

async function attachBatches(program: Program): Promise<Program> {
  const dbBatches = await listBatchesForSlug(program.slug);
  if (dbBatches.length === 0) return program;
  return { ...program, batches: [...program.batches, ...dbBatches] };
}

export async function getAllPrograms(): Promise<Program[]> {
  const dbPrograms = await listDbPrograms();
  const merged = [
    ...programs,
    ...dbPrograms.filter((dp) => !programs.some((sp) => sp.slug === dp.slug)),
  ];
  return Promise.all(merged.map(attachBatches));
}

export async function getProgram(slug: string): Promise<Program | undefined> {
  const staticProgram = programs.find((p) => p.slug === slug);
  const program = staticProgram ?? (await getDbProgram(slug)) ?? undefined;
  if (!program) return undefined;
  return attachBatches(program);
}

export async function getRelatedPrograms(program: Program): Promise<Program[]> {
  const related = await Promise.all(program.related.map((slug) => getProgram(slug)));
  return related.filter((p): p is Program => Boolean(p));
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

export async function upcomingAcrossPrograms(
  limit?: number,
  from = new Date(),
): Promise<UpcomingEntry[]> {
  const all = await getAllPrograms();
  const entries = all
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

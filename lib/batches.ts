import type { Batch as PrismaBatch } from "@prisma/client";
import { isDatabaseConfigured, prisma } from "./db";
import type { Batch } from "./programs-types";

export type { PrismaBatch };

export interface BatchInput {
  programSlug: string;
  startDate: string;
  endDate: string;
  mode: "Online" | "Hybrid" | "Offline";
  location?: string | null;
  needsConfirmation?: boolean;
}

function mapRow(row: PrismaBatch): Batch {
  return {
    id: row.id,
    startDate: row.startDate,
    endDate: row.endDate,
    mode: row.mode as Batch["mode"],
    location: row.location ?? undefined,
    needsConfirmation: row.needsConfirmation,
  };
}

/**
 * Jadwal batch — murni DB, tanpa fallback file (diisi admin, bukan bagian
 * alur checkout kritikal). Tanpa DB, cukup kembalikan kosong/null.
 */
export async function listBatchesForSlug(slug: string): Promise<Batch[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    const rows = await prisma.batch.findMany({
      where: { programSlug: slug },
      orderBy: { startDate: "asc" },
    });
    return rows.map(mapRow);
  } catch (error) {
    console.error("[batches] gagal ambil batch untuk slug:", error);
    return [];
  }
}

export async function listAllDbBatches(): Promise<PrismaBatch[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    return await prisma.batch.findMany({ orderBy: [{ programSlug: "asc" }, { startDate: "asc" }] });
  } catch (error) {
    console.error("[batches] gagal list semua batch:", error);
    return [];
  }
}

export async function createBatch(input: BatchInput): Promise<PrismaBatch | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    return await prisma.batch.create({
      data: {
        programSlug: input.programSlug,
        startDate: input.startDate,
        endDate: input.endDate,
        mode: input.mode,
        location: input.location || null,
        needsConfirmation: input.needsConfirmation ?? false,
      },
    });
  } catch (error) {
    console.error("[batches] gagal buat batch:", error);
    return null;
  }
}

export async function updateBatch(
  id: string,
  patch: Partial<BatchInput>,
): Promise<PrismaBatch | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const data: Record<string, unknown> = {};
    if (patch.startDate !== undefined) data.startDate = patch.startDate;
    if (patch.endDate !== undefined) data.endDate = patch.endDate;
    if (patch.mode !== undefined) data.mode = patch.mode;
    if (patch.location !== undefined) data.location = patch.location || null;
    if (patch.needsConfirmation !== undefined) data.needsConfirmation = patch.needsConfirmation;
    return await prisma.batch.update({ where: { id }, data });
  } catch (error) {
    console.error("[batches] gagal update batch:", error);
    return null;
  }
}

export async function deleteBatch(id: string): Promise<boolean> {
  if (!isDatabaseConfigured()) return false;
  try {
    await prisma.batch.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error("[batches] gagal hapus batch:", error);
    return false;
  }
}

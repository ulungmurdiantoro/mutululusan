import type { BatchAsset } from "@prisma/client";
import { isDatabaseConfigured, prisma } from "./db";

export type { BatchAsset };

export interface BatchAssetInput {
  batchId: string;
  programSlug: string;
  recordingUrl?: string | null;
  materialsUrl?: string | null;
  documentationUrl?: string | null;
  zoomInfo?: string | null;
}

/**
 * Aset per batch (rekaman Zoom, materi, dokumentasi) hanya bermakna bila DB
 * aktif — datanya diisi admin, bukan bagian alur checkout kritikal, sehingga
 * tanpa DB fitur ini cukup mengembalikan kosong/null (bukan fallback file).
 */
export async function getBatchAsset(batchId: string): Promise<BatchAsset | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    return await prisma.batchAsset.findUnique({ where: { batchId } });
  } catch (error) {
    console.error("[batch-assets] gagal ambil batch asset:", error);
    return null;
  }
}

export async function listBatchAssetsByIds(batchIds: string[]): Promise<BatchAsset[]> {
  if (!isDatabaseConfigured() || batchIds.length === 0) return [];
  try {
    return await prisma.batchAsset.findMany({ where: { batchId: { in: batchIds } } });
  } catch (error) {
    console.error("[batch-assets] gagal list batch asset:", error);
    return [];
  }
}

export async function listAllBatchAssets(): Promise<BatchAsset[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    return await prisma.batchAsset.findMany({ orderBy: { updatedAt: "desc" } });
  } catch (error) {
    console.error("[batch-assets] gagal list semua batch asset:", error);
    return [];
  }
}

export async function upsertBatchAsset(input: BatchAssetInput): Promise<BatchAsset | null> {
  if (!isDatabaseConfigured()) return null;
  const data = {
    programSlug: input.programSlug,
    recordingUrl: input.recordingUrl || null,
    materialsUrl: input.materialsUrl || null,
    documentationUrl: input.documentationUrl || null,
    zoomInfo: input.zoomInfo || null,
  };
  try {
    return await prisma.batchAsset.upsert({
      where: { batchId: input.batchId },
      create: { batchId: input.batchId, ...data },
      update: data,
    });
  } catch (error) {
    console.error("[batch-assets] gagal simpan batch asset:", error);
    return null;
  }
}

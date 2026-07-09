import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { listOrders } from "@/lib/orders";
import { listAllBatchAssets, upsertBatchAsset } from "@/lib/batch-assets";
import { formatDateRange } from "@/lib/format";
import { ADMIN_COOKIE } from "../../api/admin/login/route";
import { LoginForm, LogoutButton } from "../login-form";

export const metadata: Metadata = {
  title: "Kelola Aset Batch",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface BatchRow {
  batchId: string;
  programSlug: string;
  programTitle: string;
  batchStartDate: string;
  batchEndDate: string;
}

export default async function AdminAsetPage() {
  const adminToken = process.env.ADMIN_TOKEN;
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  const authorized = Boolean(adminToken) && session === adminToken;

  if (!authorized) {
    return (
      <div className="bg-slate-50">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <LoginForm />
        </div>
      </div>
    );
  }

  const orders = await listOrders();
  const batchesById = new Map<string, BatchRow>();
  for (const o of orders) {
    if (!batchesById.has(o.batchId)) {
      batchesById.set(o.batchId, {
        batchId: o.batchId,
        programSlug: o.programSlug,
        programTitle: o.programTitle,
        batchStartDate: o.batchStartDate,
        batchEndDate: o.batchEndDate,
      });
    }
  }
  const batches = Array.from(batchesById.values()).sort((a, b) =>
    b.batchStartDate.localeCompare(a.batchStartDate),
  );

  const assets = await listAllBatchAssets();
  const assetByBatch = new Map(assets.map((a) => [a.batchId, a]));

  async function saveBatchAsset(formData: FormData) {
    "use server";
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE)?.value;
    if (!token || token !== process.env.ADMIN_TOKEN) return;

    await upsertBatchAsset({
      batchId: String(formData.get("batchId")),
      programSlug: String(formData.get("programSlug")),
      recordingUrl: String(formData.get("recordingUrl") ?? ""),
      materialsUrl: String(formData.get("materialsUrl") ?? ""),
      documentationUrl: String(formData.get("documentationUrl") ?? ""),
      zoomInfo: String(formData.get("zoomInfo") ?? ""),
    });
    revalidatePath("/admin/aset");
  }

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Link href="/admin" className="text-sm text-slate-500 hover:text-sky-700">
              ← Dashboard Admin
            </Link>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Kelola Aset Batch
            </h1>
          </div>
          <LogoutButton />
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Isi link rekaman Zoom, materi, dokumentasi (Google Drive) per batch.
          Peserta akan melihat link ini di dashboard <code>/akun/pelatihan</code>{" "}
          begitu diisi.
        </p>

        {batches.length === 0 ? (
          <p className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
            Belum ada batch (belum ada order masuk).
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {batches.map((b) => {
              const asset = assetByBatch.get(b.batchId);
              return (
                <form
                  key={b.batchId}
                  action={saveBatchAsset}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <input type="hidden" name="batchId" value={b.batchId} />
                  <input type="hidden" name="programSlug" value={b.programSlug} />
                  <h2 className="font-bold text-slate-900">{b.programTitle}</h2>
                  <p className="text-xs text-slate-500">
                    {formatDateRange(b.batchStartDate, b.batchEndDate)} · batch{" "}
                    <code>{b.batchId}</code>
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <label className="block text-sm">
                      <span className="font-medium text-slate-700">Link rekaman Zoom</span>
                      <input
                        name="recordingUrl"
                        defaultValue={asset?.recordingUrl ?? ""}
                        placeholder="https://drive.google.com/..."
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="font-medium text-slate-700">Link materi</span>
                      <input
                        name="materialsUrl"
                        defaultValue={asset?.materialsUrl ?? ""}
                        placeholder="https://drive.google.com/..."
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="font-medium text-slate-700">Link dokumentasi</span>
                      <input
                        name="documentationUrl"
                        defaultValue={asset?.documentationUrl ?? ""}
                        placeholder="https://drive.google.com/..."
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="font-medium text-slate-700">Info Zoom (opsional)</span>
                      <input
                        name="zoomInfo"
                        defaultValue={asset?.zoomInfo ?? ""}
                        placeholder="Meeting ID / passcode"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
                      />
                    </label>
                  </div>

                  <button type="submit" className="btn-primary mt-4">
                    Simpan
                  </button>
                </form>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

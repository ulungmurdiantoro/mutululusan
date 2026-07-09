import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getAllPrograms } from "@/lib/programs";
import { createBatch, deleteBatch, listAllDbBatches, updateBatch } from "@/lib/batches";
import { formatDateRange } from "@/lib/format";
import { ADMIN_COOKIE } from "../../api/admin/login/route";
import { LoginForm, LogoutButton } from "../login-form";

export const metadata: Metadata = {
  title: "Kelola Jadwal Batch",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ program?: string }>;
}

async function requireAdmin(): Promise<boolean> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(token) && token === process.env.ADMIN_TOKEN;
}

const modeOptions = ["Online", "Hybrid", "Offline"] as const;

export default async function AdminJadwalPage({ searchParams }: PageProps) {
  const authorized = await requireAdmin();
  if (!authorized) {
    return (
      <div className="bg-slate-50">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <LoginForm />
        </div>
      </div>
    );
  }

  const [programs, dbBatches] = await Promise.all([getAllPrograms(), listAllDbBatches()]);
  const { program: programParam } = await searchParams;
  const selectedSlug = programParam || programs[0]?.slug || "";
  const selected = programs.find((p) => p.slug === selectedSlug);
  const dbBatchIds = new Set(dbBatches.map((b) => b.id));

  async function addBatch(formData: FormData) {
    "use server";
    if (!(await requireAdmin())) return;
    const programSlug = String(formData.get("programSlug"));
    await createBatch({
      programSlug,
      startDate: String(formData.get("startDate")),
      endDate: String(formData.get("endDate")),
      mode: String(formData.get("mode")) as "Online" | "Hybrid" | "Offline",
      location: String(formData.get("location") ?? "") || null,
      needsConfirmation: formData.get("needsConfirmation") === "on",
    });
    revalidatePath("/admin/jadwal");
  }

  async function editBatch(formData: FormData) {
    "use server";
    if (!(await requireAdmin())) return;
    const id = String(formData.get("id"));
    await updateBatch(id, {
      startDate: String(formData.get("startDate")),
      endDate: String(formData.get("endDate")),
      mode: String(formData.get("mode")) as "Online" | "Hybrid" | "Offline",
      location: String(formData.get("location") ?? "") || null,
      needsConfirmation: formData.get("needsConfirmation") === "on",
    });
    revalidatePath("/admin/jadwal");
  }

  async function removeBatch(formData: FormData) {
    "use server";
    if (!(await requireAdmin())) return;
    await deleteBatch(String(formData.get("id")));
    revalidatePath("/admin/jadwal");
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
              Kelola Jadwal Batch
            </h1>
          </div>
          <LogoutButton />
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Tambah, ubah, atau hapus jadwal batch. Batch bawaan kode ditandai{" "}
          <em>read-only</em> — untuk mengubahnya, edit <code>lib/programs-data.ts</code>.
        </p>

        <form method="get" className="mt-6 flex flex-wrap items-end gap-3">
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Program</span>
            <select
              name="program"
              defaultValue={selectedSlug}
              className="mt-1 w-full min-w-[280px] rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
            >
              {programs.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title}
                  {p.fromDb ? " (ditambahkan admin)" : " (kode)"}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn-outline px-4 py-2 text-sm">
            Tampilkan
          </button>
        </form>

        {selected && (
          <>
            <h2 className="mt-8 font-bold text-slate-900">Batch untuk {selected.title}</h2>

            {selected.batches.length === 0 ? (
              <p className="mt-3 rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
                Belum ada batch untuk program ini.
              </p>
            ) : (
              <div className="mt-3 space-y-3">
                {selected.batches.map((b) =>
                  dbBatchIds.has(b.id) ? (
                    <form
                      key={b.id}
                      action={editBatch}
                      className="rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <input type="hidden" name="id" value={b.id} />
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <label className="block text-sm">
                          <span className="font-medium text-slate-700">Mulai</span>
                          <input
                            type="date"
                            name="startDate"
                            defaultValue={b.startDate}
                            required
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
                          />
                        </label>
                        <label className="block text-sm">
                          <span className="font-medium text-slate-700">Selesai</span>
                          <input
                            type="date"
                            name="endDate"
                            defaultValue={b.endDate}
                            required
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
                          />
                        </label>
                        <label className="block text-sm">
                          <span className="font-medium text-slate-700">Mode</span>
                          <select
                            name="mode"
                            defaultValue={b.mode}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
                          >
                            {modeOptions.map((m) => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                        </label>
                        <label className="block text-sm">
                          <span className="font-medium text-slate-700">Lokasi (opsional)</span>
                          <input
                            name="location"
                            defaultValue={b.location ?? ""}
                            placeholder="mis. Semarang"
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
                          />
                        </label>
                      </div>
                      <label className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                        <input
                          type="checkbox"
                          name="needsConfirmation"
                          defaultChecked={b.needsConfirmation}
                        />
                        Tanggal masih menunggu konfirmasi final
                      </label>
                      <div className="mt-3 flex gap-2">
                        <button type="submit" className="btn-primary px-4 py-2 text-sm">
                          Simpan
                        </button>
                        <button
                          type="submit"
                          formAction={removeBatch}
                          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div
                      key={b.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-slate-300 bg-white p-4"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {formatDateRange(b.startDate, b.endDate)}
                        </p>
                        <p className="text-xs text-slate-500">
                          {b.mode}
                          {b.location ? ` · ${b.location}` : ""}
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
                        read-only · kode
                      </span>
                    </div>
                  ),
                )}
              </div>
            )}

            <h3 className="mt-8 font-bold text-slate-900">Tambah Batch Baru</h3>
            <form
              action={addBatch}
              className="mt-3 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <input type="hidden" name="programSlug" value={selectedSlug} />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <label className="block text-sm">
                  <span className="font-medium text-slate-700">Mulai *</span>
                  <input
                    type="date"
                    name="startDate"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-slate-700">Selesai *</span>
                  <input
                    type="date"
                    name="endDate"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-slate-700">Mode</span>
                  <select
                    name="mode"
                    defaultValue="Online"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
                  >
                    {modeOptions.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-slate-700">Lokasi (opsional)</span>
                  <input
                    name="location"
                    placeholder="mis. Semarang"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
                  />
                </label>
              </div>
              <label className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                <input type="checkbox" name="needsConfirmation" />
                Tanggal masih menunggu konfirmasi final
              </label>
              <button type="submit" className="btn-primary mt-4">
                Tambah Batch
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

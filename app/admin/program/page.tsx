import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getAllPrograms } from "@/lib/programs";
import { createDbProgram, deleteDbProgram, updateDbProgram } from "@/lib/db-programs";
import { ADMIN_COOKIE } from "../../api/admin/login/route";
import { LoginForm, LogoutButton } from "../login-form";

export const metadata: Metadata = {
  title: "Kelola Program",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function requireAdmin(): Promise<boolean> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(token) && token === process.env.ADMIN_TOKEN;
}

function linesToList(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function textToParagraphs(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? "")
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const typeOptions = ["online", "hybrid", "offline"] as const;

export default async function AdminProgramPage() {
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

  const programs = await getAllPrograms();
  const staticPrograms = programs.filter((p) => !p.fromDb);
  const dbPrograms = programs.filter((p) => p.fromDb);

  async function createProgram(formData: FormData) {
    "use server";
    if (!(await requireAdmin())) return;

    const title = String(formData.get("title") ?? "").trim();
    const rawSlug = String(formData.get("slug") ?? "").trim();
    const slug = slugify(rawSlug || title);
    if (!slug || !title) return;

    const jpRaw = String(formData.get("jp") ?? "").trim();
    const basePriceRaw = String(formData.get("basePrice") ?? "").trim();

    await createDbProgram({
      slug,
      title,
      subtitle: String(formData.get("subtitle") ?? ""),
      type: String(formData.get("type") ?? "online") as "online" | "hybrid" | "offline",
      jp: jpRaw ? Number(jpRaw) : null,
      durationDays: Number(formData.get("durationDays") ?? 1) || 1,
      basePrice: basePriceRaw ? Number(basePriceRaw) : null,
      excerpt: String(formData.get("excerpt") ?? ""),
      description: textToParagraphs(formData.get("description")),
      careerNote: String(formData.get("careerNote") ?? ""),
      audience: linesToList(formData.get("audience")),
      benefits: linesToList(formData.get("benefits")),
      keywords: linesToList(formData.get("keywords")),
      seoTitle: String(formData.get("seoTitle") ?? ""),
      seoDescription: String(formData.get("seoDescription") ?? ""),
    });
    revalidatePath("/admin/program");
    revalidatePath("/pelatihan");
  }

  async function editProgram(formData: FormData) {
    "use server";
    if (!(await requireAdmin())) return;
    const slug = String(formData.get("slug"));

    const jpRaw = String(formData.get("jp") ?? "").trim();
    const basePriceRaw = String(formData.get("basePrice") ?? "").trim();

    await updateDbProgram(slug, {
      title: String(formData.get("title") ?? ""),
      subtitle: String(formData.get("subtitle") ?? ""),
      type: String(formData.get("type") ?? "online") as "online" | "hybrid" | "offline",
      jp: jpRaw ? Number(jpRaw) : null,
      durationDays: Number(formData.get("durationDays") ?? 1) || 1,
      basePrice: basePriceRaw ? Number(basePriceRaw) : null,
      excerpt: String(formData.get("excerpt") ?? ""),
      description: textToParagraphs(formData.get("description")),
      careerNote: String(formData.get("careerNote") ?? ""),
      audience: linesToList(formData.get("audience")),
      benefits: linesToList(formData.get("benefits")),
      keywords: linesToList(formData.get("keywords")),
      seoTitle: String(formData.get("seoTitle") ?? ""),
      seoDescription: String(formData.get("seoDescription") ?? ""),
    });
    revalidatePath("/admin/program");
    revalidatePath("/pelatihan");
    revalidatePath(`/pelatihan/${slug}`);
  }

  async function removeProgram(formData: FormData) {
    "use server";
    if (!(await requireAdmin())) return;
    const slug = String(formData.get("slug"));
    await deleteDbProgram(slug);
    revalidatePath("/admin/program");
    revalidatePath("/pelatihan");
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
              Kelola Program
            </h1>
          </div>
          <LogoutButton />
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Program yang ditambahkan di sini otomatis muncul di katalog <code>/pelatihan</code>.
          Setelah dibuat, atur jadwal batch-nya di{" "}
          <Link href="/admin/jadwal" className="font-semibold text-sky-700 hover:underline">
            Kelola Jadwal
          </Link>
          . Silabus & FAQ diisi placeholder otomatis — perkaya lewat kode bila perlu.
        </p>

        <h2 className="mt-8 font-bold text-slate-900">
          Program bawaan kode ({staticPrograms.length})
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {staticPrograms.map((p) => (
            <span
              key={p.slug}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {p.title}
            </span>
          ))}
        </div>

        <h2 className="mt-8 font-bold text-slate-900">
          Program ditambahkan admin ({dbPrograms.length})
        </h2>
        {dbPrograms.length === 0 ? (
          <p className="mt-3 rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
            Belum ada program yang ditambahkan lewat admin.
          </p>
        ) : (
          <div className="mt-3 space-y-4">
            {dbPrograms.map((p) => (
              <details key={p.slug} className="rounded-2xl border border-slate-200 bg-white p-6">
                <summary className="cursor-pointer font-bold text-slate-900">
                  {p.title} <span className="font-normal text-slate-400">({p.slug})</span>
                </summary>
                <form action={editProgram} className="mt-4 space-y-3">
                  <input type="hidden" name="slug" value={p.slug} />
                  <ProgramFields defaults={p} />
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="btn-primary px-4 py-2 text-sm">
                      Simpan
                    </button>
                    <button
                      type="submit"
                      formAction={removeProgram}
                      className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      Hapus
                    </button>
                    <Link
                      href={`/pelatihan/${p.slug}`}
                      target="_blank"
                      className="ml-auto self-center text-xs font-semibold text-sky-700 hover:underline"
                    >
                      Lihat halaman →
                    </Link>
                  </div>
                </form>
              </details>
            ))}
          </div>
        )}

        <h2 className="mt-10 font-bold text-slate-900">Tambah Program Baru</h2>
        <form action={createProgram} className="mt-3 space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Slug (opsional, otomatis dari judul)</span>
            <input
              name="slug"
              placeholder="mis. iso-45001-officer"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
            />
          </label>
          <ProgramFields />
          <button type="submit" className="btn-primary mt-2">
            Tambah Program
          </button>
        </form>
      </div>
    </div>
  );
}

function ProgramFields({
  defaults,
}: {
  defaults?: {
    title: string;
    subtitle: string;
    type: string;
    jp: number | null;
    durationDays: number;
    basePrice: number | null;
    excerpt: string;
    description: string[];
    careerNote: string;
    audience: string[];
    benefits: string[];
    keywords: string[];
    seoTitle: string;
    seoDescription: string;
  };
}) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-slate-700">Judul program (EN) *</span>
          <input
            name="title"
            required
            defaultValue={defaults?.title}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-slate-700">Subjudul (ID) *</span>
          <input
            name="subtitle"
            required
            defaultValue={defaults?.subtitle}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Tipe</span>
          <select
            name="type"
            defaultValue={defaults?.type ?? "online"}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          >
            {typeOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Durasi (hari)</span>
          <input
            type="number"
            name="durationDays"
            min={1}
            defaultValue={defaults?.durationDays ?? 2}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">JP (opsional)</span>
          <input
            type="number"
            name="jp"
            defaultValue={defaults?.jp ?? undefined}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Harga dasar, Rp (kosongkan = hubungi admin)</span>
          <input
            type="number"
            name="basePrice"
            defaultValue={defaults?.basePrice ?? undefined}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-slate-700">Excerpt (ringkasan singkat) *</span>
        <textarea
          name="excerpt"
          required
          rows={2}
          defaultValue={defaults?.excerpt}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
        />
      </label>

      <label className="block text-sm">
        <span className="font-medium text-slate-700">Deskripsi (pisahkan tiap paragraf dengan baris kosong)</span>
        <textarea
          name="description"
          rows={5}
          defaultValue={defaults?.description.join("\n\n")}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
        />
      </label>

      <label className="block text-sm">
        <span className="font-medium text-slate-700">Manfaat karier</span>
        <textarea
          name="careerNote"
          rows={2}
          defaultValue={defaults?.careerNote}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Audiens (satu per baris)</span>
          <textarea
            name="audience"
            rows={3}
            defaultValue={defaults?.audience.join("\n")}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Benefit (satu per baris)</span>
          <textarea
            name="benefits"
            rows={3}
            defaultValue={defaults?.benefits.join("\n")}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Keywords (satu per baris)</span>
          <textarea
            name="keywords"
            rows={3}
            defaultValue={defaults?.keywords.join("\n")}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">SEO title (opsional)</span>
          <input
            name="seoTitle"
            defaultValue={defaults?.seoTitle}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">SEO description (opsional)</span>
          <input
            name="seoDescription"
            defaultValue={defaults?.seoDescription}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
      </div>
    </>
  );
}

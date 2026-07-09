import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getOrder, listOrders } from "@/lib/orders";
import { listAllCertificates, createCertificate, deleteCertificate } from "@/lib/certificates";
import { formatDateFull } from "@/lib/format";
import { ADMIN_COOKIE } from "../../api/admin/login/route";
import { LoginForm, LogoutButton } from "../login-form";
import { CertificateForm } from "./certificate-form";

export const metadata: Metadata = {
  title: "Kelola Sertifikat",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function requireAdmin(): Promise<boolean> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(token) && token === process.env.ADMIN_TOKEN;
}

export default async function AdminSertifikatPage() {
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

  const [orders, certificates] = await Promise.all([listOrders(), listAllCertificates()]);
  const eligibleOrders = orders
    .filter((o) => ["paid", "confirmed", "completed"].includes(o.status))
    .map((o) => ({
      orderId: o.orderId,
      buyerName: o.buyerName,
      email: o.email,
      programTitle: o.programTitle,
    }));

  async function issueCertificate(formData: FormData) {
    "use server";
    if (!(await requireAdmin())) return;

    const orderId = String(formData.get("orderId") ?? "");
    const order = await getOrder(orderId);
    if (!order) return;

    await createCertificate({
      number: String(formData.get("number") ?? ""),
      orderId,
      userId: order.userId,
      participantName: String(formData.get("participantName") ?? ""),
      programTitle: String(formData.get("programTitle") ?? ""),
      fileUrl: String(formData.get("fileUrl") ?? ""),
    });
    revalidatePath("/admin/sertifikat");
  }

  async function removeCertificate(formData: FormData) {
    "use server";
    if (!(await requireAdmin())) return;
    await deleteCertificate(String(formData.get("id") ?? ""));
    revalidatePath("/admin/sertifikat");
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
              Kelola Sertifikat
            </h1>
          </div>
          <LogoutButton />
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Terbitkan sertifikat untuk peserta yang sudah lunas/selesai. Peserta
          akan melihat link ini di dashboard <code>/akun/pelatihan</code>.
        </p>

        <CertificateForm orders={eligibleOrders} action={issueCertificate} />

        <h2 className="mt-8 font-bold text-slate-900">Sertifikat Terbit ({certificates.length})</h2>
        {certificates.length === 0 ? (
          <p className="mt-3 rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
            Belum ada sertifikat diterbitkan.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-4 py-3">Nomor</th>
                  <th className="px-4 py-3">Peserta</th>
                  <th className="px-4 py-3">Program</th>
                  <th className="px-4 py-3">Terbit</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {certificates.map((c) => (
                  <tr key={c.id}>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{c.number}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{c.participantName}</p>
                      <a
                        href={c.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-sky-700 hover:underline"
                      >
                        Lihat file
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-900">{c.programTitle}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {formatDateFull(c.issuedAt.toISOString().slice(0, 10))}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <form action={removeCertificate}>
                        <input type="hidden" name="id" value={c.id} />
                        <button
                          type="submit"
                          className="text-xs font-semibold text-red-600 hover:underline"
                        >
                          Hapus
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

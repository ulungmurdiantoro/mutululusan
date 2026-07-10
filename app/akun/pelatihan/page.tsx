import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { listOrdersForUser, type Order, type OrderStatus } from "@/lib/orders";
import { listBatchAssetsByIds, type BatchAsset } from "@/lib/batch-assets";
import { listCertificatesForUser } from "@/lib/certificates";
import { formatDateRange } from "@/lib/format";

export const metadata: Metadata = {
  title: "Pelatihan Saya",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const statusLabel: Record<OrderStatus, string> = {
  pending: "Menunggu pembayaran",
  paid: "Lunas",
  confirmed: "Terkonfirmasi",
  completed: "Selesai",
  expired: "Kadaluwarsa",
  cancelled: "Dibatalkan",
  refunded: "Dana dikembalikan",
};

function AssetLink({ href, label }: { href: string | null | undefined; label: string }) {
  if (!href) {
    return <p className="text-xs text-slate-400">{label}: belum tersedia</p>;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-sm font-semibold text-sky-700 hover:underline"
    >
      {label} <span aria-hidden>→</span>
    </a>
  );
}

export default async function PelatihanSayaPage() {
  const session = await auth();
  if (!session?.user) redirect("/masuk?callbackUrl=/akun/pelatihan");

  const user = session.user;
  const allOrders = await listOrdersForUser(user.id, user.email ?? "");
  const orders: Order[] = allOrders.filter((o) =>
    ["paid", "confirmed", "completed"].includes(o.status),
  );

  const assets: BatchAsset[] = await listBatchAssetsByIds(orders.map((o) => o.batchId));
  const assetByBatch = new Map(assets.map((a) => [a.batchId, a]));

  const certificates = await listCertificatesForUser(user.id);
  const certByOrder = new Map(certificates.map((c) => [c.orderId, c]));

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <nav className="text-sm text-slate-500">
          <Link href="/akun" className="hover:text-sky-700">
            ← Akun Saya
          </Link>
        </nav>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">Pelatihan Saya</h1>

        {orders.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-6">
            <p className="text-sm text-slate-600">
              Belum ada pelatihan yang lunas/terkonfirmasi pada akun ini. Riwayat
              pendaftaran akan muncul di sini setelah pembayaran dikonfirmasi.
            </p>
            <Link href="/pelatihan" className="btn-primary mt-4">
              Jelajahi Pelatihan
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.map((o) => {
              const asset = assetByBatch.get(o.batchId);
              const cert = certByOrder.get(o.orderId);
              return (
                <div key={o.orderId} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-bold text-slate-900">{o.programTitle}</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {formatDateRange(o.batchStartDate, o.batchEndDate)}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-sky-800">
                      {statusLabel[o.status]}
                    </span>
                  </div>

                  <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                    <AssetLink href={asset?.recordingUrl} label="Rekaman Zoom" />
                    <AssetLink href={asset?.materialsUrl} label="Materi" />
                    <AssetLink href={asset?.documentationUrl} label="Dokumentasi" />
                    {asset?.zoomInfo && (
                      <p className="text-xs text-slate-500">Info Zoom: {asset.zoomInfo}</p>
                    )}
                    <AssetLink href={cert?.fileUrl} label="E-Sertifikat" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

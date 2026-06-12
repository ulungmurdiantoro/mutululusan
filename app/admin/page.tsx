import type { Metadata } from "next";
import { cookies } from "next/headers";
import { listOrders, type Order, type OrderStatus } from "@/lib/orders";
import { formatDateFull, formatRupiah } from "@/lib/format";
import { ADMIN_COOKIE } from "../api/admin/login/route";
import { LoginForm, LogoutButton } from "./login-form";

export const metadata: Metadata = {
  title: "Dashboard Admin",
  robots: { index: false, follow: false },
};

// Selalu render dinamis: bergantung pada cookie sesi & data order terbaru.
export const dynamic = "force-dynamic";

const statusStyle: Record<OrderStatus, string> = {
  pending: "bg-orange-100 text-orange-800",
  paid: "bg-green-100 text-green-800",
  confirmed: "bg-sky-100 text-sky-800",
  completed: "bg-slate-200 text-slate-700",
  expired: "bg-slate-100 text-slate-500",
  cancelled: "bg-red-100 text-red-700",
  refunded: "bg-violet-100 text-violet-700",
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <p className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
        Belum ada order. Order akan muncul di sini setelah peserta melakukan
        checkout (memerlukan penyimpanan order yang dapat ditulis).
      </p>
    );
  }
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-slate-200 text-slate-500">
          <tr>
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Peserta</th>
            <th className="px-4 py-3">Program</th>
            <th className="px-4 py-3 text-center">Qty</th>
            <th className="px-4 py-3 text-right">Total</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Tanggal</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {orders.map((o) => (
            <tr key={o.orderId} className="align-top">
              <td className="px-4 py-3 font-mono text-xs text-slate-600">
                {o.orderId}
                {o.paymentChannel && (
                  <span className="mt-1 block text-[10px] uppercase text-slate-400">{o.paymentChannel}</span>
                )}
              </td>
              <td className="px-4 py-3">
                <p className="font-medium text-slate-900">{o.buyerName}</p>
                <p className="text-xs text-slate-500">{o.whatsapp}</p>
                {o.institution && <p className="text-xs text-slate-400">{o.institution}</p>}
              </td>
              <td className="px-4 py-3">
                <p className="text-slate-900">{o.programTitle}</p>
                {o.couponCode && <p className="text-xs text-green-600">Kupon: {o.couponCode}</p>}
              </td>
              <td className="px-4 py-3 text-center">{o.qty}</td>
              <td className="px-4 py-3 text-right font-semibold text-slate-900">{formatRupiah(o.total)}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle[o.status]}`}>
                  {o.status}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">
                {formatDateFull(o.createdAt.slice(0, 10))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function AdminPage() {
  const adminToken = process.env.ADMIN_TOKEN;
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  const authorized = Boolean(adminToken) && session === adminToken;

  if (!authorized) {
    return (
      <div className="bg-slate-50">
        <div className="mx-auto max-w-2xl px-4 py-16">
          {!adminToken && (
            <p className="mx-auto mb-6 max-w-sm rounded-lg bg-orange-50 px-4 py-3 text-center text-sm text-orange-800">
              Set variabel <code>ADMIN_TOKEN</code> di environment untuk mengaktifkan dashboard.
            </p>
          )}
          <LoginForm />
        </div>
      </div>
    );
  }

  const orders = await listOrders();
  const paid = orders.filter((o) => o.status === "paid" || o.status === "confirmed" || o.status === "completed");
  const pending = orders.filter((o) => o.status === "pending");
  const revenue = paid.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Dashboard Admin</h1>
          <LogoutButton />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total order" value={String(orders.length)} />
          <StatCard label="Lunas / terkonfirmasi" value={String(paid.length)} />
          <StatCard label="Menunggu pembayaran" value={String(pending.length)} />
          <StatCard label="Pendapatan terkonfirmasi" value={formatRupiah(revenue)} />
        </div>

        <OrdersTable orders={orders} />

        <p className="mt-6 text-xs text-slate-400">
          Catatan: data order disimpan pada penyimpanan file lokal. Untuk
          produksi serverless, hubungkan ke database (PostgreSQL + Prisma) pada
          <code> lib/orders.ts</code>.
        </p>
      </div>
    </div>
  );
}

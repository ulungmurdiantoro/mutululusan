"use client";

import { useMemo, useState } from "react";

interface OrderOption {
  orderId: string;
  buyerName: string;
  email: string;
  programTitle: string;
}

export function CertificateForm({
  orders,
  action,
}: {
  orders: OrderOption[];
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [orderId, setOrderId] = useState(orders[0]?.orderId ?? "");
  const selected = useMemo(
    () => orders.find((o) => o.orderId === orderId) ?? null,
    [orders, orderId],
  );

  if (orders.length === 0) {
    return (
      <p className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
        Belum ada order berstatus lunas/terkonfirmasi/selesai untuk diterbitkan
        sertifikatnya.
      </p>
    );
  }

  return (
    <form action={action} className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="font-bold text-slate-900">Terbitkan Sertifikat</h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-slate-700">Order</span>
          <select
            name="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          >
            {orders.map((o) => (
              <option key={o.orderId} value={o.orderId}>
                {o.buyerName} — {o.programTitle} ({o.orderId})
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Nomor sertifikat</span>
          <input
            name="number"
            required
            placeholder="MTL/2026/00123"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Nama peserta</span>
          <input
            name="participantName"
            required
            defaultValue={selected?.buyerName ?? ""}
            key={`name-${orderId}`}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-slate-700">Judul program</span>
          <input
            name="programTitle"
            required
            defaultValue={selected?.programTitle ?? ""}
            key={`title-${orderId}`}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-slate-700">Link file sertifikat (Google Drive)</span>
          <input
            name="fileUrl"
            required
            placeholder="https://drive.google.com/..."
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
      </div>

      <button type="submit" className="btn-primary mt-4">
        Terbitkan
      </button>
    </form>
  );
}

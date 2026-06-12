"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDateRange, formatRupiah } from "@/lib/format";
import { paymentMicrocopy, waLink } from "@/lib/site";

interface CheckoutBatch {
  id: string;
  startDate: string;
  endDate: string;
  mode: string;
  location: string | null;
}

interface CheckoutProgram {
  slug: string;
  title: string;
  basePrice: number | null;
  tieredPrices: { label: string; price: number }[] | null;
  batches: CheckoutBatch[];
}

interface SnapCallbacks {
  onSuccess: (result: { order_id: string }) => void;
  onPending: (result: { order_id: string }) => void;
  onError: () => void;
  onClose: () => void;
}

declare global {
  interface Window {
    snap?: { pay: (token: string, callbacks: SnapCallbacks) => void };
    gtag?: (...args: unknown[]) => void;
  }
}

const SNAP_SCRIPT_ID = "midtrans-snap-js";

export function CheckoutForm({ program }: { program: CheckoutProgram }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const preselected = searchParams.get("batch");
  const initialBatch = program.batches.some((b) => b.id === preselected)
    ? preselected!
    : program.batches[0].id;

  const [batchId, setBatchId] = useState(initialBatch);
  const [tier, setTier] = useState(program.tieredPrices?.[0]?.label ?? "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [institution, setInstitution] = useState("");
  const [qty, setQty] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discount: number; description: string } | null>(null);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);
  const [checkingCoupon, setCheckingCoupon] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gatewayDown, setGatewayDown] = useState(false);

  useEffect(() => {
    if (document.getElementById(SNAP_SCRIPT_ID)) return;
    const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_PRODUCTION === "true";
    const script = document.createElement("script");
    script.id = SNAP_SCRIPT_ID;
    script.src = isProduction
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "",
    );
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    window.gtag?.("event", "begin_checkout", {
      currency: "IDR",
      items: [{ item_id: program.slug, item_name: program.title }],
    });
  }, [program.slug, program.title]);

  const unitPrice =
    program.tieredPrices?.find((t) => t.label === tier)?.price ??
    program.basePrice ??
    0;
  const subtotal = unitPrice * qty;
  const discount = coupon?.discount ?? 0;
  const total = subtotal - discount;
  const selectedBatch = program.batches.find((b) => b.id === batchId)!;

  // Kupon bergantung pada program, qty, dan tier; reset bila salah satu berubah.
  function resetCoupon() {
    if (coupon) {
      setCoupon(null);
      setCouponMsg(null);
    }
  }

  async function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    setCheckingCoupon(true);
    setCouponMsg(null);
    try {
      const res = await fetch("/api/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, slug: program.slug, qty, tier: tier || undefined }),
      });
      const data = await res.json();
      if (data.valid) {
        setCoupon({ code: data.code, discount: data.discount, description: data.description });
        setCouponMsg(`Kupon ${data.code} diterapkan — hemat ${formatRupiah(data.discount)}.`);
      } else {
        setCoupon(null);
        setCouponMsg(data.reason ?? "Kupon tidak valid.");
      }
    } catch {
      setCouponMsg("Gagal memeriksa kupon. Coba lagi.");
    } finally {
      setCheckingCoupon(false);
    }
  }

  const waFallbackMessage = `Halo admin, saya ingin mendaftar:\n\nProgram: ${program.title}\nBatch: ${formatDateRange(selectedBatch.startDate, selectedBatch.endDate)}\nNama: ${name}\nEmail: ${email}\nInstansi: ${institution || "-"}\nJumlah peserta: ${qty}\n\nMohon dibantu proses pembayarannya.`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: program.slug,
          batchId,
          tier: tier || undefined,
          name,
          email,
          whatsapp,
          institution,
          qty,
          couponCode: coupon?.code,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.code === "GATEWAY_NOT_CONFIGURED") {
          setGatewayDown(true);
        } else {
          setError(data.error ?? "Terjadi kesalahan. Coba lagi.");
        }
        return;
      }

      if (!window.snap) {
        setError(
          "Modul pembayaran belum termuat. Periksa koneksi Anda lalu coba lagi.",
        );
        return;
      }

      window.gtag?.("event", "add_payment_info", {
        currency: "IDR",
        value: data.grossAmount,
      });

      window.snap.pay(data.token, {
        onSuccess: (result) => {
          window.gtag?.("event", "purchase", {
            transaction_id: result.order_id,
            currency: "IDR",
            value: data.grossAmount,
          });
          router.push(`/pembayaran/sukses?order_id=${result.order_id}`);
        },
        onPending: (result) => {
          router.push(`/pembayaran/pending?order_id=${result.order_id}`);
        },
        onError: () => {
          setError("Pembayaran gagal diproses. Silakan coba metode lain.");
        },
        onClose: () => {
          // Popup ditutup tanpa membayar — biarkan peserta melanjutkan kapan saja.
        },
      });
    } catch {
      setError("Tidak dapat terhubung ke server. Periksa koneksi Anda.");
    } finally {
      setSubmitting(false);
    }
  }

  if (gatewayDown) {
    return (
      <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Pembayaran online sedang tidak tersedia
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Jangan khawatir — pendaftaran Anda tetap bisa diproses melalui admin
          dengan transfer manual.
        </p>
        <a
          href={waLink(waFallbackMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-5"
        >
          Lanjutkan Pendaftaran via WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {/* Step 1 — Pilih batch */}
      <fieldset className="rounded-2xl border border-slate-200 bg-white p-6">
        <legend className="px-2 font-bold text-slate-900">1. Pilih Batch</legend>
        <div className="space-y-3">
          {program.batches.map((batch) => (
            <label
              key={batch.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                batchId === batch.id
                  ? "border-sky-600 bg-sky-50"
                  : "border-slate-200 hover:border-sky-300"
              }`}
            >
              <input
                type="radio"
                name="batch"
                value={batch.id}
                checked={batchId === batch.id}
                onChange={() => setBatchId(batch.id)}
                className="accent-sky-700"
              />
              <span>
                <span className="block font-semibold text-slate-900">
                  {formatDateRange(batch.startDate, batch.endDate)}
                </span>
                <span className="block text-sm text-slate-500">
                  {batch.mode}
                  {batch.location ? ` · ${batch.location}` : " · via Zoom"}
                </span>
              </span>
            </label>
          ))}
        </div>

        {program.tieredPrices && (
          <div className="mt-5">
            <p className="text-sm font-semibold text-slate-700">Kategori peserta</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {program.tieredPrices.map((t) => (
                <label
                  key={t.label}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 transition ${
                    tier === t.label
                      ? "border-sky-600 bg-sky-50"
                      : "border-slate-200 hover:border-sky-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="tier"
                    value={t.label}
                    checked={tier === t.label}
                    onChange={() => {
                      setTier(t.label);
                      resetCoupon();
                    }}
                    className="accent-sky-700"
                  />
                  <span className="text-sm">
                    <span className="font-semibold text-slate-900">{t.label}</span>{" "}
                    — {formatRupiah(t.price)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </fieldset>

      {/* Step 2 — Data peserta */}
      <fieldset className="rounded-2xl border border-slate-200 bg-white p-6">
        <legend className="px-2 font-bold text-slate-900">2. Data Peserta</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Nama lengkap *</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
              placeholder="Nama sesuai sertifikat"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email *</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
              placeholder="nama@email.com"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">No. WhatsApp *</span>
            <input
              type="tel"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
              placeholder="08xxxxxxxxxx"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Instansi (opsional)</span>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
              placeholder="Nama perusahaan/kampus"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Jumlah peserta</span>
            <input
              type="number"
              min={1}
              max={50}
              value={qty}
              onChange={(e) => {
                setQty(Math.max(1, Number(e.target.value) || 1));
                resetCoupon();
              }}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Mendaftarkan banyak peserta atas nama instansi? Data peserta lain dapat
          dilengkapi setelah pembayaran melalui admin.
        </p>

        <div className="mt-5 border-t border-slate-100 pt-5">
          <span className="text-sm font-semibold text-slate-700">Kode promo (opsional)</span>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase());
                resetCoupon();
              }}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 uppercase focus:border-sky-600 focus:outline-none"
              placeholder="Mis. EARLYBIRD2026"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={checkingCoupon || !couponCode.trim()}
              className="btn-outline shrink-0 px-5 py-2.5 text-sm disabled:opacity-60"
            >
              {checkingCoupon ? "…" : "Pakai"}
            </button>
          </div>
          {couponMsg && (
            <p className={`mt-2 text-sm ${coupon ? "text-green-600" : "text-red-600"}`}>
              {couponMsg}
            </p>
          )}
        </div>
      </fieldset>

      {/* Step 3 — Ringkasan & bayar */}
      <fieldset className="rounded-2xl border border-slate-200 bg-white p-6">
        <legend className="px-2 font-bold text-slate-900">3. Ringkasan</legend>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Program</dt>
            <dd className="text-right font-semibold text-slate-900">{program.title}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Batch</dt>
            <dd className="font-semibold text-slate-900">
              {formatDateRange(selectedBatch.startDate, selectedBatch.endDate)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">
              Biaya × {qty} peserta{tier ? ` (${tier.toLowerCase()})` : ""}
            </dt>
            <dd className="font-semibold text-slate-900">{formatRupiah(subtotal)}</dd>
          </div>
          {discount > 0 && (
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Diskon{coupon ? ` (${coupon.code})` : ""}</dt>
              <dd className="font-semibold text-green-600">−{formatRupiah(discount)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4 border-t border-slate-200 pt-3 text-base">
            <dt className="font-bold text-slate-900">Total</dt>
            <dd className="font-bold text-sky-700">{formatRupiah(total)}</dd>
          </div>
        </dl>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full disabled:opacity-60">
          {submitting ? "Memproses…" : `Bayar Sekarang — ${formatRupiah(total)}`}
        </button>
        <p className="mt-3 text-center text-xs text-slate-500">{paymentMicrocopy}</p>
        <p className="mt-2 text-center text-xs text-slate-500">
          Kesulitan membayar online?{" "}
          <a
            href={waLink(waFallbackMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sky-700 hover:underline"
          >
            Daftar via admin
          </a>
        </p>
      </fieldset>
    </form>
  );
}

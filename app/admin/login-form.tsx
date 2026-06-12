"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Gagal masuk.");
        return;
      }
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-sm rounded-2xl border border-slate-200 bg-white p-6">
      <h1 className="text-xl font-bold text-slate-900">Masuk Dashboard Admin</h1>
      <p className="mt-1 text-sm text-slate-500">Masukkan token admin untuk melanjutkan.</p>
      <label className="mt-5 block">
        <span className="text-sm font-semibold text-slate-700">Token admin</span>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-sky-600 focus:outline-none"
          autoFocus
        />
      </label>
      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
      <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full disabled:opacity-60">
        {submitting ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/login", { method: "DELETE" });
        router.refresh();
      }}
      className="text-sm font-semibold text-sky-700 hover:underline"
    >
      Keluar
    </button>
  );
}

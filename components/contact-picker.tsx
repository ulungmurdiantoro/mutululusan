"use client";

import { useEffect, useRef } from "react";
import { waLink } from "@/lib/site";

const categories = [
  {
    label: "Pelatihan Individual",
    message: "Halo admin, saya ingin bertanya tentang pendaftaran pelatihan individual.",
  },
  {
    label: "In-House / Fakultas",
    message:
      "Halo admin, kami ingin bertanya tentang in-house training untuk fakultas/tim kami.",
  },
  {
    label: "Kemitraan Institusi",
    message: "Halo admin, kami ingin bertanya tentang kemitraan institusi dengan mutululusan.id.",
  },
  {
    label: "Lainnya",
    message: "Halo admin, saya punya pertanyaan lain untuk mutululusan.id.",
  },
];

export function ContactPickerModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="w-full max-w-sm rounded-2xl border border-slate-200 p-0 backdrop:bg-slate-900/40"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Hubungi Kami</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Pilih kategori kebutuhan Anda — kami arahkan ke WhatsApp dengan pesan yang sesuai.
        </p>
        <div className="mt-5 space-y-2">
          {categories.map((c) => (
            <a
              key={c.label}
              href={waLink(c.message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex min-h-11 items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-green-400 hover:bg-green-50"
            >
              {c.label}
              <span aria-hidden className="text-green-600">→</span>
            </a>
          ))}
        </div>
      </div>
    </dialog>
  );
}

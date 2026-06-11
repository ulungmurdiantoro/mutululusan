import type { Metadata } from "next";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan Refund & Reschedule",
  description:
    "Ketentuan pembatalan, pengembalian dana, dan pemindahan jadwal (reschedule) pelatihan di mutululusan.id — jelas dan adil untuk peserta.",
  alternates: { canonical: "/kebijakan-refund" },
};

export default function KebijakanRefundPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Kebijakan Refund & Reschedule
        </h1>
        <p className="mt-2 text-sm text-slate-500">Berlaku efektif: 11 Juni 2026</p>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">1. Reschedule (Pindah Batch)</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
            <li className="flex gap-2">
              <span className="text-sky-600" aria-hidden>•</span>
              Reschedule gratis 1× ke batch berikutnya pada program yang sama,
              dengan pemberitahuan minimal 3 hari sebelum pelaksanaan dan sesuai
              ketersediaan kursi.
            </li>
            <li className="flex gap-2">
              <span className="text-sky-600" aria-hidden>•</span>
              Pengajuan kurang dari 3 hari sebelum pelaksanaan tetap dapat
              dipertimbangkan untuk kondisi darurat (sakit/duka) dengan bukti
              pendukung.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">2. Pembatalan oleh Peserta</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
            <li className="flex gap-2">
              <span className="text-sky-600" aria-hidden>•</span>
              Pembatalan ≥ 7 hari sebelum pelaksanaan: refund 100% (dipotong
              biaya transfer/gateway bila ada).
            </li>
            <li className="flex gap-2">
              <span className="text-sky-600" aria-hidden>•</span>
              Pembatalan 3–6 hari sebelum pelaksanaan: refund 50%, atau
              reschedule gratis ke batch lain.
            </li>
            <li className="flex gap-2">
              <span className="text-sky-600" aria-hidden>•</span>
              Pembatalan &lt; 3 hari sebelum pelaksanaan: tidak ada refund,
              namun peserta tetap mendapatkan rekaman dan materi.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">3. Pembatalan oleh Penyelenggara</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
            <li className="flex gap-2">
              <span className="text-sky-600" aria-hidden>•</span>
              Jika batch dibatalkan (mis. kuota minimum tidak terpenuhi),
              peserta memilih: refund 100% atau pindah ke batch/program lain
              tanpa biaya.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">4. Proses Refund</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
            <li className="flex gap-2">
              <span className="text-sky-600" aria-hidden>•</span>
              Pengajuan refund disampaikan melalui WhatsApp admin dengan
              menyertakan nomor order dan alasan.
            </li>
            <li className="flex gap-2">
              <span className="text-sky-600" aria-hidden>•</span>
              Refund diproses maksimal 14 hari kerja ke rekening/metode
              pembayaran asal.
            </li>
          </ul>
        </section>

        <a
          href={waLink("Halo admin, saya ingin mengajukan refund/reschedule.\n\nNomor order: \nProgram: \nAlasan: ")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline mt-10"
        >
          Ajukan Refund / Reschedule via WhatsApp
        </a>
      </div>
    </div>
  );
}

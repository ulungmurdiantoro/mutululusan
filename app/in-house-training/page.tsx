import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "In-House Training Laboratorium untuk Instansi",
  description:
    "Selenggarakan pelatihan laboratorium khusus untuk tim Anda: materi disesuaikan, jadwal fleksibel, online atau di lokasi. Minta penawaran sekarang!",
  alternates: { canonical: "/in-house-training" },
};

const advantages = [
  {
    title: "Materi disesuaikan",
    desc: "Kurikulum diadaptasi dengan jenis laboratorium, metode uji, dan tingkat kompetensi tim Anda.",
  },
  {
    title: "Jadwal fleksibel",
    desc: "Pilih tanggal sendiri — online via Zoom atau tatap muka di lokasi instansi Anda.",
  },
  {
    title: "Lebih hemat untuk grup",
    desc: "Untuk 10+ peserta, biaya per orang jauh lebih efisien dibanding kelas publik.",
  },
  {
    title: "Studi kasus internal",
    desc: "Latihan menggunakan dokumen dan kasus nyata laboratorium Anda (dengan kerahasiaan terjaga).",
  },
];

const topics = [
  "K3 Laboratorium & pengelolaan limbah B3",
  "Good Laboratory Practice (GLP)",
  "Jaminan mutu & ketidakpastian pengukuran",
  "QC/QA dan sistem manajemen mutu (ISO 9001)",
  "Pranata laboratorium & manajemen operasional",
  "Keamanan pangan & uji sensori",
];

export default function InHousePage() {
  const waMessage =
    "Halo admin, saya ingin meminta penawaran in-house training.\n\nInstansi: \nTopik: \nEstimasi jumlah peserta: \nFormat (online/offline): \nRencana waktu: ";

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <Breadcrumb items={[{ label: "In-House Training" }]} />
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            In-House Training Laboratorium untuk Instansi
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Tingkatkan kompetensi seluruh tim laboratorium sekaligus — materi
            disesuaikan kebutuhan, jadwal mengikuti Anda, diselenggarakan online
            atau langsung di lokasi instansi.
          </p>
          <a
            href={waLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6"
          >
            Minta Penawaran Sekarang
          </a>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Keunggulan In-House Training
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {advantages.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 p-5">
                <p className="font-bold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold text-slate-900">
            Topik yang Dapat Diselenggarakan
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {topics.map((topic) => (
              <li
                key={topic}
                className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700"
              >
                <span className="text-sky-600" aria-hidden>✓</span>
                {topic}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            Topik lain di bidang laboratorium juga dapat didiskusikan —{" "}
            <Link href="/pelatihan" className="font-semibold text-sky-700 hover:underline">
              lihat katalog lengkap program kami
            </Link>
            .
          </p>

          <h2 className="mt-14 text-2xl font-bold text-slate-900">Cara Memesan</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "1. Kirim kebutuhan",
                desc: "Sampaikan topik, jumlah peserta, format, dan rencana waktu via WhatsApp atau email.",
              },
              {
                step: "2. Terima proposal & invoice",
                desc: "Kami kirimkan proposal materi, fasilitator, dan penawaran resmi untuk proses pengadaan instansi Anda.",
              },
              {
                step: "3. Pelaksanaan",
                desc: "Pelatihan berjalan sesuai jadwal; peserta menerima sertifikat, materi, dan rekaman (untuk kelas online).",
              },
            ].map((s) => (
              <li key={s.step} className="rounded-xl border border-slate-200 p-5">
                <p className="font-bold text-sky-700">{s.step}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-sky-100 bg-sky-50 p-7 text-center text-slate-900">
            <h2 className="text-xl font-bold">Siap menyusun program untuk tim Anda?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
              Kami juga melayani pendaftaran kelas publik dengan invoice instansi
              dan pembayaran transfer korporat.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={waLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Minta Penawaran via WhatsApp
              </a>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Permintaan Penawaran In-House Training")}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-white"
              >
                Kirim Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

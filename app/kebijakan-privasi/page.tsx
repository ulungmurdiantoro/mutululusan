import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi mutululusan.id: data apa yang kami kumpulkan, bagaimana digunakan, dan hak Anda atas data pribadi.",
  alternates: { canonical: "/kebijakan-privasi" },
};

const sections = [
  {
    title: "1. Data yang Kami Kumpulkan",
    body: "Saat mendaftar pelatihan, kami mengumpulkan nama lengkap, alamat email, nomor WhatsApp, nama instansi (opsional), dan data pembayaran yang diproses oleh penyedia payment gateway. Kami juga mengumpulkan data penggunaan website secara agregat melalui alat analitik untuk meningkatkan layanan.",
  },
  {
    title: "2. Penggunaan Data",
    body: "Data peserta digunakan untuk: memproses pendaftaran dan pembayaran, mengirimkan akses pelatihan (link Zoom, grup peserta, materi, rekaman), menerbitkan sertifikat, mengirimkan pengingat jadwal, serta menginformasikan program yang relevan. Anda dapat berhenti menerima informasi promosi kapan saja.",
  },
  {
    title: "3. Pembagian Data kepada Pihak Ketiga",
    body: "Kami tidak menjual data pribadi Anda. Data hanya dibagikan kepada pihak ketiga yang diperlukan untuk menjalankan layanan: penyedia payment gateway (untuk memproses pembayaran), penyedia layanan email/WhatsApp (untuk notifikasi), dan penyelenggara pelatihan mitra (untuk administrasi kelas dan sertifikat).",
  },
  {
    title: "4. Keamanan & Penyimpanan",
    body: "Kami menerapkan langkah keamanan yang wajar untuk melindungi data Anda. Data pembayaran kartu tidak disimpan di server kami — seluruh pemrosesan dilakukan oleh payment gateway yang tersertifikasi PCI-DSS.",
  },
  {
    title: "5. Hak Anda",
    body: `Anda berhak meminta akses, perbaikan, atau penghapusan data pribadi Anda dengan menghubungi kami di ${site.email}. Permintaan diproses maksimal 14 hari kerja.`,
  },
  {
    title: "6. Perubahan Kebijakan",
    body: "Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Perubahan material akan diinformasikan melalui website. Penggunaan layanan setelah perubahan dianggap sebagai persetujuan atas kebijakan terbaru.",
  },
];

export default function KebijakanPrivasiPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Kebijakan Privasi
        </h1>
        <p className="mt-2 text-sm text-slate-500">Berlaku efektif: 11 Juni 2026</p>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

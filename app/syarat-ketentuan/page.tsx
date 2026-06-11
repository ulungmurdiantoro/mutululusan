import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan layanan pelatihan dan sertifikasi kompetensi di mutululusan.id.",
  alternates: { canonical: "/syarat-ketentuan" },
};

const sections = [
  {
    title: "1. Ketentuan Umum",
    items: [
      "Dengan melakukan pendaftaran dan/atau pembayaran di mutululusan.id, peserta dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan ini.",
      "mutululusan.id berhak memperbarui syarat dan ketentuan sewaktu-waktu; versi terbaru yang dipublikasikan di halaman ini yang berlaku.",
    ],
  },
  {
    title: "2. Pendaftaran & Pembayaran",
    items: [
      "Kursi peserta terkonfirmasi setelah pembayaran diterima penuh (status PAID) atau setelah bukti transfer manual diverifikasi admin.",
      "Pembayaran online memiliki batas waktu 24 jam sejak order dibuat; melewati batas tersebut order otomatis kedaluwarsa.",
      "Harga yang berlaku adalah harga yang tercantum di website pada saat pembayaran dilakukan.",
      "Untuk harga khusus (mis. kategori mahasiswa), peserta wajib menunjukkan bukti yang sah (kartu mahasiswa aktif) saat diminta; ketidaksesuaian dapat dikenakan selisih biaya.",
    ],
  },
  {
    title: "3. Pelaksanaan Pelatihan",
    items: [
      "Link Zoom, grup peserta, dan materi dikirimkan kepada peserta terkonfirmasi sebelum hari pelaksanaan.",
      "Jadwal dapat berubah karena kondisi di luar kendali penyelenggara; peserta terdaftar akan diberi tahu dan ditawarkan batch pengganti.",
      "Peserta yang berhalangan hadir tetap mendapatkan rekaman, materi, dan sertifikat selama terdaftar.",
      "Penyelenggara berhak membatalkan batch jika kuota minimum tidak terpenuhi; seluruh pembayaran peserta akan dikembalikan 100% atau dialihkan ke batch lain sesuai pilihan peserta.",
    ],
  },
  {
    title: "4. Sertifikat",
    items: [
      "e-Sertifikat diterbitkan sesuai nama yang diisi peserta saat pendaftaran; pastikan penulisan nama benar.",
      "Perbaikan nama sertifikat setelah diterbitkan dapat dilayani melalui admin.",
      "Sertifikat pelatihan berbeda dengan sertifikat kompetensi; sertifikasi kompetensi memerlukan proses asesmen terpisah.",
    ],
  },
  {
    title: "5. Hak Kekayaan Intelektual",
    items: [
      "Seluruh materi, rekaman, dan konten pelatihan hanya untuk penggunaan pribadi peserta dan dilarang disebarluaskan, diperjualbelikan, atau dipublikasikan ulang tanpa izin tertulis.",
    ],
  },
  {
    title: "6. Pembatalan & Refund",
    items: [
      "Ketentuan pembatalan, refund, dan reschedule diatur dalam Kebijakan Refund & Reschedule yang merupakan bagian tak terpisahkan dari syarat dan ketentuan ini.",
    ],
  },
];

export default function SyaratKetentuanPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Syarat & Ketentuan
        </h1>
        <p className="mt-2 text-sm text-slate-500">Berlaku efektif: 11 Juni 2026</p>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
              <ul className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <li key={item.slice(0, 40)} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                    <span className="text-sky-600" aria-hidden>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

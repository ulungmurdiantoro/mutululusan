import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ — Pertanyaan Seputar Pelatihan & Pembayaran",
  description:
    "Jawaban lengkap seputar pendaftaran, pembayaran, sertifikat, rekaman, reschedule, dan sertifikasi kompetensi di mutululusan.id.",
  alternates: { canonical: "/faq" },
};

const faqGroups = [
  {
    title: "Pendaftaran & Pembayaran",
    faqs: [
      {
        question: "Bagaimana cara mendaftar pelatihan?",
        answer:
          "Buka halaman program yang diminati, klik Daftar & Bayar Sekarang, pilih batch, isi data peserta, lalu selesaikan pembayaran. Konfirmasi otomatis dikirim ke email dan WhatsApp Anda.",
      },
      {
        question: "Metode pembayaran apa saja yang tersedia?",
        answer:
          "QRIS, virtual account semua bank, e-wallet (GoPay, OVO, DANA), kartu kredit/debit, dan paylater. Tersedia juga transfer manual dengan konfirmasi admin melalui halaman Konfirmasi Pembayaran.",
      },
      {
        question: "Apakah bisa dibayari oleh kantor/instansi?",
        answer:
          "Bisa. Kami menerbitkan invoice resmi atas nama instansi dan menerima pembayaran transfer korporat. Hubungi admin via WhatsApp dengan menyebutkan program, jumlah peserta, dan data instansi.",
      },
      {
        question: "Saya sudah transfer manual, bagaimana konfirmasinya?",
        answer:
          "Kirimkan bukti transfer melalui halaman Konfirmasi Pembayaran atau langsung ke WhatsApp admin. Tim kami memverifikasi maksimal 1×24 jam pada hari kerja.",
      },
    ],
  },
  {
    title: "Pelaksanaan Pelatihan",
    faqs: [
      {
        question: "Bagaimana format pelatihan online dilaksanakan?",
        answer:
          "Pelatihan online berlangsung via Zoom selama 2 hari, pukul 09.00–16.00 WIB, dipandu fasilitator praktisi. Link Zoom dan grup peserta dikirim setelah pembayaran terkonfirmasi.",
      },
      {
        question: "Bagaimana jika saya berhalangan hadir?",
        answer:
          "Seluruh sesi direkam. Anda tetap mendapatkan rekaman lengkap, soft copy materi, dan e-sertifikat selama terdaftar sebagai peserta.",
      },
      {
        question: "Apakah saya bisa pindah ke batch lain (reschedule)?",
        answer:
          "Bisa, maksimal 3 hari sebelum pelaksanaan dengan menghubungi admin, sesuai ketersediaan kursi batch tujuan. Detail lengkap ada di Kebijakan Refund & Reschedule.",
      },
    ],
  },
  {
    title: "Sertifikat & Sertifikasi Kompetensi",
    faqs: [
      {
        question: "Sertifikat apa yang saya dapatkan?",
        answer:
          "Peserta pelatihan online mendapatkan e-sertifikat pelatihan 24 JP (jam pelajaran). Untuk program hybrid dan workshop tertentu, tersedia juga sertifikasi kompetensi melalui asesmen yang diselenggarakan mitra resmi kami, LSP Edukia.",
      },
      {
        question: "Apa itu JP pada sertifikat?",
        answer:
          "JP adalah jam pelajaran — satuan durasi pembelajaran yang umum digunakan untuk pengembangan kompetensi profesi di Indonesia. Pelatihan 2 hari kami setara 24 JP.",
      },
      {
        question: "Bagaimana cara melanjutkan ke sertifikasi kompetensi?",
        answer:
          "Setelah memiliki sertifikat pelatihan, hubungi admin untuk dihubungkan dengan mitra resmi kami, LSP Edukia, dan memilih skema sertifikasi yang sesuai. Selengkapnya di halaman Sertifikasi Kompetensi.",
      },
    ],
  },
  {
    title: "Untuk Institusi",
    faqs: [
      {
        question: "Apakah bisa dibuatkan penawaran resmi/proposal untuk pengadaan?",
        answer:
          "Bisa. Isi form \"Ajukan Penawaran untuk Institusi\", sebutkan kebutuhan Anda, dan tim kami akan mengirimkan penawaran/proposal tertulis.",
      },
      {
        question: "Apakah tersedia skema harga rombongan/institusi?",
        answer:
          "Skema harga institusi disesuaikan dengan jumlah peserta dan kebutuhan spesifik — ajukan kebutuhan Anda lewat form \"Ajukan Penawaran\" dan tim kami akan memberikan penawaran yang sesuai.",
      },
      {
        question: "Apakah bisa kerja sama MOU/PKS jangka panjang?",
        answer:
          "Bisa, tersedia skema Kemitraan/Partnership dengan MOU/PKS untuk kerja sama tahunan — termasuk untuk instansi pemerintah dan kampus negeri yang memerlukan proses pengadaan formal.",
      },
      {
        question: "Bagaimana proses penagihan/invoice untuk instansi?",
        answer:
          "Kami menerbitkan invoice resmi dengan pembayaran transfer korporat. Anda bisa membuat proforma invoice sendiri di halaman Invoice Instansi, atau melalui tim kami setelah penawaran disepakati.",
      },
      {
        question: "Apakah sertifikat dan JP diakui untuk kebutuhan akreditasi/kum dosen?",
        answer:
          "e-Sertifikat 24 JP yang kami terbitkan adalah satuan jam pelatihan dari penyelenggara kami. Pengakuannya untuk kum dosen atau akreditasi prodi sepenuhnya bergantung pada kebijakan internal masing-masing institusi — kami menyediakan dokumentasi pendukung yang dapat digunakan dalam proses tersebut.",
      },
    ],
  },
];

export default function FaqPage() {
  const allFaqs = faqGroups.flatMap((g) => g.faqs);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="mt-3 text-slate-600">
            Semua yang perlu Anda ketahui tentang pendaftaran, pembayaran,
            pelaksanaan, dan sertifikat.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          {faqGroups.map((group) => (
            <div key={group.title} className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-slate-900">{group.title}</h2>
              <FaqList faqs={group.faqs} />
            </div>
          ))}

          <div className="rounded-2xl bg-slate-50 p-6 text-center">
            <p className="font-bold text-slate-900">Belum menemukan jawaban?</p>
            <p className="mt-1 text-sm text-slate-600">
              Admin kami siap membantu di jam kerja (Senin–Jumat, 08.00–17.00 WIB).
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={waLink("Halo admin, saya punya pertanyaan yang belum terjawab di FAQ.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa px-5 py-2.5 text-sm"
              >
                Chat Admin via WhatsApp
              </a>
              <Link href="/kontak" className="btn-outline px-5 py-2.5 text-sm">
                Lihat Semua Kontak
              </Link>
              <Link href="/ajukan-penawaran" className="btn-outline px-5 py-2.5 text-sm">
                Ajukan Penawaran Institusi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

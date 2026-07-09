export type ProgramType = "online" | "hybrid" | "offline";

export interface Batch {
  id: string;
  startDate: string;
  endDate: string;
  mode: "Online" | "Hybrid" | "Offline";
  location?: string;
  /** Tanggal berbeda antar-poster sumber; tampilkan disclaimer sampai dikonfirmasi penyelenggara. */
  needsConfirmation?: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface SyllabusSection {
  title: string;
  points: string[];
}

export interface TieredPrice {
  label: string;
  price: number;
}

export interface Program {
  slug: string;
  title: string;
  subtitle: string;
  type: ProgramType;
  jp: number | null;
  durationDays: number;
  /** null = harga belum dipublikasikan; arahkan ke WhatsApp admin. */
  basePrice: number | null;
  tieredPrices?: TieredPrice[];
  priority?: boolean;
  excerpt: string;
  description: string[];
  careerNote: string;
  audience: string[];
  syllabus: SyllabusSection[];
  benefits: string[];
  faqs: Faq[];
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  related: string[];
  batches: Batch[];
  /** true bila program ini disimpan di DB (ditambahkan admin), bukan di kode. */
  fromDb?: boolean;
}

export interface CareerScheme {
  title: string;
  alias?: string;
  slug: string;
}

export type CareerCategoryColor = "sky" | "emerald" | "teal" | "amber";
export type CareerCategoryIcon = "check" | "leaf" | "flask" | "gear";

export interface CareerCategory {
  key: string;
  name: string;
  desc: string;
  color: CareerCategoryColor;
  iconKey: CareerCategoryIcon;
  schemes: CareerScheme[];
}

/** Empat bidang karier — dipakai di beranda ("Pilih bidang kariermu") & katalog /pelatihan. */
export const careerCategories: CareerCategory[] = [
  {
    key: "mgmt",
    name: "Management & Governance",
    desc: "Sistem manajemen, tata kelola, dan kepatuhan organisasi",
    color: "sky",
    iconKey: "check",
    schemes: [
      { title: "Quality Management System (ISO 9001) Officer", slug: "iso-9001-officer" },
      { title: "Food Safety Management Officer", alias: "Petugas Sistem Keamanan Pangan", slug: "food-safety-management" },
      { title: "Regulatory Affairs Officer", slug: "regulatory-affairs-officer" },
      { title: "Quality Assurance Officer", slug: "quality-assurance-officer" },
      { title: "Corporate Legal Officer", slug: "corporate-legal-officer" },
    ],
  },
  {
    key: "sus",
    name: "Sustainability & ESG",
    desc: "Keberlanjutan lingkungan, sosial, dan tata kelola organisasi",
    color: "emerald",
    iconKey: "leaf",
    schemes: [
      { title: "Environmental Management System (ISO 14001) Officer", slug: "iso-14001-officer" },
      { title: "ESG Officer", slug: "esg-officer" },
      { title: "Sustainability Officer", slug: "sustainability-officer" },
    ],
  },
  {
    key: "lab",
    name: "Laboratory & Testing",
    desc: "Sistem mutu, operasional, dan pengujian laboratorium",
    color: "teal",
    iconKey: "flask",
    schemes: [
      { title: "Laboratory Quality System Officer", alias: "Petugas Sistem Mutu Laboratorium ISO/IEC 17025", slug: "iso-17025-quality-system-officer" },
      { title: "Panelis Terlatih Pengujian Sensori Pangan", slug: "uji-sensori-pangan" },
      { title: "GLP Laboratory Technician", alias: "Teknisi Laboratorium Berbasis GLP", slug: "glp-laboratory-technician" },
      { title: "Laboratory HSE Officer", alias: "Petugas K3L Laboratorium", slug: "laboratory-hse-officer-k3l" },
      { title: "Laboratory Operations Officer", alias: "Pranata Laboratorium", slug: "pranata-laboratorium" },
      { title: "QC Laboratory Analyst", alias: "Analis QC Laboratorium", slug: "qc-laboratory-analyst" },
      { title: "Research and Development Officer", slug: "research-development-officer" },
      { title: "Jaminan Mutu Hasil Pengujian", slug: "jaminan-mutu" },
      { title: "Ketidakpastian Pengukuran", alias: "Estimasi Measurement Uncertainty", slug: "ketidakpastian-pengukuran" },
    ],
  },
  {
    key: "eng",
    name: "Industrial Engineering & Lifting",
    desc: "Rekayasa teknik dan operasional lifting industri",
    color: "amber",
    iconKey: "gear",
    schemes: [
      { title: "Lifting Engineer for Medium Lifting", slug: "lifting-engineer-medium" },
      { title: "Lifting Engineer for Heavy & Critical Lifting", slug: "lifting-engineer-heavy-critical" },
      { title: "2D Lifting Designer", slug: "lifting-designer-2d" },
      { title: "3D Lifting Designer", slug: "lifting-designer-3d" },
    ],
  },
];

export function categoryKeyForSlug(slug: string): string | undefined {
  return careerCategories.find((cat) => cat.schemes.some((s) => s.slug === slug))?.key;
}

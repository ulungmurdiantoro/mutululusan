import Link from "next/link";
import { JsonLd } from "./json-ld";
import { site } from "@/lib/site";

export interface BreadcrumbItem {
  label: string;
  /** Kosongkan untuk item terakhir (halaman aktif, tidak jadi link). */
  href?: string;
}

/** Breadcrumb visual + JSON-LD BreadcrumbList sekaligus, dari satu sumber data. */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const full: BreadcrumbItem[] = [{ label: "Beranda", href: "/" }, ...items];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${site.url}${item.href ?? ""}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
        {full.map((item, i) => (
          <span key={item.label}>
            {i > 0 && <span className="mx-2">/</span>}
            {item.href && i < full.length - 1 ? (
              <Link href={item.href} className="hover:text-sky-700">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}

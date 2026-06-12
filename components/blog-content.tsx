import Link from "next/link";
import type { BlogBlock } from "@/lib/blog";

export function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="pt-3 text-2xl font-bold text-slate-900">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="text-xl font-bold text-slate-900">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p
                key={i}
                className={
                  block.lead
                    ? "text-lg leading-relaxed text-slate-700"
                    : "leading-relaxed text-slate-600"
                }
              >
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2 text-slate-600">
                    <span className="text-sky-600" aria-hidden>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-2 pl-5 text-slate-600 marker:font-semibold marker:text-sky-600">
                {block.items.map((item) => (
                  <li key={item} className="pl-1 leading-relaxed">{item}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-sky-500 bg-sky-50 px-5 py-4 text-lg font-medium italic text-slate-700"
              >
                {block.text}
              </blockquote>
            );
          case "cta":
            return (
              <div key={i} className="rounded-2xl border border-orange-200 bg-orange-50 p-6 not-italic">
                <p className="font-bold text-slate-900">{block.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{block.text}</p>
                <Link
                  href={block.href}
                  className="mt-3 inline-block text-sm font-semibold text-sky-700 hover:underline"
                >
                  {block.label} →
                </Link>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

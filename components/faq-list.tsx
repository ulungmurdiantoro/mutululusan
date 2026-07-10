"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Faq } from "@/lib/programs";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {faqs.map((faq) => {
        const isOpen = openQuestion === faq.question;
        const panelId = `${baseId}-${faq.question}`;

        return (
          <div key={faq.question} className="px-5 py-4">
            <button
              type="button"
              onClick={() => setOpenQuestion(isOpen ? null : faq.question)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-slate-900"
            >
              {faq.question}
              <span
                className="shrink-0 text-sky-700 transition-transform"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                aria-hidden
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

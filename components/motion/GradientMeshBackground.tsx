"use client";

import { motion, useReducedMotion } from "framer-motion";

export function GradientMeshBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-[60%] w-[60%] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-sky-500), transparent)" }}
        animate={shouldReduceMotion ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-1/3 h-[50%] w-[50%] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-orange-300), transparent)" }}
        animate={shouldReduceMotion ? undefined : { x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}

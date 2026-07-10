"use client";

import { useReducedMotion } from "framer-motion";

export function useMotionVariants() {
  const shouldReduceMotion = useReducedMotion();
  return {
    fadeUp: {
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.4 } },
    },
    stagger: (staggerChildren = 0.08) => ({
      hidden: {},
      visible: { transition: { staggerChildren } },
    }),
  };
}

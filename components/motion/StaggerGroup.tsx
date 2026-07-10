"use client";

import { motion } from "framer-motion";
import { useMotionVariants } from "@/lib/motion-config";

export function StaggerGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { stagger } = useMotionVariants();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger(0.08)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { fadeUp } = useMotionVariants();
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

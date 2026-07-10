"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { id: "main", cx: 300, cy: 200, r: 14 },
  { id: "n1", cx: 150, cy: 100, r: 8 },
  { id: "n2", cx: 450, cy: 90, r: 8 },
  { id: "n3", cx: 500, cy: 260, r: 8 },
  { id: "n4", cx: 120, cy: 280, r: 8 },
  { id: "n5", cx: 320, cy: 340, r: 8 },
];

const edges: [string, string][] = [
  ["main", "n1"],
  ["main", "n2"],
  ["main", "n3"],
  ["main", "n4"],
  ["main", "n5"],
];

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function NetworkVisualization() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 600 400" className="h-full w-full" aria-hidden="true">
      {edges.map(([from, to], i) => {
        const a = getNode(from);
        const b = getNode(to);
        return (
          <motion.line
            key={i}
            x1={a.cx}
            y1={a.cy}
            x2={b.cx}
            y2={b.cy}
            stroke="var(--color-sky-300)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
          />
        );
      })}

      {nodes
        .filter((n) => n.id !== "main")
        .map((n, i) => (
          <motion.circle
            key={n.id}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill="var(--color-sky-400)"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              shouldReduceMotion
                ? { scale: 1, opacity: 1 }
                : { scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }
            }
            transition={{
              scale: { duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" },
              opacity: { duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" },
            }}
          />
        ))}

      <motion.circle
        cx={getNode("main").cx}
        cy={getNode("main").cy}
        r={getNode("main").r}
        fill="var(--color-sky-600)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "backOut" }}
      />
    </svg>
  );
}

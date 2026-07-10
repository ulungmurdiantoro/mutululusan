"use client";

import { motion, useReducedMotion } from "framer-motion";

/** PRNG seeded deterministik — hasil node/edge harus identik di server & client (hindari hydration mismatch). */
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WIDTH = 1200;
const HEIGHT = 420;
const NODE_COUNT = 34;
const NEAREST_K = 3;
const MAX_EDGE_DIST = 260;

const rand = mulberry32(42);

type Node = { x: number; y: number; r: number; opacity: number };

const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => {
  const depth = rand();
  return {
    x: rand() * WIDTH,
    y: rand() * HEIGHT,
    r: 2 + depth * 4,
    opacity: 0.35 + depth * 0.5,
  };
});

function dist(a: Node, b: Node) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

const edges: [number, number][] = [];
const seen = new Set<string>();
nodes.forEach((n, i) => {
  const nearest = nodes
    .map((m, j) => ({ j, d: dist(n, m) }))
    .filter((o) => o.j !== i)
    .sort((a, b) => a.d - b.d)
    .slice(0, NEAREST_K);

  nearest.forEach(({ j, d }) => {
    if (d > MAX_EDGE_DIST) return;
    const key = i < j ? `${i}-${j}` : `${j}-${i}`;
    if (seen.has(key)) return;
    seen.add(key);
    edges.push([i, j]);
  });
});

export function NetworkVisualization() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <motion.g
        initial={{ opacity: 0 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 1, x: [0, 12, 0], y: [0, 8, 0] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 1 }
            : {
                opacity: { duration: 1.2 },
                x: { duration: 24, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 24, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        {edges.map(([i, j], idx) => {
          const a = nodes[i];
          const b = nodes[j];
          return (
            <line
              key={idx}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="var(--color-sky-600)"
              strokeWidth={1}
              opacity={0.16}
            />
          );
        })}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="var(--color-sky-600)"
            opacity={n.opacity * 0.5}
          />
        ))}
      </motion.g>
    </svg>
  );
}

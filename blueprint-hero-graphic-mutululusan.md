# Blueprint Hero Graphic — mutululusan.id (Next.js)

> Lanjutan dari `blueprint-redesign-mutululusan.md` dan `blueprint-animasi-nextjs-mutululusan.md` (keduanya sudah dijalankan).
> Scope dokumen ini: **hanya hero graphic** — network visualization (konsep 2) + gradient mesh background (konsep 4).
> Stack: Next.js (App Router) + Framer Motion + Tailwind.

---

## 1. Tujuan

Menambahkan elemen visual animasi di Hero Section berupa kombinasi:
- **Network visualization**: node & garis terhubung merepresentasikan ekosistem 3 produk (mutululusan.id, mutuperguruantinggi.id, labnesia.id)
- **Gradient mesh background**: gradasi warna brand bergerak halus di belakang seluruh hero

Tanpa mengganggu keterbacaan headline, value props, dan CTA yang sudah ada.

## 2. Non-Goals

- Tidak mengubah struktur/komponen Hero Section yang sudah ada (headline, 4 bullet value props, CTA) — graphic ini murni elemen tambahan/dekoratif.
- Tidak memakai canvas/WebGL/Three.js — cukup SVG + CSS agar ringan.
- Tidak menambahkan library baru di luar Framer Motion (sudah terpasang dari blueprint animasi sebelumnya).

---

## 3. Struktur Layer di Hero Section

```
HeroSection (relative, overflow-hidden)
├── GradientMeshBackground   → paling belakang, -z-10, full cover
├── NetworkVisualization     → tengah, z-10, posisi kanan (desktop) / belakang teks opacity rendah (mobile)
└── HeroContent (existing)   → paling depan, z-20, TIDAK DIUBAH
```

---

## 4. `<GradientMeshBackground>`

Dua blob gradient radial dengan blur besar, bergerak pelan (translate x/y) secara looping — memberi kesan "hidup" tanpa elemen konkret.

```tsx
// components/motion/GradientMeshBackground.tsx
"use client";
import { motion } from "framer-motion";

export function GradientMeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[60%] h-[60%] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, var(--brand-500), transparent)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-[50%] h-[50%] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, var(--brand-300), transparent)" }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}
```

**Catatan:** ganti `--brand-500` / `--brand-300` dengan CSS variable warna brand yang sudah ada di project (cek `tailwind.config` / `globals.css`). Jangan menambah token warna baru.

---

## 5. `<NetworkVisualization>`

SVG inline dengan 1 node utama (mutululusan.id) dan 5 node pendukung terhubung garis. Garis muncul dengan animasi "menggambar" (`pathLength`), node kecil pulse bergantian, node utama muncul dengan efek scale-in.

```tsx
// components/motion/NetworkVisualization.tsx
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
  ["main", "n1"], ["main", "n2"], ["main", "n3"], ["main", "n4"], ["main", "n5"],
];

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function NetworkVisualization() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 600 400" className="w-full h-full" aria-hidden="true">
      {edges.map(([from, to], i) => {
        const a = getNode(from);
        const b = getNode(to);
        return (
          <motion.line
            key={i}
            x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy}
            stroke="var(--brand-300)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
          />
        );
      })}

      {nodes.filter((n) => n.id !== "main").map((n, i) => (
        <motion.circle
          key={n.id}
          cx={n.cx} cy={n.cy} r={n.r}
          fill="var(--brand-400)"
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
        cx={getNode("main").cx} cy={getNode("main").cy} r={getNode("main").r}
        fill="var(--brand-600)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "backOut" }}
      />
    </svg>
  );
}
```

---

## 6. Komposisi di `HeroSection`

```tsx
import { GradientMeshBackground } from "@/components/motion/GradientMeshBackground";
import { NetworkVisualization } from "@/components/motion/NetworkVisualization";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <GradientMeshBackground />

      <div className="absolute inset-y-0 right-0 w-1/2 hidden md:block opacity-80 pointer-events-none">
        <NetworkVisualization />
      </div>

      <div className="relative z-20 max-w-2xl">
        {/* headline, 4 value props, CTA — struktur existing, TIDAK DIUBAH */}
      </div>
    </section>
  );
}
```

- **Desktop (`md:` ke atas):** `NetworkVisualization` tampil penuh di setengah kanan hero.
- **Mobile:** disembunyikan (`hidden`) — atau, jika tetap ingin ada kesan graphic di mobile, tampilkan versi sangat kecil dengan `opacity-20` di belakang teks (opsional, bukan wajib).

---

## 7. Performa & Aksesibilitas

| Aspek | Ketentuan |
|---|---|
| Rendering | SVG inline, bukan file `.svg` terpisah yang di-fetch — hindari request tambahan di elemen above-the-fold |
| Screen reader | `aria-hidden="true"` pada kedua komponen (murni dekoratif) |
| Reduced motion | Wajib cek `useReducedMotion()` — saat aktif, node pulse langsung jadi statis (lihat §5) |
| Jumlah elemen animasi | Maksimal 6 node — jangan ditambah demi "ramai", batasi beban repaint |
| Loading | Load sebagai Client Component (`"use client"` sudah ada di tiap file); jika ingin mempercepat FCP teks hero, bisa di-defer dengan `dynamic(() => import(...), { ssr: false })` di `HeroSection` khusus untuk kedua komponen ini |
| Animasi properti | Hanya `transform` (`x`, `y`, `scale`) dan `opacity` — hindari animasi `width`/`height`/posisi absolut langsung |

---

## 8. Checklist Implementasi

- [ ] Buat `components/motion/GradientMeshBackground.tsx`
- [ ] Buat `components/motion/NetworkVisualization.tsx`
- [ ] Import & pasang keduanya di `HeroSection` sesuai struktur layer §3
- [ ] Sesuaikan `var(--brand-500)`, `var(--brand-400)`, `var(--brand-300)`, `var(--brand-600)` dengan token warna brand yang sudah ada
- [ ] Test tampilan di breakpoint mobile (pastikan tidak menutupi teks/CTA)
- [ ] Test dengan `prefers-reduced-motion: reduce` aktif di OS/browser
- [ ] Jalankan Lighthouse setelah implementasi — pastikan CLS & FCP hero tidak memburuk dibanding sebelum penambahan graphic

---

## 9. Catatan untuk Claude Code

- Komponen ini didesain independen — bisa dipasang tanpa menyentuh file `HeroSection` lain selain menambah 2 import + wrapper div sesuai §6.
- Jangan mengubah teks/copy/CTA yang sudah ada di `HeroSection`; scope ini murni penambahan layer visual.
- Jika project belum punya CSS variable `--brand-*`, cek dulu skema warna yang dipakai (Tailwind config atau `globals.css`) sebelum hardcode warna baru.

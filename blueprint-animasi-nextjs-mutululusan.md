# Blueprint Animasi — mutululusan.id (Next.js)

> Lanjutan dari `blueprint-redesign-mutululusan.md` (sudah dijalankan).
> Scope dokumen ini: menambahkan lapisan animasi/interaksi di atas struktur yang sudah ada.
> Stack: Next.js. Library animasi: **Framer Motion** (utama) + CSS native untuk hover state sederhana.

---

## 1. Tujuan

Menambahkan animasi yang bermakna (scroll reveal, hover feedback, transisi filter/tab, counter) tanpa menambah beban performa signifikan, dan tetap menghormati preferensi aksesibilitas pengguna (`prefers-reduced-motion`).

## 2. Non-Goals

- Tidak mengubah struktur komponen/sitemap dari blueprint sebelumnya.
- Tidak mengubah copy/konten.
- Tidak menambahkan animasi berat (parallax multi-layer, particle system kompleks, autoplay video besar).

---

## 3. Setup Awal

```bash
npm install framer-motion
```

Buat helper global untuk menghormati reduced motion di seluruh animasi:

```tsx
// lib/motion-config.ts
import { useReducedMotion } from "framer-motion";

export function useMotionVariants() {
  const shouldReduceMotion = useReducedMotion();
  return {
    fadeUp: {
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
```

Semua komponen animasi WAJIB memakai helper ini, bukan mendefinisikan variant duplikat di tiap file.

---

## 4. Komponen Reusable

### 4.1 `<ScrollReveal>` — wrapper generik untuk section
```tsx
// components/motion/ScrollReveal.tsx
"use client";
import { motion } from "framer-motion";
import { useMotionVariants } from "@/lib/motion-config";

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { fadeUp } = useMotionVariants();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```
**Pakai di:** `EcosystemStrip`, `InstitutionalValueProps`, `WhyUs`, `FAQPreview` — bungkus tiap section sekali, jangan bungkus tiap elemen kecil di dalamnya (hindari over-animation).

### 4.2 `<StaggerGroup>` — untuk grid kartu (Featured Programs, kartu skema layanan)
```tsx
// components/motion/StaggerGroup.tsx
"use client";
import { motion } from "framer-motion";
import { useMotionVariants } from "@/lib/motion-config";

export function StaggerGroup({ children, className }: { children: React.ReactNode; className?: string }) {
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

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const { fadeUp } = useMotionVariants();
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}
```
**Pakai di:** `<FeaturedPrograms>` (bungkus grid 6 kartu dengan `StaggerGroup`, tiap `ProgramCard` dibungkus `StaggerItem`) dan grid kartu di `/pelatihan`.

### 4.3 `<AnimatedCounter>` — untuk angka kredibilitas (alumni, mitra, dsb — jika/saat ditambahkan)
```tsx
// components/motion/AnimatedCounter.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (v) => setDisplay(Math.floor(v)));
  }, [springValue]);

  return <span ref={ref}>{display.toLocaleString("id-ID")}{suffix}</span>;
}
```

### 4.4 `<HoverCard>` — wrapper hover untuk ProgramCard (CSS native, bukan Framer Motion — lebih ringan)
```css
/* styles/hover-card.module.css */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
  .card:hover {
    transform: none;
  }
}
```
**Catatan:** hover state kartu TIDAK perlu Framer Motion — CSS transition lebih murah secara performa untuk interaksi sesederhana ini.

---

## 5. Implementasi per Section

| Section | Animasi | Komponen |
|---|---|---|
| `HeroSection` headline | Fade-up staggered per baris teks | `StaggerGroup` + `StaggerItem` per baris |
| `EcosystemStrip` | Fade-up saat scroll masuk viewport | `ScrollReveal` |
| `InstitutionalValueProps` (IKU/SKPI) | Fade-up per kartu, stagger antar kartu | `StaggerGroup` + `StaggerItem` |
| `ServiceSchemeTabs` | Sliding underline indicator saat ganti tab + crossfade konten | `motion.div layoutId="tab-indicator"` (lihat §5.1) |
| `FeaturedPrograms` (6 kartu) | Stagger reveal saat scroll + hover elevasi per kartu | `StaggerGroup`/`StaggerItem` + `HoverCard` CSS |
| `CatalogFilterBar` (`/pelatihan`) | Kartu ter-filter fade-out & grid re-layout otomatis | `AnimatePresence` + `layout` prop (lihat §5.2) |
| `WhyUs` | Fade-up sekali per section | `ScrollReveal` |
| `FAQPreview` | Accordion expand/collapse smooth height | `AnimatePresence` + `motion.div` height auto |
| `FinalCTA` / `ContactRouter` modal | Slide-up + fade saat modal dibuka | `AnimatePresence` (lihat §5.3) |
| `Navbar` | Transparan → solid dengan shadow saat scroll melewati hero | `useScroll` + `useTransform` (lihat §5.4) |

### 5.1 Tab dengan sliding indicator
```tsx
{schemes.map((scheme) => (
  <button key={scheme.id} onClick={() => setActive(scheme.id)} className="relative px-4 py-2">
    {scheme.label}
    {active === scheme.id && (
      <motion.div
        layoutId="tab-indicator"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
  </button>
))}
```

### 5.2 Filter grid dengan layout animation
```tsx
import { AnimatePresence, motion } from "framer-motion";

<motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <AnimatePresence>
    {filteredPrograms.map((program) => (
      <motion.div
        key={program.id}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
      >
        <ProgramCard {...program} />
      </motion.div>
    ))}
  </AnimatePresence>
</motion.div>
```

### 5.3 Modal ContactRouter
```tsx
<AnimatePresence>
  {isOpen && (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed bottom-0 left-0 right-0 md:relative md:mx-auto md:mt-20 z-50 bg-white rounded-t-2xl md:rounded-2xl p-6"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
      >
        {/* pilihan kategori kebutuhan */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

### 5.4 Navbar scroll transition
```tsx
"use client";
import { useScroll, useTransform, motion } from "framer-motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const background = useTransform(scrollY, [0, 120], ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]);
  const boxShadow = useTransform(scrollY, [0, 120], ["0 0 0 rgba(0,0,0,0)", "0 2px 12px rgba(0,0,0,0.08)"]);

  return (
    <motion.nav style={{ background, boxShadow }} className="fixed top-0 w-full z-50 transition-colors">
      {/* nav content */}
    </motion.nav>
  );
}
```

---

## 6. Aturan Performa Wajib

1. **Semua komponen animasi pakai `"use client"`** — jangan animasikan Server Component langsung.
2. **`viewport={{ once: true }}` wajib** di semua `whileInView` — animasi hanya jalan sekali saat pertama terlihat, tidak berulang tiap scroll naik-turun.
3. **Jangan animasikan lebih dari ~12 elemen bersamaan** dalam satu viewport (batasi stagger group per section, bukan animasikan seluruh grid 21 kartu sekaligus di `/pelatihan`).
4. **Hindari animasi `width`/`height`/`top`/`left`** — gunakan `transform` dan `opacity` saja (GPU-accelerated, tidak memicu reflow).
5. **Lazy-load Framer Motion untuk komponen non-kritis** jika bundle size jadi masalah:
   ```tsx
   const AnimatedCounter = dynamic(() => import("@/components/motion/AnimatedCounter"), { ssr: false });
   ```
6. **Uji dengan Lighthouse** setelah implementasi — pastikan CLS (Cumulative Layout Shift) tetap rendah, terutama untuk hero dan navbar.

---

## 7. Aksesibilitas

- Semua animasi tunduk pada `useReducedMotion()` (lihat §3) — jika user mengaktifkan "reduce motion" di OS, animasi fade-up/stagger otomatis jadi instant tanpa transisi.
- Modal (`ContactRouter`) harus tetap bisa ditutup dengan tombol `Esc` dan fokus trap standar — animasi tidak boleh mengganggu keyboard navigation.
- Accordion FAQ: pastikan `aria-expanded` berubah sesuai state, terlepas dari animasi height.

---

## 8. Prioritas Implementasi

1. **P0** — Setup `motion-config.ts`, `<ScrollReveal>`, `<StaggerGroup>` → pasang di section utama homepage (Hero, EcosystemStrip, InstitutionalValueProps, FeaturedPrograms)
2. **P1** — `<HoverCard>` CSS untuk semua ProgramCard, sliding tab indicator di ServiceSchemeTabs
3. **P2** — Filter grid animation di `/pelatihan`, Navbar scroll transition
4. **P3** — Modal ContactRouter animation, FAQ accordion, AnimatedCounter (jika section angka kredibilitas sudah ada datanya)

---

## 9. Catatan untuk Claude Code

- Cek dulu apakah project pakai App Router atau Pages Router sebelum menempatkan `"use client"` — struktur di atas mengasumsikan App Router (Next.js 13+).
- Jika Tailwind sudah dipakai di project, style contoh di atas (`className="..."`) tinggal disesuaikan token warna/spacing yang sudah ada, jangan bikin token baru.
- Implementasikan bertahap sesuai §8 — jangan pasang semua animasi sekaligus dalam satu PR, supaya mudah dites performanya per tahap (terutama cek Lighthouse setelah P0 dan P2).

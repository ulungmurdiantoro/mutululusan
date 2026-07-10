import Link from "next/link";
import type { Program } from "@/lib/programs";
import { ProgramCard } from "./program-card";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";

/**
 * Ringkasan katalog untuk homepage — bukan seluruh program (lihat blueprint
 * redesign: homepage tidak lagi menampung 21 kartu penuh). Kurasi memakai
 * flag `priority` yang sudah ada di data program (dipakai juga oleh Footer).
 */
export function FeaturedPrograms({ programs }: { programs: Program[] }) {
  const featured = programs.filter((p) => p.priority).slice(0, 6);

  return (
    <div>
      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((program) => (
          <StaggerItem key={program.slug}>
            <ProgramCard program={program} />
          </StaggerItem>
        ))}
      </StaggerGroup>
      <div className="mt-8 text-center">
        <Link href="/pelatihan" className="btn-primary">
          Lihat Semua {programs.length} Program <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

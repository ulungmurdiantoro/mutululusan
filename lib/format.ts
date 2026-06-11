const MONTHS_ID = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const MONTHS_ID_FULL = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

function parseISODate(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

export function formatDateRange(startISO: string, endISO: string): string {
  const s = parseISODate(startISO);
  const e = parseISODate(endISO);
  if (s.y === e.y && s.m === e.m) {
    return `${s.d}–${e.d} ${MONTHS_ID[s.m - 1]} ${s.y}`;
  }
  if (s.y === e.y) {
    return `${s.d} ${MONTHS_ID[s.m - 1]} – ${e.d} ${MONTHS_ID[e.m - 1]} ${s.y}`;
  }
  return `${s.d} ${MONTHS_ID[s.m - 1]} ${s.y} – ${e.d} ${MONTHS_ID[e.m - 1]} ${e.y}`;
}

export function formatDateFull(iso: string): string {
  const { y, m, d } = parseISODate(iso);
  return `${d} ${MONTHS_ID_FULL[m - 1]} ${y}`;
}

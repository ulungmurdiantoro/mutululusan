import { ImageResponse } from "next/og";

/** Ukuran & tipe standar dipakai semua route `opengraph-image.tsx`. */
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/**
 * Template OG bermerek dipakai lintas halaman — hindari duplikasi JSX
 * ImageResponse (Satori tidak baca Tailwind, jadi style di-inline).
 */
export function renderOgImage({
  title,
  subtitle,
  tag,
}: {
  title: string;
  subtitle?: string;
  tag?: string;
}) {
  const shortTitle = truncate(title, 70);
  const titleFontSize = shortTitle.length > 48 ? 46 : shortTitle.length > 30 ? 54 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #eef6fd 0%, #ffffff 55%, #fef5eb 100%)",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 32, fontWeight: 800 }}>
          <span style={{ color: "#449fe5" }}>mutu</span>
          <span style={{ color: "#f4891f" }}>lulusan.id</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          {tag && (
            <div
              style={{
                display: "flex",
                width: "fit-content",
                marginBottom: 22,
                borderRadius: 999,
                background: "#eef6fd",
                color: "#286aa6",
                fontWeight: 700,
                fontSize: 22,
                padding: "8px 22px",
              }}
            >
              {tag}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: titleFontSize,
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.15,
            }}
          >
            {shortTitle}
          </div>
          {subtitle && (
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 26,
                color: "#334155",
                lineHeight: 1.4,
              }}
            >
              {truncate(subtitle, 130)}
            </div>
          )}
        </div>

        <div style={{ display: "flex", fontSize: 20, color: "#64748b" }}>mutululusan.id</div>
      </div>
    ),
    { ...ogImageSize },
  );
}

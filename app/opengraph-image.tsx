import { ImageResponse } from "next/og";

export const alt = "mutululusan.id — Pelatihan & Sertifikasi Kompetensi Laboratorium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #eef6fd 0%, #ffffff 55%, #fef5eb 100%)",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 68, fontWeight: 800 }}>
          <span style={{ color: "#449fe5" }}>mutu</span>
          <span style={{ color: "#f4891f" }}>lulusan.id</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            color: "#334155",
            textAlign: "center",
            maxWidth: 920,
            display: "flex",
          }}
        >
          Pelatihan & Sertifikasi Kompetensi Laboratorium
        </div>
        <div style={{ marginTop: 36, display: "flex", gap: 16 }}>
          <div
            style={{
              background: "#f4891f",
              color: "#fff",
              fontWeight: 700,
              fontSize: 24,
              padding: "12px 28px",
              borderRadius: 999,
              display: "flex",
            }}
          >
            e-Sertifikat 24 JP
          </div>
          <div
            style={{
              background: "#449fe5",
              color: "#fff",
              fontWeight: 700,
              fontSize: 24,
              padding: "12px 28px",
              borderRadius: 999,
              display: "flex",
            }}
          >
            Online & Offline
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

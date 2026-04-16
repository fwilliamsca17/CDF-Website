import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Capital Direct Funding — Fast Private Lending for California Real Estate";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #0B2E47 0%, #1F699E 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          fontFamily: "system-ui",
          position: "relative",
        }}
      >
        {/* Accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#D4A017",
          }}
        />

        {/* Company name */}
        <div
          style={{
            color: "#D4A017",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          CAPITAL DIRECT FUNDING
        </div>

        {/* Headline */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: 24,
            maxWidth: 800,
          }}
        >
          Fast, Flexible Private Lending
        </div>

        {/* Subheadline */}
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 24,
            lineHeight: 1.5,
            maxWidth: 700,
            marginBottom: 40,
          }}
        >
          Over $200M deployed across 500+ transactions in California. Close in as few as 7 days.
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 48 }}>
          {[
            { value: "$200M+", label: "Capital Deployed" },
            { value: "500+", label: "Loans Funded" },
            { value: "7 Days", label: "Average Close" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  color: "#D4A017",
                  fontSize: 36,
                  fontWeight: 800,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 14,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom info */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 16 }}>
            capitaldf.com
          </div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            DRE# 01885595 | NMLS# 1159831
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

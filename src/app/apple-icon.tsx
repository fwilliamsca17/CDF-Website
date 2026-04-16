import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#1F699E",
          borderRadius: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <div
          style={{
            color: "#D4A017",
            fontSize: 72,
            fontWeight: 900,
            fontFamily: "system-ui",
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          CDF
        </div>
      </div>
    ),
    { ...size }
  );
}

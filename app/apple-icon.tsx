import { ImageResponse } from "next/og"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0f172a",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          fontWeight: 800,
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div style={{ color: "#34d399", fontSize: 28 }}>Selenium</div>
        <div style={{ fontSize: 42 }}>Practice</div>
      </div>
    ),
    size
  )
}

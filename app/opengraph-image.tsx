import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f8fafc",
          color: "#0f172a",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: 64,
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#047857",
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          Selenium Automation Playground
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.05 }}>
            Selenium Automation Practice Website
          </div>
          <div style={{ color: "#475569", fontSize: 34, lineHeight: 1.35 }}>
            Practice alerts, forms, waits, dropdowns, file uploads, frames,
            windows, and advanced UI interactions.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
            color: "#ffffff",
            fontSize: 26,
            fontWeight: 800,
          }}
        >
          <span style={{ background: "#0f172a", borderRadius: 14, padding: 18 }}>
            11+ Modules
          </span>
          <span style={{ background: "#047857", borderRadius: 14, padding: 18 }}>
            50+ Scenarios
          </span>
          <span style={{ background: "#be123c", borderRadius: 14, padding: 18 }}>
            WebDriver Ready
          </span>
        </div>
      </div>
    ),
    size
  )
}

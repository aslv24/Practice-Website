"use client"

import DashboardBackLink from "@/components/layout/DashboardBackLink"

const SITES = [
  {
    id: "badssl-expired",
    name: "expired.badssl.com",
    url: "https://expired.badssl.com/",
    error: "ERR_CERT_DATE_INVALID",
    desc: "Expired SSL certificate",
    tag: "Expired",
    color: "#ef4444",
    bg: "#fef2f2",
    border: "#fecaca",
    tagBg: "#fee2e2",
  },
  {
    id: "badssl-self-signed",
    name: "self-signed.badssl.com",
    url: "https://self-signed.badssl.com/",
    error: "ERR_CERT_AUTHORITY_INVALID",
    desc: "Self-signed certificate",
    tag: "Self-Signed",
    color: "#f97316",
    bg: "#fff7ed",
    border: "#fed7aa",
    tagBg: "#ffedd5",
  },
  {
    id: "badssl-wrong-host",
    name: "wrong.host.badssl.com",
    url: "https://wrong.host.badssl.com/",
    error: "ERR_CERT_COMMON_NAME_INVALID",
    desc: "Certificate for wrong hostname",
    tag: "Wrong Host",
    color: "#ca8a04",
    bg: "#fefce8",
    border: "#fef08a",
    tagBg: "#fef9c3",
  },
  {
    id: "badssl-untrusted",
    name: "untrusted-root.badssl.com",
    url: "https://untrusted-root.badssl.com/",
    error: "ERR_CERT_AUTHORITY_INVALID",
    desc: "Untrusted root certificate",
    tag: "Untrusted Root",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    tagBg: "#ede9fe",
  },
]

export default function HttpsErrorsPage() {
  return (
    <div className="alerts-page">
      {/* Header */}
      <div className="alerts-page__header">
        <h1 className="alerts-page__title">HTTPS Context Errors</h1>
        <p className="alerts-page__description">
          Practice Playwright&apos;s <code>ignoreHTTPSErrors</code> context option
          using real SSL/certificate error pages. Click any site to open it in a new tab.
        </p>
        <DashboardBackLink />
      </div>

      {/* Centered content */}
      <div style={{
        maxWidth: "640px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>

        {/* Info banner */}
        <div style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: "0.75rem",
          padding: "0.875rem 1.1rem",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.6rem",
        }}>
          <span style={{ fontSize: "1rem", flexShrink: 0 }}>ℹ️</span>
          <p id="https-info-text" style={{
            fontSize: "0.82rem",
            color: "#1e40af",
            lineHeight: 1.55,
            margin: 0,
          }}>
            These sites have <strong>intentionally broken SSL certificates</strong>. Without{" "}
            <code>ignoreHTTPSErrors: true</code> in your Playwright context, navigation will
            throw an error — that&apos;s the behaviour you are practising.
          </p>
        </div>

        {/* Site cards */}
        {SITES.map((site) => (
          <div
            key={site.id}
            id={site.id}
            style={{
              background: site.bg,
              border: `1px solid ${site.border}`,
              borderRadius: "0.85rem",
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            {/* Left info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  id={`${site.id}-tag`}
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: site.color,
                    background: site.tagBg,
                    border: `1px solid ${site.border}`,
                    padding: "0.15rem 0.55rem",
                    borderRadius: "999px",
                  }}
                >
                  {site.tag}
                </span>
              </div>
              <p id={`${site.id}-desc`} style={{ fontSize: "0.82rem", color: "#374151", margin: 0 }}>
                {site.desc}
              </p>
              <code
                id={`${site.id}-error`}
                style={{ fontSize: "0.72rem", color: site.color, fontFamily: "monospace" }}
              >
                {site.error}
              </code>
            </div>

            {/* Open button */}
            <a
              id={`${site.id}-link`}
              href={site.url}
              target="_blank"
              rel="noreferrer"
              style={{
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: site.color,
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.8rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                transition: "opacity 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseOver={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseOut={e => (e.currentTarget.style.opacity = "1")}
            >
              Open ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

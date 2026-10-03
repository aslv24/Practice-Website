/**
 * HTTPS Practice Server
 * ---------------------
 * Starts a local HTTPS server with a SELF-SIGNED certificate on port 8443.
 * Browsers will show "Your connection is not private" — exactly like expired.badssl.com.
 *
 * Use this to practice:
 *   Playwright: browser.newContext({ ignoreHTTPSErrors: true })
 *   Selenium:   ChromeOptions + acceptInsecureCerts = True
 *
 * Usage:
 *   npm run https-practice
 *
 * Target URL:
 *   https://localhost:8443/
 */

"use strict"

const https = require("node:https")
const selfsigned = require("selfsigned")

const PORT = 8443
const HOST = "localhost"

// ── Generate self-signed certificate ────────────────────────────────────────
console.log("⚙️  Generating self-signed certificate…")

const attrs = [
  { name: "commonName",       value: "localhost" },
  { name: "organizationName", value: "Selenium Automation Practice" },
  { name: "countryName",      value: "IN" },
]

const pems = selfsigned.generate(attrs, {
  keySize:   2048,
  days:      1,        // valid but SELF-SIGNED → browser will warn
  algorithm: "sha256",
  extensions: [
    { name: "subjectAltName", altNames: [{ type: 2, value: "localhost" }] },
  ],
})

// ── HTML page served by the HTTPS server ─────────────────────────────────────
const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTTPS Practice — Self-Signed</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #dc2626;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      color: #fff;
      padding: 2rem;
    }
    h1 {
      font-size: clamp(2.5rem, 8vw, 5rem);
      font-weight: 900;
      letter-spacing: -0.02em;
      text-align: center;
      text-shadow: 0 4px 24px rgba(0,0,0,0.3);
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(0,0,0,0.25);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 9999px;
      padding: 0.4rem 1.25rem;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 2.5rem;
    }
    .info-card {
      background: rgba(0,0,0,0.2);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 1rem;
      padding: 1.75rem 2rem;
      max-width: 520px;
      width: 100%;
      text-align: left;
    }
    .info-card h2 {
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.7;
      margin-bottom: 1rem;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      font-size: 0.875rem;
    }
    .info-row:last-child { border-bottom: none; }
    .info-row .label { opacity: 0.7; }
    .info-row .value {
      font-family: monospace;
      font-weight: 600;
      background: rgba(255,255,255,0.1);
      padding: 0.1rem 0.5rem;
      border-radius: 0.3rem;
    }
    .note {
      margin-top: 2rem;
      font-size: 0.8rem;
      opacity: 0.6;
      text-align: center;
      max-width: 420px;
    }
  </style>
</head>
<body>
  <div class="badge">⚠️ Self-Signed Certificate</div>
  <h1 id="practice-heading">localhost:8443</h1>

  <div class="info-card">
    <h2>Certificate Info</h2>
    <div class="info-row">
      <span class="label">Host</span>
      <span class="value" id="cert-host">localhost:8443</span>
    </div>
    <div class="info-row">
      <span class="label">Certificate Type</span>
      <span class="value" id="cert-type">Self-Signed</span>
    </div>
    <div class="info-row">
      <span class="label">Trusted by Browser</span>
      <span class="value" id="cert-trusted">No</span>
    </div>
    <div class="info-row">
      <span class="label">ignoreHTTPSErrors needed</span>
      <span class="value" id="cert-ignore-needed">true</span>
    </div>
    <div class="info-row">
      <span class="label">Page Title</span>
      <span class="value" id="page-title-label">HTTPS Practice — Self-Signed</span>
    </div>
    <div class="info-row">
      <span class="label">Status</span>
      <span class="value" id="page-status">✅ Accessible</span>
    </div>
  </div>

  <p class="note" id="practice-note">
    This server is for Selenium &amp; Playwright practice only.<br/>
    If you can read this, ignoreHTTPSErrors is working correctly.
  </p>
</body>
</html>`

// ── Start the HTTPS server ───────────────────────────────────────────────────
const server = https.createServer({ key: pems.private, cert: pems.cert }, (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
  res.end(HTML)
})

server.listen(PORT, HOST, () => {
  console.log("")
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("  🔒 HTTPS Practice Server")
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log(`  URL  : https://${HOST}:${PORT}/`)
  console.log("  Cert : Self-Signed (browser will show SSL warning)")
  console.log("")
  console.log("  Playwright usage:")
  console.log("  const ctx = await browser.newContext({ ignoreHTTPSErrors: true })")
  console.log(`  await page.goto('https://localhost:${PORT}/')`)
  console.log("")
  console.log("  Selenium usage (Python):")
  console.log("  options = ChromeOptions()")
  console.log("  options.add_argument('--ignore-certificate-errors')")
  console.log("  # OR: desired_caps['acceptInsecureCerts'] = True")
  console.log("")
  console.log("  Press Ctrl+C to stop.")
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
})

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n❌ Port ${PORT} is already in use. Stop any other process using it and retry.\n`)
  } else {
    console.error("\n❌ Server error:", err.message, "\n")
  }
  process.exit(1)
})

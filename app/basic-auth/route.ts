// Basic HTTP Authentication Route Handler
// Returns 401 with WWW-Authenticate header to trigger the browser's native login dialog.
// Valid credentials: username = "admin", password = "admin"

import { randomUUID } from "node:crypto"

export const dynamic = "force-dynamic"

const VALID_USERNAME = "admin"
const VALID_PASSWORD = "admin"
const REALM = "Selenium Automation Practice"
const ATTEMPT_PATTERN =
  /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i

function isAuthorised(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.startsWith("Basic ")) return false
  try {
    const base64 = authHeader.slice("Basic ".length)
    const decoded = Buffer.from(base64, "base64").toString("utf-8")
    const [username, password] = decoded.split(":")
    return username === VALID_USERNAME && password === VALID_PASSWORD
  } catch {
    return false
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const attempt = url.searchParams.get("attempt")

  if (!attempt || !ATTEMPT_PATTERN.test(attempt)) {
    url.searchParams.set("attempt", randomUUID())
    return new Response(null, {
      status: 307,
      headers: {
        Location: `${url.pathname}${url.search}`,
        "Cache-Control": "no-store",
      },
    })
  }

  const attemptCookie = `basic-auth-attempt-${attempt}`
  const cookieValue = `${attemptCookie}=1`
  const cookieFlags = `; Path=/basic-auth; HttpOnly; SameSite=Lax${
    url.protocol === "https:" ? "; Secure" : ""
  }`
  const requestCookies = request.headers.get("cookie")?.split(";") ?? []
  const receivedChallengeCookie = requestCookies.some(
    (cookie) => cookie.trim() === cookieValue
  )
  const authHeader = request.headers.get("authorization")

  if (!receivedChallengeCookie || !isAuthorised(authHeader)) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": `Basic realm="${REALM} ${attempt}"`,
        "Content-Type": "text/plain",
        "Cache-Control": "no-store",
        "Set-Cookie": `${cookieValue}; Max-Age=60${cookieFlags}`,
      },
    })
  }

  // Authenticated — return the success HTML page
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Basic Auth — Authenticated</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #f1f5f9;
      padding: 2rem;
    }
    .card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 1.25rem;
      padding: 3rem 2.5rem;
      max-width: 480px;
      width: 100%;
      text-align: center;
      backdrop-filter: blur(12px);
      box-shadow: 0 25px 50px rgba(0,0,0,0.5);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(34,197,94,0.15);
      border: 1px solid rgba(34,197,94,0.3);
      color: #4ade80;
      padding: 0.4rem 1rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }
    .icon {
      font-size: 3.5rem;
      margin-bottom: 1.25rem;
    }
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #f8fafc;
      margin-bottom: 0.75rem;
    }
    p {
      font-size: 0.95rem;
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 1.75rem;
    }
    .info-box {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 0.75rem;
      padding: 1rem 1.25rem;
      text-align: left;
      margin-bottom: 2rem;
    }
    .info-box h2 {
      font-size: 0.78rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
      margin-bottom: 0.75rem;
    }
    .info-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.4rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      font-size: 0.875rem;
    }
    .info-row:last-child { border-bottom: none; }
    .info-row .label { color: #64748b; }
    .info-row .value {
      color: #e2e8f0;
      font-weight: 500;
      font-family: ui-monospace, "Courier New", monospace;
      background: rgba(255,255,255,0.07);
      padding: 0.15rem 0.5rem;
      border-radius: 0.35rem;
    }
    .back-link {
      display: inline-block;
      margin-top: 0.5rem;
      color: #60a5fa;
      font-size: 0.875rem;
      text-decoration: none;
    }
    .back-link:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🔓</div>
    <div class="badge">✓ Authenticated</div>
    <h1 id="auth-success-heading">Login Successful</h1>
    <p id="auth-success-message">
      You have successfully authenticated using HTTP Basic Authentication.
      This page is only visible after providing the correct credentials.
    </p>
    <div class="info-box">
      <h2>Login credentials</h2>
      <div class="info-row">
        <span class="label">Username</span>
        <span class="value" id="auth-username">admin</span>
      </div>
      <div class="info-row">
        <span class="label">Password</span>
        <span class="value" id="auth-password">admin</span>
      </div>
      <div class="info-row">
        <span class="label">Auth Type</span>
        <span class="value" id="auth-type">HTTP Basic</span>
      </div>
    </div>
    <a class="back-link" href="/" id="back-to-home">← Back to Practice Home</a>
  </div>
  <script>
    (function () {
    const freshAttemptUrl = () => {
      const url = new URL(window.location.href);
      url.searchParams.set("attempt", crypto.randomUUID());
      return url;
    };

    window.history.replaceState(null, "", freshAttemptUrl());
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        window.location.replace(freshAttemptUrl().toString());
      }
    });
    })();
  </script>
</body>
</html>`

  return new Response(html, {
    status: 200,
    headers: {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
    "Set-Cookie": `${attemptCookie}=; Max-Age=0${cookieFlags}`,
    },
  })
}

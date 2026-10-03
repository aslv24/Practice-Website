import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HTTPS Context Errors",
  description:
    "Learn and practice Playwright's ignoreHTTPSErrors context option for navigating sites with invalid SSL certificates.",
}

export default function HttpsErrorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

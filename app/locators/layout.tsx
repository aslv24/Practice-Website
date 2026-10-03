import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Locator Practice",
  description:
    "Practice advanced XPath functions (normalize-space, string-length, floor, round) and SVG element targeting for Selenium and Playwright.",
}

export default function LocatorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

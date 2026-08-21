import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Windows",
  description:
    "Practice Selenium multi-window automation including new tab handling, popup windows, and switching WebDriver focus across browser contexts."
}

export default function WindowsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

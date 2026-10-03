import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Explicit Wait",
  description:
    "Practice Selenium explicit waits for delayed alerts, dynamic text, displayed elements, enabled controls, and checkbox state changes.",
}

export default function ExplicitWaitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Implicit Wait",
  alternates: { canonical: "/waits" },
  description:
    "Practice Selenium implicit waits with progressive element rendering and delayed form controls."
}

export default function WaitsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

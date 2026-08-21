import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Waits",
  description:
    "Build Selenium synchronization confidence with implicit waits, explicit waits, loading spinners, and delayed element appearance scenarios."
}

export default function WaitsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

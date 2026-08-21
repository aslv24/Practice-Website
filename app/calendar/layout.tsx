import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "Practice Selenium date picker automation, calendar navigation, and web table date interactions for scheduling test flows."
}

export default function CalendarLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

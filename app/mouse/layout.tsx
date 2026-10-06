import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mouse Events",
  alternates: { canonical: "/mouse" },
  description:
    "Train Selenium mouse automation including click actions, hover states, drag-and-drop, slider interactions, and range input control."
}

export default function MouseLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Frames",
  description:
    "Practice Selenium iframe switching including single-frame and nested frame context handling for robust browser automation."
}

export default function FramesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

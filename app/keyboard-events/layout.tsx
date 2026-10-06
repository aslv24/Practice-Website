import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Keyboard Events",
  alternates: { canonical: "/keyboard-events" },
  description:
    "Practice key combos, special keys, Tab navigation, and Ctrl shortcuts for Selenium sendKeys() and Playwright keyboard.press().",
}

export default function KeyboardEventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

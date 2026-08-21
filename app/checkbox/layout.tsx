import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkbox",
  description:
    "Automate single checkbox, grouped checkboxes, and select-all patterns with Selenium using stable element selectors."
}

export default function CheckboxLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

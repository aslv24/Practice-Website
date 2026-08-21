import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forms",
  description:
    "Practice Selenium form automation including text inputs, field validation, radio groups, checkboxes, date pickers, and submission assertions."
}

export default function FormsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

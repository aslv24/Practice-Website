import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dropdown",
  description:
    "Work through single-select, multi-select, and dynamic dropdown Selenium practice cases with stable locators and clear state feedback."
}

export default function DropdownLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

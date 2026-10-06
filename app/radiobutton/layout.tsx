import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Radio Button",
  alternates: { canonical: "/radiobutton" },
  description:
    "Automate individual and grouped radio button selection in Selenium with accessible label selectors and clear state verification."
}

export default function RadioButtonLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

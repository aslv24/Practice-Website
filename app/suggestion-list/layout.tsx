import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Suggestion List",
  description:
    "Practice Selenium autocomplete automation with static suggestion lists and dynamic type-ahead filtering for real-world input scenarios."
}

export default function SuggestionListLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

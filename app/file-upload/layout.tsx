import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "File Upload",
  description:
    "Validate file input Selenium automation including upload state detection, file metadata assertions, and removal flows used in real test suites."
}

export default function FileUploadLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

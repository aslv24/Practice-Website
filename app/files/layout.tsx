import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Files",
  description:
    "Practice single and batch file uploads with file inputs or picker buttons, plus automated file downloads for Selenium and Playwright.",
  alternates: {
    canonical: "/files",
  },
}

export default function FileUploadLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

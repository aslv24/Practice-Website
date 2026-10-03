import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Files",
  description:
    "Practice single and batch file uploads, dropzones without inputs, and automated file downloads for Selenium and Playwright."
}

export default function FileUploadLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

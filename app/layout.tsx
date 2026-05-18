import type {
  Metadata,
  Viewport,
} from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Selenium Practice Dashboard",
    template: "%s | Selenium Practice Dashboard",
  },

  description:
    "Interactive Selenium practice modules for automation testing, waits, alerts, forms, tables, frames, windows, and real-world UI testing scenarios.",
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground"
      >
        {children}
      </body>
    </html>
  )
}
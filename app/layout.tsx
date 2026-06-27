import type {
  Metadata,
  Viewport,
} from "next"

import "./globals.css"

const siteUrl = "https://automation-practice-theta.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Selenium Practice Website | Selenium Automation Playground | UI Testing Practice Platform",
    template: "%s | Selenium Automation Practice Website",
  },

  description:
    "Practice Selenium automation using real-world examples including alerts, forms, dropdowns, waits, file uploads, windows, frames, and more.",
  applicationName: "Selenium Automation Practice Website",
  authors: [{ name: "aslv24", url: "https://github.com/aslv24" }],
  creator: "aslv24",
  publisher: "aslv24",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title:
      "Selenium Practice Website | Selenium Automation Playground | UI Testing Practice Platform",
    description:
      "Practice Selenium automation using real-world examples including alerts, forms, dropdowns, waits, file uploads, windows, frames, and more.",
    url: siteUrl,
    siteName: "Selenium Automation Practice Website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Selenium Automation Practice Website dashboard preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Selenium Practice Website | Selenium Automation Playground | UI Testing Practice Platform",
    description:
      "Practice Selenium automation using real-world examples including alerts, forms, dropdowns, waits, file uploads, windows, frames, and more.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
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

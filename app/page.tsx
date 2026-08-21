import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

import HomeClientEnhancements from "@/components/layout/HomeClientEnhancements"
import ModulesList from "@/components/layout/ModulesList"

const siteUrl = "https://automation-practice-theta.vercel.app"
const repositoryUrl = "https://github.com/aslv24/Practice-Website"

export const metadata: Metadata = {
  title: "Selenium Automation Practice",
  description:
    "Practice Selenium automation using real-world examples including alerts, forms, dropdowns, waits, file uploads, windows, frames, and more.",
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    "Selenium Practice Website",
    "Selenium Automation Playground",
    "Selenium Testing Playground",
    "Selenium Automation Practice Website",
    "Selenium Practice Dashboard",
    "UI Automation Practice Site",
    "Selenium Interview Practice",
    "Automation Testing Playground",
    "Selenium Learning Platform",
    "Selenium WebDriver Practice",
    "Selenium alerts practice",
    "Selenium dropdown practice",
    "Selenium waits practice",
    "Selenium forms practice",
    "Selenium file upload practice",
    "Selenium frames practice",
    "Selenium window handling practice",
    "Selenium radio button practice",
    "Selenium checkbox practice",
    "Selenium autocomplete practice",
    "Selenium mouse actions practice",
    "Selenium interview preparation",
  ],
  openGraph: {
    title: "Selenium Automation Practice",
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
      "Practice Selenium automation using real-world Selenium automation scenarios including alerts, forms, waits, dropdowns, file uploads, windows, frames, and more.",
    images: ["/twitter-image"],
  },
}

const stats = [
  { value: "15+", label: "Practice Modules" },
  { value: "50+", label: "Automation Scenarios" },
  { value: "Cross Browser", label: "Compatible" },
  { value: "Framework", label: "Ready" },
]

const benefits = [
  "Real-world automation scenarios",
  "Selenium interview preparation",
  "Stable element locators",
  "Framework development support",
  "CI/CD integration testing",
  "Cross-browser testing practice",
]

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "EducationalApplication",
    name: "Selenium Automation Practice Website",
    description:
      "A Selenium automation learning platform with real-world UI testing scenarios for alerts, forms, waits, dropdowns, file uploads, frames, windows, and advanced interactions.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    author: {
      "@type": "Person",
      name: "aslv24",
      url: "https://github.com/aslv24",
    },
    url: siteUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Selenium Automation Practice Website",
    url: siteUrl,
    description:
      "A Selenium Automation Playground and UI Automation Practice Site for automation engineers, learners, and interview preparation.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Practice Website",
    url: repositoryUrl,
    sameAs: [repositoryUrl],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Selenium Practice Website",
        item: siteUrl,
      },
    ],
  },
]

export default function Home() {
  return (
    <main
      id="dashboard-page"
      data-testid="dashboard-page"
      aria-label="Selenium practice dashboard page"
      className="dashboard-page"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <HomeClientEnhancements />

      <section className="dashboard-page__hero">
        <div className="dashboard-page__hero-content">
          <div>
            <p className="dashboard-page__eyebrow">
              Selenium Automation Playground for UI testing practice
            </p>

            <h1
              id="dashboard-title"
              data-testid="dashboard-title"
              className="dashboard-page__title"
            >
              Selenium Automation Practice Website
            </h1>

            <p className="dashboard-page__intro">
              Practice real-world Selenium automation scenarios including
              alerts, forms, waits, dropdowns, file uploads, frames, windows,
              and advanced UI interactions.
            </p>

            <div className="dashboard-page__actions">
              <Link
                href="#practice-modules"
                className="dashboard-page__start-link"
              >
                Start Practicing
              </Link>
            </div>
          </div>

          <div className="dashboard-page__preview">
            <div className="dashboard-page__preview-frame">
              <Image
                src="/screenshots/dashboard.png"
                alt="Selenium Practice Dashboard module grid preview"
                width={1365}
                height={768}
                priority
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="dashboard-page__preview-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Platform statistics"
        className="dashboard-page__stats"
      >
        <div className="dashboard-page__stats-grid">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="dashboard-page__stat"
            >
              <p className="dashboard-page__stat-value">{stat.value}</p>
              <p className="dashboard-page__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="practice-modules"
        className="dashboard-page__modules"
      >
        <div className="dashboard-page__modules-intro">
          <p className="dashboard-page__section-eyebrow">
            Practice modules
          </p>

          <h2 className="dashboard-page__section-title">
            Selenium WebDriver practice for real browser workflows
          </h2>

          <p className="dashboard-page__section-description">
            Use this Selenium Testing Playground to rehearse locator strategy,
            synchronization, form validation, autocomplete, window handling,
            and interview-ready UI automation patterns.
          </p>
        </div>

        <nav
          id="dashboard-modules-navigation"
          data-testid="dashboard-modules-navigation"
          aria-label="Practice module navigation"
          className="dashboard-page__navigation"
        >
          <ModulesList />
        </nav>
      </section>

      <section className="dashboard-page__benefits">
        <div className="dashboard-page__benefits-content">
          <div>
            <p className="dashboard-page__section-eyebrow">
              Why engineers use it
            </p>

            <h2 className="dashboard-page__section-title">
              Built for learning, interviews, and automation framework design
            </h2>

            <p className="dashboard-page__section-description">
              This UI Automation Practice Site keeps common Selenium Interview
              Practice tasks discoverable while preserving stable element
              locators for repeatable browser automation.
            </p>
          </div>

          <ul
            className="dashboard-page__benefits-list"
            aria-label="Platform benefits"
          >
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="dashboard-page__benefit"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="dashboard-page__footer">
        <div className="dashboard-page__footer-grid">
          <div>
            <h2 className="dashboard-page__footer-title">
              Selenium Practice Website
            </h2>

            <p className="dashboard-page__footer-description">
              A public Selenium Learning Platform for automation engineers,
              students, and QA interview preparation.
            </p>
          </div>

          <div>
            <h2 className="dashboard-page__footer-heading">
              Links
            </h2>

            <ul className="dashboard-page__footer-links">
              <li>
                <Link
                  href={siteUrl}
                  className="dashboard-page__footer-link"
                >
                  Production deployment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="dashboard-page__footer-heading">
              Technology
            </h2>

            <p className="dashboard-page__footer-description">
              Next.js App Router, TypeScript, Tailwind CSS, React, and Vercel.
            </p>
          </div>

          <div>
            <h2 className="dashboard-page__footer-heading">
              Author
            </h2>

            <p className="dashboard-page__footer-description">
              Built by Infomats Technologies. Copyright{" "}
              {new Date().getFullYear()}.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
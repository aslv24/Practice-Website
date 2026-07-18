import Link from "next/link"
import Image from "next/image"

import HomeClientEnhancements from "@/components/layout/HomeClientEnhancements"
import { modules } from "@/data/modules"
import type { Metadata } from "next"

const siteUrl = "https://automation-practice-theta.vercel.app"
const repositoryUrl = "https://github.com/aslv24/Practice-Website"

export const metadata: Metadata = {
  title:
    "Selenium Practice Website | Selenium Automation Playground | UI Testing Practice Platform",
  description:
    "Practice Selenium automation using real-world examples including alerts, forms, dropdowns, waits, file uploads, windows, frames, and more.",
  alternates: {
    canonical: siteUrl
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
    "Selenium interview preparation"
  ],
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
        alt: "Selenium Automation Practice Website dashboard preview"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Selenium Practice Website | Selenium Automation Playground | UI Testing Practice Platform",
    description:
      "Practice Selenium automation using real-world examples including alerts, forms, dropdowns, waits, file uploads, windows, frames, and more.",
    images: ["/twitter-image"]
  }
}

const moduleDescriptions: Record<string, string> = {
  alerts:
    "Handle simple alerts, confirmation dialogs, and prompt workflows with reliable Selenium commands.",
  calendar:
    "Practice date inputs, custom calendar navigation, and web table interactions for scheduling flows.",
  checkbox:
    "Automate single, grouped, and select-all checkbox scenarios with stable selectors.",
  dropdown:
    "Work through single-select, multi-select, and dynamic dropdown practice cases.",
  "file-upload":
    "Validate file inputs, upload states, metadata, and removal flows used in real test suites.",
  forms:
    "Practice text inputs, validation, radio groups, checkboxes, dates, and submission assertions.",
  frames:
    "Switch into single and nested frames while keeping browser context handling clear.",
  mouse:
    "Train click actions, hover states, drag-and-drop, and slider automation.",
  "radio-button":
    "Automate individual and grouped radio button selection with accessible labels.",
  "suggestion-list":
    "Practice Selenium autocomplete interactions with static and dynamic suggestion lists.",
  waits:
    "Build confidence with implicit waits, explicit waits, loading states, and delayed elements.",
  windows:
    "Practice new tabs, popup windows, and multi-window Selenium WebDriver handling.",
  tables:
    "Sort, filter, paginate, and delete rows in a dynamic HTML table with stable locators.",
  "shadow-dom":
    "Locate and interact with elements encapsulated inside an open Shadow DOM boundary.",
  "broken-links":
    "Detect broken links and missing images by checking HTTP status codes and load failures."
}

const stats = [
  { value: "15+", label: "Practice Modules" },
  { value: "50+", label: "Automation Scenarios" },
  { value: "Cross Browser", label: "Compatible" },
  { value: "Framework", label: "Ready" }
]

const benefits = [
  "Real-world automation scenarios",
  "Selenium interview preparation",
  "Stable element locators",
  "Framework development support",
  "CI/CD integration testing",
  "Cross-browser testing practice"
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
      url: "https://github.com/aslv24"
    },
    url: siteUrl
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Selenium Automation Practice Website",
    url: siteUrl,
    description:
      "A Selenium Automation Playground and UI Automation Practice Site for automation engineers, learners, and interview preparation."
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Practice Website",
    url: repositoryUrl,
    sameAs: [repositoryUrl]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Selenium Practice Website",
        item: siteUrl
      }
    ]
  }
]

export default function Home() {
  return (
    <main
      id="dashboard-page"
      data-testid="dashboard-page"
      aria-label="Selenium practice dashboard page"
      className="min-h-screen bg-[#f8fafc] text-slate-950"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c")
        }}
      />
      <HomeClientEnhancements />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid min-h-[82vh] max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[1fr_0.88fr] lg:px-8 lg:py-16">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
              Selenium Automation Playground for UI testing practice
            </p>

            <h1
              id="dashboard-title"
              data-testid="dashboard-title"
              className="max-w-4xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl"
            >
              Selenium Automation Practice Website
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Practice real-world Selenium automation scenarios including
              alerts, forms, waits, dropdowns, file uploads, frames, windows,
              and advanced UI interactions.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#practice-modules"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-slate-950 px-6 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-emerald-500"
              >
                Start Practicing
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-200">
              <Image
                src="/screenshots/dashboard.png"
                alt="Selenium Practice Dashboard module grid preview"
                width={1365}
                height={768}
                priority
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Platform statistics"
        className="border-b border-slate-200 bg-slate-950 px-6 py-8 text-white"
      >
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/10 bg-white/5 p-5"
            >
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="practice-modules"
        className="mx-auto max-w-7xl px-6 py-16 lg:px-8"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Practice modules
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Selenium WebDriver practice for real browser workflows
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">
            Use this Selenium Testing Playground to rehearse locator strategy,
            synchronization, form validation, autocomplete, window handling, and
            interview-ready UI automation patterns.
          </p>
        </div>

        <nav
          id="dashboard-modules-navigation"
          data-testid="dashboard-modules-navigation"
          aria-label="Practice module navigation"
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {modules.map((module) => {
            const Icon = module.icon
            const moduleSlug = module.id

            return (
              <Link
                key={module.id}
                href={module.link}
                id={`${moduleSlug}-link`}
                data-testid={`${moduleSlug}-link`}
                aria-label={`Open ${module.title} module`}
                className="group block focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-emerald-500"
              >
                <div
                  id={`${moduleSlug}-card`}
                  data-testid={`${moduleSlug}-card`}
                  aria-label={`${module.title} module card`}
                  className="flex h-full min-h-64 cursor-pointer flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg text-2xl transition-transform group-hover:scale-105 ${module.color}`}
                  >
                    <Icon aria-hidden="true" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-950">
                    {module.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {moduleDescriptions[module.id]}
                  </p>

                  <span className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-slate-100 px-4 text-sm font-semibold text-slate-900 transition group-hover:bg-slate-950 group-hover:text-white">
                    Open Module
                  </span>
                </div>
              </Link>
            )
          })}
        </nav>
      </section>

      <section className="border-y border-slate-200 bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Why engineers use it
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Built for learning, interviews, and automation framework design
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              This UI Automation Practice Site keeps common Selenium Interview
              Practice tasks discoverable while preserving stable element
              locators for repeatable browser automation.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2" aria-label="Platform benefits">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-base font-semibold text-slate-900"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-10 text-slate-300 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Selenium Practice Website
            </h2>
            <p className="mt-3 text-sm leading-6">
              A public Selenium Learning Platform for automation engineers,
              students, and QA interview preparation.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Links
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href={siteUrl}
                  className="hover:text-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-emerald-400"
                >
                  Production deployment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Technology
            </h2>
            <p className="mt-3 text-sm leading-6">
              Next.js App Router, TypeScript, Tailwind CSS, React, and Vercel.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Author
            </h2>
            <p className="mt-3 text-sm leading-6">
              Built by Infomats Technologies. Copyright {new Date().getFullYear()}.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

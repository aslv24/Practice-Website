import Link from "next/link"

import HomeClientEnhancements from "@/components/layout/HomeClientEnhancements"
import { modules } from "@/data/modules"

export default function Home() {
  return (
    <main
      id="dashboard-page"
      data-testid="dashboard-page"
      aria-label="Selenium practice dashboard page"
      className="min-h-screen bg-gray-50 px-6 py-10"
    >
      <HomeClientEnhancements />

      <h1
        id="dashboard-title"
        data-testid="dashboard-title"
        className="mb-12 text-center text-4xl font-semibold"
      >
        Selenium Practice Dashboard
      </h1>

      <div className="mx-auto max-w-6xl">
        <nav
          id="dashboard-modules-navigation"
          data-testid="dashboard-modules-navigation"
          aria-label="Practice module navigation"
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
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
              >
                <div
                  id={`${moduleSlug}-card`}
                  data-testid={`${moduleSlug}-card`}
                  aria-label={`${module.title} module card`}
                  className="group flex h-36 cursor-pointer flex-col items-center justify-center rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div
                    className={`mb-3 rounded-full p-3 text-3xl transition-transform group-hover:scale-110 ${module.color}`}
                  >
                    <Icon />
                  </div>

                  <p className="text-base font-medium text-gray-700 group-hover:text-black">
                    {module.title}
                  </p>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </main>
  )
}
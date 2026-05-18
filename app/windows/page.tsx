import DashboardBackLink from "@/components/layout/DashboardBackLink"

import MultipleWindows from "@/components/modules/windows/MultipleWindows"
import NewTab from "@/components/modules/windows/NewTab"
import NewWindow from "@/components/modules/windows/NewWindow"

export default function WindowsPage() {
  return (
    <main
      id="windows-page"
      data-testid="windows-page"
      aria-label="Windows practice page"
      className="flex min-h-screen flex-col items-center bg-gray-100 p-6"
    >
      <h1
        id="windows-page-title"
        data-testid="windows-page-title"
        className="mb-2 text-3xl font-bold"
      >
        Windows Practice Page
      </h1>

      <p
        id="windows-page-description"
        data-testid="windows-page-description"
        className="mb-4 text-gray-600"
      >
        Practice handling tabs and windows for Selenium automation
      </p>

      <DashboardBackLink />

      <section
        id="windows-modules-section"
        data-testid="windows-modules-section"
        aria-label="Windows practice modules"
        className="mt-6 w-full max-w-2xl space-y-6"
      >
        <NewTab />
        <NewWindow />
        <MultipleWindows />
      </section>
    </main>
  )
}
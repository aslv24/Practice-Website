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
      className="windows-page"
    >
      <h1
        id="windows-page-title"
        data-testid="windows-page-title"
        className="windows-page__title"
      >
        Windows Practice Page
      </h1>

      <p
        id="windows-page-description"
        data-testid="windows-page-description"
        className="windows-page__description"
      >
        Practice handling tabs and windows for Selenium automation
      </p>

      <DashboardBackLink />

      <section
        id="windows-modules-section"
        data-testid="windows-modules-section"
        aria-label="Windows practice modules"
        className="windows-page__content"
      >
        <NewTab />
        <NewWindow />
        <MultipleWindows />
      </section>
    </main>
  )
}
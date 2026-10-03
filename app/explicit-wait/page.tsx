import DashboardBackLink from "@/components/layout/DashboardBackLink"
import ExplicitWait from "@/components/modules/waits/ExplicitWait"

export default function ExplicitWaitPage() {
  return (
    <div className="waits-page">
      <h1 className="waits-page__title">Explicit Wait Practice Page</h1>

      <p className="waits-page__description">
        Practice Selenium explicit waits for delayed alerts, content, controls, and state changes.
      </p>

      <DashboardBackLink />

      <div className="waits-page__content">
        <ExplicitWait />
      </div>
    </div>
  )
}

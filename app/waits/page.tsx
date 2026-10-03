import DashboardBackLink from "@/components/layout/DashboardBackLink"
import ImplicitWait from "@/components/modules/waits/ImplicitWait"

export default function WaitsPage() {
  return (
    <div className="waits-page">
      <h1 className="waits-page__title">Implicit Wait Practice Page</h1>

      <p className="waits-page__description">
        Practice Selenium implicit waits with elements that appear progressively.
      </p>

      <DashboardBackLink />

      <div className="waits-page__content">
        <ImplicitWait />
      </div>
    </div>
  )
}
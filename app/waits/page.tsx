import DashboardBackLink from "@/components/layout/DashboardBackLink"
import ExplicitWait from "@/components/modules/waits/ExplicitWait"
import ImplicitWait from "@/components/modules/waits/ImplicitWait"

export default function WaitsPage() {
  return (
    <div className="waits-page">
      <h1 className="waits-page__title">Waits Practice Page</h1>

      <p className="waits-page__description">
        Practice implicit and explicit waits in Selenium
      </p>

      <DashboardBackLink />

      <div className="waits-page__content">
        <ImplicitWait />
        <ExplicitWait />
      </div>
    </div>
  )
}
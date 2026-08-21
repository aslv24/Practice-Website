import DashboardBackLink from "@/components/layout/DashboardBackLink"
import SeleniumPracticeForm from "@/components/modules/forms/SeleniumPracticeForm"

export default function FormsPage() {
  return (
    <div className="forms-page">
      <h1 className="forms-page__title">Forms Practice Page</h1>

      <p className="forms-page__description">
        Practice most common Selenium form actions in one place
      </p>

      <DashboardBackLink />

      <div className="forms-page__content">
        <SeleniumPracticeForm />
      </div>
    </div>
  )
}
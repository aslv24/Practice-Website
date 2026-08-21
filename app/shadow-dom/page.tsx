import DashboardBackLink from "@/components/layout/DashboardBackLink"
import ShadowDomComponent from "@/components/modules/shadowdom/ShadowDomComponent"

export const metadata = {
  title: "Shadow DOM Practice | Selenium Automation Practice Website",
  description:
    "Practice locating and interacting with input fields and buttons encapsulated inside an open Shadow root.",
}

export default function ShadowDomPage() {
  return (
    <div className="shadow-dom-page">
      <div className="shadow-dom-page__header">
        <h1 className="shadow-dom-page__title">
          Shadow DOM
        </h1>

        <p className="shadow-dom-page__description">
          Practice traversing shadow boundaries to interact with encapsulated elements
        </p>

        <DashboardBackLink />
      </div>

      <div className="shadow-dom-page__content">
        <ShadowDomComponent />
      </div>
    </div>
  )
}
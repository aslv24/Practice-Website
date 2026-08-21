import type { Metadata } from "next"

import DashboardBackLink from "@/components/layout/DashboardBackLink"
import ConfirmAlert from "@/components/modules/alerts/ConfirmAlert"
import PromptAlert from "@/components/modules/alerts/PromptAlert"
import SimpleAlert from "@/components/modules/alerts/SimpleAlert"

export const metadata: Metadata = {
  title: "Alerts",
  description:
    "Practice handling Selenium alerts including simple alerts, confirmation dialogs, and prompt inputs with reliable WebDriver commands.",
}

export default function AlertsPage() {
  return (
    <div className="alerts-page">
      <div className="alerts-page__header">
        <h1 className="alerts-page__title">
          Alerts Practice Page
        </h1>

        <p className="alerts-page__description">
          Practice handling different types of alerts for Selenium automation
        </p>

        <DashboardBackLink />
      </div>

      <div className="alerts-page__content">
        <SimpleAlert />
        <ConfirmAlert />
        <PromptAlert />
      </div>
    </div>
  )
}
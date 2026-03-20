import DashboardBackLink from "@/components/layout/DashboardBackLink"
import ConfirmAlert from "@/components/modules/alerts/ConfirmAlert"
import PromptAlert from "@/components/modules/alerts/PromptAlert"
import SimpleAlert from "@/components/modules/alerts/SimpleAlert"

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Alerts Practice Page
        </h1>

        <p className="mb-4 mt-2 text-gray-500">
          Practice handling different types of alerts for Selenium automation
        </p>

        <DashboardBackLink />
      </div>

      <div className="mx-auto max-w-3xl space-y-6">
        <SimpleAlert />
        <ConfirmAlert />
        <PromptAlert />
      </div>
    </div>
  )
}

import DashboardBackLink from "@/components/layout/DashboardBackLink"
import MultipleWindows from "@/components/modules/windows/MultipleWindows"
import NewTab from "@/components/modules/windows/NewTab"
import NewWindow from "@/components/modules/windows/NewWindow"

export default function WindowsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-2 text-3xl font-bold">Windows Practice Page</h1>

      <p className="mb-4 text-gray-600">
        Practice handling tabs and windows for Selenium automation
      </p>

      <DashboardBackLink />

      <div className="mt-6 w-full max-w-2xl space-y-6">
        <NewTab />
        <NewWindow />
        <MultipleWindows />
      </div>
    </div>
  )
}

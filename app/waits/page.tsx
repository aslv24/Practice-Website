import DashboardBackLink from "@/components/layout/DashboardBackLink"
import ExplicitWait from "@/components/modules/waits/ExplicitWait"
import ImplicitWait from "@/components/modules/waits/ImplicitWait"

export default function WaitsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-2 text-3xl font-bold">Waits Practice Page</h1>

      <p className="mb-4 text-gray-600">
        Practice implicit and explicit waits in Selenium
      </p>

      <DashboardBackLink />

      <div className="mt-6 w-full max-w-2xl space-y-6">
        <ImplicitWait />
        <ExplicitWait />
      </div>
    </div>
  )
}

import DashboardBackLink from "@/components/layout/DashboardBackLink"
import SeleniumPracticeForm from "@/components/modules/forms/SeleniumPracticeForm"

export default function FormsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-2 text-3xl font-bold">Forms Practice Page</h1>

      <p className="mb-4 text-gray-600">
        Practice most common Selenium form actions in one place
      </p>

      <DashboardBackLink />

      <div className="mt-6 w-full max-w-5xl">
        <SeleniumPracticeForm />
      </div>
    </div>
  )
}

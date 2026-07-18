import DashboardBackLink from "@/components/layout/DashboardBackLink"
import ShadowDomComponent from "@/components/modules/shadowdom/ShadowDomComponent"

export const metadata = {
  title: "Shadow DOM Practice | Selenium Automation Practice Website",
  description: "Practice locating and interacting with input fields and buttons encapsulated inside an open Shadow root."
}

export default function ShadowDomPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Shadow DOM
        </h1>

        <p className="mb-4 mt-2 text-gray-500">
          Practice traversing shadow boundaries to interact with encapsulated elements
        </p>

        <DashboardBackLink />
      </div>

      <div className="mx-auto max-w-2xl">
        <ShadowDomComponent />
      </div>
    </div>
  )
}

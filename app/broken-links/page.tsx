import DashboardBackLink from "@/components/layout/DashboardBackLink"
import BrokenContent from "@/components/modules/brokenlinks/BrokenContent"

export const metadata = {
  title: "Broken Links & Images Practice | Selenium Automation Practice Website",
  description: "Practice identifying broken links (HTTP 404) and broken image rendering (HTTP 404 or zero dimensions)."
}

export default function BrokenLinksPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Broken Links & Images
        </h1>

        <p className="mb-4 mt-2 text-gray-500">
          Practice detecting HTTP status codes and loading anomalies on links and images
        </p>

        <DashboardBackLink />
      </div>

      <div className="mx-auto max-w-3xl">
        <BrokenContent />
      </div>
    </div>
  )
}

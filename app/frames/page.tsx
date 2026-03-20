import DashboardBackLink from "@/components/layout/DashboardBackLink"
import NestedFrame from "@/components/modules/frames/NestedFrame"
import SingleFrame from "@/components/modules/frames/SingleFrame"

export default function FramesPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-2 text-3xl font-bold">Frames Practice Page</h1>

      <p className="mb-4 text-gray-600">
        Practice handling iframes for Selenium automation
      </p>

      <DashboardBackLink />

      <div className="mt-6 w-full max-w-2xl space-y-6">
        <SingleFrame />
        <NestedFrame />
      </div>
    </div>
  )
}

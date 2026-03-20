import DashboardBackLink from "@/components/layout/DashboardBackLink"
import DynamicSuggestion from "@/components/modules/suggestion/DynamicSuggestion"
import StaticSuggestion from "@/components/modules/suggestion/StaticSuggestion"

export default function SuggestionListPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-2 text-3xl font-bold">Suggestion List Practice Page</h1>

      <p className="mb-4 text-gray-600">
        Practice auto suggestion handling
      </p>

      <DashboardBackLink />

      <div className="mt-6 w-full max-w-2xl space-y-6">
        <StaticSuggestion />
        <DynamicSuggestion />
      </div>
    </div>
  )
}

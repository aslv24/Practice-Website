import DashboardBackLink from "@/components/layout/DashboardBackLink"
import DynamicSuggestion from "@/components/modules/suggestion/DynamicSuggestion"
import StaticSuggestion from "@/components/modules/suggestion/StaticSuggestion"

export default function SuggestionListPage() {
  return (
    <div className="suggestion-list-page">
      <h1 className="suggestion-list-page__title">
        Suggestion List Practice Page
      </h1>

      <p className="suggestion-list-page__description">
        Practice auto suggestion handling
      </p>

      <DashboardBackLink />

      <div className="suggestion-list-page__content">
        <StaticSuggestion />
        <DynamicSuggestion />
      </div>
    </div>
  )
}
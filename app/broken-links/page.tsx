import DashboardBackLink from "@/components/layout/DashboardBackLink"
import BrokenContent from "@/components/modules/brokenlinks/BrokenContent"

export const metadata = {
  title: "Broken Links & Images Practice | Selenium Automation Practice Website",
  alternates: { canonical: "/broken-links" },
  description:
    "Practice identifying broken links (HTTP 404) and broken image rendering (HTTP 404 or zero dimensions).",
}

export default function BrokenLinksPage() {
  return (
    <div className="broken-links-page">
      <div className="broken-links-page__header">
        <h1 className="broken-links-page__title">
          Broken Links & Images
        </h1>

        <p className="broken-links-page__description">
          Practice detecting HTTP status codes and loading anomalies on links and images
        </p>

        <DashboardBackLink />
      </div>

      <div className="broken-links-page__content">
        <BrokenContent />
      </div>
    </div>
  )
}
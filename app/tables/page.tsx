import DashboardBackLink from "@/components/layout/DashboardBackLink"
import WebTables from "@/components/modules/tables/WebTables"

export const metadata = {
  title: "Web Tables & Pagination Practice | Selenium Automation Practice Website",
  description:
    "Practice searching, sorting, paginating, and deleting rows in a dynamic HTML table.",
}

export default function WebTablesPage() {
  return (
    <div className="web-tables-page">
      <div className="web-tables-page__header">
        <h1 className="web-tables-page__title">
          Web Tables & Pagination
        </h1>

        <p className="web-tables-page__description">
          Practice locators, sorting, and pagination logic in a dynamic table
        </p>

        <DashboardBackLink />
      </div>

      <div className="web-tables-page__content">
        <WebTables />
      </div>
    </div>
  )
}
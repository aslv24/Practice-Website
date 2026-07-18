import DashboardBackLink from "@/components/layout/DashboardBackLink"
import WebTables from "@/components/modules/tables/WebTables"

export const metadata = {
  title: "Web Tables & Pagination Practice | Selenium Automation Practice Website",
  description: "Practice searching, sorting, paginating, and deleting rows in a dynamic HTML table."
}

export default function WebTablesPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Web Tables & Pagination
        </h1>

        <p className="mb-4 mt-2 text-gray-500">
          Practice locators, sorting, and pagination logic in a dynamic table
        </p>

        <DashboardBackLink />
      </div>

      <div className="mx-auto max-w-5xl">
        <WebTables />
      </div>
    </div>
  )
}

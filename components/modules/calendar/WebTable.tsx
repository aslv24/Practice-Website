"use client"

const FIRST_NAMES = [
  "Logesh",
  "Arun",
  "Karthik",
  "Suresh",
  "Ravi",
  "Vignesh",
  "Praveen",
  "Dinesh",
  "Saravanan",
  "Ganesh"
]

const LAST_NAMES = [
  "Kumar",
  "Prakash",
  "R",
  "Babu",
  "Shankar",
  "M",
  "K",
  "P",
  "S",
  "Reddy"
]

const CITIES = [
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Delhi"
]

const DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com"
]

const tableData = Array.from(
  { length: 100 },
  (_, index) => ({
    id: `IM${String(index + 1).padStart(
      4,
      "0"
    )}`,
    firstName:
      FIRST_NAMES[index % 10],
    lastName:
      LAST_NAMES[index % 10],
    email: `${FIRST_NAMES[
      index % 10
    ].toLowerCase()}.${
      LAST_NAMES[
        index % 10
      ].toLowerCase()
    }${index}@${
      DOMAINS[index % 3]
    }`,
    city: CITIES[index % 5],
    status:
      index % 2 === 0
        ? "Active"
        : "Inactive"
  })
)

export default function WebTable() {
  return (
    <section
      id="web-table-card"
      data-testid="web-table-card"
      data-component="web-table"
      aria-labelledby="web-table-title"
      className="
        rounded-2xl border bg-white p-6 shadow-sm
      "
    >
      <h2
        id="web-table-title"
        data-testid="web-table-title"
        className="
          mb-4 text-lg font-semibold text-blue-700
        "
      >
        Web Table
      </h2>

      <div
        id="web-table-container"
        data-testid="web-table-container"
        className="
          max-h-[400px] overflow-auto
          rounded-lg border
        "
      >
        <table
          id="web-data-table"
          data-testid="web-data-table"
          aria-label="Web data table"
          className="
            w-full border-collapse text-left
          "
        >
          <caption className="sr-only">
            Employee information table
          </caption>

          <thead
            className="
              sticky top-0 z-10 bg-blue-100
            "
          >
            <tr>
              {[
                "ID",
                "First Name",
                "Last Name",
                "Email",
                "City",
                "Status"
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="
                    border px-3 py-2
                    font-semibold text-blue-700
                  "
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tableData.map(
              (row, index) => (
                <tr
                  key={row.id}
                  id={`web-table-row-${row.id.toLowerCase()}`}
                  data-testid={`web-table-row-${row.id.toLowerCase()}`}
                  className={`
                    transition-colors hover:bg-blue-50
                    ${
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    }
                  `}
                >
                  <td
                    data-testid={`web-table-id-${row.id.toLowerCase()}`}
                    className="border px-3 py-2"
                  >
                    {row.id}
                  </td>

                  <td
                    data-testid={`web-table-firstname-${row.id.toLowerCase()}`}
                    className="border px-3 py-2"
                  >
                    {row.firstName}
                  </td>

                  <td
                    data-testid={`web-table-lastname-${row.id.toLowerCase()}`}
                    className="border px-3 py-2"
                  >
                    {row.lastName}
                  </td>

                  <td
                    data-testid={`web-table-email-${row.id.toLowerCase()}`}
                    className="border px-3 py-2"
                  >
                    {row.email}
                  </td>

                  <td
                    data-testid={`web-table-city-${row.id.toLowerCase()}`}
                    className="border px-3 py-2"
                  >
                    {row.city}
                  </td>

                  <td
                    data-testid={`web-table-status-${row.id.toLowerCase()}`}
                    className={`
                      border px-3 py-2 font-semibold
                      ${
                        row.status === "Active"
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    `}
                  >
                    {row.status}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div
        id="web-table-total-records"
        data-testid="web-table-total-records"
        aria-live="polite"
        className="
          mt-4 rounded-md border bg-gray-50
          px-3 py-2 text-sm font-medium
          text-blue-700
        "
      >
        Total Records:
        {" "}
        {tableData.length}
      </div>
    </section>
  )
}

WebTable.displayName = "WebTable"
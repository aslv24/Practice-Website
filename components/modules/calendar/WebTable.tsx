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
  "Ganesh",
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
  "Reddy",
]

const CITIES = [
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Delhi",
]

const DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
]

const tableData = Array.from(
  { length: 100 },
  (_, index) => ({
    id: `IM${String(index + 1).padStart(4, "0")}`,
    firstName: FIRST_NAMES[index % 10],
    lastName: LAST_NAMES[index % 10],
    email: `${FIRST_NAMES[index % 10].toLowerCase()}.${LAST_NAMES[
      index % 10
    ].toLowerCase()}${index}@${DOMAINS[index % 3]}`,
    city: CITIES[index % 5],
    status: index % 2 === 0 ? "Active" : "Inactive",
  })
)

export default function WebTable() {
  return (
    <section
      id="web-table-card"
      data-testid="web-table-card"
      data-component="web-table"
      aria-labelledby="web-table-title"
      className="web-table"
    >
      <h2
        id="web-table-title"
        data-testid="web-table-title"
        className="web-table__title"
      >
        Web Table
      </h2>

      <div
        id="web-table-container"
        data-testid="web-table-container"
        role="region"
        aria-label="Scrollable employee information table"
        tabIndex={0}
        className="web-table__container"
      >
        <table
          id="web-data-table"
          data-testid="web-data-table"
          aria-label="Web data table"
          className="web-table__table"
        >
          <caption className="sr-only">
            Employee information table
          </caption>

          <thead className="web-table__head">
            <tr>
              {[
                "ID",
                "First Name",
                "Last Name",
                "Email",
                "City",
                "Status",
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="web-table__header"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={row.id}
                id={`web-table-row-${row.id.toLowerCase()}`}
                data-testid={`web-table-row-${row.id.toLowerCase()}`}
                className={`web-table__row${
                  index % 2 === 0
                    ? " web-table__row--even"
                    : " web-table__row--odd"
                }`}
              >
                <td
                  data-testid={`web-table-id-${row.id.toLowerCase()}`}
                  className="web-table__cell"
                >
                  {row.id}
                </td>

                <td
                  data-testid={`web-table-firstname-${row.id.toLowerCase()}`}
                  className="web-table__cell"
                >
                  {row.firstName}
                </td>

                <td
                  data-testid={`web-table-lastname-${row.id.toLowerCase()}`}
                  className="web-table__cell"
                >
                  {row.lastName}
                </td>

                <td
                  data-testid={`web-table-email-${row.id.toLowerCase()}`}
                  className="web-table__cell"
                >
                  {row.email}
                </td>

                <td
                  data-testid={`web-table-city-${row.id.toLowerCase()}`}
                  className="web-table__cell"
                >
                  {row.city}
                </td>

                <td
                  data-testid={`web-table-status-${row.id.toLowerCase()}`}
                  className={`web-table__status${
                    row.status === "Active"
                      ? " web-table__status--active"
                      : " web-table__status--inactive"
                  }`}
                >
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        id="web-table-total-records"
        data-testid="web-table-total-records"
        aria-live="polite"
        className="web-table__total"
      >
        Total Records: {tableData.length}
      </div>
    </section>
  )
}

WebTable.displayName = "WebTable"
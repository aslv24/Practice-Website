"use client"

import { useState, useMemo } from "react"
import {
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa"

type User = {
  id: number
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
}

const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "Editor",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    email: "fiona.gallagher@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 7,
    name: "George Clark",
    email: "george.clark@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 8,
    name: "Hannah Abbott",
    email: "hannah.abbott@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 9,
    name: "Ian Malcolm",
    email: "ian.malcolm@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 10,
    name: "Julia Roberts",
    email: "julia.roberts@example.com",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 11,
    name: "Kevin Bacon",
    email: "kevin.bacon@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 12,
    name: "Laura Croft",
    email: "laura.croft@example.com",
    role: "Admin",
    status: "Active",
  },
]

const ALL_USERS: User[] = Array.from(
  { length: 500 },
  (_, index) => {
    const seed = INITIAL_USERS[index % INITIAL_USERS.length]

    if (index < INITIAL_USERS.length) {
      return seed
    }

    const [emailName, domain] = seed.email.split("@")

    return {
      ...seed,
      id: index + 1,
      name: seed.name,
      email: `${emailName}.${index + 1}@${domain}`,
    }
  }
)

type SortField =
  | "name"
  | "email"
  | "role"
  | "status"

type SortOrder = "asc" | "desc" | null

export default function WebTables() {
  const [users, setUsers] =
    useState<User[]>(ALL_USERS)

  const [search, setSearch] =
    useState("")

  const [sortField, setSortField] =
    useState<SortField | null>(null)

  const [sortOrder, setSortOrder] =
    useState<SortOrder>(null)

  const [currentPage, setCurrentPage] =
    useState(1)

  const [itemsPerPage, setItemsPerPage] =
    useState(5)

  // Handle delete action to simulate dynamic modifications
  const handleDelete = (id: number) => {
    setUsers((prev) =>
      prev.filter((user) => user.id !== id)
    )
  }

  // Handle Sort
  const handleSort = (field: SortField) => {
    let order: SortOrder = "asc"

    if (sortField === field) {
      if (sortOrder === "asc") {
        order = "desc"
      } else if (sortOrder === "desc") {
        order = null
      }
    }

    setSortField(order ? field : null)
    setSortOrder(order)
    setCurrentPage(1)
  }

  // Filtered & Sorted Users
  const processedUsers = useMemo(() => {
    let result = [...users]

    // Filter
    if (search.trim() !== "") {
      const query = search.toLowerCase()

      result = result.filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(query) ||
          user.email
            .toLowerCase()
            .includes(query) ||
          user.role
            .toLowerCase()
            .includes(query)
      )
    }

    // Sort
    if (sortField && sortOrder) {
      result.sort((a, b) => {
        const valA =
          a[sortField].toLowerCase()

        const valB =
          b[sortField].toLowerCase()

        if (valA < valB) {
          return sortOrder === "asc"
            ? -1
            : 1
        }

        if (valA > valB) {
          return sortOrder === "asc"
            ? 1
            : -1
        }

        return 0
      })
    }

    return result
  }, [
    users,
    search,
    sortField,
    sortOrder,
  ])

  // Pagination calculations
  const totalItems =
    processedUsers.length

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalItems / itemsPerPage
    )
  )

  const pageWindowStart =
    Math.floor((currentPage - 1) / 10) * 10 + 1

  const visiblePages = Array.from(
    {
      length: Math.min(
        10,
        totalPages - pageWindowStart + 1
      ),
    },
    (_, index) => pageWindowStart + index
  )

  const paginatedUsers = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      itemsPerPage

    return processedUsers.slice(
      startIndex,
      startIndex + itemsPerPage
    )
  }, [processedUsers, currentPage, itemsPerPage])

  // Get sorting icon
  const getSortIcon = (
    field: SortField
  ) => {
    if (sortField !== field) {
      return (
        <FaSort className="web-tables__sort-icon web-tables__sort-icon--inactive" />
      )
    }

    if (sortOrder === "asc") {
      return (
        <FaSortUp className="web-tables__sort-icon web-tables__sort-icon--active" />
      )
    }

    return (
      <FaSortDown className="web-tables__sort-icon web-tables__sort-icon--active" />
    )
  }

  return (
    <section
      id="web-tables-card"
      data-testid="web-tables-card"
      className="web-tables"
    >
      <header className="web-tables__header">
        <h2
          id="web-tables-title"
          data-testid="web-tables-title"
          className="web-tables__title"
        >
          Dynamic User Table
        </h2>

        <p
          id="web-tables-description"
          data-testid="web-tables-description"
          className="web-tables__description"
        >
          Test sorting, search filtering,
          pagination, and dynamic row
          removal.
        </p>
      </header>

      <div className="web-tables__toolbar">
        <div className="web-tables__toolbar-left">
          <h3 className="web-tables__directory-title">
            User Directory
          </h3>

          <label
            htmlFor="items-per-page"
            className="web-tables__entries-label"
          >
            Show
            <select
              id="items-per-page"
              data-testid="items-per-page"
              value={itemsPerPage}
              onChange={(event) => {
                setItemsPerPage(Number(event.target.value))
                setCurrentPage(1)
              }}
              className="web-tables__entries-select"
            >
              {[5, 10, 15].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            entries
          </label>
        </div>

        <div>
          <label
            htmlFor="search-input"
            className="sr-only"
          >
            Search Users
          </label>

          <input
            id="search-input"
            data-testid="search-input"
            type="search"
            value={search}
            placeholder="Search by name, email, or role..."
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="web-tables__search"
          />
        </div>
      </div>

      <div className="web-tables__table-wrapper">
        <table
          id="users-table"
          data-testid="users-table"
          className="web-tables__table"
        >
          <thead className="web-tables__table-head">
            <tr>
              <th className="web-tables__header-cell">
                ID
              </th>

              <th
                onClick={() =>
                  handleSort("name")
                }
                className="web-tables__header-cell web-tables__header-cell--sortable"
                id="header-name"
                data-testid="header-name"
              >
                Name {getSortIcon("name")}
              </th>

              <th
                onClick={() =>
                  handleSort("email")
                }
                className="web-tables__header-cell web-tables__header-cell--sortable"
                id="header-email"
                data-testid="header-email"
              >
                Email {getSortIcon("email")}
              </th>

              <th
                onClick={() =>
                  handleSort("role")
                }
                className="web-tables__header-cell web-tables__header-cell--sortable"
                id="header-role"
                data-testid="header-role"
              >
                Role {getSortIcon("role")}
              </th>

              <th
                onClick={() =>
                  handleSort("status")
                }
                className="web-tables__header-cell web-tables__header-cell--sortable"
                id="header-status"
                data-testid="header-status"
              >
                Status {getSortIcon("status")}
              </th>

              <th className="web-tables__header-cell web-tables__header-cell--action">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="web-tables__table-body">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  id={`user-row-${user.id}`}
                  data-testid={`user-row-${user.id}`}
                  className="web-tables__row"
                >
                  <td className="web-tables__cell web-tables__cell--id">
                    {user.id}
                  </td>

                  <td
                    className="web-tables__cell web-tables__cell--name"
                    id={`user-name-${user.id}`}
                  >
                    {user.name}
                  </td>

                  <td
                    className="web-tables__cell"
                    id={`user-email-${user.id}`}
                  >
                    {user.email}
                  </td>

                  <td className="web-tables__cell">
                    {user.role}
                  </td>

                  <td className="web-tables__cell">
                    <span
                      className={`web-tables__status ${
                        user.status ===
                        "Active"
                          ? "web-tables__status--active"
                          : "web-tables__status--inactive"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="web-tables__cell web-tables__cell--action">
                    <button
                      onClick={() =>
                        handleDelete(user.id)
                      }
                      id={`delete-btn-${user.id}`}
                      data-testid={`delete-btn-${user.id}`}
                      className="web-tables__delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="web-tables__no-results"
                  data-testid="no-results-msg"
                >
                  No users match the search
                  criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="web-tables__pagination">
        <div
          className="web-tables__table-info"
          id="table-info"
          data-testid="table-info"
        >
          Showing{" "}
          <span className="web-tables__table-info-value">
            {totalItems === 0
              ? 0
              : (currentPage - 1) *
                  itemsPerPage +
                1}
          </span>{" "}
          to{" "}
          <span className="web-tables__table-info-value">
            {Math.min(
              currentPage *
                itemsPerPage,
              totalItems
            )}
          </span>{" "}
          of{" "}
          <span className="web-tables__table-info-value">
            {totalItems}
          </span>{" "}
          entries
        </div>

        <div className="web-tables__pagination-controls">
          <button
            id="prev-page"
            data-testid="prev-page"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((c) =>
                Math.max(1, c - 1)
              )
            }
            className="web-tables__pagination-button"
          >
            Previous
          </button>

          {visiblePages.map((page) => (
            <button
              key={page}
              id={`page-btn-${page}`}
              data-testid={`page-btn-${page}`}
              aria-current={
                currentPage === page
                  ? "page"
                  : undefined
              }
              onClick={() => setCurrentPage(page)}
              style={
                currentPage === page
                  ? {
                      backgroundColor: "#2563eb",
                      color: "#ffffff",
                    }
                  : undefined
              }
              className={`web-tables__pagination-button ${
                currentPage === page
                  ? "web-tables__pagination-button--active"
                  : ""
              }`}
            >
              {page}
            </button>
          ))}

          <button
            id="next-page"
            data-testid="next-page"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage((c) =>
                Math.min(
                  totalPages,
                  c + 1
                )
              )
            }
            className="web-tables__pagination-button"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

WebTables.displayName = "WebTables"
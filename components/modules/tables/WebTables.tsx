"use client"

import { useState, useMemo } from "react"
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"

type User = {
  id: number
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
}

const INITIAL_USERS: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob.smith@example.com", role: "User", status: "Active" },
  { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", role: "Editor", status: "Inactive" },
  { id: 4, name: "Diana Prince", email: "diana.prince@example.com", role: "Admin", status: "Active" },
  { id: 5, name: "Ethan Hunt", email: "ethan.hunt@example.com", role: "User", status: "Active" },
  { id: 6, name: "Fiona Gallagher", email: "fiona.gallagher@example.com", role: "Editor", status: "Active" },
  { id: 7, name: "George Clark", email: "george.clark@example.com", role: "User", status: "Inactive" },
  { id: 8, name: "Hannah Abbott", email: "hannah.abbott@example.com", role: "User", status: "Active" },
  { id: 9, name: "Ian Malcolm", email: "ian.malcolm@example.com", role: "Editor", status: "Active" },
  { id: 10, name: "Julia Roberts", email: "julia.roberts@example.com", role: "Admin", status: "Inactive" },
  { id: 11, name: "Kevin Bacon", email: "kevin.bacon@example.com", role: "User", status: "Active" },
  { id: 12, name: "Laura Croft", email: "laura.croft@example.com", role: "Admin", status: "Active" }
]

type SortField = "name" | "email" | "role" | "status"
type SortOrder = "asc" | "desc" | null

export default function WebTables() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS)
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Handle delete action to simulate dynamic modifications
  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  // Handle Sort
  const handleSort = (field: SortField) => {
    let order: SortOrder = "asc"
    if (sortField === field) {
      if (sortOrder === "asc") order = "desc"
      else if (sortOrder === "desc") order = null
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
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
      )
    }

    // Sort
    if (sortField && sortOrder) {
      result.sort((a, b) => {
        const valA = a[sortField].toLowerCase()
        const valB = b[sortField].toLowerCase()
        if (valA < valB) return sortOrder === "asc" ? -1 : 1
        if (valA > valB) return sortOrder === "asc" ? 1 : -1
        return 0
      })
    }

    return result
  }, [users, search, sortField, sortOrder])

  // Pagination calculations
  const totalItems = processedUsers.length
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return processedUsers.slice(startIndex, startIndex + itemsPerPage)
  }, [processedUsers, currentPage])

  // Get sorting icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <FaSort className="ml-1 inline h-3 w-3 text-gray-400" />
    if (sortOrder === "asc") return <FaSortUp className="ml-1 inline h-3 w-3 text-blue-600" />
    return <FaSortDown className="ml-1 inline h-3 w-3 text-blue-600" />
  }

  return (
    <section
      id="web-tables-card"
      data-testid="web-tables-card"
      className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <header className="mb-4">
        <h2
          id="web-tables-title"
          data-testid="web-tables-title"
          className="text-lg font-semibold text-gray-800"
        >
          Dynamic User Table
        </h2>
        <p
          id="web-tables-description"
          data-testid="web-tables-description"
          className="mt-1 text-sm text-gray-500"
        >
          Test sorting, search filtering, pagination, and dynamic row removal.
        </p>
      </header>

      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center border-t border-gray-100 pt-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">User Directory</h3>
        </div>

        <div>
          <label htmlFor="search-input" className="sr-only">
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
            className="w-full md:w-80 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-800 transition-all focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table
          id="users-table"
          data-testid="users-table"
          className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700"
        >
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th
                onClick={() => handleSort("name")}
                className="cursor-pointer px-6 py-4 transition-colors hover:bg-gray-100 select-none"
                id="header-name"
                data-testid="header-name"
              >
                Name {getSortIcon("name")}
              </th>
              <th
                onClick={() => handleSort("email")}
                className="cursor-pointer px-6 py-4 transition-colors hover:bg-gray-100 select-none"
                id="header-email"
                data-testid="header-email"
              >
                Email {getSortIcon("email")}
              </th>
              <th
                onClick={() => handleSort("role")}
                className="cursor-pointer px-6 py-4 transition-colors hover:bg-gray-100 select-none"
                id="header-role"
                data-testid="header-role"
              >
                Role {getSortIcon("role")}
              </th>
              <th
                onClick={() => handleSort("status")}
                className="cursor-pointer px-6 py-4 transition-colors hover:bg-gray-100 select-none"
                id="header-status"
                data-testid="header-status"
              >
                Status {getSortIcon("status")}
              </th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  id={`user-row-${user.id}`}
                  data-testid={`user-row-${user.id}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-mono text-gray-500">{user.id}</td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900" id={`user-name-${user.id}`}>{user.name}</td>
                  <td className="whitespace-nowrap px-6 py-4" id={`user-email-${user.id}`}>{user.email}</td>
                  <td className="whitespace-nowrap px-6 py-4">{user.role}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(user.id)}
                      id={`delete-btn-${user.id}`}
                      data-testid={`delete-btn-${user.id}`}
                      className="rounded-lg bg-red-50 hover:bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500" data-testid="no-results-msg">
                  No users match the search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-sm text-gray-500" id="table-info" data-testid="table-info">
          Showing{" "}
          <span className="font-semibold">
            {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{" "}
          of <span className="font-semibold">{totalItems}</span> entries
        </div>

        <div className="inline-flex gap-1.5">
          <button
            id="prev-page"
            data-testid="prev-page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
            className="rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              id={`page-btn-${page}`}
              data-testid={`page-btn-${page}`}
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-all focus:outline-none ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-500 ring-offset-1"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            id="next-page"
            data-testid="next-page"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
            className="rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}
WebTables.displayName = "WebTables"

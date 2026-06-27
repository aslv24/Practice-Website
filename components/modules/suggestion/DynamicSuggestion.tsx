"use client"

import { useEffect, useRef, useState } from "react"

import {
  countries,
  type Country,
} from "@/data/countries"

type LoadingStatus =
  | "idle"
  | "loading"
  | "completed"
  | "empty"

export default function DynamicSuggestion() {
  const [input, setInput] = useState("")
  const [filtered, setFiltered] = useState<
    Country[]
  >([])

  const [status, setStatus] =
    useState<LoadingStatus>("idle")

  const [activeIndex, setActiveIndex] =
    useState(-1)

  const [selectedCountry, setSelectedCountry] =
    useState("")

  const debounceRef = useRef<NodeJS.Timeout | null>(
    null
  )

  const dropdownId = "dynamic-country-dropdown"

  useEffect(() => {
    if (!input.trim()) {
      const timer = setTimeout(() => {
        setFiltered([])
        setStatus("idle")
      }, 0)

      return () => clearTimeout(timer)
    }

    const loadingTimer = setTimeout(() => {
      setStatus("loading")
    }, 0)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
      debounceRef.current = null
    }

    debounceRef.current = setTimeout(() => {
      clearTimeout(loadingTimer)

      const result = countries.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(input.toLowerCase()) ||
          item.isoCode
            .toLowerCase()
            .includes(input.toLowerCase())
      )

      setFiltered(result)

      if (result.length === 0) {
        setStatus("empty")
      } else {
        setStatus("completed")
      }

      setActiveIndex(-1)
    }, 800)

    return () => {
      clearTimeout(loadingTimer)

      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [input])

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value

    setInput(value)

    if (!value.trim()) {
      return
    }

    setStatus("loading")
  }

  const handleSelect = (item: Country) => {
    setInput(`${item.name} (${item.isoCode})`)
    setSelectedCountry(item.name)

    setFiltered([])
    setStatus("completed")
  }

  const handleKeyboardNavigation = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!filtered.length) return

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()

        setActiveIndex((prev) =>
          prev < filtered.length - 1
            ? prev + 1
            : 0
        )

        break

      case "ArrowUp":
        event.preventDefault()

        setActiveIndex((prev) =>
          prev > 0
            ? prev - 1
            : filtered.length - 1
        )

        break

      case "Enter":
        event.preventDefault()

        if (activeIndex >= 0) {
          handleSelect(filtered[activeIndex])
        }

        break

      case "Escape":
        setFiltered([])
        break
    }
  }

  return (
    <section
      id="dynamic-suggestion-card"
      data-testid="dynamic-suggestion-card"
      data-component="dynamic-suggestion"
      aria-label="Dynamic suggestion component"
      className="rounded-2xl border bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600">
          Dynamic Suggestions
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Practice Selenium autosuggestion handling
          with debounce, async rendering, keyboard
          navigation, and dynamic results.
        </p>
      </header>

      {/* Search Input */}
      <div className="space-y-3">
        <label
          htmlFor="dynamic-country-input"
          className="text-sm font-medium text-gray-700"
        >
          Search Country
        </label>

        <input
          id="dynamic-country-input"
          name="dynamicCountry"
          type="text"
          value={input}
          role="combobox"
          autoComplete="off"
          placeholder="Search country..."
          data-testid="dynamic-country-input"
          data-loading={status}
          aria-label="Search country"
          aria-expanded={filtered.length > 0}
          aria-controls={dropdownId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0
              ? `dynamic-country-option-${activeIndex}`
              : undefined
          }
          onChange={handleSearchChange}
          onKeyDown={handleKeyboardNavigation}
          className="w-full rounded-lg border px-3 py-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        />

        {/* Status Section */}
        <div
          aria-live="polite"
          className="rounded-lg border bg-gray-50 p-3 text-sm"
        >
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <p
              id="dynamic-suggestion-status"
              data-testid="dynamic-suggestion-status"
              data-status={status}
              className="font-medium text-gray-700"
            >
              Status: {status}
            </p>

            <p
              id="dynamic-suggestion-count"
              data-testid="dynamic-suggestion-count"
              data-result-count={filtered.length}
              className="font-medium text-blue-600"
            >
              Results: {filtered.length}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {status === "loading" && (
          <div
            id="dynamic-loading-state"
            data-testid="dynamic-loading-state"
            className="rounded-lg border border-dashed p-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />

              <p className="text-sm text-gray-600">
                Searching countries...
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {status === "empty" && (
          <div
            id="dynamic-empty-state"
            data-testid="dynamic-empty-state"
            className="rounded-lg border border-red-200 bg-red-50 p-3"
          >
            <p className="text-sm text-red-600">
              No countries found.
            </p>
          </div>
        )}

        {/* Dropdown */}
        {filtered.length > 0 && (
          <ul
            id={dropdownId}
            role="listbox"
            data-testid="dynamic-country-dropdown"
            aria-label="Country suggestions"
            className="max-h-60 overflow-auto rounded-xl border bg-white shadow-sm"
          >
            {filtered.map((item, index) => {
              const isActive =
                activeIndex === index

              return (
                <li
                  key={`${item.name}-${item.isoCode}`}
                  id={`dynamic-country-option-${index}`}
                  role="option"
                  aria-selected={isActive}
                  data-testid={`dynamic-country-${item.isoCode.toLowerCase()}-option`}
                  data-active={isActive}
                  data-country-code={item.isoCode}
                  onClick={() =>
                    handleSelect(item)
                  }
                  className={`flex cursor-pointer items-center justify-between px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Country Code: {item.isoCode}
                    </p>
                  </div>

                  <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    {item.isoCode}
                  </span>
                </li>
              )
            })}
          </ul>
        )}

        {/* Selected Result */}
        {selectedCountry && (
          <div
            id="selected-country-result"
            data-testid="selected-country-result"
            aria-live="polite"
            className="rounded-xl border border-green-200 bg-green-50 p-4"
          >
            <p className="font-medium text-green-700">
              Selected Country: {selectedCountry}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

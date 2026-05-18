"use client"

import {
  useEffect,
  useRef,
  useState,
} from "react"

import {
  countries,
  type Country,
} from "@/data/countries"

export default function StaticSuggestion() {
  const [input, setInput] = useState("")

  const [filtered, setFiltered] = useState<
    Country[]
  >([])

  const [showDropdown, setShowDropdown] =
    useState(false)

  const [activeIndex, setActiveIndex] =
    useState(-1)

  const [selectedCountry, setSelectedCountry] =
    useState("")

  const wrapperRef = useRef<HTMLElement>(null)

  const dropdownId = "static-country-dropdown"

  // Click Outside
  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener(
      "click",
      handleClickOutside
    )

    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside
      )
  }, [])

  // Focus Input
  const handleFocus = () => {
    setFiltered(countries)
    setShowDropdown(true)
  }

  // Filter Countries
  const handleChange = (value: string) => {
    setInput(value)

    const result = countries.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        item.isoCode
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        item.dialCode.includes(value)
    )

    setFiltered(result)
    setShowDropdown(true)

    setActiveIndex(-1)
  }

  // Select Country
  const handleSelect = (item: Country) => {
    setInput(
      `${item.name} (${item.isoCode})`
    )

    setSelectedCountry(item.name)

    setShowDropdown(false)
  }

  // Keyboard Navigation
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
        setShowDropdown(false)
        break
    }
  }

  return (
    <section
      id="static-suggestion-card"
      data-testid="static-suggestion-card"
      data-component="static-suggestion"
      aria-label="Static suggestion dropdown"
      ref={wrapperRef}
      className="relative rounded-2xl border bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600">
          Static Suggestions
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Practice Selenium dropdown handling
          using static suggestions, keyboard
          navigation, and dynamic filtering.
        </p>
      </header>

      {/* Input */}
      <div className="space-y-3">
        <label
          htmlFor="static-country-input"
          className="text-sm font-medium text-gray-700"
        >
          Select Country
        </label>

        <input
          id="static-country-input"
          name="staticCountry"
          type="text"
          value={input}
          role="combobox"
          autoComplete="off"
          placeholder="Search country..."
          data-testid="static-country-input"
          data-dropdown-state={
            showDropdown ? "open" : "closed"
          }
          aria-label="Select country"
          aria-expanded={showDropdown}
          aria-controls={dropdownId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0
              ? `static-country-option-${activeIndex}`
              : undefined
          }
          onFocus={handleFocus}
          onChange={(e) =>
            handleChange(e.target.value)
          }
          onKeyDown={
            handleKeyboardNavigation
          }
          className="w-full rounded-lg border px-3 py-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        />

        {/* Status Section */}
        <div
          aria-live="polite"
          className="rounded-lg border bg-gray-50 p-3 text-sm"
        >
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <p
              id="static-dropdown-status"
              data-testid="static-dropdown-status"
              className="font-medium text-gray-700"
            >
              Dropdown:
              {showDropdown
                ? " Open"
                : " Closed"}
            </p>

            <p
              id="static-result-count"
              data-testid="static-result-count"
              data-result-count={
                filtered.length
              }
              className="font-medium text-blue-600"
            >
              Results: {filtered.length}
            </p>
          </div>
        </div>

        {/* Empty State */}
        {showDropdown &&
          filtered.length === 0 &&
          input && (
            <div
              id="static-empty-state"
              data-testid="static-empty-state"
              className="rounded-lg border border-red-200 bg-red-50 p-3"
            >
              <p className="text-sm text-red-600">
                No countries found.
              </p>
            </div>
          )}

        {/* Dropdown */}
        {showDropdown &&
          filtered.length > 0 && (
            <ul
              id={dropdownId}
              role="listbox"
              data-testid="static-country-dropdown"
              aria-label="Country suggestions"
              className="absolute left-6 right-6 z-10 mt-1 max-h-60 overflow-auto rounded-xl border bg-white shadow-sm"
            >
              {filtered.map(
                (item, index) => {
                  const isActive =
                    activeIndex === index

                  return (
                    <li
                      key={item.id}
                      id={`static-country-option-${index}`}
                      role="option"
                      aria-selected={
                        isActive
                      }
                      data-testid={`static-country-${item.id}-option`}
                      data-country-id={
                        item.id
                      }
                      data-country-code={
                        item.isoCode
                      }
                      data-selected={
                        isActive
                      }
                      onClick={() =>
                        handleSelect(
                          item
                        )
                      }
                      className={`cursor-pointer px-4 py-3 transition-colors ${
                        isActive
                          ? "bg-blue-100"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            ISO:
                            {item.isoCode}
                            • Dial:
                            {item.dialCode}
                          </p>
                        </div>

                        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                          {
                            item.isoCode
                          }
                        </span>
                      </div>
                    </li>
                  )
                }
              )}
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
              Selected Country:
              {selectedCountry}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
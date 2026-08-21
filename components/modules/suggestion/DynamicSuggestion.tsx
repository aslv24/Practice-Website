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
      className="dynamic-suggestion"
    >
      {/* Header */}
      <header className="dynamic-suggestion__header">
        <h2 className="dynamic-suggestion__title">
          Dynamic Suggestions
        </h2>

        <p className="dynamic-suggestion__description">
          Practice Selenium autosuggestion handling
          with debounce, async rendering, keyboard
          navigation, and dynamic results.
        </p>
      </header>

      {/* Search Input */}
      <div className="dynamic-suggestion__content">
        <label
          htmlFor="dynamic-country-input"
          className="dynamic-suggestion__label"
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
          className="dynamic-suggestion__input"
        />

        {/* Status Section */}
        <div
          aria-live="polite"
          className="dynamic-suggestion__status"
        >
          <div className="dynamic-suggestion__status-content">
            <p
              id="dynamic-suggestion-status"
              data-testid="dynamic-suggestion-status"
              data-status={status}
              className="dynamic-suggestion__status-text"
            >
              Status: {status}
            </p>

            <p
              id="dynamic-suggestion-count"
              data-testid="dynamic-suggestion-count"
              data-result-count={filtered.length}
              className="dynamic-suggestion__count"
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
            className="dynamic-suggestion__loading"
          >
            <div className="dynamic-suggestion__loading-content">
              <div className="dynamic-suggestion__spinner" />

              <p className="dynamic-suggestion__loading-text">
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
            className="dynamic-suggestion__empty"
          >
            <p className="dynamic-suggestion__empty-text">
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
            className="dynamic-suggestion__dropdown"
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
                  className={`dynamic-suggestion__option${
                    isActive
                      ? " dynamic-suggestion__option--active"
                      : ""
                  }`}
                >
                  <div className="dynamic-suggestion__option-content">
                    <p className="dynamic-suggestion__country-name">
                      {item.name}
                    </p>

                    <p className="dynamic-suggestion__country-code">
                      Country Code: {item.isoCode}
                    </p>
                  </div>

                  <span className="dynamic-suggestion__country-badge">
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
            className="dynamic-suggestion__selected"
          >
            <p className="dynamic-suggestion__selected-text">
              Selected Country: {selectedCountry}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
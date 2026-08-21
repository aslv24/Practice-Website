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
      className="static-suggestion"
    >
      {/* Header */}
      <header className="static-suggestion__header">
        <h2 className="static-suggestion__title">
          Static Suggestions
        </h2>

        <p className="static-suggestion__description">
          Practice Selenium dropdown handling
          using static suggestions, keyboard
          navigation, and dynamic filtering.
        </p>
      </header>

      {/* Input */}
      <div className="static-suggestion__content">
        <label
          htmlFor="static-country-input"
          className="static-suggestion__label"
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
          className="static-suggestion__input"
        />

        {/* Status Section */}
        <div
          aria-live="polite"
          className="static-suggestion__status"
        >
          <div className="static-suggestion__status-content">
            <p
              id="static-dropdown-status"
              data-testid="static-dropdown-status"
              className="static-suggestion__status-text"
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
              className="static-suggestion__count"
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
              className="static-suggestion__empty"
            >
              <p className="static-suggestion__empty-text">
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
              className="static-suggestion__dropdown"
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
                      className={`static-suggestion__option${
                        isActive
                          ? " static-suggestion__option--active"
                          : ""
                      }`}
                    >
                      <div className="static-suggestion__option-content">
                        <div>
                          <p className="static-suggestion__country-name">
                            {item.name}
                          </p>

                          <p className="static-suggestion__country-details">
                            ISO:
                            {item.isoCode}
                            • Dial:
                            {item.dialCode}
                          </p>
                        </div>

                        <span className="static-suggestion__country-badge">
                          {item.isoCode}
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
            className="static-suggestion__selected"
          >
            <p className="static-suggestion__selected-text">
              Selected Country:
              {selectedCountry}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
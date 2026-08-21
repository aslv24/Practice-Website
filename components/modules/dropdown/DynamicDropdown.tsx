"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react"

const DROPDOWN_OPTIONS = [
  "Selenium WebDriver",
  "Playwright Automation",
  "Cypress Testing",
  "API Testing (Postman)",
  "Performance Testing (JMeter)",
  "Security Testing (OWASP ZAP)",
  "CI/CD (Jenkins)",
  "Docker & Kubernetes",
  "AWS Cloud Testing"
]

/**
 * DynamicDropdown Component
 * Demonstrates wait scenarios for Selenium automation
 * Optimized with useCallback to prevent unnecessary re-renders
 */
export default function DynamicDropdown() {
  const [options, setOptions] = useState<
    string[]
  >([])

  const [loading, setLoading] =
    useState(false)

  const [selectedOption, setSelectedOption] =
    useState("")

  const timeoutRef =
    useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(
          timeoutRef.current
        )
      }
    }
  }, [])

  // Memoize callback to prevent re-creating on every render
  const loadOptions = useCallback(() => {
    setLoading(true)
    setOptions([])
    setSelectedOption("")

    timeoutRef.current =
      window.setTimeout(() => {
        setOptions(DROPDOWN_OPTIONS)
        setLoading(false)
      }, 2000)
  }, [])

  // Memoize callback for option change
  const handleOptionChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value)
    },
    []
  )

  return (
    <section
      id="dynamic-dropdown-card"
      data-testid="dynamic-dropdown-card"
      data-component="dynamic-dropdown"
      aria-labelledby="dynamic-dropdown-title"
      className="practice-card"
    >
      <h2
        id="dynamic-dropdown-title"
        data-testid="dynamic-dropdown-title"
        className="practice-title"
      >
        Dynamic Dropdown (Wait Scenario)
      </h2>

      <p
        id="dynamic-dropdown-description"
        data-testid="dynamic-dropdown-description"
        className="practice-description"
      >
        Simulates delayed dropdown loading
        for Selenium explicit wait practice.
      </p>

      <button
        type="button"
        id="load-options-button"
        name="loadOptions"
        data-testid="load-options-button"
        aria-label="Load dropdown options"
        onClick={loadOptions}
        disabled={loading}
        className="dynamic-dropdown__load-button"
      >
        {loading
          ? "Loading..."
          : "Load Options"}
      </button>

      {loading && (
        <div
          id="dynamic-dropdown-loading-container"
          data-testid="dynamic-dropdown-loading-container"
          aria-live="polite"
          className="dynamic-dropdown__loading"
        >
          <p
            id="dynamic-dropdown-loading-text"
            data-testid="dynamic-dropdown-loading-text"
            className="dynamic-dropdown__loading-text"
          >
            Loading dropdown options...
          </p>
        </div>
      )}

      {!loading &&
        options.length > 0 && (
          <div className="dynamic-dropdown__content">
            <div className="dynamic-dropdown__field">
              <label
                htmlFor="dynamic-topic-dropdown"
                className="practice-label"
              >
                Select Topic
              </label>

              <select
                id="dynamic-topic-dropdown"
                name="dynamicTopic"
                value={selectedOption}
                data-testid="dynamic-topic-dropdown"
                aria-describedby="dynamic-dropdown-helper-text"
                onChange={handleOptionChange}
                className="practice-select"
              >
                <option value="">
                  -- Select Topic --
                </option>

                {options.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>

              <p
                id="dynamic-dropdown-helper-text"
                data-testid="dynamic-dropdown-helper-text"
                className="dynamic-dropdown__helper-text"
              >
                Wait for the dropdown options
                to load before selecting a value.
              </p>
            </div>

            <div
              id="dynamic-dropdown-selected-value"
              data-testid="dynamic-dropdown-selected-value"
              aria-live="polite"
              className="dynamic-dropdown__selected-value"
            >
              Selected:
              {" "}
              {selectedOption ||
                "No option selected"}
            </div>
          </div>
        )}
    </section>
  )
}

DynamicDropdown.displayName =
  "DynamicDropdown"
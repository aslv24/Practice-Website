"use client"

import {
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

  const loadOptions = () => {
    setLoading(true)

    setOptions([])

    setSelectedOption("")

    timeoutRef.current =
      window.setTimeout(() => {
        setOptions(DROPDOWN_OPTIONS)

        setLoading(false)
      }, 2000)
  }

  return (
    <section
      id="dynamic-dropdown-card"
      data-testid="dynamic-dropdown-card"
      data-component="dynamic-dropdown"
      aria-labelledby="dynamic-dropdown-title"
      className="
        rounded-2xl border border-gray-100
        bg-white p-6 shadow-sm
        transition-shadow hover:shadow-md
      "
    >
      <h2
        id="dynamic-dropdown-title"
        data-testid="dynamic-dropdown-title"
        className="
          mb-4 text-lg font-semibold text-gray-800
        "
      >
        Dynamic Dropdown (Wait Scenario)
      </h2>

      <p
        id="dynamic-dropdown-description"
        data-testid="dynamic-dropdown-description"
        className="
          mb-4 text-sm text-gray-500
        "
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
        className="
          mb-4 rounded-md bg-blue-600
          px-4 py-2 text-sm font-medium
          text-white transition-colors
          hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:opacity-70
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500
          focus-visible:ring-offset-2
        "
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
          className="
            mb-4 rounded-md border
            bg-gray-50 px-3 py-2
          "
        >
          <p
            id="dynamic-dropdown-loading-text"
            data-testid="dynamic-dropdown-loading-text"
            className="
              animate-pulse text-sm text-gray-600
            "
          >
            Loading dropdown options...
          </p>
        </div>
      )}

      {!loading &&
        options.length > 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="dynamic-topic-dropdown"
                className="
                  block text-sm font-medium
                  text-gray-700
                "
              >
                Select Topic
              </label>

              <select
                id="dynamic-topic-dropdown"
                name="dynamicTopic"
                value={selectedOption}
                data-testid="dynamic-topic-dropdown"
                aria-describedby="dynamic-dropdown-helper-text"
                onChange={(event) =>
                  setSelectedOption(
                    event.target.value
                  )
                }
                className="
                  w-full rounded-lg border
                  border-gray-300 p-2
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                  focus-visible:ring-offset-2
                "
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
                className="
                  text-sm text-gray-500
                "
              >
                Wait for the dropdown options
                to load before selecting a value.
              </p>
            </div>

            <div
              id="dynamic-dropdown-selected-value"
              data-testid="dynamic-dropdown-selected-value"
              aria-live="polite"
              className="
                rounded-md border bg-gray-50
                px-3 py-2 text-sm font-medium
                text-blue-700
              "
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
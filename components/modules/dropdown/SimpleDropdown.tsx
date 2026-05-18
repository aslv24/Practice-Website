"use client"

const COURSE_OPTIONS = [
  {
    value: "selenium",
    label: "Selenium"
  },
  {
    value: "playwright",
    label: "Playwright"
  },
  {
    value: "cypress",
    label: "Cypress"
  }
]

type SimpleDropdownProps = {
  selected: string
  setSelected: React.Dispatch<
    React.SetStateAction<string>
  >
}

export default function SimpleDropdown({
  selected,
  setSelected
}: SimpleDropdownProps) {
  return (
    <section
      id="simple-dropdown-card"
      data-testid="simple-dropdown-card"
      data-component="simple-dropdown"
      aria-labelledby="simple-dropdown-title"
      className="
        rounded-2xl border border-gray-100
        bg-white p-6 shadow-sm
        transition-shadow hover:shadow-md
      "
    >
      <h2
        id="simple-dropdown-title"
        data-testid="simple-dropdown-title"
        className="
          mb-4 text-lg font-semibold text-gray-800
        "
      >
        Simple Dropdown
      </h2>

      <p
        id="simple-dropdown-description"
        data-testid="simple-dropdown-description"
        className="
          mb-4 text-sm text-gray-500
        "
      >
        Select a course for Selenium
        dropdown automation practice.
      </p>

      <div className="space-y-3">
        <div className="space-y-2">
          <label
            htmlFor="simple-course-dropdown"
            className="
              block text-sm font-medium
              text-gray-700
            "
          >
            Select Course
          </label>

          <select
            id="simple-course-dropdown"
            name="simpleCourse"
            value={selected}
            data-testid="simple-course-dropdown"
            aria-describedby="simple-dropdown-helper-text"
            onChange={(event) =>
              setSelected(
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
              -- Select Course --
            </option>

            {COURSE_OPTIONS.map(
              (option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )
            )}
          </select>

          <p
            id="simple-dropdown-helper-text"
            data-testid="simple-dropdown-helper-text"
            className="
              text-sm text-gray-500
            "
          >
            Use Selenium Select methods to
            automate dropdown selection.
          </p>
        </div>

        <div
          id="simple-dropdown-selected-value"
          data-testid="simple-dropdown-selected-value"
          aria-live="polite"
          className="
            rounded-md border bg-gray-50
            px-3 py-2 text-sm font-medium
            text-blue-700
          "
        >
          Selected:
          {" "}
          {selected || "None"}
        </div>
      </div>
    </section>
  )
}

SimpleDropdown.displayName =
  "SimpleDropdown"
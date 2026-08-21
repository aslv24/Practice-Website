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
      className="practice-card"
    >
      <h2
        id="simple-dropdown-title"
        data-testid="simple-dropdown-title"
        className="practice-title"
      >
        Simple Dropdown
      </h2>

      <p
        id="simple-dropdown-description"
        data-testid="simple-dropdown-description"
        className="practice-description"
      >
        Select a course for Selenium
        dropdown automation practice.
      </p>

      <div className="simple-dropdown__content">
        <div className="simple-dropdown__field">
          <label
            htmlFor="simple-course-dropdown"
            className="practice-label"
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
            className="practice-select"
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
            className="simple-dropdown__helper-text"
          >
            Use Selenium Select methods to
            automate dropdown selection.
          </p>
        </div>

        <div
          id="simple-dropdown-selected-value"
          data-testid="simple-dropdown-selected-value"
          aria-live="polite"
          className="practice-status-blue"
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
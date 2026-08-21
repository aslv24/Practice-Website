"use client"

const COURSE_OPTIONS = [
  {
    value: "java",
    label: "Java"
  },
  {
    value: "python",
    label: "Python"
  },
  {
    value: "javascript",
    label: "JavaScript"
  },
  {
    value: "typescript",
    label: "TypeScript"
  },
  {
    value: "csharp",
    label: "C#"
  },
  {
    value: "kotlin",
    label: "Kotlin"
  },
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
  },
  {
    value: "appium",
    label: "Appium"
  },
  {
    value: "manual-testing",
    label: "Manual Testing"
  },
  {
    value: "automation-testing",
    label: "Automation Testing"
  },
  {
    value: "api-testing",
    label: "API Testing"
  },
  {
    value: "performance-testing",
    label: "Performance Testing"
  }
]

type MultiDropdownProps = {
  multiSelected: string[]
  setMultiSelected: React.Dispatch<
    React.SetStateAction<string[]>
  >
}

export default function MultiDropdown({
  multiSelected,
  setMultiSelected
}: MultiDropdownProps) {
  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const values = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    )

    setMultiSelected(values)
  }

  return (
    <section
      id="multi-dropdown-card"
      data-testid="multi-dropdown-card"
      data-component="multi-dropdown"
      aria-labelledby="multi-dropdown-title"
      className="practice-card"
    >
      <h2
        id="multi-dropdown-title"
        data-testid="multi-dropdown-title"
        className="practice-title"
      >
        Multi Select Dropdown
      </h2>

      <p
        id="multi-dropdown-description"
        data-testid="multi-dropdown-description"
        className="practice-description"
      >
        Select multiple technologies for
        Selenium automation practice.
      </p>

      <div className="multi-dropdown__content">
        <div className="multi-dropdown__field">
          <label
            htmlFor="multi-course-dropdown"
            className="practice-label"
          >
            Select Courses
          </label>

          <select
            id="multi-course-dropdown"
            name="multiCourse"
            multiple
            value={multiSelected}
            data-testid="multi-course-dropdown"
            aria-describedby="multi-dropdown-helper-text"
            onChange={handleChange}
            className="multi-dropdown__select practice-select"
          >
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
            id="multi-dropdown-helper-text"
            data-testid="multi-dropdown-helper-text"
            className="multi-dropdown__helper-text"
          >
            Hold Ctrl (Windows) or Command
            (Mac) to select multiple options.
          </p>
        </div>

        <div
          id="multi-dropdown-selected-value"
          data-testid="multi-dropdown-selected-value"
          aria-live="polite"
          className="practice-status-blue"
        >
          Selected:
          {" "}
          {multiSelected.length > 0
            ? multiSelected.join(", ")
            : "None"}
        </div>
      </div>
    </section>
  )
}

MultiDropdown.displayName =
  "MultiDropdown"
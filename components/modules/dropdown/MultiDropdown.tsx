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
      className="
        rounded-2xl border border-gray-100
        bg-white p-6 shadow-sm
        transition-shadow hover:shadow-md
      "
    >
      <h2
        id="multi-dropdown-title"
        data-testid="multi-dropdown-title"
        className="
          mb-4 text-lg font-semibold text-gray-800
        "
      >
        Multi Select Dropdown
      </h2>

      <p
        id="multi-dropdown-description"
        data-testid="multi-dropdown-description"
        className="
          mb-4 text-sm text-gray-500
        "
      >
        Select multiple technologies for
        Selenium automation practice.
      </p>

      <div className="space-y-3">
        <div className="space-y-2">
          <label
            htmlFor="multi-course-dropdown"
            className="
              block text-sm font-medium
              text-gray-700
            "
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
            className="
              h-40 w-full rounded-lg border
              border-gray-300 p-2
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-2
            "
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
            className="
              text-sm text-gray-500
            "
          >
            Hold Ctrl (Windows) or Command
            (Mac) to select multiple options.
          </p>
        </div>

        <div
          id="multi-dropdown-selected-value"
          data-testid="multi-dropdown-selected-value"
          aria-live="polite"
          className="
            rounded-md border bg-gray-50
            px-3 py-2 text-sm font-medium
            text-blue-700
          "
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
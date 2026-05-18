"use client"

type Props = {
  selected: string
  setSelected: React.Dispatch<
    React.SetStateAction<string>
  >
}

type FrameworkOption = {
  label: string
  value: string
  description: string
  disabled?: boolean
}

export default function GroupRadio({
  selected,
  setSelected,
}: Props) {
  const options: FrameworkOption[] = [
    {
      label: "Selenium",
      value: "selenium",
      description:
        "Most widely used automation framework",
    },
    {
      label: "Playwright",
      value: "playwright",
      description:
        "Modern end-to-end testing framework",
    },
    {
      label: "Cypress",
      value: "cypress",
      description:
        "JavaScript-based UI automation tool",
      disabled: true,
    },
  ]

  return (
    <section
      id="group-radio-card"
      data-testid="group-radio-card"
      data-component="group-radio"
      aria-label="Automation framework radio group"
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600">
          Group Radio Buttons
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Practice Selenium radio button
          handling with grouped selections,
          disabled states, and dynamic assertions.
        </p>
      </header>

      {/* Radio Group */}
      <fieldset
        className="space-y-4"
        aria-describedby="framework-helper-text"
      >
        <legend className="text-sm font-semibold text-gray-800">
          Select Automation Framework
        </legend>

        <p
          id="framework-helper-text"
          className="text-sm text-gray-500"
        >
          Choose one framework from the
          available options.
        </p>

        {options.map((option) => {
          const isSelected =
            selected === option.value

          return (
            <label
              key={option.value}
              htmlFor={`${option.value}-framework-radio`}
              data-testid={`${option.value}-framework-container`}
              data-framework={option.value}
              data-selected={isSelected}
              data-disabled={
                option.disabled || false
              }
              className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
                option.disabled
                  ? "cursor-not-allowed bg-gray-100 opacity-60"
                  : isSelected
                  ? "border-blue-300 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <input
                id={`${option.value}-framework-radio`}
                type="radio"
                name="framework"
                value={option.value}
                disabled={option.disabled}
                checked={isSelected}
                data-testid={`${option.value}-framework-radio`}
                aria-label={option.label}
                aria-checked={isSelected}
                onChange={(e) =>
                  setSelected(
                    e.target.value
                  )
                }
                className="mt-1 h-5 w-5 accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-gray-800">
                    {option.label}
                  </p>

                  {option.disabled && (
                    <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                      Disabled
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {option.description}
                </p>
              </div>
            </label>
          )
        })}
      </fieldset>

      {/* Result Section */}
      <div
        id="group-radio-result-section"
        data-testid="group-radio-result-section"
        aria-live="polite"
        className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4"
      >
        <p
          id="group-radio-selected-value"
          data-testid="group-radio-selected-value"
          className="font-medium text-green-700"
        >
          {selected
            ? `Selected Framework: ${selected}`
            : "No framework selected"}
        </p>

        <p className="mt-1 text-sm text-green-600">
          Radio button state updated
          successfully.
        </p>
      </div>
    </section>
  )
}
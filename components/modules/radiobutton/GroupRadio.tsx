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
      className="practice-card"
    >
      {/* Header */}
      <header className="group-radio__header">
        <h2 className="group-radio__title">
          Group Radio Buttons
        </h2>

        <p className="group-radio__description">
          Practice Selenium radio button
          handling with grouped selections,
          disabled states, and dynamic assertions.
        </p>
      </header>

      {/* Radio Group */}
      <fieldset
        className="group-radio__fieldset"
        aria-describedby="framework-helper-text"
      >
        <legend className="group-radio__legend">
          Select Automation Framework
        </legend>

        <p
          id="framework-helper-text"
          className="group-radio__helper-text"
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
              className={`group-radio__option${
                option.disabled
                  ? " group-radio__option--disabled"
                  : isSelected
                  ? " group-radio__option--selected"
                  : ""
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
                className="mt-1 practice-radio"
              />

              <div className="group-radio__content">
                <div className="group-radio__option-header">
                  <p className="group-radio__option-label">
                    {option.label}
                  </p>

                  {option.disabled && (
                    <span className="group-radio__disabled-badge">
                      Disabled
                    </span>
                  )}
                </div>

                <p className="group-radio__option-description">
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
        className="group-radio__result"
      >
        <p
          id="group-radio-selected-value"
          data-testid="group-radio-selected-value"
          className="group-radio__result-value"
        >
          {selected
            ? `Selected Framework: ${selected}`
            : "No framework selected"}
        </p>

        <p className="group-radio__result-description">
          Radio button state updated
          successfully.
        </p>
      </div>
    </section>
  )
}
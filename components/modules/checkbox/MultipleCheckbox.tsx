"use client"

type CheckboxOptions = {
  option1: boolean
  option2: boolean
  option3: boolean
}

type MultipleCheckboxProps = {
  options: CheckboxOptions
  setOptions: React.Dispatch<React.SetStateAction<CheckboxOptions>>
}

const CHECKBOX_OPTIONS = [
  {
    id: "option1",
    label: "Option 1",
  },
  {
    id: "option2",
    label: "Option 2",
  },
  {
    id: "option3",
    label: "Option 3",
  },
] as const

export default function MultipleCheckbox({
  options,
  setOptions,
}: MultipleCheckboxProps) {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target

    setOptions((previous) => ({
      ...previous,
      [name]: checked,
    }))
  }

  const selectedOptions = CHECKBOX_OPTIONS.filter(
    (option) => options[option.id]
  ).map((option) => option.label)

  return (
    <section
      id="multiple-checkbox-card"
      data-testid="multiple-checkbox-card"
      data-component="multiple-checkbox"
      aria-labelledby="multiple-checkbox-title"
      className="practice-card"
    >
      <h2
        id="multiple-checkbox-title"
        data-testid="multiple-checkbox-title"
        className="practice-title"
      >
        Multiple Checkboxes
      </h2>

      <fieldset
        className="multiple-checkbox__fieldset"
        aria-describedby="multiple-checkbox-description"
      >
        <legend className="sr-only">
          Multiple checkbox selection
        </legend>

        <p
          id="multiple-checkbox-description"
          data-testid="multiple-checkbox-description"
          className="practice-description"
        >
          Select one or more checkboxes for Selenium automation practice.
        </p>

        <div className="multiple-checkbox__options">
          {CHECKBOX_OPTIONS.map((option) => (
            <label
              key={option.id}
              htmlFor={`${option.id}-checkbox`}
              className="multiple-checkbox__option"
            >
              <input
                id={`${option.id}-checkbox`}
                type="checkbox"
                name={option.id}
                checked={options[option.id]}
                data-testid={`${option.id}-checkbox`}
                aria-label={option.label}
                onChange={handleChange}
                className="practice-checkbox"
              />

              <span
                data-testid={`${option.id}-label`}
                className="multiple-checkbox__label"
              >
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div
        id="multiple-checkbox-selected-values"
        data-testid="multiple-checkbox-selected-values"
        aria-live="polite"
        className="practice-status-blue"
      >
        Selected:{" "}
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "None"}
      </div>
    </section>
  )
}

MultipleCheckbox.displayName = "MultipleCheckbox"
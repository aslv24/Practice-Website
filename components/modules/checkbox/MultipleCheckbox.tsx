"use client"

type CheckboxOptions = {
  option1: boolean
  option2: boolean
  option3: boolean
}

type MultipleCheckboxProps = {
  options: CheckboxOptions
  setOptions: React.Dispatch<
    React.SetStateAction<CheckboxOptions>
  >
}

const CHECKBOX_OPTIONS = [
  {
    id: "option1",
    label: "Option 1"
  },
  {
    id: "option2",
    label: "Option 2"
  },
  {
    id: "option3",
    label: "Option 3"
  }
] as const

export default function MultipleCheckbox({
  options,
  setOptions
}: MultipleCheckboxProps) {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target

    setOptions((previous) => ({
      ...previous,
      [name]: checked
    }))
  }

  const selectedOptions =
    CHECKBOX_OPTIONS.filter(
      (option) => options[option.id]
    ).map((option) => option.label)

  return (
    <section
      id="multiple-checkbox-card"
      data-testid="multiple-checkbox-card"
      data-component="multiple-checkbox"
      aria-labelledby="multiple-checkbox-title"
      className="
        rounded-2xl border border-gray-100
        bg-white p-6 shadow-sm
        transition-shadow hover:shadow-md
      "
    >
      <h2
        id="multiple-checkbox-title"
        data-testid="multiple-checkbox-title"
        className="
          mb-4 text-lg font-semibold text-gray-800
        "
      >
        Multiple Checkboxes
      </h2>

      <fieldset
        className="space-y-4"
        aria-describedby="multiple-checkbox-description"
      >
        <legend className="sr-only">
          Multiple checkbox selection
        </legend>

        <p
          id="multiple-checkbox-description"
          data-testid="multiple-checkbox-description"
          className="text-sm text-gray-500"
        >
          Select one or more checkboxes for
          Selenium automation practice.
        </p>

        <div className="space-y-3">
          {CHECKBOX_OPTIONS.map(
            (option, index) => (
              <label
                key={option.id}
                htmlFor={`${option.id}-checkbox`}
                className="
                  flex cursor-pointer items-center
                  gap-3 rounded-md p-2
                  transition-colors hover:bg-gray-50
                "
              >
                <input
                  id={`${option.id}-checkbox`}
                  type="checkbox"
                  name={option.id}
                  checked={options[option.id]}
                  data-testid={`${option.id}-checkbox`}
                  aria-label={option.label}
                  onChange={handleChange}
                  className="
                    h-5 w-5 accent-blue-600
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-500
                    focus-visible:ring-offset-2
                  "
                />

                <span
                  data-testid={`${option.id}-label`}
                  className="text-gray-700"
                >
                  {option.label}
                </span>
              </label>
            )
          )}
        </div>
      </fieldset>

      <div
        id="multiple-checkbox-selected-values"
        data-testid="multiple-checkbox-selected-values"
        aria-live="polite"
        className="
          mt-5 rounded-md border bg-gray-50
          px-3 py-2 text-sm font-medium
          text-blue-700
        "
      >
        Selected:
        {" "}
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "None"}
      </div>
    </section>
  )
}

MultipleCheckbox.displayName =
  "MultipleCheckbox"
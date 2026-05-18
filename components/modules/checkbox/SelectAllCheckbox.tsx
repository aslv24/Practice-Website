"use client"

type CheckboxOptions = {
  option1: boolean
  option2: boolean
  option3: boolean
}

type SelectAllCheckboxProps = {
  setOptions: React.Dispatch<
    React.SetStateAction<CheckboxOptions>
  >
}

export default function SelectAllCheckbox({
  setOptions
}: SelectAllCheckboxProps) {
  const handleSelectAll = (
    value: boolean
  ) => {
    setOptions({
      option1: value,
      option2: value,
      option3: value
    })
  }

  return (
    <section
      id="select-all-checkbox-card"
      data-testid="select-all-checkbox-card"
      data-component="select-all-checkbox"
      aria-labelledby="select-all-checkbox-title"
      className="
        rounded-2xl border border-gray-100
        bg-white p-6 shadow-sm
        transition-shadow hover:shadow-md
      "
    >
      <h2
        id="select-all-checkbox-title"
        data-testid="select-all-checkbox-title"
        className="
          mb-4 text-lg font-semibold text-gray-800
        "
      >
        Select / Unselect All
      </h2>

      <p
        id="select-all-checkbox-description"
        data-testid="select-all-checkbox-description"
        className="
          mb-4 text-sm text-gray-500
        "
      >
        Select or unselect all checkboxes
        for Selenium automation practice.
      </p>

      <div
        className="flex flex-wrap gap-4"
        role="group"
        aria-describedby="select-all-checkbox-description"
      >
        <button
          type="button"
          id="select-all-button"
          name="selectAll"
          data-testid="select-all-button"
          aria-label="Select all checkboxes"
          onClick={() =>
            handleSelectAll(true)
          }
          className="
            rounded-lg bg-green-600
            px-5 py-2 text-sm font-medium
            text-white transition-colors
            hover:bg-green-700
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-green-500
            focus-visible:ring-offset-2
          "
        >
          Select All
        </button>

        <button
          type="button"
          id="unselect-all-button"
          name="unselectAll"
          data-testid="unselect-all-button"
          aria-label="Unselect all checkboxes"
          onClick={() =>
            handleSelectAll(false)
          }
          className="
            rounded-lg bg-red-600
            px-5 py-2 text-sm font-medium
            text-white transition-colors
            hover:bg-red-700
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-500
            focus-visible:ring-offset-2
          "
        >
          Unselect All
        </button>
      </div>

      <div
        id="select-all-checkbox-status"
        data-testid="select-all-checkbox-status"
        aria-live="polite"
        className="
          mt-5 rounded-md border bg-gray-50
          px-3 py-2 text-sm font-medium
          text-blue-700
        "
      >
        Bulk checkbox actions are ready.
      </div>
    </section>
  )
}

SelectAllCheckbox.displayName =
  "SelectAllCheckbox"
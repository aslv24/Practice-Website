"use client"

type CheckboxOptions = {
  option1: boolean
  option2: boolean
  option3: boolean
}

type SelectAllCheckboxProps = {
  setOptions: React.Dispatch<React.SetStateAction<CheckboxOptions>>
}

export default function SelectAllCheckbox({
  setOptions,
}: SelectAllCheckboxProps) {
  const handleSelectAll = (value: boolean) => {
    setOptions({
      option1: value,
      option2: value,
      option3: value,
    })
  }

  return (
    <section
      id="select-all-checkbox-card"
      data-testid="select-all-checkbox-card"
      data-component="select-all-checkbox"
      aria-labelledby="select-all-checkbox-title"
      className="practice-card"
    >
      <h2
        id="select-all-checkbox-title"
        data-testid="select-all-checkbox-title"
        className="practice-title"
      >
        Select / Unselect All
      </h2>

      <p
        id="select-all-checkbox-description"
        data-testid="select-all-checkbox-description"
        className="practice-description"
      >
        Select or unselect all checkboxes for Selenium automation practice.
      </p>

      <div
        className="select-all-checkbox__actions"
        role="group"
        aria-describedby="select-all-checkbox-description"
      >
        <button
          type="button"
          id="select-all-button"
          name="selectAll"
          data-testid="select-all-button"
          aria-label="Select all checkboxes"
          onClick={() => handleSelectAll(true)}
          className="practice-btn-green"
        >
          Select All
        </button>

        <button
          type="button"
          id="unselect-all-button"
          name="unselectAll"
          data-testid="unselect-all-button"
          aria-label="Unselect all checkboxes"
          onClick={() => handleSelectAll(false)}
          className="practice-btn-red"
        >
          Unselect All
        </button>
      </div>

      <div
        id="select-all-checkbox-status"
        data-testid="select-all-checkbox-status"
        aria-live="polite"
        className="practice-status-blue"
      >
        Bulk checkbox actions are ready.
      </div>
    </section>
  )
}

SelectAllCheckbox.displayName = "SelectAllCheckbox"
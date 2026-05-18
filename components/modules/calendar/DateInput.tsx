"use client"

type DateInputProps = {
  selectedDate: string
  setSelectedDate: React.Dispatch<
    React.SetStateAction<string>
  >
}

export default function DateInput({
  selectedDate,
  setSelectedDate
}: DateInputProps) {
  return (
    <section
      id="date-input-card"
      data-testid="date-input-card"
      data-component="date-input"
      aria-labelledby="date-input-title"
      className="
        rounded-2xl border bg-white p-6
        shadow-sm transition-shadow
        hover:shadow-md
      "
    >
      <h2
        id="date-input-title"
        data-testid="date-input-title"
        className="
          mb-4 text-lg font-semibold text-blue-700
        "
      >
        Date Picker (SendKeys)
      </h2>

      <div className="space-y-3">
        <div className="space-y-2">
          <label
            htmlFor="calendar-date-input"
            className="
              block text-sm font-medium text-gray-700
            "
          >
            Select Date
          </label>

          <input
            id="calendar-date-input"
            name="calendarDate"
            type="date"
            value={selectedDate}
            data-testid="calendar-date-input"
            aria-describedby="calendar-date-input-description"
            onChange={(event) =>
              setSelectedDate(event.target.value)
            }
            className="
              w-full rounded-md border px-3 py-2
              transition-colors
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-2
            "
          />
        </div>

        <p
          id="calendar-date-input-description"
          data-testid="calendar-date-input-description"
          className="text-sm text-gray-500"
        >
          Use Selenium sendKeys() to enter a date
          in YYYY-MM-DD format.
        </p>

        <div
          id="calendar-date-input-value"
          data-testid="calendar-date-input-value"
          aria-live="polite"
          className="
            rounded-md border bg-gray-50
            px-3 py-2 text-sm font-medium
            text-green-700
          "
        >
          Selected:
          {" "}
          {selectedDate || "No date selected"}
        </div>
      </div>
    </section>
  )
}

DateInput.displayName = "DateInput"
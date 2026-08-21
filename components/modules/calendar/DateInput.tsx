"use client"

type DateInputProps = {
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

export default function DateInput({
  selectedDate,
  setSelectedDate,
}: DateInputProps) {
  return (
    <section
      id="date-input-card"
      data-testid="date-input-card"
      data-component="date-input"
      aria-labelledby="date-input-title"
      className="date-input"
    >
      <h2
        id="date-input-title"
        data-testid="date-input-title"
        className="date-input__title"
      >
        Date Picker (SendKeys)
      </h2>

      <div className="date-input__content">
        <div className="date-input__field">
          <label
            htmlFor="calendar-date-input"
            className="date-input__label"
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
            onChange={(event) => setSelectedDate(event.target.value)}
            className="date-input__control"
          />
        </div>

        <p
          id="calendar-date-input-description"
          data-testid="calendar-date-input-description"
          className="date-input__description"
        >
          Use Selenium sendKeys() to enter a date in YYYY-MM-DD format.
        </p>

        <div
          id="calendar-date-input-value"
          data-testid="calendar-date-input-value"
          aria-live="polite"
          className="date-input__value"
        >
          Selected: {selectedDate || "No date selected"}
        </div>
      </div>
    </section>
  )
}

DateInput.displayName = "DateInput"
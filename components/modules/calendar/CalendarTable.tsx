"use client"

import { useState } from "react"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
]

type CalendarTableProps = {
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

export default function CalendarTable({
  selectedDate,
  setSelectedDate,
}: CalendarTableProps) {
  const today = new Date()

  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1).getDay()

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days: (number | null)[] = []

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const formatDate = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`

  const updateMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1))
  }

  const updateYear = (offset: number) => {
    setCurrentDate(new Date(year + offset, month, 1))
  }

  return (
    <section
      id="calendar-table-card"
      data-testid="calendar-table-card"
      data-component="calendar-table"
      aria-labelledby="calendar-table-title"
      className="calendar-table"
    >
      <h2
        id="calendar-table-title"
        data-testid="calendar-table-title"
        className="calendar-table__title"
      >
        Calendar (Advanced)
      </h2>

      <div className="calendar-table__year-controls">
        <button
          type="button"
          id="previous-year-button"
          data-testid="previous-year-button"
          aria-label="Go to previous year"
          onClick={() => updateYear(-1)}
          className="calendar-table__control-button"
        >
          ←
        </button>

        <p
          id="calendar-current-year"
          data-testid="calendar-current-year"
          className="calendar-table__period"
        >
          {year}
        </p>

        <button
          type="button"
          id="next-year-button"
          data-testid="next-year-button"
          aria-label="Go to next year"
          onClick={() => updateYear(1)}
          className="calendar-table__control-button"
        >
          →
        </button>
      </div>

      <div className="calendar-table__month-controls">
        <button
          type="button"
          id="previous-month-button"
          data-testid="previous-month-button"
          aria-label="Go to previous month"
          onClick={() => updateMonth(-1)}
          className="calendar-table__control-button"
        >
          ←
        </button>

        <p
          id="calendar-current-month"
          data-testid="calendar-current-month"
          className="calendar-table__period"
        >
          {MONTHS[month]}
        </p>

        <button
          type="button"
          id="next-month-button"
          data-testid="next-month-button"
          aria-label="Go to next month"
          onClick={() => updateMonth(1)}
          className="calendar-table__control-button"
        >
          →
        </button>
      </div>

      <table
        id="calendar-date-table"
        data-testid="calendar-date-table"
        aria-label="Calendar date table"
        className="calendar-table__dates"
      >
        <thead className="calendar-table__head">
          <tr>
            {WEEK_DAYS.map((day) => (
              <th
                key={day}
                scope="col"
                className="calendar-table__weekday"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({
            length: Math.ceil(days.length / 7),
          }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {days
                .slice(rowIndex * 7, rowIndex * 7 + 7)
                .map((day, index) => {
                  const fullDate = day ? formatDate(day) : ""

                  const isToday =
                    !!day &&
                    today.getDate() === day &&
                    today.getMonth() === month &&
                    today.getFullYear() === year

                  const isSelected =
                    !!day && selectedDate === fullDate

                  return (
                    <td
                      key={index}
                      className="calendar-table__cell"
                    >
                      {day ? (
                        <button
                          type="button"
                          id={`calendar-day-${day}`}
                          data-testid={`calendar-day-${day}`}
                          data-date={fullDate}
                          data-today={isToday ? "true" : "false"}
                          aria-label={`Select ${fullDate}`}
                          aria-pressed={isSelected}
                          onClick={() => setSelectedDate(fullDate)}
                          className={`calendar-table__day${
                            isSelected
                              ? " calendar-table__day--selected"
                              : ""
                          }${
                            isToday && !isSelected
                              ? " calendar-table__day--today"
                              : ""
                          }`}
                        >
                          {day}
                        </button>
                      ) : (
                        <span
                          aria-hidden="true"
                          className="calendar-table__empty-day"
                        />
                      )}
                    </td>
                  )
                })}
            </tr>
          ))}
        </tbody>
      </table>

      <div
        id="calendar-selected-date-value"
        data-testid="calendar-selected-date-value"
        aria-live="polite"
        className="calendar-table__selected-date"
      >
        Selected: {selectedDate || "None"}
      </div>
    </section>
  )
}

CalendarTable.displayName = "CalendarTable"
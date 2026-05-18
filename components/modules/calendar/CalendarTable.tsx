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
  "December"
]

const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
]

type CalendarTableProps = {
  selectedDate: string
  setSelectedDate: React.Dispatch<
    React.SetStateAction<string>
  >
}

export default function CalendarTable({
  selectedDate,
  setSelectedDate
}: CalendarTableProps) {
  const today = new Date()

  const [currentDate, setCurrentDate] =
    useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay()

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate()

  const days: (number | null)[] = []

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const formatDate = (day: number) =>
    `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`

  const updateMonth = (offset: number) => {
    setCurrentDate(
      new Date(year, month + offset, 1)
    )
  }

  const updateYear = (offset: number) => {
    setCurrentDate(
      new Date(year + offset, month, 1)
    )
  }

  return (
    <section
      id="calendar-table-card"
      data-testid="calendar-table-card"
      data-component="calendar-table"
      aria-labelledby="calendar-table-title"
      className="
        rounded-2xl border bg-white p-6 shadow-sm
      "
    >
      <h2
        id="calendar-table-title"
        data-testid="calendar-table-title"
        className="
          mb-4 text-lg font-semibold text-blue-700
        "
      >
        Calendar (Advanced)
      </h2>

      <div
        className="
          mb-3 flex items-center justify-between
        "
      >
        <button
          type="button"
          id="previous-year-button"
          data-testid="previous-year-button"
          aria-label="Go to previous year"
          onClick={() => updateYear(-1)}
          className="
            rounded-md bg-blue-100 px-3 py-1
            text-blue-700 transition-colors
            hover:bg-blue-200
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-2
          "
        >
          ←
        </button>

        <p
          id="calendar-current-year"
          data-testid="calendar-current-year"
          className="
            text-lg font-semibold text-blue-700
          "
        >
          {year}
        </p>

        <button
          type="button"
          id="next-year-button"
          data-testid="next-year-button"
          aria-label="Go to next year"
          onClick={() => updateYear(1)}
          className="
            rounded-md bg-blue-100 px-3 py-1
            text-blue-700 transition-colors
            hover:bg-blue-200
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-2
          "
        >
          →
        </button>
      </div>

      <div
        className="
          mb-4 flex items-center justify-between
        "
      >
        <button
          type="button"
          id="previous-month-button"
          data-testid="previous-month-button"
          aria-label="Go to previous month"
          onClick={() => updateMonth(-1)}
          className="
            rounded-md bg-blue-100 px-3 py-1
            text-blue-700 transition-colors
            hover:bg-blue-200
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-2
          "
        >
          ←
        </button>

        <p
          id="calendar-current-month"
          data-testid="calendar-current-month"
          className="
            text-lg font-semibold text-blue-700
          "
        >
          {MONTHS[month]}
        </p>

        <button
          type="button"
          id="next-month-button"
          data-testid="next-month-button"
          aria-label="Go to next month"
          onClick={() => updateMonth(1)}
          className="
            rounded-md bg-blue-100 px-3 py-1
            text-blue-700 transition-colors
            hover:bg-blue-200
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-2
          "
        >
          →
        </button>
      </div>

      <table
        id="calendar-date-table"
        data-testid="calendar-date-table"
        aria-label="Calendar date table"
        className="
          w-full border-collapse text-center
        "
      >
        <thead className="bg-blue-100">
          <tr>
            {WEEK_DAYS.map((day) => (
              <th
                key={day}
                scope="col"
                className="
                  border px-2 py-2 text-blue-700
                "
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({
            length: Math.ceil(days.length / 7)
          }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {days
                .slice(
                  rowIndex * 7,
                  rowIndex * 7 + 7
                )
                .map((day, index) => {
                  const fullDate = day
                    ? formatDate(day)
                    : ""

                  const isToday =
                    !!day &&
                    today.getDate() === day &&
                    today.getMonth() === month &&
                    today.getFullYear() === year

                  const isSelected =
                    !!day &&
                    selectedDate === fullDate

                  return (
                    <td
                      key={index}
                      className="border p-1"
                    >
                      {day ? (
                        <button
                          type="button"
                          id={`calendar-day-${day}`}
                          data-testid={`calendar-day-${day}`}
                          data-date={fullDate}
                          data-today={
                            isToday
                              ? "true"
                              : "false"
                          }
                          aria-label={`Select ${fullDate}`}
                          aria-pressed={isSelected}
                          onClick={() =>
                            setSelectedDate(
                              fullDate
                            )
                          }
                          className={`
                            h-10 w-10 rounded-md
                            transition-colors
                            hover:bg-blue-100
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-blue-500
                            focus-visible:ring-offset-2
                            ${
                              isSelected
                                ? "bg-green-600 font-bold text-white"
                                : ""
                            }
                            ${
                              isToday &&
                              !isSelected
                                ? "border-2 border-yellow-500 font-semibold"
                                : ""
                            }
                          `}
                        >
                          {day}
                        </button>
                      ) : (
                        <span
                          aria-hidden="true"
                          className="block h-10"
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
        className="
          mt-4 rounded-md border bg-gray-50
          px-3 py-2 text-sm font-medium text-green-700
        "
      >
        Selected:
        {" "}
        {selectedDate || "None"}
      </div>
    </section>
  )
}

CalendarTable.displayName = "CalendarTable"
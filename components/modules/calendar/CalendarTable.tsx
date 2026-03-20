"use client"

import { useState } from "react"

type Props = {
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

export default function CalendarTable({ selectedDate, setSelectedDate }: Props) {

  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ]

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days: (number | null)[] = []

  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  const prevYear = () => setCurrentDate(new Date(year - 1, month, 1))
  const nextYear = () => setCurrentDate(new Date(year + 1, month, 1))

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const formatDate = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border">

      <h2 className="text-lg font-semibold mb-4 text-blue-600">
        📆 Calendar (Advanced)
      </h2>

      {/* YEAR */}
      <div className="flex justify-between items-center mb-2">
        <button onClick={prevYear} className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">←</button>
        <h3 className="font-bold text-blue-700 text-lg">Year: {year}</h3>
        <button onClick={nextYear} className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">→</button>
      </div>

      {/* MONTH */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">←</button>
        <h3 className="font-semibold text-blue-600 text-lg">Month: {months[month]}</h3>
        <button onClick={nextMonth} className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">→</button>
      </div>

      <table className="w-full border text-center">

        <thead className="bg-blue-100">
          <tr>
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <th key={d} className="border px-2 py-2 text-blue-700">{d}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[...Array(Math.ceil(days.length / 7))].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {days.slice(rowIndex * 7, rowIndex * 7 + 7).map((day, i) => {

                const fullDate = day ? formatDate(day) : ""

                const isToday =
                  day &&
                  today.getDate() === day &&
                  today.getMonth() === month &&
                  today.getFullYear() === year

                const isSelected = day && selectedDate === fullDate

                return (
                  <td
                    key={i}
                    onClick={() => day && setSelectedDate(fullDate)}
                    data-testid={day ? `day-${day}` : undefined}
                    data-date={fullDate}
                    data-today={isToday ? "true" : "false"}

                    className={`border px-2 py-2 cursor-pointer transition
                      ${day ? "hover:bg-blue-100" : ""}
                      ${isSelected ? "bg-green-500 text-white font-bold" : ""}
                      ${isToday && !isSelected ? "border-2 border-yellow-500 font-semibold" : ""}
                    `}
                  >
                    {day || ""}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>

      </table>

      <p className="mt-3 text-green-600 font-medium">
        Selected: {selectedDate || "None"}
      </p>

    </div>
  )
}
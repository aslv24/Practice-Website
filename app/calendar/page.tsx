"use client"

import { useState } from "react"

import DashboardBackLink from "@/components/layout/DashboardBackLink"
import CalendarTable from "@/components/modules/calendar/CalendarTable"
import DateInput from "@/components/modules/calendar/DateInput"
import WebTable from "@/components/modules/calendar/WebTable"

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState("")

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-2 text-3xl font-bold">Calendar Practice Page</h1>

      <p className="mb-4 text-gray-600">
        Practice calendar, date picker and table handling
      </p>

      <DashboardBackLink />

      <div className="mt-6 w-full max-w-2xl space-y-6">
        <DateInput
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <CalendarTable
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <WebTable />
      </div>
    </div>
  )
}

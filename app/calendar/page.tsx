"use client"

import { useState } from "react"

import DashboardBackLink from "@/components/layout/DashboardBackLink"
import CalendarTable from "@/components/modules/calendar/CalendarTable"
import DateInput from "@/components/modules/calendar/DateInput"
import WebTable from "@/components/modules/calendar/WebTable"

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState("")

  return (
    <div className="calendar-page">
      <h1 className="calendar-page__title">Calendar Practice Page</h1>

      <p className="calendar-page__description">
        Practice calendar, date picker and table handling
      </p>

      <DashboardBackLink />

      <div className="calendar-page__content">
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
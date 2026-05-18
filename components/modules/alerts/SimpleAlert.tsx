"use client"

import { useState } from "react"

import AlertCard from "./AlertCard"

const ALERT_MESSAGE = "This is a simple alert!"

export default function SimpleAlert() {
  const [status, setStatus] = useState(
    "Alert has not been triggered yet."
  )

  const handleAlert = () => {
    window.alert(ALERT_MESSAGE)

    setStatus("Alert was triggered successfully.")
  }

  return (
    <AlertCard
      automationId="simple-alert"
      title="Simple Alert"
    >
      <div
        className="flex flex-col gap-4"
        data-component="simple-alert"
      >
        <button
          type="button"
          id="simple-alert-button"
          name="simpleAlert"
          data-testid="simple-alert-button"
          aria-describedby="simple-alert-description"
          aria-label="Open simple alert"
          onClick={handleAlert}
          className="
            inline-flex w-fit items-center justify-center
            rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white
            transition-colors
            hover:bg-red-700
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-500
            focus-visible:ring-offset-2
          "
        >
          Click for Alert
        </button>

        <p
          id="simple-alert-description"
          data-testid="simple-alert-description"
          className="text-sm text-gray-600"
        >
          Opens a browser alert for Selenium automation practice.
        </p>

        <div
          id="simple-alert-status"
          data-testid="simple-alert-status"
          aria-live="polite"
          className="
            min-h-6 rounded-md border bg-gray-50 px-3 py-2 text-sm
          "
        >
          {status}
        </div>
      </div>
    </AlertCard>
  )
}

SimpleAlert.displayName = "SimpleAlert"
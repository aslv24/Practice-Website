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
        className="simple-alert"
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
          className="simple-alert__button"
        >
          Click for Alert
        </button>

        <p
          id="simple-alert-description"
          data-testid="simple-alert-description"
          className="simple-alert__description"
        >
          Opens a browser alert for Selenium automation practice.
        </p>

        <div
          id="simple-alert-status"
          data-testid="simple-alert-status"
          aria-live="polite"
          className="simple-alert__status"
        >
          {status}
        </div>
      </div>
    </AlertCard>
  )
}

SimpleAlert.displayName = "SimpleAlert"
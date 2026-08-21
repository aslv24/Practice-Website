"use client"

import { useState } from "react"

import AlertCard from "./AlertCard"

const CONFIRM_MESSAGE = "Do you want to proceed?"

export default function ConfirmAlert() {
  const [result, setResult] = useState<string | null>(null)

  const handleConfirm = () => {
    const confirmed = window.confirm(CONFIRM_MESSAGE)

    setResult(
      confirmed
        ? "User clicked OK"
        : "User clicked Cancel"
    )
  }

  return (
    <AlertCard
      automationId="confirmation-alert"
      title="Confirmation Alert"
    >
      <div
        className="confirm-alert"
        data-component="confirm-alert"
      >
        <button
          type="button"
          id="confirmation-alert-button"
          name="confirmationAlert"
          data-testid="confirmation-alert-button"
          aria-describedby="confirmation-alert-description"
          aria-label="Open confirmation alert"
          onClick={handleConfirm}
          className="confirm-alert__button"
        >
          Click for Confirm
        </button>

        <p
          id="confirmation-alert-description"
          data-testid="confirmation-alert-description"
          className="confirm-alert__description"
        >
          Opens a browser confirmation alert for Selenium practice.
        </p>

        <div
          id="confirmation-alert-result"
          data-testid="confirmation-alert-result"
          aria-live="polite"
          className="confirm-alert__result"
        >
          {result ?? "No action performed yet."}
        </div>
      </div>
    </AlertCard>
  )
}

ConfirmAlert.displayName = "ConfirmAlert"
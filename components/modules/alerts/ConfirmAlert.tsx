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
        className="flex flex-col gap-4"
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
          className="
            inline-flex w-fit items-center justify-center
            rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white
            transition-colors
            hover:bg-blue-700
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-2
          "
        >
          Click for Confirm
        </button>

        <p
          id="confirmation-alert-description"
          data-testid="confirmation-alert-description"
          className="text-sm text-gray-600"
        >
          Opens a browser confirmation alert for Selenium practice.
        </p>

        <div
          id="confirmation-alert-result"
          data-testid="confirmation-alert-result"
          aria-live="polite"
          className="
            min-h-6 rounded-md border bg-gray-50 px-3 py-2 text-sm
          "
        >
          {result ?? "No action performed yet."}
        </div>
      </div>
    </AlertCard>
  )
}

ConfirmAlert.displayName = "ConfirmAlert"
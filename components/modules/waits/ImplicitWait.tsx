"use client"

import { useEffect, useState } from "react"

type LoadingStatus =
  | "idle"
  | "loading"
  | "partially-loaded"
  | "completed"

export default function ImplicitWait() {
  const [showNameField, setShowNameField] =
    useState(false)

  const [showEmailField, setShowEmailField] =
    useState(false)

  const [showSubmitButton, setShowSubmitButton] =
    useState(false)

  const [status, setStatus] =
    useState<LoadingStatus>("idle")

  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    setStatus("loading")

    // Countdown Timer
    const countdownTimer = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(countdownTimer)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    // Name Field
    const nameTimer = window.setTimeout(() => {
      setShowNameField(true)
      setStatus("partially-loaded")
    }, 2000)

    // Email Field
    const emailTimer = window.setTimeout(() => {
      setShowEmailField(true)
    }, 4000)

    // Submit Button
    const buttonTimer = window.setTimeout(() => {
      setShowSubmitButton(true)
      setStatus("completed")
    }, 5000)

    return () => {
      window.clearTimeout(nameTimer)
      window.clearTimeout(emailTimer)
      window.clearTimeout(buttonTimer)
      window.clearInterval(countdownTimer)
    }
  }, [])

  const getStatusColor = (
    currentStatus: LoadingStatus
  ) => {
    switch (currentStatus) {
      case "loading":
        return "text-yellow-600"

      case "partially-loaded":
        return "text-blue-600"

      case "completed":
        return "text-green-600"

      default:
        return "text-gray-500"
    }
  }

  return (
    <section
      id="implicit-wait-card"
      data-testid="implicit-wait-card"
      data-component="implicit-wait"
      data-loading={status}
      aria-label="Implicit wait scenario"
      className="rounded-2xl border bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600">
          Implicit Wait Scenario
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Practice Selenium implicit waits with
          progressive element rendering and delayed
          UI loading.
        </p>
      </header>

      {/* Status Section */}
      <div
        className="mb-6 rounded-xl border bg-gray-50 p-4"
        aria-live="polite"
        data-testid="implicit-status-section"
      >
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <p
            id="implicit-loading-status"
            data-testid="implicit-loading-status"
            data-status={status}
            className={`font-medium ${getStatusColor(
              status
            )}`}
          >
            Status: {status}
          </p>

          <p
            id="implicit-countdown"
            data-testid="implicit-countdown"
            className="font-semibold text-blue-600"
          >
            Remaining Time: {countdown}s
          </p>
        </div>
      </div>

      {/* Loading Indicator */}
      {status !== "completed" && (
        <div
          id="implicit-loading-container"
          data-testid="implicit-loading-container"
          className="mb-6 rounded-xl border border-dashed p-4"
        >
          <div className="flex items-center gap-3">
            <div
              className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"
              aria-hidden="true"
            />

            <p
              id="implicit-loading-text"
              data-testid="implicit-loading-text"
              className="text-gray-600"
            >
              Loading form elements...
            </p>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div
        id="implicit-wait-fields-card"
        data-testid="implicit-wait-fields-card"
        className="space-y-4"
      >
        {/* Name Field */}
        {showNameField && (
          <div
            data-testid="name-field-container"
            data-rendered="true"
            className="space-y-2"
          >
            <label
              htmlFor="implicit-name-input"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>

            <input
              id="implicit-name-input"
              name="implicitName"
              data-testid="implicit-name-input"
              data-component="name-input"
              aria-label="Implicit wait name"
              placeholder="Enter your name"
              className="w-full rounded-lg border px-3 py-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
        )}

        {/* Email Field */}
        {showEmailField && (
          <div
            data-testid="email-field-container"
            data-rendered="true"
            className="space-y-2"
          >
            <label
              htmlFor="implicit-email-input"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="implicit-email-input"
              name="implicitEmail"
              data-testid="implicit-email-input"
              data-component="email-input"
              aria-label="Implicit wait email"
              placeholder="Enter your email"
              className="w-full rounded-lg border px-3 py-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
        )}

        {/* Submit Button */}
        {showSubmitButton && (
          <button
            id="implicit-submit-button"
            name="implicitSubmit"
            data-testid="implicit-submit-button"
            data-state="enabled"
            aria-label="Implicit wait submit button"
            className="rounded-lg bg-green-500 px-5 py-2 text-white transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
          >
            Submit Form
          </button>
        )}
      </div>

      {/* Result Section */}
      {status === "completed" && (
        <div
          id="implicit-success-message"
          data-testid="implicit-success-message"
          aria-live="polite"
          className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4"
        >
          <p className="font-medium text-green-700">
            Form fields loaded successfully.
          </p>
        </div>
      )}
    </section>
  )
}
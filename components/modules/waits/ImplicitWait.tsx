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
    useState<LoadingStatus>("loading")

  const [countdown, setCountdown] =
    useState(5)

  useEffect(() => {
    // Countdown Timer
    const countdownTimer =
      window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            window.clearInterval(
              countdownTimer
            )
            return 0
          }

          return prev - 1
        })
      }, 1000)

    // Name Field
    const nameTimer =
      window.setTimeout(() => {
        setShowNameField(true)
        setStatus("partially-loaded")
      }, 2000)

    // Email Field
    const emailTimer =
      window.setTimeout(() => {
        setShowEmailField(true)
      }, 4000)

    // Submit Button
    const buttonTimer =
      window.setTimeout(() => {
        setShowSubmitButton(true)
        setStatus("completed")
      }, 5000)

    return () => {
      window.clearTimeout(nameTimer)
      window.clearTimeout(emailTimer)
      window.clearTimeout(buttonTimer)
      window.clearInterval(
        countdownTimer
      )
    }
  }, [])

  const getStatusClass = (
    currentStatus: LoadingStatus
  ) => {
    switch (currentStatus) {
      case "loading":
        return "implicit-wait__status--loading"

      case "partially-loaded":
        return "implicit-wait__status--partial"

      case "completed":
        return "implicit-wait__status--completed"

      default:
        return "implicit-wait__status--idle"
    }
  }

  return (
    <section
      id="implicit-wait-card"
      data-testid="implicit-wait-card"
      data-component="implicit-wait"
      data-loading={status}
      aria-label="Implicit wait scenario"
      className="implicit-wait"
    >
      {/* Header */}
      <header className="implicit-wait__header">
        <h2 className="implicit-wait__title">
          Implicit Wait Scenario
        </h2>

        <p className="implicit-wait__description">
          Practice Selenium implicit waits with
          progressive element rendering and
          delayed UI loading.
        </p>
      </header>

      {/* Status Section */}
      <div
        className="implicit-wait__status-section"
        aria-live="polite"
        data-testid="implicit-status-section"
      >
        <div className="implicit-wait__status-row">
          <p
            id="implicit-loading-status"
            data-testid="implicit-loading-status"
            data-status={status}
            className={`implicit-wait__status ${getStatusClass(
              status
            )}`}
          >
            Status: {status}
          </p>

          <p
            id="implicit-countdown"
            data-testid="implicit-countdown"
            className="implicit-wait__countdown"
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
          className="implicit-wait__loading-container"
        >
          <div className="implicit-wait__loading-content">
            <div
              className="implicit-wait__spinner"
              aria-hidden="true"
            />

            <p
              id="implicit-loading-text"
              data-testid="implicit-loading-text"
              className="implicit-wait__loading-text"
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
        className="implicit-wait__fields"
      >
        {/* Name Field */}
        {showNameField && (
          <div
            data-testid="name-field-container"
            data-rendered="true"
            className="implicit-wait__field"
          >
            <label
              htmlFor="implicit-name-input"
              className="implicit-wait__label"
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
              className="implicit-wait__input"
            />
          </div>
        )}

        {/* Email Field */}
        {showEmailField && (
          <div
            data-testid="email-field-container"
            data-rendered="true"
            className="implicit-wait__field"
          >
            <label
              htmlFor="implicit-email-input"
              className="implicit-wait__label"
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
              className="implicit-wait__input"
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
            className="implicit-wait__submit"
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
          className="implicit-wait__success"
        >
          <p className="implicit-wait__success-text">
            Form fields loaded successfully.
          </p>
        </div>
      )}
    </section>
  )
}
"use client"

import { useState } from "react"

type ValidationErrors = {
  name?: string
  email?: string
}

type SubmitState =
  | "idle"
  | "validating"
  | "submitting"
  | "success"
  | "error"

export default function ValidationForm() {
  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [errors, setErrors] =
    useState<ValidationErrors>({})

  const [submitState, setSubmitState] =
    useState<SubmitState>("idle")

  const [successMessage, setSuccessMessage] =
    useState("")

  const [serverError, setServerError] =
    useState("")

  // Validate Form
  const validateForm = () => {
    const newErrors: ValidationErrors =
      {}

    if (!name.trim()) {
      newErrors.name =
        "Name is required"
    } else if (name.trim().length < 3) {
      newErrors.name =
        "Name must contain at least 3 characters"
    }

    if (!email.trim()) {
      newErrors.email =
        "Email is required"
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      newErrors.email =
        "Invalid email format"
    }

    setErrors(newErrors)

    return (
      Object.keys(newErrors).length === 0
    )
  }

  // Submit
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setSubmitState("validating")

    setSuccessMessage("")
    setServerError("")

    const isValid = validateForm()

    if (!isValid) {
      setSubmitState("idle")
      return
    }

    setSubmitState("submitting")

    try {
      // Simulate API Delay
      await new Promise((resolve, reject) =>
        setTimeout(() => {
          if (email.toLowerCase().includes("error")) {
            reject(new Error("Simulated Server Error"))
          } else {
            resolve(null)
          }
        }, 2000)
      )

      setSubmitState("success")

      setSuccessMessage(
        "Validation form submitted successfully."
      )

      setName("")
      setEmail("")

      setErrors({})
    } catch {
      setSubmitState("error")

      setServerError(
        "Something went wrong while submitting the form."
      )
    }
  }

  // Reset
  const handleReset = () => {
    setName("")
    setEmail("")

    setErrors({})

    setSuccessMessage("")
    setServerError("")

    setSubmitState("idle")
  }

  return (
    <section
      id="validation-form-card"
      data-testid="validation-form-card"
      data-component="validation-form"
      data-submit-state={
        submitState
      }
      aria-label="Validation practice form"
      className="validation-form"
    >
      {/* Header */}
      <header className="validation-form__header">
        <h2
          id="validation-form-title"
          data-testid="validation-form-title"
          className="validation-form__title"
        >
          Validation Form
        </h2>

        <p className="validation-form__description">
          Practice Selenium form
          validation, synchronization,
          error handling, and success
          message assertions.
        </p>

        <div className="validation-form__scenario-summary">
          <p className="validation-form__scenario-title">
            Selenium Scenarios Covered
          </p>

          <p className="validation-form__scenario-text">
            Required Validation • Invalid
            Email • Async Submission •
            Loading State • Error
            Assertions • Success Assertions
          </p>
        </div>
      </header>

      {/* Form */}
      <form
        id="validation-form"
        data-testid="validation-form"
        aria-label="Validation form"
        className="validation-form__form"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div className="validation-form__field">
          <label
            htmlFor="validation-name"
            className="validation-form__label"
          >
            Full Name
            <span className="validation-form__required-mark">
              *
            </span>
          </label>

          <input
            id="validation-name"
            name="validationName"
            type="text"
            value={name}
            data-testid="validation-name-input"
            aria-label="Validation name"
            aria-invalid={
              !!errors.name
            }
            aria-describedby="validation-name-error"
            placeholder="Enter full name"
            onChange={(e) => {
              setName(e.target.value)

              setErrors((prev) => ({
                ...prev,
                name: "",
              }))
            }}
            className={`validation-form__input${
              errors.name
                ? " validation-form__input--error"
                : ""
            }`}
          />

          {errors.name && (
            <p
              id="validation-name-error"
              data-testid="validation-name-error"
              aria-live="polite"
              className="validation-form__error"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="validation-form__field">
          <label
            htmlFor="validation-email"
            className="validation-form__label"
          >
            Email Address
            <span className="validation-form__required-mark">
              *
            </span>
          </label>

          <input
            id="validation-email"
            name="validationEmail"
            type="email"
            value={email}
            data-testid="validation-email-input"
            aria-label="Validation email"
            aria-invalid={
              !!errors.email
            }
            aria-describedby="validation-email-error"
            placeholder="Enter email address"
            onChange={(e) => {
              setEmail(e.target.value)

              setErrors((prev) => ({
                ...prev,
                email: "",
              }))
            }}
            className={`validation-form__input${
              errors.email
                ? " validation-form__input--error"
                : ""
            }`}
          />

          {errors.email && (
            <p
              id="validation-email-error"
              data-testid="validation-email-error"
              aria-live="polite"
              className="validation-form__error"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Status Area */}
        <div
          aria-live="polite"
          className="validation-form__status"
        >
          {submitState ===
            "submitting" && (
            <div
              id="validation-loading-state"
              data-testid="validation-loading-state"
              className="validation-form__message validation-form__message--loading"
            >
              <p className="validation-form__message-text validation-form__message-text--loading">
                Submitting form...
              </p>
            </div>
          )}

          {serverError && (
            <div
              id="validation-server-error"
              data-testid="validation-server-error"
              className="validation-form__message validation-form__message--error"
            >
              <p className="validation-form__message-text validation-form__message-text--error">
                {serverError}
              </p>
            </div>
          )}

          {successMessage && (
            <div
              id="validation-success-message"
              data-testid="validation-success-message"
              className="validation-form__message validation-form__message--success"
            >
              <p className="validation-form__message-text validation-form__message-text--success">
                {successMessage}
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="validation-form__actions">
          <button
            id="validation-submit-button"
            name="validationSubmit"
            type="submit"
            data-testid="validation-submit-button"
            aria-label="Submit validation form"
            disabled={
              submitState ===
              "submitting"
            }
            className={`validation-form__submit-button${
              submitState ===
              "submitting"
                ? " validation-form__submit-button--disabled"
                : ""
            }`}
          >
            {submitState ===
            "submitting"
              ? "Submitting..."
              : "Submit Form"}
          </button>

          <button
            id="validation-reset-button"
            name="validationReset"
            type="button"
            data-testid="validation-reset-button"
            aria-label="Reset validation form"
            onClick={handleReset}
            className="validation-form__reset-button"
          >
            Reset Form
          </button>
        </div>
      </form>

      {/* Selenium Assertion Panel */}
      <section
        id="validation-debug-panel"
        data-testid="validation-debug-panel"
        aria-label="Validation debug panel"
        className="validation-form__debug"
      >
        <h3 className="validation-form__debug-title">
          Selenium Assertion Panel
        </h3>

        <div className="validation-form__debug-content">
          <p
            id="validation-current-name"
            data-testid="validation-current-name"
          >
            Current Name:
            <span className="validation-form__debug-value">
              {name || "Empty"}
            </span>
          </p>

          <p
            id="validation-current-email"
            data-testid="validation-current-email"
          >
            Current Email:
            <span className="validation-form__debug-value">
              {email || "Empty"}
            </span>
          </p>

          <p
            id="validation-current-submit-state"
            data-testid="validation-current-submit-state"
          >
            Submit State:
            <span className="validation-form__debug-value validation-form__debug-value--capitalize">
              {submitState}
            </span>
          </p>
        </div>
      </section>
    </section>
  )
}
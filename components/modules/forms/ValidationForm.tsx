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
      className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <header className="mb-6">
        <h2
          id="validation-form-title"
          data-testid="validation-form-title"
          className="text-2xl font-bold text-slate-900"
        >
          Validation Form
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Practice Selenium form
          validation, synchronization,
          error handling, and success
          message assertions.
        </p>

        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-700">
            Selenium Scenarios Covered
          </p>

          <p className="mt-1 text-sm text-blue-600">
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
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div>
          <label
            htmlFor="validation-name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full Name
            <span className="ml-1 text-red-500">
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
            className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus-visible:ring-2 ${
              errors.name
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-300 focus-visible:ring-blue-500"
            }`}
          />

          {errors.name && (
            <p
              id="validation-name-error"
              data-testid="validation-name-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-600"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="validation-email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email Address
            <span className="ml-1 text-red-500">
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
            className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus-visible:ring-2 ${
              errors.email
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-300 focus-visible:ring-blue-500"
            }`}
          />

          {errors.email && (
            <p
              id="validation-email-error"
              data-testid="validation-email-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-600"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Status Area */}
        <div
          aria-live="polite"
          className="min-h-[28px]"
        >
          {submitState ===
            "submitting" && (
            <div
              id="validation-loading-state"
              data-testid="validation-loading-state"
              className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3"
            >
              <p className="text-sm font-medium text-amber-700">
                Submitting form...
              </p>
            </div>
          )}

          {serverError && (
            <div
              id="validation-server-error"
              data-testid="validation-server-error"
              className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3"
            >
              <p className="text-sm font-medium text-red-700">
                {serverError}
              </p>
            </div>
          )}

          {successMessage && (
            <div
              id="validation-success-message"
              data-testid="validation-success-message"
              className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3"
            >
              <p className="text-sm font-medium text-green-700">
                {successMessage}
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
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
            className={`rounded-2xl px-6 py-3 text-white transition ${
              submitState ===
              "submitting"
                ? "cursor-not-allowed bg-slate-400"
                : "bg-blue-600 hover:bg-blue-700"
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
            className="rounded-2xl bg-red-500 px-6 py-3 text-white transition hover:bg-red-600"
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
        className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5"
      >
        <h3 className="mb-3 text-sm font-semibold text-slate-800">
          Selenium Assertion Panel
        </h3>

        <div className="space-y-2 text-sm text-slate-700">
          <p
            id="validation-current-name"
            data-testid="validation-current-name"
          >
            Current Name:
            <span className="ml-2 font-medium">
              {name || "Empty"}
            </span>
          </p>

          <p
            id="validation-current-email"
            data-testid="validation-current-email"
          >
            Current Email:
            <span className="ml-2 font-medium">
              {email || "Empty"}
            </span>
          </p>

          <p
            id="validation-current-submit-state"
            data-testid="validation-current-submit-state"
          >
            Submit State:
            <span className="ml-2 font-medium capitalize">
              {submitState}
            </span>
          </p>
        </div>
      </section>
    </section>
  )
}
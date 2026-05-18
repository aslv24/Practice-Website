"use client"

import { useState } from "react"

type BasicFormState = {
  name: string
  email: string
  gender: string
  course: string
  agree: boolean
}

type FormErrors = {
  name?: string
  email?: string
  gender?: string
  course?: string
  agree?: string
}

type SubmitStatus =
  | "idle"
  | "submitting"
  | "success"

export default function BasicForm() {
  const [form, setForm] =
    useState<BasicFormState>({
      name: "",
      email: "",
      gender: "",
      course: "",
      agree: false,
    })

  const [errors, setErrors] =
    useState<FormErrors>({})

  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>("idle")

  // Handle Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]:
        e.target instanceof
          HTMLInputElement &&
        e.target.type === "checkbox"
          ? e.target.checked
          : value,
    }))

    // Clear field error
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  }

  // Validate Form
  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!form.name.trim()) {
      newErrors.name =
        "Name is required"
    }

    if (!form.email.trim()) {
      newErrors.email =
        "Email is required"
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email =
        "Invalid email format"
    }

    if (!form.gender) {
      newErrors.gender =
        "Please select gender"
    }

    if (!form.course) {
      newErrors.course =
        "Please select course"
    }

    if (!form.agree) {
      newErrors.agree =
        "Please accept terms"
    }

    setErrors(newErrors)

    return (
      Object.keys(newErrors).length === 0
    )
  }

  // Submit
  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    const isValid = validateForm()

    if (!isValid) return

    setSubmitStatus("submitting")

    setTimeout(() => {
      setSubmitStatus("success")
    }, 2000)
  }

  // Reset
  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      gender: "",
      course: "",
      agree: false,
    })

    setErrors({})

    setSubmitStatus("idle")
  }

  return (
    <section
      id="basic-form-card"
      data-testid="basic-form-card"
      data-component="basic-form"
      data-submit-state={
        submitStatus
      }
      aria-label="Candidate registration form"
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <header className="mb-6">
        <h2
          id="basic-form-title"
          data-testid="basic-form-title"
          className="text-2xl font-bold text-blue-600"
        >
          Candidate Registration
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Practice Selenium form
          automation with validation,
          submission workflows, and
          dynamic assertions.
        </p>
      </header>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Name */}
        <div>
          <label
            htmlFor="basic-form-name"
            className="text-sm font-medium text-gray-700"
          >
            Full Name
          </label>

          <input
            id="basic-form-name"
            name="name"
            value={form.name}
            data-testid="basic-form-name-input"
            aria-label="Full name"
            aria-invalid={
              !!errors.name
            }
            placeholder="Enter full name"
            onChange={handleChange}
            className={`mt-1 w-full rounded-lg border p-2 focus-visible:outline-none focus-visible:ring-2 ${
              errors.name
                ? "border-red-500 focus-visible:ring-red-500"
                : "focus-visible:ring-blue-500"
            }`}
          />

          {errors.name && (
            <p
              id="basic-form-name-error"
              data-testid="basic-form-name-error"
              className="mt-1 text-sm text-red-600"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="basic-form-email"
            className="text-sm font-medium text-gray-700"
          >
            Email Address
          </label>

          <input
            id="basic-form-email"
            type="email"
            name="email"
            value={form.email}
            data-testid="basic-form-email-input"
            aria-label="Email address"
            aria-invalid={
              !!errors.email
            }
            placeholder="Enter email"
            onChange={handleChange}
            className={`mt-1 w-full rounded-lg border p-2 focus-visible:outline-none focus-visible:ring-2 ${
              errors.email
                ? "border-red-500 focus-visible:ring-red-500"
                : "focus-visible:ring-blue-500"
            }`}
          />

          {errors.email && (
            <p
              id="basic-form-email-error"
              data-testid="basic-form-email-error"
              className="mt-1 text-sm text-red-600"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Gender */}
        <fieldset>
          <legend className="text-sm font-medium text-gray-700">
            Gender
          </legend>

          <div className="mt-2 flex gap-5">
            <label className="flex items-center gap-2">
              <input
                id="basic-form-gender-male"
                type="radio"
                name="gender"
                value="male"
                checked={
                  form.gender ===
                  "male"
                }
                data-testid="basic-form-gender-male-radio"
                onChange={
                  handleChange
                }
              />

              Male
            </label>

            <label className="flex items-center gap-2">
              <input
                id="basic-form-gender-female"
                type="radio"
                name="gender"
                value="female"
                checked={
                  form.gender ===
                  "female"
                }
                data-testid="basic-form-gender-female-radio"
                onChange={
                  handleChange
                }
              />

              Female
            </label>
          </div>

          {errors.gender && (
            <p
              id="basic-form-gender-error"
              data-testid="basic-form-gender-error"
              className="mt-1 text-sm text-red-600"
            >
              {errors.gender}
            </p>
          )}
        </fieldset>

        {/* Course */}
        <div>
          <label
            htmlFor="basic-form-course"
            className="text-sm font-medium text-gray-700"
          >
            Course
          </label>

          <select
            id="basic-form-course"
            name="course"
            value={form.course}
            data-testid="basic-form-course-dropdown"
            aria-invalid={
              !!errors.course
            }
            onChange={handleChange}
            className={`mt-1 w-full rounded-lg border p-2 focus-visible:outline-none focus-visible:ring-2 ${
              errors.course
                ? "border-red-500 focus-visible:ring-red-500"
                : "focus-visible:ring-blue-500"
            }`}
          >
            <option value="">
              Select Course
            </option>

            <option value="selenium">
              Selenium
            </option>

            <option value="playwright">
              Playwright
            </option>

            <option value="cypress">
              Cypress
            </option>
          </select>

          {errors.course && (
            <p
              id="basic-form-course-error"
              data-testid="basic-form-course-error"
              className="mt-1 text-sm text-red-600"
            >
              {errors.course}
            </p>
          )}
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-center gap-2">
            <input
              id="basic-form-agree-checkbox"
              type="checkbox"
              name="agree"
              checked={form.agree}
              data-testid="basic-form-agree-checkbox"
              onChange={handleChange}
            />

            Accept Terms &
            Conditions
          </label>

          {errors.agree && (
            <p
              id="basic-form-agree-error"
              data-testid="basic-form-agree-error"
              className="mt-1 text-sm text-red-600"
            >
              {errors.agree}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            id="basic-form-submit-button"
            type="submit"
            data-testid="basic-form-submit-button"
            disabled={
              submitStatus ===
              "submitting"
            }
            className={`rounded-lg px-5 py-2 text-white transition-colors ${
              submitStatus ===
              "submitting"
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitStatus ===
            "submitting"
              ? "Submitting..."
              : "Submit"}
          </button>

          <button
            id="basic-form-reset-button"
            type="button"
            data-testid="basic-form-reset-button"
            onClick={handleReset}
            className="rounded-lg bg-red-500 px-5 py-2 text-white hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Success Message */}
      {submitStatus === "success" && (
        <div
          id="basic-form-success-message"
          data-testid="basic-form-success-message"
          aria-live="polite"
          className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4"
        >
          <p className="font-medium text-green-700">
            Form submitted successfully.
          </p>
        </div>
      )}

      {/* Debug State */}
      <div className="mt-6 rounded-xl bg-gray-100 p-4">
        <p className="mb-2 font-semibold text-gray-700">
          Filled Data
        </p>

        <pre
          id="basic-form-json-state"
          data-testid="basic-form-json-state"
          className="overflow-auto text-sm text-gray-700"
        >
          {JSON.stringify(
            form,
            null,
            2
          )}
        </pre>
      </div>
    </section>
  )
}
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
      className="basic-form"
    >
      {/* Header */}
      <header className="basic-form__header">
        <h2
          id="basic-form-title"
          data-testid="basic-form-title"
          className="basic-form__title"
        >
          Candidate Registration
        </h2>

        <p className="basic-form__description">
          Practice Selenium form
          automation with validation,
          submission workflows, and
          dynamic assertions.
        </p>
      </header>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="basic-form__form"
      >
        {/* Name */}
        <div className="basic-form__field">
          <label
            htmlFor="basic-form-name"
            className="basic-form__label"
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
            className={`basic-form__input${
              errors.name
                ? " basic-form__input--error"
                : ""
            }`}
          />

          {errors.name && (
            <p
              id="basic-form-name-error"
              data-testid="basic-form-name-error"
              className="basic-form__error"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="basic-form__field">
          <label
            htmlFor="basic-form-email"
            className="basic-form__label"
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
            className={`basic-form__input${
              errors.email
                ? " basic-form__input--error"
                : ""
            }`}
          />

          {errors.email && (
            <p
              id="basic-form-email-error"
              data-testid="basic-form-email-error"
              className="basic-form__error"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Gender */}
        <fieldset className="basic-form__fieldset">
          <legend className="basic-form__label">
            Gender
          </legend>

          <div className="basic-form__radio-group">
            <label className="basic-form__radio-label">
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

            <label className="basic-form__radio-label">
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
              className="basic-form__error"
            >
              {errors.gender}
            </p>
          )}
        </fieldset>

        {/* Course */}
        <div className="basic-form__field">
          <label
            htmlFor="basic-form-course"
            className="basic-form__label"
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
            className={`basic-form__input${
              errors.course
                ? " basic-form__input--error"
                : ""
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
              className="basic-form__error"
            >
              {errors.course}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="basic-form__field">
          <label className="basic-form__checkbox-label">
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
              className="basic-form__error"
            >
              {errors.agree}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="basic-form__actions">
          <button
            id="basic-form-submit-button"
            type="submit"
            data-testid="basic-form-submit-button"
            disabled={
              submitStatus ===
              "submitting"
            }
            className={`basic-form__submit-button${
              submitStatus ===
              "submitting"
                ? " basic-form__submit-button--disabled"
                : ""
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
            className="basic-form__reset-button"
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
          className="basic-form__success"
        >
          <p className="basic-form__success-text">
            Form submitted successfully.
          </p>
        </div>
      )}

      {/* Debug State */}
      <div className="basic-form__debug">
        <p className="basic-form__debug-title">
          Filled Data
        </p>

        <pre
          id="basic-form-json-state"
          data-testid="basic-form-json-state"
          className="basic-form__debug-content"
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
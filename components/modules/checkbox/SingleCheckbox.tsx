"use client"

import { useState } from "react"

export default function SingleCheckbox() {
  const [checked, setChecked] =
    useState(false)

  return (
    <section
      id="single-checkbox-card"
      data-testid="single-checkbox-card"
      data-component="single-checkbox"
      aria-labelledby="single-checkbox-title"
      className="
        rounded-2xl border border-gray-100
        bg-white p-6 shadow-sm
        transition-shadow hover:shadow-md
      "
    >
      <h2
        id="single-checkbox-title"
        data-testid="single-checkbox-title"
        className="
          mb-4 text-lg font-semibold text-gray-800
        "
      >
        Single Checkbox
      </h2>

      <fieldset
        aria-describedby="single-checkbox-description"
        className="space-y-4"
      >
        <legend className="sr-only">
          Single checkbox selection
        </legend>

        <p
          id="single-checkbox-description"
          data-testid="single-checkbox-description"
          className="text-sm text-gray-500"
        >
          Toggle the checkbox for Selenium
          automation practice.
        </p>

        <label
          htmlFor="accept-terms-checkbox"
          className="
            flex cursor-pointer items-center
            gap-3 rounded-md p-2
            transition-colors hover:bg-gray-50
          "
        >
          <input
            id="accept-terms-checkbox"
            name="acceptTerms"
            type="checkbox"
            checked={checked}
            data-testid="accept-terms-checkbox"
            aria-label="Accept terms and conditions"
            onChange={(event) =>
              setChecked(
                event.target.checked
              )
            }
            className="
              h-5 w-5 accent-blue-600
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-2
            "
          />

          <span
            data-testid="accept-terms-label"
            className="text-gray-700"
          >
            Accept Terms & Conditions
          </span>
        </label>
      </fieldset>

      <div
        id="single-checkbox-status"
        data-testid="single-checkbox-status"
        aria-live="polite"
        className={`
          mt-4 rounded-md border px-3 py-2
          text-sm font-medium
          ${
            checked
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }
        `}
      >
        Status:
        {" "}
        {checked
          ? "Checked"
          : "Unchecked"}
      </div>
    </section>
  )
}

SingleCheckbox.displayName =
  "SingleCheckbox"
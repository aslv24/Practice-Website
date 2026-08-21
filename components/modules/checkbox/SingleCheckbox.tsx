"use client"

import { useState } from "react"

export default function SingleCheckbox() {
  const [checked, setChecked] = useState(false)

  return (
    <section
      id="single-checkbox-card"
      data-testid="single-checkbox-card"
      data-component="single-checkbox"
      aria-labelledby="single-checkbox-title"
      className="practice-card"
    >
      <h2
        id="single-checkbox-title"
        data-testid="single-checkbox-title"
        className="practice-title"
      >
        Single Checkbox
      </h2>

      <fieldset
        aria-describedby="single-checkbox-description"
        className="single-checkbox__fieldset"
      >
        <legend className="sr-only">
          Single checkbox selection
        </legend>

        <p
          id="single-checkbox-description"
          data-testid="single-checkbox-description"
          className="practice-description"
        >
          Toggle the checkbox for Selenium automation practice.
        </p>

        <label
          htmlFor="accept-terms-checkbox"
          className="single-checkbox__option"
        >
          <input
            id="accept-terms-checkbox"
            name="acceptTerms"
            type="checkbox"
            checked={checked}
            data-testid="accept-terms-checkbox"
            aria-label="Accept terms and conditions"
            onChange={(event) => setChecked(event.target.checked)}
            className="practice-checkbox"
          />

          <span
            data-testid="accept-terms-label"
            className="single-checkbox__label"
          >
            Accept Terms & Conditions
          </span>
        </label>
      </fieldset>

      <div
        id="single-checkbox-status"
        data-testid="single-checkbox-status"
        aria-live="polite"
        className={`single-checkbox__status${
          checked
            ? " single-checkbox__status--checked"
            : " single-checkbox__status--unchecked"
        }`}
      >
        Status: {checked ? "Checked" : "Unchecked"}
      </div>
    </section>
  )
}

SingleCheckbox.displayName = "SingleCheckbox"
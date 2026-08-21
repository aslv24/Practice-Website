"use client"

import { useState } from "react"

type NotificationOption = {
  label: string
  value: string
  description: string
  disabled?: boolean
}

export default function SingleRadio() {
  const [selected, setSelected] =
    useState("")

  const options: NotificationOption[] = [
    {
      label: "Enable Notifications",
      value: "enabled",
      description:
        "Receive important system updates and alerts.",
    },
    {
      label: "Disable Notifications",
      value: "disabled",
      description:
        "Stop receiving email and system notifications.",
      disabled: false,
    },
  ]

  return (
    <section
      id="single-radio-card"
      data-testid="single-radio-card"
      data-component="single-radio"
      aria-label="Notification preference radio group"
      className="practice-card"
    >
      {/* Header */}
      <header className="single-radio__header">
        <h2 className="single-radio__title">
          Single Radio Button
        </h2>

        <p className="single-radio__description">
          Practice Selenium radio button
          interactions using realistic business
          scenarios and state assertions.
        </p>
      </header>

      {/* Radio Group */}
      <fieldset
        className="single-radio__fieldset"
        aria-describedby="single-radio-helper-text"
      >
        <legend className="single-radio__legend">
          Notification Preference
        </legend>

        <p
          id="single-radio-helper-text"
          className="single-radio__helper-text"
        >
          Please choose one notification option.
        </p>

        {options.map((option) => {
          const isSelected =
            selected === option.value

          return (
            <label
              key={option.value}
              htmlFor={`single-radio-${option.value}`}
              data-testid={`single-radio-${option.value}-container`}
              data-selected={isSelected}
              data-disabled={
                option.disabled || false
              }
              className={`single-radio__option${
                option.disabled
                  ? " single-radio__option--disabled"
                  : isSelected
                  ? " single-radio__option--selected"
                  : ""
              }`}
            >
              <input
                id={`single-radio-${option.value}`}
                type="radio"
                name="notification"
                value={option.value}
                disabled={option.disabled}
                checked={isSelected}
                data-testid={`single-radio-${option.value}-radio`}
                aria-label={option.label}
                aria-checked={isSelected}
                onChange={(e) =>
                  setSelected(
                    e.target.value
                  )
                }
                className="mt-1 practice-radio"
              />

              <div className="single-radio__content">
                <div className="single-radio__option-header">
                  <p className="single-radio__option-label">
                    {option.label}
                  </p>

                  {option.disabled && (
                    <span className="single-radio__disabled-badge">
                      Disabled
                    </span>
                  )}
                </div>

                <p className="single-radio__option-description">
                  {option.description}
                </p>
              </div>
            </label>
          )
        })}
      </fieldset>

      {/* Result Section */}
      <div
        id="single-radio-result-section"
        data-testid="single-radio-result-section"
        aria-live="polite"
        className="single-radio__result"
      >
        <p
          id="single-radio-selected-value"
          data-testid="single-radio-selected-value"
          className="single-radio__result-value"
        >
          {selected
            ? `Selected Option: ${selected}`
            : "No option selected"}
        </p>

        <p className="single-radio__result-description">
          Radio button state updated
          successfully.
        </p>
      </div>
    </section>
  )
}
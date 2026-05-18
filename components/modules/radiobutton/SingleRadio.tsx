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
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600">
          Single Radio Button
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Practice Selenium radio button
          interactions using realistic business
          scenarios and state assertions.
        </p>
      </header>

      {/* Radio Group */}
      <fieldset
        className="space-y-4"
        aria-describedby="single-radio-helper-text"
      >
        <legend className="text-sm font-semibold text-gray-800">
          Notification Preference
        </legend>

        <p
          id="single-radio-helper-text"
          className="text-sm text-gray-500"
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
              className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
                option.disabled
                  ? "cursor-not-allowed bg-gray-100 opacity-60"
                  : isSelected
                  ? "border-blue-300 bg-blue-50"
                  : "hover:bg-gray-50"
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
                className="mt-1 h-5 w-5 accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-gray-800">
                    {option.label}
                  </p>

                  {option.disabled && (
                    <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                      Disabled
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-500">
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
        className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4"
      >
        <p
          id="single-radio-selected-value"
          data-testid="single-radio-selected-value"
          className="font-medium text-green-700"
        >
          {selected
            ? `Selected Option: ${selected}`
            : "No option selected"}
        </p>

        <p className="mt-1 text-sm text-green-600">
          Radio button state updated
          successfully.
        </p>
      </div>
    </section>
  )
}
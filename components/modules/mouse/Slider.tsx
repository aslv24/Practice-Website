"use client"

import { useMemo, useState } from "react"

type SliderStatus =
  | "low"
  | "medium"
  | "high"
  | "maximum"

export default function Slider() {
  const [value, setValue] = useState(50)

  const sliderStatus =
    useMemo<SliderStatus>(() => {
      if (value >= 100) {
        return "maximum"
      }

      if (value >= 70) {
        return "high"
      }

      if (value >= 40) {
        return "medium"
      }

      return "low"
    }, [value])

  const statusConfig: Record<
    SliderStatus,
    {
      label: string
      textColor: string
      progressColor: string
    }
  > = {
    low: {
      label: "Low",
      textColor: "text-blue-600",
      progressColor: "bg-blue-500",
    },
    medium: {
      label: "Medium",
      textColor: "text-yellow-600",
      progressColor: "bg-yellow-500",
    },
    high: {
      label: "High",
      textColor: "text-orange-600",
      progressColor: "bg-orange-500",
    },
    maximum: {
      label: "Maximum",
      textColor: "text-red-600",
      progressColor: "bg-red-500",
    },
  }

  return (
    <section
      id="slider-card"
      data-testid="slider-card"
      aria-label="Slider card"
      className="
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:shadow-md
      "
    >
      <header className="mb-4">
        <h2
          id="slider-title"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          🖱️ Slider
        </h2>

        <p
          id="slider-description"
          className="mt-1 text-sm text-gray-500"
        >
          Practice Selenium slider interactions
          and value validation.
        </p>
      </header>

      {/* Slider Input */}
      <div className="space-y-4">
        <input
          id="range-slider-input"
          name="rangeSlider"
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          data-testid="range-slider-input"
          aria-label="Range slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          onChange={(event) =>
            setValue(
              Number(event.target.value)
            )
          }
          className="
            w-full
            cursor-pointer
            accent-blue-600
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
            focus:ring-offset-2
          "
        />

        {/* Progress Bar */}
        <div
          id="slider-progress-container"
          data-testid="slider-progress-container"
          className="
            h-3
            overflow-hidden
            rounded-full
            bg-gray-200
          "
        >
          <div
            id="slider-progress-bar"
            data-testid="slider-progress-bar"
            className={`
              h-full
              transition-all
              duration-300
              ${statusConfig[sliderStatus].progressColor}
            `}
            style={{
              width: `${value}%`,
            }}
          />
        </div>
      </div>

      {/* Value Display */}
      <div
        className="mt-4"
        aria-live="polite"
      >
        <p
          id="range-slider-value"
          data-testid="range-slider-value"
          className={`
            text-sm
            font-medium
            ${statusConfig[sliderStatus].textColor}
          `}
        >
          Value: {value}
        </p>

        <p
          id="range-slider-status"
          data-testid="range-slider-status"
          className="mt-1 text-sm text-gray-500"
        >
          Status:{" "}
          {
            statusConfig[sliderStatus]
              .label
          }
        </p>
      </div>

      {/* Range Labels */}
      <div
        className="
          mt-4
          flex
          justify-between
          text-xs
          text-gray-400
        "
      >
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </section>
  )
}
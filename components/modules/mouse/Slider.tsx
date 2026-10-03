"use client"

import {
  useCallback,
  useMemo,
  useState,
} from "react"

import { dynamicWidth } from "@/lib/dynamicStyles"

type SliderStatus =
  | "low"
  | "medium"
  | "high"
  | "maximum"

/**
 * Slider Component
 * Demonstrates slider interactions with optimized performance
 * Uses useCallback for event handlers and useMemo for status calculation
 */
export default function Slider() {
  const [value, setValue] = useState(50)

  // Memoize status calculation to avoid recalculating on every render
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

  // Memoize onChange handler to prevent recreating on every render
  const handleSliderChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setValue(
        Number(event.target.value)
      )
    },
    []
  )

  const statusConfig: Record<
    SliderStatus,
    {
      label: string
      textClass: string
      progressClass: string
    }
  > = {
    low: {
      label: "Low",
      textClass:
        "slider__value--low",
      progressClass:
        "slider__progress-bar--low",
    },
    medium: {
      label: "Medium",
      textClass:
        "slider__value--medium",
      progressClass:
        "slider__progress-bar--medium",
    },
    high: {
      label: "High",
      textClass:
        "slider__value--high",
      progressClass:
        "slider__progress-bar--high",
    },
    maximum: {
      label: "Maximum",
      textClass:
        "slider__value--maximum",
      progressClass:
        "slider__progress-bar--maximum",
    },
  }

  return (
    <section
      id="slider-card"
      data-testid="slider-card"
      aria-label="Slider card"
      className="slider"
    >
      <header className="slider__header">
        <h2
          id="slider-title"
          className="slider__title"
        >
          🖱️ Continuous Slider
        </h2>

        <p
          id="slider-description"
          className="slider__description"
        >
          Practice continuous slider interactions and threshold value validation.
        </p>
      </header>

      {/* Slider Input */}
      <div className="slider__control">
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
          onChange={handleSliderChange}
          className="slider__input"
        />

        {/* Progress Bar */}
        <div
          id="slider-progress-container"
          data-testid="slider-progress-container"
          className="slider__progress"
        >
          <div
            id="slider-progress-bar"
            data-testid="slider-progress-bar"
            className={`slider__progress-bar ${statusConfig[sliderStatus].progressClass}`}
            style={dynamicWidth(value)}
          />
        </div>
      </div>

      {/* Value Display */}
      <div
        className="slider__value-display"
        aria-live="polite"
      >
        <p
          id="range-slider-value"
          data-testid="range-slider-value"
          className={`slider__value ${statusConfig[sliderStatus].textClass}`}
        >
          Value: {value}
        </p>

        <p
          id="range-slider-status"
          data-testid="range-slider-status"
          className="slider__status"
        >
          Status:{" "}
          {
            statusConfig[
              sliderStatus
            ].label
          }
        </p>
      </div>

      {/* Range Labels */}
      <div className="slider__range-labels">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </section>
  )
}
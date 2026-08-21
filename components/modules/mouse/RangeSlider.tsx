"use client"

import { useCallback, useState } from "react"

/**
 * RangeSlider Component
 * HTML5 range input with target matching game
 * Optimized with useCallback for event handlers
 */
export default function RangeSlider() {
  const [value, setValue] = useState(25)
  const targetValue = 75

  // Memoize onChange handler to prevent recreating on every render
  const handleRangeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(parseInt(e.target.value))
    },
    []
  )

  const isTargetMatched =
    value === targetValue

  return (
    <section
      id="range-slider-card-html5"
      data-testid="range-slider-card-html5"
      className="range-slider"
    >
      <h2
        id="range-slider-title-html5"
        data-testid="range-slider-title-html5"
        className="range-slider__title"
      >
        HTML5 Range Slider
      </h2>

      <p className="range-slider__description">
        Practice sliding the range input to match the target value.
      </p>

      <div className="range-slider__content">
        <div className="range-slider__control">
          <div className="range-slider__values">
            <span className="range-slider__min">
              Min: 0
            </span>

            <span
              className="range-slider__current"
              id="slider-value"
              data-testid="slider-value"
            >
              Current: {value}
            </span>

            <span className="range-slider__max">
              Max: 100
            </span>
          </div>

          <input
            id="range-slider"
            data-testid="range-slider"
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={handleRangeChange}
            className="range-slider__input"
          />
        </div>

        <div className="range-slider__target-panel">
          <p className="range-slider__target-label">
            Target Value:
            {" "}
            <span
              className="range-slider__target-value"
              id="slider-target"
              data-testid="slider-target"
            >
              {targetValue}
            </span>
          </p>

          <div
            id="slider-status"
            data-testid="slider-status"
            aria-live="polite"
            className={`range-slider__status${
              isTargetMatched
                ? " range-slider__status--success"
                : " range-slider__status--pending"
            }`}
          >
            {isTargetMatched
              ? "Success! Target Matched."
              : "Keep Sliding..."}
          </div>
        </div>
      </div>
    </section>
  )
}

RangeSlider.displayName = "RangeSlider"
"use client"

import { useState } from "react"

export default function RangeSlider() {
  const [value, setValue] = useState(25)
  const targetValue = 75

  return (
    <section
      id="range-slider-card-html5"
      data-testid="range-slider-card-html5"
      className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <h2
        id="range-slider-title-html5"
        data-testid="range-slider-title-html5"
        className="text-lg font-bold text-gray-800 mb-2"
      >
        HTML5 Range Slider
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Practice sliding the range input to match the target value.
      </p>

      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Min: 0</span>
            <span className="font-semibold text-gray-800" id="slider-value" data-testid="slider-value">
              Current: {value}
            </span>
            <span className="text-gray-500">Max: 100</span>
          </div>

          <input
            id="range-slider"
            data-testid="range-slider"
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center p-4 rounded-xl border border-gray-200 bg-gray-50 min-h-[96px]">
          <p className="text-sm text-gray-500">
            Target Value: <span className="font-bold text-slate-800" id="slider-target" data-testid="slider-target">{targetValue}</span>
          </p>
          <div
            id="slider-status"
            data-testid="slider-status"
            aria-live="polite"
            className={`mt-2 rounded px-3 py-1 text-xs font-semibold ${
              value === targetValue
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {value === targetValue ? "Success! Target Matched." : "Keep Sliding..."}
          </div>
        </div>
      </div>
    </section>
  )
}
RangeSlider.displayName = "RangeSlider"

"use client"

import { useState } from "react"

export default function Slider() {

  const [value, setValue] = useState(50)

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">

      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🖱️ Slider
      </h2>

      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-blue-600 cursor-pointer"
      />

      <p className="mt-3 font-medium text-blue-600">
        Value: {value}
      </p>

    </div>
  )
}
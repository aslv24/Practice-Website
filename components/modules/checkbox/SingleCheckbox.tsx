"use client"

import { useState } from "react"

export default function SingleCheckbox() {

  const [checked, setChecked] = useState(false)

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100">

      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Single Checkbox
      </h2>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="w-5 h-5 accent-blue-600"
        />
        <span className="text-gray-700">
          Accept Terms & Conditions
        </span>
      </label>

      <p className={`mt-3 text-sm font-medium ${checked ? "text-green-600" : "text-gray-500"}`}>
        {checked ? "✔ Checked" : "✖ Unchecked"}
      </p>

    </div>
  )
}
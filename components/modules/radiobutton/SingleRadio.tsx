"use client"

import { useState } from "react"

export default function SingleRadio() {

  const [selected, setSelected] = useState("")

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100">

      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Single Radio Button
      </h2>

      <div className="space-y-3">

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="single"
            value="yes"
            checked={selected === "yes"}
            onChange={(e) => setSelected(e.target.value)}
            className="w-5 h-5 accent-blue-600"
          />
          <span className="text-gray-700">Yes</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="single"
            value="no"
            checked={selected === "no"}
            onChange={(e) => setSelected(e.target.value)}
            className="w-5 h-5 accent-blue-600"
          />
          <span className="text-gray-700">No</span>
        </label>

      </div>

      <p className="mt-3 text-sm font-medium text-gray-600">
        Selected: {selected || "None"}
      </p>

    </div>
  )
}
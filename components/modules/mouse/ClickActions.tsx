"use client"

import { useState } from "react"

export default function ClickActions() {

  const [message, setMessage] = useState("")
  const [type, setType] = useState("")

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">

      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🖱️ Click Actions
      </h2>

      <div className="flex gap-3 flex-wrap">

        <button
          onClick={() => {
            setMessage("Single Click Done")
            setType("click")
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm"
        >
          Click
        </button>

        <button
          onContextMenu={(e) => {
            e.preventDefault()
            setMessage("Right Click Done")
            setType("right")
          }}
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg shadow-sm"
        >
          Right Click
        </button>

        <button
          onDoubleClick={() => {
            setMessage("Double Click Done")
            setType("double")
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm"
        >
          Double Click
        </button>

      </div>

      {/* Message */}
      <p
        className={`mt-3 text-sm font-medium ${
          type === "click"
            ? "text-blue-600"
            : type === "right"
            ? "text-yellow-600"
            : type === "double"
            ? "text-green-600"
            : "text-gray-500"
        }`}
      >
        {message}
      </p>

    </div>
  )
}
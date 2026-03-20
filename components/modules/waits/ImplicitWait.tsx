"use client"

import { useEffect, useState } from "react"

export default function ImplicitWait() {
  const [showFields, setShowFields] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowFields(true)
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-blue-600">
        Implicit Wait Scenario
      </h2>

      {!showFields ? (
        <p className="text-gray-500">Loading fields...</p>
      ) : (
        <div className="space-y-3">
          <input
            id="nameField"
            placeholder="Enter Name"
            className="w-full rounded border px-3 py-2"
          />

          <input
            id="emailField"
            placeholder="Enter Email"
            className="w-full rounded border px-3 py-2"
          />
        </div>
      )}
    </div>
  )
}

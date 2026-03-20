"use client"

import { useEffect, useRef, useState } from "react"

export default function DynamicDropdown() {
  const [options, setOptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const loadOptions = () => {
    setLoading(true)
    setOptions([])

    timeoutRef.current = window.setTimeout(() => {
      setOptions([
        "Selenium WebDriver",
        "Playwright Automation",
        "Cypress Testing",
        "API Testing (Postman)",
        "Performance Testing (JMeter)",
        "Security Testing (OWASP ZAP)",
        "CI/CD (Jenkins)",
        "Docker & Kubernetes",
        "AWS Cloud Testing"
      ])
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition hover:shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Dynamic Dropdown (Wait Scenario)
      </h2>

      <button
        onClick={loadOptions}
        disabled={loading}
        className="mb-3 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Loading..." : "Load Options"}
      </button>

      {loading && <p className="animate-pulse text-gray-500">Loading options...</p>}

      {!loading && options.length > 0 && (
        <select className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">-- Select Topic --</option>

          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

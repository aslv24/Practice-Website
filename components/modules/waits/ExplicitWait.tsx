"use client"

import { useEffect, useRef, useState } from "react"

export default function ExplicitWait() {
  const [showButton, setShowButton] = useState(false)
  const [waitingForResult, setWaitingForResult] = useState(false)
  const [message, setMessage] = useState("")
  const resultTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowButton(true)
    }, 4000)

    return () => {
      window.clearTimeout(timer)

      if (resultTimerRef.current !== null) {
        window.clearTimeout(resultTimerRef.current)
      }
    }
  }, [])

  const handleClick = () => {
    setMessage("")
    setWaitingForResult(true)

    resultTimerRef.current = window.setTimeout(() => {
      setMessage("This text appeared after waiting. Use explicit wait in automation.")
      setWaitingForResult(false)
    }, 3000)
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-green-600">
        Explicit Wait Scenario
      </h2>

      {!showButton ? (
        <p className="text-gray-500">Waiting for button...</p>
      ) : (
        <button
          id="delayedButton"
          onClick={handleClick}
          disabled={waitingForResult}
          className="rounded bg-green-500 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {waitingForResult ? "Waiting..." : "Click Me"}
        </button>
      )}

      {waitingForResult && (
        <p id="explicitWaitLoader" className="mt-3 text-sm text-gray-500">
          Result will appear in a few seconds...
        </p>
      )}

      {message && (
        <p id="explicitWaitMessage" className="mt-3 font-medium text-green-600">
          {message}
        </p>
      )}
    </div>
  )
}

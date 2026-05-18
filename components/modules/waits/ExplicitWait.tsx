"use client"

import { useEffect, useState } from "react"

export default function ExplicitWait() {
  // Alert
  const [alertCounter, setAlertCounter] = useState<number | null>(null)

  // Text
  const [text, setText] = useState("site")
  const [textCounter, setTextCounter] = useState<number | null>(null)

  // Display Button
  const [showButton, setShowButton] = useState(false)
  const [displayCounter, setDisplayCounter] = useState<number | null>(null)

  // Enable Button
  const [enableButton, setEnableButton] = useState(false)
  const [enableCounter, setEnableCounter] = useState<number | null>(null)

  // Checkbox
  const [checked, setChecked] = useState(false)
  const [checkboxCounter, setCheckboxCounter] = useState<number | null>(null)

  // Common Countdown Logic
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    const runCounter = (
      counter: number | null,
      setCounter: React.Dispatch<React.SetStateAction<number | null>>,
      callback?: () => void
    ) => {
      if (counter === null) return

      if (counter <= 0) {
        callback?.()
        return
      }

      const timer = setTimeout(() => {
        setCounter((prev) => (prev !== null ? prev - 1 : null))
      }, 1000)

      timers.push(timer)
    }

    // Alert
    runCounter(alertCounter, setAlertCounter, () => {
      alert("Alert Opened After 5 Seconds")
      setAlertCounter(null)
    })

    // Text
    runCounter(textCounter, setTextCounter, () => {
      setText("Selenium Webdriver")
      setTextCounter(null)
    })

    // Display Button
    runCounter(displayCounter, setDisplayCounter, () => {
      setShowButton(true)
      setDisplayCounter(null)
    })

    // Enable Button
    runCounter(enableCounter, setEnableCounter, () => {
      setEnableButton(true)
      setEnableCounter(null)
    })

    // Checkbox
    runCounter(checkboxCounter, setCheckboxCounter, () => {
      setChecked(true)
      setCheckboxCounter(null)
    })

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [
    alertCounter,
    textCounter,
    displayCounter,
    enableCounter,
    checkboxCounter,
  ])

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-md">
      <h2 className="mb-6 text-lg font-semibold text-blue-600">
        Explicit Wait Scenario
      </h2>

      {/* Alert Section */}
      <div className="mb-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <button
            onClick={() => setAlertCounter(5)}
            className="rounded bg-green-500 px-5 py-2 text-white hover:bg-green-600"
          >
            Open Alert after 5 seconds
          </button>

          <p className="font-medium text-gray-700">
            Alert opens in :
            <span className="ml-2 font-bold text-green-600">
              {alertCounter ?? 0}
            </span>{" "}
            seconds
          </p>
        </div>
      </div>

      {/* Text Change */}
      <div className="mb-8">
        <p className="mb-3 text-gray-700">
          Selenium Webdriver will replace "site" in{" "}
          <span className="font-bold text-blue-600">
            {textCounter ?? 10}
          </span>{" "}
          seconds
        </p>

        <button
          onClick={() => setTextCounter(10)}
          className="rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
        >
          Change Text
        </button>

        <h2 className="mt-4 text-3xl font-bold">{text}</h2>
      </div>

      {/* Display Button */}
      <div className="mb-8">
        <p className="mb-3 text-gray-700">
          Button will display in{" "}
          <span className="font-bold text-blue-600">
            {displayCounter ?? 10}
          </span>{" "}
          seconds
        </p>

        <button
          onClick={() => setDisplayCounter(10)}
          className="rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
        >
          Display Button
        </button>

        {showButton && (
          <button className="ml-4 mt-3 rounded bg-green-500 px-5 py-2 text-white lg:mt-0">
            New Button
          </button>
        )}
      </div>

      {/* Enable Button */}
      <div className="mb-8">
        <p className="mb-3 text-gray-700">
          Button will enable in{" "}
          <span className="font-bold text-blue-600">
            {enableCounter ?? 10}
          </span>{" "}
          seconds
        </p>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <button
            onClick={() => setEnableCounter(10)}
            className="rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
          >
            Enable Button
          </button>

          <button
            disabled={!enableButton}
            className={`rounded px-5 py-2 text-white ${
              enableButton
                ? "bg-green-500"
                : "cursor-not-allowed bg-gray-400"
            }`}
          >
            Button
          </button>
        </div>
      </div>

      {/* Checkbox */}
      <div>
        <p className="mb-3 text-gray-700">
          Checkbox will check in{" "}
          <span className="font-bold text-blue-600">
            {checkboxCounter ?? 10}
          </span>{" "}
          seconds
        </p>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <button
            onClick={() => setCheckboxCounter(10)}
            className="rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
          >
            Check Checkbox
          </button>

          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" checked={checked} readOnly />
            Checkbox
          </label>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"

type StatusType =
  | "idle"
  | "waiting"
  | "completed"

interface ScenarioState {
  counter: number | null
  status: StatusType
}

export default function ExplicitWait() {
  // Alert
  const [alertScenario, setAlertScenario] =
    useState<ScenarioState>({
      counter: null,
      status: "idle",
    })

  // Text
  const [textScenario, setTextScenario] =
    useState<ScenarioState>({
      counter: null,
      status: "idle",
    })

  const [text, setText] = useState("site")

  // Display Button
  const [displayScenario, setDisplayScenario] =
    useState<ScenarioState>({
      counter: null,
      status: "idle",
    })

  const [showButton, setShowButton] =
    useState(false)

  // Enable Button
  const [enableScenario, setEnableScenario] =
    useState<ScenarioState>({
      counter: null,
      status: "idle",
    })

  const [enableButton, setEnableButton] =
    useState(false)

  // Checkbox
  const [checkboxScenario, setCheckboxScenario] =
    useState<ScenarioState>({
      counter: null,
      status: "idle",
    })

  const [checked, setChecked] =
    useState(false)

  // Generic Countdown Effect
  const useCountdown = (
    scenario: ScenarioState,
    setScenario: React.Dispatch<
      React.SetStateAction<ScenarioState>
    >,
    callback?: () => void
  ) => {
    useEffect(() => {
      if (
        scenario.status !== "waiting" ||
        scenario.counter === null
      ) {
        return
      }

      if (scenario.counter <= 0) {
        callback?.()

        setScenario({
          counter: 0,
          status: "completed",
        })

        return
      }

      const timer = setTimeout(() => {
        setScenario((prev) => ({
          ...prev,
          counter:
            prev.counter !== null
              ? prev.counter - 1
              : null,
        }))
      }, 1000)

      return () => clearTimeout(timer)
    }, [scenario.counter, scenario.status])
  }

  // Alert
  useCountdown(
    alertScenario,
    setAlertScenario,
    () => {
      alert("Alert Opened Successfully")
    }
  )

  // Text
  useCountdown(
    textScenario,
    setTextScenario,
    () => {
      setText("Selenium WebDriver")
    }
  )

  // Display Button
  useCountdown(
    displayScenario,
    setDisplayScenario,
    () => {
      setShowButton(true)
    }
  )

  // Enable Button
  useCountdown(
    enableScenario,
    setEnableScenario,
    () => {
      setEnableButton(true)
    }
  )

  // Checkbox
  useCountdown(
    checkboxScenario,
    setCheckboxScenario,
    () => {
      setChecked(true)
    }
  )

  const startScenario = (
    seconds: number,
    setter: React.Dispatch<
      React.SetStateAction<ScenarioState>
    >
  ) => {
    setter({
      counter: seconds,
      status: "waiting",
    })
  }

  const getStatusColor = (
    status: StatusType
  ) => {
    switch (status) {
      case "waiting":
        return "text-yellow-600"

      case "completed":
        return "text-green-600"

      default:
        return "text-gray-500"
    }
  }

  const renderRemainingTime = (
    scenario: ScenarioState
  ) => {
    if (scenario.status === "waiting") {
      return (
        <p className="text-sm font-medium text-blue-600">
          Remaining Time:{" "}
          {scenario.counter ?? 0}s
        </p>
      )
    }

    if (scenario.status === "completed") {
      return (
        <p className="text-sm font-medium text-green-600">
          Remaining Time: 0s
        </p>
      )
    }

    return (
      <p className="text-sm font-medium text-gray-500">
        Remaining Time: --
      </p>
    )
  }

  return (
    <section
      id="explicit-wait-card"
      data-testid="explicit-wait-card"
      data-component="explicit-wait"
      aria-label="Explicit wait scenarios"
      className="rounded-2xl border bg-white p-6 shadow-sm"
    >
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-blue-600">
          Explicit Wait Scenarios
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Practice Selenium explicit waits
          using delayed rendering, alerts,
          state changes, and dynamic updates.
        </p>
      </header>

      {/* ALERT */}
      <div className="mb-8 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">
          Delayed Alert
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Alert appears after 5 seconds.
        </p>

        <div className="mt-4 flex flex-col gap-3">
          <button
            id="open-alert-delay-button"
            data-testid="open-alert-delay-button"
            onClick={() =>
              startScenario(
                5,
                setAlertScenario
              )
            }
            className="w-fit rounded-lg bg-green-500 px-5 py-2 text-white hover:bg-green-600"
          >
            Open Alert
          </button>

          <p
            className={`text-sm font-medium ${getStatusColor(
              alertScenario.status
            )}`}
          >
            Status: {alertScenario.status}
          </p>

          {renderRemainingTime(
            alertScenario
          )}
        </div>
      </div>

      {/* TEXT */}
      <div className="mb-8 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">
          Dynamic Text Change
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Text changes after delay.
        </p>

        <button
          id="change-text-button"
          data-testid="change-text-button"
          onClick={() =>
            startScenario(
              10,
              setTextScenario
            )
          }
          className="mt-4 rounded-lg bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
        >
          Change Text
        </button>

        <div className="mt-4 space-y-2">
          <p
            id="delayed-text-value"
            data-testid="delayed-text-value"
            className="text-3xl font-bold text-blue-600"
          >
            {text}
          </p>

          <p
            className={`text-sm font-medium ${getStatusColor(
              textScenario.status
            )}`}
          >
            Status: {textScenario.status}
          </p>

          {renderRemainingTime(
            textScenario
          )}
        </div>
      </div>

      {/* DISPLAY */}
      <div className="mb-8 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">
          Delayed Display
        </h2>

        <div className="mt-4 flex flex-col gap-3">
          <button
            id="display-button-trigger-button"
            data-testid="display-button-trigger-button"
            onClick={() =>
              startScenario(
                10,
                setDisplayScenario
              )
            }
            className="w-fit rounded-lg bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
          >
            Display Button
          </button>

          <p
            className={`text-sm font-medium ${getStatusColor(
              displayScenario.status
            )}`}
          >
            Status: {displayScenario.status}
          </p>

          {renderRemainingTime(
            displayScenario
          )}

          {showButton && (
            <button
              id="newly-displayed-button"
              data-testid="newly-displayed-button"
              className="w-fit rounded-lg bg-green-500 px-5 py-2 text-white"
            >
              New Button
            </button>
          )}
        </div>
      </div>

      {/* ENABLE */}
      <div className="mb-8 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">
          Delayed Enable
        </h2>

        <div className="mt-4 flex flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            <button
              id="enable-button-trigger-button"
              data-testid="enable-button-trigger-button"
              onClick={() =>
                startScenario(
                  10,
                  setEnableScenario
                )
              }
              className="rounded-lg bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
            >
              Enable Button
            </button>

            <button
              id="delayed-enable-button"
              data-testid="delayed-enable-button"
              disabled={!enableButton}
              className={`rounded-lg px-5 py-2 text-white ${
                enableButton
                  ? "bg-green-500"
                  : "cursor-not-allowed bg-gray-400"
              }`}
            >
              Delayed Button
            </button>
          </div>

          <p
            className={`text-sm font-medium ${getStatusColor(
              enableScenario.status
            )}`}
          >
            Status: {enableScenario.status}
          </p>

          {renderRemainingTime(
            enableScenario
          )}
        </div>
      </div>

      {/* CHECKBOX */}
      <div className="rounded-xl border p-5">
        <h2 className="text-lg font-semibold">
          Delayed Checkbox
        </h2>

        <div className="mt-4 flex flex-col gap-3">
          <button
            id="check-checkbox-delay-button"
            data-testid="check-checkbox-delay-button"
            onClick={() =>
              startScenario(
                10,
                setCheckboxScenario
              )
            }
            className="w-fit rounded-lg bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
          >
            Check Checkbox
          </button>

          <label className="flex items-center gap-2">
            <input
              id="delayed-checkbox"
              data-testid="delayed-checkbox"
              type="checkbox"
              checked={checked}
              readOnly
            />

            Checkbox Status:

            <span
              className={
                checked
                  ? "text-green-600"
                  : "text-gray-500"
              }
            >
              {checked
                ? "Checked"
                : "Unchecked"}
            </span>
          </label>

          <p
            className={`text-sm font-medium ${getStatusColor(
              checkboxScenario.status
            )}`}
          >
            Status:{" "}
            {checkboxScenario.status}
          </p>

          {renderRemainingTime(
            checkboxScenario
          )}
        </div>
      </div>
    </section>
  )
}
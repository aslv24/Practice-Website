"use client"

import {
  useCallback,
  useEffect,
  useState,
} from "react"

type StatusType =
  | "idle"
  | "waiting"
  | "completed"

interface ScenarioState {
  counter: number | null
  status: StatusType
}

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
  }, [
    callback,
    scenario.counter,
    scenario.status,
    setScenario,
  ])
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

  const [text, setText] =
    useState("site")

  // Display Button
  const [
    displayScenario,
    setDisplayScenario,
  ] = useState<ScenarioState>({
    counter: null,
    status: "idle",
  })

  const [showButton, setShowButton] =
    useState(false)

  // Enable Button
  const [
    enableScenario,
    setEnableScenario,
  ] = useState<ScenarioState>({
    counter: null,
    status: "idle",
  })

  const [enableButton, setEnableButton] =
    useState(false)

  // Checkbox
  const [
    checkboxScenario,
    setCheckboxScenario,
  ] = useState<ScenarioState>({
    counter: null,
    status: "idle",
  })

  const [checked, setChecked] =
    useState(false)

  const openDelayedAlert = useCallback(
    () => {
      alert("Alert Opened Successfully")
    },
    []
  )

  const revealDelayedText = useCallback(
    () => {
      setText("Selenium WebDriver")
    },
    []
  )

  const revealDisplayButton =
    useCallback(() => {
      setShowButton(true)
    }, [])

  const enableDelayedButton =
    useCallback(() => {
      setEnableButton(true)
    }, [])

  const checkDelayedCheckbox =
    useCallback(() => {
      setChecked(true)
    }, [])

  useCountdown(
    alertScenario,
    setAlertScenario,
    openDelayedAlert
  )

  useCountdown(
    textScenario,
    setTextScenario,
    revealDelayedText
  )

  useCountdown(
    displayScenario,
    setDisplayScenario,
    revealDisplayButton
  )

  useCountdown(
    enableScenario,
    setEnableScenario,
    enableDelayedButton
  )

  useCountdown(
    checkboxScenario,
    setCheckboxScenario,
    checkDelayedCheckbox
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

  const getStatusClass = (
    status: StatusType
  ) => {
    switch (status) {
      case "waiting":
        return "explicit-wait__status--waiting"

      case "completed":
        return "explicit-wait__status--completed"

      default:
        return "explicit-wait__status--idle"
    }
  }

  const renderRemainingTime = (
    scenario: ScenarioState
  ) => {
    if (scenario.status === "waiting") {
      return (
        <p className="explicit-wait__remaining explicit-wait__remaining--waiting">
          Remaining Time:{" "}
          {scenario.counter ?? 0}s
        </p>
      )
    }

    if (scenario.status === "completed") {
      return (
        <p className="explicit-wait__remaining explicit-wait__remaining--completed">
          Remaining Time: 0s
        </p>
      )
    }

    return (
      <p className="explicit-wait__remaining explicit-wait__remaining--idle">
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
      className="explicit-wait"
    >
      {/* Header */}
      <header className="explicit-wait__header">
        <h1 className="explicit-wait__title">
          Explicit Wait Scenarios
        </h1>

        <p className="explicit-wait__description">
          Practice Selenium explicit waits
          using delayed rendering, alerts,
          state changes, and dynamic updates.
        </p>
      </header>

      {/* ALERT */}
      <div className="explicit-wait__scenario">
        <h2 className="explicit-wait__scenario-title">
          Delayed Alert
        </h2>

        <p className="explicit-wait__scenario-description">
          Alert appears after 5 seconds.
        </p>

        <div className="explicit-wait__scenario-content">
          <button
            id="open-alert-delay-button"
            data-testid="open-alert-delay-button"
            onClick={() =>
              startScenario(
                5,
                setAlertScenario
              )
            }
            className="explicit-wait__button explicit-wait__button--success"
          >
            Open Alert
          </button>

          <p
            className={`explicit-wait__status ${getStatusClass(
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
      <div className="explicit-wait__scenario">
        <h2 className="explicit-wait__scenario-title">
          Dynamic Text Change
        </h2>

        <p className="explicit-wait__scenario-description">
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
          className="explicit-wait__button explicit-wait__button--primary"
        >
          Change Text
        </button>

        <div className="explicit-wait__text-content">
          <p
            id="delayed-text-value"
            data-testid="delayed-text-value"
            className="explicit-wait__dynamic-text"
          >
            {text}
          </p>

          <p
            className={`explicit-wait__status ${getStatusClass(
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
      <div className="explicit-wait__scenario">
        <h2 className="explicit-wait__scenario-title">
          Delayed Display
        </h2>

        <div className="explicit-wait__scenario-content">
          <button
            id="display-button-trigger-button"
            data-testid="display-button-trigger-button"
            onClick={() =>
              startScenario(
                10,
                setDisplayScenario
              )
            }
            className="explicit-wait__button explicit-wait__button--primary"
          >
            Display Button
          </button>

          <p
            className={`explicit-wait__status ${getStatusClass(
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
              className="explicit-wait__button explicit-wait__button--success"
            >
              New Button
            </button>
          )}
        </div>
      </div>

      {/* ENABLE */}
      <div className="explicit-wait__scenario">
        <h2 className="explicit-wait__scenario-title">
          Delayed Enable
        </h2>

        <div className="explicit-wait__scenario-content">
          <div className="explicit-wait__button-group">
            <button
              id="enable-button-trigger-button"
              data-testid="enable-button-trigger-button"
              onClick={() =>
                startScenario(
                  10,
                  setEnableScenario
                )
              }
              className="explicit-wait__button explicit-wait__button--primary"
            >
              Enable Button
            </button>

            <button
              id="delayed-enable-button"
              data-testid="delayed-enable-button"
              disabled={!enableButton}
              className={`explicit-wait__button ${
                enableButton
                  ? "explicit-wait__button--success"
                  : "explicit-wait__button--disabled"
              }`}
            >
              Delayed Button
            </button>
          </div>

          <p
            className={`explicit-wait__status ${getStatusClass(
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
      <div className="explicit-wait__scenario explicit-wait__scenario--last">
        <h2 className="explicit-wait__scenario-title">
          Delayed Checkbox
        </h2>

        <div className="explicit-wait__scenario-content">
          <button
            id="check-checkbox-delay-button"
            data-testid="check-checkbox-delay-button"
            onClick={() =>
              startScenario(
                10,
                setCheckboxScenario
              )
            }
            className="explicit-wait__button explicit-wait__button--primary"
          >
            Check Checkbox
          </button>

          <label className="explicit-wait__checkbox-label">
            <input
              id="delayed-checkbox"
              data-testid="delayed-checkbox"
              type="checkbox"
              checked={checked}
              readOnly
            />

            <span>
              Checkbox Status:
            </span>

            <span
              className={
                checked
                  ? "explicit-wait__checkbox-status explicit-wait__checkbox-status--checked"
                  : "explicit-wait__checkbox-status explicit-wait__checkbox-status--unchecked"
              }
            >
              {checked
                ? "Checked"
                : "Unchecked"}
            </span>
          </label>

          <p
            className={`explicit-wait__status ${getStatusClass(
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
"use client"

import { useState } from "react"

type ActionType = "click" | "right" | "double" | ""

type ClickAction = {
  id: string
  name: string
  label: string
  type: Exclude<ActionType, "">
  message: string
  buttonClassName: string
  action: "click" | "right-click" | "double-click"
}

const clickActions: ClickAction[] = [
  {
    id: "single-click-button",
    name: "singleClick",
    label: "Click",
    type: "click",
    message: "Single Click Done",
    buttonClassName: "",
    action: "click",
  },
  {
    id: "right-click-button",
    name: "rightClick",
    label: "Right Click",
    type: "right",
    message: "Right Click Done",
    buttonClassName: "",
    action: "right-click",
  },
  {
    id: "double-click-button",
    name: "doubleClick",
    label: "Double Click",
    type: "double",
    message: "Double Click Done",
    buttonClassName: "",
    action: "double-click",
  },
]

const messageColorMap: Record<
  ActionType,
  string
> = {
  click: "click-actions__result--click",
  right: "click-actions__result--right",
  double: "click-actions__result--double",
  "": "click-actions__result--default",
}

export default function ClickActions() {
  const [message, setMessage] = useState("")
  const [type, setType] =
    useState<ActionType>("")

  const handleAction = (
    actionType: ActionType,
    message: string
  ) => {
    setType(actionType)
    setMessage(message)
  }

  return (
    <section
      id="click-actions-card"
      data-testid="click-actions-card"
      aria-label="Click actions card"
      className="click-actions"
    >
      <header className="click-actions__header">
        <h2
          id="click-actions-title"
          className="click-actions__title"
        >
          🖱️ Click Actions
        </h2>

        <p
          id="click-actions-description"
          className="click-actions__description"
        >
          Practice Selenium mouse interactions.
        </p>
      </header>

      <div
        className="click-actions__buttons"
        role="group"
        aria-labelledby="click-actions-title"
      >
        {clickActions.map((button) => {
          const commonProps = {
            id: button.id,
            name: button.name,
            "data-testid": button.id,
            "aria-label": button.label,
            type: "button" as const,
            className: `click-actions__button click-actions__button--${button.type}`,
          }

          if (
            button.action ===
            "right-click"
          ) {
            return (
              <button
                key={button.id}
                {...commonProps}
                onContextMenu={(event) => {
                  event.preventDefault()

                  handleAction(
                    button.type,
                    button.message
                  )
                }}
              >
                {button.label}
              </button>
            )
          }

          if (
            button.action ===
            "double-click"
          ) {
            return (
              <button
                key={button.id}
                {...commonProps}
                onDoubleClick={() =>
                  handleAction(
                    button.type,
                    button.message
                  )
                }
              >
                {button.label}
              </button>
            )
          }

          return (
            <button
              key={button.id}
              {...commonProps}
              onClick={() =>
                handleAction(
                  button.type,
                  button.message
                )
              }
            >
              {button.label}
            </button>
          )
        })}
      </div>

      <div
        className="click-actions__result-container"
        aria-live="polite"
      >
        <p
          id="click-actions-result"
          data-testid="click-actions-result"
          className={`click-actions__result ${messageColorMap[type]}`}
        >
          {message ||
            "No action performed yet"}
        </p>
      </div>
    </section>
  )
}
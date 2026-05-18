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
    buttonClassName:
      "bg-blue-500 hover:bg-blue-600 text-white",
    action: "click",
  },
  {
    id: "right-click-button",
    name: "rightClick",
    label: "Right Click",
    type: "right",
    message: "Right Click Done",
    buttonClassName:
      "bg-yellow-500 hover:bg-yellow-600 text-black",
    action: "right-click",
  },
  {
    id: "double-click-button",
    name: "doubleClick",
    label: "Double Click",
    type: "double",
    message: "Double Click Done",
    buttonClassName:
      "bg-green-500 hover:bg-green-600 text-white",
    action: "double-click",
  },
]

const messageColorMap: Record<ActionType, string> = {
  click: "text-blue-600",
  right: "text-yellow-600",
  double: "text-green-600",
  "": "text-gray-500",
}

export default function ClickActions() {
  const [message, setMessage] = useState("")
  const [type, setType] = useState<ActionType>("")

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
      className="
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:shadow-md
      "
    >
      <header className="mb-4">
        <h2
          id="click-actions-title"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          🖱️ Click Actions
        </h2>

        <p
          id="click-actions-description"
          className="mt-1 text-sm text-gray-500"
        >
          Practice Selenium mouse interactions.
        </p>
      </header>

      <div
        className="flex flex-wrap gap-3"
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
            className: `
              rounded-lg
              px-4
              py-2
              shadow-sm
              transition-colors
              duration-200
              cursor-pointer
              select-none
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              ${button.buttonClassName}
            `,
          }

          if (button.action === "right-click") {
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

          if (button.action === "double-click") {
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
        className="mt-4"
        aria-live="polite"
      >
        <p
          id="click-actions-result"
          data-testid="click-actions-result"
          className={`
            text-sm
            font-medium
            ${messageColorMap[type]}
          `}
        >
          {message || "No action performed yet"}
        </p>
      </div>
    </section>
  )
}
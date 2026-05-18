"use client"

import { useEffect, useState } from "react"

type HoverState =
  | "idle"
  | "hovering"
  | "visible"

export default function MouseHover() {
  const [hoverState, setHoverState] =
    useState<HoverState>("idle")

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (hoverState === "hovering") {
      timer = setTimeout(() => {
        setHoverState("visible")
      }, 500)
    }

    return () => clearTimeout(timer)
  }, [hoverState])

  const isVisible =
    hoverState === "visible"

  return (
    <section
      id="mouse-hover-card"
      data-testid="mouse-hover-card"
      aria-label="Mouse hover card"
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
      {/* Header */}
      <header className="mb-4">
        <h2
          id="mouse-hover-title"
          className="text-lg font-semibold"
        >
          Mouse Hover
        </h2>

        <p
          id="mouse-hover-description"
          className="mt-1 text-sm text-gray-500"
        >
          Practice Selenium hover actions and
          tooltip handling.
        </p>
      </header>

      {/* Hover Container */}
      <div
        id="hover-container"
        data-testid="hover-container"
        className="relative"
        onMouseEnter={() =>
          setHoverState("hovering")
        }
        onMouseLeave={() => {
          setTimeout(() => {
            setHoverState("idle")
          }, 200)
        }}
      >
        {/* Hover Area */}
        <div
          id="hover-area-card"
          data-testid="hover-area-card"
          aria-label="Hover interaction area"
          role="button"
          tabIndex={0}
          onFocus={() =>
            setHoverState("hovering")
          }
          onBlur={() =>
            setHoverState("idle")
          }
          className={`
            cursor-pointer
            rounded-xl
            border
            p-6
            text-center
            transition-all
            duration-300
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
            focus:ring-offset-2
            ${
              isVisible
                ? "border-blue-500 bg-blue-100 scale-[1.02]"
                : "border-blue-200 bg-gradient-to-r from-blue-100 to-blue-200"
            }
          `}
        >
          <p className="font-medium text-gray-800">
            Hover Over Me
          </p>
        </div>

        {/* Tooltip */}
        {isVisible && (
          <div
            id="hover-tooltip"
            data-testid="hover-tooltip"
            role="tooltip"
            className="
              absolute
              left-1/2
              top-full
              z-20
              mt-3
              -translate-x-1/2
              rounded-lg
              bg-gray-900
              px-4
              py-2
              text-sm
              text-white
              shadow-lg
              whitespace-nowrap
            "
          >
            Hover detected successfully.
          </div>
        )}

        {/* Action Buttons */}
        {isVisible && (
          <div
            id="hover-action-group"
            data-testid="hover-action-group"
            className="mt-6 flex gap-3"
          >
            <button
              id="hover-edit-button"
              data-testid="hover-edit-button"
              type="button"
              aria-label="Edit action"
              className="
                rounded-lg
                bg-blue-500
                px-4
                py-2
                text-sm
                text-white
                transition-colors
                duration-200
                hover:bg-blue-600
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400
                focus:ring-offset-2
              "
            >
              Edit
            </button>

            <button
              id="hover-delete-button"
              data-testid="hover-delete-button"
              type="button"
              aria-label="Delete action"
              className="
                rounded-lg
                bg-red-500
                px-4
                py-2
                text-sm
                text-white
                transition-colors
                duration-200
                hover:bg-red-600
                focus:outline-none
                focus:ring-2
                focus:ring-red-400
                focus:ring-offset-2
              "
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Status Message */}
      <div
        className="mt-6"
        aria-live="polite"
      >
        <p
          id="hover-status-message"
          data-testid="hover-status-message"
          className={`
            text-sm
            font-medium
            ${
              isVisible
                ? "text-blue-600"
                : "text-gray-500"
            }
          `}
        >
          {isVisible
            ? "Tooltip is visible."
            : "Waiting for hover action."}
        </p>
      </div>
    </section>
  )
}
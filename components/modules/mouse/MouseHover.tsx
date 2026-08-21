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
      className="mouse-hover"
    >
      {/* Header */}
      <header className="mouse-hover__header">
        <h2
          id="mouse-hover-title"
          className="mouse-hover__title"
        >
          Mouse Hover
        </h2>

        <p
          id="mouse-hover-description"
          className="mouse-hover__description"
        >
          Practice Selenium hover actions and
          tooltip handling.
        </p>
      </header>

      {/* Hover Container */}
      <div
        id="hover-container"
        data-testid="hover-container"
        className="mouse-hover__container"
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
          className={`mouse-hover__area${
            isVisible
              ? " mouse-hover__area--visible"
              : " mouse-hover__area--idle"
          }`}
        >
          <p className="mouse-hover__area-text">
            Hover Over Me
          </p>
        </div>

        {/* Tooltip */}
        {isVisible && (
          <div
            id="hover-tooltip"
            data-testid="hover-tooltip"
            role="tooltip"
            className="mouse-hover__tooltip"
          >
            Hover detected successfully.
          </div>
        )}

        {/* Action Buttons */}
        {isVisible && (
          <div
            id="hover-action-group"
            data-testid="hover-action-group"
            className="mouse-hover__actions"
          >
            <button
              id="hover-edit-button"
              data-testid="hover-edit-button"
              type="button"
              aria-label="Edit action"
              className="mouse-hover__button mouse-hover__button--edit"
            >
              Edit
            </button>

            <button
              id="hover-delete-button"
              data-testid="hover-delete-button"
              type="button"
              aria-label="Delete action"
              className="mouse-hover__button mouse-hover__button--delete"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Status Message */}
      <div
        className="mouse-hover__status"
        aria-live="polite"
      >
        <p
          id="hover-status-message"
          data-testid="hover-status-message"
          className={`mouse-hover__status-message${
            isVisible
              ? " mouse-hover__status-message--visible"
              : " mouse-hover__status-message--idle"
          }`}
        >
          {isVisible
            ? "Tooltip is visible."
            : "Waiting for hover action."}
        </p>
      </div>
    </section>
  )
}
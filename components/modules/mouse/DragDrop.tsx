"use client"

import { useState } from "react"

type DragState =
  | "idle"
  | "dragging"
  | "hover"
  | "dropped"

const stateStyles: Record<DragState, string> = {
  idle:
    "border-dashed border-gray-400 bg-gray-100",
  dragging:
    "border-blue-500 bg-blue-100",
  hover:
    "border-yellow-500 bg-yellow-100",
  dropped:
    "border-green-500 bg-green-100",
}

const stateMessages: Record<DragState, string> = {
  idle: "Drop Here",
  dragging: "Dragging...",
  hover: "Release to Drop",
  dropped: "Dropped Successfully",
}

export default function DragDrop() {
  const [dragState, setDragState] =
    useState<DragState>("idle")

  const isDropped = dragState === "dropped"

  const handleReset = () => {
    setDragState("idle")
  }

  return (
    <section
      id="drag-drop-card"
      data-testid="drag-drop-card"
      aria-label="Drag and drop card"
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
          id="drag-drop-title"
          className="text-lg font-semibold"
        >
          Drag and Drop
        </h2>

        <p
          id="drag-drop-description"
          className="mt-1 text-sm text-gray-500"
        >
          Practice Selenium drag-and-drop actions.
        </p>
      </header>

      <div
        className="flex flex-wrap items-center gap-6"
        role="group"
        aria-labelledby="drag-drop-title"
      >
        {/* Drag Source */}
        <div
          id="drag-source-card"
          data-testid="drag-source-card"
          aria-label="Drag source"
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "text/plain",
              "drag-item"
            )

            setDragState("dragging")
          }}
          onDragEnd={() => {
            if (!isDropped) {
              setDragState("idle")
            }
          }}
          className="
            cursor-grab
            select-none
            rounded-lg
            bg-blue-500
            px-6
            py-3
            text-white
            shadow-sm
            transition-transform
            duration-200
            active:cursor-grabbing
            active:scale-95
          "
        >
          Drag Me
        </div>

        {/* Drop Zone */}
        <div
          id="drop-target-card"
          data-testid="drop-target-card"
          aria-label="Drop target"
          onDragOver={(event) => {
            event.preventDefault()

            if (dragState !== "hover") {
              setDragState("hover")
            }
          }}
          onDragLeave={() => {
            if (!isDropped) {
              setDragState("dragging")
            }
          }}
          onDrop={(event) => {
            event.preventDefault()

            const draggedItem =
              event.dataTransfer.getData(
                "text/plain"
              )

            if (draggedItem === "drag-item") {
              setDragState("dropped")
            }
          }}
          className={`
            flex
            h-32
            w-48
            items-center
            justify-center
            rounded-lg
            border-2
            text-center
            text-sm
            font-medium
            transition-all
            duration-200
            ${stateStyles[dragState]}
          `}
        >
          {stateMessages[dragState]}
        </div>
      </div>

      {/* Status */}
      <div
        className="mt-4"
        aria-live="polite"
      >
        <p
          id="drag-drop-result"
          data-testid="drag-drop-result"
          className={`
            text-sm
            font-medium
            ${
              isDropped
                ? "text-green-600"
                : "text-gray-600"
            }
          `}
        >
          {isDropped
            ? "Item dropped successfully."
            : "Waiting for drag action."}
        </p>
      </div>

      {/* Reset */}
      <div className="mt-4">
        <button
          id="reset-drag-drop-button"
          data-testid="reset-drag-drop-button"
          aria-label="Reset drag and drop"
          type="button"
          onClick={handleReset}
          className="
            rounded-lg
            bg-gray-200
            px-4
            py-2
            text-sm
            font-medium
            transition-colors
            duration-200
            hover:bg-gray-300
            focus:outline-none
            focus:ring-2
            focus:ring-gray-400
            focus:ring-offset-2
          "
        >
          Reset
        </button>
      </div>
    </section>
  )
}
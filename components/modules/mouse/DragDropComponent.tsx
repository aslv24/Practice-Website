"use client"

import { useState } from "react"

type Variant = "simple" | "advanced"
type DragState =
  | "idle"
  | "dragging"
  | "hover"
  | "dropped"

interface DraggableItem {
  id: string
  label: string
  color: "blue" | "purple"
}

interface DragDropComponentProps {
  variant?: Variant
}

const stateStyles: Record<
  DragState,
  string
> = {
  idle: "drag-drop__target--idle",
  dragging: "drag-drop__target--dragging",
  hover: "drag-drop__target--hover",
  dropped: "drag-drop__target--dropped",
}

const stateMessages: Record<
  DragState,
  string
> = {
  idle: "Drop Here",
  dragging: "Dragging...",
  hover: "Release to Drop",
  dropped: "Dropped Successfully",
}

const draggableItems: DraggableItem[] = [
  {
    id: "drag-item-1",
    label: "Item A (Blue Box)",
    color: "blue",
  },
  {
    id: "drag-item-2",
    label: "Item B (Purple Box)",
    color: "purple",
  },
]

const colorStyles: Record<
  DraggableItem["color"],
  string
> = {
  blue: "drag-drop__item--blue",
  purple: "drag-drop__item--purple",
}

/**
 * Consolidated Drag & Drop Component
 * Supports two variants:
 * - "simple": Single item drag to single target (DragDrop behavior)
 * - "advanced": Multiple items drag to accumulating drop zone (DragAndDrop behavior)
 */
export default function DragDropComponent({
  variant = "advanced",
}: DragDropComponentProps) {
  // Simple variant state
  const [dragState, setDragState] =
    useState<DragState>("idle")

  // Advanced variant state
  const [droppedItems, setDroppedItems] =
    useState<string[]>([])

  const isDropped =
    dragState === "dropped"

  const handleReset = () => {
    setDragState("idle")
    setDroppedItems([])
  }

  // ============================================================================
  // SIMPLE VARIANT - Single drag & drop with state machine
  // ============================================================================
  if (variant === "simple") {
    return (
      <section
        id="drag-drop-card"
        data-testid="drag-drop-card"
        aria-label="Drag and drop card"
        className="drag-drop"
      >
        <header className="drag-drop__header">
          <h2
            id="drag-drop-title"
            className="drag-drop__title"
          >
            Drag and Drop
          </h2>

          <p
            id="drag-drop-description"
            className="drag-drop__description"
          >
            Practice Selenium drag-and-drop actions.
          </p>
        </header>

        <div
          className="drag-drop__simple-content"
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
            className="drag-drop__source"
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

              if (
                dragState !== "hover"
              ) {
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

              if (
                draggedItem ===
                "drag-item"
              ) {
                setDragState("dropped")
              }
            }}
            className={`drag-drop__target ${stateStyles[dragState]}`}
          >
            {stateMessages[dragState]}
          </div>
        </div>

        {/* Status */}
        <div
          className="drag-drop__simple-status"
          aria-live="polite"
        >
          <p
            id="drag-drop-result"
            data-testid="drag-drop-result"
            className={`drag-drop__result${
              isDropped
                ? " drag-drop__result--dropped"
                : ""
            }`}
          >
            {isDropped
              ? "Item dropped successfully."
              : "Waiting for drag action."}
          </p>
        </div>

        {/* Reset Button */}
        <div className="drag-drop__simple-reset">
          <button
            id="reset-drag-drop-button"
            data-testid="reset-drag-drop-button"
            aria-label="Reset drag and drop"
            type="button"
            onClick={handleReset}
            className="drag-drop__reset-button"
          >
            Reset
          </button>
        </div>
      </section>
    )
  }

  // ============================================================================
  // ADVANCED VARIANT - Multiple items drag to accumulating drop zone
  // ============================================================================
  return (
    <section
      id="drag-drop-card-html5"
      data-testid="drag-drop-card-html5"
      className="drag-drop-html5"
    >
      <h2
        id="drag-drop-title-html5"
        data-testid="drag-drop-title-html5"
        className="drag-drop-html5__title"
      >
        HTML5 Drag & Drop
      </h2>

      <p className="drag-drop-html5__description">
        Practice dragging source boxes into the target drop zone and validating
        success flags.
      </p>

      <div className="drag-drop-html5__content">
        {/* Draggable Items */}
        <div className="drag-drop-html5__items">
          <p className="drag-drop-html5__section-label">
            Draggable Items
          </p>

          {draggableItems.map(
            (item) => (
              <div
                key={item.id}
                id={item.id}
                data-testid={item.id}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData(
                    "text/plain",
                    item.label
                  )
                }
                className={`drag-drop-html5__item ${colorStyles[item.color]}`}
              >
                {item.label}
              </div>
            )
          )}
        </div>

        {/* Drop Zone */}
        <div className="drag-drop-html5__zone-container">
          <div className="drag-drop-html5__zone-header">
            <p className="drag-drop-html5__section-label">
              Drop Zone
            </p>

            {droppedItems.length >
              0 && (
              <button
                id="reset-drag-btn"
                data-testid="reset-drag-btn"
                onClick={handleReset}
                className="drag-drop-html5__reset"
              >
                Reset
              </button>
            )}
          </div>

          <div
            id="drop-zone"
            data-testid="drop-zone"
            onDragOver={(event) => {
              event.preventDefault()
            }}
            onDrop={(event) => {
              event.preventDefault()

              const item =
                event.dataTransfer.getData(
                  "text/plain"
                )

              if (
                item &&
                !droppedItems.includes(
                  item
                )
              ) {
                setDroppedItems(
                  (prev) => [
                    ...prev,
                    item,
                  ]
                )
              }
            }}
            className={`drag-drop-html5__drop-zone${
              droppedItems.length > 0
                ? " drag-drop-html5__drop-zone--success"
                : ""
            }`}
          >
            {droppedItems.length ===
            0 ? (
              <span className="drag-drop-html5__empty">
                Drag items here
              </span>
            ) : (
              <div className="drag-drop-html5__success">
                <p className="drag-drop-html5__success-title">
                  Success! Items Dropped:
                </p>

                <div className="drag-drop-html5__dropped-items">
                  {droppedItems.map(
                    (item) => (
                      <span
                        key={item}
                        id={`dropped-${item.toLowerCase().replace(/\s+/g, "-")}`}
                        data-testid={`dropped-${item
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}`}
                        className="drag-drop-html5__dropped-item"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

DragDropComponent.displayName =
  "DragDropComponent"
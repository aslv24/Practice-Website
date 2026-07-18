"use client"

import { useState } from "react"

export default function DragAndDrop() {
  const [droppedItems, setDroppedItems] = useState<string[]>([])

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, item: string) => {
    event.dataTransfer.setData("text/plain", item)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const item = event.dataTransfer.getData("text/plain")
    if (item && !droppedItems.includes(item)) {
      setDroppedItems((prev) => [...prev, item])
    }
  }

  const handleReset = () => {
    setDroppedItems([])
  }

  return (
    <section
      id="drag-drop-card-html5"
      data-testid="drag-drop-card-html5"
      className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <h2
        id="drag-drop-title-html5"
        data-testid="drag-drop-title-html5"
        className="text-lg font-bold text-gray-800 mb-2"
      >
        HTML5 Drag & Drop
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Practice dragging source boxes into the target drop zone and validating success flags.
      </p>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Draggable items */}
        <div className="flex flex-1 flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Draggable Items</p>
          <div
            id="drag-item-1"
            data-testid="drag-item-1"
            draggable
            onDragStart={(e) => handleDragStart(e, "Item A")}
            className="flex cursor-grab items-center justify-center rounded-lg border border-blue-200 bg-blue-50 p-4 font-semibold text-blue-700 active:cursor-grabbing hover:bg-blue-100/50 transition-colors select-none"
          >
            Item A (Blue Box)
          </div>
          <div
            id="drag-item-2"
            data-testid="drag-item-2"
            draggable
            onDragStart={(e) => handleDragStart(e, "Item B")}
            className="flex cursor-grab items-center justify-center rounded-lg border border-purple-200 bg-purple-50 p-4 font-semibold text-purple-700 active:cursor-grabbing hover:bg-purple-100/50 transition-colors select-none"
          >
            Item B (Purple Box)
          </div>
        </div>

        {/* Drop Zone */}
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Drop Zone</p>
            {droppedItems.length > 0 && (
              <button
                id="reset-drag-btn"
                data-testid="reset-drag-btn"
                onClick={handleReset}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                Reset
              </button>
            )}
          </div>
          <div
            id="drop-zone"
            data-testid="drop-zone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`flex min-h-36 flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
              droppedItems.length > 0
                ? "border-green-300 bg-green-50"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100/50"
            }`}
          >
            {droppedItems.length === 0 ? (
              <span className="text-sm text-gray-400">Drag items here</span>
            ) : (
              <div className="text-center">
                <p className="text-sm font-semibold text-green-800 mb-2">Success! Items Dropped:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {droppedItems.map((item) => (
                    <span
                      key={item}
                      id={`dropped-${item.toLowerCase().replace(" ", "-")}`}
                      data-testid={`dropped-${item.toLowerCase().replace(" ", "-")}`}
                      className="rounded bg-green-200 px-2 py-1 text-xs font-bold text-green-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
DragAndDrop.displayName = "DragAndDrop"

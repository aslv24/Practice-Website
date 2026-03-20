"use client"

import { useState } from "react"

export default function DragDrop() {
  const [dropped, setDropped] = useState(false)

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Drag and Drop</h2>

      <div className="flex items-center gap-6">
        <div
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text", "drag")}
          className="cursor-grab rounded-lg bg-blue-500 px-6 py-3 text-white active:cursor-grabbing"
        >
          Drag Me
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => setDropped(true)}
          className={`w-40 rounded-lg border-2 px-6 py-6 text-center transition ${
            dropped
              ? "border-green-500 bg-green-100"
              : "border-dashed border-gray-400 bg-gray-100"
          }`}
        >
          {dropped ? "Dropped." : "Drop Here"}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"

export default function MouseHover() {
  const [show, setShow] = useState(false)

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Mouse Hover</h2>

      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-pointer rounded-lg bg-gradient-to-r from-blue-100 to-blue-200 p-4 text-center transition hover:scale-105"
      >
        Hover Over Me
      </div>

      {show && <p className="mt-3 font-medium text-blue-600">Hover detected.</p>}
    </div>
  )
}

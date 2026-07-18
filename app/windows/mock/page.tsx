"use client"

import { Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"

function MockContent() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || "Mock Window"

  useEffect(() => {
    document.title = `${name.charAt(0).toUpperCase() + name.slice(1)} Window`
  }, [name])

  const handleClose = () => {
    if (typeof window !== "undefined") {
      window.close()
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
      <h1 id="mock-window-title" data-testid="mock-window-title" className="text-3xl font-extrabold text-blue-600 capitalize">
        {name} Page
      </h1>
      <p id="mock-window-message" data-testid="mock-window-message" className="mt-4 text-slate-600">
        This is a simulated {name} window/tab page for reliable, offline Selenium automation practice.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <p className="text-xs text-slate-400">
          Document Title: <strong id="mock-page-title" data-testid="mock-page-title">{name.charAt(0).toUpperCase() + name.slice(1)} Window</strong>
        </p>
        <button 
          id="close-mock-window-button"
          data-testid="close-mock-window-button"
          onClick={handleClose}
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition cursor-pointer"
        >
          Close Window
        </button>
      </div>
    </div>
  )
}

export default function WindowsMockPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-slate-900">
      <Suspense fallback={<div className="text-sm text-slate-500">Loading mock page details...</div>}>
        <MockContent />
      </Suspense>
    </main>
  )
}

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
    <div className="windows-mock__card">
      <h1
        id="mock-window-title"
        data-testid="mock-window-title"
        className="windows-mock__title"
      >
        {name} Page
      </h1>

      <p
        id="mock-window-message"
        data-testid="mock-window-message"
        className="windows-mock__message"
      >
        This is a simulated {name} window/tab page for reliable, offline Selenium automation practice.
      </p>

      <div className="windows-mock__details">
        <p className="windows-mock__document-title">
          Document Title:{" "}
          <strong
            id="mock-page-title"
            data-testid="mock-page-title"
          >
            {name.charAt(0).toUpperCase() + name.slice(1)} Window
          </strong>
        </p>

        <button
          id="close-mock-window-button"
          data-testid="close-mock-window-button"
          onClick={handleClose}
          className="windows-mock__close-button"
        >
          Close Window
        </button>
      </div>
    </div>
  )
}

export default function WindowsMockPage() {
  return (
    <main className="windows-mock">
      <Suspense
        fallback={
          <div className="windows-mock__loading">
            Loading mock page details...
          </div>
        }
      >
        <MockContent />
      </Suspense>
    </main>
  )
}
"use client"

export default function NewWindow() {
  const openWindow = () => {
    window.open(
      "https://www.naukri.com/",
      "_blank",
      "width=800,height=600,noopener,noreferrer"
    )
  }

  return (
    <section
      id="new-window-card"
      data-testid="new-window-card"
      data-component="new-window"
      aria-labelledby="new-window-title"
      className="
        rounded-2xl border border-gray-100
        bg-white p-6 shadow-sm
        transition-shadow hover:shadow-md
      "
    >
      <h2
        id="new-window-title"
        data-testid="new-window-title"
        className="
          mb-4 text-lg font-semibold text-gray-800
        "
      >
        Open New Window
      </h2>

      <p
        id="new-window-description"
        data-testid="new-window-description"
        className="
          mb-4 text-sm text-gray-500
        "
      >
        Opens an internal popup window for
        Selenium window-handling practice.
      </p>

      <button
        type="button"
        id="open-window-button"
        name="openWindow"
        data-testid="open-window-button"
        aria-label="Open practice window"
        onClick={openWindow}
        className="
          rounded-lg bg-green-600
          px-5 py-2 text-sm font-medium
          text-white transition-colors
          hover:bg-green-700
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-green-500
          focus-visible:ring-offset-2
        "
      >
        Open Practice Window
      </button>

      <div
        id="new-window-helper-text"
        data-testid="new-window-helper-text"
        aria-live="polite"
        className="
          mt-5 rounded-md border bg-gray-50
          px-3 py-2 text-sm text-green-700
        "
      >
        Use Selenium window handles to switch
        between the parent window and popup
        window.
      </div>
    </section>
  )
}

NewWindow.displayName =
  "NewWindow"
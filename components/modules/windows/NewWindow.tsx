"use client"

export default function NewWindow() {
  const openWindow = () => {
    window.open(
      "/windows/mock?name=naukri",
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
      className="new-window"
    >
      <h2
        id="new-window-title"
        data-testid="new-window-title"
        className="new-window__title"
      >
        Open New Window
      </h2>

      <p
        id="new-window-description"
        data-testid="new-window-description"
        className="new-window__description"
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
        className="new-window__button"
      >
        Open Practice Window
      </button>

      <div
        id="new-window-helper-text"
        data-testid="new-window-helper-text"
        aria-live="polite"
        className="new-window__helper"
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
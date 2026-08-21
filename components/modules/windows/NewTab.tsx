"use client"

export default function NewTab() {
  const openTab = () => {
    window.open(
      "/windows/mock?name=naukri",
      "_blank",
      "noopener,noreferrer"
    )
  }

  return (
    <section
      id="new-tab-card"
      data-testid="new-tab-card"
      data-component="new-tab"
      aria-labelledby="new-tab-title"
      className="new-tab"
    >
      <h2
        id="new-tab-title"
        data-testid="new-tab-title"
        className="new-tab__title"
      >
        Open New Tab
      </h2>

      <p
        id="new-tab-description"
        data-testid="new-tab-description"
        className="new-tab__description"
      >
        Opens an internal application page
        in a new browser tab for Selenium
        tab-handling practice.
      </p>

      <button
        type="button"
        id="open-tab-button"
        name="openTab"
        data-testid="open-tab-button"
        aria-label="Open practice page in new tab"
        onClick={openTab}
        className="new-tab__button"
      >
        Open Practice Tab
      </button>

      <div
        id="new-tab-helper-text"
        data-testid="new-tab-helper-text"
        aria-live="polite"
        className="new-tab__helper"
      >
        Use Selenium window handles to switch
        between the parent and child tabs.
      </div>
    </section>
  )
}

NewTab.displayName = "NewTab"
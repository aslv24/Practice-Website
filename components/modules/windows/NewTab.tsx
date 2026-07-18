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
      className="
        rounded-2xl border border-gray-100
        bg-white p-6 shadow-sm
        transition-shadow hover:shadow-md
      "
    >
      <h2
        id="new-tab-title"
        data-testid="new-tab-title"
        className="
          mb-4 text-lg font-semibold text-gray-800
        "
      >
        Open New Tab
      </h2>

      <p
        id="new-tab-description"
        data-testid="new-tab-description"
        className="
          mb-4 text-sm text-gray-500
        "
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
        className="
          rounded-lg bg-blue-600
          px-5 py-2 text-sm font-medium
          text-white transition-colors
          hover:bg-blue-700
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500
          focus-visible:ring-offset-2
        "
      >
        Open Practice Tab
      </button>

      <div
        id="new-tab-helper-text"
        data-testid="new-tab-helper-text"
        aria-live="polite"
        className="
          mt-5 rounded-md border bg-gray-50
          px-3 py-2 text-sm text-blue-700
        "
      >
        Use Selenium window handles to switch
        between the parent and child tabs.
      </div>
    </section>
  )
}

NewTab.displayName = "NewTab"
"use client"

const TABS = [
  {
    id: "facebook",
    label: "Open Facebook Tab",
    url: "https://www.facebook.com/",
    buttonClass: "multiple-windows__button--facebook",
  },
  {
    id: "instagram",
    label: "Open Instagram Tab",
    url: "https://www.instagram.com/",
    buttonClass: "multiple-windows__button--instagram",
  },
  {
    id: "linkedin",
    label: "Open LinkedIn Tab",
    url: "https://www.linkedin.com/",
    buttonClass: "multiple-windows__button--linkedin",
  },
  {
    id: "naukri",
    label: "Open Naukri Tab",
    url: "https://www.naukri.com/",
    buttonClass: "multiple-windows__button--naukri",
  },
]

export default function MultipleWindows() {
  return (
    <section
      id="multiple-windows-card"
      data-testid="multiple-windows-card"
      data-component="multiple-windows"
      aria-labelledby="multiple-windows-title"
      className="multiple-windows"
    >
      <h2
        id="multiple-windows-title"
        data-testid="multiple-windows-title"
        className="multiple-windows__title"
      >
        Multiple Tabs
      </h2>

      <p
        id="multiple-windows-description"
        data-testid="multiple-windows-description"
        className="multiple-windows__description"
      >
        Open four live websites in separate browser
        tabs for Selenium tab-handling practice.
      </p>

      <div
        role="group"
        aria-describedby="multiple-windows-description"
        className="multiple-windows__button-group"
      >
        {TABS.map((tab) => (
          <a
            key={tab.id}
            id={`open-${tab.id}-tab-link`}
            data-testid={`open-${tab.id}-tab-link`}
            href={tab.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`multiple-windows__button ${tab.buttonClass}`}
          >
            {tab.label}
          </a>
        ))}
      </div>

      <div
        id="multiple-windows-helper-text"
        data-testid="multiple-windows-helper-text"
        aria-live="polite"
        className="multiple-windows__helper"
      >
        Open each tab with its button, then use
        Selenium window handles to switch between
        the live pages and validate their titles.
      </div>
    </section>
  )
}

MultipleWindows.displayName =
  "MultipleWindows"
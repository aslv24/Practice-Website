"use client"

const WINDOW_LINKS = [
  {
    id: "facebook",
    label: "Facebook Window",
    url: "/windows/mock?name=facebook",
    buttonClass:
      "multiple-windows__button--facebook",
  },
  {
    id: "instagram",
    label: "Instagram Window",
    url: "/windows/mock?name=instagram",
    buttonClass:
      "multiple-windows__button--instagram",
  },
  {
    id: "linkedin",
    label: "LinkedIn Window",
    url: "/windows/mock?name=linkedin",
    buttonClass:
      "multiple-windows__button--linkedin",
  },
  {
    id: "naukri",
    label: "Naukri Window",
    url: "/windows/mock?name=naukri",
    buttonClass:
      "multiple-windows__button--naukri",
  },
]

export default function MultipleWindows() {
  const openWindow = (url: string) => {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    )
  }

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
        Multiple Windows
      </h2>

      <p
        id="multiple-windows-description"
        data-testid="multiple-windows-description"
        className="multiple-windows__description"
      >
        Opens internal application windows
        for Selenium window-handling
        practice.
      </p>

      <div
        role="group"
        aria-describedby="multiple-windows-description"
        className="multiple-windows__button-group"
      >
        {WINDOW_LINKS.map(
          (windowItem) => (
            <button
              key={windowItem.id}
              type="button"
              id={`open-${windowItem.id}-button`}
              name={`open${windowItem.label.replace(
                /\s/g,
                ""
              )}`}
              data-testid={`open-${windowItem.id}-button`}
              aria-label={`Open ${windowItem.label}`}
              onClick={() =>
                openWindow(
                  windowItem.url
                )
              }
              className={`multiple-windows__button ${windowItem.buttonClass}`}
            >
              {windowItem.label}
            </button>
          )
        )}
      </div>

      <div
        id="multiple-windows-helper-text"
        data-testid="multiple-windows-helper-text"
        aria-live="polite"
        className="multiple-windows__helper"
      >
        Use Selenium window handles to switch
        between tabs and validate page titles.
      </div>
    </section>
  )
}

MultipleWindows.displayName =
  "MultipleWindows"
"use client"

const WINDOW_LINKS = [
  {
    id: "facebook",
    label: "Facebook Window",
    url: "/windows/mock?name=facebook",
    buttonClass:
      "bg-blue-600 hover:bg-blue-700"
  },
  {
    id: "instagram",
    label: "Instagram Window",
    url: "/windows/mock?name=instagram",
    buttonClass:
      "bg-pink-600 hover:bg-pink-700"
  },
  {
    id: "linkedin",
    label: "LinkedIn Window",
    url: "/windows/mock?name=linkedin",
    buttonClass:
      "bg-blue-800 hover:bg-blue-900"
  },
  {
    id: "naukri",
    label: "Naukri Window",
    url: "/windows/mock?name=naukri",
    buttonClass:
      "bg-yellow-500 hover:bg-yellow-600 text-black"
  }
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
      className="
        rounded-2xl border border-gray-100
        bg-white p-6 shadow-sm
        transition-shadow hover:shadow-md
      "
    >
      <h2
        id="multiple-windows-title"
        data-testid="multiple-windows-title"
        className="
          mb-4 text-lg font-semibold text-gray-800
        "
      >
        Multiple Windows
      </h2>

      <p
        id="multiple-windows-description"
        data-testid="multiple-windows-description"
        className="
          mb-4 text-sm text-gray-500
        "
      >
        Opens internal application windows
        for Selenium window-handling
        practice.
      </p>

      <div
        role="group"
        aria-describedby="multiple-windows-description"
        className="
          flex flex-wrap gap-3
        "
      >
        {WINDOW_LINKS.map((windowItem) => (
          <button
            key={windowItem.id}
            type="button"
            id={`open-${windowItem.id}-button`}
            name={`open${windowItem.label.replace(/\s/g, "")}`}
            data-testid={`open-${windowItem.id}-button`}
            aria-label={`Open ${windowItem.label}`}
            onClick={() =>
              openWindow(windowItem.url)
            }
            className={`
              rounded-lg px-4 py-2
              text-sm font-medium text-white
              transition-colors
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-offset-2
              ${windowItem.buttonClass}
            `}
          >
            {windowItem.label}
          </button>
        ))}
      </div>

      <div
        id="multiple-windows-helper-text"
        data-testid="multiple-windows-helper-text"
        aria-live="polite"
        className="
          mt-5 rounded-md border bg-gray-50
          px-3 py-2 text-sm text-blue-700
        "
      >
        Use Selenium window handles to switch
        between tabs and validate page titles.
      </div>
    </section>
  )
}

MultipleWindows.displayName =
  "MultipleWindows"
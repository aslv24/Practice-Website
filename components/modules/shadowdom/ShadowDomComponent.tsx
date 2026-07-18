"use client"

import { useEffect, useRef } from "react"

export default function ShadowDomComponent() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    // Prevent duplicate shadow root errors in Dev mode
    if (containerRef.current.shadowRoot) return

    const shadow = containerRef.current.attachShadow({ mode: "open" })

    // Create wrapper
    const wrapper = document.createElement("div")
    wrapper.className = "shadow-wrapper"

    // Inject styles inside Shadow Root to match tailwind style
    const style = document.createElement("style")
    style.textContent = `
      .shadow-wrapper {
        font-family: ui-sans-serif, system-ui, sans-serif;
        background-color: #f8fafc;
        padding: 1.5rem;
        border-radius: 1rem;
        border: 1px dashed #cbd5e1;
        box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
      }
      .title {
        font-size: 1rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0 0 0.5rem 0;
      }
      .description {
        font-size: 0.875rem;
        color: #64748b;
        margin: 0 0 1.25rem 0;
        line-height: 1.25rem;
      }
      .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1.25rem;
      }
      .input-label {
        font-size: 0.875rem;
        font-weight: 600;
        color: #475569;
      }
      .text-input {
        padding: 0.625rem 0.875rem;
        font-size: 0.875rem;
        border: 1px solid #cbd5e1;
        border-radius: 0.5rem;
        outline: none;
        background-color: #ffffff;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .text-input:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
      }
      .submit-btn {
        background-color: #2563eb;
        color: #ffffff;
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
        font-weight: 600;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.1s;
      }
      .submit-btn:hover {
        background-color: #1d4ed8;
      }
      .submit-btn:active {
        transform: scale(0.98);
      }
      .status-box {
        margin-top: 1.25rem;
        padding: 0.875rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        border: 1px solid #e2e8f0;
        background-color: #ffffff;
        color: #64748b;
        transition: all 0.2s;
      }
      .status-box.active {
        border-color: #86efac;
        background-color: #f0fdf4;
        color: #166534;
      }
    `
    shadow.appendChild(style)

    wrapper.innerHTML = `
      <h3 class="title" id="shadow-title" data-testid="shadow-title">Inside Shadow Root</h3>
      <p class="description" id="shadow-desc">
        These elements are encapsulated inside the Shadow DOM boundary. Standard locator strategies will fail to find them unless you query them directly from the shadow root context.
      </p>
      <div class="input-group">
        <label class="input-label" for="shadow-input">Secret Phrase:</label>
        <input class="text-input" id="shadow-input" data-testid="shadow-input" type="text" placeholder="Enter 'Open Sesame'..." />
      </div>
      <button class="submit-btn" id="shadow-button" data-testid="shadow-button">Submit Phrase</button>
      <div class="status-box" id="shadow-status" data-testid="shadow-status">Status: Waiting for input</div>
    `

    shadow.appendChild(wrapper)

    const input = shadow.getElementById("shadow-input") as HTMLInputElement
    const button = shadow.getElementById("shadow-button") as HTMLButtonElement
    const status = shadow.getElementById("shadow-status") as HTMLDivElement

    button.addEventListener("click", () => {
      const value = input.value.trim()
      if (value.toLowerCase() === "open sesame") {
        status.textContent = "Status: Access Granted! 'Open Sesame' accepted."
        status.className = "status-box active"
      } else {
        status.textContent = `Status: Access Denied! '${value || "empty"}' is incorrect.`
        status.className = "status-box"
      }
    })
  }, [])

  return (
    <section
      id="shadow-dom-card"
      data-testid="shadow-dom-card"
      className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <header className="mb-4">
        <h2
          id="shadow-dom-title"
          data-testid="shadow-dom-title"
          className="text-lg font-semibold text-gray-800"
        >
          Shadow DOM Encapsulation
        </h2>
        <p
          id="shadow-dom-description"
          data-testid="shadow-dom-description"
          className="mt-1 text-sm text-gray-500"
        >
          The box below attaches an <strong>open shadow root</strong>. To interact with it, your test script must locate the shadow host container, fetch its shadow root, and search for elements inside it.
        </p>
      </header>
      
      {/* Target host for Shadow DOM */}
      <div id="shadow-host" data-testid="shadow-host" ref={containerRef} className="mt-6"></div>
    </section>
  )
}
ShadowDomComponent.displayName = "ShadowDomComponent"

"use client"

import { useState } from "react"
import DashboardBackLink from "@/components/layout/DashboardBackLink"
import AlertCard from "@/components/modules/alerts/AlertCard"

/* ------------------------------------------------------------------ */
/* SVG Locators                                                         */
/* ------------------------------------------------------------------ */
function SvgLocatorsCard() {
  const [clicked, setClicked] = useState("")

  return (
    <AlertCard automationId="svg-locators" title="SVG Element Locators">
      <div className="simple-alert">
        <p className="simple-alert__description">
          Click each SVG shape below. Locate them using{" "}
          <code>{"//*[name()='svg']"}</code> or by their <code>id</code>.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", justifyItems: "center", padding: "0.5rem 0" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
            <svg id="svg-circle" width="70" height="70" viewBox="0 0 80 80"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setClicked("Circle")}
              style={{ cursor: "pointer", transition: "transform 0.15s" }}
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <circle cx="40" cy="40" r="35" fill="#3b82f6" />
              <text x="40" y="45" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Circle</text>
            </svg>
            <code style={{ fontSize: "0.65rem", color: "#64748b" }}>id: svg-circle</code>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
            <svg id="svg-rect" width="80" height="60" viewBox="0 0 100 70"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setClicked("Rectangle")}
              style={{ cursor: "pointer", transition: "transform 0.15s" }}
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <rect x="5" y="5" width="90" height="60" rx="8" fill="#8b5cf6" />
              <text x="50" y="38" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Rect</text>
            </svg>
            <code style={{ fontSize: "0.65rem", color: "#64748b" }}>id: svg-rect</code>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
            <svg id="svg-star" width="70" height="70" viewBox="0 0 80 80"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setClicked("Star")}
              style={{ cursor: "pointer", transition: "transform 0.15s" }}
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <polygon points="40,5 49,31 77,31 54,48 62,74 40,57 18,74 26,48 3,31 31,31" fill="#f59e0b" />
            </svg>
            <code style={{ fontSize: "0.65rem", color: "#64748b" }}>id: svg-star</code>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
            <svg id="svg-check" width="70" height="70" viewBox="0 0 80 80"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setClicked("Checkmark")}
              style={{ cursor: "pointer", transition: "transform 0.15s" }}
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <circle cx="40" cy="40" r="35" fill="#22c55e" />
              <polyline points="22,42 35,55 58,27" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <code style={{ fontSize: "0.65rem", color: "#64748b" }}>id: svg-check</code>
          </div>
        </div>
        <div className="simple-alert__status" id="svg-click-result">
          Clicked SVG: <strong id="svg-clicked-shape">{clicked || "—"}</strong>
        </div>
      </div>
    </AlertCard>
  )
}

/* ------------------------------------------------------------------ */
/* normalize-space()                                                    */
/* ------------------------------------------------------------------ */
function NormalizeSpaceCard() {
  const items = [
    { id: "ns-text-1", text: "  Hello   World  " },
    { id: "ns-text-2", text: "  Selenium   Practice  " },
    { id: "ns-text-3", text: "  Automation   Testing  " },
    { id: "ns-text-4", text: "  XPath   Functions  " },
  ]
  const [selectedId, setSelectedId] = useState("")

  return (
    <AlertCard automationId="normalize-space" title="XPath: normalize-space()">
      <div className="simple-alert">
        <p className="simple-alert__description">
          Click the button whose text normalizes to Hello World:{" "}
          <code>{"//button[normalize-space()='Hello World']"}</code>
        </p>
        <div className="loc-control-list">
          {items.map((item) => (
            <button
              key={item.id}
              id={item.id}
              type="button"
              className={`loc-practice-button loc-practice-button--whitespace${selectedId === item.id ? " is-selected" : ""}`}
              onClick={() => setSelectedId(item.id)}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </AlertCard>
  )
}

/* ------------------------------------------------------------------ */
/* string-length()                                                      */
/* ------------------------------------------------------------------ */
function StringLengthCard() {
  const items = [
    { id: "sl-text-1", text: "Hi" },
    { id: "sl-text-2", text: "Hello" },
    { id: "sl-text-3", text: "Playwright" },
    { id: "sl-text-4", text: "Selenium WebDriver" },
    { id: "sl-text-5", text: "Automation Practice" },
  ]
  const [selectedId, setSelectedId] = useState("")

  return (
    <AlertCard automationId="string-length" title="XPath: string-length()">
      <div className="simple-alert">
        <p className="simple-alert__description">
          Click the button with five characters:{" "}
          <code>{"//button[string-length(normalize-space())=5]"}</code>
        </p>
        <div className="loc-control-list">
          {items.map((item) => (
            <button
              key={item.id}
              id={item.id}
              type="button"
              className={`loc-practice-button${selectedId === item.id ? " is-selected" : ""}`}
              data-value={item.text}
              onClick={() => setSelectedId(item.id)}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </AlertCard>
  )
}

/* ------------------------------------------------------------------ */
/* floor() / round()                                                    */
/* ------------------------------------------------------------------ */
function FloorRoundCard() {
  const [selectedId, setSelectedId] = useState("")
  const items = [
    { id: "fr-val-1", raw: "3.7" },
    { id: "fr-val-2", raw: "8.2" },
    { id: "fr-val-3", raw: "5.5" },
    { id: "fr-val-4", raw: "12.9" },
  ]

  return (
    <AlertCard automationId="floor-round" title="XPath: floor() & round()">
      <div className="simple-alert">
        <p className="simple-alert__description">
          Click the button matching either XPath:{" "}
          <code>{"//button[floor(@data-value)=3]"}</code>{" "}
          or <code>{"//button[round(@data-value)=6]"}</code>
        </p>
        <div className="loc-control-list">
          {items.map((item) => (
            <button
              key={item.id}
              id={item.id}
              type="button"
              data-value={item.raw}
              className={`loc-practice-button${selectedId === item.id ? " is-selected" : ""}`}
              onClick={() => setSelectedId(item.id)}
            >
              {item.raw}
            </button>
          ))}
        </div>
      </div>
    </AlertCard>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function LocatorPracticePage() {
  return (
    <div className="alerts-page">
      <div className="alerts-page__header">
        <h1 className="alerts-page__title">Locator Practice</h1>
        <p className="alerts-page__description">
          Practice targeting SVG elements and using XPath functions —{" "}
          <code>normalize-space()</code>, <code>string-length()</code>,{" "}
          <code>floor()</code>, <code>round()</code>.
        </p>
        <DashboardBackLink />
      </div>
      <div className="alerts-page__content">
        <SvgLocatorsCard />
        <NormalizeSpaceCard />
        <StringLengthCard />
        <FloorRoundCard />
      </div>
    </div>
  )
}

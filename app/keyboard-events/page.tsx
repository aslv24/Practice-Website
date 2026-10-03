"use client"

import { useRef, useState } from "react"
import DashboardBackLink from "@/components/layout/DashboardBackLink"
import AlertCard from "@/components/modules/alerts/AlertCard"

/* ------------------------------------------------------------------ */
/* Key Combination Logger                                               */
/* ------------------------------------------------------------------ */
type KeyLog = { id: number; display: string }

function KeyComboLogger() {
  const [log, setLog] = useState<KeyLog[]>([])
  const [counter, setCounter] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const mods: string[] = []
    if (e.ctrlKey) mods.push("Ctrl")
    if (e.altKey) mods.push("Alt")
    if (e.shiftKey) mods.push("Shift")
    if (e.metaKey) mods.push("Meta")
    const parts = [...mods, e.key === " " ? "Space" : e.key]
    const display = parts.join(" + ")
    const id = counter + 1
    setCounter(id)
    setLog((prev) => [{ id, display }, ...prev].slice(0, 10))
  }

  return (
    <AlertCard automationId="key-combo" title="Key Combination Logger">
      <div className="simple-alert">
        <p className="simple-alert__description">
          Click the input below and press any key or combo — e.g. Ctrl+A, Shift+Enter, Alt+Z.
        </p>
        <input
          ref={inputRef}
          id="key-combo-input"
          className="practice-select"
          placeholder="Click here and press keys…"
          onKeyDown={handleKey}
          readOnly
        />
        <div
          id="key-combo-display"
          className="simple-alert__status"
          style={{ minHeight: "7rem", fontFamily: "monospace", padding: "0.5rem 0.75rem" }}
        >
          {log.length === 0
            ? "Waiting for key events…"
            : log.map((entry, i) => (
                <div key={entry.id} id={`key-log-${i}`} style={{ padding: "0.15rem 0" }}>
                  {entry.display}
                </div>
              ))}
        </div>
        <button
          id="clear-key-log"
          className="practice-btn-red"
          style={{ width: "fit-content" }}
          onClick={() => setLog([])}
        >
          Clear Log
        </button>
      </div>
    </AlertCard>
  )
}

/* ------------------------------------------------------------------ */
/* Special Keys Detector                                               */
/* ------------------------------------------------------------------ */
function SpecialKeysDetector() {
  const [lastKey, setLastKey] = useState("")

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Tab") e.preventDefault()
    setLastKey(e.key)
  }

  const KEYS = ["Tab","Enter","Escape","Backspace","Delete",
    "ArrowUp","ArrowDown","ArrowLeft","ArrowRight",
    "Home","End","PageUp","PageDown","F1","F5","F12"]

  return (
    <AlertCard automationId="special-keys" title="Special Keys Detector">
      <div className="simple-alert">
        <p className="simple-alert__description">
          Focus the area below and press any special key. The detected key name appears in the result box.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.5rem" }}>
          {KEYS.map((k) => (
            <kbd
              key={k}
              id={`special-key-chip-${k.toLowerCase()}`}
              style={{
                display: "inline-block",
                padding: "0.2rem 0.6rem",
                borderRadius: "0.35rem",
                border: "1px solid #d1d5db",
                background: "#f3f4f6",
                fontSize: "0.75rem",
                fontFamily: "monospace",
                fontWeight: 600,
                color: "#374151",
              }}
            >
              {k}
            </kbd>
          ))}
        </div>
        <textarea
          id="special-key-area"
          className="practice-select"
          placeholder="Click here and press a special key…"
          onKeyDown={handleKey}
          rows={3}
          style={{ resize: "none", fontFamily: "monospace" }}
        />
        <div className="simple-alert__status" id="special-key-result">
          Last key: <strong id="special-key-name">{lastKey || "—"}</strong>
        </div>
      </div>
    </AlertCard>
  )
}

/* ------------------------------------------------------------------ */
/* Tab Navigation Practice                                             */
/* ------------------------------------------------------------------ */
function TabNavigationPractice() {
  const [focused, setFocused] = useState("")

  const fields = [
    { id: "tab-field-1", label: "First Name" },
    { id: "tab-field-2", label: "Last Name" },
    { id: "tab-field-3", label: "Email" },
    { id: "tab-field-4", label: "Phone" },
  ]

  return (
    <AlertCard automationId="tab-navigation" title="Tab / Shift+Tab Navigation">
      <div className="simple-alert">
        <p className="simple-alert__description">
          Use <kbd>Tab</kbd> to move forward and <kbd>Shift+Tab</kbd> to go back through the fields.
          The focused field is highlighted.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {fields.map((f) => (
            <div key={f.id}>
              <label
                htmlFor={f.id}
                className="practice-label"
                style={{ marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                {f.label}
                {focused === f.id && (
                  <span
                    id={`${f.id}-badge`}
                    style={{
                      fontSize: "0.7rem",
                      background: "#dbeafe",
                      color: "#1d4ed8",
                      padding: "0.1rem 0.4rem",
                      borderRadius: "999px",
                      fontWeight: 600,
                    }}
                  >
                    Focused
                  </span>
                )}
              </label>
              <input
                id={f.id}
                placeholder={`Tab to ${f.label}…`}
                className="practice-select"
                style={{
                  borderColor: focused === f.id ? "#3b82f6" : undefined,
                  background: focused === f.id ? "#eff6ff" : undefined,
                  transition: "all 0.15s",
                }}
                onFocus={() => setFocused(f.id)}
                onBlur={() => setFocused("")}
              />
            </div>
          ))}
        </div>
        <div className="simple-alert__status" id="tab-focus-status">
          Focused field ID: <strong id="tab-focused-id">{focused || "—"}</strong>
        </div>
      </div>
    </AlertCard>
  )
}

/* ------------------------------------------------------------------ */
/* Ctrl Shortcuts Practice                                             */
/* ------------------------------------------------------------------ */
function CtrlShortcutsPractice() {
  const [lastCombo, setLastCombo] = useState("")
  const [pastedText, setPastedText] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey) {
      const map: Record<string, string> = {
        a: "Ctrl + A", c: "Ctrl + C", x: "Ctrl + X", z: "Ctrl + Z", y: "Ctrl + Y",
      }
      if (map[e.key]) setLastCombo(map[e.key])
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    setPastedText(e.clipboardData.getData("text"))
    setLastCombo("Ctrl + V")
  }

  const SHORTCUTS = ["Ctrl+A", "Ctrl+C", "Ctrl+X", "Ctrl+Z", "Ctrl+V"]

  return (
    <AlertCard automationId="ctrl-shortcuts" title="Ctrl Shortcut Practice">
      <div className="simple-alert">
        <p className="simple-alert__description">
          Use Ctrl+A to select all, Ctrl+C to copy, Ctrl+X to cut, Ctrl+Z to undo.
          Paste with Ctrl+V into the textarea below.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.5rem" }}>
          {SHORTCUTS.map((s) => (
            <kbd
              key={s}
              id={`shortcut-chip-${s.replace(/\+/g, "").toLowerCase()}`}
              style={{
                display: "inline-block",
                padding: "0.2rem 0.6rem",
                borderRadius: "0.35rem",
                border: "1px solid #d1d5db",
                background: "#f3f4f6",
                fontSize: "0.75rem",
                fontFamily: "monospace",
                fontWeight: 600,
                color: "#374151",
              }}
            >
              {s}
            </kbd>
          ))}
        </div>
        <label className="practice-label">Source (type or select all &amp; copy)</label>
        <input
          ref={inputRef}
          id="ctrl-source-input"
          className="practice-select"
          defaultValue="Select all and copy this text!"
          onKeyDown={handleKey}
          style={{ fontFamily: "monospace" }}
        />
        <label className="practice-label">Paste Area (Ctrl+V here)</label>
        <textarea
          id="ctrl-paste-area"
          className="practice-select"
          placeholder="Paste here with Ctrl+V…"
          rows={3}
          onPaste={handlePaste}
          style={{ resize: "none", fontFamily: "monospace" }}
        />
        <div className="simple-alert__status" id="ctrl-combo-result">
          Last shortcut: <strong id="ctrl-last-combo">{lastCombo || "—"}</strong>
        </div>
        {pastedText && (
          <div className="simple-alert__status" id="ctrl-paste-result">
            Pasted text: <strong id="ctrl-pasted-text">{pastedText}</strong>
          </div>
        )}
      </div>
    </AlertCard>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function KeyboardEventsPage() {
  return (
    <div className="alerts-page">
      <div className="alerts-page__header">
        <h1 className="alerts-page__title">Keyboard Events Practice</h1>
        <p className="alerts-page__description">
          Practice key combos, special keys, Tab navigation, and Ctrl shortcuts
          for Selenium <code>sendKeys()</code> and Playwright <code>keyboard.press()</code>.
        </p>
        <DashboardBackLink />
      </div>
      <div className="alerts-page__content">
        <KeyComboLogger />
        <SpecialKeysDetector />
        <TabNavigationPractice />
        <CtrlShortcutsPractice />
      </div>
    </div>
  )
}

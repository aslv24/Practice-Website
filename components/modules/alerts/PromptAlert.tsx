"use client"

import { useState } from "react"

import AlertCard from "./AlertCard"

const PROMPT_MESSAGE = "Enter your name:"

export default function PromptAlert() {
  const [value, setValue] = useState<string | null>(null)

  const handlePrompt = () => {
    const result = window.prompt(PROMPT_MESSAGE)

    if (result === null) {
      setValue("Prompt was cancelled")
      return
    }

    const trimmedValue = result.trim()

    setValue(
      trimmedValue.length > 0
        ? trimmedValue
        : "Empty value submitted"
    )
  }

  return (
    <AlertCard
      automationId="prompt-alert"
      title="Prompt Alert"
    >
      <div
        className="prompt-alert"
        data-component="prompt-alert"
      >
        <button
          type="button"
          id="prompt-alert-button"
          name="promptAlert"
          data-testid="prompt-alert-button"
          aria-describedby="prompt-alert-description"
          aria-label="Open prompt alert"
          onClick={handlePrompt}
          className="prompt-alert__button"
        >
          Click for Prompt
        </button>

        <p
          id="prompt-alert-description"
          data-testid="prompt-alert-description"
          className="prompt-alert__description"
        >
          Opens a browser prompt alert for Selenium practice.
        </p>

        <div
          id="prompt-alert-result"
          data-testid="prompt-alert-result"
          aria-live="polite"
          className="prompt-alert__result"
        >
          {value ?? "No value entered yet."}
        </div>
      </div>
    </AlertCard>
  )
}

PromptAlert.displayName = "PromptAlert"
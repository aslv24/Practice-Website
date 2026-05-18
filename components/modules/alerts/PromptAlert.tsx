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
        className="flex flex-col gap-4"
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
          className="
            inline-flex w-fit items-center justify-center
            rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white
            transition-colors
            hover:bg-green-700
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-green-500
            focus-visible:ring-offset-2
          "
        >
          Click for Prompt
        </button>

        <p
          id="prompt-alert-description"
          data-testid="prompt-alert-description"
          className="text-sm text-gray-600"
        >
          Opens a browser prompt alert for Selenium practice.
        </p>

        <div
          id="prompt-alert-result"
          data-testid="prompt-alert-result"
          aria-live="polite"
          className="
            min-h-6 rounded-md border bg-gray-50 px-3 py-2 text-sm
          "
        >
          {value ?? "No value entered yet."}
        </div>
      </div>
    </AlertCard>
  )
}

PromptAlert.displayName = "PromptAlert"
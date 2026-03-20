"use client"

import { useState } from "react"
import AlertCard from "./AlertCard"

export default function PromptAlert() {

  const [value, setValue] = useState("")

  const handlePrompt = () => {
    const result = prompt("Enter your name:")
    if (result !== null) {
      setValue(result)
    }
  }

  return (
    <AlertCard title="Prompt Alert">
      <button
        onClick={handlePrompt}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Click for Prompt
      </button>

      {value && (
        <p className="mt-4">
          Entered Value: <span className="font-semibold">{value}</span>
        </p>
      )}
    </AlertCard>
  )
}
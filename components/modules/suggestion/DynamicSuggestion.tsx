"use client"

import { useState } from "react"

import { countries, type Country } from "@/data/countries"

export default function DynamicSuggestion() {
  const [input, setInput] = useState("")
  const [filtered, setFiltered] = useState<Country[]>([])

  const handleChange = (value: string) => {
    setInput(value)

    const result = countries.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.code.includes(value)
    )

    setFiltered(value ? result : [])
  }

  const handleSelect = (item: Country) => {
    setInput(`${item.name} (${item.code})`)
    setFiltered([])
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Suggestion List (Countries)</h2>

      <input
        type="text"
        value={input}
        placeholder="Search country..."
        onChange={(e) => handleChange(e.target.value)}
        className="w-full rounded border px-3 py-2"
      />

      {filtered.length > 0 && (
        <ul className="mt-2 max-h-40 overflow-auto rounded border">
          {filtered.map((item) => (
            <li
              key={`${item.name}-${item.code}`}
              onClick={() => handleSelect(item)}
              className="flex cursor-pointer justify-between px-3 py-2 hover:bg-blue-100"
            >
              <span>{item.name}</span>
              <span className="text-gray-500">{item.code}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

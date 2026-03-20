"use client"

import { useEffect, useRef, useState } from "react"

import { countries, type Country } from "@/data/countries"

export default function StaticSuggestion() {
  const [input, setInput] = useState("")
  const [filtered, setFiltered] = useState<Country[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleFocus = () => {
    setFiltered(countries)
    setShowDropdown(true)
  }

  const handleChange = (value: string) => {
    setInput(value)

    const result = countries.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.code.includes(value)
    )

    setFiltered(result)
    setShowDropdown(true)
  }

  const handleSelect = (item: Country) => {
    setInput(`${item.name} (${item.code})`)
    setShowDropdown(false)
  }

  return (
    <div
      ref={wrapperRef}
      className="relative rounded-2xl border bg-white p-6 shadow-md"
    >
      <h2 className="mb-4 text-lg font-semibold">Dropdown Suggestion (Countries)</h2>

      <input
        type="text"
        value={input}
        placeholder="Select country..."
        onFocus={handleFocus}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full rounded border px-3 py-2"
      />

      {showDropdown && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 z-10 mt-1 max-h-48 overflow-auto rounded border bg-white shadow">
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

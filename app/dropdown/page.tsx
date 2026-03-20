"use client"

import { useState } from "react"

import DashboardBackLink from "@/components/layout/DashboardBackLink"
import DynamicDropdown from "@/components/modules/dropdown/DynamicDropdown"
import MultiDropdown from "@/components/modules/dropdown/MultiDropdown"
import SimpleDropdown from "@/components/modules/dropdown/SimpleDropdown"

export default function DropdownPage() {
  const [selected, setSelected] = useState("")
  const [multiSelected, setMultiSelected] = useState<string[]>([])

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-2 text-3xl font-bold">Dropdown Practice Page</h1>

      <p className="mb-4 text-gray-600">
        Practice handling dropdowns for Selenium automation
      </p>

      <DashboardBackLink />

      <div className="mt-6 w-full max-w-2xl space-y-6">
        <SimpleDropdown selected={selected} setSelected={setSelected} />

        <MultiDropdown
          multiSelected={multiSelected}
          setMultiSelected={setMultiSelected}
        />

        <DynamicDropdown />
      </div>
    </div>
  )
}

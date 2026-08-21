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
    <div className="dropdown-page">
      <h1 className="dropdown-page__title">Dropdown Practice Page</h1>

      <p className="dropdown-page__description">
        Practice handling dropdowns for Selenium automation
      </p>

      <DashboardBackLink />

      <div className="dropdown-page__content">
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
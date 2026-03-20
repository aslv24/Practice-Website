"use client"

import { useState } from "react"

import DashboardBackLink from "@/components/layout/DashboardBackLink"
import MultipleCheckbox from "@/components/modules/checkbox/MultipleCheckbox"
import SelectAllCheckbox from "@/components/modules/checkbox/SelectAllCheckbox"
import SingleCheckbox from "@/components/modules/checkbox/SingleCheckbox"

type CheckboxOptions = {
  option1: boolean
  option2: boolean
  option3: boolean
}

export default function CheckboxPage() {
  const [options, setOptions] = useState<CheckboxOptions>({
    option1: false,
    option2: false,
    option3: false
  })

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-2 text-3xl font-bold">Checkbox Practice Page</h1>

      <p className="mb-4 text-gray-600">
        Practice handling checkboxes for Selenium automation
      </p>

      <DashboardBackLink />

      <div className="mt-6 w-full max-w-2xl space-y-6">
        <SingleCheckbox />
        <MultipleCheckbox options={options} setOptions={setOptions} />
        <SelectAllCheckbox setOptions={setOptions} />
      </div>
    </div>
  )
}

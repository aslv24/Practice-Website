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
    <div className="checkbox-page">
      <h1 className="checkbox-page__title">Checkbox Practice Page</h1>

      <p className="checkbox-page__description">
        Practice handling checkboxes for Selenium automation
      </p>

      <DashboardBackLink />

      <div className="checkbox-page__content">
        <SingleCheckbox />
        <MultipleCheckbox options={options} setOptions={setOptions} />
        <SelectAllCheckbox setOptions={setOptions} />
      </div>
    </div>
  )
}
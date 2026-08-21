"use client"

import { useState } from "react"

import DashboardBackLink from "@/components/layout/DashboardBackLink"
import GroupRadio from "@/components/modules/radiobutton/GroupRadio"
import SingleRadio from "@/components/modules/radiobutton/SingleRadio"

export default function RadioButtonPage() {
  const [selected, setSelected] = useState("")

  return (
    <div className="radio-button-page">
      <h1 className="radio-button-page__title">
        Radio Button Practice Page
      </h1>

      <p className="radio-button-page__description">
        Practice handling radio buttons for Selenium automation
      </p>

      <DashboardBackLink />

      <div className="radio-button-page__content">
        <SingleRadio />
        <GroupRadio selected={selected} setSelected={setSelected} />
      </div>
    </div>
  )
}
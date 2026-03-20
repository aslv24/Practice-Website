"use client"

import { useState } from "react"

import DashboardBackLink from "@/components/layout/DashboardBackLink"
import GroupRadio from "@/components/modules/radiobutton/GroupRadio"
import SingleRadio from "@/components/modules/radiobutton/SingleRadio"

export default function RadioButtonPage() {
  const [selected, setSelected] = useState("")

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-2 text-3xl font-bold">Radio Button Practice Page</h1>

      <p className="mb-4 text-gray-600">
        Practice handling radio buttons for Selenium automation
      </p>

      <DashboardBackLink />

      <div className="mt-6 w-full max-w-2xl space-y-6">
        <SingleRadio />
        <GroupRadio selected={selected} setSelected={setSelected} />
      </div>
    </div>
  )
}

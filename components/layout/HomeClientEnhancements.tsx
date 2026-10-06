"use client"

import dynamic from "next/dynamic"

const LeadPopup = dynamic(
  () => import("@/components/layout/LeadPopup"),
  {
    ssr: false,
    loading: () => null
  }
)

export default function HomeClientEnhancements() {
  return (
    <LeadPopup />
  )
}
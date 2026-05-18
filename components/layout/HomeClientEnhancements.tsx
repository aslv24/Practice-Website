"use client"

import dynamic from "next/dynamic"

const NotificationPermission = dynamic(
  () => import("@/components/layout/NotificationPermission"),
  {
    ssr: false,
    loading: () => null
  }
)

const LeadPopup = dynamic(
  () => import("@/components/layout/LeadPopup"),
  {
    ssr: false,
    loading: () => null
  }
)

export default function HomeClientEnhancements() {
  return (
    <>
      <NotificationPermission />
      <LeadPopup />
    </>
  )
}
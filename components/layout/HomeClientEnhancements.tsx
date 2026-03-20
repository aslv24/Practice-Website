"use client"

import dynamic from "next/dynamic"

const NotificationPermission = dynamic(
  () => import("@/components/layout/NotificationPermission"),
  { ssr: false }
)

const LeadPopup = dynamic(
  () => import("@/components/layout/LeadPopup"),
  { ssr: false }
)

export default function HomeClientEnhancements() {
  return (
    <>
      <NotificationPermission />
      <LeadPopup />
    </>
  )
}

"use client"

import { useEffect } from "react"

export default function NotificationPermission() {
  useEffect(() => {
    const asked = localStorage.getItem("notificationAsked")

    if (!asked && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        localStorage.setItem("notificationPermission", permission)
      })

      localStorage.setItem("notificationAsked", "true")
    }
  }, [])

  return null
}

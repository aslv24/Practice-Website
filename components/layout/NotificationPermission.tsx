"use client"

import { useEffect } from "react"

export default function NotificationPermission() {
  useEffect(() => {
    const askPermission = async () => {
      try {
        const alreadyAsked = localStorage.getItem("notificationAsked")

        if (
          !alreadyAsked &&
          "Notification" in window &&
          Notification.permission === "default"
        ) {
          const permission = await Notification.requestPermission()

          localStorage.setItem(
            "notificationPermission",
            permission
          )

          localStorage.setItem(
            "notificationAsked",
            "true"
          )
        }
      } catch (error) {
        console.error(
          "Notification permission request failed:",
          error
        )
      }
    }

    askPermission()
  }, [])

  return null
}
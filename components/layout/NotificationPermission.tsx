"use client"

import { useEffect } from "react"

import { useModuleContext } from "@/hooks/useModuleContext"

export default function NotificationPermission() {
  const { userPreferences, setNotificationAsked, setNotificationPermission } =
    useModuleContext()

  useEffect(() => {
    const askPermission = async () => {
      try {
        if (
          !userPreferences.notificationAsked &&
          "Notification" in window &&
          Notification.permission === "default"
        ) {
          const permission = await Notification.requestPermission()

          setNotificationPermission(permission)
          setNotificationAsked(true)
        }
      } catch (error) {
        console.error(
          "Notification permission request failed:",
          error
        )
      }
    }

    askPermission()
  }, [userPreferences.notificationAsked, setNotificationAsked, setNotificationPermission])

  return null
}

NotificationPermission.displayName = "NotificationPermission"

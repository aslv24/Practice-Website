"use client"

import React, { createContext, useCallback, useEffect, useState } from "react"

/**
 * Global preferences for user interactions and notifications
 */
export interface UserPreferences {
  notificationPermission: NotificationPermission | null
  notificationAsked: boolean
  leadPopupShown: boolean
}

/**
 * Module search and filter state for dashboard
 */
export interface ModuleFilter {
  searchQuery: string
  selectedCategory?: string
}

/**
 * Complete context state
 */
export interface ModuleContextType {
  // User Preferences
  userPreferences: UserPreferences
  updateUserPreferences: (prefs: Partial<UserPreferences>) => void
  setNotificationAsked: (asked: boolean) => void
  setNotificationPermission: (permission: NotificationPermission) => void
  setLeadPopupShown: (shown: boolean) => void

  // Module Filtering
  moduleFilter: ModuleFilter
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category?: string) => void
  resetFilters: () => void
}

/**
 * Default preferences
 */
const defaultPreferences: UserPreferences = {
  notificationPermission: null,
  notificationAsked: false,
  leadPopupShown: false,
}

const defaultFilter: ModuleFilter = {
  searchQuery: "",
  selectedCategory: undefined,
}

/**
 * Create the context
 */
export const ModuleContext = createContext<ModuleContextType | undefined>(
  undefined
)

/**
 * ModuleProvider Component
 * Manages global state for user preferences and module filtering
 * Persists preferences to localStorage
 */
export function ModuleProvider({ children }: { children: React.ReactNode }) {
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences>(defaultPreferences)
  const [moduleFilter, setModuleFilter] = useState<ModuleFilter>(defaultFilter)

  /**
   * Load preferences from localStorage on mount
   */
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const stored = localStorage.getItem("userPreferences")
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<UserPreferences>
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserPreferences((prev) => ({ ...prev, ...parsed }))
      } else {
        // Also check old keys for migration
        const oldNotificationAsked = localStorage.getItem("notificationAsked")
        const oldNotificationPerm = localStorage.getItem("notificationPermission")
        const oldLeadPopupShown = localStorage.getItem("leadPopupShown")

        if (oldNotificationAsked || oldNotificationPerm || oldLeadPopupShown) {
          setUserPreferences((prev) => ({
            ...prev,
            notificationAsked: oldNotificationAsked === "true",
            notificationPermission: oldNotificationPerm as NotificationPermission,
            leadPopupShown: oldLeadPopupShown === "true",
          }))
        }
      }
    } catch (error) {
      console.error("Failed to load preferences from localStorage:", error)
    }
  }, [])

  /**
   * Persist preferences to localStorage when they change
   */
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem("userPreferences", JSON.stringify(userPreferences))
    } catch (error) {
      console.error("Failed to save preferences to localStorage:", error)
    }
  }, [userPreferences])

  /**
   * Update user preferences
   */
  const updateUserPreferences = useCallback((prefs: Partial<UserPreferences>) => {
    setUserPreferences((prev) => ({ ...prev, ...prefs }))
  }, [])

  /**
   * Set notification asked flag
   */
  const setNotificationAsked = useCallback((asked: boolean) => {
    updateUserPreferences({ notificationAsked: asked })
  }, [updateUserPreferences])

  /**
   * Set notification permission
   */
  const setNotificationPermission = useCallback(
    (permission: NotificationPermission) => {
      updateUserPreferences({ notificationPermission: permission })
    },
    [updateUserPreferences]
  )

  /**
   * Set lead popup shown flag
   */
  const setLeadPopupShown = useCallback((shown: boolean) => {
    updateUserPreferences({ leadPopupShown: shown })
  }, [updateUserPreferences])

  /**
   * Update search query
   */
  const setSearchQuery = useCallback((query: string) => {
    setModuleFilter((prev) => ({ ...prev, searchQuery: query }))
  }, [])

  /**
   * Update selected category filter
   */
  const setSelectedCategory = useCallback((category?: string) => {
    setModuleFilter((prev) => ({ ...prev, selectedCategory: category }))
  }, [])

  /**
   * Reset all filters to defaults
   */
  const resetFilters = useCallback(() => {
    setModuleFilter(defaultFilter)
  }, [])

  const value: ModuleContextType = {
    userPreferences,
    updateUserPreferences,
    setNotificationAsked,
    setNotificationPermission,
    setLeadPopupShown,
    moduleFilter,
    setSearchQuery,
    setSelectedCategory,
    resetFilters,
  }

  return (
    <ModuleContext.Provider value={value}>
      {children}
    </ModuleContext.Provider>
  )
}

ModuleProvider.displayName = "ModuleProvider"
